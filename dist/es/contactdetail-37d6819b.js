
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { bm as __vue_normalize__, bn as __vue_create_injector__ } from './index-6bb61ed0.js';
import 'vue-range-slider';
import 'vue-range-slider/dist/vue-range-slider.css';
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
import 'moment';
import { F as FluroContentViewMixin } from './FluroContentViewMixin-ef4a5e80.js';

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
  //  FluroContentRender,
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

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "flex-column-body",
    [
      _c(
        "v-container",
        { attrs: { fluid: "" } },
        [
          _c(
            "constrain",
            { attrs: { sm: "" } },
            [
              _c("h1", [_vm._v(_vm._s(_vm.item.title))]),
              _vm._v(" "),
              _c("fluro-content-render", {
                attrs: { fields: _vm.mainFields },
                model: {
                  value: _vm.item,
                  callback: function($$v) {
                    _vm.item = $$v;
                  },
                  expression: "item"
                }
              }),
              _vm._v(" "),
              _c("fluro-content-render", {
                attrs: { fields: _vm.definedFields },
                model: {
                  value: _vm.item.data,
                  callback: function($$v) {
                    _vm.$set(_vm.item, "data", $$v);
                  },
                  expression: "item.data"
                }
              })
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-d9ad8e08_0", { source: "/**/\n.border-top[data-v-d9ad8e08] {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right[data-v-d9ad8e08] {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom[data-v-d9ad8e08] {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left[data-v-d9ad8e08] {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n\n/*# sourceMappingURL=contactdetail.vue.map */", map: {"version":3,"sources":["C:\\Users\\User\\Documents\\fluro\\fluro-vue-ui\\src\\components\\content\\view\\panels\\contactdetail.vue","contactdetail.vue"],"names":[],"mappings":"AAqEA,GAAA;AAYA;EACA,yCAAA;AC/EA;ADkFA;EACA,2CAAA;AC/EA;ADkFA;EACA,4CAAA;AC/EA;ADkFA;EACA,0CAAA;AC/EA;;ADuFA,GAAA;;ACnFA,4CAA4C","file":"contactdetail.vue","sourcesContent":["<template>\n\t<flex-column-body>\n\t\t<v-container fluid>\n\t\t\t<constrain sm>\n\t\t\t\t<h1>{{item.title}}</h1>\n\t\t\t\t<fluro-content-render :fields=\"mainFields\" v-model=\"item\" />\n\t\t\t\t<fluro-content-render :fields=\"definedFields\" v-model=\"item.data\" />\n\t\t\t</constrain>\n\t\t</v-container>\n\t</flex-column-body>\n</template>\n<script>\n/////////////////////////////////\n\nimport Vue from 'vue';\nimport FluroContentViewMixin from 'src/components/content/view/FluroContentViewMixin.js';\n// import FluroContentRender from 'src/components/FluroContentRender.vue';\n\n/////////////////////////////////\n\nexport default {\n\tprops: {\n\t\tconfig: {\n\t\t\ttype: Object,\n\t\t\trequired: true,\n\t\t},\n\t\titem: {\n\t\t\ttype: Object,\n\t\t\trequired: true,\n\t\t},\n\t},\n\t// components: {\n\t//  FluroContentRender,\n\t// },\n\tmixins: [FluroContentViewMixin],\n\tmethods: {},\n\tcomputed: {\n\t\tmainFields() {\n\n\t\t\tvar array = [];\n\n\t\t\tarray.push({\n\t\t\t\ttitle: 'Contact',\n\t\t\t\tkey: 'contact',\n\t\t\t\ttype: 'reference',\n\t\t\t\tminimum: 1,\n\t\t\t\tmaximum: 1,\n\t\t\t\tparams: {\n\t\t\t\t\trestrictType: 'contact',\n\t\t\t\t}\n\t\t\t})\n\n\t\t\treturn array;\n\t\t},\n\t\tdata() {\n\t\t\treturn this.item.data || {}\n\t\t},\n\t\tdefinedFields() {\n\t\t\treturn this.definition ? this.definition.fields : null;\n\t\t}\n\t},\n\tdata() {\n\t\treturn {}\n\t},\n}\n\n</script>\n<style scoped lang=\"scss\">\n\n/**/\r\n\r\n$primary: #2ad4b9;//#0bd6be;\r\n$success: #4cc650; //#4cc673;//\r\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\r\n$danger: #d93e63;\r\n$secondary: #0bd6cd; //#0bd6a3;\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n\r\n.border-top {\r\n    border-top: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-right {\r\n    border-right: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-bottom {\r\n    border-bottom: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-left {\r\n    border-left: 1px solid rgba(#000, 0.05);\r\n}\r\n//////////////////////////////////////////\r\n\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n/**/\n</style>\n","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n\n/*# sourceMappingURL=contactdetail.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-d9ad8e08";
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
//# sourceMappingURL=contactdetail-37d6819b.js.map
