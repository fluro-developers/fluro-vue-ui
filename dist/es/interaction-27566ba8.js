import { bg as __vue_normalize__, bh as __vue_create_injector__ } from './index-8d7f8f94.js';
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
import { F as FluroContentEditMixin } from './FluroContentEditMixin-8de37507.js';

//

var script = {
  mixins: [FluroContentEditMixin],
  components: {},

  created() {
  },

  asyncComputed: {},
  computed: {
    askDOB() {
      return _.get(this.definition, 'data.askDOB') || _.get(this.definition, 'data.requireDOB') || this.model._dob;
    },

    fieldsOutput() {
      var self = this;
      var array = [];
      var fields = [{
        title: 'Names',
        type: 'group',
        key: 'names',
        sameLine: true,
        fields: [{
          title: 'First Name',
          key: '_firstName',
          minimum: 0,
          maximum: 1,
          type: 'string'
        }, {
          title: 'Last Name',
          key: '_lastName',
          minimum: 0,
          maximum: 1,
          type: 'string'
        }]
      }, {
        title: 'Extras',
        type: 'group',
        key: 'extras',
        sameLine: true,
        fields: [{
          title: 'Gender',
          key: '_gender',
          minimum: 0,
          maximum: 1,
          type: 'string',
          directive: 'select',
          options: [{
            name: 'Male',
            value: 'male'
          }, {
            name: 'Female',
            value: 'female'
          }, {
            name: 'Unknown',
            value: 'unknown'
          }]
        }, {
          title: 'Date of Birth',
          key: '_dob',
          minimum: 0,
          maximum: 1,
          type: 'date',
          directive: 'datepicker',
          expressions: {
            show() {
              return self.askDOB;
            }

          }
        }]
      }, {
        title: 'Communication',
        type: 'group',
        key: 'communication',
        sameLine: true,
        fields: [{
          title: 'Email Address',
          key: '_email',
          minimum: 0,
          maximum: 1,
          type: 'email'
        }, {
          title: 'Phone Number',
          key: '_phoneNumber',
          minimum: 0,
          maximum: 1,
          type: 'string'
        }]
      }];
      addField('rawData', {
        minimum: 1,
        maximum: 1,
        asObject: true,
        type: 'group',
        fields: [{
          title: 'Contact Details',
          type: 'group',
          key: 'contactDetails',
          expressions: {
            show: `!data.contact && !data.contacts.length`
          },
          fields
        }]
      }); ///////////////////////////////////

      addField('contact', {
        title: 'Primary Contact',
        description: 'The primary contact for this interaction',
        minimum: 0,
        maximum: 1,
        type: 'reference',
        params: {
          restrictType: 'contact',
          allDefinitions: true
        }
      });
      addField('contacts', {
        title: 'Linked Contacts',
        description: 'All contacts referenced for this interaction',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        params: {
          restrictType: 'contact',
          allDefinitions: true
        }
      });
      addField('event', {
        title: 'Linked Event',
        description: 'Attach this interaction to a specific event',
        minimum: 0,
        maximum: 1,
        type: 'reference',
        params: {
          restrictType: 'event',
          allDefinitions: true
        }
      }); ///////////////////////////////////

      addField('emails', {
        type: 'group',
        sameLine: true,
        fields: [{
          title: 'Primary Email Address',
          key: 'primaryEmail',
          description: 'The primary email address relevant to this interaction',
          minimum: 0,
          maximum: 1,
          type: 'email'
        }, {
          title: 'Transaction Email Address',
          key: 'transactionEmail',
          description: 'The primary email address relevant to this interaction',
          minimum: 0,
          maximum: 1,
          type: 'email',
          expressions: {
            defaultValue: `data.primaryEmail`
          }
        }]
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
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flex-column',[(_vm.loading)?[_c('fluro-page-preloader',{attrs:{"contain":""}})]:_c('tabset',{attrs:{"justified":true,"vertical":true}},[_c('tab',[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',{attrs:{"grid-list-xl":""}},[_c('constrain',{attrs:{"sm":""}},[_c('fluro-content-form',{attrs:{"options":_vm.options,"fields":_vm.fieldsOutput},scopedSlots:_vm._u([{key:"form",fn:function(ref){
var formFields = ref.formFields;
var fieldHash = ref.fieldHash;
var model = ref.model;
var update = ref.update;
var options = ref.options;
return [(!model.contact && (!model.contacts || !model.contacts.length))?_c('fluro-panel',[_c('fluro-panel-title',[_vm._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tContact Information\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t")]),_vm._v(" "),_c('fluro-panel-body',[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.rawData},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('fluro-panel-body',{staticClass:"border-top"},[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.contact},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1)],1):[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.contact},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.contacts},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.event},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.emails},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})]}}]),model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1)],1)],1)],1)],1)],2)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-762111fe_0", { source: ".border-top[data-v-762111fe]{border-top:1px solid rgba(0,0,0,.05)}.border-right[data-v-762111fe]{border-right:1px solid rgba(0,0,0,.05)}.border-bottom[data-v-762111fe]{border-bottom:1px solid rgba(0,0,0,.05)}.border-left[data-v-762111fe]{border-left:1px solid rgba(0,0,0,.05)}.hint[data-v-762111fe]{font-size:10px;opacity:.5;color:inherit;display:block}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-762111fe";
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
//# sourceMappingURL=interaction-27566ba8.js.map
