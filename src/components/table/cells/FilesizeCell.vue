<template>
    <div>
        {{computed}}
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
        computed() {
            return this.data ? this.$fluro.asset.filesize(this.data) : ''
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