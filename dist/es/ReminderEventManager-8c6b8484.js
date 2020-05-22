import { aI as FluroContentForm, bd as __vue_normalize__, n as FluroConfirmButton } from './index-a26484f6.js';
import { F as FluroContentEditMixin } from './FluroContentEditMixin-f94812ea.js';
import { F as FluroExclusiveSelector } from './FluroExclusiveSelector-26fffb7d.js';

//
var script = {
  mixins: [FluroContentEditMixin],
  props: {
    value: {
      type: Object,
      default: function () {
        return {};
      }
    },
    context: {
      type: String,
      default: 'create'
    },
    startDate: {
      type: Date
    },
    endDate: {
      type: Date
    },
    allAssignmentOptions: {
      type: Array
    }
  },
  components: {
    FluroContentForm,
    FluroExclusiveSelector
  },

  data() {
    return {
      model: this.value,
      methodOptions: ['Email', 'SMS', 'Push Notification']
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
    },

    setAssignments(value) {
      this.model.assignments = value;
    },

    setMethods(value) {
      this.model.methods = value;
    }

  },
  computed: {
    customFields() {
      var self = this;
      var array = [];
      var periodOptions = []; ///////////////////////////////////

      if (self.model.total != 1) {
        periodOptions = [{
          name: 'Minutes',
          value: 'minute'
        }, {
          name: 'Hours',
          value: 'hour'
        }, {
          name: 'Days',
          value: 'day'
        }, {
          name: 'Weeks',
          value: 'week'
        }, {
          name: 'Months',
          value: 'month'
        }];
      } else {
        periodOptions = [{
          name: 'Minute',
          value: 'minute'
        }, {
          name: 'Hour',
          value: 'hour'
        }, {
          name: 'Day',
          value: 'day'
        }, {
          name: 'Week',
          value: 'week'
        }, {
          name: 'Month',
          value: 'month'
        }];
      }

      addField('total', {
        minimum: 1,
        maximum: 1,
        type: 'integer',
        defaultValues: [1],
        params: {
          minValue: 1
        }
      });
      addField('period', {
        minimum: 1,
        maximum: 1,
        type: 'string',
        directive: 'select',
        defaultValues: ['day'],
        options: periodOptions
      });
      addField('when', {
        minimum: 1,
        maximum: 1,
        type: 'string',
        directive: 'select',
        defaultValues: ['before'],
        options: [{
          name: 'Before',
          value: 'before'
        }, {
          name: 'After',
          value: 'after'
        }]
      });
      addField('point', {
        minimum: 1,
        maximum: 1,
        type: 'string',
        directive: 'select',
        defaultValues: ['start'],
        options: [{
          name: 'Event Starts',
          value: 'start'
        }, {
          name: 'Event Ends',
          value: 'end'
        }]
      });
      addField('methodPreference', {
        title: 'Method Preference',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'select',
        defaultValues: [''],
        options: [{
          name: 'Account Default',
          value: ''
        }, {
          name: 'All - Email and SMS and Push',
          value: 'all'
        }, {
          name: 'Failover - Email, SMS, Push',
          value: 'failover'
        }]
      }); /////////////////////////////////

      addField('message', {
        title: 'Message',
        placeholder: 'Write a custom message in here',
        minimum: 0,
        maximum: 1,
        type: 'string'
      });

      function addField(key, details) {
        details.key = key;
        array.push(details);
      }

      return array;
    },

    createMode() {
      return this.context == 'create';
    },

    viewMode() {
      return this.context == 'view';
    },

    editMode() {
      return this.context == 'edit';
    },

    sendToFormatted() {
      var self = this;
      var assignments = JSON.parse(JSON.stringify(self.model.assignments)); //console.log('ASSIGNMENTS', assignments);

      if (assignments.length == 1 && assignments[0] == "") {
        return 'All Assignments';
      } else {
        return assignments.join(', ');
      }
    },

    formattedTotalPeriodWhenPoint() {
      var self = this;
      var model = self.model;
      var period = self.model.period;

      if (model.total != 1) {
        period = period + 's';
      }

      return model.total + ' ' + period + ' ' + model.when + ' event ' + model.point;
    },

    formattedTime() {
      var self = this;
      var startDate, endDate;
      var total = self.model.total;
      var period = self.model.period;
      var when = self.model.when;
      var point = self.model.point;

      if (!self.startDate || !total || !period || !when || !point) {
        return ['', ''];
      }

      if (!self.endDate) {
        endDate = self.startDate;
      } else {
        endDate = self.endDate;
      }

      startDate = self.startDate; //////////////////////////////////

      var eventTime;

      if (point == 'end') {
        eventTime = endDate;
      } else {
        eventTime = startDate;
      } //////////////////////////////////


      var displayedTime;

      if (when == 'before') {
        displayedTime = self.$fluro.date.moment(eventTime).subtract(total, period);
      } else {
        displayedTime = self.$fluro.date.moment(eventTime).add(total, period);
      }

      return displayedTime;
    }

  }
};

/* script */
const __vue_script__ = script;
/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.model)?_c('div',{attrs:{"py-0":""}},[(_vm.viewMode)?_c('v-container',{attrs:{"fluid":"","pa-0":""}},[_c('v-layout',{attrs:{"row":"","wrap":"","grid-list-xl":"","py-0":""}},[_c('v-flex',{attrs:{"lg1":"","md2":"","xs2":""}},[_c('v-layout',{staticStyle:{"height":"100%","margin-left":"-10px"},attrs:{"row":"","wrap":"","align-center":"","justify-center":""}},[(_vm.model.methods.includes('email'))?_c('fluro-icon',{directives:[{name:"tippy",rawName:"v-tippy"}],attrs:{"icon":"envelope","content":"Sends email"}}):_vm._e(),_vm._v(" "),(_vm.model.methods.includes('push'))?_c('fluro-icon',{directives:[{name:"tippy",rawName:"v-tippy"}],attrs:{"icon":"mobile","content":"Sends push notification"}}):_vm._e(),_vm._v(" "),(_vm.model.methods.includes('sms'))?_c('fluro-icon',{directives:[{name:"tippy",rawName:"v-tippy"}],attrs:{"icon":"comment","content":"Sends SMS"}}):_vm._e()],1)],1),_vm._v(" "),_c('v-flex',{attrs:{"lg11":"","md10":"","xs10":""}},[_c('p',{staticClass:"muted mb-0"},[_vm._v("Sending to "),_c('span',{staticClass:"capitalize-text"},[_vm._v(_vm._s(_vm.sendToFormatted))])]),_vm._v(" "),_c('h5',[_vm._v(_vm._s(_vm.model.message))]),_vm._v(" "),_c('p',{staticClass:"muted mb-0"},[_vm._v(_vm._s(_vm.formattedTotalPeriodWhenPoint)+" "+_vm._s(_vm.startDate ? '- ' + _vm.formattedTime.format("h:mma dddd MMM Do YYYY") : '')+" "+_vm._s(_vm.startDate ? '(' + _vm.formattedTime.fromNow() + ')' : ''))])])],1)],1):(_vm.editMode)?_c('div',[_c('v-container',{attrs:{"fluid":"","pa-0":""}},[_c('v-layout',{attrs:{"row":"","wrap":"","grid-list-xl":"","py-0":""}},[_c('v-flex',{attrs:{"lg1":"","md2":"","xs2":""}},[_c('v-layout',{staticStyle:{"height":"100%","margin-left":"-10px"},attrs:{"row":"","wrap":"","align-center":"","justify-center":""}},[(_vm.model.methods.includes('email'))?_c('fluro-icon',{directives:[{name:"tippy",rawName:"v-tippy"}],attrs:{"icon":"envelope","content":"Sends email"}}):_vm._e(),_vm._v(" "),(_vm.model.methods.includes('push'))?_c('fluro-icon',{directives:[{name:"tippy",rawName:"v-tippy"}],attrs:{"icon":"mobile","content":"Sends push notification"}}):_vm._e(),_vm._v(" "),(_vm.model.methods.includes('sms'))?_c('fluro-icon',{directives:[{name:"tippy",rawName:"v-tippy"}],attrs:{"icon":"comment","content":"Sends SMS"}}):_vm._e()],1)],1),_vm._v(" "),_c('v-flex',{attrs:{"lg11":"","md10":"","xs10":""}},[_c('p',{staticClass:"muted mb-0"},[_vm._v("Sending to "),_c('span',{staticClass:"capitalize-text"},[_vm._v(_vm._s(_vm.sendToFormatted))])]),_vm._v(" "),_c('h5',[_vm._v(_vm._s(_vm.model.message))]),_vm._v(" "),_c('p',{staticClass:"muted mb-0"},[_vm._v(_vm._s(_vm.formattedTotalPeriodWhenPoint)+" "+_vm._s(_vm.startDate ? '- ' + _vm.formattedTime.format("h:mma dddd MMM Do YYYY") : '')+" "+_vm._s(_vm.startDate ? '(' + _vm.formattedTime.fromNow() + ')' : ''))])])],1)],1),_vm._v(" "),_c('v-container',{attrs:{"fluid":"","pa-0":"","grid-list-xl":""}},[_c('v-layout',{attrs:{"row":"","wrap":"","grid-list-xl":"","py-0":""}},[_c('v-flex',{attrs:{"sm12":"","xs12":""}},[_c('fluro-panel',[_c('fluro-panel-body',[_c('h4',[_vm._v("When")]),_vm._v(" "),_c('fluro-content-form',{ref:"form",attrs:{"options":_vm.options,"fields":_vm.customFields},scopedSlots:_vm._u([{key:"form",fn:function(ref){
var formFields = ref.formFields;
var fieldHash = ref.fieldHash;
var model = ref.model;
var update = ref.update;
var options = ref.options;
return [_c('v-layout',{attrs:{"row":"","wrap":"","grid-list-xl":""}},[_c('v-flex',{attrs:{"xs12":"","sm3":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.total},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm3":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.period},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm3":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.when},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm3":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.point},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm12":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.message},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1)],1)]}}],null,false,593553063),model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1)],1)],1),_vm._v(" "),_c('v-flex',{attrs:{"md6":"","sm12":"","xs12":""}},[_c('fluro-exclusive-selector',{attrs:{"allLabel":"Default Channels","otherOptions":_vm.methodOptions,"path":"methods"},on:{"change":_vm.setMethods},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"md6":"","sm12":"","xs12":""}},[_c('fluro-content-form',{ref:"form",attrs:{"options":_vm.options,"fields":_vm.customFields},scopedSlots:_vm._u([{key:"form",fn:function(ref){
var formFields = ref.formFields;
var fieldHash = ref.fieldHash;
var model = ref.model;
var update = ref.update;
var options = ref.options;
return [_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.methodPreference},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})]}}],null,false,4123648457),model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1)],1)],1)],1):(_vm.createMode)?_c('v-container',{attrs:{"fluid":"","pa-0":""}},[_c('v-layout',{attrs:{"row":"","wrap":"","grid-list-xl":"","py-0":""}},[_c('v-flex',{attrs:{"sm5":"","xs12":"","py-0":""}},[_c('fluro-exclusive-selector',{attrs:{"allLabel":"All Assignments","otherOptions":_vm.allAssignmentOptions,"path":"assignments"},on:{"change":_vm.setAssignments},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-exclusive-selector',{attrs:{"allLabel":"Default Channels","otherOptions":_vm.methodOptions,"path":"methods"},on:{"change":_vm.setMethods},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form',{ref:"form",attrs:{"options":_vm.options,"fields":_vm.customFields},scopedSlots:_vm._u([{key:"form",fn:function(ref){
var formFields = ref.formFields;
var fieldHash = ref.fieldHash;
var model = ref.model;
var update = ref.update;
var options = ref.options;
return [_c('fluro-content-form-field',{staticClass:"pr-2",attrs:{"form-fields":formFields,"options":options,"field":fieldHash.methodPreference},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})]}}],null,false,2459919732),model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"sm7":"","xs12":"","py-0":""}},[_c('fluro-panel',[_c('fluro-panel-body',[_c('h4',[_vm._v("When")]),_vm._v(" "),_c('fluro-content-form',{ref:"form",attrs:{"options":_vm.options,"fields":_vm.customFields},scopedSlots:_vm._u([{key:"form",fn:function(ref){
var formFields = ref.formFields;
var fieldHash = ref.fieldHash;
var model = ref.model;
var update = ref.update;
var options = ref.options;
return [_c('v-layout',{attrs:{"row":"","wrap":""}},[_c('v-flex',{attrs:{"xs12":"","sm3":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.total},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm3":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.period},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm3":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.when},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm3":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.point},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm12":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.message},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1)],1)]}}],null,false,3801550847),model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1)],1)],1)],1)],1):_vm._e()],1):_vm._e()};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
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
    undefined,
    undefined,
    undefined
  );

//
var script$1 = {
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
    startDate: {
      type: Date
    },
    endDate: {
      type: Date
    },
    allAssignmentOptions: {
      type: Array
    }
  },

  created() {
    for (let i = 0; i < this.model.length; i++) {
      this.editing.push(false);
    }
  },

  components: {
    ReminderEventComponent: __vue_component__,
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
        if (self.clonedModel[index].message.length) {
          self.model[index] = self.clonedModel[index];
          return self.$set(self.editing, index, false);
        }

        return;
      } else {
        return self.$set(self.editing, index, true);
      }
    }

  },
  watch: {
    'model': function () {
      this.clonedModel = JSON.parse(JSON.stringify(this.model));
    }
  }
};

/* script */
const __vue_script__$1 = script$1;
/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('h4',[_vm._v(_vm._s(_vm.model.length)+" scheduled reminder"+_vm._s(_vm.model.length == 1 ? '' : 's'))]),_vm._v(" "),_c('p',{staticClass:"muted"},[_vm._v("Create notifications below to be sent to 'confirmed' rostered contacts before or after the event")]),_vm._v(" "),_c('list-group',_vm._l((_vm.model),function(message,index){return _c('list-group-item',[_c('v-layout',{attrs:{"align-start":"","row":"","wrap":""}},[_c('v-flex',{staticClass:"full-width",attrs:{"sm10":"","xs12":"","pa-1":""}},[_c('reminder-event-component',{ref:'editform' + index,refInFor:true,attrs:{"config":_vm.config,"context":_vm.editing[index] ? 'edit' : 'view',"startDate":_vm.startDate,"endDate":_vm.endDate,"allAssignmentOptions":_vm.allAssignmentOptions},model:{value:(_vm.clonedModel[index]),callback:function ($$v) {_vm.$set(_vm.clonedModel, index, $$v);},expression:"clonedModel[index]"}})],1),_vm._v(" "),_c('v-flex',{staticClass:"full-width",attrs:{"sm2":"","xs12":"","pa-1":""}},[_c('v-btn',{attrs:{"block":""},on:{"click":function($event){return _vm.toggleEdit(index)}}},[_vm._v(_vm._s(_vm.editing[index] ? 'Done' : 'Edit'))]),_vm._v(" "),_c('fluro-confirm-button',{attrs:{"content":"Remove"},on:{"click":function($event){return _vm.remove(index)}},scopedSlots:_vm._u([{key:"default",fn:function(ref){
var confirming = ref.confirming;
return [_c('v-btn',{staticStyle:{"transition":"all 0.1s","width":"100%"},attrs:{"flat":"","block":"","color":confirming ? 'red' : ''}},[_vm._v(_vm._s(confirming ? 'Confirm?' : 'Remove'))])]}}],null,true)})],1)],1)],1)}),1),_vm._v(" "),_c('fluro-panel',[_c('fluro-panel-body',[_c('form',{on:{"submit":function($event){$event.preventDefault();$event.stopPropagation();return _vm.add()}}},[_c('v-container',{attrs:{"fluid":"","grid-list-xl":"","pa-1":""}},[_c('v-layout',{attrs:{"row":"","wrap":"","grid-list-xl":""}},[_c('v-flex',{attrs:{"sm10":"","xs12":""}},[_c('reminder-event-component',{ref:"createform",attrs:{"config":_vm.config,"context":"create","allAssignmentOptions":_vm.allAssignmentOptions},model:{value:(_vm.proposed),callback:function ($$v) {_vm.proposed=$$v;},expression:"proposed"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"sm2":"","xs12":""}},[_c('v-btn',{attrs:{"block":"","color":"primary","type":"submit"},on:{"click":function($event){return _vm.add()}}},[_vm._v("Add")])],1)],1)],1)],1)])],1)],1)};
var __vue_staticRenderFns__$1 = [];

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject */
  
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
    undefined,
    undefined,
    undefined
  );

export { __vue_component__$1 as R };
//# sourceMappingURL=ReminderEventManager-8c6b8484.js.map
