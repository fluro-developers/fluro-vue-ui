
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { ah as FluroContentView, bo as _, bm as __vue_normalize__, bn as __vue_create_injector__ } from './index-c8dca37f.js';
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
import { G as GuestList, L as LocationViewMapComponent } from './GuestList-9db2bd83.js';
import { T as TicketList } from './TicketList-f88ed7c4.js';
import { F as FluroContentViewMixin } from './FluroContentViewMixin-e211c5d2.js';

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
  components: {
    FluroContentView,
    GuestList,
    TicketList,
    LocationViewMapComponent
  },
  mixins: [FluroContentViewMixin],
  methods: {
    confirmationIcon(assignment) {
      switch (assignment.confirmationStatus) {
        case 'confirmed':
          return 'check';

        case 'denied':
          return 'times';

        case 'unknown':
          return 'clock';

        case 'proposed':
          return 'question-circle';
      }
    }

  },
  asyncComputed: {
    songs: {
      default: [],

      get() {
        var self = this;
        self.loadingSongs = true;
        return new Promise(function (resolve, reject) {
          self.$fluro.api.get(`/event/${self.itemID}/songs`).then(function (res) {
            resolve(res.data);
            self.loadingSongs = false;
          }).catch(function (err) {
            reject(err);
            self.loadingSongs = false;
          });
        });
      }

    }
  },
  computed: {
    showPhotos() {
      var self = this;
      var accessAllowed = self.$fluro.access.canKnowOf('photo');

      if (!accessAllowed) {
        return;
      }

      var now = new Date();
      var startDate = new Date(self.item.startDate);
      var isInPast = now >= startDate;
      return isInPast;
    },

    roomHash() {
      return _.reduce(this.item.rooms, function (set, room) {
        var locationName = String(room.locationName).toLowerCase();

        if (!set[locationName]) {
          set[locationName] = [];
        }

        set[locationName].push(room);
        return set;
      }, {});
    },

    locations() {
      var self = this;
      return _.map(self.item.locations, function (location) {
        var locationName = String(location.title).toLowerCase();
        location.selectedRooms = self.roomHash[locationName] || [];
        return location;
      });
    },

    croppedFields() {
      return _.filter(this.fields, function (field) {
        return field.key != 'songs';
      });
    },

    // songs() {
    //     return this.item.songs || [];
    // },
    // songIDs() {
    //     var self = this;
    //     var eventSongs = _.chain(self.item)
    //     .get('data.songs')
    //     .compact()
    //     .value();
    //     var planSongs = _.chain(self.plans)
    //     .map('schedules')
    //     .flatten()
    //     .filter({type:'song'})
    //     .map('links')
    //     .flatten()
    //     .compact()
    //     .value();
    //     return self.$fluro.utils.arrayIDs([].concat(eventSongs, planSongs));
    // },
    plans() {
      return this.item.plans || [];
    },

    readableTypeName() {
      return this.definition ? this.$fluro.types.readable(this.definition.title) : 'Event';
    }

  },

  data() {
    return {
      loadingSongs: true
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
      _vm.loading || _vm.loadingSongs
        ? [_c("fluro-page-preloader", { attrs: { contain: "" } })]
        : _c(
            "tabset",
            { attrs: { justified: true, vertical: true } },
            [
              _c(
                "tab",
                { attrs: { heading: _vm.readableTypeName + " Info" } },
                [
                  _c(
                    "flex-column-body",
                    [
                      _c(
                        "v-container",
                        [
                          _c(
                            "constrain",
                            { attrs: { sm: "" } },
                            [
                              _vm.item.mainImage
                                ? [
                                    _c("fluro-image", {
                                      attrs: {
                                        item: _vm.item.mainImage,
                                        imageWidth: 1200,
                                        imageHeight: 675,
                                        from: _vm.item._id
                                      }
                                    })
                                  ]
                                : _vm._e(),
                              _vm._v(" "),
                              _c(
                                "v-container",
                                {
                                  staticClass: "border-bottom",
                                  attrs: { fluid: "", "pa-2": "" }
                                },
                                [
                                  _c("h2", [
                                    _c("strong", [
                                      _vm._v(_vm._s(_vm.item.title))
                                    ])
                                  ]),
                                  _vm._v(" "),
                                  _c(
                                    "h4",
                                    { staticClass: "muted text-uppercase" },
                                    [_vm._v(_vm._s(_vm.item.firstLine))]
                                  ),
                                  _vm._v(" "),
                                  _c("h3", [
                                    _vm._v(
                                      _vm._s(
                                        _vm._f("readableEventDate")(_vm.item)
                                      )
                                    )
                                  ])
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "v-container",
                                { attrs: { fluid: "", "pa-2": "" } },
                                [
                                  _vm.item.body && _vm.item.body.length
                                    ? [
                                        _c("div", {
                                          domProps: {
                                            innerHTML: _vm._s(_vm.item.body)
                                          }
                                        })
                                      ]
                                    : _vm._e()
                                ],
                                2
                              ),
                              _vm._v(" "),
                              _vm.item.videos && _vm.item.videos.length
                                ? _c(
                                    "v-container",
                                    {
                                      attrs: {
                                        "grid-list-xl": "",
                                        fluid: "",
                                        "pa-2": ""
                                      }
                                    },
                                    [
                                      _c(
                                        "v-layout",
                                        { attrs: { row: "", wrap: "" } },
                                        _vm._l(_vm.item.videos, function(
                                          video
                                        ) {
                                          return _c(
                                            "v-flex",
                                            {
                                              key: video._id,
                                              attrs: {
                                                xs12:
                                                  _vm.item.videos.length == 1,
                                                xs6: _vm.item.videos.length > 1
                                              }
                                            },
                                            [
                                              _c(
                                                "fluro-panel",
                                                [
                                                  _c(
                                                    "fluro-panel-title",
                                                    [
                                                      _c(
                                                        "v-layout",
                                                        {
                                                          attrs: {
                                                            "align-center": ""
                                                          }
                                                        },
                                                        [
                                                          _c(
                                                            "v-flex",
                                                            [
                                                              _c("fluro-icon", {
                                                                attrs: {
                                                                  left: "",
                                                                  type: "video"
                                                                }
                                                              }),
                                                              _vm._v(" "),
                                                              _c("strong", [
                                                                _vm._v(
                                                                  _vm._s(
                                                                    video.title
                                                                  )
                                                                )
                                                              ])
                                                            ],
                                                            1
                                                          ),
                                                          _vm._v(" "),
                                                          _c(
                                                            "v-flex",
                                                            {
                                                              attrs: {
                                                                shrink: ""
                                                              }
                                                            },
                                                            [
                                                              _c(
                                                                "v-btn",
                                                                {
                                                                  staticClass:
                                                                    "ma-0",
                                                                  attrs: {
                                                                    small: "",
                                                                    icon: ""
                                                                  },
                                                                  on: {
                                                                    click: function(
                                                                      $event
                                                                    ) {
                                                                      return _vm.$actions.open(
                                                                        [video]
                                                                      )
                                                                    }
                                                                  }
                                                                },
                                                                [
                                                                  _c(
                                                                    "fluro-icon",
                                                                    {
                                                                      attrs: {
                                                                        icon:
                                                                          "ellipsis-h"
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
                                                  _c("fluro-video", {
                                                    attrs: { item: video }
                                                  })
                                                ],
                                                1
                                              )
                                            ],
                                            1
                                          )
                                        }),
                                        1
                                      )
                                    ],
                                    1
                                  )
                                : _vm._e(),
                              _vm._v(" "),
                              _c(
                                "v-container",
                                { attrs: { fluid: "", "pa-2": "" } },
                                [
                                  _vm.item.assets && _vm.item.assets.length
                                    ? [
                                        _c("h3", { attrs: { margin: "" } }, [
                                          _vm._v("Downloads & Resources")
                                        ]),
                                        _vm._v(" "),
                                        _c(
                                          "list-group",
                                          _vm._l(_vm.item.assets, function(
                                            asset,
                                            index
                                          ) {
                                            return _c("list-group-item", {
                                              attrs: { item: asset },
                                              on: {
                                                click: function($event) {
                                                  return _vm.$fluro.global.view(
                                                    _vm.song,
                                                    true
                                                  )
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
                                                            attrs: { icon: "" },
                                                            on: {
                                                              click: function(
                                                                $event
                                                              ) {
                                                                return _vm.$actions.open(
                                                                  [asset]
                                                                )
                                                              }
                                                            }
                                                          },
                                                          [
                                                            _c("fluro-icon", {
                                                              attrs: {
                                                                icon:
                                                                  "ellipsis-h"
                                                              }
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
                                      ]
                                    : _vm._e(),
                                  _vm._v(" "),
                                  _vm.fields.length
                                    ? [
                                        _c("h3", { attrs: { margin: "" } }, [
                                          _vm._v(
                                            _vm._s(_vm.definition.title) +
                                              " Details"
                                          )
                                        ]),
                                        _vm._v(" "),
                                        _c("fluro-content-render", {
                                          attrs: { fields: _vm.croppedFields },
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
                              ),
                              _vm._v(" "),
                              _vm.locations.length
                                ? _c(
                                    "v-container",
                                    { attrs: { fluid: "", "pa-2": "" } },
                                    [
                                      _c(
                                        "fluro-panel",
                                        [
                                          _c("location-view-map-component", {
                                            staticStyle: {
                                              width: "100%",
                                              "min-height": "300px",
                                              height: "0",
                                              "padding-bottom": "40%"
                                            },
                                            attrs: { positions: _vm.locations }
                                          }),
                                          _vm._v(" "),
                                          _c(
                                            "fluro-panel-body",
                                            { staticClass: "border-top" },
                                            [
                                              _c(
                                                "v-layout",
                                                {
                                                  attrs: { "align-center": "" }
                                                },
                                                [
                                                  _c(
                                                    "v-flex",
                                                    { attrs: { shrink: "" } },
                                                    [
                                                      _c("fluro-icon", {
                                                        attrs: {
                                                          library: "fas",
                                                          left: "",
                                                          icon: "map-marker-alt"
                                                        }
                                                      })
                                                    ],
                                                    1
                                                  ),
                                                  _vm._v(" "),
                                                  _vm._l(
                                                    _vm.locations,
                                                    function(location) {
                                                      return _c("v-flex", [
                                                        _c("strong", [
                                                          _vm._v(
                                                            _vm._s(
                                                              location.title
                                                            )
                                                          )
                                                        ]),
                                                        _vm._v(" "),
                                                        location.selectedRooms
                                                          .length
                                                          ? _c(
                                                              "div",
                                                              {
                                                                staticClass:
                                                                  "sm muted"
                                                              },
                                                              [
                                                                _c("strong", [
                                                                  _vm._v(
                                                                    "Rooms:"
                                                                  )
                                                                ]),
                                                                _vm._v(
                                                                  " " +
                                                                    _vm._s(
                                                                      _vm._f(
                                                                        "comma"
                                                                      )(
                                                                        location.selectedRooms,
                                                                        "title"
                                                                      )
                                                                    )
                                                                )
                                                              ]
                                                            )
                                                          : _vm._e()
                                                      ])
                                                    }
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
              _vm.songs.length
                ? _c(
                    "tab",
                    {
                      attrs: {
                        heading:
                          _vm.songs.length +
                          " Song" +
                          (_vm.songs.length == 1 ? "" : "s")
                      }
                    },
                    [
                      _c(
                        "flex-column-body",
                        [
                          _c(
                            "v-container",
                            [
                              _c(
                                "constrain",
                                { attrs: { sm: "" } },
                                [
                                  _c("h3", { attrs: { margin: "" } }, [
                                    _vm._v("Songs")
                                  ]),
                                  _vm._v(" "),
                                  _c(
                                    "list-group",
                                    _vm._l(_vm.songs, function(song, index) {
                                      return _c("list-group-item", {
                                        attrs: { item: song },
                                        on: {
                                          click: function($event) {
                                            return _vm.$fluro.global.view(
                                              song,
                                              true
                                            )
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
                                                      attrs: { icon: "" },
                                                      on: {
                                                        click: function(
                                                          $event
                                                        ) {
                                                          return _vm.$actions.open(
                                                            [song]
                                                          )
                                                        }
                                                      }
                                                    },
                                                    [
                                                      _c("fluro-icon", {
                                                        attrs: {
                                                          icon: "ellipsis-h"
                                                        }
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
                    ],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.item.rostered
                ? _c(
                    "tab",
                    { attrs: { heading: "Team Members" } },
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
                                    { attrs: { "align-center": "" } },
                                    [
                                      _c("v-flex", [
                                        _c("h3", { attrs: { margin: "" } }, [
                                          _vm._v("Team Members")
                                        ])
                                      ])
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _vm._l(_vm.item.rostered, function(roster) {
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
                                                _c("v-flex", [
                                                  _c("strong", [
                                                    _vm._v(_vm._s(roster.title))
                                                  ])
                                                ]),
                                                _vm._v(" "),
                                                _vm.$fluro.access.canEditItem(
                                                  roster
                                                )
                                                  ? _c(
                                                      "v-flex",
                                                      { attrs: { shrink: "" } },
                                                      [
                                                        _c(
                                                          "v-btn",
                                                          {
                                                            directives: [
                                                              {
                                                                name: "tippy",
                                                                rawName:
                                                                  "v-tippy"
                                                              }
                                                            ],
                                                            staticClass: "ma-0",
                                                            attrs: {
                                                              icon: "",
                                                              content: "Actions"
                                                            },
                                                            on: {
                                                              click: function(
                                                                $event
                                                              ) {
                                                                return _vm.$actions.open(
                                                                  [roster]
                                                                )
                                                              }
                                                            }
                                                          },
                                                          [
                                                            _c("fluro-icon", {
                                                              attrs: {
                                                                icon:
                                                                  "ellipsis-h"
                                                              }
                                                            })
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
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "fluro-panel-body",
                                          [
                                            _c(
                                              "v-layout",
                                              { attrs: { row: "", wrap: "" } },
                                              _vm._l(roster.slots, function(
                                                slot
                                              ) {
                                                return slot.assignments &&
                                                  slot.assignments.length
                                                  ? _c(
                                                      "v-flex",
                                                      {
                                                        attrs: {
                                                          xs6: "",
                                                          sm4: "",
                                                          md3: ""
                                                        }
                                                      },
                                                      [
                                                        _c(
                                                          "v-container",
                                                          {
                                                            staticClass:
                                                              "mb-2 pa-2"
                                                          },
                                                          [
                                                            _c("h5", [
                                                              _vm._v(
                                                                _vm._s(
                                                                  slot.title
                                                                )
                                                              )
                                                            ]),
                                                            _vm._v(" "),
                                                            _vm._l(
                                                              slot.assignments,
                                                              function(
                                                                assignment
                                                              ) {
                                                                return _c(
                                                                  "div",
                                                                  {
                                                                    staticClass:
                                                                      "assignment-item",
                                                                    class:
                                                                      assignment.confirmationStatus,
                                                                    on: {
                                                                      click: function(
                                                                        $event
                                                                      ) {
                                                                        return _vm.$actions.open(
                                                                          [
                                                                            assignment
                                                                          ]
                                                                        )
                                                                      }
                                                                    }
                                                                  },
                                                                  [
                                                                    _c(
                                                                      "v-layout",
                                                                      [
                                                                        _c(
                                                                          "v-flex",
                                                                          [
                                                                            _vm._v(
                                                                              "\n                                                        " +
                                                                                _vm._s(
                                                                                  assignment.contact &&
                                                                                    assignment
                                                                                      .contact
                                                                                      .title
                                                                                    ? assignment
                                                                                        .contact
                                                                                        .title
                                                                                    : assignment.contactName
                                                                                ) +
                                                                                "\n                                                    "
                                                                            )
                                                                          ]
                                                                        ),
                                                                        _vm._v(
                                                                          " "
                                                                        ),
                                                                        _c(
                                                                          "v-flex",
                                                                          {
                                                                            attrs: {
                                                                              shrink:
                                                                                ""
                                                                            }
                                                                          },
                                                                          [
                                                                            _c(
                                                                              "fluro-icon",
                                                                              {
                                                                                attrs: {
                                                                                  right:
                                                                                    "",
                                                                                  icon: _vm.confirmationIcon(
                                                                                    assignment
                                                                                  )
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
                                                              }
                                                            )
                                                          ],
                                                          2
                                                        )
                                                      ],
                                                      1
                                                    )
                                                  : _vm._e()
                                              }),
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
                    ],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.plans.length
                ? _vm._l(_vm.plans, function(plan, index) {
                    return _c(
                      "tab",
                      { attrs: { heading: plan.title } },
                      [
                        _c("fluro-content-view", {
                          attrs: {
                            id: _vm.plans[index],
                            embedded: true,
                            type: "plan"
                          }
                        })
                      ],
                      1
                    )
                  })
                : _vm._e(),
              _vm._v(" "),
              _c(
                "tab",
                { attrs: { heading: "Guest List" } },
                [
                  _c(
                    "flex-column-body",
                    [
                      _c(
                        "v-container",
                        [
                          _c(
                            "constrain",
                            { attrs: { sm: "" } },
                            [_c("guest-list", { attrs: { event: _vm.item } })],
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
                { attrs: { heading: "Tickets" } },
                [
                  _c(
                    "flex-column-body",
                    [
                      _c(
                        "v-container",
                        [
                          _c(
                            "constrain",
                            { attrs: { sm: "" } },
                            [_c("ticket-list", { attrs: { event: _vm.item } })],
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
    ],
    2
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-bf29b3e0_0", { source: "/**/\n.border-top[data-v-bf29b3e0] {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right[data-v-bf29b3e0] {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom[data-v-bf29b3e0] {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left[data-v-bf29b3e0] {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.assignment-item[data-v-bf29b3e0] {\n  font-size: 12px;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  border-radius: 100px;\n  margin-bottom: 2px;\n  padding: 2px 10px;\n  font-weight: 500;\n  background-color: rgba(0, 0, 0, 0.05);\n}\n.assignment-item.confirmed[data-v-bf29b3e0] {\n  color: #4cc650;\n  background-color: rgba(76, 198, 80, 0.05);\n}\n.assignment-item.denied[data-v-bf29b3e0] {\n  color: #d93e63;\n  background-color: rgba(217, 62, 99, 0.05);\n}\n.assignment-item.unknown[data-v-bf29b3e0] {\n  color: #555;\n}\n.assignment-item.proposed[data-v-bf29b3e0] {\n  background-color: rgba(42, 212, 185, 0.1);\n  color: #197f6f;\n}\n\n/*# sourceMappingURL=event.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/view/panels/event.vue","event.vue"],"names":[],"mappings":"AAoXA,GAAA;AAYA;EACA,yCAAA;AC9XA;ADiYA;EACA,2CAAA;AC9XA;ADiYA;EACA,4CAAA;AC9XA;ADiYA;EACA,0CAAA;AC9XA;;ADsYA,GAAA;AACA;EACA,eAAA;EACA,uBAAA;EAEA,mBAAA;EAEA,gBAAA;EAEA,oBAAA;EACA,kBAAA;EACA,iBAAA;EACA,gBAAA;EACA,qCAAA;ACtYA;ADwYA;EACA,cA9CA;EA+CA,yCAAA;ACtYA;ADyYA;EACA,cAjDA;EAkDA,yCAAA;ACvYA;AD0YA;EACA,WAAA;ACxYA;AD2YA;EACA,yCAAA;EACA,cAAA;ACzYA;;AAEA,oCAAoC","file":"event.vue","sourcesContent":["<template>\n    <flex-column>\n        <template v-if=\"loading || loadingSongs\">\n            <fluro-page-preloader contain />\n        </template>\n        <tabset v-else :justified=\"true\" :vertical=\"true\">\n            <tab :heading=\"`${readableTypeName} Info`\">\n                <flex-column-body>\n                    <!-- TESTING STUFF -->\n                    <!-- <pre>{{item}}</pre> -->\n                    \n                    <!-- <img preload-image aspect=\"56.25\" ng-src=\"{{$root.asset.imageUrl(item.mainImage._id, 768, null, {from:item._id})}}\" /> -->\n                    <!-- <fluro-image/> -->\n                    <v-container>\n                        <constrain sm>\n                            <template v-if=\"item.mainImage\">\n                        <fluro-image :item=\"item.mainImage\" :imageWidth=\"1200\" :imageHeight=\"675\" :from=\"item._id\" />\n                    </template>\n                    \n                            <v-container fluid pa-2 class=\"border-bottom\">\n                                <h2><strong>{{item.title}}</strong></h2>\n                                <h4 class=\"muted text-uppercase\">{{item.firstLine}}</h4>\n                                <h3>{{item | readableEventDate}}</h3>\n                            </v-container>\n                            <v-container fluid pa-2>\n                                <template v-if=\"item.body && item.body.length\">\n                                    <div v-html=\"item.body\"></div>\n                                </template>\n                            </v-container>\n                            <v-container grid-list-xl fluid pa-2 v-if=\"item.videos && item.videos.length\">\n                                <v-layout row wrap>\n                                    <v-flex :xs12=\"item.videos.length == 1\" :xs6=\"item.videos.length > 1\" :key=\"video._id\" v-for=\"video in item.videos\">\n                                        <fluro-panel>\n                                            <fluro-panel-title>\n                                                <v-layout align-center>\n                                                    <v-flex>\n                                                        <fluro-icon left type=\"video\"/>\n                                                        <strong>{{video.title}}</strong>\n                                                    </v-flex>\n                                                    <v-flex shrink>\n                                                        <v-btn small icon class=\"ma-0\" @click=\"$actions.open([video])\">\n                                                            <fluro-icon icon=\"ellipsis-h\" />\n                                                        </v-btn>\n                                                    </v-flex>\n                                                </v-layout>\n                                            </fluro-panel-title>\n                                            <fluro-video :item=\"video\" />\n                                            <!-- <pre>{{item.videos}}</pre> -->\n                                        </fluro-panel>\n                                    </v-flex>\n                                </v-layout>\n                            </v-container>\n                            <v-container fluid pa-2>\n                                <template v-if=\"item.assets && item.assets.length\">\n                                    <h3 margin>Downloads & Resources</h3>\n                                    <list-group>\n                                        <list-group-item @click=\"$fluro.global.view(song, true)\" :item=\"asset\" v-for=\"(asset, index) in item.assets\">\n                                            <template v-slot:right>\n                                                <v-btn class=\"ma-0\" icon @click=\"$actions.open([asset])\">\n                                                    <fluro-icon icon=\"ellipsis-h\" />\n                                                </v-btn>\n                                            </template>\n                                        </list-group-item>\n                                    </list-group>\n                                </template>\n                                <template v-if=\"fields.length\">\n                                    <h3 margin>{{ definition.title }} Details</h3>\n                                    <fluro-content-render :fields=\"croppedFields\" v-model=\"item.data\" />\n                                </template>\n                            </v-container>\n                            <v-container fluid pa-2 v-if=\"locations.length\">\n                                <fluro-panel>\n                                    <location-view-map-component style=\"width:100%;min-height:300px;height:0; padding-bottom: 40%;\" :positions=\"locations\" />\n                                    <fluro-panel-body class=\"border-top\">\n                                        <!-- <pre>{{item.locations}}</pre> -->\n                                        <v-layout align-center>\n                                            <v-flex shrink>\n                                                <fluro-icon library=\"fas\" left icon=\"map-marker-alt\" />\n                                            </v-flex>\n                                            <v-flex v-for=\"location in locations\">\n                                                <strong>{{location.title}}</strong>\n                                                <div class=\"sm muted\" v-if=\"location.selectedRooms.length\"><strong>Rooms:</strong> {{location.selectedRooms | comma('title')}}</div>\n                                                <!-- <pre>{{location}}</pre> -->\n                                            </v-flex>\n                                        </v-layout>\n                                    </fluro-panel-body>\n                                </fluro-panel>\n                            </v-container>\n                        </constrain>\n                    </v-container>\n                </flex-column-body>\n            </tab>\n            <tab :heading=\"`${songs.length} Song${songs.length == 1 ? '' : 's'}`\" v-if=\"songs.length\">\n                <flex-column-body>\n                    <v-container>\n                        <constrain sm>\n                            <h3 margin>Songs</h3>\n                            <list-group>\n                                <list-group-item @click=\"$fluro.global.view(song, true)\" :item=\"song\" v-for=\"(song, index) in songs\">\n                                    <template v-slot:right>\n                                        <v-btn class=\"ma-0\" icon @click=\"$actions.open([song])\">\n                                            <fluro-icon icon=\"ellipsis-h\" />\n                                        </v-btn>\n                                    </template>\n                                </list-group-item>\n                            </list-group>\n                            <!-- <fluro-list-item/> -->\n                        </constrain>\n                    </v-container>\n                </flex-column-body>\n            </tab>\n            <tab :heading=\"`Team Members`\" v-if=\"item.rostered\">\n                <flex-column-body style=\"background: #fafafa;\">\n                    <v-container>\n                        <constrain sm>\n                            <v-layout align-center>\n                                <v-flex>\n                                    <h3 margin>Team Members</h3>\n                                </v-flex>\n                                <!-- <v-flex shrink>\n                                    <v-btn color=\"primary\" :to=\"{name:'events.multi', query:{ids:[model._id]}}\">\n                                        Open in Multi Planner\n                                        <fluro-icon right icon=\"game-board\" />\n                                    </v-btn>\n                                </v-flex> -->\n                            </v-layout>\n                            <fluro-panel v-for=\"roster in item.rostered\">\n                                <fluro-panel-title>\n                                    <v-layout align-center>\n                                        <v-flex>\n                                            <strong>{{roster.title}}</strong>\n                                        </v-flex>\n                                        <v-flex shrink v-if=\"$fluro.access.canEditItem(roster)\">\n                                            <v-btn icon class=\"ma-0\" @click=\"$actions.open([roster])\" v-tippy :content=\"`Actions`\">\n                                                <fluro-icon icon=\"ellipsis-h\" />\n                                            </v-btn>\n                                        </v-flex>\n                                    </v-layout>\n                                </fluro-panel-title>\n                                <fluro-panel-body>\n                                    <v-layout row wrap>\n                                        <v-flex xs6 sm4 md3 v-for=\"slot in roster.slots\" v-if=\"slot.assignments && slot.assignments.length\">\n                                            <v-container class=\"mb-2 pa-2\">\n                                                <h5>{{slot.title}}</h5>\n                                                <div class=\"assignment-item\" @click=\"$actions.open([assignment])\" :class=\"assignment.confirmationStatus\" v-for=\"assignment in slot.assignments\">\n                                                    <v-layout>\n                                                        <v-flex>\n                                                            {{assignment.contact && assignment.contact.title ? assignment.contact.title : assignment.contactName}}\n                                                        </v-flex>\n                                                        <v-flex shrink>\n                                                            <fluro-icon right :icon=\"confirmationIcon(assignment)\" />\n                                                        </v-flex>\n                                                    </v-layout>\n                                                </div>\n                                            </v-container>\n                                        </v-flex>\n                                    </v-layout>\n                                    <!-- <pre>{{roster}}</pre> -->\n                                </fluro-panel-body>\n                            </fluro-panel>\n                            <!-- <v-btn block @click=\"createRoster(rosterType)\" class=\"btn-ghost\" v-for=\"rosterType in rosterTypes\">\n                                Add {{rosterType.title}}\n                            </v-btn> -->\n                        </constrain>\n                    </v-container>\n                </flex-column-body>\n            </tab>\n            <template v-if=\"plans.length\">\n                <tab :heading=\"plan.title\" v-for=\"(plan, index) in plans\">\n                    <fluro-content-view :id=\"plans[index]\" :embedded=\"true\" type=\"plan\" />\n                    <!-- <flex-column-body>\n                    <v-container>\n                        <constrain sm>\n                            <guest-list :event=\"item\" />\n                        </constrain>\n                    </v-container>\n                </flex-column-body> -->\n                </tab>\n            </template>\n            <tab heading=\"Guest List\">\n                <flex-column-body>\n                    <v-container>\n                        <constrain sm>\n                            <guest-list :event=\"item\" />\n                        </constrain>\n                    </v-container>\n                </flex-column-body>\n            </tab>\n            <tab heading=\"Tickets\">\n                <flex-column-body>\n                    <v-container>\n                        <constrain sm>\n                            <ticket-list :event=\"item\" />\n                        </constrain>\n                    </v-container>\n                </flex-column-body>\n            </tab>\n\n\n            \n            <!--  <tab heading=\"Photos\" :v-if=\"showPhotos\">\n                <flex-column-body>\n                    <v-container>\n                        <constrain sm>\n                            <guest-list :event=\"item\" />\n                        </constrain>\n                    </v-container>\n                </flex-column-body>\n            </tab> -->\n        </tabset>\n    </flex-column>\n</template>\n<script>\n/////////////////////////////////\n\nimport Vue from 'vue';\nimport _ from 'lodash';\n\n\nimport FluroContentView from 'src/components/content/view/FluroContentView.vue';\nimport LocationViewMapComponent from 'src/components/content/event/LocationViewMapComponent.vue';\nimport FluroContentViewMixin from 'src/components/content/view/FluroContentViewMixin.js';\nimport GuestList from 'src/components/content/event/GuestList.vue';\nimport TicketList from 'src/components/content/event/TicketList.vue';\n\n/////////////////////////////////\n\nexport default {\n    props: {\n        config: {\n            type: Object,\n            required: true,\n        },\n        item: {\n            type: Object,\n            required: true,\n        },\n    },\n    components: {\n        FluroContentView,\n        GuestList,\n        TicketList,\n        LocationViewMapComponent,\n    },\n    mixins: [FluroContentViewMixin],\n    methods: {\n        confirmationIcon(assignment) {\n\n            switch (assignment.confirmationStatus) {\n                case 'confirmed':\n                    return 'check';\n                    break;\n                case 'denied':\n                    return 'times';\n                    break;\n                case 'unknown':\n                    return 'clock';\n                    break;\n                case 'proposed':\n                    return 'question-circle';\n                    break;\n            }\n\n        },\n    },\n    asyncComputed: {\n        songs: {\n            default: [],\n            get() {\n                var self = this;\n                self.loadingSongs = true;\n\n                return new Promise(function(resolve, reject) {\n\n                    self.$fluro.api.get(`/event/${self.itemID}/songs`)\n                        .then(function(res) {\n\n                            resolve(res.data);\n                            self.loadingSongs = false;\n                        })\n                        .catch(function(err) {\n                            reject(err);\n                            self.loadingSongs = false;\n                        });\n                })\n            },\n        },\n    },\n    computed: {\n        showPhotos() {\n            var self = this;\n\n            var accessAllowed = self.$fluro.access.canKnowOf('photo');\n            if (!accessAllowed) {\n                return;\n            }\n\n            var now = new Date();\n            var startDate = new Date(self.item.startDate);\n            var isInPast = now >= startDate;\n\n            return isInPast;\n        },\n        roomHash() {\n            var self = this;\n            return _.reduce(this.item.rooms, function(set, room) {\n                var locationName = String(room.locationName).toLowerCase();\n\n                if (!set[locationName]) {\n                    set[locationName] = [];\n                }\n\n                set[locationName].push(room);\n                return set;\n            }, {})\n        },\n        locations() {\n            var self = this;\n\n            return _.map(self.item.locations, function(location) {\n                var locationName = String(location.title).toLowerCase();\n                location.selectedRooms = self.roomHash[locationName] || [];\n\n                return location;\n            })\n        },\n        croppedFields() {\n            return _.filter(this.fields, function(field) {\n                return field.key != 'songs';\n            });\n        },\n        // songs() {\n        //     return this.item.songs || [];\n        // },\n        // songIDs() {\n\n        //     var self = this;\n\n\n        //     var eventSongs = _.chain(self.item)\n        //     .get('data.songs')\n        //     .compact()\n        //     .value();\n\n        //     var planSongs = _.chain(self.plans)\n        //     .map('schedules')\n        //     .flatten()\n        //     .filter({type:'song'})\n        //     .map('links')\n        //     .flatten()\n        //     .compact()\n        //     .value();\n\n\n        //     return self.$fluro.utils.arrayIDs([].concat(eventSongs, planSongs));\n        // },\n        plans() {\n            return this.item.plans || [];\n        },\n        readableTypeName() {\n            return this.definition ? this.$fluro.types.readable(this.definition.title) : 'Event';\n        },\n    },\n    data() {\n        return {\n            loadingSongs: true,\n        }\n    },\n}\n</script>\n<style scoped lang=\"scss\">\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n.assignment-item {\n    font-size: 12px;\n    text-overflow: ellipsis;\n    ;\n    white-space: nowrap;\n    ;\n    overflow: hidden;\n    ;\n    border-radius: 100px;\n    margin-bottom: 2px;\n    padding: 2px 10px;\n    font-weight: 500;\n    background-color: rgba(#000, 0.05);\n\n    &.confirmed {\n        color: $success;\n        background-color: rgba($success, 0.05);\n    }\n\n    &.denied {\n        color: $danger;\n        background-color: rgba($danger, 0.05);\n    }\n\n    &.unknown {\n        color: #555;\n    }\n\n    &.proposed {\n        background-color: rgba($primary, 0.1);\n        color: darken($primary, 20%);\n    }\n}\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.assignment-item {\n  font-size: 12px;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  border-radius: 100px;\n  margin-bottom: 2px;\n  padding: 2px 10px;\n  font-weight: 500;\n  background-color: rgba(0, 0, 0, 0.05);\n}\n.assignment-item.confirmed {\n  color: #4cc650;\n  background-color: rgba(76, 198, 80, 0.05);\n}\n.assignment-item.denied {\n  color: #d93e63;\n  background-color: rgba(217, 62, 99, 0.05);\n}\n.assignment-item.unknown {\n  color: #555;\n}\n.assignment-item.proposed {\n  background-color: rgba(42, 212, 185, 0.1);\n  color: #197f6f;\n}\n\n/*# sourceMappingURL=event.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-bf29b3e0";
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
//# sourceMappingURL=event-51bd9fbe.js.map
