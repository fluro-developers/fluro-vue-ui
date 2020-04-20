<template>
    <flex-column>
        <template v-if="loading">
            <fluro-page-preloader contain />
        </template>
        <template v-else>
            <!-- :vertical="true" -->
            <tabset :justified="true" :vertical="true">
                <tab :heading="bodyLabel" v-if="!definition || fullBody">
                    <!-- <flex-row> -->
                        <fluro-editor class="full-bleed" v-model="model.body" :options="editorOptions" placeholder="Type your text in here"></fluro-editor>
                    <!-- </flex-row> -->
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
                                    <template v-if="!hideBody && !fullBody">
                                        <fluro-editor v-model="model.body" :options="editorOptions" placeholder="Type your text in here"></fluro-editor>
                                    </template>
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

import FluroEditor from 'src/components/form/FluroEditor.vue';
import FluroContentEditMixin from 'src/components/content/edit/FluroContentEditMixin.js';

/////////////////////////////////

import Vue from 'vue';

/////////////////////////////////

export default {
    components: {
        FluroEditor,
    },
    mixins: [FluroContentEditMixin],
    computed: {
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
            editorOptions: {
                // tokens: [{
                //     title: 'First Name',
                //     key: 'firstName'
                // },{
                //     title: 'Last Name',
                //     key: 'lastName'
                // }]
            },
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