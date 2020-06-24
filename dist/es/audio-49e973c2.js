<<<<<<< HEAD:dist/es/asset-5d0fb809.js
import { ah as FluroContentRender, bf as __vue_normalize__, bg as __vue_create_injector__ } from './index-204ee3c0.js';
=======
import { ai as FluroContentRender, bg as __vue_normalize__, bh as __vue_create_injector__ } from './index-8d7f8f94.js';
>>>>>>> e97e30815b0dc9fa78df2edbb47266484ec56bb6:dist/es/audio-49e973c2.js
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
<<<<<<< HEAD:dist/es/asset-5d0fb809.js
import { F as FluroContentViewMixin } from './FluroContentViewMixin-8f5a872d.js';
import { F as FluroDefinedList } from './FluroDefinedList-11f4773d.js';
=======
import { F as FluroContentViewMixin } from './FluroContentViewMixin-4f8a6b3e.js';
import { F as FluroDefinedList } from './FluroDefinedList-cd19858b.js';
>>>>>>> e97e30815b0dc9fa78df2edbb47266484ec56bb6:dist/es/audio-49e973c2.js

//

var script = {
  props: {
    config: {
      type: Object,
      required: true
    },
    item: {
      type: Object,
      required: true
    }
  },
  components: {
    FluroContentRender,
    FluroDefinedList
  },
  mixins: [FluroContentViewMixin],
  methods: {
    quickOpen(item) {
      console.log('Open', item);
      this.$actions.open([item]);
    }

  },
  computed: {
    linkURL() {
      return this.$fluro.asset.getUrl(this.item, {
        format: this.item.extension,
        filename: this.item.filename
      });
    },

    downloadURL() {
      return this.$fluro.asset.downloadUrl(this.item);
    },

    data() {
      return this.item.data || {};
    },

    definition() {
      return this.config.definition;
    },

    fields() {
      if (this.definition) {
        return this.config.definition.fields;
      }
    }

  },

  data() {
    return {};
  }

};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flex-column-body',[_c('v-container',{attrs:{"grid-list-xl":""}},[_c('v-layout',[_c('v-flex',[_c('v-btn',{attrs:{"large":"","block":"","color":"#eee","href":_vm.downloadURL,"target":"_blank"}},[_vm._v("\n                    Download\n                    "),_c('fluro-icon',{attrs:{"right":"","icon":"cloud-download"}})],1)],1)],1),_vm._v(" "),_c('v-input',{staticClass:"no-flex"},[_c('v-label',[_vm._v("Filename")]),_vm._v(" "),_c('div',[_vm._v(_vm._s(_vm.item.filename))])],1),_vm._v(" "),_c('v-layout',[_c('v-flex',{attrs:{"xs12":"","sm4":""}},[_c('fluro-defined-list',{attrs:{"items":_vm.item.realms,"type":"realm"},on:{"click":_vm.quickOpen}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm4":""}},[_c('fluro-defined-list',{attrs:{"items":_vm.item.tags,"type":"tag"},on:{"click":_vm.quickOpen}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm4":""}},[_c('v-input',{staticClass:"no-flex"},[_c('v-label',[_vm._v("File Size")]),_vm._v(" "),_c('div',[_vm._v(_vm._s(_vm._f("filesize")(_vm.item.filesize)))])],1),_vm._v(" "),(_vm.item.colors && _vm.item.colors.length)?_c('v-input',{staticClass:"no-flex",attrs:{"label":"Main Colors"}},[_c('div',_vm._l((_vm.item.colors),function(color){return _c('div',{directives:[{name:"tippy",rawName:"v-tippy"}],staticClass:"color-swatch",style:({backgroundColor:color}),attrs:{"content":color}})}),0)]):_vm._e()],1)],1),_vm._v(" "),(_vm.fields && _vm.fields.length)?[_c('h5',[_vm._v(_vm._s(_vm.definition.title)+" information")]),_vm._v(" "),_c('fluro-content-render',{attrs:{"fields":_vm.fields},model:{value:(_vm.item.data),callback:function ($$v) {_vm.$set(_vm.item, "data", $$v);},expression:"item.data"}})]:_vm._e()],2)],1)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-661ac747_0", { source: ".border-top[data-v-661ac747]{border-top:1px solid rgba(0,0,0,.05)}.border-right[data-v-661ac747]{border-right:1px solid rgba(0,0,0,.05)}.border-bottom[data-v-661ac747]{border-bottom:1px solid rgba(0,0,0,.05)}.border-left[data-v-661ac747]{border-left:1px solid rgba(0,0,0,.05)}.image-holder[data-v-661ac747]{background:#111;max-height:50vh;overflow:hidden;display:flex}.color-swatch[data-v-661ac747]{width:36px;height:36px;border-radius:3px;margin:0 1px 1px 0;display:inline-block}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-661ac747";
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
<<<<<<< HEAD:dist/es/asset-5d0fb809.js
//# sourceMappingURL=asset-5d0fb809.js.map
=======
//# sourceMappingURL=audio-49e973c2.js.map
>>>>>>> e97e30815b0dc9fa78df2edbb47266484ec56bb6:dist/es/audio-49e973c2.js
