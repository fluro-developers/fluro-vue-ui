
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { ak as FluroContentRender, bm as __vue_normalize__, bn as __vue_create_injector__ } from './index-124ecf58.js';
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
import { F as FluroContentViewMixin } from './FluroContentViewMixin-42783967.js';
import { F as FluroDefinedList } from './FluroDefinedList-c9d09357.js';

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
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "flex-column-body",
    [
      _c(
        "v-container",
        { attrs: { "grid-list-xl": "" } },
        [
          _c(
            "v-layout",
            [
              _c(
                "v-flex",
                [
                  _c(
                    "v-btn",
                    {
                      attrs: {
                        large: "",
                        block: "",
                        color: "#eee",
                        href: _vm.downloadURL,
                        target: "_blank"
                      }
                    },
                    [
                      _vm._v(
                        "\n                    Download\n                    "
                      ),
                      _c("fluro-icon", {
                        attrs: { right: "", icon: "cloud-download" }
                      })
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-input",
            { staticClass: "no-flex" },
            [
              _c("v-label", [_vm._v("Filename")]),
              _vm._v(" "),
              _c("div", [_vm._v(_vm._s(_vm.item.filename))])
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-layout",
            [
              _c(
                "v-flex",
                { attrs: { xs12: "", sm4: "" } },
                [
                  _c("fluro-defined-list", {
                    attrs: { items: _vm.item.realms, type: "realm" },
                    on: { click: _vm.quickOpen }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-flex",
                { attrs: { xs12: "", sm4: "" } },
                [
                  _c("fluro-defined-list", {
                    attrs: { items: _vm.item.tags, type: "tag" },
                    on: { click: _vm.quickOpen }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-flex",
                { attrs: { xs12: "", sm4: "" } },
                [
                  _c(
                    "v-input",
                    { staticClass: "no-flex" },
                    [
                      _c("v-label", [_vm._v("File Size")]),
                      _vm._v(" "),
                      _c("div", [
                        _vm._v(_vm._s(_vm._f("filesize")(_vm.item.filesize)))
                      ])
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _vm.item.colors && _vm.item.colors.length
                    ? _c(
                        "v-input",
                        {
                          staticClass: "no-flex",
                          attrs: { label: "Main Colors" }
                        },
                        [
                          _c(
                            "div",
                            _vm._l(_vm.item.colors, function(color) {
                              return _c("div", {
                                directives: [
                                  { name: "tippy", rawName: "v-tippy" }
                                ],
                                staticClass: "color-swatch",
                                style: { backgroundColor: color },
                                attrs: { content: color }
                              })
                            }),
                            0
                          )
                        ]
                      )
                    : _vm._e()
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _vm.fields && _vm.fields.length
            ? [
                _c("h5", [
                  _vm._v(_vm._s(_vm.definition.title) + " information")
                ]),
                _vm._v(" "),
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
              ]
            : _vm._e()
        ],
        2
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
    inject("data-v-1c242972_0", { source: "/**/\n.border-top[data-v-1c242972] {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right[data-v-1c242972] {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom[data-v-1c242972] {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left[data-v-1c242972] {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.image-holder[data-v-1c242972] {\n  background: #111;\n  max-height: 50vh;\n  overflow: hidden;\n  display: flex;\n}\n.color-swatch[data-v-1c242972] {\n  width: 36px;\n  height: 36px;\n  border-radius: 3px;\n  margin: 0 1px 1px 0;\n  display: inline-block;\n}\n\n/*# sourceMappingURL=asset.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/view/panels/asset.vue","asset.vue"],"names":[],"mappings":"AA8HA,GAAA;AAYA;EACA,yCAAA;ACxIA;AD2IA;EACA,2CAAA;ACxIA;AD2IA;EACA,4CAAA;ACxIA;AD2IA;EACA,0CAAA;ACxIA;;ADgJA,GAAA;AACA;EACA,gBAAA;EACA,gBAAA;EACA,gBAAA;EACA,aAAA;AC7IA;ADgJA;EACA,WAAA;EACA,YAAA;EACA,kBAAA;EACA,mBAAA;EACA,qBAAA;AC7IA;;AAEA,oCAAoC","file":"asset.vue","sourcesContent":["<template>\n    <flex-column-body>\n        <!-- :style=\"{backgroundColor:item.colors[0]}\" -->\n        <!-- <div class=\"image-holder\"> -->\n        <!-- <fluro-image :longpress=\"true\" contain :item=\"item\" :spinner=\"true\" /> -->\n        <!-- </div> -->\n        <v-container grid-list-xl>\n            <v-layout>\n                <!-- <v-flex> -->\n                <!-- <v-btn large block color=\"#eee\" :href=\"linkURL\" target=\"_blank\"> -->\n                <!-- Link -->\n                <!-- <fluro-icon right icon=\"link\" /> -->\n                <!-- </v-btn> -->\n                <!-- </v-flex> -->\n                <v-flex>\n                    <v-btn large block color=\"#eee\" :href=\"downloadURL\" target=\"_blank\">\n                        Download\n                        <fluro-icon right icon=\"cloud-download\" />\n                    </v-btn>\n                </v-flex>\n            </v-layout>\n            <v-input class=\"no-flex\">\n                <v-label>Filename</v-label>\n                <div>{{item.filename}}</div>\n            </v-input>\n            <v-layout>\n                <v-flex xs12 sm4>\n                    <!--  <v-input class=\"no-flex\">\n                        <v-label>Dimensions</v-label>\n                        <div>{{item.width}}x{{item.height}}</div>\n                    </v-input> -->\n                    <!-- <v-input class=\"no-flex\"> -->\n                    <!-- <v-label>Realms</v-label> -->\n                    <fluro-defined-list @click=\"quickOpen\" :items=\"item.realms\" type=\"realm\" />\n                    <!-- </v-input> -->\n                </v-flex>\n                <v-flex xs12 sm4>\n                    <!-- <v-input class=\"no-flex\"> -->\n                    <!-- <v-label>Tags</v-label> -->\n                    <fluro-defined-list @click=\"quickOpen\" :items=\"item.tags\" type=\"tag\" />\n                    <!-- </v-input> -->\n                </v-flex>\n                <v-flex xs12 sm4>\n                    <v-input class=\"no-flex\">\n                        <v-label>File Size</v-label>\n                        <div>{{item.filesize | filesize}}</div>\n                    </v-input>\n                    <v-input label=\"Main Colors\" v-if=\"item.colors && item.colors.length\" class=\"no-flex\">\n                        <div>\n                            <div class=\"color-swatch\" :style=\"{backgroundColor:color}\" v-tippy :content=\"color\" v-for=\"color in item.colors\" />\n                        </div>\n                    </v-input>\n                </v-flex>\n            </v-layout>\n            <template v-if=\"fields && fields.length\">\n                <h5>{{definition.title}} information</h5>\n                <fluro-content-render :fields=\"fields\" v-model=\"item.data\" />\n            </template>\n            <!-- <pre>{{fields}}</pre> -->\n        </v-container>\n    </flex-column-body>\n</template>\n<script>\n/////////////////////////////////\n\nimport Vue from 'vue';\n\nimport FluroContentViewMixin from 'src/components/content/view/FluroContentViewMixin.js';\nimport FluroContentRender from 'src/components/FluroContentRender.vue';\nimport FluroDefinedList from 'src/components/FluroDefinedList.vue';\n\n/////////////////////////////////\n\nexport default {\n    props: {\n        config: {\n            type: Object,\n            required: true,\n        },\n        item: {\n            type: Object,\n            required: true,\n        },\n    },\n    components: {\n        FluroContentRender,\n\n        FluroDefinedList,\n    },\n    mixins: [FluroContentViewMixin],\n    methods: {\n        quickOpen(item) {\n            console.log('Open', item)\n            this.$actions.open([item]);\n        }\n    },\n    computed: {\n        linkURL() {\n            return this.$fluro.asset.getUrl(this.item, { format: this.item.extension, filename: this.item.filename })\n        },\n        downloadURL() {\n            return this.$fluro.asset.downloadUrl(this.item)\n        },\n        data() {\n            return this.item.data || {}\n        },\n        definition() {\n            return this.config.definition;\n        },\n        fields() {\n\n            if (this.definition) {\n\n\n                return this.config.definition.fields;\n            }\n        }\n\n    },\n    data() {\n        return {}\n    },\n}\n</script>\n<style scoped lang=\"scss\">\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n.image-holder {\n    background: #111;\n    max-height: 50vh;\n    overflow: hidden;\n    display: flex;\n}\n\n.color-swatch {\n    width: 36px;\n    height: 36px;\n    border-radius: 3px;\n    margin: 0 1px 1px 0;\n    display: inline-block;\n}\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.image-holder {\n  background: #111;\n  max-height: 50vh;\n  overflow: hidden;\n  display: flex;\n}\n\n.color-swatch {\n  width: 36px;\n  height: 36px;\n  border-radius: 3px;\n  margin: 0 1px 1px 0;\n  display: inline-block;\n}\n\n/*# sourceMappingURL=asset.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-1c242972";
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
//# sourceMappingURL=asset-45b6cbc8.js.map
