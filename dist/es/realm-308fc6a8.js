import { bc as __vue_normalize__, bd as __vue_create_injector__ } from './index-1b943565.js';
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
import { F as FluroContentEditMixin } from './FluroContentEditMixin-71e8496c.js';

//
/////////////////////////////////

var script = {
  components: {},

  created() {},

  mixins: [FluroContentEditMixin],
  computed: {
    fieldsOutput() {
      var array = []; ///////////////////////////////////

      addField('title', {
        title: 'Title',
        minimum: 1,
        maximum: 1,
        type: 'string'
      });
      addField('color', {
        title: 'Text Color',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'color'
      });
      addField('bgColor', {
        title: 'Background Color',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'color'
      }); ///////////////////////////////////

      function addField(key, details) {
        details.key = key;
        array.push(details);
      }

      return array;
    },

    exampleColors() {
      var res = [];

      function addColor(title, color, bgcolor) {
        res.push({
          title: title,
          color: color,
          bgColor: bgcolor
        });
      }

      addColor('Black', '#eee', '#555');
      addColor('Red', '#8f0f0f', '#ffb5ba');
      addColor('Pink', '#b3125f', '#ffa3c4');
      addColor('Purple', '#7f12b3', '#e7b3ff');
      addColor('Deep Purple', '#7f12b3', '#e2a3ff');
      addColor('Deep Blue', '#433aab', '#a5a3ff');
      addColor('Baby Blue', '#174b99', '#a6caff');
      addColor('Light Blue', '#1366a3', '#9ee2ff');
      addColor('Cyan', '#008b94', '#97f0ed');
      addColor('Medical Green', '#007357', '#97f0cb');
      addColor('Light Green', '#00703a', '#97f0a5');
      addColor('Lime Green', '#00783e', '#a8ed87');
      addColor('Banana Green', '#306b13', '#dbe37f');
      addColor('Desert Camo', '#6b5813', '#e3cd7f');
      addColor('Amber', '#966639', '#ffe175');
      addColor('Fluro Yellow', '#695e00', '#faff00');
      return res;
    }

  },
  methods: {
    setColor(obj) {
      var self = this;
      self.model.color = obj.color;
      self.model.bgColor = obj.bgColor;
    }

  },

  data() {
    return {};
  }

};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flex-column',[(_vm.loading)?[_c('fluro-page-preloader',{attrs:{"contain":""}})]:[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',{attrs:{"fluid":"","grid-list-xl":""}},[_c('constrain',{attrs:{"sm":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.title},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('v-layout',{attrs:{"wrap":""}},[_c('v-flex',{attrs:{"xs12":"","sm12":""}},[_c('h4',[_vm._v("Realm Colors")]),_vm._v(" "),_c('p',{staticClass:"muted mb-0"},[_vm._v("Select colors for the realm below")]),_vm._v(" "),_c('v-chip',{staticClass:"chip",attrs:{"label":"","small":"","disabled":"","color":_vm.model.bgColor,"text-color":_vm.model.color}},[_vm._v(_vm._s(_vm.model.title || 'Realm Title'))])],1),_vm._v(" "),_c('v-flex',{attrs:{"xs6":"","sm3":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.color},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs6":"","sm3":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.bgColor},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm6":""}},[_c('h4',[_vm._v("Example Colors")]),_vm._v(" "),_vm._l((_vm.exampleColors),function(eg){return _c('v-chip',{staticClass:"chip",attrs:{"label":"","small":"","color":eg.bgColor,"text-color":eg.color},on:{"click":function($event){return _vm.setColor(eg)}}},[_vm._v(_vm._s(eg.title))])})],2)],1),_vm._v(" "),(_vm.definition && _vm.definition.fields && _vm.definition.fields.length)?[_c('h3',{attrs:{"margin":""}},[_vm._v(_vm._s(_vm.definition.title)+" Information")]),_vm._v(" "),_c('fluro-content-form',{attrs:{"options":_vm.options,"fields":_vm.definition.fields},model:{value:(_vm.model.data),callback:function ($$v) {_vm.$set(_vm.model, "data", $$v);},expression:"model.data"}})]:_vm._e()],2)],1)],1)]],2)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-1eee482f_0", { source: ".border-top{border-top:1px solid rgba(0,0,0,.05)}.border-right{border-right:1px solid rgba(0,0,0,.05)}.border-bottom{border-bottom:1px solid rgba(0,0,0,.05)}.border-left{border-left:1px solid rgba(0,0,0,.05)}.chip{font-weight:500}", map: undefined, media: undefined });

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
//# sourceMappingURL=realm-308fc6a8.js.map
