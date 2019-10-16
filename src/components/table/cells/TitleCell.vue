<template>
    <div>
        <div>
            <strong>{{row.title}}</strong>
            <div class="small muted" v-if="row.firstLine">{{row.firstLine}}</div>
        </div>
        <fluro-status-label v-if="row.status && row.status != 'active'" :value="row.status" />
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