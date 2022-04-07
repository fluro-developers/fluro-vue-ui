<template>
	<div class="infinite-scroll-container" ref="container">
		<div id="top" class="top-spacer" ref="top"></div>
		<fluro-infinite-page :page="page" :index="key" v-for="(page, key) in availablePages" v-if="key <= currentPage">
			<slot v-bind:page="page" />
		</fluro-infinite-page>
		<div id="bottom" class="bottom-spacer" ref="bottom"></div>
	</div>
</template>
<script>
import _ from 'lodash';

import FluroInfinitePage from './FluroInfiniteScrollPage.vue';

export default {
	components: {
		FluroInfinitePage,
	},
	props: {
		items: {
			type: Array,
			default: function () {
				return [];
			},
		},
		perPage: {
			type: Number,
			default: 4,
		},
		buffer: {
			type: Number,
			default: 4,
		},
		scrollParent: {
			default() {
				return {};
			},
		},
	},
	provide() {
		return {
			observeElement: this.observeElement,
			stopObservingElement: this.stopObservingElement,
			currentPage: this.currentPage,
		};
	},
	data() {
		return {
			observer: null,
			currentIndex: 0,
			parentElement: null,
			topElement: null,
			bottomElement: null,
		};
	},
	destroyed() {
		var self = this;
		self.observer.disconnect();
	},
	mounted() {
		var self = this;
		var parentElement = (self.parentElement = this.$el.closest('[scroll-parent]') || this.$el.closest('body'));
		var topElement = (self.topElement = this.$refs.top);
		var bottomElement = (self.bottomElement = this.$refs.bottom);

		//////////////////////////////////////////////////////

		if (!self.observer) {
			const options = {
				root: self.parentElement,
				// threshold: 0.9,
			};

			var observer = new IntersectionObserver(self.intersectionCallback, options);
			observer.observe(topElement);
			observer.observe(bottomElement);
			self.observer = observer;
		}
	},

	computed: {
		availablePages() {
			var self = this;
			return _.chunk(this.items, this.perPage);
		},
		total() {
			return this.availablePages.length;
		},
		currentPage: {
			get() {
				return this.currentIndex;
			},
			set(integer) {
				integer = Math.max(integer, 0);
				integer = Math.min(integer, this.total - 1);
				this.currentIndex = integer;
				console.log('PAGE', integer);
			},
		},
	},
	methods: {
		observeElement(element) {
			if (this.observer) {
				// console.log('Observe element', element)
				this.observer.observe(element.$el);
			}
		},
		stopObservingElement(element) {
			if (this.observer) {
				// console.log('Unobserve element', element)
				this.observer.unobserve(element.$el);
			}
		},
		intersectionCallback(entries) {
			// : _.debounce(function(entries) {

			var self = this;
			var topElement = this.topElement;
			var bottomElement = this.bottomElement;

			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					if (entry.target == bottomElement) {
						return self.hitBottom();
					}

					//////////////////////////////////////////

					if (entry.target == topElement) {
						return self.hitTop();
					}
				}
			});
		},
		hitTop() {
			this.currentPage--;
			// if (this.currentPage > 0) {
			//     this.parentElement.scrollTop = this.parentElement.scrollTop + (this.parentElement.clientHeight / 3);
			// }
		},

		hitBottom() {
			this.currentPage++;
			// if (this.currentPage < this.total - 1) {
			//     this.parentElement.scrollTop = this.parentElement.scrollHeight - (this.parentElement.clientHeight / 3);
			// }

			// setTimeout(function() {
			//     this.busy = false;
			// }, 200)
		},
	},
};
</script>
<style scoped lang="scss">
.infinite-scroll-container {
	position: relative;
}

.bottom-spacer {
	pointer-events: none;
	height: 1px;
	background: #ff0066;
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	opacity: 0.1;
}

.top-spacer {
	pointer-events: none;
	height: 1px;
	background: #ff0066;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	opacity: 0.1;
}
</style>
