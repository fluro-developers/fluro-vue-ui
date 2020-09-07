<template>
				<div>
								<slot :nextPage="nextPage" :previousPage="previousPage" :setPage="setPage" :pageIndex="pageIndex" :currentPage="currentPage" :perPage="perPage" :items="items" :page="page" :totalPages="totalPages" :previousPageEnabled="previousPageEnabled" :nextPageEnabled="nextPageEnabled" />
								<!-- <pre>previousPageEnabled {{previousPageEnabled}}</pre> -->
								<!-- <pre>nextPageEnabled {{nextPageEnabled}}</pre> -->
								<!-- <pre>totalPages {{totalPages}}</pre> -->
								<!-- <pre>pageIndex {{pageIndex}}</pre> -->
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
												default:false,
								},
								criteria: {
												type: Object,
												default () {
																return {
																				sort: {
																								key: 'created',
																								direction: 'dsc',
																								type: 'date',
																				},
																				filter: {
																								operator: 'and',
																								filters: [{
																												key: 'status',
																												comparator: 'in',
																												values: ['active', 'draft'],
																								}]
																				}
																}
												}
								},
								fields: {
												type: Array,
												default () {
																return [];
												}
								}
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
				},
				data() {

								var dataSource = this.$fluro.content.list(this.type, {
												perPage: this.perPage,
												pageIndex: this.index,
												criteria: this.criteria,
												fields: this.fields,
												cumulative:this.cumulative,
								})

								return {
												items: dataSource.items,
												page: dataSource.page,
												totalPages: dataSource.totalPages,
												pageIndex: dataSource.pageIndex,
												dataSource: Vue.observable(dataSource),
												loadingFilter: dataSource.loadingFilter,
												loadingPage: dataSource.loadingPage,
								}
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
												this.dataSource.addEventListener('pageIndex', this.changePageIndex);
												this.dataSource.addEventListener('loadingFilter', this.changeLoadingFilter);
												this.dataSource.addEventListener('loadingPage', this.changeLoadingPage);
								},
								unmount() {
												this.dataSource.removeEventListener('page', this.changePage);
												this.dataSource.removeEventListener('items', this.changeItems);
												this.dataSource.removeEventListener('totalPages', this.changeTotalPages);
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
								changeTotalPages(totalPages) {
												this.totalPages = totalPages;
												this.$emit('totalPages', totalPages);
								},
								changePage(page) {
												this.page = page;
												this.$emit('page', page);
								},
								changeItems(items) {
												this.items = items;
												this.$emit('items', items);
								},
				},
				computed: {
								loading() {
												return this.loadingFilter || this.loadingPage;
								},
								previousPageEnabled() {
												return (this.pageIndex > 0);
								},
								nextPageEnabled() {
												return (this.pageIndex < this.totalPages - 1);
								},
								currentPage() {
												return this.pageIndex + 1;
								},
								// items() {
								// 				var items = this.dataSource.items;;
								// 				console.log('ITEMS CHANGED', items);
								// 				return items;
								// },
								// page() {

								// 				var page = this.dataSource.page;;
								// 				console.log('PAGE CHANGED', page);
								// 				return page;
								// },

				},

}

</script>
