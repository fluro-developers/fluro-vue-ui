<template>   
        <component :is="component" v-if="component"></component>
</template>
<script>
import _ from 'lodash'
import Vue from 'vue';


export default {
    props: ['template', 'context'],
    data() {
        return {
            component:null,
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

            let DynamicComponent = Vue.extend({
                template:`<div>${self.template}</div>`,
                data() {
                    return {};
                    // self.context;
                }
            });

            self.component = DynamicComponent;
                


            // this.templateRender = Vue.compile(`<div>${this.template}</div>`).render;


            // // console.log('Render NOW')

            // var options = {}
            // options.interpolate = /{{([\s\S]+?)}}/g;

            // ///////////////////////////////////

            // var scope = this.context;
            // var html = this.template;

            // var compile = _.template(html, options);

            // console.log('SCOPE', scope);

            // var rendered = compile(scope);

            // // console.log('RENDERED', rendered, html, scope, options)

            // this.rendered = rendered;

        }
    },
}
</script>
<style scoped lang="scss">
</style>