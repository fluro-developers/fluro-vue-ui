<template>
    <flex-column-body>
        <v-container fluid>
            <constrain sm>
                
                <fluro-panel v-if="item.contact">
                    <fluro-panel-body>
                        <v-input class="no-flex" label="Contact">
                            <v-layout align-center>
                                <v-flex shrink style="padding-right:10px;">
                                    <fluro-avatar md :id="item.contact" type="contact" />
                                </v-flex>
                                <v-flex>
                                    <h5>{{item.contact.title}}</h5>
                                    <div class="muted">{{item.definition || 'contact' | definitionTitle}}</div>
                                </v-flex>
                                <v-flex shrink style="padding-right:10px;">
                                    <v-btn class="ma-0" v-if="$fluro.access.canEditItem(item.contact)" icon @click="$fluro.global.edit(item.contact, true)">
                                        <fluro-icon icon="pencil" />
                                    </v-btn>
                                    <v-btn class="ma-0 ml-1" icon @click="$actions.open([item.contact])">
                                        <fluro-icon icon="ellipsis-h" />
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </v-input>
                    </fluro-panel-body>
                </fluro-panel>
                <fluro-panel v-if="item.persona">
                    <fluro-panel-body>
                        <v-input class="no-flex" label="User Persona">
                            <v-layout align-center>
                                <v-flex shrink style="padding-right:10px;">
                                    <fluro-avatar md :id="item.persona" type="persona" />
                                </v-flex>
                                <v-flex>
                                    <h5>{{item.persona.title}}</h5>
                                    <div v-if="item.persona.collectionEmail">{{item.persona.collectionEmail}}</div>
                                    <div v-else="item.persona.userEmail">{{item.persona.userEmail}}</div>
                                    <div v-if="item.persona.username">{{item.persona.username}}</div>
                                    <div class="muted">{{item.definition || 'persona' | definitionTitle}}</div>
                                </v-flex>
                                <v-flex shrink style="padding-right:10px;">
                                    <v-btn class="ma-0" v-if="$fluro.access.canEditItem(item.persona)" icon @click="$fluro.global.edit(item.persona, true)">
                                        <fluro-icon icon="pencil" />
                                    </v-btn>
                                    <v-btn class="ma-0 ml-1" icon @click="$actions.open([item.persona])">
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
                                        {{formattedTotal}} <span class="currency">{{item.currency}}</span>
                                    </h4>
                                </v-input>
                            </v-flex>
                            <v-flex xs12 sm3>
                                <v-input class="no-flex" :hint="amountDescription" persistent-hint label="Original Amount">
                                    <h4 class="strike">
                                        {{formattedOriginalAmount}} <span class="currency">{{item.currency}}</span>
                                    </h4>
                                </v-input>
                            </v-flex>
                            <v-flex xs12 sm3>
                                <v-input class="no-flex" :hint="item.description" persistent-hint label="Payment Status">
                                    <Div>
                                        <fluro-status-label large v-model="item.paymentStatus" />
                                    </Div>
                                </v-input>
                            </v-flex>
                            <v-flex xs12 sm3>
                                <v-input class="no-flex" label="Mode">
                                    <Div>
                                        <fluro-status-label large v-model="item.mode" />
                                    </Div>
                                </v-input>
                            </v-flex>
                        </v-layout>
                    </fluro-panel-body>
                    <fluro-panel-body class="border-top">
                        <!-- <v-flex xs12 sm3> -->
                        <v-input class="no-flex" label="Payment Gateway" :hint="`(${item.integration.module})`" persistent-hint v-if="item.integration">
                            <v-layout align-center>
                                <v-flex>
                                    <Div @click="$fluro.global.view(item.integration)">
                                        <strong>{{item.integration.title}}</strong>
                                    </Div>
                                </v-flex>
                                <v-flex shrink>
                                    <v-btn icon @click="$actions.open([item.integration])">
                                        <fluro-icon icon="ellipsis-h" />
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </v-input>
                        <!-- </v-flex> -->
                    </fluro-panel-body>
                </fluro-panel>
                <template v-if="item.module == 'pushpay'">
                    <fluro-panel>
                        <fluro-panel-title>
                            <strong v-if="item.transactionData.card">Pushpay Card Payment</strong>
                            <strong v-else>Pushpay {{item.transactionData.paymentMethodType}}</strong>
                        </fluro-panel-title>
                        <fluro-panel-body>
                            <v-layout>
                                <v-flex xs6>
                                    <v-input class="no-flex" label="Campus">
                                        <Div>{{item.transactionData.campus.name}}</Div>
                                    </v-input>
                                </v-flex>
                                <v-flex xs6>
                                    <v-input class="no-flex" label="Fund">
                                        <Div>{{item.transactionData.fund.name}}</Div>
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
                        <!-- <pre>{{cardDetails}}</pre> -->
                        <fluro-panel-body v-if="cardDetails">
                            <h4>XXXX-XXXX-XXXX-{{cardDetails.last4}}</h4>
                            <h5>{{cardDetails.name}} {{cardDetails.brand}} {{cardDetails.country}}</h5>
                            <div>{{cardDetails.exp_month}}/{{cardDetails.exp_year}}</div>
                        </fluro-panel-body>
                    </fluro-panel>
                </template>
                <fluro-panel v-if="item.transactionData">
                    <fluro-panel-title>
                        <strong>Explore Transaction Data</strong>
                    </fluro-panel-title>
                    <fluro-panel-body>
                        <json-view :deep="1" :data="item.transactionData" />
                    </fluro-panel-body>
                </fluro-panel>
            </constrain>
        </v-container>
    </flex-column-body>
</template>
<script>
/////////////////////////////////

import Vue from 'vue';
import FluroContentViewMixin from '../FluroContentViewMixin.js';
// import FluroContentRender from '../../../FluroContentRender.vue';

/////////////////////////////////

export default {
    props: {
        config: {
            type: Object,
            required: true,
        },
        item: {
            type: Object,
            required: true,
        },
    },
    // components: {
    //     FluroContentRender,
    // },
    mixins: [FluroContentViewMixin],
    methods: {},
    computed: {
        data() {
            return this.item.data || {}
        },
        definedFields() {
            return this.definition ? this.definition.fields : null;
        },
        cardDetails() {

            var self = this;

            var paymentModule = self.item.module;
            var transactionData = _.get(self.item, 'transactionData');

            if (!transactionData) {
                return;
            }

            switch (paymentModule) {
                case 'stripe':
                    return {
                        name: transactionData.source.name,
                        last4: transactionData.source.last4,
                        brand: transactionData.source.last4,
                        country: transactionData.source.country,
                        exp_month: transactionData.source.exp_month,
                        exp_year: transactionData.source.exp_year,
                    }
                    break;
                case 'eway':

                    var cardData = _.get(transactionData, 'Customer.CardDetails') || {};
                    return {
                        name: cardData.Name,
                        last4: String(cardData.Number || '').slice(-4),
                        brand: '', //''cardData.last4,
                        country: '',
                        exp_month: cardData.ExpiryMonth,
                        exp_year: cardData.ExpiryYear,
                    }
                    break;
                case 'square':
                    var cardData = _.get(transactionData, 'payment.cardDetails.card');
                    return {
                        name: cardData.name || '',
                        last4: cardData.last4,
                        brand: cardData.cardBrand,
                        country: cardData.country || '',
                        exp_month: cardData.expMonth,
                        exp_year: cardData.expYear,
                    }
                    break;
            }
        },
        refundData() {
            return this.item.refundData || [];
        },
        amountDescription() {
            return this.item.refundData && this.item.refundData.length ? 'Before refunds' : null
        },

        formattedTotal() {
            return this.$fluro.utils.formatCurrency(this.item.total, this.item.currency)
        },
        formattedOriginalAmount() {

            return this.$fluro.utils.formatCurrency(this.item.amount, this.item.currency)

        },
    },
    data() {
        return {}
    },
}

</script>
<style scoped lang="scss">
</style>
