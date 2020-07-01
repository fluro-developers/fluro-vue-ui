import { bl as __vue_normalize__, bm as __vue_create_injector__ } from './index-2cb16ddf.js';
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
import 'moment';
import { F as FluroContentEditMixin } from './FluroContentEditMixin-3a3b2f58.js';

//

var script = {
  components: {// FluroEditor,
  },

  created() {},

  data() {
    return {};
  },

  mixins: [FluroContentEditMixin],
  methods: {},
  asyncComputed: {},
  computed: {
    measureOptions() {
      var self = this;

      if (self.model.count == 1) {
        return [{
          title: 'Minute',
          value: 'minutes'
        }, {
          title: 'Hour',
          value: 'hours'
        }, {
          title: 'Day',
          value: 'days'
        }, {
          title: 'Week',
          value: 'weeks'
        }, {
          title: 'Month',
          value: 'months'
        }, {
          title: 'Year',
          value: 'years'
        }];
      } else {
        return [{
          title: 'Minutes',
          value: 'minutes'
        }, {
          title: 'Hours',
          value: 'hours'
        }, {
          title: 'Days',
          value: 'days'
        }, {
          title: 'Weeks',
          value: 'weeks'
        }, {
          title: 'Months',
          value: 'months'
        }, {
          title: 'Years',
          value: 'years'
        }];
      }
    },

    fieldsOutput() {
      var self = this;
      var array = []; ///////////////////////////////////

      addField('title', {
        title: 'Title',
        minimum: 1,
        maximum: 1,
        type: 'string'
      }); ///////////////////////////////////

      addField('description', {
        title: 'Description',
        // description: 'Enter a one line description summarizing what this role is for and the permissions it grants',
        minimum: 0,
        maximum: 1,
        type: 'string'
      }); ///////////////////////////////////

      addField('count', {
        title: 'Recur every',
        // description: 'Enter a one line description summarizing what this role is for and the permissions it grants',
        minimum: 0,
        maximum: 1,
        type: 'integer'
      });
      addField('measure', {
        title: '',
        minimum: 0,
        maximum: 1,
        type: 'select',
        options: self.measureOptions,
        directive: 'select'
      }); ///////////////////////////////////

      addField('nth', {
        title: 'On the',
        // description: 'Enter a one line description summarizing what this role is for and the permissions it grants',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'select',
        expressions: {
          hide() {
            return self.model.measure != 'months';
          }

        },
        options: [{
          title: 'Same Date',
          value: 'date'
        }, {
          title: 'First',
          value: '1'
        }, {
          title: 'Second',
          value: '2'
        }, {
          title: 'Third',
          value: '3'
        }, {
          title: 'Fourth',
          value: '4'
        }, {
          title: 'Fifth',
          value: '5'
        }]
      });
      addField('weekday', {
        title: 'Weekday',
        // description: 'Enter a one line description summarizing what this role is for and the permissions it grants',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'select',
        expressions: {
          hide() {
            return self.model.nth == 'date';
          }

        },
        options: [{
          title: 'Sunday',
          value: 'sunday'
        }, {
          title: 'Monday',
          value: 'monday'
        }, {
          title: 'Tuesday',
          value: 'tuesday'
        }, {
          title: 'Wednesday',
          value: 'wednesday'
        }, {
          title: 'Thursday',
          value: 'thursday'
        }, {
          title: 'Friday',
          value: 'friday'
        }, {
          title: 'Saturday',
          value: 'saturday'
        }]
      }); ///////////////////////////////////

      addField('timestamp', {
        title: 'At time',
        // description: 'Enter a one line description summarizing what this role is for and the permissions it grants',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'select',
        expressions: {
          hide() {
            if (self.model.measure == 'hours' || self.model.measure == 'minutes') {
              return true;
            }
          }

        },
        options: [{
          title: '12am (Midnight)',
          value: '0000'
        }, {
          title: '1am',
          value: '0100'
        }, {
          title: '2am',
          value: '0200'
        }, {
          title: '3am',
          value: '0300'
        }, {
          title: '4am',
          value: '0400'
        }, {
          title: '5am',
          value: '0500'
        }, {
          title: '6am',
          value: '0600'
        }, {
          title: '7am',
          value: '0700'
        }, {
          title: '8am',
          value: '0800'
        }, {
          title: '9am',
          value: '0900'
        }, {
          title: '10am',
          value: '1000'
        }, {
          title: '11am',
          value: '1100'
        }, {
          title: '12am',
          value: '1200'
        }, {
          title: '1pm',
          value: '1300'
        }, {
          title: '2pm',
          value: '1400'
        }, {
          title: '3pm',
          value: '1500'
        }, {
          title: '4pm',
          value: '1600'
        }, {
          title: '5pm',
          value: '1700'
        }, {
          title: '6pm',
          value: '1800'
        }, {
          title: '7pm',
          value: '1900'
        }, {
          title: '8pm',
          value: '2000'
        }, {
          title: '9pm',
          value: '2100'
        }, {
          title: '10pm',
          value: '2200'
        }, {
          title: '11pm',
          value: '2300'
        }]
      }); ///////////////////////////////////

      addField('timezone', {
        title: 'Timezone',
        // description: 'Enter a one line description summarizing what this role is for and the permissions it grants',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'timezone-select',
        expressions: {
          hide() {
            if (self.model.measure == 'hours' || self.model.measure == 'minutes') {
              return true;
            }
          }

        }
      });
      addField('nextDate', {
        title: 'Next activation',
        description: 'When is the next time this trigger should fire?',
        minimum: 0,
        maximum: 1,
        type: 'date',
        directive: 'datetimepicker'
      });
      addField('reactions', {
        title: 'Reactions',
        description: 'Select reactions that will spark when this trigger is activated',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        params: {
          restrictType: 'reaction'
        }
      }); ///////////////////////////////////

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
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flex-column',[(_vm.loading)?[_c('fluro-page-preloader',{attrs:{"contain":""}})]:[_c('tabset',{attrs:{"justified":true,"vertical":true}},[_c('tab',{attrs:{"heading":"Information"}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',{attrs:{"fluid":""}},[_c('constrain',{attrs:{"sm":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.title},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.description},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),(_vm.definition && _vm.definition.fields && _vm.definition.fields.length)?[_c('h4',{attrs:{"margin":""}},[_vm._v(_vm._s(_vm.definition.title)+" Information")]),_vm._v(" "),_c('fluro-content-form',{attrs:{"options":_vm.options,"fields":_vm.definition.fields},model:{value:(_vm.model.data),callback:function ($$v) {_vm.$set(_vm.model, "data", $$v);},expression:"model.data"}})]:_vm._e(),_vm._v(" "),_c('v-layout',[_c('v-flex',{attrs:{"xs4":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.count},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs8":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.measure},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1)],1),_vm._v(" "),(_vm.model.measure == 'months')?_c('v-layout',[_c('v-flex',{attrs:{"xs4":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.nth},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs8":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.weekday},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1)],1):_vm._e(),_vm._v(" "),(_vm.model.measure != 'hours' &&  _vm.model.measure != 'minutes')?_c('v-layout',[_c('v-flex',{attrs:{"xs4":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.timestamp},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs8":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.timezone},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1)],1):_vm._e(),_vm._v(" "),_c('v-layout',[_c('v-flex',{attrs:{"xs12":"","sm4":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.nextDate},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1)],1),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.reactions},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],2)],1)],1)],1)],1)]],2)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-752b0e28_0", { source: ".border-top[data-v-752b0e28]{border-top:1px solid rgba(0,0,0,.05)}.border-right[data-v-752b0e28]{border-right:1px solid rgba(0,0,0,.05)}.border-bottom[data-v-752b0e28]{border-bottom:1px solid rgba(0,0,0,.05)}.border-left[data-v-752b0e28]{border-left:1px solid rgba(0,0,0,.05)}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-752b0e28";
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
//# sourceMappingURL=timetrigger-c54ee208.js.map
