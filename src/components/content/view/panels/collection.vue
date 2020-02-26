<template>
    <flex-column-body>
        <v-container fluid>
            <constrain sm>
                <!-- <h1>{{item.title}}</h1> -->
                <!-- <pre>{{item}}</pre> -->
                <!-- -->
                <!-- <pre>{{collection}}</pre> -->
                <v-container v-if="fields">
                    <fluro-content-render :fields="fields" v-model="item.data" /> 
                </v-container>
                <v-container class="pin-group" v-for="group in grouped">
                    <h4>{{group.title}}</h4>
                    <fluro-card>
                        <fluro-list-item @click.native="clicked(item)" :bordered="true" :item="item" v-for="item in group.items">
                            <!-- <template v-slot:actions> -->
                            <!-- <div class="item-actions"> -->
                            <!-- <v-btn class="ma-0" small icon v-tippy content="Remove Pin" @click.stop.prevent="pinStore.unset(item._id)"> -->
                            <!-- <fluro-icon icon="times" /> -->
                            <!-- </v-btn> -->
                            <!-- <v-btn class="ma-0" small icon v-tippy content="More Options" @click.stop.prevent="$actions.open([item])"> -->
                            <!-- <fluro-icon icon="ellipsis-h" /> -->
                            <!-- </v-btn> -->
                            <!-- </div> -->
                            <!-- </template> -->
                        </fluro-list-item>
                        <!-- <pre>{{group}}</pre> -->
                    </fluro-card>
                </v-container>
            </constrain>
        </v-container>
    </flex-column-body>
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
        grouped() {
            var self = this;

            return _.chain(self.item.items)
                .orderBy(function(item) {
                    return item.title;
                })
                .reduce(function(set, item) {

                    var type = item.definition || item._type;
                    var existing = set[type];
                    if (!existing) {
                        existing =
                            set[type] = {
                                title: self.$fluro.types.readable(type, true),
                                items: [],
                            }
                    }

                    existing.items.push(item);

                    return set;
                }, {})
                .values()
                .orderBy(function(group) {
                    return group.title;
                })
                .value();
        },
        data() {
            return this.item.data || {}
        },
    },
    data() {
        return {}
    },
}
</script>
<style scoped lang="scss">
</style>