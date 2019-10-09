<template>
    <span class="inline-tag" v-if="data && data.length">{{data.length}} permissions</span>
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
}
</script>
