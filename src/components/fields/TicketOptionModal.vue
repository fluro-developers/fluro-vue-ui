<template>
    <flex-column class="modal-size" style="max-width:400px;">
        <flex-column-header class="border-bottom">
            <page-header type="ticket">
                <template v-slot:left>
                    <div>
                        <h3>Ticketing</h3>
                    </div>
                </template>
                <template v-slot:right>
                    <v-btn class="ma-0" @click="close()">
                        Close
                    </v-btn>
                </template>
            </page-header>
        </flex-column-header>
        <flex-column-body>
            <v-container>
                <fluro-content-form v-model="model" :fields="fields">
                    <template v-slot:form="{formFields, fieldHash, model, update, options}">
                        <v-layout align-center>
                            <v-flex xs9>
                                <template v-if="!model.evaluateTitle">
                                    <fluro-content-form-field :field="fieldHash.title" v-model="model" />
                                </template>
                                <template v-else>
                                 <v-input label="Evaluate Title" :persistent-hint="true" hint="Save the ticket title with the returned value of the expression" class="no-flex">
                                  <div>
                                    <fluro-expression-editor v-model="model.title" />
                                   </div>
                                   </v-input>
                                </template>
                                <!-- <expression-field-select :context="model" @click="injectExpression($event, 'show')" v-model="expressionFields" /> -->
                            </v-flex>
                            <v-flex xs3>
                                <fluro-content-form-field :field="fieldHash.evaluateTitle" v-model="model" />
                            </v-flex>
                        </v-layout>
                        <fluro-content-form-field :field="fieldHash.event" v-model="model" />
                        <!-- <fluro-content-form-field :field="fieldHash.condition" v-model="model" /> -->
                        <v-input label="Conditional Expression" :persistent-hint="true" hint="Only create the ticket if this expression returns true" class="no-flex">
                            <fluro-expression-editor v-model="model.condition" />
                        </v-input>
                    </template>
                </fluro-content-form>
            </v-container>
        </flex-column-body>
    </flex-column>
</template>
<script>
import FluroModalMixin from '../../mixins/ModalMixin.js';
import FluroContentForm from '../form/FluroContentForm.vue';
import FluroContentFormField from '../form/FluroContentFormField.vue';
import FluroExpressionEditor from "../form/FluroExpressionEditor.vue";

export default {
    props: {
        options: {
            type: Object,
            default () {
                return {

                }
            }
        }
    },
    data() {
        return {
            model: this.options.model,
            field: this.options.field,
        }
    },
    methods: {

    },
    computed: {
        fields() {
            var self = this;
            var fields = [];

            /////////////////////////////////

            addField('title', {
                title: 'Ticket Title',
                description: `What kind of ticket? Eg. Adult, VIP, Kids`,
                minimum: 1,
                maximum: 1,
                type: 'string',
                expressions: {
                    defaultValue() {
                        return 'Standard';
                    },
                },
            })

            /////////////////////////////////

            addField('evaluateTitle', {
                title: 'Evaluate',
                // description: `Save the ticket title with the returned value of the expression`,
                minimum: 0,
                maximum: 1,
                type: 'boolean',
            })

            // /////////////////////////////////

            // addField('condition', {
            //     title: 'Conditional Expression',
            //     description: `Only create the ticket if this expression returns true`,
            //     minimum: 0,
            //     maximum: 1,
            //     type: 'boolean',
            // })

            /////////////////////////////////

            addField('event', {
                title: 'Event',
                description: `Which event should this tickets be registered for?`,
                minimum: 1,
                maximum: 1,
                type: 'reference',
                directive: '',
                params: {
                    restrictType: 'event',
                    allDefinitions: true,
                    referenceFilter: {
                        startDate: new Date(),
                        endDate: self.$fluro.date.moment().add(1, 'year').toDate(),
                    }
                },
            })

            /////////////////////////////////

            function addField(key, data) {
                if (!data.key) {
                    data.key = key;
                }

                fields.push(data);
            }

            return fields;

        }
    },
    components: {
        // FluroRealmDots,
        FluroContentFormField,
        FluroContentForm,
        FluroExpressionEditor,
    },
    mixins: [FluroModalMixin],
}

</script>
<style lang="scss">
</style>
