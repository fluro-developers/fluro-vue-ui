<template>
				<div>
								<fluro-panel>
												<fluro-panel-title>
																<strong>Stripe Integration Details</strong>
												</fluro-panel-title>
												<fluro-panel-body>
																<v-container pa-0 grid-list-xl>
																				<v-layout>
																								<v-flex xs12 sm6>
																												<fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.testSecretKey" v-model="model.privateDetails" />
																								</v-flex>
																								<v-flex xs12 sm6>
																												<fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.testPublicKey" v-model="model.publicDetails" />
																								</v-flex>
																				</v-layout>
																				<v-layout>
																								<v-flex xs12 sm6>
																												<fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.liveSecretKey" v-model="model.privateDetails" />
																								</v-flex>
																								<v-flex xs12 sm6>
																												<fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.livePublicKey" v-model="model.publicDetails" />
																								</v-flex>
																				</v-layout>
																</v-container>
												</fluro-panel-body>
												<fluro-panel-body class="border-top">
																<fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.sandbox" v-model="model.publicDetails" />
												</fluro-panel-body>
								</fluro-panel>
								<fluro-panel>
												<fluro-panel-title>
																<strong>Advanced</strong>
												</fluro-panel-title>
												<fluro-panel-body>
																<v-container pa-0 grid-list-xl>
																				<v-layout>
																								<v-flex xs12 sm6>
																												<fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.paymentPrefix" v-model="model.privateDetails" />
																								</v-flex>
																								<v-flex xs12 sm6>
																												<fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.paymentSuffix" v-model="model.privateDetails" />
																								</v-flex>
																				</v-layout>
																</v-container>
												</fluro-panel-body>
								</fluro-panel>
				</div>
</template>
<script>
import FluroContentForm from 'src/components/form/FluroContentForm.vue';

import FluroContentFormField from "src/components/form/FluroContentFormField.vue";



export default {
				components: {
								FluroContentForm,
								FluroContentFormField,
				},
				extends: FluroContentForm,
				props: {
								value: {
												type: Object,
								},
				},
				data() {
								return {
												model: this.value,
								}
				},
				methods: {

				},
				computed: {
								fieldsOutput() {

												var self = this;
												var array = [];


												array.push({
																key: 'paymentSuffix',
																title: "Payment Title Suffix",
																description: `Append a prefix to the title of all transactions made through this payment gateway.`,
																placeholder: `eg. ${self.model.title}`,
																minimum: 0,
																maximum: 1,
																type: "string",
																params:{
																	persistentDescription:true,
																},
												});

												array.push({
																key: 'paymentPrefix',
																title: "Payment Title Prefix",
																description: `Append a suffix to the title of all transactions made through this payment gateway.`,
																placeholder: `eg. ${self.model.title}`,
																minimum: 0,
																maximum: 1,
																type: "string",
																params:{
																	persistentDescription:true,
																},
												});


												array.push({
																key: 'testPublicKey',
																title: "Test Publishable Key",
																minimum: 0,
																maximum: 1,
																type: "string",
												});

												array.push({
																key: 'testSecretKey',
																title: "Test Secret Key",
																minimum: 0,
																maximum: 1,
																type: "string",
												});


												array.push({
																key: 'livePublicKey',
																title: "Live Publishable Key",
																minimum: 1,
																maximum: 1,
																type: "string",
												});

												array.push({
																key: 'liveSecretKey',
																title: "Live Secret Key",
																minimum: 1,
																maximum: 1,
																type: "string",
												});


												array.push({
																key: 'sandbox',
																title: "Test / Sandbox Mode",
																minimum: 0,
																maximum: 1,
																type: "boolean",
																description: `Force all payments made through this gateway to be processed in Test/Sandbox Mode. Don't forget to uncheck this before using this gateway in production!.`
												});




												return array;

								}
				},
}

</script>
<style lang="scss">
</style>
