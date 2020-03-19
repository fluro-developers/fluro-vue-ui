<template>
    <!-- <div> -->
        <!-- <pre>{{data}}</pre> -->
    <div v-if="context != 'print'"><fluro-realm-dots v-if="$vuetify.breakpoint.smAndUp" :realms="data"/><fluro-realm-bar v-if="$vuetify.breakpoint.xsOnly" :realm="data"/></div>
    <!-- </div> -->
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
    }
}
</script>
