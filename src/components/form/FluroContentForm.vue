<template>
    <div class="fluro-content-form" v-if="ready && model">
        <slot name="form" :parent="formModel" :context="context" :form-fields="formFields" :field-hash="fieldHash" :model="model" :update="update" :options="options">
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
        // fields() {

        //     var self = this;

        //     return _.map(self.fields, function(field) {
        //         if (!field.guid) {
        //             field.guid = self.$fluro.utils.guid();
        //             return field;
        //         }
        //         return field;

        //     })
        // },
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
                    // ///console.log('ERROR MESSAGES', field);
                    // ///console.log('ERROR MESSAGE', field);
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
                // console.log('emit change for', this)
                this.$emit("input", this.model);
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

            // console.log('Form value set', val)
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
    /**
    beforeCreate: function() {
        var self = this;

        Promise.all([
            DynamicImportService.load(
                "./FluroContentForm.vue",
                function() {
                    return import("./FluroContentForm.vue");
                }
            ),
            DynamicImportService.load(
                "./FluroContentFormField.vue",
                function() {
                    return import("./FluroContentFormField.vue");
                }
            )
        ]).then(function(results) {
            // ///console.log('Set Components', results);
            self.$options.components.FluroContentForm = results[0];
            self.$options.components.FluroContentFormField = results[1];
            self.ready = true;
        });

        // Promise.all([
        //                import('./FluroContentForm.vue'),
        //                import('./FluroContentFormField.vue'),
        //        ])
        //        .then(function(results) {
        //                self.$options.components.FluroContentForm = results[0].default
        //                self.$options.components.FluroContentFormField = results[1].default
        //                self.ready = true;
        //                /////console.log('Imported Components Dynamically', results)
        //        })
        // Promise.all([
        //                DynamicImportService.load('./FluroContentForm.vue', function() {
        //                        return import('./FluroContentForm.vue')
        //                }),
        //                DynamicImportService.load('./FluroContentFormField.vue', function() {
        //                        return import('./FluroContentFormField.vue')
        //                }),
        //        ])
        //        .then(function(results) {

        //                // ///console.log('Set Components', results);
        // self.$options.components.FluroContentForm = results[0];
        // self.$options.components.FluroContentFormField = results[1];
        //                self.ready = true;
        //        })
    },
    /**/
    created() {
        // console.log('CONTENT FORM WAS CREATED')
        ///console.log('Reset on creation!')
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
            // console.log('Form reset() THIS SHOULD ONLY HAPPEN IF THE ORIGINAL PROP IS CHANGED')

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


            // console.log('form model changed from update callback', input, valueThatWasChanged);
            // 
            // this.$emit('input', this.model);
            // ///console.log('form model changed');
            this.$emit('input', this.model);
            // JSON.parse(JSON.stringify(this.model)));
           
        },

        // update: function(input, valueThatWasChanged) {

        //     var self = this;
        //     self.model = input;
        //     // ///console.log('Update -> model')

        //     //If there is already a debouncer
        //     if (debouncer) {
        //         //Stop it
        //         clearTimeout(debouncer);
        //     }

        //     if (!self.debounce) {
        //         ///console.log('')
        //         return self.$emit('input', this.model);
        //     }

        //     //Start a new debouncer
        //     debouncer = setTimeout(() => self.dispatch(), self.debounce);
        // },
        // dispatch() {

        //        // ///console.log('Update -> dispatch')
        //        this.$emit('input', this.model);
        // }
    }
};

</script>
<style scoped lang="scss">
.fluro-content-form {}

</style>
