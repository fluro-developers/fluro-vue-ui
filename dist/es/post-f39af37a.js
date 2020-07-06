
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { bm as __vue_normalize__, bn as __vue_create_injector__ } from './index-f7651eda.js';
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
import { F as FluroContentEditMixin } from './FluroContentEditMixin-c6595c83.js';

//

var script = {
  mixins: [FluroContentEditMixin],
  components: {},
  methods: {
    modelUpdated() {
      this.update(this.model);
    }

  },

  created() {
  },

  asyncComputed: {},
  computed: {
    fieldsOutput() {
      var array = []; ///////////////////////////////////
      //We need to add more smarts here so we can
      //only attach to the correct things

      addField('parent', {
        title: 'Linked To',
        minimum: 1,
        maximum: 1,
        type: 'reference' // params: {
        // restrictType: 'event',
        // },

      }); ///////////////////////////////////

      function addField(key, details) {
        details.key = key;
        array.push(details);
      }

      return array;
    },

    showOutline() {
      return false; //true; //false;//true;//false;//true;
    } // fieldsOutput() {
    //     var self = this;
    //     var array = [];
    //     ///////////////////////////////////
    //     addField('event', {
    //         title: 'Event',
    //         minimum: 1,
    //         maximum: 1,
    //         type: 'reference',
    //         params: {
    //             restrictType: 'event',
    //         },
    //     })
    //     addField('contact', {
    //         title: 'Contact',
    //         minimum: 1,
    //         maximum: 1,
    //         type: 'reference',
    //         description: 'The person who checked was checked in',
    //         params: {
    //             restrictType: 'contact',
    //         },
    //     })
    //     addField('checkedInBy', {
    //         title: 'Checked In By',
    //         minimum: 1,
    //         maximum: 1,
    //         type: 'reference',
    //         description: 'The person who checked this contact in',
    //         params: {
    //             restrictType: 'contact',
    //         },
    //     })
    //     addField('pinNumber', {
    //         title: 'Pin Number',
    //         minimum: 0,
    //         maximum: 1,
    //         type: 'password',
    //         description: 'The Pin Number used when checking in (If any)',
    //     })
    //     // addField('firstLine', {
    //     //     title: 'Description',
    //     //     minimum: 0,
    //     //     maximum: 1,
    //     //     type: 'string',
    //     //     placeholder: 'Eg. A list of my favorite people',
    //     // })
    //     // // console.log('TYPE OPTIONS', self.typeOptions);
    //     // addField('filterType', {
    //     //     title: 'Type',
    //     //     minimum: 0,
    //     //     maximum: 1,
    //     //     type: 'string',
    //     //     directive: 'select',
    //     //     description: 'The type of item you want to return from this query',
    //     //     options: self.typeOptions,
    //     // })
    //     ///////////////////////////////////
    //     function addField(key, details) {
    //         details.key = key;
    //         array.push(details)
    //     }
    //     return array;
    // },


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
                                  !_vm.model._id
                                    ? [
                                        _c("fluro-content-form-field", {
                                          attrs: {
                                            "form-fields": _vm.formFields,
                                            outline: _vm.showOutline,
                                            options: _vm.options,
                                            field: _vm.fieldHash.parent
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
                                    : [
                                        _c(
                                          "v-input",
                                          {
                                            staticClass: "no-flex",
                                            attrs: { label: "Linked to" }
                                          },
                                          [
                                            _c(
                                              "list-group",
                                              [
                                                _c("list-group-item", {
                                                  attrs: {
                                                    item: _vm.model.parent
                                                  },
                                                  nativeOn: {
                                                    click: function($event) {
                                                      return _vm.$fluro.global.edit(
                                                        _vm.model.parent,
                                                        true
                                                      )
                                                    }
                                                  },
                                                  scopedSlots: _vm._u(
                                                    [
                                                      {
                                                        key: "right",
                                                        fn: function() {
                                                          return [
                                                            _c(
                                                              "v-btn",
                                                              {
                                                                staticClass:
                                                                  "ma-0",
                                                                attrs: {
                                                                  icon: "",
                                                                  small: "",
                                                                  flat: ""
                                                                },
                                                                on: {
                                                                  click: function(
                                                                    $event
                                                                  ) {
                                                                    $event.stopPropagation();
                                                                    $event.preventDefault();
                                                                    return _vm.$actions.open(
                                                                      [
                                                                        _vm
                                                                          .model
                                                                          .parent
                                                                      ]
                                                                    )
                                                                  }
                                                                }
                                                              },
                                                              [
                                                                _c(
                                                                  "fluro-icon",
                                                                  {
                                                                    attrs: {
                                                                      icon:
                                                                        "ellipsis-h"
                                                                    }
                                                                  }
                                                                )
                                                              ],
                                                              1
                                                            )
                                                          ]
                                                        },
                                                        proxy: true
                                                      }
                                                    ],
                                                    null,
                                                    false,
                                                    1779438708
                                                  )
                                                })
                                              ],
                                              1
                                            )
                                          ],
                                          1
                                        )
                                      ],
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
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-14bbeb6d_0", { source: "/**/\n.border-top[data-v-14bbeb6d] {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right[data-v-14bbeb6d] {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom[data-v-14bbeb6d] {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left[data-v-14bbeb6d] {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.hint[data-v-14bbeb6d] {\n  font-size: 10px;\n  opacity: 0.5;\n  color: inherit;\n  display: block;\n}\n\n/*# sourceMappingURL=post.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/edit/panels/post.vue","post.vue"],"names":[],"mappings":"AA0LA,GAAA;AAYA;EACA,yCAAA;ACpMA;ADuMA;EACA,2CAAA;ACpMA;ADuMA;EACA,4CAAA;ACpMA;ADuMA;EACA,0CAAA;ACpMA;;AD4MA,GAAA;AACA;EACA,eAAA;EACA,YAAA;EACA,cAAA;EACA,cAAA;ACzMA;;AAEA,mCAAmC","file":"post.vue","sourcesContent":["<template>\n    <flex-column>\n        <template v-if=\"loading\">\n            <fluro-page-preloader contain />\n        </template>\n        <tabset v-else :justified=\"true\" :vertical=\"true\">\n            <tab :heading=\"`${definition.title} Information`\" v-if=\"definition && definition.fields && definition.fields.length\">\n                <flex-column-body style=\"background: #fafafa;\">\n                    <v-container>\n                        <constrain sm>\n                            <template v-if=\"!model._id\">\n                                <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.parent\" v-model=\"model\" />\n                            </template>\n                            <template v-else>\n                                <v-input class=\"no-flex\" label=\"Linked to\">\n                                \n                                <list-group>\n                                    <list-group-item @click.native=\"$fluro.global.edit(model.parent, true)\" :item=\"model.parent\">\n                                        <template v-slot:right>\n                                            <v-btn class=\"ma-0\" icon small flat @click.stop.prevent=\"$actions.open([model.parent])\">\n                                                <fluro-icon icon=\"ellipsis-h\" />\n                                            </v-btn>\n                                        </template>\n                                    </list-group-item>\n                                </list-group>\n                            \n                            </v-input>\n                            </template>\n                            <fluro-content-form :options=\"options\" v-model=\"model.data\" :fields=\"definition.fields\" />\n                        </constrain>\n                    </v-container>\n                </flex-column-body>\n            </tab>\n        </tabset>\n    </flex-column>\n</template>\n<script>\n/////////////////////////////////\n\nimport FluroContentEditMixin from 'src/components/content/edit/FluroContentEditMixin.js';\n\n/////////////////////////////////\n\nimport Vue from 'vue';\n\n/////////////////////////////////\n\nexport default {\n\n\n    mixins: [FluroContentEditMixin],\n    components: {},\n    methods: {\n        modelUpdated() {\n            this.update(this.model);\n        },\n    },\n    created() {\n        var self = this;\n    },\n    asyncComputed: {\n\n    },\n    computed: {\n        fieldsOutput() {\n\n            var self = this;\n            var array = [];\n\n            ///////////////////////////////////\n\n            //We need to add more smarts here so we can\n            //only attach to the correct things\n            addField('parent', {\n                title: 'Linked To',\n                minimum: 1,\n                maximum: 1,\n                type: 'reference',\n                // params: {\n                // restrictType: 'event',\n                // },\n            })\n\n            ///////////////////////////////////\n\n            function addField(key, details) {\n                details.key = key;\n                array.push(details)\n            }\n\n            return array;\n\n        },\n        showOutline() {\n            return false; //true; //false;//true;//false;//true;\n        },\n        // fieldsOutput() {\n\n        //     var self = this;\n        //     var array = [];\n\n        //     ///////////////////////////////////\n\n        //     addField('event', {\n        //         title: 'Event',\n        //         minimum: 1,\n        //         maximum: 1,\n        //         type: 'reference',\n        //         params: {\n        //             restrictType: 'event',\n        //         },\n        //     })\n\n        //     addField('contact', {\n        //         title: 'Contact',\n        //         minimum: 1,\n        //         maximum: 1,\n        //         type: 'reference',\n        //         description: 'The person who checked was checked in',\n        //         params: {\n        //             restrictType: 'contact',\n        //         },\n        //     })\n\n        //     addField('checkedInBy', {\n        //         title: 'Checked In By',\n        //         minimum: 1,\n        //         maximum: 1,\n        //         type: 'reference',\n        //         description: 'The person who checked this contact in',\n        //         params: {\n        //             restrictType: 'contact',\n        //         },\n        //     })\n\n        //     addField('pinNumber', {\n        //         title: 'Pin Number',\n        //         minimum: 0,\n        //         maximum: 1,\n        //         type: 'password',\n        //         description: 'The Pin Number used when checking in (If any)',\n        //     })\n\n        //     // addField('firstLine', {\n        //     //     title: 'Description',\n        //     //     minimum: 0,\n        //     //     maximum: 1,\n        //     //     type: 'string',\n        //     //     placeholder: 'Eg. A list of my favorite people',\n        //     // })\n\n\n        //     // // console.log('TYPE OPTIONS', self.typeOptions);\n\n\n\n        //     // addField('filterType', {\n        //     //     title: 'Type',\n        //     //     minimum: 0,\n        //     //     maximum: 1,\n        //     //     type: 'string',\n        //     //     directive: 'select',\n        //     //     description: 'The type of item you want to return from this query',\n        //     //     options: self.typeOptions,\n        //     // })\n\n        //     ///////////////////////////////////\n\n        //     function addField(key, details) {\n        //         details.key = key;\n        //         array.push(details)\n        //     }\n\n        //     return array;\n\n        // },\n    },\n    data() {\n        return {\n\n        }\n    },\n}\n</script>\n<style scoped lang=\"scss\">\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n.hint {\n    font-size: 10px;\n    opacity: 0.5;\n    color: inherit;\n    display: block;\n}\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.hint {\n  font-size: 10px;\n  opacity: 0.5;\n  color: inherit;\n  display: block;\n}\n\n/*# sourceMappingURL=post.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-14bbeb6d";
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
//# sourceMappingURL=post-f39af37a.js.map
