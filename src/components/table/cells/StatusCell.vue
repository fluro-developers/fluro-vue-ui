<template>
    <div>
    <div v-if="context == 'print'">
        {{data}}
    </div>
    <div v-else>
        <fluro-status-label :value="data" />
    </div>
</div>
</template>
<script>
export default {
    props: {
        'context': {
            type: String,
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
    }
}
</script>