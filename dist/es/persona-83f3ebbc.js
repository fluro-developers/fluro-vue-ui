import { bh as _, an as FluroRealmDots, aD as FluroContentSelectButton, be as FluroSelectionMixin, bf as __vue_normalize__, bg as __vue_create_injector__, f as FluroAvatarUpdate, aE as FluroRealmSelect } from './index-8fb3448e.js';
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
import { F as FluroContentEditMixin } from './FluroContentEditMixin-d2ce1e5d.js';
import { F as FluroPermissionSelect } from './FluroPermissionSelect-a83d5982.js';

//

var script = {
  computed: {
    contextName() {
      if (!this.host) {
        return '';
      }

      if (this.host.firstName) {
        return this.host.firstName;
      }

      return this.host.title || '';
    },

    selected() {
      var self = this;
      return _.chain(self.selection).orderBy(function (policy) {
        return policy.title;
      }).value();
    },

    notSelected() {
      var self = this;
      return _.chain(self.policies).filter(function (policy) {
        return !self.isSelected(policy);
      }).orderBy(function (policy) {
        return policy.title;
      }).value();
    }

  },
  components: {
    FluroRealmDots,
    FluroContentSelectButton
  },
  mixins: [FluroSelectionMixin],
  props: {
    'host': {
      type: Object
    },
    'value': {
      type: Array,
      default: function () {
        return [];
      }
    }
  },

  data() {
    return {
      loading: true
    };
  },

  asyncComputed: {
    policies: {
      default: [],

      get() {
        var self = this;
        return new Promise(function (resolve, reject) {
          self.$fluro.api.get('/content/policy').then(function (res) {
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

  created() {
    this.setSelection(this.value);
  },

  watch: {
    'value': function () {
      //Set the value so update the selection
      // console.log('SET SELECTION NOW', this.value)
      this.setSelection(this.value);
    },
    'selection': function () {
      var self = this; //Emit the change

      this.$emit('input', self.selection);
    }
  },
  methods: {}
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"access-pass-select"},[(_vm.selected.length)?_c('v-input',{staticClass:"no-flex"},[_c('h5',{attrs:{"margin":""}},[_vm._v(_vm._s(_vm.selected.length)+" selected")]),_vm._v(" "),_c('list-group',[_c('transition-group',{attrs:{"type":"transition","name":"flip-list"}},_vm._l((_vm.selected),function(pass){return _c('list-group-item',{key:pass._id,scopedSlots:_vm._u([{key:"left",fn:function(){return [_c('fluro-realm-bar',{attrs:{"realm":pass.realms}})]},proxy:true},{key:"default",fn:function(){return [_c('strong',[_vm._v(_vm._s(pass.title))]),_vm._v(" "),_c('div',{staticClass:"muted sm"},[_vm._v(_vm._s(pass.description))])]},proxy:true},{key:"right",fn:function(){return [_c('v-btn',{staticClass:"ma-0",attrs:{"small":"","icon":""},on:{"click":function($event){return _vm.deselect(pass)}}},[_c('fluro-icon',{attrs:{"icon":"times"}})],1)]},proxy:true}],null,true)})}),1)],1)],1):_vm._e(),_vm._v(" "),_c('p'),_vm._v(" "),_c('v-input',{staticClass:"no-flex"},[_c('h5',[_vm._v("Available passes")]),_vm._v(" "),_c('p',{staticClass:"help-block"},[_vm._v("Add passes to "+_vm._s(_vm.contextName)+" by selecting from available passes below")]),_vm._v(" "),_c('list-group',[_c('transition-group',{attrs:{"type":"transition","name":"flip-list"}},_vm._l((_vm.notSelected),function(pass){return _c('list-group-item',{key:pass._id,staticClass:"inactive",scopedSlots:_vm._u([{key:"left",fn:function(){return [_c('fluro-realm-bar',{attrs:{"realm":pass.realms}})]},proxy:true},{key:"default",fn:function(){return [_c('strong',[_vm._v(_vm._s(pass.title))]),_vm._v(" "),_c('div',{staticClass:"muted sm"},[_vm._v(_vm._s(pass.description))])]},proxy:true},{key:"right",fn:function(){return [_c('v-btn',{staticClass:"ma-0",attrs:{"color":"primary","small":""},on:{"click":function($event){return _vm.select(pass)}}},[_vm._v("\n                        Add\n                        "),_c('fluro-icon',{attrs:{"right":"","icon":"plus"}})],1)]},proxy:true}],null,true)})}),1)],1)],1)],1)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-0913f6dd_0", { source: ".border-top[data-v-0913f6dd]{border-top:1px solid rgba(0,0,0,.05)}.border-right[data-v-0913f6dd]{border-right:1px solid rgba(0,0,0,.05)}.border-bottom[data-v-0913f6dd]{border-bottom:1px solid rgba(0,0,0,.05)}.border-left[data-v-0913f6dd]{border-left:1px solid rgba(0,0,0,.05)}.access-pass-select[data-v-0913f6dd] .list-group-item-content{padding-left:10px}.access-pass-select .flip-list-move[data-v-0913f6dd]{transition:transform .5s}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-0913f6dd";
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

//

var script$1 = {
  props: {
    fields: {
      type: Array,

      default() {
        var array = []; ///////////////////////////////////

        addField("firstName", {
          title: "First Name",
          minimum: 1,
          maximum: 1,
          type: "string",
          placeholder: "Eg. Jessica"
        });
        addField("lastName", {
          title: "Last Name",
          minimum: 1,
          maximum: 1,
          type: "string",
          placeholder: "Eg. Michaels"
        });
        addField("collectionEmail", {
          title: "Email Address",
          minimum: 1,
          maximum: 1,
          type: "string",
          description: "An invitation will be sent to this email address allowing the user to confirm and accept this persona",
          placeholder: "Eg. name@email.com"
        }); ///////////////////////////////////

        function addField(key, details) {
          details.key = key;
          array.push(details);
        }

        return array;
      }

    }
  },
  mixins: [FluroContentEditMixin],
  components: {
    FluroAccessPassSelect: __vue_component__,
    FluroPermissionSelect,
    FluroAvatarUpdate,
    FluroRealmSelect
  },
  methods: {
    modelUpdated() {
      this.update(this.model);
    },

    resetPassword() {
      var self = this;
      self.resetting = true;
      return self.$fluro.api.post(`/user/reinvite/${self.itemID}`).then(function (res) {
        self.resetting = false;
        var email = self.model.collectionEmail;

        if (self.model.user) {
          email = self.model.user.email;
        } ////////////////////////////////////


        self.$fluro.notify(`Instructions on how to reset password have been sent to ${email}`);
      }).catch(function (err) {
        self.$fluro.error(err);
        self.resetting = false;
      });
    }

  },
  watch: {
    title(val) {
      this.$set(this.model, "title", this.title);
      this.update(this.model);
    }

  },

  created() {
    var self = this;

    if (!self.model.policies) {
      self.model.policies = [];
    }
  },

  asyncComputed: {},
  computed: {
    title() {
      if (!this.model) {
        return "";
      }

      if (this.model.firstName) {
        return `${this.model.firstName} ${this.model.lastName || ""}`;
      }

      return "";
    },

    contextName() {
      var name = this.model.firstName;

      if (!name || !name.length) {
        return "";
      }

      if (this.model.user) {
        name = `${this.model.user.firstName}`;
      }

      if (_.endsWith(name, "s")) {
        return `${name}'`;
      }

      return `${name}'s`;
    },

    showOutline() {
      return false; //true; //false;//true;//false;//true;
    }

  },

  data() {
    return {
      resetting: false
    };
  }

};

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flex-column',[(_vm.loading)?[_c('fluro-page-preloader',{attrs:{"contain":""}})]:_c('tabset',{attrs:{"justified":true,"vertical":true},scopedSlots:_vm._u([{key:"menuprefix",fn:function(){return [(_vm.context == 'edit' && _vm.$vuetify.breakpoint.smAndUp)?[_c('flex-column-header',{staticStyle:{"text-align":"center"}},[_c('div',{staticStyle:{"padding":"10px","max-width":"200px","margin":"auto"}},[_c('fluro-avatar-update',{attrs:{"id":_vm.model._id,"type":"persona"}})],1)])]:_vm._e()]},proxy:true}])},[_vm._v(" "),_c('tab',{attrs:{"heading":"Login Details"}},[_vm._t("default",[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',{staticClass:"grid-list-xl"},[_c('constrain',{attrs:{"sm":""}},[(_vm.$vuetify.breakpoint.xsOnly)?[(_vm.context == 'edit')?[_c('div',{staticStyle:{"max-width":"200px","margin":"auto"}},[_c('fluro-avatar-update',{attrs:{"id":_vm.model._id,"type":"persona"}})],1)]:_vm._e()]:_vm._e(),_vm._v(" "),(_vm.model.user)?[_c('v-layout',{attrs:{"row":"","wrap":""}},[_c('v-flex',{attrs:{"xs12":"","sm6":""}},[_c('v-input',{staticClass:"no-flex"},[_c('v-label',[_vm._v("First Name")]),_vm._v(" "),_c('Div',{staticClass:"lead"},[_vm._v(_vm._s(_vm.model.user.firstName))])],1)],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm6":""}},[_c('v-input',{staticClass:"no-flex"},[_c('v-label',[_vm._v("Last Name")]),_vm._v(" "),_c('Div',{staticClass:"lead"},[_vm._v(_vm._s(_vm.model.user.lastName))])],1)],1)],1),_vm._v(" "),_c('v-input',{staticClass:"no-flex"},[_c('v-label',[_vm._v("Email Address")]),_vm._v(" "),_c('Div',{staticClass:"lead"},[_vm._v(_vm._s(_vm.model.user.email))])],1),_vm._v(" "),_c('p'),_vm._v(" "),_c('p'),_vm._v(" "),_c('v-input',{staticClass:"no-flex"},[_c('v-label',[_vm._v("Change User Details")]),_vm._v(" "),_c('p',{staticClass:"help-block"},[_vm._v("\n                                        To change "+_vm._s(_vm.contextName)+" password\n                                        or email details click the button\n                                        below, this will send an invitation\n                                        to the user to create a new password\n                                        and then login to the system\n                                    ")]),_vm._v(" "),_c('v-btn',{staticClass:"mx-0",attrs:{"color":"primary","loading":_vm.resetting},on:{"click":_vm.resetPassword}},[_vm._v("\n                                        Send Password Reset Request\n                                        "),_c('fluro-icon',{attrs:{"right":"","icon":"paper-plane"}})],1)],1)]:[_c('h3',{attrs:{"margin":""}},[_vm._v("Basic Details")]),_vm._v(" "),_c('v-layout',{attrs:{"row":"","wrap":""}},[_c('v-flex',{attrs:{"xs12":"","sm6":""}},[_c('fluro-content-form-field',{attrs:{"autofocus":true,"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.firstName},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm6":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.lastName},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1)],1),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.collectionEmail},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),(_vm.model._id)?_c('v-btn',{staticClass:"mx-0",attrs:{"color":"primary","loading":_vm.resetting},on:{"click":_vm.resetPassword}},[_vm._v("\n                                        Resend invitation\n                                        "),_c('fluro-icon',{attrs:{"right":"","icon":"paper-plane"}})],1):_vm._e()]],2)],1)],1)])],2),_vm._v(" "),_c('tab',{attrs:{"heading":"Access Passes"}},[_vm._t("default",[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',{attrs:{"grid-list-xl":""}},[_c('constrain',{attrs:{"sm":""}},[_c('h3',{attrs:{"margin":""}},[_vm._v(_vm._s(_vm.contextName)+" Access Passes")]),_vm._v(" "),_c('fluro-access-pass-select',{attrs:{"host":_vm.model},on:{"input":_vm.modelUpdated},model:{value:(_vm.model.policies),callback:function ($$v) {_vm.$set(_vm.model, "policies", $$v);},expression:"model.policies"}})],1)],1)],1)])],2),_vm._v(" "),_c('tab',{attrs:{"heading":"Individual Permissions"}},[_vm._t("default",[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',{attrs:{"grid-list-xl":""}},[_c('constrain',{attrs:{"sm":""}},[_c('h3',{attrs:{"margin":""}},[_vm._v("\n                                "+_vm._s(_vm.contextName)+" Individual Permissions\n                            ")]),_vm._v(" "),_c('fluro-permission-select',{on:{"input":_vm.modelUpdated},model:{value:(_vm.model.permissionSets),callback:function ($$v) {_vm.$set(_vm.model, "permissionSets", $$v);},expression:"model.permissionSets"}})],1)],1)],1)])],2)],1)],2)};
var __vue_staticRenderFns__$1 = [];

  /* style */
  const __vue_inject_styles__$1 = function (inject) {
    if (!inject) return
    inject("data-v-08b68d7c_0", { source: ".border-top[data-v-08b68d7c]{border-top:1px solid rgba(0,0,0,.05)}.border-right[data-v-08b68d7c]{border-right:1px solid rgba(0,0,0,.05)}.border-bottom[data-v-08b68d7c]{border-bottom:1px solid rgba(0,0,0,.05)}.border-left[data-v-08b68d7c]{border-left:1px solid rgba(0,0,0,.05)}.hint[data-v-08b68d7c]{font-size:10px;opacity:.5;color:inherit;display:block}.bordered[data-v-08b68d7c]{border:1px solid rgba(0,0,0,.1);box-shadow:0 2px 4px rgba(0,0,0,.1)}.bordered[data-v-08b68d7c] .tabset-menu{background:#eee}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$1 = "data-v-08b68d7c";
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$1 = __vue_normalize__(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    __vue_create_injector__,
    undefined,
    undefined
  );

export default __vue_component__$1;
//# sourceMappingURL=persona-83f3ebbc.js.map
