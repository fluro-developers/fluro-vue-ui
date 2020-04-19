<template>
    <flex-column-body>
    <v-container fluid>
        <constrain sm>
            <h1>{{item.title}}</h1>
            <!-- <pre>{{item}}</pre> -->
            <fluro-content-render :fields="definedFields" v-model="item.data" />
            
        </constrain>
    </v-container>
</flex-column-body>
</template>
<script>
/////////////////////////////////

import Vue from 'vue';
import FluroContentViewMixin from '../FluroContentViewMixin';

/////////////////////////////////

export default {
    props: {
        config: {
            type: Object,
            required: true,
        },
        item: {
            type: Object,
            required: true,
        },
    },
    components: {
    },
    mixins: [FluroContentViewMixin],
    methods: {},
    computed: {
        data() {
            return this.item.data || {}
        },
        definedFields() {
            return this.definition ? this.definition.fields : null;
        }
    },
    data() {
        return {}
    },
}
</script>
<style scoped lang="scss">
</style>