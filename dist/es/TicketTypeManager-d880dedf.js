
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { aM as FluroContentForm, bl as __vue_normalize__, bm as __vue_create_injector__, r as FluroConfirmButton, bn as _ } from './index-20fb5e1c.js';
import { F as FluroContentEditMixin } from './FluroContentEditMixin-8bdfabb7.js';
import { FluroTable } from 'fluro-vue-ui';

//
var script = {
  mixins: [FluroContentEditMixin],
  props: {
    value: {
      type: Object,
      default: {}
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
    }
  },
  components: {
    FluroContentForm
  },

  data() {
    return {
      model: this.value
    };
  },

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

      addField('segments', {
        title: 'Send To',
        minimum: 1,
        maximum: 5,
        type: 'string',
        directive: 'select',
        options: [{
          name: 'Ticket Holders',
          value: 'ticket'
        }, {
          name: 'Expected Contacts',
          value: 'expected'
        }, {
          name: 'Parents of expected Contacts',
          value: 'expected parents'
        }, {
          name: 'Checked In Contacts',
          value: 'checkin'
        }, {
          name: 'Parents of Checked In Contacts',
          value: 'checkin parents'
        }]
      });
      addField('methods', {
        title: 'Send Via Method',
        minimum: 1,
        maximum: 3,
        type: 'string',
        directive: 'select',
        defaultValues: ['email'],
        options: [{
          name: 'Email',
          value: 'email'
        }, {
          name: 'Push Notification',
          value: 'push'
        }, {
          name: 'SMS',
          value: 'sms'
        }]
      });
      addField('methodPreference', {
        title: 'Method Preference',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'select',
        defaultValues: ['all'],
        options: [{
          name: 'All - Email and SMS and Push',
          value: 'all'
        }, {
          name: 'Failover - Email, SMS, Push',
          value: 'failover'
        }]
      });
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
      }); /////////////////////////////////

      addField('title', {
        title: 'Plain Text Title',
        placeholder: 'The title for this message',
        minimum: 1,
        maximum: 1,
        type: 'string'
      });
      addField('body', {
        title: 'Plain Text Message',
        description: 'For SMS and Push notifications',
        placeholder: 'Write a plain text message in here',
        minimum: 0,
        maximum: 1,
        directive: 'textarea',
        type: 'string'
      }); /////////////////////////////////

      addField('htmlTitle', {
        title: 'HTML Title',
        placeholder: 'HTML Email Subject (if different from title)',
        minimum: 0,
        maximum: 1,
        type: 'string'
      });
      addField('htmlBody', {
        title: 'HTML Message',
        description: 'For email notifications. If blank will default to the plain text message',
        minimum: 0,
        maximum: 1,
        directive: 'wysiwyg',
        type: 'string'
      });
      addField('senderEmail', {
        title: 'Sender Email Address',
        placeholder: 'eg. you@youraccount.com',
        minimum: 0,
        maximum: 1,
        type: 'string'
      }); ///////////////////////////////////

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
      var segments = self.model.segments;
      return segments.join(', ');
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
        return;
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
          _c("fluro-content-form", {
            ref: "form",
            attrs: { options: _vm.options, fields: _vm.customFields },
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
                                          model.methods.includes("email")
                                            ? _c("fluro-icon", {
                                                directives: [
                                                  {
                                                    name: "tippy",
                                                    rawName: "v-tippy"
                                                  }
                                                ],
                                                attrs: {
                                                  icon: "envelope",
                                                  content: "Sends email"
                                                }
                                              })
                                            : _vm._e(),
                                          _vm._v(" "),
                                          model.methods.includes("push")
                                            ? _c("fluro-icon", {
                                                directives: [
                                                  {
                                                    name: "tippy",
                                                    rawName: "v-tippy"
                                                  }
                                                ],
                                                attrs: {
                                                  icon: "mobile",
                                                  content:
                                                    "Sends push notification"
                                                }
                                              })
                                            : _vm._e(),
                                          _vm._v(" "),
                                          model.methods.includes("sms")
                                            ? _c("fluro-icon", {
                                                directives: [
                                                  {
                                                    name: "tippy",
                                                    rawName: "v-tippy"
                                                  }
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
                                        _c(
                                          "span",
                                          { staticClass: "capitalize-text" },
                                          [_vm._v(_vm._s(_vm.sendToFormatted))]
                                        )
                                      ]),
                                      _vm._v(" "),
                                      _c("h5", [
                                        _vm._v(_vm._s(model.title)),
                                        model.htmlTitle
                                          ? _c("span", [
                                              _vm._v(
                                                " (" +
                                                  _vm._s(model.htmlTitle) +
                                                  ")"
                                              )
                                            ])
                                          : _vm._e()
                                      ]),
                                      _vm._v(" "),
                                      model.body
                                        ? _c(
                                            "i",
                                            { staticClass: "muted mb-0" },
                                            [
                                              _vm._v(
                                                '"' + _vm._s(model.body) + '"'
                                              )
                                            ]
                                          )
                                        : _vm._e(),
                                      _vm._v(" "),
                                      _c("p", { staticClass: "muted mb-0" }, [
                                        _vm._v(
                                          _vm._s(
                                            _vm.formattedTotalPeriodWhenPoint
                                          ) +
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
                                        {
                                          attrs: { lg1: "", md2: "", xs2: "" }
                                        },
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
                                              model.methods.includes("email")
                                                ? _c("fluro-icon", {
                                                    directives: [
                                                      {
                                                        name: "tippy",
                                                        rawName: "v-tippy"
                                                      }
                                                    ],
                                                    attrs: {
                                                      icon: "envelope",
                                                      content: "Sends email"
                                                    }
                                                  })
                                                : _vm._e(),
                                              _vm._v(" "),
                                              model.methods.includes("push")
                                                ? _c("fluro-icon", {
                                                    directives: [
                                                      {
                                                        name: "tippy",
                                                        rawName: "v-tippy"
                                                      }
                                                    ],
                                                    attrs: {
                                                      icon: "mobile",
                                                      content:
                                                        "Sends push notification"
                                                    }
                                                  })
                                                : _vm._e(),
                                              _vm._v(" "),
                                              model.methods.includes("sms")
                                                ? _c("fluro-icon", {
                                                    directives: [
                                                      {
                                                        name: "tippy",
                                                        rawName: "v-tippy"
                                                      }
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
                                        {
                                          attrs: {
                                            lg11: "",
                                            md10: "",
                                            xs10: ""
                                          }
                                        },
                                        [
                                          _c(
                                            "p",
                                            { staticClass: "muted mb-0" },
                                            [
                                              _vm._v("Sending to "),
                                              _c(
                                                "span",
                                                {
                                                  staticClass: "capitalize-text"
                                                },
                                                [
                                                  _vm._v(
                                                    _vm._s(_vm.sendToFormatted)
                                                  )
                                                ]
                                              )
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("h5", [
                                            _vm._v(_vm._s(model.title)),
                                            model.htmlTitle
                                              ? _c("span", [
                                                  _vm._v(
                                                    " (" +
                                                      _vm._s(model.htmlTitle) +
                                                      ")"
                                                  )
                                                ])
                                              : _vm._e()
                                          ]),
                                          _vm._v(" "),
                                          model.body
                                            ? _c(
                                                "i",
                                                { staticClass: "muted mb-0" },
                                                [
                                                  _vm._v(
                                                    '"' +
                                                      _vm._s(model.body) +
                                                      '"'
                                                  )
                                                ]
                                              )
                                            : _vm._e(),
                                          _vm._v(" "),
                                          _c(
                                            "p",
                                            { staticClass: "muted mb-0" },
                                            [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.formattedTotalPeriodWhenPoint
                                                ) +
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
                                            ]
                                          )
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
                                {
                                  attrs: {
                                    fluid: "",
                                    "pa-0": "",
                                    "grid-list-xl": ""
                                  }
                                },
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
                                            "fluro-panel",
                                            [
                                              _c(
                                                "fluro-panel-body",
                                                [
                                                  _c(
                                                    "fluro-content-form-field",
                                                    {
                                                      attrs: {
                                                        "form-fields": formFields,
                                                        options: options,
                                                        field: fieldHash.title
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
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "fluro-content-form-field",
                                                    {
                                                      attrs: {
                                                        "form-fields": formFields,
                                                        options: options,
                                                        field: fieldHash.body
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
                                          ),
                                          _vm._v(" "),
                                          model.methods.includes("email")
                                            ? _c(
                                                "fluro-panel",
                                                [
                                                  _c(
                                                    "fluro-panel-body",
                                                    [
                                                      _c(
                                                        "fluro-content-form-field",
                                                        {
                                                          attrs: {
                                                            "form-fields": formFields,
                                                            options: options,
                                                            field:
                                                              fieldHash.htmlTitle
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
                                                      ),
                                                      _vm._v(" "),
                                                      _c(
                                                        "fluro-content-form-field",
                                                        {
                                                          attrs: {
                                                            "form-fields": formFields,
                                                            options: options,
                                                            field:
                                                              fieldHash.htmlBody
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
                                                      ),
                                                      _vm._v(" "),
                                                      _c(
                                                        "fluro-content-form-field",
                                                        {
                                                          attrs: {
                                                            "form-fields": formFields,
                                                            options: options,
                                                            field:
                                                              fieldHash.senderEmail
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
                                            : _vm._e()
                                        ],
                                        1
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "v-flex",
                                        { attrs: { sm6: "", xs12: "" } },
                                        [
                                          _c("fluro-content-form-field", {
                                            attrs: {
                                              "form-fields": formFields,
                                              options: options,
                                              field: fieldHash.methods
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
                                        ],
                                        1
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "v-flex",
                                        { attrs: { sm6: "", xs12: "" } },
                                        [
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
                                    {
                                      attrs: { sm5: "", xs12: "", "py-0": "" }
                                    },
                                    [
                                      _c("fluro-content-form-field", {
                                        attrs: {
                                          "form-fields": formFields,
                                          options: options,
                                          field: fieldHash.segments
                                        },
                                        on: { input: update },
                                        model: {
                                          value: model,
                                          callback: function($$v) {
                                            model = $$v;
                                          },
                                          expression: "model"
                                        }
                                      }),
                                      _vm._v(" "),
                                      _c("fluro-content-form-field", {
                                        attrs: {
                                          "form-fields": formFields,
                                          options: options,
                                          field: fieldHash.methods
                                        },
                                        on: { input: update },
                                        model: {
                                          value: model,
                                          callback: function($$v) {
                                            model = $$v;
                                          },
                                          expression: "model"
                                        }
                                      }),
                                      _vm._v(" "),
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
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-flex",
                                    {
                                      attrs: { sm7: "", xs12: "", "py-0": "" }
                                    },
                                    [
                                      _c(
                                        "fluro-panel",
                                        [
                                          _c(
                                            "fluro-panel-body",
                                            [
                                              _c("h4", [_vm._v("When")]),
                                              _vm._v(" "),
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
                                        "fluro-panel",
                                        [
                                          _c(
                                            "fluro-panel-body",
                                            [
                                              _c("fluro-content-form-field", {
                                                attrs: {
                                                  "form-fields": formFields,
                                                  options: options,
                                                  field: fieldHash.title
                                                },
                                                on: { input: update },
                                                model: {
                                                  value: model,
                                                  callback: function($$v) {
                                                    model = $$v;
                                                  },
                                                  expression: "model"
                                                }
                                              }),
                                              _vm._v(" "),
                                              _c("fluro-content-form-field", {
                                                attrs: {
                                                  "form-fields": formFields,
                                                  options: options,
                                                  field: fieldHash.body
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
                                            ],
                                            1
                                          )
                                        ],
                                        1
                                      ),
                                      _vm._v(" "),
                                      model.methods.includes("email")
                                        ? _c(
                                            "fluro-panel",
                                            [
                                              _c(
                                                "fluro-panel-body",
                                                [
                                                  _c(
                                                    "fluro-content-form-field",
                                                    {
                                                      attrs: {
                                                        "form-fields": formFields,
                                                        options: options,
                                                        field:
                                                          fieldHash.htmlTitle
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
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "fluro-content-form-field",
                                                    {
                                                      attrs: {
                                                        "form-fields": formFields,
                                                        options: options,
                                                        field:
                                                          fieldHash.htmlBody
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
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "fluro-content-form-field",
                                                    {
                                                      attrs: {
                                                        "form-fields": formFields,
                                                        options: options,
                                                        field:
                                                          fieldHash.senderEmail
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
                        : _vm._e()
                    ]
                  }
                }
              ],
              null,
              false,
              2133772366
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
    : _vm._e()
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-5dd06b1a_0", { source: "\n.capitalize-text {\n    text-transform: capitalize;\n}\n", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/edit/components/MessagingEventComponent.vue"],"names":[],"mappings":";AA6eA;IACA,0BAAA;AACA","file":"MessagingEventComponent.vue","sourcesContent":["<template>\n    <div v-if=\"model\" py-0>\n        <fluro-content-form :options=\"options\" v-model=\"model\" :fields=\"customFields\" ref=\"form\">\n            <template v-slot:form=\"{formFields, fieldHash, model, update, options}\">\n                <v-container fluid v-if=\"viewMode\" pa-0>\n                    <v-layout row wrap grid-list-xl py-0>\n                        <v-flex lg1 md2 xs2>\n                            <v-layout row wrap align-center justify-center style=\"height:100%;margin-left:-10px;\">\n                                <fluro-icon v-if=\"model.methods.includes('email')\" icon=\"envelope\" v-tippy content=\"Sends email\" />\n                                <fluro-icon v-if=\"model.methods.includes('push')\" icon=\"mobile\" v-tippy content=\"Sends push notification\" />\n                                <fluro-icon v-if=\"model.methods.includes('sms')\" icon=\"comment\" v-tippy content=\"Sends SMS\" />\n                            </v-layout>\n                        </v-flex>\n                        <v-flex lg11 md10 xs10>\n                            <p class=\"muted mb-0\">Sending to <span class=\"capitalize-text\">{{sendToFormatted}}</span></p>\n                            <h5>{{model.title}}<span v-if=\"model.htmlTitle\"> ({{model.htmlTitle}})</span></h5>\n                            <i v-if=\"model.body\" class=\"muted mb-0\">\"{{model.body}}\"</i>\n                            <p class=\"muted mb-0\">{{formattedTotalPeriodWhenPoint}} {{startDate ? '- ' + formattedTime.format(\"h:mma dddd MMM Do YYYY\") : ''}} {{startDate ? '(' + formattedTime.fromNow() + ')' : ''}}</p>\n                        </v-flex>\n                    </v-layout>\n                </v-container>\n                <div v-else-if=\"editMode\">\n                    <v-container fluid pa-0>\n                        <v-layout row wrap grid-list-xl py-0>\n                            <v-flex lg1 md2 xs2>\n                                <v-layout row wrap align-center justify-center style=\"height:100%;margin-left:-10px;\">\n                                    <fluro-icon v-if=\"model.methods.includes('email')\" icon=\"envelope\" v-tippy content=\"Sends email\" />\n                                    <fluro-icon v-if=\"model.methods.includes('push')\" icon=\"mobile\" v-tippy content=\"Sends push notification\" />\n                                    <fluro-icon v-if=\"model.methods.includes('sms')\" icon=\"comment\" v-tippy content=\"Sends SMS\" />\n                                </v-layout>\n                            </v-flex>\n                            <v-flex lg11 md10 xs10>\n                                <p class=\"muted mb-0\">Sending to <span class=\"capitalize-text\">{{sendToFormatted}}</span></p>\n                                <h5>{{model.title}}<span v-if=\"model.htmlTitle\"> ({{model.htmlTitle}})</span></h5>\n                                <i v-if=\"model.body\" class=\"muted mb-0\">\"{{model.body}}\"</i>\n                                <p class=\"muted mb-0\">{{formattedTotalPeriodWhenPoint}} {{startDate ? '- ' + formattedTime.format(\"h:mma dddd MMM Do YYYY\") : ''}} {{startDate ? '(' + formattedTime.fromNow() + ')' : ''}}</p>\n                            </v-flex>\n                        </v-layout>\n                    </v-container>\n                    <v-container fluid pa-0 grid-list-xl>\n                        <v-layout row wrap grid-list-xl py-0>\n                            <v-flex sm12 xs12>\n                                <fluro-panel>\n                                    <fluro-panel-body>\n                                        <h4>When</h4>\n                                        <v-layout row wrap grid-list-xl>\n                                            <v-flex xs12 sm3>\n                                                <fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.total\" v-model=\"model\" />\n                                            </v-flex>\n                                            <v-flex xs12 sm3>\n                                                <fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.period\" v-model=\"model\" />\n                                            </v-flex>\n                                            <v-flex xs12 sm3>\n                                                <fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.when\" v-model=\"model\" />\n                                            </v-flex>\n                                            <v-flex xs12 sm3>\n                                                <fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.point\" v-model=\"model\" />\n                                            </v-flex>\n                                        </v-layout>\n                                    </fluro-panel-body>\n                                </fluro-panel>\n                                <fluro-panel>\n                                    <fluro-panel-body>\n                                        <fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.title\" v-model=\"model\"></fluro-content-form-field>\n                                        <fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.body\" v-model=\"model\"></fluro-content-form-field>\n                                    </fluro-panel-body>\n                                </fluro-panel>\n                                <fluro-panel v-if=\"model.methods.includes('email')\">\n                                    <fluro-panel-body>\n                                        <fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.htmlTitle\" v-model=\"model\"></fluro-content-form-field>\n                                        <fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.htmlBody\" v-model=\"model\"></fluro-content-form-field>\n                                        <fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.senderEmail\" v-model=\"model\"></fluro-content-form-field>\n                                    </fluro-panel-body>\n                                </fluro-panel>\n                            </v-flex>\n                            <v-flex sm6 xs12>\n                                <fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.methods\" v-model=\"model\"></fluro-content-form-field>\n                            </v-flex>\n                            <v-flex sm6 xs12>\n                                <fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.methodPreference\" v-model=\"model\"></fluro-content-form-field>\n                            </v-flex>\n                        </v-layout>\n                    </v-container>\n                </div>\n                <v-container fluid v-else-if=\"createMode\" pa-0>\n                    <v-layout row wrap grid-list-xl py-0>\n                        <v-flex sm5 xs12 py-0>\n                            <fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.segments\" v-model=\"model\"></fluro-content-form-field>\n                            <fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.methods\" v-model=\"model\"></fluro-content-form-field>\n                            <fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.methodPreference\" v-model=\"model\"></fluro-content-form-field>\n                        </v-flex>\n                        <v-flex sm7 xs12 py-0>\n                            <fluro-panel>\n                                <fluro-panel-body>\n                                    <h4>When</h4>\n                                    <v-layout row wrap>\n                                        <v-flex xs12 sm3>\n                                            <fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.total\" v-model=\"model\" />\n                                        </v-flex>\n                                        <v-flex xs12 sm3>\n                                            <fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.period\" v-model=\"model\" />\n                                        </v-flex>\n                                        <v-flex xs12 sm3>\n                                            <fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.when\" v-model=\"model\" />\n                                        </v-flex>\n                                        <v-flex xs12 sm3>\n                                            <fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.point\" v-model=\"model\" />\n                                        </v-flex>\n                                    </v-layout>\n                                </fluro-panel-body>\n                            </fluro-panel>\n                            <fluro-panel>\n                                <fluro-panel-body>\n                                    <fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.title\" v-model=\"model\"></fluro-content-form-field>\n                                    <fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.body\" v-model=\"model\"></fluro-content-form-field>\n                                </fluro-panel-body>\n                            </fluro-panel>\n                            <fluro-panel v-if=\"model.methods.includes('email')\">\n                                <fluro-panel-body>\n                                    <fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.htmlTitle\" v-model=\"model\"></fluro-content-form-field>\n                                    <fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.htmlBody\" v-model=\"model\"></fluro-content-form-field>\n                                    <fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.senderEmail\" v-model=\"model\"></fluro-content-form-field>\n                                </fluro-panel-body>\n                            </fluro-panel>\n                        </v-flex>\n                    </v-layout>\n                </v-container>\n            </template>\n        </fluro-content-form>\n    </div>\n</template>\n<script>\n\n    //TODO Check whether this mixin needs to be included? I think james has it here by mistake\nimport FluroContentEditMixin from 'src/components/content/edit/FluroContentEditMixin.js';\nimport FluroContentForm from 'src/components/form/FluroContentForm.vue';\n\n\n\nexport default {\n    mixins: [FluroContentEditMixin],\n    props: {\n        value: {\n            type: Object,\n            default: {},\n        },\n        context: {\n            type: String,\n            default: 'create',\n        },\n        startDate: {\n            type: Date,\n        },\n        endDate: {\n            type: Date,\n        }\n    },\n    components: {\n        FluroContentForm,\n    },\n    data() {\n        return {\n            model: this.value,\n\n        }\n    },\n    methods: {\n        validate() {\n            var form = this.$refs.form;\n            if (!form) {\n                return [];\n            }\n            this.model.errorMessages = form.errorMessages || [];\n        },\n        validateAllFields() {\n            var form = this.$refs.form;\n            form.touch();\n            this.validate();\n        },\n    },\n    computed: {\n        customFields() {\n\n\n            var self = this;\n            var array = [];\n            var periodOptions = [];\n            ///////////////////////////////////\n            if (self.model.total != 1) {\n                periodOptions = [{\n                        name: 'Minutes',\n                        value: 'minute',\n                    },\n                    {\n                        name: 'Hours',\n                        value: 'hour',\n                    },\n                    {\n                        name: 'Days',\n                        value: 'day',\n                    },\n                    {\n                        name: 'Weeks',\n                        value: 'week',\n                    },\n                    {\n                        name: 'Months',\n                        value: 'month',\n                    },\n                ]\n            } else {\n                periodOptions = [{\n                        name: 'Minute',\n                        value: 'minute',\n                    },\n                    {\n                        name: 'Hour',\n                        value: 'hour',\n                    },\n                    {\n                        name: 'Day',\n                        value: 'day',\n                    },\n                    {\n                        name: 'Week',\n                        value: 'week',\n                    },\n                    {\n                        name: 'Month',\n                        value: 'month',\n                    },\n                ]\n            }\n\n            addField('segments', {\n                title: 'Send To',\n                minimum: 1,\n                maximum: 5,\n                type: 'string',\n                directive: 'select',\n                options: [{\n                        name: 'Ticket Holders',\n                        value: 'ticket',\n                    },\n                    {\n                        name: 'Expected Contacts',\n                        value: 'expected',\n                    },\n                    {\n                        name: 'Parents of expected Contacts',\n                        value: 'expected parents',\n                    },\n                    {\n                        name: 'Checked In Contacts',\n                        value: 'checkin',\n                    },\n                    {\n                        name: 'Parents of Checked In Contacts',\n                        value: 'checkin parents',\n                    },\n                ]\n            })\n\n            addField('methods', {\n                title: 'Send Via Method',\n                minimum: 1,\n                maximum: 3,\n                type: 'string',\n                directive: 'select',\n                defaultValues: ['email'],\n                options: [{\n                        name: 'Email',\n                        value: 'email',\n                    },\n                    {\n                        name: 'Push Notification',\n                        value: 'push',\n                    },\n                    {\n                        name: 'SMS',\n                        value: 'sms',\n                    }\n                ]\n            })\n\n\n            addField('methodPreference', {\n                title: 'Method Preference',\n                minimum: 0,\n                maximum: 1,\n                type: 'string',\n                directive: 'select',\n                defaultValues: ['all'],\n                options: [{\n                        name: 'All - Email and SMS and Push',\n                        value: 'all',\n                    },\n                    {\n                        name: 'Failover - Email, SMS, Push',\n                        value: 'failover',\n                    },\n                ]\n            })\n\n            addField('total', {\n                minimum: 1,\n                maximum: 1,\n                type: 'integer',\n                defaultValues: [1],\n                params: { minValue: 1 }\n            })\n\n            addField('period', {\n                minimum: 1,\n                maximum: 1,\n                type: 'string',\n                directive: 'select',\n                defaultValues: ['day'],\n                options: periodOptions\n            })\n\n\n            addField('when', {\n                minimum: 1,\n                maximum: 1,\n                type: 'string',\n                directive: 'select',\n                defaultValues: ['before'],\n                options: [{\n                        name: 'Before',\n                        value: 'before',\n                    },\n                    {\n                        name: 'After',\n                        value: 'after',\n                    },\n                ]\n            })\n\n\n            addField('point', {\n                minimum: 1,\n                maximum: 1,\n                type: 'string',\n                directive: 'select',\n                defaultValues: ['start'],\n                options: [{\n                        name: 'Event Starts',\n                        value: 'start',\n                    },\n                    {\n                        name: 'Event Ends',\n                        value: 'end',\n                    },\n                ]\n            })\n\n\n\n            /////////////////////////////////\n\n\n            addField('title', {\n                title: 'Plain Text Title',\n                placeholder: 'The title for this message',\n                minimum: 1,\n                maximum: 1,\n                type: 'string',\n            })\n\n\n            addField('body', {\n                title: 'Plain Text Message',\n                description: 'For SMS and Push notifications',\n                placeholder: 'Write a plain text message in here',\n                minimum: 0,\n                maximum: 1,\n                directive: 'textarea',\n                type: 'string',\n            })\n\n\n            /////////////////////////////////\n\n\n            addField('htmlTitle', {\n                title: 'HTML Title',\n                placeholder: 'HTML Email Subject (if different from title)',\n                minimum: 0,\n                maximum: 1,\n                type: 'string',\n            })\n\n\n            addField('htmlBody', {\n                title: 'HTML Message',\n                description: 'For email notifications. If blank will default to the plain text message',\n                minimum: 0,\n                maximum: 1,\n                directive: 'wysiwyg',\n                type: 'string',\n            })\n\n\n            addField('senderEmail', {\n                title: 'Sender Email Address',\n                placeholder: 'eg. you@youraccount.com',\n                minimum: 0,\n                maximum: 1,\n                type: 'string',\n            })\n\n            ///////////////////////////////////\n\n\n\n\n            function addField(key, details) {\n                details.key = key;\n                array.push(details)\n            }\n\n            return array;\n        },\n        createMode() {\n            return this.context == 'create';\n        },\n        viewMode() {\n            return this.context == 'view';\n        },\n        editMode() {\n            return this.context == 'edit';\n        },\n        sendToFormatted() {\n            var self = this;\n            var segments = self.model.segments;\n            return segments.join(', ');\n        },\n        formattedTotalPeriodWhenPoint() {\n            var self = this;\n            var model = self.model;\n            var period = self.model.period;\n            if (model.total != 1) {\n                period = period + 's';\n            }\n            return model.total + ' ' + period + ' ' + model.when + ' event ' + model.point;\n        },\n        formattedTime() {\n            var self = this;\n            var startDate, endDate;\n\n            var total = self.model.total;\n            var period = self.model.period;\n            var when = self.model.when;\n            var point = self.model.point;\n\n            if (!self.startDate || !total || !period || !when || !point) {\n                return;\n            }\n\n            if (!self.endDate) {\n                endDate = self.startDate;\n            } else {\n                endDate = self.endDate;\n            }\n\n            startDate = self.startDate;\n\n\n            //////////////////////////////////\n\n            var eventTime;\n            if (point == 'end') {\n                eventTime = endDate;\n            } else {\n                eventTime = startDate;\n            }\n\n            //////////////////////////////////\n\n            var displayedTime;\n            if (when == 'before') {\n                displayedTime = self.$fluro.date.moment(eventTime).subtract(total, period);\n            } else {\n                displayedTime = self.$fluro.date.moment(eventTime).add(total, period);\n            }\n\n            return displayedTime;\n        }\n    }\n}\n</script>\n<style>\n.capitalize-text {\n    text-transform: capitalize;\n}\n</style>"]}, media: undefined });

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
      type: Array
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
    }
  },

  created() {
    for (let i = 0; i < this.model.length; i++) {
      this.editing.push(false);
    }
  },

  components: {
    MessagingEventComponent: __vue_component__,
    FluroConfirmButton
  },

  data() {
    return {
      model: this.value,
      proposed: {},
      editing: []
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
      this.proposed = {};
    },

    remove(index) {
      this.model.splice(index, 1);
      this.editing.splice(index, 1);
    },

    toggleEdit(index) {
      var self = this; //console.log(self.$refs);

      var ref = 'editform' + index; //console.log(self.$refs[ref]);

      if (self.editing[index]) {
        self.$refs[ref][0].validateAllFields();

        if (self.clonedModel[index].errorMessages.length) {
          return;
        }

        self.model[index] = self.clonedModel[index];
        return self.$set(self.editing, index, false);
      } else {
        return self.$set(self.editing, index, true);
      }
    }

  },
  computed: {
    clonedModel() {
      return JSON.parse(JSON.stringify(this.model));
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
            " scheduled message" +
            _vm._s(_vm.model.length == 1 ? "" : "s")
        )
      ]),
      _vm._v(" "),
      _c("p", { staticClass: "muted" }, [
        _vm._v(
          "Add relative time messages to be sent before or after the event"
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
                      _c("messaging-event-component", {
                        ref: "editform" + index,
                        refInFor: true,
                        attrs: {
                          config: _vm.config,
                          context: _vm.editing[index] ? "edit" : "view",
                          startDate: _vm.startDate,
                          endDate: _vm.endDate
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
                            _c("messaging-event-component", {
                              ref: "createform",
                              attrs: { config: _vm.config, context: "create" },
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
    inject("data-v-0e008f18_0", { source: "/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.full-width {\n  width: 100%;\n}\n\n/*# sourceMappingURL=MessagingEventManager.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/edit/components/MessagingEventManager.vue","MessagingEventManager.vue"],"names":[],"mappings":"AA0HA,GAAA;AAYA;EACA,yCAAA;ACpIA;ADuIA;EACA,2CAAA;ACpIA;ADuIA;EACA,4CAAA;ACpIA;ADuIA;EACA,0CAAA;ACpIA;;AD4IA,GAAA;AACA;EACA,WAAA;ACzIA;;AAEA,oDAAoD","file":"MessagingEventManager.vue","sourcesContent":["<template>\n    <div>\n        <h4>{{model.length}} scheduled message{{model.length == 1 ? '' : 's'}}</h4>\n        <p class=\"muted\">Add relative time messages to be sent before or after the event</p>\n        <list-group>\n            <list-group-item v-for=\"(message, index) in model\">\n                <v-layout align-start row wrap>\n                    <v-flex sm10 xs12 pa-1 class=\"full-width\">\n                        <messaging-event-component :config=\"config\" v-model=\"clonedModel[index]\" :context=\"editing[index] ? 'edit' : 'view'\" :ref=\"'editform' + index\" :startDate=\"startDate\" :endDate=\"endDate\" />\n                    </v-flex>\n                    <v-flex sm2 xs12 pa-1 class=\"full-width\">\n                        <v-btn block @click=\"toggleEdit(index)\">{{editing[index] ? 'Done' : 'Edit'}}</v-btn>\n                        <fluro-confirm-button @click=\"remove(index)\" content=\"Remove\">\n                            <template v-slot:default=\"{confirming}\">\n                                    <v-btn flat block :color=\"confirming ? 'red' : ''\" style=\"transition: all 0.1s;width:100%;\">{{confirming ? 'Confirm?' : 'Remove'}}</v-btn>\n                            </template>\n                        </fluro-confirm-button>\n                    </v-flex>\n                </v-layout>\n            </list-group-item>\n        </list-group>\n\n        <fluro-panel>\n            <fluro-panel-body>\n                <form @submit.prevent.stop=\"add()\">\n                    <v-container fluid grid-list-xl pa-1>\n                        <v-layout row wrap grid-list-xl>\n                            <v-flex sm10 xs12>\n                                <messaging-event-component :config=\"config\" v-model=\"proposed\" context=\"create\" ref=\"createform\" />\n                            </v-flex>\n                            <v-flex sm2 xs12>\n                                <v-btn block color=\"primary\" type=\"submit\" @click=\"add()\">Add</v-btn>\n                            </v-flex>\n                        </v-layout>\n                    </v-container>\n                </form>\n            </fluro-panel-body>\n        </fluro-panel>\n    </div>\n</template>\n<script>\nimport FluroConfirmButton from 'src/components/ui/FluroConfirmButton.vue';\nimport MessagingEventComponent from 'src/components/content/edit/components/MessagingEventComponent.vue';\n\n\nexport default {\n    props: {\n        value: {\n            type: Array,\n        },\n        config: {\n            type: Object,\n            required: true,\n        },\n        startDate: {\n            type: Date,\n        },\n        endDate: {\n            type: Date,\n        }\n    },\n    created() {\n        for (let i = 0; i < this.model.length; i++) {\n            this.editing.push(false);\n        }\n    },\n    components: { MessagingEventComponent, FluroConfirmButton },\n    data() {\n        return {\n            model: this.value,\n            proposed: {},\n            editing: [],\n        }\n    },\n    methods: {\n        add() {\n            var self = this;\n            self.$refs.createform.validateAllFields();\n            var clone = JSON.parse(JSON.stringify(self.proposed));\n            if (clone.errorMessages.length) {\n                return;\n            }\n\n            delete clone.row;\n\n\n\n            this.model.push(clone);\n            this.editing.push(false);\n            this.proposed = {};\n        },\n        remove(index) {\n            this.model.splice(index, 1);\n            this.editing.splice(index, 1);\n        },\n        toggleEdit(index) {\n            var self = this;\n            //console.log(self.$refs);\n            var ref = 'editform' + index;\n            //console.log(self.$refs[ref]);\n            if (self.editing[index]) {\n                self.$refs[ref][0].validateAllFields();\n                if (self.clonedModel[index].errorMessages.length) {\n                    return;\n                }\n                self.model[index] = self.clonedModel[index];\n                return self.$set(self.editing, index, false);\n            }\n            else {\n                return self.$set(self.editing, index, true);\n            }\n        },\n    },\n    computed: {\n        clonedModel() {\n            return JSON.parse(JSON.stringify(this.model));\n        }\n    },\n}\n</script>\n<style lang=\"scss\">\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n.full-width {\n    width:100%;\n}\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.full-width {\n  width: 100%;\n}\n\n/*# sourceMappingURL=MessagingEventManager.vue.map */"]}, media: undefined });

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
  props: {
    value: {
      type: Object
    },
    roomsPath: {
      type: String
    },
    locationsPath: {
      type: String
    },
    allLocations: {
      type: Array
    }
  },

  //components: { MessagingEventComponent, FluroConfirmButton },
  data() {
    return {
      model: this.value,
      locations: this.allLocations
    };
  },

  methods: {
    selectRoom(item) {
      var self = this;

      if (!self.isSelectedRoom(item)) {
        return self.$set(self.model[self.roomsPath], self.model[self.roomsPath].length, item);
      }
    },

    deselectRoom(item) {
      var self = this;

      if (!item) {
        return;
      } //Get the item ID


      var itemID = self.$fluro.utils.getStringID(item); //Find the index of the matching item

      var index = (self.model[self.roomsPath] || []).findIndex(function (selectedItem) {
        var selectedItemID = self.$fluro.utils.getStringID(selectedItem);
        return itemID == selectedItemID;
      });
      self.model[self.roomsPath].splice(index, 1);
    },

    toggleRoom(item) {
      var self = this;

      if (self.isSelectedRoom(item)) {
        self.deselectRoom(item);
      } else {
        self.selectRoom(item);
      } // console.log('TOGGLE', self.model[self.roomsPath]);

    },

    isSelectedRoom(item) {
      var self = this;
      var itemID = self.$fluro.utils.getStringID(item); //Check if the ID is already selected

      var match = (self.model[self.roomsPath] || []).some(function (selectedItem) {
        var selectedItemID = self.$fluro.utils.getStringID(selectedItem);
        return itemID == selectedItemID;
      });

      if (match) {
        return true;
      } else {
        return false;
      }
    },

    selectLocation(item) {
      var self = this;

      if (!self.isSelectedLocation(item)) {
        return self.$set(self.model[self.locationsPath], self.model[self.locationsPath].length, item);
      }
    },

    deselectLocation(item) {
      var self = this;

      if (!item) {
        return;
      } //Get the item ID


      var itemID = self.$fluro.utils.getStringID(item); //Find the index of the matching item

      var index = (self.model[self.locationsPath] || []).findIndex(function (selectedItem) {
        var selectedItemID = self.$fluro.utils.getStringID(selectedItem);
        return itemID == selectedItemID;
      });
      self.model[self.locationsPath].splice(index, 1);
      (item.rooms || []).forEach(function (room) {
        if (self.isSelectedRoom(room)) {
          return self.deselectRoom(room);
        }
      });
    },

    toggleLocation(item) {
      var self = this;

      if (self.isSelectedLocation(item)) {
        self.deselectLocation(item);
      } else {
        self.selectLocation(item);
      } // console.log('TOGGLE', self.model[self.locationsPath]);

    },

    isSelectedLocation(item) {
      var self = this;
      var itemID = self.$fluro.utils.getStringID(item); //Check if the ID is already selected

      var match = (self.model[self.locationsPath] || []).some(function (selectedItem) {
        var selectedItemID = self.$fluro.utils.getStringID(selectedItem);
        return itemID == selectedItemID;
      });
      return match;
    },

    parentRealm(room) {
      var self = this;
      var parent = (self.locations || []).find(function (loc) {
        return room.locationName == loc.title;
      });

      if (parent) {
        return parent.realms;
      } else {
        return undefined;
      }
    },

    findLocationName(room) {
      var self = this;
      var itemID = self.$fluro.utils.getStringID(room);
      var location = (self.locations || []).find(function (loc) {
        var locRoomIDs = (loc.rooms || []).map(function (room) {
          return room ? room._id : null;
        });
        return locRoomIDs.includes(itemID);
      });

      if (location) {
        room.locationName = location.title;
      }

      return room;
    },

    createLocation() {
      var self = this;
      self.$fluro.global.create('location', {}, true).then(function (res) {
        self.locations.push(res);
      });
    }

  },
  watch: {
    'allLocations': function () {
      var self = this;
      self.locations = self.allLocations;
    }
  },
  computed: {
    locationOptions() {
      var self = this;
      return _.chain(self.locations).map(function (loc) {
        var locationName = loc.title;

        _.forEach(loc.rooms, function (room) {
          return room.locationName = locationName;
        });

        return loc;
      }).flatten().value();
    },

    roomOptions() {
      var self = this;

      var temp = _.chain(self.model[self.locationsPath]).map(function (loc) {
        if (loc.rooms.length && !loc.rooms[0].locationName) {
          _.forEach(loc.rooms, self.findLocationName);
        }

        return loc.rooms;
      }).flatten().value();

      return temp;
    }

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
    "v-layout",
    { attrs: { row: "", wrap: "" } },
    [
      _c(
        "v-flex",
        { staticClass: "full-width", attrs: { sm6: "", xs12: "", "px-2": "" } },
        [
          _c("h4", { staticClass: "header-margin" }, [_vm._v("Locations")]),
          _vm._v(" "),
          _c(
            "list-group",
            _vm._l(_vm.locationOptions, function(location) {
              return _c("list-group-item", {
                attrs: {
                  item: location,
                  selectable: true,
                  isSelected: _vm.isSelectedLocation(location)
                },
                on: {
                  click: function($event) {
                    return _vm.toggleLocation(location)
                  }
                }
              })
            }),
            1
          ),
          _vm._v(" "),
          _c(
            "v-btn",
            {
              staticClass: "button-margin",
              attrs: { color: "primary" },
              on: { click: _vm.createLocation }
            },
            [_vm._v("Add a new location")]
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-flex",
        { staticClass: "full-width", attrs: { sm6: "", xs12: "", "px-2": "" } },
        [
          _c("h4", { staticClass: "header-margin" }, [_vm._v("Rooms")]),
          _vm._v(" "),
          _c(
            "list-group",
            [
              _c(
                "transition-group",
                { attrs: { name: "fade" } },
                _vm._l(_vm.roomOptions, function(room) {
                  return _c(
                    "list-group-item",
                    {
                      key: room._id,
                      attrs: {
                        item: room,
                        selectable: true,
                        isSelected: _vm.isSelectedRoom(room)
                      },
                      on: {
                        click: function($event) {
                          return _vm.toggleRoom(room)
                        }
                      },
                      scopedSlots: _vm._u(
                        [
                          {
                            key: "left",
                            fn: function() {
                              return [
                                _c("fluro-realm-bar", {
                                  attrs: { realm: _vm.parentRealm(room) }
                                }),
                                _vm._v(" "),
                                _c("div", { staticClass: "left-slot" }, [
                                  _c(
                                    "div",
                                    { staticClass: "left-icon" },
                                    [
                                      _c("fluro-icon", {
                                        attrs: { icon: "door-closed" }
                                      })
                                    ],
                                    1
                                  )
                                ])
                              ]
                            },
                            proxy: true
                          }
                        ],
                        null,
                        true
                      )
                    },
                    [
                      _vm._v(" "),
                      [
                        _c("strong", [_vm._v(_vm._s(room.title))]),
                        _vm._v(" "),
                        _c("p", { staticClass: "muted mb-0" }, [
                          _vm._v(_vm._s(room.locationName))
                        ])
                      ]
                    ],
                    2
                  )
                }),
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
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  const __vue_inject_styles__$2 = function (inject) {
    if (!inject) return
    inject("data-v-2100e11f_0", { source: "/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.left-slot {\n  text-align: center;\n  width: 50px;\n  margin-right: 10px;\n}\n.left-slot .left-icon {\n  width: 30px;\n  height: 30px;\n  background-color: rgba(0, 0, 0, 0.1);\n  text-align: center;\n  line-height: 30px;\n  display: inline-block;\n}\n.header-margin {\n  margin-bottom: 10px;\n}\n.button-margin {\n  margin-bottom: 20px;\n}\n.full-width {\n  width: 100%;\n}\n.fade-enter-active,\n.fade-leave-active {\n  transition: all 0.3s;\n}\n.fade-enter,\n.fade-leave-to {\n  opacity: 0;\n}\n\n/*# sourceMappingURL=LocationSelector.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/edit/components/LocationSelector.vue","LocationSelector.vue"],"names":[],"mappings":"AA4OA,GAAA;AAYA;EACA,yCAAA;ACtPA;ADyPA;EACA,2CAAA;ACtPA;ADyPA;EACA,4CAAA;ACtPA;ADyPA;EACA,0CAAA;ACtPA;;AD8PA,GAAA;AACA;EACA,kBAAA;EACA,WAAA;EACA,kBAAA;AC3PA;AD6PA;EACA,WAAA;EACA,YAAA;EACA,oCAAA;EACA,kBAAA;EACA,iBAAA;EACA,qBAAA;AC3PA;AD+PA;EACA,mBAAA;AC5PA;AD+PA;EACA,mBAAA;AC5PA;AD+PA;EACA,WAAA;AC5PA;ADgQA;;EAEA,oBAAA;AC7PA;ADgQA;;EAEA,UAAA;AC7PA;;AAEA,+CAA+C","file":"LocationSelector.vue","sourcesContent":["<template>\n    <v-layout row wrap>\n        <v-flex sm6 xs12 px-2 class=\"full-width\">\n            <h4 class=\"header-margin\">Locations</h4>\n            <list-group>\n                <list-group-item v-for=\"location in locationOptions\" :item=\"location\" :selectable=\"true\" :isSelected=\"isSelectedLocation(location)\" @click=\"toggleLocation(location)\">\n                </list-group-item>\n            </list-group>\n            <v-btn class=\"button-margin\" color=\"primary\" @click=\"createLocation\">Add a new location</v-btn>\n        </v-flex>\n        <v-flex sm6 xs12 px-2 class=\"full-width\">\n            <h4 class=\"header-margin\">Rooms</h4>\n            <list-group>\n                <transition-group name=\"fade\">\n                    <list-group-item v-for=\"room in roomOptions\" :item=\"room\" :selectable=\"true\" :isSelected=\"isSelectedRoom(room)\" @click=\"toggleRoom(room)\" v-bind:key=\"room._id\">\n                        <template v-slot:left>\n                            <fluro-realm-bar :realm=\"parentRealm(room)\" />\n                            <div class=\"left-slot\">\n                                <div class=\"left-icon\">\n                                    <fluro-icon icon=\"door-closed\" />\n                                </div>\n                            </div>\n                        </template>\n                        <template>\n                            <strong>{{room.title}}</strong>\n                            <p class=\"muted mb-0\">{{room.locationName}}</p>\n                        </template>\n                    </list-group-item>\n                </transition-group>\n            </list-group>\n        </v-flex>\n    </v-layout>\n</template>\n<script>\n\nimport _ from 'lodash';\nexport default {\n    props: {\n        value: {\n            type: Object,\n        },\n        roomsPath: {\n            type: String,\n        },\n        locationsPath: {\n            type: String,\n        },\n        allLocations: {\n            type: Array,\n        }\n    },\n    //components: { MessagingEventComponent, FluroConfirmButton },\n    data() {\n        return {\n            model: this.value,\n            locations: this.allLocations,\n        }\n    },\n    methods: {\n        selectRoom(item) {\n            var self = this;\n            if (!self.isSelectedRoom(item)) {\n                return self.$set(self.model[self.roomsPath], self.model[self.roomsPath].length, item);\n            }\n        },\n        deselectRoom(item) {\n            var self = this;\n\n            if (!item) {\n                return;\n            }\n\n            //Get the item ID\n            var itemID = self.$fluro.utils.getStringID(item);\n\n            //Find the index of the matching item\n            var index = (self.model[self.roomsPath] || []).findIndex(function(selectedItem) {\n                var selectedItemID = self.$fluro.utils.getStringID(selectedItem);\n                return itemID == selectedItemID;\n            })\n\n            self.model[self.roomsPath].splice(index, 1);\n        },\n        toggleRoom(item) {\n\n            var self = this;\n            if (self.isSelectedRoom(item)) {\n                self.deselectRoom(item);\n            } else {\n                self.selectRoom(item);\n            }\n\n            // console.log('TOGGLE', self.model[self.roomsPath]);\n        },\n        isSelectedRoom(item) {\n            var self = this;\n            var itemID = self.$fluro.utils.getStringID(item);\n\n            //Check if the ID is already selected\n            var match = (self.model[self.roomsPath] || []).some(function(selectedItem) {\n                var selectedItemID = self.$fluro.utils.getStringID(selectedItem);\n                return itemID == selectedItemID;\n            })\n\n            if (match) {\n                return true;\n            } else {\n                return false;\n            }\n        },\n        selectLocation(item) {\n            var self = this;\n            if (!self.isSelectedLocation(item)) {\n                return self.$set(self.model[self.locationsPath], self.model[self.locationsPath].length, item);\n            }\n        },\n        deselectLocation(item) {\n            var self = this;\n\n            if (!item) {\n                return;\n            }\n\n            //Get the item ID\n            var itemID = self.$fluro.utils.getStringID(item);\n\n            //Find the index of the matching item\n            var index = (self.model[self.locationsPath] || []).findIndex(function(selectedItem) {\n                var selectedItemID = self.$fluro.utils.getStringID(selectedItem);\n                return itemID == selectedItemID;\n            })\n\n            self.model[self.locationsPath].splice(index, 1);\n            (item.rooms || []).forEach(function(room) {\n                if (self.isSelectedRoom(room)) {\n                    return self.deselectRoom(room)\n                }\n            })\n        },\n        toggleLocation(item) {\n\n            var self = this;\n            if (self.isSelectedLocation(item)) {\n                self.deselectLocation(item);\n            } else {\n                self.selectLocation(item);\n            }\n\n            // console.log('TOGGLE', self.model[self.locationsPath]);\n        },\n        isSelectedLocation(item) {\n            var self = this;\n            var itemID = self.$fluro.utils.getStringID(item);\n\n            //Check if the ID is already selected\n            var match = (self.model[self.locationsPath] || []).some(function(selectedItem) {\n                var selectedItemID = self.$fluro.utils.getStringID(selectedItem);\n                return itemID == selectedItemID;\n            })\n\n            return match;\n        },\n        parentRealm(room) {\n            var self = this;\n            var parent = (self.locations || []).find(function(loc) {\n                return room.locationName == loc.title;\n            });\n            if (parent) {\n                return parent.realms;\n            } else {\n                return undefined;\n            }\n        },\n        findLocationName(room) {\n            var self = this;\n            var itemID = self.$fluro.utils.getStringID(room);\n\n            var location = (self.locations || []).find(function(loc) {\n                var locRoomIDs = (loc.rooms || []).map(function(room) {\n                    return room ? room._id : null;\n                });\n                return locRoomIDs.includes(itemID);\n            });\n\n            if (location) {\n                room.locationName = location.title;\n            }\n            return room;\n        },\n        createLocation() {\n            var self = this;\n            self.$fluro.global.create('location', {}, true)\n                .then(function(res) {\n                    self.locations.push(res);\n                });\n        }\n    },\n    watch: {\n        'allLocations': function() {\n            var self = this;\n            self.locations = self.allLocations;\n        }\n    },\n    computed: {\n        locationOptions() {\n            var self = this;\n\n            return _.chain(self.locations)\n                .map(function(loc) {\n                    var locationName = loc.title;\n                    _.forEach(loc.rooms, function(room) {\n                        return room.locationName = locationName;\n                    })\n                    return loc;\n                })\n                .flatten()\n                .value();\n        },\n        roomOptions() {\n            var self = this;\n            var temp = _.chain(self.model[self.locationsPath])\n                .map(function(loc) {\n                    if (loc.rooms.length && !loc.rooms[0].locationName) {\n                        _.forEach(loc.rooms, self.findLocationName);\n                    }\n                    return loc.rooms;\n                })\n                .flatten()\n                .value();\n            return temp;\n        }\n    },\n}\n</script>\n<style lang=\"scss\">\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n.left-slot {\n    text-align: center;\n    width: 50px;\n    margin-right: 10px;\n\n    .left-icon {\n        width: 30px;\n        height: 30px;\n        background-color: rgba(#000, 0.1);\n        text-align: center;\n        line-height: 30px;\n        display: inline-block;\n    }\n}\n\n.header-margin {\n    margin-bottom: 10px;\n}\n\n.button-margin {\n    margin-bottom: 20px;\n}\n\n.full-width {\n    width: 100%;\n}\n\n\n.fade-enter-active,\n.fade-leave-active {\n    transition: all .3s;\n}\n\n.fade-enter,\n.fade-leave-to {\n    opacity: 0;\n}\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.left-slot {\n  text-align: center;\n  width: 50px;\n  margin-right: 10px;\n}\n.left-slot .left-icon {\n  width: 30px;\n  height: 30px;\n  background-color: rgba(0, 0, 0, 0.1);\n  text-align: center;\n  line-height: 30px;\n  display: inline-block;\n}\n\n.header-margin {\n  margin-bottom: 10px;\n}\n\n.button-margin {\n  margin-bottom: 20px;\n}\n\n.full-width {\n  width: 100%;\n}\n\n.fade-enter-active,\n.fade-leave-active {\n  transition: all 0.3s;\n}\n\n.fade-enter,\n.fade-leave-to {\n  opacity: 0;\n}\n\n/*# sourceMappingURL=LocationSelector.vue.map */"]}, media: undefined });

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

//
var script$3 = {
  components: {
    FluroTable
  },
  props: {
    value: {
      type: Object
    }
  },

  created() {
    this.setDefaults();
  },

  // computed: {
  // 				entries: {
  // 								get() {
  // 												return _.map(this.model, function(value, key) {
  // 																return {
  // 																				key,
  // 																				value,
  // 																}
  // 												})
  // 								},
  // 								set(array) {
  // 												this.model = _.reduce(array, function(set, entry) {
  // 																set[entry.key] = entry.value;
  // 																return set;
  // 												}, {})
  // 								}
  // 				}
  // },
  methods: {
    removeEntry(index) {
      this.model.ticketTypes.splice(index, 1);
    },

    getAvailable(value, limit) {
      value = parseInt(value || 0);
      limit = parseInt(limit || 0);

      if (!value && !limit) {
        return 0;
      }

      console.log('Available', value, limit);
      return Math.max(limit - value, 0);
    },

    getPercent(value, limit) {
      value = parseInt(value || 0);
      limit = parseInt(limit || 0);

      if (!value && !limit) {
        return 0;
      }

      console.log('Percent', value, limit);
      return Math.ceil(value / limit * 100);
    },

    getPurchased(ticketType) {
      var self = this;

      var key = _.camelCase(ticketType.title);

      var value = _.get(self.model, `tickets.types[${key}]`) || 0;
      console.log('PURCHASED', ticketType, value);

      if (isNaN(value)) {
        value = 0;
      }

      return value;
    },

    addTicketType() {
      var self = this;
      self.$fluro.prompt([{
        title: 'Ticket Type',
        description: `eg. 'Standard', 'Adult', 'Child'`,
        key: 'title',
        minimum: 1,
        maximum: 1,
        params: {
          autofocus: true
        }
      }, {
        title: 'Limit',
        description: `How many of these kinds of tickets are available? (Leave blank or 0 for no limit)`,
        key: 'limit',
        type: 'integer',
        minimum: 0,
        maximum: 1
      }], 'Add Ticket Type').then(function (res) {
        var title = res.title.toLowerCase();

        var existingMatch = _.some(self.model.ticketTypes, function (ticket) {
          return ticket.title.toLowerCase() == title;
        });

        if (existingMatch) {
          return;
        }

        res.limit = res.limit ? parseInt(res.limit) : 0;
        self.model.ticketTypes.push(res); // this.$set(this.model, 'Adult', 100);
      });
    },

    setDefaults() {
      var self = this;

      if (!self.model) {
        return;
      }

      if (!self.model.tickets) {
        self.model.tickets = {};
      }

      if (!self.model.ticketTypes) {
        self.$set(self.model, 'ticketTypes', []);
      }

      if (!self.model.ticketLimit) {
        self.$set(self.model, 'ticketLimit', 0);
      }
    }

  },
  watch: {
    model(v) {
      if (this.value != v) {
        this.setDefaults();
        this.$emit('input', v);
      }
    }

  },

  data() {
    return {
      model: this.value
    };
  }

};

/* script */
const __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "fluro-panel",
    [
      _c(
        "fluro-panel-title",
        [
          _c(
            "v-layout",
            { attrs: { "align-center": "" } },
            [
              _c("v-flex", [_c("h5", [_vm._v("Ticket Types")])]),
              _vm._v(" "),
              _c(
                "v-flex",
                { attrs: { shrink: "" } },
                [
                  _c(
                    "v-btn",
                    {
                      staticClass: "ma-0",
                      attrs: { small: "", color: "primary" },
                      on: {
                        click: function($event) {
                          return _vm.addTicketType()
                        }
                      }
                    },
                    [
                      _vm._v(
                        "\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tAdd Ticket Type\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t"
                      ),
                      _c("fluro-icon", { attrs: { right: "", icon: "plus" } })
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
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: false,
              expression: "false"
            }
          ]
        },
        [_c("fluro-table")],
        1
      ),
      _vm._v(" "),
      _c("div", { staticClass: "fluro-table-wrapper" }, [
        _c("div", { staticClass: "fluro-table-scroll" }, [
          _c("table", { staticClass: "fluro-table-main" }, [
            _c("thead", [
              _c("tr", [
                _c("th", [_vm._v("Type")]),
                _vm._v(" "),
                _c("th", [_vm._v("Capacity Limit")]),
                _vm._v(" "),
                _c("th", [_vm._v("Purchased")]),
                _vm._v(" "),
                _c("th", [_vm._v("Available")]),
                _vm._v(" "),
                _c("th", [_vm._v("Filled")]),
                _vm._v(" "),
                _c("th")
              ])
            ]),
            _vm._v(" "),
            _c(
              "tbody",
              [
                _c("tr", [
                  _c("th", [_vm._v("All/Any Tickets")]),
                  _vm._v(" "),
                  _c("td", [
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.model.ticketLimit,
                          expression: "model.ticketLimit"
                        }
                      ],
                      attrs: { type: "number", min: "0" },
                      domProps: { value: _vm.model.ticketLimit },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(
                            _vm.model,
                            "ticketLimit",
                            $event.target.value
                          );
                        }
                      }
                    })
                  ]),
                  _vm._v(" "),
                  _c("td", [_vm._v(_vm._s(_vm.model.tickets.value))]),
                  _vm._v(" "),
                  _c("td", [
                    _vm._v(
                      _vm._s(
                        _vm.model.tickets.value
                          ? _vm.getAvailable(
                              _vm.model.tickets.value,
                              _vm.model.ticketLimit
                            )
                          : ""
                      )
                    )
                  ]),
                  _vm._v(" "),
                  _c("td", [
                    _vm._v(
                      _vm._s(
                        _vm.model.tickets.value
                          ? _vm.getPercent(
                              _vm.model.tickets.value,
                              _vm.model.ticketLimit
                            ) + "%"
                          : ""
                      )
                    )
                  ]),
                  _vm._v(" "),
                  _c("td")
                ]),
                _vm._v(" "),
                _vm._l(_vm.model.ticketTypes, function(entry, index) {
                  return _c("tr", { key: entry.title }, [
                    _c("th", [
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: entry.title,
                            expression: "entry.title"
                          }
                        ],
                        domProps: { value: entry.title },
                        on: {
                          input: function($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(entry, "title", $event.target.value);
                          }
                        }
                      })
                    ]),
                    _vm._v(" "),
                    _c("td", [
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: entry.limit,
                            expression: "entry.limit"
                          }
                        ],
                        attrs: { type: "number", min: "0" },
                        domProps: { value: entry.limit },
                        on: {
                          input: function($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(entry, "limit", $event.target.value);
                          }
                        }
                      })
                    ]),
                    _vm._v(" "),
                    _c("td", [_vm._v(_vm._s(_vm.getPurchased(entry)))]),
                    _vm._v(" "),
                    _c("td", [
                      _vm._v(
                        _vm._s(
                          _vm.getAvailable(_vm.getPurchased(entry), entry.limit)
                        )
                      )
                    ]),
                    _vm._v(" "),
                    _c("td", [
                      _vm._v(
                        _vm._s(
                          _vm.getPercent(_vm.getPurchased(entry), entry.limit)
                        ) + "%"
                      )
                    ]),
                    _vm._v(" "),
                    _c(
                      "td",
                      [
                        _c(
                          "v-btn",
                          {
                            staticClass: "ma-0",
                            attrs: { small: "", icon: "" },
                            on: {
                              click: function($event) {
                                return _vm.removeEntry(index)
                              }
                            }
                          },
                          [_c("fluro-icon", { attrs: { icon: "trash-alt" } })],
                          1
                        )
                      ],
                      1
                    )
                  ])
                })
              ],
              2
            )
          ])
        ])
      ])
    ],
    1
  )
};
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

  /* style */
  const __vue_inject_styles__$3 = function (inject) {
    if (!inject) return
    inject("data-v-0a0965aa_0", { source: "/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n\n/*# sourceMappingURL=TicketTypeManager.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/event/TicketTypeManager.vue","TicketTypeManager.vue"],"names":[],"mappings":"AAiPA,GAAA;AAYA;EACA,yCAAA;AC3PA;AD8PA;EACA,2CAAA;AC3PA;AD8PA;EACA,4CAAA;AC3PA;AD8PA;EACA,0CAAA;AC3PA;;ADmQA,GAAA;;AC/PA,gDAAgD","file":"TicketTypeManager.vue","sourcesContent":["<template>\n\t\t\t\t<fluro-panel>\n\t\t\t\t\t\t\t\t<fluro-panel-title>\n\t\t\t\t\t\t\t\t\t\t\t\t<v-layout align-center>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h5>Ticket Types</h5>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex shrink>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-btn class=\"ma-0\" small color=\"primary\" @click=\"addTicketType()\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tAdd Ticket Type\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-icon right icon=\"plus\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-btn>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t</fluro-panel-title>\n\t\t\t\t\t\t\t\t<div v-show=\"false\">\n\t\t\t\t\t\t\t\t\t<fluro-table />\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"fluro-table-wrapper\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"fluro-table-scroll\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<table class=\"fluro-table-main\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<thead>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<th>Type</th>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<th>Capacity Limit</th>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<th>Purchased</th>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<th>Available</th>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<th>Filled</th>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<th></th>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</thead>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<th>All/Any Tickets</th>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td><input v-model=\"model.ticketLimit\" type=\"number\" min=\"0\" /></td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td>{{model.tickets.value}}</td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td>{{model.tickets.value ? getAvailable(model.tickets.value, model.ticketLimit) : ''}}</td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td>{{model.tickets.value ? `${getPercent(model.tickets.value, model.ticketLimit)}%` : ''}}</td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td></td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr :key=\"entry.title\" v-for=\"(entry, index) in model.ticketTypes\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<th> <input v-model=\"entry.title\" /></th>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td><input v-model=\"entry.limit\" type=\"number\" min=\"0\" /></td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td>{{getPurchased(entry)}}</td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td>{{getAvailable(getPurchased(entry), entry.limit)}}</td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td>{{getPercent(getPurchased(entry), entry.limit)}}%</td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-btn small class=\"ma-0\" icon @click=\"removeEntry(index)\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-icon icon=\"trash-alt\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-btn>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tbody>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</table>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<!-- <fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t<v-layout align-center>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs8>Any Ticket</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs2>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input v-model=\"model.ticketLimit\" type=\"number\" min=\"0\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs2>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{{model.tickets.value}}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t</fluro-panel-body>\n\t\t\t\t\t\t\t\t<fluro-panel-body class=\"border-top\" v-for=\"entry in model.ticketTypes\">\n\t\t\t\t\t\t\t\t\t\t\t\t<v-layout align-center>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs8>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input v-model=\"entry.title\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs2>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input v-model=\"entry.limit\" type=\"number\" min=\"0\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs2>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{{getPurchased(entry)}}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t</fluro-panel-body> -->\n\t\t\t\t</fluro-panel>\n</template>\n<script>\nimport _ from 'lodash';\nimport { FluroTable } from 'fluro-vue-ui'\n\nexport default {\n\t\t\t\tcomponents: {\n\t\t\t\t\t\t\t\tFluroTable,\n\t\t\t\t},\n\t\t\t\tprops: {\n\t\t\t\t\t\t\t\tvalue: {\n\t\t\t\t\t\t\t\t\t\t\t\ttype: Object,\n\t\t\t\t\t\t\t\t}\n\t\t\t\t},\n\t\t\t\tcreated() {\n\t\t\t\t\t\t\t\tthis.setDefaults();\n\t\t\t\t},\n\t\t\t\t// computed: {\n\t\t\t\t// \t\t\t\tentries: {\n\t\t\t\t// \t\t\t\t\t\t\t\tget() {\n\t\t\t\t// \t\t\t\t\t\t\t\t\t\t\t\treturn _.map(this.model, function(value, key) {\n\t\t\t\t// \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn {\n\t\t\t\t// \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkey,\n\t\t\t\t// \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue,\n\t\t\t\t// \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t// \t\t\t\t\t\t\t\t\t\t\t\t})\n\t\t\t\t// \t\t\t\t\t\t\t\t},\n\t\t\t\t// \t\t\t\t\t\t\t\tset(array) {\n\n\t\t\t\t// \t\t\t\t\t\t\t\t\t\t\t\tthis.model = _.reduce(array, function(set, entry) {\n\n\t\t\t\t// \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tset[entry.key] = entry.value;\n\n\t\t\t\t// \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn set;\n\t\t\t\t// \t\t\t\t\t\t\t\t\t\t\t\t}, {})\n\t\t\t\t// \t\t\t\t\t\t\t\t}\n\t\t\t\t// \t\t\t\t}\n\t\t\t\t// },\n\t\t\t\tmethods: {\n\t\t\t\t\t\t\t\tremoveEntry(index) {\n\t\t\t\t\t\t\t\t\t\t\t\tthis.model.ticketTypes.splice(index, 1);\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tgetAvailable(value, limit) {\n\n\n\t\t\t\t\t\t\t\t\t\t\t\tvalue = parseInt(value || 0);\n\t\t\t\t\t\t\t\t\t\t\t\tlimit = parseInt(limit || 0);\n\t\t\t\t\t\t\t\t\t\t\t\tif (!value && !limit) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn 0;\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t\t\tconsole.log('Available', value, limit)\n\t\t\t\t\t\t\t\t\t\t\t\treturn Math.max(limit - value, 0);\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tgetPercent(value, limit) {\n\n\t\t\t\t\t\t\t\t\t\t\t\tvalue = parseInt(value || 0);\n\t\t\t\t\t\t\t\t\t\t\t\tlimit = parseInt(limit || 0);\n\n\t\t\t\t\t\t\t\t\t\t\t\tif (!value && !limit) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn 0;\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t\t\tconsole.log('Percent', value, limit)\n\t\t\t\t\t\t\t\t\t\t\t\treturn Math.ceil(value / limit * 100);\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tgetPurchased(ticketType) {\n\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\n\t\t\t\t\t\t\t\t\t\t\t\tvar key = _.camelCase(ticketType.title)\n\n\t\t\t\t\t\t\t\t\t\t\t\tvar value = _.get(self.model, `tickets.types[${key}]`) || 0;\n\n\t\t\t\t\t\t\t\t\t\t\t\tconsole.log('PURCHASED', ticketType, value)\n\t\t\t\t\t\t\t\t\t\t\t\tif (isNaN(value)) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue = 0;\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t\t\treturn value;\n\t\t\t\t\t\t\t\t},\n\n\t\t\t\t\t\t\t\taddTicketType() {\n\n\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\n\n\t\t\t\t\t\t\t\t\t\t\t\tself.$fluro.prompt([{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Ticket Type',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescription: `eg. 'Standard', 'Adult', 'Child'`,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkey: 'title',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tparams: { autofocus: true }\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Limit',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescription: `How many of these kinds of tickets are available? (Leave blank or 0 for no limit)`,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkey: 'limit',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'integer',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t], 'Add Ticket Type')\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t.then(function(res) {\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvar title = res.title.toLowerCase();\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvar existingMatch = _.some(self.model.ticketTypes, function(ticket) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn ticket.title.toLowerCase() == title;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t})\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tif (existingMatch) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tres.limit = res.limit ? parseInt(res.limit) : 0;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tself.model.ticketTypes.push(res)\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// this.$set(this.model, 'Adult', 100);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tsetDefaults() {\n\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\n\t\t\t\t\t\t\t\t\t\t\t\tif (!self.model) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn;\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t\t\tif (!self.model.tickets) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tself.model.tickets = {};\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t\t\tif (!self.model.ticketTypes) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tself.$set(self.model, 'ticketTypes', []);\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t\t\tif (!self.model.ticketLimit) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tself.$set(self.model, 'ticketLimit', 0);\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t},\n\t\t\t\t},\n\t\t\t\twatch: {\n\t\t\t\t\t\t\t\tmodel(v) {\n\t\t\t\t\t\t\t\t\t\t\t\tif (this.value != v) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tthis.setDefaults();\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tthis.$emit('input', v);\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t}\n\t\t\t\t},\n\t\t\t\tdata() {\n\t\t\t\t\t\t\t\treturn {\n\t\t\t\t\t\t\t\t\t\t\t\tmodel: this.value,\n\t\t\t\t\t\t\t\t}\n\t\t\t\t},\n}\n\n</script>\n<style lang=\"scss\">\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n</style>\n","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n\n/*# sourceMappingURL=TicketTypeManager.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$3 = undefined;
  /* module identifier */
  const __vue_module_identifier__$3 = undefined;
  /* functional template */
  const __vue_is_functional_template__$3 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$3 = __vue_normalize__(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    false,
    __vue_create_injector__,
    undefined,
    undefined
  );

export { __vue_component__$2 as L, __vue_component__$1 as M, __vue_component__$3 as T };
//# sourceMappingURL=TicketTypeManager-d880dedf.js.map
