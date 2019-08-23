<template>
    <div class="fluro-content-render">
        
        <template v-for="field in fields">
            <fluro-content-render-field :field="field" v-model="model"></fluro-content-render-field>
        </template>

    </div>
</template>
<script>
import FluroContentRenderField from './FluroContentRenderField.vue';
import _ from 'lodash';

//////////////////////////////////////////////////

export default {
    props: {
        'fields': {
            type: Array,
        },
        'value': {
            type: Object,
        },
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
</style>