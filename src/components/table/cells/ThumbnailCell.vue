<template>
    <div class="thumbnail" :style="{backgroundImage:`url(${$fluro.asset.imageUrl(id, 50)})`}"/>
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
        id() {
            return this.$fluro.utils.getStringID(this.data);
        }
    }
}
</script>
