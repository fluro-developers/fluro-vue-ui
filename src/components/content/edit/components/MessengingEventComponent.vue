<template>
    <div class="grid-list-xl" v-if="model">
        <fluro-content-form @input="save" v-model="model" :fields="fields">
            <template v-slot:form="{formFields, fieldHash, model, update, options}">
                <div v-if="viewMode">
                    <p>Like dark mode, only edit mode</p>
                </div>
                <div v-else-if="editMode">
                </div>
                <v-container fluid grid-list-xl v-else-if="createMode">
                    <v-layout row wrap grid-list-xl>
                        <v-flex sm5 xs12>
                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.segments" v-model="model"></fluro-content-form-field>
                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.methods" v-model="model"></fluro-content-form-field>
                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.methodPreference" v-model="model"></fluro-content-form-field>
                        </v-flex>
                        <v-flex sm7 xs12>
                            <fluro-panel>
                                <fluro-panel-body>
                                    <h4>When</h4>
                                    <v-layout row wrap>
                                        <v-flex xs12 sm3>
                                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.total" v-model="model" />
                                        </v-flex>
                                        <v-flex xs12 sm3>
                                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.period" v-model="model" />
                                        </v-flex>
                                        <v-flex xs12 sm3>
                                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.when" v-model="model" />
                                        </v-flex>
                                        <v-flex xs12 sm3>
                                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.point" v-model="model" />
                                        </v-flex>
                                    </v-layout>
                                </fluro-panel-body>
                            </fluro-panel>
                            <fluro-panel>
                                <fluro-panel-body>
                                    <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.title" v-model="model"></fluro-content-form-field>
                                    <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.body" v-model="model"></fluro-content-form-field>
                                </fluro-panel-body>
                            </fluro-panel>
                            <fluro-panel>
                                <fluro-panel-body>
                                    <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.htmlTitle" v-model="model"></fluro-content-form-field>
                                    <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.htmlBody" v-model="model"></fluro-content-form-field>
                                    <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.senderEmail" v-model="model"></fluro-content-form-field>
                                </fluro-panel-body>
                            </fluro-panel>
                        </v-flex>
                    </v-layout>
                </v-container>
            </template>
        </fluro-content-form>
    </div>
</template>
<script>
import { FluroContentForm, Layout } from 'fluro-vue-ui';
import FluroContentEditMixin from '../FluroContentEditMixin';
import draggable from 'vuedraggable'


export default {
    mixins: [FluroContentEditMixin, Layout],
    props: {
        value: {
            type: Object,
            default: {},
        },
        context: {
            type: String,
            default: 'create',
        }
    },
    components: {
        FluroContentForm,
        draggable,
    },
    data() {
        return {
            model: this.value,
        }
    },
    methods: {
    },
    computed: {
        fields() {


            var self = this;
            var array = [];
            var periodOptions = [];
            ///////////////////////////////////
            if (self.model.total != 1) {
                periodOptions = [{
                        name: 'Minutes',
                        value: 'minute',
                    },
                    {
                        name: 'Hours',
                        value: 'hour',
                    },
                    {
                        name: 'Days',
                        value: 'day',
                    },
                    {
                        name: 'Weeks',
                        value: 'week',
                    },
                    {
                        name: 'Months',
                        value: 'month',
                    },
                ]
            }
            else {
                periodOptions = [{
                        name: 'Minute',
                        value: 'minute',
                    },
                    {
                        name: 'Hour',
                        value: 'hour',
                    },
                    {
                        name: 'Day',
                        value: 'day',
                    },
                    {
                        name: 'Week',
                        value: 'week',
                    },
                    {
                        name: 'Month',
                        value: 'month',
                    },
                ]
            }

            addField('segments', {
                title: 'Send To',
                minimum: 1,
                maximum: 5,
                type: 'string',
                directive: 'select',
                options: [{
                        name: 'Ticket Holders',
                        value: 'ticket',
                    },
                    {
                        name: 'Expected Contacts',
                        value: 'expected',
                    },
                    {
                        name: 'Parents of expected Contacts',
                        value: 'expected parents',
                    },
                    {
                        name: 'Checked In Contacts',
                        value: 'checkin',
                    },
                    {
                        name: 'Parents of Checked In Contacts',
                        value: 'checkin parents',
                    },
                ]
            })

            addField('methods', {
                title: 'Send Via Method',
                minimum: 1,
                maximum: 3,
                type: 'string',
                directive: 'select',
                defaultValues: ['email'],
                options: [{
                        name: 'Email',
                        value: 'email',
                    },
                    {
                        name: 'Push Notification',
                        value: 'push',
                    },
                    {
                        name: 'SMS',
                        value: 'sms',
                    }
                ]
            })


            addField('methodPreference', {
                title: 'Method Preference',
                minimum: 0,
                maximum: 1,
                type: 'string',
                directive: 'select',
                defaultValues: ['all'],
                options: [{
                        name: 'All - Email and SMS and Push',
                        value: 'all',
                    },
                    {
                        name: 'Failover - Email, SMS, Push',
                        value: 'failover',
                    },
                ]
            })

            addField('total', {
                minimum: 1,
                maximum: 1,
                type: 'integer',
            })

            addField('period', {
                minimum: 1,
                maximum: 1,
                type: 'string',
                directive: 'select',
                defaultValues: ['day'],
                options: periodOptions
            })


            addField('when', {
                minimum: 1,
                maximum: 1,
                type: 'string',
                directive: 'select',
                defaultValues: ['before'],
                options: [{
                        name: 'Before',
                        value: 'before',
                    },
                    {
                        name: 'After',
                        value: 'after',
                    },
                ]
            })


            addField('point', {
                minimum: 1,
                maximum: 1,
                type: 'string',
                directive: 'select',
                defaultValues: ['start'],
                options: [{
                        name: 'Event Starts',
                        value: 'start',
                    },
                    {
                        name: 'Event Ends',
                        value: 'end',
                    },
                ]
            })



            /////////////////////////////////


            addField('title', {
                title: 'Plain Text Title',
                placeholder: 'The title for this message',
                minimum: 1,
                maximum: 1,
                type: 'string',
            })


            addField('body', {
                title: 'Plain Text Message',
                description: 'For SMS and Push notifications',
                placeholder: 'Write a plain text message in here',
                minimum: 0,
                maximum: 1,
                directive: 'textarea',
                type: 'string',
            })


            /////////////////////////////////


            addField('htmlTitle', {
                title: 'HTML Title',
                placeholder: 'HTML Email Subject (if different from title)',
                minimum: 0,
                maximum: 1,
                type: 'string',
            })


            addField('htmlBody', {
                title: 'HTML Message',
                description: 'For email notifications. If blank will default to the plain text message',
                minimum: 0,
                maximum: 1,
                directive: 'wysiwyg',
                type: 'string',
            })


            addField('senderEmail', {
                title: 'Sender Email Address',
                placeholder: 'eg. you@youraccount.com',
                minimum: 0,
                maximum: 1,
                type: 'string',
            })

            ///////////////////////////////////




            function addField(key, details) {
                details.key = key;
                array.push(details)
            }

            return array;
        },
        createMode() {
            return this.context == 'create';
        },
        viewMode() {
            return this.context == 'view';
        },
        editMode() {
            return this.context == 'edit';
        },
    }
}
</script>
<style>
</style>