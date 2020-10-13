<template>
    <div class="suggestion-list-item">
        <v-menu left offset-x :open-on-hover="true">
            <template v-slot:activator="{ on }">
                <v-layout v-on="on" align-center>
                    <v-flex shrink class="face">
                        <fluro-realm-bar :realm="model.realms" />
                        <v-progress-circular indeterminate v-if="isLoading" />
                        <fluro-avatar md :id="model" v-else />
                    </v-flex>
                    <v-flex>
                        <div>
                            <strong>{{model.title}}</strong>
                           
                            <div class="summary" v-if="!manual">{{summary}}</div>
                        </div>
                    </v-flex>
                    <v-flex shrink>
                        <div class="btn-group">
                            <span class="btn" @click.stop.prevent="$actions.open([model])" xs>
                                <fluro-icon icon="ellipsis-h" />
                            </span>
                            <span class="btn" xs>
                                <fluro-icon icon="plus" />
                            </span>
                        </div>
                    </v-flex>
                </v-layout>
            </template>
            <div class="suggestion-roster-summary">
                <h5>{{model.title}}</h5>
                <div class="suggestion-roster-summary-group" v-if="assignmentsExplanation">
                    <h6>
                        <fluro-icon library="fas" class="icon" type="assignment" />Already Declined</h6>
                    <div v-html="assignmentsExplanation" />
                </div>
                <div class="suggestion-roster-summary-group" v-if="teams">
                    <h6>
                        <fluro-icon library="fas" class="icon" type="team" /> Is '{{assignmentSlot.title}}' position in</h6>
                    <div v-html="teams" />
                </div>
                <div class="suggestion-roster-summary-group" v-if="capabilities">
                    <h6>
                        <fluro-icon library="fas" class="icon" type="capability" />Capabilities</h6>
                    <div v-html="capabilities" />
                </div>
                <div class="suggestion-roster-summary-group" v-if="conflicts.length">
                    <h6>
                        <fluro-icon library="fas" class="icon" icon="exclamation-circle" /> Conflicts</h6>
                    <div v-for="assignment in conflicts">
                        <strong>{{assignment.title}}</strong> at <strong>{{assignment.event.startDate | formatDate('h:mma')}} - '{{assignment.event.title}}'</strong>
                    </div>
                </div>
                <div class="suggestion-roster-summary-group" v-if="prior">
                    <h6>
                        <fluro-icon library="fas" class="icon" type="angle-left" /> Prior Assignment</h6>
                    <div v-html="prior"></div>
                </div>
                <div class="suggestion-roster-summary-group" v-if="next">
                    <h6>
                        <fluro-icon library="fas" class="icon" type="angle-right" /> Next Assignment</h6>
                    <div v-html="next"></div>
                </div>
                <div class="suggestion-roster-summary-group" v-if="lacks.length">
                    <h6>
                        <fluro-icon library="fas" class="icon" type="frown" /> Lacks required capability</h6>
                    <div><Strong>{{lacks}}</Strong></div>
                </div>
                <div class="suggestion-roster-summary-group" v-if="periods.length">
                    <h6>
                        <fluro-icon library="fas" class="icon" type="times-circle" /> Unavailable</h6>
                    <div v-for="period in periods">
                        {{period.description}} <strong>{{period | readableEventDate}}</strong>
                    </div>
                </div>
            </div>
        </v-menu>
    </div>
</template>
<script>
import moment from 'moment';
import _ from 'lodash';

export default {
    props: {
        manual: {
            type: Boolean,
        },
        assignmentSlot: {
            type: Object,
        },
        event: {
            type: Object,
        },
        value: {
            type: Object,
        }
    },
    data() {
        return {
            model: this.value,
        }
    },
    watch: {
        value(val) {
            this.model = val;
        },
    },
    methods: {
        timeDifference(date1, date2) {

            var measure = moment(date1).from(date2, true);
            if (date1 < date2) {
                return measure + ' before this event';
            } else {
                return measure + ' after this event';
            }

        },
    },
    computed: {
        isLoading() {
            var self = this;
            return self.model.loading;
        },
        conflictExplanation() {
            var self = this;

            if (!self.assignments || !self.assignments.length) {
                return;
            }

            var reasonsMap = self.declinedReasons;
            return `<strong>${_.values(reasonsMap.descriptions).join(', ')}</strong> (${_.values(reasonsMap.positions).join(', ')})`
        },
        assignmentsExplanation() {
            var self = this;

            if (!self.assignments || !self.assignments.length) {
                return;
            }

            var reasonsMap = self.declinedReasons;
            return `<strong>${_.values(reasonsMap.descriptions).join(', ')}</strong> (${_.values(reasonsMap.positions).join(', ')})`
        },
        declinedReasons() {

            var self = this;

            return _.reduce(self.assignments, function(set, assignment) {

                var description = assignment.description || 'Unavailable.';
                var position = assignment.title;

                if (!set.descriptions[description.toLowerCase()]) {
                    set.descriptions[description.toLowerCase()] = description;
                }

                if (!set.positions[position.toLowerCase()]) {
                    set.positions[position.toLowerCase()] = position;
                }

                return set;
            }, {
                descriptions: {},
                positions: {},
            })
        },
        teams() {
            return this.model.teams && this.model.teams.length ? this.model.teams.join(', ') : null;
        },
        capabilities() {
            return this.model.capabilities && this.model.capabilities.length ? _.map(this.model.capabilities, 'title').join(', ') : null;
        },
        endDate() {
            return new Date(this.event.endDate);
        },
        startDate() {
            return new Date(this.event.startDate);
        },
        prior() {
            var self = this;
            var model = self.model;

            if (!model.previous) {
                return;
            }

            var previousDate = new Date(model.previous.endDate);
            var difference = moment(self.endDate).from(previousDate, true);
            var assignmentName = model.previous.assignmentName;
            var eventName = model.previous.title;
            var eventTime = moment(model.previous.startDate).format('h:mma');

            return `<strong>'${assignmentName}'</strong> at <strong>${eventTime} '${eventName}'</strong> ending <strong>${difference} before</strong> this event`;
            // return `<strong>${eventName}</strong><br/>ends <strong>${difference} before</strong> this event`;
        },
        next() {
            var self = this;
            var model = self.model;

            if (!model.next) {
                return;
            }

            var nextDate = new Date(model.next.startDate);
            var difference = moment(self.endDate).from(nextDate, true);
            var assignmentName = model.next.assignmentName;
            var eventName = model.next.title;
            var eventTime = moment(nextDate).format('h:mma');

            return `<strong>'${assignmentName}'</strong> at <strong>${eventTime} '${eventName}'</strong> starts <strong>${difference} after</strong> this event`;
            // return `<strong>${eventName}</strong><br/>starts <strong>${difference} after</strong> this event`;
        },
        conflicts() {
            var self = this;
            return self.model && self.model.conflicts ? self.model.conflicts : [];
        },
        lacks() {
            var self = this;
            return self.model && self.model.lacks ? self.model.lacks : [];
        },
        periods() {
            var self = this;
            return self.model && self.model.periods ? self.model.periods : [];
        },
        assignments() {

            var self = this;
            return self.model && self.model.assignments ? self.model.assignments : [];
        },
        summary() {
            var self = this;

            ////////////////////////////////////

            if (self.conflicts && self.conflicts.length) {

                if (self.conflicts.length > 3) {
                    return `Already rostered to ${self.conflicts.length} other positions`
                } else {
                    var names = _.map(self.conflicts, 'title').join(', ');
                    return `Already rostered as ${names}`
                }
            }



            ////////////////////////////////////


            if (self.lacks && self.lacks.length) {
                return `Lacks ${self.lacks}`;
            }


            var periods = self.periods;



            if (periods && periods.length) {
                return _.map(periods, function(period) {
                        console.log('PERIOD', period);
                        return `${period.description || 'Unavailable.'} ${self.$fluro.date.readableEventDate(period)}`;
                    })
                    .join(', ');
            }


            var declinedAssignments = self.assignments;
            if (declinedAssignments && declinedAssignments.length) {

                var reasonsMap = self.declinedReasons;
                return `${_.values(reasonsMap.descriptions).join(', ')} (${_.values(reasonsMap.positions).join(', ')})`



            }


            if (!self.model.closest) {
                return `Hasn't served as '${self.assignmentSlot.title}' before`;
            }



            return `Assigned ${self.timeDifference(self.model.closest.endDate, self.event.startDate)}`;
            // {{contact.closest.endDate | timedifference:service.selected.event.startDate}}`;

        }
    }
}

</script>
<style lang="scss">
.suggestion-list-item {
    // display: flex;
    position: relative;
    padding: 7px 10px;
    border-bottom: 1px solid rgba(#000, 0.1);
    line-height: 1.4;
    cursor: pointer;

    &:last-child {
        border-bottom: none;
    }

    &:hover {
        background: rgba(#000, 0.05);
    }

    .face {
        flex: none;
        padding-right: 10px;
    }

    .summary {
        font-size: 0.8em;
        opacity: 0.5;
    }
}


.suggestion-roster-summary {
    background: #111;
    color: #ccc;
    padding: 10px 5px;
    letter-spacing: -0.03em;
    font-size: 12px;
    width: 250px;
    overflow: hidden;

    h4,
    h5,
    h6,
    strong {
        color: #fff;
    }

    .suggestion-roster-summary-group {
        padding-top: 10px;
        margin-top: 5px;
        border-top: 1px solid rgba(#fff, 0.1);
        line-height: 1.4;

        .icon {
            font-size: 9px;
            line-height: inherit;
            margin-right: 5px;
            display: none;
        }

        h6 {
            text-transform: uppercase;
            font-size: 10px;
            font-weight: 600;
            letter-spacing: 0.03em;
            margin-bottom: 5px;



        }
    }


}

</style>
