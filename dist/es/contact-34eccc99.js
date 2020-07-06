
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { f as FluroAvatar, bg as FluroContactCommunicateMixin, bm as __vue_normalize__, bn as __vue_create_injector__ } from './index-90a032bb.js';
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
import { F as FluroContentViewMixin } from './FluroContentViewMixin-5150d51b.js';

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
    FluroAvatar
  },
  mixins: [FluroContentViewMixin, FluroContactCommunicateMixin],
  methods: {},
  computed: {
    data() {
      return this.item.data || {};
    },

    fields() {
      return this.config.definition.fields;
    }

  },

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
    "flex-column-body",
    [
      _c(
        "v-container",
        [
          _c(
            "v-layout",
            { attrs: { "align-center": "", row: "", wrap: "" } },
            [
              _c(
                "v-flex",
                { attrs: { shrink: "" } },
                [
                  _c("fluro-avatar", {
                    attrs: { left: "", xl: "", id: _vm.item, type: "contact" }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-flex",
                [
                  _c("h3", [_vm._v(_vm._s(_vm.item.title))]),
                  _vm._v(" "),
                  _c("h6", [
                    _vm._v(
                      _vm._s(
                        _vm._f("definitionTitle")(
                          _vm.item.definition || _vm.item._type
                        )
                      )
                    )
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "muted" }, [
                    _vm._v(_vm._s(_vm.item.gender))
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "muted" }, [
                    _vm._v(_vm._s(_vm.item.age))
                  ]),
                  _vm._v(" "),
                  _c(
                    "Div",
                    [
                      _c(
                        "v-btn",
                        {
                          staticClass: "ma-0",
                          attrs: { small: "" },
                          on: {
                            click: function($event) {
                              return _vm.$fluro.global.view(_vm.item, true)
                            }
                          }
                        },
                        [
                          _vm._v(
                            "\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tView Profile\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t"
                          ),
                          _c("fluro-icon", { attrs: { icon: "view" } })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-btn",
                        {
                          staticClass: "ma-0",
                          attrs: { small: "" },
                          on: {
                            click: function($event) {
                              return _vm.$fluro.global.edit(_vm.item, true)
                            }
                          }
                        },
                        [
                          _vm._v(
                            "\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tEdit Profile\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t"
                          ),
                          _c("fluro-icon", { attrs: { icon: "pencil" } })
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
                { staticClass: "text-xs-center" },
                [
                  _c(
                    "v-btn",
                    {
                      directives: [{ name: "tippy", rawName: "v-tippy" }],
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
                        attrs: { library: "fas", icon: "envelope" }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      directives: [{ name: "tippy", rawName: "v-tippy" }],
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
                        attrs: { library: "fas", icon: "comment" }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      directives: [{ name: "tippy", rawName: "v-tippy" }],
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
                        attrs: { library: "fas", icon: "phone" }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      directives: [{ name: "tippy", rawName: "v-tippy" }],
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
                        attrs: { library: "fas", type: "post" }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      directives: [{ name: "tippy", rawName: "v-tippy" }],
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
                        attrs: { library: "fas", icon: "address-book" }
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
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-643160a9_0", { source: "/**/\n.border-top[data-v-643160a9] {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right[data-v-643160a9] {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom[data-v-643160a9] {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left[data-v-643160a9] {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n\n/*# sourceMappingURL=contact.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/view/panels/contact.vue","contact.vue"],"names":[],"mappings":"AA6FA,GAAA;AAYA;EACA,yCAAA;ACvGA;AD0GA;EACA,2CAAA;ACvGA;AD0GA;EACA,4CAAA;ACvGA;AD0GA;EACA,0CAAA;ACvGA;;AD+GA,GAAA;;AC3GA,sCAAsC","file":"contact.vue","sourcesContent":["<template>\n\t\t\t\t<flex-column-body>\n\t\t\t\t\t\t\t\t<v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t<v-layout align-center row wrap>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex shrink>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-avatar left xl :id=\"item\" type=\"contact\"></fluro-avatar>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h3>{{item.title}}</h3>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h6>{{item.definition || item._type | definitionTitle}}</h6>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"muted\">{{item.gender}}</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"muted\">{{item.age}}</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<Div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-btn small class=\"ma-0\" @click=\"$fluro.global.view(item, true)\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tView Profile\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-icon icon=\"view\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-btn>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-btn small class=\"ma-0\" @click=\"$fluro.global.edit(item, true)\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tEdit Profile\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-icon icon=\"pencil\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-btn>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</Div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex class=\"text-xs-center\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-btn class=\"ma-0 mx-1 ml-0\" :disabled=\"!canEmail\" @click=\"communicate('email')\" icon color=\"primary\" content=\"Send Email\" v-tippy>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-icon library=\"fas\" icon=\"envelope\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-btn>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-btn class=\"ma-0 mx-1\" :disabled=\"!canSMS\" @click=\"communicate('sms')\" icon color=\"primary\" content=\"Send SMS\" v-tippy>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-icon library=\"fas\" icon=\"comment\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-btn>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-btn class=\"ma-0 mx-1\" :disabled=\"!canCall\" @click=\"communicate('phone')\" icon color=\"primary\" content=\"Call\" v-tippy>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-icon library=\"fas\" icon=\"phone\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-btn>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-btn class=\"ma-0 mx-1\" :disabled=\"!canPost\" @click=\"addPost\" icon color=\"primary\" content=\"Add Post/Note\" v-tippy>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-icon library=\"fas\" type=\"post\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-btn>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-btn class=\"ma-0 mx-1 mr-0\" icon color=\"primary\" @click=\"communicate('vcard')\" content=\"Add to Address Book\" v-tippy>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <fluro-icon library=\"fas\" icon=\"id-card\" /> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-icon library=\"fas\" icon=\"address-book\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-btn>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t<!-- <h5></h5> -->\n\t\t\t\t\t\t\t\t\t\t\t\t<!-- <pre>{{item}}</pre> -->\n\t\t\t\t\t\t\t\t</v-container>\n\t\t\t\t</flex-column-body>\n</template>\n<script>\n/////////////////////////////////\n\nimport Vue from 'vue';\n\nimport FluroContactCommunicateMixin from 'src/mixins/FluroContactCommunicateMixin';\nimport FluroContentViewMixin from 'src/components/content/view/FluroContentViewMixin.js';\nimport FluroAvatar from 'src/components/FluroAvatar.vue';\n\n/////////////////////////////////\n\nexport default {\n\t\t\t\tprops: {\n\t\t\t\t\t\t\t\tconfig: {\n\t\t\t\t\t\t\t\t\t\t\t\ttype: Object,\n\t\t\t\t\t\t\t\t\t\t\t\trequired: true,\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\titem: {\n\t\t\t\t\t\t\t\t\t\t\t\ttype: Object,\n\t\t\t\t\t\t\t\t\t\t\t\trequired: true,\n\t\t\t\t\t\t\t\t},\n\t\t\t\t},\n\t\t\t\tcomponents: {\n\t\t\t\t\t\t\t\tFluroAvatar,\n\t\t\t\t},\n\t\t\t\tmixins: [FluroContentViewMixin, FluroContactCommunicateMixin],\n\t\t\t\tmethods: {},\n\t\t\t\tcomputed: {\n\t\t\t\t\t\t\t\tdata() {\n\t\t\t\t\t\t\t\t\t\t\t\treturn this.item.data || {}\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tfields() {\n\t\t\t\t\t\t\t\t\t\t\t\treturn this.config.definition.fields;\n\t\t\t\t\t\t\t\t}\n\t\t\t\t},\n\t\t\t\tdata() {\n\t\t\t\t\t\t\t\treturn {}\n\t\t\t\t},\n\t\t\t\tcreated() {\n\t\t\t\t\t\t\t\tconsole.log('THIS RENDERER', this)\n\t\t\t\t}\n}\n\n</script>\n<style scoped lang=\"scss\">\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n</style>\n","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n\n/*# sourceMappingURL=contact.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-643160a9";
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
//# sourceMappingURL=contact-34eccc99.js.map
