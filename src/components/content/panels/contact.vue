<template>
    <flex-column>
        <template v-if="loading">
            <fluro-page-preloader contain />
        </template>
        <tabset v-else :justified="true" :vertical="true">
            <template v-slot:menuprefix>
                <template v-if="context == 'edit' && $vuetify.breakpoint.mdAndUp">
                    <flex-column-header style="text-align:center">
                        <div style="padding: 10px;max-width:200px;margin: auto;">
                            <fluro-avatar-update :id="model._id" type="contact" />
                        </div>
                    </flex-column-header>
                </template>
            </template>
            <tab heading="Basic Details">
                <slot>
                    <flex-column-body style="background: #fafafa;">
                        <!-- <v-flex xs12 md3 style="background: #eee;">
                                <ul>
                                    <li>
                                        Basic Details
                                    </li>
                                    <li v-for="sheet in sheetDefinitions">
                                        {{sheet.title}}
                                    </li>
                                </ul>

                               
                            </v-flex> -->
                        <v-container class="grid-list-xl">
                            <constrain sm>
                                <h3 margin>Basic Details</h3>
                                <template v-if="$vuetify.breakpoint.xsOnly">
                                    <template v-if="context == 'edit'">
                                        <div style="max-width:200px;margin: auto;">
                                            <fluro-avatar-update :id="model._id" type="contact" />
                                        </div>
                                    </template>
                                </template>
                                <wrapper xs>
                                    <v-layout row wrap>
                                        <v-flex :class="{'xs12':$vuetify.breakpoint.xsOnly}">
                                            <fluro-content-form-field :autofocus="$vuetify.breakpoint.smAndUp" class="right-messages" :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.firstName" v-model="model"></fluro-content-form-field>
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
                                    <template v-if="contactDefinitions.length">
                                        <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="definitionField" v-model="model"></fluro-content-form-field>
                                    </template>
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
                                <wrapper xs>
                                    <v-input class="no-flex">
                                        <v-label>School / Academic Details</v-label>
                                        <!-- <h5>School / Academic Details</h5> -->
                                        <fluro-academic-select :form-fields="formFields" :outline="showOutline" :options="options" @calendar="updateAcademicCalendar" @grade="updateAcademicGrade" v-model="model" />
                                        </fluro-academic-select>
                                    </v-input>
                                    <v-input class="no-flex">
                                        <v-label>Checkin Nametag Notes</v-label>
                                        <p class="help-block">Publicly displayed notes to be printed on {{contextName}} nametag</p>
                                        <fluro-content-form-field :form-fields="formFields" :showLabel="false" :outline="showOutline" @input="update" :options="options" :field="fieldHash.nametagNotes" v-model="model"></fluro-content-form-field>
                                    </v-input>
                                </wrapper>
                            </constrain>
                        </v-container>
                        <!-- <template v-if="context != 'edit'"> -->
                        <!-- <v-container v-if="sheetDefinitions.length"> -->
                        <!-- <h3 margin>Detail Sheets</h3> -->
                        <!-- <Div class="bordered"> -->
                        <!-- <tabset :justified="true"> -->
                        <!-- <tab :heading="sheet.title" v-for="sheet in sheetDefinitions"> -->
                        <!-- <slot> -->
                        <!-- <v-container> -->
                        <!-- <pre>{{details[sheet.definitionName].realms}}</pre> -->
                        <!-- <fluro-realm-select v-model="details[sheet.definitionName].realms" type="contactdetail" :definition="sheet.definitionName" /> -->
                        <!-- <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="updateSheet" :options="options" :field="sheet.field" v-model="details"></fluro-content-form-field> -->
                        <!-- <fluro-content-form @input="updateSheet" :options="options" v-model="details[sheet.definitionName].data" :fields="sheet.fields" /> -->
                        <!-- </v-container> -->
                        <!-- </slot> -->
                        <!-- </tab> -->
                        <!-- </tabset> -->
                        <!-- </Div> -->
                        <!-- </v-container> -->
                        <!-- </template> -->
                        <!-- <template v-else> -->
                        <!-- <detail-sheet-manager ></detail-sheet-manager> -->
                        <!-- <pre>DETAILS AND STUFF</pre> -->
                        <!-- </template> -->
                    </flex-column-body>
                </slot>
            </tab>
            <tab heading="Household & Relationships">
                <slot>
                    <flex-column-body style="background: #fafafa;">
                        <v-container grid-list-xl>
                            <constrain sm>
                                <template v-if="context == 'edit'">
                                    <h3 margin>Household &amp; Relationships</h3>
                                    <v-layout row wrap>
                                        <v-flex xs12 sm6>
                                            <fluro-content-form-field :override-label="`${contextName} Household Role`" :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.householdRole" v-model="model"></fluro-content-form-field>
                                        </v-flex>
                                    </v-layout>
                                    <!-- <v-flex xs12 sm6> -->
                                    <v-input class="no-flex">
                                        <v-label>Family Household</v-label>
                                        <p class="help-block">Select {{contextName}} primary residence</p>
                                        <fluro-content-form-field :form-fields="formFields" :showLabel="false" :outline="showOutline" @input="update" :options="options" :field="fieldHash.family" v-model="model"></fluro-content-form-field>
                                    </v-input>
                                    <!-- </v-flex> -->
                                    <!-- <v-flex> -->
                                    <!-- </v-flex> -->
                                    <!-- </v-layout> -->
                                </template>
                                <template v-else>
                                    <h3 margin>Household</h3>
                                    <v-layout row wrap>
                                        <!-- <v-flex xs12 sm6> -->
                                        <!-- <fluro-content-form-field :form-fields="formFields" :showLabel="false" :outline="showOutline" @input="update" :options="options" :field="fieldHash.family" v-model="model"></fluro-content-form-field> -->
                                        <!-- </v-flex> -->
                                        <v-flex xs12 sm6>
                                            <fluro-content-form-field :override-label="`${contextName} Household Role`" :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.householdRole" v-model="model"></fluro-content-form-field>
                                        </v-flex>
                                    </v-layout>
                                    <h5>{{contextName}} Household</h5>
                                    <!-- @errorMessages="validate" -->
                                    <fluro-content-form @input="updateFamily" :options="options" v-model="family" :fields="familyFields" />
                                    <!-- <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="updateFamily" :options="options" :field="fieldHash.dynamicFamily" v-model="family"></fluro-content-form-field> -->
                                </template>
                            </constrain>
                        </v-container>
                    </flex-column-body>
                </slot>
            </tab>
            <tab heading="Rostering / Availability" v-if="context == 'edit'">
                <slot>
                    <flex-column-body style="background: #fafafa;">
                        <v-container grid-list-xl>
                            <constrain sm>
                                <h3 margin>Rostering / Availability</h3>
                                <v-input class="no-flex">
                                    <v-label>Capabilities</v-label>
                                    <p class="help-block">Add to {{contextName}} capabilities</p>
                                    <fluro-content-form-field :form-fields="formFields" :showLabel="false" :outline="showOutline" :options="options" :field="fieldHash.capabilities" v-model="model"></fluro-content-form-field>
                                </v-input>
                            </constrain>
                        </v-container>
                    </flex-column-body>
                </slot>
            </tab>
            <tab heading="Notifications" v-if="context == 'edit'">
                <slot>
                    <flex-column-body style="background: #fafafa;">
                        <v-container grid-list-xl>
                            <constrain sm>
                                <h3 margin>Notifications</h3>
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.countryCode" v-model="model"></fluro-content-form-field>
                                <v-input class="no-flex" v-if="phoneNumbers.length || emails.length">
                                    <v-label>Communication Preferences</v-label>
                                    <p class="help-block">Manage {{contextName}} subscription preferences below</p>
                                    <div class="toggle-items">
                                        <template v-if="emails.length">
                                            <fluro-toggle-item @click.native="toggleSubscription('mailout')" :inactive="unsubscribedMailout">
                                                Allow Promotional Emails
                                            </fluro-toggle-item>
                                        </template>
                                        <template v-if="phoneNumbers.length">
                                            <fluro-toggle-item @click.native="toggleSubscription('sms')" :inactive="unsubscribedSMS">
                                                Allow Promotional SMS
                                            </fluro-toggle-item>
                                        </template>
                                        <!--  <div class="toggle-item" @click="toggleSubscription('sms')" :class="{inactive:unsubscribedSMS}">
                                                <v-layout>
                                                    <v-flex>Allow Promotional SMS</v-flex>
                                                    <v-spacer />
                                                    <div class="toggle-switch" />
                                                </v-layout>
                                            </div> -->
                                    </div>
                                    <!-- <pre>{{smsUnsubscribes}}</pre> -->
                                    <!-- <pre>{{mailoutUnsubscribes}}</pre> -->
                                </v-input>
                                <p></p>
                                <v-input class="no-flex" v-if="devices.length">
                                    <v-label>{{contextName}} Connected Devices</v-label>
                                    <list-group>
                                        <list-group-item v-for="device in devices">
                                            <template v-slot:left>
                                                <fluro-icon icon="mobile" />
                                            </template>
                                            <template v-slot:default>
                                                <div>
                                                    <strong class="text-capitalize">
                                                        {{device.application}} - {{device.metadata.model}}
                                                    </strong>
                                                    <div class="sm text-muted">{{device.metadata.platform}} {{device.metadata.version}}</div>
                                                </div>
                                            </template>
                                            <template v-slot:right>
                                                <v-btn small :loading="device.pinging" @click="ping(device)">
                                                    Ping
                                                </v-btn>
                                            </template>
                                        </list-group-item>
                                    </list-group>
                                    <p class="help-block">
                                        If you are experiencing problems with push notifications it can sometimes be helpful to reset all devices for a contact allowing them to reconnect next time they sign in to an application
                                    </p>
                                    <v-btn small @click="resetDevices()">
                                        <span>Reset all devices</span>
                                        <fluro-icon icon="trash" />
                                    </v-btn>
                                </v-input>
                            </constrain>
                        </v-container>
                    </flex-column-body>
                </slot>
            </tab>
            <!-- v-if="context == 'edit'" -->
            <tab :heading="sheet.title" v-for="sheet in sheetDefinitions">
                <slot>
                    <flex-column-body style="background: #fafafa;">
                        <v-container>
                            <constrain sm>
                                <!-- <pre>{{sheet.definitionName}}</pre> -->
                                <!-- <pre>{{details[sheet.definitionName]}}</pre> -->
                                <!-- <pre>{{details[sheet.definitionName]}}</pre> -->
                                <!-- <pre>{{details[sheet.definitionName]}}</pre> -->
                                <h3 margin>{{sheet.title}}</h3>
                                <!-- <pre>{{sheet._id}}</pre> -->
                                <v-input class="no-flex">
                                    <v-label>Realms</v-label>
                                    <p class="help-block">Select where {{contextName}} {{sheet.title}} information should be stored</p>
                                    <fluro-realm-select v-model="details[sheet.definitionName].realms" type="contactdetail" :definition="sheet.definitionName" />
                                    </fluro-realm-select>
                                </v-input>
                                <!-- @input="updateSheet" -->
                                <!-- <pre>{{details[sheet.definitionName].data}}</pre> -->
                                <!-- @input="updateSheet"  -->
                                <!-- <pre>{{details[sheet.definitionName]}}</pre> -->
                                <fluro-content-form :options="options" @input="updateSheet" v-model="details[sheet.definitionName].data" :fields="sheet.fields" />
                                <!-- <fluro-content-form-field :form-fields="formFields" :outline="showOutline" :options="options" :field="sheet.field" v-model="details"></fluro-content-form-field> -->
                                <!-- <fluro-content-form @input="updateDetailSheet" :options="options" v-model="details[sheet.definitionName].data" :fields="sheet.fields" /> -->
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
import FluroAcademicSelect from '../../form/FluroAcademicSelect';
import Layout from '../../../mixins/Layout';
import FluroRealmSelect from '../../form/realmselect/FluroRealmSelect.vue';
import FluroContentPanelMixin from '../FluroContentPanelMixin';
import { FluroAvatarUpdate } from 'fluro-vue-ui';


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
                            name: 'None',
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



                addField('deceased', {
                    title: 'Mark as deceased',
                    minimum: 0,
                    maximum: 1,
                    type: 'boolean',
                    directive: 'checkbox',
                })

                addField('deceasedDate', {
                    title: 'Deceased Date',
                    minimum: 0,
                    maximum: 1,
                    type: 'date',
                    directive: 'date-select',
                })





                var timezones = _.map(self.$fluro.date.timezones(), function(timezone) {
                    return { name: timezone, value: timezone };
                });

                timezones.unshift({
                    name: 'Use Account Default',
                    value: '',
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

                addField('timezone', {
                    title: 'Primary Timezone',
                    minimum: 0,
                    maximum: 1,
                    type: 'string',
                    directive: 'timezone-select',
                    description: 'Set a local timezone for this contact',
                })

                addField('countryCode', {
                    title: 'Default Country Code',
                    minimum: 0,
                    maximum: 1,
                    type: 'string',
                    directive: 'countrycodeselect',
                })
                ///////////////////////////////////

                addField('nametagNotes', {
                    title: 'Checkin Nametag Notes',
                    minimum: 0,
                    maximum: 1,
                    type: 'string',
                })

                ///////////////////////////////////

                addField('capabilities', {
                    title: 'Capabilities',
                    minimum: 0,
                    maximum: 0,
                    type: 'reference',
                    description: 'Add capabilities for this contact',
                    params: {
                        restrictType: 'capability',
                    }
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
    mixins: [Layout, FluroContentPanelMixin],
    components: {
        FluroAvatarUpdate,
        FluroContentForm,
        FluroRealmSelect,
        FluroContentFormField,
        FluroAcademicSelect,
    },
    methods: {
        ping(device) {
            var self = this;

            device.pinging = true;

            self.$fluro.api.get(`/push/ping/${device._id}`, { cache: false })
                .then(function(res) {
                    device.pinging = false;
                    self.$fluro.notify('Ping notification sent!')
                })
                .catch(function(err) {
                    device.pinging = false;
                    self.$fluro.error(err);

                })
        },
        resetDevices() {
            var self = this;

            self.$fluro.api.get(`/push/clear/${self.itemID}`, { cache: false })
                .then(function(res) {
                    self.$fluro.notify('Devices Reset!')
                    console.log('Reset')
                })
                .catch(function(err) {
                    self.$fluro.error(err);
                })
        },
        toggleSubscription(type) {

            var self = this;

            switch (type) {
                case 'sms':
                    if (self.unsubscribedSMS) {
                        self.subscribe('sms');
                    } else {
                        self.unsubscribe('sms');
                    }
                    break;
                case 'mailout':
                    if (self.unsubscribedMailout) {
                        self.subscribe('mailout');
                    } else {
                        self.unsubscribe('mailout');
                    }
                    break;
            }
        },
        subscribe(type) {
            var self = this;
            var url;

            switch (type) {
                case 'mailout':
                    if (!self.emails || !self.emails.length) {
                        self.$fluro.error('No email addresses provided')
                        return;
                    }
                    url = `/mailout/resubscribe`;
                    break;
                case 'sms':
                    if (!self.phoneNumbers || !self.phoneNumbers.length) {
                        self.$fluro.error('No phone numbers provided')
                        return;
                    }
                    url = `/sms/resubscribe`;
                    break;
            }

            ///////////////////////

            self.$fluro.api.post(url, {
                    phoneNumbers: self.phoneNumbers,
                    emails: self.emails,
                })
                .then(function() {
                    self.subscriptionCacheKey = Math.random();
                })
        },
        unsubscribe(type) {
            var self = this;
            var url;

            switch (type) {
                case 'mailout':
                    if (!self.emails || !self.emails.length) {
                        self.$fluro.error('No email addresses provided')
                        return;
                    }
                    url = `/mailout/unsubscribe`;
                    break;
                case 'sms':
                    if (!self.phoneNumbers || !self.phoneNumbers.length) {
                        self.$fluro.error('No phone numbers provided')
                        return;
                    }
                    url = `/sms/unsubscribe`;
                    break;
            }

            ///////////////////////

            self.$fluro.api.post(url, {
                    phoneNumbers: self.phoneNumbers,
                    emails: self.emails,
                })
                .then(function() {
                    self.subscriptionCacheKey = Math.random();
                })
        },
        updateAcademicCalendar(calendar) {
            var self = this;
            self.$set(self.model, 'academicCalendar', calendar);
            self.update(self.model);

        },
        updateAcademicGrade(grade) {
            var self = this;
            self.$set(self.model, 'academicGrade', grade);
            self.update(self.model);

        },
        updateFamily() {
            var self = this;

            var enteredValues = _.chain(self.family)
                .get('address')
                .values()
                .compact()
                .value();

            if (enteredValues && enteredValues.length) {
                self.$set(self.model, 'family', self.family);
            } else {
                self.$delete(self.model, 'family');
            }
            // console.log('Family Updated', self.mod el);
        },
        updateSheet() {

            var self = this;

            var mappedDetails = _.reduce(self.details, function(set, entry, key) {
                if (entry) {
                    var enteredValues = _.chain(entry.data)
                        .values()
                        .compact()
                        .value();
                    if (enteredValues.length) {
                        set[key] = entry;
                    }
                }

                return set;

            }, {});


            // console.log('Details', mappedDetails)
            // if (self.context == 'edit') {
            //If we are in edit mode we don't want to edit the details
            // } else {
            //Add the details onto our model so they are saved when we hit submit
            self.$set(self.model, 'details', mappedDetails);
            // }
            // console.log('Sheet Updated', self.model);
        }
    },

    // beforeCreate: function() {
    // this.$options.components.FluroContentForm = require('./FluroContentForm.vue').default;
    // this.$options.components.FluroContentFormField = require('./FluroContentFormField.vue').default;
    // },
    watch: {
        title(val) {

            this.$set(this.model, 'title', this.title);
            // this.model.title = val;
            this.update(this.model)


        },
    },
    created() {

        var self = this;

        if (!self.model.academicCalendar) {
            self.$set(self.model, 'academicCalendar', '');
        }

        if (!self.model.academicGrade) {
            self.$set(self.model, 'academicGrade', '');
        }

        //////////////////////////////////////////////////////////////

        //When we first create the thing, we need to double check and see if we already have data
        //If we do already have data then we will use that
        if (self.config && self.config.details && self.config.details.length) {

            self.sheetDefinitions = _.reduce(self.config.details, function(set, definition) {

                if (!definition.fields || !definition.fields.length) {
                    return set;
                }


                var definitionName = definition.definitionName;


                var field = {
                    _id: definition._id,
                    title: definition.title,
                    type: 'group',
                    key: definitionName,
                    fields: definition.fields,
                    asObject: true,
                    minimum: 1,
                    maximum: 1,
                    askCount: 1,
                }


                ///////////////////////////////////////////////////////////////
                ///////////////////////////////////////////////////////////////
                ///////////////////////////////////////////////////////////////


                var existingEntry = _.get(self.model, `details.${definitionName}`);

                var cleanedEntry = {
                    realms: [],
                    data: {},
                }

                ///////////////////////////////////////////////////////////////

                if (existingEntry) {
                    if (existingEntry.items && existingEntry.items.length) {
                        var item = existingEntry.items[0];
                        if (!item.data) {
                            item.data = {};
                        }

                        if (!item.realms) {
                            item.realms = [];
                        }

                        cleanedEntry = item;
                    }
                }

                ///////////////////////////////////////////////////////////////


                self.$set(self.details, definitionName, cleanedEntry);

                ///////////////////////////////////////////////////////////////
                ///////////////////////////////////////////////////////////////

                definition.field = field;
                set.push(definition);


                return set;

            }, [])


            console.log('dETAILS', self.details)
        }
    },
    asyncComputed: {
        contactDefinitions: {
            default:[],
            get() {
                var self = this;

                // if (!self.config || !self.config.details || !self.config.details.length) {
                //     return [];
                // }

                return new Promise(function(resolve, reject) {


                    self.$fluro.types.subTypes('contact')
                        .then(function(definitions) {



                            var definitions = _.map(definitions, function(definition, key) {
                                return {
                                    _id: definition._id,
                                    name: definition.title,
                                    value: definition.definitionName,
                                }
                            });

                            // if(definitions.length) {
                            //     definitions.unshift({
                            //         name:'Basic Contact',
                            //         value:null,
                            //     })
                            // }

                            resolve(definitions);

                        })
                        .catch(reject);
                })
            }
        },
        devices: {
            default: [],
            get() {

                var self = this;


                if (self.context != 'edit' || !self.itemID) {
                    return Promise.resolve([]);
                }

                //////////////////////////////////////

                return new Promise(function(resolve, reject) {

                    self.$fluro.api.get(`/contact/${self.itemID}/devices`)
                        .then(function(res) {
                            resolve(_.map(res.data, function(device) {
                                device.pinging = false;
                                return device;
                            }));
                        })
                        .catch(function(err) {
                            reject(err);
                        })

                })
            }
        },
        smsUnsubscribes: {
            default: [],
            get() {

                var self = this;


                if (self.context != 'edit' || !self.itemID) {
                    return Promise.resolve([]);
                }

                //////////////////////////////////////

                return new Promise(function(resolve, reject) {

                    self.$fluro.api.get(`/contact/${self.itemID}/smsunsubscribes?${self.subscriptionCacheKey}`)
                        .then(function(res) {
                            resolve(res.data);
                        })
                        .catch(function(err) {
                            reject(err);
                        })

                })
            }
        },
        mailoutUnsubscribes: {
            default: [],
            get() {

                var self = this;

                if (self.context != 'edit' || !self.itemID) {
                    return Promise.resolve([]);
                }

                //////////////////////////////////////

                return new Promise(function(resolve, reject) {

                    self.$fluro.api.get(`/contact/${self.itemID}/unsubscribes?${self.subscriptionCacheKey}`)
                        .then(function(res) {
                            resolve(res.data);
                        })
                        .catch(function(err) {
                            reject(err);
                        })

                })
            }
        }
    },
    computed: {
        title() {

            if (!this.model) {
                return '';
            }

            if (this.model.preferredName) {
                return `${this.model.preferredName} ${this.model.lastName || ''}`;
            }

            if (this.model.firstName) {
                return `${this.model.firstName} ${this.model.lastName || ''}`;
            }

            return '';
        },
        phoneNumbers() {
            return this.model.phoneNumbers;
        },
        emails() {
            return this.model.emails;
        },
        unsubscribedMailout() {
            return this.mailoutUnsubscribes.length ? true : false;
        },
        unsubscribedSMS() {
            return this.smsUnsubscribes.length ? true : false;
        },



        contextName() {

            var name = this.model.preferredName || this.model.firstName || '';
            if (!name || !name.length) {
                return '';
            }

            if (_.endsWith(name, 's')) {
                return `${name}'`
            }
            return `${name}'s`;
        },
        definitionField() {

            var self = this;

            ///////////////////////////////////

            return {
                title: 'Contact Type / Definition',
                minimum: 0,
                maximum: 1,
                type: 'string',
                directive: 'select',
                key: 'definition',
                options: self.contactDefinitions,
            }
        },
        showOutline() {
            return false; //true; //false;//true;//false;//true;
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
            // loadingDetails: true,
            // loadingDefinitions: true,
            subscriptionCacheKey: 0,
            sheetDefinitions: [],
            details: {},
            family: {},
            show: {
                preferredName: false,
                middleName: false,
                ethnicName: false,
                maidenName: false,
            },
            familyFields: [{
                    title: 'Name of household',
                    key: 'title',
                    minimum: 0,
                    maximum: 1,
                    "expressions": {
                        defaultValue: 'data.lastName',
                    },
                },
                {
                    title: 'Address',
                    key: 'address',
                    minimum: 1,
                    maximum: 1,
                    askCount: 1,
                    type: 'group',
                    asObject: true,
                    fields: [{
                            title: 'Street Address Line 1',
                            key: 'addressLine1',
                            minimum: 0,
                            maximum: 1,
                        },
                        {
                            title: 'Address Line 2',
                            key: 'addressLine2',
                            minimum: 0,
                            maximum: 1,
                            "expressions": {
                                hide: '!data.addressLine1.length',
                                // defaultValue:'data.addressLine1.length',
                            },
                            className: 'xs12 sm6',
                        },
                        {
                            type: 'group',
                            "minimum": 1,
                            "askCount": 1,
                            "maximum": 1,
                            sameLine: 1,
                            fields: [{
                                    title: 'Suburb',
                                    key: 'suburb',
                                    minimum: 0,
                                    maximum: 1,
                                    className: "xs12 sm4",
                                },
                                {
                                    title: 'State',
                                    key: 'state',
                                    minimum: 0,
                                    maximum: 1,
                                    className: "xs12 sm4",
                                },
                                {
                                    title: 'Postal Code',
                                    key: 'postalCode',
                                    minimum: 0,
                                    maximum: 1,
                                    className: "xs12 sm4",
                                },
                            ],
                        },
                    ]
                },
            ]
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