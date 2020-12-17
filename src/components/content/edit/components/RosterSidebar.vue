<template>
    <flex-column class="multi-planner-sidebar">
        <flex-column-header>
            <v-container class="border-bottom">
                <v-layout align-center>
                    <v-flex>
                        <h4><strong v-if="slot">{{slot.title}}</strong></h4>
                    </v-flex>
                </v-layout>
                <h6 v-if="event">{{event.title}} <span class="muted">{{event.definition || event._type | definitionTitle}}</span></h6>
                <div v-if="event">{{event | readableEventDate}} <span class="sm muted">(Starts {{event.startDate | timeago}})</span></div>
            </v-container>
        </flex-column-header>
        <flex-column>
            <tabset v-model="activeTabIndex" v-if="slot">
                <tab :heading="`${rosteredCount} Rostered`" index="rostered">
                    <flex-column-body>
                        <v-container>
                            <v-container pa-0 pb-2>
                                <div class="search" :class="{active:searchFocussed || search.length}">
                                    <input v-model="search" ref="search" @focus="searchFocussed = true" @blur="searchFocussed = false" placeholder="Search for contacts" />
                                    <div class="search-icon" @click="search = ''">
                                        <fluro-icon icon="times" v-if="search.length" />
                                        <fluro-icon icon="search" v-else />
                                    </div>
                                </div>
                            </v-container>
                            <template v-if="search.length">
                                <v-container pa-0 pb-2>
                                    <template v-if="searching">
                                        <div>Searching...</div>
                                        <v-progress-circular indeterminate />
                                    </template>
                                    <template v-else>
                                        <label>Search Results</label>
                                        <list-group>
                                            <roster-slot-suggestion-list-item v-for="(contact, index) in searchResults" :manual="true" @click.native="selectSuggestion(searchResults[index])" v-model="searchResults[index]" :assignmentSlot="slot" :event="event" />
                                        </list-group>
                                    </template>
                                </v-container>
                            </template>
                            <template v-else>

                                <!-- <pre>{{slot}}</pre> -->
                                <v-container pa-0 pb-2 v-if="assignments.length">
                                    <label>Rostered</label>
                                    <!-- <list-group> -->
                                    <div>
                                        <template v-for="(assignment, index) in assignments">
                                            <roster-slot-assignment-list-item @unassign="removeAssignment" @send="sendAssignment" v-model="assignments[index]" />
                                        </template>
                                    </div>
                                    <!-- </list-group> -->
                                    
                                </v-container>
                                <v-layout>
                                    <v-flex xs12>
                                        <v-btn block @click="nudge()" :loading="nudging" v-if="nudgeEnabled">
                                            Nudge
                                            <fluro-icon right icon="hand-pointer" />
                                        </v-btn>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-btn block color="primary" @click="send()" :loading="sending" v-if="sendEnabled">
                                            Send {{proposedAssignments.length}}
                                            <fluro-icon right icon="angle-right" />
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                                <!-- <pre>{{suggestedContacts}}</pre> -->
                                <v-container px-0 pt-1>
                                    <label>Suggestions</label>
                                    <div v-if="loadingSuggestions">
                                        <div>Loading...</div>
                                        <v-progress-circular indeterminate />
                                    </div>
                                    <div v-else>
                                        <list-group v-if="suggestedContacts.length">
                                            <roster-slot-suggestion-list-item v-for="(contact, index) in suggestedContacts" @click.native="selectSuggestion(suggestedContacts[index])" v-model="suggestedContacts[index]" :assignmentSlot="slot" :event="event" />
                                            <!-- <template v-for="row in suggestions" v-if="row.length">
                                            <suggestion-list-item @click.native="selectSuggestion(row[0])" v-model="row[0]" :assignmentSlot="slot" :event="event" />
                                        </template> -->
                                        </list-group>
                                        <template v-else>
                                            <em class="small muted">No suggestions</em>
                                        </template>
                                    </div>
                                </v-container>
                            </template>
                        </v-container>
                    </flex-column-body>
                </tab>
                <tab :heading="`${unavailableCount} Unavailable`" index="unavailable">
                    <flex-column-body>
                        <v-container>
                            <v-container pa-0 pb-2 v-if="conflicts.length">
                                <label>Already Rostered</label>
                                <list-group>
                                    <roster-slot-suggestion-list-item v-for="(contact, index) in conflicts" @click.native="selectSuggestion(conflicts[index])" v-model="conflicts[index]" :assignmentSlot="slot" :event="event" />
                                </list-group>
                            </v-container>
                            <v-container pa-0 pb-2 v-if="unavailable.length">
                                <label>Unavailable at this time</label>
                                <list-group>
                                    <roster-slot-suggestion-list-item v-for="(contact, index) in unavailable" @click.native="selectSuggestion(unavailable[index])" v-model="unavailable[index]" :assignmentSlot="slot" :event="event" />
                                </list-group>
                            </v-container>
                            <v-container pa-0 pb-2 v-if="unqualified.length">
                                <label>Unqualified</label>
                                <list-group>
                                    <roster-slot-suggestion-list-item v-for="(contact, index) in unqualified" @click.native="selectSuggestion(unqualified[index])" v-model="unqualified[index]" :assignmentSlot="slot" :event="event" />
                                </list-group>
                            </v-container>
                        </v-container>
                    </flex-column-body>
                </tab>
            </tabset>
        </flex-column>
        <!-- <flex-column-footer>
            <v-container py-1 class="border-top">
                <v-btn block @click="deselect()">Done</v-btn>
            </v-container>
        </flex-column-footer> -->
    </flex-column>
</template>
<script>
import RosterSlotSuggestionListItem from './RosterSlotSuggestionListItem.vue';
import RosterSlotAssignmentListItem from './RosterSlotAssignmentListItem.vue';
import _ from 'lodash';

export default {
    props: {
        value: {
            type: Object,
        }
    },
    components: {
        RosterSlotSuggestionListItem,
        RosterSlotAssignmentListItem
    },
    data() {
        return {
            activeTabIndex:'rostered',
            search: '',
            searchFocussed: false,
            searching: false,
            searchResults: [],
            loadingSuggestions: false,
            model: this.value,
            suggestionData: null,
            nudging: false,
            sending: false,
        }
    },
    mounted() {
        this.focusSearch();
        console.log('Mounted')
        this.reloadSuggestions();
    },
    methods: {

        deselect() {
            this.$emit('input', null);
        },
        relevantRealmIDs() {
            var self = this;
            return self.$fluro.arrayIDs(self.roster.realms || self.event.realms || []);
        },
        eventRealmMap() {
            var self = this;

            return _.reduce(self.relevantRealmIDs, function(set, realmID) {
                set[realmID] = realmID;
                return set;
            }, {})
        },
        getBestCandidate(row) {

            var self = this;
            var filtered = self.filterPossible(row);

            //////////////////////////////////////////

            //Order based on whether the realm is a match and the random ordering from the backend
            filtered = _.orderBy(filtered, function(contact, index) {

                var matchesRealm = _.some(contact.realms, function(realmID) {
                    if (realmID._id) {
                        realmID = realmID._id;
                    }

                    return self.eventRealmMap[realmID];
                });

                var realmWeight = matchesRealm ? 0 : 1;

                //////////////////////////////////////

                var orderIndex = parseInt(`${realmWeight}${index}`);
                console.log('ORDER INDEX IS', orderIndex);

                return orderIndex;
            })
            //////////////////////////////////////////


            return filtered[0];
        },
        filterPossible(contacts) {

            var self = this;
            return _.chain(contacts)
                .filter(function(contact) {
                    var alreadyRostered = self.rosteredMap[contact._id];
                    var unqualified = self.unqualifiedMap[contact._id];
                    return !alreadyRostered && !unqualified;
                })
                .value()

        },
        searchFor: _.debounce(function(string) {

            var self = this;

            if (!string || !string.length) {
                self.searchResults = [];
                self.searching = false;
                return
            }

            self.searching = true;

            self.$fluro.api.get(`/content/contact/search/${string}`, {
                    params: {
                        limit: 10,
                    },
                    cache:false,
                })
                .then(function(res) {
                    self.searchResults = self.filterPossible(res.data);
                    self.searching = false;
                })
                .catch(function(err) {
                    self.searchResults = [];
                    self.searching = false;
                })

        }, 300),
        nudge() {
            var self = this;


            self.nudging = true;

            var assignments = self.unknownAssignments;


            //////////////////////////////////////////

            if (!assignments.length) {
                self.nudging = false;
                return;
            }

            ////////////////////////////////////////

            return self.$fluro.api.post('/assignments/nudge', {
                    assignments,
                })
                .then(function(res) {
                    self.nudging = false;

                    ////console.log('Nudged everyone!', res);
                    if (res.data.success.length) {
                        self.$fluro.notify(`${res.data.success.length} notifications sent`);
                    } else {
                        self.$fluro.notify(`No notifications were sent`);
                    }

                })
                .catch(function(err) {
                    self.nudging = false;
                    self.$fluro.error(err);
                })
        },
        send() {
            var self = this;
            self.sending = true;

            //////////////////////////////////////

            var assignments = self.proposedAssignments;

            if (!assignments.length) {
                self.sending = false;
                return;
            }

            //////////////////////////////////////

            //Map each proposed to a promise
            var promises = _.map(assignments, function(assignment) {
                return self.sendAssignment(assignment);
            });

            //////////////////////////////////////

            Promise.all(promises)
                .then(function(res) {
                    self.sending = false;
                })
                .catch(function(err) {
                    self.sending = false;
                })
        },
        editAssignment(assignment) {

        },
        createAssignment(details) {

            var self = this;

            return new Promise(function(resolve, reject) {


                var rosterID = self.$fluro.utils.getStringID(self.model.roster);
                var contact = details.contact;

                // var details = {
                //     title: self.slot.title,
                //     contact: contact,
                //     confirmationStatus: 'proposed',
                //     force: options.force,
                // }

                self.$fluro.api.post(`/assignments/roster/${rosterID}`, details)
                    .then(assignmentCreated)
                    .catch(assignmentCreateError);


                function assignmentCreated(res) {
                    var matchingAssignment = res.data;
                    matchingAssignment.contactName = (matchingAssignment.contact.title || matchingAssignment.contact.firstName + ' ' + matchingAssignment.contact.lastName);

                    var alreadyAssigned = _.some(self.slot.assignments, {
                        _id: matchingAssignment._id,
                    })

                    if (!alreadyAssigned) {

                        if(!self.slot.assignments) {
                            self.$set(self.slot, 'assignments', []);
                        }
                        
                        self.slot.assignments.push(matchingAssignment);
                    }

                    resolve(matchingAssignment);
                    self.searchResults = [];
                    self.search = '';
                    self.focusSearch();

                }


                function assignmentCreateError(err) {
                    console.log('CREATE ERROR', err);
                        var err = err.response ? err.response.data || err.response : err;
                    var conflictError = err.error;
                    var message = err.message;



                    if (err.status == 403) {
                        message = 'You do not have permission to make this action.';
                    }

                    if (conflictError == 'AssignmentConflictError') {
                        var array = [{
                            title: `Add as '${details.title}' anyway`,
                            description: (contact.firstName || 'this person') + ' can still fulfill this assignment',
                            force: true,
                        }]

                        return self.$fluro.options(array, `Conflict!`, message)
                            .then(function(answer) {

                                details.force = answer.force;
                                self.$fluro.api.post(`/assignments/roster/${rosterID}`, details)
                                    .then(assignmentCreated)
                                    .catch(assignmentCreateError);


                            })
                    }

                    self.$fluro.error(err);
                    reject(err);
                }


            })
        },
        sendAssignment(assignment) {
            var self = this;
            self.$set(assignment, 'sending', true);

            return self.$fluro.api.put(`/content/assignment/${assignment._id}`, {
                    confirmationStatus: 'unknown',
                })
                .then(function(res) {
                    var result = res.data;
                    assignment.confirmationStatus = result.confirmationStatus
                    self.$set(assignment, 'sending', false);
                })
                .catch(function(err) {
                    self.$set(assignment, 'sending', false);
                    self.$fluro.error(err);
                })
        },
        removeAssignment(assignment) {

            var self = this;

            /////////////////////////////////////////////////////

            //If the assignment has been rejected then we want
            //to archive it and hide it from the list
            switch (assignment.confirmationStatus) {
                case 'denied':
                    //////console.log('Hide the assignment')
                    return self.archiveAssignment(assignment);
                    break;
                case 'proposed':
                    return self.$fluro.api.delete(`/content/assignment/${assignment._id}`)
                        .then(function(res) {
                            removeComplete(res.data);
                        })
                    break;
                case 'temporary':
                    return removeComplete(assignment);
                    break;
            }


            /////////////////////////////////////////////////////

            return self.$fluro.confirm('Confirm Deletion', `Are you sure you want to delete this assignment`, {
                    confirmColor: 'error',
                    confirmText: 'Confirm Delete',
                })
                .then(function(res) {

                    return self.$fluro.api.delete(`/content/assignment/${assignment._id}`)
                        .then(function(res) {
                            removeComplete(res.data);
                        })
                        .catch(function(err) {
                            self.$fluro.error(err);
                        })

                })
                .catch(function() {
                    // self.$fluro.error(err);
                })

            ///////////////////////////////////////////////

            function removeComplete(response) {

                //Find the assignment update it with an _id
                assignment._id = response._id
                _.assign(assignment, response);

                var index = self.slot.assignments.indexOf(assignment);
                self.slot.assignments.splice(index, 1);

                console.log('Removed!!!')
            }

        },
        archiveAssignment(assignment) {

            console.log('Archive assignment')
            return self.$fluro.api.put(`/content/assignment/${assignment._id}`, {
                    status: 'archived',
                })
                .then(function(res) {
                    assignment.status = 'archived';
                    var index = self.slot.assignments.indexOf(assignment);
                    self.slot.splice(index, 1);
                })
                .catch(function(err) {
                    self.$fluro.error(err);
                })

        },
        checkProposed(assignment) {

        },
        saveProposed(assignment) {

        },
        selectSuggestion(contact, options) {

            var self = this;

            if (!options) {
                options = {};
            }


            var details = {
                title: self.slot.title,
                contact: contact,
                confirmationStatus: 'proposed',
                force: options.force,
            }

            self.$set(contact, 'loading', true);

            return self.createAssignment(details).then(function() {
                    self.$set(contact, 'loading', false);
                })
                .catch(function(err) {
                    self.$set(contact, 'loading', false);
                });

        },

        focusSearch() {
            if (this.$refs.search) {
                this.$refs.search.focus();
            }
            this.activeTabIndex = 'rostered';
        },
        reloadSuggestions() {

            var self = this;
            console.log('reload suggestions')

            if (!self.model) {
                self.loadingSuggestions = false;
                self.suggestionData = null;
                console.log('no model')
                return;
            }

            self.loadingSuggestions = true;
            console.log('loading')

            self.$fluro.api.post(`/matrix/suggest`, {
                    title: self.slot.title,
                    event: self.event._id,
                    roster: self.roster._id,
                }, {
                    params: {
                        limit: 3,
                    },
                })
                .then(function(res) {


                    self.suggestionData = res.data;
                    self.loadingSuggestions = false;
                })
                .catch(function(err) {
                    self.suggestionData = null;
                    self.loadingSuggestions = false;
                })
        },
    },
    watch: {
        search(val) {
            this.searching = true;
            this.searchFor(val);
        },
        value(val) {
            this.model = val;
            this.searchResults = [];
            this.search = '';
            this.focusSearch();
            this.reloadSuggestions();
            console.log('value set')
        },
    },
    computed: {
        unknownAssignments() {
            return _.filter(this.assignments, { confirmationStatus: 'unknown' });
        },
        proposedAssignments() {
            return _.filter(this.assignments, { confirmationStatus: 'proposed' });
        },
        sendEnabled() {
            var self = this;
            return self.proposedAssignments.length;
        },
        nudgeEnabled() {
            var self = this;
            return self.unknownAssignments.length;
        },
        rosteredCount() {
            return this.assignments.length
        },
        unavailableCount() {
            var self = this;

            var conflicts = self.conflicts.length;
            var unavailable = self.unavailable.length;
            var unqualified = self.unqualified.length;

            return conflicts + unavailable + unqualified;

        },
        conflicts() {
            var self = this;

            if (!self.suggestionData) {
                return [];
            }

            return self.suggestionData.conflicts;
        },
        unavailable() {
            var self = this;

            if (!self.suggestionData) {
                return [];
            }

            return self.suggestionData.unavailable;
        },
        conflicts() {
            var self = this;

            if (!self.suggestionData) {
                return [];
            }

            return self.suggestionData.conflicts;
        },
        unqualified() {
            var self = this;

            if (!self.suggestionData) {
                return [];
            }

            return self.suggestionData.unqualified;
        },
        unqualifiedMap() {
            return _.reduce(this.unqualified, function(set, contact) {
                set[contact._id] = contact;
                return set;
            }, {})

        },
        suggestions() {
            var self = this;

            if (!self.suggestionData) {
                console.log('No suggestion data')
                return [];
            }

            // return self.suggestionData.suggested;
            console.log('Before', self.suggestionData.suggested)
            return self.suggestionData.suggested;




        },
        suggestedContacts() {
            var self = this;


            // var filtered = _.map(self.suggestionData.suggested, function(row) {

            //     return _.filter(row, function(contact) {
            //         return !self.rosteredMap[contact._id];
            //     });

            // });

            // console.log('After', filtered)
            // return filtered;




            return _.chain(self.suggestions)
                .reduce(function(set, row) {
                    var candidate = self.getBestCandidate(row);

                    if (candidate) {
                        set.push(candidate);
                    }

                    return set;
                }, [])
                .value();
        },
        event() {
            return _.get(this.roster,'event');
        },
        slot() {
            return _.get(this.model,'slot')
        },
        rostered() {
            return _.chain(this.assignments)
                .map('contact')
                .flatten()
                .value()
        },
        rosteredMap() {
            return _.reduce(this.rostered, function(set, contact) {

                set[contact._id] = contact;
                return set;
            }, {})

        },
        assignments() {
            return this.slot ? this.slot.assignments || [] : []
        },
        roster() {
            return _.get(this.model,'roster')
        }
    },
}
</script>
<style lang="scss">
.multi-planner-sidebar {
    
    .close {
        margin:0;
    }


    label {
        display: block;
        font-weight: 500;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        ;
        margin-bottom: 5px;
        font-size: 0.8em;
    }
}
</style>