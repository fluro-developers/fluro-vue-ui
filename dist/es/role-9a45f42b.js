import { a2 as FluroToggleItem, S as SearchInput, bb as __vue_normalize__, bc as __vue_create_injector__ } from './index-f6c3de36.js';
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
import { F as FluroContentEditMixin } from './FluroContentEditMixin-4e710d9b.js';

//

var script = {
  components: {
    FluroToggleItem,
    SearchInput // FluroEditor,

  },

  created() {},

  data() {
    return {
      search: '',
      loadingPermissions: true
    };
  },

  mixins: [FluroContentEditMixin],
  methods: {
    of(type) {
      var total = type.permissions.length;
      var activated = this.enabled(type);
      return activated.length ? `${activated.length} / ${total}` : '';
    },

    enabled(type) {
      var self = this;

      var values = _.map(type.permissions, 'value');

      return _.intersection(self.model.permissions, values);
    },

    togglePermission(permission) {
      var self = this;

      if (!self.model.permissions) {
        self.$set(self.model, 'permissions', []);
      }

      if (self.permissionSelected(permission)) {
        var index = self.model.permissions.indexOf(permission.value);

        if (index != -1) {
          self.model.permissions.splice(index, 1);
        }
      } else {
        self.model.permissions.push(permission.value);
      }
    },

    permissionSelected(permission) {
      var self = this;
      return _.includes(self.model.permissions, permission.value);
    }

  },
  asyncComputed: {
    tree: {
      default: [],

      get() {
        var self = this;
        self.loadingPermissions = true;
        return new Promise(function (resolve, reject) {
          return self.$fluro.access.retrievePermissions().then(function (permissionSets) {
            //////////////////////////////////////
            //Map search strings for each permission set
            _.each(permissionSets, function (entry) {
              // ${entry.definitionName} ${entry.parentType || ''}
              entry.searchString = `${entry.title} ${entry.plural}`.toLowerCase();
              entry.permissionsString = _.map(entry.permissions, function (permission) {
                permission.searchString = `${permission.title}`.toLowerCase();
                return permission.searchString;
              }).join(' ');
            }); //////////////////////////////////////


            resolve(permissionSets);
            console.log('GOT EM!', permissionSets);
            self.loadingPermissions = false;
          }).catch(function (err) {
            reject(err);
            self.loadingPermissions = false;
          });
        });
      }

    }
  },
  computed: {
    informationPanelTitle() {
      return this.definition ? `${this.definition.title} Information` : 'Role Information';
    },

    filtered() {
      var self = this;

      if (!self.search || !self.search.length) {
        console.log('No search words');
        return self.tree;
      } ///////////////////////////////////////////////


      var keywords = self.search.toLowerCase();
      console.log('Filter by', keywords);
      return _.chain(self.tree).map(function (entry) {
        if (entry.searchString.includes(keywords)) {
          return entry;
        }

        if (entry.permissionsString.includes(keywords)) {
          var copy = JSON.parse(JSON.stringify(entry));
          copy.permissions = _.filter(copy.permissions, function (permissionSet) {
            return permissionSet.searchString.includes(keywords);
          });

          if (copy.permissions.length) {
            return copy;
          }
        }
      }).compact().value();
    },

    filteredBasic() {
      return _.filter(this.filtered, function (type) {
        return !type.parentType;
      });
    },

    filteredDefined() {
      return _.filter(this.filtered, function (type) {
        return type.parentType;
      });
    },

    loadingAnything() {
      return this.loading || this.loadingPermissions;
    },

    fieldsOutput() {
      var array = []; ///////////////////////////////////

      addField('title', {
        title: 'Title',
        minimum: 1,
        maximum: 1,
        type: 'string'
      }); ///////////////////////////////////

      addField('firstLine', {
        title: 'Description',
        description: 'Enter a one line description summarizing what this role is for and the permissions it grants',
        minimum: 0,
        maximum: 1,
        type: 'string'
      }); ///////////////////////////////////

      function addField(key, details) {
        details.key = key;
        array.push(details);
      }

      return array;
    }

  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flex-column',[(_vm.loadingAnything)?[_c('fluro-page-preloader',{attrs:{"contain":""}})]:[_c('tabset',{attrs:{"justified":true}},[_c('tab',{attrs:{"heading":"Basic Permissions"}},[_c('tabset',{attrs:{"justified":true,"vertical":true,"persist":true},scopedSlots:_vm._u([{key:"menuprefix",fn:function(){return [_c('div',{staticClass:"search-box"},[_c('search-input',{attrs:{"placeholder":"Search permissions"},model:{value:(_vm.search),callback:function ($$v) {_vm.search=$$v;},expression:"search"}})],1)]},proxy:true}])},[_vm._v(" "),_vm._l((_vm.filteredBasic),function(type){return _c('tab',{key:type.title,attrs:{"heading":((type.title) + " " + (_vm.of(type))),"muted":!_vm.enabled(type).length}},[_c('v-container',[_c('h4',{attrs:{"margin":""}},[_vm._v(_vm._s(type.title))]),_vm._v(" "),_c('list-group',_vm._l((type.permissions),function(permission){return _c('fluro-toggle-item',{key:permission.title,attrs:{"inactive":!_vm.permissionSelected(permission)},nativeOn:{"click":function($event){return _vm.togglePermission(permission)}}},[_c('strong',[_vm._v(_vm._s(permission.title))]),_vm._v(" "),_c('div',{staticClass:"sm muted"},[_vm._v(_vm._s(permission.description))])])}),1)],1)],1)})],2)],1),_vm._v(" "),_c('tab',{attrs:{"heading":"Defined Permissions"}},[_c('tabset',{attrs:{"justified":true,"vertical":true,"persist":true},scopedSlots:_vm._u([{key:"menuprefix",fn:function(){return [_c('div',{staticClass:"search-box"},[_c('search-input',{attrs:{"placeholder":"Search permissions"},model:{value:(_vm.search),callback:function ($$v) {_vm.search=$$v;},expression:"search"}})],1)]},proxy:true}])},[_vm._v(" "),_vm._l((_vm.filteredDefined),function(type){return _c('tab',{attrs:{"heading":((type.title) + " " + (_vm.of(type))),"muted":!_vm.enabled(type).length}},[_c('v-container',[_c('h4',{attrs:{"margin":""}},[_vm._v(_vm._s(type.title))]),_vm._v(" "),_c('list-group',_vm._l((type.permissions),function(permission){return _c('fluro-toggle-item',{attrs:{"inactive":!_vm.permissionSelected(permission)},nativeOn:{"click":function($event){return _vm.togglePermission(permission)}}},[_c('strong',[_vm._v(_vm._s(permission.title))]),_vm._v(" "),_c('div',{staticClass:"sm muted"},[_vm._v(_vm._s(permission.description))])])}),1)],1)],1)})],2)],1),_vm._v(" "),_c('tab',{attrs:{"heading":_vm.informationPanelTitle}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',{attrs:{"fluid":""}},[_c('constrain',{attrs:{"sm":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.title},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.firstLine},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),(_vm.definition && _vm.definition.fields && _vm.definition.fields.length)?[_c('h4',{attrs:{"margin":""}},[_vm._v(_vm._s(_vm.definition.title)+" Information")]),_vm._v(" "),_c('fluro-content-form',{attrs:{"options":_vm.options,"fields":_vm.definition.fields},model:{value:(_vm.model.data),callback:function ($$v) {_vm.$set(_vm.model, "data", $$v);},expression:"model.data"}})]:_vm._e()],2)],1)],1)],1)],1)]],2)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-5f10742e_0", { source: ".border-top[data-v-5f10742e]{border-top:1px solid rgba(0,0,0,.05)}.border-right[data-v-5f10742e]{border-right:1px solid rgba(0,0,0,.05)}.border-bottom[data-v-5f10742e]{border-bottom:1px solid rgba(0,0,0,.05)}.border-left[data-v-5f10742e]{border-left:1px solid rgba(0,0,0,.05)}.search-box[data-v-5f10742e]{padding:10px}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-5f10742e";
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
//# sourceMappingURL=role-9a45f42b.js.map
