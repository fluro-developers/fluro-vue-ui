
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { bn as _, bl as __vue_normalize__, bm as __vue_create_injector__, bo as Vue, q as FluroInlineEdit, aI as FluroCodeEditor } from './index-3a4f7f99.js';
import 'vue-range-slider';
import 'vue-range-slider/dist/vue-range-slider.css';
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
import { F as FluroContentEditMixin } from './FluroContentEditMixin-4d699137.js';

//
var script = {
  props: {
    'value': {
      type: [Number, String]
    }
  },

  data() {
    return {
      model: parseInt(this.value || 0)
    };
  },

  methods: {
    focus() {
      this.$emit('focus');
    },

    blur() {
      this.$emit('blur');
    }

  },
  computed: {
    number: {
      get() {
        return this.$fluro.utils.hhmmss(this.model);
      },

      set(input) {
        if (!input) {
          input = '00:00:00';
        }

        var pieces = input.split(':');

        if (!pieces.length) {
          pieces = ['00', '00', '00'];
        }

        if (pieces.length == 1) {
          pieces.unshift('00');
          pieces.push('00');
        } else if (pieces.length == 2) {
          pieces.unshift('00');
        } // } else if (pieces.length < 2) {
        //     pieces.unshift('00');
        //     pieces.unshift('00');
        // }
        //Ensure we have 2 digits


        input = _.map(pieces, function (piece) {
          if (piece.length < 2) {
            return `0${piece}`;
          } else {
            return piece.slice(0, 2);
          }
        }).join(':');
        var matches = input.match(/^(\d{2}):([0-5]\d):([0-5]\d)$/);

        if (matches) {
          input = +matches[1] * (60 * 60) + +matches[2] * 60 + +matches[3];
          this.model = input;
          this.$emit('input', this.model);
        } // var matches = input.match(/^(\d{2}):([0-5]\d):([0-5]\d)$/);
        // if (matches) {
        //     
        //     this.model = input;
        //     this.$emit('input', this.model);
        // } else {
        //     console.log('INPUIT', input);
        //     input.split(':');
        //     if(input)
        // }
        // console.log('INPUT MATCH', matches)

      }

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
  return _c("input", {
    directives: [
      {
        name: "model",
        rawName: "v-model.lazy",
        value: _vm.number,
        expression: "number",
        modifiers: { lazy: true }
      }
    ],
    attrs: {
      pattern: "[0-9]*",
      placeholder: "Duration (mins)",
      inputmode: "numeric"
    },
    domProps: { value: _vm.number },
    on: {
      focus: function($event) {
        return _vm.$emit("focus")
      },
      blur: _vm.blur,
      keyup: function($event) {
        if (
          !$event.type.indexOf("key") &&
          _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
        ) {
          return null
        }
        return _vm.blur($event)
      },
      change: function($event) {
        _vm.number = $event.target.value;
      }
    }
  })
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-666d0af7_0", { source: "/**/\n.border-top[data-v-666d0af7] {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right[data-v-666d0af7] {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom[data-v-666d0af7] {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left[data-v-666d0af7] {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\ninput[data-v-666d0af7] {\n  width: 100%;\n  min-width: 70px;\n  text-align: center;\n  font-size: 0.9em;\n  padding: 5px;\n}\n\n/*# sourceMappingURL=DurationPicker.vue.map */", map: {"version":3,"sources":["C:\\Users\\User\\Documents\\fluro\\fluro-vue-ui\\src\\components\\content\\edit\\components\\DurationPicker.vue","DurationPicker.vue"],"names":[],"mappings":"AAgGA,GAAA;AAYA;EACA,yCAAA;AC1GA;AD6GA;EACA,2CAAA;AC1GA;AD6GA;EACA,4CAAA;AC1GA;AD6GA;EACA,0CAAA;AC1GA;;ADkHA,GAAA;AACA;EACA,WAAA;EACA,eAAA;EACA,kBAAA;EACA,gBAAA;EACA,YAAA;AC/GA;;AAEA,6CAA6C","file":"DurationPicker.vue","sourcesContent":["<template>\n    <input @focus=\"$emit('focus')\" @blur=\"blur\" @keyup.enter=\"blur\" pattern=\"[0-9]*\" placeholder=\"Duration (mins)\" inputmode=\"numeric\" v-model.lazy=\"number\" />\n</template>\n<script>\n\n\timport _ from 'lodash';\n\nexport default {\n    props: {\n        'value': {\n            type: [Number, String],\n        },\n    },\n    data() {\n        return {\n            model: parseInt(this.value || 0),\n        }\n    },\n    methods: {\n        focus() {\n            this.$emit('focus');\n        },\n        blur() {\n            this.$emit('blur');\n\n        }\n    },\n    computed: {\n        number: {\n            get() {\n                return this.$fluro.utils.hhmmss(this.model);\n            },\n            set(input) {\n                if (!input) {\n                    input = '00:00:00';\n                }\n\n                var pieces = input.split(':');\n                if (!pieces.length) {\n                    pieces = ['00', '00', '00'];\n                }\n\n\n\n                if (pieces.length == 1) {\n                    pieces.unshift('00');\n                    pieces.push('00');\n                } else if(pieces.length == 2) {\n                    pieces.unshift('00');\n                }\n                    \n                // } else if (pieces.length < 2) {\n                //     pieces.unshift('00');\n                //     pieces.unshift('00');\n                // }\n\n                //Ensure we have 2 digits\n                input = _.map(pieces, function(piece) {\n                    if (piece.length < 2) {\n                        return `0${piece}`;\n                    } else {\n                        return piece.slice(0, 2);\n                    }\n                }).join(':')\n\n\n\n\n                var matches = input.match(/^(\\d{2}):([0-5]\\d):([0-5]\\d)$/);\n                if (matches) {\n                    input = +matches[1] * (60 * 60) + +matches[2] * 60 + +matches[3];\n\n                    this.model = input;\n                    this.$emit('input', this.model);\n                }\n\n                // var matches = input.match(/^(\\d{2}):([0-5]\\d):([0-5]\\d)$/);\n                // if (matches) {\n                //     \n                //     this.model = input;\n                //     this.$emit('input', this.model);\n                // } else {\n                //     console.log('INPUIT', input);\n                //     input.split(':');\n                //     if(input)\n                // }\n\n                // console.log('INPUT MATCH', matches)\n\n            }\n        }\n    },\n}\n</script>\n<style lang=\"scss\" scoped>\n\n/**/\r\n\r\n$primary: #2ad4b9;//#0bd6be;\r\n$success: #4cc650; //#4cc673;//\r\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\r\n$danger: #d93e63;\r\n$secondary: #0bd6cd; //#0bd6a3;\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n\r\n.border-top {\r\n    border-top: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-right {\r\n    border-right: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-bottom {\r\n    border-bottom: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-left {\r\n    border-left: 1px solid rgba(#000, 0.05);\r\n}\r\n//////////////////////////////////////////\r\n\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n/**/\ninput {\n    width: 100%;\n    min-width: 70px;\n    text-align: center;\n    font-size: 0.9em;\n    padding: 5px;\n}\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\ninput {\n  width: 100%;\n  min-width: 70px;\n  text-align: center;\n  font-size: 0.9em;\n  padding: 5px;\n}\n\n/*# sourceMappingURL=DurationPicker.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-666d0af7";
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
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

let ColumnCell = Vue.extend({
  props: {
    'value': {
      type: String
    },
    'row': {
      type: Object
    },
    'column': {
      type: Object
    },
    'index': {
      type: Number
    }
  },

  data() {
    return {
      model: this.value
    };
  },

  components: {
    FluroInlineEdit,
    FluroEditor: FluroCodeEditor
  },
  computed: {
    detailBodyOptions() {
      return {
        disable: {
          bubble: false,
          bar: true
        }
      };
    },

    placeholder() {
      return `${this.column.title} Notes`;
    },

    input: {
      get() {
        var self = this;
        return self.model;
      },

      set(input) {
        var self = this;
        self.model = input;
        self.$emit('input', self.model);
      }

    }
  },
  template: `
    <td>
    <fluro-inline-edit v-if="row.type != 'breaker'">
        <template v-slot:default>
            <div class="cell " v-html="model"></div>
        </template>
        <template v-slot:edit="{props, blur, focus}">
            <fluro-editor @focus="focus" @blur="blur" v-model="input" :options="detailBodyOptions" :placeholder="placeholder" />
        </template>
    </fluro-inline-edit>
    </td>`
}); //////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

var script$1 = {
  props: {
    'value': {
      type: Object
    },
    'index': {
      type: Number
    },
    'plan': {
      type: Object
    } // 'teams': {
    //     type:Array,
    // }

  },
  components: {
    ColumnCell,
    FluroInlineEdit,
    FluroEditor: FluroCodeEditor,
    DurationPicker: __vue_component__
  },
  watch: {
    value(val) {
      this.row = val;
    }

  },

  mounted() {
    var self = this;
    self.$nextTick(function () {
      if (self.row.isNew) {
        // delete self.row.isNew;
        if (self.$refs.title) {
          self.$refs.title.focus();
          self.$refs.title.select();
          console.log('ADDED');
        }
      }
    });
  },

  data() {
    return {
      actionsOpen: false,
      row: this.value,
      added: false
    };
  },

  created() {
    if (!this.row.notes) {
      this.row.notes = {};
    }
  },

  methods: {
    swap() {
      if (this.row.type != 'song') {
        return;
      }

      this.$emit('swap');
    },

    remove() {
      this.$emit('delete');
    }

  },
  computed: {
    songKeys() {
      return ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
    },

    availableActions() {
      var self = this;
      var actions = [{
        title: 'Add Row',
        icon: 'plus',

        click() {
          self.$emit('add', {
            index: self.index,
            type: 'item'
          });
        }

      }, {
        title: 'Add Songs',
        icon: 'music',

        click() {
          self.$emit('add', {
            index: self.index,
            type: 'song'
          });
        }

      }, {
        title: 'Add Section',
        icon: 'megaphone',

        click() {
          self.$emit('add', {
            index: self.index,
            type: 'breaker'
          });
        }

      }];

      if (self.type != 'start') {
        actions.push({
          title: 'Duplicate this row',
          icon: 'copy',

          click() {
            self.$emit('duplicate');
          }

        });
      }

      return actions;
    },

    type() {
      return this.row.type; // switch(this.row.type) {
      //     case 'breaker':
      //     break;
      // }
    },

    detailBodyOptions() {
      return {
        disable: {
          bubble: false,
          bar: true
        }
      };
    },

    teams() {
      return this.plan.teams;
    },

    columns() {
      var self = this;
      return _.map(self.teams, function (team) {
        return {
          title: team,
          key: team
        };
      });
    }

  },
  filters: {
    mins(sec_num) {
      if (!sec_num) {
        return '';
      } /////////////////////////////////////


      var hours = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - hours * 3600) / 60);
      var seconds = sec_num - hours * 3600 - minutes * 60; /////////////////////////////////////
      //Clear string if 0

      hours = hours ? hours : '';
      minutes = minutes ? minutes : '';
      seconds = seconds ? seconds : ''; /////////////////////////////////////

      function pad(str) {
        return ("0" + str).slice(-2);
      } /////////////////////////////////////
      /////////////////////////////////////


      if (hours) {
        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
      } // if (minutes && seconds) {
      //     return `${pad(minutes)}:${pad(seconds)}`;
      // }


      if (minutes && seconds) {
        return `${minutes}m ${seconds}s `;
      }

      if (minutes) {
        return `${minutes} mins`;
      }

      return `${seconds}s`;
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
    "tr",
    { class: _vm.type },
    [
      _c(
        "th",
        { staticClass: "handle" },
        [
          _c(
            "v-btn",
            { staticClass: "ma-0", attrs: { icon: "", small: "" } },
            [
              _c("fluro-icon", {
                staticClass: "dragger",
                attrs: { icon: "arrows" }
              })
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "td",
        { staticClass: " duration-cell" },
        [
          _vm.type != "breaker" && _vm.type != "start"
            ? _c("fluro-inline-edit", {
                attrs: { enabled: _vm.row.editDuration },
                scopedSlots: _vm._u(
                  [
                    {
                      key: "default",
                      fn: function() {
                        return [
                          _c("div", { staticClass: "cell" }, [
                            _c("div", [_vm._v(_vm._s(_vm.row.time))]),
                            _vm._v(" "),
                            _c("div", { staticClass: "sm muted" }, [
                              _c("em", [
                                _vm._v(_vm._s(_vm._f("mins")(_vm.row.duration)))
                              ])
                            ])
                          ])
                        ]
                      },
                      proxy: true
                    },
                    {
                      key: "edit",
                      fn: function(ref) {
                        var props = ref.props;
                        var blur = ref.blur;
                        var focus = ref.focus;
                        return [
                          _c("duration-picker", {
                            on: {
                              focus: function($event) {
                                return focus($event)
                              },
                              keyup: function($event) {
                                if (
                                  !$event.type.indexOf("key") &&
                                  _vm._k(
                                    $event.keyCode,
                                    "enter",
                                    13,
                                    $event.key,
                                    "Enter"
                                  )
                                ) {
                                  return null
                                }
                                return blur($event)
                              },
                              blur: blur
                            },
                            model: {
                              value: _vm.row.duration,
                              callback: function($$v) {
                                _vm.$set(_vm.row, "duration", $$v);
                              },
                              expression: "row.duration"
                            }
                          })
                        ]
                      }
                    }
                  ],
                  null,
                  false,
                  1803891112
                )
              })
            : _vm._e()
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "td",
        [
          _c(
            "v-layout",
            [
              _c("v-flex", [
                _c(
                  "div",
                  { staticClass: "row-title" },
                  [
                    _c("fluro-inline-edit", {
                      attrs: { enabled: _vm.row.editTitle },
                      scopedSlots: _vm._u([
                        {
                          key: "default",
                          fn: function() {
                            return [
                              _c("div", { staticClass: "cell" }, [
                                _c(
                                  "strong",
                                  { staticClass: "row-title-text" },
                                  [_vm._v(_vm._s(_vm.row.title))]
                                )
                              ])
                            ]
                          },
                          proxy: true
                        },
                        {
                          key: "edit",
                          fn: function(ref) {
                            var props = ref.props;
                            var blur = ref.blur;
                            var focus = ref.focus;
                            return [
                              _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.row.title,
                                    expression: "row.title"
                                  }
                                ],
                                ref: "title",
                                domProps: { value: _vm.row.title },
                                on: {
                                  focus: function($event) {
                                    return focus($event)
                                  },
                                  keyup: function($event) {
                                    if (
                                      !$event.type.indexOf("key") &&
                                      _vm._k(
                                        $event.keyCode,
                                        "enter",
                                        13,
                                        $event.key,
                                        "Enter"
                                      )
                                    ) {
                                      return null
                                    }
                                    return blur($event)
                                  },
                                  blur: blur,
                                  input: function($event) {
                                    if ($event.target.composing) {
                                      return
                                    }
                                    _vm.$set(
                                      _vm.row,
                                      "title",
                                      $event.target.value
                                    );
                                  }
                                }
                              })
                            ]
                          }
                        }
                      ])
                    })
                  ],
                  1
                )
              ]),
              _vm._v(" "),
              _vm.type == "song"
                ? _c("div", [
                    _c(
                      "select",
                      {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.row.key,
                            expression: "row.key"
                          }
                        ],
                        staticClass: "row-song-key cell",
                        attrs: { placeholder: "Select a Key" },
                        on: {
                          change: function($event) {
                            var $$selectedVal = Array.prototype.filter
                              .call($event.target.options, function(o) {
                                return o.selected
                              })
                              .map(function(o) {
                                var val = "_value" in o ? o._value : o.value;
                                return val
                              });
                            _vm.$set(
                              _vm.row,
                              "key",
                              $event.target.multiple
                                ? $$selectedVal
                                : $$selectedVal[0]
                            );
                          }
                        }
                      },
                      [
                        _c("option", { attrs: { value: "" } }, [
                          _vm._v("(Select Key)")
                        ]),
                        _vm._v(" "),
                        _vm._l(_vm.songKeys, function(key) {
                          return _c("option", { domProps: { value: key } }, [
                            _vm._v(_vm._s(key))
                          ])
                        })
                      ],
                      2
                    )
                  ])
                : _vm._e()
            ],
            1
          ),
          _vm._v(" "),
          _vm.type != "breaker" && _vm.type != "start"
            ? _c(
                "div",
                { staticClass: "row-detail" },
                [
                  _c("fluro-inline-edit", {
                    attrs: { enabled: _vm.row.editDetail },
                    scopedSlots: _vm._u(
                      [
                        {
                          key: "default",
                          fn: function() {
                            return [
                              _vm.row.detail
                                ? _c("div", { staticClass: "cell" }, [
                                    _c("div", {
                                      domProps: {
                                        innerHTML: _vm._s(_vm.row.detail)
                                      }
                                    })
                                  ])
                                : _c(
                                    "div",
                                    { staticClass: "cell placeholder" },
                                    [_vm._v("Click here to add extra details")]
                                  )
                            ]
                          },
                          proxy: true
                        },
                        {
                          key: "edit",
                          fn: function(ref) {
                            var props = ref.props;
                            var blur = ref.blur;
                            var focus = ref.focus;
                            return [
                              _c("fluro-editor", {
                                attrs: {
                                  options: _vm.detailBodyOptions,
                                  placeholder: "Add extra detail and notes"
                                },
                                on: { focus: focus, blur: blur },
                                model: {
                                  value: _vm.row.detail,
                                  callback: function($$v) {
                                    _vm.$set(_vm.row, "detail", $$v);
                                  },
                                  expression: "row.detail"
                                }
                              })
                            ]
                          }
                        }
                      ],
                      null,
                      false,
                      3266597843
                    )
                  })
                ],
                1
              )
            : _vm._e()
        ],
        1
      ),
      _vm._v(" "),
      _vm._l(_vm.columns, function(column) {
        return _c("column-cell", {
          key: column.key,
          attrs: { column: column, row: _vm.row },
          model: {
            value: _vm.row.notes[column.key],
            callback: function($$v) {
              _vm.$set(_vm.row.notes, column.key, $$v);
            },
            expression: "row.notes[column.key]"
          }
        })
      }),
      _vm._v(" "),
      _c(
        "th",
        { staticStyle: { padding: "0" } },
        [
          _c(
            "v-menu",
            {
              attrs: {
                attach: "",
                "nudge-left": 10,
                "offset-x": "",
                left: "",
                bottom: _vm.index < _vm.plan.schedules.length / 2,
                top: _vm.index > _vm.plan.schedules.length / 2,
                transition: "slide-x-transition"
              },
              scopedSlots: _vm._u([
                {
                  key: "activator",
                  fn: function(ref) {
                    var on = ref.on;
                    return [
                      _c(
                        "v-btn",
                        _vm._g(
                          { staticClass: "ma-0", attrs: { icon: "" } },
                          on
                        ),
                        [
                          _vm.actionsOpen
                            ? _c("fluro-icon", { attrs: { icon: "times" } })
                            : _c("fluro-icon", {
                                attrs: { icon: "ellipsis-v" }
                              })
                        ],
                        1
                      )
                    ]
                  }
                }
              ]),
              model: {
                value: _vm.actionsOpen,
                callback: function($$v) {
                  _vm.actionsOpen = $$v;
                },
                expression: "actionsOpen"
              }
            },
            [
              _vm._v(" "),
              _c(
                "div",
                {
                  staticStyle: {
                    background: "#fff",
                    width: "250px",
                    "text-align": "left"
                  }
                },
                [
                  _c(
                    "v-list",
                    { attrs: { dense: "" } },
                    [
                      _c(
                        "v-list-tile",
                        { attrs: { disabled: "" } },
                        [
                          _c(
                            "v-label",
                            {
                              staticStyle: {
                                overflow: "hidden",
                                "text-overflow": "ellipsis",
                                "white-space": "nowrap"
                              }
                            },
                            [
                              _c("fluro-icon", {
                                attrs: { type: "plan", left: "" }
                              }),
                              _vm._v(
                                _vm._s(_vm.row.title) +
                                  "\n                        "
                              )
                            ],
                            1
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c("v-divider"),
                      _vm._v(" "),
                      _vm.row.type == "song"
                        ? _c(
                            "v-list-tile",
                            {
                              on: {
                                click: function($event) {
                                  return _vm.swap()
                                }
                              }
                            },
                            [
                              _c("fluro-icon", {
                                attrs: { icon: "retweet", left: "" }
                              }),
                              _vm._v("Replace song\n                        ")
                            ],
                            1
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _vm._l(_vm.availableActions, function(action) {
                        return _c(
                          "v-list-tile",
                          { on: { click: action.click } },
                          [
                            _c("fluro-icon", {
                              attrs: { icon: action.icon, left: "" }
                            }),
                            _vm._v(
                              _vm._s(action.title) +
                                "\n                        "
                            )
                          ],
                          1
                        )
                      }),
                      _vm._v(" "),
                      _c("v-divider"),
                      _vm._v(" "),
                      _c(
                        "v-list-tile",
                        {
                          on: {
                            click: function($event) {
                              return _vm.remove()
                            }
                          }
                        },
                        [
                          _c("fluro-icon", {
                            attrs: { icon: "trash-alt", left: "" }
                          }),
                          _vm._v("Delete\n                        ")
                        ],
                        1
                      )
                    ],
                    2
                  )
                ],
                1
              )
            ]
          )
        ],
        1
      )
    ],
    2
  )
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = function (inject) {
    if (!inject) return
    inject("data-v-5772f4ff_0", { source: "/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n\n/*# sourceMappingURL=PlanRowEdit.vue.map */", map: {"version":3,"sources":["C:\\Users\\User\\Documents\\fluro\\fluro-vue-ui\\src\\components\\content\\edit\\components\\PlanRowEdit.vue","PlanRowEdit.vue"],"names":[],"mappings":"AAkZA,GAAA;AAYA;EACA,yCAAA;AC5ZA;AD+ZA;EACA,2CAAA;AC5ZA;AD+ZA;EACA,4CAAA;AC5ZA;AD+ZA;EACA,0CAAA;AC5ZA;;ADoaA,GAAA;;AChaA,0CAA0C","file":"PlanRowEdit.vue","sourcesContent":["<template>\n    <tr :class=\"type\">\n        <th class=\"handle\">\n            <v-btn class=\"ma-0\" icon small>\n                <fluro-icon class=\"dragger\" icon=\"arrows\" />\n            </v-btn>\n        </th>\n        <td class=\" duration-cell\">\n            \n            <fluro-inline-edit :enabled=\"row.editDuration\" v-if=\"(type != 'breaker') && (type != 'start')\">\n                <template v-slot:default>\n                    <div class=\"cell\">\n                        <div>{{row.time}}</div>\n                        <div class=\"sm muted\"><em>{{row.duration | mins}}</em></div>\n                    </div>\n                </template>\n                <template v-slot:edit=\"{props, blur, focus}\">\n                    <duration-picker @focus=\"focus($event)\" @keyup.enter=\"blur\" @blur=\"blur\" v-model=\"row.duration\" />\n                </template>\n            </fluro-inline-edit>\n        </td>\n        <td>\n            <v-layout>\n                <v-flex>\n                    <div class=\"row-title\">\n                        <fluro-inline-edit :enabled=\"row.editTitle\">\n                            <template v-slot:default>\n                                <div class=\"cell\">\n                                    <strong class=\"row-title-text\">{{row.title}}</strong>\n                                </div>\n                            </template>\n                            <template v-slot:edit=\"{props, blur, focus}\">\n                                <input ref=\"title\" @focus=\"focus($event)\" @keyup.enter=\"blur\" @blur=\"blur\" v-model=\"row.title\" />\n                            </template>\n                        </fluro-inline-edit>\n                    </div>\n                </v-flex>\n                <div  v-if=\"type == 'song'\">\n                    <select  class=\"row-song-key cell\" placeholder=\"Select a Key\" v-model=\"row.key\">\n                        <option value=\"\">(Select Key)</option>\n                        <option :value=\"key\" v-for=\"key in songKeys\">{{key}}</option>\n                    </select>\n                    <!-- <fluro-inline-edit :enabled=\"row.editKey\">\n                        <template v-slot:default>\n                            <div class=\"cell\">({{row.key || 'Select a Key'}})</div>\n                        </template>\n                        <template v-slot:edit=\"{props, blur, focus}\">\n                            <select class=\"row-song-key\" placeholder=\"Select a Key\" v-model=\"row.key\">\n                                <option :value=\"key\" v-for=\"key in songKeys\">{{key}}</option>\n                            </select>\n                        </template>\n                    </fluro-inline-edit> -->\n                </div>\n            </v-layout>\n            <div class=\"row-detail\" v-if=\"(type != 'breaker') && (type != 'start')\">\n                <fluro-inline-edit :enabled=\"row.editDetail\">\n                    <template v-slot:default>\n                        <div class=\"cell\" v-if=\"row.detail\">\n                            <div v-html=\"row.detail\"></div>\n                        </div>\n                        <div class=\"cell placeholder\" v-else>Click here to add extra details</div>\n                    </template>\n                    <template v-slot:edit=\"{props, blur, focus}\">\n                        <fluro-editor @focus=\"focus\" @blur=\"blur\" v-model=\"row.detail\" :options=\"detailBodyOptions\" placeholder=\"Add extra detail and notes\" />\n                    </template>\n                </fluro-inline-edit>\n            </div>\n        </td>\n        <column-cell :column=\"column\" :row=\"row\" :key=\"column.key\" v-model=\"row.notes[column.key]\" v-for=\"column in columns\" />\n        <th style=\"padding:0;\">\n            <!-- style=\"padding:0;\" -->\n            <v-menu attach :nudge-left=\"10\" offset-x left :bottom=\"index < plan.schedules.length/2\" :top=\"index > plan.schedules.length/2\" v-model=\"actionsOpen\" transition=\"slide-x-transition\">\n                <template v-slot:activator=\"{ on }\">\n                    <!-- <div class=\"cell\" v-on=\"on\" > -->\n                    <v-btn class=\"ma-0\" v-on=\"on\" icon>\n                        <fluro-icon v-if=\"actionsOpen\" icon=\"times\" />\n                        <fluro-icon v-else icon=\"ellipsis-v\" />\n                    </v-btn>\n                    <!-- </div> -->\n                </template>\n                <div style=\"background: #fff; width:250px; text-align: left;\">\n                    <v-list dense>\n                        <v-list-tile disabled>\n                            <v-label style=\"overflow:hidden; text-overflow: ellipsis; white-space: nowrap;\">\n                                <fluro-icon type=\"plan\" left />{{row.title}}\n                            </v-label>\n                        </v-list-tile>\n                        <v-divider />\n                        <v-list-tile @click=\"swap()\" v-if=\"row.type =='song'\">\n                            <!-- <v-list-tile-content> -->\n                            <fluro-icon icon=\"retweet\" left />Replace song\n                            <!-- '{{row.title}}' -->\n                            <!-- </v-list-tile-content> -->\n                        </v-list-tile>\n                        <v-list-tile @click=\"action.click\" v-for=\"action in availableActions\">\n                            <!-- <v-list-tile-content> -->\n                            <fluro-icon :icon=\"action.icon\" left />{{action.title}}\n                            <!-- </v-list-tile-content> -->\n                        </v-list-tile>\n                        <v-divider />\n                        <v-list-tile @click=\"remove()\">\n                            <!-- <v-list-tile-content> -->\n                            <fluro-icon icon=\"trash-alt\" left />Delete\n                            <!-- '{{row.title}}' -->\n                            <!-- </v-list-tile-content> -->\n                        </v-list-tile>\n                    </v-list>\n                </div>\n            </v-menu>\n        </th>\n    </tr>\n</template>\n<script>\n/////////////////////////////////\n\nimport Vue from 'vue';\nimport FluroInlineEdit from 'src/components/form/FluroInlineEdit.vue';\nimport FluroEditor from 'src/components/form/FluroEditor.vue';\nimport DurationPicker from 'src/components/content/edit/components/DurationPicker.vue';\nimport _ from 'lodash';\n\n//////////////////////////////////////////////////////\n//////////////////////////////////////////////////////\n//////////////////////////////////////////////////////\n\n\n\nlet ColumnCell = Vue.extend({\n    props: {\n        'value': {\n            type: String,\n        },\n        'row': {\n            type: Object,\n        },\n        'column': {\n            type: Object,\n        },\n        'index':{\n            type:Number,\n        }\n    },\n    data() {\n        return {\n            model: this.value,\n\n        }\n    },\n    components: {\n        FluroInlineEdit,\n        FluroEditor,\n    },\n\n    computed: {\n\n        detailBodyOptions() {\n            return {\n                disable: {\n                    bubble: false,\n                    bar: true,\n                }\n            };\n        },\n        placeholder() {\n            return `${this.column.title} Notes`;\n        },\n        input: {\n            get() {\n                var self = this;\n                return self.model\n            },\n            set(input) {\n                var self = this;\n                self.model = input;\n                self.$emit('input', self.model)\n            }\n        }\n    },\n    template: `\n    <td>\n    <fluro-inline-edit v-if=\"row.type != 'breaker'\">\n        <template v-slot:default>\n            <div class=\"cell \" v-html=\"model\"></div>\n        </template>\n        <template v-slot:edit=\"{props, blur, focus}\">\n            <fluro-editor @focus=\"focus\" @blur=\"blur\" v-model=\"input\" :options=\"detailBodyOptions\" :placeholder=\"placeholder\" />\n        </template>\n    </fluro-inline-edit>\n    </td>`,\n});\n\n\n//////////////////////////////////////////////////////\n//////////////////////////////////////////////////////\n//////////////////////////////////////////////////////\n//////////////////////////////////////////////////////\n\n\n\nexport default {\n    props: {\n        'value': {\n            type: Object,\n        },\n        'index': {\n            type: Number,\n        },\n        'plan': {\n            type: Object,\n        },\n        // 'teams': {\n        //     type:Array,\n        // }\n    },\n    components: {\n        ColumnCell,\n        FluroInlineEdit,\n        FluroEditor,\n        DurationPicker,\n    },\n    watch: {\n        value(val) {\n            this.row = val;\n        },\n    },\n    mounted() {\n\n        var self = this;\n        self.$nextTick(function() {\n            if (self.row.isNew) {\n                // delete self.row.isNew;\n                if (self.$refs.title) {\n                    self.$refs.title.focus()\n                    self.$refs.title.select();\n                    console.log('ADDED')\n                }\n            }\n\n        })\n\n\n\n\n    },\n    data() {\n        return {\n            actionsOpen: false,\n            row: this.value,\n            added: false,\n        }\n    },\n    created() {\n        if (!this.row.notes) {\n            this.row.notes = {};\n        }\n    },\n    methods: {\n        swap() {\n            if(this.row.type != 'song') {\n                return;\n            }\n            this.$emit('swap');\n\n        },\n        remove() {\n            this.$emit('delete');\n        },\n    },\n    computed: {\n        songKeys() {\n            return [\n                \"C\",\n                \"Db\",\n                \"D\",\n                \"Eb\",\n                \"E\",\n                \"F\",\n                \"Gb\",\n                \"G\",\n                \"Ab\",\n                \"A\",\n                \"Bb\",\n                \"B\",\n            ]\n        },\n        availableActions() {\n\n            var self = this;\n\n            var actions = [{\n                    title: 'Add Row',\n                    icon: 'plus',\n                    click() {\n                        self.$emit('add', { index: self.index, type: 'item' })\n                    }\n                },\n                {\n                    title: 'Add Songs',\n                    icon: 'music',\n                    click() {\n                        self.$emit('add', { index: self.index, type: 'song' })\n                    }\n                },\n                {\n                    title: 'Add Section',\n                    icon: 'megaphone',\n                    click() {\n                        self.$emit('add', { index: self.index, type: 'breaker' })\n                    }\n                },\n            ];\n            if (self.type != 'start') {\n                actions.push({\n                    title: 'Duplicate this row',\n                    icon: 'copy',\n                    click() {\n                        self.$emit('duplicate')\n                    }\n                });\n            }\n            return actions;\n        },\n        type() {\n            return this.row.type;\n            // switch(this.row.type) {\n            //     case 'breaker':\n            //     break;\n            // }\n        },\n        detailBodyOptions() {\n            return {\n                disable: {\n                    bubble: false,\n                    bar: true,\n                }\n            };\n        },\n        teams() {\n            return this.plan.teams;\n        },\n        columns() {\n            var self = this;\n            return _.map(self.teams, function(team) {\n                return {\n                    title: team,\n                    key: team,\n                }\n            });\n        },\n    },\n    filters: {\n        mins(sec_num) {\n            if (!sec_num) {\n                return '';\n            }\n            /////////////////////////////////////\n\n            var hours = Math.floor(sec_num / 3600);\n            var minutes = Math.floor((sec_num - (hours * 3600)) / 60);\n            var seconds = sec_num - (hours * 3600) - (minutes * 60);\n\n            /////////////////////////////////////\n\n            //Clear string if 0\n            hours = (hours ? hours : '');\n            minutes = (minutes ? minutes : '');\n            seconds = (seconds ? seconds : '');\n\n            /////////////////////////////////////\n\n            function pad(str) {\n                return (\"0\" + str).slice(-2);\n            }\n\n\n            /////////////////////////////////////\n            /////////////////////////////////////\n\n            if (hours) {\n                return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;\n            }\n\n            // if (minutes && seconds) {\n            //     return `${pad(minutes)}:${pad(seconds)}`;\n            // }\n            if (minutes && seconds) {\n                return `${minutes}m ${seconds}s `;\n            }\n\n            if (minutes) {\n                return `${minutes} mins`;\n            }\n\n            return `${seconds}s`;\n\n        },\n    },\n\n}\n</script>\n<style lang=\"scss\">\n\n/**/\r\n\r\n$primary: #2ad4b9;//#0bd6be;\r\n$success: #4cc650; //#4cc673;//\r\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\r\n$danger: #d93e63;\r\n$secondary: #0bd6cd; //#0bd6a3;\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n\r\n.border-top {\r\n    border-top: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-right {\r\n    border-right: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-bottom {\r\n    border-bottom: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-left {\r\n    border-left: 1px solid rgba(#000, 0.05);\r\n}\r\n//////////////////////////////////////////\r\n\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n/**/\n\n\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n\n/*# sourceMappingURL=PlanRowEdit.vue.map */"]}, media: undefined });

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
/////////////////////////////////

var script$2 = {
  components: {
    draggable,
    PlanRow: __vue_component__$1
  },
  props: {},
  mixins: [FluroContentEditMixin],

  created() {
    var self = this;

    _.each(self.model.schedules, function (row) {
      self.$set(row, 'guid', self.$fluro.utils.guid());
    });

    self.calculateDurations();
  },

  watch: {
    'times': 'calculateDurations'
  },
  methods: {
    calculateDurations() {
      var self = this;
      var startIndex = self.startRowIndex;

      if (startIndex == -1) {
        startIndex = 0;
      } //////////////////////////////////////////////////


      var eventStartDate = _.get(self.model, 'event.startDate');

      var planStartDate = _.get(self.model, 'startDate'); // var startDate = (planStartDate ? new Date(planStartDate) : false) || (eventStartDate ? new Date(eventStartDate) : false) || new Date(); 


      var startDate = (eventStartDate ? new Date(eventStartDate) : false) || (planStartDate ? new Date(planStartDate) : false) || new Date(); //////////////////////////////////////////////////

      function newTime(elapsed) {
        var clonedDate = new Date(JSON.parse(JSON.stringify(startDate)));

        if (elapsed < 0) {
          clonedDate.setTime(startDate.getTime() - -1 * elapsed);
        } else {
          clonedDate.setTime(startDate.getTime() + elapsed);
        }

        return self.$fluro.date.formatDate(clonedDate, 'h:mma');
      }

      var rows = self.model.schedules;
      var before = rows.slice(0, startIndex).reverse();
      var after = rows.slice(startIndex); ///////////////////////////////////////

      _.reduce(before, function (elapsed, row, index) {
        if (row.duration) {
          elapsed += parseInt(row.duration) * 1000;
        }

        self.$set(row, 'time', newTime(-elapsed));
        self.$set(row, 'elapsedTime', -elapsed);
        return elapsed;
      }, 0);

      _.reduce(after, function (elapsed, row, index) {
        self.$set(row, 'time', newTime(elapsed));

        if (row.duration) {
          elapsed += parseInt(row.duration) * 1000;
        }

        self.$set(row, 'elapsedTime', elapsed);
        return elapsed;
      }, 0);
    },

    updateColumns() {
      this.$set(this.model, "teams", this.model.teams.slice());
    },

    selectSongs() {
      var self = this;
      return self.$fluro.global.select("song", {
        minimum: 0,
        maximum: 0
      }, true);
    },

    injectSongs(index) {
      var self = this;
      return self.selectSongs().then(function (songs) {
        // console.log('Selection', songs);
        var rows = _.map(songs, function (song) {
          var duration = self.getDuration(song);
          var key = self.getDefaultKey(song);
          return {
            title: song.title,
            type: "song",
            links: [song._id],
            _id: song._id,
            duration,
            key,
            notes: {},
            isNew: true,
            guid: self.$fluro.utils.guid()
          };
        }); /////////////////////////////////////////


        _.each(rows, function (row, i) {
          //Mark that we want to scroll to this row
          if (index || index == 0) {
            var targetIndex = index + 1 + i;
            self.model.schedules.splice(targetIndex, 0, row);
          } else {
            self.model.schedules.push(row);
          }
        });
      });
    },

    createRows(type) {
      var self = this;

      switch (type) {
        case "breaker":
          return [{
            title: "Section",
            type: "breaker",
            duration: 0,
            links: [],
            notes: {},
            isNew: true,
            guid: self.$fluro.utils.guid()
          }];

        case "start":
          return [{
            title: "Event Start",
            type: "start",
            duration: 0,
            links: [],
            notes: {},
            isNew: true,
            guid: self.$fluro.utils.guid()
          }];

        default:
          return [{
            title: "New item",
            duration: 300,
            links: [],
            notes: {},
            isNew: true,
            guid: self.$fluro.utils.guid()
          }];
      }
    },

    remove(index) {
      this.model.schedules.splice(index, 1);
      console.log("Removed item");
    },

    addFromRow(details) {
      var self = this;

      if (details.type == "song") {
        return self.injectSongs(details.index);
      } //Create the rows


      var rows = self.createRows(details.type);

      _.each(rows, function (row, i) {
        //Mark that we want to scroll to this row
        self.model.schedules.splice(details.index + 1 + i, 0, row);
      });
    },

    duplicate(index) {
      var row = JSON.parse(JSON.stringify(this.model.schedules[index]));
      row.guid = this.$fluro.utils.guid();
      this.model.schedules.splice(index + 1, 0, row);
    },

    getDuration(song) {
      return 300;
    },

    getDefaultKey(song) {
      return "";
    },

    swap(index) {
      var self = this;
      return self.selectSongs().then(function (songs) {
        var rows = _.map(songs, function (song) {
          var duration = self.getDuration(song);
          var key = self.getDefaultKey(song);
          return {
            title: song.title,
            type: "song",
            links: [song._id],
            _id: song._id,
            duration,
            key,
            notes: {},
            isNew: true,
            guid: self.$fluro.utils.guid()
          };
        }); /////////////////////////////////////////


        _.each(rows, function (row, i) {
          self.model.schedules.splice(index, i === 0 ? 1 : 0, row); // //Mark that we want to scroll to this row
          // if (index || index == 0) {
          //     var targetIndex = (index + 1) + i;
          //     self.model.schedules.splice(targetIndex, 0, row)
          // } else {
          //     self.model.schedules.push(row)
          // }
        });
      });
    },

    add(type) {
      var self = this;

      if (!self.model.schedules) {
        self.$set(self.model, "schedules", []);
      }

      if (type == "song") {
        return self.injectSongs();
      }

      var rows = self.createRows(type);

      _.each(rows, function (row) {
        //Mark that we want to scroll to this row
        self.model.schedules.push(row);
      });

      var container = self.$refs.container;
      container.scrollTo({
        top: container.scrollHeight + container.offsetHeight,
        left: 0,
        behavior: "smooth"
      }); ///////////////////////////////////////
    }

  },
  computed: {
    times() {
      return _.map(this.model.schedules, 'duration').join('-');
    },

    startRow() {
      return this.model.schedules[this.startRowIndex];
    },

    startRowIndex() {
      var self = this;

      var index = _.findIndex(self.model.schedules, {
        type: 'start'
      });

      return index;
    },

    fieldsOutput() {
      var array = []; ///////////////////////////////////

      addField("startDate", {
        title: "Plan Starts",
        minimum: 0,
        maximum: 1,
        type: "date",
        directive: "datetimepicker"
      }); ///////////////////////////////////

      function addField(key, details) {
        details.key = key;
        array.push(details);
      }

      return array;
    },

    columnEditField() {
      return {
        key: "teams",
        minimum: 0,
        maximum: 0,
        title: "Extra Column",
        type: "string",
        placeholder: "Eg. Lighting, MC, Band"
      };
    },

    teams() {
      var self = this;
      return self.model.teams;
    },

    columns() {
      var self = this;
      return _.chain(self.teams).compact().map(function (team) {
        return {
          title: team,
          key: team
        };
      }).value();
    }

  },

  data() {
    // var array = [];
    // _.times(200, function() {
    //     array.push({
    //         id: array.length
    //     });
    // });
    return {
      actionsOpen: false,
      drag: false,
      dragOptions: {} // array

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
              _c("tab", { attrs: { heading: "Plan" } }, [
                _c(
                  "div",
                  { staticClass: "plan-table-wrapper" },
                  [
                    _c(
                      "v-menu",
                      {
                        staticStyle: { position: "relative" },
                        attrs: {
                          attach: "",
                          "offset-x": "",
                          left: "",
                          "close-on-content-click": false,
                          transition: "slide-x-transition"
                        },
                        nativeOn: {
                          click: function($event) {
                            $event.stopPropagation();
                          }
                        },
                        scopedSlots: _vm._u([
                          {
                            key: "activator",
                            fn: function(ref) {
                              var on = ref.on;
                              return [
                                _c(
                                  "div",
                                  _vm._g({ staticClass: "cog-btn" }, on),
                                  [
                                    _c(
                                      "v-btn",
                                      {
                                        directives: [
                                          { name: "tippy", rawName: "v-tippy" }
                                        ],
                                        staticClass: "ma-0",
                                        attrs: {
                                          content: "Configure Columns",
                                          small: "",
                                          icon: ""
                                        }
                                      },
                                      [
                                        _c("fluro-icon", {
                                          attrs: { icon: "cog" }
                                        })
                                      ],
                                      1
                                    )
                                  ],
                                  1
                                )
                              ]
                            }
                          }
                        ])
                      },
                      [
                        _vm._v(" "),
                        _c(
                          "v-card",
                          { attrs: { tile: "" } },
                          [
                            _c(
                              "v-container",
                              {
                                staticStyle: {
                                  "min-width": "300px",
                                  background: "#f0f2f5"
                                },
                                attrs: { "pa-3": "" }
                              },
                              [
                                _c("fluro-content-form-field", {
                                  attrs: { field: _vm.columnEditField },
                                  on: { input: _vm.updateColumns },
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
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c("div", { ref: "container", staticClass: "plan-table" }, [
                      _c(
                        "table",
                        {
                          staticClass: "main-table",
                          attrs: { id: "main-table" }
                        },
                        [
                          _c("thead", [
                            _c(
                              "tr",
                              [
                                _c("th"),
                                _vm._v(" "),
                                _c(
                                  "th",
                                  { staticClass: "shrink center" },
                                  [
                                    _c("fluro-icon", {
                                      attrs: { icon: "clock" }
                                    })
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c("th", { staticClass: "detail" }, [
                                  _vm._v("Detail")
                                ]),
                                _vm._v(" "),
                                _vm._l(_vm.columns, function(column, key) {
                                  return _c("th", { key: key }, [
                                    _vm._v(
                                      "\n                                    " +
                                        _vm._s(column.title) +
                                        "\n                                "
                                    )
                                  ])
                                }),
                                _vm._v(" "),
                                _c("th", [
                                  _c("div", {
                                    staticStyle: {
                                      width: "28px",
                                      height: "22px"
                                    }
                                  })
                                ])
                              ],
                              2
                            )
                          ]),
                          _vm._v(" "),
                          _c(
                            "draggable",
                            _vm._b(
                              {
                                attrs: { tag: "tbody", handle: ".handle" },
                                on: {
                                  start: function($event) {
                                    _vm.drag = true;
                                  },
                                  end: function($event) {
                                    _vm.drag = false;
                                  },
                                  sort: function($event) {
                                    return _vm.calculateDurations()
                                  }
                                },
                                model: {
                                  value: _vm.model.schedules,
                                  callback: function($$v) {
                                    _vm.$set(_vm.model, "schedules", $$v);
                                  },
                                  expression: "model.schedules"
                                }
                              },
                              "draggable",
                              _vm.dragOptions,
                              false
                            ),
                            _vm._l(_vm.model.schedules, function(row, index) {
                              return _c("plan-row", {
                                key: row.guid,
                                attrs: { index: index, plan: _vm.model },
                                on: {
                                  delete: function($event) {
                                    return _vm.remove(index)
                                  },
                                  swap: function($event) {
                                    return _vm.swap(index)
                                  },
                                  duplicate: function($event) {
                                    return _vm.duplicate(index)
                                  },
                                  add: _vm.addFromRow
                                },
                                model: {
                                  value: _vm.model.schedules[index],
                                  callback: function($$v) {
                                    _vm.$set(_vm.model.schedules, index, $$v);
                                  },
                                  expression: "model.schedules[index]"
                                }
                              })
                            }),
                            1
                          ),
                          _vm._v(" "),
                          _c("tfoot", [
                            _c(
                              "tr",
                              [
                                _c("th", { attrs: { colspan: "2" } }),
                                _vm._v(" "),
                                _c(
                                  "td",
                                  [
                                    _c(
                                      "v-btn",
                                      {
                                        directives: [
                                          { name: "tippy", rawName: "v-tippy" }
                                        ],
                                        staticClass: "ma-2",
                                        staticStyle: {
                                          border: "1px solid #ddd",
                                          background: "#fff"
                                        },
                                        attrs: { content: "Add Row" },
                                        on: {
                                          click: function($event) {
                                            return _vm.add("row")
                                          }
                                        }
                                      },
                                      [
                                        _c("fluro-icon", {
                                          attrs: { icon: "plus" }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "v-btn",
                                      {
                                        directives: [
                                          { name: "tippy", rawName: "v-tippy" }
                                        ],
                                        staticClass: "ma-2",
                                        staticStyle: {
                                          border: "1px solid #ddd",
                                          background: "#fff"
                                        },
                                        attrs: { content: "Add Songs" },
                                        on: {
                                          click: function($event) {
                                            return _vm.add("song")
                                          }
                                        }
                                      },
                                      [
                                        _c("fluro-icon", {
                                          attrs: { icon: "music" }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "v-btn",
                                      {
                                        directives: [
                                          { name: "tippy", rawName: "v-tippy" }
                                        ],
                                        staticClass: "ma-2",
                                        staticStyle: {
                                          border: "1px solid #ddd",
                                          background: "#fff"
                                        },
                                        attrs: { content: "Add Section" },
                                        on: {
                                          click: function($event) {
                                            return _vm.add("breaker")
                                          }
                                        }
                                      },
                                      [
                                        _c("fluro-icon", {
                                          attrs: { icon: "megaphone" }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _vm.startRowIndex == -1
                                      ? _c(
                                          "v-btn",
                                          {
                                            directives: [
                                              {
                                                name: "tippy",
                                                rawName: "v-tippy"
                                              }
                                            ],
                                            staticClass: "ma-2",
                                            staticStyle: {
                                              border: "1px solid #ddd",
                                              background: "#fff"
                                            },
                                            attrs: {
                                              content: "Add Start Time"
                                            },
                                            on: {
                                              click: function($event) {
                                                return _vm.add("start")
                                              }
                                            }
                                          },
                                          [
                                            _c("fluro-icon", {
                                              attrs: { icon: "clock" }
                                            })
                                          ],
                                          1
                                        )
                                      : _vm._e()
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _vm._l(_vm.columns, function(column) {
                                  return _c("td")
                                }),
                                _vm._v(" "),
                                _c("th")
                              ],
                              2
                            )
                          ])
                        ],
                        1
                      )
                    ])
                  ],
                  1
                )
              ]),
              _vm._v(" "),
              _vm.definition
                ? _c(
                    "tab",
                    { attrs: { heading: _vm.definition.title + " details" } },
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
                                      _vm._v(_vm._s(_vm.definition.title))
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
                : _vm._e()
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
    inject("data-v-3bfe599c_0", { source: "/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.plan-table-wrapper {\n  position: relative;\n  flex: 1;\n  display: flex;\n  overflow: hidden;\n}\n.plan-table-wrapper .cog-btn {\n  position: absolute;\n  top: 0px;\n  right: 0px;\n  width: 38px;\n  z-index: 3;\n  text-align: center;\n}\n.plan-table {\n  flex: 1;\n  position: relative;\n  width: 100%;\n  z-index: 1;\n  margin: auto;\n  overflow: auto;\n  background: #f0f2f5;\n  height: 100%;\n}\n.plan-table p {\n  margin-bottom: 5px !important;\n}\n.plan-table mention {\n  font-size: 0.8em;\n  font-weight: 500;\n  background: rgba(0, 0, 0, 0.1);\n  border-radius: 100px;\n  padding: 2px 4px;\n  display: inline-block;\n  margin: 0 4px;\n}\n.plan-table .cell {\n  padding: 4px 8px;\n  word-wrap: break-word;\n  white-space: pre-wrap;\n}\n.plan-table .placeholder {\n  padding-bottom: 2px;\n  padding-top: 2px;\n  opacity: 0;\n  font-size: 0.8em;\n  font-style: italic;\n}\n.plan-table .row-song-key {\n  min-width: 30px;\n  display: block;\n  text-align-last: center;\n  appearance: none;\n  border: none;\n  outline: none;\n  font-weight: 500;\n}\n.plan-table .row-song-key,\n.plan-table .row-title {\n  font-size: 1.1em;\n}\n.plan-table .row-song-key .cell,\n.plan-table .row-title .cell {\n  padding-bottom: 0;\n}\n.plan-table .row-detail .cell {\n  padding-top: 0;\n}\n.plan-table table {\n  width: 100%;\n  min-width: 600px;\n  margin: auto;\n  border-collapse: separate;\n  border-spacing: 0;\n  /* safari and ios need the tfoot itself to be position:sticky also */\n  /* testing links*/\n}\n.plan-table table th,\n.plan-table table td {\n  text-align: left;\n  padding: 5px;\n  border-bottom: 1px solid #e8edf1;\n  border-right: 1px solid #e8edf1;\n  height: inherit;\n  white-space: nowrap;\n}\n.plan-table table tr {\n  height: 1px;\n  background: #fff;\n}\n.plan-table table tr .dragger {\n  opacity: 0;\n}\n.plan-table table tr:hover .placeholder {\n  opacity: 0.5;\n}\n.plan-table table tr:hover .dragger {\n  opacity: 0.5;\n}\n.plan-table table tr th:first-child,\n.plan-table table tr th:last-child {\n  background: #fff;\n}\n.plan-table table tr:nth-child(odd) {\n  background: #fcfcfc;\n}\n.plan-table table tr:nth-child(odd) th:first-child,\n.plan-table table tr:nth-child(odd) th:last-child {\n  background: #fcfcfc;\n}\n.plan-table table tr.song {\n  background: #fffbdd;\n  color: #6b5f31;\n}\n.plan-table table tr.song th:first-child,\n.plan-table table tr.song th:last-child {\n  background: #fffbdd;\n}\n.plan-table table tr.breaker {\n  background: #f0f2f5;\n}\n.plan-table table tr.breaker th,\n.plan-table table tr.breaker td {\n  border-right: none;\n  border-top: 1px solid #e8edf1;\n  border-bottom: 1px solid #e8edf1;\n}\n.plan-table table tr.breaker th .cell,\n.plan-table table tr.breaker td .cell {\n  padding: 15px;\n}\n.plan-table table tr.breaker th.row-title .cell,\n.plan-table table tr.breaker td.row-title .cell {\n  padding-top: inherit;\n}\n.plan-table table tr.breaker th:first-child,\n.plan-table table tr.breaker th:last-child {\n  background: #f0f2f5;\n}\n.plan-table table tr.breaker .row-title-text {\n  opacity: 0.7;\n  text-transform: uppercase;\n  font-weight: 600;\n  letter-spacing: 0.05em;\n  font-size: 0.8em;\n}\n.plan-table table tr.start {\n  background: #93d3c8;\n}\n.plan-table table tr.start th,\n.plan-table table tr.start td {\n  border-right: none;\n  border-top: 1px solid #e8edf1;\n  border-bottom: 1px solid #e8edf1;\n}\n.plan-table table tr.start th .cell,\n.plan-table table tr.start td .cell {\n  padding: 5px;\n}\n.plan-table table tr.start th.row-title .cell,\n.plan-table table tr.start td.row-title .cell {\n  padding-top: inherit;\n}\n.plan-table table tr.start th:first-child,\n.plan-table table tr.start th:last-child {\n  background: #93d3c8;\n}\n.plan-table table tr.start .row-title-text {\n  opacity: 0.7;\n  text-transform: uppercase;\n  font-weight: 600;\n  letter-spacing: 0.05em;\n  font-size: 0.8em;\n}\n.plan-table table td {\n  vertical-align: top;\n  padding: 0;\n  position: relative;\n}\n.plan-table table td.duration-cell {\n  text-align: center;\n}\n.plan-table table td:hover {\n  background: rgba(42, 212, 185, 0.05);\n}\n.plan-table table td p:last-child,\n.plan-table table td .fluro-editor {\n  margin-bottom: 0 !important;\n}\n.plan-table table td .fluro-inline-edit {\n  min-height: 100%;\n  min-width: 100%;\n  display: block;\n  width: 100%;\n  position: relative;\n  float: left;\n}\n.plan-table table td .fluro-inline-edit {\n  width: 100%;\n  height: 100%;\n  display: block;\n}\n.plan-table table td .fluro-inline-edit .inline-edit-default {\n  height: auto !important;\n  width: auto !important;\n}\n.plan-table table td .fluro-inline-edit .inline-edit-input {\n  background: #fff;\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n}\n.plan-table table td .fluro-inline-edit .inline-edit-input.inline-show {\n  border-radius: 3px;\n  border: 3px solid #2ad4b9;\n  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);\n  z-index: 3;\n}\n.plan-table table td .fluro-inline-edit input,\n.plan-table table td .fluro-inline-edit select {\n  margin: 0;\n  max-width: 100%;\n  width: 100%;\n  display: block;\n  padding: 4px 8px;\n  line-height: 1;\n}\n.plan-table table thead th {\n  background: #fff;\n  font-size: 0.8em;\n  position: -webkit-sticky;\n  position: sticky;\n  top: 0;\n  z-index: 3;\n  border-bottom: 3px solid rgba(0, 0, 0, 0.1);\n}\n.plan-table table thead th.center {\n  text-align: center;\n}\n.plan-table table thead th.shrink {\n  width: 1px;\n}\n.plan-table table thead th.detail {\n  max-width: 300px;\n}\n.plan-table table tfoot th,\n.plan-table table tfoot td {\n  position: -webkit-sticky;\n  position: sticky;\n  bottom: 0;\n  z-index: 4;\n  background: #f0f2f5 !important;\n  border: none !important;\n  border-top: 1px solid rgba(0, 0, 0, 0.1) !important;\n}\n.plan-table table th:first-child,\n.plan-table table th:last-child {\n  position: -webkit-sticky;\n  position: sticky;\n  z-index: 2;\n  vertical-align: center !important;\n  text-align: center;\n}\n.plan-table table th:first-child:first-child,\n.plan-table table th:last-child:first-child {\n  left: 0;\n  width: 1px;\n  border-right: 1px solid #e8edf1;\n}\n.plan-table table th:first-child:last-child,\n.plan-table table th:last-child:last-child {\n  right: 0;\n  width: 1px;\n  border-left: 1px solid #e8edf1;\n}\n.plan-table table thead th:first-child,\n.plan-table table thead th:last-child,\n.plan-table table tfoot th:first-child,\n.plan-table table tfoot th:last-child {\n  z-index: 5;\n}\n.plan-table table tr.sortable-ghost {\n  opacity: 0.3;\n}\n.plan-table table tr.sortable-ghost th,\n.plan-table table tr.sortable-ghost td {\n  border-color: greyscale(#89a3b7, 1%) !important;\n  background: greyscale(#89a3b7, 1%) !important;\n}\n.plan-table table td .fluro-editor-textarea {\n  min-height: 0;\n}\n.plan-table table td .fluro-editor-textarea > div {\n  border-radius: 0 !important;\n  padding: 4px 8px !important;\n  border: none !important;\n}\n\n/*# sourceMappingURL=plan.vue.map */", map: {"version":3,"sources":["C:\\Users\\User\\Documents\\fluro\\fluro-vue-ui\\src\\components\\content\\edit\\panels\\plan.vue","plan.vue"],"names":[],"mappings":"AAgmBA,GAAA;AAYA;EACA,yCAAA;AC1mBA;AD6mBA;EACA,2CAAA;AC1mBA;AD6mBA;EACA,4CAAA;AC1mBA;AD6mBA;EACA,0CAAA;AC1mBA;;ADknBA,GAAA;AACA;EACA,kBAAA;EACA,OAAA;EACA,aAAA;EACA,gBAAA;AC/mBA;ADinBA;EASA,kBAAA;EACA,QAAA;EACA,UAAA;EACA,WAAA;EACA,UAAA;EACA,kBAAA;ACvnBA;AD2nBA;EACA,OAAA;EACA,kBAAA;EACA,WAAA;EACA,UAAA;EACA,YAAA;EACA,cAAA;EACA,mBAAA;EACA,YAAA;ACxnBA;AD4nBA;EACA,6BAAA;AC1nBA;AD6nBA;EACA,gBAAA;EACA,gBAAA;EACA,8BAAA;EACA,oBAAA;EACA,gBAAA;EACA,qBAAA;EACA,aAAA;AC3nBA;AD8nBA;EACA,gBAjBA;EAkBA,qBAAA;EACA,qBAAA;AC5nBA;AD+nBA;EACA,mBAAA;EACA,gBAAA;EACA,UAAA;EACA,gBAAA;EACA,kBAAA;AC7nBA;ADgoBA;EACA,eAAA;EACA,cAAA;EACA,uBAAA;EACA,gBAAA;EACA,YAAA;EACA,aAAA;EACA,gBAAA;AC9nBA;ADioBA;;EAEA,gBAAA;AC/nBA;ADioBA;;EACA,iBAAA;AC9nBA;ADmoBA;EACA,cAAA;ACjoBA;ADqoBA;EACA,WAAA;EACA,gBAAA;EACA,YAAA;EACA,yBAAA;EACA,iBAAA;EA8QA,oEAAA;EAcA,iBAAA;AC75BA;ADmoBA;;EAEA,gBAAA;EACA,YAAA;EAEA,gCAAA;EACA,+BAAA;EACA,eAAA;EACA,mBAAA;ACloBA;ADuoBA;EACA,WAAA;EACA,gBAAA;ACroBA;ADuoBA;EACA,UAAA;ACroBA;ADyoBA;EACA,YAAA;ACvoBA;AD0oBA;EACA,YAAA;ACxoBA;AD4oBA;;EAEA,gBAAA;AC1oBA;AD6oBA;EAMA,mBAAA;AChpBA;AD2oBA;;EAEA,mBAAA;ACzoBA;AD+oBA;EACA,mBAAA;EACA,cAAA;AC7oBA;ADqpBA;;EAEA,mBAAA;ACnpBA;ADupBA;EACA,mBAAA;ACrpBA;ADupBA;;EAEA,kBAAA;EACA,6BAAA;EACA,gCAAA;ACrpBA;ADupBA;;EACA,aAAA;ACppBA;ADwpBA;;EACA,oBAAA;ACrpBA;AD0pBA;;EAEA,mBAAA;ACxpBA;AD2pBA;EACA,YAAA;EACA,yBAAA;EACA,gBAAA;EACA,sBAAA;EACA,gBAAA;ACzpBA;AD8pBA;EACA,mBAAA;AC5pBA;AD8pBA;;EAEA,kBAAA;EACA,6BAAA;EACA,gCAAA;AC5pBA;AD8pBA;;EACA,YAAA;AC3pBA;AD+pBA;;EACA,oBAAA;AC5pBA;ADiqBA;;EAEA,mBAAA;AC/pBA;ADkqBA;EACA,YAAA;EACA,yBAAA;EACA,gBAAA;EACA,sBAAA;EACA,gBAAA;AChqBA;ADqqBA;EACA,mBAAA;EACA,UAAA;EACA,kBAAA;ACnqBA;ADqqBA;EACA,kBAAA;ACnqBA;ADsqBA;EACA,oCAAA;ACpqBA;ADuqBA;;EAEA,2BAAA;ACrqBA;ADwqBA;EACA,gBAAA;EACA,eAAA;EACA,cAAA;EACA,WAAA;EACA,kBAAA;EACA,WAAA;ACtqBA;ADwrBA;EACA,WAAA;EACA,YAAA;EAQA,cAAA;AC7rBA;AD+rBA;EACA,uBAAA;EACA,sBAAA;AC7rBA;ADwsBA;EACA,gBAAA;EACA,kBAAA;EACA,OAAA;EACA,MAAA;EACA,QAAA;ACtsBA;ADwsBA;EACA,kBAAA;EACA,yBAAA;EACA,yCAAA;EACA,UAAA;ACtsBA;AD2sBA;;EAEA,SAAA;EACA,eAAA;EACA,WAAA;EACA,cAAA;EACA,gBA1RA;EA2RA,cAAA;ACzsBA;AD+tBA;EACA,gBAAA;EACA,gBAAA;EAEA,wBAAA;EACA,gBAAA;EACA,MAAA;EACA,UAAA;EAeA,2CAAA;AC5uBA;AD+tBA;EACA,kBAAA;AC7tBA;ADguBA;EACA,UAAA;AC9tBA;ADiuBA;EAEA,gBAAA;AChuBA;ADwuBA;;EAEA,wBAAA;EACA,gBAAA;EACA,SAAA;EACA,UAAA;EACA,8BAAA;EACA,uBAAA;EACA,mDAAA;ACtuBA;AD2uBA;;EAEA,wBAAA;EACA,gBAAA;EACA,UAAA;EAEA,iCAAA;EACA,kBAAA;AC1uBA;AD4uBA;;EACA,OAAA;EACA,UAAA;EACA,+BAAA;ACzuBA;AD4uBA;;EACA,QAAA;EACA,UAAA;EACA,8BAAA;ACzuBA;AD+uBA;;;;EAEA,UAAA;AC3uBA;ADivBA;EACA,YAAA;AC/uBA;ADkvBA;;EAEA,+CAAA;EACA,6CAAA;AChvBA;ADovBA;EACA,aAAA;AClvBA;ADovBA;EAEA,2BAAA;EACA,2BAAA;EACA,uBAAA;ACnvBA;;AAEA,mCAAmC","file":"plan.vue","sourcesContent":["<template>\n    <flex-column>\n        <template v-if=\"loading\">\n            <fluro-page-preloader contain />\n        </template>\n        <tabset v-else :justified=\"true\" :vertical=\"true\">\n            <!-- <template v-slot:menuprefix v-if=\"model._id\"> -->\n            <!-- <div class=\"event-cover-image\" :style=\"{backgroundImage:`url(${coverImage})`}\"/> -->\n            <!-- <fluro-image cover :spinner=\"true\" :height=\"150\" :item=\"coverImage\"/> -->\n            <!-- </template> -->\n            <tab heading=\"Plan\">\n                <!-- <slot> -->\n                <!-- <flex-column-body style=\"background: #fafafa;\"> -->\n                <!-- <v-container class=\"grid-list-xl\"> -->\n                <!-- <flex-row> -->\n                <!-- <flex-column-header>\n                    <v-container pa-2>\n                        <v-layout>\n                            <v-flex xs12 sm3>\n                                <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.startDate\" v-model=\"model\" />\n                            </v-flex>\n                        </v-layout>\n                    </v-container>\n                </flex-column-header> -->\n                <div class=\"plan-table-wrapper\">\n                    <!-- <v-menu attach :nudge-left=\"10\" offset-x left :close-on-content-click=\"false\" transition=\"slide-x-transition\" @click.native.stop> -->\n                    <v-menu\n                        style=\"position:relative\"\n                        attach\n                        offset-x\n                        left\n                        :close-on-content-click=\"false\"\n                        transition=\"slide-x-transition\"\n                        @click.native.stop\n                    >\n                        <template v-slot:activator=\"{ on }\">\n                            <div v-on=\"on\" class=\"cog-btn\">\n                                <v-btn\n                                    v-tippy\n                                    content=\"Configure Columns\"\n                                    class=\"ma-0\"\n                                    small\n                                    icon\n                                >\n                                    <fluro-icon icon=\"cog\" />\n                                </v-btn>\n                            </div>\n                        </template>\n                        <v-card tile>\n                            <v-container  style=\"min-width:300px;background: #f0f2f5;\" pa-3>\n                            \t\n                                <!-- <v-list style=\"max-height: 50vh;\" class=\"scroll-y\" dense> -->\n                                <!-- <v-list-tile> -->\n                                <!-- <v-list-tile-content> -->\n                                <fluro-content-form-field\n                                    @input=\"updateColumns\"\n                                    :field=\"columnEditField\"\n                                    v-model=\"model\"\n                                />\n                                <!-- </v-list-tile-content> -->\n                                <!-- </v-list-tile> -->\n                                <!-- </v-list> -->\n                            </v-container>\n                        </v-card>\n                    </v-menu>\n                    <div class=\"plan-table\" ref=\"container\">\n                        <table id=\"main-table\" class=\"main-table\">\n                            <thead>\n                                <tr>\n                                    <th></th>\n                                    <th class=\"shrink center\">\n                                        <fluro-icon icon=\"clock\" />\n                                    </th>\n                                    <th class=\"detail\">Detail</th>\n                                    <th\n                                        v-for=\"(column, key) in columns\"\n                                        :key=\"key\"\n                                    >\n                                        {{ column.title }}\n                                    </th>\n                                    <th>\n                                        <div\n                                            style=\"width:28px; height: 22px;\"\n                                        ></div>\n                                        <!-- <v-menu attach :nudge-left=\"10\" offset-x left bottom v-model=\"actionsOpen\" > -->\n                                    </th>\n                                </tr>\n                            </thead>\n                            <!-- <tbody> -->\n                            <draggable\n                                tag=\"tbody\"\n                                handle=\".handle\"\n                                v-model=\"model.schedules\"\n                                v-bind=\"dragOptions\"\n                                @start=\"drag = true\"\n                                @end=\"drag = false\"\n                                @sort=\"calculateDurations()\"\n                            >\n                                <!-- :teams=\"model.teams\" -->\n                                <plan-row\n                                    @delete=\"remove(index)\"\n                                    @swap=\"swap(index)\"\n                                    @duplicate=\"duplicate(index)\"\n                                    @add=\"addFromRow\"\n                                    v-model=\"model.schedules[index]\"\n                                    :index=\"index\"\n                                    :plan=\"model\"\n                                    v-for=\"(row, index) in model.schedules\"\n                                    :key=\"row.guid\"\n                                />\n                            </draggable>\n                            <tfoot>\n                                <tr>\n                                    <th colspan=\"2\"></th>\n                                    <td>\n                                        <v-btn\n                                            v-tippy\n                                            content=\"Add Row\"\n                                            style=\"border: 1px solid #ddd; background: #fff;\"\n                                            class=\"ma-2\"\n                                            @click=\"add('row')\"\n                                        >\n                                            <fluro-icon icon=\"plus\" />\n                                        </v-btn>\n                                        <v-btn\n                                            v-tippy\n                                            content=\"Add Songs\"\n                                            style=\"border: 1px solid #ddd; background: #fff;\"\n                                            class=\"ma-2\"\n                                            @click=\"add('song')\"\n                                        >\n                                            <fluro-icon icon=\"music\" />\n                                        </v-btn>\n                                        <v-btn\n                                            v-tippy\n                                            content=\"Add Section\"\n                                            style=\"border: 1px solid #ddd; background: #fff;\"\n                                            class=\"ma-2\"\n                                            @click=\"add('breaker')\"\n                                        >\n                                            <fluro-icon icon=\"megaphone\" />\n                                        </v-btn>\n                                        <v-btn\n                                            v-tippy\n                                            content=\"Add Start Time\"\n                                            style=\"border: 1px solid #ddd; background: #fff;\"\n                                            class=\"ma-2\"\n                                            @click=\"add('start')\"\n                                            v-if=\"startRowIndex == -1\"\n                                        >\n                                            <fluro-icon icon=\"clock\" />\n                                        </v-btn>\n                                        <!-- <v-btn @click=\"add('song')\" v-tippy content=\"Add songs\">\n                                        <fluro-icon icon=\"music\" />\n                                    </v-btn>\n                                    <v-btn @click=\"add('breaker')\" v-tippy content=\"Add section\">\n                                        <fluro-icon icon=\"megaphone\" />\n                                    </v-btn> -->\n                                    </td>\n                                    <td v-for=\"column in columns\"></td>\n                                    <th></th>\n                                </tr>\n                            </tfoot>\n                        </table>\n                    </div>\n                </div>\n                <!-- <flex-column-footer> -->\n                <!-- <v-container class=\"border-top pa-2 text-xs-center\" fluid> -->\n                <!-- <v-menu attach offset-y top v-model=\"actionsOpen\" transition=\"slide-y-transition\">\n                            <template v-slot:activator=\"{ on }\">\n                              \n                                    <v-btn color=\"primary\" v-on=\"on\">Add\n                                        <fluro-icon right icon=\"plus\" />\n                                    </v-btn>\n                                \n                            </template>\n                           \n                                <div style=\"background: #fff; width:250px; text-align: left;\">\n                                    <v-list dense>\n                                        <v-list-tile disabled>\n                                            <v-label style=\"overflow:hidden; text-overflow: ellipsis; white-space: nowrap;\">\n                                                <fluro-icon left type=\"plan\" />Add Plan Item\n                                            </v-label>\n                                        </v-list-tile>\n                                        <v-divider />\n                                        <v-list-tile @click=\"add('row')\">\n                                            <fluro-icon class=\"muted\" left icon=\"plus\" />Add Row\n                                        </v-list-tile>\n                                        <v-list-tile @click=\"add('song')\">\n                                            <fluro-icon class=\"muted\" left icon=\"music\" />Add Songs\n                                        </v-list-tile>\n                                        <v-list-tile @click=\"add('breaker')\">\n                                            <fluro-icon class=\"muted\" left icon=\"megaphone\" />Add Breaker\n                                        </v-list-tile>\n                                    </v-list>\n                                </div>\n                           \n                        </v-menu> -->\n                <!-- <v-layout>\n                            <v-spacer />\n                            <v-flex>\n                                <v-btn block @click=\"add('row')\">Add Row\n                                    <fluro-icon right icon=\"plus\" />\n                                </v-btn>\n                            </v-flex>\n                            <v-spacer />\n                            <v-flex>\n                                <v-btn block @click=\"add('song')\">Add Songs\n                                    <fluro-icon right icon=\"music\" />\n                                </v-btn>\n                            </v-flex>\n                            <v-spacer />\n                            <v-flex>\n                                <v-btn block @click=\"add('breaker')\">Add Section\n                                    <fluro-icon right icon=\"megaphone\" />\n                                </v-btn>\n                            </v-flex>\n                            <v-spacer />\n                        </v-layout>\n                    </v-container> -->\n                <!-- <pre>{{model.schedules}}</pre> -->\n                <!-- </flex-column-footer> -->\n                <!-- </flex-column> -->\n                <!-- <div>Sidebar</div> -->\n                <!-- </flex-row> -->\n                <!-- </v-container> -->\n                <!-- </flex-column-body> -->\n                <!-- </slot> -->\n            </tab>\n            <tab :heading=\"`${definition.title} details`\" v-if=\"definition\">\n                <!-- <tab heading=\"Info\"> -->\n                <slot>\n                    <flex-column-body style=\"background: #fafafa;\">\n                        <v-container>\n                            <constrain sm>\n                                <h3 margin>{{ definition.title }}</h3>\n                                <fluro-content-form\n                                    :options=\"options\"\n                                    v-model=\"model.data\"\n                                    :fields=\"definition.fields\"\n                                >\n                                </fluro-content-form>\n                            </constrain>\n                        </v-container>\n                    </flex-column-body>\n                </slot>\n            </tab>\n        </tabset>\n    </flex-column>\n</template>\n<script>\n/////////////////////////////////\nimport _ from 'lodash';\n\nimport draggable from \"vuedraggable\";\nimport PlanRow from \"src/components/content/edit/components/PlanRowEdit.vue\";\nimport FluroContentEditMixin from \"src/components/content/edit/FluroContentEditMixin.js\";\n\n//////////////////////////////////////////////////////\n\n/////////////////////////////////\n\nexport default {\n    components: {\n        draggable,\n        PlanRow\n    },\n    props: {},\n    mixins: [FluroContentEditMixin],\n    created() {\n        var self = this;\n        _.each(self.model.schedules, function(row) {\n            self.$set(row, 'guid', self.$fluro.utils.guid());\n        });\n\n        self.calculateDurations();\n    },\n    watch:{\n        'times':'calculateDurations',\n    },\n    methods: {\n\n        calculateDurations() {\n            var self = this;\n            var startIndex = self.startRowIndex;\n\n            if (startIndex == -1) {\n                startIndex = 0;\n            }\n\n            //////////////////////////////////////////////////\n\n            var eventStartDate = _.get(self.model, 'event.startDate');\n            var planStartDate = _.get(self.model, 'startDate');\n            // var startDate = (planStartDate ? new Date(planStartDate) : false) || (eventStartDate ? new Date(eventStartDate) : false) || new Date(); \n            var startDate = (eventStartDate ? new Date(eventStartDate) : false) || (planStartDate ? new Date(planStartDate) : false) || new Date(); \n\n            //////////////////////////////////////////////////\n\n            function newTime(elapsed) {\n                var clonedDate = new Date(JSON.parse(JSON.stringify(startDate)));\n                if (elapsed < 0) {\n                    clonedDate.setTime(startDate.getTime() - (-1*elapsed));\n                }\n                else {\n                    clonedDate.setTime(startDate.getTime() + elapsed); \n                }\n                \n                return self.$fluro.date.formatDate(clonedDate, 'h:mma');\n            }\n\n\n            var rows = self.model.schedules;\n            var before = rows.slice(0, startIndex).reverse();\n            var after = rows.slice(startIndex);\n\n            ///////////////////////////////////////\n\n\n            _.reduce(before, function(elapsed, row, index) {\n                if (row.duration) {\n                    elapsed += (parseInt(row.duration) * 1000);\n                }\n                self.$set(row, 'time', newTime(-elapsed));\n                self.$set(row, 'elapsedTime', -elapsed);\n                return elapsed;\n            }, 0)\n\n            _.reduce(after, function(elapsed, row, index) {\n                self.$set(row, 'time', newTime(elapsed));\n                if (row.duration) {\n                    elapsed += (parseInt(row.duration) * 1000);\n                }\n                self.$set(row, 'elapsedTime', elapsed);\n                return elapsed;\n            }, 0)\n           \n        },\n        updateColumns() {\n            this.$set(this.model, \"teams\", this.model.teams.slice());\n        },\n        selectSongs() {\n            var self = this;\n            return self.$fluro.global.select(\n                \"song\",\n                { minimum: 0, maximum: 0 },\n                true\n            );\n        },\n        injectSongs(index) {\n            var self = this;\n\n            return self.selectSongs().then(function(songs) {\n                // console.log('Selection', songs);\n\n                var rows = _.map(songs, function(song) {\n                    var duration = self.getDuration(song);\n                    var key = self.getDefaultKey(song);\n\n                    return {\n                        title: song.title,\n                        type: \"song\",\n                        links: [song._id],\n                        _id: song._id,\n                        duration,\n                        key,\n                        notes: {},\n                        isNew: true,\n                        guid: self.$fluro.utils.guid()\n                    };\n                });\n\n                /////////////////////////////////////////\n\n                _.each(rows, function(row, i) {\n                    //Mark that we want to scroll to this row\n                    if (index || index == 0) {\n                        var targetIndex = index + 1 + i;\n                        self.model.schedules.splice(targetIndex, 0, row);\n                    } else {\n                        self.model.schedules.push(row);\n                    }\n                });\n            });\n        },\n        createRows(type) {\n            var self = this;\n\n            switch (type) {\n                case \"breaker\":\n                    return [\n                        {\n                            title: \"Section\",\n                            type: \"breaker\",\n                            duration: 0,\n                            links: [],\n                            notes: {},\n                            isNew: true,\n                            guid: self.$fluro.utils.guid()\n                        }\n                    ];\n                    break;\n                case \"start\":\n                    return [\n                        {\n                            title: \"Event Start\",\n                            type: \"start\",\n                            duration: 0,\n                            links: [],\n                            notes: {},\n                            isNew: true,\n                            guid: self.$fluro.utils.guid()\n                        }\n                    ];\n                    break;                \n                default:\n                    return [\n                        {\n                            title: \"New item\",\n                            duration: 300,\n                            links: [],\n                            notes: {},\n                            isNew: true,\n                            guid: self.$fluro.utils.guid()\n                        }\n                    ];\n                    break;\n            }\n        },\n        remove(index) {\n            this.model.schedules.splice(index, 1);\n            console.log(\"Removed item\");\n        },\n        addFromRow(details) {\n            var self = this;\n\n            if (details.type == \"song\") {\n                return self.injectSongs(details.index);\n            }\n\n            //Create the rows\n            var rows = self.createRows(details.type);\n\n            _.each(rows, function(row, i) {\n                //Mark that we want to scroll to this row\n\n                self.model.schedules.splice(details.index + 1 + i, 0, row);\n            });\n        },\n        duplicate(index) {\n            var row = JSON.parse(JSON.stringify(this.model.schedules[index]));\n            row.guid = this.$fluro.utils.guid()\n            this.model.schedules.splice(index + 1, 0, row);\n        },\n\n        getDuration(song) {\n            return 300;\n        },\n        getDefaultKey(song) {\n            return \"\";\n        },\n        swap(index) {\n            var self = this;\n            return self.selectSongs().then(function(songs) {\n                var rows = _.map(songs, function(song) {\n                    var duration = self.getDuration(song);\n                    var key = self.getDefaultKey(song);\n                    return {\n                        title: song.title,\n                        type: \"song\",\n                        links: [song._id],\n                        _id: song._id,\n                        duration,\n                        key,\n                        notes: {},\n                        isNew: true,\n                        guid: self.$fluro.utils.guid()\n                    };\n                });\n\n                /////////////////////////////////////////\n\n                _.each(rows, function(row, i) {\n                    self.model.schedules.splice(index, i === 0 ? 1 : 0, row);\n\n                    // //Mark that we want to scroll to this row\n                    // if (index || index == 0) {\n                    //     var targetIndex = (index + 1) + i;\n                    //     self.model.schedules.splice(targetIndex, 0, row)\n                    // } else {\n                    //     self.model.schedules.push(row)\n                    // }\n                });\n            });\n\n            var newRow;\n            this.model.schedules.splice(index, 1, newRow);\n        },\n        add(type) {\n            var self = this;\n\n            if (!self.model.schedules) {\n                self.$set(self.model, \"schedules\", []);\n            }\n\n            if (type == \"song\") {\n                return self.injectSongs();\n            }\n\n            var rows = self.createRows(type);\n            _.each(rows, function(row) {\n                //Mark that we want to scroll to this row\n\n                self.model.schedules.push(row);\n            });\n\n            var container = self.$refs.container;\n            container.scrollTo({\n                top: container.scrollHeight + container.offsetHeight,\n                left: 0,\n                behavior: \"smooth\"\n            });\n\n            ///////////////////////////////////////\n        }\n    },\n    computed: {\n        times() {\n            return _.map(this.model.schedules, 'duration').join('-');\n        },\n        startRow() {\n            return this.model.schedules[this.startRowIndex];\n        },\n        startRowIndex() {\n            var  self = this;\n            var index = _.findIndex(self.model.schedules, {type:'start'});\n            return index\n        },\n        \n        fieldsOutput() {\n            var self = this;\n            var array = [];\n\n            ///////////////////////////////////\n\n            addField(\"startDate\", {\n                title: \"Plan Starts\",\n                minimum: 0,\n                maximum: 1,\n                type: \"date\",\n                directive: \"datetimepicker\"\n            });\n\n            ///////////////////////////////////\n\n            function addField(key, details) {\n                details.key = key;\n                array.push(details);\n            }\n\n            return array;\n        },\n        columnEditField() {\n            return {\n                key: \"teams\",\n                minimum: 0,\n                maximum: 0,\n                title: \"Extra Column\",\n                type: \"string\",\n                placeholder: \"Eg. Lighting, MC, Band\"\n            };\n        },\n        teams() {\n            var self = this;\n            return self.model.teams;\n        },\n        columns() {\n            var self = this;\n            return _.chain(self.teams)\n                .compact()\n                .map(function(team) {\n                    return {\n                        title: team,\n                        key: team\n                    };\n                })\n                .value();\n        }\n    },\n    data() {\n        // var array = [];\n        // _.times(200, function() {\n        //     array.push({\n        //         id: array.length\n        //     });\n        // });\n\n        return {\n            actionsOpen: false,\n            drag: false,\n            dragOptions: {},\n            // array\n        };\n    }\n};\n</script>\n<style lang=\"scss\">\n\n/**/\r\n\r\n$primary: #2ad4b9;//#0bd6be;\r\n$success: #4cc650; //#4cc673;//\r\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\r\n$danger: #d93e63;\r\n$secondary: #0bd6cd; //#0bd6a3;\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n\r\n.border-top {\r\n    border-top: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-right {\r\n    border-right: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-bottom {\r\n    border-bottom: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-left {\r\n    border-left: 1px solid rgba(#000, 0.05);\r\n}\r\n//////////////////////////////////////////\r\n\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n/**/\n.plan-table-wrapper {\n    position: relative;\n    flex: 1;\n    display: flex;\n    overflow: hidden;\n\n    .cog-btn {\n        // width: 36px;\n        // height: 36px;\n        // text-align: center;\n        // position: absolute;\n        // top: 0;\n        // right: 0;\n        // z-index: 3;\n\n        position: absolute;\n        top: 0px;\n        right: 0px;\n        width: 38px;\n        z-index: 3;\n        text-align: center;\n    }\n}\n\n.plan-table {\n    flex: 1;\n    position: relative;\n    width: 100%;\n    z-index: 1;\n    margin: auto;\n    overflow: auto;\n    background: #f0f2f5;\n    height: 100%;\n\n    $cell-padding: 4px 8px;\n\n    p {\n        margin-bottom: 5px !important;\n    }\n\n    mention {\n        font-size: 0.8em;\n        font-weight: 500;\n        background: rgba(#000, 0.1);\n        border-radius: 100px;\n        padding: 2px 4px;\n        display: inline-block;\n        margin: 0 4px;\n    }\n\n    .cell {\n        padding: $cell-padding;\n        word-wrap: break-word;\n        white-space: pre-wrap;\n    }\n\n    .placeholder {\n        padding-bottom: 2px;\n        padding-top: 2px;\n        opacity: 0;\n        font-size: 0.8em;\n        font-style: italic;\n    }\n\n    .row-song-key {\n        min-width: 30px;\n        display: block;\n        text-align-last: center;\n        appearance: none;\n        border: none;\n        outline: none;\n        font-weight: 500;\n    }\n\n    .row-song-key,\n    .row-title {\n        font-size: 1.1em;\n\n        .cell {\n            padding-bottom: 0;\n        }\n    }\n\n    .row-detail {\n        .cell {\n            padding-top: 0;\n        }\n    }\n\n    table {\n        width: 100%;\n        min-width: 600px;\n        margin: auto;\n        border-collapse: separate;\n        border-spacing: 0;\n\n        th,\n        td {\n            text-align: left;\n            padding: 5px;\n            // border-bottom: 1px solid #000;\n            border-bottom: 1px solid #e8edf1;\n            border-right: 1px solid #e8edf1;\n            height: inherit;\n            white-space: nowrap;\n        }\n\n        /////////////////////////////////////\n\n        tr {\n            height: 1px;\n            background: #fff;\n\n            .dragger {\n                opacity: 0;\n            }\n\n            &:hover {\n                .placeholder {\n                    opacity: 0.5;\n                }\n\n                .dragger {\n                    opacity: 0.5;\n                }\n            }\n\n            th:first-child,\n            th:last-child {\n                background: #fff;\n            }\n\n            &:nth-child(odd) {\n                th:first-child,\n                th:last-child {\n                    background: #fcfcfc;\n                }\n\n                background: #fcfcfc;\n            }\n\n            &.song {\n                background: #fffbdd;\n                color: #6b5f31;\n\n                th,\n                td {\n                    // border-top: 1px solid #e8edf1;\n                    // border-bottom: 1px solid #e8edf1;\n                }\n\n                th:first-child,\n                th:last-child {\n                    background: #fffbdd;\n                }\n            }\n\n            &.breaker {\n                background: #f0f2f5;\n\n                th,\n                td {\n                    border-right: none;\n                    border-top: 1px solid #e8edf1;\n                    border-bottom: 1px solid #e8edf1;\n\n                    .cell {\n                        padding: 15px;\n                    }\n\n                    &.row-title {\n                        .cell {\n                            padding-top: inherit;\n                        }\n                    }\n                }\n\n                th:first-child,\n                th:last-child {\n                    background: #f0f2f5;\n                }\n\n                .row-title-text {\n                    opacity: 0.7;\n                    text-transform: uppercase;\n                    font-weight: 600;\n                    letter-spacing: 0.05em;\n                    font-size: 0.8em;\n                }\n            }\n\n\n            &.start {\n                background: #93d3c8;\n\n                th,\n                td {\n                    border-right: none;\n                    border-top: 1px solid #e8edf1;\n                    border-bottom: 1px solid #e8edf1;\n\n                    .cell {\n                        padding: 5px;\n                    }\n\n                    &.row-title {\n                        .cell {\n                            padding-top: inherit;\n                        }\n                    }\n                }\n\n                th:first-child,\n                th:last-child {\n                    background: #93d3c8;\n                }\n\n                .row-title-text {\n                    opacity: 0.7;\n                    text-transform: uppercase;\n                    font-weight: 600;\n                    letter-spacing: 0.05em;\n                    font-size: 0.8em;\n                }\n            }\n        }\n\n        td {\n            vertical-align: top;\n            padding: 0;\n            position: relative;\n\n            &.duration-cell {\n                text-align: center;\n            }\n\n            &:hover {\n                background: rgba($primary, 0.05);\n            }\n\n            p:last-child,\n            .fluro-editor {\n                margin-bottom: 0 !important;\n            }\n\n            .fluro-inline-edit {\n                min-height: 100%;\n                min-width: 100%;\n                display: block;\n                width: 100%;\n                position: relative;\n                float: left;\n                // position: absolute;\n            }\n\n            // &.duration {\n            //     text-align: center;\n\n            //     input {\n            //         width: 70px;\n            //         font-size: 0.9em;\n            //         padding: 0 5px;\n            //         text-align: center;\n            //         line-height: 30px;\n            //     }\n\n            //     // min-height: 50px;\n            // }\n\n            .fluro-inline-edit {\n                width: 100%;\n                height: 100%;\n                // position: absolute;\n                // left:0;\n                // bottom:0;\n                // right:0;\n                // top:0;\n                // overflow: hidden;\n                // border:10px solid #ff0066;\n                display: block;\n\n                .inline-edit-default {\n                    height: auto !important;\n                    width: auto !important;\n                }\n\n                // .inline-hide {\n                //     height: 0 !important;\n                //     width: 0 !important;\n                //     overflow: hidden !important;\n                //     display: block !important;\n                //     // visibility: hidden;\n                // }\n\n                .inline-edit-input {\n                    background: #fff;\n                    position: absolute;\n                    left: 0;\n                    top: 0;\n                    right: 0;\n\n                    &.inline-show {\n                        border-radius: 3px;\n                        border: 3px solid $primary;\n                        box-shadow: 0 4px 10px rgba(#000, 0.3);\n                        z-index: 3;\n                        //width:0 !important;\n                    }\n                }\n\n                input,\n                select {\n                    margin: 0;\n                    max-width: 100%;\n                    width: 100%;\n                    display: block;\n                    padding: $cell-padding;\n                    line-height: 1;\n                }\n            }\n\n            // &.duration-cell {\n            //     position: relative;\n\n            //     left: 0;\n            //     right: 0;\n            //     bottom: 0;\n            //     top: 0;\n            //     width: 100%;\n            //     height: 100%;\n\n            //\n\n            //     // position: absolute;\n            // }\n\n            // }\n        }\n\n        thead th {\n            background: #fff;\n            font-size: 0.8em;\n            // color: #fff;\n            position: -webkit-sticky;\n            position: sticky;\n            top: 0;\n            z-index: 3;\n\n            &.center {\n                text-align: center;\n            }\n\n            &.shrink {\n                width: 1px;\n            }\n\n            &.detail {\n                // width: 40%;\n                max-width: 300px;\n            }\n\n            border-bottom: 3px solid rgba(#000, 0.1);\n        }\n\n        /* safari and ios need the tfoot itself to be position:sticky also */\n        tfoot {\n            th,\n            td {\n                position: -webkit-sticky;\n                position: sticky;\n                bottom: 0;\n                z-index: 4;\n                background: #f0f2f5 !important;\n                border: none !important;\n                border-top: 1px solid rgba(#000, 0.1) !important;\n            }\n        }\n\n        /* testing links*/\n        th:first-child,\n        th:last-child {\n            position: -webkit-sticky;\n            position: sticky;\n            z-index: 2;\n\n            vertical-align: center !important;\n            text-align: center;\n\n            &:first-child {\n                left: 0;\n                width: 1px;\n                border-right: 1px solid #e8edf1;\n            }\n\n            &:last-child {\n                right: 0;\n                width: 1px;\n                border-left: 1px solid #e8edf1;\n            }\n        }\n\n        thead,\n        tfoot {\n            th:first-child,\n            th:last-child {\n                z-index: 5;\n            }\n        }\n\n        /////////////////////////////////\n\n        tr.sortable-ghost {\n            opacity: 0.3;\n            // background:darken(#e8edf1, 30%) !important;\n\n            th,\n            td {\n                border-color: greyscale(darken(#e8edf1, 30%), 1%) !important;\n                background: greyscale(darken(#e8edf1, 30%), 1%) !important;\n            }\n        }\n\n        td .fluro-editor-textarea {\n            min-height: 0;\n\n            & > div {\n                // font-size: 11px;\n                border-radius: 0 !important;\n                padding: $cell-padding !important;\n                border: none !important;\n            }\n        }\n    }\n}\n</style>\n","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.plan-table-wrapper {\n  position: relative;\n  flex: 1;\n  display: flex;\n  overflow: hidden;\n}\n.plan-table-wrapper .cog-btn {\n  position: absolute;\n  top: 0px;\n  right: 0px;\n  width: 38px;\n  z-index: 3;\n  text-align: center;\n}\n\n.plan-table {\n  flex: 1;\n  position: relative;\n  width: 100%;\n  z-index: 1;\n  margin: auto;\n  overflow: auto;\n  background: #f0f2f5;\n  height: 100%;\n}\n.plan-table p {\n  margin-bottom: 5px !important;\n}\n.plan-table mention {\n  font-size: 0.8em;\n  font-weight: 500;\n  background: rgba(0, 0, 0, 0.1);\n  border-radius: 100px;\n  padding: 2px 4px;\n  display: inline-block;\n  margin: 0 4px;\n}\n.plan-table .cell {\n  padding: 4px 8px;\n  word-wrap: break-word;\n  white-space: pre-wrap;\n}\n.plan-table .placeholder {\n  padding-bottom: 2px;\n  padding-top: 2px;\n  opacity: 0;\n  font-size: 0.8em;\n  font-style: italic;\n}\n.plan-table .row-song-key {\n  min-width: 30px;\n  display: block;\n  text-align-last: center;\n  appearance: none;\n  border: none;\n  outline: none;\n  font-weight: 500;\n}\n.plan-table .row-song-key,\n.plan-table .row-title {\n  font-size: 1.1em;\n}\n.plan-table .row-song-key .cell,\n.plan-table .row-title .cell {\n  padding-bottom: 0;\n}\n.plan-table .row-detail .cell {\n  padding-top: 0;\n}\n.plan-table table {\n  width: 100%;\n  min-width: 600px;\n  margin: auto;\n  border-collapse: separate;\n  border-spacing: 0;\n  /* safari and ios need the tfoot itself to be position:sticky also */\n  /* testing links*/\n}\n.plan-table table th,\n.plan-table table td {\n  text-align: left;\n  padding: 5px;\n  border-bottom: 1px solid #e8edf1;\n  border-right: 1px solid #e8edf1;\n  height: inherit;\n  white-space: nowrap;\n}\n.plan-table table tr {\n  height: 1px;\n  background: #fff;\n}\n.plan-table table tr .dragger {\n  opacity: 0;\n}\n.plan-table table tr:hover .placeholder {\n  opacity: 0.5;\n}\n.plan-table table tr:hover .dragger {\n  opacity: 0.5;\n}\n.plan-table table tr th:first-child,\n.plan-table table tr th:last-child {\n  background: #fff;\n}\n.plan-table table tr:nth-child(odd) {\n  background: #fcfcfc;\n}\n.plan-table table tr:nth-child(odd) th:first-child,\n.plan-table table tr:nth-child(odd) th:last-child {\n  background: #fcfcfc;\n}\n.plan-table table tr.song {\n  background: #fffbdd;\n  color: #6b5f31;\n}\n.plan-table table tr.song th:first-child,\n.plan-table table tr.song th:last-child {\n  background: #fffbdd;\n}\n.plan-table table tr.breaker {\n  background: #f0f2f5;\n}\n.plan-table table tr.breaker th,\n.plan-table table tr.breaker td {\n  border-right: none;\n  border-top: 1px solid #e8edf1;\n  border-bottom: 1px solid #e8edf1;\n}\n.plan-table table tr.breaker th .cell,\n.plan-table table tr.breaker td .cell {\n  padding: 15px;\n}\n.plan-table table tr.breaker th.row-title .cell,\n.plan-table table tr.breaker td.row-title .cell {\n  padding-top: inherit;\n}\n.plan-table table tr.breaker th:first-child,\n.plan-table table tr.breaker th:last-child {\n  background: #f0f2f5;\n}\n.plan-table table tr.breaker .row-title-text {\n  opacity: 0.7;\n  text-transform: uppercase;\n  font-weight: 600;\n  letter-spacing: 0.05em;\n  font-size: 0.8em;\n}\n.plan-table table tr.start {\n  background: #93d3c8;\n}\n.plan-table table tr.start th,\n.plan-table table tr.start td {\n  border-right: none;\n  border-top: 1px solid #e8edf1;\n  border-bottom: 1px solid #e8edf1;\n}\n.plan-table table tr.start th .cell,\n.plan-table table tr.start td .cell {\n  padding: 5px;\n}\n.plan-table table tr.start th.row-title .cell,\n.plan-table table tr.start td.row-title .cell {\n  padding-top: inherit;\n}\n.plan-table table tr.start th:first-child,\n.plan-table table tr.start th:last-child {\n  background: #93d3c8;\n}\n.plan-table table tr.start .row-title-text {\n  opacity: 0.7;\n  text-transform: uppercase;\n  font-weight: 600;\n  letter-spacing: 0.05em;\n  font-size: 0.8em;\n}\n.plan-table table td {\n  vertical-align: top;\n  padding: 0;\n  position: relative;\n}\n.plan-table table td.duration-cell {\n  text-align: center;\n}\n.plan-table table td:hover {\n  background: rgba(42, 212, 185, 0.05);\n}\n.plan-table table td p:last-child,\n.plan-table table td .fluro-editor {\n  margin-bottom: 0 !important;\n}\n.plan-table table td .fluro-inline-edit {\n  min-height: 100%;\n  min-width: 100%;\n  display: block;\n  width: 100%;\n  position: relative;\n  float: left;\n}\n.plan-table table td .fluro-inline-edit {\n  width: 100%;\n  height: 100%;\n  display: block;\n}\n.plan-table table td .fluro-inline-edit .inline-edit-default {\n  height: auto !important;\n  width: auto !important;\n}\n.plan-table table td .fluro-inline-edit .inline-edit-input {\n  background: #fff;\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n}\n.plan-table table td .fluro-inline-edit .inline-edit-input.inline-show {\n  border-radius: 3px;\n  border: 3px solid #2ad4b9;\n  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);\n  z-index: 3;\n}\n.plan-table table td .fluro-inline-edit input,\n.plan-table table td .fluro-inline-edit select {\n  margin: 0;\n  max-width: 100%;\n  width: 100%;\n  display: block;\n  padding: 4px 8px;\n  line-height: 1;\n}\n.plan-table table thead th {\n  background: #fff;\n  font-size: 0.8em;\n  position: -webkit-sticky;\n  position: sticky;\n  top: 0;\n  z-index: 3;\n  border-bottom: 3px solid rgba(0, 0, 0, 0.1);\n}\n.plan-table table thead th.center {\n  text-align: center;\n}\n.plan-table table thead th.shrink {\n  width: 1px;\n}\n.plan-table table thead th.detail {\n  max-width: 300px;\n}\n.plan-table table tfoot th,\n.plan-table table tfoot td {\n  position: -webkit-sticky;\n  position: sticky;\n  bottom: 0;\n  z-index: 4;\n  background: #f0f2f5 !important;\n  border: none !important;\n  border-top: 1px solid rgba(0, 0, 0, 0.1) !important;\n}\n.plan-table table th:first-child,\n.plan-table table th:last-child {\n  position: -webkit-sticky;\n  position: sticky;\n  z-index: 2;\n  vertical-align: center !important;\n  text-align: center;\n}\n.plan-table table th:first-child:first-child,\n.plan-table table th:last-child:first-child {\n  left: 0;\n  width: 1px;\n  border-right: 1px solid #e8edf1;\n}\n.plan-table table th:first-child:last-child,\n.plan-table table th:last-child:last-child {\n  right: 0;\n  width: 1px;\n  border-left: 1px solid #e8edf1;\n}\n.plan-table table thead th:first-child,\n.plan-table table thead th:last-child,\n.plan-table table tfoot th:first-child,\n.plan-table table tfoot th:last-child {\n  z-index: 5;\n}\n.plan-table table tr.sortable-ghost {\n  opacity: 0.3;\n}\n.plan-table table tr.sortable-ghost th,\n.plan-table table tr.sortable-ghost td {\n  border-color: greyscale(#89a3b7, 1%) !important;\n  background: greyscale(#89a3b7, 1%) !important;\n}\n.plan-table table td .fluro-editor-textarea {\n  min-height: 0;\n}\n.plan-table table td .fluro-editor-textarea > div {\n  border-radius: 0 !important;\n  padding: 4px 8px !important;\n  border: none !important;\n}\n\n/*# sourceMappingURL=plan.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$2 = undefined;
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
//# sourceMappingURL=plan-f4d82bb4.js.map
