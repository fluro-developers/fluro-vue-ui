<template>
    <flex-column>
        <template v-if="loading">
            <fluro-page-preloader contain />
        </template>
        <tabset v-else :justified="true" :vertical="true">
            <tab heading="Event details">
                <v-container>
                    <constrain sm>
                        Event Details
                        <!-- <h1>{{item.title}}</h1> -->
                        <!-- <pre>{{item}}</pre> -->
                        <!-- <fluro-content-render :fields="definedFields" v-model="item.data" /> -->
                        <!-- <template v-if="item.body && item.body.length"> -->
                        <!-- <div v-html="item.body"></div> -->
                        <!-- </template> -->
                    </constrain>
                </v-container>
            </tab>
        </tabset>
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
        // definedFields() {
        //     return this.config.definition.fields;
        // }
    },
    data() {
        return {}
    },
}
</script>
<style scoped lang="scss">
</style>