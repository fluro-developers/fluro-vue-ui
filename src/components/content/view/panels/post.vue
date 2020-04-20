<template>
    <flex-column>
        <flex-column-body>
            <v-container>
                <!-- TEST WOOT WOOT -->
                <fluro-content-render :fields="fields" v-model="item.data" />
                <!-- <pre>{{fields}}</pre> -->
            </v-container>
        </flex-column-body>
    </flex-column>
</template>
<script>
/////////////////////////////////

import Vue from 'vue';

import FluroContentViewMixin from 'src/components/content/view/FluroContentViewMixin.js';

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
        fields() {
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