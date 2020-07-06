
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { bm as __vue_normalize__, bn as __vue_create_injector__, r as FluroConfirmButton, bo as _, ai as FilterConditionGroup } from './index-39660ab3.js';
import 'vue';
import 'vuedraggable';
import 'vue-color';
import 'signature_pad';
import { FilterService } from 'fluro';
import 'vuex-map-fields';
import 'async';
import 'tippy.js';
import 'tiptap';
import 'tiptap-commands';
import 'tiptap-extensions';
import 'moment';
import { F as FluroContentEditMixin } from './FluroContentEditMixin-ff706667.js';

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script = {
  props: {
    options: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      model: this.value,
      expanded: false
    };
  },

  watch: {
    'model': function (val) {
      return this.$emit('pathupdated', val);
    },
    'value': function (val) {
      this.model = val;
    }
  },
  methods: {
    toggle() {
      this.expanded = !this.expanded;
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
        "v-layout",
        { attrs: { row: "" } },
        [
          _c(
            "v-flex",
            { attrs: { "pr-0": "" } },
            [
              _c("v-select", {
                staticStyle: { overflow: "hidden", "white-space": "nowrap" },
                attrs: {
                  items: _vm.options,
                  label: "Key Value",
                  "item-value": "key",
                  "item-text": "title",
                  loading: _vm.loading ? "primary" : false
                },
                scopedSlots: _vm._u([
                  {
                    key: "selection",
                    fn: function(ref) {
                      var item = ref.item;
                      return [
                        _c(
                          "span",
                          {
                            staticStyle: {
                              overflow: "hidden",
                              "white-space": "nowrap"
                            }
                          },
                          [_vm._v(_vm._s(item.title))]
                        )
                      ]
                    }
                  }
                ]),
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
            { attrs: { shrink: "", "px-0": "" } },
            [
              _c(
                "v-btn",
                {
                  staticStyle: { height: "44px" },
                  attrs: { flat: "", block: "" },
                  on: { click: _vm.toggle }
                },
                [
                  _c("fluro-icon", {
                    attrs: {
                      icon: _vm.expanded ? "chevron-down" : "chevron-left"
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
      ),
      _vm._v(" "),
      _vm.expanded
        ? _c(
            "div",
            { staticClass: "dropdown-box py-0" },
            [
              _c("v-text-field", {
                attrs: { "single-line": "" },
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
        : _vm._e(),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "muted mb-0",
          style: _vm.expanded ? "margin-top: -18px" : "margin-top: -30px"
        },
        [_vm._v("\n    \t" + _vm._s(_vm.model) + "\n    ")]
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
    inject("data-v-f55f83d6_0", { source: "/**/\n.border-top[data-v-f55f83d6] {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right[data-v-f55f83d6] {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom[data-v-f55f83d6] {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left[data-v-f55f83d6] {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.dropdown-box[data-v-f55f83d6] {\n  width: 100%;\n  margin-top: -44px;\n}\n\n/*# sourceMappingURL=PathSelector.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/edit/components/PathSelector.vue","PathSelector.vue"],"names":[],"mappings":"AA+DA,GAAA;AAYA;EACA,yCAAA;ACzEA;AD4EA;EACA,2CAAA;ACzEA;AD4EA;EACA,4CAAA;ACzEA;AD4EA;EACA,0CAAA;ACzEA;;ADiFA,GAAA;AACA;EACA,WAAA;EACA,iBAAA;AC9EA;;AAEA,2CAA2C","file":"PathSelector.vue","sourcesContent":["<template>\n    <div>\n        <v-layout row>\n            <v-flex pr-0>\n                <v-select v-model=\"model\" :items=\"options\" label=\"Key Value\" item-value=\"key\" item-text=\"title\" :loading=\"loading ? 'primary' : false\" style=\"overflow: hidden;white-space:nowrap\">\n                    <template v-slot:selection=\"{ item }\" style=\"overflow: hidden;white-space:nowrap\">\n                        <span style=\"overflow: hidden;white-space:nowrap\">{{ item.title }}</span>\n                    </template>\n                </v-select>\n            </v-flex>\n            <v-flex shrink px-0>\n                <v-btn @click=\"toggle\" flat block style=\"height: 44px\">\n                    <fluro-icon :icon=\"expanded ? 'chevron-down' : 'chevron-left'\" />\n                </v-btn>\n            </v-flex>\n        </v-layout>\n        <div class=\"dropdown-box py-0\" v-if=\"expanded\">\n            <v-text-field single-line v-model=\"model\"></v-text-field>\n        </div>\n        <div class=\"muted mb-0\" :style=\"expanded ? 'margin-top: -18px' : 'margin-top: -30px'\">\n        \t{{model}}\n        </div>\n    </div>\n</template>\n<script>\nexport default {\n    props: {\n        options: {\n            type: Array,\n            required: true,\n        },\n        loading: {\n            type: Boolean,\n            default: false,\n        },\n        value: {\n            type: String,\n            required: true,\n        },\n    },\n    data() {\n        return {\n            model: this.value,\n            expanded: false,\n        }\n    },\n    watch: {\n    \t'model': function(val) {\n    \t\treturn this.$emit('pathupdated', val)\n    \t},\n    \t'value': function(val) {\n    \t\tthis.model = val;\n    \t}\n    },\n    methods: {\n        toggle() {\n            this.expanded = !this.expanded;\n        }\n    }\n}\n</script>\n<style scoped lang=\"scss\">\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n.dropdown-box {\n    width: 100%;\n    margin-top: -44px\n}\n\n.hint-box {\n\t\n}\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.dropdown-box {\n  width: 100%;\n  margin-top: -44px;\n}\n\n/*# sourceMappingURL=PathSelector.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-f55f83d6";
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
  mixins: [FluroContentEditMixin],
  props: {
    value: {
      type: Array,
      default: function () {
        return [];
      }
    },
    sampleData: {
      type: Array,
      default: function () {
        return [];
      }
    },
    config: {
      type: Object
    },
    loadingSample: {
      type: Boolean,
      default: false
    }
  },

  created() {},

  components: {
    FluroConfirmButton,
    PathSelector: __vue_component__
  },

  data() {
    return {
      model: this.value,
      proposed: {
        title: '',
        key: ''
      }
    };
  },

  methods: {
    add() {
      var self = this;
      var clone = JSON.parse(JSON.stringify(self.proposed));
      this.model.push(clone);
      self.$set(self, "proposed", {
        title: '',
        key: ''
      });
    },

    proposedPathUpdated(value) {
      this.proposed.key = value;
    },

    pathUpdated(index, value) {
      this.model[index].key = value;
    },

    remove(index) {
      this.model.splice(index, 1);
    },

    extract(model) {
      var self = this;
      var item = this.flatten(model);
      return _.chain(item).map(function (value, key) {
        var depth = key.split('.').length;

        _.times(depth - 1, function () {
        });

        var matchObject = _.get(model, key);

        var readable = key + ' - ' + value; /////////////////////////

        if (_.isArray(matchObject)) {
          readable = key + ' (multiple items)';
        }

        if (_.isString(matchObject)) {
          var momentDate = self.$fluro.date.moment(matchObject, self.$fluro.date.moment.ISO_8601, true);
          var isValid = momentDate.isValid();

          if (isValid) {
            matchObject = momentDate.toDate();
          }
        }

        if (_.isDate(matchObject)) ; /////////////////////////


        return {
          //value: value,
          key: key,
          //depth: depth,
          //type: type,
          //indent: indent,
          title: readable
        };
      }).sortBy(function (entry) {
        return entry.title;
      }).value();
    },

    flatten(obj) {
      var flattened = {};
      var circlular = [];
      var circLoc = [];

      function _route(prefix, value) {
        var i, len, keys, circularCheck, loc;

        if (value == null) {
          if (prefix === "") {
            return;
          }

          flattened[prefix] = null;
          return;
        }

        if (typeof value == "object") {
          circularCheck = circlular.indexOf(value);

          if (circularCheck >= 0) {
            loc = circLoc[circularCheck] || "this";
            flattened[prefix] = "[Circular (" + loc + ")]";
            return;
          }

          circlular.push(value);
          circLoc.push(prefix);

          if (Array.isArray(value)) {
            len = value.length;

            _route(prefix); //Dont loop if the array is massive


            if (len > 10) {
              len = 10;
            }

            for (i = 0; i < len; i++) {
              _route(prefix + "[" + i + "]", value[i]);
            }

            return;
          }

          keys = Object.keys(value);
          len = keys.length;
          if (prefix) prefix = prefix + ".";
          if (len == 0) _route(prefix, null);

          for (i = 0; i < len; i++) {
            _route(prefix + keys[i], value[keys[i]]);
          }

          return;
        }

        flattened[prefix] = value;
      }

      _route("", obj);

      return flattened;
    }

  },
  computed: {
    fieldsOutput() {
      var array = []; ///////////////////////////////////

      addField("title", {
        title: "Column Title",
        minimum: 0,
        maximum: 1,
        type: "string"
      }); ///////////////////////////////////

      function addField(key, details) {
        details.key = key;
        array.push(details);
      }

      return array;
    },

    sampleQuery() {
      var self = this;

      if (!self.sampleData.length) {
        return [];
      }

      return _.chain(self.sampleData).reduce(function (set, item) {
        //We have the column
        var columns = self.extract(item);

        _.each(columns, function (column) {
          var existing = set[column.key];

          if (!existing) {
            existing = set[column.key] = column;
            existing.examples = [];
          } //add the examples


          if (existing.examples.indexOf(column.value) == -1) {
            existing.examples.push(column.value);
          }
        });

        return set;
      }, {}).values() // .reduce(function(obj) {
      //     return {title: obj.readable, key: obj.key};
      // })
      .value();
    },

    columnKeyOptions() {
      var self = this;

      if (!self.sampleQuery || !self.sampleQuery.length) {
        return [];
      }

      var res = JSON.parse(JSON.stringify(self.sampleQuery));
      res.splice(0, 0, {
        title: 'Select a Data Source',
        key: ''
      });
      return res;
    }

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
    "div",
    [
      _c(
        "list-group",
        _vm._l(_vm.model, function(column, index) {
          return _c(
            "list-group-item",
            [
              _c(
                "v-container",
                { attrs: { fluid: "", "grid-list-xl": "" } },
                [
                  _c(
                    "v-layout",
                    { attrs: { "align-start": "", row: "", wrap: "" } },
                    [
                      _c(
                        "v-flex",
                        {
                          staticClass: "full-width",
                          attrs: { sm10: "", xs12: "", "pa-1": "" }
                        },
                        [
                          _c(
                            "v-layout",
                            { attrs: { "align-start": "", row: "", wrap: "" } },
                            [
                              _c(
                                "v-flex",
                                { attrs: { sm4: "", xs12: "" } },
                                [
                                  _c("fluro-content-form-field", {
                                    attrs: {
                                      "form-fields": _vm.formFields,
                                      outline: _vm.showOutline,
                                      options: _vm.options,
                                      field: _vm.fieldHash.title
                                    },
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
                                { attrs: { sm8: "", xs12: "" } },
                                [
                                  _c("path-selector", {
                                    attrs: {
                                      options: _vm.columnKeyOptions,
                                      loading: _vm.loadingSample
                                    },
                                    on: {
                                      pathupdated: function($event) {
                                        var i = arguments.length,
                                          argsArray = Array(i);
                                        while (i--) argsArray[i] = arguments[i];
                                        return _vm.pathUpdated.apply(
                                          void 0,
                                          [index].concat(argsArray)
                                        )
                                      }
                                    },
                                    model: {
                                      value: _vm.model[index].key,
                                      callback: function($$v) {
                                        _vm.$set(_vm.model[index], "key", $$v);
                                      },
                                      expression: "model[index].key"
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
                      ),
                      _vm._v(" "),
                      _c(
                        "v-flex",
                        {
                          staticClass: "full-width",
                          attrs: { sm2: "", xs12: "", "pa-1": "" }
                        },
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
                  "v-container",
                  { attrs: { fluid: "", "grid-list-xl": "", "pa-1": "" } },
                  [
                    _c(
                      "v-layout",
                      { attrs: { row: "", wrap: "", "grid-list-xl": "" } },
                      [
                        _c(
                          "v-flex",
                          { attrs: { sm10: "", xs12: "" } },
                          [
                            _c(
                              "v-layout",
                              { attrs: { row: "", wrap: "" } },
                              [
                                _c(
                                  "v-flex",
                                  { attrs: { sm4: "", xs12: "" } },
                                  [
                                    _c("fluro-content-form-field", {
                                      attrs: {
                                        "form-fields": _vm.formFields,
                                        outline: _vm.showOutline,
                                        options: _vm.options,
                                        field: _vm.fieldHash.title
                                      },
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
                                  { attrs: { sm8: "", xs12: "" } },
                                  [
                                    _c("path-selector", {
                                      attrs: {
                                        options: _vm.columnKeyOptions,
                                        loading: _vm.loadingSample
                                      },
                                      on: {
                                        pathupdated: _vm.proposedPathUpdated
                                      },
                                      model: {
                                        value: _vm.proposed.key,
                                        callback: function($$v) {
                                          _vm.$set(_vm.proposed, "key", $$v);
                                        },
                                        expression: "proposed.key"
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
                        ),
                        _vm._v(" "),
                        _c(
                          "v-flex",
                          { attrs: { sm2: "", xs12: "" } },
                          [
                            _c(
                              "v-btn",
                              {
                                attrs: {
                                  block: "",
                                  color: "primary",
                                  type: "submit",
                                  disabled: !_vm.proposed.key
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
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = function (inject) {
    if (!inject) return
    inject("data-v-23816c24_0", { source: "/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.full-width {\n  width: 100%;\n}\n\n/*# sourceMappingURL=ColumnCustomiser.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/edit/components/ColumnCustomiser.vue","ColumnCustomiser.vue"],"names":[],"mappings":"AAmTA,GAAA;AAYA;EACA,yCAAA;AC7TA;ADgUA;EACA,2CAAA;AC7TA;ADgUA;EACA,4CAAA;AC7TA;ADgUA;EACA,0CAAA;AC7TA;;ADqUA,GAAA;AACA;EACA,WAAA;AClUA;;AAEA,+CAA+C","file":"ColumnCustomiser.vue","sourcesContent":["<template>\n    <div>\n        <list-group>\n            <list-group-item v-for=\"(column, index) in model\">\n                <v-container fluid grid-list-xl>\n                    <v-layout align-start row wrap>\n                        <v-flex sm10 xs12 pa-1 class=\"full-width\">\n                            <v-layout align-start row wrap>\n                                <v-flex sm4 xs12>\n                                    <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" :options=\"options\" :field=\"fieldHash.title\" v-model=\"model[index]\">\n                                    </fluro-content-form-field>\n                                </v-flex>\n                                <v-flex sm8 xs12>\n                                    <path-selector v-model=\"model[index].key\" :options=\"columnKeyOptions\" :loading=\"loadingSample\" @pathupdated=\"pathUpdated(index, ...arguments)\" />\n                                </v-flex>\n                                <!-- <v-flex sm8 xs12>\n                                    <v-select/>\n                                </v-flex> -->\n                            </v-layout>\n                        </v-flex>\n                        <v-flex sm2 xs12 pa-1 class=\"full-width\">\n                            <fluro-confirm-button @click=\"remove(index)\" content=\"Remove\">\n                                <template v-slot:default=\"{ confirming }\">\n                                    <v-btn flat block :color=\"confirming ? 'red' : ''\" style=\"transition: all 0.1s;width:100%;\">{{\n                                        confirming ? \"Confirm?\" : \"Remove\"\n                                        }}</v-btn>\n                                </template>\n                            </fluro-confirm-button>\n                        </v-flex>\n                    </v-layout>\n                </v-container>\n            </list-group-item>\n        </list-group>\n        <fluro-panel>\n            <fluro-panel-body>\n                <form @submit.prevent.stop=\"add()\">\n                    <v-container fluid grid-list-xl pa-1>\n                        <v-layout row wrap grid-list-xl>\n                            <v-flex sm10 xs12>\n                                <v-layout row wrap>\n                                    <v-flex sm4 xs12>\n                                        <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" :options=\"options\" :field=\"fieldHash.title\" v-model=\"proposed\">\n                                        </fluro-content-form-field>\n                                    </v-flex>\n                                    <v-flex sm8 xs12>\n                                        <path-selector v-model=\"proposed.key\" :options=\"columnKeyOptions\" @pathupdated=\"proposedPathUpdated\" :loading=\"loadingSample\"/>\n                                    </v-flex>\n                                </v-layout>\n                            </v-flex>\n                            <v-flex sm2 xs12>\n                                <v-btn block color=\"primary\" type=\"submit\" @click=\"add()\" :disabled=\"!proposed.key\">Add</v-btn>\n                            </v-flex>\n                        </v-layout>\n                    </v-container>\n                </form>\n            </fluro-panel-body>\n        </fluro-panel>\n    </div>\n</template>\n<script>\nimport FluroConfirmButton from \"src/components/ui/FluroConfirmButton.vue\";\nimport FluroContentEditMixin from \"src/components/content/edit/FluroContentEditMixin.js\";\nimport PathSelector from \"src/components/content/edit/components/PathSelector.vue\";\nimport _ from 'lodash';\n\nexport default {\n    mixins: [FluroContentEditMixin],\n    props: {\n        value: {\n            type: Array,\n            default: function() {\n                return [];\n            }\n        },\n        sampleData: {\n            type: Array,\n            default: function() {\n                return [];\n            }\n        },\n        config: {\n            type: Object\n        },\n        loadingSample: {\n            type: Boolean,\n            default: false\n        }\n    },\n    created() {},\n    components: { FluroConfirmButton, PathSelector },\n    data() {\n        return {\n            model: this.value,\n            proposed: { title: '', key: '' },\n        };\n    },\n    methods: {\n        add() {\n            var self = this;\n            var clone = JSON.parse(JSON.stringify(self.proposed));\n\n            this.model.push(clone);\n            self.$set(self, \"proposed\", { title: '', key: '' });\n        },\n        proposedPathUpdated(value) {\n            this.proposed.key = value;\n        },\n        pathUpdated(index, value) {\n            this.model[index].key = value;\n        },\n        remove(index) {\n            this.model.splice(index, 1);\n        },\n        extract(model) {\n\n            var self = this;\n\n            var item = this.flatten(model);\n            return _.chain(item)\n                .map(function(value, key) {\n\n                    var depth = key.split('.').length;\n                    var indent = '';\n\n                    _.times(depth - 1, function() {\n                        indent += '\\u00A0\\u00A0\\u00A0\\u00A0\\u00A0\\u00A0';\n                    });\n\n                    var matchObject = _.get(model, key);\n                    var type = (typeof matchObject);\n\n                    /////////////////////////\n\n                    var readable = key + ' - ' + value;\n\n                    /////////////////////////\n\n                    if (_.isArray(matchObject)) {\n                        type = 'array';\n                        readable = key + ' (multiple items)';\n                    }\n\n                    if (_.isString(matchObject)) {\n                        var momentDate = self.$fluro.date.moment(matchObject, self.$fluro.date.moment.ISO_8601, true);\n                        var isValid = momentDate.isValid();\n                        if (isValid) {\n                            matchObject = momentDate.toDate();\n                        }\n                    }\n                    if (_.isDate(matchObject)) {\n                        type = 'date';\n                    }\n\n\n\n                    /////////////////////////\n\n                    return {\n                        //value: value,\n                        key: key,\n                        //depth: depth,\n                        //type: type,\n                        //indent: indent,\n                        title: readable,\n                    };\n                })\n                .sortBy(function(entry) {\n                    return entry.title;\n                })\n                .value();\n        },\n        flatten(obj) {\n            var flattened = {}\n\n            var circlular = []\n            var circLoc = []\n\n            function _route(prefix, value) {\n                var i, len, type, keys, circularCheck, loc\n\n                if (value == null) {\n                    if (prefix === \"\") {\n                        return\n                    }\n                    flattened[prefix] = null\n                    return\n                }\n                type = typeof value\n                if (typeof value == \"object\") {\n                    circularCheck = circlular.indexOf(value)\n                    if (circularCheck >= 0) {\n                        loc = circLoc[circularCheck] || \"this\"\n                        flattened[prefix] = \"[Circular (\" + loc + \")]\"\n                        return\n                    }\n                    circlular.push(value)\n                    circLoc.push(prefix)\n\n                    if (Array.isArray(value)) {\n                        len = value.length\n\n\n\n\n\n                        _route(prefix);\n\n\n                        //Dont loop if the array is massive\n                        if (len > 10) {\n                            len = 10;\n                        }\n\n                        for (i = 0; i < len; i++) {\n                            _route(prefix + \"[\" + i + \"]\", value[i])\n                        }\n\n                        return\n                    }\n\n                    keys = Object.keys(value)\n                    len = keys.length\n                    if (prefix) prefix = prefix + \".\"\n                    if (len == 0) _route(prefix, null)\n\n                    for (i = 0; i < len; i++) {\n                        _route(prefix + keys[i], value[keys[i]])\n                    }\n                    return\n                }\n                flattened[prefix] = value\n            }\n\n            _route(\"\", obj)\n\n            return flattened\n        }\n    },\n    computed: {\n        fieldsOutput() {\n            var self = this;\n            var array = [];\n\n            ///////////////////////////////////\n\n            addField(\"title\", {\n                title: \"Column Title\",\n                minimum: 0,\n                maximum: 1,\n                type: \"string\"\n            });\n\n            ///////////////////////////////////\n\n            function addField(key, details) {\n                details.key = key;\n                array.push(details);\n            }\n\n            return array;\n        },\n        sampleQuery() {\n            var self = this;\n            if (!self.sampleData.length) {\n                return [];\n            }\n            return _.chain(self.sampleData)\n                .reduce(function(set, item) {\n\n                    //We have the column\n                    var columns = self.extract(item);\n\n                    _.each(columns, function(column) {\n                        var existing = set[column.key];\n                        if (!existing) {\n                            existing = set[column.key] = column;\n                            existing.examples = [];\n                        }\n\n                        //add the examples\n                        if (existing.examples.indexOf(column.value) == -1) {\n                            existing.examples.push(column.value)\n                        }\n                    })\n\n                    return set;\n                }, {})\n                .values()\n                // .reduce(function(obj) {\n                //     return {title: obj.readable, key: obj.key};\n                // })\n                .value();\n        },\n        columnKeyOptions() {\n            var self = this;\n            if (!self.sampleQuery || !self.sampleQuery.length) {\n                return [];\n            }\n            var res = JSON.parse(JSON.stringify(self.sampleQuery));\n            res.splice(0, 0, { title: 'Select a Data Source', key: '' });\n            return res;\n        }\n    },\n};\n</script>\n<style lang=\"scss\">\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n.full-width {\n    width: 100%;\n}\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.full-width {\n  width: 100%;\n}\n\n/*# sourceMappingURL=ColumnCustomiser.vue.map */"]}, media: undefined });

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

//

var script$2 = {
  mixins: [FluroContentEditMixin],
  components: {
    FilterConditionGroup,
    ColumnCustomiser: __vue_component__$1
  },
  methods: {
    modelUpdated() {
      this.update(this.model);
    },

    reloadSample() {
      var self = this; //return;
      //////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////

      if (!self.model.filterType) {
        console.log('NO FILTER TYPE');
        return;
      } //////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////


      self.loadingSample = true; // return new Promise(function(resolve, reject) {
      // if (self.model._id) {
      //     return self.$fluro.api.get(`/content/_query/${self.model._id}`)
      //         .then(sampleLoaded)
      //         .catch(sampleFailed);
      // } else {
      //Run a dynamic query and get the sample data

      return self.$fluro.api.post(`/content/${self.model.filterType}/filter`, {
        // sort: self.sort,
        filter: self.model.filterConfiguration,
        startDate: self.model.filterStartDate,
        endDate: self.model.filterEndDate,
        search: self.model.filterSearch,
        // includeArchived: self.includeArchivedByDefault,
        allDefinitions: true,
        //self.allDefinitions,
        // includeUnmatched: true,
        sample: true,
        limit: 5
      }).then(sampleLoaded).catch(sampleFailed); // }
      //////////////////////////////////////////////////////////////////////////////

      function sampleLoaded(res) {
        self.sample = res.data;
        self.loadingSample = false;
      } //////////////////////////////////////////////////////////////////////////////


      function sampleFailed(res) {
        // console.log('SAMPLE FAILED', res)
        self.sample = [];
        self.loadingSample = false;
      } // })

    }

  },

  created() {
    var self = this;

    if (!this.model.filterConfiguration) {
      this.model.filterConfiguration = {};
    }

    self.reloadSample();
  },

  watch: {
    changeString() {
      var self = this;
      self.reloadSample();
    }

  },
  asyncComputed: {
    typeOptions: {
      default: [],

      get() {
        var self = this;

        if (self.model.query) {
          return new Promise(function (resolve, reject) {
            return reject();
          });
        }

        return new Promise(function (resolve, reject) {
          self.$fluro.types.terms().then(function (res) {
            //Map the types
            var mappedTypeOptions = _.chain(res).map(function (entry, key) {
              var label = entry.parentType ? `${self.$fluro.types.readable(entry.parentType)} - ${self.$fluro.types.readable(key)}` : `${self.$fluro.types.readable(key)}`;
              return {
                name: label,
                value: key,
                parentType: entry.parentType
              };
            }).orderBy('name').values().value();

            mappedTypeOptions.unshift({
              name: 'Anything',
              key: 'node',
              value: 'node'
            }); // console.log('MAPPED TYPES', mappedTypeOptions)
            //Resolve the array

            resolve(mappedTypeOptions);
          }).catch(function (err) {
            reject(err);
          });
        });
      }

    }
  },
  computed: {
    rows() {
      return [];
    },

    showOutline() {
      return false; //true; //false;//true;//false;//true;
    },

    fieldsOutput() {
      var self = this;
      var array = []; ///////////////////////////////////

      addField('title', {
        title: 'Title',
        minimum: 1,
        maximum: 1,
        type: 'string',
        placeholder: 'Eg. My Awesome List'
      });
      addField('firstLine', {
        title: 'Description',
        minimum: 0,
        maximum: 1,
        type: 'string',
        placeholder: 'Eg. A list of my favorite people'
      }); // console.log('TYPE OPTIONS', self.typeOptions);

      addField('filterType', {
        title: 'Type',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'select',
        description: 'The type of item you want to return from this query',
        options: self.typeOptions
      }); ///////////////////////////////////

      function addField(key, details) {
        details.key = key;
        array.push(details);
      }

      return array;
    },

    changeString() {
      var self = this;

      if (self.model.query) {
        return;
      }

      var filterString = FilterService.getFilterChangeString(self.model.filterConfiguration); // console.log('Filter configuration changed', filterString)

      return filterString;
    }

  },

  data() {
    return {
      sample: [],
      loadingSample: false,
      filterDebounce: 500
    };
  }

};

/* script */
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function() {
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
                { attrs: { heading: "Query Details" } },
                [
                  _vm._t("default", [
                    _c(
                      "flex-column-body",
                      { staticStyle: { background: "#fafafa" } },
                      [
                        _c(
                          "v-container",
                          [
                            _c(
                              "constrain",
                              { attrs: { sm: "" } },
                              [
                                _c("h3", { attrs: { margin: "" } }, [
                                  _vm._v("Query Details")
                                ]),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  { staticClass: "grid-list-xl" },
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
                                        field: _vm.fieldHash.firstLine
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
                                !_vm.model.query || _vm.model.filterType
                                  ? _c(
                                      "fluro-panel",
                                      [
                                        _c(
                                          "fluro-panel-title",
                                          [
                                            _vm.model.disableDataTypeSelect ||
                                            _vm.model._id
                                              ? [
                                                  _c("h4", [
                                                    _vm._v(
                                                      _vm._s(
                                                        _vm._f(
                                                          "definitionTitle"
                                                        )(
                                                          _vm.model.filterType,
                                                          true
                                                        )
                                                      ) + " "
                                                    )
                                                  ])
                                                ]
                                              : [
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
                                                            .filterType
                                                      },
                                                      on: { input: _vm.update },
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
                                                ]
                                          ],
                                          2
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "fluro-panel-body",
                                          [
                                            _c("filter-condition-group", {
                                              attrs: {
                                                rows: _vm.rows,
                                                useSample: true,
                                                mini: true,
                                                type: _vm.model.filterType,
                                                debounce: _vm.filterDebounce
                                              },
                                              model: {
                                                value:
                                                  _vm.model.filterConfiguration,
                                                callback: function($$v) {
                                                  _vm.$set(
                                                    _vm.model,
                                                    "filterConfiguration",
                                                    $$v
                                                  );
                                                },
                                                expression:
                                                  "model.filterConfiguration"
                                              }
                                            })
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
                        ),
                        _vm._v(" "),
                        _c(
                          "v-container",
                          { staticClass: "border-top" },
                          [
                            _c(
                              "constrain",
                              [
                                _c("h3", { attrs: { margin: "" } }, [
                                  _vm._v("Columns")
                                ]),
                                _vm._v(" "),
                                _c("column-customiser", {
                                  attrs: {
                                    sampleData: _vm.sample,
                                    config: _vm.config,
                                    loadingSample: _vm.loadingSample
                                  },
                                  model: {
                                    value: _vm.model.columns,
                                    callback: function($$v) {
                                      _vm.$set(_vm.model, "columns", $$v);
                                    },
                                    expression: "model.columns"
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
    ],
    2
  )
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  const __vue_inject_styles__$2 = function (inject) {
    if (!inject) return
    inject("data-v-0f4b4abf_0", { source: "/**/\n.border-top[data-v-0f4b4abf] {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right[data-v-0f4b4abf] {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom[data-v-0f4b4abf] {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left[data-v-0f4b4abf] {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.hint[data-v-0f4b4abf] {\n  font-size: 10px;\n  opacity: 0.5;\n  color: inherit;\n  display: block;\n}\n\n/*# sourceMappingURL=query.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/edit/panels/query.vue","query.vue"],"names":[],"mappings":"AAgWA,GAAA;AAYA;EACA,yCAAA;AC1WA;AD6WA;EACA,2CAAA;AC1WA;AD6WA;EACA,4CAAA;AC1WA;AD6WA;EACA,0CAAA;AC1WA;;ADkXA,GAAA;AACA;EACA,eAAA;EACA,YAAA;EACA,cAAA;EACA,cAAA;AC/WA;;AAEA,oCAAoC","file":"query.vue","sourcesContent":["<template>\n    <flex-column>\n        <template v-if=\"loading\">\n            <fluro-page-preloader contain />\n        </template>\n        <tabset v-else :justified=\"true\" :vertical=\"true\">\n            <tab heading=\"Query Details\">\n                <slot>\n                    <flex-column-body style=\"background: #fafafa;\">\n                        <v-container>\n                            <constrain sm>\n                                <h3 margin>Query Details</h3>\n                                <!-- <pre>{{model}}</pre> -->\n                                <div class=\"grid-list-xl\">\n                                    <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.title\" v-model=\"model\"></fluro-content-form-field>\n                                    <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.firstLine\" v-model=\"model\"></fluro-content-form-field>\n                                </div>\n\n\n                                <fluro-panel v-if=\"!model.query || model.filterType\">\n                                    <fluro-panel-title>\n                                        <template v-if=\"model.disableDataTypeSelect || model._id\">\n                                            <h4>{{model.filterType | definitionTitle(true)}} </h4>\n                                        </template>\n                                        <template v-else>\n                                            <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.filterType\" v-model=\"model\"></fluro-content-form-field>\n                                        </template>\n                                    </fluro-panel-title>\n                                    <fluro-panel-body>\n                                    \t<!-- <pre>{{model.filterConfiguration}}</pre> -->\n                                        <filter-condition-group :rows=\"rows\" :useSample=\"true\" :mini=\"true\" v-model=\"model.filterConfiguration\" :type=\"model.filterType\" :debounce=\"filterDebounce\" />\n                                    </fluro-panel-body>\n                                </fluro-panel>\n</constrain>\n</v-container>\n<v-container class=\"border-top\">\n                            <constrain>\n\n                                <h3 margin>Columns</h3>\n                                <column-customiser v-model=\"model.columns\" :sampleData=\"sample\" :config=\"config\" :loadingSample=\"loadingSample\"/>\n<!--                                 <template v-if=\"!sample.length\">\n                                   \n                                </template>\n                                <template v-else>\n                                    <h4 margin>Sample Output</h4>\n                                    <fluro-panel>\n                                        <tabset>\n                                            <tab heading=\"Explorer\">\n                                                <fluro-panel-body>\n                                                    <json-view :highlightMouseoverNode=\"true\" :deep=\"3\" :data=\"sample\" />\n                                                </fluro-panel-body>\n                                            </tab>\n                                            <tab heading=\"Raw JSON\">\n                                                <pre>{{sample}}</pre>\n                                            </tab>\n                                        </tabset>\n                                    </fluro-panel>\n                                </template> -->\n                            </constrain>\n                        </v-container>\n                    </flex-column-body>\n                </slot>\n            </tab>\n            <!-- <tab heading=\"Columns and Rendering\">\n                <slot>\n                    <flex-column-body style=\"background: #fafafa;\">\n                        <v-container>\n                            <constrain sm>\n                                <h3 margin>Columns and Rendering</h3>\n                            </constrain>\n                        </v-container>\n                    </flex-column-body>\n                </slot>\n            </tab>\n            <tab heading=\"Export Frequency\">\n                <slot>\n                    <flex-column-body style=\"background: #fafafa;\">\n                        <v-container>\n                            <constrain sm>\n                               \n                            </constrain>\n                        </v-container>\n                    </flex-column-body>\n                </slot>\n            </tab> -->\n            <!-- <tab :heading=\"`Access Passes`\">\n                <slot>\n                    <flex-column-body style=\"background: #fafafa;\">\n                        <v-container grid-list-xl>\n                            <constrain sm>\n                                <h3 margin>{{contextName}} Access Passes</h3>\n                                <fluro-access-pass-select @input=\"modelUpdated\" :host=\"model\" v-model=\"model.policies\" />\n                            </constrain>\n                        </v-container>\n                    </flex-column-body>\n                </slot>\n            </tab>\n            <tab :heading=\"`Individual Permissions`\">\n                <slot>\n                    <flex-column-body style=\"background: #fafafa;\">\n                        <v-container grid-list-xl>\n                            <constrain sm>\n                                <h3 margin>{{contextName}} Individual Permissions</h3>\n                                <fluro-permission-select @input=\"modelUpdated\" v-model=\"model.permissionSets\" />\n                            </constrain>\n                        </v-container>\n                    </flex-column-body>\n                </slot>\n            </tab> -->\n        </tabset>\n        <!-- <flex-column-body style=\"height:500px;\"> -->\n        <!-- <pre>{{model}}</pre> -->\n        <!-- </flex-column-body> -->\n    </flex-column>\n</template>\n<script>\n/////////////////////////////////\n\nimport FluroContentEditMixin from 'src/components/content/edit/FluroContentEditMixin.js';\nimport FilterConditionGroup from 'src/components/form/filters/FilterConditionGroup.vue';\nimport ColumnCustomiser from 'src/components/content/edit/components/ColumnCustomiser.vue';\n\n/////////////////////////////////\n\nimport Vue from 'vue';\nimport _ from 'lodash';\n\nimport { FilterService } from 'fluro';\n\n/////////////////////////////////\n\nexport default {\n\n\n    mixins: [FluroContentEditMixin],\n    components: {\n        FilterConditionGroup,\n        ColumnCustomiser\n    },\n    methods: {\n        modelUpdated() {\n            this.update(this.model);\n        },\n        reloadSample() {\n            var self = this;\n\n            //return;\n\n            //////////////////////////////////////////////////////////////////////////////\n            //////////////////////////////////////////////////////////////////////////////\n            //////////////////////////////////////////////////////////////////////////////\n\n            if (!self.model.filterType) {\n                console.log('NO FILTER TYPE')\n                return;\n            }\n\n            //////////////////////////////////////////////////////////////////////////////\n            //////////////////////////////////////////////////////////////////////////////\n            //////////////////////////////////////////////////////////////////////////////\n\n            self.loadingSample = true;\n\n            // return new Promise(function(resolve, reject) {\n\n            // if (self.model._id) {\n\n            //     return self.$fluro.api.get(`/content/_query/${self.model._id}`)\n            //         .then(sampleLoaded)\n            //         .catch(sampleFailed);\n\n            // } else {\n\n            //Run a dynamic query and get the sample data\n            return self.$fluro.api.post(`/content/${self.model.filterType}/filter`, {\n                    // sort: self.sort,\n                    filter: self.model.filterConfiguration,\n                    startDate: self.model.filterStartDate,\n                    endDate: self.model.filterEndDate,\n                    search: self.model.filterSearch,\n                    // includeArchived: self.includeArchivedByDefault,\n                    allDefinitions: true, //self.allDefinitions,\n                    // includeUnmatched: true,\n                    sample: true,\n                    limit: 5,\n                })\n                .then(sampleLoaded)\n                .catch(sampleFailed);\n            // }\n\n\n            //////////////////////////////////////////////////////////////////////////////\n\n            function sampleLoaded(res) {\n                self.sample = res.data;\n                self.loadingSample = false;\n            }\n\n            //////////////////////////////////////////////////////////////////////////////\n\n            function sampleFailed(res) {\n                // console.log('SAMPLE FAILED', res)\n                self.sample = [];\n                self.loadingSample = false;\n            }\n            // })\n        },\n    },\n    created() {\n        var self = this;\n\n        if (!this.model.filterConfiguration) {\n            this.model.filterConfiguration = {}\n        }\n\n        self.reloadSample();\n    },\n    watch: {\n        changeString() {\n            var self = this;\n            self.reloadSample();\n        }\n    },\n    asyncComputed: {\n        typeOptions: {\n            default: [],\n            get() {\n                var self = this;\n                if (self.model.query) {\n                    return new Promise(function(resolve, reject) {return reject()});\n                }\n                return new Promise(function(resolve, reject) {\n                    self.$fluro.types.terms()\n                        .then(function(res) {\n\n                            //Map the types\n                            var mappedTypeOptions = _.chain(res)\n                                .map(function(entry, key) {\n\n\n                                    var label = entry.parentType ? `${self.$fluro.types.readable(entry.parentType)} - ${self.$fluro.types.readable(key)}` : `${self.$fluro.types.readable(key)}`;\n\n                                    return {\n                                        name: label,\n                                        value: key,\n                                        parentType: entry.parentType,\n                                    }\n                                })\n                                .orderBy('name')\n                                .values()\n                                .value();\n\n                            mappedTypeOptions.unshift({\n                                name: 'Anything',\n                                key: 'node',\n                                value: 'node',\n                            })\n\n                            // console.log('MAPPED TYPES', mappedTypeOptions)\n                            //Resolve the array\n                            resolve(mappedTypeOptions);\n\n                        })\n                        .catch(function(err) {\n\n                            reject(err);\n                        });\n\n                })\n\n            },\n        }\n    },\n    computed: {\n        rows() {\n            return [];\n        },\n        showOutline() {\n            return false; //true; //false;//true;//false;//true;\n        },\n\n        fieldsOutput() {\n\n\n            var self = this;\n            var array = [];\n\n            ///////////////////////////////////\n\n            addField('title', {\n                title: 'Title',\n                minimum: 1,\n                maximum: 1,\n                type: 'string',\n                placeholder: 'Eg. My Awesome List',\n            })\n\n            addField('firstLine', {\n                title: 'Description',\n                minimum: 0,\n                maximum: 1,\n                type: 'string',\n                placeholder: 'Eg. A list of my favorite people',\n            })\n\n\n            // console.log('TYPE OPTIONS', self.typeOptions);\n\n\n\n            addField('filterType', {\n                title: 'Type',\n                minimum: 0,\n                maximum: 1,\n                type: 'string',\n                directive: 'select',\n                description: 'The type of item you want to return from this query',\n                options: self.typeOptions,\n            })\n\n            ///////////////////////////////////\n\n            function addField(key, details) {\n                details.key = key;\n                array.push(details)\n            }\n\n            return array;\n\n        },\n        changeString() {\n            var self = this;\n            if (self.model.query) {\n                return;\n            }\n            var filterString = FilterService.getFilterChangeString(self.model.filterConfiguration);\n\n            // console.log('Filter configuration changed', filterString)\n            return filterString;\n        },\n    },\n    data() {\n        return {\n            sample: [],\n            loadingSample: false,\n            filterDebounce: 500,\n        }\n    },\n}\n</script>\n<style scoped lang=\"scss\">\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n.hint {\n    font-size: 10px;\n    opacity: 0.5;\n    color: inherit;\n    display: block;\n}\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.hint {\n  font-size: 10px;\n  opacity: 0.5;\n  color: inherit;\n  display: block;\n}\n\n/*# sourceMappingURL=query.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$2 = "data-v-0f4b4abf";
  /* module identifier */
  const __vue_module_identifier__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$2 = __vue_normalize__(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    false,
    __vue_create_injector__,
    undefined,
    undefined
  );

export default __vue_component__$2;
//# sourceMappingURL=query-9f2592ad.js.map
