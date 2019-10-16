<template>
    <div class="fluro-table-wrapper">
        <!-- <pre>{{dataType}}</pre> -->
        <!-- <pre>{{renderColumns}}</pre> -->
        <!-- <pre>{{totalPages}}</pre> -->
        <fluro-page-preloader v-if="showLoading" contain />
        <v-container class="flex-center" v-if="!showLoading && !page.length">
            <slot name="emptytext">
                No {{dataType | definitionTitle(true)}} were found matching your criteria
            </slot>
        </v-container>
        <template v-else>
            <div ref="scrollableArea" class="fluro-table-scroll" :class="{loading:showLoading}">
                <span ref="top"></span>
                <table class="fluro-table-main no-select">
                    <thead>
                        <tr>
                            <th class="shrink checkbox-cell" v-if="selectionEnabled">
                                <v-menu @click.native.stop offset-y>
                                    <template v-slot:activator="{ on }">
                                        <div v-on="on">
                                            <div is="table-header-checkbox" :all="allSelected" :some="someSelected" />
                                        </div>
                                    </template>
                                    <v-card tile>
                                        <v-list dense>
                                            <v-list-tile v-if="!allSelected" @click="selectPage()">
                                                <v-list-tile-content>
                                                    <v-list-tile-title>
                                                        Select this page
                                                    </v-list-tile-title>
                                                </v-list-tile-content>
                                            </v-list-tile>
                                            <v-list-tile v-if="someSelected" @click="deselectPage()">
                                                <v-list-tile-content>
                                                    <v-list-tile-title>
                                                        Deselect this page
                                                    </v-list-tile-title>
                                                </v-list-tile-content>
                                            </v-list-tile>
                                            <v-list-tile v-if="filteredTotal" @click="selectAll()">
                                                <v-list-tile-content>
                                                    <v-list-tile-title>
                                                        Select all {{filteredTotal}} items
                                                    </v-list-tile-title>
                                                </v-list-tile-content>
                                            </v-list-tile>
                                            <v-list-tile @click="deselectAll()" v-if="selectionController.selection.length">
                                                <v-list-tile-content>
                                                    <v-list-tile-title>
                                                        Deselect all {{filteredTotal}} items
                                                    </v-list-tile-title>
                                                </v-list-tile-content>
                                            </v-list-tile>
                                        </v-list>
                                    </v-card>
                                </v-menu>
                            </th>
                            <th @click="toggleSort(column)" :class="{'shrink':column.shrink, sortable:isSortable(column), 'sorting':sort.sortKey == column.key, 'text-xs-center':column.align == 'center', 'text-xs-right':column.align =='right'}" v-for="column in renderColumns">
                                <template v-if="column.icon">
                                    <fluro-icon v-tippy :content="column.title" library="fas" :icon="column.icon" />
                                </template>
                                <template v-else>
                                    <div class="sort-icon" v-if="isActiveSort(column.key)">
                                        <fluro-icon library="fas" icon="caret-down" v-if="sort.sortDirection == 'desc'" />
                                        <fluro-icon library="fas" icon="caret-up" v-if="sort.sortDirection == 'asc'" />
                                    </div>
                                    {{column.title}}
                                </template>
                            </th>
                            <th class="shrink" v-if="actionsEnabled">
                                <!--  <v-menu @click.native.stop offset-y>
                                    <template v-slot:activator="{ on }">
                                        <v-btn class="ma-0" small icon>
                                            <fluro-icon icon="cog" />
                                        </v-btn>
                                    </template>
                                    <v-card tile>
                                        Select Fields -->
                                <!-- <v-list dense>
                                            <v-list-tile v-if="!allSelected" @click="selectPage()">
                                                <v-list-tile-content>
                                                    <v-list-tile-title>
                                                        Select this page
                                                    </v-list-tile-title>
                                                </v-list-tile-content>
                                            </v-list-tile>
                                            <v-list-tile v-if="someSelected" @click="deselectPage()">
                                                <v-list-tile-content>
                                                    <v-list-tile-title>
                                                        Deselect this page
                                                    </v-list-tile-title>
                                                </v-list-tile-content>
                                            </v-list-tile>
                                            <v-list-tile v-if="filteredTotal" @click="selectAll()">
                                                <v-list-tile-content>
                                                    <v-list-tile-title>
                                                        Select all {{filteredTotal}} items
                                                    </v-list-tile-title>
                                                </v-list-tile-content>
                                            </v-list-tile>
                                            <v-list-tile @click="deselectAll()" v-if="selectionController.selection.length">
                                                <v-list-tile-content>
                                                    <v-list-tile-title>
                                                        Deselect all {{filteredTotal}} items
                                                    </v-list-tile-title>
                                                </v-list-tile-content>
                                            </v-list-tile>
                                        </v-list> -->
                                <!-- </v-card> -->
                                <!-- </v-menu> -->
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-if="grouped">
                            <template v-for="group in grouped">
                                <tr class="breaker" v-if="group.title">
                                    <th></th>
                                    <!-- <td></td> -->
                                    <!-- <th is="table-row-checkbox" :checked="selectionController.allSelected(group)"/> -->
                                    <td :colspan="1 + renderColumns.length">{{group.title}}</td>
                                </tr>
                                <tr :class="classes(item)" :key="item._id" v-for="(item, key) in group.items">
                                    <template v-if="item._populating">
                                        <!-- <th>TEST {{selection.isSelected(item)}}</th> -->
                                        <th is="table-row-checkbox" />
                                        <td @click.native="clicked(item, column, key)" :colspan="columns.length">-</td>
                                        <th class="shrink">
                                        </th>
                                    </template>
                                    <template v-else>
                                        <th is="table-row-checkbox" :checked="selectionController.isSelected(item)" @click.native.stop.prevent="checkboxClick(item, $event, item._pageIndex)" :value="item" />
                                        <table-cell @click.native="clicked(item, column, key)" :row="item" v-for="column in renderColumns" :class="{'sorting':sort.sortKey == column.key}" :column="column" />
                                        <th class="shrink">
                                            <!-- {{item._id}} -->
                                            <div class="action-buttons">
                                                <!-- <pre>{{item._relevance}}</pre> -->
                                                <!-- <v-btn class="ma-0" v-if="$vuetify.breakpoint.mdAndUp" small icon>
                                            <fluro-icon icon="pencil" />
                                        </v-btn> -->
                                                <v-btn class="ma-0" small icon @click.stop.prevent="$actions.open([item])">
                                                    <fluro-icon icon="ellipsis-h" />
                                                </v-btn>
                                                <!--  <v-btn class="ma-0" v-if="$vuetify.breakpoint.mdAndUp" small icon>
                                            <fluro-icon icon="trash-alt" />
                                        </v-btn> -->
                                            </div>
                                        </th>
                                    </template>
                                </tr>
                            </template>
                        </template>
                        <template v-else>
                            <tr :class="classes(item)" :key="item._id" v-for="(item, key) in page">
                                <template v-if="item._populating">
                                    <!-- <th>TEST {{selection.isSelected(item)}}</th> -->
                                    <th is="table-row-checkbox" v-if="selectionEnabled" />
                                    <td @click.native="clicked(item, column, key)" :colspan="renderColumns.length">-</td>
                                    <th class="shrink" v-if="actionsEnabled">
                                    </th>
                                </template>
                                <template v-else>
                                    <th is="table-row-checkbox" v-if="selectionEnabled" :checked="selectionController.isSelected(item)" @click.native.stop.prevent="checkboxClick(item, $event, key)" :value="item" />
                                    <table-cell @click.native="clicked(item, column, key)" :row="item" v-for="column in renderColumns" :class="{'sorting':sort.sortKey == column.key}" :column="column"></table-cell>
                                    <th class="shrink" v-if="actionsEnabled">
                                        <div class="action-buttons">
                                            <!-- <pre>{{item._relevance}}</pre> -->
                                            <!-- <v-btn class="ma-0" v-if="$vuetify.breakpoint.mdAndUp" small icon>
                                            <fluro-icon icon="pencil" />
                                        </v-btn> -->
                                            <v-btn class="ma-0" small icon @click.stop.prevent="$actions.open([item])">
                                                <fluro-icon icon="ellipsis-h" />
                                            </v-btn>
                                            <!--  <v-btn class="ma-0" v-if="$vuetify.breakpoint.mdAndUp" small icon>
                                            <fluro-icon icon="trash-alt" />
                                        </v-btn> -->
                                        </div>
                                    </th>
                                </template>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
            <div class="footer-stats">
                <v-layout row wrap>
                    <template v-if="!totalPages">
                        <v-flex class="text-muted">
                            No {{plural}}
                        </v-flex>
                    </template>
                    <template v-else>
                        <v-flex xs6 align-center d-flex class="text-muted">
                            <v-menu @click.native.stop offset-y>
                                <template v-slot:activator="{ on }">
                                    <div v-on="on">
                                        {{startOffset + 1 | numberWithCommas}} to {{endOffset | numberWithCommas}} of {{filteredTotal | numberWithCommas}} {{plural}}
                                    </div>
                                </template>
                                <v-card tile>
                                    <v-list dense>
                                        <v-list-tile @click="perPage = 50">
                                            <v-list-tile-content>
                                                <v-list-tile-title>
                                                    Show 50 per page
                                                </v-list-tile-title>
                                            </v-list-tile-content>
                                        </v-list-tile>
                                        <v-list-tile @click="perPage = 100">
                                            <v-list-tile-content>
                                                <v-list-tile-title>
                                                    Show 100 per page
                                                </v-list-tile-title>
                                            </v-list-tile-content>
                                        </v-list-tile>
                                        <v-list-tile @click="perPage = 200">
                                            <v-list-tile-content>
                                                <v-list-tile-title>
                                                    Show 250 per page
                                                </v-list-tile-title>
                                            </v-list-tile-content>
                                        </v-list-tile>
                                        <v-list-tile @click="perPage = 500">
                                            <v-list-tile-content>
                                                <v-list-tile-title>
                                                    Show 500 per page
                                                </v-list-tile-title>
                                            </v-list-tile-content>
                                        </v-list-tile>
                                    </v-list>
                                </v-card>
                            </v-menu>
                        </v-flex>
                        <v-flex xs6 align-center d-flex class="text-xs-right" style="white-space: nowrap">
                            <div>
                                <div class="pagenumber-select">
                                    <span v-if="$vuetify.breakpoint.smAndUp" class="text-muted">Page {{currentPage}} of {{totalPages}}</span>
                                    <select v-model="currentPage">
                                        <option :value="index+1" v-for="(page, index) in availablePages">{{index+1}}</option>
                                    </select>
                                </div>
                                <!-- <v-menu style="display:inline-block;" @click.native.stop offset-y>
                                    <template v-slot:activator="{ on }">
                                        <span v-on="on"  v-if="$vuetify.breakpoint.smAndUp" class="text-muted">Page {{currentPage}} of {{totalPages}}</span>
                                    </template>
                                    <v-card tile>
                                        <v-text-field></v-text-field>
                                        <v-list dense>
                                            <v-list-tile @click="currentPage = index" v-for="(page, index) in availablePages">
                                                <v-list-tile-content>
                                                    <v-list-tile-title>
                                                        {{index+1}}
                                                    </v-list-tile-title>
                                                </v-list-tile-content>
                                            </v-list-tile>
                                        </v-list>
                                    </v-card>
                                </v-menu> -->
                                <!-- <v-menu style="display:inline-block;" @click.native.stop offset-y>
                                    <template v-slot:activator="{ on }">
                                        <span v-on="on"  v-if="$vuetify.breakpoint.smAndUp" class="text-muted">Page {{currentPage}} of {{totalPages}}</span>
                                    </template>
                                    <v-card tile>
                                        <v-text-field autofocus small type="number" v-model="currentPage" />
                                        <v-text-field></v-text-field>
                                        <v-list dense>
                                            <v-list-tile @click="currentPage = index" v-for="(page, index) in availablePages">
                                                <v-list-tile-content>
                                                    <v-list-tile-title>
                                                        {{index+1}}
                                                    </v-list-tile-title>
                                                </v-list-tile-content>
                                            </v-list-tile>
                                        </v-list>
                                    </v-card>
                                </v-menu> -->

                                <span class="ml-3">
                                    <template>
                                        <v-btn class="ma-0" :disabled="previousPageDisabled" icon @click="firstPage()">
                                            <fluro-icon icon="arrow-to-left" />
                                        </v-btn>
                                        <v-btn class="ma-0" :disabled="previousPageDisabled" icon @click="previousPage()">
                                            <fluro-icon icon="arrow-left" />
                                        </v-btn>
                                    </template>
                                    <template>
                                        <v-btn class="ma-0" :disabled="nextPageDisabled" icon @click="nextPage()">
                                            <fluro-icon icon="arrow-right" />
                                        </v-btn>
                                        <v-btn class="ma-0" :disabled="nextPageDisabled" icon @click="lastPage()">
                                            <fluro-icon icon="arrow-to-right" />
                                        </v-btn>
                                    </template>
                                </span>
                            </div>
                        </v-flex>
                    </template>
                </v-layout>
            </div>
        </template>
        <!-- <template v-else>
            <v-container class="flex-center" v-if="!showLoading">
                No results found matching your criteria
            </v-container>
        </template> -->
    </div>
</template>
<script>
import TableHeaderCheckbox from './TableHeaderCheckbox.vue';
import TableRowCheckbox from './TableRowCheckbox.vue';
import TableCell from './TableCell.vue';

/////////////////////////////////

import axios from 'axios';
const CancelToken = axios.CancelToken;


import { FilterService } from 'fluro';

/////////////////////////////////

export default {
    props: {
        fixedColumns: {
            type: Boolean,
            default: false,
        },
        allDefinitions: {
            type: Boolean,
            default: false,
        },
        grouping: {
            type: Function,
        },
        includeArchivedByDefault: {
            type: Boolean,
        },
        enableSelection: {
            type: Boolean,
            default: true,
        },
        enableActions: {
            type: Boolean,
            default: true,
        },
        defaultSort: {
            type: String,
            default: 'title',
        },
        defaultSortType: {
            type: String,
            default: 'string',
        },
        defaultSortDirection: {
            type: String,
            default: 'asc',
        },
        selectionController: {
            type: Object,
            default () {
                return this.$selection;
            }
        },
        clicked: {
            type: Function,
            default () {
                // console.log('default')
                return function(item, column) {
                    // console.log('clicked', item, column);
                }
            }
        },
        columns: {
            type: Array,
            default () {
                return [];
            }
        },
        filterConfig: {
            type: Object,
            default () {
                return {
                    operator: 'and',
                    filters: [],
                }
            }
        },
        initPage: {
            type: [Number, String],
            default: 1,
        },
        initSort: {
            type: Object,
            default () {
                return {
                    key: this.defaultSort || 'title',
                    direction: this.defaultSortDirection || 'asc',
                    type: this.defaultSortType || 'string',
                }
            },
        },
        pageSize: {
            type: Number,
            default: 50,
        },
        dataType: {
            type: String,
        },
        search: {
            type: String,
        },
        startDate: {
            type: Date,
        },
        endDate: {
            type: Date,
        }
    },
    data() {
        return {
            all: [],
            rows: [],
            page: [],
            debouncedSearch: this.search,
            perPage: this.pageSize,
            loading: false,
            loadingItems: false,
            currentPage: parseInt(this.initPage),
            previousSelectionIndex: -1,
            sort: JSON.parse(JSON.stringify(this.initSort)),
        }
    },

    computed: {
        plural() {
            return this.$fluro.types.readable(this.dataType, true);
        },
        pagePopulationString() {
            return [this.currentPage, this.rawPage];
        },
        renderColumns() {

            var self = this;
            var array = self.columns ? self.columns.slice() : [];

            /////////////////////////////////////

            if (!self.fixedColumns) {
                var filterFields = _.chain(self.activeFilters || [])
                    .map(function(filter) {
                        // console.log('FILTER', filter);
                        if (filter.comparator) {
                            var column = {
                                title: filter.title || _.startCase(filter.key),
                                key: filter.key
                            }

                            //Treat as a date value
                            if (_.startsWith(filter.comparator, 'date') || filter.dataType == 'date') {
                                column.sortType =
                                    column.type = 'date';
                            }
                            // switch(filter.comparator) {
                            //     case 'datesameday':
                            //     case 'datenotyear':
                            //     case 'datemonthnotyear':
                            //     case 'datesameweek':
                            //     case 'datesamemonth':
                            //     case 'datesameyear':
                            //     case 'datesameweekday':
                            //     case 'datebefore':
                            //     case 'dateafter':
                            //     case 'datebetween':
                            //     case 'datenotbetween':
                            //         column.sortType = 
                            //         column.type = 'date';
                            //     break;
                            // }

                            return column;
                        }
                    })
                    .compact()
                    .value();

                /////////////////////////////////////

                _.each(filterFields, function(column) {
                    // console.log('COLUMN', column)
                    if (!_.some(array, { key: column.key })) {
                        array.push(column);
                    }
                })
            }

            /////////////////////////////////////

            return array;


        },

        dateWatchString() {

            if (!this.startDate) {
                return
            }

            if (!this.endDate) {
                return
            }

            return String(Date(this.startDate).setHours(0, 0, 0, 0).getTime()) + String(Date(this.endDate).setHours(0, 0, 0, 0).getTime());
        },
        grouped() {

            var self = this;

            if (self.grouping) {
                return self.grouping(self.page);
            } else {
                return;
            }
        },

        reloadRequired() {
            return `${this.dataType}-${this.filterCheckString} ${this.dateWatchString} ${this.sort.sortKey} ${this.sort.sortDirection} ${this.sort.sortType}  ${this.debouncedSearch}`;
        },
        selectionEnabled() {
            return !(this.enableSelection === false) && this.selectionController;
        },
        actionsEnabled() {
            return !(this.enableActions === false);
        },
        rowsTotal() {
            return this.rowsLoaded || this.rows.length || MAX_CHUNK_SIZE || MAX_ROWS;
        },
        showLoading() {
            return this.loading || this.loadingItems;
        },
        activeFilters() {
            return FilterService.activeFilters(this.filterConfig);
        },
        activeFilterRows() {
            return _.filter(this.activeFilters, function(row) {
                return row.comparator && row.comparator.length;
            })
        },
        activeFilterKeys() {
            return FilterService.activeFilterKeys(this.filterConfig);
        },
        activeFilterValues() {
            return FilterService.activeFilterValues(this.filterConfig);
        },
        activeFilterComparators() {
            return FilterService.activeFilterComparators(this.filterConfig);
        },
        activeFilterOperators() {
            return FilterService.activeFilterComparators(this.filterConfig);
        },
        rowCheckString() {
            // console.log('RECOMPUTE ROWS')
            var rows = this.rows || [];
            var ids = _.map(rows, '_id').join('');
            var keys = _.keys(rows[0]);

            return `${ids}${keys}`;
            // return _.chain(this.rows).map('_id').orderBy(function(id) {
            //     return id;
            // }).join('');
        },
        dateWatchString() {

            if (!this.startDate) {
                return
            }

            if (!this.endDate) {
                return
            }


            return String(this.startDate) + String(this.endDate);
        },
        filterCheckString() {

            var filterString = FilterService.getFilterChangeString(this.filterConfig);
            return filterString;
        },
        isAsync() {
            return this.dataType && this.dataType.length;
        },
        previousPageDisabled() {
            return this.currentPage <= 1;

        },
        nextPageDisabled() {
            return this.currentPage == this.totalPages;
        },
        filteredTotal() {
            return this.rows.length;
        },
        availablePages() {
            var chunk = _.chunk(this.rows, this.perPage);
            return chunk;
        },
        startOffset() {
            return Math.floor((this.currentPage - 1) * this.perPage);
        },
        endOffset() {
            return Math.min(this.startOffset + this.perPage, this.filteredTotal);
        },
        rawPage() {
            // console.log('RAW', this.currentPage, this.totalPages)
            if (this.currentPage > this.totalPages) {
                return _.first(this.availablePages);
            } else {
                return this.availablePages[this.currentPage - 1];
            }
        },
        totalPages() {
            return this.availablePages ? this.availablePages.length : 0;
        },
        allSelected() {

            var self = this;

            if (!self.page || !self.page.length) {
                return;
            }

            //Check if any of the rows are not selected
            var anyNotSelected = _.some(self.page, function(item) {
                var notSelected = !self.selectionController.isSelected(item);
                return notSelected;
            })

            return !anyNotSelected;
        },
        someSelected() {

            var self = this;

            if (self.allSelected) {
                return true;
            }

            return _.some(self.page, function(item) {
                return self.selectionController.isSelected(item);
            })
        },
        selectAllIcon() {
            if (this.allSelected) {
                return 'check-square';
            }

            if (this.someSelected) {
                return 'minus-square';
            }

            return 'square';


        },


    },
    asyncComputed: {
        // all: {
        //     default: [],
        //     get() {

        //         var self = this;

        //         // var cacheString = self.globalCacheKey;
        //         // var valueStorageCache = self.$fluro.cache.get('dynamic-table-cache');
        //         // var cachedValue = valueStorageCache.get(cacheString);



        //         return new Promise(function(resolve, reject) {

        //             return self.$fluro.api.post(`/content/${self.dataType}/filter`, {
        //             // return self.$fluro.api.get(`/system/test`, {
        //                     includeArchived: self.includeArchivedByDefault,
        //                 })
        //                 .then(function(res) {

        //                     //All rows loaded
        //                     resolve(res.data);
        //                     self.$emit('raw', res.data);
        //                 })
        //                 .catch(reject);
        //         })
        //     },
        // },
        // 

        /**
                page: {
                    default: [],
                    get() {

                        var self = this;

                        //////////////////////////////////////

                        // var ids = _.keys(lookup);
                        var ids = self.$fluro.utils.arrayIDs(self.rawPage);

                        if (!ids || !ids.length) {
                            self.loading = false;
                            return Promise.resolve([]);
                        }

                        

                        //////////////////////////////////////

                        var fields = ['title', '_type', 'definition']
                        
                        //Include the extra fields that make sense
                        fields = fields.concat(_.chain(self.renderColumns)
                            .map(function(column) {
                                switch (column.key) {
                                    case 'firstName':
                                        return ['firstName', 'preferredName', 'ethnicName']
                                        break;
                                    case 'lastName':
                                        return ['lastName', 'maidenName']
                                        break;
                                }

                                //////////////////////////////////////

                                if (column.additionalFields && column.additionalFields.length) {
                                    return [column.additionalFields, column.key]
                                }

                                //////////////////////////////////////

                                return column.key;
                            })
                            .flattenDeep()
                            .compact()
                            .map(function(key) {
                                return key.split('|')[0];
                            })
                            .value()
                            );

                        


                        //////////////////////////////////////

                        self.loading = true;

                        //////////////////////////////////////

                        return new Promise(function(resolve, reject) {

                            // //Create a cancel token
                            // currentPageItemsRequest = CancelToken.source();

                            /////////////////////////////////////////////////

                            self.$fluro.api.post('/content/multiple', {
                                    ids: ids,
                                    select: _.uniq(fields),
                                    populateAll: true,
                                    limit: ids.length,

                                    // cancelToken: currentPageItemsRequest.token,
                                })
                                .then(function(res) {

                                    var lookup = _.reduce(res.data, function(set, entry, i) {

                                        set[entry._id] = entry;
                                        return set;
                                    }, {})

                                    //// console.log('Look for ids', ids);
                                    var pageItems = _.chain(ids)
                                        .map(function(id, i) {
                                            var entry = lookup[id];
                                            if (!entry) {
                                                console.log('No entry for', id)
                                                return;
                                            }
                                            entry._pageIndex = i;
                                            return entry

                                        })
                                        .compact()
                                        .value();

                                    /////////////////////////////////////

                                    resolve(pageItems);
                                    self.loading = false;

                                }, function(err) {
                                    self.loading = false;
                                    if (axios.isCancel(err)) {
                                        // return reject(err)
                                    } else {
                                        return reject(err);
                                    }
                                });
                        });


                        // return Promise.resolve(self.rawPage);
                    }
                },
        /**/

    },
    filters: {
        numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
    },
    watch: {
        'pagePopulationString': function() {
            this.loading = true;
            this.populatePage()
        },
        reloadRequired: {
            immediate: true,
            handler: _.debounce(function(string) {
                console.log('Reload Required!', string)
                this.reload();
            }, 500)
        },
        search: _.debounce(function(newValue) {
            // console.log('Search changed!')
            this.debouncedSearch = newValue;
            // this.refine();
        }, 500),
        // dateWatchString: _.debounce(function(newValue) {
        //     // this.refine();
        // }, 500),
    },
    methods: {
        populatePage() {

            var self = this;

            //////////////////////////////////////

            if (self.dataType == 'node') {
                console.log('Node > Show raw page')
                self.page = self.rawPage.slice();
                self.loading = false;
                return;
            }

            //Add a bit of a delay so they can't spam the server
            //by clicking 'nextPage()' over and over
            self.populatePageDebounced();

        },
        populatePageDebounced: _.debounce(function() {

            var self = this;

            //////////////////////////////////////

            // var ids = _.keys(lookup);
            var ids = self.$fluro.utils.arrayIDs(self.rawPage);

            if (!ids || !ids.length) {
                self.loading = false;
                return self.page = [];
            }
            //////////////////////////////////////

            var fields = ['title', '_type', 'definition']

            //Include the extra fields that make sense
            fields = fields.concat(_.chain(self.renderColumns)
                .map(function(column) {
                    switch (column.key) {
                        case 'firstName':
                            return ['firstName', 'preferredName', 'ethnicName']
                            break;
                        case 'lastName':
                            return ['lastName', 'maidenName']
                            break;
                    }

                    //////////////////////////////////////

                    if (column.additionalFields && column.additionalFields.length) {
                        return [column.additionalFields, column.key]
                    }

                    //////////////////////////////////////

                    return column.key;
                })
                .flattenDeep()
                .compact()
                .map(function(key) {
                    return key.split('|')[0];
                })
                .value()
            );

            //////////////////////////////////////

            self.loading = true;

            //////////////////////////////////////

            self.$fluro.api.post(`/content/${self.dataType}/multiple`, {
                    ids: ids,
                    select: _.uniq(fields),
                    populateAll: true,
                    limit: ids.length,

                    // cancelToken: currentPageItemsRequest.token,
                })
                .then(function(res) {

                    var lookup = _.reduce(res.data, function(set, entry, i) {

                        set[entry._id] = entry;
                        return set;
                    }, {})

                    //// console.log('Look for ids', ids);
                    var pageItems = _.chain(ids)
                        .map(function(id, i) {
                            var entry = lookup[id];
                            if (!entry) {
                                console.log('No entry for', id)
                                return;
                            }
                            entry._pageIndex = i;
                            return entry

                        })
                        .compact()
                        .value();

                    /////////////////////////////////////

                    self.page = pageItems;
                    self.loading = false;

                }, function(err) {
                    self.page = [];
                    self.loading = false;
                    if (axios.isCancel(err)) {
                        // return reject(err)
                    } else {
                        return reject(err);
                    }
                });

        }, 500),
        reload() {

            console.log('Reload')
            var self = this;

            //////////////////////////////////////////

            self.loadingItems = true;

            ///////////////////////////////////////

            //Load just the IDS from the server and required fields
            return self.$fluro.api.post(`/content/${self.dataType}/filter`, {
                    // return self.$fluro.api.get(`/system/test`, {
                    sort: self.sort,
                    filter: self.filterConfig,
                    startDate: self.startDate,
                    endDate: self.endDate,
                    search: self.debouncedSearch,
                    includeArchived: self.includeArchivedByDefault,
                    allDefinitions: self.allDefinitions,
                    includeUnmatched: true,
                })
                .then(function(res) {
                    self.all = res.data;
                    self.$emit('raw', self.all);


                    self.rows = _.filter(res.data, { _matched: true });
                    self.$emit('filtered', self.rows);

                    self.setPage(1);

                    self.loadingItems = false;
                })
                .catch(function(err) {
                    self.loadingItems = false;
                    self.rows = [];
                    self.$emit('filtered', self.rows);


                    self.all = [];
                    self.$emit('raw', self.all);

                    self.setPage(1);

                    if (axios.isCancel(err)) {
                        // return reject(err);
                        //console.log('Nothing man!')
                    } else {

                    }
                });

        },
        checkboxClick(item, $event, itemIndex) {
            // console.log('ITEM INDEX', itemIndex, item, $event);
            return this.toggleSelection(item, $event, itemIndex);
            // //console.log('Checkbox click!');
            return this.selectionController.toggle(item);
        },
        toggleSelection(item, $event, itemIndex, isolateOnClick) {


            ////////////////////

            //No event data
            if (!$event) {
                if (isolateOnClick) {
                    //Set the selection to just this item

                    this.selectionController.setSelection([item]);
                    //console.log('SET SELECTION', item)
                    return
                } else {
                    //Select/Deselect this item
                    this.selectionController.toggle(item);

                    return
                }
            }

            ////////////////////

            //They held CTRL/CMD down when they clicked
            if ($event.metaKey) {
                this.previousSelectionIndex = -1;
                return this.selectionController.toggle(item);
            }

            ////////////////////

            //No button was pressed
            if (!$event.shiftKey) {
                //Remember this thing as what we selected
                this.previousSelectionIndex = itemIndex;
                if (isolateOnClick) {
                    this.selectionController.previousIntent = 'select';
                    return this.selectionController.setSelection([item]);
                } else {
                    return this.selectionController.toggle(item);
                }
            }

            ////////////////////////////////////////////

            if (!itemIndex) {
                //Forget about it
                this.previousSelectionIndex = -1;
            }

            ////////////////////////////////////////////

            //If there is a previous index
            if (this.previousSelectionIndex != -1) {



                //Find our range
                var start = Math.min(this.previousSelectionIndex, itemIndex);
                var end = Math.max(this.previousSelectionIndex, itemIndex);

                if (itemIndex > this.previousSelectionIndex) {
                    end += 1;
                }

                this.previousSelectionIndex = itemIndex;

                var getRange = this.page.slice(start, end);

                switch (this.selectionController.previousIntent) {
                    case 'deselect':
                        return this.selectionController.deselectMultiple(getRange);
                        break;
                    default:
                        return this.selectionController.selectMultiple(getRange);
                        break;
                }
            }

            this.previousSelectionIndex = itemIndex;
            return this.selectionController.toggle(item);
        },
        isActiveSort(key) {
            return this.sort.sortKey == key;
        },
        isSortable(column) {
            if (!column) {
                return;
            }
            var v = !(column.sortable === false)
            return v;
        },
        setSort(sortObject) {
            this.sort = sortObject;
            this.$emit('sort', sortObject);
        },
        toggleSort(column) {

            var self = this;

            if (!self.isSortable(column)) {
                return;
            }

            // console.log('COLUMN', column);
            if (!column.key || !column.key.length) {
                return;
            }

            /////////////////////////
            var sortKey = column.key;
            var sortType = column.sortType || 'string';
            var alreadyActive = (self.sort && self.sort.sortKey == sortKey);
            var currentDirection = self.sort.sortDirection;
            var sortDirection = alreadyActive ? (currentDirection == 'asc' ? 'desc' : 'asc') : 'asc';

            self.setSort({
                sortKey,
                sortType,
                sortDirection,
            });


            //Change to first page
            self.setPage(1);
        },
        classes(item) {
            var classes = []

            if (!item) {
                return classes;
            }

            if (this.selectionController.isSelected(item)) {
                classes.push('selected');
            }

            //// console.log('iTEM ISSUE', item)
            classes.push('status-' + item.status);
            return classes;

        },
        setPage(pageNumber) {

            if (this.currentPage == pageNumber) {
                console.log('already at page', pageNumber)
                return;
            }
            this.currentPage = pageNumber;
            // this.pageChange();

            var topElement = this.$refs.top;
            if (topElement) {
                console.log('SCROLL INTO VIEW')
                topElement.scrollIntoView({
                    // block:'center',
                    // behavior:'smooth',
                });
            }

            this.$emit('page', pageNumber);
        },
        firstPage() {
            this.currentPage = 1;

        },
        lastPage() {
            this.currentPage = this.totalPages;
        },
        nextPage() {
            //console.log(this.currentPage, this.totalPages);
            this.currentPage < this.totalPages ? this.setPage(this.currentPage + 1) : this.setPage(this.totalPages);
        },
        previousPage() {
            this.currentPage > 1 ? this.setPage(this.currentPage - 1) : this.setPage(1);
        },
        selectPage() {
            if (!this.page || !this.page.length) {
                return;
            }

            this.selectionController.selectMultiple(this.page)
        },
        deselectPage() {
            if (!this.page || !this.page.length) {
                return;
            }

            this.selectionController.deselectMultiple(this.page)
        },
        selectAll() {
            this.selectionController.selectMultiple(this.rows);
        },
        deselectAll() {
            this.selectionController.deselectAll();
        },
        toggleSelectAll() {
            if (!this.page || !this.page.length) {
                return;
            }

            // //console.log('Toggle All', this.page);
            if (this.allSelected) {
                this.selectionController.deselectMultiple(this.page)

            } else {
                this.selectionController.selectMultiple(this.page)
            }
        }
    },
    components: {
        TableHeaderCheckbox,
        TableRowCheckbox,
        TableCell,
    },
}
</script>
<style lang="scss">
.fluro-table-wrapper {
    position: relative;

    $padding-h: 5px;


    // border: 10px solid;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    height: 100%;


    .v-progress-linear {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        margin: 0;
        padding: 0;
    }



    .thumbnail {
        background-size: cover;
        background-position: center;
        width: 50px;
        height: 30px;
        border-radius: 3px;
        display: block;
        // border:1px solid rgba(#000, 0.1);
    }

    .fluro-table-scroll {
        position: relative;
        width: 100%;
        z-index: 1;
        margin: auto;
        overflow: auto;
        height: 100%;

        overscroll-behavior-x: none !important;
        overscroll-behavior-y: none !important;
        overscroll-behavior: none !important;

        table {
            width: 100%;
            // min-width: 1280px;
            margin: auto;
            border-collapse: separate;
            border-spacing: 0;


        }

        &.loading {
            table {
                opacity: 0.5;
            }
        }

        th,
        td {
            padding: 8px $padding-h;
            border-bottom: 1px solid #e8edf1;
            vertical-align: middle;
            white-space: nowrap;
            position: relative;

            &.shrink {
                width: 1px;
            }


        }

        th {
            &.sorting {
                background: #f6f6f6 !important;
            }
        }

        .action-buttons {
            opacity: 0.3;
            white-space: nowrap;

        }

        tr {
            background: #fff;

            th:first-child,
            th:last-child {
                background: #fff;

            }

            &:nth-child(odd) {
                background: #fcfcfc;

                th:first-child,
                th:last-child {
                    background: #fcfcfc;
                }
            }

            &.status-archived,
            &.status-deceased {

                th:first-child,
                th:last-child,
                td,
                th {
                    color: #888; //rgba(#000, 0.5);
                    background: #f4f4f4;
                }
            }

            &.selected {

                th:first-child,
                th:last-child,
                td,
                th {
                    // background: yellow;
                    background-color: #f7f6de !important;
                    color: #846b1f;
                    border-color: #f2eac9 !important;

                }
            }


        }

        tbody tr {

            &:hover {

                td,
                th {

                    &,
                    &:first-child,
                    &:last-child {
                        background-color: #f4fafa;
                        color: #055d52;
                    }
                }


                .action-buttons {
                    opacity: 1;
                }
            }

            &.breaker {
                background: rgba(#000, 0.05);

                td,
                th {
                    background: none !important;
                    color: rgba(#000, 0.5) !important;
                    text-transform: uppercase;
                    font-size: 0.8em;
                    font-weight: 600;
                    letter-spacing: 0.03em;
                    padding: 4px $padding-h;
                }
            }
        }

        thead {

            // position: -webkit-sticky;
            //    position: sticky;
            //    top: 0;

            //    &,
            th,
            td {
                padding: 5px $padding-h;
                position: -webkit-sticky;
                position: sticky;
                top: 0;

                background: #fff !important;
                z-index: 4;

                //theme/styling
                text-align: left;
                font-size: 11px;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                line-height: 20px;
                white-space: nowrap;
            }

            th {
                white-space: nowrap;

                &.sorting {
                    padding-right: 20px;
                }

                &.sortable {
                    .sort-icon {
                        position: absolute;
                        right: 2px;
                        top: 50%;
                        transform: translateY(-50%);
                    }
                }
            }
        }


        /* safari and ios need the tfoot itself to be position:sticky also */
        tfoot {
            position: -webkit-sticky;
            position: sticky;
            bottom: 0;

            &,
            & th,
            & td {
                position: -webkit-sticky;
                position: sticky;
                bottom: 0;
                background: #fff;
                // color: #fff;
                z-index: 4;
            }

            th {
                white-space: nowrap;
            }
        }



        th:first-child {
            position: -webkit-sticky;
            position: sticky;
            left: 0;
            z-index: 2;



            // background: #ccc;
        }

        th:last-child {
            position: -webkit-sticky;
            position: sticky;
            right: 0;
            z-index: 2;
            text-align: right;
            // background: #ccc;
        }

        thead th:first-child,
        tfoot th:first-child,
        thead th:last-child,
        tfoot th:last-child {
            z-index: 5;

        }



    }

    .footer-stats {
        @extend .border-top;
        padding: 5px 10px;
        font-size: 0.9em;
    }

    .pagenumber-select {
        display: inline-block;
        position: relative;
        select {
            opacity: 0;
            width:100%;
            height:100%;
            position: absolute;
            appearance:none;
            display: block;
            left:0;
            right:0;
            bottom:0;
            top:0;
        }
    }


    .flex-center {
        flex: 1;
        display: flex;
        text-align: center;
        justify-content: center;
        align-items: center;
    }


    th,
    td {
        &.checkbox-cell {
            text-align: center;
            padding-left: 5px !important;
            padding-right: 5px !important;
        }
    }

    th,
    td {
        &:first-child {
            padding-left: $padding-h * 2 !important;
        }

        &:last-child {
            padding-right: $padding-h * 2 !important;
        }
    }

}
</style>