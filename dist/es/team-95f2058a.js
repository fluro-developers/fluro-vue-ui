
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { r as FluroConfirmButton, bl as __vue_normalize__, bm as __vue_create_injector__, bn as _$1, aM as FluroContentForm, aN as FluroContentFormField } from './index-c97a882c.js';
import 'vue-range-slider';
import 'vue-range-slider/dist/vue-range-slider.css';
import draggable from 'vuedraggable';
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
import { F as FluroContentEditMixin } from './FluroContentEditMixin-fd6158a5.js';
import { F as FluroExclusiveSelector } from './FluroExclusiveSelector-110bc356.js';

//
var script = {
  props: {
    value: {
      type: Array
    },
    config: {
      required: true
    }
  },
  mixins: [FluroContentEditMixin],
  components: {
    draggable,
    FluroConfirmButton
  },

  data() {
    return {
      model: this.value,
      proposed: {},
      dragOptions: {},
      currentlyExpanded: [],
      drag: false
    };
  },

  methods: {
    addSlot() {
      var self = this;
      var fields = [{
        title: 'Position Title',
        description: 'The name of this position',
        key: 'title',
        minimum: 1,
        maximum: 1,
        type: 'string',
        placeholder: 'Eg. Leader, Co-Leader, Coach',
        params: {
          autofocus: true
        }
      }, {
        title: 'Contacts',
        key: 'contacts',
        description: 'Select people to fill this position',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        params: {
          restrictType: 'contact',
          allDefinitions: true
        }
      }, {
        title: 'Permission Roles',
        key: 'roles',
        description: 'Select access roles that will be granted within the context of this group to anyone added into this position',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        params: {
          restrictType: 'role',
          allDefinitions: true,
          searchInheritable: true
        }
      }];
      self.$fluro.prompt(fields, 'New Position').then(function (res) {
        console.log(res);
        self.model.push(res);
      });
    },

    // add() {
    // 				var clone = JSON.parse(JSON.stringify(this.proposed));
    // 				if (!clone.title || !clone.title.length) {
    // 								return;
    // 				}
    // 				delete clone.row;
    // 				this.model.push(clone);
    // 				this.currentlyExpanded.push(false);
    // 				this.proposed = {};
    // },
    remove(index) {
      this.model.splice(index, 1);
    },

    toggleExpanded(index) {
      var self = this;

      if (self.currentlyExpanded[index]) {
        self.$set(self.currentlyExpanded, index, false);
      } else {
        self.$set(self.currentlyExpanded, index, true);
      }
    }

  },
  computed: {
    // addFields() {
    // 				var self = this;
    // 				var array = [];
    // 				///////////////////////////////////
    // 				addField('title', {
    // 								title: 'Position Name',
    // 								minimum: 1,
    // 								maximum: 1,
    // 								type: 'string',
    // 								placeholder: 'Role/Assignment'
    // 				});
    // 				addField('contacts', {
    // 								title: 'People Responsible',
    // 								minimum: 0,
    // 								maximum: 0,
    // 								type: 'reference',
    // 								directive: 'reference-select',
    // 								params: {
    // 												restrictType: 'contact',
    // 								}
    // 				});
    // 				// addField('title', {
    // 				//     title: 'Grade Title',
    // 				//     minimum: 1,
    // 				//     maximum: 1,
    // 				//     type: 'string',
    // 				// });
    // 				// addField('description', {
    // 				//     title: 'Description',
    // 				//     minimum: 0,
    // 				//     maximum: 1,
    // 				//     type: 'string',
    // 				// });
    // 				///////////////////////////////////
    // 				function addField(key, details) {
    // 								details.key = key;
    // 								array.push(details)
    // 				}
    // 				return array;
    // },
    editFields() {
      var array = []; ///////////////////////////////////

      addField('title', {
        title: 'Position Name',
        minimum: 1,
        maximum: 1,
        type: 'string',
        placeholder: 'Role/Assignment'
      });
      addField('contacts', {
        title: 'Contacts',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        directive: 'reference-select',
        params: {
          restrictType: 'contact'
        }
      });
      addField('roles', {
        title: 'Roles / Permissions',
        description: 'Roles and permissions that should be assigned to people in this position for this group/team',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        directive: 'reference-select',
        params: {
          restrictType: 'role'
        }
      }); // addField('title', {
      //     title: 'Grade Title',
      //     minimum: 1,
      //     maximum: 1,
      //     type: 'string',
      // });
      // addField('description', {
      //     title: 'Description',
      //     minimum: 0,
      //     maximum: 1,
      //     type: 'string',
      // });
      ///////////////////////////////////

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
    "div",
    [
      _c(
        "list-group",
        [
          _c(
            "draggable",
            _vm._b(
              {
                attrs: {
                  list: _vm.model,
                  "ghost-class": "ghost-dragging-class"
                },
                on: {
                  start: function($event) {
                    _vm.drag = true;
                  },
                  end: function($event) {
                    _vm.drag = false;
                  }
                }
              },
              "draggable",
              _vm.dragOptions,
              false
            ),
            _vm._l(_vm.model, function(assignment, index) {
              return _c(
                "list-group-item",
                {
                  staticClass: "pa-0",
                  class: _vm.currentlyExpanded[index] ? "hover-grey" : "",
                  staticStyle: { width: "100%" }
                },
                [
                  _c(
                    "v-layout",
                    {
                      attrs: {
                        "align-center": "",
                        "ma-0": "",
                        "py-0": "",
                        "px-2": ""
                      }
                    },
                    [
                      _c("v-flex", { attrs: { xs3: "" } }, [
                        _c("strong", [_vm._v(_vm._s(assignment.title))]),
                        _vm._v(" "),
                        assignment.roles && assignment.roles.length
                          ? _c("div", { staticClass: "sm text-muted" }, [
                              _vm._v(
                                _vm._s(
                                  _vm._f("comma")(assignment.roles, "title")
                                )
                              )
                            ])
                          : _vm._e()
                      ]),
                      _vm._v(" "),
                      _c(
                        "v-flex",
                        { attrs: { xs5: "" } },
                        _vm._l(assignment.contacts, function(contact) {
                          return _c("v-chip", { attrs: { small: "" } }, [
                            _vm._v(_vm._s(contact.title))
                          ])
                        }),
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-flex",
                        { attrs: { xs2: "" } },
                        [
                          _c(
                            "v-btn",
                            {
                              staticStyle: { width: "100%" },
                              attrs: { "px-0": "" },
                              on: {
                                click: function($event) {
                                  return _vm.toggleExpanded(index)
                                }
                              }
                            },
                            [
                              _c(
                                "v-layout",
                                { attrs: { "px-0": "" } },
                                [
                                  _c("v-flex", { attrs: { "px-0": "" } }, [
                                    _vm._v(
                                      _vm._s(
                                        !_vm.currentlyExpanded[index]
                                          ? "More"
                                          : "Less"
                                      )
                                    )
                                  ]),
                                  _vm._v(" "),
                                  _c(
                                    "v-flex",
                                    {
                                      staticClass: "fade",
                                      attrs: { "px-0": "", shrink: "" }
                                    },
                                    [
                                      _c("fluro-icon", {
                                        attrs: {
                                          icon: !_vm.currentlyExpanded[index]
                                            ? "angle-down"
                                            : "angle-up"
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
                        "v-flex",
                        { attrs: { "py-1": "", xs2: "" } },
                        [
                          _c("fluro-confirm-button", {
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
                                          staticStyle: { width: "100%" },
                                          attrs: { flat: "" }
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
                  ),
                  _vm._v(" "),
                  _vm.currentlyExpanded[index]
                    ? _c(
                        "tabset",
                        { staticStyle: { width: "100%" } },
                        [
                          _c(
                            "tab",
                            {
                              staticClass: "pa-2",
                              attrs: { heading: "Position Details" }
                            },
                            [
                              _c("fluro-content-form", {
                                ref: "form",
                                refInFor: true,
                                attrs: {
                                  options: _vm.options,
                                  fields: _vm.editFields
                                },
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
                                            { attrs: { wrap: "", "pa-4": "" } },
                                            [
                                              _c(
                                                "v-flex",
                                                { attrs: { xs4: "", sm3: "" } },
                                                [
                                                  _c(
                                                    "fluro-content-form-field",
                                                    {
                                                      attrs: {
                                                        "form-fields": formFields,
                                                        outline:
                                                          _vm.showOutline,
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
                                                  )
                                                ],
                                                1
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "v-flex",
                                                {
                                                  attrs: {
                                                    xs8: "",
                                                    sm9: "",
                                                    "py-0": ""
                                                  }
                                                },
                                                [
                                                  _c(
                                                    "fluro-content-form-field",
                                                    {
                                                      attrs: {
                                                        "form-fields": formFields,
                                                        outline:
                                                          _vm.showOutline,
                                                        options: options,
                                                        field:
                                                          fieldHash.contacts
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
                                                        outline:
                                                          _vm.showOutline,
                                                        options: options,
                                                        field: fieldHash.roles
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
                                        ]
                                      }
                                    }
                                  ],
                                  null,
                                  true
                                ),
                                model: {
                                  value: _vm.model[index],
                                  callback: function($$v) {
                                    _vm.$set(_vm.model, index, $$v);
                                  },
                                  expression: "model[index]"
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "tab",
                            { attrs: { heading: "Advanced" } },
                            [
                              _c(
                                "v-layout",
                                { attrs: { wrap: "", "pa-4": "" } },
                                [
                                  _c(
                                    "v-flex",
                                    { attrs: { xs12: "", sm6: "" } },
                                    [
                                      _c("v-checkbox", {
                                        attrs: {
                                          label:
                                            "Allow " +
                                            _vm.model[index].title +
                                            " to view phone numbers and emails of other group members",
                                          hint:
                                            "Should people in this position be able to see the email and phone number of other members in this group/team?",
                                          "persistent-hint": ""
                                        },
                                        model: {
                                          value: _vm.model[index].shareDetails,
                                          callback: function($$v) {
                                            _vm.$set(
                                              _vm.model[index],
                                              "shareDetails",
                                              $$v
                                            );
                                          },
                                          expression:
                                            "model[index].shareDetails"
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
                                      _c("v-checkbox", {
                                        attrs: {
                                          label: "Visible",
                                          hint:
                                            "Should this group be visible to people in this slot?",
                                          "persistent-hint": ""
                                        },
                                        model: {
                                          value: _vm.model[index].visible,
                                          callback: function($$v) {
                                            _vm.$set(
                                              _vm.model[index],
                                              "visible",
                                              $$v
                                            );
                                          },
                                          expression: "model[index].visible"
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
                                      _c("v-checkbox", {
                                        attrs: {
                                          label:
                                            "Exclude " +
                                            _vm.model[index].title +
                                            " from membership",
                                          hint:
                                            "If checked, these contacts will not be considered 'members' of the group. They will be excluded from reports and other statistics. Typically this would be used for an oversight or an administrative only position.",
                                          "persistent-hint": ""
                                        },
                                        model: {
                                          value: _vm.model[index].exclude,
                                          callback: function($$v) {
                                            _vm.$set(
                                              _vm.model[index],
                                              "exclude",
                                              $$v
                                            );
                                          },
                                          expression: "model[index].exclude"
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
            }),
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-btn",
        {
          staticClass: "mx-0",
          attrs: { color: "primary" },
          on: {
            click: function($event) {
              return _vm.addSlot()
            }
          }
        },
        [
          _vm._v(
            "\n\t\t\t\t\t\t\t\t\t\t\t\tAdd Position\n\t\t\t\t\t\t\t\t\t\t\t\t"
          ),
          _c("fluro-icon", { attrs: { right: "", icon: "plus" } })
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
    inject("data-v-8debf4ec_0", { source: "/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.ghost-dragging-class {\n  opacity: 0.5;\n  background: #c8ebfb;\n}\n.fade-enter-active,\n.fade-leave-active {\n  transition: all 1s;\n}\n.fade-enter,\n.fade-leave-to {\n  opacity: 0;\n}\n.hover-grey {\n  background: #fafafa;\n}\n\n/*# sourceMappingURL=GroupRoleManager.vue.map */", map: {"version":3,"sources":["C:\\Users\\User\\Documents\\fluro\\fluro-vue-ui\\src\\components\\content\\edit\\components\\GroupRoleManager.vue","GroupRoleManager.vue"],"names":[],"mappings":"AAqVA,GAAA;AAYA;EACA,yCAAA;AC/VA;ADkWA;EACA,2CAAA;AC/VA;ADkWA;EACA,4CAAA;AC/VA;ADkWA;EACA,0CAAA;AC/VA;;ADuWA,GAAA;AACA;EACA,YAAA;EACA,mBAAA;ACpWA;ADuWA;;EAEA,kBAAA;ACpWA;ADuWA;;EAEA,UAAA;ACpWA;ADwWA;EACA,mBAAA;ACrWA;;AAEA,+CAA+C","file":"GroupRoleManager.vue","sourcesContent":["<template>\n\t\t\t\t<div>\n\t\t\t\t\t\t\t\t<list-group>\n\t\t\t\t\t\t\t\t\t\t\t\t<draggable :list=\"model\" v-bind=\"dragOptions\" ghost-class=\"ghost-dragging-class\" @start=\"drag=true\" @end=\"drag=false\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<list-group-item v-for=\"(assignment, index) in model\" class=\"pa-0\" :class=\"currentlyExpanded[index] ? 'hover-grey' : ''\" style=\"width:100%\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-layout align-center ma-0 py-0 px-2>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs3>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<strong>{{assignment.title}}</strong>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div v-if=\"assignment.roles && assignment.roles.length\" class=\"sm text-muted\">{{assignment.roles | comma('title') }}</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs5>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-chip small v-for=\"contact in assignment.contacts\">{{contact.title}}</v-chip>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs2>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-btn style=\"width:100%\" px-0 @click=\"toggleExpanded(index)\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-layout px-0>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex px-0>{{!currentlyExpanded[index] ? 'More' : 'Less'}}</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex px-0 shrink class=\"fade\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-icon :icon=\"!currentlyExpanded[index] ? 'angle-down' : 'angle-up'\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-btn>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex py-1 xs2>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-confirm-button @click=\"remove(index)\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<template v-slot:default=\"{confirming}\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-btn flat style=\"width:100%;\">{{confirming ? 'Confirm?' : 'Remove'}}</v-btn>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-confirm-button>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tabset v-if=\"currentlyExpanded[index]\" style=\"width:100%\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tab heading=\"Position Details\" class=\"pa-2\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form :options=\"options\" v-model=\"model[index]\" :fields=\"editFields\" ref=\"form\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<template v-slot:form=\"{formFields, fieldHash, model, update, options}\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-layout wrap pa-4>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs4 sm3>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.title\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs8 sm9 py-0>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.contacts\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.roles\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-content-form>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tab heading=\"Advanced\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-layout wrap pa-4>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm6>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-checkbox v-model=\"model[index].shareDetails\" :label=\"`Allow ${model[index].title} to view phone numbers and emails of other group members`\" hint=\"Should people in this position be able to see the email and phone number of other members in this group/team?\" persistent-hint></v-checkbox>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm6>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-checkbox v-model=\"model[index].visible\" label=\"Visible\" hint=\"Should this group be visible to people in this slot?\" persistent-hint></v-checkbox>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm6>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-checkbox v-model=\"model[index].exclude\" :label=\"`Exclude ${model[index].title} from membership`\" hint=\"If checked, these contacts will not be considered 'members' of the group. They will be excluded from reports and other statistics. Typically this would be used for an oversight or an administrative only position.\" persistent-hint></v-checkbox>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tabset>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</list-group-item>\n\t\t\t\t\t\t\t\t\t\t\t\t</draggable>\n\t\t\t\t\t\t\t\t</list-group>\n\t\t\t\t\t\t\t\t<v-btn color=\"primary\" class=\"mx-0\" @click=\"addSlot()\">\n\t\t\t\t\t\t\t\t\t\t\t\tAdd Position\n\t\t\t\t\t\t\t\t\t\t\t\t<fluro-icon right icon=\"plus\" />\n\t\t\t\t\t\t\t\t</v-btn>\n\t\t\t\t\t\t\t\t<!-- \t<fluro-panel>\n\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel-title>Add a position</fluro-panel-title>\n\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<form @submit.prevent.stop=\"add()\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form :options=\"options\" v-model=\"proposed\" :fields=\"addFields\" ref=\"form\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<template v-slot:form=\"{formFields, fieldHash, model, update, options}\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-layout wrap align-center px-2>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs8 sm8>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.title\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs4 sm4>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-btn style=\"width:100%;\" type=\"submit\" @click=\"add()\">Add</v-btn>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm12 py-0>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.contacts\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-content-form>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</form>\n\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel-body>\n\t\t\t\t\t\t\t\t</fluro-panel> -->\n\t\t\t\t\t\t\t\t<!-- <pre>{{proposed}}</pre> -->\n\t\t\t\t\t\t\t\t<!-- <v-layout>\n            <v-flex xs12 sm5>\n                <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.title\" v-model=\"model\"></fluro-content-form-field>\n            </v-flex>\n            <v-flex xs12 sm5>\n                <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.title\" v-model=\"model\"></fluro-content-form-field>\n            </v-flex>\n            <v-flex xs12 sm2>\n                <v-btn>Add</v-btn>\n            </v-flex>\n        </v-layout> -->\n\t\t\t\t</div>\n</template>\n<script>\nimport FluroContentEditMixin from 'src/components/content/edit/FluroContentEditMixin.js';\nimport FluroConfirmButton from \"src/components/ui/FluroConfirmButton.vue\";\nimport draggable from 'vuedraggable';\n\nexport default {\n\t\t\t\tprops: {\n\t\t\t\t\t\t\t\tvalue: {\n\t\t\t\t\t\t\t\t\t\t\t\ttype: Array,\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tconfig: {\n\t\t\t\t\t\t\t\t\t\t\t\trequired: true,\n\t\t\t\t\t\t\t\t}\n\t\t\t\t},\n\t\t\t\tmixins: [FluroContentEditMixin],\n\t\t\t\tcomponents: {\n\t\t\t\t\t\t\t\tdraggable,\n\t\t\t\t\t\t\t\tFluroConfirmButton\n\n\t\t\t\t},\n\t\t\t\tdata() {\n\t\t\t\t\t\t\t\treturn {\n\t\t\t\t\t\t\t\t\t\t\t\tmodel: this.value,\n\t\t\t\t\t\t\t\t\t\t\t\tproposed: {},\n\t\t\t\t\t\t\t\t\t\t\t\tdragOptions: {},\n\t\t\t\t\t\t\t\t\t\t\t\tcurrentlyExpanded: [],\n\t\t\t\t\t\t\t\t\t\t\t\tdrag: false,\n\t\t\t\t\t\t\t\t}\n\t\t\t\t},\n\t\t\t\tmethods: {\n\t\t\t\t\t\t\t\taddSlot() {\n\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\n\t\t\t\t\t\t\t\t\t\t\t\tvar fields = [\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Position Title',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescription:'The name of this position',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkey:'title',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'string',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tplaceholder: 'Eg. Leader, Co-Leader, Coach',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tparams:{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tautofocus:true,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Contacts',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkey:'contacts',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescription:'Select people to fill this position',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'reference',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tparams:{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\trestrictType:'contact',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tallDefinitions:true,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Permission Roles',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkey:'roles',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescription:'Select access roles that will be granted within the context of this group to anyone added into this position',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'reference',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tparams:{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\trestrictType:'role',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tallDefinitions:true,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tsearchInheritable:true,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\n\t\t\t\t\t\t\t\t\t\t\t\t]\n\n\t\t\t\t\t\t\t\t\t\t\t\tself.$fluro.prompt(fields, 'New Position')\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t.then(function(res) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tconsole.log(res);\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tself.model.push(res);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t// add() {\n\n\n\t\t\t\t\t\t\t\t// \t\t\t\tvar clone = JSON.parse(JSON.stringify(this.proposed));\n\n\t\t\t\t\t\t\t\t// \t\t\t\tif (!clone.title || !clone.title.length) {\n\t\t\t\t\t\t\t\t// \t\t\t\t\t\t\t\treturn;\n\t\t\t\t\t\t\t\t// \t\t\t\t}\n\n\t\t\t\t\t\t\t\t// \t\t\t\tdelete clone.row;\n\n\n\n\t\t\t\t\t\t\t\t// \t\t\t\tthis.model.push(clone);\n\t\t\t\t\t\t\t\t// \t\t\t\tthis.currentlyExpanded.push(false);\n\t\t\t\t\t\t\t\t// \t\t\t\tthis.proposed = {};\n\t\t\t\t\t\t\t\t// },\n\t\t\t\t\t\t\t\tremove(index) {\n\t\t\t\t\t\t\t\t\t\t\t\tthis.model.splice(index, 1);\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\ttoggleExpanded(index) {\n\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\t\t\t\t\t\t\t\t\t\t\t\tif (self.currentlyExpanded[index]) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tself.$set(self.currentlyExpanded, index, false);\n\t\t\t\t\t\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tself.$set(self.currentlyExpanded, index, true);\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t}\n\t\t\t\t},\n\t\t\t\tcomputed: {\n\t\t\t\t\t\t\t\t// addFields() {\n\n\n\t\t\t\t\t\t\t\t// \t\t\t\tvar self = this;\n\t\t\t\t\t\t\t\t// \t\t\t\tvar array = [];\n\n\t\t\t\t\t\t\t\t// \t\t\t\t///////////////////////////////////\n\n\t\t\t\t\t\t\t\t// \t\t\t\taddField('title', {\n\t\t\t\t\t\t\t\t// \t\t\t\t\t\t\t\ttitle: 'Position Name',\n\t\t\t\t\t\t\t\t// \t\t\t\t\t\t\t\tminimum: 1,\n\t\t\t\t\t\t\t\t// \t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t// \t\t\t\t\t\t\t\ttype: 'string',\n\t\t\t\t\t\t\t\t// \t\t\t\t\t\t\t\tplaceholder: 'Role/Assignment'\n\t\t\t\t\t\t\t\t// \t\t\t\t});\n\n\n\t\t\t\t\t\t\t\t// \t\t\t\taddField('contacts', {\n\t\t\t\t\t\t\t\t// \t\t\t\t\t\t\t\ttitle: 'People Responsible',\n\t\t\t\t\t\t\t\t// \t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t// \t\t\t\t\t\t\t\tmaximum: 0,\n\t\t\t\t\t\t\t\t// \t\t\t\t\t\t\t\ttype: 'reference',\n\t\t\t\t\t\t\t\t// \t\t\t\t\t\t\t\tdirective: 'reference-select',\n\t\t\t\t\t\t\t\t// \t\t\t\t\t\t\t\tparams: {\n\t\t\t\t\t\t\t\t// \t\t\t\t\t\t\t\t\t\t\t\trestrictType: 'contact',\n\t\t\t\t\t\t\t\t// \t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t// \t\t\t\t});\n\n\t\t\t\t\t\t\t\t// \t\t\t\t// addField('title', {\n\t\t\t\t\t\t\t\t// \t\t\t\t//     title: 'Grade Title',\n\t\t\t\t\t\t\t\t// \t\t\t\t//     minimum: 1,\n\t\t\t\t\t\t\t\t// \t\t\t\t//     maximum: 1,\n\t\t\t\t\t\t\t\t// \t\t\t\t//     type: 'string',\n\t\t\t\t\t\t\t\t// \t\t\t\t// });\n\n\t\t\t\t\t\t\t\t// \t\t\t\t// addField('description', {\n\t\t\t\t\t\t\t\t// \t\t\t\t//     title: 'Description',\n\t\t\t\t\t\t\t\t// \t\t\t\t//     minimum: 0,\n\t\t\t\t\t\t\t\t// \t\t\t\t//     maximum: 1,\n\t\t\t\t\t\t\t\t// \t\t\t\t//     type: 'string',\n\t\t\t\t\t\t\t\t// \t\t\t\t// });\n\n\t\t\t\t\t\t\t\t// \t\t\t\t///////////////////////////////////\n\n\t\t\t\t\t\t\t\t// \t\t\t\tfunction addField(key, details) {\n\t\t\t\t\t\t\t\t// \t\t\t\t\t\t\t\tdetails.key = key;\n\t\t\t\t\t\t\t\t// \t\t\t\t\t\t\t\tarray.push(details)\n\t\t\t\t\t\t\t\t// \t\t\t\t}\n\n\t\t\t\t\t\t\t\t// \t\t\t\treturn array;\n\t\t\t\t\t\t\t\t// },\n\t\t\t\t\t\t\t\teditFields() {\n\n\n\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\t\t\t\t\t\t\t\t\t\t\t\tvar array = [];\n\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('title', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Position Name',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'string',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tplaceholder: 'Role/Assignment'\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('contacts', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Contacts',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'reference',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdirective: 'reference-select',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tparams: {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\trestrictType: 'contact',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('roles', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Roles / Permissions',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescription: 'Roles and permissions that should be assigned to people in this position for this group/team',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'reference',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdirective: 'reference-select',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tparams: {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\trestrictType: 'role',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t// addField('title', {\n\t\t\t\t\t\t\t\t\t\t\t\t//     title: 'Grade Title',\n\t\t\t\t\t\t\t\t\t\t\t\t//     minimum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t//     maximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t//     type: 'string',\n\t\t\t\t\t\t\t\t\t\t\t\t// });\n\n\t\t\t\t\t\t\t\t\t\t\t\t// addField('description', {\n\t\t\t\t\t\t\t\t\t\t\t\t//     title: 'Description',\n\t\t\t\t\t\t\t\t\t\t\t\t//     minimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t//     maximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t//     type: 'string',\n\t\t\t\t\t\t\t\t\t\t\t\t// });\n\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\n\t\t\t\t\t\t\t\t\t\t\t\tfunction addField(key, details) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdetails.key = key;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tarray.push(details)\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t\t\treturn array;\n\t\t\t\t\t\t\t\t}\n\t\t\t\t}\n}\n\n</script>\n<style lang=\"scss\">\n\n/**/\r\n\r\n$primary: #2ad4b9;//#0bd6be;\r\n$success: #4cc650; //#4cc673;//\r\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\r\n$danger: #d93e63;\r\n$secondary: #0bd6cd; //#0bd6a3;\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n\r\n.border-top {\r\n    border-top: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-right {\r\n    border-right: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-bottom {\r\n    border-bottom: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-left {\r\n    border-left: 1px solid rgba(#000, 0.05);\r\n}\r\n//////////////////////////////////////////\r\n\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n/**/\n.ghost-dragging-class {\n\t\t\t\topacity: 0.5;\n\t\t\t\tbackground: #c8ebfb;\n}\n\n.fade-enter-active,\n.fade-leave-active {\n\t\t\t\ttransition: all 1s;\n}\n\n.fade-enter,\n.fade-leave-to {\n\t\t\t\topacity: 0;\n}\n\n\n.hover-grey {\n\t\t\t\tbackground: #fafafa;\n}\n\n</style>\n","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.ghost-dragging-class {\n  opacity: 0.5;\n  background: #c8ebfb;\n}\n\n.fade-enter-active,\n.fade-leave-active {\n  transition: all 1s;\n}\n\n.fade-enter,\n.fade-leave-to {\n  opacity: 0;\n}\n\n.hover-grey {\n  background: #fafafa;\n}\n\n/*# sourceMappingURL=GroupRoleManager.vue.map */"]}, media: undefined });

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
  mixins: [FluroContentEditMixin],
  props: {
    value: {
      type: Object,
      default: function () {
        return {};
      }
    },
    config: {
      required: true
    },
    allPositions: {
      type: Array
    }
  },
  components: {
    // FluroContentForm,
    FluroExclusiveSelector
  },

  data() {
    return {
      model: this.value
    };
  },

  created() {},

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

      addField('assignments', {
        title: 'Notify',
        minimum: 1,
        maximum: self.allPositions.length + 1,
        type: 'string',
        directive: 'select',
        options: self.allPositions
      });
      addField('trigger', {
        title: 'Trigger when',
        minimum: 1,
        maximum: 1,
        type: 'string',
        directive: 'select',
        defaultValues: ['team.join'],
        options: [{
          name: 'A new contact joins this group',
          value: 'team.join'
        }, {
          name: 'A contact leaves this group',
          value: 'team.leave'
        }, {
          name: 'This group\'s information is updated',
          value: 'content.edit'
        }, {
          name: 'A group member updates their availability',
          value: 'contact.unavailability'
        }, {
          name: 'A group member confirms an assignment',
          value: 'confirmation.confirmed'
        }, {
          name: 'A group member declines an assignments',
          value: 'confirmation.unavailable'
        }, {
          name: 'Group member\'s birthday',
          value: 'contact.birthday'
        }]
      });

      function addField(key, details) {
        details.key = key;
        array.push(details);
      }

      return array;
    },

    sendToFormatted() {
      var self = this;
      var assignments = JSON.parse(JSON.stringify(self.model.assignments)); //console.log('ASSIGNMENTS', assignments);

      if (assignments.length == 1 && assignments[0] == "") {
        return 'All Assignments';
      } else {
        return assignments.join(', ');
      }
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
                                { attrs: { sm6: "", xs6: "" } },
                                [
                                  _c("fluro-content-form-field", {
                                    attrs: {
                                      "form-fields": formFields,
                                      outline: _vm.showOutline,
                                      options: options,
                                      field: fieldHash.trigger
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
                                { attrs: { sm6: "", xs6: "" } },
                                [
                                  _c("fluro-content-form-field", {
                                    attrs: {
                                      "form-fields": formFields,
                                      outline: _vm.showOutline,
                                      options: options,
                                      field: fieldHash.assignments
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
                    ]
                  }
                }
              ],
              null,
              false,
              2663713191
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
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = function (inject) {
    if (!inject) return
    inject("data-v-859ce5e6_0", { source: "\n.capitalize-text {\n    text-transform: capitalize;\n}\n", map: {"version":3,"sources":["C:\\Users\\User\\Documents\\fluro\\fluro-vue-ui\\src\\components\\content\\edit\\components\\NotificationTeamComponent.vue"],"names":[],"mappings":";AAiJA;IACA,0BAAA;AACA","file":"NotificationTeamComponent.vue","sourcesContent":["<template>\n    <div v-if=\"model\" py-0>\n        <fluro-content-form :options=\"options\" v-model=\"model\" :fields=\"customFields\" ref=\"form\">\n            <template v-slot:form=\"{formFields, fieldHash, model, update, options}\">\n                <v-container fluid pa-0>\n                    <v-layout row wrap grid-list-xl py-0>\n                        <v-flex sm6 xs6>\n                            <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.trigger\" v-model=\"model\" />\n                        </v-flex>\n                        <v-flex sm6 xs6>\n                            <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.assignments\" v-model=\"model\" />\n                        </v-flex>\n                    </v-layout>\n                </v-container>\n            </template>\n        </fluro-content-form>\n    </div>\n</template>\n<script>\n\n    //TODO check whether this actually needs to be here\nimport FluroContentEditMixin from 'src/components/content/edit/FluroContentEditMixin.js';\nimport FluroExclusiveSelector from 'src/components/content/edit/components/FluroExclusiveSelector.vue';\n\n\n\nexport default {\n    mixins: [FluroContentEditMixin],\n    props: {\n        value: {\n            type: Object,\n            default: function() {\n                return {};\n            },\n        },\n        config: {\n            required: true,\n        },\n        allPositions: {\n            type: Array,\n        }\n    },\n    components: {\n        // FluroContentForm,\n        FluroExclusiveSelector\n    },\n    data() {\n        return {\n            model: this.value,\n        }\n    },\n    created() {},\n    methods: {\n        validate() {\n            var form = this.$refs.form;\n            if (!form) {\n                return [];\n            }\n            this.model.errorMessages = form.errorMessages || [];\n        },\n        validateAllFields() {\n            var form = this.$refs.form;\n            form.touch();\n            this.validate();\n        },\n    },\n    computed: {\n        customFields() {\n\n            var self = this;\n            var array = [];\n            var periodOptions = [];\n\n            ///////////////////////////////////\n\n            addField('assignments', {\n                title: 'Notify',\n                minimum: 1,\n                maximum: self.allPositions.length + 1,\n                type: 'string',\n                directive: 'select',\n                options: self.allPositions\n            })\n\n\n            addField('trigger', {\n                title: 'Trigger when',\n                minimum: 1,\n                maximum: 1,\n                type: 'string',\n                directive: 'select',\n                defaultValues: ['team.join'],\n                options: [{\n                        name: 'A new contact joins this group',\n                        value: 'team.join',\n                    },\n                    {\n                        name: 'A contact leaves this group',\n                        value: 'team.leave',\n                    },\n                    {\n                        name: 'This group\\'s information is updated',\n                        value: 'content.edit',\n                    },\n                    {\n                        name: 'A group member updates their availability',\n                        value: 'contact.unavailability',\n                    },\n                    {\n                        name: 'A group member confirms an assignment',\n                        value: 'confirmation.confirmed',\n                    },\n                    {\n                        name: 'A group member declines an assignments',\n                        value: 'confirmation.unavailable',\n                    },\n                    {\n                        name: 'Group member\\'s birthday',\n                        value: 'contact.birthday',\n                    },\n                ]\n            })\n\n\n            function addField(key, details) {\n                details.key = key;\n                array.push(details)\n            }\n\n            return array;\n        },\n        sendToFormatted() {\n            var self = this;\n            var assignments = JSON.parse(JSON.stringify(self.model.assignments));\n            //console.log('ASSIGNMENTS', assignments);\n            if ((assignments.length == 1) && (assignments[0] == \"\")) {\n                return 'All Assignments';\n            } else {\n                return assignments.join(', ');\n            }\n        },\n    }\n}\n</script>\n<style>\n.capitalize-text {\n    text-transform: capitalize;\n}\n</style>"]}, media: undefined });

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
      type: Array,
      default: function () {
        return [];
      }
    },
    config: {
      type: Object,
      required: true
    },
    allPositions: {
      type: Array
    }
  },

  created() {
    for (let i = 0; i < this.model.length; i++) {
      this.editing.push(false);
    }
  },

  components: {
    NotificationTeamComponent: __vue_component__$1,
    FluroConfirmButton
  },

  data() {
    return {
      model: this.value,
      proposed: {},
      editing: [],
      clonedModel: this.value
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
      self.$set(self, 'proposed', {
        'assignments': [''],
        'methods': ['']
      });
    },

    remove(index) {
      this.model.splice(index, 1);
      this.editing.splice(index, 1);
    },

    toggleEdit(index) {
      var self = this; //console.log(self.$refs);
      //console.log('ON TOGGLE', self.model[index], self.clonedModel[index]);

      console.log('MODEL', this.model[index].methods, 'CLONEDMODEL', this.clonedModel[index].methods);

      if (self.editing[index]) {
        if (self.clonedModel[index].assignments.length) {
          self.model[index] = self.clonedModel[index];
          return self.$set(self.editing, index, false);
        }

        return;
      } else {
        return self.$set(self.editing, index, true);
      }
    },

    displayTrigger(value) {
      var data = [{
        name: 'A new contact joins this group',
        value: 'team.join'
      }, {
        name: 'A contact leaves this group',
        value: 'team.leave'
      }, {
        name: 'This group\'s information is updated',
        value: 'content.edit'
      }, {
        name: 'A group member updates their availability',
        value: 'contact.unavailability'
      }, {
        name: 'A group member confirms an assignment',
        value: 'confirmation.confirmed'
      }, {
        name: 'A group member declines an assignments',
        value: 'confirmation.unavailable'
      }, {
        name: 'Group member\'s birthday',
        value: 'contact.birthday'
      }];

      var res = _$1.find(data, function (obj) {
        return value == obj.value;
      });

      return res.name;
    },

    displayAssignments(value) {
      if (!Array.isArray(value)) {
        return;
      } else if (value.length) {
        return value.join(', ');
      } else {
        return value;
      }
    }

  },
  watch: {
    'model': function () {
      this.clonedModel = JSON.parse(JSON.stringify(this.model));
    }
  },
  computed: {
    allPositionsObjects() {
      var self = this;
      return _$1.map(self.allPositions, function (pos) {
        return {
          'name': pos,
          'value': pos
        };
      });
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
    "div",
    [
      _c("h4", [
        _vm._v(
          _vm._s(_vm.model.length) +
            " notification trigger" +
            _vm._s(_vm.model.length == 1 ? "" : "s")
        )
      ]),
      _vm._v(" "),
      _c("p", { staticClass: "muted" }, [
        _vm._v("Add notifications for when events happen within this group")
      ]),
      _vm._v(" "),
      _c(
        "list-group",
        _vm._l(_vm.model, function(notification, index) {
          return _c(
            "list-group-item",
            { key: JSON.stringify(notification) },
            [
              _c(
                "v-layout",
                {
                  attrs: { "align-center": "", row: "", wrap: "", "ma-0": "" }
                },
                [
                  _c(
                    "v-flex",
                    {
                      staticStyle: { "text-align": "center" },
                      attrs: { sm1: "", xs1: "", "pa-1": "" }
                    },
                    [
                      _c("fluro-icon", {
                        directives: [{ name: "tippy", rawName: "v-tippy" }],
                        attrs: { icon: "bell", content: "Sends notification" }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-flex",
                    {
                      staticClass: "full-width",
                      attrs: { sm7: "", xs11: "", "pa-1": "" }
                    },
                    [
                      _c("strong", [
                        _vm._v(_vm._s(_vm.displayTrigger(notification.trigger)))
                      ]),
                      _vm._v(" "),
                      _c("p", { staticClass: "muted mb-0" }, [
                        _vm._v(
                          "Notify " +
                            _vm._s(
                              _vm.displayAssignments(notification.assignments)
                            )
                        )
                      ]),
                      _vm._v(" "),
                      _vm.editing[index]
                        ? _c("notification-team-component", {
                            attrs: {
                              config: _vm.config,
                              allPositions: _vm.allPositionsObjects
                            },
                            model: {
                              value: _vm.clonedModel[index],
                              callback: function($$v) {
                                _vm.$set(_vm.clonedModel, index, $$v);
                              },
                              expression: "clonedModel[index]"
                            }
                          })
                        : _vm._e()
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-flex",
                    {
                      staticClass: "full-width",
                      attrs: { sm2: "", xs6: "", "py-0": "" }
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
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-flex",
                    {
                      staticClass: "full-width",
                      attrs: { sm2: "", xs6: "", "py-0": "" }
                    },
                    [
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
                            _c("notification-team-component", {
                              ref: "createform",
                              attrs: {
                                config: _vm.config,
                                allPositions: _vm.allPositionsObjects
                              },
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
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  const __vue_inject_styles__$2 = function (inject) {
    if (!inject) return
    inject("data-v-4eb3ee61_0", { source: "/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.full-width {\n  width: 100%;\n}\n.fade-enter-active,\n.fade-leave-active {\n  transition: all 1s;\n}\n.fade-enter,\n.fade-leave-to {\n  opacity: 0;\n}\n\n/*# sourceMappingURL=NotificationTeamManager.vue.map */", map: {"version":3,"sources":["C:\\Users\\User\\Documents\\fluro\\fluro-vue-ui\\src\\components\\content\\edit\\components\\NotificationTeamManager.vue","NotificationTeamManager.vue"],"names":[],"mappings":"AAsLA,GAAA;AAYA;EACA,yCAAA;AChMA;ADmMA;EACA,2CAAA;AChMA;ADmMA;EACA,4CAAA;AChMA;ADmMA;EACA,0CAAA;AChMA;;ADwMA,GAAA;AACA;EACA,WAAA;ACrMA;ADwMA;;EAEA,kBAAA;ACrMA;ADwMA;;EAEA,UAAA;ACrMA;;AAEA,sDAAsD","file":"NotificationTeamManager.vue","sourcesContent":["<template>\n    <div>\n        <h4>{{model.length}} notification trigger{{model.length == 1 ? '' : 's'}}</h4>\n        <p class=\"muted\">Add notifications for when events happen within this group</p>\n        <list-group>\n            <list-group-item v-for=\"(notification, index) in model\" v-bind:key=\"JSON.stringify(notification)\">\n                <v-layout align-center row wrap ma-0>\n                    <v-flex sm1 xs1 pa-1 style=\"text-align:center\">\n                        <fluro-icon icon=\"bell\" v-tippy content=\"Sends notification\" />\n                    </v-flex>\n                    <v-flex sm7 xs11 pa-1 class=\"full-width\">\n                        <strong>{{displayTrigger(notification.trigger)}}</strong>\n                        <p class=\"muted mb-0\">Notify {{displayAssignments(notification.assignments)}}</p>\n                        <notification-team-component v-if=\"editing[index]\" :config=\"config\" v-model=\"clonedModel[index]\" :allPositions=\"allPositionsObjects\" />\n                    </v-flex>\n                    <v-flex sm2 xs6 py-0 class=\"full-width\">\n                        <v-btn block @click=\"toggleEdit(index)\">{{editing[index] ? 'Done' : 'Edit'}}</v-btn>\n                    </v-flex>\n                    <v-flex sm2 xs6 py-0 class=\"full-width\">\n                        <fluro-confirm-button @click=\"remove(index)\" content=\"Remove\">\n                            <template v-slot:default=\"{confirming}\">\n                                    <v-btn flat block :color=\"confirming ? 'red' : ''\" style=\"transition: all 0.1s;width:100%;\">{{confirming ? 'Confirm?' : 'Remove'}}</v-btn>\n                            </template>\n                        </fluro-confirm-button>\n                    </v-flex>\n                </v-layout>\n            </list-group-item>\n        </list-group>\n        <fluro-panel>\n            <fluro-panel-body>\n                <form @submit.prevent.stop=\"add()\">\n                    <v-container fluid grid-list-xl pa-1>\n                        <v-layout row wrap grid-list-xl>\n                            <v-flex sm10 xs12>\n                                <notification-team-component :config=\"config\" v-model=\"proposed\" ref=\"createform\" :allPositions=\"allPositionsObjects\" />\n                            </v-flex>\n                            <v-flex sm2 xs12>\n                                <v-btn block color=\"primary\" type=\"submit\" @click=\"add()\">Add</v-btn>\n                            </v-flex>\n                        </v-layout>\n                    </v-container>\n                </form>\n            </fluro-panel-body>\n        </fluro-panel>\n    </div>\n</template>\n<script>\nimport FluroConfirmButton from 'src/components/ui/FluroConfirmButton.vue';\nimport NotificationTeamComponent from 'src/components/content/edit/components/NotificationTeamComponent.vue';\nimport _ from 'lodash';\n\n\nexport default {\n    props: {\n        value: {\n            type: Array,\n            default: function() {\n                return [];\n            }\n        },\n        config: {\n            type: Object,\n            required: true,\n        },\n        allPositions: {\n            type: Array,\n        }\n    },\n    created() {\n        for (let i = 0; i < this.model.length; i++) {\n            this.editing.push(false);\n        }\n    },\n    components: { NotificationTeamComponent, FluroConfirmButton },\n    data() {\n        return {\n            model: this.value,\n            proposed: {},\n            editing: [],\n            clonedModel: this.value,\n        }\n    },\n    methods: {\n        add() {\n            var self = this;\n            self.$refs.createform.validateAllFields();\n            var clone = JSON.parse(JSON.stringify(self.proposed));\n            if (clone.errorMessages.length) {\n                return;\n            }\n\n            delete clone.row;\n\n\n\n            this.model.push(clone);\n            this.editing.push(false);\n            self.$set(self, 'proposed', { 'assignments': [''], 'methods': [''] });\n        },\n        remove(index) {\n            this.model.splice(index, 1);\n            this.editing.splice(index, 1);\n        },\n        toggleEdit(index) {\n            var self = this;\n            //console.log(self.$refs);\n            //console.log('ON TOGGLE', self.model[index], self.clonedModel[index]);\n            console.log('MODEL', this.model[index].methods, 'CLONEDMODEL', this.clonedModel[index].methods);\n            if (self.editing[index]) {\n                if (self.clonedModel[index].assignments.length) {\n                    self.model[index] = self.clonedModel[index];\n                    return self.$set(self.editing, index, false);\n                }\n                return;\n            } else {\n                return self.$set(self.editing, index, true);\n            }\n        },\n        displayTrigger(value) {\n            var self = this;\n            var data = [{\n                    name: 'A new contact joins this group',\n                    value: 'team.join',\n                },\n                {\n                    name: 'A contact leaves this group',\n                    value: 'team.leave',\n                },\n                {\n                    name: 'This group\\'s information is updated',\n                    value: 'content.edit',\n                },\n                {\n                    name: 'A group member updates their availability',\n                    value: 'contact.unavailability',\n                },\n                {\n                    name: 'A group member confirms an assignment',\n                    value: 'confirmation.confirmed',\n                },\n                {\n                    name: 'A group member declines an assignments',\n                    value: 'confirmation.unavailable',\n                },\n                {\n                    name: 'Group member\\'s birthday',\n                    value: 'contact.birthday',\n                },\n            ];\n            var res = _.find(data, function(obj) {\n                return value == obj.value;\n            });\n            return res.name;\n        },\n        displayAssignments(value) {\n            if (!Array.isArray(value)) {\n                return;\n            }\n            else if (value.length) {\n                return value.join(', ');\n            } else {\n                return value;\n            }\n        }\n    },\n    watch: {\n        'model': function() {\n            this.clonedModel = JSON.parse(JSON.stringify(this.model));\n        },\n    },\n    computed: {\n        allPositionsObjects() {\n            var self = this;\n            return _.map(self.allPositions, function(pos) {\n                return { 'name': pos, 'value': pos };\n            });\n        }\n    }\n}\n</script>\n<style lang=\"scss\">\n\n/**/\r\n\r\n$primary: #2ad4b9;//#0bd6be;\r\n$success: #4cc650; //#4cc673;//\r\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\r\n$danger: #d93e63;\r\n$secondary: #0bd6cd; //#0bd6a3;\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n\r\n.border-top {\r\n    border-top: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-right {\r\n    border-right: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-bottom {\r\n    border-bottom: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-left {\r\n    border-left: 1px solid rgba(#000, 0.05);\r\n}\r\n//////////////////////////////////////////\r\n\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n/**/\n.full-width {\n    width: 100%;\n}\n\n.fade-enter-active,\n.fade-leave-active {\n    transition: all 1s;\n}\n\n.fade-enter,\n.fade-leave-to {\n    opacity: 0;\n}\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.full-width {\n  width: 100%;\n}\n\n.fade-enter-active,\n.fade-leave-active {\n  transition: all 1s;\n}\n\n.fade-enter,\n.fade-leave-to {\n  opacity: 0;\n}\n\n/*# sourceMappingURL=NotificationTeamManager.vue.map */"]}, media: undefined });

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
    FluroContentForm,
    FluroContentFormField
  },
  props: {
    value: {
      type: Object
    }
  },

  data() {
    return {
      model: this.value,
      editMode: false,
      saving: false
    };
  },

  computed: {
    canEdit() {
      return this.$fluro.access.canEditItem(this.model);
    },

    fields() {
      var self = this;
      var array = [];
      array.push({
        title: 'Track Title',
        key: 'title',
        type: 'string',
        minimum: 1,
        maximum: 1
      });
      array.push({
        title: 'Enable Recurring Events',
        key: 'autoRecur',
        type: 'boolean',
        minimum: 0,
        maximum: 1
      });
      array.push({
        title: 'Event Type',
        // description: 'Choose an event type',
        key: 'recurDefinition',
        type: 'string',
        directive: 'select',
        options: self.eventDefinitionOptions,
        minimum: 0,
        maximum: 1
      });
      array.push({
        title: 'Track Start Date',
        description: 'When do events start for this track',
        key: 'nextRecurDate',
        type: 'date',
        directive: 'date-select',
        minimum: 1,
        maximum: 1
      });
      array.push({
        title: 'Track End Date',
        description: 'On this date all events will cease for this track and the track will be archived',
        key: 'archiveDate',
        type: 'date',
        directive: 'date-select',
        minimum: 0,
        maximum: 1
      });
      array.push({
        title: 'Start Time',
        description: 'When do events for this track usually start?',
        key: 'defaultStartTime',
        type: 'string',
        directive: 'time-select',
        minimum: 1,
        maximum: 1
      });
      array.push({
        title: 'Duration (mins)',
        description: 'How long do these events usually run for?',
        key: 'defaultDuration',
        type: 'integer',
        params: {
          minValue: 0
        },
        defaultValues: [90],
        minimum: 1,
        maximum: 1
      });
      array.push({
        title: 'Timezone',
        description: 'What timezone do these events run in? Leave blank to use account default',
        key: 'defaultTimezone',
        type: 'string',
        directive: 'timezone-select',
        minimum: 0,
        maximum: 1
      });
      array.push({
        title: 'Meets every',
        // description: 'Choose an event type',
        key: 'recurCount',
        type: 'integer',
        minimum: 1,
        maximum: 1
      });

      var frequencyOptions = _.map([{
        title: 'Week',
        name: 'Week',
        value: 'weeks'
      }, {
        title: 'Month',
        name: 'Month',
        value: 'months'
      } //'year',
      ], function (measure) {
        if (self.model.recurCount != 1) {
          measure.name = measure.title = `${measure.title}s`;
        }

        return measure;
      });

      array.push({
        title: 'Frequency',
        // description: 'Choose an event type',
        key: 'recurMeasure',
        type: 'string',
        minimum: 1,
        maximum: 1,
        directive: 'select',
        options: frequencyOptions
      });
      array.push({
        title: 'On the',
        // description: 'Choose an event type',
        key: 'recurNth',
        type: 'string',
        directive: 'select',
        minimum: 1,
        maximum: 1,
        options: [{
          name: 'Same Date',
          value: 'date'
        }, {
          name: 'First',
          value: '1'
        }, {
          name: 'Second',
          value: '2'
        }, {
          name: 'Third',
          value: '3'
        }, {
          name: 'Fourth',
          value: '4'
        }, {
          name: 'Fifth',
          value: '5'
        }],
        expressions: {
          show() {
            return self.model.recurMeasure == 'months';
          }

        }
      });
      array.push({
        title: 'Weekday',
        // description: 'Choose an event type',
        key: 'recurWeekday',
        type: 'string',
        directive: 'select',
        minimum: 1,
        maximum: 1,
        options: [{
          name: 'Sunday',
          value: 'sunday'
        }, {
          name: 'Monday',
          value: 'monday'
        }, {
          name: 'Tuesday',
          value: 'tuesday'
        }, {
          name: 'Wednesday',
          value: 'wednesday'
        }, {
          name: 'Thursday',
          value: 'thursday'
        }, {
          name: 'Friday',
          value: 'friday'
        }, {
          name: 'Saturday',
          value: 'saturday'
        }],
        expressions: {
          show() {
            return self.model.recurMeasure == 'weeks' || self.model.recurMeasure == 'months' && self.model.recurNth != 'date';
          }

        }
      });
      return array;
    },

    summary() {
      var self = this;
      var track = this.model;
      var pieces = [];
      pieces.push(track.defaultDuration + 'min');
      pieces.push(self.$fluro.types.readable(track.recurDefinition || 'event'));

      if (track.autoRecur) {
        pieces.push(`-`);
        pieces.push(`Meets every`);

        switch (track.recurMeasure) {
          case 'weeks':
            if (track.recurCount = 1) {
              pieces.push('week');
            } else {
              pieces.push(track.recurCount);
              pieces.push(track.recurMeasure);
            }

            pieces.push('on');
            pieces.push(track.recurWeekday);
            break;

          case 'months':
            if (track.recurCount = 1) {
              pieces.push('month');
            } else {
              pieces.push(track.recurCount);
              pieces.push(track.recurMeasure);
            }

            pieces.push('on the');

            switch (track.recurNth) {
              case 'date':
                pieces.push(track.recurNth);
                break;

              case '1':
                pieces.push('first');
                break;

              case '2':
                pieces.push('second');
                break;

              case '3':
                pieces.push('third');
                break;

              case '4':
                pieces.push('fourth');
                break;

              case '5':
                pieces.push('fifth');
                break;
            }

            pieces.push(track.recurWeekday);
            pieces.push('of the month');
            break;
        }
      }

      return _.compact(pieces).join(' ');
    },

    eventDefinitionOptions() {
      var self = this;
      return _.map(self.eventDefinitions, function (definition) {
        return {
          title: definition.title,
          name: definition.title,
          value: definition.definitionName
        };
      });
    }

  },
  watch: {
    value(v) {
      this.model = v;
    }

  },
  methods: {
    save() {
      var self = this;
      self.saving = true;
      self.$fluro.api.put(`/content/${self.model.definition || 'eventtrack'}/${self.model._id}`, self.model).then(function (res) {
        _.assign(self.model, res);

        self.$fluro.notify(`Event track updated successfully`);
        self.editMode = false;
        self.saving = false;
      }).catch(function (err) {
        self.$fluro.error(err);
        self.editMode = false;
        self.saving = false;
      });
    },

    cancel() {
      this.editMode = false;
    }

  },
  asyncComputed: {
    eventDefinitions: {
      default: [],

      get() {
        var self = this; // self.loadingDefinitions = true;
        // return new Promise(function(resolve, reject) {

        return self.$fluro.types.subTypes('event', true); // })
      }

    }
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
              _c("v-flex", [_c("h3", [_vm._v(_vm._s(_vm.model.title))])]),
              _vm._v(" "),
              _c(
                "v-flex",
                { attrs: { shrink: "" } },
                [
                  _c(
                    "v-btn",
                    {
                      staticClass: "mx-0",
                      attrs: { small: "", icon: "" },
                      on: {
                        click: function($event) {
                          return _vm.$actions.open([_vm.model])
                        }
                      }
                    },
                    [_c("fluro-icon", { attrs: { icon: "ellipsis-h" } })],
                    1
                  ),
                  _vm._v(" "),
                  _vm.editMode
                    ? [
                        _c(
                          "v-btn",
                          {
                            staticClass: "mx-0",
                            attrs: { small: "" },
                            on: {
                              click: function($event) {
                                return _vm.cancel()
                              }
                            }
                          },
                          [
                            _vm._v(
                              "\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tCancel\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t"
                            )
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "v-btn",
                          {
                            staticClass: "mx-0",
                            attrs: {
                              small: "",
                              color: "primary",
                              loading: _vm.saving
                            },
                            on: {
                              click: function($event) {
                                return _vm.save()
                              }
                            }
                          },
                          [
                            _vm._v(
                              "\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tSave\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t"
                            ),
                            _c("fluro-icon", {
                              attrs: { right: "", icon: "check" }
                            })
                          ],
                          1
                        )
                      ]
                    : _vm.canEdit
                    ? [
                        !_vm.editMode
                          ? _c(
                              "v-btn",
                              {
                                staticClass: "mx-0",
                                attrs: { small: "", icon: "" },
                                on: {
                                  click: function($event) {
                                    _vm.editMode = true;
                                  }
                                }
                              },
                              [_c("fluro-icon", { attrs: { icon: "pencil" } })],
                              1
                            )
                          : _vm._e()
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
      ),
      _vm._v(" "),
      _vm.editMode
        ? _c(
            "fluro-panel-body",
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
                              field: fieldHash.autoRecur
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
                          model.autoRecur
                            ? [
                                _c("fluro-content-form-field", {
                                  attrs: {
                                    "form-fields": formFields,
                                    options: options,
                                    field: fieldHash.recurDefinition
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
                                _c(
                                  "v-layout",
                                  [
                                    _c(
                                      "v-flex",
                                      [
                                        _c("fluro-content-form-field", {
                                          attrs: {
                                            "form-fields": formFields,
                                            options: options,
                                            field: fieldHash.nextRecurDate
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
                                    _c("v-spacer"),
                                    _vm._v(" "),
                                    _c(
                                      "v-flex",
                                      [
                                        _c("fluro-content-form-field", {
                                          attrs: {
                                            "form-fields": formFields,
                                            options: options,
                                            field: fieldHash.archiveDate
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
                                _c(
                                  "v-layout",
                                  [
                                    _c(
                                      "v-flex",
                                      [
                                        _c("fluro-content-form-field", {
                                          attrs: {
                                            "form-fields": formFields,
                                            options: options,
                                            field: fieldHash.recurCount
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
                                    _c("v-spacer"),
                                    _vm._v(" "),
                                    _c(
                                      "v-flex",
                                      [
                                        _c("fluro-content-form-field", {
                                          attrs: {
                                            "form-fields": formFields,
                                            options: options,
                                            field: fieldHash.recurMeasure
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
                                    _c("v-spacer"),
                                    _vm._v(" "),
                                    _c(
                                      "v-flex",
                                      [
                                        _c("fluro-content-form-field", {
                                          attrs: {
                                            "form-fields": formFields,
                                            options: options,
                                            field: fieldHash.recurNth
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
                                      [
                                        _c("fluro-content-form-field", {
                                          attrs: {
                                            "form-fields": formFields,
                                            options: options,
                                            field: fieldHash.recurWeekday
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
                                _c(
                                  "v-layout",
                                  [
                                    _c(
                                      "v-flex",
                                      [
                                        _c("fluro-content-form-field", {
                                          attrs: {
                                            "form-fields": formFields,
                                            options: options,
                                            field: fieldHash.defaultStartTime
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
                                    _c("v-spacer"),
                                    _vm._v(" "),
                                    _c(
                                      "v-flex",
                                      [
                                        _c("fluro-content-form-field", {
                                          attrs: {
                                            "form-fields": formFields,
                                            options: options,
                                            field: fieldHash.defaultDuration
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
                                    _c("v-spacer"),
                                    _vm._v(" "),
                                    _c(
                                      "v-flex",
                                      [
                                        _c("fluro-content-form-field", {
                                          attrs: {
                                            "form-fields": formFields,
                                            options: options,
                                            field: fieldHash.defaultTimezone
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
                            : _vm._e()
                        ]
                      }
                    }
                  ],
                  null,
                  false,
                  776210887
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
        : _c("fluro-panel-body", [
            _vm._v("\n\t\t\t\t\t\t\t\t" + _vm._s(_vm.summary) + "\n\t\t\t\t")
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
    inject("data-v-5586f270_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"TeamTrackTeaser.vue"}, media: undefined });

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

//

var script$4 = {
  components: {
    TeamTrackTeaser: __vue_component__$3,
    NotificationTeamManager: __vue_component__$2,
    GroupRoleManager: __vue_component__
  },
  mixins: [FluroContentEditMixin],

  created() {
    var self = this;

    if (!self.model.assignments) {
      self.$set(self.model, 'assignments', []);
    }

    if (!self.model.provisionalMembers) {
      self.$set(self.model, 'provisionalMembers', []);
    }

    if (!self.model.tracks) {
      self.$set(self.model, 'tracks', []);
    }

    if (!self.model.visibleAssigned) {
      self.$set(self.model, 'visibleAssigned', false);
    }

    if (!self.model.notifications) {
      self.$set(self.model, 'notifications', []);
    } // if (!self.model.provisionalMembers) {
    //     self.$set(self.model, 'provisionalMembers', []);
    // }
    // if (!self.model.defaultRooms) {
    //     self.$set(self.model, 'defaultRooms', []);
    // }
    // if (!self.model.defaultRosters) {
    //     self.$set(self.model, 'defaultRosters', []);
    // }

  },

  asyncComputed: {
    tracks: {
      default: [],

      get() {
        var self = this;

        if (!self.model._id) {
          self.loadingTracks = false;
          return Promise.resolve([]);
        } /////////////////////////////////


        self.loadingTracks = true; /////////////////////////////////

        return new Promise(function (resolve, reject) {
          self.$fluro.api.get(`/teams/${self.model._id}/tracks`).then(function (res) {
            resolve(res.data);
            self.loadingTracks = false;
          }).catch(function (err) {
            reject(err);
            self.loadingTracks = false;
          });
        });
      }

    }
  },
  methods: {
    createTrack() {
      var self = this;
      var team = self.model; ///////////////////////////////////////////////////////

      var template = {
        title: team.title,
        firstLine: team.firstLine,
        realms: team.realms,
        defaultDuration: 90,
        defaultTitle: team.title,
        defaultExpectTeams: [team],
        defaultOwnershipTeams: [team],
        defaultFirstLine: team.firstLine,
        mainImage: team.mainImage,
        autoRecur: true
      };
      self.$fluro.global.create('eventtrack', {
        template // copy: true,

      }, true).then(function (res) {
        self.processing = false;
        self.tracks.push(res);
      }, function (err) {
        self.processing = false;
      });
    }

  },
  computed: {
    infoHeading() {
      return this.definition ? `${this.definition.title} information` : 'Group Info';
    },

    fieldsOutput() {
      var array = []; ///////////////////////////////////

      addField('title', {
        title: 'Track Title',
        minimum: 1,
        maximum: 1,
        type: 'string',
        placeholder: 'Title'
      });
      addField('firstLine', {
        title: 'Subtitle',
        minimum: 0,
        maximum: 1,
        type: 'string',
        placeholder: 'Subtitle',
        description: 'A short one line description for this event track'
      }); ///////////////////////////////////
      ///////////////////////////////////
      ///////////////////////////////////

      addField('mainImage', {
        title: 'Image',
        description: 'Default image for events in this track',
        minimum: 0,
        maximum: 1,
        type: 'reference',
        directive: 'reference-select',
        params: {
          restrictType: 'image'
        }
      }); ///////////////////////////////////
      ///////////////////////////////////
      ///////////////////////////////////
      // visibleAssigned
      // addField('shareContactDetails', {
      // 				title: 'Share phone and email details with assigned contacts',
      // 				description: "Grant any contact with an assigned position be able to view other group members phone and email address?",
      // 				minimum: 0,
      // 				maximum: 1,
      // 				type: 'boolean',
      // 				defaultValues: [true],
      // });

      addField('visibleAssigned', {
        title: 'Hide from assigned contacts',
        description: "Should assigned contacts know that they are in this group?",
        minimum: 0,
        maximum: 1,
        type: 'boolean',
        expressions: {
          transform: {
            get(val) {
              return !val;
            },

            set(val) {
              return !val;
            }

          }
        }
      }); ///////////////////////////////////
      ///////////////////////////////////
      ///////////////////////////////////
      ///////////////////////////////////
      ///////////////////////////////////
      ///////////////////////////////////

      addField('provisionalRoles', {
        title: 'Roles / Permissions',
        description: 'Roles and permissions that should be granted to provisional members for this group/team',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        directive: 'reference-select',
        params: {
          restrictType: 'role'
        }
      }); ///////////////////////////////////

      addField('allowProvisional', {
        title: 'Allow Provisional Membership (Allow members to join and leave)',
        description: 'Set whether or not people can publicly join and leave this group without approval from applications like checkin or through your website',
        minimum: 0,
        maximum: 1,
        type: 'boolean'
      }); // addField('shareContactDetailsProvisional', {
      // 				title: 'Allow Provisional Members to view other group members\' phone numbers and emails',
      // 				description: 'Should provisional members be allowed to view other group members phone and email address?',
      // 				minimum: 0,
      // 				maximum: 1,
      // 				type: 'boolean',
      // });

      addField('visibleMembers', {
        title: 'Visible to Members',
        description: 'Should members of this group know that they are in this group?',
        minimum: 0,
        maximum: 1,
        type: 'boolean'
      }); ///////////////////////////////////

      addField('provisionalMembers', {
        title: 'Group Members',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        directive: 'reference-select',
        params: {
          restrictType: 'contact'
        }
      }); ///////////////////////////////////
      ///////////////////////////////////
      ///////////////////////////////////
      ///////////////////////////////////
      ///////////////////////////////////
      ///////////////////////////////////

      function addField(key, details) {
        details.key = key;
        array.push(details); // // Vue.set(self.fields, key, details);
        // if (details.enabled === false) {
        // } else {
        //     details.enabled = true;
        // }
        // var defaultValue = self.getDefaultValue(key, details);
        // Vue.set(self.model, key, defaultValue);
      }

      return array;
    },

    // hiddenAssigned: {
    // 				get() {
    // 								return !this.model.visibleAssigned;
    // 				},
    // 				set(value) {
    // 								this.$set(this.model, 'visibleAssigned', !value);
    // 				}
    // },
    showOutline() {
      return false; //true; //false;//true;//false;//true;
    },

    allPositions() {
      return _$1.map(this.model.assignments, 'title');
    }

  }
};

/* script */
const __vue_script__$4 = script$4;

/* template */
var __vue_render__$4 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "flex-column",
    [
      !_vm.model
        ? [_c("fluro-page-preloader", { attrs: { contain: "" } })]
        : _c(
            "tabset",
            { attrs: { justified: true, vertical: true } },
            [
              _c(
                "tab",
                { attrs: { heading: _vm.infoHeading } },
                [
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
                              _c("h3", { attrs: { margin: "" } }, [
                                _vm._v(
                                  _vm._s(
                                    _vm.definition
                                      ? _vm.definition.title
                                      : "Group"
                                  ) + " Info"
                                )
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
                              _c("fluro-content-form-field", {
                                attrs: {
                                  "form-fields": _vm.formFields,
                                  outline: _vm.showOutline,
                                  options: _vm.options,
                                  field: _vm.fieldHash.mainImage
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
                {
                  attrs: {
                    heading:
                      _vm.model.assignments.length +
                      " Position" +
                      (_vm.model.assignments.length == 1 ? "" : "s")
                  }
                },
                [
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
                            { attrs: { md: "" } },
                            [
                              _c("h3", [_vm._v("Assigned Positions")]),
                              _vm._v(" "),
                              _c("p", [
                                _vm._v(
                                  "Assign contacts to specified positions eg. (Leader, Co-leader, Guitarist) below:"
                                )
                              ]),
                              _vm._v(" "),
                              _c("group-role-manager", {
                                attrs: { config: _vm.config },
                                model: {
                                  value: _vm.model.assignments,
                                  callback: function($$v) {
                                    _vm.$set(_vm.model, "assignments", $$v);
                                  },
                                  expression: "model.assignments"
                                }
                              }),
                              _vm._v(" "),
                              _c("fluro-content-form-field", {
                                attrs: {
                                  "form-fields": _vm.formFields,
                                  outline: _vm.showOutline,
                                  options: _vm.options,
                                  field: _vm.fieldHash.visibleAssigned
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
                {
                  attrs: {
                    heading:
                      _vm.model.provisionalMembers.length +
                      " Member" +
                      (_vm.model.provisionalMembers.length == 1 ? "" : "s")
                  }
                },
                [
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
                              _c("h3", [_vm._v("Provisional Members")]),
                              _vm._v(" "),
                              _c("p", [
                                _vm._v(
                                  "Add contacts as provisional members of this group, these are usually the people who attend, belong to, or have subscribed to this group. People can become members of this group from your website, checkin system or other apps."
                                )
                              ]),
                              _vm._v(" "),
                              _c("fluro-content-form-field", {
                                staticClass: "py-2",
                                attrs: {
                                  "form-fields": _vm.formFields,
                                  outline: _vm.showOutline,
                                  options: _vm.options,
                                  field: _vm.fieldHash.provisionalRoles
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
                                staticClass: "py-2",
                                attrs: {
                                  "form-fields": _vm.formFields,
                                  outline: _vm.showOutline,
                                  options: _vm.options,
                                  field: _vm.fieldHash.allowProvisional
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
                                staticClass: "pt-2 pb-4",
                                attrs: {
                                  "form-fields": _vm.formFields,
                                  outline: _vm.showOutline,
                                  options: _vm.options,
                                  field: _vm.fieldHash.visibleMembers
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
                                staticClass: "py-3",
                                attrs: {
                                  "form-fields": _vm.formFields,
                                  outline: _vm.showOutline,
                                  options: _vm.options,
                                  field: _vm.fieldHash.provisionalMembers
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
              _vm.model._id
                ? _c(
                    "tab",
                    { attrs: { heading: "Recurring Events" } },
                    [
                      _vm.loadingTracks
                        ? _c(
                            "flex-column",
                            [
                              _c("fluro-page-preloader", {
                                attrs: { contain: "" }
                              })
                            ],
                            1
                          )
                        : _c(
                            "flex-column-body",
                            { staticStyle: { background: "#fafafa" } },
                            [
                              _c(
                                "v-container",
                                { attrs: { fluid: "" } },
                                [
                                  _c(
                                    "v-layout",
                                    { attrs: { "align-center": "" } },
                                    [
                                      _c("v-flex", [
                                        _c("h3", [
                                          _vm._v(
                                            _vm._s(_vm.tracks.length) +
                                              " Event Track" +
                                              _vm._s(
                                                _vm.tracks.length == 1
                                                  ? ""
                                                  : "s"
                                              )
                                          )
                                        ])
                                      ]),
                                      _vm._v(" "),
                                      _c(
                                        "v-flex",
                                        { attrs: { shrink: "" } },
                                        [
                                          _vm.$fluro.access.can(
                                            "create",
                                            "eventtrack"
                                          )
                                            ? _c(
                                                "v-btn",
                                                {
                                                  attrs: { color: "primary" },
                                                  on: {
                                                    click: function($event) {
                                                      return _vm.createTrack()
                                                    }
                                                  }
                                                },
                                                [
                                                  _c("span", [
                                                    _vm._v("Add Track")
                                                  ]),
                                                  _vm._v(" "),
                                                  _c("fluro-icon", {
                                                    attrs: {
                                                      icon: "plus",
                                                      right: ""
                                                    }
                                                  })
                                                ],
                                                1
                                              )
                                            : _vm._e()
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _vm._l(_vm.tracks, function(
                                    eventtrack,
                                    index
                                  ) {
                                    return [
                                      _c("team-track-teaser", {
                                        model: {
                                          value: _vm.tracks[index],
                                          callback: function($$v) {
                                            _vm.$set(_vm.tracks, index, $$v);
                                          },
                                          expression: "tracks[index]"
                                        }
                                      })
                                    ]
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
                : _vm._e(),
              _vm._v(" "),
              _c(
                "tab",
                { attrs: { heading: "Notifications" } },
                [
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
                            { attrs: { md: "" } },
                            [
                              _c("notification-team-manager", {
                                attrs: {
                                  config: _vm.config,
                                  allPositions: _vm.allPositions
                                },
                                model: {
                                  value: _vm.model.notifications,
                                  callback: function($$v) {
                                    _vm.$set(_vm.model, "notifications", $$v);
                                  },
                                  expression: "model.notifications"
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
    2
  )
};
var __vue_staticRenderFns__$4 = [];
__vue_render__$4._withStripped = true;

  /* style */
  const __vue_inject_styles__$4 = function (inject) {
    if (!inject) return
    inject("data-v-03cb8cb7_0", { source: "\n.no-border-no-background .toggle-item {\n\t\t\t\tborder: none !important;\n\t\t\t\tbackground: none !important;\n\t\t\t\tfont-size: 14px;\n\t\t\t\tpadding: 0px;\n}\n\n", map: {"version":3,"sources":["C:\\Users\\User\\Documents\\fluro\\fluro-vue-ui\\src\\components\\content\\edit\\panels\\team.vue"],"names":[],"mappings":";AA8cA;IACA,uBAAA;IACA,2BAAA;IACA,eAAA;IACA,YAAA;AACA","file":"team.vue","sourcesContent":["<template>\n\t\t\t\t<flex-column>\n\t\t\t\t\t\t\t\t<template v-if=\"!model\">\n\t\t\t\t\t\t\t\t\t\t\t\t<fluro-page-preloader contain />\n\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t<tabset v-else :justified=\"true\" :vertical=\"true\">\n\t\t\t\t\t\t\t\t\t\t\t\t<tab :heading=\"infoHeading\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<flex-column-body style=\"background: #fafafa;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-container class=\"grid-list-xl\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<constrain sm>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h3 margin>{{definition ? definition.title : 'Group'}} Info</h3>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.title\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.firstLine\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.mainImage\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<template v-if=\"definition && definition.fields && definition.fields.length\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form :options=\"options\" v-model=\"model.data\" :fields=\"definition.fields\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-content-form>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</constrain>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</flex-column-body>\n\t\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t\t\t\t\t<tab :heading=\"`${model.assignments.length} Position${model.assignments.length == 1 ? '' : 's'}`\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<flex-column-body style=\"background: #fafafa;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-container class=\"grid-list-xl\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<constrain md>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h3>Assigned Positions</h3>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p>Assign contacts to specified positions eg. (Leader, Co-leader, Guitarist) below:</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<group-role-manager v-model=\"model.assignments\" :config=\"config\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.shareContactDetails\" v-model=\"model\" /> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.visibleAssigned\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <v-checkbox v-model=\"hiddenAssigned\" label=\"Hide from assigned contacts\" hint=\"Should assigned contacts know they are in the group?\" persistent-hint></v-checkbox> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.mainImage\" v-model=\"model\" /> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <pre>{{model}}</pre> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</constrain>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</flex-column-body>\n\t\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t\t\t\t\t<tab :heading=\"`${model.provisionalMembers.length} Member${model.provisionalMembers.length == 1 ? '' : 's'}`\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<flex-column-body style=\"background: #fafafa;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-container class=\"grid-list-xl\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<constrain sm>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h3>Provisional Members</h3>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p>Add contacts as provisional members of this group, these are usually the people who attend, belong to, or have subscribed to this group. People can become members of this group from your website, checkin system or other apps.</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field class=\"py-2\" :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.provisionalRoles\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field class=\"py-2\" :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.allowProvisional\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <fluro-content-form-field class=\"py-2\" :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.shareContactDetailsProvisional\" v-model=\"model\" /> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field class=\"pt-2 pb-4\" :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.visibleMembers\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field class=\"py-3\" :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.provisionalMembers\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</constrain>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</flex-column-body>\n\t\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t\t\t\t\t<tab heading=\"Recurring Events\" v-if=\"model._id\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<flex-column v-if=\"loadingTracks\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-page-preloader contain />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</flex-column>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<flex-column-body v-else style=\"background: #fafafa;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-container fluid>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-layout align-center>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h3>{{tracks.length}} Event Track{{tracks.length == 1 ? '' : 's'}}</h3>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex shrink>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-btn color=\"primary\" @click=\"createTrack()\" v-if=\"$fluro.access.can('create', 'eventtrack')\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>Add Track</span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-icon icon=\"plus\" right />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-btn>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<template v-for=\"(eventtrack, index) in tracks\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<team-track-teaser v-model=\"tracks[index]\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</flex-column-body>\n\t\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t\t\t\t\t<!--\n\t\t\t\t\t\t\t\t\t\t\t\t<tab heading=\"Upcoming Events\" v-if=\"model._id\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<flex-column-body style=\"background: #fafafa;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-container fluid>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-layout align-center>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h3>{{tracks.length}} Event Track{{tracks.length == 1 ? '' : 's'}}</h3>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex shrink>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-btn color=\"primary\" @click=\"createTrack()\" v-if=\"$fluro.access.can('create', 'eventtrack')\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>New Track</span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-icon icon=\"plus\" right />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-btn>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tabset :justified=\"true\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tab :heading=\"eventtrack.title\" v-for=\"(eventtrack, index) in tracks\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-view :id=\"tracks[index]\" :embedded=\"true\" type=\"eventtrack\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tabset>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</flex-column-body>\n\t\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t\t\t\t\t<tab heading=\"Past Events\" v-if=\"model._id\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<flex-column-body style=\"background: #fafafa;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-container fluid>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-layout align-center>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h3>{{tracks.length}} Event Track{{tracks.length == 1 ? '' : 's'}}</h3>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex shrink>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-btn color=\"primary\" @click=\"createTrack()\" v-if=\"$fluro.access.can('create', 'eventtrack')\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>Add Track</span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-icon icon=\"plus\" right />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-btn>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tabset :justified=\"true\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tab :heading=\"eventtrack.title\" v-for=\"(eventtrack, index) in tracks\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-view :id=\"tracks[index]\" :embedded=\"true\" type=\"eventtrack\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tabset>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</flex-column-body>\n\t\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t\t\t\t-->\n\t\t\t\t\t\t\t\t\t\t\t\t<tab heading=\"Notifications\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<flex-column-body style=\"background: #fafafa;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-container class=\"grid-list-xl\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<constrain md>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<notification-team-manager v-model=\"model.notifications\" :config=\"config\" :allPositions=\"allPositions\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</constrain>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</flex-column-body>\n\t\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t</tabset>\n\t\t\t\t</flex-column>\n</template>\n<script>\n/////////////////////////////////\n\nimport GroupRoleManager from 'src/components/content/edit/components/GroupRoleManager.vue';\nimport NotificationTeamManager from 'src/components/content/edit/components/NotificationTeamManager.vue';\nimport FluroContentEditMixin from 'src/components/content/edit/FluroContentEditMixin.js';\n//import FluroContentEdit from 'src/components/content/edit/FluroContentEdit.vue';\nimport TeamTrackTeaser from 'src/components/content/edit/components/TeamTrackTeaser.vue';\n\n// import { JSONView } from \"vue-json-component\";\n\n/////////////////////////////////\n\nimport Vue from 'vue';\nimport _ from 'lodash';\n\n/////////////////////////////////\n\nexport default {\n\t\t\t\tcomponents: {\n\t\t\t\t\t\t\t\tTeamTrackTeaser,\n\t\t\t\t\t\t\t\tNotificationTeamManager,\n\t\t\t\t\t\t\t\tGroupRoleManager,\n\t\t\t\t},\n\t\t\t\tmixins: [FluroContentEditMixin],\n\t\t\t\tcreated() {\n\t\t\t\t\t\t\t\tvar self = this;\n\n\t\t\t\t\t\t\t\tif (!self.model.assignments) {\n\t\t\t\t\t\t\t\t\t\t\t\tself.$set(self.model, 'assignments', []);\n\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\tif (!self.model.provisionalMembers) {\n\t\t\t\t\t\t\t\t\t\t\t\tself.$set(self.model, 'provisionalMembers', []);\n\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\tif (!self.model.tracks) {\n\t\t\t\t\t\t\t\t\t\t\t\tself.$set(self.model, 'tracks', []);\n\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\tif (!self.model.visibleAssigned) {\n\t\t\t\t\t\t\t\t\t\t\t\tself.$set(self.model, 'visibleAssigned', false);\n\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\tif (!self.model.notifications) {\n\t\t\t\t\t\t\t\t\t\t\t\tself.$set(self.model, 'notifications', []);\n\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t// if (!self.model.provisionalMembers) {\n\t\t\t\t\t\t\t\t//     self.$set(self.model, 'provisionalMembers', []);\n\t\t\t\t\t\t\t\t// }\n\n\t\t\t\t\t\t\t\t// if (!self.model.defaultRooms) {\n\t\t\t\t\t\t\t\t//     self.$set(self.model, 'defaultRooms', []);\n\t\t\t\t\t\t\t\t// }\n\n\t\t\t\t\t\t\t\t// if (!self.model.defaultRosters) {\n\t\t\t\t\t\t\t\t//     self.$set(self.model, 'defaultRosters', []);\n\t\t\t\t\t\t\t\t// }\n\t\t\t\t},\n\t\t\t\tasyncComputed: {\n\t\t\t\t\t\t\t\ttracks: {\n\t\t\t\t\t\t\t\t\t\t\t\tdefault: [],\n\t\t\t\t\t\t\t\t\t\t\t\tget() {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tif (!self.model._id) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tself.loadingTracks = false;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn Promise.resolve([]);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t/////////////////////////////////\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tself.loadingTracks = true;\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t/////////////////////////////////\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn new Promise(function(resolve, reject) {\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tself.$fluro.api.get(`/teams/${self.model._id}/tracks`)\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t.then(function(res) {\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tresolve(res.data);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tself.loadingTracks = false;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t.catch(function(err) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treject(err);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tself.loadingTracks = false;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t})\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t}\n\t\t\t\t},\n\t\t\t\tmethods: {\n\t\t\t\t\t\t\t\tcreateTrack() {\n\n\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\t\t\t\t\t\t\t\t\t\t\t\tvar team = self.model;\n\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////////////////////////\n\n\t\t\t\t\t\t\t\t\t\t\t\tvar template = {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: team.title,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tfirstLine: team.firstLine,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\trealms: team.realms,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdefaultDuration: 90,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdefaultTitle: team.title,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdefaultExpectTeams: [team],\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdefaultOwnershipTeams: [team],\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdefaultFirstLine: team.firstLine,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmainImage: team.mainImage,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tautoRecur: true,\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t\t\tself.$fluro.global.create('eventtrack', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttemplate,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// copy: true,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}, true)\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t.then(function(res) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tself.processing = false;\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tself.tracks.push(res);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}, function(err) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tself.processing = false;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t}\n\n\t\t\t\t},\n\t\t\t\tcomputed: {\n\t\t\t\t\t\t\t\tinfoHeading() {\n\n\t\t\t\t\t\t\t\t\t\t\t\treturn this.definition ? `${this.definition.title} information` : 'Group Info';\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tfieldsOutput() {\n\n\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\t\t\t\t\t\t\t\t\t\t\t\tvar array = [];\n\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('title', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Track Title',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'string',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tplaceholder: 'Title',\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('firstLine', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Subtitle',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'string',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tplaceholder: 'Subtitle',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescription: 'A short one line description for this event track',\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('mainImage', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Image',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescription: 'Default image for events in this track',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'reference',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdirective: 'reference-select',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tparams: {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\trestrictType: 'image',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\n\t\t\t\t\t\t\t\t\t\t\t\t// visibleAssigned\n\t\t\t\t\t\t\t\t\t\t\t\t// addField('shareContactDetails', {\n\t\t\t\t\t\t\t\t\t\t\t\t// \t\t\t\ttitle: 'Share phone and email details with assigned contacts',\n\t\t\t\t\t\t\t\t\t\t\t\t// \t\t\t\tdescription: \"Grant any contact with an assigned position be able to view other group members phone and email address?\",\n\t\t\t\t\t\t\t\t\t\t\t\t// \t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t// \t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t// \t\t\t\ttype: 'boolean',\n\t\t\t\t\t\t\t\t\t\t\t\t// \t\t\t\tdefaultValues: [true],\n\t\t\t\t\t\t\t\t\t\t\t\t// });\n\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('visibleAssigned', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Hide from assigned contacts',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescription: \"Should assigned contacts know that they are in this group?\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'boolean',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\texpressions: {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttransform: {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tget(val) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn !val;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tset(val) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn !val;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('provisionalRoles', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Roles / Permissions',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescription: 'Roles and permissions that should be granted to provisional members for this group/team',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'reference',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdirective: 'reference-select',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tparams: {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\trestrictType: 'role',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('allowProvisional', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Allow Provisional Membership (Allow members to join and leave)',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescription: 'Set whether or not people can publicly join and leave this group without approval from applications like checkin or through your website',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'boolean',\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t// addField('shareContactDetailsProvisional', {\n\t\t\t\t\t\t\t\t\t\t\t\t// \t\t\t\ttitle: 'Allow Provisional Members to view other group members\\' phone numbers and emails',\n\t\t\t\t\t\t\t\t\t\t\t\t// \t\t\t\tdescription: 'Should provisional members be allowed to view other group members phone and email address?',\n\t\t\t\t\t\t\t\t\t\t\t\t// \t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t// \t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t// \t\t\t\ttype: 'boolean',\n\t\t\t\t\t\t\t\t\t\t\t\t// });\n\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('visibleMembers', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Visible to Members',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescription: 'Should members of this group know that they are in this group?',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'boolean',\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('provisionalMembers', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Group Members',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'reference',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdirective: 'reference-select',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tparams: {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\trestrictType: 'contact',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\n\n\t\t\t\t\t\t\t\t\t\t\t\tfunction addField(key, details) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdetails.key = key;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tarray.push(details)\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// // Vue.set(self.fields, key, details);\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// if (details.enabled === false) {\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// } else {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t//     details.enabled = true;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// }\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// var defaultValue = self.getDefaultValue(key, details);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// Vue.set(self.model, key, defaultValue);\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t\t\treturn array;\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t// hiddenAssigned: {\n\t\t\t\t\t\t\t\t// \t\t\t\tget() {\n\t\t\t\t\t\t\t\t// \t\t\t\t\t\t\t\treturn !this.model.visibleAssigned;\n\t\t\t\t\t\t\t\t// \t\t\t\t},\n\t\t\t\t\t\t\t\t// \t\t\t\tset(value) {\n\t\t\t\t\t\t\t\t// \t\t\t\t\t\t\t\tthis.$set(this.model, 'visibleAssigned', !value);\n\t\t\t\t\t\t\t\t// \t\t\t\t}\n\t\t\t\t\t\t\t\t// },\n\t\t\t\t\t\t\t\tshowOutline() {\n\t\t\t\t\t\t\t\t\t\t\t\treturn false; //true; //false;//true;//false;//true;\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tallPositions() {\n\t\t\t\t\t\t\t\t\t\t\t\treturn _.map(this.model.assignments, 'title');\n\t\t\t\t\t\t\t\t}\n\t\t\t\t},\n}\n\n</script>\n<style>\n.no-border-no-background .toggle-item {\n\t\t\t\tborder: none !important;\n\t\t\t\tbackground: none !important;\n\t\t\t\tfont-size: 14px;\n\t\t\t\tpadding: 0px;\n}\n\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$4 = undefined;
  /* module identifier */
  const __vue_module_identifier__$4 = undefined;
  /* functional template */
  const __vue_is_functional_template__$4 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$4 = __vue_normalize__(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    false,
    __vue_create_injector__,
    undefined,
    undefined
  );

export default __vue_component__$4;
//# sourceMappingURL=team-95f2058a.js.map
