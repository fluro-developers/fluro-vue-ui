
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { aN as FluroContentForm, aO as FluroContentFormField, bm as __vue_normalize__, bn as __vue_create_injector__ } from './index-108407cc.js';

//
var script = {
  props: {
    value: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  components: {
    FluroContentForm,
    FluroContentFormField
  },

  data() {
    return {
      model: this.value,
      proposed: {}
    };
  },

  watch: {
    value(v) {
      if (this.model != v) {
        this.model = v;
      }
    },

    model(v) {
      console.log('update address');
      this.$emit('input', v);
    }

  },
  methods: {},
  computed: {
    fields() {
      var array = []; ///////////////////////////////////

      addField('addressLine1', {
        title: 'Address Line 1',
        minimum: 0,
        maximum: 1,
        type: 'string'
      });
      addField('addressLine2', {
        title: 'Address Line 2',
        minimum: 0,
        maximum: 1,
        type: 'string'
      });
      addField('suburb', {
        title: 'Suburb',
        minimum: 0,
        maximum: 1,
        type: 'string'
      });
      addField('state', {
        title: 'State',
        minimum: 0,
        maximum: 1,
        type: 'string'
      });
      addField('postalCode', {
        title: 'Postal Code',
        minimum: 0,
        maximum: 1,
        type: 'string'
      });
      addField('country', {
        title: 'Country',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'countryselect'
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
  return _vm.model
    ? _c(
        "v-container",
        { attrs: { fluid: "", "grid-list-lg": "" } },
        [
          _c("fluro-content-form", {
            attrs: { fields: _vm.fields },
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
                        { attrs: { row: "", wrap: "" } },
                        [
                          _c(
                            "v-flex",
                            { attrs: { xs12: "", sm12: "" } },
                            [
                              _c("fluro-content-form-field", {
                                attrs: {
                                  "form-fields": formFields,
                                  options: options,
                                  field: fieldHash.addressLine1
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
                            { attrs: { xs12: "", sm12: "" } },
                            [
                              _c("fluro-content-form-field", {
                                attrs: {
                                  "form-fields": formFields,
                                  options: options,
                                  field: fieldHash.addressLine2
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
                            { attrs: { xs12: "", sm6: "", md3: "" } },
                            [
                              _c("fluro-content-form-field", {
                                attrs: {
                                  "form-fields": formFields,
                                  options: options,
                                  field: fieldHash.suburb
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
                            { attrs: { xs12: "", sm6: "", md3: "" } },
                            [
                              _c("fluro-content-form-field", {
                                attrs: {
                                  "form-fields": formFields,
                                  options: options,
                                  field: fieldHash.state
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
                            { attrs: { xs12: "", sm6: "", md3: "" } },
                            [
                              _c("fluro-content-form-field", {
                                attrs: {
                                  "form-fields": formFields,
                                  options: options,
                                  field: fieldHash.postalCode
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
                            { attrs: { xs12: "", sm6: "", md3: "" } },
                            [
                              _c("fluro-content-form-field", {
                                attrs: {
                                  "form-fields": formFields,
                                  options: options,
                                  field: fieldHash.country
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
                    ]
                  }
                }
              ],
              null,
              false,
              3582871058
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
    inject("data-v-7507460d_0", { source: "/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n\n/*# sourceMappingURL=AddressManager.vue.map */", map: {"version":3,"sources":["C:\\Users\\User\\Documents\\fluro\\fluro-vue-ui\\src\\components\\content\\edit\\components\\AddressManager.vue","AddressManager.vue"],"names":[],"mappings":"AAiIA,GAAA;AAYA;EACA,yCAAA;AC3IA;AD8IA;EACA,2CAAA;AC3IA;AD8IA;EACA,4CAAA;AC3IA;AD8IA;EACA,0CAAA;AC3IA;;ADmJA,GAAA;;AC/IA,6CAA6C","file":"AddressManager.vue","sourcesContent":["<template>\n    <v-container fluid grid-list-lg v-if=\"model\">\n        <fluro-content-form v-model=\"model\" :fields=\"fields\">\n            <template v-slot:form=\"{formFields, fieldHash, model, update, options}\">\n                <v-layout row wrap>\n                    <v-flex xs12 sm12>\n                        <fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.addressLine1\" v-model=\"model\"></fluro-content-form-field>\n                    </v-flex>\n                    <v-flex xs12 sm12>\n                        <fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.addressLine2\" v-model=\"model\"></fluro-content-form-field>\n                    </v-flex>\n                    <v-flex xs12 sm6 md3>\n                        <fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.suburb\" v-model=\"model\"></fluro-content-form-field>\n                    </v-flex>\n                    <v-flex xs12 sm6 md3>\n                        <fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.state\" v-model=\"model\"></fluro-content-form-field>\n                    </v-flex>\n                    <v-flex xs12 sm6 md3>\n                        <fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.postalCode\" v-model=\"model\"></fluro-content-form-field>\n                    </v-flex>\n                    <v-flex xs12 sm6 md3>\n                        <fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.country\" v-model=\"model\"></fluro-content-form-field>\n                    </v-flex>\n                </v-layout>\n            </template>\n        </fluro-content-form>\n    </v-container>\n</template>\n<script>\nimport FluroContentForm from 'src/components/form/FluroContentForm.vue';\nimport FluroContentFormField from 'src/components/form/FluroContentFormField.vue';\n\n\nexport default {\n    props: {\n        value: {\n            type: Object,\n            default: function() {\n                return {};\n            },\n        }\n    },\n    components: {\n        FluroContentForm,\n        FluroContentFormField,\n    },\n    data() {\n        return {\n            model: this.value,\n            proposed: {},\n        }\n    },\n    watch:{\n    \tvalue(v) {\n    \t\tif(this.model != v) {\n    \t\t\tthis.model = v;\n    \t\t}\n    \t},\n    \tmodel(v) {\n    \t\tconsole.log('update address')\n    \t\tthis.$emit('input', v);\n    \t}\n    },\n    methods: {},\n    computed: {\n        fields() {\n\n            var self = this;\n            var array = [];\n\n            ///////////////////////////////////\n\n            addField('addressLine1', {\n                title: 'Address Line 1',\n                minimum: 0,\n                maximum: 1,\n                type: 'string',\n            });\n\n            addField('addressLine2', {\n                title: 'Address Line 2',\n                minimum: 0,\n                maximum: 1,\n                type: 'string',\n            });\n\n            addField('suburb', {\n                title: 'Suburb',\n                minimum: 0,\n                maximum: 1,\n                type: 'string',\n            });\n\n            addField('state', {\n                title: 'State',\n                minimum: 0,\n                maximum: 1,\n                type: 'string',\n            });\n\n            addField('postalCode', {\n                title: 'Postal Code',\n                minimum: 0,\n                maximum: 1,\n                type: 'string',\n            });\n\n            addField('country', {\n                title: 'Country',\n                minimum: 0,\n                maximum: 1,\n                type: 'string',\n                directive: 'countryselect'\n            });\n\n            ///////////////////////////////////\n\n            function addField(key, details) {\n                details.key = key;\n                array.push(details)\n            }\n\n            return array;\n        }\n    }\n}\n</script>\n<style lang=\"scss\">\n\n/**/\r\n\r\n$primary: #2ad4b9;//#0bd6be;\r\n$success: #4cc650; //#4cc673;//\r\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\r\n$danger: #d93e63;\r\n$secondary: #0bd6cd; //#0bd6a3;\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n\r\n.border-top {\r\n    border-top: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-right {\r\n    border-right: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-bottom {\r\n    border-bottom: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-left {\r\n    border-left: 1px solid rgba(#000, 0.05);\r\n}\r\n//////////////////////////////////////////\r\n\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n/**/\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n\n/*# sourceMappingURL=AddressManager.vue.map */"]}, media: undefined });

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

export { __vue_component__ as A };
//# sourceMappingURL=AddressManager-17524008.js.map
