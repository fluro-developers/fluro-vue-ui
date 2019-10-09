<template>
    <!-- <flex-column> -->
    <flex-column class="realm-select-modal" style="max-width: 500px;">
        <flex-column v-if="loading">
            <v-container class="text-xs-center">
                <v-progress-circular indeterminate />
            </v-container>
        </flex-column>
        <template v-else>
            <flex-column-header class="border-bottom">
                <v-container py-2>
                    <v-layout row align-center>
                        <v-flex>
                            <h3>Select Realms</h3>
                        </v-flex>
                        <div>
                            <v-btn color="primary" class="ma-0" @click="dismiss()">
                                Done
                            </v-btn>
                        </div>
                    </v-layout>
                </v-container>
            </flex-column-header>
            <flex-column>
                <fluro-tabset>
                    <fluro-tab :heading="type.plural" :key="type.definitionName" v-for="type in tree">
                        <flex-column-body class="realm-select-item-outer" :class="{'has-selection':selection.length}">
                            <!-- <constrain gutterless xs > -->
                            <!-- <div class="realm-select-item-outer"> -->
                            <div class="children">
                                <template v-for="realm in type.realms">
                                    <!-- {{isSelected(realm)}} -->
                                    <fluro-realm-select-item :item="realm" :check="isSelected" :callback="toggleRealm" />
                                </template>
                            </div>
                            <!-- </div> -->
                            <!-- </constrain> -->
                        </flex-column-body>
                    </fluro-tab>
                </fluro-tabset>
            </flex-column>

           
            <flex-column-footer class="border-top" v-if="selector.selection.length">
                <v-container pa-1>
                    <v-btn small flat @click="selector.deselectAll()">
                        Deselect all {{selector.selection.length}}
                    </v-btn>
                </v-container>
            </flex-column-footer>
        </template>
    </flex-column>
    <!-- </flex-column> -->
</template>
<script>
import ModalMixin from '../../../mixins/ModalMixin';
import Layout from '../../../mixins/Layout';
import FluroRealmSelectItem from './FluroRealmSelectItem.vue';
import FluroTabset from '../../ui/tabset/FluroTabset.vue';
import FluroTab from '../../ui/tabset/FluroTab.vue';

export default {
    props: {
        options: {
            type: Object
        }
    },
    components: {
        FluroRealmSelectItem,
        FluroTabset,
        FluroTab,
    },
    mixins: [ModalMixin, Layout],
    data() {
        return {
            selector: this.options.selector,
        }
    },
    methods: {
        isSelected(item) {
            return this.selector.isSelected(item);
        },
        toggleRealm(item) {
            return this.selector.toggleRealm(item);
        },
    },
    computed: {
        selection() {
            return this.selector.selection;
        },
        tree() {
            return this.selector.tree;
        },
        loading() {
            return this.selector.loading;
        },
        ids() {
            return this.$fluro.utils.arrayIDs(this.options.items);
        },
    },
}
</script>
<style lang="scss">
$bg-color: #eaedf2;
$line-color: darken($bg-color, 10%);

.realm-select-modal {

     max-height: 80vh;
    .tabset {
        .tabset-menu {
            background: #333;
            color: #fff;

            a {
                border: none !important;
                padding: 20px 15px;

                &.active {
                    background: none;
                    opacity: 1;
                    border: none;
                }
            }
        }
    }

    .flex-tabs {
        background: #eaedf2;
    }




    .realm-select-item-outer {
        background: $bg-color;
        padding: 0 5px 0 15px;

        &.has-children+.realm-select-item-outer {
            &>.realm-select-item:first-child {
                border-top: 1px solid $line-color !important;
            }
        }

        .realm-select-item {
            border: 1px solid $line-color;
            display: block;
            padding: 10px;

            color: #888;
            position: relative;
            background: #fff;
            font-weight: 400;
            cursor: pointer;

            &:hover {
                background: #fafafa;
            }


            .type {
                font-weight: 1 !important;
                font-style: italic !important;
                font-size: 0.9em !important;
                opacity: 0.5;
            }

            .check-icon {
                width: 35px;
                text-align: right;
            }



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

            @media(max-width: 768px) {
                margin-left: 5px;
            }

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


    .has-selection {
        .realm-select-item {
            background: lighten($bg-color, 1%);




            &.selected {

                background: #fff;
                border-color: $line-color;
                color: #333;



                font-weight: 600;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;



            }
        }
    }





}
</style>