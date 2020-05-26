import { be as styleInject, bf as __vue_normalize__ } from './index-b2aecbcc.js';
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
import { F as FluroContentViewMixin } from './FluroContentViewMixin-8c0a28f6.js';

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
  components: {},
  mixins: [FluroContentViewMixin],
  methods: {},
  computed: {
    paymentMethod() {
      return this.item.paymentMethod;
    },

    paymentExists() {
      return _.get(this.config.definition, ' paymentDetails.required') || _.get(this.config.definition, ' paymentDetails.allow');
    },

    data() {
      return this.item.data || {};
    },

    interactionFields() {
      var array = [];
      array.push({
        title: 'Linked Contacts',
        key: 'contacts',
        type: 'reference',
        minimum: 0,
        maximum: 0
      });
      return array;
    }

  },

  data() {
    return {};
  },

  created() {
    console.log('THIS RENDERER', this);
  }

};

var css_248z = ".border-top[data-v-e2a01e08]{border-top:1px solid rgba(0,0,0,.05)}.border-right[data-v-e2a01e08]{border-right:1px solid rgba(0,0,0,.05)}.border-bottom[data-v-e2a01e08]{border-bottom:1px solid rgba(0,0,0,.05)}.border-left[data-v-e2a01e08]{border-left:1px solid rgba(0,0,0,.05)}";
styleInject(css_248z);

/* script */
const __vue_script__ = script;
/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flex-column',[_c('flex-column-body',[(_vm.item)?_c('v-container',[_c('fluro-content-render',{attrs:{"fields":_vm.interactionFields,"raw":true},model:{value:(_vm.item),callback:function ($$v) {_vm.item=$$v;},expression:"item"}}),_vm._v(" "),(_vm.item.event)?_c('fluro-panel',[_c('fluro-panel-body',[_c('v-input',{staticClass:"no-flex"},[_c('v-label',[_vm._v("Event")]),_vm._v(" "),_c('list-group',[_c('list-group-item',{attrs:{"item":_vm.item.event},on:{"click":function($event){return _vm.$fluro.global.view(_vm.item.event, true)}},scopedSlots:_vm._u([{key:"right",fn:function(){return [_c('v-btn',{staticClass:"ma-0",attrs:{"small":"","icon":""},on:{"click":function($event){$event.stopPropagation();$event.preventDefault();return _vm.$actions.open([_vm.item.event])}}},[_c('fluro-icon',{attrs:{"icon":"ellipsis-h"}})],1)]},proxy:true}],null,false,3925775831)})],1)],1)],1)],1):_vm._e(),_vm._v(" "),(_vm.paymentExists)?_c('fluro-panel',[_c('fluro-panel-body',[(_vm.paymentMethod)?_c('v-input',{staticClass:"no-flex"},[_c('v-label',[_vm._v("Selected Payment Method")]),_vm._v(" "),_c('h3',[_vm._v(_vm._s(_vm.paymentMethod.title || _vm.paymentMethod))])],1):_vm._e()],1)],1):_vm._e(),_vm._v(" "),_c('fluro-content-render',{attrs:{"fields":_vm.fields,"raw":true},model:{value:(_vm.item.rawData),callback:function ($$v) {_vm.$set(_vm.item, "rawData", $$v);},expression:"item.rawData"}})],1):_vm._e()],1)],1)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = "data-v-e2a01e08";
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
//# sourceMappingURL=interaction-8593313d.js.map
