<template>
    <div class="fluro-content-render-field">
        <!-- <pre>{{field.type}} {{renderer}}</pre> -->
        <template v-if="isEmpty">
        </template>
        <template v-else-if="type == 'reference'">
            <div class="field-group">
                <label>{{label}}</label>
                <template v-if="!multiple">
                    <fluro-list-item :item="fieldModel" :defaultActions="defaultActions(object)"></fluro-list-item>
                </template>
                <template v-if="multiple">
                    <template v-for="(object, index) in fieldModel">
                        <!-- <pre>{{object}}</pre> -->
                        <fluro-list-item :item="object" :defaultActions="defaultActions(object)"></fluro-list-item>
                    </template>
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
        <template v-else-if="renderer == 'group'">
            <template v-if="asObject">
                <template v-if="!multiple">
                    <fluro-content-render :fields="fields" v-model="fieldModel"></fluro-content-render>
                </template>
                <template v-if="multiple">
                    <template v-for="(object, index) in fieldModel">
                        <v-card class="panel">
                            <div class="panel-title">
                                <h5 title>{{groupTitle(object, index)}}</h5>
                            </div>
                            <v-card-text class="panel-body">
                                <fluro-content-render :fields="fields" v-model="fieldModel[index]"></fluro-content-render>
                            </v-card-text>
                        </v-card>
                    </template>
                </template>
            </template>
            <template v-else>
                <template v-for="field in fields">
                    <fluro-content-render-field :field="field" v-model="model"></fluro-content-render-field>
                    <!-- <fluro-content-form-field class="flex" :field="field" @input="valueChange" v-model="model"></fluro-content-form-field> -->
                </template>
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
                <template v-if="!multiple">
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
                <template v-if="!multiple">
                    <div class="field-group">
                        <label>{{label}}</label>
                        <div>
                            {{fieldModel}}
                        </div>
                    </div>
                </template>
            </template>
        </template>
        <!-- <template v-else-if="renderer == 'custom'">
            <fluro-compile-html :template="customTemplate" :context="customContext" />
        </template>
        <template v-else-if="renderer == 'embedded'">
            <template v-if="field.maximum == 1">
                <fluro-content-form v-model="fieldModel" @input="valueChange" :fields="fields"></fluro-content-form>
            </template>
            <template v-if="field.maximum != 1">
                <template v-for="(object, index) in fieldModel">
                    <v-card>
                        <v-toolbar class="elevation-0">
                            <v-toolbar-title class="hidden-xs">{{groupTitle(object, index)}}</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-toolbar-items>
                                <v-btn icon small flat color="error" @click="removeValue(index)" v-if="canRemoveValue">
                                    <v-icon>close</v-icon>
                                </v-btn>
                            </v-toolbar-items>
                        </v-toolbar>
                        </v-toolbar>
                        <v-card-text>
                            <fluro-content-form v-model="fieldModel[index]" @input="valueChange" :fields="fields"></fluro-content-form>
                        </v-card-text>
                    </v-card>
                </template>
                <v-btn color="primary" @click="addValue({})" v-if="canAddValue">
                    {{addLabel}}
                </v-btn>
            </template>
        </template>
        <template v-else-if="renderer == 'group'">
            <template v-if="asObject">
                <template v-if="field.maximum == 1">
                    <fluro-content-form v-model="fieldModel" @input="valueChange" :fields="fields"></fluro-content-form>
                </template>
                <template v-if="field.maximum != 1">
                    <template v-for="(object, index) in fieldModel">
                        <v-card>
                            <v-toolbar class="elevation-0">
                                <v-toolbar-title class="hidden-xs">{{groupTitle(object, index)}}</v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-toolbar-items>
                                    <v-btn small icon flat color="error" @click="removeValue(index)" v-if="canRemoveValue">
                                        <v-icon>close</v-icon>
                                    </v-btn>
                                </v-toolbar-items>
                            </v-toolbar>
                            </v-toolbar>
                            <v-card-text>
                                <fluro-content-form v-model="fieldModel[index]" @input="valueChange" :fields="fields"></fluro-content-form>
                            </v-card-text>
                        </v-card>
                    </template>
                    <v-btn color="primary" @click="addValue({})" v-if="canAddValue">
                        {{addLabel}}
                    </v-btn>
                </template>
            </template>
            <template v-else>
                <template v-for="field in fields">
                    <fluro-content-render-field class="flex" :field="field" @input="valueChange" v-model="model"></fluro-content-render-field>
                </template>
            </template>
        </template>
        <template v-else-if="renderer == 'checkbox'">
            <div class="terms" :class="{'has-error':errorMessages.length}" v-if="savedTerms">
                <v-checkbox :mandatory="required" :persistent-hint="true" :label="label" v-model="fieldModel" @change="valueChange($event, true)" :error-messages="errorMessages" :hint="field.description" :placeholder="field.placeholder" />
                <div class="conditions">{{field.params.storeData}}</div>
            </div>
            <template v-else>
                <v-checkbox :mandatory="required" :persistent-hint="true" :label="label" v-model="fieldModel" @change="valueChange($event, true)" :error-messages="errorMessages" :hint="field.description" :placeholder="field.placeholder" />
            </template>
        </template>
        <template v-else-if="renderer == 'number'">
            <v-text-field :required="required" type="number" :label="label" v-model="fieldModel" @input="valueChange" @blur="touch()" :error-messages="errorMessages" :hint="field.description" :placeholder="field.placeholder" />
        </template>
        <template v-else-if="renderer == 'datepicker'">
            <v-dialog ref="dialog" v-model="modal" persistent :return-value.sync="fieldModel" lazy full-width width="290px">
                <template v-slot:activator="{ on }">
                    <v-text-field v-model="fieldModel" :label="label" prepend-inner-icon="event" readonly v-on="on" @focus="modal = true"></v-text-field>
                </template>
                <v-card v-if="modal">
                    <v-toolbar color="primary" dark>
                        <v-toolbar-title>{{label}}</v-toolbar-title>
                    </v-toolbar>
                    <v-date-picker v-model="sudoModel" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.dialog.save(sudoModel)">OK</v-btn>
                    </v-date-picker>
                </v-card>
            </v-dialog>
        </template>
        <template v-else-if="renderer == 'timepicker'">
            <v-dialog ref="dialog" v-model="modal" persistent :return-value.sync="fieldModel" lazy full-width width="290px">
                <template v-slot:activator="{ on }">
                    <v-text-field v-model="fieldModel" :label="label" prepend-inner-icon="access_time" readonly v-on="on" @focus="modal = true"></v-text-field>
                </template>
                <v-card v-if="modal">
                    <v-toolbar color="primary" dark>
                        <v-toolbar-title>{{label}}</v-toolbar-title>
                    </v-toolbar>
                    <v-time-picker v-model="sudoModel" full-width>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.dialog.save(sudoModel)">OK</v-btn>
                    </v-time-picker>
                </v-card>
            </v-dialog>
        </template>
        <template v-else-if="renderer == 'datetimepicker'">
            <fluro-date-time-picker format="h:mma - dddd D MMMM YYYY" timePickerFormat="ampm" :label="label" v-model="fieldModel" @focus="modal = true" />
        </template>
        <template v-else-if="renderer == 'textarea'">
            <v-textarea :required="required" :label="label" v-model="fieldModel" @input="valueChange" @blur="touch()" :error-messages="errorMessages" :hint="field.description" :placeholder="field.placeholder" />
        </template>
        <template v-else-if="renderer == 'select'">
            <v-select :required="required" :return-object="type == 'reference'" :label="label" :chips="multipleInput" no-data-text="No options available" :multiple="multipleInput" v-model="fieldModel" item-text="title" :items="options" @input="valueChange" @blur="touch()" :error-messages="errorMessages" :hint="field.description" :placeholder="field.placeholder" />
        </template>
        <template v-else-if="renderer == 'search-select'">
            <v-autocomplete :deletable-chips="true" :hide-selected="true" prepend-inner-icon="search" :error-messages="errorMessages" :cache-items="!defaultReferences.length" :chips="multipleInput" :clearable="!required" :return-object="true" item-text="title" v-model="fieldModel" @blur="touch()" @change="valueChange" :multiple="multipleInput" :loading="loading" :items="searchResults" :search-input.sync="keywords" flat hide-no-data :label="label">
                <template v-slot:item="{ item }">
                    <fluro-avatar class="xs" :id="item._id" type="contact"></fluro-avatar>    
                    <v-list-tile-content>
                        <v-list-tile-title v-text="item.title"></v-list-tile-title>
                    </v-list-tile-content>
                </template>
            </v-autocomplete>
        </template>
        <template v-else-if="renderer == 'signature'">
            <fluro-signature-field :label="label" v-model="fieldModel" :required="required" :error-messages="errorMessages" :hint="field.description" />
        </template>
        <template v-else-if="renderer == 'code'">
            <v-card class="no-flex">
                <v-toolbar dark>
                    <v-toolbar-title>{{label}}</v-toolbar-title>
                </v-toolbar>
                <fluro-code-editor v-model="fieldModel" :lang="syntax" :height="200"></fluro-code-editor>
            </v-card>
        </template>
        <template v-else-if="renderer == 'wysiwyg'">
            <v-input class="no-flex" :required="required" :error-messages="errorMessages" :hint="field.description" />
            <template v-if="multipleInput">
                <template v-if="fieldModel.length">
                    <template v-for="(entry, index) in fieldModel">
                        <v-layout>
                            <div class="vertical-center">
                                <v-label>{{groupTitle(entry, index)}}</v-label>
                            </div>
                            <v-spacer></v-spacer>
                            <v-btn icon flat color="error" v-if="canRemoveValue" @click="removeValue(index, true)">
                                <v-icon>close</v-icon>
                            </v-btn>
                        </v-layout>
                        <v-text-field v-model="fieldModel[index]"></v-text-field>
                        <fluro-editor v-model="fieldModel[index]" @input="valueChange" @blur="touch()" :placeholder="field.placeholder"></fluro-editor>
                    </template>
                </template>
                <template v-if="canAddValue">
                    <v-btn color="primary" @click="addValue('')">
                        {{multiLabel}} <v-icon>add</v-icon>
                    </v-btn>
                </template>
            </template>
            <template v-if="!multipleInput">
                <fluro-editor v-model="fieldModel" @input="valueChange" @blur="touch()" :placeholder="field.placeholder"></fluro-editor>
            </template>
            </v-input>
        </template>
        <template v-else>
            <template v-if="multipleInput">
                <template v-if="fieldModel.length">
                    <v-input class="no-flex" :label="label">
                        <div v-for="(entry, index) in fieldModel">
                            <v-chip close @input="removeValue(index, true)">{{entry}}</v-chip>
                        </div>
                    </v-input>
                </template>
                <template v-if="canAddValue">
                    <v-text-field browser-autocomplete="off" :append-icon="canAddValue ? 'plus' : 'plus'" :required="required" :label="multiLabel" v-model="proposedValue" @keyup.enter.native.stop="addProposedValue()" @blur="addProposedValue()" :error-messages="errorMessages" :hint="hint" :placeholder="field.placeholder" />
                </template>
            </template>
            <template v-if="!multipleInput">
                <v-text-field browser-autocomplete="off" :required="required" :label="label" v-model="fieldModel" @input="valueChange" @blur="touch()" :error-messages="errorMessages" :hint="field.description" :placeholder="field.placeholder" />
            </template>
        </template> -->
    </div>
</template>
<script>
import _ from 'lodash';
// import FluroCompileHtml from '../FluroCompileHtml.vue';
// import FluroEditor from './FluroEditor.vue';
import FluroCodeEditor from './form/FluroCodeEditor.vue';
import FluroListItem from './FluroListItem.vue';
// import FluroSignatureField from './FluroSignatureField.vue';
// import FluroDateTimePicker from './FluroDateTimePicker.vue';
//Allow custom html to be injected at runtime


////////////////////////////////////////////////////////

export default {
    components: {
        // FluroEditor,
        // FluroCompileHtml,
        FluroCodeEditor,
        FluroListItem,
        // FluroSignatureField,
        // FluroDateTimePicker,
    },
    data() {
        return {
            model: this.value,
        }
    },
    computed: {

        isEmpty() {
            if (this.multiple) {
                return !this.fieldModel || !this.fieldModel.length
            } else {
                return !this.fieldModel;
            }
        },
        fieldModel: {
            get() {
                if(!this.model) {
                    return;
                }
                
                return this.model[this.key]
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
            switch(object._type) {
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
        'field': {
            type: Object,
        },
        'value': {
            required: true,
        }
    },
    beforeCreate: function() {
        this.$options.components.FluroContentRender = require('./FluroContentRender.vue').default;
        this.$options.components.FluroContentRenderField = require('./FluroContentRenderField.vue').default;
    },
}
</script>
<style lang="scss">
.fluro-content-render-field {


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