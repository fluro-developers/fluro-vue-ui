<template>
    <span class="realm-bar" :style="style"/>
</template>
<script>

import _ from 'lodash';

export default {
    props: {
        'realm': {
            type: [Object, Array, String]
        },
    },
    computed: {
        allRealms() {
            var options = [];

            if (this.realm) {
                if (Array.isArray(this.realm)) {
                    options = options.concat(this.realm);
                } else {
                    options.push(this.realm);
                }
            }

            // if (this.realms) {
            //     if (Array.isArray(this.realms)) {
            //         options = options.concat(this.realms);
            //     } else {
            //         options.push(this.realms);
            //     }
            // }

            return options;
        },
        primaryRealm() {
            return _.find(this.allRealms, function(realm) {
                return realm.bgColor && realm.bgColor.length;
            });
        },
        style() {
            if(this.primaryRealm) {
                return {
                    backgroundColor: this.primaryRealm.bgColor,
                }
            }
        },
    }
}
</script>
<style lang="scss" scoped>
.realm-bar {
    width: 5px;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    height: 100%;
    background: rgba(#000, 0.1);
}
</style>