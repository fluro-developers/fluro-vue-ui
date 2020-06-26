
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { bh as __vue_normalize__, bi as __vue_create_injector__ } from './index-dc949ab4.js';
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
import { F as FluroContentViewMixin } from './FluroContentViewMixin-ae520cfc.js';

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
    inject("data-v-423856a3_0", { source: "/**/\n.border-top[data-v-423856a3] {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right[data-v-423856a3] {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom[data-v-423856a3] {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left[data-v-423856a3] {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n\n/*# sourceMappingURL=tag.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/view/panels/tag.vue","tag.vue"],"names":[],"mappings":"AAkDA,GAAA;AAYA;EACA,yCAAA;AC5DA;AD+DA;EACA,2CAAA;AC5DA;AD+DA;EACA,4CAAA;AC5DA;AD+DA;EACA,0CAAA;AC5DA;;ADoEA,GAAA;;AChEA,kCAAkC","file":"tag.vue","sourcesContent":["<template>\n    <flex-column-body>\n    <v-container fluid>\n        <constrain sm>\n            <h1>{{item.title}}</h1>\n            <!-- <pre>{{item}}</pre> -->\n            <fluro-content-render :fields=\"definedFields\" v-model=\"item.data\" />\n            \n        </constrain>\n    </v-container>\n</flex-column-body>\n</template>\n<script>\n/////////////////////////////////\n\nimport Vue from 'vue';\nimport FluroContentViewMixin from 'src/components/content/view/FluroContentViewMixin.js';\n\n/////////////////////////////////\n\nexport default {\n    props: {\n        config: {\n            type: Object,\n            required: true,\n        },\n        item: {\n            type: Object,\n            required: true,\n        },\n    },\n    components: {\n    },\n    mixins: [FluroContentViewMixin],\n    methods: {},\n    computed: {\n        data() {\n            return this.item.data || {}\n        },\n        definedFields() {\n            return this.definition ? this.definition.fields : null;\n        }\n    },\n    data() {\n        return {}\n    },\n}\n</script>\n<style scoped lang=\"scss\">\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n\n/*# sourceMappingURL=tag.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-423856a3";
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
//# sourceMappingURL=tag-7df8ff03.js.map