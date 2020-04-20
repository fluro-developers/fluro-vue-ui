<template>
    <!-- v-hide="onlyOneOption" -->
    <div class="realm-select" v-show="!singleOptionAvailable">
        <v-btn :small="small" :block="block" class="pill mx-0" @click.native="showModal">
            <fluro-realm-dots :realms="selection" />
            <span class="label">{{selectionSummary}}</span>
        </v-btn>
        <!-- <pre>{{type}} {{definition}}</pre> -->
    </div>
</template>
<script>
import Vue from 'vue';
import FluroRealmDots from 'src/components/ui/FluroRealmDots.vue';
import FluroRealmSelectItem from 'src/components/form/realmselect/FluroRealmSelectItem.vue';
import FluroSelectionMixin from 'src/mixins/FluroSelectionMixin';
import Layout from 'src/mixins/Layout';

///////////////////////////////////////////////

import RealmSelectModal from 'src/components/form/realmselect/RealmSelectModal.vue';

///////////////////////////////////////////////

export default {
    computed: {

        singleOption:{
            get() {
                return this.singleOptionAvailable;
            },
            set(payload) {
                this.singleOptionAvailable = payload;
                this.$emit('single', payload);
            },
        },
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
        small: {
            type: Boolean,
        },
        block: {
            type: Boolean,
        },
        'action':{
            type:String,
            default:'create',
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
        },
        'filterDiscriminator': {
            type: String,
        }
    },
    data() {
        return {
            singleOptionAvailable: true,
            loading: true,
        }
    },
    asyncComputed: {
        tree: {
            default: [],
            get() {
                var self = this;
                self.loading = true;

                //////////////////////////////////////

                function mapFlat(realm, memo) {
                    memo[realm._id] = realm;
                    if (realm.children && realm.children.length) {
                        _.each(realm.children, function(realm) {
                            mapFlat(realm, memo);
                        })
                    }
                }

                //////////////////////////////////////

                return new Promise(function(resolve, reject) {

                    self.$fluro.access
                        .retrieveSelectableRealms(self.action, self.definition, self.type)
                        .then(function(allRealms) {



                            var filtered = _.filter(allRealms, function(realmType) {
                                if (!self.filterDiscriminator || !self.filterDiscriminator.length) {
                                    return true;
                                }

                                return (realmType.definition == self.filterDiscriminator)
                            })


                            // console.log('ALL REALMS', allRealms, self.filterDiscriminator, filtered, self.definition, self.type)
                            //////////////////////////////////////

                            var flattenedLookup = _.reduce(allRealms, function(set, realmType) {
                                _.each(realmType.realms, function(realm) {
                                    mapFlat(realm, set);
                                });
                                return set;
                            }, {});

                            var flattenedIDs = _.map(flattenedLookup, function(realm) {
                                return realm;
                            });

                            // console.log('FLATTENED', flattened)

                            //////////////////////////////////////

                            var initialIDs = _.chain(self.$fluro.utils.arrayIDs(self.value))
                            .map(function(id) {
                                return flattenedLookup[id];
                            })
                            .compact()
                            .value();

                            //////////////////////////////////////

                            resolve(filtered);

                            //////////////////////////////////////

                            var singleOption = false;
                            if (initialIDs && initialIDs.length) {
                                // console.log('Convert', self.value, res);

                                // console.log('SET INITIAL', initialIDs)
                                self.setSelection(initialIDs);
                            } else {
                                if (flattenedIDs.length == 1) {
                                    // console.log('SET FLATTENED', flattenedIDs);
                                    self.setSelection(flattenedIDs);
                                }
                            }

                            if (flattenedIDs.length == 1) {
                                singleOption = true;
                            }


                            self.singleOption = singleOption;
                            self.loading = false;
                        }, function(err) {
                            reject(err);
                            self.loading = false;
                        })

                })
            }
        }
    },
    watch: {
        'value': function() {
            //Set the value so update the selection
            this.setSelection(this.value);
        },
        'selection': function() {
            // console.log('SELECTION')
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
                component: RealmSelectModal,
                options: {
                    selector: self,
                    fixed: true,
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
.label {
    max-width: 150px;
    text-overflow: ellipsis;
    overflow: hidden;
    ;
    white-space: nowrap;
}
</style>