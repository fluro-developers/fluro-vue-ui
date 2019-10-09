<template>
    <!-- <flex-column> -->
    <flex-column class="content-select-modal">
        <flex-column v-if="loading">
            <v-container fluid class="text-xs-center">
                <v-progress-circular indeterminate />
            </v-container>
        </flex-column>
        <template v-else>
            <!-- <fluro-content-browser :minimum="minimum" :maximum="maximum" :type="type" @close="closeModal()" v-model="model"></fluro-content-browser> -->
            <flex-column-header class="border-bottom">
                <v-container fluid pa-2>
                    <v-layout row align-center>
                        <template v-if="$vuetify.breakpoint.smAndUp">
                            <v-flex shrink>

                                <h5><fluro-icon left :type="type"/> {{modalTitle}}</h5>
                            </v-flex>
                            <v-spacer />
                        </template>
                        <v-flex>
                            <!--   -->
                            <template v-if="!showFilters">
                                <div class="search" :class="{active:searchFocussed || search.length}">
                                    <input v-model="search" @focus="searchFocussed = true" @blur="searchFocussed = false" placeholder="Search by keyword" />
                                    <div class="search-icon" @click="search = ''">
                                        <fluro-icon icon="times" v-if="search.length" />
                                        <fluro-icon icon="search" v-else />
                                    </div>
                                </div>
                            </template>
                        </v-flex>
                        
                        <v-spacer />
                        <v-flex shrink v-if="$vuetify.breakpoint.smAndUp">
                            <v-btn icon small class="my-0" @click="showFilters = !showFilters">
                                <fluro-icon icon="filter" />
                            </v-btn>
                        </v-flex>
                        <v-flex shrink>
                            <v-btn color="primary" small class="my-0 mr-0" @click="close()">
                                Done
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-container>
            </flex-column-header>
            <flex-column>
                <!-- v-show="$vuetify.breakpoint.smAndUp || !showFilters" -->
                <v-layout fill-height>
                    <flex-column style="min-height:50vh;">
                        <!-- :init-page="$route.query.page"  :init-sort="{sortKey:$route.query.sortKey, sortDirection:$route.query.sortDirection, sortType:$route.query.sortType}" @raw="rowsChanged" @filtered="filteredChanged" @page="pageChanged" @sort="sortChanged"  -->
                        <fluro-dynamic-table :enable-actions="false" :filter-config="filterConfig" :selection-controller="selector" :clicked="rowClicked" :search="search" :data-type="type" :columns="columns" @raw="rowsChanged" @filtered="filteredChanged" @page="pageChanged" @sort="sortChanged" />
                    </flex-column>
                    <div class="filter-sidebar scroll-y" v-show="showFilters">
                        <v-container pa-2>
                            <div class="search" :class="{active:searchFocussed || search.length}">
                                <input v-model="search" @focus="searchFocussed = true" @blur="searchFocussed = false" placeholder="Keyword search" />
                                <div class="search-icon" @click="search = ''">
                                    <fluro-icon icon="times" v-if="search.length" />
                                    <fluro-icon icon="search" v-else />
                                </div>
                            </div>
                        </v-container>
                        <filter-condition-group :rows="rows" :mini="true" v-model="filterConfig" :type="type" :debounce="filterDebounce" />
                    </div>
                </v-layout>
                <!-- <fluro-tabset>
                    <fluro-tab :heading="type.plural" :key="type.definitionName" v-for="type in tree">
                        <flex-column-body class="realm-select-item-outer" :class="{'has-selection':selection.length}">
                            <div class="children">
                                <template v-for="realm in type.realms">
                                    <fluro-realm-select-item :item="realm" :check="isSelected" :callback="toggleRealm" />
                                </template>
                            </div>
                        </flex-column-body>
                    </fluro-tab>
                </fluro-tabset> -->
            </flex-column>
            <!-- <flex-column-footer class="border-top" v-if="selector.selection.length">
                <v-container class="py-1 px-2">
                    <v-layout row align-center>
                        <v-flex shrink class="sm muted">
                            {{selector.selection.length}} selected
                        </v-flex>
                        <v-spacer />
                        <v-flex shrink class="text-xs-right">
                            <v-btn class="ma-0" small flat @click="selector.deselectAll()">
                                Deselect all {{selector.selection.length}}
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-container>
            </flex-column-footer> -->
        </template>
    </flex-column>
    <!-- </flex-column> -->
</template>
<script>
import ModalMixin from '../../../mixins/ModalMixin';
import Layout from '../../../mixins/Layout';
import FluroTabset from '../../ui/tabset/FluroTabset.vue';
import FluroTab from '../../ui/tabset/FluroTab.vue';


/////////////////////////////////////////

import FluroDynamicTable from '@/components/table/DynamicTable.vue';

//Filter Stuff
import FilterConditionGroup from '../filters/FilterConditionGroup.vue';


/////////////////////////////////////////

import RealmDotCell from '@/components/table/cells/RealmDotCell.vue';
import DateCell from '@/components/table/cells/DateCell.vue';
import TitleCell from '@/components/table/cells/TitleCell.vue';
import StatusCell from '@/components/table/cells/StatusCell.vue';
import DefinitionCell from '@/components/table/cells/DefinitionCell.vue';
import ThumbnailCell from '@/components/table/cells/ThumbnailCell.vue';

/////////////////////////////////////////

import {FilterService} from 'fluro';


/////////////////////////////////////////

export default {
    props: {
        options: {
            type: Object
        }
    },
    components: {
        FilterConditionGroup,
        FluroTabset,
        FluroTab,
        FluroDynamicTable,
        RealmDotCell,
        DateCell,
        TitleCell,
        StatusCell,
        DefinitionCell,
        ThumbnailCell,
    },
    mixins: [ModalMixin, Layout],
    data() {

        var defaultFilter = JSON.parse(JSON.stringify({
            operator: 'and',
            filters: [{
                operator: 'and',
                filters: [{
                    key: 'status',
                    comparator: 'in',
                    values: ['active', 'draft'],
                }]
            }]
        }));

        ///////////////////////////////////////

        return {
            sorted: [],
            rows: [],
            search: '',
            searchFocussed: false,
            showFilters: false,
            filterConfig: defaultFilter,
            selector: this.options.selector,
        }
    },
    methods: {
        rowClicked(item) {
            this.selector.toggle(item);
        },
        isSelected(item) {
            return this.selector.isSelected(item);
        },
        toggleRealm(item) {
            return this.selector.toggleRealm(item);
        },
        resetFilter() {
            this.filterConfig = {}
        },
        filteredChanged(rows) {
            this.sorted = rows;
        },
        rowsChanged(rows) {
            this.rows = rows;
        },
        pageChanged(pageNumber) {
            this.$router.push({ query: Object.assign({}, this.$route.query, { page: pageNumber }) });
        },
        sortChanged(sortingDetails) {
            this.$router.replace({ query: Object.assign({}, this.$route.query, sortingDetails) });
        },
    },
    computed: {
        filterChangeString() {
            return FilterService.getFilterChangeString(this.filterConfig);
        },
        filterDebounce() {
            if (this.$vuetify.breakpoint.smAndDown) {
                return 1500;
            } else {
                return 700
            }
        },
        modalTitle() {
            var count = this.selector.selection.length;

            if (!count) {
                return `Select ${this.plural}`
            }

            if (count == 1) {
                return `1 ${this.title} selected`
            }


            return `${count} ${this.plural} selected`

        },
        type() {
            return this.options.type;
        },
        parentType() {
            var parentType = this.$fluro.types.parentType(this.type);
            return parentType;
        },
        title() {
            return this.$fluro.types.readable(this.type, false);
        },
        plural() {
            return this.$fluro.types.readable(this.type, true);
        },
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
        columns() {

            var array = [
                { title: '', shrink: true, align: "center", key: 'realms', renderer: RealmDotCell },

            ];

            switch (this.parentType) {
                case 'image':
                    array = array.concat([
                        { title: 'Thumbnail', key: '_id', renderer: ThumbnailCell },
                        { title: 'Title', key: 'title', renderer: TitleCell },
                        { title: 'Width', key: 'width', sortType: 'number' },
                        { title: 'Height', key: 'height', sortType: 'number' },
                    ]);
                    break;
                default:
                    array = array.concat([
                        { title: 'Title', key: 'title', renderer: TitleCell },
                    ]);
                    break;
            }


            array = array.concat([
                { title: 'Definition', key: 'definition', shrink: true, renderer: DefinitionCell },
                { title: 'Status', key: 'status', shrink: true, renderer: StatusCell },
                { type: 'date', title: 'Updated', shrink: true, key: 'updated', renderer: DateCell, sortType: 'date' },
                { type: 'date', title: 'Created', shrink: true, key: 'created', renderer: DateCell, sortType: 'date' },
            ])


            return array;
        }
    },

    watch: {
        type() {
            this.filterConfig = JSON.parse(JSON.stringify(defaultFilters))
            this.$router.replace({ query: Object.assign({}, this.$route.query, { filter: JSON.stringify(this.filterConfig) }) });
        },
        filterChangeString() {
            this.$router.replace({ query: Object.assign({}, this.$route.query, { filter: JSON.stringify(this.filterConfig) }) });
        }
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