<template>
    <div class="fluro-content-form" v-if="ready && model">
        
        <slot name="form" :parent="formModel" :context="context" :form-fields="formFields" :field-hash="fieldHash" :model="model" :update="update" :options="options">
           <!-- <pre v-for="(field, index) in fields">TEST: {{field}}</pre> -->
           <v-container fluid class="grid-list-lg" pa-0 :key="`${field.key}-${index}`" v-for="(field, index) in fields">
                <fluro-content-form-field :debugMode="debugMode" :contextField="contextField" :recursiveClick="recursiveClick" :disableDefaults="disableDefaults" :dynamic="dynamic" :context="context" :parent="formModel" :outline="showOutline" :form-fields="formFields" :options="options" :field="fields[index]" :key="`field-${field.key}-${index}`" @input="update" v-model="model" />
            </v-container>
        </slot>
     


    </div>
</template>
<script>
import _ from "lodash";
import Vue from "vue";
import FluroContentFormField from './FluroContentFormField.vue';
// import DynamicImportService from "../../DynamicImportService";

//////////////////////////////////////////////////

var debouncer;

export default {
    name: "fluro-content-form",
    props: {
        contextField: {
            type: Object
        },
        recursiveClick: {
            type: Function
        },
        debugMode: {
            type: Boolean
        },
        debounce: {
            type: Number,
            default: 0
        },
        //This stops the form from adding the default values
        //We use this so that we don't accidentally fill in fields
        //that have been cleared by the user (mainly for website builder)
        disableDefaults: {
            type: Boolean,
            default: false
        },
        dynamic: {
            type: Boolean
        },
        context: {
            type: String,
            default () {
                //By default
                return this.$fluro.global.defaultFormContext;
            }
        },
        parent: {
            type: Object
        },
        fields: {
            type: Array,
        },
        value: {
            type: Object
        },
        formFields: {
            default () {
                return [];
            },
            type: Array
        },
        options: {
            default: function() {
                return {};
            },
            type: Object
        },
        outline: {
            type: Boolean
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
                    var errorMessages = field.errorMessages;
                    if (!errorMessages) {
                        // console.log('this field has no error messages!', field)
                        return;
                    }

                    return errorMessages.length;
                })
                .map(function(field) {
                    return {
                        title: field.errorTitle,
                        messages: field.errorMessages
                    };
                })
                .value();
        },
        fieldHash() {
            return _.reduce(
                this.fieldsOutput,
                function(set, field) {
                    set[field.key] = field;
                    return set;
                }, {}
            );
        }
    },
    data() {
        return {
            ready: true,
            model: this.value,
            watchEnabled: true
        };
    },
    components: {
        FluroContentFormField,
    },
    watch: {
        model(newModel, oldModel) {

            if (this.watchEnabled) {
                
                this.$emit("input", this.model);
                // console.log('form chagned')
            }

        },
        value(v) {
            var self = this;

            //If the model has been changed
            if (self.model != v) {
                self.watchEnabled = false;
                self.model = v;
                self.reset();
                self.$nextTick(function() {
                    self.watchEnabled = true;
                });

            }

           
            //    // var newModel = Object.assign({}, val) //input;
            //    this.$set(this, 'model', val);
            //    this.reset();
        },
        // fields(fields) {
        //     var self = this;
        //     _.each(fields, function(field) {
        //         field.guid = self.$fluro.utils.guid();
        //     })
        // },
        errorMessages(messages) {
            this.$emit("errorMessages", messages);
        }
    },
    created() {
        this.reset();
    },
    methods: {
        touch() {
            _.each(this.formFields, function(component) {
                if (component.touch) {
                    component.touch();
                }
            });
        },
        reset() {
            var self = this;

            /////////////////////////////////////////////////

            //For each field reset the model
            if (!self.disableDefaults) {
                (self.fieldsOutput || []).forEach(createDefaults);
            }

            function createDefaults(field) {
                if(!field) {
                    return;
                }

                if (field.type == "group" && !field.asObject) {
                    (field.fields || []).forEach(createDefaults);
                    return;
                }

                var existingValue = _.get(self.model, field.key);
                //We already have a value in this field
                if (existingValue) {
                    return;
                }

                if (field.directive != "embedded" && field.type != "group") {
                    return;
                }

                ////////////////////////////////

                //Create an empty array
                if (field.maximum != 1) {
                    var startingValueCount = Math.max(field.askCount, field.minimum);
                    var array = [];

                    for (var i = 0; i < startingValueCount; i++) {
                        array.push({});
                    }

                    // console.log('Add and create array', field.title, field.key, field.type, field.directive, array)
                    Vue.set(self.model, field.key, array);
                }
            }

            /////////////////////////////////////////////////

            //Reset the components too
            self.formFields.forEach(function(component) {
                component.reset();
            });

            // self.$nextTick(function() {
            self.$emit("default");
            // })

            // /////////////////////////////////////////////////

            // //Recursively create all the default keys for nested fields
            // function createDefaults(field) {

            //        //Check if it's just a display group
            //        if (field.type == 'group' && !field.asObject) {
            //                (field.fieldsOutput || []).forEach(createDefaults);
            //                return;
            //        }

            //        // ///console.log('CREATE DEFAULTS FOR', field.title)
            //        var existingValue = _.get(self.model, field.key);

            //        //We already have a value in this field
            //        if (existingValue) {
            //                // ///console.log('Has existing value', field.key, existingValue);
            //                Vue.set(self.model, field.key, existingValue);
            //                return;
            //        }

            //        // ///console.log('Create Defaults', self);
            //        var blankValue = self.$fluro.utils.getDefaultValueForField(field);

            //        if (field.type == 'date' && blankValue == 'now') {
            //                blankValue = new Date();
            //        }

            //        ///console.log('Set Default value', field.key, blankValue);
            //        Vue.set(self.model, field.key, blankValue);

            // }
        },
        update(input, valueThatWasChanged) {
            // console.log('form level', this.model)
            // this.$emit('input', Object.assign({}, this.model)); 
            //TODO CADE
            //Check this works going up and down nested forms, in addition check that it doesn't break
            //File Uploads    

            // console.log('Emitting up!', this.model.$el)      
            this.$emit('input', this.model);           
          
           
        },
    }
};

</script>
<style scoped lang="scss">
.fluro-content-form {}

</style>
