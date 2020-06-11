import { bf as styleInject, bg as __vue_normalize__, aK as FluroContentForm, b as FluroHelp, aL as FluroContentFormField } from './index-83d7f2e4.js';

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

  watch: {
    value() {
      this.model = this.value;
    }

  },
  methods: {
    select(value) {
      this.model = value;
      this.$emit('input', value);
    }

  }
};

var css_248z = ".border-top{border-top:1px solid rgba(0,0,0,.05)}.border-right{border-right:1px solid rgba(0,0,0,.05)}.border-bottom{border-bottom:1px solid rgba(0,0,0,.05)}.border-left{border-left:1px solid rgba(0,0,0,.05)}.privacy-select{display:-webkit-box;display:-ms-flexbox;display:flex;border-radius:5px}.privacy-select .privacy-select-button,.privacy-select .privacy-select-button em{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.privacy-select .privacy-select-button{border:1px solid rgba(0,0,0,.1);text-align:center;color:inherit;-webkit-box-flex:1;-ms-flex:1;flex:1;padding:20px 10px;-webkit-transition:all .2s;-o-transition:all .2s;transition:all .2s;background:-webkit-gradient(linear,left top,left bottom,from(#fff),to(#eee));background:-o-linear-gradient(#fff,#eee);background:linear-gradient(#fff,#eee)}.privacy-select .privacy-select-button.active{background:#4c4c4c;color:#fff!important;-webkit-box-shadow:inset 5px 20px 50px rgba(0,0,0,.3);box-shadow:inset 5px 20px 50px rgba(0,0,0,.3)}.privacy-select .privacy-select-button .icn{font-size:1.3em;opacity:.5}.privacy-select .privacy-select-button em{font-size:.8em;font-style:italic;opacity:.5;height:30px;line-height:13px}.privacy-select .privacy-select-button:first-child{border-radius:4px 0 0 4px}.privacy-select .privacy-select-button:last-child{border-radius:0 4px 4px 0}";
styleInject(css_248z);

/* script */
const __vue_script__ = script;
/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"privacy-select"},[_c('a',{staticClass:"privacy-select-button",class:{'active':_vm.model == 'secure'},on:{"click":function($event){return _vm.select('secure')}}},[_c('div',[_c('fluro-icon',{staticClass:"icn",attrs:{"icon":"lock-alt"}}),_c('br'),_vm._v(" "),_c('strong',[_vm._v("Secure")]),_c('br'),_vm._v(" "),_c('em',[_vm._v("Only users and applications with correct permissions can view")])],1)]),_vm._v(" "),_c('a',{staticClass:"privacy-select-button",class:{'active':_vm.model == 'public'},on:{"click":function($event){return _vm.select('public')}}},[_c('div',[_c('fluro-icon',{staticClass:"icn",attrs:{"icon":"globe"}}),_c('br'),_vm._v(" "),_c('strong',[_vm._v("Public")]),_c('br'),_vm._v(" "),_c('em',[_vm._v("Anyone in the world can view")])],1)])])};
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
    'help': FluroHelp,
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
//# sourceMappingURL=FluroContentEditMixin-43dffb75.js.map
