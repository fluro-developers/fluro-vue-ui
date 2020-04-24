<template>
    <component :is="component"/>
    <!-- <component :is="component" v-if="component"></component> -->
<!-- </div> -->
</template>
<script>
import Vue from 'vue';

export default {
    props: {
        'template': {
            type:String,
            default() {
                return '';
            },
        },
        'context': {
            type: Object,
            default() {
                return {}
            }
        },
    },
    data() {
        return {
            component: null,
        }
    },

    watch: {
        'template':'render',
        'context':'render',
    },
    // mounted() {
    //     this.render();
    // },
    created() {
        this.render();
    },
    methods: {
        render() {

            var self = this;

            if (!self.template || !self.template.length) {
                self.component = null;
                return;
            }

            console.log('Get components from existing thing', self)
            let DynamicComponent = Vue.extend({
                template: `<div>${self.template}</div>`,
                data() {
                    return self.context || {};
                },
            });

            self.component = DynamicComponent;
        }
    },
}
</script>
<style scoped lang="scss">
</style>