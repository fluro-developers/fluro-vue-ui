<template>
    <div class="title-cell">
        <div class="grow">
            <strong>{{row.title}}</strong>
            <div class="small muted" v-if="row.firstLine">{{row.firstLine}}</div>
        </div>
        <div class="shrink" v-if="status">
        <fluro-status-label v-if="row.status && row.status != 'active'" :value="row.status" />
    </div>
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
        'status':{
            type:Boolean,
            default() {
                return false;
            }
        }
    }
}
</script>
<style lang="scss">
    
    .title-cell {
        display: flex;
        align-items: center;

        .grow {
            flex:1;
        }

        .status-label {
            flex: none;
        }
    }

</style>