<template>
    <flex-column>
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
                <!-- <tab heading="Account Information"> -->
                <flex-column-body style="background: #fafafa;">
                    <v-container fluid>
                        <constrain sm>
                            <!-- <pre>{{model}}</pre> -->
                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.title" v-model="model" />
                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.legalName" v-model="model" />
                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.primaryContacts" v-model="model" />
                            <fluro-panel>
                                <tabset :justified="true">
                                    <tab heading="Basic Information">
                                        <fluro-panel-body>
                                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.shortName" v-model="model" />
                                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.prefix" v-model="model" />
                                            <v-layout>
                                                <v-flex>
                                                    <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.defaultEmailAddress" v-model="model" />
                                                </v-flex>
                                                <v-spacer />
                                                <v-flex>
                                                    <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.defaultPhoneNumber" v-model="model" />
                                                </v-flex>
                                            </v-layout>
                                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.countryCode" v-model="model" />
                                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.timezone" v-model="model" />
                                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.notificationPreference" v-model="model" />
                                        </fluro-panel-body>
                                    </tab>
                                    <tab heading="Advanced">
                                        <fluro-panel-body>
                                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.defaultEmailTemplate" v-model="model" />
                                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.color" v-model="model" />
                                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.parentAccounts" v-model="model" />
                                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.inheritRealms" v-model="model" />
                                        </fluro-panel-body>
                                    </tab>
                                </tabset>
                            </fluro-panel>
                            <fluro-panel>
                                <fluro-panel-title><strong>
                                        Products
                                    </strong>
                                </fluro-panel-title>
                                <fluro-panel-body class="border-bottom" v-for="product in model.data.products" v-if="product.actual">
                                    <v-container pa-0 fluid>
                                        <v-layout>
                                            <v-flex>
                                                <h5>{{product.actual.title}}</h5>
                                            </v-flex>
                                            <v-flex shrink>
                                                <h5 v-if="isDiscounted(product)" style="text-decoration: line-through; opacity:0.5;">{{getNormalPriceForProduct(product, true)}} {{product.actualPaymentOption.title}}</h5>
                                                <h5>{{getDiscountedPriceForProduct(product, true)}} {{product.actualPaymentOption.title}}</h5>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                    <v-layout v-if="product.actualPaymentOption">
                                        <v-flex xs3>
                                            <strong>Plan</strong>
                                        </v-flex>
                                        <v-flex>
                                            {{product.actualPaymentOption.title}}
                                        </v-flex>
                                    </v-layout>
                                    <v-layout v-if="product.actualTier">
                                        <v-flex xs3>
                                            <strong>Current Tier</strong>
                                        </v-flex>
                                        <v-flex>
                                            {{product.actualTier.title}}
                                        </v-flex>
                                    </v-layout>
                                    <v-layout>
                                        <v-flex xs3>
                                            <strong>Next Bill</strong>
                                        </v-flex>
                                        <v-flex>
                                            <fluro-inline-edit>
                                                <template v-slot:default>
                                                    <div> {{product.productExpiry | formatDate('h:mma ddd D MMM YYYY')}} <span class="font-sm muted">{{product.productExpiry | timeago}}</span></div>
                                                </template>
                                                <template v-slot:edit="{props, blur, focus}">
                                                    <fluro-content-form-field @input="update" :options="options" :field="fieldHash.productExpiry" v-model="model.data.products[product._id]" />
                                                    <!-- <input block @focus="focus($event)" placeholder="Enter a title for this content" v-model="model.title" @keyup.enter="blur" @blur="blur" /> -->
                                                </template>
                                            </fluro-inline-edit>
                                        </v-flex>
                                    </v-layout>
                                    <div v-if="product.discounts">
                                        <v-label>Discounts Applied</v-label>
                                        <v-layout v-for="discount in product.discounts">
                                            <v-flex xs3>
                                                <strong>{{discount.title}}</strong>
                                            </v-flex>
                                            <v-flex>
                                                <span v-if="discount.percent">{{discount.percent}}%</span>
                                                <span v-if="discount.amount">{{$fluro.utils.formatCurrency(discount.amount, product.currency)}}</span>
                                            </v-flex>
                                        </v-layout>
                                    </div>
                                    <!-- <pre>{{product}}</pre> -->
                                    <!-- <v-container grid-list-xl pa-0 fluid>
                                        <v-layout>
                                            <v-flex xs6>
                                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.howDidTheyHear" v-model="model.internal" />
                                            </v-flex>
                                            <v-spacer />
                                            <v-flex xs6>
                                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.goals" v-model="model.internal" />
                                            </v-flex>
                                        </v-layout>
                                        <v-layout>
                                            <v-flex xs6>
                                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.previousSoftware" v-model="model.internal" />
                                            </v-flex>
                                            <v-spacer />
                                            <v-flex xs6>
                                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.appProvider" v-model="model.internal" />
                                            </v-flex>
                                        </v-layout>
                                        <v-layout>
                                            <v-flex xs6>
                                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.givingProvider" v-model="model.internal" />
                                            </v-flex>
                                            <v-spacer />
                                            <v-flex xs6>
                                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.websiteProvider" v-model="model.internal" />
                                            </v-flex>
                                        </v-layout>
                                    </v-container> -->
                                </fluro-panel-body>
                            </fluro-panel>
                            <fluro-panel>
                                <fluro-panel-title><strong>
                                        CRM Information
                                    </strong>
                                </fluro-panel-title>
                                <fluro-panel-body>
                                    <v-container grid-list-xl pa-0 fluid>
                                        <v-layout>
                                            <v-flex xs6>
                                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.howDidTheyHear" v-model="model.internal" />
                                            </v-flex>
                                            <v-spacer />
                                            <v-flex xs6>
                                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.goals" v-model="model.internal" />
                                            </v-flex>
                                        </v-layout>
                                        <v-layout>
                                            <v-flex xs6>
                                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.previousSoftware" v-model="model.internal" />
                                            </v-flex>
                                            <v-spacer />
                                            <v-flex xs6>
                                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.appProvider" v-model="model.internal" />
                                            </v-flex>
                                        </v-layout>
                                        <v-layout>
                                            <v-flex xs6>
                                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.givingProvider" v-model="model.internal" />
                                            </v-flex>
                                            <v-spacer />
                                            <v-flex xs6>
                                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.websiteProvider" v-model="model.internal" />
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                </fluro-panel-body>
                            </fluro-panel>
                            <fluro-panel>
                                <fluro-panel-title><strong>
                                        Account Credit
                                    </strong>
                                </fluro-panel-title>
                                <fluro-panel-body>
                                    <v-layout>
                                        <v-flex>
                                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.creditAmount" v-model="model" />
                                        </v-flex>
                                        <v-spacer />
                                        <v-flex>
                                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.creditCurrency" v-model="model" />
                                        </v-flex>
                                    </v-layout>
                                    <v-btn class="ma-0" color="primary" :loading="processing" @click="addCredit()">Add Credit</v-btn>
                                </fluro-panel-body>
                            </fluro-panel>
                        </constrain>
                    </v-container>
                </flex-column-body>
                <!-- </tab> -->
                <!-- <tab :heading="`${definition.title} Information`" v-if="definition && definition.fields && definition.fields.length">
                    <fluro-content-form :options="options" v-model="model.data" :fields="definition.fields" />
                </tab> -->
            </tabset>
        </template>
    </flex-column>
</template>
<script>
/////////////////////////////////

import FluroEditor from '../../../form/FluroEditor.vue';
import FluroContentEditMixin from '../FluroContentEditMixin.js';
import FluroInlineEdit from "../../../form/FluroInlineEdit.vue";

/////////////////////////////////

import Vue from 'vue';

/////////////////////////////////

export default {
    components: {
        FluroEditor,
        FluroInlineEdit,
    },
    created() {
        if (!this.model.internal) {
            this.model.internal = {};
        }
    },
    mixins: [FluroContentEditMixin],
    computed: {
        fieldsOutput() {


            var self = this;
            var array = [];

            ///////////////////////////////////

            addField('title', {
                title: 'Account Name',
                minimum: 1,
                maximum: 1,
                type: 'string',
            });




            addField('legalName', {
                title: 'Legal Entity Name',
                minimum: 0,
                maximum: 1,
                type: 'string',
            });



            addField('shortName', {
                title: 'Short Sender Name',
                minimum: 0,
                maximum: 1,
                type: 'string',
                description: 'Short sender name for sending SMS Messages',
            });

            addField('prefix', {
                title: 'Unique Prefix ID',
                minimum: 0,
                maximum: 1,
                type: 'string',
            });


            addField('defaultEmailAddress', {
                title: 'Default Email Address',
                type: 'email',
                description: 'The default sender email address for this account',
                minimum: 0,
                maximum: 1,
            });


            addField('defaultEmailTemplate', {
                title: 'Default Email Template',
                type: 'reference',
                description: 'The default mailout template for system emails from this account',
                maximum: 1,
                minimum: 0,
                params: {
                    restrictType: 'definition',
                }
            });




            addField('notificationPreference', {
                title: 'Notification Preference',
                type: 'string',
                description: `Select what to prefer for notifications, defaults to 'failover' which will only send notifications through the first available channel`,
                directive: 'select',
                minimum: 0,
                maximum: 1,
                options: [{
                        value: '',
                        name: 'Fluro Default (failover)',
                    }, {
                        value: 'failover',
                        name: 'Failover',
                    },
                    {
                        value: 'all',
                        name: 'All',
                    }, {
                        value: 'push',
                        name: 'Push',
                    }, {
                        value: 'email',
                        name: 'Email',
                    }, {
                        value: 'sms',
                        name: 'SMS',
                    },
                    {
                        value: 'disabled',
                        name: 'Do not send notifications',
                    }
                ],
            });


            addField('countryCode', {
                title: 'Default ISO Country Code',
                type: 'string',
                description: 'Provide a default 2 character ISO Country Code for phone numbers within this account',
                directive: 'countrycodeselect',
                minimum: 0,
                maximum: 1,
            });

            addField('timezone', {
                title: 'Account Default Timezone',
                type: 'string',
                description: 'Provide a default timezone for events and contacts created in this account',
                directive: 'timezoneselect',
                minimum: 0,
                maximum: 1,
            });

            addField('defaultEmailTemplate', {
                title: 'Default Email Template',
                type: 'reference',
                description: 'The default mailout template for system emails from this account',
                maximum: 1,
                minimum: 0,
                params: {
                    restrictType: 'definition',
                }
            });


            addField('defaultPhoneNumber', {
                title: 'Default Phone Number',
                type: 'string',
                description: 'The default phone number for this account',
                maximum: 1,
                minimum: 0,
            });

            addField('color', {
                title: 'Primary Color',
                type: 'string',
                description: 'The default color for this account',
                directive: 'color',
                minimum: 0,
                maximum: 1,
            });

            addField('parentAccounts', {
                title: 'Inherited Accounts',
                type: 'reference',
                description: 'Parent accounts this account inherits from',
                minimum: 0,
                maximum: 0,
                params: {
                    restrictType: 'account',
                },
            });


            addField('primaryContacts', {
                title: 'Primary Account Contacts',
                type: 'reference',
                minimum: 0,
                maximum: 0,
                params: {
                    restrictType: 'contact',
                }
            });

            addField('inheritRealms', {
                title: 'Inherited Realms',
                type: 'reference',
                description: 'Realms this account inherits content from',
                minimum: 0,
                maximum: 0,
                params: {
                    restrictType: 'realm',
                },
            });




            addField('productExpiry', {
                title: 'Product Expiry Date',
                type: 'date',
                directive: 'datetimepicker',
                minimum: 1,
                maximum: 1,
            });



            addField('howDidTheyHear', {
                title: 'How did they hear about us',
                type: 'string',
                directive: 'select',
                minimum: 0,
                maximum: 1,
                options: [{
                        name: 'Website',
                        value: 'website',
                    },
                    {
                        name: 'Facebook',
                        value: 'facebook',
                    },

                    {
                        name: 'Word of mouth',
                        value: 'wordofmouth',
                    },
                    {
                        name: 'Partner Referral',
                        value: 'referral',
                    },
                    {
                        name: 'Customer Referral',
                        value: 'customer',
                    },
                    {
                        name: 'Advertisement',
                        value: 'advertisement',
                    },
                    {
                        name: 'Email footer',
                        value: 'emailfooter',
                    },
                    {
                        name: 'Other',
                        value: 'other',
                    },
                ]
            });


            addField('goals', {
                title: 'Goals and Dreams',
                type: 'string',
                directive: 'select',
                // directive:'button-select',
                minimum: 0,
                maximum: 0,
                options: [{
                        name: 'New Website',
                        value: 'website',
                    },
                    {
                        name: 'Native App',
                        value: 'app',
                    },
                    {
                        name: 'Analytics / Insights',
                        value: 'analytics',
                    },
                    {
                        name: 'Checkin / Attendance',
                        value: 'checkin',
                    },
                    {
                        name: 'Service Planning',
                        value: 'planning',
                    },
                    {
                        name: 'Volunteer Management',
                        value: 'volunteers',
                    },
                    {
                        name: 'Small Group Management',
                        value: 'groups',
                    },
                    {
                        name: 'Scheduling / Rostering',
                        value: 'rostering',
                    },
                    {
                        name: 'Form Building',
                        value: 'forms',
                    },

                    {
                        name: 'Photo / Media Management',
                        value: 'media',
                    },

                    {
                        name: 'Processes and Workflows',
                        value: 'processes',
                    },

                    {
                        name: 'Email Communications',
                        value: 'mailout',
                    },

                    {
                        name: 'SMS Communications',
                        value: 'sms',
                    },
                ]
            });



            addField('givingProvider', {
                title: 'Giving Provider',
                type: 'string',
                description: "Which giving provider does this account use",
                directive: 'select',
                minimum: 0,
                maximum: 1,
                options: [{
                        name: 'Tithely',
                        value: 'tithely',
                    },
                    {
                        name: 'Pushpay',
                        value: 'pushpay',
                    },

                    {
                        name: 'Paypal',
                        value: 'paypal',
                    },
                    {
                        name: 'Stripe',
                        value: 'stripe',
                    },
                    {
                        name: 'Subsplash',
                        value: 'subsplash',
                    },
                    {
                        name: 'Fluro',
                        value: 'fluro',
                    },
                    {
                        name: 'Custom / Other',
                        value: 'other',
                    },
                ]
            });

            addField('appProvider', {
                title: 'App Provider',
                type: 'string',
                description: "Which app provider does this account use",
                directive: 'select',
                minimum: 0,
                maximum: 1,
                options: [{
                        name: 'Tithely',
                        value: 'tithely',
                    },
                    {
                        name: 'Pushpay',
                        value: 'pushpay',
                    },

                    {
                        name: 'Subsplash',
                        value: 'subsplash',
                    },


                    {
                        name: 'Fluro',
                        value: 'fluro',
                    },
                    {
                        name: 'Custom / Other',
                        value: 'other',
                    },
                ]
            });



            addField('websiteProvider', {
                title: 'Website Provider',
                type: 'string',
                description: "Which website provider does this account use",
                directive: 'select',
                minimum: 0,
                maximum: 1,
                options: [{
                        name: 'Tithely',
                        value: 'tithely',
                    },
                    {
                        name: 'The Church Co',
                        value: 'thechurchco',
                    },

                    {
                        name: 'Squarespace',
                        value: 'squarespace',
                    },
                    {
                        name: 'Wix',
                        value: 'wix',
                    },
                    {
                        name: 'Webflow',
                        value: 'webflow',
                    },
                    {
                        name: 'Clover',
                        value: 'clover',
                    },
                    {
                        name: 'Nucleus',
                        value: 'nucleus',
                    },
                    {
                        name: 'RockRMs',
                        value: 'rockrms',
                    },
                    {
                        name: 'Wordpress',
                        value: 'wordpress',
                    },
                    {
                        name: 'Fluro',
                        value: 'fluro',
                    },
                    {
                        name: 'Custom / Other',
                        value: 'other',
                    },
                ]
            });


            addField('previousSoftware', {
                title: 'Previous Software',
                type: 'string',
                description: "Which provider did this account use before moving to Fluro",
                directive: 'select',
                minimum: 0,
                maximum: 1,
                options: [{
                        name: 'Tithely / Elvanto',
                        value: 'tithely',
                    },
                    {
                        name: 'RockRMS',
                        value: 'rockrms',
                    },

                    {
                        name: 'Spreadsheets',
                        value: 'spreadsheet',
                    },
                    {
                        name: 'Planning Center',
                        value: 'pco',
                    },
                    {
                        name: 'UCare',
                        value: 'ucare',
                    },
                    {
                        name: 'Churchtrac',
                        value: 'churchtrac',
                    },
                    {
                        name: 'Hubspot',
                        value: 'hubspot',
                    },
                    {
                        name: 'Capsule',
                        value: 'capsule',
                    },
                    {
                        name: 'Breeze',
                        value: 'breeze',
                    },
                    {
                        name: 'Church Community Builder',
                        value: 'ccb',
                    },

                    {
                        name: 'Custom / Other',
                        value: 'other',
                    },
                ]
            });




            addField('creditAmount', {
                title: 'Credit Amount',
                type: 'integer',
                description: "An integer in the smallest currency unit (e.g., 100 cents to charge $1.00 or 100 to charge ¥100, a 0-decimal currency) defaults to 0",
                directive: 'currency',
                minimum: 0,
                maximum: 1,
                params: {
                    currency: self.model.creditCurrency,
                },
            });

            addField('creditCurrency', {
                title: 'Currency',
                type: 'string',
                description: "The currency used to renew this account eg(aud, usd, gbp)",
                directive: 'input',
                minimum: 1,
                maximum: 1,
                defaultValues: ['aud'],
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
        isDiscounted(product) {
            return this.getNormalPriceForProduct(product) != this.getDiscountedPriceForProduct(product);
        },
        getNormalPriceForProduct(product, readable) {
            var self = this;

            if (!product.actualTier) {
                return 0;
            }

            var price = product.actualTier.cost || 0;
            var adjustment = parseFloat(product.actualPaymentOption.adjustment || 0) || 100;
            var adjustedPrice = adjustment ? (price * product.actualPaymentOption.adjustment) / 100 : price;

            if (readable) {
                return self.$fluro.utils.formatCurrency(adjustedPrice, product.currency);
            }
            return adjustedPrice;
        },
        getDiscountedPriceForProduct(product, readable) {

            var self = this;

            var adjustedPrice = self.getNormalPriceForProduct(product);

            var runningTotal = adjustedPrice;
            _.each(product.discounts, function(discount, id) {
                switch (discount.type) {
                    case 'percent':
                        //Get the percentage
                        var deduction = (parseFloat(discount.percent || 0) * adjustedPrice / 100);

                        console.log('DISCOUNT', deduction, discount.percent + '%');
                        runningTotal = Math.max(runningTotal - deduction, 0);
                        break;
                    default:

                        var deduction = parseInt(discount.amount || 0);
                        console.log('DISCOUNT AMOUNT', deduction);
                        runningTotal = Math.max(runningTotal - deduction, 0);
                        break;
                }
            });


            if (readable) {
                return self.$fluro.utils.formatCurrency(runningTotal, product.currency);
            }


            return runningTotal;
        },
        addCredit() {
            var self = this;
            var account = self.$fluro.utils.getStringID(self.model);

            /////////////////////////////////////////

            self.$fluro.prompt([{
                    title: 'Credit Amount',
                    key: 'amount',
                    type: 'integer',
                    directive: 'currency',
                    minimum: 1,
                    maximum: 1,
                    params: {
                        currency: self.model.creditCurrency,
                    }
                }], 'Add Credit')
                .then(function(details) {

                    if (!details || !details.amount) {
                        return;
                    }

                    self.processing = true;

                    self.$fluro.api.put('/system/account/credit', {
                            amount: details.amount,
                            account,
                        })
                        .then(function(res) {
                            console.log('RES', res);
                            self.$fluro.notify('Account credit has been updated');
                            self.processing = false;
                            self.$fluro.resetCache();
                        })
                        .catch(function(err) {
                            self.$fluro.error(err);
                            self.processing = false;
                        });

                })
        },
    },
    data() {
        return {
            processing: false,
        }
    },
}

</script>
<style lang="scss">
</style>
