<template>
    <flex-column>
        <template v-if="loading">
            <fluro-page-preloader contain />
        </template>
        <template v-else>
            <!-- :vertical="true" -->
            <tabset :justified="true" :vertical="true">
                <tab heading="Details">
                    <flex-column-body style="background: #fafafa;">
                        <v-container fluid>
                            <constrain sm v-if="model._id">
                                <!--  -->
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.title" v-model="model" />
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.description" v-model="model" />
                                <fluro-panel v-if="model.contact">
                                    <fluro-panel-body>
                                        <v-input class="no-flex" label="Contact">
                                            <v-layout align-center>
                                                <v-flex shrink style="padding-right:10px;">
                                                    <fluro-avatar md :id="model.contact" type="contact" />
                                                </v-flex>
                                                <v-flex>
                                                    <h5>{{model.contact.title}}</h5>
                                                    <div class="muted">{{model.definition || 'contact' | definitionTitle}}</div>
                                                </v-flex>
                                                <v-flex shrink style="padding-right:10px;">
                                                    <v-btn class="ma-0" v-if="$fluro.access.canEditItem(model.contact)" icon @click="$fluro.global.edit(model.contact, true)">
                                                        <fluro-icon icon="pencil" />
                                                    </v-btn>
                                                    <v-btn class="ma-0 ml-1" icon @click="$actions.open([model.contact])">
                                                        <fluro-icon icon="ellipsis-h" />
                                                    </v-btn>
                                                </v-flex>
                                            </v-layout>
                                        </v-input>
                                    </fluro-panel-body>
                                </fluro-panel>
                                <fluro-panel v-if="model.persona">
                                    <fluro-panel-body>
                                        <v-input class="no-flex" label="User Persona">
                                            <v-layout align-center>
                                                <v-flex shrink style="padding-right:10px;">
                                                    <fluro-avatar md :id="model.persona" type="persona" />
                                                </v-flex>
                                                <v-flex>
                                                    <h5>{{model.persona.title}}</h5>
                                                    <div v-if="model.persona.collectionEmail">{{model.persona.collectionEmail}}</div>
                                                    <div v-else="model.persona.userEmail">{{model.persona.userEmail}}</div>
                                                    <div v-if="model.persona.username">{{model.persona.username}}</div>
                                                    <div class="muted">{{model.definition || 'persona' | definitionTitle}}</div>
                                                </v-flex>
                                                <v-flex shrink style="padding-right:10px;">
                                                    <v-btn class="ma-0" v-if="$fluro.access.canEditItem(model.persona)" icon @click="$fluro.global.edit(model.persona, true)">
                                                        <fluro-icon icon="pencil" />
                                                    </v-btn>
                                                    <v-btn class="ma-0 ml-1" icon @click="$actions.open([model.persona])">
                                                        <fluro-icon icon="ellipsis-h" />
                                                    </v-btn>
                                                </v-flex>
                                            </v-layout>
                                        </v-input>
                                    </fluro-panel-body>
                                </fluro-panel>
                                <fluro-panel>
                                    <fluro-panel-body>
                                        <v-layout row wrap>
                                            <v-flex xs12 sm3 v-if="refundData.length">
                                                <v-input class="no-flex" hint="Including refunds" persistent-hint label="Total">
                                                    <h4>
                                                        {{formattedTotal}} <span class="currency">{{model.currency}}</span>
                                                    </h4>
                                                </v-input>
                                            </v-flex>
                                            <v-flex xs12 sm3>
                                                <v-input class="no-flex" :hint="amountDescription" persistent-hint label="Original Amount">
                                                    <h4 class="strike">
                                                        {{formattedOriginalAmount}} <span class="currency">{{model.currency}}</span>
                                                    </h4>
                                                </v-input>
                                            </v-flex>
                                            <v-flex xs12 sm3>
                                                <v-input class="no-flex" :hint="model.description" persistent-hint label="Payment Status">
                                                    <Div>
                                                        <fluro-status-label large v-model="model.paymentStatus" />
                                                    </Div>
                                                </v-input>
                                            </v-flex>
                                            <v-flex xs12 sm3>
                                                <v-input class="no-flex" label="Mode">
                                                    <Div>
                                                        <fluro-status-label large v-model="model.mode" />
                                                    </Div>
                                                </v-input>
                                            </v-flex>
                                        </v-layout>
                                    </fluro-panel-body>
                                    <fluro-panel-body class="border-top">
                                        <!-- <v-flex xs12 sm3> -->
                                        <v-input class="no-flex" label="Payment Gateway" :hint="`(${model.integration.module})`" persistent-hint v-if="model.integration">
                                            <v-layout align-center>
                                                <v-flex>
                                                    <Div @click="$fluro.global.view(model.integration)">
                                                        <strong>{{model.integration.title}}</strong>
                                                    </Div>
                                                </v-flex>
                                                <v-flex shrink>
                                                    <v-btn icon @click="$actions.open([model.integration])">
                                                        <fluro-icon icon="ellipsis-h" />
                                                    </v-btn>
                                                </v-flex>
                                            </v-layout>
                                        </v-input>
                                        <!-- </v-flex> -->
                                    </fluro-panel-body>
                                </fluro-panel>
                                <template v-if="model.module == 'pushpay'">
                                    <fluro-panel>
                                        <fluro-panel-title>
                                            <strong v-if="model.transactionData.card">Pushpay Card Payment</strong>
                                            <strong v-else>Pushpay {{model.transactionData.paymentMethodType}}</strong>
                                        </fluro-panel-title>
                                        <fluro-panel-body>
                                            <v-layout>
                                                <v-flex xs6>
                                                    <v-input class="no-flex" label="Campus">
                                                        <Div>{{model.transactionData.campus.name}}</Div>
                                                    </v-input>
                                                </v-flex>
                                                <v-flex xs6>
                                                    <v-input class="no-flex" label="Fund">
                                                        <Div>{{model.transactionData.fund.name}}</Div>
                                                    </v-input>
                                                </v-flex>
                                            </v-layout>
                                        </fluro-panel-body>
                                    </fluro-panel>
                                </template>
                                <template v-else>
                                    <fluro-panel>
                                        <fluro-panel-title>
                                            <strong>Card Payment</strong>
                                        </fluro-panel-title>
                                        <fluro-panel-body v-if="model.transactionData && model.transactionData.source">
                                            <h4>XXXX-XXXX-XXXX-{{model.transactionData.source.last4}}</h4>
                                            <h5>{{model.transactionData.source.name}} {{model.transactionData.source.brand}} {{model.transactionData.source.country}}</h5>
                                            <div>{{model.transactionData.source.exp_month}}/{{model.transactionData.source.exp_year}}</div>
                                        </fluro-panel-body>
                                        <fluro-panel-body class="border-top" v-if="refundAvailable">
                                            <fluro-page-preloader v-if="refunding" />
                                            <v-layout v-else>
                                                <v-flex xs12 sm6>
                                                    <v-btn block large color="primary" @click="confirmRefund(model.total)">
                                                        Full Refund &nbsp; (<strong>{{formattedTotal}}</strong>&nbsp; <Span class="currency">{{model.currency}}</Span>)
                                                    </v-btn>
                                                </v-flex>
                                                <v-spacer />
                                                <v-flex xs12 sm6>
                                                    <v-btn block large @click="promptPartial()">
                                                        Partial Refund
                                                    </v-btn>
                                                </v-flex>
                                            </v-layout>
                                        </fluro-panel-body>
                                        <!-- <div class="border-top" v-if="refundAvailable">
                                            <tabset :justified="true">
                                                <tab heading="Refund Full Amount">
                                                    <fluro-panel-body>
                                                        <v-btn large color="primary" :loading="refunding" @click="confirmRefund(model.total)">
                                                            Full Refund &nbsp; <strong>{{formattedTotal}}</strong>&nbsp; <Span class="currency">{{model.currency}}</Span>
                                                        </v-btn>
                                                    </fluro-panel-body>
                                                </tab>
                                                <tab heading="Refund Partial Amount">
                                                    <fluro-panel-body>
                                                        <v-layout>
                                                            <v-flex>
                                                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.partialRefundAmount" v-model="refundContext" />
                                                            </v-flex>
                                                            <v-flex shrink>
                                                                <v-btn small color="primary" :loading="refunding" :disabled="!refundContext.partialRefundAmount" @click="confirmRefund(refundContext.partialRefundAmount)">
                                                                    Continue
                                                                    <fluro-icon right icon="arrow-right" />
                                                                </v-btn>
                                                            </v-flex>
                                                        </v-layout>
                                                    </fluro-panel-body>
                                                </tab>
                                            </tabset>
                                        </div> -->
                                    </fluro-panel>
                                </template>
                                <fluro-panel v-if="model.transactionData">
                                    <fluro-panel-title>
                                        <strong>Explore Transaction Data</strong>
                                    </fluro-panel-title>
                                    <fluro-panel-body>
                                        <json-view :deep="1" :data="model.transactionData" />
                                    </fluro-panel-body>
                                </fluro-panel>
                                <!--  -->
                                <!-- <pre>{{model}}</pre> -->
                            </constrain>
                            <constrain v-else sm>
                                <v-container pa-0 grid-list-xl fluid>
                                    <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.title" v-model="model" />
                                    <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.description" v-model="model" />
                                    <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.module" v-model="model" />
                                    <fluro-panel>
                                        <fluro-panel-body>
                                            <v-layout>
                                                <v-flex>
                                                    <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.amount" v-model="model" />
                                                </v-flex>
                                                <v-flex>
                                                    <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.currency" v-model="model" />
                                                </v-flex>
                                            </v-layout>
                                           
                                        </fluro-panel-body>
                                    </fluro-panel>
                                    <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.contact" v-model="model" />
                                </v-container>
                            </constrain>
                        </v-container>
                    </flex-column-body>
                </tab>
                <tab :heading="`${definition.title} Information`" v-if="definition && definition.fields && definition.fields.length">
                    <flex-column-body style="background: #fafafa;">
                        <v-container fluid>
                            <fluro-content-form :options="options" v-model="model.data" :fields="definition.fields" />
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

import FluroEditor from '../../../form/FluroEditor.vue';
import FluroContentEditMixin from '../FluroContentEditMixin.js';
import GradeManager from '../components/GradeManager.vue';

/////////////////////////////////

import Vue from 'vue';

/////////////////////////////////

export default {
    components: {
        FluroEditor,
        GradeManager,
    },
    created() {

    },
    mixins: [FluroContentEditMixin],
    computed: {
        refundAvailable() {

            var self = this;

            if (self.model.module != 'stripe') {
                return;
            }

            if (!self.model.total) {
                return;
            }

            return true

        },
        refundData() {
            return this.model.refundData || [];
        },
        amountDescription() {
            return this.model.refundData && this.model.refundData.length ? 'Before refunds' : null
        },

        formattedTotal() {
            return this.$fluro.utils.formatCurrency(this.model.total, this.model.currency)
        },
        formattedOriginalAmount() {

            return this.$fluro.utils.formatCurrency(this.model.amount, this.model.currency)

        },
        currencyOptions() {
            var self = this;
            var array = [];

            if (_.get(self.user, "countryCode") == "AU") {
                array.push({
                    name: `AUD (${self.$fluro.utils.currencySymbol("aud")})`,
                    value: "aud"
                });
            }

            array.push({
                name: `USD (${self.$fluro.utils.currencySymbol("usd")})`,
                value: "usd"
            });

            if (_.get(self.user, "countryCode") != "AU") {
                array.push({
                    name: `AUD (${self.$fluro.utils.currencySymbol("aud")})`,
                    value: "aud"
                });
            }

            array.push({
                name: `GBP (${self.$fluro.utils.currencySymbol("gbp")})`,
                value: "gbp"
            });

            array.push({
                name: `CAD (${self.$fluro.utils.currencySymbol("cad")})`,
                value: "cad"
            });

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
                params: {
                    autofocus: !self.model.title
                },
            });


            addField('description', {
                title: 'Description',
                minimum: 0,
                maximum: 1,
                description: 'Add extra detail about this transaction',
                type: 'string',
            });



            addField('module', {
                title: 'Transaction Type',
                minimum: 0,
                maximum: 1,
                description: 'Manual Entry - Log Record',
                type: 'string',
                directive: 'select',
                options: [{
                    name: 'Manual Log',
                    value: 'manual',
                }],
                defaultValues: ['manual'],
            });

            addField('currency', {
                title: 'Currency',
                minimum: 1,
                maximum: 1,
                description: 'Select the currency for this transaction',
                type: 'string',
                directive: 'select',
                options: self.currencyOptions,
                defaultValues: [(_.first(self.currencyOptions) || {}).value],
            });

            addField('amount', {
                title: 'Amount',
                minimum: 1,
                maximum: 1,
                description: 'What is the amount for this transaction',
                type: 'integer',
                directive: 'currency',
                params: {
                    currency: self.model.currency,
                }
            });


            addField('contact', {
                title: 'Contact',
                minimum: 0,
                maximum: 1,
                description: 'Link to an attached contact',
                type: 'reference',
                params: {
                    restrictType: 'contact',
                    allDefinitions: true,
                },
            });




            ///////////////////////////////////

            function addField(key, details) {
                details.key = key;
                array.push(details)
            }

            return array;


        },
    },
    methods: {
        promptPartial() {
            var self = this;


            self.$fluro.prompt([{
                    title: 'Amount to refund',
                    key: 'amount',
                    minimum: 1,
                    maximum: 1,
                    type: 'integer',
                    directive: 'currency',
                    params: {
                        maxValue: self.model.total,
                        currency: self.model.currency,
                        autofocus: true,
                    },
                }])
                .then(function(res) {
                    self.confirmRefund(res.amount);
                })


        },
        confirmRefund(amount) {
            var self = this;

            self.$fluro.confirm(`Are you sure you want to refund ${self.$fluro.utils.formatCurrency(amount, self.model.currency)}?`)
                .then(function(res) {

                    self.refunding = true;

                    self.$fluro.api.post(`/payment/refund/${self.model._id}`, { amount })
                        .then(function(res) {
                            self.$fluro.notify('Refund success')
                            self.refunding = false;
                            self.$fluro.resetCache();
                        })
                        .catch(function(err) {
                            self.$fluro.error(err);
                            self.refunding = false;
                        })

                })
        }
    },
    data() {
        return {
            refundContext: {},
            refunding: false,
        }
    },
}

</script>
<style scoped lang="scss">
.currency {
    opacity: 0.5;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-size: 0.8em;
}

.strike {
    text-decoration: line-through;
    opacity: 0.7;
}

</style>
