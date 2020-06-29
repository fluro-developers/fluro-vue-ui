
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { bl as __vue_normalize__, bm as __vue_create_injector__ } from './index-d5a35d25.js';
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
import { F as FluroContentEditMixin } from './FluroContentEditMixin-1ec4a2b5.js';

//

var script = {
  components: {// FluroEditor,
  },

  created() {},

  data() {
    return {};
  },

  mixins: [FluroContentEditMixin],
  methods: {},
  asyncComputed: {},
  computed: {
    measureOptions() {
      var self = this;

      if (self.model.count == 1) {
        return [{
          title: 'Minute',
          value: 'minutes'
        }, {
          title: 'Hour',
          value: 'hours'
        }, {
          title: 'Day',
          value: 'days'
        }, {
          title: 'Week',
          value: 'weeks'
        }, {
          title: 'Month',
          value: 'months'
        }, {
          title: 'Year',
          value: 'years'
        }];
      } else {
        return [{
          title: 'Minutes',
          value: 'minutes'
        }, {
          title: 'Hours',
          value: 'hours'
        }, {
          title: 'Days',
          value: 'days'
        }, {
          title: 'Weeks',
          value: 'weeks'
        }, {
          title: 'Months',
          value: 'months'
        }, {
          title: 'Years',
          value: 'years'
        }];
      }
    },

    fieldsOutput() {
      var self = this;
      var array = []; ///////////////////////////////////

      addField('title', {
        title: 'Title',
        minimum: 1,
        maximum: 1,
        type: 'string'
      }); ///////////////////////////////////

      addField('description', {
        title: 'Description',
        // description: 'Enter a one line description summarizing what this role is for and the permissions it grants',
        minimum: 0,
        maximum: 1,
        type: 'string'
      }); ///////////////////////////////////

      addField('count', {
        title: 'Recur every',
        // description: 'Enter a one line description summarizing what this role is for and the permissions it grants',
        minimum: 0,
        maximum: 1,
        type: 'integer'
      });
      addField('measure', {
        title: '',
        minimum: 0,
        maximum: 1,
        type: 'select',
        options: self.measureOptions,
        directive: 'select'
      }); ///////////////////////////////////

      addField('nth', {
        title: 'On the',
        // description: 'Enter a one line description summarizing what this role is for and the permissions it grants',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'select',
        expressions: {
          hide() {
            return self.model.measure != 'months';
          }

        },
        options: [{
          title: 'Same Date',
          value: 'date'
        }, {
          title: 'First',
          value: '1'
        }, {
          title: 'Second',
          value: '2'
        }, {
          title: 'Third',
          value: '3'
        }, {
          title: 'Fourth',
          value: '4'
        }, {
          title: 'Fifth',
          value: '5'
        }]
      });
      addField('weekday', {
        title: 'Weekday',
        // description: 'Enter a one line description summarizing what this role is for and the permissions it grants',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'select',
        expressions: {
          hide() {
            return self.model.nth == 'date';
          }

        },
        options: [{
          title: 'Sunday',
          value: 'sunday'
        }, {
          title: 'Monday',
          value: 'monday'
        }, {
          title: 'Tuesday',
          value: 'tuesday'
        }, {
          title: 'Wednesday',
          value: 'wednesday'
        }, {
          title: 'Thursday',
          value: 'thursday'
        }, {
          title: 'Friday',
          value: 'friday'
        }, {
          title: 'Saturday',
          value: 'saturday'
        }]
      }); ///////////////////////////////////

      addField('timestamp', {
        title: 'At time',
        // description: 'Enter a one line description summarizing what this role is for and the permissions it grants',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'select',
        expressions: {
          hide() {
            if (self.model.measure == 'hours' || self.model.measure == 'minutes') {
              return true;
            }
          }

        },
        options: [{
          title: '12am (Midnight)',
          value: '0000'
        }, {
          title: '1am',
          value: '0100'
        }, {
          title: '2am',
          value: '0200'
        }, {
          title: '3am',
          value: '0300'
        }, {
          title: '4am',
          value: '0400'
        }, {
          title: '5am',
          value: '0500'
        }, {
          title: '6am',
          value: '0600'
        }, {
          title: '7am',
          value: '0700'
        }, {
          title: '8am',
          value: '0800'
        }, {
          title: '9am',
          value: '0900'
        }, {
          title: '10am',
          value: '1000'
        }, {
          title: '11am',
          value: '1100'
        }, {
          title: '12am',
          value: '1200'
        }, {
          title: '1pm',
          value: '1300'
        }, {
          title: '2pm',
          value: '1400'
        }, {
          title: '3pm',
          value: '1500'
        }, {
          title: '4pm',
          value: '1600'
        }, {
          title: '5pm',
          value: '1700'
        }, {
          title: '6pm',
          value: '1800'
        }, {
          title: '7pm',
          value: '1900'
        }, {
          title: '8pm',
          value: '2000'
        }, {
          title: '9pm',
          value: '2100'
        }, {
          title: '10pm',
          value: '2200'
        }, {
          title: '11pm',
          value: '2300'
        }]
      }); ///////////////////////////////////

      addField('timezone', {
        title: 'Timezone',
        // description: 'Enter a one line description summarizing what this role is for and the permissions it grants',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'timezone-select',
        expressions: {
          hide() {
            if (self.model.measure == 'hours' || self.model.measure == 'minutes') {
              return true;
            }
          }

        }
      });
      addField('nextDate', {
        title: 'Next activation',
        description: 'When is the next time this trigger should fire?',
        minimum: 0,
        maximum: 1,
        type: 'date',
        directive: 'datetimepicker'
      });
      addField('reactions', {
        title: 'Reactions',
        description: 'Select reactions that will spark when this trigger is activated',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        params: {
          restrictType: 'reaction'
        }
      }); ///////////////////////////////////

      function addField(key, details) {
        details.key = key;
        array.push(details);
      }

      return array;
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
                  { attrs: { heading: "Information" } },
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
                                _c("fluro-content-form-field", {
                                  attrs: {
                                    "form-fields": _vm.formFields,
                                    outline: _vm.showOutline,
                                    options: _vm.options,
                                    field: _vm.fieldHash.description
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
                                      _c("h4", { attrs: { margin: "" } }, [
                                        _vm._v(
                                          _vm._s(_vm.definition.title) +
                                            " Information"
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
                                  : _vm._e(),
                                _vm._v(" "),
                                _c(
                                  "v-layout",
                                  [
                                    _c(
                                      "v-flex",
                                      { attrs: { xs4: "" } },
                                      [
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
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "v-flex",
                                      { attrs: { xs8: "" } },
                                      [
                                        _c("fluro-content-form-field", {
                                          attrs: {
                                            "form-fields": _vm.formFields,
                                            outline: _vm.showOutline,
                                            options: _vm.options,
                                            field: _vm.fieldHash.measure
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
                                _vm.model.measure == "months"
                                  ? _c(
                                      "v-layout",
                                      [
                                        _c(
                                          "v-flex",
                                          { attrs: { xs4: "" } },
                                          [
                                            _c("fluro-content-form-field", {
                                              attrs: {
                                                "form-fields": _vm.formFields,
                                                outline: _vm.showOutline,
                                                options: _vm.options,
                                                field: _vm.fieldHash.nth
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
                                          { attrs: { xs8: "" } },
                                          [
                                            _c("fluro-content-form-field", {
                                              attrs: {
                                                "form-fields": _vm.formFields,
                                                outline: _vm.showOutline,
                                                options: _vm.options,
                                                field: _vm.fieldHash.weekday
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
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                _vm.model.measure != "hours" &&
                                _vm.model.measure != "minutes"
                                  ? _c(
                                      "v-layout",
                                      [
                                        _c(
                                          "v-flex",
                                          { attrs: { xs4: "" } },
                                          [
                                            _c("fluro-content-form-field", {
                                              attrs: {
                                                "form-fields": _vm.formFields,
                                                outline: _vm.showOutline,
                                                options: _vm.options,
                                                field: _vm.fieldHash.timestamp
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
                                          { attrs: { xs8: "" } },
                                          [
                                            _c("fluro-content-form-field", {
                                              attrs: {
                                                "form-fields": _vm.formFields,
                                                outline: _vm.showOutline,
                                                options: _vm.options,
                                                field: _vm.fieldHash.timezone
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
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                _c(
                                  "v-layout",
                                  [
                                    _c(
                                      "v-flex",
                                      { attrs: { xs12: "", sm4: "" } },
                                      [
                                        _c("fluro-content-form-field", {
                                          attrs: {
                                            "form-fields": _vm.formFields,
                                            outline: _vm.showOutline,
                                            options: _vm.options,
                                            field: _vm.fieldHash.nextDate
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
                                _c("fluro-content-form-field", {
                                  attrs: {
                                    "form-fields": _vm.formFields,
                                    outline: _vm.showOutline,
                                    options: _vm.options,
                                    field: _vm.fieldHash.reactions
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
    inject("data-v-3d6f1e86_0", { source: "/**/\n.border-top[data-v-3d6f1e86] {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right[data-v-3d6f1e86] {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom[data-v-3d6f1e86] {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left[data-v-3d6f1e86] {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n\n/*# sourceMappingURL=timetrigger.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/edit/panels/timetrigger.vue","timetrigger.vue"],"names":[],"mappings":"AA+XA,GAAA;AAYA;EACA,yCAAA;ACzYA;AD4YA;EACA,2CAAA;ACzYA;AD4YA;EACA,4CAAA;ACzYA;AD4YA;EACA,0CAAA;ACzYA;;ADiZA,GAAA;;AC7YA,0CAA0C","file":"timetrigger.vue","sourcesContent":["<template>\n    <flex-column>\n        <!-- <pre>Loading? {{loading}} - {{loadingPermissions}}</pre> -->\n        <template v-if=\"loading\">\n            <fluro-page-preloader contain />\n        </template>\n        <template v-else>\n            <tabset :justified=\"true\" :vertical=\"true\">\n                <tab heading=\"Information\">\n                    <flex-column-body style=\"background: #fafafa;\">\n                        <v-container fluid>\n                            <constrain sm>\n                                <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.title\" v-model=\"model\" />\n                                <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.description\" v-model=\"model\" />\n                                <template v-if=\"definition && definition.fields && definition.fields.length\">\n                                    <h4 margin>{{definition.title}} Information</h4>\n                                    <fluro-content-form :options=\"options\" v-model=\"model.data\" :fields=\"definition.fields\" />\n                                </template>\n                                <v-layout>\n                                    <v-flex xs4>\n                                        <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.count\" v-model=\"model\" />\n                                    </v-flex>\n                                    <v-flex xs8>\n                                        <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.measure\" v-model=\"model\" />\n                                    </v-flex>\n                                </v-layout>\n                                <v-layout v-if=\"model.measure == 'months'\">\n                                    <v-flex xs4>\n                                        <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.nth\" v-model=\"model\" />\n                                    </v-flex>\n                                    <v-flex xs8>\n                                        <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.weekday\" v-model=\"model\" />\n                                    </v-flex>\n                                </v-layout>\n\n                                <v-layout v-if=\"model.measure != 'hours' &&  model.measure != 'minutes'\">\n                                    <v-flex xs4>\n                                        <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.timestamp\" v-model=\"model\" />\n                                    </v-flex>\n                                    <v-flex xs8>\n                                        <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.timezone\" v-model=\"model\" />\n                                    </v-flex>\n                                </v-layout>\n\n\n                                <v-layout>\n                                    <v-flex xs12 sm4>\n                                        <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.nextDate\" v-model=\"model\" />\n                                    </v-flex>\n                                    \n                                </v-layout>\n\n                                        <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.reactions\" v-model=\"model\" />\n\n\n                            </constrain>\n                        </v-container>\n                    </flex-column-body>\n                </tab>\n            </tabset>\n        </template>\n    </flex-column>\n</template>\n<script>\n/////////////////////////////////\n\nimport FluroContentEditMixin from 'src/components/content/edit/FluroContentEditMixin.js';\n\n/////////////////////////////////\n\nimport Vue from 'vue';\n\n/////////////////////////////////\n\nexport default {\n    components: {\n        // FluroEditor,\n    },\n    created() {},\n    data() {\n        return {}\n    },\n    mixins: [FluroContentEditMixin],\n    methods: {},\n    asyncComputed: {\n\n    },\n    computed: {\n        measureOptions() {\n\n            var self = this;\n\n\n\n            if (self.model.count == 1) {\n                return [{\n                        title: 'Minute',\n                        value: 'minutes',\n                    },\n                    {\n                        title: 'Hour',\n                        value: 'hours',\n                    },\n                    {\n                        title: 'Day',\n                        value: 'days',\n                    },\n                    {\n                        title: 'Week',\n                        value: 'weeks',\n                    },\n                    {\n                        title: 'Month',\n                        value: 'months',\n                    },\n                    {\n                        title: 'Year',\n                        value: 'years',\n                    },\n                ]\n            } else {\n                return [{\n                        title: 'Minutes',\n                        value: 'minutes',\n                    },\n                    {\n                        title: 'Hours',\n                        value: 'hours',\n                    },\n                    {\n                        title: 'Days',\n                        value: 'days',\n                    },\n                    {\n                        title: 'Weeks',\n                        value: 'weeks',\n                    },\n                    {\n                        title: 'Months',\n                        value: 'months',\n                    },\n                    {\n                        title: 'Years',\n                        value: 'years',\n                    },\n                ]\n            }\n        },\n        fieldsOutput() {\n\n\n            var self = this;\n            var array = [];\n\n            ///////////////////////////////////\n\n            addField('title', {\n                title: 'Title',\n                minimum: 1,\n                maximum: 1,\n                type: 'string',\n            });\n\n            ///////////////////////////////////\n\n            addField('description', {\n                title: 'Description',\n                // description: 'Enter a one line description summarizing what this role is for and the permissions it grants',\n                minimum: 0,\n                maximum: 1,\n                type: 'string',\n            });\n\n\n            ///////////////////////////////////\n\n            addField('count', {\n                title: 'Recur every',\n                // description: 'Enter a one line description summarizing what this role is for and the permissions it grants',\n                minimum: 0,\n                maximum: 1,\n                type: 'integer',\n            });\n\n            addField('measure', {\n                title: '',\n                minimum: 0,\n                maximum: 1,\n                type: 'select',\n                options: self.measureOptions,\n                directive: 'select',\n            });\n\n\n            ///////////////////////////////////\n\n            addField('nth', {\n                title: 'On the',\n                // description: 'Enter a one line description summarizing what this role is for and the permissions it grants',\n                minimum: 0,\n                maximum: 1,\n                type: 'string',\n                directive: 'select',\n                expressions: {\n                    hide() {\n                        return self.model.measure != 'months';\n                    }\n                },\n                options: [{\n                        title: 'Same Date',\n                        value: 'date',\n                    },\n                    {\n                        title: 'First',\n                        value: '1',\n                    },\n                    {\n                        title: 'Second',\n                        value: '2',\n                    },\n                    {\n                        title: 'Third',\n                        value: '3',\n                    },\n                    {\n                        title: 'Fourth',\n                        value: '4',\n                    },\n                    {\n                        title: 'Fifth',\n                        value: '5',\n                    },\n                ],\n            });\n\n            addField('weekday', {\n                title: 'Weekday',\n                // description: 'Enter a one line description summarizing what this role is for and the permissions it grants',\n                minimum: 0,\n                maximum: 1,\n                type: 'string',\n                directive: 'select',\n                expressions: {\n                    hide() {\n                        return self.model.nth == 'date';\n                    }\n                },\n                options: [{\n                        title: 'Sunday',\n                        value: 'sunday',\n                    },\n                    {\n                        title: 'Monday',\n                        value: 'monday',\n                    },\n                    {\n                        title: 'Tuesday',\n                        value: 'tuesday',\n                    },\n                    {\n                        title: 'Wednesday',\n                        value: 'wednesday',\n                    },\n                    {\n                        title: 'Thursday',\n                        value: 'thursday',\n                    },\n                    {\n                        title: 'Friday',\n                        value: 'friday',\n                    },\n                    {\n                        title: 'Saturday',\n                        value: 'saturday',\n                    },\n                ],\n            });\n\n\n            ///////////////////////////////////\n\n            addField('timestamp', {\n                title: 'At time',\n                // description: 'Enter a one line description summarizing what this role is for and the permissions it grants',\n                minimum: 0,\n                maximum: 1,\n                type: 'string',\n                directive: 'select',\n                expressions: {\n                    hide() {\n                        if(self.model.measure == 'hours' || self.model.measure == 'minutes') {\n                            return true;\n                        }\n                    }\n                },\n                options: [\n                    {title: '12am (Midnight)', value: '0000' },\n                    {title: '1am', value: '0100'},\n                    {title: '2am', value: '0200'},\n                    {title: '3am', value: '0300'},\n                    {title: '4am', value: '0400'},\n                    {title: '5am', value: '0500'},\n                    {title: '6am', value: '0600'},\n                    {title: '7am', value: '0700'},\n                    {title: '8am', value: '0800'},\n                    {title: '9am', value: '0900'},\n                    {title: '10am', value: '1000'},\n                    {title: '11am', value: '1100'},\n                    {title: '12am', value: '1200'},\n                    {title: '1pm', value: '1300'},\n                    {title: '2pm', value: '1400'},\n                    {title: '3pm', value: '1500'},\n                    {title: '4pm', value: '1600'},\n                    {title: '5pm', value: '1700'},\n                    {title: '6pm', value: '1800'},\n                    {title: '7pm', value: '1900'},\n                    {title: '8pm', value: '2000'},\n                    {title: '9pm', value: '2100'},\n                    {title: '10pm', value: '2200'},\n                    {title: '11pm', value: '2300'},\n                ],\n            });\n\n\n            ///////////////////////////////////\n\n            addField('timezone', {\n                title: 'Timezone',\n                // description: 'Enter a one line description summarizing what this role is for and the permissions it grants',\n                minimum: 0,\n                maximum: 1,\n                type: 'string',\n                directive: 'timezone-select',\n                expressions: {\n                    hide() {\n                        if(self.model.measure == 'hours' || self.model.measure == 'minutes') {\n                            return true;\n                        }\n                    }\n                },\n            });\n\n\n            addField('nextDate', {\n                title: 'Next activation',\n                description: 'When is the next time this trigger should fire?',\n                minimum: 0,\n                maximum: 1,\n                type: 'date',\n                directive: 'datetimepicker',\n            });\n\n\n            addField('reactions', {\n                title: 'Reactions',\n                description: 'Select reactions that will spark when this trigger is activated',\n                minimum: 0,\n                maximum: 0,\n                type: 'reference',\n                params:{\n                    restrictType:'reaction',\n                }\n            });\n\n\n            \n\n            ///////////////////////////////////\n\n            function addField(key, details) {\n                details.key = key;\n                array.push(details)\n            }\n\n            return array;\n\n\n        },\n    },\n}\n</script>\n<style lang=\"scss\" scoped>\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n\n/*# sourceMappingURL=timetrigger.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-3d6f1e86";
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
//# sourceMappingURL=timetrigger-ecfd15e1.js.map
