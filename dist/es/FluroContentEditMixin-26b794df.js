
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { bl as __vue_normalize__, bm as __vue_create_injector__, aM as FluroContentForm, c as FluroHelp, aN as FluroContentFormField } from './index-ece4efc9.js';

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script = {
  props: {
    value: {
      type: String,
      default: 'secure'
    }
  },

  data() {
    return {
      model: this.value
    };
  },

  watch: {
    value() {
      this.model = this.value;
    }

  },
  methods: {
    select(value) {
      this.model = value;
      this.$emit('input', value);
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
  return _c("div", { staticClass: "privacy-select" }, [
    _c(
      "a",
      {
        staticClass: "privacy-select-button",
        class: { active: _vm.model == "secure" },
        on: {
          click: function($event) {
            return _vm.select("secure")
          }
        }
      },
      [
        _c(
          "div",
          [
            _c("fluro-icon", {
              staticClass: "icn",
              attrs: { icon: "lock-alt" }
            }),
            _c("br"),
            _vm._v(" "),
            _c("strong", [_vm._v("Secure")]),
            _c("br"),
            _vm._v(" "),
            _c("em", [
              _vm._v(
                "Only users and applications with correct permissions can view"
              )
            ])
          ],
          1
        )
      ]
    ),
    _vm._v(" "),
    _c(
      "a",
      {
        staticClass: "privacy-select-button",
        class: { active: _vm.model == "public" },
        on: {
          click: function($event) {
            return _vm.select("public")
          }
        }
      },
      [
        _c(
          "div",
          [
            _c("fluro-icon", { staticClass: "icn", attrs: { icon: "globe" } }),
            _c("br"),
            _vm._v(" "),
            _c("strong", [_vm._v("Public")]),
            _c("br"),
            _vm._v(" "),
            _c("em", [_vm._v("Anyone in the world can view")])
          ],
          1
        )
      ]
    )
  ])
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-3a91c5a1_0", { source: "/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.privacy-select {\n  display: flex;\n  border-radius: 5px;\n}\n.privacy-select .privacy-select-button {\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  text-align: center;\n  color: inherit;\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 20px 10px;\n  transition: all 0.2s;\n  background: linear-gradient(#fff, #eee);\n}\n.privacy-select .privacy-select-button.active {\n  background: #4c4c4c;\n  color: #fff !important;\n  box-shadow: inset 5px 20px 50px rgba(0, 0, 0, 0.3);\n}\n.privacy-select .privacy-select-button .icn {\n  font-size: 1.3em;\n  opacity: 0.5;\n}\n.privacy-select .privacy-select-button em {\n  font-size: 0.8em;\n  font-style: italic;\n  opacity: 0.5;\n  height: 30px;\n  line-height: 13px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.privacy-select .privacy-select-button:first-child {\n  border-radius: 4px 0 0 4px;\n}\n.privacy-select .privacy-select-button:last-child {\n  border-radius: 0 4px 4px 0;\n}\n\n/*# sourceMappingURL=FluroPrivacySelect.vue.map */", map: {"version":3,"sources":["C:\\Users\\User\\Documents\\fluro\\fluro-vue-ui\\src\\components\\form\\FluroPrivacySelect.vue","FluroPrivacySelect.vue"],"names":[],"mappings":"AAkDA,GAAA;AAYA;EACA,yCAAA;AC5DA;AD+DA;EACA,2CAAA;AC5DA;AD+DA;EACA,4CAAA;AC5DA;AD+DA;EACA,0CAAA;AC5DA;;ADoEA,GAAA;AAEA;EACA,aAAA;EACA,kBAAA;AClEA;ADqEA;EACA,oCAAA;EAEA,kBAAA;EACA,cAAA;EAEA,OAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,kBAAA;EACA,oBAAA;EACA,uCAAA;ACrEA;ADuEA;EACA,mBAAA;EACA,sBAAA;EACA,kDAAA;ACrEA;ADwEA;EACA,gBAAA;EACA,YAAA;ACtEA;ADyEA;EACA,gBAAA;EACA,kBAAA;EACA,YAAA;EACA,YAAA;EACA,iBAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;ACvEA;AD0EA;EACA,0BAAA;ACxEA;AD2EA;EACA,0BAAA;ACzEA;;AAEA,iDAAiD","file":"FluroPrivacySelect.vue","sourcesContent":["<template>\n    <div class=\"privacy-select\">\n        <!-- <div class=\"privacy-select btn-group btn-group-justified\"> -->\n            <a class=\"privacy-select-button\" @click=\"select('secure')\" :class=\"{'active':model == 'secure'}\">\n                <div>\n                <fluro-icon class=\"icn\" icon=\"lock-alt\"/><br/>\n                <strong>Secure</strong><br />\n                <em>Only users and applications with correct permissions can view</em>\n            </div>\n            </a>\n            <a class=\"privacy-select-button\" @click=\"select('public')\" :class=\"{'active':model == 'public'}\">\n                <div>\n                <fluro-icon class=\"icn\" icon=\"globe\"/><br/>\n                <strong>Public</strong><br />\n                <em>Anyone in the world can view</em>\n                </div>\n\n            </a>\n        <!-- </div> -->\n    </div>\n</template>\n\n<script>\nexport default {\n\tprops:{\n\t\tvalue:{\n\t\t\ttype:String,\n\t\t\tdefault:'secure',\n\t\t}\n\t},\n\tdata() {\n\t\treturn {\n\t\t\tmodel:this.value,\n\t\t}\n\t},\n\twatch:{\n\t\tvalue() {\n\t\t\tthis.model = this.value;\n\t\t},\n\t},\n\tmethods:{\n\t\tselect(value) {\n\t\t\tthis.model = value;\n\t\t\tthis.$emit('input', value);\n\t\t}\n\t}\n}\n</script>\n<style lang=\"scss\">\n\n/**/\r\n\r\n$primary: #2ad4b9;//#0bd6be;\r\n$success: #4cc650; //#4cc673;//\r\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\r\n$danger: #d93e63;\r\n$secondary: #0bd6cd; //#0bd6a3;\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n\r\n.border-top {\r\n    border-top: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-right {\r\n    border-right: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-bottom {\r\n    border-bottom: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-left {\r\n    border-left: 1px solid rgba(#000, 0.05);\r\n}\r\n//////////////////////////////////////////\r\n\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n/**/\n\n.privacy-select {\n\tdisplay: flex;\n\tborder-radius: 5px;\n\t// border:1px solid rgba(#000, 0.1);\n\n\t.privacy-select-button {\n\t\tborder:1px solid rgba(#000, 0.1);\n\t\t// border-top:1px solid rgba(#fff, 0.2);\n\t\ttext-align: center;\n\t\tcolor: inherit;\n\t\t// color:rgba(#000,0.5);\n\t\tflex:1;\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\t\tpadding: 20px 10px;\n\t\ttransition: all 0.2s;\n\t\tbackground: linear-gradient(#fff, #eee);\n\n\t\t&.active {\n\t\t\tbackground: darken(desaturate($primary, 90%), 20%);\n\t\t\tcolor: #fff !important;\n\t\t\tbox-shadow: inset 5px 20px 50px rgba(#000, 0.3);\n\t\t}\n\n\t\t.icn {\n\t\t\tfont-size: 1.3em;\n\t\t\topacity: 0.5;\n\t\t}\n\n\t\tem {\n\t\t\tfont-size: 0.8em;\n\t\t\tfont-style: italic;;\n\t\t\topacity: 0.5;\n\t\t\theight:30px;\n\t\t\tline-height: 13px;\n\t\t\tdisplay: flex;\n\t\t\talign-items: center;\n\t\t\tjustify-content: center;\n\t\t}\n\n\t\t&:first-child {\n\t\t\tborder-radius: 4px 0 0 4px;\n\t\t}\n\n\t\t&:last-child {\n\t\t\tborder-radius: 0 4px 4px 0;\n\t\t}\n\t}\n}\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.privacy-select {\n  display: flex;\n  border-radius: 5px;\n}\n.privacy-select .privacy-select-button {\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  text-align: center;\n  color: inherit;\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 20px 10px;\n  transition: all 0.2s;\n  background: linear-gradient(#fff, #eee);\n}\n.privacy-select .privacy-select-button.active {\n  background: #4c4c4c;\n  color: #fff !important;\n  box-shadow: inset 5px 20px 50px rgba(0, 0, 0, 0.3);\n}\n.privacy-select .privacy-select-button .icn {\n  font-size: 1.3em;\n  opacity: 0.5;\n}\n.privacy-select .privacy-select-button em {\n  font-size: 0.8em;\n  font-style: italic;\n  opacity: 0.5;\n  height: 30px;\n  line-height: 13px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.privacy-select .privacy-select-button:first-child {\n  border-radius: 4px 0 0 4px;\n}\n.privacy-select .privacy-select-button:last-child {\n  border-radius: 0 4px 4px 0;\n}\n\n/*# sourceMappingURL=FluroPrivacySelect.vue.map */"]}, media: undefined });

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

var FluroContentEditMixin = {
  props: {
    config: {
      type: Object,
      required: true
    },
    context: {
      type: String,
      default: 'new'
    }
  },

  data() {
    return {
      loading: false
    };
  },

  mounted() {
    this.$set(this.model, '_type', this.config.type.definitionName);
  },

  extends: FluroContentForm,
  components: {
    'help': FluroHelp,
    FluroContentForm,
    FluroContentFormField,
    FluroPrivacySelect: __vue_component__
  },
  // mixins: [Layout],
  computed: {
    type() {
      return this.config.type;
    },

    typeName() {
      return this.type ? this.type.definitionName : '';
    },

    itemID() {
      return this.model._id;
    },

    definition() {
      return this.config.definition;
    },

    definedFields() {
      if (this.definition && this.definition.fields && this.definition.fields.length) {
        return this.definition.fields;
      }

      return [];
    },

    readableContentType() {
      return this.$fluro.types.readable(this.config.definition ? this.config.definition.definitionName : this.config.type.definitionName);
    },

    fullBody() {
      return this.definition && this.definition.data && this.definition.data.fullBody;
    },

    hideBody() {
      return this.definition && this.definition.data && this.definition.data.hideBody;
    },

    titleLabel() {
      return 'Title';
    },

    bodyLabel() {
      return 'Body';
    }

  },
  methods: {}
};

export { FluroContentEditMixin as F };
//# sourceMappingURL=FluroContentEditMixin-26b794df.js.map
