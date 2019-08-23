<template>
    <div class="realm-select">
        <template v-if="expanded">
            
            <v-layout row wrap>
                <v-flex xs12 sm4 md3 v-for="type in tree">
                    <v-select :outline="outline" :return-object="true" :label="type.plural" :multiple="true" v-model="selection" item-text="title" :items="type.realms"></v-select>
                </v-flex>
            </v-layout>
            
        </template>
        <template v-if="!expanded">
            <v-btn class="mx-0" color="primary" dark @click="dialog = true">{{selection.length}} {{title}} Selected</v-btn>
            <v-dialog content-class="realm-dialog" :fullscreen="realmSelectFullScreen" v-model="dialog">
                <!-- fullscreen hide-overlay transition="dialog-bottom-transition" scrollable -->
                <v-card tile>
                    <v-toolbar card dark color="primary">
                        <v-toolbar-title>{{selection.length}} {{title}}</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-btn dark icon flat @click="realmSelectFullScreen = !realmSelectFullScreen">
                                <v-icon>{{ realmSelectFullScreen ? 'fullscreen_exit' :'fullscreen'}}</v-icon>
                            </v-btn>
                            <v-btn @click="dialog = false">
                                Done
                                <v-icon right>check</v-icon>
                            </v-btn>
                        </v-toolbar-items>
                    </v-toolbar>
                    <template v-if="tree.length == 1">
                        <div class="flex-tabs">
                            <constrain gutterless xs :class="{'has-selection':selection.length}">
                                <div class="realm-select-item-outer">
                                    <v-list dense class="children">
                                        <template v-for="realm in tree[0].realms">
                                            <fluro-realm-select-item :item="realm" :check="isSelected" :callback="toggleRealm" />
                                        </template>
                                    </v-list>
                                </div>
                            </constrain>
                        </div>
                    </template>
                    <template v-if="tree.length > 1">
                        <v-tabs class="flex-tabs" :show-arrows="true" dark :centered="true" :grow="true" v-model="active">
                            <v-tab v-for="type in tree" :key="type.definitionName" ripple>
                                {{type.plural}}
                            </v-tab>
                            <v-tab-item v-for="type in tree" :key="type.definitionName">
                                <constrain gutterless xs :class="{'has-selection':selection.length}">
                                    <v-card flat class="tab-content">
                                        <div class="realm-select-item-outer">
                                            <v-list dense class="children">
                                                <template v-for="realm in type.realms">
                                                    <fluro-realm-select-item :item="realm" :check="isSelected" :callback="toggleRealm" />
                                                </template>
                                            </v-list>
                                        </div>
                                    </v-card>
                                </constrain>
                            </v-tab-item>
                        </v-tabs>
                    </template>
                </v-card>
            </v-dialog>
        </template>
    </div>
</template>
<script>
import Vue from 'vue';
import FluroRealmSelectItem from './FluroRealmSelectItem.vue';
import FluroSelectionMixin from '../../mixins/FluroSelectionMixin';
import Layout from '../../mixins/Layout';
import { mapFields } from 'vuex-map-fields';

export default {
    computed: {
        ...mapFields('fluro', [
            'realmSelectFullScreen', //The authenticated user if they log in
        ]),
        title() {
            var tree = this.tree;
            if (tree.length == 1) {
                return _.first(tree).plural;
            } else {
                return 'Realms';
            }
        }
    },
    components: {
        FluroRealmSelectItem,
    },
    mixins: [Layout, FluroSelectionMixin],
    props: {
        'outline': {
            type:Boolean,
        },
        'expanded':{
            type:Boolean,
        },
        'value': {
            type: Array,
            default: function() {
                return [];
            },
        },
        'type': {
            type: String,
        },
        'definition': {
            type: String,
        }
    },
    data() {
        return {
            dialog: false,
            // selection: this.value,
            active: 0,
        }
    },
    asyncComputed: {
        tree: {
            default: [],
            get() {


                var self = this;

                // service.retrieveSelectableRealms = function(action, type, parentType, options) {



                // //Load all the realms of the user
                // var self = this;


                // return new Promise(function(resolve, reject) {
                // service.retrieveSelectableRealms = function(action, type, parentType, options) {

                return self.$fluro.access.retrieveSelectableRealms('create', this.definition, this.type)
                //   .then(
                //     function(res) {

                //       var mapped = _.map(res)
                //       return resolve(mapped);
                //     },
                //     reject);

                // });

                //     return res
                //     return resolve(sorted);
                // }, reject);

                //     self.$fluro.access.retrieveSelectableRealms = function('create', self.type, self.parentType, options), {
                //             types: ['article']
                //         })
                //         .then(function(res) {

                //             return resolve(res.data);
                //         }, reject);
                // });



            }
        }
    },
    watch: {
        'value': function() {
            this.setSelection(this.value);
        },
        'selection': function() {
            var self = this;
            this.$emit('input', self.selection); //[self.key])

        }
    },
    methods: {
        toggleRealm(realm) {
            console.log('TOGGLE REALM');

            this.toggle(realm);
        }
    }
}
</script>
<style lang="scss">
$bg-color: #eaedf2;
$line-color: darken($bg-color, 10%);



@mixin flex-column {
    overflow: hidden;
    // border: 10px solid pink;
    flex: 1;
    display: flex;
    flex-direction: column;
}

.flex-tabs {
    background: #eaedf2;
}

.realm-dialog {
    background: $bg-color;
    max-width: 500px;
    width: auto;
    @include flex-column;



    .flex-fill {
        background: $bg-color;
        flex: 1;
        display: flex;
        overflow: auto;
        padding: 25px 0;
    }

    &>.v-card {
        @include flex-column;

        &>.v-tabs {
            @include flex-column;

            &>.v-window {

                @include flex-column;
                overflow: auto;
            }
        }


    }

    &.v-dialog--fullscreen {
        max-width: none;
        left: 0 !important;
        right: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        overflow: hidden !important;
    }

    .has-selection {
        .realm-select-item {
            background: lighten($bg-color, 3%);

            &.selected {

                background: #fff;
                border-color: $line-color;
                color: #333;


                .v-list__tile__title {
                    font-weight: 600;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .v-list__tile__action {
                    opacity: 1;
                }
            }
        }
    }

    .v-tabs__item {
        font-size: 12px;
    }



}


.realm-select-item-outer {
    background: $bg-color;
    padding: 0 5px 0 15px;

    .v-list {
        background: none !important;
    }

    &.has-children+.realm-select-item-outer {
        &>.realm-select-item:first-child {
            border-top: 1px solid $line-color !important;
        }
    }

    .realm-select-item {
        border: 1px solid $line-color;
        display: block;
        padding: 0 10px;

        color: #888;
        padding: 0;
        position: relative;
        background: #fff;

        &:first-child {
            border-top: none;
        }

        &:before {
            content: '';
            border-top: 1px solid $line-color;
            position: absolute;
            left: -16px;
            top: 19px;
            width: 15px;
            height: 2px;
            display: block;
        }

        .v-list__tile__action {
            opacity: 0;
        }


        .dot {
            border-radius: 100%;
            display: inline-block;
            width: 10px;
            height: 10px;
            margin-right: 10px;
            background-color: rgba(#444, 0.3);
        }
    }

    .children {
        padding: 0px 0 15px;
        margin-left: 21px;
        border-left: 1px solid $line-color;
        position: relative;

        &:before {
            content: '';
            position: absolute;
            width: 1px;
            height: 20px;
            display: block;
            left: -1px;
            border-left: 1px solid $line-color;
            top: 0;
        }

        &:after {
            content: '';
            position: absolute;
            width: 1px;
            height: 36px;
            display: block;
            left: -1px;
            border-left: 1px solid $bg-color;
            bottom: 0;
        }
    }
}
</style>