import FluroContentForm from '../../form/FluroContentForm';
import FluroContentFormField from '../../form/FluroContentFormField';
import Layout from '../../../mixins/Layout';
import FluroPrivacySelect from '../../form/FluroPrivacySelect.vue';


// import { JSONView } from "vue-json-component";


export default {
    props: {
        config: {
            type: Object,
            require: true,
        },
        context: {
            type: String,
            default: 'new'
        }
    },
    data() {
        return {
            loading: false,
        }
    },
    mounted() {
        this.$set(this.model, '_type', this.config.type.definitionName);
    },
    extends: FluroContentForm,
    components: {
        FluroContentForm,
        FluroContentFormField,
        FluroPrivacySelect,
        // "json-view": JSONView,
    },
    mixins:[Layout],
    computed: {

        itemID() {
            return this.model._id;
        },
        definition() {
            return this.config.definition;
        },
        readableContentType() {
            return this.$fluro.types.readable(this.config.definition ? this.config.definition.definitionName : this.config.type.definitionName)
        }
    },
    methods: {

    }
}