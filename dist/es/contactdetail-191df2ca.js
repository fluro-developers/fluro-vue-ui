
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { bm as __vue_normalize__, bn as __vue_create_injector__ } from './index-16ae62ad.js';
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
import { F as FluroContentEditMixin } from './FluroContentEditMixin-8da1f898.js';

//

var script = {
  mixins: [FluroContentEditMixin],
  components: {},
  methods: {
    modelUpdated() {
      this.update(this.model);
    }

  },

  created() {
  },

  asyncComputed: {},
  computed: {
    showOutline() {
      return false; //true; //false;//true;//false;//true;
    },

    fieldsOutput() {
      var array = []; ///////////////////////////////////

      addField('contact', {
        title: 'Contact',
        minimum: 1,
        maximum: 1,
        type: 'reference',
        params: {
          restrictType: 'contact'
        }
      });

      function addField(key, details) {
        details.key = key;
        array.push(details);
      }

      return array;
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
      _vm.loading
        ? [_c("fluro-page-preloader", { attrs: { contain: "" } })]
        : _c(
            "tabset",
            { attrs: { justified: true, vertical: true } },
            [
              _c(
                "tab",
                [
                  _c(
                    "flex-column-body",
                    { staticStyle: { background: "#fafafa" } },
                    [
                      _c(
                        "v-container",
                        [
                          _c("constrain", { attrs: { sm: "" } }, [
                            _c(
                              "div",
                              { staticClass: "grid-list-xl" },
                              [
                                _c("fluro-content-form-field", {
                                  attrs: {
                                    "form-fields": _vm.formFields,
                                    outline: _vm.showOutline,
                                    options: _vm.options,
                                    field: _vm.fieldHash.contact
                                  },
                                  on: { input: _vm.update },
                                  model: {
                                    value: _vm.model,
                                    callback: function($$v) {
                                      _vm.model = $$v;
                                    },
                                    expression: "model"
                                  }
                                }),
                                _vm._v(" "),
                                _vm.definition &&
                                _vm.definition.fields &&
                                _vm.definition.fields.length
                                  ? _c(
                                      "div",
                                      [
                                        _c("fluro-content-form", {
                                          attrs: {
                                            options: _vm.options,
                                            fields: _vm.definition.fields
                                          },
                                          model: {
                                            value: _vm.model.data,
                                            callback: function($$v) {
                                              _vm.$set(_vm.model, "data", $$v);
                                            },
                                            expression: "model.data"
                                          }
                                        })
                                      ],
                                      1
                                    )
                                  : _vm._e()
                              ],
                              1
                            )
                          ])
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
    ],
    2
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-391a6e72_0", { source: "/**/\n.border-top[data-v-391a6e72] {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right[data-v-391a6e72] {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom[data-v-391a6e72] {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left[data-v-391a6e72] {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.hint[data-v-391a6e72] {\n  font-size: 10px;\n  opacity: 0.5;\n  color: inherit;\n  display: block;\n}\n\n/*# sourceMappingURL=contactdetail.vue.map */", map: {"version":3,"sources":["C:\\Users\\User\\Documents\\fluro\\fluro-vue-ui\\src\\components\\content\\edit\\panels\\contactdetail.vue","contactdetail.vue"],"names":[],"mappings":"AAyFA,GAAA;AAYA;EACA,yCAAA;ACnGA;ADsGA;EACA,2CAAA;ACnGA;ADsGA;EACA,4CAAA;ACnGA;ADsGA;EACA,0CAAA;ACnGA;;AD2GA,GAAA;AACA;EACA,eAAA;EACA,YAAA;EACA,cAAA;EACA,cAAA;ACxGA;;AAEA,4CAA4C","file":"contactdetail.vue","sourcesContent":["<template>\n    <flex-column>\n        <template v-if=\"loading\">\n            <fluro-page-preloader contain />\n        </template>\n        <tabset v-else :justified=\"true\" :vertical=\"true\">\n            <tab>\n                <flex-column-body style=\"background: #fafafa;\">\n                    <v-container>\n                        <constrain sm>\n                            <div class=\"grid-list-xl\">\n                                <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.contact\" v-model=\"model\"></fluro-content-form-field>\n                                <div v-if=\"definition && definition.fields && definition.fields.length\">\n                                    <fluro-content-form :options=\"options\" v-model=\"model.data\" :fields=\"definition.fields\" />\n                                </div>\n                            </div>\n                        </constrain>\n                    </v-container>\n                </flex-column-body>\n            </tab>\n        </tabset>\n    </flex-column>\n</template>\n<script>\n/////////////////////////////////\n\nimport FluroContentEditMixin from 'src/components/content/edit/FluroContentEditMixin.js';\n\n/////////////////////////////////\n\nimport Vue from 'vue';\n\n/////////////////////////////////\n\nexport default {\n\n\n    mixins: [FluroContentEditMixin],\n    components: {},\n    methods: {\n        modelUpdated() {\n            this.update(this.model);\n        },\n    },\n    created() {\n        var self = this;\n    },\n    asyncComputed: {\n\n    },\n    computed: {\n        showOutline() {\n            return false; //true; //false;//true;//false;//true;\n        },\n        fieldsOutput() {\n\n            var self = this;\n            var array = [];\n\n            ///////////////////////////////////\n\n            addField('contact', {\n                title: 'Contact',\n                minimum: 1,\n                maximum: 1,\n                type: 'reference',\n                params: {\n                    restrictType: 'contact',\n                },\n            })\n\n            function addField(key, details) {\n                details.key = key;\n                array.push(details)\n            }\n\n            return array;\n\n        },\n    },\n    data() {\n        return {\n\n        }\n    },\n}\n</script>\n<style scoped lang=\"scss\">\n\n/**/\r\n\r\n$primary: #2ad4b9;//#0bd6be;\r\n$success: #4cc650; //#4cc673;//\r\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\r\n$danger: #d93e63;\r\n$secondary: #0bd6cd; //#0bd6a3;\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n\r\n.border-top {\r\n    border-top: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-right {\r\n    border-right: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-bottom {\r\n    border-bottom: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-left {\r\n    border-left: 1px solid rgba(#000, 0.05);\r\n}\r\n//////////////////////////////////////////\r\n\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n/**/\n.hint {\n    font-size: 10px;\n    opacity: 0.5;\n    color: inherit;\n    display: block;\n}\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.hint {\n  font-size: 10px;\n  opacity: 0.5;\n  color: inherit;\n  display: block;\n}\n\n/*# sourceMappingURL=contactdetail.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-391a6e72";
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
//# sourceMappingURL=contactdetail-191df2ca.js.map
