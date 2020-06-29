
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { h as FluroFieldEditor, aJ as FluroCodeEditor, bl as __vue_normalize__, bm as __vue_create_injector__ } from './index-b3a92f39.js';
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
import { F as FluroContentEditMixin } from './FluroContentEditMixin-67b39451.js';

//

var script = {
  mixins: [FluroContentEditMixin],
  components: {
    FluroFieldEditor,
    FluroCodeEditor
  },
  methods: {
    togglePanel(syntax) {
      console.log('TOGGLE', syntax);
      this.collapsed[syntax] = !this.collapsed[syntax];
    }

  },

  created() {
    if (!this.model.fields) {
      this.$set(this.model, 'fields', []);
    }
  },

  computed: {
    fieldsOutput() {
      var array = []; ///////////////////////////////////

      addField('title', {
        title: 'Title',
        minimum: 1,
        maximum: 1,
        type: 'string',
        placeholder: 'Eg. My Awesome List'
      }); ///////////////////////////////////

      function addField(key, details) {
        details.key = key;
        array.push(details);
      }

      return array;
    }

  },

  data() {
    return {
      collapsed: {
        js: false,
        html: false,
        css: false
      }
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
        : _c(
            "tabset",
            { attrs: { justified: true } },
            [
              _c(
                "tab",
                { attrs: { heading: "Code" } },
                [
                  _c(
                    "flex-row",
                    { staticClass: "code-panels" },
                    [
                      _c(
                        "flex-column",
                        {
                          staticClass: "code-panel",
                          class: { "panel-collapsed": _vm.collapsed.js }
                        },
                        [
                          _c(
                            "div",
                            {
                              staticClass: "code-heading",
                              on: {
                                click: function($event) {
                                  return _vm.togglePanel("js")
                                }
                              }
                            },
                            [
                              _c(
                                "label",
                                [
                                  _c("fluro-icon", {
                                    attrs: {
                                      icon: "caret-right",
                                      library: "fas",
                                      left: ""
                                    }
                                  }),
                                  _c("strong", [_vm._v("Javascript")])
                                ],
                                1
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "flex-column",
                            { staticClass: "code-panel-column" },
                            [
                              _c("fluro-code-editor", {
                                staticStyle: { flex: "1 1 100%" },
                                attrs: { lang: "javascript" },
                                model: {
                                  value: _vm.model.js,
                                  callback: function($$v) {
                                    _vm.$set(_vm.model, "js", $$v);
                                  },
                                  expression: "model.js"
                                }
                              })
                            ],
                            1
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "flex-column",
                        {
                          staticClass: "code-panel",
                          class: { "panel-collapsed": _vm.collapsed.html }
                        },
                        [
                          _c(
                            "div",
                            {
                              staticClass: "code-heading",
                              on: {
                                click: function($event) {
                                  return _vm.togglePanel("html")
                                }
                              }
                            },
                            [
                              _c(
                                "label",
                                [
                                  _c("fluro-icon", {
                                    attrs: {
                                      icon: "caret-right",
                                      library: "fas",
                                      left: ""
                                    }
                                  }),
                                  _c("strong", [_vm._v("HTML")])
                                ],
                                1
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "flex-column",
                            { staticClass: "code-panel-column" },
                            [
                              _c("fluro-code-editor", {
                                staticStyle: { flex: "1 1 100%" },
                                attrs: { lang: "html" },
                                model: {
                                  value: _vm.model.html,
                                  callback: function($$v) {
                                    _vm.$set(_vm.model, "html", $$v);
                                  },
                                  expression: "model.html"
                                }
                              })
                            ],
                            1
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "flex-column",
                        {
                          staticClass: "code-panel",
                          class: { "panel-collapsed": _vm.collapsed.css }
                        },
                        [
                          _c(
                            "div",
                            {
                              staticClass: "code-heading",
                              on: {
                                click: function($event) {
                                  return _vm.togglePanel("css")
                                }
                              }
                            },
                            [
                              _c(
                                "label",
                                [
                                  _c("fluro-icon", {
                                    attrs: {
                                      icon: "caret-right",
                                      library: "fas",
                                      left: ""
                                    }
                                  }),
                                  _c("strong", [_vm._v("SCSS")])
                                ],
                                1
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "flex-column",
                            { staticClass: "code-panel-column" },
                            [
                              _c("fluro-code-editor", {
                                staticStyle: { flex: "1 1 100%" },
                                attrs: { autoformat: false, lang: "scss" },
                                model: {
                                  value: _vm.model.css,
                                  callback: function($$v) {
                                    _vm.$set(_vm.model, "css", $$v);
                                  },
                                  expression: "model.css"
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
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "tab",
                { attrs: { heading: "Component Fields" } },
                [
                  _c("fluro-field-editor", {
                    attrs: { item: _vm.model },
                    model: {
                      value: _vm.model.fields,
                      callback: function($$v) {
                        _vm.$set(_vm.model, "fields", $$v);
                      },
                      expression: "model.fields"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "tab",
                { attrs: { heading: _vm.readableContentType + " Details" } },
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
                              _c("h3", { attrs: { margin: "" } }, [
                                _vm._v(
                                  _vm._s(_vm.readableContentType) + " Details"
                                )
                              ]),
                              _vm._v(" "),
                              _vm.definedFields.length
                                ? [
                                    _c("fluro-content-form", {
                                      attrs: {
                                        options: _vm.options,
                                        fields: _vm.definedFields
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
    inject("data-v-593b35cf_0", { source: "/**/\n.border-top[data-v-593b35cf] {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right[data-v-593b35cf] {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom[data-v-593b35cf] {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left[data-v-593b35cf] {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.code-heading[data-v-593b35cf] {\n  line-height: 30px;\n  height: 30px;\n  padding: 0 15px;\n  background: #555;\n  color: rgba(255, 255, 255, 0.8);\n  white-space: nowrap;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  cursor: pointer !important;\n}\n.code-heading[data-v-593b35cf]:hover {\n  background: #444;\n  color: #fff;\n}\n.code-heading label[data-v-593b35cf] {\n  display: block;\n  text-transform: uppercase;\n  margin: 0;\n  padding: 0;\n  letter-spacing: 0.05em;\n  font-size: 12px;\n  pointer-events: none;\n}\n.code-panels[data-v-593b35cf] {\n  background: #262626;\n}\n.code-panel .code-panel-column[data-v-593b35cf] {\n  border-left: 1px solid rgba(0, 0, 0, 0.1);\n  border-right: 1px solid rgba(0, 0, 0, 0.1);\n}\n.panel-collapsed[data-v-593b35cf] {\n  width: 30px !important;\n  flex: none;\n  background: #fafafa;\n}\n.panel-collapsed .code-heading[data-v-593b35cf] {\n  flex: 1;\n  height: auto;\n}\n.panel-collapsed .code-heading label[data-v-593b35cf] {\n  transform: rotate(90deg);\n}\n.panel-collapsed .code-panel-column[data-v-593b35cf] {\n  display: none;\n}\n\n/*# sourceMappingURL=component.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/edit/panels/component.vue","component.vue"],"names":[],"mappings":"AA8HA,GAAA;AAYA;EACA,yCAAA;ACxIA;AD2IA;EACA,2CAAA;ACxIA;AD2IA;EACA,4CAAA;ACxIA;AD2IA;EACA,0CAAA;ACxIA;;ADgJA,GAAA;AACA;EACA,iBAAA;EACA,YAAA;EACA,eAAA;EACA,gBAAA;EACA,+BAAA;EACA,mBAAA;EACA,oCAAA;EACA,0BAAA;AC7IA;AD+IA;EACA,gBAAA;EACA,WAAA;AC7IA;ADgJA;EACA,cAAA;EACA,yBAAA;EACA,SAAA;EACA,UAAA;EACA,sBAAA;EACA,eAAA;EACA,oBAAA;AC9IA;ADkJA;EACA,mBAAA;AC/IA;ADmJA;EACA,yCAAA;EACA,0CAAA;AChJA;ADoJA;EACA,sBAAA;EACA,UAAA;EACA,mBAAA;ACjJA;ADmJA;EACA,OAAA;EACA,YAAA;ACjJA;ADmJA;EACA,wBAAA;ACjJA;ADqJA;EACA,aAAA;ACnJA;;AAEA,wCAAwC","file":"component.vue","sourcesContent":["<template>\n    <flex-column>\n        \n        <template v-if=\"loading\">\n            <fluro-page-preloader contain />\n        </template>\n        <tabset v-else :justified=\"true\">\n            <tab heading=\"Code\">\n                <flex-row class=\"code-panels\">\n                    <flex-column class=\"code-panel\" :class=\"{'panel-collapsed':collapsed.js}\">\n                        <div class=\"code-heading\" @click=\"togglePanel('js')\">\n                            <label>\n                                <fluro-icon icon=\"caret-right\" library=\"fas\" left /><strong>Javascript</strong>\n                            </label>\n                        </div>\n                        <flex-column class=\"code-panel-column\">\n                            <fluro-code-editor style=\"flex: 1 1 100%\" v-model=\"model.js\" lang=\"javascript\" />\n                        </flex-column>\n                    </flex-column>\n                    <flex-column class=\"code-panel\" :class=\"{'panel-collapsed':collapsed.html}\">\n                        <div class=\"code-heading\" @click=\"togglePanel('html')\">\n                            <label>\n                                <fluro-icon icon=\"caret-right\" library=\"fas\" left /><strong>HTML</strong>\n                            </label>\n                        </div>\n                        <flex-column class=\"code-panel-column\">\n                            <fluro-code-editor style=\"flex: 1 1 100%\" v-model=\"model.html\" lang=\"html\" />\n                        </flex-column>\n                    </flex-column>\n                    <flex-column class=\"code-panel\" :class=\"{'panel-collapsed':collapsed.css}\">\n                        <div class=\"code-heading\" @click=\"togglePanel('css')\">\n                            <label>\n                                <fluro-icon icon=\"caret-right\" library=\"fas\" left /><strong>SCSS</strong>\n                            </label>\n                        </div>\n                        <!--  -->\n                        <flex-column class=\"code-panel-column\">\n                            <fluro-code-editor :autoformat=\"false\" style=\"flex: 1 1 100%\" v-model=\"model.css\" lang=\"scss\" />\n                        </flex-column>\n                    </flex-column>\n                </flex-row>\n            </tab>\n            <tab heading=\"Component Fields\">\n                <fluro-field-editor v-model=\"model.fields\" :item=\"model\" />\n            </tab>\n            <tab :heading=\"`${readableContentType} Details`\">\n                <flex-column-body style=\"background: #fafafa;\">\n                    <v-container fluid>\n                        <constrain sm>\n                            <h3 margin>{{readableContentType}} Details</h3>\n                            <template v-if=\"definedFields.length\">\n                                <fluro-content-form :options=\"options\" v-model=\"model.data\" :fields=\"definedFields\" />\n                            </template>\n                        </constrain>\n                    </v-container>\n                </flex-column-body>\n            </tab>\n        </tabset>\n    </flex-column>\n</template>\n<script>\n/////////////////////////////////\n\nimport Vue from 'vue';\nimport FluroContentEditMixin from 'src/components/content/edit/FluroContentEditMixin.js';\nimport FluroFieldEditor from 'src/components/fields/FluroFieldEditor.vue';\nimport FluroCodeEditor from 'src/components/form/FluroCodeEditor.vue';\n/////////////////////////////////\n\nexport default {\n    mixins: [FluroContentEditMixin],\n    components: {\n        FluroFieldEditor,\n        FluroCodeEditor,\n    },\n    methods: {\n        togglePanel(syntax) {\n\n            console.log('TOGGLE', syntax);\n            this.collapsed[syntax] = !this.collapsed[syntax];\n        }\n    },\n    created() {\n        if(!this.model.fields) {\n            this.$set(this.model, 'fields', []);\n        }\n    },\n    computed: {\n        fieldsOutput() {\n            var self = this;\n            var array = [];\n\n            ///////////////////////////////////\n\n            addField('title', {\n                title: 'Title',\n                minimum: 1,\n                maximum: 1,\n                type: 'string',\n                placeholder: 'Eg. My Awesome List',\n            })\n\n            ///////////////////////////////////\n\n            function addField(key, details) {\n                details.key = key;\n                array.push(details)\n            }\n\n            return array;\n\n        },\n    },\n    data() {\n        return {\n            collapsed: {\n                js: false,\n                html: false,\n                css: false,\n            }\n        }\n    },\n}\n</script>\n<style scoped lang=\"scss\">\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n.code-heading {\n    line-height: 30px;\n    height: 30px;\n    padding: 0 15px;\n    background: #555;\n    color: rgba(#fff, 0.8);\n    white-space: nowrap;\n    border: 1px solid rgba(#000, 0.1);\n    cursor: pointer !important;\n\n    &:hover {\n        background: #444;\n        color: #fff;\n    }\n\n    label {\n        display: block;\n        text-transform: uppercase;\n        margin: 0;\n        padding: 0;\n        letter-spacing: 0.05em;\n        font-size: 12px;\n        pointer-events: none;\n    }\n}\n\n.code-panels {\n    background: #262626;\n}\n\n.code-panel {\n    .code-panel-column {\n        border-left: 1px solid rgba(#000, 0.1);\n        border-right: 1px solid rgba(#000, 0.1);\n    }\n}\n\n.panel-collapsed {\n    width: 30px !important;\n    flex: none;\n    background: #fafafa;\n\n    .code-heading {\n        flex: 1;\n        height: auto;\n\n        label {\n            transform: rotate(90deg);\n        }\n    }\n\n    .code-panel-column {\n        display: none;\n    }\n}\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.code-heading {\n  line-height: 30px;\n  height: 30px;\n  padding: 0 15px;\n  background: #555;\n  color: rgba(255, 255, 255, 0.8);\n  white-space: nowrap;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  cursor: pointer !important;\n}\n.code-heading:hover {\n  background: #444;\n  color: #fff;\n}\n.code-heading label {\n  display: block;\n  text-transform: uppercase;\n  margin: 0;\n  padding: 0;\n  letter-spacing: 0.05em;\n  font-size: 12px;\n  pointer-events: none;\n}\n\n.code-panels {\n  background: #262626;\n}\n\n.code-panel .code-panel-column {\n  border-left: 1px solid rgba(0, 0, 0, 0.1);\n  border-right: 1px solid rgba(0, 0, 0, 0.1);\n}\n\n.panel-collapsed {\n  width: 30px !important;\n  flex: none;\n  background: #fafafa;\n}\n.panel-collapsed .code-heading {\n  flex: 1;\n  height: auto;\n}\n.panel-collapsed .code-heading label {\n  transform: rotate(90deg);\n}\n.panel-collapsed .code-panel-column {\n  display: none;\n}\n\n/*# sourceMappingURL=component.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-593b35cf";
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
//# sourceMappingURL=component-a8c3d5e9.js.map
