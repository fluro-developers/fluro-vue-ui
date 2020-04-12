<template>
    <div class="dots">
        <!-- <pre>{{filtered}}</pre> -->
        <!-- <pre>{{realms.length}}</pre> -->
        <!-- {{colouredRealms}} {{filtered}} -->
        <span class="dot" :style="{backgroundColor:realm.bgColor || '#000'}" :content="realm.title" v-tippy small v-for="realm in filtered"/>
    </div>
</template>
<script>

export default {
    props:{
        'realms':{
            default() {
                return [];
            },
            type:[Array, Object],
        },
    },
    computed:{
        actualRealms() {
            if(!this.realms) {
                return;
            }

            if(this.realms.length) {
                return this.realms;
            }

            return [this.realms];
        },
        filtered() {
            var filtered = _.filter(this.actualRealms, function(realm) {
                if(!realm) {
                    return;
                }
                
                if(realm._discriminatorType) {
                    // console.log('REALM', realm.title)
                    return;
                }

                return true;
            });


            var coloured = _.filter(filtered, 'bgColor');

            if(coloured.length) {
                return coloured;
            } else {
                return filtered.slice(0,1);
            }
        },
        // colouredRealms() {
        //     var coloured = _.filter(this.filtered, 'bgColor');
        //     if(!coloured.length) {
        //         return this.filtered.slice(0,1);
        //     }
        // }
    }
}
</script>
<style scoped lang="scss">
    
    .dots {
        display: inline-block;
        margin-right:5px;
        vertical-align: middle;
        white-space: nowrap;

        .dot {
            display: inline-block;
            border-radius: 100%;
            width: 14px;
            height:14px;
            margin-left:-7px;
            border: 1px solid #fff;
            vertical-align: middle;

            &:first-child {
                margin-left:0;
            }
        }
    }
</style>