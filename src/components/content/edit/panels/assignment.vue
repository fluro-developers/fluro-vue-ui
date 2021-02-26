<template>
    <flex-column>
        <template v-if="loading">
            <fluro-page-preloader contain />
        </template>
        <template v-else>
            <flex-column-body style="background: #fafafa;">
                <v-container fluid>
                    <constrain sm>
                        <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.contact" v-model="model" />
                        <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.confirmationStatus" v-model="model" />
                        <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.description" v-model="model" />
                    </constrain>
                </v-container>
            </flex-column-body>
        </template>
    </flex-column>
</template>
<script>
/////////////////////////////////

import FluroEditor from "../../../form/FluroEditor.vue";
import FluroContentEditMixin from "../FluroContentEditMixin.js";

/////////////////////////////////

import Vue from "vue";

/////////////////////////////////

export default {
    components: {
        FluroEditor
    },
    mixins: [FluroContentEditMixin],
    computed: {

        fieldsOutput() {
            var self = this;
            var array = [];

            ///////////////////////////////////




            addField("contact", {
                title: 'Contact',
                minimum: 1,
                maximum: 1,
                type: "reference",
                params: {
                    restrictType: 'contact',
                    allDefinitions: true,
                }
            });

            addField("confirmationStatus", {
                title: 'Confirmation Status',
                minimum: 1,
                maximum: 1,
                type: "string",
                directive: 'button-select',
                options: [{
                        name: 'Confirmed',
                        value: 'confirmed',
                    },
                    {
                        name: 'Declined',
                        value: 'denied',
                    },
                    {
                        name: 'Unknown / Waiting for response',
                        value: 'unknown',
                    },
                ],
            });

            addField("description", {
                title: 'Description',
                minimum: 0,
                maximum: 1,
                type: "string",
                expressions: {
                    show() {
                        return self.model.confirmationStatus == 'denied';
                    }
                }
            });

            //////////////////////////////////

            function addField(key, details) {
                details.key = key;
                array.push(details);
            }

            return array;
        },
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
            }
        };
    }
};

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
