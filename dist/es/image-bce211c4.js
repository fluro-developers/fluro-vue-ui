import { aG as FluroCodeEditor, bf as styleInject, bg as __vue_normalize__ } from './index-1250fe97.js';
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
import { F as FluroContentEditMixin } from './FluroContentEditMixin-cc735596.js';
import { F as FluroAssetEditMixin } from './FluroAssetEditMixin-41cc22af.js';

//

var script = {
  components: {
    FluroEditor: FluroCodeEditor
  },

  created() {
    this.$set(this.model, 'assetType', 'upload');
  },

  mixins: [FluroContentEditMixin, FluroAssetEditMixin],
  computed: {
    hasMeta() {
      if (!this.model.data) {
        return;
      }

      return this.model.data.iptc || this.model.data.exif;
    },

    fieldsOutput() {
      var array = []; ///////////////////////////////////

      addField('title', {
        title: 'Title',
        minimum: 0,
        maximum: 1,
        type: 'string',
        placeholder: 'Defaults to filename if left empty'
      }); ///////////////////////////////////

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
      return 'Title';
    },

    bodyLabel() {
      return 'Body';
    }

  },
  methods: {
    assetReplaced(model) {
      this.imageCacheKey = Math.random();
      this.replace = false;
    }

  },

  data() {
    return {
      imageCacheKey: 0,
      replace: false,
      editorOptions: {}
    };
  }

};

var css_248z = ".border-top{border-top:1px solid rgba(0,0,0,.05)}.border-right{border-right:1px solid rgba(0,0,0,.05)}.border-bottom{border-bottom:1px solid rgba(0,0,0,.05)}.border-left{border-left:1px solid rgba(0,0,0,.05)}.media-preview{background:#eee;display:block;min-height:350px;margin-bottom:15px;border:1px solid rgba(0,0,0,.1);border-radius:5px;overflow:hidden}.media-preview .media-preview-wrap{max-width:750px;margin:auto}";
styleInject(css_248z);

var css_248z$1 = ".border-top[data-v-25d45404]{border-top:1px solid rgba(0,0,0,.05)}.border-right[data-v-25d45404]{border-right:1px solid rgba(0,0,0,.05)}.border-bottom[data-v-25d45404]{border-bottom:1px solid rgba(0,0,0,.05)}.border-left[data-v-25d45404]{border-left:1px solid rgba(0,0,0,.05)}.color-swatch[data-v-25d45404]{width:36px;height:36px;border-radius:3px;margin:0 1px 1px 0;display:inline-block}";
styleInject(css_248z$1);

/* script */
const __vue_script__ = script;
/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flex-column',[(_vm.loading)?[_c('fluro-page-preloader',{attrs:{"contain":""}})]:[_c('tabset',{attrs:{"justified":true,"vertical":true}},[_c('tab',{attrs:{"heading":"Details"}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',{attrs:{"fluid":""}},[_c('constrain',{attrs:{"sm":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.title},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),(_vm.model._id)?[_c('div',{staticClass:"media-preview"},[_c('div',{staticClass:"media-preview-wrap"},[_c('fluro-image',{attrs:{"longpress":true,"height":450,"image-height":450,"contain":"","item":_vm.model,"cacheKey":_vm.imageCacheKey,"spinner":true}})],1)]),_vm._v(" "),(_vm.replace)?[_c('asset-replace-upload',{on:{"input":_vm.assetReplaced},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})]:[_c('v-layout',[_c('v-flex',[_c('v-input',{staticClass:"no-flex",attrs:{"label":_vm.model.filename}},[_c('div',[_c('v-btn',{staticClass:"ma-0",on:{"click":function($event){_vm.replace = true;}}},[_vm._v("\n                                                        Replace with a new file\n                                                        "),_c('fluro-icon',{attrs:{"right":"","library":"fas","icon":"cloud-upload"}})],1)],1)])],1),_vm._v(" "),_c('v-flex',[(_vm.model.colors && _vm.model.colors.length)?_c('v-input',{staticClass:"no-flex",attrs:{"label":"Main Colors"}},[_c('div',_vm._l((_vm.model.colors),function(color){return _c('div',{directives:[{name:"tippy",rawName:"v-tippy"}],staticClass:"color-swatch",style:({backgroundColor:color}),attrs:{"content":color}})}),0)]):_vm._e()],1)],1)]]:[_c('asset-replace-upload',{on:{"file":_vm.fileSelected},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],_vm._v(" "),(_vm.definition && _vm.definition.fields && _vm.definition.fields.length)?[_c('fluro-content-form',{attrs:{"options":_vm.options,"fields":_vm.definition.fields},model:{value:(_vm.model.data),callback:function ($$v) {_vm.$set(_vm.model, "data", $$v);},expression:"model.data"}})]:_vm._e(),_vm._v(" "),(!_vm.hideBody && !_vm.fullBody)?[_c('v-input',{staticClass:"no-flex",attrs:{"label":"Body / Caption"}},[_c('fluro-editor',{attrs:{"options":_vm.editorOptions,"placeholder":"Type your text in here"},model:{value:(_vm.model.body),callback:function ($$v) {_vm.$set(_vm.model, "body", $$v);},expression:"model.body"}})],1)]:_vm._e(),_vm._v(" "),_c('fluro-privacy-select',{model:{value:(_vm.model.privacy),callback:function ($$v) {_vm.$set(_vm.model, "privacy", $$v);},expression:"model.privacy"}})],2)],1)],1)],1),_vm._v(" "),(_vm.hasMeta)?_c('tab',{attrs:{"heading":"Advanced / Metadata"}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',{attrs:{"fluid":""}},[_c('constrain',{attrs:{"sm":""}},[(_vm.model.data.iptc)?_c('fluro-panel',[_c('fluro-panel-title',[_c('h5',[_vm._v("IPTC Data")])]),_vm._v(" "),_c('fluro-panel-body',[_c('json-view',{attrs:{"deep":3,"data":_vm.model.data.iptc}})],1)],1):_vm._e(),_vm._v(" "),(_vm.model.data.exif)?_c('fluro-panel',[_c('fluro-panel-title',[_c('h5',[_vm._v("EXIF Data")])]),_vm._v(" "),_c('fluro-panel-body',[_c('json-view',{attrs:{"deep":3,"data":_vm.model.data.exif}})],1)],1):_vm._e()],1)],1)],1)],1):_vm._e()],1)]],2)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = "data-v-25d45404";
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
//# sourceMappingURL=image-bce211c4.js.map
