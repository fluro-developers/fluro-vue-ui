import _ from 'lodash';

export default {
	props: {
		initPage: {
			type: [Number, String],
			default: 1,
		},
		pageSize: {
			type: Number,
			default: 50,
		},
	},
	data() {
		console.log('INITIAL PAGE IS', this.initPage);
		return {
			page: [],
			perPage: this.pageSize,
			currentPage: parseInt(this.initPage),
		};
	},
	filters: {
		numberWithCommas(x) {
			return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		},
	},
	methods: {
		setPage(pageNumber) {
			if (this.currentPage == pageNumber) {
				//console.log('Already at page', pageNumber)
				return;
			}

			console.log('SET PAGE NUMBER', pageNumber);
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

			// console.log('Recreate page!')
			this.$emit('page', pageNumber);
		},
		firstPage() {
			this.currentPage = 1;
		},
		lastPage() {
			this.currentPage = this.totalPages;
		},
		nextPage() {
			console.log('PAGES', this.currentPage, this.totalPages);
			this.currentPage < this.totalPages ? this.setPage(this.currentPage + 1) : this.setPage(this.totalPages);
		},
		previousPage() {
			this.currentPage > 1 ? this.setPage(this.currentPage - 1) : this.setPage(1);
		},
		selectPage() {
			if (!this.page || !this.page.length) {
				return;
			}

			if (this.selectionController) {
				this.selectionController.selectMultiple(this.page);
			}
		},
		deselectPage() {
			if (!this.page || !this.page.length) {
				return;
			}

			if (this.selectionController) {
				this.selectionController.deselectMultiple(this.page);
			}
		},
		selectAll() {
			if (this.selectionController) {
				this.selectionController.selectMultiple(this.rows);
			}
		},
		deselectAll() {
			if (this.selectionController) {
				this.selectionController.deselectAll();
			}
		},
	},
	computed: {
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
		totalPages() {
			return this.availablePages ? this.availablePages.length : 0;
		},
	},
};
