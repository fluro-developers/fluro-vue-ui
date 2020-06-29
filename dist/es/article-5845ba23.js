
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { aI as FluroCodeEditor, bl as __vue_normalize__, bm as __vue_create_injector__ } from './index-e9a5c414.js';
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
import { F as FluroContentEditMixin } from './FluroContentEditMixin-43c21d2c.js';

//

var script = {
  components: {
    FluroEditor: FluroCodeEditor
  },
  mixins: [FluroContentEditMixin],
  computed: {
    showTitleField() {
      if (this.definition && this.definition.data && this.definition.data.titleGeneration == 'force') {
        return;
      }

      return true;
    },

    fieldsOutput() {
      var self = this;
      var array = []; ///////////////////////////////////

      addField('title', {
        title: self.titleLabel,
        minimum: 1,
        maximum: 1,
        type: 'string',
        params: {
          autofocus: !self.model._id
        } // placeholder: self.titleLabel,

      });

      function addField(key, details) {
        details.key = key;
        array.push(details);
      }

      return array;
    },

    fullBody() {
      return this.definition && this.definition.data && this.definition.data.fullBody;
    },

    hideBody() {
      return this.definition && this.definition.data && this.definition.data.hideBody;
    },

    titleLabel() {
      return _.get(this.definition, 'data.titleLabel') || 'Title';
    },

    bodyLabel() {
      return _.get(this.definition, 'data.bodyLabel') || 'Body';
    }

  },

  data() {
    return {
      editorOptions: {// tokens: [{
        //     title: 'First Name',
        //     key: 'firstName'
        // },{
        //     title: 'Last Name',
        //     key: 'lastName'
        // }]
      }
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
              { attrs: { justified: true, vertical: true } },
              [
                !_vm.definition || _vm.fullBody
                  ? _c(
                      "tab",
                      { attrs: { heading: _vm.bodyLabel } },
                      [
                        _c("fluro-editor", {
                          staticClass: "full-bleed",
                          attrs: {
                            options: _vm.editorOptions,
                            placeholder: "Type your text in here"
                          },
                          model: {
                            value: _vm.model.body,
                            callback: function($$v) {
                              _vm.$set(_vm.model, "body", $$v);
                            },
                            expression: "model.body"
                          }
                        })
                      ],
                      1
                    )
                  : _vm._e(),
                _vm._v(" "),
                _vm.definition
                  ? _c(
                      "tab",
                      { attrs: { heading: _vm.definition.title + " Details" } },
                      [
                        _c(
                          "flex-column-body",
                          { staticStyle: { background: "#fafafa" } },
                          [
                            _c(
                              "v-container",
                              { attrs: { fluid: "" } },
                              [
                                _c(
                                  "constrain",
                                  { attrs: { sm: "" } },
                                  [
                                    _vm.showTitleField
                                      ? [
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
                                          })
                                        ]
                                      : _vm._e(),
                                    _vm._v(" "),
                                    _c("h3", { attrs: { margin: "" } }, [
                                      _vm._v(
                                        _vm._s(_vm.definition.title) +
                                          " Details"
                                      )
                                    ]),
                                    _vm._v(" "),
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
                                    }),
                                    _vm._v(" "),
                                    !_vm.hideBody && !_vm.fullBody
                                      ? [
                                          _c("v-label", [
                                            _vm._v(_vm._s(_vm.bodyLabel))
                                          ]),
                                          _vm._v(" "),
                                          _c("fluro-editor", {
                                            attrs: {
                                              options: _vm.editorOptions,
                                              placeholder:
                                                "Type your text in here"
                                            },
                                            model: {
                                              value: _vm.model.body,
                                              callback: function($$v) {
                                                _vm.$set(_vm.model, "body", $$v);
                                              },
                                              expression: "model.body"
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
    inject("data-v-65421d1a_0", { source: "/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.fluro-editor.full-bleed {\n  margin: 0;\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.fluro-editor.full-bleed .fluro-editor-textarea {\n  flex: 1;\n}\n.fluro-editor.full-bleed .fluro-editor-textarea > div {\n  border: none !important;\n  border-radius: 0;\n  overflow: auto;\n  padding: 3%;\n}\n.fluro-editor.full-bleed .editor-code-wrapper {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n}\n.fluro-editor.full-bleed .editor-code-wrapper .fluro-code-editor {\n  display: block;\n  flex: 1;\n  position: relative;\n}\n.fluro-editor.full-bleed .editor-code-wrapper .fluro-code-editor .ace_editor {\n  width: 100% !important;\n  height: 100% !important;\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  top: 0;\n  border-radius: 0;\n}\n\n/*# sourceMappingURL=article.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/edit/panels/article.vue","article.vue"],"names":[],"mappings":"AAsHA,GAAA;AAYA;EACA,yCAAA;AChIA;ADmIA;EACA,2CAAA;AChIA;ADmIA;EACA,4CAAA;AChIA;ADmIA;EACA,0CAAA;AChIA;;ADwIA,GAAA;AACA;EACA,SAAA;EACA,OAAA;EACA,aAAA;EACA,sBAAA;EACA,gBAAA;ACrIA;ADuIA;EACA,OAAA;ACrIA;ADwIA;EACA,uBAAA;EACA,gBAAA;EACA,cAAA;EACA,WAAA;ACtIA;AD0IA;EACA,OAAA;EACA,aAAA;EACA,sBAAA;ACxIA;AD0IA;EACA,cAAA;EACA,OAAA;EACA,kBAAA;ACxIA;AD0IA;EACA,sBAAA;EACA,uBAAA;EACA,kBAAA;EACA,OAAA;EACA,SAAA;EACA,QAAA;EACA,MAAA;EACA,gBAAA;ACxIA;;AAEA,sCAAsC","file":"article.vue","sourcesContent":["<template>\n\t\t\t\t<flex-column>\n\t\t\t\t\t\t\t\t<template v-if=\"loading\">\n\t\t\t\t\t\t\t\t\t\t\t\t<fluro-page-preloader contain />\n\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t<template v-else>\n\t\t\t\t\t\t\t\t\t\t\t\t<tabset :justified=\"true\" :vertical=\"true\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tab :heading=\"bodyLabel\" v-if=\"!definition || fullBody\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-editor class=\"full-bleed\" v-model=\"model.body\" :options=\"editorOptions\" placeholder=\"Type your text in here\"></fluro-editor>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tab :heading=\"`${definition.title} Details`\" v-if=\"definition\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<flex-column-body style=\"background: #fafafa;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-container fluid>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<constrain sm>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <pre>{{definition}}</pre> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<template v-if=\"showTitleField\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.title\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h3 margin>{{definition.title}} Details</h3>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form :options=\"options\" v-model=\"model.data\" :fields=\"definition.fields\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<template v-if=\"!hideBody && !fullBody\">\n<v-label>{{bodyLabel}}</v-label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-editor  v-model=\"model.body\" :options=\"editorOptions\" placeholder=\"Type your text in here\"></fluro-editor>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</constrain>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</flex-column-body>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t\t\t\t\t</tabset>\n\t\t\t\t\t\t\t\t</template>\n\t\t\t\t</flex-column>\n</template>\n<script>\n/////////////////////////////////\n\nimport FluroEditor from 'src/components/form/FluroEditor.vue';\nimport FluroContentEditMixin from 'src/components/content/edit/FluroContentEditMixin.js';\n\n/////////////////////////////////\n\nimport Vue from 'vue';\n\n/////////////////////////////////\n\nexport default {\n\t\t\t\tcomponents: {\n\t\t\t\t\t\t\t\tFluroEditor,\n\t\t\t\t},\n\t\t\t\tmixins: [FluroContentEditMixin],\n\t\t\t\tcomputed: {\n\n\n\t\t\t\t\t\t\t\tshowTitleField() {\n\t\t\t\t\t\t\t\t\t\t\t\tif (this.definition && this.definition.data && this.definition.data.titleGeneration == 'force') {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn;\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\treturn true;\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tfieldsOutput() {\n\n\n\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\t\t\t\t\t\t\t\t\t\t\t\tvar array = [];\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('title', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: self.titleLabel,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'string',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tparams:{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tautofocus:!self.model._id,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// placeholder: self.titleLabel,\n\t\t\t\t\t\t\t\t\t\t\t\t})\n\n\t\t\t\t\t\t\t\t\t\t\t\tfunction addField(key, details) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdetails.key = key;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tarray.push(details)\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t\t\treturn array;\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tfullBody() {\n\t\t\t\t\t\t\t\t\t\t\t\treturn this.definition && this.definition.data && this.definition.data.fullBody;\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\thideBody() {\n\t\t\t\t\t\t\t\t\t\t\t\treturn this.definition && this.definition.data && this.definition.data.hideBody;\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\ttitleLabel() {\n\n\t\t\t\t\t\t\t\t\t\t\t\treturn _.get(this.definition, 'data.titleLabel') || 'Title';\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tbodyLabel() {\n\t\t\t\t\t\t\t\t\t\t\t\treturn _.get(this.definition, 'data.bodyLabel') || 'Body';\n\t\t\t\t\t\t\t\t},\n\n\t\t\t\t},\n\t\t\t\tdata() {\n\t\t\t\t\t\t\t\treturn {\n\t\t\t\t\t\t\t\t\t\t\t\teditorOptions: {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// tokens: [{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t//     title: 'First Name',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t//     key: 'firstName'\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// },{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t//     title: 'Last Name',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t//     key: 'lastName'\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// }]\n\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t}\n\t\t\t\t},\n}\n\n</script>\n<style lang=\"scss\">\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n.fluro-editor.full-bleed {\n\t\t\t\tmargin: 0;\n\t\t\t\tflex: 1;\n\t\t\t\tdisplay: flex;\n\t\t\t\tflex-direction: column;\n\t\t\t\toverflow: hidden;\n\n\t\t\t\t.fluro-editor-textarea {\n\t\t\t\t\t\t\t\tflex: 1;\n\n\n\t\t\t\t\t\t\t\t&>div {\n\t\t\t\t\t\t\t\t\t\t\t\tborder: none !important;\n\t\t\t\t\t\t\t\t\t\t\t\tborder-radius: 0;\n\t\t\t\t\t\t\t\t\t\t\t\toverflow: auto;\n\t\t\t\t\t\t\t\t\t\t\t\tpadding: 3%;\n\t\t\t\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\t& .editor-code-wrapper {\n\t\t\t\t\t\t\t\tflex: 1;\n\t\t\t\t\t\t\t\tdisplay: flex;\n\t\t\t\t\t\t\t\tflex-direction: column;\n\n\t\t\t\t\t\t\t\t.fluro-code-editor {\n\t\t\t\t\t\t\t\t\t\t\t\tdisplay: block;\n\t\t\t\t\t\t\t\t\t\t\t\tflex: 1;\n\t\t\t\t\t\t\t\t\t\t\t\tposition: relative;\n\n\t\t\t\t\t\t\t\t\t\t\t\t.ace_editor {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\twidth: 100% !important;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\theight: 100% !important;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tposition: absolute;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tleft: 0;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tbottom: 0;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tright: 0;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttop: 0;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tborder-radius: 0;\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t}\n\t\t\t\t}\n}\n\n</style>\n","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.fluro-editor.full-bleed {\n  margin: 0;\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.fluro-editor.full-bleed .fluro-editor-textarea {\n  flex: 1;\n}\n.fluro-editor.full-bleed .fluro-editor-textarea > div {\n  border: none !important;\n  border-radius: 0;\n  overflow: auto;\n  padding: 3%;\n}\n.fluro-editor.full-bleed .editor-code-wrapper {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n}\n.fluro-editor.full-bleed .editor-code-wrapper .fluro-code-editor {\n  display: block;\n  flex: 1;\n  position: relative;\n}\n.fluro-editor.full-bleed .editor-code-wrapper .fluro-code-editor .ace_editor {\n  width: 100% !important;\n  height: 100% !important;\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  top: 0;\n  border-radius: 0;\n}\n\n/*# sourceMappingURL=article.vue.map */"]}, media: undefined });

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

export default __vue_component__;
//# sourceMappingURL=article-5845ba23.js.map
