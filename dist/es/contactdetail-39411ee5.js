import { bf as styleInject, bg as __vue_normalize__ } from './index-83d7f2e4.js';
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
import { F as FluroContentViewMixin } from './FluroContentViewMixin-26abdc41.js';

//
/////////////////////////////////

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
  // components: {
  //     FluroContentRender,
  // },
  mixins: [FluroContentViewMixin],
  methods: {},
  computed: {
    mainFields() {
      var array = [];
      array.push({
        title: 'Contact',
        key: 'contact',
        type: 'reference',
        minimum: 1,
        maximum: 1,
        params: {
          restrictType: 'contact'
        }
      });
      return array;
    },

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

var css_248z = ".border-top[data-v-74c37cf8]{border-top:1px solid rgba(0,0,0,.05)}.border-right[data-v-74c37cf8]{border-right:1px solid rgba(0,0,0,.05)}.border-bottom[data-v-74c37cf8]{border-bottom:1px solid rgba(0,0,0,.05)}.border-left[data-v-74c37cf8]{border-left:1px solid rgba(0,0,0,.05)}";
styleInject(css_248z);

/* script */
const __vue_script__ = script;
/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flex-column-body',[_c('v-container',{attrs:{"fluid":""}},[_c('constrain',{attrs:{"sm":""}},[_c('h1',[_vm._v(_vm._s(_vm.item.title))]),_vm._v(" "),_c('fluro-content-render',{attrs:{"fields":_vm.mainFields},model:{value:(_vm.item),callback:function ($$v) {_vm.item=$$v;},expression:"item"}}),_vm._v(" "),_c('fluro-content-render',{attrs:{"fields":_vm.definedFields},model:{value:(_vm.item.data),callback:function ($$v) {_vm.$set(_vm.item, "data", $$v);},expression:"item.data"}})],1)],1)],1)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = "data-v-74c37cf8";
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
//# sourceMappingURL=contactdetail-39411ee5.js.map