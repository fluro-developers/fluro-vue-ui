<template>

    <!-- v-hide="onlyOneOption" -->
    <div class="realm-select" v-show="visibleSingle || !singleOptionAvailable">
        <template v-if="selectionAvailable">
            <v-btn :small="small" :block="block" class="pill mx-0" @click.native="showModal">
                <fluro-realm-dots :realms="selection" />
                <span class="label">{{selectionSummary}}</span>
            </v-btn>
        </template>
        <template v-else>
            <v-btn :small="small" :block="block" class="pill mx-0" :disabled="true">
                <fluro-realm-dots :realms="value" />
                <span class="label">{{valueSummary}}</span>
            </v-btn>
        </template>
        <!-- <pre>{{type}} {{definition}}</pre> -->
</div>
</template>
<script>
import Vue from 'vue';
import _ from 'lodash';


import FluroRealmDots from '../../ui/FluroRealmDots.vue';
import FluroRealmSelectItem from './FluroRealmSelectItem.vue';
import FluroSelectionMixin from '../../../mixins/FluroSelectionMixin';
import Layout from '../../../mixins/Layout';

///////////////////////////////////////////////

import RealmSelectModal from './RealmSelectModal.vue';

///////////////////////////////////////////////

export default {
    computed: {
        selectionAvailable() {
            return this.tree.length;
        },
        singleOption: {
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



                if (this.filterDiscriminator) {
                    return this.filterDiscriminator;
                }

                return 'realm';
            }
        },
        title() {
            return this.$fluro.types.readable(this.mainType, false, 'realm');
        },
        plural() {
            return this.$fluro.types.readable(this.mainType, true, 'realm');
        },
        valueSummary() {
            var self = this;
            if (!self.value) {
                return;
            }

            if (!self.value.length) {
                return `Select ${self.plural}`
            }

            if (self.value.length > 3) {
                return `${self.value.length} ${self.plural} selected`;
            }

            return _.map(self.value, 'title').join(', ');
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
        visibleSingle:{
            type:Boolean,
        },
        small: {
            type: Boolean,
        },
        block: {
            type: Boolean,
        },
        'action': {
            type: String,
            default: 'create',
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

                                //Include any kind of team
                                if (self.filterDiscriminator == 'team') {
                                    return (realmType._discriminatorType == 'team');
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


                            var plainRealms = _.filter(flattenedLookup, function(realm) {
                                return realm.basic;
                            });


                            //////////////////////////////////////

                            var initialIDs = _.chain(self.$fluro.utils.arrayIDs(self.value))
                                .map(function(id) {
                                    return flattenedLookup[id];
                                })
                                .compact()
                                .value();

                            //////////////////////////////////////

                            resolve(filtered);


                            // console.log('FILTERED AVAILABLE', initialIDs, flattenedIDs, filtered, allRealms);

                            //////////////////////////////////////

                            var singleOption = false;
                            if (initialIDs && initialIDs.length) {
                                // console.log('Convert', self.value, res);

                                // console.log('SET INITIAL', initialIDs, self)
                                self.setSelection(initialIDs);
                            } else {

                                if (flattenedIDs.length == 1) {
                                    // console.log('SET FLATTENED', flattenedIDs);
                                    self.setSelection(flattenedIDs);
                                } else if(plainRealms.length == 1) {
                                    self.setSelection(plainRealms);
                                    console.log('PLAIN REALMS 1')
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
