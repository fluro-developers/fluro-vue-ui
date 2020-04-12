<template>
    <flex-column>
        <template v-if="loading">
            <fluro-page-preloader contain />
        </template>
        <template v-else>
            <tabset :justified="true" :vertical="true">
                <template v-if="model.state != 'sent'">
                    <tab heading="Basic Details">
                        <flex-column-body style="background: #fafafa;">
                            <v-container>
                                <constrain sm>
                                    <h3 margin>Mailout Basics</h3>
                                    <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.title" v-model="model"></fluro-content-form-field>
                                    <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.subject" v-model="model"></fluro-content-form-field>
                                    <fluro-panel>
                                        <fluro-panel-title>
                                            <strong>Sender Details</strong>
                                        </fluro-panel-title>
                                        <fluro-panel-body>
                                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.fromEmail" v-model="model"></fluro-content-form-field>
                                            <v-layout>
                                                <v-flex xs12 sm6>
                                                    <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.fromFirstName" v-model="model"></fluro-content-form-field>
                                                </v-flex>
                                                <v-flex xs12 sm6>
                                                    <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.fromLastName" v-model="model"></fluro-content-form-field>
                                                </v-flex>
                                            </v-layout>
                                        </fluro-panel-body>
                                    </fluro-panel>
                                    <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.mailoutType" v-model="model"></fluro-content-form-field>
                                    <fluro-card v-if="mailoutType == 'promotional'">
                                        <fluro-card-body>
                                            <h6>
                                                Promotional Mode
                                            </h6>
                                            Default mailout type. Useful for promoting / letting people know of an event, service or product. Promotional emails will not send to selected contacts if they have unsubscribed.
                                        </fluro-card-body>
                                    </fluro-card>
                                    <fluro-card v-if="mailoutType == 'transactional'">
                                        <fluro-card-body>
                                            <h6>
                                                Transactional Mode
                                            </h6>
                                            It is entirely up to you to adhere to international email spam laws and to only send transactional mail as appropriate.
                                            Transactional emails will send to selected contacts even if they have previously unsubscribed from your emails.
                                        </fluro-card-body>
                                    </fluro-card>
                                </constrain>
                            </v-container>
                        </flex-column-body>
                    </tab>
                    <tab :heading="`${definition.title} Fields`" v-if="definition">
                        <flex-column-body style="background: #fafafa;">
                            <v-container>
                                <constrain sm>
                                    <h3 margin>{{definition.title}} Fields</h3>
                                    <fluro-content-form :options="editorOptions" v-model="model.data" :fields="definition.fields" />
                                </constrain>
                            </v-container>
                        </flex-column-body>
                    </tab>
                    <tab heading="Recipients">
                        <flex-column-body style="background: #fafafa;">
                            <v-container class="mailout-recipients">
                                <constrain sm>
                                    <h3 margin>Recipients</h3>
                                    <fluro-panel>
                                        <fluro-panel-title :class="{collapsed:!expanded.contacts}" @click.native="toggleExpand('contacts')">
                                            <v-layout align-center>
                                                <v-flex>
                                                    <h6>{{model.contacts.length}} Contacts</h6>
                                                </v-flex>
                                                <v-flex shrink>
                                                    <fluro-icon icon="angle-down" class="chevron" />
                                                </v-flex>
                                            </v-layout>
                                        </fluro-panel-title>
                                        <fluro-panel-body v-if="expanded.contacts">
                                            <!-- <div class="sm muted">Select individual contacts to send this mailout to</div> -->
                                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.contacts" v-model="model"></fluro-content-form-field>
                                        </fluro-panel-body>
                                    </fluro-panel>
                                    <fluro-panel>
                                        <fluro-panel-title :class="{collapsed:!expanded.teams}" @click.native="toggleExpand('teams')">
                                            <v-layout align-center>
                                                <v-flex>
                                                    <h6>{{model.teams.length}} Groups and Teams</h6>
                                                </v-flex>
                                                <v-flex shrink>
                                                    <fluro-icon icon="angle-down" class="chevron" />
                                                </v-flex>
                                            </v-layout>
                                        </fluro-panel-title>
                                        <fluro-panel-body v-if="expanded.teams">
                                            <!-- <div class="sm muted">Select groups and teams to send this mailout to</div> -->
                                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.teams" v-model="model"></fluro-content-form-field>
                                        </fluro-panel-body>
                                    </fluro-panel>
                                    <fluro-panel>
                                        <fluro-panel-title :class="{collapsed:!expanded.tickets}" @click.native="toggleExpand('tickets')">
                                            <v-layout align-center>
                                                <v-flex>
                                                    <h6>{{model.tickets.length}} Tickets</h6>
                                                </v-flex>
                                                <v-flex shrink>
                                                    <fluro-icon icon="angle-down" class="chevron" />
                                                </v-flex>
                                            </v-layout>
                                        </fluro-panel-title>
                                        <fluro-panel-body v-if="expanded.tickets">
                                            <!-- <div class="sm muted">Select ticketed contacts to send this mailout to</div> -->
                                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.tickets" v-model="model"></fluro-content-form-field>
                                        </fluro-panel-body>
                                    </fluro-panel>
                                    <fluro-panel>
                                        <fluro-panel-title :class="{collapsed:!expanded.events}" @click.native="toggleExpand('events')">
                                            <v-layout align-center>
                                                <v-flex>
                                                    <h6>{{model.events.length}} Events</h6>
                                                </v-flex>
                                                <v-flex shrink>
                                                    <fluro-icon icon="angle-down" class="chevron" />
                                                </v-flex>
                                            </v-layout>
                                        </fluro-panel-title>
                                        <fluro-panel-body v-if="expanded.events">
                                            <!-- <div class="sm muted">Send to contacts at specific events</div> -->
                                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.data" v-model="model"></fluro-content-form-field>
                                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.events" v-model="model"></fluro-content-form-field>
                                        </fluro-panel-body>
                                    </fluro-panel>
                                    <fluro-panel>
                                        <fluro-panel-title :class="{collapsed:!expanded.interactions}" @click.native="toggleExpand('interactions')">
                                            <v-layout align-center>
                                                <v-flex>
                                                    <h6>{{model.interactions.length}} Interactions</h6>
                                                </v-flex>
                                                <v-flex shrink>
                                                    <fluro-icon icon="angle-down" class="chevron" />
                                                </v-flex>
                                            </v-layout>
                                        </fluro-panel-title>
                                        <fluro-panel-body v-if="expanded.interactions">
                                            <!-- <div class="sm muted">Send to contacts at specific events</div> -->
                                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.interactions" v-model="model"></fluro-content-form-field>
                                        </fluro-panel-body>
                                    </fluro-panel>
                                    <fluro-panel>
                                        <fluro-panel-title :class="{collapsed:!expanded.checkins}" @click.native="toggleExpand('checkins')">
                                            <v-layout align-center>
                                                <v-flex>
                                                    <h6>{{model.checkins.length}} Checkins</h6>
                                                </v-flex>
                                                <v-flex shrink>
                                                    <fluro-icon icon="angle-down" class="chevron" />
                                                </v-flex>
                                            </v-layout>
                                        </fluro-panel-title>
                                        <fluro-panel-body v-if="expanded.checkins">
                                            <!-- <div class="sm muted">Send to contacts at specific events</div> -->
                                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.checkins" v-model="model"></fluro-content-form-field>
                                        </fluro-panel-body>
                                    </fluro-panel>
                                    <fluro-panel>
                                        <fluro-panel-title :class="{collapsed:!expanded.details}" @click.native="toggleExpand('details')">
                                            <v-layout align-center>
                                                <v-flex>
                                                    <h6>{{model.details.length}} Detail Sheets</h6>
                                                </v-flex>
                                                <v-flex shrink>
                                                    <fluro-icon icon="angle-down" class="chevron" />
                                                </v-flex>
                                            </v-layout>
                                        </fluro-panel-title>
                                        <fluro-panel-body v-if="expanded.details">
                                            <!-- <div class="sm muted">Send to contacts at specific events</div> -->
                                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.details" v-model="model"></fluro-content-form-field>
                                        </fluro-panel-body>
                                    </fluro-panel>
                                    <fluro-panel>
                                        <fluro-panel-title :class="{collapsed:!expanded.families}" @click.native="toggleExpand('families')">
                                            <v-layout align-center>
                                                <v-flex>
                                                    <h6>{{model.families.length}} Households</h6>
                                                </v-flex>
                                                <v-flex shrink>
                                                    <fluro-icon icon="angle-down" class="chevron" />
                                                </v-flex>
                                            </v-layout>
                                        </fluro-panel-title>
                                        <fluro-panel-body v-if="expanded.families">
                                            <!-- <div class="sm muted">Send to contacts at specific events</div> -->
                                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.families" v-model="model"></fluro-content-form-field>
                                        </fluro-panel-body>
                                    </fluro-panel>
                                    <fluro-panel>
                                        <fluro-panel-title :class="{collapsed:!expanded.personas}" @click.native="toggleExpand('personas')">
                                            <v-layout align-center>
                                                <v-flex>
                                                    <h6>{{model.personas.length}} User Personas</h6>
                                                </v-flex>
                                                <v-flex shrink>
                                                    <fluro-icon icon="angle-down" class="chevron" />
                                                </v-flex>
                                            </v-layout>
                                        </fluro-panel-title>
                                        <fluro-panel-body v-if="expanded.personas">
                                            <!-- <div class="sm muted">Send to contacts at specific events</div> -->
                                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.personas" v-model="model"></fluro-content-form-field>
                                        </fluro-panel-body>
                                    </fluro-panel>
                                    <fluro-panel>
                                        <fluro-panel-title :class="{collapsed:!expanded.collections}" @click.native="toggleExpand('collections')">
                                            <v-layout align-center>
                                                <v-flex>
                                                    <h6>{{model.collections.length}} Collections</h6>
                                                </v-flex>
                                                <v-flex shrink>
                                                    <fluro-icon icon="angle-down" class="chevron" />
                                                </v-flex>
                                            </v-layout>
                                        </fluro-panel-title>
                                        <fluro-panel-body v-if="expanded.collections">
                                            <!-- <div class="sm muted">Send to contacts at specific events</div> -->
                                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.collections" v-model="model"></fluro-content-form-field>
                                        </fluro-panel-body>
                                    </fluro-panel>
                                    <fluro-panel>
                                        <fluro-panel-title :class="{collapsed:!expanded.tags}" @click.native="toggleExpand('tags')">
                                            <v-layout align-center>
                                                <v-flex>
                                                    <h6>{{model.tags.length}} Tags</h6>
                                                </v-flex>
                                                <v-flex shrink>
                                                    <fluro-icon icon="angle-down" class="chevron" />
                                                </v-flex>
                                            </v-layout>
                                        </fluro-panel-title>
                                        <fluro-panel-body v-if="expanded.tags">
                                            <!-- <div class="sm muted">Send to contacts at specific events</div> -->
                                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.tags" v-model="model"></fluro-content-form-field>
                                        </fluro-panel-body>
                                    </fluro-panel>
                                    <fluro-panel>
                                        <fluro-panel-title :class="{collapsed:!expanded.realms}" @click.native="toggleExpand('realms')">
                                            <v-layout align-center>
                                                <v-flex>
                                                    <h6>{{model.realms.length}} Realms</h6>
                                                </v-flex>
                                                <v-flex shrink>
                                                    <fluro-icon icon="angle-down" class="chevron" />
                                                </v-flex>
                                            </v-layout>
                                        </fluro-panel-title>
                                        <fluro-panel-body v-if="expanded.realms">
                                            <!-- <div class="sm muted">Send to contacts at specific events</div> -->
                                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.realms" v-model="model"></fluro-content-form-field>
                                        </fluro-panel-body>
                                    </fluro-panel>
                                    <!-- <fluro-panel>
                                    <fluro-panel-title :class="{collapsed:!expanded.definitions}" @click.native="toggleExpand('definitions')">
                                        <v-layout align-center>
                                            <v-flex>
                                            <h6>{{model.definitions.length}} Definitions</h6>
                                           
                                            </v-flex>
                                            <v-flex shrink>
                                                <fluro-icon icon="angle-down" class="chevron"/>
                                            </v-flex>
                                        </v-layout>
                                    </fluro-panel-title>
                                    <fluro-panel-body v-if="expanded.definitions">
                                        <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.definitions" v-model="model"></fluro-content-form-field>
                                    </fluro-panel-body>
                                </fluro-panel> -->
                                    <fluro-panel>
                                        <fluro-panel-title :class="{collapsed:!expanded.cards}" @click.native="toggleExpand('cards')">
                                            <v-layout align-center>
                                                <v-flex>
                                                    <h6>{{model.cards.length}} Process Cards</h6>
                                                </v-flex>
                                                <v-flex shrink>
                                                    <fluro-icon icon="angle-down" class="chevron" />
                                                </v-flex>
                                            </v-layout>
                                        </fluro-panel-title>
                                        <fluro-panel-body v-if="expanded.cards">
                                            <!-- <div class="sm muted">Send to contacts at specific events</div> -->
                                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.cards" v-model="model"></fluro-content-form-field>
                                        </fluro-panel-body>
                                    </fluro-panel>
                                    <fluro-panel>
                                        <fluro-panel-title :class="{collapsed:!expanded.query}" @click.native="toggleExpand('query')">
                                            <v-layout align-center>
                                                <v-flex>
                                                    <h6>Contacts matching query</h6>
                                                </v-flex>
                                                <v-flex shrink>
                                                    <fluro-icon icon="angle-down" class="chevron" />
                                                </v-flex>
                                            </v-layout>
                                        </fluro-panel-title>
                                        <fluro-panel-body v-if="expanded.query">
                                            <!-- <div class="sm muted">Send to contacts at specific events</div> -->
                                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.query" v-model="model"></fluro-content-form-field>
                                        </fluro-panel-body>
                                    </fluro-panel>
                                </constrain>
                            </v-container>
                        </flex-column-body>
                    </tab>
                </template>
                <template v-if="model._id">
                    <tab heading="Preview">
                        <mailout-render-preview :mailout="model._id" :definition="definition.definitionName" />
                    </tab>
                    <tab heading="Testing" v-if="model.state != 'sent'">
                        <mailout-test-panel v-model="model" />
                    </tab>
                    <tab heading="Send and Publish" v-if="model.state != 'sent'">
                        <mailout-preflight-panel v-model="model" />
                    </tab>
                    <tab heading="Results" v-if="resultsEnabled">
                        <mailout-results-panel v-model="model" />
                    </tab>
                </template>
            </tabset>
        </template>
        <!-- <flex-column-body> -->
        <!-- // <pre>{{model}}</pre> -->
        <!-- </flex-column-body> -->
        <!-- <flex-column-body> -->
        <!-- WOOOT -->
        <!-- <tabset v-else :justified="true" :vertical="true">
            <tab heading="Basic Details">
                <slot>
                    <flex-column-body style="background: #fafafa;">
                    </flex-column-body>
                </slot>
            </tab>
        </tabset> -->
    </flex-column>
</template>
<script>
/////////////////////////////////

// import FluroEditor from '../../../form/FluroEditor.vue';
// import { MailoutRenderPreview, MailoutResultsPanel, MailoutPreflightPanel, MailoutTestPanel } from 'fluro-vue-ui'
// import FluroContentEditMixin from '../FluroContentEditMixin';


/////////////////////////////////

import Vue from 'vue';

/////////////////////////////////

import MailoutRenderPreview from '../../../mailout/MailoutRenderPreview.vue';
import MailoutResultsPanel from '../../../mailout/MailoutResultsPanel.vue';
import MailoutPreflightPanel from '../../../mailout/MailoutPreflightPanel.vue';
import MailoutTestPanel from '../../../mailout/MailoutTestPanel.vue';
import FluroContentEditMixin from '../FluroContentEditMixin';


/////////////////////////////////

export default {


    components: {
        MailoutRenderPreview,
        MailoutTestPanel,
        MailoutPreflightPanel,
        MailoutResultsPanel,
    },
    mixins: [FluroContentEditMixin],
    methods: {
        toggleExpand(key) {
            var self = this;
            self.$set(self.expandedSettings, `_${key}`, !self.expandedSettings[`_${key}`]);


            console.log('TOGGLE', key, self.expandedSettings);
        },
    },
    computed: {
        resultsEnabled() {

            var self = this;

            if (self.model.state == 'sent') {
                return true;
            }

            if (self.model.stats && self.model.stats.mailoutSent) {
                return true;
            }
        },
        expanded() {
            var self = this;

            return {
                contacts: self.expandedSettings._contacts || (self.model.contacts && self.model.contacts.length),
                teams: self.expandedSettings._teams || (self.model.teams && self.model.teams.length),
                tickets: self.expandedSettings._tickets || (self.model.tickets && self.model.tickets.length),
                events: self.expandedSettings._events || (self.model.events && self.model.events.length),
                interactions: self.expandedSettings._interactions || (self.model.interactions && self.model.interactions.length),
                cards: self.expandedSettings._cards || (self.model.cards && self.model.cards.length),
                checkins: self.expandedSettings._checkins || (self.model.checkins && self.model.checkins.length),
                details: self.expandedSettings._details || (self.model.details && self.model.details.length),
                families: self.expandedSettings._families || (self.model.families && self.model.families.length),
                personas: self.expandedSettings._personas || (self.model.personas && self.model.personas.length),
                collections: self.expandedSettings._collections || (self.model.collections && self.model.collections.length),
                tags: self.expandedSettings._tags || (self.model.tags && self.model.tags.length),
                realms: self.expandedSettings._realms || (self.model.realms && self.model.realms.length),
                definitions: self.expandedSettings._definitions || (self.model.definitions && self.model.definitions.length),
                query: self.expandedSettings._query || (self.model.query),
            }
        },
        mailoutType() {
            return this.model.mailoutType;
        },
        user() {
            return this.$fluro.auth.getCurrentUser();
        },
        fieldsOutput() {


            var self = this;
            var array = [];

            ///////////////////////////////////

            addField('title', {
                title: 'Title',
                minimum: 1,
                maximum: 1,
                type: 'string',
                placeholder: 'Eg. My awesome new email',
            })

            addField('subject', {
                title: 'Subject',
                description: 'Text to be shown in the subject of the email',
                minimum: 1,
                maximum: 1,
                type: 'string',
                placeholder: 'Eg. My awesome new email',
                expressions: {
                    defaultValue() {
                            return self.model.title;
                    }
                    // : 'data.title',
                }
            })


            addField('fromEmail', {
                title: 'From / Sender Email Address',
                description: 'Email address this mailout will be sent from, and replies will be sent to',
                minimum: 1,
                maximum: 1,
                type: 'string',
                placeholder: `Eg. ${this.user.email}`,
                defaultValues: [`${this.user.email}`],
            })

            addField('fromFirstName', {
                title: 'Sender First Name',
                minimum: 1,
                maximum: 1,
                type: 'string',
                placeholder: `Eg. ${this.user.firstName}`,
                defaultValues: [`${this.user.firstName}`],
            })

            addField('fromLastName', {
                title: 'Sender Last Name',
                minimum: 1,
                maximum: 1,
                type: 'string',
                placeholder: `Eg. ${this.user.lastName}`,
                defaultValues: [`${this.user.lastName}`],
            })


            addField('mailoutType', {
                title: 'Mailout Type',
                minimum: 1,
                maximum: 1,
                type: 'string',
                directive: 'select',
                defaultValues: ['promotional'],
                options: [{
                        name: 'Promotional',
                        value: 'promotional',
                    },
                    {
                        name: 'Transactional',
                        value: 'transactional',
                    },
                ]
            })



            //////////////////////////////////////////////////////

            addField('contacts', {
                title: 'Select contacts',
                minimum: 0,
                maximum: 0,
                type: 'reference',
                params: {
                    restrictType: 'contact',
                },
            })

            addField('teams', {
                title: 'Select Groups/Teams',
                minimum: 0,
                maximum: 0,
                type: 'reference',
                params: {
                    restrictType: 'team',
                },
            })

            addField('tickets', {
                title: 'Select tickets',
                minimum: 0,
                maximum: 0,
                type: 'reference',
                params: {
                    restrictType: 'ticket',
                },
            })

            ///////////////////////////////////////
            ///////////////////////////////////////
            ///////////////////////////////////////

            addField('events', {
                title: 'Select events',
                minimum: 0,
                maximum: 0,
                type: 'reference',
                params: {
                    restrictType: 'event',
                },
            })

            addField('data', {
                type: 'group',
                minimum: 1,
                maximum: 1,
                asObject: true,
                fields: [{
                        key: 'eventCheckins',
                        title: 'Send to people who have checked in',
                        description: 'Send mailout to any contacts checked in to these events',
                        minimum: 0,
                        maximum: 1,
                        type: 'boolean',
                    },
                    {
                        key: 'eventTickets',
                        title: 'Send to people who have a ticket',
                        description: 'Send mailout to any contacts that have a registered ticket for these events',
                        minimum: 0,
                        maximum: 1,
                        type: 'boolean',
                    },
                    {
                        key: 'eventAssignments',
                        title: 'Send to people who are rostered on to this event',
                        description: 'Send mailout to any contacts that have been rostered/assigned to these events',
                        minimum: 0,
                        maximum: 1,
                        type: 'boolean',
                    },

                ]
            })

            ///////////////////////////////////////
            ///////////////////////////////////////
            ///////////////////////////////////////


            addField('interactions', {
                title: 'Select interactions',
                minimum: 0,
                maximum: 0,
                type: 'reference',
                params: {
                    restrictType: 'interaction',
                },
            })

            addField('cards', {
                title: 'Select Process Cards',
                minimum: 0,
                maximum: 0,
                type: 'reference',
                params: {
                    restrictType: 'process',
                },
            })

            addField('checkins', {
                title: 'Select Checkins',
                minimum: 0,
                maximum: 0,
                type: 'reference',
                params: {
                    restrictType: 'checkin',
                },
            })

            addField('families', {
                title: 'Select Households',
                minimum: 0,
                maximum: 0,
                type: 'reference',
                params: {
                    restrictType: 'family',
                },
            })

            addField('collections', {
                title: 'Select Collections',
                minimum: 0,
                maximum: 0,
                type: 'reference',
                params: {
                    restrictType: 'collection',
                },
            })

            addField('tags', {
                title: 'Select Tags',
                minimum: 0,
                maximum: 0,
                type: 'reference',
                params: {
                    restrictType: 'tag',
                },
            })

            addField('realms', {
                title: 'Select Realms',
                minimum: 0,
                maximum: 0,
                type: 'reference',
                directive: 'realm-select',
                params: {
                    restrictType: 'realm',
                },
            })

            addField('details', {
                title: 'Select Detail Sheet',
                minimum: 0,
                maximum: 0,
                type: 'reference',
                params: {
                    restrictType: 'contactdetail',
                },
            })

            addField('personas', {
                title: 'Select User Personas',
                minimum: 0,
                maximum: 0,
                type: 'reference',
                params: {
                    restrictType: 'persona',
                },
            })

            addField('query', {
                title: 'Select Query',
                minimum: 0,
                maximum: 1,
                type: 'reference',
                params: {
                    restrictType: 'query',
                    allDefinitions: true,
                },
            })




            // // console.log('TYPE OPTIONS', self.typeOptions);



            // addField('filterType', {
            //     title: 'Type',
            //     minimum: 0,
            //     maximum: 1,
            //     type: 'string',
            //     directive: 'select',
            //     description: 'The type of item you want to return from this query',
            //     options: self.typeOptions,
            // })

            ///////////////////////////////////

            function addField(key, details) {
                details.key = key;
                array.push(details)
            }

            // console.log('DO THE OUTPUT!!!');
            return array;

        },
    },
    data() {
        return {
            expandedSettings: {
                _contacts: false,
                _teams: false,
                _events: false,
                _tickets: false,
            },
            editorOptions: {
                editor: {
                    tokens: [{
                            title: 'Recipient Preferred First Name',
                            key: 'firstName',
                        },
                        {
                            title: 'Recipient Last Name',
                            key: 'lastName',
                        },
                        {
                            title: 'Sender/From First Name',
                            key: 'mailout.fromFirstName',
                        },
                        {
                            title: 'Sender/From Last Name',
                            key: 'mailout.fromLastName',
                        },
                        {
                            title: 'Sender/From Email Address',
                            key: 'mailout.fromEmail',
                        },

                        {
                            title: 'Account Title',
                            key: 'mailout.account.title',
                        },

                        {
                            title: 'Account Timezone',
                            key: 'mailout.account.timezone',
                        },

                        {
                            title: 'Subject',
                            key: 'mailout.subject',
                        },

                        {
                            title: 'Send Date',
                            key: 'date',
                        },
                    ]
                },
            },
        }
    },
}
</script>
<style lang="scss">
.mailout-recipients {
    .collapsed {
        color: rgba(#000, 0.4);

        .chevron {
            transition: all 0.3s;
            transform: rotate(-90deg);
        }
    }
}
</style>