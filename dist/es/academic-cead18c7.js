import { aE as FluroCodeEditor, bd as __vue_normalize__, be as __vue_create_injector__ } from './index-dd8de878.js';
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
import { F as FluroContentEditMixin } from './FluroContentEditMixin-a9c44102.js';
import { G as GradeManager } from './GradeManager-5981e298.js';

//

var script = {
  components: {
    FluroEditor: FluroCodeEditor,
    GradeManager
  },

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
      var now = new Date();
      addField('graduationDate', {
        title: 'Graduation Date',
        minimum: 0,
        maximum: 1,
        type: 'date',
        directive: 'datetimepicker',
        defaultValues: [now]
      });
      addField('graduateTo', {
        title: 'Graduate To',
        description: 'Which academic calendar does a contact graduate to if they reach the end of the grades in this calendar',
        minimum: 0,
        maximum: 1,
        type: 'reference',
        params: {
          restrictType: 'academic'
        }
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
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flex-column',[(_vm.loading)?[_c('fluro-page-preloader',{attrs:{"contain":""}})]:[_c('tabset',{attrs:{"justified":true,"vertical":true}},[_c('tab',{attrs:{"heading":"Details"}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',{attrs:{"fluid":""}},[_c('constrain',{attrs:{"sm":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.title},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_vm._v(" "),_c('grade-manager',{model:{value:(_vm.model.grades),callback:function ($$v) {_vm.$set(_vm.model, "grades", $$v);},expression:"model.grades"}}),_vm._v(" "),_c('fluro-panel',[_c('fluro-panel-title',[_c('div',{staticClass:"no-border-no-background",on:{"click":function($event){return _vm.toggleAutoGraduate()}}},[_c('fluro-toggle-item',{attrs:{"inactive":!_vm.model.autoGraduate}},[_vm._v("Auto-Graduate Students")])],1)]),_vm._v(" "),(_vm.model.autoGraduate)?_c('fluro-panel-body',[_c('v-layout',{attrs:{"column":""}},[_c('v-flex',[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.graduationDate},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.graduateTo},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1)],1)],1):_vm._e()],1)],1)],1)],1)],1),_vm._v(" "),(_vm.definition && _vm.definition.fields && _vm.definition.fields.length)?_c('tab',{attrs:{"heading":((_vm.definition.title) + " Information")}},[_c('fluro-content-form',{attrs:{"options":_vm.options,"fields":_vm.definition.fields},model:{value:(_vm.model.data),callback:function ($$v) {_vm.$set(_vm.model, "data", $$v);},expression:"model.data"}})],1):_vm._e()],1)]],2)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-25cc1be5_0", { source: ".border-top{border-top:1px solid rgba(0,0,0,.05)}.border-right{border-right:1px solid rgba(0,0,0,.05)}.border-bottom{border-bottom:1px solid rgba(0,0,0,.05)}.border-left{border-left:1px solid rgba(0,0,0,.05)}.no-border-no-background .toggle-item{border:none!important;background:0 0!important;font-size:14px;padding:0}", map: undefined, media: undefined });

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
//# sourceMappingURL=academic-cead18c7.js.map
