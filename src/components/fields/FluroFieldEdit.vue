<template>
				<flex-column>
								<!-- <flex-column-header> -->
								<!-- <pre>{{model.guid}}</pre> -->
								<!-- </flex-column-header> -->
								<tabset v-model="tabIndex" v-if="model.type == 'group'">
												<tab heading="Group Settings">
																<flex-column-body>
																				<v-container>
																								<fluro-content-form-field ref="grouptitle" :field="fields.title" v-model="model" />
																								<div v-show="showKey">
																												<fluro-content-form-field :field="fields.key" v-model="model" />
																								</div>
																								<div class="key-preview" v-if="!editingKey" @click="editingKey = true">
																												<fluro-icon icon="pencil" /> key: {{model.key}}
																								</div>
																								<fluro-content-form-field :field="fields.asObject" v-model="model" />
																								<template v-if="!model.asObject">
																												<fluro-content-form-field :field="fields.sameLine" v-model="model" />
																								</template>
																								<!-- <pre>{{model}}</pre> -->
																								<v-layout v-if="model.asObject">
																												<v-flex xs6>
																																<fluro-content-form-field :field="fields.groupMinimum" v-model="model" />
																												</v-flex>
																												<v-spacer />
																												<v-flex xs6>
																																<fluro-content-form-field @input="resetRequired(fields.groupMaximum)" :field="fields.groupMaximum" v-model="model" />
																												</v-flex>
																												<v-spacer />
																												<v-flex xs6>
																																<fluro-content-form-field :field="fields.askCount" v-model="model" />
																												</v-flex>
																								</v-layout>
																								<fluro-content-form-field :field="fields.className" v-model="model" />
																								<!-- <pre>{{model}}</pre> -->
																				</v-container>
																</flex-column-body>
																<!-- <flex-column-footer class="border-top">
                    <v-container py-2>
                        <v-layout>
                            <v-spacer />
                            <v-flex>
                                <v-btn @click="deleteField" block class="ma-0" small>
                                    Delete Group
                                    <fluro-icon right icon="trash-alt" />
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </flex-column-footer> -->
												</tab>
												<tab heading="Expressions">
																<flex-column-body>
																				<v-container class="border-bottom" style="background: #fff;">
																								<label><strong>Expressions and Logic</strong></label>
																								<div class="sm muted">Expressions are short pieces of javascript that can be used to alter the properties of this field depending on changes made in other fields</div>
																								<v-btn class="ml-0" small href="https://support.fluro.io/kb/advanced-form-expressions-guide" target="_blank">
																												Click here for more information
																												<fluro-icon icon="external-link" right />
																								</v-btn>
																				</v-container>
																				<v-container class="border-bottom" style="background: #fff;">
																								<label><strong>Variables</strong></label>
																								<v-layout>
																												<v-flex xs3><strong>data</strong></v-flex>
																												<v-flex xs9 class="sm muted">The root level model for the entire form, useful for absolute paths.</v-flex>
																								</v-layout>
																								<v-layout>
																												<v-flex xs3><strong>model</strong></v-flex>
																												<v-flex xs9 class="sm muted">The immediate model this field is attached to. Useful for relative paths</v-flex>
																								</v-layout>
																				</v-container>
																				<v-container>
																								<!-- <template v-if="model.hideExpression && model.hideExpression.length"> -->
																								<!-- <template v-if="true"> -->
																								<div class="expression-group" :class="{active:model.expressions.show}">
																												<v-input label="Show group if" hint="Show this group only if this expression returns true " :persistent-hint="true" class="no-flex">
																																<v-layout>
																																				<v-flex>
																																								<fluro-expression-editor v-model="model.expressions.show" />
																																				</v-flex>
																																				<v-flex shrink>
																																								<v-menu :left="true" v-model="popup.show" :top="true" :close-on-content-click="false" transition="slide-y-transition" offset-y>
																																												<template v-slot:activator="{ on }">
																																																<v-btn icon small class="ma-0 ml-1" v-on="on">
																																																				<fluro-icon icon="bullseye" />
																																																</v-btn>
																																												</template>
																																												<div>
																																																<expression-field-select :context="model" @click="injectExpression($event, 'show')" v-model="expressionFields" />
																																												</div>
																																								</v-menu>
																																				</v-flex>
																																</v-layout>
																												</v-input>
																								</div>
																								<div class="expression-group" :class="{active:model.hideExpression}">
																												<v-input label="Hide group if" hint="Hide this group if this expression returns true " :persistent-hint="true" class="no-flex">
																																<v-layout>
																																				<v-flex>
																																								<fluro-expression-editor v-model="model.hideExpression" />
																																				</v-flex>
																																				<v-flex shrink>
																																								<v-menu :left="true" v-model="popup.hideExpression" :top="true" :close-on-content-click="false" transition="slide-y-transition" offset-y>
																																												<template v-slot:activator="{ on }">
																																																<v-btn icon small class="ma-0 ml-1" v-on="on">
																																																				<fluro-icon icon="bullseye" />
																																																</v-btn>
																																												</template>
																																												<div>
																																																<expression-field-select :context="model" @click="injectExpression($event, 'hideExpression')" v-model="expressionFields" />
																																												</div>
																																								</v-menu>
																																				</v-flex>
																																</v-layout>
																												</v-input>
																								</div>
																								<!--  </template>
                        <template v-else> -->
																								<!-- <div class="expression-group" :class="{active:model.expressions.hide}">
                                <v-input label="Hide field if" hint="Hide this group if this expression returns true " :persistent-hint="true" class="no-flex">
                                    <v-layout>
                                        <v-flex>
                                            <fluro-expression-editor v-model="model.expressions.hide" />
                                        </v-flex>
                                        <v-flex shrink>
                                            <v-menu :left="true" v-model="popup.hide" :top="true" :close-on-content-click="false" transition="slide-y-transition" offset-y>
                                                <template v-slot:activator="{ on }">
                                                    <v-btn icon small class="ma-0 ml-1" v-on="on">
                                                        <fluro-icon icon="bullseye" />
                                                    </v-btn>
                                                </template>
                                                <div>
                                                    <expression-field-select :context="model" @click="injectExpression($event, 'hide')" v-model="expressionFields" />
                                                </div>
                                            </v-menu>
                                        </v-flex>
                                    </v-layout>
                                </v-input>
                            </div> -->
																								<!-- </template> -->
																								<!-- <pre>{{model}}</pre> -->
																				</v-container>
																</flex-column-body>
												</tab>
								</tabset>
								<tabset v-else v-model="tabIndex">
												<tab heading="Field Settings">
																<flex-column-body ref="scrollbox">
																				<v-container>
																								<!-- <v-layout row wrap> -->
																								<!-- <v-flex xs12> -->
																								<fluro-content-form-field ref="title" :field="fields.title" v-model="model" />
																								<!-- </v-flex> -->
																								<!-- <v-spacer/> -->
																								<!-- <v-flex xs12> -->
																								<!-- <fluro-inline-edit :enabled="showKey">
                            <template v-slot:default>
                                <div class="key-name fade" v-if="!editingKey" @click="editingKey = true">
                                    
                                    (Key: {{model.key}})
                                    
                                </div>
                            </template>
                            <template v-slot:edit="{props, blur, focus}">
                                <div class="key-name">
                                    
                                    <input class="input-block" @focus="focus($event)" v-model="model.key" @keyup.enter="blur" @blur="blur" />
                                    
                                </div>
                            </template>
                        </fluro-inline-edit> -->
																								<!-- <div class="key" v-show="showKey"> -->
																								<div v-show="showKey">
																												<fluro-content-form-field :field="fields.key" v-model="model" />
																								</div>
																								<div class="key-preview" v-if="!editingKey" @click="editingKey = true">
																												<fluro-icon icon="pencil" /> key: {{model.key}}
																								</div>
																								<!-- </v-flex> -->
																								<!-- </v-layout> -->
																								<!-- </div> -->
																								<!-- <div class="show-key" @click="showKey = !showKey"> -->
																								<!-- <strong>Key:</strong>{{model.key}} -->
																								<!-- </div> -->
																								<fluro-content-form-field :field="fields.type" v-model="model" />
																								<fluro-content-form-field v-if="model.type == 'reference'" :field="fields.referenceType" v-model="model.params" />
																								<fluro-content-form-field :field="fields.directive" v-model="model" />
																								<fluro-content-form-field v-if="model.directive == 'currency'" :field="fields.currency" v-model="model.params" />
																								<v-container class="grid-list-xl" pa-0 fluid v-if="model.type != 'void'">
																												<v-layout>
																																<v-flex xs6>
																																				<fluro-content-form-field :field="fields.minimum" v-model="model" />
																																</v-flex>
																																<v-spacer />
																																<v-flex xs6>
																																				<fluro-content-form-field :field="fields.maximum" @input="resetRequired(fields.maximum)" v-model="model" />
																																</v-flex>
																																<template v-if="model.directive == 'embedded'">
																																				<v-spacer />
																																				<v-flex xs6>
																																								<fluro-content-form-field :field="fields.askCount" v-model="model" />
																																				</v-flex>
																																</template>
																												</v-layout>
																								</v-container>
																								<v-container class="grid-list-xl" pa-0 fluid v-if="isNumeric">
																												<v-layout>
																																<v-flex xs6>
																																				<fluro-content-form-field :field="fields.minValue" v-model="model.params" />
																																</v-flex>
																																<v-spacer />
																																<v-flex xs6>
																																				<fluro-content-form-field :field="fields.maxValue" v-model="model.params" />
																																</v-flex>
																												</v-layout>
																								</v-container>
																								<v-container class="grid-list-xl" pa-0 fluid v-if="isDate">
																												<v-layout>
																																<v-flex xs6>
																																				<fluro-content-form-field :field="fields.minDate" v-model="model.params" />
																																</v-flex>
																																<v-spacer />
																																<v-flex xs6>
																																				<fluro-content-form-field :field="fields.maxDate" v-model="model.params" />
																																</v-flex>
																												</v-layout>
																								</v-container>
																								<fluro-content-form-field v-if="showDescription" :field="fields.description" v-model="model" />
																								<fluro-content-form-field v-if="showPlaceholder" :field="fields.placeholder" v-model="model" />
																								<template v-if="model.directive == 'code'">
																												<fluro-content-form-field :field="fields.syntax" v-model="model.params" />
																												<!-- <fluro-content-form-field :field="fields." v-model="model" /> -->
																								</template>
																								<template v-if="model.directive == 'custom'">
																												<fluro-content-form-field :field="fields.template" v-model="model" />
																								</template>
																								<template v-else>
																												<template v-if="requiresOptions">
																																<template v-if="!advancedOptions">
																																				<fluro-content-form-field :field="fields.allowedValues" v-model="model" />
																																				<div class="sm muted" @click="showAdvancedOptions = true">Show advanced labelling options</div>
																																</template>
																																<template v-else>
																																				<v-input label="Selectable Options" class="no-flex">
																																								<options-manager v-model="model.options" />
																																				</v-input>
																																</template>
																												</template>
																												<template v-if="model.directive != 'embedded'">
																																<template v-if="model.type == 'reference'">
																																				<fluro-content-form-field :field="fields.allowedReferences" v-model="model" />
																																				<fluro-content-form-field @input="resetRequired(fields.defaultReferences)" :field="fields.defaultReferences" v-model="model" />
																																</template>
																																<template v-else>
																																				<!-- <pre>{{model.defaultValues}}</pre> -->
																																				<template v-if="model.directive == 'wysiwyg'">
																																								<fluro-content-form-field @input="resetRequired(fields.wysiwygDefaultValues)" :field="fields.wysiwygDefaultValues" v-model="model" />
																																				</template>
																																				<template v-else-if="model.directive == 'code'">
																																								<fluro-content-form-field @input="resetRequired(fields.codeDefaultValues)" :field="fields.codeDefaultValues" v-model="model" />
																																				</template>
																																				<template v-else>
																																								<fluro-content-form-field @input="resetRequired(fields.defaultValues)" :field="fields.defaultValues" v-model="model" />
																																				</template>
																																</template>
																												</template>
																												<fluro-panel v-if="model.directive == 'embedded' && restrictType == 'contact'">
																																<fluro-panel-title>
																																				<strong>{{restrictType | definitionTitle}} Options</strong>
																																</fluro-panel-title>
																																<fluro-panel-body>
																																				<!-- <pre>TEST: {{model.directive == 'embedded'}}</pre> -->
																																				<fluro-content-form-field :field="fields.targetRealms" v-model="model.params" />
																																				<v-input class="no-flex">
																																								<v-label>Add fields from Detail Sheets</v-label>
																																								<div class="sm muted">Add other pre-defined fields to this contact</div>
																																								<v-btn class="ma-0" :loading="loadingFields" @click="selectDetailSheetFields">Select Fields</v-btn>
																																				</v-input>
																																				<fluro-content-form-field :field="fields.targetHouseholdRole" v-model="model.params" />
																																				<fluro-content-form-field :field="fields.targetDefinition" v-model="model.params" />
																																				<fluro-content-form-field :field="fields.targetTeams" v-model="model.params" />
																																				<fluro-content-form-field :field="fields.targetProcesses" v-model="model.params" />
																																				<fluro-content-form-field :field="fields.targetTags" v-model="model.params" />
																																				<fluro-content-form-field :field="fields.targetCapabilities" v-model="model.params" />
																																				<fluro-content-form-field :field="fields.targetReactions" v-model="model.params" />
																																</fluro-panel-body>
																												</fluro-panel>
																												<fluro-panel v-if="model.directive == 'embedded' && restrictType == 'contact'">
																																<fluro-panel-title>
																																				<strong>Ticketing</strong>
																																</fluro-panel-title>
																																<fluro-panel-body>
																																				<fluro-content-form v-model="model.params.ticketing" :fields="ticketingFields">
																																								<template v-slot:form="{formFields, fieldHash, model, update, options}">
																																												<fluro-content-form-field :field="fieldHash.enabled" v-model="model" />
																																												<template v-if="ticketingEnabled">
																																																<component ref="ticketingManager" :is="ticketingManager" :field="field" v-model="model.events" v-if="ticketingManager" />
																																												</template>
																																												<!-- <ticketing-manager v-model="model.events"/> -->
																																												<!-- <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.allowAnonymous" v-model="model" />
                                            <template v-if="!model.allowAnonymous && !model.disableDefaultFields">
                                                <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.identifier" v-model="model" />
                                            </template> -->
																																								</template>
																																				</fluro-content-form>
																																				<!-- <fluro-content-form-field :field="fields.targetReactions" v-model="model.params.ticketing" /> -->
																																</fluro-panel-body>
																												</fluro-panel>
																												<fluro-content-form-field :field="fields.errorMessage" v-model="model" />
																												<fluro-content-form-field :field="fields.className" v-model="model" />
																												<fluro-content-form-field :field="fields.officeUseOnly" v-model="model.params" />
																								</template>
																				</v-container>
																</flex-column-body>
																<!-- <flex-column-footer class="border-top">
                    <v-container py-2>
                        <v-layout>
                            <v-spacer />
                            <v-flex>
                                <v-btn @click="deleteField" block class="ma-0" small>
                                    Delete Field
                                    <fluro-icon right icon="trash-alt" />
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </flex-column-footer> -->
												</tab>
												<tab heading="Expressions">
																<flex-column-body>
																				<v-container class="border-bottom" style="background: #fff;">
																								<label><strong>Expressions and Logic</strong></label>
																								<div class="sm muted">Expressions are short pieces of javascript that can be used to alter the properties of this field depending on changes made in other fields</div>
																								<v-btn class="ml-0" small href="https://support.fluro.io/kb/advanced-form-expressions-guide" target="_blank">
																												Click here for more information
																												<fluro-icon icon="external-link" right />
																								</v-btn>
																				</v-container>
																				<v-container class="border-bottom" style="background: #fff;">
																								<label><strong>Variables</strong></label>
																								<v-layout>
																												<v-flex xs3><strong>data</strong></v-flex>
																												<v-flex xs9 class="sm muted">The root level model for the entire form, useful for absolute paths.</v-flex>
																								</v-layout>
																								<v-layout>
																												<v-flex xs3><strong>model</strong></v-flex>
																												<v-flex xs9 class="sm muted">The immediate model this field is attached to. Useful for relative paths</v-flex>
																								</v-layout>
																				</v-container>
																				<v-container>
																								<div class="expression-group" :class="{active:model.expressions.show}">
																												<v-input label="Show this field if" hint="Show this field only if this expression returns true " :persistent-hint="true" class="no-flex">
																																<v-layout>
																																				<v-flex>
																																								<fluro-expression-editor v-model="model.expressions.show" />
																																				</v-flex>
																																				<v-flex shrink>
																																								<v-menu :left="true" :top="true" :close-on-content-click="false" transition="slide-y-transition" offset-y>
																																												<template v-slot:activator="{ on }">
																																																<v-btn icon small class="ma-0 ml-1" v-on="on">
																																																				<fluro-icon icon="bullseye" />
																																																</v-btn>
																																												</template>
																																												<div>
																																																<expression-field-select :context="model" @click="injectExpression($event, 'show')" v-model="expressionFields" />
																																												</div>
																																								</v-menu>
																																				</v-flex>
																																</v-layout>
																												</v-input>
																								</div>
																								<div class="expression-group" :class="{active:model.expressions.hide}">
																												<v-input label="Hide this field if" hint="Hide this field if this expression returns true " :persistent-hint="true" class="no-flex">
																																<v-layout>
																																				<v-flex>
																																								<fluro-expression-editor v-model="model.expressions.hide" />
																																				</v-flex>
																																				<v-flex shrink>
																																								<v-menu :left="true" :top="true" :close-on-content-click="false" transition="slide-y-transition" offset-y>
																																												<template v-slot:activator="{ on }">
																																																<v-btn icon small class="ma-0 ml-1" v-on="on">
																																																				<fluro-icon icon="bullseye" />
																																																</v-btn>
																																												</template>
																																												<div>
																																																<expression-field-select :context="model" @click="injectExpression($event, 'hide')" v-model="expressionFields" />
																																												</div>
																																								</v-menu>
																																				</v-flex>
																																</v-layout>
																												</v-input>
																								</div>
																								<div class="expression-group" :class="{active:model.expressions.defaultValue}" v-if="simpleExpressionEnabled">
																												<v-input label="Set default value to" hint="Set the default value, (the value before the user changes it) of this field depending on the input of another. " :persistent-hint="true" class="no-flex">
																																<v-layout>
																																				<v-flex>
																																								<fluro-expression-editor v-model="model.expressions.defaultValue" />
																																				</v-flex>
																																				<v-flex shrink>
																																								<v-menu :left="true" v-model="popup.defaultValue" :top="true" :close-on-content-click="false" transition="slide-y-transition" offset-y>
																																												<template v-slot:activator="{ on }">
																																																<v-btn icon small class="ma-0 ml-1" v-on="on">
																																																				<fluro-icon icon="bullseye" />
																																																</v-btn>
																																												</template>
																																												<div>
																																																<expression-field-select :context="model" @click="injectExpression($event, 'defaultValue')" v-model="expressionFields" />
																																												</div>
																																								</v-menu>
																																				</v-flex>
																																</v-layout>
																												</v-input>
																								</div>
																								<div class="expression-group" :class="{active:model.expressions.value}" v-if="simpleExpressionEnabled">
																												<v-input label="Set value to" hint="Set the value of this field depending on the input of another" :persistent-hint="true" class="no-flex">
																																<v-layout>
																																				<v-flex>
																																								<fluro-expression-editor v-model="model.expressions.value" />
																																				</v-flex>
																																				<v-flex shrink>
																																								<v-menu :left="true" v-model="popup.value" :top="true" :close-on-content-click="false" transition="slide-y-transition" offset-y>
																																												<template v-slot:activator="{ on }">
																																																<v-btn icon small class="ma-0 ml-1" v-on="on">
																																																				<fluro-icon icon="bullseye" />
																																																</v-btn>
																																												</template>
																																												<div>
																																																<expression-field-select :context="model" @click="injectExpression($event, 'value')" v-model="expressionFields" />
																																												</div>
																																								</v-menu>
																																				</v-flex>
																																</v-layout>
																												</v-input>
																								</div>
																								<div class="expression-group" :class="{active:model.expressions.required}" v-if="simpleExpressionEnabled">
																												<v-input label="Require this field if" hint="Require input for this field if it's visible and this expression returns true " :persistent-hint="true" class="no-flex">
																																<v-layout>
																																				<v-flex>
																																								<fluro-expression-editor v-model="model.expressions.required" />
																																				</v-flex>
																																				<v-flex shrink>
																																								<v-menu :left="true" v-model="popup.required" :top="true" :close-on-content-click="false" transition="slide-y-transition" offset-y>
																																												<template v-slot:activator="{ on }">
																																																<v-btn icon small class="ma-0 ml-1" v-on="on">
																																																				<fluro-icon icon="bullseye" />
																																																</v-btn>
																																												</template>
																																												<div>
																																																<expression-field-select :context="model" @click="injectExpression($event, 'required')" v-model="expressionFields" />
																																												</div>
																																								</v-menu>
																																				</v-flex>
																																</v-layout>
																												</v-input>
																								</div>
																				</v-container>
																</flex-column-body>
												</tab>
								</tabset>
				</flex-column>
</template>
<script>
import FieldSelectModal from 'src/components/fields/FieldSelectModal.vue';
import FluroContentFormField from 'src/components/form/FluroContentFormField.vue';
import FluroContentForm from 'src/components/form/FluroContentForm.vue';
import OptionsManager from 'src/components/fields/FluroOptionsManager.vue';
import ExpressionFieldSelect from 'src/components/fields/ExpressionFieldSelect.vue';
import FluroExpressionEditor from 'src/components/form/FluroExpressionEditor.vue';
import FluroInlineEdit from 'src/components/form/FluroInlineEdit.vue';
import TicketingManager from 'src/components/fields/TicketingManager.vue';
import _ from 'lodash';




export default {
				components: {
								FieldSelectModal,
								FluroContentFormField,
								FluroContentForm,
								OptionsManager,
								ExpressionFieldSelect,
								FluroExpressionEditor,
								FluroInlineEdit,
				},
				props: {
								value: {
												type: Object,
								},
								expressionFields: {
												type: Array,
								},
								item: {
												type: Object,
								},
				},
				created() {
								// this.startListener();
				},
				data() {

								var self = this;
								var model = this.value;
								self.setDefaults(model);

								////////////////////////////////

								return {
												tabIndex: 0,
												model,
												editingKey: false,
												showAdvancedOptions: false,
												loadingFields: false,
												focussed: null,
												popup: {
																hide: false,
																hideExpression: false,
																show: false,
																required: false,
																value: false,
																defaultValue: false,
												},
								}
				},
				methods: {
								recursiveGUID(fields) {
												var self = this;
												_.each(fields, function(field) {
																if (!field.guid) {
																				self.$set(field, 'guid', self.$fluro.utils.guid());
																}

																self.recursiveGUID(field.fields);
												})
								},
								setDefaults(model) {
												var self = this;
												if (!model.params) {
																self.$set(model, 'params', {});
												}

												if (!model.params.ticketing) {
																self.$set(model.params, 'ticketing', { events: [] });
												}

												if (!model.params.ticketing.events) {
																self.$set(model.params.ticketing, 'events', []);
												}

												if (!model.expressions) {
																self.$set(model, 'expressions', {});
												}
								},
								deleteField() {
												var self = this;
												self.$emit('deleted');


								},
								selectDetailSheetFields() {
												var self = this;
												self.loadingFields = true;

												////////////////////////////////

												return self.$fluro.api.get('/defined/types/contactdetail')
																.then(function(res) {

																				self.loadingFields = false;

																				self.$fluro.options(res.data, 'Select detail sheet')
																								.then(function(definition) {

																												definition = JSON.parse(JSON.stringify(definition));

																												///////////////////////////////////////

																												var detailsBlock = _.find(self.model.fields, { key: 'details' });
																												if (!detailsBlock) {
																																detailsBlock = {
																																				title: 'Details',
																																				type: 'group',
																																				key: 'details',
																																				asObject: true,
																																				minimum: 1,
																																				maximum: 1,
																																				askCount: 1,
																																				fields: [],
																																				guid: self.$fluro.utils.guid(),
																																}

																																self.model.fields.push(detailsBlock);
																												}

																												///////////////////////////////////////

																												var sheetBlock = _.find(detailsBlock.fields, { key: definition.definitionName });
																												var dataBlock;

																												///////////////////////////////////////

																												if (!sheetBlock) {
																																sheetBlock = {
																																				title: definition.title,
																																				type: 'group',
																																				key: definition.definitionName,
																																				asObject: true,
																																				minimum: 1,
																																				maximum: 1,
																																				askCount: 1,
																																				fields: [],
																																				guid: self.$fluro.utils.guid(),
																																}

																																dataBlock = {
																																				title: 'Data',
																																				type: 'group',
																																				key: 'data',
																																				asObject: true,
																																				minimum: 1,
																																				maximum: 1,
																																				askCount: 1,
																																				fields: [],
																																				guid: self.$fluro.utils.guid(),
																																}

																																//Add as a pyramid
																																sheetBlock.fields.push(dataBlock);
																																detailsBlock.fields.push(sheetBlock);
																												}

																												//////////////////////////////

																												_.each(definition.fields, function(field) {

																																// guid:self.$fluro.utils.guid(),
																																var existingField = _.find(dataBlock.fields, { key: field.key });
																																if (!existingField) {

																																				field.guid = self.$fluro.utils.guid();
																																				self.recursiveGUID(field.fields)
																																				dataBlock.fields.push(field);
																																}
																												})


																												//Recursive create GUID

																												self.resetRequired();
																								})
																								.catch(reject);


																})
																.catch(function(err) {
																				self.loadingFields = false;
																});





												// self.$fluro.modal({
												//     component: FieldSelectModal,
												// })
												// .then(function(res) {
												//     console.log('RES', res);
												// });
								},
								selectTitle(select) {

												var scrollbox = this.$refs.scrollbox;
												if (scrollbox) {
																scrollbox.$el.scrollTo(0, 0);
												}

												/////////////////////////////////////////

												var self = this;

												if (select) {
																setTimeout(function() {
																				var match = self.model.type == 'group' ? self.$refs.grouptitle : self.$refs.title;

																				if (match && match.$el) {

																								var input = match.$el.querySelectorAll('input');
																								if (input && input[0]) {
																												input = input[0];
																												input.focus();
																												input.select();
																								}

																				}
																}, 10)
												}

								},
								injectExpression($event, target) {

												var self = this;
												self.popup[target] = false;

												var currentValue = self.model.expressions[target];

												/////////////////////////////////////////
												//LEGACY SUPPORT
												//We need to support the old school angular formly field
												if (target == 'hideExpression') {
																currentValue = self.model.hideExpression;
												}
												/////////////////////////////////////////

												var newValue;

												if (!currentValue) {
																newValue = $event.path;
												} else {
																newValue = `${currentValue} ${$event.path}`;
												}

												/////////////////////////////////////////
												//LEGACY SUPPORT
												//We need to support the old school angular formly field
												if (target == 'hideExpression') {
																self.$set(self.model, 'hideExpression', newValue);
												} else {
																/////////////////////////////////////////

																self.$set(self.model.expressions, target, newValue);
												}




								},
								// stopListener() {
								//     var self = this;
								//     self.resetRequired = function() {

								//     }
								// },
								// startListener() {
								//     var self = this;

								//     self.resetRequired = _.debounce(function(field) {
								//         console.log('NEEDS A RESET!', field)
								//         this.$emit('reset');
								//     }, 100)
								// },
								resetRequired: function(field) {
												//Nothing
												var self = this;

												self.previousField = field;
												setTimeout(function() {
																if (self.previousField == field) {
																				console.log('NEEDS RESET!')
																				self.previousField = false;
																				self.$emit('reset');
																}
												}, 100)
								},
				},
				watch: {

								value(v) {

												var self = this;
												self.editingKey = false

												// self.stopListener();


												var model = v;

												self.setDefaults(model);



												self.model = model;
												self.tabIndex = 0;
												self.selectTitle(!self.model.title);



												// self.startListener();
								},
				},
				mounted() {
								var self = this;
								setTimeout(function() {
												self.selectTitle(!self.model.title);
								}, 100);

				},
				asyncComputed: {
								referenceOptions: {
												default: [],
												get() {
																var self = this;


																return new Promise(function(resolve, reject) {

																				self.$fluro.types.terms()
																								.then(function(terms) {

																												/////////////////////////
																												var mapped = _.chain(terms)
																																.values()
																																.map(function(term) {
																																				return {
																																								name: term.title,
																																								title: term.title,
																																								value: term.definitionName,
																																				}
																																})
																																.orderBy('title')
																																.value();

																												/////////////////////////
																												resolve(mapped);
																								})
																								.catch(reject);

																				// Promise.all([
																				//     new Promise(function(resolve, reject) {
																				//         self.$fluro.types.basicTypes()
																				//             .then(function(values) {
																				//                 var cleaned = _.chain(values)
																				//                     .compact()
																				//                     .map(function(type) {
																				//                         return {
																				//                             name: type.title,
																				//                             title: type.title,
																				//                             value: type.definitionName,
																				//                         }
																				//                     })
																				//                     .orderBy('title')
																				//                     .value();

																				//                 resolve(cleaned);
																				//             });
																				//     }),
																				//     new Promise(function(resolve, reject) {
																				//         self.$fluro.types.basicTypes()
																				//             .then(function(values) {
																				//                 var cleaned = _.chain(values)
																				//                     .compact()
																				//                     .map(function(type) {
																				//                         return {
																				//                             name: type.title,
																				//                             title: type.title,
																				//                             value: type.definitionName,
																				//                         }
																				//                     })
																				//                     .orderBy('title')
																				//                     .value();

																				//                 resolve(cleaned);
																				//             });
																				//     }),

																				// ])


																})
												}
								}
				},
				computed: {
								fullPath() {
												return this.model.key;
								},
								field() {
												return this.model;
								},
								ticketingEnabled() {
												return this.model && this.model.params && this.model.params.ticketing && this.model.params.ticketing.enabled;
								},
								ticketingManager() {
												if (this.model.type == 'reference' && this.restrictType == 'contact' && this.ticketingEnabled) {
																return TicketingManager;

												}
								},



								isNumeric() {
												switch (this.model.type) {
																case 'float':
																case 'decimal':
																case 'integer':
																case 'number':
																				return true;
																				break;
												}
								},
								isDate() {
												return this.model.type == 'date';
								},
								currencyOptions() {
												var self = this;
												var array = [];

												if (_.get(self.user, 'countryCode') == 'AU') {
																array.push({
																				name: `AUD (${self.$fluro.utils.currencySymbol('aud')})`,
																				value: 'aud',
																})
												}

												array.push({
																name: `USD (${self.$fluro.utils.currencySymbol('usd')})`,
																value: 'usd',
												})

												if (_.get(self.user, 'countryCode') != 'AU') {
																array.push({
																				name: `AUD (${self.$fluro.utils.currencySymbol('aud')})`,
																				value: 'aud',
																})
												}

												array.push({
																name: `GBP (${self.$fluro.utils.currencySymbol('gbp')})`,
																value: 'gbp',
												})

												array.push({
																name: `CAD (${self.$fluro.utils.currencySymbol('cad')})`,
																value: 'cad',
												})



												return array;
								},
								showDescription() {
												switch (this.model.directive) {
																case 'embedded':
																				return;
																				break;
																default:
																				return true;
																				break;
												}
								},
								showPlaceholder() {
												switch (this.model.directive) {
																case 'custom':
																case 'embedded':
																				return;
																				break;
																default:
																				return true;
																				break;
												}
								},
								showKey() {
												var self = this;
												return self.editingKey; // || !self.model.key;

								},
								advancedOptions() {

												if (this.model.options && this.model.options.length) {
																return true;
												}

												return (this.showAdvancedOptions);
								},
								simpleExpressionEnabled() {
												return this.model.type != 'reference' && this.model.type != 'group'
								},
								restrictType() {
												return this.model && this.model.params && this.model.params.restrictType;
								},
								requiresOptions() {

												if (this.model.type == 'reference') {
																return;
												}

												switch (this.model.directive) {
																case 'select':
																case 'button-select':
																case 'search-select':
																case 'order-select':
																				return true;
																				break;
												}
								},
								ticketingFields() {
												var self = this;

												var fields = [];

												addField('enabled', {
																title: 'Create tickets for this contact',
																description: `If selected then this contact will be considered a ticketed attendee if an event is specified during the form submission a 'Standard' ticket will be created for each contact created by this field`,
																minimum: 0,
																maximum: 1,
																type: 'boolean',
												})

												function addField(key, data) {
																if (!data.key) {
																				data.key = key;
																}

																fields.push(data);
												}

												return fields;


								},
								fields() {
												var self = this;
												var fields = {};



												var definitionTitle = self.$fluro.types.readable(self.restrictType || 'node', true);

												addField('defaultReferences', {
																title: 'Default References',
																description: `Select which ${definitionTitle} should be selected by default`,
																minimum: 0,
																maximum: self.maximum,
																type: 'reference',
																params: {
																				searchInheritable: true,
																				allDefinitions: true,
																				restrictType: self.restrictType,
																}
												})


												addField('allowedValues', {
																title: 'Allowed Options',
																description: 'Add each option that the user may select.',
																minimum: 0,
																maximum: 0,
																type: 'string',
												})

												addField('allowedReferences', {
																title: 'Allowed References',
																description: `Select which ${definitionTitle} may be selected by the user`,
																minimum: 0,
																maximum: 0,
																type: 'reference',
																params: {
																				searchInheritable: true,
																				allDefinitions: true,
																				restrictType: self.restrictType,
																}
												})


												addField('wysiwygDefaultValues', {
																title: self.model.maximum == 1 ? 'Default Value' : 'Default Values',
																key: 'defaultValues',
																description: 'Preselect values for this field',
																minimum: 0,
																maximum: 0,
																type: 'string',
																directive: 'wysiwyg',
												})

												addField('codeDefaultValues', {
																title: 'Default Value(s)',
																key: 'defaultValues',
																description: 'add a default value for this field',
																minimum: 0,
																maximum: 0,
																type: 'string',
																directive: 'code',
																params: {
																				syntax: self.model.params.syntax,
																}
												})

												addField('defaultValues', {
																title: 'Default Value(s)',
																description: 'add a default value for this field',
																minimum: 0,
																maximum: 0,
																type: 'string',
												})

												addField('errorMessage', {
																title: 'Custom Error Message',
																description: 'Customise the message to display to the user if they enter invalid answers for this field',
																minimum: 0,
																maximum: 1,
																type: 'string',
												})


												addField('officeUseOnly', {
																key: 'disableWebform',
																title: 'Office Use Only (Hide from public web forms)',
																description: 'Check this if you want this field to be excluded from public facing webforms',
																minimum: 0,
																maximum: 1,
																type: 'boolean',
												})

												addField('syntax', {
																title: 'Code Syntax',
																minimum: 1,
																maximum: 1,
																type: 'string',
																directive: 'select',
																options: [{
																								title: 'JSON',
																								value: 'json',
																				},
																				{
																								title: 'Javascript',
																								value: 'js',
																				},
																				{
																								title: 'HTML',
																								value: 'html',
																				},
																				{
																								title: 'CSS',
																								value: 'scss',
																				},

																]
												})


												addField('title', {
																title: 'Title',
																// description: 'The title as displayed to the user',
																minimum: 1,
																maximum: 1,
																type: 'string',
												})

												addField('minimum', {
																title: 'Minimum Answers',
																description: 'Minimum amount of answers that can be provided for this field (Setting this to a number higher than 0 will make this field required)',
																minimum: 0,
																maximum: 1,
																type: 'integer',
																params: {
																				minValue: 0,
																}
												})
												addField('maximum', {
																title: 'Max Answers',
																description: 'Maximum amount of answers that can be provided for this field (usually 1 answer is necessary)',
																minimum: 0,
																maximum: 1,
																type: 'integer',
																params: {
																				minValue: 0,
																}
												})



												addField('minValue', {
																title: 'Minimum Amount',
																description: 'Minimum amount that can be input',
																minimum: 0,
																maximum: 1,
																type: self.model.type,
																directive: self.model.directive || null,
																params: {
																				currency: self.model.params.currency,
																},
												})
												addField('maxValue', {
																title: 'Maximum Amount',
																description: 'Maximum amount that can be input',
																minimum: 0,
																maximum: 1,
																type: self.model.type,
																directive: self.model.directive || null,
																params: {
																				currency: self.model.params.currency,
																},
												})

												addField('minDate', {
																title: 'Earliest Date',
																description: 'Earliest date that can be input',
																minimum: 0,
																maximum: 1,
																type: 'date',
												})
												addField('maxDate', {
																title: 'Latest Date',
																description: 'Latest date that can be input',
																minimum: 0,
																maximum: 1,
																type: 'date',
												})




												addField('groupMinimum', {
																title: 'Minimum',
																key: 'minimum',
																description: 'Minimum amount of entries for this group that can be created',
																minimum: 0,
																maximum: 1,
																type: 'integer',
																params: {
																				minValue: 0,
																}
												})
												addField('groupMaximum', {
																title: 'Maximum',
																key: 'maximum',
																description: 'Maximum amount of entries for this group that can be created',
																minimum: 0,
																maximum: 1,
																type: 'integer',
																params: {
																				minValue: 0,
																}
												})

												addField('askCount', {
																title: 'Ask Count',
																description: 'How many input groups should be asked for by default',
																minimum: 0,
																maximum: 1,
																type: 'integer',
																params: {
																				minValue: 0,
																}
												})

												addField('key', {
																title: 'Database Key',
																description: `A unique key used to store this field's data in the system`,
																minimum: 1,
																maximum: 1,
																type: 'string',
																expressions: {
																				// transform(value) {
																				//     var regexp = /[^a-zA-Z0-9-_]+/g;
																				//     var cleaned = _.camelCase(String(value).replace(regexp, ''));

																				//     return cleaned;
																				// },
																				defaultValue() {

																								var regexp = /[^a-zA-Z0-9-_]+/g;
																								var cleaned = _.camelCase(String(self.model.title).replace(regexp, ''));

																								return cleaned;
																				},
																},
												})

												addField('description', {
																title: 'Help /Hint text',
																description: 'An optional description that can add extra detail for users entering data',
																minimum: 0,
																maximum: 1,
																type: 'string',
												})

												addField('placeholder', {
																title: 'Placeholder',
																description: 'Faded text that can be displayed inside the field to give a hint as to what the user should type',
																minimum: 0,
																maximum: 1,
																type: 'string',
												})


												addField('type', {
																title: 'Data Type',
																description: 'The required kind of input that can be entered into this field',
																minimum: 1,
																maximum: 1,
																type: 'string',
																directive: 'select',
																options: [{
																								title: 'Text (String)',
																								value: 'string',
																				},
																				{
																								title: 'True / False (Boolean)',
																								value: 'boolean',
																				},
																				{
																								title: 'Date',
																								value: 'date',
																				},
																				{
																								title: 'Phone Number',
																								value: 'string',
																				},
																				{
																								title: 'Email Address',
																								value: 'email',
																				},
																				{
																								title: 'URL',
																								value: 'url',
																				},
																				{
																								title: 'Content Reference',
																								value: 'reference',
																				},
																				{
																								title: 'Number',
																								value: 'number',
																				},
																				{
																								title: 'Integer (Whole Number)',
																								value: 'integer',
																				},
																				{
																								title: 'Decimal (Float)',
																								value: 'float',
																				},
																				{
																								title: 'No value',
																								value: 'void',
																				},

																]
												})



												addField('referenceType', {
																key: 'restrictType',
																title: 'Reference Type',
																description: 'Restrict what kind of items can be referenced in this field',
																minimum: 0,
																maximum: 1,
																type: 'string',
																directive: 'select',
																options: self.referenceOptions,
												})


												addField('currency', {
																key: 'currency',
																title: 'Currency',
																description: 'Select what currency symbol to display',
																minimum: 0,
																maximum: 1,
																type: 'string',
																directive: 'select',
																options: self.currencyOptions,
												})



												addField('placeholder', {
																title: 'Placeholder',
																description: 'Faded text that can be displayed inside the field to give a hint as to what the user should type',
																minimum: 0,
																maximum: 1,
																type: 'string',
												})

												/////////////////////////////////////    

												var inputOptions = [];

												switch (self.model.type) {
																case 'reference':

																				inputOptions.push({
																								title: 'Select Dropdown',
																								value: 'select',
																				})


																				inputOptions.push({
																								title: 'Reference Select',
																								value: 'reference-select',
																				})




																				inputOptions.push({
																								title: 'Embedded Form',
																								value: 'embedded',
																				})

																				inputOptions.push({
																								title: 'File Upload',
																								value: 'upload',
																				})
																				break;
																case 'boolean':
																				inputOptions.push({
																								title: 'Checkbox',
																								value: 'input',
																				})

																				inputOptions.push({
																								title: 'Terms / Conditions Checkbox',
																								value: 'terms',
																				})
																				break;
																case 'string':
																				if (self.model.maximum != 1) {
																								inputOptions.push({
																												title: 'Multiple Text Field',
																												value: 'input',
																								})
																				} else {
																								inputOptions.push({
																												title: 'Text Field',
																												value: 'input',
																								})
																				}

																				inputOptions.push({
																								title: 'Text Area',
																								value: 'textarea',
																				})

																				inputOptions.push({
																								title: 'Rich Text (WYSIWYG)',
																								value: 'wysiwyg',
																				})
																				inputOptions.push({
																								title: 'Code Editor',
																								value: 'code',
																				})

																				inputOptions.push({
																								title: 'Select Dropdown',
																								value: 'select',
																				})

																				inputOptions.push({
																								title: 'Multiple Button Select',
																								value: 'button-select',
																				})

																				inputOptions.push({
																								title: 'Orderable Select',
																								value: 'order-select',
																				})

																				inputOptions.push({
																								title: 'Autocomplete Search',
																								value: 'search-select',
																				})

																				inputOptions.push({
																								title: 'Time Picker',
																								value: 'time-select',
																				})

																				inputOptions.push({
																								title: 'Color Picker',
																								value: 'color',
																				})

																				inputOptions.push({
																								title: 'Signature',
																								value: 'signature',
																				})






																				break;
																case 'date':

																				inputOptions.push({
																								title: 'Date Picker',
																								value: 'date-select',
																				})

																				inputOptions.push({
																								title: 'Date + Time Picker',
																								value: 'datetime-select',
																				})

																				inputOptions.push({
																								title: 'Age / Birthdate Select',
																								value: 'dob-select',
																				})


																				break;
																case 'number':
																case 'integer':
																case 'decimal':
																case 'float':

																				inputOptions.push({
																								title: 'Number Input',
																								value: 'input',
																				})

																				inputOptions.push({
																								title: 'Currency Input',
																								value: 'currency',
																				})


																				break;
																default:
																				inputOptions.push({
																								title: 'Text Input',
																								value: 'input',
																				})
																				break;



												}

												//////////////////////////////////////////

												if (self.item._type == 'component') {

																if (self.model.type == 'string') {
																				inputOptions.push({
																								title: 'Website Builder Menu Select',
																								value: 'app-menu-select',
																				})

																				inputOptions.push({
																								title: 'Website Builder Page Select',
																								value: 'app-page-select',
																				})

																				inputOptions.push({
																								title: 'Website Builder Size Select',
																								value: 'app-size-select',
																				})

																				inputOptions.push({
																								title: 'Website Builder Theme Select',
																								value: 'app-theme-select',
																				})
																}
												}

												//////////////////////////////////////////

												inputOptions.push({
																title: 'Hidden Value',
																value: 'value',
												})

												inputOptions.push({
																title: 'Custom HTML',
																value: 'custom',
												})

												/////////////////////////////////////    

												addField('directive', {
																title: 'Input Type',
																description: 'What kind of widget should be provided to the user for input?',
																minimum: 1,
																maximum: 1,
																type: 'string',
																directive: 'select',
																options: inputOptions,
												})



												addField('asObject', {
																title: 'Group as Sub Object',
																description: `Treat this group as it's own entity. If not selected this group will be purely for visual layout.`,
																minimum: 0,
																maximum: 1,
																type: 'boolean',
												})

												addField('sameLine', {
																title: 'Same Line',
																description: 'Attempt to render fields in this group on the same line on larger screens',
																minimum: 0,
																maximum: 1,
																type: 'boolean',
												})

												addField('className', {
																title: 'CSS Classes',
																description: 'Add CSS classes to this field',
																minimum: 0,
																maximum: 1,
																type: 'string',
												})

												addField('template', {
																title: 'Custom HTML',
																description: 'Custom HTML to be shown for this field',
																minimum: 0,
																maximum: 1,
																type: 'string',
																directive: 'code',
																params: {
																				syntax: 'html',
																}
												})

												/////////////////////////////////////////////////////////
												/////////////////////////////////////////////////////////
												/////////////////////////////////////////////////////////

												var embeddedType = self.model.params.restrictType
												var embeddedTitle = self.$fluro.types.readable(embeddedType);
												var embeddedPlural = self.$fluro.types.readable(embeddedType, true);

												var definitions = _.chain(self.$fluro.glossary)
																.reduce(function(set, term, key) {
																				term.definitionName = key;
																				if (term.parentType == embeddedType) {
																								set.push(term);
																				}

																				return set;
																}, [])
																.map(function(definition) {
																				return {
																								name: definition.title,
																								value: definition.definitionName,
																				}
																})
																.orderBy(function(definition) {
																				return definition.title;
																})
																.value();

												////////////////////////////////////////////

												addField('targetDefinition', {
																title: 'Definition',
																description: `Select the definition that should be applied to ${embeddedPlural}.`,
																minimum: 0,
																maximum: 1,
																type: 'reference',
																expressions: {
																				hide() {
																								return !definitions.length;
																				}
																},
																params: {
																				restrictType: 'realm',
																}
												})


												addField('targetRealms', {
																title: `Create ${embeddedTitle} in Realms`,
																description: `Select realms that these ${embeddedPlural} should be created in. If left blank it will default to the same realm as the form submission itself`,
																minimum: 0,
																maximum: 0,
																type: 'reference',
																directive: 'realm-select',
																params: {
																				restrictType: 'realm',
																}
												})

												addField('targetHouseholdRole', {
																title: 'Household Role',
																description: `Select the household role to add to these ${embeddedPlural}`,
																minimum: 0,
																maximum: 1,
																type: 'string',
																directive: 'select',
																options: [{
																								name: 'None',
																								value: '',
																				},
																				{
																								name: 'Parent',
																								value: 'parent',
																				},
																				{
																								name: 'Child',
																								value: 'child',
																				},
																],
																expressions: {
																				hide() {
																								return (embeddedType != 'contact');
																				}
																}
												})


												addField('targetCapabilities', {
																title: 'Add Capabilities',
																description: `Select capabilities that will be added to these ${embeddedPlural}. `,
																minimum: 0,
																maximum: 0,
																type: 'reference',
																params: {
																				restrictType: 'capability',
																},
																expressions: {
																				hide() {
																								return (embeddedType != 'contact');
																				}
																}
												})

												addField('targetTeams', {
																title: 'Add to Groups / Teams',
																description: `Select groups and teams that these ${embeddedPlural} should be created in. `,
																minimum: 0,
																maximum: 0,
																type: 'reference',
																params: {
																				restrictType: 'team',
																},
																expressions: {
																				hide() {
																								return (embeddedType != 'contact');
																				}
																}
												})

												addField('targetTags', {
																title: 'Add Tags',
																description: `Select tags to add to these ${embeddedPlural}. `,
																minimum: 0,
																maximum: 0,
																type: 'reference',
																params: {
																				restrictType: 'tag',
																},
												})

												addField('targetProcesses', {
																title: 'Add to Processes',
																description: `Select processes that these ${embeddedPlural} should be added in to. `,
																minimum: 0,
																maximum: 0,
																type: 'reference',
																params: {
																				restrictType: 'definition',
																},
												})

												addField('targetReactions', {
																title: 'Trigger Reactions',
																description: `Select reaction pipelines that these ${embeddedPlural} should be added in to. `,
																minimum: 0,
																maximum: 0,
																type: 'reference',
																params: {
																				restrictType: 'reaction',
																},
												})

												///////////////////////////////////////////////
												///////////////////////////////////////////////
												///////////////////////////////////////////////
												///////////////////////////////////////////////
												///////////////////////////////////////////////







												function addField(key, data) {
																if (!data.key) {
																				data.key = key;
																}

																fields[key] = data;
												}

												return fields;
								}
				}
}

</script>
<style lang="scss">
.key-name {
				&.fade {
								opacity: 0.5;
				}

				margin-bottom: 10px;
				display: block;
}

.key {
				border-radius: 3px;
				background: rgba(#000, 0.1);
				padding: 2px;
				display: block;
}

.input-block {
				background: #fff;
				display: block;
				border: 1px solid $primary;
				width: 100%;
}

.expression-group {

				padding: 15px 15px;
				background: rgba(#000, 0.05);
				border-radius: 3px;
				margin-top: 16px;
				border: 1px solid transparent;

				&.active {
								background: rgba($warning, 0.1);
								border: 1px solid rgba($warning, 0.5);
								color: $warning;
				}

				// &.has-error {
				//     background: rgba(#ff5252, 0.05)
				// }

				// &>.v-input {
				//     margin-top: 0 !important;
				// }

				// .conditions {
				//     margin-top: 10px;
				//     font-size: 0.9em;
				//     opacity: 0.8;

				//     font-style: italic;
				// }
}


.key-preview {
				margin-top: -15px;
				font-size: 0.8em;
				opacity: 0.5;
}

</style>
