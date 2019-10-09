
import FluroContentForm from '../form/FluroContentForm';
import { JSONView } from "vue-json-component";


export default {
    props: {
        config: {
            type: Object,
            require:true,
        },
        context:{
        	type:String,
        	default:'new'
        }
    },
    data(){
        return {
            loading:false,
        }
    },
    extends: FluroContentForm,
    components:{
        "json-view": JSONView,
    },
    computed:{

        itemID() {
            return this.model._id;
        },
        definition() {
            return this.config.definition;
        },
    },
    methods: {

    }
}