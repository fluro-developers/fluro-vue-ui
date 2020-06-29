
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { aI as FluroCodeEditor, bl as __vue_normalize__, bm as __vue_create_injector__ } from './index-f45f878e.js';
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
import { F as FluroContentEditMixin } from './FluroContentEditMixin-6fddd152.js';
import { G as GradeManager } from './GradeManager-5759d12a.js';

//

var script = {
  components: {
    FluroEditor: FluroCodeEditor,
    GradeManager
  },

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
      var now = new Date();
      addField('graduationDate', {
        title: 'Graduation Date',
        minimum: 0,
        maximum: 1,
        type: 'date',
        directive: 'datetimepicker',
        defaultValues: [now]
      });
      addField('graduateTo', {
        title: 'Graduate To',
        description: 'Which academic calendar does a contact graduate to if they reach the end of the grades in this calendar',
        minimum: 0,
        maximum: 1,
        type: 'reference',
        params: {
          restrictType: 'academic'
        }
      }); ///////////////////////////////////

      function addField(key, details) {
        details.key = key;
        array.push(details);
      }

      return array;
    }

  },
  methods: {
    toggleAutoGraduate() {
      var self = this;

      if (!self.model.autoGraduate) {
        self.model.autoGraduate = true;
      } else {
        self.model.autoGraduate = false;
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
    "flex-column",
    [
      _vm.loading
        ? [_c("fluro-page-preloader", { attrs: { contain: "" } })]
        : [
            _c(
              "tabset",
              { attrs: { justified: true, vertical: true } },
              [
                _c(
                  "tab",
                  { attrs: { heading: "Details" } },
                  [
                    _c(
                      "flex-column-body",
                      { staticStyle: { background: "#fafafa" } },
                      [
                        _c(
                          "v-container",
                          { attrs: { fluid: "" } },
                          [
                            _c(
                              "constrain",
                              { attrs: { sm: "" } },
                              [
                                _c("fluro-content-form-field", {
                                  attrs: {
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
                                _c("grade-manager", {
                                  model: {
                                    value: _vm.model.grades,
                                    callback: function($$v) {
                                      _vm.$set(_vm.model, "grades", $$v);
                                    },
                                    expression: "model.grades"
                                  }
                                }),
                                _vm._v(" "),
                                _c(
                                  "fluro-panel",
                                  [
                                    _c("fluro-panel-title", [
                                      _c(
                                        "div",
                                        {
                                          staticClass:
                                            "no-border-no-background",
                                          on: {
                                            click: function($event) {
                                              return _vm.toggleAutoGraduate()
                                            }
                                          }
                                        },
                                        [
                                          _c(
                                            "fluro-toggle-item",
                                            {
                                              attrs: {
                                                inactive: !_vm.model
                                                  .autoGraduate
                                              }
                                            },
                                            [_vm._v("Auto-Graduate Students")]
                                          )
                                        ],
                                        1
                                      )
                                    ]),
                                    _vm._v(" "),
                                    _vm.model.autoGraduate
                                      ? _c(
                                          "fluro-panel-body",
                                          [
                                            _c(
                                              "v-layout",
                                              { attrs: { column: "" } },
                                              [
                                                _c(
                                                  "v-flex",
                                                  [
                                                    _c(
                                                      "fluro-content-form-field",
                                                      {
                                                        attrs: {
                                                          "form-fields":
                                                            _vm.formFields,
                                                          outline:
                                                            _vm.showOutline,
                                                          options: _vm.options,
                                                          field:
                                                            _vm.fieldHash
                                                              .graduationDate
                                                        },
                                                        on: {
                                                          input: _vm.update
                                                        },
                                                        model: {
                                                          value: _vm.model,
                                                          callback: function(
                                                            $$v
                                                          ) {
                                                            _vm.model = $$v;
                                                          },
                                                          expression: "model"
                                                        }
                                                      }
                                                    )
                                                  ],
                                                  1
                                                ),
                                                _vm._v(" "),
                                                _c(
                                                  "v-flex",
                                                  [
                                                    _c(
                                                      "fluro-content-form-field",
                                                      {
                                                        attrs: {
                                                          "form-fields":
                                                            _vm.formFields,
                                                          outline:
                                                            _vm.showOutline,
                                                          options: _vm.options,
                                                          field:
                                                            _vm.fieldHash
                                                              .graduateTo
                                                        },
                                                        on: {
                                                          input: _vm.update
                                                        },
                                                        model: {
                                                          value: _vm.model,
                                                          callback: function(
                                                            $$v
                                                          ) {
                                                            _vm.model = $$v;
                                                          },
                                                          expression: "model"
                                                        }
                                                      }
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
                                      : _vm._e()
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
                  1
                ),
                _vm._v(" "),
                _vm.definition &&
                _vm.definition.fields &&
                _vm.definition.fields.length
                  ? _c(
                      "tab",
                      {
                        attrs: {
                          heading: _vm.definition.title + " Information"
                        }
                      },
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
    inject("data-v-78cc37d4_0", { source: "/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.no-border-no-background .toggle-item {\n  border: none !important;\n  background: none !important;\n  font-size: 14px;\n  padding: 0px;\n}\n\n/*# sourceMappingURL=academic.vue.map */", map: {"version":3,"sources":["C:\\Users\\User\\Documents\\fluro\\fluro-vue-ui\\src\\components\\content\\edit\\panels\\academic.vue","academic.vue"],"names":[],"mappings":"AAgLA,GAAA;AAYA;EACA,yCAAA;AC1LA;AD6LA;EACA,2CAAA;AC1LA;AD6LA;EACA,4CAAA;AC1LA;AD6LA;EACA,0CAAA;AC1LA;;ADkMA,GAAA;AACA;EACA,uBAAA;EACA,2BAAA;EACA,eAAA;EACA,YAAA;AC/LA;;AAEA,uCAAuC","file":"academic.vue","sourcesContent":["<template>\n    <flex-column>\n        <template v-if=\"loading\">\n            <fluro-page-preloader contain />\n        </template>\n        <template v-else>\n            <!-- :vertical=\"true\" -->\n            <tabset :justified=\"true\" :vertical=\"true\">\n                <!--  <template v-slot:menuprefix>\n                    <template v-if=\"context == 'edit' && $vuetify.breakpoint.mdAndUp\">\n                        <flex-column-header style=\"text-align:center\">\n                            <div style=\"padding: 10px; max-width:200px; margin: auto;\">\n                                <fluro-image  :height=\"200\" :image-height=\"450\" contain :item=\"model\" :cacheKey=\"imageCacheKey\" :spinner=\"true\"></fluro-image>\n                            </div>\n                            <div>\n                                {{model.width}}x{{model.height}}\n                            </div>\n                        </flex-column-header>\n                    </template>\n                </template> -->\n                <tab heading=\"Details\">\n                    <flex-column-body style=\"background: #fafafa;\">\n                        <v-container fluid>\n                            <constrain sm>\n                                <!--  -->\n                                <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.title\" v-model=\"model\"></fluro-content-form-field>\n                                <!-- -->\n                                <grade-manager v-model=\"model.grades\" />\n                                <!--  -->\n                                <fluro-panel>\n                                    <fluro-panel-title>\n                                        <div class=\"no-border-no-background\" @click=\"toggleAutoGraduate()\">\n                                            <fluro-toggle-item :inactive=\"!model.autoGraduate\">Auto-Graduate Students</fluro-toggle-item>\n                                        </div>\n                                    </fluro-panel-title>\n                                    <fluro-panel-body v-if=\"model.autoGraduate\">\n                                        <v-layout column>\n                                            <v-flex>\n                                                <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.graduationDate\" v-model=\"model\"></fluro-content-form-field>\n                                            </v-flex>\n                                            <v-flex>\n                                                <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.graduateTo\" v-model=\"model\"></fluro-content-form-field>\n                                            </v-flex>\n                                        </v-layout>\n                                    </fluro-panel-body>\n                                </fluro-panel>\n                                <!--  -->\n                            </constrain>\n                        </v-container>\n                    </flex-column-body>\n                </tab>\n                <tab :heading=\"`${definition.title} Information`\" v-if=\"definition && definition.fields && definition.fields.length\">\n                    <fluro-content-form :options=\"options\" v-model=\"model.data\" :fields=\"definition.fields\" />\n                </tab>\n                <!-- <tab heading=\"Advanced / Metadata\" v-if=\"hasMeta\">\n                    <flex-column-body style=\"background: #fafafa;\">\n                        <v-container fluid>\n                            <constrain sm>\n                               \n                                <fluro-panel v-if=\"model.data.iptc\">\n                                    <fluro-panel-title>\n                                        <h5>IPTC Data</h5>\n                                    </fluro-panel-title>\n                                    <fluro-panel-body>\n                                        <json-view :deep=\"3\" :data=\"model.data.iptc\" />\n                                    </fluro-panel-body>\n                                </fluro-panel>\n                                \n                               \n                                <fluro-panel v-if=\"model.data.exif\">\n                                    <fluro-panel-title>\n                                        <h5>EXIF Data</h5>\n                                    </fluro-panel-title>\n                                    <fluro-panel-body>\n                                        <json-view :deep=\"3\" :data=\"model.data.exif\" />\n                                    </fluro-panel-body>\n                                </fluro-panel>\n                                \n                            </constrain>\n                        </v-container>\n                    </flex-column-body>\n                </tab> -->\n            </tabset>\n        </template>\n    </flex-column>\n</template>\n<script>\n/////////////////////////////////\n\nimport FluroEditor from 'src/components/form/FluroEditor.vue';\nimport FluroContentEditMixin from 'src/components/content/edit/FluroContentEditMixin.js';\nimport GradeManager from 'src/components/content/edit/components/GradeManager.vue';\n\n/////////////////////////////////\n\nimport Vue from 'vue';\n\n/////////////////////////////////\n\nexport default {\n    components: {\n        FluroEditor,\n        GradeManager,\n    },\n    created() {\n    },\n    mixins: [FluroContentEditMixin],\n    computed: {\n        fieldsOutput() {\n\n\n            var self = this;\n            var array = [];\n\n            ///////////////////////////////////\n\n            addField('title', {\n                title: 'Title',\n                minimum: 1,\n                maximum: 1,\n                type: 'string',\n            });\n\n\n            var now = new Date();\n            addField('graduationDate', {\n                title: 'Graduation Date',\n                minimum: 0,\n                maximum: 1,\n                type: 'date',\n                directive: 'datetimepicker',\n                defaultValues: [now],\n            });\n\n\n            addField('graduateTo', {\n                title: 'Graduate To',\n                description: 'Which academic calendar does a contact graduate to if they reach the end of the grades in this calendar',\n                minimum: 0,\n                maximum: 1,\n                type: 'reference',\n                params: {\n                    restrictType: 'academic',\n                },\n            })\n\n            ///////////////////////////////////\n\n            function addField(key, details) {\n                details.key = key;\n                array.push(details)\n            }\n\n            return array;\n\n\n        },\n    },\n    methods: {\n        toggleAutoGraduate() {\n            var self = this;\n            if (!self.model.autoGraduate) {\n                self.model.autoGraduate = true;\n            }\n            else {\n                self.model.autoGraduate = false;\n            }\n        }\n    },\n    data() {\n        return {}\n    },\n}\n</script>\n<style lang=\"scss\">\n\n/**/\r\n\r\n$primary: #2ad4b9;//#0bd6be;\r\n$success: #4cc650; //#4cc673;//\r\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\r\n$danger: #d93e63;\r\n$secondary: #0bd6cd; //#0bd6a3;\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n\r\n.border-top {\r\n    border-top: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-right {\r\n    border-right: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-bottom {\r\n    border-bottom: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-left {\r\n    border-left: 1px solid rgba(#000, 0.05);\r\n}\r\n//////////////////////////////////////////\r\n\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n/**/\n.no-border-no-background .toggle-item {\n    border: none !important;\n    background: none !important;\n    font-size: 14px;\n    padding:0px;\n}\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.no-border-no-background .toggle-item {\n  border: none !important;\n  background: none !important;\n  font-size: 14px;\n  padding: 0px;\n}\n\n/*# sourceMappingURL=academic.vue.map */"]}, media: undefined });

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
//# sourceMappingURL=academic-37fd1575.js.map
