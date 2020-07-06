
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { bm as __vue_normalize__, bn as __vue_create_injector__ } from './index-f839e980.js';
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
import { F as FluroContentEditMixin } from './FluroContentEditMixin-18d3f627.js';

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
    showOutline() {
      return false; //true; //false;//true;//false;//true;
    },

    fieldsOutput() {
      var self = this;
      var array = []; ///////////////////////////////////

      addField('contact', {
        title: 'Contact',
        minimum: 1,
        maximum: 1,
        type: 'reference',
        description: 'The person who checked was checked in',
        params: {
          restrictType: 'contact'
        }
      });
      addField('event', {
        title: 'Event',
        minimum: self.model.location ? 0 : 1,
        maximum: 1,
        type: 'reference',
        params: {
          restrictType: 'event'
        }
      });
      addField('location', {
        title: 'Location',
        minimum: self.model.event ? 0 : 1,
        maximum: 1,
        type: 'reference',
        params: {
          restrictType: 'location'
        }
      });
      addField('checkedInBy', {
        title: 'Checked In By',
        minimum: 0,
        maximum: 1,
        type: 'reference',
        description: 'The person who checked this contact in',
        params: {
          restrictType: 'contact'
        }
      });
      addField('pinNumber', {
        title: 'Pin Number',
        minimum: 0,
        maximum: 1,
        type: 'password',
        description: 'The Pin Number used when checking in (If any)'
      }); // addField('firstLine', {
      //     title: 'Description',
      //     minimum: 0,
      //     maximum: 1,
      //     type: 'string',
      //     placeholder: 'Eg. A list of my favorite people',
      // })
      // // console.log('TYPE OPTIONS', self.typeOptions);
      // addField('filterType', {
      //     title: 'Type',
      //     minimum: 0,
      //     maximum: 1,
      //     type: 'string',
      //     directive: 'select',
      //     description: 'The type of item you want to return from this query',
      //     options: self.typeOptions,
      // })
      ///////////////////////////////////

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
                { attrs: { heading: "Checkin Details" } },
                [
                  _vm._t("default", [
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
                                      field: _vm.fieldHash.contact
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
                                      field: _vm.fieldHash.event
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
                                      field: _vm.fieldHash.location
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
                                      field: _vm.fieldHash.checkedInBy
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
                                      field: _vm.fieldHash.pinNumber
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
    inject("data-v-02f93577_0", { source: "/**/\n.border-top[data-v-02f93577] {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right[data-v-02f93577] {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom[data-v-02f93577] {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left[data-v-02f93577] {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.hint[data-v-02f93577] {\n  font-size: 10px;\n  opacity: 0.5;\n  color: inherit;\n  display: block;\n}\n\n/*# sourceMappingURL=checkin.vue.map */", map: {"version":3,"sources":["C:\\Users\\User\\Documents\\fluro\\fluro-vue-ui\\src\\components\\content\\edit\\panels\\checkin.vue","checkin.vue"],"names":[],"mappings":"AAiKA,GAAA;AAYA;EACA,yCAAA;AC3KA;AD8KA;EACA,2CAAA;AC3KA;AD8KA;EACA,4CAAA;AC3KA;AD8KA;EACA,0CAAA;AC3KA;;ADmLA,GAAA;AACA;EACA,eAAA;EACA,YAAA;EACA,cAAA;EACA,cAAA;AChLA;;AAEA,sCAAsC","file":"checkin.vue","sourcesContent":["<template>\n\t\t\t\t<flex-column>\n\t\t\t\t\t\t\t\t<template v-if=\"loading\">\n\t\t\t\t\t\t\t\t\t\t\t\t<fluro-page-preloader contain />\n\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t<tabset v-else :justified=\"true\" :vertical=\"true\">\n\t\t\t\t\t\t\t\t\t\t\t\t<tab heading=\"Checkin Details\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<slot>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<flex-column-body style=\"background: #fafafa;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<constrain sm>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <pre>{{model}}</pre> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"grid-list-xl\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.contact\" v-model=\"model\"></fluro-content-form-field>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.event\" v-model=\"model\"></fluro-content-form-field>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.location\" v-model=\"model\"></fluro-content-form-field>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.checkedInBy\" v-model=\"model\"></fluro-content-form-field>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.pinNumber\" v-model=\"model\"></fluro-content-form-field>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</constrain>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</flex-column-body>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</slot>\n\t\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t</tabset>\n\t\t\t\t</flex-column>\n</template>\n<script>\n/////////////////////////////////\n\nimport FluroContentEditMixin from 'src/components/content/edit/FluroContentEditMixin.js';\n\n/////////////////////////////////\n\nimport Vue from 'vue';\n\n/////////////////////////////////\n\nexport default {\n\n\n\t\t\t\tmixins: [FluroContentEditMixin],\n\t\t\t\tcomponents: {},\n\t\t\t\tmethods: {\n\t\t\t\t\t\t\t\tmodelUpdated() {\n\t\t\t\t\t\t\t\t\t\t\t\tthis.update(this.model);\n\t\t\t\t\t\t\t\t},\n\t\t\t\t},\n\t\t\t\tcreated() {\n\t\t\t\t\t\t\t\tvar self = this;\n\t\t\t\t},\n\t\t\t\tasyncComputed: {\n\n\t\t\t\t},\n\t\t\t\tcomputed: {\n\t\t\t\t\t\t\t\tshowOutline() {\n\t\t\t\t\t\t\t\t\t\t\t\treturn false; //true; //false;//true;//false;//true;\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tfieldsOutput() {\n\n\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\t\t\t\t\t\t\t\t\t\t\t\tvar array = [];\n\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('contact', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Contact',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'reference',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescription: 'The person who checked was checked in',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tparams: {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\trestrictType: 'contact',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t})\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('event', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Event',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: self.model.location ? 0 : 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'reference',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tparams: {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\trestrictType: 'event',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t})\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('location', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Location',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: self.model.event ? 0 : 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'reference',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tparams: {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\trestrictType: 'location',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t})\n\n\t\t\t\t\t\t\t\t\t\t\t\t\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('checkedInBy', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Checked In By',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'reference',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescription: 'The person who checked this contact in',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tparams: {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\trestrictType: 'contact',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t})\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('pinNumber', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Pin Number',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'password',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescription: 'The Pin Number used when checking in (If any)',\n\t\t\t\t\t\t\t\t\t\t\t\t})\n\n\t\t\t\t\t\t\t\t\t\t\t\t// addField('firstLine', {\n\t\t\t\t\t\t\t\t\t\t\t\t//     title: 'Description',\n\t\t\t\t\t\t\t\t\t\t\t\t//     minimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t//     maximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t//     type: 'string',\n\t\t\t\t\t\t\t\t\t\t\t\t//     placeholder: 'Eg. A list of my favorite people',\n\t\t\t\t\t\t\t\t\t\t\t\t// })\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t// // console.log('TYPE OPTIONS', self.typeOptions);\n\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t// addField('filterType', {\n\t\t\t\t\t\t\t\t\t\t\t\t//     title: 'Type',\n\t\t\t\t\t\t\t\t\t\t\t\t//     minimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t//     maximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t//     type: 'string',\n\t\t\t\t\t\t\t\t\t\t\t\t//     directive: 'select',\n\t\t\t\t\t\t\t\t\t\t\t\t//     description: 'The type of item you want to return from this query',\n\t\t\t\t\t\t\t\t\t\t\t\t//     options: self.typeOptions,\n\t\t\t\t\t\t\t\t\t\t\t\t// })\n\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\n\t\t\t\t\t\t\t\t\t\t\t\tfunction addField(key, details) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdetails.key = key;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tarray.push(details)\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t\t\treturn array;\n\n\t\t\t\t\t\t\t\t},\n\t\t\t\t},\n\t\t\t\tdata() {\n\t\t\t\t\t\t\t\treturn {\n\n\t\t\t\t\t\t\t\t}\n\t\t\t\t},\n}\n\n</script>\n<style scoped lang=\"scss\">\n\n/**/\r\n\r\n$primary: #2ad4b9;//#0bd6be;\r\n$success: #4cc650; //#4cc673;//\r\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\r\n$danger: #d93e63;\r\n$secondary: #0bd6cd; //#0bd6a3;\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n\r\n.border-top {\r\n    border-top: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-right {\r\n    border-right: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-bottom {\r\n    border-bottom: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-left {\r\n    border-left: 1px solid rgba(#000, 0.05);\r\n}\r\n//////////////////////////////////////////\r\n\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n/**/\n.hint {\n\t\t\t\tfont-size: 10px;\n\t\t\t\topacity: 0.5;\n\t\t\t\tcolor: inherit;\n\t\t\t\tdisplay: block;\n}\n\n</style>\n","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.hint {\n  font-size: 10px;\n  opacity: 0.5;\n  color: inherit;\n  display: block;\n}\n\n/*# sourceMappingURL=checkin.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-02f93577";
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
//# sourceMappingURL=checkin-a00dcfb7.js.map
