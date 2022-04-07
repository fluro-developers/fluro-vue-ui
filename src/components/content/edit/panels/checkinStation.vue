<template>
	<flex-column>
		<template v-if="loading">
			<fluro-page-preloader contain />
		</template>
		<tabset v-else :justified="true" :vertical="true">
			<tab heading="Basic Info">
				<flex-column-body style="background: #fafafa">
					<v-container grid-list-xl>
						<fluro-content-form-field
							:form-fields="formFields"
							:outline="showOutline"
							@input="update"
							:options="options"
							:field="fieldHash.title"
							v-model="model"
						/>
						<v-layout flex row>
							<v-flex xs12 sm8>
								<!-- <pre>{{definition}}</pre> -->
								<constrain sm>
									<fluro-panel>
										<!-- <fluro-panel-title> -->
										<!-- <strong>Configuration</strong> -->
										<!-- <div class="font-sm">Information for accessing this application in your browser</div> -->
										<!-- </fluro-panel-title> -->
										<fluro-panel-body>
											<fluro-content-form-field
												:form-fields="formFields"
												:outline="showOutline"
												@input="update"
												:options="options"
												:field="fieldHash.domain"
												v-model="model"
											/>
											<fluro-content-form-field
												:form-fields="formFields"
												:outline="showOutline"
												@input="update"
												:options="options"
												:field="fieldHash.requirePIN"
												v-model="model"
											/>
											<fluro-content-form-field
												:form-fields="formFields"
												:outline="showOutline"
												@input="update"
												:options="options"
												:field="fieldHash.pin"
												v-model="model"
											/>
										</fluro-panel-body>
										<fluro-panel-body v-if="definedFields.length">
											<fluro-content-form
												:options="editorOptions"
												v-model="model.data"
												:fields="definedFields"
											/>
										</fluro-panel-body>
									</fluro-panel>
								</constrain>
							</v-flex>
							<v-flex xs12 sm4>
								<fluro-panel>
									<fluro-panel-body>
										<h4>Run as an app</h4>
										<p>
											The Kiosk iOS and Android app allows you to run your checkin seamlessly on a
											tablet or phone device. You can download it from the Apple App Store or
											Google Play Marketplace by searching 'Fluro Kiosk'. Or by using one of the
											buttons below:
										</p>
										<v-layout>
											<v-flex>
												<v-btn
													color="primary"
													block
													href="https://apps.apple.com/au/app/fluro-kiosk/id1539557322"
												>
													Apple
													<fluro-icon right icon="apple" library="fab" />
												</v-btn>
											</v-flex>
											<v-flex>
												<v-btn
													color="primary"
													block
													href="https://play.google.com/store/apps/details?id=io.fluro.apps.kiosk&hl=en_AU&gl=US"
												>
													Android
													<fluro-icon right icon="google-play" library="fab" />
												</v-btn>
											</v-flex>
										</v-layout>
									</fluro-panel-body>
									<fluro-panel-body class="border-top">
										<h4>Scan '{{ application.title }}' Code</h4>
										<p>Scan the QR Code below.</p>
										<div class="qr">
											<img :src="qrURL" />
										</div>
									</fluro-panel-body>
								</fluro-panel>
							</v-flex>
						</v-layout>
					</v-container>
				</flex-column-body>
			</tab>
			<tab heading="Application Permissions" :enabled="model.authenticationStyle == 'application'">
				<flex-column-body style="background: #fafafa">
					<v-container>
						<constrain sm>
							<h5 margin>Application Permissions</h5>
							<p>
								Add permissions here that will be attributed to this application's API Key whether a
								user is signed in or not.
							</p>
							<fluro-permission-select @input="modelUpdated" v-model="model.permissionSets" />
						</constrain>
					</v-container>
				</flex-column-body>
			</tab>
			<tab heading="Advanced">
				<flex-column-body style="background: #fafafa">
					<v-container>
						<constrain sm>
							<h5 margin>Advanced</h5>
							<fluro-content-form-field
								:form-fields="formFields"
								:outline="showOutline"
								@input="update"
								:options="options"
								:field="fieldHash.apipath"
								v-model="model"
							/>
							<fluro-content-form-field
								:form-fields="formFields"
								:outline="showOutline"
								@input="update"
								:options="options"
								:field="fieldHash.timezone"
								v-model="model"
							/>
							<!-- <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.source" v-model="model.data" /> -->
						</constrain>
					</v-container>
				</flex-column-body>
			</tab>
		</tabset>
	</flex-column>
</template>
<script>
/////////////////////////////////

import FluroContentEditMixin from '../FluroContentEditMixin.js';
import FluroPermissionSelect from '../../../form/FluroPermissionSelect.vue';
import RedirectManager from '../components/RedirectManager.vue';
import FluroTable from '../../../table/FluroTable.vue';
import FluroSelector from '../../../form/contentselect/FluroSelector.vue';

/////////////////////////////////

import Vue from 'vue';

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

				return new Promise(function (resolve, reject) {
					self.$fluro.api
						.get(`/application/${self.model._id}/devices`)
						.then(function (res) {
							resolve(res.data);
						})
						.catch(function (err) {
							reject(err);
						});
				});
			},
		},
	},
	created() {
		if (!this.model.data) {
			this.model.data = {};
		}

		if (!this.model.privateDetails) {
			this.model.privateDetails = {};
		}

		if (!this.model._id) {
			var defaultDistribution = _.get(this.definition, 'data.defaultDistribution');
			if (defaultDistribution) {
				this.model.deployment = defaultDistribution;
			}
		}
	},
	computed: {
		qrURL() {
			return `${this.$fluro.apiURL}/system/qr?input=fluromanifest://${this.model.domain}`;
		},
		definedFields() {
			var self = this;

			if (!self.definition) {
				return [];
			}

			var fields = self.definition.fields || [];

			var allowedKeys = {
				// description: true,
				printingEnabled: true,
				separate: true,
				forms: true,
				// rollCall:true,
				requirePin: true,
				disableRollCall: true,
				restrictGroups: true,
				// family:true,
				// search:true,
			};

			return _.filter(fields, function (field) {
				return allowedKeys[field.key];
			});
		},
		apiKey() {
			if (this.model._id && this.model.authenticationStyle == 'application') {
				return this.model.apikey;
			} else {
				return '(Will be generated after save)';
			}
		},
		defaultDeployment() {
			if (this.definition) {
				return _.get(this.definition, 'data.defaultDistribution');
			}
		},
		showDeploymentDropdown() {
			if (this.definition) {
				switch (this.definition.definitionName) {
					case 'checkinStation':
						return true;
						break;
					default:
						break;
				}
			}

			return !_.get(this.model, 'data.source');
		},
		pushDevices() {
			var self = this;

			var devices = self.devices;

			if (self.deviceSelection && self.deviceSelection.selection.length) {
				devices = self.deviceSelection.selection;
			}

			return _.filter(devices, function (device) {
				return device.notificationID;
			});
		},
		deviceSelection() {
			var SelectionManager = Vue.extend(FluroSelector);
			var instance = new SelectionManager({
				propsData: {
					minimum: 0,
					maximum: 0,
				},
			});

			return instance;
		},
		deviceColumns() {
			var array = [];

			array.push({
				title: 'OS',
				key: 'platform',
				align: 'center',
			});

			array.push({
				title: 'OS Version',
				key: 'metadata.osVersion',
				type: 'number',
				sortType: 'number',
				align: 'center',
			});

			array.push({
				title: 'Make',
				key: 'metadata.manufacturer',
			});

			array.push({
				title: 'Model',
				key: 'metadata.model',
			});

			array.push({
				title: 'Version',
				key: 'metadata.appVersion',
				type: 'number',
				sortType: 'number',
			});

			array.push({
				title: 'Name',
				key: 'metadata.name',
			});

			array.push({
				title: 'Notifications',
				key: 'notificationID',
				sortType: 'boolean',
				type: 'boolean',
			});

			array.push({
				title: 'Last seen',
				key: 'updated',
				sortType: 'date',
				renderer: 'timeago',
			});

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

			addField('title', {
				title: 'Title',
				minimum: 1,
				maximum: 1,
				type: 'string',
			});

			// ///////////////////////////////////

			addField('domain', {
				title: 'Primary Domain Name',
				minimum: 1,
				maximum: 1,
				type: 'string',
				description: 'Add a domain name for this application (without https://)',
				placeholder: 'Eg. website.com',
			});

			///////////////////////////////////

			var deploymentOptions = [];
			var defaultDeploymentValues = [];

			deploymentOptions.push({
				name: 'Fluro - Classic Admin',
				value: 'io.fluro.admin',
			});

			deploymentOptions.push({
				name: 'Fluro - Classic Website',
				value: 'io.fluro.webrender',
			});

			deploymentOptions.push({
				name: 'Fluro - Remap Tool',
				value: 'io.fluro.remap',
			});

			var definitionName;

			if (self.definition) {
				definitionName = self.definition.definitionName;

				switch (definitionName) {
					case 'checkinStation':
						deploymentOptions = [];
						deploymentOptions.push({
							name: 'Checkin - Self First',
							value: 'io.fluro.checkin.self',
						});

						deploymentOptions.push({
							name: 'Checkin - Parent First',
							value: 'io.fluro.checkin.parent',
						});
						break;
					default:
						if (self.defaultDeployment && self.defaultDeployment.length) {
							defaultDeploymentValues = [self.defaultDeployment];

							deploymentOptions = [];
							deploymentOptions.push({
								name: `${self.definition.title} - Default`,
								value: self.defaultDeployment,
							});
						}
						break;
				}
			}

			addField('deployment', {
				title: 'Application Type / Deployment',
				minimum: deploymentOptions.length == 1 || definitionName == 'checkinStation' ? 1 : 0,
				maximum: 1,
				type: 'string',
				directive: 'select',
				description: 'Select an application to deploy',
				options: deploymentOptions,
				defaultValues: defaultDeploymentValues,
			});

			addField('origins', {
				title: 'Allowed CORS Origins',
				minimum: 0,
				maximum: 0,
				type: 'string',
				description: `By default '${self.model.domain}' will be the only origin allowed to sign in to this application. To add additional origins enter them below. Include port numbers but do not include trailing slash.`,
				placeholder: 'eg. http://www.example.com',
				params: {
					persistentDescription: true,
				},
			});

			addField('blacklist', {
				title: 'Blacklist IPs',
				minimum: 0,
				maximum: 0,
				type: 'string',
				description: `IP addresses on this list will be blocked from using this application access token.`,
				placeholder: 'eg. 0.0.0.0',
				params: {
					persistentDescription: true,
				},
			});

			addField('whitelist', {
				title: 'Whitelist IPs',
				minimum: 0,
				maximum: 0,
				type: 'string',
				description: `IP addresses that are not included in this list will be blocked from using this application access token.`,
				placeholder: 'eg. 0.0.0.0',
				params: {
					persistentDescription: true,
				},
				expressions: {
					show() {
						return !self.model.blacklist || !self.model.blacklist.length;
					},
				},
			});

			addField('forwards', {
				title: 'Additional Domains',
				minimum: 0,
				maximum: 0,
				type: 'string',
				description: 'Additional domains that should forward to your primary domain',
				placeholder: 'eg. website.net',
				params: {
					persistentDescription: true,
				},
			});

			addField('bundleIDs', {
				title: 'Native Application Bundle IDs',
				minimum: 0,
				maximum: 0,
				type: 'string',
				description: 'Add the native iOS and Android bundle ids for this application',
				placeholder: 'Eg. com.yourwebsite.application',
			});

			addField('nativeEngine', {
				title: 'Application Engine',
				minimum: 0,
				maximum: 1,
				type: 'reference',
				params: {
					// restrictType: 'fluroAppEngine',
					restrictType: 'asset',
				},
				description: 'Override your own custom application engine',
			});

			addField('source', {
				title: 'Site Model Source',
				minimum: 0,
				maximum: 1,
				type: 'reference',
				params: {
					// restrictType: 'fluroAppEngine',
					restrictType: 'sitemodel',
					searchInheritable: true,
				},
				description: 'Manually set the site data model for this application',
			});

			addField('requireLogin', {
				title: 'Require Login ',
				minimum: 0,
				maximum: 1,
				type: 'boolean',
				expressions: {
					hide: 'model.requirePIN',
				},
				description: 'Require the user to login with a Fluro username and password',
			});

			addField('lockAccount', {
				title: 'Lock Account',
				minimum: 0,
				maximum: 1,
				type: 'boolean',
				expressions: {
					show: 'model.requireLogin',
				},
				description: `Require the user to have an active persona in the ${self.user.account.title} account`,
			});

			addField('lockRole', {
				title: 'Lock Role',
				minimum: 0,
				maximum: 1,
				type: 'boolean',
				expressions: {
					show: 'model.requireLogin',
				},
				description: `Require the user to have been given explicit access to this app via either a role or access pass`,
			});

			addField('requirePIN', {
				title: 'Require Access Pin Number',
				minimum: 0,
				maximum: 1,
				type: 'boolean',
				description:
					'Require a pin number to be entered to gain access to the checkin station when opening in browser. This is highly recommended to keep your checkin interface secure from being publicly accessible.',
				params: {
					persistentDescription: true,
				},
			});

			addField('pin', {
				title: 'Access PIN Number',
				minimum: 0,
				maximum: 1,
				type: 'string',
				description: 'Enter an access PIN Number',
				expressions: {
					show: 'model.requirePIN',
				},
			});

			addField('forceSSL', {
				title: 'Force SSL',
				minimum: 0,
				maximum: 1,
				type: 'boolean',
				description: 'Check this box to redirect all requests to https://',
			});

			addField('authenticationStyle', {
				title: 'Authentication Style',
				minimum: 0,
				maximum: 1,
				type: 'string',
				directive: 'select',
				options: [
					{
						title: 'Standalone Application (Recommended)',
						value: 'application',
					},
					{
						title: 'Fluro Browser Cookie',
						value: 'global',
					},
				],
			});

			addField('apipath', {
				title: 'API URL',
				minimum: 0,
				maximum: 1,
				type: 'string',
				description:
					"Don't change this unless you know what you are doing. Specify which API URL this application should use. If left blank, the default fluro api url will be used.",
				placeholder: 'https://api.fluro.io',
				params: {
					persistentDescription: true,
				},
			});

			addField('timezone', {
				title: 'Application Timezone',
				minimum: 0,
				maximum: 1,
				type: 'string',
				directive: 'timezone-select',
				description:
					'Which timezone should be used for this application. If none selected it will default to the account timezone',
			});

			addField('gaTrackingCode', {
				title: 'Google Tag Manager ID',
				minimum: 0,
				maximum: 1,
				type: 'string',
				placeholder: 'GTM-XXXXXX',
				description: 'Paste your GTM tracking code to enable google analytics to track this site',
			});

			addField('supportEmail', {
				title: 'Support Email Address',
				minimum: 0,
				maximum: 1,
				type: 'email',
				placeholder: 'support@yourdomain.com',
				description:
					'The default support/contact email for notifications and enquiries regarding this application',
			});

			addField('favicon', {
				title: 'Favicon',
				minimum: 0,
				maximum: 1,
				type: 'reference',
				params: {
					restrictType: 'image',
				},
				description:
					'Choose an image to use for the favicon. (Recommend a 1:1 ratio and at least 1024 x 1024px)',
			});

			addField('headerInject', {
				title: 'Header Injection Code',
				minimum: 0,
				maximum: 1,
				type: 'string',
				directive: 'code',
				params: {
					syntax: 'html',
				},
				description: 'Include HTML that can be injected above the closing </head> tag',
			});

			addField('footerInject', {
				title: 'Footer Injection Code',
				minimum: 0,
				maximum: 1,
				type: 'string',
				directive: 'code',
				params: {
					syntax: 'html',
				},
				description: 'Include HTML that can be injected above the closing </body> tag',
			});

			function addField(key, details) {
				details.key = key;
				array.push(details);
			}

			return array;
		},
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
			});

			fields.push({
				title: 'Body',
				key: 'body',
				directive: 'textarea',
				description: 'Subtext for this notification',
				minimum: 0,
				maximum: 1,
			});

			fields.push({
				title: 'URL Path',
				key: 'path',
				type: 'string',
				placeholder: 'Eg. /notifications',
				description:
					'The path you app should navigate to if a user taps this notification (Include preceding slash)',
				minimum: 0,
				maximum: 1,
			});

			self.sending = true;

			var devices = self.$fluro.utils.arrayIDs(self.pushDevices);

			self.$fluro
				.prompt(fields, `New Notification`, {}, `Sending to ${devices.length} devices`)
				.then(function (answers) {
					//////////////////////////////////////////////////

					self.$fluro.api
						.post(`/native/${self.model._id}/messages`, {
							devices,
							notification: {
								title: answers.title,
								body: answers.body,
							},
							data: {
								path: answers.path ? answers.path : null,
							},
						})
						.then(function (res) {
							self.sending = false;
							self.$fluro.notify('Notification was sent!');
						}, failed);
				}, failed);

			function failed(err) {
				if (err) {
					self.$fluro.error(err);
				}

				self.sending = false;
			}
		},
		modelUpdated() {
			this.update(this.model);
		},
	},
	data() {
		return {
			sending: false,
		};
	},
};
</script>
<style scoped lang="scss">
.hint {
	font-size: 10px;
	opacity: 0.5;
	color: inherit;
	display: block;
}

.qr {
	display: block;
	position: relative;
	height: 0;
	overflow: hidden;
	padding-bottom: 100%;
	// border:10px solid #000;
	// border-radius:10px;

	img {
		width: 100%;
		height: 100%;
		position: absolute;
		left: -10%;
		right: -10%;
		bottom: -10%;
		top: -10%;
		border-radius: 10px;
	}
}
</style>
