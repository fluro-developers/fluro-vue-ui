<template>
    <div class="inline-tags">
        <!-- {{filtered}} -->
        <!-- {{colouredRealms}} {{filtered}} -->
        <span class="inline-tag" :style="{backgroundColor:realm.bgColor || 'rgba(0,0,0,0.5);', color:realm.color || 'rgba(0,0,0,0.8)' }" v-for="realm in filtered">
    {{realm.title}}
        </span>
    </div>
</template>
<script>

import _ from 'lodash';

export default {
    props:{
        'realms':{
            default() {
                return [];
            },
            type:Array,
        },
    },
    computed:{
        filtered() {
            return _.chain(this.realms)
            .filter(function(realm) {
                if(realm._discriminatorType) {
                    return;
                }

                return true;
            })
            .orderBy(function(realm) {
                return realm.title;
            })
            .value();


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