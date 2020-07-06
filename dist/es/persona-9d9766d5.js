
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { bo as _, aq as FluroRealmDots, aG as FluroContentSelectButton, bh as FluroSelectionMixin, bm as __vue_normalize__, bn as __vue_create_injector__, g as FluroAvatarUpdate, aH as FluroRealmSelect } from './index-fe7fadd2.js';
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
import { F as FluroContentEditMixin } from './FluroContentEditMixin-fff57bfc.js';
import { F as FluroPermissionSelect } from './FluroPermissionSelect-98f98386.js';

//

var script = {
  computed: {
    contextName() {
      if (!this.host) {
        return '';
      }

      if (this.host.firstName) {
        return this.host.firstName;
      }

      return this.host.title || '';
    },

    selected() {
      var self = this;
      return _.chain(self.selection).orderBy(function (policy) {
        return policy.title;
      }).value();
    },

    notSelected() {
      var self = this;
      return _.chain(self.policies).filter(function (policy) {
        return !self.isSelected(policy);
      }).orderBy(function (policy) {
        return policy.title;
      }).value();
    }

  },
  components: {
    FluroRealmDots,
    FluroContentSelectButton
  },
  mixins: [FluroSelectionMixin],
  props: {
    'host': {
      type: Object
    },
    'value': {
      type: Array,
      default: function () {
        return [];
      }
    }
  },

  data() {
    return {
      loading: true
    };
  },

  asyncComputed: {
    policies: {
      default: [],

      get() {
        var self = this;
        return new Promise(function (resolve, reject) {
          self.$fluro.api.get('/content/policy').then(function (res) {
            resolve(res.data);
            self.loading = false;
          }).catch(function (err) {
            reject(err);
            self.loading = false;
          });
        });
      }

    }
  },

  created() {
    this.setSelection(this.value);
  },

  watch: {
    'value': function () {
      //Set the value so update the selection
      // console.log('SET SELECTION NOW', this.value)
      this.setSelection(this.value);
    },
    'selection': function () {
      var self = this; //Emit the change

      this.$emit('input', self.selection);
    }
  },
  methods: {}
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "access-pass-select" },
    [
      _vm.selected.length
        ? _c(
            "v-input",
            { staticClass: "no-flex" },
            [
              _c("h5", { attrs: { margin: "" } }, [
                _vm._v(_vm._s(_vm.selected.length) + " selected")
              ]),
              _vm._v(" "),
              _c(
                "list-group",
                [
                  _c(
                    "transition-group",
                    { attrs: { type: "transition", name: "flip-list" } },
                    _vm._l(_vm.selected, function(pass) {
                      return _c("list-group-item", {
                        key: pass._id,
                        scopedSlots: _vm._u(
                          [
                            {
                              key: "left",
                              fn: function() {
                                return [
                                  _c("fluro-realm-bar", {
                                    attrs: { realm: pass.realms }
                                  })
                                ]
                              },
                              proxy: true
                            },
                            {
                              key: "default",
                              fn: function() {
                                return [
                                  _c("strong", [_vm._v(_vm._s(pass.title))]),
                                  _vm._v(" "),
                                  _c("div", { staticClass: "muted sm" }, [
                                    _vm._v(_vm._s(pass.description))
                                  ])
                                ]
                              },
                              proxy: true
                            },
                            {
                              key: "right",
                              fn: function() {
                                return [
                                  _c(
                                    "v-btn",
                                    {
                                      staticClass: "ma-0",
                                      attrs: { small: "", icon: "" },
                                      on: {
                                        click: function($event) {
                                          return _vm.deselect(pass)
                                        }
                                      }
                                    },
                                    [
                                      _c("fluro-icon", {
                                        attrs: { icon: "times" }
                                      })
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
                      })
                    }),
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
      _c("p"),
      _vm._v(" "),
      _c(
        "v-input",
        { staticClass: "no-flex" },
        [
          _c("h5", [_vm._v("Available passes")]),
          _vm._v(" "),
          _c("p", { staticClass: "help-block" }, [
            _vm._v(
              "Add passes to " +
                _vm._s(_vm.contextName) +
                " by selecting from available passes below"
            )
          ]),
          _vm._v(" "),
          _c(
            "list-group",
            [
              _c(
                "transition-group",
                { attrs: { type: "transition", name: "flip-list" } },
                _vm._l(_vm.notSelected, function(pass) {
                  return _c("list-group-item", {
                    key: pass._id,
                    staticClass: "inactive",
                    scopedSlots: _vm._u(
                      [
                        {
                          key: "left",
                          fn: function() {
                            return [
                              _c("fluro-realm-bar", {
                                attrs: { realm: pass.realms }
                              })
                            ]
                          },
                          proxy: true
                        },
                        {
                          key: "default",
                          fn: function() {
                            return [
                              _c("strong", [_vm._v(_vm._s(pass.title))]),
                              _vm._v(" "),
                              _c("div", { staticClass: "muted sm" }, [
                                _vm._v(_vm._s(pass.description))
                              ])
                            ]
                          },
                          proxy: true
                        },
                        {
                          key: "right",
                          fn: function() {
                            return [
                              _c(
                                "v-btn",
                                {
                                  staticClass: "ma-0",
                                  attrs: { color: "primary", small: "" },
                                  on: {
                                    click: function($event) {
                                      return _vm.select(pass)
                                    }
                                  }
                                },
                                [
                                  _vm._v(
                                    "\n                        Add\n                        "
                                  ),
                                  _c("fluro-icon", {
                                    attrs: { right: "", icon: "plus" }
                                  })
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
                  })
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
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-609f6cda_0", { source: "/**/\n.border-top[data-v-609f6cda] {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right[data-v-609f6cda] {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom[data-v-609f6cda] {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left[data-v-609f6cda] {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.access-pass-select > > > .list-group-item-content[data-v-609f6cda] {\n  padding-left: 10px;\n}\n.access-pass-select .flip-list-move[data-v-609f6cda] {\n  transition: transform 0.5s;\n}\n\n/*# sourceMappingURL=FluroAccessPassSelect.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/form/FluroAccessPassSelect.vue","FluroAccessPassSelect.vue"],"names":[],"mappings":"AA+KA,GAAA;AAYA;EACA,yCAAA;ACzLA;AD4LA;EACA,2CAAA;ACzLA;AD4LA;EACA,4CAAA;ACzLA;AD4LA;EACA,0CAAA;ACzLA;;ADiMA,GAAA;AAEA;EACA,kBAAA;AC/LA;ADkMA;EACA,0BAAA;AChMA;;AAEA,oDAAoD","file":"FluroAccessPassSelect.vue","sourcesContent":["<template>\n    <div class=\"access-pass-select\">\n        <!-- <h5 margin>{{selected.length}} Access Passes</h5> -->\n\n        <!-- <pre>{{value}}</pre> -->\n        <v-input class=\"no-flex\" v-if=\"selected.length\">\n            <h5 margin>{{selected.length}} selected</h5>\n            <!-- <p class=\"help-block\">To change {{contextName}} password or email details click the button below, this will send an invitation to the user to create a new password and then login to the system</p> -->\n            <list-group>\n                <transition-group type=\"transition\" name=\"flip-list\">\n                    <list-group-item :key=\"pass._id\" v-for=\"pass in selected\">\n                        <template v-slot:left>\n                            <fluro-realm-bar :realm=\"pass.realms\" />\n                        </template>\n                        <template v-slot:default>\n                            <strong>{{pass.title}}</strong>\n                            <div class=\"muted sm\">{{pass.description}}</div>\n                        </template>\n                        <template v-slot:right>\n                            <v-btn class=\"ma-0\" small icon @click=\"deselect(pass)\">\n                                <fluro-icon icon=\"times\" />\n                            </v-btn>\n                        </template>\n                    </list-group-item>\n                </transition-group>\n            </list-group>\n        </v-input>\n        <p></p>\n\n        <!-- <fluro-content-select-button color=\"primary\" type=\"policy\" v-model=\"selection\" /> -->\n\n\n\n        <!-- <h5 margin>Available Passes</h5> -->\n        <v-input class=\"no-flex\">\n            <h5>Available passes</h5>\n            <p class=\"help-block\">Add passes to {{contextName}} by selecting from available passes below</p>\n            <list-group>\n                <transition-group type=\"transition\" name=\"flip-list\">\n                <list-group-item :key=\"pass._id\" class=\"inactive\" v-for=\"pass in notSelected\">\n                    <template v-slot:left>\n                        <fluro-realm-bar :realm=\"pass.realms\" />\n                    </template>\n                    <template v-slot:default>\n                        <strong>{{pass.title}}</strong>\n                        <div class=\"muted sm\">{{pass.description}}</div>\n                        <!-- <pre>{{pass}}</pre> -->\n                    </template>\n                    <template v-slot:right>\n                        <v-btn class=\"ma-0\" color=\"primary\" small @click=\"select(pass)\">\n                            Add\n                            <fluro-icon right icon=\"plus\" />\n                        </v-btn>\n                    </template>\n                </list-group-item>\n                </transition-group>\n            </list-group>\n        </v-input>\n    </div>\n</template>\n<script>\nimport Vue from 'vue';\nimport _ from 'lodash';\n\n\nimport FluroRealmDots from 'src/components/ui/FluroRealmDots.vue';\nimport FluroSelectionMixin from 'src/mixins/FluroSelectionMixin.js';\nimport FluroContentSelectButton from 'src/components/form/contentselect/FluroContentSelectButton.vue';\n\n///////////////////////////////////////////////\n\nexport default {\n    computed: {\n        contextName() {\n\n            if (!this.host) {\n                return ''\n            }\n\n            if (this.host.firstName) {\n                return this.host.firstName;\n            }\n\n            return this.host.title || '';\n        },\n        selected() {\n\n            var self = this;\n\n            return _.chain(self.selection)\n                .orderBy(function(policy) {\n                    return policy.title;\n                })\n                .value();\n\n        },\n        notSelected() {\n\n            var self = this;\n\n            return _.chain(self.policies)\n                .filter(function(policy) {\n                    return !self.isSelected(policy);\n                })\n                .orderBy(function(policy) {\n                    return policy.title;\n                })\n                .value();\n\n        }\n    },\n    components: {\n        FluroRealmDots,\n        FluroContentSelectButton,\n    },\n    mixins: [FluroSelectionMixin],\n    props: {\n        'host': {\n            type: Object,\n        },\n        'value': {\n            type: Array,\n            default: function() {\n                return [];\n            },\n        },\n    },\n    data() {\n        return {\n            loading: true,\n        }\n    },\n    asyncComputed: {\n        policies: {\n            default: [],\n            get() {\n\n                var self = this;\n\n                return new Promise(function(resolve, reject) {\n                    self.$fluro.api.get('/content/policy')\n                        .then(function(res) {\n                            resolve(res.data);\n                            self.loading = false;\n                        })\n                        .catch(function(err) {\n                            reject(err);\n                            self.loading = false;\n                        })\n\n                })\n            }\n        }\n    },\n    created() {\n        this.setSelection(this.value);\n    },\n    watch: {\n        'value': function() {\n            //Set the value so update the selection\n            // console.log('SET SELECTION NOW', this.value)\n            this.setSelection(this.value);\n        },\n        'selection': function() {\n            var self = this;\n            //Emit the change\n            this.$emit('input', self.selection);\n\n        }\n    },\n    methods: {}\n}\n</script>\n<style scoped lang=\"scss\">\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n.access-pass-select {\n    & >>> .list-group-item-content {\n        padding-left: 10px;\n    }\n\n    .flip-list-move {\n        transition: transform 0.5s;\n    }\n}\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.access-pass-select > > > .list-group-item-content {\n  padding-left: 10px;\n}\n.access-pass-select .flip-list-move {\n  transition: transform 0.5s;\n}\n\n/*# sourceMappingURL=FluroAccessPassSelect.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-609f6cda";
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
    fields: {
      type: Array,

      default() {
        var array = []; ///////////////////////////////////

        addField("firstName", {
          title: "First Name",
          minimum: 1,
          maximum: 1,
          type: "string",
          placeholder: "Eg. Jessica"
        });
        addField("lastName", {
          title: "Last Name",
          minimum: 1,
          maximum: 1,
          type: "string",
          placeholder: "Eg. Michaels"
        });
        addField("collectionEmail", {
          title: "Email Address",
          minimum: 1,
          maximum: 1,
          type: "string",
          description: "An invitation will be sent to this email address allowing the user to confirm and accept this persona",
          placeholder: "Eg. name@email.com"
        }); ///////////////////////////////////

        function addField(key, details) {
          details.key = key;
          array.push(details);
        }

        return array;
      }

    }
  },
  mixins: [FluroContentEditMixin],
  components: {
    FluroAccessPassSelect: __vue_component__,
    FluroPermissionSelect,
    FluroAvatarUpdate,
    FluroRealmSelect
  },
  methods: {
    modelUpdated() {
      this.update(this.model);
    },

    resetPassword() {
      var self = this;
      self.resetting = true;
      return self.$fluro.api.post(`/user/reinvite/${self.itemID}`).then(function (res) {
        self.resetting = false;
        var email = self.model.collectionEmail;

        if (self.model.user) {
          email = self.model.user.email;
        } ////////////////////////////////////


        self.$fluro.notify(`Instructions on how to reset password have been sent to ${email}`);
      }).catch(function (err) {
        self.$fluro.error(err);
        self.resetting = false;
      });
    }

  },
  watch: {
    title(val) {
      this.$set(this.model, "title", this.title);
      this.update(this.model);
    }

  },

  created() {
    var self = this;

    if (!self.model.policies) {
      self.model.policies = [];
    }
  },

  asyncComputed: {},
  computed: {
    title() {
      if (!this.model) {
        return "";
      }

      if (this.model.firstName) {
        return `${this.model.firstName} ${this.model.lastName || ""}`;
      }

      return "";
    },

    contextName() {
      var name = this.model.firstName;

      if (!name || !name.length) {
        return "";
      }

      if (this.model.user) {
        name = `${this.model.user.firstName}`;
      }

      if (_.endsWith(name, "s")) {
        return `${name}'`;
      }

      return `${name}'s`;
    },

    showOutline() {
      return false; //true; //false;//true;//false;//true;
    }

  },

  data() {
    return {
      resetting: false
    };
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
    "flex-column",
    [
      _vm.loading
        ? [_c("fluro-page-preloader", { attrs: { contain: "" } })]
        : _c(
            "tabset",
            {
              attrs: { justified: true, vertical: true },
              scopedSlots: _vm._u([
                {
                  key: "menuprefix",
                  fn: function() {
                    return [
                      _vm.context == "edit" && _vm.$vuetify.breakpoint.smAndUp
                        ? [
                            _c(
                              "flex-column-header",
                              { staticStyle: { "text-align": "center" } },
                              [
                                _c(
                                  "div",
                                  {
                                    staticStyle: {
                                      padding: "10px",
                                      "max-width": "200px",
                                      margin: "auto"
                                    }
                                  },
                                  [
                                    _c("fluro-avatar-update", {
                                      attrs: {
                                        id: _vm.model._id,
                                        type: "persona"
                                      }
                                    })
                                  ],
                                  1
                                )
                              ]
                            )
                          ]
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
                { attrs: { heading: "Login Details" } },
                [
                  _vm._t("default", [
                    _c(
                      "flex-column-body",
                      { staticStyle: { background: "#fafafa" } },
                      [
                        _c(
                          "v-container",
                          { staticClass: "grid-list-xl" },
                          [
                            _c(
                              "constrain",
                              { attrs: { sm: "" } },
                              [
                                _vm.$vuetify.breakpoint.xsOnly
                                  ? [
                                      _vm.context == "edit"
                                        ? [
                                            _c(
                                              "div",
                                              {
                                                staticStyle: {
                                                  "max-width": "200px",
                                                  margin: "auto"
                                                }
                                              },
                                              [
                                                _c("fluro-avatar-update", {
                                                  attrs: {
                                                    id: _vm.model._id,
                                                    type: "persona"
                                                  }
                                                })
                                              ],
                                              1
                                            )
                                          ]
                                        : _vm._e()
                                    ]
                                  : _vm._e(),
                                _vm._v(" "),
                                _vm.model.user
                                  ? [
                                      _c(
                                        "v-layout",
                                        { attrs: { row: "", wrap: "" } },
                                        [
                                          _c(
                                            "v-flex",
                                            { attrs: { xs12: "", sm6: "" } },
                                            [
                                              _c(
                                                "v-input",
                                                { staticClass: "no-flex" },
                                                [
                                                  _c("v-label", [
                                                    _vm._v("First Name")
                                                  ]),
                                                  _vm._v(" "),
                                                  _c(
                                                    "Div",
                                                    { staticClass: "lead" },
                                                    [
                                                      _vm._v(
                                                        _vm._s(
                                                          _vm.model.user
                                                            .firstName
                                                        )
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
                                            "v-flex",
                                            { attrs: { xs12: "", sm6: "" } },
                                            [
                                              _c(
                                                "v-input",
                                                { staticClass: "no-flex" },
                                                [
                                                  _c("v-label", [
                                                    _vm._v("Last Name")
                                                  ]),
                                                  _vm._v(" "),
                                                  _c(
                                                    "Div",
                                                    { staticClass: "lead" },
                                                    [
                                                      _vm._v(
                                                        _vm._s(
                                                          _vm.model.user
                                                            .lastName
                                                        )
                                                      )
                                                    ]
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
                                        "v-input",
                                        { staticClass: "no-flex" },
                                        [
                                          _c("v-label", [
                                            _vm._v("Email Address")
                                          ]),
                                          _vm._v(" "),
                                          _c("Div", { staticClass: "lead" }, [
                                            _vm._v(_vm._s(_vm.model.user.email))
                                          ])
                                        ],
                                        1
                                      ),
                                      _vm._v(" "),
                                      _c("p"),
                                      _vm._v(" "),
                                      _c("p"),
                                      _vm._v(" "),
                                      _c(
                                        "v-input",
                                        { staticClass: "no-flex" },
                                        [
                                          _c("v-label", [
                                            _vm._v("Change User Details")
                                          ]),
                                          _vm._v(" "),
                                          _c(
                                            "p",
                                            { staticClass: "help-block" },
                                            [
                                              _vm._v(
                                                "\n                                        To change " +
                                                  _vm._s(_vm.contextName) +
                                                  " password\n                                        or email details click the button\n                                        below, this will send an invitation\n                                        to the user to create a new password\n                                        and then login to the system\n                                    "
                                              )
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "v-btn",
                                            {
                                              staticClass: "mx-0",
                                              attrs: {
                                                color: "primary",
                                                loading: _vm.resetting
                                              },
                                              on: { click: _vm.resetPassword }
                                            },
                                            [
                                              _vm._v(
                                                "\n                                        Send Password Reset Request\n                                        "
                                              ),
                                              _c("fluro-icon", {
                                                attrs: {
                                                  right: "",
                                                  icon: "paper-plane"
                                                }
                                              })
                                            ],
                                            1
                                          )
                                        ],
                                        1
                                      )
                                    ]
                                  : [
                                      _c("h3", { attrs: { margin: "" } }, [
                                        _vm._v("Basic Details")
                                      ]),
                                      _vm._v(" "),
                                      _c(
                                        "v-layout",
                                        { attrs: { row: "", wrap: "" } },
                                        [
                                          _c(
                                            "v-flex",
                                            { attrs: { xs12: "", sm6: "" } },
                                            [
                                              _c("fluro-content-form-field", {
                                                attrs: {
                                                  autofocus: true,
                                                  "form-fields": _vm.formFields,
                                                  outline: _vm.showOutline,
                                                  options: _vm.options,
                                                  field: _vm.fieldHash.firstName
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
                                            { attrs: { xs12: "", sm6: "" } },
                                            [
                                              _c("fluro-content-form-field", {
                                                attrs: {
                                                  "form-fields": _vm.formFields,
                                                  outline: _vm.showOutline,
                                                  options: _vm.options,
                                                  field: _vm.fieldHash.lastName
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
                                          field: _vm.fieldHash.collectionEmail
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
                                      _vm.model._id
                                        ? _c(
                                            "v-btn",
                                            {
                                              staticClass: "mx-0",
                                              attrs: {
                                                color: "primary",
                                                loading: _vm.resetting
                                              },
                                              on: { click: _vm.resetPassword }
                                            },
                                            [
                                              _vm._v(
                                                "\n                                        Resend invitation\n                                        "
                                              ),
                                              _c("fluro-icon", {
                                                attrs: {
                                                  right: "",
                                                  icon: "paper-plane"
                                                }
                                              })
                                            ],
                                            1
                                          )
                                        : _vm._e()
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
                  ])
                ],
                2
              ),
              _vm._v(" "),
              _c(
                "tab",
                { attrs: { heading: "Access Passes" } },
                [
                  _vm._t("default", [
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
                                _c("h3", { attrs: { margin: "" } }, [
                                  _vm._v(
                                    _vm._s(_vm.contextName) + " Access Passes"
                                  )
                                ]),
                                _vm._v(" "),
                                _c("fluro-access-pass-select", {
                                  attrs: { host: _vm.model },
                                  on: { input: _vm.modelUpdated },
                                  model: {
                                    value: _vm.model.policies,
                                    callback: function($$v) {
                                      _vm.$set(_vm.model, "policies", $$v);
                                    },
                                    expression: "model.policies"
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
              ),
              _vm._v(" "),
              _c(
                "tab",
                { attrs: { heading: "Individual Permissions" } },
                [
                  _vm._t("default", [
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
                                _c("h3", { attrs: { margin: "" } }, [
                                  _vm._v(
                                    "\n                                " +
                                      _vm._s(_vm.contextName) +
                                      " Individual Permissions\n                            "
                                  )
                                ]),
                                _vm._v(" "),
                                _c("fluro-permission-select", {
                                  on: { input: _vm.modelUpdated },
                                  model: {
                                    value: _vm.model.permissionSets,
                                    callback: function($$v) {
                                      _vm.$set(_vm.model, "permissionSets", $$v);
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
                  ])
                ],
                2
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
    inject("data-v-f1e1b1d4_0", { source: "/**/\n.border-top[data-v-f1e1b1d4] {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right[data-v-f1e1b1d4] {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom[data-v-f1e1b1d4] {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left[data-v-f1e1b1d4] {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.hint[data-v-f1e1b1d4] {\n  font-size: 10px;\n  opacity: 0.5;\n  color: inherit;\n  display: block;\n}\n.bordered[data-v-f1e1b1d4] {\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.bordered > > > .tabset-menu[data-v-f1e1b1d4] {\n  background: #eee;\n}\n\n/*# sourceMappingURL=persona.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/edit/panels/persona.vue","persona.vue"],"names":[],"mappings":"AAqVA,GAAA;AAYA;EACA,yCAAA;AC/VA;ADkWA;EACA,2CAAA;AC/VA;ADkWA;EACA,4CAAA;AC/VA;ADkWA;EACA,0CAAA;AC/VA;;ADuWA,GAAA;AACA;EACA,eAAA;EACA,YAAA;EACA,cAAA;EACA,cAAA;ACpWA;ADuWA;EACA,oCAAA;EACA,wCAAA;ACpWA;ADsWA;EACA,gBAAA;ACpWA;;AAEA,sCAAsC","file":"persona.vue","sourcesContent":["<template>\n    <flex-column>\n        <template v-if=\"loading\">\n            <fluro-page-preloader contain />\n        </template>\n        <tabset v-else :justified=\"true\" :vertical=\"true\">\n            <template v-slot:menuprefix>\n                <template\n                    v-if=\"context == 'edit' && $vuetify.breakpoint.smAndUp\"\n                >\n                    <flex-column-header style=\"text-align:center\">\n                        <div\n                            style=\"padding: 10px;max-width:200px;margin: auto;\"\n                        >\n                            <fluro-avatar-update\n                                :id=\"model._id\"\n                                type=\"persona\"\n                            />\n                        </div>\n                    </flex-column-header>\n                </template>\n            </template>\n            <tab heading=\"Login Details\">\n                <slot>\n                    <flex-column-body style=\"background: #fafafa;\">\n                        <v-container class=\"grid-list-xl\">\n                            <constrain sm>\n                                <!--  -->\n                                <template v-if=\"$vuetify.breakpoint.xsOnly\">\n                                    <template v-if=\"context == 'edit'\">\n                                        <div\n                                            style=\"max-width:200px;margin: auto;\"\n                                        >\n                                            <fluro-avatar-update\n                                                :id=\"model._id\"\n                                                type=\"persona\"\n                                            />\n                                        </div>\n                                    </template>\n                                </template>\n                                <template v-if=\"model.user\">\n                                    <v-layout row wrap>\n                                        <v-flex xs12 sm6>\n                                            <v-input class=\"no-flex\">\n                                                <v-label>First Name</v-label>\n                                                <Div class=\"lead\">{{\n                                                    model.user.firstName\n                                                }}</Div>\n                                            </v-input>\n                                        </v-flex>\n                                        <v-flex xs12 sm6>\n                                            <v-input class=\"no-flex\">\n                                                <v-label>Last Name</v-label>\n                                                <Div class=\"lead\">{{\n                                                    model.user.lastName\n                                                }}</Div>\n                                            </v-input>\n                                        </v-flex>\n                                    </v-layout>\n                                    <v-input class=\"no-flex\">\n                                        <v-label>Email Address</v-label>\n                                        <Div class=\"lead\">{{\n                                            model.user.email\n                                        }}</Div>\n                                    </v-input>\n                                    <p></p>\n                                    <p></p>\n                                    <v-input class=\"no-flex\">\n                                        <v-label>Change User Details</v-label>\n                                        <p class=\"help-block\">\n                                            To change {{ contextName }} password\n                                            or email details click the button\n                                            below, this will send an invitation\n                                            to the user to create a new password\n                                            and then login to the system\n                                        </p>\n                                        <v-btn\n                                            class=\"mx-0\"\n                                            color=\"primary\"\n                                            @click=\"resetPassword\"\n                                            :loading=\"resetting\"\n                                        >\n                                            Send Password Reset Request\n                                            <fluro-icon\n                                                right\n                                                icon=\"paper-plane\"\n                                            />\n                                        </v-btn>\n                                        <!-- <fluro-academic-select :form-fields=\"formFields\" :outline=\"showOutline\" :options=\"options\" @calendar=\"updateAcademicCalendar\" @grade=\"updateAcademicGrade\" v-model=\"model\" /> -->\n                                        <!-- </fluro-academic-select> -->\n                                    </v-input>\n                                </template>\n                                <template v-else>\n                                    <h3 margin>Basic Details</h3>\n                                    <v-layout row wrap>\n                                        <v-flex xs12 sm6>\n                                            <fluro-content-form-field\n                                                :autofocus=\"true\"\n                                                :form-fields=\"formFields\"\n                                                :outline=\"showOutline\"\n                                                @input=\"update\"\n                                                :options=\"options\"\n                                                :field=\"fieldHash.firstName\"\n                                                v-model=\"model\"\n                                            ></fluro-content-form-field>\n                                        </v-flex>\n                                        <v-flex xs12 sm6>\n                                            <fluro-content-form-field\n                                                :form-fields=\"formFields\"\n                                                :outline=\"showOutline\"\n                                                @input=\"update\"\n                                                :options=\"options\"\n                                                :field=\"fieldHash.lastName\"\n                                                v-model=\"model\"\n                                            ></fluro-content-form-field>\n                                        </v-flex>\n                                    </v-layout>\n                                    <fluro-content-form-field\n                                        :form-fields=\"formFields\"\n                                        :outline=\"showOutline\"\n                                        @input=\"update\"\n                                        :options=\"options\"\n                                        :field=\"fieldHash.collectionEmail\"\n                                        v-model=\"model\"\n                                    ></fluro-content-form-field>\n\n\n                                    <v-btn v-if=\"model._id\"\n                                            class=\"mx-0\"\n                                            color=\"primary\"\n                                            @click=\"resetPassword\"\n                                            :loading=\"resetting\"\n                                        >\n                                            Resend invitation\n                                            <fluro-icon\n                                                right\n                                                icon=\"paper-plane\"\n                                            />\n                                        </v-btn>\n                                </template>\n                            </constrain>\n                        </v-container>\n                    </flex-column-body>\n                </slot>\n            </tab>\n            <tab :heading=\"`Access Passes`\">\n                <slot>\n                    <flex-column-body style=\"background: #fafafa;\">\n                        <v-container grid-list-xl>\n                            <constrain sm>\n                                <h3 margin>{{ contextName }} Access Passes</h3>\n                                <fluro-access-pass-select\n                                    @input=\"modelUpdated\"\n                                    :host=\"model\"\n                                    v-model=\"model.policies\"\n                                />\n                            </constrain>\n                        </v-container>\n                    </flex-column-body>\n                </slot>\n            </tab>\n            <tab :heading=\"`Individual Permissions`\">\n                <slot>\n                    <flex-column-body style=\"background: #fafafa;\">\n                        <v-container grid-list-xl>\n                            <constrain sm>\n                                <h3 margin>\n                                    {{ contextName }} Individual Permissions\n                                </h3>\n                                <!-- <pre>{{model.permissionSets}}</pre> -->\n                                <fluro-permission-select\n                                    @input=\"modelUpdated\"\n                                    v-model=\"model.permissionSets\"\n                                />\n                            </constrain>\n                        </v-container>\n                    </flex-column-body>\n                </slot>\n            </tab>\n        </tabset>\n    </flex-column>\n</template>\n<script>\n/////////////////////////////////\n\nimport FluroRealmSelect from \"src/components/form/realmselect/FluroRealmSelect.vue\";\nimport FluroContentEditMixin from \"src/components/content/edit/FluroContentEditMixin.js\";\nimport FluroAccessPassSelect from \"src/components/form/FluroAccessPassSelect.vue\";\nimport FluroPermissionSelect from \"src/components/form/FluroPermissionSelect.vue\";\nimport FluroAvatarUpdate from \"src/components/FluroAvatarUpdate.vue\";\n\n/////////////////////////////////\n\nimport Vue from \"vue\";\nimport _ from 'lodash';\n\n/////////////////////////////////\n\nexport default {\n    props: {\n        fields: {\n            type: Array,\n            default() {\n                var self = this;\n                var array = [];\n\n                ///////////////////////////////////\n\n                addField(\"firstName\", {\n                    title: \"First Name\",\n                    minimum: 1,\n                    maximum: 1,\n                    type: \"string\",\n                    placeholder: \"Eg. Jessica\"\n                });\n\n                addField(\"lastName\", {\n                    title: \"Last Name\",\n                    minimum: 1,\n                    maximum: 1,\n                    type: \"string\",\n                    placeholder: \"Eg. Michaels\"\n                });\n\n                addField(\"collectionEmail\", {\n                    title: \"Email Address\",\n                    minimum: 1,\n                    maximum: 1,\n                    type: \"string\",\n                    description:\n                        \"An invitation will be sent to this email address allowing the user to confirm and accept this persona\",\n                    placeholder: \"Eg. name@email.com\"\n                });\n\n                ///////////////////////////////////\n\n                function addField(key, details) {\n                    details.key = key;\n                    array.push(details);\n                }\n\n                return array;\n            }\n        }\n    },\n    mixins: [FluroContentEditMixin],\n    components: {\n        FluroAccessPassSelect,\n        FluroPermissionSelect,\n        FluroAvatarUpdate,\n\n        FluroRealmSelect\n    },\n    methods: {\n        modelUpdated() {\n            this.update(this.model);\n        },\n        resetPassword() {\n            var self = this;\n            self.resetting = true;\n\n            return self.$fluro.api\n                .post(`/user/reinvite/${self.itemID}`)\n                .then(function(res) {\n                    self.resetting = false;\n\n                    var email = self.model.collectionEmail;\n\n                    if (self.model.user) {\n                        email = self.model.user.email;\n                    }\n\n                    ////////////////////////////////////\n\n                    self.$fluro.notify(\n                        `Instructions on how to reset password have been sent to ${email}`\n                    );\n                })\n                .catch(function(err) {\n                    self.$fluro.error(err);\n                    self.resetting = false;\n                });\n        }\n    },\n    watch: {\n        title(val) {\n            this.$set(this.model, \"title\", this.title);\n            this.update(this.model);\n        }\n    },\n    created() {\n        var self = this;\n\n        if (!self.model.policies) {\n            self.model.policies = [];\n        }\n    },\n    asyncComputed: {},\n    computed: {\n        title() {\n            if (!this.model) {\n                return \"\";\n            }\n\n            if (this.model.firstName) {\n                return `${this.model.firstName} ${this.model.lastName || \"\"}`;\n            }\n\n            return \"\";\n        },\n        contextName() {\n            var self = this;\n\n            var name = this.model.firstName;\n\n            if (!name || !name.length) {\n                return \"\";\n            }\n\n            if (this.model.user) {\n                name = `${this.model.user.firstName}`;\n            }\n\n            if (_.endsWith(name, \"s\")) {\n                return `${name}'`;\n            }\n            return `${name}'s`;\n        },\n        showOutline() {\n            return false; //true; //false;//true;//false;//true;\n        }\n    },\n    data() {\n        return {\n            resetting: false\n        };\n    }\n};\n</script>\n<style scoped lang=\"scss\">\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n.hint {\n    font-size: 10px;\n    opacity: 0.5;\n    color: inherit;\n    display: block;\n}\n\n.bordered {\n    border: 1px solid rgba(#000, 0.1);\n    box-shadow: 0 2px 4px rgba(#000, 0.1);\n\n    & >>> .tabset-menu {\n        background: #eee;\n    }\n}\n</style>\n","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.hint {\n  font-size: 10px;\n  opacity: 0.5;\n  color: inherit;\n  display: block;\n}\n\n.bordered {\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.bordered > > > .tabset-menu {\n  background: #eee;\n}\n\n/*# sourceMappingURL=persona.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$1 = "data-v-f1e1b1d4";
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

export default __vue_component__$1;
//# sourceMappingURL=persona-9d9766d5.js.map
