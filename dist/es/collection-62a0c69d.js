<<<<<<< HEAD:dist/es/collection-c22a135d.js
import { bf as _, bd as __vue_normalize__, be as __vue_create_injector__ } from './index-85d711d5.js';
=======
import { be as _, bd as __vue_normalize__ } from './index-a26484f6.js';
>>>>>>> a45046e8aeac137a1588be86b3c5378be67755b1:dist/es/collection-62a0c69d.js
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
<<<<<<< HEAD:dist/es/collection-c22a135d.js
import { F as FluroContentViewMixin } from './FluroContentViewMixin-ed53ae90.js';
=======
import { F as FluroContentViewMixin } from './FluroContentViewMixin-c92e5600.js';
>>>>>>> a45046e8aeac137a1588be86b3c5378be67755b1:dist/es/collection-62a0c69d.js

//

var script = {
  props: {
    config: {
      type: Object,
      required: true
    },
    item: {
      type: Object,
      required: true
    }
  },
  mixins: [FluroContentViewMixin],
  methods: {},
  computed: {
    grouped() {
      var self = this;
      return _.chain(self.item.items).orderBy(function (item) {
        return item.title;
      }).reduce(function (set, item) {
        var type = item.definition || item._type;
        var existing = set[type];

        if (!existing) {
          existing = set[type] = {
            title: self.$fluro.types.readable(type, true),
            items: []
          };
        }

        existing.items.push(item);
        return set;
      }, {}).values().orderBy(function (group) {
        return group.title;
      }).value();
    },

    data() {
      return this.item.data || {};
    }

  },

  data() {
    return {};
  }

};

/* script */
const __vue_script__ = script;
/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flex-column-body',[_c('v-container',{attrs:{"fluid":""}},[_c('constrain',{attrs:{"sm":""}},[(_vm.fields)?_c('v-container',[_c('fluro-content-render',{attrs:{"fields":_vm.fields},model:{value:(_vm.item.data),callback:function ($$v) {_vm.$set(_vm.item, "data", $$v);},expression:"item.data"}})],1):_vm._e(),_vm._v(" "),_vm._l((_vm.grouped),function(group){return _c('v-container',{staticClass:"pin-group"},[_c('h4',[_vm._v(_vm._s(group.title))]),_vm._v(" "),_c('fluro-card',_vm._l((group.items),function(item){return _c('fluro-list-item',{key:item._id,attrs:{"bordered":true,"item":item},nativeOn:{"click":function($event){return _vm.clicked(item)}}})}),1)],1)})],2)],1)],1)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = "data-v-81663792";
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

export default __vue_component__;
<<<<<<< HEAD:dist/es/collection-c22a135d.js
//# sourceMappingURL=collection-c22a135d.js.map
=======
//# sourceMappingURL=collection-62a0c69d.js.map
>>>>>>> a45046e8aeac137a1588be86b3c5378be67755b1:dist/es/collection-62a0c69d.js
