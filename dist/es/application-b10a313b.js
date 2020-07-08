
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { bm as __vue_normalize__, bn as __vue_create_injector__ } from './index-3aa8b194.js';
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
import { F as FluroContentEditMixin } from './FluroContentEditMixin-51db8414.js';
import { F as FluroPermissionSelect } from './FluroPermissionSelect-8f5d6258.js';

/* script */

/* template */

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = undefined;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = __vue_normalize__(
    {},
    __vue_inject_styles__,
    {},
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

//

var script = {
  mixins: [FluroContentEditMixin],
  components: {
    FluroPermissionSelect,
    RedirectManager: __vue_component__
  },
  asyncComputed: {},
  computed: {
    showOutline() {
      return false; //true; //false;//true;//false;//true;
    },

    fieldsOutput() {
      var array = []; ///////////////////////////////////

      addField('title', {
        title: 'Title',
        minimum: 1,
        maximum: 1,
        type: 'string'
      }); // ///////////////////////////////////

      addField('domain', {
        title: 'Domain Name',
        minimum: 1,
        maximum: 1,
        type: 'string',
        description: 'Add a domain name for this application (without https://)',
        placeholder: 'Eg. website.com'
      });
      addField('forwards', {
        title: 'Forwarding Domains',
        minimum: 0,
        maximum: 0,
        type: 'string',
        description: 'Add domain names that should redirect to the primary domain name',
        placeholder: 'Eg. www.website.com'
      });
      addField('forceSSL', {
        title: 'Force SSL',
        minimum: 0,
        maximum: 1,
        type: 'boolean',
        description: 'Check this box to redirect all requests to https://'
      });
      addField('authenticationStyle', {
        title: 'Authentication Style',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'select',
        options: [{
          title: 'Application',
          value: 'application'
        }, {
          title: 'Fluro Browser Cookie',
          value: 'global'
        }]
      });
      addField('apipath', {
        title: 'API URL',
        minimum: 0,
        maximum: 1,
        type: 'string',
        description: 'Specify which API URL this application should use. If left blank, the default fluro api url will be used.',
        placeholder: 'https://api.fluro.io'
      });
      addField('timezone', {
        title: 'Timezone',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'timezone-select',
        description: 'Which timezone should be used for this application'
      });
      addField('gaTrackingCode', {
        title: 'Google Analytics ID',
        minimum: 0,
        maximum: 1,
        type: 'string',
        placeholder: 'UA-XXXXXX',
        description: 'Paste your GA tracking code to enable google analytics to track this site'
      });
      addField('supportEmail', {
        title: 'Support Email Address',
        minimum: 0,
        maximum: 1,
        type: 'email',
        placeholder: 'support@yourdomain.com',
        description: 'The default support/contact email for notifications and enquiries regarding this application'
      });
      addField('favicon', {
        title: 'Favicon',
        minimum: 0,
        maximum: 1,
        type: 'reference',
        params: {
          restrictType: 'image'
        },
        description: 'Choose an image to use for the favicon. (Recommend a 1:1 ratio and at least 1024 x 1024px)'
      });
      addField('headerInject', {
        title: 'Header Injection Code',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'code',
        params: {
          syntax: 'html'
        },
        description: 'Include HTML that can be injected above the closing </head> tag'
      });
      addField('footerInject', {
        title: 'Footer Injection Code',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'code',
        params: {
          syntax: 'html'
        },
        description: 'Include HTML that can be injected above the closing </body> tag'
      });

      function addField(key, details) {
        details.key = key;
        array.push(details);
      }

      return array;
    }

  },
  methods: {
    modelUpdated() {
      this.update(this.model);
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
                { attrs: { heading: "Basic Info" } },
                [
                  _c(
                    "flex-column-body",
                    { staticStyle: { background: "#fafafa" } },
                    [
                      _c(
                        "v-container",
                        [
                          _c("constrain", { attrs: { sm: "" } }, [
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
                                    field: _vm.fieldHash.domain
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
                                    field: _vm.fieldHash.forwards
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
                          ])
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
                "tab",
                { attrs: { heading: "Authentication" } },
                [
                  _c(
                    "flex-column-body",
                    { staticStyle: { background: "#fafafa" } },
                    [
                      _c(
                        "v-container",
                        [
                          _c("constrain", { attrs: { sm: "" } }, [
                            _c(
                              "div",
                              { staticClass: "grid-list-xl" },
                              [
                                _c("fluro-content-form-field", {
                                  attrs: {
                                    "form-fields": _vm.formFields,
                                    outline: _vm.showOutline,
                                    options: _vm.options,
                                    field: _vm.fieldHash.forceSSL
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
                                    field: _vm.fieldHash.authenticationStyle
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
                          ])
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
              _vm.model.authenticationStyle == "application"
                ? [
                    _c(
                      "tab",
                      { attrs: { heading: "Application Permissions" } },
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
                                    _c("h5", { attrs: { margin: "" } }, [
                                      _vm._v("Application Permissions")
                                    ]),
                                    _vm._v(" "),
                                    _c("p", [
                                      _vm._v(
                                        "Add permissions here that will be attributed to this application's API Key whether a user is signed in or not."
                                      )
                                    ]),
                                    _vm._v(" "),
                                    _c("fluro-permission-select", {
                                      on: { input: _vm.modelUpdated },
                                      model: {
                                        value: _vm.model.permissionSets,
                                        callback: function($$v) {
                                          _vm.$set(
                                            _vm.model,
                                            "permissionSets",
                                            $$v
                                          );
                                        },
                                        expression: "model.permissionSets"
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
                    ),
                    _vm._v(" "),
                    _c(
                      "tab",
                      { attrs: { heading: "User Permissions" } },
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
                                    _c("h5", { attrs: { margin: "" } }, [
                                      _vm._v("User Permissions")
                                    ]),
                                    _vm._v(" "),
                                    _c("p", [
                                      _vm._v(
                                        "Add permissions here that will be attributed to a logged in user when signed in to this application. These will be merged with any existing permissions retrieved from a user's managed persona in the '" +
                                          _vm._s(_vm.application.title) +
                                          "' account"
                                      )
                                    ]),
                                    _vm._v(" "),
                                    _c("fluro-permission-select", {
                                      on: { input: _vm.modelUpdated },
                                      model: {
                                        value: _vm.model.userPermissionSets,
                                        callback: function($$v) {
                                          _vm.$set(
                                            _vm.model,
                                            "userPermissionSets",
                                            $$v
                                          );
                                        },
                                        expression: "model.userPermissionSets"
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
                    ),
                    _vm._v(" "),
                    _c(
                      "tab",
                      { attrs: { heading: "Advanced" } },
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
                                    _c("h5", { attrs: { margin: "" } }, [
                                      _vm._v("Advanced")
                                    ]),
                                    _vm._v(" "),
                                    _c("fluro-content-form-field", {
                                      attrs: {
                                        "form-fields": _vm.formFields,
                                        outline: _vm.showOutline,
                                        options: _vm.options,
                                        field: _vm.fieldHash.apipath
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
                                    }),
                                    _vm._v(" "),
                                    _c("fluro-content-form-field", {
                                      attrs: {
                                        "form-fields": _vm.formFields,
                                        outline: _vm.showOutline,
                                        options: _vm.options,
                                        field: _vm.fieldHash.gaTrackingCode
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
                                        field: _vm.fieldHash.supportEmail
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
                                        field: _vm.fieldHash.favicon
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
                                        field: _vm.fieldHash.headerInject
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
                                        field: _vm.fieldHash.footerInject
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
                          ],
                          1
                        )
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "tab",
                      { attrs: { heading: "Redirects" } },
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
                                    _c("h5", { attrs: { margin: "" } }, [
                                      _vm._v("Redirects")
                                    ]),
                                    _vm._v(" "),
                                    _c("redirect-manager", {
                                      model: {
                                        value: _vm.model.pathForwards,
                                        callback: function($$v) {
                                          _vm.$set(
                                            _vm.model,
                                            "pathForwards",
                                            $$v
                                          );
                                        },
                                        expression: "model.pathForwards"
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
                  ]
                : _vm._e()
            ],
            2
          )
    ],
    2
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = function (inject) {
    if (!inject) return
    inject("data-v-6dc922a2_0", { source: "/**/\n.border-top[data-v-6dc922a2] {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right[data-v-6dc922a2] {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom[data-v-6dc922a2] {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left[data-v-6dc922a2] {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.hint[data-v-6dc922a2] {\n  font-size: 10px;\n  opacity: 0.5;\n  color: inherit;\n  display: block;\n}\n\n/*# sourceMappingURL=application.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/edit/panels/application.vue","application.vue"],"names":[],"mappings":"AA0RA,GAAA;AAYA;EACA,yCAAA;ACpSA;ADuSA;EACA,2CAAA;ACpSA;ADuSA;EACA,4CAAA;ACpSA;ADuSA;EACA,0CAAA;ACpSA;;AD4SA,GAAA;AACA;EACA,eAAA;EACA,YAAA;EACA,cAAA;EACA,cAAA;ACzSA;;AAEA,0CAA0C","file":"application.vue","sourcesContent":["<template>\n    <flex-column>\n        <template v-if=\"loading\">\n            <fluro-page-preloader contain />\n        </template>\n        <tabset v-else :justified=\"true\" :vertical=\"true\">\n            <tab heading=\"Basic Info\">\n                <flex-column-body style=\"background: #fafafa;\">\n                    <v-container>\n                        <constrain sm>\n                            <div class=\"grid-list-xl\">\n                                <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.title\" v-model=\"model\" />\n                                <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.domain\" v-model=\"model\" />\n                                <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.forwards\" v-model=\"model\" />\n                                <!--  <div v-if=\"definition && definition.fields && definition.fields.length\">\n                                    <fluro-content-form :options=\"options\" v-model=\"model.data\" :fields=\"definition.fields\">\n                                    </fluro-content-form>\n                                </div> -->\n                            </div>\n                        </constrain>\n                    </v-container>\n                </flex-column-body>\n            </tab>\n            <tab heading=\"Authentication\">\n                <flex-column-body style=\"background: #fafafa;\">\n                    <v-container>\n                        <constrain sm>\n                            <div class=\"grid-list-xl\">\n                                <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.forceSSL\" v-model=\"model\" />\n                                <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.authenticationStyle\" v-model=\"model\" />\n                                <!--  <div v-if=\"definition && definition.fields && definition.fields.length\">\n                                    <fluro-content-form :options=\"options\" v-model=\"model.data\" :fields=\"definition.fields\">\n                                    </fluro-content-form>\n                                </div> -->\n                            </div>\n                        </constrain>\n                    </v-container>\n                </flex-column-body>\n            </tab>\n            <template v-if=\"model.authenticationStyle == 'application'\">\n            <tab heading=\"Application Permissions\">\n                <flex-column-body style=\"background: #fafafa;\">\n                    <v-container>\n                        <constrain sm>\n                            <h5 margin>Application Permissions</h5>\n                            <p>Add permissions here that will be attributed to this application's API Key whether a user is signed in or not.</p>\n                            <fluro-permission-select @input=\"modelUpdated\" v-model=\"model.permissionSets\" />\n                        </constrain>\n                    </v-container>\n                </flex-column-body>\n            </tab>\n            <tab heading=\"User Permissions\">\n                <flex-column-body style=\"background: #fafafa;\">\n                    <v-container>\n                        <constrain sm>\n                            <h5 margin>User Permissions</h5>\n                            <p>Add permissions here that will be attributed to a logged in user when signed in to this application. These will be merged with any existing permissions retrieved from a user's managed persona in the '{{application.title}}' account</p>\n                            <fluro-permission-select @input=\"modelUpdated\" v-model=\"model.userPermissionSets\" />\n                        </constrain>\n                    </v-container>\n                </flex-column-body>\n            </tab>\n            <tab heading=\"Advanced\">\n                <flex-column-body style=\"background: #fafafa;\">\n                    <v-container>\n                        <constrain sm>\n                            <h5 margin>Advanced</h5>\n                                <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.apipath\" v-model=\"model\" />\n                                <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.timezone\" v-model=\"model\" />\n                                <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.gaTrackingCode\" v-model=\"model\" />\n                                <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.supportEmail\" v-model=\"model\" />\n                                <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.favicon\" v-model=\"model\" />\n                                <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.headerInject\" v-model=\"model\" />\n                                <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.footerInject\" v-model=\"model\" />\n\n                        </constrain>\n                    </v-container>\n                </flex-column-body>\n            </tab>\n            <tab heading=\"Redirects\">\n                <flex-column-body style=\"background: #fafafa;\">\n                    <v-container>\n                        <constrain sm>\n                            <h5 margin>Redirects</h5>\n                            <redirect-manager v-model=\"model.pathForwards\"/>\n                        </constrain>\n                    </v-container>\n                </flex-column-body>\n            </tab>\n        </template>\n        </tabset>\n    </flex-column>\n</template>\n<script>\n/////////////////////////////////\n\nimport FluroContentEditMixin from 'src/components/content/edit/FluroContentEditMixin.js';\nimport FluroPermissionSelect from \"src/components/form/FluroPermissionSelect.vue\";\nimport RedirectManager from 'src/components/content/edit/components/RedirectManager.vue';\n\n/////////////////////////////////\n\nimport Vue from 'vue';\n\n/////////////////////////////////\n\nexport default {\n\n\n    mixins: [FluroContentEditMixin],\n    components: {\n        FluroPermissionSelect,\n        RedirectManager,\n    },\n    asyncComputed: {\n\n    },\n    computed: {\n        showOutline() {\n            return false; //true; //false;//true;//false;//true;\n        },\n        fieldsOutput() {\n\n            var self = this;\n            var array = [];\n\n            ///////////////////////////////////\n\n            addField('title', {\n                title: 'Title',\n                minimum: 1,\n                maximum: 1,\n                type: 'string',\n            })\n\n            // ///////////////////////////////////\n\n            addField('domain', {\n                title: 'Domain Name',\n                minimum: 1,\n                maximum: 1,\n                type: 'string',\n                description: 'Add a domain name for this application (without https://)',\n                placeholder: 'Eg. website.com',\n            })\n\n            addField('forwards', {\n                title: 'Forwarding Domains',\n                minimum: 0,\n                maximum: 0,\n                type: 'string',\n                description: 'Add domain names that should redirect to the primary domain name',\n                placeholder: 'Eg. www.website.com',\n            })\n\n\n            addField('forceSSL', {\n                title: 'Force SSL',\n                minimum: 0,\n                maximum: 1,\n                type: 'boolean',\n                description: 'Check this box to redirect all requests to https://',\n            })\n\n\n            addField('authenticationStyle', {\n                title: 'Authentication Style',\n                minimum: 0,\n                maximum: 1,\n                type: 'string',\n                directive:'select',\n                options: [{\n                        title: 'Application',\n                        value: 'application',\n                    },\n                    {\n                        title: 'Fluro Browser Cookie',\n                        value: 'global',\n                    },\n                ]\n            })\n\n            addField('apipath', {\n                title: 'API URL',\n                minimum: 0,\n                maximum: 1,\n                type: 'string',\n                description: 'Specify which API URL this application should use. If left blank, the default fluro api url will be used.',\n                placeholder: 'https://api.fluro.io',\n            })\n\n\n            addField('timezone', {\n                title: 'Timezone',\n                minimum: 0,\n                maximum: 1,\n                type: 'string',\n                directive: 'timezone-select',\n                description: 'Which timezone should be used for this application',\n            })\n\n            addField('gaTrackingCode', {\n                title: 'Google Analytics ID',\n                minimum: 0,\n                maximum: 1,\n                type: 'string',\n                placeholder:'UA-XXXXXX',\n                description: 'Paste your GA tracking code to enable google analytics to track this site',\n            })\n\n            addField('supportEmail', {\n                title: 'Support Email Address',\n                minimum: 0,\n                maximum: 1,\n                type: 'email',\n                placeholder:'support@yourdomain.com',\n                description: 'The default support/contact email for notifications and enquiries regarding this application',\n            })\n\n            addField('favicon', {\n                title: 'Favicon',\n                minimum: 0,\n                maximum: 1,\n                type: 'reference',\n                params:{\n                    restrictType:'image',\n                },\n                description: 'Choose an image to use for the favicon. (Recommend a 1:1 ratio and at least 1024 x 1024px)',\n            })\n\n            addField('headerInject', {\n                title: 'Header Injection Code',\n                minimum: 0,\n                maximum: 1,\n                type: 'string',\n                directive:'code',\n                params:{\n                    syntax:'html',\n                },\n                description: 'Include HTML that can be injected above the closing </head> tag',\n            })\n\n            addField('footerInject', {\n                title: 'Footer Injection Code',\n                minimum: 0,\n                maximum: 1,\n                type: 'string',\n                directive:'code',\n                params:{\n                    syntax:'html',\n                },\n                description: 'Include HTML that can be injected above the closing </body> tag',\n            })\n\n           \n\n\n\n\n            function addField(key, details) {\n                details.key = key;\n                array.push(details)\n            }\n\n            return array;\n\n        },\n    },\n    methods: {\n        modelUpdated() {\n            this.update(this.model);\n        },\n    },\n    data() {\n        return {\n\n        }\n    },\n}\n</script>\n<style scoped lang=\"scss\">\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n.hint {\n    font-size: 10px;\n    opacity: 0.5;\n    color: inherit;\n    display: block;\n}\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.hint {\n  font-size: 10px;\n  opacity: 0.5;\n  color: inherit;\n  display: block;\n}\n\n/*# sourceMappingURL=application.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$1 = "data-v-6dc922a2";
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$1 = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__$1,
    __vue_script__,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    __vue_create_injector__,
    undefined,
    undefined
  );

export default __vue_component__$1;
//# sourceMappingURL=application-b10a313b.js.map
