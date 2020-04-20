<template>
    <flex-column>
        <template v-if="loading">
            <fluro-page-preloader contain />
        </template>
        <template v-else>
            <!-- :vertical="true" -->
            <tabset :justified="true" :vertical="true">
                <tab heading="Code" >
                    <v-layout row class="top-bar" px-4 py-2>
                        <v-flex xs8 sm4 md3 px-2>
                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.title" v-model="model" />
                        </v-flex>
                        <v-flex xs4 sm2 md2 px-2>
                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.syntax" v-model="model" />
                        </v-flex>
                    </v-layout>
                    <fluro-code-editor style="flex: 1 1 100%" v-model="model.body" :lang="model.syntax" />
                </tab>
                <tab :heading="`${definition.title} Details`" v-if="definition">
                    <slot>
                        <flex-column-body style="background: #fafafa;">
                            <v-container fluid>
                                <constrain sm>
                                    <h3 margin>{{definition.title}} Details</h3>
                                    <!-- <div class="form-group" v-if="definition.data.titleGeneration != 'force'"> -->
                                    <!-- <label>{{titleLabel}}</label> -->
                                    <!-- <input class="form-control" placeholder="{{titleLabel}}" ng-model="item.title"> -->
                                    <!-- </div> -->
                                    <fluro-content-form :options="options" v-model="model.data" :fields="definition.fields" />
                                </constrain>
                            </v-container>
                        </flex-column-body>
                    </slot>
                </tab>
                <tab :heading="`Privacy`">
                    <slot>
                        <flex-column-body style="background: #fafafa;">
                            <v-container fluid>
                                <constrain sm>
                                    <fluro-privacy-select v-model="model.privacy"/>
                                </constrain>
                            </v-container>
                        </flex-column-body>
                    </slot>
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

import FluroCodeEditor from 'src/components/form/FluroCodeEditor.vue';
import FluroContentEditMixin from 'src/components/content/edit/FluroContentEditMixin.js';

/////////////////////////////////

import Vue from 'vue';

/////////////////////////////////

export default {
    components: {
        FluroCodeEditor,
    },
    mixins: [FluroContentEditMixin],
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

            addField('syntax', {
                title: 'Syntax',
                minimum: 1,
                maximum: 1,
                type: 'string',
                directive: 'select',
                options: [{
                        name: 'HTML',
                        value: 'html'
                    },
                    {
                        name: 'SCSS',
                        value: 'scss'
                    },
                    {
                        name: 'CSS',
                        value: 'css'
                    },
                    {
                        name: 'Javascript',
                        value: 'js'
                    }
                ],
            });

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
    data() {
        return {
            editorOptions: {},
        }
    },
}
</script>
<style lang="scss">
.fluro-editor.full-bleed {
    margin: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .fluro-editor-textarea {
        flex: 1;


        &>div {
            border: none !important;
            border-radius: 0;
            overflow: auto;
            padding: 3%;
        }
    }

    & .editor-code-wrapper {
        flex: 1;
        display: flex;
        flex-direction: column;

        .fluro-code-editor {
            display: block;
            flex: 1;
            position: relative;

            .ace_editor {
                width: 100% !important;
                height: 100% !important;
                position: absolute;
                left: 0;
                bottom: 0;
                right: 0;
                top: 0;
                border-radius: 0;
            }
        }
    }
}
</style>