<template>
    <div>
        {{duration}}
        <!-- <pre>{{row}}</pre> -->
    </div>
</template>
<script>
export default {
    props: {
        'row': {
            type: Object,
        },
        'column': {
            type: Object,
        },
        'data': {
            // type: Object,
        },
    },
    computed:{
        duration() {

            if(!this.data || !String(this.data).length) {
                return;
            }
            
            return this.$fluro.video.hhmmss(this.data);
        }
    }
}
</script>
<style lang="scss" scoped>
div {
    font-size: 0.9em;
    opacity: 0.5;
}
</style>