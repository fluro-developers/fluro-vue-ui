<template>
    <flex-column>
        <template v-if="loading">
            <fluro-page-preloader contain />
        </template>
        <template v-else>
            <!-- :vertical="true" -->
            <tabset :justified="true" :vertical="true">
                <tab heading="Details">
                    <!-- <slot> -->
                    <flex-column-body style="background: #fafafa;">
                        <v-container fluid>
                            <constrain sm>
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.title" v-model="model"></fluro-content-form-field>
                                <template v-if="model._id">
                                    <!-- @load="onLoad" @error="onError" -->
                                    
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
                                            <v-flex>
                                                <v-input label="Main Colors" v-if="model.colors && model.colors.length" class="no-flex">
                                                    <div>
                                                        <div class="color-swatch" :style="{backgroundColor:color}" v-tippy :content="color" v-for="color in model.colors" />
                                                    </div>
                                                </v-input>
                                            </v-flex>
                                        </v-layout>
                                    </template>
                                </template>
                                <template v-else>
                                    <asset-replace-upload v-model="model" @file="fileSelected" />
                                    <!-- <pre>{{file}}</pre> -->
                                </template>
                                <!-- <div class="form-group" v-if="definition.data.titleGeneration != 'force'"> -->
                                <!-- <label>{{titleLabel}}</label> -->
                                <!-- <input class="form-control" placeholder="{{titleLabel}}" ng-model="item.title"> -->
                                <!-- </div> -->
                                <template v-if="definition && definition.fields && definition.fields.length">
                                    <!-- <fluro-panel> -->
                                        <!-- <fluro-panel-title> -->
                                            <!-- <h5>{{definition.title}} Information</h5> -->
                                        <!-- </fluro-panel-title> -->
                                        <!-- <fluro-panel-body> -->
                                            <fluro-content-form :options="options" v-model="model.data" :fields="definition.fields" />
                                        <!-- </fluro-panel-body> -->
                                    <!-- </fluro-panel> -->
                                </template>

                                <template v-if="!hideBody && !fullBody">
                                    <v-input label="Body / Caption" class="no-flex">
                                        <fluro-editor v-model="model.body" :options="editorOptions" placeholder="Type your text in here"></fluro-editor>
                                    </v-input>
                                </template>


                                <fluro-privacy-select v-model="model.privacy"/>
                            </constrain>
                        </v-container>
                    </flex-column-body>
                    <!-- </slot> -->
                </tab>
                <tab heading="Advanced / Metadata" v-if="hasMeta">
                    <flex-column-body style="background: #fafafa;">
                        <v-container fluid>
                            <constrain sm>
                                <!-- <div > -->
                                <fluro-panel v-if="model.data.iptc">
                                    <fluro-panel-title>
                                        <h5>IPTC Data</h5>
                                    </fluro-panel-title>
                                    <fluro-panel-body>
                                        <json-view :deep="3" :data="model.data.iptc" />
                                    </fluro-panel-body>
                                </fluro-panel>
                                <!-- </div> -->
                                <!-- <div v-if="model.data.exif"> -->
                                <fluro-panel v-if="model.data.exif">
                                    <fluro-panel-title>
                                        <h5>EXIF Data</h5>
                                    </fluro-panel-title>
                                    <fluro-panel-body>
                                        <json-view :deep="3" :data="model.data.exif" />
                                    </fluro-panel-body>
                                </fluro-panel>
                                <!-- </div> -->
                            </constrain>
                        </v-container>
                    </flex-column-body>
                </tab>
            </tabset>
        </template>
        <!-- <flex-column-body> -->
        <!-- // <pre>{{model}}</pre> -->
        <!-- </flex-column-body> -->
        <!-- <flex-column-body> -->
        <!-- WOOOT -->
        <!-- <tabset v-else :justified="true" :vertical="true">
            <tab heading="Basic Details">
                <slot>
                    <flex-column-body style="background: #fafafa;">
                    </flex-column-body>
                </slot>
            </tab>
        </tabset> -->
    </flex-column>
</template>
<script>
/////////////////////////////////

import FluroEditor from '../../../form/FluroEditor.vue';
import FluroContentEditMixin from '../FluroContentEditMixin';
import FluroAssetEditMixin from '../FluroAssetEditMixin';
import { Layout } from 'fluro-vue-ui'

/////////////////////////////////

import Vue from 'vue';

/////////////////////////////////

export default {
    components: {
        FluroEditor,
    },
    created() {
        this.$set(this.model, 'assetType', 'upload');
    },
    mixins: [FluroContentEditMixin, FluroAssetEditMixin, Layout],
    computed: {
        hasMeta() {
            if (!this.model.data) {
                return;
            }

            return this.model.data.iptc || this.model.data.exif;
        },
        fieldsOutput() {


            var self = this;
            var array = [];

            ///////////////////////////////////

            addField('title', {
                title: 'Title',
                minimum: 0,
                maximum: 1,
                type: 'string',
                placeholder: 'Defaults to filename if left empty',
            })


            ///////////////////////////////////

            function addField(key, details) {
                details.key = key;
                array.push(details)
            }

            return array;


        },
        fullBody() {
            return this.definition && this.definition.data && this.definition.data.fullBody;
        },
        hideBody() {
            return this.definition && this.definition.data && this.definition.data.hideBody;
        },
        titleLabel() {
            return 'Title';
        },
        bodyLabel() {
            return 'Body';
        }
    },
    methods: {
        assetReplaced(model) {
            this.imageCacheKey = Math.random();
            this.replace = false;
        }
    },
    data() {
        return {
            imageCacheKey: 0,
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
    width:36px;
    height:36px;
        border-radius: 3px;
    margin: 0 1px 1px 0;
    display: inline-block;
}
</style>