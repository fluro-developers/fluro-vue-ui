<template>
    <div class="number-cell-text" :class="{empty:empty}">
        {{prefix}}{{data}}{{suffix}}
        </div>
</template>
<script>
export default {
    props: {
        'row': {
            type:Object,
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
    opacity: 0.9;
    font-size: 0.9em;

    &.empty {
        font-weight:normal;
        opacity: 0.2;
    }
}
</style>
