
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { h as FluroFieldEditor, aK as FluroCodeEditor, bm as __vue_normalize__, bn as __vue_create_injector__ } from './index-f72992bb.js';
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
import { F as FluroContentEditMixin } from './FluroContentEditMixin-8af3cd0b.js';

//

var script = {
  mixins: [FluroContentEditMixin],
  components: {
    FluroFieldEditor,
    FluroCodeEditor
  },
  methods: {
    togglePanel(syntax, isolate) {
      console.log('TOGGLE', syntax);
      var self = this;

      if (isolate) {
        for (var key in self.collapsed) {
          self.$set(self.collapsed, key, true);
        }
      }

      self.$set(self.collapsed, syntax, !self.collapsed[syntax]); // this.collapsed[syntax] = !this.collapsed[syntax];
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
                                "v-layout",
                                [
                                  _c("v-flex", [
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
                                  ]),
                                  _vm._v(" "),
                                  _c(
                                    "v-flex",
                                    {
                                      directives: [
                                        { name: "tippy", rawName: "v-tippy" }
                                      ],
                                      staticClass: "arrow-expander",
                                      attrs: { shrink: "", content: "Expand" },
                                      on: {
                                        click: function($event) {
                                          $event.stopPropagation();
                                          $event.preventDefault();
                                          return _vm.togglePanel("js", true)
                                        }
                                      }
                                    },
                                    [
                                      _c("fluro-icon", {
                                        attrs: { icon: "expand-alt" }
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
                                "v-layout",
                                [
                                  _c("v-flex", [
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
                                  ]),
                                  _vm._v(" "),
                                  _c(
                                    "v-flex",
                                    {
                                      directives: [
                                        { name: "tippy", rawName: "v-tippy" }
                                      ],
                                      staticClass: "arrow-expander",
                                      attrs: { shrink: "", content: "Expand" },
                                      on: {
                                        click: function($event) {
                                          $event.stopPropagation();
                                          $event.preventDefault();
                                          return _vm.togglePanel("html", true)
                                        }
                                      }
                                    },
                                    [
                                      _c("fluro-icon", {
                                        attrs: { icon: "expand-alt" }
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
                                "v-layout",
                                [
                                  _c("v-flex", [
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
                                  ]),
                                  _vm._v(" "),
                                  _c(
                                    "v-flex",
                                    {
                                      directives: [
                                        { name: "tippy", rawName: "v-tippy" }
                                      ],
                                      staticClass: "arrow-expander",
                                      attrs: { shrink: "", content: "Expand" },
                                      on: {
                                        click: function($event) {
                                          $event.stopPropagation();
                                          $event.preventDefault();
                                          return _vm.togglePanel("css", true)
                                        }
                                      }
                                    },
                                    [
                                      _c("fluro-icon", {
                                        attrs: { icon: "expand-alt" }
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
    inject("data-v-5bb1a844_0", { source: "/**/\n.border-top[data-v-5bb1a844] {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right[data-v-5bb1a844] {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom[data-v-5bb1a844] {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left[data-v-5bb1a844] {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.code-heading[data-v-5bb1a844] {\n  line-height: 30px;\n  height: 30px;\n  padding: 0 15px;\n  background: #555;\n  color: rgba(255, 255, 255, 0.8);\n  white-space: nowrap;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  cursor: pointer !important;\n  position: relative;\n}\n.code-heading[data-v-5bb1a844]:hover {\n  background: #444;\n  color: #fff;\n}\n.code-heading label[data-v-5bb1a844] {\n  display: block;\n  text-transform: uppercase;\n  margin: 0;\n  padding: 0;\n  letter-spacing: 0.05em;\n  font-size: 12px;\n  pointer-events: none;\n}\n.code-heading .arrow-expander[data-v-5bb1a844] {\n  opacity: 0.5;\n  cursor: pointer;\n}\n.code-heading .arrow-expander[data-v-5bb1a844]:hover {\n  opacity: 1;\n}\n.code-panels[data-v-5bb1a844] {\n  background: #262626;\n}\n.code-panel .code-panel-column[data-v-5bb1a844] {\n  border-left: 1px solid rgba(0, 0, 0, 0.1);\n  border-right: 1px solid rgba(0, 0, 0, 0.1);\n}\n.panel-collapsed[data-v-5bb1a844] {\n  width: 30px !important;\n  flex: none;\n  background: #fafafa;\n}\n.panel-collapsed .arrow-expander[data-v-5bb1a844] {\n  position: absolute;\n  bottom: 5px;\n  left: 0;\n  right: 0;\n  text-align: center;\n}\n.panel-collapsed .code-heading[data-v-5bb1a844] {\n  flex: 1;\n  height: auto;\n}\n.panel-collapsed .code-heading label[data-v-5bb1a844] {\n  transform: rotate(90deg);\n}\n.panel-collapsed .code-panel-column[data-v-5bb1a844] {\n  display: none;\n}\n\n/*# sourceMappingURL=component.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/edit/panels/component.vue","component.vue"],"names":[],"mappings":"AA8JA,GAAA;AAYA;EACA,yCAAA;ACxKA;AD2KA;EACA,2CAAA;ACxKA;AD2KA;EACA,4CAAA;ACxKA;AD2KA;EACA,0CAAA;ACxKA;;ADgLA,GAAA;AACA;EACA,iBAAA;EACA,YAAA;EACA,eAAA;EACA,gBAAA;EACA,+BAAA;EACA,mBAAA;EACA,oCAAA;EACA,0BAAA;EACA,kBAAA;AC7KA;AD+KA;EACA,gBAAA;EACA,WAAA;AC7KA;ADgLA;EACA,cAAA;EACA,yBAAA;EACA,SAAA;EACA,UAAA;EACA,sBAAA;EACA,eAAA;EACA,oBAAA;AC9KA;ADiLA;EACA,YAAA;EACA,eAAA;AC/KA;ADiLA;EACA,UAAA;AC/KA;ADoLA;EACA,mBAAA;ACjLA;ADqLA;EACA,yCAAA;EACA,0CAAA;AClLA;ADsLA;EACA,sBAAA;EACA,UAAA;EACA,mBAAA;ACnLA;ADsLA;EACA,kBAAA;EACA,WAAA;EACA,OAAA;EACA,QAAA;EACA,kBAAA;ACpLA;ADuLA;EACA,OAAA;EACA,YAAA;ACrLA;ADuLA;EACA,wBAAA;ACrLA;ADyLA;EACA,aAAA;ACvLA;;AAEA,wCAAwC","file":"component.vue","sourcesContent":["<template>\n\t\t\t\t<flex-column>\n\t\t\t\t\t\t\t\t<template v-if=\"loading\">\n\t\t\t\t\t\t\t\t\t\t\t\t<fluro-page-preloader contain />\n\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t<tabset v-else :justified=\"true\">\n\t\t\t\t\t\t\t\t\t\t\t\t<tab heading=\"Code\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<flex-row class=\"code-panels\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<flex-column class=\"code-panel\" :class=\"{'panel-collapsed':collapsed.js}\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"code-heading\" @click=\"togglePanel('js')\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-icon icon=\"caret-right\" library=\"fas\" left /><strong>Javascript</strong>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex shrink v-tippy content=\"Expand\" class=\"arrow-expander\" @click.stop.prevent=\"togglePanel('js', true)\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-icon icon=\"expand-alt\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<flex-column class=\"code-panel-column\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-code-editor style=\"flex: 1 1 100%\" v-model=\"model.js\" lang=\"javascript\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</flex-column>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</flex-column>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<flex-column class=\"code-panel\" :class=\"{'panel-collapsed':collapsed.html}\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"code-heading\" @click=\"togglePanel('html')\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-icon icon=\"caret-right\" library=\"fas\" left /><strong>HTML</strong>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex shrink v-tippy content=\"Expand\" class=\"arrow-expander\" @click.stop.prevent=\"togglePanel('html', true)\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-icon icon=\"expand-alt\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<flex-column class=\"code-panel-column\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-code-editor style=\"flex: 1 1 100%\" v-model=\"model.html\" lang=\"html\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</flex-column>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</flex-column>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<flex-column class=\"code-panel\" :class=\"{'panel-collapsed':collapsed.css}\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"code-heading\" @click=\"togglePanel('css')\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-icon icon=\"caret-right\" library=\"fas\" left /><strong>SCSS</strong>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex shrink v-tippy content=\"Expand\" class=\"arrow-expander\" @click.stop.prevent=\"togglePanel('css', true)\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-icon icon=\"expand-alt\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!--  -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<flex-column class=\"code-panel-column\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-code-editor :autoformat=\"false\" style=\"flex: 1 1 100%\" v-model=\"model.css\" lang=\"scss\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</flex-column>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</flex-column>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</flex-row>\n\t\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t\t\t\t\t<tab heading=\"Component Fields\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-field-editor v-model=\"model.fields\" :item=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t\t\t\t\t<tab :heading=\"`${readableContentType} Details`\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<flex-column-body style=\"background: #fafafa;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-container fluid>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<constrain sm>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h3 margin>{{readableContentType}} Details</h3>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<template v-if=\"definedFields.length\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form :options=\"options\" v-model=\"model.data\" :fields=\"definedFields\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</constrain>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</flex-column-body>\n\t\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t</tabset>\n\t\t\t\t</flex-column>\n</template>\n<script>\n/////////////////////////////////\n\nimport Vue from 'vue';\nimport FluroContentEditMixin from 'src/components/content/edit/FluroContentEditMixin.js';\nimport FluroFieldEditor from 'src/components/fields/FluroFieldEditor.vue';\nimport FluroCodeEditor from 'src/components/form/FluroCodeEditor.vue';\n/////////////////////////////////\n\nexport default {\n\t\t\t\tmixins: [FluroContentEditMixin],\n\t\t\t\tcomponents: {\n\t\t\t\t\t\t\t\tFluroFieldEditor,\n\t\t\t\t\t\t\t\tFluroCodeEditor,\n\t\t\t\t},\n\t\t\t\tmethods: {\n\t\t\t\t\t\t\t\ttogglePanel(syntax, isolate) {\n\n\t\t\t\t\t\t\t\t\t\t\t\tconsole.log('TOGGLE', syntax);\n\n\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\n\t\t\t\t\t\t\t\t\t\t\t\tif (isolate) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tfor (var key in self.collapsed) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tself.$set(self.collapsed, key, true);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t\t\tself.$set(self.collapsed, syntax, !self.collapsed[syntax]);\n\n\t\t\t\t\t\t\t\t\t\t\t\t// this.collapsed[syntax] = !this.collapsed[syntax];\n\t\t\t\t\t\t\t\t},\n\t\t\t\t},\n\t\t\t\tcreated() {\n\t\t\t\t\t\t\t\tif (!this.model.fields) {\n\t\t\t\t\t\t\t\t\t\t\t\tthis.$set(this.model, 'fields', []);\n\t\t\t\t\t\t\t\t}\n\t\t\t\t},\n\t\t\t\tcomputed: {\n\t\t\t\t\t\t\t\tfieldsOutput() {\n\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\t\t\t\t\t\t\t\t\t\t\t\tvar array = [];\n\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('title', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Title',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'string',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tplaceholder: 'Eg. My Awesome List',\n\t\t\t\t\t\t\t\t\t\t\t\t})\n\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\n\t\t\t\t\t\t\t\t\t\t\t\tfunction addField(key, details) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdetails.key = key;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tarray.push(details)\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t\t\treturn array;\n\n\t\t\t\t\t\t\t\t},\n\t\t\t\t},\n\t\t\t\tdata() {\n\t\t\t\t\t\t\t\treturn {\n\t\t\t\t\t\t\t\t\t\t\t\tcollapsed: {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tjs: false,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\thtml: false,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tcss: false,\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t}\n\t\t\t\t},\n}\n\n</script>\n<style scoped lang=\"scss\">\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n.code-heading {\n\t\t\t\tline-height: 30px;\n\t\t\t\theight: 30px;\n\t\t\t\tpadding: 0 15px;\n\t\t\t\tbackground: #555;\n\t\t\t\tcolor: rgba(#fff, 0.8);\n\t\t\t\twhite-space: nowrap;\n\t\t\t\tborder: 1px solid rgba(#000, 0.1);\n\t\t\t\tcursor: pointer !important;\n\t\t\t\tposition:relative;\n\n\t\t\t\t&:hover {\n\t\t\t\t\t\t\t\tbackground: #444;\n\t\t\t\t\t\t\t\tcolor: #fff;\n\t\t\t\t}\n\n\t\t\t\tlabel {\n\t\t\t\t\t\t\t\tdisplay: block;\n\t\t\t\t\t\t\t\ttext-transform: uppercase;\n\t\t\t\t\t\t\t\tmargin: 0;\n\t\t\t\t\t\t\t\tpadding: 0;\n\t\t\t\t\t\t\t\tletter-spacing: 0.05em;\n\t\t\t\t\t\t\t\tfont-size: 12px;\n\t\t\t\t\t\t\t\tpointer-events: none;\n\t\t\t\t}\n\n\t\t\t\t.arrow-expander {\n\t\t\t\t\t\t\t\topacity: 0.5;\n\t\t\t\t\t\t\t\tcursor: pointer;\n\n\t\t\t\t\t\t\t\t&:hover {\n\t\t\t\t\t\t\t\t\t\t\t\topacity: 1;\n\t\t\t\t\t\t\t\t}\n\t\t\t\t}\n}\n\n.code-panels {\n\t\t\t\tbackground: #262626;\n}\n\n.code-panel {\n\t\t\t\t.code-panel-column {\n\t\t\t\t\t\t\t\tborder-left: 1px solid rgba(#000, 0.1);\n\t\t\t\t\t\t\t\tborder-right: 1px solid rgba(#000, 0.1);\n\t\t\t\t}\n}\n\n.panel-collapsed {\n\t\t\t\twidth: 30px !important;\n\t\t\t\tflex: none;\n\t\t\t\tbackground: #fafafa;\n\n\n\t\t\t\t.arrow-expander {\n\t\t\t\t\t\t\t\tposition:absolute;\n\t\t\t\t\t\t\t\tbottom:5px;\n\t\t\t\t\t\t\t\tleft:0;\n\t\t\t\t\t\t\t\tright:0;\n\t\t\t\t\t\t\t\ttext-align: center;\n\t\t\t\t}\n\n\t\t\t\t.code-heading {\n\t\t\t\t\t\t\t\tflex: 1;\n\t\t\t\t\t\t\t\theight: auto;\n\n\t\t\t\t\t\t\t\tlabel {\n\t\t\t\t\t\t\t\t\t\t\t\ttransform: rotate(90deg);\n\t\t\t\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\t.code-panel-column {\n\t\t\t\t\t\t\t\tdisplay: none;\n\t\t\t\t}\n}\n\n</style>\n","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.code-heading {\n  line-height: 30px;\n  height: 30px;\n  padding: 0 15px;\n  background: #555;\n  color: rgba(255, 255, 255, 0.8);\n  white-space: nowrap;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  cursor: pointer !important;\n  position: relative;\n}\n.code-heading:hover {\n  background: #444;\n  color: #fff;\n}\n.code-heading label {\n  display: block;\n  text-transform: uppercase;\n  margin: 0;\n  padding: 0;\n  letter-spacing: 0.05em;\n  font-size: 12px;\n  pointer-events: none;\n}\n.code-heading .arrow-expander {\n  opacity: 0.5;\n  cursor: pointer;\n}\n.code-heading .arrow-expander:hover {\n  opacity: 1;\n}\n\n.code-panels {\n  background: #262626;\n}\n\n.code-panel .code-panel-column {\n  border-left: 1px solid rgba(0, 0, 0, 0.1);\n  border-right: 1px solid rgba(0, 0, 0, 0.1);\n}\n\n.panel-collapsed {\n  width: 30px !important;\n  flex: none;\n  background: #fafafa;\n}\n.panel-collapsed .arrow-expander {\n  position: absolute;\n  bottom: 5px;\n  left: 0;\n  right: 0;\n  text-align: center;\n}\n.panel-collapsed .code-heading {\n  flex: 1;\n  height: auto;\n}\n.panel-collapsed .code-heading label {\n  transform: rotate(90deg);\n}\n.panel-collapsed .code-panel-column {\n  display: none;\n}\n\n/*# sourceMappingURL=component.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-5bb1a844";
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
//# sourceMappingURL=component-41203212.js.map
