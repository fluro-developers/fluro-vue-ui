import { bo as _, bm as __vue_normalize__, bn as __vue_create_injector__ } from './index-e1f26c03.js';
import 'vue';
import 'vuedraggable';
import 'vue-color';
import 'signature_pad';
import 'fluro';
import 'vuex-map-fields';
import 'async';
import 'tippy.js';
import 'tiptap';
import 'tiptap-commands';
import 'tiptap-extensions';
import moment from 'moment';
import { F as FluroContentEditMixin } from './FluroContentEditMixin-cd61f6ed.js';
import './FluroExclusiveSelector-61598078.js';
import { R as ReminderEventManager } from './ReminderEventManager-f53599b7.js';

//
var script = {
  props: {
    assignmentSlot: {
      type: Object
    },
    event: {
      type: Object
    },
    value: {
      type: Object
    }
  },

  data() {
    return {
      model: this.value
    };
  },

  watch: {
    value(val) {
      this.model = val;
    }

  },
  methods: {
    timeDifference(date1, date2) {
      var measure = moment(date1).from(date2, true);

      if (date1 < date2) {
        return measure + ' before this event';
      } else {
        return measure + ' after this event';
      }
    }

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
      return `<strong>${_.values(reasonsMap.descriptions).join(', ')}</strong> (${_.values(reasonsMap.positions).join(', ')})`;
    },

    assignmentsExplanation() {
      var self = this;

      if (!self.assignments || !self.assignments.length) {
        return;
      }

      var reasonsMap = self.declinedReasons;
      return `<strong>${_.values(reasonsMap.descriptions).join(', ')}</strong> (${_.values(reasonsMap.positions).join(', ')})`;
    },

    declinedReasons() {
      var self = this;
      return _.reduce(self.assignments, function (set, assignment) {
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
        positions: {}
      });
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
      return `<strong>'${assignmentName}'</strong> at <strong>${eventTime} '${eventName}'</strong> ending <strong>${difference} before</strong> this event`; // return `<strong>${eventName}</strong><br/>ends <strong>${difference} before</strong> this event`;
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
      return `<strong>'${assignmentName}'</strong> at <strong>${eventTime} '${eventName}'</strong> starts <strong>${difference} after</strong> this event`; // return `<strong>${eventName}</strong><br/>starts <strong>${difference} after</strong> this event`;
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
      var self = this; ////////////////////////////////////

      if (self.conflicts && self.conflicts.length) {
        if (self.conflicts.length > 3) {
          return `Already rostered to ${self.conflicts.length} other positions`;
        } else {
          var names = _.map(self.conflicts, 'title').join(', ');

          return `Already rostered as ${names}`;
        }
      } ////////////////////////////////////


      if (self.lacks && self.lacks.length) {
        return `Lacks ${self.lacks}`;
      }

      var periods = self.periods;

      if (periods && periods.length) {
        return _.map(periods, function (period) {
          console.log('PERIOD', period);
          return `${period.description || 'Unavailable.'} ${self.$fluro.date.readableEventDate(period)}`;
        }).join(', ');
      }

      var declinedAssignments = self.assignments;

      if (declinedAssignments && declinedAssignments.length) {
        var reasonsMap = self.declinedReasons;
        return `${_.values(reasonsMap.descriptions).join(', ')} (${_.values(reasonsMap.positions).join(', ')})`;
      }

      if (!self.model.closest) {
        return `Hasn't served as '${self.assignmentSlot.title}' before`;
      }

      return `Assigned ${self.timeDifference(self.model.closest.endDate, self.event.startDate)}`; // {{contact.closest.endDate | timedifference:service.selected.event.startDate}}`;
    }

  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"suggestion-list-item"},[_c('v-menu',{attrs:{"left":"","offset-x":"","open-on-hover":true},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var on = ref.on;
return [_c('v-layout',_vm._g({attrs:{"align-center":""}},on),[_c('v-flex',{staticClass:"face",attrs:{"shrink":""}},[_c('fluro-realm-bar',{attrs:{"realm":_vm.model.realms}}),_vm._v(" "),(_vm.isLoading)?_c('v-progress-circular',{attrs:{"indeterminate":""}}):_c('fluro-avatar',{attrs:{"md":"","id":_vm.model}})],1),_vm._v(" "),_c('v-flex',[_c('div',[_c('strong',[_vm._v(_vm._s(_vm.model.title))]),_vm._v(" "),_c('div',{staticClass:"summary"},[_vm._v(_vm._s(_vm.summary))])])]),_vm._v(" "),_c('v-flex',{attrs:{"shrink":""}},[_c('div',{staticClass:"btn-group"},[_c('span',{staticClass:"btn",attrs:{"xs":""},on:{"click":function($event){$event.stopPropagation();$event.preventDefault();return _vm.$actions.open([_vm.model])}}},[_c('fluro-icon',{attrs:{"icon":"ellipsis-h"}})],1),_vm._v(" "),_c('span',{staticClass:"btn",attrs:{"xs":""}},[_c('fluro-icon',{attrs:{"icon":"plus"}})],1)])])],1)]}}])},[_vm._v(" "),_c('div',{staticClass:"suggestion-roster-summary"},[_c('h5',[_vm._v(_vm._s(_vm.model.title))]),_vm._v(" "),(_vm.assignmentsExplanation)?_c('div',{staticClass:"suggestion-roster-summary-group"},[_c('h6',[_c('fluro-icon',{staticClass:"icon",attrs:{"library":"fas","type":"assignment"}}),_vm._v("Already Declined")],1),_vm._v(" "),_c('div',{domProps:{"innerHTML":_vm._s(_vm.assignmentsExplanation)}})]):_vm._e(),_vm._v(" "),(_vm.teams)?_c('div',{staticClass:"suggestion-roster-summary-group"},[_c('h6',[_c('fluro-icon',{staticClass:"icon",attrs:{"library":"fas","type":"team"}}),_vm._v(" Is '"+_vm._s(_vm.assignmentSlot.title)+"' position in")],1),_vm._v(" "),_c('div',{domProps:{"innerHTML":_vm._s(_vm.teams)}})]):_vm._e(),_vm._v(" "),(_vm.capabilities)?_c('div',{staticClass:"suggestion-roster-summary-group"},[_c('h6',[_c('fluro-icon',{staticClass:"icon",attrs:{"library":"fas","type":"capability"}}),_vm._v("Capabilities")],1),_vm._v(" "),_c('div',{domProps:{"innerHTML":_vm._s(_vm.capabilities)}})]):_vm._e(),_vm._v(" "),(_vm.conflicts.length)?_c('div',{staticClass:"suggestion-roster-summary-group"},[_c('h6',[_c('fluro-icon',{staticClass:"icon",attrs:{"library":"fas","icon":"exclamation-circle"}}),_vm._v(" Conflicts")],1),_vm._v(" "),_vm._l((_vm.conflicts),function(assignment){return _c('div',[_c('strong',[_vm._v(_vm._s(assignment.title))]),_vm._v(" at "),_c('strong',[_vm._v(_vm._s(_vm._f("formatDate")(assignment.event.startDate,'h:mma'))+" - '"+_vm._s(assignment.event.title)+"'")])])})],2):_vm._e(),_vm._v(" "),(_vm.prior)?_c('div',{staticClass:"suggestion-roster-summary-group"},[_c('h6',[_c('fluro-icon',{staticClass:"icon",attrs:{"library":"fas","type":"angle-left"}}),_vm._v(" Prior Assignment")],1),_vm._v(" "),_c('div',{domProps:{"innerHTML":_vm._s(_vm.prior)}})]):_vm._e(),_vm._v(" "),(_vm.next)?_c('div',{staticClass:"suggestion-roster-summary-group"},[_c('h6',[_c('fluro-icon',{staticClass:"icon",attrs:{"library":"fas","type":"angle-right"}}),_vm._v(" Next Assignment")],1),_vm._v(" "),_c('div',{domProps:{"innerHTML":_vm._s(_vm.next)}})]):_vm._e(),_vm._v(" "),(_vm.lacks.length)?_c('div',{staticClass:"suggestion-roster-summary-group"},[_c('h6',[_c('fluro-icon',{staticClass:"icon",attrs:{"library":"fas","type":"frown"}}),_vm._v(" Lacks required capability")],1),_vm._v(" "),_c('div',[_c('Strong',[_vm._v(_vm._s(_vm.lacks))])],1)]):_vm._e(),_vm._v(" "),(_vm.periods.length)?_c('div',{staticClass:"suggestion-roster-summary-group"},[_c('h6',[_c('fluro-icon',{staticClass:"icon",attrs:{"library":"fas","type":"times-circle"}}),_vm._v(" Unavailable")],1),_vm._v(" "),_vm._l((_vm.periods),function(period){return _c('div',[_vm._v("\n                    "+_vm._s(period.description)+" "),_c('strong',[_vm._v(_vm._s(_vm._f("readableEventDate")(period)))])])})],2):_vm._e()])])],1)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-2e8ea829_0", { source: ".border-top{border-top:1px solid rgba(0,0,0,.05)}.border-right{border-right:1px solid rgba(0,0,0,.05)}.border-bottom{border-bottom:1px solid rgba(0,0,0,.05)}.border-left{border-left:1px solid rgba(0,0,0,.05)}.suggestion-list-item{position:relative;padding:7px 10px;border-bottom:1px solid rgba(0,0,0,.1);line-height:1.4;cursor:pointer}.suggestion-list-item:last-child{border-bottom:none}.suggestion-list-item:hover{background:rgba(0,0,0,.05)}.suggestion-list-item .face{flex:none;padding-right:10px}.suggestion-list-item .summary{font-size:.8em;opacity:.5}.suggestion-roster-summary{background:#111;color:#ccc;padding:10px 5px;letter-spacing:-.03em;font-size:12px;width:250px;overflow:hidden}.suggestion-roster-summary h4,.suggestion-roster-summary h5,.suggestion-roster-summary h6,.suggestion-roster-summary strong{color:#fff}.suggestion-roster-summary .suggestion-roster-summary-group{padding-top:10px;margin-top:5px;border-top:1px solid rgba(255,255,255,.1);line-height:1.4}.suggestion-roster-summary .suggestion-roster-summary-group .icon{font-size:9px;line-height:inherit;margin-right:5px;display:none}.suggestion-roster-summary .suggestion-roster-summary-group h6{text-transform:uppercase;font-size:10px;font-weight:600;letter-spacing:.03em;margin-bottom:5px}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    __vue_create_injector__,
    undefined,
    undefined
  );

//
var script$1 = {
  props: {
    value: {
      type: Object
    }
  },

  data() {
    return {
      model: this.value
    };
  },

  methods: {
    remove() {
      console.log('REMOVE');
      this.$emit('unassign', this.model);
    },

    send() {
      console.log('SEND');
      this.$emit('send', this.model);
    }

  },
  watch: {
    value(val) {
      this.model = val;
    }

  },
  computed: {
    contactName() {
      return this.model.contact && this.model.contact.title ? this.model.contact.title : this.model.contactName;
    },

    sendable() {
      return this.model.confirmationStatus == 'proposed';
    },

    isLoading() {
      var self = this;
      return self.model.sending;
    },

    summary() {
      switch (this.confirmationStatus) {
        case 'denied':
          return this.model.description && this.model.description.length ? this.model.description : `Unavailable`;

        case 'confirmed':
          return 'Confirmed.';

        case 'unknown':
          return 'Notified. Awaiting response.';
      }
    },

    contact() {
      return this.model.contact;
    },

    confirmationStatus() {
      return this.model.confirmationStatus;
    }

  }
};

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"assignment-list-item",class:_vm.confirmationStatus},[_c('v-layout',{attrs:{"align-center":""}},[_c('v-flex',{staticClass:"face",attrs:{"shrink":""}},[(_vm.isLoading)?_c('v-progress-circular',{attrs:{"indeterminate":""}}):_c('fluro-avatar',{attrs:{"md":"","id":_vm.contact._id}})],1),_vm._v(" "),_c('v-flex',[_c('strong',[_vm._v(_vm._s(_vm.contactName))]),_vm._v(" "),_c('div',{staticClass:"summary"},[_vm._v(_vm._s(_vm.summary))])]),_vm._v(" "),_c('v-flex',{attrs:{"shrink":""}},[(!_vm.model.sending)?_c('div',{staticClass:"btn-group"},[(_vm.sendable)?_c('span',{staticClass:"btn",attrs:{"xs":""},on:{"click":function($event){$event.stopPropagation();$event.preventDefault();return _vm.send()}}},[_c('fluro-icon',{attrs:{"icon":"paper-plane"}})],1):_c('span',{staticClass:"btn",attrs:{"xs":""},on:{"click":function($event){$event.stopPropagation();$event.preventDefault();return _vm.$actions.open([_vm.model])}}},[_c('fluro-icon',{attrs:{"icon":"ellipsis-h"}})],1),_vm._v(" "),_c('span',{staticClass:"btn",attrs:{"xs":""},on:{"click":function($event){$event.stopPropagation();$event.preventDefault();return _vm.remove()}}},[_c('fluro-icon',{attrs:{"icon":"times"}})],1)]):_vm._e()])],1)],1)};
var __vue_staticRenderFns__$1 = [];

  /* style */
  const __vue_inject_styles__$1 = function (inject) {
    if (!inject) return
    inject("data-v-50e4b2c5_0", { source: ".border-top{border-top:1px solid rgba(0,0,0,.05)}.border-right{border-right:1px solid rgba(0,0,0,.05)}.border-bottom{border-bottom:1px solid rgba(0,0,0,.05)}.border-left{border-left:1px solid rgba(0,0,0,.05)}.assignment-list-item{position:relative;padding:7px 10px;border:1px solid rgba(0,0,0,.1);border-bottom:none;line-height:1.4}.assignment-list-item:first-child{border-radius:3px 3px 0 0}.assignment-list-item:last-child{border:1px solid rgba(0,0,0,.1);border-radius:0 0 3px 3px}.assignment-list-item .face{flex:none;padding-right:10px}.assignment-list-item .summary{font-size:.8em;opacity:.5}.assignment-list-item.denied{color:#be264a;border-color:rgba(190,38,74,.3);background:#fbedf0}.assignment-list-item.confirmed{color:#36a93a;border-color:rgba(54,169,58,.3);background:#e7f7e7}.assignment-list-item.warning{background:rgba(226,152,92,.05);color:#da7d31;border-color:rgba(218,125,49,.3);font-style:italic}.assignment-list-item.proposed{background:#eafaf7;color:#319a89;border-color:rgba(49,154,137,.3)}.assignment-list-item.unknown{color:rgba(0,0,0,.7);background:#fff}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$1 = __vue_normalize__(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    __vue_create_injector__,
    undefined,
    undefined
  );

//
var script$2 = {
  props: {
    value: {
      type: Object
    }
  },
  components: {
    RosterSlotSuggestionListItem: __vue_component__,
    RosterSlotAssignmentListItem: __vue_component__$1
  },

  data() {
    return {
      activeTabIndex: 0,
      search: '',
      searchFocussed: false,
      searching: false,
      searchResults: [],
      loadingSuggestions: false,
      model: this.value,
      suggestionData: null,
      nudging: false,
      sending: false
    };
  },

  mounted() {
    this.focusSearch();
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
      return _.reduce(self.relevantRealmIDs, function (set, realmID) {
        set[realmID] = realmID;
        return set;
      }, {});
    },

    getBestCandidate(row) {
      var self = this;
      var filtered = self.filterPossible(row); //////////////////////////////////////////
      //Order based on whether the realm is a match and the random ordering from the backend

      filtered = _.orderBy(filtered, function (contact, index) {
        var matchesRealm = _.some(contact.realms, function (realmID) {
          if (realmID._id) {
            realmID = realmID._id;
          }

          return self.eventRealmMap[realmID];
        });

        var realmWeight = matchesRealm ? 0 : 1; //////////////////////////////////////

        var orderIndex = parseInt(`${realmWeight}${index}`);
        console.log('ORDER INDEX IS', orderIndex);
        return orderIndex;
      }); //////////////////////////////////////////

      return filtered[0];
    },

    filterPossible(contacts) {
      var self = this;
      return _.chain(contacts).filter(function (contact) {
        var alreadyRostered = self.rosteredMap[contact._id];
        var unqualified = self.unqualifiedMap[contact._id];
        return !alreadyRostered && !unqualified;
      }).value();
    },

    searchFor: _.debounce(function (string) {
      var self = this;

      if (!string || !string.length) {
        self.searchResults = [];
        self.searching = false;
        return;
      }

      self.searching = true;
      self.$fluro.api.get(`/content/contact/search/${string}`, {
        params: {
          limit: 10
        }
      }).then(function (res) {
        self.searchResults = self.filterPossible(res.data);
        self.searching = false;
      }).catch(function (err) {
        self.searchResults = [];
        self.searching = false;
      });
    }, 300),

    nudge() {
      var self = this;
      self.nudging = true;
      var assignments = self.unknownAssignments; //////////////////////////////////////////

      if (!assignments.length) {
        self.nudging = false;
        return;
      } ////////////////////////////////////////


      return self.$fluro.api.post('/assignments/nudge', {
        assignments
      }).then(function (res) {
        self.nudging = false; ////console.log('Nudged everyone!', res);

        if (res.data.success.length) {
          self.$fluro.notify(`${res.data.success.length} notifications sent`);
        } else {
          self.$fluro.notify(`No notifications were sent`);
        }
      }).catch(function (err) {
        self.nudging = false;
        self.$fluro.error(err);
      });
    },

    send() {
      var self = this;
      self.sending = true; //////////////////////////////////////

      var assignments = self.proposedAssignments;

      if (!assignments.length) {
        self.sending = false;
        return;
      } //////////////////////////////////////
      //Map each proposed to a promise


      var promises = _.map(assignments, function (assignment) {
        return self.sendAssignment(assignment);
      }); //////////////////////////////////////


      Promise.all(promises).then(function (res) {
        self.sending = false;
      }).catch(function (err) {
        self.sending = false;
      });
    },

    editAssignment(assignment) {},

    createAssignment(details) {
      var self = this;
      return new Promise(function (resolve, reject) {
        var rosterID = self.$fluro.utils.getStringID(self.model.roster);
        var contact = details.contact; // var details = {
        //     title: self.slot.title,
        //     contact: contact,
        //     confirmationStatus: 'proposed',
        //     force: options.force,
        // }

        self.$fluro.api.post(`/assignments/roster/${rosterID}`, details).then(assignmentCreated).catch(assignmentCreateError);

        function assignmentCreated(res) {
          var matchingAssignment = res.data;
          matchingAssignment.contactName = matchingAssignment.contact.title || matchingAssignment.contact.firstName + ' ' + matchingAssignment.contact.lastName;

          var alreadyAssigned = _.some(self.slot.assignments, {
            _id: matchingAssignment._id
          });

          if (!alreadyAssigned) {
            if (!self.slot.assignments) {
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
              force: true
            }];
            return self.$fluro.options(array, `Conflict!`, message).then(function (answer) {
              details.force = answer.force;
              self.$fluro.api.post(`/assignments/roster/${rosterID}`, details).then(assignmentCreated).catch(assignmentCreateError);
            });
          }

          self.$fluro.error(err);
          reject(err);
        }
      });
    },

    sendAssignment(assignment) {
      var self = this;
      self.$set(assignment, 'sending', true);
      return self.$fluro.api.put(`/content/assignment/${assignment._id}`, {
        confirmationStatus: 'unknown'
      }).then(function (res) {
        var result = res.data;
        assignment.confirmationStatus = result.confirmationStatus;
        self.$set(assignment, 'sending', false);
      }).catch(function (err) {
        self.$set(assignment, 'sending', false);
        self.$fluro.error(err);
      });
    },

    removeAssignment(assignment) {
      var self = this; /////////////////////////////////////////////////////
      //If the assignment has been rejected then we want
      //to archive it and hide it from the list

      switch (assignment.confirmationStatus) {
        case 'denied':
          //////console.log('Hide the assignment')
          return self.archiveAssignment(assignment);

        case 'proposed':
          return self.$fluro.api.delete(`/content/assignment/${assignment._id}`).then(function (res) {
            removeComplete(res.data);
          });

        case 'temporary':
          return removeComplete(assignment);
      } /////////////////////////////////////////////////////


      return self.$fluro.confirm('Confirm Deletion', `Are you sure you want to delete this assignment`, {
        confirmColor: 'error',
        confirmText: 'Confirm Delete'
      }).then(function (res) {
        return self.$fluro.api.delete(`/content/assignment/${assignment._id}`).then(function (res) {
          removeComplete(res.data);
        }).catch(function (err) {
          self.$fluro.error(err);
        });
      }).catch(function () {// self.$fluro.error(err);
      }); ///////////////////////////////////////////////

      function removeComplete(response) {
        //Find the assignment update it with an _id
        assignment._id = response._id;

        _.assign(assignment, response);

        var index = self.slot.assignments.indexOf(assignment);
        self.slot.assignments.splice(index, 1);
        console.log('Removed!!!');
      }
    },

    archiveAssignment(assignment) {
      console.log('Archive assignment');
      return self.$fluro.api.put(`/content/assignment/${assignment._id}`, {
        status: 'archived'
      }).then(function (res) {
        assignment.status = 'archived';
        var index = self.slot.assignments.indexOf(assignment);
        self.slot.splice(index, 1);
      }).catch(function (err) {
        self.$fluro.error(err);
      });
    },

    checkProposed(assignment) {},

    saveProposed(assignment) {},

    selectSuggestion(contact, options) {
      var self = this;

      if (!options) {
        options = {};
      }

      var details = {
        title: self.slot.title,
        contact: contact,
        confirmationStatus: 'proposed',
        force: options.force
      };
      self.$set(contact, 'loading', true);
      return self.createAssignment(details).then(function () {
        self.$set(contact, 'loading', false);
      }).catch(function (err) {
        self.$set(contact, 'loading', false);
      });
    },

    focusSearch() {
      if (this.$refs.search) {
        this.$refs.search.focus();
      }

      this.activeTabIndex = 0;
    },

    reloadSuggestions() {
      var self = this;

      if (!self.model) {
        self.loadingSuggestions = false;
        self.suggestionData = null;
        return;
      }

      self.loadingSuggestions = true;
      self.$fluro.api.post(`/matrix/suggest`, {
        title: self.slot.title,
        event: self.event._id,
        roster: self.roster._id
      }, {
        params: {
          limit: 3
        }
      }).then(function (res) {
        self.suggestionData = res.data;
        self.loadingSuggestions = false;
      }).catch(function (err) {
        self.suggestionData = null;
        self.loadingSuggestions = false;
      });
    }

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
    }

  },
  computed: {
    unknownAssignments() {
      return _.filter(this.assignments, {
        confirmationStatus: 'unknown'
      });
    },

    proposedAssignments() {
      return _.filter(this.assignments, {
        confirmationStatus: 'proposed'
      });
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
      return this.assignments.length;
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
      return _.reduce(this.unqualified, function (set, contact) {
        set[contact._id] = contact;
        return set;
      }, {});
    },

    suggestions() {
      var self = this;

      if (!self.suggestionData) {
        console.log('No suggestion data');
        return [];
      } // return self.suggestionData.suggested;


      console.log('Before', self.suggestionData.suggested);
      return self.suggestionData.suggested;
    },

    suggestedContacts() {
      var self = this; // var filtered = _.map(self.suggestionData.suggested, function(row) {
      //     return _.filter(row, function(contact) {
      //         return !self.rosteredMap[contact._id];
      //     });
      // });
      // console.log('After', filtered)
      // return filtered;

      return _.chain(self.suggestions).reduce(function (set, row) {
        var candidate = self.getBestCandidate(row);

        if (candidate) {
          set.push(candidate);
        }

        return set;
      }, []).value();
    },

    event() {
      return _.get(this.roster, 'event');
    },

    slot() {
      return _.get(this.model, 'slot');
    },

    rostered() {
      return _.chain(this.assignments).map('contact').flatten().value();
    },

    rosteredMap() {
      return _.reduce(this.rostered, function (set, contact) {
        set[contact._id] = contact;
        return set;
      }, {});
    },

    assignments() {
      return this.slot ? this.slot.assignments || [] : [];
    },

    roster() {
      return _.get(this.model, 'roster');
    }

  }
};

/* script */
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flex-column',{staticClass:"multi-planner-sidebar"},[_c('flex-column-header',[_c('v-container',{staticClass:"border-bottom"},[_c('v-layout',{attrs:{"align-center":""}},[_c('v-flex',[_c('h4',[(_vm.slot)?_c('strong',[_vm._v(_vm._s(_vm.slot.title))]):_vm._e()])])],1),_vm._v(" "),(_vm.event)?_c('h6',[_vm._v(_vm._s(_vm.event.title)+" "),_c('span',{staticClass:"muted"},[_vm._v(_vm._s(_vm._f("definitionTitle")(_vm.event.definition || _vm.event._type)))])]):_vm._e(),_vm._v(" "),(_vm.event)?_c('div',[_vm._v(_vm._s(_vm._f("readableEventDate")(_vm.event))+" "),_c('span',{staticClass:"sm muted"},[_vm._v("(Starts "+_vm._s(_vm._f("timeago")(_vm.event.startDate))+")")])]):_vm._e()],1)],1),_vm._v(" "),_c('flex-column',[(_vm.slot)?_c('tabset',{model:{value:(_vm.activeTabIndex),callback:function ($$v) {_vm.activeTabIndex=$$v;},expression:"activeTabIndex"}},[_c('tab',{attrs:{"heading":(_vm.rosteredCount + " Rostered")}},[_c('flex-column-body',[_c('v-container',[_c('v-container',{attrs:{"pa-0":"","pb-2":""}},[_c('div',{staticClass:"search",class:{active:_vm.searchFocussed || _vm.search.length}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.search),expression:"search"}],ref:"search",attrs:{"placeholder":"Search for contacts"},domProps:{"value":(_vm.search)},on:{"focus":function($event){_vm.searchFocussed = true;},"blur":function($event){_vm.searchFocussed = false;},"input":function($event){if($event.target.composing){ return; }_vm.search=$event.target.value;}}}),_vm._v(" "),_c('div',{staticClass:"search-icon",on:{"click":function($event){_vm.search = '';}}},[(_vm.search.length)?_c('fluro-icon',{attrs:{"icon":"times"}}):_c('fluro-icon',{attrs:{"icon":"search"}})],1)])]),_vm._v(" "),(_vm.search.length)?[_c('v-container',{attrs:{"pa-0":"","pb-2":""}},[(_vm.searching)?[_c('div',[_vm._v("Searching...")]),_vm._v(" "),_c('v-progress-circular',{attrs:{"indeterminate":""}})]:[_c('label',[_vm._v("Search Results")]),_vm._v(" "),_c('list-group',_vm._l((_vm.searchResults),function(contact,index){return _c('roster-slot-suggestion-list-item',{attrs:{"assignmentSlot":_vm.slot,"event":_vm.event},nativeOn:{"click":function($event){return _vm.selectSuggestion(_vm.searchResults[index])}},model:{value:(_vm.searchResults[index]),callback:function ($$v) {_vm.$set(_vm.searchResults, index, $$v);},expression:"searchResults[index]"}})}),1)]],2)]:[(_vm.assignments.length)?_c('v-container',{attrs:{"pa-0":"","pb-2":""}},[_c('label',[_vm._v("Rostered")]),_vm._v(" "),_c('div',[_vm._l((_vm.assignments),function(assignment,index){return [_c('roster-slot-assignment-list-item',{on:{"unassign":_vm.removeAssignment,"send":_vm.sendAssignment},model:{value:(_vm.assignments[index]),callback:function ($$v) {_vm.$set(_vm.assignments, index, $$v);},expression:"assignments[index]"}})]})],2)]):_vm._e(),_vm._v(" "),_c('v-layout',[_c('v-flex',{attrs:{"xs12":""}},[(_vm.nudgeEnabled)?_c('v-btn',{attrs:{"block":"","loading":_vm.nudging},on:{"click":function($event){return _vm.nudge()}}},[_vm._v("\n                                        Nudge\n                                        "),_c('fluro-icon',{attrs:{"right":"","icon":"hand-pointer"}})],1):_vm._e()],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":""}},[(_vm.sendEnabled)?_c('v-btn',{attrs:{"block":"","color":"primary","loading":_vm.sending},on:{"click":function($event){return _vm.send()}}},[_vm._v("\n                                        Send "+_vm._s(_vm.proposedAssignments.length)+"\n                                        "),_c('fluro-icon',{attrs:{"right":"","icon":"angle-right"}})],1):_vm._e()],1)],1),_vm._v(" "),_c('v-container',{attrs:{"px-0":"","pt-1":""}},[_c('label',[_vm._v("Suggestions")]),_vm._v(" "),(_vm.loadingSuggestions)?_c('div',[_c('div',[_vm._v("Loading...")]),_vm._v(" "),_c('v-progress-circular',{attrs:{"indeterminate":""}})],1):_c('div',[(_vm.suggestedContacts.length)?_c('list-group',_vm._l((_vm.suggestedContacts),function(contact,index){return _c('roster-slot-suggestion-list-item',{attrs:{"assignmentSlot":_vm.slot,"event":_vm.event},nativeOn:{"click":function($event){return _vm.selectSuggestion(_vm.suggestedContacts[index])}},model:{value:(_vm.suggestedContacts[index]),callback:function ($$v) {_vm.$set(_vm.suggestedContacts, index, $$v);},expression:"suggestedContacts[index]"}})}),1):[_c('em',{staticClass:"small muted"},[_vm._v("No suggestions")])]],2)])]],2)],1)],1),_vm._v(" "),_c('tab',{attrs:{"heading":(_vm.unavailableCount + " Unavailable")}},[_c('flex-column-body',[_c('v-container',[(_vm.conflicts.length)?_c('v-container',{attrs:{"pa-0":"","pb-2":""}},[_c('label',[_vm._v("Already Rostered")]),_vm._v(" "),_c('list-group',_vm._l((_vm.conflicts),function(contact,index){return _c('roster-slot-suggestion-list-item',{attrs:{"assignmentSlot":_vm.slot,"event":_vm.event},nativeOn:{"click":function($event){return _vm.selectSuggestion(_vm.conflicts[index])}},model:{value:(_vm.conflicts[index]),callback:function ($$v) {_vm.$set(_vm.conflicts, index, $$v);},expression:"conflicts[index]"}})}),1)],1):_vm._e(),_vm._v(" "),(_vm.unavailable.length)?_c('v-container',{attrs:{"pa-0":"","pb-2":""}},[_c('label',[_vm._v("Unavailable at this time")]),_vm._v(" "),_c('list-group',_vm._l((_vm.unavailable),function(contact,index){return _c('roster-slot-suggestion-list-item',{attrs:{"assignmentSlot":_vm.slot,"event":_vm.event},nativeOn:{"click":function($event){return _vm.selectSuggestion(_vm.unavailable[index])}},model:{value:(_vm.unavailable[index]),callback:function ($$v) {_vm.$set(_vm.unavailable, index, $$v);},expression:"unavailable[index]"}})}),1)],1):_vm._e(),_vm._v(" "),(_vm.unqualified.length)?_c('v-container',{attrs:{"pa-0":"","pb-2":""}},[_c('label',[_vm._v("Unqualified")]),_vm._v(" "),_c('list-group',_vm._l((_vm.unqualified),function(contact,index){return _c('roster-slot-suggestion-list-item',{attrs:{"assignmentSlot":_vm.slot,"event":_vm.event},nativeOn:{"click":function($event){return _vm.selectSuggestion(_vm.unqualified[index])}},model:{value:(_vm.unqualified[index]),callback:function ($$v) {_vm.$set(_vm.unqualified, index, $$v);},expression:"unqualified[index]"}})}),1)],1):_vm._e()],1)],1)],1)],1):_vm._e()],1)],1)};
var __vue_staticRenderFns__$2 = [];

  /* style */
  const __vue_inject_styles__$2 = function (inject) {
    if (!inject) return
    inject("data-v-4c46caa7_0", { source: ".border-top{border-top:1px solid rgba(0,0,0,.05)}.border-right{border-right:1px solid rgba(0,0,0,.05)}.border-bottom{border-bottom:1px solid rgba(0,0,0,.05)}.border-left{border-left:1px solid rgba(0,0,0,.05)}.multi-planner-sidebar .close{margin:0}.multi-planner-sidebar label{display:block;font-weight:500;letter-spacing:.05em;text-transform:uppercase;margin-bottom:5px;font-size:.8em}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$2 = undefined;
  /* module identifier */
  const __vue_module_identifier__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$2 = __vue_normalize__(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    false,
    __vue_create_injector__,
    undefined,
    undefined
  );

//

var script$3 = {
  mixins: [FluroContentEditMixin],
  components: {
    ReminderEventManager,
    RosterSidebar: __vue_component__$2
  },
  methods: {
    createSlot() {
      var self = this;
      var fields = [{
        title: 'Position Title',
        key: 'title',
        type: 'string',
        minimum: 1,
        maximum: 1,
        params: {
          autofocus: true
        }
      }, {
        title: 'Minimum Required',
        description: 'How many people do we need to fill this position?',
        key: 'minimum',
        type: 'integer',
        minimum: 0,
        maximum: 1,
        defaultValues: ['0'],
        params: {
          minValue: 0
        }
      }, {
        title: 'Maximum Required',
        description: 'What is the maximum amount of people that can fill this position?',
        key: 'maximum',
        type: 'integer',
        minimum: 0,
        maximum: 1,
        defaultValues: ['0'],
        params: {
          minValue: 0
        }
      }];
      self.$fluro.prompt(fields, 'Add Position').then(function (res) {
        console.log('New Position');

        var cleanedTitle = _.camelCase(res.title);

        if (!self.model.slots) {
          self.$set(self.model, 'slots', []);
        }

        var existing = _.some(self.model.slots, function (slot) {
          return _.camelCase(slot.title) == cleanedTitle;
        });

        if (existing) {
          return;
        }

        self.$set(res, 'assignments', []);
        self.model.slots.push(res);
        self.select(res);
      });
    },

    trash(slot) {
      var self = this;
      var index = self.model.slots.indexOf(slot);

      if (index == -1 || slot.assignments && slot.assignments.length) {
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
      console.log('ADD SLOT', slot);
      self.model.slots.push(slot);
      self.selected = {
        roster: self.model,
        slot
      };
    },

    select(slot) {
      var self = this;
      console.log('SELECT SLOT', slot);
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
      var rosterID = self.model._id; //////////////////////////////////////////////////////////////
      //Get the slot name 

      var assignmentSlotName = String(assignment.title).toLowerCase(); //Find the matching slot on this roster

      var matchingSlot = _.find(roster.slots, function (slot) {
        return slot.title.toLowerCase() == assignmentSlotName;
      }); //////////////////////////////////////
      //If there is no matching slot


      if (!matchingSlot) {
        return;
      }

      self.$set(assignment, 'sending', true);

      if (!matchingSlot.assignments) {
        self.$set(matchingSlot, 'assignments', []);
      }

      matchingSlot.assignments.push(assignment); //////////////////////////////////////
      //If there is no assignments on this slot

      return new Promise(function (resolve, reject) {
        //Create the assignment
        return self.createAssignment(roster, matchingSlot.assignments, assignment, true).then(function (savedAssignment) {
          _.assign(assignment, savedAssignment);

          self.$set(assignment, 'sending', false);
          self.$set(savedAssignment, 'sending', false);
          console.log('CREATED AND UPDATED ASSIGNMENT', savedAssignment);
          resolve(savedAssignment);
        }).catch(function (err) {
          var index = matchingSlot.assignments.indexOf(assignment);
          matchingSlot.assignments.splice(index, 1);
          resolve(null);
        });
      });
    },

    createAssignment(rosterID, assignments, details, nopush) {
      var self = this;
      rosterID = self.model._id;
      return new Promise(function (resolve, reject) {
        var contact = details.contact;
        self.$fluro.api.post(`/assignments/roster/${rosterID}`, details).then(assignmentCreated).catch(assignmentCreateError); //////////////////////////////////////////////////

        function assignmentCreated(res) {
          var matchingAssignment = res.data;
          matchingAssignment.contactName = matchingAssignment.contact.title || matchingAssignment.contact.firstName + ' ' + matchingAssignment.contact.lastName;

          if (!nopush) {
            var alreadyAssigned = _.some(assignments, {
              _id: matchingAssignment._id
            });

            if (!alreadyAssigned) {
              assignments.push(matchingAssignment);
            }
          }

          resolve(matchingAssignment);
        } //////////////////////////////////////////////////


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
              title: `Add ${contact.firstName} as '${details.title}' anyway`,
              description: (contact.firstName || 'this person') + ' can still fulfill this assignment',
              force: true
            }];
            return self.$fluro.options(array, `Conflict!`, message).then(function (answer) {
              details.force = answer.force;
              self.$fluro.api.post(`/assignments/roster/${rosterID}`, details).then(assignmentCreated).catch(assignmentCreateError);
            }).catch(function (err) {
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
  },

  asyncComputed: {// definition: {
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
      return _.reduce(self.model.slots, function (set, slot) {
        var name = _.camelCase(slot.title);

        set[name] = true;
        return set;
      }, {});
    },

    definedSlots() {
      var self = this;
      return _.get(self.definition, 'data.slots') || [];
    },

    possibleSlots() {
      var self = this;
      return _.filter(self.definedSlots, function (slot) {
        var slotKey = _.camelCase(slot.title);

        return !self.existingSlotNames[slotKey];
      });
    },

    showOutline() {
      return false;
    },

    fieldsOutput() {
      var array = []; ///////////////////////////////////

      addField('event', {
        title: 'Event',
        minimum: 1,
        maximum: 1,
        type: 'reference',
        params: {
          restrictType: 'event'
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

/* script */
const __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flex-column',[(_vm.loading)?[_c('fluro-page-preloader',{attrs:{"contain":""}})]:_c('tabset',{attrs:{"justified":true,"vertical":true}},[_c('tab',{attrs:{"heading":"Roster"}},[_c('flex-row',[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',[_c('constrain',[_vm._l((_vm.model.slots),function(slot){return _c('fluro-panel',{key:slot.title,nativeOn:{"click":function($event){return _vm.select(slot)}}},[_c('fluro-panel-title',[_c('v-layout',{attrs:{"align-center":""}},[_c('v-flex',[_c('strong',[_vm._v(_vm._s(slot.title))]),_vm._v(" "),_c('span',{staticClass:"text-muted"},[_vm._v(_vm._s(_vm.getSummary(slot)))])]),_vm._v(" "),_c('v-flex',{attrs:{"shrink":""}},[_c('v-btn',{staticClass:"ma-0",attrs:{"small":"","icon":""}},[_c('fluro-icon',{attrs:{"icon":"pencil"}})],1),_vm._v(" "),(!slot.assignments || !slot.assignments.length)?_c('v-btn',{staticClass:"ma-0 ml-1",attrs:{"small":"","icon":""},on:{"click":function($event){$event.preventDefault();$event.stopPropagation();return _vm.trash(slot)}}},[_c('fluro-icon',{attrs:{"icon":"trash-alt"}})],1):_vm._e()],1)],1)],1),_vm._v(" "),_c('fluro-panel-body',[_c('div',{staticClass:"assignments"},_vm._l((slot.assignments),function(assignment){return _c('div',{staticClass:"assignment-item",class:assignment.confirmationStatus},[_c('v-layout',{attrs:{"align-center":""}},[_c('v-flex',{staticStyle:{"padding-right":"5px"},attrs:{"shrink":""}},[_c('fluro-avatar',{attrs:{"id":assignment.contact,"type":"contact"}})],1),_vm._v(" "),_c('v-flex',[_vm._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t"+_vm._s(assignment.contact && assignment.contact.title ? assignment.contact.title : assignment.contactName)+"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t")])],1)],1)}),0)])],1)}),_vm._v(" "),_vm._l((_vm.possibleSlots),function(slot){return _c('div',{staticClass:"pseudo-slot",on:{"click":function($event){return _vm.addSlot(slot)}}},[_vm._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tAdd "+_vm._s(slot.title)+"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t")])}),_vm._v(" "),_c('v-btn',{attrs:{"block":"","color":"primary"},on:{"click":function($event){return _vm.createSlot()}}},[_vm._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tAdd a new position\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t")])],2)],1)],1),_vm._v(" "),(_vm.selected)?_c('flex-column',{staticClass:"sidebar"},[_c('roster-sidebar',{model:{value:(_vm.selected),callback:function ($$v) {_vm.selected=$$v;},expression:"selected"}})],1):_vm._e()],1)],1),_vm._v(" "),(_vm.definition && _vm.definition.fields && _vm.definition.fields.length)?_c('tab',{attrs:{"heading":((_vm.definition.title) + " Information")}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',[_c('constrain',{attrs:{"sm":""}},[_c('fluro-content-form',{attrs:{"options":_vm.options,"fields":_vm.definition.fields},model:{value:(_vm.model.data),callback:function ($$v) {_vm.$set(_vm.model, "data", $$v);},expression:"model.data"}})],1)],1)],1)],1):_vm._e()],1)],2)};
var __vue_staticRenderFns__$3 = [];

  /* style */
  const __vue_inject_styles__$3 = function (inject) {
    if (!inject) return
    inject("data-v-1b0b386e_0", { source: ".border-top[data-v-1b0b386e]{border-top:1px solid rgba(0,0,0,.05)}.border-right[data-v-1b0b386e]{border-right:1px solid rgba(0,0,0,.05)}.border-bottom[data-v-1b0b386e]{border-bottom:1px solid rgba(0,0,0,.05)}.border-left[data-v-1b0b386e]{border-left:1px solid rgba(0,0,0,.05)}.hint[data-v-1b0b386e]{font-size:10px;opacity:.5;color:inherit;display:block}.assignments .assignment-item[data-v-1b0b386e]{width:30%;display:inline-block;margin:4px}.assignment-item[data-v-1b0b386e]{font-size:12px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;border-radius:100px;margin-bottom:2px;padding:5px;font-weight:500;background-color:rgba(0,0,0,.05)}.assignment-item.confirmed[data-v-1b0b386e]{color:#4cc650;background-color:rgba(76,198,80,.05)}.assignment-item.denied[data-v-1b0b386e]{color:#d93e63;background-color:rgba(217,62,99,.05)}.assignment-item.unknown[data-v-1b0b386e]{color:#555}.assignment-item.proposed[data-v-1b0b386e]{background-color:rgba(42,212,185,.1);color:#197f6f}.sidebar[data-v-1b0b386e]{border-left:1px solid rgba(0,0,0,.1);background:#fff;flex:none;max-width:300px}.pseudo-slot[data-v-1b0b386e]{cursor:pointer;text-align:center;border:2px dashed rgba(0,0,0,.2);padding:15px 10px;border-radius:5px;margin:4px 0;font-weight:700;opacity:.5}.pseudo-slot[data-v-1b0b386e]:hover{opacity:1}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$3 = "data-v-1b0b386e";
  /* module identifier */
  const __vue_module_identifier__$3 = undefined;
  /* functional template */
  const __vue_is_functional_template__$3 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$3 = __vue_normalize__(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    false,
    __vue_create_injector__,
    undefined,
    undefined
  );

export default __vue_component__$3;
//# sourceMappingURL=roster-8011b8ae.js.map
