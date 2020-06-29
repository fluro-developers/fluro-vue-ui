
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { bn as _, bl as __vue_normalize__, bm as __vue_create_injector__ } from './index-96028b6b.js';

//

var script = {
  props: {
    'label': {
      type: String
    },
    'type': {
      type: String,

      default() {
        return 'item';
      }

    },
    'items': {
      type: Array
    }
  },
  methods: {
    clicked(item) {
      this.$emit('click', item);
    }

  },
  computed: {
    grouped() {
      var self = this;
      var mapped = self.$fluro.types.mapDefinitionItems(_.orderBy(self.items, 'title'), self.type);
      return mapped;
    }

  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.grouped && _vm.grouped.length
    ? _c(
        "div",
        { staticClass: "fluro-defined-list" },
        _vm._l(_vm.grouped, function(group) {
          return _c(
            "v-input",
            { staticClass: "no-flex" },
            [
              _c("v-label", [_vm._v(_vm._s(group.plural))]),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "inline-tags" },
                _vm._l(group.entries, function(entry) {
                  return _c(
                    "a",
                    {
                      staticClass: "inline-tag",
                      style: {
                        backgroundColor: entry.bgColor,
                        color: entry.color
                      },
                      on: {
                        click: function($event) {
                          return _vm.clicked(entry)
                        }
                      }
                    },
                    [
                      _vm.type
                        ? _c("fluro-icon", { attrs: { type: _vm.type } })
                        : _vm._e(),
                      _vm._v(" " + _vm._s(entry.title) + "\n            ")
                    ],
                    1
                  )
                }),
                0
              )
            ],
            1
          )
        }),
        1
      )
    : _vm._e()
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-9b327bc8_0", { source: "/**/\n.border-top[data-v-9b327bc8] {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right[data-v-9b327bc8] {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom[data-v-9b327bc8] {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left[data-v-9b327bc8] {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.fluro-content-render[data-v-9b327bc8] {\n  flex: 1;\n}\n\n/*# sourceMappingURL=FluroDefinedList.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/FluroDefinedList.vue","FluroDefinedList.vue"],"names":[],"mappings":"AAsDA,GAAA;AAYA;EACA,yCAAA;AChEA;ADmEA;EACA,2CAAA;AChEA;ADmEA;EACA,4CAAA;AChEA;ADmEA;EACA,0CAAA;AChEA;;ADwEA,GAAA;AAGA;EACA,OAAA;ACvEA;;AAEA,+CAA+C","file":"FluroDefinedList.vue","sourcesContent":["<template>\n    <div class=\"fluro-defined-list\" v-if=\"grouped && grouped.length\">\n        <v-input v-for=\"group in grouped\" class=\"no-flex\">\n            <v-label>{{group.plural}}</v-label>\n            <!-- <pre>{{group}}</pre> -->\n            <div class=\"inline-tags\">\n                <a class=\"inline-tag\" :style=\"{backgroundColor:entry.bgColor, color:entry.color}\" @click=\"clicked(entry)\" v-for=\"entry in group.entries\">\n                    <fluro-icon :type=\"type\" v-if=\"type\"/> {{entry.title}}\n                </a>\n            </div>\n        </v-input>\n    </div>\n</template>\n<script>\n\nimport _ from 'lodash';\n\n//////////////////////////////////////////////////\n\nexport default {\n    props: {\n        'label':{\n            type:String,\n        },\n        'type':{\n            type:String,\n            default() {\n                return 'item';\n            },\n        },\n        'items': {\n            type: Array,\n        },\n    },\n    methods:{\n        clicked(item) {\n            this.$emit('click', item);\n        }\n    },\n    computed:{\n        grouped() {\n            var self = this;\n            var mapped = self.$fluro.types.mapDefinitionItems(_.orderBy(self.items, 'title'), self.type);\n\n            \n            return mapped;\n        }\n\n\n    }\n}\n</script>\n<style scoped lang=\"scss\">\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n.fluro-content-form {}\n\n.fluro-content-render {\n    flex: 1;\n}\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.fluro-content-render {\n  flex: 1;\n}\n\n/*# sourceMappingURL=FluroDefinedList.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-9b327bc8";
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

export { __vue_component__ as F };
//# sourceMappingURL=FluroDefinedList-ebdbeb23.js.map
