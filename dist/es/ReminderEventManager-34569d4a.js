
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { aM as FluroContentForm, bl as __vue_normalize__, bm as __vue_create_injector__, r as FluroConfirmButton } from './index-a9457dfb.js';
import { F as FluroContentEditMixin } from './FluroContentEditMixin-84f222d6.js';
import { F as FluroExclusiveSelector } from './FluroExclusiveSelector-bd0cc748.js';

//
var script = {
  mixins: [FluroContentEditMixin],
  props: {
    value: {
      type: Object,
      default: function () {
        return {};
      }
    },
    context: {
      type: String,
      default: 'create'
    },
    startDate: {
      type: Date
    },
    endDate: {
      type: Date
    },
    allAssignmentOptions: {
      type: Array
    }
  },
  components: {
    FluroContentForm,
    FluroExclusiveSelector
  },

  data() {
    return {
      model: this.value,
      methodOptions: ['Email', 'SMS', 'Push Notification']
    };
  },

  created() {},

  methods: {
    validate() {
      var form = this.$refs.form;

      if (!form) {
        return [];
      }

      this.model.errorMessages = form.errorMessages || [];
    },

    validateAllFields() {
      var form = this.$refs.form;
      form.touch();
      this.validate();
    },

    setAssignments(value) {
      this.model.assignments = value;
    },

    setMethods(value) {
      this.model.methods = value;
    }

  },
  computed: {
    customFields() {
      var self = this;
      var array = [];
      var periodOptions = []; ///////////////////////////////////

      if (self.model.total != 1) {
        periodOptions = [{
          name: 'Minutes',
          value: 'minute'
        }, {
          name: 'Hours',
          value: 'hour'
        }, {
          name: 'Days',
          value: 'day'
        }, {
          name: 'Weeks',
          value: 'week'
        }, {
          name: 'Months',
          value: 'month'
        }];
      } else {
        periodOptions = [{
          name: 'Minute',
          value: 'minute'
        }, {
          name: 'Hour',
          value: 'hour'
        }, {
          name: 'Day',
          value: 'day'
        }, {
          name: 'Week',
          value: 'week'
        }, {
          name: 'Month',
          value: 'month'
        }];
      }

      addField('total', {
        minimum: 1,
        maximum: 1,
        type: 'integer',
        defaultValues: [1],
        params: {
          minValue: 1
        }
      });
      addField('period', {
        minimum: 1,
        maximum: 1,
        type: 'string',
        directive: 'select',
        defaultValues: ['day'],
        options: periodOptions
      });
      addField('when', {
        minimum: 1,
        maximum: 1,
        type: 'string',
        directive: 'select',
        defaultValues: ['before'],
        options: [{
          name: 'Before',
          value: 'before'
        }, {
          name: 'After',
          value: 'after'
        }]
      });
      addField('point', {
        minimum: 1,
        maximum: 1,
        type: 'string',
        directive: 'select',
        defaultValues: ['start'],
        options: [{
          name: 'Event Starts',
          value: 'start'
        }, {
          name: 'Event Ends',
          value: 'end'
        }]
      });
      addField('methodPreference', {
        title: 'Method Preference',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'select',
        defaultValues: [''],
        options: [{
          name: 'Account Default',
          value: ''
        }, {
          name: 'All - Email and SMS and Push',
          value: 'all'
        }, {
          name: 'Failover - Email, SMS, Push',
          value: 'failover'
        }]
      }); /////////////////////////////////

      addField('message', {
        title: 'Message',
        placeholder: 'Write a custom message in here',
        minimum: 0,
        maximum: 1,
        type: 'string'
      });

      function addField(key, details) {
        details.key = key;
        array.push(details);
      }

      return array;
    },

    createMode() {
      return this.context == 'create';
    },

    viewMode() {
      return this.context == 'view';
    },

    editMode() {
      return this.context == 'edit';
    },

    sendToFormatted() {
      var self = this;
      var assignments = JSON.parse(JSON.stringify(self.model.assignments)); //console.log('ASSIGNMENTS', assignments);

      if (assignments.length == 1 && assignments[0] == "") {
        return 'All Assignments';
      } else {
        return assignments.join(', ');
      }
    },

    formattedTotalPeriodWhenPoint() {
      var self = this;
      var model = self.model;
      var period = self.model.period;

      if (model.total != 1) {
        period = period + 's';
      }

      return model.total + ' ' + period + ' ' + model.when + ' event ' + model.point;
    },

    formattedTime() {
      var self = this;
      var startDate, endDate;
      var total = self.model.total;
      var period = self.model.period;
      var when = self.model.when;
      var point = self.model.point;

      if (!self.startDate || !total || !period || !when || !point) {
        return ['', ''];
      }

      if (!self.endDate) {
        endDate = self.startDate;
      } else {
        endDate = self.endDate;
      }

      startDate = self.startDate; //////////////////////////////////

      var eventTime;

      if (point == 'end') {
        eventTime = endDate;
      } else {
        eventTime = startDate;
      } //////////////////////////////////


      var displayedTime;

      if (when == 'before') {
        displayedTime = self.$fluro.date.moment(eventTime).subtract(total, period);
      } else {
        displayedTime = self.$fluro.date.moment(eventTime).add(total, period);
      }

      return displayedTime;
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
  return _vm.model
    ? _c(
        "div",
        { attrs: { "py-0": "" } },
        [
          _vm.viewMode
            ? _c(
                "v-container",
                { attrs: { fluid: "", "pa-0": "" } },
                [
                  _c(
                    "v-layout",
                    {
                      attrs: {
                        row: "",
                        wrap: "",
                        "grid-list-xl": "",
                        "py-0": ""
                      }
                    },
                    [
                      _c(
                        "v-flex",
                        { attrs: { lg1: "", md2: "", xs2: "" } },
                        [
                          _c(
                            "v-layout",
                            {
                              staticStyle: {
                                height: "100%",
                                "margin-left": "-10px"
                              },
                              attrs: {
                                row: "",
                                wrap: "",
                                "align-center": "",
                                "justify-center": ""
                              }
                            },
                            [
                              _vm.model.methods.includes("email")
                                ? _c("fluro-icon", {
                                    directives: [
                                      { name: "tippy", rawName: "v-tippy" }
                                    ],
                                    attrs: {
                                      icon: "envelope",
                                      content: "Sends email"
                                    }
                                  })
                                : _vm._e(),
                              _vm._v(" "),
                              _vm.model.methods.includes("push")
                                ? _c("fluro-icon", {
                                    directives: [
                                      { name: "tippy", rawName: "v-tippy" }
                                    ],
                                    attrs: {
                                      icon: "mobile",
                                      content: "Sends push notification"
                                    }
                                  })
                                : _vm._e(),
                              _vm._v(" "),
                              _vm.model.methods.includes("sms")
                                ? _c("fluro-icon", {
                                    directives: [
                                      { name: "tippy", rawName: "v-tippy" }
                                    ],
                                    attrs: {
                                      icon: "comment",
                                      content: "Sends SMS"
                                    }
                                  })
                                : _vm._e()
                            ],
                            1
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-flex",
                        { attrs: { lg11: "", md10: "", xs10: "" } },
                        [
                          _c("p", { staticClass: "muted mb-0" }, [
                            _vm._v("Sending to "),
                            _c("span", { staticClass: "capitalize-text" }, [
                              _vm._v(_vm._s(_vm.sendToFormatted))
                            ])
                          ]),
                          _vm._v(" "),
                          _c("h5", [_vm._v(_vm._s(_vm.model.message))]),
                          _vm._v(" "),
                          _c("p", { staticClass: "muted mb-0" }, [
                            _vm._v(
                              _vm._s(_vm.formattedTotalPeriodWhenPoint) +
                                " " +
                                _vm._s(
                                  _vm.startDate
                                    ? "- " +
                                        _vm.formattedTime.format(
                                          "h:mma dddd MMM Do YYYY"
                                        )
                                    : ""
                                ) +
                                " " +
                                _vm._s(
                                  _vm.startDate
                                    ? "(" + _vm.formattedTime.fromNow() + ")"
                                    : ""
                                )
                            )
                          ])
                        ]
                      )
                    ],
                    1
                  )
                ],
                1
              )
            : _vm.editMode
            ? _c(
                "div",
                [
                  _c(
                    "v-container",
                    { attrs: { fluid: "", "pa-0": "" } },
                    [
                      _c(
                        "v-layout",
                        {
                          attrs: {
                            row: "",
                            wrap: "",
                            "grid-list-xl": "",
                            "py-0": ""
                          }
                        },
                        [
                          _c(
                            "v-flex",
                            { attrs: { lg1: "", md2: "", xs2: "" } },
                            [
                              _c(
                                "v-layout",
                                {
                                  staticStyle: {
                                    height: "100%",
                                    "margin-left": "-10px"
                                  },
                                  attrs: {
                                    row: "",
                                    wrap: "",
                                    "align-center": "",
                                    "justify-center": ""
                                  }
                                },
                                [
                                  _vm.model.methods.includes("email")
                                    ? _c("fluro-icon", {
                                        directives: [
                                          { name: "tippy", rawName: "v-tippy" }
                                        ],
                                        attrs: {
                                          icon: "envelope",
                                          content: "Sends email"
                                        }
                                      })
                                    : _vm._e(),
                                  _vm._v(" "),
                                  _vm.model.methods.includes("push")
                                    ? _c("fluro-icon", {
                                        directives: [
                                          { name: "tippy", rawName: "v-tippy" }
                                        ],
                                        attrs: {
                                          icon: "mobile",
                                          content: "Sends push notification"
                                        }
                                      })
                                    : _vm._e(),
                                  _vm._v(" "),
                                  _vm.model.methods.includes("sms")
                                    ? _c("fluro-icon", {
                                        directives: [
                                          { name: "tippy", rawName: "v-tippy" }
                                        ],
                                        attrs: {
                                          icon: "comment",
                                          content: "Sends SMS"
                                        }
                                      })
                                    : _vm._e()
                                ],
                                1
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-flex",
                            { attrs: { lg11: "", md10: "", xs10: "" } },
                            [
                              _c("p", { staticClass: "muted mb-0" }, [
                                _vm._v("Sending to "),
                                _c("span", { staticClass: "capitalize-text" }, [
                                  _vm._v(_vm._s(_vm.sendToFormatted))
                                ])
                              ]),
                              _vm._v(" "),
                              _c("h5", [_vm._v(_vm._s(_vm.model.message))]),
                              _vm._v(" "),
                              _c("p", { staticClass: "muted mb-0" }, [
                                _vm._v(
                                  _vm._s(_vm.formattedTotalPeriodWhenPoint) +
                                    " " +
                                    _vm._s(
                                      _vm.startDate
                                        ? "- " +
                                            _vm.formattedTime.format(
                                              "h:mma dddd MMM Do YYYY"
                                            )
                                        : ""
                                    ) +
                                    " " +
                                    _vm._s(
                                      _vm.startDate
                                        ? "(" +
                                            _vm.formattedTime.fromNow() +
                                            ")"
                                        : ""
                                    )
                                )
                              ])
                            ]
                          )
                        ],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-container",
                    { attrs: { fluid: "", "pa-0": "", "grid-list-xl": "" } },
                    [
                      _c(
                        "v-layout",
                        {
                          attrs: {
                            row: "",
                            wrap: "",
                            "grid-list-xl": "",
                            "py-0": ""
                          }
                        },
                        [
                          _c(
                            "v-flex",
                            { attrs: { sm12: "", xs12: "" } },
                            [
                              _c(
                                "fluro-panel",
                                [
                                  _c(
                                    "fluro-panel-body",
                                    [
                                      _c("h4", [_vm._v("When")]),
                                      _vm._v(" "),
                                      _c("fluro-content-form", {
                                        ref: "form",
                                        attrs: {
                                          options: _vm.options,
                                          fields: _vm.customFields
                                        },
                                        scopedSlots: _vm._u(
                                          [
                                            {
                                              key: "form",
                                              fn: function(ref) {
                                                var formFields = ref.formFields;
                                                var fieldHash = ref.fieldHash;
                                                var model = ref.model;
                                                var update = ref.update;
                                                var options = ref.options;
                                                return [
                                                  _c(
                                                    "v-layout",
                                                    {
                                                      attrs: {
                                                        row: "",
                                                        wrap: "",
                                                        "grid-list-xl": ""
                                                      }
                                                    },
                                                    [
                                                      _c(
                                                        "v-flex",
                                                        {
                                                          attrs: {
                                                            xs12: "",
                                                            sm3: ""
                                                          }
                                                        },
                                                        [
                                                          _c(
                                                            "fluro-content-form-field",
                                                            {
                                                              attrs: {
                                                                "form-fields": formFields,
                                                                options: options,
                                                                field:
                                                                  fieldHash.total
                                                              },
                                                              on: {
                                                                input: update
                                                              },
                                                              model: {
                                                                value: model,
                                                                callback: function(
                                                                  $$v
                                                                ) {
                                                                  model = $$v;
                                                                },
                                                                expression:
                                                                  "model"
                                                              }
                                                            }
                                                          )
                                                        ],
                                                        1
                                                      ),
                                                      _vm._v(" "),
                                                      _c(
                                                        "v-flex",
                                                        {
                                                          attrs: {
                                                            xs12: "",
                                                            sm3: ""
                                                          }
                                                        },
                                                        [
                                                          _c(
                                                            "fluro-content-form-field",
                                                            {
                                                              attrs: {
                                                                "form-fields": formFields,
                                                                options: options,
                                                                field:
                                                                  fieldHash.period
                                                              },
                                                              on: {
                                                                input: update
                                                              },
                                                              model: {
                                                                value: model,
                                                                callback: function(
                                                                  $$v
                                                                ) {
                                                                  model = $$v;
                                                                },
                                                                expression:
                                                                  "model"
                                                              }
                                                            }
                                                          )
                                                        ],
                                                        1
                                                      ),
                                                      _vm._v(" "),
                                                      _c(
                                                        "v-flex",
                                                        {
                                                          attrs: {
                                                            xs12: "",
                                                            sm3: ""
                                                          }
                                                        },
                                                        [
                                                          _c(
                                                            "fluro-content-form-field",
                                                            {
                                                              attrs: {
                                                                "form-fields": formFields,
                                                                options: options,
                                                                field:
                                                                  fieldHash.when
                                                              },
                                                              on: {
                                                                input: update
                                                              },
                                                              model: {
                                                                value: model,
                                                                callback: function(
                                                                  $$v
                                                                ) {
                                                                  model = $$v;
                                                                },
                                                                expression:
                                                                  "model"
                                                              }
                                                            }
                                                          )
                                                        ],
                                                        1
                                                      ),
                                                      _vm._v(" "),
                                                      _c(
                                                        "v-flex",
                                                        {
                                                          attrs: {
                                                            xs12: "",
                                                            sm3: ""
                                                          }
                                                        },
                                                        [
                                                          _c(
                                                            "fluro-content-form-field",
                                                            {
                                                              attrs: {
                                                                "form-fields": formFields,
                                                                options: options,
                                                                field:
                                                                  fieldHash.point
                                                              },
                                                              on: {
                                                                input: update
                                                              },
                                                              model: {
                                                                value: model,
                                                                callback: function(
                                                                  $$v
                                                                ) {
                                                                  model = $$v;
                                                                },
                                                                expression:
                                                                  "model"
                                                              }
                                                            }
                                                          )
                                                        ],
                                                        1
                                                      ),
                                                      _vm._v(" "),
                                                      _c(
                                                        "v-flex",
                                                        {
                                                          attrs: {
                                                            xs12: "",
                                                            sm12: ""
                                                          }
                                                        },
                                                        [
                                                          _c(
                                                            "fluro-content-form-field",
                                                            {
                                                              attrs: {
                                                                "form-fields": formFields,
                                                                options: options,
                                                                field:
                                                                  fieldHash.message
                                                              },
                                                              on: {
                                                                input: update
                                                              },
                                                              model: {
                                                                value: model,
                                                                callback: function(
                                                                  $$v
                                                                ) {
                                                                  model = $$v;
                                                                },
                                                                expression:
                                                                  "model"
                                                              }
                                                            }
                                                          )
                                                        ],
                                                        1
                                                      )
                                                    ],
                                                    1
                                                  )
                                                ]
                                              }
                                            }
                                          ],
                                          null,
                                          false,
                                          593553063
                                        ),
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
                          _c(
                            "v-flex",
                            { attrs: { md6: "", sm12: "", xs12: "" } },
                            [
                              _c("fluro-exclusive-selector", {
                                attrs: {
                                  allLabel: "Default Channels",
                                  otherOptions: _vm.methodOptions,
                                  path: "methods"
                                },
                                on: { change: _vm.setMethods },
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
                            { attrs: { md6: "", sm12: "", xs12: "" } },
                            [
                              _c("fluro-content-form", {
                                ref: "form",
                                attrs: {
                                  options: _vm.options,
                                  fields: _vm.customFields
                                },
                                scopedSlots: _vm._u(
                                  [
                                    {
                                      key: "form",
                                      fn: function(ref) {
                                        var formFields = ref.formFields;
                                        var fieldHash = ref.fieldHash;
                                        var model = ref.model;
                                        var update = ref.update;
                                        var options = ref.options;
                                        return [
                                          _c("fluro-content-form-field", {
                                            attrs: {
                                              "form-fields": formFields,
                                              options: options,
                                              field: fieldHash.methodPreference
                                            },
                                            on: { input: update },
                                            model: {
                                              value: model,
                                              callback: function($$v) {
                                                model = $$v;
                                              },
                                              expression: "model"
                                            }
                                          })
                                        ]
                                      }
                                    }
                                  ],
                                  null,
                                  false,
                                  4123648457
                                ),
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
                  )
                ],
                1
              )
            : _vm.createMode
            ? _c(
                "v-container",
                { attrs: { fluid: "", "pa-0": "" } },
                [
                  _c(
                    "v-layout",
                    {
                      attrs: {
                        row: "",
                        wrap: "",
                        "grid-list-xl": "",
                        "py-0": ""
                      }
                    },
                    [
                      _c(
                        "v-flex",
                        { attrs: { sm5: "", xs12: "", "py-0": "" } },
                        [
                          _c("fluro-exclusive-selector", {
                            attrs: {
                              allLabel: "All Assignments",
                              otherOptions: _vm.allAssignmentOptions,
                              path: "assignments"
                            },
                            on: { change: _vm.setAssignments },
                            model: {
                              value: _vm.model,
                              callback: function($$v) {
                                _vm.model = $$v;
                              },
                              expression: "model"
                            }
                          }),
                          _vm._v(" "),
                          _c("fluro-exclusive-selector", {
                            attrs: {
                              allLabel: "Default Channels",
                              otherOptions: _vm.methodOptions,
                              path: "methods"
                            },
                            on: { change: _vm.setMethods },
                            model: {
                              value: _vm.model,
                              callback: function($$v) {
                                _vm.model = $$v;
                              },
                              expression: "model"
                            }
                          }),
                          _vm._v(" "),
                          _c("fluro-content-form", {
                            ref: "form",
                            attrs: {
                              options: _vm.options,
                              fields: _vm.customFields
                            },
                            scopedSlots: _vm._u(
                              [
                                {
                                  key: "form",
                                  fn: function(ref) {
                                    var formFields = ref.formFields;
                                    var fieldHash = ref.fieldHash;
                                    var model = ref.model;
                                    var update = ref.update;
                                    var options = ref.options;
                                    return [
                                      _c("fluro-content-form-field", {
                                        staticClass: "pr-2",
                                        attrs: {
                                          "form-fields": formFields,
                                          options: options,
                                          field: fieldHash.methodPreference
                                        },
                                        on: { input: update },
                                        model: {
                                          value: model,
                                          callback: function($$v) {
                                            model = $$v;
                                          },
                                          expression: "model"
                                        }
                                      })
                                    ]
                                  }
                                }
                              ],
                              null,
                              false,
                              2459919732
                            ),
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
                        { attrs: { sm7: "", xs12: "", "py-0": "" } },
                        [
                          _c(
                            "fluro-panel",
                            [
                              _c(
                                "fluro-panel-body",
                                [
                                  _c("h4", [_vm._v("When")]),
                                  _vm._v(" "),
                                  _c("fluro-content-form", {
                                    ref: "form",
                                    attrs: {
                                      options: _vm.options,
                                      fields: _vm.customFields
                                    },
                                    scopedSlots: _vm._u(
                                      [
                                        {
                                          key: "form",
                                          fn: function(ref) {
                                            var formFields = ref.formFields;
                                            var fieldHash = ref.fieldHash;
                                            var model = ref.model;
                                            var update = ref.update;
                                            var options = ref.options;
                                            return [
                                              _c(
                                                "v-layout",
                                                {
                                                  attrs: { row: "", wrap: "" }
                                                },
                                                [
                                                  _c(
                                                    "v-flex",
                                                    {
                                                      attrs: {
                                                        xs12: "",
                                                        sm3: ""
                                                      }
                                                    },
                                                    [
                                                      _c(
                                                        "fluro-content-form-field",
                                                        {
                                                          attrs: {
                                                            "form-fields": formFields,
                                                            options: options,
                                                            field:
                                                              fieldHash.total
                                                          },
                                                          on: { input: update },
                                                          model: {
                                                            value: model,
                                                            callback: function(
                                                              $$v
                                                            ) {
                                                              model = $$v;
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
                                                    {
                                                      attrs: {
                                                        xs12: "",
                                                        sm3: ""
                                                      }
                                                    },
                                                    [
                                                      _c(
                                                        "fluro-content-form-field",
                                                        {
                                                          attrs: {
                                                            "form-fields": formFields,
                                                            options: options,
                                                            field:
                                                              fieldHash.period
                                                          },
                                                          on: { input: update },
                                                          model: {
                                                            value: model,
                                                            callback: function(
                                                              $$v
                                                            ) {
                                                              model = $$v;
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
                                                    {
                                                      attrs: {
                                                        xs12: "",
                                                        sm3: ""
                                                      }
                                                    },
                                                    [
                                                      _c(
                                                        "fluro-content-form-field",
                                                        {
                                                          attrs: {
                                                            "form-fields": formFields,
                                                            options: options,
                                                            field:
                                                              fieldHash.when
                                                          },
                                                          on: { input: update },
                                                          model: {
                                                            value: model,
                                                            callback: function(
                                                              $$v
                                                            ) {
                                                              model = $$v;
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
                                                    {
                                                      attrs: {
                                                        xs12: "",
                                                        sm3: ""
                                                      }
                                                    },
                                                    [
                                                      _c(
                                                        "fluro-content-form-field",
                                                        {
                                                          attrs: {
                                                            "form-fields": formFields,
                                                            options: options,
                                                            field:
                                                              fieldHash.point
                                                          },
                                                          on: { input: update },
                                                          model: {
                                                            value: model,
                                                            callback: function(
                                                              $$v
                                                            ) {
                                                              model = $$v;
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
                                                    {
                                                      attrs: {
                                                        xs12: "",
                                                        sm12: ""
                                                      }
                                                    },
                                                    [
                                                      _c(
                                                        "fluro-content-form-field",
                                                        {
                                                          attrs: {
                                                            "form-fields": formFields,
                                                            options: options,
                                                            field:
                                                              fieldHash.message
                                                          },
                                                          on: { input: update },
                                                          model: {
                                                            value: model,
                                                            callback: function(
                                                              $$v
                                                            ) {
                                                              model = $$v;
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
                                            ]
                                          }
                                        }
                                      ],
                                      null,
                                      false,
                                      3801550847
                                    ),
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
    : _vm._e()
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-1fb3187f_0", { source: "\n.capitalize-text {\n    text-transform: capitalize;\n}\n", map: {"version":3,"sources":["C:\\Users\\User\\Documents\\fluro\\fluro-vue-ui\\src\\components\\content\\edit\\components\\ReminderEventComponent.vue"],"names":[],"mappings":";AAiZA;IACA,0BAAA;AACA","file":"ReminderEventComponent.vue","sourcesContent":["<template>\n    <div v-if=\"model\" py-0>\n        <v-container fluid v-if=\"viewMode\" pa-0>\n            <v-layout row wrap grid-list-xl py-0>\n                <v-flex lg1 md2 xs2>\n                    <v-layout row wrap align-center justify-center style=\"height:100%;margin-left:-10px;\">\n                        <fluro-icon v-if=\"model.methods.includes('email')\" icon=\"envelope\" v-tippy content=\"Sends email\" />\n                        <fluro-icon v-if=\"model.methods.includes('push')\" icon=\"mobile\" v-tippy content=\"Sends push notification\" />\n                        <fluro-icon v-if=\"model.methods.includes('sms')\" icon=\"comment\" v-tippy content=\"Sends SMS\" />\n                    </v-layout>\n                </v-flex>\n                <v-flex lg11 md10 xs10>\n                    <p class=\"muted mb-0\">Sending to <span class=\"capitalize-text\">{{sendToFormatted}}</span></p>\n                    <h5>{{model.message}}</h5>\n                    <p class=\"muted mb-0\">{{formattedTotalPeriodWhenPoint}} {{startDate ? '- ' + formattedTime.format(\"h:mma dddd MMM Do YYYY\") : ''}} {{startDate ? '(' + formattedTime.fromNow() + ')' : ''}}</p>\n                </v-flex>\n            </v-layout>\n        </v-container>\n        <div v-else-if=\"editMode\">\n            <v-container fluid pa-0>\n                <v-layout row wrap grid-list-xl py-0>\n                    <v-flex lg1 md2 xs2>\n                        <v-layout row wrap align-center justify-center style=\"height:100%;margin-left:-10px;\">\n                            <fluro-icon v-if=\"model.methods.includes('email')\" icon=\"envelope\" v-tippy content=\"Sends email\" />\n                            <fluro-icon v-if=\"model.methods.includes('push')\" icon=\"mobile\" v-tippy content=\"Sends push notification\" />\n                            <fluro-icon v-if=\"model.methods.includes('sms')\" icon=\"comment\" v-tippy content=\"Sends SMS\" />\n                        </v-layout>\n                    </v-flex>\n                    <v-flex lg11 md10 xs10>\n                        <p class=\"muted mb-0\">Sending to <span class=\"capitalize-text\">{{sendToFormatted}}</span></p>\n                        <h5>{{model.message}}</h5>\n                        <p class=\"muted mb-0\">{{formattedTotalPeriodWhenPoint}} {{startDate ? '- ' + formattedTime.format(\"h:mma dddd MMM Do YYYY\") : ''}} {{startDate ? '(' + formattedTime.fromNow() + ')' : ''}}</p>\n                    </v-flex>\n                </v-layout>\n            </v-container>\n            <v-container fluid pa-0 grid-list-xl>\n                <v-layout row wrap grid-list-xl py-0>\n                    <v-flex sm12 xs12>\n                        <fluro-panel>\n                            <fluro-panel-body>\n                                <h4>When</h4>\n                                <fluro-content-form :options=\"options\" v-model=\"model\" :fields=\"customFields\" ref=\"form\">\n                                    <template v-slot:form=\"{formFields, fieldHash, model, update, options}\">\n                                        <v-layout row wrap grid-list-xl>\n                                            <v-flex xs12 sm3>\n                                                <fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.total\" v-model=\"model\" />\n                                            </v-flex>\n                                            <v-flex xs12 sm3>\n                                                <fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.period\" v-model=\"model\" />\n                                            </v-flex>\n                                            <v-flex xs12 sm3>\n                                                <fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.when\" v-model=\"model\" />\n                                            </v-flex>\n                                            <v-flex xs12 sm3>\n                                                <fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.point\" v-model=\"model\" />\n                                            </v-flex>\n                                            <v-flex xs12 sm12>\n                                                <fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.message\" v-model=\"model\" />\n                                            </v-flex>\n                                        </v-layout>\n                                    </template>\n                                </fluro-content-form>\n                            </fluro-panel-body>\n                        </fluro-panel>\n                    </v-flex>\n                    <v-flex md6 sm12 xs12>\n                        <fluro-exclusive-selector allLabel=\"Default Channels\" :otherOptions=\"methodOptions\" v-model=\"model\" path=\"methods\" @change=\"setMethods\" />\n                    </v-flex>\n                    <v-flex md6 sm12 xs12>\n                        <fluro-content-form :options=\"options\" v-model=\"model\" :fields=\"customFields\" ref=\"form\">\n                            <template v-slot:form=\"{formFields, fieldHash, model, update, options}\">\n                                <fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.methodPreference\" v-model=\"model\"></fluro-content-form-field>\n                            </template>\n                        </fluro-content-form>\n                    </v-flex>\n                </v-layout>\n            </v-container>\n        </div>\n        <v-container fluid v-else-if=\"createMode\" pa-0>\n            <v-layout row wrap grid-list-xl py-0>\n                <v-flex sm5 xs12 py-0>\n                    <fluro-exclusive-selector allLabel=\"All Assignments\" :otherOptions=\"allAssignmentOptions\" v-model=\"model\" path=\"assignments\" @change=\"setAssignments\" />\n                    <fluro-exclusive-selector allLabel=\"Default Channels\" :otherOptions=\"methodOptions\" v-model=\"model\" path=\"methods\" @change=\"setMethods\" />\n                    <fluro-content-form :options=\"options\" v-model=\"model\" :fields=\"customFields\" ref=\"form\">\n                        <template v-slot:form=\"{formFields, fieldHash, model, update, options}\">\n                            <fluro-content-form-field class=\"pr-2\" :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.methodPreference\" v-model=\"model\"></fluro-content-form-field>\n                        </template>\n                    </fluro-content-form>\n                </v-flex>\n                <v-flex sm7 xs12 py-0>\n                    <fluro-panel>\n                        <fluro-panel-body>\n                            <h4>When</h4>\n                            <fluro-content-form :options=\"options\" v-model=\"model\" :fields=\"customFields\" ref=\"form\">\n                                <template v-slot:form=\"{formFields, fieldHash, model, update, options}\">\n                                    <v-layout row wrap>\n                                        <v-flex xs12 sm3>\n                                            <fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.total\" v-model=\"model\" />\n                                        </v-flex>\n                                        <v-flex xs12 sm3>\n                                            <fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.period\" v-model=\"model\" />\n                                        </v-flex>\n                                        <v-flex xs12 sm3>\n                                            <fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.when\" v-model=\"model\" />\n                                        </v-flex>\n                                        <v-flex xs12 sm3>\n                                            <fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.point\" v-model=\"model\" />\n                                        </v-flex>\n                                        <v-flex xs12 sm12>\n                                            <fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.message\" v-model=\"model\" />\n                                        </v-flex>\n                                    </v-layout>\n                                </template>\n                            </fluro-content-form>\n                        </fluro-panel-body>\n                    </fluro-panel>\n                </v-flex>\n            </v-layout>\n        </v-container>\n    </div>\n</template>\n<script>\nimport FluroContentEditMixin from 'src/components/content/edit/FluroContentEditMixin.js';\nimport FluroExclusiveSelector from 'src/components/content/edit/components/FluroExclusiveSelector.vue';\nimport FluroContentForm from 'src/components/form/FluroContentForm.vue';\n\n\nexport default {\n    mixins: [FluroContentEditMixin],\n    props: {\n        value: {\n            type: Object,\n            default: function() {\n                return {};\n            },\n        },\n        context: {\n            type: String,\n            default: 'create',\n        },\n        startDate: {\n            type: Date,\n        },\n        endDate: {\n            type: Date,\n        },\n        allAssignmentOptions: {\n            type: Array,\n        }\n    },\n    components: {\n        FluroContentForm,\n        FluroExclusiveSelector\n    },\n    data() {\n        return {\n            model: this.value,\n            methodOptions: ['Email', 'SMS', 'Push Notification'],\n        }\n    },\n    created() {},\n    methods: {\n        validate() {\n            var form = this.$refs.form;\n            if (!form) {\n                return [];\n            }\n            this.model.errorMessages = form.errorMessages || [];\n        },\n        validateAllFields() {\n            var form = this.$refs.form;\n            form.touch();\n            this.validate();\n        },\n        setAssignments(value) {\n            this.model.assignments = value;\n        },\n        setMethods(value) {\n            this.model.methods = value;\n        },\n    },\n    computed: {\n        customFields() {\n\n            var self = this;\n            var array = [];\n            var periodOptions = [];\n            ///////////////////////////////////\n            if (self.model.total != 1) {\n                periodOptions = [{\n                        name: 'Minutes',\n                        value: 'minute',\n                    },\n                    {\n                        name: 'Hours',\n                        value: 'hour',\n                    },\n                    {\n                        name: 'Days',\n                        value: 'day',\n                    },\n                    {\n                        name: 'Weeks',\n                        value: 'week',\n                    },\n                    {\n                        name: 'Months',\n                        value: 'month',\n                    },\n                ]\n            } else {\n                periodOptions = [{\n                        name: 'Minute',\n                        value: 'minute',\n                    },\n                    {\n                        name: 'Hour',\n                        value: 'hour',\n                    },\n                    {\n                        name: 'Day',\n                        value: 'day',\n                    },\n                    {\n                        name: 'Week',\n                        value: 'week',\n                    },\n                    {\n                        name: 'Month',\n                        value: 'month',\n                    },\n                ]\n            }\n\n            addField('total', {\n                minimum: 1,\n                maximum: 1,\n                type: 'integer',\n                defaultValues: [1],\n                params: { minValue: 1 }\n            })\n\n            addField('period', {\n                minimum: 1,\n                maximum: 1,\n                type: 'string',\n                directive: 'select',\n                defaultValues: ['day'],\n                options: periodOptions\n            })\n\n\n            addField('when', {\n                minimum: 1,\n                maximum: 1,\n                type: 'string',\n                directive: 'select',\n                defaultValues: ['before'],\n                options: [{\n                        name: 'Before',\n                        value: 'before',\n                    },\n                    {\n                        name: 'After',\n                        value: 'after',\n                    },\n                ]\n            })\n\n\n            addField('point', {\n                minimum: 1,\n                maximum: 1,\n                type: 'string',\n                directive: 'select',\n                defaultValues: ['start'],\n                options: [{\n                        name: 'Event Starts',\n                        value: 'start',\n                    },\n                    {\n                        name: 'Event Ends',\n                        value: 'end',\n                    },\n                ]\n            })\n\n            addField('methodPreference', {\n                title: 'Method Preference',\n                minimum: 0,\n                maximum: 1,\n                type: 'string',\n                directive: 'select',\n                defaultValues: [''],\n                options: [{\n                        name: 'Account Default',\n                        value: '',\n                    },\n                    {\n                        name: 'All - Email and SMS and Push',\n                        value: 'all',\n                    },\n                    {\n                        name: 'Failover - Email, SMS, Push',\n                        value: 'failover',\n                    },\n                ]\n            })\n\n            /////////////////////////////////\n\n\n            addField('message', {\n                title: 'Message',\n                placeholder: 'Write a custom message in here',\n                minimum: 0,\n                maximum: 1,\n                type: 'string',\n            })\n\n            function addField(key, details) {\n                details.key = key;\n                array.push(details)\n            }\n\n            return array;\n        },\n        createMode() {\n            return this.context == 'create';\n        },\n        viewMode() {\n            return this.context == 'view';\n        },\n        editMode() {\n            return this.context == 'edit';\n        },\n        sendToFormatted() {\n            var self = this;\n            var assignments = JSON.parse(JSON.stringify(self.model.assignments));\n            //console.log('ASSIGNMENTS', assignments);\n            if ((assignments.length == 1) && (assignments[0] == \"\")) {\n                return 'All Assignments';\n            } else {\n                return assignments.join(', ');\n            }\n        },\n        formattedTotalPeriodWhenPoint() {\n            var self = this;\n            var model = self.model;\n            var period = self.model.period;\n            if (model.total != 1) {\n                period = period + 's';\n            }\n            return model.total + ' ' + period + ' ' + model.when + ' event ' + model.point;\n        },\n        formattedTime() {\n            var self = this;\n            var startDate, endDate;\n\n            var total = self.model.total;\n            var period = self.model.period;\n            var when = self.model.when;\n            var point = self.model.point;\n\n            if (!self.startDate || !total || !period || !when || !point) {\n                return ['', ''];\n            }\n\n            if (!self.endDate) {\n                endDate = self.startDate;\n            } else {\n                endDate = self.endDate;\n            }\n\n            startDate = self.startDate;\n\n\n            //////////////////////////////////\n\n            var eventTime;\n            if (point == 'end') {\n                eventTime = endDate;\n            } else {\n                eventTime = startDate;\n            }\n\n            //////////////////////////////////\n\n            var displayedTime;\n            if (when == 'before') {\n                displayedTime = self.$fluro.date.moment(eventTime).subtract(total, period);\n            } else {\n                displayedTime = self.$fluro.date.moment(eventTime).add(total, period);\n            }\n\n            return displayedTime;\n        }\n    }\n}\n</script>\n<style>\n.capitalize-text {\n    text-transform: capitalize;\n}\n</style>"]}, media: undefined });

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
  props: {
    value: {
      type: Array,
      default: function () {
        return [];
      }
    },
    config: {
      type: Object,
      required: true
    },
    startDate: {
      type: Date
    },
    endDate: {
      type: Date
    },
    allAssignmentOptions: {
      type: Array
    }
  },

  created() {
    for (let i = 0; i < this.model.length; i++) {
      this.editing.push(false);
    }
  },

  components: {
    ReminderEventComponent: __vue_component__,
    FluroConfirmButton
  },

  data() {
    return {
      model: this.value,
      proposed: {},
      editing: [],
      clonedModel: this.value
    };
  },

  methods: {
    add() {
      var self = this;
      self.$refs.createform.validateAllFields();
      var clone = JSON.parse(JSON.stringify(self.proposed));

      if (clone.errorMessages.length) {
        return;
      }

      delete clone.row;
      this.model.push(clone);
      this.editing.push(false);
      self.$set(self, 'proposed', {
        'assignments': [''],
        'methods': ['']
      });
    },

    remove(index) {
      this.model.splice(index, 1);
      this.editing.splice(index, 1);
    },

    toggleEdit(index) {
      var self = this; //console.log(self.$refs);
      //console.log('ON TOGGLE', self.model[index], self.clonedModel[index]);

      console.log('MODEL', this.model[index].methods, 'CLONEDMODEL', this.clonedModel[index].methods);

      if (self.editing[index]) {
        if (self.clonedModel[index].message.length) {
          self.model[index] = self.clonedModel[index];
          return self.$set(self.editing, index, false);
        }

        return;
      } else {
        return self.$set(self.editing, index, true);
      }
    }

  },
  watch: {
    'model': function () {
      this.clonedModel = JSON.parse(JSON.stringify(this.model));
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
      _c("h4", [
        _vm._v(
          _vm._s(_vm.model.length) +
            " scheduled reminder" +
            _vm._s(_vm.model.length == 1 ? "" : "s")
        )
      ]),
      _vm._v(" "),
      _c("p", { staticClass: "muted" }, [
        _vm._v(
          "Create notifications below to be sent to 'confirmed' rostered contacts before or after the event"
        )
      ]),
      _vm._v(" "),
      _c(
        "list-group",
        _vm._l(_vm.model, function(message, index) {
          return _c(
            "list-group-item",
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
                      _c("reminder-event-component", {
                        ref: "editform" + index,
                        refInFor: true,
                        attrs: {
                          config: _vm.config,
                          context: _vm.editing[index] ? "edit" : "view",
                          startDate: _vm.startDate,
                          endDate: _vm.endDate,
                          allAssignmentOptions: _vm.allAssignmentOptions
                        },
                        model: {
                          value: _vm.clonedModel[index],
                          callback: function($$v) {
                            _vm.$set(_vm.clonedModel, index, $$v);
                          },
                          expression: "clonedModel[index]"
                        }
                      })
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
                      _c(
                        "v-btn",
                        {
                          attrs: { block: "" },
                          on: {
                            click: function($event) {
                              return _vm.toggleEdit(index)
                            }
                          }
                        },
                        [_vm._v(_vm._s(_vm.editing[index] ? "Done" : "Edit"))]
                      ),
                      _vm._v(" "),
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
                            _c("reminder-event-component", {
                              ref: "createform",
                              attrs: {
                                config: _vm.config,
                                context: "create",
                                allAssignmentOptions: _vm.allAssignmentOptions
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
                          { attrs: { sm2: "", xs12: "" } },
                          [
                            _c(
                              "v-btn",
                              {
                                attrs: {
                                  block: "",
                                  color: "primary",
                                  type: "submit"
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
    inject("data-v-68b21386_0", { source: "/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.full-width {\n  width: 100%;\n}\n\n/*# sourceMappingURL=ReminderEventManager.vue.map */", map: {"version":3,"sources":["C:\\Users\\User\\Documents\\fluro\\fluro-vue-ui\\src\\components\\content\\edit\\components\\ReminderEventManager.vue","ReminderEventManager.vue"],"names":[],"mappings":"AA8HA,GAAA;AAYA;EACA,yCAAA;ACxIA;AD2IA;EACA,2CAAA;ACxIA;AD2IA;EACA,4CAAA;ACxIA;AD2IA;EACA,0CAAA;ACxIA;;ADgJA,GAAA;AACA;EACA,WAAA;AC7IA;;AAEA,mDAAmD","file":"ReminderEventManager.vue","sourcesContent":["<template>\n    <div>\n        <h4>{{model.length}} scheduled reminder{{model.length == 1 ? '' : 's'}}</h4>\n        <p class=\"muted\">Create notifications below to be sent to 'confirmed' rostered contacts before or after the event</p>\n        <list-group>\n            <list-group-item v-for=\"(message, index) in model\">\n                <v-layout align-start row wrap>\n                    <v-flex sm10 xs12 pa-1 class=\"full-width\">\n                        <reminder-event-component :config=\"config\" v-model=\"clonedModel[index]\" :context=\"editing[index] ? 'edit' : 'view'\" :ref=\"'editform' + index\" :startDate=\"startDate\" :endDate=\"endDate\" :allAssignmentOptions=\"allAssignmentOptions\" />\n                    </v-flex>\n                    <v-flex sm2 xs12 pa-1 class=\"full-width\">\n                        <v-btn block @click=\"toggleEdit(index)\">{{editing[index] ? 'Done' : 'Edit'}}</v-btn>\n                        <fluro-confirm-button @click=\"remove(index)\" content=\"Remove\">\n                            <template v-slot:default=\"{confirming}\">\n                                    <v-btn flat block :color=\"confirming ? 'red' : ''\" style=\"transition: all 0.1s;width:100%;\">{{confirming ? 'Confirm?' : 'Remove'}}</v-btn>\n                            </template>\n                        </fluro-confirm-button>\n                    </v-flex>\n                </v-layout>\n            </list-group-item>\n        </list-group>\n        <fluro-panel>\n            <fluro-panel-body>\n                <form @submit.prevent.stop=\"add()\">\n                    <v-container fluid grid-list-xl pa-1>\n                        <v-layout row wrap grid-list-xl>\n                            <v-flex sm10 xs12>\n                                <reminder-event-component :config=\"config\" v-model=\"proposed\" context=\"create\" ref=\"createform\" :allAssignmentOptions=\"allAssignmentOptions\" />\n                            </v-flex>\n                            <v-flex sm2 xs12>\n                                <v-btn block color=\"primary\" type=\"submit\" @click=\"add()\">Add</v-btn>\n                            </v-flex>\n                        </v-layout>\n                    </v-container>\n                </form>\n            </fluro-panel-body>\n        </fluro-panel>\n    </div>\n</template>\n<script>\nimport FluroConfirmButton from 'src/components/ui/FluroConfirmButton.vue';\nimport ReminderEventComponent from 'src/components/content/edit/components/ReminderEventComponent.vue';\n\n\nexport default {\n    props: {\n        value: {\n            type: Array,\n            default: function() {\n                return [];\n            }\n        },\n        config: {\n            type: Object,\n            required: true,\n        },\n        startDate: {\n            type: Date,\n        },\n        endDate: {\n            type: Date,\n        },\n        allAssignmentOptions: {\n            type: Array,\n        }\n    },\n    created() {\n        for (let i = 0; i < this.model.length; i++) {\n            this.editing.push(false);\n        }\n    },\n    components: { ReminderEventComponent, FluroConfirmButton },\n    data() {\n        return {\n            model: this.value,\n            proposed: {},\n            editing: [],\n            clonedModel: this.value,\n        }\n    },\n    methods: {\n        add() {\n            var self = this;\n            self.$refs.createform.validateAllFields();\n            var clone = JSON.parse(JSON.stringify(self.proposed));\n            if (clone.errorMessages.length) {\n                return;\n            }\n\n            delete clone.row;\n\n\n\n            this.model.push(clone);\n            this.editing.push(false);\n            self.$set(self, 'proposed', { 'assignments': [''], 'methods': [''] });\n        },\n        remove(index) {\n            this.model.splice(index, 1);\n            this.editing.splice(index, 1);\n        },\n        toggleEdit(index) {\n            var self = this;\n            //console.log(self.$refs);\n            //console.log('ON TOGGLE', self.model[index], self.clonedModel[index]);\n            console.log('MODEL',this.model[index].methods,'CLONEDMODEL',this.clonedModel[index].methods);\n            if (self.editing[index]) {\n                if (self.clonedModel[index].message.length) {\n                    self.model[index] = self.clonedModel[index];\n                    return self.$set(self.editing, index, false);\n                }\n                return;\n            } else {\n                return self.$set(self.editing, index, true);\n            }\n        },\n    },\n    watch: {\n        'model': function() {\n            this.clonedModel = JSON.parse(JSON.stringify(this.model));\n        },\n    },\n}\n</script>\n<style lang=\"scss\">\n\n/**/\r\n\r\n$primary: #2ad4b9;//#0bd6be;\r\n$success: #4cc650; //#4cc673;//\r\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\r\n$danger: #d93e63;\r\n$secondary: #0bd6cd; //#0bd6a3;\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n\r\n.border-top {\r\n    border-top: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-right {\r\n    border-right: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-bottom {\r\n    border-bottom: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-left {\r\n    border-left: 1px solid rgba(#000, 0.05);\r\n}\r\n//////////////////////////////////////////\r\n\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n/**/\n.full-width {\n    width: 100%;\n}\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.full-width {\n  width: 100%;\n}\n\n/*# sourceMappingURL=ReminderEventManager.vue.map */"]}, media: undefined });

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

export { __vue_component__$1 as R };
//# sourceMappingURL=ReminderEventManager-34569d4a.js.map
