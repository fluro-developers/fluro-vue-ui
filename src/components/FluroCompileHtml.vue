<template>
    <div>
        <!-- WOOO -->
        <!-- <pre>{{template}}</pre> -->
        <!-- <pre>{{context}}</pre> -->
        <!-- <pre>{{rendered}}</pre> -->
        <div v-html="rendered">
            <!-- <v-runtime-template :template="template"/> -->
        </div>
    </div>
</template>
<script>
import _ from 'lodash'
import Vue from 'vue';


export default {
    props: ['template', 'context'],
    data() {
        return {
            rendered: '',
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
    render(h) {
        // render(h) {
            if (!this.templateRender) {
                return h('div', 'loading...');
            } else { // If there is a template, I'll show it

            console.log('RENDERED', this.rendered);
                return this.rendered;//this.templateRender();
            }
        // },
    },
    created() {
        this.render();
    },
    methods: {
        render() {
            this.templateRender = Vue.compile(`<div>${this.template}</div>`).render;


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