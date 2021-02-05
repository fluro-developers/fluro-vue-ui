<template>
    <flex-column>
        <template v-if="loading">
            <fluro-page-preloader contain />
        </template>
        <tabset v-else :justified="true" :vertical="true">
            <tab heading="Submission">
                <flex-column-body style="background: #fafafa;">
                    <v-container grid-list-xl>
                        <constrain sm>
                            <fluro-content-form :options="options" v-model="model" :fields="fieldsOutput">
                                <template v-slot:form="{formFields, fieldHash, model, update, options}">
                                    <fluro-panel v-if="!model.contact && (!model.contacts || !model.contacts.length)">
                                        <fluro-panel-title>Contact Information</fluro-panel-title>
                                        <fluro-panel-body>
                                            <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.rawData" v-model="model" />
                                        </fluro-panel-body>
                                        <fluro-panel-body class="border-top">
                                            <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.contact" v-model="model" />
                                        </fluro-panel-body>
                                    </fluro-panel>
                                    <fluro-panel v-else>
                                        <fluro-panel-body>
                                            <!-- <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.contact" v-model="model" /> -->
                                            <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.contacts" v-model="model" />
                                        </fluro-panel-body>
                                    </fluro-panel>
                                    <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.event" v-model="model" />
                                    <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.emails" v-model="model" />
                                </template>
                            </fluro-content-form>
                            
                            <template v-if="definition">
                                <fluro-panel v-if="definition.fields && definition.fields.length">
                                    <tabset :justified="true">
                                        <tab heading="Submitted Data">
                                            <fluro-panel-body class="border-bottom">This is the data that was provided at the time of submission.</fluro-panel-body>
                                            <fluro-panel-body>
                                                <fluro-content-form :options="options" context="raw" v-model="model.rawData" :fields="definition.fields" />
                                            </fluro-panel-body>
                                        </tab>
                                        <tab heading="Computed Data">
                                            <fluro-panel-body class="border-bottom">This is the data after it has been processed by the system. Your form may have content that is transformed into dynamic links to other content in the database, eg. contacts, families etc</fluro-panel-body>
                                            <fluro-panel-body>
                                                <fluro-content-form :options="options" v-model="model.data" :fields="definition.fields" />
                                            </fluro-panel-body>
                                        </tab>
                                    </tabset>
                                </fluro-panel>
                            </template>
                            <template v-else>
                                <fluro-panel>
                                    <fluro-panel-body style="text-align:center">
                                        No definition currently exists for this {{model.definition || model._type }}
                                    </fluro-panel-body>
                                </fluro-panel>
                            </template>

                            <fluro-panel v-if="model.utm">
                                <fluro-panel-title>
                                    <strong>UTM Tags</strong>
                                </fluro-panel-title>
                                <fluro-panel-body>
                                    <v-layout row wrap>
                                        <v-flex xs6 v-if="model.utm.utm_campaign">
                                            <v-input label="UTM Campaign" class="no-flex">
                                               <div>
                                                {{model.utm.utm_campaign}}
                                               </div>
                                            </v-input>
                                        </v-flex>
                                        <v-flex xs6 v-if="model.utm.utm_medium">
                                            <v-input label="UTM Medium" class="no-flex">
                                                 <div>
                                                {{model.utm.utm_medium}}
                                               </div>
                                            </v-input>
                                        </v-flex>
                                        <v-flex xs6 v-if="model.utm.utm_source">
                                            <v-input label="UTM Source" class="no-flex">
                                                 <div>
                                                {{model.utm.utm_source}}
                                               </div>
                                            </v-input>
                                        </v-flex>
                                        <v-flex xs6 v-if="model.utm.utm_term">
                                            <v-input label="UTM Term" class="no-flex">
                                                 <div>
                                                {{model.utm.utm_term}}
                                                 </div>
                                            </v-input>
                                        </v-flex>
                                        
                                    </v-layout>
                                </fluro-panel-body>
                            </fluro-panel>
                        </constrain>
                    </v-container>
                </flex-column-body>
            </tab>
            <tab heading="Transactions & Payments" v-if="paymentsEnabled">
                <flex-column-body style="background: #fafafa;">
                    <v-container grid-list-xl>
                        <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.transactions" v-model="model" />
                    </v-container>
                </flex-column-body>
            </tab>
            <tab :heading="`${tickets.length} Tickets`" v-if="tickets.length">
                <flex-column-body style="background: #fafafa;">
                    <v-container fluid style="background: #fff;" class="border-bottom">
                        <img class="qrcode" :src="qrCodeURL" />
                    </v-container>
                    <v-container>
                        <ticket-list :interaction="model" />
                    </v-container>
                </flex-column-body>
            </tab>
        </tabset>
    </flex-column>
</template>
<script>
/////////////////////////////////

import FluroContentEditMixin from "../FluroContentEditMixin.js";
import TicketList from "../../event/TicketList.vue";

/////////////////////////////////

import Vue from "vue";

/////////////////////////////////

export default {
    mixins: [FluroContentEditMixin],
   components: {
        TicketList
    },
    created() {
        var self = this;
    },
    asyncComputed: {
        tickets: {
            default: [],
            get() {
                var self = this;

                self.loading = true;

                ///////////////////////////////////

                var url = `/tickets/interaction/${self.model._id}`;

                ///////////////////////////////////

                return new Promise(function(resolve, reject) {
                    return self.$fluro.api
                        .get(url)
                        .then(function(res) {
                            resolve(res.data);
                            self.loading = false;
                        })
                        .catch(function(err) {
                            reject(err);
                            self.loading = false;
                        });
                });
            }
        }
    },
    computed: {
        qrCodeURL() {
            var self = this;
            var interactionID = self.$fluro.utils.getStringID(self.model);
            return `${self.$fluro.api.defaults.baseURL}/system/qr?input=http://tickets.fluro.io/interaction/${interactionID}`;
        },
        paymentsEnabled() {

            if (!this.definition || !this.definition.paymentDetails) {
                return;
            }


            return this.definition.paymentDetails.required || this.definition.paymentDetails.allow;

        },
        askDOB() {
            return (
                _.get(this.definition, "data.askDOB") ||
                _.get(this.definition, "data.requireDOB") ||
                this.model._dob
            );
        },
        fieldsOutput() {
            var self = this;
            var array = [];

            var fields = [{
                    title: "Names",
                    type: "group",
                    key: "names",
                    sameLine: true,
                    fields: [{
                            title: "First Name",
                            key: "_firstName",
                            minimum: 0,
                            maximum: 1,
                            type: "string"
                        },
                        {
                            title: "Last Name",
                            key: "_lastName",
                            minimum: 0,
                            maximum: 1,
                            type: "string"
                        }
                    ]
                },
                {
                    title: "Extras",
                    type: "group",
                    key: "extras",
                    sameLine: true,
                    fields: [{
                            title: "Gender",
                            key: "_gender",
                            minimum: 0,
                            maximum: 1,
                            type: "string",
                            directive: "select",
                            options: [{
                                    name: "Male",
                                    value: "male"
                                },
                                {
                                    name: "Female",
                                    value: "female"
                                },
                                {
                                    name: "Unknown",
                                    value: "unknown"
                                }
                            ]
                        },
                        {
                            title: "Date of Birth",
                            key: "_dob",
                            minimum: 0,
                            maximum: 1,
                            type: "date",
                            directive: "datepicker",
                            expressions: {
                                show() {
                                    return self.askDOB;
                                }
                            }
                        }
                    ]
                },
                {
                    title: "Communication",
                    type: "group",
                    key: "communication",
                    sameLine: true,
                    fields: [{
                            title: "Email Address",
                            key: "_email",
                            minimum: 0,
                            maximum: 1,
                            type: "email"
                        },
                        {
                            title: "Phone Number",
                            key: "_phoneNumber",
                            minimum: 0,
                            maximum: 1,
                            type: "string"
                        }
                    ]
                }
            ];

            addField("rawData", {
                minimum: 1,
                maximum: 1,
                asObject: true,
                type: "group",
                fields: [{
                    title: "Contact Details",
                    type: "group",
                    key: "contactDetails",
                    expressions: {
                        show: `!data.contact && !data.contacts.length`
                    },
                    fields
                }]
            });

            ///////////////////////////////////

            addField("contact", {
                title: "Primary Contact",
                description: "The primary contact for this interaction",
                minimum: 0,
                maximum: 1,
                type: "reference",
                params: {
                    restrictType: "contact",
                    allDefinitions: true
                }
            });

            addField("contacts", {
                title: "Linked Contacts",
                description: "All contacts referenced for this interaction",
                minimum: 0,
                maximum: 0,
                type: "reference",
                params: {
                    restrictType: "contact",
                    allDefinitions: true
                }
            });

            addField("event", {
                title: "Linked Event",
                description: "Attach this interaction to a specific event",
                minimum: 0,
                maximum: 1,
                type: "reference",
                params: {
                    restrictType: "event",
                    allDefinitions: true
                }
            });


            addField("transactions", {
                title: "Transactions",
                description: "Payments and transactions relevant to this form submission",
                minimum: 0,
                maximum: 0,
                type: "reference",
                params: {
                    restrictType: "transaction",
                    allDefinitions: true
                }
            });

            ///////////////////////////////////

            addField("emails", {
                type: "group",
                sameLine: true,
                fields: [{
                        title: "Primary Email Address",
                        key: "primaryEmail",
                        description: "The primary email address relevant to this interaction",
                        minimum: 0,
                        maximum: 1,
                        type: "email"
                    },
                    {
                        title: "Transaction Email Address",
                        key: "transactionEmail",
                        description: "The primary email address relevant to this interaction",
                        minimum: 0,
                        maximum: 1,
                        type: "email",
                        expressions: {
                            defaultValue: `data.primaryEmail`
                        }
                    }
                ]
            });

            function addField(key, details) {
                details.key = key;
                array.push(details);
            }

            return array;
        }
    },
    data() {
        return {};
    }
};

</script>
<style scoped lang="scss">
.hint {
    font-size: 10px;
    opacity: 0.5;
    color: inherit;
    display: block;
}

.qrcode {
    display: block;
    border: 5px solid #000;
    background: #000;
    margin: auto;
}

</style>
