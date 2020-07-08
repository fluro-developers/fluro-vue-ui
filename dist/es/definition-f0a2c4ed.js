
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { r as FluroConfirmButton, bo as _$1, bm as __vue_normalize__, bn as __vue_create_injector__, c as FluroHelp, aL as FluroExpressionEditor, e as FluroModalMixin, aO as FluroContentFormField, h as FluroFieldEditor, aG as FluroContentSelectButton, br as FieldTemplates } from './index-cb43f0ce.js';
import 'vue-range-slider';
import 'vue-range-slider/dist/vue-range-slider.css';
import draggable from 'vuedraggable';
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
import { F as FluroContentEditMixin } from './FluroContentEditMixin-7ade352f.js';

//
var script = {
  components: {
    FluroConfirmButton
  },
  props: {
    value: {
      type: Object,
      required: true
    },
    form: {
      type: Object,
      required: true
    }
  },

  created() {},

  computed: {
    summary() {
      var self = this;
      var message;
      var action;
      var amount = self.model.expression || '';
      var condition;

      if (self.model.condition && self.model.condition.length) {
        condition = '<div class="text-muted">if <em>' + self.model.condition + '</em></div>'; //' returns true';
      } //If amount is a pure number


      if (!isNaN(amount)) {
        amount = `<strong>${amount}</strong>`;
      }

      switch (self.model.operation) {
        case 'set':
          action = 'Set current total to';
          break;

        case 'add':
          action = 'Add';
          amount = amount + ' to current total';
          break;

        case 'multiply':
          action = 'Multiply current total by';
          break;

        case 'subtract':
          action = 'Subtract';
          amount = amount + ' from current total';
          break;

        case 'divide':
          action = 'Divide current total by';
          break;

        default:
          return;
      }

      message = _$1.compact([condition, action, amount]).join(' ');
      return message;
    }

  },
  watch: {
    value(v) {
      this.model = v;
    }

  },

  data() {
    return {
      model: this.value
    };
  },

  methods: {
    duplicate() {
      this.$emit('duplicate', this.model);
    },

    remove() {
      this.$emit('remove', this.model);
    },

    edit() {
      this.$emit('edit', this.model);
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
    "list-group-item",
    [
      _c(
        "v-layout",
        [
          _c("v-flex", [_c("strong", [_vm._v(_vm._s(_vm.model.title))])]),
          _vm._v(" "),
          _c("v-flex", { attrs: { shrink: "" } }, [
            _c("div", { staticClass: "btn-group" }, [
              _c(
                "span",
                {
                  directives: [{ name: "tippy", rawName: "v-tippy" }],
                  staticClass: "btn",
                  attrs: { xs: "", content: "Edit" },
                  on: { click: _vm.edit }
                },
                [_c("fluro-icon", { attrs: { icon: "pencil" } })],
                1
              ),
              _vm._v(" "),
              _c(
                "span",
                {
                  directives: [{ name: "tippy", rawName: "v-tippy" }],
                  staticClass: "btn",
                  attrs: { xs: "", content: "Duplicate" },
                  on: { click: _vm.duplicate }
                },
                [_c("fluro-icon", { attrs: { icon: "copy" } })],
                1
              )
            ])
          ]),
          _vm._v(" "),
          _c(
            "v-flex",
            { staticStyle: { "padding-left": "5px" }, attrs: { shrink: "" } },
            [
              _c("fluro-confirm-button", {
                directives: [{ name: "tippy", rawName: "v-tippy" }],
                attrs: { content: "Remove" },
                on: { click: _vm.remove },
                scopedSlots: _vm._u([
                  {
                    key: "default",
                    fn: function(ref) {
                      var confirming = ref.confirming;
                      return [
                        _c("span", { staticClass: "btn", attrs: { xs: "" } }, [
                          _vm._v(
                            "\n                        " +
                              _vm._s(confirming ? "Confirm?" : "Remove") +
                              "\n                    "
                          )
                        ])
                      ]
                    }
                  }
                ])
              })
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("div", { domProps: { innerHTML: _vm._s(_vm.summary) } })
    ],
    1
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-16d887d3_0", { source: "/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n\n/*# sourceMappingURL=PaymentModifierItem.vue.map */", map: {"version":3,"sources":["C:\\Users\\User\\Documents\\fluro\\fluro-vue-ui\\src\\components\\content\\edit\\components\\PaymentModifierItem.vue","PaymentModifierItem.vue"],"names":[],"mappings":"AA4HA,GAAA;AAYA;EACA,yCAAA;ACtIA;ADyIA;EACA,2CAAA;ACtIA;ADyIA;EACA,4CAAA;ACtIA;ADyIA;EACA,0CAAA;ACtIA;;AD8IA,GAAA;;AC1IA,kDAAkD","file":"PaymentModifierItem.vue","sourcesContent":["<template>\n    <list-group-item>\n        <v-layout>\n            <v-flex>\n                <strong>{{model.title}}</strong>\n            </v-flex>\n            <v-flex shrink>\n                <div class=\"btn-group\">\n                    <span class=\"btn\" xs @click=\"edit\" v-tippy content=\"Edit\">\n                        <fluro-icon icon=\"pencil\" />\n                    </span>\n                    <span class=\"btn\" xs @click=\"duplicate\" v-tippy content=\"Duplicate\">\n                        <fluro-icon icon=\"copy\" />\n                    </span>\n                </div>\n            </v-flex>\n            <v-flex shrink style=\"padding-left:5px;\">\n                <fluro-confirm-button @click=\"remove\" v-tippy content=\"Remove\">\n                    <template v-slot:default=\"{confirming}\">\n                        <span class=\"btn\" xs>\n                            {{confirming ? 'Confirm?' : 'Remove'}}\n                        </span>\n                    </template>\n                </fluro-confirm-button>\n            </v-flex>\n        </v-layout>\n        <div v-html=\"summary\"></div>\n    </list-group-item>\n</template>\n<script>\nimport FluroConfirmButton from 'src/components/ui/FluroConfirmButton.vue';\nimport _ from 'lodash';\n\nexport default {\n    components: {\n        FluroConfirmButton,\n    },\n    props: {\n        value: {\n            type: Object,\n            required: true,\n        },\n        form: {\n            type: Object,\n            required: true,\n        },\n    },\n    created() {\n\n    },\n    computed: {\n        summary() {\n\n            var self = this;\n            var message;\n            var action;\n            var amount = self.model.expression || '';\n\n            var condition;\n\n            if (self.model.condition && self.model.condition.length) {\n                condition = '<div class=\"text-muted\">if <em>' + self.model.condition + '</em></div>'; //' returns true';\n            }\n\n            //If amount is a pure number\n            if (!isNaN(amount)) {\n                amount = `<strong>${amount}</strong>`;\n            }\n\n            switch (self.model.operation) {\n                case 'set':\n                    action = 'Set current total to';\n                    break;\n                case 'add':\n                    action = 'Add';\n                    amount = amount + ' to current total';\n                    break;\n                case 'multiply':\n                    action = 'Multiply current total by';\n                    break;\n                case 'subtract':\n                    action = 'Subtract';\n                    amount = amount + ' from current total';\n                    break;\n                case 'divide':\n                    action = 'Divide current total by';\n                    break;\n                default:\n                    return;\n                    break;\n            }\n\n            message = _.compact([condition, action, amount]).join(' ');\n\n            return message;\n\n\n        }\n    },\n    watch: {\n        value(v) {\n            this.model = v;\n        },\n    },\n    data() {\n        return {\n            model: this.value,\n        }\n    },\n    methods: {\n        duplicate() {\n            this.$emit('duplicate', this.model);\n        },\n        remove() {\n            this.$emit('remove', this.model);\n        },\n        edit() {\n            this.$emit('edit', this.model);\n        },\n    },\n}\n</script>\n<style lang=\"scss\">\n\n/**/\r\n\r\n$primary: #2ad4b9;//#0bd6be;\r\n$success: #4cc650; //#4cc673;//\r\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\r\n$danger: #d93e63;\r\n$secondary: #0bd6cd; //#0bd6a3;\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n\r\n.border-top {\r\n    border-top: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-right {\r\n    border-right: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-bottom {\r\n    border-bottom: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-left {\r\n    border-left: 1px solid rgba(#000, 0.05);\r\n}\r\n//////////////////////////////////////////\r\n\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n/**/\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n\n/*# sourceMappingURL=PaymentModifierItem.vue.map */"]}, media: undefined });

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
var script$1 = {
  props: {
    title: {
      type: String
    }
  },

  data() {
    return {
      expanded: false
    };
  },

  methods: {
    toggle() {
      this.expanded = !this.expanded;
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
    { staticClass: "modifier-accordion", class: { expanded: _vm.expanded } },
    [
      _c(
        "div",
        {
          staticClass: "modifier-accordion-title",
          on: {
            click: function($event) {
              return _vm.toggle()
            }
          }
        },
        [
          _c(
            "v-container",
            { attrs: { fluid: "", "py-1": "", "px-2": "" } },
            [
              _c(
                "v-layout",
                { attrs: { "align-center": "" } },
                [
                  _c("v-flex", [
                    _vm._v("\n\t\t\t\t\t" + _vm._s(_vm.title) + "\n\t\t\t\t")
                  ]),
                  _vm._v(" "),
                  _c(
                    "v-flex",
                    { attrs: { shrink: "" } },
                    [
                      _c("fluro-icon", {
                        staticClass: "icon",
                        attrs: { icon: "angle-right" }
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
      ),
      _vm._v(" "),
      _vm.expanded
        ? _c(
            "div",
            { staticClass: "modifier-accordion-body" },
            [
              _c(
                "v-container",
                { attrs: { fluid: "", "pa-2": "" } },
                [_vm._t("default")],
                2
              )
            ],
            1
          )
        : _vm._e()
    ]
  )
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = function (inject) {
    if (!inject) return
    inject("data-v-058a026d_0", { source: "/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.modifier-accordion {\n  font-size: 0.8em;\n  border-top: 1px solid rgba(0, 0, 0, 0.1);\n}\n.modifier-accordion .icon {\n  transition: all 0.3s;\n}\n.modifier-accordion .modifier-accordion-title {\n  display: block;\n  background: #eee;\n  cursor: pointer;\n}\n.modifier-accordion .modifier-accordion-body {\n  display: block;\n  background: #fff;\n}\n.modifier-accordion.expanded .modifier-accordion-title {\n  font-weight: bold;\n}\n.modifier-accordion.expanded .icon {\n  transform: rotate(90deg);\n}\n\n/*# sourceMappingURL=PaymentModifierAccordionPanel.vue.map */", map: {"version":3,"sources":["C:\\Users\\User\\Documents\\fluro\\fluro-vue-ui\\src\\components\\content\\edit\\components\\PaymentModifierAccordionPanel.vue","PaymentModifierAccordionPanel.vue"],"names":[],"mappings":"AA2CA,GAAA;AAYA;EACA,yCAAA;ACrDA;ADwDA;EACA,2CAAA;ACrDA;ADwDA;EACA,4CAAA;ACrDA;ADwDA;EACA,0CAAA;ACrDA;;AD6DA,GAAA;AACA;EACA,gBAAA;EACA,wCAAA;AC1DA;AD4DA;EACA,oBAAA;AC1DA;AD6DA;EACA,cAAA;EACA,gBAAA;EACA,eAAA;AC3DA;AD+DA;EACA,cAAA;EACA,gBAAA;AC7DA;ADkEA;EACA,iBAAA;AChEA;ADkEA;EACA,wBAAA;AChEA;;AAEA,4DAA4D","file":"PaymentModifierAccordionPanel.vue","sourcesContent":["<template>\n\t<div class=\"modifier-accordion\" :class=\"{expanded:expanded}\">\n\t\t<div class=\"modifier-accordion-title\" @click=\"toggle()\">\n\t\t\t<v-container fluid py-1 px-2>\n\t\t\t\t<v-layout align-center>\n\t\t\t\t\t<v-flex>\n\t\t\t\t\t\t{{title}}\n\t\t\t\t\t</v-flex>\n\t\t\t\t\t<v-flex shrink>\n\t\t\t\t\t\t<fluro-icon class=\"icon\" icon=\"angle-right\" />\n\t\t\t\t\t</v-flex>\n\t\t\t\t</v-layout>\n\t\t\t</v-container>\n\t\t</div>\n\t\t<div class=\"modifier-accordion-body\" v-if=\"expanded\">\n\t\t\t<v-container fluid pa-2>\n\t\t\t\t<slot />\n\t\t\t</v-container>\n\t\t</div>\n\t</div>\n</template>\n<script>\nexport default {\n\tprops: {\n\t\ttitle: {\n\t\t\ttype: String,\n\t\t}\n\t},\n\tdata() {\n\t\treturn {\n\t\t\texpanded: false,\n\t\t}\n\t},\n\tmethods: {\n\t\ttoggle() {\n\t\t\tthis.expanded = !this.expanded;\n\t\t}\n\t}\n}\n\n</script>\n<style lang=\"scss\">\n\n/**/\r\n\r\n$primary: #2ad4b9;//#0bd6be;\r\n$success: #4cc650; //#4cc673;//\r\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\r\n$danger: #d93e63;\r\n$secondary: #0bd6cd; //#0bd6a3;\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n\r\n.border-top {\r\n    border-top: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-right {\r\n    border-right: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-bottom {\r\n    border-bottom: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-left {\r\n    border-left: 1px solid rgba(#000, 0.05);\r\n}\r\n//////////////////////////////////////////\r\n\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n/**/\n.modifier-accordion {\n   font-size: 0.8em;\n\tborder-top: 1px solid rgba(#000, 0.1);\n\n\t.icon {\n\t\ttransition: all 0.3s;\n\t}\n\n\t.modifier-accordion-title {\n\t\tdisplay: block;\n\t\tbackground: #eee;\n\t\tcursor: pointer;\n\t\t\n\t}\n\n\t.modifier-accordion-body {\n\t\tdisplay: block;\n\t\tbackground: #fff;\n\t}\n\n\t&.expanded {\n\n\t .modifier-accordion-title {\n\t  font-weight: bold;\n\t }\n\t\t.icon {\n\t\t\ttransform: rotate(90deg);\n\t\t}\n\t}\n}\n\n</style>\n","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.modifier-accordion {\n  font-size: 0.8em;\n  border-top: 1px solid rgba(0, 0, 0, 0.1);\n}\n.modifier-accordion .icon {\n  transition: all 0.3s;\n}\n.modifier-accordion .modifier-accordion-title {\n  display: block;\n  background: #eee;\n  cursor: pointer;\n}\n.modifier-accordion .modifier-accordion-body {\n  display: block;\n  background: #fff;\n}\n.modifier-accordion.expanded .modifier-accordion-title {\n  font-weight: bold;\n}\n.modifier-accordion.expanded .icon {\n  transform: rotate(90deg);\n}\n\n/*# sourceMappingURL=PaymentModifierAccordionPanel.vue.map */"]}, media: undefined });

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
  components: {
    FluroHelp,
    FluroExpressionEditor,
    'modifier-accordion': __vue_component__$1
  },
  props: {
    options: {
      type: Object
    }
  },
  computed: {
    form() {
      return this.options.form;
    },

    availableFields() {
      var self = this;

      function extractFieldsFromDefinitionFields(fields, indexIterator, includeExamples) {
        if (!indexIterator) {
          indexIterator = 'i';
        }

        function getFlattenedFields(array, trail, titles) {
          return _.chain(array).map(function (field, key) {
            var returnValue = []; /////////////////////////////////////////
            //If there are sub fields

            if (field.fields && field.fields.length) {
              if (field.asObject || field.directive == 'embedded') {
                //Push the field itself
                trail.push(field.key);
                titles.push(field.title);
                field.trail = trail.slice();
                field.titles = titles.slice();
                trail.pop();
                titles.pop();
                returnValue.push(field); ///////////////////////////////
                //Prepend the key to all lowed fields

                if (field.maximum != 1) {
                  trail.push(field.key + '[' + indexIterator + ']');
                  titles.push(field.title);
                } else {
                  trail.push(field.key);
                  titles.push(field.title);
                }
              } // console.log('Go down', field.key);


              var fields = getFlattenedFields(field.fields, trail, titles);

              if (field.asObject || field.directive == 'embedded') {
                trail.pop();
                titles.pop();
              } //console.log('Go back up')


              returnValue.push(fields);
            } else {
              /////////////////////////////////////////
              //Push the field key
              trail.push(field.key);
              titles.push(field.title);
              field.trail = trail.slice();
              field.titles = titles.slice();
              trail.pop();
              titles.pop();
              returnValue.push(field);
            } /////////////////////////////////////////


            return returnValue;
          }).flattenDeep().value();
        } // //Get all the flattened fields


        var flattened = getFlattenedFields(fields, [], []);

        var mapped = _.chain(flattened).map(formatField).compact().value(); /////////////////////////////////////////////////


        if (includeExamples) {
          return _.map(mapped, addExamples);
        } else {
          return mapped;
        } /////////////////////////////////////////////////


        var cutOff = 20; /////////////////////////////////////////////////

        function formatField(field, index) {
          if (field.type == 'void') {
            return;
          }

          var isArray = field.maximum != 1;
          var firstTen = [];
          var fieldPath = field.trail.join('.'); /////////////////////////////////////////////////
          //Create the indents

          var indents = [];

          _.times(field.trail.length - 1, function (n) {
            indents.push('--');
          }); //Indent the title


          var indentedTitle = indents.join('-') + ' ' + field.title;

          if (isArray) {
            //Add (Multiple to the end of the title)
            indentedTitle = indentedTitle + ' (Multiple)';
          } /////////////////////////////////////////////////
          //And it has options


          if (field.options && field.options.length) {
            firstTen = field.options.slice(0, cutOff);
          } else if (field.allowedValues && field.allowedValues.length) {
            firstTen = _.map(field.allowedValues.slice(0, cutOff), function (entry) {
              if (entry) {
                return {
                  name: entry,
                  value: entry
                };
              }
            });
          } else if (field.defaultValues && field.defaultValues.length) {
            firstTen = _.map(field.defaultValues.slice(0, cutOff), function (entry) {
              if (entry) {
                return {
                  name: entry,
                  value: entry
                };
              }
            });
          }

          var delimiter = '[' + indexIterator + ']';
          var delimiterIndex = fieldPath.lastIndexOf(delimiter); //Check if this field is a child of a lower level multi group

          if (delimiterIndex != -1) {
            var parentPath = fieldPath.slice(0, delimiterIndex);
            var childPath = fieldPath.slice(delimiterIndex + delimiter.length + 1);
          } /////////////////////////////////////////////////


          return {
            title: field.title,
            indentedTitle: indentedTitle,
            key: field.key,
            parentTitle: field.titles[field.titles.length - 2],
            parentPath: parentPath,
            childPath: childPath,
            path: fieldPath,
            type: field.type,
            isArray: isArray,
            titles: field.titles.join(' > '),
            options: field.options,
            firstTen: firstTen
          };
        } /////////////////////////////////////////////////


        function addExamples(field) {
          var exampleValue;
          var exampleTitle;
          var fieldPath = field.path;
          var firstTen = field.firstTen;
          var isArray = field.isArray; /////////////////////////////////////////////////////////////

          var minimum = field.minimum;
          var maximum = field.maximum || field.firstTen.length || 5; /////////////////////////////////////////////////

          switch (field.type) {
            case 'integer':
              exampleTitle = exampleValue = 12;
              break;

            case 'float':
              exampleTitle = exampleValue = 3.56;
              break;

            case 'number':
              exampleTitle = exampleValue = 15;
              break;

            case 'boolean':
              exampleTitle = exampleValue = 'true';
              break;

            case 'email':
              exampleTitle = exampleValue = "'example@fluro.io'";
              break;

            case 'url':
              exampleTitle = exampleValue = "'https://www.fluro.io'";
              break;

            case 'date':
              exampleTitle = 'Date';
              exampleValue = new Date().getTime();
              break;

            case 'string':
              if (isArray) {
                if (firstTen.length) {
                  exampleTitle = exampleValue = '[' + _.chain(firstTen.slice(0, maximum || 3)).compact().map(function (entry) {
                    return '"' + entry.value + '"';
                  }).value().join(', ') + ']';
                } else {
                  exampleTitle = exampleValue = "['Michael', 'Susan', 'Jerry']";
                }
              } else {
                if (firstTen.length) {
                  exampleTitle = _.first(firstTen).name;
                  exampleValue = "'" + _.first(firstTen).value + "'";
                } else {
                  exampleTitle = exampleValue = "'Michael'";
                }
              }

              break;

            case 'reference':
              if (isArray) {
                exampleTitle = exampleValue = '[Object, Object, Object]';
              } else {
                exampleTitle = exampleValue = '(Object)';
              }

              break;
          } /////////////////////////////////////////////////////////////


          var examples = []; /////////////////////////////////////////////////////////////
          //Check if this field is a child of a lower level multi group

          if (field.childPath) {
            if (!firstTen.length) {
              examples.push({
                path: "matchInArray(data." + field.parentPath + ", '" + field.childPath + "', " + exampleValue + ").length",
                description: 'Returns the total number of  \'' + field.parentTitle + '\' values where \'' + field.title + '\' is equal to \'' + exampleTitle + '\''
              });
            }

            if (isArray) {
              examples.push({
                path: "matchInArray(data." + field.parentPath + ", '" + field.childPath + ".length', 3).length",
                description: 'Returns the total number of  \'' + field.parentTitle + '\' values where \'' + field.title + '\' has selected exactly 3 values'
              });
              examples.push({
                path: "matchInArray(data." + field.parentPath + ", '" + field.childPath + ".length', 3, '>=').length",
                description: 'Returns the total number of  \'' + field.parentTitle + '\' values where \'' + field.title + '\' has selected at least 3 values'
              });
            }

            _.each(firstTen, function (entry) {
              if (isArray) {
                examples.push({
                  path: "matchInArray(data." + field.parentPath + ", '" + field.childPath + "', '" + entry.value + "', 'in').length",
                  description: 'Returns the total number of  \'' + field.parentTitle + '\' values where \'' + field.title + '\' has \'' + entry.name + '\' selected as one of it\'s values'
                });
              } else {
                examples.push({
                  path: "matchInArray(data." + field.parentPath + ", '" + field.childPath + "', '" + entry.value + "').length",
                  description: 'Returns the total number of  \'' + field.parentTitle + '\' values where \'' + field.title + '\' is equal to \'' + entry.name + '\''
                });
              }
            });
          } else {
            /////////////////////////////////////////////////////////////
            if (field.isArray) {
              examples.push({
                path: 'data.' + fieldPath + '',
                description: `The literal value of '${field.title}' eg.['${exampleValue}']`
              });
              examples.push({
                path: 'data.' + fieldPath + '.length',
                description: 'The number of \'' + field.title + '\' values'
              });
              examples.push({
                path: 'data.' + fieldPath + '.length > 4',
                description: 'Returns true if the number of \'' + field.title + '\' values is greater than 4'
              }); //Get the first 10 possible options

              _.each(firstTen, function (option) {
                examples.push({
                  path: 'data.' + fieldPath + '.includes(\'' + option.value + '\')',
                  description: 'Returns true if  \'' + option.name + '\' is included in the selection'
                });
              });
            } else {
              examples.push({
                path: 'data.' + fieldPath + '',
                description: `The literal value of '${field.title}' eg. '${exampleValue}'`
              }); //Get the first 10 possible options

              _.each(firstTen, function (option) {
                examples.push({
                  path: 'data.' + fieldPath + ' == \'' + option.value + '\'',
                  description: 'Returns true if  \'' + option.name + '\' has been selected'
                });
              });

              switch (field.type) {
                case 'boolean':
                  examples.push({
                    path: 'data.' + fieldPath + ' == ' + exampleValue,
                    description: 'If \'' + field.title + '\' is equal to ' + exampleValue
                  });
                  examples.push({
                    path: 'data.' + fieldPath + ' != ' + exampleValue,
                    description: 'If \'' + field.title + '\' is not equal to ' + exampleValue
                  });
                  break;

                case 'string':
                  if (!firstTen.length) {
                    examples.push({
                      path: 'data.' + fieldPath + ' == ' + exampleValue,
                      description: 'If \'' + field.title + '\' is equal to ' + exampleValue
                    });
                    examples.push({
                      path: 'data.' + fieldPath + ' && data.' + fieldPath + '.toUpperCase() == ' + String(exampleValue).toUpperCase(),
                      description: 'If \'' + field.title + '\' converted to uppercase is equal to ' + String(exampleValue).toUpperCase()
                    });

                    if (field.directive == 'wysiwyg' || field.directive == 'textarea') {
                      examples.push({
                        path: 'data.' + fieldPath + '.length > 200',
                        description: 'If text is more than 200 letters'
                      });
                    }
                  }

                  break;

                case 'number':
                case 'integer':
                case 'float':
                  examples.push({
                    path: 'data.' + fieldPath + ' == ' + exampleValue,
                    description: 'If \'' + field.title + '\' is equal to ' + exampleValue
                  });
                  examples.push({
                    path: 'data.' + fieldPath + ' != ' + exampleValue,
                    description: 'If \'' + field.title + '\' is not equal to ' + exampleValue
                  });
                  examples.push({
                    path: 'data.' + fieldPath + ' > ' + exampleValue,
                    description: 'If \'' + field.title + '\' is greater than ' + exampleValue
                  });
                  examples.push({
                    path: 'data.' + fieldPath + ' >= ' + exampleValue,
                    description: 'If \'' + field.title + '\' is greater than or equal to ' + exampleValue
                  });
                  examples.push({
                    path: 'data.' + fieldPath + ' < ' + exampleValue,
                    description: 'If \'' + field.title + '\' is less than ' + exampleValue
                  });
                  examples.push({
                    path: 'data.' + fieldPath + ' <= ' + exampleValue,
                    description: 'If \'' + field.title + '\' is less than or equal to ' + exampleValue
                  });
                  break;
              }
            }
          } /////////////////////////////////////////////////////////////


          field.examples = examples;
          field.exampleValue = exampleValue; /////////////////////////////////////////////////////////////

          return field;
        }
      }

      return extractFieldsFromDefinitionFields(self.form.fields, '0', true);
    },

    modifierDescription() {
      switch (this.model.operation) {
        case 'add':
          return 'The value returned will be added to the calculated total';

        case 'subtract':
          return 'The value returned will be subtracted from the calculated total';

        case 'multiply':
          return 'The calculated total will be multipled by the value returned';

        case 'divide':
          return 'The calculated total will be divided by the value returned';

        case 'set':
          return 'The calculated total will be set to match the value returned';
      }
    },

    operators() {
      var array = [];
      array.push({
        value: 'add',
        text: 'Add'
      });
      array.push({
        value: 'subtract',
        text: 'Subtract'
      });
      array.push({
        value: 'multiply',
        text: 'Multiply'
      });
      array.push({
        value: 'divide',
        text: 'Divide'
      });
      array.push({
        value: 'set',
        text: 'Set to'
      });
      return array;
    },

    model() {
      return this.options.item;
    }

  },
  methods: {
    done() {
      this.close(this.model);
    }

  },
  mixins: [FluroModalMixin]
};

/* script */
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "flex-column",
    { staticStyle: { width: "80vw" } },
    [
      _c(
        "flex-column-header",
        [
          _c(
            "v-container",
            { staticClass: "border-bottom", attrs: { fluid: "", "pa-2": "" } },
            [
              _c(
                "v-layout",
                { attrs: { "align-center": "" } },
                [
                  _c("v-flex", [
                    _c("h5", [
                      _vm._v(_vm._s(_vm.model.title) + " "),
                      _c("span", { staticClass: "muted" }, [
                        _vm._v("// Payment Modifier")
                      ])
                    ])
                  ]),
                  _vm._v(" "),
                  _vm.options.cancelEnabled
                    ? _c(
                        "v-flex",
                        { attrs: { shrink: "" } },
                        [
                          _c(
                            "v-btn",
                            {
                              staticClass: "ma-0 mr-2",
                              on: {
                                click: function($event) {
                                  return _vm.dismiss()
                                }
                              }
                            },
                            [_vm._v("\n\t\t\t\t\t\tCancel\n\t\t\t\t\t")]
                          )
                        ],
                        1
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _c(
                    "v-flex",
                    { attrs: { shrink: "" } },
                    [
                      _c(
                        "v-btn",
                        {
                          staticClass: "ma-0",
                          attrs: { color: "primary" },
                          on: {
                            click: function($event) {
                              return _vm.done()
                            }
                          }
                        },
                        [_vm._v("\n\t\t\t\t\t\tDone\n\t\t\t\t\t")]
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
      ),
      _vm._v(" "),
      _c(
        "flex-row",
        [
          _c(
            "flex-column-body",
            [
              _c(
                "v-container",
                [
                  _c("v-text-field", {
                    attrs: {
                      autofocus: true,
                      label: "Title",
                      hint:
                        "The name of this modifier (displayed to the user when active)"
                    },
                    model: {
                      value: _vm.model.title,
                      callback: function($$v) {
                        _vm.$set(_vm.model, "title", $$v);
                      },
                      expression: "model.title"
                    }
                  }),
                  _vm._v(" "),
                  _c("v-select", {
                    attrs: {
                      label: "Modifier",
                      items: _vm.operators,
                      hint: _vm.modifierDescription
                    },
                    model: {
                      value: _vm.model.operation,
                      callback: function($$v) {
                        _vm.$set(_vm.model, "operation", $$v);
                      },
                      expression: "model.operation"
                    }
                  }),
                  _vm._v(" "),
                  _c(
                    "v-input",
                    {
                      staticClass: "no-flex",
                      attrs: {
                        label: "Value",
                        hint:
                          "Either a value or an expression that returns a number in cents eg. '2000' or 'date.contacts.length'",
                        "persistent-hint": true
                      }
                    },
                    [
                      _c("fluro-expression-editor", {
                        model: {
                          value: _vm.model.expression,
                          callback: function($$v) {
                            _vm.$set(_vm.model, "expression", $$v);
                          },
                          expression: "model.expression"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("br"),
                  _vm._v(" "),
                  _c(
                    "v-input",
                    {
                      staticClass: "no-flex",
                      attrs: {
                        label: "Condition",
                        hint:
                          "Specify a condition that must return 'truthy' for this payment modifier to be enabled.",
                        "persistent-hint": true
                      }
                    },
                    [
                      _c("fluro-expression-editor", {
                        model: {
                          value: _vm.model.condition,
                          callback: function($$v) {
                            _vm.$set(_vm.model, "condition", $$v);
                          },
                          expression: "model.condition"
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
            "flex-column-body",
            { staticClass: "help" },
            [
              _c(
                "v-container",
                [
                  _c("label", [_vm._v("Expressions and Variables")]),
                  _vm._v(" "),
                  _c("p", { staticClass: "help-block" }, [
                    _vm._v(
                      "You can use the variables described below within your value and condition fields."
                    )
                  ]),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      attrs: {
                        small: "",
                        href:
                          "https://support.fluro.io/kb/advanced-form-expressions-guide",
                        target: "_blank"
                      }
                    },
                    [
                      _vm._v(
                        "\n\t\t\t\t\tClick here for more documentation\n\t\t\t\t\t"
                      ),
                      _c("fluro-icon", {
                        attrs: { icon: "external-link", right: "" }
                      })
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c("modifier-accordion", { attrs: { title: "Logic Examples" } }, [
                _c("p", [
                  _c("code", [
                    _vm._v("data.age > 18 && date.gender == 'male'")
                  ]),
                  _c("br"),
                  _vm._v(" "),
                  _c("span", [
                    _vm._v("Example of using the "),
                    _c("strong", [_vm._v("AND")]),
                    _vm._v(" operator "),
                    _c("strong", [_vm._v("&&")])
                  ])
                ]),
                _vm._v(" "),
                _c("p", [
                  _c("code", [
                    _vm._v(
                      "data.firstName == 'Frank' || data.firstName == 'Susan'"
                    )
                  ]),
                  _c("br"),
                  _vm._v(" "),
                  _c("span", [
                    _vm._v("Example of using the "),
                    _c("strong", [_vm._v("OR")]),
                    _vm._v(" operator "),
                    _c("strong", [_vm._v("||")])
                  ])
                ]),
                _vm._v(" "),
                _c("p", [
                  _c("code", [
                    _vm._v("data.age >= 18 ? 'Allowed' : 'Not Allowed'")
                  ]),
                  _c("br"),
                  _vm._v(" "),
                  _c("span", [
                    _vm._v("Example of using short hand "),
                    _c("strong", [_vm._v("if/else")])
                  ])
                ])
              ]),
              _vm._v(" "),
              _vm._l(_vm.availableFields, function(field) {
                return _c(
                  "modifier-accordion",
                  { attrs: { title: field.titles } },
                  _vm._l(field.examples, function(example) {
                    return _c("p", [
                      _c("code", [_vm._v(_vm._s(example.path))]),
                      _c("br"),
                      _vm._v(" "),
                      _c("span", [_vm._v(_vm._s(example.description))])
                    ])
                  }),
                  0
                )
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
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  const __vue_inject_styles__$2 = function (inject) {
    if (!inject) return
    inject("data-v-60d5858a_0", { source: "/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.help {\n  background: #eee;\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/*# sourceMappingURL=PaymentModifierModal.vue.map */", map: {"version":3,"sources":["C:\\Users\\User\\Documents\\fluro\\fluro-vue-ui\\src\\components\\content\\edit\\components\\PaymentModifierModal.vue","PaymentModifierModal.vue"],"names":[],"mappings":"AAmnBA,GAAA;AAYA;EACA,yCAAA;AC7nBA;ADgoBA;EACA,2CAAA;AC7nBA;ADgoBA;EACA,4CAAA;AC7nBA;ADgoBA;EACA,0CAAA;AC7nBA;;ADqoBA,GAAA;AACA;EACA,gBAAA;EACA,0CAAA;ACloBA;;AAEA,mDAAmD","file":"PaymentModifierModal.vue","sourcesContent":["<template>\n\t<flex-column style=\"width:80vw;\">\n\t\t<flex-column-header>\n\t\t\t<v-container fluid pa-2 class=\"border-bottom\">\n\t\t\t\t<v-layout align-center>\n\t\t\t\t\t<v-flex>\n\t\t\t\t\t\t<h5>{{model.title}} <span class=\"muted\">// Payment Modifier</span></h5>\n\t\t\t\t\t</v-flex>\n\t\t\t\t\t<v-flex shrink v-if=\"options.cancelEnabled\">\n\t\t\t\t\t\t<v-btn class=\"ma-0 mr-2\" @click=\"dismiss()\">\n\t\t\t\t\t\t\tCancel\n\t\t\t\t\t\t</v-btn>\n\t\t\t\t\t</v-flex>\n\t\t\t\t\t<v-flex shrink>\n\t\t\t\t\t\t<v-btn color=\"primary\" class=\"ma-0\" @click=\"done()\">\n\t\t\t\t\t\t\tDone\n\t\t\t\t\t\t</v-btn>\n\t\t\t\t\t</v-flex>\n\t\t\t\t</v-layout>\n\t\t\t</v-container>\n\t\t</flex-column-header>\n\t\t<flex-row>\n\t\t\t<flex-column-body>\n\t\t\t\t<v-container>\n\t\t\t\t\t<v-text-field :autofocus=\"true\" label=\"Title\" hint=\"The name of this modifier (displayed to the user when active)\" v-model=\"model.title\" />\n\t\t\t\t\t<v-select label=\"Modifier\" :items=\"operators\" :hint=\"modifierDescription\" v-model=\"model.operation\" />\n\t\t\t\t\t<v-input label=\"Value\" hint=\"Either a value or an expression that returns a number in cents eg. '2000' or 'date.contacts.length'\" :persistent-hint=\"true\" class=\"no-flex\">\n\t\t\t\t\t\t<fluro-expression-editor v-model=\"model.expression\" />\n\t\t\t\t\t</v-input>\n\t\t\t\t\t<br />\n\t\t\t\t\t<v-input label=\"Condition\" hint=\"Specify a condition that must return 'truthy' for this payment modifier to be enabled.\" :persistent-hint=\"true\" class=\"no-flex\">\n\t\t\t\t\t\t<!-- <fluro-help title=\"Payment Modifier Condition\" body=\"\"> -->\n\t\t\t\t\t\t<fluro-expression-editor v-model=\"model.condition\" />\n\t\t\t\t\t</v-input>\n\t\t\t\t</v-container>\n\t\t\t</flex-column-body>\n\t\t\t<flex-column-body class=\"help\">\n\t\t\t\t<v-container>\n\t\t\t\t\t<label>Expressions and Variables</label>\n\t\t\t\t\t<p class=\"help-block\">You can use the variables described below within your value and condition fields.</p>\n\t\t\t\t\t<v-btn small href=\"https://support.fluro.io/kb/advanced-form-expressions-guide\" target=\"_blank\">\n\t\t\t\t\t\tClick here for more documentation\n\t\t\t\t\t\t<fluro-icon icon=\"external-link\" right />\n\t\t\t\t\t</v-btn>\n\t\t\t\t</v-container>\n\t\t\t\t<modifier-accordion title=\"Logic Examples\">\n\t\t\t\t\t<p>\n\t\t\t\t\t\t<code>data.age > 18 && date.gender == 'male'</code><br />\n\t\t\t\t\t\t<span>Example of using the <strong>AND</strong> operator <strong>&&</strong></span>\n\t\t\t\t\t</p>\n\t\t\t\t\t<p>\n\t\t\t\t\t\t<code>data.firstName == 'Frank' || data.firstName == 'Susan'</code><br />\n\t\t\t\t\t\t<span>Example of using the <strong>OR</strong> operator <strong>||</strong></span>\n\t\t\t\t\t</p>\n\t\t\t\t\t<p>\n\t\t\t\t\t\t<code>data.age >= 18 ? 'Allowed' : 'Not Allowed'</code><br />\n\t\t\t\t\t\t<span>Example of using short hand <strong>if/else</strong></span>\n\t\t\t\t\t</p>\n\t\t\t\t</modifier-accordion>\n\t\t\t\t<modifier-accordion :title=\"field.titles\" v-for=\"field in availableFields\">\n\t\t\t\t\t<p v-for=\"example in field.examples\">\n\t\t\t\t\t\t<code>{{example.path}}</code><br />\n\t\t\t\t\t\t<span>{{example.description}}</span>\n\t\t\t\t\t</p>\n\t\t\t\t</modifier-accordion>\n\t\t\t\t<!-- <Div ng-repeat=\"field in availableFields\">\n\t\t\t\t\t<div class=\"modifier-accordion\" ng-class=\"{expanded:field.expanded}\">\n\t\t\t\t\t\t<div class=\"modifier-accordion-title\" ng-click=\"field.expanded = !field.expanded\">\n\t\t\t\t\t\t\t<i class=\"fa fa-angle-right pull-right\" ng-class=\"{'fa-rotate-90':field.expanded}\"></i>\n\t\t\t\t\t\t\t<span ng-bind=\"::field.titles\"></span>\n\t\t\t\t\t\t\t<code>data.{{field.path}}</code>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"modifier-accordion-body\" ng-if=\"field.expanded\">\n\t\t\t\t\t\t\t<p ng-repeat=\"example in field.examples\">\n\t\t\t\t\t\t\t\t<code ng-bind=\"::example.path\"></code><br />\n\t\t\t\t\t\t\t\t<span ng-bind=\"::example.description\"></span>\n\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div> -->\n\t\t\t</flex-column-body>\n\t\t</flex-row>\n\t</flex-column>\n</template>\n<script>\nimport FluroHelp from 'src/components/FluroHelp.vue';\nimport FluroModalMixin from 'src/mixins/ModalMixin.js';\nimport FluroExpressionEditor from 'src/components/form/FluroExpressionEditor.vue';\nimport PaymentModifierAccordionPanel from 'src/components/content/edit/components/PaymentModifierAccordionPanel.vue';\n\n\n\n\n\nexport default {\n\tcomponents: {\n\t FluroHelp,\n\t\tFluroExpressionEditor,\n\t\t'modifier-accordion': PaymentModifierAccordionPanel,\n\t},\n\tprops: {\n\t\toptions: {\n\t\t\ttype: Object\n\t\t}\n\t},\n\tcomputed: {\n\t\tform() {\n\t\t\treturn this.options.form;\n\t\t},\n\t\tavailableFields() {\n\n\t\t\tvar self = this;\n\n\t\t\tfunction extractFieldsFromDefinitionFields(fields, indexIterator, includeExamples) {\n\n\t\t\t\tif (!indexIterator) {\n\t\t\t\t\tindexIterator = 'i'\n\t\t\t\t};\n\n\t\t\t\tfunction getFlattenedFields(array, trail, titles) {\n\n\t\t\t\t\treturn _.chain(array)\n\t\t\t\t\t\t.map(function(field, key) {\n\n\t\t\t\t\t\t\tvar returnValue = [];\n\t\t\t\t\t\t\t/////////////////////////////////////////\n\n\t\t\t\t\t\t\t//If there are sub fields\n\t\t\t\t\t\t\tif (field.fields && field.fields.length) {\n\n\n\t\t\t\t\t\t\t\tif (field.asObject || field.directive == 'embedded') {\n\t\t\t\t\t\t\t\t\t//Push the field itself\n\t\t\t\t\t\t\t\t\ttrail.push(field.key);\n\t\t\t\t\t\t\t\t\ttitles.push(field.title)\n\n\t\t\t\t\t\t\t\t\tfield.trail = trail.slice();\n\t\t\t\t\t\t\t\t\tfield.titles = titles.slice();\n\n\t\t\t\t\t\t\t\t\ttrail.pop();\n\t\t\t\t\t\t\t\t\ttitles.pop();\n\t\t\t\t\t\t\t\t\treturnValue.push(field);\n\n\n\t\t\t\t\t\t\t\t\t///////////////////////////////\n\n\t\t\t\t\t\t\t\t\t//Prepend the key to all lowed fields\n\t\t\t\t\t\t\t\t\tif (field.maximum != 1) {\n\t\t\t\t\t\t\t\t\t\ttrail.push(field.key + '[' + indexIterator + ']');\n\t\t\t\t\t\t\t\t\t\ttitles.push(field.title);\n\t\t\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\t\t\ttrail.push(field.key);\n\t\t\t\t\t\t\t\t\t\ttitles.push(field.title);\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t// console.log('Go down', field.key);\n\t\t\t\t\t\t\t\tvar fields = getFlattenedFields(field.fields, trail, titles);\n\n\t\t\t\t\t\t\t\tif (field.asObject || field.directive == 'embedded') {\n\t\t\t\t\t\t\t\t\ttrail.pop()\n\t\t\t\t\t\t\t\t\ttitles.pop();\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t//console.log('Go back up')\n\t\t\t\t\t\t\t\treturnValue.push(fields);\n\n\n\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\t/////////////////////////////////////////\n\n\t\t\t\t\t\t\t\t//Push the field key\n\t\t\t\t\t\t\t\ttrail.push(field.key);\n\t\t\t\t\t\t\t\ttitles.push(field.title);\n\n\t\t\t\t\t\t\t\tfield.trail = trail.slice();\n\t\t\t\t\t\t\t\tfield.titles = titles.slice();\n\t\t\t\t\t\t\t\ttrail.pop();\n\t\t\t\t\t\t\t\ttitles.pop();\n\t\t\t\t\t\t\t\treturnValue.push(field);\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t/////////////////////////////////////////\n\n\t\t\t\t\t\t\treturn returnValue;\n\n\t\t\t\t\t\t})\n\t\t\t\t\t\t.flattenDeep()\n\t\t\t\t\t\t.value();\n\t\t\t\t}\n\n\t\t\t\t// //Get all the flattened fields\n\t\t\t\tvar flattened = getFlattenedFields(fields, [], []);\n\n\t\t\t\tvar mapped = _.chain(flattened)\n\t\t\t\t\t.map(formatField)\n\t\t\t\t\t.compact()\n\t\t\t\t\t.value();\n\n\t\t\t\t/////////////////////////////////////////////////\n\n\t\t\t\tif (includeExamples) {\n\t\t\t\t\treturn _.map(mapped, addExamples);\n\t\t\t\t} else {\n\t\t\t\t\treturn mapped;\n\t\t\t\t}\n\n\t\t\t\t/////////////////////////////////////////////////\n\n\t\t\t\tvar cutOff = 20;\n\n\t\t\t\t/////////////////////////////////////////////////\n\n\t\t\t\tfunction formatField(field, index) {\n\n\t\t\t\t\tif (field.type == 'void') {\n\t\t\t\t\t\treturn;\n\t\t\t\t\t}\n\n\t\t\t\t\tvar isArray = field.maximum != 1;\n\t\t\t\t\tvar firstTen = [];\n\t\t\t\t\tvar fieldPath = field.trail.join('.');\n\n\t\t\t\t\t/////////////////////////////////////////////////\n\n\t\t\t\t\t//Create the indents\n\t\t\t\t\tvar indents = [];\n\t\t\t\t\t_.times(field.trail.length - 1, function(n) {\n\t\t\t\t\t\tindents.push('--');\n\t\t\t\t\t});\n\n\t\t\t\t\t//Indent the title\n\t\t\t\t\tvar indentedTitle = indents.join('-') + ' ' + field.title;\n\n\t\t\t\t\tif (isArray) {\n\t\t\t\t\t\t//Add (Multiple to the end of the title)\n\t\t\t\t\t\tindentedTitle = indentedTitle + ' (Multiple)';\n\t\t\t\t\t}\n\n\t\t\t\t\t/////////////////////////////////////////////////\n\n\t\t\t\t\t//And it has options\n\t\t\t\t\tif (field.options && field.options.length) {\n\t\t\t\t\t\tfirstTen = field.options.slice(0, cutOff);\n\t\t\t\t\t} else if (field.allowedValues && field.allowedValues.length) {\n\t\t\t\t\t\tfirstTen = _.map(field.allowedValues.slice(0, cutOff), function(entry) {\n\t\t\t\t\t\t\tif (entry) {\n\t\t\t\t\t\t\t\treturn {\n\t\t\t\t\t\t\t\t\tname: entry,\n\t\t\t\t\t\t\t\t\tvalue: entry\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t});\n\t\t\t\t\t} else if (field.defaultValues && field.defaultValues.length) {\n\t\t\t\t\t\tfirstTen = _.map(field.defaultValues.slice(0, cutOff), function(entry) {\n\t\t\t\t\t\t\tif (entry) {\n\t\t\t\t\t\t\t\treturn {\n\t\t\t\t\t\t\t\t\tname: entry,\n\t\t\t\t\t\t\t\t\tvalue: entry\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t});\n\t\t\t\t\t}\n\n\t\t\t\t\tvar delimiter = '[' + indexIterator + ']';\n\t\t\t\t\tvar delimiterIndex = fieldPath.lastIndexOf(delimiter);\n\n\t\t\t\t\t//Check if this field is a child of a lower level multi group\n\t\t\t\t\tif (delimiterIndex != -1) {\n\t\t\t\t\t\tvar parentPath = fieldPath.slice(0, delimiterIndex);\n\t\t\t\t\t\tvar childPath = fieldPath.slice(delimiterIndex + delimiter.length + 1);\n\t\t\t\t\t}\n\n\t\t\t\t\t/////////////////////////////////////////////////\n\n\t\t\t\t\treturn {\n\t\t\t\t\t\ttitle: field.title,\n\t\t\t\t\t\tindentedTitle: indentedTitle,\n\t\t\t\t\t\tkey: field.key,\n\t\t\t\t\t\tparentTitle: field.titles[field.titles.length - 2],\n\t\t\t\t\t\tparentPath: parentPath,\n\t\t\t\t\t\tchildPath: childPath,\n\t\t\t\t\t\tpath: fieldPath,\n\t\t\t\t\t\ttype: field.type,\n\t\t\t\t\t\tisArray: isArray,\n\t\t\t\t\t\ttitles: field.titles.join(' > '),\n\t\t\t\t\t\toptions: field.options,\n\t\t\t\t\t\tfirstTen: firstTen,\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t\t/////////////////////////////////////////////////\n\n\n\t\t\t\tfunction addExamples(field) {\n\n\t\t\t\t\tvar exampleValue;\n\t\t\t\t\tvar exampleTitle;\n\t\t\t\t\tvar fieldPath = field.path;\n\t\t\t\t\tvar firstTen = field.firstTen;\n\t\t\t\t\tvar isArray = field.isArray;\n\n\t\t\t\t\t/////////////////////////////////////////////////////////////\n\n\t\t\t\t\tvar minimum = field.minimum;\n\t\t\t\t\tvar maximum = field.maximum || field.firstTen.length || 5;\n\n\t\t\t\t\t/////////////////////////////////////////////////\n\n\t\t\t\t\tswitch (field.type) {\n\t\t\t\t\t\tcase 'integer':\n\t\t\t\t\t\t\texampleTitle =\n\t\t\t\t\t\t\t\texampleValue = 12;\n\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\tcase 'float':\n\t\t\t\t\t\t\texampleTitle =\n\t\t\t\t\t\t\t\texampleValue = 3.56;\n\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\tcase 'number':\n\t\t\t\t\t\t\texampleTitle =\n\t\t\t\t\t\t\t\texampleValue = 15;\n\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\tcase 'boolean':\n\t\t\t\t\t\t\texampleTitle =\n\t\t\t\t\t\t\t\texampleValue = 'true';\n\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\tcase 'email':\n\t\t\t\t\t\t\texampleTitle =\n\t\t\t\t\t\t\t\texampleValue = \"'example@fluro.io'\";\n\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\tcase 'url':\n\t\t\t\t\t\t\texampleTitle =\n\t\t\t\t\t\t\t\texampleValue = \"'https://www.fluro.io'\";\n\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\tcase 'date':\n\t\t\t\t\t\t\texampleTitle = 'Date';\n\t\t\t\t\t\t\texampleValue = new Date().getTime();\n\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\tcase 'string':\n\t\t\t\t\t\t\tif (isArray) {\n\n\t\t\t\t\t\t\t\tif (firstTen.length) {\n\t\t\t\t\t\t\t\t\texampleTitle =\n\t\t\t\t\t\t\t\t\t\texampleValue = '[' + _.chain(firstTen.slice(0, (maximum || 3)))\n\t\t\t\t\t\t\t\t\t\t.compact()\n\t\t\t\t\t\t\t\t\t\t.map(function(entry) {\n\t\t\t\t\t\t\t\t\t\t\treturn '\"' + entry.value + '\"'\n\t\t\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t\t\t.value()\n\t\t\t\t\t\t\t\t\t\t.join(', ') + ']';\n\n\t\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\t\texampleTitle =\n\t\t\t\t\t\t\t\t\t\texampleValue = \"['Michael', 'Susan', 'Jerry']\";\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\tif (firstTen.length) {\n\t\t\t\t\t\t\t\t\texampleTitle = _.first(firstTen).name;\n\t\t\t\t\t\t\t\t\texampleValue = \"'\" + _.first(firstTen).value + \"'\";\n\t\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\t\texampleTitle =\n\t\t\t\t\t\t\t\t\t\texampleValue = \"'Michael'\";\n\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\tcase 'reference':\n\t\t\t\t\t\t\tif (isArray) {\n\t\t\t\t\t\t\t\texampleTitle =\n\t\t\t\t\t\t\t\t\texampleValue = '[Object, Object, Object]';\n\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\texampleTitle =\n\t\t\t\t\t\t\t\t\texampleValue = '(Object)';\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tbreak;\n\n\t\t\t\t\t}\n\n\t\t\t\t\t/////////////////////////////////////////////////////////////\n\n\n\t\t\t\t\tvar examples = [];\n\n\t\t\t\t\t/////////////////////////////////////////////////////////////\n\n\t\t\t\t\t//Check if this field is a child of a lower level multi group\n\t\t\t\t\tif (field.childPath) {\n\n\t\t\t\t\t\tif (!firstTen.length) {\n\t\t\t\t\t\t\texamples.push({\n\t\t\t\t\t\t\t\tpath: \"matchInArray(data.\" + field.parentPath + \", '\" + field.childPath + \"', \" + exampleValue + \").length\",\n\t\t\t\t\t\t\t\tdescription: 'Returns the total number of  \\'' + field.parentTitle + '\\' values where \\'' + field.title + '\\' is equal to \\'' + exampleTitle + '\\'',\n\t\t\t\t\t\t\t})\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\tif (isArray) {\n\t\t\t\t\t\t\texamples.push({\n\t\t\t\t\t\t\t\tpath: \"matchInArray(data.\" + field.parentPath + \", '\" + field.childPath + \".length', 3).length\",\n\t\t\t\t\t\t\t\tdescription: 'Returns the total number of  \\'' + field.parentTitle + '\\' values where \\'' + field.title + '\\' has selected exactly 3 values',\n\t\t\t\t\t\t\t})\n\n\t\t\t\t\t\t\texamples.push({\n\t\t\t\t\t\t\t\tpath: \"matchInArray(data.\" + field.parentPath + \", '\" + field.childPath + \".length', 3, '>=').length\",\n\t\t\t\t\t\t\t\tdescription: 'Returns the total number of  \\'' + field.parentTitle + '\\' values where \\'' + field.title + '\\' has selected at least 3 values',\n\t\t\t\t\t\t\t})\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\t_.each(firstTen, function(entry) {\n\n\t\t\t\t\t\t\tif (isArray) {\n\t\t\t\t\t\t\t\texamples.push({\n\t\t\t\t\t\t\t\t\tpath: \"matchInArray(data.\" + field.parentPath + \", '\" + field.childPath + \"', '\" + entry.value + \"', 'in').length\",\n\t\t\t\t\t\t\t\t\tdescription: 'Returns the total number of  \\'' + field.parentTitle + '\\' values where \\'' + field.title + '\\' has \\'' + entry.name + '\\' selected as one of it\\'s values',\n\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\texamples.push({\n\t\t\t\t\t\t\t\t\tpath: \"matchInArray(data.\" + field.parentPath + \", '\" + field.childPath + \"', '\" + entry.value + \"').length\",\n\t\t\t\t\t\t\t\t\tdescription: 'Returns the total number of  \\'' + field.parentTitle + '\\' values where \\'' + field.title + '\\' is equal to \\'' + entry.name + '\\'',\n\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t})\n\n\t\t\t\t\t} else {\n\n\n\n\t\t\t\t\t\t/////////////////////////////////////////////////////////////\n\n\t\t\t\t\t\tif (field.isArray) {\n\n\t\t\t\t\t\t examples.push({\n\t\t\t\t\t\t\tpath: 'data.' + fieldPath + '',\n\t\t\t\t\t\t\tdescription: `The literal value of '${field.title}' eg.['${exampleValue}']`,\n\t\t\t\t\t\t})\n\n\n\t\t\t\t\t\t\texamples.push({\n\t\t\t\t\t\t\t\tpath: 'data.' + fieldPath + '.length',\n\t\t\t\t\t\t\t\tdescription: 'The number of \\'' + field.title + '\\' values',\n\t\t\t\t\t\t\t})\n\n\t\t\t\t\t\t\texamples.push({\n\t\t\t\t\t\t\t\tpath: 'data.' + fieldPath + '.length > 4',\n\t\t\t\t\t\t\t\tdescription: 'Returns true if the number of \\'' + field.title + '\\' values is greater than 4',\n\t\t\t\t\t\t\t})\n\n\t\t\t\t\t\t\t//Get the first 10 possible options\n\t\t\t\t\t\t\t_.each(firstTen, function(option) {\n\t\t\t\t\t\t\t\texamples.push({\n\t\t\t\t\t\t\t\t\tpath: 'data.' + fieldPath + '.includes(\\'' + option.value + '\\')',\n\t\t\t\t\t\t\t\t\tdescription: 'Returns true if  \\'' + option.name + '\\' is included in the selection',\n\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t})\n\n\t\t\t\t\t\t} else {\n\n\t\t\t\t\t\t\texamples.push({\n\t\t\t\t\t\t\t\tpath: 'data.' + fieldPath + '',\n\t\t\t\t\t\t\tdescription: `The literal value of '${field.title}' eg. '${exampleValue}'`,\n\t\t\t\t\t\t\t})\n\n\n\t\t\t\t\t\t\t//Get the first 10 possible options\n\t\t\t\t\t\t\t_.each(firstTen, function(option) {\n\t\t\t\t\t\t\t\texamples.push({\n\t\t\t\t\t\t\t\t\tpath: 'data.' + fieldPath + ' == \\'' + option.value + '\\'',\n\t\t\t\t\t\t\t\t\tdescription: 'Returns true if  \\'' + option.name + '\\' has been selected',\n\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t})\n\n\n\t\t\t\t\t\t\tswitch (field.type) {\n\t\t\t\t\t\t\t\tcase 'boolean':\n\t\t\t\t\t\t\t\t\texamples.push({\n\t\t\t\t\t\t\t\t\t\tpath: 'data.' + fieldPath + ' == ' + exampleValue,\n\t\t\t\t\t\t\t\t\t\tdescription: 'If \\'' + field.title + '\\' is equal to ' + exampleValue,\n\t\t\t\t\t\t\t\t\t})\n\n\t\t\t\t\t\t\t\t\texamples.push({\n\t\t\t\t\t\t\t\t\t\tpath: 'data.' + fieldPath + ' != ' + exampleValue,\n\t\t\t\t\t\t\t\t\t\tdescription: 'If \\'' + field.title + '\\' is not equal to ' + exampleValue,\n\t\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t\tbreak;\n\n\t\t\t\t\t\t\t\tcase 'string':\n\n\t\t\t\t\t\t\t\t\tif (!firstTen.length) {\n\t\t\t\t\t\t\t\t\t\texamples.push({\n\t\t\t\t\t\t\t\t\t\t\tpath: 'data.' + fieldPath + ' == ' + exampleValue,\n\t\t\t\t\t\t\t\t\t\t\tdescription: 'If \\'' + field.title + '\\' is equal to ' + exampleValue,\n\t\t\t\t\t\t\t\t\t\t})\n\n\t\t\t\t\t\t\t\t\t\texamples.push({\n\t\t\t\t\t\t\t\t\t\t\tpath: 'data.' + fieldPath + ' && data.' + fieldPath + '.toUpperCase() == ' + String(exampleValue).toUpperCase(),\n\t\t\t\t\t\t\t\t\t\t\tdescription: 'If \\'' + field.title + '\\' converted to uppercase is equal to ' + String(exampleValue).toUpperCase(),\n\t\t\t\t\t\t\t\t\t\t})\n\n\t\t\t\t\t\t\t\t\t\tif (field.directive == 'wysiwyg' || field.directive == 'textarea') {\n\t\t\t\t\t\t\t\t\t\t\texamples.push({\n\t\t\t\t\t\t\t\t\t\t\t\tpath: 'data.' + fieldPath + '.length > 200',\n\t\t\t\t\t\t\t\t\t\t\t\tdescription: 'If text is more than 200 letters',\n\t\t\t\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t\t\tcase 'number':\n\t\t\t\t\t\t\t\tcase 'integer':\n\t\t\t\t\t\t\t\tcase 'float':\n\t\t\t\t\t\t\t\t\texamples.push({\n\t\t\t\t\t\t\t\t\t\tpath: 'data.' + fieldPath + ' == ' + exampleValue,\n\t\t\t\t\t\t\t\t\t\tdescription: 'If \\'' + field.title + '\\' is equal to ' + exampleValue,\n\t\t\t\t\t\t\t\t\t})\n\n\t\t\t\t\t\t\t\t\texamples.push({\n\t\t\t\t\t\t\t\t\t\tpath: 'data.' + fieldPath + ' != ' + exampleValue,\n\t\t\t\t\t\t\t\t\t\tdescription: 'If \\'' + field.title + '\\' is not equal to ' + exampleValue,\n\t\t\t\t\t\t\t\t\t})\n\n\t\t\t\t\t\t\t\t\texamples.push({\n\t\t\t\t\t\t\t\t\t\tpath: 'data.' + fieldPath + ' > ' + exampleValue,\n\t\t\t\t\t\t\t\t\t\tdescription: 'If \\'' + field.title + '\\' is greater than ' + exampleValue,\n\t\t\t\t\t\t\t\t\t})\n\n\t\t\t\t\t\t\t\t\texamples.push({\n\t\t\t\t\t\t\t\t\t\tpath: 'data.' + fieldPath + ' >= ' + exampleValue,\n\t\t\t\t\t\t\t\t\t\tdescription: 'If \\'' + field.title + '\\' is greater than or equal to ' + exampleValue,\n\t\t\t\t\t\t\t\t\t})\n\n\t\t\t\t\t\t\t\t\texamples.push({\n\t\t\t\t\t\t\t\t\t\tpath: 'data.' + fieldPath + ' < ' + exampleValue,\n\t\t\t\t\t\t\t\t\t\tdescription: 'If \\'' + field.title + '\\' is less than ' + exampleValue,\n\t\t\t\t\t\t\t\t\t})\n\n\t\t\t\t\t\t\t\t\texamples.push({\n\t\t\t\t\t\t\t\t\t\tpath: 'data.' + fieldPath + ' <= ' + exampleValue,\n\t\t\t\t\t\t\t\t\t\tdescription: 'If \\'' + field.title + '\\' is less than or equal to ' + exampleValue,\n\t\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\n\t\t\t\t\t}\n\n\t\t\t\t\t/////////////////////////////////////////////////////////////\n\n\t\t\t\t\tfield.examples = examples;\n\t\t\t\t\tfield.exampleValue = exampleValue;\n\n\t\t\t\t\t/////////////////////////////////////////////////////////////\n\n\t\t\t\t\treturn field;\n\t\t\t\t}\n\n\t\t\t}\n\n\n\n\t\t\treturn extractFieldsFromDefinitionFields(self.form.fields, '0', true);\n\t\t},\n\n\t\tmodifierDescription() {\n\t\t\tswitch (this.model.operation) {\n\t\t\t\tcase 'add':\n\t\t\t\t\treturn 'The value returned will be added to the calculated total';\n\t\t\t\t\tbreak;\n\t\t\t\tcase 'subtract':\n\t\t\t\t\treturn 'The value returned will be subtracted from the calculated total';\n\t\t\t\t\tbreak;\n\t\t\t\tcase 'multiply':\n\t\t\t\t\treturn 'The calculated total will be multipled by the value returned';\n\t\t\t\t\tbreak;\n\t\t\t\tcase 'divide':\n\t\t\t\t\treturn 'The calculated total will be divided by the value returned';\n\t\t\t\t\tbreak;\n\t\t\t\tcase 'set':\n\t\t\t\t\treturn 'The calculated total will be set to match the value returned';\n\t\t\t\t\tbreak;\n\t\t\t}\n\t\t},\n\t\toperators() {\n\n\t\t\tvar array = [];\n\n\t\t\tarray.push({\n\t\t\t\tvalue: 'add',\n\t\t\t\ttext: 'Add'\n\t\t\t})\n\n\t\t\tarray.push({\n\t\t\t\tvalue: 'subtract',\n\t\t\t\ttext: 'Subtract'\n\t\t\t})\n\n\t\t\tarray.push({\n\t\t\t\tvalue: 'multiply',\n\t\t\t\ttext: 'Multiply'\n\t\t\t})\n\n\t\t\tarray.push({\n\t\t\t\tvalue: 'divide',\n\t\t\t\ttext: 'Divide'\n\t\t\t})\n\n\t\t\tarray.push({\n\t\t\t\tvalue: 'set',\n\t\t\t\ttext: 'Set to'\n\t\t\t})\n\n\t\t\treturn array;\n\n\n\t\t},\n\t\tmodel() {\n\t\t\treturn this.options.item;\n\t\t}\n\t},\n\tmethods: {\n\t\tdone() {\n\t\t\tthis.close(this.model);\n\t\t}\n\t},\n\tmixins: [FluroModalMixin],\n}\n\n</script>\n<style lang=\"scss\">\n\n/**/\r\n\r\n$primary: #2ad4b9;//#0bd6be;\r\n$success: #4cc650; //#4cc673;//\r\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\r\n$danger: #d93e63;\r\n$secondary: #0bd6cd; //#0bd6a3;\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n\r\n.border-top {\r\n    border-top: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-right {\r\n    border-right: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-bottom {\r\n    border-bottom: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-left {\r\n    border-left: 1px solid rgba(#000, 0.05);\r\n}\r\n//////////////////////////////////////////\r\n\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n/**/\n.help {\n\tbackground: #eee;\n\tborder-left: 1px solid rgba(#000, 0.05);\n}\n\n</style>\n","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.help {\n  background: #eee;\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/*# sourceMappingURL=PaymentModifierModal.vue.map */"]}, media: undefined });

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
  components: {
    // draggable,
    draggable,
    PaymentModifierItem: __vue_component__
  },
  props: {
    value: {
      type: Array,
      required: true,

      default() {
        return [];
      }

    },
    form: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      model: this.value,
      drag: false,
      dragOptions: {}
    };
  },

  methods: {
    sorted() {
      var self = this;
      self.$emit('input', self.model);
    },

    duplicate(modifier) {
      var self = this;
      var copy = JSON.parse(JSON.stringify(modifier));

      var getCurrentIndex = _.indexOf(self.model, modifier);

      var insertIndex = getCurrentIndex;
      self.model.splice(insertIndex, 0, copy);
      self.edit(copy, true); // console.log('Push copy!')

      self.$emit('input', self.model);
    },

    remove(modifier) {
      var self = this;
      console.log('REMOVE', modifier);
      var index = this.model.indexOf(modifier);
      this.model.splice(index, 1);
      self.$emit('input', self.model);
    },

    edit(item, cancelEnabled) {
      var self = this;
      var promise = self.$fluro.modal({
        component: __vue_component__$2,
        options: {
          item,
          form: self.form,
          cancelEnabled
        }
      }).catch(function (err) {
        self.remove(item);
      });
    },

    add() {
      var self = this;
      var insert = {};
      self.model.push(insert);
      self.edit(insert, true);
      self.$emit('input', self.model);
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
    { staticClass: "payment-modifier-editor" },
    [
      _c(
        "list-group",
        [
          _c(
            "draggable",
            _vm._b(
              {
                on: {
                  sort: _vm.sorted,
                  start: function($event) {
                    _vm.drag = true;
                  },
                  end: function($event) {
                    _vm.drag = false;
                  }
                },
                model: {
                  value: _vm.model,
                  callback: function($$v) {
                    _vm.model = $$v;
                  },
                  expression: "model"
                }
              },
              "draggable",
              _vm.dragOptions,
              false
            ),
            _vm._l(_vm.model, function(modifier, index) {
              return _c("payment-modifier-item", {
                attrs: { form: _vm.form },
                on: {
                  remove: _vm.remove,
                  duplicate: _vm.duplicate,
                  edit: _vm.edit
                },
                model: {
                  value: _vm.model[index],
                  callback: function($$v) {
                    _vm.$set(_vm.model, index, $$v);
                  },
                  expression: "model[index]"
                }
              })
            }),
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-btn",
        {
          staticClass: "ma-0",
          attrs: { color: "primary" },
          on: {
            click: function($event) {
              return _vm.add()
            }
          }
        },
        [
          _vm._v("\n        Add Payment Modifier\n        "),
          _c("fluro-icon", { attrs: { icon: "plus", right: "" } })
        ],
        1
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

  /* style */
  const __vue_inject_styles__$3 = function (inject) {
    if (!inject) return
    inject("data-v-9b9a1cf2_0", { source: "/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n\n/*# sourceMappingURL=PaymentModifierEditor.vue.map */", map: {"version":3,"sources":["C:\\Users\\User\\Documents\\fluro\\fluro-vue-ui\\src\\components\\content\\edit\\components\\PaymentModifierEditor.vue","PaymentModifierEditor.vue"],"names":[],"mappings":"AAiGA,GAAA;AAYA;EACA,yCAAA;AC3GA;AD8GA;EACA,2CAAA;AC3GA;AD8GA;EACA,4CAAA;AC3GA;AD8GA;EACA,0CAAA;AC3GA;;ADmHA,GAAA;;AC/GA,oDAAoD","file":"PaymentModifierEditor.vue","sourcesContent":["<template>\n    <div class=\"payment-modifier-editor\">\n        <list-group>\n            <draggable v-model=\"model\" v-bind=\"dragOptions\" @sort=\"sorted\" @start=\"drag=true\" @end=\"drag=false\">\n                <payment-modifier-item :form=\"form\" @remove=\"remove\" @duplicate=\"duplicate\" @edit=\"edit\" v-model=\"model[index]\" v-for=\"(modifier, index) in model\"/>\n            </draggable>\n        </list-group>\n        <v-btn class=\"ma-0\" color=\"primary\" @click=\"add()\">\n            Add Payment Modifier\n            <fluro-icon icon=\"plus\" right />\n        </v-btn>\n    </div>\n</template>\n<script>\nimport draggable from 'vuedraggable'\nimport PaymentModifierItem from 'src/components/content/edit/components/PaymentModifierItem.vue';\nimport PaymentModifierModal from 'src/components/content/edit/components/PaymentModifierModal.vue';\n\nexport default {\n    components: {\n        // draggable,\n        draggable,\n        PaymentModifierItem,\n    },\n    props: {\n        value: {\n            type: Array,\n            required: true,\n            default() {\n                return [];\n            },\n        },\n        form: {\n            type: Object,\n            required: true,\n        },\n    },\n    data() {\n        return {\n            model: this.value,\n            drag: false,\n            dragOptions: {\n\n            }\n        }\n    },\n    methods: {\n        sorted() {\n            var self = this;\n            self.$emit('input', self.model)\n        },\n        duplicate(modifier) {\n\n        \tvar self = this;\n\n        \tvar copy = JSON.parse(JSON.stringify(modifier));\n        \tvar getCurrentIndex = _.indexOf(self.model, modifier);\n        \tvar insertIndex = getCurrentIndex;\n        \tself.model.splice(insertIndex, 0, copy);\n        \tself.edit(copy, true);\n\n        \t// console.log('Push copy!')\n            self.$emit('input', self.model);\n        },\n        remove(modifier) {\n        \tvar self = this;\n            console.log('REMOVE', modifier);\n            var index = this.model.indexOf(modifier);\n            this.model.splice(index, 1)\n            self.$emit('input', self.model);\n        },\n        edit(item, cancelEnabled) {\n        \tvar self = this;\n            var promise = self.$fluro.modal({\n                component: PaymentModifierModal,\n                options: {\n                    item,\n                    form:self.form,\n                    cancelEnabled,\n                }\n            })\n            .catch(function(err) {\n            \tself.remove(item);\n            });\n        },\n        add() {\n        \tvar self = this;\n        \tvar insert = {};\n        \tself.model.push(insert);\n        \tself.edit(insert, true);\n            self.$emit('input', self.model);\n        },\n    },\n}\n</script>\n<style lang=\"scss\">\n\n/**/\r\n\r\n$primary: #2ad4b9;//#0bd6be;\r\n$success: #4cc650; //#4cc673;//\r\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\r\n$danger: #d93e63;\r\n$secondary: #0bd6cd; //#0bd6a3;\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n\r\n.border-top {\r\n    border-top: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-right {\r\n    border-right: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-bottom {\r\n    border-bottom: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-left {\r\n    border-left: 1px solid rgba(#000, 0.05);\r\n}\r\n//////////////////////////////////////////\r\n\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n/**/\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n\n/*# sourceMappingURL=PaymentModifierEditor.vue.map */"]}, media: undefined });

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
      type: Object
    }
  },

  data() {
    return {
      model: this.value
    };
  },

  methods: {},
  components: {
    FluroContentFormField
  },
  computed: {
    fields() {
      var fields = {};
      fields.title = {
        title: 'Title',
        key: 'title',
        minimum: 0,
        maximum: 1,
        type: 'string'
      };
      fields.key = {
        title: 'Key',
        key: 'key',
        minimum: 0,
        maximum: 1,
        type: 'string'
      };
      fields.renderer = {
        title: 'Renderer',
        key: 'renderer',
        minimum: 0,
        maximum: 1,
        type: 'string'
      };
      return fields;
    }

  },
  watch: {
    value(v) {
      if (this.model != v) {
        this.model = v;
      }
    },

    model(v) {
      this.$emit('input', v);
    }

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
      _c(
        "v-layout",
        [
          _c(
            "v-flex",
            [
              _c("fluro-content-form-field", {
                attrs: { field: _vm.fields.title },
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
            [
              _c("fluro-content-form-field", {
                attrs: { field: _vm.fields.key },
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
            [
              _c("fluro-content-form-field", {
                attrs: { field: _vm.fields.type },
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
            { attrs: { shrink: "" } },
            [
              _c(
                "v-btn",
                {
                  attrs: { icon: "" },
                  on: {
                    click: function($event) {
                      return _vm.$emit("remove")
                    }
                  }
                },
                [_c("fluro-icon", { attrs: { icon: "trash-alt" } })],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v("\n\tItem\n")
    ],
    1
  )
};
var __vue_staticRenderFns__$4 = [];
__vue_render__$4._withStripped = true;

  /* style */
  const __vue_inject_styles__$4 = function (inject) {
    if (!inject) return
    inject("data-v-5481a715_0", { source: "/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n\n/*# sourceMappingURL=FluroColumnSelectItem.vue.map */", map: {"version":3,"sources":["C:\\Users\\User\\Documents\\fluro\\fluro-vue-ui\\src\\components\\content\\edit\\components\\FluroColumnSelectItem.vue","FluroColumnSelectItem.vue"],"names":[],"mappings":"AA+FA,GAAA;AAYA;EACA,yCAAA;ACzGA;AD4GA;EACA,2CAAA;ACzGA;AD4GA;EACA,4CAAA;ACzGA;AD4GA;EACA,0CAAA;ACzGA;;ADiHA,GAAA;;AC7GA,oDAAoD","file":"FluroColumnSelectItem.vue","sourcesContent":["<template>\n\t<div>\n\t\t<v-layout>\n\t\t\t<v-flex>\n\t\t\t\t<fluro-content-form-field :field=\"fields.title\" v-model=\"model\" />\n\t\t\t</v-flex>\n\t\t\t<v-flex>\n\t\t\t\t<fluro-content-form-field :field=\"fields.key\" v-model=\"model\" />\n\t\t\t</v-flex>\n\t\t\t<v-flex>\n\t\t\t\t<fluro-content-form-field :field=\"fields.type\" v-model=\"model\" />\n\t\t\t</v-flex>\n\t\t\t<v-flex shrink>\n\t\t\t\t<v-btn @click=\"$emit('remove')\" icon>\n\t\t\t\t\t<fluro-icon icon=\"trash-alt\" />\n\t\t\t\t</v-btn>\n\t\t\t</v-flex>\n\t\t</v-layout>\n\t\tItem\n\t</div>\n</template>\n<script>\nimport FluroContentFormField from 'src/components/form/FluroContentFormField.vue';\n\nexport default {\n\tprops: {\n\t\tvalue: {\n\t\t\ttype: Object,\n\t\t}\n\t},\n\tdata() {\n\t\treturn {\n\t\t\tmodel: this.value,\n\t\t}\n\t},\n\tmethods: {},\n\tcomponents: {\n\t\tFluroContentFormField,\n\t},\n\tcomputed: {\n\t\tfields() {\n\n\t\t\tvar self = this;\n\n\n\t\t\tvar fields = {};\n\n\n\t\t\tfields.title = {\n\t\t\t\ttitle: 'Title',\n\t\t\t\tkey: 'title',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'string',\n\t\t\t}\n\n\t\t\tfields.key = {\n\t\t\t\ttitle: 'Key',\n\t\t\t\tkey: 'key',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'string',\n\t\t\t}\n\n\t\t\tfields.renderer = {\n\t\t\t\ttitle: 'Renderer',\n\t\t\t\tkey: 'renderer',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'string',\n\t\t\t}\n\n\n\n\n\n\t\t\treturn fields;\n\t\t}\n\t},\n\twatch: {\n\t\tvalue(v) {\n\t\t\tif (this.model != v) {\n\t\t\t\tthis.model = v;\n\t\t\t}\n\t\t},\n\t\tmodel(v) {\n\t\t\tthis.$emit('input', v);\n\t\t}\n\t},\n\n}\n\n</script>\n<style lang=\"scss\">\n\n/**/\r\n\r\n$primary: #2ad4b9;//#0bd6be;\r\n$success: #4cc650; //#4cc673;//\r\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\r\n$danger: #d93e63;\r\n$secondary: #0bd6cd; //#0bd6a3;\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n\r\n.border-top {\r\n    border-top: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-right {\r\n    border-right: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-bottom {\r\n    border-bottom: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-left {\r\n    border-left: 1px solid rgba(#000, 0.05);\r\n}\r\n//////////////////////////////////////////\r\n\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n/**/\n</style>\n","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n\n/*# sourceMappingURL=FluroColumnSelectItem.vue.map */"]}, media: undefined });

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
  props: {
    value: {
      type: Array,

      default() {
        return [];
      }

    }
  },

  data() {
    return {
      model: this.value
    };
  },

  components: {
    FluroColumnSelectItem: __vue_component__$4
  },
  methods: {
    add() {
      this.model.push({});
    }

  },
  computed: {},
  watch: {
    value(v) {
      if (v != this.model) {
        this.model = v;
      }
    },

    model(v) {
      this.$emit('input', v);
    }

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
    "fluro-panel",
    [
      _vm._l(_vm.model, function(column, index) {
        return _c(
          "fluro-panel-body",
          { key: index, staticClass: "border-bottom" },
          [
            _c("fluro-column-select-item", {
              model: {
                value: _vm.model[index],
                callback: function($$v) {
                  _vm.$set(_vm.model, index, $$v);
                },
                expression: "model[index]"
              }
            })
          ],
          1
        )
      }),
      _vm._v(" "),
      _c(
        "fluro-panel-body",
        [
          _c(
            "v-btn",
            {
              on: {
                click: function($event) {
                  return _vm.add()
                }
              }
            },
            [_vm._v("Add item")]
          )
        ],
        1
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
    inject("data-v-7ed1573a_0", { source: "/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n\n/*# sourceMappingURL=FluroColumnSelect.vue.map */", map: {"version":3,"sources":["C:\\Users\\User\\Documents\\fluro\\fluro-vue-ui\\src\\components\\content\\edit\\components\\FluroColumnSelect.vue","FluroColumnSelect.vue"],"names":[],"mappings":"AAqDA,GAAA;AAYA;EACA,yCAAA;AC/DA;ADkEA;EACA,2CAAA;AC/DA;ADkEA;EACA,4CAAA;AC/DA;ADkEA;EACA,0CAAA;AC/DA;;ADuEA,GAAA;;ACnEA,gDAAgD","file":"FluroColumnSelect.vue","sourcesContent":["<template>\n\t<fluro-panel >\n\t\t<fluro-panel-body class=\"border-bottom\" :key=\"index\" v-for=\"(column, index) in model\">\n\t\t\t<fluro-column-select-item v-model=\"model[index]\" />\n\t\t</fluro-panel-body>\n\t\t<fluro-panel-body>\n\t\t\t<v-btn @click=\"add()\">Add item</v-btn>\n\n\t\t</fluro-panel-body>\n\t</fluro-panel>\n</template>\n<script>\nimport FluroColumnSelectItem from 'src/components/content/edit/components/FluroColumnSelectItem.vue';\n\nexport default {\n\tprops: {\n\t\tvalue: {\n\t\t\ttype: Array,\n\t\t\tdefault () {\n\t\t\t\treturn [];\n\t\t\t}\n\t\t}\n\t},\n\tdata() {\n\t\treturn {\n\t\t\tmodel: this.value,\n\t\t}\n\t},\n\tcomponents: {\n\t\tFluroColumnSelectItem,\n\t},\n\tmethods: {\n\t\tadd() {\n\t\t\tthis.model.push({});\n\t\t},\n\t},\n\tcomputed: {},\n\twatch: {\n\t\tvalue(v) {\n\t\t\tif (v != this.model) {\n\t\t\t\tthis.model = v;\n\t\t\t}\n\t\t},\n\t\tmodel(v) {\n\t\t\tthis.$emit('input', v);\n\t\t}\n\t},\n\n}\n\n</script>\n<style lang=\"scss\">\n\n/**/\r\n\r\n$primary: #2ad4b9;//#0bd6be;\r\n$success: #4cc650; //#4cc673;//\r\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\r\n$danger: #d93e63;\r\n$secondary: #0bd6cd; //#0bd6a3;\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n\r\n.border-top {\r\n    border-top: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-right {\r\n    border-right: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-bottom {\r\n    border-bottom: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-left {\r\n    border-left: 1px solid rgba(#000, 0.05);\r\n}\r\n//////////////////////////////////////////\r\n\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n/**/\n</style>\n","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n\n/*# sourceMappingURL=FluroColumnSelect.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$5 = undefined;
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

//

var script$6 = {
  components: {
    FluroFieldEditor,
    FluroContentSelectButton,
    PaymentModifierEditor: __vue_component__$3,
    FluroColumnSelect: __vue_component__$5 //RosterSlotManager,
    // FluroEditor,

  },
  mixins: [FluroContentEditMixin],
  methods: {
    setParentType(parentType) {
      var self = this;

      switch (parentType) {
        case 'interaction':
          if (!self.model.privacy) {
            self.$set(self.model, 'privacy', 'public');
          }

          if (!self.model.paymentDetails) {
            self.$set(self.model, 'paymentDetails', {}); // console.log('SET THE PAYMENT DETAILS NOW!!')
          }

          if (!self.model.data) {
            self.$set(self.model, 'data', {});
          }

          if (!self.model._id) {
            //Start off with the basic fields
            self.$set(self.model.data, 'allowAnonymous', true);
          }

          if (!self.model.fields || !self.model.fields.length) {
            self.$set(self.model, 'fields', []);

            var getPersonField = _$1.find(FieldTemplates, {
              key: 'person'
            });

            var copy = JSON.parse(JSON.stringify(getPersonField.field));
            copy.key = 'contact';
            copy.title = 'Contact';
            self.model.fields.push(copy);
          }

          if (!self.model.data.publicData) {
            self.$set(self.model.data, 'publicData', {});
          }

          if (!self.model.data.publicData.paymentGateways) {
            self.$set(self.model.data.publicData, 'paymentGateways', []);
          }

          break;
      }
    },

    removeAlternativePaymentMethod(method, index) {
      var self = this; // var index = self.model.paymentDetails.paymentMethods.indexOf(method);
      // if (index != -1) {

      self.$set(method, 'enabled', false);
      self.model.paymentDetails.paymentMethods.splice(index, 1);
      setTimeout(function () {
        self.alternativePaymentMethodIndex = 0;
      }); // }
    },

    addAlternativePaymentMethod() {
      var self = this;
      var newMethod = {
        title: 'Other Method',
        key: '',
        description: ''
      };

      if (!self.model.paymentDetails.paymentMethods) {
        self.$set(self.model.paymentDetails, 'paymentMethods', []);
      }

      self.model.paymentDetails.paymentMethods.push(newMethod);
      setTimeout(function () {
        self.alternativePaymentMethodIndex = self.model.paymentDetails.paymentMethods.length - 1;
      });
    }

  },

  // watch:{
  //  'model.definitionName':function(value){
  //   // get() {
  //   //  return this.model.definitionName;
  //   // },
  //   // set(payload) {
  //    if (!value) {
  //     value = '';
  //    }
  //    var regexp = /[^a-zA-Z0-9-_]+/g;
  //    var cleaned = value.replace(regexp, '');
  //    this.$set(this.model, 'definitionName', cleaned)
  //   // },
  //  },
  // },
  created() {
    var self = this;

    if (self.lockedSubType && self.lockedSubType.length) {
      self.$set(self.model, 'parentType', self.lockedSubType);
    }

    if (self.model.parentType) {
      self.setParentType(self.model.parentType);
    }

    if (self.fieldsMakeSense) {
      if (self.model._id && !self.isForm) {
        self.tabIndex = 1;
      }
    }

    if (!self.model.fields) {
      self.$set(self.model, 'fields', []);
    }

    if (!self.model.data) {
      self.$set(self.model, 'data', {});
    }
  },

  watch: {
    'model.parentType': 'setParentType'
  },
  asyncComputed: {
    parentTypeOptions: {
      default: [],

      get() {
        var self = this;
        return new Promise(function (resolve, reject) {
          self.$fluro.types.basicTypes().then(function (values) {
            // console.log('VALUES', values);
            var cleaned = _$1.chain(values).compact().map(function (type) {
              return {
                title: type.title,
                value: type.definitionName
              };
            }).orderBy('title').value();

            resolve(cleaned);
          });
        });
      }

    },
    eventTypeOptions: {
      default: [],

      get() {
        var self = this;
        return new Promise(function (resolve, reject) {
          self.$fluro.types.subTypes('event', true).then(function (values) {
            var cleaned = _$1.chain(values).compact().map(function (type) {
              return {
                title: type.title,
                value: type.definitionName
              };
            }).orderBy('title').value();

            console.log('TYPES LOADED', cleaned, values);
            resolve(cleaned);
          });
        });
      }

    },
    referenceOptions: {
      default: [],

      get() {
        var self = this;
        return new Promise(function (resolve, reject) {
          self.$fluro.types.terms().then(function (terms) {
            /////////////////////////
            var mapped = _$1.chain(terms).values().map(function (term) {
              return {
                name: term.title,
                title: `${term.title} ${term.parentType ? term.parentType : ''}`,
                value: term.definitionName
              };
            }).orderBy('title').value(); /////////////////////////


            resolve(mapped);
          }).catch(reject);
        });
      }

    }
  },
  computed: {
    rosterFields() {
      var array = []; ///////////////////////////////

      array.push({
        title: 'Notifications',
        key: 'notifyContacts',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        description: `Select contacts who should be notified when volunteers decline/swap positions on ${this.model.plural} rosters`,
        params: {
          restrictType: 'contact',
          allDefinitions: true,
          persistentDescription: true
        } //placeholder: `Eg. 'Bank Transfer', 'Cash', 'Cheque', 'Payment Plan'...`,

      }); ///////////////////////////////

      return array;
    },

    restrictionFields() {
      var array = [];
      var self = this; ///////////////////////////////

      array.push({
        title: 'Relevant Definitions',
        key: 'rosterDefinitions',
        minimum: 0,
        maximum: 0,
        type: 'string',
        directive: 'select',
        options: self.eventTypeOptions,
        description: `Select event definitions that these rosters are relevant for. Eg. If ${this.model.plural} are only relevant for specific types of events then select them here, otherwise ${this.model.plural} will appear in the planner for events on any kind` // params: {
        //     restrictType: 'eventtrack',
        //     allDefinitions: true,
        //     persistentDescription: true,
        // },

      });
      array.push({
        title: 'Relevant Event Tracks',
        key: 'rosterEventTracks',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        description: `Select event tracks that these rosters are relevant for. Eg. If ${this.model.plural} are only relevant for specific tracks then select those tracks here, otherwise ${this.model.plural} will appear in the planner for events on any track`,
        params: {
          restrictType: 'eventtrack',
          allDefinitions: true,
          persistentDescription: true
        }
      });
      array.push({
        title: 'Relevant Realms',
        key: 'rosterRealms',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        description: `Select realms that these rosters are relevant for. Eg. If ${this.model.plural} are only relevant for realms then select those realms here`,
        params: {
          restrictType: 'realm',
          allDefinitions: true,
          persistentDescription: true
        }
      }); ///////////////////////////////

      return array;
    },

    fieldsMakeSense() {
      var self = this;

      switch (self.model.parentType) {
        case 'roster':
        case 'contact':
        case 'ticket':
          return false;
      }

      return true;
    },

    isForm() {
      return this.definition && this.definition.definitionName == 'form';
    },

    showDefinitionName() {
      return !this.model._id;
    },

    showFieldsFirst() {
      return this.model._id && this.model.definition == 'form';
    },

    paymentMethodFields() {
      return [{
        title: 'Title',
        key: 'title',
        minimum: 1,
        maximum: 1,
        type: 'string',
        description: '',
        placeholder: `Eg. 'Bank Transfer', 'Cash', 'Cheque', 'Payment Plan'...`
      }, {
        title: 'Key',
        key: 'key',
        minimum: 1,
        maximum: 1,
        type: 'string',
        description: 'A unique key for this payment method',
        placeholder: `Eg. 'bank', 'cash', 'cheque', 'plan'`
      }, {
        title: 'Help / Description',
        key: 'description',
        minimum: 1,
        maximum: 1,
        type: 'string',
        directive: 'wysiwyg',
        description: 'Write a summary of how you want people to pay you if they are using alternative methods',
        placeholder: 'Eg. Please transfer to Acc # with first name as description etc..'
      }];
    },

    alternativePaymentMethods: {
      get() {
        return this.model.paymentDetails.paymentMethods || [];
      },

      set(payload) {
        this.$set(this.model.paymentDetails, 'paymentMethods', payload);
      }

    },

    paymentIsEnabled() {
      return this.model.paymentDetails && (this.model.paymentDetails.required || this.model.paymentDetails.allow);
    },

    definitionFormOptions() {
      return {};
    },

    privacyDescription() {
      switch (this.model.privacy) {
        case 'public':
          return `Anyone can submit this interaction form without needing explicit 'submit' or 'create' permissions`;

        case 'secure':
          return `Only users and applications with the 'submit ${this.model.definitionName}' or 'create ${this.model.definitionName}' permission can submit these forms`;
      }
    },

    definitionData() {
      return this.definition ? this.definition.data : null;
    },

    lockedSubType() {
      if (this.definitionData && this.definitionData.definitionSubType) {
        return this.definitionData.definitionSubType;
      }

      return;
    },

    paymentFields() {
      var self = this;
      var array = []; ///////////////////////////////////

      addField('required', {
        title: 'Require Payment',
        minimum: 0,
        maximum: 1,
        type: 'boolean',
        description: `Require a payment for creating this content`,

        hide() {
          return self.model.paymentDetails && self.model.paymentDetails.allow;
        }

      });
      addField('allow', {
        title: 'Allow Payment',
        minimum: 0,
        maximum: 1,
        type: 'boolean',
        expressions: {
          hide() {
            return self.model.paymentDetails && self.model.paymentDetails.required;
          }

        },
        description: `Allow a payment to be made when creating this content`
      }); ////////////////////////////////////////

      var paymentDetails = self.model.paymentDetails || {}; ////////////////////////////////////////

      addField('amount', {
        title: 'Base Amount',
        minimum: 0,
        maximum: 1,
        type: 'number',
        directive: 'currency',
        params: {
          currency: paymentDetails.currency || '',
          persistentDescription: true,
          hideSuffix: true
        },
        description: `The amount required to be paid to subit this form. You can leave this as 0 and calculate the cost with payment modifiers.`
      });
      addField('allowAlternativePayments', {
        title: 'Allow payments to be made at a later time through other methods',
        minimum: 0,
        maximum: 1,
        type: 'boolean',
        description: `Checking this box will allow the user to create this content without paying the full required amount. Payments will need to be made manually via other arrangements that can be added below.`
      });
      addField('currency', {
        title: 'Currency',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'select',
        options: [{
          name: 'USD',
          value: 'usd'
        }, {
          name: 'AUD',
          value: 'aud'
        }, {
          name: 'CAD',
          value: 'cad'
        }, {
          name: 'EUR',
          value: 'eur'
        }, {
          name: 'GBP',
          value: 'gbp'
        }]
      }); ////////////////////////////////////////

      addField('minAmount', {
        title: 'Minimum Amount',
        minimum: 0,
        maximum: 1,
        type: 'number',
        params: {
          persistentDescription: true
        },
        // expressions:{
        //  transform(value) {
        //   value = Number(parseFloat(value).toFixed(2));
        //   return value * 100;
        //  }
        // },
        suffix: `(${self.$fluro.utils.formatCurrency(paymentDetails.minAmount, paymentDetails.currency)})`,
        description: `The minimum amount required for payment to create this type of content`
      });
      addField('maxAmount', {
        title: 'Maximum Amount',
        minimum: 0,
        maximum: 1,
        type: 'number',
        params: {
          persistentDescription: true
        },
        // expressions:{
        //  transform(value) {
        //   value = Number(parseFloat(value).toFixed(2));
        //   return value * 100;
        //  }
        // },
        suffix: `(${self.$fluro.utils.formatCurrency(paymentDetails.maxAmount, paymentDetails.currency)})`,
        description: `The maximum amount that can be charged when creating this type of content`
      }); ///////////////////////////////////

      function addField(key, details) {
        details.key = key;
        array.push(details);
      } // console.log('DO THE OUTPUT!!!');


      return array;
    },

    dataFields() {
      var self = this;
      var array = [];
      var defaultConfirmationCheckbox = self.model._id ? undefined : [true];
      var defaultQRCodeCheckbox = self.model._id ? undefined : [true]; ///////////////////////////////////

      addField('allowAnonymous', {
        title: 'Add default contact fields to form',
        minimum: 0,
        maximum: 1,
        type: 'boolean',
        inverse: true,
        description: `This will add the basic contact fields (First Name, Last Name, Email etc) to the top of the form and require a contact for the interaction. To do anonymous forms, customise your own field layout or do multi person forms it is recommended you turn this off`
      }); ///////////////////////////////////

      addField('disableBestGuess', {
        title: 'Attempt contact link',
        minimum: 0,
        maximum: 1,
        type: 'boolean',
        inverse: true,
        description: `Attempt to link ${self.model.title} submissions to a contact if enough data is submitted. For example, if you have a few details above that match a contact in the database, Fluro will try and create a new contact or link to an existing contact. If you want these submissions to be anonymous you want to leave this unchecked.`
      });
      addField('enableConfirmation', {
        title: 'Send Confirmation Email',
        minimum: 0,
        maximum: 1,
        type: 'boolean',
        defaultValues: defaultConfirmationCheckbox,
        description: `Send a confirmation email to the primary contact upon a new submission.`
      });
      addField('confirmationMessage', {
        title: 'Confirmation Thank You Message',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'wysiwyg',
        description: `Add a customised thank you message to be shown in the confirmation email. \n Please note that event registrations will already contain key dates, locations and directions underneath this message`
      });
      addField('includeTickets', {
        title: 'Include QR Code tickets',
        minimum: 0,
        maximum: 1,
        type: 'boolean',
        defaultValues: defaultQRCodeCheckbox,
        description: `Check this box if you want Fluro to send digital a QR for ticket collection.`
      });
      addField('enableReceipt', {
        title: 'Send Fluro Transaction Receipt',
        minimum: 0,
        maximum: 1,
        type: 'boolean',
        description: `Send a transaction receipt from Fluro.`,
        expressions: {
          hide() {
            if (!self.model.paymentDetails) {
              return true;
            }

            if (self.paymentIsEnabled) {
              return false;
            }

            return true;
          }

        }
      });
      addField('notifyContacts', {
        title: 'Send Notifications',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        params: {
          restrictType: 'contact'
        },
        description: `Send a basic notification to the following contacts when a new ${self.model.title} is submitted`
      });
      addField('interactionProcesses', {
        title: 'Add submission to processes',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        params: {
          restrictType: 'definition',
          referenceFilter: {
            operator: 'and',
            filters: [{
              key: 'parentType',
              comparator: '==',
              value: 'process'
            }]
          }
        },
        description: `Select processes that the form submission will be added into`
      });
      var contactProcessesTitle = self.model.data.contactProcessesAll ? 'Add all connected contacts to processes' : 'Add primary contact to processes'; // Add {{item.data.contactProcessesAll ? 'All Connected Contacts' : 'Primary Contact'}} to Processes

      addField('contactProcesses', {
        title: contactProcessesTitle,
        minimum: 0,
        maximum: 0,
        type: 'reference',
        params: {
          restrictType: 'definition',
          referenceFilter: {
            operator: 'and',
            filters: [{
              key: 'parentType',
              comparator: '==',
              value: 'process'
            }]
          }
        },
        description: `Select processes to add the primary (or first linked) contact to after form submission`
      });
      addField('contactProcessesAll', {
        title: ' Include all connected contacts',
        minimum: 0,
        maximum: 1,
        type: 'boolean',
        description: `Include every contact referenced in the submission`
      });
      addField('processAssignTo', {
        title: 'Assign to',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        params: {
          restrictType: 'contact',
          allDefinitions: true
        },
        description: `Assign the process card to specific contacts`
      }); /////////////////////////////////////////////////////////////
      /////////////////////////////////////////////////////////////
      /////////////////////////////////////////////////////////////

      var contactTeamsAllTitle = self.model.data.contactTeamsAll ? 'Add all connected contacts to groups/teams' : 'Add primary contact to groups/teams'; // Add {{item.data.contactTeamsAll ? 'All Connected Contacts' : 'Primary Contact'}} to Processes

      addField('contactTeams', {
        title: contactTeamsAllTitle,
        minimum: 0,
        maximum: 0,
        type: 'reference',
        params: {
          restrictType: 'team',
          allDefinitions: true
        },
        description: `Select groups/teams to add the primary (or first linked) contact to after form submission`
      });
      addField('contactTeamsAll', {
        title: ' Include all connected contacts',
        minimum: 0,
        maximum: 1,
        type: 'boolean',
        description: `Include every contact referenced in the submission`
      }); /////////////////////////////////////////////////////////////
      /////////////////////////////////////////////////////////////
      /////////////////////////////////////////////////////////////

      var capabilitiesAllTitle = self.model.data.capabilitiesAll ? 'Add capabilities to all connected contacts' : 'Add capabilities to primary contact'; // Add {{item.data.capabilitiesAll ? 'All Connected Contacts' : 'Primary Contact'}} to Processes

      addField('contactCapabilities', {
        title: capabilitiesAllTitle,
        minimum: 0,
        maximum: 0,
        type: 'reference',
        params: {
          restrictType: 'capability',
          allDefinitions: true
        },
        description: `Select groups/teams to add the primary (or first linked) contact to after form submission`
      });
      addField('capabilitiesAll', {
        title: ' Include all connected contacts',
        minimum: 0,
        maximum: 1,
        type: 'boolean',
        description: `Include every contact referenced in the submission`
      });
      addField('reactionPipelines', {
        title: 'Reaction Pipelines',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        params: {
          restrictType: 'reaction',
          allDefinitions: true
        },
        description: `Select reaction pipelines to push submissions into when they are created`
      });
      addField('blc', {
        title: 'Blacklist Country Codes',
        minimum: 0,
        maximum: 0,
        type: 'string',
        placeholder: 'Country Code eg(AU, BR, US)',
        description: `Block certain country codes from submitting this form`
      }); ///////////////////////////////////
      //  <
      //  label > Contact ID Requirement < /label> <
      //  p class = "help-block" >
      //  Every contact requires either an email address or a phone number
      // for verification. < br / >
      //  Sometimes it makes more sense to ask / require one or both of these <
      //  /p> <
      //  select ng - model = "item.data.identifier"
      // class = "form-control" >
      //  <option value="email">Require an Email Address</option> <
      //  option value = "phone" > Require a Phone Number < /option> <
      //  option value = "either" > Require either Phone Number or Email Address < /option> <
      //  option value = "both" > Require both Phone Number and Email Address < /option> <
      //  /select>

      addField('identifier', {
        title: 'Contact ID Requirement',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'select',
        description: `Every contact requires either an email address or a phone number for verification.\n
	Sometimes it makes more sense to ask/require one or both of these`,
        options: [{
          name: 'Require an Email Address',
          value: 'email'
        }, {
          name: 'Require a Phone Number',
          value: 'phone'
        }, {
          name: 'Require either Phone Number or Email Address',
          value: 'either'
        }, {
          name: 'Require both Phone Number and Email Address',
          value: 'both'
        }]
      }); ///////////////////////////////////

      addField('askLastName', {
        title: 'Ask',
        minimum: 0,
        maximum: 1,
        type: 'boolean'
      });
      addField('requireLastName', {
        title: 'Require',
        minimum: 0,
        maximum: 1,
        type: 'boolean'
      }); ///////////////////////////////////

      addField('askFirstName', {
        title: 'Ask',
        minimum: 0,
        maximum: 1,
        type: 'boolean'
      });
      addField('requireFirstName', {
        title: 'Require',
        minimum: 0,
        maximum: 1,
        type: 'boolean'
      }); ///////////////////////////////////

      addField('askEmail', {
        title: 'Ask',
        minimum: 0,
        maximum: 1,
        type: 'boolean'
      });
      addField('requireEmail', {
        title: 'Require',
        minimum: 0,
        maximum: 1,
        type: 'boolean'
      }); ///////////////////////////////////

      addField('askPhone', {
        title: 'Ask',
        minimum: 0,
        maximum: 1,
        type: 'boolean'
      });
      addField('requirePhone', {
        title: 'Require',
        minimum: 0,
        maximum: 1,
        type: 'boolean'
      }); ///////////////////////////////////

      addField('askGender', {
        title: 'Ask',
        minimum: 0,
        maximum: 1,
        type: 'boolean'
      });
      addField('requireGender', {
        title: 'Require',
        minimum: 0,
        maximum: 1,
        type: 'boolean'
      }); ///////////////////////////////////

      addField('askDOB', {
        title: 'Ask',
        minimum: 0,
        maximum: 1,
        type: 'boolean'
      });
      addField('requireDOB', {
        title: 'Require',
        minimum: 0,
        maximum: 1,
        type: 'boolean'
      }); ///////////////////////////////////

      function addField(key, details) {
        details.key = key;
        array.push(details);
      } // console.log('DO THE OUTPUT!!!');


      return array;
    },

    processFields() {
      var self = this;
      var array = []; ///////////////////////////////////

      array.push({
        title: 'Types that can be processed',
        minimum: 0,
        maximum: 0,
        key: 'processTypes',
        type: 'string',
        directive: 'select',
        options: self.referenceOptions,
        params: {
          persistentDescription: true
        },
        description: `Restrict what kind of content types can be referenced and added to this process`
      }); // addField('referenceType', {
      //  key: 'restrictType',
      //  title: 'Reference Type',
      //  description: 'Restrict what kind of items can be referenced in this field',
      //  minimum: 0,
      //  maximum: 1,
      //  type: 'string',
      //  directive: 'select',
      //  options: self.referenceOptions,
      // })
      ///////////////////////////////////

      array.push({
        title: 'Mode',
        minimum: 0,
        maximum: 1,
        key: 'mode',
        type: 'string',
        directive: 'select',
        options: [{
          title: 'Linear Progression',
          value: ''
        }, {
          title: 'Kanban / Lanes',
          value: 'lanes'
        }],
        params: {
          persistentDescription: true
        }
      }); ///////////////////////////////////

      array.push({
        title: 'Disable Drag and Drop',
        minimum: 0,
        maximum: 1,
        key: 'dragLocked',
        type: 'boolean',
        description: 'Lock drag and drop functionality so that cards can not be dragged into other columns',
        params: {
          persistentDescription: true
        }
      });
      return array;
    },

    fieldsOutput() {
      var self = this;
      var array = [];
      var exampleSingle;
      var examplePlural;

      switch (self.model.parentType) {
        case 'interaction':
          exampleSingle = 'Volunteer Application Form';
          examplePlural = 'Volunteer Application Forms';
          break;

        case 'contactdetail':
          exampleSingle = 'Medical Details';
          examplePlural = 'Medical Details';
          break;

        case 'event':
          exampleSingle = 'Small Group Meeting';
          examplePlural = 'Small Group Meetings';
          break;

        case 'article':
          exampleSingle = 'Blog';
          examplePlural = 'Blogs';
          break;

        case 'team':
          exampleSingle = 'Connect Group';
          examplePlural = 'Connect Groups';
          break;

        default:
          exampleSingle = 'Thing';
          examplePlural = 'Things';
          break;
      } ///////////////////////////////////
      // console.log('AUTOFOCUS', self.model._id)


      addField('title', {
        title: 'Title',
        minimum: 1,
        maximum: 1,
        type: 'string',
        params: {
          autofocus: !self.model._id,
          persistentDescription: true
        },
        description: `What do you call this ${self.readableContentType}?. eg. '${exampleSingle}'`
      });
      addField('plural', {
        title: 'Plural',
        minimum: 1,
        maximum: 1,
        type: 'string',
        params: {
          persistentDescription: true
        },
        description: `How do you want us to refer to multiple ${self.readableContentType} items?. eg. '${examplePlural}'`,
        expressions: {
          defaultValue() {
            var existingTitle = self.model.title;

            if (!existingTitle || !existingTitle.length) {
              return '';
            }

            if (_$1.endsWith(existingTitle, 's') || _$1.endsWith(existingTitle, 'es')) {
              return existingTitle;
            }

            return existingTitle = existingTitle + 's';
          }

        }
      }); ///////////////////////////////////

      addField('firstLine', {
        title: 'Short Description',
        minimum: 0,
        maximum: 1,
        type: 'string',
        params: {
          persistentDescription: true
        },
        description: `Optional short description describing this ${self.$fluro.types.readable(self.model.parentType)}`
      });
      addField('definitionName', {
        title: 'Definition Name',
        minimum: 1,
        maximum: 1,
        type: 'string',
        description: `This is a unique key to store this field's data in the database. for this ${self.readableContentType}`,
        expressions: {
          // transform(value) {
          //  if (!value) {
          //   return value;
          //  }
          //  var regexp = /[^a-zA-Z0-9-_]+/g;
          //  var cleaned = _.camelCase(value).replace(regexp, '');
          //  return cleaned;
          // },
          defaultValue() {
            if (!self.model.title) {
              return '';
            }

            var regexp = /[^a-zA-Z0-9-_]+/g;

            var cleaned = _$1.camelCase(String(self.model.title).replace(regexp, ''));

            return cleaned;
          }

        }
      });
      array.push({
        title: 'Weight',
        key: 'weight',
        minimum: 0,
        maximum: 0,
        type: 'integer',
        description: 'Set the weight of this roster, this will determine the ordering when shown in the multi planner, (Lighter weight rosters will be shown at the top, Heavier weight rosters will be shown toward the bottom)',
        params: {
          persistentDescription: true
        } //placeholder: `Eg. 'Bank Transfer', 'Cash', 'Cheque', 'Payment Plan'...`,

      }); //////////////////////////////////////////////////

      addField('publishDate', {
        title: 'Publish / Open Date',
        minimum: 0,
        maximum: 1,
        type: 'date',
        description: `When should this form open and change status to 'active'`,
        directive: 'datetimepicker'
      });
      addField('archiveDate', {
        title: 'Archive / Close Date',
        minimum: 0,
        maximum: 1,
        type: 'date',
        description: `When should this form closed and change status to 'archived'`,
        directive: 'datetimepicker'
      }); //////////////////////////////////////////////////
      //////////////////////////////////////////////////

      addField('parentType', {
        title: 'Parent Type',
        minimum: 1,
        maximum: 1,
        type: 'string',
        description: `What basic type of content you are defining/extending`,
        directive: 'select',
        options: self.parentTypeOptions
      }); //////////////////////////////////////////////////

      addField('privacy', {
        title: 'Security / Privacy',
        minimum: 0,
        maximum: 1,
        type: 'string',
        description: self.privacyDescription,
        directive: 'select',
        expressions: {
          hide() {
            switch (self.model.parentType) {
              case 'interaction':
              case 'post':
                break;

              default:
                return true;
            }
          }

        },
        options: [{
          name: `Secure (Only those with permissions can submit '${self.model.plural}')`,
          value: 'secure'
        }, {
          name: `Public (Anyone can submit '${self.model.plural}')`,
          value: 'public'
        }]
      }); ///////////////////////////////////

      function addField(key, details) {
        details.key = key;
        array.push(details);
      } // console.log('DO THE OUTPUT!!!');


      return array;
    }

  },

  data() {
    return {
      tabIndex: 0,
      alternativePaymentMethodIndex: 0,
      expandedSettings: {
        _contacts: false,
        _teams: false,
        _events: false,
        _tickets: false
      },
      editorOptions: {}
    };
  }

};

/* script */
const __vue_script__$6 = script$6;

/* template */
var __vue_render__$6 = function() {
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
                  value: _vm.tabIndex,
                  callback: function($$v) {
                    _vm.tabIndex = $$v;
                  },
                  expression: "tabIndex"
                }
              },
              [
                _vm.isForm
                  ? [
                      _c(
                        "tab",
                        { attrs: { heading: "Form Fields" } },
                        [
                          _c("fluro-field-editor", {
                            attrs: { item: _vm.model },
                            scopedSlots: _vm._u(
                              [
                                {
                                  key: "form",
                                  fn: function() {
                                    return [
                                      _c(
                                        "v-container",
                                        [
                                          _c(
                                            "constrain",
                                            { attrs: { sm: "" } },
                                            [
                                              _c(
                                                "fluro-panel",
                                                { attrs: { margin: "" } },
                                                [
                                                  _c("fluro-panel-title", [
                                                    _c("strong", [
                                                      _vm._v("Configuration")
                                                    ])
                                                  ]),
                                                  _vm._v(" "),
                                                  _c(
                                                    "fluro-panel-body",
                                                    [
                                                      _c(
                                                        "v-layout",
                                                        [
                                                          _c(
                                                            "v-flex",
                                                            {
                                                              attrs: {
                                                                xs12: "",
                                                                sm6: ""
                                                              }
                                                            },
                                                            [
                                                              _c(
                                                                "fluro-content-form-field",
                                                                {
                                                                  attrs: {
                                                                    "form-fields":
                                                                      _vm.formFields,
                                                                    outline:
                                                                      _vm.showOutline,
                                                                    options:
                                                                      _vm.options,
                                                                    field:
                                                                      _vm
                                                                        .fieldHash
                                                                        .title
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
                                                          ),
                                                          _vm._v(" "),
                                                          _c(
                                                            "v-flex",
                                                            {
                                                              attrs: {
                                                                xs12: "",
                                                                sm6: ""
                                                              }
                                                            },
                                                            [
                                                              _c(
                                                                "fluro-content-form-field",
                                                                {
                                                                  attrs: {
                                                                    "form-fields":
                                                                      _vm.formFields,
                                                                    outline:
                                                                      _vm.showOutline,
                                                                    options:
                                                                      _vm.options,
                                                                    field:
                                                                      _vm
                                                                        .fieldHash
                                                                        .plural
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
                                                      ),
                                                      _vm._v(" "),
                                                      !_vm.model._id
                                                        ? [
                                                            _c(
                                                              "div",
                                                              {
                                                                directives: [
                                                                  {
                                                                    name:
                                                                      "show",
                                                                    rawName:
                                                                      "v-show",
                                                                    value:
                                                                      _vm.showDefinitionName,
                                                                    expression:
                                                                      "showDefinitionName"
                                                                  }
                                                                ]
                                                              },
                                                              [
                                                                _c(
                                                                  "fluro-content-form-field",
                                                                  {
                                                                    attrs: {
                                                                      "form-fields":
                                                                        _vm.formFields,
                                                                      outline:
                                                                        _vm.showOutline,
                                                                      options:
                                                                        _vm.options,
                                                                      field:
                                                                        _vm
                                                                          .fieldHash
                                                                          .definitionName
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
                                                          ]
                                                        : _vm._e(),
                                                      _vm._v(" "),
                                                      _c(
                                                        "fluro-content-form-field",
                                                        {
                                                          attrs: {
                                                            "form-fields":
                                                              _vm.formFields,
                                                            outline:
                                                              _vm.showOutline,
                                                            options:
                                                              _vm.options,
                                                            field:
                                                              _vm.fieldHash
                                                                .privacy
                                                          },
                                                          on: {
                                                            input: _vm.update
                                                          },
                                                          model: {
                                                            value: _vm.model,
                                                            callback: function(
                                                              $$v
                                                            ) {
                                                              _vm.model = $$v;
                                                            },
                                                            expression: "model"
                                                          }
                                                        }
                                                      )
                                                    ],
                                                    2
                                                  )
                                                ],
                                                1
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "fluro-panel",
                                                { attrs: { margin: "" } },
                                                [
                                                  _c("fluro-panel-title", [
                                                    _c("strong", [
                                                      _vm._v("Contact Creation")
                                                    ])
                                                  ]),
                                                  _vm._v(" "),
                                                  _c(
                                                    "fluro-panel-body",
                                                    [
                                                      _c("fluro-content-form", {
                                                        attrs: {
                                                          fields: _vm.dataFields
                                                        },
                                                        scopedSlots: _vm._u(
                                                          [
                                                            {
                                                              key: "form",
                                                              fn: function(
                                                                ref
                                                              ) {
                                                                var formFields =
                                                                  ref.formFields;
                                                                var fieldHash =
                                                                  ref.fieldHash;
                                                                var model =
                                                                  ref.model;
                                                                var update =
                                                                  ref.update;
                                                                var options =
                                                                  ref.options;
                                                                return [
                                                                  _c(
                                                                    "fluro-content-form-field",
                                                                    {
                                                                      attrs: {
                                                                        "form-fields": formFields,
                                                                        options: options,
                                                                        field:
                                                                          fieldHash.allowAnonymous
                                                                      },
                                                                      on: {
                                                                        input: update
                                                                      },
                                                                      model: {
                                                                        value: model,
                                                                        callback: function(
                                                                          $$v
                                                                        ) {
                                                                          model = $$v;
                                                                        },
                                                                        expression:
                                                                          "model"
                                                                      }
                                                                    }
                                                                  ),
                                                                  _vm._v(" "),
                                                                  !model.allowAnonymous &&
                                                                  !model.disableDefaultFields
                                                                    ? [
                                                                        _c(
                                                                          "fluro-content-form-field",
                                                                          {
                                                                            attrs: {
                                                                              "form-fields": formFields,
                                                                              options: options,
                                                                              field:
                                                                                fieldHash.identifier
                                                                            },
                                                                            on: {
                                                                              input: update
                                                                            },
                                                                            model: {
                                                                              value: model,
                                                                              callback: function(
                                                                                $$v
                                                                              ) {
                                                                                model = $$v;
                                                                              },
                                                                              expression:
                                                                                "model"
                                                                            }
                                                                          }
                                                                        )
                                                                      ]
                                                                    : _vm._e()
                                                                ]
                                                              }
                                                            }
                                                          ],
                                                          null,
                                                          false,
                                                          1285757708
                                                        ),
                                                        model: {
                                                          value: _vm.model.data,
                                                          callback: function(
                                                            $$v
                                                          ) {
                                                            _vm.$set(
                                                              _vm.model,
                                                              "data",
                                                              $$v
                                                            );
                                                          },
                                                          expression:
                                                            "model.data"
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
                                                "fluro-panel",
                                                { attrs: { margin: "" } },
                                                [
                                                  _c("fluro-panel-title", [
                                                    _c("strong", [
                                                      _vm._v("Optional Fields")
                                                    ])
                                                  ]),
                                                  _vm._v(" "),
                                                  _c("fluro-content-form", {
                                                    attrs: {
                                                      fields: _vm.dataFields
                                                    },
                                                    scopedSlots: _vm._u(
                                                      [
                                                        {
                                                          key: "form",
                                                          fn: function(ref) {
                                                            var formFields =
                                                              ref.formFields;
                                                            var fieldHash =
                                                              ref.fieldHash;
                                                            var model =
                                                              ref.model;
                                                            var update =
                                                              ref.update;
                                                            var options =
                                                              ref.options;
                                                            return [
                                                              model.allowAnonymous
                                                                ? [
                                                                    _c(
                                                                      "div",
                                                                      {
                                                                        staticClass:
                                                                          "field-row"
                                                                      },
                                                                      [
                                                                        _c(
                                                                          "v-layout",
                                                                          {
                                                                            attrs: {
                                                                              "align-center":
                                                                                ""
                                                                            }
                                                                          },
                                                                          [
                                                                            _c(
                                                                              "v-flex",
                                                                              {
                                                                                attrs: {
                                                                                  xs4:
                                                                                    ""
                                                                                }
                                                                              },
                                                                              [
                                                                                _c(
                                                                                  "v-label",
                                                                                  [
                                                                                    _vm._v(
                                                                                      "First Name"
                                                                                    )
                                                                                  ]
                                                                                )
                                                                              ],
                                                                              1
                                                                            ),
                                                                            _vm._v(
                                                                              " "
                                                                            ),
                                                                            _c(
                                                                              "v-flex",
                                                                              {
                                                                                attrs: {
                                                                                  xs4:
                                                                                    ""
                                                                                }
                                                                              },
                                                                              [
                                                                                _c(
                                                                                  "fluro-content-form-field",
                                                                                  {
                                                                                    attrs: {
                                                                                      "form-fields": formFields,
                                                                                      options: options,
                                                                                      field:
                                                                                        fieldHash.askFirstName
                                                                                    },
                                                                                    on: {
                                                                                      input: update
                                                                                    },
                                                                                    model: {
                                                                                      value: model,
                                                                                      callback: function(
                                                                                        $$v
                                                                                      ) {
                                                                                        model = $$v;
                                                                                      },
                                                                                      expression:
                                                                                        "model"
                                                                                    }
                                                                                  }
                                                                                )
                                                                              ],
                                                                              1
                                                                            ),
                                                                            _vm._v(
                                                                              " "
                                                                            ),
                                                                            _c(
                                                                              "v-flex",
                                                                              {
                                                                                attrs: {
                                                                                  xs4:
                                                                                    ""
                                                                                }
                                                                              },
                                                                              [
                                                                                _c(
                                                                                  "fluro-content-form-field",
                                                                                  {
                                                                                    attrs: {
                                                                                      "form-fields": formFields,
                                                                                      options: options,
                                                                                      field:
                                                                                        fieldHash.requireFirstName
                                                                                    },
                                                                                    on: {
                                                                                      input: update
                                                                                    },
                                                                                    model: {
                                                                                      value: model,
                                                                                      callback: function(
                                                                                        $$v
                                                                                      ) {
                                                                                        model = $$v;
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
                                                                    ),
                                                                    _vm._v(" "),
                                                                    _c(
                                                                      "div",
                                                                      {
                                                                        staticClass:
                                                                          "field-row"
                                                                      },
                                                                      [
                                                                        _c(
                                                                          "v-layout",
                                                                          {
                                                                            attrs: {
                                                                              "align-center":
                                                                                ""
                                                                            }
                                                                          },
                                                                          [
                                                                            _c(
                                                                              "v-flex",
                                                                              {
                                                                                attrs: {
                                                                                  xs4:
                                                                                    ""
                                                                                }
                                                                              },
                                                                              [
                                                                                _c(
                                                                                  "v-label",
                                                                                  [
                                                                                    _vm._v(
                                                                                      "Last Name"
                                                                                    )
                                                                                  ]
                                                                                )
                                                                              ],
                                                                              1
                                                                            ),
                                                                            _vm._v(
                                                                              " "
                                                                            ),
                                                                            _c(
                                                                              "v-flex",
                                                                              {
                                                                                attrs: {
                                                                                  xs4:
                                                                                    ""
                                                                                }
                                                                              },
                                                                              [
                                                                                _c(
                                                                                  "fluro-content-form-field",
                                                                                  {
                                                                                    attrs: {
                                                                                      "form-fields": formFields,
                                                                                      options: options,
                                                                                      field:
                                                                                        fieldHash.askLastName
                                                                                    },
                                                                                    on: {
                                                                                      input: update
                                                                                    },
                                                                                    model: {
                                                                                      value: model,
                                                                                      callback: function(
                                                                                        $$v
                                                                                      ) {
                                                                                        model = $$v;
                                                                                      },
                                                                                      expression:
                                                                                        "model"
                                                                                    }
                                                                                  }
                                                                                )
                                                                              ],
                                                                              1
                                                                            ),
                                                                            _vm._v(
                                                                              " "
                                                                            ),
                                                                            _c(
                                                                              "v-flex",
                                                                              {
                                                                                attrs: {
                                                                                  xs4:
                                                                                    ""
                                                                                }
                                                                              },
                                                                              [
                                                                                _c(
                                                                                  "fluro-content-form-field",
                                                                                  {
                                                                                    attrs: {
                                                                                      "form-fields": formFields,
                                                                                      options: options,
                                                                                      field:
                                                                                        fieldHash.requireLastName
                                                                                    },
                                                                                    on: {
                                                                                      input: update
                                                                                    },
                                                                                    model: {
                                                                                      value: model,
                                                                                      callback: function(
                                                                                        $$v
                                                                                      ) {
                                                                                        model = $$v;
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
                                                                    ),
                                                                    _vm._v(" "),
                                                                    _c(
                                                                      "div",
                                                                      {
                                                                        staticClass:
                                                                          "field-row"
                                                                      },
                                                                      [
                                                                        _c(
                                                                          "v-layout",
                                                                          {
                                                                            attrs: {
                                                                              "align-center":
                                                                                ""
                                                                            }
                                                                          },
                                                                          [
                                                                            _c(
                                                                              "v-flex",
                                                                              {
                                                                                attrs: {
                                                                                  xs4:
                                                                                    ""
                                                                                }
                                                                              },
                                                                              [
                                                                                _c(
                                                                                  "v-label",
                                                                                  [
                                                                                    _vm._v(
                                                                                      "Email Address"
                                                                                    )
                                                                                  ]
                                                                                )
                                                                              ],
                                                                              1
                                                                            ),
                                                                            _vm._v(
                                                                              " "
                                                                            ),
                                                                            _c(
                                                                              "v-flex",
                                                                              {
                                                                                attrs: {
                                                                                  xs4:
                                                                                    ""
                                                                                }
                                                                              },
                                                                              [
                                                                                _c(
                                                                                  "fluro-content-form-field",
                                                                                  {
                                                                                    attrs: {
                                                                                      "form-fields": formFields,
                                                                                      options: options,
                                                                                      field:
                                                                                        fieldHash.askEmail
                                                                                    },
                                                                                    on: {
                                                                                      input: update
                                                                                    },
                                                                                    model: {
                                                                                      value: model,
                                                                                      callback: function(
                                                                                        $$v
                                                                                      ) {
                                                                                        model = $$v;
                                                                                      },
                                                                                      expression:
                                                                                        "model"
                                                                                    }
                                                                                  }
                                                                                )
                                                                              ],
                                                                              1
                                                                            ),
                                                                            _vm._v(
                                                                              " "
                                                                            ),
                                                                            _c(
                                                                              "v-flex",
                                                                              {
                                                                                attrs: {
                                                                                  xs4:
                                                                                    ""
                                                                                }
                                                                              },
                                                                              [
                                                                                _c(
                                                                                  "fluro-content-form-field",
                                                                                  {
                                                                                    attrs: {
                                                                                      "form-fields": formFields,
                                                                                      options: options,
                                                                                      field:
                                                                                        fieldHash.requireEmail
                                                                                    },
                                                                                    on: {
                                                                                      input: update
                                                                                    },
                                                                                    model: {
                                                                                      value: model,
                                                                                      callback: function(
                                                                                        $$v
                                                                                      ) {
                                                                                        model = $$v;
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
                                                                    ),
                                                                    _vm._v(" "),
                                                                    _c(
                                                                      "div",
                                                                      {
                                                                        staticClass:
                                                                          "field-row"
                                                                      },
                                                                      [
                                                                        _c(
                                                                          "v-layout",
                                                                          {
                                                                            attrs: {
                                                                              "align-center":
                                                                                ""
                                                                            }
                                                                          },
                                                                          [
                                                                            _c(
                                                                              "v-flex",
                                                                              {
                                                                                attrs: {
                                                                                  xs4:
                                                                                    ""
                                                                                }
                                                                              },
                                                                              [
                                                                                _c(
                                                                                  "v-label",
                                                                                  [
                                                                                    _vm._v(
                                                                                      "Phone Number"
                                                                                    )
                                                                                  ]
                                                                                )
                                                                              ],
                                                                              1
                                                                            ),
                                                                            _vm._v(
                                                                              " "
                                                                            ),
                                                                            _c(
                                                                              "v-flex",
                                                                              {
                                                                                attrs: {
                                                                                  xs4:
                                                                                    ""
                                                                                }
                                                                              },
                                                                              [
                                                                                _c(
                                                                                  "fluro-content-form-field",
                                                                                  {
                                                                                    attrs: {
                                                                                      "form-fields": formFields,
                                                                                      options: options,
                                                                                      field:
                                                                                        fieldHash.askPhone
                                                                                    },
                                                                                    on: {
                                                                                      input: update
                                                                                    },
                                                                                    model: {
                                                                                      value: model,
                                                                                      callback: function(
                                                                                        $$v
                                                                                      ) {
                                                                                        model = $$v;
                                                                                      },
                                                                                      expression:
                                                                                        "model"
                                                                                    }
                                                                                  }
                                                                                )
                                                                              ],
                                                                              1
                                                                            ),
                                                                            _vm._v(
                                                                              " "
                                                                            ),
                                                                            _c(
                                                                              "v-flex",
                                                                              {
                                                                                attrs: {
                                                                                  xs4:
                                                                                    ""
                                                                                }
                                                                              },
                                                                              [
                                                                                _c(
                                                                                  "fluro-content-form-field",
                                                                                  {
                                                                                    attrs: {
                                                                                      "form-fields": formFields,
                                                                                      options: options,
                                                                                      field:
                                                                                        fieldHash.requirePhone
                                                                                    },
                                                                                    on: {
                                                                                      input: update
                                                                                    },
                                                                                    model: {
                                                                                      value: model,
                                                                                      callback: function(
                                                                                        $$v
                                                                                      ) {
                                                                                        model = $$v;
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
                                                                    ),
                                                                    _vm._v(" "),
                                                                    _c(
                                                                      "div",
                                                                      {
                                                                        staticClass:
                                                                          "field-row"
                                                                      },
                                                                      [
                                                                        _c(
                                                                          "v-layout",
                                                                          {
                                                                            attrs: {
                                                                              "align-center":
                                                                                ""
                                                                            }
                                                                          },
                                                                          [
                                                                            _c(
                                                                              "v-flex",
                                                                              {
                                                                                attrs: {
                                                                                  xs4:
                                                                                    ""
                                                                                }
                                                                              },
                                                                              [
                                                                                _c(
                                                                                  "v-label",
                                                                                  [
                                                                                    _vm._v(
                                                                                      "Gender"
                                                                                    )
                                                                                  ]
                                                                                )
                                                                              ],
                                                                              1
                                                                            ),
                                                                            _vm._v(
                                                                              " "
                                                                            ),
                                                                            _c(
                                                                              "v-flex",
                                                                              {
                                                                                attrs: {
                                                                                  xs4:
                                                                                    ""
                                                                                }
                                                                              },
                                                                              [
                                                                                _c(
                                                                                  "fluro-content-form-field",
                                                                                  {
                                                                                    attrs: {
                                                                                      "form-fields": formFields,
                                                                                      options: options,
                                                                                      field:
                                                                                        fieldHash.askGender
                                                                                    },
                                                                                    on: {
                                                                                      input: update
                                                                                    },
                                                                                    model: {
                                                                                      value: model,
                                                                                      callback: function(
                                                                                        $$v
                                                                                      ) {
                                                                                        model = $$v;
                                                                                      },
                                                                                      expression:
                                                                                        "model"
                                                                                    }
                                                                                  }
                                                                                )
                                                                              ],
                                                                              1
                                                                            ),
                                                                            _vm._v(
                                                                              " "
                                                                            ),
                                                                            _c(
                                                                              "v-flex",
                                                                              {
                                                                                attrs: {
                                                                                  xs4:
                                                                                    ""
                                                                                }
                                                                              },
                                                                              [
                                                                                _c(
                                                                                  "fluro-content-form-field",
                                                                                  {
                                                                                    attrs: {
                                                                                      "form-fields": formFields,
                                                                                      options: options,
                                                                                      field:
                                                                                        fieldHash.requireGender
                                                                                    },
                                                                                    on: {
                                                                                      input: update
                                                                                    },
                                                                                    model: {
                                                                                      value: model,
                                                                                      callback: function(
                                                                                        $$v
                                                                                      ) {
                                                                                        model = $$v;
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
                                                                  ]
                                                                : _vm._e(),
                                                              _vm._v(" "),
                                                              _c(
                                                                "div",
                                                                {
                                                                  staticClass:
                                                                    "field-row"
                                                                },
                                                                [
                                                                  _c(
                                                                    "v-layout",
                                                                    {
                                                                      attrs: {
                                                                        "align-center":
                                                                          ""
                                                                      }
                                                                    },
                                                                    [
                                                                      _c(
                                                                        "v-flex",
                                                                        {
                                                                          attrs: {
                                                                            xs4:
                                                                              ""
                                                                          }
                                                                        },
                                                                        [
                                                                          _c(
                                                                            "v-label",
                                                                            [
                                                                              _vm._v(
                                                                                "Date of Birth"
                                                                              )
                                                                            ]
                                                                          )
                                                                        ],
                                                                        1
                                                                      ),
                                                                      _vm._v(
                                                                        " "
                                                                      ),
                                                                      _c(
                                                                        "v-flex",
                                                                        {
                                                                          attrs: {
                                                                            xs4:
                                                                              ""
                                                                          }
                                                                        },
                                                                        [
                                                                          _c(
                                                                            "fluro-content-form-field",
                                                                            {
                                                                              attrs: {
                                                                                "form-fields": formFields,
                                                                                options: options,
                                                                                field:
                                                                                  fieldHash.askDOB
                                                                              },
                                                                              on: {
                                                                                input: update
                                                                              },
                                                                              model: {
                                                                                value: model,
                                                                                callback: function(
                                                                                  $$v
                                                                                ) {
                                                                                  model = $$v;
                                                                                },
                                                                                expression:
                                                                                  "model"
                                                                              }
                                                                            }
                                                                          )
                                                                        ],
                                                                        1
                                                                      ),
                                                                      _vm._v(
                                                                        " "
                                                                      ),
                                                                      _c(
                                                                        "v-flex",
                                                                        {
                                                                          attrs: {
                                                                            xs4:
                                                                              ""
                                                                          }
                                                                        },
                                                                        [
                                                                          _c(
                                                                            "fluro-content-form-field",
                                                                            {
                                                                              attrs: {
                                                                                "form-fields": formFields,
                                                                                options: options,
                                                                                field:
                                                                                  fieldHash.requireDOB
                                                                              },
                                                                              on: {
                                                                                input: update
                                                                              },
                                                                              model: {
                                                                                value: model,
                                                                                callback: function(
                                                                                  $$v
                                                                                ) {
                                                                                  model = $$v;
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
                                                              ),
                                                              _vm._v(" "),
                                                              model.allowAnonymous
                                                                ? _c(
                                                                    "fluro-panel-body",
                                                                    {
                                                                      staticClass:
                                                                        "border-top"
                                                                    },
                                                                    [
                                                                      _c(
                                                                        "fluro-content-form-field",
                                                                        {
                                                                          attrs: {
                                                                            "form-fields": formFields,
                                                                            options: options,
                                                                            field:
                                                                              fieldHash.disableBestGuess
                                                                          },
                                                                          on: {
                                                                            input: update
                                                                          },
                                                                          model: {
                                                                            value: model,
                                                                            callback: function(
                                                                              $$v
                                                                            ) {
                                                                              model = $$v;
                                                                            },
                                                                            expression:
                                                                              "model"
                                                                          }
                                                                        }
                                                                      )
                                                                    ],
                                                                    1
                                                                  )
                                                                : _vm._e()
                                                            ]
                                                          }
                                                        }
                                                      ],
                                                      null,
                                                      false,
                                                      4126247000
                                                    ),
                                                    model: {
                                                      value: _vm.model.data,
                                                      callback: function($$v) {
                                                        _vm.$set(
                                                          _vm.model,
                                                          "data",
                                                          $$v
                                                        );
                                                      },
                                                      expression: "model.data"
                                                    }
                                                  })
                                                ],
                                                1
                                              ),
                                              _vm._v(" "),
                                              _vm.definition
                                                ? _c(
                                                    "fluro-panel",
                                                    { attrs: { margin: "" } },
                                                    [
                                                      _c("fluro-panel-title", [
                                                        _c("strong", [
                                                          _vm._v(
                                                            _vm._s(
                                                              _vm.definition
                                                                .title
                                                            ) + " Information"
                                                          )
                                                        ])
                                                      ]),
                                                      _vm._v(" "),
                                                      _c(
                                                        "fluro-panel-body",
                                                        [
                                                          _c(
                                                            "fluro-content-form",
                                                            {
                                                              attrs: {
                                                                options:
                                                                  _vm.definitionFormOptions,
                                                                fields:
                                                                  _vm.definition
                                                                    .fields
                                                              },
                                                              model: {
                                                                value:
                                                                  _vm.model
                                                                    .data,
                                                                callback: function(
                                                                  $$v
                                                                ) {
                                                                  _vm.$set(
                                                                    _vm.model,
                                                                    "data",
                                                                    $$v
                                                                  );
                                                                },
                                                                expression:
                                                                  "model.data"
                                                              }
                                                            }
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
                                                "v-container",
                                                {
                                                  attrs: {
                                                    "pa-0": "",
                                                    "grid-list-xl": ""
                                                  }
                                                },
                                                [
                                                  _c(
                                                    "v-layout",
                                                    {
                                                      attrs: {
                                                        row: "",
                                                        wrap: ""
                                                      }
                                                    },
                                                    [
                                                      _c(
                                                        "v-flex",
                                                        {
                                                          attrs: {
                                                            xs12: "",
                                                            sm6: ""
                                                          }
                                                        },
                                                        [
                                                          _c(
                                                            "fluro-content-form-field",
                                                            {
                                                              attrs: {
                                                                "form-fields":
                                                                  _vm.formFields,
                                                                options:
                                                                  _vm.options,
                                                                field:
                                                                  _vm.fieldHash
                                                                    .publishDate
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
                                                      ),
                                                      _vm._v(" "),
                                                      _c(
                                                        "v-flex",
                                                        {
                                                          attrs: {
                                                            xs12: "",
                                                            sm6: ""
                                                          }
                                                        },
                                                        [
                                                          _c(
                                                            "fluro-content-form-field",
                                                            {
                                                              attrs: {
                                                                "form-fields":
                                                                  _vm.formFields,
                                                                options:
                                                                  _vm.options,
                                                                field:
                                                                  _vm.fieldHash
                                                                    .archiveDate
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
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "fluro-panel",
                                                { attrs: { margin: "" } },
                                                [
                                                  _c(
                                                    "fluro-panel-title",
                                                    [
                                                      _c("Strong", [
                                                        _vm._v(
                                                          "Automation and other settings"
                                                        )
                                                      ])
                                                    ],
                                                    1
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "tabset",
                                                    [
                                                      _c(
                                                        "tab",
                                                        {
                                                          attrs: {
                                                            heading:
                                                              "Notifications"
                                                          }
                                                        },
                                                        [
                                                          _c(
                                                            "fluro-panel-body",
                                                            [
                                                              _c(
                                                                "fluro-content-form",
                                                                {
                                                                  attrs: {
                                                                    fields:
                                                                      _vm.dataFields
                                                                  },
                                                                  scopedSlots: _vm._u(
                                                                    [
                                                                      {
                                                                        key:
                                                                          "form",
                                                                        fn: function(
                                                                          ref
                                                                        ) {
                                                                          var formFields =
                                                                            ref.formFields;
                                                                          var fieldHash =
                                                                            ref.fieldHash;
                                                                          var model =
                                                                            ref.model;
                                                                          var update =
                                                                            ref.update;
                                                                          var options =
                                                                            ref.options;
                                                                          return [
                                                                            _c(
                                                                              "fluro-content-form-field",
                                                                              {
                                                                                attrs: {
                                                                                  "form-fields": formFields,
                                                                                  options: options,
                                                                                  field:
                                                                                    fieldHash.enableConfirmation
                                                                                },
                                                                                on: {
                                                                                  input: update
                                                                                },
                                                                                model: {
                                                                                  value: model,
                                                                                  callback: function(
                                                                                    $$v
                                                                                  ) {
                                                                                    model = $$v;
                                                                                  },
                                                                                  expression:
                                                                                    "model"
                                                                                }
                                                                              }
                                                                            ),
                                                                            _vm._v(
                                                                              " "
                                                                            ),
                                                                            _c(
                                                                              "fluro-content-form-field",
                                                                              {
                                                                                attrs: {
                                                                                  "form-fields": formFields,
                                                                                  options: options,
                                                                                  field:
                                                                                    fieldHash.includeTickets
                                                                                },
                                                                                on: {
                                                                                  input: update
                                                                                },
                                                                                model: {
                                                                                  value: model,
                                                                                  callback: function(
                                                                                    $$v
                                                                                  ) {
                                                                                    model = $$v;
                                                                                  },
                                                                                  expression:
                                                                                    "model"
                                                                                }
                                                                              }
                                                                            ),
                                                                            _vm._v(
                                                                              " "
                                                                            ),
                                                                            _c(
                                                                              "fluro-content-form-field",
                                                                              {
                                                                                attrs: {
                                                                                  "form-fields": formFields,
                                                                                  options: options,
                                                                                  field:
                                                                                    fieldHash.confirmationMessage
                                                                                },
                                                                                on: {
                                                                                  input: update
                                                                                },
                                                                                model: {
                                                                                  value: model,
                                                                                  callback: function(
                                                                                    $$v
                                                                                  ) {
                                                                                    model = $$v;
                                                                                  },
                                                                                  expression:
                                                                                    "model"
                                                                                }
                                                                              }
                                                                            ),
                                                                            _vm._v(
                                                                              " "
                                                                            ),
                                                                            _c(
                                                                              "fluro-content-form-field",
                                                                              {
                                                                                attrs: {
                                                                                  "form-fields": formFields,
                                                                                  options: options,
                                                                                  field:
                                                                                    fieldHash.notifyContacts
                                                                                },
                                                                                on: {
                                                                                  input: update
                                                                                },
                                                                                model: {
                                                                                  value: model,
                                                                                  callback: function(
                                                                                    $$v
                                                                                  ) {
                                                                                    model = $$v;
                                                                                  },
                                                                                  expression:
                                                                                    "model"
                                                                                }
                                                                              }
                                                                            ),
                                                                            _vm._v(
                                                                              " "
                                                                            ),
                                                                            _c(
                                                                              "fluro-content-form-field",
                                                                              {
                                                                                attrs: {
                                                                                  "form-fields": formFields,
                                                                                  options: options,
                                                                                  field:
                                                                                    fieldHash.enableReceipt
                                                                                },
                                                                                on: {
                                                                                  input: update
                                                                                },
                                                                                model: {
                                                                                  value: model,
                                                                                  callback: function(
                                                                                    $$v
                                                                                  ) {
                                                                                    model = $$v;
                                                                                  },
                                                                                  expression:
                                                                                    "model"
                                                                                }
                                                                              }
                                                                            )
                                                                          ]
                                                                        }
                                                                      }
                                                                    ],
                                                                    null,
                                                                    false,
                                                                    3471290849
                                                                  ),
                                                                  model: {
                                                                    value:
                                                                      _vm.model
                                                                        .data,
                                                                    callback: function(
                                                                      $$v
                                                                    ) {
                                                                      _vm.$set(
                                                                        _vm.model,
                                                                        "data",
                                                                        $$v
                                                                      );
                                                                    },
                                                                    expression:
                                                                      "model.data"
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
                                                            heading: "Processes"
                                                          }
                                                        },
                                                        [
                                                          _c(
                                                            "fluro-panel-body",
                                                            [
                                                              _c(
                                                                "fluro-content-form",
                                                                {
                                                                  attrs: {
                                                                    fields:
                                                                      _vm.dataFields
                                                                  },
                                                                  scopedSlots: _vm._u(
                                                                    [
                                                                      {
                                                                        key:
                                                                          "form",
                                                                        fn: function(
                                                                          ref
                                                                        ) {
                                                                          var formFields =
                                                                            ref.formFields;
                                                                          var fieldHash =
                                                                            ref.fieldHash;
                                                                          var model =
                                                                            ref.model;
                                                                          var update =
                                                                            ref.update;
                                                                          var options =
                                                                            ref.options;
                                                                          return [
                                                                            _c(
                                                                              "fluro-content-form-field",
                                                                              {
                                                                                attrs: {
                                                                                  "form-fields": formFields,
                                                                                  options: options,
                                                                                  field:
                                                                                    fieldHash.interactionProcesses
                                                                                },
                                                                                on: {
                                                                                  input: update
                                                                                },
                                                                                model: {
                                                                                  value: model,
                                                                                  callback: function(
                                                                                    $$v
                                                                                  ) {
                                                                                    model = $$v;
                                                                                  },
                                                                                  expression:
                                                                                    "model"
                                                                                }
                                                                              }
                                                                            ),
                                                                            _vm._v(
                                                                              " "
                                                                            ),
                                                                            _c(
                                                                              "fluro-content-form-field",
                                                                              {
                                                                                attrs: {
                                                                                  "form-fields": formFields,
                                                                                  options: options,
                                                                                  field:
                                                                                    fieldHash.contactProcesses
                                                                                },
                                                                                on: {
                                                                                  input: update
                                                                                },
                                                                                model: {
                                                                                  value: model,
                                                                                  callback: function(
                                                                                    $$v
                                                                                  ) {
                                                                                    model = $$v;
                                                                                  },
                                                                                  expression:
                                                                                    "model"
                                                                                }
                                                                              }
                                                                            ),
                                                                            _vm._v(
                                                                              " "
                                                                            ),
                                                                            _c(
                                                                              "fluro-content-form-field",
                                                                              {
                                                                                attrs: {
                                                                                  "form-fields": formFields,
                                                                                  options: options,
                                                                                  field:
                                                                                    fieldHash.contactProcessesAll
                                                                                },
                                                                                on: {
                                                                                  input: update
                                                                                },
                                                                                model: {
                                                                                  value: model,
                                                                                  callback: function(
                                                                                    $$v
                                                                                  ) {
                                                                                    model = $$v;
                                                                                  },
                                                                                  expression:
                                                                                    "model"
                                                                                }
                                                                              }
                                                                            ),
                                                                            _vm._v(
                                                                              " "
                                                                            ),
                                                                            _c(
                                                                              "fluro-content-form-field",
                                                                              {
                                                                                attrs: {
                                                                                  "form-fields": formFields,
                                                                                  options: options,
                                                                                  field:
                                                                                    fieldHash.processAssignTo
                                                                                },
                                                                                on: {
                                                                                  input: update
                                                                                },
                                                                                model: {
                                                                                  value: model,
                                                                                  callback: function(
                                                                                    $$v
                                                                                  ) {
                                                                                    model = $$v;
                                                                                  },
                                                                                  expression:
                                                                                    "model"
                                                                                }
                                                                              }
                                                                            )
                                                                          ]
                                                                        }
                                                                      }
                                                                    ],
                                                                    null,
                                                                    false,
                                                                    3648113199
                                                                  ),
                                                                  model: {
                                                                    value:
                                                                      _vm.model
                                                                        .data,
                                                                    callback: function(
                                                                      $$v
                                                                    ) {
                                                                      _vm.$set(
                                                                        _vm.model,
                                                                        "data",
                                                                        $$v
                                                                      );
                                                                    },
                                                                    expression:
                                                                      "model.data"
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
                                                              "Groups and Teams"
                                                          }
                                                        },
                                                        [
                                                          _c(
                                                            "fluro-panel-body",
                                                            [
                                                              _c(
                                                                "fluro-content-form",
                                                                {
                                                                  attrs: {
                                                                    fields:
                                                                      _vm.dataFields
                                                                  },
                                                                  scopedSlots: _vm._u(
                                                                    [
                                                                      {
                                                                        key:
                                                                          "form",
                                                                        fn: function(
                                                                          ref
                                                                        ) {
                                                                          var formFields =
                                                                            ref.formFields;
                                                                          var fieldHash =
                                                                            ref.fieldHash;
                                                                          var model =
                                                                            ref.model;
                                                                          var update =
                                                                            ref.update;
                                                                          var options =
                                                                            ref.options;
                                                                          return [
                                                                            _c(
                                                                              "fluro-content-form-field",
                                                                              {
                                                                                attrs: {
                                                                                  "form-fields": formFields,
                                                                                  options: options,
                                                                                  field:
                                                                                    fieldHash.contactTeams
                                                                                },
                                                                                on: {
                                                                                  input: update
                                                                                },
                                                                                model: {
                                                                                  value: model,
                                                                                  callback: function(
                                                                                    $$v
                                                                                  ) {
                                                                                    model = $$v;
                                                                                  },
                                                                                  expression:
                                                                                    "model"
                                                                                }
                                                                              }
                                                                            ),
                                                                            _vm._v(
                                                                              " "
                                                                            ),
                                                                            _c(
                                                                              "fluro-content-form-field",
                                                                              {
                                                                                attrs: {
                                                                                  "form-fields": formFields,
                                                                                  options: options,
                                                                                  field:
                                                                                    fieldHash.contactTeamsAll
                                                                                },
                                                                                on: {
                                                                                  input: update
                                                                                },
                                                                                model: {
                                                                                  value: model,
                                                                                  callback: function(
                                                                                    $$v
                                                                                  ) {
                                                                                    model = $$v;
                                                                                  },
                                                                                  expression:
                                                                                    "model"
                                                                                }
                                                                              }
                                                                            )
                                                                          ]
                                                                        }
                                                                      }
                                                                    ],
                                                                    null,
                                                                    false,
                                                                    4247234361
                                                                  ),
                                                                  model: {
                                                                    value:
                                                                      _vm.model
                                                                        .data,
                                                                    callback: function(
                                                                      $$v
                                                                    ) {
                                                                      _vm.$set(
                                                                        _vm.model,
                                                                        "data",
                                                                        $$v
                                                                      );
                                                                    },
                                                                    expression:
                                                                      "model.data"
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
                                                              "Capabilities"
                                                          }
                                                        },
                                                        [
                                                          _c(
                                                            "fluro-panel-body",
                                                            [
                                                              _c(
                                                                "fluro-content-form",
                                                                {
                                                                  attrs: {
                                                                    fields:
                                                                      _vm.dataFields
                                                                  },
                                                                  scopedSlots: _vm._u(
                                                                    [
                                                                      {
                                                                        key:
                                                                          "form",
                                                                        fn: function(
                                                                          ref
                                                                        ) {
                                                                          var formFields =
                                                                            ref.formFields;
                                                                          var fieldHash =
                                                                            ref.fieldHash;
                                                                          var model =
                                                                            ref.model;
                                                                          var update =
                                                                            ref.update;
                                                                          var options =
                                                                            ref.options;
                                                                          return [
                                                                            _c(
                                                                              "fluro-content-form-field",
                                                                              {
                                                                                attrs: {
                                                                                  "form-fields": formFields,
                                                                                  options: options,
                                                                                  field:
                                                                                    fieldHash.contactCapabilities
                                                                                },
                                                                                on: {
                                                                                  input: update
                                                                                },
                                                                                model: {
                                                                                  value: model,
                                                                                  callback: function(
                                                                                    $$v
                                                                                  ) {
                                                                                    model = $$v;
                                                                                  },
                                                                                  expression:
                                                                                    "model"
                                                                                }
                                                                              }
                                                                            ),
                                                                            _vm._v(
                                                                              " "
                                                                            ),
                                                                            _c(
                                                                              "fluro-content-form-field",
                                                                              {
                                                                                attrs: {
                                                                                  "form-fields": formFields,
                                                                                  options: options,
                                                                                  field:
                                                                                    fieldHash.capabilitiesAll
                                                                                },
                                                                                on: {
                                                                                  input: update
                                                                                },
                                                                                model: {
                                                                                  value: model,
                                                                                  callback: function(
                                                                                    $$v
                                                                                  ) {
                                                                                    model = $$v;
                                                                                  },
                                                                                  expression:
                                                                                    "model"
                                                                                }
                                                                              }
                                                                            )
                                                                          ]
                                                                        }
                                                                      }
                                                                    ],
                                                                    null,
                                                                    false,
                                                                    671170745
                                                                  ),
                                                                  model: {
                                                                    value:
                                                                      _vm.model
                                                                        .data,
                                                                    callback: function(
                                                                      $$v
                                                                    ) {
                                                                      _vm.$set(
                                                                        _vm.model,
                                                                        "data",
                                                                        $$v
                                                                      );
                                                                    },
                                                                    expression:
                                                                      "model.data"
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
                                                              "Reaction Pipelines"
                                                          }
                                                        },
                                                        [
                                                          _c(
                                                            "fluro-panel-body",
                                                            [
                                                              _c(
                                                                "fluro-content-form",
                                                                {
                                                                  attrs: {
                                                                    fields:
                                                                      _vm.dataFields
                                                                  },
                                                                  scopedSlots: _vm._u(
                                                                    [
                                                                      {
                                                                        key:
                                                                          "form",
                                                                        fn: function(
                                                                          ref
                                                                        ) {
                                                                          var formFields =
                                                                            ref.formFields;
                                                                          var fieldHash =
                                                                            ref.fieldHash;
                                                                          var model =
                                                                            ref.model;
                                                                          var update =
                                                                            ref.update;
                                                                          var options =
                                                                            ref.options;
                                                                          return [
                                                                            _c(
                                                                              "fluro-content-form-field",
                                                                              {
                                                                                attrs: {
                                                                                  "form-fields": formFields,
                                                                                  options: options,
                                                                                  field:
                                                                                    fieldHash.reactionPipelines
                                                                                },
                                                                                on: {
                                                                                  input: update
                                                                                },
                                                                                model: {
                                                                                  value: model,
                                                                                  callback: function(
                                                                                    $$v
                                                                                  ) {
                                                                                    model = $$v;
                                                                                  },
                                                                                  expression:
                                                                                    "model"
                                                                                }
                                                                              }
                                                                            )
                                                                          ]
                                                                        }
                                                                      }
                                                                    ],
                                                                    null,
                                                                    false,
                                                                    549328213
                                                                  ),
                                                                  model: {
                                                                    value:
                                                                      _vm.model
                                                                        .data,
                                                                    callback: function(
                                                                      $$v
                                                                    ) {
                                                                      _vm.$set(
                                                                        _vm.model,
                                                                        "data",
                                                                        $$v
                                                                      );
                                                                    },
                                                                    expression:
                                                                      "model.data"
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
                                                              "Other Options"
                                                          }
                                                        },
                                                        [
                                                          _c(
                                                            "fluro-panel-body",
                                                            [
                                                              _c(
                                                                "fluro-content-form",
                                                                {
                                                                  attrs: {
                                                                    fields:
                                                                      _vm.dataFields
                                                                  },
                                                                  scopedSlots: _vm._u(
                                                                    [
                                                                      {
                                                                        key:
                                                                          "form",
                                                                        fn: function(
                                                                          ref
                                                                        ) {
                                                                          var formFields =
                                                                            ref.formFields;
                                                                          var fieldHash =
                                                                            ref.fieldHash;
                                                                          var model =
                                                                            ref.model;
                                                                          var update =
                                                                            ref.update;
                                                                          var options =
                                                                            ref.options;
                                                                          return [
                                                                            _c(
                                                                              "fluro-content-form-field",
                                                                              {
                                                                                attrs: {
                                                                                  "form-fields": formFields,
                                                                                  options: options,
                                                                                  field:
                                                                                    fieldHash.blc
                                                                                },
                                                                                on: {
                                                                                  input: update
                                                                                },
                                                                                model: {
                                                                                  value: model,
                                                                                  callback: function(
                                                                                    $$v
                                                                                  ) {
                                                                                    model = $$v;
                                                                                  },
                                                                                  expression:
                                                                                    "model"
                                                                                }
                                                                              }
                                                                            )
                                                                          ]
                                                                        }
                                                                      }
                                                                    ],
                                                                    null,
                                                                    false,
                                                                    1888095360
                                                                  ),
                                                                  model: {
                                                                    value:
                                                                      _vm.model
                                                                        .data,
                                                                    callback: function(
                                                                      $$v
                                                                    ) {
                                                                      _vm.$set(
                                                                        _vm.model,
                                                                        "data",
                                                                        $$v
                                                                      );
                                                                    },
                                                                    expression:
                                                                      "model.data"
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
                                        ],
                                        1
                                      )
                                    ]
                                  },
                                  proxy: true
                                },
                                {
                                  key: "payment",
                                  fn: function() {
                                    return [
                                      _c(
                                        "v-container",
                                        [
                                          _c("fluro-content-form", {
                                            attrs: {
                                              fields: _vm.paymentFields
                                            },
                                            scopedSlots: _vm._u(
                                              [
                                                {
                                                  key: "form",
                                                  fn: function(ref) {
                                                    var formFields =
                                                      ref.formFields;
                                                    var fieldHash =
                                                      ref.fieldHash;
                                                    var model = ref.model;
                                                    var update = ref.update;
                                                    var options = ref.options;
                                                    return [
                                                      _c(
                                                        "fluro-panel",
                                                        {
                                                          attrs: { margin: "" }
                                                        },
                                                        [
                                                          _c(
                                                            "fluro-panel-body",
                                                            [
                                                              _c(
                                                                "fluro-content-form-field",
                                                                {
                                                                  attrs: {
                                                                    "form-fields": formFields,
                                                                    options: options,
                                                                    field:
                                                                      fieldHash.required
                                                                  },
                                                                  on: {
                                                                    input: update
                                                                  },
                                                                  model: {
                                                                    value: model,
                                                                    callback: function(
                                                                      $$v
                                                                    ) {
                                                                      model = $$v;
                                                                    },
                                                                    expression:
                                                                      "model"
                                                                  }
                                                                }
                                                              ),
                                                              _vm._v(" "),
                                                              _c(
                                                                "fluro-content-form-field",
                                                                {
                                                                  attrs: {
                                                                    "form-fields": formFields,
                                                                    options: options,
                                                                    field:
                                                                      fieldHash.allow
                                                                  },
                                                                  on: {
                                                                    input: update
                                                                  },
                                                                  model: {
                                                                    value: model,
                                                                    callback: function(
                                                                      $$v
                                                                    ) {
                                                                      model = $$v;
                                                                    },
                                                                    expression:
                                                                      "model"
                                                                  }
                                                                }
                                                              )
                                                            ],
                                                            1
                                                          ),
                                                          _vm._v(" "),
                                                          _vm.paymentIsEnabled
                                                            ? [
                                                                _c(
                                                                  "v-container",
                                                                  {
                                                                    attrs: {
                                                                      "pa-0": ""
                                                                    }
                                                                  },
                                                                  [
                                                                    model.required
                                                                      ? _c(
                                                                          "fluro-panel-body",
                                                                          {
                                                                            staticClass:
                                                                              "border-top"
                                                                          },
                                                                          [
                                                                            _c(
                                                                              "v-layout",
                                                                              [
                                                                                _c(
                                                                                  "v-flex",
                                                                                  {
                                                                                    attrs: {
                                                                                      xs9:
                                                                                        ""
                                                                                    }
                                                                                  },
                                                                                  [
                                                                                    _c(
                                                                                      "fluro-content-form-field",
                                                                                      {
                                                                                        attrs: {
                                                                                          "form-fields": formFields,
                                                                                          options: options,
                                                                                          field:
                                                                                            fieldHash.amount
                                                                                        },
                                                                                        on: {
                                                                                          input: update
                                                                                        },
                                                                                        model: {
                                                                                          value: model,
                                                                                          callback: function(
                                                                                            $$v
                                                                                          ) {
                                                                                            model = $$v;
                                                                                          },
                                                                                          expression:
                                                                                            "model"
                                                                                        }
                                                                                      }
                                                                                    )
                                                                                  ],
                                                                                  1
                                                                                ),
                                                                                _vm._v(
                                                                                  " "
                                                                                ),
                                                                                _c(
                                                                                  "v-flex",
                                                                                  {
                                                                                    attrs: {
                                                                                      xs3:
                                                                                        ""
                                                                                    }
                                                                                  },
                                                                                  [
                                                                                    _c(
                                                                                      "fluro-content-form-field",
                                                                                      {
                                                                                        attrs: {
                                                                                          "form-fields": formFields,
                                                                                          options: options,
                                                                                          field:
                                                                                            fieldHash.currency
                                                                                        },
                                                                                        on: {
                                                                                          input: update
                                                                                        },
                                                                                        model: {
                                                                                          value: model,
                                                                                          callback: function(
                                                                                            $$v
                                                                                          ) {
                                                                                            model = $$v;
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
                                                                      : _vm._e(),
                                                                    _vm._v(" "),
                                                                    model.allow &&
                                                                    !model.required
                                                                      ? _c(
                                                                          "fluro-panel-body",
                                                                          {
                                                                            staticClass:
                                                                              "border-top"
                                                                          },
                                                                          [
                                                                            _c(
                                                                              "fluro-content-form-field",
                                                                              {
                                                                                attrs: {
                                                                                  "form-fields": formFields,
                                                                                  options: options,
                                                                                  field:
                                                                                    fieldHash.currency
                                                                                },
                                                                                on: {
                                                                                  input: update
                                                                                },
                                                                                model: {
                                                                                  value: model,
                                                                                  callback: function(
                                                                                    $$v
                                                                                  ) {
                                                                                    model = $$v;
                                                                                  },
                                                                                  expression:
                                                                                    "model"
                                                                                }
                                                                              }
                                                                            ),
                                                                            _vm._v(
                                                                              " "
                                                                            ),
                                                                            _c(
                                                                              "v-layout",
                                                                              [
                                                                                _c(
                                                                                  "v-flex",
                                                                                  {
                                                                                    attrs: {
                                                                                      xs12:
                                                                                        "",
                                                                                      sm6:
                                                                                        ""
                                                                                    }
                                                                                  },
                                                                                  [
                                                                                    _c(
                                                                                      "fluro-content-form-field",
                                                                                      {
                                                                                        attrs: {
                                                                                          "form-fields": formFields,
                                                                                          options: options,
                                                                                          field:
                                                                                            fieldHash.minAmount
                                                                                        },
                                                                                        on: {
                                                                                          input: update
                                                                                        },
                                                                                        model: {
                                                                                          value: model,
                                                                                          callback: function(
                                                                                            $$v
                                                                                          ) {
                                                                                            model = $$v;
                                                                                          },
                                                                                          expression:
                                                                                            "model"
                                                                                        }
                                                                                      }
                                                                                    )
                                                                                  ],
                                                                                  1
                                                                                ),
                                                                                _vm._v(
                                                                                  " "
                                                                                ),
                                                                                _c(
                                                                                  "v-flex",
                                                                                  {
                                                                                    attrs: {
                                                                                      xs12:
                                                                                        "",
                                                                                      sm6:
                                                                                        ""
                                                                                    }
                                                                                  },
                                                                                  [
                                                                                    _c(
                                                                                      "fluro-content-form-field",
                                                                                      {
                                                                                        attrs: {
                                                                                          "form-fields": formFields,
                                                                                          options: options,
                                                                                          field:
                                                                                            fieldHash.maxAmount
                                                                                        },
                                                                                        on: {
                                                                                          input: update
                                                                                        },
                                                                                        model: {
                                                                                          value: model,
                                                                                          callback: function(
                                                                                            $$v
                                                                                          ) {
                                                                                            model = $$v;
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
                                                                      : _vm._e()
                                                                  ],
                                                                  1
                                                                )
                                                              ]
                                                            : _vm._e()
                                                        ],
                                                        2
                                                      )
                                                    ]
                                                  }
                                                }
                                              ],
                                              null,
                                              false,
                                              587729594
                                            ),
                                            model: {
                                              value: _vm.model.paymentDetails,
                                              callback: function($$v) {
                                                _vm.$set(
                                                  _vm.model,
                                                  "paymentDetails",
                                                  $$v
                                                );
                                              },
                                              expression: "model.paymentDetails"
                                            }
                                          }),
                                          _vm._v(" "),
                                          _vm.paymentIsEnabled
                                            ? [
                                                _c(
                                                  "v-input",
                                                  { staticClass: "no-flex" },
                                                  [
                                                    _c("v-label", [
                                                      _vm._v("Payment Gateway")
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
                                                          "Select the integration that should be used to process these payments"
                                                        )
                                                      ]
                                                    ),
                                                    _vm._v(" "),
                                                    _c(
                                                      "fluro-content-select-button",
                                                      {
                                                        attrs: {
                                                          block: "",
                                                          type: "integration"
                                                        },
                                                        model: {
                                                          value:
                                                            _vm.model.data
                                                              .publicData
                                                              .paymentGateways,
                                                          callback: function(
                                                            $$v
                                                          ) {
                                                            _vm.$set(
                                                              _vm.model.data
                                                                .publicData,
                                                              "paymentGateways",
                                                              $$v
                                                            );
                                                          },
                                                          expression:
                                                            "model.data.publicData.paymentGateways"
                                                        }
                                                      }
                                                    )
                                                  ],
                                                  1
                                                ),
                                                _vm._v(" "),
                                                _c(
                                                  "fluro-panel",
                                                  { attrs: { margin: "" } },
                                                  [
                                                    _c(
                                                      "fluro-panel-body",
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
                                                                "Payment Modifiers"
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
                                                                  "Add payment modifiers to adjust the required payment amount depending on values entered by the user"
                                                                )
                                                              ]
                                                            ),
                                                            _vm._v(" "),
                                                            _c(
                                                              "payment-modifier-editor",
                                                              {
                                                                attrs: {
                                                                  form:
                                                                    _vm.model
                                                                },
                                                                model: {
                                                                  value:
                                                                    _vm.model
                                                                      .paymentDetails
                                                                      .modifiers,
                                                                  callback: function(
                                                                    $$v
                                                                  ) {
                                                                    _vm.$set(
                                                                      _vm.model
                                                                        .paymentDetails,
                                                                      "modifiers",
                                                                      $$v
                                                                    );
                                                                  },
                                                                  expression:
                                                                    "model.paymentDetails.modifiers"
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
                                                ),
                                                _vm._v(" "),
                                                _c("fluro-content-form", {
                                                  attrs: {
                                                    fields: _vm.dataFields
                                                  },
                                                  scopedSlots: _vm._u(
                                                    [
                                                      {
                                                        key: "form",
                                                        fn: function(ref) {
                                                          var formFields =
                                                            ref.formFields;
                                                          var fieldHash =
                                                            ref.fieldHash;
                                                          var model = ref.model;
                                                          var update =
                                                            ref.update;
                                                          var options =
                                                            ref.options;
                                                          return [
                                                            _c(
                                                              "fluro-content-form-field",
                                                              {
                                                                attrs: {
                                                                  "form-fields": formFields,
                                                                  options: options,
                                                                  field:
                                                                    fieldHash.enableReceipt
                                                                },
                                                                on: {
                                                                  input: update
                                                                },
                                                                model: {
                                                                  value: model,
                                                                  callback: function(
                                                                    $$v
                                                                  ) {
                                                                    model = $$v;
                                                                  },
                                                                  expression:
                                                                    "model"
                                                                }
                                                              }
                                                            )
                                                          ]
                                                        }
                                                      }
                                                    ],
                                                    null,
                                                    false,
                                                    3232139792
                                                  ),
                                                  model: {
                                                    value: _vm.model.data,
                                                    callback: function($$v) {
                                                      _vm.$set(
                                                        _vm.model,
                                                        "data",
                                                        $$v
                                                      );
                                                    },
                                                    expression: "model.data"
                                                  }
                                                }),
                                                _vm._v(" "),
                                                _c("fluro-content-form", {
                                                  attrs: {
                                                    fields: _vm.paymentFields
                                                  },
                                                  scopedSlots: _vm._u(
                                                    [
                                                      {
                                                        key: "form",
                                                        fn: function(ref) {
                                                          var formFields =
                                                            ref.formFields;
                                                          var fieldHash =
                                                            ref.fieldHash;
                                                          var model = ref.model;
                                                          var update =
                                                            ref.update;
                                                          var options =
                                                            ref.options;
                                                          return [
                                                            _c(
                                                              "fluro-content-form-field",
                                                              {
                                                                attrs: {
                                                                  "form-fields": formFields,
                                                                  options: options,
                                                                  field:
                                                                    fieldHash.allowAlternativePayments
                                                                },
                                                                on: {
                                                                  input: update
                                                                },
                                                                model: {
                                                                  value: model,
                                                                  callback: function(
                                                                    $$v
                                                                  ) {
                                                                    model = $$v;
                                                                  },
                                                                  expression:
                                                                    "model"
                                                                }
                                                              }
                                                            ),
                                                            _vm._v(" "),
                                                            model.allowAlternativePayments
                                                              ? _c(
                                                                  "fluro-panel",
                                                                  {
                                                                    attrs: {
                                                                      margin: ""
                                                                    }
                                                                  },
                                                                  [
                                                                    _c(
                                                                      "tabset",
                                                                      {
                                                                        model: {
                                                                          value:
                                                                            _vm.alternativePaymentMethodIndex,
                                                                          callback: function(
                                                                            $$v
                                                                          ) {
                                                                            _vm.alternativePaymentMethodIndex = $$v;
                                                                          },
                                                                          expression:
                                                                            "alternativePaymentMethodIndex"
                                                                        }
                                                                      },
                                                                      _vm._l(
                                                                        _vm.alternativePaymentMethods,
                                                                        function(
                                                                          method,
                                                                          index
                                                                        ) {
                                                                          return _c(
                                                                            "tab",
                                                                            {
                                                                              attrs: {
                                                                                heading:
                                                                                  method.title
                                                                              }
                                                                            },
                                                                            [
                                                                              _c(
                                                                                "fluro-panel-body",
                                                                                [
                                                                                  _c(
                                                                                    "fluro-content-form",
                                                                                    {
                                                                                      attrs: {
                                                                                        fields:
                                                                                          _vm.paymentMethodFields
                                                                                      },
                                                                                      model: {
                                                                                        value:
                                                                                          _vm
                                                                                            .alternativePaymentMethods[
                                                                                            index
                                                                                          ],
                                                                                        callback: function(
                                                                                          $$v
                                                                                        ) {
                                                                                          _vm.$set(
                                                                                            _vm.alternativePaymentMethods,
                                                                                            index,
                                                                                            $$v
                                                                                          );
                                                                                        },
                                                                                        expression:
                                                                                          "alternativePaymentMethods[index]"
                                                                                      }
                                                                                    }
                                                                                  ),
                                                                                  _vm._v(
                                                                                    " "
                                                                                  ),
                                                                                  _c(
                                                                                    "v-layout",
                                                                                    [
                                                                                      _c(
                                                                                        "v-spacer"
                                                                                      ),
                                                                                      _vm._v(
                                                                                        " "
                                                                                      ),
                                                                                      _c(
                                                                                        "v-flex",
                                                                                        {
                                                                                          attrs: {
                                                                                            shrink:
                                                                                              ""
                                                                                          }
                                                                                        },
                                                                                        [
                                                                                          _c(
                                                                                            "v-btn",
                                                                                            {
                                                                                              staticClass:
                                                                                                "ma-0",
                                                                                              attrs: {
                                                                                                small:
                                                                                                  "",
                                                                                                color:
                                                                                                  "error"
                                                                                              },
                                                                                              on: {
                                                                                                click: function(
                                                                                                  $event
                                                                                                ) {
                                                                                                  return _vm.removeAlternativePaymentMethod(
                                                                                                    method,
                                                                                                    index
                                                                                                  )
                                                                                                }
                                                                                              }
                                                                                            },
                                                                                            [
                                                                                              _vm._v(
                                                                                                "\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tRemove " +
                                                                                                  _vm._s(
                                                                                                    method.title
                                                                                                  ) +
                                                                                                  "\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t"
                                                                                              )
                                                                                            ]
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
                                                                        }
                                                                      ),
                                                                      1
                                                                    ),
                                                                    _vm._v(" "),
                                                                    _c(
                                                                      "fluro-panel-body",
                                                                      {
                                                                        staticClass:
                                                                          "border-top"
                                                                      },
                                                                      [
                                                                        _c(
                                                                          "v-btn",
                                                                          {
                                                                            staticClass:
                                                                              "ma-0",
                                                                            attrs: {
                                                                              color:
                                                                                "primary"
                                                                            },
                                                                            on: {
                                                                              click: function(
                                                                                $event
                                                                              ) {
                                                                                return _vm.addAlternativePaymentMethod()
                                                                              }
                                                                            }
                                                                          },
                                                                          [
                                                                            _vm._v(
                                                                              "Add additional payment method"
                                                                            )
                                                                          ]
                                                                        )
                                                                      ],
                                                                      1
                                                                    )
                                                                  ],
                                                                  1
                                                                )
                                                              : _vm._e()
                                                          ]
                                                        }
                                                      }
                                                    ],
                                                    null,
                                                    false,
                                                    2196227553
                                                  ),
                                                  model: {
                                                    value:
                                                      _vm.model.paymentDetails,
                                                    callback: function($$v) {
                                                      _vm.$set(
                                                        _vm.model,
                                                        "paymentDetails",
                                                        $$v
                                                      );
                                                    },
                                                    expression:
                                                      "model.paymentDetails"
                                                  }
                                                })
                                              ]
                                            : _vm._e()
                                        ],
                                        2
                                      )
                                    ]
                                  },
                                  proxy: true
                                }
                              ],
                              null,
                              false,
                              1275147049
                            ),
                            model: {
                              value: _vm.model.fields,
                              callback: function($$v) {
                                _vm.$set(_vm.model, "fields", $$v);
                              },
                              expression: "model.fields"
                            }
                          })
                        ],
                        1
                      )
                    ]
                  : [
                      _c(
                        "tab",
                        { attrs: { heading: "Configuration" } },
                        [
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
                                      _c(
                                        "fluro-panel",
                                        [
                                          _c(
                                            "fluro-panel-body",
                                            [
                                              _c(
                                                "v-layout",
                                                [
                                                  _c(
                                                    "v-flex",
                                                    {
                                                      attrs: {
                                                        xs12: "",
                                                        sm6: ""
                                                      }
                                                    },
                                                    [
                                                      _c(
                                                        "fluro-content-form-field",
                                                        {
                                                          attrs: {
                                                            "form-fields":
                                                              _vm.formFields,
                                                            outline:
                                                              _vm.showOutline,
                                                            options:
                                                              _vm.options,
                                                            field:
                                                              _vm.fieldHash
                                                                .title
                                                          },
                                                          on: {
                                                            input: _vm.update
                                                          },
                                                          model: {
                                                            value: _vm.model,
                                                            callback: function(
                                                              $$v
                                                            ) {
                                                              _vm.model = $$v;
                                                            },
                                                            expression: "model"
                                                          }
                                                        }
                                                      )
                                                    ],
                                                    1
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "v-flex",
                                                    {
                                                      attrs: {
                                                        xs12: "",
                                                        sm6: ""
                                                      }
                                                    },
                                                    [
                                                      _c(
                                                        "fluro-content-form-field",
                                                        {
                                                          attrs: {
                                                            "form-fields":
                                                              _vm.formFields,
                                                            outline:
                                                              _vm.showOutline,
                                                            options:
                                                              _vm.options,
                                                            field:
                                                              _vm.fieldHash
                                                                .plural
                                                          },
                                                          on: {
                                                            input: _vm.update
                                                          },
                                                          model: {
                                                            value: _vm.model,
                                                            callback: function(
                                                              $$v
                                                            ) {
                                                              _vm.model = $$v;
                                                            },
                                                            expression: "model"
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
                                              _vm.model._id
                                                ? [
                                                    _c(
                                                      "fluro-panel",
                                                      [
                                                        _c(
                                                          "fluro-panel-body",
                                                          [
                                                            _c(
                                                              "v-layout",
                                                              [
                                                                _c(
                                                                  "v-flex",
                                                                  {
                                                                    attrs: {
                                                                      xs12: "",
                                                                      sm6: ""
                                                                    }
                                                                  },
                                                                  [
                                                                    _c(
                                                                      "div",
                                                                      {
                                                                        staticClass:
                                                                          "form-group"
                                                                      },
                                                                      [
                                                                        _c(
                                                                          "label",
                                                                          [
                                                                            _vm._v(
                                                                              "Definition Name"
                                                                            )
                                                                          ]
                                                                        ),
                                                                        _vm._v(
                                                                          " "
                                                                        ),
                                                                        _c(
                                                                          "div",
                                                                          [
                                                                            _vm._v(
                                                                              _vm._s(
                                                                                _vm
                                                                                  .model
                                                                                  .definitionName
                                                                              )
                                                                            )
                                                                          ]
                                                                        )
                                                                      ]
                                                                    )
                                                                  ]
                                                                ),
                                                                _vm._v(" "),
                                                                _c(
                                                                  "v-flex",
                                                                  {
                                                                    attrs: {
                                                                      xs12: "",
                                                                      sm6: ""
                                                                    }
                                                                  },
                                                                  [
                                                                    _c(
                                                                      "div",
                                                                      {
                                                                        staticClass:
                                                                          "form-group"
                                                                      },
                                                                      [
                                                                        _c(
                                                                          "label",
                                                                          [
                                                                            _vm._v(
                                                                              "Extends type"
                                                                            )
                                                                          ]
                                                                        ),
                                                                        _vm._v(
                                                                          " "
                                                                        ),
                                                                        _c(
                                                                          "div",
                                                                          [
                                                                            _vm._v(
                                                                              _vm._s(
                                                                                _vm._f(
                                                                                  "definitionTitle"
                                                                                )(
                                                                                  _vm
                                                                                    .model
                                                                                    .parentType
                                                                                )
                                                                              )
                                                                            )
                                                                          ]
                                                                        )
                                                                      ]
                                                                    )
                                                                  ]
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
                                                  ]
                                                : [
                                                    _c(
                                                      "div",
                                                      {
                                                        directives: [
                                                          {
                                                            name: "show",
                                                            rawName: "v-show",
                                                            value:
                                                              _vm.showDefinitionName,
                                                            expression:
                                                              "showDefinitionName"
                                                          }
                                                        ]
                                                      },
                                                      [
                                                        _c(
                                                          "fluro-content-form-field",
                                                          {
                                                            attrs: {
                                                              "form-fields":
                                                                _vm.formFields,
                                                              outline:
                                                                _vm.showOutline,
                                                              options:
                                                                _vm.options,
                                                              field:
                                                                _vm.fieldHash
                                                                  .definitionName
                                                            },
                                                            on: {
                                                              input: _vm.update
                                                            },
                                                            model: {
                                                              value: _vm.model,
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
                                                    ),
                                                    _vm._v(" "),
                                                    _vm.lockedSubType
                                                      ? void 0
                                                      : [
                                                          _c(
                                                            "fluro-content-form-field",
                                                            {
                                                              attrs: {
                                                                "form-fields":
                                                                  _vm.formFields,
                                                                outline:
                                                                  _vm.showOutline,
                                                                options:
                                                                  _vm.options,
                                                                field:
                                                                  _vm.fieldHash
                                                                    .parentType
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
                                                          ),
                                                          _vm._v(" "),
                                                          _c(
                                                            "fluro-panel",
                                                            [
                                                              _c(
                                                                "fluro-panel-body",
                                                                [
                                                                  _c(
                                                                    "v-layout",
                                                                    [
                                                                      _c(
                                                                        "v-flex",
                                                                        {
                                                                          attrs: {
                                                                            xs12:
                                                                              "",
                                                                            sm6:
                                                                              ""
                                                                          }
                                                                        },
                                                                        [
                                                                          _c(
                                                                            "div",
                                                                            {
                                                                              staticClass:
                                                                                "form-group"
                                                                            },
                                                                            [
                                                                              _c(
                                                                                "label",
                                                                                [
                                                                                  _vm._v(
                                                                                    "Definition Name"
                                                                                  )
                                                                                ]
                                                                              ),
                                                                              _vm._v(
                                                                                " "
                                                                              ),
                                                                              _c(
                                                                                "div",
                                                                                [
                                                                                  _vm._v(
                                                                                    _vm._s(
                                                                                      _vm
                                                                                        .model
                                                                                        .definitionName
                                                                                    )
                                                                                  )
                                                                                ]
                                                                              )
                                                                            ]
                                                                          )
                                                                        ]
                                                                      ),
                                                                      _vm._v(
                                                                        " "
                                                                      ),
                                                                      _c(
                                                                        "v-flex",
                                                                        {
                                                                          attrs: {
                                                                            xs12:
                                                                              "",
                                                                            sm6:
                                                                              ""
                                                                          }
                                                                        },
                                                                        [
                                                                          _c(
                                                                            "div",
                                                                            {
                                                                              staticClass:
                                                                                "form-group"
                                                                            },
                                                                            [
                                                                              _c(
                                                                                "label",
                                                                                [
                                                                                  _vm._v(
                                                                                    "Extends type"
                                                                                  )
                                                                                ]
                                                                              ),
                                                                              _vm._v(
                                                                                " "
                                                                              ),
                                                                              _c(
                                                                                "div",
                                                                                [
                                                                                  _vm._v(
                                                                                    _vm._s(
                                                                                      _vm._f(
                                                                                        "definitionTitle"
                                                                                      )(
                                                                                        _vm
                                                                                          .model
                                                                                          .parentType
                                                                                      )
                                                                                    )
                                                                                  )
                                                                                ]
                                                                              )
                                                                            ]
                                                                          )
                                                                        ]
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
                                                        ]
                                                  ],
                                              _vm._v(" "),
                                              _c("fluro-content-form-field", {
                                                attrs: {
                                                  "form-fields": _vm.formFields,
                                                  outline: _vm.showOutline,
                                                  options: _vm.options,
                                                  field: _vm.fieldHash.privacy
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
                                            2
                                          )
                                        ],
                                        1
                                      ),
                                      _vm._v(" "),
                                      _vm.model.parentType == "process"
                                        ? _c(
                                            "fluro-panel",
                                            [
                                              _c(
                                                "fluro-panel-body",
                                                [
                                                  _c(
                                                    "h4",
                                                    { attrs: { margin: "" } },
                                                    [
                                                      _vm._v(
                                                        "Process Board Options"
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
                                                        outline:
                                                          _vm.showOutline,
                                                        options: _vm.options,
                                                        field:
                                                          _vm.fieldHash
                                                            .firstLine
                                                      },
                                                      on: { input: _vm.update },
                                                      model: {
                                                        value: _vm.model,
                                                        callback: function(
                                                          $$v
                                                        ) {
                                                          _vm.model = $$v;
                                                        },
                                                        expression: "model"
                                                      }
                                                    }
                                                  ),
                                                  _vm._v(" "),
                                                  _c("fluro-content-form", {
                                                    attrs: {
                                                      fields: _vm.processFields
                                                    },
                                                    model: {
                                                      value: _vm.model.data,
                                                      callback: function($$v) {
                                                        _vm.$set(
                                                          _vm.model,
                                                          "data",
                                                          $$v
                                                        );
                                                      },
                                                      expression: "model.data"
                                                    }
                                                  })
                                                ],
                                                1
                                              )
                                            ],
                                            1
                                          )
                                        : _vm._e(),
                                      _vm._v(" "),
                                      _vm.model.parentType == "roster"
                                        ? _c(
                                            "fluro-panel",
                                            [
                                              _c(
                                                "tabset",
                                                { attrs: { justified: "" } },
                                                [
                                                  _c(
                                                    "tab",
                                                    {
                                                      attrs: {
                                                        heading:
                                                          "Roster Settings"
                                                      }
                                                    },
                                                    [
                                                      _c(
                                                        "fluro-panel-body",
                                                        [
                                                          _c(
                                                            "fluro-content-form-field",
                                                            {
                                                              attrs: {
                                                                "form-fields":
                                                                  _vm.formFields,
                                                                outline:
                                                                  _vm.showOutline,
                                                                options:
                                                                  _vm.options,
                                                                field:
                                                                  _vm.fieldHash
                                                                    .weight
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
                                                          ),
                                                          _vm._v(" "),
                                                          _c(
                                                            "fluro-content-form",
                                                            {
                                                              attrs: {
                                                                fields:
                                                                  _vm.rosterFields
                                                              },
                                                              model: {
                                                                value:
                                                                  _vm.model
                                                                    .data,
                                                                callback: function(
                                                                  $$v
                                                                ) {
                                                                  _vm.$set(
                                                                    _vm.model,
                                                                    "data",
                                                                    $$v
                                                                  );
                                                                },
                                                                expression:
                                                                  "model.data"
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
                                                        heading: "Default Slots"
                                                      }
                                                    },
                                                    [
                                                      _c(
                                                        "roster-slot-manager",
                                                        {
                                                          model: {
                                                            value:
                                                              _vm.model.data
                                                                .slots,
                                                            callback: function(
                                                              $$v
                                                            ) {
                                                              _vm.$set(
                                                                _vm.model.data,
                                                                "slots",
                                                                $$v
                                                              );
                                                            },
                                                            expression:
                                                              "model.data.slots"
                                                          }
                                                        }
                                                      )
                                                    ],
                                                    1
                                                  ),
                                                  _vm._v(" "),
                                                  _c("tab", {
                                                    attrs: {
                                                      heading: "Reminders"
                                                    }
                                                  }),
                                                  _vm._v(" "),
                                                  _c(
                                                    "tab",
                                                    {
                                                      attrs: {
                                                        heading:
                                                          "Roster Restrictions"
                                                      }
                                                    },
                                                    [
                                                      _c(
                                                        "fluro-panel-body",
                                                        [
                                                          _c(
                                                            "fluro-content-form",
                                                            {
                                                              attrs: {
                                                                fields:
                                                                  _vm.restrictionFields
                                                              },
                                                              model: {
                                                                value:
                                                                  _vm.model
                                                                    .data,
                                                                callback: function(
                                                                  $$v
                                                                ) {
                                                                  _vm.$set(
                                                                    _vm.model,
                                                                    "data",
                                                                    $$v
                                                                  );
                                                                },
                                                                expression:
                                                                  "model.data"
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
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _vm.fieldsMakeSense
                        ? _c(
                            "tab",
                            { attrs: { heading: "Manage Fields" } },
                            [
                              _c("fluro-field-editor", {
                                attrs: { item: _vm.model },
                                model: {
                                  value: _vm.model.fields,
                                  callback: function($$v) {
                                    _vm.$set(_vm.model, "fields", $$v);
                                  },
                                  expression: "model.fields"
                                }
                              })
                            ],
                            1
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.definition && _vm.definition.definitionName != "form"
                        ? _c(
                            "tab",
                            {
                              attrs: {
                                heading: _vm.definition.title + " Information"
                              }
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
                                          _c("fluro-content-form", {
                                            attrs: {
                                              options:
                                                _vm.definitionFormOptions,
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
                        { attrs: { heading: "Advanced" } },
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
                                      _vm.model.parentType != "realm"
                                        ? _c(
                                            "fluro-panel",
                                            [
                                              _c("fluro-panel-title", [
                                                _c("h5", [
                                                  _vm._v("Restrict To Realms")
                                                ]),
                                                _vm._v(" "),
                                                _c(
                                                  "div",
                                                  { staticClass: "muted" },
                                                  [
                                                    _vm._v(
                                                      "Select which realms these " +
                                                        _vm._s(
                                                          _vm._f(
                                                            "definitionTitle"
                                                          )(
                                                            _vm.model
                                                              .parentType,
                                                            true
                                                          )
                                                        ) +
                                                        " can be created in"
                                                    )
                                                  ]
                                                )
                                              ]),
                                              _vm._v(" "),
                                              _c(
                                                "fluro-panel-body",
                                                [
                                                  _c("fluro-realm-select", {
                                                    model: {
                                                      value:
                                                        _vm.model
                                                          .restrictRealms,
                                                      callback: function($$v) {
                                                        _vm.$set(
                                                          _vm.model,
                                                          "restrictRealms",
                                                          $$v
                                                        );
                                                      },
                                                      expression:
                                                        "model.restrictRealms"
                                                    }
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
                        ],
                        1
                      )
                    ]
              ],
              2
            )
          ]
    ],
    2
  )
};
var __vue_staticRenderFns__$6 = [];
__vue_render__$6._withStripped = true;

  /* style */
  const __vue_inject_styles__$6 = function (inject) {
    if (!inject) return
    inject("data-v-8c7a7848_0", { source: "/**/\n.border-top[data-v-8c7a7848] {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right[data-v-8c7a7848] {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom[data-v-8c7a7848] {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left[data-v-8c7a7848] {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.field-row[data-v-8c7a7848] {\n  padding: 0 15px;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n}\n\n/*# sourceMappingURL=definition.vue.map */", map: {"version":3,"sources":["C:\\Users\\User\\Documents\\fluro\\fluro-vue-ui\\src\\components\\content\\edit\\panels\\definition.vue","definition.vue"],"names":[],"mappings":"AA8xDA,GAAA;AAYA;EACA,yCAAA;ACxyDA;AD2yDA;EACA,2CAAA;ACxyDA;AD2yDA;EACA,4CAAA;ACxyDA;AD2yDA;EACA,0CAAA;ACxyDA;;ADgzDA,GAAA;AACA;EACA,eAAA;EACA,2CAAA;AC7yDA;;AAEA,yCAAyC","file":"definition.vue","sourcesContent":["<template>\n\t<flex-column>\n\t\t<template v-if=\"loading\">\n\t\t\t<fluro-page-preloader contain />\n\t\t</template>\n\t\t<template v-else>\n\t\t\t<tabset v-model=\"tabIndex\" :justified=\"true\">\n\t\t\t\t<template v-if=\"isForm\">\n\t\t\t\t\t<tab heading=\"Form Fields\">\n\t\t\t\t\t\t<fluro-field-editor v-model=\"model.fields\" :item=\"model\">\n\t\t\t\t\t\t\t<template v-slot:form>\n\t\t\t\t\t\t\t\t<v-container>\n\t\t\t\t\t\t\t\t\t<constrain sm>\n\t\t\t\t\t\t\t\t\t\t<fluro-panel margin>\n\t\t\t\t\t\t\t\t\t\t\t<fluro-panel-title>\n\t\t\t\t\t\t\t\t\t\t\t\t<strong>Configuration</strong>\n\t\t\t\t\t\t\t\t\t\t\t</fluro-panel-title>\n\t\t\t\t\t\t\t\t\t\t\t<fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t<v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm6>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.title\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm6>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.plural\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t<template v-if=\"!model._id\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div v-show=\"showDefinitionName\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.definitionName\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.privacy\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t</fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t</fluro-panel>\n\t\t\t\t\t\t\t\t\t\t<!-- <pre>{{model.data}}</pre> -->\n\t\t\t\t\t\t\t\t\t\t<fluro-panel margin>\n\t\t\t\t\t\t\t\t\t\t\t<fluro-panel-title>\n\t\t\t\t\t\t\t\t\t\t\t\t<strong>Contact Creation</strong>\n\t\t\t\t\t\t\t\t\t\t\t</fluro-panel-title>\n\t\t\t\t\t\t\t\t\t\t\t<fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form v-model=\"model.data\" :fields=\"dataFields\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<template v-slot:form=\"{formFields, fieldHash, model, update, options}\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <pre>{{model}}</pre> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.allowAnonymous\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<template v-if=\"!model.allowAnonymous && !model.disableDefaultFields\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.identifier\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t\t\t\t\t</fluro-content-form>\n\t\t\t\t\t\t\t\t\t\t\t</fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t</fluro-panel>\n\t\t\t\t\t\t\t\t\t\t<fluro-panel margin>\n\t\t\t\t\t\t\t\t\t\t\t<fluro-panel-title>\n\t\t\t\t\t\t\t\t\t\t\t\t<strong>Optional Fields</strong>\n\t\t\t\t\t\t\t\t\t\t\t</fluro-panel-title>\n\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form v-model=\"model.data\" :fields=\"dataFields\">\n\t\t\t\t\t\t\t\t\t\t\t\t<template v-slot:form=\"{formFields, fieldHash, model, update, options}\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<template v-if=\"model.allowAnonymous\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"field-row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-layout align-center>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs4>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-label>First Name</v-label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs4>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.askFirstName\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs4>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.requireFirstName\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"field-row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-layout align-center>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs4>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-label>Last Name</v-label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs4>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.askLastName\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs4>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.requireLastName\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"field-row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-layout align-center>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs4>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-label>Email Address</v-label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs4>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.askEmail\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs4>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.requireEmail\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"field-row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-layout align-center>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs4>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-label>Phone Number</v-label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs4>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.askPhone\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs4>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.requirePhone\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"field-row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-layout align-center>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs4>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-label>Gender</v-label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs4>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.askGender\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs4>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.requireGender\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"field-row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-layout align-center>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs4>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-label>Date of Birth</v-label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs4>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.askDOB\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs4>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.requireDOB\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel-body class=\"border-top\" v-if=\"model.allowAnonymous\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.disableBestGuess\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t\t\t\t</fluro-content-form>\n\t\t\t\t\t\t\t\t\t\t</fluro-panel>\n\t\t\t\t\t\t\t\t\t\t<fluro-panel margin v-if=\"definition\">\n\t\t\t\t\t\t\t\t\t\t\t<fluro-panel-title>\n\t\t\t\t\t\t\t\t\t\t\t\t<strong>{{definition.title}} Information</strong>\n\t\t\t\t\t\t\t\t\t\t\t</fluro-panel-title>\n\t\t\t\t\t\t\t\t\t\t\t<fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form :options=\"definitionFormOptions\" v-model=\"model.data\" :fields=\"definition.fields\" />\n\t\t\t\t\t\t\t\t\t\t\t</fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t</fluro-panel>\n\t\t\t\t\t\t\t\t\t\t<v-container pa-0 grid-list-xl>\n\t\t\t\t\t\t\t\t\t\t\t<v-layout row wrap>\n\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm6>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.publishDate\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm6>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.archiveDate\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t\t</v-container>\n\t\t\t\t\t\t\t\t\t\t<fluro-panel margin>\n\t\t\t\t\t\t\t\t\t\t\t<fluro-panel-title>\n\t\t\t\t\t\t\t\t\t\t\t\t<Strong>Automation and other settings</Strong>\n\t\t\t\t\t\t\t\t\t\t\t</fluro-panel-title>\n\t\t\t\t\t\t\t\t\t\t\t<tabset>\n\t\t\t\t\t\t\t\t\t\t\t\t<tab heading=\"Notifications\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form v-model=\"model.data\" :fields=\"dataFields\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<template v-slot:form=\"{formFields, fieldHash, model, update, options}\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.enableConfirmation\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.includeTickets\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.confirmationMessage\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.notifyContacts\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.enableReceipt\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-content-form>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t\t\t\t\t<tab heading=\"Processes\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form v-model=\"model.data\" :fields=\"dataFields\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<template v-slot:form=\"{formFields, fieldHash, model, update, options}\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.interactionProcesses\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.contactProcesses\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.contactProcessesAll\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.processAssignTo\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-content-form>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t\t\t\t\t<tab heading=\"Groups and Teams\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form v-model=\"model.data\" :fields=\"dataFields\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<template v-slot:form=\"{formFields, fieldHash, model, update, options}\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.contactTeams\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.contactTeamsAll\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-content-form>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t\t\t\t\t<tab heading=\"Capabilities\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form v-model=\"model.data\" :fields=\"dataFields\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<template v-slot:form=\"{formFields, fieldHash, model, update, options}\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.contactCapabilities\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.capabilitiesAll\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-content-form>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t\t\t\t\t<tab heading=\"Reaction Pipelines\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form v-model=\"model.data\" :fields=\"dataFields\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<template v-slot:form=\"{formFields, fieldHash, model, update, options}\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.reactionPipelines\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-content-form>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t\t\t\t\t<tab heading=\"Other Options\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form v-model=\"model.data\" :fields=\"dataFields\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<template v-slot:form=\"{formFields, fieldHash, model, update, options}\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.blc\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-content-form>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t\t\t\t</tabset>\n\t\t\t\t\t\t\t\t\t\t</fluro-panel>\n\t\t\t\t\t\t\t\t\t</constrain>\n\t\t\t\t\t\t\t\t</v-container>\n\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t<template v-slot:payment>\n\t\t\t\t\t\t\t\t<v-container>\n\t\t\t\t\t\t\t\t\t<fluro-content-form v-model=\"model.paymentDetails\" :fields=\"paymentFields\">\n\t\t\t\t\t\t\t\t\t\t<template v-slot:form=\"{formFields, fieldHash, model, update, options}\">\n\t\t\t\t\t\t\t\t\t\t\t<fluro-panel margin>\n\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.required\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.allow\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t<template v-if=\"paymentIsEnabled\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<v-container pa-0>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel-body class=\"border-top\" v-if=\"model.required\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs9>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.amount\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs3>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.currency\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel-body class=\"border-top\" v-if=\"model.allow && !model.required\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.currency\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm6>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.minAmount\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm6>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.maxAmount\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t\t\t\t</fluro-panel>\n\t\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t\t</fluro-content-form>\n\t\t\t\t\t\t\t\t\t<template v-if=\"paymentIsEnabled\">\n\t\t\t\t\t\t\t\t\t\t<v-input class=\"no-flex\">\n\t\t\t\t\t\t\t\t\t\t\t<v-label>Payment Gateway</v-label>\n\t\t\t\t\t\t\t\t\t\t\t<p class=\"help-block\">Select the integration that should be used to process these payments</p>\n\t\t\t\t\t\t\t\t\t\t\t<!-- <fluro-panel-body class=\"border-top\"> -->\n\t\t\t\t\t\t\t\t\t\t\t<fluro-content-select-button block type=\"integration\" v-model=\"model.data.publicData.paymentGateways\" />\n\t\t\t\t\t\t\t\t\t\t\t<!-- </fluro-panel-body> -->\n\t\t\t\t\t\t\t\t\t\t</v-input>\n\t\t\t\t\t\t\t\t\t\t<fluro-panel margin>\n\t\t\t\t\t\t\t\t\t\t\t<fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t<v-input class=\"no-flex\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<v-label>Payment Modifiers</v-label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<p class=\"help-block\">Add payment modifiers to adjust the required payment amount depending on values entered by the user</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<payment-modifier-editor :form=\"model\" v-model=\"model.paymentDetails.modifiers\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <pre>{{model.paymentDetails.modifiers}}</pre> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <fluro-panel-body class=\"border-top\"> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <fluro-content-select-button block type=\"integration\" v-model=\"model.data.publicData.paymentGateways\" /> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- </fluro-panel-body> -->\n\t\t\t\t\t\t\t\t\t\t\t\t</v-input>\n\t\t\t\t\t\t\t\t\t\t\t</fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t</fluro-panel>\n\t\t\t\t\t\t\t\t\t\t<fluro-content-form v-model=\"model.data\" :fields=\"dataFields\">\n\t\t\t\t\t\t\t\t\t\t\t<template v-slot:form=\"{formFields, fieldHash, model, update, options}\">\n\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.enableReceipt\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t\t\t</fluro-content-form>\n\t\t\t\t\t\t\t\t\t\t<fluro-content-form v-model=\"model.paymentDetails\" :fields=\"paymentFields\">\n\t\t\t\t\t\t\t\t\t\t\t<template v-slot:form=\"{formFields, fieldHash, model, update, options}\">\n\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.allowAlternativePayments\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel margin v-if=\"model.allowAlternativePayments\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<tabset v-model=\"alternativePaymentMethodIndex\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tab :heading=\"method.title\" v-for=\"(method, index) in alternativePaymentMethods\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form v-model=\"alternativePaymentMethods[index]\" :fields=\"paymentMethodFields\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <template v-slot:form=\"{formFields, fieldHash, model, update, options}\"> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- </template> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- </fluro-content-form> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-spacer />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex shrink>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-btn class=\"ma-0\" small color=\"error\" @click=\"removeAlternativePaymentMethod(method, index)\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tRemove {{method.title}}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-btn>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</tabset>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel-body class=\"border-top\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- {{alternativePaymentMethodIndex}} -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-btn class=\"ma-0\" @click=\"addAlternativePaymentMethod()\" color=\"primary\">Add additional payment method</v-btn>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel>\n\t\t\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t\t\t</fluro-content-form>\n\t\t\t\t\t\t\t\t\t\t<!-- <pre>{{alternativePaymentMethods}}</pre> -->\n\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t</v-container>\n\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t</fluro-field-editor>\n\t\t\t\t\t</tab>\n\t\t\t\t</template>\n\t\t\t\t<template v-else>\n\t\t\t\t\t<tab heading=\"Configuration\">\n\t\t\t\t\t\t<flex-column-body style=\"background: #fafafa;\">\n\t\t\t\t\t\t\t<v-container grid-list-xl>\n\t\t\t\t\t\t\t\t<constrain sm>\n\t\t\t\t\t\t\t\t\t<fluro-panel>\n\t\t\t\t\t\t\t\t\t\t<fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t<v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm6>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.title\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm6>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.plural\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t\t\t<template v-if=\"model._id\">\n\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm6>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>Definition Name</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div>{{model.definitionName}}</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm6>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>Extends type</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div>{{model.parentType | definitionTitle}}</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel>\n\t\t\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t\t\t\t<template v-else>\n\t\t\t\t\t\t\t\t\t\t\t\t<div v-show=\"showDefinitionName\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.definitionName\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t<template v-if=\"lockedSubType\">\n\t\t\t\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t\t\t\t\t<template v-else>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.parentType\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm6>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>Definition Name</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div>{{model.definitionName}}</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm6>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>Extends type</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div>{{model.parentType | definitionTitle}}</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel>\n\t\t\t\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.privacy\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t</fluro-panel-body>\n\t\t\t\t\t\t\t\t\t</fluro-panel>\n\t\t\t\t\t\t\t\t\t<fluro-panel v-if=\"model.parentType == 'process'\">\n\t\t\t\t\t\t\t\t\t\t<fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t<h4 margin>Process Board Options</h4>\n\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.firstLine\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form v-model=\"model.data\" :fields=\"processFields\" />\n\t\t\t\t\t\t\t\t\t\t</fluro-panel-body>\n\t\t\t\t\t\t\t\t\t</fluro-panel>\n\t\t\t\t\t\t\t\t\t<fluro-panel v-if=\"model.parentType == 'roster'\">\n\t\t\t\t\t\t\t\t\t\t<tabset justified>\n\t\t\t\t\t\t\t\t\t\t\t<tab heading=\"Roster Settings\">\n\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.weight\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form v-model=\"model.data\" :fields=\"rosterFields\" />\n\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t\t\t\t<tab heading=\"Default Slots\">\n\t\t\t\t\t\t\t\t\t\t\t\t<roster-slot-manager v-model=\"model.data.slots\" />\n\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t\t\t\t<tab heading=\"Reminders\">\n\t\t\t\t\t\t\t\t\t\t\t\t<!-- <roster-slot-manager v-model=\"model.data.slots\" /> -->\n\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t\t\t\t<tab heading=\"Roster Restrictions\">\n\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form v-model=\"model.data\" :fields=\"restrictionFields\" />\n\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t\t\t</tabset>\n\t\t\t\t\t\t\t\t\t\t<!-- <fluro-panel-body> -->\n\t\t\t\t\t\t\t\t\t\t<!-- <h4 margin>Roster Options</h4> -->\n\t\t\t\t\t\t\t\t\t\t<!-- <div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t<label>Notifications</label>\n\t\t\t\t\t\t\t\t\t\t\t\t<p class=\"help-block\">Select contacts who should be notified when volunteers decline/swap positions on rosters of this type </p>\n\t\t\t\t\t\t\t\t\t\t\t\t<content-select ng-params=\"{type:'contact'}\" ng-model=\"item.data.notifyContacts\"></content-select>\n\t\t\t\t\t\t\t\t\t\t\t</div> -->\n\t\t\t\t\t\t\t\t\t\t<!-- </fluro-panel-body> -->\n\t\t\t\t\t\t\t\t\t</fluro-panel>\n\t\t\t\t\t\t\t\t\t<!-- <roster-slot-manager v-model=\"slots\" /> -->\n\t\t\t\t\t\t\t\t</constrain>\n\t\t\t\t\t\t\t</v-container>\n\t\t\t\t\t\t</flex-column-body>\n\t\t\t\t\t</tab>\n\t\t\t\t\t<tab heading=\"Manage Fields\" v-if=\"fieldsMakeSense\">\n\t\t\t\t\t\t<!-- <pre>MANAGE {{model.fields}}</pre> -->\n\t\t\t\t\t\t<fluro-field-editor v-model=\"model.fields\" :item=\"model\" />\n\t\t\t\t\t</tab>\n\t\t\t\t\t<!-- <tab heading=\"Process Options\" v-if=\"model.parentType == 'process'\">\n\t  <flex-column-body style=\"background: #fafafa;\">\n\t   <v-container>\n\t\t<constrain sm>\n\t\t <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.firstLine\" v-model=\"model\" />\n\t\t <fluro-content-form v-model=\"model.data\" :fields=\"processFields\" />\n\t\t</constrain>\n\t   </v-container>\n\t  </flex-column-body>\n\t </tab> -->\n\t\t\t\t\t<tab :heading=\"`${definition.title} Information`\" v-if=\"definition && definition.definitionName != 'form'\">\n\t\t\t\t\t\t<flex-column-body style=\"background: #fafafa;\">\n\t\t\t\t\t\t\t<v-container>\n\t\t\t\t\t\t\t\t<constrain sm>\n\t\t\t\t\t\t\t\t\t<fluro-content-form :options=\"definitionFormOptions\" v-model=\"model.data\" :fields=\"definition.fields\" />\n\t\t\t\t\t\t\t\t</constrain>\n\t\t\t\t\t\t\t</v-container>\n\t\t\t\t\t\t</flex-column-body>\n\t\t\t\t\t</tab>\n\t\t\t\t\t<tab heading=\"Advanced\">\n\t\t\t\t\t\t<flex-column-body style=\"background: #fafafa;\">\n\t\t\t\t\t\t\t<v-container>\n\t\t\t\t\t\t\t\t<constrain sm>\n\t\t\t\t\t\t\t\t\t<fluro-panel v-if=\"model.parentType != 'realm'\">\n\t\t\t\t\t\t\t\t\t\t<fluro-panel-title>\n\t\t\t\t\t\t\t\t\t\t\t<h5>Restrict To Realms</h5>\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"muted\">Select which realms these {{model.parentType | definitionTitle(true)}} can be created in</div>\n\t\t\t\t\t\t\t\t\t\t</fluro-panel-title>\n\t\t\t\t\t\t\t\t\t\t<fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t<fluro-realm-select v-model=\"model.restrictRealms\" />\n\t\t\t\t\t\t\t\t\t\t</fluro-panel-body>\n\t\t\t\t\t\t\t\t\t</fluro-panel>\n\t\t\t\t\t\t\t\t\t<!-- <fluro-panel>\n\t\t\t\t\t\t\t\t\t\t<fluro-panel-title>\n\t\t\t\t\t\t\t\t\t\t\t<h5>Display Columns</h5>\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"muted\">Select columns to show when listing these {{model.parentType | definitionTitle(true)}}</div>\n\t\t\t\t\t\t\t\t\t\t</fluro-panel-title>\n\t\t\t\t\t\t\t\t\t\t<fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t<fluro-column-select v-model=\"model.columns\"/>\n\t\t\t\t\t\t\t\t\t\t</fluro-panel-body>\n\t\t\t\t\t\t\t\t\t</fluro-panel>\n\n\t\t\t\t\t\t\t\t\t<fluro-panel>\n\t\t\t\t\t\t\t\t\t\t<fluro-panel-title>\n\t\t\t\t\t\t\t\t\t\t\t<h5>Filters</h5>\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"muted\">Configure filters that can be used when listing these {{model.parentType | definitionTitle(true)}}</div>\n\t\t\t\t\t\t\t\t\t\t</fluro-panel-title>\n\t\t\t\t\t\t\t\t\t\t<fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t<fluro-column-select v-model=\"model.filters\"/>\n\t\t\t\t\t\t\t\t\t\t</fluro-panel-body>\n\t\t\t\t\t\t\t\t\t</fluro-panel> -->\n\t\t\t\t\t\t\t\t\t<!-- <fluro-panel v-if=\"model.parentType == 'process'\">\n\t\t\t\t\t\t\t\t\t\t<fluro-panel-title>\n\t\t\t\t\t\t\t\t\t\t\t<h5>Reference Item Filters</h5>\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"muted\">Add Keys for filtering cards based on their referenced item</div>\n\t\t\t\t\t\t\t\t\t\t</fluro-panel-title>\n\t\t\t\t\t\t\t\t\t\t<fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t   \n\t\t\t\t\t\t\t\t\t\t\t<fluro-column-select v-model=\"model.data.processReferenceFilters\"/>\n\t\t\t\t\t\t\t\t\t\t</fluro-panel-body>\n\n\t\t\t\t\t\t\t\t\t\t<pre>{{model.data.processReferenceFilters}}</pre>\n\t\t\t\t\t\t\t\t\t</fluro-panel> -->\n\t\t\t\t\t\t\t\t</constrain>\n\t\t\t\t\t\t\t</v-container>\n\t\t\t\t\t\t</flex-column-body>\n\t\t\t\t\t</tab>\n\t\t\t\t</template>\n\t\t\t</tabset>\n\t\t</template>\n\t</flex-column>\n</template>\n<script>\n/////////////////////////////////\n\nimport FluroContentEditMixin from 'src/components/content/edit/FluroContentEditMixin.js';\nimport PaymentModifierEditor from 'src/components/content/edit/components/PaymentModifierEditor.vue';\nimport FluroColumnSelect from 'src/components/content/edit/components/FluroColumnSelect.vue';\nimport FluroFieldEditor from 'src/components/fields/FluroFieldEditor.vue';\nimport FluroContentSelectButton from 'src/components/form/contentselect/FluroContentSelectButton.vue';\nimport FieldTemplates from 'src/components/fields/FieldEditorTemplates.js';\nimport _ from 'lodash';\n\n\n\n/////////////////////////////////\n\nimport Vue from 'vue';\n\n/////////////////////////////////\n\nexport default {\n\tcomponents: {\n\t\tFluroFieldEditor,\n\t\tFluroContentSelectButton,\n\t\tPaymentModifierEditor,\n\t\tFluroColumnSelect,\n\t\t//RosterSlotManager,\n\t\t// FluroEditor,\n\t},\n\tmixins: [FluroContentEditMixin],\n\tmethods: {\n\n\t\tsetParentType(parentType) {\n\t\t\tvar self = this;\n\n\t\t\tswitch (parentType) {\n\t\t\t\tcase 'interaction':\n\n\n\t\t\t\t\tif (!self.model.privacy) {\n\t\t\t\t\t\tself.$set(self.model, 'privacy', 'public');\n\t\t\t\t\t}\n\n\t\t\t\t\tif (!self.model.paymentDetails) {\n\t\t\t\t\t\tself.$set(self.model, 'paymentDetails', {});\n\t\t\t\t\t\t// console.log('SET THE PAYMENT DETAILS NOW!!')\n\t\t\t\t\t}\n\n\t\t\t\t\tif (!self.model.data) {\n\t\t\t\t\t\tself.$set(self.model, 'data', {});\n\t\t\t\t\t}\n\n\n\t\t\t\t\tif (!self.model._id) {\n\t\t\t\t\t\t//Start off with the basic fields\n\t\t\t\t\t\tself.$set(self.model.data, 'allowAnonymous', true);\n\t\t\t\t\t}\n\n\t\t\t\t\tif (!self.model.fields || !self.model.fields.length) {\n\t\t\t\t\t\tself.$set(self.model, 'fields', []);\n\n\n\t\t\t\t\t\tvar getPersonField = _.find(FieldTemplates, { key: 'person' });\n\t\t\t\t\t\tvar copy = JSON.parse(JSON.stringify(getPersonField.field))\n\t\t\t\t\t\tcopy.key = 'contact';\n\t\t\t\t\t\tcopy.title = 'Contact';\n\t\t\t\t\t\tself.model.fields.push(copy);\n\t\t\t\t\t}\n\n\t\t\t\t\tif (!self.model.data.publicData) {\n\t\t\t\t\t\tself.$set(self.model.data, 'publicData', {});\n\t\t\t\t\t}\n\n\t\t\t\t\tif (!self.model.data.publicData.paymentGateways) {\n\t\t\t\t\t\tself.$set(self.model.data.publicData, 'paymentGateways', []);\n\t\t\t\t\t}\n\t\t\t\t\tbreak;\n\t\t\t}\n\t\t},\n\t\tremoveAlternativePaymentMethod(method, index) {\n\t\t\tvar self = this;\n\t\t\t// var index = self.model.paymentDetails.paymentMethods.indexOf(method);\n\n\t\t\t// if (index != -1) {\n\t\t\tself.$set(method, 'enabled', false);\n\t\t\tself.model.paymentDetails.paymentMethods.splice(index, 1);\n\t\t\tsetTimeout(function() {\n\n\n\t\t\t\tself.alternativePaymentMethodIndex = 0;\n\t\t\t})\n\t\t\t// }\n\t\t},\n\t\taddAlternativePaymentMethod() {\n\n\t\t\tvar self = this;\n\n\t\t\tvar newMethod = {\n\t\t\t\ttitle: 'Other Method',\n\t\t\t\tkey: '',\n\t\t\t\tdescription: '',\n\t\t\t}\n\n\t\t\tif (!self.model.paymentDetails.paymentMethods) {\n\t\t\t\tself.$set(self.model.paymentDetails, 'paymentMethods', []);\n\t\t\t}\n\n\t\t\tself.model.paymentDetails.paymentMethods.push(newMethod);\n\t\t\tsetTimeout(function() {\n\n\n\t\t\t\tself.alternativePaymentMethodIndex = self.model.paymentDetails.paymentMethods.length - 1;\n\t\t\t})\n\t\t},\n\t},\n\t// watch:{\n\t//  'model.definitionName':function(value){\n\n\t//   // get() {\n\t//   //  return this.model.definitionName;\n\t//   // },\n\t//   // set(payload) {\n\t//    if (!value) {\n\t//     value = '';\n\t//    }\n\n\t//    var regexp = /[^a-zA-Z0-9-_]+/g;\n\t//    var cleaned = value.replace(regexp, '');\n\t//    this.$set(this.model, 'definitionName', cleaned)\n\t//   // },\n\t//  },\n\t// },\n\n\tcreated() {\n\n\t\tvar self = this;\n\n\t\tif (self.lockedSubType && self.lockedSubType.length) {\n\t\t\tself.$set(self.model, 'parentType', self.lockedSubType);\n\t\t}\n\n\t\tif (self.model.parentType) {\n\t\t\tself.setParentType(self.model.parentType);\n\t\t}\n\n\t\tif (self.fieldsMakeSense) {\n\t\t\tif (self.model._id && !self.isForm) {\n\t\t\t\tself.tabIndex = 1;\n\t\t\t}\n\t\t}\n\n\t\tif (!self.model.fields) {\n\t\t\tself.$set(self.model, 'fields', []);\n\t\t}\n\n\t\tif (!self.model.data) {\n\t\t\tself.$set(self.model, 'data', {});\n\t\t}\n\n\t},\n\twatch: {\n\t\t'model.parentType': 'setParentType',\n\t},\n\tasyncComputed: {\n\t\tparentTypeOptions: {\n\t\t\tdefault: [],\n\t\t\tget() {\n\t\t\t\tvar self = this;\n\t\t\t\treturn new Promise(function(resolve, reject) {\n\n\n\t\t\t\t\tself.$fluro.types.basicTypes()\n\t\t\t\t\t\t.then(function(values) {\n\n\t\t\t\t\t\t\t// console.log('VALUES', values);\n\n\t\t\t\t\t\t\tvar cleaned = _.chain(values)\n\t\t\t\t\t\t\t\t.compact()\n\t\t\t\t\t\t\t\t.map(function(type) {\n\t\t\t\t\t\t\t\t\treturn {\n\t\t\t\t\t\t\t\t\t\ttitle: type.title,\n\t\t\t\t\t\t\t\t\t\tvalue: type.definitionName,\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t.orderBy('title')\n\t\t\t\t\t\t\t\t.value();\n\n\t\t\t\t\t\t\tresolve(cleaned);\n\t\t\t\t\t\t});\n\n\t\t\t\t})\n\t\t\t}\n\t\t},\n\t\teventTypeOptions: {\n\t\t\tdefault: [],\n\t\t\tget() {\n\t\t\t\tvar self = this;\n\t\t\t\treturn new Promise(function(resolve, reject) {\n\n\n\n\n\t\t\t\t\tself.$fluro.types.subTypes('event', true)\n\t\t\t\t\t\t.then(function(values) {\n\t\t\t\t\t\t\tvar cleaned = _.chain(values)\n\t\t\t\t\t\t\t\t.compact()\n\t\t\t\t\t\t\t\t.map(function(type) {\n\t\t\t\t\t\t\t\t\treturn {\n\t\t\t\t\t\t\t\t\t\ttitle: type.title,\n\t\t\t\t\t\t\t\t\t\tvalue: type.definitionName,\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t.orderBy('title')\n\t\t\t\t\t\t\t\t.value();\n\n\t\t\t\t\t\t\tconsole.log('TYPES LOADED', cleaned, values)\n\n\t\t\t\t\t\t\tresolve(cleaned);\n\t\t\t\t\t\t});\n\n\t\t\t\t})\n\t\t\t}\n\t\t},\n\t\treferenceOptions: {\n\t\t\tdefault: [],\n\t\t\tget() {\n\t\t\t\tvar self = this;\n\n\n\t\t\t\treturn new Promise(function(resolve, reject) {\n\n\t\t\t\t\tself.$fluro.types.terms()\n\t\t\t\t\t\t.then(function(terms) {\n\n\t\t\t\t\t\t\t/////////////////////////\n\t\t\t\t\t\t\tvar mapped = _.chain(terms)\n\t\t\t\t\t\t\t\t.values()\n\t\t\t\t\t\t\t\t.map(function(term) {\n\t\t\t\t\t\t\t\t\treturn {\n\t\t\t\t\t\t\t\t\t\tname: term.title,\n\t\t\t\t\t\t\t\t\t\ttitle: `${term.title} ${term.parentType ? term.parentType : ''}`,\n\t\t\t\t\t\t\t\t\t\tvalue: term.definitionName,\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t.orderBy('title')\n\t\t\t\t\t\t\t\t.value();\n\n\t\t\t\t\t\t\t/////////////////////////\n\t\t\t\t\t\t\tresolve(mapped);\n\t\t\t\t\t\t})\n\t\t\t\t\t\t.catch(reject);\n\n\n\t\t\t\t})\n\t\t\t}\n\t\t}\n\t},\n\tcomputed: {\n\n\t\trosterFields() {\n\t\t\tvar array = [];\n\n\n\n\n\t\t\t///////////////////////////////\n\n\t\t\tarray.push({\n\t\t\t\ttitle: 'Notifications',\n\t\t\t\tkey: 'notifyContacts',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 0,\n\t\t\t\ttype: 'reference',\n\t\t\t\tdescription: `Select contacts who should be notified when volunteers decline/swap positions on ${this.model.plural} rosters`,\n\t\t\t\tparams: {\n\t\t\t\t\trestrictType: 'contact',\n\t\t\t\t\tallDefinitions: true,\n\t\t\t\t\tpersistentDescription: true,\n\t\t\t\t},\n\t\t\t\t//placeholder: `Eg. 'Bank Transfer', 'Cash', 'Cheque', 'Payment Plan'...`,\n\t\t\t})\n\n\n\n\n\t\t\t///////////////////////////////\n\n\t\t\treturn array;\n\t\t},\n\n\t\trestrictionFields() {\n\t\t\tvar array = [];\n\n\t\t\tvar self = this;\n\n\n\t\t\t///////////////////////////////\n\n\t\t\tarray.push({\n\t\t\t\ttitle: 'Relevant Definitions',\n\t\t\t\tkey: 'rosterDefinitions',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 0,\n\t\t\t\ttype: 'string',\n\t\t\t\tdirective: 'select',\n\t\t\t\toptions: self.eventTypeOptions,\n\t\t\t\tdescription: `Select event definitions that these rosters are relevant for. Eg. If ${this.model.plural} are only relevant for specific types of events then select them here, otherwise ${this.model.plural} will appear in the planner for events on any kind`,\n\t\t\t\t// params: {\n\t\t\t\t//     restrictType: 'eventtrack',\n\t\t\t\t//     allDefinitions: true,\n\t\t\t\t//     persistentDescription: true,\n\t\t\t\t// },\n\t\t\t});\n\n\t\t\tarray.push({\n\t\t\t\ttitle: 'Relevant Event Tracks',\n\t\t\t\tkey: 'rosterEventTracks',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 0,\n\t\t\t\ttype: 'reference',\n\t\t\t\tdescription: `Select event tracks that these rosters are relevant for. Eg. If ${this.model.plural} are only relevant for specific tracks then select those tracks here, otherwise ${this.model.plural} will appear in the planner for events on any track`,\n\t\t\t\tparams: {\n\t\t\t\t\trestrictType: 'eventtrack',\n\t\t\t\t\tallDefinitions: true,\n\t\t\t\t\tpersistentDescription: true,\n\t\t\t\t},\n\t\t\t});\n\n\n\t\t\tarray.push({\n\t\t\t\ttitle: 'Relevant Realms',\n\t\t\t\tkey: 'rosterRealms',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 0,\n\t\t\t\ttype: 'reference',\n\t\t\t\tdescription: `Select realms that these rosters are relevant for. Eg. If ${this.model.plural} are only relevant for realms then select those realms here`,\n\t\t\t\tparams: {\n\t\t\t\t\trestrictType: 'realm',\n\t\t\t\t\tallDefinitions: true,\n\t\t\t\t\tpersistentDescription: true,\n\t\t\t\t},\n\t\t\t});\n\n\n\n\n\n\t\t\t///////////////////////////////\n\n\t\t\treturn array;\n\t\t},\n\n\n\t\tfieldsMakeSense() {\n\t\t\tvar self = this;\n\t\t\tswitch (self.model.parentType) {\n\t\t\t\tcase 'roster':\n\t\t\t\tcase 'contact':\n\t\t\t\tcase 'ticket':\n\n\t\t\t\t\treturn false;\n\t\t\t\t\tbreak;\n\t\t\t}\n\n\t\t\treturn true;\n\t\t},\n\t\tisForm() {\n\t\t\treturn this.definition && this.definition.definitionName == 'form'\n\t\t},\n\t\tshowDefinitionName() {\n\t\t\treturn !this.model._id;\n\t\t},\n\t\tshowFieldsFirst() {\n\t\t\treturn this.model._id && this.model.definition == 'form'\n\t\t},\n\t\tpaymentMethodFields() {\n\t\t\treturn [{\n\t\t\t\t\ttitle: 'Title',\n\t\t\t\t\tkey: 'title',\n\t\t\t\t\tminimum: 1,\n\t\t\t\t\tmaximum: 1,\n\t\t\t\t\ttype: 'string',\n\t\t\t\t\tdescription: '',\n\n\t\t\t\t\tplaceholder: `Eg. 'Bank Transfer', 'Cash', 'Cheque', 'Payment Plan'...`,\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\ttitle: 'Key',\n\t\t\t\t\tkey: 'key',\n\t\t\t\t\tminimum: 1,\n\t\t\t\t\tmaximum: 1,\n\t\t\t\t\ttype: 'string',\n\t\t\t\t\tdescription: 'A unique key for this payment method',\n\t\t\t\t\tplaceholder: `Eg. 'bank', 'cash', 'cheque', 'plan'`,\n\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\ttitle: 'Help / Description',\n\t\t\t\t\tkey: 'description',\n\t\t\t\t\tminimum: 1,\n\t\t\t\t\tmaximum: 1,\n\t\t\t\t\ttype: 'string',\n\t\t\t\t\tdirective: 'wysiwyg',\n\t\t\t\t\tdescription: 'Write a summary of how you want people to pay you if they are using alternative methods',\n\t\t\t\t\tplaceholder: 'Eg. Please transfer to Acc # with first name as description etc..'\n\t\t\t\t},\n\n\t\t\t]\n\t\t},\n\t\talternativePaymentMethods: {\n\t\t\tget() {\n\t\t\t\treturn this.model.paymentDetails.paymentMethods || [];\n\t\t\t},\n\t\t\tset(payload) {\n\t\t\t\tthis.$set(this.model.paymentDetails, 'paymentMethods', payload);\n\t\t\t}\n\t\t},\n\t\tpaymentIsEnabled() {\n\t\t\treturn this.model.paymentDetails && (this.model.paymentDetails.required || this.model.paymentDetails.allow)\n\t\t},\n\t\tdefinitionFormOptions() {\n\t\t\treturn {}\n\t\t},\n\t\tprivacyDescription() {\n\t\t\tswitch (this.model.privacy) {\n\t\t\t\tcase 'public':\n\t\t\t\t\treturn `Anyone can submit this interaction form without needing explicit 'submit' or 'create' permissions`\n\t\t\t\t\tbreak;\n\t\t\t\tcase 'secure':\n\t\t\t\t\treturn `Only users and applications with the 'submit ${this.model.definitionName}' or 'create ${this.model.definitionName}' permission can submit these forms`\n\t\t\t\t\tbreak;\n\t\t\t}\n\n\n\t\t},\n\t\tdefinitionData() {\n\t\t\treturn this.definition ? this.definition.data : null;\n\t\t},\n\t\tlockedSubType() {\n\t\t\tif (this.definitionData && this.definitionData.definitionSubType) {\n\t\t\t\treturn this.definitionData.definitionSubType\n\t\t\t}\n\n\t\t\treturn;\n\t\t},\n\t\tpaymentFields() {\n\t\t\tvar self = this;\n\t\t\tvar array = [];\n\n\t\t\t///////////////////////////////////\n\n\t\t\taddField('required', {\n\t\t\t\ttitle: 'Require Payment',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'boolean',\n\n\t\t\t\tdescription: `Require a payment for creating this content`,\n\t\t\t\thide() {\n\t\t\t\t\treturn self.model.paymentDetails && self.model.paymentDetails.allow;\n\t\t\t\t},\n\t\t\t})\n\n\t\t\taddField('allow', {\n\t\t\t\ttitle: 'Allow Payment',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'boolean',\n\t\t\t\texpressions: {\n\t\t\t\t\thide() {\n\t\t\t\t\t\treturn self.model.paymentDetails && self.model.paymentDetails.required;\n\t\t\t\t\t},\n\t\t\t\t},\n\t\t\t\tdescription: `Allow a payment to be made when creating this content`,\n\t\t\t})\n\n\t\t\t////////////////////////////////////////\n\n\t\t\tvar paymentDetails = self.model.paymentDetails || {};\n\n\t\t\t////////////////////////////////////////\n\n\t\t\taddField('amount', {\n\t\t\t\ttitle: 'Base Amount',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'number',\n\t\t\t\tdirective: 'currency',\n\t\t\t\tparams: {\n\t\t\t\t\tcurrency: paymentDetails.currency || '',\n\t\t\t\t\tpersistentDescription: true,\n\t\t\t\t\thideSuffix: true,\n\t\t\t\t},\n\t\t\t\tdescription: `The amount required to be paid to subit this form. You can leave this as 0 and calculate the cost with payment modifiers.`,\n\t\t\t})\n\n\n\t\t\taddField('allowAlternativePayments', {\n\t\t\t\ttitle: 'Allow payments to be made at a later time through other methods',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'boolean',\n\t\t\t\tdescription: `Checking this box will allow the user to create this content without paying the full required amount. Payments will need to be made manually via other arrangements that can be added below.`,\n\t\t\t})\n\n\n\n\n\t\t\taddField('currency', {\n\t\t\t\ttitle: 'Currency',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'string',\n\t\t\t\tdirective: 'select',\n\t\t\t\toptions: [{\n\t\t\t\t\t\tname: 'USD',\n\t\t\t\t\t\tvalue: 'usd',\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\tname: 'AUD',\n\t\t\t\t\t\tvalue: 'aud',\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\tname: 'CAD',\n\t\t\t\t\t\tvalue: 'cad',\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\tname: 'EUR',\n\t\t\t\t\t\tvalue: 'eur',\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\tname: 'GBP',\n\t\t\t\t\t\tvalue: 'gbp',\n\t\t\t\t\t},\n\t\t\t\t]\n\t\t\t})\n\n\n\t\t\t////////////////////////////////////////\n\n\t\t\taddField('minAmount', {\n\t\t\t\ttitle: 'Minimum Amount',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'number',\n\t\t\t\tparams: {\n\t\t\t\t\tpersistentDescription: true,\n\t\t\t\t},\n\t\t\t\t// expressions:{\n\t\t\t\t//  transform(value) {\n\t\t\t\t//   value = Number(parseFloat(value).toFixed(2));\n\t\t\t\t//   return value * 100;\n\t\t\t\t//  }\n\t\t\t\t// },\n\t\t\t\tsuffix: `(${self.$fluro.utils.formatCurrency(paymentDetails.minAmount, paymentDetails.currency)})`,\n\t\t\t\tdescription: `The minimum amount required for payment to create this type of content`,\n\t\t\t})\n\n\t\t\taddField('maxAmount', {\n\t\t\t\ttitle: 'Maximum Amount',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'number',\n\t\t\t\tparams: {\n\t\t\t\t\tpersistentDescription: true,\n\t\t\t\t},\n\t\t\t\t// expressions:{\n\t\t\t\t//  transform(value) {\n\t\t\t\t//   value = Number(parseFloat(value).toFixed(2));\n\t\t\t\t//   return value * 100;\n\t\t\t\t//  }\n\t\t\t\t// },\n\t\t\t\tsuffix: `(${self.$fluro.utils.formatCurrency(paymentDetails.maxAmount, paymentDetails.currency)})`,\n\t\t\t\tdescription: `The maximum amount that can be charged when creating this type of content`,\n\t\t\t})\n\n\t\t\t///////////////////////////////////\n\n\t\t\tfunction addField(key, details) {\n\t\t\t\tdetails.key = key;\n\t\t\t\tarray.push(details)\n\t\t\t}\n\n\t\t\t// console.log('DO THE OUTPUT!!!');\n\t\t\treturn array;\n\n\n\t\t},\n\t\tdataFields() {\n\t\t\tvar self = this;\n\t\t\tvar array = [];\n\n\n\t\t\tvar defaultConfirmationCheckbox = self.model._id ? undefined : [true];\n\t\t\tvar defaultQRCodeCheckbox = self.model._id ? undefined : [true];\n\n\t\t\t///////////////////////////////////\n\n\t\t\taddField('allowAnonymous', {\n\t\t\t\ttitle: 'Add default contact fields to form',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'boolean',\n\t\t\t\tinverse: true,\n\t\t\t\tdescription: `This will add the basic contact fields (First Name, Last Name, Email etc) to the top of the form and require a contact for the interaction. To do anonymous forms, customise your own field layout or do multi person forms it is recommended you turn this off`,\n\t\t\t})\n\n\n\t\t\t///////////////////////////////////\n\n\n\t\t\taddField('disableBestGuess', {\n\t\t\t\ttitle: 'Attempt contact link',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'boolean',\n\t\t\t\tinverse: true,\n\t\t\t\tdescription: `Attempt to link ${self.model.title} submissions to a contact if enough data is submitted. For example, if you have a few details above that match a contact in the database, Fluro will try and create a new contact or link to an existing contact. If you want these submissions to be anonymous you want to leave this unchecked.`,\n\t\t\t})\n\n\n\t\t\taddField('enableConfirmation', {\n\t\t\t\ttitle: 'Send Confirmation Email',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'boolean',\n\t\t\t\tdefaultValues: defaultConfirmationCheckbox,\n\t\t\t\tdescription: `Send a confirmation email to the primary contact upon a new submission.`,\n\t\t\t})\n\n\t\t\taddField('confirmationMessage', {\n\t\t\t\ttitle: 'Confirmation Thank You Message',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'string',\n\t\t\t\tdirective: 'wysiwyg',\n\t\t\t\tdescription: `Add a customised thank you message to be shown in the confirmation email. \\n Please note that event registrations will already contain key dates, locations and directions underneath this message`,\n\t\t\t})\n\n\t\t\taddField('includeTickets', {\n\t\t\t\ttitle: 'Include QR Code tickets',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'boolean',\n\t\t\t\tdefaultValues: defaultQRCodeCheckbox,\n\t\t\t\tdescription: `Check this box if you want Fluro to send digital a QR for ticket collection.`,\n\t\t\t})\n\n\t\t\taddField('enableReceipt', {\n\t\t\t\ttitle: 'Send Fluro Transaction Receipt',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'boolean',\n\t\t\t\tdescription: `Send a transaction receipt from Fluro.`,\n\t\t\t\texpressions: {\n\t\t\t\t\thide() {\n\t\t\t\t\t\tif (!self.model.paymentDetails) {\n\t\t\t\t\t\t\treturn true\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\tif (self.paymentIsEnabled) {\n\t\t\t\t\t\t\treturn false\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\treturn true;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t})\n\n\n\n\n\t\t\taddField('notifyContacts', {\n\t\t\t\ttitle: 'Send Notifications',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 0,\n\t\t\t\ttype: 'reference',\n\t\t\t\tparams: {\n\t\t\t\t\trestrictType: 'contact',\n\t\t\t\t},\n\t\t\t\tdescription: `Send a basic notification to the following contacts when a new ${self.model.title} is submitted`,\n\t\t\t})\n\n\n\t\t\taddField('interactionProcesses', {\n\t\t\t\ttitle: 'Add submission to processes',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 0,\n\t\t\t\ttype: 'reference',\n\t\t\t\tparams: {\n\t\t\t\t\trestrictType: 'definition',\n\t\t\t\t\treferenceFilter: {\n\t\t\t\t\t\toperator: 'and',\n\t\t\t\t\t\tfilters: [{\n\t\t\t\t\t\t\tkey: 'parentType',\n\t\t\t\t\t\t\tcomparator: '==',\n\t\t\t\t\t\t\tvalue: 'process',\n\t\t\t\t\t\t}, ]\n\t\t\t\t\t},\n\n\n\t\t\t\t},\n\t\t\t\tdescription: `Select processes that the form submission will be added into`,\n\t\t\t})\n\n\n\t\t\tvar contactProcessesTitle = self.model.data.contactProcessesAll ? 'Add all connected contacts to processes' : 'Add primary contact to processes';\n\n\t\t\t// Add {{item.data.contactProcessesAll ? 'All Connected Contacts' : 'Primary Contact'}} to Processes\n\n\t\t\taddField('contactProcesses', {\n\t\t\t\ttitle: contactProcessesTitle,\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 0,\n\t\t\t\ttype: 'reference',\n\t\t\t\tparams: {\n\t\t\t\t\trestrictType: 'definition',\n\t\t\t\t\treferenceFilter: {\n\t\t\t\t\t\toperator: 'and',\n\t\t\t\t\t\tfilters: [{\n\t\t\t\t\t\t\tkey: 'parentType',\n\t\t\t\t\t\t\tcomparator: '==',\n\t\t\t\t\t\t\tvalue: 'process',\n\t\t\t\t\t\t}, ]\n\t\t\t\t\t},\n\t\t\t\t},\n\t\t\t\tdescription: `Select processes to add the primary (or first linked) contact to after form submission`,\n\t\t\t})\n\n\t\t\taddField('contactProcessesAll', {\n\t\t\t\ttitle: ' Include all connected contacts',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'boolean',\n\t\t\t\tdescription: `Include every contact referenced in the submission`,\n\t\t\t})\n\n\t\t\taddField('processAssignTo', {\n\t\t\t\ttitle: 'Assign to',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 0,\n\t\t\t\ttype: 'reference',\n\t\t\t\tparams: {\n\t\t\t\t\trestrictType: 'contact',\n\t\t\t\t\tallDefinitions: true,\n\t\t\t\t},\n\t\t\t\tdescription: `Assign the process card to specific contacts`,\n\t\t\t})\n\n\t\t\t/////////////////////////////////////////////////////////////\n\t\t\t/////////////////////////////////////////////////////////////\n\t\t\t/////////////////////////////////////////////////////////////\n\n\t\t\tvar contactTeamsAllTitle = self.model.data.contactTeamsAll ? 'Add all connected contacts to groups/teams' : 'Add primary contact to groups/teams';\n\n\t\t\t// Add {{item.data.contactTeamsAll ? 'All Connected Contacts' : 'Primary Contact'}} to Processes\n\n\t\t\taddField('contactTeams', {\n\t\t\t\ttitle: contactTeamsAllTitle,\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 0,\n\t\t\t\ttype: 'reference',\n\t\t\t\tparams: {\n\t\t\t\t\trestrictType: 'team',\n\t\t\t\t\tallDefinitions: true,\n\t\t\t\t},\n\t\t\t\tdescription: `Select groups/teams to add the primary (or first linked) contact to after form submission`,\n\t\t\t})\n\n\t\t\taddField('contactTeamsAll', {\n\t\t\t\ttitle: ' Include all connected contacts',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'boolean',\n\t\t\t\tdescription: `Include every contact referenced in the submission`,\n\t\t\t})\n\n\n\t\t\t/////////////////////////////////////////////////////////////\n\t\t\t/////////////////////////////////////////////////////////////\n\t\t\t/////////////////////////////////////////////////////////////\n\n\t\t\tvar capabilitiesAllTitle = self.model.data.capabilitiesAll ? 'Add capabilities to all connected contacts' : 'Add capabilities to primary contact';\n\n\t\t\t// Add {{item.data.capabilitiesAll ? 'All Connected Contacts' : 'Primary Contact'}} to Processes\n\n\t\t\taddField('contactCapabilities', {\n\t\t\t\ttitle: capabilitiesAllTitle,\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 0,\n\t\t\t\ttype: 'reference',\n\t\t\t\tparams: {\n\t\t\t\t\trestrictType: 'capability',\n\t\t\t\t\tallDefinitions: true,\n\t\t\t\t},\n\t\t\t\tdescription: `Select groups/teams to add the primary (or first linked) contact to after form submission`,\n\t\t\t})\n\n\t\t\taddField('capabilitiesAll', {\n\t\t\t\ttitle: ' Include all connected contacts',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'boolean',\n\t\t\t\tdescription: `Include every contact referenced in the submission`,\n\t\t\t})\n\n\n\n\n\n\n\t\t\taddField('reactionPipelines', {\n\t\t\t\ttitle: 'Reaction Pipelines',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 0,\n\t\t\t\ttype: 'reference',\n\t\t\t\tparams: {\n\t\t\t\t\trestrictType: 'reaction',\n\t\t\t\t\tallDefinitions: true,\n\t\t\t\t},\n\t\t\t\tdescription: `Select reaction pipelines to push submissions into when they are created`,\n\t\t\t})\n\n\n\t\t\taddField('blc', {\n\t\t\t\ttitle: 'Blacklist Country Codes',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 0,\n\t\t\t\ttype: 'string',\n\t\t\t\tplaceholder: 'Country Code eg(AU, BR, US)',\n\t\t\t\tdescription: `Block certain country codes from submitting this form`,\n\t\t\t})\n\n\n\n\n\n\n\n\t\t\t///////////////////////////////////\n\n\t\t\t//  <\n\t\t\t//  label > Contact ID Requirement < /label> <\n\t\t\t//  p class = \"help-block\" >\n\t\t\t//  Every contact requires either an email address or a phone number\n\t\t\t// for verification. < br / >\n\t\t\t//  Sometimes it makes more sense to ask / require one or both of these <\n\t\t\t//  /p> <\n\t\t\t//  select ng - model = \"item.data.identifier\"\n\t\t\t// class = \"form-control\" >\n\t\t\t//  <option value=\"email\">Require an Email Address</option> <\n\t\t\t//  option value = \"phone\" > Require a Phone Number < /option> <\n\t\t\t//  option value = \"either\" > Require either Phone Number or Email Address < /option> <\n\t\t\t//  option value = \"both\" > Require both Phone Number and Email Address < /option> <\n\t\t\t//  /select>\n\n\n\t\t\taddField('identifier', {\n\t\t\t\ttitle: 'Contact ID Requirement',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'string',\n\t\t\t\tdirective: 'select',\n\t\t\t\tdescription: `Every contact requires either an email address or a phone number for verification.\\n\n\tSometimes it makes more sense to ask/require one or both of these`,\n\t\t\t\toptions: [{\n\t\t\t\t\t\tname: 'Require an Email Address',\n\t\t\t\t\t\tvalue: 'email',\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\tname: 'Require a Phone Number',\n\t\t\t\t\t\tvalue: 'phone',\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\tname: 'Require either Phone Number or Email Address',\n\t\t\t\t\t\tvalue: 'either',\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\tname: 'Require both Phone Number and Email Address',\n\t\t\t\t\t\tvalue: 'both',\n\t\t\t\t\t},\n\t\t\t\t]\n\t\t\t})\n\n\t\t\t///////////////////////////////////\n\n\t\t\taddField('askLastName', {\n\t\t\t\ttitle: 'Ask',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'boolean',\n\t\t\t})\n\n\t\t\taddField('requireLastName', {\n\t\t\t\ttitle: 'Require',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'boolean',\n\t\t\t})\n\n\t\t\t///////////////////////////////////\n\n\t\t\taddField('askFirstName', {\n\t\t\t\ttitle: 'Ask',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'boolean',\n\t\t\t})\n\n\t\t\taddField('requireFirstName', {\n\t\t\t\ttitle: 'Require',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'boolean',\n\t\t\t})\n\n\t\t\t///////////////////////////////////\n\n\t\t\taddField('askEmail', {\n\t\t\t\ttitle: 'Ask',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'boolean',\n\t\t\t})\n\n\t\t\taddField('requireEmail', {\n\t\t\t\ttitle: 'Require',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'boolean',\n\t\t\t})\n\n\t\t\t///////////////////////////////////\n\n\t\t\taddField('askPhone', {\n\t\t\t\ttitle: 'Ask',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'boolean',\n\t\t\t})\n\n\t\t\taddField('requirePhone', {\n\t\t\t\ttitle: 'Require',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'boolean',\n\t\t\t})\n\n\t\t\t///////////////////////////////////\n\n\t\t\taddField('askGender', {\n\t\t\t\ttitle: 'Ask',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'boolean',\n\t\t\t})\n\n\t\t\taddField('requireGender', {\n\t\t\t\ttitle: 'Require',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'boolean',\n\t\t\t})\n\n\t\t\t///////////////////////////////////\n\n\t\t\taddField('askDOB', {\n\t\t\t\ttitle: 'Ask',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'boolean',\n\t\t\t})\n\n\t\t\taddField('requireDOB', {\n\t\t\t\ttitle: 'Require',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'boolean',\n\t\t\t})\n\n\t\t\t///////////////////////////////////\n\n\t\t\tfunction addField(key, details) {\n\t\t\t\tdetails.key = key;\n\t\t\t\tarray.push(details)\n\t\t\t}\n\n\t\t\t// console.log('DO THE OUTPUT!!!');\n\t\t\treturn array;\n\t\t},\n\t\tprocessFields() {\n\t\t\tvar self = this;\n\t\t\tvar array = [];\n\n\n\t\t\t///////////////////////////////////\n\n\t\t\tarray.push({\n\t\t\t\ttitle: 'Types that can be processed',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 0,\n\t\t\t\tkey: 'processTypes',\n\t\t\t\ttype: 'string',\n\t\t\t\tdirective: 'select',\n\t\t\t\toptions: self.referenceOptions,\n\t\t\t\tparams: {\n\t\t\t\t\tpersistentDescription: true\n\t\t\t\t},\n\t\t\t\tdescription: `Restrict what kind of content types can be referenced and added to this process`,\n\t\t\t})\n\n\n\n\t\t\t// addField('referenceType', {\n\t\t\t//  key: 'restrictType',\n\t\t\t//  title: 'Reference Type',\n\t\t\t//  description: 'Restrict what kind of items can be referenced in this field',\n\t\t\t//  minimum: 0,\n\t\t\t//  maximum: 1,\n\t\t\t//  type: 'string',\n\t\t\t//  directive: 'select',\n\t\t\t//  options: self.referenceOptions,\n\t\t\t// })\n\n\t\t\t///////////////////////////////////\n\n\t\t\tarray.push({\n\t\t\t\ttitle: 'Mode',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\tkey: 'mode',\n\t\t\t\ttype: 'string',\n\t\t\t\tdirective: 'select',\n\t\t\t\toptions: [{\n\t\t\t\t\t\ttitle: 'Linear Progression',\n\t\t\t\t\t\tvalue: '',\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\ttitle: 'Kanban / Lanes',\n\t\t\t\t\t\tvalue: 'lanes',\n\t\t\t\t\t},\n\t\t\t\t],\n\t\t\t\tparams: {\n\t\t\t\t\tpersistentDescription: true\n\t\t\t\t},\n\t\t\t})\n\n\t\t\t///////////////////////////////////\n\n\t\t\tarray.push({\n\t\t\t\ttitle: 'Disable Drag and Drop',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\tkey: 'dragLocked',\n\t\t\t\ttype: 'boolean',\n\t\t\t\tdescription: 'Lock drag and drop functionality so that cards can not be dragged into other columns',\n\t\t\t\tparams: {\n\t\t\t\t\tpersistentDescription: true\n\t\t\t\t},\n\t\t\t})\n\n\n\t\t\treturn array;\n\t\t},\n\t\tfieldsOutput() {\n\n\t\t\tvar self = this;\n\t\t\tvar array = [];\n\n\t\t\tvar exampleSingle;\n\t\t\tvar examplePlural;\n\n\t\t\tswitch (self.model.parentType) {\n\t\t\t\tcase 'interaction':\n\t\t\t\t\texampleSingle = 'Volunteer Application Form';\n\t\t\t\t\texamplePlural = 'Volunteer Application Forms';\n\t\t\t\t\tbreak;\n\t\t\t\tcase 'contactdetail':\n\t\t\t\t\texampleSingle = 'Medical Details';\n\t\t\t\t\texamplePlural = 'Medical Details';\n\t\t\t\t\tbreak;\n\t\t\t\tcase 'event':\n\t\t\t\t\texampleSingle = 'Small Group Meeting';\n\t\t\t\t\texamplePlural = 'Small Group Meetings';\n\t\t\t\t\tbreak;\n\t\t\t\tcase 'article':\n\t\t\t\t\texampleSingle = 'Blog';\n\t\t\t\t\texamplePlural = 'Blogs';\n\t\t\t\t\tbreak;\n\t\t\t\tcase 'team':\n\t\t\t\t\texampleSingle = 'Connect Group';\n\t\t\t\t\texamplePlural = 'Connect Groups';\n\t\t\t\t\tbreak;\n\t\t\t\tdefault:\n\t\t\t\t\texampleSingle = 'Thing';\n\t\t\t\t\texamplePlural = 'Things';\n\t\t\t\t\tbreak;\n\t\t\t}\n\n\t\t\t///////////////////////////////////\n\n\t\t\t// console.log('AUTOFOCUS', self.model._id)\n\t\t\taddField('title', {\n\t\t\t\ttitle: 'Title',\n\t\t\t\tminimum: 1,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'string',\n\t\t\t\tparams: {\n\t\t\t\t\tautofocus: !self.model._id,\n\t\t\t\t\tpersistentDescription: true\n\t\t\t\t},\n\t\t\t\tdescription: `What do you call this ${self.readableContentType}?. eg. '${exampleSingle}'`,\n\t\t\t})\n\n\n\n\t\t\taddField('plural', {\n\t\t\t\ttitle: 'Plural',\n\t\t\t\tminimum: 1,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'string',\n\t\t\t\tparams: {\n\t\t\t\t\tpersistentDescription: true\n\t\t\t\t},\n\t\t\t\tdescription: `How do you want us to refer to multiple ${self.readableContentType} items?. eg. '${examplePlural}'`,\n\t\t\t\texpressions: {\n\t\t\t\t\tdefaultValue() {\n\n\n\t\t\t\t\t\tvar existingTitle = self.model.title;\n\n\t\t\t\t\t\tif (!existingTitle || !existingTitle.length) {\n\t\t\t\t\t\t\treturn '';\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\tif (_.endsWith(existingTitle, 's') || _.endsWith(existingTitle, 'es')) {\n\t\t\t\t\t\t\treturn existingTitle;\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\treturn existingTitle = existingTitle + 's';\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t})\n\n\n\t\t\t///////////////////////////////////\n\n\t\t\taddField('firstLine', {\n\t\t\t\ttitle: 'Short Description',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'string',\n\t\t\t\tparams: {\n\t\t\t\t\tpersistentDescription: true\n\t\t\t\t},\n\t\t\t\tdescription: `Optional short description describing this ${self.$fluro.types.readable(self.model.parentType)}`,\n\t\t\t})\n\n\t\t\taddField('definitionName', {\n\t\t\t\ttitle: 'Definition Name',\n\t\t\t\tminimum: 1,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'string',\n\t\t\t\tdescription: `This is a unique key to store this field's data in the database. for this ${self.readableContentType}`,\n\t\t\t\texpressions: {\n\t\t\t\t\t// transform(value) {\n\n\t\t\t\t\t//  if (!value) {\n\t\t\t\t\t//   return value;\n\t\t\t\t\t//  }\n\t\t\t\t\t//  var regexp = /[^a-zA-Z0-9-_]+/g;\n\t\t\t\t\t//  var cleaned = _.camelCase(value).replace(regexp, '');\n\t\t\t\t\t//  return cleaned;\n\t\t\t\t\t// },\n\t\t\t\t\tdefaultValue() {\n\n\t\t\t\t\t\tif (!self.model.title) {\n\t\t\t\t\t\t\treturn ''\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\tvar regexp = /[^a-zA-Z0-9-_]+/g;\n\t\t\t\t\t\tvar cleaned = _.camelCase(String(self.model.title).replace(regexp, ''));\n\n\t\t\t\t\t\treturn cleaned;\n\t\t\t\t\t}\n\t\t\t\t},\n\t\t\t})\n\n\n\n\t\t\tarray.push({\n\t\t\t\ttitle: 'Weight',\n\t\t\t\tkey: 'weight',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 0,\n\t\t\t\ttype: 'integer',\n\t\t\t\tdescription: 'Set the weight of this roster, this will determine the ordering when shown in the multi planner, (Lighter weight rosters will be shown at the top, Heavier weight rosters will be shown toward the bottom)',\n\t\t\t\tparams: {\n\t\t\t\t\tpersistentDescription: true,\n\t\t\t\t},\n\t\t\t\t//placeholder: `Eg. 'Bank Transfer', 'Cash', 'Cheque', 'Payment Plan'...`,\n\t\t\t})\n\n\n\n\n\n\n\t\t\t//////////////////////////////////////////////////\n\n\t\t\taddField('publishDate', {\n\t\t\t\ttitle: 'Publish / Open Date',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'date',\n\t\t\t\tdescription: `When should this form open and change status to 'active'`,\n\t\t\t\tdirective: 'datetimepicker',\n\t\t\t})\n\n\t\t\taddField('archiveDate', {\n\t\t\t\ttitle: 'Archive / Close Date',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'date',\n\t\t\t\tdescription: `When should this form closed and change status to 'archived'`,\n\t\t\t\tdirective: 'datetimepicker',\n\t\t\t})\n\n\t\t\t//////////////////////////////////////////////////\n\n\n\t\t\t//////////////////////////////////////////////////\n\n\t\t\taddField('parentType', {\n\t\t\t\ttitle: 'Parent Type',\n\t\t\t\tminimum: 1,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'string',\n\t\t\t\tdescription: `What basic type of content you are defining/extending`,\n\t\t\t\tdirective: 'select',\n\t\t\t\toptions: self.parentTypeOptions,\n\t\t\t})\n\n\n\t\t\t//////////////////////////////////////////////////\n\n\t\t\taddField('privacy', {\n\t\t\t\ttitle: 'Security / Privacy',\n\t\t\t\tminimum: 0,\n\t\t\t\tmaximum: 1,\n\t\t\t\ttype: 'string',\n\t\t\t\tdescription: self.privacyDescription,\n\t\t\t\tdirective: 'select',\n\t\t\t\texpressions: {\n\t\t\t\t\thide() {\n\n\t\t\t\t\t\tswitch (self.model.parentType) {\n\t\t\t\t\t\t\tcase 'interaction':\n\t\t\t\t\t\t\tcase 'post':\n\t\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t\tdefault:\n\t\t\t\t\t\t\t\treturn true;\n\t\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t}\n\t\t\t\t\t},\n\t\t\t\t},\n\t\t\t\toptions: [{\n\t\t\t\t\t\tname: `Secure (Only those with permissions can submit '${self.model.plural}')`,\n\t\t\t\t\t\tvalue: 'secure',\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\tname: `Public (Anyone can submit '${self.model.plural}')`,\n\t\t\t\t\t\tvalue: 'public',\n\t\t\t\t\t},\n\t\t\t\t],\n\t\t\t})\n\n\t\t\t///////////////////////////////////\n\n\t\t\tfunction addField(key, details) {\n\t\t\t\tdetails.key = key;\n\t\t\t\tarray.push(details)\n\t\t\t}\n\n\t\t\t// console.log('DO THE OUTPUT!!!');\n\t\t\treturn array;\n\n\t\t},\n\t},\n\tdata() {\n\t\treturn {\n\t\t\ttabIndex: 0,\n\t\t\talternativePaymentMethodIndex: 0,\n\t\t\texpandedSettings: {\n\t\t\t\t_contacts: false,\n\t\t\t\t_teams: false,\n\t\t\t\t_events: false,\n\t\t\t\t_tickets: false,\n\t\t\t},\n\t\t\teditorOptions: {},\n\t\t}\n\t},\n}\n\n</script>\n<style lang=\"scss\" scoped>\n\n/**/\r\n\r\n$primary: #2ad4b9;//#0bd6be;\r\n$success: #4cc650; //#4cc673;//\r\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\r\n$danger: #d93e63;\r\n$secondary: #0bd6cd; //#0bd6a3;\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n\r\n.border-top {\r\n    border-top: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-right {\r\n    border-right: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-bottom {\r\n    border-bottom: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-left {\r\n    border-left: 1px solid rgba(#000, 0.05);\r\n}\r\n//////////////////////////////////////////\r\n\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n/**/\n.field-row {\n\tpadding: 0 15px;\n\tborder-bottom: 1px solid rgba(#000, 0.1);\n}\n\n</style>\n","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.field-row {\n  padding: 0 15px;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n}\n\n/*# sourceMappingURL=definition.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$6 = "data-v-8c7a7848";
  /* module identifier */
  const __vue_module_identifier__$6 = undefined;
  /* functional template */
  const __vue_is_functional_template__$6 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$6 = __vue_normalize__(
    { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
    __vue_inject_styles__$6,
    __vue_script__$6,
    __vue_scope_id__$6,
    __vue_is_functional_template__$6,
    __vue_module_identifier__$6,
    false,
    __vue_create_injector__,
    undefined,
    undefined
  );

export default __vue_component__$6;
//# sourceMappingURL=definition-f0a2c4ed.js.map
