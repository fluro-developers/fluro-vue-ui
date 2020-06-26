
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { bh as __vue_normalize__, bi as __vue_create_injector__, bj as _ } from './index-dc949ab4.js';
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
import { F as FluroContentEditMixin } from './FluroContentEditMixin-9aeaa748.js';
import './FluroExclusiveSelector-23df2fb6.js';
import { R as ReminderEventManager } from './ReminderEventManager-1278061a.js';
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
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "slot-placeholder", class: _vm.className }, [
    _vm._v("\n    " + _vm._s(_vm.message) + "\n")
  ])
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-15608d58_0", { source: "/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.slot-placeholder {\n  font-style: italic;\n  font-size: 13px;\n  line-height: 28px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  height: 28px;\n}\n.slot-placeholder.needed {\n  color: #c59626;\n  font-style: italic;\n}\n\n/*# sourceMappingURL=RosterSlotPlaceholderCell.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/edit/components/RosterSlotPlaceholderCell.vue","RosterSlotPlaceholderCell.vue"],"names":[],"mappings":"AAmDA,GAAA;AAYA;EACA,yCAAA;AC7DA;ADgEA;EACA,2CAAA;AC7DA;ADgEA;EACA,4CAAA;AC7DA;ADgEA;EACA,0CAAA;AC7DA;;ADqEA,GAAA;AACA;EACA,kBAAA;EACA,eAAA;EACA,iBAAA;EACA,mBAAA;EACA,gBAAA;EACA,uBAAA;EAOA,YAAA;ACxEA;ADgGA;EAGA,cAAA;EAEA,kBAAA;ACjGA;;AAEA,wDAAwD","file":"RosterSlotPlaceholderCell.vue","sourcesContent":["<template>\n    <div class=\"slot-placeholder\" :class=\"className\">\n        {{message}}\n    </div>\n</template>\n<script>\nexport default {\n    props: {\n        value: {\n            type: Object,\n        }\n    },\n    data() {\n        return {\n            model: this.value,\n        }\n    },\n    computed: {\n        className() {\n\n            if (!this.model) {\n                return;\n            }\n\n            if (this.model.minimum) {\n                return 'needed';\n            }\n        },\n        message() {\n            var self = this;\n\n            if (!self.model) {\n                return;\n            }\n\n            if (self.model.assignments.length) {\n                if (self.model.minimum) {\n                    return `${this.model.minimum} needed for '${this.model.title}'`\n                }\n            } else {\n\n            }\n\n\n            // return this.model.title;\n        }\n    }\n}\n</script>\n<style lang=\"scss\">\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n.slot-placeholder {\n    font-style: italic;\n    font-size: 13px;\n    line-height: 28px;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n\n\n\n    // font-size: 13px;\n    // font-weight: 500;\n    // padding: 0 10px;\n    height: 28px;\n    // line-height: 28px;\n    // white-space: nowrap;\n    // overflow: hidden;\n    // text-overflow: ellipsis;\n    // background: #fff;\n\n    // .status-icon {\n    //  font-size: 0.8em;\n    // }\n\n\n    // &.denied {\n    //     color: darken($danger, 10%);\n    //     border-color: rgba(darken($danger, 10%), 0.3);\n    //     background: lighten($danger, 41%);\n    // }\n\n    // &.confirmed {\n    //     color: darken($success, 10%);\n    //     border-color: rgba(darken($success, 10%), 0.3);\n    //     background: lighten($success, 40%);\n    // }\n\n    &.needed {\n\n        //background: #fdf6df; //desaturate(rgba($warning, 0.05), 15%);\n        color: #c59626;\n        // border-color: rgba(desaturate(darken($warning, 10%), 15%), 0.3);\n        font-style: italic;\n    }\n\n    // &.proposed {\n    //     background: desaturate(lighten($primary, 45%), 5%);\n    //     color: desaturate(darken($primary, 10%), 15%);\n    //     border-color: rgba(desaturate(darken($primary, 10%), 15%), 0.3);\n    // }\n\n    // &.unknown {\n    //  color: rgba(#000, 0.5);\n    //  background: #fff;\n    // }\n\n\n\n\n\n\n\n}\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.slot-placeholder {\n  font-style: italic;\n  font-size: 13px;\n  line-height: 28px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  height: 28px;\n}\n.slot-placeholder.needed {\n  color: #c59626;\n  font-style: italic;\n}\n\n/*# sourceMappingURL=RosterSlotPlaceholderCell.vue.map */"]}, media: undefined });

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
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "assignment-cell-item", class: _vm.confirmationStatus },
    [
      _c("fluro-icon", {
        staticClass: "status-icon",
        attrs: {
          spin: _vm.model.sending,
          icon: _vm.icon,
          library: _vm.iconLibrary
        }
      }),
      _vm._v(" " + _vm._s(_vm.model.contactName) + "\n")
    ],
    1
  )
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = function (inject) {
    if (!inject) return
    inject("data-v-1eebc7b2_0", { source: "/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.assignment-cell-item {\n  cursor: pointer;\n  font-size: 13px;\n  font-weight: 500;\n  padding: 0 10px;\n  height: 26px;\n  line-height: 26px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  background: #fff;\n}\n.assignment-cell-item .status-icon {\n  font-size: 0.8em;\n}\n.assignment-cell-item.denied {\n  color: #be264a;\n  border-color: rgba(190, 38, 74, 0.3);\n  background: #fbedf0;\n}\n.assignment-cell-item.confirmed {\n  color: #36a93a;\n  border-color: rgba(54, 169, 58, 0.3);\n  background: #e7f7e7;\n}\n.assignment-cell-item.warning {\n  background: rgba(226, 152, 92, 0.05);\n  color: #da7d31;\n  border-color: rgba(218, 125, 49, 0.3);\n  font-style: italic;\n}\n.assignment-cell-item.proposed {\n  background: #eafaf7;\n  color: #319a89;\n  border-color: rgba(49, 154, 137, 0.3);\n  animation: pulseprimary 2s infinite;\n}\n.assignment-cell-item.unknown {\n  color: rgba(0, 0, 0, 0.7);\n  background: #fff;\n  border-color: rgba(0, 0, 0, 0.7);\n}\n@keyframes pulseprimary {\n0% {\n    background: #acebe1;\n}\n50% {\n    background: #d5f5f0;\n}\n100% {\n    background: #acebe1;\n}\n}\n\n/*# sourceMappingURL=RosterSlotAssignmentCell.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/edit/components/RosterSlotAssignmentCell.vue","RosterSlotAssignmentCell.vue"],"names":[],"mappings":"AAwEA,GAAA;AAYA;EACA,yCAAA;AClFA;ADqFA;EACA,2CAAA;AClFA;ADqFA;EACA,4CAAA;AClFA;ADqFA;EACA,0CAAA;AClFA;;AD0FA,GAAA;AACA;EACA,eAAA;EACA,eAAA;EACA,gBAAA;EACA,eAAA;EACA,YAAA;EACA,iBAAA;EACA,mBAAA;EACA,gBAAA;EACA,uBAAA;EACA,gBAAA;ACvFA;ADyFA;EACA,gBAAA;ACvFA;AD2FA;EACA,cAAA;EACA,oCAAA;EACA,mBAAA;ACzFA;AD4FA;EACA,cAAA;EACA,oCAAA;EACA,mBAAA;AC1FA;AD6FA;EACA,oCAAA;EACA,cAAA;EACA,qCAAA;EACA,kBAAA;AC3FA;AD8FA;EACA,mBAAA;EACA,cAAA;EACA,qCAAA;EACA,mCAAA;AC5FA;ADgGA;EACA,yBAAA;EACA,gBAAA;EACA,gCAAA;AC9FA;ADsGA;AACA;IACA,mBAAA;ACpGE;ADsGF;IACA,mBAAA;ACpGE;ADsGF;IACA,mBAAA;ACpGE;AACF;;AAEA,uDAAuD","file":"RosterSlotAssignmentCell.vue","sourcesContent":["<template>\n    <div class=\"assignment-cell-item\" :class=\"confirmationStatus\">\n        <fluro-icon class=\"status-icon\" :spin=\"model.sending\" :icon=\"icon\" :library=\"iconLibrary\" /> {{model.contactName}}\n    </div>\n</template>\n<script>\nexport default {\n    props: {\n        value: {\n            type: Object,\n        }\n    },\n    data() {\n        return {\n            model: this.value,\n        }\n    },\n    computed: {\n        confirmationStatus() {\n            return this.model.confirmationStatus;\n        },\n        iconLibrary() {\n\n            var value = 'far';\n\n            switch (this.confirmationStatus) {\n                case 'confirmed':\n                    value = 'far';\n                    break;\n                case 'denied':\n                    // value = 'fas';\n                    break;\n                case 'proposed':\n                    value = 'fas';\n                    break;\n                case 'unknown':\n\n                    break;\n            }\n\n            return value;\n        },\n        icon() {\n\n            var value;\n\n            if(this.model.sending) {\n                return 'spinner-third';\n            }\n\n            switch (this.confirmationStatus) {\n                case 'confirmed':\n                    value = 'check';\n                    break;\n                case 'denied':\n                    value = 'times-square';\n                    break;\n                case 'proposed':\n                    value = 'question-circle';\n                    break;\n                case 'unknown':\n                    value = 'clock';\n                    break;\n            }\n\n            return value;\n        }\n    }\n}\n</script>\n<style lang=\"scss\">\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n.assignment-cell-item {\n    cursor: pointer;\n    font-size: 13px;\n    font-weight: 500;\n    padding: 0 10px;\n    height: 26px;\n    line-height: 26px;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    background: #fff;\n\n    .status-icon {\n    \tfont-size: 0.8em;\n    }\n\n\n    &.denied {\n        color: darken($danger, 10%);\n        border-color: rgba(darken($danger, 10%), 0.3);\n        background: lighten($danger, 41%);\n    }\n\n    &.confirmed {\n        color: darken($success, 10%);\n        border-color: rgba(darken($success, 10%), 0.3);\n        background: lighten($success, 40%);\n    }\n\n    &.warning {\n        background: desaturate(rgba($warning, 0.05), 15%);\n        color: desaturate(darken($warning, 10%), 15%);\n        border-color: rgba(desaturate(darken($warning, 10%), 15%), 0.3);\n        font-style: italic;\n    }\n\n    &.proposed {\n        background: desaturate(lighten($primary, 45%), 5%);\n        color: desaturate(darken($primary, 10%), 15%);\n        border-color: rgba(desaturate(darken($primary, 10%), 15%), 0.3);\n        animation: pulseprimary 2s infinite;\n\n    }\n\n    &.unknown {\n    \tcolor: rgba(#000, 0.7);\n    \tbackground: #fff;\n        border-color: rgba(#000, 0.7);\n    }\n\n\n\n    \n\n\n    @keyframes pulseprimary {\n      0% {\n        background: desaturate(lighten($primary, 30%), 5%);\n      }\n      50% {\n          background: desaturate(lighten($primary, 40%), 5%);\n      }\n      100% {\n          background: desaturate(lighten($primary, 30%), 5%);\n      }\n    }\n\n\n\n\n\n}\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.assignment-cell-item {\n  cursor: pointer;\n  font-size: 13px;\n  font-weight: 500;\n  padding: 0 10px;\n  height: 26px;\n  line-height: 26px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  background: #fff;\n}\n.assignment-cell-item .status-icon {\n  font-size: 0.8em;\n}\n.assignment-cell-item.denied {\n  color: #be264a;\n  border-color: rgba(190, 38, 74, 0.3);\n  background: #fbedf0;\n}\n.assignment-cell-item.confirmed {\n  color: #36a93a;\n  border-color: rgba(54, 169, 58, 0.3);\n  background: #e7f7e7;\n}\n.assignment-cell-item.warning {\n  background: rgba(226, 152, 92, 0.05);\n  color: #da7d31;\n  border-color: rgba(218, 125, 49, 0.3);\n  font-style: italic;\n}\n.assignment-cell-item.proposed {\n  background: #eafaf7;\n  color: #319a89;\n  border-color: rgba(49, 154, 137, 0.3);\n  animation: pulseprimary 2s infinite;\n}\n.assignment-cell-item.unknown {\n  color: rgba(0, 0, 0, 0.7);\n  background: #fff;\n  border-color: rgba(0, 0, 0, 0.7);\n}\n@keyframes pulseprimary {\n  0% {\n    background: #acebe1;\n  }\n  50% {\n    background: #d5f5f0;\n  }\n  100% {\n    background: #acebe1;\n  }\n}\n\n/*# sourceMappingURL=RosterSlotAssignmentCell.vue.map */"]}, media: undefined });

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
var __vue_render__$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "v-layout",
    { attrs: { row: "", wrap: "" } },
    [
      _vm._l(_vm.assignments, function(assignment, index) {
        return _c(
          "v-flex",
          { attrs: { shrink: "" } },
          [
            _c(
              "draggable",
              {
                attrs: {
                  sort: false,
                  group: { name: "assignments", pull: "clone" },
                  clone: _vm.cloneAssignment
                },
                on: { change: _vm.drop },
                model: {
                  value: _vm.assignments,
                  callback: function($$v) {
                    _vm.assignments = $$v;
                  },
                  expression: "assignments"
                }
              },
              [
                _c("roster-slot-assignment-cell", {
                  key: assignment._id,
                  staticClass: "assignment-chip",
                  model: {
                    value: _vm.assignments[index],
                    callback: function($$v) {
                      _vm.$set(_vm.assignments, index, $$v);
                    },
                    expression: "assignments[index]"
                  }
                })
              ],
              1
            )
          ],
          1
        )
      }),
      _vm._v(" "),
      !_vm.assignments.length
        ? _c(
            "v-flex",
            { attrs: { grow: "" } },
            [
              _c("draggable", {
                attrs: {
                  sort: false,
                  group: { name: "assignments", pull: "clone" },
                  clone: _vm.cloneAssignment
                },
                on: { change: _vm.drop },
                model: {
                  value: _vm.assignments,
                  callback: function($$v) {
                    _vm.assignments = $$v;
                  },
                  expression: "assignments"
                }
              })
            ],
            1
          )
        : _vm._e()
    ],
    2
  )
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  const __vue_inject_styles__$2 = function (inject) {
    if (!inject) return
    inject("data-v-7fd61138_0", { source: "/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.assignment-chip {\n  border: 1px solid #fefefe;\n  height: 36px;\n  line-height: 36px;\n  margin: 12px;\n}\n\n/*# sourceMappingURL=RosterSlotCell.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/edit/components/RosterSlotCell.vue","RosterSlotCell.vue"],"names":[],"mappings":"AAiNA,GAAA;AAYA;EACA,yCAAA;AC3NA;AD8NA;EACA,2CAAA;AC3NA;AD8NA;EACA,4CAAA;AC3NA;AD8NA;EACA,0CAAA;AC3NA;;ADmOA,GAAA;AACA;EACA,yBAAA;EACA,YAAA;EACA,iBAAA;EACA,YAAA;AChOA;;AAEA,6CAA6C","file":"RosterSlotCell.vue","sourcesContent":["<template>\n    <v-layout row wrap>\n        <!-- class=\"slot-cell\" :class=\"{selected:selected}\" -->\n        <!-- class=\"slot-cell-inner\" -->\n        <v-flex v-for=\"(assignment, index) in assignments\" shrink>\n            <draggable :sort=\"false\" :group=\"{ name: 'assignments', pull: 'clone' }\" @change=\"drop\" :clone=\"cloneAssignment\" v-model=\"assignments\">\n                <roster-slot-assignment-cell class=\"assignment-chip\" :key=\"assignment._id\" v-model=\"assignments[index]\" />\n            </draggable>\n        </v-flex>\n        <v-flex v-if=\"!assignments.length\" grow>\n            <draggable :sort=\"false\" :group=\"{ name: 'assignments', pull: 'clone' }\" @change=\"drop\" :clone=\"cloneAssignment\" v-model=\"assignments\">\n            </draggable>\n        </v-flex>\n    </v-layout>\n</template>\n<script>\nimport RosterSlotPlaceholderCell from 'src/components/content/edit/components/RosterSlotPlaceholderCell.vue';\nimport RosterSlotAssignmentCell from 'src/components/content/edit/components/RosterSlotAssignmentCell.vue';\nimport MultiPlannerService from 'src/components/content/edit/services/MultiPlannerService.js';\nimport draggable from 'vuedraggable';\nimport _ from 'lodash';\n\nexport default {\n    components: {\n        RosterSlotAssignmentCell,\n        RosterSlotPlaceholderCell,\n        draggable,\n    },\n    props: {\n        'definition': {\n            type: Object,\n            required: true,\n        },\n        'roster': {\n            type: Object,\n            required: true,\n        },\n        'position': {\n            type: Object,\n            required: true,\n        },\n        'selected': {\n            type: Boolean,\n        },\n    },\n    created() {\n\n\n        var self = this;\n\n        /////////////////////////////////////////\n\n        if (!self.roster.slots) {\n\n            var slotCopy = _.map(JSON.parse(JSON.stringify(self.definition.slots)), function(slot) {\n                slot.assignments = [];\n                return slot;\n            })\n\n            console.log('CREATED SLOT', slotCopy);\n            self.$set(self.roster, 'slots', slotCopy);\n        }\n    },\n    computed: {\n        slotMap() {\n            var self = this;\n\n            if (!self.roster) {\n                return {};\n            }\n\n            return _.reduce(self.roster.slots, function(set, slot) {\n                var stringName = String(slot.title).toLowerCase();\n                set[stringName] = slot;\n\n                return set;\n            }, {})\n        },\n        slot() {\n            var self = this;\n\n            var positionLowerCase = String(self.position.title).toLowerCase();\n            var match = self.slotMap[positionLowerCase];\n\n            //////////////////////////////////////////////////////////////////\n\n            if (match) {\n                match.style = 'self';\n            } else {\n\n\n\n                //Find the default setup for this slot\n                var defaultSlot = _.find(self.definition.slots, function(slot) {\n                    return String(slot.title).toLowerCase() == positionLowerCase;\n                });\n\n                var copy = JSON.parse(JSON.stringify(defaultSlot));\n                copy.assignments = [];\n                copy.style = 'default';\n\n\n                return copy;\n            }\n\n            return match;\n        },\n        assignments: {\n            get() {\n                var self = this;\n                return self.slot.assignments;\n            },\n            set(array) {\n                this.slot.assignments = array;\n            }\n        },\n        contactIDs() {\n            var self = this;\n            return _.reduce(self.assignments, function(set, assignment) {\n\n                if (!assignment._id || assignment._id == 'placeholder') {\n                    return set;\n                }\n\n                var contactID = self.$fluro.utils.getStringID(assignment.contact);\n                set[contactID] = true;\n\n                return set;\n            }, {});\n        },\n\n    },\n    data() {\n        return {\n            chosen: false,\n        }\n    },\n    methods: {\n\n        alreadyRostered(contactID) {\n\n            var self = this;\n            var contactID = self.$fluro.utils.getStringID(contactID);\n            return self.contactIDs[contactID]\n        },\n        remove(assignment) {\n            var self = this;\n            var index = _.indexOf(self.assignments, assignment)\n            self.assignments.splice(index, 1);\n        },\n        drop($event) {\n\n            if (!$event.added) {\n                console.log('Nothing added')\n                return;\n            }\n\n            var self = this;\n            var rosterID = this.roster._id;\n            var dropAssignment = $event.added.element;\n\n            //////////////////////////////////////////\n\n            //Check if this contact is already assigned to this slot\n            var alreadyRostered = self.alreadyRostered(dropAssignment.contact);\n            if (alreadyRostered) {\n                //If it is just remove the placeholder\n                console.log('Already rostered!');\n                return self.remove(dropAssignment);\n            }\n\n            //////////////////////////////////////////\n\n            var details = {\n                title: this.slot.title,\n                contact: dropAssignment.contact,\n                contactName: dropAssignment.contactName,\n                confirmationStatus: 'proposed',\n                sending: true,\n            }\n\n            //////////////////////////////////////////\n\n            MultiPlannerService.createAssignment(rosterID, self.assignments, details, true)\n                .then(function(savedAssignment) {\n                    savedAssignment.sending = false;\n                    details.sending = false;\n                    _.assign(dropAssignment, savedAssignment)\n                    console.log('Assignment dropped', self.assignments, dropAssignment);\n                })\n                .catch(function(err) {\n                    console.log('ERROR', err);\n                    self.remove(dropAssignment);\n                })\n\n\n        },\n        cloneAssignment(source) {\n\n            var cloned = JSON.parse(JSON.stringify(source));\n            cloned._id = 'placeholder';\n            cloned.sending = true;\n            return cloned;\n        }\n    },\n}\n</script>\n<style lang=\"scss\">\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n.assignment-chip {\n    border: 1px solid #fefefe;\n    height: 36px;\n    line-height: 36px;\n    margin: 12px;\n    // max-width: 50px;\n}\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.assignment-chip {\n  border: 1px solid #fefefe;\n  height: 36px;\n  line-height: 36px;\n  margin: 12px;\n}\n\n/*# sourceMappingURL=RosterSlotCell.vue.map */"]}, media: undefined });

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
var __vue_render__$3 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "v-layout",
    {
      attrs: { row: "" },
      nativeOn: {
        click: function($event) {
          return _vm.$emit("selectcell")
        }
      }
    },
    [
      _c(
        "v-flex",
        {
          staticClass: "slot-title sm4",
          class: { dynamic: _vm.model.dynamic },
          attrs: { shrink: "" }
        },
        [
          _c(
            "div",
            { staticClass: "slot-attributes" },
            [
              _c("span", { staticClass: "h4 position-title" }, [
                _vm._v(_vm._s(_vm.model.title))
              ]),
              _vm._v(" "),
              _vm.model.optOutBehaviour == "disabled"
                ? _c("fluro-icon", {
                    directives: [{ name: "tippy", rawName: "v-tippy" }],
                    staticClass: "brand-danger",
                    attrs: {
                      content: "Opt out is disabled",
                      icon: "times-square"
                    }
                  })
                : _vm._e(),
              _vm._v(" "),
              _vm.model.confirmationBehaviour == "confirm"
                ? _c("fluro-icon", {
                    directives: [{ name: "tippy", rawName: "v-tippy" }],
                    staticClass: "brand-success",
                    attrs: { content: "Autoconfirm", icon: "check-square" }
                  })
                : _vm._e(),
              _vm._v(" "),
              _vm.model.requireCapabilities &&
              _vm.model.requireCapabilities.length
                ? _c("fluro-icon", {
                    directives: [{ name: "tippy", rawName: "v-tippy" }],
                    staticClass: "brand-warning",
                    attrs: {
                      content: "Requires Capabilities",
                      icon: "exclamation-square"
                    }
                  })
                : _vm._e()
            ],
            1
          ),
          _vm._v(" "),
          _c("roster-slot-placeholder-cell", {
            model: {
              value: _vm.model,
              callback: function($$v) {
                _vm.model = $$v;
              },
              expression: "model"
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-flex",
        { staticClass: "sm8" },
        [
          _c("roster-slot-cell", {
            attrs: {
              position: _vm.model,
              definition: _vm.definition.data,
              roster: _vm.roster,
              selected: _vm.selected
            },
            nativeOn: {
              click: function($event) {
                return _vm.$emit("selectcell")
              }
            }
          })
        ],
        1
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

  /* style */
  const __vue_inject_styles__$3 = function (inject) {
    if (!inject) return
    inject("data-v-52854912_0", { source: "/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.slot-attributes {\n  line-height: inherit;\n}\n.slot-attributes .brand-success {\n  color: #4cc650;\n}\n.slot-attributes .brand-danger {\n  color: #d93e63;\n}\n.slot-attributes .brand-warning {\n  color: #f0974e;\n}\n.position-title {\n  text-transform: none;\n  margin-right: 10px;\n}\n\n/*# sourceMappingURL=RosterSlotManager.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/edit/components/RosterSlotManager.vue","RosterSlotManager.vue"],"names":[],"mappings":"AAoDA,GAAA;AAYA;EACA,yCAAA;AC9DA;ADiEA;EACA,2CAAA;AC9DA;ADiEA;EACA,4CAAA;AC9DA;ADiEA;EACA,0CAAA;AC9DA;;ADsEA,GAAA;AACA;EACA,oBAAA;ACnEA;ADqEA;EACA,cAnCA;AChCA;ADsEA;EACA,cArCA;AC/BA;ADuEA;EACA,cA1CA;AC3BA;ADyEA;EACA,oBAAA;EACA,kBAAA;ACtEA;;AAEA,gDAAgD","file":"RosterSlotManager.vue","sourcesContent":["<template>\n    <v-layout row @click.native=\"$emit('selectcell')\">\n        <v-flex class=\"slot-title sm4\" :class=\"{dynamic: model.dynamic}\" shrink>\n                <div class=\"slot-attributes\">\n                    <span class=\"h4 position-title\">{{model.title}}</span>\n                    <fluro-icon v-tippy content=\"Opt out is disabled\" icon=\"times-square\" class=\"brand-danger\" v-if=\"model.optOutBehaviour == 'disabled'\" />\n                    <fluro-icon v-tippy content=\"Autoconfirm\" icon=\"check-square\" class=\"brand-success\" v-if=\"model.confirmationBehaviour == 'confirm'\" />\n                    <fluro-icon v-tippy content=\"Requires Capabilities\" icon=\"exclamation-square\" class=\"brand-warning\" v-if=\"model.requireCapabilities && model.requireCapabilities.length\" />\n                </div>\n            </span>\n            <roster-slot-placeholder-cell v-model=\"model\" />\n        </v-flex>\n        <v-flex class=\"sm8\">\n            <roster-slot-cell :position=\"model\" :definition=\"definition.data\" :roster=\"roster\" @click.native=\"$emit('selectcell')\" :selected=\"selected\" />\n        </v-flex>\n    </v-layout>\n</template>\n<script>\nimport RosterSlotPlaceholderCell from 'src/components/content/edit/components/RosterSlotPlaceholderCell.vue';\nimport RosterSlotCell from 'src/components/content/edit/components/RosterSlotCell.vue';\nexport default {\n    props: {\n        selected: {\n            type: Boolean,\n            default: false,\n        },\n        definition: {\n            required: false,\n        },\n        value: {\n            type: Object,\n            required: true\n        },\n        roster: {\n            type: Object,\n            required: true\n        },\n    },\n    components: {\n        RosterSlotPlaceholderCell,\n        RosterSlotCell\n    },\n    methods: {},\n    data() {\n        return {\n            model: this.value\n        }\n    }\n}\n</script>\n<style lang=\"scss\">\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n.slot-attributes {\n    line-height: inherit;\n\n    .brand-success {\n        color: $success;\n    }\n\n    .brand-danger {\n        color: $danger;\n    }\n\n    .brand-warning {\n        color: $warning;\n    }\n}\n\n.position-title {\n    text-transform: none;\n    margin-right: 10px;\n}\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.slot-attributes {\n  line-height: inherit;\n}\n.slot-attributes .brand-success {\n  color: #4cc650;\n}\n.slot-attributes .brand-danger {\n  color: #d93e63;\n}\n.slot-attributes .brand-warning {\n  color: #f0974e;\n}\n\n.position-title {\n  text-transform: none;\n  margin-right: 10px;\n}\n\n/*# sourceMappingURL=RosterSlotManager.vue.map */"]}, media: undefined });

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
var __vue_render__$4 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "suggestion-list-item" },
    [
      _c(
        "v-menu",
        {
          attrs: { left: "", "offset-x": "", "open-on-hover": true },
          scopedSlots: _vm._u([
            {
              key: "activator",
              fn: function(ref) {
                var on = ref.on;
                return [
                  _c(
                    "v-layout",
                    _vm._g({ attrs: { "align-center": "" } }, on),
                    [
                      _c(
                        "v-flex",
                        { staticClass: "face", attrs: { shrink: "" } },
                        [
                          _c("fluro-realm-bar", {
                            attrs: { realm: _vm.model.realms }
                          }),
                          _vm._v(" "),
                          _vm.isLoading
                            ? _c("v-progress-circular", {
                                attrs: { indeterminate: "" }
                              })
                            : _c("fluro-avatar", {
                                attrs: { md: "", id: _vm.model }
                              })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c("v-flex", [
                        _c("div", [
                          _c("strong", [_vm._v(_vm._s(_vm.model.title))]),
                          _vm._v(" "),
                          _c("div", { staticClass: "summary" }, [
                            _vm._v(_vm._s(_vm.summary))
                          ])
                        ])
                      ]),
                      _vm._v(" "),
                      _c("v-flex", { attrs: { shrink: "" } }, [
                        _c("div", { staticClass: "btn-group" }, [
                          _c(
                            "span",
                            {
                              staticClass: "btn",
                              attrs: { xs: "" },
                              on: {
                                click: function($event) {
                                  $event.stopPropagation();
                                  $event.preventDefault();
                                  return _vm.$actions.open([_vm.model])
                                }
                              }
                            },
                            [
                              _c("fluro-icon", {
                                attrs: { icon: "ellipsis-h" }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "span",
                            { staticClass: "btn", attrs: { xs: "" } },
                            [_c("fluro-icon", { attrs: { icon: "plus" } })],
                            1
                          )
                        ])
                      ])
                    ],
                    1
                  )
                ]
              }
            }
          ])
        },
        [
          _vm._v(" "),
          _c("div", { staticClass: "suggestion-roster-summary" }, [
            _c("h5", [_vm._v(_vm._s(_vm.model.title))]),
            _vm._v(" "),
            _vm.assignmentsExplanation
              ? _c("div", { staticClass: "suggestion-roster-summary-group" }, [
                  _c(
                    "h6",
                    [
                      _c("fluro-icon", {
                        staticClass: "icon",
                        attrs: { library: "fas", type: "assignment" }
                      }),
                      _vm._v("Already Declined")
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("div", {
                    domProps: { innerHTML: _vm._s(_vm.assignmentsExplanation) }
                  })
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.teams
              ? _c("div", { staticClass: "suggestion-roster-summary-group" }, [
                  _c(
                    "h6",
                    [
                      _c("fluro-icon", {
                        staticClass: "icon",
                        attrs: { library: "fas", type: "team" }
                      }),
                      _vm._v(
                        " Is '" +
                          _vm._s(_vm.assignmentSlot.title) +
                          "' position in"
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("div", { domProps: { innerHTML: _vm._s(_vm.teams) } })
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.capabilities
              ? _c("div", { staticClass: "suggestion-roster-summary-group" }, [
                  _c(
                    "h6",
                    [
                      _c("fluro-icon", {
                        staticClass: "icon",
                        attrs: { library: "fas", type: "capability" }
                      }),
                      _vm._v("Capabilities")
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("div", {
                    domProps: { innerHTML: _vm._s(_vm.capabilities) }
                  })
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.conflicts.length
              ? _c(
                  "div",
                  { staticClass: "suggestion-roster-summary-group" },
                  [
                    _c(
                      "h6",
                      [
                        _c("fluro-icon", {
                          staticClass: "icon",
                          attrs: { library: "fas", icon: "exclamation-circle" }
                        }),
                        _vm._v(" Conflicts")
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _vm._l(_vm.conflicts, function(assignment) {
                      return _c("div", [
                        _c("strong", [_vm._v(_vm._s(assignment.title))]),
                        _vm._v(" at "),
                        _c("strong", [
                          _vm._v(
                            _vm._s(
                              _vm._f("formatDate")(
                                assignment.event.startDate,
                                "h:mma"
                              )
                            ) +
                              " - '" +
                              _vm._s(assignment.event.title) +
                              "'"
                          )
                        ])
                      ])
                    })
                  ],
                  2
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.prior
              ? _c("div", { staticClass: "suggestion-roster-summary-group" }, [
                  _c(
                    "h6",
                    [
                      _c("fluro-icon", {
                        staticClass: "icon",
                        attrs: { library: "fas", type: "angle-left" }
                      }),
                      _vm._v(" Prior Assignment")
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("div", { domProps: { innerHTML: _vm._s(_vm.prior) } })
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.next
              ? _c("div", { staticClass: "suggestion-roster-summary-group" }, [
                  _c(
                    "h6",
                    [
                      _c("fluro-icon", {
                        staticClass: "icon",
                        attrs: { library: "fas", type: "angle-right" }
                      }),
                      _vm._v(" Next Assignment")
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("div", { domProps: { innerHTML: _vm._s(_vm.next) } })
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.lacks.length
              ? _c("div", { staticClass: "suggestion-roster-summary-group" }, [
                  _c(
                    "h6",
                    [
                      _c("fluro-icon", {
                        staticClass: "icon",
                        attrs: { library: "fas", type: "frown" }
                      }),
                      _vm._v(" Lacks required capability")
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("div", [_c("Strong", [_vm._v(_vm._s(_vm.lacks))])], 1)
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.periods.length
              ? _c(
                  "div",
                  { staticClass: "suggestion-roster-summary-group" },
                  [
                    _c(
                      "h6",
                      [
                        _c("fluro-icon", {
                          staticClass: "icon",
                          attrs: { library: "fas", type: "times-circle" }
                        }),
                        _vm._v(" Unavailable")
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _vm._l(_vm.periods, function(period) {
                      return _c("div", [
                        _vm._v(
                          "\n                    " +
                            _vm._s(period.description) +
                            " "
                        ),
                        _c("strong", [
                          _vm._v(_vm._s(_vm._f("readableEventDate")(period)))
                        ])
                      ])
                    })
                  ],
                  2
                )
              : _vm._e()
          ])
        ]
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$4 = [];
__vue_render__$4._withStripped = true;

  /* style */
  const __vue_inject_styles__$4 = function (inject) {
    if (!inject) return
    inject("data-v-0a780b3c_0", { source: "/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.suggestion-list-item {\n  position: relative;\n  padding: 7px 10px;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n  line-height: 1.4;\n  cursor: pointer;\n}\n.suggestion-list-item:last-child {\n  border-bottom: none;\n}\n.suggestion-list-item:hover {\n  background: rgba(0, 0, 0, 0.05);\n}\n.suggestion-list-item .face {\n  flex: none;\n  padding-right: 10px;\n}\n.suggestion-list-item .summary {\n  font-size: 0.8em;\n  opacity: 0.5;\n}\n.suggestion-roster-summary {\n  background: #111;\n  color: #ccc;\n  padding: 10px 5px;\n  letter-spacing: -0.03em;\n  font-size: 12px;\n  width: 250px;\n  overflow: hidden;\n}\n.suggestion-roster-summary h4,\n.suggestion-roster-summary h5,\n.suggestion-roster-summary h6,\n.suggestion-roster-summary strong {\n  color: #fff;\n}\n.suggestion-roster-summary .suggestion-roster-summary-group {\n  padding-top: 10px;\n  margin-top: 5px;\n  border-top: 1px solid rgba(255, 255, 255, 0.1);\n  line-height: 1.4;\n}\n.suggestion-roster-summary .suggestion-roster-summary-group .icon {\n  font-size: 9px;\n  line-height: inherit;\n  margin-right: 5px;\n  display: none;\n}\n.suggestion-roster-summary .suggestion-roster-summary-group h6 {\n  text-transform: uppercase;\n  font-size: 10px;\n  font-weight: 600;\n  letter-spacing: 0.03em;\n  margin-bottom: 5px;\n}\n\n/*# sourceMappingURL=RosterSlotSuggestionListItem.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/edit/components/RosterSlotSuggestionListItem.vue","RosterSlotSuggestionListItem.vue"],"names":[],"mappings":"AAmSA,GAAA;AAYA;EACA,yCAAA;AC7SA;ADgTA;EACA,2CAAA;AC7SA;ADgTA;EACA,4CAAA;AC7SA;ADgTA;EACA,0CAAA;AC7SA;;ADqTA,GAAA;AACA;EAEA,kBAAA;EACA,iBAAA;EACA,2CAAA;EACA,gBAAA;EACA,eAAA;ACnTA;ADqTA;EACA,mBAAA;ACnTA;ADsTA;EACA,+BAAA;ACpTA;ADuTA;EACA,UAAA;EACA,mBAAA;ACrTA;ADwTA;EACA,gBAAA;EACA,YAAA;ACtTA;AD2TA;EACA,gBAAA;EACA,WAAA;EACA,iBAAA;EACA,uBAAA;EACA,eAAA;EACA,YAAA;EACA,gBAAA;ACxTA;AD0TA;;;;EAIA,WAAA;ACxTA;AD2TA;EACA,iBAAA;EACA,eAAA;EACA,8CAAA;EACA,gBAAA;ACzTA;AD2TA;EACA,cAAA;EACA,oBAAA;EACA,iBAAA;EACA,aAAA;ACzTA;AD4TA;EACA,yBAAA;EACA,eAAA;EACA,gBAAA;EACA,sBAAA;EACA,kBAAA;AC1TA;;AAEA,2DAA2D","file":"RosterSlotSuggestionListItem.vue","sourcesContent":["<template>\n    <div class=\"suggestion-list-item\">\n        <v-menu left offset-x :open-on-hover=\"true\">\n            <template v-slot:activator=\"{ on }\">\n                <v-layout v-on=\"on\" align-center>\n                    <v-flex shrink class=\"face\">\n                        <fluro-realm-bar :realm=\"model.realms\" />\n                        <v-progress-circular indeterminate v-if=\"isLoading\" />\n                        <fluro-avatar md :id=\"model\" v-else />\n                    </v-flex>\n                    <v-flex>\n                        <div>\n                            <strong>{{model.title}}</strong>\n                            <div class=\"summary\">{{summary}}</div>\n                        </div>\n                    </v-flex>\n                    <v-flex shrink >\n                        <div class=\"btn-group\">\n                            <span class=\"btn\" @click.stop.prevent=\"$actions.open([model])\" xs>\n                                <fluro-icon icon=\"ellipsis-h\" />\n                            </span>\n                            <span class=\"btn\" xs>\n                                <fluro-icon icon=\"plus\" />\n                            </span>\n                        </div>\n                    </v-flex>\n                </v-layout>\n            </template>\n            <div class=\"suggestion-roster-summary\">\n                <h5>{{model.title}}</h5>\n                <div class=\"suggestion-roster-summary-group\" v-if=\"assignmentsExplanation\">\n                    <h6>\n                        <fluro-icon library=\"fas\" class=\"icon\" type=\"assignment\" />Already Declined</h6>\n                    <div v-html=\"assignmentsExplanation\" />\n                </div>\n                <div class=\"suggestion-roster-summary-group\" v-if=\"teams\">\n                    <h6>\n                        <fluro-icon library=\"fas\" class=\"icon\" type=\"team\" /> Is '{{assignmentSlot.title}}' position in</h6>\n                    <div v-html=\"teams\" />\n                </div>\n                <div class=\"suggestion-roster-summary-group\" v-if=\"capabilities\">\n                    <h6>\n                        <fluro-icon library=\"fas\" class=\"icon\" type=\"capability\" />Capabilities</h6>\n                    <div v-html=\"capabilities\" />\n                </div>\n                <div class=\"suggestion-roster-summary-group\" v-if=\"conflicts.length\">\n                    <h6>\n                        <fluro-icon library=\"fas\" class=\"icon\" icon=\"exclamation-circle\" /> Conflicts</h6>\n                    <div v-for=\"assignment in conflicts\">\n                        <strong>{{assignment.title}}</strong> at <strong>{{assignment.event.startDate | formatDate('h:mma')}} - '{{assignment.event.title}}'</strong>\n                    </div>\n                </div>\n                <div class=\"suggestion-roster-summary-group\" v-if=\"prior\">\n                    <h6>\n                        <fluro-icon library=\"fas\" class=\"icon\" type=\"angle-left\" /> Prior Assignment</h6>\n                    <div v-html=\"prior\"></div>\n                </div>\n                <div class=\"suggestion-roster-summary-group\" v-if=\"next\">\n                    <h6>\n                        <fluro-icon library=\"fas\" class=\"icon\" type=\"angle-right\" /> Next Assignment</h6>\n                    <div v-html=\"next\"></div>\n                </div>\n                <div class=\"suggestion-roster-summary-group\" v-if=\"lacks.length\">\n                    <h6>\n                        <fluro-icon library=\"fas\" class=\"icon\" type=\"frown\" /> Lacks required capability</h6>\n                    <div><Strong>{{lacks}}</Strong></div>\n                </div>\n                <div class=\"suggestion-roster-summary-group\" v-if=\"periods.length\">\n                    <h6>\n                        <fluro-icon library=\"fas\" class=\"icon\" type=\"times-circle\" /> Unavailable</h6>\n                    <div v-for=\"period in periods\">\n                        {{period.description}} <strong>{{period | readableEventDate}}</strong>\n                    </div>\n                </div>\n            </div>\n        </v-menu>\n    </div>\n</template>\n<script>\nimport moment from 'moment';\nimport _ from 'lodash';\n\nexport default {\n    props: {\n        assignmentSlot: {\n            type: Object,\n        },\n        event: {\n            type: Object,\n        },\n        value: {\n            type: Object,\n        }\n    },\n    data() {\n        return {\n            model: this.value,\n        }\n    },\n    watch: {\n        value(val) {\n            this.model = val;\n        },\n    },\n    methods: {\n        timeDifference(date1, date2) {\n\n            var measure = moment(date1).from(date2, true);\n            if (date1 < date2) {\n                return measure + ' before this event';\n            } else {\n                return measure + ' after this event';\n            }\n\n        },\n    },\n    computed: {\n        isLoading() {\n            var self = this;\n            return self.model.loading;\n        },\n        conflictExplanation() {\n            var self = this;\n\n            if (!self.assignments || !self.assignments.length) {\n                return;\n            }\n\n            var reasonsMap = self.declinedReasons;\n            return `<strong>${_.values(reasonsMap.descriptions).join(', ')}</strong> (${_.values(reasonsMap.positions).join(', ')})`\n        },\n        assignmentsExplanation() {\n            var self = this;\n\n            if (!self.assignments || !self.assignments.length) {\n                return;\n            }\n\n            var reasonsMap = self.declinedReasons;\n            return `<strong>${_.values(reasonsMap.descriptions).join(', ')}</strong> (${_.values(reasonsMap.positions).join(', ')})`\n        },\n        declinedReasons() {\n\n            var self = this;\n\n            return _.reduce(self.assignments, function(set, assignment) {\n\n                var description = assignment.description || 'Unavailable.';\n                var position = assignment.title;\n\n                if (!set.descriptions[description.toLowerCase()]) {\n                    set.descriptions[description.toLowerCase()] = description;\n                }\n\n                if (!set.positions[position.toLowerCase()]) {\n                    set.positions[position.toLowerCase()] = position;\n                }\n\n                return set;\n            }, {\n                descriptions: {},\n                positions: {},\n            })\n        },\n        teams() {\n            return this.model.teams && this.model.teams.length ? this.model.teams.join(', ') : null;\n        },\n        capabilities() {\n            return this.model.capabilities && this.model.capabilities.length ? _.map(this.model.capabilities, 'title').join(', ') : null;\n        },\n        endDate() {\n            return new Date(this.event.endDate);\n        },\n        startDate() {\n            return new Date(this.event.startDate);\n        },\n        prior() {\n            var self = this;\n            var model = self.model;\n\n            if (!model.previous) {\n                return;\n            }\n\n            var previousDate = new Date(model.previous.endDate);\n            var difference = moment(self.endDate).from(previousDate, true);\n            var assignmentName = model.previous.assignmentName;\n            var eventName = model.previous.title;\n            var eventTime = moment(model.previous.startDate).format('h:mma');\n\n            return `<strong>'${assignmentName}'</strong> at <strong>${eventTime} '${eventName}'</strong> ending <strong>${difference} before</strong> this event`;\n            // return `<strong>${eventName}</strong><br/>ends <strong>${difference} before</strong> this event`;\n        },\n        next() {\n            var self = this;\n            var model = self.model;\n\n            if (!model.next) {\n                return;\n            }\n\n            var nextDate = new Date(model.next.startDate);\n            var difference = moment(self.endDate).from(nextDate, true);\n            var assignmentName = model.next.assignmentName;\n            var eventName = model.next.title;\n            var eventTime = moment(nextDate).format('h:mma');\n\n            return `<strong>'${assignmentName}'</strong> at <strong>${eventTime} '${eventName}'</strong> starts <strong>${difference} after</strong> this event`;\n            // return `<strong>${eventName}</strong><br/>starts <strong>${difference} after</strong> this event`;\n        },\n        conflicts() {\n            var self = this;\n            return self.model && self.model.conflicts ? self.model.conflicts : [];\n        },\n        lacks() {\n            var self = this;\n            return self.model && self.model.lacks ? self.model.lacks : [];\n        },\n        periods() {\n            var self = this;\n            return self.model && self.model.periods ? self.model.periods : [];\n        },\n        assignments() {\n\n            var self = this;\n            return self.model && self.model.assignments ? self.model.assignments : [];\n        },\n        summary() {\n            var self = this;\n\n            ////////////////////////////////////\n\n            if (self.conflicts && self.conflicts.length) {\n\n                if (self.conflicts.length > 3) {\n                    return `Already rostered to ${self.conflicts.length} other positions`\n                } else {\n                    var names = _.map(self.conflicts, 'title').join(', ');\n                    return `Already rostered as ${names}`\n                }\n            }\n\n\n\n            ////////////////////////////////////\n\n\n            if (self.lacks && self.lacks.length) {\n                return `Lacks ${self.lacks}`;\n            }\n\n\n            var periods = self.periods;\n\n\n\n            if (periods && periods.length) {\n                return _.map(periods, function(period) {\n                        console.log('PERIOD', period);\n                        return `${period.description || 'Unavailable.'} ${self.$fluro.date.readableEventDate(period)}`;\n                    })\n                    .join(', ');\n            }\n\n\n            var declinedAssignments = self.assignments;\n            if (declinedAssignments && declinedAssignments.length) {\n\n                var reasonsMap = self.declinedReasons;\n                return `${_.values(reasonsMap.descriptions).join(', ')} (${_.values(reasonsMap.positions).join(', ')})`\n\n\n\n            }\n\n\n            if (!self.model.closest) {\n                return `Hasn't served as '${self.assignmentSlot.title}' before`;\n            }\n\n\n\n            return `Assigned ${self.timeDifference(self.model.closest.endDate, self.event.startDate)}`;\n            // {{contact.closest.endDate | timedifference:service.selected.event.startDate}}`;\n\n        }\n    }\n}\n</script>\n<style lang=\"scss\">\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n.suggestion-list-item {\n    // display: flex;\n    position: relative;\n    padding: 7px 10px;\n    border-bottom: 1px solid rgba(#000, 0.1);\n    line-height: 1.4;\n    cursor: pointer;\n\n    &:last-child {\n        border-bottom: none;\n    }\n\n    &:hover {\n        background: rgba(#000, 0.05);\n    }\n\n    .face {\n        flex: none;\n        padding-right: 10px;\n    }\n\n    .summary {\n        font-size: 0.8em;\n        opacity: 0.5;\n    }\n}\n\n\n.suggestion-roster-summary {\n    background: #111;\n    color: #ccc;\n    padding: 10px 5px;\n    letter-spacing: -0.03em;\n    font-size: 12px;\n    width: 250px;\n    overflow: hidden;\n\n    h4,\n    h5,\n    h6,\n    strong {\n        color: #fff;\n    }\n\n    .suggestion-roster-summary-group {\n        padding-top: 10px;\n        margin-top: 5px;\n        border-top: 1px solid rgba(#fff, 0.1);\n        line-height: 1.4;\n\n        .icon {\n            font-size: 9px;\n            line-height: inherit;\n            margin-right: 5px;\n            display: none;\n        }\n\n        h6 {\n            text-transform: uppercase;\n            font-size: 10px;\n            font-weight: 600;\n            letter-spacing: 0.03em;\n            margin-bottom: 5px;\n\n\n\n        }\n    }\n\n\n}\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.suggestion-list-item {\n  position: relative;\n  padding: 7px 10px;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n  line-height: 1.4;\n  cursor: pointer;\n}\n.suggestion-list-item:last-child {\n  border-bottom: none;\n}\n.suggestion-list-item:hover {\n  background: rgba(0, 0, 0, 0.05);\n}\n.suggestion-list-item .face {\n  flex: none;\n  padding-right: 10px;\n}\n.suggestion-list-item .summary {\n  font-size: 0.8em;\n  opacity: 0.5;\n}\n\n.suggestion-roster-summary {\n  background: #111;\n  color: #ccc;\n  padding: 10px 5px;\n  letter-spacing: -0.03em;\n  font-size: 12px;\n  width: 250px;\n  overflow: hidden;\n}\n.suggestion-roster-summary h4,\n.suggestion-roster-summary h5,\n.suggestion-roster-summary h6,\n.suggestion-roster-summary strong {\n  color: #fff;\n}\n.suggestion-roster-summary .suggestion-roster-summary-group {\n  padding-top: 10px;\n  margin-top: 5px;\n  border-top: 1px solid rgba(255, 255, 255, 0.1);\n  line-height: 1.4;\n}\n.suggestion-roster-summary .suggestion-roster-summary-group .icon {\n  font-size: 9px;\n  line-height: inherit;\n  margin-right: 5px;\n  display: none;\n}\n.suggestion-roster-summary .suggestion-roster-summary-group h6 {\n  text-transform: uppercase;\n  font-size: 10px;\n  font-weight: 600;\n  letter-spacing: 0.03em;\n  margin-bottom: 5px;\n}\n\n/*# sourceMappingURL=RosterSlotSuggestionListItem.vue.map */"]}, media: undefined });

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
var __vue_render__$5 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "assignment-list-item", class: _vm.confirmationStatus },
    [
      _c(
        "v-layout",
        { attrs: { "align-center": "" } },
        [
          _c(
            "v-flex",
            { staticClass: "face", attrs: { shrink: "" } },
            [
              _vm.isLoading
                ? _c("v-progress-circular", { attrs: { indeterminate: "" } })
                : _c("fluro-avatar", { attrs: { md: "", id: _vm.contact._id } })
            ],
            1
          ),
          _vm._v(" "),
          _c("v-flex", [
            _c("strong", [_vm._v(_vm._s(_vm.contact.title))]),
            _vm._v(" "),
            _c("div", { staticClass: "summary" }, [_vm._v(_vm._s(_vm.summary))])
          ]),
          _vm._v(" "),
          _c("v-flex", { attrs: { shrink: "" } }, [
            !_vm.model.sending
              ? _c("div", { staticClass: "btn-group" }, [
                  _vm.sendable
                    ? _c(
                        "span",
                        {
                          staticClass: "btn",
                          attrs: { xs: "" },
                          on: {
                            click: function($event) {
                              $event.stopPropagation();
                              $event.preventDefault();
                              return _vm.send()
                            }
                          }
                        },
                        [_c("fluro-icon", { attrs: { icon: "paper-plane" } })],
                        1
                      )
                    : _c(
                        "span",
                        {
                          staticClass: "btn",
                          attrs: { xs: "" },
                          on: {
                            click: function($event) {
                              $event.stopPropagation();
                              $event.preventDefault();
                              return _vm.$actions.open([_vm.model])
                            }
                          }
                        },
                        [_c("fluro-icon", { attrs: { icon: "ellipsis-h" } })],
                        1
                      ),
                  _vm._v(" "),
                  _c(
                    "span",
                    {
                      staticClass: "btn",
                      attrs: { xs: "" },
                      on: {
                        click: function($event) {
                          $event.stopPropagation();
                          $event.preventDefault();
                          return _vm.remove()
                        }
                      }
                    },
                    [_c("fluro-icon", { attrs: { icon: "times" } })],
                    1
                  )
                ])
              : _vm._e()
          ])
        ],
        1
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$5 = [];
__vue_render__$5._withStripped = true;

  /* style */
  const __vue_inject_styles__$5 = function (inject) {
    if (!inject) return
    inject("data-v-6da75aac_0", { source: "/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.assignment-list-item {\n  position: relative;\n  padding: 7px 10px;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  border-bottom: none;\n  line-height: 1.4;\n}\n.assignment-list-item:first-child {\n  border-radius: 3px 3px 0 0;\n}\n.assignment-list-item:last-child {\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  border-radius: 0 0 3px 3px;\n}\n.assignment-list-item .face {\n  flex: none;\n  padding-right: 10px;\n}\n.assignment-list-item .summary {\n  font-size: 0.8em;\n  opacity: 0.5;\n}\n.assignment-list-item.denied {\n  color: #be264a;\n  border-color: rgba(190, 38, 74, 0.3);\n  background: #fbedf0;\n}\n.assignment-list-item.confirmed {\n  color: #36a93a;\n  border-color: rgba(54, 169, 58, 0.3);\n  background: #e7f7e7;\n}\n.assignment-list-item.warning {\n  background: rgba(226, 152, 92, 0.05);\n  color: #da7d31;\n  border-color: rgba(218, 125, 49, 0.3);\n  font-style: italic;\n}\n.assignment-list-item.proposed {\n  background: #eafaf7;\n  color: #319a89;\n  border-color: rgba(49, 154, 137, 0.3);\n}\n.assignment-list-item.unknown {\n  color: rgba(0, 0, 0, 0.7);\n  background: #fff;\n}\n\n/*# sourceMappingURL=RosterSlotAssignmentListItem.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/edit/components/RosterSlotAssignmentListItem.vue","RosterSlotAssignmentListItem.vue"],"names":[],"mappings":"AAyFA,GAAA;AAYA;EACA,yCAAA;ACnGA;ADsGA;EACA,2CAAA;ACnGA;ADsGA;EACA,4CAAA;ACnGA;ADsGA;EACA,0CAAA;ACnGA;;AD2GA,GAAA;AACA;EAEA,kBAAA;EACA,iBAAA;EACA,oCAAA;EACA,mBAAA;EAEA,gBAAA;AC1GA;AD4GA;EACA,0BAAA;AC1GA;AD8GA;EACA,oCAAA;EACA,0BAAA;AC5GA;AD+GA;EACA,UAAA;EACA,mBAAA;AC7GA;ADgHA;EACA,gBAAA;EACA,YAAA;AC9GA;ADkHA;EACA,cAAA;EACA,oCAAA;EACA,mBAAA;AChHA;ADmHA;EACA,cAAA;EACA,oCAAA;EACA,mBAAA;ACjHA;ADoHA;EACA,oCAAA;EACA,cAAA;EACA,qCAAA;EACA,kBAAA;AClHA;ADqHA;EACA,mBAAA;EACA,cAAA;EACA,qCAAA;ACnHA;ADsHA;EACA,yBAAA;EACA,gBAAA;ACpHA;;AAEA,2DAA2D","file":"RosterSlotAssignmentListItem.vue","sourcesContent":["<template>\n    <div class=\"assignment-list-item\" :class=\"confirmationStatus\">\n        <v-layout align-center>\n            <v-flex shrink class=\"face\">\n                <v-progress-circular indeterminate v-if=\"isLoading\" />\n                <fluro-avatar md :id=\"contact._id\" v-else />\n            </v-flex>\n            <v-flex>\n                <strong>{{contact.title}}</strong>\n                <div class=\"summary\">{{summary}}</div>\n            </v-flex>\n            <v-flex shrink >\n                <div class=\"btn-group\" v-if=\"!model.sending\">\n                    <span class=\"btn\" v-if=\"sendable\" xs @click.stop.prevent=\"send()\">\n                        <fluro-icon icon=\"paper-plane\" />\n                    </span>\n                    <span class=\"btn\" v-else @click.stop.prevent=\"$actions.open([model])\" xs>\n                                <fluro-icon icon=\"ellipsis-h\" />\n                            </span>\n                    <span class=\"btn\" xs @click.stop.prevent=\"remove()\">\n                        <fluro-icon icon=\"times\" />\n                    </span>\n                </div>\n            </v-flex>\n        </v-layout>\n    </div>\n</template>\n<script>\nimport moment from 'moment';\n\nexport default {\n    props: {\n        value: {\n            type: Object,\n        }\n    },\n    data() {\n        return {\n            model: this.value,\n        }\n    },\n    methods: {\n        remove() {\n            console.log('REMOVE')\n            this.$emit('unassign', this.model);\n        },\n        send() {\n            console.log('SEND')\n            this.$emit('send', this.model);\n        }\n    },\n    watch: {\n        value(val) {\n            this.model = val;\n        },\n    },\n    computed: {\n        sendable() {\n            return this.model.confirmationStatus == 'proposed';\n        },\n        isLoading() {\n            var self = this;\n            return self.model.sending;\n        },\n        summary() {\n            switch (this.confirmationStatus) {\n                case 'denied':\n\n                    return this.model.description && this.model.description.length ? this.model.description : `Unavailable`;\n                    break;\n                case 'confirmed':\n                    return 'Confirmed.'\n                    break;\n                case 'unknown':\n                    return 'Notified. Awaiting response.'\n                    break;\n            }\n        },\n        contact() {\n            return this.model.contact;\n        },\n        confirmationStatus() {\n            return this.model.confirmationStatus;\n        }\n    }\n}\n</script>\n<style lang=\"scss\">\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n.assignment-list-item {\n    // display: flex;\n    position: relative;\n    padding: 7px 10px;\n    border: 1px solid rgba(#000, 0.1);\n    border-bottom: none;\n\n    line-height: 1.4;\n\n    &:first-child {\n        border-radius: 3px 3px 0 0;\n    }\n\n\n    &:last-child {\n        border: 1px solid rgba(#000, 0.1);\n        border-radius: 0 0 3px 3px;\n    }\n\n    .face {\n        flex: none;\n        padding-right: 10px;\n    }\n\n    .summary {\n        font-size: 0.8em;\n        opacity: 0.5;\n    }\n\n\n    &.denied {\n        color: darken($danger, 10%);\n        border-color: rgba(darken($danger, 10%), 0.3);\n        background: lighten($danger, 41%);\n    }\n\n    &.confirmed {\n        color: darken($success, 10%);\n        border-color: rgba(darken($success, 10%), 0.3);\n        background: lighten($success, 40%);\n    }\n\n    &.warning {\n        background: desaturate(rgba($warning, 0.05), 15%);\n        color: desaturate(darken($warning, 10%), 15%);\n        border-color: rgba(desaturate(darken($warning, 10%), 15%), 0.3);\n        font-style: italic;\n    }\n\n    &.proposed {\n        background: desaturate(lighten($primary, 45%), 5%);\n        color: desaturate(darken($primary, 10%), 15%);\n        border-color: rgba(desaturate(darken($primary, 10%), 15%), 0.3);\n    }\n\n    &.unknown {\n        color: rgba(#000, 0.7);\n        background: #fff;\n    }\n}\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.assignment-list-item {\n  position: relative;\n  padding: 7px 10px;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  border-bottom: none;\n  line-height: 1.4;\n}\n.assignment-list-item:first-child {\n  border-radius: 3px 3px 0 0;\n}\n.assignment-list-item:last-child {\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  border-radius: 0 0 3px 3px;\n}\n.assignment-list-item .face {\n  flex: none;\n  padding-right: 10px;\n}\n.assignment-list-item .summary {\n  font-size: 0.8em;\n  opacity: 0.5;\n}\n.assignment-list-item.denied {\n  color: #be264a;\n  border-color: rgba(190, 38, 74, 0.3);\n  background: #fbedf0;\n}\n.assignment-list-item.confirmed {\n  color: #36a93a;\n  border-color: rgba(54, 169, 58, 0.3);\n  background: #e7f7e7;\n}\n.assignment-list-item.warning {\n  background: rgba(226, 152, 92, 0.05);\n  color: #da7d31;\n  border-color: rgba(218, 125, 49, 0.3);\n  font-style: italic;\n}\n.assignment-list-item.proposed {\n  background: #eafaf7;\n  color: #319a89;\n  border-color: rgba(49, 154, 137, 0.3);\n}\n.assignment-list-item.unknown {\n  color: rgba(0, 0, 0, 0.7);\n  background: #fff;\n}\n\n/*# sourceMappingURL=RosterSlotAssignmentListItem.vue.map */"]}, media: undefined });

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
var __vue_render__$6 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "flex-column",
    { staticClass: "multi-planner-sidebar" },
    [
      _c(
        "flex-column-header",
        [
          _c(
            "v-container",
            { staticClass: "border-bottom" },
            [
              _c(
                "v-layout",
                { attrs: { "align-center": "" } },
                [
                  _c("v-flex", [
                    _c("h4", [
                      _vm.slot
                        ? _c("strong", [_vm._v(_vm._s(_vm.slot.title))])
                        : _vm._e()
                    ])
                  ])
                ],
                1
              ),
              _vm._v(" "),
              _vm.event
                ? _c("h6", [
                    _vm._v(_vm._s(_vm.event.title) + " "),
                    _c("span", { staticClass: "muted" }, [
                      _vm._v(
                        _vm._s(
                          _vm._f("definitionTitle")(
                            _vm.event.definition || _vm.event._type
                          )
                        )
                      )
                    ])
                  ])
                : _vm._e(),
              _vm._v(" "),
              _vm.event
                ? _c("div", [
                    _vm._v(
                      _vm._s(_vm._f("readableEventDate")(_vm.event)) + " "
                    ),
                    _c("span", { staticClass: "sm muted" }, [
                      _vm._v(
                        "(Starts " +
                          _vm._s(_vm._f("timeago")(_vm.event.startDate)) +
                          ")"
                      )
                    ])
                  ])
                : _vm._e()
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "flex-column",
        [
          _vm.slot
            ? _c(
                "tabset",
                {
                  model: {
                    value: _vm.activeTabIndex,
                    callback: function($$v) {
                      _vm.activeTabIndex = $$v;
                    },
                    expression: "activeTabIndex"
                  }
                },
                [
                  _c(
                    "tab",
                    { attrs: { heading: _vm.rosteredCount + " Rostered" } },
                    [
                      _c(
                        "flex-column-body",
                        [
                          _c(
                            "v-container",
                            [
                              _c(
                                "v-container",
                                { attrs: { "pa-0": "", "pb-2": "" } },
                                [
                                  _c(
                                    "div",
                                    {
                                      staticClass: "search",
                                      class: {
                                        active:
                                          _vm.searchFocussed ||
                                          _vm.search.length
                                      }
                                    },
                                    [
                                      _c("input", {
                                        directives: [
                                          {
                                            name: "model",
                                            rawName: "v-model",
                                            value: _vm.search,
                                            expression: "search"
                                          }
                                        ],
                                        ref: "search",
                                        attrs: {
                                          placeholder: "Search for contacts"
                                        },
                                        domProps: { value: _vm.search },
                                        on: {
                                          focus: function($event) {
                                            _vm.searchFocussed = true;
                                          },
                                          blur: function($event) {
                                            _vm.searchFocussed = false;
                                          },
                                          input: function($event) {
                                            if ($event.target.composing) {
                                              return
                                            }
                                            _vm.search = $event.target.value;
                                          }
                                        }
                                      }),
                                      _vm._v(" "),
                                      _c(
                                        "div",
                                        {
                                          staticClass: "search-icon",
                                          on: {
                                            click: function($event) {
                                              _vm.search = "";
                                            }
                                          }
                                        },
                                        [
                                          _vm.search.length
                                            ? _c("fluro-icon", {
                                                attrs: { icon: "times" }
                                              })
                                            : _c("fluro-icon", {
                                                attrs: { icon: "search" }
                                              })
                                        ],
                                        1
                                      )
                                    ]
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _vm.search.length
                                ? [
                                    _c(
                                      "v-container",
                                      { attrs: { "pa-0": "", "pb-2": "" } },
                                      [
                                        _vm.searching
                                          ? [
                                              _c("div", [
                                                _vm._v("Searching...")
                                              ]),
                                              _vm._v(" "),
                                              _c("v-progress-circular", {
                                                attrs: { indeterminate: "" }
                                              })
                                            ]
                                          : [
                                              _c("label", [
                                                _vm._v("Search Results")
                                              ]),
                                              _vm._v(" "),
                                              _c(
                                                "list-group",
                                                _vm._l(
                                                  _vm.searchResults,
                                                  function(contact, index) {
                                                    return _c(
                                                      "roster-slot-suggestion-list-item",
                                                      {
                                                        attrs: {
                                                          assignmentSlot:
                                                            _vm.slot,
                                                          event: _vm.event
                                                        },
                                                        nativeOn: {
                                                          click: function(
                                                            $event
                                                          ) {
                                                            return _vm.selectSuggestion(
                                                              _vm.searchResults[
                                                                index
                                                              ]
                                                            )
                                                          }
                                                        },
                                                        model: {
                                                          value:
                                                            _vm.searchResults[
                                                              index
                                                            ],
                                                          callback: function(
                                                            $$v
                                                          ) {
                                                            _vm.$set(
                                                              _vm.searchResults,
                                                              index,
                                                              $$v
                                                            );
                                                          },
                                                          expression:
                                                            "searchResults[index]"
                                                        }
                                                      }
                                                    )
                                                  }
                                                ),
                                                1
                                              )
                                            ]
                                      ],
                                      2
                                    )
                                  ]
                                : [
                                    _vm.assignments.length
                                      ? _c(
                                          "v-container",
                                          { attrs: { "pa-0": "", "pb-2": "" } },
                                          [
                                            _c("label", [_vm._v("Rostered")]),
                                            _vm._v(" "),
                                            _c(
                                              "div",
                                              [
                                                _vm._l(
                                                  _vm.assignments,
                                                  function(assignment, index) {
                                                    return [
                                                      _c(
                                                        "roster-slot-assignment-list-item",
                                                        {
                                                          on: {
                                                            unassign:
                                                              _vm.removeAssignment,
                                                            send:
                                                              _vm.sendAssignment
                                                          },
                                                          model: {
                                                            value:
                                                              _vm.assignments[
                                                                index
                                                              ],
                                                            callback: function(
                                                              $$v
                                                            ) {
                                                              _vm.$set(
                                                                _vm.assignments,
                                                                index,
                                                                $$v
                                                              );
                                                            },
                                                            expression:
                                                              "assignments[index]"
                                                          }
                                                        }
                                                      )
                                                    ]
                                                  }
                                                )
                                              ],
                                              2
                                            )
                                          ]
                                        )
                                      : _vm._e(),
                                    _vm._v(" "),
                                    _c(
                                      "v-layout",
                                      [
                                        _c(
                                          "v-flex",
                                          { attrs: { xs12: "" } },
                                          [
                                            _vm.nudgeEnabled
                                              ? _c(
                                                  "v-btn",
                                                  {
                                                    attrs: {
                                                      block: "",
                                                      loading: _vm.nudging
                                                    },
                                                    on: {
                                                      click: function($event) {
                                                        return _vm.nudge()
                                                      }
                                                    }
                                                  },
                                                  [
                                                    _vm._v(
                                                      "\n                                        Nudge\n                                        "
                                                    ),
                                                    _c("fluro-icon", {
                                                      attrs: {
                                                        right: "",
                                                        icon: "hand-pointer"
                                                      }
                                                    })
                                                  ],
                                                  1
                                                )
                                              : _vm._e()
                                          ],
                                          1
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "v-flex",
                                          { attrs: { xs12: "" } },
                                          [
                                            _vm.sendEnabled
                                              ? _c(
                                                  "v-btn",
                                                  {
                                                    attrs: {
                                                      block: "",
                                                      color: "primary",
                                                      loading: _vm.sending
                                                    },
                                                    on: {
                                                      click: function($event) {
                                                        return _vm.send()
                                                      }
                                                    }
                                                  },
                                                  [
                                                    _vm._v(
                                                      "\n                                        Send " +
                                                        _vm._s(
                                                          _vm
                                                            .proposedAssignments
                                                            .length
                                                        ) +
                                                        "\n                                        "
                                                    ),
                                                    _c("fluro-icon", {
                                                      attrs: {
                                                        right: "",
                                                        icon: "angle-right"
                                                      }
                                                    })
                                                  ],
                                                  1
                                                )
                                              : _vm._e()
                                          ],
                                          1
                                        )
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "v-container",
                                      { attrs: { "px-0": "", "pt-1": "" } },
                                      [
                                        _c("label", [_vm._v("Suggestions")]),
                                        _vm._v(" "),
                                        _vm.loadingSuggestions
                                          ? _c(
                                              "div",
                                              [
                                                _c("div", [
                                                  _vm._v("Loading...")
                                                ]),
                                                _vm._v(" "),
                                                _c("v-progress-circular", {
                                                  attrs: { indeterminate: "" }
                                                })
                                              ],
                                              1
                                            )
                                          : _c(
                                              "div",
                                              [
                                                _vm.suggestedContacts.length
                                                  ? _c(
                                                      "list-group",
                                                      _vm._l(
                                                        _vm.suggestedContacts,
                                                        function(
                                                          contact,
                                                          index
                                                        ) {
                                                          return _c(
                                                            "roster-slot-suggestion-list-item",
                                                            {
                                                              attrs: {
                                                                assignmentSlot:
                                                                  _vm.slot,
                                                                event: _vm.event
                                                              },
                                                              nativeOn: {
                                                                click: function(
                                                                  $event
                                                                ) {
                                                                  return _vm.selectSuggestion(
                                                                    _vm
                                                                      .suggestedContacts[
                                                                      index
                                                                    ]
                                                                  )
                                                                }
                                                              },
                                                              model: {
                                                                value:
                                                                  _vm
                                                                    .suggestedContacts[
                                                                    index
                                                                  ],
                                                                callback: function(
                                                                  $$v
                                                                ) {
                                                                  _vm.$set(
                                                                    _vm.suggestedContacts,
                                                                    index,
                                                                    $$v
                                                                  );
                                                                },
                                                                expression:
                                                                  "suggestedContacts[index]"
                                                              }
                                                            }
                                                          )
                                                        }
                                                      ),
                                                      1
                                                    )
                                                  : [
                                                      _c(
                                                        "em",
                                                        {
                                                          staticClass:
                                                            "small muted"
                                                        },
                                                        [
                                                          _vm._v(
                                                            "No suggestions"
                                                          )
                                                        ]
                                                      )
                                                    ]
                                              ],
                                              2
                                            )
                                      ]
                                    )
                                  ]
                            ],
                            2
                          )
                        ],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "tab",
                    {
                      attrs: { heading: _vm.unavailableCount + " Unavailable" }
                    },
                    [
                      _c(
                        "flex-column-body",
                        [
                          _c(
                            "v-container",
                            [
                              _vm.conflicts.length
                                ? _c(
                                    "v-container",
                                    { attrs: { "pa-0": "", "pb-2": "" } },
                                    [
                                      _c("label", [_vm._v("Already Rostered")]),
                                      _vm._v(" "),
                                      _c(
                                        "list-group",
                                        _vm._l(_vm.conflicts, function(
                                          contact,
                                          index
                                        ) {
                                          return _c(
                                            "roster-slot-suggestion-list-item",
                                            {
                                              attrs: {
                                                assignmentSlot: _vm.slot,
                                                event: _vm.event
                                              },
                                              nativeOn: {
                                                click: function($event) {
                                                  return _vm.selectSuggestion(
                                                    _vm.conflicts[index]
                                                  )
                                                }
                                              },
                                              model: {
                                                value: _vm.conflicts[index],
                                                callback: function($$v) {
                                                  _vm.$set(
                                                    _vm.conflicts,
                                                    index,
                                                    $$v
                                                  );
                                                },
                                                expression: "conflicts[index]"
                                              }
                                            }
                                          )
                                        }),
                                        1
                                      )
                                    ],
                                    1
                                  )
                                : _vm._e(),
                              _vm._v(" "),
                              _vm.unavailable.length
                                ? _c(
                                    "v-container",
                                    { attrs: { "pa-0": "", "pb-2": "" } },
                                    [
                                      _c("label", [
                                        _vm._v("Unavailable at this time")
                                      ]),
                                      _vm._v(" "),
                                      _c(
                                        "list-group",
                                        _vm._l(_vm.unavailable, function(
                                          contact,
                                          index
                                        ) {
                                          return _c(
                                            "roster-slot-suggestion-list-item",
                                            {
                                              attrs: {
                                                assignmentSlot: _vm.slot,
                                                event: _vm.event
                                              },
                                              nativeOn: {
                                                click: function($event) {
                                                  return _vm.selectSuggestion(
                                                    _vm.unavailable[index]
                                                  )
                                                }
                                              },
                                              model: {
                                                value: _vm.unavailable[index],
                                                callback: function($$v) {
                                                  _vm.$set(
                                                    _vm.unavailable,
                                                    index,
                                                    $$v
                                                  );
                                                },
                                                expression: "unavailable[index]"
                                              }
                                            }
                                          )
                                        }),
                                        1
                                      )
                                    ],
                                    1
                                  )
                                : _vm._e(),
                              _vm._v(" "),
                              _vm.unqualified.length
                                ? _c(
                                    "v-container",
                                    { attrs: { "pa-0": "", "pb-2": "" } },
                                    [
                                      _c("label", [_vm._v("Unqualified")]),
                                      _vm._v(" "),
                                      _c(
                                        "list-group",
                                        _vm._l(_vm.unqualified, function(
                                          contact,
                                          index
                                        ) {
                                          return _c(
                                            "roster-slot-suggestion-list-item",
                                            {
                                              attrs: {
                                                assignmentSlot: _vm.slot,
                                                event: _vm.event
                                              },
                                              nativeOn: {
                                                click: function($event) {
                                                  return _vm.selectSuggestion(
                                                    _vm.unqualified[index]
                                                  )
                                                }
                                              },
                                              model: {
                                                value: _vm.unqualified[index],
                                                callback: function($$v) {
                                                  _vm.$set(
                                                    _vm.unqualified,
                                                    index,
                                                    $$v
                                                  );
                                                },
                                                expression: "unqualified[index]"
                                              }
                                            }
                                          )
                                        }),
                                        1
                                      )
                                    ],
                                    1
                                  )
                                : _vm._e()
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              )
            : _vm._e()
        ],
        1
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$6 = [];
__vue_render__$6._withStripped = true;

  /* style */
  const __vue_inject_styles__$6 = function (inject) {
    if (!inject) return
    inject("data-v-98b2622e_0", { source: "/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.multi-planner-sidebar .close {\n  margin: 0;\n}\n.multi-planner-sidebar label {\n  display: block;\n  font-weight: 500;\n  letter-spacing: 0.05em;\n  text-transform: uppercase;\n  margin-bottom: 5px;\n  font-size: 0.8em;\n}\n\n/*# sourceMappingURL=RosterSidebar.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/edit/components/RosterSidebar.vue","RosterSidebar.vue"],"names":[],"mappings":"AAgtBA,GAAA;AAYA;EACA,yCAAA;AC1tBA;AD6tBA;EACA,2CAAA;AC1tBA;AD6tBA;EACA,4CAAA;AC1tBA;AD6tBA;EACA,0CAAA;AC1tBA;;ADkuBA,GAAA;AAGA;EACA,SAAA;ACjuBA;ADquBA;EACA,cAAA;EACA,gBAAA;EACA,sBAAA;EACA,yBAAA;EAEA,kBAAA;EACA,gBAAA;ACpuBA;;AAEA,4CAA4C","file":"RosterSidebar.vue","sourcesContent":["<template>\n    <flex-column class=\"multi-planner-sidebar\">\n        <flex-column-header>\n            <v-container class=\"border-bottom\">\n                <v-layout align-center>\n                    <v-flex>\n                        <h4><strong v-if=\"slot\">{{slot.title}}</strong></h4>\n                    </v-flex>\n                </v-layout>\n                <h6 v-if=\"event\">{{event.title}} <span class=\"muted\">{{event.definition || event._type | definitionTitle}}</span></h6>\n                <div v-if=\"event\">{{event | readableEventDate}} <span class=\"sm muted\">(Starts {{event.startDate | timeago}})</span></div>\n            </v-container>\n        </flex-column-header>\n        <flex-column>\n            <tabset v-model=\"activeTabIndex\" v-if=\"slot\">\n                <tab :heading=\"`${rosteredCount} Rostered`\">\n                    <flex-column-body>\n                        <v-container>\n                            <v-container pa-0 pb-2>\n                                <div class=\"search\" :class=\"{active:searchFocussed || search.length}\">\n                                    <input v-model=\"search\" ref=\"search\" @focus=\"searchFocussed = true\" @blur=\"searchFocussed = false\" placeholder=\"Search for contacts\" />\n                                    <div class=\"search-icon\" @click=\"search = ''\">\n                                        <fluro-icon icon=\"times\" v-if=\"search.length\" />\n                                        <fluro-icon icon=\"search\" v-else />\n                                    </div>\n                                </div>\n                            </v-container>\n                            <template v-if=\"search.length\">\n                                <v-container pa-0 pb-2>\n                                    <template v-if=\"searching\">\n                                        <div>Searching...</div>\n                                        <v-progress-circular indeterminate />\n                                    </template>\n                                    <template v-else>\n                                        <label>Search Results</label>\n                                        <list-group>\n                                            <roster-slot-suggestion-list-item v-for=\"(contact, index) in searchResults\" @click.native=\"selectSuggestion(searchResults[index])\" v-model=\"searchResults[index]\" :assignmentSlot=\"slot\" :event=\"event\" />\n                                        </list-group>\n                                    </template>\n                                </v-container>\n                            </template>\n                            <template v-else>\n\n                                <!-- <pre>{{slot}}</pre> -->\n                                <v-container pa-0 pb-2 v-if=\"assignments.length\">\n                                    <label>Rostered</label>\n                                    <!-- <list-group> -->\n                                    <div>\n                                        <template v-for=\"(assignment, index) in assignments\">\n                                            <roster-slot-assignment-list-item @unassign=\"removeAssignment\" @send=\"sendAssignment\" v-model=\"assignments[index]\" />\n                                        </template>\n                                    </div>\n                                    <!-- </list-group> -->\n                                    \n                                </v-container>\n                                <v-layout>\n                                    <v-flex xs12>\n                                        <v-btn block @click=\"nudge()\" :loading=\"nudging\" v-if=\"nudgeEnabled\">\n                                            Nudge\n                                            <fluro-icon right icon=\"hand-pointer\" />\n                                        </v-btn>\n                                    </v-flex>\n                                    <v-flex xs12>\n                                        <v-btn block color=\"primary\" @click=\"send()\" :loading=\"sending\" v-if=\"sendEnabled\">\n                                            Send {{proposedAssignments.length}}\n                                            <fluro-icon right icon=\"angle-right\" />\n                                        </v-btn>\n                                    </v-flex>\n                                </v-layout>\n                                <!-- <pre>{{suggestedContacts}}</pre> -->\n                                <v-container px-0 pt-1>\n                                    <label>Suggestions</label>\n                                    <div v-if=\"loadingSuggestions\">\n                                        <div>Loading...</div>\n                                        <v-progress-circular indeterminate />\n                                    </div>\n                                    <div v-else>\n                                        <list-group v-if=\"suggestedContacts.length\">\n                                            <roster-slot-suggestion-list-item v-for=\"(contact, index) in suggestedContacts\" @click.native=\"selectSuggestion(suggestedContacts[index])\" v-model=\"suggestedContacts[index]\" :assignmentSlot=\"slot\" :event=\"event\" />\n                                            <!-- <template v-for=\"row in suggestions\" v-if=\"row.length\">\n                                            <suggestion-list-item @click.native=\"selectSuggestion(row[0])\" v-model=\"row[0]\" :assignmentSlot=\"slot\" :event=\"event\" />\n                                        </template> -->\n                                        </list-group>\n                                        <template v-else>\n                                            <em class=\"small muted\">No suggestions</em>\n                                        </template>\n                                    </div>\n                                </v-container>\n                            </template>\n                        </v-container>\n                    </flex-column-body>\n                </tab>\n                <tab :heading=\"`${unavailableCount} Unavailable`\">\n                    <flex-column-body>\n                        <v-container>\n                            <v-container pa-0 pb-2 v-if=\"conflicts.length\">\n                                <label>Already Rostered</label>\n                                <list-group>\n                                    <roster-slot-suggestion-list-item v-for=\"(contact, index) in conflicts\" @click.native=\"selectSuggestion(conflicts[index])\" v-model=\"conflicts[index]\" :assignmentSlot=\"slot\" :event=\"event\" />\n                                </list-group>\n                            </v-container>\n                            <v-container pa-0 pb-2 v-if=\"unavailable.length\">\n                                <label>Unavailable at this time</label>\n                                <list-group>\n                                    <roster-slot-suggestion-list-item v-for=\"(contact, index) in unavailable\" @click.native=\"selectSuggestion(unavailable[index])\" v-model=\"unavailable[index]\" :assignmentSlot=\"slot\" :event=\"event\" />\n                                </list-group>\n                            </v-container>\n                            <v-container pa-0 pb-2 v-if=\"unqualified.length\">\n                                <label>Unqualified</label>\n                                <list-group>\n                                    <roster-slot-suggestion-list-item v-for=\"(contact, index) in unqualified\" @click.native=\"selectSuggestion(unqualified[index])\" v-model=\"unqualified[index]\" :assignmentSlot=\"slot\" :event=\"event\" />\n                                </list-group>\n                            </v-container>\n                        </v-container>\n                    </flex-column-body>\n                </tab>\n            </tabset>\n        </flex-column>\n        <!-- <flex-column-footer>\n            <v-container py-1 class=\"border-top\">\n                <v-btn block @click=\"deselect()\">Done</v-btn>\n            </v-container>\n        </flex-column-footer> -->\n    </flex-column>\n</template>\n<script>\nimport RosterSlotSuggestionListItem from 'src/components/content/edit/components/RosterSlotSuggestionListItem.vue';\nimport RosterSlotAssignmentListItem from 'src/components/content/edit/components/RosterSlotAssignmentListItem.vue';\nimport _ from 'lodash';\n\nexport default {\n    props: {\n        value: {\n            type: Object,\n        }\n    },\n    components: {\n        RosterSlotSuggestionListItem,\n        RosterSlotAssignmentListItem\n    },\n    data() {\n        return {\n            activeTabIndex: 0,\n            search: '',\n            searchFocussed: false,\n            searching: false,\n            searchResults: [],\n            loadingSuggestions: false,\n            model: this.value,\n            suggestionData: null,\n            nudging: false,\n            sending: false,\n        }\n    },\n    mounted() {\n        this.focusSearch();\n    },\n    methods: {\n\n        deselect() {\n            this.$emit('input', null);\n        },\n        relevantRealmIDs() {\n            var self = this;\n            return self.$fluro.arrayIDs(self.roster.realms || self.event.realms || []);\n        },\n        eventRealmMap() {\n            var self = this;\n\n            return _.reduce(self.relevantRealmIDs, function(set, realmID) {\n                set[realmID] = realmID;\n                return set;\n            }, {})\n        },\n        getBestCandidate(row) {\n\n            var self = this;\n            var filtered = self.filterPossible(row);\n\n            //////////////////////////////////////////\n\n            //Order based on whether the realm is a match and the random ordering from the backend\n            filtered = _.orderBy(filtered, function(contact, index) {\n\n                var matchesRealm = _.some(contact.realms, function(realmID) {\n                    if (realmID._id) {\n                        realmID = realmID._id;\n                    }\n\n                    return self.eventRealmMap[realmID];\n                });\n\n                var realmWeight = matchesRealm ? 0 : 1;\n\n                //////////////////////////////////////\n\n                var orderIndex = parseInt(`${realmWeight}${index}`);\n                console.log('ORDER INDEX IS', orderIndex);\n\n                return orderIndex;\n            })\n            //////////////////////////////////////////\n\n\n            return filtered[0];\n        },\n        filterPossible(contacts) {\n\n            var self = this;\n            return _.chain(contacts)\n                .filter(function(contact) {\n                    var alreadyRostered = self.rosteredMap[contact._id];\n                    var unqualified = self.unqualifiedMap[contact._id];\n                    return !alreadyRostered && !unqualified;\n                })\n                .value()\n\n        },\n        searchFor: _.debounce(function(string) {\n\n            var self = this;\n\n            if (!string || !string.length) {\n                self.searchResults = [];\n                self.searching = false;\n                return\n            }\n\n            self.searching = true;\n\n            self.$fluro.api.get(`/content/contact/search/${string}`, {\n                    params: {\n                        limit: 10,\n                    }\n                })\n                .then(function(res) {\n                    self.searchResults = self.filterPossible(res.data);\n                    self.searching = false;\n                })\n                .catch(function(err) {\n                    self.searchResults = [];\n                    self.searching = false;\n                })\n\n        }, 300),\n        nudge() {\n            var self = this;\n\n\n            self.nudging = true;\n\n            var assignments = self.unknownAssignments;\n\n\n            //////////////////////////////////////////\n\n            if (!assignments.length) {\n                self.nudging = false;\n                return;\n            }\n\n            ////////////////////////////////////////\n\n            return self.$fluro.api.post('/assignments/nudge', {\n                    assignments,\n                })\n                .then(function(res) {\n                    self.nudging = false;\n\n                    ////console.log('Nudged everyone!', res);\n                    if (res.data.success.length) {\n                        self.$fluro.notify(`${res.data.success.length} notifications sent`);\n                    } else {\n                        self.$fluro.notify(`No notifications were sent`);\n                    }\n\n                })\n                .catch(function(err) {\n                    self.nudging = false;\n                    self.$fluro.error(err);\n                })\n        },\n        send() {\n            var self = this;\n            self.sending = true;\n\n            //////////////////////////////////////\n\n            var assignments = self.proposedAssignments;\n\n            if (!assignments.length) {\n                self.sending = false;\n                return;\n            }\n\n            //////////////////////////////////////\n\n            //Map each proposed to a promise\n            var promises = _.map(assignments, function(assignment) {\n                return self.sendAssignment(assignment);\n            });\n\n            //////////////////////////////////////\n\n            Promise.all(promises)\n                .then(function(res) {\n                    self.sending = false;\n                })\n                .catch(function(err) {\n                    self.sending = false;\n                })\n        },\n        editAssignment(assignment) {\n\n        },\n        createAssignment(details) {\n\n            var self = this;\n\n            return new Promise(function(resolve, reject) {\n\n\n                var rosterID = self.$fluro.utils.getStringID(self.model.roster);\n                var contact = details.contact;\n\n                // var details = {\n                //     title: self.slot.title,\n                //     contact: contact,\n                //     confirmationStatus: 'proposed',\n                //     force: options.force,\n                // }\n\n                self.$fluro.api.post(`/assignments/roster/${rosterID}`, details)\n                    .then(assignmentCreated)\n                    .catch(assignmentCreateError);\n\n\n                function assignmentCreated(res) {\n                    var matchingAssignment = res.data;\n                    matchingAssignment.contactName = (matchingAssignment.contact.title || matchingAssignment.contact.firstName + ' ' + matchingAssignment.contact.lastName);\n\n                    var alreadyAssigned = _.some(self.slot.assignments, {\n                        _id: matchingAssignment._id,\n                    })\n\n                    if (!alreadyAssigned) {\n                        self.slot.assignments.push(matchingAssignment);\n                    }\n\n                    resolve(matchingAssignment);\n                    self.searchResults = [];\n                    self.search = '';\n                    self.focusSearch();\n\n                }\n\n\n                function assignmentCreateError(err) {\n                    var err = err.response.data;\n                    var conflictError = err.error;\n                    var message = err.message;\n\n\n\n                    if (err.status == 403) {\n                        message = 'You do not have permission to make this action.';\n                    }\n\n                    if (conflictError == 'AssignmentConflictError') {\n                        var array = [{\n                            title: `Add as '${details.title}' anyway`,\n                            description: (contact.firstName || 'this person') + ' can still fulfill this assignment',\n                            force: true,\n                        }]\n\n                        return self.$fluro.options(array, `Conflict!`, message)\n                            .then(function(answer) {\n\n                                details.force = answer.force;\n                                self.$fluro.api.post(`/assignments/roster/${rosterID}`, details)\n                                    .then(assignmentCreated)\n                                    .catch(assignmentCreateError);\n\n\n                            })\n                    }\n\n                    self.$fluro.error(err);\n                    reject(err);\n                }\n\n\n            })\n        },\n        sendAssignment(assignment) {\n            var self = this;\n            self.$set(assignment, 'sending', true);\n\n            return self.$fluro.api.put(`/content/assignment/${assignment._id}`, {\n                    confirmationStatus: 'unknown',\n                })\n                .then(function(res) {\n                    var result = res.data;\n                    assignment.confirmationStatus = result.confirmationStatus\n                    self.$set(assignment, 'sending', false);\n                })\n                .catch(function(err) {\n                    self.$set(assignment, 'sending', false);\n                    self.$fluro.error(err);\n                })\n        },\n        removeAssignment(assignment) {\n\n            var self = this;\n\n            /////////////////////////////////////////////////////\n\n            //If the assignment has been rejected then we want\n            //to archive it and hide it from the list\n            switch (assignment.confirmationStatus) {\n                case 'denied':\n                    //////console.log('Hide the assignment')\n                    return self.archiveAssignment(assignment);\n                    break;\n                case 'proposed':\n                    return self.$fluro.api.delete(`/content/assignment/${assignment._id}`)\n                        .then(function(res) {\n                            removeComplete(res.data);\n                        })\n                    break;\n                case 'temporary':\n                    return removeComplete(assignment);\n                    break;\n            }\n\n\n            /////////////////////////////////////////////////////\n\n            return self.$fluro.confirm('Confirm Deletion', `Are you sure you want to delete this assignment`, {\n                    confirmColor: 'error',\n                    confirmText: 'Confirm Delete',\n                })\n                .then(function(res) {\n\n                    return self.$fluro.api.delete(`/content/assignment/${assignment._id}`)\n                        .then(function(res) {\n                            removeComplete(res.data);\n                        })\n                        .catch(function(err) {\n                            self.$fluro.error(err);\n                        })\n\n                })\n                .catch(function() {\n                    // self.$fluro.error(err);\n                })\n\n            ///////////////////////////////////////////////\n\n            function removeComplete(response) {\n\n                //Find the assignment update it with an _id\n                assignment._id = response._id\n                _.assign(assignment, response);\n\n                var index = self.slot.assignments.indexOf(assignment);\n                self.slot.assignments.splice(index, 1);\n\n                console.log('Removed!!!')\n            }\n\n        },\n        archiveAssignment(assignment) {\n\n            console.log('Archive assignment')\n            return self.$fluro.api.put(`/content/assignment/${assignment._id}`, {\n                    status: 'archived',\n                })\n                .then(function(res) {\n                    assignment.status = 'archived';\n                    var index = self.slot.assignments.indexOf(assignment);\n                    self.slot.splice(index, 1);\n                })\n                .catch(function(err) {\n                    self.$fluro.error(err);\n                })\n\n        },\n        checkProposed(assignment) {\n\n        },\n        saveProposed(assignment) {\n\n        },\n        selectSuggestion(contact, options) {\n\n            var self = this;\n\n            if (!options) {\n                options = {};\n            }\n\n\n            var details = {\n                title: self.slot.title,\n                contact: contact,\n                confirmationStatus: 'proposed',\n                force: options.force,\n            }\n\n            self.$set(contact, 'loading', true);\n\n            return self.createAssignment(details).then(function() {\n                    self.$set(contact, 'loading', false);\n                })\n                .catch(function(err) {\n                    self.$set(contact, 'loading', false);\n                });\n\n        },\n\n        focusSearch() {\n            if (this.$refs.search) {\n                this.$refs.search.focus();\n            }\n            this.activeTabIndex = 0;\n        },\n        reloadSuggestions() {\n\n            var self = this;\n\n\n            if (!self.model) {\n                self.loadingSuggestions = false;\n                self.suggestionData = null;\n                return;\n            }\n            self.loadingSuggestions = true;\n\n            self.$fluro.api.post(`/matrix/suggest`, {\n                    title: self.slot.title,\n                    event: self.event._id,\n                    roster: self.roster._id,\n                }, {\n                    params: {\n                        limit: 3,\n                    },\n                })\n                .then(function(res) {\n\n                    self.suggestionData = res.data;\n                    self.loadingSuggestions = false;\n                })\n                .catch(function(err) {\n                    self.suggestionData = null;\n                    self.loadingSuggestions = false;\n                })\n        },\n    },\n    watch: {\n        search(val) {\n            this.searching = true;\n            this.searchFor(val);\n        },\n        value(val) {\n            this.model = val;\n            this.searchResults = [];\n            this.search = '';\n            this.focusSearch();\n            this.reloadSuggestions();\n        },\n    },\n    computed: {\n        unknownAssignments() {\n            return _.filter(this.assignments, { confirmationStatus: 'unknown' });\n        },\n        proposedAssignments() {\n            return _.filter(this.assignments, { confirmationStatus: 'proposed' });\n        },\n        sendEnabled() {\n            var self = this;\n            return self.proposedAssignments.length;\n        },\n        nudgeEnabled() {\n            var self = this;\n            return self.unknownAssignments.length;\n        },\n        rosteredCount() {\n            return this.assignments.length\n        },\n        unavailableCount() {\n            var self = this;\n\n            var conflicts = self.conflicts.length;\n            var unavailable = self.unavailable.length;\n            var unqualified = self.unqualified.length;\n\n            return conflicts + unavailable + unqualified;\n\n        },\n        conflicts() {\n            var self = this;\n\n            if (!self.suggestionData) {\n                return [];\n            }\n\n            return self.suggestionData.conflicts;\n        },\n        unavailable() {\n            var self = this;\n\n            if (!self.suggestionData) {\n                return [];\n            }\n\n            return self.suggestionData.unavailable;\n        },\n        conflicts() {\n            var self = this;\n\n            if (!self.suggestionData) {\n                return [];\n            }\n\n            return self.suggestionData.conflicts;\n        },\n        unqualified() {\n            var self = this;\n\n            if (!self.suggestionData) {\n                return [];\n            }\n\n            return self.suggestionData.unqualified;\n        },\n        unqualifiedMap() {\n            return _.reduce(this.unqualified, function(set, contact) {\n                set[contact._id] = contact;\n                return set;\n            }, {})\n\n        },\n        suggestions() {\n            var self = this;\n\n            if (!self.suggestionData) {\n                console.log('No suggestion data')\n                return [];\n            }\n\n            // return self.suggestionData.suggested;\n            console.log('Before', self.suggestionData.suggested)\n            return self.suggestionData.suggested;\n\n\n\n\n        },\n        suggestedContacts() {\n            var self = this;\n\n\n            // var filtered = _.map(self.suggestionData.suggested, function(row) {\n\n            //     return _.filter(row, function(contact) {\n            //         return !self.rosteredMap[contact._id];\n            //     });\n\n            // });\n\n            // console.log('After', filtered)\n            // return filtered;\n\n\n\n\n            return _.chain(self.suggestions)\n                .reduce(function(set, row) {\n                    var candidate = self.getBestCandidate(row);\n\n                    if (candidate) {\n                        set.push(candidate);\n                    }\n\n                    return set;\n                }, [])\n                .value();\n        },\n        event() {\n            return _.get(this.roster,'event');\n        },\n        slot() {\n            return _.get(this.model,'slot')\n        },\n        rostered() {\n            return _.chain(this.assignments)\n                .map('contact')\n                .flatten()\n                .value()\n        },\n        rosteredMap() {\n            return _.reduce(this.rostered, function(set, contact) {\n\n                set[contact._id] = contact;\n                return set;\n            }, {})\n\n        },\n        assignments() {\n            return this.slot ? this.slot.assignments || [] : []\n        },\n        roster() {\n            return _.get(this.model,'roster')\n        }\n    },\n}\n</script>\n<style lang=\"scss\">\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n.multi-planner-sidebar {\n    \n    .close {\n        margin:0;\n    }\n\n\n    label {\n        display: block;\n        font-weight: 500;\n        letter-spacing: 0.05em;\n        text-transform: uppercase;\n        ;\n        margin-bottom: 5px;\n        font-size: 0.8em;\n    }\n}\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.multi-planner-sidebar .close {\n  margin: 0;\n}\n.multi-planner-sidebar label {\n  display: block;\n  font-weight: 500;\n  letter-spacing: 0.05em;\n  text-transform: uppercase;\n  margin-bottom: 5px;\n  font-size: 0.8em;\n}\n\n/*# sourceMappingURL=RosterSidebar.vue.map */"]}, media: undefined });

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
var __vue_render__$7 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.definition
    ? _c(
        "flex-column",
        [
          _c(
            "flex-row",
            [
              _c(
                "flex-column",
                [
                  _vm.proposals.length
                    ? _c("flex-column-header", {
                        scopedSlots: _vm._u(
                          [
                            {
                              key: "right",
                              fn: function() {
                                return [
                                  _vm.proposals.length
                                    ? _c(
                                        "v-btn",
                                        {
                                          staticClass: "ma-0",
                                          attrs: { color: "primary" },
                                          on: {
                                            click: function($event) {
                                              return _vm.sendAssignments(
                                                _vm.proposals
                                              )
                                            }
                                          }
                                        },
                                        [
                                          _vm._v(
                                            "\n                        Send " +
                                              _vm._s(_vm.proposals.length) +
                                              " proposed\n                        "
                                          ),
                                          _c("fluro-icon", {
                                            attrs: {
                                              library: "fas",
                                              right: "",
                                              icon: "paper-plane"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    : _vm._e()
                                ]
                              },
                              proxy: true
                            }
                          ],
                          null,
                          false,
                          2581186370
                        )
                      })
                    : _vm._e(),
                  _vm._v(" "),
                  _c(
                    "flex-column-body",
                    [
                      _c(
                        "v-container",
                        [
                          _c(
                            "list-group",
                            _vm._l(_vm.model.slots, function(slot, slotIndex) {
                              return _c(
                                "list-group-item",
                                { key: "" + slot.title, staticClass: "pa-3" },
                                [
                                  _c("roster-slot-manager", {
                                    attrs: {
                                      selected: _vm.isSelectedSlot(
                                        _vm.model,
                                        slot.title
                                      ),
                                      definition: _vm.definition,
                                      roster: _vm.model
                                    },
                                    on: {
                                      selectcell: function($event) {
                                        return _vm.selectSlotCell(
                                          slot,
                                          slotIndex
                                        )
                                      }
                                    },
                                    nativeOn: {
                                      click: function($event) {
                                        return _vm.selectSlotCell(
                                          slot,
                                          slotIndex
                                        )
                                      }
                                    },
                                    model: {
                                      value: _vm.model.slots[slotIndex],
                                      callback: function($$v) {
                                        _vm.$set(
                                          _vm.model.slots,
                                          slotIndex,
                                          $$v
                                        );
                                      },
                                      expression: "model.slots[slotIndex]"
                                    }
                                  })
                                ],
                                1
                              )
                            }),
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "sidebar" },
                [
                  _c("roster-sidebar", {
                    model: {
                      value: _vm.selected,
                      callback: function($$v) {
                        _vm.selected = $$v;
                      },
                      expression: "selected"
                    }
                  })
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    : _vm._e()
};
var __vue_staticRenderFns__$7 = [];
__vue_render__$7._withStripped = true;

  /* style */
  const __vue_inject_styles__$7 = function (inject) {
    if (!inject) return
    inject("data-v-3ca44e79_0", { source: "/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.plan-editor {\n  border-left: 2px solid;\n  width: 50vw;\n  min-width: 400px;\n  display: flex;\n  position: relative;\n  background: #eaebee;\n  box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);\n  z-index: 100;\n}\n.roster-title {\n  font-size: 10px;\n  vertical-align: middle;\n  text-align: right;\n  background: #ced0d7;\n  line-height: 22px;\n  padding: 4px 10px 4px 8px !important;\n}\n.slot-cell {\n  width: 200px;\n  background: #fafafa;\n  vertical-align: top;\n  border-bottom: 1px solid #ced0d7 !important;\n  border-right: 1px solid #ced0d7;\n}\n.slot-cell .slot-cell-inner {\n  position: relative;\n  min-height: 26px;\n}\n.slot-cell.selected {\n  box-shadow: 0 0 20px #2ad4b9;\n  border-color: 2px solid #2ad4b9 !important;\n  outline: 1px solid #2ad4b9;\n  z-index: 100;\n}\n.slot-cell .slot-assignments {\n  position: absolute;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  z-index: 1;\n}\n.sidebar {\n  width: 320px;\n  flex: none;\n  z-index: 100;\n  background: #fff;\n  border-left: 1px solid #ced0d7;\n  display: flex;\n}\n.plan-cell {\n  vertical-align: top;\n  border-right: 1px solid #ced0d7;\n  position: relative;\n}\n.plan-cell .plan-item {\n  background: #fff;\n  display: block;\n  border-bottom: 1px solid #ced0d7 !important;\n  padding: 5px 10px;\n  font-size: 12px;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.plan-cell .plan-item:hover {\n  background: #fafafa;\n}\n.add-cell {\n  vertical-align: middle;\n  text-align: center;\n  border-bottom: 1px solid #ced0d7 !important;\n  border-right: 1px solid #ced0d7;\n}\n.add-cell p {\n  font-size: 0.8em;\n  display: block;\n  white-space: normal;\n  opacity: 0.5;\n  padding: 5px;\n  width: 100%;\n  margin: 0;\n}\n.edit-cell,\n.mini-buttons {\n  text-align: center;\n  padding: 4px;\n}\n.mini-btn {\n  display: inline-block;\n  border: 1px solid #ced0d7;\n  padding: 2px 5px;\n  font-size: 11px;\n  background: #fff;\n  border-radius: 3px;\n  color: inherit;\n}\n.mini-btn[block] {\n  display: block;\n  text-align: center;\n  margin: 1px;\n}\n.event-details {\n  font-size: 12px;\n  padding: 10px;\n  text-align: center;\n  background: #fff;\n  border-left: 1px solid #ced0d7 !important;\n}\n.event-details:first-child {\n  border-left: none;\n}\n.event-details .small {\n  font-size: 0.8em;\n}\n.roster-default-link {\n  background: #eaebee;\n  font-size: 9px;\n  font-weight: 500;\n  vertical-align: top;\n  text-align: right;\n  letter-spacing: 0.05em;\n  border-bottom: 1px solid #ced0d7 !important;\n}\n.roster-default-link span {\n  opacity: 0;\n}\n.roster-default-link:hover span {\n  opacity: 0.5;\n}\n.date-header {\n  padding: 0 10px;\n  text-align: center;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  font-size: 10px;\n}\n.date-header .divide-left {\n  border-bottom: 1px solid #ced0d7;\n  background: #fff;\n  height: 30px;\n  line-height: 30px;\n}\n.time-header {\n  padding: 0 10px;\n  height: 30px;\n  line-height: 30px;\n  text-align: center;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  font-size: 11px;\n  position: relative;\n  min-width: 190px;\n  width: 220px;\n  white-space: nowrap;\n  background: #fff;\n  border-left: 1px solid #ced0d7;\n}\n.time-header:first-child {\n  border-left: none;\n}\n.time-header .realm-bar {\n  display: block;\n  position: absolute;\n  top: auto;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  width: 100%;\n  height: 3px;\n}\n\n/*# sourceMappingURL=RosterMain.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/edit/components/RosterMain.vue","RosterMain.vue"],"names":[],"mappings":"AAurBA,GAAA;AAYA;EACA,yCAAA;ACjsBA;ADosBA;EACA,2CAAA;ACjsBA;ADosBA;EACA,4CAAA;ACjsBA;ADosBA;EACA,0CAAA;ACjsBA;;ADysBA,GAAA;AAQA;EACA,sBAAA;EACA,WAAA;EACA,gBAAA;EACA,aAAA;EACA,kBAAA;EACA,mBAbA;EAcA,uCAAA;EACA,YAAA;AC7sBA;ADgtBA;EACA,eAAA;EACA,sBAAA;EACA,iBAAA;EACA,mBArBA;EAsBA,iBAAA;EACA,oCAAA;AC7sBA;ADgtBA;EAEA,YAAA;EACA,mBAAA;EACA,mBAAA;EACA,2CAAA;EACA,+BAAA;AC9sBA;ADgtBA;EACA,kBAAA;EACA,gBAAA;AC9sBA;ADitBA;EACA,4BAAA;EACA,0CAAA;EACA,0BAAA;EACA,YAAA;AC/sBA;AD2tBA;EACA,kBAAA;EACA,OAAA;EACA,MAAA;EACA,SAAA;EACA,QAAA;EACA,UAAA;ACztBA;ADouBA;EACA,YAAA;EACA,UAAA;EACA,YAAA;EACA,gBAAA;EACA,8BAAA;EACA,aAAA;ACjuBA;ADsuBA;EAGA,mBAAA;EACA,+BAAA;EACA,kBAAA;ACruBA;ADwuBA;EACA,gBAAA;EACA,cAAA;EACA,2CAAA;EACA,iBAAA;EACA,eAAA;EAEA,uBAAA;EACA,mBAAA;ACvuBA;AD0uBA;EACA,mBAAA;ACxuBA;AD6uBA;EAEA,sBAAA;EACA,kBAAA;EACA,2CAAA;EACA,+BAAA;AC3uBA;AD8uBA;EACA,gBAAA;EACA,cAAA;EACA,mBAAA;EACA,YAAA;EACA,YAAA;EACA,WAAA;EACA,SAAA;AC5uBA;ADwvBA;;EAEA,kBAAA;EACA,YAAA;ACrvBA;ADwvBA;EACA,qBAAA;EACA,yBAAA;EACA,gBAAA;EACA,eAAA;EACA,gBAAA;EACA,kBAAA;EACA,cAAA;ACrvBA;ADuvBA;EACA,cAAA;EACA,kBAAA;EACA,WAAA;ACrvBA;AD0vBA;EACA,eAAA;EACA,aAAA;EACA,kBAAA;EACA,gBAAA;EACA,yCAAA;ACvvBA;ADyvBA;EACA,iBAAA;ACvvBA;AD0vBA;EACA,gBAAA;ACxvBA;AD4vBA;EAEA,mBAjLA;EAkLA,cAAA;EACA,gBAAA;EACA,mBAAA;EACA,iBAAA;EACA,sBAAA;EACA,2CAAA;AC1vBA;AD4vBA;EACA,UAAA;AC1vBA;AD6vBA;EACA,YAAA;AC3vBA;AD+vBA;EACA,eAAA;EACA,kBAAA;EACA,gBAAA;EACA,yBAAA;EACA,sBAAA;EACA,eAAA;AC5vBA;AD8vBA;EACA,gCAAA;EACA,gBAAA;EACA,YAAA;EACA,iBAAA;AC5vBA;ADmwBA;EACA,eAAA;EACA,YAAA;EACA,iBAAA;EACA,kBAAA;EACA,gBAAA;EACA,yBAAA;EACA,sBAAA;EACA,eAAA;EACA,kBAAA;EACA,gBA3NA;EA4NA,YA3NA;EA6NA,mBAAA;EACA,gBAAA;EAEA,8BAAA;AClwBA;ADowBA;EACA,iBAAA;AClwBA;ADqwBA;EACA,cAAA;EACA,kBAAA;EACA,SAAA;EACA,OAAA;EACA,SAAA;EACA,QAAA;EACA,WAAA;EACA,WAAA;ACnwBA;;AAEA,yCAAyC","file":"RosterMain.vue","sourcesContent":["<template>\n    <flex-column v-if=\"definition\">\n        <flex-row>\n            <flex-column>\n                <flex-column-header v-if=\"proposals.length\">\n                    <template v-slot:right>\n                        <v-btn class=\"ma-0\" color=\"primary\" @click=\"sendAssignments(proposals)\" v-if=\"proposals.length\">\n                            Send {{proposals.length}} proposed\n                            <fluro-icon library=\"fas\" right icon=\"paper-plane\" />\n                        </v-btn>\n                    </template>\n                </flex-column-header>\n                <flex-column-body>\n                    <v-container>\n                        <list-group>\n                            <list-group-item v-for=\"(slot, slotIndex) in model.slots\" :key=\"`${slot.title}`\" class=\"pa-3\">\n                                <roster-slot-manager v-model=\"model.slots[slotIndex]\" @selectcell=\"selectSlotCell(slot, slotIndex)\" :selected=\"isSelectedSlot(model, slot.title)\" :definition=\"definition\" :roster=\"model\" @click.native=\"selectSlotCell(slot, slotIndex)\" />\n                            </list-group-item>\n                        </list-group>\n                    </v-container>\n                </flex-column-body>\n                <!--                         <div class=\"fluro-multi-wrapper\">\n                            <div ref=\"scrollableArea\" class=\"fluro-multi-scroll\">\n                                <span ref=\"top\"></span>\n                                <table class=\"fluro-multi-main no-select\">\n                                    <tbody>\n                                        <template v-for=\"(slot, slotIndex) in model.slots\">\n                                            <tr :key=\"`${slot.title}`\">\n                                                <th class=\"left-header slot-title\" :class=\"{dynamic:slot.dynamic}\">\n                                                    <div class=\"slot-attributes\">\n                                                        <fluro-icon v-tippy content=\"Opt out is disabled\" icon=\"times-square\" class=\"\" v-if=\"slot.optOutBehaviour == 'disabled'\" />\n                                                        <fluro-icon v-tippy content=\"Autoconfirm\" icon=\"check-square\" class=\"brand-success\" v-if=\"slot.confirmationBehaviour == 'confirm'\" />\n                                                        <fluro-icon v-tippy content=\"Requires Capabilities\" icon=\"exclamation-square\" class=\"brand-warning\" v-if=\"slot.requireCapabilities && slot.requireCapabilities.length\" />\n                                                    </div>\n                                                    {{slot.title}}\n                                                </th>\n                                                <roster-slot-cell @click.native=\"selectSlotCell(slot, slotIndex)\" :position=\"slot\" :definition=\"model\" :roster=\"model\" :selected=\"isSelectedSlot(model, slot.title)\" class=\"divide-left\" />\n                                            </tr>\n                                        </template>\n                                    </tbody>\n                                </table>\n                            </div>\n                        </div> -->\n            </flex-column>\n            <div class=\"sidebar\">\n                <roster-sidebar v-model=\"selected\" />\n            </div>\n        </flex-row>\n    </flex-column>\n</template>\n<script>\n/////////////////////////////////////////\n\nimport RosterSlotManager from 'src/components/content/edit/components/RosterSlotManager.vue';\nimport RosterSidebar from 'src/components/content/edit/components/RosterSidebar.vue';\n\nimport draggable from 'vuedraggable';\n\nimport Vue from 'vue';\nimport MultiPlannerService from 'src/components/content/edit/services/MultiPlannerService.js';\nimport _ from 'lodash';\n\n\nexport default {\n    props: {\n        value: {\n            type: Object,\n            required: true,\n        },\n        definition: {\n            type: Object,\n        }\n    },\n    created() {\n        this.processDefinitionSlots();\n    },\n    components: {\n        RosterSidebar,\n        RosterSlotManager,\n    },\n    data() {\n        return {\n            model: this.value,\n            defaultRosters: {},\n            processing: false,\n            dragOptions: {},\n            selected: null,\n            collapsed: {},\n            loading: true,\n        }\n    },\n    computed: {\n        orderedRosterTypes() {\n            var self = this;\n            var ordered = _.values(self.defaultRosters)\n            console.log('ORDERED', ordered);\n            return ordered;\n        },\n        proposals() {\n            var self = this;\n\n            return _.chain(self.columns)\n                .reduce(function(set, column) {\n\n                    _.each(column.rosters, function(rosterType) {\n                        if (rosterType.roster) {\n                            set = set.concat(rosterType.roster.slots)\n                        }\n                    })\n\n                    return set;\n                }, [])\n\n                .map(function(slot) {\n                    return slot.assignments\n                })\n                .flatten()\n                .compact()\n                .filter(function(assignment) {\n                    return assignment.confirmationStatus == 'proposed';\n                })\n                .value();\n        },\n        knownDefinitionSlots() {\n            return _.get(this.definition, 'data.slots');\n        }\n    },\n    watch: {\n        knownDefinitionSlots() { return this.processDefinitionSlots() }\n    },\n    methods: {\n        editRosterReminders(column, rosterTypeName) {\n\n            console.log('CLICK', column)\n            var self = this;\n            var event = column.event;\n            var rosters = column.rosters;\n\n            ///////////////////////////////////////\n\n            var slots = _.chain(rosters)\n                .map('slots')\n                .flatten()\n                .compact()\n                .uniq(function(slot) {\n                    return slot.title;\n                })\n                .value();\n\n            //////////////////////////////////////////////////\n\n            var promise = self.$fluro.modal({\n                component: EventReminderModal,\n                options: {\n                    event,\n                    slots,\n                }\n            })\n        },\n        editEventReminders(column) {\n\n            var self = this;\n            var event = column.event;\n            var rosters = column.rosters;\n\n            ///////////////////////////////////////\n\n            var slots = _.chain(rosters)\n                .map('slots')\n                .flatten()\n                .compact()\n                .uniq(function(slot) {\n                    return slot.title;\n                })\n                .value();\n\n            //////////////////////////////////////////////////\n\n            var promise = self.$fluro.modal({\n                component: EventReminderModal,\n                options: {\n                    event,\n                    slots,\n                }\n            })\n\n\n\n        },\n        processDefinitionSlots() {\n            var self = this;\n            var slots = JSON.parse(JSON.stringify(self.model.slots));\n            var mappedSlots = {}\n            _.each(slots, function(o) {\n                mappedSlots[o.title] = o;\n            });\n            var outputSlots = [];\n            _.each(self.knownDefinitionSlots, function(def) {\n                var title = def.title;\n                if (mappedSlots[title]) {\n                    mappedSlots[title].confirmationBehaviour = def.confirmationBehaviour;\n                    mappedSlots[title].requireCapabilities = def.requireCapabilities;\n                    mappedSlots[title].optOutBehaviour = def.optOutBehaviour;\n                    outputSlots.push(mappedSlots[title]);\n                }\n            });\n            self.model.slots = outputSlots;\n        },\n        mapDefaultRosters() {\n\n            var self = this;\n\n\n            var knownDefinitions = JSON.parse(JSON.stringify(self.knownDefinitions));\n\n            // console.log('KNOWN DEFINITIONS', knownDefinitions)\n\n            //Map all the definitions and slots that we know about\n            self.defaultRosters = _.reduce(self.columns, function(set, column) {\n\n\n                //It's a mapped definition with 'slots' as an array\n                _.each(column.rosters, function(simpleDefinition, key) {\n\n                    var existingEntry = set[key];\n                    if (!existingEntry) {\n                        set[key] = existingEntry = simpleDefinition;\n                    }\n\n\n\n                    ///////////////////////////////////////////////\n\n                    //If this column actually has a roster instance\n                    var rosterInstance = column.rosters[key].roster;\n\n                    ///////////////////////////////////////////////\n                    if (rosterInstance) {\n                        //Add any additional slots that might be on the roster but not the definition\n                        _.each(rosterInstance.slots, function(slot) {\n\n                            //If they have an assignment\n                            if (!slot.assignments || !slot.assignments.length) {\n                                return;\n                            }\n\n                            var slotName = String(slot.title).toLowerCase();\n                            var alreadyThere = _.some(existingEntry.slots, function(existingSlot) {\n                                return slotName == String(existingSlot.title).toLowerCase();\n                            });\n\n                            //We Don't already know about this slot\n                            if (!alreadyThere) {\n                                slot.dynamic = true;\n                                existingEntry.slots.push(slot);\n                            }\n                        })\n                    }\n                });\n\n                return set;\n            }, knownDefinitions)\n        },\n        createSlotMap(roster) {\n            return _.reduce(roster.slots, function(set, slot) {\n                slot.slotName = String(slot.title).toLowerCase();\n                set[slot.slotName] = slot;\n                return set;\n            }, {})\n        },\n        nameSlots(slots) {\n\n            return _.reduce(slots, function(set, slot, index) {\n\n                console.log('MAP NAME SLOTS', slot);\n                var slotName = String(slot.title).toLowerCase();\n                slot.index = index;\n                set[slotName] = slot;\n                return set;\n\n            }, {})\n        },\n        sendRoster(roster) {\n\n            var self = this;\n\n            if (!roster) {\n                return;\n            }\n\n            //////////////////////////////////////\n\n            self.$set(roster, 'sending', true);\n\n            var assignments = _.chain(roster.slots)\n                .map('assignments')\n                .flatten()\n                .filter({ confirmationStatus: 'proposed' })\n                .value();\n\n            if (!assignments.length) {\n                self.$set(roster, 'sending', false);\n                return;\n            }\n\n            //////////////////////////////////////\n\n            //Map each proposed to a promise\n            var promises = self.sendAssignments(assignments);\n\n            //////////////////////////////////////\n\n            Promise.all(promises)\n                .then(function(res) {\n                    self.$set(roster, 'sending', false);\n                })\n                .catch(function(err) {\n                    self.$set(roster, 'sending', false);\n                })\n\n\n        },\n        sendAssignments(assignments) {\n            var self = this;\n            return _.map(assignments, function(assignment) {\n                return self.sendAssignment(assignment);\n            });\n        },\n        sendAssignment(assignment) {\n            var self = this;\n            self.$set(assignment, 'sending', true);\n\n            return self.$fluro.api.put(`/content/assignment/${assignment._id}`, {\n                    confirmationStatus: 'unknown',\n                })\n                .then(function(res) {\n                    var result = res.data;\n                    assignment.confirmationStatus = result.confirmationStatus\n                    self.$set(assignment, 'sending', false);\n                })\n                .catch(function(err) {\n                    self.$set(assignment, 'sending', false);\n                    self.$fluro.error(err);\n                })\n        },\n        getProposed(roster) {\n\n            if (!roster) {\n                return;\n            }\n\n            return _.chain(roster.slots)\n                .map('assignments')\n                .flatten()\n                .compact()\n                .filter(function(assignment) {\n                    return assignment.confirmationStatus == 'proposed';\n                })\n                .value()\n                .length;\n        },\n        dragstart($event) {\n            console.log($event);\n        },\n        dragend($event) {\n            console.log($event);\n        },\n        dragover($event) {\n            console.log($event);\n        },\n        dragenter($event) {\n            console.log($event);\n        },\n        assignTeam(roster) {\n\n\n            var self = this;\n\n            return new Promise(function(resolve, reject) {\n\n\n                //////////////////////////////\n\n                var initialFilter = {\n                    operator: 'and',\n                    filters: [{\n                            operator: 'and',\n                            filters: [{\n                                key: 'status',\n                                comparator: '==',\n                                value: 'active',\n                            }]\n                        },\n                        {\n                            operator: 'or',\n                            filters: [{\n                                    key: 'definition',\n                                    comparator: 'in',\n                                    values: ['serviceTeam'],\n                                },\n                                {\n                                    key: 'definition',\n                                    comparator: 'empty',\n                                },\n                            ]\n                        },\n                    ]\n                }\n                //////////////////////////////  \n\n\n                self.$fluro.global.select('team', { allDefinitions: true, maximum: 1, minimum: 1, filter: initialFilter })\n                    .then(function(teams) {\n\n                        if (!teams || !teams.length) {\n                            return reject();\n                        }\n\n                        /////////////////////////////////////////\n\n                        self.$fluro.content.get(teams[0]._id)\n                            .catch(reject)\n                            .then(function(team) {\n                                console.log('TEAM ROSTER', roster, team)\n\n                                //////////////////////////////\n\n                                var slotCreated;\n\n                                var promise = self.$fluro.modal({\n                                        component: TeamSelectModal,\n                                        options: {\n                                            roster,\n                                            team,\n                                        }\n                                    })\n                                    .then(function(assignments) {\n                                        console.log('Add assignments', assignments);\n\n                                        var promises = _.chain(assignments)\n                                            .map(function(assignment) {\n\n                                                //Get the slot name \n                                                var assignmentSlotName = String(assignment.title).toLowerCase();\n\n                                                //Find the matching slot on this roster\n                                                var matchingSlot = _.find(roster.slots, function(slot) {\n                                                    return slot.title.toLowerCase() == assignmentSlotName;\n                                                })\n\n                                                //////////////////////////////////////\n\n                                                //If there is no matching slot\n                                                if (!matchingSlot) {\n\n                                                    //Create a new slot\n                                                    matchingSlot = {\n                                                        title: assignment.title,\n                                                        assignments: [],\n                                                    }\n\n                                                    //Add the slot in\n                                                    roster.slots.push(matchingSlot);\n                                                    slotCreated = true;\n                                                    console.log('Add Slot to roster', roster.slots);\n                                                }\n\n                                                //////////////////////////////////////\n\n                                                //If there is no assignments on this slot\n                                                return new Promise(function(resolve, reject) {\n\n                                                    //Create the assignment\n                                                    return MultiPlannerService.injectAssignment(roster, assignment)\n                                                        .then(function(savedAssignment) {\n                                                            console.log('Created an assignment', savedAssignment)\n                                                            resolve(savedAssignment);\n                                                        })\n                                                        .catch(function(err) {\n                                                            console.log('ERROR', err);\n                                                            resolve(null);\n                                                        })\n                                                })\n                                            })\n                                            .compact()\n                                            .value();\n\n\n\n                                        ///////////////////////////////////\n\n                                        if (!promises.length) {\n                                            return;\n                                        }\n                                        ///////////////////////////////////\n\n                                        if (slotCreated) {\n                                            self.mapDefaultRosters();\n                                        }\n\n\n                                        ///////////////////////////////////\n\n                                        self.$set(roster, 'sending', true);\n\n                                        Promise.all(promises)\n                                            .then(function(res) {\n                                                console.log('ALL COMPLETE', res);\n                                                self.$set(roster, 'sending', false);\n                                            })\n                                            .catch(function(err) {\n                                                console.log('ERROR', err);\n                                                self.$set(roster, 'sending', false);\n                                            })\n\n                                    })\n                                    .catch(reject);\n                            })\n\n\n\n                    })\n                    .catch(reject)\n\n            })\n\n        },\n        nudge(type, id) {\n            var self = this;\n            var id = self.$fluro.utils.getStringID(id);\n            var promise = self.$fluro.api.post(`/assignments/nudge/${type}/${id}`);\n\n            ///////////////////\n\n            promise.then(function(res) {\n\n                if (res.data.success.length) {\n                    self.$fluro.notify(`${res.data.success.length} Notifications sent`)\n                } else {\n                    self.$fluro.notify(`No nudges were sent`)\n                }\n            })\n\n            ///////////////////\n\n            return promise;\n        },\n        nudgeRoster(roster) {\n            var self = this;\n\n            self.$set(roster, 'nudging', true);\n            self.nudge('roster', roster)\n                .then(function(res) {\n\n\n\n                    self.$set(roster, 'nudging', false);\n\n                })\n                .catch(function(err) {\n                    self.$set(roster, 'nudging', false);\n                })\n        },\n        openModal(item) {\n            var self = this;\n            self.processing = true;\n\n            function done() {\n                self.processing = false;\n            }\n\n            var canEdit = self.$fluro.access.canEditItem(item);\n\n            console.log('CANT EDIT', canEdit, item)\n            if (canEdit) {\n                self.$fluro.global.edit(item, true)\n                    .then(done, done);\n            } else {\n                self.$fluro.global.view(item, true)\n                    .then(done, done);\n            }\n        },\n        deselect() {\n            var self = this;\n            self.selected = null;\n        },\n        isSelectedSlot(roster, slotName) {\n            var self = this;\n\n            if (!self.selected) {\n                return;\n            }\n\n            return (self.selected.roster) == roster && (String(slotName).toLowerCase() == String(self.selected.slot.title).toLowerCase());\n\n        },\n        selectSlotCell(slot, slotIndex) {\n\n            console.log('SELECT SLOT CELL')\n            var self = this;\n            var roster = self.model;\n\n            //Find the slot\n            var findSlot = _.find(roster.slots, function(cell) {\n                return String(cell.title).toLowerCase() == String(slot.title).toLowerCase();\n            })\n\n\n            if (!findSlot) {\n                findSlot = {\n                    minimum: slot.minimum,\n                    maximum: slot.maximum,\n                    title: slot.title,\n                    assignments: [],\n                }\n\n                //Let's add it\n                roster.slots.splice(slotIndex, 0, findSlot);\n                console.log('Upsert cell!', roster._id, roster.event, findSlot)\n            }\n\n            ////////////////////////////////////////\n\n            self.$set(self, 'selected', {\n                roster,\n                slot: findSlot,\n            });\n\n        },\n        editRosterDefinition(rosterType) {\n            console.log('Edit', rosterType)\n\n            var self = this;\n\n            //Load the definition\n            self.$fluro.content.get(rosterType._id)\n                .then(function(definition) {\n\n                    //Open the modal\n                    var promise = self.$fluro.modal({\n                            component: RosterSlotModal,\n                            options: {\n                                definition,\n                            }\n                        })\n                        .then(function(updatedDefinition) {\n\n                            updatedDefinition.slots = updatedDefinition.data.slots || [];\n                            self.knownDefinitions[updatedDefinition.definitionName] = updatedDefinition;\n\n                            self.mapDefaultRosters();\n                            // self.$set(self.defaultRosters, definition.definitionName, updatedDefinition);\n                            // var newSlots = _.map(res.slots, function(slot, index) {\n\n                            //     var slotName = String(slot.title).toLowerCase();\n                            //     var existingSlot = existing.slots[slotName];\n                            //     if (!existingSlot) {\n                            //         slot.slotName = slotName;\n                            //         slot.index = index;\n                            //         existingSlot = existing.slots[slotName] = slot;\n                            //     }\n                            // });\n\n                            // //We need to map the slots to the columns\n                            // _.each(self.columns, function(column) {\n                            //     if(column.rosters[definition.definitionName]) {\n\n                            //         self.$set(rosterType, 'slots', res.slots);\n                            //         column.rosters[definition.definitionName].slots = newSlots;\n                            //     }\n                            // })\n\n                            ///////////////////////////////////////////////////\n\n\n\n\n                            // console.log('RESPONSE',  res, rosterType);\n                        })\n                        .catch(function(err) {\n\n                        });\n\n                })\n\n\n\n            // this.$fluro.global.edit(rosterType, true);\n            // this.$actions.open([rosterType])\n        },\n    },\n}\n</script>\n<style lang=\"scss\">\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n$light-grey: #eaebee;\n$dark-grey: #ced0d7;\n$border: darken($light-grey, 10%);\n\n$min-width:190px;\n$max-width:220px;\n\n.plan-editor {\n    border-left: 2px solid;\n    width: 50vw;\n    min-width: 400px;\n    display: flex;\n    position: relative;\n    background: $light-grey;\n    box-shadow: 0 0 50px rgba(#000, 0.5);\n    z-index: 100;\n}\n\n.roster-title {\n    font-size: 10px;\n    vertical-align: middle;\n    text-align: right;\n    background: $dark-grey;\n    line-height: 22px;\n    padding: 4px 10px 4px 8px !important;\n}\n\n.slot-cell {\n    // padding: 15px;\n    width: 200px;\n    background: #fafafa;\n    vertical-align: top;\n    border-bottom: 1px solid $border !important;\n    border-right: 1px solid $border;\n\n    .slot-cell-inner {\n        position: relative;\n        min-height: 26px;\n    }\n\n    &.selected {\n        box-shadow: 0 0 20px $primary;\n        border-color: 2px solid $primary !important;\n        outline: 1px solid $primary;\n        z-index: 100;\n        // transform: scale(1.1);\n        // transition: all 0.3s;\n    }\n\n    .slot-placeholder {\n        // position: absolute;\n        // z-index: 0;\n        // pointer-events: none;\n\n    }\n\n    .slot-assignments {\n        position: absolute;\n        left: 0;\n        top: 0;\n        bottom: 0;\n        right: 0;\n        z-index: 1;\n        // border: 1px solid #ff0066;\n        // min-height:\n    }\n}\n\n// .cell {\n//     // padding: 15px;\n//     background: #fff;\n// }\n\n.sidebar {\n    width: 320px;\n    flex: none;\n    z-index: 100;\n    background: #fff;\n    border-left: 1px solid $border;\n    display: flex;\n    // box-shadow: 0 0 50px rgba(#000, 0.5);\n}\n\n\n.plan-cell {\n    // padding: 15px;\n    // background: #fafafa;\n    vertical-align: top;\n    border-right: 1px solid $border;\n    position: relative;\n\n\n    .plan-item {\n        background: #fff;\n        display: block;\n        border-bottom: 1px solid $border !important;\n        padding: 5px 10px;\n        font-size: 12px;\n\n        text-overflow: ellipsis;\n        white-space: nowrap;\n        ;\n\n        &:hover {\n            background: #fafafa;\n        }\n    }\n}\n\n.add-cell {\n    // padding: 15px;\n    vertical-align: middle;\n    text-align: center;\n    border-bottom: 1px solid $border !important;\n    border-right: 1px solid $border;\n    // border-left: 1px solid $border;\n\n    p {\n        font-size: 0.8em;\n        display: block;\n        white-space: normal;\n        opacity: 0.5;\n        padding: 5px;\n        width: 100%;\n        margin: 0;\n    }\n}\n\n// .assignment {\n//     border-top: 1px solid $border;\n\n//     &:first-child {\n//         border-top: none;\n//     }\n// }\n// \n.edit-cell,\n.mini-buttons {\n    text-align: center;\n    padding: 4px;\n}\n\n.mini-btn {\n    display: inline-block;\n    border: 1px solid $border;\n    padding: 2px 5px;\n    font-size: 11px;\n    background: #fff;\n    border-radius: 3px;\n    color: inherit;\n\n    &[block] {\n        display: block;\n        text-align: center;\n        margin: 1px;\n    }\n}\n\n\n.event-details {\n    font-size: 12px;\n    padding: 10px;\n    text-align: center;\n    background: #fff;\n    border-left: 1px solid $border !important;\n\n    &:first-child {\n        border-left: none;\n    }\n\n    .small {\n        font-size: 0.8em;\n    }\n}\n\n.roster-default-link {\n\n    background: $light-grey;\n    font-size: 9px;\n    font-weight: 500;\n    vertical-align: top;\n    text-align: right;\n    letter-spacing: 0.05em;\n    border-bottom: 1px solid $border !important;\n\n    span {\n        opacity: 0;\n    }\n\n    &:hover span {\n        opacity: 0.5;\n    }\n}\n\n.date-header {\n    padding: 0 10px;\n    text-align: center;\n    font-weight: 600;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n    font-size: 10px;\n\n    .divide-left {\n        border-bottom: 1px solid $border;\n        background: #fff;\n        height: 30px;\n        line-height: 30px;\n    }\n\n    // @extend .divide-right;\n\n}\n\n.time-header {\n    padding: 0 10px;\n    height: 30px;\n    line-height: 30px;\n    text-align: center;\n    font-weight: 600;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n    font-size: 11px;\n    position: relative;\n    min-width: $min-width;\n    width: $max-width;\n    // max-width:220px;\n    white-space: nowrap;\n    background: #fff;\n    // border-top: 1px solid $border;\n    border-left: 1px solid $border;\n\n    &:first-child {\n        border-left: none;\n    }\n\n    .realm-bar {\n        display: block;\n        position: absolute;\n        top: auto;\n        left: 0;\n        bottom: 0;\n        right: 0;\n        width: 100%;\n        height: 3px;\n    }\n}\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.plan-editor {\n  border-left: 2px solid;\n  width: 50vw;\n  min-width: 400px;\n  display: flex;\n  position: relative;\n  background: #eaebee;\n  box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);\n  z-index: 100;\n}\n\n.roster-title {\n  font-size: 10px;\n  vertical-align: middle;\n  text-align: right;\n  background: #ced0d7;\n  line-height: 22px;\n  padding: 4px 10px 4px 8px !important;\n}\n\n.slot-cell {\n  width: 200px;\n  background: #fafafa;\n  vertical-align: top;\n  border-bottom: 1px solid #ced0d7 !important;\n  border-right: 1px solid #ced0d7;\n}\n.slot-cell .slot-cell-inner {\n  position: relative;\n  min-height: 26px;\n}\n.slot-cell.selected {\n  box-shadow: 0 0 20px #2ad4b9;\n  border-color: 2px solid #2ad4b9 !important;\n  outline: 1px solid #2ad4b9;\n  z-index: 100;\n}\n.slot-cell .slot-assignments {\n  position: absolute;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  z-index: 1;\n}\n\n.sidebar {\n  width: 320px;\n  flex: none;\n  z-index: 100;\n  background: #fff;\n  border-left: 1px solid #ced0d7;\n  display: flex;\n}\n\n.plan-cell {\n  vertical-align: top;\n  border-right: 1px solid #ced0d7;\n  position: relative;\n}\n.plan-cell .plan-item {\n  background: #fff;\n  display: block;\n  border-bottom: 1px solid #ced0d7 !important;\n  padding: 5px 10px;\n  font-size: 12px;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.plan-cell .plan-item:hover {\n  background: #fafafa;\n}\n\n.add-cell {\n  vertical-align: middle;\n  text-align: center;\n  border-bottom: 1px solid #ced0d7 !important;\n  border-right: 1px solid #ced0d7;\n}\n.add-cell p {\n  font-size: 0.8em;\n  display: block;\n  white-space: normal;\n  opacity: 0.5;\n  padding: 5px;\n  width: 100%;\n  margin: 0;\n}\n\n.edit-cell,\n.mini-buttons {\n  text-align: center;\n  padding: 4px;\n}\n\n.mini-btn {\n  display: inline-block;\n  border: 1px solid #ced0d7;\n  padding: 2px 5px;\n  font-size: 11px;\n  background: #fff;\n  border-radius: 3px;\n  color: inherit;\n}\n.mini-btn[block] {\n  display: block;\n  text-align: center;\n  margin: 1px;\n}\n\n.event-details {\n  font-size: 12px;\n  padding: 10px;\n  text-align: center;\n  background: #fff;\n  border-left: 1px solid #ced0d7 !important;\n}\n.event-details:first-child {\n  border-left: none;\n}\n.event-details .small {\n  font-size: 0.8em;\n}\n\n.roster-default-link {\n  background: #eaebee;\n  font-size: 9px;\n  font-weight: 500;\n  vertical-align: top;\n  text-align: right;\n  letter-spacing: 0.05em;\n  border-bottom: 1px solid #ced0d7 !important;\n}\n.roster-default-link span {\n  opacity: 0;\n}\n.roster-default-link:hover span {\n  opacity: 0.5;\n}\n\n.date-header {\n  padding: 0 10px;\n  text-align: center;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  font-size: 10px;\n}\n.date-header .divide-left {\n  border-bottom: 1px solid #ced0d7;\n  background: #fff;\n  height: 30px;\n  line-height: 30px;\n}\n\n.time-header {\n  padding: 0 10px;\n  height: 30px;\n  line-height: 30px;\n  text-align: center;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  font-size: 11px;\n  position: relative;\n  min-width: 190px;\n  width: 220px;\n  white-space: nowrap;\n  background: #fff;\n  border-left: 1px solid #ced0d7;\n}\n.time-header:first-child {\n  border-left: none;\n}\n.time-header .realm-bar {\n  display: block;\n  position: absolute;\n  top: auto;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  width: 100%;\n  height: 3px;\n}\n\n/*# sourceMappingURL=RosterMain.vue.map */"]}, media: undefined });

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
var __vue_render__$8 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "flex-column",
    [
      _vm.loading
        ? [_c("fluro-page-preloader", { attrs: { contain: "" } })]
        : _c(
            "tabset",
            { attrs: { justified: true, vertical: true } },
            [
              _c(
                "tab",
                { attrs: { heading: "Roster" } },
                [
                  _c(
                    "flex-column-body",
                    { staticStyle: { background: "#fafafa" } },
                    [
                      _c("roster-main", {
                        attrs: { definition: _vm.definition },
                        model: {
                          value: _vm.model,
                          callback: function($$v) {
                            _vm.model = $$v;
                          },
                          expression: "model"
                        }
                      })
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _vm.definition &&
              _vm.definition.fields &&
              _vm.definition.fields.length
                ? _c(
                    "tab",
                    {
                      attrs: { heading: _vm.definition.title + " Information" }
                    },
                    [
                      _c(
                        "flex-column-body",
                        { staticStyle: { background: "#fafafa" } },
                        [
                          _c(
                            "v-container",
                            [
                              _c(
                                "constrain",
                                { attrs: { sm: "" } },
                                [
                                  _c("fluro-content-form", {
                                    attrs: {
                                      options: _vm.options,
                                      fields: _vm.definition.fields
                                    },
                                    model: {
                                      value: _vm.model.data,
                                      callback: function($$v) {
                                        _vm.$set(_vm.model, "data", $$v);
                                      },
                                      expression: "model.data"
                                    }
                                  })
                                ],
                                1
                              )
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                : _vm._e()
            ],
            1
          )
    ],
    2
  )
};
var __vue_staticRenderFns__$8 = [];
__vue_render__$8._withStripped = true;

  /* style */
  const __vue_inject_styles__$8 = function (inject) {
    if (!inject) return
    inject("data-v-7b9c73ee_0", { source: "/**/\n.border-top[data-v-7b9c73ee] {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right[data-v-7b9c73ee] {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom[data-v-7b9c73ee] {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left[data-v-7b9c73ee] {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.hint[data-v-7b9c73ee] {\n  font-size: 10px;\n  opacity: 0.5;\n  color: inherit;\n  display: block;\n}\n\n/*# sourceMappingURL=roster.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/edit/panels/roster.vue","roster.vue"],"names":[],"mappings":"AAgPA,GAAA;AAYA;EACA,yCAAA;AC1PA;AD6PA;EACA,2CAAA;AC1PA;AD6PA;EACA,4CAAA;AC1PA;AD6PA;EACA,0CAAA;AC1PA;;ADkQA,GAAA;AACA;EACA,eAAA;EACA,YAAA;EACA,cAAA;EACA,cAAA;AC/PA;;AAEA,qCAAqC","file":"roster.vue","sourcesContent":["<template>\n    <flex-column>\n        <template v-if=\"loading\">\n            <fluro-page-preloader contain />\n        </template>\n        <tabset v-else :justified=\"true\" :vertical=\"true\">\n            <tab heading=\"Roster\">\n                <flex-column-body style=\"background: #fafafa;\">\n\n                        \t<roster-main v-model=\"model\" :definition=\"definition\"></roster-main>\n                            <!-- <default-roster-manager :config=\"config\" v-model=\"model.defaultRosters\" :rosterOptions=\"rosterDefinitions.definitions\" /> -->\n                </flex-column-body>\n            </tab>\n            <!-- <tab heading=\"X Scheduled Reminders\">\n                <flex-column-body style=\"background: #fafafa;\">\n                    <v-container>\n                        <constrain md>\n                            <reminder-event-manager :config=\"config\" v-model=\"model.reminders\" :allAssignmentOptions=\"model.slots\" />\n                        </constrain>\n                    </v-container>\n                </flex-column-body>\n            </tab> -->\n            <tab :heading=\"`${definition.title} Information`\" v-if=\"definition && definition.fields && definition.fields.length\">\n                <flex-column-body style=\"background: #fafafa;\">\n                    <v-container>\n                        <constrain sm>\n                            <fluro-content-form :options=\"options\" v-model=\"model.data\" :fields=\"definition.fields\" />\n                        </constrain>\n                    </v-container>\n                </flex-column-body>\n            </tab>\n        </tabset>\n    </flex-column>\n</template>\n<script>\n/////////////////////////////////\nimport RosterMain from 'src/components/content/edit/components/RosterMain.vue';\nimport ReminderEventManager from 'src/components/content/edit/components/ReminderEventManager.vue';\nimport FluroContentEditMixin from 'src/components/content/edit/FluroContentEditMixin.js';\n\n/////////////////////////////////\n\nimport Vue from 'vue';\nimport _ from 'lodash';\n\n/////////////////////////////////\n\nexport default {\n\n    mixins: [FluroContentEditMixin],\n    components: { ReminderEventManager,RosterMain },\n    methods: {\n        modelUpdated() {\n            this.update(this.model);\n        },\n        injectAssignment(roster, assignment) {\n            var self = this;\n\n            var rosterID = self.model._id;\n\n            //////////////////////////////////////////////////////////////\n\n            //Get the slot name \n            var assignmentSlotName = String(assignment.title).toLowerCase();\n\n            //Find the matching slot on this roster\n            var matchingSlot = _.find(roster.slots, function(slot) {\n                return slot.title.toLowerCase() == assignmentSlotName;\n            })\n\n            //////////////////////////////////////\n\n            //If there is no matching slot\n            if (!matchingSlot) {\n                return;\n            }\n\n\n            self.$set(assignment, 'sending', true);\n            matchingSlot.assignments.push(assignment);\n\n\n            //////////////////////////////////////\n\n            //If there is no assignments on this slot\n            return new Promise(function(resolve, reject) {\n\n                //Create the assignment\n                return self.createAssignment(roster, matchingSlot.assignments, assignment, true)\n                    .then(function(savedAssignment) {\n\n                        _.assign(assignment, savedAssignment);\n                        self.$set(assignment, 'sending', false);\n                        self.$set(savedAssignment, 'sending', false);\n\n                        console.log('CREATED AND UPDATED ASSIGNMENT', savedAssignment)\n\n\n                        resolve(savedAssignment);\n                    })\n                    .catch(function(err) {\n                        var index = matchingSlot.assignments.indexOf(assignment);\n                        matchingSlot.assignments.splice(index, 1);\n                        resolve(null);\n                    })\n            })\n        },\n\n        createAssignment(rosterID, assignments, details, nopush) {\n\n            var self = this;\n\n            rosterID = self.model._id;\n\n            return new Promise(function(resolve, reject) {\n\n                var contact = details.contact;\n\n                self.$fluro.api.post(`/assignments/roster/${rosterID}`, details)\n                    .then(assignmentCreated)\n                    .catch(assignmentCreateError);\n\n                //////////////////////////////////////////////////\n\n                function assignmentCreated(res) {\n                    var matchingAssignment = res.data;\n                    matchingAssignment.contactName = (matchingAssignment.contact.title || matchingAssignment.contact.firstName + ' ' + matchingAssignment.contact.lastName);\n\n                    if (!nopush) {\n                        var alreadyAssigned = _.some(assignments, {\n                            _id: matchingAssignment._id,\n                        })\n\n                        if (!alreadyAssigned) {\n                            assignments.push(matchingAssignment);\n                        }\n                    }\n\n                    resolve(matchingAssignment);\n                }\n\n                //////////////////////////////////////////////////\n\n\n                function assignmentCreateError(err) {\n                    var err = err.response.data;\n                    var conflictError = err.error;\n                    var message = err.message;\n\n                    if (err.status == 403) {\n                        message = 'You do not have permission to make this action.';\n                    }\n\n                    if (conflictError == 'AssignmentConflictError') {\n                        var array = [{\n                            title: `Add ${contact.firstName} as '${details.title}' anyway`,\n                            description: (contact.firstName || 'this person') + ' can still fulfill this assignment',\n                            force: true,\n                        }]\n\n                        return self.$fluro.options(array, `Conflict!`, message)\n                            .then(function(answer) {\n\n                                details.force = answer.force;\n                                self.$fluro.api.post(`/assignments/roster/${rosterID}`, details)\n                                    .then(assignmentCreated)\n                                    .catch(assignmentCreateError);\n                            })\n                            .catch(function(err) {\n                                reject(err);\n                            })\n                    }\n\n                    self.$fluro.error(err);\n                    reject(err);\n                }\n\n\n            })\n        },\n    },\n    created() {\n        var self = this;\n    },\n    asyncComputed: {\n    \t// definition: {\n    \t// \tdefault: {},\n    \t// \tget() {\n    \t// \t\tvar self = this;\n    \t// \t\treturn new Promise(function(resolve, reject) {\n     //                self.$fluro.content.get(self.model.definition, {})\n     //                    .then(function(res) {\n     //                        resolve(res);\n     //                    })\n     //                    .catch(function(err) {\n     //                        reject(err);\n     //                    })\n     //            })\n    \t// \t},\n    \t// }\n    },\n    computed: {\n        showOutline() {\n            return false;\n        },\n        fieldsOutput() {\n\n            var self = this;\n            var array = [];\n\n            ///////////////////////////////////\n\n            addField('event', {\n                title: 'Event',\n                minimum: 1,\n                maximum: 1,\n                type: 'reference',\n                params: {\n                    restrictType: 'event',\n                },\n            })\n\n            function addField(key, details) {\n                details.key = key;\n                array.push(details)\n            }\n\n            return array;\n\n        },\n    },\n    data() {\n        return {\n\n        }\n    },\n}\n</script>\n<style scoped lang=\"scss\">\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n.hint {\n    font-size: 10px;\n    opacity: 0.5;\n    color: inherit;\n    display: block;\n}\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.hint {\n  font-size: 10px;\n  opacity: 0.5;\n  color: inherit;\n  display: block;\n}\n\n/*# sourceMappingURL=roster.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$8 = "data-v-7b9c73ee";
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
//# sourceMappingURL=roster-5d431bee.js.map