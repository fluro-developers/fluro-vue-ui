import { bl as __vue_normalize__, bm as __vue_create_injector__ } from './index-5d9e82e2.js';
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
import { F as FluroContentViewMixin } from './FluroContentViewMixin-946fe54b.js';

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
  computed: {},

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
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flex-column',[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',{attrs:{"fluid":"","grid-list-lg":""}},[_c('constrain',{attrs:{"sm":""}},[_c('v-layout',{attrs:{"row":"","wrap":""}},[(_vm.item.emails && _vm.item.emails.length)?_c('v-flex',{attrs:{"xs12":"","sm6":""}},[_c('v-input',{staticClass:"no-flex"},[_c('v-label',[_vm._v("Email Addresses")]),_vm._v(" "),_vm._l((_vm.item.emails),function(email){return _c('div',[_c('a',{attrs:{"href":("mailto:" + email)}},[_c('fluro-icon',{attrs:{"icon":"envelope","left":""}}),_vm._v(" "+_vm._s(email))],1)])})],2)],1):_vm._e(),_vm._v(" "),(_vm.item.phoneNumbers && _vm.item.phoneNumbers.length)?_c('v-flex',{attrs:{"xs12":"","sm6":""}},[_c('v-input',{staticClass:"no-flex"},[_c('v-label',[_vm._v("Phone Numbers")]),_vm._v(" "),_vm._l((_vm.item.phoneNumbers),function(number){return _c('div',[_c('a',{attrs:{"href":("tel:" + number)}},[_c('fluro-icon',{attrs:{"icon":"phone","left":""}}),_vm._v(" "+_vm._s(number))],1)])})],2)],1):_vm._e()],1),_vm._v(" "),_c('h4',[_vm._v(_vm._s(_vm.item.items.length)+" Family Members")]),_vm._v(" "),_c('list-group',_vm._l((_vm.item.items),function(contact){return _c('list-group-item',{key:contact._id,attrs:{"item":contact},on:{"click":function($event){return _vm.$fluro.global.view(contact, true)}},scopedSlots:_vm._u([{key:"right",fn:function(){return [_c('v-btn',{staticClass:"ma-0",attrs:{"icon":"","small":"","flat":""},on:{"click":function($event){$event.stopPropagation();$event.preventDefault();return _vm.$actions.open([contact])}}},[_c('fluro-icon',{attrs:{"icon":"ellipsis-h"}})],1)]},proxy:true}],null,true)})}),1),_vm._v(" "),(_vm.item.address)?_c('fluro-panel',[_c('fluro-panel-title',[_vm._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tHome Address\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t")]),_vm._v(" "),_c('fluro-panel-body',[(_vm.item.address.addressLine1)?_c('v-input',{staticClass:"no-flex"},[_c('v-label',[_vm._v("Address Line 1")]),_vm._v(" "),_c('div',[_vm._v(_vm._s(_vm.item.address.addressLine1))])],1):_vm._e(),_vm._v(" "),(_vm.item.address.addressLine2)?_c('v-input',{staticClass:"no-flex"},[_c('v-label',[_vm._v("Address Line 2")]),_vm._v(" "),_c('div',[_vm._v(_vm._s(_vm.item.address.addressLine2))])],1):_vm._e(),_vm._v(" "),_c('v-layout',{attrs:{"row":"","wrap":""}},[(_vm.item.address.suburb)?_c('v-flex',{attrs:{"xs12":"","sm3":""}},[_c('v-input',{staticClass:"no-flex"},[_c('v-label',[_vm._v("Suburb")]),_vm._v(" "),_c('div',[_vm._v(_vm._s(_vm.item.address.suburb))])],1)],1):_vm._e(),_vm._v(" "),(_vm.item.address.state)?_c('v-flex',{attrs:{"xs12":"","sm3":""}},[_c('v-input',{staticClass:"no-flex"},[_c('v-label',[_vm._v("State")]),_vm._v(" "),_c('div',[_vm._v(_vm._s(_vm.item.address.state))])],1)],1):_vm._e(),_vm._v(" "),(_vm.item.address.postalCode)?_c('v-flex',{attrs:{"xs12":"","sm3":""}},[_c('v-input',{staticClass:"no-flex"},[_c('v-label',[_vm._v("Postal Code")]),_vm._v(" "),_c('div',[_vm._v(_vm._s(_vm.item.address.postalCode))])],1)],1):_vm._e(),_vm._v(" "),(_vm.item.address.country)?_c('v-flex',{attrs:{"xs12":"","sm3":""}},[_c('v-input',{staticClass:"no-flex"},[_c('v-label',[_vm._v("Country")]),_vm._v(" "),_c('div',[_vm._v(_vm._s(_vm.item.address.country))])],1)],1):_vm._e()],1)],1)],1):_vm._e(),_vm._v(" "),(_vm.item.postalAddress)?[(!_vm.item.samePostal)?_c('fluro-panel',[_c('fluro-panel-title',[_vm._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tPostal Address\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t")]),_vm._v(" "),_c('fluro-panel-body',[(_vm.item.postalAddress.addressLine1)?_c('v-input',{staticClass:"no-flex"},[_c('v-label',[_vm._v("Address Line 1")]),_vm._v(" "),_c('div',[_vm._v(_vm._s(_vm.item.postalAddress.addressLine1))])],1):_vm._e(),_vm._v(" "),(_vm.item.postalAddress.addressLine2)?_c('v-input',{staticClass:"no-flex"},[_c('v-label',[_vm._v("Address Line 2")]),_vm._v(" "),_c('div',[_vm._v(_vm._s(_vm.item.postalAddress.addressLine2))])],1):_vm._e(),_vm._v(" "),_c('v-layout',{attrs:{"row":"","wrap":""}},[(_vm.item.postalAddress.suburb)?_c('v-flex',{attrs:{"xs12":"","sm3":""}},[_c('v-input',{staticClass:"no-flex"},[_c('v-label',[_vm._v("Suburb")]),_vm._v(" "),_c('div',[_vm._v(_vm._s(_vm.item.postalAddress.suburb))])],1)],1):_vm._e(),_vm._v(" "),(_vm.item.postalAddress.state)?_c('v-flex',{attrs:{"xs12":"","sm3":""}},[_c('v-input',{staticClass:"no-flex"},[_c('v-label',[_vm._v("State")]),_vm._v(" "),_c('div',[_vm._v(_vm._s(_vm.item.postalAddress.state))])],1)],1):_vm._e(),_vm._v(" "),(_vm.item.postalAddress.postalCode)?_c('v-flex',{attrs:{"xs12":"","sm3":""}},[_c('v-input',{staticClass:"no-flex"},[_c('v-label',[_vm._v("Postal Code")]),_vm._v(" "),_c('div',[_vm._v(_vm._s(_vm.item.postalAddress.postalCode))])],1)],1):_vm._e(),_vm._v(" "),(_vm.item.postalAddress.country)?_c('v-flex',{attrs:{"xs12":"","sm3":""}},[_c('v-input',{staticClass:"no-flex"},[_c('v-label',[_vm._v("Country")]),_vm._v(" "),_c('div',[_vm._v(_vm._s(_vm.item.postalAddress.country))])],1)],1):_vm._e()],1)],1)],1):_vm._e()]:_vm._e(),_vm._v(" "),(_vm.fields && _vm.fields.length)?[_c('fluro-content-render',{attrs:{"fields":_vm.fields},model:{value:(_vm.item.data),callback:function ($$v) {_vm.$set(_vm.item, "data", $$v);},expression:"item.data"}})]:_vm._e()],2)],1)],1)],1)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-c2a86516_0", { source: ".border-top[data-v-c2a86516]{border-top:1px solid rgba(0,0,0,.05)}.border-right[data-v-c2a86516]{border-right:1px solid rgba(0,0,0,.05)}.border-bottom[data-v-c2a86516]{border-bottom:1px solid rgba(0,0,0,.05)}.border-left[data-v-c2a86516]{border-left:1px solid rgba(0,0,0,.05)}a[data-v-c2a86516]{color:inherit;text-decoration:none;cursor:pointer}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-c2a86516";
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
//# sourceMappingURL=family-7061b658.js.map
