'use strict';

var index = require('./index-e9d34d7f.js');
require('vuedraggable');
require('vue-color');
require('tippy.js');
require('vue2-ace-editor');
require('js-beautify');
require('tiptap');
require('tiptap-commands');
require('tiptap-extensions');
require('signature_pad');
require('fluro');
require('vuex-map-fields');
require('async');
var FluroContentEditMixin = require('./FluroContentEditMixin-a3dadd0a.js');

//

var script = {
  mixins: [FluroContentEditMixin.FluroContentEditMixin],
  components: {},
  methods: {
    modelUpdated() {
      this.update(this.model);
    }

  },

  created() {
  },

  asyncComputed: {},
  computed: {
    fieldsOutput() {
      var array = []; ///////////////////////////////////
      //We need to add more smarts here so we can
      //only attach to the correct things

      addField('parent', {
        title: 'Linked To',
        minimum: 1,
        maximum: 1,
        type: 'reference' // params: {
        // restrictType: 'event',
        // },

      }); ///////////////////////////////////

      function addField(key, details) {
        details.key = key;
        array.push(details);
      }

      return array;
    },

    showOutline() {
      return false; //true; //false;//true;//false;//true;
    } // fieldsOutput() {
    //     var self = this;
    //     var array = [];
    //     ///////////////////////////////////
    //     addField('event', {
    //         title: 'Event',
    //         minimum: 1,
    //         maximum: 1,
    //         type: 'reference',
    //         params: {
    //             restrictType: 'event',
    //         },
    //     })
    //     addField('contact', {
    //         title: 'Contact',
    //         minimum: 1,
    //         maximum: 1,
    //         type: 'reference',
    //         description: 'The person who checked was checked in',
    //         params: {
    //             restrictType: 'contact',
    //         },
    //     })
    //     addField('checkedInBy', {
    //         title: 'Checked In By',
    //         minimum: 1,
    //         maximum: 1,
    //         type: 'reference',
    //         description: 'The person who checked this contact in',
    //         params: {
    //             restrictType: 'contact',
    //         },
    //     })
    //     addField('pinNumber', {
    //         title: 'Pin Number',
    //         minimum: 0,
    //         maximum: 1,
    //         type: 'password',
    //         description: 'The Pin Number used when checking in (If any)',
    //     })
    //     // addField('firstLine', {
    //     //     title: 'Description',
    //     //     minimum: 0,
    //     //     maximum: 1,
    //     //     type: 'string',
    //     //     placeholder: 'Eg. A list of my favorite people',
    //     // })
    //     // // console.log('TYPE OPTIONS', self.typeOptions);
    //     // addField('filterType', {
    //     //     title: 'Type',
    //     //     minimum: 0,
    //     //     maximum: 1,
    //     //     type: 'string',
    //     //     directive: 'select',
    //     //     description: 'The type of item you want to return from this query',
    //     //     options: self.typeOptions,
    //     // })
    //     ///////////////////////////////////
    //     function addField(key, details) {
    //         details.key = key;
    //         array.push(details)
    //     }
    //     return array;
    // },


  },

  data() {
    return {};
  }

};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flex-column',[(_vm.loading)?[_c('fluro-page-preloader',{attrs:{"contain":""}})]:_c('tabset',{attrs:{"justified":true,"vertical":true}},[(_vm.definition && _vm.definition.fields && _vm.definition.fields.length)?_c('tab',{attrs:{"heading":((_vm.definition.title) + " Information")}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',[_c('constrain',{attrs:{"sm":""}},[(!_vm.model._id)?[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.parent},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})]:[_c('v-input',{staticClass:"no-flex",attrs:{"label":"Linked to"}},[_c('list-group',[_c('list-group-item',{attrs:{"item":_vm.model.parent},nativeOn:{"click":function($event){return _vm.$fluro.global.edit(_vm.model.parent, true)}},scopedSlots:_vm._u([{key:"right",fn:function(){return [_c('v-btn',{staticClass:"ma-0",attrs:{"icon":"","small":"","flat":""},on:{"click":function($event){$event.stopPropagation();$event.preventDefault();return _vm.$actions.open([_vm.model.parent])}}},[_c('fluro-icon',{attrs:{"icon":"ellipsis-h"}})],1)]},proxy:true}],null,false,1779438708)})],1)],1)],_vm._v(" "),_c('fluro-content-form',{attrs:{"options":_vm.options,"fields":_vm.definition.fields},model:{value:(_vm.model.data),callback:function ($$v) {_vm.$set(_vm.model, "data", $$v);},expression:"model.data"}})],2)],1)],1)],1):_vm._e()],1)],2)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-8dd26372_0", { source: ".border-top[data-v-8dd26372]{border-top:1px solid rgba(0,0,0,.05)}.border-right[data-v-8dd26372]{border-right:1px solid rgba(0,0,0,.05)}.border-bottom[data-v-8dd26372]{border-bottom:1px solid rgba(0,0,0,.05)}.border-left[data-v-8dd26372]{border-left:1px solid rgba(0,0,0,.05)}.hint[data-v-8dd26372]{font-size:10px;opacity:.5;color:inherit;display:block}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-8dd26372";
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = index.__vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    index.__vue_create_injector__,
    undefined,
    undefined
  );

exports.default = __vue_component__;
//# sourceMappingURL=post-ac6b0648.js.map
