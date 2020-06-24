<<<<<<< HEAD:dist/es/tag-11e93a2c.js
import { bf as __vue_normalize__, bg as __vue_create_injector__ } from './index-204ee3c0.js';
=======
import { bg as __vue_normalize__, bh as __vue_create_injector__ } from './index-8d7f8f94.js';
>>>>>>> e97e30815b0dc9fa78df2edbb47266484ec56bb6:dist/es/tag-a6805b76.js
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
<<<<<<< HEAD:dist/es/tag-11e93a2c.js
import { F as FluroContentViewMixin } from './FluroContentViewMixin-8f5a872d.js';
=======
import { F as FluroContentViewMixin } from './FluroContentViewMixin-4f8a6b3e.js';
>>>>>>> e97e30815b0dc9fa78df2edbb47266484ec56bb6:dist/es/tag-a6805b76.js

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
<<<<<<< HEAD:dist/es/tag-11e93a2c.js
//# sourceMappingURL=tag-11e93a2c.js.map
=======
//# sourceMappingURL=tag-a6805b76.js.map
>>>>>>> e97e30815b0dc9fa78df2edbb47266484ec56bb6:dist/es/tag-a6805b76.js
