import { bo as _, bm as __vue_normalize__, bn as __vue_create_injector__ } from './index-e1f26c03.js';
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
import { F as FluroContentViewMixin } from './FluroContentViewMixin-66d1415b.js';

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
  methods: {
    download(item) {
      var self = this;
      var url = self.$fluro.asset.downloadUrl(item);
      window.open(url);
    }

  },
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
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flex-column-body',[_c('v-container',{attrs:{"fluid":""}},[_c('constrain',{attrs:{"sm":""}},[(_vm.fields)?_c('v-container',[_c('fluro-content-render',{attrs:{"fields":_vm.fields},model:{value:(_vm.item.data),callback:function ($$v) {_vm.$set(_vm.item, "data", $$v);},expression:"item.data"}})],1):_vm._e(),_vm._v(" "),_vm._l((_vm.grouped),function(group){return _c('v-container',{staticClass:"pin-group"},[_c('h4',[_vm._v(_vm._s(group.title))]),_vm._v(" "),_c('fluro-card',_vm._l((group.items),function(item){return _c('fluro-list-item',{attrs:{"bordered":true,"item":item},nativeOn:{"click":function($event){return _vm.clicked(item)}},scopedSlots:_vm._u([{key:"actions",fn:function(slotProps){return [_c('v-btn',{directives:[{name:"tippy",rawName:"v-tippy"}],attrs:{"small":"","icon":"","content":"Download"},on:{"click":function($event){$event.stopPropagation();$event.preventDefault();return _vm.download(slotProps.item)}}},[_c('fluro-icon',{attrs:{"icon":"download"}})],1),_vm._v(" "),_c('v-btn',{directives:[{name:"tippy",rawName:"v-tippy"}],attrs:{"small":"","icon":"","content":"More Actions"},on:{"click":function($event){$event.stopPropagation();$event.preventDefault();return _vm.$actions.open([slotProps.item])}}},[_c('fluro-icon',{attrs:{"icon":"ellipsis-h"}})],1)]}}],null,true)})}),1)],1)})],2)],1)],1)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-35a20062_0", { source: ".border-top[data-v-35a20062]{border-top:1px solid rgba(0,0,0,.05)}.border-right[data-v-35a20062]{border-right:1px solid rgba(0,0,0,.05)}.border-bottom[data-v-35a20062]{border-bottom:1px solid rgba(0,0,0,.05)}.border-left[data-v-35a20062]{border-left:1px solid rgba(0,0,0,.05)}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-35a20062";
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
//# sourceMappingURL=collection-412763d8.js.map
