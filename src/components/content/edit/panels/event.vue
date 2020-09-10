<template>
    <flex-column>
        <template v-if="loading">
            <fluro-page-preloader contain />
        </template>
        <tabset v-else :justified="true" :vertical="true">
            <tab :heading="`${readableTypeName} Info`">
                <flex-column-body style="background: #fafafa;">
                    <v-container class="grid-list-xl">
                        <constrain sm>
                            <h3 margin>Event Details</h3>
                            <!-- <pre>{{model}}</pre> -->
                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.title" v-model="model"></fluro-content-form-field>
                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.firstLine" v-model="model"></fluro-content-form-field>
                            <!-- <p class="lead" v-if="dateModel.startDate">{{dateModel | readableEventDate}}</p> -->
                            <v-layout row wrap>
                                <v-flex xs12 sm4>
                                    <fluro-content-form-field :form-fields="formFields" :outline="showOutline" :options="options" :field="fieldHash.startDate" v-model="dateModel"></fluro-content-form-field>
                                </v-flex>
                                <v-flex xs12 sm4>
                                    <!-- <template> -->
                                    <fluro-content-form-field :form-fields="formFields" :outline="showOutline" :options="options" :field="fieldHash.endDate" v-model="dateModel"></fluro-content-form-field>
                                    <!-- </template> -->
                                </v-flex>
                                <v-flex xs12 sm4>
                                    <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.timezone" v-model="model"></fluro-content-form-field>
                                </v-flex>
                            </v-layout>
                            <fluro-panel v-if="differentTimezoneThanUser">
                                <fluro-panel-body>
                                    <v-input class="no-flex">
                                        <v-label>Local Time</v-label>
                                        <div>
                                            {{ model.startDate | formatDate("h:mma - dddd D MMM Y", model.timezone) }}
                                            <em class="text-muted">({{ model.timezone }})</em>
                                        </div>
                                    </v-input>
                                </fluro-panel-body>
                            </fluro-panel>
                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.mainImage" v-model="model"></fluro-content-form-field>
                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.body" v-model="model"></fluro-content-form-field>
                            <fluro-panel v-if="definition && definition.fields && definition.fields.length">
                                <fluro-panel-title>
                                    <strong>{{ definition.title }} Information</strong>
                                </fluro-panel-title>
                                <fluro-panel-body>
                                    <!-- <pre>{{model.data}}</pre> -->
                                    <fluro-content-form :options="options" v-model="model.data" :fields="definition.fields"></fluro-content-form>
                                </fluro-panel-body>
                            </fluro-panel>
                            <fluro-content-form-field :override-label="definition && definition.definitionName && definition.definitionName == 'service' ? 'Service Time / Event Track' : 'Event Track'" :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.track" v-model="model"></fluro-content-form-field>
                        </constrain>
                    </v-container>
                </flex-column-body>
            </tab>
            <tab :heading="`Team Members`" v-if="model.rostered">
                <flex-column-body style="background: #fafafa;">
                    <v-container>
                        <constrain sm>
                            <v-layout align-center>
                                <v-flex>
                                    <h3>Team Members</h3>
                                </v-flex>
                                <v-flex shrink>
                                    <v-btn color="primary" :to="{ name: 'events.multi', query: { ids: [model._id] } }">
                                        Open in Multi Planner
                                        <fluro-icon right icon="game-board" />
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                            <fluro-panel :key="roster._id" v-for="roster in model.rostered">
                                <fluro-panel-title>
                                    <v-layout align-center>
                                        <v-flex>
                                            <strong>{{ roster.title }}</strong>
                                        </v-flex>
                                        <v-flex shrink v-if="canEditRoster(roster)">
                                            <v-btn class="ma-0" small @click="editRoster(roster)">
                                                Edit
                                                <fluro-icon icon="pencil" right />
                                            </v-btn>
                                            <v-btn icon small class="ma-0" @click="$actions.open([roster])" v-tippy :content="`Actions`">
                                                <fluro-icon icon="ellipsis-h" />
                                            </v-btn>
                                        </v-flex>
                                    </v-layout>
                                </fluro-panel-title>
                                <fluro-panel-body>
                                    <v-layout row wrap>
                                        <template v-if="roster.slots && roster.slots.length">
                                            <v-flex xs6 sm4 md3 :key="index" v-for="(slot, index) in roster.slots">
                                                <v-container class="mb-2 pa-2">
                                                    <h5>{{ slot.title }}</h5>
                                                    <div class="assignment-item" @click="$actions.open([assignment])" :class="assignment.confirmationStatus" :key="assignment._id" v-for="assignment in slot.assignments">
                                                        <v-layout>
                                                            <v-flex>{{ assignment.contact && assignment.contact.title ? assignment.contact.title : assignment.contactName }}</v-flex>
                                                            <v-flex shrink>
                                                                <fluro-icon right :icon="confirmationIcon(assignment)" />
                                                            </v-flex>
                                                        </v-layout>
                                                    </div>
                                                </v-container>
                                            </v-flex>
                                        </template>
                                    </v-layout>
                                    <!-- <pre>{{roster}}</pre> -->
                                </fluro-panel-body>
                            </fluro-panel>
                            <v-btn block @click="createRoster(rosterType)" :loading="rosterType.loading" class="btn-ghost" v-for="rosterType in rosterTypes" :key="rosterType.title">Add {{ rosterType.title }}</v-btn>
                            <p></p>
                            <h3 margin>Reminders</h3>
                            <event-reminder-manager :slots="rosterSlots" :startDate="model.startDate" :endDate="model.endDate" v-model="model.reminders" />
                        </constrain>
                    </v-container>
                </flex-column-body>
            </tab>
            <tab :heading="`Livestream Settings`">
                <flex-column-body style="background: #fafafa;">
                    <v-container>
                        <constrain sm>
                            <h3 margin>Livestream Settings</h3>
                            <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.streamEnabled" v-model="model" />
                            <template v-if="model.streamEnabled">
                                <fluro-content-form :options="options" v-model="model.streamData" :fields="streamFields">
                                    <template v-slot:form="{ formFields, fieldHash, model, update, options }">
                                        <v-container pa-0 grid-list-xl>
                                            <v-layout row wrap>
                                                <v-flex xs12 sm6>
                                                    <v-input class="no-flex">
                                                        <v-label>Stream Starts</v-label>
                                                        <p class="help-block">How many minutes earlier should the stream be available?</p>
                                                        <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.streamStartOffset" v-model="model" />
                                                        <p class="lead">{{ streamStartDate | formatDate("h:mma dddd D MMM", model.timezone) }}</p>
                                                    </v-input>
                                                </v-flex>
                                                <v-flex xs12 sm6>
                                                    <v-input class="no-flex">
                                                        <v-label>Stream Ends</v-label>
                                                        <p class="help-block">How many minutes after this event's end time should the stream be available?</p>
                                                        <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.streamEndOffset" v-model="model" />
                                                        <p class="lead">{{ streamEndDate | formatDate("h:mma dddd D MMM", model.timezone) }}</p>
                                                    </v-input>
                                                </v-flex>
                                            </v-layout>
                                        </v-container>
                                    </template>
                                </fluro-content-form>
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.streamIntegrations" v-model="model" />
                                <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.streamContent" v-model="model" />
                                <fluro-panel>
                                    <fluro-panel-body>
                                        <v-input class="no-flex" label="RTMP Upstream URL">
                                            <div v-tippy content="Click to copy to clipboard" @click.stop.prevent="copyToClipboard('rtmpUrl')">
                                                <v-layout align-center>
                                                    <v-flex class="copystring">{{ rtmpUrl }}</v-flex>
                                                </v-layout>
                                                <input type="hidden" ref="rtmpUrl" :value="rtmpUrl" />
                                            </div>
                                        </v-input>
                                        <v-input class="no-flex" label="RTMP Stream Key">
                                            <div v-tippy content="Click to copy to clipboard" @click.stop.prevent="copyToClipboard('streamKey')">
                                                <v-layout align-center>
                                                    <v-flex class="copystring">{{ streamKey }}</v-flex>
                                                </v-layout>
                                                <input type="hidden" ref="streamKey" :value="streamKey" />
                                            </div>
                                        </v-input>
                                    </fluro-panel-body>
                                </fluro-panel>
                            </template>
                        </constrain>
                    </v-container>
                </flex-column-body>
            </tab>
            <tab :heading="`${plans.length} Plan${plans.length == 1 ? '' : 's'}`" v-if="model._id">
                <flex-column-body style="background: #fafafa;">
                    <v-container fluid>
                        <v-layout align-center>
                            <v-flex>
                                <h3>{{ plans.length }} Plan{{ plans.length == 1 ? "" : "s" }}</h3>
                            </v-flex>
                            <v-flex shrink>
                                <v-btn color="primary" @click="createPlan()" v-if="$fluro.access.can('create', 'plan')">
                                    <span>Add Plan</span>
                                    <fluro-icon icon="plus" right />
                                </v-btn>
                            </v-flex>
                        </v-layout>
                        <fluro-panel>
                            <tabset :justified="true">
                                <tab :heading="plan.title" v-for="(plan, index) in plans" :key="index">
                                    <!-- <fluro-content-edit :embedded="true" v-if="$fluro.access.canEditItem(plan)" v-model="plans[index]" :disableCacheClearOnSave="true" context="edit" type="plan" @cancel="closePlan" @success="planUpdated" /> -->
                                    <!-- v-else -->
                                    <fluro-content-view :id="plans[index]" :embedded="true" type="plan" />
                                </tab>
                            </tabset>
                            <!-- <pre>{{plans}}</pre> -->
                        </fluro-panel>
                    </v-container>
                </flex-column-body>
            </tab>
            <tab :heading="`Location & Rooms`">
                <flex-column-body style="background: #fafafa;">
                    <v-container fluid pa-0>
                        <location-view-map-component style="width: 100%; min-height: 300px; height: 50vh;" name="locationMap" :positions="model.locations" />
                        <constrain sm class="mt-4">
                            <location-selector v-model="model" :allLocations="locations" locationsPath="locations" roomsPath="rooms" />
                        </constrain>
                    </v-container>
                </flex-column-body>
            </tab>
            <tab :heading="`Media & Resources`">
                <flex-column-body style="background: #fafafa;">
                    <v-container>
                        <constrain sm>
                            <h3 margin>Media &amp; Resources</h3>
                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.mainImage" v-model="model"></fluro-content-form-field>
                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.images" v-model="model"></fluro-content-form-field>
                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.videos" v-model="model"></fluro-content-form-field>
                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.assets" v-model="model"></fluro-content-form-field>
                            <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.externalLinks" v-model="model"></fluro-content-form-field>
                            <fluro-panel>
                                <fluro-panel-title>
                                    <strong>Social Media</strong>
                                </fluro-panel-title>
                                <fluro-panel-body>
                                    <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.socialImages" v-model="model"></fluro-content-form-field>
                                    <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.socialBody" v-model="model"></fluro-content-form-field>
                                </fluro-panel-body>
                            </fluro-panel>
                        </constrain>
                    </v-container>
                </flex-column-body>
            </tab>
            <tab :heading="`Guest List`">
                <flex-column-body style="background: #fafafa;">
                    <v-container>
                        <!-- <constrain sm> -->
                        <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.expectTeams" v-model="model"></fluro-content-form-field>
                        <!-- </constrain> -->
                        <guest-list :event="model" />
                    </v-container>
                </flex-column-body>
            </tab>
            <tab :heading="`Registrations & Tickets`">
                <flex-column-body style="background: #fafafa;">
                    <v-container>
                        <!-- <constrain sm> -->
                        <h3 margin>Registrations &amp; Tickets</h3>
                        <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.forms" v-model="model"></fluro-content-form-field>
                        <!-- </constrain> -->
                        <ticket-type-manager v-model="model"></ticket-type-manager>
                        <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.publicTicketingEnabled" v-model="model"></fluro-content-form-field>
                        <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.publicTicketingConfirmationMessage" v-model="model"></fluro-content-form-field>
                        <!-- <pre>{{model.ticketTypes}}</pre> -->
                        <!-- <pre>{{model.ticketLimit}}</pre> -->
                        <ticket-list :event="model" />
                    </v-container>
                </flex-column-body>
            </tab>
            <tab :heading="`Messaging`">
                <slot>
                    <flex-column-body style="background: #fafafa;">
                        <v-container>
                            <constrain lg>
                                <h3 margin>Automated Messages</h3>
                                <event-message-manager v-model="model.messages" />
                                <!-- <messaging-event-manager :config="config" v-model="model.messages" :startDate="model.startDate" :endDate="model.endDate" /> -->
                            </constrain>
                        </v-container>
                    </flex-column-body>
                </slot>
            </tab>
            <tab :heading="`Checkin Settings`">
                <flex-column-body style="background: #fafafa;">
                    <v-container>
                        <constrain sm>
                            <h3 margin>Checkin Settings</h3>
                            <fluro-content-form :options="options" v-model="model.checkinData" :fields="checkinFields">
                                <template v-slot:form="{ formFields, fieldHash, model, update, options }">
                                    <v-container pa-0 grid-list-xl>
                                        <v-layout row wrap>
                                            <v-flex xs12 sm6>
                                                <v-input class="no-flex">
                                                    <v-label>Checkin Opens</v-label>
                                                    <p class="help-block">How many minutes earlier can users checkin</p>
                                                    <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.checkinStartOffset" v-model="model" />
                                                    <p class="help-block">No checkins before</p>
                                                    <p class="lead">
                                                        {{ checkinStartDate | formatDate("h:mma dddd D MMM", model.timezone) }}
                                                        <!-- {{checkinStartDate | formatDate:'g:ia l j M':model.timezone}} -->
                                                    </p>
                                                </v-input>
                                            </v-flex>
                                            <v-flex xs12 sm6>
                                                <v-input class="no-flex">
                                                    <v-label>Checkin Closes</v-label>
                                                    <p class="help-block">How many minutes after this event's end time can a user still check in?</p>
                                                    <fluro-content-form-field :form-fields="formFields" @input="update" :options="options" :field="fieldHash.checkinEndOffset" v-model="model" />
                                                    <p class="help-block">No checkins after</p>
                                                    <p class="lead">
                                                        {{ checkinEndDate | formatDate("h:mma dddd D MMM", model.timezone) }}
                                                        <!-- {{checkinEndDate | formatDate:'g:ia l j M':model.timezone}} -->
                                                    </p>
                                                </v-input>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                </template>
                            </fluro-content-form>
                        </constrain>
                    </v-container>
                </flex-column-body>
            </tab>
            <tab heading="Reporting & Metrics">
                <flex-column-body>
                    <v-container fluid grid-list-xl>
                        <constrain>
                        <h3 margin>Event Metrics</h3>
                        <event-age-gender-metrics :id="itemID"></event-age-gender-metrics>

                        <fluro-post-feed :parent="itemID"/>

                         <guest-list :event="model" />
                     </constrain>
                        
                    </v-container>
                </flex-column-body>
            </tab>
        </tabset>
    </flex-column>
</template>
<script>
/////////////////////////////////

// import MessagingEventManager from "../components/MessagingEventManager.vue";

// import MessagingEventManager from "../components/MessagingEventManager.vue";
import LocationViewMapComponent from "../../event/LocationViewMapComponent.vue";
import LocationSelector from "../components/LocationSelector.vue";
import FluroContentEditMixin from "../FluroContentEditMixin.js";
import GuestList from "../../event/GuestList.vue";
import TicketList from "../../event/TicketList.vue";
import TicketTypeManager from "../../event/TicketTypeManager.vue";
import FluroContentView from "../../view/FluroContentView.vue";
import EventAgeGenderMetrics from '../../../charts/metrics/EventAgeGenderMetrics.vue'
import FluroPostFeed from '../../../FluroPostFeed.vue'

/////////////////////////////////

import _ from "lodash";

import Vue from "vue";

/////////////////////////////////

export default {
    components: {
        GuestList,
        TicketList,
        TicketTypeManager,
        // FluroContentEdit,
        FluroContentView,
        // MessagingEventManager,
        LocationSelector,
        LocationViewMapComponent,
        EventAgeGenderMetrics,
        FluroPostFeed,
    },
    props: {},
    mixins: [FluroContentEditMixin],
    methods: {
        editRoster(roster) {
            var self = this;

            self.$fluro.global.edit(roster, true)
                .then(function(updated) {
                    _.assign(roster, updated);
                })
        },
        copyToClipboard(refID) {
            var self = this;

            let testingCodeToCopy = this.$refs[refID];
            testingCodeToCopy.setAttribute("type", "text"); // 不是 hidden 才能複製
            testingCodeToCopy.select();

            try {
                var successful = document.execCommand("copy");
                var msg = successful ? "successful" : "unsuccessful";
                // alert('Testing code was copied ' + msg);
                self.$fluro.notify("Invite Code Copied to clipboard");
            } catch (err) {
                // alert('Oops, unable to copy');
                // self.$fluro.error({message:'Unable to copy to clipboard'});
            }

            /* unselect the range */
            testingCodeToCopy.setAttribute("type", "hidden");
            if (process.browser) {
                window.getSelection().removeAllRanges();
            }
        },
        closePlan() {},
        planUpdated(result) {
            console.log("changed the plan!", result);
        },
        createPlan() {
            var self = this;
            var event = self.model;

            ///////////////////////////////////////////////////////

            self.$fluro.global
                .select(
                    "plan", { title: "Select a template", minimum: 1, maximum: 1 },
                    true
                )
                .then(function(plans) {
                    if (!plans || !plans.length) {
                        return;
                    }

                    var planID = self.$fluro.utils.getStringID(plans[0]);
                    self.processing = true;

                    return self.$fluro.content.get(planID).then(function(fullPlan) {
                        var template = fullPlan;
                        template.realms = event.realms;

                        ///////////////////////////////////

                        template.event = event;
                        template.startDate = event.startDate;
                        template.status = "active";
                        delete template._id;

                        self.$fluro.global
                            .create(
                                "plan", {
                                    template,
                                    copy: true
                                },
                                true
                            )
                            .then(
                                function(res) {
                                    self.processing = false;
                                },
                                function(err) {
                                    self.processing = false;
                                }
                            );
                    });
                });
        },
        createRoster(rosterType) {
            var self = this;

            var newRoster = {
                title: rosterType.title,
                event: self.model,
                definition: rosterType.definitionName,
                realms: self.model.realms.slice(),
            };


            self.$set(rosterType, 'loading', true);

            self.$fluro.api.post(`/content/${rosterType.definitionName}`, newRoster)
                .then(function(res) {

                    var roster = res.data;

                    if (!self.model.rostered) {
                        self.$set(self.model, 'rostered', []);
                    }
                    self.model.rostered.push(roster);

                    //////////////////////////////////////////////



                    self.$fluro.global.edit(roster, true).then(function(updated) {
                        _.assign(roster, updated)
                    });

                    self.$set(rosterType, 'loading', false);

                    // // console.log('SET NOW', column.rosters[rosterDefinitionName], roster);

                    // self.$set(column.rosters[rosterDefinitionName], 'roster', roster);
                    // self.$set(column, 'addingRoster', false);

                }, function(err) {
                    self.$fluro.error(err);
                    self.$set(rosterType, 'loading', false);
                    // self.$set(column, 'addingRoster', false);
                });





            // self.$fluro.global
            //     .create(
            //         rosterType.definitionName, {
            //             template
            //         },
            //         true
            //     )
            //     .then(function(result) {
            //         console.log("Result");
            //     })
            //     .catch(function(err) {});

            // fluro.global.create = function(definedType, options, modal) {
        },
        confirmationIcon(assignment) {
            switch (assignment.confirmationStatus) {
                case "confirmed":
                    return "check";
                    break;
                case "denied":
                    return "times";
                    break;
                case "unknown":
                    return "clock";
                    break;
                case "proposed":
                    return "question-circle";
                    break;
            }
        },
        canEditRoster(roster) {
            return this.$fluro.access.canEditItem(roster);
        }
        // editRoster(roster) {
        //     console.log('Eit roster', roster);
        // },
    },

    watch: {
        "dateModel.startDate": function(value) {
            /**/
            // console.log('VALUE IS', value)
            var date = new Date(value);
            this.model.startDate = date;
            this.update(this.model);

            //If there is actually a value
            if (value) {
                //Check what the end date is currently
                var endDate = this.dateModel.endDate ?
                    new Date(this.dateModel.endDate) :
                    false;

                if (endDate) {
                    //If the end date is less than the start date, update it to the start date
                    if (endDate < date) {
                        this.dateModel.endDate = new Date(date);
                    }
                } else {
                    //If there is no end date, we should default to match the start date
                    this.dateModel.endDate = new Date(date);
                }
            }
        },
        "dateModel.endDate": function(value) {
            /**/
            // console.log('VALUE IS', value)
            var date = new Date(value);
            this.model.endDate = date;
            this.update(this.model);

            var startDate = this.dateModel.startDate ?
                new Date(this.dateModel.startDate) :
                false;

            if (startDate) {
                if (startDate > date) {
                    // console.log('UPDATE START DATE', startDate, ' is greater than', date)
                    this.dateModel.startDate = new Date(date);
                }
            }
            /**/
        }
    },
    created() {
        var self = this;
        if (!self.model.data) {
            self.$set(self.model, "data", {});
        }

        //console.log('Start Date BEFORE', self.model.startDate, self.model.endDate);
        if (self.model.startDate) {
            self.dateModel.startDate = new Date(self.model.startDate);
        }
        if (self.model.endDate) {
            self.dateModel.endDate = new Date(self.model.endDate);
        }

        if (!self.model.checkinData) {
            self.$set(self.model, "checkinData", {
                checkinStartOffset: 90,
                checkinEndOffset: 90
            });
        }

        if (!self.model.streamData) {
            self.$set(self.model, "streamData", {
                streamStartOffset: 30,
                streamEndOffset: 30
            });
        }

        if (!self.model.messages) {
            self.$set(self.model, "messages", []);
        }

        if (!self.model.locations) {
            self.$set(self.model, "locations", []);
        }

        if (!self.model.rooms) {
            self.$set(self.model, "rooms", []);
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
                                var alreadyCreated = !self.existingRosterTypes[
                                    type.definitionName
                                ];
                                if (!alreadyCreated) {
                                    return;
                                }

                                //Return if we have enough permissions to create this thing
                                return self.$fluro.access.can(
                                    "create",
                                    type.definitionName,
                                    "roster"
                                );
                            });
                            resolve(filtered);
                        })
                        .catch(reject);
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
        differentTimezoneThanUser() {
            // console.log('checkit!', this.model.timezone )
            return this.$fluro.date.isDifferentTimezoneThanUser(
                this.model.timezone || ""
            );
        },
        filteredTickets() {},
        fieldsOutput() {
            var self = this;
            var array = [];

            ///////////////////////////////////

            addField("title", {
                title: "Event Title",
                minimum: 1,
                maximum: 1,
                type: "string",
                placeholder: "Event title",
                params: {
                    autofocus: !self.model.title,
                }
            });

            addField("firstLine", {
                title: "Subtitle",
                minimum: 0,
                maximum: 1,
                type: "string",
                placeholder: "Eg. A great event for the whole family. Featuring Special Guest...",
                description: "A short one line description about this event"
            });

            ///////////////////////////////////

            addField("streamEnabled", {
                title: "Stream Enabled",
                description: "Enable live streaming for this event",
                minimum: 0,
                maximum: 1,
                type: "boolean"
                // defaultValues: [true]
            });

            ///////////////////////////////////

            addField("streamContent", {
                title: "Pre-recorded Video",
                description: "Select or create a video to stream for this event",
                minimum: 0,
                maximum: 1,
                type: "reference",
                params: {
                    restrictType: "video"
                }
            });

            addField("streamIntegrations", {
                title: "Stream Integrations",
                description: "Broadcast to multiple endpoints",
                minimum: 0,
                maximum: 0,
                type: "reference",
                params: {
                    restrictType: "integration"
                }
            });

            ///////////////////////////////////
            ///////////////////////////////////
            ///////////////////////////////////

            var timezoneDescription;
            var differentTimezone = self.$fluro.date.isDifferentTimezoneThanUser(
                self.model.timezone
            );
            if (differentTimezone) {
                var browserTimezone = self.$fluro.date.currentTimezone();
                timezoneDescription = browserTimezone;
            }

            var now = new Date();
            // self.$fluro.date.moment().add('2', 'months').toDate();
            // console.log('Create Default event date', now)
            // new Date();
            addField("startDate", {
                title: `Start Date`,
                minimum: 1,
                maximum: 1,
                type: "date",
                description: timezoneDescription,
                directive: "datetimepicker",
                defaultValues: [now],
                params: {
                    persistentDescription: !!timezoneDescription
                }
            });

            addField("endDate", {
                title: `End Date`,
                minimum: 0,
                maximum: 1,
                type: "date",
                description: timezoneDescription,
                directive: "datetimepicker",
                defaultValues: [now],
                params: {
                    persistentDescription: !!timezoneDescription
                }
            });

            addField("timezone", {
                title: "Event Timezone",
                minimum: 0,
                maximum: 1,
                type: "string",
                directive: "timezone-select",
                description: "Set a local timezone for this event"
            });

            ///////////////////////////////////
            ///////////////////////////////////
            ///////////////////////////////////

            addField("mainImage", {
                title: "Main Promotional Image",
                description: "Select a main promotional image for this event",
                minimum: 0,
                maximum: 1,
                type: "reference",
                directive: "reference-select",
                params: {
                    restrictType: "image"
                }
            });

            addField("track", {
                title: "Event Track",
                description: "The event track for this event",
                minimum: 0,
                maximum: 1,
                type: "reference",
                directive: "reference-select",
                params: {
                    restrictType: "eventtrack"
                }
            });

            addField("body", {
                title: "Body",
                minimum: 0,
                maximum: 1,
                type: "string",
                directive: "wysiwyg",
                placeholder: "",
                description: ""
            });

            ///////////////////////////////////
            ///////////////////////////////////
            ///////////////////////////////////

            addField("images", {
                title: "Additional Images",
                description: "Additional promotional images for this event",
                minimum: 0,
                maximum: 0,
                type: "reference",
                directive: "reference-select",
                params: {
                    restrictType: "image"
                }
            });

            addField("videos", {
                title: "Videos",
                description: "Additional video content for this event",
                minimum: 0,
                maximum: 0,
                type: "reference",
                directive: "reference-select",
                params: {
                    restrictType: "video"
                }
            });

            addField("assets", {
                title: "Files and Resources",
                description: "Additional downloadable assets and resources for this event",
                minimum: 0,
                maximum: 0,
                type: "reference",
                directive: "reference-select",
                params: {
                    restrictType: "asset"
                }
            });

            addField("externalLinks", {
                title: "External Link",
                // description: '',
                minimum: 0,
                maximum: 0,
                askCount: 0,
                type: "group",
                asObject: true,
                sameLine: true,
                fields: [{
                    type: "group",
                    sameLine: true,
                    fields: [{
                            title: "Title",
                            key: "title",
                            type: "string",
                            minimum: 1,
                            maximum: 1
                        },
                        {
                            title: "URL",
                            key: "url",
                            type: "url",
                            minimum: 1,
                            maximum: 1,
                            placeholder: "https://"
                        }
                    ]
                }]
            });

            ///////////////////////////////////

            addField("socialImages", {
                title: "Social Media Artwork",
                description: "Add images and artwork that can be shared from pulse and slipstream to promote this event",
                minimum: 0,
                maximum: 0,
                type: "reference",
                directive: "reference-select",
                params: {
                    restrictType: "image"
                }
            });

            addField("socialBody", {
                title: "Social Media Blurb",
                description: "Add a social blurb and hashtags to use when sharing/promoting this event",
                minimum: 0,
                maximum: 1,
                type: "string",
                directive: "textarea"
            });

            // addField('externalLinks', {
            //     title: 'External Links',
            //     description: 'Relevant external links and URLs for this event',
            //     minimum: 0,
            //     maximum: 0,
            //     type: '',
            //     directive: 'reference-select',
            //     params: {
            //         restrictType: 'asset',
            //     }
            // });

            ///////////////////////////////////
            ///////////////////////////////////
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

            addField("forms", {
                title: "Registration Forms",
                description: "Manage registration forms that can be used to register for this event",
                minimum: 0,
                maximum: 0,
                type: "reference",
                directive: "reference-select",
                params: {
                    restrictType: "form"
                }
            });

            addField("expectTeams", {
                title: "Expect Groups",
                description: "Select groups to expect as attendees. This will expect all active members of these groups as attending at the time of event start",
                minimum: 0,
                maximum: 0,
                type: "reference",
                directive: "reference-select",
                params: {
                    restrictType: "team"
                }
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
        eventID() {
            return this.$fluro.utils.getStringID(this.model);
        },
        accountID() {
            return this.$fluro.utils.getStringID(this.model.account);
        },
        rtmpUrl() {
            if (!this.streamKey) {
                return "Please save this event to generate your RTMP URL";
            }
            return "rtmp://rtmp.fluro.io/live/";
        },
        liveUrl() {
            if (!this.streamKey) {
                return "Please save this event to generate your fluro live url";
            }

            return `https://fluro.live/event/${this.accountID}/${this.eventID}`;
        },
        streamUrl() {
            if (!this.streamKey) {
                return "Please save this event to generate your fluro live url";
            }

            return `https://rtmp.fluro.io/live/${this.accountID}.${this.eventID}/index.m3u8`;
        },
        streamKey() {
            var self = this;
            if (!self.eventID || !self.accountID) {
                return;
                // 'Please save this event to get your stream key';
            }

            return `${self.accountID}.${self.eventID}`;
        },
        readableTypeName() {
            return this.definition ?
                this.$fluro.types.readable(this.definition.title) :
                "Event";
        },
        plans() {
            return this.model.plans || [];
        },
        existingRosterTypes() {
            return _.reduce(
                this.model.rostered,
                function(set, roster) {
                    set[roster.definition] = true;
                    return set;
                }, {}
            );
        },
        coverImage() {
            var self = this;
            return self.$fluro.asset.coverImage(self.model._id, "event", { w: 150 });
        },
        checkinStartOffset() {
            var self = this;
            var originalOffsetValue = self.model.checkinData.checkinStartOffset;

            if (
                originalOffsetValue === undefined ||
                originalOffsetValue === null ||
                isNaN(originalOffsetValue)
            ) {
                return 90;
            } else {
                return parseInt(originalOffsetValue);
            }
        },
        checkinStartDate() {
            var self = this;
            return self.$fluro.date
                .moment(self.model.startDate)
                .subtract(self.checkinStartOffset, "minutes")
                .toDate();
        },
        checkinEndOffset() {
            var self = this;
            var originalOffsetValue = self.model.checkinData.checkinEndOffset;

            if (
                originalOffsetValue === undefined ||
                originalOffsetValue === null ||
                isNaN(originalOffsetValue)
            ) {
                return 90;
            } else {
                return parseInt(originalOffsetValue);
            }
        },
        checkinEndDate() {
            var self = this;
            return self.$fluro.date
                .moment(self.model.startDate)
                .add(self.checkinEndOffset, "minutes")
                .toDate();
        },
        checkinFields() {
            return [{
                    title: "Checkin Opens",
                    description: "How many minutes earlier can users checkin",
                    key: "checkinStartOffset",
                    placeholder: "Defaults to 90 mins before event start",
                    minimum: 0,
                    maximum: 1,
                    // suffix:'minutes',
                    type: "integer"
                },
                {
                    title: "Checkin Closes",
                    description: `How many minutes after this event's end time can a user still checkin`,
                    key: "checkinEndOffset",
                    placeholder: "Defaults to 90 mins after event ends",
                    minimum: 0,
                    maximum: 1,
                    // suffix:'minutes',
                    type: "integer"
                }
            ];
        },

        streamStartOffset() {
            var self = this;
            var originalOffsetValue = self.model.streamData.streamStartOffset;

            if (
                originalOffsetValue === undefined ||
                originalOffsetValue === null ||
                isNaN(originalOffsetValue)
            ) {
                return 90;
            } else {
                return parseInt(originalOffsetValue);
            }
        },
        streamStartDate() {
            var self = this;
            return self.$fluro.date
                .moment(self.model.startDate)
                .subtract(self.streamStartOffset, "minutes")
                .toDate();
        },
        streamEndOffset() {
            var self = this;
            var originalOffsetValue = self.model.streamData.streamEndOffset;

            if (
                originalOffsetValue === undefined ||
                originalOffsetValue === null ||
                isNaN(originalOffsetValue)
            ) {
                return 90;
            } else {
                return parseInt(originalOffsetValue);
            }
        },
        streamEndDate() {
            var self = this;
            return self.$fluro.date
                .moment(self.model.endDate || self.model.startDate)
                .add(self.streamEndOffset, "minutes")
                .toDate();
        },
        streamFields() {
            return [{
                    title: "Stream Opens",
                    description: "How many minutes earlier can users stream",
                    key: "streamStartOffset",
                    placeholder: "Defaults to 30 mins before event start",
                    minimum: 0,
                    maximum: 1,
                    // suffix:'minutes',
                    type: "integer"
                },
                {
                    title: "Stream Closes",
                    description: `How many minutes after this event's end time can a user still stream`,
                    key: "streamEndOffset",
                    placeholder: "Defaults to 30 mins after event ends",
                    minimum: 0,
                    maximum: 1,
                    // suffix:'minutes',
                    type: "integer"
                }
            ];
        },

        showOutline() {
            return false; //true; //false;//true;//false;//true;
        }
    },
    data() {
        var existingModel = JSON.parse(JSON.stringify(this.value));

        return {
            dateModel: {
                startDate: existingModel.startDate ?
                    new Date(existingModel.startDate) : new Date(),
                endDate: existingModel.endDate ?
                    new Date(existingModel.endDate) : new Date()
            }
        };
    }
};

</script>
<style scoped lang="scss">
.event-cover-image {
    border-radius: 5px;
    width: 90%;
    padding-bottom: 70%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    display: block;
    margin: 5%;
}

.hint {
    font-size: 10px;
    opacity: 0.5;
    color: inherit;
    display: block;
}

.copystring {
    width: 100%;
    overflow: auto;
    display: block;
    background: #eee;
    border-radius: 3px;
    // font-size: 0.9em;
    // font-weight: bold;
    opacity: 0.5;
    padding: 10px;
    line-height: 20px;

    &:hover {
        opacity: 1;
    }
}

.assignment-item {
    font-size: 12px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    border-radius: 100px;
    margin-bottom: 2px;
    padding: 2px 10px;
    font-weight: 500;
    background-color: rgba(#000, 0.05);

    &.confirmed {
        color: $success;
        background-color: rgba($success, 0.05);
    }

    &.denied {
        color: $danger;
        background-color: rgba($danger, 0.05);
    }

    &.unknown {
        color: #555;
    }

    &.proposed {
        background-color: rgba($proposedColor, 0.1);
        color: darken($proposedColor, 20%);
    }
}

.btn-ghost {
    border: 1px dashed #555;
    color: #555;
    opacity: 0.5;

    &:hover {
        border-color: $primary;
        color: $primary;
        background: rgba($primary, 0.1);
        opacity: 1;
    }
}

.bordered {
    border: 1px solid rgba(#000, 0.1);
    box-shadow: 0 2px 4px rgba(#000, 0.1);

    &>>>.tabset-menu {
        background: #eee;
    }
}

</style>
