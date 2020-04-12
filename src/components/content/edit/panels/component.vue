<template>
    <flex-column>
        
        <template v-if="loading">
            <fluro-page-preloader contain />
        </template>
        <tabset v-else :justified="true">
            <tab heading="Code">
                <flex-row class="code-panels">
                    <flex-column class="code-panel" :class="{'panel-collapsed':collapsed.js}">
                        <div class="code-heading" @click="togglePanel('js')">
                            <label>
                                <fluro-icon icon="caret-right" library="fas" left /><strong>Javascript</strong>
                            </label>
                        </div>
                        <flex-column class="code-panel-column">
                            <fluro-code-editor style="flex: 1 1 100%" v-model="model.js" lang="javascript" />
                        </flex-column>
                    </flex-column>
                    <flex-column class="code-panel" :class="{'panel-collapsed':collapsed.html}">
                        <div class="code-heading" @click="togglePanel('html')">
                            <label>
                                <fluro-icon icon="caret-right" library="fas" left /><strong>HTML</strong>
                            </label>
                        </div>
                        <flex-column class="code-panel-column">
                            <fluro-code-editor style="flex: 1 1 100%" v-model="model.html" lang="html" />
                        </flex-column>
                    </flex-column>
                    <flex-column class="code-panel" :class="{'panel-collapsed':collapsed.css}">
                        <div class="code-heading" @click="togglePanel('css')">
                            <label>
                                <fluro-icon icon="caret-right" library="fas" left /><strong>SCSS</strong>
                            </label>
                        </div>
                        <!--  -->
                        <flex-column class="code-panel-column">
                            <fluro-code-editor :autoformat="false" style="flex: 1 1 100%" v-model="model.css" lang="scss" />
                        </flex-column>
                    </flex-column>
                </flex-row>
            </tab>
            <tab heading="Component Fields">
                <fluro-field-editor v-model="model.fields" :item="model" />
            </tab>
            <tab :heading="`${readableContentType} Details`">
                <flex-column-body style="background: #fafafa;">
                    <v-container fluid>
                        <constrain sm>
                            <h3 margin>{{readableContentType}} Details</h3>
                            <template v-if="definedFields.length">
                                <fluro-content-form :options="options" v-model="model.data" :fields="definedFields" />
                            </template>
                        </constrain>
                    </v-container>
                </flex-column-body>
            </tab>
        </tabset>
    </flex-column>
</template>
<script>
/////////////////////////////////

import Vue from 'vue';
import FluroContentEditMixin from '../FluroContentEditMixin';
import FluroFieldEditor from '../../../fields/FluroFieldEditor.vue';
import FluroCodeEditor from '../../../form/FluroCodeEditor.vue';
// console.log('MIXIN', FluroContentEditMixin)
// import FluroCodeEditor from '../../../form/FluroCodeEditor.vue';
// import { FilterService } from 'fluro';
// import { FluroFieldEditor, FluroCodeEditor } from 'fluro-vue-ui';

/////////////////////////////////

export default {
    mixins: [FluroContentEditMixin],
    components: {
        FluroFieldEditor,
        FluroCodeEditor,
    },
    methods: {
        togglePanel(syntax) {

            console.log('TOGGLE', syntax);
            this.collapsed[syntax] = !this.collapsed[syntax];
        }
    },
    created() {
        if(!this.model.fields) {
            this.$set(this.model, 'fields', []);
        }
    },
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
                placeholder: 'Eg. My Awesome List',
            })

            ///////////////////////////////////

            function addField(key, details) {
                details.key = key;
                array.push(details)
            }

            return array;

        },
    },
    data() {
        return {
            collapsed: {
                js: false,
                html: false,
                css: false,
            }
        }
    },
}
</script>
<style scoped lang="scss">
.code-heading {
    line-height: 30px;
    height: 30px;
    padding: 0 15px;
    background: #555;
    color: rgba(#fff, 0.8);
    white-space: nowrap;
    border: 1px solid rgba(#000, 0.1);
    cursor: pointer !important;

    &:hover {
        background: #444;
        color: #fff;
    }

    label {
        display: block;
        text-transform: uppercase;
        margin: 0;
        padding: 0;
        letter-spacing: 0.05em;
        font-size: 12px;
        pointer-events: none;
    }
}

.code-panels {
    background: #262626;
}

.code-panel {
    .code-panel-column {
        border-left: 1px solid rgba(#000, 0.1);
        border-right: 1px solid rgba(#000, 0.1);
    }
}

.panel-collapsed {
    width: 30px !important;
    flex: none;
    background: #fafafa;

    .code-heading {
        flex: 1;
        height: auto;

        label {
            transform: rotate(90deg);
        }
    }

    .code-panel-column {
        display: none;
    }
}
</style>