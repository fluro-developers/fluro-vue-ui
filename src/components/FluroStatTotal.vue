<template>
    <span class="fluro-stat-total">
        <slot :processing="processing" :total="total" :store="store">
            {{total}}
        </slot>
    </span>
</template>
<script>
import _ from 'lodash';

export default {
    props: {
        'target': {
            type: [String, Object],
            required: true,
        },
        'stat': {
            type: String,
            required: true,
        },
        'unique': {
            type: Boolean,
            default: false,
        }
    },

    data() {

        return {
            store: null,
            processing: false,
            total: 0,
        }
    },

    //Watch if any changes are made and reset
    //the stats
    watch:{
        'target':'reset',
        'stat':'reset',
        'unique':'reset',
    },
    created() {
        this.reset();
    },
    methods: {
        reset() {
            var self = this;

            //Unlink from the current store
            if(self.store) {
                self.store.removeEventListener('change', self.update);
            }

            self.store = self.$fluro.stats.getStore(self.stat, self.targetID, self.unique);

            //Stat Store
            self.total = self.store.total;
            self.processing = self.store.processing;
            self.store.addEventListener('change', self.update);
        },
        update() {
            var self = this;
            self.total = self.store.total;
            self.processing = self.store.processing;
        },
    },
    beforeDestroy() {

        this.store.removeEventListener('change', this.update);
    },
    computed: {
        targetID() {
            return this.$fluro.utils.getStringID(this.target);
        },
    },

}
</script>
<style scoped lang="scss">
</style>