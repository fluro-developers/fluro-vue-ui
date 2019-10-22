<template>

    <div class="inline-tags">
        <a :href="`tel:${data}`" class="inline-tag">
            <fluro-icon icon="phone"/> {{data}}
        </a>
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
    }
}
</script>
<style lang="scss">

</style>