<template>
				<div class="fluro-table-wrapper">
								<!-- <pre>{{items}}</pre> -->
								<!-- <pre>{{rawPage}}</pre> -->
								<!-- <pre>{{totalPages}}</pre> -->
								<!-- <pre>{{sort}}</pre> -->
								<!-- <pre>{{page}}</pre> -->
								<div v-show="false">
												<pre>{{items.length}}</pre>
												<pre>{{filtered.length}}</pre>
												<!-- <pre>{{refined.length}}</pre> -->
												<pre>{{sorted.length}}</pre>
												<pre>{{availablePages.length}}</pre>
								</div>
								<!-- <pre>{{items.length}} {{rawPage ? rawPage.length : 'Nope'}} {{availablePages ? availablePages.length : 'Nope'}}</pre> -->
								<fluro-page-preloader v-if="showLoading" contain />
								<v-container class="flex-center" v-if="!sorted.length">
												<slot name="emptytext">
																No results were found matching your criteria
												</slot>
								</v-container>
								<template v-else>
												<div ref="scrollableArea" class="fluro-table-scroll" :class="{scrollable:isScrollable, clickable:clickable, loading:showLoading}">
																<span ref="top"></span>
																<table class="fluro-table-main no-select">
																				<thead>
																								<tr>
																												<th class="first shrink checkbox-cell" v-if="selectionEnabled">
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
																																												<v-list-tile @click="deselectAll()" v-if="selectionManager.selection.length">
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
																												<th @click="toggleSort(column)" :class="[column.classes, {'shrink':column.shrink, sortable:isSortable(column), 'sorting':sort.sortKey == column.key, 'tiny':column.tiny, 'text-xs-center':column.align == 'center', 'text-xs-right':column.align =='right'}]" v-for="column in columns">
																																<div class="sort-icon" v-if="isActiveSort(column.key)">
																																				<fluro-icon library="fas" icon="caret-down" v-if="sort.sortDirection == 'desc'" />
																																				<fluro-icon library="fas" icon="caret-up" v-if="sort.sortDirection == 'asc'" />
																																</div>
																																{{column.title}}
																												</th>
																												<th class="last shrink" v-if="actionsAreEnabled">
																																<!-- <v-btn class="ma-0" small icon @click.stop.prevent="toggleConfiguration()"> -->
																																<!-- <fluro-icon icon="cog" /> -->
																																<!-- </v-btn> -->
																												</th>
																								</tr>
																				</thead>
																				<tbody>
																								<template v-if="grouped">
																												<template v-for="group in grouped">
																																<tr class="breaker" v-if="group.title">
																																				<th></th>
																																				<!-- <td></td> -->
																																				<!-- <th is="table-row-checkbox" :checked="selectionManager.allSelected(group)"/> -->
																																				<td :colspan="1 + columns.length">{{group.title}}</td>
																																</tr>
																																<tr :class="classes(item)" :key="item[trackingKey]" v-for="(item, key) in group.items">
																																				<template v-if="item._populating">
																																								<!-- <th>TEST {{selection.isSelected(item)}}</th> -->
																																								<th is="table-row-checkbox" />
																																								<td @click.native="clicked(item, column, key)" :colspan="columns.length">-</td>
																																								<th class="shrink" v-if="actionsAreEnabled">
																																								</th>
																																				</template>
																																				<template v-else>
																																								<th class="first" is="table-row-checkbox" :checked="selectionManager.isSelected(item)" @click.native.stop.prevent="checkboxClick(item, $event, item._pageIndex)" :value="item" />
																																								<table-cell @click.native="clicked(item, column, key)" :row="item" v-for="column in columns" :class="[column.classes, {'sorting':sort.sortKey == column.key}]" :column="column"></table-cell>
																																								<th class="last shrink" v-if="actionsAreEnabled">
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
																												<tr :class="classes(item)" v-if="!item.hidden" :key="item[trackingKey]" v-for="(item, key) in page">
																																<template v-if="item._populating">
																																				<!-- <th>TEST {{selection.isSelected(item)}}</th> -->
																																				<th is="table-row-checkbox" v-if="selectionEnabled" />
																																				<td @click.native="clicked(item, column, key)" :colspan="columns.length">-</td>
																																				<th class="shrink" v-if="actionsAreEnabled">
																																				</th>
																																</template>
																																<template v-else>
																																				<th class="first" is="table-row-checkbox" v-if="selectionEnabled" :checked="selectionManager.isSelected(item)" @click.native.stop.prevent="checkboxClick(item, $event, key)" :value="item" />
																																				<table-cell @click.native="clicked(item, column, key)" :row="item" v-for="column in columns" :class="[column.classes, {'sorting':sort.sortKey == column.key}]" :column="column"></table-cell>
																																				<th class="last shrink" v-if="actionsAreEnabled">
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
												<div class="footer-stats" v-if="footerEnabled">
																<v-layout row wrap>
																				<template v-if="!totalPages">
																								<v-flex class="text-muted">
																												No matches
																								</v-flex>
																				</template>
																				<template v-else>
																								<!-- <v-flex xs6 align-center d-flex class="text-muted"> -->
																								<!-- {{startOffset + 1 | numberWithCommas}} to {{endOffset | numberWithCommas}} of {{filteredTotal | numberWithCommas}} matches -->
																								<!-- </v-flex> -->
																								<v-flex xs6 align-center d-flex class="text-muted">
																												<v-menu @click.native.stop offset-y>
																																<template v-slot:activator="{ on }">
																																				<div v-on="on">
																																								<div v-if="groupingColumn">
																																												{{totalGroups}} groups - Showing {{startOffset + 1 | numberWithCommas}} to {{endOffset | numberWithCommas}} of {{filteredTotal | numberWithCommas}} rows
																																								</div>
																																								<div v-else>
																																												{{startOffset + 1 | numberWithCommas}} to {{endOffset | numberWithCommas}} of {{filteredTotal | numberWithCommas}} {{plural}}
																																								</div>
																																				</div>
																																</template>
																																<v-card tile>
																																				<v-list dense>
																																								<v-list-tile @click="perPage = 25">
																																												<v-list-tile-content>
																																																<v-list-tile-title>
																																																				Show 25 per page
																																																</v-list-tile-title>
																																												</v-list-tile-content>
																																								</v-list-tile>
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
																																<!-- <span v-if="$vuetify.breakpoint.smAndUp" class="text-muted">Page {{currentPage}} of {{totalPages}}</span> -->
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

import _ from 'lodash';

/////////////////////////////////

import { FilterService } from 'fluro';

/////////////////////////////////

var currentRawRequest;
var currentPageItemsRequest;
/////////////////////////////////

var MAX_ROWS = 100000; //100000;
var MAX_CHUNK_SIZE = 5000;
var INITIAL = true;

/////////////////////////////////

export default {
				props: {
								showFooter: {
												type: Boolean,
								},
								trackingKey: {
												type: String,
												default: '_id',
								},
								defaultFields: {
												type: Array,
												default () {
																return [];
												}
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
								clickable: {
												type: Boolean,
												default () {
																return true;
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
								items: {
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
												default: 100,
								},
								dataSource: {
												type: String,
								},
								allDefinitions: {
												type: Boolean,
								},
								search: {
												type: String,
								},
								startDate: {
												type: Date,
								},
								endDate: {
												type: Date,
								},
								selection: {
												type: Object,
								},
								scrollable: {
												type: Boolean,
												default () {
																return true;
												}
								},
								actionsEnabled: {
												type: Boolean,
												default () {
																return true;
												}
								}
				},
				data() {

								// var initialFilter = JSON.parse(JSON.stringify(this.startFilter));


								// console.log('INITIAL PAGE', this.initPage)

								return {
												groupingColumn: null,
												// filterConfig:JSON.parse(JSON.stringify(this.filterConfig)), 
												// filtered: [],
												// refined: [],
												debouncedSearch: this.search,
												debouncedDateString: this.dateWatchString,
												perPage: this.pageSize,
												loading: false,
												loadingItems: false,
												currentPage: parseInt(this.initPage),
												previousSelectionIndex: -1,
												sort: JSON.parse(JSON.stringify(this.initSort)),
												rowsLoaded: 0,

								}
				},
				computed: {
								plural() {
												return 'items';
								},
								isScrollable() {
												return this.scrollable; // && this.items.length 
								},
								selectionManager() {
												return this.selection || this.$selection;
								},
								footerEnabled() {

												if (this.showFooter) {
																return true;
												}

												if (this.totalPages > 1) {
																return true;
												}
								},
								actionsAreEnabled() {
												return this.selectionEnabled && this.actionsEnabled;
								},
								selectionEnabled() {
												return !(this.enableSelection === false) && this.selectionManager;
								},
								grouped() {

												var self = this;

												if (self.grouping) {
																return self.grouping(self.page);
												} else {
																return;
												}
								},
								excludeArchived() {

												var self = this;

												if (self.includeArchivedByDefault) {
																return false;
												}

												////////////////////////////////////////////////

												var requiresArchivedInResults = _.some(self.activeFilterRows, function(row) {


																if (row.key != 'status') {
																				return;
																}

																//Check if archived is one of the values
																var isRelevant = (row.value == 'archived' || _.includes(row.values, 'archived'));
																var isDeceased = (row.value == 'deceased' || _.includes(row.values, 'deceased'));

																/////////////////////////////////////////

																switch (row.comparator) {
																				case '==':
																				case 'startswith':
																				case 'endswith':
																				case 'like':
																				case 'contains':
																				case 'in':
																								return isRelevant || isDeceased;
																								break;
																				default:
																								//If it's does not contain then
																								//return back if archived is not an option
																								return !isRelevant && !isDeceased;
																								break;
																}


												})

												//// console.log('REQUIRES ARCHIVE??', requiresArchivedInResults);
												/////////////////////////////////////////

												return !requiresArchivedInResults;
								},

								// currentPage: {
								//     get() {
								//         return this._currentPage;
								//     },
								//     set(input) {

								//         this._currentPage = parseInt(input);



								//              //Scroll to top
								//             var topElement = this.$refs.top;
								//             if (topElement) {
								//                 topElement.scrollIntoView({
								//                     // block:'center',
								//                     // behavior:'smooth',
								//                 });
								//             }

								// //     this.$emit('pageChange', this.currentPage);
								// // },


								//     }
								// },
								rowsTotal() {
												return this.rowsLoaded || this.rows.length || MAX_CHUNK_SIZE || MAX_ROWS;
								},
								showLoading() {
												return this.loading || this.loadingItems;
								},

								activeFilters() {
												var result = FilterService.activeFilters(this.filterConfig);

												console.log('active filters', result);
												return result;
								},
								activeFilterRows() {
												var result = _.filter(this.activeFilters, function(row) {
																return row.comparator && row.comparator.length;
												})

												console.log('active filter rows', result);
												return result;
								},
								activeFilterKeys() {
												var result = FilterService.activeFilterKeys(this.filterConfig);
												console.log('active filter keys', result);
												return result;
								},
								activeFilterValues() {
												var result = FilterService.activeFilterValues(this.filterConfig);
												console.log('active filter values', result);
												return result;
								},
								activeFilterComparators() {
												var result = FilterService.activeFilterComparators(this.filterConfig);
												console.log('active filter comparators', result);
												return result;
								},
								activeFilterOperators() {
												var result = FilterService.activeFilterComparators(this.filterConfig);
												console.log('active operators', result);
												return result;
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

												// console.log('filter check string', filterString);
												return filterString;
												// console.log('RECOMPUTE FILTER STRING', filterString, this.rows)
												// return `${this.rowCheckString}-${filterString}`;
								},
								isAsync() {
												return this.dataSource && this.dataSource.length;
								},
								previousPageDisabled() {
												return this.currentPage <= 1;

								},
								nextPageDisabled() {
												return this.currentPage == this.totalPages;
								},

								sorted() {

												var self = this;
												var items = self.filtered;

												if (!self.sort || !items.length) {
																return items; //defaultSort(items);
												}

												//////////////////////////////////////////////

												var sortingKey = self.sort.sortKey;
												var sortingType = self.sort.sortType;
												var sortingDirection = self.sort.sortDirection;

												//////////////////////////////////////////////

												if (!sortingKey || !sortingKey.length) {
																sortingKey = self.defaultSort; //'title';
												}

												if (!sortingType || !sortingType.length) {
																sortingType = self.defaultSortType; //'string';
												}

												if (!sortingDirection || !sortingDirection.length) {
																sortingDirection = self.defaultSortDirection; //'asc';
												}


												// console.log('SORTING KEY', self, sortingKey, sortingType, sortingDirection);

												//////////////////////////////////////////////

												// console.log('Sort items by', sortingKey, items);

												items = _.orderBy(items, function(item) {

																//Get the value
																var val = _.get(item, sortingKey);

																//If it's an array return the first item in the array
																if (_.isArray(val) && val.length) {
																				//Use the first item in the array to sort on
																				val = val[0];
																}

																///////////////////////////////////

																var isNull = (val === undefined || val === null);


																///////////////////////////////////

																switch (sortingType) {
																				case 'boolean':
																								if (!val) {
																												return 0;
																								} else {
																												return 1;
																								}
																								break;
																				case 'number':
																				case 'integer':
																				case 'decimal':
																				case 'float':
																								if (isNull || isNaN(val)) {
																												return -9999999999999999999999999999999999;
																								}

																								if (sortingType == 'integer') {
																												return parseInt(val);
																								} else {
																												return parseFloat(val);
																								}
																								break;
																				case 'date':

																								if (isNull) {
																												return 0;
																								}

																								var date = new Date(val);
																								var timestamp = date.getTime();

																								if (isNaN(timestamp)) {
																												return 0;
																								} else {
																												return timestamp;
																								}


																								break;
																				default:

																								if (_.isObject(val)) {

																												if (val.title) {
																																val = val.title;
																												} else {
																																if (val.name) {
																																				val = val.name;
																																}
																												}
																								}

																								return String(val).toLowerCase();

																								break;
																}

												})

												//////////////////////////////////////////////

												if (sortingDirection == 'desc') {
																items.reverse();
												}

												//////////////////////////////////////////////


												return items;
								},
								filteredTotal() {
												return this.filtered ? this.filtered.length : 0;
								},
								availablePages() {


												var chunk = _.chunk(this.sorted, this.perPage);

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
																return this.availablePages[Math.max(this.currentPage - 1, 0)];
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
																var notSelected = !self.selectionManager.isSelected(item);
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
																return self.selectionManager.isSelected(item);
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
								rows: {
												default: [],
												get() {
																if (currentRawRequest) {
																				// currentRawRequest.cancel('Operation canceled by the user.');
																}

																var self = this;

																if (!self.isAsync) {
																				return Promise.resolve(self.items || []);
																}


																//////////////////////////////////////////

																var fields = ['_id', 'title', 'status']

																if (self.startDate || self.endDate) {
																				fields.push('startDate');
																				fields.push('endDate');
																}
																// rawFields() {
																//     var array = ['_id', 'title', 'status'];
																//     if(this.defaultFields && this.defaultFields.length) {
																//         array = array.concat(this.defaultFields);
																//     }

																//     return array;
																// },


																// fields = fields.concat(this.defaultFields.slice());

																//.concat(['_id', self.defaultSort]);//'title']
																// , '_type', 'definition']; //, 'tags', 'keywords', 'definition', 'realms'];
																// var fields = ['_id', 'title']; //, 'tags', 'keywords', 'definition', 'realms'];

																//////////////////////////////////////

																//We also need the field we are sorting on
																if (self.sort && self.sort.sortKey) {
																				fields.push(self.sort.sortKey);
																}

																//////////////////////////////////////

																// fields = fields.concat(_.chain(self.columns)
																//     .map(function(column) {
																//         if (column.additionalFields && column.additionalFields.length) {
																//             return [].concat(column.additionalFields, column.key)
																//             // console.log('Additional Fields', column.additionalFields)
																//         }

																//         return column.key
																//     })
																//     .flatten()
																//     .uniq()
																//     .compact()
																//     .value());



																///////////////////////////////////////

																var EXCLUDE_ARCHIVED = self.excludeArchived;
																//// console.log('Exclude archived is', EXCLUDE_ARCHIVED);


																//////////////////////////////////////////

																//And the fields we are filtering on
																fields = fields.concat(self.activeFilterKeys)

																// var appendDetailSheets = _.chain(fields)
																//     .map(function(field) {
																//         var split = field.split('.');
																//         if (split[0] == 'details') {
																//             return split[1];
																//         }
																//     })
																//     .compact()
																//     .uniq()
																//     .value();


																// var appendFullFamily = _.chain(fields)
																//     .map(function(field) {
																//         var split = field.split('.');
																//         if (split[0] == 'family') {
																//             return split[1];
																//         }
																//     })
																//     .compact()
																//     .uniq()
																//     .value();

																var appendDetailSheets = false;
																var appendFullFamily = false;

																//////////////////////////////////////////

																self.loadingItems = true;
																self.rowsLoaded = 0;




																//////////////////////////////////////////

																fields = _.chain(fields).compact().uniq().value();
																// console.log('FIELDS', fields)

																//////////////////////////////////////////

																return new Promise(function(resolve, reject) {


																				var i = 0;
																				var offset = 0;
																				var memo = [];

																				/////////////////////////////////////////////////

																				function checkBatch(lastBatch) {

																								//If we reached the end of the page

																								var fullChunk = lastBatch.length == MAX_CHUNK_SIZE;
																								var reachedLimit = (memo.length >= MAX_ROWS);

																								if (fullChunk && !reachedLimit) {

																												i++;
																												offset = i * MAX_CHUNK_SIZE;

																												console.log('Loading Chunk', i, offset, '-', offset + MAX_CHUNK_SIZE);
																												return loadNextBatch();
																								} else {


																												resolve(memo);
																												self.loadingItems = false;
																												self.$emit('raw', memo);

																												// console.log('ROWS IS LOADED NOW', _.keys(memo[0]))
																								}
																				}


																				return loadNextBatch();

																				/////////////////////////////////////////////////
																				/////////////////////////////////////////////////
																				/////////////////////////////////////////////////
																				/////////////////////////////////////////////////
																				/////////////////////////////////////////////////

																				function loadNextBatch() {


																								//Create a cancel token
																								currentRawRequest = self.$fluro.api.CancelToken.source();

																								var parameters = {
																												fields: fields,
																												limit: MAX_CHUNK_SIZE,
																												offset: offset,
																								}

																								///////////////////////////////////////


																								if (self.dataSource == '/content/contact') {
																												if (appendDetailSheets && appendDetailSheets.length) {
																																parameters.appendContactDetail = appendDetailSheets;
																												}

																												if (appendFullFamily) {
																																parameters.appendFullFamily = true;
																												}
																								}

																								///////////////////////////////////////

																								if (EXCLUDE_ARCHIVED) {
																												parameters.excludeArchived = true;
																								}


																								if (self.allDefinitions) {
																												parameters.allDefinitions = true;
																								}

																								///////////////////////////////////////
																								///////////////////////////////////////

																								var cacheString = _.chain(JSON.stringify(parameters))
																												.compact()
																												.orderBy(function(s) {
																																return s;
																												})
																												.value()
																												.join('');

																								cacheString = `${self.dataSource}-${cacheString}`;

																								///////////////////////////////////////

																								var valueStorageCache = self.$fluro.cache.get('async-table-cache');
																								var cachedValue = valueStorageCache.get(cacheString);


																								if (cachedValue) {
																												// console.log('Loaded Chunk From Cache!!', cachedValue)

																												return chunkLoaded(cachedValue);
																								}

																								///////////////////////////////////////

																								function chunkLoaded(data) {



																												//Add the next chunk
																												memo = memo.concat(data);
																												self.rowsLoaded += memo.length;
																												//// console.log('added to memo', res.data.length, memo.length);
																												return checkBatch(data);
																								}

																								///////////////////////////////////////

																								//Load just the IDS from the server and required fields
																								return self.$fluro.api.get(self.dataSource, {
																												params: parameters,
																												cancelToken: currentRawRequest.token,
																								}).then(function(res) {
																												//Store in cache for later

																												valueStorageCache.set(cacheString, res.data);
																												chunkLoaded(res.data);

																								}, function(err) {
																												if (self.$fluro.api.axios.isCancel(err)) {
																																// return reject(err);
																																//console.log('Nothing man!')
																												} else {
																																return reject(err);
																												}
																								});

																				}

																});







												}
								},
								page: {
												default: [],
												get() {

																if (currentPageItemsRequest) {
																				// currentPageItemsRequest.cancel('Operation canceled by the user.');
																}

																//////////////////////////////////////

																var self = this;

																if (!self.isAsync) {
																				var page = (self.rawPage || []).slice();
																				// console.log('table debug > return early', self.$el, page.length)
																				return Promise.resolve(page);
																}

																//////////////////////////////////////

																// var ids = [];
																// var lookup = _.reduce(self.rawPage, function(set, entry) {
																//     var entryID = entry._id;
																//     ids.push(entryID);
																//     set[entry._id] = entry;
																//     return set;
																// }, {});

																//////////////////////////////////////

																// var ids = _.keys(lookup);
																var ids = _.map(self.rawPage, '_id');

																if (!ids || !ids.length) {
																				self.loading = false;
																				// console.log('table debug > return empty')
																				return Promise.resolve([]);
																}

																//////////////////////////////////////

																var fields = ['title', '_type', 'definition'];

																//////////////////////////////////////

																fields = fields.concat(_.chain(self.columns)
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
																												return [].concat(column.additionalFields, column.key)
																												// console.log('Additional Fields', column.additionalFields)
																								}

																								return column.key;
																				})
																				.flatten()
																				.uniq()
																				.compact()
																				.value());
																//////////////////////////////////////

																self.loading = true;

																//////////////////////////////////////

																return new Promise(function(resolve, reject) {

																				//Create a cancel token
																				currentPageItemsRequest = self.$fluro.api.CancelToken.source();

																				/////////////////////////////////////////////////

																				self.$fluro.api.get('/content/multiple', {
																												params: {
																																ids: ids,
																																select: fields,
																																populateAll: true,
																																limit: ids.length,
																												},
																												cancelToken: currentPageItemsRequest.token,
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
																																								//	console.log('No entry for', id)
																																								return;
																																				}
																																				entry._pageIndex = i;
																																				return entry

																																})
																																.compact()
																																.value();

																												/////////////////////////////////////




																												resolve(pageItems);

																												/////////////////////////////////////

																												// _.each(res.data, function(fullNode) {
																												//     var source = lookup[fullNode._id];
																												//     _.assign(source, fullNode);
																												//     source._populating = false;
																												// });

																												// resolve(_.map(self.rawPage);
																												self.loading = false;

																								}, function(err) {
																												if (self.$fluro.api.axios.isCancel(err)) {
																																// return reject(err)
																												} else {
																																return reject(err);
																												}
																								});


																});


																// return Promise.resolve(self.rawPage);
												}
								},
								filtered: {
												default: [],
												get() {
																var self = this;


																var rows = self.rows; //self.isAsync ? self.rows : self.items;

																if (!rows || !rows.length) {
																				return Promise.resolve(rows);
																}


																///////////////////////////////////////////////////////////////

																var searchTerms = self.debouncedSearch;
																var dateString = self.debouncedDateString;

																///////////////////////////////////////////////////////////////

																return new Promise(function(resolve, reject) {


																				var filtered = rows;

																				//////////////////////////////////////////////////////////

																				//Check if we have a valid filter
																				var validFilters = FilterService.isValidFilter(self.filterConfig);

																				if (validFilters) {
																								//console.log('has valid filters', rows.length)
																								// var filtered = filterGroupMatch(self.filterConfig, rows);
																								filtered = _.filter(rows, function(row) {
																												// //console.log('CHECK MATCH FOR ROW', row);
																												var match = FilterService.filterGroupMatch(self.filterConfig, null, row);
																												//console.log('MATCH?', match, row);
																												return match;
																								});
																				}


																				//////////////////////////////////////////////////////////

																				if (searchTerms && searchTerms.length) {

																								var searchKeywords = String(searchTerms).toLowerCase().trim();
																								var searchPieces = searchKeywords.split(' ');


																								////////////////////////////////////////////////

																								filtered = _.filter(filtered, function(item) {

																												var itemTitle = String(item.title).trim().toLowerCase();

																												var exactMatch = _.includes(itemTitle, searchKeywords);
																												if (exactMatch) {
																																return true;
																												}

																												/////////////////////////////////////////////////////

																												//Multiword Match
																												var match = _.every(itemTitle.split(' '), function(partial) {
																																return _.some(searchPieces, function(word) {
																																				return _.includes(word, partial);
																																})
																												})

																												if (match) {
																																return true;
																												}

																												return FilterService.matchAnyString(searchKeywords, item);
																								});
																				}

																				//////////////////////////////////////////////////////////

																				if (self.startDate && self.endDate) {

																								var startDate = new Date(self.startDate);
																								startDate.setHours(0, 0, 0, 0);
																								var endDate = new Date(self.endDate);
																								endDate.setHours(0, 0, 0, 0);

																								//////////////////////

																								filtered = _.filter(filtered, function(item) {

																												var itemStartDate = new Date(item.startDate);
																												itemStartDate.setHours(0, 0, 0, 0);

																												var itemEndDate = new Date(item.endDate);
																												itemEndDate.setHours(0, 0, 0, 0);

																												if (itemEndDate < startDate) {
																																return;
																												}

																												if (itemStartDate > endDate) {
																																return;
																												}

																												return true;


																								});
																				}

																				return resolve(filtered);

																});
												},
								},
				},
				filters: {
								numberWithCommas(x) {
												return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
								},
				},
				watch: {
								// items: 'refilter',
								// rows: 'refilter',
								// filterCheckString: 'refilter',
								// debouncedSearch:'re',
								search: _.debounce(function(newValue) {
												this.debouncedSearch = newValue;
												// 				// this.refine();
								}, 500),
								dateWatchString: _.debounce(function(newValue) {
												// 				// this.refine();
												this.debouncedDateString = newValue;
								}, 500),
				},
				methods: {
								// refilter: _.debounce(function() {



								// 				//Refilter the page
								// 				var self = this;

								// 				console.log('refilter', self.$el);

								// 				var rows = self.isAsync ? self.rows : self.items;

								// 				// console.log('ROWS', rows);

								// 				if (!rows || !rows.length) {
								// 								self.filtered = rows;
								// 								console.log('no valid filters', self.isAsync, self.$el)
								// 								return self.refine();
								// 				}

								// 				///////////////////////////////////////////////////////////////

								// 				//Check if we have a valid filter
								// 				var validFilters = FilterService.isValidFilter(self.filterConfig);

								// 				if (validFilters) {
								// 								//console.log('has valid filters', rows.length)
								// 								// var filtered = filterGroupMatch(self.filterConfig, rows);
								// 								rows = _.filter(rows, function(row) {
								// 												// //console.log('CHECK MATCH FOR ROW', row);
								// 												var match = FilterService.filterGroupMatch(self.filterConfig, null, row);
								// 												//console.log('MATCH?', match, row);
								// 												return match;
								// 								});
								// 				} else {
								// 								console.log('no valid filters', self.$el)
								// 				}

								// 				///////////////////////////////////////////////////////////////

								// 				console.log('FILTERED ROWS', rows.length);
								// 				self.filtered = rows;
								// 				self.refine();
								// }, 100),
								// refine() {

								// 				// //console.log('Refine')
								// 				var self = this;
								// 				var rows = self.filtered;

								// 				//////////////////////////////////////////////////////////


								// 				if (!rows || !rows.length) {
								// 								self.refined = [];
								// 								return;
								// 				}

								// 				//////////////////////////////////////////////////////////


								// 				var refinedItems = rows;

								// 				//////////////////////////////////////////////////////////

								// 				if (self.debouncedSearch && self.debouncedSearch.length) {

								// 								var searchKeywords = String(self.debouncedSearch).toLowerCase().trim();
								// 								var searchPieces = searchKeywords.split(' ');


								// 								////////////////////////////////////////////////

								// 								refinedItems = _.filter(refinedItems, function(item) {

								// 												var itemTitle = String(item.title).trim().toLowerCase();

								// 												var exactMatch = _.includes(itemTitle, searchKeywords);
								// 												if (exactMatch) {
								// 																return true;
								// 												}

								// 												/////////////////////////////////////////////////////

								// 												//Multiword Match
								// 												var match = _.every(itemTitle.split(' '), function(partial) {
								// 																return _.some(searchPieces, function(word) {
								// 																				return _.includes(word, partial);
								// 																})
								// 												})

								// 												if (match) {
								// 																return true;
								// 												}

								// 												/////////////////////////////////////////////////////

								// 												// //Get any of the visible columns
								// 												// var columnWords = _.chain(self.columns)
								// 												// .map(function(column) {
								// 												//     var word = _.get(item, column.key);
								// 												//     return word ? String(word).toLowerCase() || '';
								// 												// })
								// 												// .compact()
								// 												// .value();

								// 												// /////////////////////////////////////////////////////

								// 												// //Check if it matches any of the column keywords
								// 												// if(_.intersection(columnWords, searchPieces).length) {
								// 												//     return true;
								// 												// }

								// 												/////////////////////////////////////////////////////

								// 												return FilterService.matchAnyString(searchKeywords, item);
								// 								});
								// 				}


								// 				////////////////////////////////////////////////

								// 				if (self.startDate && self.endDate) {

								// 								var startDate = new Date(self.startDate);
								// 								startDate.setHours(0, 0, 0, 0);
								// 								var endDate = new Date(self.endDate);
								// 								endDate.setHours(0, 0, 0, 0);

								// 								//////////////////////

								// 								refinedItems = _.filter(refinedItems, function(item) {

								// 												var itemStartDate = new Date(item.startDate);
								// 												itemStartDate.setHours(0, 0, 0, 0);

								// 												var itemEndDate = new Date(item.endDate);
								// 												itemEndDate.setHours(0, 0, 0, 0);

								// 												if (itemEndDate < startDate) {
								// 																return;
								// 												}

								// 												if (itemStartDate > endDate) {
								// 																return;
								// 												}

								// 												return true;


								// 								});
								// 				}

								// 				// //console.log('REFINED DATE', refinedItems.length);

								// 				////////////////////////////////////////////////

								// 				self.refined = refinedItems;

								// 				// self.refined = _.filter(rows, function(row) {

								// 				//     var rowTitle = String(row.title).trim().toLowerCase();

								// 				//     var exactMatch = _.includes(rowTitle, searchKeywords);
								// 				//     if (exactMatch) {
								// 				//         return true;
								// 				//     }

								// 				//     var pieces = rowTitle.split(' ');

								// 				//     //// //console.log('PIECES', pieces, searchPieces);

								// 				//     var match = _.every(searchPieces, function(partial) {
								// 				//         return _.some(pieces, function(word) {
								// 				//             return _.includes(word, partial);
								// 				//         })
								// 				//     })

								// 				//     if(match) {
								// 				//         return true;
								// 				//     }


								// 				//     return FilterService.matchAnyString(searchKeywords, row);
								// 				//     // var similar = FilterService.isSimilar(searchKeywords, rowTitle);
								// 				//     // if (similar) {
								// 				//     //     return true;
								// 				//     // }
								// 				// });
								// },

								// pageChange() {
								//      //Scroll to top
								//     var topElement = this.$refs.top;
								//     if (topElement) {
								//         topElement.scrollIntoView({
								//             // block:'center',
								//             // behavior:'smooth',
								//         });
								//     }

								//     this.$emit('pageChange', this.currentPage);
								// },
								checkboxClick(item, $event, itemIndex) {

												// console.log('ITEM INDEX', itemIndex, item, $event);
												return this.toggleSelection(item, $event, itemIndex);
												// //console.log('Checkbox click!');
												return this.selectionManager.toggle(item);
								},
								toggleSelection(item, $event, itemIndex, isolateOnClick) {


												// var isolateOnClick = true;//false;

												////////////////////

												//No event data
												if (!$event) {
																if (isolateOnClick) {
																				//Set the selection to just this item

																				this.selectionManager.setSelection([item]);
																				//console.log('SET SELECTION', item)
																				return
																} else {
																				//Select/Deselect this item
																				this.selectionManager.toggle(item);

																				return
																}
												}

												////////////////////

												//They held CTRL/CMD down when they clicked
												if ($event.metaKey) {
																this.previousSelectionIndex = -1;
																return this.selectionManager.toggle(item);
												}

												////////////////////

												//No button was pressed
												if (!$event.shiftKey) {
																//Remember this thing as what we selected
																this.previousSelectionIndex = itemIndex;
																if (isolateOnClick) {
																				this.selectionManager.previousIntent = 'select';
																				return this.selectionManager.setSelection([item]);
																} else {
																				return this.selectionManager.toggle(item);
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

																switch (this.selectionManager.previousIntent) {
																				case 'deselect':
																								return this.selectionManager.deselectMultiple(getRange);
																								break;
																				default:
																								return this.selectionManager.selectMultiple(getRange);
																								break;
																}
												}

												this.previousSelectionIndex = itemIndex;
												return this.selectionManager.toggle(item);
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

												//console.log('TOGGLE SORT', self.sort)

												/////////////////////////
												var sortKey = column.key;
												var sortType = column.sortType || 'string';
												var alreadyActive = (self.sort && self.sort.sortKey == sortKey);
												var currentDirection = self.sort.sortDirection;
												var sortDirection = alreadyActive ? (currentDirection == 'asc' ? 'desc' : 'asc') : 'asc';



												/////////////////////////

												if (!self.isAsync) {
																self.setSort({
																				sortKey,
																				sortType,
																				sortDirection,
																});
												} else {
																self.setSort({
																				sortKey,
																				sortType,
																				sortDirection,
																});
												}

												//Change to first page
												self.setPage(1);



								},
								classes(item) {
												var classes = []

												if (!item) {
																return classes;
												}


												if (item.collected) {
																classes.push('ticket-status-collected')
												}

												if (this.selectionManager.isSelected(item)) {
																classes.push('selected');
												}

												//// console.log('iTEM ISSUE', item)
												classes.push('status-' + item.status);

												return classes;

								},
								setPage(pageNumber) {

												if (this.currentPage == pageNumber) {
																//	console.log('already at page', pageNumber)
																return;
												}
												this.currentPage = pageNumber;
												// this.pageChange();

												var topElement = this.$refs.top;
												if (topElement) {
																// console.log('SCROLL INTO VIEW')
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

												this.selectionManager.selectMultiple(this.page)
								},
								deselectPage() {
												if (!this.page || !this.page.length) {
																return;
												}

												this.selectionManager.deselectMultiple(this.page)
								},
								selectAll() {


												this.selectionManager.selectMultiple(this.filtered);
								},
								deselectAll() {
												this.selectionManager.deselectAll();
								},
								toggleSelectAll() {


												if (!this.page || !this.page.length) {
																return;
												}

												// //console.log('Toggle All', this.page);
												if (this.allSelected) {
																this.selectionManager.deselectMultiple(this.page)

												} else {
																this.selectionManager.selectMultiple(this.page)
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

								&.scrollable {
												overflow: auto;
								}

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

												th,
												td {

																&,
																&.first,
																&.last,
																&.sticky-first,
																&.sticky-last {
																				background: #fff;
																}

												}


												&:nth-child(odd) {
																background: #fcfcfc;



																th,
																td {

																				&,
																				&.first,
																				&.last,
																				&.sticky-first,
																				&.sticky-last {
																								background: #fcfcfc;
																				}

																}
												}

												&.ticket-status-collected,
												&.status-archived,
												&.status-deceased {

																&,
																th,
																td {

																				&,
																				&.first,
																				&.last,
																				&.sticky-first,
																				&.sticky-last {
																								color: #888; //rgba(#000, 0.5);
																								background: #f4f4f4;
																				}

																}


												}

												&.selected {



																th,
																td {

																				&,
																				&.first,
																				&.last,
																				&.sticky-first,
																				&.sticky-last {
																								// background: yellow;
																								background-color: #f7f6de !important;
																								color: #846b1f;
																								border-color: #f2eac9 !important;
																				}

																}
												}


								}

								&.clickable tbody tr {

												&:hover {

																th,
																td {

																				&,
																				&.first,
																				&.last,
																				&.sticky-first,
																				&.sticky-last {
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

																&.sortable {
																				.sort-icon {
																								position: absolute;
																								right: 2px;
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



								th,
								td {

												&.first,
												&.sticky-first {

																position: -webkit-sticky;
																position: sticky;
																left: 0;
																z-index: 2;



																// background: #ccc;
												}
								}

								th,
								td {

												&.last,
												&.sticky-last {
																position: -webkit-sticky;
																position: sticky;
																right: 0;
																z-index: 2;
																text-align: right;
																// background: #ccc;
												}
								}


								thead {

												th,
												td {

																&.first,
																&.sticky-first,
																&.last,
																&.sticky-last {
																				z-index: 5;
																}
												}
								}



				}

				.footer-stats {
								@extend .border-top !optional;
								padding: 5px 10px;
								font-size: 0.9em;
				}


				.pagenumber-select {
								display: inline-block;
								position: relative;

								select {
												opacity: 0;
												width: 100%;
												height: 100%;
												position: absolute;
												appearance: none;
												display: block;
												left: 0;
												right: 0;
												bottom: 0;
												top: 0;
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


}

</style>
