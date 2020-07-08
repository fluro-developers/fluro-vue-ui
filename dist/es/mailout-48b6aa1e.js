
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { b9 as MailoutRenderPreview, ba as MailoutTestPanel, bb as MailoutPreflightPanel, bc as MailoutResultsPanel, bm as __vue_normalize__, bn as __vue_create_injector__ } from './index-d40b6f20.js';
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
import { F as FluroContentEditMixin } from './FluroContentEditMixin-a40b42ee.js';

//

var script = {
  components: {
    MailoutRenderPreview,
    MailoutTestPanel,
    MailoutPreflightPanel,
    MailoutResultsPanel
  },
  mixins: [FluroContentEditMixin],
  methods: {
    toggleExpand(key) {
      var self = this;
      self.$set(self.expandedSettings, `_${key}`, !self.expandedSettings[`_${key}`]);
      console.log('TOGGLE', key, self.expandedSettings);
    }

  },
  computed: {
    contacts: {
      get() {
        return this.model.contacts || [];
      },

      set(array) {
        this.model.contacts = array;
      }

    },
    teams: {
      get() {
        return this.model.teams || [];
      },

      set(array) {
        this.model.teams = array;
      }

    },
    tickets: {
      get() {
        return this.model.tickets || [];
      },

      set(array) {
        this.model.tickets = array;
      }

    },
    events: {
      get() {
        return this.model.events || [];
      },

      set(array) {
        this.model.events = array;
      }

    },
    interactions: {
      get() {
        return this.model.interactions || [];
      },

      set(array) {
        this.model.interactions = array;
      }

    },
    cards: {
      get() {
        return this.model.cards || [];
      },

      set(array) {
        this.model.cards = array;
      }

    },
    checkins: {
      get() {
        return this.model.checkins || [];
      },

      set(array) {
        this.model.checkins = array;
      }

    },
    details: {
      get() {
        return this.model.details || [];
      },

      set(array) {
        this.model.details = array;
      }

    },
    families: {
      get() {
        return this.model.families || [];
      },

      set(array) {
        this.model.families = array;
      }

    },
    personas: {
      get() {
        return this.model.personas || [];
      },

      set(array) {
        this.model.personas = array;
      }

    },
    collections: {
      get() {
        return this.model.collections || [];
      },

      set(array) {
        this.model.collections = array;
      }

    },
    tags: {
      get() {
        return this.model.tags || [];
      },

      set(array) {
        this.model.tags = array;
      }

    },
    realms: {
      get() {
        return this.model.realms || [];
      },

      set(array) {
        this.model.realms = array;
      }

    },
    definitions: {
      get() {
        return this.model.definitions || [];
      },

      set(array) {
        this.model.definitions = array;
      }

    },

    resultsEnabled() {
      var self = this;

      if (self.model.state == 'sent') {
        return true;
      }

      if (self.model.stats && self.model.stats.mailoutSent) {
        return true;
      }
    },

    expanded() {
      var self = this;
      return {
        contacts: self.expandedSettings._contacts || self.model.contacts && self.model.contacts.length,
        teams: self.expandedSettings._teams || self.model.teams && self.model.teams.length,
        tickets: self.expandedSettings._tickets || self.model.tickets && self.model.tickets.length,
        events: self.expandedSettings._events || self.model.events && self.model.events.length,
        interactions: self.expandedSettings._interactions || self.model.interactions && self.model.interactions.length,
        cards: self.expandedSettings._cards || self.model.cards && self.model.cards.length,
        checkins: self.expandedSettings._checkins || self.model.checkins && self.model.checkins.length,
        details: self.expandedSettings._details || self.model.details && self.model.details.length,
        families: self.expandedSettings._families || self.model.families && self.model.families.length,
        personas: self.expandedSettings._personas || self.model.personas && self.model.personas.length,
        collections: self.expandedSettings._collections || self.model.collections && self.model.collections.length,
        tags: self.expandedSettings._tags || self.model.tags && self.model.tags.length,
        realms: self.expandedSettings._realms || self.model.realms && self.model.realms.length,
        definitions: self.expandedSettings._definitions || self.model.definitions && self.model.definitions.length,
        query: self.expandedSettings._query || self.model.query
      };
    },

    mailoutType() {
      return this.model.mailoutType;
    },

    user() {
      return this.$fluro.auth.getCurrentUser();
    },

    fieldsOutput() {
      var self = this;
      var array = []; ///////////////////////////////////

      addField('title', {
        title: 'Title',
        minimum: 1,
        maximum: 1,
        type: 'string',
        placeholder: 'Eg. My awesome new email'
      });
      addField('subject', {
        title: 'Subject',
        description: 'Text to be shown in the subject of the email',
        minimum: 1,
        maximum: 1,
        type: 'string',
        placeholder: 'Eg. My awesome new email',
        expressions: {
          defaultValue() {
            return self.model.title;
          } // : 'data.title',


        }
      });
      addField('fromEmail', {
        title: 'From / Sender Email Address',
        description: 'Email address this mailout will be sent from, and replies will be sent to',
        minimum: 1,
        maximum: 1,
        type: 'string',
        placeholder: `Eg. ${this.user.email}`,
        defaultValues: [`${this.user.email}`]
      });
      addField('fromFirstName', {
        title: 'Sender First Name',
        minimum: 1,
        maximum: 1,
        type: 'string',
        placeholder: `Eg. ${this.user.firstName}`,
        defaultValues: [`${this.user.firstName}`]
      });
      addField('fromLastName', {
        title: 'Sender Last Name',
        minimum: 1,
        maximum: 1,
        type: 'string',
        placeholder: `Eg. ${this.user.lastName}`,
        defaultValues: [`${this.user.lastName}`]
      });
      addField('mailoutType', {
        title: 'Mailout Type',
        minimum: 1,
        maximum: 1,
        type: 'string',
        directive: 'select',
        defaultValues: ['promotional'],
        options: [{
          name: 'Promotional',
          value: 'promotional'
        }, {
          name: 'Transactional',
          value: 'transactional'
        }]
      }); //////////////////////////////////////////////////////

      addField('contacts', {
        title: 'Select contacts',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        params: {
          restrictType: 'contact'
        }
      });
      addField('teams', {
        title: 'Select Groups/Teams',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        params: {
          restrictType: 'team'
        }
      });
      addField('tickets', {
        title: 'Select tickets',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        params: {
          restrictType: 'ticket'
        }
      }); ///////////////////////////////////////
      ///////////////////////////////////////
      ///////////////////////////////////////

      addField('events', {
        title: 'Select events',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        params: {
          restrictType: 'event'
        }
      });
      addField('data', {
        type: 'group',
        minimum: 1,
        maximum: 1,
        asObject: true,
        fields: [{
          key: 'eventCheckins',
          title: 'Send to people who have checked in',
          description: 'Send mailout to any contacts checked in to these events',
          minimum: 0,
          maximum: 1,
          type: 'boolean'
        }, {
          key: 'eventTickets',
          title: 'Send to people who have a ticket',
          description: 'Send mailout to any contacts that have a registered ticket for these events',
          minimum: 0,
          maximum: 1,
          type: 'boolean'
        }, {
          key: 'eventAssignments',
          title: 'Send to people who are rostered on to this event',
          description: 'Send mailout to any contacts that have been rostered/assigned to these events',
          minimum: 0,
          maximum: 1,
          type: 'boolean'
        }]
      }); ///////////////////////////////////////
      ///////////////////////////////////////
      ///////////////////////////////////////

      addField('interactions', {
        title: 'Select interactions',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        params: {
          restrictType: 'interaction'
        }
      });
      addField('cards', {
        title: 'Select Process Cards',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        params: {
          restrictType: 'process'
        }
      });
      addField('checkins', {
        title: 'Select Checkins',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        params: {
          restrictType: 'checkin'
        }
      });
      addField('families', {
        title: 'Select Households',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        params: {
          restrictType: 'family'
        }
      });
      addField('collections', {
        title: 'Select Collections',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        params: {
          restrictType: 'collection'
        }
      });
      addField('tags', {
        title: 'Select Tags',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        params: {
          restrictType: 'tag'
        }
      });
      addField('realms', {
        title: 'Select Realms',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        directive: 'realm-select',
        params: {
          restrictType: 'realm'
        }
      });
      addField('details', {
        title: 'Select Detail Sheet',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        params: {
          restrictType: 'contactdetail'
        }
      });
      addField('personas', {
        title: 'Select User Personas',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        params: {
          restrictType: 'persona'
        }
      });
      addField('query', {
        title: 'Select Query',
        minimum: 0,
        maximum: 1,
        type: 'reference',
        params: {
          restrictType: 'query',
          allDefinitions: true
        }
      }); // // console.log('TYPE OPTIONS', self.typeOptions);
      // addField('filterType', {
      //     title: 'Type',
      //     minimum: 0,
      //     maximum: 1,
      //     type: 'string',
      //     directive: 'select',
      //     description: 'The type of item you want to return from this query',
      //     options: self.typeOptions,
      // })
      ///////////////////////////////////

      function addField(key, details) {
        details.key = key;
        array.push(details);
      } // console.log('DO THE OUTPUT!!!');


      return array;
    }

  },

  data() {
    return {
      expandedSettings: {
        _contacts: false,
        _teams: false,
        _events: false,
        _tickets: false
      },
      editorOptions: {
        editor: {
          tokens: [{
            title: 'Recipient Preferred First Name',
            key: 'firstName'
          }, {
            title: 'Recipient Last Name',
            key: 'lastName'
          }, {
            title: 'Sender/From First Name',
            key: 'mailout.fromFirstName'
          }, {
            title: 'Sender/From Last Name',
            key: 'mailout.fromLastName'
          }, {
            title: 'Sender/From Email Address',
            key: 'mailout.fromEmail'
          }, {
            title: 'Account Title',
            key: 'mailout.account.title'
          }, {
            title: 'Account Timezone',
            key: 'mailout.account.timezone'
          }, {
            title: 'Subject',
            key: 'mailout.subject'
          }, {
            title: 'Send Date',
            key: 'date'
          }]
        }
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
        : [
            _c(
              "tabset",
              { attrs: { justified: true, vertical: true } },
              [
                _vm.model.state != "sent"
                  ? [
                      _c(
                        "tab",
                        { attrs: { heading: "Basic Details" } },
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
                                      _c("h3", { attrs: { margin: "" } }, [
                                        _vm._v("Mailout Basics")
                                      ]),
                                      _vm._v(" "),
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
                                          field: _vm.fieldHash.subject
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
                                      _c(
                                        "fluro-panel",
                                        [
                                          _c("fluro-panel-title", [
                                            _c("strong", [
                                              _vm._v("Sender Details")
                                            ])
                                          ]),
                                          _vm._v(" "),
                                          _c(
                                            "fluro-panel-body",
                                            [
                                              _c("fluro-content-form-field", {
                                                attrs: {
                                                  "form-fields": _vm.formFields,
                                                  outline: _vm.showOutline,
                                                  options: _vm.options,
                                                  field: _vm.fieldHash.fromEmail
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
                                              _c(
                                                "v-layout",
                                                [
                                                  _c(
                                                    "v-flex",
                                                    {
                                                      attrs: {
                                                        xs12: "",
                                                        sm6: ""
                                                      }
                                                    },
                                                    [
                                                      _c(
                                                        "fluro-content-form-field",
                                                        {
                                                          attrs: {
                                                            "form-fields":
                                                              _vm.formFields,
                                                            outline:
                                                              _vm.showOutline,
                                                            options:
                                                              _vm.options,
                                                            field:
                                                              _vm.fieldHash
                                                                .fromFirstName
                                                          },
                                                          on: {
                                                            input: _vm.update
                                                          },
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
                                                    ],
                                                    1
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "v-flex",
                                                    {
                                                      attrs: {
                                                        xs12: "",
                                                        sm6: ""
                                                      }
                                                    },
                                                    [
                                                      _c(
                                                        "fluro-content-form-field",
                                                        {
                                                          attrs: {
                                                            "form-fields":
                                                              _vm.formFields,
                                                            outline:
                                                              _vm.showOutline,
                                                            options:
                                                              _vm.options,
                                                            field:
                                                              _vm.fieldHash
                                                                .fromLastName
                                                          },
                                                          on: {
                                                            input: _vm.update
                                                          },
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
                                      _c("fluro-content-form-field", {
                                        attrs: {
                                          "form-fields": _vm.formFields,
                                          outline: _vm.showOutline,
                                          options: _vm.options,
                                          field: _vm.fieldHash.mailoutType
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
                                      _vm.mailoutType == "promotional"
                                        ? _c(
                                            "fluro-card",
                                            [
                                              _c("fluro-card-body", [
                                                _c("h6", [
                                                  _vm._v(
                                                    "\n                                            Promotional Mode\n                                        "
                                                  )
                                                ]),
                                                _vm._v(
                                                  "\n                                        Default mailout type. Useful for promoting / letting people know of an event, service or product. Promotional emails will not send to selected contacts if they have unsubscribed.\n                                    "
                                                )
                                              ])
                                            ],
                                            1
                                          )
                                        : _vm._e(),
                                      _vm._v(" "),
                                      _vm.mailoutType == "transactional"
                                        ? _c(
                                            "fluro-card",
                                            [
                                              _c("fluro-card-body", [
                                                _c("h6", [
                                                  _vm._v(
                                                    "\n                                            Transactional Mode\n                                        "
                                                  )
                                                ]),
                                                _vm._v(
                                                  "\n                                        It is entirely up to you to adhere to international email spam laws and to only send transactional mail as appropriate.\n                                        Transactional emails will send to selected contacts even if they have previously unsubscribed from your emails.\n                                    "
                                                )
                                              ])
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
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _vm.definition
                        ? _c(
                            "tab",
                            {
                              attrs: {
                                heading: _vm.definition.title + " Fields"
                              }
                            },
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
                                          _c("h3", { attrs: { margin: "" } }, [
                                            _vm._v(
                                              _vm._s(_vm.definition.title) +
                                                " Fields"
                                            )
                                          ]),
                                          _vm._v(" "),
                                          _c("fluro-content-form", {
                                            attrs: {
                                              options: _vm.editorOptions,
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
                            ],
                            1
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _c(
                        "tab",
                        { attrs: { heading: "Recipients" } },
                        [
                          _c(
                            "flex-column-body",
                            { staticStyle: { background: "#fafafa" } },
                            [
                              _c(
                                "v-container",
                                { staticClass: "mailout-recipients" },
                                [
                                  _c(
                                    "constrain",
                                    { attrs: { sm: "" } },
                                    [
                                      _c("h3", { attrs: { margin: "" } }, [
                                        _vm._v("Recipients")
                                      ]),
                                      _vm._v(" "),
                                      _c(
                                        "fluro-panel",
                                        [
                                          _c(
                                            "fluro-panel-title",
                                            {
                                              class: {
                                                collapsed: !_vm.expanded
                                                  .contacts
                                              },
                                              nativeOn: {
                                                click: function($event) {
                                                  return _vm.toggleExpand(
                                                    "contacts"
                                                  )
                                                }
                                              }
                                            },
                                            [
                                              _c(
                                                "v-layout",
                                                {
                                                  attrs: { "align-center": "" }
                                                },
                                                [
                                                  _c("v-flex", [
                                                    _c("h6", [
                                                      _vm._v(
                                                        _vm._s(
                                                          _vm.contacts.length
                                                        ) + " Contacts"
                                                      )
                                                    ])
                                                  ]),
                                                  _vm._v(" "),
                                                  _c(
                                                    "v-flex",
                                                    { attrs: { shrink: "" } },
                                                    [
                                                      _c("fluro-icon", {
                                                        staticClass: "chevron",
                                                        attrs: {
                                                          icon: "angle-down"
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
                                          _vm.expanded.contacts
                                            ? _c(
                                                "fluro-panel-body",
                                                [
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
                                                          _vm.fieldHash.contacts
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
                                                ],
                                                1
                                              )
                                            : _vm._e()
                                        ],
                                        1
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "fluro-panel",
                                        [
                                          _c(
                                            "fluro-panel-title",
                                            {
                                              class: {
                                                collapsed: !_vm.expanded.teams
                                              },
                                              nativeOn: {
                                                click: function($event) {
                                                  return _vm.toggleExpand(
                                                    "teams"
                                                  )
                                                }
                                              }
                                            },
                                            [
                                              _c(
                                                "v-layout",
                                                {
                                                  attrs: { "align-center": "" }
                                                },
                                                [
                                                  _c("v-flex", [
                                                    _c("h6", [
                                                      _vm._v(
                                                        _vm._s(
                                                          _vm.teams.length
                                                        ) + " Groups and Teams"
                                                      )
                                                    ])
                                                  ]),
                                                  _vm._v(" "),
                                                  _c(
                                                    "v-flex",
                                                    { attrs: { shrink: "" } },
                                                    [
                                                      _c("fluro-icon", {
                                                        staticClass: "chevron",
                                                        attrs: {
                                                          icon: "angle-down"
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
                                          _vm.expanded.teams
                                            ? _c(
                                                "fluro-panel-body",
                                                [
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
                                                          _vm.fieldHash.teams
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
                                                ],
                                                1
                                              )
                                            : _vm._e()
                                        ],
                                        1
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "fluro-panel",
                                        [
                                          _c(
                                            "fluro-panel-title",
                                            {
                                              class: {
                                                collapsed: !_vm.expanded.tickets
                                              },
                                              nativeOn: {
                                                click: function($event) {
                                                  return _vm.toggleExpand(
                                                    "tickets"
                                                  )
                                                }
                                              }
                                            },
                                            [
                                              _c(
                                                "v-layout",
                                                {
                                                  attrs: { "align-center": "" }
                                                },
                                                [
                                                  _c("v-flex", [
                                                    _c("h6", [
                                                      _vm._v(
                                                        _vm._s(
                                                          _vm.tickets.length
                                                        ) + " Tickets"
                                                      )
                                                    ])
                                                  ]),
                                                  _vm._v(" "),
                                                  _c(
                                                    "v-flex",
                                                    { attrs: { shrink: "" } },
                                                    [
                                                      _c("fluro-icon", {
                                                        staticClass: "chevron",
                                                        attrs: {
                                                          icon: "angle-down"
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
                                          _vm.expanded.tickets
                                            ? _c(
                                                "fluro-panel-body",
                                                [
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
                                                          _vm.fieldHash.tickets
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
                                                ],
                                                1
                                              )
                                            : _vm._e()
                                        ],
                                        1
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "fluro-panel",
                                        [
                                          _c(
                                            "fluro-panel-title",
                                            {
                                              class: {
                                                collapsed: !_vm.expanded.events
                                              },
                                              nativeOn: {
                                                click: function($event) {
                                                  return _vm.toggleExpand(
                                                    "events"
                                                  )
                                                }
                                              }
                                            },
                                            [
                                              _c(
                                                "v-layout",
                                                {
                                                  attrs: { "align-center": "" }
                                                },
                                                [
                                                  _c("v-flex", [
                                                    _c("h6", [
                                                      _vm._v(
                                                        _vm._s(
                                                          _vm.events.length
                                                        ) + " Events"
                                                      )
                                                    ])
                                                  ]),
                                                  _vm._v(" "),
                                                  _c(
                                                    "v-flex",
                                                    { attrs: { shrink: "" } },
                                                    [
                                                      _c("fluro-icon", {
                                                        staticClass: "chevron",
                                                        attrs: {
                                                          icon: "angle-down"
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
                                          _vm.expanded.events
                                            ? _c(
                                                "fluro-panel-body",
                                                [
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
                                                          _vm.fieldHash.data
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
                                                  ),
                                                  _vm._v(" "),
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
                                                          _vm.fieldHash.events
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
                                                ],
                                                1
                                              )
                                            : _vm._e()
                                        ],
                                        1
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "fluro-panel",
                                        [
                                          _c(
                                            "fluro-panel-title",
                                            {
                                              class: {
                                                collapsed: !_vm.expanded
                                                  .interactions
                                              },
                                              nativeOn: {
                                                click: function($event) {
                                                  return _vm.toggleExpand(
                                                    "interactions"
                                                  )
                                                }
                                              }
                                            },
                                            [
                                              _c(
                                                "v-layout",
                                                {
                                                  attrs: { "align-center": "" }
                                                },
                                                [
                                                  _c("v-flex", [
                                                    _c("h6", [
                                                      _vm._v(
                                                        _vm._s(
                                                          _vm.interactions
                                                            .length
                                                        ) + " Interactions"
                                                      )
                                                    ])
                                                  ]),
                                                  _vm._v(" "),
                                                  _c(
                                                    "v-flex",
                                                    { attrs: { shrink: "" } },
                                                    [
                                                      _c("fluro-icon", {
                                                        staticClass: "chevron",
                                                        attrs: {
                                                          icon: "angle-down"
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
                                          _vm.expanded.interactions
                                            ? _c(
                                                "fluro-panel-body",
                                                [
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
                                                            .interactions
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
                                                ],
                                                1
                                              )
                                            : _vm._e()
                                        ],
                                        1
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "fluro-panel",
                                        [
                                          _c(
                                            "fluro-panel-title",
                                            {
                                              class: {
                                                collapsed: !_vm.expanded
                                                  .checkins
                                              },
                                              nativeOn: {
                                                click: function($event) {
                                                  return _vm.toggleExpand(
                                                    "checkins"
                                                  )
                                                }
                                              }
                                            },
                                            [
                                              _c(
                                                "v-layout",
                                                {
                                                  attrs: { "align-center": "" }
                                                },
                                                [
                                                  _c("v-flex", [
                                                    _c("h6", [
                                                      _vm._v(
                                                        _vm._s(
                                                          _vm.checkins.length
                                                        ) + " Checkins"
                                                      )
                                                    ])
                                                  ]),
                                                  _vm._v(" "),
                                                  _c(
                                                    "v-flex",
                                                    { attrs: { shrink: "" } },
                                                    [
                                                      _c("fluro-icon", {
                                                        staticClass: "chevron",
                                                        attrs: {
                                                          icon: "angle-down"
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
                                          _vm.expanded.checkins
                                            ? _c(
                                                "fluro-panel-body",
                                                [
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
                                                          _vm.fieldHash.checkins
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
                                                ],
                                                1
                                              )
                                            : _vm._e()
                                        ],
                                        1
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "fluro-panel",
                                        [
                                          _c(
                                            "fluro-panel-title",
                                            {
                                              class: {
                                                collapsed: !_vm.expanded.details
                                              },
                                              nativeOn: {
                                                click: function($event) {
                                                  return _vm.toggleExpand(
                                                    "details"
                                                  )
                                                }
                                              }
                                            },
                                            [
                                              _c(
                                                "v-layout",
                                                {
                                                  attrs: { "align-center": "" }
                                                },
                                                [
                                                  _c("v-flex", [
                                                    _c("h6", [
                                                      _vm._v(
                                                        _vm._s(
                                                          _vm.details.length
                                                        ) + " Detail Sheets"
                                                      )
                                                    ])
                                                  ]),
                                                  _vm._v(" "),
                                                  _c(
                                                    "v-flex",
                                                    { attrs: { shrink: "" } },
                                                    [
                                                      _c("fluro-icon", {
                                                        staticClass: "chevron",
                                                        attrs: {
                                                          icon: "angle-down"
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
                                          _vm.expanded.details
                                            ? _c(
                                                "fluro-panel-body",
                                                [
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
                                                          _vm.fieldHash.details
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
                                                ],
                                                1
                                              )
                                            : _vm._e()
                                        ],
                                        1
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "fluro-panel",
                                        [
                                          _c(
                                            "fluro-panel-title",
                                            {
                                              class: {
                                                collapsed: !_vm.expanded
                                                  .families
                                              },
                                              nativeOn: {
                                                click: function($event) {
                                                  return _vm.toggleExpand(
                                                    "families"
                                                  )
                                                }
                                              }
                                            },
                                            [
                                              _c(
                                                "v-layout",
                                                {
                                                  attrs: { "align-center": "" }
                                                },
                                                [
                                                  _c("v-flex", [
                                                    _c("h6", [
                                                      _vm._v(
                                                        _vm._s(
                                                          _vm.families.length
                                                        ) + " Households"
                                                      )
                                                    ])
                                                  ]),
                                                  _vm._v(" "),
                                                  _c(
                                                    "v-flex",
                                                    { attrs: { shrink: "" } },
                                                    [
                                                      _c("fluro-icon", {
                                                        staticClass: "chevron",
                                                        attrs: {
                                                          icon: "angle-down"
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
                                          _vm.expanded.families
                                            ? _c(
                                                "fluro-panel-body",
                                                [
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
                                                          _vm.fieldHash.families
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
                                                ],
                                                1
                                              )
                                            : _vm._e()
                                        ],
                                        1
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "fluro-panel",
                                        [
                                          _c(
                                            "fluro-panel-title",
                                            {
                                              class: {
                                                collapsed: !_vm.expanded
                                                  .personas
                                              },
                                              nativeOn: {
                                                click: function($event) {
                                                  return _vm.toggleExpand(
                                                    "personas"
                                                  )
                                                }
                                              }
                                            },
                                            [
                                              _c(
                                                "v-layout",
                                                {
                                                  attrs: { "align-center": "" }
                                                },
                                                [
                                                  _c("v-flex", [
                                                    _c("h6", [
                                                      _vm._v(
                                                        _vm._s(
                                                          _vm.personas.length
                                                        ) + " User Personas"
                                                      )
                                                    ])
                                                  ]),
                                                  _vm._v(" "),
                                                  _c(
                                                    "v-flex",
                                                    { attrs: { shrink: "" } },
                                                    [
                                                      _c("fluro-icon", {
                                                        staticClass: "chevron",
                                                        attrs: {
                                                          icon: "angle-down"
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
                                          _vm.expanded.personas
                                            ? _c(
                                                "fluro-panel-body",
                                                [
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
                                                          _vm.fieldHash.personas
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
                                                ],
                                                1
                                              )
                                            : _vm._e()
                                        ],
                                        1
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "fluro-panel",
                                        [
                                          _c(
                                            "fluro-panel-title",
                                            {
                                              class: {
                                                collapsed: !_vm.expanded
                                                  .collections
                                              },
                                              nativeOn: {
                                                click: function($event) {
                                                  return _vm.toggleExpand(
                                                    "collections"
                                                  )
                                                }
                                              }
                                            },
                                            [
                                              _c(
                                                "v-layout",
                                                {
                                                  attrs: { "align-center": "" }
                                                },
                                                [
                                                  _c("v-flex", [
                                                    _c("h6", [
                                                      _vm._v(
                                                        _vm._s(
                                                          _vm.collections.length
                                                        ) + " Collections"
                                                      )
                                                    ])
                                                  ]),
                                                  _vm._v(" "),
                                                  _c(
                                                    "v-flex",
                                                    { attrs: { shrink: "" } },
                                                    [
                                                      _c("fluro-icon", {
                                                        staticClass: "chevron",
                                                        attrs: {
                                                          icon: "angle-down"
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
                                          _vm.expanded.collections
                                            ? _c(
                                                "fluro-panel-body",
                                                [
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
                                                            .collections
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
                                                ],
                                                1
                                              )
                                            : _vm._e()
                                        ],
                                        1
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "fluro-panel",
                                        [
                                          _c(
                                            "fluro-panel-title",
                                            {
                                              class: {
                                                collapsed: !_vm.expanded.tags
                                              },
                                              nativeOn: {
                                                click: function($event) {
                                                  return _vm.toggleExpand(
                                                    "tags"
                                                  )
                                                }
                                              }
                                            },
                                            [
                                              _c(
                                                "v-layout",
                                                {
                                                  attrs: { "align-center": "" }
                                                },
                                                [
                                                  _c("v-flex", [
                                                    _c("h6", [
                                                      _vm._v(
                                                        _vm._s(
                                                          _vm.tags.length
                                                        ) + " Tags"
                                                      )
                                                    ])
                                                  ]),
                                                  _vm._v(" "),
                                                  _c(
                                                    "v-flex",
                                                    { attrs: { shrink: "" } },
                                                    [
                                                      _c("fluro-icon", {
                                                        staticClass: "chevron",
                                                        attrs: {
                                                          icon: "angle-down"
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
                                          _vm.expanded.tags
                                            ? _c(
                                                "fluro-panel-body",
                                                [
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
                                                          _vm.fieldHash.tags
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
                                                ],
                                                1
                                              )
                                            : _vm._e()
                                        ],
                                        1
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "fluro-panel",
                                        [
                                          _c(
                                            "fluro-panel-title",
                                            {
                                              class: {
                                                collapsed: !_vm.expanded.realms
                                              },
                                              nativeOn: {
                                                click: function($event) {
                                                  return _vm.toggleExpand(
                                                    "realms"
                                                  )
                                                }
                                              }
                                            },
                                            [
                                              _c(
                                                "v-layout",
                                                {
                                                  attrs: { "align-center": "" }
                                                },
                                                [
                                                  _c("v-flex", [
                                                    _c("h6", [
                                                      _vm._v(
                                                        _vm._s(
                                                          _vm.realms.length
                                                        ) + " Realms"
                                                      )
                                                    ])
                                                  ]),
                                                  _vm._v(" "),
                                                  _c(
                                                    "v-flex",
                                                    { attrs: { shrink: "" } },
                                                    [
                                                      _c("fluro-icon", {
                                                        staticClass: "chevron",
                                                        attrs: {
                                                          icon: "angle-down"
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
                                          _vm.expanded.realms
                                            ? _c(
                                                "fluro-panel-body",
                                                [
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
                                                          _vm.fieldHash.realms
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
                                                ],
                                                1
                                              )
                                            : _vm._e()
                                        ],
                                        1
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "fluro-panel",
                                        [
                                          _c(
                                            "fluro-panel-title",
                                            {
                                              class: {
                                                collapsed: !_vm.expanded.cards
                                              },
                                              nativeOn: {
                                                click: function($event) {
                                                  return _vm.toggleExpand(
                                                    "cards"
                                                  )
                                                }
                                              }
                                            },
                                            [
                                              _c(
                                                "v-layout",
                                                {
                                                  attrs: { "align-center": "" }
                                                },
                                                [
                                                  _c("v-flex", [
                                                    _c("h6", [
                                                      _vm._v(
                                                        _vm._s(
                                                          _vm.cards.length
                                                        ) + " Process Cards"
                                                      )
                                                    ])
                                                  ]),
                                                  _vm._v(" "),
                                                  _c(
                                                    "v-flex",
                                                    { attrs: { shrink: "" } },
                                                    [
                                                      _c("fluro-icon", {
                                                        staticClass: "chevron",
                                                        attrs: {
                                                          icon: "angle-down"
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
                                          _vm.expanded.cards
                                            ? _c(
                                                "fluro-panel-body",
                                                [
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
                                                          _vm.fieldHash.cards
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
                                                ],
                                                1
                                              )
                                            : _vm._e()
                                        ],
                                        1
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "fluro-panel",
                                        [
                                          _c(
                                            "fluro-panel-title",
                                            {
                                              class: {
                                                collapsed: !_vm.expanded.query
                                              },
                                              nativeOn: {
                                                click: function($event) {
                                                  return _vm.toggleExpand(
                                                    "query"
                                                  )
                                                }
                                              }
                                            },
                                            [
                                              _c(
                                                "v-layout",
                                                {
                                                  attrs: { "align-center": "" }
                                                },
                                                [
                                                  _c("v-flex", [
                                                    _c("h6", [
                                                      _vm._v(
                                                        "Contacts matching query"
                                                      )
                                                    ])
                                                  ]),
                                                  _vm._v(" "),
                                                  _c(
                                                    "v-flex",
                                                    { attrs: { shrink: "" } },
                                                    [
                                                      _c("fluro-icon", {
                                                        staticClass: "chevron",
                                                        attrs: {
                                                          icon: "angle-down"
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
                                          _vm.expanded.query
                                            ? _c(
                                                "fluro-panel-body",
                                                [
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
                                                          _vm.fieldHash.query
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
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ]
                  : _vm._e(),
                _vm._v(" "),
                _vm.model._id && _vm.definition
                  ? [
                      _c("tab", { attrs: { heading: "Preview" } }),
                      _vm._v(" "),
                      _vm.model.state != "sent"
                        ? _c(
                            "tab",
                            { attrs: { heading: "Testing" } },
                            [
                              _c("mailout-test-panel", {
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
                      _vm.model.state != "sent"
                        ? _c(
                            "tab",
                            { attrs: { heading: "Send and Publish" } },
                            [
                              _c("mailout-preflight-panel", {
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
                      _vm.resultsEnabled
                        ? _c(
                            "tab",
                            { attrs: { heading: "Results" } },
                            [
                              _c("mailout-results-panel", {
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
                    ]
                  : _vm._e()
              ],
              2
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
    inject("data-v-4db93f72_0", { source: "/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.mailout-recipients .collapsed {\n  color: rgba(0, 0, 0, 0.4);\n}\n.mailout-recipients .collapsed .chevron {\n  transition: all 0.3s;\n  transform: rotate(-90deg);\n}\n\n/*# sourceMappingURL=mailout.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/edit/panels/mailout.vue","mailout.vue"],"names":[],"mappings":"AA63BA,GAAA;AAYA;EACA,yCAAA;ACv4BA;AD04BA;EACA,2CAAA;ACv4BA;AD04BA;EACA,4CAAA;ACv4BA;AD04BA;EACA,0CAAA;ACv4BA;;AD+4BA,GAAA;AAEA;EACA,yBAAA;AC74BA;AD+4BA;EACA,oBAAA;EACA,yBAAA;AC74BA;;AAEA,sCAAsC","file":"mailout.vue","sourcesContent":["<template>\n    <flex-column>\n        <template v-if=\"loading\">\n            <fluro-page-preloader contain />\n        </template>\n        <template v-else>\n            <tabset :justified=\"true\" :vertical=\"true\">\n                <template v-if=\"model.state != 'sent'\">\n                    <tab heading=\"Basic Details\">\n                        <flex-column-body style=\"background: #fafafa;\">\n                            <v-container>\n                                <constrain sm>\n                                    <h3 margin>Mailout Basics</h3>\n                                    <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.title\" v-model=\"model\"></fluro-content-form-field>\n                                    <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.subject\" v-model=\"model\"></fluro-content-form-field>\n                                    <fluro-panel>\n                                        <fluro-panel-title>\n                                            <strong>Sender Details</strong>\n                                        </fluro-panel-title>\n                                        <fluro-panel-body>\n                                            <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.fromEmail\" v-model=\"model\"></fluro-content-form-field>\n                                            <v-layout>\n                                                <v-flex xs12 sm6>\n                                                    <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.fromFirstName\" v-model=\"model\"></fluro-content-form-field>\n                                                </v-flex>\n                                                <v-flex xs12 sm6>\n                                                    <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.fromLastName\" v-model=\"model\"></fluro-content-form-field>\n                                                </v-flex>\n                                            </v-layout>\n                                        </fluro-panel-body>\n                                    </fluro-panel>\n                                    <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.mailoutType\" v-model=\"model\"></fluro-content-form-field>\n                                    <fluro-card v-if=\"mailoutType == 'promotional'\">\n                                        <fluro-card-body>\n                                            <h6>\n                                                Promotional Mode\n                                            </h6>\n                                            Default mailout type. Useful for promoting / letting people know of an event, service or product. Promotional emails will not send to selected contacts if they have unsubscribed.\n                                        </fluro-card-body>\n                                    </fluro-card>\n                                    <fluro-card v-if=\"mailoutType == 'transactional'\">\n                                        <fluro-card-body>\n                                            <h6>\n                                                Transactional Mode\n                                            </h6>\n                                            It is entirely up to you to adhere to international email spam laws and to only send transactional mail as appropriate.\n                                            Transactional emails will send to selected contacts even if they have previously unsubscribed from your emails.\n                                        </fluro-card-body>\n                                    </fluro-card>\n                                </constrain>\n                            </v-container>\n                        </flex-column-body>\n                    </tab>\n                    <tab :heading=\"`${definition.title} Fields`\" v-if=\"definition\">\n                        <flex-column-body style=\"background: #fafafa;\">\n                            <v-container>\n                                <constrain sm>\n                                    <h3 margin>{{definition.title}} Fields</h3>\n                                    <fluro-content-form :options=\"editorOptions\" v-model=\"model.data\" :fields=\"definition.fields\" />\n                                </constrain>\n                            </v-container>\n                        </flex-column-body>\n                    </tab>\n                    <tab heading=\"Recipients\">\n                        <flex-column-body style=\"background: #fafafa;\">\n                            <v-container class=\"mailout-recipients\">\n                                <constrain sm>\n                                    <h3 margin>Recipients</h3>\n                                    <fluro-panel>\n                                        <fluro-panel-title :class=\"{collapsed:!expanded.contacts}\" @click.native=\"toggleExpand('contacts')\">\n                                            <v-layout align-center>\n                                                <v-flex>\n                                                    <h6>{{contacts.length}} Contacts</h6>\n                                                </v-flex>\n                                                <v-flex shrink>\n                                                    <fluro-icon icon=\"angle-down\" class=\"chevron\" />\n                                                </v-flex>\n                                            </v-layout>\n                                        </fluro-panel-title>\n                                        <fluro-panel-body v-if=\"expanded.contacts\">\n                                            <!-- <div class=\"sm muted\">Select individual contacts to send this mailout to</div> -->\n                                            <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.contacts\" v-model=\"model\"></fluro-content-form-field>\n                                        </fluro-panel-body>\n                                    </fluro-panel>\n                                    <fluro-panel>\n                                        <fluro-panel-title :class=\"{collapsed:!expanded.teams}\" @click.native=\"toggleExpand('teams')\">\n                                            <v-layout align-center>\n                                                <v-flex>\n                                                    <h6>{{teams.length}} Groups and Teams</h6>\n                                                </v-flex>\n                                                <v-flex shrink>\n                                                    <fluro-icon icon=\"angle-down\" class=\"chevron\" />\n                                                </v-flex>\n                                            </v-layout>\n                                        </fluro-panel-title>\n                                        <fluro-panel-body v-if=\"expanded.teams\">\n                                            <!-- <div class=\"sm muted\">Select groups and teams to send this mailout to</div> -->\n                                            <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.teams\" v-model=\"model\"></fluro-content-form-field>\n                                        </fluro-panel-body>\n                                    </fluro-panel>\n                                    <fluro-panel>\n                                        <fluro-panel-title :class=\"{collapsed:!expanded.tickets}\" @click.native=\"toggleExpand('tickets')\">\n                                            <v-layout align-center>\n                                                <v-flex>\n                                                    <h6>{{tickets.length}} Tickets</h6>\n                                                </v-flex>\n                                                <v-flex shrink>\n                                                    <fluro-icon icon=\"angle-down\" class=\"chevron\" />\n                                                </v-flex>\n                                            </v-layout>\n                                        </fluro-panel-title>\n                                        <fluro-panel-body v-if=\"expanded.tickets\">\n                                            <!-- <div class=\"sm muted\">Select ticketed contacts to send this mailout to</div> -->\n                                            <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.tickets\" v-model=\"model\"></fluro-content-form-field>\n                                        </fluro-panel-body>\n                                    </fluro-panel>\n                                    <fluro-panel>\n                                        <fluro-panel-title :class=\"{collapsed:!expanded.events}\" @click.native=\"toggleExpand('events')\">\n                                            <v-layout align-center>\n                                                <v-flex>\n                                                    <h6>{{events.length}} Events</h6>\n                                                </v-flex>\n                                                <v-flex shrink>\n                                                    <fluro-icon icon=\"angle-down\" class=\"chevron\" />\n                                                </v-flex>\n                                            </v-layout>\n                                        </fluro-panel-title>\n                                        <fluro-panel-body v-if=\"expanded.events\">\n                                            <!-- <div class=\"sm muted\">Send to contacts at specific events</div> -->\n                                            <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.data\" v-model=\"model\"></fluro-content-form-field>\n                                            <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.events\" v-model=\"model\"></fluro-content-form-field>\n                                        </fluro-panel-body>\n                                    </fluro-panel>\n                                    <fluro-panel>\n                                        <fluro-panel-title :class=\"{collapsed:!expanded.interactions}\" @click.native=\"toggleExpand('interactions')\">\n                                            <v-layout align-center>\n                                                <v-flex>\n                                                    <h6>{{interactions.length}} Interactions</h6>\n                                                </v-flex>\n                                                <v-flex shrink>\n                                                    <fluro-icon icon=\"angle-down\" class=\"chevron\" />\n                                                </v-flex>\n                                            </v-layout>\n                                        </fluro-panel-title>\n                                        <fluro-panel-body v-if=\"expanded.interactions\">\n                                            <!-- <div class=\"sm muted\">Send to contacts at specific events</div> -->\n                                            <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.interactions\" v-model=\"model\"></fluro-content-form-field>\n                                        </fluro-panel-body>\n                                    </fluro-panel>\n                                    <fluro-panel>\n                                        <fluro-panel-title :class=\"{collapsed:!expanded.checkins}\" @click.native=\"toggleExpand('checkins')\">\n                                            <v-layout align-center>\n                                                <v-flex>\n                                                    <h6>{{checkins.length}} Checkins</h6>\n                                                </v-flex>\n                                                <v-flex shrink>\n                                                    <fluro-icon icon=\"angle-down\" class=\"chevron\" />\n                                                </v-flex>\n                                            </v-layout>\n                                        </fluro-panel-title>\n                                        <fluro-panel-body v-if=\"expanded.checkins\">\n                                            <!-- <div class=\"sm muted\">Send to contacts at specific events</div> -->\n                                            <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.checkins\" v-model=\"model\"></fluro-content-form-field>\n                                        </fluro-panel-body>\n                                    </fluro-panel>\n                                    <fluro-panel>\n                                        <fluro-panel-title :class=\"{collapsed:!expanded.details}\" @click.native=\"toggleExpand('details')\">\n                                            <v-layout align-center>\n                                                <v-flex>\n                                                    <h6>{{details.length}} Detail Sheets</h6>\n                                                </v-flex>\n                                                <v-flex shrink>\n                                                    <fluro-icon icon=\"angle-down\" class=\"chevron\" />\n                                                </v-flex>\n                                            </v-layout>\n                                        </fluro-panel-title>\n                                        <fluro-panel-body v-if=\"expanded.details\">\n                                            <!-- <div class=\"sm muted\">Send to contacts at specific events</div> -->\n                                            <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.details\" v-model=\"model\"></fluro-content-form-field>\n                                        </fluro-panel-body>\n                                    </fluro-panel>\n                                    <fluro-panel>\n                                        <fluro-panel-title :class=\"{collapsed:!expanded.families}\" @click.native=\"toggleExpand('families')\">\n                                            <v-layout align-center>\n                                                <v-flex>\n                                                    <h6>{{families.length}} Households</h6>\n                                                </v-flex>\n                                                <v-flex shrink>\n                                                    <fluro-icon icon=\"angle-down\" class=\"chevron\" />\n                                                </v-flex>\n                                            </v-layout>\n                                        </fluro-panel-title>\n                                        <fluro-panel-body v-if=\"expanded.families\">\n                                            <!-- <div class=\"sm muted\">Send to contacts at specific events</div> -->\n                                            <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.families\" v-model=\"model\"></fluro-content-form-field>\n                                        </fluro-panel-body>\n                                    </fluro-panel>\n                                    <fluro-panel>\n                                        <fluro-panel-title :class=\"{collapsed:!expanded.personas}\" @click.native=\"toggleExpand('personas')\">\n                                            <v-layout align-center>\n                                                <v-flex>\n                                                    <h6>{{personas.length}} User Personas</h6>\n                                                </v-flex>\n                                                <v-flex shrink>\n                                                    <fluro-icon icon=\"angle-down\" class=\"chevron\" />\n                                                </v-flex>\n                                            </v-layout>\n                                        </fluro-panel-title>\n                                        <fluro-panel-body v-if=\"expanded.personas\">\n                                            <!-- <div class=\"sm muted\">Send to contacts at specific events</div> -->\n                                            <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.personas\" v-model=\"model\"></fluro-content-form-field>\n                                        </fluro-panel-body>\n                                    </fluro-panel>\n                                    <fluro-panel>\n                                        <fluro-panel-title :class=\"{collapsed:!expanded.collections}\" @click.native=\"toggleExpand('collections')\">\n                                            <v-layout align-center>\n                                                <v-flex>\n                                                    <h6>{{collections.length}} Collections</h6>\n                                                </v-flex>\n                                                <v-flex shrink>\n                                                    <fluro-icon icon=\"angle-down\" class=\"chevron\" />\n                                                </v-flex>\n                                            </v-layout>\n                                        </fluro-panel-title>\n                                        <fluro-panel-body v-if=\"expanded.collections\">\n                                            <!-- <div class=\"sm muted\">Send to contacts at specific events</div> -->\n                                            <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.collections\" v-model=\"model\"></fluro-content-form-field>\n                                        </fluro-panel-body>\n                                    </fluro-panel>\n                                    <fluro-panel>\n                                        <fluro-panel-title :class=\"{collapsed:!expanded.tags}\" @click.native=\"toggleExpand('tags')\">\n                                            <v-layout align-center>\n                                                <v-flex>\n                                                    <h6>{{tags.length}} Tags</h6>\n                                                </v-flex>\n                                                <v-flex shrink>\n                                                    <fluro-icon icon=\"angle-down\" class=\"chevron\" />\n                                                </v-flex>\n                                            </v-layout>\n                                        </fluro-panel-title>\n                                        <fluro-panel-body v-if=\"expanded.tags\">\n                                            <!-- <div class=\"sm muted\">Send to contacts at specific events</div> -->\n                                            <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.tags\" v-model=\"model\"></fluro-content-form-field>\n                                        </fluro-panel-body>\n                                    </fluro-panel>\n                                    <fluro-panel>\n                                        <fluro-panel-title :class=\"{collapsed:!expanded.realms}\" @click.native=\"toggleExpand('realms')\">\n                                            <v-layout align-center>\n                                                <v-flex>\n                                                    <h6>{{realms.length}} Realms</h6>\n                                                </v-flex>\n                                                <v-flex shrink>\n                                                    <fluro-icon icon=\"angle-down\" class=\"chevron\" />\n                                                </v-flex>\n                                            </v-layout>\n                                        </fluro-panel-title>\n                                        <fluro-panel-body v-if=\"expanded.realms\">\n                                            <!-- <div class=\"sm muted\">Send to contacts at specific events</div> -->\n                                            <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.realms\" v-model=\"model\"></fluro-content-form-field>\n                                        </fluro-panel-body>\n                                    </fluro-panel>\n                                    <!-- <fluro-panel>\n                                    <fluro-panel-title :class=\"{collapsed:!expanded.definitions}\" @click.native=\"toggleExpand('definitions')\">\n                                        <v-layout align-center>\n                                            <v-flex>\n                                            <h6>{{model.definitions.length}} Definitions</h6>\n                                           \n                                            </v-flex>\n                                            <v-flex shrink>\n                                                <fluro-icon icon=\"angle-down\" class=\"chevron\"/>\n                                            </v-flex>\n                                        </v-layout>\n                                    </fluro-panel-title>\n                                    <fluro-panel-body v-if=\"expanded.definitions\">\n                                        <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.definitions\" v-model=\"model\"></fluro-content-form-field>\n                                    </fluro-panel-body>\n                                </fluro-panel> -->\n                                    <fluro-panel>\n                                        <fluro-panel-title :class=\"{collapsed:!expanded.cards}\" @click.native=\"toggleExpand('cards')\">\n                                            <v-layout align-center>\n                                                <v-flex>\n                                                    <h6>{{cards.length}} Process Cards</h6>\n                                                </v-flex>\n                                                <v-flex shrink>\n                                                    <fluro-icon icon=\"angle-down\" class=\"chevron\" />\n                                                </v-flex>\n                                            </v-layout>\n                                        </fluro-panel-title>\n                                        <fluro-panel-body v-if=\"expanded.cards\">\n                                            <!-- <div class=\"sm muted\">Send to contacts at specific events</div> -->\n                                            <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.cards\" v-model=\"model\"></fluro-content-form-field>\n                                        </fluro-panel-body>\n                                    </fluro-panel>\n                                    <fluro-panel>\n                                        <fluro-panel-title :class=\"{collapsed:!expanded.query}\" @click.native=\"toggleExpand('query')\">\n                                            <v-layout align-center>\n                                                <v-flex>\n                                                    <h6>Contacts matching query</h6>\n                                                </v-flex>\n                                                <v-flex shrink>\n                                                    <fluro-icon icon=\"angle-down\" class=\"chevron\" />\n                                                </v-flex>\n                                            </v-layout>\n                                        </fluro-panel-title>\n                                        <fluro-panel-body v-if=\"expanded.query\">\n                                            <!-- <div class=\"sm muted\">Send to contacts at specific events</div> -->\n                                            <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.query\" v-model=\"model\"></fluro-content-form-field>\n                                        </fluro-panel-body>\n                                    </fluro-panel>\n                                </constrain>\n                            </v-container>\n                        </flex-column-body>\n                    </tab>\n                </template>\n                <template v-if=\"model._id && definition\">\n                    <tab heading=\"Preview\">\n\n                        <!-- <mailout-render-preview :mailout=\"model._id\" :definition=\"definition.definitionName\" /> -->\n                    </tab>\n                    <tab heading=\"Testing\" v-if=\"model.state != 'sent'\">\n                        <mailout-test-panel v-model=\"model\" />\n                    </tab>\n                    <tab heading=\"Send and Publish\" v-if=\"model.state != 'sent'\">\n                        <mailout-preflight-panel v-model=\"model\" />\n                    </tab>\n                    <tab heading=\"Results\" v-if=\"resultsEnabled\">\n                        <mailout-results-panel v-model=\"model\" />\n                    </tab>\n                </template>\n            </tabset>\n        </template>\n        <!-- <flex-column-body> -->\n        <!-- <pre>{{model}}</pre> -->\n        <!-- </flex-column-body> -->\n        <!-- <flex-column-body> -->\n        <!-- WOOOT -->\n        <!-- <tabset v-else :justified=\"true\" :vertical=\"true\">\n            <tab heading=\"Basic Details\">\n                <slot>\n                    <flex-column-body style=\"background: #fafafa;\">\n                    </flex-column-body>\n                </slot>\n            </tab>\n        </tabset> -->\n    </flex-column>\n</template>\n<script>\n/////////////////////////////////\n/////////////////////////////////\n\nimport Vue from 'vue';\n\n/////////////////////////////////\n\nimport MailoutRenderPreview from 'src/components/mailout/MailoutRenderPreview.vue';\nimport MailoutResultsPanel from 'src/components/mailout/MailoutResultsPanel.vue';\nimport MailoutPreflightPanel from 'src/components/mailout/MailoutPreflightPanel.vue';\nimport MailoutTestPanel from 'src/components/mailout/MailoutTestPanel.vue';\nimport FluroContentEditMixin from 'src/components/content/edit/FluroContentEditMixin.js';\n\n\n/////////////////////////////////\n\nexport default {\n\n\n    components: {\n        MailoutRenderPreview,\n        MailoutTestPanel,\n        MailoutPreflightPanel,\n        MailoutResultsPanel,\n    },\n    mixins: [FluroContentEditMixin],\n    methods: {\n        toggleExpand(key) {\n            var self = this;\n            self.$set(self.expandedSettings, `_${key}`, !self.expandedSettings[`_${key}`]);\n\n\n            console.log('TOGGLE', key, self.expandedSettings);\n        },\n    },\n    computed: {\n    \tcontacts:{\n    \t\tget() {\n    \t\t\treturn this.model.contacts || [];\n    \t\t},\n    \t\tset(array) {\n    \t\t\tthis.model.contacts = array;\n    \t\t}\n    \t},\n    \tteams:{\n    \t\tget() {\n    \t\t\treturn this.model.teams || [];\n    \t\t},\n    \t\tset(array) {\n    \t\t\tthis.model.teams = array;\n    \t\t}\n    \t},\n    \ttickets:{\n    \t\tget() {\n    \t\t\treturn this.model.tickets || [];\n    \t\t},\n    \t\tset(array) {\n    \t\t\tthis.model.tickets = array;\n    \t\t}\n    \t},\n    \tevents:{\n    \t\tget() {\n    \t\t\treturn this.model.events || [];\n    \t\t},\n    \t\tset(array) {\n    \t\t\tthis.model.events = array;\n    \t\t}\n    \t},\n    \tinteractions:{\n    \t\tget() {\n    \t\t\treturn this.model.interactions || [];\n    \t\t},\n    \t\tset(array) {\n    \t\t\tthis.model.interactions = array;\n    \t\t}\n    \t},\n    \tcards:{\n    \t\tget() {\n    \t\t\treturn this.model.cards || [];\n    \t\t},\n    \t\tset(array) {\n    \t\t\tthis.model.cards = array;\n    \t\t}\n    \t},\n    \tcheckins:{\n    \t\tget() {\n    \t\t\treturn this.model.checkins || [];\n    \t\t},\n    \t\tset(array) {\n    \t\t\tthis.model.checkins = array;\n    \t\t}\n    \t},\n    \tdetails:{\n    \t\tget() {\n    \t\t\treturn this.model.details || [];\n    \t\t},\n    \t\tset(array) {\n    \t\t\tthis.model.details = array;\n    \t\t}\n    \t},\n    \tfamilies:{\n    \t\tget() {\n    \t\t\treturn this.model.families || [];\n    \t\t},\n    \t\tset(array) {\n    \t\t\tthis.model.families = array;\n    \t\t}\n    \t},\n    \tpersonas:{\n    \t\tget() {\n    \t\t\treturn this.model.personas || [];\n    \t\t},\n    \t\tset(array) {\n    \t\t\tthis.model.personas = array;\n    \t\t}\n    \t},\n\n    \tcollections:{\n    \t\tget() {\n    \t\t\treturn this.model.collections || [];\n    \t\t},\n    \t\tset(array) {\n    \t\t\tthis.model.collections = array;\n    \t\t}\n    \t},\n\n    \ttags:{\n    \t\tget() {\n    \t\t\treturn this.model.tags || [];\n    \t\t},\n    \t\tset(array) {\n    \t\t\tthis.model.tags = array;\n    \t\t}\n    \t},\n\n    \trealms:{\n    \t\tget() {\n    \t\t\treturn this.model.realms || [];\n    \t\t},\n    \t\tset(array) {\n    \t\t\tthis.model.realms = array;\n    \t\t}\n    \t},\n\n    \tdefinitions:{\n    \t\tget() {\n    \t\t\treturn this.model.definitions || [];\n    \t\t},\n    \t\tset(array) {\n    \t\t\tthis.model.definitions = array;\n    \t\t}\n    \t},\n        resultsEnabled() {\n\n            var self = this;\n\n            if (self.model.state == 'sent') {\n                return true;\n            }\n\n            if (self.model.stats && self.model.stats.mailoutSent) {\n                return true;\n            }\n        },\n        expanded() {\n            var self = this;\n\n            return {\n                contacts: self.expandedSettings._contacts || (self.model.contacts && self.model.contacts.length),\n                teams: self.expandedSettings._teams || (self.model.teams && self.model.teams.length),\n                tickets: self.expandedSettings._tickets || (self.model.tickets && self.model.tickets.length),\n                events: self.expandedSettings._events || (self.model.events && self.model.events.length),\n                interactions: self.expandedSettings._interactions || (self.model.interactions && self.model.interactions.length),\n                cards: self.expandedSettings._cards || (self.model.cards && self.model.cards.length),\n                checkins: self.expandedSettings._checkins || (self.model.checkins && self.model.checkins.length),\n                details: self.expandedSettings._details || (self.model.details && self.model.details.length),\n                families: self.expandedSettings._families || (self.model.families && self.model.families.length),\n                personas: self.expandedSettings._personas || (self.model.personas && self.model.personas.length),\n                collections: self.expandedSettings._collections || (self.model.collections && self.model.collections.length),\n                tags: self.expandedSettings._tags || (self.model.tags && self.model.tags.length),\n                realms: self.expandedSettings._realms || (self.model.realms && self.model.realms.length),\n                definitions: self.expandedSettings._definitions || (self.model.definitions && self.model.definitions.length),\n                query: self.expandedSettings._query || (self.model.query),\n            }\n        },\n        mailoutType() {\n            return this.model.mailoutType;\n        },\n        user() {\n            return this.$fluro.auth.getCurrentUser();\n        },\n        fieldsOutput() {\n\n\n            var self = this;\n            var array = [];\n\n            ///////////////////////////////////\n\n            addField('title', {\n                title: 'Title',\n                minimum: 1,\n                maximum: 1,\n                type: 'string',\n                placeholder: 'Eg. My awesome new email',\n            })\n\n            addField('subject', {\n                title: 'Subject',\n                description: 'Text to be shown in the subject of the email',\n                minimum: 1,\n                maximum: 1,\n                type: 'string',\n                placeholder: 'Eg. My awesome new email',\n                expressions: {\n                    defaultValue() {\n                            return self.model.title;\n                    }\n                    // : 'data.title',\n                }\n            })\n\n\n            addField('fromEmail', {\n                title: 'From / Sender Email Address',\n                description: 'Email address this mailout will be sent from, and replies will be sent to',\n                minimum: 1,\n                maximum: 1,\n                type: 'string',\n                placeholder: `Eg. ${this.user.email}`,\n                defaultValues: [`${this.user.email}`],\n            })\n\n            addField('fromFirstName', {\n                title: 'Sender First Name',\n                minimum: 1,\n                maximum: 1,\n                type: 'string',\n                placeholder: `Eg. ${this.user.firstName}`,\n                defaultValues: [`${this.user.firstName}`],\n            })\n\n            addField('fromLastName', {\n                title: 'Sender Last Name',\n                minimum: 1,\n                maximum: 1,\n                type: 'string',\n                placeholder: `Eg. ${this.user.lastName}`,\n                defaultValues: [`${this.user.lastName}`],\n            })\n\n\n            addField('mailoutType', {\n                title: 'Mailout Type',\n                minimum: 1,\n                maximum: 1,\n                type: 'string',\n                directive: 'select',\n                defaultValues: ['promotional'],\n                options: [{\n                        name: 'Promotional',\n                        value: 'promotional',\n                    },\n                    {\n                        name: 'Transactional',\n                        value: 'transactional',\n                    },\n                ]\n            })\n\n\n\n            //////////////////////////////////////////////////////\n\n            addField('contacts', {\n                title: 'Select contacts',\n                minimum: 0,\n                maximum: 0,\n                type: 'reference',\n                params: {\n                    restrictType: 'contact',\n                },\n            })\n\n            addField('teams', {\n                title: 'Select Groups/Teams',\n                minimum: 0,\n                maximum: 0,\n                type: 'reference',\n                params: {\n                    restrictType: 'team',\n                },\n            })\n\n            addField('tickets', {\n                title: 'Select tickets',\n                minimum: 0,\n                maximum: 0,\n                type: 'reference',\n                params: {\n                    restrictType: 'ticket',\n                },\n            })\n\n            ///////////////////////////////////////\n            ///////////////////////////////////////\n            ///////////////////////////////////////\n\n            addField('events', {\n                title: 'Select events',\n                minimum: 0,\n                maximum: 0,\n                type: 'reference',\n                params: {\n                    restrictType: 'event',\n                },\n            })\n\n            addField('data', {\n                type: 'group',\n                minimum: 1,\n                maximum: 1,\n                asObject: true,\n                fields: [{\n                        key: 'eventCheckins',\n                        title: 'Send to people who have checked in',\n                        description: 'Send mailout to any contacts checked in to these events',\n                        minimum: 0,\n                        maximum: 1,\n                        type: 'boolean',\n                    },\n                    {\n                        key: 'eventTickets',\n                        title: 'Send to people who have a ticket',\n                        description: 'Send mailout to any contacts that have a registered ticket for these events',\n                        minimum: 0,\n                        maximum: 1,\n                        type: 'boolean',\n                    },\n                    {\n                        key: 'eventAssignments',\n                        title: 'Send to people who are rostered on to this event',\n                        description: 'Send mailout to any contacts that have been rostered/assigned to these events',\n                        minimum: 0,\n                        maximum: 1,\n                        type: 'boolean',\n                    },\n\n                ]\n            })\n\n            ///////////////////////////////////////\n            ///////////////////////////////////////\n            ///////////////////////////////////////\n\n\n            addField('interactions', {\n                title: 'Select interactions',\n                minimum: 0,\n                maximum: 0,\n                type: 'reference',\n                params: {\n                    restrictType: 'interaction',\n                },\n            })\n\n            addField('cards', {\n                title: 'Select Process Cards',\n                minimum: 0,\n                maximum: 0,\n                type: 'reference',\n                params: {\n                    restrictType: 'process',\n                },\n            })\n\n            addField('checkins', {\n                title: 'Select Checkins',\n                minimum: 0,\n                maximum: 0,\n                type: 'reference',\n                params: {\n                    restrictType: 'checkin',\n                },\n            })\n\n            addField('families', {\n                title: 'Select Households',\n                minimum: 0,\n                maximum: 0,\n                type: 'reference',\n                params: {\n                    restrictType: 'family',\n                },\n            })\n\n            addField('collections', {\n                title: 'Select Collections',\n                minimum: 0,\n                maximum: 0,\n                type: 'reference',\n                params: {\n                    restrictType: 'collection',\n                },\n            })\n\n            addField('tags', {\n                title: 'Select Tags',\n                minimum: 0,\n                maximum: 0,\n                type: 'reference',\n                params: {\n                    restrictType: 'tag',\n                },\n            })\n\n            addField('realms', {\n                title: 'Select Realms',\n                minimum: 0,\n                maximum: 0,\n                type: 'reference',\n                directive: 'realm-select',\n                params: {\n                    restrictType: 'realm',\n                },\n            })\n\n            addField('details', {\n                title: 'Select Detail Sheet',\n                minimum: 0,\n                maximum: 0,\n                type: 'reference',\n                params: {\n                    restrictType: 'contactdetail',\n                },\n            })\n\n            addField('personas', {\n                title: 'Select User Personas',\n                minimum: 0,\n                maximum: 0,\n                type: 'reference',\n                params: {\n                    restrictType: 'persona',\n                },\n            })\n\n            addField('query', {\n                title: 'Select Query',\n                minimum: 0,\n                maximum: 1,\n                type: 'reference',\n                params: {\n                    restrictType: 'query',\n                    allDefinitions: true,\n                },\n            })\n\n\n\n\n            // // console.log('TYPE OPTIONS', self.typeOptions);\n\n\n\n            // addField('filterType', {\n            //     title: 'Type',\n            //     minimum: 0,\n            //     maximum: 1,\n            //     type: 'string',\n            //     directive: 'select',\n            //     description: 'The type of item you want to return from this query',\n            //     options: self.typeOptions,\n            // })\n\n            ///////////////////////////////////\n\n            function addField(key, details) {\n                details.key = key;\n                array.push(details)\n            }\n\n            // console.log('DO THE OUTPUT!!!');\n            return array;\n\n        },\n    },\n    data() {\n        return {\n            expandedSettings: {\n                _contacts: false,\n                _teams: false,\n                _events: false,\n                _tickets: false,\n            },\n            editorOptions: {\n                editor: {\n                    tokens: [{\n                            title: 'Recipient Preferred First Name',\n                            key: 'firstName',\n                        },\n                        {\n                            title: 'Recipient Last Name',\n                            key: 'lastName',\n                        },\n                        {\n                            title: 'Sender/From First Name',\n                            key: 'mailout.fromFirstName',\n                        },\n                        {\n                            title: 'Sender/From Last Name',\n                            key: 'mailout.fromLastName',\n                        },\n                        {\n                            title: 'Sender/From Email Address',\n                            key: 'mailout.fromEmail',\n                        },\n\n                        {\n                            title: 'Account Title',\n                            key: 'mailout.account.title',\n                        },\n\n                        {\n                            title: 'Account Timezone',\n                            key: 'mailout.account.timezone',\n                        },\n\n                        {\n                            title: 'Subject',\n                            key: 'mailout.subject',\n                        },\n\n                        {\n                            title: 'Send Date',\n                            key: 'date',\n                        },\n                    ]\n                },\n            },\n        }\n    },\n}\n</script>\n<style lang=\"scss\">\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n.mailout-recipients {\n    .collapsed {\n        color: rgba(#000, 0.4);\n\n        .chevron {\n            transition: all 0.3s;\n            transform: rotate(-90deg);\n        }\n    }\n}\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.mailout-recipients .collapsed {\n  color: rgba(0, 0, 0, 0.4);\n}\n.mailout-recipients .collapsed .chevron {\n  transition: all 0.3s;\n  transform: rotate(-90deg);\n}\n\n/*# sourceMappingURL=mailout.vue.map */"]}, media: undefined });

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
//# sourceMappingURL=mailout-48b6aa1e.js.map
