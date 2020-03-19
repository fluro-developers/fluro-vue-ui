<template>
    <div class="thumbnail" :style="{backgroundImage:`url(${url})`}"/>
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
        url() {
            return this.row._type == 'video' ? this.$fluro.asset.posterUrl(this.id, 50) : this.$fluro.asset.imageUrl(this.id, 50);
        },
        id() {
            return this.$fluro.utils.getStringID(this.data);
        }
    }
}
</script>
