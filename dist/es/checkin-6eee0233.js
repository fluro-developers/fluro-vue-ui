import { bb as __vue_normalize__, bc as __vue_create_injector__ } from './index-db60994e.js';
import 'vue';
import 'vuedraggable';
import 'vue-color';
import 'tippy.js';
import 'js-beautify';
import 'tiptap';
import 'tiptap-commands';
import 'tiptap-extensions';
import 'signature_pad';
import 'fluro';
import 'vue2-ace-editor';
import 'vuex-map-fields';
import 'async';
import { F as FluroContentEditMixin } from './FluroContentEditMixin-c1c60698.js';

//

var script = {
  mixins: [FluroContentEditMixin],
  components: {},
  methods: {
    modelUpdated() {
      this.update(this.model);
    }

  },

  created() {
  },

  asyncComputed: {},
  computed: {
    showOutline() {
      return false; //true; //false;//true;//false;//true;
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
      addField('contact', {
        title: 'Contact',
        minimum: 1,
        maximum: 1,
        type: 'reference',
        description: 'The person who checked was checked in',
        params: {
          restrictType: 'contact'
        }
      });
      addField('checkedInBy', {
        title: 'Checked In By',
        minimum: 1,
        maximum: 1,
        type: 'reference',
        description: 'The person who checked this contact in',
        params: {
          restrictType: 'contact'
        }
      });
      addField('pinNumber', {
        title: 'Pin Number',
        minimum: 0,
        maximum: 1,
        type: 'password',
        description: 'The Pin Number used when checking in (If any)'
      }); // addField('firstLine', {
      //     title: 'Description',
      //     minimum: 0,
      //     maximum: 1,
      //     type: 'string',
      //     placeholder: 'Eg. A list of my favorite people',
      // })
      // // console.log('TYPE OPTIONS', self.typeOptions);
      // addField('filterType', {
      //     title: 'Type',
      //     minimum: 0,
      //     maximum: 1,
      //     type: 'string',
      //     directive: 'select',
      //     description: 'The type of item you want to return from this query',
      //     options: self.typeOptions,
      // })
      ///////////////////////////////////

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
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flex-column',[(_vm.loading)?[_c('fluro-page-preloader',{attrs:{"contain":""}})]:_c('tabset',{attrs:{"justified":true,"vertical":true}},[_c('tab',{attrs:{"heading":"Checkin Details"}},[_vm._t("default",[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',[_c('constrain',{attrs:{"sm":""}},[_c('div',{staticClass:"grid-list-xl"},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.event},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.contact},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.checkedInBy},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.pinNumber},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1)])],1)],1)])],2)],1)],2)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-1fb6e770_0", { source: ".border-top[data-v-1fb6e770]{border-top:1px solid rgba(0,0,0,.05)}.border-right[data-v-1fb6e770]{border-right:1px solid rgba(0,0,0,.05)}.border-bottom[data-v-1fb6e770]{border-bottom:1px solid rgba(0,0,0,.05)}.border-left[data-v-1fb6e770]{border-left:1px solid rgba(0,0,0,.05)}.hint[data-v-1fb6e770]{font-size:10px;opacity:.5;color:inherit;display:block}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-1fb6e770";
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
//# sourceMappingURL=checkin-6eee0233.js.map
