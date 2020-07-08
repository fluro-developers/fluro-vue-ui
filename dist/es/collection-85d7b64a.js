
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { bo as _, bm as __vue_normalize__, bn as __vue_create_injector__ } from './index-2c6e5425.js';
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
import { F as FluroContentViewMixin } from './FluroContentViewMixin-6ea24e58.js';

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
  methods: {
    download(item) {
      var self = this;
      var url = self.$fluro.asset.downloadUrl(item);
      window.open(url);
    }

  },
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
                          attrs: { bordered: true, item: item },
                          nativeOn: {
                            click: function($event) {
                              return _vm.clicked(item)
                            }
                          },
                          scopedSlots: _vm._u(
                            [
                              {
                                key: "actions",
                                fn: function(slotProps) {
                                  return [
                                    _c(
                                      "v-btn",
                                      {
                                        directives: [
                                          { name: "tippy", rawName: "v-tippy" }
                                        ],
                                        attrs: {
                                          small: "",
                                          icon: "",
                                          content: "Download"
                                        },
                                        on: {
                                          click: function($event) {
                                            $event.stopPropagation();
                                            $event.preventDefault();
                                            return _vm.download(slotProps.item)
                                          }
                                        }
                                      },
                                      [
                                        _c("fluro-icon", {
                                          attrs: { icon: "download" }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "v-btn",
                                      {
                                        directives: [
                                          { name: "tippy", rawName: "v-tippy" }
                                        ],
                                        attrs: {
                                          small: "",
                                          icon: "",
                                          content: "More Actions"
                                        },
                                        on: {
                                          click: function($event) {
                                            $event.stopPropagation();
                                            $event.preventDefault();
                                            return _vm.$actions.open([
                                              slotProps.item
                                            ])
                                          }
                                        }
                                      },
                                      [
                                        _c("fluro-icon", {
                                          attrs: { icon: "ellipsis-h" }
                                        })
                                      ],
                                      1
                                    )
                                  ]
                                }
                              }
                            ],
                            null,
                            true
                          )
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
    inject("data-v-5e3d413a_0", { source: "/**/\n.border-top[data-v-5e3d413a] {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right[data-v-5e3d413a] {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom[data-v-5e3d413a] {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left[data-v-5e3d413a] {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n\n/*# sourceMappingURL=collection.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/view/panels/collection.vue","collection.vue"],"names":[],"mappings":"AAsHA,GAAA;AAYA;EACA,yCAAA;AChIA;ADmIA;EACA,2CAAA;AChIA;ADmIA;EACA,4CAAA;AChIA;ADmIA;EACA,0CAAA;AChIA;;ADwIA,GAAA;;ACpIA,yCAAyC","file":"collection.vue","sourcesContent":["<template>\n\t\t\t\t<flex-column-body>\n\t\t\t\t\t\t\t\t<v-container fluid>\n\t\t\t\t\t\t\t\t\t\t\t\t<constrain sm>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <h1>{{item.title}}</h1> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <pre>{{item}}</pre> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <pre>{{collection}}</pre> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-container v-if=\"fields\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-render :fields=\"fields\" v-model=\"item.data\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-container class=\"pin-group\" v-for=\"group in grouped\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h4>{{group.title}}</h4>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-card>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-list-item @click.native=\"clicked(item)\" :bordered=\"true\" :item=\"item\" v-for=\"item in group.items\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<template v-slot:actions=\"slotProps\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <pre>{{slotProps}}</pre> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-btn small icon v-tippy content=\"Download\" @click.stop.prevent=\"download(slotProps.item)\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-icon icon=\"download\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-btn>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-btn small icon v-tippy content=\"More Actions\" @click.stop.prevent=\"$actions.open([slotProps.item])\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-icon icon=\"ellipsis-h\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-btn>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-list-item>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-card>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <fluro-card> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <fluro-list-item @click.native=\"clicked(item)\" :key=\"item._id\" :bordered=\"true\" :item=\"item\" v-for=\"item in group.items\"> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <template v-slot:actions> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <div class=\"item-actions\"> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <v-btn class=\"ma-0\" small icon v-tippy content=\"Remove Pin\" @click.stop.prevent=\"pinStore.unset(item._id)\"> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <fluro-icon icon=\"times\" /> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- </v-btn> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <v-btn class=\"ma-0\" small icon v-tippy content=\"More Options\" @click.stop.prevent=\"$actions.open([item])\"> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <fluro-icon icon=\"ellipsis-h\" /> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- </v-btn> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- </div> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- </template> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- </fluro-list-item> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <pre>{{group}}</pre> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- </fluro-card> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t</constrain>\n\t\t\t\t\t\t\t\t</v-container>\n\t\t\t\t</flex-column-body>\n</template>\n<script>\n/////////////////////////////////\n\nimport Vue from 'vue';\nimport FluroContentViewMixin from 'src/components/content/view/FluroContentViewMixin.js';\nimport _ from 'lodash';\n\n/////////////////////////////////\n\nexport default {\n\t\t\t\tprops: {\n\t\t\t\t\t\t\t\tconfig: {\n\t\t\t\t\t\t\t\t\t\t\t\ttype: Object,\n\t\t\t\t\t\t\t\t\t\t\t\trequired: true,\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\titem: {\n\t\t\t\t\t\t\t\t\t\t\t\ttype: Object,\n\t\t\t\t\t\t\t\t\t\t\t\trequired: true,\n\t\t\t\t\t\t\t\t},\n\t\t\t\t},\n\t\t\t\tmixins: [FluroContentViewMixin],\n\t\t\t\tmethods: {\n\t\t\t\t\t\t\t\tdownload(item) {\n\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\t\t\t\t\t\t\t\t\t\t\t\tvar url = self.$fluro.asset.downloadUrl(item);\n\n\t\t\t\t\t\t\t\t\t\t\t\twindow.open(url);\n\n\t\t\t\t\t\t\t\t},\n\t\t\t\t},\n\t\t\t\tcomputed: {\n\t\t\t\t\t\t\t\tgrouped() {\n\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\n\t\t\t\t\t\t\t\t\t\t\t\treturn _.chain(self.item.items)\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t.orderBy(function(item) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn item.title;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t.reduce(function(set, item) {\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvar type = item.definition || item._type;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvar existing = set[type];\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tif (!existing) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\texisting =\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tset[type] = {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: self.$fluro.types.readable(type, true),\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\titems: [],\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\texisting.items.push(item);\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn set;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}, {})\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t.values()\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t.orderBy(function(group) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn group.title;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t.value();\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tdata() {\n\t\t\t\t\t\t\t\t\t\t\t\treturn this.item.data || {}\n\t\t\t\t\t\t\t\t},\n\t\t\t\t},\n\t\t\t\tdata() {\n\t\t\t\t\t\t\t\treturn {}\n\t\t\t\t},\n}\n\n</script>\n<style scoped lang=\"scss\">\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n</style>\n","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n\n/*# sourceMappingURL=collection.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-5e3d413a";
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
//# sourceMappingURL=collection-85d7b64a.js.map
