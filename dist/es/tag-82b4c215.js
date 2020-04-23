import { bb as __vue_normalize__, bc as __vue_create_injector__ } from './index-f6c3de36.js';
import 'vuedraggable';
import 'vue-color';
import 'tippy.js';
import 'vue2-ace-editor';
import 'js-beautify';
import 'tiptap';
import 'tiptap-commands';
import 'tiptap-extensions';
import 'signature_pad';
import 'fluro';
import 'vuex-map-fields';
import 'async';
import { F as FluroContentViewMixin } from './FluroContentViewMixin-3eb655b6.js';

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
  components: {},
  mixins: [FluroContentViewMixin],
  methods: {},
  computed: {
    data() {
      return this.item.data || {};
    },

    definedFields() {
      return this.definition ? this.definition.fields : null;
    }

  },

  data() {
    return {};
  }

};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flex-column-body',[_c('v-container',{attrs:{"fluid":""}},[_c('constrain',{attrs:{"sm":""}},[_c('h1',[_vm._v(_vm._s(_vm.item.title))]),_vm._v(" "),_c('fluro-content-render',{attrs:{"fields":_vm.definedFields},model:{value:(_vm.item.data),callback:function ($$v) {_vm.$set(_vm.item, "data", $$v);},expression:"item.data"}})],1)],1)],1)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-620d9f24_0", { source: ".border-top[data-v-620d9f24]{border-top:1px solid rgba(0,0,0,.05)}.border-right[data-v-620d9f24]{border-right:1px solid rgba(0,0,0,.05)}.border-bottom[data-v-620d9f24]{border-bottom:1px solid rgba(0,0,0,.05)}.border-left[data-v-620d9f24]{border-left:1px solid rgba(0,0,0,.05)}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-620d9f24";
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
//# sourceMappingURL=tag-82b4c215.js.map
