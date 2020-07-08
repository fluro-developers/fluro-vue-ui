import { bd as Layout, ak as FluroContentRender } from './index-e1f26c03.js';

var FluroContentViewMixin = {
  props: {
    config: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      loading: false
    };
  },

  mixins: [Layout],
  // extends: FluroContentRender,
  components: {
    FluroContentRender // FluroContentRenderField,

  },
  computed: {
    itemID() {
      return this.$fluro.utils.getStringID(this.item);
    },

    definition() {
      return this.config && this.config.definition ? this.config.definition : null;
    },

    data() {
      return this.item.data || {};
    },

    fields() {
      if (this.definition && this.definition.fields && this.definition.fields.length) {
        return this.definition.fields;
      }

      return [];
    } // itemID() {
    //     return this.model._id;
    // },


  },
  //     definition() {
  //         return this.config.definition;
  //     },
  // },
  methods: {}
};

export { FluroContentViewMixin as F };
//# sourceMappingURL=FluroContentViewMixin-66d1415b.js.map
