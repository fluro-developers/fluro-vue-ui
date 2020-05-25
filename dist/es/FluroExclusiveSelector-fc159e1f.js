import { be as styleInject, bf as __vue_normalize__ } from './index-78607ce6.js';

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
/////////////////////////////////
var script = {
  props: {
    isChecked: {
      type: Boolean
    },
    label: {
      type: String,
      default: ''
    }
  },
  components: {},

  data() {
    return {};
  },

  created() {},

  watch: {},
  methods: {},
  computed: {}
};

var css_248z = ".border-top[data-v-15be6a11]{border-top:1px solid rgba(0,0,0,.05)}.border-right[data-v-15be6a11]{border-right:1px solid rgba(0,0,0,.05)}.border-bottom[data-v-15be6a11]{border-bottom:1px solid rgba(0,0,0,.05)}.border-left[data-v-15be6a11]{border-left:1px solid rgba(0,0,0,.05)}.display-inline[data-v-15be6a11]{display:inline-block;cursor:pointer;-webkit-transition:all .5s;-o-transition:all .5s;transition:all .5s;position:relative}.display-inline .ischecked[data-v-15be6a11]{background:#4cc650}.display-inline .isunchecked[data-v-15be6a11]{background:#fff}.display-inline:hover .box.ischecked[data-v-15be6a11]{background:#fff;border-color:#44c448}.display-inline:hover .box.ischecked .checked[data-v-15be6a11]{background:#4cc650;-webkit-box-shadow:2px 0 0 #4cc650,4px 0 0 #4cc650,4px -2px 0 #4cc650,4px -4px 0 #4cc650,4px -6px 0 #4cc650,4px -8px 0 #4cc650;box-shadow:2px 0 0 #4cc650,4px 0 0 #4cc650,4px -2px 0 #4cc650,4px -4px 0 #4cc650,4px -6px 0 #4cc650,4px -8px 0 #4cc650}.display-inline:hover .box.isunchecked[data-v-15be6a11]{background:#f3f3f3;border-color:#bfbfbf}.check-label[data-v-15be6a11]{margin-left:25px}.noselect[data-v-15be6a11]{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.box[data-v-15be6a11],.tick[data-v-15be6a11]{position:absolute;-webkit-transition:all .5s;-o-transition:all .5s;transition:all .5s}.box[data-v-15be6a11]{border-radius:3px;width:18px;height:18px;line-height:18px;text-align:center;padding:0;border:1px solid #e2e7ee;margin-right:5px;font-size:12px}.tick[data-v-15be6a11]{content:\"\";left:3px;top:7px;background:#fff;width:2px;height:2px;z-index:10;-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg);-webkit-box-shadow:2px 0 0 #fff,4px 0 0 #fff,4px -2px 0 #fff,4px -4px 0 #fff,4px -6px 0 #fff,4px -8px 0 #fff;box-shadow:2px 0 0 #fff,4px 0 0 #fff,4px -2px 0 #fff,4px -4px 0 #fff,4px -6px 0 #fff,4px -8px 0 #fff}.tick.checked[data-v-15be6a11]{-webkit-transform:rotate(45deg),scale(1);-ms-transform:rotate(45deg),scale(1);transform:rotate(45deg),scale(1);opacity:1}.tick.unchecked[data-v-15be6a11]{-webkit-transform:rotate(0),scale(0);-ms-transform:rotate(0),scale(0);transform:rotate(0),scale(0);opacity:0}";
styleInject(css_248z);

/* script */
const __vue_script__ = script;
/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"display-inline",on:{"click":function($event){return _vm.$emit('click')}}},[_c('span',{staticClass:"box",class:_vm.isChecked ? 'ischecked' : 'isunchecked'},[_c('span',{staticClass:"tick",class:_vm.isChecked ? 'checked' : 'unchecked'})]),_vm._v(" "),_c('span',{staticClass:"check-label noselect"},[_vm._v(_vm._s(_vm.label))])])};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = "data-v-15be6a11";
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
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
    undefined,
    undefined,
    undefined
  );

//

var script$1 = {
  props: {
    allLabel: {
      type: String,
      default: ''
    },
    otherOptions: {
      type: Array,
      default: function () {
        return [];
      }
    },
    value: {
      type: Object
    },
    path: {
      type: String
    }
  },
  components: {
    FluroCheckbox: __vue_component__
  },

  data() {
    return {
      model: {},
      workingModel: [true],
      showAll: false
    };
  },

  created() {
    var self = this; //console.log('EXCLUSIVE SELECTOR CREATED: VALUE',self.value[self.path])

    self.model[self.path] = self.value[self.path] || {}; //console.log('MODEL INIT:', self.model[self.path])

    if (!self.model[self.path]) {
      self.$set(self.model, self.path, ['']);
    } else if (!self.model[self.path].length) {
      self.$set(self.model, self.path, ['']);
    } //console.log('POST IF', self.model[self.path])


    self.maintainWorkingModel();
  },

  watch: {
    'otherOptions': function () {
      // console.log('OTHER OPTIONS CHANGED')
      return this.maintainWorkingModel();
    },
    'value': function () {
      var self = this; //console.log('VALUE CHANGED', self.value[self.path])

      self.$set(self.model, self.path, self.value[self.path]);
      return self.maintainWorkingModel();
    }
  },
  methods: {
    maintainWorkingModel() {
      var self = this;
      var optionsLength = self.otherOptions.length + 1; //console.log('WORKING MODEL LENGTH',self.workingModel.length)

      for (let i = 0; i < optionsLength; i++) {
        //console.log('MAINTAIN ITER', i, self.workingModel, self.model[self.path])
        if (i == 0) {
          if (self.model[self.path].length == 1 && self.model[self.path][0] === '') {
            self.$set(self.workingModel, 0, true);
          } else {
            self.$set(self.workingModel, 0, false);
          }
        } else if (self.model[self.path].includes(self.otherOptions[i - 1].toLowerCase())) {
          self.$set(self.workingModel, i, true);
        } else if (self.allLabel == 'Default Channels' && self.otherOptions[i - 1] == 'Push Notification' && self.model[self.path].includes('push')) {
          self.$set(self.workingModel, i, true);
        } else {
          self.$set(self.workingModel, i, false);
        }
      }

      self.updateActualModel();
    },

    toggle(ind) {
      var self = this;

      if (ind == 0) {
        self.$set(self.workingModel, 0, true);

        for (let i = 1; i < self.workingModel.length; i++) {
          self.$set(self.workingModel, i, false);
        }
      } else {
        self.$set(self.workingModel, ind, !self.workingModel[ind]);

        if (!self.workingModel.slice(1).includes(true)) {
          self.$set(self.workingModel, 0, true);
        } else {
          self.$set(self.workingModel, 0, false);
        }
      }

      self.updateActualModel();
    },

    updateActualModel() {
      var self = this;

      if (self.workingModel[0]) {
        self.$set(self.model, self.path, ['']);
      } else {
        //console.log('CURRENT WORKING MODEL', self.workingModel, self.model[self.path]);
        self.$set(self.model, self.path, []);
        (self.workingModel.slice(1) || []).forEach(function (bool, ind) {
          //console.log('UPDATE ACTUAL MODEL', ind, self.model[self.path])
          if (bool) {
            if (self.allLabel == 'Default Channels' && self.otherOptions[ind] == 'Push Notification') {
              self.$set(self.model[self.path], self.model[self.path].length, 'push');
            } else {
              self.$set(self.model[self.path], self.model[self.path].length, self.otherOptions[ind].toLowerCase());
            }
          }
        });
      } //console.log(self.model[self.path]);


      self.$emit('change', self.model[self.path]);
    },

    toggleShown() {
      return this.showAll = !this.showAll;
    }

  }
};

var css_248z$1 = ".individual-selection{padding:2.5px 0}.all-selection{display:inline-block}.show-text{cursor:pointer}.noselect{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}";
styleInject(css_248z$1);

/* script */
const __vue_script__$1 = script$1;
/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"py-3"},[_c('div',{staticClass:"all-selection pb-2"},[_c('fluro-checkbox',{attrs:{"isChecked":_vm.workingModel[0],"label":_vm.allLabel},on:{"click":function($event){return _vm.toggle(0)}}}),_vm._v(" "),_c('span',{staticClass:"muted mb-0 show-text noselect",on:{"click":function($event){return _vm.toggleShown()}}},[_vm._v(" ("+_vm._s(_vm.showAll ? 'Less' : 'More')+")")])],1),_vm._v(" "),_vm._l((_vm.otherOptions),function(option,index){return (_vm.showAll)?_c('div',{staticClass:"individual-selection"},[_c('fluro-checkbox',{attrs:{"isChecked":_vm.workingModel[index + 1],"label":_vm.otherOptions[index]},on:{"click":function($event){return _vm.toggle(index+1)}}})],1):_vm._e()})],2)};
var __vue_staticRenderFns__$1 = [];

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject */
  
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
    undefined,
    undefined,
    undefined
  );

export { __vue_component__$1 as F };
//# sourceMappingURL=FluroExclusiveSelector-fc159e1f.js.map
