<template>
    <div class="realm-select-item-outer" :class="{'has-children':item.children && item.children.length}">
        
        <div :class="{selected:isSelected}" class="realm-select-item" @click="callback(item)">
            <v-layout align-center>
                <v-flex>
                    <span class="dot" :style="dot" />
                    {{item.title}}
                </v-flex>
                <div class="type">{{item.fullDefinition.title != 'Realm' ? item.fullDefinition.title : '' }}</div>
                <div class="check-icon">
                    <fluro-icon v-if="isSelected" icon="check" />
                </div>
                <v-flex shrink v-if="expandable">
                    <v-btn class="my-0" small icon @click.stop.prevent.native="toggleCollapsed()">
                        <fluro-icon :icon="expanded ? 'angle-up' : 'angle-down'" />
                    </v-btn>
                </v-flex>
            </v-layout>
        </div>
        <template v-if="hasChildren">
            <div class="children" v-if="expanded">
                <template v-for="realm in item.children">
                    
                    <fluro-realm-select-item :collapsible="collapsible" :expandLookup="expandLookup" :item="realm" :check="check" :callback="callback" />
                    
                </template>
            </div>
        </template>
    </div>
</template>
<script>
export default {
    name: "fluro-realm-select-item",
    props: {
        item: {
            type: Object,
            required: true
        },
        callback: {
            type: Function,
            required: true
        },
        check: {
            type: Function,
            required: true
        },
        expandLookup: {
            type: Object,
            default () {
                return {}
            }
        },
        collapsible: {
            type: Boolean,
            default: false,
        }

    },
    methods: {
        toggleCollapsed() {
            if (this.expanded) {
                this.collapse()
            } else {
                this.expand();
            }
        },
        expand() {
            this.$set(this.expandLookup, this.realmID, true);
        },
        collapse() {
            this.$set(this.expandLookup, this.realmID, false);
        }
    },
    computed: {
        hasChildren() {
            return this.item.children && this.item.children.length;
        },
        expandable() {
            return this.collapsible && this.hasChildren;
        },
        realmID() {
            return this.$fluro.utils.getStringID(this.item);
        },
        expanded() {
            return !this.collapsible || this.expandLookup[this.realmID];
        },
        isSelected: {
            get() {
                return this.check(this.item);
            },
            set() {
                //Nothing
            }
        },
        dot() {
            var self = this;
            return {
                backgroundColor: self.item.bgColor
            };
        }
    }
};

</script>
<style lang="scss">
</style>
