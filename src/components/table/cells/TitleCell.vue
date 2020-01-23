<template>
    <div class="title-cell">
        <div class="grow">

            <strong>{{row.title}}</strong>
            <div class="summary" v-if="firstLine">{{firstLine}}</div>
            <!-- <pre>{{firstLine}}</pre> -->
           
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
    },
    computed:{
        firstLine() {

            var self = this;
            var row = this.row;

            if(row.deployment) {
                return row.deployment
            }

            if(row.event) {

                if(row.event.startDate) {
                    return `${self.$fluro.date.formatDate(row.event.startDate, 'ddd D MMM YYYY - h:mma')} - ${row.event.title}`
                }

                if(row.event.title) {
                    return `${row.event.title}`
                }
            }

            if(row.firstLine) {
                return row.firstLine
            }

            if(row.subject) {
                return row.subject
            }

            if(row.description) {
                return row.description;
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

        .summary {
            font-size: 0.9em;
            opacity: 0.5;
            max-width: 500px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;;
        }
    }

</style>