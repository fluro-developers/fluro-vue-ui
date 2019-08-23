<template>
    <div class="fluro-interaction-form">
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
                    <fluro-content-form @errorMessages="validate" ref="form" :options="options" v-model="model" :fields="fields" />
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
                </form>
            </template>
        </template>
        <!-- <pre>ERRORS {{errorMessages}}</pre> -->
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
        'options': {
            default: function() {
                return {
                    validateSuccess:true,
                }
            },
            type: Object,
        },
    },
    data() {
        return {
            model: {
                data: {},
            },
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

            var allFields = [];

            if (this.gender) {
                allFields.push({
                    key: '_gender',
                    minimum: this.requireGender ? 1 : 0,
                    maximum: 1,
                    title: 'Gender',
                    directive: 'select',
                    type: 'string',
                    options: [{
                            name: 'Mr',
                            value: 'male',
                        },
                        {
                            name: 'Ms / Mrs',
                            value: 'female',
                        }
                    ]
                })
            }

            //////////////////////////////////////////

            var nameFields = {
                key: '_name',
                type: 'group',
                fields: [],
                className: 'layout row wrap',
            }

            //////////////////////////////////////////

            if (this.askFirstName) {
                nameFields.fields.push({
                    key: '_firstName',
                    minimum: this.requireFirstName ? 1 : 0,
                    maximum: 1,
                    title: 'First Name',
                    directive: 'input',
                    type: 'string',
                    className: 'xs12 sm6',
                    defaultValues: this.defaultUserValue('firstName'),
                })
            }

            if (this.askLastName) {
                nameFields.fields.push({
                    key: '_lastName',
                    minimum: this.requireFirstName ? 1 : 0,
                    maximum: 1,
                    title: 'Last Name',
                    directive: 'input',
                    type: 'string',
                    className: 'xs12 sm6',
                    defaultValues: this.defaultUserValue('lastName'),
                })
            }

            //Insert the name row
            allFields.push(nameFields);

            //////////////////////////////////////////


            if (this.askEmail) {
                allFields.push({
                    key: '_email',
                    minimum: this.requireEmail ? 1 : 0,
                    maximum: 1,
                    title: 'Email Address',
                    directive: 'input',
                    type: 'email',
                    defaultValues: this.defaultUserValue('email'),
                })
            }

            if (this.askPhone) {
                allFields.push({
                    key: '_phoneNumber',
                    minimum: this.requirePhone ? 1 : 0,
                    maximum: 1,
                    title: 'Phone Number',
                    directive: 'input',
                    type: 'email',
                    defaultValues: this.defaultUserValue('phoneNumber'),
                })
            }


            if (this.askDOB) {
                allFields.push({
                    key: '_dob',
                    minimum: this.requireDOB ? 1 : 0,
                    maximum: 1,
                    title: 'Date of Birth',
                    directive: 'dob-select',
                    type: 'date',
                })
            }

            //Get the form fields
            var formFields = this.definition.fields;

            //Combine them together
            allFields = allFields.concat(formFields);

            return allFields;
        },

        ////////////////////////////////

        identifier() {
            return this.formOptions.identifier;
        },


        ////////////////////////////////

        askFirstName() {
            return this.formOptions.askFirstName;
        },
        askLastName() {
            return this.formOptions.askLastName;
        },
        askGender() {
            return this.formOptions.askGender;
        },
        askDOB() {
            return this.formOptions.askDOB;
        },
        askEmail() {
            return (this.formOptions.askEmail || this.requireEmail || this.identifier == 'either');
        },
        askPhone() {
            return (this.formOptions.askPhone || this.requirePhone || this.identifier == 'either');
        },


        ////////////////////////////////

        requireFirstName() {
            return this.formOptions.requireFirstName;
        },
        requireLastName() {
            return this.formOptions.requireLastName;
        },
        requireGender() {
            return this.formOptions.requireGender;
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

            console.log('TESTING', this.definition)
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
            if(!form) {
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
            self.model = {};
            self.result = null;

            self.state = 'ready';
            self.$emit('reset');
        },
        submit() {
            var self = this;
            self.validateAllFields();

            if(self.hasErrors) {
                //Gotta finish the stuff first!
                return;
            }
            
            self.state = 'processing';


            /////////////////////////////////

            var interactionData = {
                interaction: self.model,
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
                var value = _.get(self.model, `_${key}`);
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
            self.$fluro.content.submitInteraction(this.definedName, interactionData)
                .then(function(interaction) {
                    self.state = 'success';
                    self.model = {};
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