<template>
	<flex-column style="width: 80vw">
		<flex-column-header>
			<v-container fluid pa-2 class="border-bottom">
				<v-layout align-center>
					<v-flex>
						<h5>
							{{ model.title }}
							<span class="muted">// Payment Modifier</span>
						</h5>
					</v-flex>
					<v-flex shrink v-if="options.cancelEnabled">
						<v-btn class="ma-0 mr-2" @click="dismiss()">Cancel</v-btn>
					</v-flex>
					<v-flex shrink>
						<v-btn color="primary" class="ma-0" @click="done()">Done</v-btn>
					</v-flex>
				</v-layout>
			</v-container>
		</flex-column-header>
		<flex-row>
			<flex-column-body>
				<v-container>
					<v-text-field
						:autofocus="true"
						label="Title"
						hint="The name of this modifier (displayed to the user when active)"
						v-model="model.title"
					/>
					<v-select
						label="Modifier"
						:items="operators"
						:hint="modifierDescription"
						v-model="model.operation"
					/>
					<v-input
						label="Value"
						hint="Either a value or an expression that returns a number in cents eg. '2000' or 'date.contacts.length'"
						:persistent-hint="true"
						class="no-flex"
					>
						<fluro-expression-editor v-model="model.expression" />
					</v-input>
					<br />
					<v-input
						label="Condition"
						hint="Specify a condition that must return 'truthy' for this payment modifier to be enabled."
						:persistent-hint="true"
						class="no-flex"
					>
						<!-- <fluro-help title="Payment Modifier Condition" body=""> -->
						<fluro-expression-editor v-model="model.condition" />
					</v-input>
				</v-container>
			</flex-column-body>
			<flex-column-body class="help">
				<v-container>
					<label>Expressions and Variables</label>
					<p class="help-block">
						You can use the variables described below within your value and condition fields.
					</p>
					<v-btn small href="https://support.fluro.io/kb/advanced-form-expressions-guide" target="_blank">
						Click here for more documentation
						<fluro-icon icon="external-link" right />
					</v-btn>
				</v-container>
				<modifier-accordion title="Logic Examples">
					<p>
						<code>data.age > 18 && date.gender == 'male'</code>
						<br />
						<span>
							Example of using the
							<strong>AND</strong> operator
							<strong>&&</strong>
						</span>
					</p>
					<p>
						<code>data.firstName == 'Frank' || data.firstName == 'Susan'</code>
						<br />
						<span>
							Example of using the
							<strong>OR</strong> operator
							<strong>||</strong>
						</span>
					</p>
					<p>
						<code>data.age >= 18 ? 'Allowed' : 'Not Allowed'</code>
						<br />
						<span>
							Example of using short hand
							<strong>if/else</strong>
						</span>
					</p>
				</modifier-accordion>

				<modifier-accordion title="Global Form Variables">
					<p>
						<code>calculatedTotal</code>
						<br />
						<span> The running total that is currently calculated (for chaining modifiers together) </span>
					</p>

					<p>
						<code>moment()</code>
						<br />
						<span> The MomentJS date library </span>
					</p>

					<p>
						<code>Date()</code>
						<br />
						<span> The default javascript Date utility </span>
					</p>

					<p>
						<code>Math()</code>
						<br />
						<span> The default javascript Math utility </span>
					</p>
				</modifier-accordion>

				<modifier-accordion :title="field.titles" v-for="field in availableFields">
					<p v-for="example in field.examples">
						<code v-tippy content="Click to copy" @click="$fluro.global.copyToClipBoard(example.path)"
							>{{ example.path }} <fluro-icon icon="copy"
						/></code>
						<br />
						<span>{{ example.description }}</span>
					</p>
				</modifier-accordion>
				<!-- <Div ng-repeat="field in availableFields">
                                        <div class="modifier-accordion" ng-class="{expanded:field.expanded}">
                                                <div class="modifier-accordion-title" ng-click="field.expanded = !field.expanded">
                                                        <i class="fa fa-angle-right pull-right" ng-class="{'fa-rotate-90':field.expanded}"></i>
                                                        <span ng-bind="::field.titles"></span>
                                                        <code>data.{{field.path}}</code>
                                                </div>
                                                <div class="modifier-accordion-body" ng-if="field.expanded">
                                                        <p ng-repeat="example in field.examples">
                                                                <code ng-bind="::example.path"></code><br />
                                                                <span ng-bind="::example.description"></span>
                                                        </p>
                                                </div>
                                        </div>
        </div>-->
			</flex-column-body>
		</flex-row>
	</flex-column>
</template>
<script>
import FluroHelp from '../../../FluroHelp.vue';
import FluroModalMixin from '../../../../mixins/ModalMixin.js';
import FluroExpressionEditor from '../../../form/FluroExpressionEditor.vue';
import PaymentModifierAccordionPanel from './PaymentModifierAccordionPanel.vue';

export default {
	components: {
		FluroHelp,
		FluroExpressionEditor,
		'modifier-accordion': PaymentModifierAccordionPanel,
	},
	props: {
		options: {
			type: Object,
		},
	},
	computed: {
		form() {
			return this.options.form;
		},
		availableFields() {
			var self = this;

			function extractFieldsFromDefinitionFields(fields, indexIterator, includeExamples) {
				if (!indexIterator) {
					indexIterator = 'i';
				}

				function getFlattenedFields(array, trail, titles) {
					return _.chain(array)
						.map(function (field, key) {
							var returnValue = [];
							/////////////////////////////////////////

							//If there are sub fields
							if (field.fields && field.fields.length) {
								if (field.asObject || field.directive == 'embedded') {
									//Push the field itself
									trail.push(field.key);
									titles.push(field.title);

									field.trail = trail.slice();
									field.titles = titles.slice();

									trail.pop();
									titles.pop();
									returnValue.push(field);

									///////////////////////////////

									//Prepend the key to all lowed fields
									if (field.maximum != 1) {
										trail.push(field.key + '[' + indexIterator + ']');
										titles.push(field.title);
									} else {
										trail.push(field.key);
										titles.push(field.title);
									}
								}

								// console.log('Go down', field.key);
								var fields = getFlattenedFields(field.fields, trail, titles);

								if (field.asObject || field.directive == 'embedded') {
									trail.pop();
									titles.pop();
								}
								//console.log('Go back up')
								returnValue.push(fields);
							} else {
								/////////////////////////////////////////

								//Push the field key
								trail.push(field.key);
								titles.push(field.title);

								field.trail = trail.slice();
								field.titles = titles.slice();
								trail.pop();
								titles.pop();
								returnValue.push(field);
							}
							/////////////////////////////////////////

							return returnValue;
						})
						.flattenDeep()
						.value();
				}

				// //Get all the flattened fields
				var flattened = getFlattenedFields(fields, [], []);

				var mapped = _.chain(flattened).map(formatField).compact().value();

				/////////////////////////////////////////////////

				if (includeExamples) {
					return _.map(mapped, addExamples);
				} else {
					return mapped;
				}

				/////////////////////////////////////////////////

				var cutOff = 20;

				/////////////////////////////////////////////////

				function formatField(field, index) {
					if (field.type == 'void') {
						return;
					}

					var isArray = field.maximum != 1;
					var firstTen = [];
					var fieldPath = field.trail.join('.');

					/////////////////////////////////////////////////

					//Create the indents
					var indents = [];
					_.times(field.trail.length - 1, function (n) {
						indents.push('--');
					});

					//Indent the title
					var indentedTitle = indents.join('-') + ' ' + field.title;

					if (isArray) {
						//Add (Multiple to the end of the title)
						indentedTitle = indentedTitle + ' (Multiple)';
					}

					/////////////////////////////////////////////////

					//And it has options
					if (field.options && field.options.length) {
						firstTen = field.options.slice(0, cutOff);
					} else if (field.allowedValues && field.allowedValues.length) {
						firstTen = _.map(field.allowedValues.slice(0, cutOff), function (entry) {
							if (entry) {
								return {
									name: entry,
									value: entry,
								};
							}
						});
					} else if (field.defaultValues && field.defaultValues.length) {
						firstTen = _.map(field.defaultValues.slice(0, cutOff), function (entry) {
							if (entry) {
								return {
									name: entry,
									value: entry,
								};
							}
						});
					}

					var delimiter = '[' + indexIterator + ']';
					var delimiterIndex = fieldPath.lastIndexOf(delimiter);

					//Check if this field is a child of a lower level multi group
					if (delimiterIndex != -1) {
						var parentPath = fieldPath.slice(0, delimiterIndex);
						var childPath = fieldPath.slice(delimiterIndex + delimiter.length + 1);
					}

					/////////////////////////////////////////////////

					return {
						title: field.title,
						indentedTitle: indentedTitle,
						key: field.key,
						parentTitle: field.titles[field.titles.length - 2],
						parentPath: parentPath,
						childPath: childPath,
						path: fieldPath,
						type: field.type,
						isArray: isArray,
						titles: field.titles.join(' > '),
						options: field.options,
						firstTen: _.compact(firstTen),
					};
				}

				/////////////////////////////////////////////////

				function addExamples(field) {
					var exampleValue;
					var exampleTitle;
					var fieldPath = field.path;
					var firstTen = field.firstTen;
					var isArray = field.isArray;

					/////////////////////////////////////////////////////////////

					var minimum = field.minimum;
					var maximum = field.maximum || field.firstTen.length || 5;

					/////////////////////////////////////////////////

					switch (field.type) {
						case 'integer':
							exampleTitle = exampleValue = 12;
							break;
						case 'float':
							exampleTitle = exampleValue = 3.56;
							break;
						case 'number':
							exampleTitle = exampleValue = 15;
							break;
						case 'boolean':
							exampleTitle = exampleValue = 'true';
							break;
						case 'email':
							exampleTitle = exampleValue = "'example@fluro.io'";
							break;
						case 'url':
							exampleTitle = exampleValue = "'https://www.fluro.io'";
							break;
						case 'date':
							exampleTitle = 'Date';
							exampleValue = new Date().getTime();
							break;
						case 'string':
							if (isArray) {
								if (firstTen.length) {
									exampleTitle = exampleValue =
										'[' +
										_.chain(firstTen.slice(0, maximum || 3))
											.compact()
											.map(function (entry) {
												return '"' + entry.value + '"';
											})
											.value()
											.join(', ') +
										']';
								} else {
									exampleTitle = exampleValue = "['Michael', 'Susan', 'Jerry']";
								}
							} else {
								if (firstTen.length) {
									console.log('FIRST TEN', firstTen);
									exampleTitle = _.first(firstTen).name;
									exampleValue = "'" + _.first(firstTen).value + "'";
								} else {
									exampleTitle = exampleValue = "'Michael'";
								}
							}
							break;
						case 'reference':
							if (isArray) {
								exampleTitle = exampleValue = '[Object, Object, Object]';
							} else {
								exampleTitle = exampleValue = '(Object)';
							}
							break;
					}

					/////////////////////////////////////////////////////////////

					var examples = [];

					/////////////////////////////////////////////////////////////

					//Check if this field is a child of a lower level multi group
					if (field.childPath) {
						if (!firstTen.length) {
							examples.push({
								path:
									'matchInArray(data.' +
									field.parentPath +
									", '" +
									field.childPath +
									"', " +
									exampleValue +
									').length',
								description:
									"Returns the total number of  '" +
									field.parentTitle +
									"' values where '" +
									field.title +
									"' is equal to '" +
									exampleTitle +
									"'",
							});
						}

						if (isArray) {
							examples.push({
								path:
									'matchInArray(data.' +
									field.parentPath +
									", '" +
									field.childPath +
									".length', 3).length",
								description:
									"Returns the total number of  '" +
									field.parentTitle +
									"' values where '" +
									field.title +
									"' has selected exactly 3 values",
							});

							examples.push({
								path:
									'matchInArray(data.' +
									field.parentPath +
									", '" +
									field.childPath +
									".length', 3, '>=').length",
								description:
									"Returns the total number of  '" +
									field.parentTitle +
									"' values where '" +
									field.title +
									"' has selected at least 3 values",
							});
						}

						_.each(firstTen, function (entry) {
							if (isArray) {
								examples.push({
									path:
										'matchInArray(data.' +
										field.parentPath +
										", '" +
										field.childPath +
										"', '" +
										entry.value +
										"', 'in').length",
									description:
										"Returns the total number of  '" +
										field.parentTitle +
										"' values where '" +
										field.title +
										"' has '" +
										entry.name +
										"' selected as one of it's values",
								});
							} else {
								examples.push({
									path:
										'matchInArray(data.' +
										field.parentPath +
										", '" +
										field.childPath +
										"', '" +
										entry.value +
										"').length",
									description:
										"Returns the total number of  '" +
										field.parentTitle +
										"' values where '" +
										field.title +
										"' is equal to '" +
										entry.name +
										"'",
								});
							}
						});
					} else {
						/////////////////////////////////////////////////////////////

						if (field.isArray) {
							examples.push({
								path: 'data.' + fieldPath + '',
								description: `The literal value of '${field.title}' eg.['${exampleValue}']`,
							});

							examples.push({
								path: 'data.' + fieldPath + '.length',
								description: "The number of '" + field.title + "' values",
							});

							examples.push({
								path: 'data.' + fieldPath + '.length > 4',
								description:
									"Returns true if the number of '" + field.title + "' values is greater than 4",
							});

							//Get the first 10 possible options
							_.each(firstTen, function (option) {
								examples.push({
									path: 'data.' + fieldPath + ".includes('" + option.value + "')",
									description: "Returns true if  '" + option.name + "' is included in the selection",
								});
							});
						} else {
							examples.push({
								path: 'data.' + fieldPath + '',
								description: `The literal value of '${field.title}' eg. '${exampleValue}'`,
							});

							//Get the first 10 possible options
							_.each(firstTen, function (option) {
								examples.push({
									path: 'data.' + fieldPath + " == '" + option.value + "'",
									description: "Returns true if  '" + option.name + "' has been selected",
								});
							});

							switch (field.type) {
								case 'date':
									examples.push({
										path: `new Date(data.${fieldPath}) <= Date.now()`,
										description: `If '${field.title}' is date in the past`,
									});

									examples.push({
										path: `new Date(data.${fieldPath}) > Date.now()`,
										description: `If '${field.title}' is date in the future`,
									});
									break;

								case 'boolean':
									examples.push({
										path: 'data.' + fieldPath + ' == ' + exampleValue,
										description: "If '" + field.title + "' is equal to " + exampleValue,
									});

									examples.push({
										path: 'data.' + fieldPath + ' != ' + exampleValue,
										description: "If '" + field.title + "' is not equal to " + exampleValue,
									});
									break;

								case 'string':
									if (!firstTen.length) {
										examples.push({
											path: 'data.' + fieldPath + ' == ' + exampleValue,
											description: "If '" + field.title + "' is equal to " + exampleValue,
										});

										examples.push({
											path:
												'data.' +
												fieldPath +
												' && data.' +
												fieldPath +
												'.toUpperCase() == ' +
												String(exampleValue).toUpperCase(),
											description:
												"If '" +
												field.title +
												"' converted to uppercase is equal to " +
												String(exampleValue).toUpperCase(),
										});

										if (field.directive == 'wysiwyg' || field.directive == 'textarea') {
											examples.push({
												path: 'data.' + fieldPath + '.length > 200',
												description: 'If text is more than 200 letters',
											});
										}
									}
									break;
								case 'number':
								case 'integer':
								case 'float':
									examples.push({
										path: 'data.' + fieldPath + ' == ' + exampleValue,
										description: "If '" + field.title + "' is equal to " + exampleValue,
									});

									examples.push({
										path: 'data.' + fieldPath + ' != ' + exampleValue,
										description: "If '" + field.title + "' is not equal to " + exampleValue,
									});

									examples.push({
										path: 'data.' + fieldPath + ' > ' + exampleValue,
										description: "If '" + field.title + "' is greater than " + exampleValue,
									});

									examples.push({
										path: 'data.' + fieldPath + ' >= ' + exampleValue,
										description:
											"If '" + field.title + "' is greater than or equal to " + exampleValue,
									});

									examples.push({
										path: 'data.' + fieldPath + ' < ' + exampleValue,
										description: "If '" + field.title + "' is less than " + exampleValue,
									});

									examples.push({
										path: 'data.' + fieldPath + ' <= ' + exampleValue,
										description:
											"If '" + field.title + "' is less than or equal to " + exampleValue,
									});
									break;
							}
						}
					}

					/////////////////////////////////////////////////////////////

					field.examples = examples;
					field.exampleValue = exampleValue;

					/////////////////////////////////////////////////////////////

					return field;
				}
			}

			return extractFieldsFromDefinitionFields(self.form.fields, '0', true);
		},

		modifierDescription() {
			switch (this.model.operation) {
				case 'add':
					return 'The value returned will be added to the calculated total';
					break;
				case 'subtract':
					return 'The value returned will be subtracted from the calculated total';
					break;
				case 'multiply':
					return 'The calculated total will be multipled by the value returned';
					break;
				case 'divide':
					return 'The calculated total will be divided by the value returned';
					break;
				case 'set':
					return 'The calculated total will be set to match the value returned';
					break;
			}
		},
		operators() {
			var array = [];

			array.push({
				value: 'add',
				text: 'Add',
			});

			array.push({
				value: 'subtract',
				text: 'Subtract',
			});

			array.push({
				value: 'multiply',
				text: 'Multiply',
			});

			array.push({
				value: 'divide',
				text: 'Divide',
			});

			array.push({
				value: 'set',
				text: 'Set to',
			});

			return array;
		},
		model() {
			return this.options.item;
		},
	},
	methods: {
		done() {
			this.close(this.model);
		},
	},
	mixins: [FluroModalMixin],
};
</script>
<style lang="scss">
.help {
	background: #eee;
	border-left: 1px solid rgba(#000, 0.05);
}
</style>
