<template>
    <div class="fluro-interaction-form">
        <template v-if="definition">
            <template v-if="!allowed">
                <template v-if="user">
                    <slot name="authenticated">
                        You do not have permission to submit this form
                    </slot>
                </template>
                <template v-if="!user">
                    <slot name="unauthenticated">
                        You must be signed in to submit this form
                    </slot>
                </template>
            </template>
            <template v-if="allowed">
                <slot name="success" :reset="reset" :result="result" v-if="state == 'success'">
                    Success!
                    <v-btn class="mx-0" @click="reset()">
                        Back to form
                    </v-btn>
                </slot>
                <template v-else>
                    <slot name="info"></slot>
                    <form @submit.prevent="submit" :disabled="state == 'processing'">
                        <v-container>
                            <!-- <pre>{{allowAnonymous}}</pre> -->
                            <!-- <pre>{{fields}}</pre> -->
                            <!-- <pre>{{options}}</pre> -->
                            <fluro-content-form @errorMessages="validate" ref="form" :options="options" v-model="dataModel" :fields="fields" />
                            <div class="actions">
                                <template v-if="state == 'processing'">
                                    <v-btn class="mx-0" :disabled="true">
                                        Processing
                                        <v-progress-circular indeterminate></v-progress-circular>
                                    </v-btn>
                                </template>
                                <template v-else-if="state == 'error'">
                                    <v-alert :value="true" type="error" outline>
                                        {{serverErrors}}
                                    </v-alert>
                                    <v-btn class="mx-0" @click.prevent.native="state = 'ready'">
                                        Try Again
                                    </v-btn>
                                    <!-- <v-btn class="mx-0" :disabled="hasErrors" type="submit" color="primary">
                                Try Again
                            </v-btn> -->
                                </template>
                                <template v-else>
                                    <v-alert :value="true" type="error" outline v-if="hasErrors">
                                        Please check the following issues before submitting
                                        <div v-for="error in errorMessages">
                                            <strong>{{error.title}}</strong>: {{error.messages[0]}}
                                        </div>
                                    </v-alert>
                                    <v-btn class="mx-0" :disabled="hasErrors" type="submit" color="primary">
                                        Submit
                                    </v-btn>
                                </template>
                            </div>
                        </v-container>
                    </form>
                </template>
            </template>
            <!-- <pre>ERRORS {{errorMessages}}</pre> -->
        </template>
    </div>
</template>
<script>
import FluroContentForm from './FluroContentForm.vue';
import _ from 'lodash';
import Vue from 'vue';

import { mapFields } from 'vuex-map-fields';


//////////////////////////////////////////////////

export default {
    props: {
        'title': {
            type: String,
        },
        'definition': {
            type: Object,
            required: true,
        },
        'linkedProcess': {
            type: [Object, String],
        },
        'linkedEvent': {
            type: [Object, String],
        },

        'debugMode': {
            type: Boolean,
        },
        'model': {
            type: Object,
            default() {
                return {
                    data:{}
                };
            }
        },
        'options': {
            default: function() {
                return {
                    validateSuccess: true,
                }
            },
            type: Object,
        },
    },
    data() {
        return {
            dataModel:JSON.parse(JSON.stringify(this.model)),
            // model: {
            //     data: {},
            // },
            serverErrors: '',
            errorMessages: [],
            result: null,
            state: 'ready',
        }
    },
    created() {
        this.reset();
    },
    mounted() {
        this.validate();
    },
    computed: {

        formErrors() {

        },
        hasErrors() {
            return this.errorMessages.length ? true : false;
        },
        formOptions() {
            return this.definition.data;
        },

        fields() {

            var self = this;

            var allFields = [];



            //////////////////////////////////////////

            

            var nameFields = {
                key: '_name',
                type: 'group',
                fields: [],
                className: 'layout row wrap',
            }

            //////////////////////////////////////////

            if (self.askFirstName) {
                nameFields.fields.push({
                    key: '_firstName',
                    minimum: self.requireFirstName ? 1 : 0,
                    maximum: 1,
                    title: 'First Name',
                    directive: 'input',
                    type: 'string',
                    className: 'xs12 sm6',
                    defaultValues: self.defaultUserValue('firstName'),
                })
            }

            if (self.askLastName) {
                nameFields.fields.push({
                    key: '_lastName',
                    minimum: self.requireFirstName ? 1 : 0,
                    maximum: 1,
                    title: 'Last Name',
                    directive: 'input',
                    type: 'string',
                    className: 'xs12 sm6',
                    defaultValues: self.defaultUserValue('lastName'),
                })
            }

            //If there are actually name fields
            if(nameFields.fields && nameFields.fields.length) {
                //Insert the name row
                allFields.push(nameFields);
            }

            //////////////////////////////////////////

            if (self.askGender) {
                allFields.push({
                    key: '_gender',
                    minimum: this.requireGender ? 1 : 0,
                    maximum: 1,
                    title: 'Gender',
                    directive: 'select',
                    type: 'string',
                    options: [{
                            name: 'Male',
                            value: 'male',
                        },
                        {
                            name: 'Female',
                            value: 'female',
                        }
                    ]
                })
            }

            //////////////////////////////////////////


            if (self.askEmail) {
                allFields.push({
                    key: '_email',
                    minimum: self.requireEmail ? 1 : 0,
                    maximum: 1,
                    title: 'Email Address',
                    directive: 'input',
                    type: 'email',
                    defaultValues: self.defaultUserValue('email'),
                })
            }

            if (self.askPhone) {
                allFields.push({
                    key: '_phoneNumber',
                    minimum: self.requirePhone ? 1 : 0,
                    maximum: 1,
                    title: 'Phone Number',
                    directive: 'input',
                    type: 'string',
                    defaultValues: self.defaultUserValue('phoneNumber'),
                })
            }


            if (self.askDOB) {
                allFields.push({
                    key: '_dob',
                    minimum: self.requireDOB ? 1 : 0,
                    maximum: 1,
                    title: 'Date of Birth',
                    directive: 'dob-select',
                    type: 'date',
                })
            }

            //Get the form fields
            var formFields = self.definition.fields;



            //Combine them together
            allFields = allFields.concat(formFields);

            // console.log('ALL FIELDS', allFields);

            return allFields;
        },


        // if (!interactionFormSettings.allowAnonymous && !interactionFormSettings.disableDefaultFields) {
        //     interactionFormSettings.requireFirstName = true;
        //     interactionFormSettings.requireLastName = true;
        //     interactionFormSettings.requireGender = true;
        //     interactionFormSettings.requireEmail = true;

        //     switch (interactionFormSettings.identifier) {
        //         case 'both':
        //             interactionFormSettings.requireEmail =
        //                 interactionFormSettings.requirePhone = true;
        //             break;
        //         case 'email':
        //             interactionFormSettings.requireEmail = true;
        //             break;
        //         case 'phone':
        //             interactionFormSettings.requirePhone = true;
        //             break;
        //         case 'either':
        //             interactionFormSettings.askPhone = true;
        //             interactionFormSettings.askEmail = true;
        //             break;
        //     }
        // }

        ////////////////////////////////

        identifier() {
            return this.formOptions.identifier;
        },

        ////////////////////////////////

        allowAnonymous() {
            // console.log('ONE > ANONYMOUS', this.formOptions)
            return this.formOptions.allowAnonymous || false
        },

        disableDefaultFields() {
            // console.log('TWO > DISABLE FIELDS', this.formOptions)
            return this.formOptions.disableDefaultFields || false
        },

        requireDefaultContactFields() {
            // console.log('THREE > CHECK DEFAULT CONTACT FIELDS', this.formOptions)
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
                default:
                    //Return if the contact details are required and we haven't already provided a phone number
                    return  this.requireDefaultContactFields && (!(this.dataModel._phone && this.dataModel._phone.length))
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
                default:
                    //Return if the contact details are required and we haven't already provided an email
                     return  this.requireDefaultContactFields && (!(this.dataModel._email && this.dataModel._email.length))
                    break;

            }
        },

        ////////////////////////////////

        definedName() {
            return this.definition.definitionName;
        },
        displayTitle() {
            if (this.title) {
                return this.title;
            }
            return `${this.definition.title}`;
        },
        allowed() {

            // console.log('TESTING', this.definition)
            //If it's public
            if (this.definition.privacy == 'public') {
                return true;
            }

            var canCreate = this.$fluro.access.can('create', this.definedName, 'interaction');
            var canSubmit = this.$fluro.access.can('submit', this.definedName, 'interaction');
            return canCreate || canSubmit;
        },
        ...mapFields('fluro', [
            'application', //The Fluro application and all of it's permissions and data
            'user', //The authenticated user if they log in
        ]),
    },
    components: {
        FluroContentForm,
    },
    methods: {
        validate() {
            var form = this.$refs.form;
            if (!form) {
                return [];
            }
            this.errorMessages = form.errorMessages || [];
        },
        validateAllFields() {
            var form = this.$refs.form;
            form.touch();
            this.validate();
        },
        defaultUserValue(key) {

            if (!this.user) {
                return null;
            }

            return _.compact([
                _.get(this.user, key)
            ])
        },
        reset() {
            var self = this;
            //Reset the model
            // Vue.set(self.model, 'data', {});
            self.dataModel = {};
            self.result = null;

            self.state = 'ready';
            self.$emit('reset');
        },
        submit() {
            var self = this;
            self.validateAllFields();

            if (self.hasErrors) {
                //Gotta finish the stuff first!
                return;
            }

            self.state = 'processing';


            /////////////////////////////////

            var interactionData = {
                interaction: self.dataModel,
                event:self.$fluro.utils.getStringID(self.linkedEvent),
                process:self.$fluro.utils.getStringID(self.linkedProcess),
                // transaction:self.$fluro.utils.getStringID(self.linkedProcess),
            }

            /////////////////////////////////

            //Get the _ prepended values
            setDefaultContactField('firstName');
            setDefaultContactField('lastName');
            setDefaultContactField('email');
            setDefaultContactField('phoneNumber');
            setDefaultContactField('dob');
            setDefaultContactField('gender');

            //Set the default contact fields
            function setDefaultContactField(key) {
                var value = _.get(self.dataModel, `_${key}`);
                if (value) {
                    _.set(interactionData, `contact.${key}`, value);
                }
            }

            /////////////////////////////////

            //Set a default title
            if (!interactionData.title) {
                interactionData.title = this.definition.title;
            }

            /////////////////////////////////

            //Create the post
            self.$fluro.content.submitInteraction(this.definedName, interactionData, {
                params:{
                    definition:self.$fluro.utils.getStringID(self.definition),
                    process:self.$fluro.utils.getStringID(self.linkedProcess),

                }
            })
                .then(function(interaction) {
                    self.state = 'success';
                    self.dataModel = {
                        data:{},
                    }

                    self.result = interaction;
                    self.$emit('success', interaction);

                }, function(err) {
                    //Dispatch an error
                    var humanMessage = self.$fluro.utils.errorMessage(err);
                    self.$fluro.error(err);
                    self.serverErrors = humanMessage;
                    self.state = 'error';
                    self.$emit('error', err);


                    console.log('SWITCH STATE TO', err, self)

                })


        }
    }
}
</script>
<style scoped lang="scss">
.fluro-post-form {

    .v-btn {
        .v-progress-circular {
            width: 15px !important;
            height: 15px !important;
            margin-left: 15px;
        }
    }
}
</style>