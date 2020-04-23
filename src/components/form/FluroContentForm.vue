<template>
				<div class="fluro-content-form" v-if="ready">
								<!-- <pre>{{fields}}</pre> -->
								<!-- <pre>{{model}}</pre> -->
								<slot name="form" :parent="formModel" :context="context" :form-fields="formFields" :field-hash="fieldHash" :model="model" :update="update" :options="options">
												<!-- 	<fluro-content-form-field :debugMode="debugMode" :contextField="contextField" :recursiveClick="recursiveClick" :disableDefaults="disableDefaults" :dynamic="dynamic" :context="context" :parent="formModel" :outline="showOutline" :form-fields="formFields" :options="options" :field="fields[0]" @input="update" v-model="model" />
												<fluro-content-form-field :debugMode="debugMode" :contextField="contextField" :recursiveClick="recursiveClick" :disableDefaults="disableDefaults" :dynamic="dynamic" :context="context" :parent="formModel" :outline="showOutline" :form-fields="formFields" :options="options" :field="fields[1]" @input="update" v-model="model" />
												<fluro-content-form-field :debugMode="debugMode" :contextField="contextField" :recursiveClick="recursiveClick" :disableDefaults="disableDefaults" :dynamic="dynamic" :context="context" :parent="formModel" :outline="showOutline" :form-fields="formFields" :options="options" :field="fields[2]" @input="update" v-model="model" />
												<fluro-content-form-field :debugMode="debugMode" :contextField="contextField" :recursiveClick="recursiveClick" :disableDefaults="disableDefaults" :dynamic="dynamic" :context="context" :parent="formModel" :outline="showOutline" :form-fields="formFields" :options="options" :field="fields[3]" @input="update" v-model="model" />
												 -->
												<v-container fluid class="grid-list-lg" pa-0 :key="`${field.guid}${field.key}`" v-for="(field, index) in fields">
																<fluro-content-form-field :debugMode="debugMode" :contextField="contextField" :recursiveClick="recursiveClick" :disableDefaults="disableDefaults" :dynamic="dynamic" :context="context" :parent="formModel" :outline="showOutline" :form-fields="formFields" :options="options" :field="fields[index]" @input="update" v-model="model" />
												</v-container>
								</slot>
				</div>
</template>
<script>
// import {VContainer}
// import FluroContentFormField from 'src/components/form/FluroContentFormField.vue ';
import _ from 'lodash';
import Vue from 'vue';
import DynamicImportService from 'src/DynamicImportService';
// import FluroUtils from 'fluro';



// //////////////////////////////////////////////////

// function getDefaultValueForField(field) {

//     var blankValue;
//     var multiple = field.maximum != 1;

//     //Check if it's a nested subgroup or embedded form
//     var nested = ((field.type == 'group' && field.asObject) || field.directive == 'embedded');

//     ///////////////////////////////////////

//     if (multiple) {
//         blankValue = [];
//     }

//     ///////////////////////////////////////

//     switch (field.type) {
//         case 'reference':
//             if (field.defaultReferences && field.defaultReferences.length) {
//                 if (multiple) {
//                     blankValue = blankValue.concat(field.defaultReferences);

//                 } else {
//                     blankValue = _.first(field.defaultReferences);
//                 }
//             }
//             break;
//         default:
//             if (field.defaultValues && field.defaultValues.length) {
//                 if (multiple) {
//                     blankValue = blankValue.concat(field.defaultValues);

//                 } else {
//                     blankValue = _.first(field.defaultValues);
//                 }
//             }
//             break;
//     }

//     ///////////////////////////////////////


//     if (multiple) {

//         var askCount = Math.max(field.askCount, field.minimum);
//         var additionalRequired = Math.max((askCount - blankValue.length), 0);

//         //If we need some entries by default
//         if (additionalRequired) {

//             switch (field.directive) {
//                 case 'wysiwyg':
//                 case 'textarea':
//                 case 'code':
//                     _.times(additionalRequired, function() {
//                         blankValue.push('');
//                     })
//                     break;
//                 default:
//                     //We need to add objects
//                     if (nested) {
//                         _.times(additionalRequired, function() {
//                             blankValue.push({});
//                         })
//                     }
//                     break;
//             }

//         }
//     } else {

//         if (!blankValue) {
//             switch (field.directive) {
//                 case 'wysiwyg':
//                 case 'textarea':
//                 case 'code':
//                     // case 'select':
//                     blankValue = '';
//                     break;
//                 default:
//                     //We need to add objects
//                     if (nested) {
//                         blankValue = {};
//                     }
//                     //  else {
//                     //     blankValue =  null;
//                     // }
//                     break;
//             }
//         }
//     }

//     ///////////////////////////////////////

//     return blankValue;
// }

//////////////////////////////////////////////////

var debouncer;

export default {
				name: 'fluro-content-form',
				props: {
								'contextField': {
												type: Object,
								},
								'recursiveClick': {
												type: Function,
								},
								'debugMode': {
												type: Boolean,
								},
								'debounce': {
												type: Number,
												default: 0,
								},
								//This stops the form from adding the default values
								//We use this so that we don't accidentally fill in fields
								//that have been cleared by the user (mainly for website builder)
								'disableDefaults': {
												type: Boolean,
												default: false,
								},
								'dynamic': {
												type: Boolean,
								},
								'context': {
												type: String,
												default () {
																//By default 
																return this.$fluro.global.defaultFormContext;
												},
								},
								'parent': {
												type: Object,
								},
								'fields': {
												type: Array,
								},
								'value': {
												type: Object,

								},
								'formFields': {
												default () {
																return [];
												},
												type: Array,
								},
								'options': {
												default: function() {
																return {}
												},
												type: Object,
								},
								'outline': {
												type: Boolean,
								}
				},
				computed: {
								fieldsOutput() {
												return this.fields;
								},
								formModel() {
												return this.parent || this.model;
								},
								showOutline() {
												return this.outline || this.options.outline;
								},
								errorMessages() {
												return _.chain(this.formFields)
																.filter(function(field) {



																				return field.errorMessages.length;
																})
																.map(function(field) {

																				// console.log('ERROR MESSAGES', field);
																				// console.log('ERROR MESSAGE', field);
																				return {
																								title: field.errorTitle,
																								messages: field.errorMessages,
																				}
																})
																.value();
								},
								fieldHash() {
												return _.reduce(this.fieldsOutput, function(set, field) {


																set[field.key] = field;
																return set;
												}, {})
								},
				},
				data() {
								return {
												ready: false,
												model: this.value,
								}
				},
				components: {
								// FluroContentFormField,
				},
				watch: {
								model(newModel, oldModel) {


												console.log('form model changed');
												this.$emit('input', this.model);



								},
								value(v) {



												//If the model has been changed
												if (this.model != v) {
																console.log('FORM MODEL IS NOW SOMETHING DIFFERENT VALUE', v);
																this.model = v
																this.reset();

												}

												// console.log('Form value set', val)
												// 		// var newModel = Object.assign({}, val) //input;
												// 		this.$set(this, 'model', val);
												// 		this.reset();
								},
								// fields(val) {
								// 				console.log('FIELDS CHANGED needs reset')
								// 				return this.reset();
								// },
								errorMessages(messages) {
												this.$emit('errorMessages', messages);
								}
				},
				beforeCreate: function() {

								var self = this;

								Promise.all([
																DynamicImportService.load('src/components/form/FluroContentForm.vue', function() {
																				return import('src/components/form/FluroContentForm.vue')
																}),
																DynamicImportService.load('src/components/form/FluroContentFormField.vue', function() {
																				return import('src/components/form/FluroContentFormField.vue')
																}),
												])
												.then(function(results) {

																// console.log('Set Components', results);
																self.$options.components.FluroContentForm = results[0];
																self.$options.components.FluroContentFormField = results[1];
																self.ready = true;
												})


								// Promise.all([
								// 								import('src/components/form/FluroContentForm.vue'),
								// 								import('src/components/form/FluroContentFormField.vue'),
								// 				])
								// 				.then(function(results) {
								// 								self.$options.components.FluroContentForm = results[0].default
								// 								self.$options.components.FluroContentFormField = results[1].default
								// 								self.ready = true;
								// 								//console.log('Imported Components Dynamically', results)
								// 				})
								// Promise.all([
								// 								DynamicImportService.load('src/components/form/FluroContentForm.vue', function() {
								// 												return import('src/components/form/FluroContentForm.vue')
								// 								}),
								// 								DynamicImportService.load('src/components/form/FluroContentFormField.vue', function() {
								// 												return import('src/components/form/FluroContentFormField.vue')
								// 								}),
								// 				])
								// 				.then(function(results) {

								// 								// console.log('Set Components', results);
								// self.$options.components.FluroContentForm = results[0];
								// self.$options.components.FluroContentFormField = results[1];
								// 								self.ready = true;
								// 				})

				},
				created() {
								console.log('Reset on creation!')
								this.reset();
				},
				methods: {
								touch() {
												_.each(this.formFields, function(component) {
																if (component.touch) {
																				component.touch();
																}
												})
								},
								reset() {
												var self = this;
												// console.log('Form reset() THIS SHOULD ONLY HAPPEN IF THE ORIGINAL PROP IS CHANGED')

												/////////////////////////////////////////////////

												//Reset the components too
												self.formFields.forEach(function(component) {
																component.reset();
												});


												return;



												/////////////////////////////////////////////////

												//For each field reset the model
												if (!self.disableDefaults) {
																(self.fieldsOutput || []).forEach(createDefaults);
												}





												// self.$nextTick(function() {
												self.$emit('default');
												// })

												/////////////////////////////////////////////////

												//Recursively create all the default keys for nested fields
												function createDefaults(field) {


																//Check if it's just a display group
																if (field.type == 'group' && !field.asObject) {
																				(field.fieldsOutput || []).forEach(createDefaults);
																				return;
																}


																// console.log('CREATE DEFAULTS FOR', field.title)
																var existingValue = _.get(self.model, field.key);

																//We already have a value in this field
																if (existingValue) {
																				// console.log('Has existing value', field.key, existingValue);
																				Vue.set(self.model, field.key, existingValue);
																				return;
																}

																// console.log('Create Defaults', self);
																var blankValue = self.$fluro.utils.getDefaultValueForField(field);

																if (field.type == 'date' && blankValue == 'now') {
																				blankValue = new Date();
																}



																console.log('Set Default value', field.key, blankValue);
																Vue.set(self.model, field.key, blankValue);



												}
								},


								update(input, valueThatWasChanged) {
												// console.log('form model changed from update callback');
												// this.$forceUpdate();

												// this.$emit('input', this.model);
												// console.log('form model changed');
												// this.$emit('input', this.model);
												// JSON.parse(JSON.stringify(this.model)));

								},

								// update: function(input, valueThatWasChanged) {

								//     var self = this;
								//     self.model = input;
								//     // console.log('Update -> model')

								//     //If there is already a debouncer
								//     if (debouncer) {
								//         //Stop it
								//         clearTimeout(debouncer);
								//     }

								//     if (!self.debounce) {
								//         console.log('')
								//         return self.$emit('input', this.model);
								//     }

								//     //Start a new debouncer
								//     debouncer = setTimeout(() => self.dispatch(), self.debounce);
								// },
								// dispatch() {

								// 				// console.log('Update -> dispatch')
								// 				this.$emit('input', this.model);
								// }
				}
}

</script>
<style scoped lang="scss">
.fluro-content-form {}

</style>
