import { b4 as MailoutRenderPreview, b5 as MailoutTestPanel, b7 as MailoutResultsPanel, b6 as MailoutPreflightPanel, bd as __vue_normalize__ } from './index-53cb5ffc.js';
import Vue from 'vue';
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

let InfoCell = Vue.extend({
  props: {
    'row': {
      type: Object
    },
    'column': {
      type: Object
    },
    'data': {// type: Object,
    }
  },
  methods: {
    info() {
      this.$fluro.modal({
        component: CorrespondenceInfoModal,
        options: {
          item: this.row
        }
      });
    }

  },
  template: `<v-btn class="ma-0" small @click="info">
   Info
    </v-btn>`
}); /////////////////////////////////

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

  mounted() {
    console.log('RECREATED');
  },

  components: {
    // SearchInput,
    // FluroTable,
    // FluroContentFormField,
    // FluroContentSelectButton,
    MailoutRenderPreview,
    MailoutTestPanel,
    MailoutResultsPanel,
    MailoutPreflightPanel
  },
  mixins: [FluroContentViewMixin],
  methods: {},
  computed: {
    definitionName() {
      return this.item.definition;
    },

    resultsEnabled() {
      var self = this;

      if (self.item.state == 'sent') {
        return true;
      }

      if (self.item.stats && self.item.stats.mailoutSent) {
        return true;
      }
    },

    sendHeading() {
      var self = this;

      switch (self.item.state) {
        case 'scheduled':
          if (!this.duration) {
            return 'Scheduled';
          }

          return 'Scheduled'; // return `Sending in ${self.countdown}`;

        default:
          return 'Publish';
      }
    },

    data() {
      return this.item.data || {};
    },

    definedFields() {
      return this.config.definition.fields;
    }

  },

  data() {
    return {
      activeTabIndex: 0,
      search: ''
    };
  }

};

/* script */
const __vue_script__ = script;
/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flex-column',[(_vm.loading)?[_c('fluro-page-preloader',{attrs:{"contain":""}})]:[_c('tabset',{attrs:{"justified":true},model:{value:(_vm.activeTabIndex),callback:function ($$v) {_vm.activeTabIndex=$$v;},expression:"activeTabIndex"}},[(_vm.item.state == 'sent')?_c('tab',{attrs:{"heading":"Results"}},[_c('mailout-results-panel',{model:{value:(_vm.item),callback:function ($$v) {_vm.item=$$v;},expression:"item"}})],1):_vm._e(),_vm._v(" "),_c('tab',{attrs:{"heading":"Rendered Preview"}},[_c('mailout-render-preview',{attrs:{"mailout":_vm.item._id,"definition":_vm.item.definition}})],1),_vm._v(" "),(_vm.item.state != 'sent')?_c('tab',{attrs:{"heading":"Test"}},[_c('mailout-test-panel',{model:{value:(_vm.item),callback:function ($$v) {_vm.item=$$v;},expression:"item"}})],1):_vm._e(),_vm._v(" "),(_vm.item.state != 'sent')?_c('tab',{attrs:{"heading":_vm.sendHeading}},[_c('mailout-preflight-panel',{model:{value:(_vm.item),callback:function ($$v) {_vm.item=$$v;},expression:"item"}})],1):_vm._e(),_vm._v(" "),(_vm.item.state != 'sent' && _vm.resultsEnabled)?_c('tab',{attrs:{"heading":"Results"}},[_c('mailout-results-panel',{model:{value:(_vm.item),callback:function ($$v) {_vm.item=$$v;},expression:"item"}})],1):_vm._e()],1)]],2)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = "data-v-515eed9a";
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
//# sourceMappingURL=mailout-61aca048.js.map
