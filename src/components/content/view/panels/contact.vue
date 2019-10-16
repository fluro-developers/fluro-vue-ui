<template>
    <v-container>
        <v-layout align-center>
            <v-flex shrink>
                
                    <fluro-avatar left xl :id="item" type="contact"></fluro-avatar>
                
            </v-flex>
            <v-flex>

                <h3>{{item.title}}</h3>
                <h6>{{item.definition || item._type | definitionTitle}}</h6>
                <div class="muted">{{item.gender}}</div>
                <div class="muted">{{item.age}}</div>
            </v-flex>
        </v-layout>
        <!-- <h5></h5> -->
        <!-- <pre>{{item}}</pre> -->
    </v-container>
</template>
<script>
/////////////////////////////////

import Vue from 'vue';

import FluroContentViewMixin from '../FluroContentViewMixin';
import FluroContentRender from '../../../FluroContentRender.vue';
import FluroAvatar from '../../../FluroAvatar.vue';

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
        FluroAvatar,
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