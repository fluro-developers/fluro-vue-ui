<template>
    <!-- <v-list-tile @click="toggle(realm)">
                                        <v-list-tile-action>
                                            <v-checkbox v-model="realm.selected"></v-checkbox>
                                        </v-list-tile-action>
                                        <v-list-tile-content>
                                            
                                            <v-list-tile-title>{{realm.title}}</v-list-tile-title>
                                        </v-list-tile-content>
                                    </v-list-tile>

                                     -->
    <div class="realm-select-item-outer" :class="{'has-children':item.children && item.children.length}">
        <div :class="{selected:isSelected}" class="realm-select-item" @click="callback(item)">
            <v-layout align-center>
                <v-flex>
                    <span class="dot" :style="dot" /> {{item.title}} 
                </v-flex>
                <div class="type">{{item.fullDefinition.title != 'Realm' ? item.fullDefinition.title : '' }}</div>
                <div class="check-icon">
                    <fluro-icon v-if="isSelected" icon="check"/>
                </div>
            </v-layout>
        </div>
        <div class="children" v-if="item.children && item.children.length">
            <template v-for="realm in item.children">
                <fluro-realm-select-item :item="realm" :check="check" :callback="callback" />
            </template>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        'item': {
            type: Object,
            required: true,
        },
        'callback': {
            type: Function,
            required: true,
        },
        'check': {
            type: Function,
            required: true,
        }
    },
    computed: {
        isSelected: {
            get() {
                return this.check(this.item)
            },
            set() {
                //Nothing
            }
        },
        dot() {

            var self = this;
            return {
                backgroundColor: self.item.bgColor,
            }
        }
    },
    beforeCreate: function() {
        this.$options.components.FluroRealmSelectItem = require('./FluroRealmSelectItem.vue').default;
    },
}
</script>
<style lang="scss">

</style>
