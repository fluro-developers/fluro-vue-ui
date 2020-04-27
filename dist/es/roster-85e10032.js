import { bb as __vue_normalize__, bc as __vue_create_injector__ } from './index-e3244978.js';
import 'vue';
import 'vuedraggable';
import 'vue-color';
import 'signature_pad';
import 'fluro';
import 'vue2-ace-editor';
import 'js-beautify';
import 'vuex-map-fields';
import 'async';
import 'tippy.js';
import 'tiptap';
import 'tiptap-commands';
import 'tiptap-extensions';
import { F as FluroContentEditMixin } from './FluroContentEditMixin-a27a686c.js';
import './FluroExclusiveSelector-cd52f32b.js';
import { R as ReminderEventManager } from './ReminderEventManager-8f91b982.js';

//

var script = {
  mixins: [FluroContentEditMixin],
  components: {
    ReminderEventManager,
    RosterMain
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
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flex-column',[(_vm.loading)?[_c('fluro-page-preloader',{attrs:{"contain":""}})]:_c('tabset',{attrs:{"justified":true,"vertical":true}},[_c('tab',{attrs:{"heading":"Roster"}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}})],1),_vm._v(" "),(_vm.definition && _vm.definition.fields && _vm.definition.fields.length)?_c('tab',{attrs:{"heading":((_vm.definition.title) + " Information")}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',[_c('constrain',{attrs:{"sm":""}},[_c('fluro-content-form',{attrs:{"options":_vm.options,"fields":_vm.definition.fields},model:{value:(_vm.model.data),callback:function ($$v) {_vm.$set(_vm.model, "data", $$v);},expression:"model.data"}})],1)],1)],1)],1):_vm._e()],1)],2)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-e2b63760_0", { source: ".border-top[data-v-e2b63760]{border-top:1px solid rgba(0,0,0,.05)}.border-right[data-v-e2b63760]{border-right:1px solid rgba(0,0,0,.05)}.border-bottom[data-v-e2b63760]{border-bottom:1px solid rgba(0,0,0,.05)}.border-left[data-v-e2b63760]{border-left:1px solid rgba(0,0,0,.05)}.hint[data-v-e2b63760]{font-size:10px;opacity:.5;color:inherit;display:block}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-e2b63760";
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

export default __vue_component__;
//# sourceMappingURL=roster-85e10032.js.map
