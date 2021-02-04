import { FilterService } from 'fluro';

/////////////////////////////////

import _ from 'lodash';


/////////////////////////////////

export default {
				props: {

								changeKey: {
												type: [String, Number],
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
								lockFilter: {
												type: Object,
								},
								allDefinitions: {
												type: Boolean,
												default: false,
								},
								searchInheritable: {
												type: Boolean,
												default: false,
								},
								includeArchivedByDefault: {
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
								dataType: {
												type: String,
								},
								defaultSort: {
												type: String,
								},
								defaultSortType: {
												type: String,
								},
								defaultSortDirection: {
												type: String,
								},
								initSort: {
												type: Object,
												default () {
																var defaultSort = {
																				key: this.defaultSort,
																				direction: this.defaultSortDirection,
																				type: this.defaultSortType,
																}
																return defaultSort;
												},
								},

				},
				data() {
								return {
												reloadChangeKey: 0,
												cacheKey: null,
												all: [], //Including unmatched
												rows: [], //Only the rows that match
												groupingColumn: null,
												unwindColumn: null,
												debouncedSearch: this.search,
												loadingItems: true,
												sort: JSON.parse(JSON.stringify(this.initSort)),
								}
				},
				watch: {
								searchInheritable() {
												this.reload();
								},
								changeKey() {
												this.reload();
								},
								search: _.debounce(function(newValue) {
												// console.log('Search changed!')
												this.debouncedSearch = newValue;
												// this.refine();
								}, 500),
								unwindColumn: 'debouncedReload',
								reloadRequired: {
												immediate: true,
												handler: 'debouncedReload',

								},
				},

				methods: {
								unwind(rows, unwindKey) {
												if (!rows || !rows.length) {
																return rows;
												}

												if (!unwindKey || !unwindKey.length) {
																return rows;
												}

												/////////////////////////////////////////

												var unwound = _.chain(rows)
																.map(function(row) {

																				//Get the array value
																				var array = _.get(row, unwindKey);

																				//If it's not an array return the original node
																				if (!array || !_.isArray(array) || !array.length) {
																								return row;
																				}

																				//Return an entry for each unwound value
																				return _.chain(array)
																								// .compact()
																								.map(function(indValue, i) {

																												//Clone the node
																												var clone = JSON.parse(JSON.stringify(row));
																												clone.unwindKey = i;

																												//Set the single entry from the array to replace the original array key
																												_.set(clone, unwindKey, indValue);
																												return clone;
																								})
																								.value();
																})
																.flattenDeep()
																.compact()
																.value();


												return unwound;
								},
								updateCacheKey() {
												this.cacheKey = this.$fluro.global.CACHE_KEY;
								},
								debouncedReload: _.debounce(function(string) {
												console.log('RELOAD NOW')
												this.reload();
								}, 500),
								reload() {

												var self = this;

												//////////////////////////////////////////

												self.loadingItems = true;

												///////////////////////////////////////

												var sort = self.sort;


												var filter = JSON.parse(JSON.stringify(self.filterConfig));

												if (this.lockFilter) {
																if (filter.operator == 'and') {
																				filter.filters.push(this.lockFilter);
																} else {
																				filter = this.lockFilter.filters.push(filter);
																}


																console.log('LOCK FILTER CHECK', filter);
												}

												///////////////////////////////////////

												var filterCriteria = {
																// return self.$fluro.api.get(`/system/test`, {
																sort,
																filter, //: self.filterConfig,
																search: self.debouncedSearch,
																includeArchived: self.includeArchived,
																allDefinitions: self.allDefinitions,
																searchInheritable: self.searchInheritable,
																includeUnmatched: true,
																groupingColumn: self.groupingColumn ? self.groupingColumn.key : undefined,
																unwindColumn: self.unwindColumn ? self.unwindColumn.key : undefined,

												}

												/////////////////////////////////////////////////////////////

												if (self.select) {
																filterCriteria.select = self.select;
												}


												var joinColumns = self.joins || [];

												if (self.unwindColumn && self.unwindColumn.key) {
																joinColumns.push(self.unwindColumn.key);
												}

												if (joinColumns && joinColumns.length) {
																filterCriteria.joins = joinColumns;
												}

												if (self.populateAll) {
																filterCriteria.populateAll = self.populateAll;
												}
												/////////////////////////////////////////////////////////////
												/////////////////////////////////////////////////////////////
												/////////////////////////////////////////////////////////////
												/////////////////////////////////////////////////////////////

												var startDate = self.calendarStartDate || self.startDate || (this.lockFilter ? this.lockFilter.startDate : null);
												if (startDate) {
																startDate = new Date(startDate);
																startDate.setHours(0, 0, 0, 0);
																filterCriteria.startDate = startDate;
												}

												var endDate = self.calendarEndDate || self.endDate || (this.lockFilter ? this.lockFilter.endDate : null);
												if (endDate) {
																endDate = new Date(endDate);
																endDate.setHours(23, 59, 59, 999);
																filterCriteria.endDate = endDate;
												}





												//Include the timezone of the current requesting user
												filterCriteria.timezone = self.$fluro.date.defaultTimezone;


												// console.log('FILTER ROWS', self.renderColumns, self.select)

												/////////////////////////////////////////////////////////////
												/////////////////////////////////////////////////////////////
												/////////////////////////////////////////////////////////////

												//Load just the IDS from the server and required fields
												return self.$fluro.api.post(`/content/${self.dataType}/filter`, filterCriteria)
																.then(function(res) {


																				var unwound = res.data;

																				/////////////////////////////


																				if (self.unwindColumn && self.unwindColumn.key) {

																								// console.log('Got the original data', unwound, self.unwindColumn.key)
																								unwound = self.unwind(unwound, self.unwindColumn.key);
																								// console.log('UNWIND THE DATA')
																				}

																				/////////////////////////////

																				self.all = unwound;
																				self.$emit('raw', self.all);

																				self.rows = _.filter(unwound, { _matched: true });
																				self.$emit('filtered', self.rows);
																				if (self.setPage) {
																								self.setPage(1);
																				}

																				self.loadingItems = false;
																				self.reloadChangeKey++;
																})
																.catch(function(err) {
																				self.loadingItems = false;
																				self.rows = [];
																				self.$emit('filtered', self.rows);


																				self.all = [];
																				self.$emit('raw', self.all);
																				if (self.setPage) {

																								self.setPage(1);
																				}

																				self.reloadChangeKey++;

																				if (self.$fluro.api.axios.isCancel(err)) {
																								// return reject(err);
																								//console.log('Nothing man!')
																				} else {

																				}
																});
								},
				},
				computed: {
								includeArchived() {
												return this.includeArchivedByDefault
								},
								reloadRequired() {
												console.log('RELOAD REQUIRED', this.unwindColumn)
												return `${this.cacheKey}-${this.searchInheritable}-${this.dataType}-${this.joins}-${this.filterCheckString} ${this.dateWatchString} ${this.sort.sortKey} ${this.sort.sortDirection} ${this.sort.sortType} ${this.groupingColumn ? this.groupingColumn.key : ''} ${this.unwindColumn ? this.unwindColumn.key : ''}  ${this.debouncedSearch}`;
								},
								activeFilters() {
												return FilterService.activeFilters(this.filterConfig);
								},
								activeFilterRows() {
												var self = this;

												return _.filter(self.activeFilters, function(row) {
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
								filterCheckString() {

												var filterString = FilterService.getFilterChangeString(this.filterConfig);
												// console.log('Filters changed', filterString)
												return filterString;
								},
								dateWatchString() {

												var startDate = this.calendarStartDate || this.startDate;
												if (!startDate) {
																return
												}

												var endDate = this.calendarEndDate || this.endDate;
												if (!endDate) {
																return
												}

												startDate = new Date(startDate);
												startDate.setHours(0, 0, 0, 0);

												endDate = new Date(endDate);
												endDate.setHours(0, 0, 0, 0);



												return `${startDate.getTime()} ${endDate.getTime()}`;
								},
				},

				created() {
								this.$fluro.addEventListener('cache.reset', this.updateCacheKey);
				},
				beforeDestroy() {
								this.$fluro.removeEventListener('cache.reset', this.updateCacheKey);
				},
}
