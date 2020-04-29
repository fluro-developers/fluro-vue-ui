import { aC as FluroCodeEditor, bb as __vue_normalize__, bc as __vue_create_injector__ } from './index-359e066a.js';
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
import { F as FluroContentEditMixin } from './FluroContentEditMixin-89014187.js';

//

var script = {
  components: {
    FluroEditor: FluroCodeEditor
  },
  mixins: [FluroContentEditMixin],
  computed: {
    showTitleField() {
      if (this.definition && this.definition.data && this.definition.data.titleGeneration == 'force') {
        return;
      }

      return true;
    },

    fieldsOutput() {
      var self = this;
      var array = []; ///////////////////////////////////

      addField('title', {
        title: self.titleLabel,
        minimum: 1,
        maximum: 1,
        type: 'string',
        params: {
          autofocus: !self.model._id
        } // placeholder: self.titleLabel,

      });

      function addField(key, details) {
        details.key = key;
        array.push(details);
      }

      return array;
    },

    fullBody() {
      return this.definition && this.definition.data && this.definition.data.fullBody;
    },

    hideBody() {
      return this.definition && this.definition.data && this.definition.data.hideBody;
    },

    titleLabel() {
      return _.get(this.definition, 'data.titleLabel') || 'Title';
    },

    bodyLabel() {
      return _.get(this.definition, 'data.bodyLabel') || 'Body';
    }

  },

  data() {
    return {
      editorOptions: {// tokens: [{
        //     title: 'First Name',
        //     key: 'firstName'
        // },{
        //     title: 'Last Name',
        //     key: 'lastName'
        // }]
      }
    };
  }

};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flex-column',[(_vm.loading)?[_c('fluro-page-preloader',{attrs:{"contain":""}})]:[_c('tabset',{attrs:{"justified":true,"vertical":true}},[(!_vm.definition || _vm.fullBody)?_c('tab',{attrs:{"heading":_vm.bodyLabel}},[_c('fluro-editor',{staticClass:"full-bleed",attrs:{"options":_vm.editorOptions,"placeholder":"Type your text in here"},model:{value:(_vm.model.body),callback:function ($$v) {_vm.$set(_vm.model, "body", $$v);},expression:"model.body"}})],1):_vm._e(),_vm._v(" "),(_vm.definition)?_c('tab',{attrs:{"heading":((_vm.definition.title) + " Details")}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',{attrs:{"fluid":""}},[_c('constrain',{attrs:{"sm":""}},[(_vm.showTitleField)?[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.title},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})]:_vm._e(),_vm._v(" "),_c('h3',{attrs:{"margin":""}},[_vm._v(_vm._s(_vm.definition.title)+" Details")]),_vm._v(" "),_c('fluro-content-form',{attrs:{"options":_vm.options,"fields":_vm.definition.fields},model:{value:(_vm.model.data),callback:function ($$v) {_vm.$set(_vm.model, "data", $$v);},expression:"model.data"}}),_vm._v(" "),(!_vm.hideBody && !_vm.fullBody)?[_c('v-label',[_vm._v(_vm._s(_vm.bodyLabel))]),_vm._v(" "),_c('fluro-editor',{attrs:{"options":_vm.editorOptions,"placeholder":"Type your text in here"},model:{value:(_vm.model.body),callback:function ($$v) {_vm.$set(_vm.model, "body", $$v);},expression:"model.body"}})]:_vm._e()],2)],1)],1)],1):_vm._e()],1)]],2)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-2538a659_0", { source: ".border-top{border-top:1px solid rgba(0,0,0,.05)}.border-right{border-right:1px solid rgba(0,0,0,.05)}.border-bottom{border-bottom:1px solid rgba(0,0,0,.05)}.border-left{border-left:1px solid rgba(0,0,0,.05)}.fluro-editor.full-bleed{margin:0;flex:1;display:flex;flex-direction:column;overflow:hidden}.fluro-editor.full-bleed .fluro-editor-textarea{flex:1}.fluro-editor.full-bleed .fluro-editor-textarea>div{border:none!important;border-radius:0;overflow:auto;padding:3%}.fluro-editor.full-bleed .editor-code-wrapper{flex:1;display:flex;flex-direction:column}.fluro-editor.full-bleed .editor-code-wrapper .fluro-code-editor{display:block;flex:1;position:relative}.fluro-editor.full-bleed .editor-code-wrapper .fluro-code-editor .ace_editor{width:100%!important;height:100%!important;position:absolute;left:0;bottom:0;right:0;top:0;border-radius:0}", map: undefined, media: undefined });

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

export default __vue_component__;
//# sourceMappingURL=article-54e24a7e.js.map
