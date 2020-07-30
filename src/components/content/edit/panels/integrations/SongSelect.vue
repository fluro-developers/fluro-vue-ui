<template>
				<div>
								<fluro-panel>
												<!-- <fluro-panel-title> -->
												<!-- <strong>SongSelect Details</strong> -->
												<!-- </fluro-panel-title> -->
												<fluro-panel-body>
																<div class="integration-logo">
																				<constrain xs>
																								<img src="https://songselect.ccli.com/Content/img/SS-logo.svg" />
																				</constrain>
																				<div class="font-sm muted text-xs-center">
																								By using the CCLI Song Select Service you agree to the <br /><a href="https://au.ccli.com/licence-terms/" target="_blank">Terms and Conditions</a>
																				</div>
																</div>
												</fluro-panel-body>
												<fluro-panel-body class="border-top">
																<h5>End User License Agreement</h5>
																<p><strong>By creating this integration you agree to the CCLI EULA Including all points below:</strong></p>
																<ul>
																				<li>All Content and the SongSelect Application are provided solely and exclusively for End Users who are active subscribers to SongSelect.</li>
																				<li>All Content is the intellectual property of a third party, is protected by law, and no ownership or proprietary rights in the same are being transferred to Fluro and/or any End User</li>
																				<li>CCL and/or Content Owners may remove content from the API from time-to-time without notice.</li>
																				<li>The End User agrees to comply with all applicable laws, including copyright law in their use of the Content and shall protect the Content Owner's rights.</li>
																				<li>The usage rights granted are nonexclusive, are subject to revocation or termination at any time, and may not be transferred, assigned, sublicensed, distributed or conveyed in any manner whatsoever.</li>
																				<li>Neither CCLI not Content Owners will be liable for any indirect, punitive, incidental,
																								consequential or special damages of any kind resulting from the use of the SongSelect API
																								or from Content made available to Fluro through the SongSelect API,
																								or for any damages or for any other damages of any type,
																								nature or description arising out of any legal theory.
																								This damage limitation shall be set forth in the EULA in conspicuous, bold, capitalized letters in
																								compliance with all legal requirements that such limitations be conspicuous.
																				</li>
																</ul>
												</fluro-panel-body>
								</fluro-panel>
								<fluro-panel v-if="!model._id">
												<fluro-panel-body class="border-top">
																Please save this integration to continue
												</fluro-panel-body>
								</fluro-panel>
								<template v-else>
												<template v-if="model.publicDetails.organization">
																<v-layout>
																				<v-flex xs12 sm6>
																								<v-btn style="border:1px solid #ddd" block large :to="{name:'songselect', params:{integration:model._id}}">
																												Browse Song Library
																												<fluro-icon icon="music" right />
																								</v-btn>
																				</v-flex>
																				<v-flex style="width:50px; flex:none;" />
																				<v-flex xs12 sm6 v-if="model.publicDetails.organization">
																								<v-btn style="border:1px solid #ddd" block large :loading="processing" @click="authorize()">
																												Reauthorize
																												<fluro-icon icon="key" right />
																								</v-btn>
																				</v-flex>
																</v-layout>
																<fluro-panel>
																				<fluro-panel-body class="text-xs-center">
																								<h1 class="brand-success">
																												<fluro-icon icon="check" />
																								</h1>
																								<!-- <i class="far fa-check brand-success fa-3x"></i> -->
																								<h4>SongSelect has been authorised to</h4>
																								<div class="form-group">
																												<strong>{{model.publicDetails.organization}}</strong>
																								</div>
																								<v-btn small @click="$fluro.global.delete([model])" v-if="$fluro.access.canDeleteItem(model)">
																												<span>Delete this integration</span>
																												<fluro-icon icon="trash-alt" />
																								</v-btn>
																				</fluro-panel-body>
																</fluro-panel>
												</template>
												<template v-else>
																<v-btn style="border:1px solid #ddd" block large :loading="processing" @click="authorize()">
																				Authorize
																				<fluro-icon icon="key" right />
																</v-btn>
												</template>
												<!-- <div class="form-group" ng-hide="!item.publicDetails.organization || item.authorise">
																<div class="row no-gutters">
																				<div class="col-xs-6" style="padding-right:5px;">
																								<a class="btn-lg btn btn-default btn-block" ui-sref="songselect">
																												<span>Browse Song Library</span>
																												<i class="far fa-music"></i>
																								</a>
																				</div>
																				<div class="col-xs-6" style="padding-left:5px;">
																								<a class="btn-lg btn btn-default btn-block" ng-click="item.authorise = true;">
																												<span>{{item.publicDetails.organization.length ? 'Re-' : ''}}Authorise</span>
																												<i class="far fa-key"></i>
																								</a>
																				</div>
																</div>
												</div>
												<div class="panel panel-default" ng-show="!item.publicDetails.organization || item.authorise">
																<div class="panel-body">
																				<div ng-class="row">
																								<div class="form-group col-xs-6">
																												<label>SongSelect Server</label>
																												<select class="form-control" ng-model="item.publicDetails.mode">
																																<option value="prod">Production</option>
																																<option value="dev">Development Server</option>
																												</select>
																								</div>
																								<div class="form-group col-xs-6">
																												<label>&nbsp;</label>
																												<div ng-if="!item.processing">
																																<a class="btn btn-primary btn-block" ng-click="authorize()">
																																				Click here to {{item.publicDetails.organization.length ? 'Reauthorise' : 'Connect to'}} SongSelect
																																</a>
																												</div>
																												<div ng-if="item.processing">
																																<a class="btn btn-default btn-block">
																																				<span>Connecting</span>
																																				<i class="far fa-spin fa-spinner-third"></i>
																																</a>
																												</div>
																								</div>
																				</div>
																</div>
												</div> -->
								</template>
								<!-- 	<fluro-panel-body class="border-top">
												<v-container pa-0 grid-list-xl>
																<fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.apiKey" v-model="model.privateDetails" />
																<fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.apiPassword" v-model="model.privateDetails" />
																<fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.publicKey" v-model="model.publicDetails" />
												</v-container>
								</fluro-panel-body>
								 -->
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
				methods: {
								authorize(url) {

												var self = this;

												console.log('Authorize!');

												if (self.saveCallback) {

																console.log('SAve first')
																self.saveCallback().then(function(res) {

																				console.log('Saved!', res);
																				authorize(res);
																})
												} else {
																authorize();
												}


												function authorize(result) {


																console.log('Authorize now');

																//The url we want to redirect the user to
																var url;


																var modelID = self.model._id || result.data._id;

																//Check the module of the integration
																// switch (self.model.module) {
																// case 'songselect':
																url = `${self.$fluro.apiURL}/integrate/songselect/${modelID}/oauth?mode=${self.model.publicDetails.mode || 'prod'}`;
																// break;
																// case 'pushpay':
																// url = `${self.$fluro.apiURL}/integrate/pushpay/${modelID}/oauth?mode=${self.model.publicDetails.mode}`;
																// break;
																// default:
																// break;
																// }
																//////////////////////////////////

																//Tell the front end we are trying to load their
																//url
																self.processing = true

																//Visit the url
																window.location.href = url;

												}
								}
				},
				computed: {
								fieldsOutput() {

												var self = this;
												var array = [];


												array.push({
																key: 'apiKey',
																title: "Rapid API Key",
																minimum: 1,
																maximum: 1,
																type: "string",
																params: {
																				persistentDescription: true,
																},
												});

												array.push({
																key: 'publicKey',
																title: "Client Side Encryption Key",
																minimum: 1,
																maximum: 1,
																type: "string",
																description: 'To implement client side encryption (https://eway.io/api-v3/#implementation)',
																params: {
																				persistentDescription: true,
																},
												});



												array.push({
																key: 'apiPassword',
																title: "Rapid API Password",
																minimum: 1,
																maximum: 1,
																type: "string",
																params: {
																				persistentDescription: true,
																},
												});


												array.push({
																key: 'mode',
																title: "Mode",
																minimum: 1,
																maximum: 1,
																directive:'select',
																type: "string",
																options:[
																{
																	title:'Live / Production',
																	value:'prod',
																},
																{
																	title:'Development / Staging',
																	value:'dev',
																},

																]
												});




												return array;

								}
				},
}

</script>
<style lang="scss">
</style>
