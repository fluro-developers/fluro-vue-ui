<template>
				<div>
								<fluro-panel>
												<fluro-panel-title>
																<strong>Stripe Connect Details</strong>
												</fluro-panel-title>
												<fluro-panel-body>
																<v-container pa-0 grid-list-xl>
																				<v-layout>
																								<v-flex xs12 sm6>
																												<fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.testClientID" v-model="model.privateDetails" />
																								</v-flex>
																								<v-flex xs12 sm6>
																												<fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.liveClientID" v-model="model.privateDetails" />
																								</v-flex>
																				</v-layout>
																</v-container>
												</fluro-panel-body>
												<fluro-panel-body class="border-top">
																<v-container pa-0 grid-list-xl>
																				<v-layout>
																								<v-flex xs12 sm6>
																												<fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.testSecretKey" v-model="model.privateDetails" />
																								</v-flex>
																								<v-flex xs12 sm6>
																												<fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.testPublicKey" v-model="model.publicDetails" />
																								</v-flex>
																				</v-layout>
																</v-container>
												</fluro-panel-body>
												<fluro-panel-body class="border-top">
																<v-container pa-0 grid-list-xl>
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
								<fluro-panel v-if="model._id">
												<fluro-panel-title>
																<strong>Advanced</strong>
												</fluro-panel-title>
												<tabset>
																<tab heading="OAuth">
																				<fluro-panel-body>
																								<v-input class="no-flex" hint="Add this url as your Redirect URI in your Stripe Dashboard" label="OAuth Redirect URI">
																												<div v-tippy content="Click to copy to clipboard" @click.stop.prevent="$fluro.global.copyToClipBoard(redirectURI)">
																																<v-layout align-center>
																																				<v-flex class="copystring">{{redirectURI}}</v-flex>
																																</v-layout>
																												</div>
																								</v-input>
																								<v-input class="no-flex" hint="Direct users to this endpoint to authenticate their stripe accounts with this integration" label="OAuth Authentication">
																												<div v-tippy content="Click to copy to clipboard" @click.stop.prevent="$fluro.global.copyToClipBoard(authURL)">
																																<v-layout align-center>
																																				<v-flex class="copystring">{{authURL}}</v-flex>
																																</v-layout>
																												</div>
																								</v-input>
																				</fluro-panel-body>
																</tab>
																<tab heading="Endpoints">
																				<fluro-panel-body>
																				</fluro-panel-body>
																</tab>
												</tabset>
								</fluro-panel>
								<fluro-panel v-else>
												<fluro-panel-body>
																Please save this integration to continue
												</fluro-panel-body>
								</fluro-panel>
				</div>
</template>
<script>
import FluroContentForm from '../../../../form/FluroContentForm.vue';

import FluroContentFormField from "../../../../form/FluroContentFormField.vue";



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
								redirectURI() {
										return `${this.$fluro.apiURL}/integrate/stripeconnect/${this.model._id}/oauth/callback`;
								},

								authURL() {
										return `${this.$fluro.apiURL}/integrate/stripeconnect/${this.model._id}/oauth`;
								},

								fieldsOutput() {

												var self = this;
												var array = [];


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
																key: 'testClientID',
																title: "Test Client ID",
																minimum: 0,
																maximum: 1,
																type: "string",
												});

												array.push({
																key: 'liveClientID',
																title: "Live Client ID",
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
