<template>
    <flex-column>
        <flex-row>
            <flex-column class="fields-list">
                <flex-column-header>
                    <div class="palette-title">
                        <v-layout align-center>
                            <v-flex>
                                <strong label>Fields</strong>
                            </v-flex>
                        </v-layout>
                    </div>
                </flex-column-header>
                <flex-column-body>
                    <div class="fields-tree">
                        <template v-if="hasDefaultFields">
                            <v-container pt-0 px-0>
                                <v-layout align-center class="pb-1">
                                    <v-flex>
                                        <label>Default Fields</label>
                                    </v-flex>
                                    <v-spacer />
                                    <!-- <v-flex shrink>
                                        <v-menu :right="true" :close-on-content-click="false" transition="slide-y-transition" offset-y>
                                            <template v-slot:activator="{ on }">
                                                <v-btn icon small class="ma-0" v-on="on">
                                                    <fluro-icon icon="cog" />
                                                </v-btn>
                                            </template> 
                                            <v-container style="background: #fff;" pa-2>
                                                
                                            </v-container>
                                        </v-menu>
                                    </v-flex> -->
                                </v-layout>
                                <div class="default-field" v-if="askFirstName">
                                    {{requireFirstName ? 'Require First Name' : 'Ask First Name'}}
                                </div>
                                <div class="default-field" v-if="askLastName">
                                    {{requireLastName ? 'Require Last Name' : 'Ask Last Name'}}
                                </div>
                                <div class="default-field" v-if="askGender">
                                    {{requireGender ? 'Require Gender' : 'Ask Gender'}}
                                </div>
                                <div class="default-field" v-if="askDOB">
                                    {{requireDOB ? 'Require Date of Birth' : 'Ask Date of Birth'}}
                                </div>
                                <div class="default-field" v-if="askEmail">
                                    {{requireEmail ? 'Require Email Address' : 'Ask Email Address'}}
                                </div>
                                <div class="default-field" v-if="askPhone">
                                    {{requirePhone ? 'Require Phone' : 'Ask Phone'}}
                                </div>
                            </v-container>
                            <div class="pb-1">
                                <label>Custom Fields</label>
                            </div>
                        </template>
                        <draggable class="field-editor-children" handle=".handle" element="ul" v-model="model" :options="treeOptions">
                            <fluro-field-editor-item :parent="model" :leaf="model[index]" :selected="field" :select="clicked" @duplicate="duplicateField" @injected="injectField" @deleted="deleteField" v-for="(leaf, index) in model" :key="leaf.guid" />
                            <!-- <page-tree-item :maxDepth="2" :leaf="site.routes[index]" :select="clickedRoute"   /> -->
                        </draggable>
                    </div>
                </flex-column-body>
                <flex-column-footer class="border-top">
                    <v-container class="pa-2" style="background: #fff">
                        <v-layout>
                            <v-flex>
                                <v-btn small class="ma-0" color="primary" block @click="addNewField()">
                                    New Field
                                    <fluro-icon icon="plus" right />
                                </v-btn>
                            </v-flex>
                            <v-spacer />
                            <v-flex>
                                <v-btn small class="ma-0" block @click="addNewField('group')">
                                    New Group
                                    <fluro-icon icon="folder" right />
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </flex-column-footer>
            </flex-column>
            <flex-column class="field-options" v-if="field">
                <flex-column-header>
                    <div class="palette-title">
                        <v-layout align-center>
                            <v-flex>
                                <strong label>{{field.title || 'Untitled field'}}</strong>
                            </v-flex>
                            <v-spacer />
                            <v-flex shrink @click="deselectField()">
                                <fluro-icon icon="angle-left" />
                            </v-flex>
                        </v-layout>
                    </div>
                </flex-column-header>
                <!-- <flex-column-body> -->
                <fluro-field-edit @reset="resetPreview()" :expressionFields="model" v-model="field" />
                <!-- <pre>{{field}}</pre> -->
                <!-- </flex-column-body> -->
                <!-- <pre>{{field}}</pre> -->
            </flex-column>
            <flex-column class="preview" v-if="showPreview">
                <flex-column-header>
                    <div class="palette-title">
                        <v-layout align-center>
                            <v-flex>
                                <strong label>Form Preview</strong>
                            </v-flex>
                        </v-layout>
                    </div>
                </flex-column-header>
                <flex-column-body>
                    <v-container v-if="resetting">
                        <fluro-page-preloader contain />
                    </v-container>
                    <v-container v-else>
                        <constrain sm v-if="formMode">
                           
                            <fluro-interaction-form :title="item.title" :definition="fauxDefinition" :paymentIntegration="paymentIntegration" :debugMode="true" v-model="previewModel" ref="previewForm" :fields="model">
                                <template v-slot:info>
                                        <h1>{{displayTitle}}</h1>
                                     <fluro-compile-html :template="publicData.body" :context="item" />
                                </template>
                                <template v-slot:success v-if="publicData.thankyou">
                                    <div v-html="publicData.thankyou" />
                                </template>
                            </fluro-interaction-form>
                        </constrain>
                        <constrain sm v-else>
                            <fluro-content-form v-model="previewModel" ref="previewForm" :fields="model" />
                        </constrain>
                    </v-container>
                </flex-column-body>
                <flex-column-footer class="border-top">
                    <v-container class="pa-2" style="background: #fff">
                        <v-layout>
                            <v-flex>
                                <v-btn small class="ma-0" block :loading="resetting" @click="resetPreview()">
                                    Reset Preview
                                    <fluro-icon icon="undo" right />
                                </v-btn>
                            </v-flex>
                            <v-spacer />
                            <!--  <v-flex>
                                <v-btn small class="ma-0" block :loading="resetting" @click="resetPreview()">
                                    Reset Preview
                                    <fluro-icon icon="undo" right />
                                </v-btn>
                            </v-flex> -->
                        </v-layout>
                    </v-container>
                </flex-column-footer>
            </flex-column>
        </flex-row>
    </flex-column>
</template>
<script>
import draggable from 'vuedraggable';
import FluroFieldEditorItem from './FluroFieldEditorItem.vue';
import FluroFieldEdit from './FluroFieldEdit.vue';
import FluroContentForm from '../form/FluroContentForm.vue';
import FluroInteractionForm from '../form/FluroInteractionForm.vue';
import FluroCompileHtml from '../FluroCompileHtml.vue';

export default {
    components: {
        draggable,
        FluroFieldEditorItem,
        FluroFieldEdit,
        FluroContentForm,
        FluroInteractionForm,
        FluroCompileHtml,
    },
    props: {
        'value': {
            type: Array,
            default () {
                return [];
            }
        },
        'item': {
            type: Object,
        },
    },
    created() {

        var self = this;

        /////////////////////////////

        function recursiveGUID(fields) {
            _.each(fields, function(field) {
                if (!field.guid) {
                    field.guid = self.$fluro.utils.guid();
                }

                recursiveGUID(field.fields);
            })
        }

        /////////////////////////////

        recursiveGUID(self.model);
    },
    computed: {
        displayTitle() {
            var self = this;
            return self.publicData.title || self.item.title;
        },
        formMode() {

            return this.item.definition == 'form' || this.item.parentType == 'interaction';
        },
        showPreview() {
            return !this.field || this.$vuetify.breakpoint.mdAndUp
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
            return this.formOptions.allowAnonymous || false
        },

        disableDefaultFields() {
            return this.formOptions.disableDefaultFields || false
        },
        requireDefaultContactFields() {
            return !this.allowAnonymous && !this.disableDefaultFields;
        },

        ////////////////////////////////

        askFirstName() {
            return this.requireDefaultContactFields || this.formOptions.askFirstName || this.formOptions.requireFirstName;
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
            return this.formOptions.askEmail || this.requireEmail || (this.requireDefaultContactFields);
        },
        askPhone() {
            return this.formOptions.askPhone || this.requirePhone || (this.requireDefaultContactFields); // && this.identifier == 'either');
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
        hasDefaultFields() {
            var self = this;

            if (self.item.parentType != 'interaction') {
                return;
            }

            //Check if we have the defaults turned off
            if (self.requireDefaultContactFields) {
                return true;
            }


            return self.askFirstName || self.askLastName || self.askGender || self.askDOB || self.askEmail || self.askPhone
        },
        fauxDefinition() {
            var self = this;
            return Object.assign({}, self.item, { fields: self.model });
        },
        publicData() {
            var self = this;
            return self.item && self.item.data ? self.item.data.publicData : {}
        },
        paymentIntegration() {

            var self = this;

            if (!self.publicData.paymentGateways || !self.publicData.paymentGateways.length) {
                return;
            }

            return _.first(self.publicData.paymentGateways);

        },
    },
    methods: {
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
            setTimeout(function() {
                self.previewModel = {};
                self.resetting = false;
            }, 10);


        },
        getNewField(type) {
            var self = this;

            var field;

            switch (type) {
                case 'group':

                    field = {
                        title: 'New Group',
                        key: 'newgroup',
                        type: 'group',
                        fields: [],
                        _activate: true,
                        guid: self.$fluro.utils.guid(),
                        minimum: 1,
                        maximum: 1,
                        askCount: 1,
                        asObject: false,
                    }

                    break;
                default:

                    field = {
                        title: 'New Field',
                        key: '',
                        type: 'string',
                        directive: 'input',
                        minimum: 0,
                        maximum: 1,
                        _activate: true,
                        guid: self.$fluro.utils.guid(),
                        params: {},
                        defaultValues: [],
                        defaultReferences: [],
                    }

                    break;
            }


            return field;
        },
        addNewField(type) {
            var self = this;


            var newField = self.getNewField(type);

            //If there is no field selected
            //we just add the field in at the end of the current form
            if (!self.field) {
                self.model.push(newField)
                self.field = newField;
                return;
            }

            ///////////////////////////////////////

            //Check if it's a container field
            if (self.field.type == 'group' || self.field.directive == 'embedded') {
                if (!self.field.fields) {
                    self.$set(self.field, 'fields', []);
                }

                //Add the new field into this container
                self.field.fields.push(newField);
                //And select the field
                self.field = newField;
                return;
            }

            ///////////////////////////////////////

            //Here we want to find where the current selected field is
            //so we can add it in underneath the current selected field
            var { parent, index } = self.findSelectedParent();

            if (!parent) {
                parent = self.model;
            }

            if (index == -1) {
                parent.push(newField)
            } else {
                parent.splice(index + 1, 0, newField)
            }

            ///////////////////////////////////////

            self.field = newField;
        },
        injectField(field, parent) {
            var self = this;

            var newField = self.getNewField();
            var index = parent.indexOf(field);


            console.log('Inject at', index, parent)
            parent.splice(index + 1, 0, newField);
            self.field = newField;
        },
        clicked(item) {
            // console.log('Select', item);
            var self = this;
            self.field = item;
        },
        findSelectedParent() {
            var self = this;
            var parent;
            var index = -1;
            var needle = self.field;

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

            ///////////////////////////////////////

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
            copy.guid = self.$fluro.utils.guid();
            parent.splice(index + 1, 0, copy);

            //Seld the first field
            self.field = copy;

            // //If it's not a folder then select this route
            // if (field.type != 'folder') {
            //     this.route = copy;
            // }

        },
        deleteField(field, parent) {

            console.log('PARENT', parent)
            // var parent = this.findFieldParent(field);

            if (!parent) {
                return;
            }

            var index = parent.indexOf(field);
            parent.splice(index, 1);

            //Deselect if we have it currently selected
            if (this.field == field) {
                this.field = null
            }


        },
    },
    data() {
        return {
            treeOptions: {
                animation: 1,
                group: 'fields',
                // disabled: !this.editable,
                ghostClass: 'ghost'
            },
            model: this.value,
            resetting: false,
            previewModel: {},
            field: null,
        }
    }
}
</script>
<style lang="scss" scoped>
.fields-list {
    width: 300px;

    flex: none;
    background: #eee;
    @extend .border-right;
}

.default-field {
    border: 1px solid rgba(#000, 0.1);
    padding: 5px;
    margin-bottom: 2px;
    border-radius: 3px;
    background: #eee;
}

.palette-title {
    text-transform: uppercase;
    ;
    letter-spacing: 0.03em;
    font-weight: 500;
    padding: 5px;
    font-size: 10px;
    @extend .border-bottom;
    background: #eee;
}



.preview {
    // border: 2px solid #ddd;
    background: #fff;
    min-width: 300px;
    flex: 2;
}

.fields-tree {
    padding: 10px;

    label {
        text-transform: uppercase;
        ;
        font-weight: 500;
        letter-spacing: 0.03em;
        font-size: 0.8em;
        margin-bottom: 5px;
    }
}

.field-options {
    min-width: 380px;
    flex: 1;
    background: #fafafa;
    @extend .border-right;
}
</style>