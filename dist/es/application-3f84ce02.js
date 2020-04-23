import { bb as __vue_normalize__, bc as __vue_create_injector__ } from './index-c8b5bfd5.js';
import 'vuedraggable';
import 'vue-color';
import 'tippy.js';
import 'vue2-ace-editor';
import 'js-beautify';
import 'tiptap';
import 'tiptap-commands';
import 'tiptap-extensions';
import 'signature_pad';
import 'fluro';
import 'vuex-map-fields';
import 'async';
import { F as FluroContentEditMixin } from './FluroContentEditMixin-b7f778ec.js';
import { F as FluroPermissionSelect } from './FluroPermissionSelect-1df5fd91.js';

/* script */

/* template */

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = undefined;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = __vue_normalize__(
    {},
    __vue_inject_styles__,
    {},
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

//

var script = {
  mixins: [FluroContentEditMixin],
  components: {
    FluroPermissionSelect,
    RedirectManager: __vue_component__
  },
  asyncComputed: {},
  computed: {
    showOutline() {
      return false; //true; //false;//true;//false;//true;
    },

    fieldsOutput() {
      var array = []; ///////////////////////////////////

      addField('title', {
        title: 'Title',
        minimum: 1,
        maximum: 1,
        type: 'string'
      }); // ///////////////////////////////////

      addField('domain', {
        title: 'Domain Name',
        minimum: 1,
        maximum: 1,
        type: 'string',
        description: 'Add a domain name for this application (without https://)',
        placeholder: 'Eg. website.com'
      });
      addField('forwards', {
        title: 'Forwarding Domains',
        minimum: 0,
        maximum: 0,
        type: 'string',
        description: 'Add domain names that should redirect to the primary domain name',
        placeholder: 'Eg. www.website.com'
      });
      addField('forceSSL', {
        title: 'Force SSL',
        minimum: 0,
        maximum: 1,
        type: 'boolean',
        description: 'Check this box to redirect all requests to https://'
      });
      addField('authenticationStyle', {
        title: 'Authentication Style',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'select',
        options: [{
          title: 'Application',
          value: 'application'
        }, {
          title: 'Fluro Browser Cookie',
          value: 'global'
        }]
      });
      addField('apipath', {
        title: 'API URL',
        minimum: 0,
        maximum: 1,
        type: 'string',
        description: 'Specify which API URL this application should use. If left blank, the default fluro api url will be used.',
        placeholder: 'https://api.fluro.io'
      });
      addField('timezone', {
        title: 'Timezone',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'timezone-select',
        description: 'Which timezone should be used for this application'
      });
      addField('gaTrackingCode', {
        title: 'Google Analytics ID',
        minimum: 0,
        maximum: 1,
        type: 'string',
        placeholder: 'UA-XXXXXX',
        description: 'Paste your GA tracking code to enable google analytics to track this site'
      });
      addField('supportEmail', {
        title: 'Support Email Address',
        minimum: 0,
        maximum: 1,
        type: 'email',
        placeholder: 'support@yourdomain.com',
        description: 'The default support/contact email for notifications and enquiries regarding this application'
      });
      addField('favicon', {
        title: 'Favicon',
        minimum: 0,
        maximum: 1,
        type: 'reference',
        params: {
          restrictType: 'image'
        },
        description: 'Choose an image to use for the favicon. (Recommend a 1:1 ratio and at least 1024 x 1024px)'
      });
      addField('headerInject', {
        title: 'Header Injection Code',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'code',
        params: {
          syntax: 'html'
        },
        description: 'Include HTML that can be injected above the closing </head> tag'
      });
      addField('footerInject', {
        title: 'Footer Injection Code',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'code',
        params: {
          syntax: 'html'
        },
        description: 'Include HTML that can be injected above the closing </body> tag'
      });

      function addField(key, details) {
        details.key = key;
        array.push(details);
      }

      return array;
    }

  },
  methods: {
    modelUpdated() {
      this.update(this.model);
    }

  },

  data() {
    return {};
  }

};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flex-column',[(_vm.loading)?[_c('fluro-page-preloader',{attrs:{"contain":""}})]:_c('tabset',{attrs:{"justified":true,"vertical":true}},[_c('tab',{attrs:{"heading":"Basic Info"}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',[_c('constrain',{attrs:{"sm":""}},[_c('div',{staticClass:"grid-list-xl"},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.title},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.domain},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.forwards},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1)])],1)],1)],1),_vm._v(" "),_c('tab',{attrs:{"heading":"Authentication"}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',[_c('constrain',{attrs:{"sm":""}},[_c('div',{staticClass:"grid-list-xl"},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.forceSSL},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.authenticationStyle},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1)])],1)],1)],1),_vm._v(" "),(_vm.model.authenticationStyle == 'application')?[_c('tab',{attrs:{"heading":"Application Permissions"}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',[_c('constrain',{attrs:{"sm":""}},[_c('h5',{attrs:{"margin":""}},[_vm._v("Application Permissions")]),_vm._v(" "),_c('p',[_vm._v("Add permissions here that will be attributed to this application's API Key whether a user is signed in or not.")]),_vm._v(" "),_c('fluro-permission-select',{on:{"input":_vm.modelUpdated},model:{value:(_vm.model.permissionSets),callback:function ($$v) {_vm.$set(_vm.model, "permissionSets", $$v);},expression:"model.permissionSets"}})],1)],1)],1)],1),_vm._v(" "),_c('tab',{attrs:{"heading":"User Permissions"}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',[_c('constrain',{attrs:{"sm":""}},[_c('h5',{attrs:{"margin":""}},[_vm._v("User Permissions")]),_vm._v(" "),_c('p',[_vm._v("Add permissions here that will be attributed to a logged in user when signed in to this application. These will be merged with any existing permissions retrieved from a user's managed persona in the '"+_vm._s(_vm.application.title)+"' account")]),_vm._v(" "),_c('fluro-permission-select',{on:{"input":_vm.modelUpdated},model:{value:(_vm.model.userPermissionSets),callback:function ($$v) {_vm.$set(_vm.model, "userPermissionSets", $$v);},expression:"model.userPermissionSets"}})],1)],1)],1)],1),_vm._v(" "),_c('tab',{attrs:{"heading":"Advanced"}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',[_c('constrain',{attrs:{"sm":""}},[_c('h5',{attrs:{"margin":""}},[_vm._v("Advanced")]),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.apipath},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.timezone},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.gaTrackingCode},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.supportEmail},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.favicon},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.headerInject},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.footerInject},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1)],1)],1)],1),_vm._v(" "),_c('tab',{attrs:{"heading":"Redirects"}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',[_c('constrain',{attrs:{"sm":""}},[_c('h5',{attrs:{"margin":""}},[_vm._v("Redirects")]),_vm._v(" "),_c('redirect-manager',{model:{value:(_vm.model.pathForwards),callback:function ($$v) {_vm.$set(_vm.model, "pathForwards", $$v);},expression:"model.pathForwards"}})],1)],1)],1)],1)]:_vm._e()],2)],2)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__$1 = function (inject) {
    if (!inject) return
    inject("data-v-20c49cd6_0", { source: ".border-top[data-v-20c49cd6]{border-top:1px solid rgba(0,0,0,.05)}.border-right[data-v-20c49cd6]{border-right:1px solid rgba(0,0,0,.05)}.border-bottom[data-v-20c49cd6]{border-bottom:1px solid rgba(0,0,0,.05)}.border-left[data-v-20c49cd6]{border-left:1px solid rgba(0,0,0,.05)}.hint[data-v-20c49cd6]{font-size:10px;opacity:.5;color:inherit;display:block}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$1 = "data-v-20c49cd6";
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$1 = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__$1,
    __vue_script__,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    __vue_create_injector__,
    undefined,
    undefined
  );

export default __vue_component__$1;
//# sourceMappingURL=application-3f84ce02.js.map
