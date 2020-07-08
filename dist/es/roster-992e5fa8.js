
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { bo as _, bm as __vue_normalize__, bn as __vue_create_injector__ } from './index-eec52580.js';
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
import moment from 'moment';
import { F as FluroContentEditMixin } from './FluroContentEditMixin-0990dcae.js';
import './FluroExclusiveSelector-8363d633.js';
import { R as ReminderEventManager } from './ReminderEventManager-628542ba.js';

//
var script = {
  props: {
    assignmentSlot: {
      type: Object
    },
    event: {
      type: Object
    },
    value: {
      type: Object
    }
  },

  data() {
    return {
      model: this.value
    };
  },

  watch: {
    value(val) {
      this.model = val;
    }

  },
  methods: {
    timeDifference(date1, date2) {
      var measure = moment(date1).from(date2, true);

      if (date1 < date2) {
        return measure + ' before this event';
      } else {
        return measure + ' after this event';
      }
    }

  },
  computed: {
    isLoading() {
      var self = this;
      return self.model.loading;
    },

    conflictExplanation() {
      var self = this;

      if (!self.assignments || !self.assignments.length) {
        return;
      }

      var reasonsMap = self.declinedReasons;
      return `<strong>${_.values(reasonsMap.descriptions).join(', ')}</strong> (${_.values(reasonsMap.positions).join(', ')})`;
    },

    assignmentsExplanation() {
      var self = this;

      if (!self.assignments || !self.assignments.length) {
        return;
      }

      var reasonsMap = self.declinedReasons;
      return `<strong>${_.values(reasonsMap.descriptions).join(', ')}</strong> (${_.values(reasonsMap.positions).join(', ')})`;
    },

    declinedReasons() {
      var self = this;
      return _.reduce(self.assignments, function (set, assignment) {
        var description = assignment.description || 'Unavailable.';
        var position = assignment.title;

        if (!set.descriptions[description.toLowerCase()]) {
          set.descriptions[description.toLowerCase()] = description;
        }

        if (!set.positions[position.toLowerCase()]) {
          set.positions[position.toLowerCase()] = position;
        }

        return set;
      }, {
        descriptions: {},
        positions: {}
      });
    },

    teams() {
      return this.model.teams && this.model.teams.length ? this.model.teams.join(', ') : null;
    },

    capabilities() {
      return this.model.capabilities && this.model.capabilities.length ? _.map(this.model.capabilities, 'title').join(', ') : null;
    },

    endDate() {
      return new Date(this.event.endDate);
    },

    startDate() {
      return new Date(this.event.startDate);
    },

    prior() {
      var self = this;
      var model = self.model;

      if (!model.previous) {
        return;
      }

      var previousDate = new Date(model.previous.endDate);
      var difference = moment(self.endDate).from(previousDate, true);
      var assignmentName = model.previous.assignmentName;
      var eventName = model.previous.title;
      var eventTime = moment(model.previous.startDate).format('h:mma');
      return `<strong>'${assignmentName}'</strong> at <strong>${eventTime} '${eventName}'</strong> ending <strong>${difference} before</strong> this event`; // return `<strong>${eventName}</strong><br/>ends <strong>${difference} before</strong> this event`;
    },

    next() {
      var self = this;
      var model = self.model;

      if (!model.next) {
        return;
      }

      var nextDate = new Date(model.next.startDate);
      var difference = moment(self.endDate).from(nextDate, true);
      var assignmentName = model.next.assignmentName;
      var eventName = model.next.title;
      var eventTime = moment(nextDate).format('h:mma');
      return `<strong>'${assignmentName}'</strong> at <strong>${eventTime} '${eventName}'</strong> starts <strong>${difference} after</strong> this event`; // return `<strong>${eventName}</strong><br/>starts <strong>${difference} after</strong> this event`;
    },

    conflicts() {
      var self = this;
      return self.model && self.model.conflicts ? self.model.conflicts : [];
    },

    lacks() {
      var self = this;
      return self.model && self.model.lacks ? self.model.lacks : [];
    },

    periods() {
      var self = this;
      return self.model && self.model.periods ? self.model.periods : [];
    },

    assignments() {
      var self = this;
      return self.model && self.model.assignments ? self.model.assignments : [];
    },

    summary() {
      var self = this; ////////////////////////////////////

      if (self.conflicts && self.conflicts.length) {
        if (self.conflicts.length > 3) {
          return `Already rostered to ${self.conflicts.length} other positions`;
        } else {
          var names = _.map(self.conflicts, 'title').join(', ');

          return `Already rostered as ${names}`;
        }
      } ////////////////////////////////////


      if (self.lacks && self.lacks.length) {
        return `Lacks ${self.lacks}`;
      }

      var periods = self.periods;

      if (periods && periods.length) {
        return _.map(periods, function (period) {
          console.log('PERIOD', period);
          return `${period.description || 'Unavailable.'} ${self.$fluro.date.readableEventDate(period)}`;
        }).join(', ');
      }

      var declinedAssignments = self.assignments;

      if (declinedAssignments && declinedAssignments.length) {
        var reasonsMap = self.declinedReasons;
        return `${_.values(reasonsMap.descriptions).join(', ')} (${_.values(reasonsMap.positions).join(', ')})`;
      }

      if (!self.model.closest) {
        return `Hasn't served as '${self.assignmentSlot.title}' before`;
      }

      return `Assigned ${self.timeDifference(self.model.closest.endDate, self.event.startDate)}`; // {{contact.closest.endDate | timedifference:service.selected.event.startDate}}`;
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
    { staticClass: "suggestion-list-item" },
    [
      _c(
        "v-menu",
        {
          attrs: { left: "", "offset-x": "", "open-on-hover": true },
          scopedSlots: _vm._u([
            {
              key: "activator",
              fn: function(ref) {
                var on = ref.on;
                return [
                  _c(
                    "v-layout",
                    _vm._g({ attrs: { "align-center": "" } }, on),
                    [
                      _c(
                        "v-flex",
                        { staticClass: "face", attrs: { shrink: "" } },
                        [
                          _c("fluro-realm-bar", {
                            attrs: { realm: _vm.model.realms }
                          }),
                          _vm._v(" "),
                          _vm.isLoading
                            ? _c("v-progress-circular", {
                                attrs: { indeterminate: "" }
                              })
                            : _c("fluro-avatar", {
                                attrs: { md: "", id: _vm.model }
                              })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c("v-flex", [
                        _c("div", [
                          _c("strong", [_vm._v(_vm._s(_vm.model.title))]),
                          _vm._v(" "),
                          _c("div", { staticClass: "summary" }, [
                            _vm._v(_vm._s(_vm.summary))
                          ])
                        ])
                      ]),
                      _vm._v(" "),
                      _c("v-flex", { attrs: { shrink: "" } }, [
                        _c("div", { staticClass: "btn-group" }, [
                          _c(
                            "span",
                            {
                              staticClass: "btn",
                              attrs: { xs: "" },
                              on: {
                                click: function($event) {
                                  $event.stopPropagation();
                                  $event.preventDefault();
                                  return _vm.$actions.open([_vm.model])
                                }
                              }
                            },
                            [
                              _c("fluro-icon", {
                                attrs: { icon: "ellipsis-h" }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "span",
                            { staticClass: "btn", attrs: { xs: "" } },
                            [_c("fluro-icon", { attrs: { icon: "plus" } })],
                            1
                          )
                        ])
                      ])
                    ],
                    1
                  )
                ]
              }
            }
          ])
        },
        [
          _vm._v(" "),
          _c("div", { staticClass: "suggestion-roster-summary" }, [
            _c("h5", [_vm._v(_vm._s(_vm.model.title))]),
            _vm._v(" "),
            _vm.assignmentsExplanation
              ? _c("div", { staticClass: "suggestion-roster-summary-group" }, [
                  _c(
                    "h6",
                    [
                      _c("fluro-icon", {
                        staticClass: "icon",
                        attrs: { library: "fas", type: "assignment" }
                      }),
                      _vm._v("Already Declined")
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("div", {
                    domProps: { innerHTML: _vm._s(_vm.assignmentsExplanation) }
                  })
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.teams
              ? _c("div", { staticClass: "suggestion-roster-summary-group" }, [
                  _c(
                    "h6",
                    [
                      _c("fluro-icon", {
                        staticClass: "icon",
                        attrs: { library: "fas", type: "team" }
                      }),
                      _vm._v(
                        " Is '" +
                          _vm._s(_vm.assignmentSlot.title) +
                          "' position in"
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("div", { domProps: { innerHTML: _vm._s(_vm.teams) } })
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.capabilities
              ? _c("div", { staticClass: "suggestion-roster-summary-group" }, [
                  _c(
                    "h6",
                    [
                      _c("fluro-icon", {
                        staticClass: "icon",
                        attrs: { library: "fas", type: "capability" }
                      }),
                      _vm._v("Capabilities")
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("div", {
                    domProps: { innerHTML: _vm._s(_vm.capabilities) }
                  })
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.conflicts.length
              ? _c(
                  "div",
                  { staticClass: "suggestion-roster-summary-group" },
                  [
                    _c(
                      "h6",
                      [
                        _c("fluro-icon", {
                          staticClass: "icon",
                          attrs: { library: "fas", icon: "exclamation-circle" }
                        }),
                        _vm._v(" Conflicts")
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _vm._l(_vm.conflicts, function(assignment) {
                      return _c("div", [
                        _c("strong", [_vm._v(_vm._s(assignment.title))]),
                        _vm._v(" at "),
                        _c("strong", [
                          _vm._v(
                            _vm._s(
                              _vm._f("formatDate")(
                                assignment.event.startDate,
                                "h:mma"
                              )
                            ) +
                              " - '" +
                              _vm._s(assignment.event.title) +
                              "'"
                          )
                        ])
                      ])
                    })
                  ],
                  2
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.prior
              ? _c("div", { staticClass: "suggestion-roster-summary-group" }, [
                  _c(
                    "h6",
                    [
                      _c("fluro-icon", {
                        staticClass: "icon",
                        attrs: { library: "fas", type: "angle-left" }
                      }),
                      _vm._v(" Prior Assignment")
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("div", { domProps: { innerHTML: _vm._s(_vm.prior) } })
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.next
              ? _c("div", { staticClass: "suggestion-roster-summary-group" }, [
                  _c(
                    "h6",
                    [
                      _c("fluro-icon", {
                        staticClass: "icon",
                        attrs: { library: "fas", type: "angle-right" }
                      }),
                      _vm._v(" Next Assignment")
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("div", { domProps: { innerHTML: _vm._s(_vm.next) } })
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.lacks.length
              ? _c("div", { staticClass: "suggestion-roster-summary-group" }, [
                  _c(
                    "h6",
                    [
                      _c("fluro-icon", {
                        staticClass: "icon",
                        attrs: { library: "fas", type: "frown" }
                      }),
                      _vm._v(" Lacks required capability")
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("div", [_c("Strong", [_vm._v(_vm._s(_vm.lacks))])], 1)
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.periods.length
              ? _c(
                  "div",
                  { staticClass: "suggestion-roster-summary-group" },
                  [
                    _c(
                      "h6",
                      [
                        _c("fluro-icon", {
                          staticClass: "icon",
                          attrs: { library: "fas", type: "times-circle" }
                        }),
                        _vm._v(" Unavailable")
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _vm._l(_vm.periods, function(period) {
                      return _c("div", [
                        _vm._v(
                          "\n                    " +
                            _vm._s(period.description) +
                            " "
                        ),
                        _c("strong", [
                          _vm._v(_vm._s(_vm._f("readableEventDate")(period)))
                        ])
                      ])
                    })
                  ],
                  2
                )
              : _vm._e()
          ])
        ]
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
    inject("data-v-d41ae33e_0", { source: "/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.suggestion-list-item {\n  position: relative;\n  padding: 7px 10px;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n  line-height: 1.4;\n  cursor: pointer;\n}\n.suggestion-list-item:last-child {\n  border-bottom: none;\n}\n.suggestion-list-item:hover {\n  background: rgba(0, 0, 0, 0.05);\n}\n.suggestion-list-item .face {\n  flex: none;\n  padding-right: 10px;\n}\n.suggestion-list-item .summary {\n  font-size: 0.8em;\n  opacity: 0.5;\n}\n.suggestion-roster-summary {\n  background: #111;\n  color: #ccc;\n  padding: 10px 5px;\n  letter-spacing: -0.03em;\n  font-size: 12px;\n  width: 250px;\n  overflow: hidden;\n}\n.suggestion-roster-summary h4,\n.suggestion-roster-summary h5,\n.suggestion-roster-summary h6,\n.suggestion-roster-summary strong {\n  color: #fff;\n}\n.suggestion-roster-summary .suggestion-roster-summary-group {\n  padding-top: 10px;\n  margin-top: 5px;\n  border-top: 1px solid rgba(255, 255, 255, 0.1);\n  line-height: 1.4;\n}\n.suggestion-roster-summary .suggestion-roster-summary-group .icon {\n  font-size: 9px;\n  line-height: inherit;\n  margin-right: 5px;\n  display: none;\n}\n.suggestion-roster-summary .suggestion-roster-summary-group h6 {\n  text-transform: uppercase;\n  font-size: 10px;\n  font-weight: 600;\n  letter-spacing: 0.03em;\n  margin-bottom: 5px;\n}\n\n/*# sourceMappingURL=RosterSlotSuggestionListItem.vue.map */", map: {"version":3,"sources":["C:\\Users\\User\\Documents\\fluro\\fluro-vue-ui\\src\\components\\content\\edit\\components\\RosterSlotSuggestionListItem.vue","RosterSlotSuggestionListItem.vue"],"names":[],"mappings":"AAmSA,GAAA;AAYA;EACA,yCAAA;AC7SA;ADgTA;EACA,2CAAA;AC7SA;ADgTA;EACA,4CAAA;AC7SA;ADgTA;EACA,0CAAA;AC7SA;;ADqTA,GAAA;AACA;EAEA,kBAAA;EACA,iBAAA;EACA,2CAAA;EACA,gBAAA;EACA,eAAA;ACnTA;ADqTA;EACA,mBAAA;ACnTA;ADsTA;EACA,+BAAA;ACpTA;ADuTA;EACA,UAAA;EACA,mBAAA;ACrTA;ADwTA;EACA,gBAAA;EACA,YAAA;ACtTA;AD2TA;EACA,gBAAA;EACA,WAAA;EACA,iBAAA;EACA,uBAAA;EACA,eAAA;EACA,YAAA;EACA,gBAAA;ACxTA;AD0TA;;;;EAIA,WAAA;ACxTA;AD2TA;EACA,iBAAA;EACA,eAAA;EACA,8CAAA;EACA,gBAAA;ACzTA;AD2TA;EACA,cAAA;EACA,oBAAA;EACA,iBAAA;EACA,aAAA;ACzTA;AD4TA;EACA,yBAAA;EACA,eAAA;EACA,gBAAA;EACA,sBAAA;EACA,kBAAA;AC1TA;;AAEA,2DAA2D","file":"RosterSlotSuggestionListItem.vue","sourcesContent":["<template>\n    <div class=\"suggestion-list-item\">\n        <v-menu left offset-x :open-on-hover=\"true\">\n            <template v-slot:activator=\"{ on }\">\n                <v-layout v-on=\"on\" align-center>\n                    <v-flex shrink class=\"face\">\n                        <fluro-realm-bar :realm=\"model.realms\" />\n                        <v-progress-circular indeterminate v-if=\"isLoading\" />\n                        <fluro-avatar md :id=\"model\" v-else />\n                    </v-flex>\n                    <v-flex>\n                        <div>\n                            <strong>{{model.title}}</strong>\n                            <div class=\"summary\">{{summary}}</div>\n                        </div>\n                    </v-flex>\n                    <v-flex shrink >\n                        <div class=\"btn-group\">\n                            <span class=\"btn\" @click.stop.prevent=\"$actions.open([model])\" xs>\n                                <fluro-icon icon=\"ellipsis-h\" />\n                            </span>\n                            <span class=\"btn\" xs>\n                                <fluro-icon icon=\"plus\" />\n                            </span>\n                        </div>\n                    </v-flex>\n                </v-layout>\n            </template>\n            <div class=\"suggestion-roster-summary\">\n                <h5>{{model.title}}</h5>\n                <div class=\"suggestion-roster-summary-group\" v-if=\"assignmentsExplanation\">\n                    <h6>\n                        <fluro-icon library=\"fas\" class=\"icon\" type=\"assignment\" />Already Declined</h6>\n                    <div v-html=\"assignmentsExplanation\" />\n                </div>\n                <div class=\"suggestion-roster-summary-group\" v-if=\"teams\">\n                    <h6>\n                        <fluro-icon library=\"fas\" class=\"icon\" type=\"team\" /> Is '{{assignmentSlot.title}}' position in</h6>\n                    <div v-html=\"teams\" />\n                </div>\n                <div class=\"suggestion-roster-summary-group\" v-if=\"capabilities\">\n                    <h6>\n                        <fluro-icon library=\"fas\" class=\"icon\" type=\"capability\" />Capabilities</h6>\n                    <div v-html=\"capabilities\" />\n                </div>\n                <div class=\"suggestion-roster-summary-group\" v-if=\"conflicts.length\">\n                    <h6>\n                        <fluro-icon library=\"fas\" class=\"icon\" icon=\"exclamation-circle\" /> Conflicts</h6>\n                    <div v-for=\"assignment in conflicts\">\n                        <strong>{{assignment.title}}</strong> at <strong>{{assignment.event.startDate | formatDate('h:mma')}} - '{{assignment.event.title}}'</strong>\n                    </div>\n                </div>\n                <div class=\"suggestion-roster-summary-group\" v-if=\"prior\">\n                    <h6>\n                        <fluro-icon library=\"fas\" class=\"icon\" type=\"angle-left\" /> Prior Assignment</h6>\n                    <div v-html=\"prior\"></div>\n                </div>\n                <div class=\"suggestion-roster-summary-group\" v-if=\"next\">\n                    <h6>\n                        <fluro-icon library=\"fas\" class=\"icon\" type=\"angle-right\" /> Next Assignment</h6>\n                    <div v-html=\"next\"></div>\n                </div>\n                <div class=\"suggestion-roster-summary-group\" v-if=\"lacks.length\">\n                    <h6>\n                        <fluro-icon library=\"fas\" class=\"icon\" type=\"frown\" /> Lacks required capability</h6>\n                    <div><Strong>{{lacks}}</Strong></div>\n                </div>\n                <div class=\"suggestion-roster-summary-group\" v-if=\"periods.length\">\n                    <h6>\n                        <fluro-icon library=\"fas\" class=\"icon\" type=\"times-circle\" /> Unavailable</h6>\n                    <div v-for=\"period in periods\">\n                        {{period.description}} <strong>{{period | readableEventDate}}</strong>\n                    </div>\n                </div>\n            </div>\n        </v-menu>\n    </div>\n</template>\n<script>\nimport moment from 'moment';\nimport _ from 'lodash';\n\nexport default {\n    props: {\n        assignmentSlot: {\n            type: Object,\n        },\n        event: {\n            type: Object,\n        },\n        value: {\n            type: Object,\n        }\n    },\n    data() {\n        return {\n            model: this.value,\n        }\n    },\n    watch: {\n        value(val) {\n            this.model = val;\n        },\n    },\n    methods: {\n        timeDifference(date1, date2) {\n\n            var measure = moment(date1).from(date2, true);\n            if (date1 < date2) {\n                return measure + ' before this event';\n            } else {\n                return measure + ' after this event';\n            }\n\n        },\n    },\n    computed: {\n        isLoading() {\n            var self = this;\n            return self.model.loading;\n        },\n        conflictExplanation() {\n            var self = this;\n\n            if (!self.assignments || !self.assignments.length) {\n                return;\n            }\n\n            var reasonsMap = self.declinedReasons;\n            return `<strong>${_.values(reasonsMap.descriptions).join(', ')}</strong> (${_.values(reasonsMap.positions).join(', ')})`\n        },\n        assignmentsExplanation() {\n            var self = this;\n\n            if (!self.assignments || !self.assignments.length) {\n                return;\n            }\n\n            var reasonsMap = self.declinedReasons;\n            return `<strong>${_.values(reasonsMap.descriptions).join(', ')}</strong> (${_.values(reasonsMap.positions).join(', ')})`\n        },\n        declinedReasons() {\n\n            var self = this;\n\n            return _.reduce(self.assignments, function(set, assignment) {\n\n                var description = assignment.description || 'Unavailable.';\n                var position = assignment.title;\n\n                if (!set.descriptions[description.toLowerCase()]) {\n                    set.descriptions[description.toLowerCase()] = description;\n                }\n\n                if (!set.positions[position.toLowerCase()]) {\n                    set.positions[position.toLowerCase()] = position;\n                }\n\n                return set;\n            }, {\n                descriptions: {},\n                positions: {},\n            })\n        },\n        teams() {\n            return this.model.teams && this.model.teams.length ? this.model.teams.join(', ') : null;\n        },\n        capabilities() {\n            return this.model.capabilities && this.model.capabilities.length ? _.map(this.model.capabilities, 'title').join(', ') : null;\n        },\n        endDate() {\n            return new Date(this.event.endDate);\n        },\n        startDate() {\n            return new Date(this.event.startDate);\n        },\n        prior() {\n            var self = this;\n            var model = self.model;\n\n            if (!model.previous) {\n                return;\n            }\n\n            var previousDate = new Date(model.previous.endDate);\n            var difference = moment(self.endDate).from(previousDate, true);\n            var assignmentName = model.previous.assignmentName;\n            var eventName = model.previous.title;\n            var eventTime = moment(model.previous.startDate).format('h:mma');\n\n            return `<strong>'${assignmentName}'</strong> at <strong>${eventTime} '${eventName}'</strong> ending <strong>${difference} before</strong> this event`;\n            // return `<strong>${eventName}</strong><br/>ends <strong>${difference} before</strong> this event`;\n        },\n        next() {\n            var self = this;\n            var model = self.model;\n\n            if (!model.next) {\n                return;\n            }\n\n            var nextDate = new Date(model.next.startDate);\n            var difference = moment(self.endDate).from(nextDate, true);\n            var assignmentName = model.next.assignmentName;\n            var eventName = model.next.title;\n            var eventTime = moment(nextDate).format('h:mma');\n\n            return `<strong>'${assignmentName}'</strong> at <strong>${eventTime} '${eventName}'</strong> starts <strong>${difference} after</strong> this event`;\n            // return `<strong>${eventName}</strong><br/>starts <strong>${difference} after</strong> this event`;\n        },\n        conflicts() {\n            var self = this;\n            return self.model && self.model.conflicts ? self.model.conflicts : [];\n        },\n        lacks() {\n            var self = this;\n            return self.model && self.model.lacks ? self.model.lacks : [];\n        },\n        periods() {\n            var self = this;\n            return self.model && self.model.periods ? self.model.periods : [];\n        },\n        assignments() {\n\n            var self = this;\n            return self.model && self.model.assignments ? self.model.assignments : [];\n        },\n        summary() {\n            var self = this;\n\n            ////////////////////////////////////\n\n            if (self.conflicts && self.conflicts.length) {\n\n                if (self.conflicts.length > 3) {\n                    return `Already rostered to ${self.conflicts.length} other positions`\n                } else {\n                    var names = _.map(self.conflicts, 'title').join(', ');\n                    return `Already rostered as ${names}`\n                }\n            }\n\n\n\n            ////////////////////////////////////\n\n\n            if (self.lacks && self.lacks.length) {\n                return `Lacks ${self.lacks}`;\n            }\n\n\n            var periods = self.periods;\n\n\n\n            if (periods && periods.length) {\n                return _.map(periods, function(period) {\n                        console.log('PERIOD', period);\n                        return `${period.description || 'Unavailable.'} ${self.$fluro.date.readableEventDate(period)}`;\n                    })\n                    .join(', ');\n            }\n\n\n            var declinedAssignments = self.assignments;\n            if (declinedAssignments && declinedAssignments.length) {\n\n                var reasonsMap = self.declinedReasons;\n                return `${_.values(reasonsMap.descriptions).join(', ')} (${_.values(reasonsMap.positions).join(', ')})`\n\n\n\n            }\n\n\n            if (!self.model.closest) {\n                return `Hasn't served as '${self.assignmentSlot.title}' before`;\n            }\n\n\n\n            return `Assigned ${self.timeDifference(self.model.closest.endDate, self.event.startDate)}`;\n            // {{contact.closest.endDate | timedifference:service.selected.event.startDate}}`;\n\n        }\n    }\n}\n</script>\n<style lang=\"scss\">\n\n/**/\r\n\r\n$primary: #2ad4b9;//#0bd6be;\r\n$success: #4cc650; //#4cc673;//\r\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\r\n$danger: #d93e63;\r\n$secondary: #0bd6cd; //#0bd6a3;\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n\r\n.border-top {\r\n    border-top: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-right {\r\n    border-right: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-bottom {\r\n    border-bottom: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-left {\r\n    border-left: 1px solid rgba(#000, 0.05);\r\n}\r\n//////////////////////////////////////////\r\n\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n/**/\n.suggestion-list-item {\n    // display: flex;\n    position: relative;\n    padding: 7px 10px;\n    border-bottom: 1px solid rgba(#000, 0.1);\n    line-height: 1.4;\n    cursor: pointer;\n\n    &:last-child {\n        border-bottom: none;\n    }\n\n    &:hover {\n        background: rgba(#000, 0.05);\n    }\n\n    .face {\n        flex: none;\n        padding-right: 10px;\n    }\n\n    .summary {\n        font-size: 0.8em;\n        opacity: 0.5;\n    }\n}\n\n\n.suggestion-roster-summary {\n    background: #111;\n    color: #ccc;\n    padding: 10px 5px;\n    letter-spacing: -0.03em;\n    font-size: 12px;\n    width: 250px;\n    overflow: hidden;\n\n    h4,\n    h5,\n    h6,\n    strong {\n        color: #fff;\n    }\n\n    .suggestion-roster-summary-group {\n        padding-top: 10px;\n        margin-top: 5px;\n        border-top: 1px solid rgba(#fff, 0.1);\n        line-height: 1.4;\n\n        .icon {\n            font-size: 9px;\n            line-height: inherit;\n            margin-right: 5px;\n            display: none;\n        }\n\n        h6 {\n            text-transform: uppercase;\n            font-size: 10px;\n            font-weight: 600;\n            letter-spacing: 0.03em;\n            margin-bottom: 5px;\n\n\n\n        }\n    }\n\n\n}\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.suggestion-list-item {\n  position: relative;\n  padding: 7px 10px;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n  line-height: 1.4;\n  cursor: pointer;\n}\n.suggestion-list-item:last-child {\n  border-bottom: none;\n}\n.suggestion-list-item:hover {\n  background: rgba(0, 0, 0, 0.05);\n}\n.suggestion-list-item .face {\n  flex: none;\n  padding-right: 10px;\n}\n.suggestion-list-item .summary {\n  font-size: 0.8em;\n  opacity: 0.5;\n}\n\n.suggestion-roster-summary {\n  background: #111;\n  color: #ccc;\n  padding: 10px 5px;\n  letter-spacing: -0.03em;\n  font-size: 12px;\n  width: 250px;\n  overflow: hidden;\n}\n.suggestion-roster-summary h4,\n.suggestion-roster-summary h5,\n.suggestion-roster-summary h6,\n.suggestion-roster-summary strong {\n  color: #fff;\n}\n.suggestion-roster-summary .suggestion-roster-summary-group {\n  padding-top: 10px;\n  margin-top: 5px;\n  border-top: 1px solid rgba(255, 255, 255, 0.1);\n  line-height: 1.4;\n}\n.suggestion-roster-summary .suggestion-roster-summary-group .icon {\n  font-size: 9px;\n  line-height: inherit;\n  margin-right: 5px;\n  display: none;\n}\n.suggestion-roster-summary .suggestion-roster-summary-group h6 {\n  text-transform: uppercase;\n  font-size: 10px;\n  font-weight: 600;\n  letter-spacing: 0.03em;\n  margin-bottom: 5px;\n}\n\n/*# sourceMappingURL=RosterSlotSuggestionListItem.vue.map */"]}, media: undefined });

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
  props: {
    value: {
      type: Object
    }
  },

  data() {
    return {
      model: this.value
    };
  },

  methods: {
    remove() {
      console.log('REMOVE');
      this.$emit('unassign', this.model);
    },

    send() {
      console.log('SEND');
      this.$emit('send', this.model);
    }

  },
  watch: {
    value(val) {
      this.model = val;
    }

  },
  computed: {
    contactName() {
      return this.model.contact && this.model.contact.title ? this.model.contact.title : this.model.contactName;
    },

    sendable() {
      return this.model.confirmationStatus == 'proposed';
    },

    isLoading() {
      var self = this;
      return self.model.sending;
    },

    summary() {
      switch (this.confirmationStatus) {
        case 'denied':
          return this.model.description && this.model.description.length ? this.model.description : `Unavailable`;

        case 'confirmed':
          return 'Confirmed.';

        case 'unknown':
          return 'Notified. Awaiting response.';
      }
    },

    contact() {
      return this.model.contact;
    },

    confirmationStatus() {
      return this.model.confirmationStatus;
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
  return _c(
    "div",
    { staticClass: "assignment-list-item", class: _vm.confirmationStatus },
    [
      _c(
        "v-layout",
        { attrs: { "align-center": "" } },
        [
          _c(
            "v-flex",
            { staticClass: "face", attrs: { shrink: "" } },
            [
              _vm.isLoading
                ? _c("v-progress-circular", { attrs: { indeterminate: "" } })
                : _c("fluro-avatar", { attrs: { md: "", id: _vm.contact._id } })
            ],
            1
          ),
          _vm._v(" "),
          _c("v-flex", [
            _c("strong", [_vm._v(_vm._s(_vm.contactName))]),
            _vm._v(" "),
            _c("div", { staticClass: "summary" }, [_vm._v(_vm._s(_vm.summary))])
          ]),
          _vm._v(" "),
          _c("v-flex", { attrs: { shrink: "" } }, [
            !_vm.model.sending
              ? _c("div", { staticClass: "btn-group" }, [
                  _vm.sendable
                    ? _c(
                        "span",
                        {
                          staticClass: "btn",
                          attrs: { xs: "" },
                          on: {
                            click: function($event) {
                              $event.stopPropagation();
                              $event.preventDefault();
                              return _vm.send()
                            }
                          }
                        },
                        [_c("fluro-icon", { attrs: { icon: "paper-plane" } })],
                        1
                      )
                    : _c(
                        "span",
                        {
                          staticClass: "btn",
                          attrs: { xs: "" },
                          on: {
                            click: function($event) {
                              $event.stopPropagation();
                              $event.preventDefault();
                              return _vm.$actions.open([_vm.model])
                            }
                          }
                        },
                        [_c("fluro-icon", { attrs: { icon: "ellipsis-h" } })],
                        1
                      ),
                  _vm._v(" "),
                  _c(
                    "span",
                    {
                      staticClass: "btn",
                      attrs: { xs: "" },
                      on: {
                        click: function($event) {
                          $event.stopPropagation();
                          $event.preventDefault();
                          return _vm.remove()
                        }
                      }
                    },
                    [_c("fluro-icon", { attrs: { icon: "times" } })],
                    1
                  )
                ])
              : _vm._e()
          ])
        ],
        1
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = function (inject) {
    if (!inject) return
    inject("data-v-388ee00f_0", { source: "/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.assignment-list-item {\n  position: relative;\n  padding: 7px 10px;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  border-bottom: none;\n  line-height: 1.4;\n}\n.assignment-list-item:first-child {\n  border-radius: 3px 3px 0 0;\n}\n.assignment-list-item:last-child {\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  border-radius: 0 0 3px 3px;\n}\n.assignment-list-item .face {\n  flex: none;\n  padding-right: 10px;\n}\n.assignment-list-item .summary {\n  font-size: 0.8em;\n  opacity: 0.5;\n}\n.assignment-list-item.denied {\n  color: #be264a;\n  border-color: rgba(190, 38, 74, 0.3);\n  background: #fbedf0;\n}\n.assignment-list-item.confirmed {\n  color: #36a93a;\n  border-color: rgba(54, 169, 58, 0.3);\n  background: #e7f7e7;\n}\n.assignment-list-item.warning {\n  background: rgba(226, 152, 92, 0.05);\n  color: #da7d31;\n  border-color: rgba(218, 125, 49, 0.3);\n  font-style: italic;\n}\n.assignment-list-item.proposed {\n  background: #eafaf7;\n  color: #319a89;\n  border-color: rgba(49, 154, 137, 0.3);\n}\n.assignment-list-item.unknown {\n  color: rgba(0, 0, 0, 0.7);\n  background: #fff;\n}\n\n/*# sourceMappingURL=RosterSlotAssignmentListItem.vue.map */", map: {"version":3,"sources":["C:\\Users\\User\\Documents\\fluro\\fluro-vue-ui\\src\\components\\content\\edit\\components\\RosterSlotAssignmentListItem.vue","RosterSlotAssignmentListItem.vue"],"names":[],"mappings":"AA4FA,GAAA;AAYA;EACA,yCAAA;ACtGA;ADyGA;EACA,2CAAA;ACtGA;ADyGA;EACA,4CAAA;ACtGA;ADyGA;EACA,0CAAA;ACtGA;;AD8GA,GAAA;AACA;EAEA,kBAAA;EACA,iBAAA;EACA,oCAAA;EACA,mBAAA;EAEA,gBAAA;AC7GA;AD+GA;EACA,0BAAA;AC7GA;ADiHA;EACA,oCAAA;EACA,0BAAA;AC/GA;ADkHA;EACA,UAAA;EACA,mBAAA;AChHA;ADmHA;EACA,gBAAA;EACA,YAAA;ACjHA;ADqHA;EACA,cAAA;EACA,oCAAA;EACA,mBAAA;ACnHA;ADsHA;EACA,cAAA;EACA,oCAAA;EACA,mBAAA;ACpHA;ADuHA;EACA,oCAAA;EACA,cAAA;EACA,qCAAA;EACA,kBAAA;ACrHA;ADwHA;EACA,mBAAA;EACA,cAAA;EACA,qCAAA;ACtHA;ADyHA;EACA,yBAAA;EACA,gBAAA;ACvHA;;AAEA,2DAA2D","file":"RosterSlotAssignmentListItem.vue","sourcesContent":["<template>\n    <div class=\"assignment-list-item\" :class=\"confirmationStatus\">\n        <v-layout align-center>\n            <v-flex shrink class=\"face\">\n                <v-progress-circular indeterminate v-if=\"isLoading\" />\n                <fluro-avatar md :id=\"contact._id\" v-else />\n            </v-flex>\n            <v-flex>\n                <strong>{{contactName}}</strong>\n                <div class=\"summary\">{{summary}}</div>\n            </v-flex>\n            <v-flex shrink >\n                <div class=\"btn-group\" v-if=\"!model.sending\">\n                    <span class=\"btn\" v-if=\"sendable\" xs @click.stop.prevent=\"send()\">\n                        <fluro-icon icon=\"paper-plane\" />\n                    </span>\n                    <span class=\"btn\" v-else @click.stop.prevent=\"$actions.open([model])\" xs>\n                                <fluro-icon icon=\"ellipsis-h\" />\n                            </span>\n                    <span class=\"btn\" xs @click.stop.prevent=\"remove()\">\n                        <fluro-icon icon=\"times\" />\n                    </span>\n                </div>\n            </v-flex>\n        </v-layout>\n    </div>\n</template>\n<script>\nimport moment from 'moment';\n\nexport default {\n    props: {\n        value: {\n            type: Object,\n        }\n    },\n    data() {\n        return {\n            model: this.value,\n        }\n    },\n    methods: {\n        remove() {\n            console.log('REMOVE')\n            this.$emit('unassign', this.model);\n        },\n        send() {\n            console.log('SEND')\n            this.$emit('send', this.model);\n        }\n    },\n    watch: {\n        value(val) {\n            this.model = val;\n        },\n    },\n    computed: {\n        contactName() {\n            return this.model.contact && this.model.contact.title ? this.model.contact.title : this.model.contactName;\n        },\n        sendable() {\n            return this.model.confirmationStatus == 'proposed';\n        },\n        isLoading() {\n            var self = this;\n            return self.model.sending;\n        },\n        summary() {\n            switch (this.confirmationStatus) {\n                case 'denied':\n\n                    return this.model.description && this.model.description.length ? this.model.description : `Unavailable`;\n                    break;\n                case 'confirmed':\n                    return 'Confirmed.'\n                    break;\n                case 'unknown':\n                    return 'Notified. Awaiting response.'\n                    break;\n            }\n        },\n        contact() {\n            return this.model.contact;\n        },\n        confirmationStatus() {\n            return this.model.confirmationStatus;\n        }\n    }\n}\n</script>\n<style lang=\"scss\">\n\n/**/\r\n\r\n$primary: #2ad4b9;//#0bd6be;\r\n$success: #4cc650; //#4cc673;//\r\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\r\n$danger: #d93e63;\r\n$secondary: #0bd6cd; //#0bd6a3;\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n\r\n.border-top {\r\n    border-top: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-right {\r\n    border-right: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-bottom {\r\n    border-bottom: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-left {\r\n    border-left: 1px solid rgba(#000, 0.05);\r\n}\r\n//////////////////////////////////////////\r\n\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n/**/\n.assignment-list-item {\n    // display: flex;\n    position: relative;\n    padding: 7px 10px;\n    border: 1px solid rgba(#000, 0.1);\n    border-bottom: none;\n\n    line-height: 1.4;\n\n    &:first-child {\n        border-radius: 3px 3px 0 0;\n    }\n\n\n    &:last-child {\n        border: 1px solid rgba(#000, 0.1);\n        border-radius: 0 0 3px 3px;\n    }\n\n    .face {\n        flex: none;\n        padding-right: 10px;\n    }\n\n    .summary {\n        font-size: 0.8em;\n        opacity: 0.5;\n    }\n\n\n    &.denied {\n        color: darken($danger, 10%);\n        border-color: rgba(darken($danger, 10%), 0.3);\n        background: lighten($danger, 41%);\n    }\n\n    &.confirmed {\n        color: darken($success, 10%);\n        border-color: rgba(darken($success, 10%), 0.3);\n        background: lighten($success, 40%);\n    }\n\n    &.warning {\n        background: desaturate(rgba($warning, 0.05), 15%);\n        color: desaturate(darken($warning, 10%), 15%);\n        border-color: rgba(desaturate(darken($warning, 10%), 15%), 0.3);\n        font-style: italic;\n    }\n\n    &.proposed {\n        background: desaturate(lighten($primary, 45%), 5%);\n        color: desaturate(darken($primary, 10%), 15%);\n        border-color: rgba(desaturate(darken($primary, 10%), 15%), 0.3);\n    }\n\n    &.unknown {\n        color: rgba(#000, 0.7);\n        background: #fff;\n    }\n}\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.assignment-list-item {\n  position: relative;\n  padding: 7px 10px;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  border-bottom: none;\n  line-height: 1.4;\n}\n.assignment-list-item:first-child {\n  border-radius: 3px 3px 0 0;\n}\n.assignment-list-item:last-child {\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  border-radius: 0 0 3px 3px;\n}\n.assignment-list-item .face {\n  flex: none;\n  padding-right: 10px;\n}\n.assignment-list-item .summary {\n  font-size: 0.8em;\n  opacity: 0.5;\n}\n.assignment-list-item.denied {\n  color: #be264a;\n  border-color: rgba(190, 38, 74, 0.3);\n  background: #fbedf0;\n}\n.assignment-list-item.confirmed {\n  color: #36a93a;\n  border-color: rgba(54, 169, 58, 0.3);\n  background: #e7f7e7;\n}\n.assignment-list-item.warning {\n  background: rgba(226, 152, 92, 0.05);\n  color: #da7d31;\n  border-color: rgba(218, 125, 49, 0.3);\n  font-style: italic;\n}\n.assignment-list-item.proposed {\n  background: #eafaf7;\n  color: #319a89;\n  border-color: rgba(49, 154, 137, 0.3);\n}\n.assignment-list-item.unknown {\n  color: rgba(0, 0, 0, 0.7);\n  background: #fff;\n}\n\n/*# sourceMappingURL=RosterSlotAssignmentListItem.vue.map */"]}, media: undefined });

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
      type: Object
    }
  },
  components: {
    RosterSlotSuggestionListItem: __vue_component__,
    RosterSlotAssignmentListItem: __vue_component__$1
  },

  data() {
    return {
      activeTabIndex: 0,
      search: '',
      searchFocussed: false,
      searching: false,
      searchResults: [],
      loadingSuggestions: false,
      model: this.value,
      suggestionData: null,
      nudging: false,
      sending: false
    };
  },

  mounted() {
    this.focusSearch();
  },

  methods: {
    deselect() {
      this.$emit('input', null);
    },

    relevantRealmIDs() {
      var self = this;
      return self.$fluro.arrayIDs(self.roster.realms || self.event.realms || []);
    },

    eventRealmMap() {
      var self = this;
      return _.reduce(self.relevantRealmIDs, function (set, realmID) {
        set[realmID] = realmID;
        return set;
      }, {});
    },

    getBestCandidate(row) {
      var self = this;
      var filtered = self.filterPossible(row); //////////////////////////////////////////
      //Order based on whether the realm is a match and the random ordering from the backend

      filtered = _.orderBy(filtered, function (contact, index) {
        var matchesRealm = _.some(contact.realms, function (realmID) {
          if (realmID._id) {
            realmID = realmID._id;
          }

          return self.eventRealmMap[realmID];
        });

        var realmWeight = matchesRealm ? 0 : 1; //////////////////////////////////////

        var orderIndex = parseInt(`${realmWeight}${index}`);
        console.log('ORDER INDEX IS', orderIndex);
        return orderIndex;
      }); //////////////////////////////////////////

      return filtered[0];
    },

    filterPossible(contacts) {
      var self = this;
      return _.chain(contacts).filter(function (contact) {
        var alreadyRostered = self.rosteredMap[contact._id];
        var unqualified = self.unqualifiedMap[contact._id];
        return !alreadyRostered && !unqualified;
      }).value();
    },

    searchFor: _.debounce(function (string) {
      var self = this;

      if (!string || !string.length) {
        self.searchResults = [];
        self.searching = false;
        return;
      }

      self.searching = true;
      self.$fluro.api.get(`/content/contact/search/${string}`, {
        params: {
          limit: 10
        }
      }).then(function (res) {
        self.searchResults = self.filterPossible(res.data);
        self.searching = false;
      }).catch(function (err) {
        self.searchResults = [];
        self.searching = false;
      });
    }, 300),

    nudge() {
      var self = this;
      self.nudging = true;
      var assignments = self.unknownAssignments; //////////////////////////////////////////

      if (!assignments.length) {
        self.nudging = false;
        return;
      } ////////////////////////////////////////


      return self.$fluro.api.post('/assignments/nudge', {
        assignments
      }).then(function (res) {
        self.nudging = false; ////console.log('Nudged everyone!', res);

        if (res.data.success.length) {
          self.$fluro.notify(`${res.data.success.length} notifications sent`);
        } else {
          self.$fluro.notify(`No notifications were sent`);
        }
      }).catch(function (err) {
        self.nudging = false;
        self.$fluro.error(err);
      });
    },

    send() {
      var self = this;
      self.sending = true; //////////////////////////////////////

      var assignments = self.proposedAssignments;

      if (!assignments.length) {
        self.sending = false;
        return;
      } //////////////////////////////////////
      //Map each proposed to a promise


      var promises = _.map(assignments, function (assignment) {
        return self.sendAssignment(assignment);
      }); //////////////////////////////////////


      Promise.all(promises).then(function (res) {
        self.sending = false;
      }).catch(function (err) {
        self.sending = false;
      });
    },

    editAssignment(assignment) {},

    createAssignment(details) {
      var self = this;
      return new Promise(function (resolve, reject) {
        var rosterID = self.$fluro.utils.getStringID(self.model.roster);
        var contact = details.contact; // var details = {
        //     title: self.slot.title,
        //     contact: contact,
        //     confirmationStatus: 'proposed',
        //     force: options.force,
        // }

        self.$fluro.api.post(`/assignments/roster/${rosterID}`, details).then(assignmentCreated).catch(assignmentCreateError);

        function assignmentCreated(res) {
          var matchingAssignment = res.data;
          matchingAssignment.contactName = matchingAssignment.contact.title || matchingAssignment.contact.firstName + ' ' + matchingAssignment.contact.lastName;

          var alreadyAssigned = _.some(self.slot.assignments, {
            _id: matchingAssignment._id
          });

          if (!alreadyAssigned) {
            if (!self.slot.assignments) {
              self.$set(self.slot, 'assignments', []);
            }

            self.slot.assignments.push(matchingAssignment);
          }

          resolve(matchingAssignment);
          self.searchResults = [];
          self.search = '';
          self.focusSearch();
        }

        function assignmentCreateError(err) {
          console.log('CREATE ERROR', err);
          var err = err.response ? err.response.data || err.response : err;
          var conflictError = err.error;
          var message = err.message;

          if (err.status == 403) {
            message = 'You do not have permission to make this action.';
          }

          if (conflictError == 'AssignmentConflictError') {
            var array = [{
              title: `Add as '${details.title}' anyway`,
              description: (contact.firstName || 'this person') + ' can still fulfill this assignment',
              force: true
            }];
            return self.$fluro.options(array, `Conflict!`, message).then(function (answer) {
              details.force = answer.force;
              self.$fluro.api.post(`/assignments/roster/${rosterID}`, details).then(assignmentCreated).catch(assignmentCreateError);
            });
          }

          self.$fluro.error(err);
          reject(err);
        }
      });
    },

    sendAssignment(assignment) {
      var self = this;
      self.$set(assignment, 'sending', true);
      return self.$fluro.api.put(`/content/assignment/${assignment._id}`, {
        confirmationStatus: 'unknown'
      }).then(function (res) {
        var result = res.data;
        assignment.confirmationStatus = result.confirmationStatus;
        self.$set(assignment, 'sending', false);
      }).catch(function (err) {
        self.$set(assignment, 'sending', false);
        self.$fluro.error(err);
      });
    },

    removeAssignment(assignment) {
      var self = this; /////////////////////////////////////////////////////
      //If the assignment has been rejected then we want
      //to archive it and hide it from the list

      switch (assignment.confirmationStatus) {
        case 'denied':
          //////console.log('Hide the assignment')
          return self.archiveAssignment(assignment);

        case 'proposed':
          return self.$fluro.api.delete(`/content/assignment/${assignment._id}`).then(function (res) {
            removeComplete(res.data);
          });

        case 'temporary':
          return removeComplete(assignment);
      } /////////////////////////////////////////////////////


      return self.$fluro.confirm('Confirm Deletion', `Are you sure you want to delete this assignment`, {
        confirmColor: 'error',
        confirmText: 'Confirm Delete'
      }).then(function (res) {
        return self.$fluro.api.delete(`/content/assignment/${assignment._id}`).then(function (res) {
          removeComplete(res.data);
        }).catch(function (err) {
          self.$fluro.error(err);
        });
      }).catch(function () {// self.$fluro.error(err);
      }); ///////////////////////////////////////////////

      function removeComplete(response) {
        //Find the assignment update it with an _id
        assignment._id = response._id;

        _.assign(assignment, response);

        var index = self.slot.assignments.indexOf(assignment);
        self.slot.assignments.splice(index, 1);
        console.log('Removed!!!');
      }
    },

    archiveAssignment(assignment) {
      console.log('Archive assignment');
      return self.$fluro.api.put(`/content/assignment/${assignment._id}`, {
        status: 'archived'
      }).then(function (res) {
        assignment.status = 'archived';
        var index = self.slot.assignments.indexOf(assignment);
        self.slot.splice(index, 1);
      }).catch(function (err) {
        self.$fluro.error(err);
      });
    },

    checkProposed(assignment) {},

    saveProposed(assignment) {},

    selectSuggestion(contact, options) {
      var self = this;

      if (!options) {
        options = {};
      }

      var details = {
        title: self.slot.title,
        contact: contact,
        confirmationStatus: 'proposed',
        force: options.force
      };
      self.$set(contact, 'loading', true);
      return self.createAssignment(details).then(function () {
        self.$set(contact, 'loading', false);
      }).catch(function (err) {
        self.$set(contact, 'loading', false);
      });
    },

    focusSearch() {
      if (this.$refs.search) {
        this.$refs.search.focus();
      }

      this.activeTabIndex = 0;
    },

    reloadSuggestions() {
      var self = this;

      if (!self.model) {
        self.loadingSuggestions = false;
        self.suggestionData = null;
        return;
      }

      self.loadingSuggestions = true;
      self.$fluro.api.post(`/matrix/suggest`, {
        title: self.slot.title,
        event: self.event._id,
        roster: self.roster._id
      }, {
        params: {
          limit: 3
        }
      }).then(function (res) {
        self.suggestionData = res.data;
        self.loadingSuggestions = false;
      }).catch(function (err) {
        self.suggestionData = null;
        self.loadingSuggestions = false;
      });
    }

  },
  watch: {
    search(val) {
      this.searching = true;
      this.searchFor(val);
    },

    value(val) {
      this.model = val;
      this.searchResults = [];
      this.search = '';
      this.focusSearch();
      this.reloadSuggestions();
    }

  },
  computed: {
    unknownAssignments() {
      return _.filter(this.assignments, {
        confirmationStatus: 'unknown'
      });
    },

    proposedAssignments() {
      return _.filter(this.assignments, {
        confirmationStatus: 'proposed'
      });
    },

    sendEnabled() {
      var self = this;
      return self.proposedAssignments.length;
    },

    nudgeEnabled() {
      var self = this;
      return self.unknownAssignments.length;
    },

    rosteredCount() {
      return this.assignments.length;
    },

    unavailableCount() {
      var self = this;
      var conflicts = self.conflicts.length;
      var unavailable = self.unavailable.length;
      var unqualified = self.unqualified.length;
      return conflicts + unavailable + unqualified;
    },

    conflicts() {
      var self = this;

      if (!self.suggestionData) {
        return [];
      }

      return self.suggestionData.conflicts;
    },

    unavailable() {
      var self = this;

      if (!self.suggestionData) {
        return [];
      }

      return self.suggestionData.unavailable;
    },

    conflicts() {
      var self = this;

      if (!self.suggestionData) {
        return [];
      }

      return self.suggestionData.conflicts;
    },

    unqualified() {
      var self = this;

      if (!self.suggestionData) {
        return [];
      }

      return self.suggestionData.unqualified;
    },

    unqualifiedMap() {
      return _.reduce(this.unqualified, function (set, contact) {
        set[contact._id] = contact;
        return set;
      }, {});
    },

    suggestions() {
      var self = this;

      if (!self.suggestionData) {
        console.log('No suggestion data');
        return [];
      } // return self.suggestionData.suggested;


      console.log('Before', self.suggestionData.suggested);
      return self.suggestionData.suggested;
    },

    suggestedContacts() {
      var self = this; // var filtered = _.map(self.suggestionData.suggested, function(row) {
      //     return _.filter(row, function(contact) {
      //         return !self.rosteredMap[contact._id];
      //     });
      // });
      // console.log('After', filtered)
      // return filtered;

      return _.chain(self.suggestions).reduce(function (set, row) {
        var candidate = self.getBestCandidate(row);

        if (candidate) {
          set.push(candidate);
        }

        return set;
      }, []).value();
    },

    event() {
      return _.get(this.roster, 'event');
    },

    slot() {
      return _.get(this.model, 'slot');
    },

    rostered() {
      return _.chain(this.assignments).map('contact').flatten().value();
    },

    rosteredMap() {
      return _.reduce(this.rostered, function (set, contact) {
        set[contact._id] = contact;
        return set;
      }, {});
    },

    assignments() {
      return this.slot ? this.slot.assignments || [] : [];
    },

    roster() {
      return _.get(this.model, 'roster');
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
    "flex-column",
    { staticClass: "multi-planner-sidebar" },
    [
      _c(
        "flex-column-header",
        [
          _c(
            "v-container",
            { staticClass: "border-bottom" },
            [
              _c(
                "v-layout",
                { attrs: { "align-center": "" } },
                [
                  _c("v-flex", [
                    _c("h4", [
                      _vm.slot
                        ? _c("strong", [_vm._v(_vm._s(_vm.slot.title))])
                        : _vm._e()
                    ])
                  ])
                ],
                1
              ),
              _vm._v(" "),
              _vm.event
                ? _c("h6", [
                    _vm._v(_vm._s(_vm.event.title) + " "),
                    _c("span", { staticClass: "muted" }, [
                      _vm._v(
                        _vm._s(
                          _vm._f("definitionTitle")(
                            _vm.event.definition || _vm.event._type
                          )
                        )
                      )
                    ])
                  ])
                : _vm._e(),
              _vm._v(" "),
              _vm.event
                ? _c("div", [
                    _vm._v(
                      _vm._s(_vm._f("readableEventDate")(_vm.event)) + " "
                    ),
                    _c("span", { staticClass: "sm muted" }, [
                      _vm._v(
                        "(Starts " +
                          _vm._s(_vm._f("timeago")(_vm.event.startDate)) +
                          ")"
                      )
                    ])
                  ])
                : _vm._e()
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "flex-column",
        [
          _vm.slot
            ? _c(
                "tabset",
                {
                  model: {
                    value: _vm.activeTabIndex,
                    callback: function($$v) {
                      _vm.activeTabIndex = $$v;
                    },
                    expression: "activeTabIndex"
                  }
                },
                [
                  _c(
                    "tab",
                    { attrs: { heading: _vm.rosteredCount + " Rostered" } },
                    [
                      _c(
                        "flex-column-body",
                        [
                          _c(
                            "v-container",
                            [
                              _c(
                                "v-container",
                                { attrs: { "pa-0": "", "pb-2": "" } },
                                [
                                  _c(
                                    "div",
                                    {
                                      staticClass: "search",
                                      class: {
                                        active:
                                          _vm.searchFocussed ||
                                          _vm.search.length
                                      }
                                    },
                                    [
                                      _c("input", {
                                        directives: [
                                          {
                                            name: "model",
                                            rawName: "v-model",
                                            value: _vm.search,
                                            expression: "search"
                                          }
                                        ],
                                        ref: "search",
                                        attrs: {
                                          placeholder: "Search for contacts"
                                        },
                                        domProps: { value: _vm.search },
                                        on: {
                                          focus: function($event) {
                                            _vm.searchFocussed = true;
                                          },
                                          blur: function($event) {
                                            _vm.searchFocussed = false;
                                          },
                                          input: function($event) {
                                            if ($event.target.composing) {
                                              return
                                            }
                                            _vm.search = $event.target.value;
                                          }
                                        }
                                      }),
                                      _vm._v(" "),
                                      _c(
                                        "div",
                                        {
                                          staticClass: "search-icon",
                                          on: {
                                            click: function($event) {
                                              _vm.search = "";
                                            }
                                          }
                                        },
                                        [
                                          _vm.search.length
                                            ? _c("fluro-icon", {
                                                attrs: { icon: "times" }
                                              })
                                            : _c("fluro-icon", {
                                                attrs: { icon: "search" }
                                              })
                                        ],
                                        1
                                      )
                                    ]
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _vm.search.length
                                ? [
                                    _c(
                                      "v-container",
                                      { attrs: { "pa-0": "", "pb-2": "" } },
                                      [
                                        _vm.searching
                                          ? [
                                              _c("div", [
                                                _vm._v("Searching...")
                                              ]),
                                              _vm._v(" "),
                                              _c("v-progress-circular", {
                                                attrs: { indeterminate: "" }
                                              })
                                            ]
                                          : [
                                              _c("label", [
                                                _vm._v("Search Results")
                                              ]),
                                              _vm._v(" "),
                                              _c(
                                                "list-group",
                                                _vm._l(
                                                  _vm.searchResults,
                                                  function(contact, index) {
                                                    return _c(
                                                      "roster-slot-suggestion-list-item",
                                                      {
                                                        attrs: {
                                                          assignmentSlot:
                                                            _vm.slot,
                                                          event: _vm.event
                                                        },
                                                        nativeOn: {
                                                          click: function(
                                                            $event
                                                          ) {
                                                            return _vm.selectSuggestion(
                                                              _vm.searchResults[
                                                                index
                                                              ]
                                                            )
                                                          }
                                                        },
                                                        model: {
                                                          value:
                                                            _vm.searchResults[
                                                              index
                                                            ],
                                                          callback: function(
                                                            $$v
                                                          ) {
                                                            _vm.$set(
                                                              _vm.searchResults,
                                                              index,
                                                              $$v
                                                            );
                                                          },
                                                          expression:
                                                            "searchResults[index]"
                                                        }
                                                      }
                                                    )
                                                  }
                                                ),
                                                1
                                              )
                                            ]
                                      ],
                                      2
                                    )
                                  ]
                                : [
                                    _vm.assignments.length
                                      ? _c(
                                          "v-container",
                                          { attrs: { "pa-0": "", "pb-2": "" } },
                                          [
                                            _c("label", [_vm._v("Rostered")]),
                                            _vm._v(" "),
                                            _c(
                                              "div",
                                              [
                                                _vm._l(
                                                  _vm.assignments,
                                                  function(assignment, index) {
                                                    return [
                                                      _c(
                                                        "roster-slot-assignment-list-item",
                                                        {
                                                          on: {
                                                            unassign:
                                                              _vm.removeAssignment,
                                                            send:
                                                              _vm.sendAssignment
                                                          },
                                                          model: {
                                                            value:
                                                              _vm.assignments[
                                                                index
                                                              ],
                                                            callback: function(
                                                              $$v
                                                            ) {
                                                              _vm.$set(
                                                                _vm.assignments,
                                                                index,
                                                                $$v
                                                              );
                                                            },
                                                            expression:
                                                              "assignments[index]"
                                                          }
                                                        }
                                                      )
                                                    ]
                                                  }
                                                )
                                              ],
                                              2
                                            )
                                          ]
                                        )
                                      : _vm._e(),
                                    _vm._v(" "),
                                    _c(
                                      "v-layout",
                                      [
                                        _c(
                                          "v-flex",
                                          { attrs: { xs12: "" } },
                                          [
                                            _vm.nudgeEnabled
                                              ? _c(
                                                  "v-btn",
                                                  {
                                                    attrs: {
                                                      block: "",
                                                      loading: _vm.nudging
                                                    },
                                                    on: {
                                                      click: function($event) {
                                                        return _vm.nudge()
                                                      }
                                                    }
                                                  },
                                                  [
                                                    _vm._v(
                                                      "\n                                        Nudge\n                                        "
                                                    ),
                                                    _c("fluro-icon", {
                                                      attrs: {
                                                        right: "",
                                                        icon: "hand-pointer"
                                                      }
                                                    })
                                                  ],
                                                  1
                                                )
                                              : _vm._e()
                                          ],
                                          1
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "v-flex",
                                          { attrs: { xs12: "" } },
                                          [
                                            _vm.sendEnabled
                                              ? _c(
                                                  "v-btn",
                                                  {
                                                    attrs: {
                                                      block: "",
                                                      color: "primary",
                                                      loading: _vm.sending
                                                    },
                                                    on: {
                                                      click: function($event) {
                                                        return _vm.send()
                                                      }
                                                    }
                                                  },
                                                  [
                                                    _vm._v(
                                                      "\n                                        Send " +
                                                        _vm._s(
                                                          _vm
                                                            .proposedAssignments
                                                            .length
                                                        ) +
                                                        "\n                                        "
                                                    ),
                                                    _c("fluro-icon", {
                                                      attrs: {
                                                        right: "",
                                                        icon: "angle-right"
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
                                    _c(
                                      "v-container",
                                      { attrs: { "px-0": "", "pt-1": "" } },
                                      [
                                        _c("label", [_vm._v("Suggestions")]),
                                        _vm._v(" "),
                                        _vm.loadingSuggestions
                                          ? _c(
                                              "div",
                                              [
                                                _c("div", [
                                                  _vm._v("Loading...")
                                                ]),
                                                _vm._v(" "),
                                                _c("v-progress-circular", {
                                                  attrs: { indeterminate: "" }
                                                })
                                              ],
                                              1
                                            )
                                          : _c(
                                              "div",
                                              [
                                                _vm.suggestedContacts.length
                                                  ? _c(
                                                      "list-group",
                                                      _vm._l(
                                                        _vm.suggestedContacts,
                                                        function(
                                                          contact,
                                                          index
                                                        ) {
                                                          return _c(
                                                            "roster-slot-suggestion-list-item",
                                                            {
                                                              attrs: {
                                                                assignmentSlot:
                                                                  _vm.slot,
                                                                event: _vm.event
                                                              },
                                                              nativeOn: {
                                                                click: function(
                                                                  $event
                                                                ) {
                                                                  return _vm.selectSuggestion(
                                                                    _vm
                                                                      .suggestedContacts[
                                                                      index
                                                                    ]
                                                                  )
                                                                }
                                                              },
                                                              model: {
                                                                value:
                                                                  _vm
                                                                    .suggestedContacts[
                                                                    index
                                                                  ],
                                                                callback: function(
                                                                  $$v
                                                                ) {
                                                                  _vm.$set(
                                                                    _vm.suggestedContacts,
                                                                    index,
                                                                    $$v
                                                                  );
                                                                },
                                                                expression:
                                                                  "suggestedContacts[index]"
                                                              }
                                                            }
                                                          )
                                                        }
                                                      ),
                                                      1
                                                    )
                                                  : [
                                                      _c(
                                                        "em",
                                                        {
                                                          staticClass:
                                                            "small muted"
                                                        },
                                                        [
                                                          _vm._v(
                                                            "No suggestions"
                                                          )
                                                        ]
                                                      )
                                                    ]
                                              ],
                                              2
                                            )
                                      ]
                                    )
                                  ]
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
                  _c(
                    "tab",
                    {
                      attrs: { heading: _vm.unavailableCount + " Unavailable" }
                    },
                    [
                      _c(
                        "flex-column-body",
                        [
                          _c(
                            "v-container",
                            [
                              _vm.conflicts.length
                                ? _c(
                                    "v-container",
                                    { attrs: { "pa-0": "", "pb-2": "" } },
                                    [
                                      _c("label", [_vm._v("Already Rostered")]),
                                      _vm._v(" "),
                                      _c(
                                        "list-group",
                                        _vm._l(_vm.conflicts, function(
                                          contact,
                                          index
                                        ) {
                                          return _c(
                                            "roster-slot-suggestion-list-item",
                                            {
                                              attrs: {
                                                assignmentSlot: _vm.slot,
                                                event: _vm.event
                                              },
                                              nativeOn: {
                                                click: function($event) {
                                                  return _vm.selectSuggestion(
                                                    _vm.conflicts[index]
                                                  )
                                                }
                                              },
                                              model: {
                                                value: _vm.conflicts[index],
                                                callback: function($$v) {
                                                  _vm.$set(
                                                    _vm.conflicts,
                                                    index,
                                                    $$v
                                                  );
                                                },
                                                expression: "conflicts[index]"
                                              }
                                            }
                                          )
                                        }),
                                        1
                                      )
                                    ],
                                    1
                                  )
                                : _vm._e(),
                              _vm._v(" "),
                              _vm.unavailable.length
                                ? _c(
                                    "v-container",
                                    { attrs: { "pa-0": "", "pb-2": "" } },
                                    [
                                      _c("label", [
                                        _vm._v("Unavailable at this time")
                                      ]),
                                      _vm._v(" "),
                                      _c(
                                        "list-group",
                                        _vm._l(_vm.unavailable, function(
                                          contact,
                                          index
                                        ) {
                                          return _c(
                                            "roster-slot-suggestion-list-item",
                                            {
                                              attrs: {
                                                assignmentSlot: _vm.slot,
                                                event: _vm.event
                                              },
                                              nativeOn: {
                                                click: function($event) {
                                                  return _vm.selectSuggestion(
                                                    _vm.unavailable[index]
                                                  )
                                                }
                                              },
                                              model: {
                                                value: _vm.unavailable[index],
                                                callback: function($$v) {
                                                  _vm.$set(
                                                    _vm.unavailable,
                                                    index,
                                                    $$v
                                                  );
                                                },
                                                expression: "unavailable[index]"
                                              }
                                            }
                                          )
                                        }),
                                        1
                                      )
                                    ],
                                    1
                                  )
                                : _vm._e(),
                              _vm._v(" "),
                              _vm.unqualified.length
                                ? _c(
                                    "v-container",
                                    { attrs: { "pa-0": "", "pb-2": "" } },
                                    [
                                      _c("label", [_vm._v("Unqualified")]),
                                      _vm._v(" "),
                                      _c(
                                        "list-group",
                                        _vm._l(_vm.unqualified, function(
                                          contact,
                                          index
                                        ) {
                                          return _c(
                                            "roster-slot-suggestion-list-item",
                                            {
                                              attrs: {
                                                assignmentSlot: _vm.slot,
                                                event: _vm.event
                                              },
                                              nativeOn: {
                                                click: function($event) {
                                                  return _vm.selectSuggestion(
                                                    _vm.unqualified[index]
                                                  )
                                                }
                                              },
                                              model: {
                                                value: _vm.unqualified[index],
                                                callback: function($$v) {
                                                  _vm.$set(
                                                    _vm.unqualified,
                                                    index,
                                                    $$v
                                                  );
                                                },
                                                expression: "unqualified[index]"
                                              }
                                            }
                                          )
                                        }),
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
            : _vm._e()
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
    inject("data-v-2ce8bbce_0", { source: "/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.multi-planner-sidebar .close {\n  margin: 0;\n}\n.multi-planner-sidebar label {\n  display: block;\n  font-weight: 500;\n  letter-spacing: 0.05em;\n  text-transform: uppercase;\n  margin-bottom: 5px;\n  font-size: 0.8em;\n}\n\n/*# sourceMappingURL=RosterSidebar.vue.map */", map: {"version":3,"sources":["C:\\Users\\User\\Documents\\fluro\\fluro-vue-ui\\src\\components\\content\\edit\\components\\RosterSidebar.vue","RosterSidebar.vue"],"names":[],"mappings":"AAstBA,GAAA;AAYA;EACA,yCAAA;AChuBA;ADmuBA;EACA,2CAAA;AChuBA;ADmuBA;EACA,4CAAA;AChuBA;ADmuBA;EACA,0CAAA;AChuBA;;ADwuBA,GAAA;AAGA;EACA,SAAA;ACvuBA;AD2uBA;EACA,cAAA;EACA,gBAAA;EACA,sBAAA;EACA,yBAAA;EAEA,kBAAA;EACA,gBAAA;AC1uBA;;AAEA,4CAA4C","file":"RosterSidebar.vue","sourcesContent":["<template>\n    <flex-column class=\"multi-planner-sidebar\">\n        <flex-column-header>\n            <v-container class=\"border-bottom\">\n                <v-layout align-center>\n                    <v-flex>\n                        <h4><strong v-if=\"slot\">{{slot.title}}</strong></h4>\n                    </v-flex>\n                </v-layout>\n                <h6 v-if=\"event\">{{event.title}} <span class=\"muted\">{{event.definition || event._type | definitionTitle}}</span></h6>\n                <div v-if=\"event\">{{event | readableEventDate}} <span class=\"sm muted\">(Starts {{event.startDate | timeago}})</span></div>\n            </v-container>\n        </flex-column-header>\n        <flex-column>\n            <tabset v-model=\"activeTabIndex\" v-if=\"slot\">\n                <tab :heading=\"`${rosteredCount} Rostered`\">\n                    <flex-column-body>\n                        <v-container>\n                            <v-container pa-0 pb-2>\n                                <div class=\"search\" :class=\"{active:searchFocussed || search.length}\">\n                                    <input v-model=\"search\" ref=\"search\" @focus=\"searchFocussed = true\" @blur=\"searchFocussed = false\" placeholder=\"Search for contacts\" />\n                                    <div class=\"search-icon\" @click=\"search = ''\">\n                                        <fluro-icon icon=\"times\" v-if=\"search.length\" />\n                                        <fluro-icon icon=\"search\" v-else />\n                                    </div>\n                                </div>\n                            </v-container>\n                            <template v-if=\"search.length\">\n                                <v-container pa-0 pb-2>\n                                    <template v-if=\"searching\">\n                                        <div>Searching...</div>\n                                        <v-progress-circular indeterminate />\n                                    </template>\n                                    <template v-else>\n                                        <label>Search Results</label>\n                                        <list-group>\n                                            <roster-slot-suggestion-list-item v-for=\"(contact, index) in searchResults\" @click.native=\"selectSuggestion(searchResults[index])\" v-model=\"searchResults[index]\" :assignmentSlot=\"slot\" :event=\"event\" />\n                                        </list-group>\n                                    </template>\n                                </v-container>\n                            </template>\n                            <template v-else>\n\n                                <!-- <pre>{{slot}}</pre> -->\n                                <v-container pa-0 pb-2 v-if=\"assignments.length\">\n                                    <label>Rostered</label>\n                                    <!-- <list-group> -->\n                                    <div>\n                                        <template v-for=\"(assignment, index) in assignments\">\n                                            <roster-slot-assignment-list-item @unassign=\"removeAssignment\" @send=\"sendAssignment\" v-model=\"assignments[index]\" />\n                                        </template>\n                                    </div>\n                                    <!-- </list-group> -->\n                                    \n                                </v-container>\n                                <v-layout>\n                                    <v-flex xs12>\n                                        <v-btn block @click=\"nudge()\" :loading=\"nudging\" v-if=\"nudgeEnabled\">\n                                            Nudge\n                                            <fluro-icon right icon=\"hand-pointer\" />\n                                        </v-btn>\n                                    </v-flex>\n                                    <v-flex xs12>\n                                        <v-btn block color=\"primary\" @click=\"send()\" :loading=\"sending\" v-if=\"sendEnabled\">\n                                            Send {{proposedAssignments.length}}\n                                            <fluro-icon right icon=\"angle-right\" />\n                                        </v-btn>\n                                    </v-flex>\n                                </v-layout>\n                                <!-- <pre>{{suggestedContacts}}</pre> -->\n                                <v-container px-0 pt-1>\n                                    <label>Suggestions</label>\n                                    <div v-if=\"loadingSuggestions\">\n                                        <div>Loading...</div>\n                                        <v-progress-circular indeterminate />\n                                    </div>\n                                    <div v-else>\n                                        <list-group v-if=\"suggestedContacts.length\">\n                                            <roster-slot-suggestion-list-item v-for=\"(contact, index) in suggestedContacts\" @click.native=\"selectSuggestion(suggestedContacts[index])\" v-model=\"suggestedContacts[index]\" :assignmentSlot=\"slot\" :event=\"event\" />\n                                            <!-- <template v-for=\"row in suggestions\" v-if=\"row.length\">\n                                            <suggestion-list-item @click.native=\"selectSuggestion(row[0])\" v-model=\"row[0]\" :assignmentSlot=\"slot\" :event=\"event\" />\n                                        </template> -->\n                                        </list-group>\n                                        <template v-else>\n                                            <em class=\"small muted\">No suggestions</em>\n                                        </template>\n                                    </div>\n                                </v-container>\n                            </template>\n                        </v-container>\n                    </flex-column-body>\n                </tab>\n                <tab :heading=\"`${unavailableCount} Unavailable`\">\n                    <flex-column-body>\n                        <v-container>\n                            <v-container pa-0 pb-2 v-if=\"conflicts.length\">\n                                <label>Already Rostered</label>\n                                <list-group>\n                                    <roster-slot-suggestion-list-item v-for=\"(contact, index) in conflicts\" @click.native=\"selectSuggestion(conflicts[index])\" v-model=\"conflicts[index]\" :assignmentSlot=\"slot\" :event=\"event\" />\n                                </list-group>\n                            </v-container>\n                            <v-container pa-0 pb-2 v-if=\"unavailable.length\">\n                                <label>Unavailable at this time</label>\n                                <list-group>\n                                    <roster-slot-suggestion-list-item v-for=\"(contact, index) in unavailable\" @click.native=\"selectSuggestion(unavailable[index])\" v-model=\"unavailable[index]\" :assignmentSlot=\"slot\" :event=\"event\" />\n                                </list-group>\n                            </v-container>\n                            <v-container pa-0 pb-2 v-if=\"unqualified.length\">\n                                <label>Unqualified</label>\n                                <list-group>\n                                    <roster-slot-suggestion-list-item v-for=\"(contact, index) in unqualified\" @click.native=\"selectSuggestion(unqualified[index])\" v-model=\"unqualified[index]\" :assignmentSlot=\"slot\" :event=\"event\" />\n                                </list-group>\n                            </v-container>\n                        </v-container>\n                    </flex-column-body>\n                </tab>\n            </tabset>\n        </flex-column>\n        <!-- <flex-column-footer>\n            <v-container py-1 class=\"border-top\">\n                <v-btn block @click=\"deselect()\">Done</v-btn>\n            </v-container>\n        </flex-column-footer> -->\n    </flex-column>\n</template>\n<script>\nimport RosterSlotSuggestionListItem from 'src/components/content/edit/components/RosterSlotSuggestionListItem.vue';\nimport RosterSlotAssignmentListItem from 'src/components/content/edit/components/RosterSlotAssignmentListItem.vue';\nimport _ from 'lodash';\n\nexport default {\n    props: {\n        value: {\n            type: Object,\n        }\n    },\n    components: {\n        RosterSlotSuggestionListItem,\n        RosterSlotAssignmentListItem\n    },\n    data() {\n        return {\n            activeTabIndex: 0,\n            search: '',\n            searchFocussed: false,\n            searching: false,\n            searchResults: [],\n            loadingSuggestions: false,\n            model: this.value,\n            suggestionData: null,\n            nudging: false,\n            sending: false,\n        }\n    },\n    mounted() {\n        this.focusSearch();\n    },\n    methods: {\n\n        deselect() {\n            this.$emit('input', null);\n        },\n        relevantRealmIDs() {\n            var self = this;\n            return self.$fluro.arrayIDs(self.roster.realms || self.event.realms || []);\n        },\n        eventRealmMap() {\n            var self = this;\n\n            return _.reduce(self.relevantRealmIDs, function(set, realmID) {\n                set[realmID] = realmID;\n                return set;\n            }, {})\n        },\n        getBestCandidate(row) {\n\n            var self = this;\n            var filtered = self.filterPossible(row);\n\n            //////////////////////////////////////////\n\n            //Order based on whether the realm is a match and the random ordering from the backend\n            filtered = _.orderBy(filtered, function(contact, index) {\n\n                var matchesRealm = _.some(contact.realms, function(realmID) {\n                    if (realmID._id) {\n                        realmID = realmID._id;\n                    }\n\n                    return self.eventRealmMap[realmID];\n                });\n\n                var realmWeight = matchesRealm ? 0 : 1;\n\n                //////////////////////////////////////\n\n                var orderIndex = parseInt(`${realmWeight}${index}`);\n                console.log('ORDER INDEX IS', orderIndex);\n\n                return orderIndex;\n            })\n            //////////////////////////////////////////\n\n\n            return filtered[0];\n        },\n        filterPossible(contacts) {\n\n            var self = this;\n            return _.chain(contacts)\n                .filter(function(contact) {\n                    var alreadyRostered = self.rosteredMap[contact._id];\n                    var unqualified = self.unqualifiedMap[contact._id];\n                    return !alreadyRostered && !unqualified;\n                })\n                .value()\n\n        },\n        searchFor: _.debounce(function(string) {\n\n            var self = this;\n\n            if (!string || !string.length) {\n                self.searchResults = [];\n                self.searching = false;\n                return\n            }\n\n            self.searching = true;\n\n            self.$fluro.api.get(`/content/contact/search/${string}`, {\n                    params: {\n                        limit: 10,\n                    }\n                })\n                .then(function(res) {\n                    self.searchResults = self.filterPossible(res.data);\n                    self.searching = false;\n                })\n                .catch(function(err) {\n                    self.searchResults = [];\n                    self.searching = false;\n                })\n\n        }, 300),\n        nudge() {\n            var self = this;\n\n\n            self.nudging = true;\n\n            var assignments = self.unknownAssignments;\n\n\n            //////////////////////////////////////////\n\n            if (!assignments.length) {\n                self.nudging = false;\n                return;\n            }\n\n            ////////////////////////////////////////\n\n            return self.$fluro.api.post('/assignments/nudge', {\n                    assignments,\n                })\n                .then(function(res) {\n                    self.nudging = false;\n\n                    ////console.log('Nudged everyone!', res);\n                    if (res.data.success.length) {\n                        self.$fluro.notify(`${res.data.success.length} notifications sent`);\n                    } else {\n                        self.$fluro.notify(`No notifications were sent`);\n                    }\n\n                })\n                .catch(function(err) {\n                    self.nudging = false;\n                    self.$fluro.error(err);\n                })\n        },\n        send() {\n            var self = this;\n            self.sending = true;\n\n            //////////////////////////////////////\n\n            var assignments = self.proposedAssignments;\n\n            if (!assignments.length) {\n                self.sending = false;\n                return;\n            }\n\n            //////////////////////////////////////\n\n            //Map each proposed to a promise\n            var promises = _.map(assignments, function(assignment) {\n                return self.sendAssignment(assignment);\n            });\n\n            //////////////////////////////////////\n\n            Promise.all(promises)\n                .then(function(res) {\n                    self.sending = false;\n                })\n                .catch(function(err) {\n                    self.sending = false;\n                })\n        },\n        editAssignment(assignment) {\n\n        },\n        createAssignment(details) {\n\n            var self = this;\n\n            return new Promise(function(resolve, reject) {\n\n\n                var rosterID = self.$fluro.utils.getStringID(self.model.roster);\n                var contact = details.contact;\n\n                // var details = {\n                //     title: self.slot.title,\n                //     contact: contact,\n                //     confirmationStatus: 'proposed',\n                //     force: options.force,\n                // }\n\n                self.$fluro.api.post(`/assignments/roster/${rosterID}`, details)\n                    .then(assignmentCreated)\n                    .catch(assignmentCreateError);\n\n\n                function assignmentCreated(res) {\n                    var matchingAssignment = res.data;\n                    matchingAssignment.contactName = (matchingAssignment.contact.title || matchingAssignment.contact.firstName + ' ' + matchingAssignment.contact.lastName);\n\n                    var alreadyAssigned = _.some(self.slot.assignments, {\n                        _id: matchingAssignment._id,\n                    })\n\n                    if (!alreadyAssigned) {\n\n                        if(!self.slot.assignments) {\n                            self.$set(self.slot, 'assignments', []);\n                        }\n                        \n                        self.slot.assignments.push(matchingAssignment);\n                    }\n\n                    resolve(matchingAssignment);\n                    self.searchResults = [];\n                    self.search = '';\n                    self.focusSearch();\n\n                }\n\n\n                function assignmentCreateError(err) {\n                    console.log('CREATE ERROR', err);\n                        var err = err.response ? err.response.data || err.response : err;\n                    var conflictError = err.error;\n                    var message = err.message;\n\n\n\n                    if (err.status == 403) {\n                        message = 'You do not have permission to make this action.';\n                    }\n\n                    if (conflictError == 'AssignmentConflictError') {\n                        var array = [{\n                            title: `Add as '${details.title}' anyway`,\n                            description: (contact.firstName || 'this person') + ' can still fulfill this assignment',\n                            force: true,\n                        }]\n\n                        return self.$fluro.options(array, `Conflict!`, message)\n                            .then(function(answer) {\n\n                                details.force = answer.force;\n                                self.$fluro.api.post(`/assignments/roster/${rosterID}`, details)\n                                    .then(assignmentCreated)\n                                    .catch(assignmentCreateError);\n\n\n                            })\n                    }\n\n                    self.$fluro.error(err);\n                    reject(err);\n                }\n\n\n            })\n        },\n        sendAssignment(assignment) {\n            var self = this;\n            self.$set(assignment, 'sending', true);\n\n            return self.$fluro.api.put(`/content/assignment/${assignment._id}`, {\n                    confirmationStatus: 'unknown',\n                })\n                .then(function(res) {\n                    var result = res.data;\n                    assignment.confirmationStatus = result.confirmationStatus\n                    self.$set(assignment, 'sending', false);\n                })\n                .catch(function(err) {\n                    self.$set(assignment, 'sending', false);\n                    self.$fluro.error(err);\n                })\n        },\n        removeAssignment(assignment) {\n\n            var self = this;\n\n            /////////////////////////////////////////////////////\n\n            //If the assignment has been rejected then we want\n            //to archive it and hide it from the list\n            switch (assignment.confirmationStatus) {\n                case 'denied':\n                    //////console.log('Hide the assignment')\n                    return self.archiveAssignment(assignment);\n                    break;\n                case 'proposed':\n                    return self.$fluro.api.delete(`/content/assignment/${assignment._id}`)\n                        .then(function(res) {\n                            removeComplete(res.data);\n                        })\n                    break;\n                case 'temporary':\n                    return removeComplete(assignment);\n                    break;\n            }\n\n\n            /////////////////////////////////////////////////////\n\n            return self.$fluro.confirm('Confirm Deletion', `Are you sure you want to delete this assignment`, {\n                    confirmColor: 'error',\n                    confirmText: 'Confirm Delete',\n                })\n                .then(function(res) {\n\n                    return self.$fluro.api.delete(`/content/assignment/${assignment._id}`)\n                        .then(function(res) {\n                            removeComplete(res.data);\n                        })\n                        .catch(function(err) {\n                            self.$fluro.error(err);\n                        })\n\n                })\n                .catch(function() {\n                    // self.$fluro.error(err);\n                })\n\n            ///////////////////////////////////////////////\n\n            function removeComplete(response) {\n\n                //Find the assignment update it with an _id\n                assignment._id = response._id\n                _.assign(assignment, response);\n\n                var index = self.slot.assignments.indexOf(assignment);\n                self.slot.assignments.splice(index, 1);\n\n                console.log('Removed!!!')\n            }\n\n        },\n        archiveAssignment(assignment) {\n\n            console.log('Archive assignment')\n            return self.$fluro.api.put(`/content/assignment/${assignment._id}`, {\n                    status: 'archived',\n                })\n                .then(function(res) {\n                    assignment.status = 'archived';\n                    var index = self.slot.assignments.indexOf(assignment);\n                    self.slot.splice(index, 1);\n                })\n                .catch(function(err) {\n                    self.$fluro.error(err);\n                })\n\n        },\n        checkProposed(assignment) {\n\n        },\n        saveProposed(assignment) {\n\n        },\n        selectSuggestion(contact, options) {\n\n            var self = this;\n\n            if (!options) {\n                options = {};\n            }\n\n\n            var details = {\n                title: self.slot.title,\n                contact: contact,\n                confirmationStatus: 'proposed',\n                force: options.force,\n            }\n\n            self.$set(contact, 'loading', true);\n\n            return self.createAssignment(details).then(function() {\n                    self.$set(contact, 'loading', false);\n                })\n                .catch(function(err) {\n                    self.$set(contact, 'loading', false);\n                });\n\n        },\n\n        focusSearch() {\n            if (this.$refs.search) {\n                this.$refs.search.focus();\n            }\n            this.activeTabIndex = 0;\n        },\n        reloadSuggestions() {\n\n            var self = this;\n\n\n            if (!self.model) {\n                self.loadingSuggestions = false;\n                self.suggestionData = null;\n                return;\n            }\n            self.loadingSuggestions = true;\n\n            self.$fluro.api.post(`/matrix/suggest`, {\n                    title: self.slot.title,\n                    event: self.event._id,\n                    roster: self.roster._id,\n                }, {\n                    params: {\n                        limit: 3,\n                    },\n                })\n                .then(function(res) {\n\n                    self.suggestionData = res.data;\n                    self.loadingSuggestions = false;\n                })\n                .catch(function(err) {\n                    self.suggestionData = null;\n                    self.loadingSuggestions = false;\n                })\n        },\n    },\n    watch: {\n        search(val) {\n            this.searching = true;\n            this.searchFor(val);\n        },\n        value(val) {\n            this.model = val;\n            this.searchResults = [];\n            this.search = '';\n            this.focusSearch();\n            this.reloadSuggestions();\n        },\n    },\n    computed: {\n        unknownAssignments() {\n            return _.filter(this.assignments, { confirmationStatus: 'unknown' });\n        },\n        proposedAssignments() {\n            return _.filter(this.assignments, { confirmationStatus: 'proposed' });\n        },\n        sendEnabled() {\n            var self = this;\n            return self.proposedAssignments.length;\n        },\n        nudgeEnabled() {\n            var self = this;\n            return self.unknownAssignments.length;\n        },\n        rosteredCount() {\n            return this.assignments.length\n        },\n        unavailableCount() {\n            var self = this;\n\n            var conflicts = self.conflicts.length;\n            var unavailable = self.unavailable.length;\n            var unqualified = self.unqualified.length;\n\n            return conflicts + unavailable + unqualified;\n\n        },\n        conflicts() {\n            var self = this;\n\n            if (!self.suggestionData) {\n                return [];\n            }\n\n            return self.suggestionData.conflicts;\n        },\n        unavailable() {\n            var self = this;\n\n            if (!self.suggestionData) {\n                return [];\n            }\n\n            return self.suggestionData.unavailable;\n        },\n        conflicts() {\n            var self = this;\n\n            if (!self.suggestionData) {\n                return [];\n            }\n\n            return self.suggestionData.conflicts;\n        },\n        unqualified() {\n            var self = this;\n\n            if (!self.suggestionData) {\n                return [];\n            }\n\n            return self.suggestionData.unqualified;\n        },\n        unqualifiedMap() {\n            return _.reduce(this.unqualified, function(set, contact) {\n                set[contact._id] = contact;\n                return set;\n            }, {})\n\n        },\n        suggestions() {\n            var self = this;\n\n            if (!self.suggestionData) {\n                console.log('No suggestion data')\n                return [];\n            }\n\n            // return self.suggestionData.suggested;\n            console.log('Before', self.suggestionData.suggested)\n            return self.suggestionData.suggested;\n\n\n\n\n        },\n        suggestedContacts() {\n            var self = this;\n\n\n            // var filtered = _.map(self.suggestionData.suggested, function(row) {\n\n            //     return _.filter(row, function(contact) {\n            //         return !self.rosteredMap[contact._id];\n            //     });\n\n            // });\n\n            // console.log('After', filtered)\n            // return filtered;\n\n\n\n\n            return _.chain(self.suggestions)\n                .reduce(function(set, row) {\n                    var candidate = self.getBestCandidate(row);\n\n                    if (candidate) {\n                        set.push(candidate);\n                    }\n\n                    return set;\n                }, [])\n                .value();\n        },\n        event() {\n            return _.get(this.roster,'event');\n        },\n        slot() {\n            return _.get(this.model,'slot')\n        },\n        rostered() {\n            return _.chain(this.assignments)\n                .map('contact')\n                .flatten()\n                .value()\n        },\n        rosteredMap() {\n            return _.reduce(this.rostered, function(set, contact) {\n\n                set[contact._id] = contact;\n                return set;\n            }, {})\n\n        },\n        assignments() {\n            return this.slot ? this.slot.assignments || [] : []\n        },\n        roster() {\n            return _.get(this.model,'roster')\n        }\n    },\n}\n</script>\n<style lang=\"scss\">\n\n/**/\r\n\r\n$primary: #2ad4b9;//#0bd6be;\r\n$success: #4cc650; //#4cc673;//\r\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\r\n$danger: #d93e63;\r\n$secondary: #0bd6cd; //#0bd6a3;\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n\r\n.border-top {\r\n    border-top: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-right {\r\n    border-right: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-bottom {\r\n    border-bottom: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-left {\r\n    border-left: 1px solid rgba(#000, 0.05);\r\n}\r\n//////////////////////////////////////////\r\n\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n/**/\n.multi-planner-sidebar {\n    \n    .close {\n        margin:0;\n    }\n\n\n    label {\n        display: block;\n        font-weight: 500;\n        letter-spacing: 0.05em;\n        text-transform: uppercase;\n        ;\n        margin-bottom: 5px;\n        font-size: 0.8em;\n    }\n}\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.multi-planner-sidebar .close {\n  margin: 0;\n}\n.multi-planner-sidebar label {\n  display: block;\n  font-weight: 500;\n  letter-spacing: 0.05em;\n  text-transform: uppercase;\n  margin-bottom: 5px;\n  font-size: 0.8em;\n}\n\n/*# sourceMappingURL=RosterSidebar.vue.map */"]}, media: undefined });

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
  mixins: [FluroContentEditMixin],
  components: {
    ReminderEventManager,
    RosterSidebar: __vue_component__$2
  },
  methods: {
    createSlot() {
      var self = this;
      var fields = [{
        title: 'Position Title',
        key: 'title',
        type: 'string',
        minimum: 1,
        maximum: 1,
        params: {
          autofocus: true
        }
      }, {
        title: 'Minimum Required',
        description: 'How many people do we need to fill this position?',
        key: 'minimum',
        type: 'integer',
        minimum: 0,
        maximum: 1,
        defaultValues: ['0'],
        params: {
          minValue: 0
        }
      }, {
        title: 'Maximum Required',
        description: 'What is the maximum amount of people that can fill this position?',
        key: 'maximum',
        type: 'integer',
        minimum: 0,
        maximum: 1,
        defaultValues: ['0'],
        params: {
          minValue: 0
        }
      }];
      self.$fluro.prompt(fields, 'Add Position').then(function (res) {
        console.log('New Position');

        var cleanedTitle = _.camelCase(res.title);

        if (!self.model.slots) {
          self.$set(self.model, 'slots', []);
        }

        var existing = _.some(self.model.slots, function (slot) {
          return _.camelCase(slot.title) == cleanedTitle;
        });

        if (existing) {
          return;
        }

        self.$set(res, 'assignments', []);
        self.model.slots.push(res);
        self.select(res);
      });
    },

    trash(slot) {
      var self = this;
      var index = self.model.slots.indexOf(slot);

      if (index == -1 || slot.assignments && slot.assignments.length) {
        return;
      }

      self.model.slots.splice(index, 1);
      self.selected = null;
    },

    getSummary(slot) {
      var minimum = parseInt(slot.minimum);
      var maximum = parseInt(slot.maximum);
      var current = (slot.assignments || []).length;

      if (minimum && current < minimum) {
        return `${minimum - current} required`;
      }

      if (maximum && current > maximum) {
        return `${current - maximum} too many!`;
      }

      return;
    },

    addSlot(slot) {
      var self = this;
      console.log('ADD SLOT', slot);
      self.model.slots.push(slot);
      self.selected = {
        roster: self.model,
        slot
      };
    },

    select(slot) {
      var self = this;
      console.log('SELECT SLOT', slot);
      self.selected = {
        roster: self.model,
        slot
      };
    },

    modelUpdated() {
      this.update(this.model);
    },

    injectAssignment(roster, assignment) {
      var self = this;
      var rosterID = self.model._id; //////////////////////////////////////////////////////////////
      //Get the slot name 

      var assignmentSlotName = String(assignment.title).toLowerCase(); //Find the matching slot on this roster

      var matchingSlot = _.find(roster.slots, function (slot) {
        return slot.title.toLowerCase() == assignmentSlotName;
      }); //////////////////////////////////////
      //If there is no matching slot


      if (!matchingSlot) {
        return;
      }

      self.$set(assignment, 'sending', true);

      if (!matchingSlot.assignments) {
        self.$set(matchingSlot, 'assignments', []);
      }

      matchingSlot.assignments.push(assignment); //////////////////////////////////////
      //If there is no assignments on this slot

      return new Promise(function (resolve, reject) {
        //Create the assignment
        return self.createAssignment(roster, matchingSlot.assignments, assignment, true).then(function (savedAssignment) {
          _.assign(assignment, savedAssignment);

          self.$set(assignment, 'sending', false);
          self.$set(savedAssignment, 'sending', false);
          console.log('CREATED AND UPDATED ASSIGNMENT', savedAssignment);
          resolve(savedAssignment);
        }).catch(function (err) {
          var index = matchingSlot.assignments.indexOf(assignment);
          matchingSlot.assignments.splice(index, 1);
          resolve(null);
        });
      });
    },

    createAssignment(rosterID, assignments, details, nopush) {
      var self = this;
      rosterID = self.model._id;
      return new Promise(function (resolve, reject) {
        var contact = details.contact;
        self.$fluro.api.post(`/assignments/roster/${rosterID}`, details).then(assignmentCreated).catch(assignmentCreateError); //////////////////////////////////////////////////

        function assignmentCreated(res) {
          var matchingAssignment = res.data;
          matchingAssignment.contactName = matchingAssignment.contact.title || matchingAssignment.contact.firstName + ' ' + matchingAssignment.contact.lastName;

          if (!nopush) {
            var alreadyAssigned = _.some(assignments, {
              _id: matchingAssignment._id
            });

            if (!alreadyAssigned) {
              assignments.push(matchingAssignment);
            }
          }

          resolve(matchingAssignment);
        } //////////////////////////////////////////////////


        function assignmentCreateError(err) {
          console.log('CREATE ERROR', err);
          var err = err.response ? err.response.data || err.response : err;
          var conflictError = err.error;
          var message = err.message;

          if (err.status == 403) {
            message = 'You do not have permission to make this action.';
          }

          if (conflictError == 'AssignmentConflictError') {
            var array = [{
              title: `Add ${contact.firstName} as '${details.title}' anyway`,
              description: (contact.firstName || 'this person') + ' can still fulfill this assignment',
              force: true
            }];
            return self.$fluro.options(array, `Conflict!`, message).then(function (answer) {
              details.force = answer.force;
              self.$fluro.api.post(`/assignments/roster/${rosterID}`, details).then(assignmentCreated).catch(assignmentCreateError);
            }).catch(function (err) {
              reject(err);
            });
          }

          self.$fluro.error(err);
          reject(err);
        }
      });
    }

  },

  created() {
  },

  asyncComputed: {// definition: {
    //  default: {},
    //  get() {
    //   var self = this;
    //   return new Promise(function(resolve, reject) {
    //    self.$fluro.content.get(self.model.definition, {})
    //     .then(function(res) {
    //      resolve(res);
    //     })
    //     .catch(function(err) {
    //      reject(err);
    //     })
    //   })
    //  },
    // }
  },
  computed: {
    existingSlotNames() {
      var self = this;
      return _.reduce(self.model.slots, function (set, slot) {
        var name = _.camelCase(slot.title);

        set[name] = true;
        return set;
      }, {});
    },

    definedSlots() {
      var self = this;
      return _.get(self.definition, 'data.slots') || [];
    },

    possibleSlots() {
      var self = this;
      return _.filter(self.definedSlots, function (slot) {
        var slotKey = _.camelCase(slot.title);

        return !self.existingSlotNames[slotKey];
      });
    },

    showOutline() {
      return false;
    },

    fieldsOutput() {
      var array = []; ///////////////////////////////////

      addField('event', {
        title: 'Event',
        minimum: 1,
        maximum: 1,
        type: 'reference',
        params: {
          restrictType: 'event'
        }
      });

      function addField(key, details) {
        details.key = key;
        array.push(details);
      }

      return array;
    }

  },

  data() {
    return {
      selected: null
    };
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
                { attrs: { heading: "Roster" } },
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
                                [
                                  _vm._l(_vm.model.slots, function(slot) {
                                    return _c(
                                      "fluro-panel",
                                      {
                                        key: slot.title,
                                        nativeOn: {
                                          click: function($event) {
                                            return _vm.select(slot)
                                          }
                                        }
                                      },
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
                                                    _vm._v(_vm._s(slot.title))
                                                  ]),
                                                  _vm._v(" "),
                                                  _c(
                                                    "span",
                                                    {
                                                      staticClass: "text-muted"
                                                    },
                                                    [
                                                      _vm._v(
                                                        _vm._s(
                                                          _vm.getSummary(slot)
                                                        )
                                                      )
                                                    ]
                                                  )
                                                ]),
                                                _vm._v(" "),
                                                _c(
                                                  "v-flex",
                                                  { attrs: { shrink: "" } },
                                                  [
                                                    _c(
                                                      "v-btn",
                                                      {
                                                        staticClass: "ma-0",
                                                        attrs: {
                                                          small: "",
                                                          icon: ""
                                                        }
                                                      },
                                                      [
                                                        _c("fluro-icon", {
                                                          attrs: {
                                                            icon: "pencil"
                                                          }
                                                        })
                                                      ],
                                                      1
                                                    ),
                                                    _vm._v(" "),
                                                    !slot.assignments ||
                                                    !slot.assignments.length
                                                      ? _c(
                                                          "v-btn",
                                                          {
                                                            staticClass:
                                                              "ma-0 ml-1",
                                                            attrs: {
                                                              small: "",
                                                              icon: ""
                                                            },
                                                            on: {
                                                              click: function(
                                                                $event
                                                              ) {
                                                                $event.preventDefault();
                                                                $event.stopPropagation();
                                                                return _vm.trash(
                                                                  slot
                                                                )
                                                              }
                                                            }
                                                          },
                                                          [
                                                            _c("fluro-icon", {
                                                              attrs: {
                                                                icon:
                                                                  "trash-alt"
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
                                            )
                                          ],
                                          1
                                        ),
                                        _vm._v(" "),
                                        _c("fluro-panel-body", [
                                          _c(
                                            "div",
                                            { staticClass: "assignments" },
                                            _vm._l(slot.assignments, function(
                                              assignment
                                            ) {
                                              return _c(
                                                "div",
                                                {
                                                  staticClass:
                                                    "assignment-item",
                                                  class:
                                                    assignment.confirmationStatus
                                                },
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
                                                        {
                                                          staticStyle: {
                                                            "padding-right":
                                                              "5px"
                                                          },
                                                          attrs: { shrink: "" }
                                                        },
                                                        [
                                                          _c("fluro-avatar", {
                                                            attrs: {
                                                              id:
                                                                assignment.contact,
                                                              type: "contact"
                                                            }
                                                          })
                                                        ],
                                                        1
                                                      ),
                                                      _vm._v(" "),
                                                      _c("v-flex", [
                                                        _vm._v(
                                                          "\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t" +
                                                            _vm._s(
                                                              assignment.contact &&
                                                                assignment
                                                                  .contact.title
                                                                ? assignment
                                                                    .contact
                                                                    .title
                                                                : assignment.contactName
                                                            ) +
                                                            "\n\t\t\t\t\t\t\t\t\t\t\t\t\t"
                                                        )
                                                      ])
                                                    ],
                                                    1
                                                  )
                                                ],
                                                1
                                              )
                                            }),
                                            0
                                          )
                                        ])
                                      ],
                                      1
                                    )
                                  }),
                                  _vm._v(" "),
                                  _vm._l(_vm.possibleSlots, function(slot) {
                                    return _c(
                                      "div",
                                      {
                                        staticClass: "pseudo-slot",
                                        on: {
                                          click: function($event) {
                                            return _vm.addSlot(slot)
                                          }
                                        }
                                      },
                                      [
                                        _vm._v(
                                          "\n\t\t\t\t\t\t\t\t\tAdd " +
                                            _vm._s(slot.title) +
                                            "\n\t\t\t\t\t\t\t\t"
                                        )
                                      ]
                                    )
                                  }),
                                  _vm._v(" "),
                                  _c(
                                    "v-btn",
                                    {
                                      attrs: { block: "", color: "primary" },
                                      on: {
                                        click: function($event) {
                                          return _vm.createSlot()
                                        }
                                      }
                                    },
                                    [
                                      _vm._v(
                                        "\n\t\t\t\t\t\t\t\t   Add a new position\n\t\t\t\t\t\t\t\t"
                                      )
                                    ]
                                  )
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
                      _vm.selected
                        ? _c(
                            "flex-column",
                            { staticClass: "sidebar" },
                            [
                              _c("roster-sidebar", {
                                model: {
                                  value: _vm.selected,
                                  callback: function($$v) {
                                    _vm.selected = $$v;
                                  },
                                  expression: "selected"
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
              _vm.definition &&
              _vm.definition.fields &&
              _vm.definition.fields.length
                ? _c(
                    "tab",
                    {
                      attrs: { heading: _vm.definition.title + " Information" }
                    },
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
    2
  )
};
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

  /* style */
  const __vue_inject_styles__$3 = function (inject) {
    if (!inject) return
    inject("data-v-f902c15c_0", { source: "/**/\n.border-top[data-v-f902c15c] {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right[data-v-f902c15c] {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom[data-v-f902c15c] {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left[data-v-f902c15c] {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.hint[data-v-f902c15c] {\n  font-size: 10px;\n  opacity: 0.5;\n  color: inherit;\n  display: block;\n}\n.assignments .assignment-item[data-v-f902c15c] {\n  width: 30%;\n  display: inline-block;\n  margin: 4px;\n}\n.assignment-item[data-v-f902c15c] {\n  font-size: 12px;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  border-radius: 100px;\n  margin-bottom: 2px;\n  padding: 5px;\n  font-weight: 500;\n  background-color: rgba(0, 0, 0, 0.05);\n}\n.assignment-item.confirmed[data-v-f902c15c] {\n  color: #4cc650;\n  background-color: rgba(76, 198, 80, 0.05);\n}\n.assignment-item.denied[data-v-f902c15c] {\n  color: #d93e63;\n  background-color: rgba(217, 62, 99, 0.05);\n}\n.assignment-item.unknown[data-v-f902c15c] {\n  color: #555;\n}\n.assignment-item.proposed[data-v-f902c15c] {\n  background-color: rgba(42, 212, 185, 0.1);\n  color: #197f6f;\n}\n.sidebar[data-v-f902c15c] {\n  border-left: 1px solid rgba(0, 0, 0, 0.1);\n  background: #fff;\n  flex: none;\n  max-width: 300px;\n}\n.pseudo-slot[data-v-f902c15c] {\n  cursor: pointer;\n  text-align: center;\n  border: 2px dashed rgba(0, 0, 0, 0.2);\n  padding: 15px 10px;\n  border-radius: 5px;\n  margin: 4px 0;\n  font-weight: bold;\n  opacity: 0.5;\n}\n.pseudo-slot[data-v-f902c15c]:hover {\n  opacity: 1;\n}\n\n/*# sourceMappingURL=roster.vue.map */", map: {"version":3,"sources":["C:\\Users\\User\\Documents\\fluro\\fluro-vue-ui\\src\\components\\content\\edit\\panels\\roster.vue","roster.vue"],"names":[],"mappings":"AA2bA,GAAA;AAYA;EACA,yCAAA;ACrcA;ADwcA;EACA,2CAAA;ACrcA;ADwcA;EACA,4CAAA;ACrcA;ADwcA;EACA,0CAAA;ACrcA;;AD6cA,GAAA;AACA;EACA,eAAA;EACA,YAAA;EACA,cAAA;EACA,cAAA;AC1cA;ADgdA;EACA,UAAA;EACA,qBAAA;EACA,WAAA;AC7cA;ADidA;EACA,eAAA;EACA,uBAAA;EACA,mBAAA;EACA,gBAAA;EACA,oBAAA;EACA,kBAAA;EACA,YAAA;EACA,gBAAA;EACA,qCAAA;AC9cA;ADgdA;EACA,cA5DA;EA6DA,yCAAA;AC9cA;ADidA;EACA,cA/DA;EAgEA,yCAAA;AC/cA;ADkdA;EACA,WAAA;AChdA;ADmdA;EACA,yCAAA;EACA,cAAA;ACjdA;ADsdA;EACA,yCAAA;EACA,gBAAA;EACA,UAAA;EACA,gBAAA;ACndA;ADudA;EACA,eAAA;EACA,kBAAA;EACA,qCAAA;EACA,kBAAA;EACA,kBAAA;EAEA,aAAA;EACA,iBAAA;EACA,YAAA;ACrdA;ADwdA;EACA,UAAA;ACtdA;;AAEA,qCAAqC","file":"roster.vue","sourcesContent":["<template>\n\t<flex-column>\n\t\t<template v-if=\"loading\">\n\t\t\t<fluro-page-preloader contain />\n\t\t</template>\n\t\t<tabset v-else :justified=\"true\" :vertical=\"true\">\n\t\t\t<tab heading=\"Roster\">\n\t\t\t\t<flex-row>\n\t\t\t\t\t<flex-column-body style=\"background: #fafafa;\">\n\t\t\t\t\t\t<v-container>\n\t\t\t\t\t\t\t<constrain>\n\t\t\t\t\t\t\t\t<fluro-panel :key=\"slot.title\" v-for=\"slot in model.slots\" @click.native=\"select(slot)\">\n\t\t\t\t\t\t\t\t\t<fluro-panel-title>\n\t\t\t\t\t\t\t\t\t\t<v-layout align-center>\n\t\t\t\t\t\t\t\t\t\t\t<v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t<strong>{{slot.title}}</strong> <span class=\"text-muted\">{{getSummary(slot)}}</span>\n\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t<v-flex shrink>\n\t\t\t\t\t\t\t\t\t\t\t\t<v-btn class=\"ma-0\" small icon>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-icon icon=\"pencil\" />\n\t\t\t\t\t\t\t\t\t\t\t\t</v-btn>\n\t\t\t\t\t\t\t\t\t\t\t\t<v-btn v-if=\"!slot.assignments || !slot.assignments.length\" @click.prevent.stop=\"trash(slot)\" class=\"ma-0 ml-1\" small icon>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-icon icon=\"trash-alt\" />\n\t\t\t\t\t\t\t\t\t\t\t\t</v-btn>\n\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t</fluro-panel-title>\n\t\t\t\t\t\t\t\t\t<fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t<div class=\"assignments\">\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"assignment-item\" :class=\"assignment.confirmationStatus\" v-for=\"assignment in slot.assignments\">\n\t\t\t\t\t\t\t\t\t\t\t\t<v-layout align-center>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex shrink style=\"padding-right:5px;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-avatar :id=\"assignment.contact\" type=\"contact\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t{{assignment.contact && assignment.contact.title ? assignment.contact.title : assignment.contactName}}\n\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</fluro-panel-body>\n\t\t\t\t\t\t\t\t</fluro-panel>\n\t\t\t\t\t\t\t\t<div class=\"pseudo-slot\" @click=\"addSlot(slot)\" v-for=\"slot in possibleSlots\">\n\t\t\t\t\t\t\t\t\tAdd {{slot.title}}\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t<v-btn block color=\"primary\" @click=\"createSlot()\">\n\t\t\t\t\t\t\t\t   Add a new position\n\t\t\t\t\t\t\t\t</v-btn>\n\t\t\t\t\t\t\t</constrain>\n\t\t\t\t\t\t\t<!-- <pre>{{selected}}</pre> -->\n\t\t\t\t\t\t\t<!-- <pre>{{definition}}</pre> -->\n\t\t\t\t\t\t\t<!-- <roster-main v-model=\"model\" :definition=\"definition\"></roster-main> -->\n\t\t\t\t\t\t\t<!-- <default-roster-manager :config=\"config\" v-model=\"model.defaultRosters\" :rosterOptions=\"rosterDefinitions.definitions\" /> -->\n\t\t\t\t\t\t</v-container>\n\t\t\t\t\t</flex-column-body>\n\t\t\t\t\t<flex-column class=\"sidebar\" v-if=\"selected\">\n\t\t\t\t\t\t<roster-sidebar v-model=\"selected\" />\n\t\t\t\t\t</flex-column>\n\t\t\t\t</flex-row>\n\t\t\t</tab>\n\t\t\t<!-- <tab heading=\"X Scheduled Reminders\">\n\t<flex-column-body style=\"background: #fafafa;\">\n\t <v-container>\n\t  <constrain md>\n\t   <reminder-event-manager :config=\"config\" v-model=\"model.reminders\" :allAssignmentOptions=\"model.slots\" />\n\t  </constrain>\n\t </v-container>\n\t</flex-column-body>\n   </tab> -->\n\t\t\t<tab :heading=\"`${definition.title} Information`\" v-if=\"definition && definition.fields && definition.fields.length\">\n\t\t\t\t<flex-column-body style=\"background: #fafafa;\">\n\t\t\t\t\t<v-container>\n\t\t\t\t\t\t<constrain sm>\n\t\t\t\t\t\t\t<fluro-content-form :options=\"options\" v-model=\"model.data\" :fields=\"definition.fields\" />\n\t\t\t\t\t\t</constrain>\n\t\t\t\t\t</v-container>\n\t\t\t\t</flex-column-body>\n\t\t\t</tab>\n\t\t</tabset>\n\t</flex-column>\n</template>\n<script>\n/////////////////////////////////\n// import RosterMain from 'src/components/content/edit/components/RosterMain.vue';\nimport ReminderEventManager from 'src/components/content/edit/components/ReminderEventManager.vue';\nimport FluroContentEditMixin from 'src/components/content/edit/FluroContentEditMixin.js';\n\nimport RosterSidebar from 'src/components/content/edit/components/RosterSidebar.vue';\n\n\n\n/////////////////////////////////\n\nimport Vue from 'vue';\nimport _ from 'lodash';\n\n/////////////////////////////////\n\nexport default {\n\n\tmixins: [FluroContentEditMixin],\n\tcomponents: { ReminderEventManager, RosterSidebar },\n\tmethods: {\n\t\tcreateSlot() {\n\t\t\tvar self = this;\n\n\n\n\t\t\tvar fields = [\n\t\t\t{\n\t\t\t\ttitle: 'Position Title',\n\t\t\t\tkey: 'title',\n\t\t\t\ttype: 'string',\n\t\t\t\tminimum: 1,\n\t\t\t\tmaximum: 1,\n\t\t\t\tparams: {\n\t\t\t\t\tautofocus: true,\n\t\t\t\t}\n\t\t\t}, \n\n\t\t\t{\n\t\t\t\ttitle: 'Minimum Required',\n\t\t\t\tdescription:'How many people do we need to fill this position?',\n\t\t\t\tkey: 'minimum',\n\t\t\t\ttype: 'integer',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\tdefaultValues:['0'],\n\t\t\t\tparams:{\n\t\t\t\t minValue:0,\n\t\t\t\t}\n\t\t\t}, \n\n\t\t\t {\n\t\t\t\ttitle: 'Maximum Required',\n\t\t\t\tdescription:'What is the maximum amount of people that can fill this position?',\n\t\t\t\tkey: 'maximum',\n\t\t\t\ttype: 'integer',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\tdefaultValues:['0'],\n\t\t\t\tparams:{\n\t\t\t\t minValue:0,\n\t\t\t\t}\n\t\t\t}, \n\n\t\t\t]\n\n\t\t\tself.$fluro.prompt(fields, 'Add Position')\n\t\t\t\t.then(function(res) {\n\n\t\t\t\t\tconsole.log('New Position');\n\n\t\t\t\t\tvar cleanedTitle = _.camelCase(res.title);\n\n\t\t\t\t\tif (!self.model.slots) {\n\t\t\t\t\t\tself.$set(self.model, 'slots', []);\n\t\t\t\t\t}\n\n\n\t\t\t\t\tvar existing = _.some(self.model.slots, function(slot) {\n\t\t\t\t\t  return _.camelCase(slot.title) == cleanedTitle;\n\t\t\t\t\t})\n\n\t\t\t\t\tif(existing) {\n\t\t\t\t\t return;\n\t\t\t\t\t}\n\n\n\t\t\t\t\tself.$set(res, 'assignments', []);\n\n\t\t\t\t\tself.model.slots.push(res)\n\t\t\t\t\tself.select(res);\n\t\t\t\t})\n\t\t},\n\t\ttrash(slot) {\n\t\t\tvar self = this;\n\t\t\tvar index = self.model.slots.indexOf(slot);\n\t\t\tif (index == -1 || slot.assignments && slot.assignments.length) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tself.model.slots.splice(index, 1);\n\t\t\tself.selected = null;\n\t\t},\n\t\tgetSummary(slot) {\n\n\t\t\tvar minimum = parseInt(slot.minimum);\n\t\t\tvar maximum = parseInt(slot.maximum);\n\t\t\tvar current = (slot.assignments || []).length;\n\n\t\t\tif (minimum && current < minimum) {\n\t\t\t\treturn `${minimum-current} required`;\n\t\t\t}\n\n\t\t\tif (maximum && current > maximum) {\n\t\t\t\treturn `${current - maximum} too many!`;\n\t\t\t}\n\n\t\t\treturn;\n\t\t},\n\t\taddSlot(slot) {\n\n\t\t\tvar self = this;\n\t\t\tconsole.log('ADD SLOT', slot);\n\n\t\t\tself.model.slots.push(slot);\n\n\t\t\tself.selected = {\n\t\t\t\troster: self.model,\n\t\t\t\tslot\n\t\t\t};\n\t\t},\n\t\tselect(slot) {\n\n\t\t\tvar self = this;\n\n\n\t\t\tconsole.log('SELECT SLOT', slot);\n\t\t\tself.selected = {\n\t\t\t\troster: self.model,\n\t\t\t\tslot\n\t\t\t};\n\t\t},\n\t\tmodelUpdated() {\n\t\t\tthis.update(this.model);\n\t\t},\n\t\tinjectAssignment(roster, assignment) {\n\t\t\tvar self = this;\n\n\t\t\tvar rosterID = self.model._id;\n\n\t\t\t//////////////////////////////////////////////////////////////\n\n\t\t\t//Get the slot name \n\t\t\tvar assignmentSlotName = String(assignment.title).toLowerCase();\n\n\t\t\t//Find the matching slot on this roster\n\t\t\tvar matchingSlot = _.find(roster.slots, function(slot) {\n\t\t\t\treturn slot.title.toLowerCase() == assignmentSlotName;\n\t\t\t})\n\n\t\t\t//////////////////////////////////////\n\n\t\t\t//If there is no matching slot\n\t\t\tif (!matchingSlot) {\n\t\t\t\treturn;\n\t\t\t}\n\n\n\t\t\tself.$set(assignment, 'sending', true);\n\n\t\t\tif (!matchingSlot.assignments) {\n\t\t\t\tself.$set(matchingSlot, 'assignments', []);\n\t\t\t}\n\n\t\t\tmatchingSlot.assignments.push(assignment);\n\n\n\t\t\t//////////////////////////////////////\n\n\t\t\t//If there is no assignments on this slot\n\t\t\treturn new Promise(function(resolve, reject) {\n\n\t\t\t\t//Create the assignment\n\t\t\t\treturn self.createAssignment(roster, matchingSlot.assignments, assignment, true)\n\t\t\t\t\t.then(function(savedAssignment) {\n\n\t\t\t\t\t\t_.assign(assignment, savedAssignment);\n\t\t\t\t\t\tself.$set(assignment, 'sending', false);\n\t\t\t\t\t\tself.$set(savedAssignment, 'sending', false);\n\n\t\t\t\t\t\tconsole.log('CREATED AND UPDATED ASSIGNMENT', savedAssignment)\n\n\n\t\t\t\t\t\tresolve(savedAssignment);\n\t\t\t\t\t})\n\t\t\t\t\t.catch(function(err) {\n\t\t\t\t\t\tvar index = matchingSlot.assignments.indexOf(assignment);\n\t\t\t\t\t\tmatchingSlot.assignments.splice(index, 1);\n\t\t\t\t\t\tresolve(null);\n\t\t\t\t\t})\n\t\t\t})\n\t\t},\n\n\t\tcreateAssignment(rosterID, assignments, details, nopush) {\n\n\t\t\tvar self = this;\n\n\t\t\trosterID = self.model._id;\n\n\t\t\treturn new Promise(function(resolve, reject) {\n\n\t\t\t\tvar contact = details.contact;\n\n\t\t\t\tself.$fluro.api.post(`/assignments/roster/${rosterID}`, details)\n\t\t\t\t\t.then(assignmentCreated)\n\t\t\t\t\t.catch(assignmentCreateError);\n\n\t\t\t\t//////////////////////////////////////////////////\n\n\t\t\t\tfunction assignmentCreated(res) {\n\t\t\t\t\tvar matchingAssignment = res.data;\n\t\t\t\t\tmatchingAssignment.contactName = (matchingAssignment.contact.title || matchingAssignment.contact.firstName + ' ' + matchingAssignment.contact.lastName);\n\n\t\t\t\t\tif (!nopush) {\n\t\t\t\t\t\tvar alreadyAssigned = _.some(assignments, {\n\t\t\t\t\t\t\t_id: matchingAssignment._id,\n\t\t\t\t\t\t})\n\n\t\t\t\t\t\tif (!alreadyAssigned) {\n\t\t\t\t\t\t\tassignments.push(matchingAssignment);\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\n\t\t\t\t\tresolve(matchingAssignment);\n\t\t\t\t}\n\n\t\t\t\t//////////////////////////////////////////////////\n\n\n\t\t\t\tfunction assignmentCreateError(err) {\n\n\t\t\t\t\tconsole.log('CREATE ERROR', err);\n\t\t\t\t\tvar err = err.response ? err.response.data || err.response : err;\n\t\t\t\t\tvar conflictError = err.error;\n\t\t\t\t\tvar message = err.message;\n\n\t\t\t\t\tif (err.status == 403) {\n\t\t\t\t\t\tmessage = 'You do not have permission to make this action.';\n\t\t\t\t\t}\n\n\t\t\t\t\tif (conflictError == 'AssignmentConflictError') {\n\t\t\t\t\t\tvar array = [{\n\t\t\t\t\t\t\ttitle: `Add ${contact.firstName} as '${details.title}' anyway`,\n\t\t\t\t\t\t\tdescription: (contact.firstName || 'this person') + ' can still fulfill this assignment',\n\t\t\t\t\t\t\tforce: true,\n\t\t\t\t\t\t}]\n\n\t\t\t\t\t\treturn self.$fluro.options(array, `Conflict!`, message)\n\t\t\t\t\t\t\t.then(function(answer) {\n\n\t\t\t\t\t\t\t\tdetails.force = answer.force;\n\t\t\t\t\t\t\t\tself.$fluro.api.post(`/assignments/roster/${rosterID}`, details)\n\t\t\t\t\t\t\t\t\t.then(assignmentCreated)\n\t\t\t\t\t\t\t\t\t.catch(assignmentCreateError);\n\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t.catch(function(err) {\n\t\t\t\t\t\t\t\treject(err);\n\t\t\t\t\t\t\t})\n\t\t\t\t\t}\n\n\t\t\t\t\tself.$fluro.error(err);\n\t\t\t\t\treject(err);\n\t\t\t\t}\n\n\n\t\t\t})\n\t\t},\n\t},\n\tcreated() {\n\t\tvar self = this;\n\t},\n\tasyncComputed: {\n\t\t// definition: {\n\t\t//  default: {},\n\t\t//  get() {\n\t\t//   var self = this;\n\t\t//   return new Promise(function(resolve, reject) {\n\t\t//    self.$fluro.content.get(self.model.definition, {})\n\t\t//     .then(function(res) {\n\t\t//      resolve(res);\n\t\t//     })\n\t\t//     .catch(function(err) {\n\t\t//      reject(err);\n\t\t//     })\n\t\t//   })\n\t\t//  },\n\t\t// }\n\t},\n\tcomputed: {\n\t\texistingSlotNames() {\n\t\t\tvar self = this;\n\t\t\treturn _.reduce(self.model.slots, function(set, slot) {\n\t\t\t\tvar name = _.camelCase(slot.title);\n\t\t\t\tset[name] = true;\n\t\t\t\treturn set;\n\t\t\t}, {})\n\t\t},\n\t\tdefinedSlots() {\n\t\t\tvar self = this;\n\n\t\t\treturn _.get(self.definition, 'data.slots') || [];\n\t\t},\n\t\tpossibleSlots() {\n\n\t\t\tvar self = this;\n\t\t\treturn _.filter(self.definedSlots, function(slot) {\n\n\t\t\t\tvar slotKey = _.camelCase(slot.title);\n\t\t\t\treturn !self.existingSlotNames[slotKey];\n\t\t\t});\n\t\t},\n\t\tshowOutline() {\n\t\t\treturn false;\n\t\t},\n\t\tfieldsOutput() {\n\n\t\t\tvar self = this;\n\t\t\tvar array = [];\n\n\t\t\t///////////////////////////////////\n\n\t\t\taddField('event', {\n\t\t\t\ttitle: 'Event',\n\t\t\t\tminimum: 1,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'reference',\n\t\t\t\tparams: {\n\t\t\t\t\trestrictType: 'event',\n\t\t\t\t},\n\t\t\t})\n\n\t\t\tfunction addField(key, details) {\n\t\t\t\tdetails.key = key;\n\t\t\t\tarray.push(details)\n\t\t\t}\n\n\t\t\treturn array;\n\n\t\t},\n\t},\n\tdata() {\n\t\treturn {\n\t\t\tselected: null,\n\t\t}\n\t},\n}\n\n</script>\n<style scoped lang=\"scss\">\n\n/**/\r\n\r\n$primary: #2ad4b9;//#0bd6be;\r\n$success: #4cc650; //#4cc673;//\r\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\r\n$danger: #d93e63;\r\n$secondary: #0bd6cd; //#0bd6a3;\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n\r\n.border-top {\r\n    border-top: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-right {\r\n    border-right: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-bottom {\r\n    border-bottom: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-left {\r\n    border-left: 1px solid rgba(#000, 0.05);\r\n}\r\n//////////////////////////////////////////\r\n\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n/**/\n.hint {\n\tfont-size: 10px;\n\topacity: 0.5;\n\tcolor: inherit;\n\tdisplay: block;\n}\n\n\n\n.assignments {\n\t.assignment-item {\n\t\twidth: 30%;\n\t\tdisplay: inline-block;\n\t\tmargin: 4px;\n\t}\n}\n\n.assignment-item {\n\tfont-size: 12px;\n\ttext-overflow: ellipsis;\n\twhite-space: nowrap;\n\toverflow: hidden;\n\tborder-radius: 100px;\n\tmargin-bottom: 2px;\n\tpadding: 5px;\n\tfont-weight: 500;\n\tbackground-color: rgba(#000, 0.05);\n\n\t&.confirmed {\n\t\tcolor: $success;\n\t\tbackground-color: rgba($success, 0.05);\n\t}\n\n\t&.denied {\n\t\tcolor: $danger;\n\t\tbackground-color: rgba($danger, 0.05);\n\t}\n\n\t&.unknown {\n\t\tcolor: #555;\n\t}\n\n\t&.proposed {\n\t\tbackground-color: rgba($primary, 0.1);\n\t\tcolor: darken($primary, 20%);\n\t}\n}\n\n\n.sidebar {\n\tborder-left: 1px solid rgba(#000, 0.1);\n\tbackground: #fff;\n\tflex: none;\n\tmax-width: 300px;\n}\n\n\n.pseudo-slot {\n\tcursor: pointer;\n\ttext-align: center;\n\tborder: 2px dashed rgba(#000, 0.2);\n\tpadding: 15px 10px;\n\tborder-radius: 5px;\n\n\tmargin: 4px 0;\n\tfont-weight: bold;\n\topacity: 0.5;\n\n\n\t&:hover {\n\t\topacity: 1;\n\t}\n}\n\n</style>\n","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.hint {\n  font-size: 10px;\n  opacity: 0.5;\n  color: inherit;\n  display: block;\n}\n\n.assignments .assignment-item {\n  width: 30%;\n  display: inline-block;\n  margin: 4px;\n}\n\n.assignment-item {\n  font-size: 12px;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  border-radius: 100px;\n  margin-bottom: 2px;\n  padding: 5px;\n  font-weight: 500;\n  background-color: rgba(0, 0, 0, 0.05);\n}\n.assignment-item.confirmed {\n  color: #4cc650;\n  background-color: rgba(76, 198, 80, 0.05);\n}\n.assignment-item.denied {\n  color: #d93e63;\n  background-color: rgba(217, 62, 99, 0.05);\n}\n.assignment-item.unknown {\n  color: #555;\n}\n.assignment-item.proposed {\n  background-color: rgba(42, 212, 185, 0.1);\n  color: #197f6f;\n}\n\n.sidebar {\n  border-left: 1px solid rgba(0, 0, 0, 0.1);\n  background: #fff;\n  flex: none;\n  max-width: 300px;\n}\n\n.pseudo-slot {\n  cursor: pointer;\n  text-align: center;\n  border: 2px dashed rgba(0, 0, 0, 0.2);\n  padding: 15px 10px;\n  border-radius: 5px;\n  margin: 4px 0;\n  font-weight: bold;\n  opacity: 0.5;\n}\n.pseudo-slot:hover {\n  opacity: 1;\n}\n\n/*# sourceMappingURL=roster.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$3 = "data-v-f902c15c";
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

export default __vue_component__$3;
//# sourceMappingURL=roster-992e5fa8.js.map
