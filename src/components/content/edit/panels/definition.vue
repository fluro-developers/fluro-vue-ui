<template>
    <flex-column>
        <template v-if="loading">
            <fluro-page-preloader contain />
        </template>
        <template v-else>
            <tabset :justified="true">
                <tab heading="Configuration">
                    <flex-column-body style="background: #fafafa;">
                        <v-container grid-list-xl>
                            <constrain sm>
                                <v-layout>
                                    <v-flex xs12 sm6>
                                        <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.title" v-model="model" />
                                    </v-flex>
                                    <v-flex xs12 sm6>
                                        <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.plural" v-model="model" />
                                    </v-flex>
                                </v-layout>
                                <!-- <v-text-field :outline="showOutline" :success="success" :required="required" label="Definition Name" v-model="definitionName" hint="This is a unique key to store this field's data in the database" :persistent-hint="true" /> -->
                                <template v-if="!model._id">
                                    <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.definitionName" v-model="model" />
                                    <template v-if="lockedSubType">
                                        <v-input class="no-flex">
                                            <v-label>Extends Type</v-label>
                                            <div>
                                                <em class="small">{{definition.plural}} always extend {{lockedSubType | definitionTitle(true)}}</em>
                                            </div>
                                        </v-input>
                                    </template>
                                    <template v-else>
                                        <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.parentType" v-model="model" />
                                    </template>
                                </template>
                                <template>
                                    <fluro-panel>
                                        <fluro-panel-body>
                                            <v-layout>
                                                <v-flex xs12 sm6>
                                                    <div class="form-group">
                                                        <label>Definition Name</label>
                                                        <div>{{model.definitionName}}</div>
                                                    </div>
                                                </v-flex>
                                                <v-flex xs12 sm6>
                                                    <div class="form-group">
                                                        <label>Extends type</label>
                                                        <div>{{model.parentType | definitionTitle}}</div>
                                                    </div>
                                                </v-flex>
                                            </v-layout>
                                        </fluro-panel-body>
                                    </fluro-panel>
                                </template>
                                <!--  <div class="form-group">
                            <label><i class="fa" ng-class="{'fa-unlock':item.privacy == 'public', 'fa-lock':item.privacy == 'secure'}"></i> Security / Privacy</label>
                            <select class="form-control" ng-model="item.privacy">
                                <option value="secure">Secure</option>
                                <option value="public">Public</option>
                            </select>
                            <p class="help-block" ng-if="item.privacy == 'secure'">Only users and applications with the 'submit {{item.definitionName}}' or 'create {{item.definitionName}}' permission can submit these forms</p>
                            <p class="help-block" ng-if="item.privacy == 'public'">Anyone can submit this interaction form without needing explicit 'submit' or 'create' permissions</p>
                        </div>


                         -->
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.privacy" v-model="model" />
                            </constrain>
                        </v-container>
                    </flex-column-body>
                </tab>
                <tab heading="Manage Fields">
                </tab>
                <tab :heading="`${definition.title} Information`" v-if="definition && definition.definitionName != 'form'">
                    <flex-column-body style="background: #fafafa;">
                        <v-container>
                            <constrain sm>
                                <fluro-content-form :options="definitionFormOptions" v-model="model.data" :fields="definition.fields" />
                            </constrain>
                        </v-container>
                    </flex-column-body>
                </tab>
                <template v-if="model.parentType == 'interaction'">
                    <tab heading="Form Settings">
                        <flex-column-body style="background: #fafafa;">
                            <v-container>
                                <constrain sm>
                                    <fluro-panel margin v-if="definition">
                                        <fluro-panel-title>
                                            <strong>{{definition.title}} Information</strong>
                                        </fluro-panel-title>
                                        <fluro-panel-body>
                                            <fluro-content-form :options="definitionFormOptions" v-model="model.data" :fields="definition.fields" />
                                        </fluro-panel-body>
                                    </fluro-panel>
                                    <fluro-panel margin>
                                        <fluro-panel-title>
                                            <strong>Contact Creation</strong>
                                        </fluro-panel-title>
                                        <fluro-panel-body>
                                            <fluro-content-form v-model="model.data" :fields="dataFields">
                                                <template v-slot:form="{formFields, fieldHash, model, update, options}">
                                                    <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.allowAnonymous" v-model="model" />
                                                    <template v-if="!model.allowAnonymous && !model.disableDefaultFields">
                                                        <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.identifier" v-model="model" />
                                                    </template>
                                                </template>
                                            </fluro-content-form>
                                        </fluro-panel-body>
                                    </fluro-panel>
                                    <fluro-panel margin>
                                        <fluro-panel-title>
                                            <strong>Optional Fields</strong>
                                        </fluro-panel-title>
                                        <fluro-content-form v-model="model.data" :fields="dataFields">
                                            <template v-slot:form="{formFields, fieldHash, model, update, options}">
                                                <template v-if="model.allowAnonymous">
                                                    <div class="field-row">
                                                        <v-layout align-center>
                                                            <v-flex xs4>
                                                                <v-label>First Name</v-label>
                                                            </v-flex>
                                                            <v-flex xs4>
                                                                <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.askFirstName" v-model="model" />
                                                            </v-flex>
                                                            <v-flex xs4>
                                                                <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.requireFirstName" v-model="model" />
                                                            </v-flex>
                                                        </v-layout>
                                                    </div>
                                                    <div class="field-row">
                                                        <v-layout align-center>
                                                            <v-flex xs4>
                                                                <v-label>Last Name</v-label>
                                                            </v-flex>
                                                            <v-flex xs4>
                                                                <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.askLastName" v-model="model" />
                                                            </v-flex>
                                                            <v-flex xs4>
                                                                <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.requireLastName" v-model="model" />
                                                            </v-flex>
                                                        </v-layout>
                                                    </div>
                                                    <div class="field-row">
                                                        <v-layout align-center>
                                                            <v-flex xs4>
                                                                <v-label>Email Address</v-label>
                                                            </v-flex>
                                                            <v-flex xs4>
                                                                <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.askEmail" v-model="model" />
                                                            </v-flex>
                                                            <v-flex xs4>
                                                                <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.requireEmail" v-model="model" />
                                                            </v-flex>
                                                        </v-layout>
                                                    </div>
                                                    <div class="field-row">
                                                        <v-layout align-center>
                                                            <v-flex xs4>
                                                                <v-label>Phone Number</v-label>
                                                            </v-flex>
                                                            <v-flex xs4>
                                                                <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.askPhone" v-model="model" />
                                                            </v-flex>
                                                            <v-flex xs4>
                                                                <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.requirePhone" v-model="model" />
                                                            </v-flex>
                                                        </v-layout>
                                                    </div>
                                                    <div class="field-row">
                                                        <v-layout align-center>
                                                            <v-flex xs4>
                                                                <v-label>Gender</v-label>
                                                            </v-flex>
                                                            <v-flex xs4>
                                                                <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.askGender" v-model="model" />
                                                            </v-flex>
                                                            <v-flex xs4>
                                                                <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.requireGender" v-model="model" />
                                                            </v-flex>
                                                        </v-layout>
                                                    </div>
                                                </template>
                                                <div class="field-row">
                                                    <v-layout align-center>
                                                        <v-flex xs4>
                                                            <v-label>Date of Birth</v-label>
                                                        </v-flex>
                                                        <v-flex xs4>
                                                            <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.askDOB" v-model="model" />
                                                        </v-flex>
                                                        <v-flex xs4>
                                                            <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.requireDOB" v-model="model" />
                                                        </v-flex>
                                                    </v-layout>
                                                </div>
                                                <fluro-panel-body class="border-top" v-if="model.allowAnonymous">
                                                    <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.disableBestGuess" v-model="model" />
                                                </fluro-panel-body>
                                            </template>
                                        </fluro-content-form>
                                    </fluro-panel>
                                    <v-container pa-0 grid-list-xl>
                                        <v-layout row wrap>
                                            <v-flex xs12 sm6>
                                                <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.publishDate" v-model="model" />
                                            </v-flex>
                                            <v-flex xs12 sm6>
                                                <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.archiveDate" v-model="model" />
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                    <fluro-panel margin>
                                        <fluro-panel-title>
                                            <Strong>Automation and other settings</Strong>
                                        </fluro-panel-title>
                                        <tabset>
                                            <tab heading="Notifications">
                                                <fluro-panel-body>
                                                    <fluro-content-form v-model="model.data" :fields="dataFields">
                                                        <template v-slot:form="{formFields, fieldHash, model, update, options}">
                                                            <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.enableConfirmation" v-model="model" />
                                                            <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.includeTickets" v-model="model" />
                                                            <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.confirmationMessage" v-model="model" />
                                                            <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.notifyContacts" v-model="model" />
                                                            <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.enableReceipt" v-model="model" />
                                                        </template>
                                                    </fluro-content-form>
                                                </fluro-panel-body>
                                            </tab>
                                            <tab heading="Processes">
                                                <fluro-panel-body>
                                                    Testing
                                                </fluro-panel-body>
                                            </tab>
                                            <tab heading="Groups and Teams">
                                                <fluro-panel-body>
                                                    Testing
                                                </fluro-panel-body>
                                            </tab>
                                            <tab heading="Capabilities">
                                                <fluro-panel-body>
                                                    Testing
                                                </fluro-panel-body>
                                            </tab>
                                            <tab heading="Reaction Pipelines">
                                                <fluro-panel-body>
                                                    Testing
                                                </fluro-panel-body>
                                            </tab>
                                            <tab heading="Other Options">
                                                <fluro-panel-body>
                                                    Testing
                                                </fluro-panel-body>
                                            </tab>
                                        </tabset>
                                    </fluro-panel>
                                </constrain>
                            </v-container>
                        </flex-column-body>
                    </tab>
                    <tab heading="Payment Settings">
                        <flex-column-body>
                            <v-container>
                                <constrain sm>
                                    <fluro-content-form v-model="model.paymentDetails" :fields="paymentFields">
                                        <template v-slot:form="{formFields, fieldHash, model, update, options}">
                                            <fluro-panel margin>
                                                <fluro-panel-body>
                                                    <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.required" v-model="model" />
                                                    <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.allow" v-model="model" />
                                                </fluro-panel-body>
                                                <template v-if="paymentIsEnabled">
                                                    <v-container pa-0 grid-list-xl>
                                                        <fluro-panel-body class="border-top" v-if="model.required">
                                                            <v-layout>
                                                                <v-flex xs9>
                                                                    <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.amount" v-model="model" />
                                                                </v-flex>
                                                                <v-flex xs3>
                                                                    <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.currency" v-model="model" />
                                                                </v-flex>
                                                            </v-layout>
                                                        </fluro-panel-body>
                                                        <fluro-panel-body class="border-top" v-if="model.allow && !model.required">
                                                            <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.currency" v-model="model" />
                                                            <v-layout>
                                                                <v-flex xs12 sm6>
                                                                    <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.minAmount" v-model="model" />
                                                                </v-flex>
                                                                <v-flex xs12 sm6>
                                                                    <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.maxAmount" v-model="model" />
                                                                </v-flex>
                                                            </v-layout>
                                                        </fluro-panel-body>
                                                    </v-container>
                                                </template>
                                            </fluro-panel>
                                        </template>
                                    </fluro-content-form>
                                    <template v-if="paymentIsEnabled">
                                        <fluro-panel margin>
                                            <fluro-panel-body>
                                                <v-input class="no-flex">
                                                    <v-label>Payment Gateway</v-label>
                                                    <p class="help-block">Select the payment gateways to be used to process these payments</p>
                                                    <!-- <fluro-panel-body class="border-top"> -->
                                                    <fluro-content-select-button block type="integration" v-model="model.data.publicData.paymentGateways" />
                                                    <!-- </fluro-panel-body> -->
                                                </v-input>
                                            </fluro-panel-body>
                                        </fluro-panel>
                                        <fluro-panel margin>
                                            <fluro-panel-body>
                                                <v-input class="no-flex">
                                                    <v-label>Payment Modifiers</v-label>
                                                    <p class="help-block">Add payment modifiers to adjust the required payment amount depending on values entered by the user</p>
                                                    <payment-modifier-editor :form="model" v-model="model.paymentDetails.modifiers" />
                                                    <!-- <fluro-panel-body class="border-top"> -->
                                                    <!-- <fluro-content-select-button block type="integration" v-model="model.data.publicData.paymentGateways" /> -->
                                                    <!-- </fluro-panel-body> -->
                                                </v-input>
                                            </fluro-panel-body>
                                        </fluro-panel>
                                        <fluro-panel margin>
                                            <fluro-content-form v-model="model.paymentDetails" :fields="paymentFields">
                                                <template v-slot:form="{formFields, fieldHash, model, update, options}">
                                                    <fluro-panel-body class="border-bottom">
                                                        <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.allowAlternativePayments" v-model="model" />
                                                    </fluro-panel-body>
                                                    <template v-if="model.allowAlternativePayments">
                                                        <tabset v-model="alternativePaymentMethodIndex">
                                                            <tab :heading="method.title" v-for="(method, index) in alternativePaymentMethods">
                                                                <fluro-panel-body>
                                                                    <fluro-content-form v-model="alternativePaymentMethods[index]" :fields="paymentMethodFields" />
                                                                    <!-- <template v-slot:form="{formFields, fieldHash, model, update, options}"> -->
                                                                    <!-- </template> -->
                                                                    <!-- </fluro-content-form> -->
                                                                    <v-layout>
                                                                        <v-spacer />
                                                                        <v-flex shrink>
                                                                            <v-btn class="ma-0" small color="error" @click="removeAlternativePaymentMethod(method, index)">
                                                                                Remove {{method.title}}
                                                                            </v-btn>
                                                                        </v-flex>
                                                                    </v-layout>
                                                                </fluro-panel-body>
                                                            </tab>
                                                            <!-- <template v-slot:menusuffix> -->
                                                            <!-- <v-btn class="ma-0" @click="addAlternativePaymentMethod()" color="primary">Add additional payment method</v-btn> -->
                                                            <!-- </template> -->
                                                        </tabset>
                                                        <fluro-panel-body class="border-top">
                                                            <!-- {{alternativePaymentMethodIndex}} -->
                                                            <v-btn class="ma-0" @click="addAlternativePaymentMethod()" color="primary">Add additional payment method</v-btn>
                                                        </fluro-panel-body>
                                                    </template>
                                                </template>
                                            </fluro-content-form>
                                        </fluro-panel>
                                        <!-- <pre>{{alternativePaymentMethods}}</pre> -->
                                    </template>
                                </constrain>
                            </v-container>
                        </flex-column-body>
                    </tab>
                </template>
                <tab heading="Advanced">
                </tab>
            </tabset>
        </template>
    </flex-column>
</template>
<script>
/////////////////////////////////

// import FluroEditor from '../../../form/FluroEditor.vue';
import FluroContentEditMixin from '../FluroContentEditMixin';
import PaymentModifierEditor from '../components/PaymentModifierEditor.vue';
import { FluroContentSelectButton } from 'fluro-vue-ui';


/////////////////////////////////

import Vue from 'vue';

/////////////////////////////////

export default {
    components: {
        FluroContentSelectButton,
        PaymentModifierEditor,
        // FluroEditor,
    },
    mixins: [FluroContentEditMixin],
    methods: {
        setParentType(parentType) {
            var self = this;

            switch (parentType) {
                case 'interaction':
                    if (!self.model.privacy) {
                        self.$set(self.model, 'privacy', 'public');
                    }

                    if (!self.model.paymentDetails) {
                        self.$set(self.model, 'paymentDetails', {});
                        console.log('SET THE PAYMENT DETAILS NOW!!')
                    }

                    if (!self.model.data) {
                        self.$set(self.model, 'data', {});
                    }

                    if (!self.model.data.publicData) {
                        self.$set(self.model.data, 'publicData', {});
                    }

                    if (!self.model.data.publicData.paymentGateways) {
                        self.$set(self.model.data.publicData, 'paymentGateways', []);
                    }
                    break;
            }
        },
        removeAlternativePaymentMethod(method, index) {
            var self = this;
            // var index = self.model.paymentDetails.paymentMethods.indexOf(method);

            // if (index != -1) {
            self.$set(method, 'enabled', false);
            self.model.paymentDetails.paymentMethods.splice(index, 1);
            setTimeout(function() {


                self.alternativePaymentMethodIndex = 0;
            })
            // }
        },
        addAlternativePaymentMethod() {

            var self = this;

            var newMethod = {
                title: 'Other Method',
                key: '',
                description: '',
            }

            if (!self.model.paymentDetails.paymentMethods) {
                self.$set(self.model.paymentDetails, 'paymentMethods', []);
            }

            self.model.paymentDetails.paymentMethods.push(newMethod);
            setTimeout(function() {


                self.alternativePaymentMethodIndex = self.model.paymentDetails.paymentMethods.length - 1;
            })
        },
    },
    // watch:{
    //     'model.definitionName':function(value){

    //         // get() {
    //         //     return this.model.definitionName;
    //         // },
    //         // set(payload) {
    //             if (!value) {
    //                 value = '';
    //             }

    //             var regexp = /[^a-zA-Z0-9-_]+/g;
    //             var cleaned = value.replace(regexp, '');
    //             this.$set(this.model, 'definitionName', cleaned)
    //         // },
    //     },
    // },
    // 
    created() {

        var self = this;

        if (self.lockedSubType && self.lockedSubType.length) {
            self.$set(self.model, 'parentType', self.lockedSubType);
        }

        if (self.model.parentType) {
            self.setParentType(self.model.parentType);
        }
    },
    watch: {
        'model.parentType': 'setParentType',
    },
    asyncComputed: {
        parentTypeOptions: {
            default: [],
            get() {
                var self = this;
                return new Promise(function(resolve, reject) {


                    self.$fluro.types.basicTypes()
                        .then(function(values) {

                            // console.log('VALUES', values);

                            var cleaned = _.chain(values)
                                .compact()
                                .map(function(type) {
                                    return {
                                        title: type.title,
                                        value: type.definitionName,
                                    }
                                })
                                .orderBy('title')
                                .value();

                            resolve(cleaned);
                        });

                })
            }
        }
    },
    computed: {
        paymentMethodFields() {
            return [{
                    title: 'Title',
                    key: 'title',
                    minimum: 1,
                    maximum: 1,
                    type: 'string',
                    description: '',
                    placeholder: `Eg. 'Bank Transfer', 'Cash', 'Cheque', 'Payment Plan'...`,
                },
                {
                    title: 'Key',
                    key: 'key',
                    minimum: 1,
                    maximum: 1,
                    type: 'string',
                    description: 'A unique key for this payment method',
                    placeholder: `Eg. 'bank', 'cash', 'cheque', 'plan'`,
                },
                {
                    title: 'Help / Description',
                    key: 'description',
                    minimum: 1,
                    maximum: 1,
                    type: 'string',
                    directive: 'wysiwyg',
                    description: 'Write a summary of how you want people to pay you if they are using alternative methods',
                    placeholder: 'Eg. Please transfer to Acc # with first name as description etc..'
                },

            ]
        },
        alternativePaymentMethods: {
            get() {
                return this.model.paymentDetails.paymentMethods || [];
            },
            set(payload) {
                this.$set(this.model.paymentDetails, 'paymentMethods', payload);
            }
        },
        paymentIsEnabled() {
            return this.model.paymentDetails && (this.model.paymentDetails.required || this.model.paymentDetails.allow)
        },
        definitionFormOptions() {
            return {}
        },
        privacyDescription() {
            switch (this.model.privacy) {
                case 'public':
                    return `Anyone can submit this interaction form without needing explicit 'submit' or 'create' permissions`
                    break;
                case 'secure':
                    return `Only users and applications with the 'submit ${this.model.definitionName}' or 'create ${this.model.definitionName}' permission can submit these forms`
                    break;
            }


        },
        definitionData() {
            return this.definition ? this.definition.data : null;
        },
        lockedSubType() {
            if (this.definitionData && this.definitionData.definitionSubType) {
                return this.definitionData.definitionSubType
            }

            return;
        },
        paymentFields() {
            var self = this;
            var array = [];

            ///////////////////////////////////

            addField('required', {
                title: 'Require Payment',
                minimum: 0,
                maximum: 1,
                type: 'boolean',

                description: `Require a payment for creating this content`,
            })

            addField('allow', {
                title: 'Allow Payment',
                minimum: 0,
                maximum: 1,
                type: 'boolean',
                expressions: {
                    hide: 'data.required'
                },
                description: `Allow a payment to be made when creating this content`,
            })

            ////////////////////////////////////////

            var paymentDetails = self.model.paymentDetails || {};

            ////////////////////////////////////////

            addField('amount', {
                title: 'Base Amount',
                minimum: 0,
                maximum: 1,
                type: 'integer',
                params: {
                    persistentDescription: true,
                },
                suffix: `(${self.$fluro.utils.formatCurrency(paymentDetails.amount, paymentDetails.currency)})`,
                description: `The base amount required for payment to create this type of content. A positive integer in the smallest currency unit (e.g 100 cents to charge $1.00). If left empty payment modifiers will need to be used to create a positive amount`,
            })


            addField('allowAlternativePayments', {
                title: 'Allow payments to be made at a later time through other methods',
                minimum: 0,
                maximum: 1,
                type: 'boolean',
                description: `Checking this box will allow the user to create this content without paying the full required amount. Payments will need to be made manually via other arrangements that can be added below.`,
            })




            addField('currency', {
                title: 'Currency',
                minimum: 0,
                maximum: 1,
                type: 'string',
                directive: 'select',
                options: [{
                        name: 'USD',
                        value: 'usd',
                    },
                    {
                        name: 'AUD',
                        value: 'aud',
                    },
                    {
                        name: 'CAD',
                        value: 'cad',
                    },
                    {
                        name: 'EUR',
                        value: 'eur',
                    },
                    {
                        name: 'GBP',
                        value: 'gbp',
                    },
                ]
            })


            ////////////////////////////////////////

            addField('minAmount', {
                title: 'Minimum Amount',
                minimum: 0,
                maximum: 1,
                type: 'integer',
                params: {
                    persistentDescription: true,
                },
                // expressions:{
                //     transform(value) {
                //         value = Number(parseFloat(value).toFixed(2));
                //         return value * 100;
                //     }
                // },
                suffix: `(${self.$fluro.utils.formatCurrency(paymentDetails.minAmount, paymentDetails.currency)})`,
                description: `The minimum amount required for payment to create this type of content`,
            })

            addField('maxAmount', {
                title: 'Maximum Amount',
                minimum: 0,
                maximum: 1,
                type: 'integer',
                params: {
                    persistentDescription: true,
                },
                // expressions:{
                //     transform(value) {
                //         value = Number(parseFloat(value).toFixed(2));
                //         return value * 100;
                //     }
                // },
                suffix: `(${self.$fluro.utils.formatCurrency(paymentDetails.maxAmount, paymentDetails.currency)})`,
                description: `The maximum amount that can be charged when creating this type of content`,
            })

            ///////////////////////////////////

            function addField(key, details) {
                details.key = key;
                array.push(details)
            }

            // console.log('DO THE OUTPUT!!!');
            return array;


        },
        dataFields() {
            var self = this;
            var array = [];

            ///////////////////////////////////

            addField('allowAnonymous', {
                title: 'Add default contact fields to form',
                minimum: 0,
                maximum: 1,
                type: 'boolean',
                inverse: true,
                description: `This will add the basic contact fields (First Name, Last Name, Email etc) to the top of the form and require a contact for the interaction. To do anonymous forms, customise your own field layout or do multi person forms it is recommended you turn this off`,
            })


            ///////////////////////////////////


            addField('disableBestGuess', {
                title: 'Attempt contact link',
                minimum: 0,
                maximum: 1,
                type: 'boolean',
                inverse: true,
                description: `Attempt to link ${self.model.title} submissions to a contact if enough data is submitted. For example, if you have a few details above that match a contact in the database, Fluro will try and create a new contact or link to an existing contact. If you want these submissions to be anonymous you want to leave this unchecked.`,
            })


            addField('enableConfirmation', {
                title: 'Send Confirmation Email',
                minimum: 0,
                maximum: 1,
                type: 'boolean',
                description: `Send a confirmation email to the primary contact upon a new submission.`,
            })

            addField('confirmationMessage', {
                title: 'Confirmation Thank You Message',
                minimum: 0,
                maximum: 1,
                type: 'string',
                directive: 'wysiwyg',
                description: `Add a customised thank you message to be shown in the confirmation email. \n Please note that event registrations will already contain key dates, locations and directions underneath this message`,
            })

            addField('includeTickets', {
                title: 'Include QR Code tickets',
                minimum: 0,
                maximum: 1,
                type: 'boolean',
                description: `Check this box if you want Fluro to send digital a QR for ticket collection.`,
            })

            addField('enableReceipt', {
                title: 'Send Fluro Transaction Receipt',
                minimum: 0,
                maximum: 1,
                type: 'boolean',
                description: `Send a transaction receipt from Fluro.`,
                expressions: {
                    hide() {
                        if (!self.model.paymentDetails) {
                            return true
                        }

                        if (self.paymentIsEnabled) {
                            return false
                        }

                        return true;
                    }
                }
            })




            addField('notifyContacts', {
                title: 'Send Notifications',
                minimum: 0,
                maximum: 0,
                type: 'reference',
                params: {
                    restrictType: 'contact',
                },
                description: `Send a basic notification to the following contacts when a new ${self.model.title} is submitted`,
            })







            ///////////////////////////////////

            //     <
            //     label > Contact ID Requirement < /label> <
            //     p class = "help-block" >
            //     Every contact requires either an email address or a phone number
            // for verification. < br / >
            //     Sometimes it makes more sense to ask / require one or both of these <
            //     /p> <
            //     select ng - model = "item.data.identifier"
            // class = "form-control" >
            //     <option value="email">Require an Email Address</option> <
            //     option value = "phone" > Require a Phone Number < /option> <
            //     option value = "either" > Require either Phone Number or Email Address < /option> <
            //     option value = "both" > Require both Phone Number and Email Address < /option> <
            //     /select>


            addField('identifier', {
                title: 'Contact ID Requirement',
                minimum: 0,
                maximum: 1,
                type: 'string',
                directive: 'select',
                description: `Every contact requires either an email address or a phone number for verification.\n
                Sometimes it makes more sense to ask/require one or both of these`,
                options: [{
                        name: 'Require an Email Address',
                        value: 'email',
                    },
                    {
                        name: 'Require a Phone Number',
                        value: 'phone',
                    },
                    {
                        name: 'Require either Phone Number or Email Address',
                        value: 'either',
                    },
                    {
                        name: 'Require both Phone Number and Email Address',
                        value: 'both',
                    },
                ]
            })

            ///////////////////////////////////

            addField('askLastName', {
                title: 'Ask Last Name',
                minimum: 0,
                maximum: 1,
                type: 'boolean',
            })

            addField('requireLastName', {
                title: 'Require Last Name',
                minimum: 0,
                maximum: 1,
                type: 'boolean',
            })

            ///////////////////////////////////

            addField('askFirstName', {
                title: 'Ask First Name',
                minimum: 0,
                maximum: 1,
                type: 'boolean',
            })

            addField('requireFirstName', {
                title: 'Require First Name',
                minimum: 0,
                maximum: 1,
                type: 'boolean',
            })

            ///////////////////////////////////

            addField('askEmail', {
                title: 'Ask Email',
                minimum: 0,
                maximum: 1,
                type: 'boolean',
            })

            addField('requireEmail', {
                title: 'Require Email',
                minimum: 0,
                maximum: 1,
                type: 'boolean',
            })

            ///////////////////////////////////

            addField('askPhone', {
                title: 'Ask Phone Number',
                minimum: 0,
                maximum: 1,
                type: 'boolean',
            })

            addField('requirePhone', {
                title: 'Require Phone Number',
                minimum: 0,
                maximum: 1,
                type: 'boolean',
            })

            ///////////////////////////////////

            addField('askGender', {
                title: 'Ask Gender',
                minimum: 0,
                maximum: 1,
                type: 'boolean',
            })

            addField('requireGender', {
                title: 'Require Gender',
                minimum: 0,
                maximum: 1,
                type: 'boolean',
            })

            ///////////////////////////////////

            addField('askDOB', {
                title: 'Ask Date of Birth',
                minimum: 0,
                maximum: 1,
                type: 'boolean',
            })

            addField('requireDOB', {
                title: 'Require Date of Birth',
                minimum: 0,
                maximum: 1,
                type: 'boolean',
            })

            ///////////////////////////////////

            function addField(key, details) {
                details.key = key;
                array.push(details)
            }

            // console.log('DO THE OUTPUT!!!');
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
                description: `The human readable singular title for this ${self.readableContentType}`,
            })

            addField('plural', {
                title: 'Plural',
                minimum: 1,
                maximum: 1,
                type: 'string',
                description: `The human readable plural for this ${self.readableContentType}`,
                expressions: {
                    defaultValue() {


                        var existingTitle = self.model.title;

                        if (!existingTitle || !existingTitle.length) {
                            return '';
                        }


                        if (_.endsWith(existingTitle, 's')) {
                            existingTitle = existingTitle + 'es';
                        } else {
                            existingTitle = existingTitle + 's';
                        }

                        return existingTitle;
                        // return ``
                    }
                }
            })

            addField('definitionName', {
                title: 'Definition Name',
                minimum: 1,
                maximum: 1,
                type: 'string',
                description: `This is a unique key to store this field's data in the database. for this ${self.readableContentType}`,
                expressions: {
                    transform(value) {

                        if (!value) {
                            return value;
                        }
                        var regexp = /[^a-zA-Z0-9-_]+/g;
                        var cleaned = _.camelCase(value).replace(regexp, '');
                        return cleaned;
                    },
                    defaultValue() {
                        return self.model.title;
                    }
                },
            })





            //////////////////////////////////////////////////

            addField('publishDate', {
                title: 'Publish / Open Date',
                minimum: 0,
                maximum: 1,
                type: 'date',
                description: `When should this form open and change status to 'active'`,
                directive: 'datetimepicker',
            })

            addField('archiveDate', {
                title: 'Archive / Close Date',
                minimum: 0,
                maximum: 1,
                type: 'date',
                description: `When should this form closed and change status to 'archived'`,
                directive: 'datetimepicker',
            })

            //////////////////////////////////////////////////


            //////////////////////////////////////////////////

            addField('parentType', {
                title: 'Parent Type',
                minimum: 1,
                maximum: 1,
                type: 'string',
                description: `What basic type of content you are defining/extending`,
                directive: 'select',
                options: self.parentTypeOptions,
            })


            //////////////////////////////////////////////////

            addField('privacy', {
                title: 'Security / Privacy',
                minimum: 0,
                maximum: 1,
                type: 'string',
                description: self.privacyDescription,
                directive: 'select',
                expressions: {
                    hide() {

                        switch (self.model.parentType) {
                            case 'interaction':
                            case 'post':
                                break;
                            default:
                                return true;
                                break;
                        }
                    },
                },
                options: [{
                        name: `Secure - Only those with permissions can submit ${self.model.plural}`,
                        value: 'secure',
                    },
                    {
                        name: `Public - Anyone can submit ${self.model.plural}`,
                        value: 'public',
                    },
                ],
            })

            ///////////////////////////////////

            function addField(key, details) {
                details.key = key;
                array.push(details)
            }

            // console.log('DO THE OUTPUT!!!');
            return array;

        },
    },
    data() {
        return {
            alternativePaymentMethodIndex: 0,
            expandedSettings: {
                _contacts: false,
                _teams: false,
                _events: false,
                _tickets: false,
            },
            editorOptions: {},
        }
    },
}
</script>
<style lang="scss" scoped>
.field-row {
    padding: 0 15px;
    border-bottom: 1px solid rgba(#000, 0.1);
}
</style>