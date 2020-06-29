
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { b8 as MailoutRenderPreview, b9 as MailoutTestPanel, bb as MailoutResultsPanel, ba as MailoutPreflightPanel, bl as __vue_normalize__, bm as __vue_create_injector__ } from './index-06d15718.js';
import Vue from 'vue';
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
import { F as FluroContentViewMixin } from './FluroContentViewMixin-e004c474.js';

//

let InfoCell = Vue.extend({
  props: {
    'row': {
      type: Object
    },
    'column': {
      type: Object
    },
    'data': {// type: Object,
    }
  },
  methods: {
    info() {
      this.$fluro.modal({
        component: CorrespondenceInfoModal,
        options: {
          item: this.row
        }
      });
    }

  },
  template: `<v-btn class="ma-0" small @click="info">
   Info
    </v-btn>`
}); /////////////////////////////////

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

  mounted() {
    console.log('RECREATED');
  },

  components: {
    // SearchInput,
    // FluroTable,
    // FluroContentFormField,
    // FluroContentSelectButton,
    MailoutRenderPreview,
    MailoutTestPanel,
    MailoutResultsPanel,
    MailoutPreflightPanel
  },
  mixins: [FluroContentViewMixin],
  methods: {},
  computed: {
    definitionName() {
      return this.item.definition;
    },

    resultsEnabled() {
      var self = this;

      if (self.item.state == 'sent') {
        return true;
      }

      if (self.item.stats && self.item.stats.mailoutSent) {
        return true;
      }
    },

    sendHeading() {
      var self = this;

      switch (self.item.state) {
        case 'scheduled':
          if (!this.duration) {
            return 'Scheduled';
          }

          return 'Scheduled'; // return `Sending in ${self.countdown}`;

        default:
          return 'Publish';
      }
    },

    data() {
      return this.item.data || {};
    },

    definedFields() {
      return this.config.definition.fields;
    }

  },

  data() {
    return {
      activeTabIndex: 0,
      search: ''
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
      _vm.loading
        ? [_c("fluro-page-preloader", { attrs: { contain: "" } })]
        : [
            _c(
              "tabset",
              {
                attrs: { justified: true },
                model: {
                  value: _vm.activeTabIndex,
                  callback: function($$v) {
                    _vm.activeTabIndex = $$v;
                  },
                  expression: "activeTabIndex"
                }
              },
              [
                _vm.item.state == "sent"
                  ? _c(
                      "tab",
                      { attrs: { heading: "Results" } },
                      [
                        _c("mailout-results-panel", {
                          model: {
                            value: _vm.item,
                            callback: function($$v) {
                              _vm.item = $$v;
                            },
                            expression: "item"
                          }
                        })
                      ],
                      1
                    )
                  : _vm._e(),
                _vm._v(" "),
                _c(
                  "tab",
                  { attrs: { heading: "Rendered Preview" } },
                  [
                    _c("mailout-render-preview", {
                      attrs: {
                        mailout: _vm.item._id,
                        definition: _vm.item.definition
                      }
                    })
                  ],
                  1
                ),
                _vm._v(" "),
                _vm.item.state != "sent"
                  ? _c(
                      "tab",
                      { attrs: { heading: "Test" } },
                      [
                        _c("mailout-test-panel", {
                          model: {
                            value: _vm.item,
                            callback: function($$v) {
                              _vm.item = $$v;
                            },
                            expression: "item"
                          }
                        })
                      ],
                      1
                    )
                  : _vm._e(),
                _vm._v(" "),
                _vm.item.state != "sent"
                  ? _c(
                      "tab",
                      { attrs: { heading: _vm.sendHeading } },
                      [
                        _c("mailout-preflight-panel", {
                          model: {
                            value: _vm.item,
                            callback: function($$v) {
                              _vm.item = $$v;
                            },
                            expression: "item"
                          }
                        })
                      ],
                      1
                    )
                  : _vm._e(),
                _vm._v(" "),
                _vm.item.state != "sent" && _vm.resultsEnabled
                  ? _c(
                      "tab",
                      { attrs: { heading: "Results" } },
                      [
                        _c("mailout-results-panel", {
                          model: {
                            value: _vm.item,
                            callback: function($$v) {
                              _vm.item = $$v;
                            },
                            expression: "item"
                          }
                        })
                      ],
                      1
                    )
                  : _vm._e()
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
    inject("data-v-a37635b0_0", { source: "/**/\n.border-top[data-v-a37635b0] {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right[data-v-a37635b0] {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom[data-v-a37635b0], .row-item[data-v-a37635b0] {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left[data-v-a37635b0] {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.row-item[data-v-a37635b0] {\n  display: block;\n  padding: 10px;\n  color: inherit;\n  text-decoration: none;\n}\n.row-item[data-v-a37635b0]:hover {\n  background: #fafafa;\n}\n.stat-box[data-v-a37635b0] {\n  padding: 10px;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  border-radius: 3px;\n  text-align: center;\n  margin: 2px;\n  background: linear-gradient(#fff, #fafafa);\n}\n.stat-box label[data-v-a37635b0] {\n  text-transform: uppercase;\n  font-weight: 500;\n  font-size: 10px;\n  opacity: 0.5;\n  letter-spacing: 0.05em;\n}\n.stat-box h3[data-v-a37635b0] {\n  font-size: 40px;\n  display: block;\n  line-height: 50px;\n}\n\n/*# sourceMappingURL=mailout.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/view/panels/mailout.vue","mailout.vue"],"names":[],"mappings":"AAiLA,GAAA;AAYA;EACA,yCAAA;AC3LA;AD8LA;EACA,2CAAA;AC3LA;AD8LA;EACA,4CAAA;AC3LA;AD8LA;EACA,0CAAA;AC3LA;;ADmMA,GAAA;AACA;EACA,cAAA;EACA,aAAA;EAEA,cAAA;EACA,qBAAA;ACjMA;ADmMA;EACA,mBAAA;ACjMA;ADuMA;EACA,aAAA;EACA,oCAAA;EACA,kBAAA;EACA,kBAAA;EACA,WAAA;EACA,0CAAA;ACpMA;ADuMA;EACA,yBAAA;EAEA,gBAAA;EACA,eAAA;EACA,YAAA;EACA,sBAAA;ACtMA;ADyMA;EACA,eAAA;EACA,cAAA;EACA,iBAAA;ACvMA;;AAEA,sCAAsC","file":"mailout.vue","sourcesContent":["<template>\n    <flex-column>\n        <template v-if=\"loading\">\n            <fluro-page-preloader contain />\n        </template>\n        <template v-else>\n            <!-- <pre>{{activeTabIndex}} {{item.state}} {{resultsEnabled}}</pre> -->\n            <tabset v-model=\"activeTabIndex\" :justified=\"true\">\n                <tab heading=\"Results\" v-if=\"item.state == 'sent'\">\n                     <mailout-results-panel v-model=\"item\"/>\n                    \n                </tab>\n                <tab heading=\"Rendered Preview\">\n                    <mailout-render-preview :mailout=\"item._id\" :definition=\"item.definition\" />\n                </tab>\n                <tab heading=\"Test\" v-if=\"item.state != 'sent'\">\n                    <mailout-test-panel v-model=\"item\"/>\n                </tab>\n                <tab :heading=\"sendHeading\" v-if=\"item.state != 'sent'\">\n                    <mailout-preflight-panel v-model=\"item\"/>\n                    \n                </tab>\n                <tab heading=\"Results\" v-if=\"item.state != 'sent' && resultsEnabled\">\n                     <mailout-results-panel v-model=\"item\"/>\n                    \n                </tab>\n            </tabset>\n        </template>\n    </flex-column>\n</template>\n<script>\n/////////////////////////////////\n\n\n\nimport Vue from 'vue';\n\n\nimport FluroContentViewMixin from 'src/components/content/view/FluroContentViewMixin.js';\nimport MailoutRenderPreview from 'src/components/mailout/MailoutRenderPreview.vue';\nimport MailoutTestPanel from 'src/components/mailout/MailoutTestPanel.vue';\nimport MailoutResultsPanel from 'src/components/mailout/MailoutResultsPanel.vue';\nimport MailoutPreflightPanel from 'src/components/mailout/MailoutPreflightPanel.vue';\n\n\n\n//////////////////////////////////////////////////////\n\nlet InfoCell = Vue.extend({\n    props: {\n        'row': {\n            type: Object,\n        },\n        'column': {\n            type: Object,\n        },\n        'data': {\n            // type: Object,\n        },\n    },\n    methods: {\n        info() {\n            this.$fluro.modal({\n                component: CorrespondenceInfoModal,\n                options: {\n                    item: this.row,\n                }\n            })\n        }\n    },\n    template: `<v-btn class=\"ma-0\" small @click=\"info\">\n   Info\n    </v-btn>`,\n});\n\n\n/////////////////////////////////\n\nexport default {\n\n    props: {\n        config: {\n            type: Object,\n            required: true,\n        },\n        item: {\n            type: Object,\n            required: true,\n        },\n    },\n    mounted() {\n        console.log('RECREATED')\n    },\n    components: {\n        // SearchInput,\n        // FluroTable,\n        // FluroContentFormField,\n        // FluroContentSelectButton,\n        MailoutRenderPreview,\n        MailoutTestPanel,\n        MailoutResultsPanel,\n        MailoutPreflightPanel,\n    },\n    mixins: [FluroContentViewMixin],\n    methods: {\n        \n        \n        \n        \n        \n        \n        \n        \n        \n        \n    },\n    \n    \n    computed: {\n        \n        \n        \n        \n        \n        \n        definitionName() {\n            return this.item.definition;\n        },\n        resultsEnabled() {\n\n            var self = this;\n\n            if (self.item.state == 'sent') {\n                return true;\n            }\n\n            if (self.item.stats && self.item.stats.mailoutSent) {\n                return true;\n            }\n        },\n        sendHeading() {\n            var self = this;\n            switch (self.item.state) {\n                case 'scheduled':\n\n                    if (!this.duration) {\n                        return 'Scheduled';\n                    }\n\n                    return 'Scheduled';\n                    // return `Sending in ${self.countdown}`;\n\n                    break;\n                default:\n                    return 'Publish'\n                    break;\n            }\n        },\n        data() {\n            return this.item.data || {}\n        },\n        definedFields() {\n            return this.config.definition.fields;\n        },\n    },\n    data() {\n\n        return {\n            activeTabIndex:0,\n            search: '',\n            \n        }\n    },\n}\n</script>\n<style scoped lang=\"scss\">\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n.row-item {\n    display: block;\n    padding: 10px;\n    @extend .border-bottom !optional;\n    color: inherit;\n    text-decoration: none;\n\n    &:hover {\n        background: #fafafa;\n    }\n}\n\n.search {}\n\n.stat-box {\n    padding: 10px;\n    border: 1px solid rgba(#000, 0.1);\n    border-radius: 3px;\n    text-align: center;\n    margin: 2px;\n    background: linear-gradient(#fff, #fafafa);\n\n\n    label {\n        text-transform: uppercase;\n        ;\n        font-weight: 500;\n        font-size: 10px;\n        opacity: 0.5;\n        letter-spacing: 0.05em;\n    }\n\n    h3 {\n        font-size: 40px;\n        display: block;\n        line-height: 50px;\n    }\n}\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom, .row-item {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.row-item {\n  display: block;\n  padding: 10px;\n  color: inherit;\n  text-decoration: none;\n}\n.row-item:hover {\n  background: #fafafa;\n}\n\n.stat-box {\n  padding: 10px;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  border-radius: 3px;\n  text-align: center;\n  margin: 2px;\n  background: linear-gradient(#fff, #fafafa);\n}\n.stat-box label {\n  text-transform: uppercase;\n  font-weight: 500;\n  font-size: 10px;\n  opacity: 0.5;\n  letter-spacing: 0.05em;\n}\n.stat-box h3 {\n  font-size: 40px;\n  display: block;\n  line-height: 50px;\n}\n\n/*# sourceMappingURL=mailout.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-a37635b0";
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
//# sourceMappingURL=mailout-53f0b30c.js.map
