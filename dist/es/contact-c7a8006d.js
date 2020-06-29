
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { bn as _, bl as __vue_normalize__, bm as __vue_create_injector__, b6 as ListGroup, b7 as ListGroupItem, bo as Vue, aC as FluroSelector, aE as FluroContentSelectModal, aN as FluroContentFormField, aF as FluroContentSelectButton, r as FluroConfirmButton, bf as FluroContactCommunicateMixin, Y as ContactTimeline, a0 as ContactMessageList, a1 as ContactTransactionList, a2 as ContactInteractionList, a3 as ContactCheckinList, Z as ContactPostThread, bp as ContactGroupManager, g as FluroAvatarUpdate, aG as FluroRealmSelect, aQ as FluroAcademicSelect } from './index-cc7f7a8f.js';
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
import { F as FluroContentEditMixin } from './FluroContentEditMixin-64b99757.js';

//
var script = {
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  computed: {
    taskSummary() {
      if (this.formsPending) {
        return `Awaiting ${this.formsPending} form response${this.formsPending == 1 ? '' : 's'}`;
      }

      if (this.tasksIncomplete) {
        return `${this.tasksIncomplete} task${this.tasksIncomplete == 1 ? '' : 's'}`;
      }
    },

    tasksIncomplete() {
      return parseInt(this.card.taskCount.incomplete);
    },

    formsPending() {
      return parseInt(this.card.taskCount.formsRequested) - parseInt(this.card.taskCount.formsCompleted);
    },

    processStatus() {
      return this.card.processStatus;
    },

    dueDate() {
      return this.card.dueDate;
    },

    dueText() {
      var self = this;

      if (!self.dueDate) {
        return;
      }

      switch (this.processStatus) {
        case 'complete':
          return `Will progress ${self.$fluro.date.timeago(self.card.dueDate)}`;

        default:
          return `Due ${self.$fluro.date.timeago(self.card.dueDate)}`;
      }
    },

    renderStates() {
      var self = this;
      return _.chain(self.states).filter(function (state) {
        return state.style != 'waiting';
      }).map(function (state) {
        state.iconLibrary = 'fas';
        var isActiveState = state.key == self.state;

        if (isActiveState) {
          state.iconLibrary = 'far';
          state.icon = 'dot-circle';
          return state;
        }

        switch (state.result) {
          case 'failed':
            state.icon = 'exclamation-circle';
            break;

          case 'complete':
            state.icon = 'check-circle';
            break;

          default:
            state.icon = 'circle';
            state.iconLibrary = 'far';
            break;
        }

        return state; // var match = self.stateLookup[state.key];
        // return 
      }).value();
    },

    currentStep() {
      return _.findIndex(this.states, {
        key: this.state
      }); // var currentIndex = _.findIndex(this.states, { key: this.state });
      // var currentRenderIndex = _.findIndex(this.renderStates, { key: this.state });
      //    if(currentRenderIndex == -1) {
      //    	return _.finst
      //    }
      //    return currentRenderIndex;
    },

    totalSteps() {
      return this.states.length;
    },

    percent() {
      // console.log('Get percentage', currentStep, total)
      return Math.ceil(this.currentStep / this.totalSteps * 100) + '%';
    },

    currentIndex() {
      return _.findIndex(this.states, {
        key: this.state
      });
    },

    state() {
      return this.card.state;
    },

    states() {
      return this.card.states;
    },

    mode() {
      return this.card.mode;
    },

    stateLookup() {
      return _.reduce(this.card.states, function (set, state) {
        set[state.key] = state;
        return set;
      }, {});
    },

    currentState() {
      var self = this;

      var matchingState = _.find(self.states, {
        key: self.state
      });

      if (!matchingState) {
        return {
          title: 'Stuck / Limbo',
          key: '_limbo'
        };
      }

      return matchingState;
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
    { staticClass: "process-state-card", class: _vm.card.processStatus },
    [
      _c(
        "fluro-card",
        [
          _c("div", { staticClass: "color-block" }),
          _vm._v(" "),
          _c("fluro-card-body", [
            _vm.card.dueDate
              ? _c(
                  "div",
                  { staticClass: "due-date" },
                  [
                    _c("fluro-icon", { attrs: { icon: "clock" } }),
                    _vm._v(" " + _vm._s(_vm.dueText))
                  ],
                  1
                )
              : _vm._e(),
            _vm._v(" "),
            _c("h5", [_vm._v(_vm._s(_vm.card.title))]),
            _vm._v(" "),
            _c(
              "div",
              [
                _c("strong", [_vm._v(_vm._s(_vm.currentState.title))]),
                _vm._v(" "),
                _vm.mode == "linear"
                  ? [_vm._v(" - " + _vm._s(_vm.percent))]
                  : _vm._e()
              ],
              2
            ),
            _vm._v(" "),
            _c("div", [_vm._v(_vm._s(_vm.taskSummary))]),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "process-dots" },
              _vm._l(_vm.renderStates, function(state) {
                return _c(
                  "span",
                  {
                    directives: [{ name: "tippy", rawName: "v-tippy" }],
                    staticClass: "process-dot",
                    class: state.result,
                    attrs: { content: state.title }
                  },
                  [
                    _c("fluro-icon", {
                      attrs: { library: state.iconLibrary, icon: state.icon }
                    })
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
    ],
    1
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-4f493e60_0", { source: "/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.process-state-card .fluro-card {\n  position: relative;\n  overflow: hidden;\n  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);\n}\n.process-state-card .due-date {\n  font-style: italic;\n  float: right;\n}\n.process-state-card .color-block {\n  width: 3px;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  position: absolute;\n}\n.process-state-card .fluro-card-body {\n  padding: 10px;\n}\n.process-state-card.archived .fluro-card {\n  opacity: 0.5;\n  background: none;\n}\n.process-state-card.complete .fluro-card {\n  color: #36a93a;\n  background: #e7f7e7;\n  border-color: rgba(76, 198, 80, 0.1);\n}\n.process-state-card.complete .fluro-card .color-block {\n  background: linear-gradient(#89e10c, #16d3ad) !important;\n}\n.process-state-card.pending .fluro-card {\n  color: #ec7b1f;\n  background: #fceadb;\n  border-color: rgba(240, 151, 78, 0.1);\n}\n.process-state-card.pending .fluro-card .color-block {\n  background: linear-gradient(#f0974e, #f0974e) !important;\n}\n.process-state-card.failed .fluro-card, .process-state-card.overdue .fluro-card {\n  color: #be264a;\n  background: #fbedf0;\n  border-color: rgba(217, 62, 99, 0.1);\n}\n.process-state-card.failed .fluro-card:before, .process-state-card.overdue .fluro-card:before {\n  display: block;\n  background: linear-gradient(#ff4d83, #ff003c);\n  animation-name: pulse_opacity;\n  animation-duration: 3s;\n  animation-iteration-count: infinite;\n  animation-timing-function: linear;\n}\n.process-state-card.failed .fluro-card .color-block, .process-state-card.overdue .fluro-card .color-block {\n  background: linear-gradient(#ff4d83, #ff003c) !important;\n}\n.process-dots {\n  display: block;\n  white-space: nowrap;\n}\n.process-dots.process-dots-flex {\n  display: flex;\n}\n.process-dots .process-dot {\n  color: rgba(0, 0, 0, 0.3);\n}\n.process-dots .process-dot.failed {\n  color: #d93e63;\n}\n.process-dots .process-dot.pending {\n  color: #f0974e;\n}\n.process-dots .process-dot.complete {\n  color: #4cc650;\n}\n\n/*# sourceMappingURL=ContactProcessState.vue.map */", map: {"version":3,"sources":["C:\\Users\\User\\Documents\\fluro\\fluro-vue-ui\\src\\components\\content\\edit\\components\\ContactProcessState.vue","ContactProcessState.vue"],"names":[],"mappings":"AA0MA,GAAA;AAYA;EACA,yCAAA;ACpNA;ADuNA;EACA,2CAAA;ACpNA;ADuNA;EACA,4CAAA;ACpNA;ADuNA;EACA,0CAAA;ACpNA;;AD4NA,GAAA;AAUA;EACA,kBAAA;EACA,gBAAA;EACA,wCAAA;AClOA;ADwOA;EACA,kBAAA;EACA,YAAA;ACtOA;ADyOA;EACA,UAAA;EACA,MAAA;EACA,OAAA;EACA,SAAA;EACA,kBAAA;ACvOA;AD0OA;EACA,aAAA;ACxOA;AD6OA;EACA,YAAA;EACA,gBAAA;AC3OA;ADgPA;EACA,cAAA;EACA,mBAAA;EACA,oCAAA;AC9OA;ADgPA;EACA,wDAAA;AC9OA;ADsPA;EACA,cAAA;EACA,mBAAA;EACA,qCAAA;ACpPA;ADsPA;EACA,wDAAA;ACpPA;AD2PA;EACA,cAAA;EACA,mBAAA;EACA,oCAAA;ACzPA;AD4PA;EACA,cAAA;EACA,6CAAA;EACA,6BAAA;EACA,sBAAA;EACA,mCAAA;EACA,iCAAA;AC1PA;AD+PA;EACA,wDAAA;AC7PA;ADmQA;EACA,cAAA;EACA,mBAAA;AChQA;ADkQA;EACA,aAAA;AChQA;ADmQA;EAQA,yBAAA;ACxQA;AD0QA;EACA,cA/IA;ACzHA;AD2QA;EACA,cApJA;ACrHA;AD4QA;EACA,cAzJA;ACjHA;;AAEA,kDAAkD","file":"ContactProcessState.vue","sourcesContent":["<template>\n    <!-- <div class=\"process-card\" @click.stop.prevent=\"clicked\" :class=\"statusClass\">\n        <fluro-card>\n            <div class=\"color-block\" :style=\"{backgroundColor:firstColor}\" />\n            <fluro-card-body>\n                <v-layout>\n                    <v-flex shrink>\n                        <div class=\"process-icon\" @click.stop.prevent=\"toggle\">\n                            <fluro-icon icon=\"spinner-third\" spin v-if=\"card.processing\" />\n                            <template v-else>\n                                <fluro-avatar md :id=\"contactID\" v-if=\"contactID\" type=\"contact\"></fluro-avatar>    \n                                <fluro-avatar md :id=\"personaID\" v-if=\"personaID\" type=\"persona\"></fluro-avatar>    \n                            </template>\n                        </div>\n                    </v-flex>\n                    <v-flex>\n                        <h5 class=\"text-capitalize\">{{title}}</h5>\n                        <div class=\"sm muted\" v-if=\"definitionTitle\">{{definitionTitle}}</div>\n                        <div class=\"sm\">{{taskSummary}}</div>\n                        <em class=\"sm\">{{message}}</em>\n                        </v-flex>\n                    <v-flex shrink class=\"hover\">\n                        <v-btn class=\"ma-0\" @click.stop.prevent=\"showActions\" icon small>\n                            <fluro-icon icon=\"ellipsis-h\" />\n                        </v-btn>\n                    </v-flex>\n                </v-layout>\n                <face-stack right :contacts=\"card.assignedTo\"></face-stack>\n            </fluro-card-body>\n        </fluro-card>\n    </div>\n -->\n    <div class=\"process-state-card\" :class=\"card.processStatus\">\n        <fluro-card>\n            <div class=\"color-block\" />\n            <fluro-card-body>\n                <div class=\"due-date\" v-if=\"card.dueDate\">\n                    <fluro-icon icon=\"clock\" /> {{dueText}}</div>\n                <h5>{{card.title}}</h5>\n                <div><strong>{{currentState.title}}</strong> <template v-if=\"mode == 'linear'\"> - {{percent}}</template></div>\n                <div>{{taskSummary}}</div>\n                <div class=\"process-dots\">\n                    <span class=\"process-dot\" v-tippy :content=\"state.title\" :class=\"state.result\" v-for=\"state in renderStates\">\n                        <fluro-icon :library=\"state.iconLibrary\" :icon=\"state.icon\" />\n                        <!-- {{state.result}} -->\n                    </span>\n                </div>\n\n                <!-- <pre>{{card}}</pre> -->\n            </fluro-card-body>\n        </fluro-card>\n    </div>\n</template>\n<script>\n\nimport _ from 'lodash';\n\nexport default {\n\n    props: {\n        card: {\n            type: Object,\n            required: true,\n        }\n    },\n    computed: {\n    \ttaskSummary() {\n            if (this.formsPending) {\n                return `Awaiting ${this.formsPending} form response${this.formsPending == 1 ? '' : 's'}`\n            }\n\n            if (this.tasksIncomplete) {\n                return `${this.tasksIncomplete} task${this.tasksIncomplete == 1 ? '' : 's'}`\n            }\n\n        },\n        tasksIncomplete() {\n            return parseInt(this.card.taskCount.incomplete);\n        },\n        formsPending() {\n            return parseInt(this.card.taskCount.formsRequested) - parseInt(this.card.taskCount.formsCompleted);\n        },\n        processStatus() {\n            return this.card.processStatus;\n        },\n        dueDate() {\n            return this.card.dueDate;\n        },\n        dueText() {\n\n            var self = this;\n\n            if (!self.dueDate) {\n                return;\n            }\n\n            switch (this.processStatus) {\n                case 'complete':\n                    return `Will progress ${self.$fluro.date.timeago(self.card.dueDate)}`;\n                    break;\n\n                default:\n                    return `Due ${self.$fluro.date.timeago(self.card.dueDate)}`;\n                    break;\n            }\n\n        },\n        renderStates() {\n            var self = this;\n            return _.chain(self.states)\n                .filter(function(state) {\n                    return state.style != 'waiting';\n                })\n                .map(function(state) {\n\n                    state.iconLibrary = 'fas';\n                    var isActiveState = (state.key == self.state);\n                    if (isActiveState) {\n                        state.iconLibrary = 'far';\n                        state.icon = 'dot-circle';\n                        return state;\n                    }\n\n                    switch (state.result) {\n                        case 'failed':\n                            state.icon = 'exclamation-circle';\n                            break;\n                        case 'complete':\n                            state.icon = 'check-circle';\n                            break;\n                        default:\n                            state.icon = 'circle';\n                            state.iconLibrary = 'far';\n                            break;\n                    }\n\n                    return state;\n                    // var match = self.stateLookup[state.key];\n                    // return \n                })\n                .value();\n        },\n        currentStep() {\n        \treturn _.findIndex(this.states, { key: this.state });\n        \t// var currentIndex = _.findIndex(this.states, { key: this.state });\n        \t// var currentRenderIndex = _.findIndex(this.renderStates, { key: this.state });\n\n         //    if(currentRenderIndex == -1) {\n         //    \treturn _.finst\n         //    }\n\n         //    return currentRenderIndex;\n        },\n        totalSteps() {\n            return this.states.length;\n        },\n        percent() {\n\n\n\n            // console.log('Get percentage', currentStep, total)\n            return Math.ceil((this.currentStep / this.totalSteps) * 100) + '%';\n        },\n        currentIndex() {\n            return _.findIndex(this.states, { key: this.state });\n        },\n        state() {\n            return this.card.state;\n        },\n        states() {\n            return this.card.states;\n        },\n        mode() {\n            return this.card.mode;\n        },\n        stateLookup() {\n            return _.reduce(this.card.states, function(set, state) {\n\n                set[state.key] = state;\n\n                return set;\n            }, {});\n        },\n        currentState() {\n\n            var self = this;\n            var matchingState = _.find(self.states, { key: self.state })\n\n            if (!matchingState) {\n                return {\n                    title: 'Stuck / Limbo',\n                    key: '_limbo',\n                }\n            }\n\n            return matchingState;\n        }\n    }\n}\n</script>\n<style lang=\"scss\">\n\n/**/\r\n\r\n$primary: #2ad4b9;//#0bd6be;\r\n$success: #4cc650; //#4cc673;//\r\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\r\n$danger: #d93e63;\r\n$secondary: #0bd6cd; //#0bd6a3;\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n\r\n.border-top {\r\n    border-top: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-right {\r\n    border-right: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-bottom {\r\n    border-bottom: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-left {\r\n    border-left: 1px solid rgba(#000, 0.05);\r\n}\r\n//////////////////////////////////////////\r\n\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n/**/\n.process-state-card {\n    // padding: 10px;\n    // border-radius: 4px;\n    // background: #fff;\n    // border: 1px solid rgba(#000, 0.1);\n    // margin-bottom: 5px;\n\n    // @extend .no-select;\n\n    .fluro-card {\n        position: relative;\n        overflow: hidden;\n        box-shadow: 0 2px 3px rgba(#000, 0.1);\n        // padding-left: 50px;\n        // max-width: 280px;\n    }\n\n\n    .due-date {\n        font-style: italic;\n        float: right;\n    }\n\n    .color-block {\n        width: 3px;\n        top: 0;\n        left: 0;\n        bottom: 0;\n        position: absolute;\n    }\n\n    .fluro-card-body {\n        padding: 10px;\n    }\n\n\n    &.archived {\n        .fluro-card {\n            opacity: 0.5;\n            background: none;\n        }\n    }\n\n    &.complete {\n        .fluro-card {\n            color: darken($success, 10%);\n            background: lighten($success, 40%);\n            border-color: rgba($success, 0.1);\n\n            .color-block {\n                background: linear-gradient(#89e10c, #16d3ad) !important;\n            }\n        }\n    }\n\n\n\n    &.pending {\n        .fluro-card {\n            color: darken($warning, 10%);\n            background: lighten($warning, 30%);\n            border-color: rgba($warning, 0.1);\n\n            .color-block {\n                background: linear-gradient($warning, $warning) !important;\n            }\n        }\n    }\n\n    &.failed,\n    &.overdue {\n        .fluro-card {\n            color: darken($danger, 10%);\n            background: lighten($danger, 41%);\n            border-color: rgba($danger, 0.1);\n\n\n            &:before {\n                display: block;\n                background: linear-gradient(#ff4d83, #ff003c);\n                animation-name: pulse_opacity;\n                animation-duration: 3s;\n                animation-iteration-count: infinite;\n                animation-timing-function: linear;\n            }\n\n\n\n            .color-block {\n                background: linear-gradient(#ff4d83, #ff003c) !important;\n            }\n        }\n    }\n}\n\n.process-dots {\n    display: block;\n    white-space: nowrap;\n\n    &.process-dots-flex {\n        display: flex;\n    }\n\n    .process-dot {\n        // border-radius: 100px;\n        // display: inline-block;\n        // background: rgba(#000, 0.1);\n        // color: #fff;\n        // padding:5px;\n        // flex:1;\n        // margin-right:1px;\n        color: rgba(#000, 0.3);\n\n        &.failed {\n            color: $danger;\n        }\n\n        &.pending {\n            color: $warning;\n        }\n\n        &.complete {\n            color: $success;\n        }\n    }\n}\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.process-state-card .fluro-card {\n  position: relative;\n  overflow: hidden;\n  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);\n}\n.process-state-card .due-date {\n  font-style: italic;\n  float: right;\n}\n.process-state-card .color-block {\n  width: 3px;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  position: absolute;\n}\n.process-state-card .fluro-card-body {\n  padding: 10px;\n}\n.process-state-card.archived .fluro-card {\n  opacity: 0.5;\n  background: none;\n}\n.process-state-card.complete .fluro-card {\n  color: #36a93a;\n  background: #e7f7e7;\n  border-color: rgba(76, 198, 80, 0.1);\n}\n.process-state-card.complete .fluro-card .color-block {\n  background: linear-gradient(#89e10c, #16d3ad) !important;\n}\n.process-state-card.pending .fluro-card {\n  color: #ec7b1f;\n  background: #fceadb;\n  border-color: rgba(240, 151, 78, 0.1);\n}\n.process-state-card.pending .fluro-card .color-block {\n  background: linear-gradient(#f0974e, #f0974e) !important;\n}\n.process-state-card.failed .fluro-card, .process-state-card.overdue .fluro-card {\n  color: #be264a;\n  background: #fbedf0;\n  border-color: rgba(217, 62, 99, 0.1);\n}\n.process-state-card.failed .fluro-card:before, .process-state-card.overdue .fluro-card:before {\n  display: block;\n  background: linear-gradient(#ff4d83, #ff003c);\n  animation-name: pulse_opacity;\n  animation-duration: 3s;\n  animation-iteration-count: infinite;\n  animation-timing-function: linear;\n}\n.process-state-card.failed .fluro-card .color-block, .process-state-card.overdue .fluro-card .color-block {\n  background: linear-gradient(#ff4d83, #ff003c) !important;\n}\n\n.process-dots {\n  display: block;\n  white-space: nowrap;\n}\n.process-dots.process-dots-flex {\n  display: flex;\n}\n.process-dots .process-dot {\n  color: rgba(0, 0, 0, 0.3);\n}\n.process-dots .process-dot.failed {\n  color: #d93e63;\n}\n.process-dots .process-dot.pending {\n  color: #f0974e;\n}\n.process-dots .process-dot.complete {\n  color: #4cc650;\n}\n\n/*# sourceMappingURL=ContactProcessState.vue.map */"]}, media: undefined });

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
////////////////////////////////////////////////////////////

var script$1 = {
  props: {
    'value': {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      actionIndexes: {},
      model: this.value,
      loading: true,
      cards: []
    };
  },

  created() {
    this.reloadCards();
  },

  methods: {
    clicked(card) {
      var self = this;
      return self.$fluro.global.edit(card, true).then(function (result) {
        console.log('Result!', result);
        self.reloadCards();
      }).catch(function (err) {
        console.log('Cancelled!', err);
      });
    },

    // leave(team) {
    //     var self = this;
    //     //Get the ids from the teams
    //     var teamID = self.$fluro.utils.getStringID(team);
    //     self.loading = true;
    //     //////////////////////////////////
    //     var promise = self.$batch.run({
    //             operation: 'remove from team',
    //             ids: [self.contactID],
    //             teams: [teamID],
    //         })
    //         .then(function(res) {
    //             var index = _.findIndex(self.teams, { _id: teamID });
    //             self.teams.splice(index, 1);
    //             self.loading = false;
    //         })
    //         .catch(function(err) {
    //             console.log('TEAMS ERR', err);
    //             self.reloadTeams();
    //         });
    // },
    // select(type) {
    // var self = this;
    // //Ugly hack, but it's gotta be done unfortunately
    // var SelectionManager = Vue.extend(FluroSelector);
    // var instance = new SelectionManager({
    //     propsData: {
    //         minimum: 0,
    //         maximum: 0,
    //     }
    // })
    // // var isBasicType = self.$fluro.types.isBasicType(type);
    // var promise = self.$fluro.modal({
    //         component: FluroContentSelectModal,
    //         options: {
    //             allDefinitions: false, //isBasicType,
    //             selector: instance, //Vue(FluroSelector),
    //             type,
    //             minimum: 0,
    //             maximum: 0,
    //         }
    //     })
    //     .then(function(items) {
    //         if (!items || !items.length) {
    //             return;
    //         }
    //         self.loading = true;
    //         //Get the ids from the teams
    //         var teamIDs = self.$fluro.utils.arrayIDs(items);
    //         //////////////////////////////////
    //         var promise = self.$batch.run({
    //                 operation: 'add to team',
    //                 ids: [self.contactID],
    //                 teams: teamIDs,
    //             })
    //             .then(function(res) {
    //                 console.log('CARDS ADDED', res);
    //                 // self.teams = self.teams.concat(items);
    //                 // self.loading = false;
    //                 self.reloadCards();
    //             })
    //             .catch(function(err) {
    //                 console.log('CARDS ERR', err);
    //                 self.reloadCards();
    //             });
    //     })
    // },
    reloadCards() {
      var self = this;
      self.loading = true;
      return self.$fluro.api.get(`/process/states/${self.contactID}`).then(function (res) {
        self.cards = res.data;
        self.loading = false;
      }).catch(function (err) {
        self.cards = err;
        self.loading = false;
      });
    }

  },
  components: {
    ListGroup,
    ListGroupItem,
    ContactProcessState: __vue_component__
  },
  computed: {
    sorted() {
      return _.orderBy(this.cards, this.$fluro.utils.processCardPrioritySort);
    },

    contactID() {
      return this.$fluro.utils.getStringID(this.model);
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
    [
      _vm.loading
        ? _c("fluro-page-preloader", { attrs: { contain: "" } })
        : [
            _vm.sorted.length
              ? _vm._l(_vm.sorted, function(card) {
                  return _c("contact-process-state", {
                    key: card._id,
                    attrs: { card: card },
                    nativeOn: {
                      click: function($event) {
                        return _vm.clicked(card)
                      }
                    }
                  })
                })
              : [_c("em", [_vm._v("No process information is available")])]
          ]
    ],
    2
  )
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = function (inject) {
    if (!inject) return
    inject("data-v-e3df83f6_0", { source: "/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n\n/*# sourceMappingURL=ContactProcessManager.vue.map */", map: {"version":3,"sources":["C:\\Users\\User\\Documents\\fluro\\fluro-vue-ui\\src\\components\\content\\edit\\components\\ContactProcessManager.vue","ContactProcessManager.vue"],"names":[],"mappings":"AA6MA,GAAA;AAYA;EACA,yCAAA;ACvNA;AD0NA;EACA,2CAAA;ACvNA;AD0NA;EACA,4CAAA;ACvNA;AD0NA;EACA,0CAAA;ACvNA;;AD+NA,GAAA;;AC3NA,oDAAoD","file":"ContactProcessManager.vue","sourcesContent":["<template>\n    <div>\n        <fluro-page-preloader v-if=\"loading\" contain />\n        <template v-else>\n            <template v-if=\"sorted.length\">\n                <contact-process-state @click.native=\"clicked(card)\" :card=\"card\" :key=\"card._id\" v-for=\"card in sorted\" />\n            </template>\n            <template v-else>\n                <em>No process information is available</em>\n            </template>\n            <!-- <pre>{{cards}}</pre> -->\n            <!-- <v-input class=\"no-flex\" v-for=\"group in teamGroups\">\n                <v-label>{{group.title}}</v-label>\n                <list-group>\n                    <template v-for=\"team in group.teams\">\n                        <list-group-item :item=\"team\" :firstLine=\"team.positions | comma\">\n                            <template v-slot:right>\n                                <v-menu :left=\"true\" v-model=\"actionIndexes[team._id]\" :fixed=\"true\" transition=\"slide-y-transition\" offset-y>\n                                    <template v-slot:activator=\"{ on }\">\n                                        <v-btn class=\"ma-0\" icon small flat v-on=\"on\">\n                                            <fluro-icon v-if=\"actionIndexes[team._id]\" icon=\"times\" />\n                                            <fluro-icon v-else icon=\"ellipsis-h\" />\n                                        </v-btn>\n                                    </template>\n                                    <v-list dense>\n                                        <v-list-tile @click=\"$actions.open([team])\">\n                                            <v-list-tile-content>Actions</v-list-tile-content>\n                                        </v-list-tile>\n                                        <v-list-tile @click=\"leave(team)\">\n                                            <v-list-tile-content>Remove {{model.firstName}} from group</v-list-tile-content>\n                                        </v-list-tile>\n                                    </v-list>\n                                </v-menu>\n                            </template>\n                        </list-group-item>\n                    </template>\n                </list-group>\n                <v-btn small color=\"primary\" @click=\"select(group.key)\" class=\"ml-0\">\n                    Add {{group.title}}\n                    <fluro-icon right icon=\"plus\" />\n                </v-btn>\n            </v-input> -->\n        </template>\n    </div>\n</template>\n<script>\nimport ListGroup from 'src/components/ui/ListGroup.vue';\nimport ListGroupItem from 'src/components/ui/ListGroupItem.vue';\nimport ContactProcessState from 'src/components/content/edit/components/ContactProcessState.vue';\n\nimport Vue from 'vue';\n\nimport _ from 'lodash';\n\n////////////////////////////////////////////////////////////\n////////////////////////////////////////////////////////////\n\nexport default {\n    props: {\n        'value': {\n            type: Object,\n            required: true,\n        }\n    },\n    data() {\n        return {\n            actionIndexes: {},\n            model: this.value,\n            loading: true,\n            cards: [],\n        }\n    },\n    created() {\n        this.reloadCards();\n    },\n    methods: {\n        clicked(card) {\n            var self = this;\n\n            return self.$fluro.global.edit(card, true)\n                .then(function(result) {\n                    console.log('Result!', result);\n                    self.reloadCards();\n                })\n                .catch(function(err) {\n                    console.log('Cancelled!', err);\n                });\n\n        },\n        // leave(team) {\n        //     var self = this;\n\n        //     //Get the ids from the teams\n        //     var teamID = self.$fluro.utils.getStringID(team);\n        //     self.loading = true;\n\n        //     //////////////////////////////////\n\n        //     var promise = self.$batch.run({\n        //             operation: 'remove from team',\n        //             ids: [self.contactID],\n        //             teams: [teamID],\n        //         })\n        //         .then(function(res) {\n        //             var index = _.findIndex(self.teams, { _id: teamID });\n        //             self.teams.splice(index, 1);\n        //             self.loading = false;\n        //         })\n        //         .catch(function(err) {\n        //             console.log('TEAMS ERR', err);\n        //             self.reloadTeams();\n        //         });\n        // },\n        // select(type) {\n\n        // var self = this;\n\n        // //Ugly hack, but it's gotta be done unfortunately\n        // var SelectionManager = Vue.extend(FluroSelector);\n        // var instance = new SelectionManager({\n        //     propsData: {\n        //         minimum: 0,\n        //         maximum: 0,\n        //     }\n        // })\n\n        // // var isBasicType = self.$fluro.types.isBasicType(type);\n\n        // var promise = self.$fluro.modal({\n        //         component: FluroContentSelectModal,\n        //         options: {\n        //             allDefinitions: false, //isBasicType,\n        //             selector: instance, //Vue(FluroSelector),\n        //             type,\n        //             minimum: 0,\n        //             maximum: 0,\n        //         }\n        //     })\n        //     .then(function(items) {\n\n        //         if (!items || !items.length) {\n        //             return;\n        //         }\n\n        //         self.loading = true;\n\n        //         //Get the ids from the teams\n        //         var teamIDs = self.$fluro.utils.arrayIDs(items);\n\n        //         //////////////////////////////////\n\n        //         var promise = self.$batch.run({\n        //                 operation: 'add to team',\n        //                 ids: [self.contactID],\n        //                 teams: teamIDs,\n        //             })\n        //             .then(function(res) {\n\n        //                 console.log('CARDS ADDED', res);\n        //                 // self.teams = self.teams.concat(items);\n        //                 // self.loading = false;\n        //                 self.reloadCards();\n        //             })\n        //             .catch(function(err) {\n        //                 console.log('CARDS ERR', err);\n        //                 self.reloadCards();\n        //             });\n\n\n\n\n        //     })\n        // },\n        reloadCards() {\n            var self = this;\n            self.loading = true;\n\n            return self.$fluro.api.get(`/process/states/${self.contactID}`)\n                .then(function(res) {\n                    self.cards = res.data;\n                    self.loading = false;\n                })\n                .catch(function(err) {\n                    self.cards = err;\n                    self.loading = false;\n                })\n        },\n    },\n    components: {\n        ListGroup,\n        ListGroupItem,\n        ContactProcessState,\n    },\n    computed: {\n        sorted() {\n            return _.orderBy(this.cards, this.$fluro.utils.processCardPrioritySort)\n        },\n        contactID() {\n            return this.$fluro.utils.getStringID(this.model);\n        },\n    },\n}\n</script>\n<style lang=\"scss\">\n\n/**/\r\n\r\n$primary: #2ad4b9;//#0bd6be;\r\n$success: #4cc650; //#4cc673;//\r\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\r\n$danger: #d93e63;\r\n$secondary: #0bd6cd; //#0bd6a3;\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n\r\n.border-top {\r\n    border-top: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-right {\r\n    border-right: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-bottom {\r\n    border-bottom: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-left {\r\n    border-left: 1px solid rgba(#000, 0.05);\r\n}\r\n//////////////////////////////////////////\r\n\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n/**/\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n\n/*# sourceMappingURL=ContactProcessManager.vue.map */"]}, media: undefined });

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
    'value': {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      loading: true,
      actionIndexes: {},
      model: this.value
    };
  },

  created() {},

  methods: {
    remove(item) {
      var index = this.model.indexOf(item);
      this.model.splice(index, 1);
    },

    addItem(item) {
      var match = _.some(this.model, {
        _id: item._id
      });

      if (match) {
        return;
      }

      this.model.push(item);
    },

    select(type) {
      var self = this; //Ugly hack, but it's gotta be done unfortunately

      var SelectionManager = Vue.extend(FluroSelector);
      var instance = new SelectionManager({
        propsData: {
          minimum: 0,
          maximum: 0
        }
      }); // var isBasicType = self.$fluro.types.isBasicType(type);

      var promise = self.$fluro.modal({
        component: FluroContentSelectModal,
        options: {
          allDefinitions: false,
          //isBasicType,
          selector: instance,
          //Vue(FluroSelector),
          type,
          minimum: 0,
          maximum: 0
        }
      }).then(function (items) {
        if (!items || !items.length) {
          return;
        }

        console.log('Items');

        _.each(items, function (item) {
          self.addItem(item);
        }); // self.loading = true;
        // //Get the ids from the capabilities
        // var capabilityIDs = self.$fluro.utils.arrayIDs(items);
        // //////////////////////////////////
        // var promise = self.$batch.run({
        //         operation: 'add to capability',
        //         ids: [self.contactID],
        //         capabilities: capabilityIDs,
        //     })
        //     .then(function(res) {
        //         console.log('TEAMS ADDED', res);
        //         // self.capabilities = self.capabilities.concat(items);
        //         // self.loading = false;
        //         self.reloadCapabilities();
        //     })
        //     .catch(function(err) {
        //         console.log('TEAMS ERR', err);
        //         self.reloadCapabilities();
        //     });

      });
    }

  },
  components: {
    ListGroup,
    ListGroupItem,
    // FluroContentSelectButton,
    FluroContentSelectModal
  },
  computed: {
    capabilityGroups() {
      var self = this; ////////////////////////////////////////////////////

      var allSets = _.reduce(self.capabilityDefinitions, function (set, definition) {
        set[definition.definitionName] = {
          title: definition.plural,
          capabilities: [],
          key: definition.definitionName
        };
        return set;
      }, {
        capability: {
          title: 'Capabilities',
          capabilities: [],
          key: 'capability'
        }
      }); ////////////////////////////////////////////////////


      return _.chain(self.model).reduce(function (set, capability) {
        var capabilityType = capability.definition || 'capability';
        var existingGroup = set[capabilityType];

        if (!existingGroup) {
          existingGroup = set[capabilityType] = {
            title: self.$fluro.types.readable(capabilityType, true),
            capabilities: []
          };
        }

        existingGroup.capabilities.push(capability);
        return set;
      }, allSets).values().value();
    }

  },
  asyncComputed: {
    capabilityDefinitions: {
      default: [],

      get() {
        var self = this;
        self.loading = true;
        return new Promise(function (resolve, reject) {
          self.$fluro.types.subTypes('capability').then(function (res) {
            resolve(res);
            self.loading = false;
          }).catch(function (err) {
            reject(err);
            self.loading = false;
          });
        });
      }

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
      _vm.loading
        ? _c("fluro-page-preloader", { attrs: { contain: "" } })
        : _vm._l(_vm.capabilityGroups, function(group) {
            return _c(
              "v-input",
              { staticClass: "no-flex" },
              [
                _c("v-label", [_vm._v(_vm._s(group.title))]),
                _vm._v(" "),
                _c(
                  "list-group",
                  [
                    _vm._l(group.capabilities, function(capability) {
                      return [
                        _c("list-group-item", {
                          attrs: { item: capability },
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
                                        attrs: { small: "", icon: "" },
                                        on: {
                                          click: function($event) {
                                            $event.stopPropagation();
                                            $event.preventDefault();
                                            return _vm.remove(capability)
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
                      ]
                    })
                  ],
                  2
                ),
                _vm._v(" "),
                _c(
                  "v-btn",
                  {
                    staticClass: "ml-0",
                    attrs: { small: "", color: "primary" },
                    on: {
                      click: function($event) {
                        return _vm.select(group.key)
                      }
                    }
                  },
                  [
                    _vm._v(
                      "\n                Add " +
                        _vm._s(group.title) +
                        "\n                "
                    ),
                    _c("fluro-icon", { attrs: { right: "", icon: "plus" } })
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
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  const __vue_inject_styles__$2 = function (inject) {
    if (!inject) return
    inject("data-v-0cbd018a_0", { source: "/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n\n/*# sourceMappingURL=ContactCapabilityManager.vue.map */", map: {"version":3,"sources":["C:\\Users\\User\\Documents\\fluro\\fluro-vue-ui\\src\\components\\content\\edit\\components\\ContactCapabilityManager.vue","ContactCapabilityManager.vue"],"names":[],"mappings":"AA8OA,GAAA;AAYA;EACA,yCAAA;ACxPA;AD2PA;EACA,2CAAA;ACxPA;AD2PA;EACA,4CAAA;ACxPA;AD2PA;EACA,0CAAA;ACxPA;;ADgQA,GAAA;;AC5PA,uDAAuD","file":"ContactCapabilityManager.vue","sourcesContent":["<template>\n    <div>\n        <fluro-page-preloader v-if=\"loading\" contain />\n        <template v-else>\n            <v-input class=\"no-flex\" v-for=\"group in capabilityGroups\">\n                <v-label>{{group.title}}</v-label>\n                <list-group>\n                    <template v-for=\"capability in group.capabilities\">\n                        <list-group-item :item=\"capability\">\n                            <template v-slot:right>\n                                <!-- <v-menu :left=\"true\" v-model=\"actionIndexes[capability._id]\" :fixed=\"true\" transition=\"slide-y-transition\" offset-y>\n                                    <template v-slot:activator=\"{ on }\">\n                                        <v-btn class=\"ma-0\" icon small flat v-on=\"on\">\n                                            <fluro-icon v-if=\"actionIndexes[capability._id]\" icon=\"times\" />\n                                            <fluro-icon v-else icon=\"ellipsis-h\" />\n                                        </v-btn>\n                                    </template> -->\n                                    <!-- <v-list dense>\n                                        <v-list-tile @click=\"$actions.open([capability])\">\n                                            <v-list-tile-content>Actions</v-list-tile-content>\n                                        </v-list-tile>\n                                        <v-list-tile @click=\"leave(capability)\">\n                                            <v-list-tile-content>Remove {{model.firstName}} from group</v-list-tile-content>\n                                        </v-list-tile>\n                                    </v-list> -->\n                                <!-- </v-menu> -->\n                                <!-- <v-btn class=\"ma-0\" small icon @click.stop.prevent=\"$actions.open([item])\">\n                                <fluro-icon icon=\"ellipsis-h\" />\n                            </v-btn> -->\n                           \n\n                            <v-btn class=\"ma-0\" small icon @click.stop.prevent=\"remove(capability)\">\n                                <fluro-icon icon=\"times\" />\n                            </v-btn>\n\n                             </template>\n                        </list-group-item>\n                    </template>\n                </list-group>\n                <v-btn small color=\"primary\" @click=\"select(group.key)\" class=\"ml-0\">\n                    Add {{group.title}}\n                    <fluro-icon right icon=\"plus\" />\n                </v-btn>\n                <!-- <pre>{{group.key}}</pre> -->\n                <!-- <fluro-content-select-button color=\"primary\" :type=\"group.key\" v-model=\"\" /> -->\n            </v-input>\n        </template>\n    </div>\n</template>\n<script>\nimport ListGroup from 'src/components/ui/ListGroup.vue';\nimport ListGroupItem from 'src/components/ui/ListGroupItem.vue';\n\nimport FluroContentSelectModal from 'src/components/form/contentselect/FluroContentSelectModal.vue';\nimport FluroSelector from 'src/components/form/contentselect/FluroSelector.vue';\nimport Vue from 'vue';\n\nimport _ from 'lodash';\n\n\n\nexport default {\n    props: {\n        'value': {\n            type: Array,\n            required: true,\n        }\n    },\n    data() {\n        return {\n            loading:true,\n            actionIndexes: {},\n            model: this.value,\n        }\n    },\n    created() {\n    },\n    methods: {\n        remove(item) {\n            var index = this.model.indexOf(item);\n            this.model.splice(index,1);\n        },\n        addItem(item) {\n\n            var match = _.some(this.model, {_id:item._id});\n            if(match) {\n                return;\n            }\n\n            this.model.push(item);\n        },\n        select(type) {\n\n            var self = this;\n\n            //Ugly hack, but it's gotta be done unfortunately\n            var SelectionManager = Vue.extend(FluroSelector);\n            var instance = new SelectionManager({\n                propsData: {\n                    minimum: 0,\n                    maximum: 0,\n                }\n            })\n\n            // var isBasicType = self.$fluro.types.isBasicType(type);\n\n            var promise = self.$fluro.modal({\n                    component: FluroContentSelectModal,\n                    options: {\n                        allDefinitions: false, //isBasicType,\n                        selector: instance, //Vue(FluroSelector),\n                        type,\n                        minimum: 0,\n                        maximum: 0,\n                    }\n                })\n                .then(function(items) {\n\n                    if (!items || !items.length) {\n                        return;\n                    }\n\n\n                    console.log('Items');\n\n                    _.each(items, function(item) {\n                        self.addItem(item);\n                    })\n\n\n                    // self.loading = true;\n\n                    // //Get the ids from the capabilities\n                    // var capabilityIDs = self.$fluro.utils.arrayIDs(items);\n\n                    // //////////////////////////////////\n\n                    // var promise = self.$batch.run({\n                    //         operation: 'add to capability',\n                    //         ids: [self.contactID],\n                    //         capabilities: capabilityIDs,\n                    //     })\n                    //     .then(function(res) {\n\n                    //         console.log('TEAMS ADDED', res);\n                    //         // self.capabilities = self.capabilities.concat(items);\n                    //         // self.loading = false;\n                    //         self.reloadCapabilities();\n                    //     })\n                    //     .catch(function(err) {\n                    //         console.log('TEAMS ERR', err);\n                    //         self.reloadCapabilities();\n                    //     });\n\n\n\n\n                })\n        },\n    },\n    components: {\n        ListGroup,\n        ListGroupItem,\n        // FluroContentSelectButton,\n        FluroContentSelectModal,\n    },\n    computed: {\n        capabilityGroups() {\n\n            var self = this;\n\n            ////////////////////////////////////////////////////\n\n            var allSets = _.reduce(self.capabilityDefinitions, function(set, definition) {\n                set[definition.definitionName] = {\n                    title: definition.plural,\n                    capabilities: [],\n                    key: definition.definitionName,\n                }\n\n                return set;\n            }, {\n                capability: {\n                    title: 'Capabilities',\n                    capabilities: [],\n                    key: 'capability',\n                }\n            })\n\n            ////////////////////////////////////////////////////\n\n            return _.chain(self.model)\n                .reduce(function(set, capability) {\n\n                    var capabilityType = capability.definition || 'capability';\n                    var existingGroup = set[capabilityType];\n                    if (!existingGroup) {\n                        existingGroup = set[capabilityType] = {\n                            title: self.$fluro.types.readable(capabilityType, true),\n                            capabilities: [],\n                        }\n                    }\n\n                    existingGroup.capabilities.push(capability);\n\n                    return set;\n                }, allSets)\n                .values()\n                .value();\n        },\n    },\n    asyncComputed: {\n        capabilityDefinitions: {\n            default: [],\n            get() {\n                var self = this;\n                self.loading = true;\n\n                return new Promise(function(resolve, reject) {\n\n                    self.$fluro.types.subTypes('capability')\n                    .then(function(res) {\n                        resolve(res);\n                        self.loading = false;\n                    })\n                    .catch(function(err) {\n                        reject(err);\n                        self.loading = false;\n                    });\n                })\n                \n            }\n        },\n    }\n}\n</script>\n<style lang=\"scss\">\n\n/**/\r\n\r\n$primary: #2ad4b9;//#0bd6be;\r\n$success: #4cc650; //#4cc673;//\r\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\r\n$danger: #d93e63;\r\n$secondary: #0bd6cd; //#0bd6a3;\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n\r\n.border-top {\r\n    border-top: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-right {\r\n    border-right: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-bottom {\r\n    border-bottom: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-left {\r\n    border-left: 1px solid rgba(#000, 0.05);\r\n}\r\n//////////////////////////////////////////\r\n\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n/**/\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n\n/*# sourceMappingURL=ContactCapabilityManager.vue.map */"]}, media: undefined });

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
  props: {
    'value': {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      anniversaryField: {
        key: 'anniversary',
        type: 'date',
        title: 'Anniversary Date'
      },
      actionIndexes: {},
      model: this.value,
      loading: true,
      backlinks: [],
      proposed: {
        checkinAuthorised: true,
        relationshipType: null,
        relationship: null,
        anniversary: null,
        contacts: []
      }
    };
  },

  created() {
    console.log('RELOAD TEAMS');
    this.reloadRelationships();
    this.resetProposed();
  },

  methods: {
    anniversaryDate(row) {
      if (row.anniversary) {
        return `${this.$fluro.date.formatDate(row.anniversary, 'D MMM')} (${this.$fluro.date.timeago(row.anniversary)})`;
      }
    },

    add() {
      var self = this; // console.log('RELATIONSHIP', self.proposed);

      var proposed = self.proposed;

      if (!self.model.relationships || !self.model.relationships.length) {
        self.$set(self.model, 'relationships', []);
      }

      self.model.relationships.push(proposed); // self.$fluro.api.put(`/contact/${self.contactID}/relationships`)

      self.resetProposed();
    },

    resetProposed() {
      this.proposed = {
        checkinAuthorised: true,
        relationshipType: null,
        relationship: null,
        anniversary: null,
        contacts: []
      };
    },

    // leave(team) {
    //     var self = this;
    //     //Get the ids from the teams
    //     var teamID = self.$fluro.utils.getStringID(team);
    //     self.loading = true;
    //     //////////////////////////////////
    //     var promise = self.$batch.run({
    //             operation: 'remove from team',
    //             ids: [self.contactID],
    //             teams: [teamID],
    //         })
    //         .then(function(res) {
    //             var index = _.findIndex(self.teams, { _id: teamID });
    //             self.teams.splice(index, 1);
    //             self.loading = false;
    //         })
    //         .catch(function(err) {
    //             console.log('TEAMS ERR', err);
    //             self.reloadRelationships();
    //         });
    // },
    // select(type) {
    //     var self = this;
    //     //Ugly hack, but it's gotta be done unfortunately
    //     var SelectionManager = Vue.extend(FluroSelector);
    //     var instance = new SelectionManager({
    //         propsData: {
    //             minimum: 0,
    //             maximum: 0,
    //         }
    //     })
    //     // var isBasicType = self.$fluro.types.isBasicType(type);
    //     var promise = self.$fluro.modal({
    //             component: FluroContentSelectModal,
    //             options: {
    //                 allDefinitions: false, //isBasicType,
    //                 selector: instance, //Vue(FluroSelector),
    //                 type,
    //                 minimum: 0,
    //                 maximum: 0,
    //             }
    //         })
    //         .then(function(items) {
    //             if (!items || !items.length) {
    //                 return;
    //             }
    //             self.loading = true;
    //             //Get the ids from the teams
    //             var teamIDs = self.$fluro.utils.arrayIDs(items);
    //             //////////////////////////////////
    //             var promise = self.$batch.run({
    //                     operation: 'add to team',
    //                     ids: [self.contactID],
    //                     teams: teamIDs,
    //                 })
    //                 .then(function(res) {
    //                     // self.teams = self.teams.concat(items);
    //                     // self.loading = false;
    //                     self.reloadRelationships();
    //                 })
    //                 .catch(function(err) {
    //                     self.reloadRelationships();
    //                 });
    //         })
    // },
    reloadRelationships() {
      var self = this;
      self.loading = true;

      if (!self.contactID) {
        self.loading = false;
        return;
      }

      self.$fluro.api.get(`/contact/${self.contactID}/relationships`, {
        params: {
          backlinks: true
        }
      }).then(function (res) {
        self.backlinks = res.data;
        self.loading = false;
      }).catch(function (err) {
        self.loading = false;
      });
    }

  },
  components: {
    FluroContentFormField,
    FluroContentSelectButton,
    // FluroAvatarStack,
    ListGroup,
    ListGroupItem // FluroContentSelectButton,
    // FluroContentSelectModal,

  },
  watch: {
    'proposed.relationshipType': function (value) {
      var self = this; //////////////////////////////

      if (!self.customRelationship) {
        self.proposed.relationship = value;
      } // //////////////////////////////
      // switch(value) {
      //     case 'other':
      //     break;
      //     default:
      //         self.proposed.relationship = value;
      //     break;
      // }

    }
  },
  computed: {
    relationships() {
      // return this.
      return this.backlinks;
    },

    customRelationship() {
      return this.proposed.relationshipType == 'other';
    },

    disabled() {
      var invalid = !this.proposed.contacts || !this.proposed.contacts.length || !this.proposed.relationship || !this.proposed.relationship.length;

      if (invalid) {
        return true;
      }

      if (this.customRelationship && (!this.proposed.relationship || !this.proposed.relationship.length)) {
        return true;
      }
    },

    contextName() {
      var name = this.model.preferredName || this.model.firstName || '';

      if (!name || !name.length) {
        return '';
      }

      if (_.endsWith(name, 's')) {
        return `${name}'`;
      }

      return `${name}'s`;
    },

    relationshipTypes() {
      var contextName = this.contextName;
      return [{
        title: `${contextName} Parents`,
        value: `parents`
      }, {
        title: `${contextName} Guardians`,
        value: `guardians`
      }, {
        title: `${contextName} Children`,
        value: `children`
      }, {
        title: `${contextName} Siblings`,
        value: `siblings`
      }, {
        title: `${contextName} Spouse`,
        value: `spouse`
      }, {
        title: `${contextName} Partner`,
        value: `partner`
      }, {
        title: `${contextName} Grandparents`,
        value: `grandparents`
      }, {
        title: `${contextName} Grandchildren`,
        value: `grandchildren`
      }, {
        title: `${contextName} Aunt/Uncle`,
        value: `auntuncle`
      }, {
        title: `${contextName} Niece/Nephew`,
        value: `niecenephew`
      }, {
        title: `Other`,
        value: `other`
      }];
    },

    contactID() {
      if (!this.model._id) {
        return;
      }

      return this.$fluro.utils.getStringID(this.model);
    }

  },
  filters: {
    capitalize(str) {
      return _.startCase(str);
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
    "div",
    [
      _vm.loading
        ? _c("fluro-page-preloader", { attrs: { contain: "" } })
        : [
            _c(
              "v-layout",
              { attrs: { row: "", wrap: "" } },
              [
                _vm._l(_vm.backlinks, function(row) {
                  return [
                    _c(
                      "v-flex",
                      [
                        _c(
                          "v-input",
                          { staticClass: "no-flex" },
                          [
                            _c("v-label", [
                              _vm._v(
                                _vm._s(_vm._f("capitalize")(row.relationship)) +
                                  " "
                              ),
                              _c("span", { staticClass: "anniversary" }, [
                                _vm._v(_vm._s(_vm.anniversaryDate(row)))
                              ])
                            ]),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "relation-faces" },
                              _vm._l(row.contacts, function(contact) {
                                return _c(
                                  "div",
                                  {
                                    staticClass: "relation-face",
                                    class: contact.status,
                                    on: {
                                      click: function($event) {
                                        return _vm.$fluro.global.edit(
                                          contact,
                                          true
                                        )
                                      }
                                    }
                                  },
                                  [
                                    _c("fluro-avatar", {
                                      attrs: { lg: "", id: contact }
                                    }),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      { staticClass: "details" },
                                      [
                                        _c("div", [
                                          _c("strong", [
                                            _vm._v(_vm._s(contact.title))
                                          ])
                                        ]),
                                        _vm._v(" "),
                                        _c("div", [
                                          _vm._v(_vm._s(contact.householdRole))
                                        ]),
                                        _vm._v(" "),
                                        _c("div", [
                                          _vm._v(_vm._s(contact.gender))
                                        ]),
                                        _vm._v(" "),
                                        _c("div", [
                                          _vm._v(_vm._s(contact.age))
                                        ]),
                                        _vm._v(" "),
                                        _c("div", [
                                          _vm._v(
                                            _vm._s(
                                              _vm._f("definitionTitle")(
                                                contact.definition
                                              )
                                            )
                                          )
                                        ]),
                                        _vm._v(" "),
                                        _c("fluro-status-label", {
                                          attrs: { value: contact.status }
                                        })
                                      ],
                                      1
                                    )
                                  ],
                                  1
                                )
                              }),
                              0
                            )
                          ],
                          1
                        )
                      ],
                      1
                    )
                  ]
                }),
                _vm._v(" "),
                _vm._l(_vm.model.relationships, function(row) {
                  return [
                    _c(
                      "v-flex",
                      [
                        _c(
                          "v-input",
                          { staticClass: "no-flex" },
                          [
                            _c("v-label", [
                              _vm._v(
                                _vm._s(_vm.contextName) +
                                  " " +
                                  _vm._s(
                                    _vm._f("capitalize")(row.relationship)
                                  ) +
                                  " "
                              ),
                              _c("span", { staticClass: "anniversary" }, [
                                _vm._v(_vm._s(_vm.anniversaryDate(row)))
                              ])
                            ]),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "relation-faces" },
                              _vm._l(row.contacts, function(contact) {
                                return _c(
                                  "div",
                                  {
                                    staticClass: "relation-face",
                                    class: contact.status,
                                    on: {
                                      click: function($event) {
                                        return _vm.$fluro.global.edit(
                                          contact,
                                          true
                                        )
                                      }
                                    }
                                  },
                                  [
                                    _c("fluro-avatar", {
                                      attrs: { lg: "", id: contact }
                                    }),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      { staticClass: "details" },
                                      [
                                        _c("div", [
                                          _c("strong", [
                                            _vm._v(_vm._s(contact.title))
                                          ])
                                        ]),
                                        _vm._v(" "),
                                        _c("div", [
                                          _vm._v(_vm._s(contact.householdRole))
                                        ]),
                                        _vm._v(" "),
                                        _c("div", [
                                          _vm._v(_vm._s(contact.gender))
                                        ]),
                                        _vm._v(" "),
                                        _c("div", [
                                          _vm._v(_vm._s(contact.age))
                                        ]),
                                        _vm._v(" "),
                                        _c("div", [
                                          _vm._v(
                                            _vm._s(
                                              _vm._f("definitionTitle")(
                                                contact.definition
                                              )
                                            )
                                          )
                                        ]),
                                        _vm._v(" "),
                                        _c("fluro-status-label", {
                                          attrs: { value: contact.status }
                                        })
                                      ],
                                      1
                                    )
                                  ],
                                  1
                                )
                              }),
                              0
                            )
                          ],
                          1
                        )
                      ],
                      1
                    )
                  ]
                })
              ],
              2
            ),
            _vm._v(" "),
            _c(
              "fluro-panel",
              [
                _c("fluro-panel-title", [
                  _c("h4", [_vm._v("Add a relationship")])
                ]),
                _vm._v(" "),
                _c("fluro-panel-body", [
                  _c(
                    "form",
                    [
                      _c(
                        "v-layout",
                        [
                          _c(
                            "v-flex",
                            { attrs: { xs12: "", sm5: "" } },
                            [
                              _c("v-select", {
                                attrs: {
                                  label: "Relationship",
                                  "item-text": "title",
                                  items: _vm.relationshipTypes
                                },
                                model: {
                                  value: _vm.proposed.relationshipType,
                                  callback: function($$v) {
                                    _vm.$set(
                                      _vm.proposed,
                                      "relationshipType",
                                      $$v
                                    );
                                  },
                                  expression: "proposed.relationshipType"
                                }
                              }),
                              _vm._v(" "),
                              _vm.customRelationship
                                ? [
                                    _c("v-text-field", {
                                      attrs: {
                                        label: "Custom Relationshp",
                                        placeholder: "Boss, Coworker, Friend"
                                      },
                                      model: {
                                        value: _vm.proposed.relationship,
                                        callback: function($$v) {
                                          _vm.$set(
                                            _vm.proposed,
                                            "relationship",
                                            $$v
                                          );
                                        },
                                        expression: "proposed.relationship"
                                      }
                                    })
                                  ]
                                : _vm._e(),
                              _vm._v(" "),
                              _vm.proposed.relationship == "spouse"
                                ? [
                                    _c("fluro-content-form-field", {
                                      attrs: { field: _vm.anniversaryField },
                                      model: {
                                        value: _vm.proposed,
                                        callback: function($$v) {
                                          _vm.proposed = $$v;
                                        },
                                        expression: "proposed"
                                      }
                                    })
                                  ]
                                : _vm._e()
                            ],
                            2
                          ),
                          _vm._v(" "),
                          _c(
                            "v-flex",
                            { attrs: { xs12: "", sm5: "" } },
                            [
                              _c("fluro-content-select-button", {
                                attrs: { block: "", type: "contact" },
                                model: {
                                  value: _vm.proposed.contacts,
                                  callback: function($$v) {
                                    _vm.$set(_vm.proposed, "contacts", $$v);
                                  },
                                  expression: "proposed.contacts"
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-flex",
                            { attrs: { xs12: "", sm4: "" } },
                            [
                              _c(
                                "v-btn",
                                {
                                  attrs: {
                                    block: "",
                                    color: "primary",
                                    disabled: _vm.disabled
                                  },
                                  on: {
                                    click: function($event) {
                                      return _vm.add()
                                    }
                                  }
                                },
                                [
                                  _vm._v(
                                    "\n                                                                                                                                    Add\n                                                                                                                                    "
                                  ),
                                  _c("fluro-icon", {
                                    attrs: { right: "", icon: "plus" }
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
                ])
              ],
              1
            )
          ]
    ],
    2
  )
};
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

  /* style */
  const __vue_inject_styles__$3 = function (inject) {
    if (!inject) return
    inject("data-v-200ef05f_0", { source: "/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.anniversary {\n  font-weight: normal;\n  opacity: 0.5;\n}\n.relation-faces {\n  display: block;\n}\n.relation-faces .relation-face {\n  width: 100px;\n  padding: 10px;\n  background: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  border-radius: 4px;\n  margin: 0 1% 1% 0;\n  display: inline-block;\n  text-align: center;\n  font-size: 14px;\n  cursor: pointer;\n  vertical-align: top;\n}\n.relation-faces .relation-face:hover {\n  background: #fafafa;\n}\n.relation-faces .relation-face.archived {\n  opacity: 0.5;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  background: none;\n}\n.relation-faces .relation-face .details {\n  padding: 5px 0;\n  text-transform: capitalize;\n  font-size: 0.8em;\n  opacity: 0.8;\n}\n\n/*# sourceMappingURL=ContactRelationshipManager.vue.map */", map: {"version":3,"sources":["C:\\Users\\User\\Documents\\fluro\\fluro-vue-ui\\src\\components\\content\\edit\\components\\ContactRelationshipManager.vue","ContactRelationshipManager.vue"],"names":[],"mappings":"AA8aA,GAAA;AAYA;EACA,yCAAA;ACxbA;AD2bA;EACA,2CAAA;ACxbA;AD2bA;EACA,4CAAA;ACxbA;AD2bA;EACA,0CAAA;ACxbA;;ADgcA,GAAA;AACA;EACA,mBAAA;EACA,YAAA;AC7bA;ADgcA;EACA,cAAA;AC7bA;AD+bA;EAIA,YAAA;EACA,aAAA;EACA,gBAAA;EACA,oCAAA;EACA,kBAAA;EACA,iBAAA;EACA,qBAAA;EACA,kBAAA;EACA,eAAA;EACA,eAAA;EACA,mBAAA;AChcA;ADkcA;EACA,mBAAA;AChcA;ADqcA;EACA,YAAA;EACA,oCAAA;EACA,gBAAA;ACncA;ADscA;EACA,cAAA;EACA,0BAAA;EAEA,gBAAA;EACA,YAAA;ACrcA;;AAEA,yDAAyD","file":"ContactRelationshipManager.vue","sourcesContent":["<template>\n                <div>\n                                <fluro-page-preloader v-if=\"loading\" contain />\n                                <template v-else>\n                                                <v-layout row wrap>\n                                                                <template v-for=\"row in backlinks\">\n                                                                                <v-flex>\n                                                                                                <v-input class=\"no-flex\">\n                                                                                                                <v-label>{{row.relationship | capitalize}} <span class=\"anniversary\">{{anniversaryDate(row)}}</span></v-label>\n                                                                                                                <div class=\"relation-faces\">\n                                                                                                                                <div @click=\"$fluro.global.edit(contact, true)\" class=\"relation-face\" :class=\"contact.status\" v-for=\"contact in row.contacts\">\n                                                                                                                                                <fluro-avatar lg :id=\"contact\" />\n                                                                                                                                                <div class=\"details\">\n                                                                                                                                                                <div><strong>{{contact.title}}</strong></div>\n                                                                                                                                                                <div>{{contact.householdRole}}</div>\n                                                                                                                                                                <div>{{contact.gender}}</div>\n                                                                                                                                                                <div>{{contact.age}}</div>\n                                                                                                                                                                <div>{{contact.definition | definitionTitle}}</div>\n                                                                                                                                                                <fluro-status-label :value=\"contact.status\" />\n                                                                                                                                                </div>\n                                                                                                                                </div>\n                                                                                                                </div>\n                                                                                                                <!-- <pre>{{model.relationships.length}}</pre> -->\n                                                                                                                <!-- <fluro-avatar-stack :contacts=\"row.contacts\"/> -->\n                                                                                                </v-input>\n                                                                                </v-flex>\n                                                                </template>\n                                                                <template v-for=\"row in model.relationships\">\n                                                                                <v-flex>\n                                                                                                <v-input class=\"no-flex\">\n                                                                                                                <v-label>{{contextName}} {{row.relationship | capitalize}} <span class=\"anniversary\">{{anniversaryDate(row)}}</span></v-label>\n                                                                                                                <div class=\"relation-faces\">\n                                                                                                                                <div @click=\"$fluro.global.edit(contact, true)\" class=\"relation-face\" :class=\"contact.status\" v-for=\"contact in row.contacts\">\n                                                                                                                                                <fluro-avatar lg :id=\"contact\" />\n                                                                                                                                                <div class=\"details\">\n                                                                                                                                                                <div><strong>{{contact.title}}</strong></div>\n                                                                                                                                                                <div>{{contact.householdRole}}</div>\n                                                                                                                                                                <div>{{contact.gender}}</div>\n                                                                                                                                                                <div>{{contact.age}}</div>\n                                                                                                                                                                <div>{{contact.definition | definitionTitle}}</div>\n                                                                                                                                                                <fluro-status-label :value=\"contact.status\" />\n                                                                                                                                                </div>\n                                                                                                                                </div>\n                                                                                                                </div>\n                                                                                                                <!-- <pre>{{model.relationships.length}}</pre> -->\n                                                                                                                <!-- <fluro-avatar-stack :contacts=\"row.contacts\"/> -->\n                                                                                                </v-input>\n                                                                                </v-flex>\n                                                                </template>\n                                                </v-layout>\n                                                <fluro-panel>\n                                                                <fluro-panel-title>\n                                                                                <h4>Add a relationship</h4>\n                                                                </fluro-panel-title>\n                                                                <fluro-panel-body>\n                                                                                <form>\n                                                                                                <v-layout>\n                                                                                                                <v-flex xs12 sm5>\n                                                                                                                                <v-select label=\"Relationship\" v-model=\"proposed.relationshipType\" item-text=\"title\" :items=\"relationshipTypes\"></v-select>\n                                                                                                                                <template v-if=\"customRelationship\">\n                                                                                                                                                <v-text-field label=\"Custom Relationshp\" v-model=\"proposed.relationship\" placeholder=\"Boss, Coworker, Friend\" />\n                                                                                                                                </template>\n                                                                                                                                <template v-if=\"proposed.relationship == 'spouse'\">\n                                                                                                                                                <fluro-content-form-field :field=\"anniversaryField\" v-model=\"proposed\" />\n                                                                                                                                </template>\n                                                                                                                </v-flex>\n                                                                                                                <v-flex xs12 sm5>\n                                                                                                                                <!-- <v-input class=\"no-flex\"> -->\n                                                                                                                                <!-- <v-label>Select Contacts</v-label> -->\n                                                                                                                                <fluro-content-select-button block type=\"contact\" v-model=\"proposed.contacts\" />\n                                                                                                                                <!-- </v-input> -->\n                                                                                                                </v-flex>\n                                                                                                                <v-flex xs12 sm4>\n                                                                                                                                <v-btn block color=\"primary\" :disabled=\"disabled\" @click=\"add()\">\n                                                                                                                                                Add\n                                                                                                                                                <fluro-icon right icon=\"plus\" />\n                                                                                                                                </v-btn>\n                                                                                                                </v-flex>\n                                                                                                </v-layout>\n                                                                                </form>\n                                                                </fluro-panel-body>\n                                                </fluro-panel>\n                                                <!-- <pre>{{relationships}}</pre> -->\n                                                <!-- <v-input class=\"no-flex\" v-for=\"group in teamGroups\">\n                <v-label>{{group.title}}</v-label>\n                <list-group>\n                    <template v-for=\"team in group.teams\">\n                        <list-group-item :item=\"team\" :firstLine=\"team.positions | comma\">\n                            <template v-slot:right>\n                                <v-menu :left=\"true\" v-model=\"actionIndexes[team._id]\" :fixed=\"true\" transition=\"slide-y-transition\" offset-y>\n                                    <template v-slot:activator=\"{ on }\">\n                                        <v-btn class=\"ma-0\" icon small flat v-on=\"on\">\n                                            <fluro-icon v-if=\"actionIndexes[team._id]\" icon=\"times\" />\n                                            <fluro-icon v-else icon=\"ellipsis-h\" />\n                                        </v-btn>\n                                    </template>\n                                    <v-list dense>\n                                        <v-list-tile @click=\"$actions.open([team])\">\n                                            <v-list-tile-content>Actions</v-list-tile-content>\n                                        </v-list-tile>\n                                        <v-list-tile @click=\"leave(team)\">\n                                            <v-list-tile-content>Remove {{model.firstName}} from group</v-list-tile-content>\n                                        </v-list-tile>\n                                    </v-list>\n                                </v-menu>\n                            </template>\n                        </list-group-item>\n                    </template>\n                </list-group>\n                <v-btn small color=\"primary\" @click=\"select(group.key)\" class=\"ml-0\">\n                    Add {{group.title}}\n                    <fluro-icon right icon=\"plus\" />\n                </v-btn>\n            </v-input> -->\n                                </template>\n                </div>\n</template>\n<script>\nimport ListGroup from 'src/components/ui/ListGroup.vue';\nimport ListGroupItem from 'src/components/ui/ListGroupItem.vue';\n\nimport FluroContentSelectButton from 'src/components/form/contentselect/FluroContentSelectButton.vue';\nimport FluroContentFormField from 'src/components/form/FluroContentFormField.vue';\n\nimport FluroSelector from 'src/components/form/contentselect/FluroSelector.vue';\nimport Vue from 'vue';\nimport _ from 'lodash';\n\nexport default {\n                props: {\n                                'value': {\n                                                type: Object,\n                                                required: true,\n                                }\n                },\n                data() {\n                                return {\n                                                anniversaryField: {\n                                                                key: 'anniversary',\n                                                                type: 'date',\n                                                                title: 'Anniversary Date',\n                                                },\n                                                actionIndexes: {},\n                                                model: this.value,\n                                                loading: true,\n                                                backlinks: [],\n                                                proposed: {\n                                                                checkinAuthorised: true,\n                                                                relationshipType: null,\n                                                                relationship: null,\n                                                                anniversary: null,\n                                                                contacts: [],\n                                                }\n                                }\n                },\n                created() {\n                                console.log('RELOAD TEAMS')\n                                this.reloadRelationships();\n                                this.resetProposed();\n                },\n                methods: {\n                                anniversaryDate(row) {\n                                                if (row.anniversary) {\n                                                                return `${this.$fluro.date.formatDate(row.anniversary, 'D MMM')} (${this.$fluro.date.timeago(row.anniversary)})`;\n                                                }\n                                },\n                                add() {\n\n                                                var self = this;\n\n                                                // console.log('RELATIONSHIP', self.proposed);\n                                                var proposed = self.proposed;\n\n                                                if (!self.model.relationships || !self.model.relationships.length) {\n                                                                self.$set(self.model, 'relationships', []);\n                                                }\n\n                                                self.model.relationships.push(proposed);\n\n                                                // self.$fluro.api.put(`/contact/${self.contactID}/relationships`)\n\n                                                self.resetProposed();\n                                },\n                                resetProposed() {\n                                                this.proposed = {\n                                                                checkinAuthorised: true,\n                                                                relationshipType: null,\n                                                                relationship: null,\n                                                                anniversary: null,\n                                                                contacts: [],\n                                                }\n                                },\n                                // leave(team) {\n                                //     var self = this;\n\n                                //     //Get the ids from the teams\n                                //     var teamID = self.$fluro.utils.getStringID(team);\n                                //     self.loading = true;\n\n                                //     //////////////////////////////////\n\n                                //     var promise = self.$batch.run({\n                                //             operation: 'remove from team',\n                                //             ids: [self.contactID],\n                                //             teams: [teamID],\n                                //         })\n                                //         .then(function(res) {\n                                //             var index = _.findIndex(self.teams, { _id: teamID });\n                                //             self.teams.splice(index, 1);\n                                //             self.loading = false;\n                                //         })\n                                //         .catch(function(err) {\n                                //             console.log('TEAMS ERR', err);\n                                //             self.reloadRelationships();\n                                //         });\n                                // },\n                                // select(type) {\n\n                                //     var self = this;\n\n                                //     //Ugly hack, but it's gotta be done unfortunately\n                                //     var SelectionManager = Vue.extend(FluroSelector);\n                                //     var instance = new SelectionManager({\n                                //         propsData: {\n                                //             minimum: 0,\n                                //             maximum: 0,\n                                //         }\n                                //     })\n\n                                //     // var isBasicType = self.$fluro.types.isBasicType(type);\n\n                                //     var promise = self.$fluro.modal({\n                                //             component: FluroContentSelectModal,\n                                //             options: {\n                                //                 allDefinitions: false, //isBasicType,\n                                //                 selector: instance, //Vue(FluroSelector),\n                                //                 type,\n                                //                 minimum: 0,\n                                //                 maximum: 0,\n                                //             }\n                                //         })\n                                //         .then(function(items) {\n\n                                //             if (!items || !items.length) {\n                                //                 return;\n                                //             }\n\n                                //             self.loading = true;\n\n                                //             //Get the ids from the teams\n                                //             var teamIDs = self.$fluro.utils.arrayIDs(items);\n\n                                //             //////////////////////////////////\n\n                                //             var promise = self.$batch.run({\n                                //                     operation: 'add to team',\n                                //                     ids: [self.contactID],\n                                //                     teams: teamIDs,\n                                //                 })\n                                //                 .then(function(res) {\n\n                                //                     // self.teams = self.teams.concat(items);\n                                //                     // self.loading = false;\n                                //                     self.reloadRelationships();\n                                //                 })\n                                //                 .catch(function(err) {\n                                //                     self.reloadRelationships();\n                                //                 });\n\n\n\n\n                                //         })\n                                // },\n                                reloadRelationships() {\n\n                                                var self = this;\n                                                self.loading = true;\n\n                                                if (!self.contactID) {\n                                                                self.loading = false;\n                                                                return;\n                                                }\n\n                                                self.$fluro.api.get(`/contact/${self.contactID}/relationships`, {\n                                                                                params: {\n                                                                                                backlinks: true,\n                                                                                }\n                                                                })\n                                                                .then(function(res) {\n                                                                                self.backlinks = res.data;\n                                                                                self.loading = false;\n                                                                })\n                                                                .catch(function(err) {\n                                                                                self.loading = false;\n                                                                });\n                                },\n                },\n                components: {\n                                FluroContentFormField,\n                                FluroContentSelectButton,\n                                // FluroAvatarStack,\n                                ListGroup,\n                                ListGroupItem,\n                                // FluroContentSelectButton,\n                                // FluroContentSelectModal,\n                },\n                watch: {\n                                'proposed.relationshipType': function(value) {\n\n                                                var self = this;\n\n                                                //////////////////////////////\n\n                                                if (!self.customRelationship) {\n                                                                self.proposed.relationship = value;\n                                                }\n\n                                                // //////////////////////////////\n\n                                                // switch(value) {\n                                                //     case 'other':\n                                                //     break;\n                                                //     default:\n                                                //         self.proposed.relationship = value;\n                                                //     break;\n                                                // }\n                                }\n                },\n                computed: {\n                                relationships() {\n                                                // return this.\n                                                return this.backlinks;\n                                },\n                                customRelationship() {\n                                                return this.proposed.relationshipType == 'other';\n                                },\n                                disabled() {\n                                                var invalid = !this.proposed.contacts || !this.proposed.contacts.length || !this.proposed.relationship || !this.proposed.relationship.length;\n\n                                                if (invalid) {\n                                                                return true;\n                                                }\n\n                                                if (this.customRelationship && (!this.proposed.relationship || !this.proposed.relationship.length)) {\n                                                                return true;\n                                                }\n                                },\n                                contextName() {\n\n                                                var name = this.model.preferredName || this.model.firstName || '';\n                                                if (!name || !name.length) {\n                                                                return '';\n                                                }\n\n                                                if (_.endsWith(name, 's')) {\n                                                                return `${name}'`\n                                                }\n                                                return `${name}'s`;\n                                },\n                                relationshipTypes() {\n\n\n                                                var contextName = this.contextName;\n\n                                                return [{\n                                                                                title: `${contextName} Parents`,\n                                                                                value: `parents`,\n                                                                },\n                                                                {\n                                                                                title: `${contextName} Guardians`,\n                                                                                value: `guardians`,\n                                                                },\n                                                                {\n                                                                                title: `${contextName} Children`,\n                                                                                value: `children`,\n                                                                },\n                                                                {\n                                                                                title: `${contextName} Siblings`,\n                                                                                value: `siblings`,\n                                                                },\n                                                                {\n                                                                                title: `${contextName} Spouse`,\n                                                                                value: `spouse`,\n                                                                },\n                                                                {\n                                                                                title: `${contextName} Partner`,\n                                                                                value: `partner`,\n                                                                },\n                                                                {\n                                                                                title: `${contextName} Grandparents`,\n                                                                                value: `grandparents`,\n                                                                },\n                                                                {\n                                                                                title: `${contextName} Grandchildren`,\n                                                                                value: `grandchildren`,\n                                                                },\n                                                                {\n                                                                                title: `${contextName} Aunt/Uncle`,\n                                                                                value: `auntuncle`,\n\n                                                                },\n                                                                {\n                                                                                title: `${contextName} Niece/Nephew`,\n                                                                                value: `niecenephew`,\n                                                                },\n                                                                {\n                                                                                title: `Other`,\n                                                                                value: `other`,\n                                                                },\n                                                ]\n                                },\n                                contactID() {\n                                                if (!this.model._id) {\n                                                                return;\n                                                }\n\n                                                return this.$fluro.utils.getStringID(this.model);\n                                },\n                },\n                filters: {\n                                capitalize(str) {\n                                                return _.startCase(str);\n                                }\n                }\n}\n\n</script>\n<style lang=\"scss\">\n\n/**/\r\n\r\n$primary: #2ad4b9;//#0bd6be;\r\n$success: #4cc650; //#4cc673;//\r\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\r\n$danger: #d93e63;\r\n$secondary: #0bd6cd; //#0bd6a3;\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n\r\n.border-top {\r\n    border-top: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-right {\r\n    border-right: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-bottom {\r\n    border-bottom: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-left {\r\n    border-left: 1px solid rgba(#000, 0.05);\r\n}\r\n//////////////////////////////////////////\r\n\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n/**/\n.anniversary {\n                font-weight: normal;\n                opacity: 0.5;\n}\n\n.relation-faces {\n                display: block;\n\n                .relation-face {\n\n\n\n                                width: 100px;\n                                padding: 10px;\n                                background: #fff;\n                                border: 1px solid rgba(#000, 0.1);\n                                border-radius: 4px;\n                                margin: 0 1% 1% 0;\n                                display: inline-block;\n                                text-align: center;\n                                font-size: 14px;\n                                cursor: pointer;\n                                vertical-align: top;\n\n                                &:hover {\n                                                background: #fafafa;\n                                }\n\n                                // font-weight: 600;\n\n                                &.archived {\n                                                opacity: 0.5;\n                                                border: 1px solid rgba(#000, 0.1);\n                                                background: none;\n                                }\n\n                                .details {\n                                                padding: 5px 0;\n                                                text-transform: capitalize;\n                                                ;\n                                                font-size: 0.8em;\n                                                opacity: 0.8;\n                                }\n                }\n}\n\n</style>\n","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.anniversary {\n  font-weight: normal;\n  opacity: 0.5;\n}\n\n.relation-faces {\n  display: block;\n}\n.relation-faces .relation-face {\n  width: 100px;\n  padding: 10px;\n  background: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  border-radius: 4px;\n  margin: 0 1% 1% 0;\n  display: inline-block;\n  text-align: center;\n  font-size: 14px;\n  cursor: pointer;\n  vertical-align: top;\n}\n.relation-faces .relation-face:hover {\n  background: #fafafa;\n}\n.relation-faces .relation-face.archived {\n  opacity: 0.5;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  background: none;\n}\n.relation-faces .relation-face .details {\n  padding: 5px 0;\n  text-transform: capitalize;\n  font-size: 0.8em;\n  opacity: 0.8;\n}\n\n/*# sourceMappingURL=ContactRelationshipManager.vue.map */"]}, media: undefined });

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
  props: {
    value: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      description: {
        key: 'description',
        type: 'string',
        minimum: 1,
        maximum: 1,
        placeholder: 'Away on holidays',
        title: 'Description'
      },
      actionIndexes: {},
      loading: true,
      modalStart: false,
      modalEnd: false,
      model: this.value,
      unavailabilities: [],
      proposed: {
        description: undefined,
        startDate: this.startDateMin,
        endDate: this.startDateMin
      }
    };
  },

  created() {
    console.log('RELOAD TEAMS');
    this.reloadRelationships();
    this.resetProposed();
  },

  methods: {
    add() {
      var self = this; // console.log('RELATIONSHIP', self.proposed);

      var proposed = JSON.parse(JSON.stringify(self.proposed));
      proposed.startDate = new Date(proposed.startDate);
      proposed.startDate.setHours(0);
      proposed.startDate.setMinutes(0);
      proposed.startDate.setSeconds(0);
      proposed.endDate = new Date(proposed.endDate);
      proposed.endDate.setHours(23);
      proposed.endDate.setMinutes(59);
      proposed.endDate.setSeconds(59);
      return self.$fluro.api.post(`/contact/${self.contactID}/unavailability`, proposed).then(function (res) {
        self.$fluro.notify(`Successfully updated ${self.contextName} unavailability`, {
          type: 'success'
        });
        self.unavailabilities.push(res.data);
        self.resetProposed();
      }).catch(function (err) {
        self.$fluro.error(err);
      });
    },

    resetProposed() {
      this.proposed = {
        description: undefined,
        startDate: this.startDateMin,
        endDate: this.startDateMin
      };
    },

    reloadRelationships() {
      var self = this;
      self.loading = true;

      if (!self.contactID) {
        self.loading = false;
        return;
      }

      self.$fluro.api.get(`/contact/${self.contactID}/unavailability`, {}).then(function (res) {
        self.unavailabilities = res.data;
        self.loading = false;
      }).catch(function (err) {
        self.loading = false;
      });
    },

    remove(index) {
      var self = this;
      return self.$fluro.api.delete(`/contact/${self.contactID}/unavailability/${self.unavailabilities[index]._id}`).then(function (res) {
        self.$fluro.notify(`Successfully deleted ${self.contextName} unavailability '${self.unavailabilities[index].description}'`, {
          type: 'success'
        });
        self.unavailabilities.splice(index, 1);
      }).catch(function (err) {
        self.$fluro.error(err);
      });
    }

  },
  components: {
    FluroContentFormField,
    FluroContentSelectButton,
    // FluroAvatarStack,
    ListGroup,
    ListGroupItem,
    FluroConfirmButton // FluroContentSelectButton,
    // FluroContentSelectModal,

  },
  watch: {
    'proposed.startDate': function () {
      var self = this;

      if (self.proposed.endDate < self.proposed.startDate) {
        self.proposed.endDate = self.proposed.startDate;
      }
    }
  },
  computed: {
    contextName() {
      var name = this.model.preferredName || this.model.firstName || '';

      if (!name || !name.length) {
        return '';
      }

      if (_.endsWith(name, 's')) {
        return `${name}'`;
      }

      return `${name}'s`;
    },

    contactID() {
      if (!this.model._id) {
        return;
      }

      return this.$fluro.utils.getStringID(this.model);
    },

    contactTitle() {
      return _.get(this.model, 'title') || '';
    },

    startDateMin() {
      var today = new Date();

      function pad(val) {
        var res = val.toString();

        if (res.length == 1) {
          return '0' + res;
        } else {
          return res;
        }
      }

      return today.getFullYear() + '-' + pad(today.getMonth() + 1) + '-' + pad(today.getDate());
    },

    endDateMin() {
      var self = this;
      var date = new Date(_.get(self.proposed, 'startDate'));

      function pad(val) {
        var res = val.toString();

        if (res.length == 1) {
          return '0' + res;
        } else {
          return res;
        }
      }

      return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate());
    }

  },
  filters: {
    capitalize(str) {
      return _.startCase(str);
    } // readableDate(obj) {
    //     var self = this;
    //     var start = self.$fluro.date.moment(obj.startDate).format('dddd, MMMM Do YYYY');
    //     var end = self.$fluro.date.moment(obj.endDate).format('dddd, MMMM Do YYYY');
    //     //console.log(start, end, obj.startDate, obj.endDate);
    //     if (start == end) {
    //         return self.$fluro.date.moment(obj.startDate).format('dddd, MMMM Do YYYY');
    //     } else {
    //         return self.$fluro.date.moment(obj.startDate).format('dddd, MMMM Do YYYY') + ' - ' + self.$fluro.date.moment(obj.endDate).format('dddd, MMMM Do YYYY')
    //     }
    // }


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
    "div",
    [
      _vm.loading
        ? _c("fluro-page-preloader", { attrs: { contain: "" } })
        : [
            _c(
              "list-group",
              [
                _c(
                  "transition-group",
                  _vm._l(_vm.unavailabilities, function(unavailability, index) {
                    return _c(
                      "list-group-item",
                      {
                        key: JSON.stringify(unavailability),
                        staticClass: "ma-0 pa-0"
                      },
                      [
                        _c(
                          "v-layout",
                          {
                            attrs: { wrap: "", "align-center": "", "ma-0": "" }
                          },
                          [
                            _c(
                              "v-flex",
                              { attrs: { sm10: "", xs12: "", "px-4": "" } },
                              [
                                _c("strong", [
                                  _vm._v(_vm._s(unavailability.description))
                                ]),
                                _vm._v(" "),
                                _c("p", { staticClass: "muted mb-0" }, [
                                  _vm._v(
                                    _vm._s(
                                      _vm._f("readableEventDate")(
                                        unavailability
                                      )
                                    )
                                  )
                                ])
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "v-flex",
                              { attrs: { sm2: "", xs12: "" } },
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
                                                    confirming
                                                      ? "Confirm?"
                                                      : "Remove"
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
                )
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "fluro-panel",
              [
                _c("fluro-panel-title", [
                  _c("h4", [_vm._v("Add an Unavailability Period")])
                ]),
                _vm._v(" "),
                _c("fluro-panel-body", [
                  _c(
                    "form",
                    [
                      _c(
                        "v-layout",
                        { attrs: { wrap: "", "px-4": "" } },
                        [
                          _c(
                            "v-flex",
                            { attrs: { xs12: "", sm12: "" } },
                            [
                              _c("fluro-content-form-field", {
                                attrs: { field: _vm.description },
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
                            { attrs: { xs12: "", sm5: "" } },
                            [
                              _c(
                                "v-dialog",
                                {
                                  ref: "dialogStart",
                                  attrs: {
                                    "return-value": _vm.proposed.startDate,
                                    lazy: "",
                                    "full-width": "",
                                    width: "290px"
                                  },
                                  on: {
                                    "update:returnValue": function($event) {
                                      return _vm.$set(
                                        _vm.proposed,
                                        "startDate",
                                        $event
                                      )
                                    },
                                    "update:return-value": function($event) {
                                      return _vm.$set(
                                        _vm.proposed,
                                        "startDate",
                                        $event
                                      )
                                    }
                                  },
                                  scopedSlots: _vm._u([
                                    {
                                      key: "activator",
                                      fn: function(ref) {
                                        var on = ref.on;
                                        return [
                                          _c(
                                            "v-text-field",
                                            _vm._g(
                                              {
                                                attrs: {
                                                  label: "Start Date",
                                                  "prepend-icon": "event",
                                                  readonly: ""
                                                },
                                                model: {
                                                  value: _vm.proposed.startDate,
                                                  callback: function($$v) {
                                                    _vm.$set(
                                                      _vm.proposed,
                                                      "startDate",
                                                      $$v
                                                    );
                                                  },
                                                  expression:
                                                    "proposed.startDate"
                                                }
                                              },
                                              on
                                            )
                                          )
                                        ]
                                      }
                                    }
                                  ]),
                                  model: {
                                    value: _vm.modalStart,
                                    callback: function($$v) {
                                      _vm.modalStart = $$v;
                                    },
                                    expression: "modalStart"
                                  }
                                },
                                [
                                  _vm._v(" "),
                                  _c(
                                    "v-date-picker",
                                    {
                                      attrs: {
                                        min: _vm.startDateMin,
                                        scrollable: ""
                                      },
                                      model: {
                                        value: _vm.proposed.startDate,
                                        callback: function($$v) {
                                          _vm.$set(
                                            _vm.proposed,
                                            "startDate",
                                            $$v
                                          );
                                        },
                                        expression: "proposed.startDate"
                                      }
                                    },
                                    [
                                      _c("v-spacer"),
                                      _vm._v(" "),
                                      _c(
                                        "v-btn",
                                        {
                                          attrs: { flat: "", color: "primary" },
                                          on: {
                                            click: function($event) {
                                              _vm.modalStart = false;
                                            }
                                          }
                                        },
                                        [_vm._v("Cancel")]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "v-btn",
                                        {
                                          attrs: { flat: "", color: "primary" },
                                          on: {
                                            click: function($event) {
                                              return _vm.$refs.dialogStart.save(
                                                _vm.proposed.startDate
                                              )
                                            }
                                          }
                                        },
                                        [_vm._v("OK")]
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
                            { attrs: { xs12: "", sm5: "" } },
                            [
                              _c(
                                "v-dialog",
                                {
                                  ref: "dialogEnd",
                                  attrs: {
                                    "return-value": _vm.proposed.endDate,
                                    lazy: "",
                                    "full-width": "",
                                    width: "290px"
                                  },
                                  on: {
                                    "update:returnValue": function($event) {
                                      return _vm.$set(
                                        _vm.proposed,
                                        "endDate",
                                        $event
                                      )
                                    },
                                    "update:return-value": function($event) {
                                      return _vm.$set(
                                        _vm.proposed,
                                        "endDate",
                                        $event
                                      )
                                    }
                                  },
                                  scopedSlots: _vm._u([
                                    {
                                      key: "activator",
                                      fn: function(ref) {
                                        var on = ref.on;
                                        return [
                                          _c(
                                            "v-text-field",
                                            _vm._g(
                                              {
                                                attrs: {
                                                  label: "End Date",
                                                  "prepend-icon": "event",
                                                  readonly: ""
                                                },
                                                model: {
                                                  value: _vm.proposed.endDate,
                                                  callback: function($$v) {
                                                    _vm.$set(
                                                      _vm.proposed,
                                                      "endDate",
                                                      $$v
                                                    );
                                                  },
                                                  expression: "proposed.endDate"
                                                }
                                              },
                                              on
                                            )
                                          )
                                        ]
                                      }
                                    }
                                  ]),
                                  model: {
                                    value: _vm.modalEnd,
                                    callback: function($$v) {
                                      _vm.modalEnd = $$v;
                                    },
                                    expression: "modalEnd"
                                  }
                                },
                                [
                                  _vm._v(" "),
                                  _c(
                                    "v-date-picker",
                                    {
                                      attrs: {
                                        min: _vm.endDateMin,
                                        scrollable: ""
                                      },
                                      model: {
                                        value: _vm.proposed.endDate,
                                        callback: function($$v) {
                                          _vm.$set(_vm.proposed, "endDate", $$v);
                                        },
                                        expression: "proposed.endDate"
                                      }
                                    },
                                    [
                                      _c("v-spacer"),
                                      _vm._v(" "),
                                      _c(
                                        "v-btn",
                                        {
                                          attrs: { flat: "", color: "primary" },
                                          on: {
                                            click: function($event) {
                                              _vm.modalEnd = false;
                                            }
                                          }
                                        },
                                        [_vm._v("Cancel")]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "v-btn",
                                        {
                                          attrs: { flat: "", color: "primary" },
                                          on: {
                                            click: function($event) {
                                              return _vm.$refs.dialogEnd.save(
                                                _vm.proposed.endDate
                                              )
                                            }
                                          }
                                        },
                                        [_vm._v("OK")]
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
                            { attrs: { xs12: "", sm2: "" } },
                            [
                              _c(
                                "v-btn",
                                {
                                  attrs: {
                                    block: "",
                                    color: "primary",
                                    disabled: false
                                  },
                                  on: {
                                    click: function($event) {
                                      return _vm.add()
                                    }
                                  }
                                },
                                [
                                  _vm._v(
                                    "\n                                Add\n                                "
                                  ),
                                  _c("fluro-icon", {
                                    attrs: { right: "", icon: "plus" }
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
                ])
              ],
              1
            )
          ]
    ],
    2
  )
};
var __vue_staticRenderFns__$4 = [];
__vue_render__$4._withStripped = true;

  /* style */
  const __vue_inject_styles__$4 = function (inject) {
    if (!inject) return
    inject("data-v-0939c614_0", { source: "/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n\n/*# sourceMappingURL=ContactUnavailabilityManager.vue.map */", map: {"version":3,"sources":["C:\\Users\\User\\Documents\\fluro\\fluro-vue-ui\\src\\components\\content\\edit\\components\\ContactUnavailabilityManager.vue","ContactUnavailabilityManager.vue"],"names":[],"mappings":"AAoRA,GAAA;AAYA;EACA,yCAAA;AC9RA;ADiSA;EACA,2CAAA;AC9RA;ADiSA;EACA,4CAAA;AC9RA;ADiSA;EACA,0CAAA;AC9RA;;ADsSA,GAAA;;AClSA,2DAA2D","file":"ContactUnavailabilityManager.vue","sourcesContent":["<template>\n    <div>\n        <fluro-page-preloader v-if=\"loading\" contain />\n        <template v-else>\n            <list-group>\n                <transition-group>\n                    <list-group-item class=\"ma-0 pa-0\" v-for=\"(unavailability, index) in unavailabilities\" v-bind:key=\"JSON.stringify(unavailability)\">\n                        <v-layout wrap align-center ma-0>\n                            <v-flex sm10 xs12 px-4>\n                                <strong>{{unavailability.description}}</strong>\n                                <p class=\"muted mb-0\">{{unavailability | readableEventDate}}</p>\n                            </v-flex>\n                            <v-flex sm2 xs12>\n                                <fluro-confirm-button @click=\"remove(index)\" content=\"Remove\">\n                                    <template v-slot:default=\"{confirming}\">\n                                        <v-btn flat block :color=\"confirming ? 'red' : ''\" style=\"transition: all 0.1s;width:100%;\">{{confirming ? 'Confirm?' : 'Remove'}}</v-btn>\n                                    </template>\n                                </fluro-confirm-button>\n                            </v-flex>\n                        </v-layout>\n                    </list-group-item>\n                </transition-group>\n            </list-group>\n            <fluro-panel>\n                <fluro-panel-title>\n                    <h4>Add an Unavailability Period</h4>\n                </fluro-panel-title>\n                <fluro-panel-body>\n                    <form>\n                        <v-layout wrap px-4>\n                            <v-flex xs12 sm12>\n                                <fluro-content-form-field :field=\"description\" v-model=\"proposed\" />\n                            </v-flex>\n                            <v-flex xs12 sm5>\n                                <v-dialog ref=\"dialogStart\" v-model=\"modalStart\" :return-value.sync=\"proposed.startDate\" lazy full-width width=\"290px\">\n                                    <template v-slot:activator=\"{ on }\">\n                                        <v-text-field v-model=\"proposed.startDate\" label=\"Start Date\" prepend-icon=\"event\" readonly v-on=\"on\"></v-text-field>\n                                    </template>\n                                    <v-date-picker v-model=\"proposed.startDate\" :min=\"startDateMin\" scrollable>\n                                        <v-spacer></v-spacer>\n                                        <v-btn flat color=\"primary\" @click=\"modalStart = false\">Cancel</v-btn>\n                                        <v-btn flat color=\"primary\" @click=\"$refs.dialogStart.save(proposed.startDate)\">OK</v-btn>\n                                    </v-date-picker>\n                                </v-dialog>\n                            </v-flex>\n                            <v-flex xs12 sm5>\n                                <v-dialog ref=\"dialogEnd\" v-model=\"modalEnd\" :return-value.sync=\"proposed.endDate\" lazy full-width width=\"290px\">\n                                    <template v-slot:activator=\"{ on }\">\n                                        <v-text-field v-model=\"proposed.endDate\" label=\"End Date\" prepend-icon=\"event\" readonly v-on=\"on\"></v-text-field>\n                                    </template>\n                                    <v-date-picker v-model=\"proposed.endDate\" :min=\"endDateMin\" scrollable>\n                                        <v-spacer></v-spacer>\n                                        <v-btn flat color=\"primary\" @click=\"modalEnd = false\">Cancel</v-btn>\n                                        <v-btn flat color=\"primary\" @click=\"$refs.dialogEnd.save(proposed.endDate)\">OK</v-btn>\n                                    </v-date-picker>\n                                </v-dialog>\n                            </v-flex>\n                            <v-flex xs12 sm2>\n                                <v-btn block color=\"primary\" :disabled=\"false\" @click=\"add()\">\n                                    Add\n                                    <fluro-icon right icon=\"plus\" />\n                                </v-btn>\n                            </v-flex>\n                        </v-layout>\n                    </form>\n                </fluro-panel-body>\n            </fluro-panel>\n        </template>\n    </div>\n</template>\n<script>\nimport ListGroup from 'src/components/ui/ListGroup.vue';\nimport ListGroupItem from 'src/components/ui/ListGroupItem.vue';\nimport FluroConfirmButton from 'src/components/ui/FluroConfirmButton.vue';\nimport FluroContentSelectButton from 'src/components/form/contentselect/FluroContentSelectButton.vue';\nimport FluroContentFormField from 'src/components/form/FluroContentFormField.vue';\nimport FluroSelector from 'src/components/form/contentselect/FluroSelector.vue';\nimport Vue from 'vue';\nimport _ from 'lodash';\n\n\nexport default {\n    props: {\n        value: {\n            type: Object,\n            required: true,\n        },\n    },\n    data() {\n        return {\n            description: {\n                key: 'description',\n                type: 'string',\n                minimum: 1,\n                maximum: 1,\n                placeholder: 'Away on holidays',\n                title: 'Description',\n            },\n            actionIndexes: {},\n            loading: true,\n            modalStart: false,\n            modalEnd: false,\n            model: this.value,\n            unavailabilities: [],\n            proposed: {\n                description: undefined,\n                startDate: this.startDateMin,\n                endDate: this.startDateMin,\n            }\n        }\n    },\n    created() {\n        console.log('RELOAD TEAMS')\n        this.reloadRelationships();\n        this.resetProposed();\n    },\n    methods: {\n        add() {\n\n            var self = this;\n\n            // console.log('RELATIONSHIP', self.proposed);\n            var proposed = JSON.parse(JSON.stringify(self.proposed));\n            proposed.startDate = new Date(proposed.startDate);\n            proposed.startDate.setHours(0);\n            proposed.startDate.setMinutes(0);\n            proposed.startDate.setSeconds(0);\n\n\n            proposed.endDate = new Date(proposed.endDate);\n            proposed.endDate.setHours(23);\n            proposed.endDate.setMinutes(59);\n            proposed.endDate.setSeconds(59);\n\n\n            return self.$fluro.api.post(`/contact/${self.contactID}/unavailability`, proposed)\n                .then(function(res) {\n                    self.$fluro.notify(`Successfully updated ${self.contextName} unavailability`, { type: 'success', })\n                    self.unavailabilities.push(res.data);\n                    self.resetProposed();\n                })\n                .catch(function(err) {\n                    self.$fluro.error(err);\n                });\n        },\n        resetProposed() {\n            this.proposed = {\n                description: undefined,\n                startDate: this.startDateMin,\n                endDate: this.startDateMin,\n            }\n        },\n        reloadRelationships() {\n\n            var self = this;\n            self.loading = true;\n\n            if (!self.contactID) {\n                self.loading = false;\n                return;\n            }\n\n            self.$fluro.api.get(`/contact/${self.contactID}/unavailability`, {})\n                .then(function(res) {\n                    self.unavailabilities = res.data;\n                    self.loading = false;\n                })\n                .catch(function(err) {\n                    self.loading = false;\n                });\n        },\n        remove(index) {\n            var self = this;\n            return self.$fluro.api.delete(`/contact/${self.contactID}/unavailability/${self.unavailabilities[index]._id}`)\n                .then(function(res) {\n                    self.$fluro.notify(`Successfully deleted ${self.contextName} unavailability '${self.unavailabilities[index].description}'`, { type: 'success', })\n                    self.unavailabilities.splice(index, 1);\n                })\n                .catch(function(err) {\n                    self.$fluro.error(err);\n                });  \n        },\n    },\n    components: {\n        FluroContentFormField,\n        FluroContentSelectButton,\n        // FluroAvatarStack,\n        ListGroup,\n        ListGroupItem,\n        FluroConfirmButton,\n        // FluroContentSelectButton,\n        // FluroContentSelectModal,\n    },\n    watch: {\n        'proposed.startDate': function() {\n            var self = this;\n            if (self.proposed.endDate < self.proposed.startDate) {\n                self.proposed.endDate = self.proposed.startDate;\n            }\n        }\n    },\n    computed: {\n        contextName() {\n\n            var name = this.model.preferredName || this.model.firstName || '';\n            if (!name || !name.length) {\n                return '';\n            }\n\n            if (_.endsWith(name, 's')) {\n                return `${name}'`\n            }\n            return `${name}'s`;\n        },\n        contactID() {\n            if (!this.model._id) {\n                return;\n            }\n\n            return this.$fluro.utils.getStringID(this.model);\n        },\n        contactTitle() {\n            return _.get(this.model, 'title') || '';\n        },\n        startDateMin() {\n            var self = this;\n            var today = new Date();\n\n            function pad(val) {\n                var res = val.toString()\n                if (res.length == 1) {\n                    return '0' + res;\n                } else {\n                    return res;\n                }\n            }\n\n            return today.getFullYear() + '-' + pad(today.getMonth() + 1) + '-' + pad(today.getDate())\n        },\n        endDateMin() {\n            var self = this;\n            var date = new Date(_.get(self.proposed, 'startDate'));\n\n            function pad(val) {\n                var res = val.toString()\n                if (res.length == 1) {\n                    return '0' + res;\n                } else {\n                    return res;\n                }\n            }\n\n            return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate())\n        },\n    },\n    filters: {\n        capitalize(str) {\n            return _.startCase(str);\n        },\n        // readableDate(obj) {\n        //     var self = this;\n\n        //     var start = self.$fluro.date.moment(obj.startDate).format('dddd, MMMM Do YYYY');\n        //     var end = self.$fluro.date.moment(obj.endDate).format('dddd, MMMM Do YYYY');\n        //     //console.log(start, end, obj.startDate, obj.endDate);\n        //     if (start == end) {\n        //         return self.$fluro.date.moment(obj.startDate).format('dddd, MMMM Do YYYY');\n        //     } else {\n        //         return self.$fluro.date.moment(obj.startDate).format('dddd, MMMM Do YYYY') + ' - ' + self.$fluro.date.moment(obj.endDate).format('dddd, MMMM Do YYYY')\n        //     }\n        // }\n    }\n}\n</script>\n<style lang=\"scss\">\n\n/**/\r\n\r\n$primary: #2ad4b9;//#0bd6be;\r\n$success: #4cc650; //#4cc673;//\r\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\r\n$danger: #d93e63;\r\n$secondary: #0bd6cd; //#0bd6a3;\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n\r\n.border-top {\r\n    border-top: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-right {\r\n    border-right: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-bottom {\r\n    border-bottom: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-left {\r\n    border-left: 1px solid rgba(#000, 0.05);\r\n}\r\n//////////////////////////////////////////\r\n\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n/**/\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n\n/*# sourceMappingURL=ContactUnavailabilityManager.vue.map */"]}, media: undefined });

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

//

var script$5 = {
  // props: {
  //     'fields': {
  //         type: Array,
  //     }
  // },
  mixins: [FluroContentEditMixin, FluroContactCommunicateMixin],
  components: {
    ContactTimeline,
    ContactMessageList,
    ContactTransactionList,
    ContactInteractionList,
    ContactCheckinList,
    ContactPostThread,
    ContactGroupManager,
    ContactProcessManager: __vue_component__$1,
    ContactCapabilityManager: __vue_component__$2,
    ContactRelationshipManager: __vue_component__$3,
    ContactUnavailabilityManager: __vue_component__$4,
    FluroAvatarUpdate,
    FluroRealmSelect,
    FluroAcademicSelect
  },
  methods: {
    ping(device) {
      var self = this;
      device.pinging = true;
      self.$fluro.api.get(`/push/ping/${device._id}`, {
        cache: false
      }).then(function (res) {
        device.pinging = false;
        self.$fluro.notify('Ping notification sent!');
      }).catch(function (err) {
        device.pinging = false;
        self.$fluro.error(err);
      });
    },

    resetDevices() {
      var self = this;
      self.$fluro.api.get(`/push/clear/${self.itemID}`, {
        cache: false
      }).then(function (res) {
        self.$fluro.notify('Devices Reset!');
        console.log('Reset');
      }).catch(function (err) {
        self.$fluro.error(err);
      });
    },

    toggleSubscription(type) {
      var self = this;

      switch (type) {
        case 'sms':
          if (self.unsubscribedSMS) {
            self.subscribe('sms');
          } else {
            self.unsubscribe('sms');
          }

          break;

        case 'mailout':
          if (self.unsubscribedMailout) {
            self.subscribe('mailout');
          } else {
            self.unsubscribe('mailout');
          }

          break;
      }
    },

    subscribe(type) {
      var self = this;
      var url;

      switch (type) {
        case 'mailout':
          if (!self.emails || !self.emails.length) {
            self.$fluro.error('No email addresses provided');
            return;
          }

          url = `/mailout/resubscribe`;
          break;

        case 'sms':
          if (!self.phoneNumbers || !self.phoneNumbers.length) {
            self.$fluro.error('No phone numbers provided');
            return;
          }

          url = `/sms/resubscribe`;
          break;
      } ///////////////////////


      self.$fluro.api.post(url, {
        phoneNumbers: self.phoneNumbers,
        emails: self.emails
      }).then(function () {
        self.subscriptionCacheKey = Math.random();
      });
    },

    unsubscribe(type) {
      var self = this;
      var url;

      switch (type) {
        case 'mailout':
          if (!self.emails || !self.emails.length) {
            self.$fluro.error('No email addresses provided');
            return;
          }

          url = `/mailout/unsubscribe`;
          break;

        case 'sms':
          if (!self.phoneNumbers || !self.phoneNumbers.length) {
            self.$fluro.error('No phone numbers provided');
            return;
          }

          url = `/sms/unsubscribe`;
          break;
      } ///////////////////////


      self.$fluro.api.post(url, {
        phoneNumbers: self.phoneNumbers,
        emails: self.emails
      }).then(function () {
        self.subscriptionCacheKey = Math.random();
      });
    },

    updateAcademicCalendar(calendar) {
      // console.log('ACADEMIC THING', calendar);
      var self = this;
      self.$set(self.model, 'academicCalendar', calendar);
      self.update(self.model);
    },

    updateAcademicGrade(grade) {
      // console.log('ACADEMIC GRADE', grade);
      var self = this;
      self.$set(self.model, 'academicGrade', grade);
      self.update(self.model);
    },

    updateFamily() {
      var self = this;

      var enteredValues = _.chain(self.family).get('address').values().compact().value();

      if (enteredValues && enteredValues.length) {
        self.$set(self.model, 'family', self.family);
      } else {
        self.$delete(self.model, 'family');
      } // console.log('Family Updated', self.mod el);

    },

    updateSheetRealms(realms, definitionName) {
      var self = this;
      var realms = self.$fluro.utils.arrayIDs(realms);
      var existingSheet = self.model.details[definitionName];

      if (!existingSheet) {
        self.$set(self.model.details, definitionName, {});
      }

      self.$set(self.model.details[definitionName], 'realms', realms);
    },

    updateSheet(entry, definitionName) {
      var self = this; ///////////////////////////////

      var existingSheet = self.model.details[definitionName];

      if (!existingSheet) {
        self.$set(self.model.details, definitionName, {});
      }

      self.$set(self.model.details[definitionName], 'data', entry); // if (!self.model.details[definitionName]) {
      //     self.$set(self.model.details, definitionName, {
      //         realms: [],
      //         data,
      //     });
      // } else {
      //     if (!_.keys(data).length) {
      //         self.model.details[definitionName] = null;
      //     } else {
      //         self.model.details[definitionName].data = data;
      //     }
      // }
    }

  },
  watch: {
    title(val) {
      this.$set(this.model, 'title', this.title); // this.model.title = val;

      this.update(this.model);
    }

  },

  created() {
    var self = this; // console.log('INITIAL ACADEMIC CALENDAR', self.model.academicCalendar);
    // console.log('INITIAL ACADEMIC GRADE', self.model.academicGrade);

    if (!self.model.academicCalendar) {
      self.$set(self.model, 'academicCalendar', '');
    }

    if (!self.model.academicGrade) {
      self.$set(self.model, 'academicGrade', '');
    } //////////////////////////////////////////////////////////////
    //When we first create the thing, we need to double check and see if we already have data
    //If we do already have data then we will use that
    //Check if there are detail sheets


    if (self.config && self.config.details && self.config.details.length) {
      //Each detail sheet we want to create a thing for it
      self.sheetDefinitions = _.reduce(self.config.details, function (set, definition) {
        if (!definition.fields || !definition.fields.length) {
          return set;
        } /////////////////////////////////////


        var definitionName = definition.definitionName; /////////////////////////////////////

        var field = {
          _id: definition._id,
          title: definition.title,
          type: 'group',
          key: definitionName,
          fields: definition.fields,
          asObject: true,
          minimum: 1,
          maximum: 1,
          askCount: 1
        }; ///////////////////////////////////////////////////////////////

        var extractedEntry = _.get(self.model, `details.${definitionName}`);

        var existingEntry = JSON.parse(JSON.stringify(extractedEntry || {}));
        var cleanedEntry = {
          realms: [],
          data: {}
        }; ///////////////////////////////////////////////////////////////

        if (existingEntry) {
          if (existingEntry.items && existingEntry.items.length) {
            var item = existingEntry.items[0];

            if (!item.data) {
              item.data = {};
            }

            if (!item.realms) {
              item.realms = [];
            }

            cleanedEntry = item;
          }
        } ///////////////////////////////////////////////////////////////


        self.$set(definition, 'dataModel', cleanedEntry); // self.$set(self.details, definitionName, cleanedEntry);
        ///////////////////////////////////////////////////////////////

        definition.field = field;
        set.push(definition);
        return set;
      }, []);

      if (!self.model.details) {
        self.model.details = {};
      } // console.log('dETAILS', self.details)

    }
  },

  asyncComputed: {
    contactDefinitions: {
      default: [],

      get() {
        var self = this; // if (!self.config || !self.config.details || !self.config.details.length) {
        //     return [];
        // }

        return new Promise(function (resolve, reject) {
          self.$fluro.types.subTypes('contact').then(function (definitions) {
            var definitions = _.chain(definitions).filter(function (definition) {
              // console.log('Contact Definition!', definition)
              return definition.status == 'active';
            }).map(function (definition, key) {
              return {
                _id: definition._id,
                name: definition.title,
                value: definition.definitionName
              };
            }).value(); // if(definitions.length) {
            //     definitions.unshift({
            //         name:'Basic Contact',
            //         value:null,
            //     })
            // }


            resolve(definitions);
          }).catch(reject);
        });
      }

    },
    devices: {
      default: [],

      get() {
        var self = this;

        if (self.context != 'edit' || !self.itemID) {
          return Promise.resolve([]);
        } //////////////////////////////////////


        return new Promise(function (resolve, reject) {
          self.$fluro.api.get(`/contact/${self.itemID}/devices`).then(function (res) {
            resolve(_.map(res.data, function (device) {
              device.pinging = false;
              return device;
            }));
          }).catch(function (err) {
            reject(err);
          });
        });
      }

    },
    smsUnsubscribes: {
      default: [],

      get() {
        var self = this;

        if (self.context != 'edit' || !self.itemID) {
          return Promise.resolve([]);
        } //////////////////////////////////////


        return new Promise(function (resolve, reject) {
          self.$fluro.api.get(`/contact/${self.itemID}/smsunsubscribes?${self.subscriptionCacheKey}`).then(function (res) {
            resolve(res.data);
          }).catch(function (err) {
            reject(err);
          });
        });
      }

    },
    mailoutUnsubscribes: {
      default: [],

      get() {
        var self = this;

        if (self.context != 'edit' || !self.itemID) {
          return Promise.resolve([]);
        } //////////////////////////////////////


        return new Promise(function (resolve, reject) {
          self.$fluro.api.get(`/contact/${self.itemID}/unsubscribes?${self.subscriptionCacheKey}`).then(function (res) {
            resolve(res.data);
          }).catch(function (err) {
            reject(err);
          });
        });
      }

    }
  },
  computed: {
    fieldsOutput() {
      var self = this;
      var array = []; ///////////////////////////////////

      addField('firstName', {
        title: 'First Name',
        minimum: 1,
        maximum: 1,
        type: 'string',
        placeholder: 'Eg. Jessica'
      });
      addField('preferredName', {
        title: 'Preferred/Nick Name',
        minimum: 0,
        maximum: 1,
        type: 'string',
        enabled: false,
        placeholder: `Eg. 'Jess'`
      });
      addField('middleName', {
        title: 'Middle Name',
        minimum: 0,
        maximum: 1,
        type: 'string',
        enabled: false,
        placeholder: `Eg. 'Heather'`
      });
      addField('ethnicName', {
        title: 'Ethnic Name',
        minimum: 0,
        maximum: 1,
        type: 'string',
        enabled: false,
        placeholder: `Eg. '吳爾霏'`
      });
      addField('maidenName', {
        title: 'Maiden Name',
        minimum: 0,
        maximum: 1,
        type: 'string',
        enabled: false,
        placeholder: `Eg. 'Johnson'`
      });
      addField('lastName', {
        title: 'Last Name',
        minimum: 1,
        maximum: 1,
        type: 'string',
        placeholder: 'Eg. Michaels'
      });
      addField('dob', {
        title: 'Date of Birth',
        minimum: 0,
        maximum: 1,
        type: 'date',
        directive: 'date-select'
      });
      addField('dobVerified', {
        title: 'Birthday type',
        minimum: 0,
        maximum: 1,
        type: 'boolean',
        directive: 'select',
        defaultValues: [false],
        options: [{
          name: `It's a Guess`,
          value: false
        }, {
          name: `It's Correct`,
          value: true
        }]
      });
      addField('family', {
        title: 'Household / Primary Residence',
        minimum: 0,
        maximum: 1,
        type: 'reference',
        directive: 'reference-select',
        params: {
          restrictType: 'family',
          template: {
            _context: 'contact',
            title: self.model.lastName || '',
            realms: self.model.realms
          }
        }
      });
      addField('householdRole', {
        title: 'Household Role',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'select',
        options: [{
          name: 'None',
          value: ''
        }, {
          name: 'Parent',
          value: 'parent'
        }, {
          name: 'Child',
          value: 'child'
        }],
        params: {
          restrictType: 'family'
        }
      });
      addField('deceased', {
        title: 'Mark as deceased',
        minimum: 0,
        maximum: 1,
        type: 'boolean',
        directive: 'checkbox'
      });
      addField('deceasedDate', {
        title: 'Deceased Date',
        minimum: 0,
        maximum: 1,
        type: 'date',
        directive: 'date-select'
      });

      var timezones = _.map(self.$fluro.date.timezones(), function (timezone) {
        return {
          name: timezone,
          value: timezone
        };
      });

      timezones.unshift({
        name: 'Use Account Default',
        value: ''
      });
      addField('gender', {
        title: 'Gender',
        minimum: 1,
        maximum: 1,
        type: 'string',
        directive: 'select',
        placeholder: '',
        // defaultValues: ['unknown'],
        options: [{
          name: 'Male',
          value: 'male'
        }, {
          name: 'Female',
          value: 'female'
        }, {
          name: 'Unknown',
          value: 'unknown'
        }]
      });
      addField('maritalStatus', {
        title: 'Marital Status',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'select',
        placeholder: '',
        options: [{
          name: 'None',
          value: ''
        }, {
          name: 'Single',
          value: 'single'
        }, {
          name: 'In a relationship',
          value: 'relationship'
        }, {
          name: 'Married',
          value: 'married'
        }, {
          name: 'Widowed',
          value: 'widowed'
        }, {
          name: 'Separated',
          value: 'separated'
        }, {
          name: 'Divorced',
          value: 'divorced'
        }]
      }); ///////////////////////////////////

      addField('emails', {
        title: 'Email Address',
        minimum: 0,
        maximum: 0,
        type: 'email',
        // directive:'select',
        placeholder: ''
      });
      addField('phoneNumbers', {
        title: 'Phone Number',
        minimum: 0,
        maximum: 0,
        type: 'string',
        // directive:'select',
        placeholder: '+61 400 123 456'
      }); ///////////////////////////////////

      addField('timezone', {
        title: 'Primary Timezone',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'timezone-select',
        description: 'Set a local timezone for this contact'
      });
      addField('countryCode', {
        title: 'Default Country Code',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'countrycodeselect'
      }); ///////////////////////////////////

      addField('nametagNotes', {
        title: 'Checkin Nametag Notes',
        minimum: 0,
        maximum: 1,
        type: 'string'
      }); ///////////////////////////////////

      addField('capabilities', {
        title: 'Capabilities',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        description: 'Add capabilities for this contact',
        params: {
          restrictType: 'capability'
        }
      }); ///////////////////////////////////

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

    formOptions() {
      return {};
    },

    title() {
      if (!this.model) {
        return '';
      }

      if (this.model.preferredName) {
        return `${this.model.preferredName} ${this.model.lastName || ''}`;
      }

      if (this.model.firstName) {
        return `${this.model.firstName} ${this.model.lastName || ''}`;
      }

      return '';
    },

    phoneNumbers() {
      return this.model.phoneNumbers;
    },

    emails() {
      return this.model.emails;
    },

    unsubscribedMailout() {
      return this.mailoutUnsubscribes.length ? true : false;
    },

    unsubscribedSMS() {
      return this.smsUnsubscribes.length ? true : false;
    },

    contextName() {
      var name = this.model.preferredName || this.model.firstName || '';

      if (!name || !name.length) {
        return '';
      }

      if (_.endsWith(name, 's')) {
        return `${name}'`;
      }

      return `${name}'s`;
    },

    definitionField() {
      var self = this; ///////////////////////////////////

      return {
        title: 'Contact Type / Definition',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'select',
        key: 'definition',
        options: self.contactDefinitions
      };
    },

    showOutline() {
      return false; //true; //false;//true;//false;//true;
    },

    showPreferredName() {
      return this.model.preferredName && this.model.preferredName.length || this.show.preferredName;
    },

    showEthnicName() {
      return this.model.ethnicName && this.model.ethnicName.length || this.show.ethnicName;
    },

    showMiddleName() {
      return this.model.middleName && this.model.middleName.length || this.show.middleName;
    },

    showMaidenName() {
      return this.model.maidenName && this.model.maidenName.length || this.show.maidenName;
    }

  },

  data() {
    return {
      // loadingDetails: true,
      // loadingDefinitions: true,
      subscriptionCacheKey: 0,
      sheetDefinitions: [],
      details: {},
      detailsModel: {},
      family: {},
      show: {
        preferredName: false,
        middleName: false,
        ethnicName: false,
        maidenName: false
      },
      familyFields: [{
        title: 'Name of household',
        key: 'title',
        minimum: 0,
        maximum: 1,
        "expressions": {
          defaultValue: 'data.lastName'
        }
      }, {
        title: 'Address',
        key: 'address',
        minimum: 1,
        maximum: 1,
        askCount: 1,
        type: 'group',
        asObject: true,
        fields: [{
          title: 'Street Address Line 1',
          key: 'addressLine1',
          minimum: 0,
          maximum: 1
        }, {
          title: 'Address Line 2',
          key: 'addressLine2',
          minimum: 0,
          maximum: 1,
          "expressions": {
            hide: '!data.addressLine1.length' // defaultValue:'data.addressLine1.length',

          },
          className: 'xs12 sm6'
        }, {
          type: 'group',
          "minimum": 1,
          "askCount": 1,
          "maximum": 1,
          sameLine: 1,
          fields: [{
            title: 'Suburb',
            key: 'suburb',
            minimum: 0,
            maximum: 1,
            className: "xs12 sm4"
          }, {
            title: 'State',
            key: 'state',
            minimum: 0,
            maximum: 1,
            className: "xs12 sm4"
          }, {
            title: 'Postal Code',
            key: 'postalCode',
            minimum: 0,
            maximum: 1,
            className: "xs12 sm4"
          }]
        }]
      }]
    };
  }

};

/* script */
const __vue_script__$5 = script$5;

/* template */
var __vue_render__$5 = function() {
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
                      _vm.context == "edit" && _vm.$vuetify.breakpoint.mdAndUp
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
                                        type: "contact"
                                      }
                                    })
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "v-container",
                                  {
                                    staticClass: "border-bottom text-xs-center",
                                    attrs: { "px-0": "", fluid: "" }
                                  },
                                  [
                                    _c(
                                      "v-btn",
                                      {
                                        directives: [
                                          { name: "tippy", rawName: "v-tippy" }
                                        ],
                                        staticClass: "ma-0 mx-1 ml-0",
                                        attrs: {
                                          disabled: !_vm.canEmail,
                                          icon: "",
                                          color: "primary",
                                          content: "Send Email"
                                        },
                                        on: {
                                          click: function($event) {
                                            return _vm.communicate("email")
                                          }
                                        }
                                      },
                                      [
                                        _c("fluro-icon", {
                                          attrs: {
                                            library: "fas",
                                            icon: "envelope"
                                          }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "v-btn",
                                      {
                                        directives: [
                                          { name: "tippy", rawName: "v-tippy" }
                                        ],
                                        staticClass: "ma-0 mx-1",
                                        attrs: {
                                          disabled: !_vm.canSMS,
                                          icon: "",
                                          color: "primary",
                                          content: "Send SMS"
                                        },
                                        on: {
                                          click: function($event) {
                                            return _vm.communicate("sms")
                                          }
                                        }
                                      },
                                      [
                                        _c("fluro-icon", {
                                          attrs: {
                                            library: "fas",
                                            icon: "comment"
                                          }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "v-btn",
                                      {
                                        directives: [
                                          { name: "tippy", rawName: "v-tippy" }
                                        ],
                                        staticClass: "ma-0 mx-1",
                                        attrs: {
                                          disabled: !_vm.canCall,
                                          icon: "",
                                          color: "primary",
                                          content: "Call"
                                        },
                                        on: {
                                          click: function($event) {
                                            return _vm.communicate("phone")
                                          }
                                        }
                                      },
                                      [
                                        _c("fluro-icon", {
                                          attrs: {
                                            library: "fas",
                                            icon: "phone"
                                          }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "v-btn",
                                      {
                                        directives: [
                                          { name: "tippy", rawName: "v-tippy" }
                                        ],
                                        staticClass: "ma-0 mx-1",
                                        attrs: {
                                          disabled: !_vm.canPost,
                                          icon: "",
                                          color: "primary",
                                          content: "Add Post/Note"
                                        },
                                        on: { click: _vm.addPost }
                                      },
                                      [
                                        _c("fluro-icon", {
                                          attrs: {
                                            library: "fas",
                                            type: "post"
                                          }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "v-btn",
                                      {
                                        directives: [
                                          { name: "tippy", rawName: "v-tippy" }
                                        ],
                                        staticClass: "ma-0 mx-1 mr-0",
                                        attrs: {
                                          icon: "",
                                          color: "primary",
                                          content: "Add to Address Book"
                                        },
                                        on: {
                                          click: function($event) {
                                            return _vm.communicate("vcard")
                                          }
                                        }
                                      },
                                      [
                                        _c("fluro-icon", {
                                          attrs: {
                                            library: "fas",
                                            icon: "address-book"
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
                { attrs: { heading: "Basic Details" } },
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
                                _c("h3", { attrs: { margin: "" } }, [
                                  _vm._v("Basic Details")
                                ]),
                                _vm._v(" "),
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
                                                    type: "contact"
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
                                _c(
                                  "wrapper",
                                  { attrs: { xs: "" } },
                                  [
                                    _c(
                                      "v-layout",
                                      { attrs: { row: "", wrap: "" } },
                                      [
                                        _c(
                                          "v-flex",
                                          {
                                            class: {
                                              xs12:
                                                _vm.$vuetify.breakpoint.xsOnly
                                            }
                                          },
                                          [
                                            _c("fluro-content-form-field", {
                                              staticClass: "right-messages",
                                              attrs: {
                                                autofocus:
                                                  _vm.$vuetify.breakpoint
                                                    .smAndUp,
                                                "form-fields": _vm.formFields,
                                                outline: _vm.showOutline,
                                                options: _vm.formOptions,
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
                                            }),
                                            _vm._v(" "),
                                            _vm.showPreferredName
                                              ? _c("fluro-content-form-field", {
                                                  staticClass: "right-messages",
                                                  attrs: {
                                                    "form-fields":
                                                      _vm.formFields,
                                                    outline: _vm.showOutline,
                                                    options: _vm.formOptions,
                                                    field:
                                                      _vm.fieldHash
                                                        .preferredName
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
                                              : _vm._e(),
                                            _vm._v(" "),
                                            _vm.showEthnicName
                                              ? _c("fluro-content-form-field", {
                                                  staticClass: "right-messages",
                                                  attrs: {
                                                    "form-fields":
                                                      _vm.formFields,
                                                    outline: _vm.showOutline,
                                                    options: _vm.formOptions,
                                                    field:
                                                      _vm.fieldHash.ethnicName
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
                                              : _vm._e(),
                                            _vm._v(" "),
                                            _c(
                                              "div",
                                              { staticClass: "additions" },
                                              [
                                                !_vm.showPreferredName
                                                  ? _c(
                                                      "a",
                                                      {
                                                        staticClass: "hint",
                                                        on: {
                                                          click: function(
                                                            $event
                                                          ) {
                                                            _vm.show.preferredName = true;
                                                          }
                                                        }
                                                      },
                                                      [
                                                        _vm._v(
                                                          "Add Nick/Preferred Name"
                                                        )
                                                      ]
                                                    )
                                                  : _vm._e(),
                                                _vm._v(" "),
                                                !_vm.showEthnicName
                                                  ? _c(
                                                      "a",
                                                      {
                                                        staticClass: "hint",
                                                        on: {
                                                          click: function(
                                                            $event
                                                          ) {
                                                            _vm.show.ethnicName = true;
                                                          }
                                                        }
                                                      },
                                                      [
                                                        _vm._v(
                                                          "Add Ethnic Name"
                                                        )
                                                      ]
                                                    )
                                                  : _vm._e()
                                              ]
                                            )
                                          ],
                                          1
                                        ),
                                        _vm._v(" "),
                                        _vm.showMiddleName
                                          ? _c(
                                              "v-flex",
                                              {
                                                class: {
                                                  xs12:
                                                    _vm.$vuetify.breakpoint
                                                      .xsOnly
                                                }
                                              },
                                              [
                                                _c("fluro-content-form-field", {
                                                  attrs: {
                                                    "form-fields":
                                                      _vm.formFields,
                                                    outline: _vm.showOutline,
                                                    options: _vm.formOptions,
                                                    field:
                                                      _vm.fieldHash.middleName
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
                                          : _vm._e(),
                                        _vm._v(" "),
                                        _c(
                                          "v-flex",
                                          {
                                            class: {
                                              xs12:
                                                _vm.$vuetify.breakpoint.xsOnly
                                            }
                                          },
                                          [
                                            _c("fluro-content-form-field", {
                                              staticClass: "right-messages",
                                              attrs: {
                                                "form-fields": _vm.formFields,
                                                outline: _vm.showOutline,
                                                options: _vm.formOptions,
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
                                            }),
                                            _vm._v(" "),
                                            _vm.showMaidenName
                                              ? _c("fluro-content-form-field", {
                                                  staticClass: "right-messages",
                                                  attrs: {
                                                    "form-fields":
                                                      _vm.formFields,
                                                    outline: _vm.showOutline,
                                                    options: _vm.formOptions,
                                                    field:
                                                      _vm.fieldHash.maidenName
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
                                              : _vm._e(),
                                            _vm._v(" "),
                                            _c(
                                              "div",
                                              { staticClass: "additions" },
                                              [
                                                !_vm.showMiddleName
                                                  ? _c(
                                                      "a",
                                                      {
                                                        staticClass: "hint",
                                                        on: {
                                                          click: function(
                                                            $event
                                                          ) {
                                                            _vm.show.middleName = true;
                                                          }
                                                        }
                                                      },
                                                      [
                                                        _vm._v(
                                                          "Add Middle Name"
                                                        )
                                                      ]
                                                    )
                                                  : _vm._e(),
                                                _vm._v(" "),
                                                !_vm.showMaidenName
                                                  ? _c(
                                                      "a",
                                                      {
                                                        staticClass: "hint",
                                                        on: {
                                                          click: function(
                                                            $event
                                                          ) {
                                                            _vm.show.maidenName = true;
                                                          }
                                                        }
                                                      },
                                                      [
                                                        _vm._v(
                                                          "Add Maiden Name"
                                                        )
                                                      ]
                                                    )
                                                  : _vm._e()
                                              ]
                                            )
                                          ],
                                          1
                                        )
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _vm.contactDefinitions.length
                                      ? [
                                          _c("fluro-content-form-field", {
                                            attrs: {
                                              "form-fields": _vm.formFields,
                                              outline: _vm.showOutline,
                                              options: _vm.formOptions,
                                              field: _vm.definitionField
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
                                        ]
                                      : _vm._e()
                                  ],
                                  2
                                ),
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
                                            "form-fields": _vm.formFields,
                                            outline: _vm.showOutline,
                                            options: _vm.formOptions,
                                            field: _vm.fieldHash.gender
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
                                            options: _vm.formOptions,
                                            field: _vm.fieldHash.maritalStatus
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
                                            "form-fields": _vm.formFields,
                                            options: _vm.formOptions,
                                            field: _vm.fieldHash.emails
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
                                            options: _vm.formOptions,
                                            field: _vm.fieldHash.phoneNumbers
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
                                _c(
                                  "v-layout",
                                  { attrs: { row: "", wrap: "" } },
                                  [
                                    _c(
                                      "v-flex",
                                      { attrs: { xs12: "", sm6: "" } },
                                      [
                                        _c(
                                          "v-layout",
                                          { attrs: { row: "", wrap: "" } },
                                          [
                                            _c(
                                              "v-flex",
                                              { attrs: { xs6: "" } },
                                              [
                                                _c("fluro-content-form-field", {
                                                  attrs: {
                                                    "form-fields":
                                                      _vm.formFields,
                                                    outline: _vm.showOutline,
                                                    options: _vm.formOptions,
                                                    field: _vm.fieldHash.dob
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
                                              { attrs: { xs6: "" } },
                                              [
                                                _c("fluro-content-form-field", {
                                                  attrs: {
                                                    "form-fields":
                                                      _vm.formFields,
                                                    outline: _vm.showOutline,
                                                    options: _vm.formOptions,
                                                    field:
                                                      _vm.fieldHash.dobVerified
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
                                            options: _vm.formOptions,
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
                                        })
                                      ],
                                      1
                                    )
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "wrapper",
                                  { attrs: { xs: "" } },
                                  [
                                    _c(
                                      "v-input",
                                      { staticClass: "no-flex" },
                                      [
                                        _c("v-label", [
                                          _vm._v("School / Academic Details")
                                        ]),
                                        _vm._v(" "),
                                        _c("fluro-academic-select", {
                                          attrs: {
                                            "form-fields": _vm.formFields,
                                            outline: _vm.showOutline,
                                            options: _vm.formOptions
                                          },
                                          on: {
                                            calendar:
                                              _vm.updateAcademicCalendar,
                                            grade: _vm.updateAcademicGrade
                                          },
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
                                      "v-input",
                                      { staticClass: "no-flex" },
                                      [
                                        _c("v-label", [
                                          _vm._v("Checkin Nametag Notes")
                                        ]),
                                        _vm._v(" "),
                                        _c("p", { staticClass: "help-block" }, [
                                          _vm._v(
                                            "Publicly displayed notes to be printed on " +
                                              _vm._s(_vm.contextName) +
                                              " nametag"
                                          )
                                        ]),
                                        _vm._v(" "),
                                        _c("fluro-content-form-field", {
                                          attrs: {
                                            "form-fields": _vm.formFields,
                                            showLabel: false,
                                            outline: _vm.showOutline,
                                            options: _vm.formOptions,
                                            field: _vm.fieldHash.nametagNotes
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
              _vm.itemID
                ? _c(
                    "tab",
                    { attrs: { heading: "Activity Timeline" } },
                    [
                      _c(
                        "tabset",
                        {
                          staticClass: "timeline-tabset",
                          attrs: { justified: true }
                        },
                        [
                          _c(
                            "tab",
                            {
                              attrs: {
                                tooltip: "Activity Timeline",
                                icon: { icon: "user-clock" }
                              }
                            },
                            [
                              _c("contact-timeline", {
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
                            "tab",
                            {
                              attrs: {
                                tooltip: "Form Submissions",
                                icon: { type: "form" }
                              }
                            },
                            [
                              _c("contact-interaction-list", {
                                attrs: { contact: _vm.model }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "tab",
                            {
                              attrs: {
                                tooltip: "Attendance",
                                icon: { type: "checkin" }
                              }
                            },
                            [
                              _c("contact-checkin-list", {
                                attrs: { contact: _vm.model }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "tab",
                            {
                              attrs: {
                                tooltip: "Messaging",
                                icon: { icon: "envelope" }
                              }
                            },
                            [
                              _c("contact-message-list", {
                                attrs: { contact: _vm.model }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "tab",
                            {
                              attrs: {
                                tooltip: "Transactions",
                                icon: { type: "transaction" }
                              }
                            },
                            [
                              _c("contact-transaction-list", {
                                attrs: { contact: _vm.model }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "tab",
                            {
                              attrs: {
                                tooltip: "Posts and Notes",
                                icon: { type: "post" }
                              }
                            },
                            [
                              _c("contact-post-thread", {
                                attrs: { contact: _vm.model }
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
                : _vm._e(),
              _vm._v(" "),
              _c(
                "tab",
                { attrs: { heading: "Household & Relationships" } },
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
                                _vm.context == "edit"
                                  ? [
                                      _c("h3", { attrs: { margin: "" } }, [
                                        _vm._v("Household / Residence")
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
                                                  "override-label":
                                                    _vm.contextName +
                                                    " Household Role",
                                                  "form-fields": _vm.formFields,
                                                  outline: _vm.showOutline,
                                                  options: _vm.formOptions,
                                                  field:
                                                    _vm.fieldHash.householdRole
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
                                      _c(
                                        "v-input",
                                        { staticClass: "no-flex" },
                                        [
                                          _c("v-label", [
                                            _vm._v("Family Household")
                                          ]),
                                          _vm._v(" "),
                                          _c(
                                            "p",
                                            { staticClass: "help-block" },
                                            [
                                              _vm._v(
                                                "Select " +
                                                  _vm._s(_vm.contextName) +
                                                  " primary residence"
                                              )
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("fluro-content-form-field", {
                                            attrs: {
                                              "form-fields": _vm.formFields,
                                              showLabel: false,
                                              outline: _vm.showOutline,
                                              options: _vm.formOptions,
                                              field: _vm.fieldHash.family
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
                                    ]
                                  : [
                                      _c("h3", { attrs: { margin: "" } }, [
                                        _vm._v("Household")
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
                                                  "override-label":
                                                    _vm.contextName +
                                                    " Household Role",
                                                  "form-fields": _vm.formFields,
                                                  outline: _vm.showOutline,
                                                  options: _vm.formOptions,
                                                  field:
                                                    _vm.fieldHash.householdRole
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
                                      !_vm.model._id
                                        ? _c(
                                            "fluro-panel",
                                            [
                                              _c(
                                                "tabset",
                                                [
                                                  _c(
                                                    "tab",
                                                    {
                                                      attrs: {
                                                        heading:
                                                          "Create new Household"
                                                      }
                                                    },
                                                    [
                                                      _c(
                                                        "v-container",
                                                        [
                                                          _c(
                                                            "fluro-content-form",
                                                            {
                                                              attrs: {
                                                                options:
                                                                  _vm.formOptions,
                                                                fields:
                                                                  _vm.familyFields
                                                              },
                                                              on: {
                                                                input:
                                                                  _vm.updateFamily
                                                              },
                                                              model: {
                                                                value:
                                                                  _vm.family,
                                                                callback: function(
                                                                  $$v
                                                                ) {
                                                                  _vm.family = $$v;
                                                                },
                                                                expression:
                                                                  "family"
                                                              }
                                                            }
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
                                                          "Add to existing Household"
                                                      }
                                                    },
                                                    [
                                                      _c(
                                                        "v-container",
                                                        [
                                                          _c(
                                                            "v-input",
                                                            {
                                                              staticClass:
                                                                "no-flex"
                                                            },
                                                            [
                                                              _c("v-label", [
                                                                _vm._v(
                                                                  "Family Household"
                                                                )
                                                              ]),
                                                              _vm._v(" "),
                                                              _c(
                                                                "p",
                                                                {
                                                                  staticClass:
                                                                    "help-block"
                                                                },
                                                                [
                                                                  _vm._v(
                                                                    "Select " +
                                                                      _vm._s(
                                                                        _vm.contextName
                                                                      ) +
                                                                      " primary residence"
                                                                  )
                                                                ]
                                                              ),
                                                              _vm._v(" "),
                                                              _c(
                                                                "fluro-content-form-field",
                                                                {
                                                                  attrs: {
                                                                    "form-fields":
                                                                      _vm.formFields,
                                                                    showLabel: false,
                                                                    outline:
                                                                      _vm.showOutline,
                                                                    options:
                                                                      _vm.formOptions,
                                                                    field:
                                                                      _vm
                                                                        .fieldHash
                                                                        .family
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
                                                ],
                                                1
                                              )
                                            ],
                                            1
                                          )
                                        : [
                                            _c(
                                              "v-input",
                                              { staticClass: "no-flex" },
                                              [
                                                _c("v-label", [
                                                  _vm._v("Family Household")
                                                ]),
                                                _vm._v(" "),
                                                _c(
                                                  "p",
                                                  { staticClass: "help-block" },
                                                  [
                                                    _vm._v(
                                                      "Select " +
                                                        _vm._s(
                                                          _vm.contextName
                                                        ) +
                                                        " primary residence"
                                                    )
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                _c("fluro-content-form-field", {
                                                  attrs: {
                                                    "form-fields":
                                                      _vm.formFields,
                                                    showLabel: false,
                                                    outline: _vm.showOutline,
                                                    options: _vm.formOptions,
                                                    field: _vm.fieldHash.family
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
                                          ]
                                    ],
                                _vm._v(" "),
                                _c("h3", { attrs: { margin: "" } }, [
                                  _vm._v("Relationships")
                                ]),
                                _vm._v(" "),
                                _c("contact-relationship-manager", {
                                  model: {
                                    value: _vm.model,
                                    callback: function($$v) {
                                      _vm.model = $$v;
                                    },
                                    expression: "model"
                                  }
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
                  ])
                ],
                2
              ),
              _vm._v(" "),
              _vm.model._id
                ? _c(
                    "tab",
                    { attrs: { heading: "Groups & Teams" } },
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
                                      _vm._v(
                                        _vm._s(_vm.contextName) +
                                          " Groups & Teams"
                                      )
                                    ]),
                                    _vm._v(" "),
                                    _c("contact-group-manager", {
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
                      ])
                    ],
                    2
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.model._id
                ? _c(
                    "tab",
                    { attrs: { heading: "Processes" } },
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
                                      _vm._v(
                                        _vm._s(_vm.contextName) + " Progress"
                                      )
                                    ]),
                                    _vm._v(" "),
                                    _c("contact-process-manager", {
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
                      ])
                    ],
                    2
                  )
                : _vm._e(),
              _vm._v(" "),
              _c(
                "tab",
                { attrs: { heading: "Capabilities" } },
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
                                    _vm._s(_vm.contextName) + " Capabilities"
                                  )
                                ]),
                                _vm._v(" "),
                                _c("contact-capability-manager", {
                                  model: {
                                    value: _vm.model.capabilities,
                                    callback: function($$v) {
                                      _vm.$set(_vm.model, "capabilities", $$v);
                                    },
                                    expression: "model.capabilities"
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
              _vm.context == "edit"
                ? _c(
                    "tab",
                    { attrs: { heading: "Rostering / Availability" } },
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
                                _c("constrain", { attrs: { sm: "" } }, [
                                  _vm.model._id
                                    ? _c(
                                        "div",
                                        [
                                          _c("h3", { attrs: { margin: "" } }, [
                                            _vm._v(
                                              _vm._s(_vm.contextName) +
                                                " Unavailability"
                                            )
                                          ]),
                                          _vm._v(" "),
                                          _c("contact-unavailability-manager", {
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
                                ])
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
                : _vm._e(),
              _vm._v(" "),
              _vm.context == "edit"
                ? _c(
                    "tab",
                    { attrs: { heading: "Notifications" } },
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
                                      _vm._v("Notifications")
                                    ]),
                                    _vm._v(" "),
                                    _c("fluro-content-form-field", {
                                      attrs: {
                                        "form-fields": _vm.formFields,
                                        outline: _vm.showOutline,
                                        options: _vm.formOptions,
                                        field: _vm.fieldHash.countryCode
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
                                    _vm.phoneNumbers.length || _vm.emails.length
                                      ? _c(
                                          "v-input",
                                          { staticClass: "no-flex" },
                                          [
                                            _c("v-label", [
                                              _vm._v(
                                                "Communication Preferences"
                                              )
                                            ]),
                                            _vm._v(" "),
                                            _c(
                                              "p",
                                              { staticClass: "help-block" },
                                              [
                                                _vm._v(
                                                  "Manage " +
                                                    _vm._s(_vm.contextName) +
                                                    " subscription preferences below"
                                                )
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "div",
                                              { staticClass: "toggle-items" },
                                              [
                                                _vm.emails.length
                                                  ? [
                                                      _c(
                                                        "fluro-toggle-item",
                                                        {
                                                          attrs: {
                                                            inactive:
                                                              _vm.unsubscribedMailout
                                                          },
                                                          nativeOn: {
                                                            click: function(
                                                              $event
                                                            ) {
                                                              return _vm.toggleSubscription(
                                                                "mailout"
                                                              )
                                                            }
                                                          }
                                                        },
                                                        [
                                                          _vm._v(
                                                            "\n\t\t\t\t\t\t\t\t\t\t\t\tAllow Promotional Emails\n\t\t\t\t\t\t\t\t\t\t\t"
                                                          )
                                                        ]
                                                      )
                                                    ]
                                                  : _vm._e(),
                                                _vm._v(" "),
                                                _vm.phoneNumbers.length
                                                  ? [
                                                      _c(
                                                        "fluro-toggle-item",
                                                        {
                                                          attrs: {
                                                            inactive:
                                                              _vm.unsubscribedSMS
                                                          },
                                                          nativeOn: {
                                                            click: function(
                                                              $event
                                                            ) {
                                                              return _vm.toggleSubscription(
                                                                "sms"
                                                              )
                                                            }
                                                          }
                                                        },
                                                        [
                                                          _vm._v(
                                                            "\n\t\t\t\t\t\t\t\t\t\t\t\tAllow Promotional SMS\n\t\t\t\t\t\t\t\t\t\t\t"
                                                          )
                                                        ]
                                                      )
                                                    ]
                                                  : _vm._e()
                                              ],
                                              2
                                            )
                                          ],
                                          1
                                        )
                                      : _vm._e(),
                                    _vm._v(" "),
                                    _c("p"),
                                    _vm._v(" "),
                                    _vm.devices.length
                                      ? _c(
                                          "v-input",
                                          { staticClass: "no-flex" },
                                          [
                                            _c("v-label", [
                                              _vm._v(
                                                _vm._s(_vm.contextName) +
                                                  " Connected Devices"
                                              )
                                            ]),
                                            _vm._v(" "),
                                            _c(
                                              "list-group",
                                              _vm._l(_vm.devices, function(
                                                device
                                              ) {
                                                return _c("list-group-item", {
                                                  scopedSlots: _vm._u(
                                                    [
                                                      {
                                                        key: "left",
                                                        fn: function() {
                                                          return [
                                                            _c("fluro-icon", {
                                                              attrs: {
                                                                icon: "mobile"
                                                              }
                                                            })
                                                          ]
                                                        },
                                                        proxy: true
                                                      },
                                                      {
                                                        key: "default",
                                                        fn: function() {
                                                          return [
                                                            _c("div", [
                                                              _c(
                                                                "strong",
                                                                {
                                                                  staticClass:
                                                                    "text-capitalize"
                                                                },
                                                                [
                                                                  _vm._v(
                                                                    "\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t" +
                                                                      _vm._s(
                                                                        device.application
                                                                      ) +
                                                                      " - " +
                                                                      _vm._s(
                                                                        device
                                                                          .metadata
                                                                          .model
                                                                      ) +
                                                                      "\n\t\t\t\t\t\t\t\t\t\t\t\t\t"
                                                                  )
                                                                ]
                                                              ),
                                                              _vm._v(" "),
                                                              _c(
                                                                "div",
                                                                {
                                                                  staticClass:
                                                                    "sm text-muted"
                                                                },
                                                                [
                                                                  _vm._v(
                                                                    _vm._s(
                                                                      device
                                                                        .metadata
                                                                        .platform
                                                                    ) +
                                                                      " " +
                                                                      _vm._s(
                                                                        device
                                                                          .metadata
                                                                          .version
                                                                      )
                                                                  )
                                                                ]
                                                              )
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
                                                                attrs: {
                                                                  small: "",
                                                                  loading:
                                                                    device.pinging
                                                                },
                                                                on: {
                                                                  click: function(
                                                                    $event
                                                                  ) {
                                                                    return _vm.ping(
                                                                      device
                                                                    )
                                                                  }
                                                                }
                                                              },
                                                              [
                                                                _vm._v(
                                                                  "\n\t\t\t\t\t\t\t\t\t\t\t\t\tPing\n\t\t\t\t\t\t\t\t\t\t\t\t"
                                                                )
                                                              ]
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
                                            _c(
                                              "p",
                                              { staticClass: "help-block" },
                                              [
                                                _vm._v(
                                                  "\n\t\t\t\t\t\t\t\t\t\tIf you are experiencing problems with push notifications it can sometimes be helpful to reset all devices for a contact allowing them to reconnect next time they sign in to an application\n\t\t\t\t\t\t\t\t\t"
                                                )
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "v-btn",
                                              {
                                                attrs: { small: "" },
                                                on: {
                                                  click: function($event) {
                                                    return _vm.resetDevices()
                                                  }
                                                }
                                              },
                                              [
                                                _c("span", [
                                                  _vm._v("Reset all devices")
                                                ]),
                                                _vm._v(" "),
                                                _c("fluro-icon", {
                                                  attrs: { icon: "trash" }
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
                            )
                          ],
                          1
                        )
                      ])
                    ],
                    2
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm._l(_vm.sheetDefinitions, function(sheet) {
                return _c(
                  "tab",
                  { key: sheet._id, attrs: { heading: sheet.title } },
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
                                    _vm._v(_vm._s(sheet.title))
                                  ]),
                                  _vm._v(" "),
                                  _c(
                                    "v-input",
                                    { staticClass: "no-flex" },
                                    [
                                      _c("v-label", [_vm._v("Realms")]),
                                      _vm._v(" "),
                                      _c("p", { staticClass: "help-block" }, [
                                        _vm._v(
                                          "Select where " +
                                            _vm._s(_vm.contextName) +
                                            " " +
                                            _vm._s(sheet.title) +
                                            " information should be stored"
                                        )
                                      ]),
                                      _vm._v(" "),
                                      _c("fluro-realm-select", {
                                        attrs: {
                                          type: "contactdetail",
                                          definition: sheet.definitionName
                                        },
                                        on: {
                                          input: function($event) {
                                            return _vm.updateSheetRealms(
                                              $event,
                                              sheet.definitionName
                                            )
                                          }
                                        },
                                        model: {
                                          value: sheet.dataModel.realms,
                                          callback: function($$v) {
                                            _vm.$set(
                                              sheet.dataModel,
                                              "realms",
                                              $$v
                                            );
                                          },
                                          expression: "sheet.dataModel.realms"
                                        }
                                      })
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c("fluro-content-form", {
                                    attrs: {
                                      options: _vm.formOptions,
                                      fields: sheet.fields
                                    },
                                    on: {
                                      input: function($event) {
                                        return _vm.updateSheet(
                                          $event,
                                          sheet.definitionName
                                        )
                                      }
                                    },
                                    model: {
                                      value: sheet.dataModel.data,
                                      callback: function($$v) {
                                        _vm.$set(sheet.dataModel, "data", $$v);
                                      },
                                      expression: "sheet.dataModel.data"
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
              }),
              _vm._v(" "),
              _vm.context == "edit"
                ? _c(
                    "tab",
                    { attrs: { heading: "Metadata" } },
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
                                      _vm._v("Metadata")
                                    ]),
                                    _vm._v(" "),
                                    _c("fluro-content-form-field", {
                                      attrs: {
                                        "form-fields": _vm.formFields,
                                        outline: _vm.showOutline,
                                        options: _vm.formOptions,
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
                                    _c(
                                      "v-layout",
                                      [
                                        _c(
                                          "v-flex",
                                          [
                                            _c("fluro-content-form-field", {
                                              attrs: {
                                                "form-fields": _vm.formFields,
                                                outline: _vm.showOutline,
                                                options: _vm.formOptions,
                                                field: _vm.fieldHash.deceased
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
                                          {
                                            directives: [
                                              {
                                                name: "show",
                                                rawName: "v-show",
                                                value: _vm.model.deceased,
                                                expression: "model.deceased"
                                              }
                                            ]
                                          },
                                          [
                                            _c("fluro-content-form-field", {
                                              attrs: {
                                                "form-fields": _vm.formFields,
                                                outline: _vm.showOutline,
                                                options: _vm.formOptions,
                                                field:
                                                  _vm.fieldHash.deceasedDate
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
                                    _vm.model.data
                                      ? _c(
                                          "div",
                                          [
                                            _c(
                                              "v-card",
                                              [
                                                _c(
                                                  "v-card-text",
                                                  [
                                                    _c("h5", [
                                                      _vm._v("Explore Metadata")
                                                    ]),
                                                    _vm._v(" "),
                                                    _c("json-view", {
                                                      attrs: {
                                                        deep: 3,
                                                        data: _vm.model.data
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
                      ])
                    ],
                    2
                  )
                : _vm._e()
            ],
            2
          )
    ],
    2
  )
};
var __vue_staticRenderFns__$5 = [];
__vue_render__$5._withStripped = true;

  /* style */
  const __vue_inject_styles__$5 = function (inject) {
    if (!inject) return
    inject("data-v-686aece0_0", { source: "/**/\n.border-top[data-v-686aece0] {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right[data-v-686aece0] {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom[data-v-686aece0] {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left[data-v-686aece0] {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.hint[data-v-686aece0] {\n  font-size: 10px;\n  opacity: 0.5;\n  color: inherit;\n  display: block;\n}\n.bordered[data-v-686aece0] {\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.bordered > > > .tabset-menu[data-v-686aece0] {\n  background: #eee;\n}\n\n/*# sourceMappingURL=contact.vue.map */", map: {"version":3,"sources":["C:\\Users\\User\\Documents\\fluro\\fluro-vue-ui\\src\\components\\content\\edit\\panels\\contact.vue","contact.vue"],"names":[],"mappings":"AAm4CA,GAAA;AAYA;EACA,yCAAA;AC74CA;ADg5CA;EACA,2CAAA;AC74CA;ADg5CA;EACA,4CAAA;AC74CA;ADg5CA;EACA,0CAAA;AC74CA;;ADq5CA,GAAA;AACA;EACA,eAAA;EACA,YAAA;EACA,cAAA;EACA,cAAA;ACl5CA;ADs5CA;EACA,oCAAA;EACA,wCAAA;ACn5CA;ADq5CA;EACA,gBAAA;ACn5CA;;AAEA,sCAAsC","file":"contact.vue","sourcesContent":["<template>\n\t<flex-column>\n\t\t<template v-if=\"loading\">\n\t\t\t<fluro-page-preloader contain />\n\t\t</template>\n\t\t<tabset v-else :justified=\"true\" :vertical=\"true\">\n\t\t\t<template v-slot:menuprefix>\n\t\t\t\t<template v-if=\"context == 'edit' && $vuetify.breakpoint.mdAndUp\">\n\t\t\t\t\t<flex-column-header style=\"text-align:center\">\n\t\t\t\t\t\t<div style=\"padding: 10px;max-width:200px;margin: auto;\">\n\t\t\t\t\t\t\t<fluro-avatar-update :id=\"model._id\" type=\"contact\" />\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<v-container px-0 class=\"border-bottom text-xs-center\" fluid>\n\t\t\t\t\t\t\t<v-btn class=\"ma-0 mx-1 ml-0\" :disabled=\"!canEmail\" @click=\"communicate('email')\" icon color=\"primary\" content=\"Send Email\" v-tippy>\n\t\t\t\t\t\t\t\t<fluro-icon library=\"fas\" icon=\"envelope\" />\n\t\t\t\t\t\t\t</v-btn>\n\t\t\t\t\t\t\t<v-btn class=\"ma-0 mx-1\" :disabled=\"!canSMS\" @click=\"communicate('sms')\" icon color=\"primary\" content=\"Send SMS\" v-tippy>\n\t\t\t\t\t\t\t\t<fluro-icon library=\"fas\" icon=\"comment\" />\n\t\t\t\t\t\t\t</v-btn>\n\t\t\t\t\t\t\t<v-btn class=\"ma-0 mx-1\" :disabled=\"!canCall\" @click=\"communicate('phone')\" icon color=\"primary\" content=\"Call\" v-tippy>\n\t\t\t\t\t\t\t\t<fluro-icon library=\"fas\" icon=\"phone\" />\n\t\t\t\t\t\t\t</v-btn>\n\t\t\t\t\t\t\t<v-btn class=\"ma-0 mx-1\" :disabled=\"!canPost\" @click=\"addPost\" icon color=\"primary\" content=\"Add Post/Note\" v-tippy>\n\t\t\t\t\t\t\t\t<fluro-icon library=\"fas\" type=\"post\" />\n\t\t\t\t\t\t\t</v-btn>\n\t\t\t\t\t\t\t<v-btn class=\"ma-0 mx-1 mr-0\" icon color=\"primary\" @click=\"communicate('vcard')\" content=\"Add to Address Book\" v-tippy>\n\t\t\t\t\t\t\t\t<!-- <fluro-icon library=\"fas\" icon=\"id-card\" /> -->\n\t\t\t\t\t\t\t\t<fluro-icon library=\"fas\" icon=\"address-book\" />\n\t\t\t\t\t\t\t</v-btn>\n\t\t\t\t\t\t</v-container>\n\t\t\t\t\t</flex-column-header>\n\t\t\t\t</template>\n\t\t\t</template>\n\t\t\t<tab heading=\"Basic Details\">\n\t\t\t\t<slot>\n\t\t\t\t\t<flex-column-body style=\"background: #fafafa;\">\n\t\t\t\t\t\t<!-- <v-flex xs12 md3 style=\"background: #eee;\">\n                                <ul>\n                                    <li>\n                                        Basic Details\n                                    </li>\n                                    <li v-for=\"sheet in sheetDefinitions\">\n                                        {{sheet.title}}\n                                    </li>\n                                </ul>\n\n                               \n                            </v-flex> -->\n\t\t\t\t\t\t<v-container class=\"grid-list-xl\">\n\t\t\t\t\t\t\t<constrain sm>\n\t\t\t\t\t\t\t\t<h3 margin>Basic Details</h3>\n\t\t\t\t\t\t\t\t<template v-if=\"$vuetify.breakpoint.xsOnly\">\n\t\t\t\t\t\t\t\t\t<template v-if=\"context == 'edit'\">\n\t\t\t\t\t\t\t\t\t\t<div style=\"max-width:200px;margin: auto;\">\n\t\t\t\t\t\t\t\t\t\t\t<fluro-avatar-update :id=\"model._id\" type=\"contact\" />\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t<wrapper xs>\n\t\t\t\t\t\t\t\t\t<v-layout row wrap>\n\t\t\t\t\t\t\t\t\t\t<v-flex :class=\"{'xs12':$vuetify.breakpoint.xsOnly}\">\n\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :autofocus=\"$vuetify.breakpoint.smAndUp\" class=\"right-messages\" :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"formOptions\" :field=\"fieldHash.firstName\" v-model=\"model\"></fluro-content-form-field>\n\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field class=\"right-messages\" :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"formOptions\" :field=\"fieldHash.preferredName\" v-model=\"model\" v-if=\"showPreferredName\"></fluro-content-form-field>\n\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field class=\"right-messages\" :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"formOptions\" :field=\"fieldHash.ethnicName\" v-model=\"model\" v-if=\"showEthnicName\"></fluro-content-form-field>\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"additions\">\n\t\t\t\t\t\t\t\t\t\t\t\t<a class=\"hint\" v-if=\"!showPreferredName\" @click=\"show.preferredName = true\">Add Nick/Preferred Name</a>\n\t\t\t\t\t\t\t\t\t\t\t\t<a class=\"hint\" v-if=\"!showEthnicName\" @click=\"show.ethnicName = true\">Add Ethnic Name</a>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t<v-flex :class=\"{'xs12':$vuetify.breakpoint.xsOnly}\" v-if=\"showMiddleName\">\n\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"formOptions\" :field=\"fieldHash.middleName\" v-model=\"model\"></fluro-content-form-field>\n\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t<v-flex :class=\"{'xs12':$vuetify.breakpoint.xsOnly}\">\n\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field class=\"right-messages\" :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"formOptions\" :field=\"fieldHash.lastName\" v-model=\"model\"></fluro-content-form-field>\n\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field class=\"right-messages\" :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"formOptions\" :field=\"fieldHash.maidenName\" v-model=\"model\" v-if=\"showMaidenName\"></fluro-content-form-field>\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"additions\">\n\t\t\t\t\t\t\t\t\t\t\t\t<a class=\"hint\" v-if=\"!showMiddleName\" @click=\"show.middleName = true\">Add Middle Name</a>\n\t\t\t\t\t\t\t\t\t\t\t\t<a class=\"hint\" v-if=\"!showMaidenName\" @click=\"show.maidenName = true\">Add Maiden Name</a>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t<template v-if=\"contactDefinitions.length\">\n\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"formOptions\" :field=\"definitionField\" v-model=\"model\"></fluro-content-form-field>\n\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t</wrapper>\n\t\t\t\t\t\t\t\t<v-layout row wrap>\n\t\t\t\t\t\t\t\t\t<v-flex xs12 sm6>\n\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"formOptions\" :field=\"fieldHash.gender\" v-model=\"model\"></fluro-content-form-field>\n\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t<v-flex xs12 sm6>\n\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"formOptions\" :field=\"fieldHash.maritalStatus\" v-model=\"model\"></fluro-content-form-field>\n\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t<v-layout row wrap>\n\t\t\t\t\t\t\t\t\t<v-flex xs12 sm6>\n\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"formOptions\" :field=\"fieldHash.emails\" v-model=\"model\"></fluro-content-form-field>\n\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t<v-flex xs12 sm6>\n\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"formOptions\" :field=\"fieldHash.phoneNumbers\" v-model=\"model\"></fluro-content-form-field>\n\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t<v-layout row wrap>\n\t\t\t\t\t\t\t\t\t<v-flex xs12 sm6>\n\t\t\t\t\t\t\t\t\t\t<v-layout row wrap>\n\t\t\t\t\t\t\t\t\t\t\t<v-flex xs6>\n\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"formOptions\" :field=\"fieldHash.dob\" v-model=\"model\"></fluro-content-form-field>\n\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t<v-flex xs6>\n\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"formOptions\" :field=\"fieldHash.dobVerified\" v-model=\"model\"></fluro-content-form-field>\n\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t<v-flex xs12 sm6>\n\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"formOptions\" :field=\"fieldHash.timezone\" v-model=\"model\"></fluro-content-form-field>\n\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t<wrapper xs>\n\t\t\t\t\t\t\t\t\t<v-input class=\"no-flex\">\n\t\t\t\t\t\t\t\t\t\t<v-label>School / Academic Details</v-label>\n\t\t\t\t\t\t\t\t\t\t<!-- <h5>School / Academic Details</h5> -->\n\t\t\t\t\t\t\t\t\t\t<fluro-academic-select :form-fields=\"formFields\" :outline=\"showOutline\" :options=\"formOptions\" @calendar=\"updateAcademicCalendar\" @grade=\"updateAcademicGrade\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t</fluro-academic-select>\n\t\t\t\t\t\t\t\t\t</v-input>\n\t\t\t\t\t\t\t\t\t<v-input class=\"no-flex\">\n\t\t\t\t\t\t\t\t\t\t<v-label>Checkin Nametag Notes</v-label>\n\t\t\t\t\t\t\t\t\t\t<p class=\"help-block\">Publicly displayed notes to be printed on {{contextName}} nametag</p>\n\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :showLabel=\"false\" :outline=\"showOutline\" @input=\"update\" :options=\"formOptions\" :field=\"fieldHash.nametagNotes\" v-model=\"model\"></fluro-content-form-field>\n\t\t\t\t\t\t\t\t\t</v-input>\n\t\t\t\t\t\t\t\t</wrapper>\n\t\t\t\t\t\t\t</constrain>\n\t\t\t\t\t\t</v-container>\n\t\t\t\t\t\t<!-- <template v-if=\"context != 'edit'\"> -->\n\t\t\t\t\t\t<!-- <v-container v-if=\"sheetDefinitions.length\"> -->\n\t\t\t\t\t\t<!-- <h3 margin>Detail Sheets</h3> -->\n\t\t\t\t\t\t<!-- <Div class=\"bordered\"> -->\n\t\t\t\t\t\t<!-- <tabset :justified=\"true\"> -->\n\t\t\t\t\t\t<!-- <tab :heading=\"sheet.title\" v-for=\"sheet in sheetDefinitions\"> -->\n\t\t\t\t\t\t<!-- <slot> -->\n\t\t\t\t\t\t<!-- <v-container> -->\n\t\t\t\t\t\t<!-- <pre>{{details[sheet.definitionName].realms}}</pre> -->\n\t\t\t\t\t\t<!-- <fluro-realm-select v-model=\"details[sheet.definitionName].realms\" type=\"contactdetail\" :definition=\"sheet.definitionName\" /> -->\n\t\t\t\t\t\t<!-- <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"updateSheet\" :options=\"formOptions\" :field=\"sheet.field\" v-model=\"details\"></fluro-content-form-field> -->\n\t\t\t\t\t\t<!-- <fluro-content-form @input=\"updateSheet\" :options=\"formOptions\" v-model=\"details[sheet.definitionName].data\" :fields=\"sheet.fields\" /> -->\n\t\t\t\t\t\t<!-- </v-container> -->\n\t\t\t\t\t\t<!-- </slot> -->\n\t\t\t\t\t\t<!-- </tab> -->\n\t\t\t\t\t\t<!-- </tabset> -->\n\t\t\t\t\t\t<!-- </Div> -->\n\t\t\t\t\t\t<!-- </v-container> -->\n\t\t\t\t\t\t<!-- </template> -->\n\t\t\t\t\t\t<!-- <template v-else> -->\n\t\t\t\t\t\t<!-- <detail-sheet-manager ></detail-sheet-manager> -->\n\t\t\t\t\t\t<!-- <pre>DETAILS AND STUFF</pre> -->\n\t\t\t\t\t\t<!-- </template> -->\n\t\t\t\t\t</flex-column-body>\n\t\t\t\t</slot>\n\t\t\t</tab>\n\t\t\t<tab heading=\"Activity Timeline\" v-if=\"itemID\">\n\t\t\t\t<tabset class=\"timeline-tabset\" :justified=\"true\">\n\t\t\t\t\t<tab tooltip=\"Activity Timeline\" :icon=\"{icon:'user-clock'}\">\n\t\t\t\t\t\t<contact-timeline v-model=\"model\" />\n\t\t\t\t\t</tab>\n\t\t\t\t\t<tab tooltip=\"Form Submissions\" :icon=\"{type:'form'}\">\n\t\t\t\t\t\t<contact-interaction-list :contact=\"model\" />\n\t\t\t\t\t</tab>\n\t\t\t\t\t<tab tooltip=\"Attendance\" :icon=\"{type:'checkin'}\">\n\t\t\t\t\t\t<contact-checkin-list :contact=\"model\" />\n\t\t\t\t\t</tab>\n\t\t\t\t\t<tab tooltip=\"Messaging\" :icon=\"{icon:'envelope'}\">\n\t\t\t\t\t\t<contact-message-list :contact=\"model\" />\n\t\t\t\t\t</tab>\n\t\t\t\t\t<tab tooltip=\"Transactions\" :icon=\"{type:'transaction'}\">\n\t\t\t\t\t\t<contact-transaction-list :contact=\"model\" />\n\t\t\t\t\t</tab>\n\t\t\t\t\t<tab tooltip=\"Posts and Notes\" :icon=\"{type:'post'}\">\n\t\t\t\t\t\t<contact-post-thread :contact=\"model\" />\n\t\t\t\t\t</tab>\n\t\t\t\t</tabset>\n\t\t\t\t<!-- <tabset :justified=\"true\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tab heading=\"Timeline\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<contact-timeline v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tabset> -->\n\t\t\t</tab>\n\t\t\t<tab heading=\"Household & Relationships\">\n\t\t\t\t<slot>\n\t\t\t\t\t<flex-column-body style=\"background: #fafafa;\">\n\t\t\t\t\t\t<v-container grid-list-xl>\n\t\t\t\t\t\t\t<constrain sm>\n\t\t\t\t\t\t\t\t<template v-if=\"context == 'edit'\">\n\t\t\t\t\t\t\t\t\t<h3 margin>Household / Residence</h3>\n\t\t\t\t\t\t\t\t\t<v-layout row wrap>\n\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm6>\n\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :override-label=\"`${contextName} Household Role`\" :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"formOptions\" :field=\"fieldHash.householdRole\" v-model=\"model\"></fluro-content-form-field>\n\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t<!-- <v-flex xs12 sm6> -->\n\t\t\t\t\t\t\t\t\t<v-input class=\"no-flex\">\n\t\t\t\t\t\t\t\t\t\t<v-label>Family Household</v-label>\n\t\t\t\t\t\t\t\t\t\t<p class=\"help-block\">Select {{contextName}} primary residence</p>\n\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :showLabel=\"false\" :outline=\"showOutline\" @input=\"update\" :options=\"formOptions\" :field=\"fieldHash.family\" v-model=\"model\"></fluro-content-form-field>\n\t\t\t\t\t\t\t\t\t</v-input>\n\t\t\t\t\t\t\t\t\t<!-- </v-flex> -->\n\t\t\t\t\t\t\t\t\t<!-- <v-flex> -->\n\t\t\t\t\t\t\t\t\t<!-- </v-flex> -->\n\t\t\t\t\t\t\t\t\t<!-- </v-layout> -->\n\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t<template v-else>\n\t\t\t\t\t\t\t\t\t<h3 margin>Household</h3>\n\t\t\t\t\t\t\t\t\t<v-layout row wrap>\n\t\t\t\t\t\t\t\t\t\t<!-- <v-flex xs12 sm6> -->\n\t\t\t\t\t\t\t\t\t\t<!-- <fluro-content-form-field :form-fields=\"formFields\" :showLabel=\"false\" :outline=\"showOutline\" @input=\"update\" :options=\"formOptions\" :field=\"fieldHash.family\" v-model=\"model\"></fluro-content-form-field> -->\n\t\t\t\t\t\t\t\t\t\t<!-- </v-flex> -->\n\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm6>\n\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :override-label=\"`${contextName} Household Role`\" :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"formOptions\" :field=\"fieldHash.householdRole\" v-model=\"model\"></fluro-content-form-field>\n\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t<!--  <h5>{{contextName}} Household</h5> -->\n\t\t\t\t\t\t\t\t\t<fluro-panel v-if=\"!model._id\">\n\t\t\t\t\t\t\t\t\t\t<tabset>\n\t\t\t\t\t\t\t\t\t\t\t<tab heading=\"Create new Household\">\n\t\t\t\t\t\t\t\t\t\t\t\t<v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form @input=\"updateFamily\" :options=\"formOptions\" v-model=\"family\" :fields=\"familyFields\" />\n\t\t\t\t\t\t\t\t\t\t\t\t</v-container>\n\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t\t\t\t<tab heading=\"Add to existing Household\">\n\t\t\t\t\t\t\t\t\t\t\t\t<v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<v-input class=\"no-flex\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-label>Family Household</v-label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p class=\"help-block\">Select {{contextName}} primary residence</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :showLabel=\"false\" :outline=\"showOutline\" @input=\"update\" :options=\"formOptions\" :field=\"fieldHash.family\" v-model=\"model\"></fluro-content-form-field>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</v-input>\n\t\t\t\t\t\t\t\t\t\t\t\t</v-container>\n\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t\t\t</tabset>\n\t\t\t\t\t\t\t\t\t</fluro-panel>\n\t\t\t\t\t\t\t\t\t<template v-else>\n\t\t\t\t\t\t\t\t\t\t<v-input class=\"no-flex\">\n\t\t\t\t\t\t\t\t\t\t\t<v-label>Family Household</v-label>\n\t\t\t\t\t\t\t\t\t\t\t<p class=\"help-block\">Select {{contextName}} primary residence</p>\n\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :showLabel=\"false\" :outline=\"showOutline\" @input=\"update\" :options=\"formOptions\" :field=\"fieldHash.family\" v-model=\"model\"></fluro-content-form-field>\n\t\t\t\t\t\t\t\t\t\t</v-input>\n\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t\t<!-- @errorMessages=\"validate\" -->\n\t\t\t\t\t\t\t\t\t<!-- <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"updateFamily\" :options=\"formOptions\" :field=\"fieldHash.dynamicFamily\" v-model=\"family\"></fluro-content-form-field> -->\n\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t<h3 margin>Relationships</h3>\n\t\t\t\t\t\t\t\t<contact-relationship-manager v-model=\"model\" />\n\t\t\t\t\t\t\t</constrain>\n\t\t\t\t\t\t</v-container>\n\t\t\t\t\t</flex-column-body>\n\t\t\t\t</slot>\n\t\t\t</tab>\n\t\t\t<tab heading=\"Groups & Teams\" v-if=\"model._id\">\n\t\t\t\t<slot>\n\t\t\t\t\t<flex-column-body style=\"background: #fafafa;\">\n\t\t\t\t\t\t<v-container>\n\t\t\t\t\t\t\t<constrain sm>\n\t\t\t\t\t\t\t\t<h3 margin>{{contextName}} Groups &amp; Teams</h3>\n\t\t\t\t\t\t\t\t<contact-group-manager v-model=\"model\" />\n\t\t\t\t\t\t\t</constrain>\n\t\t\t\t\t\t</v-container>\n\t\t\t\t\t</flex-column-body>\n\t\t\t\t</slot>\n\t\t\t</tab>\n\t\t\t<tab heading=\"Processes\" v-if=\"model._id\">\n\t\t\t\t<slot>\n\t\t\t\t\t<flex-column-body style=\"background: #fafafa;\">\n\t\t\t\t\t\t<v-container>\n\t\t\t\t\t\t\t<constrain sm>\n\t\t\t\t\t\t\t\t<h3 margin>{{contextName}} Progress</h3>\n\t\t\t\t\t\t\t\t<contact-process-manager v-model=\"model\" />\n\t\t\t\t\t\t\t</constrain>\n\t\t\t\t\t\t</v-container>\n\t\t\t\t\t</flex-column-body>\n\t\t\t\t</slot>\n\t\t\t</tab>\n\t\t\t<tab heading=\"Capabilities\">\n\t\t\t\t<slot>\n\t\t\t\t\t<flex-column-body style=\"background: #fafafa;\">\n\t\t\t\t\t\t<v-container grid-list-xl>\n\t\t\t\t\t\t\t<constrain sm>\n\t\t\t\t\t\t\t\t<h3 margin>{{contextName}} Capabilities</h3>\n\t\t\t\t\t\t\t\t<contact-capability-manager v-model=\"model.capabilities\" />\n\t\t\t\t\t\t\t</constrain>\n\t\t\t\t\t\t</v-container>\n\t\t\t\t\t</flex-column-body>\n\t\t\t\t</slot>\n\t\t\t</tab>\n\t\t\t<tab heading=\"Rostering / Availability\" v-if=\"context == 'edit'\">\n\t\t\t\t<slot>\n\t\t\t\t\t<flex-column-body style=\"background: #fafafa;\">\n\t\t\t\t\t\t<v-container grid-list-xl>\n\t\t\t\t\t\t\t<constrain sm>\n\t\t\t\t\t\t\t\t<div v-if=\"model._id\">\n\t\t\t\t\t\t\t\t\t<h3 margin>{{contextName}} Unavailability</h3>\n\t\t\t\t\t\t\t\t\t<contact-unavailability-manager v-model=\"model\" />\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</constrain>\n\t\t\t\t\t\t</v-container>\n\t\t\t\t\t</flex-column-body>\n\t\t\t\t</slot>\n\t\t\t</tab>\n\t\t\t<tab heading=\"Notifications\" v-if=\"context == 'edit'\">\n\t\t\t\t<slot>\n\t\t\t\t\t<flex-column-body style=\"background: #fafafa;\">\n\t\t\t\t\t\t<v-container grid-list-xl>\n\t\t\t\t\t\t\t<constrain sm>\n\t\t\t\t\t\t\t\t<h3 margin>Notifications</h3>\n\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"formOptions\" :field=\"fieldHash.countryCode\" v-model=\"model\"></fluro-content-form-field>\n\t\t\t\t\t\t\t\t<v-input class=\"no-flex\" v-if=\"phoneNumbers.length || emails.length\">\n\t\t\t\t\t\t\t\t\t<v-label>Communication Preferences</v-label>\n\t\t\t\t\t\t\t\t\t<p class=\"help-block\">Manage {{contextName}} subscription preferences below</p>\n\t\t\t\t\t\t\t\t\t<div class=\"toggle-items\">\n\t\t\t\t\t\t\t\t\t\t<template v-if=\"emails.length\">\n\t\t\t\t\t\t\t\t\t\t\t<fluro-toggle-item @click.native=\"toggleSubscription('mailout')\" :inactive=\"unsubscribedMailout\">\n\t\t\t\t\t\t\t\t\t\t\t\tAllow Promotional Emails\n\t\t\t\t\t\t\t\t\t\t\t</fluro-toggle-item>\n\t\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t\t\t<template v-if=\"phoneNumbers.length\">\n\t\t\t\t\t\t\t\t\t\t\t<fluro-toggle-item @click.native=\"toggleSubscription('sms')\" :inactive=\"unsubscribedSMS\">\n\t\t\t\t\t\t\t\t\t\t\t\tAllow Promotional SMS\n\t\t\t\t\t\t\t\t\t\t\t</fluro-toggle-item>\n\t\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t\t\t<!--  <div class=\"toggle-item\" @click=\"toggleSubscription('sms')\" :class=\"{inactive:unsubscribedSMS}\">\n                                                <v-layout>\n                                                    <v-flex>Allow Promotional SMS</v-flex>\n                                                    <v-spacer />\n                                                    <div class=\"toggle-switch\" />\n                                                </v-layout>\n                                            </div> -->\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<!-- <pre>{{smsUnsubscribes}}</pre> -->\n\t\t\t\t\t\t\t\t\t<!-- <pre>{{mailoutUnsubscribes}}</pre> -->\n\t\t\t\t\t\t\t\t</v-input>\n\t\t\t\t\t\t\t\t<p></p>\n\t\t\t\t\t\t\t\t<v-input class=\"no-flex\" v-if=\"devices.length\">\n\t\t\t\t\t\t\t\t\t<v-label>{{contextName}} Connected Devices</v-label>\n\t\t\t\t\t\t\t\t\t<list-group>\n\t\t\t\t\t\t\t\t\t\t<list-group-item v-for=\"device in devices\">\n\t\t\t\t\t\t\t\t\t\t\t<template v-slot:left>\n\t\t\t\t\t\t\t\t\t\t\t\t<fluro-icon icon=\"mobile\" />\n\t\t\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t\t\t\t<template v-slot:default>\n\t\t\t\t\t\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<strong class=\"text-capitalize\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t{{device.application}} - {{device.metadata.model}}\n\t\t\t\t\t\t\t\t\t\t\t\t\t</strong>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"sm text-muted\">{{device.metadata.platform}} {{device.metadata.version}}</div>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t\t\t\t<template v-slot:right>\n\t\t\t\t\t\t\t\t\t\t\t\t<v-btn small :loading=\"device.pinging\" @click=\"ping(device)\">\n\t\t\t\t\t\t\t\t\t\t\t\t\tPing\n\t\t\t\t\t\t\t\t\t\t\t\t</v-btn>\n\t\t\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t\t\t</list-group-item>\n\t\t\t\t\t\t\t\t\t</list-group>\n\t\t\t\t\t\t\t\t\t<p class=\"help-block\">\n\t\t\t\t\t\t\t\t\t\tIf you are experiencing problems with push notifications it can sometimes be helpful to reset all devices for a contact allowing them to reconnect next time they sign in to an application\n\t\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t\t<v-btn small @click=\"resetDevices()\">\n\t\t\t\t\t\t\t\t\t\t<span>Reset all devices</span>\n\t\t\t\t\t\t\t\t\t\t<fluro-icon icon=\"trash\" />\n\t\t\t\t\t\t\t\t\t</v-btn>\n\t\t\t\t\t\t\t\t</v-input>\n\t\t\t\t\t\t\t</constrain>\n\t\t\t\t\t\t</v-container>\n\t\t\t\t\t</flex-column-body>\n\t\t\t\t</slot>\n\t\t\t</tab>\n\t\t\t<!-- v-if=\"context == 'edit'\" -->\n\t\t\t<tab :heading=\"sheet.title\" :key=\"sheet._id\" v-for=\"sheet in sheetDefinitions\">\n\t\t\t\t<slot>\n\t\t\t\t\t<flex-column-body style=\"background: #fafafa;\">\n\t\t\t\t\t\t<v-container>\n\t\t\t\t\t\t\t<constrain sm>\n\t\t\t\t\t\t\t\t<h3 margin>{{sheet.title}}</h3>\n\t\t\t\t\t\t\t\t<v-input class=\"no-flex\">\n\t\t\t\t\t\t\t\t\t<v-label>Realms</v-label>\n\t\t\t\t\t\t\t\t\t<p class=\"help-block\">Select where {{contextName}} {{sheet.title}} information should be stored</p>\n\t\t\t\t\t\t\t\t\t<fluro-realm-select @input=\"updateSheetRealms($event, sheet.definitionName)\" v-model=\"sheet.dataModel.realms\" type=\"contactdetail\" :definition=\"sheet.definitionName\" />\n\t\t\t\t\t\t\t\t</v-input>\n\t\t\t\t\t\t\t\t<fluro-content-form :options=\"formOptions\" @input=\"updateSheet($event, sheet.definitionName)\" v-model=\"sheet.dataModel.data\" :fields=\"sheet.fields\" />\n\t\t\t\t\t\t\t</constrain>\n\t\t\t\t\t\t</v-container>\n\t\t\t\t\t</flex-column-body>\n\t\t\t\t</slot>\n\t\t\t</tab>\n\t\t\t<tab heading=\"Metadata\" v-if=\"context == 'edit'\">\n\t\t\t\t<slot>\n\t\t\t\t\t<flex-column-body style=\"background: #fafafa;\">\n\t\t\t\t\t\t<v-container>\n\t\t\t\t\t\t\t<constrain sm>\n\t\t\t\t\t\t\t\t<h3 margin>Metadata</h3>\n\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"formOptions\" :field=\"fieldHash.timezone\" v-model=\"model\"></fluro-content-form-field>\n\t\t\t\t\t\t\t\t<v-layout>\n\t\t\t\t\t\t\t\t\t<v-flex>\n\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"formOptions\" :field=\"fieldHash.deceased\" v-model=\"model\"></fluro-content-form-field>\n\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t<v-flex v-show=\"model.deceased\">\n\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"formOptions\" :field=\"fieldHash.deceasedDate\" v-model=\"model\"></fluro-content-form-field>\n\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t<div v-if=\"model.data\">\n\t\t\t\t\t\t\t\t\t<v-card>\n\t\t\t\t\t\t\t\t\t\t<v-card-text>\n\t\t\t\t\t\t\t\t\t\t\t<h5>Explore Metadata</h5>\n\t\t\t\t\t\t\t\t\t\t\t<json-view :deep=\"3\" :data=\"model.data\" />\n\t\t\t\t\t\t\t\t\t\t</v-card-text>\n\t\t\t\t\t\t\t\t\t</v-card>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<!-- <pre>{{model}}</pre> -->\n\t\t\t\t\t\t\t</constrain>\n\t\t\t\t\t\t</v-container>\n\t\t\t\t\t</flex-column-body>\n\t\t\t\t</slot>\n\t\t\t</tab>\n\t\t\t<!-- <tab :heading=\"sheet.title\" v-for=\"sheet in sheetDefinitions\">\n                <slot>\n                    <flex-column-body style=\"background: #fafafa;\">\n                        <v-container>\n                            <wrapper xs>\n                                <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"formOptions\" :field=\"sheet.field\" v-model=\"details\"></fluro-content-form-field>\n                            </wrapper>\n                        </v-container>\n                    </flex-column-body>\n                </slot>\n            </tab> -->\n\t\t\t<!-- <tab heading=\"Classification\">\n                <slot>\n                    <flex-column-body style=\"background: #fafafa;\">\n                        <v-container>\n                            <wrapper xs>\n                                <template v-if=\"contactDefinitions.length\">\n                                    <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"formOptions\" :field=\"definitionField\" v-model=\"model\"></fluro-content-form-field>\n                                </template>\n                                <fluro-realm-select :expanded=\"true\" v-model=\"model.realms\" type=\"contact\" />\n                            </wrapper>\n                        </v-container>\n                    </flex-column-body>\n                </slot>\n            </tab> -->\n\t\t</tabset>\n\t\t<!-- <flex-column-body> -->\n\t\t<!-- <pre>{{model.details}}</pre> -->\n\t\t<!-- </flex-column-body> -->\n\t</flex-column>\n</template>\n<script>\n/////////////////////////////////\n\nimport FluroAcademicSelect from 'src/components/form/FluroAcademicSelect.vue';\nimport FluroRealmSelect from 'src/components/form/realmselect/FluroRealmSelect.vue';\nimport FluroContentEditMixin from 'src/components/content/edit/FluroContentEditMixin.js';\nimport FluroContactCommunicateMixin from 'src/mixins/FluroContactCommunicateMixin';\n\n\n\nimport FluroAvatarUpdate from 'src/components/FluroAvatarUpdate.vue';\nimport ContactTimeline from 'src/components/content/contact/timeline/ContactTimeline.vue';\nimport ContactMessageList from 'src/components/content/contact/timeline/ContactMessageList.vue';\nimport ContactTransactionList from 'src/components/content/contact/timeline/ContactTransactionList.vue';\nimport ContactCheckinList from 'src/components/content/contact/timeline/ContactCheckinList.vue';\nimport ContactInteractionList from 'src/components/content/contact/timeline/ContactInteractionList.vue';\nimport ContactPostThread from 'src/components/content/contact/timeline/ContactPostThread.vue';\n\n\n\nimport ContactGroupManager from 'src/components/content/edit/components/ContactGroupManager.vue';\nimport ContactProcessManager from 'src/components/content/edit/components/ContactProcessManager.vue';\nimport ContactCapabilityManager from 'src/components/content/edit/components/ContactCapabilityManager.vue';\nimport ContactRelationshipManager from 'src/components/content/edit/components/ContactRelationshipManager.vue';\nimport ContactUnavailabilityManager from 'src/components/content/edit/components/ContactUnavailabilityManager.vue';\nimport AddPost from 'src/components/ui/modal/AddPost.vue';\nimport _ from 'lodash';\n\n\n/////////////////////////////////\n\nimport Vue from 'vue';\n\n/////////////////////////////////\n\nexport default {\n\n\t// props: {\n\t//     'fields': {\n\t//         type: Array,\n\n\t//     }\n\t// },\n\n\n\tmixins: [FluroContentEditMixin, FluroContactCommunicateMixin],\n\tcomponents: {\n\t\tContactTimeline,\n\t\tContactMessageList,\n\t\tContactTransactionList,\n\t\tContactInteractionList,\n\t\tContactCheckinList,\n\t\tContactPostThread,\n\t\tContactGroupManager,\n\t\tContactProcessManager,\n\t\tContactCapabilityManager,\n\t\tContactRelationshipManager,\n\t\tContactUnavailabilityManager,\n\t\tFluroAvatarUpdate,\n\t\tFluroRealmSelect,\n\t\tFluroAcademicSelect,\n\t},\n\tmethods: {\n\n\n\t\tping(device) {\n\t\t\tvar self = this;\n\n\t\t\tdevice.pinging = true;\n\n\t\t\tself.$fluro.api.get(`/push/ping/${device._id}`, { cache: false })\n\t\t\t\t.then(function(res) {\n\t\t\t\t\tdevice.pinging = false;\n\t\t\t\t\tself.$fluro.notify('Ping notification sent!')\n\t\t\t\t})\n\t\t\t\t.catch(function(err) {\n\t\t\t\t\tdevice.pinging = false;\n\t\t\t\t\tself.$fluro.error(err);\n\n\t\t\t\t})\n\t\t},\n\t\tresetDevices() {\n\t\t\tvar self = this;\n\n\t\t\tself.$fluro.api.get(`/push/clear/${self.itemID}`, { cache: false })\n\t\t\t\t.then(function(res) {\n\t\t\t\t\tself.$fluro.notify('Devices Reset!')\n\t\t\t\t\tconsole.log('Reset')\n\t\t\t\t})\n\t\t\t\t.catch(function(err) {\n\t\t\t\t\tself.$fluro.error(err);\n\t\t\t\t})\n\t\t},\n\t\ttoggleSubscription(type) {\n\n\t\t\tvar self = this;\n\n\t\t\tswitch (type) {\n\t\t\t\tcase 'sms':\n\t\t\t\t\tif (self.unsubscribedSMS) {\n\t\t\t\t\t\tself.subscribe('sms');\n\t\t\t\t\t} else {\n\t\t\t\t\t\tself.unsubscribe('sms');\n\t\t\t\t\t}\n\t\t\t\t\tbreak;\n\t\t\t\tcase 'mailout':\n\t\t\t\t\tif (self.unsubscribedMailout) {\n\t\t\t\t\t\tself.subscribe('mailout');\n\t\t\t\t\t} else {\n\t\t\t\t\t\tself.unsubscribe('mailout');\n\t\t\t\t\t}\n\t\t\t\t\tbreak;\n\t\t\t}\n\t\t},\n\t\tsubscribe(type) {\n\t\t\tvar self = this;\n\t\t\tvar url;\n\n\t\t\tswitch (type) {\n\t\t\t\tcase 'mailout':\n\t\t\t\t\tif (!self.emails || !self.emails.length) {\n\t\t\t\t\t\tself.$fluro.error('No email addresses provided')\n\t\t\t\t\t\treturn;\n\t\t\t\t\t}\n\t\t\t\t\turl = `/mailout/resubscribe`;\n\t\t\t\t\tbreak;\n\t\t\t\tcase 'sms':\n\t\t\t\t\tif (!self.phoneNumbers || !self.phoneNumbers.length) {\n\t\t\t\t\t\tself.$fluro.error('No phone numbers provided')\n\t\t\t\t\t\treturn;\n\t\t\t\t\t}\n\t\t\t\t\turl = `/sms/resubscribe`;\n\t\t\t\t\tbreak;\n\t\t\t}\n\n\t\t\t///////////////////////\n\n\t\t\tself.$fluro.api.post(url, {\n\t\t\t\t\tphoneNumbers: self.phoneNumbers,\n\t\t\t\t\temails: self.emails,\n\t\t\t\t})\n\t\t\t\t.then(function() {\n\t\t\t\t\tself.subscriptionCacheKey = Math.random();\n\t\t\t\t})\n\t\t},\n\t\tunsubscribe(type) {\n\t\t\tvar self = this;\n\t\t\tvar url;\n\n\t\t\tswitch (type) {\n\t\t\t\tcase 'mailout':\n\t\t\t\t\tif (!self.emails || !self.emails.length) {\n\t\t\t\t\t\tself.$fluro.error('No email addresses provided')\n\t\t\t\t\t\treturn;\n\t\t\t\t\t}\n\t\t\t\t\turl = `/mailout/unsubscribe`;\n\t\t\t\t\tbreak;\n\t\t\t\tcase 'sms':\n\t\t\t\t\tif (!self.phoneNumbers || !self.phoneNumbers.length) {\n\t\t\t\t\t\tself.$fluro.error('No phone numbers provided')\n\t\t\t\t\t\treturn;\n\t\t\t\t\t}\n\t\t\t\t\turl = `/sms/unsubscribe`;\n\t\t\t\t\tbreak;\n\t\t\t}\n\n\t\t\t///////////////////////\n\n\t\t\tself.$fluro.api.post(url, {\n\t\t\t\t\tphoneNumbers: self.phoneNumbers,\n\t\t\t\t\temails: self.emails,\n\t\t\t\t})\n\t\t\t\t.then(function() {\n\t\t\t\t\tself.subscriptionCacheKey = Math.random();\n\t\t\t\t})\n\t\t},\n\t\tupdateAcademicCalendar(calendar) {\n\t\t\t// console.log('ACADEMIC THING', calendar);\n\t\t\tvar self = this;\n\t\t\tself.$set(self.model, 'academicCalendar', calendar);\n\t\t\tself.update(self.model);\n\n\t\t},\n\t\tupdateAcademicGrade(grade) {\n\t\t\t// console.log('ACADEMIC GRADE', grade);\n\t\t\tvar self = this;\n\t\t\tself.$set(self.model, 'academicGrade', grade);\n\t\t\tself.update(self.model);\n\n\t\t},\n\t\tupdateFamily() {\n\t\t\tvar self = this;\n\n\t\t\tvar enteredValues = _.chain(self.family)\n\t\t\t\t.get('address')\n\t\t\t\t.values()\n\t\t\t\t.compact()\n\t\t\t\t.value();\n\n\t\t\tif (enteredValues && enteredValues.length) {\n\t\t\t\tself.$set(self.model, 'family', self.family);\n\t\t\t} else {\n\t\t\t\tself.$delete(self.model, 'family');\n\t\t\t}\n\t\t\t// console.log('Family Updated', self.mod el);\n\t\t},\n\t\tupdateSheetRealms(realms, definitionName) {\n\t\t\tvar self = this;\n\n\t\t\tvar realms = self.$fluro.utils.arrayIDs(realms);\n\n\t\t\tvar existingSheet = self.model.details[definitionName];\n\t\t\tif (!existingSheet) {\n\t\t\t\tself.$set(self.model.details, definitionName, {});\n\n\t\t\t}\n\n\t\t\tself.$set(self.model.details[definitionName], 'realms', realms);\n\n\t\t},\n\t\tupdateSheet(entry, definitionName) {\n\n\t\t\tvar self = this;\n\n\n\t\t\t///////////////////////////////\n\n\t\t\tvar existingSheet = self.model.details[definitionName];\n\t\t\tif (!existingSheet) {\n\t\t\t\tself.$set(self.model.details, definitionName, {});\n\t\t\t}\n\n\t\t\tself.$set(self.model.details[definitionName], 'data', entry);\n\n\n\n\n\t\t\t// if (!self.model.details[definitionName]) {\n\t\t\t//     self.$set(self.model.details, definitionName, {\n\t\t\t//         realms: [],\n\t\t\t//         data,\n\t\t\t//     });\n\t\t\t// } else {\n\t\t\t//     if (!_.keys(data).length) {\n\t\t\t//         self.model.details[definitionName] = null;\n\t\t\t//     } else {\n\t\t\t//         self.model.details[definitionName].data = data;\n\t\t\t//     }\n\t\t\t// }\n\n\t\t}\n\t},\n\n\n\twatch: {\n\t\ttitle(val) {\n\n\t\t\tthis.$set(this.model, 'title', this.title);\n\t\t\t// this.model.title = val;\n\t\t\tthis.update(this.model)\n\n\n\t\t},\n\t},\n\tcreated() {\n\n\t\tvar self = this;\n\t\t// console.log('INITIAL ACADEMIC CALENDAR', self.model.academicCalendar);\n\t\t// console.log('INITIAL ACADEMIC GRADE', self.model.academicGrade);\n\n\t\tif (!self.model.academicCalendar) {\n\t\t\tself.$set(self.model, 'academicCalendar', '');\n\t\t}\n\n\t\tif (!self.model.academicGrade) {\n\t\t\tself.$set(self.model, 'academicGrade', '');\n\t\t}\n\n\t\t//////////////////////////////////////////////////////////////\n\n\t\t//When we first create the thing, we need to double check and see if we already have data\n\t\t//If we do already have data then we will use that\n\n\t\t//Check if there are detail sheets\n\t\tif (self.config && self.config.details && self.config.details.length) {\n\n\t\t\t//Each detail sheet we want to create a thing for it\n\t\t\tself.sheetDefinitions = _.reduce(self.config.details, function(set, definition) {\n\n\t\t\t\tif (!definition.fields || !definition.fields.length) {\n\t\t\t\t\treturn set;\n\t\t\t\t}\n\n\t\t\t\t/////////////////////////////////////\n\n\t\t\t\tvar definitionName = definition.definitionName;\n\n\t\t\t\t/////////////////////////////////////\n\n\t\t\t\tvar field = {\n\t\t\t\t\t_id: definition._id,\n\t\t\t\t\ttitle: definition.title,\n\t\t\t\t\ttype: 'group',\n\t\t\t\t\tkey: definitionName,\n\t\t\t\t\tfields: definition.fields,\n\t\t\t\t\tasObject: true,\n\t\t\t\t\tminimum: 1,\n\t\t\t\t\tmaximum: 1,\n\t\t\t\t\taskCount: 1,\n\t\t\t\t}\n\n\t\t\t\t///////////////////////////////////////////////////////////////\n\n\t\t\t\tvar extractedEntry = _.get(self.model, `details.${definitionName}`);\n\t\t\t\tvar existingEntry = JSON.parse(JSON.stringify(extractedEntry || {}));\n\n\t\t\t\tvar cleanedEntry = {\n\t\t\t\t\trealms: [],\n\t\t\t\t\tdata: {},\n\t\t\t\t}\n\n\t\t\t\t///////////////////////////////////////////////////////////////\n\n\t\t\t\tif (existingEntry) {\n\t\t\t\t\tif (existingEntry.items && existingEntry.items.length) {\n\t\t\t\t\t\tvar item = existingEntry.items[0];\n\t\t\t\t\t\tif (!item.data) {\n\t\t\t\t\t\t\titem.data = {};\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\tif (!item.realms) {\n\t\t\t\t\t\t\titem.realms = [];\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\tcleanedEntry = item;\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\t///////////////////////////////////////////////////////////////\n\n\t\t\t\tself.$set(definition, 'dataModel', cleanedEntry);\n\t\t\t\t// self.$set(self.details, definitionName, cleanedEntry);\n\n\t\t\t\t///////////////////////////////////////////////////////////////\n\n\t\t\t\tdefinition.field = field;\n\t\t\t\tset.push(definition);\n\n\n\t\t\t\treturn set;\n\n\t\t\t}, [])\n\n\n\t\t\tif (!self.model.details) {\n\t\t\t\tself.model.details = {}\n\t\t\t}\n\n\t\t\t// console.log('dETAILS', self.details)\n\t\t}\n\t},\n\tasyncComputed: {\n\n\t\tcontactDefinitions: {\n\t\t\tdefault: [],\n\t\t\tget() {\n\t\t\t\tvar self = this;\n\n\t\t\t\t// if (!self.config || !self.config.details || !self.config.details.length) {\n\t\t\t\t//     return [];\n\t\t\t\t// }\n\n\t\t\t\treturn new Promise(function(resolve, reject) {\n\n\n\t\t\t\t\tself.$fluro.types.subTypes('contact')\n\t\t\t\t\t\t.then(function(definitions) {\n\n\n\n\t\t\t\t\t\t\tvar definitions = _.chain(definitions)\n\t\t\t\t\t\t\t\t.filter(function(definition) {\n\t\t\t\t\t\t\t\t\t// console.log('Contact Definition!', definition)\n\t\t\t\t\t\t\t\t\treturn definition.status == 'active';\n\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t.map(function(definition, key) {\n\t\t\t\t\t\t\t\t\treturn {\n\t\t\t\t\t\t\t\t\t\t_id: definition._id,\n\t\t\t\t\t\t\t\t\t\tname: definition.title,\n\t\t\t\t\t\t\t\t\t\tvalue: definition.definitionName,\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t.value();\n\n\t\t\t\t\t\t\t// if(definitions.length) {\n\t\t\t\t\t\t\t//     definitions.unshift({\n\t\t\t\t\t\t\t//         name:'Basic Contact',\n\t\t\t\t\t\t\t//         value:null,\n\t\t\t\t\t\t\t//     })\n\t\t\t\t\t\t\t// }\n\n\t\t\t\t\t\t\tresolve(definitions);\n\n\t\t\t\t\t\t})\n\t\t\t\t\t\t.catch(reject);\n\t\t\t\t})\n\t\t\t}\n\t\t},\n\t\tdevices: {\n\t\t\tdefault: [],\n\t\t\tget() {\n\n\t\t\t\tvar self = this;\n\n\n\t\t\t\tif (self.context != 'edit' || !self.itemID) {\n\t\t\t\t\treturn Promise.resolve([]);\n\t\t\t\t}\n\n\t\t\t\t//////////////////////////////////////\n\n\t\t\t\treturn new Promise(function(resolve, reject) {\n\n\t\t\t\t\tself.$fluro.api.get(`/contact/${self.itemID}/devices`)\n\t\t\t\t\t\t.then(function(res) {\n\t\t\t\t\t\t\tresolve(_.map(res.data, function(device) {\n\t\t\t\t\t\t\t\tdevice.pinging = false;\n\t\t\t\t\t\t\t\treturn device;\n\t\t\t\t\t\t\t}));\n\t\t\t\t\t\t})\n\t\t\t\t\t\t.catch(function(err) {\n\t\t\t\t\t\t\treject(err);\n\t\t\t\t\t\t})\n\n\t\t\t\t})\n\t\t\t}\n\t\t},\n\t\tsmsUnsubscribes: {\n\t\t\tdefault: [],\n\t\t\tget() {\n\n\t\t\t\tvar self = this;\n\n\n\t\t\t\tif (self.context != 'edit' || !self.itemID) {\n\t\t\t\t\treturn Promise.resolve([]);\n\t\t\t\t}\n\n\t\t\t\t//////////////////////////////////////\n\n\t\t\t\treturn new Promise(function(resolve, reject) {\n\n\t\t\t\t\tself.$fluro.api.get(`/contact/${self.itemID}/smsunsubscribes?${self.subscriptionCacheKey}`)\n\t\t\t\t\t\t.then(function(res) {\n\t\t\t\t\t\t\tresolve(res.data);\n\t\t\t\t\t\t})\n\t\t\t\t\t\t.catch(function(err) {\n\t\t\t\t\t\t\treject(err);\n\t\t\t\t\t\t})\n\n\t\t\t\t})\n\t\t\t}\n\t\t},\n\t\tmailoutUnsubscribes: {\n\t\t\tdefault: [],\n\t\t\tget() {\n\n\t\t\t\tvar self = this;\n\n\t\t\t\tif (self.context != 'edit' || !self.itemID) {\n\t\t\t\t\treturn Promise.resolve([]);\n\t\t\t\t}\n\n\t\t\t\t//////////////////////////////////////\n\n\t\t\t\treturn new Promise(function(resolve, reject) {\n\n\t\t\t\t\tself.$fluro.api.get(`/contact/${self.itemID}/unsubscribes?${self.subscriptionCacheKey}`)\n\t\t\t\t\t\t.then(function(res) {\n\t\t\t\t\t\t\tresolve(res.data);\n\t\t\t\t\t\t})\n\t\t\t\t\t\t.catch(function(err) {\n\t\t\t\t\t\t\treject(err);\n\t\t\t\t\t\t})\n\n\t\t\t\t})\n\t\t\t}\n\t\t}\n\t},\n\tcomputed: {\n\t\tfieldsOutput() {\n\n\t\t\tvar self = this;\n\t\t\tvar array = [];\n\n\t\t\t///////////////////////////////////\n\n\t\t\taddField('firstName', {\n\t\t\t\ttitle: 'First Name',\n\t\t\t\tminimum: 1,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'string',\n\t\t\t\tplaceholder: 'Eg. Jessica',\n\t\t\t})\n\n\t\t\taddField('preferredName', {\n\t\t\t\ttitle: 'Preferred/Nick Name',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'string',\n\t\t\t\tenabled: false,\n\t\t\t\tplaceholder: `Eg. 'Jess'`,\n\t\t\t})\n\n\t\t\taddField('middleName', {\n\t\t\t\ttitle: 'Middle Name',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'string',\n\t\t\t\tenabled: false,\n\t\t\t\tplaceholder: `Eg. 'Heather'`,\n\t\t\t})\n\n\t\t\taddField('ethnicName', {\n\t\t\t\ttitle: 'Ethnic Name',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'string',\n\t\t\t\tenabled: false,\n\t\t\t\tplaceholder: `Eg. '吳爾霏'`,\n\t\t\t})\n\n\t\t\taddField('maidenName', {\n\t\t\t\ttitle: 'Maiden Name',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'string',\n\t\t\t\tenabled: false,\n\t\t\t\tplaceholder: `Eg. 'Johnson'`,\n\t\t\t})\n\n\t\t\taddField('lastName', {\n\t\t\t\ttitle: 'Last Name',\n\t\t\t\tminimum: 1,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'string',\n\t\t\t\tplaceholder: 'Eg. Michaels',\n\t\t\t})\n\n\n\t\t\taddField('dob', {\n\t\t\t\ttitle: 'Date of Birth',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'date',\n\t\t\t\tdirective: 'date-select',\n\t\t\t})\n\t\t\taddField('dobVerified', {\n\t\t\t\ttitle: 'Birthday type',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'boolean',\n\t\t\t\tdirective: 'select',\n\t\t\t\tdefaultValues: [false],\n\t\t\t\toptions: [{\n\t\t\t\t\t\tname: `It's a Guess`,\n\t\t\t\t\t\tvalue: false,\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\tname: `It's Correct`,\n\t\t\t\t\t\tvalue: true,\n\t\t\t\t\t},\n\t\t\t\t]\n\t\t\t})\n\n\t\t\taddField('family', {\n\t\t\t\ttitle: 'Household / Primary Residence',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'reference',\n\t\t\t\tdirective: 'reference-select',\n\t\t\t\tparams: {\n\t\t\t\t\trestrictType: 'family',\n\t\t\t\t\ttemplate: {\n\t\t\t\t\t\t_context: 'contact',\n\t\t\t\t\t\ttitle: self.model.lastName || '',\n\t\t\t\t\t\trealms: self.model.realms,\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t});\n\n\t\t\taddField('householdRole', {\n\t\t\t\ttitle: 'Household Role',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'string',\n\t\t\t\tdirective: 'select',\n\t\t\t\toptions: [{\n\t\t\t\t\t\tname: 'None',\n\t\t\t\t\t\tvalue: '',\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\tname: 'Parent',\n\t\t\t\t\t\tvalue: 'parent',\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\tname: 'Child',\n\t\t\t\t\t\tvalue: 'child',\n\t\t\t\t\t},\n\t\t\t\t],\n\t\t\t\tparams: {\n\t\t\t\t\trestrictType: 'family',\n\t\t\t\t}\n\t\t\t})\n\n\n\n\t\t\taddField('deceased', {\n\t\t\t\ttitle: 'Mark as deceased',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'boolean',\n\t\t\t\tdirective: 'checkbox',\n\t\t\t})\n\n\t\t\taddField('deceasedDate', {\n\t\t\t\ttitle: 'Deceased Date',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'date',\n\t\t\t\tdirective: 'date-select',\n\t\t\t})\n\n\n\n\n\n\t\t\tvar timezones = _.map(self.$fluro.date.timezones(), function(timezone) {\n\t\t\t\treturn { name: timezone, value: timezone };\n\t\t\t});\n\n\t\t\ttimezones.unshift({\n\t\t\t\tname: 'Use Account Default',\n\t\t\t\tvalue: '',\n\t\t\t})\n\n\n\n\t\t\taddField('gender', {\n\t\t\t\ttitle: 'Gender',\n\t\t\t\tminimum: 1,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'string',\n\t\t\t\tdirective: 'select',\n\t\t\t\tplaceholder: '',\n\t\t\t\t// defaultValues: ['unknown'],\n\t\t\t\toptions: [{\n\t\t\t\t\t\tname: 'Male',\n\t\t\t\t\t\tvalue: 'male',\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\tname: 'Female',\n\t\t\t\t\t\tvalue: 'female',\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\tname: 'Unknown',\n\t\t\t\t\t\tvalue: 'unknown',\n\t\t\t\t\t},\n\t\t\t\t]\n\t\t\t})\n\n\t\t\taddField('maritalStatus', {\n\t\t\t\ttitle: 'Marital Status',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'string',\n\t\t\t\tdirective: 'select',\n\t\t\t\tplaceholder: '',\n\t\t\t\toptions: [{\n\t\t\t\t\t\tname: 'None',\n\t\t\t\t\t\tvalue: '',\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\tname: 'Single',\n\t\t\t\t\t\tvalue: 'single',\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\tname: 'In a relationship',\n\t\t\t\t\t\tvalue: 'relationship',\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\tname: 'Married',\n\t\t\t\t\t\tvalue: 'married',\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\tname: 'Widowed',\n\t\t\t\t\t\tvalue: 'widowed',\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\tname: 'Separated',\n\t\t\t\t\t\tvalue: 'separated',\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\tname: 'Divorced',\n\t\t\t\t\t\tvalue: 'divorced',\n\t\t\t\t\t},\n\t\t\t\t]\n\t\t\t})\n\n\n\t\t\t///////////////////////////////////\n\n\t\t\taddField('emails', {\n\t\t\t\ttitle: 'Email Address',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 0,\n\t\t\t\ttype: 'email',\n\t\t\t\t// directive:'select',\n\t\t\t\tplaceholder: '',\n\t\t\t})\n\n\n\t\t\taddField('phoneNumbers', {\n\t\t\t\ttitle: 'Phone Number',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 0,\n\t\t\t\ttype: 'string',\n\t\t\t\t// directive:'select',\n\t\t\t\tplaceholder: '+61 400 123 456',\n\t\t\t})\n\n\t\t\t///////////////////////////////////\n\n\t\t\taddField('timezone', {\n\t\t\t\ttitle: 'Primary Timezone',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'string',\n\t\t\t\tdirective: 'timezone-select',\n\t\t\t\tdescription: 'Set a local timezone for this contact',\n\t\t\t})\n\n\t\t\taddField('countryCode', {\n\t\t\t\ttitle: 'Default Country Code',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'string',\n\t\t\t\tdirective: 'countrycodeselect',\n\t\t\t})\n\t\t\t///////////////////////////////////\n\n\t\t\taddField('nametagNotes', {\n\t\t\t\ttitle: 'Checkin Nametag Notes',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'string',\n\t\t\t})\n\n\t\t\t///////////////////////////////////\n\n\t\t\taddField('capabilities', {\n\t\t\t\ttitle: 'Capabilities',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 0,\n\t\t\t\ttype: 'reference',\n\t\t\t\tdescription: 'Add capabilities for this contact',\n\t\t\t\tparams: {\n\t\t\t\t\trestrictType: 'capability',\n\t\t\t\t}\n\t\t\t})\n\n\t\t\t///////////////////////////////////\n\n\t\t\tfunction addField(key, details) {\n\t\t\t\tdetails.key = key;\n\t\t\t\tarray.push(details)\n\t\t\t\t// // Vue.set(self.fields, key, details);\n\n\t\t\t\t// if (details.enabled === false) {\n\n\t\t\t\t// } else {\n\t\t\t\t//     details.enabled = true;\n\t\t\t\t// }\n\n\n\t\t\t\t// var defaultValue = self.getDefaultValue(key, details);\n\t\t\t\t// Vue.set(self.model, key, defaultValue);\n\t\t\t}\n\n\t\t\treturn array;\n\t\t},\n\n\n\t\tformOptions() {\n\t\t\treturn {\n\n\t\t\t}\n\t\t},\n\t\ttitle() {\n\n\t\t\tif (!this.model) {\n\t\t\t\treturn '';\n\t\t\t}\n\n\t\t\tif (this.model.preferredName) {\n\t\t\t\treturn `${this.model.preferredName} ${this.model.lastName || ''}`;\n\t\t\t}\n\n\t\t\tif (this.model.firstName) {\n\t\t\t\treturn `${this.model.firstName} ${this.model.lastName || ''}`;\n\t\t\t}\n\n\t\t\treturn '';\n\t\t},\n\t\tphoneNumbers() {\n\t\t\treturn this.model.phoneNumbers;\n\t\t},\n\t\temails() {\n\t\t\treturn this.model.emails;\n\t\t},\n\t\tunsubscribedMailout() {\n\t\t\treturn this.mailoutUnsubscribes.length ? true : false;\n\t\t},\n\t\tunsubscribedSMS() {\n\t\t\treturn this.smsUnsubscribes.length ? true : false;\n\t\t},\n\n\n\n\t\tcontextName() {\n\n\t\t\tvar name = this.model.preferredName || this.model.firstName || '';\n\t\t\tif (!name || !name.length) {\n\t\t\t\treturn '';\n\t\t\t}\n\n\t\t\tif (_.endsWith(name, 's')) {\n\t\t\t\treturn `${name}'`\n\t\t\t}\n\t\t\treturn `${name}'s`;\n\t\t},\n\t\tdefinitionField() {\n\n\t\t\tvar self = this;\n\n\t\t\t///////////////////////////////////\n\n\t\t\treturn {\n\t\t\t\ttitle: 'Contact Type / Definition',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'string',\n\t\t\t\tdirective: 'select',\n\t\t\t\tkey: 'definition',\n\t\t\t\toptions: self.contactDefinitions,\n\t\t\t}\n\t\t},\n\t\tshowOutline() {\n\t\t\treturn false; //true; //false;//true;//false;//true;\n\t\t},\n\t\tshowPreferredName() {\n\t\t\treturn (this.model.preferredName && this.model.preferredName.length) || this.show.preferredName;\n\t\t},\n\t\tshowEthnicName() {\n\t\t\treturn (this.model.ethnicName && this.model.ethnicName.length) || this.show.ethnicName;\n\t\t},\n\t\tshowMiddleName() {\n\t\t\treturn (this.model.middleName && this.model.middleName.length) || this.show.middleName;\n\t\t},\n\t\tshowMaidenName() {\n\t\t\treturn (this.model.maidenName && this.model.maidenName.length) || this.show.maidenName;\n\t\t},\n\t},\n\n\tdata() {\n\t\treturn {\n\t\t\t// loadingDetails: true,\n\t\t\t// loadingDefinitions: true,\n\t\t\tsubscriptionCacheKey: 0,\n\t\t\tsheetDefinitions: [],\n\t\t\tdetails: {},\n\t\t\tdetailsModel: {},\n\t\t\tfamily: {},\n\t\t\tshow: {\n\t\t\t\tpreferredName: false,\n\t\t\t\tmiddleName: false,\n\t\t\t\tethnicName: false,\n\t\t\t\tmaidenName: false,\n\t\t\t},\n\t\t\tfamilyFields: [{\n\t\t\t\t\ttitle: 'Name of household',\n\t\t\t\t\tkey: 'title',\n\t\t\t\t\tminimum: 0,\n\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\"expressions\": {\n\t\t\t\t\t\tdefaultValue: 'data.lastName',\n\t\t\t\t\t},\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\ttitle: 'Address',\n\t\t\t\t\tkey: 'address',\n\t\t\t\t\tminimum: 1,\n\t\t\t\t\tmaximum: 1,\n\t\t\t\t\taskCount: 1,\n\t\t\t\t\ttype: 'group',\n\t\t\t\t\tasObject: true,\n\t\t\t\t\tfields: [{\n\t\t\t\t\t\t\ttitle: 'Street Address Line 1',\n\t\t\t\t\t\t\tkey: 'addressLine1',\n\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t},\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\ttitle: 'Address Line 2',\n\t\t\t\t\t\t\tkey: 'addressLine2',\n\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\"expressions\": {\n\t\t\t\t\t\t\t\thide: '!data.addressLine1.length',\n\t\t\t\t\t\t\t\t// defaultValue:'data.addressLine1.length',\n\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\tclassName: 'xs12 sm6',\n\t\t\t\t\t\t},\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\ttype: 'group',\n\t\t\t\t\t\t\t\"minimum\": 1,\n\t\t\t\t\t\t\t\"askCount\": 1,\n\t\t\t\t\t\t\t\"maximum\": 1,\n\t\t\t\t\t\t\tsameLine: 1,\n\t\t\t\t\t\t\tfields: [{\n\t\t\t\t\t\t\t\t\ttitle: 'Suburb',\n\t\t\t\t\t\t\t\t\tkey: 'suburb',\n\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\tclassName: \"xs12 sm4\",\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\ttitle: 'State',\n\t\t\t\t\t\t\t\t\tkey: 'state',\n\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\tclassName: \"xs12 sm4\",\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\ttitle: 'Postal Code',\n\t\t\t\t\t\t\t\t\tkey: 'postalCode',\n\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\tclassName: \"xs12 sm4\",\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t],\n\t\t\t\t\t\t},\n\t\t\t\t\t]\n\t\t\t\t},\n\t\t\t]\n\t\t}\n\t},\n}\n\n</script>\n<style scoped lang=\"scss\">\n\n/**/\r\n\r\n$primary: #2ad4b9;//#0bd6be;\r\n$success: #4cc650; //#4cc673;//\r\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\r\n$danger: #d93e63;\r\n$secondary: #0bd6cd; //#0bd6a3;\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n\r\n.border-top {\r\n    border-top: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-right {\r\n    border-right: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-bottom {\r\n    border-bottom: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-left {\r\n    border-left: 1px solid rgba(#000, 0.05);\r\n}\r\n//////////////////////////////////////////\r\n\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n/**/\n.hint {\n\tfont-size: 10px;\n\topacity: 0.5;\n\tcolor: inherit;\n\tdisplay: block;\n\n}\n\n.bordered {\n\tborder: 1px solid rgba(#000, 0.1);\n\tbox-shadow: 0 2px 4px rgba(#000, 0.1);\n\n\t&>>>.tabset-menu {\n\t\tbackground: #eee;\n\t}\n}\n\n</style>\n","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.hint {\n  font-size: 10px;\n  opacity: 0.5;\n  color: inherit;\n  display: block;\n}\n\n.bordered {\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.bordered > > > .tabset-menu {\n  background: #eee;\n}\n\n/*# sourceMappingURL=contact.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$5 = "data-v-686aece0";
  /* module identifier */
  const __vue_module_identifier__$5 = undefined;
  /* functional template */
  const __vue_is_functional_template__$5 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$5 = __vue_normalize__(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    false,
    __vue_create_injector__,
    undefined,
    undefined
  );

export default __vue_component__$5;
//# sourceMappingURL=contact-c7a8006d.js.map
