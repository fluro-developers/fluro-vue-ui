<template>
    <component :is="component"></component>
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
        'template': function(value) {
            this.render();
        },
        'context': function(value) {
            this.render();
        }
    },
    mounted() {
        this.render();
    },
    // render(h) {
    //     // render(h) {
    //         if (!this.templateRender) {
    //             return h('div', 'loading...');
    //         } else { // If there is a template, I'll show it

    //         console.log('RENDERED', this.rendered);
    //             return this.rendered;//this.templateRender();
    //         }
    //     // },
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