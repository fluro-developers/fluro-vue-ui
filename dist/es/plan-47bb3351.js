
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { bo as _, bm as __vue_normalize__, bn as __vue_create_injector__ } from './index-fa946d7e.js';
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
import { F as FluroContentViewMixin } from './FluroContentViewMixin-6e8e057a.js';

//
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

var script = {
  props: {
    'value': {
      type: Object
    },
    'index': {
      type: Number
    },
    'plan': {
      type: Object
    } // 'teams': {
    //     type:Array,
    // }

  },

  data() {
    return {
      actionsOpen: false,
      row: this.value
    };
  },

  created() {
    if (!this.row.notes) {
      this.row.notes = {};
    }
  },

  computed: {
    type() {
      return this.row.type;
    },

    teams() {
      return this.plan.teams;
    },

    columns() {
      var self = this;
      return _.map(self.teams, function (team) {
        return {
          title: team,
          key: team
        };
      });
    }

  },
  filters: {
    mins(sec_num) {
      if (!sec_num) {
        return '';
      } /////////////////////////////////////


      var hours = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - hours * 3600) / 60);
      var seconds = sec_num - hours * 3600 - minutes * 60; /////////////////////////////////////
      //Clear string if 0

      hours = hours ? hours : '';
      minutes = minutes ? minutes : '';
      seconds = seconds ? seconds : ''; /////////////////////////////////////

      function pad(str) {
        return ("0" + str).slice(-2);
      } /////////////////////////////////////
      /////////////////////////////////////


      if (hours) {
        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
      } // if (minutes && seconds) {
      //     return `${pad(minutes)}:${pad(seconds)}`;
      // }


      if (minutes && seconds) {
        return `${minutes}m ${seconds}s `;
      }

      if (minutes) {
        return `${minutes} mins`;
      }

      return `${seconds}s`;
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
    "tr",
    { class: _vm.type },
    [
      _c("th", { staticClass: "duration-cell" }, [
        _c("div", { staticClass: "cell" }, [
          _c("div", [_vm._v(_vm._s(_vm.row.time))]),
          _vm._v(" "),
          _c("div", { staticClass: "sm muted" }, [
            _c("em", [_vm._v(_vm._s(_vm._f("mins")(_vm.row.duration)))])
          ])
        ])
      ]),
      _vm._v(" "),
      _c(
        "td",
        [
          _c(
            "v-layout",
            [
              _c("v-flex", [
                _c("div", { staticClass: "row-title" }, [
                  _c("div", { staticClass: "cell" }, [
                    _c("strong", { staticClass: "row-title-text" }, [
                      _vm._v(_vm._s(_vm.row.title))
                    ])
                  ])
                ])
              ]),
              _vm._v(" "),
              _vm.type == "song"
                ? _c("div", [
                    _c("div", { staticClass: "row-song-key cell" }, [
                      _vm._v(
                        "\n                    " +
                          _vm._s(_vm.row.key) +
                          "\n                "
                      )
                    ])
                  ])
                : _vm._e()
            ],
            1
          ),
          _vm._v(" "),
          _vm.type != "breaker" && _vm.type != "start"
            ? _c("div", { staticClass: "row-detail" }, [
                _vm.row.detail ? _c("div", { staticClass: "cell" }) : _vm._e()
              ])
            : _vm._e()
        ],
        1
      ),
      _vm._v(" "),
      _vm._l(_vm.columns, function(column) {
        return _c("td", { key: column.key }, [
          _c("div", {
            staticClass: "cell",
            domProps: { innerHTML: _vm._s(_vm.row.notes[column.key]) }
          })
        ])
      })
    ],
    2
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-1dcb985d_0", { source: "/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.duration-cell {\n  font-weight: normal;\n}\n\n/*# sourceMappingURL=PlanRowView.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/view/components/PlanRowView.vue","PlanRowView.vue"],"names":[],"mappings":"AAiJA,GAAA;AAYA;EACA,yCAAA;AC3JA;AD8JA;EACA,2CAAA;AC3JA;AD8JA;EACA,4CAAA;AC3JA;AD8JA;EACA,0CAAA;AC3JA;;ADmKA,GAAA;AAEA;EACA,mBAAA;ACjKA;;AAEA,0CAA0C","file":"PlanRowView.vue","sourcesContent":["<template>\n    <tr :class=\"type\">\n        <th class=\"duration-cell\">\n            <div class=\"cell\">\n                <div>{{row.time}}</div>\n                <div class=\"sm muted\"><em>{{row.duration | mins}}</em></div>\n            </div>\n        </th>\n        <td>\n            <v-layout>\n                <v-flex>\n                    <div class=\"row-title\">\n                        <div class=\"cell\">\n                            <strong class=\"row-title-text\">{{row.title}}</strong>\n                        </div>\n                    </div>\n                </v-flex>\n                <div v-if=\"type == 'song'\">\n                    <div class=\"row-song-key cell\">\n                        {{row.key}}\n                    </div>\n                </div>\n            </v-layout>\n            <div class=\"row-detail\" v-if=\"(type != 'breaker') && (type != 'start')\">\n                <div class=\"cell\" v-if=\"row.detail\">\n                    \n                </div>\n            </div>\n        </td>\n        <td :key=\"column.key\"  v-for=\"column in columns\">\n             <div class=\"cell\" v-html=\"row.notes[column.key]\">\n                \n             </div>\n        </td>\n    </tr>\n</template>\n<script>\n/////////////////////////////////\n\nimport Vue from 'vue';\nimport _ from 'lodash';\n\n//////////////////////////////////////////////////////\n//////////////////////////////////////////////////////\n//////////////////////////////////////////////////////\n//////////////////////////////////////////////////////\n\n\nexport default {\n    props: {\n        'value': {\n            type: Object,\n        },\n        'index': {\n            type: Number,\n        },\n        'plan': {\n            type: Object,\n        },\n        // 'teams': {\n        //     type:Array,\n        // }\n    },\n    data() {\n        return {\n            actionsOpen: false,\n            row: this.value,\n        }\n    },\n    created() {\n        if (!this.row.notes) {\n            this.row.notes = {};\n        }\n    },\n    computed: {\n        type() {\n            return this.row.type;\n           \n        },\n        \n        teams() {\n            return this.plan.teams;\n        },\n        columns() {\n            var self = this;\n            return _.map(self.teams, function(team) {\n                return {\n                    title: team,\n                    key: team,\n                }\n            });\n        },\n    },\n    filters: {\n        mins(sec_num) {\n            if (!sec_num) {\n                return '';\n            }\n            /////////////////////////////////////\n\n            var hours = Math.floor(sec_num / 3600);\n            var minutes = Math.floor((sec_num - (hours * 3600)) / 60);\n            var seconds = sec_num - (hours * 3600) - (minutes * 60);\n\n            /////////////////////////////////////\n\n            //Clear string if 0\n            hours = (hours ? hours : '');\n            minutes = (minutes ? minutes : '');\n            seconds = (seconds ? seconds : '');\n\n            /////////////////////////////////////\n\n            function pad(str) {\n                return (\"0\" + str).slice(-2);\n            }\n\n\n            /////////////////////////////////////\n            /////////////////////////////////////\n\n            if (hours) {\n                return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;\n            }\n\n            // if (minutes && seconds) {\n            //     return `${pad(minutes)}:${pad(seconds)}`;\n            // }\n            if (minutes && seconds) {\n                return `${minutes}m ${seconds}s `;\n            }\n\n            if (minutes) {\n                return `${minutes} mins`;\n            }\n\n            return `${seconds}s`;\n\n        },\n    },\n\n}\n</script>\n<style lang=\"scss\">\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n\n.duration-cell {\n    font-weight: normal;\n}\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.duration-cell {\n  font-weight: normal;\n}\n\n/*# sourceMappingURL=PlanRowView.vue.map */"]}, media: undefined });

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
/////////////////////////////////

var script$1 = {
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
    PlanRow: __vue_component__
  },
  mixins: [FluroContentViewMixin],

  created() {
    var self = this;

    _.each(self.item.schedules, function (row) {
      self.$set(row, 'guid', self.$fluro.utils.guid());
    });

    self.calculateDurations();
  },

  methods: {
    calculateDurations() {
      var self = this;
      var startIndex = self.startRowIndex;

      if (startIndex == -1) {
        startIndex = 0;
      } //////////////////////////////////////////////////


      var eventStartDate = _.get(self.item, 'event.startDate');

      var planStartDate = _.get(self.item, 'startDate'); // var startDate = (planStartDate ? new Date(planStartDate) : false) || (eventStartDate ? new Date(eventStartDate) : false) || new Date(); 


      var startDate = (eventStartDate ? new Date(eventStartDate) : false) || (planStartDate ? new Date(planStartDate) : false) || new Date(); //////////////////////////////////////////////////

      function newTime(elapsed) {
        var clonedDate = new Date(JSON.parse(JSON.stringify(startDate)));

        if (elapsed < 0) {
          clonedDate.setTime(startDate.getTime() - -1 * elapsed);
        } else {
          clonedDate.setTime(startDate.getTime() + elapsed);
        }

        return self.$fluro.date.formatDate(clonedDate, 'h:mma');
      }

      var rows = self.item.schedules;
      var before = rows.slice(0, startIndex).reverse();
      var after = rows.slice(startIndex); ///////////////////////////////////////

      _.reduce(before, function (elapsed, row, index) {
        if (row.duration) {
          elapsed += parseInt(row.duration) * 1000;
        }

        self.$set(row, 'time', newTime(-elapsed));
        self.$set(row, 'elapsedTime', -elapsed);
        return elapsed;
      }, 0);

      _.reduce(after, function (elapsed, row, index) {
        self.$set(row, 'time', newTime(elapsed));

        if (row.duration) {
          elapsed += parseInt(row.duration) * 1000;
        }

        self.$set(row, 'elapsedTime', elapsed);
        return elapsed;
      }, 0);
    }

  },
  computed: {
    times() {
      return _.map(this.model.schedules, 'duration').join('-');
    },

    startRow() {
      return this.model.schedules[this.startRowIndex];
    },

    startRowIndex() {
      var self = this;

      var index = _.findIndex(self.item.schedules, {
        type: 'start'
      });

      return index;
    },

    teams() {
      var self = this;
      return self.item.teams;
    },

    columns() {
      var self = this;
      return _.chain(self.teams).compact().map(function (team) {
        return {
          title: team,
          key: team
        };
      }).value();
    }

  },

  data() {
    // var array = [];
    // _.times(200, function() {
    //     array.push({
    //         id: array.length
    //     });
    // });
    return {
      actionsOpen: false,
      drag: false,
      dragOptions: {} // array

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
            { attrs: { justified: true, vertical: true } },
            [
              _c("tab", { attrs: { heading: "Plan" } }, [
                _c("div", { staticClass: "plan-table-wrapper" }, [
                  _c("div", { ref: "container", staticClass: "plan-table" }, [
                    _c(
                      "table",
                      {
                        staticClass: "main-table",
                        attrs: { id: "main-table" }
                      },
                      [
                        _c("thead", [
                          _c(
                            "tr",
                            [
                              _c(
                                "th",
                                { staticClass: "shrink center" },
                                [
                                  _c("fluro-icon", { attrs: { icon: "clock" } })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c("th", { staticClass: "detail" }, [
                                _vm._v("Detail")
                              ]),
                              _vm._v(" "),
                              _vm._l(_vm.columns, function(column, key) {
                                return _c("th", { key: key }, [
                                  _vm._v(
                                    "\n                                    " +
                                      _vm._s(column.title) +
                                      "\n                                "
                                  )
                                ])
                              })
                            ],
                            2
                          )
                        ]),
                        _vm._v(" "),
                        _c(
                          "tbody",
                          _vm._l(_vm.item.schedules, function(row, index) {
                            return _c("plan-row", {
                              key: row.guid,
                              attrs: { index: index, plan: _vm.item },
                              model: {
                                value: _vm.item.schedules[index],
                                callback: function($$v) {
                                  _vm.$set(_vm.item.schedules, index, $$v);
                                },
                                expression: "item.schedules[index]"
                              }
                            })
                          }),
                          1
                        )
                      ]
                    )
                  ])
                ])
              ]),
              _vm._v(" "),
              _vm.definition
                ? _c(
                    "tab",
                    { attrs: { heading: _vm.definition.title + " details" } },
                    [
                      _vm._t("default", [
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
                                    _c("h3", { attrs: { margin: "" } }, [
                                      _vm._v(_vm._s(_vm.definition.title))
                                    ]),
                                    _vm._v(" "),
                                    _c("fluro-content-render", {
                                      attrs: { fields: _vm.definedFields },
                                      model: {
                                        value: _vm.item.data,
                                        callback: function($$v) {
                                          _vm.$set(_vm.item, "data", $$v);
                                        },
                                        expression: "item.data"
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
                : _vm._e()
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
    inject("data-v-50296432_0", { source: "/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.plan-table-wrapper {\n  position: relative;\n  flex: 1;\n  display: flex;\n  overflow: hidden;\n}\n.plan-table-wrapper .cog-btn {\n  position: absolute;\n  top: 0px;\n  right: 0px;\n  width: 38px;\n  z-index: 3;\n  text-align: center;\n}\n.plan-table {\n  flex: 1;\n  position: relative;\n  width: 100%;\n  z-index: 1;\n  margin: auto;\n  overflow: auto;\n  background: #f0f2f5;\n  height: 100%;\n}\n.plan-table p {\n  margin-bottom: 5px !important;\n}\n.plan-table mention {\n  font-size: 0.8em;\n  font-weight: 500;\n  background: rgba(0, 0, 0, 0.1);\n  border-radius: 100px;\n  padding: 2px 4px;\n  display: inline-block;\n  margin: 0 4px;\n}\n.plan-table .cell {\n  padding: 4px 8px;\n  word-wrap: break-word;\n  white-space: pre-wrap;\n}\n.plan-table .placeholder {\n  padding-bottom: 2px;\n  padding-top: 2px;\n  opacity: 0;\n  font-size: 0.8em;\n  font-style: italic;\n}\n.plan-table .row-song-key {\n  min-width: 30px;\n  display: block;\n  text-align-last: center;\n  appearance: none;\n  border: none;\n  outline: none;\n  font-weight: 500;\n}\n.plan-table .row-song-key,\n.plan-table .row-title {\n  font-size: 1.1em;\n}\n.plan-table .row-song-key .cell,\n.plan-table .row-title .cell {\n  padding-bottom: 0;\n}\n.plan-table .row-detail .cell {\n  padding-top: 0;\n}\n.plan-table table {\n  width: 100%;\n  min-width: 600px;\n  margin: auto;\n  border-collapse: separate;\n  border-spacing: 0;\n  /* safari and ios need the tfoot itself to be position:sticky also */\n  /* testing links*/\n}\n.plan-table table th,\n.plan-table table td {\n  text-align: left;\n  padding: 5px;\n  border-bottom: 1px solid #e8edf1;\n  border-right: 1px solid #e8edf1;\n  height: inherit;\n  white-space: nowrap;\n}\n.plan-table table tr {\n  height: 1px;\n  background: #fff;\n}\n.plan-table table tr .dragger {\n  opacity: 0;\n}\n.plan-table table tr:hover .placeholder {\n  opacity: 0.5;\n}\n.plan-table table tr:hover .dragger {\n  opacity: 0.5;\n}\n.plan-table table tr th:first-child,\n.plan-table table tr th:last-child {\n  background: #fff;\n}\n.plan-table table tr:nth-child(odd) {\n  background: #fcfcfc;\n}\n.plan-table table tr:nth-child(odd) th:first-child,\n.plan-table table tr:nth-child(odd) th:last-child {\n  background: #fcfcfc;\n}\n.plan-table table tr.song {\n  background: #fffbdd;\n  color: #6b5f31;\n}\n.plan-table table tr.song th:first-child,\n.plan-table table tr.song th:last-child {\n  background: #fffbdd;\n}\n.plan-table table tr.breaker {\n  background: #f0f2f5;\n}\n.plan-table table tr.breaker th,\n.plan-table table tr.breaker td {\n  border-right: none;\n  border-top: 1px solid #e8edf1;\n  border-bottom: 1px solid #e8edf1;\n}\n.plan-table table tr.breaker th .cell,\n.plan-table table tr.breaker td .cell {\n  padding: 15px;\n}\n.plan-table table tr.breaker th.row-title .cell,\n.plan-table table tr.breaker td.row-title .cell {\n  padding-top: inherit;\n}\n.plan-table table tr.breaker th:first-child,\n.plan-table table tr.breaker th:last-child {\n  background: #f0f2f5;\n}\n.plan-table table tr.breaker .row-title-text {\n  opacity: 0.7;\n  text-transform: uppercase;\n  font-weight: 600;\n  letter-spacing: 0.05em;\n  font-size: 0.8em;\n}\n.plan-table table tr.start {\n  background: #93d3c8;\n}\n.plan-table table tr.start th,\n.plan-table table tr.start td {\n  border-right: none;\n  border-top: 1px solid #e8edf1;\n  border-bottom: 1px solid #e8edf1;\n}\n.plan-table table tr.start th .cell,\n.plan-table table tr.start td .cell {\n  padding: 5px;\n}\n.plan-table table tr.start th.row-title .cell,\n.plan-table table tr.start td.row-title .cell {\n  padding-top: inherit;\n}\n.plan-table table tr.start th:first-child,\n.plan-table table tr.start th:last-child {\n  background: #93d3c8;\n}\n.plan-table table tr.start .row-title-text {\n  opacity: 0.7;\n  text-transform: uppercase;\n  font-weight: 600;\n  letter-spacing: 0.05em;\n  font-size: 0.8em;\n}\n.plan-table table td {\n  vertical-align: top;\n  padding: 0;\n  position: relative;\n}\n.plan-table table td.duration-cell {\n  text-align: center;\n}\n.plan-table table td:hover {\n  background: rgba(42, 212, 185, 0.05);\n}\n.plan-table table td p:last-child,\n.plan-table table td .fluro-editor {\n  margin-bottom: 0 !important;\n}\n.plan-table table td .fluro-inline-edit {\n  min-height: 100%;\n  min-width: 100%;\n  display: block;\n  width: 100%;\n  position: relative;\n  float: left;\n}\n.plan-table table td .fluro-inline-edit {\n  width: 100%;\n  height: 100%;\n  display: block;\n}\n.plan-table table td .fluro-inline-edit .inline-edit-default {\n  height: auto !important;\n  width: auto !important;\n}\n.plan-table table td .fluro-inline-edit .inline-edit-input {\n  background: #fff;\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n}\n.plan-table table td .fluro-inline-edit .inline-edit-input.inline-show {\n  border-radius: 3px;\n  border: 3px solid #2ad4b9;\n  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);\n  z-index: 3;\n}\n.plan-table table td .fluro-inline-edit input,\n.plan-table table td .fluro-inline-edit select {\n  margin: 0;\n  max-width: 100%;\n  width: 100%;\n  display: block;\n  padding: 4px 8px;\n  line-height: 1;\n}\n.plan-table table thead th {\n  background: #fff;\n  font-size: 0.8em;\n  position: -webkit-sticky;\n  position: sticky;\n  top: 0;\n  z-index: 3;\n  border-bottom: 3px solid rgba(0, 0, 0, 0.1);\n}\n.plan-table table thead th.center {\n  text-align: center;\n}\n.plan-table table thead th.shrink {\n  width: 1px;\n}\n.plan-table table thead th.detail {\n  max-width: 300px;\n}\n.plan-table table tfoot th,\n.plan-table table tfoot td {\n  position: -webkit-sticky;\n  position: sticky;\n  bottom: 0;\n  z-index: 4;\n  background: #f0f2f5 !important;\n  border: none !important;\n  border-top: 1px solid rgba(0, 0, 0, 0.1) !important;\n}\n.plan-table table th:first-child,\n.plan-table table th:last-child {\n  position: -webkit-sticky;\n  position: sticky;\n  z-index: 2;\n  vertical-align: center !important;\n  text-align: center;\n}\n.plan-table table th:first-child:first-child,\n.plan-table table th:last-child:first-child {\n  left: 0;\n  width: 1px;\n  border-right: 1px solid #e8edf1;\n}\n.plan-table table th:first-child:last-child,\n.plan-table table th:last-child:last-child {\n  right: 0;\n  width: 1px;\n  border-left: 1px solid #e8edf1;\n}\n.plan-table table thead th:first-child,\n.plan-table table thead th:last-child,\n.plan-table table tfoot th:first-child,\n.plan-table table tfoot th:last-child {\n  z-index: 5;\n}\n.plan-table table tr.sortable-ghost {\n  opacity: 0.3;\n}\n.plan-table table tr.sortable-ghost th,\n.plan-table table tr.sortable-ghost td {\n  border-color: greyscale(#89a3b7, 1%) !important;\n  background: greyscale(#89a3b7, 1%) !important;\n}\n.plan-table table td .fluro-editor-textarea {\n  min-height: 0;\n}\n.plan-table table td .fluro-editor-textarea > div {\n  border-radius: 0 !important;\n  padding: 4px 8px !important;\n  border: none !important;\n}\n\n/*# sourceMappingURL=plan.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/view/panels/plan.vue","plan.vue"],"names":[],"mappings":"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","file":"plan.vue","sourcesContent":["<template>\n    <flex-column>\n        <template v-if=\"loading\">\n            <fluro-page-preloader contain />\n        </template>\n        <tabset v-else :justified=\"true\" :vertical=\"true\">\n            <tab heading=\"Plan\">\n                <div class=\"plan-table-wrapper\">\n                    <div class=\"plan-table\" ref=\"container\">\n                        <table id=\"main-table\" class=\"main-table\">\n                            <thead>\n                                <tr>\n                                    \n                                    <th class=\"shrink center\">\n                                        <fluro-icon icon=\"clock\" />\n                                    </th>\n                                    <th class=\"detail\">Detail</th>\n                                    <th v-for=\"(column, key) in columns\" :key=\"key\">\n                                        {{ column.title }}\n                                    </th>\n                                    \n                                </tr>\n                            </thead>\n                            <tbody>\n                                <!-- <draggable tag=\"tbody\" handle=\".handle\" v-model=\"model.schedules\" v-bind=\"dragOptions\" @start=\"drag = true\" @end=\"drag = false\" @sort=\"calculateDurations()\"> -->\n                                <!-- :teams=\"model.teams\" -->\n                                <plan-row v-model=\"item.schedules[index]\" :index=\"index\" :plan=\"item\" v-for=\"(row, index) in item.schedules\" :key=\"row.guid\" />\n                                <!-- </draggable> -->\n                            </tbody>\n                            <!--  <tfoot>\n                                <tr>\n                                    <th colspan=\"2\"></th>\n                                    <td>\n                                        <v-btn v-tippy content=\"Add Row\" style=\"border: 1px solid #ddd; background: #fff;\" class=\"ma-2\" @click=\"add('row')\">\n                                            <fluro-icon icon=\"plus\" />\n                                        </v-btn>\n                                        <v-btn v-tippy content=\"Add Songs\" style=\"border: 1px solid #ddd; background: #fff;\" class=\"ma-2\" @click=\"add('song')\">\n                                            <fluro-icon icon=\"music\" />\n                                        </v-btn>\n                                        <v-btn v-tippy content=\"Add Section\" style=\"border: 1px solid #ddd; background: #fff;\" class=\"ma-2\" @click=\"add('breaker')\">\n                                            <fluro-icon icon=\"megaphone\" />\n                                        </v-btn>\n                                        <v-btn v-tippy content=\"Add Start Time\" style=\"border: 1px solid #ddd; background: #fff;\" class=\"ma-2\" @click=\"add('start')\" v-if=\"startRowIndex == -1\">\n                                            <fluro-icon icon=\"clock\" />\n                                        </v-btn>\n                                    </td>\n                                    <td v-for=\"column in columns\"></td>\n                                    <th></th>\n                                </tr>\n                            </tfoot> -->\n                        </table>\n                    </div>\n                </div>\n            </tab>\n            <tab :heading=\"`${definition.title} details`\" v-if=\"definition\">\n                <slot>\n                    <flex-column-body style=\"background: #fafafa;\">\n                        <v-container>\n                            <constrain sm>\n                                <h3 margin>{{ definition.title }}</h3>\n                                <fluro-content-render :fields=\"definedFields\" v-model=\"item.data\" />\n                            </constrain>\n                        </v-container>\n                    </flex-column-body>\n                </slot>\n            </tab>\n        </tabset>\n    </flex-column>\n</template>\n<script>\n/////////////////////////////////\nimport _ from 'lodash';\n\nimport PlanRow from \"src/components/content/view/components/PlanRowView.vue\";\nimport FluroContentViewMixin from 'src/components/content/view/FluroContentViewMixin.js';\n\n//////////////////////////////////////////////////////\n\n/////////////////////////////////\n\nexport default {\n    props: {\n        config: {\n            type: Object,\n            required: true,\n        },\n        item: {\n            type: Object,\n            required: true,\n        },\n    },\n    components: {\n        PlanRow\n    },\n    mixins: [FluroContentViewMixin],\n    created() {\n        var self = this;\n        _.each(self.item.schedules, function(row) {\n            self.$set(row, 'guid', self.$fluro.utils.guid());\n        });\n\n        self.calculateDurations();\n    },\n    methods: {\n        calculateDurations() {\n            var self = this;\n            var startIndex = self.startRowIndex;\n\n            if (startIndex == -1) {\n                startIndex = 0;\n            }\n\n            //////////////////////////////////////////////////\n\n            var eventStartDate = _.get(self.item, 'event.startDate');\n            var planStartDate = _.get(self.item, 'startDate');\n            // var startDate = (planStartDate ? new Date(planStartDate) : false) || (eventStartDate ? new Date(eventStartDate) : false) || new Date(); \n            var startDate = (eventStartDate ? new Date(eventStartDate) : false) || (planStartDate ? new Date(planStartDate) : false) || new Date();\n\n            //////////////////////////////////////////////////\n\n            function newTime(elapsed) {\n                var clonedDate = new Date(JSON.parse(JSON.stringify(startDate)));\n                if (elapsed < 0) {\n                    clonedDate.setTime(startDate.getTime() - (-1 * elapsed));\n                } else {\n                    clonedDate.setTime(startDate.getTime() + elapsed);\n                }\n\n                return self.$fluro.date.formatDate(clonedDate, 'h:mma');\n            }\n\n\n            var rows = self.item.schedules;\n            var before = rows.slice(0, startIndex).reverse();\n            var after = rows.slice(startIndex);\n\n            ///////////////////////////////////////\n\n\n            _.reduce(before, function(elapsed, row, index) {\n                if (row.duration) {\n                    elapsed += (parseInt(row.duration) * 1000);\n                }\n                self.$set(row, 'time', newTime(-elapsed));\n                self.$set(row, 'elapsedTime', -elapsed);\n                return elapsed;\n            }, 0)\n\n            _.reduce(after, function(elapsed, row, index) {\n                self.$set(row, 'time', newTime(elapsed));\n                if (row.duration) {\n                    elapsed += (parseInt(row.duration) * 1000);\n                }\n                self.$set(row, 'elapsedTime', elapsed);\n                return elapsed;\n            }, 0)\n\n        },\n    },\n    computed: {\n        times() {\n            return _.map(this.model.schedules, 'duration').join('-');\n        },\n        startRow() {\n            return this.model.schedules[this.startRowIndex];\n        },\n        startRowIndex() {\n            var self = this;\n            var index = _.findIndex(self.item.schedules, { type: 'start' });\n            return index\n        },\n\n        teams() {\n            var self = this;\n            return self.item.teams;\n        },\n        columns() {\n            var self = this;\n            return _.chain(self.teams)\n                .compact()\n                .map(function(team) {\n                    return {\n                        title: team,\n                        key: team\n                    };\n                })\n                .value();\n        }\n    },\n    data() {\n        // var array = [];\n        // _.times(200, function() {\n        //     array.push({\n        //         id: array.length\n        //     });\n        // });\n\n        return {\n            actionsOpen: false,\n            drag: false,\n            dragOptions: {},\n            // array\n        };\n    }\n};\n</script>\n<style lang=\"scss\">\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n.plan-table-wrapper {\n    position: relative;\n    flex: 1;\n    display: flex;\n    overflow: hidden;\n\n    .cog-btn {\n        // width: 36px;\n        // height: 36px;\n        // text-align: center;\n        // position: absolute;\n        // top: 0;\n        // right: 0;\n        // z-index: 3;\n\n        position: absolute;\n        top: 0px;\n        right: 0px;\n        width: 38px;\n        z-index: 3;\n        text-align: center;\n    }\n}\n\n.plan-table {\n    flex: 1;\n    position: relative;\n    width: 100%;\n    z-index: 1;\n    margin: auto;\n    overflow: auto;\n    background: #f0f2f5;\n    height: 100%;\n\n    $cell-padding: 4px 8px;\n\n    p {\n        margin-bottom: 5px !important;\n    }\n\n    mention {\n        font-size: 0.8em;\n        font-weight: 500;\n        background: rgba(#000, 0.1);\n        border-radius: 100px;\n        padding: 2px 4px;\n        display: inline-block;\n        margin: 0 4px;\n    }\n\n    .cell {\n        padding: $cell-padding;\n        word-wrap: break-word;\n        white-space: pre-wrap;\n    }\n\n    .placeholder {\n        padding-bottom: 2px;\n        padding-top: 2px;\n        opacity: 0;\n        font-size: 0.8em;\n        font-style: italic;\n    }\n\n    .row-song-key {\n        min-width: 30px;\n        display: block;\n        text-align-last: center;\n        appearance: none;\n        border: none;\n        outline: none;\n        font-weight: 500;\n    }\n\n    .row-song-key,\n    .row-title {\n        font-size: 1.1em;\n\n        .cell {\n            padding-bottom: 0;\n        }\n    }\n\n    .row-detail {\n        .cell {\n            padding-top: 0;\n        }\n    }\n\n    table {\n        width: 100%;\n        min-width: 600px;\n        margin: auto;\n        border-collapse: separate;\n        border-spacing: 0;\n\n        th,\n        td {\n            text-align: left;\n            padding: 5px;\n            // border-bottom: 1px solid #000;\n            border-bottom: 1px solid #e8edf1;\n            border-right: 1px solid #e8edf1;\n            height: inherit;\n            white-space: nowrap;\n        }\n\n        /////////////////////////////////////\n\n        tr {\n            height: 1px;\n            background: #fff;\n\n            .dragger {\n                opacity: 0;\n            }\n\n            &:hover {\n                .placeholder {\n                    opacity: 0.5;\n                }\n\n                .dragger {\n                    opacity: 0.5;\n                }\n            }\n\n            th:first-child,\n            th:last-child {\n                background: #fff;\n            }\n\n            &:nth-child(odd) {\n\n                th:first-child,\n                th:last-child {\n                    background: #fcfcfc;\n                }\n\n                background: #fcfcfc;\n            }\n\n            &.song {\n                background: #fffbdd;\n                color: #6b5f31;\n\n                th,\n                td {\n                    // border-top: 1px solid #e8edf1;\n                    // border-bottom: 1px solid #e8edf1;\n                }\n\n                th:first-child,\n                th:last-child {\n                    background: #fffbdd;\n                }\n            }\n\n            &.breaker {\n                background: #f0f2f5;\n\n                th,\n                td {\n                    border-right: none;\n                    border-top: 1px solid #e8edf1;\n                    border-bottom: 1px solid #e8edf1;\n\n                    .cell {\n                        padding: 15px;\n                    }\n\n                    &.row-title {\n                        .cell {\n                            padding-top: inherit;\n                        }\n                    }\n                }\n\n                th:first-child,\n                th:last-child {\n                    background: #f0f2f5;\n                }\n\n                .row-title-text {\n                    opacity: 0.7;\n                    text-transform: uppercase;\n                    font-weight: 600;\n                    letter-spacing: 0.05em;\n                    font-size: 0.8em;\n                }\n            }\n\n\n            &.start {\n                background: #93d3c8;\n\n                th,\n                td {\n                    border-right: none;\n                    border-top: 1px solid #e8edf1;\n                    border-bottom: 1px solid #e8edf1;\n\n                    .cell {\n                        padding: 5px;\n                    }\n\n                    &.row-title {\n                        .cell {\n                            padding-top: inherit;\n                        }\n                    }\n                }\n\n                th:first-child,\n                th:last-child {\n                    background: #93d3c8;\n                }\n\n                .row-title-text {\n                    opacity: 0.7;\n                    text-transform: uppercase;\n                    font-weight: 600;\n                    letter-spacing: 0.05em;\n                    font-size: 0.8em;\n                }\n            }\n        }\n\n        td {\n            vertical-align: top;\n            padding: 0;\n            position: relative;\n\n            &.duration-cell {\n                text-align: center;\n            }\n\n            &:hover {\n                background: rgba($primary, 0.05);\n            }\n\n            p:last-child,\n            .fluro-editor {\n                margin-bottom: 0 !important;\n            }\n\n            .fluro-inline-edit {\n                min-height: 100%;\n                min-width: 100%;\n                display: block;\n                width: 100%;\n                position: relative;\n                float: left;\n                // position: absolute;\n            }\n\n            // &.duration {\n            //     text-align: center;\n\n            //     input {\n            //         width: 70px;\n            //         font-size: 0.9em;\n            //         padding: 0 5px;\n            //         text-align: center;\n            //         line-height: 30px;\n            //     }\n\n            //     // min-height: 50px;\n            // }\n\n            .fluro-inline-edit {\n                width: 100%;\n                height: 100%;\n                // position: absolute;\n                // left:0;\n                // bottom:0;\n                // right:0;\n                // top:0;\n                // overflow: hidden;\n                // border:10px solid #ff0066;\n                display: block;\n\n                .inline-edit-default {\n                    height: auto !important;\n                    width: auto !important;\n                }\n\n                // .inline-hide {\n                //     height: 0 !important;\n                //     width: 0 !important;\n                //     overflow: hidden !important;\n                //     display: block !important;\n                //     // visibility: hidden;\n                // }\n\n                .inline-edit-input {\n                    background: #fff;\n                    position: absolute;\n                    left: 0;\n                    top: 0;\n                    right: 0;\n\n                    &.inline-show {\n                        border-radius: 3px;\n                        border: 3px solid $primary;\n                        box-shadow: 0 4px 10px rgba(#000, 0.3);\n                        z-index: 3;\n                        //width:0 !important;\n                    }\n                }\n\n                input,\n                select {\n                    margin: 0;\n                    max-width: 100%;\n                    width: 100%;\n                    display: block;\n                    padding: $cell-padding;\n                    line-height: 1;\n                }\n            }\n\n            // &.duration-cell {\n            //     position: relative;\n\n            //     left: 0;\n            //     right: 0;\n            //     bottom: 0;\n            //     top: 0;\n            //     width: 100%;\n            //     height: 100%;\n\n            //\n\n            //     // position: absolute;\n            // }\n\n            // }\n        }\n\n        thead th {\n            background: #fff;\n            font-size: 0.8em;\n            // color: #fff;\n            position: -webkit-sticky;\n            position: sticky;\n            top: 0;\n            z-index: 3;\n\n            &.center {\n                text-align: center;\n            }\n\n            &.shrink {\n                width: 1px;\n            }\n\n            &.detail {\n                // width: 40%;\n                max-width: 300px;\n            }\n\n            border-bottom: 3px solid rgba(#000, 0.1);\n        }\n\n        /* safari and ios need the tfoot itself to be position:sticky also */\n        tfoot {\n\n            th,\n            td {\n                position: -webkit-sticky;\n                position: sticky;\n                bottom: 0;\n                z-index: 4;\n                background: #f0f2f5 !important;\n                border: none !important;\n                border-top: 1px solid rgba(#000, 0.1) !important;\n            }\n        }\n\n        /* testing links*/\n        th:first-child,\n        th:last-child {\n            position: -webkit-sticky;\n            position: sticky;\n            z-index: 2;\n\n            vertical-align: center !important;\n            text-align: center;\n\n            &:first-child {\n                left: 0;\n                width: 1px;\n                border-right: 1px solid #e8edf1;\n            }\n\n            &:last-child {\n                right: 0;\n                width: 1px;\n                border-left: 1px solid #e8edf1;\n            }\n        }\n\n        thead,\n        tfoot {\n\n            th:first-child,\n            th:last-child {\n                z-index: 5;\n            }\n        }\n\n        /////////////////////////////////\n\n        tr.sortable-ghost {\n            opacity: 0.3;\n            // background:darken(#e8edf1, 30%) !important;\n\n            th,\n            td {\n                border-color: greyscale(darken(#e8edf1, 30%), 1%) !important;\n                background: greyscale(darken(#e8edf1, 30%), 1%) !important;\n            }\n        }\n\n        td .fluro-editor-textarea {\n            min-height: 0;\n\n            &>div {\n                // font-size: 11px;\n                border-radius: 0 !important;\n                padding: $cell-padding !important;\n                border: none !important;\n            }\n        }\n    }\n}\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.plan-table-wrapper {\n  position: relative;\n  flex: 1;\n  display: flex;\n  overflow: hidden;\n}\n.plan-table-wrapper .cog-btn {\n  position: absolute;\n  top: 0px;\n  right: 0px;\n  width: 38px;\n  z-index: 3;\n  text-align: center;\n}\n\n.plan-table {\n  flex: 1;\n  position: relative;\n  width: 100%;\n  z-index: 1;\n  margin: auto;\n  overflow: auto;\n  background: #f0f2f5;\n  height: 100%;\n}\n.plan-table p {\n  margin-bottom: 5px !important;\n}\n.plan-table mention {\n  font-size: 0.8em;\n  font-weight: 500;\n  background: rgba(0, 0, 0, 0.1);\n  border-radius: 100px;\n  padding: 2px 4px;\n  display: inline-block;\n  margin: 0 4px;\n}\n.plan-table .cell {\n  padding: 4px 8px;\n  word-wrap: break-word;\n  white-space: pre-wrap;\n}\n.plan-table .placeholder {\n  padding-bottom: 2px;\n  padding-top: 2px;\n  opacity: 0;\n  font-size: 0.8em;\n  font-style: italic;\n}\n.plan-table .row-song-key {\n  min-width: 30px;\n  display: block;\n  text-align-last: center;\n  appearance: none;\n  border: none;\n  outline: none;\n  font-weight: 500;\n}\n.plan-table .row-song-key,\n.plan-table .row-title {\n  font-size: 1.1em;\n}\n.plan-table .row-song-key .cell,\n.plan-table .row-title .cell {\n  padding-bottom: 0;\n}\n.plan-table .row-detail .cell {\n  padding-top: 0;\n}\n.plan-table table {\n  width: 100%;\n  min-width: 600px;\n  margin: auto;\n  border-collapse: separate;\n  border-spacing: 0;\n  /* safari and ios need the tfoot itself to be position:sticky also */\n  /* testing links*/\n}\n.plan-table table th,\n.plan-table table td {\n  text-align: left;\n  padding: 5px;\n  border-bottom: 1px solid #e8edf1;\n  border-right: 1px solid #e8edf1;\n  height: inherit;\n  white-space: nowrap;\n}\n.plan-table table tr {\n  height: 1px;\n  background: #fff;\n}\n.plan-table table tr .dragger {\n  opacity: 0;\n}\n.plan-table table tr:hover .placeholder {\n  opacity: 0.5;\n}\n.plan-table table tr:hover .dragger {\n  opacity: 0.5;\n}\n.plan-table table tr th:first-child,\n.plan-table table tr th:last-child {\n  background: #fff;\n}\n.plan-table table tr:nth-child(odd) {\n  background: #fcfcfc;\n}\n.plan-table table tr:nth-child(odd) th:first-child,\n.plan-table table tr:nth-child(odd) th:last-child {\n  background: #fcfcfc;\n}\n.plan-table table tr.song {\n  background: #fffbdd;\n  color: #6b5f31;\n}\n.plan-table table tr.song th:first-child,\n.plan-table table tr.song th:last-child {\n  background: #fffbdd;\n}\n.plan-table table tr.breaker {\n  background: #f0f2f5;\n}\n.plan-table table tr.breaker th,\n.plan-table table tr.breaker td {\n  border-right: none;\n  border-top: 1px solid #e8edf1;\n  border-bottom: 1px solid #e8edf1;\n}\n.plan-table table tr.breaker th .cell,\n.plan-table table tr.breaker td .cell {\n  padding: 15px;\n}\n.plan-table table tr.breaker th.row-title .cell,\n.plan-table table tr.breaker td.row-title .cell {\n  padding-top: inherit;\n}\n.plan-table table tr.breaker th:first-child,\n.plan-table table tr.breaker th:last-child {\n  background: #f0f2f5;\n}\n.plan-table table tr.breaker .row-title-text {\n  opacity: 0.7;\n  text-transform: uppercase;\n  font-weight: 600;\n  letter-spacing: 0.05em;\n  font-size: 0.8em;\n}\n.plan-table table tr.start {\n  background: #93d3c8;\n}\n.plan-table table tr.start th,\n.plan-table table tr.start td {\n  border-right: none;\n  border-top: 1px solid #e8edf1;\n  border-bottom: 1px solid #e8edf1;\n}\n.plan-table table tr.start th .cell,\n.plan-table table tr.start td .cell {\n  padding: 5px;\n}\n.plan-table table tr.start th.row-title .cell,\n.plan-table table tr.start td.row-title .cell {\n  padding-top: inherit;\n}\n.plan-table table tr.start th:first-child,\n.plan-table table tr.start th:last-child {\n  background: #93d3c8;\n}\n.plan-table table tr.start .row-title-text {\n  opacity: 0.7;\n  text-transform: uppercase;\n  font-weight: 600;\n  letter-spacing: 0.05em;\n  font-size: 0.8em;\n}\n.plan-table table td {\n  vertical-align: top;\n  padding: 0;\n  position: relative;\n}\n.plan-table table td.duration-cell {\n  text-align: center;\n}\n.plan-table table td:hover {\n  background: rgba(42, 212, 185, 0.05);\n}\n.plan-table table td p:last-child,\n.plan-table table td .fluro-editor {\n  margin-bottom: 0 !important;\n}\n.plan-table table td .fluro-inline-edit {\n  min-height: 100%;\n  min-width: 100%;\n  display: block;\n  width: 100%;\n  position: relative;\n  float: left;\n}\n.plan-table table td .fluro-inline-edit {\n  width: 100%;\n  height: 100%;\n  display: block;\n}\n.plan-table table td .fluro-inline-edit .inline-edit-default {\n  height: auto !important;\n  width: auto !important;\n}\n.plan-table table td .fluro-inline-edit .inline-edit-input {\n  background: #fff;\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n}\n.plan-table table td .fluro-inline-edit .inline-edit-input.inline-show {\n  border-radius: 3px;\n  border: 3px solid #2ad4b9;\n  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);\n  z-index: 3;\n}\n.plan-table table td .fluro-inline-edit input,\n.plan-table table td .fluro-inline-edit select {\n  margin: 0;\n  max-width: 100%;\n  width: 100%;\n  display: block;\n  padding: 4px 8px;\n  line-height: 1;\n}\n.plan-table table thead th {\n  background: #fff;\n  font-size: 0.8em;\n  position: -webkit-sticky;\n  position: sticky;\n  top: 0;\n  z-index: 3;\n  border-bottom: 3px solid rgba(0, 0, 0, 0.1);\n}\n.plan-table table thead th.center {\n  text-align: center;\n}\n.plan-table table thead th.shrink {\n  width: 1px;\n}\n.plan-table table thead th.detail {\n  max-width: 300px;\n}\n.plan-table table tfoot th,\n.plan-table table tfoot td {\n  position: -webkit-sticky;\n  position: sticky;\n  bottom: 0;\n  z-index: 4;\n  background: #f0f2f5 !important;\n  border: none !important;\n  border-top: 1px solid rgba(0, 0, 0, 0.1) !important;\n}\n.plan-table table th:first-child,\n.plan-table table th:last-child {\n  position: -webkit-sticky;\n  position: sticky;\n  z-index: 2;\n  vertical-align: center !important;\n  text-align: center;\n}\n.plan-table table th:first-child:first-child,\n.plan-table table th:last-child:first-child {\n  left: 0;\n  width: 1px;\n  border-right: 1px solid #e8edf1;\n}\n.plan-table table th:first-child:last-child,\n.plan-table table th:last-child:last-child {\n  right: 0;\n  width: 1px;\n  border-left: 1px solid #e8edf1;\n}\n.plan-table table thead th:first-child,\n.plan-table table thead th:last-child,\n.plan-table table tfoot th:first-child,\n.plan-table table tfoot th:last-child {\n  z-index: 5;\n}\n.plan-table table tr.sortable-ghost {\n  opacity: 0.3;\n}\n.plan-table table tr.sortable-ghost th,\n.plan-table table tr.sortable-ghost td {\n  border-color: greyscale(#89a3b7, 1%) !important;\n  background: greyscale(#89a3b7, 1%) !important;\n}\n.plan-table table td .fluro-editor-textarea {\n  min-height: 0;\n}\n.plan-table table td .fluro-editor-textarea > div {\n  border-radius: 0 !important;\n  padding: 4px 8px !important;\n  border: none !important;\n}\n\n/*# sourceMappingURL=plan.vue.map */"]}, media: undefined });

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

export default __vue_component__$1;
//# sourceMappingURL=plan-47bb3351.js.map
