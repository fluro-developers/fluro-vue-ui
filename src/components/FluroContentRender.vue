<template>
    <div class="fluro-content-render">
        
        <template v-for="field in fields">

            <!-- <pre>{{model}}</pre> -->
            <!-- <v-layout> -->
                <fluro-content-render-field :raw="raw" :field="field" v-model="model"></fluro-content-render-field>
            <!-- </v-layout> -->
        </template>

    </div>
</template>
<script>
import FluroContentRenderField from 'src/components/FluroContentRenderField.vue';
import _ from 'lodash';

//////////////////////////////////////////////////

export default {
	name:'fluro-content-render',
    props: {
        'fields': {
            type: Array,
        },
        'value': {
            type: Object,
        },
        'raw':{
            type:Boolean,
        },
    },
    watch:{
        value(v) {
            this.model = v;
        }
    },
    data() {
        return {
            model: this.value,
        }
    },
    components: {
        FluroContentRenderField,
    },
}
</script>
<style scoped lang="scss">
.fluro-content-form {}

.fluro-content-render {
    flex:1;
}
</style>