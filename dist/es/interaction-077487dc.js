import { bh as __vue_normalize__, bi as __vue_create_injector__ } from './index-0887843e.js';
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
import { T as TicketList } from './TicketList-1549dd9d.js';
import { F as FluroContentViewMixin } from './FluroContentViewMixin-3ab04cef.js';

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
    TicketList
  },
  asyncComputed: {
    tickets: {
      default: [],

      get() {
        var self = this;
        self.loading = true; ///////////////////////////////////

        var url = `/tickets/interaction/${self.item._id}`; ///////////////////////////////////

        return new Promise(function (resolve, reject) {
          return self.$fluro.api.get(url).then(function (res) {
            resolve(res.data);
            self.loading = false;
          }).catch(function (err) {
            reject(err);
            self.loading = false;
          });
        });
      }

    }
  },
  mixins: [FluroContentViewMixin],
  methods: {},
  computed: {
    qrCodeURL() {
      var self = this;
      var interactionID = self.$fluro.utils.getStringID(self.item);
      return `${self.$fluro.api.defaults.baseURL}/system/qr?input=http://tickets.fluro.io/interaction/${interactionID}`;
    },

    paymentMethod() {
      return this.item.paymentMethod;
    },

    paymentExists() {
      return _.get(this.config.definition, ' paymentDetails.required') || _.get(this.config.definition, ' paymentDetails.allow');
    },

    data() {
      return this.item.data || {};
    },

    defaultFields() {
      var array = [];
      var fields = [{
        title: 'Names',
        type: 'group',
        key: 'names',
        sameLine: true,
        fields: [{
          title: 'First Name',
          key: '_firstName',
          minimum: 0,
          maximum: 1,
          type: 'string'
        }, {
          title: 'Last Name',
          key: '_lastName',
          minimum: 0,
          maximum: 1,
          type: 'string'
        }]
      }, {
        title: 'Extras',
        type: 'group',
        key: 'extras',
        sameLine: true,
        fields: [{
          title: 'Gender',
          key: '_gender',
          minimum: 0,
          maximum: 1,
          type: 'string',
          directive: 'select',
          options: [{
            name: 'Male',
            value: 'male'
          }, {
            name: 'Female',
            value: 'female'
          }, {
            name: 'Unknown',
            value: 'unknown'
          }]
        }, {
          title: 'Date of Birth',
          key: '_dob',
          minimum: 0,
          maximum: 1,
          type: 'date',
          directive: 'datepicker'
        }]
      }, {
        title: 'Communication',
        type: 'group',
        key: 'communication',
        sameLine: true,
        fields: [{
          title: 'Email Address',
          key: '_email',
          minimum: 0,
          maximum: 1,
          type: 'email'
        }, {
          title: 'Phone Number',
          key: '_phoneNumber',
          minimum: 0,
          maximum: 1,
          type: 'string'
        }]
      }];
      addField('contactDetails', {
        title: 'Contact Details',
        type: 'group',
        key: 'contactDetails',
        // expressions: {
        // 				show() {
        // 						return self.
        // 				},
        // },
        fields
      });

      function addField(key, details) {
        details.key = key;
        array.push(details);
      }

      return array;
    },

    interactionFields() {
      var array = []; ///////////////////////////////////

      addField('contact', {
        title: 'Primary Contact',
        description: 'The primary contact for this interaction',
        minimum: 0,
        maximum: 1,
        type: 'reference',
        params: {
          restrictType: 'contact',
          allDefinitions: true
        }
      });
      addField('contacts', {
        title: 'Linked Contacts',
        description: 'All contacts referenced for this interaction',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        params: {
          restrictType: 'contact',
          allDefinitions: true
        }
      });
      addField('event', {
        title: 'Linked Event',
        description: 'Attach this interaction to a specific event',
        minimum: 0,
        maximum: 1,
        type: 'reference',
        params: {
          restrictType: 'event',
          allDefinitions: true
        }
      }); ///////////////////////////////////

      addField('emails', {
        type: 'group',
        sameLine: true,
        fields: [{
          title: 'Primary Email Address',
          key: 'primaryEmail',
          description: 'The primary email address relevant to this interaction',
          minimum: 0,
          maximum: 1,
          type: 'email'
        }, {
          title: 'Transaction Email Address',
          key: 'transactionEmail',
          description: 'The primary email address relevant to this interaction',
          minimum: 0,
          maximum: 1,
          type: 'email',
          expressions: {
            defaultValue: `data.primaryEmail`
          }
        }]
      });

      function addField(key, details) {
        details.key = key;
        array.push(details);
      }

      return array;
    }

  },

  data() {
    return {
      loading: true
    };
  },

  created() {
    console.log('THIS RENDERER', this);
  }

};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flex-column',[_c('tabset',{attrs:{"justified":true}},[_c('tab',{attrs:{"heading":"Submission"}},[_c('flex-column-body',[(_vm.item)?_c('v-container',[_c('fluro-content-render',{attrs:{"fields":_vm.defaultFields,"raw":true},model:{value:(_vm.item.rawData),callback:function ($$v) {_vm.$set(_vm.item, "rawData", $$v);},expression:"item.rawData"}}),_vm._v(" "),_c('fluro-content-render',{attrs:{"fields":_vm.interactionFields,"raw":true},model:{value:(_vm.item),callback:function ($$v) {_vm.item=$$v;},expression:"item"}}),_vm._v(" "),(_vm.paymentExists)?_c('fluro-panel',[_c('fluro-panel-body',[(_vm.paymentMethod)?_c('v-input',{staticClass:"no-flex"},[_c('v-label',[_vm._v("Selected Payment Method")]),_vm._v(" "),_c('h3',[_vm._v(_vm._s(_vm.paymentMethod.title || _vm.paymentMethod))])],1):_vm._e()],1)],1):_vm._e(),_vm._v(" "),_c('fluro-content-render',{attrs:{"fields":_vm.fields,"raw":true},model:{value:(_vm.item.rawData),callback:function ($$v) {_vm.$set(_vm.item, "rawData", $$v);},expression:"item.rawData"}})],1):_vm._e()],1)],1),_vm._v(" "),(_vm.tickets.length)?_c('tab',{attrs:{"heading":((_vm.tickets.length) + " Tickets")}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',{staticClass:"border-bottom",staticStyle:{"background":"#fff"},attrs:{"fluid":""}},[_c('img',{staticClass:"qrcode",attrs:{"src":_vm.qrCodeURL}})]),_vm._v(" "),_c('v-container',[_c('ticket-list',{attrs:{"interaction":_vm.item}})],1)],1)],1):_vm._e()],1)],1)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-5f5c2243_0", { source: ".border-top[data-v-5f5c2243]{border-top:1px solid rgba(0,0,0,.05)}.border-right[data-v-5f5c2243]{border-right:1px solid rgba(0,0,0,.05)}.border-bottom[data-v-5f5c2243]{border-bottom:1px solid rgba(0,0,0,.05)}.border-left[data-v-5f5c2243]{border-left:1px solid rgba(0,0,0,.05)}.qrcode[data-v-5f5c2243]{display:block;border:5px solid #000;background:#000;margin:auto}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-5f5c2243";
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
//# sourceMappingURL=interaction-077487dc.js.map
