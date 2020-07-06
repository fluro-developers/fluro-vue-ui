
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { bm as __vue_normalize__, bn as __vue_create_injector__ } from './index-6e4de678.js';
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
import 'moment';
import { F as FluroContentViewMixin } from './FluroContentViewMixin-c1df7261.js';

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

    fields() {
      return this.config.definition.fields;
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
    "flex-column",
    [
      _c(
        "flex-column-body",
        [
          _c(
            "v-container",
            [
              _c("fluro-content-render", {
                attrs: { fields: _vm.fields },
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
    inject("data-v-54bb47a7_0", { source: "/**/\n.border-top[data-v-54bb47a7] {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right[data-v-54bb47a7] {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom[data-v-54bb47a7] {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left[data-v-54bb47a7] {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n\n/*# sourceMappingURL=post.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/view/panels/post.vue","post.vue"],"names":[],"mappings":"AAmDA,GAAA;AAYA;EACA,yCAAA;AC7DA;ADgEA;EACA,2CAAA;AC7DA;ADgEA;EACA,4CAAA;AC7DA;ADgEA;EACA,0CAAA;AC7DA;;ADqEA,GAAA;;ACjEA,mCAAmC","file":"post.vue","sourcesContent":["<template>\n    <flex-column>\n        <flex-column-body>\n            <v-container>\n                <!-- TEST WOOT WOOT -->\n                <fluro-content-render :fields=\"fields\" v-model=\"item.data\" />\n                <!-- <pre>{{fields}}</pre> -->\n            </v-container>\n        </flex-column-body>\n    </flex-column>\n</template>\n<script>\n/////////////////////////////////\n\nimport Vue from 'vue';\n\nimport FluroContentViewMixin from 'src/components/content/view/FluroContentViewMixin.js';\n\n/////////////////////////////////\n\nexport default {\n    props: {\n        config: {\n            type: Object,\n            required: true,\n        },\n        item: {\n            type: Object,\n            required: true,\n        },\n    },\n    components: {\n    },\n    mixins: [FluroContentViewMixin],\n    methods: {},\n    computed: {\n        data() {\n            return this.item.data || {}\n        },\n        fields() {\n            return this.config.definition.fields;\n        }\n    },\n    data() {\n        return {}\n    },\n    \n}\n</script>\n<style scoped lang=\"scss\">\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n\n/*# sourceMappingURL=post.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-54bb47a7";
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
//# sourceMappingURL=post-2de24f1a.js.map
