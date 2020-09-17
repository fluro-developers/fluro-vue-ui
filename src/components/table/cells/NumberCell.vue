<template>
    <div class="number-cell-text" :class="{muted:empty}">
        {{prefix}}{{data}}{{suffix}}
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
        empty() {
            if(parseInt(this.data) == 0) {
                return true;
            }
        },
        suffix() {
            return this.column.suffix;
        },
        prefix() {
            return this.column.prefix;
        }
    }
}
</script>
<style scoped lang="scss">
.number-cell-text {
    text-align: center;
    opacity: 0.8;
    font-size: 0.9em;
}
</style>
