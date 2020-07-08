
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { bm as __vue_normalize__, bn as __vue_create_injector__ } from './index-eba1d10c.js';

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

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "span",
    {
      staticClass: "display-inline",
      on: {
        click: function($event) {
          return _vm.$emit("click")
        }
      }
    },
    [
      _c(
        "span",
        {
          staticClass: "box",
          class: _vm.isChecked ? "ischecked" : "isunchecked"
        },
        [
          _c("span", {
            staticClass: "tick",
            class: _vm.isChecked ? "checked" : "unchecked"
          })
        ]
      ),
      _vm._v(" "),
      _c("span", { staticClass: "check-label noselect" }, [
        _vm._v(_vm._s(_vm.label))
      ])
    ]
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-36786be4_0", { source: "/**/\n.border-top[data-v-36786be4] {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right[data-v-36786be4] {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom[data-v-36786be4] {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left[data-v-36786be4] {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.display-inline[data-v-36786be4] {\n  display: inline-block;\n  cursor: pointer;\n  transition: all 0.5s;\n  position: relative;\n}\n.display-inline .ischecked[data-v-36786be4] {\n  background: #4cc650;\n}\n.display-inline .isunchecked[data-v-36786be4] {\n  background: white;\n}\n.display-inline:hover .box.ischecked[data-v-36786be4] {\n  background: white;\n  border-color: #44c448;\n}\n.display-inline:hover .box.ischecked .checked[data-v-36786be4] {\n  background: #4cc650;\n  box-shadow: 2px 0 0 #4cc650, 4px 0 0 #4cc650, 4px -2px 0 #4cc650, 4px -4px 0 #4cc650, 4px -6px 0 #4cc650, 4px -8px 0 #4cc650;\n}\n.display-inline:hover .box.isunchecked[data-v-36786be4] {\n  background: #F3F3F3;\n  border-color: #BFBFBF;\n}\n.check-label[data-v-36786be4] {\n  margin-left: 25px;\n}\n.noselect[data-v-36786be4] {\n  -webkit-touch-callout: none;\n  /* iOS Safari */\n  -webkit-user-select: none;\n  /* Safari */\n  -khtml-user-select: none;\n  /* Konqueror HTML */\n  -moz-user-select: none;\n  /* Old versions of Firefox */\n  -ms-user-select: none;\n  /* Internet Explorer/Edge */\n  user-select: none;\n  /* Non-prefixed version, currently\n                                supported by Chrome, Opera and Firefox */\n}\n.box[data-v-36786be4] {\n  border-radius: 3px;\n  width: 18px;\n  height: 18px;\n  line-height: 18px;\n  text-align: center;\n  padding: 0;\n  border: 1px solid #E2E7EE;\n  margin-right: 5px;\n  font-size: 12px;\n  position: absolute;\n  transition: all 0.5s;\n}\n.tick[data-v-36786be4] {\n  content: \"\";\n  position: absolute;\n  left: 3px;\n  top: 7px;\n  background: white;\n  width: 2px;\n  height: 2px;\n  z-index: 10;\n  transition: all 0.5s;\n  transform: rotate(45deg);\n  box-shadow: 2px 0 0 white, 4px 0 0 white, 4px -2px 0 white, 4px -4px 0 white, 4px -6px 0 white, 4px -8px 0 white;\n}\n.tick.checked[data-v-36786be4] {\n  transform: rotate(45deg), scale(1);\n  opacity: 1;\n}\n.tick.unchecked[data-v-36786be4] {\n  transform: rotate(0deg), scale(0);\n  opacity: 0;\n}\n\n/*# sourceMappingURL=FluroCheckbox.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/edit/components/FluroCheckbox.vue","FluroCheckbox.vue"],"names":[],"mappings":"AA6CA,GAAA;AAYA;EACA,yCAAA;ACvDA;AD0DA;EACA,2CAAA;ACvDA;AD0DA;EACA,4CAAA;ACvDA;AD0DA;EACA,0CAAA;ACvDA;;AD+DA,GAAA;AACA;EACA,qBAAA;EACA,eAAA;EACA,oBAAA;EACA,kBAAA;AC5DA;AD8DA;EACA,mBAAA;AC5DA;AD+DA;EACA,iBAAA;AC7DA;ADiEA;EACA,iBAAA;EACA,qBAAA;AC/DA;ADiEA;EACA,mBAAA;EACA,4HACA;AChEA;ADyEA;EACA,mBAAA;EACA,qBAAA;ACvEA;AD4EA;EACA,iBAAA;ACzEA;AD6EA;EACA,2BAAA;EACA,eAAA;EACA,yBAAA;EACA,WAAA;EACA,wBAAA;EACA,mBAAA;EACA,sBAAA;EACA,4BAAA;EACA,qBAAA;EACA,2BAAA;EACA,iBAAA;EACA;wEAAA;ACzEA;AD6EA;EACA,kBAAA;EACA,WAAA;EACA,YAAA;EACA,iBAAA;EACA,kBAAA;EACA,UAAA;EACA,yBAAA;EACA,iBAAA;EACA,eAAA;EACA,kBAAA;EACA,oBAAA;AC1EA;AD6EA;EACA,WAAA;EACA,kBAAA;EACA,SAAA;EACA,QAAA;EACA,iBAAA;EACA,UAAA;EACA,WAAA;EACA,WAAA;EACA,oBAAA;EACA,wBAAA;EACA,gHACA;AC3EA;ADkFA;EACA,kCAAA;EACA,UAAA;AChFA;ADmFA;EACA,iCAAA;EACA,UAAA;ACjFA;;AAEA,4CAA4C","file":"FluroCheckbox.vue","sourcesContent":["<template>\n    <!-- <v-checkbox v-model=\"model\" :label=\"label\" @click=\"$emit('click')\"></v-checkbox> -->\n    <span class=\"display-inline\" @click=\"$emit('click')\">\n        <span class=\"box\" :class=\"isChecked ? 'ischecked' : 'isunchecked'\">\n            <span class=\"tick\" :class=\"isChecked ? 'checked' : 'unchecked'\">\n            </span>\n        </span>\n        <span class=\"check-label noselect\">{{label}}</span>\n        <!--             <fluro-icon icon=\"check-square\" library=\"fas\" class=\"checked\" v-if=\"isChecked\" /> -->\n    </span>\n</template>\n<script>\n\n/////////////////////////////////\n\nexport default {\n    props: {\n        isChecked: {\n            type: Boolean,\n        },\n        label: {\n            type: String,\n            default: '',\n        }\n    },\n    components: {},\n    data() {\n        return {}\n    },\n    created() {\n\n    },\n    watch: {\n\n    },\n    methods: {\n\n    },\n    computed: {\n\n    },\n}\n</script>\n<style scoped lang=\"scss\">\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n.display-inline {\n    display: inline-block;\n    cursor: pointer;\n    transition: all 0.5s;\n    position: relative;\n\n    .ischecked {\n        background: #4cc650;\n    }\n\n    .isunchecked {\n        background: white;\n    }\n\n    &:hover .box {\n        &.ischecked {\n            background: white;\n            border-color: #44c448;\n\n            .checked {\n                background: #4cc650;\n                box-shadow:\n                    2px 0 0 #4cc650,\n                    4px 0 0 #4cc650,\n                    4px -2px 0 #4cc650,\n                    4px -4px 0 #4cc650,\n                    4px -6px 0 #4cc650,\n                    4px -8px 0 #4cc650;\n            }\n        }\n\n        &.isunchecked {\n            background: #F3F3F3;\n            border-color: #BFBFBF;\n        }\n    }\n}\n\n.check-label {\n    margin-left: 25px\n}\n\n\n.noselect {\n    -webkit-touch-callout: none;\n    /* iOS Safari */\n    -webkit-user-select: none;\n    /* Safari */\n    -khtml-user-select: none;\n    /* Konqueror HTML */\n    -moz-user-select: none;\n    /* Old versions of Firefox */\n    -ms-user-select: none;\n    /* Internet Explorer/Edge */\n    user-select: none;\n    /* Non-prefixed version, currently\n                                  supported by Chrome, Opera and Firefox */\n}\n\n.box {\n    border-radius: 3px;\n    width: 18px;\n    height: 18px;\n    line-height: 18px;\n    text-align: center;\n    padding: 0;\n    border: 1px solid #E2E7EE;\n    margin-right: 5px;\n    font-size: 12px;\n    position:absolute;\n    transition: all 0.5s;\n}\n\n.tick {\n    content: '';\n    position: absolute;\n    left: 3px;\n    top: 7px;\n    background: white;\n    width: 2px;\n    height: 2px;\n    z-index: 10;\n    transition: all 0.5s;\n    transform: rotate(45deg);\n    box-shadow:\n        2px 0 0 white,\n        4px 0 0 white,\n        4px -2px 0 white,\n        4px -4px 0 white,\n        4px -6px 0 white,\n        4px -8px 0 white;\n\n    &.checked {\n        transform: rotate(45deg), scale(1);\n        opacity: 1;\n    }\n\n    &.unchecked {\n        transform: rotate(0deg), scale(0);\n        opacity: 0;\n    }\n}\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.display-inline {\n  display: inline-block;\n  cursor: pointer;\n  transition: all 0.5s;\n  position: relative;\n}\n.display-inline .ischecked {\n  background: #4cc650;\n}\n.display-inline .isunchecked {\n  background: white;\n}\n.display-inline:hover .box.ischecked {\n  background: white;\n  border-color: #44c448;\n}\n.display-inline:hover .box.ischecked .checked {\n  background: #4cc650;\n  box-shadow: 2px 0 0 #4cc650, 4px 0 0 #4cc650, 4px -2px 0 #4cc650, 4px -4px 0 #4cc650, 4px -6px 0 #4cc650, 4px -8px 0 #4cc650;\n}\n.display-inline:hover .box.isunchecked {\n  background: #F3F3F3;\n  border-color: #BFBFBF;\n}\n\n.check-label {\n  margin-left: 25px;\n}\n\n.noselect {\n  -webkit-touch-callout: none;\n  /* iOS Safari */\n  -webkit-user-select: none;\n  /* Safari */\n  -khtml-user-select: none;\n  /* Konqueror HTML */\n  -moz-user-select: none;\n  /* Old versions of Firefox */\n  -ms-user-select: none;\n  /* Internet Explorer/Edge */\n  user-select: none;\n  /* Non-prefixed version, currently\n                                supported by Chrome, Opera and Firefox */\n}\n\n.box {\n  border-radius: 3px;\n  width: 18px;\n  height: 18px;\n  line-height: 18px;\n  text-align: center;\n  padding: 0;\n  border: 1px solid #E2E7EE;\n  margin-right: 5px;\n  font-size: 12px;\n  position: absolute;\n  transition: all 0.5s;\n}\n\n.tick {\n  content: \"\";\n  position: absolute;\n  left: 3px;\n  top: 7px;\n  background: white;\n  width: 2px;\n  height: 2px;\n  z-index: 10;\n  transition: all 0.5s;\n  transform: rotate(45deg);\n  box-shadow: 2px 0 0 white, 4px 0 0 white, 4px -2px 0 white, 4px -4px 0 white, 4px -6px 0 white, 4px -8px 0 white;\n}\n.tick.checked {\n  transform: rotate(45deg), scale(1);\n  opacity: 1;\n}\n.tick.unchecked {\n  transform: rotate(0deg), scale(0);\n  opacity: 0;\n}\n\n/*# sourceMappingURL=FluroCheckbox.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-36786be4";
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

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "py-3" },
    [
      _c(
        "div",
        { staticClass: "all-selection pb-2" },
        [
          _c("fluro-checkbox", {
            attrs: { isChecked: _vm.workingModel[0], label: _vm.allLabel },
            on: {
              click: function($event) {
                return _vm.toggle(0)
              }
            }
          }),
          _vm._v(" "),
          _c(
            "span",
            {
              staticClass: "muted mb-0 show-text noselect",
              on: {
                click: function($event) {
                  return _vm.toggleShown()
                }
              }
            },
            [_vm._v(" (" + _vm._s(_vm.showAll ? "Less" : "More") + ")")]
          )
        ],
        1
      ),
      _vm._v(" "),
      _vm._l(_vm.otherOptions, function(option, index) {
        return _vm.showAll
          ? _c(
              "div",
              { staticClass: "individual-selection" },
              [
                _c("fluro-checkbox", {
                  attrs: {
                    isChecked: _vm.workingModel[index + 1],
                    label: _vm.otherOptions[index]
                  },
                  on: {
                    click: function($event) {
                      return _vm.toggle(index + 1)
                    }
                  }
                })
              ],
              1
            )
          : _vm._e()
      })
    ],
    2
  )
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = function (inject) {
    if (!inject) return
    inject("data-v-0193dacf_0", { source: "\n.individual-selection {\n    padding: 2.5px 0;\n}\n.all-selection {\n    display: inline-block;\n}\n.show-text {\n    cursor: pointer;\n}\n.noselect {\n    -webkit-touch-callout: none;\n    /* iOS Safari */\n    -webkit-user-select: none;\n    /* Safari */\n    -khtml-user-select: none;\n    /* Konqueror HTML */\n    -moz-user-select: none;\n    /* Old versions of Firefox */\n    -ms-user-select: none;\n    /* Internet Explorer/Edge */\n    user-select: none;\n    /* Non-prefixed version, currently\n                                  supported by Chrome, Opera and Firefox */\n}\n", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/edit/components/FluroExclusiveSelector.vue"],"names":[],"mappings":";AA8IA;IACA,gBAAA;AACA;AAEA;IACA,qBAAA;AACA;AAEA;IACA,eAAA;AACA;AAEA;IACA,2BAAA;IACA,eAAA;IACA,yBAAA;IACA,WAAA;IACA,wBAAA;IACA,mBAAA;IACA,sBAAA;IACA,4BAAA;IACA,qBAAA;IACA,2BAAA;IACA,iBAAA;IACA;0EACA;AACA","file":"FluroExclusiveSelector.vue","sourcesContent":["<template>\n    <div class=\"py-3\">\n        <div class=\"all-selection pb-2\">\n            <fluro-checkbox :isChecked=\"workingModel[0]\" :label=\"allLabel\" @click=\"toggle(0)\" />\n            <span class=\"muted mb-0 show-text noselect\" @click=\"toggleShown()\"> ({{showAll ? 'Less' : 'More'}})</span>\n        </div>\n        <div class=\"individual-selection\" v-if=\"showAll\" v-for=\"(option, index) in otherOptions\">\n            <fluro-checkbox :isChecked=\"workingModel[index + 1]\" :label=\"otherOptions[index]\" @click=\"toggle(index+1)\" />\n        </div>\n    </div>\n</template>\n<script>\n\n\nimport FluroCheckbox from 'src/components/content/edit/components/FluroCheckbox.vue';\n\n/////////////////////////////////\n\nexport default {\n    props: {\n        allLabel: {\n            type: String,\n            default: '',\n        },\n        otherOptions: {\n            type: Array,\n            default: function() {\n                return [];\n            },\n        },\n        value: {\n            type: Object,\n        },\n        path: {\n            type: String,\n        }\n    },\n    components: {\n        FluroCheckbox,\n    },\n    data() {\n        return {\n            model: {},\n            workingModel: [true],\n            showAll: false,\n        }\n    },\n    created() {\n        var self = this;\n        //console.log('EXCLUSIVE SELECTOR CREATED: VALUE',self.value[self.path])\n        self.model[self.path] = self.value[self.path] || {};\n        //console.log('MODEL INIT:', self.model[self.path])\n        if (!self.model[self.path]) {\n            self.$set(self.model, self.path, ['']);\n        } else if (!self.model[self.path].length) {\n            self.$set(self.model, self.path, ['']);\n        }\n        //console.log('POST IF', self.model[self.path])\n        self.maintainWorkingModel();\n    },\n    watch: {\n        'otherOptions': function() {\n            // console.log('OTHER OPTIONS CHANGED')\n            return this.maintainWorkingModel();\n        },\n        'value': function() {\n            var self = this;\n            //console.log('VALUE CHANGED', self.value[self.path])\n            self.$set(self.model, self.path, self.value[self.path]);\n            return self.maintainWorkingModel();\n        },\n    },\n    methods: {\n        maintainWorkingModel() {\n            var self = this;\n            var optionsLength = self.otherOptions.length + 1;\n            //console.log('WORKING MODEL LENGTH',self.workingModel.length)\n            for (let i = 0; i < optionsLength; i++) {\n                //console.log('MAINTAIN ITER', i, self.workingModel, self.model[self.path])\n                if (i == 0) {\n                    if ((self.model[self.path].length == 1) && (self.model[self.path][0] === '')) {\n                        self.$set(self.workingModel, 0, true);\n                    } else {\n                        self.$set(self.workingModel, 0, false);\n                    }\n                } else if (self.model[self.path].includes(self.otherOptions[i - 1].toLowerCase())) {\n                    self.$set(self.workingModel, i, true);\n                } else if ((self.allLabel == 'Default Channels') && (self.otherOptions[i - 1] == 'Push Notification') && (self.model[self.path].includes('push'))) {\n                    self.$set(self.workingModel, i, true);\n                } else {\n                    self.$set(self.workingModel, i, false);\n                }\n            }\n            self.updateActualModel();\n        },\n        toggle(ind) {\n            var self = this;\n\n            if (ind == 0) {\n                self.$set(self.workingModel, 0, true);\n                for (let i = 1; i < self.workingModel.length; i++) {\n                    self.$set(self.workingModel, i, false);\n                }\n            } else {\n                self.$set(self.workingModel, ind, !self.workingModel[ind]);\n                if (!self.workingModel.slice(1).includes(true)) {\n                    self.$set(self.workingModel, 0, true);\n                } else {\n                    self.$set(self.workingModel, 0, false);\n                }\n            }\n            self.updateActualModel();\n        },\n        updateActualModel() {\n            var self = this;\n            if (self.workingModel[0]) {\n                self.$set(self.model, self.path, ['']);\n            } else {\n                //console.log('CURRENT WORKING MODEL', self.workingModel, self.model[self.path]);\n                self.$set(self.model, self.path, []);\n                (self.workingModel.slice(1) || []).forEach(function(bool, ind) {\n                    //console.log('UPDATE ACTUAL MODEL', ind, self.model[self.path])\n                    if (bool) {\n                        if ((self.allLabel == 'Default Channels') && (self.otherOptions[ind] == 'Push Notification')) {\n                            self.$set(self.model[self.path], self.model[self.path].length, 'push');\n                        } else {\n                            self.$set(self.model[self.path], self.model[self.path].length, self.otherOptions[ind].toLowerCase());\n                        }\n                    }\n                })\n            }\n            //console.log(self.model[self.path]);\n            self.$emit('change', self.model[self.path]);\n\n        },\n        toggleShown() {\n            return this.showAll = !this.showAll;\n        }\n    },\n}\n</script>\n<style>\n.individual-selection {\n    padding: 2.5px 0;\n}\n\n.all-selection {\n    display: inline-block;\n}\n\n.show-text {\n    cursor: pointer;\n}\n\n.noselect {\n    -webkit-touch-callout: none;\n    /* iOS Safari */\n    -webkit-user-select: none;\n    /* Safari */\n    -khtml-user-select: none;\n    /* Konqueror HTML */\n    -moz-user-select: none;\n    /* Old versions of Firefox */\n    -ms-user-select: none;\n    /* Internet Explorer/Edge */\n    user-select: none;\n    /* Non-prefixed version, currently\n                                  supported by Chrome, Opera and Firefox */\n}\n</style>"]}, media: undefined });

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

export { __vue_component__$1 as F };
//# sourceMappingURL=FluroExclusiveSelector-113b701e.js.map
