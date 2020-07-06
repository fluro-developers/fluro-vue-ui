
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { bm as __vue_normalize__, bn as __vue_create_injector__ } from './index-eca07f35.js';
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
import { F as FluroContentEditMixin } from './FluroContentEditMixin-c583d6da.js';

//
/////////////////////////////////

var script = {
  components: {},

  created() {},

  mixins: [FluroContentEditMixin],
  computed: {
    fieldsOutput() {
      var array = []; ///////////////////////////////////

      addField('title', {
        title: 'Title',
        minimum: 1,
        maximum: 1,
        type: 'string'
      });
      addField('color', {
        title: 'Text Color',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'color',
        defaultValues: ['']
      });
      addField('bgColor', {
        title: 'Background Color',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'color',
        defaultValues: ['']
      }); ///////////////////////////////////

      function addField(key, details) {
        details.key = key;
        array.push(details);
      }

      return array;
    },

    exampleColors() {
      var res = [];

      function addColor(title, color, bgcolor) {
        res.push({
          title: title,
          color: color,
          bgColor: bgcolor
        });
      }

      addColor('Black', '#eee', '#555');
      addColor('Red', '#8f0f0f', '#ffb5ba');
      addColor('Pink', '#b3125f', '#ffa3c4');
      addColor('Purple', '#7f12b3', '#e7b3ff');
      addColor('Deep Purple', '#7f12b3', '#e2a3ff');
      addColor('Deep Blue', '#433aab', '#a5a3ff');
      addColor('Baby Blue', '#174b99', '#a6caff');
      addColor('Light Blue', '#1366a3', '#9ee2ff');
      addColor('Cyan', '#008b94', '#97f0ed');
      addColor('Medical Green', '#007357', '#97f0cb');
      addColor('Light Green', '#00703a', '#97f0a5');
      addColor('Lime Green', '#00783e', '#a8ed87');
      addColor('Banana Green', '#306b13', '#dbe37f');
      addColor('Desert Camo', '#6b5813', '#e3cd7f');
      addColor('Amber', '#966639', '#ffe175');
      addColor('Fluro Yellow', '#695e00', '#faff00');
      return res;
    }

  },
  methods: {
    selectExample(tag) {
      var self = this;
      self.$set(self.model, 'color', tag.color);
      self.$set(self.model, 'bgColor', tag.bgColor);
    } // setColor(obj) {
    //     var self = this;
    //     self.$set(self, 'model', {
    //     	color:obj.color,
    //     	bgColor:obj.bgColor,
    //     })
    // }


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
        : [
            _c(
              "flex-column-body",
              { staticStyle: { background: "#fafafa" } },
              [
                _c(
                  "v-container",
                  { attrs: { fluid: "", "grid-list-xl": "" } },
                  [
                    _c(
                      "constrain",
                      { attrs: { sm: "" } },
                      [
                        _c("fluro-content-form-field", {
                          attrs: {
                            autofocus: "",
                            "form-fields": _vm.formFields,
                            outline: _vm.showOutline,
                            options: _vm.options,
                            field: _vm.fieldHash.title
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
                        _c(
                          "v-layout",
                          { attrs: { wrap: "" } },
                          [
                            _c("v-flex", { attrs: { xs12: "", sm12: "" } }, [
                              _c("h4", [_vm._v("Realm Colors")]),
                              _vm._v(" "),
                              _c("p", { staticClass: "muted mb-0" }, [
                                _vm._v("Select colors for the realm below")
                              ]),
                              _vm._v(" "),
                              _c(
                                "span",
                                {
                                  staticClass: "inline-tag",
                                  style: {
                                    color: _vm.model.color,
                                    backgroundColor: _vm.model.bgColor
                                  }
                                },
                                [
                                  _vm._v(
                                    "\n                            \t\t" +
                                      _vm._s(_vm.model.title) +
                                      "\n                            \t"
                                  )
                                ]
                              )
                            ]),
                            _vm._v(" "),
                            _c(
                              "v-flex",
                              { attrs: { xs6: "", sm3: "" } },
                              [
                                _c("fluro-content-form-field", {
                                  attrs: {
                                    "form-fields": _vm.formFields,
                                    outline: _vm.showOutline,
                                    options: _vm.options,
                                    field: _vm.fieldHash.color
                                  },
                                  on: { input: _vm.update },
                                  model: {
                                    value: _vm.model,
                                    callback: function($$v) {
                                      _vm.model = $$v;
                                    },
                                    expression: "model"
                                  }
                                })
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "v-flex",
                              { attrs: { xs6: "", sm3: "" } },
                              [
                                _c("fluro-content-form-field", {
                                  attrs: {
                                    "form-fields": _vm.formFields,
                                    outline: _vm.showOutline,
                                    options: _vm.options,
                                    field: _vm.fieldHash.bgColor
                                  },
                                  on: { input: _vm.update },
                                  model: {
                                    value: _vm.model,
                                    callback: function($$v) {
                                      _vm.model = $$v;
                                    },
                                    expression: "model"
                                  }
                                })
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c("v-flex", { attrs: { xs12: "", sm6: "" } }, [
                              _c("h4", [_vm._v("Example Colors")]),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "inline-tags" },
                                _vm._l(_vm.exampleColors, function(tag) {
                                  return _c(
                                    "span",
                                    {
                                      staticClass: "inline-tag",
                                      style: {
                                        color: tag.color,
                                        backgroundColor: tag.bgColor
                                      },
                                      on: {
                                        click: function($event) {
                                          return _vm.selectExample(tag)
                                        }
                                      }
                                    },
                                    [
                                      _vm._v(
                                        "\n                            \t\t" +
                                          _vm._s(tag.title) +
                                          "\n                            \t"
                                      )
                                    ]
                                  )
                                }),
                                0
                              )
                            ])
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _vm.definition &&
                        _vm.definition.fields &&
                        _vm.definition.fields.length
                          ? [
                              _c("h3", { attrs: { margin: "" } }, [
                                _vm._v(
                                  _vm._s(_vm.definition.title) + " Information"
                                )
                              ]),
                              _vm._v(" "),
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
          ]
    ],
    2
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-97768a8e_0", { source: "/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.chip {\n  font-weight: 500;\n}\n\n/*# sourceMappingURL=realm.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/edit/panels/realm.vue","realm.vue"],"names":[],"mappings":"AAyKA,GAAA;AAYA;EACA,yCAAA;ACnLA;ADsLA;EACA,2CAAA;ACnLA;ADsLA;EACA,4CAAA;ACnLA;ADsLA;EACA,0CAAA;ACnLA;;AD2LA,GAAA;AACA;EACA,gBAAA;ACxLA;;AAEA,oCAAoC","file":"realm.vue","sourcesContent":["<template>\n    <flex-column>\n        <template v-if=\"loading\">\n            <fluro-page-preloader contain />\n        </template>\n        <template v-else>\n            <flex-column-body style=\"background: #fafafa;\">\n                <v-container fluid grid-list-xl>\n                    <constrain sm>\n                       \n                        <fluro-content-form-field autofocus :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.title\" v-model=\"model\" />\n                        <v-layout wrap>\n                            <v-flex xs12 sm12>\n                                <h4>Realm Colors</h4>\n                                <p class=\"muted mb-0\">Select colors for the realm below</p>\n                                <span class=\"inline-tag\" :style=\"{color:model.color, backgroundColor:model.bgColor}\">\n                                \t\t{{model.title}}\n                                \t</span>\n\n                                <!-- <v-chip label small disabled class=\"chip\" :color=\"model.bgColor\" :text-color=\"model.color\">{{model.title || 'Realm Title'}}</v-chip> -->\n                            </v-flex>\n                            <v-flex xs6 sm3>\n                                <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.color\" v-model=\"model\" />\n                            </v-flex>\n                            <v-flex xs6 sm3>\n                                <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.bgColor\" v-model=\"model\" />\n                            </v-flex>\n                            <v-flex xs12 sm6>\n                                <h4>Example Colors</h4>\n                                <div class=\"inline-tags\">\n                                \t<span class=\"inline-tag\" @click=\"selectExample(tag)\" :style=\"{color:tag.color, backgroundColor:tag.bgColor}\" v-for=\"tag in exampleColors\">\n                                \t\t{{tag.title}}\n                                \t</span>\n                                </div>\n                                <!-- <v-chip label small class=\"chip\" v-for=\"eg in exampleColors\" :color=\"eg.bgColor\" :text-color=\"eg.color\" @click=\"setColor(eg)\">{{eg.title}}</v-chip> -->\n                            </v-flex>\n                        </v-layout>\n                        <template v-if=\"definition && definition.fields && definition.fields.length\">\n                            <h3 margin>{{definition.title}} Information</h3>\n                            <fluro-content-form :options=\"options\" v-model=\"model.data\" :fields=\"definition.fields\" />\n                        </template>\n                        <!-- <fluro-content-form :options=\"options\" v-model=\"model.data\" :fields=\"definition.fields\" /> -->\n                        <!-- <fluro-content-form v-if=\"definition && definition.fields && definition.fields.length\" :options=\"options\" v-model=\"model.data\" :fields=\"definition.fields\" /> -->\n                    </constrain>\n                </v-container>\n            </flex-column-body>\n        </template>\n    </flex-column>\n</template>\n<script>\n/////////////////////////////////\n\n\nimport FluroContentEditMixin from 'src/components/content/edit/FluroContentEditMixin.js';\n\n/////////////////////////////////\n\nimport Vue from 'vue';\n\n\n/////////////////////////////////\n\n/////////////////////////////////\n\nexport default {\n    components: {},\n    created() {},\n    mixins: [FluroContentEditMixin],\n    computed: {\n        fieldsOutput() {\n\n\n            var self = this;\n            var array = [];\n\n            ///////////////////////////////////\n\n            addField('title', {\n                title: 'Title',\n                minimum: 1,\n                maximum: 1,\n                type: 'string',\n            });\n\n            addField('color', {\n                title: 'Text Color',\n                minimum: 0,\n                maximum: 1,\n                type: 'string',\n                directive: 'color',\n                defaultValues:[''],\n            });\n\n            addField('bgColor', {\n                title: 'Background Color',\n                minimum: 0,\n                maximum: 1,\n                type: 'string',\n                directive: 'color',\n                defaultValues:[''],\n            });\n\n            ///////////////////////////////////\n\n            function addField(key, details) {\n                details.key = key;\n                array.push(details)\n            }\n\n            return array;\n\n\n        },\n        exampleColors() {\n            var res = [];\n\n            function addColor(title, color, bgcolor) {\n                res.push({\n                    title: title,\n                    color: color,\n                    bgColor: bgcolor,\n                });\n            }\n\n            addColor('Black', '#eee', '#555');\n            addColor('Red', '#8f0f0f', '#ffb5ba');\n            addColor('Pink', '#b3125f', '#ffa3c4');\n            addColor('Purple', '#7f12b3', '#e7b3ff');\n            addColor('Deep Purple', '#7f12b3', '#e2a3ff');\n            addColor('Deep Blue', '#433aab', '#a5a3ff');\n            addColor('Baby Blue', '#174b99', '#a6caff');\n            addColor('Light Blue', '#1366a3', '#9ee2ff');\n            addColor('Cyan', '#008b94', '#97f0ed');\n            addColor('Medical Green', '#007357', '#97f0cb');\n            addColor('Light Green', '#00703a', '#97f0a5');\n            addColor('Lime Green', '#00783e', '#a8ed87');\n            addColor('Banana Green', '#306b13', '#dbe37f');\n            addColor('Desert Camo', '#6b5813', '#e3cd7f');\n            addColor('Amber', '#966639', '#ffe175');\n            addColor('Fluro Yellow', '#695e00', '#faff00');\n\n            return res;\n        }\n    },\n    methods: {\n    \tselectExample(tag) {\n    \t\tvar self = this;\n\n    \t\tself.$set(self.model, 'color', tag.color);\n    \t\tself.$set(self.model, 'bgColor', tag.bgColor);\n    \t},\n        // setColor(obj) {\n        //     var self = this;\n        //     self.$set(self, 'model', {\n        //     \tcolor:obj.color,\n        //     \tbgColor:obj.bgColor,\n        //     })\n\n        // }\n    },\n    data() {\n        return {\n\n        }\n    },\n}\n</script>\n<style lang=\"scss\">\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n.chip {\n    font-weight: 500;\n}\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.chip {\n  font-weight: 500;\n}\n\n/*# sourceMappingURL=realm.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = undefined;
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
//# sourceMappingURL=realm-f01d77e4.js.map
