<template>
    <flex-column>
        <template v-if="loading">
            <fluro-page-preloader contain />
        </template>
        <template v-else>
            <!-- :vertical="true" -->
            <tabset :justified="true" :vertical="true">
                <tab heading="Details">
                    <flex-column-body style="background: #fafafa;">
                        <v-container fluid>
                            <constrain sm>
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.title" v-model="model"></fluro-content-form-field>
                                <fluro-content-form-field v-if="assetType != 'upload'" :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.assetType" v-model="model"></fluro-content-form-field>
                                <template v-for="iter in urlArray">
                                    <v-text-field v-if="assetType == iter" :v-model="`model.external[${iter.key}]`" :label="fieldHash[iter].title"></v-text-field>
                                </template>
                                <fluro-code-editor lang="html" v-if="assetType == 'embed'" v-model="model.external[embed]" />
                                <iframe v-if="(assetType == 'youtube') && model.external.youtube" type="text/html" width="640" height="360" :src="`https://www.youtube.com/embed/${youtubeURL}?controls=0&autoplay=0&modestbranding=1&playsinline=1&showinfo=0&theme=light&byline=0&portrait=0&title=0&start=0`" frameborder="0"></iframe>
                                <v-input label="Body" class="no-flex pt-2">
                                    <fluro-editor v-model="model.body" placeholder="Type your text in here"></fluro-editor>
                                </v-input>
                                <fluro-privacy-select v-model="model.privacy" />
                            </constrain>
                        </v-container>
                    </flex-column-body>
                </tab>
                <tab :heading="`${definition.title} Information`" v-if="definition && definition.fields && definition.fields.length">
                    <flex-column-body style="background: #fafafa;">
                        <v-container fluid>
                            <constrain sm>
                                <fluro-content-form :options="options" v-model="model.data" :fields="definition.fields" />
                            </constrain>
                        </v-container>
                    </flex-column-body>
                </tab>
                <!-- <tab heading="Advanced / Metadata" v-if="hasMeta">
                    <flex-column-body style="background: #fafafa;">
                        <v-container fluid>
                            <constrain sm>
                               
                                <fluro-panel v-if="model.data.iptc">
                                    <fluro-panel-title>
                                        <h5>IPTC Data</h5>
                                    </fluro-panel-title>
                                    <fluro-panel-body>
                                        <json-view :deep="3" :data="model.data.iptc" />
                                    </fluro-panel-body>
                                </fluro-panel>
                                
                               
                                <fluro-panel v-if="model.data.exif">
                                    <fluro-panel-title>
                                        <h5>EXIF Data</h5>
                                    </fluro-panel-title>
                                    <fluro-panel-body>
                                        <json-view :deep="3" :data="model.data.exif" />
                                    </fluro-panel-body>
                                </fluro-panel>
                                
                            </constrain>
                        </v-container>
                    </flex-column-body>
                </tab> -->
            </tabset>
        </template>
    </flex-column>
</template>
<script>
/////////////////////////////////

import FluroEditor from '../../../form/FluroEditor.vue';
import FluroCodeEditor from '../../../form/FluroEditor.vue';
import FluroContentEditMixin from '../FluroContentEditMixin';
import FluroAssetEditMixin from '../FluroAssetEditMixin';
import { Layout } from 'fluro-vue-ui'

/////////////////////////////////

import Vue from 'vue';

/////////////////////////////////

export default {
    components: {
        FluroEditor,
        FluroCodeEditor,
    },
    created() {
        var self = this;
        if (!self.model) {
            self.$set(self, 'model', {
                external: {
                    'youtube': undefined,
                    'vimeo': undefined,
                    'embed': undefined,
                }
            });
        } else {
            if (!self.model.external) {
                self.$set(self.model, 'external', {
                    'youtube': undefined,
                    'vimeo': undefined,
                    'embed': undefined,
                });
            }
        }
    },
    mixins: [FluroContentEditMixin, FluroAssetEditMixin, Layout],
    computed: {
        fieldsOutput() {


            var self = this;
            var array = [];

            ///////////////////////////////////

            addField('title', {
                title: 'Title',
                minimum: 1,
                maximum: 1,
                type: 'string',
            });

            addField('firstLine', {
                title: 'Short Description',
                minimum: 0,
                maximum: 1,
                type: 'string',
                placeholder: 'Optional short description describing the collection',
            });

            addField('assetType', {
                title: 'Asset Type',
                minimum: 1,
                maximum: 1,
                type: 'string',
                directive: 'select',
                options: [{
                        name: 'YouTube',
                        value: 'youtube',
                    },
                    {
                        name: 'Vimeo',
                        value: 'vimeo',
                    },
                    {
                        name: 'Amazon S3',
                        value: 's3',
                    },
                    {
                        name: 'Embed',
                        value: 'embed',
                    },
                    {
                        name: 'Upload / Hosted',
                        value: 'upload',
                    },
                ]
                // params: {
                //     restrictType: 'ticket',
                // },
            })


            addField('youtube', {
                title: 'YouTube URL',
                minimum: 0,
                maximum: 1,
                type: 'string',
            });

            addField('vimeo', {
                title: 'Vimeo URL',
                minimum: 0,
                maximum: 1,
                type: 'string',
            });

            addField('embed', {
                title: 'Video Embed Code',
                description: 'Paste your video embed code above',
                minimum: 0,
                maximum: 1,
                type: 'string',
                directive: 'code',
            });

            ///////////////////////////////////

            function addField(key, details) {
                details.key = key;
                array.push(details)
            }

            return array;


        },
        assetType() {
            var self = this;
            var assetType = _.get(self.model, 'assetType');
            return assetType;
        },
        soundCloudURL() {
            var self = this;
            return _.get(self.model, 'external.soundcloud');
        },
        youtubeURL() {
            var self = this;
            var url = _.get(self.model, 'external.youtube');
            if (!url) {
                return 'hey';
            }
            url = url.split('?');
            query = url[url.length - 1];
            console.log(url, query);
            return 'hello';
        }
    },
    methods: {
        assetReplaced(model) {
            this.cacheKey = Math.random();
            this.replace = false;
        }
    },
    data() {
        return {
            cacheKey: 0,
            replace: false,
            urlArray: ['youtube', 'vimeo']
        }
    },
}
</script>
<style lang="scss">
.media-preview {
    background: #eee;
    display: block;
    min-height: 350px;
    margin-bottom: 15px;
    border: 1px solid rgba(#000, 0.1);
    border-radius: 5px;
    overflow: hidden;

    .media-preview-wrap {
        max-width: 750px;
        margin: auto;
    }
}
</style>
<style lang="scss" scoped>
.color-swatch {
    width: 36px;
    height: 36px;
    border-radius: 3px;
    margin: 0 1px 1px 0;
    display: inline-block;
}
</style>