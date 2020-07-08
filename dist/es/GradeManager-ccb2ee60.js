
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { aN as FluroContentForm, r as FluroConfirmButton, bo as _, bm as __vue_normalize__, bn as __vue_create_injector__ } from './index-6d75978d.js';
import draggable from 'vuedraggable';

//
var script = {
  props: {
    value: {
      type: Array
    }
  },
  components: {
    FluroContentForm,
    FluroConfirmButton,
    draggable
  },

  data() {
    return {
      model: this.value,
      proposed: {},
      dragOptions: {},
      drag: false
    };
  },

  methods: {
    add() {
      var clone = JSON.parse(JSON.stringify(this.proposed));

      if (!clone.title || !clone.title.length) {
        return;
      }

      clone.key = _.camelCase(clone.title);
      delete clone.row;
      this.model.push(clone);
      this.proposed = {};
    },

    remove(index) {
      this.model.splice(index, 1);
    }

  },
  computed: {
    fields() {
      var array = []; ///////////////////////////////////

      addField('row', {
        type: 'group',
        sameLine: true,
        fields: [{
          title: 'Grade Title',
          minimum: 1,
          maximum: 1,
          type: 'string',
          key: 'title'
        }, {
          title: 'Grade Description',
          minimum: 0,
          maximum: 1,
          type: 'string',
          key: 'description'
        } // {
        //  title: 'Add',
        //  minimum: 0,
        //  maximum: 1,
        //  type: 'string',
        //  key:'description',
        //  // customComponent:MyVueComponent
        // }
        ]
      }); // addField('title', {
      //  title: 'Grade Title',
      //  minimum: 1,
      //  maximum: 1,
      //  type: 'string',
      // });
      // addField('description', {
      //  title: 'Description',
      //  minimum: 0,
      //  maximum: 1,
      //  type: 'string',
      // });
      ///////////////////////////////////

      function addField(key, details) {
        details.key = key;
        array.push(details);
      }

      return array;
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
    [
      _c(
        "list-group",
        [
          _c(
            "draggable",
            _vm._b(
              {
                attrs: {
                  list: _vm.model,
                  "ghost-class": "ghost-dragging-class"
                },
                on: {
                  start: function($event) {
                    _vm.drag = true;
                  },
                  end: function($event) {
                    _vm.drag = false;
                  }
                }
              },
              "draggable",
              _vm.dragOptions,
              false
            ),
            _vm._l(_vm.model, function(grade, index) {
              return _c(
                "list-group-item",
                { key: JSON.stringify(_vm.area) },
                [
                  _c(
                    "v-layout",
                    { attrs: { "align-center": "" } },
                    [
                      _c("v-flex", [
                        _c("strong", [_vm._v(_vm._s(grade.title))])
                      ]),
                      _vm._v(" "),
                      _c(
                        "v-flex",
                        { attrs: { shrink: "" } },
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
                                              confirming ? "Confirm?" : "Remove"
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
          _c("fluro-panel-title", [_vm._v("Add a grade")]),
          _vm._v(" "),
          _c("fluro-panel-body", [
            _c(
              "form",
              {
                on: {
                  submit: function($event) {
                    $event.preventDefault();
                    $event.stopPropagation();
                    return _vm.add()
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
                        _c("fluro-content-form", {
                          ref: "form",
                          attrs: { fields: _vm.fields },
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
                      { attrs: { shrink: "" } },
                      [
                        _c(
                          "v-btn",
                          {
                            attrs: { type: "submit" },
                            on: {
                              click: function($event) {
                                return _vm.add()
                              }
                            }
                          },
                          [_vm._v("Add")]
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
    ],
    1
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-4f6f4326_0", { source: "/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.ghost-dragging-class {\n  opacity: 0.5;\n  background: #c8ebfb;\n}\n\n/*# sourceMappingURL=GradeManager.vue.map */", map: {"version":3,"sources":["C:\\Users\\User\\Documents\\fluro\\fluro-vue-ui\\src\\components\\content\\edit\\components\\GradeManager.vue","GradeManager.vue"],"names":[],"mappings":"AAuKA,GAAA;AAYA;EACA,yCAAA;ACjLA;ADoLA;EACA,2CAAA;ACjLA;ADoLA;EACA,4CAAA;ACjLA;ADoLA;EACA,0CAAA;ACjLA;;ADyLA,GAAA;AACA;EACA,YAAA;EACA,mBAAA;ACtLA;;AAEA,2CAA2C","file":"GradeManager.vue","sourcesContent":["<template>\n\t<div>\n\t\t<list-group>\n\t\t\t<draggable :list=\"model\" v-bind=\"dragOptions\" ghost-class=\"ghost-dragging-class\" @start=\"drag=true\" @end=\"drag=false\">\n\t\t\t\t<list-group-item v-for=\"(grade, index) in model\" :key=\"JSON.stringify(area)\">\n\t\t\t\t\t<v-layout align-center>\n\t\t\t\t\t\t<v-flex>\n\t\t\t\t\t\t\t<strong>{{grade.title}}</strong>\n\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t<v-flex shrink>\n\t\t\t\t\t\t\t<fluro-confirm-button @click=\"remove(index)\" content=\"Remove\">\n\t\t\t\t\t\t\t\t<template v-slot:default=\"{ confirming }\">\n\t\t\t\t\t\t\t\t\t<v-btn flat block :color=\"confirming ? 'red' : ''\" style=\"transition: all 0.1s;width:100%;\">{{\n\t\t\t\t\t\t\t\t\t\tconfirming ? \"Confirm?\" : \"Remove\"\n\t\t\t\t\t\t\t\t\t\t}}</v-btn>\n\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t</fluro-confirm-button>\n\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t</v-layout>\n\t\t\t\t</list-group-item>\n\t\t\t</draggable>\n\t\t</list-group>\n\t\t<fluro-panel>\n\t\t\t<fluro-panel-title>Add a grade</fluro-panel-title>\n\t\t\t<fluro-panel-body>\n\t\t\t\t<form @submit.prevent.stop=\"add()\">\n\t\t\t\t\t<v-layout>\n\t\t\t\t\t\t<v-flex>\n\t\t\t\t\t\t\t<fluro-content-form ref=\"form\" v-model=\"proposed\" :fields=\"fields\" /> <!-- :options=\"options\" -->\n\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t<v-flex shrink>\n\t\t\t\t\t\t\t<v-btn type=\"submit\" @click=\"add()\">Add</v-btn>\n\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t</v-layout>\n\t\t\t\t</form>\n\t\t\t</fluro-panel-body>\n\t\t</fluro-panel>\n\t\t<!-- <pre>{{proposed}}</pre> -->\n\t\t<!-- <v-layout>\n   <v-flex xs12 sm5>\n\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.title\" v-model=\"model\"></fluro-content-form-field>\n   </v-flex>\n   <v-flex xs12 sm5>\n\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.title\" v-model=\"model\"></fluro-content-form-field>\n   </v-flex>\n   <v-flex xs12 sm2>\n\t<v-btn>Add</v-btn>\n   </v-flex>\n  </v-layout> -->\n\t</div>\n</template>\n<script>\nimport FluroConfirmButton from \"src/components/ui/FluroConfirmButton.vue\";\nimport FluroContentForm from 'src/components/form/FluroContentForm.vue';\nimport draggable from 'vuedraggable';\nimport _ from 'lodash';\n\n\nexport default {\n\tprops: {\n\t\tvalue: {\n\t\t\ttype: Array,\n\t\t}\n\t},\n\tcomponents: {\n\t\tFluroContentForm,\n\t\tFluroConfirmButton,\n\t\tdraggable,\n\n\t},\n\tdata() {\n\t\treturn {\n\t\t\tmodel: this.value,\n\t\t\tproposed: {},\n\t\t\tdragOptions: {},\n\t\t\tdrag: false,\n\t\t}\n\t},\n\tmethods: {\n\t\tadd() {\n\n\n\t\t\tvar clone = JSON.parse(JSON.stringify(this.proposed));\n\n\t\t\tif (!clone.title || !clone.title.length) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tclone.key = _.camelCase(clone.title);\n\t\t\tdelete clone.row;\n\n\n\n\t\t\tthis.model.push(clone);\n\n\t\t\tthis.proposed = {};\n\t\t},\n\t\tremove(index) {\n\t\t\tthis.model.splice(index, 1);\n\t\t}\n\t},\n\tcomputed: {\n\t\tfields() {\n\n\n\t\t\tvar self = this;\n\t\t\tvar array = [];\n\n\t\t\t///////////////////////////////////\n\n\t\t\taddField('row', {\n\t\t\t\ttype: 'group',\n\t\t\t\tsameLine: true,\n\t\t\t\tfields: [{\n\t\t\t\t\t\ttitle: 'Grade Title',\n\t\t\t\t\t\tminimum: 1,\n\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\ttype: 'string',\n\t\t\t\t\t\tkey: 'title',\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\ttitle: 'Grade Description',\n\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\ttype: 'string',\n\t\t\t\t\t\tkey: 'description',\n\t\t\t\t\t},\n\t\t\t\t\t// {\n\t\t\t\t\t//  title: 'Add',\n\t\t\t\t\t//  minimum: 0,\n\t\t\t\t\t//  maximum: 1,\n\t\t\t\t\t//  type: 'string',\n\t\t\t\t\t//  key:'description',\n\t\t\t\t\t//  // customComponent:MyVueComponent\n\t\t\t\t\t// }\n\t\t\t\t]\n\t\t\t});\n\n\t\t\t// addField('title', {\n\t\t\t//  title: 'Grade Title',\n\t\t\t//  minimum: 1,\n\t\t\t//  maximum: 1,\n\t\t\t//  type: 'string',\n\t\t\t// });\n\n\t\t\t// addField('description', {\n\t\t\t//  title: 'Description',\n\t\t\t//  minimum: 0,\n\t\t\t//  maximum: 1,\n\t\t\t//  type: 'string',\n\t\t\t// });\n\n\t\t\t///////////////////////////////////\n\n\t\t\tfunction addField(key, details) {\n\t\t\t\tdetails.key = key;\n\t\t\t\tarray.push(details)\n\t\t\t}\n\n\t\t\treturn array;\n\t\t}\n\t}\n}\n\n</script>\n<style lang=\"scss\">\n\n/**/\r\n\r\n$primary: #2ad4b9;//#0bd6be;\r\n$success: #4cc650; //#4cc673;//\r\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\r\n$danger: #d93e63;\r\n$secondary: #0bd6cd; //#0bd6a3;\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n\r\n.border-top {\r\n    border-top: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-right {\r\n    border-right: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-bottom {\r\n    border-bottom: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-left {\r\n    border-left: 1px solid rgba(#000, 0.05);\r\n}\r\n//////////////////////////////////////////\r\n\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n/**/\n.ghost-dragging-class {\n\topacity: 0.5;\n\tbackground: #c8ebfb;\n}\n\n</style>\n","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.ghost-dragging-class {\n  opacity: 0.5;\n  background: #c8ebfb;\n}\n\n/*# sourceMappingURL=GradeManager.vue.map */"]}, media: undefined });

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

export { __vue_component__ as G };
//# sourceMappingURL=GradeManager-ccb2ee60.js.map
