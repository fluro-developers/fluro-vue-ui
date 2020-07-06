
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { aH as FluroRealmSelect, aG as FluroContentSelectButton, bo as _, bm as __vue_normalize__, bn as __vue_create_injector__ } from './index-8e9c5075.js';
import 'vue';

//

var script = {
  components: {
    FluroRealmSelect,
    FluroContentSelectButton
  },
  mixins: [],
  props: {
    'value': {
      type: Array,
      default: function () {
        return [];
      }
    }
  },

  data() {
    return {
      model: JSON.parse(JSON.stringify(this.value)),
      loading: true,
      proposed: {
        roles: [],
        realms: []
      }
    };
  },

  computed: {
    canEditRoles() {
      return this.$fluro.access.can('edit', 'role');
    },

    valid() {
      if (!this.proposed.roles || !this.proposed.roles.length) {
        return;
      }

      if (!this.proposed.realms || !this.proposed.realms.length) {
        return;
      }

      return true;
    }

  },
  asyncComputed: {// policies: {
    //     default: [],
    //     get() {
    //         var self = this;
    //         return new Promise(function(resolve, reject) {
    //             self.$fluro.api.get('/content/policy')
    //                 .then(function(res) {
    //                     resolve(res.data);
    //                     self.loading = false;
    //                 })
    //                 .catch(function(err) {
    //                     reject(err);
    //                     self.loading = false;
    //                 })
    //         })
    //     }
    // }
  },
  watch: {
    'value': function (val) {
      //Set the value so update the selection
      this.model = val;
    },
    'model': function () {
      var self = this; //Emit the change

      this.$emit('input', self.model);
    }
  },
  methods: {
    editRole(role) {
      this.$fluro.global.edit(role, true).then(function (res) {
        _.assign(res, role);
      });
    },

    add() {
      console.log('ADD');
      var copy = JSON.parse(JSON.stringify(this.proposed));
      this.model.push(copy); // this.model.splice(index, 1);

      this.proposed = {
        realms: [],
        roles: []
      };
    },

    remove(entry) {
      var index = this.model.indexOf(entry);
      this.model.splice(index, 1);
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
    "div",
    { staticClass: "permission-select" },
    [
      _vm.model.length
        ? [
            _c("table", { staticClass: "table" }, [
              _vm._m(0),
              _vm._v(" "),
              _c(
                "tbody",
                _vm._l(_vm.model, function(entry) {
                  return _c("tr", [
                    _c(
                      "td",
                      _vm._l(entry.roles, function(role) {
                        return _c(
                          "div",
                          [
                            _c("fluro-icon", {
                              attrs: { type: "role", left: "" }
                            }),
                            _vm._v(" "),
                            _c("strong", [_vm._v(_vm._s(role.title))]),
                            _vm._v(" "),
                            _vm.canEditRoles
                              ? _c(
                                  "v-btn",
                                  {
                                    attrs: { icon: "", small: "" },
                                    on: {
                                      click: function($event) {
                                        return _vm.editRole(role)
                                      }
                                    }
                                  },
                                  [
                                    _c("fluro-icon", {
                                      attrs: { icon: "pencil" }
                                    })
                                  ],
                                  1
                                )
                              : _vm._e()
                          ],
                          1
                        )
                      }),
                      0
                    ),
                    _vm._v(" "),
                    _c(
                      "td",
                      _vm._l(entry.realms, function(realm) {
                        return _c(
                          "div",
                          [
                            _c("fluro-icon", {
                              style: { color: realm.bgColor },
                              attrs: { icon: "circle", library: "fas" }
                            }),
                            _vm._v(
                              " " +
                                _vm._s(realm.title) +
                                "\n                        "
                            )
                          ],
                          1
                        )
                      }),
                      0
                    ),
                    _vm._v(" "),
                    _c(
                      "td",
                      { staticClass: "text-xs-right" },
                      [
                        _c(
                          "v-btn",
                          {
                            staticClass: "ma-0",
                            attrs: { small: "", icon: "" },
                            on: {
                              click: function($event) {
                                return _vm.remove(entry)
                              }
                            }
                          },
                          [_c("fluro-icon", { attrs: { icon: "times" } })],
                          1
                        )
                      ],
                      1
                    )
                  ])
                }),
                0
              )
            ])
          ]
        : _vm._e(),
      _vm._v(" "),
      _c(
        "fluro-card",
        [
          _c("fluro-card-title", { staticClass: "border-bottom" }, [
            _c("h5", [_vm._v("Add permissions")]),
            _vm._v(" "),
            _c("p", { staticClass: "help-block" }, [
              _vm._v(
                "\n                Select a combination of roles and realms then click add to grant permissions.\n            "
              )
            ])
          ]),
          _vm._v(" "),
          _c(
            "fluro-card-body",
            [
              _c(
                "v-container",
                { staticClass: "grid-list-md", attrs: { "pa-0": "" } },
                [
                  _c(
                    "v-layout",
                    { attrs: { row: "", wrap: "" } },
                    [
                      _c(
                        "v-flex",
                        { attrs: { xs12: "", md4: "" } },
                        [
                          _c(
                            "v-input",
                            { staticClass: "no-flex" },
                            [
                              _c("v-label", [_vm._v("Select a Role")]),
                              _vm._v(" "),
                              _c("p", { staticClass: "help-block" }, [
                                _vm._v("Select a role")
                              ]),
                              _vm._v(" "),
                              _c("fluro-content-select-button", {
                                attrs: {
                                  block: "",
                                  type: "role",
                                  allDefinitions: true,
                                  searchInheritable: true
                                },
                                model: {
                                  value: _vm.proposed.roles,
                                  callback: function($$v) {
                                    _vm.$set(_vm.proposed, "roles", $$v);
                                  },
                                  expression: "proposed.roles"
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
                        "v-flex",
                        { attrs: { xs12: "", md5: "" } },
                        [
                          _c(
                            "v-input",
                            { staticClass: "no-flex" },
                            [
                              _c("v-label", [_vm._v("Select a Realm")]),
                              _vm._v(" "),
                              _c("p", { staticClass: "help-block" }, [
                                _vm._v("Select where this role can be used")
                              ]),
                              _vm._v(" "),
                              _c("fluro-realm-select", {
                                attrs: { block: "" },
                                model: {
                                  value: _vm.proposed.realms,
                                  callback: function($$v) {
                                    _vm.$set(_vm.proposed, "realms", $$v);
                                  },
                                  expression: "proposed.realms"
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
                        "v-flex",
                        { attrs: { xs12: "", md3: "" } },
                        [
                          _c(
                            "v-input",
                            { staticClass: "no-flex" },
                            [
                              _vm.$vuetify.breakpoint.mdAndUp
                                ? [
                                    _c("v-label", [_vm._v(" ")]),
                                    _vm._v(" "),
                                    _c("p", { staticClass: "help-block" }, [
                                      _vm._v(" ")
                                    ])
                                  ]
                                : _vm._e(),
                              _vm._v(" "),
                              _c(
                                "v-btn",
                                {
                                  staticClass: "ma-0",
                                  attrs: {
                                    disabled: !_vm.valid,
                                    block: "",
                                    color: "primary"
                                  },
                                  on: { click: _vm.add }
                                },
                                [
                                  _vm._v(
                                    "\n                            Add\n                            "
                                  ),
                                  _c("fluro-icon", {
                                    attrs: { right: "", icon: "plus" }
                                  })
                                ],
                                1
                              )
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
        ],
        1
      )
    ],
    2
  )
};
var __vue_staticRenderFns__ = [
  function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("thead", [
      _c("tr", [
        _c("th", { staticClass: "column" }, [_vm._v("Role")]),
        _vm._v(" "),
        _c("th", { staticClass: "column" }, [_vm._v("Realms")]),
        _vm._v(" "),
        _c("th", [_vm._v(" ")])
      ])
    ])
  }
];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-06d11538_0", { source: "/**/\n.border-top[data-v-06d11538] {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right[data-v-06d11538] {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom[data-v-06d11538] {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left[data-v-06d11538] {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.table[data-v-06d11538] {\n  background: #fff;\n  width: 100%;\n  border-collapse: collapse;\n  padding: 0;\n  margin: 0;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);\n  margin-bottom: 25px;\n}\n.table thead[data-v-06d11538] {\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n  font-weight: 500;\n  font-size: 12px;\n}\n.table th[data-v-06d11538],\n.table td[data-v-06d11538] {\n  padding: 10px;\n  text-align: left;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n  vertical-align: middle;\n}\n.table th.column[data-v-06d11538],\n.table td.column[data-v-06d11538] {\n  width: 50%;\n}\n.table th[data-v-06d11538] {\n  background: rgba(0, 0, 0, 0.05);\n}\n\n/*# sourceMappingURL=FluroPermissionSelect.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/form/FluroPermissionSelect.vue","FluroPermissionSelect.vue"],"names":[],"mappings":"AAgPA,GAAA;AAYA;EACA,yCAAA;AC1PA;AD6PA;EACA,2CAAA;AC1PA;AD6PA;EACA,4CAAA;AC1PA;AD6PA;EACA,0CAAA;AC1PA;;ADkQA,GAAA;AACA;EACA,gBAAA;EACA,WAAA;EACA,yBAAA;EACA,UAAA;EACA,SAAA;EACA,oCAAA;EACA,wCAAA;EACA,mBAAA;AC/PA;ADiQA;EACA,yBAAA;EACA,sBAAA;EACA,gBAAA;EACA,eAAA;AC/PA;ADkQA;;EAEA,aAAA;EACA,gBAAA;EACA,2CAAA;EACA,sBAAA;AChQA;ADkQA;;EACA,UAAA;AC/PA;ADmQA;EACA,+BAAA;ACjQA;;AAEA,oDAAoD","file":"FluroPermissionSelect.vue","sourcesContent":["<template>\n    <div class=\"permission-select\">\n        <!-- <pre>{{model}}</pre> -->\n        <template v-if=\"model.length\">\n            <table class=\"table\">\n                <thead>\n                    <tr>\n                        <th class=\"column\">Role</th>\n                        <th class=\"column\">Realms</th>\n                        <th>&nbsp;</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    <tr v-for=\"entry in model\">\n                        <td>\n                            <!-- @click=\"$actions.open([role])\" -->\n                            <div v-for=\"role in entry.roles\">\n                                <fluro-icon type=\"role\" left /> <strong>{{role.title}}</strong> <v-btn icon small v-if=\"canEditRoles\" @click=\"editRole(role)\"><fluro-icon icon=\"pencil\"/></v-btn>\n                            </div>\n                        </td>\n                        <td>\n                            <!-- @click=\"$actions.open([realm])\" -->\n                            <div v-for=\"realm in entry.realms\">\n                                <fluro-icon icon=\"circle\" library=\"fas\" :style=\"{color:realm.bgColor}\" /> {{realm.title}}\n                            </div>\n                            <!-- <fluro-realm-tags :realms=\"entry.realms\" /> -->\n                        </td>\n                        <td class=\"text-xs-right\">\n                            <v-btn class=\"ma-0\" small icon @click=\"remove(entry)\">\n                                <fluro-icon icon=\"times\" />\n                            </v-btn>\n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n        </template>\n        <fluro-card>\n            <fluro-card-title class=\"border-bottom\">\n                <h5>Add permissions</h5>\n                <!-- <v-label>Add permissions</v-label> -->\n                <p class=\"help-block\">\n                    Select a combination of roles and realms then click add to grant permissions.\n                </p>\n            </fluro-card-title>\n            <fluro-card-body>\n                <v-container pa-0 class=\"grid-list-md\">\n                <!-- <v-input class=\"no-flex\"> -->\n                <v-layout row wrap>\n                    <v-flex xs12 md4>\n                        <v-input class=\"no-flex\">\n                            <v-label>Select a Role</v-label>\n                            <p class=\"help-block\">Select a role</p>\n                            <fluro-content-select-button block type=\"role\" :allDefinitions=\"true\" :searchInheritable=\"true\" v-model=\"proposed.roles\" />\n                        </v-input>\n                    </v-flex>\n                    <v-flex xs12 md5>\n                        <v-input class=\"no-flex\">\n                            <v-label>Select a Realm</v-label>\n                            <p class=\"help-block\">Select where this role can be used</p>\n                            <!-- :type=\"typeName\" :definition=\"definitionName\" -->\n                            <fluro-realm-select block v-model=\"proposed.realms\" />\n                        </v-input>\n                    </v-flex>\n                    <v-flex xs12 md3>\n                        <v-input class=\"no-flex\">\n                            <template v-if=\"$vuetify.breakpoint.mdAndUp\">\n                            <v-label>&nbsp;</v-label>\n                            <p class=\"help-block\">&nbsp;</p>\n                            </template>\n                            <v-btn class=\"ma-0\" :disabled=\"!valid\" block color=\"primary\" @click=\"add\">\n                                Add\n                                <fluro-icon right icon=\"plus\" />\n                            </v-btn>\n                        </v-input>\n                    </v-flex>\n                </v-layout>\n            </v-container>\n                <!-- </v-input> -->\n            </fluro-card-body>\n        </fluro-card>\n        <!-- <v-input class=\"no-flex\" v-if=\"selected.length\">\n            <h5 margin>{{selected.length}} selected</h5>\n            <list-group>\n                <transition-group type=\"transition\" :name=\"!drag ? 'flip-list' : null\">\n                    <list-group-item :key=\"pass._id\" v-for=\"pass in selected\">\n                        <template v-slot:left>\n                            <fluro-realm-bar :realm=\"pass.realms\" />\n                        </template>\n                        <template v-slot:default>\n                            <strong>{{pass.title}}</strong>\n                            <div class=\"muted sm\">{{pass.description}}</div>\n                        </template>\n                        <template v-slot:right>\n                            <v-btn class=\"ma-0\" small icon @click=\"deselect(pass)\">\n                                <fluro-icon icon=\"times\" />\n                            </v-btn>\n                        </template>\n                    </list-group-item>\n                </transition-group>\n            </list-group>\n        </v-input>\n        <p></p>\n        <v-input class=\"no-flex\">\n            <h5>Available passes</h5>\n            <p class=\"help-block\">Add passes to {{contextName}} by selecting from available passes below</p>\n            <list-group>\n                <transition-group type=\"transition\" :name=\"!drag ? 'flip-list' : null\">\n                <list-group-item :key=\"pass._id\" class=\"inactive\" v-for=\"pass in notSelected\">\n                    <template v-slot:left>\n                        <fluro-realm-bar :realm=\"pass.realms\" />\n                    </template>\n                    <template v-slot:default>\n                        <strong>{{pass.title}}</strong>\n                        <div class=\"muted sm\">{{pass.description}}</div>\n                    </template>\n                    <template v-slot:right>\n                        <v-btn class=\"ma-0\" color=\"primary\" small @click=\"select(pass)\">\n                            Add\n                            <fluro-icon right icon=\"plus\" />\n                        </v-btn>\n                    </template>\n                </list-group-item>\n                </transition-group>\n            </list-group>\n        </v-input> -->\n    </div>\n</template>\n<script>\nimport Vue from 'vue';\nimport _ from 'lodash';\n\nimport FluroRealmSelect from 'src/components/form/realmselect/FluroRealmSelect.vue';\nimport FluroContentSelectButton from 'src/components/form/contentselect/FluroContentSelectButton.vue';\n\n///////////////////////////////////////////////\n\nexport default {\n    components: {\n        FluroRealmSelect,\n        FluroContentSelectButton,\n    },\n    mixins: [],\n    props: {\n        'value': {\n            type: Array,\n            default: function() {\n                return [];\n            },\n        },\n    },\n    data() {\n        return {\n            model: JSON.parse(JSON.stringify(this.value)),\n            loading: true,\n            proposed: {\n                roles: [],\n                realms: [],\n            },\n        }\n    },\n    computed: {\n    \tcanEditRoles() {\n    \t\treturn this.$fluro.access.can('edit', 'role');\n    \t},\n        valid() {\n            if (!this.proposed.roles || !this.proposed.roles.length) {\n                return;\n            }\n\n            if (!this.proposed.realms || !this.proposed.realms.length) {\n                return;\n            }\n\n            return true;\n        },\n    },\n    asyncComputed: {\n        // policies: {\n        //     default: [],\n        //     get() {\n\n        //         var self = this;\n\n        //         return new Promise(function(resolve, reject) {\n        //             self.$fluro.api.get('/content/policy')\n        //                 .then(function(res) {\n        //                     resolve(res.data);\n        //                     self.loading = false;\n        //                 })\n        //                 .catch(function(err) {\n        //                     reject(err);\n        //                     self.loading = false;\n        //                 })\n\n        //         })\n        //     }\n        // }\n    },\n\n    watch: {\n        'value': function(val) {\n            //Set the value so update the selection\n            this.model = val;\n        },\n        'model': function() {\n            var self = this;\n            //Emit the change\n            this.$emit('input', self.model);\n\n        }\n    },\n    methods: {\n    \teditRole(role) {\n    \t\tthis.$fluro.global.edit(role, true)\n    \t\t.then(function(res) {\n    \t\t\t_.assign(res, role);\n    \t\t})\n    \t},\n        add() {\n            console.log('ADD')\n            var copy = JSON.parse(JSON.stringify(this.proposed));\n            this.model.push(copy);\n            // this.model.splice(index, 1);\n\n            this.proposed = {\n                realms: [],\n                roles: [],\n            }\n\n\n        },\n        remove(entry) {\n            var index = this.model.indexOf(entry);\n            this.model.splice(index, 1);\n        }\n    }\n}\n</script>\n<style scoped lang=\"scss\">\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n.table {\n    background: #fff;\n    width: 100%;\n    border-collapse: collapse;\n    padding: 0;\n    margin: 0;\n    border: 1px solid rgba(#000, 0.1);\n    box-shadow: 0 1px 1px rgba(#000, 0.1);\n    margin-bottom: 25px;\n\n    thead {\n        text-transform: uppercase;\n        letter-spacing: 0.03em;\n        font-weight: 500;\n        font-size: 12px;\n    }\n\n    th,\n    td {\n        padding: 10px;\n        text-align: left;\n        border-bottom: 1px solid rgba(#000, 0.1);\n        vertical-align: middle;\n\n        &.column {\n            width: 50%;\n        }\n    }\n\n    th {\n        background: rgba(#000, 0.05);\n    }\n\n    tbody {}\n}\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.table {\n  background: #fff;\n  width: 100%;\n  border-collapse: collapse;\n  padding: 0;\n  margin: 0;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);\n  margin-bottom: 25px;\n}\n.table thead {\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n  font-weight: 500;\n  font-size: 12px;\n}\n.table th,\n.table td {\n  padding: 10px;\n  text-align: left;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n  vertical-align: middle;\n}\n.table th.column,\n.table td.column {\n  width: 50%;\n}\n.table th {\n  background: rgba(0, 0, 0, 0.05);\n}\n\n/*# sourceMappingURL=FluroPermissionSelect.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-06d11538";
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

export { __vue_component__ as F };
//# sourceMappingURL=FluroPermissionSelect-64cf7014.js.map
