import { aG as FluroContentForm, bb as __vue_normalize__, bc as __vue_create_injector__, l as FluroConfirmButton, bg as _ } from './index-c0dbcb50.js';
import { F as FluroContentEditMixin } from './FluroContentEditMixin-e3393f24.js';

//
var script = {
  mixins: [FluroContentEditMixin],
  props: {
    value: {
      type: Object,
      default: {}
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
    }
  },
  components: {
    FluroContentForm
  },

  data() {
    return {
      model: this.value
    };
  },

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

      addField('segments', {
        title: 'Send To',
        minimum: 1,
        maximum: 5,
        type: 'string',
        directive: 'select',
        options: [{
          name: 'Ticket Holders',
          value: 'ticket'
        }, {
          name: 'Expected Contacts',
          value: 'expected'
        }, {
          name: 'Parents of expected Contacts',
          value: 'expected parents'
        }, {
          name: 'Checked In Contacts',
          value: 'checkin'
        }, {
          name: 'Parents of Checked In Contacts',
          value: 'checkin parents'
        }]
      });
      addField('methods', {
        title: 'Send Via Method',
        minimum: 1,
        maximum: 3,
        type: 'string',
        directive: 'select',
        defaultValues: ['email'],
        options: [{
          name: 'Email',
          value: 'email'
        }, {
          name: 'Push Notification',
          value: 'push'
        }, {
          name: 'SMS',
          value: 'sms'
        }]
      });
      addField('methodPreference', {
        title: 'Method Preference',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'select',
        defaultValues: ['all'],
        options: [{
          name: 'All - Email and SMS and Push',
          value: 'all'
        }, {
          name: 'Failover - Email, SMS, Push',
          value: 'failover'
        }]
      });
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
      }); /////////////////////////////////

      addField('title', {
        title: 'Plain Text Title',
        placeholder: 'The title for this message',
        minimum: 1,
        maximum: 1,
        type: 'string'
      });
      addField('body', {
        title: 'Plain Text Message',
        description: 'For SMS and Push notifications',
        placeholder: 'Write a plain text message in here',
        minimum: 0,
        maximum: 1,
        directive: 'textarea',
        type: 'string'
      }); /////////////////////////////////

      addField('htmlTitle', {
        title: 'HTML Title',
        placeholder: 'HTML Email Subject (if different from title)',
        minimum: 0,
        maximum: 1,
        type: 'string'
      });
      addField('htmlBody', {
        title: 'HTML Message',
        description: 'For email notifications. If blank will default to the plain text message',
        minimum: 0,
        maximum: 1,
        directive: 'wysiwyg',
        type: 'string'
      });
      addField('senderEmail', {
        title: 'Sender Email Address',
        placeholder: 'eg. you@youraccount.com',
        minimum: 0,
        maximum: 1,
        type: 'string'
      }); ///////////////////////////////////

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
      var segments = self.model.segments;
      return segments.join(', ');
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
        return;
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
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.model)?_c('div',{attrs:{"py-0":""}},[_c('fluro-content-form',{ref:"form",attrs:{"options":_vm.options,"fields":_vm.customFields},scopedSlots:_vm._u([{key:"form",fn:function(ref){
var formFields = ref.formFields;
var fieldHash = ref.fieldHash;
var model = ref.model;
var update = ref.update;
var options = ref.options;
return [(_vm.viewMode)?_c('v-container',{attrs:{"fluid":"","pa-0":""}},[_c('v-layout',{attrs:{"row":"","wrap":"","grid-list-xl":"","py-0":""}},[_c('v-flex',{attrs:{"lg1":"","md2":"","xs2":""}},[_c('v-layout',{staticStyle:{"height":"100%","margin-left":"-10px"},attrs:{"row":"","wrap":"","align-center":"","justify-center":""}},[(model.methods.includes('email'))?_c('fluro-icon',{directives:[{name:"tippy",rawName:"v-tippy"}],attrs:{"icon":"envelope","content":"Sends email"}}):_vm._e(),_vm._v(" "),(model.methods.includes('push'))?_c('fluro-icon',{directives:[{name:"tippy",rawName:"v-tippy"}],attrs:{"icon":"mobile","content":"Sends push notification"}}):_vm._e(),_vm._v(" "),(model.methods.includes('sms'))?_c('fluro-icon',{directives:[{name:"tippy",rawName:"v-tippy"}],attrs:{"icon":"comment","content":"Sends SMS"}}):_vm._e()],1)],1),_vm._v(" "),_c('v-flex',{attrs:{"lg11":"","md10":"","xs10":""}},[_c('p',{staticClass:"muted mb-0"},[_vm._v("Sending to "),_c('span',{staticClass:"capitalize-text"},[_vm._v(_vm._s(_vm.sendToFormatted))])]),_vm._v(" "),_c('h5',[_vm._v(_vm._s(model.title)),(model.htmlTitle)?_c('span',[_vm._v(" ("+_vm._s(model.htmlTitle)+")")]):_vm._e()]),_vm._v(" "),(model.body)?_c('i',{staticClass:"muted mb-0"},[_vm._v("\""+_vm._s(model.body)+"\"")]):_vm._e(),_vm._v(" "),_c('p',{staticClass:"muted mb-0"},[_vm._v(_vm._s(_vm.formattedTotalPeriodWhenPoint)+" "+_vm._s(_vm.startDate ? '- ' + _vm.formattedTime.format("h:mma dddd MMM Do YYYY") : '')+" "+_vm._s(_vm.startDate ? '(' + _vm.formattedTime.fromNow() + ')' : ''))])])],1)],1):(_vm.editMode)?_c('div',[_c('v-container',{attrs:{"fluid":"","pa-0":""}},[_c('v-layout',{attrs:{"row":"","wrap":"","grid-list-xl":"","py-0":""}},[_c('v-flex',{attrs:{"lg1":"","md2":"","xs2":""}},[_c('v-layout',{staticStyle:{"height":"100%","margin-left":"-10px"},attrs:{"row":"","wrap":"","align-center":"","justify-center":""}},[(model.methods.includes('email'))?_c('fluro-icon',{directives:[{name:"tippy",rawName:"v-tippy"}],attrs:{"icon":"envelope","content":"Sends email"}}):_vm._e(),_vm._v(" "),(model.methods.includes('push'))?_c('fluro-icon',{directives:[{name:"tippy",rawName:"v-tippy"}],attrs:{"icon":"mobile","content":"Sends push notification"}}):_vm._e(),_vm._v(" "),(model.methods.includes('sms'))?_c('fluro-icon',{directives:[{name:"tippy",rawName:"v-tippy"}],attrs:{"icon":"comment","content":"Sends SMS"}}):_vm._e()],1)],1),_vm._v(" "),_c('v-flex',{attrs:{"lg11":"","md10":"","xs10":""}},[_c('p',{staticClass:"muted mb-0"},[_vm._v("Sending to "),_c('span',{staticClass:"capitalize-text"},[_vm._v(_vm._s(_vm.sendToFormatted))])]),_vm._v(" "),_c('h5',[_vm._v(_vm._s(model.title)),(model.htmlTitle)?_c('span',[_vm._v(" ("+_vm._s(model.htmlTitle)+")")]):_vm._e()]),_vm._v(" "),(model.body)?_c('i',{staticClass:"muted mb-0"},[_vm._v("\""+_vm._s(model.body)+"\"")]):_vm._e(),_vm._v(" "),_c('p',{staticClass:"muted mb-0"},[_vm._v(_vm._s(_vm.formattedTotalPeriodWhenPoint)+" "+_vm._s(_vm.startDate ? '- ' + _vm.formattedTime.format("h:mma dddd MMM Do YYYY") : '')+" "+_vm._s(_vm.startDate ? '(' + _vm.formattedTime.fromNow() + ')' : ''))])])],1)],1),_vm._v(" "),_c('v-container',{attrs:{"fluid":"","pa-0":"","grid-list-xl":""}},[_c('v-layout',{attrs:{"row":"","wrap":"","grid-list-xl":"","py-0":""}},[_c('v-flex',{attrs:{"sm12":"","xs12":""}},[_c('fluro-panel',[_c('fluro-panel-body',[_c('h4',[_vm._v("When")]),_vm._v(" "),_c('v-layout',{attrs:{"row":"","wrap":"","grid-list-xl":""}},[_c('v-flex',{attrs:{"xs12":"","sm3":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.total},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm3":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.period},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm3":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.when},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm3":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.point},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1)],1)],1)],1),_vm._v(" "),_c('fluro-panel',[_c('fluro-panel-body',[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.title},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.body},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1)],1),_vm._v(" "),(model.methods.includes('email'))?_c('fluro-panel',[_c('fluro-panel-body',[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.htmlTitle},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.htmlBody},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.senderEmail},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1)],1):_vm._e()],1),_vm._v(" "),_c('v-flex',{attrs:{"sm6":"","xs12":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.methods},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"sm6":"","xs12":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.methodPreference},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1)],1)],1)],1):(_vm.createMode)?_c('v-container',{attrs:{"fluid":"","pa-0":""}},[_c('v-layout',{attrs:{"row":"","wrap":"","grid-list-xl":"","py-0":""}},[_c('v-flex',{attrs:{"sm5":"","xs12":"","py-0":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.segments},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.methods},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.methodPreference},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"sm7":"","xs12":"","py-0":""}},[_c('fluro-panel',[_c('fluro-panel-body',[_c('h4',[_vm._v("When")]),_vm._v(" "),_c('v-layout',{attrs:{"row":"","wrap":""}},[_c('v-flex',{attrs:{"xs12":"","sm3":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.total},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm3":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.period},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm3":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.when},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm3":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.point},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1)],1)],1)],1),_vm._v(" "),_c('fluro-panel',[_c('fluro-panel-body',[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.title},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.body},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1)],1),_vm._v(" "),(model.methods.includes('email'))?_c('fluro-panel',[_c('fluro-panel-body',[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.htmlTitle},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.htmlBody},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.senderEmail},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1)],1):_vm._e()],1)],1)],1):_vm._e()]}}],null,false,2133772366),model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1):_vm._e()};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-4ac0b3a0_0", { source: ".capitalize-text{text-transform:capitalize}", map: undefined, media: undefined });

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
      type: Array
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
    }
  },

  created() {
    for (let i = 0; i < this.model.length; i++) {
      this.editing.push(false);
    }
  },

  components: {
    MessagingEventComponent: __vue_component__,
    FluroConfirmButton
  },

  data() {
    return {
      model: this.value,
      proposed: {},
      editing: []
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
      this.proposed = {};
    },

    remove(index) {
      this.model.splice(index, 1);
      this.editing.splice(index, 1);
    },

    toggleEdit(index) {
      var self = this; //console.log(self.$refs);

      var ref = 'editform' + index; //console.log(self.$refs[ref]);

      if (self.editing[index]) {
        self.$refs[ref][0].validateAllFields();

        if (self.clonedModel[index].errorMessages.length) {
          return;
        }

        self.model[index] = self.clonedModel[index];
        return self.$set(self.editing, index, false);
      } else {
        return self.$set(self.editing, index, true);
      }
    }

  },
  computed: {
    clonedModel() {
      return JSON.parse(JSON.stringify(this.model));
    }

  }
};

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('h4',[_vm._v(_vm._s(_vm.model.length)+" scheduled message"+_vm._s(_vm.model.length == 1 ? '' : 's'))]),_vm._v(" "),_c('p',{staticClass:"muted"},[_vm._v("Add relative time messages to be sent before or after the event")]),_vm._v(" "),_c('list-group',_vm._l((_vm.model),function(message,index){return _c('list-group-item',[_c('v-layout',{attrs:{"align-start":"","row":"","wrap":""}},[_c('v-flex',{staticClass:"full-width",attrs:{"sm10":"","xs12":"","pa-1":""}},[_c('messaging-event-component',{ref:'editform' + index,refInFor:true,attrs:{"config":_vm.config,"context":_vm.editing[index] ? 'edit' : 'view',"startDate":_vm.startDate,"endDate":_vm.endDate},model:{value:(_vm.clonedModel[index]),callback:function ($$v) {_vm.$set(_vm.clonedModel, index, $$v);},expression:"clonedModel[index]"}})],1),_vm._v(" "),_c('v-flex',{staticClass:"full-width",attrs:{"sm2":"","xs12":"","pa-1":""}},[_c('v-btn',{attrs:{"block":""},on:{"click":function($event){return _vm.toggleEdit(index)}}},[_vm._v(_vm._s(_vm.editing[index] ? 'Done' : 'Edit'))]),_vm._v(" "),_c('fluro-confirm-button',{attrs:{"content":"Remove"},on:{"click":function($event){return _vm.remove(index)}},scopedSlots:_vm._u([{key:"default",fn:function(ref){
var confirming = ref.confirming;
return [_c('v-btn',{staticStyle:{"transition":"all 0.1s","width":"100%"},attrs:{"flat":"","block":"","color":confirming ? 'red' : ''}},[_vm._v(_vm._s(confirming ? 'Confirm?' : 'Remove'))])]}}],null,true)})],1)],1)],1)}),1),_vm._v(" "),_c('fluro-panel',[_c('fluro-panel-body',[_c('form',{on:{"submit":function($event){$event.preventDefault();$event.stopPropagation();return _vm.add()}}},[_c('v-container',{attrs:{"fluid":"","grid-list-xl":"","pa-1":""}},[_c('v-layout',{attrs:{"row":"","wrap":"","grid-list-xl":""}},[_c('v-flex',{attrs:{"sm10":"","xs12":""}},[_c('messaging-event-component',{ref:"createform",attrs:{"config":_vm.config,"context":"create"},model:{value:(_vm.proposed),callback:function ($$v) {_vm.proposed=$$v;},expression:"proposed"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"sm2":"","xs12":""}},[_c('v-btn',{attrs:{"block":"","color":"primary","type":"submit"},on:{"click":function($event){return _vm.add()}}},[_vm._v("Add")])],1)],1)],1)],1)])],1)],1)};
var __vue_staticRenderFns__$1 = [];

  /* style */
  const __vue_inject_styles__$1 = function (inject) {
    if (!inject) return
    inject("data-v-5c6c9bbe_0", { source: ".border-top{border-top:1px solid rgba(0,0,0,.05)}.border-right{border-right:1px solid rgba(0,0,0,.05)}.border-bottom{border-bottom:1px solid rgba(0,0,0,.05)}.border-left{border-left:1px solid rgba(0,0,0,.05)}.full-width{width:100%}", map: undefined, media: undefined });

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
    },
    roomsPath: {
      type: String
    },
    locationsPath: {
      type: String
    },
    allLocations: {
      type: Array
    }
  },

  //components: { MessagingEventComponent, FluroConfirmButton },
  data() {
    return {
      model: this.value,
      locations: this.allLocations
    };
  },

  methods: {
    selectRoom(item) {
      var self = this;

      if (!self.isSelectedRoom(item)) {
        return self.$set(self.model[self.roomsPath], self.model[self.roomsPath].length, item);
      }
    },

    deselectRoom(item) {
      var self = this;

      if (!item) {
        return;
      } //Get the item ID


      var itemID = self.$fluro.utils.getStringID(item); //Find the index of the matching item

      var index = (self.model[self.roomsPath] || []).findIndex(function (selectedItem) {
        var selectedItemID = self.$fluro.utils.getStringID(selectedItem);
        return itemID == selectedItemID;
      });
      self.model[self.roomsPath].splice(index, 1);
    },

    toggleRoom(item) {
      var self = this;

      if (self.isSelectedRoom(item)) {
        self.deselectRoom(item);
      } else {
        self.selectRoom(item);
      } // console.log('TOGGLE', self.model[self.roomsPath]);

    },

    isSelectedRoom(item) {
      var self = this;
      var itemID = self.$fluro.utils.getStringID(item); //Check if the ID is already selected

      var match = (self.model[self.roomsPath] || []).some(function (selectedItem) {
        var selectedItemID = self.$fluro.utils.getStringID(selectedItem);
        return itemID == selectedItemID;
      });

      if (match) {
        return true;
      } else {
        return false;
      }
    },

    selectLocation(item) {
      var self = this;

      if (!self.isSelectedLocation(item)) {
        return self.$set(self.model[self.locationsPath], self.model[self.locationsPath].length, item);
      }
    },

    deselectLocation(item) {
      var self = this;

      if (!item) {
        return;
      } //Get the item ID


      var itemID = self.$fluro.utils.getStringID(item); //Find the index of the matching item

      var index = (self.model[self.locationsPath] || []).findIndex(function (selectedItem) {
        var selectedItemID = self.$fluro.utils.getStringID(selectedItem);
        return itemID == selectedItemID;
      });
      self.model[self.locationsPath].splice(index, 1);
      (item.rooms || []).forEach(function (room) {
        if (self.isSelectedRoom(room)) {
          return self.deselectRoom(room);
        }
      });
    },

    toggleLocation(item) {
      var self = this;

      if (self.isSelectedLocation(item)) {
        self.deselectLocation(item);
      } else {
        self.selectLocation(item);
      } // console.log('TOGGLE', self.model[self.locationsPath]);

    },

    isSelectedLocation(item) {
      var self = this;
      var itemID = self.$fluro.utils.getStringID(item); //Check if the ID is already selected

      var match = (self.model[self.locationsPath] || []).some(function (selectedItem) {
        var selectedItemID = self.$fluro.utils.getStringID(selectedItem);
        return itemID == selectedItemID;
      });
      return match;
    },

    parentRealm(room) {
      var self = this;
      var parent = (self.locations || []).find(function (loc) {
        return room.locationName == loc.title;
      });

      if (parent) {
        return parent.realms;
      } else {
        return undefined;
      }
    },

    findLocationName(room) {
      var self = this;
      var itemID = self.$fluro.utils.getStringID(room);
      var location = (self.locations || []).find(function (loc) {
        var locRoomIDs = (loc.rooms || []).map(function (room) {
          return room ? room._id : null;
        });
        return locRoomIDs.includes(itemID);
      });

      if (location) {
        room.locationName = location.title;
      }

      return room;
    },

    createLocation() {
      var self = this;
      self.$fluro.global.create('location', {}, true).then(function (res) {
        self.locations.push(res);
      });
    }

  },
  watch: {
    'allLocations': function () {
      var self = this;
      self.locations = self.allLocations;
    }
  },
  computed: {
    locationOptions() {
      var self = this;
      return _.chain(self.locations).map(function (loc) {
        var locationName = loc.title;

        _.forEach(loc.rooms, function (room) {
          return room.locationName = locationName;
        });

        return loc;
      }).flatten().value();
    },

    roomOptions() {
      var self = this;

      var temp = _.chain(self.model[self.locationsPath]).map(function (loc) {
        if (loc.rooms.length && !loc.rooms[0].locationName) {
          _.forEach(loc.rooms, self.findLocationName);
        }

        return loc.rooms;
      }).flatten().value();

      return temp;
    }

  }
};

/* script */
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-layout',{attrs:{"row":"","wrap":""}},[_c('v-flex',{staticClass:"full-width",attrs:{"sm6":"","xs12":"","px-2":""}},[_c('h4',{staticClass:"header-margin"},[_vm._v("Locations")]),_vm._v(" "),_c('list-group',_vm._l((_vm.locationOptions),function(location){return _c('list-group-item',{attrs:{"item":location,"selectable":true,"isSelected":_vm.isSelectedLocation(location)},on:{"click":function($event){return _vm.toggleLocation(location)}}})}),1),_vm._v(" "),_c('v-btn',{staticClass:"button-margin",attrs:{"color":"primary"},on:{"click":_vm.createLocation}},[_vm._v("Add a new location")])],1),_vm._v(" "),_c('v-flex',{staticClass:"full-width",attrs:{"sm6":"","xs12":"","px-2":""}},[_c('h4',{staticClass:"header-margin"},[_vm._v("Rooms")]),_vm._v(" "),_c('list-group',[_c('transition-group',{attrs:{"name":"fade"}},_vm._l((_vm.roomOptions),function(room){return _c('list-group-item',{key:room._id,attrs:{"item":room,"selectable":true,"isSelected":_vm.isSelectedRoom(room)},on:{"click":function($event){return _vm.toggleRoom(room)}},scopedSlots:_vm._u([{key:"left",fn:function(){return [_c('fluro-realm-bar',{attrs:{"realm":_vm.parentRealm(room)}}),_vm._v(" "),_c('div',{staticClass:"left-slot"},[_c('div',{staticClass:"left-icon"},[_c('fluro-icon',{attrs:{"icon":"door-closed"}})],1)])]},proxy:true}],null,true)},[_vm._v(" "),[_c('strong',[_vm._v(_vm._s(room.title))]),_vm._v(" "),_c('p',{staticClass:"muted mb-0"},[_vm._v(_vm._s(room.locationName))])]],2)}),1)],1)],1)],1)};
var __vue_staticRenderFns__$2 = [];

  /* style */
  const __vue_inject_styles__$2 = function (inject) {
    if (!inject) return
    inject("data-v-98d9bd5c_0", { source: ".border-top{border-top:1px solid rgba(0,0,0,.05)}.border-right{border-right:1px solid rgba(0,0,0,.05)}.border-bottom{border-bottom:1px solid rgba(0,0,0,.05)}.border-left{border-left:1px solid rgba(0,0,0,.05)}.left-slot{text-align:center;width:50px;margin-right:10px}.left-slot .left-icon{width:30px;height:30px;background-color:rgba(0,0,0,.1);text-align:center;line-height:30px;display:inline-block}.header-margin{margin-bottom:10px}.button-margin{margin-bottom:20px}.full-width{width:100%}.fade-enter-active,.fade-leave-active{transition:all .3s}.fade-enter,.fade-leave-to{opacity:0}", map: undefined, media: undefined });

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

export { __vue_component__$2 as L, __vue_component__$1 as M };
//# sourceMappingURL=LocationSelector-e2070620.js.map
