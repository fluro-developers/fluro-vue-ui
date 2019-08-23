<template>
     <v-container class="grid-list-xl" pa-0 v-if="fieldHash">
        <wrapper xs>

            <!-- <pre>{{definitions}}</pre> -->
            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.definition" v-model="model"></fluro-content-form-field>
            <v-layout row wrap>
                <v-flex :class="{'xs12':$vuetify.breakpoint.xsOnly}">
                    <fluro-content-form-field :autofocus="true" class="right-messages" :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.firstName" v-model="model"></fluro-content-form-field>
                    <fluro-content-form-field class="right-messages" :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.preferredName" v-model="model" v-if="showPreferredName"></fluro-content-form-field>
                    <fluro-content-form-field class="right-messages" :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.ethnicName" v-model="model" v-if="showEthnicName"></fluro-content-form-field>
                    <div class="additions">
                        <a class="hint" v-if="!showPreferredName" @click="show.preferredName = true">Add Nick/Preferred Name</a>
                        <a class="hint" v-if="!showEthnicName" @click="show.ethnicName = true">Add Ethnic Name</a>
                    </div>
                </v-flex>
                <v-flex :class="{'xs12':$vuetify.breakpoint.xsOnly}" v-if="showMiddleName">
                    <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.middleName" v-model="model"></fluro-content-form-field>
                </v-flex>
                <v-flex :class="{'xs12':$vuetify.breakpoint.xsOnly}">
                    <fluro-content-form-field class="right-messages" :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.lastName" v-model="model"></fluro-content-form-field>
                    <fluro-content-form-field class="right-messages" :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.maidenName" v-model="model" v-if="showMaidenName"></fluro-content-form-field>
                    <div class="additions">
                        <a class="hint" v-if="!showMiddleName" @click="show.middleName = true">Add Middle Name</a>
                        <a class="hint" v-if="!showMaidenName" @click="show.maidenName = true">Add Maiden Name</a>
                    </div>
                </v-flex>
            </v-layout>
        </wrapper>
        <v-layout row wrap>
            <v-flex xs12 sm6>
                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.gender" v-model="model"></fluro-content-form-field>
            </v-flex>
            <v-flex xs12 sm6>
                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.maritalStatus" v-model="model"></fluro-content-form-field>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs12 sm6>
                <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.emails" v-model="model"></fluro-content-form-field>
            </v-flex>
            <v-flex xs12 sm6>
                <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.phoneNumbers" v-model="model"></fluro-content-form-field>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs12 sm6>
                <v-layout row wrap>
                    <v-flex xs6>
                        <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.dob" v-model="model"></fluro-content-form-field>
                    </v-flex>
                    <v-flex xs6>
                        <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.dobVerified" v-model="model"></fluro-content-form-field>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex xs12 sm6>
                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.timezone" v-model="model"></fluro-content-form-field>
            </v-flex>
        </v-layout>
        <v-label>Family Household</v-label>
        <v-layout row wrap>
            <v-flex xs12 sm6>
                <fluro-content-form-field :form-fields="formFields" :showLabel="false" :outline="showOutline" @input="update" :options="options" :field="fieldHash.family" v-model="model"></fluro-content-form-field>
            </v-flex>
            <v-flex xs12 sm6>
                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.householdRole" v-model="model"></fluro-content-form-field>
            </v-flex>
        </v-layout>
        <fluro-academic-select :form-fields="formFields" :outline="showOutline" :options="options" @input="update" v-model="model" />
        <!-- <pre>{{model}}</pre> -->
    </v-container>
</template>
<script>
/////////////////////////////////

import FluroContentForm from '../form/FluroContentForm';
import FluroContentFormField from '../form/FluroContentFormField';
import FluroAcademicSelect from '../form/FluroAcademicSelect';
import Layout from '../../mixins/Layout';

/////////////////////////////////

import Vue from 'vue';

/////////////////////////////////

export default {
    props: {
        'fields': {
            type: Array,
            default () {

                var self = this;
                var array = [];


                ///////////////////////////////////

                addField('definition', {
                    title: 'Type / Definition',
                    minimum: 0,
                    maximum: 1,
                    type: 'string',
                    directive: 'select',
                    options: self.contactDefinitions,
                })


                ///////////////////////////////////

                addField('firstName', {
                    title: 'First Name',
                    minimum: 1,
                    maximum: 1,
                    type: 'string',
                    placeholder: 'Eg. Jessica',
                })

                addField('preferredName', {
                    title: 'Preferred/Nick Name',
                    minimum: 0,
                    maximum: 1,
                    type: 'string',
                    enabled: false,
                    placeholder: `Eg. 'Jess'`,
                })

                addField('middleName', {
                    title: 'Middle Name',
                    minimum: 0,
                    maximum: 1,
                    type: 'string',
                    enabled: false,
                    placeholder: `Eg. 'Heather'`,
                })

                addField('ethnicName', {
                    title: 'Ethnic Name',
                    minimum: 0,
                    maximum: 1,
                    type: 'string',
                    enabled: false,
                    placeholder: `Eg. '吳爾霏'`,
                })

                addField('maidenName', {
                    title: 'Maiden Name',
                    minimum: 0,
                    maximum: 1,
                    type: 'string',
                    enabled: false,
                    placeholder: `Eg. 'Johnson'`,
                })

                addField('lastName', {
                    title: 'Last Name',
                    minimum: 1,
                    maximum: 1,
                    type: 'string',
                    placeholder: 'Eg. Michaels',
                })


                addField('dob', {
                    title: 'Date of Birth',
                    minimum: 0,
                    maximum: 1,
                    type: 'date',
                    directive: 'date-select',
                })
                addField('dobVerified', {
                    title: 'Birthday type',
                    minimum: 0,
                    maximum: 1,
                    type: 'boolean',
                    directive: 'select',
                    defaultValues: [false],
                    options: [{
                            name: `It's a Guess`,
                            value: false,
                        },
                        {
                            name: `It's Correct`,
                            value: true,
                        },
                    ]
                })

                addField('family', {
                    title: 'Household / Primary Residence',
                    minimum: 0,
                    maximum: 1,
                    type: 'reference',
                    directive: 'reference-select',
                    params: {
                        restrictType: 'family',
                    }
                });

                addField('householdRole', {
                    title: 'Household Role',
                    minimum: 0,
                    maximum: 1,
                    type: 'string',
                    directive: 'select',
                    options: [{
                            name: 'None / Other',
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
                    params: {
                        restrictType: 'family',
                    }
                })







                var timezones = _.map(self.$fluro.date.timezones(), function(timezone) {
                    return { name: timezone, value: timezone };
                });

                timezones.unshift({
                    name: 'Use Account Default',
                    value: '',
                })



                addField('timezone', {
                    title: 'Primary Timezone',
                    minimum: 0,
                    maximum: 1,
                    type: 'string',
                    directive: 'select',
                    placeholder: 'None (Defaults to Account Timezone)',
                    options: timezones,
                })


                addField('gender', {
                    title: 'Gender',
                    minimum: 1,
                    maximum: 1,
                    type: 'string',
                    directive: 'select',
                    placeholder: '',
                    // defaultValues: ['unknown'],
                    options: [{
                            name: 'Male',
                            value: 'male',
                        },
                        {
                            name: 'Female',
                            value: 'female',
                        },
                        {
                            name: 'Unknown',
                            value: 'unknown',
                        },
                    ]
                })



                addField('maritalStatus', {
                    title: 'Marital Status',
                    minimum: 0,
                    maximum: 1,
                    type: 'string',
                    directive: 'select',
                    placeholder: '',
                    options: [{
                            name: 'None',
                            value: '',
                        },
                        {
                            name: 'Single',
                            value: 'single',
                        },
                        {
                            name: 'In a relationship',
                            value: 'relationship',
                        },
                        {
                            name: 'Married',
                            value: 'married',
                        },
                        {
                            name: 'Widowed',
                            value: 'widowed',
                        },
                        {
                            name: 'Seperated',
                            value: 'seperated',
                        },
                        {
                            name: 'Divorced',
                            value: 'divorced',
                        },
                    ]
                })


                ///////////////////////////////////

                addField('emails', {
                    title: 'Email Address',
                    minimum: 0,
                    maximum: 0,
                    type: 'email',
                    // directive:'select',
                    placeholder: '',
                })


                addField('phoneNumbers', {
                    title: 'Phone Number',
                    minimum: 0,
                    maximum: 0,
                    type: 'string',
                    // directive:'select',
                    placeholder: '+61 400 123 456',
                })

                ///////////////////////////////////

                function addField(key, details) {
                    details.key = key;
                    array.push(details)
                    // // Vue.set(self.fields, key, details);

                    // if (details.enabled === false) {

                    // } else {
                    //     details.enabled = true;
                    // }


                    // var defaultValue = self.getDefaultValue(key, details);
                    // Vue.set(self.model, key, defaultValue);
                }

                return array;
            }
        }
    },
    mixins: [Layout],
    extends: FluroContentForm,
    components: {
        FluroContentFormField,
        FluroAcademicSelect,
    },
    created() {

        var self = this;

        if (!self.model.academicCalendar) {
            self.$set(self.model, 'academicCalendar', '');
        }

        if (!self.model.academicGrade) {
            self.$set(self.model, 'academicGrade', '');
        }



        // self.$fluro.types.retrieve(['contact']).then(function(res) {

        //     self.contactDefinitions = _.chain(res)
        //     .reduce({
        //         contact:[],
        //         detailSheets:[],
        //     })
        //     .value();
        // });
    },
    computed: {
        showOutline() {
            return true; //false;//true;//false;//true;
        },
        showPreferredName() {
            return (this.model.preferredName && this.model.preferredName.length) || this.show.preferredName;
        },
        showEthnicName() {
            return (this.model.ethnicName && this.model.ethnicName.length) || this.show.ethnicName;
        },
        showMiddleName() {
            return (this.model.middleName && this.model.middleName.length) || this.show.middleName;
        },
        showMaidenName() {
            return (this.model.maidenName && this.model.maidenName.length) || this.show.maidenName;
        },
    },

    data() {
        return {
            show: {
                preferredName: false,
                middleName: false,
                ethnicName: false,
                maidenName: false,
            },
        }
    },
}

/**
export default {
    computed: {
        errorMessages() {
            return _.chain(this.formFields)
                .filter(function(field) {
                    return field.errorMessages.length;
                })
                .map(function(field) {
                    return {
                        title: field.errorTitle,
                        messages: field.errorMessages,
                    }
                })
                .value();
        },
        showOutline() {
            return true;
        },
        showPreferredName() {
            return (this.model.preferredName && this.model.preferredName.length) || this.show.preferredName;
        },
        showEthnicName() {
            return (this.model.ethnicName && this.model.ethnicName.length) || this.show.ethnicName;
        },
        showMiddleName() {
            return (this.model.middleName && this.model.middleName.length) || this.show.middleName;
        },
        showMaidenName() {
            return (this.model.maidenName && this.model.maidenName.length) || this.show.maidenName;
        },

    },
    components: {
        FluroContentFormField,
        FluroAcademicSelect,
    },
    props: {
        'value': {
            type: Object,
            default: function() {
                return {};
            }
        },
        'type': {
            default: function() {
                return {}
            },
            type: Object,
        },
        'definition': {
            default: function() {
                return {}
            },
            type: Object,
        },
        'options': {
            default: function() {
                return {}
            },
            type: Object,
        },
        'formFields': {
            default () {
                return [];
            },
            type: Array,
        },
    },
    data() {
        return {
            show: {
                preferredName: false,
                middleName: false,
                ethnicName: false,
                maidenName: false,
            },
            model: this.value,
            fields: {},
            initialized: false,
        }
    },
    created() {

        var self = this;

        ///////////////////////////////////

        addField('firstName', {
            title: 'First Name',
            minimum: 1,
            maximum: 1,
            type: 'string',
            placeholder: 'Stephanie',
        })

        addField('preferredName', {
            title: 'Preferred/Nick Name',
            minimum: 0,
            maximum: 1,
            type: 'string',
            enabled: false,
            placeholder: `Eg. 'Steph'`,
        })

        addField('middleName', {
            title: 'Middle Name',
            minimum: 0,
            maximum: 1,
            type: 'string',
            enabled: false,
        })

        addField('ethnicName', {
            title: 'Ethnic Name',
            minimum: 0,
            maximum: 1,
            type: 'string',
            enabled: false,
            placeholder: `Eg. '吳爾霏'`,
        })

        addField('maidenName', {
            title: 'Maiden Name',
            minimum: 0,
            maximum: 1,
            type: 'string',
            enabled: false,
            placeholder: `Eg. 'Johnson'`,
        })

        addField('lastName', {
            title: 'Last Name',
            minimum: 1,
            maximum: 1,
            type: 'string',
            placeholder: 'Michaels',
        })


        addField('dob', {
            title: 'Date of Birth',
            minimum: 0,
            maximum: 1,
            type: 'date',
            directive: 'date-select',
        })
        addField('dobVerified', {
            title: 'Birthday type',
            minimum: 0,
            maximum: 1,
            type: 'boolean',
            directive: 'select',
            defaultValues: [false],
            options: [{
                    name: `It's a Guess`,
                    value: false,
                },
                {
                    name: `It's Correct`,
                    value: true,
                },
            ]
        })

        addField('family', {
            title: 'Household / Primary Residence',
            minimum: 0,
            maximum: 1,
            type: 'reference',
            directive: 'reference-select',
            params: {
                restrictType: 'family',
            }
        });

        addField('householdRole', {
            title: 'Household Role',
            minimum: 0,
            maximum: 1,
            type: 'string',
            directive: 'select',
            options: [{
                    name: 'None / Other',
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
            params: {
                restrictType: 'family',
            }
        })







        var timezones = _.map(self.$fluro.date.timezones(), function(timezone) {
            return { name: timezone, value: timezone };
        });

        timezones.unshift({
            name: 'None (Use Account Default)',
            value: '',
        })



        addField('timezone', {
            title: 'Primary Timezone',
            minimum: 0,
            maximum: 1,
            type: 'string',
            directive: 'select',
            placeholder: 'None (Defaults to Account Timezone)',
            options: timezones,
        })


        addField('gender', {
            title: 'Gender',
            minimum: 1,
            maximum: 1,
            type: 'string',
            directive: 'select',
            placeholder: '',
            defaultValues: ['unknown'],
            options: [{
                    name: 'Male',
                    value: 'male',
                },
                {
                    name: 'Female',
                    value: 'female',
                },
                {
                    name: 'Unknown',
                    value: 'unknown',
                },
            ]
        })



        addField('maritalStatus', {
            title: 'Marital Status',
            minimum: 1,
            maximum: 4,
            type: 'string',
            directive: 'select',
            placeholder: '',
            options: [{
                    name: 'None',
                    value: '',
                },
                {
                    name: 'Single',
                    value: 'single',
                },
                {
                    name: 'In a relationship',
                    value: 'relationship',
                },
                {
                    name: 'Married',
                    value: 'married',
                },
                {
                    name: 'Widowed',
                    value: 'widowed',
                },
                {
                    name: 'Seperated',
                    value: 'seperated',
                },
                {
                    name: 'Divorced',
                    value: 'divorced',
                },
            ]
        })


        ///////////////////////////////////

        addField('emails', {
            title: 'Email Addresses',
            minimum: 0,
            maximum: 0,
            type: 'email',
            // directive:'select',
            placeholder: '',
        })


        addField('phoneNumbers', {
            title: 'Phone Numbers',
            minimum: 0,
            maximum: 0,
            type: 'string',
            // directive:'select',
            placeholder: '+61 400 123 456',
        })

        ///////////////////////////////////

        function addField(key, details) {
            details.key = key;
            Vue.set(self.fields, key, details);

            if (details.enabled === false) {

            } else {
                details.enabled = true;
            }


            var defaultValue = self.getDefaultValue(key, details);
            Vue.set(self.model, key, defaultValue);
        }



        self.initialized = true;



        this.reset();


    },
    methods: {
        touch() {
            _.each(this.formFields, function(component) {
                component.touch();
            })
        },
        getDefaultValue(key, fieldDefinition) {

            var self = this;
            if (self.model[key]) {
                return self.model[key];
            }


            // console.log('GET DEFAULT VALUE FOR FIELD', self.$fluro)
            return self.$fluro.utils.getDefaultValueForField(fieldDefinition);

            // //////////////////////////////////////////

            // switch (fieldDefinition.type) {
            //     case 'string':
            //         return '';
            //         break;
            //     default:
            //         return null;
            //         break;
            // }
        },
        reset() {
            var self = this;

            /////////////////////////////////////////////////

            //Reset the components too
            this.formFields.forEach(function(component) {
                component.reset();
            });

            /////////////////////////////////////////////////

            //For each field reset the model
            _.each(self.fields, createDefaults);

            /////////////////////////////////////////////////

            //Recursively create all the default keys for nested fields
            function createDefaults(field) {
                // console.log('CREATE DEFAULTS', field);

                var blankValue = Fluro.utils.getDefaultValueForField(field);

                //Check if it's just a display group
                if (field.type == 'group' && !field.asObject) {
                    _.each(field.fields || [], createDefaults);
                }

                // //console.log('SET', field.key, blankValue);
                Vue.set(self.model, field.key, blankValue);
            }


        },
        update: function(input) {
            console.log('UPDATE')
            this.$emit('input', this.model);
        }
    },
    watch: {
        'model': {
            handler: function(val, oldVal) {
                var self = this;
                self.$emit('input', self.model);
            },
            deep: true,
        }
    },
}
/**/
</script>
<style scoped lang="scss">
.hint {
    font-size: 10px;
    opacity: 0.5;
    color: inherit;
    display: block;

}
</style>