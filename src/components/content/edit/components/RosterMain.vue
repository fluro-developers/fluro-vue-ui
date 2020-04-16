<template>
    <flex-column v-if="definition">
        <flex-row>
            <flex-column>
                <flex-column-header v-if="proposals.length">
                    <template v-slot:right>
                        <v-btn class="ma-0" color="primary" @click="sendAssignments(proposals)" v-if="proposals.length">
                            Send {{proposals.length}} proposed
                            <fluro-icon library="fas" right icon="paper-plane" />
                        </v-btn>
                    </template>
                </flex-column-header>
                <flex-column-body>
                    <v-container>
                        <list-group>
                            <list-group-item v-for="(slot, slotIndex) in model.slots" :key="`${slot.title}`" class="pa-3">
                                <roster-slot-manager v-model="model.slots[slotIndex]" @selectcell="selectSlotCell(slot, slotIndex)" :selected="isSelectedSlot(model, slot.title)" :definition="definition" :roster="model" @click.native="selectSlotCell(slot, slotIndex)" />
                            </list-group-item>
                        </list-group>
                    </v-container>
                </flex-column-body>
                <!--                         <div class="fluro-multi-wrapper">
                            <div ref="scrollableArea" class="fluro-multi-scroll">
                                <span ref="top"></span>
                                <table class="fluro-multi-main no-select">
                                    <tbody>
                                        <template v-for="(slot, slotIndex) in model.slots">
                                            <tr :key="`${slot.title}`">
                                                <th class="left-header slot-title" :class="{dynamic:slot.dynamic}">
                                                    <div class="slot-attributes">
                                                        <fluro-icon v-tippy content="Opt out is disabled" icon="times-square" class="" v-if="slot.optOutBehaviour == 'disabled'" />
                                                        <fluro-icon v-tippy content="Autoconfirm" icon="check-square" class="brand-success" v-if="slot.confirmationBehaviour == 'confirm'" />
                                                        <fluro-icon v-tippy content="Requires Capabilities" icon="exclamation-square" class="brand-warning" v-if="slot.requireCapabilities && slot.requireCapabilities.length" />
                                                    </div>
                                                    {{slot.title}}
                                                </th>
                                                <roster-slot-cell @click.native="selectSlotCell(slot, slotIndex)" :position="slot" :definition="model" :roster="model" :selected="isSelectedSlot(model, slot.title)" class="divide-left" />
                                            </tr>
                                        </template>
                                    </tbody>
                                </table>
                            </div>
                        </div> -->
            </flex-column>
            <div class="sidebar">
                <roster-sidebar v-model="selected" />
            </div>
        </flex-row>
    </flex-column>
</template>
<script>
/////////////////////////////////////////

import RosterSlotManager from './RosterSlotManager.vue';
import RosterSidebar from './RosterSidebar.vue';
// import TeamSelectModal from '@/components/modal/modals/TeamSelectModal.vue';

import { FluroContentEdit } from 'fluro-vue-ui';
import draggable from 'vuedraggable';

import Vue from 'vue';
import MultiPlannerService from '../services/MultiPlannerService.js';


export default {
    props: {
        value: {
            type: Object,
            required: true,
        },
        definition: {
            type: Object,
        }
    },
    created() {
        this.processDefinitionSlots();
    },
    components: {
        RosterSidebar,
        FluroContentEdit,
        RosterSlotManager,
    },
    data() {
        return {
            model: this.value,
            defaultRosters: {},
            processing: false,
            dragOptions: {},
            selected: null,
            collapsed: {},
            loading: true,
        }
    },
    computed: {
        orderedRosterTypes() {
            var self = this;
            var ordered = _.values(self.defaultRosters)
            console.log('ORDERED', ordered);
            return ordered;
        },
        proposals() {
            var self = this;

            return _.chain(self.columns)
                .reduce(function(set, column) {

                    _.each(column.rosters, function(rosterType) {
                        if (rosterType.roster) {
                            set = set.concat(rosterType.roster.slots)
                        }
                    })

                    return set;
                }, [])

                .map(function(slot) {
                    return slot.assignments
                })
                .flatten()
                .compact()
                .filter(function(assignment) {
                    return assignment.confirmationStatus == 'proposed';
                })
                .value();
        },
        knownDefinitionSlots() {
            return _.get(this.definition, 'data.slots');
        }
    },
    watch: {
        knownDefinitionSlots() { return this.processDefinitionSlots() }
    },
    methods: {
        editRosterReminders(column, rosterTypeName) {

            console.log('CLICK', column)
            var self = this;
            var event = column.event;
            var rosters = column.rosters;

            ///////////////////////////////////////

            var slots = _.chain(rosters)
                .map('slots')
                .flatten()
                .compact()
                .uniq(function(slot) {
                    return slot.title;
                })
                .value();

            //////////////////////////////////////////////////

            var promise = self.$fluro.modal({
                component: EventReminderModal,
                options: {
                    event,
                    slots,
                }
            })
        },
        editEventReminders(column) {

            var self = this;
            var event = column.event;
            var rosters = column.rosters;

            ///////////////////////////////////////

            var slots = _.chain(rosters)
                .map('slots')
                .flatten()
                .compact()
                .uniq(function(slot) {
                    return slot.title;
                })
                .value();

            //////////////////////////////////////////////////

            var promise = self.$fluro.modal({
                component: EventReminderModal,
                options: {
                    event,
                    slots,
                }
            })



        },
        processDefinitionSlots() {
            var self = this;
            var slots = JSON.parse(JSON.stringify(self.model.slots));
            var mappedSlots = {}
            _.each(slots, function(o) {
                mappedSlots[o.title] = o;
            });
            var outputSlots = [];
            _.each(self.knownDefinitionSlots, function(def) {
                var title = def.title;
                if (mappedSlots[title]) {
                    mappedSlots[title].confirmationBehaviour = def.confirmationBehaviour;
                    mappedSlots[title].requireCapabilities = def.requireCapabilities;
                    mappedSlots[title].optOutBehaviour = def.optOutBehaviour;
                    outputSlots.push(mappedSlots[title]);
                }
            });
            self.model.slots = outputSlots;
        },
        mapDefaultRosters() {

            var self = this;


            var knownDefinitions = JSON.parse(JSON.stringify(self.knownDefinitions));

            // console.log('KNOWN DEFINITIONS', knownDefinitions)

            //Map all the definitions and slots that we know about
            self.defaultRosters = _.reduce(self.columns, function(set, column) {


                //It's a mapped definition with 'slots' as an array
                _.each(column.rosters, function(simpleDefinition, key) {

                    var existingEntry = set[key];
                    if (!existingEntry) {
                        set[key] = existingEntry = simpleDefinition;
                    }



                    ///////////////////////////////////////////////

                    //If this column actually has a roster instance
                    var rosterInstance = column.rosters[key].roster;

                    ///////////////////////////////////////////////
                    if (rosterInstance) {
                        //Add any additional slots that might be on the roster but not the definition
                        _.each(rosterInstance.slots, function(slot) {

                            //If they have an assignment
                            if (!slot.assignments || !slot.assignments.length) {
                                return;
                            }

                            var slotName = String(slot.title).toLowerCase();
                            var alreadyThere = _.some(existingEntry.slots, function(existingSlot) {
                                return slotName == String(existingSlot.title).toLowerCase();
                            });

                            //We Don't already know about this slot
                            if (!alreadyThere) {
                                slot.dynamic = true;
                                existingEntry.slots.push(slot);
                            }
                        })
                    }
                });

                return set;
            }, knownDefinitions)
        },
        createSlotMap(roster) {
            return _.reduce(roster.slots, function(set, slot) {
                slot.slotName = String(slot.title).toLowerCase();
                set[slot.slotName] = slot;
                return set;
            }, {})
        },
        nameSlots(slots) {

            return _.reduce(slots, function(set, slot, index) {

                console.log('MAP NAME SLOTS', slot);
                var slotName = String(slot.title).toLowerCase();
                slot.index = index;
                set[slotName] = slot;
                return set;

            }, {})
        },
        sendRoster(roster) {

            var self = this;

            if (!roster) {
                return;
            }

            //////////////////////////////////////

            self.$set(roster, 'sending', true);

            var assignments = _.chain(roster.slots)
                .map('assignments')
                .flatten()
                .filter({ confirmationStatus: 'proposed' })
                .value();

            if (!assignments.length) {
                self.$set(roster, 'sending', false);
                return;
            }

            //////////////////////////////////////

            //Map each proposed to a promise
            var promises = self.sendAssignments(assignments);

            //////////////////////////////////////

            Promise.all(promises)
                .then(function(res) {
                    self.$set(roster, 'sending', false);
                })
                .catch(function(err) {
                    self.$set(roster, 'sending', false);
                })


        },
        sendAssignments(assignments) {
            var self = this;
            return _.map(assignments, function(assignment) {
                return self.sendAssignment(assignment);
            });
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
        getProposed(roster) {

            if (!roster) {
                return;
            }

            return _.chain(roster.slots)
                .map('assignments')
                .flatten()
                .compact()
                .filter(function(assignment) {
                    return assignment.confirmationStatus == 'proposed';
                })
                .value()
                .length;
        },
        dragstart($event) {
            console.log($event);
        },
        dragend($event) {
            console.log($event);
        },
        dragover($event) {
            console.log($event);
        },
        dragenter($event) {
            console.log($event);
        },
        assignTeam(roster) {


            var self = this;

            return new Promise(function(resolve, reject) {


                //////////////////////////////

                var initialFilter = {
                    operator: 'and',
                    filters: [{
                            operator: 'and',
                            filters: [{
                                key: 'status',
                                comparator: '==',
                                value: 'active',
                            }]
                        },
                        {
                            operator: 'or',
                            filters: [{
                                    key: 'definition',
                                    comparator: 'in',
                                    values: ['serviceTeam'],
                                },
                                {
                                    key: 'definition',
                                    comparator: 'empty',
                                },
                            ]
                        },
                    ]
                }
                //////////////////////////////  


                self.$fluro.global.select('team', { allDefinitions: true, maximum: 1, minimum: 1, filter: initialFilter })
                    .then(function(teams) {

                        if (!teams || !teams.length) {
                            return reject();
                        }

                        /////////////////////////////////////////

                        self.$fluro.content.get(teams[0]._id)
                            .catch(reject)
                            .then(function(team) {
                                console.log('TEAM ROSTER', roster, team)

                                //////////////////////////////

                                var slotCreated;

                                var promise = self.$fluro.modal({
                                        component: TeamSelectModal,
                                        options: {
                                            roster,
                                            team,
                                        }
                                    })
                                    .then(function(assignments) {
                                        console.log('Add assignments', assignments);

                                        var promises = _.chain(assignments)
                                            .map(function(assignment) {

                                                //Get the slot name 
                                                var assignmentSlotName = String(assignment.title).toLowerCase();

                                                //Find the matching slot on this roster
                                                var matchingSlot = _.find(roster.slots, function(slot) {
                                                    return slot.title.toLowerCase() == assignmentSlotName;
                                                })

                                                //////////////////////////////////////

                                                //If there is no matching slot
                                                if (!matchingSlot) {

                                                    //Create a new slot
                                                    matchingSlot = {
                                                        title: assignment.title,
                                                        assignments: [],
                                                    }

                                                    //Add the slot in
                                                    roster.slots.push(matchingSlot);
                                                    slotCreated = true;
                                                    console.log('Add Slot to roster', roster.slots);
                                                }

                                                //////////////////////////////////////

                                                //If there is no assignments on this slot
                                                return new Promise(function(resolve, reject) {

                                                    //Create the assignment
                                                    return MultiPlannerService.injectAssignment(roster, assignment)
                                                        .then(function(savedAssignment) {
                                                            console.log('Created an assignment', savedAssignment)
                                                            resolve(savedAssignment);
                                                        })
                                                        .catch(function(err) {
                                                            console.log('ERROR', err);
                                                            resolve(null);
                                                        })
                                                })
                                            })
                                            .compact()
                                            .value();



                                        ///////////////////////////////////

                                        if (!promises.length) {
                                            return;
                                        }
                                        ///////////////////////////////////

                                        if (slotCreated) {
                                            self.mapDefaultRosters();
                                        }


                                        ///////////////////////////////////

                                        self.$set(roster, 'sending', true);

                                        Promise.all(promises)
                                            .then(function(res) {
                                                console.log('ALL COMPLETE', res);
                                                self.$set(roster, 'sending', false);
                                            })
                                            .catch(function(err) {
                                                console.log('ERROR', err);
                                                self.$set(roster, 'sending', false);
                                            })

                                    })
                                    .catch(reject);
                            })



                    })
                    .catch(reject)

            })

        },
        nudge(type, id) {
            var self = this;
            var id = self.$fluro.utils.getStringID(id);
            var promise = self.$fluro.api.post(`/assignments/nudge/${type}/${id}`);

            ///////////////////

            promise.then(function(res) {

                if (res.data.success.length) {
                    self.$fluro.notify(`${res.data.success.length} Notifications sent`)
                } else {
                    self.$fluro.notify(`No nudges were sent`)
                }
            })

            ///////////////////

            return promise;
        },
        nudgeRoster(roster) {
            var self = this;

            self.$set(roster, 'nudging', true);
            self.nudge('roster', roster)
                .then(function(res) {



                    self.$set(roster, 'nudging', false);

                })
                .catch(function(err) {
                    self.$set(roster, 'nudging', false);
                })
        },
        openModal(item) {
            var self = this;
            self.processing = true;

            function done() {
                self.processing = false;
            }

            var canEdit = self.$fluro.access.canEditItem(item);

            console.log('CANT EDIT', canEdit, item)
            if (canEdit) {
                self.$fluro.global.edit(item, true)
                    .then(done, done);
            } else {
                self.$fluro.global.view(item, true)
                    .then(done, done);
            }
        },
        deselect() {
            var self = this;
            self.selected = null;
        },
        isSelectedSlot(roster, slotName) {
            var self = this;

            if (!self.selected) {
                return;
            }

            return (self.selected.roster) == roster && (String(slotName).toLowerCase() == String(self.selected.slot.title).toLowerCase());

        },
        selectSlotCell(slot, slotIndex) {

            console.log('SELECT SLOT CELL')
            var self = this;
            var roster = self.model;

            //Find the slot
            var findSlot = _.find(roster.slots, function(cell) {
                return String(cell.title).toLowerCase() == String(slot.title).toLowerCase();
            })


            if (!findSlot) {
                findSlot = {
                    minimum: slot.minimum,
                    maximum: slot.maximum,
                    title: slot.title,
                    assignments: [],
                }

                //Let's add it
                roster.slots.splice(slotIndex, 0, findSlot);
                console.log('Upsert cell!', roster._id, roster.event, findSlot)
            }

            ////////////////////////////////////////

            self.$set(self, 'selected', {
                roster,
                slot: findSlot,
            });

        },
        editRosterDefinition(rosterType) {
            console.log('Edit', rosterType)

            var self = this;

            //Load the definition
            self.$fluro.content.get(rosterType._id)
                .then(function(definition) {

                    //Open the modal
                    var promise = self.$fluro.modal({
                            component: RosterSlotModal,
                            options: {
                                definition,
                            }
                        })
                        .then(function(updatedDefinition) {

                            updatedDefinition.slots = updatedDefinition.data.slots || [];
                            self.knownDefinitions[updatedDefinition.definitionName] = updatedDefinition;

                            self.mapDefaultRosters();
                            // self.$set(self.defaultRosters, definition.definitionName, updatedDefinition);
                            // var newSlots = _.map(res.slots, function(slot, index) {

                            //     var slotName = String(slot.title).toLowerCase();
                            //     var existingSlot = existing.slots[slotName];
                            //     if (!existingSlot) {
                            //         slot.slotName = slotName;
                            //         slot.index = index;
                            //         existingSlot = existing.slots[slotName] = slot;
                            //     }
                            // });

                            // //We need to map the slots to the columns
                            // _.each(self.columns, function(column) {
                            //     if(column.rosters[definition.definitionName]) {

                            //         self.$set(rosterType, 'slots', res.slots);
                            //         column.rosters[definition.definitionName].slots = newSlots;
                            //     }
                            // })

                            ///////////////////////////////////////////////////




                            // console.log('RESPONSE',  res, rosterType);
                        })
                        .catch(function(err) {

                        });

                })



            // this.$fluro.global.edit(rosterType, true);
            // this.$actions.open([rosterType])
        },
    },
}
</script>
<style lang="scss">
$light-grey: #eaebee;
$dark-grey: #ced0d7;
$border: darken($light-grey, 10%);

$min-width:190px;
$max-width:220px;

.plan-editor {
    border-left: 2px solid;
    width: 50vw;
    min-width: 400px;
    display: flex;
    position: relative;
    background: $light-grey;
    box-shadow: 0 0 50px rgba(#000, 0.5);
    z-index: 100;
}

.roster-title {
    font-size: 10px;
    vertical-align: middle;
    text-align: right;
    background: $dark-grey;
    line-height: 22px;
    padding: 4px 10px 4px 8px !important;
}

.slot-cell {
    // padding: 15px;
    width: 200px;
    background: #fafafa;
    vertical-align: top;
    border-bottom: 1px solid $border !important;
    border-right: 1px solid $border;

    .slot-cell-inner {
        position: relative;
        min-height: 26px;
    }

    &.selected {
        box-shadow: 0 0 20px $primary;
        border-color: 2px solid $primary !important;
        outline: 1px solid $primary;
        z-index: 100;
        // transform: scale(1.1);
        // transition: all 0.3s;
    }

    .slot-placeholder {
        // position: absolute;
        // z-index: 0;
        // pointer-events: none;

    }

    .slot-assignments {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        z-index: 1;
        // border: 1px solid #ff0066;
        // min-height:
    }
}

// .cell {
//     // padding: 15px;
//     background: #fff;
// }

.sidebar {
    width: 320px;
    flex: none;
    z-index: 100;
    background: #fff;
    border-left: 1px solid $border;
    display: flex;
    // box-shadow: 0 0 50px rgba(#000, 0.5);
}


.plan-cell {
    // padding: 15px;
    // background: #fafafa;
    vertical-align: top;
    border-right: 1px solid $border;
    position: relative;


    .plan-item {
        background: #fff;
        display: block;
        border-bottom: 1px solid $border !important;
        padding: 5px 10px;
        font-size: 12px;

        text-overflow: ellipsis;
        white-space: nowrap;
        ;

        &:hover {
            background: #fafafa;
        }
    }
}

.add-cell {
    // padding: 15px;
    vertical-align: middle;
    text-align: center;
    border-bottom: 1px solid $border !important;
    border-right: 1px solid $border;
    // border-left: 1px solid $border;

    p {
        font-size: 0.8em;
        display: block;
        white-space: normal;
        opacity: 0.5;
        padding: 5px;
        width: 100%;
        margin: 0;
    }
}

// .assignment {
//     border-top: 1px solid $border;

//     &:first-child {
//         border-top: none;
//     }
// }
// 
.edit-cell,
.mini-buttons {
    text-align: center;
    padding: 4px;
}

.mini-btn {
    display: inline-block;
    border: 1px solid $border;
    padding: 2px 5px;
    font-size: 11px;
    background: #fff;
    border-radius: 3px;
    color: inherit;

    &[block] {
        display: block;
        text-align: center;
        margin: 1px;
    }
}


.event-details {
    font-size: 12px;
    padding: 10px;
    text-align: center;
    background: #fff;
    border-left: 1px solid $border !important;

    &:first-child {
        border-left: none;
    }

    .small {
        font-size: 0.8em;
    }
}

.roster-default-link {

    background: $light-grey;
    font-size: 9px;
    font-weight: 500;
    vertical-align: top;
    text-align: right;
    letter-spacing: 0.05em;
    border-bottom: 1px solid $border !important;

    span {
        opacity: 0;
    }

    &:hover span {
        opacity: 0.5;
    }
}

.date-header {
    padding: 0 10px;
    text-align: center;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-size: 10px;

    .divide-left {
        border-bottom: 1px solid $border;
        background: #fff;
        height: 30px;
        line-height: 30px;
    }

    // @extend .divide-right;

}

.time-header {
    padding: 0 10px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-size: 11px;
    position: relative;
    min-width: $min-width;
    width: $max-width;
    // max-width:220px;
    white-space: nowrap;
    background: #fff;
    // border-top: 1px solid $border;
    border-left: 1px solid $border;

    &:first-child {
        border-left: none;
    }

    .realm-bar {
        display: block;
        position: absolute;
        top: auto;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 3px;
    }
}
</style>