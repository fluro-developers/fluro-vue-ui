import { aD as FluroCodeEditor, bc as __vue_normalize__, bd as __vue_create_injector__ } from './index-25088451.js';
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
import { F as FluroContentEditMixin } from './FluroContentEditMixin-ef8d776d.js';
import { F as FluroAssetEditMixin } from './FluroAssetEditMixin-b82b52ff.js';

//

var script = {
  components: {
    FluroEditor: FluroCodeEditor
  },

  created() {},

  mixins: [FluroContentEditMixin, FluroAssetEditMixin],
  computed: {
    fieldsOutput() {
      var array = []; ///////////////////////////////////

      addField('title', {
        title: 'Title',
        minimum: 1,
        maximum: 1,
        type: 'string'
      });
      addField('firstLine', {
        title: 'Short Description',
        minimum: 0,
        maximum: 1,
        type: 'string',
        placeholder: 'Optional short description describing the collection'
      });
      addField('assetType', {
        title: 'Asset Type',
        minimum: 1,
        maximum: 1,
        type: 'string',
        directive: 'select',
        options: [{
          name: 'SoundCloud',
          value: 'soundcloud'
        }, {
          name: 'Upload / Hosted',
          value: 'upload'
        }] // params: {
        //     restrictType: 'ticket',
        // },

      });
      addField('external', {
        type: 'group',
        minimum: 0,
        maximum: 1,
        asObject: true,
        fields: [{
          key: 'soundcloud',
          title: 'SoundCloud URL',
          minimum: 0,
          maximum: 1,
          type: 'string'
        }]
      }); ///////////////////////////////////

      function addField(key, details) {
        details.key = key;
        array.push(details);
      }

      return array;
    },

    isSoundCloud() {
      var self = this;

      var assetType = _.get(self.model, 'assetType');

      return assetType == 'soundcloud';
    },

    isUpload() {
      var self = this;

      var assetType = _.get(self.model, 'assetType');

      return assetType == 'upload';
    },

    soundCloudURL() {
      var self = this;
      return _.get(self.model, 'external.soundcloud');
    }

  },
  methods: {
    assetReplaced(model) {
      this.cacheKey = Math.random();
      this.replace = false;
    }

  },

  data() {
    return {
      cacheKey: 0,
      replace: false
    };
  }

};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flex-column',[(_vm.loading)?[_c('fluro-page-preloader',{attrs:{"contain":""}})]:[_c('tabset',{attrs:{"justified":true,"vertical":true}},[_c('tab',{attrs:{"heading":"Details"}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',{attrs:{"fluid":""}},[_c('constrain',{attrs:{"sm":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.title},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),(!_vm.model.assetType)?_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.assetType},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}):_vm._e(),_vm._v(" "),(_vm.isSoundCloud)?_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.external},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}):_vm._e(),_vm._v(" "),(_vm.isSoundCloud)?_c('iframe',{attrs:{"width":"100%","height":"166","scrolling":"no","frameborder":"no","allow":"autoplay","src":("https://w.soundcloud.com/player/?url=" + _vm.soundCloudURL)}}):_vm._e(),_vm._v(" "),(_vm.isUpload)?_c('div',[(_vm.model._id)?[(_vm.replace)?[_c('asset-replace-upload',{on:{"input":_vm.assetReplaced},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})]:[_c('v-layout',[_c('v-flex',[_c('v-input',{staticClass:"no-flex"},[_c('v-label',[_vm._v("Asset File")]),_vm._v(" "),_c('div',[_vm._v(_vm._s(_vm.model.filename))]),_vm._v(" "),_c('div',[_c('v-btn',{staticClass:"ma-0",on:{"click":function($event){_vm.replace = true;}}},[_vm._v("\n                                                            Replace with a new file\n                                                            "),_c('fluro-icon',{attrs:{"right":"","library":"fas","icon":"cloud-upload"}})],1)],1)],1)],1)],1)]]:[_c('asset-replace-upload',{on:{"file":_vm.fileSelected},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})]],2):_vm._e(),_vm._v(" "),_c('v-input',{staticClass:"no-flex pt-2",attrs:{"label":"Body"}},[_c('fluro-editor',{attrs:{"placeholder":"Type your text in here"},model:{value:(_vm.model.body),callback:function ($$v) {_vm.$set(_vm.model, "body", $$v);},expression:"model.body"}})],1),_vm._v(" "),_c('fluro-privacy-select',{model:{value:(_vm.model.privacy),callback:function ($$v) {_vm.$set(_vm.model, "privacy", $$v);},expression:"model.privacy"}})],1)],1)],1)],1),_vm._v(" "),(_vm.definition && _vm.definition.fields && _vm.definition.fields.length)?_c('tab',{attrs:{"heading":((_vm.definition.title) + " Information")}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',{attrs:{"fluid":""}},[_c('constrain',{attrs:{"sm":""}},[_c('fluro-content-form',{attrs:{"options":_vm.options,"fields":_vm.definition.fields},model:{value:(_vm.model.data),callback:function ($$v) {_vm.$set(_vm.model, "data", $$v);},expression:"model.data"}})],1)],1)],1)],1):_vm._e()],1)]],2)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-1af4798a_0", { source: ".border-top{border-top:1px solid rgba(0,0,0,.05)}.border-right{border-right:1px solid rgba(0,0,0,.05)}.border-bottom{border-bottom:1px solid rgba(0,0,0,.05)}.border-left{border-left:1px solid rgba(0,0,0,.05)}.media-preview{background:#eee;display:block;min-height:350px;margin-bottom:15px;border:1px solid rgba(0,0,0,.1);border-radius:5px;overflow:hidden}.media-preview .media-preview-wrap{max-width:750px;margin:auto}", map: undefined, media: undefined })
,inject("data-v-1af4798a_1", { source: ".border-top[data-v-1af4798a]{border-top:1px solid rgba(0,0,0,.05)}.border-right[data-v-1af4798a]{border-right:1px solid rgba(0,0,0,.05)}.border-bottom[data-v-1af4798a]{border-bottom:1px solid rgba(0,0,0,.05)}.border-left[data-v-1af4798a]{border-left:1px solid rgba(0,0,0,.05)}.color-swatch[data-v-1af4798a]{width:36px;height:36px;border-radius:3px;margin:0 1px 1px 0;display:inline-block}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-1af4798a";
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
//# sourceMappingURL=audio-823896a1.js.map
