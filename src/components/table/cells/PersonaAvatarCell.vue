
<template>
    <div>
    <template v-if="multiple">
        <template v-for="entry in data">
            <fluro-avatar v-tippy :content="entry.firstName || entry.title" md :id="entry" type="persona" />
        </template>
    </template>
    <template v-else>
        <fluro-avatar v-tippy :content="entry.firstName || entry.title" md :id="data" type="persona" />
    </template>
</div>
    <!-- <span class="inline-tag" :content="data | timeago" v-tippy>{{data | formatDate('MMM D, YYYY')}}</span> -->
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
        multiple() {
            return _.isArray(this.data);
        }
    }
}
</script>
