<<<<<<< HEAD:dist/es/FluroContentEditMixin-189fa42a.js
import { bd as __vue_normalize__, be as __vue_create_injector__, aI as FluroContentForm, a as FluroHelp, aJ as FluroContentFormField } from './index-85d711d5.js';
=======
import { bd as __vue_normalize__, aI as FluroContentForm, a as FluroHelp, aJ as FluroContentFormField } from './index-a26484f6.js';
>>>>>>> a45046e8aeac137a1588be86b3c5378be67755b1:dist/es/FluroContentEditMixin-f94812ea.js

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
<<<<<<< HEAD:dist/es/FluroContentEditMixin-189fa42a.js
//# sourceMappingURL=FluroContentEditMixin-189fa42a.js.map
=======
//# sourceMappingURL=FluroContentEditMixin-f94812ea.js.map
>>>>>>> a45046e8aeac137a1588be86b3c5378be67755b1:dist/es/FluroContentEditMixin-f94812ea.js
