
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { bn as _, bl as __vue_normalize__, bm as __vue_create_injector__ } from './index-5891cbd1.js';
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
import { F as FluroContentViewMixin } from './FluroContentViewMixin-84de1ab5.js';

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
  mixins: [FluroContentViewMixin],
  methods: {},
  computed: {
    grouped() {
      var self = this;
      return _.chain(self.item.items).orderBy(function (item) {
        return item.title;
      }).reduce(function (set, item) {
        var type = item.definition || item._type;
        var existing = set[type];

        if (!existing) {
          existing = set[type] = {
            title: self.$fluro.types.readable(type, true),
            items: []
          };
        }

        existing.items.push(item);
        return set;
      }, {}).values().orderBy(function (group) {
        return group.title;
      }).value();
    },

    data() {
      return this.item.data || {};
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
              _vm.fields
                ? _c(
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
                : _vm._e(),
              _vm._v(" "),
              _vm._l(_vm.grouped, function(group) {
                return _c(
                  "v-container",
                  { staticClass: "pin-group" },
                  [
                    _c("h4", [_vm._v(_vm._s(group.title))]),
                    _vm._v(" "),
                    _c(
                      "fluro-card",
                      _vm._l(group.items, function(item) {
                        return _c("fluro-list-item", {
                          key: item._id,
                          attrs: { bordered: true, item: item },
                          nativeOn: {
                            click: function($event) {
                              return _vm.clicked(item)
                            }
                          }
                        })
                      }),
                      1
                    )
                  ],
                  1
                )
              })
            ],
            2
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
    inject("data-v-8582d028_0", { source: "/**/\n.border-top[data-v-8582d028] {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right[data-v-8582d028] {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom[data-v-8582d028] {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left[data-v-8582d028] {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n\n/*# sourceMappingURL=collection.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/view/panels/collection.vue","collection.vue"],"names":[],"mappings":"AAgGA,GAAA;AAYA;EACA,yCAAA;AC1GA;AD6GA;EACA,2CAAA;AC1GA;AD6GA;EACA,4CAAA;AC1GA;AD6GA;EACA,0CAAA;AC1GA;;ADkHA,GAAA;;AC9GA,yCAAyC","file":"collection.vue","sourcesContent":["<template>\n    <flex-column-body>\n        <v-container fluid>\n            <constrain sm>\n                <!-- <h1>{{item.title}}</h1> -->\n                <!-- <pre>{{item}}</pre> -->\n                <!-- -->\n                <!-- <pre>{{collection}}</pre> -->\n                <v-container v-if=\"fields\">\n                    <fluro-content-render :fields=\"fields\" v-model=\"item.data\" /> \n                </v-container>\n                <v-container class=\"pin-group\" v-for=\"group in grouped\">\n                    <h4>{{group.title}}</h4>\n                    <fluro-card>\n                        <fluro-list-item @click.native=\"clicked(item)\" :key=\"item._id\" :bordered=\"true\" :item=\"item\" v-for=\"item in group.items\">\n                            <!-- <template v-slot:actions> -->\n                            <!-- <div class=\"item-actions\"> -->\n                            <!-- <v-btn class=\"ma-0\" small icon v-tippy content=\"Remove Pin\" @click.stop.prevent=\"pinStore.unset(item._id)\"> -->\n                            <!-- <fluro-icon icon=\"times\" /> -->\n                            <!-- </v-btn> -->\n                            <!-- <v-btn class=\"ma-0\" small icon v-tippy content=\"More Options\" @click.stop.prevent=\"$actions.open([item])\"> -->\n                            <!-- <fluro-icon icon=\"ellipsis-h\" /> -->\n                            <!-- </v-btn> -->\n                            <!-- </div> -->\n                            <!-- </template> -->\n                        </fluro-list-item>\n                        <!-- <pre>{{group}}</pre> -->\n                    </fluro-card>\n                </v-container>\n            </constrain>\n        </v-container>\n    </flex-column-body>\n</template>\n<script>\n/////////////////////////////////\n\nimport Vue from 'vue';\nimport FluroContentViewMixin from 'src/components/content/view/FluroContentViewMixin.js';\nimport _ from 'lodash';\n\n/////////////////////////////////\n\nexport default {\n    props: {\n        config: {\n            type: Object,\n            required: true,\n        },\n        item: {\n            type: Object,\n            required: true,\n        },\n    },\n    mixins: [FluroContentViewMixin],\n    methods: {},\n    computed: {\n        grouped() {\n            var self = this;\n\n            return _.chain(self.item.items)\n                .orderBy(function(item) {\n                    return item.title;\n                })\n                .reduce(function(set, item) {\n\n                    var type = item.definition || item._type;\n                    var existing = set[type];\n                    if (!existing) {\n                        existing =\n                            set[type] = {\n                                title: self.$fluro.types.readable(type, true),\n                                items: [],\n                            }\n                    }\n\n                    existing.items.push(item);\n\n                    return set;\n                }, {})\n                .values()\n                .orderBy(function(group) {\n                    return group.title;\n                })\n                .value();\n        },\n        data() {\n            return this.item.data || {}\n        },\n    },\n    data() {\n        return {}\n    },\n}\n</script>\n<style scoped lang=\"scss\">\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n\n/*# sourceMappingURL=collection.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-8582d028";
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
//# sourceMappingURL=collection-2380ee11.js.map
