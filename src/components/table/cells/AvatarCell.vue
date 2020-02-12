
<template>
    <fluro-avatar v-if="context != 'print'" md :id="data" :type="row._type" />
    <!-- <span class="inline-tag" :content="data | timeago" v-tippy>{{data | formatDate('MMM D, YYYY')}}</span> -->
</template>
<script>
export default {
    props: {
        'context':{
            type:String,
        },
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
