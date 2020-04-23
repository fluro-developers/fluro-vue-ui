'use strict';

var index = require('./index-e9d34d7f.js');
require('vuedraggable');
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
var FluroContentEditMixin = require('./FluroContentEditMixin-a3dadd0a.js');

//

var script = {
  mixins: [FluroContentEditMixin.FluroContentEditMixin],
  components: {
    FluroFieldEditor: index.FluroFieldEditor,
    FluroCodeEditor: index.FluroCodeEditor$1
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
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-7cb2bda9_0", { source: ".border-top[data-v-7cb2bda9]{border-top:1px solid rgba(0,0,0,.05)}.border-right[data-v-7cb2bda9]{border-right:1px solid rgba(0,0,0,.05)}.border-bottom[data-v-7cb2bda9]{border-bottom:1px solid rgba(0,0,0,.05)}.border-left[data-v-7cb2bda9]{border-left:1px solid rgba(0,0,0,.05)}.code-heading[data-v-7cb2bda9]{line-height:30px;height:30px;padding:0 15px;background:#555;color:rgba(255,255,255,.8);white-space:nowrap;border:1px solid rgba(0,0,0,.1);cursor:pointer!important}.code-heading[data-v-7cb2bda9]:hover{background:#444;color:#fff}.code-heading label[data-v-7cb2bda9]{display:block;text-transform:uppercase;margin:0;padding:0;letter-spacing:.05em;font-size:12px;pointer-events:none}.code-panels[data-v-7cb2bda9]{background:#262626}.code-panel .code-panel-column[data-v-7cb2bda9]{border-left:1px solid rgba(0,0,0,.1);border-right:1px solid rgba(0,0,0,.1)}.panel-collapsed[data-v-7cb2bda9]{width:30px!important;flex:none;background:#fafafa}.panel-collapsed .code-heading[data-v-7cb2bda9]{flex:1;height:auto}.panel-collapsed .code-heading label[data-v-7cb2bda9]{transform:rotate(90deg)}.panel-collapsed .code-panel-column[data-v-7cb2bda9]{display:none}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-7cb2bda9";
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

exports.default = __vue_component__;
//# sourceMappingURL=component-7b6b2076.js.map
