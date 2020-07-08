
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { bm as __vue_normalize__, bn as __vue_create_injector__ } from './index-d96f1a0e.js';
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
import { F as FluroContentViewMixin } from './FluroContentViewMixin-fcd384a0.js';

//

var script = {
  props: {
    config: {
      type: Object,
      required: true
    },
    item: {
      type: Object,
      required: true
    }
  },
  components: {},
  mixins: [FluroContentViewMixin],
  methods: {},
  computed: {},

  data() {
    return {};
  },

  created() {
    console.log('THIS RENDERER', this);
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
      _c(
        "flex-column-body",
        { staticStyle: { background: "#fafafa" } },
        [
          _c(
            "v-container",
            { attrs: { fluid: "", "grid-list-lg": "" } },
            [
              _c(
                "constrain",
                { attrs: { sm: "" } },
                [
                  _c(
                    "v-layout",
                    { attrs: { row: "", wrap: "" } },
                    [
                      _vm.item.emails && _vm.item.emails.length
                        ? _c(
                            "v-flex",
                            { attrs: { xs12: "", sm6: "" } },
                            [
                              _c(
                                "v-input",
                                { staticClass: "no-flex" },
                                [
                                  _c("v-label", [_vm._v("Email Addresses")]),
                                  _vm._v(" "),
                                  _vm._l(_vm.item.emails, function(email) {
                                    return _c("div", [
                                      _c(
                                        "a",
                                        { attrs: { href: "mailto:" + email } },
                                        [
                                          _c("fluro-icon", {
                                            attrs: {
                                              icon: "envelope",
                                              left: ""
                                            }
                                          }),
                                          _vm._v(" " + _vm._s(email))
                                        ],
                                        1
                                      )
                                    ])
                                  })
                                ],
                                2
                              )
                            ],
                            1
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.item.phoneNumbers && _vm.item.phoneNumbers.length
                        ? _c(
                            "v-flex",
                            { attrs: { xs12: "", sm6: "" } },
                            [
                              _c(
                                "v-input",
                                { staticClass: "no-flex" },
                                [
                                  _c("v-label", [_vm._v("Phone Numbers")]),
                                  _vm._v(" "),
                                  _vm._l(_vm.item.phoneNumbers, function(
                                    number
                                  ) {
                                    return _c("div", [
                                      _c(
                                        "a",
                                        { attrs: { href: "tel:" + number } },
                                        [
                                          _c("fluro-icon", {
                                            attrs: { icon: "phone", left: "" }
                                          }),
                                          _vm._v(" " + _vm._s(number))
                                        ],
                                        1
                                      )
                                    ])
                                  })
                                ],
                                2
                              )
                            ],
                            1
                          )
                        : _vm._e()
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("h4", [
                    _vm._v(_vm._s(_vm.item.items.length) + " Family Members")
                  ]),
                  _vm._v(" "),
                  _c(
                    "list-group",
                    _vm._l(_vm.item.items, function(contact) {
                      return _c("list-group-item", {
                        key: contact._id,
                        attrs: { item: contact },
                        on: {
                          click: function($event) {
                            return _vm.$fluro.global.view(contact, true)
                          }
                        },
                        scopedSlots: _vm._u(
                          [
                            {
                              key: "right",
                              fn: function() {
                                return [
                                  _c(
                                    "v-btn",
                                    {
                                      staticClass: "ma-0",
                                      attrs: { icon: "", small: "", flat: "" },
                                      on: {
                                        click: function($event) {
                                          $event.stopPropagation();
                                          $event.preventDefault();
                                          return _vm.$actions.open([contact])
                                        }
                                      }
                                    },
                                    [
                                      _c("fluro-icon", {
                                        attrs: { icon: "ellipsis-h" }
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
                  ),
                  _vm._v(" "),
                  _vm.item.address
                    ? _c(
                        "fluro-panel",
                        [
                          _c("fluro-panel-title", [
                            _vm._v(
                              "\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tHome Address\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t"
                            )
                          ]),
                          _vm._v(" "),
                          _c(
                            "fluro-panel-body",
                            [
                              _vm.item.address.addressLine1
                                ? _c(
                                    "v-input",
                                    { staticClass: "no-flex" },
                                    [
                                      _c("v-label", [_vm._v("Address Line 1")]),
                                      _vm._v(" "),
                                      _c("div", [
                                        _vm._v(
                                          _vm._s(_vm.item.address.addressLine1)
                                        )
                                      ])
                                    ],
                                    1
                                  )
                                : _vm._e(),
                              _vm._v(" "),
                              _vm.item.address.addressLine2
                                ? _c(
                                    "v-input",
                                    { staticClass: "no-flex" },
                                    [
                                      _c("v-label", [_vm._v("Address Line 2")]),
                                      _vm._v(" "),
                                      _c("div", [
                                        _vm._v(
                                          _vm._s(_vm.item.address.addressLine2)
                                        )
                                      ])
                                    ],
                                    1
                                  )
                                : _vm._e(),
                              _vm._v(" "),
                              _c(
                                "v-layout",
                                { attrs: { row: "", wrap: "" } },
                                [
                                  _vm.item.address.suburb
                                    ? _c(
                                        "v-flex",
                                        { attrs: { xs12: "", sm3: "" } },
                                        [
                                          _c(
                                            "v-input",
                                            { staticClass: "no-flex" },
                                            [
                                              _c("v-label", [_vm._v("Suburb")]),
                                              _vm._v(" "),
                                              _c("div", [
                                                _vm._v(
                                                  _vm._s(
                                                    _vm.item.address.suburb
                                                  )
                                                )
                                              ])
                                            ],
                                            1
                                          )
                                        ],
                                        1
                                      )
                                    : _vm._e(),
                                  _vm._v(" "),
                                  _vm.item.address.state
                                    ? _c(
                                        "v-flex",
                                        { attrs: { xs12: "", sm3: "" } },
                                        [
                                          _c(
                                            "v-input",
                                            { staticClass: "no-flex" },
                                            [
                                              _c("v-label", [_vm._v("State")]),
                                              _vm._v(" "),
                                              _c("div", [
                                                _vm._v(
                                                  _vm._s(_vm.item.address.state)
                                                )
                                              ])
                                            ],
                                            1
                                          )
                                        ],
                                        1
                                      )
                                    : _vm._e(),
                                  _vm._v(" "),
                                  _vm.item.address.postalCode
                                    ? _c(
                                        "v-flex",
                                        { attrs: { xs12: "", sm3: "" } },
                                        [
                                          _c(
                                            "v-input",
                                            { staticClass: "no-flex" },
                                            [
                                              _c("v-label", [
                                                _vm._v("Postal Code")
                                              ]),
                                              _vm._v(" "),
                                              _c("div", [
                                                _vm._v(
                                                  _vm._s(
                                                    _vm.item.address.postalCode
                                                  )
                                                )
                                              ])
                                            ],
                                            1
                                          )
                                        ],
                                        1
                                      )
                                    : _vm._e(),
                                  _vm._v(" "),
                                  _vm.item.address.country
                                    ? _c(
                                        "v-flex",
                                        { attrs: { xs12: "", sm3: "" } },
                                        [
                                          _c(
                                            "v-input",
                                            { staticClass: "no-flex" },
                                            [
                                              _c("v-label", [
                                                _vm._v("Country")
                                              ]),
                                              _vm._v(" "),
                                              _c("div", [
                                                _vm._v(
                                                  _vm._s(
                                                    _vm.item.address.country
                                                  )
                                                )
                                              ])
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
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.item.postalAddress
                    ? [
                        !_vm.item.samePostal
                          ? _c(
                              "fluro-panel",
                              [
                                _c("fluro-panel-title", [
                                  _vm._v(
                                    "\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tPostal Address\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t"
                                  )
                                ]),
                                _vm._v(" "),
                                _c(
                                  "fluro-panel-body",
                                  [
                                    _vm.item.postalAddress.addressLine1
                                      ? _c(
                                          "v-input",
                                          { staticClass: "no-flex" },
                                          [
                                            _c("v-label", [
                                              _vm._v("Address Line 1")
                                            ]),
                                            _vm._v(" "),
                                            _c("div", [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.item.postalAddress
                                                    .addressLine1
                                                )
                                              )
                                            ])
                                          ],
                                          1
                                        )
                                      : _vm._e(),
                                    _vm._v(" "),
                                    _vm.item.postalAddress.addressLine2
                                      ? _c(
                                          "v-input",
                                          { staticClass: "no-flex" },
                                          [
                                            _c("v-label", [
                                              _vm._v("Address Line 2")
                                            ]),
                                            _vm._v(" "),
                                            _c("div", [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.item.postalAddress
                                                    .addressLine2
                                                )
                                              )
                                            ])
                                          ],
                                          1
                                        )
                                      : _vm._e(),
                                    _vm._v(" "),
                                    _c(
                                      "v-layout",
                                      { attrs: { row: "", wrap: "" } },
                                      [
                                        _vm.item.postalAddress.suburb
                                          ? _c(
                                              "v-flex",
                                              { attrs: { xs12: "", sm3: "" } },
                                              [
                                                _c(
                                                  "v-input",
                                                  { staticClass: "no-flex" },
                                                  [
                                                    _c("v-label", [
                                                      _vm._v("Suburb")
                                                    ]),
                                                    _vm._v(" "),
                                                    _c("div", [
                                                      _vm._v(
                                                        _vm._s(
                                                          _vm.item.postalAddress
                                                            .suburb
                                                        )
                                                      )
                                                    ])
                                                  ],
                                                  1
                                                )
                                              ],
                                              1
                                            )
                                          : _vm._e(),
                                        _vm._v(" "),
                                        _vm.item.postalAddress.state
                                          ? _c(
                                              "v-flex",
                                              { attrs: { xs12: "", sm3: "" } },
                                              [
                                                _c(
                                                  "v-input",
                                                  { staticClass: "no-flex" },
                                                  [
                                                    _c("v-label", [
                                                      _vm._v("State")
                                                    ]),
                                                    _vm._v(" "),
                                                    _c("div", [
                                                      _vm._v(
                                                        _vm._s(
                                                          _vm.item.postalAddress
                                                            .state
                                                        )
                                                      )
                                                    ])
                                                  ],
                                                  1
                                                )
                                              ],
                                              1
                                            )
                                          : _vm._e(),
                                        _vm._v(" "),
                                        _vm.item.postalAddress.postalCode
                                          ? _c(
                                              "v-flex",
                                              { attrs: { xs12: "", sm3: "" } },
                                              [
                                                _c(
                                                  "v-input",
                                                  { staticClass: "no-flex" },
                                                  [
                                                    _c("v-label", [
                                                      _vm._v("Postal Code")
                                                    ]),
                                                    _vm._v(" "),
                                                    _c("div", [
                                                      _vm._v(
                                                        _vm._s(
                                                          _vm.item.postalAddress
                                                            .postalCode
                                                        )
                                                      )
                                                    ])
                                                  ],
                                                  1
                                                )
                                              ],
                                              1
                                            )
                                          : _vm._e(),
                                        _vm._v(" "),
                                        _vm.item.postalAddress.country
                                          ? _c(
                                              "v-flex",
                                              { attrs: { xs12: "", sm3: "" } },
                                              [
                                                _c(
                                                  "v-input",
                                                  { staticClass: "no-flex" },
                                                  [
                                                    _c("v-label", [
                                                      _vm._v("Country")
                                                    ]),
                                                    _vm._v(" "),
                                                    _c("div", [
                                                      _vm._v(
                                                        _vm._s(
                                                          _vm.item.postalAddress
                                                            .country
                                                        )
                                                      )
                                                    ])
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
                          : _vm._e()
                      ]
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.fields && _vm.fields.length
                    ? [
                        _c("fluro-content-render", {
                          attrs: { fields: _vm.fields },
                          model: {
                            value: _vm.item.data,
                            callback: function($$v) {
                              _vm.$set(_vm.item, "data", $$v);
                            },
                            expression: "item.data"
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
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-3d79c640_0", { source: "/**/\n.border-top[data-v-3d79c640] {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right[data-v-3d79c640] {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom[data-v-3d79c640] {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left[data-v-3d79c640] {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\na[data-v-3d79c640] {\n  color: inherit;\n  text-decoration: none;\n  cursor: pointer;\n}\n\n/*# sourceMappingURL=family.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/view/panels/family.vue","family.vue"],"names":[],"mappings":"AA2KA,GAAA;AAYA;EACA,yCAAA;ACrLA;ADwLA;EACA,2CAAA;ACrLA;ADwLA;EACA,4CAAA;ACrLA;ADwLA;EACA,0CAAA;ACrLA;;AD6LA,GAAA;AACA;EACA,cAAA;EACA,qBAAA;EACA,eAAA;AC1LA;;AAEA,qCAAqC","file":"family.vue","sourcesContent":["<template>\n\t\t\t\t<flex-column>\n\t\t\t\t\t\t\t\t<flex-column-body style=\"background: #fafafa;\">\n\t\t\t\t\t\t\t\t\t\t\t\t<v-container fluid grid-list-lg>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<constrain sm>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-layout row wrap>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm6 v-if=\"item.emails && item.emails.length\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-input class=\"no-flex\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-label>Email Addresses</v-label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div v-for=\"email in item.emails\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a :href=\"`mailto:${email}`\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-icon icon=\"envelope\" left /> {{email}}</a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-input>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm6 v-if=\"item.phoneNumbers && item.phoneNumbers.length\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-input class=\"no-flex\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-label>Phone Numbers</v-label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div v-for=\"number in item.phoneNumbers\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a :href=\"`tel:${number}`\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-icon icon=\"phone\" left /> {{number}}</a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-input>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <fluro-panel> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <fluro-panel-title> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h4>{{item.items.length}} Family Members</h4>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- </fluro-panel-title> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<list-group>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <fluro-panel-body> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<list-group-item :item=\"contact\" :key=\"contact._id\" @click=\"$fluro.global.view(contact, true)\" v-for=\"contact in item.items\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<template v-slot:right>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-btn class=\"ma-0\" icon small flat @click.stop.prevent=\"$actions.open([contact])\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-icon icon=\"ellipsis-h\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-btn>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</list-group-item>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- </fluro-panel-body> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</list-group>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- </fluro-panel> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel v-if=\"item.address\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel-title>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tHome Address\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel-title>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-input class=\"no-flex\" v-if=\"item.address.addressLine1\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-label>Address Line 1</v-label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div>{{item.address.addressLine1}}</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-input>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-input class=\"no-flex\" v-if=\"item.address.addressLine2\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-label>Address Line 2</v-label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div>{{item.address.addressLine2}}</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-input>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-layout row wrap>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm3 v-if=\"item.address.suburb\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-input class=\"no-flex\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-label>Suburb</v-label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div>{{item.address.suburb}}</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-input>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm3 v-if=\"item.address.state\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-input class=\"no-flex\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-label>State</v-label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div>{{item.address.state}}</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-input>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm3 v-if=\"item.address.postalCode\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-input class=\"no-flex\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-label>Postal Code</v-label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div>{{item.address.postalCode}}</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-input>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm3 v-if=\"item.address.country\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-input class=\"no-flex\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-label>Country</v-label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div>{{item.address.country}}</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-input>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<template v-if=\"item.postalAddress\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel v-if=\"!item.samePostal\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel-title>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tPostal Address\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel-title>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-input class=\"no-flex\" v-if=\"item.postalAddress.addressLine1\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-label>Address Line 1</v-label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div>{{item.postalAddress.addressLine1}}</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-input>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-input class=\"no-flex\" v-if=\"item.postalAddress.addressLine2\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-label>Address Line 2</v-label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div>{{item.postalAddress.addressLine2}}</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-input>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-layout row wrap>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm3 v-if=\"item.postalAddress.suburb\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-input class=\"no-flex\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-label>Suburb</v-label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div>{{item.postalAddress.suburb}}</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-input>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm3 v-if=\"item.postalAddress.state\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-input class=\"no-flex\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-label>State</v-label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div>{{item.postalAddress.state}}</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-input>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm3 v-if=\"item.postalAddress.postalCode\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-input class=\"no-flex\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-label>Postal Code</v-label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div>{{item.postalAddress.postalCode}}</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-input>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm3 v-if=\"item.postalAddress.country\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-input class=\"no-flex\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-label>Country</v-label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div>{{item.postalAddress.country}}</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-input>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<template v-if=\"fields && fields.length\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-render :fields=\"fields\" v-model=\"item.data\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</constrain>\n\t\t\t\t\t\t\t\t\t\t\t\t</v-container>\n\t\t\t\t\t\t\t\t</flex-column-body>\n\t\t\t\t</flex-column>\n</template>\n<script>\n/////////////////////////////////\n\nimport Vue from 'vue';\n\nimport FluroContentViewMixin from 'src/components/content/view/FluroContentViewMixin.js';\n\n/////////////////////////////////\n\nexport default {\n\n\t\t\t\tprops: {\n\t\t\t\t\t\t\t\tconfig: {\n\t\t\t\t\t\t\t\t\t\t\t\ttype: Object,\n\t\t\t\t\t\t\t\t\t\t\t\trequired: true,\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\titem: {\n\t\t\t\t\t\t\t\t\t\t\t\ttype: Object,\n\t\t\t\t\t\t\t\t\t\t\t\trequired: true,\n\t\t\t\t\t\t\t\t},\n\t\t\t\t},\n\t\t\t\tcomponents: {},\n\t\t\t\tmixins: [FluroContentViewMixin],\n\t\t\t\tmethods: {},\n\t\t\t\tcomputed: {\n\n\t\t\t\t},\n\t\t\t\tdata() {\n\t\t\t\t\t\t\t\treturn {}\n\t\t\t\t},\n\t\t\t\tcreated() {\n\t\t\t\t\t\t\t\tconsole.log('THIS RENDERER', this)\n\t\t\t\t}\n}\n\n</script>\n<style scoped lang=\"scss\">\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\na {\n\t\t\t\tcolor: inherit;\n\t\t\t\ttext-decoration: none;\n\t\t\t\tcursor: pointer;\n}\n\n</style>\n","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\na {\n  color: inherit;\n  text-decoration: none;\n  cursor: pointer;\n}\n\n/*# sourceMappingURL=family.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-3d79c640";
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
//# sourceMappingURL=family-169e4886.js.map
