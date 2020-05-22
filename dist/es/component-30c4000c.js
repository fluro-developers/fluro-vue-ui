import { e as FluroFieldEditor, aF as FluroCodeEditor, bd as __vue_normalize__ } from './index-53cb5ffc.js';
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
import { F as FluroContentEditMixin } from './FluroContentEditMixin-c67566ae.js';

//

var script = {
  mixins: [FluroContentEditMixin],
  components: {
    FluroFieldEditor,
    FluroCodeEditor
  },
  methods: {
    togglePanel(syntax) {
      console.log('TOGGLE', syntax);
      this.collapsed[syntax] = !this.collapsed[syntax];
    }

  },

  created() {
    if (!this.model.fields) {
      this.$set(this.model, 'fields', []);
    }
  },

  computed: {
    fieldsOutput() {
      var array = []; ///////////////////////////////////

      addField('title', {
        title: 'Title',
        minimum: 1,
        maximum: 1,
        type: 'string',
        placeholder: 'Eg. My Awesome List'
      }); ///////////////////////////////////

      function addField(key, details) {
        details.key = key;
        array.push(details);
      }

      return array;
    }

  },

  data() {
    return {
      collapsed: {
        js: false,
        html: false,
        css: false
      }
    };
  }

};

/* script */
const __vue_script__ = script;
/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flex-column',[(_vm.loading)?[_c('fluro-page-preloader',{attrs:{"contain":""}})]:_c('tabset',{attrs:{"justified":true}},[_c('tab',{attrs:{"heading":"Code"}},[_c('flex-row',{staticClass:"code-panels"},[_c('flex-column',{staticClass:"code-panel",class:{'panel-collapsed':_vm.collapsed.js}},[_c('div',{staticClass:"code-heading",on:{"click":function($event){return _vm.togglePanel('js')}}},[_c('label',[_c('fluro-icon',{attrs:{"icon":"caret-right","library":"fas","left":""}}),_c('strong',[_vm._v("Javascript")])],1)]),_vm._v(" "),_c('flex-column',{staticClass:"code-panel-column"},[_c('fluro-code-editor',{staticStyle:{"flex":"1 1 100%"},attrs:{"lang":"javascript"},model:{value:(_vm.model.js),callback:function ($$v) {_vm.$set(_vm.model, "js", $$v);},expression:"model.js"}})],1)],1),_vm._v(" "),_c('flex-column',{staticClass:"code-panel",class:{'panel-collapsed':_vm.collapsed.html}},[_c('div',{staticClass:"code-heading",on:{"click":function($event){return _vm.togglePanel('html')}}},[_c('label',[_c('fluro-icon',{attrs:{"icon":"caret-right","library":"fas","left":""}}),_c('strong',[_vm._v("HTML")])],1)]),_vm._v(" "),_c('flex-column',{staticClass:"code-panel-column"},[_c('fluro-code-editor',{staticStyle:{"flex":"1 1 100%"},attrs:{"lang":"html"},model:{value:(_vm.model.html),callback:function ($$v) {_vm.$set(_vm.model, "html", $$v);},expression:"model.html"}})],1)],1),_vm._v(" "),_c('flex-column',{staticClass:"code-panel",class:{'panel-collapsed':_vm.collapsed.css}},[_c('div',{staticClass:"code-heading",on:{"click":function($event){return _vm.togglePanel('css')}}},[_c('label',[_c('fluro-icon',{attrs:{"icon":"caret-right","library":"fas","left":""}}),_c('strong',[_vm._v("SCSS")])],1)]),_vm._v(" "),_c('flex-column',{staticClass:"code-panel-column"},[_c('fluro-code-editor',{staticStyle:{"flex":"1 1 100%"},attrs:{"autoformat":false,"lang":"scss"},model:{value:(_vm.model.css),callback:function ($$v) {_vm.$set(_vm.model, "css", $$v);},expression:"model.css"}})],1)],1)],1)],1),_vm._v(" "),_c('tab',{attrs:{"heading":"Component Fields"}},[_c('fluro-field-editor',{attrs:{"item":_vm.model},model:{value:(_vm.model.fields),callback:function ($$v) {_vm.$set(_vm.model, "fields", $$v);},expression:"model.fields"}})],1),_vm._v(" "),_c('tab',{attrs:{"heading":(_vm.readableContentType + " Details")}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',{attrs:{"fluid":""}},[_c('constrain',{attrs:{"sm":""}},[_c('h3',{attrs:{"margin":""}},[_vm._v(_vm._s(_vm.readableContentType)+" Details")]),_vm._v(" "),(_vm.definedFields.length)?[_c('fluro-content-form',{attrs:{"options":_vm.options,"fields":_vm.definedFields},model:{value:(_vm.model.data),callback:function ($$v) {_vm.$set(_vm.model, "data", $$v);},expression:"model.data"}})]:_vm._e()],2)],1)],1)],1)],1)],2)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = "data-v-7cb2bda9";
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

export default __vue_component__;
//# sourceMappingURL=component-30c4000c.js.map
