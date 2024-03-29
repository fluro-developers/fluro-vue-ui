<template>
	<div>
		<slot
			:nextPage="nextPage"
			:previousPage="previousPage"
			:setPage="setPage"
			:pageIndex="pageIndex"
			:currentPage="currentPage"
			:perPage="perPage"
			:items="items"
			:page="page"
			:totalPages="totalPages"
			:previousPageEnabled="previousPageEnabled"
			:nextPageEnabled="nextPageEnabled"
		/>
		<!-- <pre>previousPageEnabled {{previousPageEnabled}}</pre> -->
		<!-- <pre>nextPageEnabled {{nextPageEnabled}}</pre> -->
		<!-- 	<pre>totalPages {{totalPages}}</pre>
								<pre>pageIndex {{pageIndex}}</pre> -->
		<!-- <pre>items.length {{items.length}}</pre> -->
		<!-- <pre>page.length {{page.length}}</pre> -->
		<!-- <a @click="previousPage()">Back</a> -->
		<!-- <a @click="nextPage()">Forward</a> -->
		<!-- <pre>{{pa}}</pre> -->
	</div>
</template>
<script>
import Vue from 'vue';

export default {
	props: {
		perPage: {
			type: Number,
		},

		index: {
			type: Number,
			default: 0,
		},
		type: {
			type: String,
			required: true,
		},
		cumulative: {
			type: Boolean,
			default: false,
		},

		cacheKey: {
			type: [String, Number],
		},
		criteria: {
			type: Object,
			default() {
				return {
					allDefinitions: true,
					sort: {
						key: 'created',
						direction: 'desc',
						type: 'date',
					},
					filter: {
						operator: 'and',
						filters: [
							{
								key: 'status',
								comparator: 'in',
								values: ['active', 'draft'],
							},
						],
					},
				};
			},
		},
		fields: {
			type: Array,
			default() {
				return [];
			},
		},
	},

	watch: {
		criteria(c) {
			this.dataSource.criteria = c;
		},
		cumulative(c) {
			this.dataSource.cumulative = c;
		},
		type(c) {
			this.dataSource.type = c;
		},
		perPage(c) {
			this.dataSource.perPage = c;
		},

		index(c) {
			this.dataSource.pageIndex = c;
		},
		fields(c) {
			// ////console.log('fields changed', c);
			this.dataSource.fields = c;
		},
		cacheKey(c) {
			this.dataSource.cacheKey = c;
		},

		loading(val) {
			this.$emit('loading', val);
		},
	},
	data() {
		var dataSource = this.$fluro.content.list(this.type, {
			perPage: this.perPage,
			pageIndex: this.index,
			criteria: this.criteria,
			fields: this.fields,
			cumulative: this.cumulative,
			cacheKey: this.cacheKey,
		});

		return {
			items: dataSource.items,
			page: dataSource.page,
			totalPages: dataSource.totalPages,
			pageIndex: dataSource.pageIndex,
			dataSource, //Vue.observable(dataSource),
			loadingFilter: dataSource.loadingFilter,
			loadingPage: dataSource.loadingPage,
		};
	},
	activated() {
		this.mount();
	},
	mounted() {
		this.mount();
	},
	beforeDestroy() {
		this.unmount();
	},
	deactivated() {
		this.unmount();
	},
	methods: {
		mount() {
			this.dataSource.addEventListener('page', this.changePage);
			this.dataSource.addEventListener('items', this.changeItems);
			this.dataSource.addEventListener('totalPages', this.changeTotalPages);
			this.dataSource.addEventListener('perPage', this.changePerPage);
			this.dataSource.addEventListener('pageIndex', this.changePageIndex);
			this.dataSource.addEventListener('loadingFilter', this.changeLoadingFilter);
			this.dataSource.addEventListener('loadingPage', this.changeLoadingPage);

			this.changePage(this.dataSource.page);
			this.changeItems(this.dataSource.items);
			this.changeTotalPages(this.dataSource.totalPages);
			this.changePerPage(this.dataSource.perPage);
			this.changePageIndex(this.dataSource.pageIndex);
		},
		unmount() {
			this.dataSource.removeEventListener('page', this.changePage);
			this.dataSource.removeEventListener('items', this.changeItems);
			this.dataSource.removeEventListener('totalPages', this.changeTotalPages);
			this.dataSource.removeEventListener('perPage', this.changePerPage);
			this.dataSource.removeEventListener('pageIndex', this.changePageIndex);
			this.dataSource.removeEventListener('loadingFilter', this.changeLoadingFilter);
			this.dataSource.removeEventListener('loadingPage', this.changeLoadingPage);
		},
		setPage(i) {
			this.dataSource.index = i;
		},
		nextPage() {
			this.dataSource.nextPage();
		},
		previousPage() {
			this.dataSource.previousPage();
		},
		refresh() {
			this.dataSource.cacheKey = Math.random();
		},

		////////////////////////////////////////////

		changeLoadingFilter(loadingFilter) {
			this.loadingFilter = loadingFilter;
			this.$emit('loadingFilter', loadingFilter);
		},
		changeLoadingPage(loadingPage) {
			this.loadingPage = loadingPage;
			this.$emit('loadingPage', loadingPage);
		},
		changePageIndex(pageIndex) {
			this.pageIndex = pageIndex;
			this.$emit('pageIndex', pageIndex);
		},
		changePerPage(perPage) {
			this.$emit('perPage', perPage);
		},
		changeTotalPages(totalPages) {
			this.totalPages = totalPages;
			this.$emit('totalPages', totalPages);
		},
		changePage(page) {
			this.page = page;
			this.$emit('page', page);
		},
		changeItems(items) {
			// console.log('items is now', items)
			this.items = items;
			this.$emit('items', items);
		},
	},
	computed: {
		loading() {
			return this.loadingFilter || this.loadingPage;
		},
		previousPageEnabled() {
			return this.pageIndex > 0;
		},
		nextPageEnabled() {
			return this.pageIndex < this.totalPages - 1;
		},
		currentPage() {
			return this.pageIndex + 1;
		},
		// items() {
		// 				var items = this.dataSource.items;;
		// 				////console.log('ITEMS CHANGED', items);
		// 				return items;
		// },
		// page() {

		// 				var page = this.dataSource.page;;
		// 				////console.log('PAGE CHANGED', page);
		// 				return page;
		// },
	},
};
</script>
