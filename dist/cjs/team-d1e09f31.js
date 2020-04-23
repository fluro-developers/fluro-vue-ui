'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var index = require('./index-cd3809e4.js');
var draggable = _interopDefault(require('vuedraggable'));
require('vue-color');
require('tippy.js');
require('vue2-ace-editor');
require('js-beautify');
require('tiptap');
require('tiptap-commands');
require('tiptap-extensions');
require('signature_pad');
require('fluro');
require('vuex-map-fields');
require('async');
var FluroContentEditMixin = require('./FluroContentEditMixin-fecf7602.js');
var FluroExclusiveSelector = require('./FluroExclusiveSelector-e0b0bb65.js');

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
  mixins: [FluroContentEditMixin.FluroContentEditMixin],
  components: {
    draggable,
    FluroConfirmButton: index.FluroConfirmButton
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
    add() {
      var clone = JSON.parse(JSON.stringify(this.proposed));

      if (!clone.title || !clone.title.length) {
        return;
      }

      delete clone.row;
      this.model.push(clone);
      this.currentlyExpanded.push(false);
      this.proposed = {};
    },

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
    addFields() {
      var array = []; ///////////////////////////////////

      addField('title', {
        title: 'Position Name',
        minimum: 1,
        maximum: 1,
        type: 'string',
        placeholder: 'Role/Assignment'
      });
      addField('contacts', {
        title: 'People Responsible',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        directive: 'reference-select',
        params: {
          restrictType: 'contact'
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
    },

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
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('list-group',[_c('draggable',_vm._b({attrs:{"list":_vm.model,"ghost-class":"ghost-dragging-class"},on:{"start":function($event){_vm.drag=true;},"end":function($event){_vm.drag=false;}}},'draggable',_vm.dragOptions,false),_vm._l((_vm.model),function(assignment,index){return _c('list-group-item',{staticClass:"pa-0",class:_vm.currentlyExpanded[index] ? 'hover-grey' : '',staticStyle:{"width":"100%"}},[_c('v-layout',{attrs:{"align-center":"","ma-0":"","py-0":"","px-2":""}},[_c('v-flex',{attrs:{"xs3":""}},[_c('strong',[_vm._v(_vm._s(assignment.title))])]),_vm._v(" "),_c('v-flex',{attrs:{"xs5":""}},_vm._l((assignment.contacts),function(contact){return _c('v-chip',{attrs:{"small":""}},[_vm._v(_vm._s(contact.title))])}),1),_vm._v(" "),_c('v-flex',{attrs:{"xs2":""}},[_c('v-btn',{staticStyle:{"width":"100%"},attrs:{"px-0":""},on:{"click":function($event){return _vm.toggleExpanded(index)}}},[_c('v-layout',{attrs:{"px-0":""}},[_c('v-flex',{attrs:{"px-0":""}},[_vm._v(_vm._s(!_vm.currentlyExpanded[index] ? 'More' : 'Less'))]),_vm._v(" "),_c('v-flex',{staticClass:"fade",attrs:{"px-0":"","shrink":""}},[_c('fluro-icon',{attrs:{"icon":!_vm.currentlyExpanded[index] ? 'angle-down' : 'angle-up'}})],1)],1)],1)],1),_vm._v(" "),_c('v-flex',{attrs:{"py-1":"","xs2":""}},[_c('fluro-confirm-button',{on:{"click":function($event){return _vm.remove(index)}},scopedSlots:_vm._u([{key:"default",fn:function(ref){
var confirming = ref.confirming;
return [_c('v-btn',{staticStyle:{"width":"100%"},attrs:{"flat":""}},[_vm._v(_vm._s(confirming ? 'Confirm?' : 'Remove'))])]}}],null,true)})],1)],1),_vm._v(" "),(_vm.currentlyExpanded[index])?_c('tabset',{staticStyle:{"width":"100%"}},[_c('tab',{staticClass:"pa-2",attrs:{"heading":"Position Details"}},[_c('fluro-content-form',{ref:"form",refInFor:true,attrs:{"options":_vm.options,"fields":_vm.editFields},scopedSlots:_vm._u([{key:"form",fn:function(ref){
var formFields = ref.formFields;
var fieldHash = ref.fieldHash;
var model = ref.model;
var update = ref.update;
var options = ref.options;
return [_c('v-layout',{attrs:{"wrap":"","pa-4":""}},[_c('v-flex',{attrs:{"xs4":"","sm3":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"outline":_vm.showOutline,"options":options,"field":fieldHash.title},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs8":"","sm9":"","py-0":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"outline":_vm.showOutline,"options":options,"field":fieldHash.contacts},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"outline":_vm.showOutline,"options":options,"field":fieldHash.roles},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1)],1)]}}],null,true),model:{value:(_vm.model[index]),callback:function ($$v) {_vm.$set(_vm.model, index, $$v);},expression:"model[index]"}})],1),_vm._v(" "),_c('tab',{attrs:{"heading":"Advanced"}},[_c('v-layout',{attrs:{"wrap":"","pa-4":""}},[_c('v-flex',{attrs:{"xs12":"","sm6":""}},[_c('v-checkbox',{attrs:{"label":("Allow " + (_vm.model[index].title) + " to view phone numbers and emails of other group members"),"hint":"Should people in this position be able to see the email and phone number of other members in this group/team?","persistent-hint":""},model:{value:(_vm.model[index].shareDetails),callback:function ($$v) {_vm.$set(_vm.model[index], "shareDetails", $$v);},expression:"model[index].shareDetails"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm6":""}},[_c('v-checkbox',{attrs:{"label":"Visible","hint":"Should this group be visible to people in this slot?","persistent-hint":""},model:{value:(_vm.model[index].visible),callback:function ($$v) {_vm.$set(_vm.model[index], "visible", $$v);},expression:"model[index].visible"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm6":""}},[_c('v-checkbox',{attrs:{"label":("Exclude " + (_vm.model[index].title) + " from membership"),"hint":"If checked, these contacts will not be considered 'members' of the group. They will be excluded from reports and other statistics. Typically this would be used for an oversight or an administrative only position.","persistent-hint":""},model:{value:(_vm.model[index].exclude),callback:function ($$v) {_vm.$set(_vm.model[index], "exclude", $$v);},expression:"model[index].exclude"}})],1)],1)],1)],1):_vm._e()],1)}),1)],1),_vm._v(" "),_c('fluro-panel',[_c('fluro-panel-title',[_vm._v("Add a position")]),_vm._v(" "),_c('fluro-panel-body',[_c('form',{on:{"submit":function($event){$event.preventDefault();$event.stopPropagation();return _vm.add()}}},[_c('fluro-content-form',{ref:"form",attrs:{"options":_vm.options,"fields":_vm.addFields},scopedSlots:_vm._u([{key:"form",fn:function(ref){
var formFields = ref.formFields;
var fieldHash = ref.fieldHash;
var model = ref.model;
var update = ref.update;
var options = ref.options;
return [_c('v-layout',{attrs:{"wrap":"","align-center":"","px-2":""}},[_c('v-flex',{attrs:{"xs8":"","sm8":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"outline":_vm.showOutline,"options":options,"field":fieldHash.title},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs4":"","sm4":""}},[_c('v-btn',{staticStyle:{"width":"100%"},attrs:{"type":"submit"},on:{"click":function($event){return _vm.add()}}},[_vm._v("Add")])],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm12":"","py-0":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"outline":_vm.showOutline,"options":options,"field":fieldHash.contacts},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1)],1)]}}]),model:{value:(_vm.proposed),callback:function ($$v) {_vm.proposed=$$v;},expression:"proposed"}})],1)])],1)],1)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-92086438_0", { source: ".border-top{border-top:1px solid rgba(0,0,0,.05)}.border-right{border-right:1px solid rgba(0,0,0,.05)}.border-bottom{border-bottom:1px solid rgba(0,0,0,.05)}.border-left{border-left:1px solid rgba(0,0,0,.05)}.ghost-dragging-class{opacity:.5;background:#c8ebfb}.fade-enter-active,.fade-leave-active{transition:all 1s}.fade-enter,.fade-leave-to{opacity:0}.hover-grey{background:#fafafa}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = index.__vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    index.__vue_create_injector__,
    undefined,
    undefined
  );

//
var script$1 = {
  mixins: [FluroContentEditMixin.FluroContentEditMixin],
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
    FluroExclusiveSelector: FluroExclusiveSelector.FluroExclusiveSelector
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
  

  
  const __vue_component__$1 = index.__vue_normalize__(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    index.__vue_create_injector__,
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
    FluroConfirmButton: index.FluroConfirmButton
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

      var res = _.find(data, function (obj) {
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
      return _.map(self.allPositions, function (pos) {
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
var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('h4',[_vm._v(_vm._s(_vm.model.length)+" scheduled notification"+_vm._s(_vm.model.length == 1 ? '' : 's'))]),_vm._v(" "),_c('p',{staticClass:"muted"},[_vm._v("Add notifications for when events happen within this group")]),_vm._v(" "),_c('list-group',_vm._l((_vm.model),function(notification,index){return _c('list-group-item',{key:JSON.stringify(notification)},[_c('v-layout',{attrs:{"align-center":"","row":"","wrap":"","ma-0":""}},[_c('v-flex',{staticStyle:{"text-align":"center"},attrs:{"sm1":"","xs1":"","pa-1":""}},[_c('fluro-icon',{directives:[{name:"tippy",rawName:"v-tippy"}],attrs:{"icon":"bell","content":"Sends notification"}})],1),_vm._v(" "),_c('v-flex',{staticClass:"full-width",attrs:{"sm7":"","xs11":"","pa-1":""}},[_c('strong',[_vm._v(_vm._s(_vm.displayTrigger(notification.trigger)))]),_vm._v(" "),_c('p',{staticClass:"muted mb-0"},[_vm._v("Notify "+_vm._s(_vm.displayAssignments(notification.assignments)))]),_vm._v(" "),(_vm.editing[index])?_c('notification-team-component',{attrs:{"config":_vm.config,"allPositions":_vm.allPositionsObjects},model:{value:(_vm.clonedModel[index]),callback:function ($$v) {_vm.$set(_vm.clonedModel, index, $$v);},expression:"clonedModel[index]"}}):_vm._e()],1),_vm._v(" "),_c('v-flex',{staticClass:"full-width",attrs:{"sm2":"","xs6":"","py-0":""}},[_c('v-btn',{attrs:{"block":""},on:{"click":function($event){return _vm.toggleEdit(index)}}},[_vm._v(_vm._s(_vm.editing[index] ? 'Done' : 'Edit'))])],1),_vm._v(" "),_c('v-flex',{staticClass:"full-width",attrs:{"sm2":"","xs6":"","py-0":""}},[_c('fluro-confirm-button',{attrs:{"content":"Remove"},on:{"click":function($event){return _vm.remove(index)}},scopedSlots:_vm._u([{key:"default",fn:function(ref){
var confirming = ref.confirming;
return [_c('v-btn',{staticStyle:{"transition":"all 0.1s","width":"100%"},attrs:{"flat":"","block":"","color":confirming ? 'red' : ''}},[_vm._v(_vm._s(confirming ? 'Confirm?' : 'Remove'))])]}}],null,true)})],1)],1)],1)}),1),_vm._v(" "),_c('fluro-panel',[_c('fluro-panel-body',[_c('form',{on:{"submit":function($event){$event.preventDefault();$event.stopPropagation();return _vm.add()}}},[_c('v-container',{attrs:{"fluid":"","grid-list-xl":"","pa-1":""}},[_c('v-layout',{attrs:{"row":"","wrap":"","grid-list-xl":""}},[_c('v-flex',{attrs:{"sm10":"","xs12":""}},[_c('notification-team-component',{ref:"createform",attrs:{"config":_vm.config,"allPositions":_vm.allPositionsObjects},model:{value:(_vm.proposed),callback:function ($$v) {_vm.proposed=$$v;},expression:"proposed"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"sm2":"","xs12":""}},[_c('v-btn',{attrs:{"block":"","color":"primary","type":"submit"},on:{"click":function($event){return _vm.add()}}},[_vm._v("Add")])],1)],1)],1)],1)])],1)],1)};
var __vue_staticRenderFns__$2 = [];

  /* style */
  const __vue_inject_styles__$2 = function (inject) {
    if (!inject) return
    inject("data-v-3fb86f58_0", { source: ".border-top{border-top:1px solid rgba(0,0,0,.05)}.border-right{border-right:1px solid rgba(0,0,0,.05)}.border-bottom{border-bottom:1px solid rgba(0,0,0,.05)}.border-left{border-left:1px solid rgba(0,0,0,.05)}.full-width{width:100%}.fade-enter-active,.fade-leave-active{transition:all 1s}.fade-enter,.fade-leave-to{opacity:0}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$2 = undefined;
  /* module identifier */
  const __vue_module_identifier__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$2 = index.__vue_normalize__(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    false,
    index.__vue_create_injector__,
    undefined,
    undefined
  );

//

var script$3 = {
  components: {
    NotificationTeamManager: __vue_component__$2,
    GroupRoleManager: __vue_component__
  },
  mixins: [FluroContentEditMixin.FluroContentEditMixin],

  created() {
    var self = this;

    if (!self.model.assignments) {
      self.$set(self.model, 'assignments', []);
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

  methods: {},
  computed: {
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

      addField('shareContactDetails', {
        title: 'Share phone and email details with assigned contacts',
        description: "Grant any contact with an assigned position be able to view other group members phone and email address?",
        minimum: 0,
        maximum: 1,
        type: 'boolean',
        defaultValues: [true]
      }); // addField('visibleAssigned', {
      //     title: 'Hide from assigned contacts',
      //     description: "Should assigned contacts know they are in the group?",
      //     minimum: 0,
      //     maximum: 0,
      //     type: 'boolean',
      // });
      ///////////////////////////////////
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
        title: 'Allow Provisional Membership (Allow members to join or leave)',
        description: 'Set whether or not people can publicly join and leave this group without approval from applications like checkin or through your website',
        minimum: 0,
        maximum: 1,
        type: 'boolean'
      });
      addField('shareContactDetailsProvisional', {
        title: 'Allow Provisional Members to view other group members\' phone numbers and emails',
        description: 'Should provisional members be allowed to view other group members phone and email address?',
        minimum: 0,
        maximum: 1,
        type: 'boolean'
      });
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

    hiddenAssigned: {
      get() {
        return !this.model.visibleAssigned;
      },

      set(value) {
        this.$set(this.model, 'visibleAssigned', !value);
      }

    },

    showOutline() {
      return false; //true; //false;//true;//false;//true;
    },

    allPositions() {
      return _.map(this.model.assignments, 'title');
    }

  }
};

/* script */
const __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flex-column',[(!_vm.model)?[_c('fluro-page-preloader',{attrs:{"contain":""}})]:_c('tabset',{attrs:{"justified":true,"vertical":true}},[_c('tab',{attrs:{"heading":"Information"}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',{staticClass:"grid-list-xl"},[_c('constrain',{attrs:{"sm":""}},[_c('h3',{attrs:{"margin":""}},[_vm._v("Group/Team Information")]),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.title},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.firstLine},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.mainImage},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1)],1)],1)],1),_vm._v(" "),(_vm.definition && _vm.definition.fields && _vm.definition.fields.length)?_c('tab',{attrs:{"heading":((_vm.definition.title) + " details")}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',[_c('constrain',{attrs:{"sm":""}},[_c('h3',{attrs:{"margin":""}},[_vm._v(_vm._s(_vm.definition.title))]),_vm._v(" "),_c('fluro-content-form',{attrs:{"options":_vm.options,"fields":_vm.definition.fields},model:{value:(_vm.model.data),callback:function ($$v) {_vm.$set(_vm.model, "data", $$v);},expression:"model.data"}})],1)],1)],1)],1):_vm._e(),_vm._v(" "),_c('tab',{attrs:{"heading":((_vm.model.assignments.length) + " Position" + (_vm.model.assignments.length == 1 ? '' : 's'))}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',{staticClass:"grid-list-xl"},[_c('constrain',{attrs:{"md":""}},[_c('h3',[_vm._v("Assigned Positions")]),_vm._v(" "),_c('p',[_vm._v("Assign contacts to specified positions eg. (Leader, Co-leader, Guitarist) below:")]),_vm._v(" "),_c('group-role-manager',{attrs:{"config":_vm.config},model:{value:(_vm.model.assignments),callback:function ($$v) {_vm.$set(_vm.model, "assignments", $$v);},expression:"model.assignments"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.shareContactDetails},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('v-checkbox',{attrs:{"label":"Hide from assigned contacts","hint":"Should assigned contacts know they are in the group?","persistent-hint":""},model:{value:(_vm.hiddenAssigned),callback:function ($$v) {_vm.hiddenAssigned=$$v;},expression:"hiddenAssigned"}})],1)],1)],1)],1),_vm._v(" "),_c('tab',{attrs:{"heading":((_vm.model.provisionalMembers.length) + " Member" + (_vm.model.provisionalMembers.length == 1 ? '' : 's'))}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',{staticClass:"grid-list-xl"},[_c('constrain',{attrs:{"sm":""}},[_c('h3',[_vm._v("Provisional Members")]),_vm._v(" "),_c('p',[_vm._v("Add contacts as provisional members of this group, these are usually the people who attend, belong to, or have subscribed to this group. People can become members of this group from your website, checkin system or other apps.")]),_vm._v(" "),_c('fluro-content-form-field',{staticClass:"py-2",attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.provisionalRoles},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{staticClass:"py-2",attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.allowProvisional},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{staticClass:"py-2",attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.shareContactDetailsProvisional},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{staticClass:"pt-2 pb-4",attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.visibleMembers},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{staticClass:"py-3",attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.provisionalMembers},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1)],1)],1)],1),_vm._v(" "),_c('tab',{attrs:{"heading":"Notifications"}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',{staticClass:"grid-list-xl"},[_c('constrain',{attrs:{"md":""}},[_c('notification-team-manager',{attrs:{"config":_vm.config,"allPositions":_vm.allPositions},model:{value:(_vm.model.notifications),callback:function ($$v) {_vm.$set(_vm.model, "notifications", $$v);},expression:"model.notifications"}})],1)],1)],1)],1)],1)],2)};
var __vue_staticRenderFns__$3 = [];

  /* style */
  const __vue_inject_styles__$3 = function (inject) {
    if (!inject) return
    inject("data-v-1ebebe6e_0", { source: ".no-border-no-background .toggle-item{border:none!important;background:0 0!important;font-size:14px;padding:0}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$3 = undefined;
  /* module identifier */
  const __vue_module_identifier__$3 = undefined;
  /* functional template */
  const __vue_is_functional_template__$3 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$3 = index.__vue_normalize__(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    false,
    index.__vue_create_injector__,
    undefined,
    undefined
  );

exports.default = __vue_component__$3;
//# sourceMappingURL=team-d1e09f31.js.map
