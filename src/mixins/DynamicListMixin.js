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
			default() {
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
			default() {
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
			cacheKey: null,
			all: [], //Including unmatched
			rows: [], //Only the rows that match
			groupingColumn: null,
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
		search: _.debounce(function (newValue) {
			// console.log('Search changed!')
			this.debouncedSearch = newValue;
			// this.refine();
		}, 500),
		reloadRequired: {
			immediate: true,
			handler: _.debounce(function (string) {
				// console.log('RELOAD NOW')
				this.reload();
			}, 500)
		},
	},

	methods: {
		updateCacheKey() {
			this.cacheKey = this.$fluro.global.CACHE_KEY;
		},
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

			}

			/////////////////////////////////////////////////////////////

			if (this.select) {
				filterCriteria.select = this.select;
			}

			if (this.populateAll) {
				filterCriteria.populateAll = this.populateAll;
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

			/////////////////////////////////////////////////////////////
			/////////////////////////////////////////////////////////////
			/////////////////////////////////////////////////////////////

			//Load just the IDS from the server and required fields
			return self.$fluro.api.post(`/content/${self.dataType}/filter`, filterCriteria)
				.then(function (res) {
					self.all = res.data;
					self.$emit('raw', self.all);

					self.rows = _.filter(res.data, { _matched: true });
					self.$emit('filtered', self.rows);
					if (self.setPage) {
						self.setPage(1);
					}

					self.loadingItems = false;
				})
				.catch(function (err) {
					self.loadingItems = false;
					self.rows = [];
					self.$emit('filtered', self.rows);


					self.all = [];
					self.$emit('raw', self.all);
					if (self.setPage) {

						self.setPage(1);
					}

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
			console.log('RELOAD REQUIRED', this.searchInheritable)
			return `${this.cacheKey}-${this.searchInheritable}-${this.dataType}-${this.filterCheckString} ${this.dateWatchString} ${this.sort.sortKey} ${this.sort.sortDirection} ${this.sort.sortType} ${this.groupingColumn ? this.groupingColumn.key : ''}  ${this.debouncedSearch}`;
		},
		activeFilters() {
			return FilterService.activeFilters(this.filterConfig);
		},
		activeFilterRows() {
			var self = this;

			return _.filter(self.activeFilters, function (row) {
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
