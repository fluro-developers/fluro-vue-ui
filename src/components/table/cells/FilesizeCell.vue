<template>
    <div>
        {{computed}}
    </div>
</template>
<script>
export default {
    props: {
        'row': {
            type: [Object, Array],
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

            var data = this.data;
            if(!data) {
                return;
            }

            if(Array.isArray(data)) {
                data = data.reduce(function(memo, value) {
                    if(value) {
                        memo += value;
                    }
                    return memo;
                }, 0);
            }
            return data ? this.$fluro.asset.filesize(data) : ''
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