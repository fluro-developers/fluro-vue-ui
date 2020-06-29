
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { bl as __vue_normalize__, bm as __vue_create_injector__ } from './index-441500fa.js';
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
import { F as FluroContentViewMixin } from './FluroContentViewMixin-8827c948.js';

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
  computed: {
    qrCodeURL() {
      var self = this;
      var interactionID = self.$fluro.utils.getStringID(self.item.interaction);
      var ticketID = self.$fluro.utils.getStringID(self.item);

      if (interactionID) {
        return `${self.$fluro.api.defaults.baseURL}/system/qr?input=http://tickets.fluro.io/interaction/${interactionID}`;
      } else {
        return `${self.$fluro.api.defaults.baseURL}/system/qr?input=http://tickets.fluro.io/ticket/${ticketID}`;
      } // $scope.ticketCodeURL = Fluro.apiURL + '/system/qr?input=http://tickets.fluro.io/ticket/' + ticketID;
      // $scope.interactionCodeURL = Fluro.apiURL + '/system/qr?input=http://tickets.fluro.io/interaction/' + interactionID;

    },

    data() {
      return this.item.data || {};
    },

    definedFields() {
      return this.definition ? this.definition.fields : null;
    }

  },

  data() {
    return {};
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
    "flex-column-body",
    [
      _c(
        "v-container",
        { staticStyle: { background: "#eee" }, attrs: { fluid: "" } },
        [
          _c(
            "constrain",
            { attrs: { sm: "" } },
            [
              _c(
                "v-layout",
                [
                  _c("v-flex", [
                    _c("img", {
                      staticClass: "qrcode",
                      attrs: { src: _vm.qrCodeURL }
                    })
                  ])
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
        "v-container",
        { attrs: { fluid: "" } },
        [
          _c(
            "constrain",
            { attrs: { sm: "" } },
            [
              _c("h1", [_vm._v(_vm._s(_vm.item.title))]),
              _vm._v(" "),
              _vm.item.email
                ? _c(
                    "v-input",
                    { staticClass: "no-flex" },
                    [
                      _c("v-label", [
                        _vm._v(
                          "\n            \t\tPrimary Email Address\n            \t"
                        )
                      ]),
                      _vm._v(" "),
                      _c("div", [
                        _vm._v(
                          "\n            \t\t" +
                            _vm._s(_vm.item.email) +
                            "\n            \t"
                        )
                      ])
                    ],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.item.contact
                ? _c(
                    "v-input",
                    { staticClass: "no-flex" },
                    [
                      _c("v-label", [
                        _vm._v("\n            \t\tContact\n            \t")
                      ]),
                      _vm._v(" "),
                      _c("fluro-list-item", {
                        attrs: { bordered: true, item: _vm.item.contact },
                        nativeOn: {
                          click: function($event) {
                            return _vm.$fluro.global.view(_vm.item.contact)
                          }
                        }
                      })
                    ],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.item.event
                ? _c(
                    "v-input",
                    { staticClass: "no-flex" },
                    [
                      _c("v-label", [
                        _vm._v("\n            \t\tEvent\n            \t")
                      ]),
                      _vm._v(" "),
                      _c("fluro-list-item", {
                        attrs: { bordered: true, item: _vm.item.event },
                        nativeOn: {
                          click: function($event) {
                            return _vm.$fluro.global.view(_vm.item.event)
                          }
                        }
                      })
                    ],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.item.interaction
                ? _c(
                    "v-input",
                    { staticClass: "no-flex" },
                    [
                      _c("v-label", [
                        _vm._v("\n            \t\tInteraction\n            \t")
                      ]),
                      _vm._v(" "),
                      _c("fluro-list-item", {
                        attrs: { bordered: true, item: _vm.item.interaction },
                        nativeOn: {
                          click: function($event) {
                            return _vm.$fluro.global.view(_vm.item.interaction)
                          }
                        }
                      })
                    ],
                    1
                  )
                : _vm._e(),
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
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-de35531a_0", { source: "/**/\n.border-top[data-v-de35531a] {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right[data-v-de35531a] {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom[data-v-de35531a] {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left[data-v-de35531a] {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.qrcode[data-v-de35531a] {\n  display: block;\n  border: 5px solid #000;\n  background: #000;\n  margin: auto;\n}\n\n/*# sourceMappingURL=ticket.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/view/panels/ticket.vue","ticket.vue"],"names":[],"mappings":"AA4HA,GAAA;AAYA;EACA,yCAAA;ACtIA;ADyIA;EACA,2CAAA;ACtIA;ADyIA;EACA,4CAAA;ACtIA;ADyIA;EACA,0CAAA;ACtIA;;AD8IA,GAAA;AAEA;EACA,cAAA;EACA,sBAAA;EACA,gBAAA;EACA,YAAA;AC5IA;;AAEA,qCAAqC","file":"ticket.vue","sourcesContent":["<template>\n    <flex-column-body>\n    <v-container fluid style=\"background: #eee;\">\n    \t<constrain sm>\n    \t\t<v-layout>\n    \t\t\t<v-flex>\n    \t\t\t\t\t<img class=\"qrcode\" :src=\"qrCodeURL\"/>\n    \t\t\t</v-flex>\n    \t\t\t<!-- <v-flex v-else> -->\n    \t\t\t\t\t<!-- <img :src=\"ticketCodeURL\"/> -->\n    \t\t\t<!-- </v-flex> -->\n    \t\t\t<!-- <v-spacer/>\n    \t\t\t<v-flex>\n    \t\t\t\t\t<img :src=\"ticketCodeURL\"/>\n    \t\t\t</v-flex> -->\n                <!-- <div class=\"form-group col-xs-12 col-sm-4\">\n                    <label>Ticket Code</label>\n                    <div class=\"qrcode\">\n                        <img ng-src=\"{{ticketCodeURL}}\" />\n                    </div>\n                </div>\n                <div class=\"form-group col-xs-12 col-sm-4\">\n                    <label>Interaction Code</label>\n                    <div class=\"qrcode\">\n                        <img ng-src=\"{{interactionCodeURL}}\" />\n                    </div>\n                </div> -->\n           </v-layout>\n    \t</constrain>\n    </v-container>\n    \t<v-container fluid>\n        <constrain sm>\n            <h1>{{item.title}}</h1>\n\n            <v-input class=\"no-flex\" v-if=\"item.email\">\n            \t<v-label>\n            \t\tPrimary Email Address\n            \t</v-label>\n            \t<div>\n            \t\t{{item.email}}\n            \t</div>\n            </v-input>\n\n            <v-input class=\"no-flex\" v-if=\"item.contact\">\n            \t<v-label>\n            \t\tContact\n            \t</v-label>\n                <fluro-list-item @click.native=\"$fluro.global.view(item.contact)\" :bordered=\"true\" :item=\"item.contact\"/>\n            </v-input>\n\n            <v-input class=\"no-flex\" v-if=\"item.event\">\n            \t<v-label>\n            \t\tEvent\n            \t</v-label>\n                <fluro-list-item @click.native=\"$fluro.global.view(item.event)\" :bordered=\"true\" :item=\"item.event\"/>\n            </v-input>\n\n            <v-input class=\"no-flex\" v-if=\"item.interaction\">\n            \t<v-label>\n            \t\tInteraction\n            \t</v-label>\n                <fluro-list-item @click.native=\"$fluro.global.view(item.interaction)\" :bordered=\"true\" :item=\"item.interaction\"/>\n            </v-input>\n            \n            <!-- <pre>{{item}}</pre> -->\n            <fluro-content-render :fields=\"definedFields\" v-model=\"item.data\" />\n            \n        </constrain>\n    </v-container>\n</flex-column-body>\n</template>\n<script>\n/////////////////////////////////\n\nimport Vue from 'vue';\nimport FluroContentViewMixin from 'src/components/content/view/FluroContentViewMixin.js';\n\n/////////////////////////////////\n\nexport default {\n    props: {\n        config: {\n            type: Object,\n            required: true,\n        },\n        item: {\n            type: Object,\n            required: true,\n        },\n    },\n    components: {\n    },\n    mixins: [FluroContentViewMixin],\n    methods: {},\n    computed: {\n    \tqrCodeURL() {\n\n    \t\tvar self = this;\n    \t\tvar interactionID = self.$fluro.utils.getStringID(self.item.interaction);\n    \t\tvar ticketID = self.$fluro.utils.getStringID(self.item);\n    \t\tif(interactionID) {\n    \t\t\treturn `${self.$fluro.api.defaults.baseURL}/system/qr?input=http://tickets.fluro.io/interaction/${interactionID}`;\n    \t\t} else {\n    \t\t\treturn `${self.$fluro.api.defaults.baseURL}/system/qr?input=http://tickets.fluro.io/ticket/${ticketID}`;\n    \t\t}\n\n\t// $scope.ticketCodeURL = Fluro.apiURL + '/system/qr?input=http://tickets.fluro.io/ticket/' + ticketID;\n\t// $scope.interactionCodeURL = Fluro.apiURL + '/system/qr?input=http://tickets.fluro.io/interaction/' + interactionID;\n\n    \t},\n        data() {\n            return this.item.data || {}\n        },\n        definedFields() {\n            return this.definition ? this.definition.fields : null;\n        }\n    },\n    data() {\n        return {}\n    },\n}\n</script>\n<style scoped lang=\"scss\">\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n\n.qrcode {\n\tdisplay: block;\n\tborder:5px solid #000;\n\tbackground: #000;\n\tmargin:auto;\n}\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.qrcode {\n  display: block;\n  border: 5px solid #000;\n  background: #000;\n  margin: auto;\n}\n\n/*# sourceMappingURL=ticket.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-de35531a";
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
//# sourceMappingURL=ticket-3ef8cd04.js.map
