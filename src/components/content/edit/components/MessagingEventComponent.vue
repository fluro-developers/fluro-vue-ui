<template>
    <div v-if="model" py-0>
        <fluro-content-form :options="options" v-model="model" :fields="customFields" ref="form">
            <template v-slot:form="{formFields, fieldHash, model, update, options}">
                <v-container fluid v-if="viewMode" pa-0>
                    <v-layout row wrap grid-list-xl py-0>
                        <v-flex lg1 md2 xs2>
                            <v-layout row wrap align-center justify-center style="height:100%;margin-left:-10px;">
                                <fluro-icon v-if="model.methods.includes('email')" icon="envelope" v-tippy content="Sends email" />
                                <fluro-icon v-if="model.methods.includes('push')" icon="mobile" v-tippy content="Sends push notification" />
                                <fluro-icon v-if="model.methods.includes('sms')" icon="comment" v-tippy content="Sends SMS" />
                            </v-layout>
                        </v-flex>
                        <v-flex lg11 md10 xs10>
                            <p class="muted mb-0">Sending to <span class="capitalize-text">{{sendToFormatted}}</span></p>
                            <h5>{{model.title}}<span v-if="model.htmlTitle"> ({{model.htmlTitle}})</span></h5>
                            <i v-if="model.body" class="muted mb-0">"{{model.body}}"</i>
                            <p class="muted mb-0">{{formattedTotalPeriodWhenPoint}} {{startDate ? '- ' + formattedTime.format("h:mma dddd MMM Do YYYY") : ''}} {{startDate ? '(' + formattedTime.fromNow() + ')' : ''}}</p>
                        </v-flex>
                    </v-layout>
                </v-container>
                <div v-else-if="editMode">
                    <v-container fluid pa-0>
                        <v-layout row wrap grid-list-xl py-0>
                            <v-flex lg1 md2 xs2>
                                <v-layout row wrap align-center justify-center style="height:100%;margin-left:-10px;">
                                    <fluro-icon v-if="model.methods.includes('email')" icon="envelope" v-tippy content="Sends email" />
                                    <fluro-icon v-if="model.methods.includes('push')" icon="mobile" v-tippy content="Sends push notification" />
                                    <fluro-icon v-if="model.methods.includes('sms')" icon="comment" v-tippy content="Sends SMS" />
                                </v-layout>
                            </v-flex>
                            <v-flex lg11 md10 xs10>
                                <p class="muted mb-0">Sending to <span class="capitalize-text">{{sendToFormatted}}</span></p>
                                <h5>{{model.title}}<span v-if="model.htmlTitle"> ({{model.htmlTitle}})</span></h5>
                                <i v-if="model.body" class="muted mb-0">"{{model.body}}"</i>
                                <p class="muted mb-0">{{formattedTotalPeriodWhenPoint}} {{startDate ? '- ' + formattedTime.format("h:mma dddd MMM Do YYYY") : ''}} {{startDate ? '(' + formattedTime.fromNow() + ')' : ''}}</p>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <v-container fluid pa-0 grid-list-xl>
                        <v-layout row wrap grid-list-xl py-0>
                            <v-flex sm12 xs12>
                                <fluro-panel>
                                    <fluro-panel-body>
                                        <h4>When</h4>
                                        <v-layout row wrap grid-list-xl>
                                            <v-flex xs12 sm3>
                                                <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.total" v-model="model" />
                                            </v-flex>
                                            <v-flex xs12 sm3>
                                                <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.period" v-model="model" />
                                            </v-flex>
                                            <v-flex xs12 sm3>
                                                <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.when" v-model="model" />
                                            </v-flex>
                                            <v-flex xs12 sm3>
                                                <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.point" v-model="model" />
                                            </v-flex>
                                        </v-layout>
                                    </fluro-panel-body>
                                </fluro-panel>
                                <fluro-panel>
                                    <fluro-panel-body>
                                        <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.title" v-model="model"></fluro-content-form-field>
                                        <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.body" v-model="model"></fluro-content-form-field>
                                    </fluro-panel-body>
                                </fluro-panel>
                                <fluro-panel v-if="model.methods.includes('email')">
                                    <fluro-panel-body>
                                        <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.htmlTitle" v-model="model"></fluro-content-form-field>
                                        <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.htmlBody" v-model="model"></fluro-content-form-field>
                                        <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.senderEmail" v-model="model"></fluro-content-form-field>
                                    </fluro-panel-body>
                                </fluro-panel>
                            </v-flex>
                            <v-flex sm6 xs12>
                                <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.methods" v-model="model"></fluro-content-form-field>
                            </v-flex>
                            <v-flex sm6 xs12>
                                <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.methodPreference" v-model="model"></fluro-content-form-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </div>
                <v-container fluid v-else-if="createMode" pa-0>
                    <v-layout row wrap grid-list-xl py-0>
                        <v-flex sm5 xs12 py-0>
                            <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.segments" v-model="model"></fluro-content-form-field>
                            <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.methods" v-model="model"></fluro-content-form-field>
                            <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.methodPreference" v-model="model"></fluro-content-form-field>
                        </v-flex>
                        <v-flex sm7 xs12 py-0>
                            <fluro-panel>
                                <fluro-panel-body>
                                    <h4>When</h4>
                                    <v-layout row wrap>
                                        <v-flex xs12 sm3>
                                            <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.total" v-model="model" />
                                        </v-flex>
                                        <v-flex xs12 sm3>
                                            <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.period" v-model="model" />
                                        </v-flex>
                                        <v-flex xs12 sm3>
                                            <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.when" v-model="model" />
                                        </v-flex>
                                        <v-flex xs12 sm3>
                                            <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.point" v-model="model" />
                                        </v-flex>
                                    </v-layout>
                                </fluro-panel-body>
                            </fluro-panel>
                            <fluro-panel>
                                <fluro-panel-body>
                                    <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.title" v-model="model"></fluro-content-form-field>
                                    <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.body" v-model="model"></fluro-content-form-field>
                                </fluro-panel-body>
                            </fluro-panel>
                            <fluro-panel v-if="model.methods.includes('email')">
                                <fluro-panel-body>
                                    <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.htmlTitle" v-model="model"></fluro-content-form-field>
                                    <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.htmlBody" v-model="model"></fluro-content-form-field>
                                    <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.senderEmail" v-model="model"></fluro-content-form-field>
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
// import { FluroContentForm, Layout } from 'fluro-vue-ui';
import FluroContentEditMixin from '../FluroContentEditMixin';
import FluroContentForm from '../../../form/FluroContentForm.vue';



export default {
    mixins: [FluroContentEditMixin],
    props: {
        value: {
            type: Object,
            default: {},
        },
        context: {
            type: String,
            default: 'create',
        },
        startDate: {
            type: Date,
        },
        endDate: {
            type: Date,
        }
    },
    components: {
        FluroContentForm,
    },
    data() {
        return {
            model: this.value,

        }
    },
    methods: {
        validate() {
            var form = this.$refs.form;
            if (!form) {
                return [];
            }
            this.model.errorMessages = form.errorMessages || [];
        },
        validateAllFields() {
            var form = this.$refs.form;
            form.touch();
            this.validate();
        },
    },
    computed: {
        customFields() {


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
            } else {
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
                defaultValues: [1],
                params: { minValue: 1 }
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
        sendToFormatted() {
            var self = this;
            var segments = self.model.segments;
            return segments.join(', ');
        },
        formattedTotalPeriodWhenPoint() {
            var self = this;
            var model = self.model;
            var period = self.model.period;
            if (model.total != 1) {
                period = period + 's';
            }
            return model.total + ' ' + period + ' ' + model.when + ' event ' + model.point;
        },
        formattedTime() {
            var self = this;
            var startDate, endDate;

            var total = self.model.total;
            var period = self.model.period;
            var when = self.model.when;
            var point = self.model.point;

            if (!self.startDate || !total || !period || !when || !point) {
                return;
            }

            if (!self.endDate) {
                endDate = self.startDate;
            } else {
                endDate = self.endDate;
            }

            startDate = self.startDate;


            //////////////////////////////////

            var eventTime;
            if (point == 'end') {
                eventTime = endDate;
            } else {
                eventTime = startDate;
            }

            //////////////////////////////////

            var displayedTime;
            if (when == 'before') {
                displayedTime = self.$fluro.date.moment(eventTime).subtract(total, period);
            } else {
                displayedTime = self.$fluro.date.moment(eventTime).add(total, period);
            }

            return displayedTime;
        }
    }
}
</script>
<style>
.capitalize-text {
    text-transform: capitalize;
}
</style>