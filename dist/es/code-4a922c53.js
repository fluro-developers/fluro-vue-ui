
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { aK as FluroCodeEditor, bm as __vue_normalize__, bn as __vue_create_injector__ } from './index-57cce4a0.js';
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
import { F as FluroContentEditMixin } from './FluroContentEditMixin-0e84ed73.js';

//

var script = {
  components: {
    FluroCodeEditor
  },
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
      addField('syntax', {
        title: 'Syntax',
        minimum: 1,
        maximum: 1,
        type: 'string',
        directive: 'select',
        options: [{
          name: 'HTML',
          value: 'html'
        }, {
          name: 'SCSS',
          value: 'scss'
        }, {
          name: 'CSS',
          value: 'css'
        }, {
          name: 'Javascript',
          value: 'js'
        }]
      }); ///////////////////////////////////

      function addField(key, details) {
        details.key = key;
        array.push(details);
      }

      return array;
    },

    fullBody() {
      return this.definition && this.definition.data && this.definition.data.fullBody;
    },

    hideBody() {
      return this.definition && this.definition.data && this.definition.data.hideBody;
    },

    titleLabel() {
      return 'Title';
    },

    bodyLabel() {
      return 'Body';
    }

  },

  data() {
    return {
      editorOptions: {}
    };
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
                  { attrs: { heading: "Code" } },
                  [
                    _c(
                      "v-layout",
                      {
                        staticClass: "top-bar",
                        attrs: { row: "", "px-4": "", "py-2": "" }
                      },
                      [
                        _c(
                          "v-flex",
                          { attrs: { xs8: "", sm4: "", md3: "", "px-2": "" } },
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
                            })
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "v-flex",
                          { attrs: { xs4: "", sm2: "", md2: "", "px-2": "" } },
                          [
                            _c("fluro-content-form-field", {
                              attrs: {
                                "form-fields": _vm.formFields,
                                outline: _vm.showOutline,
                                options: _vm.options,
                                field: _vm.fieldHash.syntax
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
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c("fluro-code-editor", {
                      staticStyle: { flex: "1 1 100%" },
                      attrs: { lang: _vm.model.syntax },
                      model: {
                        value: _vm.model.body,
                        callback: function($$v) {
                          _vm.$set(_vm.model, "body", $$v);
                        },
                        expression: "model.body"
                      }
                    })
                  ],
                  1
                ),
                _vm._v(" "),
                _vm.definition
                  ? _c(
                      "tab",
                      { attrs: { heading: _vm.definition.title + " Details" } },
                      [
                        _vm._t("default", [
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
                                      _c("h3", { attrs: { margin: "" } }, [
                                        _vm._v(
                                          _vm._s(_vm.definition.title) +
                                            " Details"
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
                                    ],
                                    1
                                  )
                                ],
                                1
                              )
                            ],
                            1
                          )
                        ])
                      ],
                      2
                    )
                  : _vm._e(),
                _vm._v(" "),
                _c(
                  "tab",
                  { attrs: { heading: "Privacy" } },
                  [
                    _vm._t("default", [
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
                                  _c("fluro-privacy-select", {
                                    model: {
                                      value: _vm.model.privacy,
                                      callback: function($$v) {
                                        _vm.$set(_vm.model, "privacy", $$v);
                                      },
                                      expression: "model.privacy"
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
                    ])
                  ],
                  2
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
    inject("data-v-19e44e42_0", { source: "/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.fluro-editor.full-bleed {\n  margin: 0;\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.fluro-editor.full-bleed .fluro-editor-textarea {\n  flex: 1;\n}\n.fluro-editor.full-bleed .fluro-editor-textarea > div {\n  border: none !important;\n  border-radius: 0;\n  overflow: auto;\n  padding: 3%;\n}\n.fluro-editor.full-bleed .editor-code-wrapper {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n}\n.fluro-editor.full-bleed .editor-code-wrapper .fluro-code-editor {\n  display: block;\n  flex: 1;\n  position: relative;\n}\n.fluro-editor.full-bleed .editor-code-wrapper .fluro-code-editor .ace_editor {\n  width: 100% !important;\n  height: 100% !important;\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  top: 0;\n  border-radius: 0;\n}\n\n/*# sourceMappingURL=code.vue.map */", map: {"version":3,"sources":["C:\\Users\\User\\Documents\\fluro\\fluro-vue-ui\\src\\components\\content\\edit\\panels\\code.vue","code.vue"],"names":[],"mappings":"AA0JA,GAAA;AAYA;EACA,yCAAA;ACpKA;ADuKA;EACA,2CAAA;ACpKA;ADuKA;EACA,4CAAA;ACpKA;ADuKA;EACA,0CAAA;ACpKA;;AD4KA,GAAA;AACA;EACA,SAAA;EACA,OAAA;EACA,aAAA;EACA,sBAAA;EACA,gBAAA;ACzKA;AD2KA;EACA,OAAA;ACzKA;AD4KA;EACA,uBAAA;EACA,gBAAA;EACA,cAAA;EACA,WAAA;AC1KA;AD8KA;EACA,OAAA;EACA,aAAA;EACA,sBAAA;AC5KA;AD8KA;EACA,cAAA;EACA,OAAA;EACA,kBAAA;AC5KA;AD8KA;EACA,sBAAA;EACA,uBAAA;EACA,kBAAA;EACA,OAAA;EACA,SAAA;EACA,QAAA;EACA,MAAA;EACA,gBAAA;AC5KA;;AAEA,mCAAmC","file":"code.vue","sourcesContent":["<template>\n    <flex-column>\n        <template v-if=\"loading\">\n            <fluro-page-preloader contain />\n        </template>\n        <template v-else>\n            <!-- :vertical=\"true\" -->\n            <tabset :justified=\"true\" :vertical=\"true\">\n                <tab heading=\"Code\" >\n                    <v-layout row class=\"top-bar\" px-4 py-2>\n                        <v-flex xs8 sm4 md3 px-2>\n                            <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.title\" v-model=\"model\" />\n                        </v-flex>\n                        <v-flex xs4 sm2 md2 px-2>\n                            <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.syntax\" v-model=\"model\" />\n                        </v-flex>\n                    </v-layout>\n                    <fluro-code-editor style=\"flex: 1 1 100%\" v-model=\"model.body\" :lang=\"model.syntax\" />\n                </tab>\n                <tab :heading=\"`${definition.title} Details`\" v-if=\"definition\">\n                    <slot>\n                        <flex-column-body style=\"background: #fafafa;\">\n                            <v-container fluid>\n                                <constrain sm>\n                                    <h3 margin>{{definition.title}} Details</h3>\n                                    <!-- <div class=\"form-group\" v-if=\"definition.data.titleGeneration != 'force'\"> -->\n                                    <!-- <label>{{titleLabel}}</label> -->\n                                    <!-- <input class=\"form-control\" placeholder=\"{{titleLabel}}\" ng-model=\"item.title\"> -->\n                                    <!-- </div> -->\n                                    <fluro-content-form :options=\"options\" v-model=\"model.data\" :fields=\"definition.fields\" />\n                                </constrain>\n                            </v-container>\n                        </flex-column-body>\n                    </slot>\n                </tab>\n                <tab :heading=\"`Privacy`\">\n                    <slot>\n                        <flex-column-body style=\"background: #fafafa;\">\n                            <v-container fluid>\n                                <constrain sm>\n                                    <fluro-privacy-select v-model=\"model.privacy\"/>\n                                </constrain>\n                            </v-container>\n                        </flex-column-body>\n                    </slot>\n                </tab>\n            </tabset>\n        </template>\n        <!-- <flex-column-body> -->\n        <!-- // <pre>{{model}}</pre> -->\n        <!-- </flex-column-body> -->\n        <!-- <flex-column-body> -->\n        <!-- WOOOT -->\n        <!-- <tabset v-else :justified=\"true\" :vertical=\"true\">\n            <tab heading=\"Basic Details\">\n                <slot>\n                    <flex-column-body style=\"background: #fafafa;\">\n                    </flex-column-body>\n                </slot>\n            </tab>\n        </tabset> -->\n    </flex-column>\n</template>\n<script>\n/////////////////////////////////\n\nimport FluroCodeEditor from 'src/components/form/FluroCodeEditor.vue';\nimport FluroContentEditMixin from 'src/components/content/edit/FluroContentEditMixin.js';\n\n/////////////////////////////////\n\nimport Vue from 'vue';\n\n/////////////////////////////////\n\nexport default {\n    components: {\n        FluroCodeEditor,\n    },\n    mixins: [FluroContentEditMixin],\n    computed: {\n        fieldsOutput() {\n\n\n            var self = this;\n            var array = [];\n\n            ///////////////////////////////////\n\n            addField('title', {\n                title: 'Title',\n                minimum: 1,\n                maximum: 1,\n                type: 'string',\n            });\n\n            addField('syntax', {\n                title: 'Syntax',\n                minimum: 1,\n                maximum: 1,\n                type: 'string',\n                directive: 'select',\n                options: [{\n                        name: 'HTML',\n                        value: 'html'\n                    },\n                    {\n                        name: 'SCSS',\n                        value: 'scss'\n                    },\n                    {\n                        name: 'CSS',\n                        value: 'css'\n                    },\n                    {\n                        name: 'Javascript',\n                        value: 'js'\n                    }\n                ],\n            });\n\n            ///////////////////////////////////\n\n            function addField(key, details) {\n                details.key = key;\n                array.push(details)\n            }\n\n            return array;\n\n\n        },\n        fullBody() {\n            return this.definition && this.definition.data && this.definition.data.fullBody;\n        },\n        hideBody() {\n            return this.definition && this.definition.data && this.definition.data.hideBody;\n        },\n        titleLabel() {\n            return 'Title';\n        },\n        bodyLabel() {\n            return 'Body';\n        }\n    },\n    data() {\n        return {\n            editorOptions: {},\n        }\n    },\n}\n</script>\n<style lang=\"scss\">\n\n/**/\r\n\r\n$primary: #2ad4b9;//#0bd6be;\r\n$success: #4cc650; //#4cc673;//\r\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\r\n$danger: #d93e63;\r\n$secondary: #0bd6cd; //#0bd6a3;\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n\r\n.border-top {\r\n    border-top: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-right {\r\n    border-right: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-bottom {\r\n    border-bottom: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-left {\r\n    border-left: 1px solid rgba(#000, 0.05);\r\n}\r\n//////////////////////////////////////////\r\n\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n/**/\n.fluro-editor.full-bleed {\n    margin: 0;\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n    overflow: hidden;\n\n    .fluro-editor-textarea {\n        flex: 1;\n\n\n        &>div {\n            border: none !important;\n            border-radius: 0;\n            overflow: auto;\n            padding: 3%;\n        }\n    }\n\n    & .editor-code-wrapper {\n        flex: 1;\n        display: flex;\n        flex-direction: column;\n\n        .fluro-code-editor {\n            display: block;\n            flex: 1;\n            position: relative;\n\n            .ace_editor {\n                width: 100% !important;\n                height: 100% !important;\n                position: absolute;\n                left: 0;\n                bottom: 0;\n                right: 0;\n                top: 0;\n                border-radius: 0;\n            }\n        }\n    }\n}\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.fluro-editor.full-bleed {\n  margin: 0;\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.fluro-editor.full-bleed .fluro-editor-textarea {\n  flex: 1;\n}\n.fluro-editor.full-bleed .fluro-editor-textarea > div {\n  border: none !important;\n  border-radius: 0;\n  overflow: auto;\n  padding: 3%;\n}\n.fluro-editor.full-bleed .editor-code-wrapper {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n}\n.fluro-editor.full-bleed .editor-code-wrapper .fluro-code-editor {\n  display: block;\n  flex: 1;\n  position: relative;\n}\n.fluro-editor.full-bleed .editor-code-wrapper .fluro-code-editor .ace_editor {\n  width: 100% !important;\n  height: 100% !important;\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  top: 0;\n  border-radius: 0;\n}\n\n/*# sourceMappingURL=code.vue.map */"]}, media: undefined });

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
//# sourceMappingURL=code-4a922c53.js.map
