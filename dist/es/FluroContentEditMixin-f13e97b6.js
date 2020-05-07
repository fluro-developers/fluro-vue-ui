import { bc as __vue_normalize__, bd as __vue_create_injector__, aH as FluroContentForm, aI as FluroContentFormField } from './index-f7c481db.js';

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script = {
  props: {
    value: {
      type: String,
      default: 'secure'
    }
  },

  data() {
    return {
      model: this.value
    };
  },

  methods: {
    select(value) {
      this.model = value;
      this.$emit('input', value);
    }

  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"privacy-select"},[_c('a',{staticClass:"privacy-select-button",class:{'active':_vm.model == 'secure'},on:{"click":function($event){return _vm.select('secure')}}},[_c('div',[_c('fluro-icon',{staticClass:"icn",attrs:{"icon":"lock"}}),_c('br'),_vm._v(" "),_c('strong',[_vm._v("Secure")]),_c('br'),_vm._v(" "),_c('em',[_vm._v("Only users and applications with correct permissions can view")])],1)]),_vm._v(" "),_c('a',{staticClass:"privacy-select-button",class:{'active':_vm.model == 'public'},on:{"click":function($event){return _vm.select('public')}}},[_c('div',[_c('fluro-icon',{staticClass:"icn",attrs:{"icon":"globe"}}),_c('br'),_vm._v(" "),_c('strong',[_vm._v("Public")]),_c('br'),_vm._v(" "),_c('em',[_vm._v("Anyone in the world can view")])],1)])])};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-3de628c0_0", { source: ".border-top{border-top:1px solid rgba(0,0,0,.05)}.border-right{border-right:1px solid rgba(0,0,0,.05)}.border-bottom{border-bottom:1px solid rgba(0,0,0,.05)}.border-left{border-left:1px solid rgba(0,0,0,.05)}.privacy-select{display:flex;border-radius:5px}.privacy-select .privacy-select-button{border:1px solid rgba(0,0,0,.1);text-align:center;color:inherit;flex:1;display:flex;align-items:center;justify-content:center;padding:20px 10px;transition:all .2s;background:linear-gradient(#fff,#eee)}.privacy-select .privacy-select-button.active{background:#4c4c4c;color:#fff!important;box-shadow:inset 5px 20px 50px rgba(0,0,0,.3)}.privacy-select .privacy-select-button .icn{font-size:1.3em;opacity:.5}.privacy-select .privacy-select-button em{font-size:.8em;font-style:italic;opacity:.5;height:30px;line-height:13px;display:flex;align-items:center;justify-content:center}.privacy-select .privacy-select-button:first-child{border-radius:4px 0 0 4px}.privacy-select .privacy-select-button:last-child{border-radius:0 4px 4px 0}", map: undefined, media: undefined });

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

var FluroContentEditMixin = {
  props: {
    config: {
      type: Object,
      required: true
    },
    context: {
      type: String,
      default: 'new'
    }
  },

  data() {
    return {
      loading: false
    };
  },

  mounted() {
    this.$set(this.model, '_type', this.config.type.definitionName);
  },

  extends: FluroContentForm,
  components: {
    FluroContentForm,
    FluroContentFormField,
    FluroPrivacySelect: __vue_component__
  },
  // mixins: [Layout],
  computed: {
    type() {
      return this.config.type;
    },

    typeName() {
      return this.type ? this.type.definitionName : '';
    },

    itemID() {
      return this.model._id;
    },

    definition() {
      return this.config.definition;
    },

    definedFields() {
      if (this.definition && this.definition.fields && this.definition.fields.length) {
        return this.definition.fields;
      }

      return [];
    },

    readableContentType() {
      return this.$fluro.types.readable(this.config.definition ? this.config.definition.definitionName : this.config.type.definitionName);
    },

    fullBody() {
      return this.definition && this.definition.data && this.definition.data.fullBody;
    },

    hideBody() {
      return this.definition && this.definition.data && this.definition.data.hideBody;
    },

    titleLabel() {
      return 'Title';
    },

    bodyLabel() {
      return 'Body';
    }

  },
  methods: {}
};

export { FluroContentEditMixin as F };
//# sourceMappingURL=FluroContentEditMixin-f13e97b6.js.map
