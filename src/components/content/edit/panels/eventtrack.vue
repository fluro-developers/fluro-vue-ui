<template>
    <flex-column>
        <template v-if="!$asyncComputed.defOptions.success && !$asyncComputed.locations.success">
            <fluro-page-preloader contain />
        </template>
        <tabset v-else :justified="true" :vertical="true">
            <tab heading="Event Track Info">
                <flex-column-body style="background: #fafafa;">
                    <v-container class="grid-list-xl">
                        <constrain sm>
                            <h3 margin>Event Track Details</h3>
                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.title" v-model="model" />
                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.firstLine" v-model="model" />
                            <!-- <location-selector v-model="model" :allLocations="locations" locationsPath="defaultLocations" roomsPath="defaultRooms" /> -->
                            <!-- <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.defaultPlans" v-model="model" /> -->
                            <!-- <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.defaultOwners" v-model="model" /> -->
                        </constrain>
                    </v-container>
                </flex-column-body>
            </tab>
            <tab :heading="`${definition.title} details`" v-if="definition && definition.fields && definition.fields.length">
                <flex-column-body style="background: #fafafa;">
                    <v-container>
                        <constrain sm>
                            <h3 margin>{{definition.title}}</h3>
                            <!-- <pre>{{model.data}}</pre> -->
                            <fluro-content-form :options="options" v-model="model.data" :fields="definition.fields"></fluro-content-form>
                        </constrain>
                    </v-container>
                </flex-column-body>
            </tab>
            <tab heading="Event Defaults">
                <flex-column-body style="background: #fafafa;">
                    <v-container class="grid-list-xl">
                        <constrain sm>
                            <h3 margin>Default Information</h3>
                            <p class="muted">Add default information for events created on this track.</p>
                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.defaultTitle" v-model="model" />
                            <br />
                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.defaultFirstLine" v-model="model" />
                            <br />
                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.mainImage" v-model="model" />
                                                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.recurDefinition" v-model="model" />

                            <fluro-panel>
                                <fluro-panel-title>
                                    <strong>Default Times</strong>
                                </fluro-panel-title>
                                <fluro-panel-body>
                                    <v-layout>
                                        <v-flex xs12 sm3>
                                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.defaultStartTime" v-model="model" />
                                        </v-flex>
                                        <v-flex xs12 sm3>
                                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.defaultDuration" v-model="model" />
                                        </v-flex>
                                        <v-flex xs12 sm6>
                                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.defaultTimezone" v-model="model" />
                                        </v-flex>
                                    </v-layout>
                                </fluro-panel-body>
                            </fluro-panel>
                            <fluro-panel>
                                <fluro-panel-title>
                                    <strong>Checkin Defaults</strong>
                                </fluro-panel-title>
                                <fluro-panel-body>
                                    <v-layout>
                                        <v-flex xs6>
                                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.defaultCheckinStartOffset" v-model="model" />
                                        </v-flex>
                                        <v-flex xs6>
                                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.defaultCheckinEndOffset" v-model="model" />
                                        </v-flex>
                                    </v-layout>
                                </fluro-panel-body>
                            </fluro-panel>
                            <fluro-panel>
                                <fluro-panel-title>
                                    <strong>Live Stream Defaults</strong>
                                </fluro-panel-title>
                                <fluro-panel-body>
                                    <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.defaultStreamEnabled" v-model="model" />
                                    <template v-if="model.defaultStreamEnabled">
                                        <v-layout>
                                            <v-flex xs6>
                                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.defaultStreamStartOffset" v-model="model" />
                                            </v-flex>
                                            <v-flex xs6>
                                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.defaultStreamEndOffset" v-model="model" />
                                            </v-flex>
                                        </v-layout>
                                        <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.defaultStreamIntegrations" v-model="model" />
                                        <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.defaultStreamContent" v-model="model" />
                                    </template>
                                </fluro-panel-body>
                            </fluro-panel>
                            
                            <location-selector v-model="model" :allLocations="locations" locationsPath="defaultLocations" roomsPath="defaultRooms" />
                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.defaultPlans" v-model="model" />
                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.defaultBody" v-model="model" />
                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.defaultExpectTeams" v-model="model" />
                            <br />
                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.defaultForms" v-model="model" />
                        </constrain>
                    </v-container>
                </flex-column-body>
            </tab>
            <tab heading="Roster Settings">
                <flex-column-body style="background: #fafafa;">
                    <v-container>
                        <constrain md>
                            <h4 margin>Roster Reminders</h4>
                            <p>Setup reminders for team members rostered to events on this track</p>
                            <event-reminder-manager type="track" :slots="rosterSlots" v-model="model.defaultReminders" />
                            <!-- <default-roster-manager :config="config" v-model="model.defaultRosters" :rosterOptions="rosterDefinitions.definitions"/> -->
                            <!-- <reminder-event-manager :config="config" v-model="model.defaultReminders" :allAssignmentOptions="allPositions" /> -->
                        </constrain>
                    </v-container>
                </flex-column-body>
            </tab>
            <tab heading="Ticket Defaults">
                <flex-column-body style="background: #fafafa;">
                    <v-container>
                        <constrain md>
                            <!-- <constrain sm> -->
                            <h3 margin>Ticketing Defaults</h3>
                            <!-- <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.forms" v-model="model"></fluro-content-form-field> -->
                            <!-- </constrain> -->
                            <ticket-type-manager v-model="model"></ticket-type-manager>
                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.publicTicketingEnabled" v-model="model"></fluro-content-form-field>
                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.publicTicketingConfirmationMessage" v-model="model"></fluro-content-form-field>
                            <!-- <pre>{{model.ticketTypes}}</pre> -->
                            <!-- <pre>{{model.ticketLimit}}</pre> -->
                            <!-- <ticket-list :event="model" /> -->
                            <!-- <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.publicTicketingEnabled" v-model="model"></fluro-content-form-field> -->
                            <!-- <ticket-type-manager v-model="model"></ticket-type-manager> -->
                        </constrain>
                    </v-container>
                </flex-column-body>
            </tab>
            <tab heading="Messaging">
                <flex-column-body style="background: #fafafa;">
                    <v-container>
                        <constrain lg>
                            <h3 margin>Automated Messages</h3>
                            <event-message-manager type="track" v-model="model.defaultMessages" />
                            <!-- <pre>{{model.messages}}</pre> -->
                            <!-- <messaging-event-manager :config="config" v-model="model.messages" :startDate="model.startDate" :endDate="model.endDate" /> -->
                        </constrain>
                    </v-container>
                </flex-column-body>
            </tab>
            <tab heading="Auto create">
                <flex-column-body style="background: #fafafa;">
                    <v-container class="grid-list-xl">
                        <constrain sm>
                            <!-- <h3 margin>Reccuring Automation</h3> -->
                            <fluro-panel>
                                <fluro-panel-title>
                                    <div class="no-border-no-background" @click="toggleAutoRecur()">
                                        <fluro-toggle-item :inactive="!model.autoRecur">Auto-Create Future Events</fluro-toggle-item>
                                    </div>
                                </fluro-panel-title>
                                <fluro-panel-body v-if="model.autoRecur">
                                    <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.recurAmount" v-model="model" />
                                    <v-layout row wrap>
                                        <v-flex xs12 sm6>
                                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.nextRecurDate" v-model="model" />
                                            <!-- <p class="muted">{{nextRecurDateFromNow}}</p> -->
                                        </v-flex>
                                        <v-flex xs12 sm6>
                                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.archiveDate" v-model="model" />
                                        </v-flex>
                                    </v-layout>
                                    <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.recurDefinition" v-model="model" />
                                    <v-layout>
                                        <v-flex xs12 sm4>
                                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.recurCount" v-model="model" />
                                        </v-flex>
                                        <v-flex xs12 sm8>
                                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.recurMeasure" v-model="model" />
                                        </v-flex>
                                    </v-layout>
                                    <v-layout v-if="model.recurMeasure == 'weeks'">
                                        <v-flex xs12 sm4>
                                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.recurWeekday" v-model="model" />
                                        </v-flex>
                                    </v-layout>
                                    <v-layout v-if="model.recurMeasure == 'months'">
                                        <v-flex>
                                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.recurNth" v-model="model" />
                                        </v-flex>
                                        
                                        <v-flex v-if="model.recurNth != 'date'">
                                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.recurWeekday" v-model="model" />
                                        </v-flex>
                                    </v-layout>
                                    <!--  <v-flex xs12 sm4 v-if="model.recurMeasure == 'weeks'">
                                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.recurWeekday" v-model="model" />
                                        </v-flex>
                                        <v-flex xs12 sm8 v-if="model.recurMeasure == 'weeks'" />
                                        <v-flex xs12 sm4 v-if="model.recurMeasure == 'months'">
                                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.recurNth" v-model="model" />
                                        </v-flex>
                                        <v-flex xs12 sm4 v-if="(model.recurMeasure == 'months') && (model.recurNth == 'date')">
                                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.recurWeekday" v-model="model" />
                                        </v-flex>
                                        <v-flex xs12 sm4 v-if="(model.recurMeasure == 'months') && (model.recurNth == 'date')" />
                                        <v-flex xs12 sm8 v-else-if="model.recurMeasure == 'months'" />


                                         -->
                                    <v-layout>
                                        <v-flex xs12 sm3>
                                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.defaultStartTime" v-model="model" />
                                        </v-flex>
                                        <v-flex xs12 sm3>
                                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.defaultDuration" v-model="model" />
                                        </v-flex>
                                        <v-flex xs12 sm6>
                                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.defaultTimezone" v-model="model" />
                                        </v-flex>
                                    </v-layout>
                                    <!--
                                                                        <h5>Add default information for events that are generated for this track.</h5><br>
                                                                        <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.defaultTitle" v-model="model" /><br>
                                                                        <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.defaultFirstLine" v-model="model" /><br>
                                                                        <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.defaultBody" v-model="model" />
                                                                        <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.defaultExpectTeams" v-model="model" /><br>
                                                                        <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.defaultForms" v-model="model" />
                  -->
                                </fluro-panel-body>
                            </fluro-panel>
                        </constrain>
                    </v-container>
                </flex-column-body>
            </tab>
            <tab heading="Events" v-if="eventList">
                <component v-bind:is="eventList" />
            </tab>
            <tab heading="Metrics" v-if="model._id">
                <flex-column-body>
                    <v-container fluid>
                        <!-- <constrain sm> -->
                            TEST
                        <eventtrack-metrics-dashboard :id="model._id" type="eventtrack" />
                        <!-- </constrain> -->
                    </v-container>
                </flex-column-body>
            </tab>
        </tabset>
    </flex-column>
</template>
<script>
/////////////////////////////////

import Vue from "vue";
import _ from "lodash";

/////////////////////////////////
import LocationSelector from "../components/LocationSelector.vue";
import MessagingEventManager from "../components/MessagingEventManager.vue";
import ReminderEventManager from "../components/ReminderEventManager.vue";
import DefaultRosterManager from "../components/DefaultRosterManager.vue";
import FluroContentEditMixin from "../FluroContentEditMixin.js";
import EventtrackMetricsDashboard from "../../../charts/metrics/EventtrackMetricsDashboard.vue";
import TicketTypeManager from "../../event/TicketTypeManager.vue";

/////////////////////////////////

export default {
    components: {
        TicketTypeManager,
        DefaultRosterManager,
        ReminderEventManager,
        MessagingEventManager,
        LocationSelector,
        EventtrackMetricsDashboard
    },
    mixins: [FluroContentEditMixin],
    data() {
        return {
            eventList: null
        };
    },
    created() {
        var self = this;

        if (!self.model.messages) {
            self.$set(self.model, "messages", []);
        }

        if (!self.model._id) {
            self.$set(self.model, "autoRecur", false);
        }

        if (!self.model.defaultLocations) {
            self.$set(self.model, "defaultLocations", []);
        }

        if (!self.model.defaultRooms) {
            self.$set(self.model, "defaultRooms", []);
        }

        if (!self.model.defaultRosters) {
            self.$set(self.model, "defaultRosters", []);
        }
        if (!self.model.defaultStreamEnabled) {
            self.$set(self.model, "defaultStreamEnabled", false);
        }
    },
    /**
    mounted() {
        if(!this.eventList) {
            console.log('Create and mount')
            this.eventList = this.createEventList();
        }
    },
    /**/
    methods: {
        /**
        createEventList() {

            var self = this;
            if(!self.model || !self.model._id) {
                return;
            }

            //Load the list view component
            var ListView = import('@/router/routes/List.vue');
            var ListViewInstanceConstructor = Vue.extend(ListView);

            
            //Setup the list settings
            var includeArchivedByDefault = true;
            var dateFilterEnabled = true;
            var groupingFunction = self.$fluro.date.groupEventByDate
            var allDefinitions = true;
            var searchInheritable = false;
            var dateFilterPresets = [];
            var dateFilterDefault;

            var lockFilter = {
                operator: 'and',
                filters: [{
                    key: 'track',
                    comparator: '==',
                    value: self.model._id,
                    dataType: 'reference',
                }],
            }

            /////////////////////////////////////////////////

            var initialDefaultSort = {

                sortKey: 'startDate',
                sortDirection: 'asc',
                sortType: 'date',
            }

            /////////////////////////////////////////////////

            var initialDefaultFilters = {
                operator: 'and',
                filters: [{
                    operator: 'and',
                    filters: [{
                        key: 'status',
                        comparator: 'in',
                        values: ['active', 'draft', 'archived'],
                    }, ]
                }]
            }

            ///////////////////////////////////////

            var now = new Date();

            dateFilterPresets.push({
                title: 'This Week',
                startDate: moment().startOf('week').toDate(),
                endDate: moment().endOf('week').toDate(),
            });

            dateFilterPresets.push({
                title: 'Last Week',
                startDate: moment().subtract(1, 'weeks').startOf('week').toDate(),
                endDate: moment().subtract(1, 'weeks').endOf('week').toDate(),
            });

            dateFilterPresets.push({
                title: 'This Month',
                startDate: moment().startOf('month').toDate(),
                endDate: moment().endOf('month').toDate(),
            });

            dateFilterPresets.push({
                title: 'Last Month',
                startDate: moment().subtract(1, 'months').startOf('week').toDate(),
                endDate: moment().subtract(1, 'months').endOf('week').toDate(),
            });

            dateFilterPresets.push({
                title: 'This Year',
                startDate: moment().startOf('year').toDate(),
                endDate: moment().endOf('year').toDate(),
            });

            dateFilterPresets.push({
                title: 'Last Year',
                startDate: moment().subtract(1, 'years').startOf('week').toDate(),
                endDate: moment().subtract(1, 'years').endOf('week').toDate(),
            });


            dateFilterDefault = {
                startDate: now, //moment().subtract(12, 'months').toDate(),
                endDate: moment().endOf('year').toDate(), //endDate: now,
            }

            //////////////////////////////////

            var propsData = {
                type: 'event',
                initialDefaultFilters,
                includeArchivedByDefault,
                initialDefaultSort,
                dateFilterEnabled,
                groupingFunction,
                allDefinitions,
                dateFilterPresets,
                dateFilterDefault,
                searchInheritable,
                lockFilter,
            }


            //////////////////////////////////////////////////

            return new ListViewInstanceConstructor({
                propsData
            })

        },
        /**/
        toggleAutoRecur() {
            //console.log('INIT TOGGLE');
            var self = this;
            if (!self.model.autoRecur) {
                //console.log('COLLECTED IS FALSY', self.model.autoRecur);
                return self.$set(self.model, "autoRecur", true);
            } else {
                //console.log('COLLECTED IS TRUTHY', self.model.autoRecur);
                return self.$set(self.model, "autoRecur", false);
            }
        }
    },
    computed: {
        rosterSlots() {
            var self = this;

            // console.log(self.rosterTypes);

            return _.chain(self.rosterTypes)
                .map(function(rosterType) {
                    return rosterType.data.slots;
                })
                .compact()
                .flatten()
                .map('title')
                .compact()
                .uniqBy(function(title) {
                    return String(title).toLowerCase();
                })
                .map(function(title) {
                    return {
                        title,
                        key: String(title).toLowerCase(),
                    }
                })
                .value();
        },
        fieldsOutput() {
            var self = this;
            var array = [];
            var periodOptions;
            //console.log('SELF', self);
            if (self.model.recurCount != 1) {
                periodOptions = [{
                        name: "Days",
                        value: "days"
                    },
                    {
                        name: "Weeks",
                        value: "weeks"
                    },
                    {
                        name: "Months",
                        value: "months"
                    },
                    {
                        name: "Years",
                        value: "years"
                    }
                ];
            } else {
                periodOptions = [{
                        name: "Day",
                        value: "days"
                    },
                    {
                        name: "Week",
                        value: "weeks"
                    },
                    {
                        name: "Month",
                        value: "months"
                    },
                    {
                        name: "Year",
                        value: "years"
                    }
                ];
            }

            ///////////////////////////////////

            addField("publicTicketingEnabled", {
                title: "Enable Public Ticketing",
                description: "Enable ticketing for the public to register for this event",
                minimum: 0,
                maximum: 1,
                type: "boolean"
            });

            addField("publicTicketingConfirmationMessage", {
                title: "Ticket Confirmation Message",
                description: "Customise the message to be sent at the top of the digital tickets email",
                minimum: 0,
                maximum: 1,
                type: "string",
                directive: "wysiwyg",
                expressions: {
                    show() {
                        return self.model.publicTicketingEnabled;
                    }
                },
                params: {
                    tokens: [{
                            title: "Recipient Preferred First Name",
                            key: "tokens.firstName"
                        },

                        {
                            title: "Event Title",
                            key: "tokens.eventTitle"
                        },

                        {
                            title: "Event Start Time",
                            key: "tokens.startTime"
                        },

                        {
                            title: "Event Start Date",
                            key: "tokens.startDate"
                        },

                        {
                            title: "Location names",
                            key: "tokens.locations"
                        }
                    ]
                }
            });

            ///////////////////////////////////

            addField("title", {
                title: "Track Title",
                minimum: 1,
                maximum: 1,
                type: "string",
                placeholder: "Title",
                params: {
                    autofocus: !self.model._id,
                }
            });

            addField("firstLine", {
                title: "Subtitle",
                minimum: 0,
                maximum: 1,
                type: "string",
                placeholder: "Subtitle",
                description: "A short one line description for this event track"
            });

            ///////////////////////////////////
            ///////////////////////////////////
            ///////////////////////////////////

            addField("mainImage", {
                title: "Image",
                description: "Default image for events in this track",
                minimum: 0,
                maximum: 1,
                type: "reference",
                directive: "reference-select",
                params: {
                    restrictType: "image"
                }
            });

            ///////////////////////////////////
            ///////////////////////////////////
            ///////////////////////////////////

            addField("defaultPlans", {
                title: "Default Plans",
                description: "This plan will be duplicated and attached as a 'draft' to new events in this event track",
                minimum: 0,
                maximum: 0,
                type: "reference",
                directive: "reference-select",
                params: {
                    restrictType: "plan"
                }
            });

            // addField('defaultOwners', {
            //     title: 'Default Owners',
            //     description: "Set the owners of events created in this track",
            //     minimum: 0,
            //     maximum: 0,
            //     type: 'reference',
            //     directive: 'reference-select',
            //     params: {
            //         restrictType: 'persona',
            //     }
            // });

            ///////////////////////////////////
            ///////////////////////////////////
            ///////////////////////////////////

            addField("recurAmount", {
                title: "Number of Future Events",
                minimum: 1,
                maximum: 1,
                type: "integer",
                description: "Fluro will ensure that at any point in time there will be at least this many events into the future",
                defaultValues: [5],
                params: {
                    minValue: 1
                }
            });

            var now = new Date();
            addField("nextRecurDate", {
                title: "Track Start Date",
                minimum: 1,
                maximum: 1,
                type: "date",
                directive: "datepicker",
                //description: moment(now).fromNow(),
                defaultValues: [now],
                
            });

            addField("archiveDate", {
                title: "End Track At",
                minimum: 0,
                maximum: 1,
                type: "date",
                directive: "datepicker",
                
               
                 
                //description: moment(now).fromNow(),
            });

            ///////////////////////////////////

            addField("recurDefinition", {
                title: "Event Type / Definition",
                minimum: 0,
                maximum: 1,
                type: "string",
                directive: "select",
                defaultValues: [""],
                description: "What definition should be used for events within this track?",
                options: self.defOptions
            });

            addField("recurCount", {
                title: "Every",
                minimum: 0,
                maximum: 1,
                type: "integer",
                defaultValues: [1],
                params: {
                    minValue: 1
                }
            });

            addField("recurMeasure", {
                minimum: 0,
                maximum: 1,
                type: "string",
                directive: "select",
                defaultValues: ["weeks"],
                options: periodOptions
            });

            addField("recurWeekday", {
                title: "Weekday",
                minimum: 0,
                maximum: 1,
                type: "string",
                directive: "select",
                defaultValues: ["Sunday"],
                options: [
                    { name: "Monday" },
                    { name: "Tuesday" },
                    { name: "Wednesday" },
                    { name: "Thursday" },
                    { name: "Friday" },
                    { name: "Saturday" },
                    { name: "Sunday" }
                ]
            });

            addField("recurNth", {
                title: "On The",
                minimum: 0,
                maximum: 1,
                type: "string",
                directive: "select",
                defaultValues: ["date"],
                options: [{
                        name: `Same Date (${self.$fluro.date.formatDate(self.model.nextRecurDate, 'Do')} of each month)`,
                        value: "date"
                    },
                    {
                        name: "First",
                        value: "1"
                    },
                    {
                        name: "Second",
                        value: "2"
                    },
                    {
                        name: "Third",
                        value: "3"
                    },
                    {
                        name: "Fourth",
                        value: "4"
                    },
                    {
                        name: "Fifth",
                        value: "5"
                    }
                ]
            });

            addField("defaultCheckinStartOffset", {
                title: "Checkin Opens (minutes earlier)",
                minimum: 0,
                maximum: 1,
                type: "integer",
                placeholder: "90"
                //directive: 'timepicker',
                //description: moment(now).fromNow(),
            });

            addField("defaultCheckinEndOffset", {
                title: "Checkin Closes ( minutes later)",
                minimum: 0,
                maximum: 1,
                type: "integer",
                placeholder: "90"
                //directive: 'timepicker',
                //description: moment(now).fromNow(),
            });

            addField("defaultStartTime", {
                title: `Start Time (${self.$fluro.date.timestampToAmPm(self.model.defaultStartTime)})`,
                minimum: 0,
                maximum: 1,
                type: "string",
                placeholder: "1300",
                defaultValues: ['1000'],
                directive: 'timepicker',
                //description: moment(now).fromNow(),
            });

            addField("defaultDuration", {
                title: "Duration (Mins)",
                placeholder: "120",
                minimum: 0,
                maximum: 1,
                type: "integer",
                params: {
                    minValue: 0
                }
            });

            addField("defaultTimezone", {
                title: "Event Timezone",
                minimum: 0,
                maximum: 1,
                type: "string",
                directive: "timezone-select",
                description: "Set a local timezone for this event",
            });

            ///////////////////////////////////
            ///////////////////////////////////
            ///////////////////////////////////

            addField("defaultTitle", {
                title: "Default Event Title",
                minimum: 0,
                maximum: 1,
                type: "string",
                placeholder: "If left blank will be '" +
                    (self.model.title ? self.model.title : "") +
                    "'"
            });

            addField("defaultFirstLine", {
                title: "Default Event Subtitle",
                minimum: 0,
                maximum: 1,
                type: "string",
                placeholder: "If left blank will be '" +
                    (self.model.firstLine ? self.model.firstLine : "") +
                    "'"
            });

            addField("defaultBody", {
                title: "Default Event Body",
                minimum: 0,
                maximum: 1,
                type: "string",
                directive: "wysiwyg"
            });

            addField("defaultExpectTeams", {
                title: "Expected Groups/Teams",
                description: "Select groups whose members will be expected to attend events on this track",
                minimum: 0,
                maximum: 0,
                type: "reference",
                directive: "reference-select",
                params: {
                    restrictType: "team"
                }
            });

            addField("defaultForms", {
                title: "Default Registration Forms",
                description: "These forms will be added to each created event on this track",
                minimum: 0,
                maximum: 0,
                type: "reference",
                directive: "reference-select",
                params: {
                    restrictType: "form"
                }
            });

            addField("defaultStreamEnabled", {
                title: "Stream Enabled",
                description: "Whether events on this track should have live streaming enabled by default",
                minimum: 0,
                maximum: 1,
                type: "boolean",
            });

            addField("defaultStreamContent", {
                title: "Prerecorded Stream Content",
                description: "Select or create the video you want to stream",
                minimum: 0,
                maximum: 1,
                type: "reference",
                directive: "reference-select",
                params: {
                    restrictType: "video"
                }
            });

            addField("defaultStreamIntegrations", {
                title: "Default Stream Integrations",
                description: "Select the integrations to restream to",
                minimum: 0,
                maximum: 0,
                type: "reference",
                directive: "reference-select",
                params: {
                    restrictType: "integration"
                }
            });

            addField("defaultStreamStartOffset", {
                title: "Default LiveStream Open Offset (minutes)",
                minimum: 0,
                maximum: 1,
                type: "integer",
                placeholder: "30"
                //directive: 'timepicker',
                //description: moment(now).fromNow(),
            });

            addField("defaultStreamEndOffset", {
                title: "Default Live Stream Close Offset (minutes)",
                minimum: 0,
                maximum: 1,
                type: "integer",
                placeholder: "30"
                //directive: 'timepicker',
                //description: moment(now).fromNow(),
            });
            ///////////////////////////////////

            function addField(key, details) {
                details.key = key;
                array.push(details);
                // // Vue.set(self.fields, key, details);

                // if (details.enabled === false) {

                // } else {
                //     details.enabled = true;
                // }

                // var defaultValue = self.getDefaultValue(key, details);
                // Vue.set(self.model, key, defaultValue);
            }

            return array;
        },
        showOutline() {
            return false; //true; //false;//true;//false;//true;
        },
        nextRecurDateFromNow() {
            var self = this;
            return self.$fluro.date.moment(self.model.nextRecurDate).fromNow();
        },
        allPositions() {
            var self = this;
            var options = [];
            //////////////////////////
            //Add add each definition

            _.each(self.rosterDefinitions.definitions, function(def) {
                if (_.get(def, "data.slots")) {
                    return _.each(def.data.slots, function(slot) {
                        if (!options.includes(slot.title)) {
                            return options.push(slot.title);
                        }
                    });
                }
            });
            //console.log(options);
            return options;
        }
    },
    asyncComputed: {
        rosterTypes: {
            default: [],
            get() {
                var self = this;

                ///////////////////////////////////

                return new Promise(function(resolve, reject) {
                    return self.$fluro.types
                        .subTypes("roster")
                        .then(function(types) {
                            var filtered = _.filter(types, function(type) {
                                // var alreadyCreated = !self.existingRosterTypes[
                                //     type.definitionName
                                // ];
                                // if (!alreadyCreated) {
                                //     return;
                                // }

                                //Return if we have enough permissions to create this thing
                                return self.$fluro.access.can(
                                    "create",
                                    type.definitionName,
                                    "roster"
                                )
                            });
                            resolve(filtered);
                        })
                        .catch(reject);
                });
            }
        },
        defOptions: {
            default: [],
            get() {
                var self = this;
                return new Promise(function(resolve, reject) {
                    self.$fluro.types
                        .get("event", true)
                        .then(function(res) {
                            var options = [];
                            options.push({
                                name: "Basic Event",
                                value: ""
                            });
                            //////////////////////////
                            //Add add each definition
                            _.each(res.definitions, function(def) {
                                options.push({
                                    name: def.title,
                                    value: def.definitionName
                                });
                            });
                            //////////////////////////
                            //console.log(options);
                            resolve(options);
                        })
                        .catch(function(err) {
                            reject(err);
                        });
                });
            }
        },
        rosterDefinitions: {
            default: [],
            get() {
                var self = this;
                return new Promise(function(resolve, reject) {
                    self.$fluro.types
                        .retrieve(["roster"])
                        .then(function(res) {
                            return resolve(res[0]);
                        })
                        .catch(function(err) {
                            reject(err);
                        });
                });
            }
        },
        locations: {
            default: [],
            get() {
                var self = this;

                return new Promise(function(resolve, reject) {
                    self.$fluro.api
                        .get("/content/location?allDefinitions=true")
                        .then(function(res) {
                            resolve(res.data);
                        })
                        .catch(function(err) {
                            reject(err);
                        });
                });
            }
        }
    }
};

</script>
<style>
.no-border-no-background .toggle-item {
    border: none !important;
    background: none !important;
    font-size: 14px;
    padding: 0px;
}

</style>
