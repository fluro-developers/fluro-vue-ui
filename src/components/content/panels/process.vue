<template>
    <flex-column>
        <template v-if="loading">
            <fluro-page-preloader contain />
        </template>
        <tabset v-else :justified="true" :vertical="true">
            <template v-slot:menuprefix>
                <template v-if="context == 'edit' && $vuetify.breakpoint.mdAndUp">
                    <!-- <flex-column-header style="text-align:center"> -->
                    <!-- <div style="padding: 10px;max-width:200px;margin: auto;"> -->
                    <!-- <fluro-avatar-update :id="model._id" type="contact" /> -->
                    <!-- </div> -->
                    <!-- </flex-column-header> -->
                </template>
            </template>
            <tab heading="Card Details">
                <slot>
                    <!-- <pre>{{model.state}} {{model.dueDate}}</pre> -->
                    <flex-column-body style="background: #fafafa;">
                        <v-container class="grid-list-xl">
                            <constrain sm>
                                <h3 margin>{{title}}</h3>
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" :options="options" :field="fieldHash.dueDate" v-model="model"></fluro-content-form-field>
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" :options="options" :field="fieldHash.state" v-model="model"></fluro-content-form-field>
                                <template v-if="definition && definition.fields.length">
                                    <fluro-content-form :options="options" v-model="model.data" :fields="definition.fields"></fluro-content-form>
                                </template>
                                <!-- </fluro-card-body> -->
                                <!-- </fluro-card> -->
                                <v-input class="no-flex">
                                    <v-label>Key Contacts</v-label>
                                    <p class="help-block">This card does not reference a contact, Here you can specify who should be sent Automated SMS and Mailouts as this card progresses</p>
                                    <fluro-content-form-field :form-fields="formFields" :showLabel="false" :outline="showOutline" :options="options" :field="fieldHash.contacts" v-model="model"></fluro-content-form-field>
                                </v-input>
                                <v-input class="no-flex">
                                    <v-label>Assigned To</v-label>
                                    <p class="help-block">Assign who is in charge of this card</p>
                                    <fluro-content-form-field :form-fields="formFields" :showLabel="false" :outline="showOutline" :options="options" :field="fieldHash.assignedTo" v-model="model"></fluro-content-form-field>
                                </v-input>
                                <!-- 

  <div class="form-group">
                        <label>{{item._id ? 'Current' : 'Starting'}} State</label>
                        <select ng-model="item.state" class="form-control">
                            <option value="{{state.key}}" ng-repeat="state in definition.data.states">{{state.title}}</option>
                        </select>
                    </div>
 -->
                                <!-- <v-input class="no-flex">
                                    <v-label>Assigned To Team</v-label>
                                    <p class="help-block">Assign who is in charge of this card</p>
                                    <fluro-content-form-field :form-fields="formFields" :showLabel="false" :outline="showOutline" :options="options" :field="fieldHash.assignedTo" v-model="model"></fluro-content-form-field>
                                </v-input> -->
                                <!-- <wrapper xs>
                                        <template v-if="definition && definition.fields.length">
                                            <h5>{{definition.title}} info</h5>
                                            <fluro-content-form :options="options" v-model="model.data" :fields="definition.fields"></fluro-content-form>
                                        </template>
                                    </wrapper>
                                </template> -->
                            </constrain>
                        </v-container>
                    </flex-column-body>
                </slot>
            </tab>
            <tab heading="Forms" v-if="model.forms && model.forms.length">
                <slot>
                    <flex-column-body style="background: #fafafa;">
                        <v-container>
                            <constrain sm>
                                <h3 margin>Forms</h3>
                                <v-input class="no-flex" v-if="receivedForms && receivedForms.length">
                                    <v-label>Received {{receivedForms.length}} Form Responses</v-label>
                                    <p class="help-block">These forms have not yet been submitted</p>
                                    <list-group>
                                        <list-group-item v-for="form in receivedForms">
                                            <strong>
                                                <fluro-icon type="form" /> {{form.form.title}}
                                            </strong>
                                            <div class="sm">
                                                <fluro-icon icon="check" /> Received {{form.received | formatDate('h:mma ddd MMM YYYY')}} {{form.received | timeago}}
                                            </div>
                                        </list-group-item>
                                    </list-group>
                                </v-input>
                                <v-input class="no-flex" v-if="awaitingForms">
                                    <v-label>Awaiting {{awaitingForms.length}} Form Responses</v-label>
                                    <p class="help-block">These forms have not yet been submitted</p>
                                    <list-group>
                                        <list-group-item v-for="form in awaitingForms">
                                            <strong>
                                                <fluro-icon type="form" /> {{form.form.title}}
                                            </strong>
                                            <div class="sm">Sent {{form.sent | timeago}} - <span class="status-label draft">
                                                    <fluro-icon icon="clock" /> Awaiting form response</span>
                                            </div>
                                            <!-- <div class="small brand-success">Received {{form.received | formatDate:'g:ia l j M Y'}} - ({{form.received | timeago}})</div> -->
                                            <!-- <pre>{{form}}</pre> -->
                                            <template v-slot:right>
                                                <v-btn small color="primary" @click="resend(form)" :loading="resending[form.form._id]">
                                                    Resend
                                                    <fluro-icon right icon="paper-plane" />
                                                </v-btn>
                                            </template>
                                        </list-group-item>
                                    </list-group>
                                </v-input>
                            </constrain>
                        </v-container>
                    </flex-column-body>
                </slot>
            </tab>
            <tab heading="Metadata" v-if="context == 'edit'">
                <slot>
                    <flex-column-body style="background: #fafafa;">
                        <v-container>
                            <constrain sm>
                                <h3 margin>Metadata</h3>
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.timezone" v-model="model"></fluro-content-form-field>
                                <v-layout>
                                    <v-flex>
                                        <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.deceased" v-model="model"></fluro-content-form-field>
                                    </v-flex>
                                    <v-flex v-show="model.deceased">
                                        <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.deceasedDate" v-model="model"></fluro-content-form-field>
                                    </v-flex>
                                </v-layout>
                                <div v-if="model.data">
                                    <v-card>
                                        <v-card-text>
                                            <h5>Explore Metadata</h5>
                                            <json-view :data="model.data" />
                                        </v-card-text>
                                    </v-card>
                                </div>
                                <!-- <pre>{{model}}</pre> -->
                            </constrain>
                        </v-container>
                    </flex-column-body>
                </slot>
            </tab>
            <!-- <tab :heading="sheet.title" v-for="sheet in sheetDefinitions">
                <slot>
                    <flex-column-body style="background: #fafafa;">
                        <v-container>
                            <wrapper xs>
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="sheet.field" v-model="details"></fluro-content-form-field>
                            </wrapper>
                        </v-container>
                    </flex-column-body>
                </slot>
            </tab> -->
            <!-- <tab heading="Classification">
                <slot>
                    <flex-column-body style="background: #fafafa;">
                        <v-container>
                            <wrapper xs>
                                <template v-if="contactDefinitions.length">
                                    <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="definitionField" v-model="model"></fluro-content-form-field>
                                </template>
                                <fluro-realm-select :expanded="true" v-model="model.realms" type="contact" />
                            </wrapper>
                        </v-container>
                    </flex-column-body>
                </slot>
            </tab> -->
        </tabset>
        <!-- <flex-column-body> -->
        <!-- <pre>{{details}}</pre> -->
        <!-- </flex-column-body> -->
    </flex-column>
</template>
<script>
/////////////////////////////////

import FluroContentForm from '../../form/FluroContentForm';
import FluroContentFormField from '../../form/FluroContentFormField';
// import FluroAcademicSelect from '../../form/FluroAcademicSelect';
import Layout from '../../../mixins/Layout';
// import FluroRealmSelect from '../../form/realmselect/FluroRealmSelect.vue';
import FluroContentPanelMixin from '../FluroContentPanelMixin';
// import { FluroAvatarUpdate } from 'fluro-vue-ui';


/////////////////////////////////

import Vue from 'vue';

/////////////////////////////////

export default {
    props: {
        'fields': {
            type: Array,
            default () {

                var array = [];

                ///////////////////////////////////

                addField('title', {
                    title: 'Title',
                    minimum: 1,
                    maximum: 1,
                    type: 'string',
                    placeholder: '',
                })

                ///////////////////////////////////

                addField('contacts', {
                    title: 'Key Contacts',
                    minimum: 0,
                    maximum: 0,
                    type: 'reference',
                    params: {
                        restrictType: 'contact',
                    }
                })


                ///////////////////////////////////

                addField('dueDate', {
                    title: 'Select a Due Date',
                    minimum: 0,
                    maximum: 1,
                    type: 'date',
                    directive: 'datetime-select',
                    params: {

                    }
                })


                ///////////////////////////////////

                addField('assignedTo', {
                    title: 'Assigned To',
                    minimum: 0,
                    maximum: 0,
                    type: 'reference',
                    params: {
                        restrictType: 'contact',
                    }
                })

                addField('state', {
                    title: 'Current State',

                    minimum: 0,
                    maximum: 1,
                    type: 'string',
                    directive: 'select',
                    options: _.map(self.states, function(state) {
                        // console.log('STATE', state);
                        return {
                            name: state.title,
                            value: state.key,
                        }
                    })

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

                //Update fields to use the default fields we set above
                return array;
            }
        }
    },
    mixins: [Layout, FluroContentPanelMixin],
    components: {
        // FluroAvatarUpdate,
        FluroContentForm,
        // FluroRealmSelect,
        FluroContentFormField,
        // FluroAcademicSelect,
    },
    methods: {

        // $scope.resendForm = function(formRow) {
        //        formRow.processing = true;


        //        console.log('FORM', formRow);
        //        var cardID = $scope.item._id;
        //        var formID = _.get(formRow, 'form._id')  || _.get(formRow, 'form');

        //        FluroContent.endpoint('process/resend/' + cardID + '/' + formID).update().$promise.then(function(res) {
        //            console.log('Results!')
        //            Notifications.status('Form has been resent');
        //            formRow.processing = false;
        //        }, function(err) {
        //            console.log('Error', err);

        //            Notifications.error('There was an error resending the form');
        //            formRow.processing = false;
        //        });
        //        // router.put('/resend/:cardID/:formID', processEditMiddleware, function(req, res) {
        //    }



        resend(form) {

            var self = this;
            var cardID = self.$fluro.utils.getStringID(self.model);
            var formID = self.$fluro.utils.getStringID(form.form);
            self.$set(self.resending, formID, true);

            return self.$fluro.api.put(`/process/resend/${cardID}/${formID}`)
                .then(function(res) {
                    self.$fluro.notify('Form was resent');
                    self.$set(self.resending, formID, false);
                })
                .catch(function(err) {
                    self.$fluro.error(err);
                    self.$set(self.resending, formID, false);
                })




            // this.resending[]
            // this.$set(form, 'resending', true);
        },
        // ping(device) {
        //     var self = this;

        //     device.pinging = true;

        //     self.$fluro.api.get(`/push/ping/${device._id}`, { cache: false })
        //         .then(function(res) {
        //             device.pinging = false;
        //             self.$fluro.notify('Ping notification sent!')
        //         })
        //         .catch(function(err) {
        //             device.pinging = false;
        //             self.$fluro.error(err);

        //         })
        // },
        // resetDevices() {
        //     var self = this;

        //     self.$fluro.api.get(`/push/clear/${self.itemID}`, { cache: false })
        //         .then(function(res) {
        //             self.$fluro.notify('Devices Reset!')
        //             console.log('Reset')
        //         })
        //         .catch(function(err) {
        //             self.$fluro.error(err);
        //         })
        // },
        // toggleSubscription(type) {

        //     var self = this;

        //     switch (type) {
        //         case 'sms':
        //             if (self.unsubscribedSMS) {
        //                 self.subscribe('sms');
        //             } else {
        //                 self.unsubscribe('sms');
        //             }
        //             break;
        //         case 'mailout':
        //             if (self.unsubscribedMailout) {
        //                 self.subscribe('mailout');
        //             } else {
        //                 self.unsubscribe('mailout');
        //             }
        //             break;
        //     }
        // },
        // subscribe(type) {
        //     var self = this;
        //     var url;

        //     switch (type) {
        //         case 'mailout':
        //             if (!self.emails || !self.emails.length) {
        //                 self.$fluro.error('No email addresses provided')
        //                 return;
        //             }
        //             url = `/mailout/resubscribe`;
        //             break;
        //         case 'sms':
        //             if (!self.phoneNumbers || !self.phoneNumbers.length) {
        //                 self.$fluro.error('No phone numbers provided')
        //                 return;
        //             }
        //             url = `/sms/resubscribe`;
        //             break;
        //     }

        //     ///////////////////////

        //     self.$fluro.api.post(url, {
        //             phoneNumbers: self.phoneNumbers,
        //             emails: self.emails,
        //         })
        //         .then(function() {
        //             self.subscriptionCacheKey = Math.random();
        //         })
        // },
        // unsubscribe(type) {
        //     var self = this;
        //     var url;

        //     switch (type) {
        //         case 'mailout':
        //             if (!self.emails || !self.emails.length) {
        //                 self.$fluro.error('No email addresses provided')
        //                 return;
        //             }
        //             url = `/mailout/unsubscribe`;
        //             break;
        //         case 'sms':
        //             if (!self.phoneNumbers || !self.phoneNumbers.length) {
        //                 self.$fluro.error('No phone numbers provided')
        //                 return;
        //             }
        //             url = `/sms/unsubscribe`;
        //             break;
        //     }

        //     ///////////////////////

        //     self.$fluro.api.post(url, {
        //             phoneNumbers: self.phoneNumbers,
        //             emails: self.emails,
        //         })
        //         .then(function() {
        //             self.subscriptionCacheKey = Math.random();
        //         })
        // },
        // updateAcademicCalendar(calendar) {
        //     var self = this;
        //     self.$set(self.model, 'academicCalendar', calendar);
        //     self.update(self.model);

        // },
        // updateAcademicGrade(grade) {
        //     var self = this;
        //     self.$set(self.model, 'academicGrade', grade);
        //     self.update(self.model);

        // },
        // updateFamily() {
        //     var self = this;

        //     var enteredValues = _.chain(self.family)
        //         .get('address')
        //         .values()
        //         .compact()
        //         .value();

        //     if (enteredValues && enteredValues.length) {
        //         self.$set(self.model, 'family', self.family);
        //     } else {
        //         self.$delete(self.model, 'family');
        //     }
        //     // console.log('Family Updated', self.mod el);
        // },
        // updateSheet() {

        //     var self = this;

        //     var mappedDetails = _.reduce(self.details, function(set, entry, key) {
        //         if (entry) {
        //             var enteredValues = _.chain(entry.data)
        //                 .values()
        //                 .compact()
        //                 .value();
        //             if (enteredValues.length) {
        //                 set[key] = entry;
        //             }
        //         }

        //         return set;

        //     }, {});


        //     // console.log('Details', mappedDetails)
        //     // if (self.context == 'edit') {
        //     //If we are in edit mode we don't want to edit the details
        //     // } else {
        //     //Add the details onto our model so they are saved when we hit submit
        //     self.$set(self.model, 'details', mappedDetails);
        //     // }
        //     // console.log('Sheet Updated', self.model);
        // }
    },

    // beforeCreate: function() {
    // this.$options.components.FluroContentForm = require('./FluroContentForm.vue').default;
    // this.$options.components.FluroContentFormField = require('./FluroContentFormField.vue').default;
    // },
    // watch: {
    //     title(val) {

    //         this.$set(this.model, 'title', this.title);
    //         // this.model.title = val;
    //         this.update(this.model)


    //     },
    // },
    created() {
        var self = this;





    },
    asyncComputed: {
        // devices: {
        //     default: [],
        //     get() {

        //         var self = this;


        //         if (self.context != 'edit' || !self.itemID) {
        //             return Promise.resolve([]);
        //         }

        //         //////////////////////////////////////

        //         return new Promise(function(resolve, reject) {

        //             self.$fluro.api.get(`/contact/${self.itemID}/devices`)
        //                 .then(function(res) {
        //                     resolve(_.map(res.data, function(device) {
        //                         device.pinging = false;
        //                         return device;
        //                     }));
        //                 })
        //                 .catch(function(err) {
        //                     reject(err);
        //                 })

        //         })
        //     }
        // },
    },
    computed: {
        title() {
            return this.model && this.model.title ? this.model.title : 'New card'
        },
        states() {
            return _.get(this.definition, 'data.states');
            // this.definition && this.definition.data ? this.definition.data.states : []
        },
        awaitingForms() {
            var self = this;

            return _.filter(self.model.forms, function(entry) {
                return !entry.interaction;
            })

        },
        receivedForms() {
            var self = this;

            return _.filter(self.model.forms, function(entry) {
                return entry.interaction;
            })

        },
        showOutline() {
            return false; //true; //false;//true;//false;//true;
        },
    },

    data() {
        return {
            resending: {},
        }
    },
}
</script>
<style scoped lang="scss">
.hint {
    font-size: 10px;
    opacity: 0.5;
    color: inherit;
    display: block;

}

.bordered {
    border: 1px solid rgba(#000, 0.1);
    box-shadow: 0 2px 4px rgba(#000, 0.1);

    & /deep/ .tabset-menu {
        background: #eee;
    }
}
</style>