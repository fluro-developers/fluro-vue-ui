import { r as FluroConfirmButton, bn as _$1, bl as __vue_normalize__, bm as __vue_create_injector__, c as FluroHelp, aK as FluroExpressionEditor, e as FluroModalMixin, aN as FluroContentFormField, h as FluroFieldEditor, aF as FluroContentSelectButton, bp as FieldTemplates } from './index-1c6dca99.js';
import 'vue';
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
import { F as FluroContentEditMixin } from './FluroContentEditMixin-049caf8e.js';

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
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('list-group-item',[_c('v-layout',[_c('v-flex',[_c('strong',[_vm._v(_vm._s(_vm.model.title))])]),_vm._v(" "),_c('v-flex',{attrs:{"shrink":""}},[_c('div',{staticClass:"btn-group"},[_c('span',{directives:[{name:"tippy",rawName:"v-tippy"}],staticClass:"btn",attrs:{"xs":"","content":"Edit"},on:{"click":_vm.edit}},[_c('fluro-icon',{attrs:{"icon":"pencil"}})],1),_vm._v(" "),_c('span',{directives:[{name:"tippy",rawName:"v-tippy"}],staticClass:"btn",attrs:{"xs":"","content":"Duplicate"},on:{"click":_vm.duplicate}},[_c('fluro-icon',{attrs:{"icon":"copy"}})],1)])]),_vm._v(" "),_c('v-flex',{staticStyle:{"padding-left":"5px"},attrs:{"shrink":""}},[_c('fluro-confirm-button',{directives:[{name:"tippy",rawName:"v-tippy"}],attrs:{"content":"Remove"},on:{"click":_vm.remove},scopedSlots:_vm._u([{key:"default",fn:function(ref){
var confirming = ref.confirming;
return [_c('span',{staticClass:"btn",attrs:{"xs":""}},[_vm._v("\n                        "+_vm._s(confirming ? 'Confirm?' : 'Remove')+"\n                    ")])]}}])})],1)],1),_vm._v(" "),_c('div',{domProps:{"innerHTML":_vm._s(_vm.summary)}})],1)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-c9f303aa_0", { source: ".border-top{border-top:1px solid rgba(0,0,0,.05)}.border-right{border-right:1px solid rgba(0,0,0,.05)}.border-bottom{border-bottom:1px solid rgba(0,0,0,.05)}.border-left{border-left:1px solid rgba(0,0,0,.05)}", map: undefined, media: undefined });

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
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modifier-accordion",class:{expanded:_vm.expanded}},[_c('div',{staticClass:"modifier-accordion-title",on:{"click":function($event){return _vm.toggle()}}},[_c('v-container',{attrs:{"fluid":"","py-1":"","px-2":""}},[_c('v-layout',{attrs:{"align-center":""}},[_c('v-flex',[_vm._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t"+_vm._s(_vm.title)+"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t")]),_vm._v(" "),_c('v-flex',{attrs:{"shrink":""}},[_c('fluro-icon',{staticClass:"icon",attrs:{"icon":"angle-right"}})],1)],1)],1)],1),_vm._v(" "),(_vm.expanded)?_c('div',{staticClass:"modifier-accordion-body"},[_c('v-container',{attrs:{"fluid":"","pa-2":""}},[_vm._t("default")],2)],1):_vm._e()])};
var __vue_staticRenderFns__$1 = [];

  /* style */
  const __vue_inject_styles__$1 = function (inject) {
    if (!inject) return
    inject("data-v-71bcadf8_0", { source: ".border-top{border-top:1px solid rgba(0,0,0,.05)}.border-right{border-right:1px solid rgba(0,0,0,.05)}.border-bottom{border-bottom:1px solid rgba(0,0,0,.05)}.border-left{border-left:1px solid rgba(0,0,0,.05)}.modifier-accordion{font-size:.8em;border-top:1px solid rgba(0,0,0,.1)}.modifier-accordion .icon{transition:all .3s}.modifier-accordion .modifier-accordion-title{display:block;background:#eee;cursor:pointer}.modifier-accordion .modifier-accordion-body{display:block;background:#fff}.modifier-accordion.expanded .modifier-accordion-title{font-weight:700}.modifier-accordion.expanded .icon{transform:rotate(90deg)}", map: undefined, media: undefined });

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
var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flex-column',{staticStyle:{"width":"80vw"}},[_c('flex-column-header',[_c('v-container',{staticClass:"border-bottom",attrs:{"fluid":"","pa-2":""}},[_c('v-layout',{attrs:{"align-center":""}},[_c('v-flex',[_c('h5',[_vm._v(_vm._s(_vm.model.title)+" "),_c('span',{staticClass:"muted"},[_vm._v("// Payment Modifier")])])]),_vm._v(" "),(_vm.options.cancelEnabled)?_c('v-flex',{attrs:{"shrink":""}},[_c('v-btn',{staticClass:"ma-0 mr-2",on:{"click":function($event){return _vm.dismiss()}}},[_vm._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tCancel\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t")])],1):_vm._e(),_vm._v(" "),_c('v-flex',{attrs:{"shrink":""}},[_c('v-btn',{staticClass:"ma-0",attrs:{"color":"primary"},on:{"click":function($event){return _vm.done()}}},[_vm._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tDone\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t")])],1)],1)],1)],1),_vm._v(" "),_c('flex-row',[_c('flex-column-body',[_c('v-container',[_c('v-text-field',{attrs:{"autofocus":true,"label":"Title","hint":"The name of this modifier (displayed to the user when active)"},model:{value:(_vm.model.title),callback:function ($$v) {_vm.$set(_vm.model, "title", $$v);},expression:"model.title"}}),_vm._v(" "),_c('v-select',{attrs:{"label":"Modifier","items":_vm.operators,"hint":_vm.modifierDescription},model:{value:(_vm.model.operation),callback:function ($$v) {_vm.$set(_vm.model, "operation", $$v);},expression:"model.operation"}}),_vm._v(" "),_c('v-input',{staticClass:"no-flex",attrs:{"label":"Value","hint":"Either a value or an expression that returns a number in cents eg. '2000' or 'date.contacts.length'","persistent-hint":true}},[_c('fluro-expression-editor',{model:{value:(_vm.model.expression),callback:function ($$v) {_vm.$set(_vm.model, "expression", $$v);},expression:"model.expression"}})],1),_vm._v(" "),_c('br'),_vm._v(" "),_c('v-input',{staticClass:"no-flex",attrs:{"label":"Condition","hint":"Specify a condition that must return 'truthy' for this payment modifier to be enabled.","persistent-hint":true}},[_c('fluro-expression-editor',{model:{value:(_vm.model.condition),callback:function ($$v) {_vm.$set(_vm.model, "condition", $$v);},expression:"model.condition"}})],1)],1)],1),_vm._v(" "),_c('flex-column-body',{staticClass:"help"},[_c('v-container',[_c('label',[_vm._v("Expressions and Variables")]),_vm._v(" "),_c('p',{staticClass:"help-block"},[_vm._v("You can use the variables described below within your value and condition fields.")]),_vm._v(" "),_c('v-btn',{attrs:{"small":"","href":"https://support.fluro.io/kb/advanced-form-expressions-guide","target":"_blank"}},[_vm._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tClick here for more documentation\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t"),_c('fluro-icon',{attrs:{"icon":"external-link","right":""}})],1)],1),_vm._v(" "),_c('modifier-accordion',{attrs:{"title":"Logic Examples"}},[_c('p',[_c('code',[_vm._v("data.age > 18 && date.gender == 'male'")]),_c('br'),_vm._v(" "),_c('span',[_vm._v("Example of using the "),_c('strong',[_vm._v("AND")]),_vm._v(" operator "),_c('strong',[_vm._v("&&")])])]),_vm._v(" "),_c('p',[_c('code',[_vm._v("data.firstName == 'Frank' || data.firstName == 'Susan'")]),_c('br'),_vm._v(" "),_c('span',[_vm._v("Example of using the "),_c('strong',[_vm._v("OR")]),_vm._v(" operator "),_c('strong',[_vm._v("||")])])]),_vm._v(" "),_c('p',[_c('code',[_vm._v("data.age >= 18 ? 'Allowed' : 'Not Allowed'")]),_c('br'),_vm._v(" "),_c('span',[_vm._v("Example of using short hand "),_c('strong',[_vm._v("if/else")])])])]),_vm._v(" "),_vm._l((_vm.availableFields),function(field){return _c('modifier-accordion',{attrs:{"title":field.titles}},_vm._l((field.examples),function(example){return _c('p',[_c('code',[_vm._v(_vm._s(example.path))]),_c('br'),_vm._v(" "),_c('span',[_vm._v(_vm._s(example.description))])])}),0)})],2)],1)],1)};
var __vue_staticRenderFns__$2 = [];

  /* style */
  const __vue_inject_styles__$2 = function (inject) {
    if (!inject) return
    inject("data-v-1df49a15_0", { source: ".border-top{border-top:1px solid rgba(0,0,0,.05)}.border-right{border-right:1px solid rgba(0,0,0,.05)}.border-bottom{border-bottom:1px solid rgba(0,0,0,.05)}.border-left{border-left:1px solid rgba(0,0,0,.05)}.help{background:#eee;border-left:1px solid rgba(0,0,0,.05)}", map: undefined, media: undefined });

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
var __vue_render__$3 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"payment-modifier-editor"},[_c('list-group',[_c('draggable',_vm._b({on:{"sort":_vm.sorted,"start":function($event){_vm.drag=true;},"end":function($event){_vm.drag=false;}},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}},'draggable',_vm.dragOptions,false),_vm._l((_vm.model),function(modifier,index){return _c('payment-modifier-item',{attrs:{"form":_vm.form},on:{"remove":_vm.remove,"duplicate":_vm.duplicate,"edit":_vm.edit},model:{value:(_vm.model[index]),callback:function ($$v) {_vm.$set(_vm.model, index, $$v);},expression:"model[index]"}})}),1)],1),_vm._v(" "),_c('v-btn',{staticClass:"ma-0",attrs:{"color":"primary"},on:{"click":function($event){return _vm.add()}}},[_vm._v("\n        Add Payment Modifier\n        "),_c('fluro-icon',{attrs:{"icon":"plus","right":""}})],1)],1)};
var __vue_staticRenderFns__$3 = [];

  /* style */
  const __vue_inject_styles__$3 = function (inject) {
    if (!inject) return
    inject("data-v-4c35c6f5_0", { source: ".border-top{border-top:1px solid rgba(0,0,0,.05)}.border-right{border-right:1px solid rgba(0,0,0,.05)}.border-bottom{border-bottom:1px solid rgba(0,0,0,.05)}.border-left{border-left:1px solid rgba(0,0,0,.05)}", map: undefined, media: undefined });

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
var __vue_render__$4 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('v-layout',[_c('v-flex',[_c('fluro-content-form-field',{attrs:{"field":_vm.fields.title},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',[_c('fluro-content-form-field',{attrs:{"field":_vm.fields.key},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',[_c('fluro-content-form-field',{attrs:{"field":_vm.fields.type},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"shrink":""}},[_c('v-btn',{attrs:{"icon":""},on:{"click":function($event){return _vm.$emit('remove')}}},[_c('fluro-icon',{attrs:{"icon":"trash-alt"}})],1)],1)],1),_vm._v("\n\t\t\t\tItem\n")],1)};
var __vue_staticRenderFns__$4 = [];

  /* style */
  const __vue_inject_styles__$4 = function (inject) {
    if (!inject) return
    inject("data-v-89ab214a_0", { source: ".border-top{border-top:1px solid rgba(0,0,0,.05)}.border-right{border-right:1px solid rgba(0,0,0,.05)}.border-bottom{border-bottom:1px solid rgba(0,0,0,.05)}.border-left{border-left:1px solid rgba(0,0,0,.05)}", map: undefined, media: undefined });

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
var __vue_render__$5 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('fluro-panel',[_vm._l((_vm.model),function(column,index){return _c('fluro-panel-body',{key:index,staticClass:"border-bottom"},[_c('fluro-column-select-item',{model:{value:(_vm.model[index]),callback:function ($$v) {_vm.$set(_vm.model, index, $$v);},expression:"model[index]"}})],1)}),_vm._v(" "),_c('fluro-panel-body',[_c('v-btn',{on:{"click":function($event){return _vm.add()}}},[_vm._v("Add item")])],1)],2)};
var __vue_staticRenderFns__$5 = [];

  /* style */
  const __vue_inject_styles__$5 = function (inject) {
    if (!inject) return
    inject("data-v-6d8f1c1e_0", { source: ".border-top{border-top:1px solid rgba(0,0,0,.05)}.border-right{border-right:1px solid rgba(0,0,0,.05)}.border-bottom{border-bottom:1px solid rgba(0,0,0,.05)}.border-left{border-left:1px solid rgba(0,0,0,.05)}", map: undefined, media: undefined });

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
  //     'model.definitionName':function(value){
  //         // get() {
  //         //     return this.model.definitionName;
  //         // },
  //         // set(payload) {
  //             if (!value) {
  //                 value = '';
  //             }
  //             var regexp = /[^a-zA-Z0-9-_]+/g;
  //             var cleaned = value.replace(regexp, '');
  //             this.$set(this.model, 'definitionName', cleaned)
  //         // },
  //     },
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
        // 				restrictType: 'eventtrack',
        // 				allDefinitions: true,
        // 				persistentDescription: true,
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
        //     transform(value) {
        //         value = Number(parseFloat(value).toFixed(2));
        //         return value * 100;
        //     }
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
        //     transform(value) {
        //         value = Number(parseFloat(value).toFixed(2));
        //         return value * 100;
        //     }
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
      //     <
      //     label > Contact ID Requirement < /label> <
      //     p class = "help-block" >
      //     Every contact requires either an email address or a phone number
      // for verification. < br / >
      //     Sometimes it makes more sense to ask / require one or both of these <
      //     /p> <
      //     select ng - model = "item.data.identifier"
      // class = "form-control" >
      //     <option value="email">Require an Email Address</option> <
      //     option value = "phone" > Require a Phone Number < /option> <
      //     option value = "either" > Require either Phone Number or Email Address < /option> <
      //     option value = "both" > Require both Phone Number and Email Address < /option> <
      //     /select>

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
      //     key: 'restrictType',
      //     title: 'Reference Type',
      //     description: 'Restrict what kind of items can be referenced in this field',
      //     minimum: 0,
      //     maximum: 1,
      //     type: 'string',
      //     directive: 'select',
      //     options: self.referenceOptions,
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
          //     if (!value) {
          //         return value;
          //     }
          //     var regexp = /[^a-zA-Z0-9-_]+/g;
          //     var cleaned = _.camelCase(value).replace(regexp, '');
          //     return cleaned;
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
var __vue_render__$6 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flex-column',[(_vm.loading)?[_c('fluro-page-preloader',{attrs:{"contain":""}})]:[_c('tabset',{attrs:{"justified":true},model:{value:(_vm.tabIndex),callback:function ($$v) {_vm.tabIndex=$$v;},expression:"tabIndex"}},[(_vm.isForm)?[_c('tab',{attrs:{"heading":"Form Fields"}},[_c('fluro-field-editor',{attrs:{"item":_vm.model},scopedSlots:_vm._u([{key:"form",fn:function(){return [_c('v-container',[_c('constrain',{attrs:{"sm":""}},[_c('fluro-panel',{attrs:{"margin":""}},[_c('fluro-panel-title',[_c('strong',[_vm._v("Configuration")])]),_vm._v(" "),_c('fluro-panel-body',[_c('v-layout',[_c('v-flex',{attrs:{"xs12":"","sm6":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.title},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm6":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.plural},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1)],1),_vm._v(" "),(!_vm.model._id)?[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.showDefinitionName),expression:"showDefinitionName"}]},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.definitionName},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1)]:_vm._e(),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.privacy},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],2)],1),_vm._v(" "),_c('fluro-panel',{attrs:{"margin":""}},[_c('fluro-panel-title',[_c('strong',[_vm._v("Contact Creation")])]),_vm._v(" "),_c('fluro-panel-body',[_c('fluro-content-form',{attrs:{"fields":_vm.dataFields},scopedSlots:_vm._u([{key:"form",fn:function(ref){
var formFields = ref.formFields;
var fieldHash = ref.fieldHash;
var model = ref.model;
var update = ref.update;
var options = ref.options;
return [_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.allowAnonymous},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}}),_vm._v(" "),(!model.allowAnonymous && !model.disableDefaultFields)?[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.identifier},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})]:_vm._e()]}}],null,false,1285757708),model:{value:(_vm.model.data),callback:function ($$v) {_vm.$set(_vm.model, "data", $$v);},expression:"model.data"}})],1)],1),_vm._v(" "),_c('fluro-panel',{attrs:{"margin":""}},[_c('fluro-panel-title',[_c('strong',[_vm._v("Optional Fields")])]),_vm._v(" "),_c('fluro-content-form',{attrs:{"fields":_vm.dataFields},scopedSlots:_vm._u([{key:"form",fn:function(ref){
var formFields = ref.formFields;
var fieldHash = ref.fieldHash;
var model = ref.model;
var update = ref.update;
var options = ref.options;
return [(model.allowAnonymous)?[_c('div',{staticClass:"field-row"},[_c('v-layout',{attrs:{"align-center":""}},[_c('v-flex',{attrs:{"xs4":""}},[_c('v-label',[_vm._v("First Name")])],1),_vm._v(" "),_c('v-flex',{attrs:{"xs4":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.askFirstName},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs4":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.requireFirstName},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1)],1)],1),_vm._v(" "),_c('div',{staticClass:"field-row"},[_c('v-layout',{attrs:{"align-center":""}},[_c('v-flex',{attrs:{"xs4":""}},[_c('v-label',[_vm._v("Last Name")])],1),_vm._v(" "),_c('v-flex',{attrs:{"xs4":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.askLastName},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs4":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.requireLastName},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1)],1)],1),_vm._v(" "),_c('div',{staticClass:"field-row"},[_c('v-layout',{attrs:{"align-center":""}},[_c('v-flex',{attrs:{"xs4":""}},[_c('v-label',[_vm._v("Email Address")])],1),_vm._v(" "),_c('v-flex',{attrs:{"xs4":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.askEmail},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs4":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.requireEmail},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1)],1)],1),_vm._v(" "),_c('div',{staticClass:"field-row"},[_c('v-layout',{attrs:{"align-center":""}},[_c('v-flex',{attrs:{"xs4":""}},[_c('v-label',[_vm._v("Phone Number")])],1),_vm._v(" "),_c('v-flex',{attrs:{"xs4":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.askPhone},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs4":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.requirePhone},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1)],1)],1),_vm._v(" "),_c('div',{staticClass:"field-row"},[_c('v-layout',{attrs:{"align-center":""}},[_c('v-flex',{attrs:{"xs4":""}},[_c('v-label',[_vm._v("Gender")])],1),_vm._v(" "),_c('v-flex',{attrs:{"xs4":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.askGender},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs4":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.requireGender},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1)],1)],1)]:_vm._e(),_vm._v(" "),_c('div',{staticClass:"field-row"},[_c('v-layout',{attrs:{"align-center":""}},[_c('v-flex',{attrs:{"xs4":""}},[_c('v-label',[_vm._v("Date of Birth")])],1),_vm._v(" "),_c('v-flex',{attrs:{"xs4":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.askDOB},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs4":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.requireDOB},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1)],1)],1),_vm._v(" "),(model.allowAnonymous)?_c('fluro-panel-body',{staticClass:"border-top"},[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.disableBestGuess},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1):_vm._e()]}}],null,false,4126247000),model:{value:(_vm.model.data),callback:function ($$v) {_vm.$set(_vm.model, "data", $$v);},expression:"model.data"}})],1),_vm._v(" "),(_vm.definition)?_c('fluro-panel',{attrs:{"margin":""}},[_c('fluro-panel-title',[_c('strong',[_vm._v(_vm._s(_vm.definition.title)+" Information")])]),_vm._v(" "),_c('fluro-panel-body',[_c('fluro-content-form',{attrs:{"options":_vm.definitionFormOptions,"fields":_vm.definition.fields},model:{value:(_vm.model.data),callback:function ($$v) {_vm.$set(_vm.model, "data", $$v);},expression:"model.data"}})],1)],1):_vm._e(),_vm._v(" "),_c('v-container',{attrs:{"pa-0":"","grid-list-xl":""}},[_c('v-layout',{attrs:{"row":"","wrap":""}},[_c('v-flex',{attrs:{"xs12":"","sm6":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"options":_vm.options,"field":_vm.fieldHash.publishDate},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm6":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"options":_vm.options,"field":_vm.fieldHash.archiveDate},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1)],1)],1),_vm._v(" "),_c('fluro-panel',{attrs:{"margin":""}},[_c('fluro-panel-title',[_c('Strong',[_vm._v("Automation and other settings")])],1),_vm._v(" "),_c('tabset',[_c('tab',{attrs:{"heading":"Notifications"}},[_c('fluro-panel-body',[_c('fluro-content-form',{attrs:{"fields":_vm.dataFields},scopedSlots:_vm._u([{key:"form",fn:function(ref){
var formFields = ref.formFields;
var fieldHash = ref.fieldHash;
var model = ref.model;
var update = ref.update;
var options = ref.options;
return [_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.enableConfirmation},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.includeTickets},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.confirmationMessage},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.notifyContacts},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.enableReceipt},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})]}}],null,false,3471290849),model:{value:(_vm.model.data),callback:function ($$v) {_vm.$set(_vm.model, "data", $$v);},expression:"model.data"}})],1)],1),_vm._v(" "),_c('tab',{attrs:{"heading":"Processes"}},[_c('fluro-panel-body',[_c('fluro-content-form',{attrs:{"fields":_vm.dataFields},scopedSlots:_vm._u([{key:"form",fn:function(ref){
var formFields = ref.formFields;
var fieldHash = ref.fieldHash;
var model = ref.model;
var update = ref.update;
var options = ref.options;
return [_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.interactionProcesses},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.contactProcesses},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.contactProcessesAll},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.processAssignTo},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})]}}],null,false,3648113199),model:{value:(_vm.model.data),callback:function ($$v) {_vm.$set(_vm.model, "data", $$v);},expression:"model.data"}})],1)],1),_vm._v(" "),_c('tab',{attrs:{"heading":"Groups and Teams"}},[_c('fluro-panel-body',[_c('fluro-content-form',{attrs:{"fields":_vm.dataFields},scopedSlots:_vm._u([{key:"form",fn:function(ref){
var formFields = ref.formFields;
var fieldHash = ref.fieldHash;
var model = ref.model;
var update = ref.update;
var options = ref.options;
return [_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.contactTeams},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.contactTeamsAll},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})]}}],null,false,4247234361),model:{value:(_vm.model.data),callback:function ($$v) {_vm.$set(_vm.model, "data", $$v);},expression:"model.data"}})],1)],1),_vm._v(" "),_c('tab',{attrs:{"heading":"Capabilities"}},[_c('fluro-panel-body',[_c('fluro-content-form',{attrs:{"fields":_vm.dataFields},scopedSlots:_vm._u([{key:"form",fn:function(ref){
var formFields = ref.formFields;
var fieldHash = ref.fieldHash;
var model = ref.model;
var update = ref.update;
var options = ref.options;
return [_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.contactCapabilities},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.capabilitiesAll},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})]}}],null,false,671170745),model:{value:(_vm.model.data),callback:function ($$v) {_vm.$set(_vm.model, "data", $$v);},expression:"model.data"}})],1)],1),_vm._v(" "),_c('tab',{attrs:{"heading":"Reaction Pipelines"}},[_c('fluro-panel-body',[_c('fluro-content-form',{attrs:{"fields":_vm.dataFields},scopedSlots:_vm._u([{key:"form",fn:function(ref){
var formFields = ref.formFields;
var fieldHash = ref.fieldHash;
var model = ref.model;
var update = ref.update;
var options = ref.options;
return [_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.reactionPipelines},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})]}}],null,false,549328213),model:{value:(_vm.model.data),callback:function ($$v) {_vm.$set(_vm.model, "data", $$v);},expression:"model.data"}})],1)],1),_vm._v(" "),_c('tab',{attrs:{"heading":"Other Options"}},[_c('fluro-panel-body',[_c('fluro-content-form',{attrs:{"fields":_vm.dataFields},scopedSlots:_vm._u([{key:"form",fn:function(ref){
var formFields = ref.formFields;
var fieldHash = ref.fieldHash;
var model = ref.model;
var update = ref.update;
var options = ref.options;
return [_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.blc},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})]}}],null,false,1888095360),model:{value:(_vm.model.data),callback:function ($$v) {_vm.$set(_vm.model, "data", $$v);},expression:"model.data"}})],1)],1)],1)],1)],1)],1)]},proxy:true},{key:"payment",fn:function(){return [_c('v-container',[_c('fluro-content-form',{attrs:{"fields":_vm.paymentFields},scopedSlots:_vm._u([{key:"form",fn:function(ref){
var formFields = ref.formFields;
var fieldHash = ref.fieldHash;
var model = ref.model;
var update = ref.update;
var options = ref.options;
return [_c('fluro-panel',{attrs:{"margin":""}},[_c('fluro-panel-body',[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.required},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.allow},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1),_vm._v(" "),(_vm.paymentIsEnabled)?[_c('v-container',{attrs:{"pa-0":""}},[(model.required)?_c('fluro-panel-body',{staticClass:"border-top"},[_c('v-layout',[_c('v-flex',{attrs:{"xs9":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.amount},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs3":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.currency},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1)],1)],1):_vm._e(),_vm._v(" "),(model.allow && !model.required)?_c('fluro-panel-body',{staticClass:"border-top"},[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.currency},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}}),_vm._v(" "),_c('v-layout',[_c('v-flex',{attrs:{"xs12":"","sm6":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.minAmount},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm6":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.maxAmount},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1)],1)],1):_vm._e()],1)]:_vm._e()],2)]}}],null,false,587729594),model:{value:(_vm.model.paymentDetails),callback:function ($$v) {_vm.$set(_vm.model, "paymentDetails", $$v);},expression:"model.paymentDetails"}}),_vm._v(" "),(_vm.paymentIsEnabled)?[_c('v-input',{staticClass:"no-flex"},[_c('v-label',[_vm._v("Payment Gateway")]),_vm._v(" "),_c('p',{staticClass:"help-block"},[_vm._v("Select the integration that should be used to process these payments")]),_vm._v(" "),_c('fluro-content-select-button',{attrs:{"block":"","type":"integration"},model:{value:(_vm.model.data.publicData.paymentGateways),callback:function ($$v) {_vm.$set(_vm.model.data.publicData, "paymentGateways", $$v);},expression:"model.data.publicData.paymentGateways"}})],1),_vm._v(" "),_c('fluro-panel',{attrs:{"margin":""}},[_c('fluro-panel-body',[_c('v-input',{staticClass:"no-flex"},[_c('v-label',[_vm._v("Payment Modifiers")]),_vm._v(" "),_c('p',{staticClass:"help-block"},[_vm._v("Add payment modifiers to adjust the required payment amount depending on values entered by the user")]),_vm._v(" "),_c('payment-modifier-editor',{attrs:{"form":_vm.model},model:{value:(_vm.model.paymentDetails.modifiers),callback:function ($$v) {_vm.$set(_vm.model.paymentDetails, "modifiers", $$v);},expression:"model.paymentDetails.modifiers"}})],1)],1)],1),_vm._v(" "),_c('fluro-content-form',{attrs:{"fields":_vm.dataFields},scopedSlots:_vm._u([{key:"form",fn:function(ref){
var formFields = ref.formFields;
var fieldHash = ref.fieldHash;
var model = ref.model;
var update = ref.update;
var options = ref.options;
return [_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.enableReceipt},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})]}}],null,false,3232139792),model:{value:(_vm.model.data),callback:function ($$v) {_vm.$set(_vm.model, "data", $$v);},expression:"model.data"}}),_vm._v(" "),_c('fluro-content-form',{attrs:{"fields":_vm.paymentFields},scopedSlots:_vm._u([{key:"form",fn:function(ref){
var formFields = ref.formFields;
var fieldHash = ref.fieldHash;
var model = ref.model;
var update = ref.update;
var options = ref.options;
return [_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.allowAlternativePayments},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}}),_vm._v(" "),(model.allowAlternativePayments)?_c('fluro-panel',{attrs:{"margin":""}},[_c('tabset',{model:{value:(_vm.alternativePaymentMethodIndex),callback:function ($$v) {_vm.alternativePaymentMethodIndex=$$v;},expression:"alternativePaymentMethodIndex"}},_vm._l((_vm.alternativePaymentMethods),function(method,index){return _c('tab',{attrs:{"heading":method.title}},[_c('fluro-panel-body',[_c('fluro-content-form',{attrs:{"fields":_vm.paymentMethodFields},model:{value:(_vm.alternativePaymentMethods[index]),callback:function ($$v) {_vm.$set(_vm.alternativePaymentMethods, index, $$v);},expression:"alternativePaymentMethods[index]"}}),_vm._v(" "),_c('v-layout',[_c('v-spacer'),_vm._v(" "),_c('v-flex',{attrs:{"shrink":""}},[_c('v-btn',{staticClass:"ma-0",attrs:{"small":"","color":"error"},on:{"click":function($event){return _vm.removeAlternativePaymentMethod(method, index)}}},[_vm._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tRemove "+_vm._s(method.title)+"\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t")])],1)],1)],1)],1)}),1),_vm._v(" "),_c('fluro-panel-body',{staticClass:"border-top"},[_c('v-btn',{staticClass:"ma-0",attrs:{"color":"primary"},on:{"click":function($event){return _vm.addAlternativePaymentMethod()}}},[_vm._v("Add additional payment method")])],1)],1):_vm._e()]}}],null,false,3464348361),model:{value:(_vm.model.paymentDetails),callback:function ($$v) {_vm.$set(_vm.model, "paymentDetails", $$v);},expression:"model.paymentDetails"}})]:_vm._e()],2)]},proxy:true}],null,false,975042279),model:{value:(_vm.model.fields),callback:function ($$v) {_vm.$set(_vm.model, "fields", $$v);},expression:"model.fields"}})],1)]:[_c('tab',{attrs:{"heading":"Configuration"}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',{attrs:{"grid-list-xl":""}},[_c('constrain',{attrs:{"sm":""}},[_c('fluro-panel',[_c('fluro-panel-body',[_c('v-layout',[_c('v-flex',{attrs:{"xs12":"","sm6":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.title},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm6":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.plural},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1)],1),_vm._v(" "),(_vm.model._id)?[_c('fluro-panel',[_c('fluro-panel-body',[_c('v-layout',[_c('v-flex',{attrs:{"xs12":"","sm6":""}},[_c('div',{staticClass:"form-group"},[_c('label',[_vm._v("Definition Name")]),_vm._v(" "),_c('div',[_vm._v(_vm._s(_vm.model.definitionName))])])]),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm6":""}},[_c('div',{staticClass:"form-group"},[_c('label',[_vm._v("Extends type")]),_vm._v(" "),_c('div',[_vm._v(_vm._s(_vm._f("definitionTitle")(_vm.model.parentType)))])])])],1)],1)],1)]:[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.showDefinitionName),expression:"showDefinitionName"}]},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.definitionName},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1),_vm._v(" "),(_vm.lockedSubType)?void 0:[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.parentType},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-panel',[_c('fluro-panel-body',[_c('v-layout',[_c('v-flex',{attrs:{"xs12":"","sm6":""}},[_c('div',{staticClass:"form-group"},[_c('label',[_vm._v("Definition Name")]),_vm._v(" "),_c('div',[_vm._v(_vm._s(_vm.model.definitionName))])])]),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm6":""}},[_c('div',{staticClass:"form-group"},[_c('label',[_vm._v("Extends type")]),_vm._v(" "),_c('div',[_vm._v(_vm._s(_vm._f("definitionTitle")(_vm.model.parentType)))])])])],1)],1)],1)]],_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.privacy},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],2)],1),_vm._v(" "),(_vm.model.parentType == 'process')?_c('fluro-panel',[_c('fluro-panel-body',[_c('h4',{attrs:{"margin":""}},[_vm._v("Process Board Options")]),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.firstLine},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form',{attrs:{"fields":_vm.processFields},model:{value:(_vm.model.data),callback:function ($$v) {_vm.$set(_vm.model, "data", $$v);},expression:"model.data"}})],1)],1):_vm._e(),_vm._v(" "),(_vm.model.parentType == 'roster')?_c('fluro-panel',[_c('tabset',{attrs:{"justified":""}},[_c('tab',{attrs:{"heading":"Roster Settings"}},[_c('fluro-panel-body',[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.weight},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form',{attrs:{"fields":_vm.rosterFields},model:{value:(_vm.model.data),callback:function ($$v) {_vm.$set(_vm.model, "data", $$v);},expression:"model.data"}})],1)],1),_vm._v(" "),_c('tab',{attrs:{"heading":"Default Slots"}},[_c('roster-slot-manager',{model:{value:(_vm.model.data.slots),callback:function ($$v) {_vm.$set(_vm.model.data, "slots", $$v);},expression:"model.data.slots"}})],1),_vm._v(" "),_c('tab',{attrs:{"heading":"Reminders"}}),_vm._v(" "),_c('tab',{attrs:{"heading":"Roster Restrictions"}},[_c('fluro-panel-body',[_c('fluro-content-form',{attrs:{"fields":_vm.restrictionFields},model:{value:(_vm.model.data),callback:function ($$v) {_vm.$set(_vm.model, "data", $$v);},expression:"model.data"}})],1)],1)],1)],1):_vm._e()],1)],1)],1)],1),_vm._v(" "),(_vm.fieldsMakeSense)?_c('tab',{attrs:{"heading":"Manage Fields"}},[_c('fluro-field-editor',{attrs:{"item":_vm.model},model:{value:(_vm.model.fields),callback:function ($$v) {_vm.$set(_vm.model, "fields", $$v);},expression:"model.fields"}})],1):_vm._e(),_vm._v(" "),(_vm.definition && _vm.definition.definitionName != 'form')?_c('tab',{attrs:{"heading":((_vm.definition.title) + " Information")}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',[_c('constrain',{attrs:{"sm":""}},[_c('fluro-content-form',{attrs:{"options":_vm.definitionFormOptions,"fields":_vm.definition.fields},model:{value:(_vm.model.data),callback:function ($$v) {_vm.$set(_vm.model, "data", $$v);},expression:"model.data"}})],1)],1)],1)],1):_vm._e(),_vm._v(" "),_c('tab',{attrs:{"heading":"Advanced"}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',[_c('constrain',{attrs:{"sm":""}},[(_vm.model.parentType != 'realm')?_c('fluro-panel',[_c('fluro-panel-title',[_c('h5',[_vm._v("Restrict To Realms")]),_vm._v(" "),_c('div',{staticClass:"muted"},[_vm._v("Select which realms these "+_vm._s(_vm._f("definitionTitle")(_vm.model.parentType,true))+" can be created in")])]),_vm._v(" "),_c('fluro-panel-body',[_c('fluro-realm-select',{model:{value:(_vm.model.restrictRealms),callback:function ($$v) {_vm.$set(_vm.model, "restrictRealms", $$v);},expression:"model.restrictRealms"}})],1)],1):_vm._e()],1)],1)],1)],1)]],2)]],2)};
var __vue_staticRenderFns__$6 = [];

  /* style */
  const __vue_inject_styles__$6 = function (inject) {
    if (!inject) return
    inject("data-v-2b4370e2_0", { source: ".border-top[data-v-2b4370e2]{border-top:1px solid rgba(0,0,0,.05)}.border-right[data-v-2b4370e2]{border-right:1px solid rgba(0,0,0,.05)}.border-bottom[data-v-2b4370e2]{border-bottom:1px solid rgba(0,0,0,.05)}.border-left[data-v-2b4370e2]{border-left:1px solid rgba(0,0,0,.05)}.field-row[data-v-2b4370e2]{padding:0 15px;border-bottom:1px solid rgba(0,0,0,.1)}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$6 = "data-v-2b4370e2";
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
//# sourceMappingURL=definition-8e6c1c21.js.map
