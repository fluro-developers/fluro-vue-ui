<template>
    <v-runtime-template v-if="value.length" :template="`<div>${value}</div>`"></v-runtime-template>
</template>
<script>
import VRuntimeTemplate from "v-runtime-template";


// import hljs from 'highlight.js/lib/highlight';
// import scss from 'highlight.js/lib/languages/scss';
// import javascript from 'highlight.js/lib/languages/javascript';
// import json from 'highlight.js/lib/languages/json';

////////////////////////////////////////////////////////

export default {
    components: {
        'v-runtime-template': VRuntimeTemplate
    },
    props: {
        'value': {
            type: String,
        },
    },
    mounted() {
        //    console.log('Mounted')
        // hljs.initHighlighting();
        var self = this;

        if (hljs) {


            // this.$el.querySelector('.className').width();
            self.$el.querySelectorAll('pre code').forEach((block) => {
                // console.log('BLOCK', block, hljs);
                hljs.highlightBlock(block);
            });

        }
    },



}
</script>
<style lang="scss">
</style>