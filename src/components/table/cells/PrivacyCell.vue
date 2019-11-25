<template>
    <div class="cell" :class="data">
        <fluro-icon v-tippy :content="data" :library="library" :icon="icon"/>
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
        icon() {
            if(this.data == 'public') {
                return 'lock-open';
            } else {
                return 'lock';
            }
        },
        library() {
            if(this.data == 'public') {
                return 'far';
            } else {
                return 'fas';
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.cell {
    font-size: 0.9em;
    text-align: center;
}
</style>