<template>
    <div><fluro-realm-dots v-if="$vuetify.breakpoint.smAndUp" :realms="data"/><fluro-realm-bar v-if="$vuetify.breakpoint.xsOnly" :realm="data"/></div>
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
