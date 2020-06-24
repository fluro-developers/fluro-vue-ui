<<<<<<< HEAD:dist/es/FluroContentViewMixin-8f5a872d.js
import { ba as Layout, ah as FluroContentRender } from './index-204ee3c0.js';
=======
import { bb as Layout, ai as FluroContentRender } from './index-8d7f8f94.js';
>>>>>>> e97e30815b0dc9fa78df2edbb47266484ec56bb6:dist/es/FluroContentViewMixin-4f8a6b3e.js

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
<<<<<<< HEAD:dist/es/FluroContentViewMixin-8f5a872d.js
//# sourceMappingURL=FluroContentViewMixin-8f5a872d.js.map
=======
//# sourceMappingURL=FluroContentViewMixin-4f8a6b3e.js.map
>>>>>>> e97e30815b0dc9fa78df2edbb47266484ec56bb6:dist/es/FluroContentViewMixin-4f8a6b3e.js
