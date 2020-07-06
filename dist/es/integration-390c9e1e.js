
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { bm as __vue_normalize__, bn as __vue_create_injector__ } from './index-e3071c13.js';
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
import { F as FluroContentEditMixin } from './FluroContentEditMixin-6f99e2b7.js';

//

var script = {
  mixins: [FluroContentEditMixin],
  components: {},
  methods: {
    authenticate() {
      var self = this;
      var moduleName = self.model.module;

      if (!self.model._id) {
        return self.$fluro.error({
          message: 'Please save before authenticating'
        });
      }

      switch (moduleName) {
        case 'youtube':
          if (process.browser) {
            window.location.href = `${self.$fluro.apiURL}/integrate/${moduleName}/${self.model._id}/oauth`;
          }

          break;
      }
    },

    modelUpdated() {
      this.update(this.model);
    }

  },

  created() {
  },

  asyncComputed: {},
  computed: {
    showOutline() {
      return false; //true; //false;//true;//false;//true;
    },

    moduleOptions() {
      var array = [];
      array.push({
        title: 'Stripe',
        value: 'stripe'
      }, {
        title: 'Youtube API',
        value: 'youtube'
      }, {
        title: 'Facebook API',
        value: 'facebook'
      } // {
      //     title:'Facebook API',
      //     value:'facebook',
      // },
      );
      return array;
    },

    fieldsOutput() {
      var self = this;
      var array = []; ///////////////////////////////////

      addField('title', {
        title: 'Title',
        minimum: 1,
        maximum: 1,
        type: 'string'
      }); // ///////////////////////////////////

      addField('module', {
        title: 'Module',
        minimum: 1,
        maximum: 1,
        type: 'string',
        directive: 'select',
        options: self.moduleOptions
      });

      function addField(key, details) {
        details.key = key;
        array.push(details);
      }

      return array;
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
                [
                  _c(
                    "flex-column-body",
                    { staticStyle: { background: "#fafafa" } },
                    [
                      _c(
                        "v-container",
                        [
                          _c("constrain", { attrs: { sm: "" } }, [
                            _c(
                              "div",
                              { staticClass: "grid-list-xl" },
                              [
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
                                    field: _vm.fieldHash.module
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
                                  ? _c(
                                      "div",
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
                                  : _vm._e(),
                                _vm._v(" "),
                                _vm.model._id
                                  ? [
                                      _c(
                                        "v-btn",
                                        {
                                          staticClass: "ma-0",
                                          attrs: {
                                            large: "",
                                            color: "primary"
                                          },
                                          on: {
                                            click: function($event) {
                                              return _vm.authenticate()
                                            }
                                          }
                                        },
                                        [
                                          _vm._v(
                                            "\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tAuthenticate with Youtube\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t"
                                          ),
                                          _c("fluro-icon", {
                                            attrs: {
                                              icon: "youtube",
                                              library: "fab",
                                              right: ""
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ]
                                  : void 0
                              ],
                              2
                            )
                          ])
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
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-7a1aa64c_0", { source: "/**/\n.border-top[data-v-7a1aa64c] {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right[data-v-7a1aa64c] {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom[data-v-7a1aa64c] {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left[data-v-7a1aa64c] {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.hint[data-v-7a1aa64c] {\n  font-size: 10px;\n  opacity: 0.5;\n  color: inherit;\n  display: block;\n}\n\n/*# sourceMappingURL=integration.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/edit/panels/integration.vue","integration.vue"],"names":[],"mappings":"AAsJA,GAAA;AAYA;EACA,yCAAA;AChKA;ADmKA;EACA,2CAAA;AChKA;ADmKA;EACA,4CAAA;AChKA;ADmKA;EACA,0CAAA;AChKA;;ADwKA,GAAA;AACA;EACA,eAAA;EACA,YAAA;EACA,cAAA;EACA,cAAA;ACrKA;;AAEA,0CAA0C","file":"integration.vue","sourcesContent":["<template>\n\t\t\t\t<flex-column>\n\t\t\t\t\t\t\t\t<template v-if=\"loading\">\n\t\t\t\t\t\t\t\t\t\t\t\t<fluro-page-preloader contain />\n\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t<tabset v-else :justified=\"true\" :vertical=\"true\">\n\t\t\t\t\t\t\t\t\t\t\t\t<tab>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<flex-column-body style=\"background: #fafafa;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<constrain sm>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"grid-list-xl\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.title\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.module\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div v-if=\"definition && definition.fields && definition.fields.length\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form :options=\"options\" v-model=\"model.data\" :fields=\"definition.fields\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-content-form>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<template v-if=\"model._id\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-btn class=\"ma-0\" large @click=\"authenticate()\" color=\"primary\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tAuthenticate with Youtube\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-icon icon=\"youtube\" library=\"fab\" right />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-btn>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<template v-else>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</constrain>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</flex-column-body>\n\t\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t</tabset>\n\t\t\t\t</flex-column>\n</template>\n<script>\n/////////////////////////////////\n\nimport FluroContentEditMixin from 'src/components/content/edit/FluroContentEditMixin.js';\n\n\n/////////////////////////////////\n\nimport Vue from 'vue';\n\n/////////////////////////////////\n\nexport default {\n\n\n\t\t\t\tmixins: [FluroContentEditMixin],\n\t\t\t\tcomponents: {},\n\t\t\t\tmethods: {\n\t\t\t\t\t\t\t\tauthenticate() {\n\n\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\t\t\t\t\t\t\t\t\t\t\t\tvar moduleName = self.model.module;\n\t\t\t\t\t\t\t\t\t\t\t\tif (!self.model._id) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn self.$fluro.error({ message: 'Please save before authenticating' });\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t\t\tswitch (moduleName) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tcase 'youtube':\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tif (process.browser) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\twindow.location.href = `${self.$fluro.apiURL}/integrate/${moduleName}/${self.model._id}/oauth`;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tmodelUpdated() {\n\t\t\t\t\t\t\t\t\t\t\t\tthis.update(this.model);\n\t\t\t\t\t\t\t\t},\n\t\t\t\t},\n\t\t\t\tcreated() {\n\t\t\t\t\t\t\t\tvar self = this;\n\t\t\t\t},\n\t\t\t\tasyncComputed: {\n\n\t\t\t\t},\n\t\t\t\tcomputed: {\n\t\t\t\t\t\t\t\tshowOutline() {\n\t\t\t\t\t\t\t\t\t\t\t\treturn false; //true; //false;//true;//false;//true;\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tmoduleOptions() {\n\n\t\t\t\t\t\t\t\t\t\t\t\tvar array = [];\n\n\t\t\t\t\t\t\t\t\t\t\t\tarray.push({\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Stripe',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue: 'stripe',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}, {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Youtube API',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue: 'youtube',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}, {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Facebook API',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue: 'facebook',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t//     title:'Facebook API',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t//     value:'facebook',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// },\n\n\t\t\t\t\t\t\t\t\t\t\t\t)\n\t\t\t\t\t\t\t\t\t\t\t\treturn array;\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tfieldsOutput() {\n\n\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\t\t\t\t\t\t\t\t\t\t\t\tvar array = [];\n\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('title', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Title',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'string',\n\t\t\t\t\t\t\t\t\t\t\t\t})\n\n\t\t\t\t\t\t\t\t\t\t\t\t// ///////////////////////////////////\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('module', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Module',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'string',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdirective: 'select',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\toptions: self.moduleOptions,\n\t\t\t\t\t\t\t\t\t\t\t\t})\n\n\n\n\t\t\t\t\t\t\t\t\t\t\t\tfunction addField(key, details) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdetails.key = key;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tarray.push(details)\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t\t\treturn array;\n\n\t\t\t\t\t\t\t\t},\n\t\t\t\t},\n\t\t\t\tdata() {\n\t\t\t\t\t\t\t\treturn {\n\n\t\t\t\t\t\t\t\t}\n\t\t\t\t},\n}\n\n</script>\n<style scoped lang=\"scss\">\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n.hint {\n\t\t\t\tfont-size: 10px;\n\t\t\t\topacity: 0.5;\n\t\t\t\tcolor: inherit;\n\t\t\t\tdisplay: block;\n}\n\n</style>\n","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.hint {\n  font-size: 10px;\n  opacity: 0.5;\n  color: inherit;\n  display: block;\n}\n\n/*# sourceMappingURL=integration.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-7a1aa64c";
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
//# sourceMappingURL=integration-390c9e1e.js.map
