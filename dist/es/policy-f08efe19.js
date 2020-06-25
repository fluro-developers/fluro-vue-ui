import { bj as _, bh as __vue_normalize__, bi as __vue_create_injector__ } from './index-20f019b0.js';
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
import { F as FluroContentEditMixin } from './FluroContentEditMixin-5d415b50.js';
import { F as FluroPermissionSelect } from './FluroPermissionSelect-39aa8eb9.js';

//

var script = {
  components: {
    // FluroEditor,
    FluroPermissionSelect
  },
  mixins: [FluroContentEditMixin],
  methods: {
    copyCodeToClipboard() {
      var self = this;
      let testingCodeToCopy = this.$refs.input;
      testingCodeToCopy.setAttribute('type', 'text'); // 不是 hidden 才能複製

      testingCodeToCopy.select();

      try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful'; // alert('Testing code was copied ' + msg);

        self.$fluro.notify('Invite Code Copied to clipboard');
      } catch (err) {} // alert('Oops, unable to copy');
      // self.$fluro.error({message:'Unable to copy to clipboard'});

      /* unselect the range */


      testingCodeToCopy.setAttribute('type', 'hidden');

      if (process.browser) {
        window.getSelection().removeAllRanges();
      }
    },

    toggleExpand(key) {
      var self = this;
      self.$set(self.expandedSettings, `_${key}`, !self.expandedSettings[`_${key}`]);
      console.log('TOGGLE', key, self.expandedSettings);
    }

  },
  computed: {
    policyCode() {
      return _.get(this.model, 'privateDetails.inviteCode');
    },

    inviteCode() {
      var self = this;
      return `${self.user.account.prefix}-${self.policyCode}`.toUpperCase();
    },

    expanded() {
      var self = this;
      return {
        contacts: self.expandedSettings._contacts || self.model.contacts && self.model.contacts.length,
        teams: self.expandedSettings._teams || self.model.teams && self.model.teams.length,
        tickets: self.expandedSettings._tickets || self.model.tickets && self.model.tickets.length,
        events: self.expandedSettings._events || self.model.events && self.model.events.length,
        interactions: self.expandedSettings._interactions || self.model.interactions && self.model.interactions.length,
        cards: self.expandedSettings._cards || self.model.cards && self.model.cards.length,
        checkins: self.expandedSettings._checkins || self.model.checkins && self.model.checkins.length,
        details: self.expandedSettings._details || self.model.details && self.model.details.length,
        families: self.expandedSettings._families || self.model.families && self.model.families.length,
        personas: self.expandedSettings._personas || self.model.personas && self.model.personas.length,
        collections: self.expandedSettings._collections || self.model.collections && self.model.collections.length,
        tags: self.expandedSettings._tags || self.model.tags && self.model.tags.length,
        realms: self.expandedSettings._realms || self.model.realms && self.model.realms.length,
        definitions: self.expandedSettings._definitions || self.model.definitions && self.model.definitions.length,
        query: self.expandedSettings._query || self.model.query
      };
    },

    mailoutType() {
      return this.model.mailoutType;
    },

    user() {
      return this.$fluro.auth.getCurrentUser();
    },

    fieldsOutput() {
      var array = []; ///////////////////////////////////

      addField('title', {
        title: 'Title',
        minimum: 1,
        maximum: 1,
        type: 'string',
        placeholder: `Eg. 'Standard Access'`
      });
      addField('description', {
        title: 'Description',
        description: 'Enter a one line description summarizing what permissions this access pass will grant',
        minimum: 0,
        maximum: 1,
        type: 'string',
        placeholder: `Eg. 'This pass allows a user to access all contacts and teams in the X Realm'`
      });
      addField('inviteCodeEnabled', {
        title: 'Enable Invite Code',
        description: 'Enable an invitation code that you can share with people so they can quickly acquire this access pass.',
        minimum: 0,
        maximum: 1,
        type: 'boolean'
      }); // // console.log('TYPE OPTIONS', self.typeOptions);
      // addField('filterType', {
      //     title: 'Type',
      //     minimum: 0,
      //     maximum: 1,
      //     type: 'string',
      //     directive: 'select',
      //     description: 'The type of item you want to return from this query',
      //     options: self.typeOptions,
      // })
      ///////////////////////////////////

      function addField(key, details) {
        details.key = key;
        array.push(details);
      }

      return array;
    }

  },

  data() {
    return {
      editorOptions: {}
    };
  }

};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flex-column',[(_vm.loading)?[_c('fluro-page-preloader',{attrs:{"contain":""}})]:[_c('tabset',{attrs:{"justified":true,"vertical":true}},[_c('tab',{attrs:{"heading":"Pass Settings"}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',[_c('constrain',{attrs:{"sm":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.title},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.description},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-panel',[_c('fluro-panel-title',[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.inviteCodeEnabled},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1),_vm._v(" "),(_vm.model.inviteCodeEnabled)?[_c('div',{directives:[{name:"tippy",rawName:"v-tippy"}],staticClass:"invite-code",attrs:{"content":"Click to copy to clipboard"},on:{"click":_vm.copyCodeToClipboard}},[_c('span',[_vm._v(_vm._s(_vm.inviteCode))])]),_vm._v(" "),_c('input',{ref:"input",attrs:{"type":"hidden"},domProps:{"value":_vm.inviteCode}})]:_vm._e()],2),_vm._v(" "),_c('fluro-permission-select',{model:{value:(_vm.model.sets),callback:function ($$v) {_vm.$set(_vm.model, "sets", $$v);},expression:"model.sets"}})],1)],1)],1)],1),_vm._v(" "),(_vm.definition)?_c('tab',{attrs:{"heading":((_vm.definition.title) + " Fields")}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',[_c('constrain',{attrs:{"sm":""}},[_c('h3',{attrs:{"margin":""}},[_vm._v(_vm._s(_vm.definition.title)+" Fields")]),_vm._v(" "),_c('fluro-content-form',{attrs:{"options":_vm.options,"fields":_vm.definition.fields},model:{value:(_vm.model.data),callback:function ($$v) {_vm.$set(_vm.model, "data", $$v);},expression:"model.data"}})],1)],1)],1)],1):_vm._e()],1)]],2)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-2f2d0fe8_0", { source: ".border-top{border-top:1px solid rgba(0,0,0,.05)}.border-right{border-right:1px solid rgba(0,0,0,.05)}.border-bottom{border-bottom:1px solid rgba(0,0,0,.05)}.border-left{border-left:1px solid rgba(0,0,0,.05)}.invite-code{line-height:60px;height:60px;padding:0 5px;border:1px solid rgba(42,212,185,.5);background:rgba(42,212,185,.1);text-align:center;font-weight:100;font-size:40px}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = undefined;
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
//# sourceMappingURL=policy-f08efe19.js.map
