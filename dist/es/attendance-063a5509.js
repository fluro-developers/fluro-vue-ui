
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { aN as FluroContentForm, r as FluroConfirmButton, bm as __vue_normalize__, bn as __vue_create_injector__ } from './index-8875dfab.js';
import 'vue';
import draggable from 'vuedraggable';
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
import { F as FluroContentEditMixin } from './FluroContentEditMixin-8c3d449f.js';

//
var script = {
  props: {
    value: {
      type: Array,
      default: function () {
        return [];
      }
    }
  },
  components: {
    FluroContentForm,
    FluroConfirmButton,
    draggable
  },

  data() {
    return {
      model: this.value,
      proposed: {},
      dragOptions: {},
      drag: false
    };
  },

  methods: {
    add() {
      var clone = JSON.parse(JSON.stringify(this.proposed));

      if (!clone.name || !clone.name.length || !clone.count || clone.count < 0) {
        return;
      }

      delete clone.row;
      this.model.push(clone);
      this.proposed = {};
    },

    remove(index) {
      this.model.splice(index, 1);
    }

  },
  computed: {
    fields() {
      var array = []; ///////////////////////////////////

      addField('row', {
        type: 'group',
        sameLine: true,
        fields: [{
          title: 'Area Name',
          minimum: 1,
          maximum: 1,
          type: 'string',
          key: 'name'
        }, {
          title: 'Count',
          minimum: 1,
          maximum: 1,
          type: 'number',
          key: 'count'
        }]
      }); ///////////////////////////////////

      function addField(key, details) {
        details.key = key;
        array.push(details);
      }

      return array;
    },

    disableAdd() {
      var self = this;
      return !self.proposed.name || !self.proposed.name.length || !self.proposed.count || self.proposed.count < 0;
    }

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
    "div",
    [
      _c(
        "list-group",
        _vm._l(_vm.model, function(area, index) {
          return _c(
            "list-group-item",
            { key: JSON.stringify(area), staticClass: "pa-3" },
            [
              _c(
                "v-layout",
                { attrs: { "align-center": "" } },
                [
                  _c(
                    "v-flex",
                    [
                      _c("fluro-content-form", {
                        ref: "form",
                        refInFor: true,
                        attrs: { fields: _vm.fields },
                        model: {
                          value: _vm.model[index],
                          callback: function($$v) {
                            _vm.$set(_vm.model, index, $$v);
                          },
                          expression: "model[index]"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-flex",
                    { staticClass: "ml-3", attrs: { shrink: "" } },
                    [
                      _c("fluro-confirm-button", {
                        attrs: { content: "Remove" },
                        on: {
                          click: function($event) {
                            return _vm.remove(index)
                          }
                        },
                        scopedSlots: _vm._u(
                          [
                            {
                              key: "default",
                              fn: function(ref) {
                                var confirming = ref.confirming;
                                return [
                                  _c(
                                    "v-btn",
                                    {
                                      staticStyle: {
                                        transition: "all 0.1s",
                                        width: "100%"
                                      },
                                      attrs: {
                                        flat: "",
                                        block: "",
                                        color: confirming ? "red" : ""
                                      }
                                    },
                                    [
                                      _vm._v(
                                        _vm._s(
                                          confirming ? "Confirm?" : "Remove"
                                        )
                                      )
                                    ]
                                  )
                                ]
                              }
                            }
                          ],
                          null,
                          true
                        )
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
        }),
        1
      ),
      _vm._v(" "),
      _c(
        "fluro-panel",
        [
          _c("fluro-panel-title", [_vm._v("Add an Area Count")]),
          _vm._v(" "),
          _c("fluro-panel-body", [
            _c(
              "form",
              {
                on: {
                  submit: function($event) {
                    $event.preventDefault();
                    $event.stopPropagation();
                    return _vm.add()
                  }
                }
              },
              [
                _c(
                  "v-layout",
                  [
                    _c(
                      "v-flex",
                      [
                        _c("fluro-content-form", {
                          ref: "form",
                          attrs: { fields: _vm.fields },
                          model: {
                            value: _vm.proposed,
                            callback: function($$v) {
                              _vm.proposed = $$v;
                            },
                            expression: "proposed"
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "v-flex",
                      { attrs: { shrink: "" } },
                      [
                        _c(
                          "v-btn",
                          {
                            attrs: {
                              type: "submit",
                              color: "primary",
                              disabled: _vm.disableAdd
                            },
                            on: {
                              click: function($event) {
                                return _vm.add()
                              }
                            }
                          },
                          [_vm._v("Add")]
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
          ])
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
    inject("data-v-eb82d1a8_0", { source: "/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.ghost-dragging-class {\n  opacity: 0.5;\n  background: #c8ebfb;\n}\n\n/*# sourceMappingURL=AreaCountManager.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/edit/components/AreaCountManager.vue","AreaCountManager.vue"],"names":[],"mappings":"AAqJA,GAAA;AAYA;EACA,yCAAA;AC/JA;ADkKA;EACA,2CAAA;AC/JA;ADkKA;EACA,4CAAA;AC/JA;ADkKA;EACA,0CAAA;AC/JA;;ADuKA,GAAA;AACA;EACA,YAAA;EACA,mBAAA;ACpKA;;AAEA,+CAA+C","file":"AreaCountManager.vue","sourcesContent":["<template>\n                <div>\n                                <list-group>\n                                                <list-group-item v-for=\"(area, index) in model\" class=\"pa-3\" :key=\"JSON.stringify(area)\">\n                                                                <v-layout align-center>\n                                                                                <v-flex>\n                                                                                                <fluro-content-form ref=\"form\" v-model=\"model[index]\" :fields=\"fields\" />\n                                                                                </v-flex>\n                                                                                <v-flex shrink class=\"ml-3\">\n                                                                                                <fluro-confirm-button @click=\"remove(index)\" content=\"Remove\">\n                                                                                                                <template v-slot:default=\"{ confirming }\">\n                                                                                                                                <v-btn flat block :color=\"confirming ? 'red' : ''\" style=\"transition: all 0.1s;width:100%;\">{{\n                                                                                                                                                confirming ? \"Confirm?\" : \"Remove\"\n                                                                                                                                                }}</v-btn>\n                                                                                                                </template>\n                                                                                                </fluro-confirm-button>\n                                                                                </v-flex>\n                                                                </v-layout>\n                                                </list-group-item>\n                                </list-group>\n                                <fluro-panel>\n                                                <fluro-panel-title>Add an Area Count</fluro-panel-title>\n                                                <fluro-panel-body>\n                                                                <form @submit.prevent.stop=\"add()\">\n                                                                                <v-layout>\n                                                                                                <v-flex>\n                                                                                                                <fluro-content-form ref=\"form\" v-model=\"proposed\" :fields=\"fields\" /> <!-- :options=\"options\" -->\n                                                                                                </v-flex>\n                                                                                                <v-flex shrink>\n                                                                                                                <v-btn type=\"submit\" color=\"primary\" @click=\"add()\" :disabled=\"disableAdd\">Add</v-btn>\n                                                                                                </v-flex>\n                                                                                </v-layout>\n                                                                </form>\n                                                </fluro-panel-body>\n                                </fluro-panel>\n                                <!-- <pre>{{proposed}}</pre> -->\n                                <!-- <v-layout>\n            <v-flex xs12 sm5>\n                <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.title\" v-model=\"model\"></fluro-content-form-field>\n            </v-flex>\n            <v-flex xs12 sm5>\n                <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.title\" v-model=\"model\"></fluro-content-form-field>\n            </v-flex>\n            <v-flex xs12 sm2>\n                <v-btn>Add</v-btn>\n            </v-flex>\n        </v-layout> -->\n                </div>\n</template>\n<script>\nimport FluroContentForm from 'src/components/form/FluroContentForm.vue';\nimport FluroConfirmButton from 'src/components/ui/FluroConfirmButton.vue';\nimport draggable from 'vuedraggable';\n\n\nexport default {\n                props: {\n                                value: {\n                                                type: Array,\n                                                default: function() {\n                                                                return [];\n                                                }\n                                }\n                },\n                components: {\n                                FluroContentForm,\n                                FluroConfirmButton,\n                                draggable,\n\n\n                },\n                data() {\n                                return {\n                                                model: this.value,\n                                                proposed: {},\n                                                dragOptions: {},\n                                                drag: false,\n                                }\n                },\n                methods: {\n                                add() {\n\n\n                                                var clone = JSON.parse(JSON.stringify(this.proposed));\n\n                                                if (!clone.name || !clone.name.length || !clone.count || (clone.count < 0)) {\n                                                                return;\n                                                }\n\n                                                delete clone.row;\n\n\n\n                                                this.model.push(clone);\n\n                                                this.proposed = {};\n                                },\n                                remove(index) {\n                                                this.model.splice(index, 1);\n                                }\n                },\n                computed: {\n                                fields() {\n\n\n                                                var self = this;\n                                                var array = [];\n\n                                                ///////////////////////////////////\n\n                                                addField('row', {\n                                                                type: 'group',\n                                                                sameLine: true,\n                                                                fields: [{\n                                                                                                title: 'Area Name',\n                                                                                                minimum: 1,\n                                                                                                maximum: 1,\n                                                                                                type: 'string',\n                                                                                                key: 'name',\n                                                                                },\n                                                                                {\n                                                                                                title: 'Count',\n                                                                                                minimum: 1,\n                                                                                                maximum: 1,\n                                                                                                type: 'number',\n                                                                                                key: 'count',\n                                                                                },\n                                                                ]\n                                                });\n\n                                                ///////////////////////////////////\n\n                                                function addField(key, details) {\n                                                                details.key = key;\n                                                                array.push(details)\n                                                }\n\n                                                return array;\n                                },\n                                disableAdd() {\n                                                var self = this;\n                                                return (!self.proposed.name || !self.proposed.name.length || !self.proposed.count || (self.proposed.count < 0));\n                                }\n                }\n}\n\n</script>\n<style lang=\"scss\">\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n.ghost-dragging-class {\n                opacity: 0.5;\n                background: #c8ebfb;\n}\n\n</style>\n","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.ghost-dragging-class {\n  opacity: 0.5;\n  background: #c8ebfb;\n}\n\n/*# sourceMappingURL=AreaCountManager.vue.map */"]}, media: undefined });

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

//

var script$1 = {
  components: {
    AreaCountManager: __vue_component__
  },

  created() {},

  mixins: [FluroContentEditMixin],
  computed: {
    fieldsOutput() {
      var array = []; ///////////////////////////////////

      addField('title', {
        title: 'Title',
        minimum: 0,
        maximum: 1,
        type: 'string',
        placeholder: 'Optional Title'
      });
      addField('event', {
        title: 'Event',
        minimum: 1,
        maximum: 1,
        type: 'reference',
        params: {
          restrictType: 'event'
        }
      });
      addField('count', {
        title: 'Event Total',
        description: 'Number of people counted in total for this event',
        minimum: 0,
        maximum: 1,
        type: 'number'
      });
      addField('body', {
        title: 'Information, Notes and Comments',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'wysiwyg'
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
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function() {
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
                        _c("fluro-content-form-field", {
                          attrs: {
                            "form-fields": _vm.formFields,
                            outline: _vm.showOutline,
                            options: _vm.options,
                            field: _vm.fieldHash.event
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
                        _c("fluro-content-form-field", {
                          attrs: {
                            "form-fields": _vm.formFields,
                            outline: _vm.showOutline,
                            options: _vm.options,
                            field: _vm.fieldHash.count
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
                        _c("br", { staticClass: "mt-3 mb-5" }),
                        _vm._v(" "),
                        _c("h4", { staticClass: "ml-3" }, [
                          _vm._v("Area Counts")
                        ]),
                        _vm._v(" "),
                        _c("p", { staticClass: "ml-3" }, [
                          _vm._v("Add counts for individual rooms/areas")
                        ]),
                        _vm._v(" "),
                        _c("area-count-manager", {
                          model: {
                            value: _vm.model.areas,
                            callback: function($$v) {
                              _vm.$set(_vm.model, "areas", $$v);
                            },
                            expression: "model.areas"
                          }
                        }),
                        _vm._v(" "),
                        _c("br", { staticClass: "my-4" }),
                        _vm._v(" "),
                        _c("fluro-content-form-field", {
                          attrs: {
                            "form-fields": _vm.formFields,
                            outline: _vm.showOutline,
                            options: _vm.options,
                            field: _vm.fieldHash.body
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
                          ? [
                              _c("br", { staticClass: "mt-3 mb-4" }),
                              _vm._v(" "),
                              _c("h2", [
                                _vm._v(
                                  _vm._s(_vm.definition.title + " Information")
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
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = function (inject) {
    if (!inject) return
    inject("data-v-32105e3b_0", { source: "/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.no-border-no-background .toggle-item {\n  border: none !important;\n  background: none !important;\n  font-size: 14px;\n  padding: 0px;\n}\n\n/*# sourceMappingURL=attendance.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/edit/panels/attendance.vue","attendance.vue"],"names":[],"mappings":"AAgIA,GAAA;AAYA;EACA,yCAAA;AC1IA;AD6IA;EACA,2CAAA;AC1IA;AD6IA;EACA,4CAAA;AC1IA;AD6IA;EACA,0CAAA;AC1IA;;ADkJA,GAAA;AACA;EACA,uBAAA;EACA,2BAAA;EACA,eAAA;EACA,YAAA;AC/IA;;AAEA,yCAAyC","file":"attendance.vue","sourcesContent":["<template>\n    <flex-column>\n        <template v-if=\"loading\">\n            <fluro-page-preloader contain />\n        </template>\n        <template v-else>\n            <flex-column-body style=\"background: #fafafa;\">\n                <v-container fluid>\n                    <constrain sm>\n                        <!--  -->\n                        <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.title\" v-model=\"model\"></fluro-content-form-field>\n                        <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.event\" v-model=\"model\"></fluro-content-form-field>\n                        <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.count\" v-model=\"model\"></fluro-content-form-field>\n                        <br class=\"mt-3 mb-5\">\n                        \n                        <!-- -->\n                        <h4 class=\"ml-3\">Area Counts</h4>\n                        <p class=\"ml-3\">Add counts for individual rooms/areas</p>\n                        <area-count-manager v-model=\"model.areas\" />\n                        <br class=\"my-4\">\n                        <!--  -->\n                        <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.body\" v-model=\"model\"></fluro-content-form-field>\n                        <template v-if=\"definition && definition.fields && definition.fields.length\">\n                            <br class=\"mt-3 mb-4\">\n                            <h2>{{`${definition.title} Information`}}</h2>\n                            <fluro-content-form :options=\"options\" v-model=\"model.data\" :fields=\"definition.fields\" />\n                        </template>\n                    </constrain>\n                </v-container>\n            </flex-column-body>\n            </tabset>\n        </template>\n    </flex-column>\n</template>\n<script>\n/////////////////////////////////\n\n\nimport FluroContentEditMixin from 'src/components/content/edit/FluroContentEditMixin.js';\nimport AreaCountManager from 'src/components/content/edit/components/AreaCountManager.vue';\n\n\n/////////////////////////////////\n\nimport Vue from 'vue';\n\n/////////////////////////////////\n\nexport default {\n    components: {\n        AreaCountManager,\n    },\n    created() {},\n    mixins: [FluroContentEditMixin],\n    computed: {\n        fieldsOutput() {\n\n\n            var self = this;\n            var array = [];\n\n            ///////////////////////////////////\n\n            addField('title', {\n                title: 'Title',\n                minimum: 0,\n                maximum: 1,\n                type: 'string',\n                placeholder: 'Optional Title',\n            });\n\n\n            addField('event', {\n                title: 'Event',\n                minimum: 1,\n                maximum: 1,\n                type: 'reference',\n                params: {\n                    restrictType: 'event',\n                },\n            });\n\n\n            addField('count', {\n                title: 'Event Total',\n                description: 'Number of people counted in total for this event',\n                minimum: 0,\n                maximum: 1,\n                type: 'number',\n            })\n\n            addField('body', {\n                title: 'Information, Notes and Comments',\n                minimum: 0,\n                maximum: 1,\n                type: 'string',\n                directive: 'wysiwyg'\n            })\n\n            ///////////////////////////////////\n\n            function addField(key, details) {\n                details.key = key;\n                array.push(details)\n            }\n\n            return array;\n\n\n        },\n    },\n    methods: {\n        toggleAutoGraduate() {\n            var self = this;\n            if (!self.model.autoGraduate) {\n                self.model.autoGraduate = true;\n            } else {\n                self.model.autoGraduate = false;\n            }\n        }\n    },\n    data() {\n        return {}\n    },\n}\n</script>\n<style lang=\"scss\">\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n.no-border-no-background .toggle-item {\n    border: none !important;\n    background: none !important;\n    font-size: 14px;\n    padding: 0px;\n}\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.no-border-no-background .toggle-item {\n  border: none !important;\n  background: none !important;\n  font-size: 14px;\n  padding: 0px;\n}\n\n/*# sourceMappingURL=attendance.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$1 = __vue_normalize__(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    __vue_create_injector__,
    undefined,
    undefined
  );

export default __vue_component__$1;
//# sourceMappingURL=attendance-063a5509.js.map
