import { bf as styleInject, bg as __vue_normalize__ } from './index-9c9e4101.js';
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
import { F as FluroContentViewMixin } from './FluroContentViewMixin-478ea009.js';

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
    qrCodeURL() {
      var self = this;
      var interactionID = self.$fluro.utils.getStringID(self.item.interaction);
      var ticketID = self.$fluro.utils.getStringID(self.item);

      if (interactionID) {
        return `${self.$fluro.api.defaults.baseURL}/system/qr?input=http://tickets.fluro.io/interaction/${interactionID}`;
      } else {
        return `${self.$fluro.api.defaults.baseURL}/system/qr?input=http://tickets.fluro.io/ticket/${ticketID}`;
      } // $scope.ticketCodeURL = Fluro.apiURL + '/system/qr?input=http://tickets.fluro.io/ticket/' + ticketID;
      // $scope.interactionCodeURL = Fluro.apiURL + '/system/qr?input=http://tickets.fluro.io/interaction/' + interactionID;

    },

    data() {
      return this.item.data || {};
    },

    definedFields() {
      return this.definition ? this.definition.fields : null;
    }

  },

  data() {
    return {};
  }

};

var css_248z = ".border-top[data-v-0e55ae28]{border-top:1px solid rgba(0,0,0,.05)}.border-right[data-v-0e55ae28]{border-right:1px solid rgba(0,0,0,.05)}.border-bottom[data-v-0e55ae28]{border-bottom:1px solid rgba(0,0,0,.05)}.border-left[data-v-0e55ae28]{border-left:1px solid rgba(0,0,0,.05)}";
styleInject(css_248z);

/* script */
const __vue_script__ = script;
/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flex-column-body',[_c('v-container',{staticStyle:{"background":"#eee"},attrs:{"fluid":""}},[_c('constrain',{attrs:{"sm":""}},[_c('v-layout',[_c('v-flex',[_c('img',{attrs:{"src":_vm.qrCodeURL}})])],1)],1)],1),_vm._v(" "),_c('v-container',{attrs:{"fluid":""}},[_c('constrain',{attrs:{"sm":""}},[_c('h1',[_vm._v(_vm._s(_vm.item.title))]),_vm._v(" "),(_vm.item.email)?_c('v-input',{staticClass:"no-flex"},[_c('v-label',[_vm._v("\n            \t\tPrimary Email Address\n            \t")]),_vm._v(" "),_c('div',[_vm._v("\n            \t\t"+_vm._s(_vm.item.email)+"\n            \t")])],1):_vm._e(),_vm._v(" "),(_vm.item.contact)?_c('v-input',{staticClass:"no-flex"},[_c('v-label',[_vm._v("\n            \t\tContact\n            \t")]),_vm._v(" "),_c('fluro-list-item',{attrs:{"bordered":true,"item":_vm.item.contact},nativeOn:{"click":function($event){return _vm.$fluro.global.view(_vm.item.contact)}}})],1):_vm._e(),_vm._v(" "),(_vm.item.event)?_c('v-input',{staticClass:"no-flex"},[_c('v-label',[_vm._v("\n            \t\tEvent\n            \t")]),_vm._v(" "),_c('fluro-list-item',{attrs:{"bordered":true,"item":_vm.item.event},nativeOn:{"click":function($event){return _vm.$fluro.global.view(_vm.item.event)}}})],1):_vm._e(),_vm._v(" "),(_vm.item.interaction)?_c('v-input',{staticClass:"no-flex"},[_c('v-label',[_vm._v("\n            \t\tInteraction\n            \t")]),_vm._v(" "),_c('fluro-list-item',{attrs:{"bordered":true,"item":_vm.item.interaction},nativeOn:{"click":function($event){return _vm.$fluro.global.view(_vm.item.interaction)}}})],1):_vm._e(),_vm._v(" "),_c('fluro-content-render',{attrs:{"fields":_vm.definedFields},model:{value:(_vm.item.data),callback:function ($$v) {_vm.$set(_vm.item, "data", $$v);},expression:"item.data"}})],1)],1)],1)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = "data-v-0e55ae28";
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
//# sourceMappingURL=ticket-75eb81e6.js.map
