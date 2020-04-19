<template>
    <flex-column>
    <flex-column-body>
        <!-- :style="{backgroundColor:item.colors[0]}" -->
        <div class="image-holder">
            <fluro-image :longpress="true" contain :item="item" :spinner="true" />
        </div>
        <v-container grid-list-xl>
            <v-layout>
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
            <v-layout>
                <v-flex>
                    <v-input class="no-flex">
                        <v-label>Dimensions</v-label>
                        <div>{{item.width}}x{{item.height}}</div>
                    </v-input>
                    <!-- <v-input class="no-flex"> -->
                    <!-- <v-label>Realms</v-label> -->
                    <fluro-defined-list @click="quickOpen" :items="item.realms" type="realm" />
                    <!-- </v-input> -->
                </v-flex>
                <v-flex>
                    <v-input class="no-flex">
                        <v-label>Filename</v-label>
                        <div>{{item.filename}}</div>
                    </v-input>
                    <!-- <v-input class="no-flex"> -->
                    <!-- <v-label>Tags</v-label> -->
                    <fluro-defined-list @click="quickOpen" :items="item.tags" type="tag" />
                    <!-- </v-input> -->
                </v-flex>
                <v-flex>
                    <v-input class="no-flex">
                        <v-label>File Size</v-label>
                        <div>{{item.filesize | filesize}}</div>
                    </v-input>
                    <v-input label="Main Colors" v-if="item.colors && item.colors.length" class="no-flex">
                        <div>
                            <div class="color-swatch" :style="{backgroundColor:color}" v-tippy :content="color" v-for="color in item.colors" />
                        </div>
                    </v-input>
                    
                </v-flex>
            </v-layout>

            <template v-if="item.body && item.body.length">
                <div v-html="item.body"></div>
            </template>

            
            <template v-if="fields && fields.length">
                <fluro-content-render :fields="fields" v-model="item.data" />
            </template>
            <!-- <pre>{{fields}}</pre> -->
        </v-container>
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
        data() {
            return this.item.data || {}
        },
        definition() {
            return this.config.definition;
        },
        fields() {

            if (this.definition) {


                return this.config.definition.fields;
            }
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
.image-holder {
    background: #111;
    max-height: 50vh;
    overflow: hidden;
    display: flex;
}

.color-swatch {
    width:36px;
    height:36px;
        border-radius: 3px;
    margin: 0 1px 1px 0;
    display: inline-block;
}
</style>