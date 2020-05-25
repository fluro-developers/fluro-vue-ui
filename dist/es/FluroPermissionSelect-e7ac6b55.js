import { aD as FluroRealmSelect, aC as FluroContentSelectButton, bg as _, be as styleInject, bf as __vue_normalize__ } from './index-78607ce6.js';
import 'vue';

//

var script = {
  components: {
    FluroRealmSelect,
    FluroContentSelectButton
  },
  mixins: [],
  props: {
    'value': {
      type: Array,
      default: function () {
        return [];
      }
    }
  },

  data() {
    return {
      model: JSON.parse(JSON.stringify(this.value)),
      loading: true,
      proposed: {
        roles: [],
        realms: []
      }
    };
  },

  computed: {
    canEditRoles() {
      return this.$fluro.access.can('edit', 'role');
    },

    valid() {
      if (!this.proposed.roles || !this.proposed.roles.length) {
        return;
      }

      if (!this.proposed.realms || !this.proposed.realms.length) {
        return;
      }

      return true;
    }

  },
  asyncComputed: {// policies: {
    //     default: [],
    //     get() {
    //         var self = this;
    //         return new Promise(function(resolve, reject) {
    //             self.$fluro.api.get('/content/policy')
    //                 .then(function(res) {
    //                     resolve(res.data);
    //                     self.loading = false;
    //                 })
    //                 .catch(function(err) {
    //                     reject(err);
    //                     self.loading = false;
    //                 })
    //         })
    //     }
    // }
  },
  watch: {
    'value': function (val) {
      //Set the value so update the selection
      this.model = val;
    },
    'model': function () {
      var self = this; //Emit the change

      this.$emit('input', self.model);
    }
  },
  methods: {
    editRole(role) {
      this.$fluro.global.edit(role, true).then(function (res) {
        _.assign(res, role);
      });
    },

    add() {
      console.log('ADD');
      var copy = JSON.parse(JSON.stringify(this.proposed));
      this.model.push(copy); // this.model.splice(index, 1);

      this.proposed = {
        realms: [],
        roles: []
      };
    },

    remove(entry) {
      var index = this.model.indexOf(entry);
      this.model.splice(index, 1);
    }

  }
};

var css_248z = ".border-top[data-v-4ea3a4ae]{border-top:1px solid rgba(0,0,0,.05)}.border-right[data-v-4ea3a4ae]{border-right:1px solid rgba(0,0,0,.05)}.border-bottom[data-v-4ea3a4ae]{border-bottom:1px solid rgba(0,0,0,.05)}.border-left[data-v-4ea3a4ae]{border-left:1px solid rgba(0,0,0,.05)}.table[data-v-4ea3a4ae]{background:#fff;width:100%;border-collapse:collapse;padding:0;border:1px solid rgba(0,0,0,.1);-webkit-box-shadow:0 1px 1px rgba(0,0,0,.1);box-shadow:0 1px 1px rgba(0,0,0,.1);margin:0 0 25px}.table thead[data-v-4ea3a4ae]{text-transform:uppercase;letter-spacing:.03em;font-weight:500;font-size:12px}.table td[data-v-4ea3a4ae],.table th[data-v-4ea3a4ae]{padding:10px;text-align:left;border-bottom:1px solid rgba(0,0,0,.1);vertical-align:middle}.table td.column[data-v-4ea3a4ae],.table th.column[data-v-4ea3a4ae]{width:50%}.table th[data-v-4ea3a4ae]{background:rgba(0,0,0,.05)}";
styleInject(css_248z);

/* script */
const __vue_script__ = script;
/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"permission-select"},[(_vm.model.length)?[_c('table',{staticClass:"table"},[_vm._m(0),_vm._v(" "),_c('tbody',_vm._l((_vm.model),function(entry){return _c('tr',[_c('td',_vm._l((entry.roles),function(role){return _c('div',[_c('fluro-icon',{attrs:{"type":"role","left":""}}),_vm._v(" "),_c('strong',[_vm._v(_vm._s(role.title))]),_vm._v(" "),(_vm.canEditRoles)?_c('v-btn',{attrs:{"icon":"","small":""},on:{"click":function($event){return _vm.editRole(role)}}},[_c('fluro-icon',{attrs:{"icon":"pencil"}})],1):_vm._e()],1)}),0),_vm._v(" "),_c('td',_vm._l((entry.realms),function(realm){return _c('div',[_c('fluro-icon',{style:({color:realm.bgColor}),attrs:{"icon":"circle","library":"fas"}}),_vm._v(" "+_vm._s(realm.title)+"\n                        ")],1)}),0),_vm._v(" "),_c('td',{staticClass:"text-xs-right"},[_c('v-btn',{staticClass:"ma-0",attrs:{"small":"","icon":""},on:{"click":function($event){return _vm.remove(entry)}}},[_c('fluro-icon',{attrs:{"icon":"times"}})],1)],1)])}),0)])]:_vm._e(),_vm._v(" "),_c('fluro-card',[_c('fluro-card-title',{staticClass:"border-bottom"},[_c('h5',[_vm._v("Add permissions")]),_vm._v(" "),_c('p',{staticClass:"help-block"},[_vm._v("\n                Select a combination of roles and realms then click add to grant permissions.\n            ")])]),_vm._v(" "),_c('fluro-card-body',[_c('v-container',{staticClass:"grid-list-md",attrs:{"pa-0":""}},[_c('v-layout',{attrs:{"row":"","wrap":""}},[_c('v-flex',{attrs:{"xs12":"","md4":""}},[_c('v-input',{staticClass:"no-flex"},[_c('v-label',[_vm._v("Select a Role")]),_vm._v(" "),_c('p',{staticClass:"help-block"},[_vm._v("Select a role")]),_vm._v(" "),_c('fluro-content-select-button',{attrs:{"block":"","type":"role","allDefinitions":true,"searchInheritable":true},model:{value:(_vm.proposed.roles),callback:function ($$v) {_vm.$set(_vm.proposed, "roles", $$v);},expression:"proposed.roles"}})],1)],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","md5":""}},[_c('v-input',{staticClass:"no-flex"},[_c('v-label',[_vm._v("Select a Realm")]),_vm._v(" "),_c('p',{staticClass:"help-block"},[_vm._v("Select where this role can be used")]),_vm._v(" "),_c('fluro-realm-select',{attrs:{"block":""},model:{value:(_vm.proposed.realms),callback:function ($$v) {_vm.$set(_vm.proposed, "realms", $$v);},expression:"proposed.realms"}})],1)],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","md3":""}},[_c('v-input',{staticClass:"no-flex"},[(_vm.$vuetify.breakpoint.mdAndUp)?[_c('v-label',[_vm._v(" ")]),_vm._v(" "),_c('p',{staticClass:"help-block"},[_vm._v(" ")])]:_vm._e(),_vm._v(" "),_c('v-btn',{staticClass:"ma-0",attrs:{"disabled":!_vm.valid,"block":"","color":"primary"},on:{"click":_vm.add}},[_vm._v("\n                            Add\n                            "),_c('fluro-icon',{attrs:{"right":"","icon":"plus"}})],1)],2)],1)],1)],1)],1)],1)],2)};
var __vue_staticRenderFns__ = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('thead',[_c('tr',[_c('th',{staticClass:"column"},[_vm._v("Role")]),_vm._v(" "),_c('th',{staticClass:"column"},[_vm._v("Realms")]),_vm._v(" "),_c('th',[_vm._v(" ")])])])}];

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = "data-v-4ea3a4ae";
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

export { __vue_component__ as F };
//# sourceMappingURL=FluroPermissionSelect-e7ac6b55.js.map
