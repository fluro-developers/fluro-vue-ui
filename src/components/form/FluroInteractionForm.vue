<template>
				<div class="fluro-interaction-form">
								<!-- <pre>Form Options: {{formOptions}}</pre> -->
								<!-- <pre>Email: {{askEmail}} {{requireEmail}}</pre> -->
								<!-- <pre>Phone: {{askPhone}} {{requirePhone}}</pre> -->
								<!-- 	<v-layout>
												<v-flex> -->
								<template v-if="renderable">
												<template v-if="!allowed">
																<template v-if="user">
																				<slot name="authenticated">
																								You do not have permission to submit this form
																				</slot>
																</template>
																<template v-if="!user">
																				<slot name="unauthenticated">
																								You must be signed in to submit this form
																				</slot>
																</template>
												</template>
												<template v-if="allowed">
																<slot name="success" :reset="reset" :result="result" v-if="state == 'success'">
																				<div class="text-xs-center">
																								<h3>Submission Successful</h3>
																								<div>Thank you for your submission</div>
																								<template v-if="webMode">
																												<fluro-button @click="reset()">
																																Back to form
																												</fluro-button>
																								</template>
																								<template v-else>
																												<v-btn @click="reset()">
																																Back to form
																												</v-btn>
																								</template>
																								<!-- <v-btn class="mx-0" @click="reset()">
																												Back to form
																								</v-btn> -->
																				</div>
																</slot>
																<template v-else>
																				<slot name="info"></slot>
																				<form @submit.stop.prevent="submit" novalidate :disabled="state == 'processing'">
																								<!-- <pre>{{allowAnonymous}}</pre> -->
																								<!-- <pre>{{fields}}</pre> -->
																								<!-- <pre>{{options}}</pre> -->
																								<!-- <pre>{{errorMessages}}</pre> -->
																								<!-- <pre>{{showPaymentForm}}</pre> -->
																								<fluro-content-form :context="context" :debugMode="debugMode" :contextField="contextField" :recursiveClick="recursiveClick" @errorMessages="validate" @input="modelChanged" ref="form" :options="options" v-model="dataModel" :fields="fields" />
																								<div class="payment" v-if="showPaymentForm">
																												<v-container>
																																<h2>Payment Summary</h2>
																																<v-layout align-center>
																																				<v-flex class="modifier-title">
																																								<strong>Amount</strong>
																																				</v-flex>
																																				<v-flex shrink v-if="baseAmount">
																																								<strong>{{
																																												formattedBaseAmount
																																												}}</strong>
																																				</v-flex>
																																</v-layout>
																																<div class="modifier" v-for="modifier in activeModifiers">
																																				<v-layout align-center>
																																								<v-flex class="modifier-title">
																																												{{ modifier.title }}
																																								</v-flex>
																																								<v-flex shrink>
																																												{{ modifier.description }}
																																								</v-flex>
																																								<v-flex shrink>
																																												{{ modifier.formattedTotal }}
																																								</v-flex>
																																				</v-layout>
																																</div>
																																<div>
																																				<v-layout align-center>
																																								<v-flex>
																																												<h3>Total</h3>
																																								</v-flex>
																																								<v-flex shrink>
																																												<h3>
																																																{{ formattedTotal }}
																																																<span class="muted">{{
																																																				currency.toUpperCase()
																																																				}}</span>
																																												</h3>
																																								</v-flex>
																																				</v-layout>
																																</div>
																												</v-container>
																												<v-container style="background: #fafafa" class="border-top">
																																<h4>Card Details</h4>
																																<fluro-content-form @errorMessages="validate" @input="modelChanged" ref="payment" :options="options" v-model="dataModel" :fields="paymentFields" />
																												</v-container>
																												<v-container v-if="definition.data.enableReceipt" style="background: #fafafa" class="border-top">
																																<!-- <h5>Would you like an email receipt?</h5> -->
																																<fluro-content-form-field @input="modelChanged" :options="options" :field="receiptInput" v-model="dataModel" />
																												</v-container>
																								</div>
																								<div class="actions">
																												<template v-if="state == 'processing'">
																																<template v-if="webMode">
																																				<fluro-button :loading="true" :block="mobile" :large="mobile" :disabled="true">
																																								{{submitText}}
																																				</fluro-button>
																																</template>
																																<template v-else>
																																				<v-btn :block="mobile" :large="mobile" class="mx-0" :disabled="true">
																																								{{submitText}}
																																								<v-progress-circular indeterminate></v-progress-circular>
																																				</v-btn>
																																</template>
																												</template>
																												<template v-else-if="state == 'error'">
																																<v-alert :value="true" type="error" outline>
																																				{{ serverErrors }}
																																</v-alert>
																																<template v-if="webMode">
																																				<fluro-button :block="mobile" :large="mobile" @click.prevent.native="state = 'ready'">
																																								Try Again
																																				</fluro-button>
																																</template>
																																<template v-else>
																																				<v-btn :block="mobile" :large="mobile" class="mx-0" @click.prevent.native="state = 'ready'">
																																								Try Again
																																				</v-btn>
																																</template>
																												</template>
																												<template v-else>
																																<v-alert :value="true" type="error" outline v-if="hasErrors">
																																				Please check the following issues before
																																				submitting
																																				<div v-for="error in errorMessages">
																																								<strong>{{ error.title }}</strong>: {{ error.messages[0] }}
																																				</div>
																																</v-alert>
																																<v-layout>
																																				<template v-if="webMode">
																																								<fluro-button @click.native.prevent="submit" :block="mobile" :large="mobile" :disabled="hasErrors" type="submit">
																																												{{submitText}}
																																								</fluro-button>
																																				</template>
																																				<template v-else>
																																								<v-btn :block="mobile" :large="mobile" class="mx-0" :disabled="hasErrors" type="submit" color="primary">
																																												{{submitText}}
																																								</v-btn>
																																				</template>
																																				<!--  -->
																																				<v-spacer />
																																				<slot name="submit"></slot>
																																</v-layout>
																												</template>
																								</div>
																				</form>
																</template>
												</template>
												<!-- <pre>ERRORS {{errorMessages}}</pre> -->
								</template>
								<!-- </v-flex>
												<v-flex>
																<pre>{{dataModel}}</pre>
												</v-flex>
								</v-layout> -->
				</div>
</template>
<script>
import _ from "lodash";
import Vue from "vue";
import Expressions from "expression-eval";
import { mapFields } from "vuex-map-fields";
var hasBeenReset;

//////////////////////////////////////////////////

import FluroButton from 'src/components/ui/FluroButton.vue';
import FluroContentForm from 'src/components/form/FluroContentForm.vue';
import FluroContentFormField from 'src/components/form/FluroContentFormField.vue';
//////////////////////////////////////////////////

var injectedScripts = {};

function injectScript(scriptURL, callback) {
				if (injectedScripts[scriptURL]) {
								return callback();
				}

				//Keep note so we don't inject twice
				injectedScripts[scriptURL] = true;

				//////////////////////////////////////

				var script = document.createElement("script");
				script.type = "text/javascript";
				script.async = true;
				script.onload = callback;
				script.src = scriptURL;
				document.getElementsByTagName("head")[0].appendChild(script);

				////////////////////////////////////

				console.log("Appended script dependency", scriptURL);
}

//////////////////////////////////////////////////

export default {
				props: {
								contextField: {
												type: Object
								},
								title: {
												type: String
								},
								prefill: {
												type: Boolean,
												default () {
																return true;
												}
								},
								context: {
												type: String,
												default () {
																//By default
																return this.$fluro.global.defaultFormContext;
												}
								},
								definition: {
												type: Object,
												required: true
								},
								paymentIntegration: {
												type: Object
								},
								linkedProcess: {
												type: [Object, String]
								},
								linkedEvent: {
												type: [Object, String]
								},

								debugMode: {
												type: Boolean
								},
								submissionConfig: {
												type: Object,
												default () {
																return {};
												}
								},
								submitText: {
												type: String,
												default: 'Submit',
								},
								value: {
												type: Object,
												default () {
																return {
																				data: {}
																};
												}
								},
								defaultState: {
												type: String,
												default () {
																return "ready";
												}
								},
								options: {
												default: function() {
																var self = this;
																return {
																				validateSuccess: true,
																				backupUploadRealm: _.chain(self.definition)
																								.get("realms")
																								.first()
																								.value()
																};
												},
												type: Object
								}
				},
				data() {
								return {
												paymentReady: false,
												dataModel: JSON.parse(JSON.stringify(this.value)),
												// model: {
												//     data: {},
												// },
												serverErrors: "",
												errorMessages: [],
												result: null,
												state: this.defaultState
								};
				},
				// beforeCreate: function() {

				// 				var self = this;

				// 				Promise.all([
				// 												DynamicImportService.load('src/components/form/FluroContentForm.vue', function() {
				// 																return import('src/components/form/FluroContentForm.vue')
				// 												}),
				// 												DynamicImportService.load('src/components/form/FluroContentFormField.vue', function() {
				// 																return import('src/components/form/FluroContentFormField.vue')
				// 												}),
				// 								])
				// 								.then(function(results) {

				// 												// console.log('Set Components', results);
				// 												self.$options.components.FluroContentForm = results[0];
				// 												self.$options.components.FluroContentFormField = results[1];
				// 												self.ready = true;
				// 								})

				// },
				created() {

								// console.log('INTERACTION FORM VUE', Vue.$store._modulesNamespaceMap);

								this.reset();
				},
				mounted() {
								this.validate();
								this.initializePayment();
				},
				watch: {
								state(state) {
												this.$emit("state", state);
								},
								defaultState(state) {
												this.state = state;
								},
								paymentIntegration: "initializePayment"
				},
				computed: {
								webMode() {
												return this.$fluro.app;
								},
								renderable() {
												return this.definition; // && this.ready;
								},
								recursiveClick() {
												var self = this;
												if (!self.debugMode) {
																return;
												}

												//Create a callback
												return function(component) {
																// console.log('EMIT NOW!', component.field)
																self.$emit("debug", component.field);
												};
								},
								mobile() {
												return this.$vuetify.breakpoint.xsOnly;
								},
								receiptInput() {
												return {
																title: "Where should we send the receipt?",
																placeholder: "Eg. me@website.com",
																key: "receiptEmail",
																type: "email",
																minimum: 0,
																maximum: 1
												};
								},
								activeModifiers() {
												var self = this;

												//Store the calculatedAmount on the scope
												var calculatedTotal = self.baseAmount || 0;
												var date = Date.now();

												/////////////////////////////////////////////////////

												var modifications = [];

												/////////////////////////////////////////////////////

												var modifiers = self.paymentDetails.modifiers;
												if (!modifiers || !modifiers.length) {
																console.log("No modifiers");
																return modifications;
												}

												/////////////////////////////////////////////////////

												//Loop through each modifier
												var activeModifiers = _.chain(modifiers)
																.map(function(modifier) {
																				//Create a new context for this modifier
																				var context = {
																								date: date,
																								calculatedTotal,
																								model: self.dataModel,
																								data: self.dataModel,
																								matchInArray: self.$fluro.utils.matchInArray,
																								//Basic Bits
																								getAge: self.$fluro.utils.getAge,
																								Date: Date,
																								Math: Math,
																								String: String,
																								Date: Date,
																								parseInt: parseInt,
																								parseFloat: parseFloat,
																								Boolean: Boolean,
																								Number: Number
																				};

																				/////////////////////////////////////////////////////

																				var parsedValue = self.evaluate(
																								modifier.expression,
																								context
																				);
																				parsedValue = Number(parsedValue); //.toFixed(2);

																				/////////////////////////////////////////////////////

																				if (isNaN(parsedValue)) {
																								//We have an issue here

																								// self.debugLog('NOT A NUMBER', modifier.expression, context, parsedValue)
																								return;
																				}

																				/////////////////////////////////////////

																				//Check the condition
																				var parsedCondition = true;
																				if (
																								modifier.condition &&
																								String(modifier.condition).length
																				) {
																								parsedCondition = self.evaluate(
																												modifier.condition,
																												context
																								);
																				}

																				/////////////////////////////////////////

																				//If the condition returns false then just stop here and go to the next modifier
																				if (!parsedCondition) {
																								//Modifier is not active
																								// self.debugLog('CONDITION DOES NOT MATCH', parsedCondition)
																								return;
																				}

																				/////////////////////////////////////////

																				var operator = "";
																				var operatingValue = self.$fluro.utils.formatCurrency(
																								parsedValue,
																								self.currency
																				);

																				switch (modifier.operation) {
																								case "add":
																												operator = "+";
																												calculatedTotal = calculatedTotal + parsedValue;
																												break;
																								case "subtract":
																												operator = "-";
																												calculatedTotal = calculatedTotal - parsedValue;
																												break;
																								case "divide":
																												operator = "/";
																												operatingValue = parsedValue;
																												calculatedTotal = calculatedTotal / parsedValue;
																												break;
																								case "multiply":
																												operator = "x";
																												operatingValue = parsedValue;
																												calculatedTotal = calculatedTotal * parsedValue;
																												break;
																								case "set":
																												calculatedTotal = parsedValue;
																												break;
																				}

																				/////////////////////////////////////////

																				var readableOperator = `${operator} ${operatingValue}`;

																				if (!parsedValue) {
																								readableOperator = "";
																				}

																				var resultModified = {
																								title: modifier.title,
																								total: Number(parseFloat(calculatedTotal).toFixed(2)),
																								description: readableOperator,
																								operation: modifier.operation
																				};

																				return resultModified;
																})
																.compact()
																.value();

												if (!activeModifiers || !activeModifiers.length) {
																return [];
												}

												/////////////////////////////////////////////////////

												var lastSetIndex = _.findLastIndex(activeModifiers, function(mod) {
																return mod.operation == "set";
												});

												//////////////////////////////////////

												//A Set was used
												if (lastSetIndex && lastSetIndex != -1) {
																activeModifiers = _.slice(activeModifiers, lastSetIndex);
												}

												//////////////////////////////////////

												return activeModifiers;
								},
								currency() {
												return this.paymentDetails.currency || "";
								},
								symbol() {
												return this.$fluro.utils.currencySymbol(self.currency);
								},
								baseAmount() {
												return this.paymentDetails.amount;
								},
								formattedBaseAmount() {
												var self = this;
												return self.$fluro.utils.formatCurrency(
																self.baseAmount,
																self.currency
												);
								},
								total() {
												var self = this;
												var calculatedTotal = this.baseAmount;

												if (self.activeModifiers && self.activeModifiers.length) {
																calculatedTotal = _.last(self.activeModifiers).total;
												}

												//If the modifiers change the price below 0 then change the total back to 0
												if (
																!calculatedTotal ||
																isNaN(calculatedTotal) ||
																calculatedTotal < 0
												) {
																calculatedTotal = 0;
												}

												return calculatedTotal;
								},
								formattedTotal() {
												var self = this;
												return self.$fluro.utils.formatCurrency(self.total, self.currency);
								},
								paymentDetails() {
												return this.definition.paymentDetails || {};
								},
								showPaymentForm() {
												if (this.requirePayment || this.allowPayment) {
																return this.total && parseInt(this.total) > 0;
												}
								},
								requirePayment() {
												return this.paymentDetails.required;
								},
								allowPayment() {
												if (this.requirePayment) {
																return;
												}

												return this.paymentDetails.allow;
								},
								formErrors() {},
								hasErrors() {
												return this.errorMessages.length ? true : false;
								},
								formOptions() {
												return this.definition.data;
								},
								paymentFields() {
												var self = this;
												var fields = [];

												var defaultCardName;
												var defaultCardNumber;
												var defaultCardExpMonth;
												var defaultCardExpYear;
												var defaultCardCVC;
												if (self.debugMode) {
																defaultCardName = "John Appleseed";
																defaultCardNumber = "4242424242424242";
																defaultCardExpMonth = "09";
																defaultCardExpYear = "2025";
																defaultCardCVC = "123";
												}

												//////////////////////////////

												fields.push({
																title: "Name on Card",
																key: "cardName",
																type: "string",
																minimum: 1,
																maximum: 1,
																defaultValues: [defaultCardName]
												});

												fields.push({
																title: "Card Number",
																key: "cardNumber",
																type: "string",
																minimum: 1,
																maximum: 1,
																defaultValues: [defaultCardNumber],
																params: {
																				mask: "credit-card"
																}
												});

												var row = {
																type: "group",
																sameLine: true,
																fields: []
												};
												row.fields.push({
																title: "Expiry Month",
																key: "cardExpMonth",
																type: "string",
																placeholder: "MM",
																minimum: 1,
																maximum: 1,
																className: "xs4",
																defaultValues: [defaultCardExpMonth]
												});

												row.fields.push({
																title: "Expiry Year",
																key: "cardExpYear",
																type: "string",
																placeholder: "YYYY",
																minimum: 1,
																maximum: 1,
																className: "xs4",
																defaultValues: [defaultCardExpYear]
												});

												row.fields.push({
																title: "CVN",
																key: "cardCVC",
																type: "string",
																minimum: 1,
																maximum: 1,
																className: "xs4",
																defaultValues: [defaultCardCVC]
												});

												fields.push(row);

												return fields;
								},
								fields() {
												var self = this;

												var allFields = [];

												//////////////////////////////////////////

												var nameFields = {
																key: "_name",
																type: "group",
																fields: [],
																className: "layout row wrap"
												};

												//////////////////////////////////////////

												if (self.askFirstName) {
																nameFields.fields.push({
																				key: "_firstName",
																				minimum: self.requireFirstName ? 1 : 0,
																				maximum: 1,
																				title: "First Name",
																				directive: "input",
																				type: "string",
																				className: "xs12 sm6",
																				defaultValues: self.defaultUserValue("firstName")
																});
												}

												if (self.askLastName) {
																nameFields.fields.push({
																				key: "_lastName",
																				minimum: self.requireLastName ? 1 : 0,
																				maximum: 1,
																				title: "Last Name",
																				directive: "input",
																				type: "string",
																				className: "xs12 sm6",
																				defaultValues: self.defaultUserValue("lastName")
																});
												}

												//If there are actually name fields
												if (nameFields.fields && nameFields.fields.length) {
																//Insert the name row
																allFields.push(nameFields);
												}

												//////////////////////////////////////////

												if (self.askGender) {
																allFields.push({
																				key: "_gender",
																				minimum: this.requireGender ? 1 : 0,
																				maximum: 1,
																				title: "Gender",
																				directive: "select",
																				type: "string",
																				options: [{
																												name: "Male",
																												value: "male"
																								},
																								{
																												name: "Female",
																												value: "female"
																								}
																				]
																});
												}

												//////////////////////////////////////////

												if (self.askEmail) {
																allFields.push({
																				key: "_email",
																				minimum: self.requireEmail ? 1 : 0,
																				maximum: 1,
																				title: "Email Address",
																				directive: "input",
																				type: "email",
																				defaultValues: self.defaultUserValue("email")
																});
												}

												if (self.askPhone) {
																allFields.push({
																				key: "_phoneNumber",
																				minimum: self.requirePhone ? 1 : 0,
																				maximum: 1,
																				title: "Phone Number",
																				directive: "input",
																				type: "string",
																				defaultValues: self.defaultUserValue("phoneNumber")
																});
												}

												if (self.askDOB) {
																allFields.push({
																				key: "_dob",
																				minimum: self.requireDOB ? 1 : 0,
																				maximum: 1,
																				title: "Date of Birth",
																				directive: "dob-select",
																				type: "date"
																});
												}

												//Get the form fields
												var formFields = self.definition.fields;

												//Combine them together
												allFields = allFields.concat(formFields);
												// console.log('ALL FIELDS', allFields);

												return allFields;
								},

								// if (!interactionFormSettings.allowAnonymous && !interactionFormSettings.disableDefaultFields) {
								//     interactionFormSettings.requireFirstName = true;
								//     interactionFormSettings.requireLastName = true;
								//     interactionFormSettings.requireGender = true;
								//     interactionFormSettings.requireEmail = true;

								//     switch (interactionFormSettings.identifier) {
								//         case 'both':
								//             interactionFormSettings.requireEmail =
								//                 interactionFormSettings.requirePhone = true;
								//             break;
								//         case 'email':
								//             interactionFormSettings.requireEmail = true;
								//             break;
								//         case 'phone':
								//             interactionFormSettings.requirePhone = true;
								//             break;
								//         case 'either':
								//             interactionFormSettings.askPhone = true;
								//             interactionFormSettings.askEmail = true;
								//             break;
								//     }
								// }

								////////////////////////////////

								identifier() {
												return this.formOptions.identifier;
								},

								////////////////////////////////

								allowAnonymous() {
												// console.log('ONE > ANONYMOUS', this.formOptions)
												return this.formOptions.allowAnonymous || false;
								},

								disableDefaultFields() {
												// console.log('TWO > DISABLE FIELDS', this.formOptions)
												return this.formOptions.disableDefaultFields || false;
								},

								requireDefaultContactFields() {
												// console.log('THREE > CHECK DEFAULT CONTACT FIELDS', this.formOptions)
												return !this.allowAnonymous && !this.disableDefaultFields;
								},

								////////////////////////////////

								askFirstName() {
												return (
																this.requireDefaultContactFields ||
																this.formOptions.askFirstName ||
																this.formOptions.requireFirstName
												);
								},
								askLastName() {
												return (
																this.requireDefaultContactFields ||
																this.formOptions.askLastName ||
																this.formOptions.requireLastName
												);
								},
								askGender() {
												return (
																this.requireDefaultContactFields ||
																this.formOptions.askGender ||
																this.formOptions.requireGender
												);
								},
								askDOB() {
												return this.formOptions.askDOB || this.formOptions.requireDOB;
								},
								askEmail() {
												return (
																this.formOptions.askEmail ||
																this.requireEmail ||
																this.requireDefaultContactFields
												);
								},
								askPhone() {
												return (
																this.formOptions.askPhone ||
																this.requirePhone ||
																this.requireDefaultContactFields
												); // && this.identifier == 'either');
								},

								////////////////////////////////

								requireFirstName() {
												return (
																this.formOptions.requireFirstName ||
																this.requireDefaultContactFields
												);
								},
								requireLastName() {
												return (
																this.formOptions.requireLastName ||
																this.requireDefaultContactFields
												);
								},
								requireGender() {
												return (
																this.formOptions.requireGender ||
																this.requireDefaultContactFields
												);
								},
								requireDOB() {
												return this.formOptions.requireDOB;
								},
								requireEmail() {
												if (this.formOptions.requireEmail) {
																return true;
												}

												///////////////////////////////////
												//If we are anonymous and we haven't required the phone
												if (this.allowAnonymous) {
																//Return false
																return;
												}

												///////////////////////////////////

												switch (this.identifier) {
																case "both":
																				return true;
																				break;
																case "email":
																				return true;
																				break;
																case "either":
																default:
																				//Return if the contact details are required and we haven't already provided a phone number
																				return (
																								this.requireDefaultContactFields &&
																								!(this.dataModel._phone && this.dataModel._phone.length)
																				);
																				break;
												}
								},
								requirePhone() {
												if (this.formOptions.requirePhone) {
																return true;
												}

												///////////////////////////////////
												//If we are anonymous and we haven't required the phone
												if (this.allowAnonymous) {
																//Return false
																return;
												}

												///////////////////////////////////

												switch (this.identifier) {
																case "both":
																				return true;
																				break;
																case "phone":
																				return true;
																				break;

																case "either":
																default:
																				//Return if the contact details are required and we haven't already provided an email
																				return (
																								this.requireDefaultContactFields &&
																								!(this.dataModel._email && this.dataModel._email.length)
																				);
																				break;
												}
								},

								////////////////////////////////

								definedName() {
												return this.definition.definitionName;
								},
								displayTitle() {
												if (this.title) {
																return this.title;
												}
												return `${this.definition.title}`;
								},


								allowed() {
												// console.log('TESTING', this.definition)
												//If it's public
												if (this.definition.privacy == "public") {
																return true;
												}

												var canCreate = this.$fluro.access.can(
																"create",
																this.definedName,
																"interaction"
												);
												var canSubmit = this.$fluro.access.can(
																"submit",
																this.definedName,
																"interaction"
												);
												return canCreate || canSubmit;
								},
								user() {

												var storeObject = (Vue.$store || this.$store)
												return storeObject ? storeObject.state.fluro.user : null;
								},
								application() {
												var storeObject = (Vue.$store || this.$store)
												return storeObject ? storeObject.state.fluro.application : null;
								},

								//  ...mapFields('fluro', ['user', 'application']),
								// }


				},
				components: {
								FluroButton,
								FluroContentFormField,
								FluroContentForm
				},
				methods: {
								createEwayToken(done) {
												var self = this;
												//Get the Public Encryption Key
												var key = self.paymentIntegration.publicDetails.publicKey;

												/////////////////////////////////////////////

												//Get the card details from our form
												var cardDetails = {};
												cardDetails.name = self.dataModel.cardName;
												cardDetails.number = self.dataModel.cardNumber;
												cardDetails.cvc = self.dataModel.cardCVC;
												cardDetails.exp_month = String(self.dataModel.cardExpMonth);
												cardDetails.exp_year = String(self.dataModel.cardExpYear).slice(-2);

												if (cardDetails.exp_month.length < 1) {
																cardDetails.exp_month = "0" + cardDetails.exp_month;
												}

												///////////////////////

												if (self.debugMode) {
																return done({
																				message: `EWay can not be used with sandbox testing keys. Please add an additional testing integration.`
																});
												}

												return done(null, cardDetails);
								},
								createStripeToken(done) {
												//STRIPE v2 (DEPRECATED)
												var self = this;
												var liveKey = self.paymentIntegration.publicDetails.livePublicKey;
												var sandboxKey =
																self.paymentIntegration.publicDetails.testPublicKey;
												var stripeUseKey;

												///////////////////////

												if (self.debugMode) {
																stripeUseKey = sandboxKey;
												} else {
																stripeUseKey = liveKey;
												}

												if (!stripeUseKey) {
																return done(null, {
																				error: {
																								message: self.debugMode ?
																												`Integration Setup Error: No test keys found.` : `Integration Setup Error: No live keys found.`
																				}
																});
												}

												///////////////////////

												Stripe.setPublishableKey(stripeUseKey);

												///////////////////////

												//Get the card details from our form
												var stripeCardDetails = {};
												stripeCardDetails.name = self.dataModel.cardName;
												stripeCardDetails.number = self.dataModel.cardNumber;
												stripeCardDetails.cvc = self.dataModel.cardCVC;
												stripeCardDetails.exp_month = self.dataModel.cardExpMonth;
												stripeCardDetails.exp_year = self.dataModel.cardExpYear;

												///////////////////////

												return Stripe.card.createToken(stripeCardDetails, done);
								},
								debugLog() {
												// return;
												// if (this.debugMode) {
												console.log(
																_.map(arguments, function(v) {
																				return v;
																}).join(" ")
												);
												// }
								},
								evaluate(expression, context) {
												var self = this;
												var ast;
												var result;

												try {
																ast = Expressions.parse(expression);
																result = Expressions.eval(ast, context);
												} catch (err) {
																// self.debugLog('EXPRESSION', expression, err);
												} finally {
																// self.debugLog('EXPRESSION RESULT', result, ast, expression, context)
																return result;
												}
								},
								initializePayment() {
												var self = this;
												var integration = self.paymentIntegration;

												////////////////////////////////////

												self.paymentReady = false;

												////////////////////////////////////

												// console.log('INJECT INTEGRATION?', integration)
												if (!integration) {
																return;
												}

												////////////////////////////////////

												switch (integration.module) {
																case "stripe":
																				// injectScript('https://js.stripe.com/v3/', function() {
																				//     console.log('Stripe has been included on page')
																				//     self.paymentReady = true;
																				// });
																				injectScript("https://js.stripe.com/v2/", function() {
																								console.log("Stripe has been included on page");
																								self.paymentReady = true;
																				});
																				break;
																case "eway":
																				injectScript(
																								"https://secure.ewaypayments.com/scripts/eCrypt.js",
																								function() {
																												console.log("Eway has been included on page");
																												self.paymentReady = true;
																								}
																				);
																				break;
												}
								},
								modelChanged() {
												this.$emit("input", this.dataModel);
								},
								validate() {
												var form = this.$refs.form;
												if (!form) {
																return [];
												}

												var errors = [];
												errors = errors.concat(form.errorMessages);

												if (this.showPaymentForm) {
																var payment = this.$refs.payment;
																if (payment && payment.errorMessages) {
																				errors = errors.concat(payment.errorMessages);
																}
												}

												this.errorMessages = errors;
								},
								validateAllFields() {
												var form = this.$refs.form;
												form.touch();

												var payment = this.$refs.payment;
												if (payment) {
																payment.touch();
												}

												this.validate();
								},
								defaultUserValue(key) {
												if (!this.prefill) {
																return;
												}

												if (!this.user) {
																return null;
												}

												return _.compact([_.get(this.user, key)]);
								},
								reset() {
												var self = this;
												//Reset the model
												// Vue.set(self.model, 'data', {});

												if (!hasBeenReset) {
																hasBeenReset = true;
																//Use the value that was input originally
																self.dataModel = JSON.parse(JSON.stringify(this.value));
												} else {
																self.dataModel = {};
												}

												self.result = null;

												self.state = "ready";
												self.modelChanged();
												self.$emit("reset");
								},
								submit() {

												console.log('Submit!!!!')
												var self = this;
												self.validateAllFields();

												if (self.hasErrors) {
																//Gotta finish the stuff first!
																return;
												}

												self.state = "processing";

												/////////////////////////////////

												var dataModel = JSON.parse(JSON.stringify(self.dataModel));

												//Remove data we don't want to send to the server
												delete dataModel.cardName;
												delete dataModel.cardNumber;
												delete dataModel.cardExpYear;
												delete dataModel.cardExpMonth;
												delete dataModel.cardCVC;

												/////////////////////////////////



												// From https://stackoverflow.com/questions/18515254/recursively-remove-null-values-from-javascript-object

												function pruneEmpty(obj) {
																return (function prune(current) {
																				_.forOwn(current, function(value, key) {
																								if (
																												_.isUndefined(value) ||
																												_.isNull(value) ||
																												_.isNaN(value) ||
																												(_.isString(value) && _.isEmpty(value)) ||
																												(_.isObject(value) && _.isEmpty(prune(value)))
																								) {
																												delete current[key];
																								}
																				});
																				// remove any leftover undefined values from the delete
																				// operation on an array
																				if (_.isArray(current)) _.pull(current, undefined);

																				return current;
																})(_.cloneDeep(obj)); // Do not modify the original object, create a clone instead
												}

												/////////////////////////////////

												dataModel = pruneEmpty(dataModel);

												/////////////////////////////////

												var interactionData = {
																interaction: dataModel,
																event: self.$fluro.utils.getStringID(self.linkedEvent),
																process: self.$fluro.utils.getStringID(self.linkedProcess)
																// transaction:self.$fluro.utils.getStringID(self.linkedProcess),
												};

												/////////////////////////////////

												//Get the _ prepended values
												setDefaultContactField("firstName");
												setDefaultContactField("lastName");
												setDefaultContactField("email");
												setDefaultContactField("phoneNumber");
												setDefaultContactField("dob");
												setDefaultContactField("gender");

												//Set the default contact fields
												function setDefaultContactField(key) {
																var value = _.get(self.dataModel, `_${key}`);
																if (value) {
																				_.set(interactionData, `contact.${key}`, value);
																}
												}

												/////////////////////////////////

												//Set a default title
												if (!interactionData.title) {
																interactionData.title = this.definition.title;
												}

												/////////////////////////////////

												//If we need to have a payment
												if (self.showPaymentForm) {
																var paymentDetails = {
																				amount: self.total,
																				email: dataModel.receiptEmail,
																				integration: self.$fluro.utils.getStringID(
																								self.paymentIntegration
																				)
																};

																/////////////////////////////////
																/////////////////////////////////
																/////////////////////////////////

																//Here we generate our client side tokens
																switch (self.paymentIntegration.module) {
																				case "eway":

																								if (process.browser && !window.eCrypt) {
																												self.serverErrors = `ERROR: Eway is selected for payment but the eCrypt script has not been included in this application visit https://eway.io/api-v3/#encrypt-function for more information`;
																												self.$fluro.error(self.serverErrors);
																												self.state = "error";
																												self.$emit("error", err);
																												return;
																								}

																								/////////////////////////////////////////////

																								return self.createEwayToken(function(err, token) {
																												if (err) {
																																self.serverErrors = self.$fluro.utils.errorMessage(
																																				err
																																);
																																self.$fluro.error(self.serverErrors);
																																self.state = "error";
																																self.$emit("error", err);
																																return;
																												}

																												//Include the payment details
																												paymentDetails.details = token;
																												return submitRequest(paymentDetails);
																								});

																								break;
																				case "stripe":
																								//Generate the Stripe Token
																								return self.createStripeToken(function(
																												status,
																												response
																								) {
																												var error = status.error || response.error;

																												if (error) {
																																console.log(
																																				"FORM -> Stripe token error",
																																				status,
																																				response
																																);
																																self.serverErrors = error.message;
																																self.$fluro.error(self.serverErrors);
																																self.state = "error";
																																self.$emit("error", error);
																												} else {
																																//Include the payment details
																																console.log(
																																				"FORM -> Stripe tokenized",
																																				status,
																																				response
																																);
																																paymentDetails.details = response;
																																return submitRequest(paymentDetails);
																												}
																								});
																								break;
																}
												} else {
																return submitRequest();
												}

												/////////////////////////////////
												/////////////////////////////////
												/////////////////////////////////
												/////////////////////////////////

												function submitRequest(paymentDetails) {
																if (paymentDetails) {
																				interactionData.payment = paymentDetails;
																				console.log("SUBMIT REQUEST", interactionData);
																}

																/////////////////////////////////

																var submissionConfig = self.submissionConfig;
																submissionConfig.params = {
																				definition: self.$fluro.utils.getStringID(self.definition),
																				process: self.$fluro.utils.getStringID(self.linkedProcess)
																};

																/////////////////////////////////

																var request = self.$fluro.content.submitInteraction(
																				self.definedName,
																				interactionData,
																				submissionConfig
																);

																request.then(
																				function(interaction) {
																								self.state = "success";
																								self.dataModel = {
																												data: {}
																								};

																								self.result = interaction;
																								self.$emit("success", interaction);
																				},
																				function(err) {
																								//Dispatch an error
																								var humanMessage = self.$fluro.utils.errorMessage(err);
																								self.$fluro.error(err);
																								self.serverErrors = humanMessage;
																								self.state = "error";
																								self.$emit("error", err);

																								console.log("SWITCH STATE TO", err, self);
																				}
																);
												}
								}
				}
};

</script>
<style scoped lang="scss">
.fluro-interaction-form {
				.payment {
								margin: 15px 0;
								background: #fff;
								border-radius: 3px;
								border: 1px solid #ddd;
								box-shadow: 0 1px 2px rgba(#000, 0.1);
				}

				dt,
				label {
								font-weight: 600;
				}

				.modifier {
								opacity: 0.5;

								.modifier-title {
												font-style: italic;
								}
				}

				.v-btn {
								.v-progress-circular {
												width: 15px !important;
												height: 15px !important;
												margin-left: 15px;
								}
				}
}

</style>
