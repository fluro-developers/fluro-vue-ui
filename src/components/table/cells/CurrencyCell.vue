<template>
    <div class="text-xs-center" :class="{muted:empty}">
        <!-- <span class="symbol" v-if="symbol">{{symbol}}</span> -->
        {{rendered}}
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
        empty() {
            if(parseInt(this.data) == 0) {
                return true;
            }
        },
        rendered() {
            return this.$fluro.utils.formatCurrency(this.data, this.currency);
        },
        currency() {
            return String(this.row.currency).toLowerCase();
        },
        // symbol() {
        //     switch(String(this.row.currency).toLowerCase()) {
        //         case 'gbp':
        //             return '£';
        //         break;
        //         default:
        //             return '$';
        //         break;
        //     }
        // }
    }
}
</script>
<style scoped lang="scss">
.symbol {
    opacity: 0.4;
}

</style>
