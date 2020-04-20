<template>
    <flex-column>
        <template v-if="loading">
            <fluro-page-preloader contain />
        </template>
        <tabset v-else :justified="true" :vertical="true">
            <tab heading="Roster">
                <flex-column-body style="background: #fafafa;">

                        	<!-- <roster-main v-model="model" :definition="definition"></roster-main> -->
                            <!-- <default-roster-manager :config="config" v-model="model.defaultRosters" :rosterOptions="rosterDefinitions.definitions" /> -->
                </flex-column-body>
            </tab>
            <!-- <tab heading="X Scheduled Reminders">
                <flex-column-body style="background: #fafafa;">
                    <v-container>
                        <constrain md>
                            <reminder-event-manager :config="config" v-model="model.reminders" :allAssignmentOptions="model.slots" />
                        </constrain>
                    </v-container>
                </flex-column-body>
            </tab> -->
            <tab :heading="`${definition.title} Information`" v-if="definition && definition.fields && definition.fields.length">
                <flex-column-body style="background: #fafafa;">
                    <v-container>
                        <constrain sm>
                            <fluro-content-form :options="options" v-model="model.data" :fields="definition.fields" />
                        </constrain>
                    </v-container>
                </flex-column-body>
            </tab>
        </tabset>
    </flex-column>
</template>
<script>
/////////////////////////////////
import ReminderEventManager from 'src/components/content/edit/components/ReminderEventManager.vue';
import FluroContentEditMixin from 'src/components/content/edit/FluroContentEditMixin.js';

/////////////////////////////////

import Vue from 'vue';

/////////////////////////////////

export default {

    mixins: [FluroContentEditMixin],
    components: { ReminderEventManager, RosterMain },
    methods: {
        modelUpdated() {
            this.update(this.model);
        },
        injectAssignment(roster, assignment) {
            var self = this;

            var rosterID = self.model._id;

            //////////////////////////////////////////////////////////////

            //Get the slot name 
            var assignmentSlotName = String(assignment.title).toLowerCase();

            //Find the matching slot on this roster
            var matchingSlot = _.find(roster.slots, function(slot) {
                return slot.title.toLowerCase() == assignmentSlotName;
            })

            //////////////////////////////////////

            //If there is no matching slot
            if (!matchingSlot) {
                return;
            }


            self.$set(assignment, 'sending', true);
            matchingSlot.assignments.push(assignment);


            //////////////////////////////////////

            //If there is no assignments on this slot
            return new Promise(function(resolve, reject) {

                //Create the assignment
                return self.createAssignment(roster, matchingSlot.assignments, assignment, true)
                    .then(function(savedAssignment) {

                        _.assign(assignment, savedAssignment);
                        self.$set(assignment, 'sending', false);
                        self.$set(savedAssignment, 'sending', false);

                        console.log('CREATED AND UPDATED ASSIGNMENT', savedAssignment)


                        resolve(savedAssignment);
                    })
                    .catch(function(err) {
                        var index = matchingSlot.assignments.indexOf(assignment);
                        matchingSlot.assignments.splice(index, 1);
                        resolve(null);
                    })
            })
        },

        createAssignment(rosterID, assignments, details, nopush) {

            var self = this;

            rosterID = self.model._id;

            return new Promise(function(resolve, reject) {

                var contact = details.contact;

                self.$fluro.api.post(`/assignments/roster/${rosterID}`, details)
                    .then(assignmentCreated)
                    .catch(assignmentCreateError);

                //////////////////////////////////////////////////

                function assignmentCreated(res) {
                    var matchingAssignment = res.data;
                    matchingAssignment.contactName = (matchingAssignment.contact.title || matchingAssignment.contact.firstName + ' ' + matchingAssignment.contact.lastName);

                    if (!nopush) {
                        var alreadyAssigned = _.some(assignments, {
                            _id: matchingAssignment._id,
                        })

                        if (!alreadyAssigned) {
                            assignments.push(matchingAssignment);
                        }
                    }

                    resolve(matchingAssignment);
                }

                //////////////////////////////////////////////////


                function assignmentCreateError(err) {
                    var err = err.response.data;
                    var conflictError = err.error;
                    var message = err.message;

                    if (err.status == 403) {
                        message = 'You do not have permission to make this action.';
                    }

                    if (conflictError == 'AssignmentConflictError') {
                        var array = [{
                            title: `Add ${contact.firstName} as '${details.title}' anyway`,
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
                            .catch(function(err) {
                                reject(err);
                            })
                    }

                    self.$fluro.error(err);
                    reject(err);
                }


            })
        },
    },
    created() {
        var self = this;
    },
    asyncComputed: {
    	// definition: {
    	// 	default: {},
    	// 	get() {
    	// 		var self = this;
    	// 		return new Promise(function(resolve, reject) {
     //                self.$fluro.content.get(self.model.definition, {})
     //                    .then(function(res) {
     //                        resolve(res);
     //                    })
     //                    .catch(function(err) {
     //                        reject(err);
     //                    })
     //            })
    	// 	},
    	// }
    },
    computed: {
        showOutline() {
            return false;
        },
        fieldsOutput() {

            var self = this;
            var array = [];

            ///////////////////////////////////

            addField('event', {
                title: 'Event',
                minimum: 1,
                maximum: 1,
                type: 'reference',
                params: {
                    restrictType: 'event',
                },
            })

            function addField(key, details) {
                details.key = key;
                array.push(details)
            }

            return array;

        },
    },
    data() {
        return {

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
</style>