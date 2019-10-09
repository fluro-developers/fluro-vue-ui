<template>
    <span class="inline-tag" :content="data | timeago" v-tippy>{{data | formatDate('MMM D, YYYY')}}</span>
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
