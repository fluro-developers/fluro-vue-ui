
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { bl as __vue_normalize__, bm as __vue_create_injector__ } from './index-60a30108.js';
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
import { F as FluroContentEditMixin } from './FluroContentEditMixin-4a316033.js';

//

var script = {
  mixins: [FluroContentEditMixin],
  components: {},
  methods: {
    toggleCollected() {
      console.log("INIT TOGGLE");
      var self = this;

      if (!self.model.collected) {
        var currentUserName = self.user ? `${self.user.firstName} ${self.user.lastName}` : "";
        console.log("COLLECTED IS FALSY", self.model.collected);
        self.$set(self.model, "collected", true);
        self.$set(self.model, "collectedBy", currentUserName);
        self.$set(self.model, "collectionDate", new Date());
      } else {
        console.log("COLLECTED IS TRUTHY", self.model.collected);
        return self.$set(self.model, "collected", false);
      }
    }

  },

  created() {
    var self = this;

    if (!self.model._id) {
      return self.$set(self.model, "collected", false);
    }
  },

  asyncComputed: {},
  computed: {
    qrCodeURL() {
      var self = this;

      if (!self.model._id) {
        return;
      }

      var interactionID = self.$fluro.utils.getStringID(self.model.interaction);
      var ticketID = self.$fluro.utils.getStringID(self.model);

      if (interactionID) {
        return `${self.$fluro.api.defaults.baseURL}/system/qr?input=http://tickets.fluro.io/interaction/${interactionID}`;
      } else {
        return `${self.$fluro.api.defaults.baseURL}/system/qr?input=http://tickets.fluro.io/ticket/${ticketID}`;
      } // $scope.ticketCodeURL = Fluro.apiURL + '/system/qr?input=http://tickets.fluro.io/ticket/' + ticketID;
      // $scope.interactionCodeURL = Fluro.apiURL + '/system/qr?input=http://tickets.fluro.io/interaction/' + interactionID;

    },

    showOutline() {
      return false;
    },

    fieldsOutput() {
      var array = []; ///////////////////////////////////

      addField("title", {
        title: "Ticket Title",
        minimum: 0,
        maximum: 1,
        type: "string"
      });
      addField("email", {
        title: "Primary Email Address",
        minimum: 0,
        maximum: 1,
        type: "email"
      });
      addField("contact", {
        title: "Contact",
        description: "The contact this ticket is linked to",
        minimum: 1,
        maximum: 1,
        type: "reference",
        params: {
          restrictType: "contact"
        }
      });
      addField("value", {
        title: "Value",
        minimum: 0,
        maximum: 1,
        type: "number"
      });
      addField("event", {
        title: "Event",
        description: "The event this ticket is valid for",
        minimum: 0,
        maximum: 1,
        type: "reference",
        params: {
          restrictType: "event"
        }
      });
      addField("interaction", {
        title: "Interaction",
        description: "The original form submission that was used to create this ticket",
        minimum: 0,
        maximum: 1,
        type: "reference",
        params: {
          restrictType: "interaction"
        }
      }); //////////////////////////////////////

      addField("collectedBy", {
        title: "Collected By",
        description: "The name of the person that collected the ticket",
        minimum: 0,
        maximum: 1,
        type: "string"
      });
      addField("collectionDate", {
        title: "Collection Date",
        description: "The date this ticket was collected",
        minimum: 0,
        maximum: 1,
        type: "date",
        directive: "timedatepicker"
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
                    "flex-row",
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
                                  _c(
                                    "v-layout",
                                    {
                                      attrs: { column: "", "grid-list-xl": "" }
                                    },
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
                                          field: _vm.fieldHash.email
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
                                          field: _vm.fieldHash.contact
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
                                          field: _vm.fieldHash.value
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
                                          field: _vm.fieldHash.interaction
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
                                            _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "no-border-no-background",
                                                on: {
                                                  click: function($event) {
                                                    return _vm.toggleCollected()
                                                  }
                                                }
                                              },
                                              [
                                                _c(
                                                  "fluro-toggle-item",
                                                  {
                                                    attrs: {
                                                      inactive: !_vm.model
                                                        .collected
                                                    }
                                                  },
                                                  [
                                                    _vm._v(
                                                      "Ticket has been collected"
                                                    )
                                                  ]
                                                )
                                              ],
                                              1
                                            )
                                          ]),
                                          _vm._v(" "),
                                          _vm.model.collected
                                            ? _c(
                                                "fluro-panel-body",
                                                [
                                                  _c(
                                                    "v-layout",
                                                    {
                                                      attrs: {
                                                        row: "",
                                                        wrap: ""
                                                      }
                                                    },
                                                    [
                                                      _c(
                                                        "v-flex",
                                                        {
                                                          attrs: {
                                                            "xs-12": "",
                                                            sm6: "",
                                                            "px-1": ""
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
                                                                    .collectedBy
                                                              },
                                                              on: {
                                                                input:
                                                                  _vm.update
                                                              },
                                                              model: {
                                                                value:
                                                                  _vm.model,
                                                                callback: function(
                                                                  $$v
                                                                ) {
                                                                  _vm.model = $$v;
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
                                                            "xs-12": "",
                                                            sm6: "",
                                                            "px-1": ""
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
                                                                    .collectionDate
                                                              },
                                                              on: {
                                                                input:
                                                                  _vm.update
                                                              },
                                                              model: {
                                                                value:
                                                                  _vm.model,
                                                                callback: function(
                                                                  $$v
                                                                ) {
                                                                  _vm.model = $$v;
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
                      ),
                      _vm._v(" "),
                      _vm.qrCodeURL
                        ? _c(
                            "flex-column",
                            {
                              staticClass: "border-left",
                              staticStyle: {
                                "max-width": "300px",
                                width: "25%",
                                background: "#eee"
                              }
                            },
                            [
                              _c("v-container", { attrs: { fluid: "" } }, [
                                _c("img", {
                                  staticClass: "qrcode",
                                  attrs: { src: _vm.qrCodeURL }
                                })
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
    2
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-6c4a9e5c_0", { source: "/**/\n.border-top[data-v-6c4a9e5c] {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right[data-v-6c4a9e5c] {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom[data-v-6c4a9e5c] {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left[data-v-6c4a9e5c] {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.no-border-no-background .toggle-item[data-v-6c4a9e5c] {\n  border: none !important;\n  background: none !important;\n  font-size: 14px;\n  padding: 0px;\n}\n.qrcode[data-v-6c4a9e5c] {\n  width: 100%;\n  height: auto;\n  border: 5px solid #000;\n  border-radius: 4px;\n}\n.hint[data-v-6c4a9e5c] {\n  font-size: 10px;\n  opacity: 0.5;\n  color: inherit;\n  display: block;\n}\n\n/*# sourceMappingURL=ticket.vue.map */", map: {"version":3,"sources":["C:\\Users\\User\\Documents\\fluro\\fluro-vue-ui\\src\\components\\content\\edit\\panels\\ticket.vue","ticket.vue"],"names":[],"mappings":"AA0MA,GAAA;AAYA;EACA,yCAAA;ACpNA;ADuNA;EACA,2CAAA;ACpNA;ADuNA;EACA,4CAAA;ACpNA;ADuNA;EACA,0CAAA;ACpNA;;AD4NA,GAAA;AACA;EACA,uBAAA;EACA,2BAAA;EACA,eAAA;EACA,YAAA;ACzNA;AD4NA;EACA,WAAA;EACA,YAAA;EACA,sBAAA;EACA,kBAAA;ACzNA;AD4NA;EACA,eAAA;EACA,YAAA;EACA,cAAA;EACA,cAAA;ACzNA;;AAEA,qCAAqC","file":"ticket.vue","sourcesContent":["<template>\n    <flex-column>\n        <template v-if=\"loading\">\n            <fluro-page-preloader contain />\n        </template>\n        <tabset v-else :justified=\"true\" :vertical=\"true\">\n            <tab>\n                <flex-row>\n                    <flex-column-body style=\"background: #fafafa;\">\n                        <v-container>\n                            <constrain sm>\n                                <v-layout column grid-list-xl>\n                                    <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.title\" v-model=\"model\"></fluro-content-form-field>\n                                    <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.email\" v-model=\"model\"></fluro-content-form-field>\n                                    <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.contact\" v-model=\"model\"></fluro-content-form-field>\n                                    <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.value\" v-model=\"model\"></fluro-content-form-field>\n                                    <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.event\" v-model=\"model\"></fluro-content-form-field>\n                                    <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.interaction\" v-model=\"model\"></fluro-content-form-field>\n                                    <fluro-panel>\n                                        <fluro-panel-title>\n                                            <div class=\"no-border-no-background\" @click=\"toggleCollected()\">\n                                                <fluro-toggle-item :inactive=\"!model.collected\">Ticket has been collected</fluro-toggle-item>\n                                            </div>\n                                        </fluro-panel-title>\n                                        <fluro-panel-body v-if=\"model.collected\">\n                                            <v-layout row wrap>\n                                                <v-flex xs-12 sm6 px-1>\n                                                    <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.collectedBy\" v-model=\"model\"></fluro-content-form-field>\n                                                </v-flex>\n                                                <v-flex xs-12 sm6 px-1>\n                                                    <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.collectionDate\" v-model=\"model\"></fluro-content-form-field>\n                                                </v-flex>\n                                            </v-layout>\n                                        </fluro-panel-body>\n                                    </fluro-panel>\n                                </v-layout>\n                            </constrain>\n                        </v-container>\n                    </flex-column-body>\n                    <flex-column v-if=\"qrCodeURL\" style=\"max-width: 300px; width: 25%; background: #eee;\" class=\"border-left\">\n                        <v-container fluid>\n                            <img class=\"qrcode\" :src=\"qrCodeURL\" />\n                        </v-container>\n                    </flex-column>\n                </flex-row>\n            </tab>\n        </tabset>\n    </flex-column>\n</template>\n<script>\n/////////////////////////////////\n\nimport FluroContentEditMixin from \"src/components/content/edit/FluroContentEditMixin.js\";\n\n/////////////////////////////////\n\nimport Vue from \"vue\";\n\n/////////////////////////////////\n\nexport default {\n    mixins: [FluroContentEditMixin],\n    components: {},\n    methods: {\n        toggleCollected() {\n            console.log(\"INIT TOGGLE\");\n            var self = this;\n            if (!self.model.collected) {\n                var currentUserName = self.user ? `${self.user.firstName} ${self.user.lastName}` : \"\";\n\n                console.log(\"COLLECTED IS FALSY\", self.model.collected);\n                self.$set(self.model, \"collected\", true);\n                self.$set(self.model, \"collectedBy\", currentUserName);\n                self.$set(self.model, \"collectionDate\", new Date());\n            } else {\n                console.log(\"COLLECTED IS TRUTHY\", self.model.collected);\n                return self.$set(self.model, \"collected\", false);\n            }\n        },\n    },\n    created() {\n        var self = this;\n        if (!self.model._id) {\n            return self.$set(self.model, \"collected\", false);\n        }\n    },\n    asyncComputed: {},\n    computed: {\n        qrCodeURL() {\n            var self = this;\n\n            if (!self.model._id) {\n                return;\n            }\n            var interactionID = self.$fluro.utils.getStringID(self.model.interaction);\n            var ticketID = self.$fluro.utils.getStringID(self.model);\n            if (interactionID) {\n                return `${self.$fluro.api.defaults.baseURL}/system/qr?input=http://tickets.fluro.io/interaction/${interactionID}`;\n            } else {\n                return `${self.$fluro.api.defaults.baseURL}/system/qr?input=http://tickets.fluro.io/ticket/${ticketID}`;\n            }\n\n            // $scope.ticketCodeURL = Fluro.apiURL + '/system/qr?input=http://tickets.fluro.io/ticket/' + ticketID;\n            // $scope.interactionCodeURL = Fluro.apiURL + '/system/qr?input=http://tickets.fluro.io/interaction/' + interactionID;\n        },\n        showOutline() {\n            return false;\n        },\n        fieldsOutput() {\n            var self = this;\n            var array = [];\n\n            ///////////////////////////////////\n\n            addField(\"title\", {\n                title: \"Ticket Title\",\n                minimum: 0,\n                maximum: 1,\n                type: \"string\",\n            });\n\n            addField(\"email\", {\n                title: \"Primary Email Address\",\n                minimum: 0,\n                maximum: 1,\n                type: \"email\",\n            });\n\n            addField(\"contact\", {\n                title: \"Contact\",\n                description: \"The contact this ticket is linked to\",\n                minimum: 1,\n                maximum: 1,\n                type: \"reference\",\n                params: {\n                    restrictType: \"contact\",\n                },\n            });\n\n            addField(\"value\", {\n                title: \"Value\",\n                minimum: 0,\n                maximum: 1,\n                type: \"number\",\n            });\n\n            addField(\"event\", {\n                title: \"Event\",\n                description: \"The event this ticket is valid for\",\n                minimum: 0,\n                maximum: 1,\n                type: \"reference\",\n                params: {\n                    restrictType: \"event\",\n                },\n            });\n\n            addField(\"interaction\", {\n                title: \"Interaction\",\n                description: \"The original form submission that was used to create this ticket\",\n                minimum: 0,\n                maximum: 1,\n                type: \"reference\",\n                params: {\n                    restrictType: \"interaction\",\n                },\n            });\n\n            //////////////////////////////////////\n\n            addField(\"collectedBy\", {\n                title: \"Collected By\",\n                description: \"The name of the person that collected the ticket\",\n                minimum: 0,\n                maximum: 1,\n                type: \"string\",\n            });\n\n            addField(\"collectionDate\", {\n                title: \"Collection Date\",\n                description: \"The date this ticket was collected\",\n                minimum: 0,\n                maximum: 1,\n                type: \"date\",\n                directive: \"timedatepicker\",\n            });\n\n            function addField(key, details) {\n                details.key = key;\n                array.push(details);\n            }\n\n            return array;\n        },\n    },\n    data() {\n        return {};\n    },\n};\n</script>\n<style scoped lang=\"scss\">\n\n/**/\r\n\r\n$primary: #2ad4b9;//#0bd6be;\r\n$success: #4cc650; //#4cc673;//\r\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\r\n$danger: #d93e63;\r\n$secondary: #0bd6cd; //#0bd6a3;\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n\r\n.border-top {\r\n    border-top: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-right {\r\n    border-right: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-bottom {\r\n    border-bottom: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-left {\r\n    border-left: 1px solid rgba(#000, 0.05);\r\n}\r\n//////////////////////////////////////////\r\n\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n/**/\n.no-border-no-background .toggle-item {\n    border: none !important;\n    background: none !important;\n    font-size: 14px;\n    padding: 0px;\n}\n\n.qrcode {\n    width: 100%;\n    height: auto;\n    border: 5px solid #000;\n    border-radius: 4px;\n}\n\n.hint {\n    font-size: 10px;\n    opacity: 0.5;\n    color: inherit;\n    display: block;\n}\n</style>\n","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.no-border-no-background .toggle-item {\n  border: none !important;\n  background: none !important;\n  font-size: 14px;\n  padding: 0px;\n}\n\n.qrcode {\n  width: 100%;\n  height: auto;\n  border: 5px solid #000;\n  border-radius: 4px;\n}\n\n.hint {\n  font-size: 10px;\n  opacity: 0.5;\n  color: inherit;\n  display: block;\n}\n\n/*# sourceMappingURL=ticket.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-6c4a9e5c";
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
//# sourceMappingURL=ticket-de1233db.js.map
