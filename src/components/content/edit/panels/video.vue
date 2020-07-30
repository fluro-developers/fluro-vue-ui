<template>
    <flex-column>
        <div class="file-drop-area" :class="{active:dragging}" @dragover.prevent.stop="fileover" @dragleave.prevent.stop="fileout" @drop.prevent.stop="filedrop">
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
                                    <template v-if="!model._id || assetType != 'upload'">
                                        <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.assetType" v-model="model"></fluro-content-form-field>
                                    </template>
                                    <template v-if="assetType == 'upload'">
                                        <!-- If we already exist -->
                                        <template v-if="model._id">
                                            <template v-if="replace">
                                                <asset-replace-upload ref="replaceForm"  v-model="model" @input="assetReplaced" />
                                            </template>
                                            <template v-else>
                                                <v-input :label="model.filename" class="no-flex">
                                                    <div>
                                                        <v-btn class="ma-0" @click="replace = true">
                                                            Replace with a new file
                                                            <fluro-icon right library="fas" icon="cloud-upload" />
                                                        </v-btn>
                                                    </div>
                                                </v-input>
                                            </template>
                                        </template>
                                        <template v-else>
                                            <asset-replace-upload ref="replaceForm"  v-model="model" @file="fileSelected" />
                                        </template>
                                    </template>
                                    <template v-else>
                                        <fluro-content-form v-model="model.external" :fields="externalFields">
                                            <!-- <template v-slot:form="{formFields, fieldHash, model, update, options}"> -->
                                            <!-- <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.youtube" v-model="model"/> -->
                                            <!-- </template> -->
                                        </fluro-content-form>
                                    </template>
                                    <v-container px-0 pt-0 v-if="showVideo">
                                        <fluro-video :cacheKey="videoCacheKey" :item="model" />
                                    </v-container>
                                    <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.poster" v-model="model"></fluro-content-form-field>
                                    <template v-if="!hideBody && !fullBody">
                                        <v-input label="Body / Caption" class="no-flex">
                                            <fluro-editor v-model="model.body" :options="editorOptions" placeholder="Type your text in here"></fluro-editor>
                                        </v-input>
                                    </template>
                                    <template v-if="definition && definition.fields && definition.fields.length">
                                        <fluro-content-form :options="options" v-model="model.data" :fields="definition.fields" />
                                    </template>
                                    <fluro-privacy-select v-model="model.privacy" />
                                </constrain>
                            </v-container>
                        </flex-column-body>
                    </tab>
                    <!-- <tab :heading="`${definition.title} Information`" v-if="definition && definition.fields && definition.fields.length">
                    <flex-column-body style="background: #fafafa;">
                        <v-container fluid>
                            <constrain sm>
                                <fluro-content-form :options="options" v-model="model.data" :fields="definition.fields" />
                            </constrain>
                        </v-container>
                    </flex-column-body>
                </tab> -->
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
        </div>
    </flex-column>
</template>
<script>
/////////////////////////////////

import FluroEditor from '../../../form/FluroEditor.vue';
import FluroCodeEditor from '../../../form/FluroEditor.vue';
import FluroContentEditMixin from '../FluroContentEditMixin.js';
import FluroAssetEditMixin from '../FluroAssetEditMixin';

/////////////////////////////////

import Vue from 'vue';
import _ from 'lodash';

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
    mixins: [FluroContentEditMixin, FluroAssetEditMixin],
    computed: {
        showVideo() {
            var self = this;
            switch (self.assetType) {
                case 'vimeo':
                case 'youtube':
                case 'embed':
                    return !!self.model.external[self.assetType];
                    break;
                case 'upload':
                    return !!self.model._id;
                    break;

            }
        },
        externalFields() {
            var self = this;
            var array = [];

            array.push({
                title: 'Youtube URL',
                key: 'youtube',
                type: 'string',
                minimum: 1,
                maximum: 1,
                expressions: {
                    hide() {
                        return self.assetType != 'youtube';
                    }
                }
            })


            array.push({
                title: 'Vimeo URL',
                key: 'vimeo',
                type: 'string',
                minimum: 1,
                maximum: 1,
                expressions: {
                    hide() {
                        return self.assetType != 'vimeo';
                    }
                }
            })

            array.push({
                title: 'Embed Code',
                key: 'embed',
                type: 'string',
                directive: 'code',
                params: {
                    syntax: 'html',
                },
                minimum: 0,
                maximum: 1,
                expressions: {
                    hide() {
                        return self.assetType != 'embed';
                    }
                }
            })

            return array;

        },
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


            addField('poster', {
                title: 'Poster / Thumbnail Image',
                description: 'Customise the poster image for this video',
                minimum: 0,
                maximum: 1,
                type: 'reference',
                params: {
                    restrictType: 'image',
                    allDefinitions: true,
                }
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
            var query = url[url.length - 1];
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
    methods: {
        assetReplaced(model) {
            this.videoCacheKey = Math.random();
            this.replace = false;
        }
    },
    data() {
        return {
            videoCacheKey: 0,
            replace: false,
            editorOptions: {},
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
