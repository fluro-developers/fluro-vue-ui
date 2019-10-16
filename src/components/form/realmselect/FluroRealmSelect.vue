<template>
    <div class="realm-select">
        <v-btn :small="small" :block="block" class="pill mx-0" @click.native="showModal">
            <fluro-realm-dots :realms="selection" />
            <span class="label">{{selectionSummary}}</span>
        </v-btn>
        <!-- <pre>{{type}} {{definition}}</pre> -->
    </div>
</template>
<script>
import Vue from 'vue';
import FluroRealmDots from '../../ui/FluroRealmDots.vue';
import FluroRealmSelectItem from './FluroRealmSelectItem.vue';
import FluroSelectionMixin from '../../../mixins/FluroSelectionMixin';
import Layout from '../../../mixins/Layout';

///////////////////////////////////////////////

import RealmSelectModal from './RealmSelectModal.vue';

///////////////////////////////////////////////

export default {
    computed: {
        mainType() {
            var tree = this.tree;
            if (tree.length == 1) {
                //(Campuses)
                return tree[0].definition || tree[0]._type;
            } else {
                return 'realm';
            }
        },
        title() {
            return this.$fluro.types.readable(this.mainType, false, 'realm');
        },
        plural() {
            return this.$fluro.types.readable(this.mainType, true, 'realm');
        },
        selectionSummary() {
            var self = this;

            if (!self.selection.length) {
                return `Select ${self.plural}`
            }

            if (self.selection.length > 3) {
                return `${self.selection.length} ${self.plural} selected`;
            }

            return _.map(self.selection, 'title').join(', ');
        }
    },
    components: {
        FluroRealmSelectItem,
        FluroRealmDots,
    },
    mixins: [Layout, FluroSelectionMixin],
    props: {
        small:{
            type:Boolean,
        },
        block:{
            type:Boolean,
        },
        'expanded': {
            type: Boolean,
        },
        'value': {
            type: Array,
            default: function() {
                return [];
            },
        },
        'type': {
            //The type of thing we are selecting realms for
            type: String,
        },
        'definition': {
            //The definition of the thing we are selecting realms for
            type: String,
        }
    },
    data() {
        return {
            loading:true,
        }
    },
    asyncComputed: {
        tree: {
            default: [],
            get() {
                var self = this;
                self.loading = true;

                // console.log('Retrieve the selectable realms',this.definition, this.type)
                var promise = self.$fluro.access.retrieveSelectableRealms('create', this.definition, this.type)

                //////////////////////////////////////

                function mapFlat(realm, memo) {
                    memo[realm._id] = realm;
                    if(realm.children && realm.children.length) {
                        _.each(realm.children, function(realm) {
                            mapFlat(realm, memo);
                        })
                    }
                }

                //////////////////////////////////////
                
                promise.then(function(res) {

                    // console.log('Got the types we can create', self.definition, self.type, res);
                    //////////////////////////////////////

                    var flattened = _.reduce(res, function(set, realmType) {

                        _.each(realmType.realms, function(realm) {
                            mapFlat(realm, set);
                        });
                        return set;
                    }, {});

                    //////////////////////////////////////

                    var initialIDs = _.map(self.$fluro.utils.arrayIDs(self.value), function(id) {
                        return flattened[id];
                    });


                    // console.log('Convert', self.value, res);
                    self.setSelection(initialIDs);
                    self.loading = false;
                }, function(err) {
                    self.loading = false;
                })
                return promise;
            }
        }
    },
    watch: {
        'value': function() {
            //Set the value so update the selection
            this.setSelection(this.value);
        },
        'selection': function() {
            console.log('SELECTION')
            var self = this;
            //Emit the change
            this.$emit('input', self.selection);

        }
    },
    methods: {
        showModal() {

            // console.log('SHOW MODAL', this.$fluro.modal)
            var self = this;

            //////////////////////////////////////

            var promise = self.$fluro.modal({
                component:RealmSelectModal,
                options: {
                    selector:self,
                    fixed:true,
                }
            });

            //////////////////////////////////////

            // promise.then(function(res) {}, function(err) {})
        },
        toggleRealm(realm) {
            console.log('TOGGLE REALM');
            this.toggle(realm);
        }
    }
}
</script>
<style scoped lang="scss">


.label{
    max-width: 150px;
    text-overflow: ellipsis;
    overflow: hidden;;
    white-space: nowrap;
}

</style>