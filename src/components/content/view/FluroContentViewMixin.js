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
    mixins:[Layout],
    // extends: FluroContentRender,
    components: {
        FluroContentRender,
        FluroContentRenderField,
        // "json-view": JSONView,
    },
    computed: {
        definition() {
            this.config && this.config.definition ? this.config.definition : null
        },
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