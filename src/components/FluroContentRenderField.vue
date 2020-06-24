<template>
				<div class="fluro-content-render-field" v-if="ready">
								<template v-if="renderer == 'embedded' && raw">
												<template v-if="!multiple">
																<fluro-panel>
																				<fluro-panel-title class="border-bottom">
																								{{field.title}}
																				</fluro-panel-title>
																				<fluro-panel-body>
																								<fluro-content-render :raw="raw" :fields="fields" v-model="fieldModel" />
																				</fluro-panel-body>
																</fluro-panel>
												</template>
												<template v-if="multiple">
																<template v-for="(object, index) in fieldModel">
																				<fluro-panel>
																								<fluro-panel-title class="border-bottom">
																												<h5 title>{{groupTitle(object, index)}}</h5>
																								</fluro-panel-title>
																								<fluro-panel-body>
																												<fluro-content-render :raw="raw" :fields="fields" v-model="fieldModel[index]" />
																								</fluro-panel-body>
																				</fluro-panel>
																</template>
												</template>
								</template>
								<template v-else-if="renderer == 'group'">
												<template v-if="asObject">
																<template v-if="!multiple">
																				<fluro-content-render :raw="raw" :fields="fields" v-model="fieldModel" />
																</template>
																<template v-if="multiple">
																				<template v-for="(object, index) in fieldModel">
																								<v-card class="panel">
																												<div class="panel-title">
																																<h5 title>{{groupTitle(object, index)}}</h5>
																												</div>
																												<v-card-text class="panel-body">
																																<v-layout row wrap>
																																				<fluro-content-render :raw="raw" :fields="fields" v-model="fieldModel[index]" />
																																</v-layout>
																												</v-card-text>
																								</v-card>
																				</template>
																</template>
												</template>
												<template v-else>
																<template v-if="sameLine">
																				<v-layout row wrap>
																								<template v-for="subField in fields">
																												<fluro-content-render-field class="flex" :raw="raw" :field="subField" v-model="model" />
																								</template>
																				</v-layout>
																</template>
																<template v-else>
																				<!-- <v-layout row wrap> -->
																				<template v-for="subField in fields">
																								<fluro-content-render-field :raw="raw" :field="subField" v-model="model" />
																				</template>
																				<!-- </v-layout> -->
																</template>
												</template>
								</template>
								<template v-else>
												<template v-if="isEmpty">
												</template>
												<template v-else-if="type == 'reference'">
																<div class="field-group">
																				<label>{{label}}</label>
																				<template v-if="!multiple">
																								<list-group>
																												<list-group-item @click="$fluro.global.view(fieldModel, true)" :item="fieldModel">
																																<template v-slot:right>
																																				<v-btn class="ma-0" small icon @click.stop.prevent="$actions.open([fieldModel])">
																																								<fluro-icon icon="ellipsis-h" />
																																				</v-btn>
																																</template>
																												</list-group-item>
																								</list-group>
																								<!-- <fluro-list-item :item="fieldModel" :defaultActions="defaultActions(object)"></fluro-list-item> -->
																				</template>
																				<template v-if="multiple">
																								<list-group>
																												<list-group-item @click="$fluro.global.view(object, true)" :item="object" v-for="(object, index) in fieldModel">
																																<template v-slot:right>
																																				<v-btn class="ma-0" small icon @click.stop.prevent="$actions.open([object])">
																																								<fluro-icon icon="ellipsis-h" />
																																				</v-btn>
																																</template>
																												</list-group-item>
																								</list-group>
																								<!--  <template v-for="(object, index) in fieldModel">
																												<fluro-list-item :item="object" :defaultActions="defaultActions(object)"></fluro-list-item>
																								</template> -->
																				</template>
																</div>
												</template>
												<template v-else-if="renderer == 'wysiwyg'">
																<template v-if="multiple">
																				<div class="field-group">
																								<label>{{label}}</label>
																								<div v-for="(entry, key) in fieldModel" v-html="fieldModel[key]"></div>
																				</div>
																</template>
																<template v-if="!multiple">
																				<div class="field-group">
																								<label>{{label}}</label>
																								<!-- <pre>{{fieldModel}}</pre> -->
																								<div v-html="fieldModel"></div>
																				</div>
																</template>
												</template>
												<template v-else-if="renderer == 'custom'">
																<template v-if="multiple">
																				<div class="field-group">
																								<label>{{label}}</label>
																								<template v-for="(entry, key) in fieldModel">
																												<div v-html="entry"></div>
																								</template>
																				</div>
																</template>
																<template v-if="!multiple">
																				<div class="field-group">
																								<label>{{label}}</label>
																								<div v-html="fieldModel"></div>
																				</div>
																</template>
												</template>
												<template v-else-if="renderer == 'signature'">
																<template v-if="multiple">
																				<div class="field-group">
																								<label>{{label}}</label>
																								<template v-for="(entry, key) in fieldModel">
																												<img class="signature-image" :src="fieldModel">
																								</template>
																				</div>
																</template>
																<template v-if="!multiple">
																				<div class="field-group">
																								<label>{{label}}</label>
																								<img class="signature-image" :src="fieldModel">
																				</div>
																</template>
												</template>
												<template v-else-if="renderer == 'code'">
																<template v-if="multiple">
																				<div class="field-group">
																								<label>{{label}}</label>
																								<template v-for="(entry, key) in fieldModel">
																												<fluro-code-editor v-model="fieldModel[key]" :lang="syntax" :readonly="true" :height="200"></fluro-code-editor>
																								</template>
																				</div>
																</template>
																<template v-if="!multiple">
																				<div class="field-group">
																								<label>{{label}}</label>
																								<fluro-code-editor v-model="fieldModel" :lang="syntax" :readonly="true" :height="200"></fluro-code-editor>
																				</div>
																</template>
												</template>
												<template v-else-if="renderer == 'url'">
																<template v-if="multiple">
																				<div class="field-group">
																								<label>{{label}}</label>
																								<template v-for="(entry, key) in fieldModel">
																												<a target="_blank" :href="entry">{{entry}}</a>
																								</template>
																				</div>
																</template>
																<template v-if="!multiple">
																				<div class="field-group">
																								<label>{{label}}</label>
																								<a target="_blank" :href="fieldModel">{{fieldModel}}</a>
																				</div>
																</template>
												</template>
												<template v-else-if="renderer == 'email'">
																<template v-if="multiple">
																				<div class="field-group">
																								<label>{{label}}</label>
																								<template v-for="(entry, key) in fieldModel">
																												<a target="_blank" :href="`mailto:` + entry">{{entry}}</a>
																								</template>
																				</div>
																</template>
																<template v-if="!multiple">
																				<div class="field-group">
																								<label>{{label}}</label>
																								<a target="_blank" :href="`mailto:` + fieldModel">{{fieldModel}}</a>
																				</div>
																</template>
												</template>
												<template v-else>
																<template v-if="type == 'date'">
																				<template v-if="multiple">
																								<div class="field-group">
																												<label>{{label}}</label>
																												<div v-for="(entry, key) in fieldModel">
																																{{entry | formatDate('h:mma dddd D MMM YYYY')}}
																												</div>
																								</div>
																				</template>
																				<template v-else>
																								<div class="field-group">
																												<label>{{label}}</label>
																												<div>
																																{{fieldModel | formatDate('h:mma dddd D MMM YYYY')}}
																												</div>
																								</div>
																				</template>
																</template>
																<template v-else>
																				<template v-if="multiple">
																								<div class="field-group">
																												<label>{{label}}</label>
																												<div v-for="(entry, key) in fieldModel">
																																{{entry}}
																												</div>
																								</div>
																				</template>
																				<template v-else>
																								<div class="field-group">
																												<label>{{label}}</label>
																												<div>
																																{{fieldModel}}
																												</div>
																												<!-- <pre>{{label}} - has value</pre> -->
																								</div>
																				</template>
																</template>
												</template>
								</template>
				</div>
</template>
<script>
import _ from 'lodash';



import FluroCodeEditor from "src/components/form/FluroCodeEditor.vue";
import ListGroup from "src/components/ui/ListGroup.vue";
import ListGroupItem from "src/components/ui/ListGroupItem.vue";
// import FluroContentRender from "src/components/FluroContentRender.vue";
// import FluroContentRenderField from "src/components/FluroContentRenderField.vue";
import DynamicImportService from 'src/DynamicImportService.js';


////////////////////////////////////////////////////////

export default {
				name: 'fluro-content-render-field',
				components: {
								FluroCodeEditor,
								ListGroup,
								ListGroupItem,
								// FluroContentRender,
								// FluroContentRenderField,
				},
				beforeCreate() {
								var self = this;
								Promise.all([
																DynamicImportService.load('src/components/FluroContentRender.vue', function() {
																				return import('src/components/FluroContentRender.vue')
																}),
																DynamicImportService.load('src/components/FluroContentRenderField.vue', function() {
																				return import('src/components/FluroContentRenderField.vue')
																}),
												])
												.then(function(results) {
																self.$options.components.FluroContentRender = results[0];
																self.$options.components.FluroContentRenderField = results[1];
																self.ready = true;
												})
				},


				data() {
								return {
												ready: false,
												model: this.value,
								}
				},
				watch: {
								value(v) {
												this.model = v;
								}
				},
				computed: {
								className() {


												function replaceAll(target, search, replacement) {
																return target.split(search).join(replacement);
												}

												// if (this.compact) {
												// if (!this.field.className || !this.field.className.length) {
												// return 'xs6';
												// }
												// } else {
												if (!this.field.className || !this.field.className.length) {
																return 'xs12';
												}
												// }

												////////////////////////////////

												var classes = _.chain(this.field.className)
																.split(' ')
																.compact()
																.map(function(className) {
																				return replaceAll(replaceAll(className, 'col', ''), '-', '').toLowerCase();
																})
																.value();




												return classes;

								},
								sameLine() {
												return this.field.sameLine || this.field.className == 'row';
								},
								isEmpty() {

												var self = this;

												if (self.multiple) {
																return !self.fieldModel || !self.fieldModel.length
												} else {

																return !self.fieldModel;
												}
								},
								fieldModel: {
												get() {

																var self = this;
																var value = self.model[self.key];
																var stringValue = String(value).toLowerCase().trim();

																var isTotallyEmpty = (value === undefined || value === null || value == [] || stringValue == '');

																if (isTotallyEmpty) {
																				return;
																}

																/////////////////////////////////////////////////////

																//Here is where we clean up in case the data isn't correct
																if (self.maximum == 1) {
																				if (_.isArray(value) && value.length == 1) {
																								value = value[0];

																				}
																}

																//If it's a multiple value field
																if (self.maximum == 0) {
																				//but the saved value is just a string
																				if (_.isString(value)) {
																								//Return the string as an array with one value
																								value = [value]
																				}
																}
																/////////////////////////////////////////////////////


																switch (self.type) {
																				case 'number':
																								return Number(value);
																								break;
																				case 'integer':
																								return parseInt(value);
																								break;
																				case 'decimal':
																								return Number(parseFloat(value).toFixed(2));
																								break;
																				case 'float':
																								return parseFloat(value);
																								break;
																				case 'boolean':
																								switch (stringValue) {
																												case 'true':
																												case 'y':
																												case 'yes':
																												case '1':
																																return true;
																																break;
																												case 'false':
																												case 'n':
																												case 'no':
																												case '0':
																																return false;
																																break;
																												default:
																																return true;
																																break;
																								}
																								break;
																}

																return value;
												},
												set() {

												}
								},
								key() {
												return this.field.key;
								},
								label() {
												return this.field.title;
								},
								asObject() {
												return this.field.asObject;
								},
								fields() {
												return this.field.fields;
								},
								type() {
												return this.field.type;
								},
								multiple() {
												return this.maximum === 0 || this.maximum > 1;
								},
								minimum() {
												return Math.max(parseInt(this.field.minimum), 0);
								},
								maximum() {
												return parseInt(this.field.maximum);
								},
								total() {
												return _.get(this.fieldModel, 'length');
								},
								renderer() {

												//Get the widget defined on the data object
												var dataType = this.type;
												var directive = this.field.directive;


												switch (directive) {
																case 'date-select':
																				directive = 'datepicker';
																				break;

																case 'time-select':
																				directive = 'timepicker';
																				break;
																case 'datetime-select':
																				directive = 'datetimepicker';
																				break;
																case 'textarea':
																				directive = 'textarea';
																				break;
																default:
																				switch (dataType) {
																								case 'group':
																												directive = 'group';
																												break;
																								case 'email':
																												directive = 'email';
																												break;
																								case 'url':
																												directive = 'url';
																												break;
																								case 'boolean':
																												directive = 'checkbox';
																												break;
																								case 'number':
																								case 'integer':
																								case 'decimal':
																												directive = 'number';
																												break;
																				}
																				break;
												}


												//Return the basic data type by default
												return directive;
								},
								syntax() {
												return _.get(this, 'field.params.syntax');
								}
				},
				methods: {
								defaultActions(object) {

												if (!object) {
																return;
												}

												return true;

												switch (object._type) {
																case 'asset':
																case 'video':
																case 'image':
																case 'audio':
																				return true;
																				break;
												}
								},
								groupTitle(object, index) {
												if (object) {
																if (object.title && object.title.length) {
																				return object.title;
																}

																if (object.name && object.name.length) {
																				return object.name;
																}
												}

												return `${this.label} ${index+1}`
								},
				},
				created() {
								// if (this.multipleInput) {
								//     switch (this.type) {
								//         case 'reference':
								//             this.results = (this.defaultReferences || []).slice();
								//             break;
								//         default:
								//             this.results = (this.defaultValues || []).slice();
								//             break;
								//     }
								// }
				},
				props: {
								// 'compact': {
								//     type: Boolean,
								// },
								'raw': {
												type: Boolean,
								},
								'field': {
												type: Object,
								},
								'value': {
												required: true,
								}
				},
}

</script>
<style lang="scss">
.fluro-content-render-field {

				.signature-image {
								width: 100%;
								height: auto;
								border: 5px solid #eee;
				}

				.field-group {
								display: block;
								margin-bottom: 1.5em;

								label {
												display: block;
												font-weight: 700;
												margin-bottom: 0.3em;
												text-transform: uppercase;
												letter-spacing: 0.05em;
												font-size: 0.8em;
												// opacity:0.5;
								}
				}

				.panel {
								margin-bottom: 1em;
								border: 1px solid rgba(#000, 0.15) !important;
								border-radius: 4px;
								box-shadow: none !important;

								.panel-title {
												padding: 1em;
												background: rgba(#000, 0.03);
												border-bottom: 1px solid rgba(#000, 0.05);
								}
				}
}

</style>
