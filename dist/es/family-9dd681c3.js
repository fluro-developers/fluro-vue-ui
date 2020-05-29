import { aK as FluroContentForm, aL as FluroContentFormField, aq as FluroStatusSelect, e as FluroAvatar, bh as _, bf as styleInject, bg as __vue_normalize__, aO as FluroAcademicSelect } from './index-e8733ce0.js';
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
import { F as FluroContentEditMixin } from './FluroContentEditMixin-bb60c5f7.js';
import { A as AddressManager } from './AddressManager-e7a7ff3c.js';

//

var script = {
  props: {
    value: {
      type: Object,
      default: {}
    },
    contactDefinitions: {
      type: Array
    }
  },
  components: {
    FluroContentForm,
    FluroContentFormField,
    FluroStatusSelect,
    FluroAvatar
  },

  data() {
    return {
      model: this.value
    };
  },

  created() {
    var self = this;

    if (!self.model.definition) {
      self.model.definition = '';
    }

    if (!self.model.householdRole) {
      self.model.householdRole = '';
    }
  },

  watch: {
    contactStatus: function () {
      this.save();
    }
  },
  methods: {
    editContact() {
      var self = this;
      self.$fluro.global.edit(self.model, true).then(function (res) {
        _.assign(self.model, res);

        console.log('Update');
      });
    },

    viewContact() {
      var self = this;
      self.$fluro.global.view(self.model, true);
    },

    save: _.debounce(function () {
      console.log('TRIGGER UPDATE');
      var self = this;
      var data = {
        'householdRole': self.model.householdRole,
        'definition': self.model.definition,
        'status': self.model.status
      };
      self.$fluro.api.put(`content/contact/${self.model._id}`, data).then(function (res) {
        self.$fluro.notify(`${self.model.title} was successfully updated!`);
      }).catch(function (err) {
        self.$fluro.error(err);
      });
    }, 100)
  },
  computed: {
    contactName() {
      return this.model.title;
    },

    contactAge() {
      return this.model.age;
    },

    contactGender() {
      if (this.model.gender) {
        return this.model.gender;
      }
    },

    contactStatus() {
      return this.model.status;
    },

    fields() {
      var self = this;
      var array = []; ///////////////////////////////////

      addField('householdRole', {
        title: 'Family Role',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'select',
        defaultValues: [''],
        options: [{
          name: 'None / Other',
          value: ''
        }, {
          name: 'Parent',
          value: 'parent'
        }, {
          name: 'Guardian',
          value: 'guardian'
        }, {
          name: 'Child',
          value: 'child'
        }]
      }); ///////////////////////////////////

      addField('definition', {
        title: 'Definition',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'select',
        defaultValues: [''],
        options: self.contactDefinitions
      });

      function addField(key, details) {
        details.key = key;
        array.push(details);
      }

      return array;
    }

  }
};

var css_248z = ".card{width:100%;height:100%}.avatar-icon{width:80%!important;display:block}.avatar-flex,.status-flex{display:-webkit-box;display:-ms-flexbox;display:flex;width:100%;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.text-centered{text-align:center}.less-padding{padding:4px 8px!important}.archived{opacity:.5}.draft{border:dashed orange 1px}";
styleInject(css_248z);

/* script */
const __vue_script__ = script;
/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.model)?_c('v-container',{staticClass:"card",class:_vm.model.status,attrs:{"fluid":"","grid-lines-sm":""}},[_c('fluro-content-form',{attrs:{"fields":_vm.fields},on:{"input":_vm.save},scopedSlots:_vm._u([{key:"form",fn:function(ref){
var formFields = ref.formFields;
var fieldHash = ref.fieldHash;
var model = ref.model;
var update = ref.update;
var options = ref.options;
return [_c('v-layout',{attrs:{"column":""}},[_c('v-flex',{staticClass:"avatar-flex"},[_c('fluro-avatar',{staticClass:"avatar-icon",attrs:{"id":model._id,"type":"contact"}})],1),_vm._v(" "),_c('v-flex',{staticClass:"text-centered less-padding"},[_c('h4',[_vm._v(_vm._s(_vm.contactName))])]),_vm._v(" "),_c('v-flex',{staticClass:"less-padding status-flex"},[_c('fluro-status-select',{model:{value:(model.status),callback:function ($$v) {_vm.$set(model, "status", $$v);},expression:"model.status"}})],1),_vm._v(" "),_c('v-flex',{staticClass:"text-centered less-padding"},[_c('p',{staticClass:"muted",staticStyle:{"margin-bottom":"0px"}},[_vm._v(_vm._s(_vm.contactGender)+" "+_vm._s(_vm.contactAge))])]),_vm._v(" "),_c('v-flex',{staticClass:"less-padding"},[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.householdRole},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1),_vm._v(" "),(_vm.contactDefinitions && _vm.contactDefinitions.length)?_c('v-flex',{staticClass:"less-padding"},[_c('fluro-content-form-field',{attrs:{"form-fields":formFields,"options":options,"field":fieldHash.definition},on:{"input":update},model:{value:(model),callback:function ($$v) {model=$$v;},expression:"model"}})],1):_vm._e()],1),_vm._v(" "),_c('v-layout',{attrs:{"align-center":""}},[_c('v-flex',[_c('v-btn',{attrs:{"block":""},on:{"click":function($event){return _vm.editContact()}}},[_vm._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tEdit\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t")])],1),_vm._v(" "),_c('v-spacer'),_vm._v(" "),_c('v-flex',[_c('v-btn',{attrs:{"block":""},on:{"click":function($event){return _vm.viewContact()}}},[_vm._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tView\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t")])],1)],1)]}}],null,false,3762073082),model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1):_vm._e()};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
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

//

var script$1 = {
  components: {
    AddressManager,
    FamilyMemberCard: __vue_component__
  },

  created() {
    //If we are creating a new family
    if (!this.model._id) {
      //Set the postal address to be the same by default
      this.$set(this.model, 'samePostal', true);
    }
  },

  mixins: [FluroContentEditMixin],
  computed: {
    members() {
      return _.orderBy(this.model.items, function (contact) {
        if (contact.householdRole == 'parent') {
          return -1;
        }

        if (contact.age) {
          return 120 - parseInt(contact.age);
        }

        return 0;
      });
    },

    fieldsOutput() {
      var self = this;
      var array = []; ///////////////////////////////////

      addField('title', {
        title: 'Title/Family Name',
        placeholder: 'Family Name',
        minimum: 1,
        maximum: 1,
        type: 'string',
        params: {
          autofocus: !self.model._id
        }
      }); ///////////////////////////////////

      addField('phoneNumbers', {
        title: 'Household Phone Number',
        minimum: 0,
        maximum: 0,
        type: 'string'
      });
      addField('emails', {
        title: 'Household Email Address',
        minimum: 0,
        maximum: 0,
        type: 'email'
      }); /////////////////////////////////////

      var contactFields = []; /////////////////////////////////////

      var row0 = {
        title: 'Definition',
        key: 'definitions',
        type: 'group',
        sameLine: true
      };
      row0.fields = [{
        title: 'Household Role',
        key: 'householdRole',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'select',
        options: [{
          title: 'None',
          value: ''
        }, {
          title: 'Parent',
          value: 'parent'
        }, {
          title: 'Child',
          value: 'child'
        }]
      }, {
        title: 'Definition',
        key: 'definition',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'select',
        options: self.contactDefinitionOptions,
        expressions: {
          hide() {
            var number = !self.contactDefinitions || !self.contactDefinitions.length; // console.log('NUMBER?', number, self.contactDefinitions)

            return number;
          }

        }
      }];
      contactFields.push(row0); /////////////////////////////////////

      var row1 = {
        title: 'Names',
        key: 'names',
        type: 'group',
        sameLine: true
      };
      row1.fields = [{
        title: 'First Name',
        key: 'firstName',
        minimum: 1,
        maximum: 1,
        type: 'string'
      }, {
        title: 'Last Name',
        key: 'lastName',
        placeholder: self.model.title,
        minimum: 0,
        maximum: 1,
        type: 'string',
        expressions: {
          defaultValue() {
            return self.model.title;
          }

        }
      }];
      contactFields.push(row1); /////////////////////////////////////

      var row2 = {
        title: 'Bits',
        key: 'bits',
        type: 'group',
        sameLine: true
      };
      row2.fields = [{
        title: 'Gender',
        key: 'gender',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'select',
        options: [{
          title: 'Male',
          value: 'male'
        }, {
          title: 'Female',
          value: 'female'
        }, {
          title: 'Unknown',
          value: ''
        }]
      }, {
        title: 'Date of Birth',
        key: 'dob',
        minimum: 0,
        maximum: 1,
        type: 'date'
      }];
      contactFields.push(row2); /////////////////////////////////////
      /////////////////////////////////////

      var row3 = {
        title: 'Comms',
        key: 'comms',
        type: 'group',
        sameLine: true
      };
      row3.fields = [{
        title: 'Email Address',
        key: 'emails',
        minimum: 0,
        maximum: 0,
        type: 'email'
      }, {
        title: 'Phone Number',
        key: 'phoneNumbers',
        minimum: 0,
        maximum: 0,
        type: 'string'
      }];
      contactFields.push(row3);
      var row4 = {
        title: 'Comms',
        key: 'realmsandstuff',
        type: 'group',
        sameLine: true,
        fields: []
      };
      row4.fields = [{
        title: 'Realms',
        description: 'If different from the family',
        key: 'realms',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        directive: 'realmselect',
        params: {
          restrictType: 'realm'
        },
        expressions: {
          defaultValue() {
            return self.model.realms.slice();
          }

        }
      }, {
        title: 'Tags',
        key: 'tags',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        directive: 'content-select-button',
        params: {
          restrictType: 'tag',
          allDefinitions: true
        }
      }];
      contactFields.push({
        title: 'School / Academic Calendar',
        key: '_academic',
        minimum: 0,
        maximum: 1,
        type: 'string',
        customComponent: FluroAcademicSelect,
        expressions: {
          hide: `model.householdRole == 'parent'`
        }
      });
      contactFields.push(row4); // <fluro-academic-select :form-fields="formFields" :outline="showOutline" :options="formOptions" @calendar="updateAcademicCalendar" @grade="updateAcademicGrade" v-model="model" />
      //                             </fluro-academic-select>

      var minimumFamilyMembers = self.model._context == 'contact' ? 0 : 1;
      addField('items', {
        title: self.model._context == 'contact' ? 'Additional Family Member' : 'Family Member',
        minimum: minimumFamilyMembers,
        maximum: 0,
        type: 'group',
        asObject: true,
        askCount: minimumFamilyMembers,
        fields: contactFields,
        expressions: {
          hide() {
            return self.model._context == 'contact';
          }

        }
      });

      function addField(key, details) {
        details.key = key;
        array.push(details);
      }

      return array;
    },

    membersLength() {
      var self = this;

      if (_.get(self.model, 'items')) {
        return self.model.items.length;
      } else {
        return 0;
      }
    },

    contactDefinitionOptions() {
      var self = this;
      var options = self.contactDefinitions.slice();

      if (options.length) {
        options.unshift({
          name: 'None',
          value: ''
        });
      }

      return options;
    }

  },
  methods: {
    toggleSamePostal() {
      var self = this;
      console.log('Toggle Same Postal!', self.model.samePostal);
      self.$set(self.model, 'samePostal', !self.model.samePostal); // if (!self.model.samePostal) {
      // return self.$set(self.model, 'samePostal', true);
      // } else {
      // return self.$set(self.model, 'samePostal', false);
      // }
    },

    create() {
      var self = this; //self.$fluro.global.create

      var template = {
        family: self.model,
        lastName: self.model.title
      };
      console.log('Create new contact', template);
      self.$fluro.global.create('contact', {
        template
      }, true).then(function (res) {
        self.model.items.push(res);
      });
    }

  },

  data() {
    return {};
  },

  asyncComputed: {
    contactDefinitions: {
      default: [],

      get() {
        var self = this;
        return new Promise(function (resolve, reject) {
          return self.$fluro.types.subTypes('contact').catch(reject).then(function (res) {
            return resolve(res);
          });
        }).catch(function (err) {
          console.log(err);
          self.$fluro.notify(err);
          return reject(err);
        });
      }

    }
  }
};

var css_248z$1 = ".border-top{border-top:1px solid rgba(0,0,0,.05)}.border-right{border-right:1px solid rgba(0,0,0,.05)}.border-bottom{border-bottom:1px solid rgba(0,0,0,.05)}.border-left{border-left:1px solid rgba(0,0,0,.05)}.no-border-no-background .toggle-item{border:0!important;background:0 0!important;font-size:14px;padding:0}.cards{width:200px!important;background-color:#fff;margin:10px}.border{border-color:rgba(0,0,0,.05);border-style:solid;border-width:1px}.ghost-card{padding:16px;width:200px!important;margin:10px;border:1px dashed #ccc;color:inherit;background-color:transparent;-webkit-transition:background-color .3s;-o-transition:background-color .3s;transition:background-color .3s}.ghost-card:hover{background-color:#fff}.add-circle{border:1px dashed #ccc;border-radius:50%;height:132.8px;width:132.8px;padding:8px;margin:auto;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.filler-ghost{height:100%;display:block}.add-icon{width:100%;height:100%}.add-contact-text{text-align:center;padding-top:16px}";
styleInject(css_248z$1);

/* script */
const __vue_script__$1 = script$1;
/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flex-column',[(_vm.loading)?[_c('fluro-page-preloader',{attrs:{"contain":""}})]:[_c('tabset',{attrs:{"justified":true,"vertical":true}},[_c('tab',{attrs:{"heading":"Details"}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',{attrs:{"fluid":"","grid-list-lg":""}},[_c('constrain',{attrs:{"sm":""}},[_c('v-layout',{attrs:{"row":"","wrap":""}},[_c('v-flex',{attrs:{"xs12":"","sm12":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.title},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1),_vm._v(" "),(!_vm.model._id)?_c('v-flex',{attrs:{"xs12":"","sm12":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.items},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1):_vm._e(),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm6":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.emails},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm6":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.phoneNumbers},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm12":""}},[_c('fluro-panel',[_c('fluro-panel-title',[_vm._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tHome Address\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t")]),_vm._v(" "),_c('fluro-panel-body',[_c('address-manager',{model:{value:(_vm.model.address),callback:function ($$v) {_vm.$set(_vm.model, "address", $$v);},expression:"model.address"}})],1)],1)],1),_vm._v(" "),_c('v-flex',[_c('fluro-panel',[_c('fluro-panel-title',[_c('div',{staticClass:"no-border-no-background"},[_c('fluro-toggle-item',{attrs:{"inactive":_vm.model.samePostal},nativeOn:{"click":function($event){return _vm.toggleSamePostal()}}},[_vm._v("Different Postal Address")])],1)]),_vm._v(" "),(!_vm.model.samePostal)?_c('fluro-panel-body',[_c('address-manager',{model:{value:(_vm.model.postalAddress),callback:function ($$v) {_vm.$set(_vm.model, "postalAddress", $$v);},expression:"model.postalAddress"}})],1):_vm._e()],1)],1)],1)],1)],1)],1)],1),_vm._v(" "),(_vm.model._id)?_c('tab',{attrs:{"heading":(_vm.membersLength + " Members")}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',{attrs:{"fluid":"","grid-list-lg":""}},[_c('v-layout',{staticStyle:{"overflow-x":"scroll"},attrs:{"row":"","wrap":"","justify-space-around":"","fill-height":""}},[_vm._l((_vm.members),function(contact,index){return _c('div',{staticClass:"cards border"},[_c('family-member-card',{attrs:{"contactDefinitions":_vm.contactDefinitionOptions},model:{value:(_vm.members[index]),callback:function ($$v) {_vm.$set(_vm.members, index, $$v);},expression:"members[index]"}})],1)}),_vm._v(" "),_c('div',{staticClass:"ghost-card",on:{"click":_vm.create}},[_c('div',{staticClass:"add-contact ghost"},[_c('div',{staticClass:"add-circle"},[_c('fluro-icon',{staticClass:"add-icon",attrs:{"icon":"plus"}})],1),_vm._v(" "),_c('h5',{staticClass:"add-contact-text"},[_vm._v("Add Contact")])])])],2)],1)],1)],1):_vm._e(),_vm._v(" "),(_vm.definition && _vm.definition.fields && _vm.definition.fields.length)?_c('tab',{attrs:{"heading":((_vm.definition.title) + " Information")}},[_c('fluro-content-form',{attrs:{"options":_vm.options,"fields":_vm.definition.fields},model:{value:(_vm.model.data),callback:function ($$v) {_vm.$set(_vm.model, "data", $$v);},expression:"model.data"}})],1):_vm._e()],1)]],2)};
var __vue_staticRenderFns__$1 = [];

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject */
  
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
    undefined,
    undefined,
    undefined
  );

export default __vue_component__$1;
//# sourceMappingURL=family-9dd681c3.js.map
