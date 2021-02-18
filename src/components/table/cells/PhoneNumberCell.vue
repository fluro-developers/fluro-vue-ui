<template>

    <div class="inline-tags">

        <a :href="`tel:${value}`" class="inline-tag" v-for="value in values">
            <fluro-icon icon="phone"/> {{value}}
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
    },
    computed:{
        values() {
            if(_.isArray(this.data)) {
                return this.data
            } else {
                return this.data ? [this.data] : []
            }
        },
    }
}
</script>
<style lang="scss">

</style>