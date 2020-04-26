import { bb as __vue_normalize__, bc as __vue_create_injector__ } from './index-2a8dcbb7.js';

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
//////////////////////////////////////////////////
var script = {
  props: {
    'label': {
      type: String
    },
    'type': {
      type: String,

      default() {
        return 'item';
      }

    },
    'items': {
      type: Array
    }
  },
  methods: {
    clicked(item) {
      this.$emit('click', item);
    }

  },
  computed: {
    grouped() {
      var self = this;
      var mapped = self.$fluro.types.mapDefinitionItems(_.orderBy(self.items, 'title'), self.type);
      return mapped;
    }

  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.grouped && _vm.grouped.length)?_c('div',{staticClass:"fluro-defined-list"},_vm._l((_vm.grouped),function(group){return _c('v-input',{staticClass:"no-flex"},[_c('v-label',[_vm._v(_vm._s(group.plural))]),_vm._v(" "),_c('div',{staticClass:"inline-tags"},_vm._l((group.entries),function(entry){return _c('a',{staticClass:"inline-tag",style:({backgroundColor:entry.bgColor, color:entry.color}),on:{"click":function($event){return _vm.clicked(entry)}}},[(_vm.type)?_c('fluro-icon',{attrs:{"type":_vm.type}}):_vm._e(),_vm._v(" "+_vm._s(entry.title)+"\n            ")],1)}),0)],1)}),1):_vm._e()};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-cf73aac2_0", { source: ".border-top[data-v-cf73aac2]{border-top:1px solid rgba(0,0,0,.05)}.border-right[data-v-cf73aac2]{border-right:1px solid rgba(0,0,0,.05)}.border-bottom[data-v-cf73aac2]{border-bottom:1px solid rgba(0,0,0,.05)}.border-left[data-v-cf73aac2]{border-left:1px solid rgba(0,0,0,.05)}.fluro-content-render[data-v-cf73aac2]{flex:1}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-cf73aac2";
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

export { __vue_component__ as F };
//# sourceMappingURL=FluroDefinedList-d6170dc9.js.map
