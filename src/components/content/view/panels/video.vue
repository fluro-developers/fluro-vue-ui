<template>
    <flex-column>
        <flex-column-body>
            <constrain sm>
                <v-container py-0>
                <fluro-video :item="item" />
            </v-container>
                <v-layout v-if="item.assetType == 'upload'">
                    <v-flex>
                        <v-btn large block color="#eee" :href="linkURL" target="_blank">
                            Link
                            <fluro-icon right icon="link" />
                        </v-btn>
                    </v-flex>
                    <v-flex>
                        <v-btn large block color="#eee" :href="downloadURL" target="_blank">
                            Download
                            <fluro-icon right icon="cloud-download" />
                        </v-btn>
                    </v-flex>
                </v-layout>
                <template v-if="item.body && item.body.length">
                    <div v-html="item.body"></div>
                </template>
                <template v-if="fields && fields.length">
                    <fluro-content-render :fields="fields" v-model="item.data" />
                </template>
            </constrain>
        </flex-column-body>
    </flex-column>
</template>
<script>
/////////////////////////////////

import Vue from 'vue';

import FluroContentViewMixin from '../FluroContentViewMixin';
import FluroDefinedList from '../../../FluroDefinedList.vue';

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
        FluroDefinedList,
    },
    mixins: [FluroContentViewMixin],
    methods: {
        quickOpen(item) {
            console.log('Open', item)
            this.$actions.open([item]);
        }
    },
    computed: {
        linkURL() {
            return this.$fluro.asset.getUrl(this.item, { format: this.item.extension, filename: this.item.filename })
        },
        downloadURL() {
            return this.$fluro.asset.downloadUrl(this.item)
        },


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