
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { ah as FluroContentView, am as FluroTaskList, P as ProcessDots, bo as _, br as _objectSpread2, bm as __vue_normalize__, bn as __vue_create_injector__ } from './index-4c5c230a.js';
import 'vue';
import 'vuedraggable';
import 'vue-color';
import 'signature_pad';
import 'fluro';
import { mapFields } from 'vuex-map-fields';
import 'async';
import 'tippy.js';
import 'tiptap';
import 'tiptap-commands';
import 'tiptap-extensions';
import 'moment';
import { F as FluroContentEditMixin } from './FluroContentEditMixin-42747c98.js';

var script = {
  props: {// 'fields': {
    //     type: Array,
    //     default () {
    //         var array = [];
    //         ///////////////////////////////////
    //         function addField(key, details) {
    //             details.key = key;
    //             array.push(details)
    //             // // Vue.set(self.fields, key, details);
    //             // if (details.enabled === false) {
    //             // } else {
    //             //     details.enabled = true;
    //             // }
    //             // var defaultValue = self.getDefaultValue(key, details);
    //             // Vue.set(self.model, key, defaultValue);
    //         }
    //         //Update fields to use the default fields we set above
    //         return array;
    //     }
    // }
  },

  created() {
    if (!this.model.data) {
      this.model.data = {};
    }
  },

  mixins: [FluroContentEditMixin],
  components: {
    FluroContentView,
    FluroTaskList,
    ProcessDots // FluroAvatarUpdate,
    // FluroContentForm,
    // FluroRealmSelect,
    // FluroContentFormField,
    // FluroAcademicSelect,

  },
  methods: {
    manualLink(form) {
      console.log('FORM', form);
      var self = this;
      self.$fluro.global.select(form.form.definitionName, {
        maximum: 1
      }).then(function (interactions) {
        if (!interactions || !interactions.length) {
          return;
        }

        var cardID = self.$fluro.utils.getStringID(self.model);
        var interactionID = self.$fluro.utils.getStringID(interactions[0]);
        var formID = self.$fluro.utils.getStringID(form.form);
        console.log('LINK', cardID, interactionID, formID);
        self.$set(self.linking, formID, true);
        self.$fluro.api.put(`/process/${cardID}/link`, {
          interaction: interactionID,
          definition: formID
        }).then(function (result) {
          self.$emit('refresh');
          self.$set(self.linking, formID, false);
        }).catch(function (err) {
          self.$fluro.error(err);
          self.$set(self.linking, formID, false);
        });
      });
    },

    removeTaskList(index) {
      var self = this;
      var lists = self.model.taskLists;
      self.$delete(lists, index);
      self.$set(self.model, 'taskLists', lists.slice()); // self.model.taskLists = self.model.taskLists.splice(index, 1);

      self.dispatchUpdate();
    },

    addTaskList() {
      var self = this;

      if (!self.model.taskLists) {
        self.$set(self.model, 'taskLists', []);
      }

      var newList = {
        autofocus: true,
        tasks: [// {
          //     name: 'New Task',
          //     description: '',
          //     required: true,
          //     guid: self.$fluro.utils.guid(),
          // }
        ]
      }; /////////////////////////////////////////////
      /////////////////////////////////////////////

      var currentState = self.currentState;
      var proposedTitle;

      if (currentState && currentState.title) {
        proposedTitle = `${currentState.title} tasks`;
        newList.state = currentState.key;
      } //Check if there is already a task list with this title


      var existingList = _.find(self.model.taskLists, {
        title: proposedTitle
      }); //If there is no title or there is already a task list for this state


      if (!proposedTitle || !proposedTitle.length || existingList) {
        proposedTitle = `${self.user.firstName}'s tasks`;
      } //Check if there is already a task list with this title


      var existingList = _.find(self.model.taskLists, {
        title: proposedTitle
      }); /////////////////////////////////////////////


      if (existingList) {
        proposedTitle = 'Additional Tasks'; // console.log('Already exists', proposedTitle);
        // return;
      } //Use our proposed title


      newList.title = proposedTitle; /////////////////////////////////////////////
      /////////////////////////////////////////////

      self.model.taskLists.push(newList); // console.log('SELF MODEL', self.model)
      // self.update(self.model)

      self.dispatchUpdate();
    },

    resend(form) {
      var self = this;
      var cardID = self.$fluro.utils.getStringID(self.model);
      var formID = self.$fluro.utils.getStringID(form.form);
      self.$set(self.resending, formID, true);
      return self.$fluro.api.put(`/process/resend/${cardID}/${formID}`).then(function (res) {
        self.$fluro.notify('Form was resent');
        self.$set(self.resending, formID, false);
      }).catch(function (err) {
        self.$fluro.error(err);
        self.$set(self.resending, formID, false);
      }); // this.resending[]
      // this.$set(form, 'resending', true);
    },

    dispatchUpdate(newModel) {
      this.update(this.model);
    }

  },
  asyncComputed: {// devices: {
    //     default: [],
    //     get() {
    //         var self = this;
    //         if (self.context != 'edit' || !self.itemID) {
    //             return Promise.resolve([]);
    //         }
    //         //////////////////////////////////////
    //         return new Promise(function(resolve, reject) {
    //             self.$fluro.api.get(`/contact/${self.itemID}/devices`)
    //                 .then(function(res) {
    //                     resolve(_.map(res.data, function(device) {
    //                         device.pinging = false;
    //                         return device;
    //                     }));
    //                 })
    //                 .catch(function(err) {
    //                     reject(err);
    //                 })
    //         })
    //     }
    // },
  },
  computed: _objectSpread2({
    showKeyContacts() {
      var reference = this.model.item;

      if (reference && reference._type == 'contact') {
        return this.model.contacts && this.model.contacts.length;
      }

      return true;
    }

  }, mapFields('fluro', ['application', //The Fluro application and all of it's permissions and data
  'user' //The authenticated user if they log in
  ]), {
    fieldsOutput() {
      var self = this;
      var array = []; ///////////////////////////////////

      addField('title', {
        title: 'Title',
        minimum: 1,
        maximum: 1,
        type: 'string',
        placeholder: ''
      }); ///////////////////////////////////

      addField('contacts', {
        title: 'Key Contacts',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        params: {
          restrictType: 'contact'
        }
      }); ///////////////////////////////////

      addField('dueDate', {
        title: 'Due Date',
        minimum: 0,
        maximum: 1,
        type: 'date',
        directive: 'datetime-select',
        params: {}
      });
      addField('state', {
        title: 'Current State',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'select',
        options: _.map(self.states, function (state) {
          return {
            name: state.title,
            value: state.key
          };
        })
      }); ///////////////////////////////////

      addField('assignedTo', {
        title: 'Assigned To',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        params: {
          restrictType: 'contact'
        }
      }); ///////////////////////////////////

      function addField(key, details) {
        details.key = key;
        array.push(details);
      } // console.log('DO THE OUTPUT!!!');


      return array;
    },

    referenceItemField() {
      var self = this;

      var processTypes = _.chain(this.definition).get('data.processTypes').map(function (type) {
        return {
          name: self.$fluro.types.readable(type),
          value: type
        };
      }).value();

      return {
        key: 'item',
        title: 'Referenced Item',
        description: 'Select an item to add to this process',
        minimum: 0,
        maximum: 1,
        type: 'reference' // params:{
        //     restrictType
        // }

      };
    },

    currentStateName() {
      return this.model.state;
    },

    currentState() {
      return _.find(this.states, {
        key: this.currentStateName
      });
    },

    reference() {
      return this.model.item;
    },

    title() {
      if (this.model) {
        if (this.model.title && this.model.title.length) {
          return this.model.title;
        }

        if (this.model.item && this.model.item.title) {
          return this.model.item.title;
        }
      }

      return 'New Card';
    },

    states() {
      return _.get(this.definition, 'data.states'); // this.definition && this.definition.data ? this.definition.data.states : []
    },

    awaitingForms() {
      var self = this;
      return _.filter(self.model.forms, function (entry) {
        return !entry.interaction;
      });
    },

    receivedForms() {
      var self = this;
      return _.filter(self.model.forms, function (entry) {
        return entry.interaction;
      });
    },

    showOutline() {
      return false; //true; //false;//true;//false;//true;
    }

  }),

  data() {
    return {
      linking: {},
      resending: {}
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
            {
              attrs: { justified: true },
              scopedSlots: _vm._u([
                {
                  key: "menuprefix",
                  fn: function() {
                    return [
                      _vm.context == "edit" && _vm.$vuetify.breakpoint.mdAndUp
                        ? void 0
                        : _vm._e()
                    ]
                  },
                  proxy: true
                }
              ])
            },
            [
              _vm._v(" "),
              _c(
                "tab",
                { attrs: { heading: "Card Details" } },
                [
                  _c(
                    "flex-row",
                    [
                      _c(
                        "v-flex",
                        { staticClass: "main", attrs: { xs12: "", sm8: "" } },
                        [
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
                                      _vm.reference
                                        ? [
                                            _c(
                                              "fluro-panel",
                                              [
                                                _c(
                                                  "fluro-panel-body",
                                                  {
                                                    staticStyle: {
                                                      padding: "0"
                                                    }
                                                  },
                                                  [
                                                    _c("fluro-content-view", {
                                                      attrs: {
                                                        id: _vm.reference,
                                                        embedded: true,
                                                        definition:
                                                          _vm.reference
                                                            .definition,
                                                        type:
                                                          _vm.reference._type
                                                      }
                                                    })
                                                  ],
                                                  1
                                                )
                                              ],
                                              1
                                            )
                                          ]
                                        : _vm.definition &&
                                          _vm.definition.fields &&
                                          _vm.definition.fields.length
                                        ? [
                                            _c("fluro-content-form-field", {
                                              attrs: {
                                                "form-fields": _vm.formFields,
                                                outline: _vm.showOutline,
                                                options: _vm.options,
                                                field: _vm.fieldHash.title
                                              },
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
                                              attrs: {
                                                options: _vm.options,
                                                fields: _vm.definition.fields
                                              },
                                              model: {
                                                value: _vm.model.data,
                                                callback: function($$v) {
                                                  _vm.$set(
                                                    _vm.model,
                                                    "data",
                                                    $$v
                                                  );
                                                },
                                                expression: "model.data"
                                              }
                                            })
                                          ]
                                        : [
                                            _c(
                                              "h3",
                                              { attrs: { margin: "" } },
                                              [_vm._v(_vm._s(_vm.title))]
                                            ),
                                            _vm._v(" "),
                                            _c("fluro-content-form-field", {
                                              attrs: {
                                                "form-fields": _vm.formFields,
                                                outline: _vm.showOutline,
                                                options: _vm.options,
                                                field: _vm.referenceItemField
                                              },
                                              model: {
                                                value: _vm.model,
                                                callback: function($$v) {
                                                  _vm.model = $$v;
                                                },
                                                expression: "model"
                                              }
                                            })
                                          ],
                                      _vm._v(" "),
                                      _vm.model.forms && _vm.model.forms.length
                                        ? [
                                            _vm.awaitingForms &&
                                            _vm.awaitingForms.length
                                              ? _c(
                                                  "v-input",
                                                  { staticClass: "no-flex" },
                                                  [
                                                    _c("v-label", [
                                                      _vm._v(
                                                        "Awaiting " +
                                                          _vm._s(
                                                            _vm.awaitingForms
                                                              .length
                                                          ) +
                                                          " Form Responses"
                                                      )
                                                    ]),
                                                    _vm._v(" "),
                                                    _c(
                                                      "p",
                                                      {
                                                        staticClass:
                                                          "help-block"
                                                      },
                                                      [
                                                        _vm._v(
                                                          "These forms have not yet been submitted"
                                                        )
                                                      ]
                                                    ),
                                                    _vm._v(" "),
                                                    _c(
                                                      "list-group",
                                                      _vm._l(
                                                        _vm.awaitingForms,
                                                        function(form) {
                                                          return _c(
                                                            "list-group-item",
                                                            {
                                                              scopedSlots: _vm._u(
                                                                [
                                                                  {
                                                                    key:
                                                                      "right",
                                                                    fn: function() {
                                                                      return [
                                                                        _c(
                                                                          "v-btn",
                                                                          {
                                                                            directives: [
                                                                              {
                                                                                name:
                                                                                  "tippy",
                                                                                rawName:
                                                                                  "v-tippy"
                                                                              }
                                                                            ],
                                                                            attrs: {
                                                                              small:
                                                                                "",
                                                                              icon:
                                                                                "",
                                                                              loading:
                                                                                _vm
                                                                                  .linking[
                                                                                  form
                                                                                    .form
                                                                                    ._id
                                                                                ],
                                                                              content:
                                                                                "Link to an existing form submission"
                                                                            },
                                                                            on: {
                                                                              click: function(
                                                                                $event
                                                                              ) {
                                                                                return _vm.manualLink(
                                                                                  form
                                                                                )
                                                                              }
                                                                            }
                                                                          },
                                                                          [
                                                                            _c(
                                                                              "fluro-icon",
                                                                              {
                                                                                attrs: {
                                                                                  icon:
                                                                                    "link"
                                                                                }
                                                                              }
                                                                            )
                                                                          ],
                                                                          1
                                                                        ),
                                                                        _vm._v(
                                                                          " "
                                                                        ),
                                                                        _c(
                                                                          "v-btn",
                                                                          {
                                                                            attrs: {
                                                                              small:
                                                                                "",
                                                                              color:
                                                                                "primary",
                                                                              loading:
                                                                                _vm
                                                                                  .resending[
                                                                                  form
                                                                                    .form
                                                                                    ._id
                                                                                ]
                                                                            },
                                                                            on: {
                                                                              click: function(
                                                                                $event
                                                                              ) {
                                                                                return _vm.resend(
                                                                                  form
                                                                                )
                                                                              }
                                                                            }
                                                                          },
                                                                          [
                                                                            _vm._v(
                                                                              "\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tResend\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t"
                                                                            ),
                                                                            _c(
                                                                              "fluro-icon",
                                                                              {
                                                                                attrs: {
                                                                                  right:
                                                                                    "",
                                                                                  icon:
                                                                                    "paper-plane"
                                                                                }
                                                                              }
                                                                            )
                                                                          ],
                                                                          1
                                                                        )
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
                                                              _c(
                                                                "strong",
                                                                [
                                                                  _c(
                                                                    "fluro-icon",
                                                                    {
                                                                      attrs: {
                                                                        type:
                                                                          "form"
                                                                      }
                                                                    }
                                                                  ),
                                                                  _vm._v(
                                                                    " " +
                                                                      _vm._s(
                                                                        form
                                                                          .form
                                                                          .title
                                                                      ) +
                                                                      "\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t"
                                                                  )
                                                                ],
                                                                1
                                                              ),
                                                              _vm._v(" "),
                                                              _c(
                                                                "div",
                                                                {
                                                                  staticClass:
                                                                    "sm"
                                                                },
                                                                [
                                                                  _vm._v(
                                                                    "\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tSent " +
                                                                      _vm._s(
                                                                        _vm._f(
                                                                          "timeago"
                                                                        )(
                                                                          form.sent
                                                                        )
                                                                      ) +
                                                                      " - "
                                                                  ),
                                                                  _c(
                                                                    "span",
                                                                    {
                                                                      staticClass:
                                                                        "status-label draft"
                                                                    },
                                                                    [
                                                                      _c(
                                                                        "fluro-icon",
                                                                        {
                                                                          attrs: {
                                                                            icon:
                                                                              "clock"
                                                                          }
                                                                        }
                                                                      ),
                                                                      _vm._v(
                                                                        " Awaiting form response"
                                                                      )
                                                                    ],
                                                                    1
                                                                  )
                                                                ]
                                                              )
                                                            ]
                                                          )
                                                        }
                                                      ),
                                                      1
                                                    )
                                                  ],
                                                  1
                                                )
                                              : _vm._e(),
                                            _vm._v(" "),
                                            _vm.receivedForms &&
                                            _vm.receivedForms.length
                                              ? _c(
                                                  "v-input",
                                                  { staticClass: "no-flex" },
                                                  [
                                                    _c("v-label", [
                                                      _vm._v(
                                                        "Received " +
                                                          _vm._s(
                                                            _vm.receivedForms
                                                              .length
                                                          ) +
                                                          " Form Response" +
                                                          _vm._s(
                                                            _vm.receivedForms
                                                              .length == 1
                                                              ? ""
                                                              : "s"
                                                          )
                                                      )
                                                    ]),
                                                    _vm._v(" "),
                                                    _vm._l(
                                                      _vm.receivedForms,
                                                      function(form, index) {
                                                        return _c(
                                                          "fluro-panel",
                                                          { key: index },
                                                          [
                                                            _c(
                                                              "fluro-panel-title",
                                                              [
                                                                _c(
                                                                  "strong",
                                                                  [
                                                                    _c(
                                                                      "fluro-icon",
                                                                      {
                                                                        attrs: {
                                                                          type:
                                                                            "form"
                                                                        }
                                                                      }
                                                                    ),
                                                                    _vm._v(
                                                                      " " +
                                                                        _vm._s(
                                                                          form
                                                                            .form
                                                                            .title
                                                                        ) +
                                                                        "\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t"
                                                                    )
                                                                  ],
                                                                  1
                                                                ),
                                                                _vm._v(" "),
                                                                _c(
                                                                  "div",
                                                                  {
                                                                    staticClass:
                                                                      "sm"
                                                                  },
                                                                  [
                                                                    _c(
                                                                      "span",
                                                                      {
                                                                        staticClass:
                                                                          "status-label active"
                                                                      },
                                                                      [
                                                                        _c(
                                                                          "fluro-icon",
                                                                          {
                                                                            attrs: {
                                                                              icon:
                                                                                "check"
                                                                            }
                                                                          }
                                                                        ),
                                                                        _vm._v(
                                                                          " Received "
                                                                        )
                                                                      ],
                                                                      1
                                                                    ),
                                                                    _vm._v(
                                                                      " " +
                                                                        _vm._s(
                                                                          _vm._f(
                                                                            "formatDate"
                                                                          )(
                                                                            form.received,
                                                                            "h:mma ddd MMM YYYY"
                                                                          )
                                                                        ) +
                                                                        " "
                                                                    ),
                                                                    _c(
                                                                      "span",
                                                                      {
                                                                        staticClass:
                                                                          "muted"
                                                                      },
                                                                      [
                                                                        _vm._v(
                                                                          _vm._s(
                                                                            _vm._f(
                                                                              "timeago"
                                                                            )(
                                                                              form.received
                                                                            )
                                                                          )
                                                                        )
                                                                      ]
                                                                    )
                                                                  ]
                                                                )
                                                              ]
                                                            ),
                                                            _vm._v(" "),
                                                            _c(
                                                              "fluro-panel-body",
                                                              {
                                                                staticStyle: {
                                                                  padding: "0"
                                                                }
                                                              },
                                                              [
                                                                _c(
                                                                  "fluro-content-view",
                                                                  {
                                                                    attrs: {
                                                                      id:
                                                                        form.interaction,
                                                                      embedded: true,
                                                                      definition:
                                                                        form
                                                                          .interaction
                                                                          .definition,
                                                                      type:
                                                                        "interaction"
                                                                    }
                                                                  }
                                                                )
                                                              ],
                                                              1
                                                            )
                                                          ],
                                                          1
                                                        )
                                                      }
                                                    )
                                                  ],
                                                  2
                                                )
                                              : _vm._e()
                                          ]
                                        : _vm._e(),
                                      _vm._v(" "),
                                      [
                                        _vm._l(_vm.model.taskLists, function(
                                          list,
                                          index
                                        ) {
                                          return _c("fluro-task-list", {
                                            attrs: {
                                              card: _vm.model,
                                              state: _vm.model.state,
                                              definition: _vm.definition
                                            },
                                            on: {
                                              remove: function($event) {
                                                return _vm.removeTaskList(index)
                                              },
                                              input: _vm.dispatchUpdate
                                            },
                                            model: {
                                              value: _vm.model.taskLists[index],
                                              callback: function($$v) {
                                                _vm.$set(
                                                  _vm.model.taskLists,
                                                  index,
                                                  $$v
                                                );
                                              },
                                              expression:
                                                "model.taskLists[index]"
                                            }
                                          })
                                        }),
                                        _vm._v(" "),
                                        _c("span", {
                                          staticClass: "horizontal-rule"
                                        }),
                                        _vm._v(" "),
                                        _c(
                                          "v-btn",
                                          {
                                            staticClass: "ml-0",
                                            on: {
                                              click: function($event) {
                                                return _vm.addTaskList()
                                              }
                                            }
                                          },
                                          [
                                            _vm._v(
                                              "\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tAdd Task List\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t"
                                            ),
                                            _c("fluro-icon", {
                                              attrs: { right: "", icon: "plus" }
                                            })
                                          ],
                                          1
                                        )
                                      ]
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
                      ),
                      _vm._v(" "),
                      _c(
                        "v-flex",
                        {
                          staticClass: "sidebar",
                          attrs: { xs12: "", sm4: "" }
                        },
                        [
                          _c(
                            "flex-column-body",
                            [
                              _c(
                                "v-container",
                                [
                                  _c(
                                    "v-input",
                                    { staticClass: "no-flex" },
                                    [
                                      _c("v-label", [_vm._v("Progress")]),
                                      _vm._v(" "),
                                      _c(
                                        "div",
                                        [
                                          _c("process-dots", {
                                            attrs: {
                                              definition: _vm.definition
                                            },
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
                                      field: _vm.fieldHash.dueDate
                                    },
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
                                      field: _vm.fieldHash.state
                                    },
                                    model: {
                                      value: _vm.model,
                                      callback: function($$v) {
                                        _vm.model = $$v;
                                      },
                                      expression: "model"
                                    }
                                  }),
                                  _vm._v(" "),
                                  _vm.showKeyContacts
                                    ? _c(
                                        "v-input",
                                        { staticClass: "no-flex" },
                                        [
                                          _c("v-label", [
                                            _vm._v("Key Contacts")
                                          ]),
                                          _vm._v(" "),
                                          _c(
                                            "p",
                                            { staticClass: "help-block" },
                                            [
                                              _vm._v(
                                                "This card does not reference a contact, Here you can specify who should be sent Automated SMS and Mailouts as this card progresses"
                                              )
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("fluro-content-form-field", {
                                            attrs: {
                                              "form-fields": _vm.formFields,
                                              showLabel: false,
                                              outline: _vm.showOutline,
                                              options: _vm.options,
                                              field: _vm.fieldHash.contacts
                                            },
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
                                    "v-input",
                                    { staticClass: "no-flex" },
                                    [
                                      _c("v-label", [_vm._v("Assigned To")]),
                                      _vm._v(" "),
                                      _c("p", { staticClass: "help-block" }, [
                                        _vm._v(
                                          "Assign who is in charge of this card"
                                        )
                                      ]),
                                      _vm._v(" "),
                                      _c("fluro-content-form-field", {
                                        attrs: {
                                          "form-fields": _vm.formFields,
                                          showLabel: false,
                                          outline: _vm.showOutline,
                                          options: _vm.options,
                                          field: _vm.fieldHash.assignedTo
                                        },
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
    inject("data-v-07193241_0", { source: "/**/\n.border-top[data-v-07193241] {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right[data-v-07193241] {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom[data-v-07193241] {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left[data-v-07193241] {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.hint[data-v-07193241] {\n  font-size: 10px;\n  opacity: 0.5;\n  color: inherit;\n  display: block;\n}\n.sidebar[data-v-07193241],\n.main[data-v-07193241] {\n  flex: 1;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n}\n.horizontal-rule[data-v-07193241] {\n  display: block;\n  border-radius: 20px;\n  height: 3px;\n  background: rgba(0, 0, 0, 0.1);\n  margin: 10px 0;\n}\n.sidebar[data-v-07193241] {\n  background: rgba(0, 0, 0, 0.02);\n}\n@media (min-width: 769px) {\n.sidebar[data-v-07193241] {\n    border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n}\n.bordered[data-v-07193241] {\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.bordered > > > .tabset-menu[data-v-07193241] {\n  background: #eee;\n}\n\n/*# sourceMappingURL=process.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/edit/panels/process.vue","process.vue"],"names":[],"mappings":"AAsrBA,GAAA;AAYA;EACA,yCAAA;AChsBA;ADmsBA;EACA,2CAAA;AChsBA;ADmsBA;EACA,4CAAA;AChsBA;ADmsBA;EACA,0CAAA;AChsBA;;ADwsBA,GAAA;AACA;EACA,eAAA;EACA,YAAA;EACA,cAAA;EACA,cAAA;ACrsBA;AD0sBA;;EAEA,OAAA;EAEA,gBAAA;EACA,aAAA;EACA,sBAAA;ACxsBA;AD2sBA;EACA,cAAA;EACA,mBAAA;EACA,WAAA;EACA,8BAAA;EACA,cAAA;ACxsBA;AD2sBA;EAEA,+BAAA;ACzsBA;AD2sBA;AAJA;IAKA,0CAAA;ACxsBE;AACF;AD2sBA;EACA,oCAAA;EACA,wCAAA;ACxsBA;AD0sBA;EACA,gBAAA;ACxsBA;;AAEA,sCAAsC","file":"process.vue","sourcesContent":["<template>\n\t\t\t\t<flex-column>\n\t\t\t\t\t\t\t\t<template v-if=\"loading\">\n\t\t\t\t\t\t\t\t\t\t\t\t<fluro-page-preloader contain />\n\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t<!-- :vertical=\"true\" -->\n\t\t\t\t\t\t\t\t<tabset v-else :justified=\"true\">\n\t\t\t\t\t\t\t\t\t\t\t\t<template v-slot:menuprefix>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<template v-if=\"context == 'edit' && $vuetify.breakpoint.mdAndUp\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <flex-column-header style=\"text-align:center\"> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <div style=\"padding: 10px;max-width:200px;margin: auto;\"> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <fluro-avatar-update :id=\"model._id\" type=\"contact\" /> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- </div> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- </flex-column-header> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t\t\t\t\t<tab heading=\"Card Details\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<flex-row>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm8 class=\"main\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<flex-column-body style=\"background: #fafafa;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <pre>{{definition.fields}}</pre> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <pre>{{model}}</pre> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<constrain sm>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<template v-if=\"reference\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!--  <fluro-panel-title class=\"border-bottom\">\n                                                    <v-layout align-center>\n                                                        <v-flex>\n                                                            <h5>{{title}}</h5>\n                                                        </v-flex>\n                                                        <v-flex shrink>\n                                                            <v-btn small v-tippy content=\"View\" class=\"ma-0\" icon v-if=\"$fluro.access.canViewItem(reference)\" @click=\"$fluro.global.view(reference, true)\">\n                                                                <fluro-icon icon=\"external-link\" />\n                                                            </v-btn>\n                                                            <v-btn small v-tippy content=\"Edit\" class=\"ma-0\" icon v-if=\"$fluro.access.canEditItem(reference)\" @click=\"$fluro.global.edit(reference, true)\">\n                                                                <fluro-icon icon=\"pencil\" />\n                                                            </v-btn>\n                                                            \n                                                        </v-flex>\n                                                    </v-layout>\n                                                </fluro-panel-title> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel-body style=\"padding:0;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <template v-if=\"reference._type == 'contact'\"> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- </template> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <template v-else> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <pre>{{reference}}</pre> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <flex-column-body style=\"max-height:50vh\"> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <pre>{{reference}}</pre> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-view :id=\"reference\" :embedded=\"true\" :definition=\"reference.definition\" :type=\"reference._type\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- </flex-column-body> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- </template> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<template v-else-if=\"definition && definition.fields && definition.fields.length\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" :options=\"options\" :field=\"fieldHash.title\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form :options=\"options\" v-model=\"model.data\" :fields=\"definition.fields\"></fluro-content-form>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<template v-else>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h3 margin>{{title}}</h3>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" :options=\"options\" :field=\"referenceItemField\" v-model=\"model\"></fluro-content-form-field>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<template v-if=\"model.forms && model.forms.length\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <h3 margin>Forms</h3> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-input class=\"no-flex\" v-if=\"awaitingForms && awaitingForms.length\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-label>Awaiting {{awaitingForms.length}} Form Responses</v-label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p class=\"help-block\">These forms have not yet been submitted</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<list-group>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<list-group-item v-for=\"form in awaitingForms\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<strong>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-icon type=\"form\" /> {{form.form.title}}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</strong>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"sm\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tSent {{form.sent | timeago}} - <span class=\"status-label draft\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-icon icon=\"clock\" /> Awaiting form response</span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<template v-slot:right>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!--  -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-btn small icon @click=\"manualLink(form)\" :loading=\"linking[form.form._id]\" v-tippy content=\"Link to an existing form submission\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-icon icon=\"link\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-btn>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-btn small color=\"primary\" @click=\"resend(form)\" :loading=\"resending[form.form._id]\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tResend\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-icon right icon=\"paper-plane\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-btn>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</list-group-item>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</list-group>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-input>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-input class=\"no-flex\" v-if=\"receivedForms && receivedForms.length\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-label>Received {{receivedForms.length}} Form Response{{receivedForms.length == 1 ? '' : 's'}}</v-label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <p class=\"help-block\">These forms have not yet been submitted</p> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <list-group> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel :key=\"index\" v-for=\"(form, index) in receivedForms\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel-title>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<strong>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-icon type=\"form\" /> {{form.form.title}}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</strong>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"sm\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class=\"status-label active\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-icon icon=\"check\" /> Received </span> {{form.received | formatDate('h:mma ddd MMM YYYY')}} <span class=\"muted\">{{form.received | timeago}}</span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel-title>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel-body style=\"padding:0;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <flex-column-body style=\"max-height:50vh\"> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-view :id=\"form.interaction\" :embedded=\"true\" :definition=\"form.interaction.definition\" type=\"interaction\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- </flex-column-body> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- </list-group> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-input>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<template>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <task-list ng-model=\"list\" ng-host=\"item\" ng-definition=\"definition\" show-link=\"true\" ng-repeat=\"list in item.taskLists\"></task-list> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <template> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-task-list @remove=\"removeTaskList(index)\" @input=\"dispatchUpdate\" :card=\"model\" v-model=\"model.taskLists[index]\" :state=\"model.state\" :definition=\"definition\" v-for=\"(list, index) in model.taskLists\"></fluro-task-list>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- </template> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <pre>{{model.taskLists}}</pre> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class=\"horizontal-rule\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-btn class=\"ml-0\" @click=\"addTaskList()\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tAdd Task List\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-icon right icon=\"plus\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-btn>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</constrain>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</flex-column-body>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm4 class=\"sidebar\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<flex-column-body>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-input class=\"no-flex\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-label>Progress</v-label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<process-dots :definition=\"definition\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-input>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" :options=\"options\" :field=\"fieldHash.dueDate\" v-model=\"model\"></fluro-content-form-field>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" :options=\"options\" :field=\"fieldHash.state\" v-model=\"model\"></fluro-content-form-field>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <pre>SHOW KEY CONTACTS {{showKeyContacts}}</pre> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-input class=\"no-flex\" v-if=\"showKeyContacts\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-label>Key Contacts</v-label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p class=\"help-block\">This card does not reference a contact, Here you can specify who should be sent Automated SMS and Mailouts as this card progresses</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :showLabel=\"false\" :outline=\"showOutline\" :options=\"options\" :field=\"fieldHash.contacts\" v-model=\"model\"></fluro-content-form-field>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-input>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-input class=\"no-flex\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-label>Assigned To</v-label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p class=\"help-block\">Assign who is in charge of this card</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :showLabel=\"false\" :outline=\"showOutline\" :options=\"options\" :field=\"fieldHash.assignedTo\" v-model=\"model\"></fluro-content-form-field>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-input>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</flex-column-body>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</flex-row>\n\t\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t\t\t\t\t<!-- <tab heading=\"Forms\" v-if=\"model.forms && model.forms.length\">\n                <slot>\n                    <flex-column-body style=\"background: #fafafa;\">\n                        <v-container>\n                            <constrain sm>\n                                <h3 margin>Forms</h3>\n                                <v-input class=\"no-flex\" v-if=\"receivedForms && receivedForms.length\">\n                                    <v-label>Received {{receivedForms.length}} Form Responses</v-label>\n                                    <p class=\"help-block\">These forms have not yet been submitted</p>\n                                    <list-group>\n                                        <list-group-item v-for=\"form in receivedForms\">\n                                            <strong>\n                                                <fluro-icon type=\"form\" /> {{form.form.title}}\n                                            </strong>\n                                            <div class=\"sm\">\n                                                <fluro-icon icon=\"check\" /> Received {{form.received | formatDate('h:mma ddd MMM YYYY')}} {{form.received | timeago}}\n                                            </div>\n                                        </list-group-item>\n                                    </list-group>\n                                </v-input>\n                                <v-input class=\"no-flex\" v-if=\"awaitingForms\">\n                                    <v-label>Awaiting {{awaitingForms.length}} Form Responses</v-label>\n                                    <p class=\"help-block\">These forms have not yet been submitted</p>\n                                    <list-group>\n                                        <list-group-item v-for=\"form in awaitingForms\">\n                                            <strong>\n                                                <fluro-icon type=\"form\" /> {{form.form.title}}\n                                            </strong>\n                                            <div class=\"sm\">Sent {{form.sent | timeago}} - <span class=\"status-label draft\">\n                                                    <fluro-icon icon=\"clock\" /> Awaiting form response</span>\n                                            </div>\n                                            <template v-slot:right>\n                                                <v-btn small color=\"primary\" @click=\"resend(form)\" :loading=\"resending[form.form._id]\">\n                                                    Resend\n                                                    <fluro-icon right icon=\"paper-plane\" />\n                                                </v-btn>\n                                            </template>\n                                        </list-group-item>\n                                    </list-group>\n                                </v-input>\n                            </constrain>\n                        </v-container>\n                    </flex-column-body>\n                </slot>\n            </tab>\n            <tab heading=\"Metadata\" v-if=\"context == 'edit'\">\n                <slot>\n                    <flex-column-body style=\"background: #fafafa;\">\n                        <v-container>\n                            <constrain sm>\n                                <h3 margin>Metadata</h3>\n                                <div v-if=\"model.data\">\n                                    <v-card>\n                                        <v-card-text>\n                                            <h5>Explore Metadata</h5>\n                                            <json-view :deep=\"3\"  :data=\"model.data\" />\n                                        </v-card-text>\n                                    </v-card>\n                                </div>\n                               \n                            </constrain>\n                        </v-container>\n                    </flex-column-body>\n                </slot>\n            </tab> -->\n\t\t\t\t\t\t\t\t\t\t\t\t<!-- <tab :heading=\"sheet.title\" v-for=\"sheet in sheetDefinitions\">\n                <slot>\n                    <flex-column-body style=\"background: #fafafa;\">\n                        <v-container>\n                            <wrapper xs>\n                                <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"sheet.field\" v-model=\"details\"></fluro-content-form-field>\n                            </wrapper>\n                        </v-container>\n                    </flex-column-body>\n                </slot>\n            </tab> -->\n\t\t\t\t\t\t\t\t\t\t\t\t<!-- <tab heading=\"Classification\">\n                <slot>\n                    <flex-column-body style=\"background: #fafafa;\">\n                        <v-container>\n                            <wrapper xs>\n                                <template v-if=\"contactDefinitions.length\">\n                                    <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"definitionField\" v-model=\"model\"></fluro-content-form-field>\n                                </template>\n                                <fluro-realm-select :expanded=\"true\" v-model=\"model.realms\" type=\"contact\" />\n                            </wrapper>\n                        </v-container>\n                    </flex-column-body>\n                </slot>\n            </tab> -->\n\t\t\t\t\t\t\t\t</tabset>\n\t\t\t\t\t\t\t\t<!-- <flex-column-body> -->\n\t\t\t\t\t\t\t\t<!-- <pre>{{details}}</pre> -->\n\t\t\t\t\t\t\t\t<!-- </flex-column-body> -->\n\t\t\t\t</flex-column>\n</template>\n<script>\n/////////////////////////////////\n\nimport FluroContentEditMixin from 'src/components/content/edit/FluroContentEditMixin.js';\nimport FluroContentView from 'src/components/content/view/FluroContentView.vue';\nimport FluroTaskList from 'src/components/form/tasklist/FluroTaskList.vue';\nimport ProcessDots from 'src/components/ui/ProcessDots.vue';\n\n/////////////////////////////////\n\nimport Vue from 'vue';\nimport _ from 'lodash';\n\n\nimport { mapFields } from 'vuex-map-fields';\n\n\n/////////////////////////////////\n\nexport default {\n\n\t\t\t\tprops: {\n\t\t\t\t\t\t\t\t// 'fields': {\n\t\t\t\t\t\t\t\t//     type: Array,\n\t\t\t\t\t\t\t\t//     default () {\n\n\t\t\t\t\t\t\t\t//         var array = [];\n\n\n\n\n\n\t\t\t\t\t\t\t\t//         ///////////////////////////////////\n\n\t\t\t\t\t\t\t\t//         function addField(key, details) {\n\t\t\t\t\t\t\t\t//             details.key = key;\n\t\t\t\t\t\t\t\t//             array.push(details)\n\t\t\t\t\t\t\t\t//             // // Vue.set(self.fields, key, details);\n\n\t\t\t\t\t\t\t\t//             // if (details.enabled === false) {\n\n\t\t\t\t\t\t\t\t//             // } else {\n\t\t\t\t\t\t\t\t//             //     details.enabled = true;\n\t\t\t\t\t\t\t\t//             // }\n\n\n\t\t\t\t\t\t\t\t//             // var defaultValue = self.getDefaultValue(key, details);\n\t\t\t\t\t\t\t\t//             // Vue.set(self.model, key, defaultValue);\n\t\t\t\t\t\t\t\t//         }\n\n\t\t\t\t\t\t\t\t//         //Update fields to use the default fields we set above\n\t\t\t\t\t\t\t\t//         return array;\n\t\t\t\t\t\t\t\t//     }\n\t\t\t\t\t\t\t\t// }\n\t\t\t\t},\n\n\t\t\t\tcreated() {\n\n\n\t\t\t\t\t\t\t\tif (!this.model.data) {\n\t\t\t\t\t\t\t\t\t\t\t\tthis.model.data = {};\n\t\t\t\t\t\t\t\t}\n\t\t\t\t},\n\t\t\t\tmixins: [FluroContentEditMixin],\n\t\t\t\tcomponents: {\n\t\t\t\t\t\t\t\tFluroContentView,\n\t\t\t\t\t\t\t\tFluroTaskList,\n\t\t\t\t\t\t\t\tProcessDots,\n\t\t\t\t\t\t\t\t// FluroAvatarUpdate,\n\t\t\t\t\t\t\t\t// FluroContentForm,\n\t\t\t\t\t\t\t\t// FluroRealmSelect,\n\t\t\t\t\t\t\t\t// FluroContentFormField,\n\t\t\t\t\t\t\t\t// FluroAcademicSelect,\n\t\t\t\t},\n\t\t\t\tmethods: {\n\t\t\t\t\t\t\t\tmanualLink(form) {\n\t\t\t\t\t\t\t\t\t\t\t\tconsole.log('FORM', form);\n\n\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\n\t\t\t\t\t\t\t\t\t\t\t\tself.$fluro.global.select(form.form.definitionName, { maximum: 1 })\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t.then(function(interactions) {\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tif (!interactions || !interactions.length) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvar cardID = self.$fluro.utils.getStringID(self.model);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvar interactionID = self.$fluro.utils.getStringID(interactions[0]);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvar formID = self.$fluro.utils.getStringID(form.form);\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tconsole.log('LINK', cardID, interactionID, formID)\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tself.$set(self.linking, formID, true);\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tself.$fluro.api.put(`/process/${cardID}/link`, {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tinteraction: interactionID,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdefinition: formID,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t.then(function(result) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tself.$emit('refresh');\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tself.$set(self.linking, formID, false);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t.catch(function(err) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tself.$fluro.error(err);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tself.$set(self.linking, formID, false);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t})\n\n\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tremoveTaskList(index) {\n\n\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\t\t\t\t\t\t\t\t\t\t\t\tvar lists = self.model.taskLists;\n\n\t\t\t\t\t\t\t\t\t\t\t\tself.$delete(lists, index)\n\n\t\t\t\t\t\t\t\t\t\t\t\tself.$set(self.model, 'taskLists', lists.slice());\n\t\t\t\t\t\t\t\t\t\t\t\t// self.model.taskLists = self.model.taskLists.splice(index, 1);\n\t\t\t\t\t\t\t\t\t\t\t\tself.dispatchUpdate();\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\taddTaskList() {\n\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\t\t\t\t\t\t\t\t\t\t\t\tif (!self.model.taskLists) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tself.$set(self.model, 'taskLists', []);\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t\t\tvar newList = {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tautofocus: true,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttasks: [\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t//     name: 'New Task',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t//     description: '',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t//     required: true,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t//     guid: self.$fluro.utils.guid(),\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// }\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t],\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t\t\t/////////////////////////////////////////////\n\t\t\t\t\t\t\t\t\t\t\t\t/////////////////////////////////////////////\n\n\t\t\t\t\t\t\t\t\t\t\t\tvar currentState = self.currentState;\n\n\t\t\t\t\t\t\t\t\t\t\t\tvar proposedTitle;\n\n\t\t\t\t\t\t\t\t\t\t\t\tif (currentState && currentState.title) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tproposedTitle = `${currentState.title} tasks`;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tnewList.state = currentState.key;\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t\t\t//Check if there is already a task list with this title\n\t\t\t\t\t\t\t\t\t\t\t\tvar existingList = _.find(self.model.taskLists, {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: proposedTitle,\n\t\t\t\t\t\t\t\t\t\t\t\t})\n\n\t\t\t\t\t\t\t\t\t\t\t\t//If there is no title or there is already a task list for this state\n\t\t\t\t\t\t\t\t\t\t\t\tif (!proposedTitle || !proposedTitle.length || existingList) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tproposedTitle = `${self.user.firstName}'s tasks`;\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t//Check if there is already a task list with this title\n\t\t\t\t\t\t\t\t\t\t\t\tvar existingList = _.find(self.model.taskLists, {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: proposedTitle,\n\t\t\t\t\t\t\t\t\t\t\t\t})\n\n\t\t\t\t\t\t\t\t\t\t\t\t/////////////////////////////////////////////\n\n\t\t\t\t\t\t\t\t\t\t\t\tif (existingList) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tproposedTitle = 'Additional Tasks'\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// console.log('Already exists', proposedTitle);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// return;\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t\t\t//Use our proposed title\n\t\t\t\t\t\t\t\t\t\t\t\tnewList.title = proposedTitle;\n\n\t\t\t\t\t\t\t\t\t\t\t\t/////////////////////////////////////////////\n\t\t\t\t\t\t\t\t\t\t\t\t/////////////////////////////////////////////\n\n\t\t\t\t\t\t\t\t\t\t\t\tself.model.taskLists.push(newList);\n\n\t\t\t\t\t\t\t\t\t\t\t\t// console.log('SELF MODEL', self.model)\n\t\t\t\t\t\t\t\t\t\t\t\t// self.update(self.model)\n\t\t\t\t\t\t\t\t\t\t\t\tself.dispatchUpdate();\n\n\t\t\t\t\t\t\t\t},\n\n\n\t\t\t\t\t\t\t\tresend(form) {\n\n\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\t\t\t\t\t\t\t\t\t\t\t\tvar cardID = self.$fluro.utils.getStringID(self.model);\n\t\t\t\t\t\t\t\t\t\t\t\tvar formID = self.$fluro.utils.getStringID(form.form);\n\t\t\t\t\t\t\t\t\t\t\t\tself.$set(self.resending, formID, true);\n\n\t\t\t\t\t\t\t\t\t\t\t\treturn self.$fluro.api.put(`/process/resend/${cardID}/${formID}`)\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t.then(function(res) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tself.$fluro.notify('Form was resent');\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tself.$set(self.resending, formID, false);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t.catch(function(err) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tself.$fluro.error(err);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tself.$set(self.resending, formID, false);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t})\n\n\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t// this.resending[]\n\t\t\t\t\t\t\t\t\t\t\t\t// this.$set(form, 'resending', true);\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tdispatchUpdate(newModel) {\n\t\t\t\t\t\t\t\t\t\t\t\tthis.update(this.model);\n\t\t\t\t\t\t\t\t},\n\n\t\t\t\t},\n\t\t\t\tasyncComputed: {\n\t\t\t\t\t\t\t\t// devices: {\n\t\t\t\t\t\t\t\t//     default: [],\n\t\t\t\t\t\t\t\t//     get() {\n\n\t\t\t\t\t\t\t\t//         var self = this;\n\n\n\t\t\t\t\t\t\t\t//         if (self.context != 'edit' || !self.itemID) {\n\t\t\t\t\t\t\t\t//             return Promise.resolve([]);\n\t\t\t\t\t\t\t\t//         }\n\n\t\t\t\t\t\t\t\t//         //////////////////////////////////////\n\n\t\t\t\t\t\t\t\t//         return new Promise(function(resolve, reject) {\n\n\t\t\t\t\t\t\t\t//             self.$fluro.api.get(`/contact/${self.itemID}/devices`)\n\t\t\t\t\t\t\t\t//                 .then(function(res) {\n\t\t\t\t\t\t\t\t//                     resolve(_.map(res.data, function(device) {\n\t\t\t\t\t\t\t\t//                         device.pinging = false;\n\t\t\t\t\t\t\t\t//                         return device;\n\t\t\t\t\t\t\t\t//                     }));\n\t\t\t\t\t\t\t\t//                 })\n\t\t\t\t\t\t\t\t//                 .catch(function(err) {\n\t\t\t\t\t\t\t\t//                     reject(err);\n\t\t\t\t\t\t\t\t//                 })\n\n\t\t\t\t\t\t\t\t//         })\n\t\t\t\t\t\t\t\t//     }\n\t\t\t\t\t\t\t\t// },\n\t\t\t\t},\n\t\t\t\tcomputed: {\n\t\t\t\t\t\t\t\tshowKeyContacts() {\n\n\t\t\t\t\t\t\t\t\t\t\t\tvar reference = this.model.item;\n\t\t\t\t\t\t\t\t\t\t\t\tif (reference && reference._type == 'contact') {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn (this.model.contacts && this.model.contacts.length);\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\n\t\t\t\t\t\t\t\t\t\t\t\treturn true;\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t// ...mapState('fluro', {\n\t\t\t\t\t\t\t\t//     application: state => state.application,\n\t\t\t\t\t\t\t\t//     user: state => state.user,\n\t\t\t\t\t\t\t\t// }),\n\t\t\t\t\t\t\t\t...mapFields('fluro', [\n\t\t\t\t\t\t\t\t\t\t\t\t'application', //The Fluro application and all of it's permissions and data\n\t\t\t\t\t\t\t\t\t\t\t\t'user', //The authenticated user if they log in\n\t\t\t\t\t\t\t\t]),\n\n\t\t\t\t\t\t\t\tfieldsOutput() {\n\n\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\t\t\t\t\t\t\t\t\t\t\t\tvar array = [];\n\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('title', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Title',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'string',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tplaceholder: '',\n\t\t\t\t\t\t\t\t\t\t\t\t})\n\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('contacts', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Key Contacts',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'reference',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tparams: {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\trestrictType: 'contact',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t})\n\n\n\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('dueDate', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Due Date',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'date',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdirective: 'datetime-select',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tparams: {\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t})\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('state', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Current State',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'string',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdirective: 'select',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\toptions: _.map(self.states, function(state) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tname: state.title,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue: state.key,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t\t\t\t\t})\n\n\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('assignedTo', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Assigned To',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'reference',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tparams: {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\trestrictType: 'contact',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t})\n\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\n\t\t\t\t\t\t\t\t\t\t\t\tfunction addField(key, details) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdetails.key = key;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tarray.push(details)\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t\t\t// console.log('DO THE OUTPUT!!!');\n\t\t\t\t\t\t\t\t\t\t\t\treturn array;\n\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\treferenceItemField() {\n\n\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\n\n\n\t\t\t\t\t\t\t\t\t\t\t\tvar processTypes = _.chain(this.definition)\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t.get('data.processTypes')\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t.map(function(type) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn { name: self.$fluro.types.readable(type), value: type };\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t.value();\n\n\n\t\t\t\t\t\t\t\t\t\t\t\treturn {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkey: 'item',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Referenced Item',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescription: 'Select an item to add to this process',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'reference',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// params:{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t//     restrictType\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// }\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tcurrentStateName() {\n\t\t\t\t\t\t\t\t\t\t\t\treturn this.model.state;\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tcurrentState() {\n\t\t\t\t\t\t\t\t\t\t\t\treturn _.find(this.states, { key: this.currentStateName });\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\treference() {\n\t\t\t\t\t\t\t\t\t\t\t\treturn this.model.item;\n\t\t\t\t\t\t\t\t},\n\n\t\t\t\t\t\t\t\ttitle() {\n\t\t\t\t\t\t\t\t\t\t\t\tif (this.model) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tif (this.model.title && this.model.title.length) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn this.model.title;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tif (this.model.item && this.model.item.title) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn this.model.item.title\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t\t\treturn 'New Card';\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tstates() {\n\t\t\t\t\t\t\t\t\t\t\t\treturn _.get(this.definition, 'data.states');\n\t\t\t\t\t\t\t\t\t\t\t\t// this.definition && this.definition.data ? this.definition.data.states : []\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tawaitingForms() {\n\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\n\t\t\t\t\t\t\t\t\t\t\t\treturn _.filter(self.model.forms, function(entry) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn !entry.interaction;\n\t\t\t\t\t\t\t\t\t\t\t\t})\n\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\treceivedForms() {\n\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\n\t\t\t\t\t\t\t\t\t\t\t\treturn _.filter(self.model.forms, function(entry) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn entry.interaction;\n\t\t\t\t\t\t\t\t\t\t\t\t})\n\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tshowOutline() {\n\t\t\t\t\t\t\t\t\t\t\t\treturn false; //true; //false;//true;//false;//true;\n\t\t\t\t\t\t\t\t},\n\t\t\t\t},\n\n\t\t\t\tdata() {\n\t\t\t\t\t\t\t\treturn {\n\t\t\t\t\t\t\t\t\t\t\t\tlinking: {},\n\t\t\t\t\t\t\t\t\t\t\t\tresending: {},\n\t\t\t\t\t\t\t\t}\n\t\t\t\t},\n}\n\n</script>\n<style scoped lang=\"scss\">\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n.hint {\n\t\t\t\tfont-size: 10px;\n\t\t\t\topacity: 0.5;\n\t\t\t\tcolor: inherit;\n\t\t\t\tdisplay: block;\n\n}\n\n\n.sidebar,\n.main {\n\t\t\t\tflex: 1;\n\t\t\t\t// border:2px solid pink;\n\t\t\t\toverflow: hidden;\n\t\t\t\tdisplay: flex;\n\t\t\t\tflex-direction: column;\n}\n\n.horizontal-rule {\n\t\t\t\tdisplay: block;\n\t\t\t\tborder-radius: 20px;\n\t\t\t\theight: 3px;\n\t\t\t\tbackground: rgba(#000, 0.1);\n\t\t\t\tmargin: 10px 0;\n}\n\n.sidebar {\n\n\t\t\t\tbackground: rgba(#000, 0.02);\n\n\t\t\t\t@media(min-width: 769px) {\n\t\t\t\t\t\t\t\tborder-left: 1px solid rgba(#000, 0.05);\n\t\t\t\t}\n}\n\n.bordered {\n\t\t\t\tborder: 1px solid rgba(#000, 0.1);\n\t\t\t\tbox-shadow: 0 2px 4px rgba(#000, 0.1);\n\n\t\t\t\t&>>>.tabset-menu {\n\t\t\t\t\t\t\t\tbackground: #eee;\n\t\t\t\t}\n}\n\n</style>\n","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.hint {\n  font-size: 10px;\n  opacity: 0.5;\n  color: inherit;\n  display: block;\n}\n\n.sidebar,\n.main {\n  flex: 1;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n}\n\n.horizontal-rule {\n  display: block;\n  border-radius: 20px;\n  height: 3px;\n  background: rgba(0, 0, 0, 0.1);\n  margin: 10px 0;\n}\n\n.sidebar {\n  background: rgba(0, 0, 0, 0.02);\n}\n@media (min-width: 769px) {\n  .sidebar {\n    border-left: 1px solid rgba(0, 0, 0, 0.05);\n  }\n}\n\n.bordered {\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.bordered > > > .tabset-menu {\n  background: #eee;\n}\n\n/*# sourceMappingURL=process.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-07193241";
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
//# sourceMappingURL=process-a802ac3c.js.map
