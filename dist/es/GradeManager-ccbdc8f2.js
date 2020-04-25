import { aG as FluroContentForm, l as FluroConfirmButton, bb as __vue_normalize__, bc as __vue_create_injector__ } from './index-d3f18f90.js';
import draggable from 'vuedraggable';

//
var script = {
  props: {
    value: {
      type: Array
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

      if (!clone.title || !clone.title.length) {
        return;
      }

      clone.key = _.camelCase(clone.title);
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
          title: 'Grade Title',
          minimum: 1,
          maximum: 1,
          type: 'string',
          key: 'title'
        }, {
          title: 'Grade Description',
          minimum: 0,
          maximum: 1,
          type: 'string',
          key: 'description'
        } // {
        //     title: 'Add',
        //     minimum: 0,
        //     maximum: 1,
        //     type: 'string',
        //     key:'description',
        //     // customComponent:MyVueComponent
        // }
        ]
      }); // addField('title', {
      //     title: 'Grade Title',
      //     minimum: 1,
      //     maximum: 1,
      //     type: 'string',
      // });
      // addField('description', {
      //     title: 'Description',
      //     minimum: 0,
      //     maximum: 1,
      //     type: 'string',
      // });
      ///////////////////////////////////

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
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('list-group',[_c('draggable',_vm._b({attrs:{"list":_vm.model,"ghost-class":"ghost-dragging-class"},on:{"start":function($event){_vm.drag=true;},"end":function($event){_vm.drag=false;}}},'draggable',_vm.dragOptions,false),_vm._l((_vm.model),function(grade,index){return _c('list-group-item',{key:JSON.stringify(_vm.area)},[_c('v-layout',{attrs:{"align-center":""}},[_c('v-flex',[_c('strong',[_vm._v(_vm._s(grade.title))])]),_vm._v(" "),_c('v-flex',{attrs:{"shrink":""}},[_c('fluro-confirm-button',{attrs:{"content":"Remove"},on:{"click":function($event){return _vm.remove(index)}},scopedSlots:_vm._u([{key:"default",fn:function(ref){
var confirming = ref.confirming;
return [_c('v-btn',{staticStyle:{"transition":"all 0.1s","width":"100%"},attrs:{"flat":"","block":"","color":confirming ? 'red' : ''}},[_vm._v(_vm._s(confirming ? "Confirm?" : "Remove"))])]}}],null,true)})],1)],1)],1)}),1)],1),_vm._v(" "),_c('fluro-panel',[_c('fluro-panel-title',[_vm._v("Add a grade")]),_vm._v(" "),_c('fluro-panel-body',[_c('form',{on:{"submit":function($event){$event.preventDefault();$event.stopPropagation();return _vm.add()}}},[_c('v-layout',[_c('v-flex',[_c('fluro-content-form',{ref:"form",attrs:{"fields":_vm.fields},model:{value:(_vm.proposed),callback:function ($$v) {_vm.proposed=$$v;},expression:"proposed"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"shrink":""}},[_c('v-btn',{attrs:{"type":"submit"},on:{"click":function($event){return _vm.add()}}},[_vm._v("Add")])],1)],1)],1)])],1)],1)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-40503292_0", { source: ".border-top{border-top:1px solid rgba(0,0,0,.05)}.border-right{border-right:1px solid rgba(0,0,0,.05)}.border-bottom{border-bottom:1px solid rgba(0,0,0,.05)}.border-left{border-left:1px solid rgba(0,0,0,.05)}.ghost-dragging-class{opacity:.5;background:#c8ebfb}", map: undefined, media: undefined });

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

export { __vue_component__ as G };
//# sourceMappingURL=GradeManager-ccbdc8f2.js.map
