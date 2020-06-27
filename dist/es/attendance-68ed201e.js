import { aM as FluroContentForm, r as FluroConfirmButton, bl as __vue_normalize__, bm as __vue_create_injector__ } from './index-6f13ec7e.js';
import 'vue';
import draggable from 'vuedraggable';
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
import { F as FluroContentEditMixin } from './FluroContentEditMixin-f61117ea.js';

//
var script = {
  props: {
    value: {
      type: Array,
      default: function () {
        return [];
      }
    }
  },
  components: {
    FluroContentForm,
    FluroConfirmButton,
    draggable
  },

  data() {
    return {
      model: this.value,
      proposed: {},
      dragOptions: {},
      drag: false
    };
  },

  methods: {
    add() {
      var clone = JSON.parse(JSON.stringify(this.proposed));

      if (!clone.name || !clone.name.length || !clone.count || clone.count < 0) {
        return;
      }

      delete clone.row;
      this.model.push(clone);
      this.proposed = {};
    },

    remove(index) {
      this.model.splice(index, 1);
    }

  },
  computed: {
    fields() {
      var array = []; ///////////////////////////////////

      addField('row', {
        type: 'group',
        sameLine: true,
        fields: [{
          title: 'Area Name',
          minimum: 1,
          maximum: 1,
          type: 'string',
          key: 'name'
        }, {
          title: 'Count',
          minimum: 1,
          maximum: 1,
          type: 'number',
          key: 'count'
        }]
      }); ///////////////////////////////////

      function addField(key, details) {
        details.key = key;
        array.push(details);
      }

      return array;
    },

    disableAdd() {
      var self = this;
      return !self.proposed.name || !self.proposed.name.length || !self.proposed.count || self.proposed.count < 0;
    }

  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('list-group',_vm._l((_vm.model),function(area,index){return _c('list-group-item',{key:JSON.stringify(area),staticClass:"pa-3"},[_c('v-layout',{attrs:{"align-center":""}},[_c('v-flex',[_c('fluro-content-form',{ref:"form",refInFor:true,attrs:{"fields":_vm.fields},model:{value:(_vm.model[index]),callback:function ($$v) {_vm.$set(_vm.model, index, $$v);},expression:"model[index]"}})],1),_vm._v(" "),_c('v-flex',{staticClass:"ml-3",attrs:{"shrink":""}},[_c('fluro-confirm-button',{attrs:{"content":"Remove"},on:{"click":function($event){return _vm.remove(index)}},scopedSlots:_vm._u([{key:"default",fn:function(ref){
var confirming = ref.confirming;
return [_c('v-btn',{staticStyle:{"transition":"all 0.1s","width":"100%"},attrs:{"flat":"","block":"","color":confirming ? 'red' : ''}},[_vm._v(_vm._s(confirming ? "Confirm?" : "Remove"))])]}}],null,true)})],1)],1)],1)}),1),_vm._v(" "),_c('fluro-panel',[_c('fluro-panel-title',[_vm._v("Add an Area Count")]),_vm._v(" "),_c('fluro-panel-body',[_c('form',{on:{"submit":function($event){$event.preventDefault();$event.stopPropagation();return _vm.add()}}},[_c('v-layout',[_c('v-flex',[_c('fluro-content-form',{ref:"form",attrs:{"fields":_vm.fields},model:{value:(_vm.proposed),callback:function ($$v) {_vm.proposed=$$v;},expression:"proposed"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"shrink":""}},[_c('v-btn',{attrs:{"type":"submit","color":"primary","disabled":_vm.disableAdd},on:{"click":function($event){return _vm.add()}}},[_vm._v("Add")])],1)],1)],1)])],1)],1)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-2fd919d9_0", { source: ".border-top{border-top:1px solid rgba(0,0,0,.05)}.border-right{border-right:1px solid rgba(0,0,0,.05)}.border-bottom{border-bottom:1px solid rgba(0,0,0,.05)}.border-left{border-left:1px solid rgba(0,0,0,.05)}.ghost-dragging-class{opacity:.5;background:#c8ebfb}", map: undefined, media: undefined });

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

//

var script$1 = {
  components: {
    AreaCountManager: __vue_component__
  },

  created() {},

  mixins: [FluroContentEditMixin],
  computed: {
    fieldsOutput() {
      var array = []; ///////////////////////////////////

      addField('title', {
        title: 'Title',
        minimum: 0,
        maximum: 1,
        type: 'string',
        placeholder: 'Optional Title'
      });
      addField('event', {
        title: 'Event',
        minimum: 1,
        maximum: 1,
        type: 'reference',
        params: {
          restrictType: 'event'
        }
      });
      addField('count', {
        title: 'Event Total',
        description: 'Number of people counted in total for this event',
        minimum: 0,
        maximum: 1,
        type: 'number'
      });
      addField('body', {
        title: 'Information, Notes and Comments',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'wysiwyg'
      }); ///////////////////////////////////

      function addField(key, details) {
        details.key = key;
        array.push(details);
      }

      return array;
    }

  },
  methods: {
    toggleAutoGraduate() {
      var self = this;

      if (!self.model.autoGraduate) {
        self.model.autoGraduate = true;
      } else {
        self.model.autoGraduate = false;
      }
    }

  },

  data() {
    return {};
  }

};

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flex-column',[(_vm.loading)?[_c('fluro-page-preloader',{attrs:{"contain":""}})]:[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',{attrs:{"fluid":""}},[_c('constrain',{attrs:{"sm":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.title},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.event},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.count},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('br',{staticClass:"mt-3 mb-5"}),_vm._v(" "),_c('h4',{staticClass:"ml-3"},[_vm._v("Area Counts")]),_vm._v(" "),_c('p',{staticClass:"ml-3"},[_vm._v("Add counts for individual rooms/areas")]),_vm._v(" "),_c('area-count-manager',{model:{value:(_vm.model.areas),callback:function ($$v) {_vm.$set(_vm.model, "areas", $$v);},expression:"model.areas"}}),_vm._v(" "),_c('br',{staticClass:"my-4"}),_vm._v(" "),_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.body},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),(_vm.definition && _vm.definition.fields && _vm.definition.fields.length)?[_c('br',{staticClass:"mt-3 mb-4"}),_vm._v(" "),_c('h2',[_vm._v(_vm._s(((_vm.definition.title) + " Information")))]),_vm._v(" "),_c('fluro-content-form',{attrs:{"options":_vm.options,"fields":_vm.definition.fields},model:{value:(_vm.model.data),callback:function ($$v) {_vm.$set(_vm.model, "data", $$v);},expression:"model.data"}})]:_vm._e()],2)],1)],1)]],2)};
var __vue_staticRenderFns__$1 = [];

  /* style */
  const __vue_inject_styles__$1 = function (inject) {
    if (!inject) return
    inject("data-v-63f0b815_0", { source: ".border-top{border-top:1px solid rgba(0,0,0,.05)}.border-right{border-right:1px solid rgba(0,0,0,.05)}.border-bottom{border-bottom:1px solid rgba(0,0,0,.05)}.border-left{border-left:1px solid rgba(0,0,0,.05)}.no-border-no-background .toggle-item{border:none!important;background:0 0!important;font-size:14px;padding:0}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$1 = undefined;
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
//# sourceMappingURL=attendance-68ed201e.js.map
