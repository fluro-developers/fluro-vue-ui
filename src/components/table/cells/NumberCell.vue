<template>
    <div class="text-xs-center" :class="{muted:empty}">
        {{data}}
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
        }
    }
}
</script>
<style scoped lang="scss">

</style>
