<template>
    <flex-column>
        <template v-if="loading">
            <fluro-page-preloader contain />
        </template>
        <template v-else>
            <!-- :vertical="true" -->
            <tabset :justified="true" :vertical="true">
                <!--  <template v-slot:menuprefix>
                    <template v-if="context == 'edit' && $vuetify.breakpoint.mdAndUp">
                        <flex-column-header style="text-align:center">
                            <div style="padding: 10px; max-width:200px; margin: auto;">
                                <fluro-image  :height="200" :image-height="450" contain :item="model" :cacheKey="imageCacheKey" :spinner="true"></fluro-image>
                            </div>
                            <div>
                                {{model.width}}x{{model.height}}
                            </div>
                        </flex-column-header>
                    </template>
                </template> -->
                <tab heading="Details">
                    <!-- <slot> -->
                    <flex-column-body style="background: #fafafa;">
                        <v-container fluid>
                            <constrain sm>
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.title" v-model="model"></fluro-content-form-field>
                                <fluro-content-form-field v-if="!model.assetType" :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.assetType" v-model="model"></fluro-content-form-field>
                                <fluro-content-form-field v-if="isSoundCloud" :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.external" v-model="model"></fluro-content-form-field>
                                <iframe v-if="isSoundCloud" width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" :src="`https://w.soundcloud.com/player/?url=${soundCloudURL}`"></iframe>
                                <div v-if="isUpload">
                                    <template v-if="model._id">
                                        <template v-if="replace">
                                            <asset-replace-upload v-model="model" @input="assetReplaced" />
                                        </template>
                                        <template v-else>
                                            <v-layout>
                                                <v-flex>
                                                    <v-input class="no-flex">
                                                        <v-label>Asset File</v-label>
                                                        <div>{{model.filename}}</div>
                                                        <div>
                                                            <v-btn class="ma-0" @click="replace = true">
                                                                Replace with a new file
                                                                <fluro-icon right library="fas" icon="cloud-upload" />
                                                            </v-btn>
                                                        </div>
                                                    </v-input>
                                                </v-flex>
                                            </v-layout>
                                        </template>
                                    </template>
                                    <template v-else>
                                        <asset-replace-upload v-model="model" @file="fileSelected" />
                                    </template>
                                </div>
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

import FluroEditor from 'src/components/form/FluroEditor.vue';
import FluroContentEditMixin from 'src/components/content/edit/FluroContentEditMixin.js';
import FluroAssetEditMixin from 'src/components/content/edit/FluroAssetEditMixin';

/////////////////////////////////

import Vue from 'vue';

/////////////////////////////////

export default {
    components: {
        FluroEditor,
    },
    created() {},
    mixins: [FluroContentEditMixin, FluroAssetEditMixin],
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
                        name: 'SoundCloud',
                        value: 'soundcloud',
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


            addField('external', {
                type: 'group',
                minimum: 0,
                maximum: 1,
                asObject: true,
                fields: [
                {
                    key:'soundcloud',
                    title: 'SoundCloud URL',
                    minimum: 0,
                    maximum: 1,
                    type: 'string',
                }]
            })

            ///////////////////////////////////

            function addField(key, details) {
                details.key = key;
                array.push(details)
            }

            return array;


        },
        isSoundCloud() {
            var self = this;
            var assetType = _.get(self.model, 'assetType');
            return (assetType == 'soundcloud');
        },
        isUpload() {
            var self = this;
            var assetType = _.get(self.model, 'assetType');
            return (assetType == 'upload');
        },
        soundCloudURL() {
            var self = this;
            return _.get(self.model,'external.soundcloud');
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