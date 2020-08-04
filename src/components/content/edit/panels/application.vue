<template>
				<flex-column>
								<template v-if="loading">
												<fluro-page-preloader contain />
								</template>
								<tabset v-else :justified="true" :vertical="true">
												<tab heading="Basic Info">
																<flex-column-body style="background: #fafafa;">
																				<v-container>
																								<!-- <pre>{{definition}}</pre> -->
																								<constrain sm>
																												<div class="grid-list-xl">
																																<fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.title" v-model="model" />
																																<fluro-panel>
																																				<fluro-panel-title>
																																								<strong>Website Configuration</strong>
																																								<div class="font-sm">Information for accessing this application in your browser</div>
																																				</fluro-panel-title>
																																				<fluro-panel-body>
																																								<fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.domain" v-model="model" />
																																								<fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.forwards" v-model="model" />
																																				</fluro-panel-body>
																																</fluro-panel>
																																<fluro-panel>
																																				<fluro-panel-title>
																																								<strong>Native Application</strong>
																																								<div class="font-sm">Information for this application if published as a native iOS / Android Application</div>
																																				</fluro-panel-title>
																																				<fluro-panel-body>
																																								<fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.bundleIDs" v-model="model" />
																																								<fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.nativeEngine" v-model="model" />
																																								<!-- <pre>{{model.nativeEngine}}</pre> -->
																																				</fluro-panel-body>
																																</fluro-panel>
																																<!--  <div v-if="definition && definition.fields && definition.fields.length">
                                    <fluro-content-form :options="options" v-model="model.data" :fields="definition.fields">
                                    </fluro-content-form>
                </div>-->
																												</div>
																								</constrain>
																				</v-container>
																</flex-column-body>
												</tab>
												<tab :heading="`${devices ? devices.length : 0} Devices`" :enabled="!!devicesEnabled">
																<flex-column-body style="background: #fafafa;">
																				<v-container fluid>
																								<constrain sm>
																												<v-layout align-center margin>
																																<v-flex>
																																				<h5>{{devices.length}} Devices</h5>
																																</v-flex>
																																<v-flex shrink>
																																				<v-btn color="primary" :loading="sending" @click="sendPush()">
																																								Send Push to {{pushDevices.length}}
																																								<fluro-icon icon="paper-plane" right />
																																				</v-btn>
																																</v-flex>
																												</v-layout>
																												<fluro-panel>
																																<fluro-table trackingKey="_id" :selection="deviceSelection" :actionsEnabled="false" defaultSort="updated" defaultSortType="date" defaultSortDirection="desc" :pageSize="25" style="max-height:70vh;" :items="devices" :columns="deviceColumns" />
																												</fluro-panel>
																								</constrain>
																				</v-container>
																</flex-column-body>
												</tab>
												<tab heading="Authentication">
																<flex-column-body style="background: #fafafa;">
																				<v-container>
																								<constrain sm>
																												<div class="grid-list-xl">
																																<fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.forceSSL" v-model="model" />
																																<fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.authenticationStyle" v-model="model" />
																																<!--  <div v-if="definition && definition.fields && definition.fields.length">
                                    <fluro-content-form :options="options" v-model="model.data" :fields="definition.fields">
                                    </fluro-content-form>
                </div>-->
																												</div>
																								</constrain>
																				</v-container>
																</flex-column-body>
												</tab>
												<tab heading="Application Permissions" :enabled="model.authenticationStyle == 'application'">
																<flex-column-body style="background: #fafafa;">
																				<v-container>
																								<constrain sm>
																												<h5 margin>Application Permissions</h5>
																												<p>Add permissions here that will be attributed to this application's API Key whether a user is signed in or not.</p>
																												<fluro-permission-select @input="modelUpdated" v-model="model.permissionSets" />
																								</constrain>
																				</v-container>
																</flex-column-body>
												</tab>
												<tab heading="User Permissions" :enabled="model.authenticationStyle == 'application'">
																<flex-column-body style="background: #fafafa;">
																				<v-container>
																								<constrain sm>
																												<h5 margin>User Permissions</h5>
																												<p>Add permissions here that will be attributed to a logged in user when signed in to this application. These will be merged with any existing permissions retrieved from a user's managed persona in the '{{model.title}}' account</p>
																												<fluro-permission-select @input="modelUpdated" v-model="model.userPermissionSets" />
																								</constrain>
																				</v-container>
																</flex-column-body>
												</tab>
												<tab :heading="`${readableContentType} Details`" :enabled="definition">
																<flex-column-body style="background: #fafafa;" v-if="definition">
																				<v-container fluid>
																								<constrain sm>
																												<fluro-content-form :options="options" v-model="model.data" :fields="definition.fields" />
																								</constrain>
																				</v-container>
																</flex-column-body>
												</tab>
												<tab heading="Advanced">
																<flex-column-body style="background: #fafafa;">
																				<v-container>
																								<constrain sm>
																												<h5 margin>Advanced</h5>
																												<fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.apipath" v-model="model" />
																												<fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.timezone" v-model="model" />
																												<fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.gaTrackingCode" v-model="model" />
																												<fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.supportEmail" v-model="model" />
																												<fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.favicon" v-model="model" />
																												<fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.headerInject" v-model="model" />
																												<fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.footerInject" v-model="model" />
																								</constrain>
																				</v-container>
																</flex-column-body>
												</tab>
												<tab heading="Redirects">
																<flex-column-body style="background: #fafafa;">
																				<v-container>
																								<constrain sm>
																												<h5 margin>Redirects</h5>
																												<redirect-manager v-model="model.pathForwards" />
																								</constrain>
																				</v-container>
																</flex-column-body>
												</tab>
								</tabset>
				</flex-column>
</template>
<script>
/////////////////////////////////

import FluroContentEditMixin from "../FluroContentEditMixin.js";
import FluroPermissionSelect from "../../../form/FluroPermissionSelect.vue";
import RedirectManager from "../components/RedirectManager.vue";
import FluroTable from '../../../table/FluroTable.vue';
import FluroSelector from '../../../form/contentselect/FluroSelector.vue';



/////////////////////////////////

import Vue from "vue";

/////////////////////////////////

export default {
				mixins: [FluroContentEditMixin],
				components: {
								FluroPermissionSelect,
								RedirectManager,
								FluroTable,
				},
				asyncComputed: {
								devices: {
												default: [],
												get() {

																var self = this;

																if (!self.devicesEnabled) {
																				return Promise.resolve([]);
																}


																return new Promise(function(resolve, reject) {
																				self.$fluro.api.get(`/application/${self.model._id}/devices`).then(function(res) {
																												resolve(res.data);
																								})
																								.catch(function(err) {
																												reject(err);
																								})
																})
												},
								},
				},
				computed: {
								pushDevices() {
												var self = this;

												var devices = self.devices;

												if (self.deviceSelection && self.deviceSelection.selection.length) {
																devices = self.deviceSelection.selection
												}

												return _.filter(devices, function(device) {
																return device.notificationID;
												})
								},
								deviceSelection() {

												var SelectionManager = Vue.extend(FluroSelector);
												var instance = new SelectionManager({
																propsData: {
																				minimum: 0,
																				maximum: 0,
																}
												})


												return instance;


								},
								deviceColumns() {

												var array = [];

												array.push({
																title: 'OS',
																key: 'platform',
																align: 'center',
												})

												array.push({
																title: 'OS Version',
																key: 'metadata.osVersion',
																type: 'number',
																sortType: 'number',
																align: 'center',
												})

												array.push({
																title: 'Make',
																key: 'metadata.manufacturer',
												})

												array.push({
																title: 'Model',
																key: 'metadata.model',
												})


												array.push({
																title: 'Version',
																key: 'metadata.appVersion',
																type: 'number',
																sortType: 'number',
												})

												array.push({
																title: 'Name',
																key: 'metadata.name',
												})


												array.push({
																title: 'Notifications',
																key: 'notificationID',
																sortType: 'boolean',
																type: 'boolean',
												})


												array.push({
																title: 'Last seen',
																key: 'updated',
																sortType: 'date',
																renderer: 'timeago',
												})



												return array;
								},
								devicesEnabled() {
												return this.model._id && this.model.bundleIDs && this.model.bundleIDs.length;
								},
								showOutline() {
												return false; //true; //false;//true;//false;//true;
								},
								fieldsOutput() {
												var self = this;
												var array = [];

												///////////////////////////////////

												addField("title", {
																title: "Title",
																minimum: 1,
																maximum: 1,
																type: "string"
												});

												// ///////////////////////////////////

												addField("domain", {
																title: "Domain Name",
																minimum: 1,
																maximum: 1,
																type: "string",
																description: "Add a domain name for this application (without https://)",
																placeholder: "Eg. website.com"
												});

												addField("forwards", {
																title: "Forwarding Domains",
																minimum: 0,
																maximum: 0,
																type: "string",
																description: "Add domain names that should redirect to the primary domain name",
																placeholder: "Eg. www.website.com"
												});

												addField("bundleIDs", {
																title: "Native Application Bundle IDs",
																minimum: 0,
																maximum: 0,
																type: "string",
																description: "Add the native iOS and Android bundle ids for this application",
																placeholder: "Eg. com.yourwebsite.application"
												});


												addField("nativeEngine", {
																title: "Application Engine",
																minimum: 0,
																maximum: 1,
																type: "reference",
																params: {
																				// restrictType: 'fluroAppEngine',
																				restrictType: 'asset',
																},
																description: "Override your own custom application engine",
												});




												addField("forceSSL", {
																title: "Force SSL",
																minimum: 0,
																maximum: 1,
																type: "boolean",
																description: "Check this box to redirect all requests to https://"
												});

												addField("authenticationStyle", {
																title: "Authentication Style",
																minimum: 0,
																maximum: 1,
																type: "string",
																directive: "select",
																options: [{
																								title: "Application",
																								value: "application"
																				},
																				{
																								title: "Fluro Browser Cookie",
																								value: "global"
																				}
																]
												});

												addField("apipath", {
																title: "API URL",
																minimum: 0,
																maximum: 1,
																type: "string",
																description: "Specify which API URL this application should use. If left blank, the default fluro api url will be used.",
																placeholder: "https://api.fluro.io"
												});

												addField("timezone", {
																title: "Timezone",
																minimum: 0,
																maximum: 1,
																type: "string",
																directive: "timezone-select",
																description: "Which timezone should be used for this application"
												});

												addField("gaTrackingCode", {
																title: "Google Analytics ID",
																minimum: 0,
																maximum: 1,
																type: "string",
																placeholder: "UA-XXXXXX",
																description: "Paste your GA tracking code to enable google analytics to track this site"
												});

												addField("supportEmail", {
																title: "Support Email Address",
																minimum: 0,
																maximum: 1,
																type: "email",
																placeholder: "support@yourdomain.com",
																description: "The default support/contact email for notifications and enquiries regarding this application"
												});

												addField("favicon", {
																title: "Favicon",
																minimum: 0,
																maximum: 1,
																type: "reference",
																params: {
																				restrictType: "image"
																},
																description: "Choose an image to use for the favicon. (Recommend a 1:1 ratio and at least 1024 x 1024px)"
												});

												addField("headerInject", {
																title: "Header Injection Code",
																minimum: 0,
																maximum: 1,
																type: "string",
																directive: "code",
																params: {
																				syntax: "html"
																},
																description: "Include HTML that can be injected above the closing </head> tag"
												});

												addField("footerInject", {
																title: "Footer Injection Code",
																minimum: 0,
																maximum: 1,
																type: "string",
																directive: "code",
																params: {
																				syntax: "html"
																},
																description: "Include HTML that can be injected above the closing </body> tag"
												});

												function addField(key, details) {
																details.key = key;
																array.push(details);
												}

												return array;
								}
				},
				methods: {
								sendPush() {
												var self = this;


												var fields = [];


												fields.push({
																title: 'Title',
																key: 'title',
																description: 'The main title of this notification',
																minimum: 1,
																maximum: 1,
												})

												fields.push({
																title: 'Body',
																key: 'body',
																directive: 'textarea',
																description: 'Subtext for this notification',
																minimum: 0,
																maximum: 1,
												})

												fields.push({
																title: 'URL Path',
																key: 'path',
																type: 'string',
																placeholder: 'Eg. /notifications',
																description: 'The path you app should navigate to if a user taps this notification (Include preceding slash)',
																minimum: 0,
																maximum: 1,
												})

												self.sending = true;

												var devices = self.$fluro.utils.arrayIDs(self.pushDevices);

												self.$fluro.prompt(fields, `New Notification`, `Sending to ${devices.length} devices`)
																.then(function(answers) {




																				//////////////////////////////////////////////////

																				self.$fluro.api.post(`/native/${self.model._id}/messages`, {
																												devices,
																												notification: {
																																title: answers.title,
																																body: answers.body,
																												},
																												data: {
																																path: answers.path ? answers.path : null,
																												}
																								})
																								.then(function(res) {

																												self.sending = false;
																												self.$fluro.notify('Notification was sent!')
																								}, failed)

																}, failed)


												function failed(err) {

																if (err) {
																				self.$fluro.error(err);
																}

																self.sending = false;

												}

								},
								modelUpdated() {

												this.update(this.model);
								}
				},
				data() {
								return {
												sending: false,
								};
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

</style>
