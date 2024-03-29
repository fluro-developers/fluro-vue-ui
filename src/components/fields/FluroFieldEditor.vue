<template>
	<flex-column class="fluro-field-editor" :class="{ 'schema-mode': !formMode }">
		<flex-row>
			<flex-column class="sidebar">
				<flex-column class="fields-tree" v-show="true || !(field || configurePayment || configureDefaults)">
					<flex-column-header>
						<div class="palette-title">
							<v-layout align-center>
								<v-flex>
									<strong label>Field Tree</strong>
									<fluro-help
										title="Field Tree"
										body="This shows you a list of all fields that are defined on your form and shows the depth at which they are nested. Click a field to modify it. Hover over it to highlight it in the form preview."
									/>
								</v-flex>
								<v-flex shrink>
									<span class="state-link" @click="expandAll()">Expand All</span>
									<span class="state-link" @click="collapseAll()">Collapse All</span>
								</v-flex>
							</v-layout>
						</div>
					</flex-column-header>
					<flex-column-body>
						<v-container pa-2>
							<template v-if="formMode">
								<div
									class="pseudo-field"
									:class="{ active: configureDefaults && !field }"
									@click="showDefaultFieldOptions()"
								>
									Form Configuration
								</div>
							</template>
							<draggable
								class="field-editor-children"
								handle=".handle"
								element="ul"
								@sort="sorted"
								v-model="model"
								:options="treeOptions"
							>
								<fluro-field-editor-item
									:top="model"
									:mouseover="mouseover"
									:mouseleave="mouseleave"
									:parent="psuedoParent"
									:parentGroup="psuedoParent"
									:leaf="model[index]"
									:selected="field"
									:select="clicked"
									@duplicate="duplicateField"
									@injected="injectField"
									@copypath="copyFieldPath"
									@deleted="deleteField"
									v-for="(leaf, index) in model"
									:key="leaf.guid"
								/>
							</draggable>
							<template v-if="formMode && isEnterprise">
								<div
									class="pseudo-field"
									:class="{ active: configurePayment && !field }"
									@click="showPaymentOptions()"
								>
									Payment Options
								</div>
							</template>
						</v-container>
					</flex-column-body>
					<flex-column-footer class="border-top">
						<v-container class="pa-2" style="background: #fff">
							<v-layout row>
								<v-flex v-if="formMode">
									<v-btn small class="ma-1" color="primary" block @click="addNewTemplate()">
										<fluro-help
											title="Add a Field"
											body="Click here to add a new field to your form"
										/>Add Field
										<fluro-icon icon="plus" right />
									</v-btn>
								</v-flex>
								<v-flex v-else-if="componentMode">
									<v-btn small class="ma-1" color="primary" block @click="addNewComponentTemplate()">
										Add Field
										<fluro-help
											title="Add a Field"
											body="Click here to add a new field to your component"
										/>
										<fluro-icon icon="plus" right />
									</v-btn>
								</v-flex>
								<v-flex v-else>
									<v-btn
										small
										class="ma-1"
										color="primary"
										block
										@click="addNewTypeTemplate(parentType)"
									>
										Add Field
										<fluro-help title="Add a Field" body="Click here to add a new field" />
										<fluro-icon icon="plus" right />
									</v-btn>
								</v-flex>
								<v-spacer />
								<v-flex>
									<v-btn small class="ma-1" block @click="addNewField('group')">
										Add Group
										<fluro-help
											title="Add a Group"
											body="Click here to add a new field group. Field groups can be used to group fields together visually or to allow for repeating subsets of fields."
										/>
										<fluro-icon icon="folder" right />
									</v-btn>
								</v-flex>
							</v-layout>
						</v-container>
					</flex-column-footer>
				</flex-column>
			</flex-column>
			<flex-column class="preview" v-if="showPreview">
				<fluro-page-preloader contain v-if="resetting" />
				<flex-column-header>
					<div class="palette-title">
						<v-layout align-center>
							<v-flex>
								<strong label>{{ formMode ? 'Form' : '' }} Preview</strong>
								<fluro-help
									title="Preview"
									body="View a realtime preview of how the form will look and behave when presented to the user"
								/>
							</v-flex>
							<v-spacer />
							<v-flex shrink v-if="formMode && isEnterprise">
								<v-menu :fixed="true" transition="slide-y-transition" offset-y>
									<template v-slot:activator="{ on }">
										<span class="state-link" v-tippy content="Change Preview State" v-on="on">
											{{ readablePreviewState }}
											<fluro-icon icon="angle-down" />
											<fluro-help
												title="State Selector"
												body="Preview the state of the form after it's been submitted. Or view the data model as you input information into the form."
											/>
										</span>
										<!-- <v-btn class="ma-0" small flat >Preview: {{previewState}}</v-btn> -->
									</template>
									<v-card tile>
										<v-list dense>
											<v-list-tile @click="previewState = 'ready'">
												<v-list-tile-content>
													<v-list-tile-title>View 'Ready for input' state</v-list-tile-title>
												</v-list-tile-content>
											</v-list-tile>
											<v-list-tile @click="previewState = 'success'">
												<v-list-tile-content>
													<v-list-tile-title>View 'Success' state</v-list-tile-title>
												</v-list-tile-content>
											</v-list-tile>
											<v-list-tile @click="toggleDataModel()">
												<v-list-tile-content>
													<v-list-tile-title
														>{{ dataModelEnabled ? 'Hide' : 'Show' }} Data
														Model</v-list-tile-title
													>
												</v-list-tile-content>
											</v-list-tile>
										</v-list>
									</v-card>
								</v-menu>
							</v-flex>
							<v-flex shrink>
								<span class="state-link" @click="resetPreview()">
									<fluro-help
										title="Reset Form"
										body="After changing your form, you sometimes may want to reset the preview window manually. To do so click here."
									/>
									Reset {{ formMode ? 'Form' : 'Preview' }}
									<fluro-icon icon="undo" />
								</span>
								<!-- <v-btn :loading="resetting" @click="resetPreview()" class="ma-0" tiny>
Reset
<fluro-icon icon="undo" right />
</v-btn>-->
								<!-- </div> -->
							</v-flex>
						</v-layout>
					</div>
				</flex-column-header>
				<!-- <flex-column-body> -->
				<!-- <pre>{{model}}</pre> -->
				<!-- </flex-column-body> -->
				<flex-column-body>
					<v-container v-if="resetting">
						<fluro-page-preloader contain />
					</v-container>
					<template v-else>
						<template sm v-if="formMode">
							<div class="form-image" v-if="image">
								<fluro-help
									title="Form Image"
									body="Forms by default can have a hero image that will be displayed above the form when presented to the user"
								/>
								<fluro-image
									cover
									:from="item"
									:imageWidth="1000"
									:imageHeight="300"
									:spinner="true"
									:item="image"
								/>
							</div>
							<v-container fluid>
								<wrapper sm>
									<constrain sm>
										<!-- :fields="model" -->
										<fluro-interaction-form
											@state="stateChanged"
											:contextField="contextField"
											:defaultState="previewState"
											context="builder"
											:prefill="false"
											@debug="debugField"
											:title="item.title"
											:definition="fauxDefinition"
											:paymentIntegration="paymentIntegration"
											:gateways="paymentGateways"
											:debugMode="true"
											v-model="previewModel"
											ref="previewForm"
										>
											<template v-slot:info>
												<h1 margin v-if="!hideDisplayTitle">{{ displayTitle }}</h1>
												<fluro-compile-html
													class="form-body"
													:template="publicData.body"
													:context="item"
												/>
											</template>
											<template v-slot:success v-if="publicData.thankyou">
												<fluro-compile-html
													class="form-thankyou"
													:template="publicData.thankyou"
													:context="item"
												/>
											</template>
										</fluro-interaction-form>
									</constrain>
								</wrapper>
							</v-container>
						</template>
						<v-container v-else>
							<constrain sm>
								<!--
<fluro-content-form
:context="context"
:debugMode="debugMode"
:contextField="contextField"
:recursiveClick="recursiveClick"
@errorMessages="validate"
@input="modelChanged"
ref="form"
:options="options"
v-model="dataModel"
:fields="fields"
/>-->
								<fluro-content-form
									context="definition"
									:recursiveClick="debugComponent"
									:debugMode="true"
									:contextField="contextField"
									v-model="previewModel"
									ref="previewForm"
									:fields="model"
								/>
							</constrain>
						</v-container>
					</template>
				</flex-column-body>
				<flex-column class="border-top" v-if="dataModelEnabled">
					<flex-column-header>
						<div class="palette-title">
							<v-layout align-center>
								<v-flex>
									<strong label>Data Model Preview</strong>
								</v-flex>
								<v-spacer />
								<v-flex shrink>
									<v-btn class="ma-0" small icon @click="dataModelEnabled = false">
										<fluro-icon icon="times" />
									</v-btn>
								</v-flex>
							</v-layout>
						</div>
					</flex-column-header>
					<flex-column-body class="model-preview">
						<json-view
							:highlightMouseoverNode="true"
							:highlightSelectedNode="true"
							:selectOnClickNode="true"
							:showLength="true"
							:data="previewModel"
						/>
					</flex-column-body>
				</flex-column>
				<flex-column-footer class="border-top" v-if="false">
					<v-container class="pa-2" style="background: #fff">
						<v-layout>
							<v-flex>
								<v-btn small class="ma-0" block :loading="resetting" @click="resetPreview()">
									Reset Form Preview
									<fluro-icon icon="undo" right />
								</v-btn>
							</v-flex>
							<v-spacer />
							<!--  <v-flex>
<v-btn small class="ma-0" block :loading="resetting" @click="resetPreview()">
Reset Preview
<fluro-icon icon="undo" right />
</v-btn>
</v-flex>-->
						</v-layout>
					</v-container>
				</flex-column-footer>
			</flex-column>
			<!-- v-show="(field || configurePayment || configureDefaults)" -->
			<flex-column class="field-options">
				<template v-if="field">
					<flex-column-header>
						<div class="palette-title">
							<v-layout align-center>
								<strong label>{{ field.title || 'Untitled field' }}</strong>
								<v-spacer />
								<v-flex shrink>
									<span class="state-link" @click="deselectAll()">
										<fluro-icon icon="times" />
									</span>
								</v-flex>
							</v-layout>
						</div>
					</flex-column-header>
					<fluro-field-edit
						@reset="resetPreview()"
						:item="item"
						@deleted="deleteSelectedField"
						:expressionFields="expressionFields"
						v-model="field"
					/>
				</template>
				<template v-else-if="configurePayment">
					<flex-column-header>
						<div class="palette-title">
							<v-layout align-center>
								<v-flex>
									<strong label>Payment Settings</strong>
								</v-flex>
								<v-flex shrink>
									<span class="state-link" @click="deselectAll()">
										<fluro-icon icon="times" />
									</span>
								</v-flex>
							</v-layout>
						</div>
					</flex-column-header>
					<flex-column-body>
						<slot name="payment" />
					</flex-column-body>
				</template>
				<template v-else-if="configureDefaults">
					<flex-column-header>
						<div class="palette-title">
							<v-layout align-center>
								<v-flex>
									<strong label>Form Configuration</strong>
								</v-flex>
								<v-flex shrink>
									<span class="state-link" @click="deselectAll()">
										<fluro-icon icon="times" />
									</span>
								</v-flex>
							</v-layout>
						</div>
					</flex-column-header>
					<flex-column-body>
						<slot name="form" />
					</flex-column-body>
				</template>
				<template v-else>
					<flex-column center class="placeholder">
						<v-container fluid style="flex: none" class="text-xs-center">
							<p class="muted">Select a field on the left to edit configuration</p>
						</v-container>
					</flex-column>
				</template>
			</flex-column>
		</flex-row>
	</flex-column>
</template>
<script>
import Vue from 'vue';
import _ from 'lodash';

import FieldTemplates from './FieldEditorTemplates';
import DefinitionTemplates from './FieldEditorDefinitionTemplates';
import ComponentFieldTemplates from './FieldEditorComponentTemplates';
import draggable from 'vuedraggable';
import FluroFieldEditorItem from './FluroFieldEditorItem.vue';
import FluroFieldEdit from './FluroFieldEdit.vue';
import FluroContentForm from '../form/FluroContentForm.vue';
import FluroInteractionForm from '../form/FluroInteractionForm.vue';
import FluroCompileHtml from '../FluroCompileHtml.vue';
import FluroHelp from '../FluroHelp.vue';

export default {
	components: {
		draggable,
		FluroFieldEditorItem,
		FluroFieldEdit,
		FluroContentForm,
		FluroInteractionForm,
		FluroCompileHtml,
		FluroHelp,
	},
	props: {
		value: {
			type: Array,
			default() {
				return [];
			},
		},
		item: {
			type: Object,
		},
	},
	created() {
		var self = this;

		/////////////////////////////

		self.recursiveGUID(self.model);
	},
	computed: {
		isEnterprise() {
			return this.uiMode != 'subsplash';
		},
		isPro() {
			return this.$pro && this.$pro.enabled;
		},
		expressionFields() {
			var self = this;
			var extraFields = [];

			if (self.askFirstName) {
				extraFields.push({
					title: 'First Name',
					key: '_firstName',
					minimum: 0,
					maximum: 1,
					type: 'string',
				});
			}

			if (self.askLastName) {
				extraFields.push({
					title: 'Last Name',
					key: '_lastName',
					minimum: 0,
					maximum: 1,
					type: 'string',
				});
			}

			if (self.askGender) {
				extraFields.push({
					title: 'Gender',
					key: '_gender',
					minimum: 0,
					maximum: 1,
					type: 'string',
					directive: 'select',
					options: [
						{
							name: 'Male',
							value: 'male',
						},
						{
							name: 'Female',
							value: 'female',
						},
						{
							name: `I'd prefer not to say`,
							value: 'unknown',
						},
					],
				});
			}

			if (self.askDOB) {
				extraFields.push({
					title: 'Date of Birth',
					key: '_dob',
					minimum: 0,
					maximum: 1,
					type: 'date',
				});
			}

			if (self.askPhone) {
				extraFields.push({
					title: 'Phone Number',
					key: '_phoneNumber',
					minimum: 0,
					maximum: 1,
					type: 'string',
				});
			}

			if (self.askEmail) {
				extraFields.push({
					title: 'Phone Number',
					key: '_email',
					minimum: 0,
					maximum: 1,
					type: 'email',
				});
			}

			if (!extraFields || !extraFields.length) {
				return self.model;
			}

			return [].concat(extraFields, this.model);
		},
		parentType() {
			return this.item.parentType;
		},
		psuedoParent() {
			return {
				title: 'FORM',
				type: 'group',
				fields: this.model,
			};
		},
		allFields() {
			var self = this;

			var array = [];

			/////////////////////////////////

			function recursiveFind(fields) {
				_.each(fields, function (field) {
					array.push(field);
					recursiveFind(field.fields);
				});
			}

			/////////////////////////////////

			recursiveFind(self.model);

			/////////////////////////////////

			return array;
		},
		readablePreviewState() {
			switch (this.previewState) {
				case 'ready':
					return 'Ready for input';
					break;
				case 'success':
					return 'Thank you';
					break;
				default:
					return '';
					break;
			}
		},
		image() {
			var self = this;
			var image = _.get(self.publicData, 'mainImage');
			if (!image || (!image._id && !image.length)) {
				return;
			}

			return image;
		},
		noImage() {
			return !this.image;
		},

		hideDisplayTitle() {
			var self = this;
			return self.publicData.hideDisplayTitle;
		},
		displayTitle() {
			var self = this;
			return self.publicData.title || self.item.title;
		},
		componentMode() {
			return this.item._type == 'component';
		},
		formMode() {
			return this.item.definition == 'form' || this.item.parentType == 'interaction';
		},
		showPreview() {
			// if(!this.formMode) {
			//     return this.$vuetify.breakpoint.lgAndUp;
			// }

			if (this.configureDefaults && !this.field) {
				return;
			}

			// if(!this.field) {
			return this.$vuetify.breakpoint.mdAndUp;
			// }

			// return !this.field || this.$vuetify.breakpoint.mdAndUp
		},
		formOptions() {
			if (!this.item) {
				return {};
			}

			return this.item.data || {};
		},

		identifier() {
			return this.formOptions.identifier;
		},

		allowAnonymous() {
			return this.formOptions.allowAnonymous || false;
		},

		disableDefaultFields() {
			return this.formOptions.disableDefaultFields || false;
		},
		requireDefaultContactFields() {
			return !this.allowAnonymous && !this.disableDefaultFields;
		},

		////////////////////////////////

		askFirstName() {
			return (
				this.requireDefaultContactFields || this.formOptions.askFirstName || this.formOptions.requireFirstName
			);
		},
		askLastName() {
			return this.requireDefaultContactFields || this.formOptions.askLastName || this.formOptions.requireLastName;
		},
		askGender() {
			return this.requireDefaultContactFields || this.formOptions.askGender || this.formOptions.requireGender;
		},
		askDOB() {
			return this.formOptions.askDOB || this.formOptions.requireDOB;
		},
		askEmail() {
			return this.formOptions.askEmail || this.requireEmail || this.requireDefaultContactFields;
		},
		askPhone() {
			return this.formOptions.askPhone || this.requirePhone || this.requireDefaultContactFields; // && this.identifier == 'either');
		},

		////////////////////////////////

		requireFirstName() {
			return this.formOptions.requireFirstName || this.requireDefaultContactFields;
		},
		requireLastName() {
			return this.formOptions.requireLastName || this.requireDefaultContactFields;
		},
		requireGender() {
			return this.formOptions.requireGender || this.requireDefaultContactFields;
		},
		requireDOB() {
			return this.formOptions.requireDOB;
		},
		requireEmail() {
			if (this.formOptions.requireEmail) {
				return true;
			}

			switch (this.identifier) {
				case 'both':
					return true;
					break;
				case 'email':
					return true;
					break;
				case 'either':
					return true;
					break;
			}
		},
		requirePhone() {
			if (this.formOptions.requirePhone) {
				return true;
			}

			switch (this.identifier) {
				case 'both':
					return true;
					break;
				case 'phone':
					return true;
					break;

				case 'either':
					return true;
					break;
			}
		},
		// hasPaymentFields() {
		//     var self = this;

		//     if(!self.formMode) {
		//         return;
		//     }

		//     if (self.item.parentType != 'interaction') {
		//         return;
		//     }

		//     //Check if we have the defaults turned off
		//     if (!self.item.paymentDetails) {
		//         return;
		//     }

		//     return (self.item.paymentDetails.required || self.item.paymentDetails.allow)

		// },
		// hasDefaultFields() {
		//     var self = this;

		//     if (self.item.parentType != 'interaction') {
		//         return;
		//     }

		//     //Check if we have the defaults turned off
		//     if (self.requireDefaultContactFields) {
		//         return true;
		//     }

		//     return self.askFirstName || self.askLastName || self.askGender || self.askDOB || self.askEmail || self.askPhone
		// },
		fauxDefinition() {
			var self = this;
			return Object.assign({}, self.item, { fields: self.model });
		},
		publicData() {
			var self = this;
			return self.item && self.item.data ? self.item.data.publicData : {};
		},
		paymentGateways() {
			var self = this;

			if (!self.publicData.paymentGateways || !self.publicData.paymentGateways.length) {
				return;
			}

			return self.publicData.paymentGateways;
		},
		paymentIntegration() {
			var self = this;

			// if (
			//     !self.publicData.paymentGateways ||
			//     !self.publicData.paymentGateways.length
			// ) {
			//     return;
			// }

			return _.first(self.paymentGateways);
		},
	},
	// watch:{
	//     'field.maximum':function() {

	//         var currentGUID = this.field.guid;

	//         this.$nextTick(function() {
	//             if(currentGUID == this.field.guid) {

	//             }
	//         })

	//     }
	// },
	methods: {
		toggleDataModel() {
			this.dataModelEnabled = !this.dataModelEnabled;
		},
		fieldPath() {},
		deselectAll() {
			var self = this;
			self.configurePayment = self.configureDefaults = self.field = null;
		},
		sorted($event) {
			var self = this;
			self.$emit('input', self.model);
		},
		// fieldsChanged() {
		//        console.log('Fields have been changed', this.model);
		//        // self.model = (self.model || []).slice();
		// },
		expandAll() {
			var self = this;

			_.each(self.allFields, function (field) {
				if (field.directive == 'embedded' || field.type == 'group') {
					self.$set(field, 'collapsed', false);
				}
			});
		},
		collapseAll() {
			var self = this;

			_.each(self.allFields, function (field) {
				if (field.directive == 'embedded' || field.type == 'group') {
					self.$set(field, 'collapsed', true);
				}
			});
		},
		stateChanged(value) {
			this.previewState = value;
		},
		deleteSelectedField() {
			var self = this;

			var selectedField = self.field;

			self.$fluro
				.confirm(`Delete Field`, `Are you sure you want to delete '${selectedField.title}'?`, {
					confirmColor: 'error',
					confirmText: 'Confirm Delete',
				})
				.then(function (res) {
					var { parent, index } = self.findSelectedParent();
					self.deleteField(self.field, parent);
				});
		},
		recursiveGUID(fields) {
			var self = this;

			_.each(fields, function (field) {
				if (!field.guid) {
					self.$set(field, 'guid', self.$fluro.utils.guid());
				}

				self.recursiveGUID(field.fields);
			});
		},
		showDefaultFieldOptions() {
			var self = this;
			self.field = null;
			self.configurePayment = false;
			self.configureDefaults = true;
		},
		showPaymentOptions() {
			var self = this;
			self.field = null;
			self.configureDefaults = false;
			self.configurePayment = true;
		},
		debugComponent(component) {
			this.debugField(component.field);
		},
		debugField(field) {
			// console.log('CLICKED FIELD', field)
			var self = this;

			//Find the field in our fields list
			var found = self.findField(field);
			if (!found || !found.parent) {
				console.log('NOT FOUND', field);
				return;
			}

			self.field = field;
		},
		toggleDefaultFields() {
			var self = this;
			self.item.data.allowAnonymous = true;
			// self.$set(self.item.data, 'disableDefaultFields', true);
		},
		deselectField() {
			var self = this;
			self.field = null;
		},

		resetPreview() {
			var self = this;

			self.resetting = true;
			setTimeout(function () {
				self.previewModel = {};
				self.resetting = false;
			}, 10);
		},

		getFieldTemplate(parentType) {
			var self = this;

			//////////////////////////////////

			return new Promise(function (resolve, reject) {
				var templateSet = FieldTemplates;

				switch (parentType) {
					case 'form':
					case 'interaction':
						break;
					default:
						if (self.componentMode) {
							templateSet = ComponentFieldTemplates;
						} else {
							templateSet = DefinitionTemplates;
						}
						break;
				}

				//////////////////////////////////

				self.$fluro
					.options(templateSet, 'Add a field')
					.then(function (selected) {
						var field = JSON.parse(JSON.stringify(selected.field));
						field.guid = self.$fluro.utils.guid();
						self.recursiveGUID(field.fields);
						resolve(field);
					})
					.catch(reject);
			});
		},
		getNewField(type) {
			var self = this;

			var field;

			switch (type) {
				case 'group':
					field = {
						title: '',
						key: '',
						type: 'group',
						fields: [],

						minimum: 1,
						maximum: 1,
						askCount: 1,
						asObject: false,
					};

					break;
				default:
					field = {
						title: '',
						key: '',
						type: 'string',
						directive: 'input',
						minimum: 0,
						maximum: 1,

						params: {},
						defaultValues: [],
						defaultReferences: [],
					};

					break;
			}

			//Add a unique ID
			field.guid = self.$fluro.utils.guid();

			return field;
		},
		addNewTypeTemplate(type) {
			var self = this;

			console.log('GET FOR TYPE', type);
			self.getFieldTemplate(type).then(function (field) {
				self.addNewField(null, field);
			});
		},
		addNewComponentTemplate() {
			var self = this;

			self.getFieldTemplate('component').then(function (field) {
				self.addNewField(null, field);
			});
		},
		addNewTemplate() {
			var self = this;

			self.getFieldTemplate('form').then(function (field) {
				self.addNewField(null, field);
			});
		},
		addNewField(type, newField) {
			var self = this;

			if (!newField) {
				newField = self.getNewField(type);
			}

			///////////////////////////////////////

			newField.isNew = true;

			//Just in case we switch to an embedded field
			newField.collapsed = false;
			if (!newField.fields) {
				newField.fields = [];
			}

			///////////////////////////////////////

			//If there is no field selected
			//we just add the field in at the end of the current form
			if (!self.field) {
				//If we have the form configuration bit selected
				if (self.configureDefaults) {
					//We want to add the field to the top of the list
					console.log('Add new field to top');
					self.model.unshift(newField);
				} else {
					//Add to the bottom of the list
					console.log('Add new field to bottom');
					self.model.push(newField);
				}

				self.field = newField;
				// self.$emit('input', self.model)
				return;
			}

			///////////////////////////////////////

			if (newField.directive == 'embedded' && self.field.directive == 'embedded') {
				//It's unlikely we want to embed an object inside another object
			} else {
				//Check if it's a container field
				if (self.field.type == 'group') {
					// if (self.field.type == 'group' || self.field.directive == 'embedded') {
					if (!self.field.fields) {
						self.$set(self.field, 'fields', []);
					}

					//Add the new field into this container
					console.log('Add new field in to group');
					self.field.fields.push(newField);
					//And select the field
					self.field = newField;
					// self.fieldsChanged();
					return;
				}
			}

			///////////////////////////////////////

			//Here we want to find where the current selected field is
			//so we can add it in underneath the current selected field
			// console.log('CHECK TO GET PARENT?')
			var { parent, index } = self.findSelectedParent();
			// console.log('GOT PARENT?', parent);

			if (!parent) {
				parent = self.model;
			}

			if (index == -1) {
				console.log('push into parent', parent);
				parent.push(newField);
			} else {
				console.log('splice into parent', parent);
				parent.splice(index + 1, 0, newField);
				// self.fieldsChanged();
				// parent.push(newField)
			}

			///////////////////////////////////////

			self.field = newField;
		},
		copyFieldPath(path, field, parent) {
			//Copy to clipboard
			if (this.$fluro.global.copyToClipBoard) {
				console.log('copy to clipboard please');
				this.$fluro.global.copyToClipBoard(path);
			} else {
				console.log('copyToClipBoard is not a function');
			}
		},
		injectField(field, parent) {
			var self = this;

			var newField = self.getNewField();

			if (!parent) {
				return console.log('no parent!');
				// if (field) {
				//  console.log('but there is a field')
				//    if(!field.fields) {
				//          field.fields = [];
				//          console.log('Create sub fields array as needed')
				//    }

				//    parent = field.fields;
				//    console.log('parent is now', parent)
				// } else {
				//        return console.log('Can not inject here!')
				// }
			}

			var index = parent.indexOf(field);

			// parent.push(newField);
			parent.splice(index + 1, 0, newField);
			self.field = newField;
			// self.fieldsChanged();
		},
		clicked(item) {
			// console.log('Select', item);
			var self = this;
			self.field = item;
		},

		mouseover(item) {
			// console.log('Select', item);
			var self = this;
			self.contextField = item;
		},
		mouseleave(item) {
			// console.log('Select', item);
			var self = this;
			if (self.contextField == item) {
				self.contextField = null;
			}
		},

		findSelectedParent() {
			var self = this;
			var needle = self.field;
			return self.findField(needle);
		},
		findField(needle) {
			var self = this;

			var parent;
			var index = -1;

			///////////////////////////////////////

			//If it's a top level
			var i = _.findIndex(self.model, { guid: needle.guid });
			if (i != -1) {
				return { parent: self.model, index: i };
			}

			///////////////////////////////////////

			//Loop through each route and recur
			_.each(self.model, recursiveFind);

			///////////////////////////////////////

			function recursiveFind(field) {
				//Check if this is the parent
				var i = _.findIndex(field.fields, { guid: needle.guid });

				//We found it
				if (i != -1) {
					index = i;
					//Mark the parent
					parent = field.fields;
				} else {
					//Check each child
					_.each(field.fields, recursiveFind);
				}
			}

			return { parent, index };
		},
		duplicateField(field, parent) {
			var self = this;
			// var parent = self.findFieldParent(field);
			if (!parent) {
				return;
			}

			var index = parent.indexOf(field);
			var copy = JSON.parse(JSON.stringify(field));
			// self.recursiveGUID(copy.fields);

			// console.log('NEW KEYS', field, copy)
			copy.guid = self.$fluro.utils.guid();
			copy.title = '';
			copy.key = '';
			parent.splice(index + 1, 0, copy);

			//Seld the first field
			self.field = copy;

			// //If it's not a folder then select this route
			// if (field.type != 'folder') {
			//     this.route = copy;
			// }
		},
		deleteField(field, parent) {
			var self = this;

			// //Deselect if we have it currently selected
			// if (self.field == field) {
			self.field = null;
			// }
			// console.log('PARENT', parent)
			// var parent = this.findFieldParent(field);

			if (!parent) {
				console.log('DELETE No parent', parent);
				return;
			}

			var index = parent.indexOf(field);
			parent.splice(index, 1);

			console.log('DELETE', self.model);
		},
	},
	data() {
		return {
			treeOptions: {
				animation: 1,
				group: 'fields',
				// disabled: !this.editable,
				ghostClass: 'ghost',
			},
			dataModelEnabled: false,
			previewState: 'ready',
			configurePayment: false,
			configureDefaults: false,
			model: Vue.observable(this.value),
			resetting: false,
			previewModel: {},
			field: null,
			contextField: null,
		};
	},
};
</script>
<style lang="scss" scoped>
.fluro-field-editor {
	min-height: 50vh;
}

.state-link {
	margin-left: 5px;
	display: inline-block;
	border-radius: 3px;
	padding: 0 5px;
	line-height: 16px;
	height: 16px;
	cursor: pointer;
	@extend .no-select !optional;
	letter-spacing: 0;
	text-transform: none;

	&:hover {
		background: rgba(#000, 0.1);
	}
}

.fields-tree {
	label {
		text-transform: uppercase;
		font-weight: 500;
		letter-spacing: 0.03em;
		font-size: 0.8em;
		margin-bottom: 5px;
	}

	min-width: 300px;
	// flex: none;
	// overflow: hidden;
	background: #eee;
	// border-right: 1px solid #ddd;
	@extend .no-select !optional;
}

.placeholder {
	background: #eee;
}

.pseudo-field {
	padding: 5px;
	border-radius: 3px;
	background: #fff;
	border: 1px solid rgba(#000, 0.1);
	margin: 0 0 4px;
	cursor: pointer;
	font-weight: 500;

	&.active {
		background: $primary;
		color: #fff;
	}
}

.default-field {
	border: 1px solid rgba(#000, 0.1);
	padding: 5px;
	margin-bottom: 2px;
	border-radius: 3px;
	background: #eee;
	font-weight: 500;
	cursor: pointer;

	&:hover {
		background: #fafafa;
	}
}

.palette-title {
	text-transform: uppercase;
	letter-spacing: 0.05em;
	font-weight: 500;
	padding: 8px;
	font-size: 10px;
	@extend .border-bottom !optional;
	background: #eee;
	color: rgba(#000, 0.5);
}

.model-preview {
	font-size: 0.8em;
	background: #eee;
	padding: 10px;
}

.mini-switch {
	border-radius: 100px;
	line-height: 10px;
	text-transform: uppercase;
	height: 19px;
	font-size: 9px;
	width: 50px;
	font-weight: 500;
	position: relative;
	line-height: 19px;
	overflow: hidden;
	background: #eee;
	border: 1px solid #ddd;
	color: #ddd;
	background: rgba(#000, 0.1);
	box-shadow: inset 0 1px 2px rgba(#000, 0.1);

	.on,
	.off {
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		text-align: center;
	}

	.on {
		transform: translateX(100%);
	}

	.off {
		transform: translateX(0);
	}

	&.active {
		background: none;
		box-shadow: none;
		color: #999;
		border: 1px solid #999;

		.on {
			transform: translateX(0);
		}

		.off {
			transform: translateX(100%);
		}
	}
}

.preview {
	order: 1;
	border-left: 3px solid #ddd;
	border-right: 3px solid #ddd;
	// border-left:4px solid #555;
	// border-right:4px solid #555;
	background: #fff;
	flex: 2;

	// .palette-title {
	// background: #555;
	// color: #eee;
	// }
}

.sidebar {
	min-width: 300px;
	max-width: 380px;
	flex: 1;
	background: #fafafa;
	// border-left: 1px solid #ddd;
	border-right: 1px solid #ddd;
	order: 0;
}

.field-options {
	order: 2;
	min-width: 380px;
	// flex: 1;
	background: #fafafa;
	// border-left: 1px solid #ddd;
}

.schema-mode {
	min-width: 40vw;

	.preview {
		order: 2;
	}

	.sidebar {
		order: 0;
	}

	.field-options {
		order: 1;
		min-width: 40vw;
	}
}
</style>
