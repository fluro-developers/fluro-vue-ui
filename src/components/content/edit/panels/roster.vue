<template>
  <flex-column>
    <template v-if="loading">
      <fluro-page-preloader contain />
    </template>
    <tabset v-else :justified="true" :vertical="true">
      <tab heading="Roster">
        <flex-row>
          <flex-column-body style="background: #fafafa;">
            <v-container>
              <constrain>
                <fluro-panel
                  :key="slot.title"
                  v-for="slot in model.slots"
                  @click.native="select(slot)"
                >
                  <fluro-panel-title>
                    <v-layout align-center>
                      <v-flex>
                        <strong>{{slot.title}}</strong>
                        <span class="text-muted">{{getSummary(slot)}}</span>
                      </v-flex>
                      <v-flex shrink>
                        <v-btn class="ma-0" small icon>
                          <fluro-icon icon="pencil" />
                        </v-btn>
                        <v-btn
                          v-if="!slot.assignments || !slot.assignments.length"
                          @click.prevent.stop="trash(slot)"
                          class="ma-0 ml-1"
                          small
                          icon
                        >
                          <fluro-icon icon="trash-alt" />
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </fluro-panel-title>
                  <fluro-panel-body>
                    <div class="assignments">
                      <div
                        class="assignment-item"
                        :class="assignment.confirmationStatus"
                        v-for="assignment in slot.assignments"
                      >
                        <v-layout align-center>
                          <v-flex shrink style="padding-right:5px;">
                            <fluro-avatar :id="assignment.contact" type="contact" />
                          </v-flex>
                          <v-flex>{{assignment.contact && assignment.contact.title ? assignment.contact.title : assignment.contactName}}</v-flex>
                        </v-layout>
                      </div>
                    </div>
                  </fluro-panel-body>
                </fluro-panel>
                <div
                  class="pseudo-slot"
                  @click="addSlot(slot)"
                  v-for="slot in possibleSlots"
                >Add {{slot.title}}</div>

                <v-btn block color="primary" @click="createSlot()">Add a new position</v-btn>
              </constrain>
              <!-- <pre>{{selected}}</pre> -->
              <!-- <pre>{{definition}}</pre> -->
              <!-- <roster-main v-model="model" :definition="definition"></roster-main> -->
              <!-- <default-roster-manager :config="config" v-model="model.defaultRosters" :rosterOptions="rosterDefinitions.definitions" /> -->
            </v-container>
          </flex-column-body>
          <flex-column class="sidebar" v-if="selected">
            <roster-sidebar v-model="selected" />
          </flex-column>
        </flex-row>
      </tab>
      <!-- <tab heading="X Scheduled Reminders">
                <flex-column-body style="background: #fafafa;">
                    <v-container>
                        <constrain md>
                            <reminder-event-manager :config="config" v-model="model.reminders" :allAssignmentOptions="model.slots" />
                        </constrain>
                    </v-container>
                </flex-column-body>
      </tab>-->
      <tab
        :heading="`${definition.title} Information`"
        v-if="definition && definition.fields && definition.fields.length"
      >
        <flex-column-body style="background: #fafafa;">
          <v-container>
            <constrain sm>
              <fluro-content-form
                :options="options"
                v-model="model.data"
                :fields="definition.fields"
              />
            </constrain>
          </v-container>
        </flex-column-body>
      </tab>
    </tabset>
  </flex-column>
</template>
<script>
/////////////////////////////////
// import RosterMain from 'src/components/content/edit/components/RosterMain.vue';
import ReminderEventManager from "src/components/content/edit/components/ReminderEventManager.vue";
import FluroContentEditMixin from "src/components/content/edit/FluroContentEditMixin.js";

import RosterSidebar from "src/components/content/edit/components/RosterSidebar.vue";

/////////////////////////////////

import Vue from "vue";
import _ from "lodash";

/////////////////////////////////

export default {
  mixins: [FluroContentEditMixin],
  components: { ReminderEventManager, RosterSidebar },
  methods: {
    createSlot() {
      var self = this;

      var fields = [
        {
          title: "Position Title",
          key: "title",
          type: "string",
          minimum: 1,
          maximum: 1,
          params: {
            autofocus: true
          }
        },

        {
          title: "Minimum Required",
          description: "How many people do we need to fill this position?",
          key: "minimum",
          type: "integer",
          minimum: 0,
          maximum: 1,
          defaultValues: ["0"],
          params: {
            minValue: 0
          }
        },

        {
          title: "Maximum Required",
          description:
            "What is the maximum amount of people that can fill this position?",
          key: "maximum",
          type: "integer",
          minimum: 0,
          maximum: 1,
          defaultValues: ["0"],
          params: {
            minValue: 0
          }
        }
      ];

      self.$fluro.prompt(fields, "Add Position").then(function(res) {
        console.log("New Position");

        var cleanedTitle = _.camelCase(res.title);

        if (!self.model.slots) {
          self.$set(self.model, "slots", []);
        }

        var existing = _.some(self.model.slots, function(slot) {
          return _.camelCase(slot.title) == cleanedTitle;
        });

        if (existing) {
          return;
        }

        self.$set(res, "assignments", []);

        self.model.slots.push(res);
        self.select(res);
      });
    },
    trash(slot) {
      var self = this;
      var index = self.model.slots.indexOf(slot);
      if (index == -1 || (slot.assignments && slot.assignments.length)) {
        return;
      }

      self.model.slots.splice(index, 1);
      self.selected = null;
    },
    getSummary(slot) {
      var minimum = parseInt(slot.minimum);
      var maximum = parseInt(slot.maximum);
      var current = (slot.assignments || []).length;

      if (minimum && current < minimum) {
        return `${minimum - current} required`;
      }

      if (maximum && current > maximum) {
        return `${current - maximum} too many!`;
      }

      return;
    },
    addSlot(slot) {
      var self = this;
      console.log("ADD SLOT", slot);

      self.model.slots.push(slot);

      self.selected = {
        roster: self.model,
        slot
      };
    },
    select(slot) {
      var self = this;

      console.log("SELECT SLOT", slot);
      self.selected = {
        roster: self.model,
        slot
      };
    },
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
      });

      //////////////////////////////////////

      //If there is no matching slot
      if (!matchingSlot) {
        return;
      }

      self.$set(assignment, "sending", true);

      if (!matchingSlot.assignments) {
        self.$set(matchingSlot, "assignments", []);
      }

      matchingSlot.assignments.push(assignment);

      //////////////////////////////////////

      //If there is no assignments on this slot
      return new Promise(function(resolve, reject) {
        //Create the assignment
        return self
          .createAssignment(roster, matchingSlot.assignments, assignment, true)
          .then(function(savedAssignment) {
            _.assign(assignment, savedAssignment);
            self.$set(assignment, "sending", false);
            self.$set(savedAssignment, "sending", false);

            console.log("CREATED AND UPDATED ASSIGNMENT", savedAssignment);

            resolve(savedAssignment);
          })
          .catch(function(err) {
            var index = matchingSlot.assignments.indexOf(assignment);
            matchingSlot.assignments.splice(index, 1);
            resolve(null);
          });
      });
    },

    createAssignment(rosterID, assignments, details, nopush) {
      var self = this;

      rosterID = self.model._id;

      return new Promise(function(resolve, reject) {
        var contact = details.contact;

        self.$fluro.api
          .post(`/assignments/roster/${rosterID}`, details)
          .then(assignmentCreated)
          .catch(assignmentCreateError);

        //////////////////////////////////////////////////

        function assignmentCreated(res) {
          var matchingAssignment = res.data;
          matchingAssignment.contactName =
            matchingAssignment.contact.title ||
            matchingAssignment.contact.firstName +
              " " +
              matchingAssignment.contact.lastName;

          if (!nopush) {
            var alreadyAssigned = _.some(assignments, {
              _id: matchingAssignment._id
            });

            if (!alreadyAssigned) {
              assignments.push(matchingAssignment);
            }
          }

          resolve(matchingAssignment);
        }

        //////////////////////////////////////////////////

        function assignmentCreateError(err) {
          console.log("CREATE ERROR", err);
          var err = err.response ? err.response.data || err.response : err;
          var conflictError = err.error;
          var message = err.message;

          if (err.status == 403) {
            message = "You do not have permission to make this action.";
          }

          if (conflictError == "AssignmentConflictError") {
            var array = [
              {
                title: `Add ${contact.firstName} as '${details.title}' anyway`,
                description:
                  (contact.firstName || "this person") +
                  " can still fulfill this assignment",
                force: true
              }
            ];

            return self.$fluro
              .options(array, `Conflict!`, message)
              .then(function(answer) {
                details.force = answer.force;
                self.$fluro.api
                  .post(`/assignments/roster/${rosterID}`, details)
                  .then(assignmentCreated)
                  .catch(assignmentCreateError);
              })
              .catch(function(err) {
                reject(err);
              });
          }

          self.$fluro.error(err);
          reject(err);
        }
      });
    }
  },
  created() {
    var self = this;
  },
  asyncComputed: {
    // definition: {
    //  default: {},
    //  get() {
    //      var self = this;
    //      return new Promise(function(resolve, reject) {
    //                self.$fluro.content.get(self.model.definition, {})
    //                    .then(function(res) {
    //                        resolve(res);
    //                    })
    //                    .catch(function(err) {
    //                        reject(err);
    //                    })
    //            })
    //  },
    // }
  },
  computed: {
    existingSlotNames() {
      var self = this;
      return _.reduce(
        self.model.slots,
        function(set, slot) {
          var name = _.camelCase(slot.title);
          set[name] = true;
          return set;
        },
        {}
      );
    },
    definedSlots() {
      var self = this;

      return _.get(self.definition, "data.slots") || [];
    },
    possibleSlots() {
      var self = this;
      return _.filter(self.definedSlots, function(slot) {
        var slotKey = _.camelCase(slot.title);
        return !self.existingSlotNames[slotKey];
      });
    },
    showOutline() {
      return false;
    },
    fieldsOutput() {
      var self = this;
      var array = [];

      ///////////////////////////////////

      addField("event", {
        title: "Event",
        minimum: 1,
        maximum: 1,
        type: "reference",
        params: {
          restrictType: "event"
        }
      });

      function addField(key, details) {
        details.key = key;
        array.push(details);
      }

      return array;
    }
  },
  data() {
    return {
      selected: null
    };
  }
};
</script>
<style scoped lang="scss">
.hint {
  font-size: 10px;
  opacity: 0.5;
  color: inherit;
  display: block;
}

.assignments {
  .assignment-item {
    width: 30%;
    display: inline-block;
    margin: 4px;
  }
}

.assignment-item {
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  border-radius: 100px;
  margin-bottom: 2px;
  padding: 5px;
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
    background-color: rgba($primary, 0.1);
    color: darken($primary, 20%);
  }
}

.sidebar {
  border-left: 1px solid rgba(#000, 0.1);
  background: #fff;
  flex: none;
  max-width: 300px;
}

.pseudo-slot {
  cursor: pointer;
  text-align: center;
  border: 2px dashed rgba(#000, 0.2);
  padding: 15px 10px;
  border-radius: 5px;

  margin: 4px 0;
  font-weight: bold;
  opacity: 0.5;

  &:hover {
    opacity: 1;
  }
}
</style>
