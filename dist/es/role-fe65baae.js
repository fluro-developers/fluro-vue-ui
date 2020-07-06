
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { a9 as FluroToggleItem, S as SearchInput, bo as _, bm as __vue_normalize__, bn as __vue_create_injector__ } from './index-8acbfb0b.js';
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
import { F as FluroContentEditMixin } from './FluroContentEditMixin-7de338fe.js';

//

var script = {
  components: {
    FluroToggleItem,
    SearchInput // FluroEditor,

  },

  created() {
    if (this.model._id) {
      this.tabIndex = 1;
    }
  },

  data() {
    return {
      tabIndex: 0,
      search: '',
      loadingPermissions: true
    };
  },

  mixins: [FluroContentEditMixin],
  methods: {
    of(type) {
      var total = type.permissions.length;
      var activated = this.enabled(type);
      return activated.length ? `${activated.length} / ${total}` : '';
    },

    enabled(type) {
      var self = this;

      var values = _.map(type.permissions, 'value');

      return _.intersection(self.model.permissions, values);
    },

    togglePermission(permission) {
      var self = this;

      if (!self.model.permissions) {
        self.$set(self.model, 'permissions', []);
      }

      if (self.permissionSelected(permission)) {
        var index = self.model.permissions.indexOf(permission.value);

        if (index != -1) {
          self.model.permissions.splice(index, 1);
        }
      } else {
        self.model.permissions.push(permission.value);
      }
    },

    permissionSelected(permission) {
      var self = this;
      return _.includes(self.model.permissions, permission.value);
    }

  },
  asyncComputed: {
    tree: {
      default: [],

      get() {
        var self = this;
        self.loadingPermissions = true;
        return new Promise(function (resolve, reject) {
          return self.$fluro.access.retrievePermissions().then(function (permissionSets) {
            //////////////////////////////////////
            //Map search strings for each permission set
            _.each(permissionSets, function (entry) {
              // ${entry.definitionName} ${entry.parentType || ''}
              entry.searchString = `${entry.title} ${entry.plural}`.toLowerCase();
              entry.permissionsString = _.map(entry.permissions, function (permission) {
                permission.searchString = `${permission.title}`.toLowerCase();
                return permission.searchString;
              }).join(' ');
            }); //////////////////////////////////////


            resolve(permissionSets);
            console.log('GOT EM!', permissionSets);
            self.loadingPermissions = false;
          }).catch(function (err) {
            reject(err);
            self.loadingPermissions = false;
          });
        });
      }

    }
  },
  computed: {
    informationPanelTitle() {
      return this.definition ? `${this.definition.title} Information` : 'Role Information';
    },

    filtered() {
      var self = this;

      if (!self.search || !self.search.length) {
        console.log('No search words');
        return self.tree;
      } ///////////////////////////////////////////////


      var keywords = self.search.toLowerCase();
      console.log('Filter by', keywords);
      return _.chain(self.tree).map(function (entry) {
        if (entry.searchString.includes(keywords)) {
          return entry;
        }

        if (entry.permissionsString.includes(keywords)) {
          var copy = JSON.parse(JSON.stringify(entry));
          copy.permissions = _.filter(copy.permissions, function (permissionSet) {
            return permissionSet.searchString.includes(keywords);
          });

          if (copy.permissions.length) {
            return copy;
          }
        }
      }).compact().value();
    },

    filteredBasic() {
      return _.filter(this.filtered, function (type) {
        return !type.parentType;
      });
    },

    filteredDefined() {
      return _.filter(this.filtered, function (type) {
        return type.parentType;
      });
    },

    loadingAnything() {
      return this.loading || this.loadingPermissions;
    },

    fieldsOutput() {
      var array = []; ///////////////////////////////////

      addField('title', {
        title: 'Title',
        minimum: 1,
        maximum: 1,
        type: 'string'
      }); ///////////////////////////////////

      addField('firstLine', {
        title: 'Description',
        description: 'Enter a one line description summarizing what this role is for and the permissions it grants',
        minimum: 0,
        maximum: 1,
        type: 'string'
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
  return _c(
    "flex-column",
    [
      _vm.loadingAnything
        ? [_c("fluro-page-preloader", { attrs: { contain: "" } })]
        : [
            _c(
              "tabset",
              {
                attrs: { justified: true },
                model: {
                  value: _vm.tabIndex,
                  callback: function($$v) {
                    _vm.tabIndex = $$v;
                  },
                  expression: "tabIndex"
                }
              },
              [
                _c(
                  "tab",
                  { attrs: { heading: _vm.informationPanelTitle } },
                  [
                    _c(
                      "flex-column-body",
                      { staticStyle: { background: "#fafafa" } },
                      [
                        _c(
                          "v-container",
                          { attrs: { fluid: "" } },
                          [
                            _c(
                              "constrain",
                              { attrs: { sm: "" } },
                              [
                                _c("fluro-content-form-field", {
                                  attrs: {
                                    autofocus: !_vm.model.title,
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
                                    field: _vm.fieldHash.firstLine
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
                                _vm.definition &&
                                _vm.definition.fields &&
                                _vm.definition.fields.length
                                  ? [
                                      _c("h4", { attrs: { margin: "" } }, [
                                        _vm._v(
                                          _vm._s(_vm.definition.title) +
                                            " Information"
                                        )
                                      ]),
                                      _vm._v(" "),
                                      _c("fluro-content-form", {
                                        attrs: {
                                          options: _vm.options,
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
                                    ]
                                  : _vm._e()
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
                  "tab",
                  { attrs: { heading: "Basic Permissions" } },
                  [
                    _c(
                      "tabset",
                      {
                        attrs: {
                          justified: true,
                          vertical: true,
                          persist: true
                        },
                        scopedSlots: _vm._u([
                          {
                            key: "menuprefix",
                            fn: function() {
                              return [
                                _c(
                                  "div",
                                  { staticClass: "search-box" },
                                  [
                                    _c("search-input", {
                                      attrs: {
                                        placeholder: "Search permissions"
                                      },
                                      model: {
                                        value: _vm.search,
                                        callback: function($$v) {
                                          _vm.search = $$v;
                                        },
                                        expression: "search"
                                      }
                                    })
                                  ],
                                  1
                                )
                              ]
                            },
                            proxy: true
                          }
                        ])
                      },
                      [
                        _vm._v(" "),
                        _vm._l(_vm.filteredBasic, function(type) {
                          return _c(
                            "tab",
                            {
                              key: type.title,
                              attrs: {
                                heading: type.title + " " + _vm.of(type),
                                muted: !_vm.enabled(type).length
                              }
                            },
                            [
                              _c(
                                "flex-column-body",
                                [
                                  _c(
                                    "v-container",
                                    [
                                      _c("h4", { attrs: { margin: "" } }, [
                                        _vm._v(_vm._s(type.title))
                                      ]),
                                      _vm._v(" "),
                                      _c(
                                        "list-group",
                                        _vm._l(type.permissions, function(
                                          permission
                                        ) {
                                          return _c(
                                            "fluro-toggle-item",
                                            {
                                              key: permission.title,
                                              attrs: {
                                                inactive: !_vm.permissionSelected(
                                                  permission
                                                )
                                              },
                                              nativeOn: {
                                                click: function($event) {
                                                  return _vm.togglePermission(
                                                    permission
                                                  )
                                                }
                                              }
                                            },
                                            [
                                              _c("strong", [
                                                _vm._v(_vm._s(permission.title))
                                              ]),
                                              _vm._v(" "),
                                              _c(
                                                "div",
                                                { staticClass: "sm muted" },
                                                [
                                                  _vm._v(
                                                    _vm._s(
                                                      permission.description
                                                    )
                                                  )
                                                ]
                                              )
                                            ]
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
                        })
                      ],
                      2
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "tab",
                  { attrs: { heading: "Defined Permissions" } },
                  [
                    _c(
                      "tabset",
                      {
                        attrs: {
                          justified: true,
                          vertical: true,
                          persist: true
                        },
                        scopedSlots: _vm._u([
                          {
                            key: "menuprefix",
                            fn: function() {
                              return [
                                _c(
                                  "div",
                                  { staticClass: "search-box" },
                                  [
                                    _c("search-input", {
                                      attrs: {
                                        placeholder: "Search permissions"
                                      },
                                      model: {
                                        value: _vm.search,
                                        callback: function($$v) {
                                          _vm.search = $$v;
                                        },
                                        expression: "search"
                                      }
                                    })
                                  ],
                                  1
                                )
                              ]
                            },
                            proxy: true
                          }
                        ])
                      },
                      [
                        _vm._v(" "),
                        _vm._l(_vm.filteredDefined, function(type) {
                          return _c(
                            "tab",
                            {
                              attrs: {
                                heading: type.title + " " + _vm.of(type),
                                muted: !_vm.enabled(type).length
                              }
                            },
                            [
                              _c(
                                "flex-column-body",
                                [
                                  _c(
                                    "v-container",
                                    [
                                      _c("h4", { attrs: { margin: "" } }, [
                                        _vm._v(_vm._s(type.title))
                                      ]),
                                      _vm._v(" "),
                                      _c(
                                        "list-group",
                                        _vm._l(type.permissions, function(
                                          permission
                                        ) {
                                          return _c(
                                            "fluro-toggle-item",
                                            {
                                              attrs: {
                                                inactive: !_vm.permissionSelected(
                                                  permission
                                                )
                                              },
                                              nativeOn: {
                                                click: function($event) {
                                                  return _vm.togglePermission(
                                                    permission
                                                  )
                                                }
                                              }
                                            },
                                            [
                                              _c("strong", [
                                                _vm._v(_vm._s(permission.title))
                                              ]),
                                              _vm._v(" "),
                                              _c(
                                                "div",
                                                { staticClass: "sm muted" },
                                                [
                                                  _vm._v(
                                                    _vm._s(
                                                      permission.description
                                                    )
                                                  )
                                                ]
                                              )
                                            ]
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
                        })
                      ],
                      2
                    )
                  ],
                  1
                )
              ],
              1
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
    inject("data-v-4ca996bb_0", { source: "/**/\n.border-top[data-v-4ca996bb] {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right[data-v-4ca996bb] {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom[data-v-4ca996bb] {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left[data-v-4ca996bb] {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.search-box[data-v-4ca996bb] {\n  padding: 10px;\n}\n\n/*# sourceMappingURL=role.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/edit/panels/role.vue","role.vue"],"names":[],"mappings":"AA8SA,GAAA;AAYA;EACA,yCAAA;ACxTA;AD2TA;EACA,2CAAA;ACxTA;AD2TA;EACA,4CAAA;ACxTA;AD2TA;EACA,0CAAA;ACxTA;;ADgUA,GAAA;AACA;EACA,aAAA;AC7TA;;AAEA,mCAAmC","file":"role.vue","sourcesContent":["<template>\n    <flex-column>\n        <!-- <pre>Loading? {{loading}} - {{loadingPermissions}}</pre> -->\n        <template v-if=\"loadingAnything\">\n            <fluro-page-preloader contain />\n        </template>\n        <template v-else>\n            <!-- :vertical=\"true\" -->\n            <!-- :vertical=\"true\" -->\n            <tabset v-model=\"tabIndex\" :justified=\"true\">\n                <!--  <template v-slot:menuprefix>\n                    <template v-if=\"context == 'edit' && $vuetify.breakpoint.mdAndUp\">\n                        <flex-column-header style=\"text-align:center\">\n                            <div style=\"padding: 10px; max-width:200px; margin: auto;\">\n                                <fluro-image  :height=\"200\" :image-height=\"450\" contain :item=\"model\" :cacheKey=\"imageCacheKey\" :spinner=\"true\"></fluro-image>\n                            </div>\n                            <div>\n                                {{model.width}}x{{model.height}}\n                            </div>\n                        </flex-column-header>\n                    </template>\n                </template> -->\n\n                <tab :heading=\"informationPanelTitle\">\n                    <flex-column-body style=\"background: #fafafa;\">\n                        \n                        <v-container fluid>\n                            <constrain sm>\n                                <fluro-content-form-field :autofocus=\"!model.title\" :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.title\" v-model=\"model\" />\n                                <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.firstLine\" v-model=\"model\" />\n                                <template v-if=\"definition && definition.fields && definition.fields.length\">\n                                    <h4 margin>{{definition.title}} Information</h4>\n                                    <fluro-content-form :options=\"options\" v-model=\"model.data\" :fields=\"definition.fields\" />\n                                </template>\n                            </constrain>\n                        </v-container>\n                    </flex-column-body>\n                </tab>\n\n\n                <tab heading=\"Basic Permissions\">\n                    <tabset :justified=\"true\" :vertical=\"true\" :persist=\"true\">\n                        <template v-slot:menuprefix>\n                            <div class=\"search-box\">\n                            \t\n                                <search-input placeholder=\"Search permissions\" v-model=\"search\" />\n                                <!-- <pre>{{search}} {{filtered.length}}</pre> -->\n                            \t\n                            </div>\n                        </template>\n                        <tab :heading=\"`${type.title} ${of(type)}`\" :muted=\"!enabled(type).length\" :key=\"type.title\" v-for=\"type in filteredBasic\">\n                            <flex-column-body>\n                            <v-container>\n                                <h4 margin>{{type.title}}</h4>\n                                <list-group>\n                                    <fluro-toggle-item @click.native=\"togglePermission(permission)\" :key=\"permission.title\" v-for=\"permission in type.permissions\" :inactive=\"!permissionSelected(permission)\">\n                                        <strong>{{permission.title}}</strong>\n                                        <div class=\"sm muted\">{{permission.description}}</div>\n                                    </fluro-toggle-item>\n                                </list-group>\n                            </v-container>\n                        </flex-column-body>\n                        </tab>\n                    </tabset>\n                </tab>\n                <tab heading=\"Defined Permissions\">\n                    <tabset :justified=\"true\" :vertical=\"true\" :persist=\"true\">\n                        <template v-slot:menuprefix>\n                            <div class=\"search-box\">\n                                <search-input placeholder=\"Search permissions\" v-model=\"search\" />\n                            </div>\n                        </template>\n                        <tab :heading=\"`${type.title} ${of(type)}`\" :muted=\"!enabled(type).length\" v-for=\"type in filteredDefined\">\n                            <flex-column-body>\n                            <v-container>\n                                <h4 margin>{{type.title}}</h4>\n                                <list-group>\n                                    <fluro-toggle-item @click.native=\"togglePermission(permission)\" v-for=\"permission in type.permissions\" :inactive=\"!permissionSelected(permission)\">\n                                        <strong>{{permission.title}}</strong>\n                                        <div class=\"sm muted\">{{permission.description}}</div>\n                                    </fluro-toggle-item>\n                                </list-group>\n                            </v-container>\n                        </flex-column-body>\n                        </tab>\n                    </tabset>\n                </tab>\n                \n                <!-- <tab heading=\"Developer\">\n                    <flex-column-body style=\"background: #fafafa;\">\n                        <v-container fluid>\n                        </v-container>\n                    </flex-column-body>\n                </tab> -->\n            </tabset>\n        </template>\n    </flex-column>\n</template>\n<script>\n/////////////////////////////////\n\nimport FluroContentEditMixin from 'src/components/content/edit/FluroContentEditMixin.js';\nimport SearchInput from 'src/components/ui/SearchInput.vue';\nimport FluroToggleItem from 'src/components/ui/FluroToggleItem.vue';\n\n\n\n/////////////////////////////////\n\nimport Vue from 'vue';\nimport _ from 'lodash';\n\n\n/////////////////////////////////\n\nexport default {\n    components: {\n        FluroToggleItem,\n        SearchInput,\n        // FluroEditor,\n    },\n    created() {\n        if(this.model._id) {\n            this.tabIndex = 1;\n        }\n    },\n    data() {\n        return {\n            tabIndex:0,\n            search: '',\n            loadingPermissions: true,\n        }\n    },\n    mixins: [FluroContentEditMixin],\n    methods: { \n\n        of (type) {\n\n            var total = type.permissions.length\n            var activated = this.enabled(type);\n\n            return activated.length ? `${activated.length} / ${total}` : '';\n        },\n        enabled(type) {\n            var self = this;\n            var values = _.map(type.permissions, 'value');\n            return _.intersection(self.model.permissions, values);\n        },\n        togglePermission(permission) {\n            var self = this;\n            if (!self.model.permissions) {\n                self.$set(self.model, 'permissions', []);\n            }\n\n            if (self.permissionSelected(permission)) {\n\n                var index = self.model.permissions.indexOf(permission.value);\n                if (index != -1) {\n                    self.model.permissions.splice(index, 1);\n                }\n            } else {\n                self.model.permissions.push(permission.value);\n            }\n        },\n        permissionSelected(permission) {\n            var self = this;\n            return _.includes(self.model.permissions, permission.value);\n        },\n    },\n    asyncComputed: {\n        tree: {\n            default: [],\n            get() {\n\n                var self = this;\n                self.loadingPermissions = true;\n\n                return new Promise(function(resolve, reject) {\n                    return self.$fluro.access.retrievePermissions()\n                        .then(function(permissionSets) {\n\n\n                            //////////////////////////////////////\n\n                            //Map search strings for each permission set\n                            _.each(permissionSets, function(entry) {\n                                // ${entry.definitionName} ${entry.parentType || ''}\n                                entry.searchString =`${entry.title} ${entry.plural}`.toLowerCase();\n                                entry.permissionsString = _.map(entry.permissions, function(permission) {\n                                    permission.searchString = `${permission.title}`.toLowerCase();\n                                    return permission.searchString;\n                                }).join(' ');\n                            })\n\n                            //////////////////////////////////////\n\n                            resolve(permissionSets);\n                            console.log('GOT EM!', permissionSets);\n                            self.loadingPermissions = false\n                        })\n                        .catch(function(err) {\n                            reject(err);\n                            self.loadingPermissions = false;\n                        });\n                })\n            },\n        }\n    },\n    computed: {\n        informationPanelTitle() {\n            return this.definition ? `${this.definition.title} Information` : 'Role Information';\n        },\n        filtered() {\n\n            var self = this;\n\n            if(!self.search || !self.search.length) {\n                console.log('No search words')\n                return self.tree;\n            }\n\n            ///////////////////////////////////////////////\n\n            var keywords = self.search.toLowerCase();\n            console.log('Filter by', keywords);\n\n            return _.chain(self.tree)\n            .map(function(entry) {\n\n                if(entry.searchString.includes(keywords)) {\n                    return entry;\n                }\n\n                if(entry.permissionsString.includes(keywords)) {\n\n                    var copy = JSON.parse(JSON.stringify(entry))\n                    copy.permissions = _.filter(copy.permissions, function(permissionSet) {\n                        return permissionSet.searchString.includes(keywords);\n                    })\n\n                    if(copy.permissions.length) {\n                        return copy;\n                    }\n                }\n            })\n            .compact()\n            .value();\n        },\n        filteredBasic() {\n            return _.filter(this.filtered, function(type) {\n                return !type.parentType;\n            })\n        },\n        filteredDefined() {\n            return _.filter(this.filtered, function(type) {\n                return type.parentType;\n            })\n        },\n        loadingAnything() {\n            return this.loading || this.loadingPermissions;\n        },\n        fieldsOutput() {\n\n\n            var self = this;\n            var array = [];\n\n            ///////////////////////////////////\n\n            addField('title', {\n                title: 'Title',\n                minimum: 1,\n                maximum: 1,\n                type: 'string',\n            });\n\n            ///////////////////////////////////\n\n            addField('firstLine', {\n                title: 'Description',\n                description: 'Enter a one line description summarizing what this role is for and the permissions it grants',\n                minimum: 0,\n                maximum: 1,\n                type: 'string',\n            });\n\n            ///////////////////////////////////\n\n            function addField(key, details) {\n                details.key = key;\n                array.push(details)\n            }\n\n            return array;\n\n\n        },\n    },\n}\n</script>\n<style lang=\"scss\" scoped>\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n.search-box {\n    padding: 10px;\n\n}\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.search-box {\n  padding: 10px;\n}\n\n/*# sourceMappingURL=role.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-4ca996bb";
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
//# sourceMappingURL=role-fe65baae.js.map
