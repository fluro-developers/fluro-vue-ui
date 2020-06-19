<template>
    <div class="dots">       
        <span class="dot" :style="{backgroundColor:realm.bgColor || '#000'}" :content="realm.title" v-tippy small v-for="realm in filtered"/>
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
            type:[Array, Object],
        },
    },
    data(){
        return {
        model:this.realms,
    }
    },
    watch:{
        realms(r) {
            this.model = r;
        }
    },
    computed:{
        filtered() {


            var actualRealms = [];

            if(!this.model) {
                return;
            }

            if(_.isArray(this.model)) {
            	actualRealms = this.model;
            } else if(_.isObject(this.model)) {
            	actualRealms = [this.model];
            }

            var filtered = _.chain(actualRealms)
            .filter(function(realm) {
                if(!realm) {
                    return;
                }
                
                if(realm._discriminatorType) {
                    // console.log('REALM', realm.title)
                    return;
                }

                return true;
            })
            .value();


            if(!filtered || !filtered.length) {
            	return;
            }

            var coloured = _.filter(filtered, function(realm) {
            	return !!realm.bgColor;
            })


            if(coloured.length) {
                return coloured;
            } else {
                return filtered.length ? filtered.slice(0,1) : null;
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