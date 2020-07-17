<template>
    <div class="boolean-cell text-xs-center" :class="{'true':booleanTrue, 'false':!booleanTrue}">
        <fluro-icon library="fas" v-if="booleanTrue" icon="check-circle"/>
        <fluro-icon library="far" v-else icon="times"/>

        <!-- <pre>{{data}} {{booleanTrue}}</pre> -->
    </div>
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
                var string = String(this.data).toLowerCase();
                switch(string) {
                    case 'true':
                    case 'y':
                    case 'yes':
                    case '1':
                    case 't':
                        return true;
                    break;
                    case 'false':
                    case 'null':
                    case 'undefined':
                    case 'n':
                    case 'no':
                    case '':
                    case '0':
                    case 'f':
                        return;
                    break;

                    
                }
            }

            return !!this.data;// ? true : false;
        }
    }
}
</script>

<style lang="scss">
.boolean-cell  {
&.true {
    color: $success;
}

&.false {
    opacity: 0.3;
}
}
</style>