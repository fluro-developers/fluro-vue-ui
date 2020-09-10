<template>
				<div>
								<fluro-panel>
												<fluro-panel-title>
																<fluro-icon icon="youtube" library="fab" left /> Youtube API Details
												</fluro-panel-title>
												<fluro-panel-body class="text-xs-center" v-if="connected">
																<h1 class="brand-success">
																				<fluro-icon icon="check" />
																</h1>
																<!-- <i class="far fa-check brand-success fa-3x"></i> -->
																<h4>YouTube has been successfully authorized</h4>
												</fluro-panel-body>
												<fluro-panel-body>
																<v-btn :color="connected ? '' : 'primary'" block large :loading="processing" @click="authorize()">
																				{{connected ? 'Re-' : ''}}Authorize
																				<fluro-icon icon="key" right />
																</v-btn>
																<!-- <v-container pa-0 grid-list-xl>
																				<v-layout>
																								<v-flex xs12 sm6>
																												<fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.clientID" v-model="model.publicDetails" />
																								</v-flex>
																								<v-flex xs12 sm6>
																												<fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.clientSecret" v-model="model.privateDetails" />
																								</v-flex>
																				</v-layout>
																</v-container>
																<fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.redirectURI" v-model="model.publicDetails" />
																<v-input class="no-flex">
																				<div v-tippy content="Click to copy to clipboard" @click.stop.prevent="$fluro.global.copyToClipBoard(callbackCodeURL)">
																								<v-layout align-center>
																												<v-flex class="copystring">{{callbackCodeURL}}</v-flex>
																								</v-layout>
																				</div>
																</v-input> -->
																<!-- <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.asApplication" v-model="model.publicDetails" /> -->
																<!-- <div class="form-group">
																				<label>Client ID</label>
																				<input class="form-control" ng-model="item.publicDetails.clientID" placeholder="Client ID">
																</div>
																<div class="form-group">
																				<label>Client Secret</label>
																				<input class="form-control" ng-model="item.privateDetails.clientSecret" placeholder="Client Secret">
																</div> -->
																<!-- <div class="form-group">
																				<label>Redirect URI</label>
																				<p class="help-block">Add the callback URL to redirect the user once authenticated.</p>
																				<input class="form-control" ng-model="item.publicDetails.redirectURI" placeholder="{{$root.apiURL}}/integrate/oauth/{{item._id ? item._id : 'INTEGRATION_ID'}}/callback">
																				<p class="help-block">?code=YOUR_CODE will be appended to the query string and can then be requested via the API address below to authenticate the user.
																								<br />
																								<strong>{{$root.apiURL}}/integrate/oauth/{{item._id ? item._id : "INTEGRATION_ID"}}/callback?code=YOUR_CODE</strong>
																				</p>
																</div> -->
																<!-- <div class="form-group">
																				<label>Authenticate as Application</label>
																				<p class="help-block">Add the application ID that you want to authenticate the user as</p>
																				<input class="form-control" ng-model="item.publicDetails.asApplication" placeholder="Application ID">
																</div> -->
												</fluro-panel-body>
												<fluro-panel-body v-if="!model._id">
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
								saveCallback: {
												type: Function,
								},
				},
				data() {
								return {
												processing: false,
												model: this.value,
								}
				},
				created() {
								var self = this;

								// if (!self.model.privateDetails.credentials) {
								// 				self.$set(self.model.privateDetails, 'credentials', {});
								// }


								// if (!self.model.privateDetails.params) {
								// 				self.$set(self.model.privateDetails, 'params', {});
								// }




								// if (!self.model.publicDetails.credentials) {
								// 				self.$set(self.model, 'publicDetails', {});
								// }


				},
				methods: {
								authorize(url) {

												var self = this;

												self.processing = true

												/////////////////////////////////

												if (self.saveCallback) {
																return self.saveCallback(true)
																				.then(function(res) {
																								return redirectToURL(res);
																				}, function(err) {
																								self.processing = false;
																								return;
																				})
												} else {
																if (self.model._id) {
																				return redirectToURL();
																}
												}

												/////////////////////////////////

												function redirectToURL(result) {

																var url = self.$fluro.api.generateEndpointURL(`/integrate/youtube/${self.model._id}/oauth`);
																console.log('Authorize now generated', url);
																if (process.browser) {
																				window.location.href = url;
																}

												}
								}
				},
				computed: {
								connected() {
												return this.model.privateDetails && this.model.privateDetails.access_token
								},
								fieldsOutput() {

												var self = this;
												var array = [];


												/**
																								array.push({
																												key: 'clientID',
																												title: "Client ID",
																												minimum: 0,
																												maximum: 1,
																												type: "string",
																												placeholder: ``,
																												description: ``,
																												params: {
																																persistentDescription: true,
																												},
																								});

																								array.push({
																												key: 'clientSecret',
																												title: "Client Secret",
																												minimum: 0,
																												maximum: 1,
																												type: "string",
																												placeholder: ``,
																												description: ``,
																												params: {
																																persistentDescription: true,
																												},
																								});

																								array.push({
																												key: 'redirectURI',
																												title: "Redirect URI",
																												minimum: 0,
																												maximum: 1,
																												type: "string",
																												// placeholder: `${this.$fluro.apiURL}/integrate/oauth/${this.model._id ? this.model._id : 'INTEGRATION_ID'}/callback`,
																												placeholder: `https://yourwebsiteorapp.com/oauth_callback`,
																												description: `?code=YOUR_CODE will be appended to the query string and can then be requested via the API address below to authenticate the user.`,
																												params: {
																																persistentDescription: true,
																												},
																								});


																								array.push({
																												key: 'asApplication',
																												title: "Authenticate as Application",
																												minimum: 0,
																												maximum: 1,
																												type: "string",
																												placeholder: `(Fluro Application ID)`,
																												description: `Add the application ID that you want to authenticate the user as`,
																												params: {
																																persistentDescription: true,
																												},
																								});


												/**/





												return array;

								}
				},
}

</script>
<style lang="scss" scoped>

.brand-success {
	color: $success;
}
</style>
