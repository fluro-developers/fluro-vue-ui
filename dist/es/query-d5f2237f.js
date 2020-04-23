import { bb as __vue_normalize__, bc as __vue_create_injector__, l as FluroConfirmButton, ab as FilterConditionGroup } from './index-f6c3de36.js';
import 'vuedraggable';
import 'vue-color';
import 'tippy.js';
import 'vue2-ace-editor';
import 'js-beautify';
import 'tiptap';
import 'tiptap-commands';
import 'tiptap-extensions';
import 'signature_pad';
import { FilterService } from 'fluro';
import 'vuex-map-fields';
import 'async';
import { F as FluroContentEditMixin } from './FluroContentEditMixin-4e710d9b.js';

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
//
//
var script = {
  props: {
    options: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      model: this.value,
      expanded: false
    };
  },

  watch: {
    'model': function (val) {
      return this.$emit('pathupdated', val);
    },
    'value': function (val) {
      this.model = val;
    }
  },
  methods: {
    toggle() {
      this.expanded = !this.expanded;
    }

  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('v-layout',{attrs:{"row":""}},[_c('v-flex',{attrs:{"pr-0":""}},[_c('v-select',{staticStyle:{"overflow":"hidden","white-space":"nowrap"},attrs:{"items":_vm.options,"label":"Key Value","item-value":"key","item-text":"title","loading":_vm.loading ? 'primary' : false},scopedSlots:_vm._u([{key:"selection",fn:function(ref){
var item = ref.item;
return [_c('span',{staticStyle:{"overflow":"hidden","white-space":"nowrap"}},[_vm._v(_vm._s(item.title))])]}}]),model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"shrink":"","px-0":""}},[_c('v-btn',{staticStyle:{"height":"44px"},attrs:{"flat":"","block":""},on:{"click":_vm.toggle}},[_c('fluro-icon',{attrs:{"icon":_vm.expanded ? 'chevron-down' : 'chevron-left'}})],1)],1)],1),_vm._v(" "),(_vm.expanded)?_c('div',{staticClass:"dropdown-box py-0"},[_c('v-text-field',{attrs:{"single-line":""},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1):_vm._e(),_vm._v(" "),_c('div',{staticClass:"muted mb-0",style:(_vm.expanded ? 'margin-top: -18px' : 'margin-top: -30px')},[_vm._v("\n    \t"+_vm._s(_vm.model)+"\n    ")])],1)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-1fc5b588_0", { source: ".border-top[data-v-1fc5b588]{border-top:1px solid rgba(0,0,0,.05)}.border-right[data-v-1fc5b588]{border-right:1px solid rgba(0,0,0,.05)}.border-bottom[data-v-1fc5b588]{border-bottom:1px solid rgba(0,0,0,.05)}.border-left[data-v-1fc5b588]{border-left:1px solid rgba(0,0,0,.05)}.dropdown-box[data-v-1fc5b588]{width:100%;margin-top:-44px}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-1fc5b588";
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
var script$1 = {
  mixins: [FluroContentEditMixin],
  props: {
    value: {
      type: Array,
      default: function () {
        return [];
      }
    },
    sampleData: {
      type: Array,
      default: function () {
        return [];
      }
    },
    config: {
      type: Object
    },
    loadingSample: {
      type: Boolean,
      default: false
    }
  },

  created() {},

  components: {
    FluroConfirmButton,
    PathSelector: __vue_component__
  },

  data() {
    return {
      model: this.value,
      proposed: {
        title: '',
        key: ''
      }
    };
  },

  methods: {
    add() {
      var self = this;
      var clone = JSON.parse(JSON.stringify(self.proposed));
      this.model.push(clone);
      self.$set(self, "proposed", {
        title: '',
        key: ''
      });
    },

    proposedPathUpdated(value) {
      this.proposed.key = value;
    },

    pathUpdated(index, value) {
      this.model[index].key = value;
    },

    remove(index) {
      this.model.splice(index, 1);
    },

    extract(model) {
      var self = this;
      var item = this.flatten(model);
      return _.chain(item).map(function (value, key) {
        var depth = key.split('.').length;

        _.times(depth - 1, function () {
        });

        var matchObject = _.get(model, key);

        var readable = key + ' - ' + value; /////////////////////////

        if (_.isArray(matchObject)) {
          readable = key + ' (multiple items)';
        }

        if (_.isString(matchObject)) {
          var momentDate = self.$fluro.date.moment(matchObject, self.$fluro.date.moment.ISO_8601, true);
          var isValid = momentDate.isValid();

          if (isValid) {
            matchObject = momentDate.toDate();
          }
        }

        if (_.isDate(matchObject)) ; /////////////////////////


        return {
          //value: value,
          key: key,
          //depth: depth,
          //type: type,
          //indent: indent,
          title: readable
        };
      }).sortBy(function (entry) {
        return entry.title;
      }).value();
    },

    flatten(obj) {
      var flattened = {};
      var circlular = [];
      var circLoc = [];

      function _route(prefix, value) {
        var i, len, keys, circularCheck, loc;

        if (value == null) {
          if (prefix === "") {
            return;
          }

          flattened[prefix] = null;
          return;
        }

        if (typeof value == "object") {
          circularCheck = circlular.indexOf(value);

          if (circularCheck >= 0) {
            loc = circLoc[circularCheck] || "this";
            flattened[prefix] = "[Circular (" + loc + ")]";
            return;
          }

          circlular.push(value);
          circLoc.push(prefix);

          if (Array.isArray(value)) {
            len = value.length;

            _route(prefix); //Dont loop if the array is massive


            if (len > 10) {
              len = 10;
            }

            for (i = 0; i < len; i++) {
              _route(prefix + "[" + i + "]", value[i]);
            }

            return;
          }

          keys = Object.keys(value);
          len = keys.length;
          if (prefix) prefix = prefix + ".";
          if (len == 0) _route(prefix, null);

          for (i = 0; i < len; i++) {
            _route(prefix + keys[i], value[keys[i]]);
          }

          return;
        }

        flattened[prefix] = value;
      }

      _route("", obj);

      return flattened;
    }

  },
  computed: {
    fieldsOutput() {
      var array = []; ///////////////////////////////////

      addField("title", {
        title: "Column Title",
        minimum: 0,
        maximum: 1,
        type: "string"
      }); ///////////////////////////////////

      function addField(key, details) {
        details.key = key;
        array.push(details);
      }

      return array;
    },

    sampleQuery() {
      var self = this;

      if (!self.sampleData.length) {
        return [];
      }

      return _.chain(self.sampleData).reduce(function (set, item) {
        //We have the column
        var columns = self.extract(item);

        _.each(columns, function (column) {
          var existing = set[column.key];

          if (!existing) {
            existing = set[column.key] = column;
            existing.examples = [];
          } //add the examples


          if (existing.examples.indexOf(column.value) == -1) {
            existing.examples.push(column.value);
          }
        });

        return set;
      }, {}).values() // .reduce(function(obj) {
      //     return {title: obj.readable, key: obj.key};
      // })
      .value();
    },

    columnKeyOptions() {
      var self = this;

      if (!self.sampleQuery || !self.sampleQuery.length) {
        return [];
      }

      var res = JSON.parse(JSON.stringify(self.sampleQuery));
      res.splice(0, 0, {
        title: 'Select a Data Source',
        key: ''
      });
      return res;
    }

  }
};

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('list-group',_vm._l((_vm.model),function(column,index){return _c('list-group-item',[_c('v-container',{attrs:{"fluid":"","grid-list-xl":""}},[_c('v-layout',{attrs:{"align-start":"","row":"","wrap":""}},[_c('v-flex',{staticClass:"full-width",attrs:{"sm10":"","xs12":"","pa-1":""}},[_c('v-layout',{attrs:{"align-start":"","row":"","wrap":""}},[_c('v-flex',{attrs:{"sm4":"","xs12":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.title},model:{value:(_vm.model[index]),callback:function ($$v) {_vm.$set(_vm.model, index, $$v);},expression:"model[index]"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"sm8":"","xs12":""}},[_c('path-selector',{attrs:{"options":_vm.columnKeyOptions,"loading":_vm.loadingSample},on:{"pathupdated":function($event){
var i = arguments.length, argsArray = Array(i);
while ( i-- ) argsArray[i] = arguments[i];
return _vm.pathUpdated.apply(void 0, [ index ].concat( argsArray ))}},model:{value:(_vm.model[index].key),callback:function ($$v) {_vm.$set(_vm.model[index], "key", $$v);},expression:"model[index].key"}})],1)],1)],1),_vm._v(" "),_c('v-flex',{staticClass:"full-width",attrs:{"sm2":"","xs12":"","pa-1":""}},[_c('fluro-confirm-button',{attrs:{"content":"Remove"},on:{"click":function($event){return _vm.remove(index)}},scopedSlots:_vm._u([{key:"default",fn:function(ref){
var confirming = ref.confirming;
return [_c('v-btn',{staticStyle:{"transition":"all 0.1s","width":"100%"},attrs:{"flat":"","block":"","color":confirming ? 'red' : ''}},[_vm._v(_vm._s(confirming ? "Confirm?" : "Remove"))])]}}],null,true)})],1)],1)],1)],1)}),1),_vm._v(" "),_c('fluro-panel',[_c('fluro-panel-body',[_c('form',{on:{"submit":function($event){$event.preventDefault();$event.stopPropagation();return _vm.add()}}},[_c('v-container',{attrs:{"fluid":"","grid-list-xl":"","pa-1":""}},[_c('v-layout',{attrs:{"row":"","wrap":"","grid-list-xl":""}},[_c('v-flex',{attrs:{"sm10":"","xs12":""}},[_c('v-layout',{attrs:{"row":"","wrap":""}},[_c('v-flex',{attrs:{"sm4":"","xs12":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.title},model:{value:(_vm.proposed),callback:function ($$v) {_vm.proposed=$$v;},expression:"proposed"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"sm8":"","xs12":""}},[_c('path-selector',{attrs:{"options":_vm.columnKeyOptions,"loading":_vm.loadingSample},on:{"pathupdated":_vm.proposedPathUpdated},model:{value:(_vm.proposed.key),callback:function ($$v) {_vm.$set(_vm.proposed, "key", $$v);},expression:"proposed.key"}})],1)],1)],1),_vm._v(" "),_c('v-flex',{attrs:{"sm2":"","xs12":""}},[_c('v-btn',{attrs:{"block":"","color":"primary","type":"submit","disabled":!_vm.proposed.key},on:{"click":function($event){return _vm.add()}}},[_vm._v("Add")])],1)],1)],1)],1)])],1)],1)};
var __vue_staticRenderFns__$1 = [];

  /* style */
  const __vue_inject_styles__$1 = function (inject) {
    if (!inject) return
    inject("data-v-427ae622_0", { source: ".border-top{border-top:1px solid rgba(0,0,0,.05)}.border-right{border-right:1px solid rgba(0,0,0,.05)}.border-bottom{border-bottom:1px solid rgba(0,0,0,.05)}.border-left{border-left:1px solid rgba(0,0,0,.05)}.full-width{width:100%}", map: undefined, media: undefined });

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
  mixins: [FluroContentEditMixin],
  components: {
    FilterConditionGroup,
    ColumnCustomiser: __vue_component__$1
  },
  methods: {
    modelUpdated() {
      this.update(this.model);
    },

    reloadSample() {
      var self = this; //return;
      //////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////

      if (!self.model.filterType) {
        console.log('NO FILTER TYPE');
        return;
      } //////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////


      self.loadingSample = true; // return new Promise(function(resolve, reject) {
      // if (self.model._id) {
      //     return self.$fluro.api.get(`/content/_query/${self.model._id}`)
      //         .then(sampleLoaded)
      //         .catch(sampleFailed);
      // } else {
      //Run a dynamic query and get the sample data

      return self.$fluro.api.post(`/content/${self.model.filterType}/filter`, {
        // sort: self.sort,
        filter: self.model.filterConfiguration,
        startDate: self.model.filterStartDate,
        endDate: self.model.filterEndDate,
        search: self.model.filterSearch,
        // includeArchived: self.includeArchivedByDefault,
        allDefinitions: true,
        //self.allDefinitions,
        // includeUnmatched: true,
        sample: true,
        limit: 5
      }).then(sampleLoaded).catch(sampleFailed); // }
      //////////////////////////////////////////////////////////////////////////////

      function sampleLoaded(res) {
        self.sample = res.data;
        self.loadingSample = false;
      } //////////////////////////////////////////////////////////////////////////////


      function sampleFailed(res) {
        // console.log('SAMPLE FAILED', res)
        self.sample = [];
        self.loadingSample = false;
      } // })

    }

  },

  created() {
    var self = this;

    if (!this.model.filterConfiguration) {
      this.model.filterConfiguration = {};
    }

    self.reloadSample();
  },

  watch: {
    changeString() {
      var self = this;
      self.reloadSample();
    }

  },
  asyncComputed: {
    typeOptions: {
      default: [],

      get() {
        var self = this;

        if (self.model.query) {
          return new Promise(function (resolve, reject) {
            return reject();
          });
        }

        return new Promise(function (resolve, reject) {
          self.$fluro.types.terms().then(function (res) {
            //Map the types
            var mappedTypeOptions = _.chain(res).map(function (entry, key) {
              var label = entry.parentType ? `${self.$fluro.types.readable(entry.parentType)} - ${self.$fluro.types.readable(key)}` : `${self.$fluro.types.readable(key)}`;
              return {
                name: label,
                value: key,
                parentType: entry.parentType
              };
            }).orderBy('name').values().value();

            mappedTypeOptions.unshift({
              name: 'Anything',
              key: 'node',
              value: 'node'
            }); // console.log('MAPPED TYPES', mappedTypeOptions)
            //Resolve the array

            resolve(mappedTypeOptions);
          }).catch(function (err) {
            reject(err);
          });
        });
      }

    }
  },
  computed: {
    rows() {
      return [];
    },

    showOutline() {
      return false; //true; //false;//true;//false;//true;
    },

    fieldsOutput() {
      var self = this;
      var array = []; ///////////////////////////////////

      addField('title', {
        title: 'Title',
        minimum: 1,
        maximum: 1,
        type: 'string',
        placeholder: 'Eg. My Awesome List'
      });
      addField('firstLine', {
        title: 'Description',
        minimum: 0,
        maximum: 1,
        type: 'string',
        placeholder: 'Eg. A list of my favorite people'
      }); // console.log('TYPE OPTIONS', self.typeOptions);

      addField('filterType', {
        title: 'Type',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'select',
        description: 'The type of item you want to return from this query',
        options: self.typeOptions
      }); ///////////////////////////////////

      function addField(key, details) {
        details.key = key;
        array.push(details);
      }

      return array;
    },

    changeString() {
      var self = this;

      if (self.model.query) {
        return;
      }

      var filterString = FilterService.getFilterChangeString(self.model.filterConfiguration);
      console.log('Filter configuration changed', filterString);
      return `${filterString}`;
    }

  },

  data() {
    return {
      sample: [],
      loadingSample: false,
      filterDebounce: 500
    };
  }

};

/* script */
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flex-column',[(_vm.loading)?[_c('fluro-page-preloader',{attrs:{"contain":""}})]:_c('tabset',{attrs:{"justified":true,"vertical":true}},[_c('tab',{attrs:{"heading":"Query Details"}},[_vm._t("default",[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',[_c('constrain',{attrs:{"sm":""}},[_c('h3',{attrs:{"margin":""}},[_vm._v("Query Details")]),_vm._v(" "),_c('div',{staticClass:"grid-list-xl"},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.title},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.firstLine},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1),_vm._v(" "),(!_vm.model.query || _vm.model.filterType)?_c('fluro-panel',[_c('fluro-panel-title',[(_vm.model.disableDataTypeSelect || _vm.model._id)?[_c('h4',[_vm._v(_vm._s(_vm._f("definitionTitle")(_vm.model.filterType,true))+" ")])]:[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.filterType},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})]],2),_vm._v(" "),_c('fluro-panel-body',[_c('filter-condition-group',{attrs:{"rows":_vm.rows,"useSample":true,"mini":true,"type":_vm.model.filterType,"debounce":_vm.filterDebounce},model:{value:(_vm.model.filterConfiguration),callback:function ($$v) {_vm.$set(_vm.model, "filterConfiguration", $$v);},expression:"model.filterConfiguration"}})],1)],1):_vm._e()],1)],1),_vm._v(" "),_c('v-container',{staticClass:"border-top"},[_c('constrain',[_c('h3',{attrs:{"margin":""}},[_vm._v("Columns")]),_vm._v(" "),_c('column-customiser',{attrs:{"sampleData":_vm.sample,"config":_vm.config,"loadingSample":_vm.loadingSample},model:{value:(_vm.model.columns),callback:function ($$v) {_vm.$set(_vm.model, "columns", $$v);},expression:"model.columns"}})],1)],1)],1)])],2)],1)],2)};
var __vue_staticRenderFns__$2 = [];

  /* style */
  const __vue_inject_styles__$2 = function (inject) {
    if (!inject) return
    inject("data-v-3608ca69_0", { source: ".border-top[data-v-3608ca69]{border-top:1px solid rgba(0,0,0,.05)}.border-right[data-v-3608ca69]{border-right:1px solid rgba(0,0,0,.05)}.border-bottom[data-v-3608ca69]{border-bottom:1px solid rgba(0,0,0,.05)}.border-left[data-v-3608ca69]{border-left:1px solid rgba(0,0,0,.05)}.hint[data-v-3608ca69]{font-size:10px;opacity:.5;color:inherit;display:block}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$2 = "data-v-3608ca69";
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

export default __vue_component__$2;
//# sourceMappingURL=query-d5f2237f.js.map
