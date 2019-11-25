<template>
    <strong :class="className"><fluro-icon :icon="icon" library="fas" />&nbsp;{{prefix}}{{value}}{{suffix}}</strong>
</template>
<script>
export default {
    props: {
        'value': {
            default:0,
            type: Number,
        },
        'prefix':{
            default:'',
            type:String,
        },
        'suffix':{
            default:'',
            type:String,
        }
    },
    computed: {
        icon() {

            if (this.increased) {
                return 'caret-square-up';
            }

            if (this.decreased) {
                return 'caret-square-down';
            }

            return 'square';
        },
        className() {
            if(this.increased) {
                return 'success--text';
            }

            if(this.decreased) {
                return 'error--text';
            }

            return 'muted';
        },
        increased() {
            return this.value > 0;
        },
        decreased() {
            return this.value < 0;
        },
    }
}
</script>
<style scoped lang="scss">

.muted {
    font-weight: 100;
    opacity: 0.5;
}
</style>