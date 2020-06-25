import { r as FluroConfirmButton, bh as __vue_normalize__, bi as __vue_create_injector__, bj as _$1, aM as FluroContentForm, aN as FluroContentFormField } from './index-20f019b0.js';
import 'vue';
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
import { F as FluroContentEditMixin } from './FluroContentEditMixin-5d415b50.js';
import { F as FluroExclusiveSelector } from './FluroExclusiveSelector-204eee60.js';

//
var script = {
  props: {
    value: {
      type: Array
    },
    config: {
      required: true
    }
  },
  mixins: [FluroContentEditMixin],
  components: {
    draggable,
    FluroConfirmButton
  },

  data() {
    return {
      model: this.value,
      proposed: {},
      dragOptions: {},
      currentlyExpanded: [],
      drag: false
    };
  },

  methods: {
    addSlot() {
      var self = this;
      var fields = [{
        title: 'Position Title',
        description: 'The name of this position',
        key: 'title',
        minimum: 1,
        maximum: 1,
        type: 'string',
        placeholder: 'Eg. Leader, Co-Leader, Coach',
        params: {
          autofocus: true
        }
      }, {
        title: 'Contacts',
        key: 'contacts',
        description: 'Select people to fill this position',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        params: {
          restrictType: 'contact',
          allDefinitions: true
        }
      }, {
        title: 'Permission Roles',
        key: 'roles',
        description: 'Select access roles that will be granted within the context of this group to anyone added into this position',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        params: {
          restrictType: 'role',
          allDefinitions: true,
          searchInheritable: true
        }
      }];
      self.$fluro.prompt(fields, 'New Position').then(function (res) {
        console.log(res);
        self.model.push(res);
      });
    },

    // add() {
    // 				var clone = JSON.parse(JSON.stringify(this.proposed));
    // 				if (!clone.title || !clone.title.length) {
    // 								return;
    // 				}
    // 				delete clone.row;
    // 				this.model.push(clone);
    // 				this.currentlyExpanded.push(false);
    // 				this.proposed = {};
    // },
    remove(index) {
      this.model.splice(index, 1);
    },

    toggleExpanded(index) {
      var self = this;

      if (self.currentlyExpanded[index]) {
        self.$set(self.currentlyExpanded, index, false);
      } else {
        self.$set(self.currentlyExpanded, index, true);
      }
    }

  },
  computed: {
    // addFields() {
    // 				var self = this;
    // 				var array = [];
    // 				///////////////////////////////////
    // 				addField('title', {
    // 								title: 'Position Name',
    // 								minimum: 1,
    // 								maximum: 1,
    // 								type: 'string',
    // 								placeholder: 'Role/Assignment'
    // 				});
    // 				addField('contacts', {
    // 								title: 'People Responsible',
    // 								minimum: 0,
    // 								maximum: 0,
    // 								type: 'reference',
    // 								directive: 'reference-select',
    // 								params: {
    // 												restrictType: 'contact',
    // 								}
    // 				});
    // 				// addField('title', {
    // 				//     title: 'Grade Title',
    // 				//     minimum: 1,
    // 				//     maximum: 1,
    // 				//     type: 'string',
    // 				// });
    // 				// addField('description', {
    // 				//     title: 'Description',
    // 				//     minimum: 0,
    // 				//     maximum: 1,
    // 				//     type: 'string',
    // 				// });
    // 				///////////////////////////////////
    // 				function addField(key, details) {
    // 								details.key = key;
    // 								array.push(details)
    // 				}
    // 				return array;
    // },
    editFields() {
      var array = []; ///////////////////////////////////

      addField('title', {
        title: 'Position Name',
        minimum: 1,
        maximum: 1,
        type: 'string',
        placeholder: 'Role/Assignment'
      });
      addField('contacts', {
        title: 'Contacts',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        directive: 'reference-select',
        params: {
          restrictType: 'contact'
        }
      });
      addField('roles', {
        title: 'Roles / Permissions',
        description: 'Roles and permissions that should be assigned to people in this position for this group/team',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        directive: 'reference-select',
        params: {
          restrictType: 'role'
        }
      }); // addField('title', {
      //     title: 'Grade Title',
      //     minimum: 1,
      //     maximum: 1,
      //     type: 'string',
      // });
      // addField('description', {
      //     title: 'Description',
      //     minimum: 0,
      //     maximum: 1,
      //     type: 'string',
      // });
      ///////////////////////////////////

      function addField(key, details) {
        details.key = key;
        array.push(details);
      }

      return array;
    }

  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('list-group',[_c('draggable',_vm._b({attrs:{"list":_vm.model,"ghost-class":"ghost-dragging-class"},on:{"start":function($event){_vm.drag=true;},"end":function($event){_vm.drag=false;}}},'draggable',_vm.dragOptions,false),_vm._l((_vm.model),function(assignment,index){return _c('list-group-item',{staticClass:"pa-0",class:_vm.currentlyExpanded[index] ? 'hover-grey' : '',staticStyle:{"width":"100%"}},[_c('v-layout',{attrs:{"align-center":"","ma-0":"","py-0":"","px-2":""}},[_c('v-flex',{attrs:{"xs3":""}},[_c('strong',[_vm._v(_vm._s(assignment.title))]),_vm._v(" "),(assignment.roles && assignment.roles.length)?_c('div',{staticClass:"sm text-muted"},[_vm._v(_vm._s(_vm._f("comma")(assignment.roles,'title')))]):_vm._e()]),_vm._v(" "),_c('v-flex',{attrs:{"xs5":""}},_vm._l((assignment.contacts),function(contact){return _c('v-chip',{attrs:{"small":""}},[_vm._v(_vm._s(contact.title))])}),1),_vm._v(" "),_c('v-flex',{attrs:{"xs2":""}},[_c('v-btn',{staticStyle:{"width":"100%"},attrs:{"px-0":""},on:{"click":function($event){return _vm.toggleExpanded(index)}}},[_c('v-layout',{attrs:{"px-0":""}},[_c('v-flex',{attrs:{"px-0":""}},[_vm._v(_vm._s(!_vm.currentlyExpanded[index] ? 'More' : 'Less'))]),_vm._v(" "),_c('v-flex',{staticClass:"fade",attrs:{"px-0":"","shrink":""}},[_c('fluro-icon',{attrs:{"icon":!_vm.currentlyExpanded[index] ? 'angle-down' : 'angle-up'}})],1)],1)],1)],1),_vm._v(" "),_c('v-flex',{attrs:{"py-1":"","xs2":""}},[_c('fluro-confirm-button',{on:{"click":function($event){return _vm.remove(index)}},scopedSlots:_vm._u([{key:"default",fn:function(ref){
var confirming = ref.confirming;
return [_c('v-btn',{staticStyle:{"width":"100%"},attrs:{"flat":""}},[_vm._v(_vm._s(confirming ? 'Confirm?' : 'Remove'))])]}}],null,true)})],1)],1),_vm._v(" "),(_vm.currentlyExpanded[index])?_c('tabset',{staticStyle:{"width":"100%"}},[_c('tab',{staticClass:"pa-2",attrs:{"heading":"Position Details"}},[_c('fluro-content-form',{ref:"form",refInFor:true,attrs:{"options":_vm.options,"fields":_vm.editFields},scopedSlots:_vm._u([{key:"form",fn:function(ref){
var formFields = ref.formFields;
var fieldHash = ref.fieldHash;
var model = ref.model;
var update = ref.update;
var options = ref.options;
return [_c('v-layout',{attrs:{"wrap":"","pa-4":""}},[_c('v-flex',{attrs:{"xs4":"","sm3":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"outline":_vm.showOutline,"options":options,"field":fieldHash.title},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs8":"","sm9":"","py-0":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"outline":_vm.showOutline,"options":options,"field":fieldHash.contacts},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"outline":_vm.showOutline,"options":options,"field":fieldHash.roles},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1)],1)]}}],null,true),model:{value:(_vm.model[index]),callback:function ($$v) {_vm.$set(_vm.model, index, $$v);},expression:"model[index]"}})],1),_vm._v(" "),_c('tab',{attrs:{"heading":"Advanced"}},[_c('v-layout',{attrs:{"wrap":"","pa-4":""}},[_c('v-flex',{attrs:{"xs12":"","sm6":""}},[_c('v-checkbox',{attrs:{"label":("Allow " + (_vm.model[index].title) + " to view phone numbers and emails of other group members"),"hint":"Should people in this position be able to see the email and phone number of other members in this group/team?","persistent-hint":""},model:{value:(_vm.model[index].shareDetails),callback:function ($$v) {_vm.$set(_vm.model[index], "shareDetails", $$v);},expression:"model[index].shareDetails"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm6":""}},[_c('v-checkbox',{attrs:{"label":"Visible","hint":"Should this group be visible to people in this slot?","persistent-hint":""},model:{value:(_vm.model[index].visible),callback:function ($$v) {_vm.$set(_vm.model[index], "visible", $$v);},expression:"model[index].visible"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm6":""}},[_c('v-checkbox',{attrs:{"label":("Exclude " + (_vm.model[index].title) + " from membership"),"hint":"If checked, these contacts will not be considered 'members' of the group. They will be excluded from reports and other statistics. Typically this would be used for an oversight or an administrative only position.","persistent-hint":""},model:{value:(_vm.model[index].exclude),callback:function ($$v) {_vm.$set(_vm.model[index], "exclude", $$v);},expression:"model[index].exclude"}})],1)],1)],1)],1):_vm._e()],1)}),1)],1),_vm._v(" "),_c('v-btn',{staticClass:"mx-0",attrs:{"color":"primary"},on:{"click":function($event){return _vm.addSlot()}}},[_vm._v("\n\t\t\t\t\t\t\t\t\t\t\t\tAdd Position\n\t\t\t\t\t\t\t\t\t\t\t\t"),_c('fluro-icon',{attrs:{"right":"","icon":"plus"}})],1)],1)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-e4de61a4_0", { source: ".border-top{border-top:1px solid rgba(0,0,0,.05)}.border-right{border-right:1px solid rgba(0,0,0,.05)}.border-bottom{border-bottom:1px solid rgba(0,0,0,.05)}.border-left{border-left:1px solid rgba(0,0,0,.05)}.ghost-dragging-class{opacity:.5;background:#c8ebfb}.fade-enter-active,.fade-leave-active{transition:all 1s}.fade-enter,.fade-leave-to{opacity:0}.hover-grey{background:#fafafa}", map: undefined, media: undefined });

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
  mixins: [FluroContentEditMixin],
  props: {
    value: {
      type: Object,
      default: function () {
        return {};
      }
    },
    config: {
      required: true
    },
    allPositions: {
      type: Array
    }
  },
  components: {
    // FluroContentForm,
    FluroExclusiveSelector
  },

  data() {
    return {
      model: this.value
    };
  },

  created() {},

  methods: {
    validate() {
      var form = this.$refs.form;

      if (!form) {
        return [];
      }

      this.model.errorMessages = form.errorMessages || [];
    },

    validateAllFields() {
      var form = this.$refs.form;
      form.touch();
      this.validate();
    }

  },
  computed: {
    customFields() {
      var self = this;
      var array = [];

      addField('assignments', {
        title: 'Notify',
        minimum: 1,
        maximum: self.allPositions.length + 1,
        type: 'string',
        directive: 'select',
        options: self.allPositions
      });
      addField('trigger', {
        title: 'Trigger when',
        minimum: 1,
        maximum: 1,
        type: 'string',
        directive: 'select',
        defaultValues: ['team.join'],
        options: [{
          name: 'A new contact joins this group',
          value: 'team.join'
        }, {
          name: 'A contact leaves this group',
          value: 'team.leave'
        }, {
          name: 'This group\'s information is updated',
          value: 'content.edit'
        }, {
          name: 'A group member updates their availability',
          value: 'contact.unavailability'
        }, {
          name: 'A group member confirms an assignment',
          value: 'confirmation.confirmed'
        }, {
          name: 'A group member declines an assignments',
          value: 'confirmation.unavailable'
        }, {
          name: 'Group member\'s birthday',
          value: 'contact.birthday'
        }]
      });

      function addField(key, details) {
        details.key = key;
        array.push(details);
      }

      return array;
    },

    sendToFormatted() {
      var self = this;
      var assignments = JSON.parse(JSON.stringify(self.model.assignments)); //console.log('ASSIGNMENTS', assignments);

      if (assignments.length == 1 && assignments[0] == "") {
        return 'All Assignments';
      } else {
        return assignments.join(', ');
      }
    }

  }
};

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.model)?_c('div',{attrs:{"py-0":""}},[_c('fluro-content-form',{ref:"form",attrs:{"options":_vm.options,"fields":_vm.customFields},scopedSlots:_vm._u([{key:"form",fn:function(ref){
var formFields = ref.formFields;
var fieldHash = ref.fieldHash;
var model = ref.model;
var update = ref.update;
var options = ref.options;
return [_c('v-container',{attrs:{"fluid":"","pa-0":""}},[_c('v-layout',{attrs:{"row":"","wrap":"","grid-list-xl":"","py-0":""}},[_c('v-flex',{attrs:{"sm6":"","xs6":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"outline":_vm.showOutline,"options":options,"field":fieldHash.trigger},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"sm6":"","xs6":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"outline":_vm.showOutline,"options":options,"field":fieldHash.assignments},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1)],1)],1)]}}],null,false,2663713191),model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1):_vm._e()};
var __vue_staticRenderFns__$1 = [];

  /* style */
  const __vue_inject_styles__$1 = function (inject) {
    if (!inject) return
    inject("data-v-a9960a48_0", { source: ".capitalize-text{text-transform:capitalize}", map: undefined, media: undefined });

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
      type: Array,
      default: function () {
        return [];
      }
    },
    config: {
      type: Object,
      required: true
    },
    allPositions: {
      type: Array
    }
  },

  created() {
    for (let i = 0; i < this.model.length; i++) {
      this.editing.push(false);
    }
  },

  components: {
    NotificationTeamComponent: __vue_component__$1,
    FluroConfirmButton
  },

  data() {
    return {
      model: this.value,
      proposed: {},
      editing: [],
      clonedModel: this.value
    };
  },

  methods: {
    add() {
      var self = this;
      self.$refs.createform.validateAllFields();
      var clone = JSON.parse(JSON.stringify(self.proposed));

      if (clone.errorMessages.length) {
        return;
      }

      delete clone.row;
      this.model.push(clone);
      this.editing.push(false);
      self.$set(self, 'proposed', {
        'assignments': [''],
        'methods': ['']
      });
    },

    remove(index) {
      this.model.splice(index, 1);
      this.editing.splice(index, 1);
    },

    toggleEdit(index) {
      var self = this; //console.log(self.$refs);
      //console.log('ON TOGGLE', self.model[index], self.clonedModel[index]);

      console.log('MODEL', this.model[index].methods, 'CLONEDMODEL', this.clonedModel[index].methods);

      if (self.editing[index]) {
        if (self.clonedModel[index].assignments.length) {
          self.model[index] = self.clonedModel[index];
          return self.$set(self.editing, index, false);
        }

        return;
      } else {
        return self.$set(self.editing, index, true);
      }
    },

    displayTrigger(value) {
      var data = [{
        name: 'A new contact joins this group',
        value: 'team.join'
      }, {
        name: 'A contact leaves this group',
        value: 'team.leave'
      }, {
        name: 'This group\'s information is updated',
        value: 'content.edit'
      }, {
        name: 'A group member updates their availability',
        value: 'contact.unavailability'
      }, {
        name: 'A group member confirms an assignment',
        value: 'confirmation.confirmed'
      }, {
        name: 'A group member declines an assignments',
        value: 'confirmation.unavailable'
      }, {
        name: 'Group member\'s birthday',
        value: 'contact.birthday'
      }];

      var res = _$1.find(data, function (obj) {
        return value == obj.value;
      });

      return res.name;
    },

    displayAssignments(value) {
      if (!Array.isArray(value)) {
        return;
      } else if (value.length) {
        return value.join(', ');
      } else {
        return value;
      }
    }

  },
  watch: {
    'model': function () {
      this.clonedModel = JSON.parse(JSON.stringify(this.model));
    }
  },
  computed: {
    allPositionsObjects() {
      var self = this;
      return _$1.map(self.allPositions, function (pos) {
        return {
          'name': pos,
          'value': pos
        };
      });
    }

  }
};

/* script */
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('h4',[_vm._v(_vm._s(_vm.model.length)+" notification trigger"+_vm._s(_vm.model.length == 1 ? '' : 's'))]),_vm._v(" "),_c('p',{staticClass:"muted"},[_vm._v("Add notifications for when events happen within this group")]),_vm._v(" "),_c('list-group',_vm._l((_vm.model),function(notification,index){return _c('list-group-item',{key:JSON.stringify(notification)},[_c('v-layout',{attrs:{"align-center":"","row":"","wrap":"","ma-0":""}},[_c('v-flex',{staticStyle:{"text-align":"center"},attrs:{"sm1":"","xs1":"","pa-1":""}},[_c('fluro-icon',{directives:[{name:"tippy",rawName:"v-tippy"}],attrs:{"icon":"bell","content":"Sends notification"}})],1),_vm._v(" "),_c('v-flex',{staticClass:"full-width",attrs:{"sm7":"","xs11":"","pa-1":""}},[_c('strong',[_vm._v(_vm._s(_vm.displayTrigger(notification.trigger)))]),_vm._v(" "),_c('p',{staticClass:"muted mb-0"},[_vm._v("Notify "+_vm._s(_vm.displayAssignments(notification.assignments)))]),_vm._v(" "),(_vm.editing[index])?_c('notification-team-component',{attrs:{"config":_vm.config,"allPositions":_vm.allPositionsObjects},model:{value:(_vm.clonedModel[index]),callback:function ($$v) {_vm.$set(_vm.clonedModel, index, $$v);},expression:"clonedModel[index]"}}):_vm._e()],1),_vm._v(" "),_c('v-flex',{staticClass:"full-width",attrs:{"sm2":"","xs6":"","py-0":""}},[_c('v-btn',{attrs:{"block":""},on:{"click":function($event){return _vm.toggleEdit(index)}}},[_vm._v(_vm._s(_vm.editing[index] ? 'Done' : 'Edit'))])],1),_vm._v(" "),_c('v-flex',{staticClass:"full-width",attrs:{"sm2":"","xs6":"","py-0":""}},[_c('fluro-confirm-button',{attrs:{"content":"Remove"},on:{"click":function($event){return _vm.remove(index)}},scopedSlots:_vm._u([{key:"default",fn:function(ref){
var confirming = ref.confirming;
return [_c('v-btn',{staticStyle:{"transition":"all 0.1s","width":"100%"},attrs:{"flat":"","block":"","color":confirming ? 'red' : ''}},[_vm._v(_vm._s(confirming ? 'Confirm?' : 'Remove'))])]}}],null,true)})],1)],1)],1)}),1),_vm._v(" "),_c('fluro-panel',[_c('fluro-panel-body',[_c('form',{on:{"submit":function($event){$event.preventDefault();$event.stopPropagation();return _vm.add()}}},[_c('v-container',{attrs:{"fluid":"","grid-list-xl":"","pa-1":""}},[_c('v-layout',{attrs:{"row":"","wrap":"","grid-list-xl":""}},[_c('v-flex',{attrs:{"sm10":"","xs12":""}},[_c('notification-team-component',{ref:"createform",attrs:{"config":_vm.config,"allPositions":_vm.allPositionsObjects},model:{value:(_vm.proposed),callback:function ($$v) {_vm.proposed=$$v;},expression:"proposed"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"sm2":"","xs12":""}},[_c('v-btn',{attrs:{"block":"","color":"primary","type":"submit"},on:{"click":function($event){return _vm.add()}}},[_vm._v("Add")])],1)],1)],1)],1)])],1)],1)};
var __vue_staticRenderFns__$2 = [];

  /* style */
  const __vue_inject_styles__$2 = function (inject) {
    if (!inject) return
    inject("data-v-d5d67026_0", { source: ".border-top{border-top:1px solid rgba(0,0,0,.05)}.border-right{border-right:1px solid rgba(0,0,0,.05)}.border-bottom{border-bottom:1px solid rgba(0,0,0,.05)}.border-left{border-left:1px solid rgba(0,0,0,.05)}.full-width{width:100%}.fade-enter-active,.fade-leave-active{transition:all 1s}.fade-enter,.fade-leave-to{opacity:0}", map: undefined, media: undefined });

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
  components: {
    FluroContentForm,
    FluroContentFormField
  },
  props: {
    value: {
      type: Object
    }
  },

  data() {
    return {
      model: this.value,
      editMode: false,
      saving: false
    };
  },

  computed: {
    canEdit() {
      return this.$fluro.access.canEditItem(this.model);
    },

    fields() {
      var self = this;
      var array = [];
      array.push({
        title: 'Track Title',
        key: 'title',
        type: 'string',
        minimum: 1,
        maximum: 1
      });
      array.push({
        title: 'Enable Recurring Events',
        key: 'autoRecur',
        type: 'boolean',
        minimum: 0,
        maximum: 1
      });
      array.push({
        title: 'Event Type',
        // description: 'Choose an event type',
        key: 'recurDefinition',
        type: 'string',
        directive: 'select',
        options: self.eventDefinitionOptions,
        minimum: 0,
        maximum: 1
      });
      array.push({
        title: 'Track Start Date',
        description: 'When do events start for this track',
        key: 'nextRecurDate',
        type: 'date',
        directive: 'date-select',
        minimum: 1,
        maximum: 1
      });
      array.push({
        title: 'Track End Date',
        description: 'On this date all events will cease for this track and the track will be archived',
        key: 'archiveDate',
        type: 'date',
        directive: 'date-select',
        minimum: 0,
        maximum: 1
      });
      array.push({
        title: 'Start Time',
        description: 'When do events for this track usually start?',
        key: 'defaultStartTime',
        type: 'string',
        directive: 'time-select',
        minimum: 1,
        maximum: 1
      });
      array.push({
        title: 'Duration (mins)',
        description: 'How long do these events usually run for?',
        key: 'defaultDuration',
        type: 'integer',
        params: {
          minValue: 0
        },
        defaultValues: [90],
        minimum: 1,
        maximum: 1
      });
      array.push({
        title: 'Timezone',
        description: 'What timezone do these events run in? Leave blank to use account default',
        key: 'defaultTimezone',
        type: 'string',
        directive: 'timezone-select',
        minimum: 0,
        maximum: 1
      });
      array.push({
        title: 'Meets every',
        // description: 'Choose an event type',
        key: 'recurCount',
        type: 'integer',
        minimum: 1,
        maximum: 1
      });

      var frequencyOptions = _.map([{
        title: 'Week',
        name: 'Week',
        value: 'weeks'
      }, {
        title: 'Month',
        name: 'Month',
        value: 'months'
      } //'year',
      ], function (measure) {
        if (self.model.recurCount != 1) {
          measure.name = measure.title = `${measure.title}s`;
        }

        return measure;
      });

      array.push({
        title: 'Frequency',
        // description: 'Choose an event type',
        key: 'recurMeasure',
        type: 'string',
        minimum: 1,
        maximum: 1,
        directive: 'select',
        options: frequencyOptions
      });
      array.push({
        title: 'On the',
        // description: 'Choose an event type',
        key: 'recurNth',
        type: 'string',
        directive: 'select',
        minimum: 1,
        maximum: 1,
        options: [{
          name: 'Same Date',
          value: 'date'
        }, {
          name: 'First',
          value: '1'
        }, {
          name: 'Second',
          value: '2'
        }, {
          name: 'Third',
          value: '3'
        }, {
          name: 'Fourth',
          value: '4'
        }, {
          name: 'Fifth',
          value: '5'
        }],
        expressions: {
          show() {
            return self.model.recurMeasure == 'months';
          }

        }
      });
      array.push({
        title: 'Weekday',
        // description: 'Choose an event type',
        key: 'recurWeekday',
        type: 'string',
        directive: 'select',
        minimum: 1,
        maximum: 1,
        options: [{
          name: 'Sunday',
          value: 'sunday'
        }, {
          name: 'Monday',
          value: 'monday'
        }, {
          name: 'Tuesday',
          value: 'tuesday'
        }, {
          name: 'Wednesday',
          value: 'wednesday'
        }, {
          name: 'Thursday',
          value: 'thursday'
        }, {
          name: 'Friday',
          value: 'friday'
        }, {
          name: 'Saturday',
          value: 'saturday'
        }],
        expressions: {
          show() {
            return self.model.recurMeasure == 'weeks' || self.model.recurMeasure == 'months' && self.model.recurNth != 'date';
          }

        }
      });
      return array;
    },

    summary() {
      var self = this;
      var track = this.model;
      var pieces = [];
      pieces.push(track.defaultDuration + 'min');
      pieces.push(self.$fluro.types.readable(track.recurDefinition || 'event'));

      if (track.autoRecur) {
        pieces.push(`-`);
        pieces.push(`Meets every`);

        switch (track.recurMeasure) {
          case 'weeks':
            if (track.recurCount = 1) {
              pieces.push('week');
            } else {
              pieces.push(track.recurCount);
              pieces.push(track.recurMeasure);
            }

            pieces.push('on');
            pieces.push(track.recurWeekday);
            break;

          case 'months':
            if (track.recurCount = 1) {
              pieces.push('month');
            } else {
              pieces.push(track.recurCount);
              pieces.push(track.recurMeasure);
            }

            pieces.push('on the');

            switch (track.recurNth) {
              case 'date':
                pieces.push(track.recurNth);
                break;

              case '1':
                pieces.push('first');
                break;

              case '2':
                pieces.push('second');
                break;

              case '3':
                pieces.push('third');
                break;

              case '4':
                pieces.push('fourth');
                break;

              case '5':
                pieces.push('fifth');
                break;
            }

            pieces.push(track.recurWeekday);
            pieces.push('of the month');
            break;
        }
      }

      return _.compact(pieces).join(' ');
    },

    eventDefinitionOptions() {
      var self = this;
      return _.map(self.eventDefinitions, function (definition) {
        return {
          title: definition.title,
          name: definition.title,
          value: definition.definitionName
        };
      });
    }

  },
  watch: {
    value(v) {
      this.model = v;
    }

  },
  methods: {
    save() {
      var self = this;
      self.saving = true;
      self.$fluro.api.put(`/content/${self.model.definition || 'eventtrack'}/${self.model._id}`, self.model).then(function (res) {
        _.assign(self.model, res);

        self.$fluro.notify(`Event track updated successfully`);
        self.editMode = false;
        self.saving = false;
      }).catch(function (err) {
        self.$fluro.error(err);
        self.editMode = false;
        self.saving = false;
      });
    },

    cancel() {
      this.editMode = false;
    }

  },
  asyncComputed: {
    eventDefinitions: {
      default: [],

      get() {
        var self = this; // self.loadingDefinitions = true;
        // return new Promise(function(resolve, reject) {

        return self.$fluro.types.subTypes('event', true); // })
      }

    }
  }
};

/* script */
const __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('fluro-panel',[_c('fluro-panel-title',[_c('v-layout',{attrs:{"align-center":""}},[_c('v-flex',[_c('h3',[_vm._v(_vm._s(_vm.model.title))])]),_vm._v(" "),_c('v-flex',{attrs:{"shrink":""}},[_c('v-btn',{staticClass:"mx-0",attrs:{"small":"","icon":""},on:{"click":function($event){return _vm.$actions.open([_vm.model])}}},[_c('fluro-icon',{attrs:{"icon":"ellipsis-h"}})],1),_vm._v(" "),(_vm.editMode)?[_c('v-btn',{staticClass:"mx-0",attrs:{"small":""},on:{"click":function($event){return _vm.cancel()}}},[_vm._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tCancel\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t")]),_vm._v(" "),_c('v-btn',{staticClass:"mx-0",attrs:{"small":"","color":"primary","loading":_vm.saving},on:{"click":function($event){return _vm.save()}}},[_vm._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tSave\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t"),_c('fluro-icon',{attrs:{"right":"","icon":"check"}})],1)]:(_vm.canEdit)?[(!_vm.editMode)?_c('v-btn',{staticClass:"mx-0",attrs:{"small":"","icon":""},on:{"click":function($event){_vm.editMode = true;}}},[_c('fluro-icon',{attrs:{"icon":"pencil"}})],1):_vm._e()]:_vm._e()],2)],1)],1),_vm._v(" "),(_vm.editMode)?_c('fluro-panel-body',[_c('fluro-content-form',{attrs:{"fields":_vm.fields},scopedSlots:_vm._u([{key:"form",fn:function(ref){
var formFields = ref.formFields;
var fieldHash = ref.fieldHash;
var model = ref.model;
var update = ref.update;
var options = ref.options;
return [_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.title},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.autoRecur},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}}),_vm._v(" "),(model.autoRecur)?[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.recurDefinition},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}}),_vm._v(" "),_c('v-layout',[_c('v-flex',[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.nextRecurDate},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-spacer'),_vm._v(" "),_c('v-flex',[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.archiveDate},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1)],1),_vm._v(" "),_c('v-layout',[_c('v-flex',[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.recurCount},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-spacer'),_vm._v(" "),_c('v-flex',[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.recurMeasure},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-spacer'),_vm._v(" "),_c('v-flex',[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.recurNth},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.recurWeekday},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1)],1),_vm._v(" "),_c('v-layout',[_c('v-flex',[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.defaultStartTime},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-spacer'),_vm._v(" "),_c('v-flex',[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.defaultDuration},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-spacer'),_vm._v(" "),_c('v-flex',[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.defaultTimezone},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1)],1)]:_vm._e()]}}],null,false,776210887),model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1):_c('fluro-panel-body',[_vm._v("\n\t\t\t\t\t\t\t\t"+_vm._s(_vm.summary)+"\n\t\t\t\t")])],1)};
var __vue_staticRenderFns__$3 = [];

  /* style */
  const __vue_inject_styles__$3 = undefined;
  /* scoped */
  const __vue_scope_id__$3 = undefined;
  /* module identifier */
  const __vue_module_identifier__$3 = undefined;
  /* functional template */
  const __vue_is_functional_template__$3 = false;
  /* style inject */
  
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
    undefined,
    undefined,
    undefined
  );

//

var script$4 = {
  components: {
    TeamTrackTeaser: __vue_component__$3,
    NotificationTeamManager: __vue_component__$2,
    GroupRoleManager: __vue_component__
  },
  mixins: [FluroContentEditMixin],

  created() {
    var self = this;

    if (!self.model.assignments) {
      self.$set(self.model, 'assignments', []);
    }

    if (!self.model.provisionalMembers) {
      self.$set(self.model, 'provisionalMembers', []);
    }

    if (!self.model.tracks) {
      self.$set(self.model, 'tracks', []);
    }

    if (!self.model.visibleAssigned) {
      self.$set(self.model, 'visibleAssigned', false);
    }

    if (!self.model.notifications) {
      self.$set(self.model, 'notifications', []);
    } // if (!self.model.provisionalMembers) {
    //     self.$set(self.model, 'provisionalMembers', []);
    // }
    // if (!self.model.defaultRooms) {
    //     self.$set(self.model, 'defaultRooms', []);
    // }
    // if (!self.model.defaultRosters) {
    //     self.$set(self.model, 'defaultRosters', []);
    // }

  },

  asyncComputed: {
    tracks: {
      default: [],

      get() {
        var self = this;

        if (!self.model._id) {
          self.loadingTracks = false;
          return Promise.resolve([]);
        } /////////////////////////////////


        self.loadingTracks = true; /////////////////////////////////

        return new Promise(function (resolve, reject) {
          self.$fluro.api.get(`/teams/${self.model._id}/tracks`).then(function (res) {
            resolve(res.data);
            self.loadingTracks = false;
          }).catch(function (err) {
            reject(err);
            self.loadingTracks = false;
          });
        });
      }

    }
  },
  methods: {
    createTrack() {
      var self = this;
      var team = self.model; ///////////////////////////////////////////////////////

      var template = {
        title: team.title,
        firstLine: team.firstLine,
        realms: team.realms,
        defaultDuration: 90,
        defaultTitle: team.title,
        defaultExpectTeams: [team],
        defaultOwnershipTeams: [team],
        defaultFirstLine: team.firstLine,
        mainImage: team.mainImage,
        autoRecur: true
      };
      self.$fluro.global.create('eventtrack', {
        template // copy: true,

      }, true).then(function (res) {
        self.processing = false;
        self.tracks.push(res);
      }, function (err) {
        self.processing = false;
      });
    }

  },
  computed: {
    infoHeading() {
      return this.definition ? `${this.definition.title} information` : 'Group Info';
    },

    fieldsOutput() {
      var array = []; ///////////////////////////////////

      addField('title', {
        title: 'Track Title',
        minimum: 1,
        maximum: 1,
        type: 'string',
        placeholder: 'Title'
      });
      addField('firstLine', {
        title: 'Subtitle',
        minimum: 0,
        maximum: 1,
        type: 'string',
        placeholder: 'Subtitle',
        description: 'A short one line description for this event track'
      }); ///////////////////////////////////
      ///////////////////////////////////
      ///////////////////////////////////

      addField('mainImage', {
        title: 'Image',
        description: 'Default image for events in this track',
        minimum: 0,
        maximum: 1,
        type: 'reference',
        directive: 'reference-select',
        params: {
          restrictType: 'image'
        }
      }); ///////////////////////////////////
      ///////////////////////////////////
      ///////////////////////////////////
      // visibleAssigned
      // addField('shareContactDetails', {
      // 				title: 'Share phone and email details with assigned contacts',
      // 				description: "Grant any contact with an assigned position be able to view other group members phone and email address?",
      // 				minimum: 0,
      // 				maximum: 1,
      // 				type: 'boolean',
      // 				defaultValues: [true],
      // });

      addField('visibleAssigned', {
        title: 'Hide from assigned contacts',
        description: "Should assigned contacts know that they are in this group?",
        minimum: 0,
        maximum: 1,
        type: 'boolean',
        expressions: {
          transform: {
            get(val) {
              return !val;
            },

            set(val) {
              return !val;
            }

          }
        }
      }); ///////////////////////////////////
      ///////////////////////////////////
      ///////////////////////////////////
      ///////////////////////////////////
      ///////////////////////////////////
      ///////////////////////////////////

      addField('provisionalRoles', {
        title: 'Roles / Permissions',
        description: 'Roles and permissions that should be granted to provisional members for this group/team',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        directive: 'reference-select',
        params: {
          restrictType: 'role'
        }
      }); ///////////////////////////////////

      addField('allowProvisional', {
        title: 'Allow Provisional Membership (Allow members to join and leave)',
        description: 'Set whether or not people can publicly join and leave this group without approval from applications like checkin or through your website',
        minimum: 0,
        maximum: 1,
        type: 'boolean'
      }); // addField('shareContactDetailsProvisional', {
      // 				title: 'Allow Provisional Members to view other group members\' phone numbers and emails',
      // 				description: 'Should provisional members be allowed to view other group members phone and email address?',
      // 				minimum: 0,
      // 				maximum: 1,
      // 				type: 'boolean',
      // });

      addField('visibleMembers', {
        title: 'Visible to Members',
        description: 'Should members of this group know that they are in this group?',
        minimum: 0,
        maximum: 1,
        type: 'boolean'
      }); ///////////////////////////////////

      addField('provisionalMembers', {
        title: 'Group Members',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        directive: 'reference-select',
        params: {
          restrictType: 'contact'
        }
      }); ///////////////////////////////////
      ///////////////////////////////////
      ///////////////////////////////////
      ///////////////////////////////////
      ///////////////////////////////////
      ///////////////////////////////////

      function addField(key, details) {
        details.key = key;
        array.push(details); // // Vue.set(self.fields, key, details);
        // if (details.enabled === false) {
        // } else {
        //     details.enabled = true;
        // }
        // var defaultValue = self.getDefaultValue(key, details);
        // Vue.set(self.model, key, defaultValue);
      }

      return array;
    },

    // hiddenAssigned: {
    // 				get() {
    // 								return !this.model.visibleAssigned;
    // 				},
    // 				set(value) {
    // 								this.$set(this.model, 'visibleAssigned', !value);
    // 				}
    // },
    showOutline() {
      return false; //true; //false;//true;//false;//true;
    },

    allPositions() {
      return _$1.map(this.model.assignments, 'title');
    }

  }
};

/* script */
const __vue_script__$4 = script$4;

/* template */
var __vue_render__$4 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flex-column',[(!_vm.model)?[_c('fluro-page-preloader',{attrs:{"contain":""}})]:_c('tabset',{attrs:{"justified":true,"vertical":true}},[_c('tab',{attrs:{"heading":_vm.infoHeading}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',{staticClass:"grid-list-xl"},[_c('constrain',{attrs:{"sm":""}},[_c('h3',{attrs:{"margin":""}},[_vm._v(_vm._s(_vm.definition ? _vm.definition.title : 'Group')+" Info")]),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.title},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.firstLine},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.mainImage},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),(_vm.definition && _vm.definition.fields && _vm.definition.fields.length)?[_c('fluro-content-form',{attrs:{"options":_vm.options,"fields":_vm.definition.fields},model:{value:(_vm.model.data),callback:function ($$v) {_vm.$set(_vm.model, "data", $$v);},expression:"model.data"}})]:_vm._e()],2)],1)],1)],1),_vm._v(" "),_c('tab',{attrs:{"heading":((_vm.model.assignments.length) + " Position" + (_vm.model.assignments.length == 1 ? '' : 's'))}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',{staticClass:"grid-list-xl"},[_c('constrain',{attrs:{"md":""}},[_c('h3',[_vm._v("Assigned Positions")]),_vm._v(" "),_c('p',[_vm._v("Assign contacts to specified positions eg. (Leader, Co-leader, Guitarist) below:")]),_vm._v(" "),_c('group-role-manager',{attrs:{"config":_vm.config},model:{value:(_vm.model.assignments),callback:function ($$v) {_vm.$set(_vm.model, "assignments", $$v);},expression:"model.assignments"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.visibleAssigned},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1)],1)],1)],1),_vm._v(" "),_c('tab',{attrs:{"heading":((_vm.model.provisionalMembers.length) + " Member" + (_vm.model.provisionalMembers.length == 1 ? '' : 's'))}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',{staticClass:"grid-list-xl"},[_c('constrain',{attrs:{"sm":""}},[_c('h3',[_vm._v("Provisional Members")]),_vm._v(" "),_c('p',[_vm._v("Add contacts as provisional members of this group, these are usually the people who attend, belong to, or have subscribed to this group. People can become members of this group from your website, checkin system or other apps.")]),_vm._v(" "),_c('fluro-content-form-field',{staticClass:"py-2",attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.provisionalRoles},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{staticClass:"py-2",attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.allowProvisional},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{staticClass:"pt-2 pb-4",attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.visibleMembers},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{staticClass:"py-3",attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.provisionalMembers},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1)],1)],1)],1),_vm._v(" "),(_vm.model._id)?_c('tab',{attrs:{"heading":"Recurring Events"}},[(_vm.loadingTracks)?_c('flex-column',[_c('fluro-page-preloader',{attrs:{"contain":""}})],1):_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',{attrs:{"fluid":""}},[_c('v-layout',{attrs:{"align-center":""}},[_c('v-flex',[_c('h3',[_vm._v(_vm._s(_vm.tracks.length)+" Event Track"+_vm._s(_vm.tracks.length == 1 ? '' : 's'))])]),_vm._v(" "),_c('v-flex',{attrs:{"shrink":""}},[(_vm.$fluro.access.can('create', 'eventtrack'))?_c('v-btn',{attrs:{"color":"primary"},on:{"click":function($event){return _vm.createTrack()}}},[_c('span',[_vm._v("Add Track")]),_vm._v(" "),_c('fluro-icon',{attrs:{"icon":"plus","right":""}})],1):_vm._e()],1)],1),_vm._v(" "),_vm._l((_vm.tracks),function(eventtrack,index){return [_c('team-track-teaser',{model:{value:(_vm.tracks[index]),callback:function ($$v) {_vm.$set(_vm.tracks, index, $$v);},expression:"tracks[index]"}})]})],2)],1)],1):_vm._e(),_vm._v(" "),_c('tab',{attrs:{"heading":"Notifications"}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',{staticClass:"grid-list-xl"},[_c('constrain',{attrs:{"md":""}},[_c('notification-team-manager',{attrs:{"config":_vm.config,"allPositions":_vm.allPositions},model:{value:(_vm.model.notifications),callback:function ($$v) {_vm.$set(_vm.model, "notifications", $$v);},expression:"model.notifications"}})],1)],1)],1)],1)],1)],2)};
var __vue_staticRenderFns__$4 = [];

  /* style */
  const __vue_inject_styles__$4 = function (inject) {
    if (!inject) return
    inject("data-v-831a53a2_0", { source: ".no-border-no-background .toggle-item{border:none!important;background:0 0!important;font-size:14px;padding:0}", map: undefined, media: undefined });

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

export default __vue_component__$4;
//# sourceMappingURL=team-355bb4a1.js.map
