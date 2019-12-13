<template>
    <flex-column>
        <flex-column-body>
            <v-container>
                <!-- TEST WOOT WOOT -->
                <fluro-content-render :fields="fields" :raw="true" v-model="item" />
                <fluro-content-render :fields="definedFields" :raw="true" v-model="item.rawData" />
                <!-- <fluro-content-render :fields="fields" v-model="item.data" /> -->
                <!-- <pre>{{fields}}</pre> -->
            </v-container>
        </flex-column-body>
    </flex-column>
</template>
<script>
/////////////////////////////////

import Vue from 'vue';

import FluroContentViewMixin from '../FluroContentViewMixin';
import FluroContentRender from '../../../FluroContentRender.vue';

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
        FluroContentRender,
    },
    mixins: [FluroContentViewMixin],
    methods: {},
    computed: {
        data() {
            return this.item.data || {}
        },
        fields() {

            var array = [];

            array.push({
                title: 'Linked Contacts',
                key: 'contacts',
                type: 'reference',
                minimum: 0,
                maximum: 0,
            })

            return array;
        },
        definedFields() {
            return this.config.definition.fields;
        }
    },
    data() {
        return {}
    },
    created() {
        console.log('THIS RENDERER', this)
    }
}
</script>
<style scoped lang="scss">
</style>