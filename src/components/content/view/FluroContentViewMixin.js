import FluroContentRender from '../../FluroContentRender.vue';
import FluroContentRenderField from '../../FluroContentRenderField.vue';
import Layout from '../../../mixins/Layout';


// import { JSONView } from "vue-json-component";


export default {
    props: {
        config: {
            type: Object,
            required: true,
        },

    },
    data() {
        return {
            loading: false,
        }
    },
    mixins: [Layout],
    // extends: FluroContentRender,
    components: {
        FluroContentRender,
        FluroContentRenderField,
        // "json-view": JSONView,
    },
    computed: {
        definition() {
            return this.config && this.config.definition ? this.config.definition : null
        },
        data() {
            return this.item.data || {}
        },
        fields() {

            if (this.definition && this.definition.fields && this.definition.fields.length) {


                return this.definition.fields;
            }
        }
        // itemID() {
        //     return this.model._id;
        // },
    },

    //     definition() {
    //         return this.config.definition;
    //     },
    // },
    methods: {

    }
}