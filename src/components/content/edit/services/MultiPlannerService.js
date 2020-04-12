import Vue from 'vue';

export default new Vue({
    methods: {
        injectAssignment(roster, assignment) {
            var self = this;

            var rosterID = self.$fluro.utils.getStringID(roster);

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

            //Ensure it's an ID
            rosterID = self.$fluro.utils.getStringID(rosterID);

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
    }
});