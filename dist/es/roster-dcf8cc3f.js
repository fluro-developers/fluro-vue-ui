import { bf as __vue_normalize__, bg as __vue_create_injector__, bh as _ } from './index-d8c8912c.js';
import Vue from 'vue';
import draggable from 'vuedraggable';
import 'vue-color';
import 'signature_pad';
import 'fluro';
import 'vuex-map-fields';
import 'async';
import 'tippy.js';
import 'tiptap';
import 'tiptap-commands';
import 'tiptap-extensions';
import { F as FluroContentEditMixin } from './FluroContentEditMixin-344daea2.js';
import './FluroExclusiveSelector-40eaa458.js';
import { R as ReminderEventManager } from './ReminderEventManager-0a503da0.js';
import moment from 'moment';

//
//
//
//
//
var script = {
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

  computed: {
    className() {
      if (!this.model) {
        return;
      }

      if (this.model.minimum) {
        return 'needed';
      }
    },

    message() {
      var self = this;

      if (!self.model) {
        return;
      }

      if (self.model.assignments.length) {
        if (self.model.minimum) {
          return `${this.model.minimum} needed for '${this.model.title}'`;
        }
      } // return this.model.title;

    }

  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"slot-placeholder",class:_vm.className},[_vm._v("\n    "+_vm._s(_vm.message)+"\n")])};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-74ab0407_0", { source: ".border-top{border-top:1px solid rgba(0,0,0,.05)}.border-right{border-right:1px solid rgba(0,0,0,.05)}.border-bottom{border-bottom:1px solid rgba(0,0,0,.05)}.border-left{border-left:1px solid rgba(0,0,0,.05)}.slot-placeholder{font-style:italic;font-size:13px;line-height:28px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;height:28px}.slot-placeholder.needed{color:#c59626;font-style:italic}", map: undefined, media: undefined });

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
//
//
//
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

  computed: {
    confirmationStatus() {
      return this.model.confirmationStatus;
    },

    iconLibrary() {
      var value = 'far';

      switch (this.confirmationStatus) {
        case 'confirmed':
          value = 'far';
          break;

        case 'denied':
          // value = 'fas';
          break;

        case 'proposed':
          value = 'fas';
          break;
      }

      return value;
    },

    icon() {
      var value;

      if (this.model.sending) {
        return 'spinner-third';
      }

      switch (this.confirmationStatus) {
        case 'confirmed':
          value = 'check';
          break;

        case 'denied':
          value = 'times-square';
          break;

        case 'proposed':
          value = 'question-circle';
          break;

        case 'unknown':
          value = 'clock';
          break;
      }

      return value;
    }

  }
};

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"assignment-cell-item",class:_vm.confirmationStatus},[_c('fluro-icon',{staticClass:"status-icon",attrs:{"spin":_vm.model.sending,"icon":_vm.icon,"library":_vm.iconLibrary}}),_vm._v(" "+_vm._s(_vm.model.contactName)+"\n")],1)};
var __vue_staticRenderFns__$1 = [];

  /* style */
  const __vue_inject_styles__$1 = function (inject) {
    if (!inject) return
    inject("data-v-7145f81f_0", { source: ".border-top{border-top:1px solid rgba(0,0,0,.05)}.border-right{border-right:1px solid rgba(0,0,0,.05)}.border-bottom{border-bottom:1px solid rgba(0,0,0,.05)}.border-left{border-left:1px solid rgba(0,0,0,.05)}.assignment-cell-item{cursor:pointer;font-size:13px;font-weight:500;padding:0 10px;height:26px;line-height:26px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;background:#fff}.assignment-cell-item .status-icon{font-size:.8em}.assignment-cell-item.denied{color:#be264a;border-color:rgba(190,38,74,.3);background:#fbedf0}.assignment-cell-item.confirmed{color:#36a93a;border-color:rgba(54,169,58,.3);background:#e7f7e7}.assignment-cell-item.warning{background:rgba(226,152,92,.05);color:#da7d31;border-color:rgba(218,125,49,.3);font-style:italic}.assignment-cell-item.proposed{background:#eafaf7;color:#319a89;border-color:rgba(49,154,137,.3);animation:pulseprimary 2s infinite}.assignment-cell-item.unknown{color:rgba(0,0,0,.7);background:#fff;border-color:rgba(0,0,0,.7)}@keyframes pulseprimary{0%{background:#acebe1}50%{background:#d5f5f0}100%{background:#acebe1}}", map: undefined, media: undefined });

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

var MultiPlannerService = new Vue({
  methods: {
    injectAssignment(roster, assignment) {
      var self = this;
      var rosterID = self.$fluro.utils.getStringID(roster); //////////////////////////////////////////////////////////////
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
      var self = this; //Ensure it's an ID

      rosterID = self.$fluro.utils.getStringID(rosterID);
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

  }
});

//
var script$2 = {
  components: {
    RosterSlotAssignmentCell: __vue_component__$1,
    RosterSlotPlaceholderCell: __vue_component__,
    draggable
  },
  props: {
    'definition': {
      type: Object,
      required: true
    },
    'roster': {
      type: Object,
      required: true
    },
    'position': {
      type: Object,
      required: true
    },
    'selected': {
      type: Boolean
    }
  },

  created() {
    var self = this; /////////////////////////////////////////

    if (!self.roster.slots) {
      var slotCopy = _.map(JSON.parse(JSON.stringify(self.definition.slots)), function (slot) {
        slot.assignments = [];
        return slot;
      });

      console.log('CREATED SLOT', slotCopy);
      self.$set(self.roster, 'slots', slotCopy);
    }
  },

  computed: {
    slotMap() {
      var self = this;

      if (!self.roster) {
        return {};
      }

      return _.reduce(self.roster.slots, function (set, slot) {
        var stringName = String(slot.title).toLowerCase();
        set[stringName] = slot;
        return set;
      }, {});
    },

    slot() {
      var self = this;
      var positionLowerCase = String(self.position.title).toLowerCase();
      var match = self.slotMap[positionLowerCase]; //////////////////////////////////////////////////////////////////

      if (match) {
        match.style = 'self';
      } else {
        //Find the default setup for this slot
        var defaultSlot = _.find(self.definition.slots, function (slot) {
          return String(slot.title).toLowerCase() == positionLowerCase;
        });

        var copy = JSON.parse(JSON.stringify(defaultSlot));
        copy.assignments = [];
        copy.style = 'default';
        return copy;
      }

      return match;
    },

    assignments: {
      get() {
        var self = this;
        return self.slot.assignments;
      },

      set(array) {
        this.slot.assignments = array;
      }

    },

    contactIDs() {
      var self = this;
      return _.reduce(self.assignments, function (set, assignment) {
        if (!assignment._id || assignment._id == 'placeholder') {
          return set;
        }

        var contactID = self.$fluro.utils.getStringID(assignment.contact);
        set[contactID] = true;
        return set;
      }, {});
    }

  },

  data() {
    return {
      chosen: false
    };
  },

  methods: {
    alreadyRostered(contactID) {
      var self = this;
      var contactID = self.$fluro.utils.getStringID(contactID);
      return self.contactIDs[contactID];
    },

    remove(assignment) {
      var self = this;

      var index = _.indexOf(self.assignments, assignment);

      self.assignments.splice(index, 1);
    },

    drop($event) {
      if (!$event.added) {
        console.log('Nothing added');
        return;
      }

      var self = this;
      var rosterID = this.roster._id;
      var dropAssignment = $event.added.element; //////////////////////////////////////////
      //Check if this contact is already assigned to this slot

      var alreadyRostered = self.alreadyRostered(dropAssignment.contact);

      if (alreadyRostered) {
        //If it is just remove the placeholder
        console.log('Already rostered!');
        return self.remove(dropAssignment);
      } //////////////////////////////////////////


      var details = {
        title: this.slot.title,
        contact: dropAssignment.contact,
        contactName: dropAssignment.contactName,
        confirmationStatus: 'proposed',
        sending: true
      }; //////////////////////////////////////////

      MultiPlannerService.createAssignment(rosterID, self.assignments, details, true).then(function (savedAssignment) {
        savedAssignment.sending = false;
        details.sending = false;

        _.assign(dropAssignment, savedAssignment);

        console.log('Assignment dropped', self.assignments, dropAssignment);
      }).catch(function (err) {
        console.log('ERROR', err);
        self.remove(dropAssignment);
      });
    },

    cloneAssignment(source) {
      var cloned = JSON.parse(JSON.stringify(source));
      cloned._id = 'placeholder';
      cloned.sending = true;
      return cloned;
    }

  }
};

/* script */
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-layout',{attrs:{"row":"","wrap":""}},[_vm._l((_vm.assignments),function(assignment,index){return _c('v-flex',{attrs:{"shrink":""}},[_c('draggable',{attrs:{"sort":false,"group":{ name: 'assignments', pull: 'clone' },"clone":_vm.cloneAssignment},on:{"change":_vm.drop},model:{value:(_vm.assignments),callback:function ($$v) {_vm.assignments=$$v;},expression:"assignments"}},[_c('roster-slot-assignment-cell',{key:assignment._id,staticClass:"assignment-chip",model:{value:(_vm.assignments[index]),callback:function ($$v) {_vm.$set(_vm.assignments, index, $$v);},expression:"assignments[index]"}})],1)],1)}),_vm._v(" "),(!_vm.assignments.length)?_c('v-flex',{attrs:{"grow":""}},[_c('draggable',{attrs:{"sort":false,"group":{ name: 'assignments', pull: 'clone' },"clone":_vm.cloneAssignment},on:{"change":_vm.drop},model:{value:(_vm.assignments),callback:function ($$v) {_vm.assignments=$$v;},expression:"assignments"}})],1):_vm._e()],2)};
var __vue_staticRenderFns__$2 = [];

  /* style */
  const __vue_inject_styles__$2 = function (inject) {
    if (!inject) return
    inject("data-v-704777ab_0", { source: ".border-top{border-top:1px solid rgba(0,0,0,.05)}.border-right{border-right:1px solid rgba(0,0,0,.05)}.border-bottom{border-bottom:1px solid rgba(0,0,0,.05)}.border-left{border-left:1px solid rgba(0,0,0,.05)}.assignment-chip{border:1px solid #fefefe;height:36px;line-height:36px;margin:12px}", map: undefined, media: undefined });

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
  props: {
    selected: {
      type: Boolean,
      default: false
    },
    definition: {
      required: false
    },
    value: {
      type: Object,
      required: true
    },
    roster: {
      type: Object,
      required: true
    }
  },
  components: {
    RosterSlotPlaceholderCell: __vue_component__,
    RosterSlotCell: __vue_component__$2
  },
  methods: {},

  data() {
    return {
      model: this.value
    };
  }

};

/* script */
const __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-layout',{attrs:{"row":""},nativeOn:{"click":function($event){return _vm.$emit('selectcell')}}},[_c('v-flex',{staticClass:"slot-title sm4",class:{dynamic: _vm.model.dynamic},attrs:{"shrink":""}},[_c('div',{staticClass:"slot-attributes"},[_c('span',{staticClass:"h4 position-title"},[_vm._v(_vm._s(_vm.model.title))]),_vm._v(" "),(_vm.model.optOutBehaviour == 'disabled')?_c('fluro-icon',{directives:[{name:"tippy",rawName:"v-tippy"}],staticClass:"brand-danger",attrs:{"content":"Opt out is disabled","icon":"times-square"}}):_vm._e(),_vm._v(" "),(_vm.model.confirmationBehaviour == 'confirm')?_c('fluro-icon',{directives:[{name:"tippy",rawName:"v-tippy"}],staticClass:"brand-success",attrs:{"content":"Autoconfirm","icon":"check-square"}}):_vm._e(),_vm._v(" "),(_vm.model.requireCapabilities && _vm.model.requireCapabilities.length)?_c('fluro-icon',{directives:[{name:"tippy",rawName:"v-tippy"}],staticClass:"brand-warning",attrs:{"content":"Requires Capabilities","icon":"exclamation-square"}}):_vm._e()],1),_vm._v(" "),_c('roster-slot-placeholder-cell',{model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{staticClass:"sm8"},[_c('roster-slot-cell',{attrs:{"position":_vm.model,"definition":_vm.definition.data,"roster":_vm.roster,"selected":_vm.selected},nativeOn:{"click":function($event){return _vm.$emit('selectcell')}}})],1)],1)};
var __vue_staticRenderFns__$3 = [];

  /* style */
  const __vue_inject_styles__$3 = function (inject) {
    if (!inject) return
    inject("data-v-f47776ac_0", { source: ".border-top{border-top:1px solid rgba(0,0,0,.05)}.border-right{border-right:1px solid rgba(0,0,0,.05)}.border-bottom{border-bottom:1px solid rgba(0,0,0,.05)}.border-left{border-left:1px solid rgba(0,0,0,.05)}.slot-attributes{line-height:inherit}.slot-attributes .brand-success{color:#4cc650}.slot-attributes .brand-danger{color:#d93e63}.slot-attributes .brand-warning{color:#f0974e}.position-title{text-transform:none;margin-right:10px}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$3 = undefined;
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

//
var script$4 = {
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
const __vue_script__$4 = script$4;

/* template */
var __vue_render__$4 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"suggestion-list-item"},[_c('v-menu',{attrs:{"left":"","offset-x":"","open-on-hover":true},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var on = ref.on;
return [_c('v-layout',_vm._g({attrs:{"align-center":""}},on),[_c('v-flex',{staticClass:"face",attrs:{"shrink":""}},[_c('fluro-realm-bar',{attrs:{"realm":_vm.model.realms}}),_vm._v(" "),(_vm.isLoading)?_c('v-progress-circular',{attrs:{"indeterminate":""}}):_c('fluro-avatar',{attrs:{"md":"","id":_vm.model}})],1),_vm._v(" "),_c('v-flex',[_c('div',[_c('strong',[_vm._v(_vm._s(_vm.model.title))]),_vm._v(" "),_c('div',{staticClass:"summary"},[_vm._v(_vm._s(_vm.summary))])])]),_vm._v(" "),_c('v-flex',{attrs:{"shrink":""}},[_c('div',{staticClass:"btn-group"},[_c('span',{staticClass:"btn",attrs:{"xs":""},on:{"click":function($event){$event.stopPropagation();$event.preventDefault();return _vm.$actions.open([_vm.model])}}},[_c('fluro-icon',{attrs:{"icon":"ellipsis-h"}})],1),_vm._v(" "),_c('span',{staticClass:"btn",attrs:{"xs":""}},[_c('fluro-icon',{attrs:{"icon":"plus"}})],1)])])],1)]}}])},[_vm._v(" "),_c('div',{staticClass:"suggestion-roster-summary"},[_c('h5',[_vm._v(_vm._s(_vm.model.title))]),_vm._v(" "),(_vm.assignmentsExplanation)?_c('div',{staticClass:"suggestion-roster-summary-group"},[_c('h6',[_c('fluro-icon',{staticClass:"icon",attrs:{"library":"fas","type":"assignment"}}),_vm._v("Already Declined")],1),_vm._v(" "),_c('div',{domProps:{"innerHTML":_vm._s(_vm.assignmentsExplanation)}})]):_vm._e(),_vm._v(" "),(_vm.teams)?_c('div',{staticClass:"suggestion-roster-summary-group"},[_c('h6',[_c('fluro-icon',{staticClass:"icon",attrs:{"library":"fas","type":"team"}}),_vm._v(" Is '"+_vm._s(_vm.assignmentSlot.title)+"' position in")],1),_vm._v(" "),_c('div',{domProps:{"innerHTML":_vm._s(_vm.teams)}})]):_vm._e(),_vm._v(" "),(_vm.capabilities)?_c('div',{staticClass:"suggestion-roster-summary-group"},[_c('h6',[_c('fluro-icon',{staticClass:"icon",attrs:{"library":"fas","type":"capability"}}),_vm._v("Capabilities")],1),_vm._v(" "),_c('div',{domProps:{"innerHTML":_vm._s(_vm.capabilities)}})]):_vm._e(),_vm._v(" "),(_vm.conflicts.length)?_c('div',{staticClass:"suggestion-roster-summary-group"},[_c('h6',[_c('fluro-icon',{staticClass:"icon",attrs:{"library":"fas","icon":"exclamation-circle"}}),_vm._v(" Conflicts")],1),_vm._v(" "),_vm._l((_vm.conflicts),function(assignment){return _c('div',[_c('strong',[_vm._v(_vm._s(assignment.title))]),_vm._v(" at "),_c('strong',[_vm._v(_vm._s(_vm._f("formatDate")(assignment.event.startDate,'h:mma'))+" - '"+_vm._s(assignment.event.title)+"'")])])})],2):_vm._e(),_vm._v(" "),(_vm.prior)?_c('div',{staticClass:"suggestion-roster-summary-group"},[_c('h6',[_c('fluro-icon',{staticClass:"icon",attrs:{"library":"fas","type":"angle-left"}}),_vm._v(" Prior Assignment")],1),_vm._v(" "),_c('div',{domProps:{"innerHTML":_vm._s(_vm.prior)}})]):_vm._e(),_vm._v(" "),(_vm.next)?_c('div',{staticClass:"suggestion-roster-summary-group"},[_c('h6',[_c('fluro-icon',{staticClass:"icon",attrs:{"library":"fas","type":"angle-right"}}),_vm._v(" Next Assignment")],1),_vm._v(" "),_c('div',{domProps:{"innerHTML":_vm._s(_vm.next)}})]):_vm._e(),_vm._v(" "),(_vm.lacks.length)?_c('div',{staticClass:"suggestion-roster-summary-group"},[_c('h6',[_c('fluro-icon',{staticClass:"icon",attrs:{"library":"fas","type":"frown"}}),_vm._v(" Lacks required capability")],1),_vm._v(" "),_c('div',[_c('Strong',[_vm._v(_vm._s(_vm.lacks))])],1)]):_vm._e(),_vm._v(" "),(_vm.periods.length)?_c('div',{staticClass:"suggestion-roster-summary-group"},[_c('h6',[_c('fluro-icon',{staticClass:"icon",attrs:{"library":"fas","type":"times-circle"}}),_vm._v(" Unavailable")],1),_vm._v(" "),_vm._l((_vm.periods),function(period){return _c('div',[_vm._v("\n                    "+_vm._s(period.description)+" "),_c('strong',[_vm._v(_vm._s(_vm._f("readableEventDate")(period)))])])})],2):_vm._e()])])],1)};
var __vue_staticRenderFns__$4 = [];

  /* style */
  const __vue_inject_styles__$4 = function (inject) {
    if (!inject) return
    inject("data-v-2e8ea829_0", { source: ".border-top{border-top:1px solid rgba(0,0,0,.05)}.border-right{border-right:1px solid rgba(0,0,0,.05)}.border-bottom{border-bottom:1px solid rgba(0,0,0,.05)}.border-left{border-left:1px solid rgba(0,0,0,.05)}.suggestion-list-item{position:relative;padding:7px 10px;border-bottom:1px solid rgba(0,0,0,.1);line-height:1.4;cursor:pointer}.suggestion-list-item:last-child{border-bottom:none}.suggestion-list-item:hover{background:rgba(0,0,0,.05)}.suggestion-list-item .face{flex:none;padding-right:10px}.suggestion-list-item .summary{font-size:.8em;opacity:.5}.suggestion-roster-summary{background:#111;color:#ccc;padding:10px 5px;letter-spacing:-.03em;font-size:12px;width:250px;overflow:hidden}.suggestion-roster-summary h4,.suggestion-roster-summary h5,.suggestion-roster-summary h6,.suggestion-roster-summary strong{color:#fff}.suggestion-roster-summary .suggestion-roster-summary-group{padding-top:10px;margin-top:5px;border-top:1px solid rgba(255,255,255,.1);line-height:1.4}.suggestion-roster-summary .suggestion-roster-summary-group .icon{font-size:9px;line-height:inherit;margin-right:5px;display:none}.suggestion-roster-summary .suggestion-roster-summary-group h6{text-transform:uppercase;font-size:10px;font-weight:600;letter-spacing:.03em;margin-bottom:5px}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$4 = undefined;
  /* module identifier */
  const __vue_module_identifier__$4 = undefined;
  /* functional template */
  const __vue_is_functional_template__$4 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$4 = __vue_normalize__(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    false,
    __vue_create_injector__,
    undefined,
    undefined
  );

//
var script$5 = {
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
const __vue_script__$5 = script$5;

/* template */
var __vue_render__$5 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"assignment-list-item",class:_vm.confirmationStatus},[_c('v-layout',{attrs:{"align-center":""}},[_c('v-flex',{staticClass:"face",attrs:{"shrink":""}},[(_vm.isLoading)?_c('v-progress-circular',{attrs:{"indeterminate":""}}):_c('fluro-avatar',{attrs:{"md":"","id":_vm.contact._id}})],1),_vm._v(" "),_c('v-flex',[_c('strong',[_vm._v(_vm._s(_vm.contact.title))]),_vm._v(" "),_c('div',{staticClass:"summary"},[_vm._v(_vm._s(_vm.summary))])]),_vm._v(" "),_c('v-flex',{attrs:{"shrink":""}},[(!_vm.model.sending)?_c('div',{staticClass:"btn-group"},[(_vm.sendable)?_c('span',{staticClass:"btn",attrs:{"xs":""},on:{"click":function($event){$event.stopPropagation();$event.preventDefault();return _vm.send()}}},[_c('fluro-icon',{attrs:{"icon":"paper-plane"}})],1):_c('span',{staticClass:"btn",attrs:{"xs":""},on:{"click":function($event){$event.stopPropagation();$event.preventDefault();return _vm.$actions.open([_vm.model])}}},[_c('fluro-icon',{attrs:{"icon":"ellipsis-h"}})],1),_vm._v(" "),_c('span',{staticClass:"btn",attrs:{"xs":""},on:{"click":function($event){$event.stopPropagation();$event.preventDefault();return _vm.remove()}}},[_c('fluro-icon',{attrs:{"icon":"times"}})],1)]):_vm._e()])],1)],1)};
var __vue_staticRenderFns__$5 = [];

  /* style */
  const __vue_inject_styles__$5 = function (inject) {
    if (!inject) return
    inject("data-v-2a0361dd_0", { source: ".border-top{border-top:1px solid rgba(0,0,0,.05)}.border-right{border-right:1px solid rgba(0,0,0,.05)}.border-bottom{border-bottom:1px solid rgba(0,0,0,.05)}.border-left{border-left:1px solid rgba(0,0,0,.05)}.assignment-list-item{position:relative;padding:7px 10px;border:1px solid rgba(0,0,0,.1);border-bottom:none;line-height:1.4}.assignment-list-item:first-child{border-radius:3px 3px 0 0}.assignment-list-item:last-child{border:1px solid rgba(0,0,0,.1);border-radius:0 0 3px 3px}.assignment-list-item .face{flex:none;padding-right:10px}.assignment-list-item .summary{font-size:.8em;opacity:.5}.assignment-list-item.denied{color:#be264a;border-color:rgba(190,38,74,.3);background:#fbedf0}.assignment-list-item.confirmed{color:#36a93a;border-color:rgba(54,169,58,.3);background:#e7f7e7}.assignment-list-item.warning{background:rgba(226,152,92,.05);color:#da7d31;border-color:rgba(218,125,49,.3);font-style:italic}.assignment-list-item.proposed{background:#eafaf7;color:#319a89;border-color:rgba(49,154,137,.3)}.assignment-list-item.unknown{color:rgba(0,0,0,.7);background:#fff}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$5 = undefined;
  /* module identifier */
  const __vue_module_identifier__$5 = undefined;
  /* functional template */
  const __vue_is_functional_template__$5 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$5 = __vue_normalize__(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    false,
    __vue_create_injector__,
    undefined,
    undefined
  );

//
var script$6 = {
  props: {
    value: {
      type: Object
    }
  },
  components: {
    RosterSlotSuggestionListItem: __vue_component__$4,
    RosterSlotAssignmentListItem: __vue_component__$5
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
            self.slot.assignments.push(matchingAssignment);
          }

          resolve(matchingAssignment);
          self.searchResults = [];
          self.search = '';
          self.focusSearch();
        }

        function assignmentCreateError(err) {
          var err = err.response.data;
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
const __vue_script__$6 = script$6;

/* template */
var __vue_render__$6 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flex-column',{staticClass:"multi-planner-sidebar"},[_c('flex-column-header',[_c('v-container',{staticClass:"border-bottom"},[_c('v-layout',{attrs:{"align-center":""}},[_c('v-flex',[_c('h4',[(_vm.slot)?_c('strong',[_vm._v(_vm._s(_vm.slot.title))]):_vm._e()])])],1),_vm._v(" "),(_vm.event)?_c('h6',[_vm._v(_vm._s(_vm.event.title)+" "),_c('span',{staticClass:"muted"},[_vm._v(_vm._s(_vm._f("definitionTitle")(_vm.event.definition || _vm.event._type)))])]):_vm._e(),_vm._v(" "),(_vm.event)?_c('div',[_vm._v(_vm._s(_vm._f("readableEventDate")(_vm.event))+" "),_c('span',{staticClass:"sm muted"},[_vm._v("(Starts "+_vm._s(_vm._f("timeago")(_vm.event.startDate))+")")])]):_vm._e()],1)],1),_vm._v(" "),_c('flex-column',[(_vm.slot)?_c('tabset',{model:{value:(_vm.activeTabIndex),callback:function ($$v) {_vm.activeTabIndex=$$v;},expression:"activeTabIndex"}},[_c('tab',{attrs:{"heading":(_vm.rosteredCount + " Rostered")}},[_c('flex-column-body',[_c('v-container',[_c('v-container',{attrs:{"pa-0":"","pb-2":""}},[_c('div',{staticClass:"search",class:{active:_vm.searchFocussed || _vm.search.length}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.search),expression:"search"}],ref:"search",attrs:{"placeholder":"Search for contacts"},domProps:{"value":(_vm.search)},on:{"focus":function($event){_vm.searchFocussed = true;},"blur":function($event){_vm.searchFocussed = false;},"input":function($event){if($event.target.composing){ return; }_vm.search=$event.target.value;}}}),_vm._v(" "),_c('div',{staticClass:"search-icon",on:{"click":function($event){_vm.search = '';}}},[(_vm.search.length)?_c('fluro-icon',{attrs:{"icon":"times"}}):_c('fluro-icon',{attrs:{"icon":"search"}})],1)])]),_vm._v(" "),(_vm.search.length)?[_c('v-container',{attrs:{"pa-0":"","pb-2":""}},[(_vm.searching)?[_c('div',[_vm._v("Searching...")]),_vm._v(" "),_c('v-progress-circular',{attrs:{"indeterminate":""}})]:[_c('label',[_vm._v("Search Results")]),_vm._v(" "),_c('list-group',_vm._l((_vm.searchResults),function(contact,index){return _c('roster-slot-suggestion-list-item',{attrs:{"assignmentSlot":_vm.slot,"event":_vm.event},nativeOn:{"click":function($event){return _vm.selectSuggestion(_vm.searchResults[index])}},model:{value:(_vm.searchResults[index]),callback:function ($$v) {_vm.$set(_vm.searchResults, index, $$v);},expression:"searchResults[index]"}})}),1)]],2)]:[(_vm.assignments.length)?_c('v-container',{attrs:{"pa-0":"","pb-2":""}},[_c('label',[_vm._v("Rostered")]),_vm._v(" "),_c('div',[_vm._l((_vm.assignments),function(assignment,index){return [_c('roster-slot-assignment-list-item',{on:{"unassign":_vm.removeAssignment,"send":_vm.sendAssignment},model:{value:(_vm.assignments[index]),callback:function ($$v) {_vm.$set(_vm.assignments, index, $$v);},expression:"assignments[index]"}})]})],2)]):_vm._e(),_vm._v(" "),_c('v-layout',[_c('v-flex',{attrs:{"xs12":""}},[(_vm.nudgeEnabled)?_c('v-btn',{attrs:{"block":"","loading":_vm.nudging},on:{"click":function($event){return _vm.nudge()}}},[_vm._v("\n                                        Nudge\n                                        "),_c('fluro-icon',{attrs:{"right":"","icon":"hand-pointer"}})],1):_vm._e()],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":""}},[(_vm.sendEnabled)?_c('v-btn',{attrs:{"block":"","color":"primary","loading":_vm.sending},on:{"click":function($event){return _vm.send()}}},[_vm._v("\n                                        Send "+_vm._s(_vm.proposedAssignments.length)+"\n                                        "),_c('fluro-icon',{attrs:{"right":"","icon":"angle-right"}})],1):_vm._e()],1)],1),_vm._v(" "),_c('v-container',{attrs:{"px-0":"","pt-1":""}},[_c('label',[_vm._v("Suggestions")]),_vm._v(" "),(_vm.loadingSuggestions)?_c('div',[_c('div',[_vm._v("Loading...")]),_vm._v(" "),_c('v-progress-circular',{attrs:{"indeterminate":""}})],1):_c('div',[(_vm.suggestedContacts.length)?_c('list-group',_vm._l((_vm.suggestedContacts),function(contact,index){return _c('roster-slot-suggestion-list-item',{attrs:{"assignmentSlot":_vm.slot,"event":_vm.event},nativeOn:{"click":function($event){return _vm.selectSuggestion(_vm.suggestedContacts[index])}},model:{value:(_vm.suggestedContacts[index]),callback:function ($$v) {_vm.$set(_vm.suggestedContacts, index, $$v);},expression:"suggestedContacts[index]"}})}),1):[_c('em',{staticClass:"small muted"},[_vm._v("No suggestions")])]],2)])]],2)],1)],1),_vm._v(" "),_c('tab',{attrs:{"heading":(_vm.unavailableCount + " Unavailable")}},[_c('flex-column-body',[_c('v-container',[(_vm.conflicts.length)?_c('v-container',{attrs:{"pa-0":"","pb-2":""}},[_c('label',[_vm._v("Already Rostered")]),_vm._v(" "),_c('list-group',_vm._l((_vm.conflicts),function(contact,index){return _c('roster-slot-suggestion-list-item',{attrs:{"assignmentSlot":_vm.slot,"event":_vm.event},nativeOn:{"click":function($event){return _vm.selectSuggestion(_vm.conflicts[index])}},model:{value:(_vm.conflicts[index]),callback:function ($$v) {_vm.$set(_vm.conflicts, index, $$v);},expression:"conflicts[index]"}})}),1)],1):_vm._e(),_vm._v(" "),(_vm.unavailable.length)?_c('v-container',{attrs:{"pa-0":"","pb-2":""}},[_c('label',[_vm._v("Unavailable at this time")]),_vm._v(" "),_c('list-group',_vm._l((_vm.unavailable),function(contact,index){return _c('roster-slot-suggestion-list-item',{attrs:{"assignmentSlot":_vm.slot,"event":_vm.event},nativeOn:{"click":function($event){return _vm.selectSuggestion(_vm.unavailable[index])}},model:{value:(_vm.unavailable[index]),callback:function ($$v) {_vm.$set(_vm.unavailable, index, $$v);},expression:"unavailable[index]"}})}),1)],1):_vm._e(),_vm._v(" "),(_vm.unqualified.length)?_c('v-container',{attrs:{"pa-0":"","pb-2":""}},[_c('label',[_vm._v("Unqualified")]),_vm._v(" "),_c('list-group',_vm._l((_vm.unqualified),function(contact,index){return _c('roster-slot-suggestion-list-item',{attrs:{"assignmentSlot":_vm.slot,"event":_vm.event},nativeOn:{"click":function($event){return _vm.selectSuggestion(_vm.unqualified[index])}},model:{value:(_vm.unqualified[index]),callback:function ($$v) {_vm.$set(_vm.unqualified, index, $$v);},expression:"unqualified[index]"}})}),1)],1):_vm._e()],1)],1)],1)],1):_vm._e()],1)],1)};
var __vue_staticRenderFns__$6 = [];

  /* style */
  const __vue_inject_styles__$6 = function (inject) {
    if (!inject) return
    inject("data-v-8495efc8_0", { source: ".border-top{border-top:1px solid rgba(0,0,0,.05)}.border-right{border-right:1px solid rgba(0,0,0,.05)}.border-bottom{border-bottom:1px solid rgba(0,0,0,.05)}.border-left{border-left:1px solid rgba(0,0,0,.05)}.multi-planner-sidebar .close{margin:0}.multi-planner-sidebar label{display:block;font-weight:500;letter-spacing:.05em;text-transform:uppercase;margin-bottom:5px;font-size:.8em}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$6 = undefined;
  /* module identifier */
  const __vue_module_identifier__$6 = undefined;
  /* functional template */
  const __vue_is_functional_template__$6 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$6 = __vue_normalize__(
    { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
    __vue_inject_styles__$6,
    __vue_script__$6,
    __vue_scope_id__$6,
    __vue_is_functional_template__$6,
    __vue_module_identifier__$6,
    false,
    __vue_create_injector__,
    undefined,
    undefined
  );

//
var script$7 = {
  props: {
    value: {
      type: Object,
      required: true
    },
    definition: {
      type: Object
    }
  },

  created() {
    this.processDefinitionSlots();
  },

  components: {
    RosterSidebar: __vue_component__$6,
    RosterSlotManager: __vue_component__$3
  },

  data() {
    return {
      model: this.value,
      defaultRosters: {},
      processing: false,
      dragOptions: {},
      selected: null,
      collapsed: {},
      loading: true
    };
  },

  computed: {
    orderedRosterTypes() {
      var self = this;

      var ordered = _.values(self.defaultRosters);

      console.log('ORDERED', ordered);
      return ordered;
    },

    proposals() {
      var self = this;
      return _.chain(self.columns).reduce(function (set, column) {
        _.each(column.rosters, function (rosterType) {
          if (rosterType.roster) {
            set = set.concat(rosterType.roster.slots);
          }
        });

        return set;
      }, []).map(function (slot) {
        return slot.assignments;
      }).flatten().compact().filter(function (assignment) {
        return assignment.confirmationStatus == 'proposed';
      }).value();
    },

    knownDefinitionSlots() {
      return _.get(this.definition, 'data.slots');
    }

  },
  watch: {
    knownDefinitionSlots() {
      return this.processDefinitionSlots();
    }

  },
  methods: {
    editRosterReminders(column, rosterTypeName) {
      console.log('CLICK', column);
      var self = this;
      var event = column.event;
      var rosters = column.rosters; ///////////////////////////////////////

      var slots = _.chain(rosters).map('slots').flatten().compact().uniq(function (slot) {
        return slot.title;
      }).value(); //////////////////////////////////////////////////


      var promise = self.$fluro.modal({
        component: EventReminderModal,
        options: {
          event,
          slots
        }
      });
    },

    editEventReminders(column) {
      var self = this;
      var event = column.event;
      var rosters = column.rosters; ///////////////////////////////////////

      var slots = _.chain(rosters).map('slots').flatten().compact().uniq(function (slot) {
        return slot.title;
      }).value(); //////////////////////////////////////////////////


      var promise = self.$fluro.modal({
        component: EventReminderModal,
        options: {
          event,
          slots
        }
      });
    },

    processDefinitionSlots() {
      var self = this;
      var slots = JSON.parse(JSON.stringify(self.model.slots));
      var mappedSlots = {};

      _.each(slots, function (o) {
        mappedSlots[o.title] = o;
      });

      var outputSlots = [];

      _.each(self.knownDefinitionSlots, function (def) {
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
      var knownDefinitions = JSON.parse(JSON.stringify(self.knownDefinitions)); // console.log('KNOWN DEFINITIONS', knownDefinitions)
      //Map all the definitions and slots that we know about

      self.defaultRosters = _.reduce(self.columns, function (set, column) {
        //It's a mapped definition with 'slots' as an array
        _.each(column.rosters, function (simpleDefinition, key) {
          var existingEntry = set[key];

          if (!existingEntry) {
            set[key] = existingEntry = simpleDefinition;
          } ///////////////////////////////////////////////
          //If this column actually has a roster instance


          var rosterInstance = column.rosters[key].roster; ///////////////////////////////////////////////

          if (rosterInstance) {
            //Add any additional slots that might be on the roster but not the definition
            _.each(rosterInstance.slots, function (slot) {
              //If they have an assignment
              if (!slot.assignments || !slot.assignments.length) {
                return;
              }

              var slotName = String(slot.title).toLowerCase();

              var alreadyThere = _.some(existingEntry.slots, function (existingSlot) {
                return slotName == String(existingSlot.title).toLowerCase();
              }); //We Don't already know about this slot


              if (!alreadyThere) {
                slot.dynamic = true;
                existingEntry.slots.push(slot);
              }
            });
          }
        });

        return set;
      }, knownDefinitions);
    },

    createSlotMap(roster) {
      return _.reduce(roster.slots, function (set, slot) {
        slot.slotName = String(slot.title).toLowerCase();
        set[slot.slotName] = slot;
        return set;
      }, {});
    },

    nameSlots(slots) {
      return _.reduce(slots, function (set, slot, index) {
        console.log('MAP NAME SLOTS', slot);
        var slotName = String(slot.title).toLowerCase();
        slot.index = index;
        set[slotName] = slot;
        return set;
      }, {});
    },

    sendRoster(roster) {
      var self = this;

      if (!roster) {
        return;
      } //////////////////////////////////////


      self.$set(roster, 'sending', true);

      var assignments = _.chain(roster.slots).map('assignments').flatten().filter({
        confirmationStatus: 'proposed'
      }).value();

      if (!assignments.length) {
        self.$set(roster, 'sending', false);
        return;
      } //////////////////////////////////////
      //Map each proposed to a promise


      var promises = self.sendAssignments(assignments); //////////////////////////////////////

      Promise.all(promises).then(function (res) {
        self.$set(roster, 'sending', false);
      }).catch(function (err) {
        self.$set(roster, 'sending', false);
      });
    },

    sendAssignments(assignments) {
      var self = this;
      return _.map(assignments, function (assignment) {
        return self.sendAssignment(assignment);
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

    getProposed(roster) {
      if (!roster) {
        return;
      }

      return _.chain(roster.slots).map('assignments').flatten().compact().filter(function (assignment) {
        return assignment.confirmationStatus == 'proposed';
      }).value().length;
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
      return new Promise(function (resolve, reject) {
        //////////////////////////////
        var initialFilter = {
          operator: 'and',
          filters: [{
            operator: 'and',
            filters: [{
              key: 'status',
              comparator: '==',
              value: 'active'
            }]
          }, {
            operator: 'or',
            filters: [{
              key: 'definition',
              comparator: 'in',
              values: ['serviceTeam']
            }, {
              key: 'definition',
              comparator: 'empty'
            }]
          }]
        }; //////////////////////////////  

        self.$fluro.global.select('team', {
          allDefinitions: true,
          maximum: 1,
          minimum: 1,
          filter: initialFilter
        }).then(function (teams) {
          if (!teams || !teams.length) {
            return reject();
          } /////////////////////////////////////////


          self.$fluro.content.get(teams[0]._id).catch(reject).then(function (team) {
            console.log('TEAM ROSTER', roster, team); //////////////////////////////

            var slotCreated;
            var promise = self.$fluro.modal({
              component: TeamSelectModal,
              options: {
                roster,
                team
              }
            }).then(function (assignments) {
              console.log('Add assignments', assignments);

              var promises = _.chain(assignments).map(function (assignment) {
                //Get the slot name 
                var assignmentSlotName = String(assignment.title).toLowerCase(); //Find the matching slot on this roster

                var matchingSlot = _.find(roster.slots, function (slot) {
                  return slot.title.toLowerCase() == assignmentSlotName;
                }); //////////////////////////////////////
                //If there is no matching slot


                if (!matchingSlot) {
                  //Create a new slot
                  matchingSlot = {
                    title: assignment.title,
                    assignments: []
                  }; //Add the slot in

                  roster.slots.push(matchingSlot);
                  slotCreated = true;
                  console.log('Add Slot to roster', roster.slots);
                } //////////////////////////////////////
                //If there is no assignments on this slot


                return new Promise(function (resolve, reject) {
                  //Create the assignment
                  return MultiPlannerService.injectAssignment(roster, assignment).then(function (savedAssignment) {
                    console.log('Created an assignment', savedAssignment);
                    resolve(savedAssignment);
                  }).catch(function (err) {
                    console.log('ERROR', err);
                    resolve(null);
                  });
                });
              }).compact().value(); ///////////////////////////////////


              if (!promises.length) {
                return;
              } ///////////////////////////////////


              if (slotCreated) {
                self.mapDefaultRosters();
              } ///////////////////////////////////


              self.$set(roster, 'sending', true);
              Promise.all(promises).then(function (res) {
                console.log('ALL COMPLETE', res);
                self.$set(roster, 'sending', false);
              }).catch(function (err) {
                console.log('ERROR', err);
                self.$set(roster, 'sending', false);
              });
            }).catch(reject);
          });
        }).catch(reject);
      });
    },

    nudge(type, id) {
      var self = this;
      var id = self.$fluro.utils.getStringID(id);
      var promise = self.$fluro.api.post(`/assignments/nudge/${type}/${id}`); ///////////////////

      promise.then(function (res) {
        if (res.data.success.length) {
          self.$fluro.notify(`${res.data.success.length} Notifications sent`);
        } else {
          self.$fluro.notify(`No nudges were sent`);
        }
      }); ///////////////////

      return promise;
    },

    nudgeRoster(roster) {
      var self = this;
      self.$set(roster, 'nudging', true);
      self.nudge('roster', roster).then(function (res) {
        self.$set(roster, 'nudging', false);
      }).catch(function (err) {
        self.$set(roster, 'nudging', false);
      });
    },

    openModal(item) {
      var self = this;
      self.processing = true;

      function done() {
        self.processing = false;
      }

      var canEdit = self.$fluro.access.canEditItem(item);
      console.log('CANT EDIT', canEdit, item);

      if (canEdit) {
        self.$fluro.global.edit(item, true).then(done, done);
      } else {
        self.$fluro.global.view(item, true).then(done, done);
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

      return self.selected.roster == roster && String(slotName).toLowerCase() == String(self.selected.slot.title).toLowerCase();
    },

    selectSlotCell(slot, slotIndex) {
      console.log('SELECT SLOT CELL');
      var self = this;
      var roster = self.model; //Find the slot

      var findSlot = _.find(roster.slots, function (cell) {
        return String(cell.title).toLowerCase() == String(slot.title).toLowerCase();
      });

      if (!findSlot) {
        findSlot = {
          minimum: slot.minimum,
          maximum: slot.maximum,
          title: slot.title,
          assignments: []
        }; //Let's add it

        roster.slots.splice(slotIndex, 0, findSlot);
        console.log('Upsert cell!', roster._id, roster.event, findSlot);
      } ////////////////////////////////////////


      self.$set(self, 'selected', {
        roster,
        slot: findSlot
      });
    },

    editRosterDefinition(rosterType) {
      console.log('Edit', rosterType);
      var self = this; //Load the definition

      self.$fluro.content.get(rosterType._id).then(function (definition) {
        //Open the modal
        var promise = self.$fluro.modal({
          component: RosterSlotModal,
          options: {
            definition
          }
        }).then(function (updatedDefinition) {
          updatedDefinition.slots = updatedDefinition.data.slots || [];
          self.knownDefinitions[updatedDefinition.definitionName] = updatedDefinition;
          self.mapDefaultRosters(); // self.$set(self.defaultRosters, definition.definitionName, updatedDefinition);
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
        }).catch(function (err) {});
      }); // this.$fluro.global.edit(rosterType, true);
      // this.$actions.open([rosterType])
    }

  }
};

/* script */
const __vue_script__$7 = script$7;

/* template */
var __vue_render__$7 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.definition)?_c('flex-column',[_c('flex-row',[_c('flex-column',[(_vm.proposals.length)?_c('flex-column-header',{scopedSlots:_vm._u([{key:"right",fn:function(){return [(_vm.proposals.length)?_c('v-btn',{staticClass:"ma-0",attrs:{"color":"primary"},on:{"click":function($event){return _vm.sendAssignments(_vm.proposals)}}},[_vm._v("\n                        Send "+_vm._s(_vm.proposals.length)+" proposed\n                        "),_c('fluro-icon',{attrs:{"library":"fas","right":"","icon":"paper-plane"}})],1):_vm._e()]},proxy:true}],null,false,2581186370)}):_vm._e(),_vm._v(" "),_c('flex-column-body',[_c('v-container',[_c('list-group',_vm._l((_vm.model.slots),function(slot,slotIndex){return _c('list-group-item',{key:("" + (slot.title)),staticClass:"pa-3"},[_c('roster-slot-manager',{attrs:{"selected":_vm.isSelectedSlot(_vm.model, slot.title),"definition":_vm.definition,"roster":_vm.model},on:{"selectcell":function($event){return _vm.selectSlotCell(slot, slotIndex)}},nativeOn:{"click":function($event){return _vm.selectSlotCell(slot, slotIndex)}},model:{value:(_vm.model.slots[slotIndex]),callback:function ($$v) {_vm.$set(_vm.model.slots, slotIndex, $$v);},expression:"model.slots[slotIndex]"}})],1)}),1)],1)],1)],1),_vm._v(" "),_c('div',{staticClass:"sidebar"},[_c('roster-sidebar',{model:{value:(_vm.selected),callback:function ($$v) {_vm.selected=$$v;},expression:"selected"}})],1)],1)],1):_vm._e()};
var __vue_staticRenderFns__$7 = [];

  /* style */
  const __vue_inject_styles__$7 = function (inject) {
    if (!inject) return
    inject("data-v-08b20426_0", { source: ".border-top{border-top:1px solid rgba(0,0,0,.05)}.border-right{border-right:1px solid rgba(0,0,0,.05)}.border-bottom{border-bottom:1px solid rgba(0,0,0,.05)}.border-left{border-left:1px solid rgba(0,0,0,.05)}.plan-editor{border-left:2px solid;width:50vw;min-width:400px;display:flex;position:relative;background:#eaebee;box-shadow:0 0 50px rgba(0,0,0,.5);z-index:100}.roster-title{font-size:10px;vertical-align:middle;text-align:right;background:#ced0d7;line-height:22px;padding:4px 10px 4px 8px!important}.slot-cell{width:200px;background:#fafafa;vertical-align:top;border-bottom:1px solid #ced0d7!important;border-right:1px solid #ced0d7}.slot-cell .slot-cell-inner{position:relative;min-height:26px}.slot-cell.selected{box-shadow:0 0 20px #2ad4b9;border-color:2px solid #2ad4b9!important;outline:1px solid #2ad4b9;z-index:100}.slot-cell .slot-assignments{position:absolute;left:0;top:0;bottom:0;right:0;z-index:1}.sidebar{width:320px;flex:none;z-index:100;background:#fff;border-left:1px solid #ced0d7;display:flex}.plan-cell{vertical-align:top;border-right:1px solid #ced0d7;position:relative}.plan-cell .plan-item{background:#fff;display:block;border-bottom:1px solid #ced0d7!important;padding:5px 10px;font-size:12px;text-overflow:ellipsis;white-space:nowrap}.plan-cell .plan-item:hover{background:#fafafa}.add-cell{vertical-align:middle;text-align:center;border-bottom:1px solid #ced0d7!important;border-right:1px solid #ced0d7}.add-cell p{font-size:.8em;display:block;white-space:normal;opacity:.5;padding:5px;width:100%;margin:0}.edit-cell,.mini-buttons{text-align:center;padding:4px}.mini-btn{display:inline-block;border:1px solid #ced0d7;padding:2px 5px;font-size:11px;background:#fff;border-radius:3px;color:inherit}.mini-btn[block]{display:block;text-align:center;margin:1px}.event-details{font-size:12px;padding:10px;text-align:center;background:#fff;border-left:1px solid #ced0d7!important}.event-details:first-child{border-left:none}.event-details .small{font-size:.8em}.roster-default-link{background:#eaebee;font-size:9px;font-weight:500;vertical-align:top;text-align:right;letter-spacing:.05em;border-bottom:1px solid #ced0d7!important}.roster-default-link span{opacity:0}.roster-default-link:hover span{opacity:.5}.date-header{padding:0 10px;text-align:center;font-weight:600;text-transform:uppercase;letter-spacing:.05em;font-size:10px}.date-header .divide-left{border-bottom:1px solid #ced0d7;background:#fff;height:30px;line-height:30px}.time-header{padding:0 10px;height:30px;line-height:30px;text-align:center;font-weight:600;text-transform:uppercase;letter-spacing:.05em;font-size:11px;position:relative;min-width:190px;width:220px;white-space:nowrap;background:#fff;border-left:1px solid #ced0d7}.time-header:first-child{border-left:none}.time-header .realm-bar{display:block;position:absolute;top:auto;left:0;bottom:0;right:0;width:100%;height:3px}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$7 = undefined;
  /* module identifier */
  const __vue_module_identifier__$7 = undefined;
  /* functional template */
  const __vue_is_functional_template__$7 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$7 = __vue_normalize__(
    { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
    __vue_inject_styles__$7,
    __vue_script__$7,
    __vue_scope_id__$7,
    __vue_is_functional_template__$7,
    __vue_module_identifier__$7,
    false,
    __vue_create_injector__,
    undefined,
    undefined
  );

//

var script$8 = {
  mixins: [FluroContentEditMixin],
  components: {
    ReminderEventManager,
    RosterMain: __vue_component__$7
  },
  methods: {
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
    return {};
  }

};

/* script */
const __vue_script__$8 = script$8;

/* template */
var __vue_render__$8 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flex-column',[(_vm.loading)?[_c('fluro-page-preloader',{attrs:{"contain":""}})]:_c('tabset',{attrs:{"justified":true,"vertical":true}},[_c('tab',{attrs:{"heading":"Roster"}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('roster-main',{attrs:{"definition":_vm.definition},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1)],1),_vm._v(" "),(_vm.definition && _vm.definition.fields && _vm.definition.fields.length)?_c('tab',{attrs:{"heading":((_vm.definition.title) + " Information")}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',[_c('constrain',{attrs:{"sm":""}},[_c('fluro-content-form',{attrs:{"options":_vm.options,"fields":_vm.definition.fields},model:{value:(_vm.model.data),callback:function ($$v) {_vm.$set(_vm.model, "data", $$v);},expression:"model.data"}})],1)],1)],1)],1):_vm._e()],1)],2)};
var __vue_staticRenderFns__$8 = [];

  /* style */
  const __vue_inject_styles__$8 = function (inject) {
    if (!inject) return
    inject("data-v-e4402822_0", { source: ".border-top[data-v-e4402822]{border-top:1px solid rgba(0,0,0,.05)}.border-right[data-v-e4402822]{border-right:1px solid rgba(0,0,0,.05)}.border-bottom[data-v-e4402822]{border-bottom:1px solid rgba(0,0,0,.05)}.border-left[data-v-e4402822]{border-left:1px solid rgba(0,0,0,.05)}.hint[data-v-e4402822]{font-size:10px;opacity:.5;color:inherit;display:block}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$8 = "data-v-e4402822";
  /* module identifier */
  const __vue_module_identifier__$8 = undefined;
  /* functional template */
  const __vue_is_functional_template__$8 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$8 = __vue_normalize__(
    { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
    __vue_inject_styles__$8,
    __vue_script__$8,
    __vue_scope_id__$8,
    __vue_is_functional_template__$8,
    __vue_module_identifier__$8,
    false,
    __vue_create_injector__,
    undefined,
    undefined
  );

export default __vue_component__$8;
//# sourceMappingURL=roster-dcf8cc3f.js.map
