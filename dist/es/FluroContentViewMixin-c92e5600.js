<<<<<<< HEAD:dist/es/FluroContentViewMixin-ed53ae90.js
import { b8 as Layout, af as FluroContentRender } from './index-85d711d5.js';
=======
import { b8 as Layout, af as FluroContentRender } from './index-a26484f6.js';
>>>>>>> a45046e8aeac137a1588be86b3c5378be67755b1:dist/es/FluroContentViewMixin-c92e5600.js

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
<<<<<<< HEAD:dist/es/FluroContentViewMixin-ed53ae90.js
//# sourceMappingURL=FluroContentViewMixin-ed53ae90.js.map
=======
//# sourceMappingURL=FluroContentViewMixin-c92e5600.js.map
>>>>>>> a45046e8aeac137a1588be86b3c5378be67755b1:dist/es/FluroContentViewMixin-c92e5600.js
