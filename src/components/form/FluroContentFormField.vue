<template>
    <div :data-field-key="key" class="fluro-content-form-field" v-if="isVisible" v-bind="attributes" :class="fieldClass">
        <!-- <pre>{{minimum}}</pre> -->
        <template v-if="officeUseOnly">
        </template>
        <template v-else-if="renderer == 'custom'">
            <fluro-compile-html :template="customTemplate" :context="customContext" />
        </template>
        <template v-else-if="renderer == 'embedded'">
            <template v-if="field.maximum == 1">
                <fluro-content-form :form-fields="formFields" :options="options" v-model="fieldModel" @input="valueChange" :fields="fields"></fluro-content-form>
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
                            <fluro-content-form :form-fields="formFields" :options="options" v-model="fieldModel[index]" @input="valueChange" :fields="fields"></fluro-content-form>
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
                    <fluro-content-form :form-fields="formFields" :options="options" v-model="fieldModel" @input="valueChange" :fields="fields"></fluro-content-form>
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
                                <fluro-content-form :form-fields="formFields" :options="options" v-model="fieldModel[index]" @input="valueChange" :fields="fields"></fluro-content-form>
                            </v-card-text>
                        </v-card>
                    </template>
                    <v-btn color="primary" @click="addValue({})" v-if="canAddValue">
                        {{addLabel}}
                    </v-btn>
                </template>
            </template>
            <template v-else>
                <!-- <fluro-content-form :options="options" v-model="fieldModel[index]" @input="valueChange" :fields="fields"></fluro-content-form> -->
                <template v-for="field in fields">
                    <fluro-content-form-field :form-fields="formFields" :options="options" class="flex" :field="field" @input="valueChange" v-model="model"></fluro-content-form-field>
                </template>
            </template>
        </template>
        <template v-else-if="renderer == 'checkbox'">
            <div class="terms" :class="{'has-error':errorMessages.length}" v-if="savedTerms">
                <v-checkbox :outline="showOutline" :success="success" :mandatory="required" :persistent-hint="true" :label="displayLabel" v-model="fieldModel" @change="valueChange($event, true)" :error-messages="errorMessages" :hint="field.description" :placeholder="field.placeholder" />
                <div class="conditions">{{field.params.storeData}}</div>
            </div>
            <template v-else>
                <v-checkbox :outline="showOutline" :success="success" :mandatory="required" :persistent-hint="true" :label="displayLabel" v-model="fieldModel" @change="valueChange($event, true)" :error-messages="errorMessages" :hint="field.description" :placeholder="field.placeholder" />
            </template>
        </template>
        <template v-else-if="renderer == 'number'">
            <v-text-field :outline="showOutline" :success="success" :required="required" type="number" :label="displayLabel" v-model="fieldModel" @input="valueChange" @blur="touch()" :error-messages="errorMessages" :hint="field.description" :placeholder="field.placeholder" />
        </template>
        <template v-else-if="renderer == 'datepicker'">
            <!--      <template v-slot:activator="{ on }">
                            <v-btn small v-on="on">
                                <fluro-icon library="far" icon="clock" />&nbsp;{{dateGroupFormat.title}}
                            </v-btn>
                        </template>
                        <v-list dense>
                            <v-list-tile @click="dateGroupFormat = option" v-for="option in dateGroupFormatOptions">
                                <v-list-tile-content>{{option.title}}</v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                    </v-menu> -->
            <!-- <v-dialog ref="dialog" v-model="modal" persistent :return-value.sync="fieldModel" lazy full-width width="290px"> -->
            <v-menu :fixed="true" v-model="modal" min-width="290px" :right="true" :close-on-content-click="false" transition="slide-y-transition" offset-y>
                <template v-slot:activator="{ on }">
                    <!-- :value="computedDateFormattedMomentjs"  -->
                    <!-- @focus="modal = true" -->
                    <v-text-field :outline="showOutline" :success="success" v-model="fieldModel" :persistent-hint="true" :hint="formattedDate" :label="displayLabel" prepend-inner-icon="event" readonly v-on="on"></v-text-field>
                </template>
                <v-card>
                    <v-date-picker @change="modal = false" v-model="fieldModel" no-title scrollable>
                        <v-spacer></v-spacer>
                        <!-- <v-btn flat color="primary" @click="modal = false">Cancel</v-btn> -->
                        <v-btn flat color="primary" @click="modal = false">Done</v-btn>
                    </v-date-picker>
                    <!-- <v-toolbar color="primary" dark>
                        <v-toolbar-title>{{label}}</v-toolbar-title>
                    </v-toolbar>
                    <v-date-picker v-model="sudoModel" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.dialog.save(sudoModel)">OK</v-btn>
                    </v-date-picker> -->
                </v-card>
            </v-menu>
        </template>
        <template v-else-if="renderer == 'timepicker'">
            <v-dialog ref="dialog" v-model="modal" persistent :return-value.sync="fieldModel" lazy full-width width="290px">
                <template v-slot:activator="{ on }">
                    <v-text-field :outline="showOutline" :success="success" v-model="fieldModel" :label="displayLabel" prepend-inner-icon="access_time" readonly v-on="on" @focus="modal = true"></v-text-field>
                </template>
                <v-card v-if="modal">
                    <v-toolbar color="primary" dark>
                        <v-toolbar-title>{{displayLabel}}</v-toolbar-title>
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
            <fluro-date-time-picker :outline="showOutline" :success="success" format="h:mma - dddd D MMMM YYYY" timePickerFormat="ampm" :label="displayLabel" v-model="fieldModel" @focus="modal = true" />
        </template>
        <template v-else-if="renderer == 'textarea'">
            <v-textarea :outline="showOutline" :success="success" :required="required" :label="displayLabel" v-model="fieldModel" @input="valueChange" @blur="touch()" :error-messages="errorMessages" :hint="field.description" :placeholder="field.placeholder" />
        </template>
        <template v-else-if="renderer == 'select'">
            <v-select :outline="showOutline" :success="success" :required="required" :return-object="type == 'reference'" :label="displayLabel" :chips="multipleInput" no-data-text="No options available" :multiple="multipleInput" v-model="fieldModel" item-text="title" :items="selectOptions" @blur="touch()" :error-messages="errorMessages" :hint="field.description" :placeholder="field.placeholder" />
        </template>
        <template v-else-if="renderer == 'content-select'">
            <v-input class="no-flex" :label="displayLabel" :success="success"  :required="required" :error-messages="errorMessages" :hint="field.description">
                <fluro-content-select :success="success"  :required="required" :error-messages="errorMessages" :label="displayLabel" :outline="showOutline" :hint="field.description" :placeholder="field.placeholder" :minimum="minimum" @input="touch" :type="restrictType" :maximum="maximum" v-model="model[field.key]" />
            </v-input>
        </template>
        <template v-else-if="renderer == 'search-select'">
            <v-autocomplete :outline="showOutline" :success="success" :deletable-chips="true" :hide-selected="true" prepend-inner-icon="search" :error-messages="errorMessages" :cache-items="!defaultReferences.length" :chips="multipleInput" :clearable="!required" :return-object="true" item-text="title" v-model="fieldModel" @blur="touch()" @change="valueChange" :multiple="multipleInput" :loading="loading" :items="searchResults" :search-input.sync="keywords" flat hide-no-data :label="displayLabel">
                <!-- <template v-slot:selection="{ item, selected }">
                    <v-chip close @input="removeValue(index)" :selected="selected" color="blue-grey" class="white--text">
                       
                        <span v-text="item.title"></span>
                    </v-chip>
                </template>  -->
                <template v-slot:item="{ item }">
                    <fluro-avatar class="xs" :id="item._id" type="contact"></fluro-avatar>    
                    <!-- <v-list-tile-avatar color="indigo" class="headline font-weight-light white--text"> -->
                    <!-- {{item._id}} -->
                    <!-- </v-list-tile-avatar> -->
                    <v-list-tile-content>
                        <v-list-tile-title v-text="item.title"></v-list-tile-title>
                    </v-list-tile-content>
                </template>
            </v-autocomplete>
        </template>
        <template v-else-if="renderer == 'signature'">
            <fluro-signature-field :outline="showOutline" :success="success" :label="displayLabel" v-model="fieldModel" :required="required" :error-messages="errorMessages" :hint="field.description" />
            <!-- <v-input class="no-flex" >
                <div class="signature-wrap">
                    <vue-signature-pad class="pad" ref="pad" width="100%" height="300px" />
                    <v-btn small icon @click="fieldModel = '';">
                        <v-icon>close</v-icon>
                    </v-btn>
                </div>
            </v-input> -->
        </template>
        <template v-else-if="renderer == 'code'">
            <v-card class="no-flex">
                <v-toolbar dark>
                    <v-toolbar-title>{{label}}</v-toolbar-title>
                </v-toolbar>
                <fluro-code-editor :outline="showOutline" :success="success" v-model="fieldModel" :lang="syntax" :height="200"></fluro-code-editor>
            </v-card>
        </template>
        <template v-else-if="renderer == 'wysiwyg'">
            <v-input class="no-flex" :outline="showOutline" :success="success" :required="required" :error-messages="errorMessages" :hint="field.description">
                <template v-if="multipleInput">
                    <template v-if="fieldModel.length">
                        <template v-for="(entry, index) in fieldModel">
                            <v-layout wrap row>
                                <v-flex class="vertical-center">
                                    <v-label>{{groupTitle(entry, index)}}</v-label>
                                </v-flex>
                                <v-spacer></v-spacer>
                                <v-btn icon flat color="error" v-if="canRemoveValue" @click="removeValue(index, true)">
                                    <v-icon>close</v-icon>
                                </v-btn>
                            </v-layout>
                            <fluro-editor v-model="fieldModel[index]" :options="multiEditorOptions" @input="valueChange" @blur="touch()" :placeholder="field.placeholder"></fluro-editor>
                        </template>
                    </template>
                    <template v-if="canAddValue">
                        <v-btn color="primary" @click="addValue('')">
                            {{multiLabel}} <v-icon>add</v-icon>
                        </v-btn>
                    </template>
                </template>
                <template v-if="!multipleInput">
                    <fluro-editor v-model="fieldModel" @input="valueChange" :options="editorOptions" @blur="touch()" :placeholder="field.placeholder"></fluro-editor>
                </template>
            </v-input>
        </template>
        <template v-else-if="renderer == 'upload'">
            <!-- <pre>{{model}}</pre> -->
            <v-input class="no-flex" :outline="showOutline" :success="success" :label="displayLabel" :required="required" :error-messages="errorMessages" :persistent-hint="true" :hint="fileHint">
                <div class="file-items" v-if="files.length">
                    <div class="file-item" v-for="file in files">
                        <!-- <v-progress-linear v-model="file.progress"></v-progress-linear> -->
                        <v-layout row wrap>
                            <v-flex grow>
                                <strong>{{file.name}}</strong>
                                <div class="small"><span v-if="file.state == 'progress'">Uploaded {{file.progress}}% of </span><span class="muted">{{file.size | filesize}}</span></div>
                                <!-- <pre>{{file.state}}</pre> -->
                            </v-flex>
                            <v-flex shrink>
                                <template v-if="file.state == 'error'">
                                    <v-btn icon>
                                        <v-icon>exclamation</v-icon>
                                    </v-btn>
                                </template>
                                <template v-else-if="file.state == 'complete'">
                                    <v-hover>
                                        <v-btn icon @click="removeFile(file)" slot-scope="{ hover }">
                                            <v-icon color="success" v-if="!hover">check</v-icon>
                                            <v-icon color="error" v-if="hover">close</v-icon>
                                        </v-btn>
                                    </v-hover>
                                </template>
                                <template v-else-if="file.state == 'uploading'">
                                    <v-hover>
                                        <v-btn icon @click="removeFile(file)" slot-scope="{ hover }">
                                            <v-progress-circular v-if="!hover" :value="file.progress"></v-progress-circular>
                                            <v-icon color="error" v-if="hover">close</v-icon>
                                        </v-btn>
                                    </v-hover>
                                </template>
                                <template v-else>
                                    <v-btn icon @click="removeFile(file)">
                                        <v-icon>close</v-icon>
                                    </v-btn>
                                </template>
                            </v-flex>
                        </v-layout>
                    </div>
                </div>
                <!-- <pre>{{files}}</pre> -->
                <!-- <v-progress-linear class="total-progress" color="primary" v-model="progress"></v-progress-linear> -->
                <!-- <div class="dropbox" v-show="!files.length"> -->
                <!-- accept="image/*" -->
                <label class="file-drop" v-if="canAddFile">
                    <input ref="file" type="file" :multiple="multipleInput" @change="filesSelected($event.target.files)">
                    Drag and drop or click here to select {{multipleInput ? 'files' : 'a file'}}
                </label>
                <!-- <input type="file" multiple :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length" accept="image/*" class="input-file"> -->
                <!--  <div>
                    <font-awesome-icon right :icon="['far', 'file-download']" />
                    <h1>{{event.title}}</h1>
                    <h2>{{event | readableEventDate}}</h2>
                    <p>Click or drop your photos here to continue</p>
                </div> -->
                <!-- </div> -->
                <!-- <template v-if="multipleInput">
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
                        <fluro-editor v-model="fieldModel[index]" :options="editorOptions" @input="valueChange" @blur="touch()" :placeholder="field.placeholder"></fluro-editor>
                    </template>
                </template>
                <template v-if="canAddValue">
                    <v-btn color="primary" @click="addValue('')">
                        {{multiLabel}} <v-icon>add</v-icon>
                    </v-btn>
                </template>
            </template>
            <template v-if="!multipleInput">
                <fluro-editor v-model="fieldModel" @input="valueChange" :options="editorOptions" @blur="touch()" :placeholder="field.placeholder"></fluro-editor>
            </template> -->
            </v-input>
        </template>
        <template v-else>
            <template v-if="multipleInput">
                <!--  -->
                <v-input :outline="showOutline" :label="displayLabel" :success="success" class="no-flex">
                    <template v-if="fieldModel.length">
                        <draggable v-model="fieldModel" v-bind="dragOptions" @start="drag=true" @end="drag=false">
                            <transition-group type="transition" :name="!drag ? 'flip-list' : null">
                                <div class="multi-input-row":key="entry"  v-for="(entry, index) in fieldModel">
                                    <v-flex style="padding:0 !important;">{{entry}}</v-flex>
                                    <span @click="removeValue(index, true)">Remove</span>
                                    <!--                             <fluro-icon icon="times" @click="removeValue(index, true)"/>
 -->
                                    <!-- <v-chip close @input="removeValue(index, true)">{{entry}}</v-chip> -->
                                </div>
                            </transition-group>
                        </draggable>
                    </template>
                    <template v-if="canAddValue">
                        <!-- :placeholder="field.placeholder" -->
                        <!-- <pre>{{multiLabel}}</pre> -->
                        <!--   -->
                        <v-text-field :autofocus="autofocus" class="faint" append-inner-icon="plus" :outline="showOutline" :success="success" browser-autocomplete="off" append-icon="plus" :required="required" :label="multiLabel" v-model="proposedValue" @keyup.enter.native.stop="addProposedValue()" @blur="addProposedValue()" :error-messages="errorMessages" :hint="hint" :placeholder="field.placeholder" />
                    </template>
                </v-input>
            </template>
            <template v-if="!multipleInput">
                <v-text-field :autofocus="autofocus"  :outline="showOutline" :success="success" browser-autocomplete="off" :required="required" :label="displayLabel" v-model="fieldModel" @input="valueChange" @blur="touch()" :error-messages="errorMessages" :hint="field.description" :placeholder="field.placeholder" />
            </template>
        </template>
         <!-- <pre><label>{{field.title}}</label><br/>{{model}}</pre> -->
    </div>
</template>
<script>
//Import validation options from vuelidate
import axios from 'axios';
import { validationMixin } from 'vuelidate';
import { required, minLength, maxLength, email, url } from 'vuelidate/lib/validators';
import _ from 'lodash';
import Vue from 'vue';
import FluroCompileHtml from '../FluroCompileHtml.vue';
import FluroEditor from './FluroEditor.vue';
import FluroCodeEditor from './FluroCodeEditor.vue';
import FluroSignatureField from './FluroSignatureField.vue';
import FluroDateTimePicker from './FluroDateTimePicker.vue';
import FluroContentSelect from './FluroContentSelect.vue';
//Allow custom html to be injected at runtime

import Expressions from 'expression-eval';

////////////////////////////////////////////////////////

import draggable from 'vuedraggable'

////////////////////////////////////////////////////////

export default {
    components: {
        draggable,
        FluroEditor,
        FluroCompileHtml,
        FluroCodeEditor,
        FluroSignatureField,
        FluroDateTimePicker,
        FluroContentSelect,
    },
    data() {
        return {
            drag: false,
            test: null,
            modal: false,
            model: JSON.parse(JSON.stringify(this.value)),
            // model: this.value,
            proposedValue: null,
            sudoModel: null,

            //Async searching
            keywords: '',
            results: [],
            loading: false,

            //File Uploads
            files: [],
            cancelTokens: [],
            bytesLoaded: 0,
            bytesTotal: 0,
            uploadState: 'ready',

        }
    },
    watch: {
        'keywords': _.debounce(function() {

            var self = this;
            var field = this.field;
            var keywords = self.keywords;


            //No keywords or we already know
            if (!keywords || !keywords.length) {
                return;
                // && this.querySelections(val)
            }

            ////////////////////////////////////////////////////

            if (field.allowedReferences && field.allowedReferences.length) {
                return;
            }

            ////////////////////////////////////////////////////

            // var search = self.photographerSearch;
            self.loading = true;
            //////console.log('Searching', keywords);



            var options = {
                limit: 5,
                select: 'title',
            }

            //////////////////////////////

            var restrictToType = _.get(field, 'params.restrictType');

            if (restrictToType && restrictToType.length) {
                options.types = [restrictToType]
            }



            //////////////////////////////

            // self.$fluro.api.get(`/content/contact/search/${search}`, {
            self.$fluro.content.search(keywords, options)
                .then(function(results) {

                    self.results = results; //_.map(results, 'title');
                    self.loading = false;
                })
            // .catch(function(err) {

            //     self.photographers = [];
            //     self.photographerSearching = false;
            //     // self.photographerSearch = '';
            // })



        }, 500),
        expressionDefaultValue(v) {

            //If the user has entered data into here
            //Don't make any change
            if (this.$v.model.$dirty) {
                ////console.log('Field is dirty')
                return;
            }

            //If there is a default value expression
            if (this.expressions && this.expressions.defaultValue) {
                this.fieldModel = v;
                ////console.log('Updated default value according to expression!', this.expressions.defaultValue, v);
            }
        },
        expressionValue(v) {


            if (this.expressions && this.expressions.value) {
                this.fieldModel = v;
            }

            // ////console.log('Updated value')
            // //Update this field to reconnect with the new model
            // this.model[this.key] = v[this.key];
        },
        value(val) {
            // console.log('The value has now changed', val)
            this.$set(this, 'model', val);
            return this.reset();
        }
    },
    computed: {
         dragOptions() {
            return {
                animation: 200,
                group: "description",
                disabled: false,
                ghostClass: "ghost"
            };
        },
        showOutline() {
            return this.outline || this.options.outline;
        },
        formattedDate() {
            return this.$fluro.date.formatDate(this.fieldModel, 'dddd D MMM YYYY');
        },
        restrictType() {

            if (this.field.params && this.field.params.restrictType) {
                return this.field.params.restrictType;
            }
        },
        fileHint() {
            switch (this.uploadState) {
                case 'uploading':
                    return `Uploading...`
                    break;
                default:
                    return this.field.description;
                    break;
            }
        },
        success() {

            //If we are wanting to validate success (Change to green)
            if (this.options.validateSuccess) {
                return (this.$v.$dirty && !this.$v.$invalid);
            }

        },
        editorOptions() {
            return this.options.editor;
        },
        multiEditorOptions() {
            return Object.assign({}, this.options.editor, { label: '' })
        },

        savedTerms() {
            return _.get(this.field, 'params.storeCopy');
        },
        syntax() {
            //Code entries
            return _.get(this.field, 'params.syntax');
        },
        multiLabel() {
            if (this.multipleInput) {
                if (!this.total) {
                    return `Add ${this.title}`;
                } else {
                    return `Add another ${this.title}`;
                }
            }
            return this.label

        },
        displayLabel() {

            if(!this.showLabel) {
                return;
            }

            var title = this.title || '';

            if (this.title.length) {
                if (this.required) {
                    return `${title} *`;
                } else {
                    return title;
                }
            }
        },

        hint() {

            if (this.maximum == 1) {
                return this.field.description;
            }

            if (this.minimum) {
                if (this.total < this.minimum) {
                    return `Type and press enter (${this.total} of ${this.minimum} required)`;
                }
            }

            if (this.maximum) {
                return `Type and press enter (Max ${this.maximum})`;
            }


            return `Type and press enter`;
        },
        customContext() {
            return this;
        },
        customTemplate() {
            return this.field.template;
        },
        searchResults() {

            if (this.allowedReferences && this.allowedReferences.length) {
                return this.allowedReferences;
            }

            if (this.allowedValues && this.allowedValues.length) {
                return this.allowedValues;
            }

            return this.results;
        },
        canAddFile() {
            if (this.canAddValue) {
                return true;
            }

            if (this.maximum == 1) {
                if (!this.files || !this.files.length) {
                    return true;
                }
            }
        },
        canAddValue() {

            //There is no maximum
            if (this.maximum == 0) {
                return true;
            }

            //We are under the maximum
            if (this.total < this.maximum) {
                // //////console.log(this.title, 'is under',this.total, this.maximum)
                return true;
            }

            return false;
        },
        canRemoveValue() {
            if (this.total > this.minimum) {
                return true;
            }
        },

        allowedValues() {
            return this.field.allowedValues;
        },
        allowedReferences() {
            return this.field.allowedReferences;
        },

        defaultValues() {
            return this.field.defaultValues;
        },
        defaultReferences() {
            return this.field.defaultReferences;
        },
        attributes() {
            return this.field.attributes
        },
        fieldClass() {

            var classes = [];

            //Add the renderer class
            classes.push(`fluro-content-form-field-${this.renderer}`);

            ////////////////////////////////////////////////

            switch (this.renderer) {
                case 'group':
                case 'embedded':
                    if (this.asObject || this.renderer == 'embedded') {
                        if (this.multipleInput) {
                            classes.push(`multiple-input`);
                        }
                    }
                    break;
            }

            ////////////////////////////////////////////////

            classes.push(this.className);

            ////////////////////////////////////////////////

            return classes.join(' ');
        },
        groupClass() {
            if (this.type == 'group' || this.type == 'embedded') {
                return `${this.className}`;
            }
        },

        fieldModel: {
            get() {
                return this.model[this.key]
            },
            set(value) {
                // /this.model[this.key] = value;
                this.$set(this.model, this.key, value);
                this.valueChange();
            }
        },
        addLabel() {
            if (this.total) {
                return `Add another ${this.title}`
            } else {
                return `Add ${this.title}`
            }
        },
        className() {

            String.prototype.replaceAll = function(search, replacement) {
                var target = this;
                return target.split(search).join(replacement);
            };



            return (this.field.className || '')
                .replaceAll('col-xs-', 'xs')
                .replaceAll('col-sm-', 'sm')
                .replaceAll('col-md-', 'md')
                .replaceAll('col-lg-', 'lg')
                .replaceAll('col-xl-', 'xl')
        },
        key() {
            return this.field.key;
        },

        asObject() {
            return this.field.asObject;
        },
        fields() {
            return this.field.fields;
        },
        officeUseOnly() {
            return _.get(this.field, 'params.disableWebform');
        },
        type() {
            return this.field.type;
        },
        expressions() {
            return this.field.expressions;
        },
        errorTitle() {
            return this.field.title;
        },
        title(force) {


            //Check if 
            if (this.options.labels && this.options.labels.hasOwnProperty(this.key)) {
                return this.options.labels[this.key];
            }



            return this.field.title;

        },
        multipleInput() {
            return this.maximum === 0 || this.maximum > 1;
        },
        selectOptions() {

            var self = this;

            ////////////////////////////////////////

            if (!self.field) {
                return [];
            }

            ////////////////////////////////////////

            if (self.field.options && self.field.options.length) {
                return _.map(self.field.options, function(option) {
                    option.title = option.name;
                    return option;
                });
            }

            ////////////////////////////////////////

            if (self.allowedReferences) {
                return self.allowedReferences;
            }

            ////////////////////////////////////////

            if (self.allowedValues) {
                return self.allowedValues;
            }



            ////////////////////////////////////////

            return [];
        },
        minimum() {
            return Math.max(parseInt(this.field.minimum), 0);
        },
        maximum() {
            return parseInt(this.field.maximum);
        },
        total() {
            if (this.multipleInput && this.fieldModel) {
                var total = _.get(this.fieldModel, 'length');
                // //////console.log('COUNT>', this.title, total);
                return total
            }
        },
        askCount() {
            return Math.max(this.minimum, this.field.askCount);
        },
        errorMessages() {

            // console.log('Compile errors', this.title, this.$v.model.$dirty);
            var self = this;
            const errors = []

            // return ['Errors on purpose'];


            //Hasn't been touched yet
            if (!this.$v.model.$dirty) {
                // console.log('Not dirty', this.title)
                return errors;
            }



            if (!this.$v.uploading) {
                if (self.uploadState == 'uploading') {
                    errors.push('Waiting for files to upload');
                    return errors;
                }
            }

            ////////////////////////////////////////////

            //If the value requires a certain amount of answers
            if (!this.$v.model.validateInput) {



                if (this.proposedValue) {
                    _.each(checkValidInput(self, this.proposedValue), function(err) {
                        errors.push(err);
                    });
                }


                //Include any errors for invalid or bad input
                _.each(checkValidInput(this, self.fieldModel), function(err) {
                    errors.push(err);
                });

                ///////////////////////////////////////////

                var valueType = 'answer';

                if (self.directive == 'upload') {
                    valueType = 'file';
                }

                ///////////////////////////////////////////

                //If we require a set amount of answers
                if (this.minimum == this.maximum) {

                    //If there is a minimum
                    if (this.minimum) {

                        //If it's one
                        if (this.minimum == 1) {
                            errors.push('This field is required');
                        } else {
                            //If its more than 1
                            errors.push(`Please provide ${this.minimum} ${valueType}s`);
                        }
                    }

                } else {

                    //We require one ${valueType}
                    if (this.maximum == 1) {
                        errors.push('This field is required');
                    } else {

                        var isArray = Array.isArray(this.model[this.key])

                        if (!isArray) {
                            errors.push(`Requires at least ${this.minimum} ${valueType}s`)
                        }

                        //Get how many ${valueType}s were provided
                        var numberOfAnswersProvided = (this.model[this.key] || '').length;

                        //If not enough to meet the minimum were provided
                        if (numberOfAnswersProvided < this.minimum) {

                            //If the minimum required is 1
                            if (this.minimum == 1) {
                                errors.push(`Requires at least 1 ${valueType}`)
                            } else {
                                //Provide at least X ${valueType}s
                                //
                                console.log('ANSWERS IS', numberOfAnswersProvided, this.minimum, this.maximum)
                                errors.push(`Please provide at least ${this.minimum} ${valueType}s`)
                            }
                        }

                        //If we are over the maximum
                        if (numberOfAnswersProvided > this.maximum) {
                            errors.push(`Maximum ${this.maximum} ${valueType}s`);
                        }
                    }
                }




            }



            ///////////////////////////////////////////

            //If there is a custom error message
            if (this.field.errorMessage && this.field.errorMessage.length) {
                if (errors.length) {
                    return [this.field.errorMessage];
                }
            }

            ///////////////////////////////////////////

            return errors
        },
        renderer() {

            //Get the widget defined on the data object
            var dataType = this.type;
            var directive = this.field.directive;


            switch (directive) {
                case 'dob-select':
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
                case 'select':
                case 'upload':
                case 'embedded':
                    break;
                case 'button-select':

                case 'order-select':
                    directive = 'select';
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
                        case 'reference':
                            directive = 'content-select';
                            break;
                    }
                    break;


            }


            //Return the basic data type by default
            return directive;
        }
    },
    methods: {
        clear() {
            this.fieldModel = null;
            this.reset()
        },
        reset() {
            //Clear files
            this.files = [];
            this.$v.$reset();
        },
        removeFile(file) {

            var self = this;

            //If the file is halfway through uploading
            if (file.cancelToken) {
                //Cancel the file
                file.cancelToken.cancel('Operation canceled by the user.');
            }

            //////////////////////////////////

            //Remove it from the list
            self.files.splice(self.files.indexOf(file), 1);
            self.mapFilesToValues();


            //If it's currently uploading
            if (file.state == 'uploading') {
                self.uploadNextFile();
            }


        },
        filesSelected(list) {

            var self = this;

            //Mark that we've touched the field
            self.touch();

            if (!list.length) return;



            /////////////////////////////////////////

            //Update our files list
            var newFiles = _.map(list, function(file) {
                return {
                    file,
                    data: {},
                    name: file.name,
                    size: file.size,
                }
            })


            //Update the files
            self.files = _.chain(self.files.concat(newFiles))
                .compact()
                .uniqBy(function(file) {
                    return file.name;
                })
                .value();


            if (self.maximum) {
                self.files = self.files.slice(0, self.maximum);
                //console.log('Cropped to', self.files.length);
            }

            //Clear out the files
            this.$refs.file.value = null

            return self.uploadNextFile();
        },
        upload(file) {

            var self = this;

            switch (file.state) {
                case 'complete':
                case 'uploading':
                    //Stop here if it's already in uploading or complete
                    return;
                    break;
                default:
                    break;
            }

            /////////////////////////////////////////////

            //Change the state to uploading
            file.state = 'uploading';

            //Create a new form object
            var formData = new FormData();
            var jsonData = {};

            /////////////////////////////////////////////

            //Include the tags
            // jsonData.definition = 'photo';
            // jsonData.tags = file.tags;

            //Data
            // var data = file.data || {}

            //Link the photo to the event
            // data.event = self.$route.params.id
            // data.photographer = self.$fluro.utils.getStringID(data.photographer) || null;
            // jsonData.data = data;


            //Include the realms
            // jsonData.realms = this.realms;

            /////////////////////////////////////////////

            //Add the JSON data and the binary file data
            // formData.set('json', JSON.stringify(jsonData));
            formData.append('file', file.file, file.name)

            /////////////////////////////////////////////

            self.$forceUpdate();

            var body = formData;
            var config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {

                    let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
                    // do whatever you like with the percentage complete
                    // maybe dispatch an action that will update a progress bar or something
                    file.progress = percentCompleted;
                    file.bytesLoaded = progressEvent.loaded;
                    file.bytesTotal = progressEvent.total;

                    ///////////////////////////////////////////////////

                    //Update the bytes loaded from all the files in the array
                    self.bytesLoaded = _.reduce(self.files, function(set, file) {
                        if (file.state == 'complete') {
                            set += file.size || file.bytesTotal || 0;
                        } else {
                            set += file.bytesLoaded || 0;
                        }
                        return set;
                    }, 0)

                    ///////////////////////////////////////////////////

                    self.$forceUpdate();
                }
            };

            ///////////////////////////////////////////////////

            const CancelToken = axios.CancelToken;
            const source = CancelToken.source();
            config.cancelToken = source.token;
            file.cancelToken = source;

            //Set headers to undefined content type
            config.headers = {
                'Content-Type': undefined
            }



            ///////////////////////////////////////////////////

            //console.log('Get the upload realm id', self.field);
            var uploadRealmID = _.chain(self.field)
                .get('params.realm')
                .first()
                .value();

            ///////////////////////////////////////////////////


            //If we can't upload to a realm
            if (!uploadRealmID) {
                //Then fail here
                file.state = 'error';
                self.uploadNextFile();
            }

            ///////////////////////////////////////////////////

            console.log('Uploading to ', self.field.params)
            return this.$fluro.api.post(`/file/attach/${uploadRealmID}`, body, config)
                .then(function(res) {
                    //console.log('UPLOAD RESPONSE', res);
                    file.state = 'complete';
                    file.result = res.data;
                    file.attachmentID = res.data._id;
                    file.cancelToken = null;
                    self.uploadNextFile();
                })
                .catch(function(err) {
                    //console.log('UPLOAD Error', err);
                    file.state = 'error';
                    file.cancelToken = null;
                    self.uploadNextFile();
                });

        },
        uploadNextFile() {

            var self = this;
            self.uploadState = 'uploading';

            ///////////////////////////////////////////

            //Find the next file that can be uploaded
            var nextFile = _.find(self.files, function(file) {
                switch (file.state) {
                    case 'complete':
                    case 'error':
                        return;
                        break;
                    default:
                        return true;
                        break;
                }
            })

            ///////////////////////////////////////////

            if (nextFile) {
                self.upload(nextFile);
            } else {
                self.uploadState = 'ready';
            }

            ///////////////////////////////////////////

            self.mapFilesToValues();


            ///////////////////////////////////////////

        },
        mapFilesToValues() {
            var self = this;

            var mapField = 'result'; //'attachmentID';

            if (self.multipleInput) {
                self.fieldModel = _.map(self.files, mapField);
            } else {
                self.fieldModel = _.chain(self.files)
                    .first()
                    .get(mapField)
                    .value();
            }

            self.$forceUpdate();
        },


        resolveExpression(expression) {

            var self = this;

            //Create a context model
            var context = {
                data: self.model,
                interaction: self.model,
                model: self.parent,
                Math: Math,
                String: String,
                Array: Array,
                //Include helper function
                matchInArray: this.$fluro.matchInArray,

            }

            var ast;
            var result;

            try {
                ast = Expressions.parse(expression);
                result = Expressions.eval(ast, context);
            } catch (err) {
                // console.log(expression, result);
            } finally {
                return result;
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

            return `${this.title} ${index+1}`
        },
        includesValue(value) {
            return _.includes(this.fieldModel, value);
        },
        addProposedValue() {

            var self = this;
            var proposedValue = this.proposedValue;

            //Touch the field
            self.touch();

            if (!self.canAddValue) {
                return;
            }

            if (!proposedValue || proposedValue == '') {
                return;
            }

            ////////////////////////////

            //Check to see if the input is valid
            var errors = checkValidInput(self, proposedValue)
            if (errors.length) {
                //////console.log('Bad Data!', errors)
                return;
            }

            ////////////////////////////

            if (!self.includesValue(proposedValue)) {
                self.addValue(proposedValue);
            }

            self.proposedValue = null;

        },
        addValue(value) {


            // this.fieldModel.push(value);
            // //////console.log('Add', this.fieldModel, this.maximum);
            // 
            //THIS WORKS BUT COMPUTED PROPERTIES BELOW DONT
            // if(this.fieldModel.length >= this.maximum) {
            //     return;
            // }
            // this.$set(this.model, this.field.key, [value]);


            // if (this.total < this.maximum) {
            if (this.canAddValue) {
                this.fieldModel.push(value);
                //////console.log('ADD VALUE NOW', this.fieldModel)
                // Vue.set(this.fieldModel, this.total, value);
                this.valueChange();
            }
        },
        removeValue(index, forceAllow) {
            if ((this.canRemoveValue || forceAllow) && this.fieldModel) {
                this.fieldModel.splice(index, 1);
                this.valueChange();
            }
        },
        touch() {
            this.$v.model.$touch()
        },
        valueChange(event, setTouched) {

            var self = this;

            if (setTouched) {
                self.touch()
            }


            // if(self.multipleInput) {
            //     //We need to update reactivity
            //     _.each(self.fieldModel, function(entry, index) {
            //         Vue.set(self.model, `${this.key}[${index}]`, entry);
            //     });
            // }

            // if(event) {
            //     self.fieldModel = event;
            // }

            self.$emit('input', self.model);//JSON.parse(JSON.stringify(self.model))); //[self.key])

        }
    },
    created() {

        if (this.multipleInput) {
            switch (this.type) {
                case 'reference':
                    this.results = (this.defaultReferences || []).slice();
                    break;
                default:
                    this.results = (this.defaultValues || []).slice();
                    break;
            }

            console.log('Setting results to ', this.results);
        }

        ////////////////////////////////////////////

        if (this.type == 'group' && !this.asObject) {
            //Do nothing
        } else {
            if (this.formFields) {
                this.$set(this.formFields, this.formFields.length, this);
            }
        }


        ////////////////////////////////////////////

        //Emit itself being created
        this.$emit('created', this);
    },
    beforeDestroy() {
        if (this.formFields) {
            this.formFields.splice(this.formFields.indexOf(this), 1);
        }
    },
    props: {
        // 'parent':{
        //     type:Object,
        // },
        'autofocus':{
            type:Boolean,
        },
        'outline': {
            type: Boolean,
        },
        'showLabel': {
            type: Boolean,
            default:true,
        },

        'formFields': {
            type: Array,
        },
        'field': {
            type: Object,
        },
        'value': {
            required: true,
        },
        'options': {
            default: function() {
                return {}
            },
            type: Object,
        },
    },

    asyncComputed: {
        required: {
            default: false,
            get() {
                var self = this;
                var value = false;

                //If there is a minimum
                if (self.minimum) {
                    return Promise.resolve(true);
                }

                if (this.expressionRequired) {

                    return Promise.resolve(true);
                }

                return Promise.resolve(false);

            }
        },
        isVisible: {
            get() {
                var isHidden = this.expressionHideGroup || this.expressionHide;
                return Promise.resolve(!isHidden);
            }
        },
        expressionValue: {
            get() {
                var self = this;
                //There is no hidden expression
                if (!self.expressions || !self.expressions.value || !self.expressions.value.length) {
                    return Promise.resolve();
                }

                var value = this.resolveExpression(self.expressions.value);
                return Promise.resolve(value);
            }

        },

        expressionDefaultValue: {
            get() {
                var self = this;
                //There is no hidden expression
                if (!self.expressions || !self.expressions.defaultValue || !self.expressions.defaultValue.length) {
                    return Promise.resolve();
                }

                var value = this.resolveExpression(self.expressions.defaultValue);
                return Promise.resolve(value);
            }

        },
        expressionRequired: {
            default: false,
            get() {
                var self = this;
                var value = false;

                //There is no hidden expression
                if (!self.expressions || !self.expressions.required || !self.expressions.required.length) {
                    return Promise.resolve(false);
                }
                value = this.resolveExpression(self.expressions.required);
                return Promise.resolve(value);
            }

        },
        expressionHide: {
            default: false,
            get() {
                var self = this;
                var value = false;

                //There is no hidden expression
                if (!self.expressions || !self.expressions.hide || !self.expressions.hide.length) {
                    return Promise.resolve(false);
                }
                value = this.resolveExpression(self.expressions.hide);
                return Promise.resolve(value);
            }

        },
        expressionHideGroup: {
            default: false,
            get() {

                var self = this;
                var value = false;

                if (!self.field.hideExpression || !self.field.hideExpression.length) {
                    return value;
                }


                value = this.resolveExpression(self.field.hideExpression);


                // self.field.hideExpression, self.model) //err);

                return Promise.resolve(value);


            },
        },
    },

    mixins: [validationMixin],
    beforeCreate: function() {
        this.$options.components.FluroContentForm = require('./FluroContentForm.vue').default;
        this.$options.components.FluroContentFormField = require('./FluroContentFormField.vue').default;
    },
    validations: {
        model: {
            validateInput,
            uploading: function(source, vm) {

                if (vm.uploadState == 'uploading') {
                    return false;
                }

                //console.log('UPLOAD IS VALID', source, vm);
                return true;
            },
        }
    },

}


////////////////////////////////////////////////////////

/**
 * Check if a numeric input matches the required minimum/maximum values
 * @param  {String|Number} input        The Number to check
 * @param  {Number|Float|Integer} minimumValue The minimum to check
 * @param  {Number|Float|Integer} maximumValue The maximim to check
 * @param  {String} numberType   The type of number to check, 'number','float' or 'integer'
 * @return {String}              The error message (if the number is invalid)
 */
function checkNumericInputError(input, minimumValue, maximumValue, numberType) {

    var parseFunction = Number;

    switch (numberType) {
        case 'integer':
            parseFunction = parseInt;
            break;
        case 'float':
        case 'decimal':
            parseFunction = parseFloat;
            break;
    }

    if (typeof input != 'undefined') {
        input = parseFunction(input);
    }

    if (typeof minimumValue != 'undefined') {
        minimumValue = parseFunction(minimumValue);
        if (input < minimumValue) {
            return `Must be at least ${minimumValue}`
        }
    }

    if (typeof maximumValue != 'undefined') {
        maximumValue = parseFunction(maximumValue);
        if (input > maximumValue) {
            return `Must be less than ${maximumValue}`
        }
    }
}



////////////////////////////////////////////////////////


//Validate the amount of answers
function validateInput(source, vm) {

    var value = source[this.key];
    var minimum = vm.minimum; //Math.max(parseInt(this.field.minimum), 0);
    var maximum = vm.maximum; //parseInt(this.field.maximum);
    var isArray = Array.isArray(value);

    if (this.proposedValue) {
        var badDataErrors = checkValidInput(vm, this.proposedValue);
        if (badDataErrors.length) {
            return false;
        }
    }

    //////////////////////

    //There is no minimum
    if (!minimum && !value) {
        ////////console.log('No minimum!')
        return true;
    }

    //////////////////////

    //We require an answer from here on out

    //Maximum answer of 1
    if (maximum == 1) {

        if (value) {
            ////////console.log(`Required answer was provided`)
            return !checkValidInput(vm, value).length;
        } else {
            ////////console.log('Requires an answer but none provided');
            return false;
        }
    }

    //////////////////////

    //We need value to be an array at this point
    if (!isArray) {
        ////////console.log(`Requires ${minimum} answer but value is not an array`)
        return false;
    }

    //////////////////////
    var numberOfAnswersProvided = (value || '').length;

    if (numberOfAnswersProvided < minimum) {
        return false;
    }

    if (numberOfAnswersProvided > maximum) {
        return false;
    }


    var badData = _.some(value, function(input) {
        return checkValidInput(vm, input).length;
    });

    if (badData) {
        return false;
    }

    //////////////////////

    //If we get here then it's valid
    return true;

}




//////////////////////////////////////////////

function checkValidInput(self, input) {

    var errors = [];


    //Now validate the input
    // var input = self.fieldModel;
    var dataType = self.type;

    //Numeric Validators
    var isNumberType;
    var minimumValue = _.get(self.field, 'params.minValue');
    var maximumValue = _.get(self.field, 'params.maxValue');

    ////////////////////////////////////////

    switch (dataType) {
        case 'email':

            if (!email(input)) {
                errors.push('Must be a valid email');
            }

            break;
        case 'url':

            if (!url(input)) {
                errors.push(`Must be a valid url eg. https://...`);
            }

            break;
        case 'boolean':

            if (self.minimum) {
                if (!input) {
                    errors.push('This is required')
                }
            }
            break;
        case 'integer':
        case 'decimal':
        case 'float':
        case 'number':
            isNumberType = true;

            var numberised = Number(input);
            var isActualNumber = (_.isFinite(numberised) && !_.isNaN(numberised));
            if (!isActualNumber) {
                errors.push(`${input} is not a valid number!`)
            }

            var numberError = checkNumericInputError(input, minimumValue, maximumValue, dataType);
            if (numberError) {
                errors.push(numberError);
            }
            break;
    }

    ////////////////////////////////////////

    return errors;
}
</script>
<style lang="scss">
.fluro-content-form-field {

    .multi-input-row {
        display: flex;
        padding: 5px 10px;
        align-items: center;
        border-bottom: 1px solid rgba(#000, 0.1);
        background: #fff;// rgba(#000, 0.1);
        border-radius: 5px;
        margin-bottom:4px;


        svg,
        span {
            opacity: 0;
            cursor: pointer;
        }

        &:hover {

            svg,
            span {
                opacity: 0.5;
            }
        }


        span {
            font-style: italic;
            font-size: 0.8em;
        }

        // align-items: center;
        // justify-content:center;
        // padding: 5px;
        // border-bottom: 1px solid rgba(#000, 0.05);

        // span {
        //     opacity: 0;
        //     float: right;
        //     font-style: italic;
        //     opacity: 0.5;
        //     font-size: 0.8em;
        //     cursor: pointer;
        // }

        // &:hover {
        //     span {

        //         opacity: 0.5;
        //     }
        // }
    }

    .file-drop {
        display: block;
        position: relative;
        border: 1px dashed rgba(#000, 0.2);
        background: rgba(#000, 0.05);
        padding: 10px;
        border-radius: 10px;
        text-align: center;
        min-height: 60px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8;
        font-style: italic;
        color: rgba(#000, 0.5);
        margin-bottom: 5px;

        &:hover,
        &:focus,
        &:active {
            background: #fff;
        }


        input {
            display: block;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            opacity: 0; //.8; //.5;
            // background: #000;
            /* invisible but it's there! */
            width: 100%;
            height: 100%;
            // height: 200px;
            position: absolute;
            cursor: pointer;
        }

    }

    .file-items {

        margin-bottom: 15px;

        .file-item {
            position: relative;
            padding: 5px 5px 5px 15px;
            border: 1px solid rgba(#000, 0.2);
            border-bottom: none;
            background: #fff;
            font-size: 0.9em;

            &:first-child {
                border-radius: 5px 5px 0 0;
            }

            &:last-child {
                border-bottom: 1px solid rgba(#000, 0.2);
                border-radius: 0 0 5px 5px;
            }
        }
    }

    .vertical-center {
        display: flex;
        align-items: center;
        min-height: 36px;
    }

    &.fluro-content-form-field-group.multiple-input {
        margin-bottom: 50px;
    }

    .no-flex {
        &>.v-input__control>.v-input__slot {
            display: block;
            margin: 0;
        }
    }

    .v-sheet {
        margin-bottom: 15px;
    }

    .v-toolbar__content {
        height: 40px !important;
        padding-right: 5px;
    }

    .v-toolbar__title {
        letter-spacing: -0.03em;
    }

    .fluro-editor .fluro-editor-textarea>div {
        min-height: 200px;
    }

    .faint {
        .v-label {
            font-weight: 400 !important;
            opacity: 0.5;
            font-style: italic;
        }
    }

    .terms {

        padding: 15px 15px;
        background: rgba(#000, 0.05);
        border-radius: 3px;
        margin-top: 16px;

        &.has-error {
            background: rgba(#ff5252, 0.05)
        }

        &>.v-input {
            margin-top: 0 !important;
        }

        .conditions {
            margin-top: 10px;
            font-size: 0.9em;
            opacity: 0.8;

            font-style: italic;
        }
    }



    &.right-messages /deep/ {
        .v-text-field__details {
            text-align:right;
        }
    }
}
</style>