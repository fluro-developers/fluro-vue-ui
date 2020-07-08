
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { bm as __vue_normalize__, bn as __vue_create_injector__ } from './index-08bf4449.js';
import 'vue-range-slider';
import 'vue-range-slider/dist/vue-range-slider.css';
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
import { F as FluroContentEditMixin } from './FluroContentEditMixin-9aabe45e.js';

//

var script = {
  mixins: [FluroContentEditMixin],
  components: {},

  created() {
  },

  asyncComputed: {},
  computed: {
    askDOB() {
      return _.get(this.definition, 'data.askDOB') || _.get(this.definition, 'data.requireDOB') || this.model._dob;
    },

    fieldsOutput() {
      var self = this;
      var array = [];
      var fields = [{
        title: 'Names',
        type: 'group',
        key: 'names',
        sameLine: true,
        fields: [{
          title: 'First Name',
          key: '_firstName',
          minimum: 0,
          maximum: 1,
          type: 'string'
        }, {
          title: 'Last Name',
          key: '_lastName',
          minimum: 0,
          maximum: 1,
          type: 'string'
        }]
      }, {
        title: 'Extras',
        type: 'group',
        key: 'extras',
        sameLine: true,
        fields: [{
          title: 'Gender',
          key: '_gender',
          minimum: 0,
          maximum: 1,
          type: 'string',
          directive: 'select',
          options: [{
            name: 'Male',
            value: 'male'
          }, {
            name: 'Female',
            value: 'female'
          }, {
            name: 'Unknown',
            value: 'unknown'
          }]
        }, {
          title: 'Date of Birth',
          key: '_dob',
          minimum: 0,
          maximum: 1,
          type: 'date',
          directive: 'datepicker',
          expressions: {
            show() {
              return self.askDOB;
            }

          }
        }]
      }, {
        title: 'Communication',
        type: 'group',
        key: 'communication',
        sameLine: true,
        fields: [{
          title: 'Email Address',
          key: '_email',
          minimum: 0,
          maximum: 1,
          type: 'email'
        }, {
          title: 'Phone Number',
          key: '_phoneNumber',
          minimum: 0,
          maximum: 1,
          type: 'string'
        }]
      }];
      addField('rawData', {
        minimum: 1,
        maximum: 1,
        asObject: true,
        type: 'group',
        fields: [{
          title: 'Contact Details',
          type: 'group',
          key: 'contactDetails',
          expressions: {
            show: `!data.contact && !data.contacts.length`
          },
          fields
        }]
      }); ///////////////////////////////////

      addField('contact', {
        title: 'Primary Contact',
        description: 'The primary contact for this interaction',
        minimum: 0,
        maximum: 1,
        type: 'reference',
        params: {
          restrictType: 'contact',
          allDefinitions: true
        }
      });
      addField('contacts', {
        title: 'Linked Contacts',
        description: 'All contacts referenced for this interaction',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        params: {
          restrictType: 'contact',
          allDefinitions: true
        }
      });
      addField('event', {
        title: 'Linked Event',
        description: 'Attach this interaction to a specific event',
        minimum: 0,
        maximum: 1,
        type: 'reference',
        params: {
          restrictType: 'event',
          allDefinitions: true
        }
      }); ///////////////////////////////////

      addField('emails', {
        type: 'group',
        sameLine: true,
        fields: [{
          title: 'Primary Email Address',
          key: 'primaryEmail',
          description: 'The primary email address relevant to this interaction',
          minimum: 0,
          maximum: 1,
          type: 'email'
        }, {
          title: 'Transaction Email Address',
          key: 'transactionEmail',
          description: 'The primary email address relevant to this interaction',
          minimum: 0,
          maximum: 1,
          type: 'email',
          expressions: {
            defaultValue: `data.primaryEmail`
          }
        }]
      });

      function addField(key, details) {
        details.key = key;
        array.push(details);
      }

      return array;
    }

  },

  data() {
    return {};
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
            { attrs: { justified: true, vertical: true } },
            [
              _c(
                "tab",
                [
                  _c(
                    "flex-column-body",
                    { staticStyle: { background: "#fafafa" } },
                    [
                      _c(
                        "v-container",
                        { attrs: { "grid-list-xl": "" } },
                        [
                          _c(
                            "constrain",
                            { attrs: { sm: "" } },
                            [
                              _c("fluro-content-form", {
                                attrs: {
                                  options: _vm.options,
                                  fields: _vm.fieldsOutput
                                },
                                scopedSlots: _vm._u([
                                  {
                                    key: "form",
                                    fn: function(ref) {
                                      var formFields = ref.formFields;
                                      var fieldHash = ref.fieldHash;
                                      var model = ref.model;
                                      var update = ref.update;
                                      var options = ref.options;
                                      return [
                                        !model.contact &&
                                        (!model.contacts ||
                                          !model.contacts.length)
                                          ? _c(
                                              "fluro-panel",
                                              [
                                                _c("fluro-panel-title", [
                                                  _vm._v(
                                                    "\n\t\t\t\t\t\t\t\t\t\tContact Information\n\t\t\t\t\t\t\t\t\t"
                                                  )
                                                ]),
                                                _vm._v(" "),
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
                                                            fieldHash.rawData
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
                                                  "fluro-panel-body",
                                                  { staticClass: "border-top" },
                                                  [
                                                    _c(
                                                      "fluro-content-form-field",
                                                      {
                                                        attrs: {
                                                          "form-fields": formFields,
                                                          options: options,
                                                          field:
                                                            fieldHash.contact
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
                                          : [
                                              _c("fluro-content-form-field", {
                                                attrs: {
                                                  "form-fields": formFields,
                                                  options: options,
                                                  field: fieldHash.contact
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
                                                  field: fieldHash.contacts
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
                                        _vm._v(" "),
                                        _c("fluro-content-form-field", {
                                          attrs: {
                                            "form-fields": formFields,
                                            options: options,
                                            field: fieldHash.event
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
                                            field: fieldHash.emails
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
                                ]),
                                model: {
                                  value: _vm.model,
                                  callback: function($$v) {
                                    _vm.model = $$v;
                                  },
                                  expression: "model"
                                }
                              }),
                              _vm._v(" "),
                              _vm.definition.fields &&
                              _vm.definition.fields.length
                                ? _c(
                                    "fluro-panel",
                                    [
                                      _c(
                                        "tabset",
                                        { attrs: { justified: true } },
                                        [
                                          _c(
                                            "tab",
                                            {
                                              attrs: {
                                                heading: "Submitted Data"
                                              }
                                            },
                                            [
                                              _c(
                                                "fluro-panel-body",
                                                {
                                                  staticClass: "border-bottom"
                                                },
                                                [
                                                  _vm._v(
                                                    "\n\t\t\t\t\t\t\t\t  This is the data that was provided at the time of submission. \n\t\t\t\t\t\t\t\t "
                                                  )
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "fluro-panel-body",
                                                [
                                                  _c("fluro-content-form", {
                                                    attrs: {
                                                      options: _vm.options,
                                                      context: "raw",
                                                      fields:
                                                        _vm.definition.fields
                                                    },
                                                    model: {
                                                      value: _vm.model.rawData,
                                                      callback: function($$v) {
                                                        _vm.$set(
                                                          _vm.model,
                                                          "rawData",
                                                          $$v
                                                        );
                                                      },
                                                      expression:
                                                        "model.rawData"
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
                                            "tab",
                                            {
                                              attrs: {
                                                heading: "Computed Data"
                                              }
                                            },
                                            [
                                              _c(
                                                "fluro-panel-body",
                                                {
                                                  staticClass: "border-bottom"
                                                },
                                                [
                                                  _vm._v(
                                                    "\n\t\t\t\t\t\t\t\t  This is the data after it has been processed by the system. Your form may have content that is transformed into dynamic links to other content in the database, eg. contacts, families etc\n\t\t\t\t\t\t\t\t "
                                                  )
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "fluro-panel-body",
                                                [
                                                  _c("fluro-content-form", {
                                                    attrs: {
                                                      options: _vm.options,
                                                      fields:
                                                        _vm.definition.fields
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
    inject("data-v-09d5ff64_0", { source: "/**/\n.border-top[data-v-09d5ff64] {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right[data-v-09d5ff64] {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom[data-v-09d5ff64] {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left[data-v-09d5ff64] {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.hint[data-v-09d5ff64] {\n  font-size: 10px;\n  opacity: 0.5;\n  color: inherit;\n  display: block;\n}\n\n/*# sourceMappingURL=interaction.vue.map */", map: {"version":3,"sources":["C:\\Users\\User\\Documents\\fluro\\fluro-vue-ui\\src\\components\\content\\edit\\panels\\interaction.vue","interaction.vue"],"names":[],"mappings":"AAgSA,GAAA;AAYA;EACA,yCAAA;AC1SA;AD6SA;EACA,2CAAA;AC1SA;AD6SA;EACA,4CAAA;AC1SA;AD6SA;EACA,0CAAA;AC1SA;;ADkTA,GAAA;AACA;EACA,eAAA;EACA,YAAA;EACA,cAAA;EACA,cAAA;AC/SA;;AAEA,0CAA0C","file":"interaction.vue","sourcesContent":["<template>\n\t<flex-column>\n\t\t<template v-if=\"loading\">\n\t\t\t<fluro-page-preloader contain />\n\t\t</template>\n\t\t<tabset v-else :justified=\"true\" :vertical=\"true\">\n\t\t\t<tab>\n\t\t\t\t<flex-column-body style=\"background: #fafafa;\">\n\t\t\t\t\t<v-container grid-list-xl>\n\t\t\t\t\t\t<constrain sm>\n\t\t\t\t\t\t\t<fluro-content-form :options=\"options\" v-model=\"model\" :fields=\"fieldsOutput\">\n\t\t\t\t\t\t\t\t<template v-slot:form=\"{formFields, fieldHash, model, update, options}\">\n\t\t\t\t\t\t\t\t\t<fluro-panel v-if=\"!model.contact && (!model.contacts || !model.contacts.length)\">\n\t\t\t\t\t\t\t\t\t\t<fluro-panel-title>\n\t\t\t\t\t\t\t\t\t\t\tContact Information\n\t\t\t\t\t\t\t\t\t\t</fluro-panel-title>\n\t\t\t\t\t\t\t\t\t\t<fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.rawData\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t</fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t<fluro-panel-body class=\"border-top\">\n\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.contact\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t</fluro-panel-body>\n\t\t\t\t\t\t\t\t\t</fluro-panel>\n\t\t\t\t\t\t\t\t\t<template v-else>\n\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.contact\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.contacts\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.event\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.emails\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t</fluro-content-form>\n\t\t\t\t\t\t\t<fluro-panel v-if=\"definition.fields && definition.fields.length\">\n\t\t\t\t\t\t\t\t<tabset :justified=\"true\">\n\t\t\t\t\t\t\t\t\t<tab heading=\"Submitted Data\">\n\t\t\t\t\t\t\t\t\t <fluro-panel-body class=\"border-bottom\">\n\t\t\t\t\t\t\t\t\t  This is the data that was provided at the time of submission. \n\t\t\t\t\t\t\t\t\t </fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t<fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form :options=\"options\" context=\"raw\" v-model=\"model.rawData\" :fields=\"definition.fields\" />\n\t\t\t\t\t\t\t\t\t\t</fluro-panel-body>\n\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t\t<tab heading=\"Computed Data\">\n\t\t\t\t\t\t\t\t\t <fluro-panel-body class=\"border-bottom\">\n\t\t\t\t\t\t\t\t\t  This is the data after it has been processed by the system. Your form may have content that is transformed into dynamic links to other content in the database, eg. contacts, families etc\n\t\t\t\t\t\t\t\t\t </fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t<fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form :options=\"options\" v-model=\"model.data\" :fields=\"definition.fields\" />\n\t\t\t\t\t\t\t\t\t\t</fluro-panel-body>\n\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t</tabset>\n\t\t\t\t\t\t\t</fluro-panel>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t</constrain>\n\t\t\t\t\t</v-container>\n\t\t\t\t</flex-column-body>\n\t\t\t</tab>\n\t\t</tabset>\n\t</flex-column>\n</template>\n<script>\n/////////////////////////////////\n\nimport FluroContentEditMixin from 'src/components/content/edit/FluroContentEditMixin.js';\n\n\n/////////////////////////////////\n\nimport Vue from 'vue';\n\n/////////////////////////////////\n\nexport default {\n\n\n\tmixins: [FluroContentEditMixin],\n\tcomponents: {},\n\tcreated() {\n\t\tvar self = this;\n\t},\n\tasyncComputed: {\n\n\t},\n\tcomputed: {\n\t\taskDOB() {\n\t\t\treturn _.get(this.definition, 'data.askDOB') || _.get(this.definition, 'data.requireDOB') || this.model._dob;\n\t\t},\n\t\tfieldsOutput() {\n\n\t\t\tvar self = this;\n\t\t\tvar array = [];\n\n\n\n\t\t\tvar fields = [{\n\t\t\t\t\ttitle: 'Names',\n\t\t\t\t\ttype: 'group',\n\t\t\t\t\tkey: 'names',\n\t\t\t\t\tsameLine: true,\n\t\t\t\t\tfields: [{\n\t\t\t\t\t\t\ttitle: 'First Name',\n\t\t\t\t\t\t\tkey: '_firstName',\n\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\ttype: 'string',\n\t\t\t\t\t\t},\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\ttitle: 'Last Name',\n\t\t\t\t\t\t\tkey: '_lastName',\n\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\ttype: 'string',\n\t\t\t\t\t\t},\n\t\t\t\t\t],\n\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\ttitle: 'Extras',\n\t\t\t\t\ttype: 'group',\n\t\t\t\t\tkey: 'extras',\n\t\t\t\t\tsameLine: true,\n\t\t\t\t\tfields: [{\n\t\t\t\t\t\t\ttitle: 'Gender',\n\t\t\t\t\t\t\tkey: '_gender',\n\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\ttype: 'string',\n\t\t\t\t\t\t\tdirective: 'select',\n\t\t\t\t\t\t\toptions: [{\n\t\t\t\t\t\t\t\t\tname: 'Male',\n\t\t\t\t\t\t\t\t\tvalue: 'male',\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\tname: 'Female',\n\t\t\t\t\t\t\t\t\tvalue: 'female',\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\tname: 'Unknown',\n\t\t\t\t\t\t\t\t\tvalue: 'unknown',\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t]\n\t\t\t\t\t\t},\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\ttitle: 'Date of Birth',\n\t\t\t\t\t\t\tkey: '_dob',\n\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\ttype: 'date',\n\t\t\t\t\t\t\tdirective: 'datepicker',\n\t\t\t\t\t\t\texpressions: {\n\t\t\t\t\t\t\t\tshow() {\n\t\t\t\t\t\t\t\t\treturn self.askDOB;\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t},\n\n\t\t\t\t\t\t},\n\t\t\t\t\t]\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\ttitle: 'Communication',\n\t\t\t\t\ttype: 'group',\n\t\t\t\t\tkey: 'communication',\n\t\t\t\t\tsameLine: true,\n\t\t\t\t\tfields: [{\n\t\t\t\t\t\t\ttitle: 'Email Address',\n\t\t\t\t\t\t\tkey: '_email',\n\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\ttype: 'email',\n\t\t\t\t\t\t},\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\ttitle: 'Phone Number',\n\t\t\t\t\t\t\tkey: '_phoneNumber',\n\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\ttype: 'string',\n\t\t\t\t\t\t},\n\t\t\t\t\t],\n\n\t\t\t\t},\n\t\t\t]\n\n\t\t\taddField('rawData', {\n\t\t\t\tminimum: 1,\n\t\t\t\tmaximum: 1,\n\t\t\t\tasObject: true,\n\t\t\t\ttype: 'group',\n\t\t\t\tfields: [{\n\t\t\t\t\ttitle: 'Contact Details',\n\t\t\t\t\ttype: 'group',\n\t\t\t\t\tkey: 'contactDetails',\n\t\t\t\t\texpressions: {\n\t\t\t\t\t\tshow: `!data.contact && !data.contacts.length`,\n\t\t\t\t\t},\n\t\t\t\t\tfields,\n\t\t\t\t}]\n\t\t\t})\n\n\t\t\t///////////////////////////////////\n\n\t\t\taddField('contact', {\n\t\t\t\ttitle: 'Primary Contact',\n\t\t\t\tdescription: 'The primary contact for this interaction',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'reference',\n\t\t\t\tparams: {\n\t\t\t\t\trestrictType: 'contact',\n\t\t\t\t\tallDefinitions: true,\n\t\t\t\t},\n\n\t\t\t})\n\n\t\t\taddField('contacts', {\n\t\t\t\ttitle: 'Linked Contacts',\n\t\t\t\tdescription: 'All contacts referenced for this interaction',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 0,\n\t\t\t\ttype: 'reference',\n\t\t\t\tparams: {\n\t\t\t\t\trestrictType: 'contact',\n\t\t\t\t\tallDefinitions: true,\n\t\t\t\t},\n\n\t\t\t})\n\n\t\t\taddField('event', {\n\t\t\t\ttitle: 'Linked Event',\n\t\t\t\tdescription: 'Attach this interaction to a specific event',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'reference',\n\t\t\t\tparams: {\n\t\t\t\t\trestrictType: 'event',\n\t\t\t\t\tallDefinitions: true,\n\t\t\t\t},\n\n\t\t\t})\n\n\n\t\t\t///////////////////////////////////\n\n\t\t\taddField('emails', {\n\t\t\t\ttype: 'group',\n\t\t\t\tsameLine: true,\n\t\t\t\tfields: [{\n\t\t\t\t\t\ttitle: 'Primary Email Address',\n\t\t\t\t\t\tkey: 'primaryEmail',\n\t\t\t\t\t\tdescription: 'The primary email address relevant to this interaction',\n\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\ttype: 'email',\n\t\t\t\t\t}, {\n\t\t\t\t\t\ttitle: 'Transaction Email Address',\n\t\t\t\t\t\tkey: 'transactionEmail',\n\t\t\t\t\t\tdescription: 'The primary email address relevant to this interaction',\n\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\ttype: 'email',\n\t\t\t\t\t\texpressions: {\n\t\t\t\t\t\t\tdefaultValue: `data.primaryEmail`,\n\t\t\t\t\t\t},\n\t\t\t\t\t}\n\n\n\t\t\t\t]\n\t\t\t})\n\n\n\n\t\t\tfunction addField(key, details) {\n\t\t\t\tdetails.key = key;\n\t\t\t\tarray.push(details)\n\t\t\t}\n\n\t\t\treturn array;\n\n\t\t},\n\t},\n\tdata() {\n\t\treturn {\n\n\t\t}\n\t},\n}\n\n</script>\n<style scoped lang=\"scss\">\n\n/**/\r\n\r\n$primary: #2ad4b9;//#0bd6be;\r\n$success: #4cc650; //#4cc673;//\r\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\r\n$danger: #d93e63;\r\n$secondary: #0bd6cd; //#0bd6a3;\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n\r\n.border-top {\r\n    border-top: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-right {\r\n    border-right: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-bottom {\r\n    border-bottom: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-left {\r\n    border-left: 1px solid rgba(#000, 0.05);\r\n}\r\n//////////////////////////////////////////\r\n\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n/**/\n.hint {\n\tfont-size: 10px;\n\topacity: 0.5;\n\tcolor: inherit;\n\tdisplay: block;\n}\n\n</style>\n","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.hint {\n  font-size: 10px;\n  opacity: 0.5;\n  color: inherit;\n  display: block;\n}\n\n/*# sourceMappingURL=interaction.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-09d5ff64";
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
//# sourceMappingURL=interaction-f81e9c2d.js.map
