<template>
    <flex-column>
        <div class="file-drop-area" :class="{active:dragging}" @dragover.prevent.stop="fileover" @dragleave.prevent.stop="fileout" @drop.prevent.stop="filedrop">
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
                                    <template v-if="model._id">
                                        <!-- @load="onLoad" @error="onError" -->
                                        <div class="media-preview">
                                            <div class="media-preview-wrap">
                                                <fluro-image :longpress="true" :height="450" :image-height="450" contain :item="model" :cacheKey="imageCacheKey" :spinner="true"></fluro-image>
                                            </div>
                                        </div>
                                        <template v-if="replace">
                                            <asset-replace-upload ref="replaceForm" v-model="model" @input="assetReplaced" />
                                        </template>
                                        <template v-else>
                                            <v-layout>
                                                <v-flex>
                                                    <v-input :label="model.filename" class="no-flex">
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
                                        <asset-replace-upload ref="replaceForm"  v-model="model" @file="fileSelected" />
                                        <!-- <pre>{{file}}</pre> -->
                                    </template>
                                    <!-- <div class="form-group" v-if="definition.data.titleGeneration != 'force'"> -->
                                    <!-- <label>{{titleLabel}}</label> -->
                                    <!-- <input class="form-control" placeholder="{{titleLabel}}" ng-model="item.title"> -->
                                    <!-- </div> -->
                                     <fluro-panel v-if="definition && definition.fields && definition.fields.length">
                                      <fluro-panel-title>
                                       <strong>{{definition.title}} Information</strong>
                                      </fluro-panel-title>
                                        <fluro-panel-body>
                                            <fluro-content-form :options="options" v-model="model.data" :fields="definition.fields" />
                                        </fluro-panel-body>
                                    </fluro-panel>

                                    
                                    <template v-if="!hideBody && !fullBody">
                                        <v-input label="Body / Caption" class="no-flex">
                                            <fluro-editor v-model="model.body" :options="editorOptions" placeholder="Type your text in here"></fluro-editor>
                                        </v-input>
                                    </template>
                                    <fluro-privacy-select v-model="model.privacy" />
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
        </div>
    </flex-column>
</template>
<script>
/////////////////////////////////

import FluroEditor from '../../../form/FluroEditor.vue';
import FluroContentEditMixin from '../FluroContentEditMixin.js';
import FluroAssetEditMixin from '../FluroAssetEditMixin';

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
    mixins: [FluroContentEditMixin, FluroAssetEditMixin],
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
    width: 36px;
    height: 36px;
    border-radius: 3px;
    margin: 0 1px 1px 0;
    display: inline-block;
}

</style>
