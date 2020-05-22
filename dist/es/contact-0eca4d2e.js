import { c as FluroAvatar, bb as FluroContactCommunicateMixin, bd as __vue_normalize__ } from './index-53cb5ffc.js';
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
import { F as FluroContentViewMixin } from './FluroContentViewMixin-2120e551.js';

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
  components: {
    FluroAvatar
  },
  mixins: [FluroContentViewMixin, FluroContactCommunicateMixin],
  methods: {},
  computed: {
    data() {
      return this.item.data || {};
    },

    fields() {
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
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flex-column-body',[_c('v-container',[_c('v-layout',{attrs:{"align-center":"","row":"","wrap":""}},[_c('v-flex',{attrs:{"shrink":""}},[_c('fluro-avatar',{attrs:{"left":"","xl":"","id":_vm.item,"type":"contact"}})],1),_vm._v(" "),_c('v-flex',[_c('h3',[_vm._v(_vm._s(_vm.item.title))]),_vm._v(" "),_c('h6',[_vm._v(_vm._s(_vm._f("definitionTitle")(_vm.item.definition || _vm.item._type)))]),_vm._v(" "),_c('div',{staticClass:"muted"},[_vm._v(_vm._s(_vm.item.gender))]),_vm._v(" "),_c('div',{staticClass:"muted"},[_vm._v(_vm._s(_vm.item.age))]),_vm._v(" "),_c('Div',[_c('v-btn',{staticClass:"ma-0",attrs:{"small":""},on:{"click":function($event){return _vm.$fluro.global.view(_vm.item, true)}}},[_vm._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tView Profile\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t"),_c('fluro-icon',{attrs:{"icon":"view"}})],1),_vm._v(" "),_c('v-btn',{staticClass:"ma-0",attrs:{"small":""},on:{"click":function($event){return _vm.$fluro.global.edit(_vm.item, true)}}},[_vm._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tEdit Profile\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t"),_c('fluro-icon',{attrs:{"icon":"pencil"}})],1)],1)],1),_vm._v(" "),_c('v-flex',{staticClass:"text-xs-center"},[_c('v-btn',{directives:[{name:"tippy",rawName:"v-tippy"}],staticClass:"ma-0 mx-1 ml-0",attrs:{"disabled":!_vm.canEmail,"icon":"","color":"primary","content":"Send Email"},on:{"click":function($event){return _vm.communicate('email')}}},[_c('fluro-icon',{attrs:{"library":"fas","icon":"envelope"}})],1),_vm._v(" "),_c('v-btn',{directives:[{name:"tippy",rawName:"v-tippy"}],staticClass:"ma-0 mx-1",attrs:{"disabled":!_vm.canSMS,"icon":"","color":"primary","content":"Send SMS"},on:{"click":function($event){return _vm.communicate('sms')}}},[_c('fluro-icon',{attrs:{"library":"fas","icon":"comment"}})],1),_vm._v(" "),_c('v-btn',{directives:[{name:"tippy",rawName:"v-tippy"}],staticClass:"ma-0 mx-1",attrs:{"disabled":!_vm.canCall,"icon":"","color":"primary","content":"Call"},on:{"click":function($event){return _vm.communicate('phone')}}},[_c('fluro-icon',{attrs:{"library":"fas","icon":"phone"}})],1),_vm._v(" "),_c('v-btn',{directives:[{name:"tippy",rawName:"v-tippy"}],staticClass:"ma-0 mx-1",attrs:{"disabled":!_vm.canPost,"icon":"","color":"primary","content":"Add Post/Note"},on:{"click":_vm.addPost}},[_c('fluro-icon',{attrs:{"library":"fas","type":"post"}})],1),_vm._v(" "),_c('v-btn',{directives:[{name:"tippy",rawName:"v-tippy"}],staticClass:"ma-0 mx-1 mr-0",attrs:{"icon":"","color":"primary","content":"Add to Address Book"},on:{"click":function($event){return _vm.communicate('vcard')}}},[_c('fluro-icon',{attrs:{"library":"fas","icon":"address-book"}})],1)],1)],1)],1)],1)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = "data-v-3527f034";
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
//# sourceMappingURL=contact-0eca4d2e.js.map
