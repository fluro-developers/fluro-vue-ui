<template>
    <!-- <div> -->
         <div class="boolean-cell text-xs-center" :class="{'true':booleanTrue, 'false':!booleanTrue}">
            <fluro-icon library="fas" v-if="booleanTrue" icon="check-circle"/>
            <fluro-icon library="far" v-else icon="times"/>
        </div>
        <!-- <pre>{{data}}</pre> -->
    <!-- </div> -->
</template>
<script>

import _ from 'lodash';

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
        booleanTrue() {
            if(_.isString(this.data)) {
                switch(String(this.data).toLowerCase()) {
                    case 'true':
                    case 'y':
                    case 'yes':
                        return true;
                    break;
                    case 'false':
                    case 'null':
                    case 'undefined':
                    case 'n':
                    case 'no':
                    case '':
                        return;
                    break;
                }
                return 
            }

            return this.data ? true : false;
        }
    }
}
</script>
<style lang="scss">

</style>