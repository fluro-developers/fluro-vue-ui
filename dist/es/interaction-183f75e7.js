import { bc as __vue_normalize__, bd as __vue_create_injector__ } from './index-1b943565.js';
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
import { F as FluroContentViewMixin } from './FluroContentViewMixin-004f54cc.js';

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

    fields() {
      var array = [];
      array.push({
        title: 'Linked Contacts',
        key: 'contacts',
        type: 'reference',
        minimum: 0,
        maximum: 0
      });
      return array;
    },

    definedFields() {
      return this.config.definition.fields;
    }

  },

  data() {
    return {};
  },

  created() {
    console.log('THIS RENDERER', this);
  }

};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flex-column',[_c('flex-column-body',[(_vm.item)?_c('v-container',[_c('fluro-content-render',{attrs:{"fields":_vm.fields,"raw":true},model:{value:(_vm.item),callback:function ($$v) {_vm.item=$$v;},expression:"item"}}),_vm._v(" "),(_vm.item.event)?_c('fluro-panel',[_c('fluro-panel-body',[_c('v-input',{staticClass:"no-flex"},[_c('v-label',[_vm._v("Event")]),_vm._v(" "),_c('list-group',[_c('list-group-item',{attrs:{"item":_vm.item.event},on:{"click":function($event){return _vm.$fluro.global.view(_vm.item.event, true)}},scopedSlots:_vm._u([{key:"right",fn:function(){return [_c('v-btn',{staticClass:"ma-0",attrs:{"small":"","icon":""},on:{"click":function($event){$event.stopPropagation();$event.preventDefault();return _vm.$actions.open([_vm.item.event])}}},[_c('fluro-icon',{attrs:{"icon":"ellipsis-h"}})],1)]},proxy:true}],null,false,3925775831)})],1)],1)],1)],1):_vm._e(),_vm._v(" "),(_vm.paymentExists)?_c('fluro-panel',[_c('fluro-panel-body',[(_vm.paymentMethod)?_c('v-input',{staticClass:"no-flex"},[_c('v-label',[_vm._v("Selected Payment Method")]),_vm._v(" "),_c('h3',[_vm._v(_vm._s(_vm.paymentMethod.title || _vm.paymentMethod))])],1):_vm._e()],1)],1):_vm._e(),_vm._v(" "),_c('fluro-content-render',{attrs:{"fields":_vm.definedFields,"raw":true},model:{value:(_vm.item.rawData),callback:function ($$v) {_vm.$set(_vm.item, "rawData", $$v);},expression:"item.rawData"}})],1):_vm._e()],1)],1)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-208d22af_0", { source: ".border-top[data-v-208d22af]{border-top:1px solid rgba(0,0,0,.05)}.border-right[data-v-208d22af]{border-right:1px solid rgba(0,0,0,.05)}.border-bottom[data-v-208d22af]{border-bottom:1px solid rgba(0,0,0,.05)}.border-left[data-v-208d22af]{border-left:1px solid rgba(0,0,0,.05)}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-208d22af";
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
//# sourceMappingURL=interaction-183f75e7.js.map
