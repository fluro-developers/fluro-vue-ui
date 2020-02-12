<template>
    <flex-column>
        <tabset v-model="tabIndex" v-if="model.type == 'group'">
            <tab heading="Group Settings">
                <flex-column-body>
                    <v-container>
                        <fluro-content-form-field ref="grouptitle" :field="fields.title" v-model="model" />
                        <fluro-content-form-field :field="fields.key" v-model="model" />
                        <fluro-content-form-field @input="resetRequired()" :field="fields.asObject" v-model="model" />
                        <fluro-content-form-field :field="fields.sameLine" v-model="model" />
                        <fluro-content-form-field :field="fields.className" v-model="model" />
                        <!-- <pre>{{model}}</pre> -->
                        <v-layout v-if="model.asObject">
                            <v-flex xs6>
                                <fluro-content-form-field :field="fields.groupMinimum" v-model="model" />
                            </v-flex>
                            <v-spacer />
                            <v-flex xs6>
                                <fluro-content-form-field @input="resetRequired()" :field="fields.groupMaximum" v-model="model" />
                            </v-flex>
                            <v-spacer />
                            <v-flex xs6>
                                <fluro-content-form-field :field="fields.askCount" v-model="model" />
                            </v-flex>
                        </v-layout>
                    </v-container>
                </flex-column-body>
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
                        <template v-if="true">
                            <div class="expression-group">
                                <v-input label="Hide group if" hint="Hide this group if this expression returns true " :persistent-hint="true" class="no-flex">
                                    <v-layout>
                                        <v-flex>
                                            <fluro-expression-editor v-model="model.hideExpression" />
                                        </v-flex>
                                        <v-flex shrink>
                                            <v-menu :right="true" :close-on-content-click="false" transition="slide-y-transition" offset-y>
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
                        </template>
                        <template v-else>
                            <div class="expression-group">
                                <v-input label="Hide if" hint="Hide this group if this expression returns true " :persistent-hint="true" class="no-flex">
                                    <v-layout>
                                        <v-flex>
                                            <fluro-expression-editor v-model="model.expressions.hide" />
                                        </v-flex>
                                        <v-flex shrink>
                                            <v-menu :right="true" :close-on-content-click="false" transition="slide-y-transition" offset-y>
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
                            <div class="expression-group">
                                <v-input label="Show if" hint="Show this group only if this expression returns true " :persistent-hint="true" class="no-flex">
                                    <v-layout>
                                        <v-flex>
                                            <fluro-expression-editor v-model="model.expressions.show" />
                                        </v-flex>
                                        <v-flex shrink>
                                            <v-menu :right="true" :close-on-content-click="false" transition="slide-y-transition" offset-y>
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
                        </template>
                        <!-- <pre>{{model}}</pre> -->
                    </v-container>
                </flex-column-body>
            </tab>
        </tabset>
        <tabset v-else v-model="tabIndex">
            <tab heading="Field Settings">
                <flex-column-body>
                    <v-container>
                        <fluro-content-form-field ref="title" :field="fields.title" v-model="model" />
                        <fluro-content-form-field :field="fields.key" v-model="model" />
                        <template v-if="model.directive != 'custom'">
                            <fluro-content-form-field :field="fields.description" v-model="model" />
                            <fluro-content-form-field :field="fields.placeholder" v-model="model" />
                        </template>
                        <fluro-content-form-field :field="fields.type" v-model="model" />
                        <v-layout v-if="model.type != 'void'">
                            <v-flex xs6>
                                <fluro-content-form-field :field="fields.minimum" v-model="model" />
                            </v-flex>
                            <v-spacer />
                            <v-flex xs6>
                                <fluro-content-form-field :field="fields.maximum" v-model="model" />
                            </v-flex>
                        </v-layout>
                        <fluro-content-form-field :field="fields.directive" v-model="model" />
                        <template v-if="model.directive == 'code'">
                            <fluro-content-form-field :field="fields.syntax" v-model="model.params" />
                            <!-- <fluro-content-form-field :field="fields." v-model="model" /> -->
                        </template>
                        <template v-if="model.directive == 'custom'">
                            <fluro-content-form-field :field="fields.template" v-model="model" />
                        </template>
                        <template v-if="requiresOptions">
                            <template v-if="advancedOptions">
                                <v-input label="Selectable Options" class="no-flex">
                                    <options-manager v-model="model.options" />
                                </v-input>
                            </template>
                            <template v-else>
                                <fluro-content-form-field :field="fields.allowedValues" v-model="model" />
                                <div class="sm muted" @click="showAdvancedOptions = true">Show advanced labelling options</div>
                            </template>
                        </template>
                        <template v-if="model.directive != 'embedded'">
                            <template v-if="model.type == 'reference'">
                                <fluro-content-form-field :field="fields.allowedReferences" v-model="model" />
                                <fluro-content-form-field @input="resetRequired()" :field="fields.defaultReferences" v-model="model" />
                            </template>
                            <template v-else>
                                <template v-if="model.directive == 'wysiwyg'">
                                    <fluro-content-form-field @input="resetRequired()" :field="fields.wysiwygDefaultValues" v-model="model" />
                                </template>
                                <template v-else-if="model.directive == 'code'">
                                    <fluro-content-form-field @input="resetRequired()" :field="fields.codeDefaultValues" v-model="model" />
                                </template>
                                <template v-else>
                                    <fluro-content-form-field @input="resetRequired()" :field="fields.defaultValues" v-model="model" />
                                </template>
                            </template>
                        </template>
                        <fluro-content-form-field :field="fields.errorMessage" v-model="model" />
                        <fluro-content-form-field :field="fields.className" v-model="model" />
                        <fluro-content-form-field :field="fields.officeUseOnly" v-model="model.params" />
                    </v-container>
                </flex-column-body>
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
                        <div class="expression-group" v-if="simpleExpressionEnabled">
                            <v-input label="Set value to" hint="Set the value of this field depending on the input of another" :persistent-hint="true" class="no-flex">
                                <v-layout>
                                    <v-flex>
                                        <fluro-expression-editor v-model="model.expressions.value" />
                                    </v-flex>
                                    <v-flex shrink>
                                        <v-menu :right="true" :close-on-content-click="false" transition="slide-y-transition" offset-y>
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
                        <div class="expression-group" v-if="simpleExpressionEnabled">
                            <v-input label="Set default value of" hint="Set the default value, (the value before the user changes it) of this field depending on the input of another. " :persistent-hint="true" class="no-flex">
                                <v-layout>
                                    <v-flex>
                                        <fluro-expression-editor v-model="model.expressions.defaultValue" />
                                    </v-flex>
                                    <v-flex shrink>
                                        <v-menu :right="true" :close-on-content-click="false" transition="slide-y-transition" offset-y>
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
                        <div class="expression-group">
                            <v-input label="Hide if" hint="Hide this field if this expression returns true " :persistent-hint="true" class="no-flex">
                                <v-layout>
                                    <v-flex>
                                        <fluro-expression-editor v-model="model.expressions.hide" />
                                    </v-flex>
                                    <v-flex shrink>
                                        <v-menu :right="true" :close-on-content-click="false" transition="slide-y-transition" offset-y>
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
                        <div class="expression-group">
                            <v-input label="Show if" hint="Show this field only if this expression returns true " :persistent-hint="true" class="no-flex">
                                <v-layout>
                                    <v-flex>
                                        <fluro-expression-editor v-model="model.expressions.show" />
                                    </v-flex>
                                    <v-flex shrink>
                                        <v-menu :right="true" :close-on-content-click="false" transition="slide-y-transition" offset-y>
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
                        <div class="expression-group" v-if="simpleExpressionEnabled">
                            <v-input label="Required if" hint="Require input for this field if it's visible and this expression returns true " :persistent-hint="true" class="no-flex">
                                <v-layout>
                                    <v-flex>
                                        <fluro-expression-editor v-model="model.expressions.required" />
                                    </v-flex>
                                    <v-flex shrink>
                                        <v-menu :right="true" :close-on-content-click="false" transition="slide-y-transition" offset-y>
                                            <template v-slot:activator="{ on }">
                                                <v-btn icon small class="ma-0 ml-1" v-on="on">
                                                    <fluro-icon icon="bullseye" />
                                                </v-btn>
                                            </template>
                                            <div>
                                                <expression-field-select @click="injectExpression($event, 'required')" v-model="expressionFields" />
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
import FluroContentFormField from '../form/FluroContentFormField.vue';
import FluroContentForm from '../form/FluroContentForm.vue';
import OptionsManager from './FluroOptionsManager.vue';
import ExpressionFieldSelect from './ExpressionFieldSelect.vue';
import FluroExpressionEditor from '../form/FluroExpressionEditor.vue';

export default {
    components: {
        FluroContentFormField,
        FluroContentForm,
        OptionsManager,
        FluroExpressionEditor,
        ExpressionFieldSelect,
    },
    props: {
        value: {
            type: Object,
        },
        expressionFields: {
            type: Array,
        },
    },
    data() {

        var self = this;
        var model = this.value;
        if (!model.params) {
            self.$set(model, 'params', {});
        }


        if (!model.expressions) {
            self.$set(model, 'expressions', {});
        }

        ////////////////////////////////

        return {
            tabIndex: 0,
            model,
            showAdvancedOptions: false,
        }
    },
    methods: {
        selectTitle(select) {

            var self = this;

            setTimeout(function() {


                var match = self.model.type == 'group' ? self.$refs.grouptitle : self.$refs.title;

                if (match && match.$el && match.$el.scrollIntoView) {
                    match.$el.scrollIntoView();

                    if (select) {
                        var input = match.$el.querySelectorAll('input');
                        if (input && input[0]) {
                            input = input[0];
                            console.log('INPUT', input);
                            input.focus();
                            input.select();
                        }
                    }
                }
            }, 10)
           
        },
        injectExpression($event, target) {

            var self = this;

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
        resetRequired: _.debounce(function() {
            this.$emit('reset');
        }, 100),
    },
    watch: {
        value(v) {

            var self = this;
            var model = v;
            if (!model.params) {
                self.$set(model, 'params', {});
            }


            if (!model.expressions) {
                self.$set(model, 'expressions', {});
            }


            self.model = model;
            self.tabIndex = 0;
            self.selectTitle(self.model.title == 'New Field' || self.model.title == 'New Group');
        },
    },
    mounted() {
        var self = this;
        setTimeout(function() {
            self.selectTitle(self.model.title == 'New Field' || self.model.title == 'New Group');
        }, 100);

    },
    computed: {
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
            return this.model.params.restrictType;
        },
        requiresOptions() {
            switch (this.model.directive) {
                case 'select':
                case 'button-select':
                case 'search-select':
                case 'order-select':
                    return true;
                    break;
            }
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
                description: 'Add each option that the user may select',
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
                title: 'Default Value(s)',
                key: 'defaultValues',
                description: 'add a default value for this field',
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
                        value: 'css',
                    },
                ]
            })


            addField('title', {
                title: 'Title',
                description: 'The title as displayed to the user',
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
                title: 'Key',
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
                title: 'Description',
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
                title: 'Reference Type',
                description: 'Restrict what kind of items can be referenced in this field',
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

            /////////////////////////////////////    

            var inputOptions = [];

            switch (self.model.type) {
                case 'reference':

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
                default:
                    inputOptions.push({
                        title: 'Text Input',
                        value: 'input',
                    })
                    break;
            }

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
                description: 'Attach the fields in this group onto the group object instead of the top level form model',
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
                title: 'Classes',
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
.expression-group {

    padding: 15px 15px;
    background: rgba(#000, 0.05);
    border-radius: 3px;
    margin-top: 16px;

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
</style>