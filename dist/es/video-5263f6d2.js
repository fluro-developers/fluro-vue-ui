
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { bl as __vue_normalize__, bm as __vue_create_injector__ } from './index-802239cf.js';
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
import { F as FluroContentViewMixin } from './FluroContentViewMixin-a0c59adc.js';
import { F as FluroDefinedList } from './FluroDefinedList-0103d00c.js';

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
            "constrain",
            { attrs: { sm: "" } },
            [
              _c(
                "v-container",
                { attrs: { "py-0": "" } },
                [_c("fluro-video", { attrs: { item: _vm.item } })],
                1
              ),
              _vm._v(" "),
              _vm.item.assetType == "upload"
                ? _c(
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
                                href: _vm.linkURL,
                                target: "_blank"
                              }
                            },
                            [
                              _vm._v(
                                "\n                        Link\n                        "
                              ),
                              _c("fluro-icon", {
                                attrs: { right: "", icon: "link" }
                              })
                            ],
                            1
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
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
                                "\n                        Download\n                        "
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
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.item.body && _vm.item.body.length
                ? [
                    _c("div", {
                      domProps: { innerHTML: _vm._s(_vm.item.body) }
                    })
                  ]
                : _vm._e(),
              _vm._v(" "),
              _vm.fields && _vm.fields.length
                ? [
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
    ],
    1
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-9bcf8004_0", { source: "/**/\n.border-top[data-v-9bcf8004] {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right[data-v-9bcf8004] {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom[data-v-9bcf8004] {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left[data-v-9bcf8004] {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n\n/*# sourceMappingURL=video.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/view/panels/video.vue","video.vue"],"names":[],"mappings":"AA+EA,GAAA;AAYA;EACA,yCAAA;ACzFA;AD4FA;EACA,2CAAA;ACzFA;AD4FA;EACA,4CAAA;ACzFA;AD4FA;EACA,0CAAA;ACzFA;;ADiGA,GAAA;;AC7FA,oCAAoC","file":"video.vue","sourcesContent":["<template>\n    <flex-column>\n        <flex-column-body>\n            <constrain sm>\n                <v-container py-0>\n                <fluro-video :item=\"item\" />\n            </v-container>\n                <v-layout v-if=\"item.assetType == 'upload'\">\n                    <v-flex>\n                        <v-btn large block color=\"#eee\" :href=\"linkURL\" target=\"_blank\">\n                            Link\n                            <fluro-icon right icon=\"link\" />\n                        </v-btn>\n                    </v-flex>\n                    <v-flex>\n                        <v-btn large block color=\"#eee\" :href=\"downloadURL\" target=\"_blank\">\n                            Download\n                            <fluro-icon right icon=\"cloud-download\" />\n                        </v-btn>\n                    </v-flex>\n                </v-layout>\n                <template v-if=\"item.body && item.body.length\">\n                    <div v-html=\"item.body\"></div>\n                </template>\n                <template v-if=\"fields && fields.length\">\n                    <fluro-content-render :fields=\"fields\" v-model=\"item.data\" />\n                </template>\n            </constrain>\n        </flex-column-body>\n    </flex-column>\n</template>\n<script>\n/////////////////////////////////\n\nimport Vue from 'vue';\n\nimport FluroContentViewMixin from 'src/components/content/view/FluroContentViewMixin.js';\nimport FluroDefinedList from 'src/components/FluroDefinedList.vue';\n\n/////////////////////////////////\n\nexport default {\n    props: {\n        config: {\n            type: Object,\n            required: true,\n        },\n        item: {\n            type: Object,\n            required: true,\n        },\n    },\n    components: {\n        FluroDefinedList,\n    },\n    mixins: [FluroContentViewMixin],\n    methods: {\n        quickOpen(item) {\n            console.log('Open', item)\n            this.$actions.open([item]);\n        }\n    },\n    computed: {\n        linkURL() {\n            return this.$fluro.asset.getUrl(this.item, { format: this.item.extension, filename: this.item.filename })\n        },\n        downloadURL() {\n            return this.$fluro.asset.downloadUrl(this.item)\n        },\n\n\n    },\n    data() {\n        return {}\n    },\n}\n</script>\n<style scoped lang=\"scss\">\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n\n/*# sourceMappingURL=video.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-9bcf8004";
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
//# sourceMappingURL=video-5263f6d2.js.map
