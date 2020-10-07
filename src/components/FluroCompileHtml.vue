<template>
    <component :is="component" />
    <!-- <component :is="component" v-if="component"></component> -->
<!-- </div> -->
</template>
<script>
import Vue from 'vue';

export default {
    props: {
        template: {
            type:String,
            default() {
                return '';
            },
        },
        context: {
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
        template:'render',
        context:'render',
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


            // //console.log('COMPILE THE FUNCTION BEFORE', self.javascript.length)
            //     var component = Function('_', script)(_);
            //     component.props = {
            //         scroll: {
            //             type: Object,
            //             default () {
            //                 return self.scroll;
            //             },
            //         },
            //         data: {
            //             type: Object,
            //             default () {
            //                 return {};
            //             }
            //         }
            //     }





            var components;
            if (self.$parent && self.$parent.$options) {
                components = self.$parent.$options.components;
            }



            const DynamicComponent = Vue.extend({
                template: `<div>${self.template}</div>`,
                components,
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