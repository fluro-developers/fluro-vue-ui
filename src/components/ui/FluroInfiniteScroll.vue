<template>
	<div class="infinite-scroll-container" ref="container">
		<div :index="key" v-for="(page, key) in availablePages" v-if="key <= limit" :key="key">
			<slot v-bind:page="page" />
		</div>
	</div>
</template>
<script>
import _ from 'lodash';

export default {
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
			default: 3,
		},
		scrollParent: {
			default() {
				return {};
			},
		},
	},
	data() {
		return {
			currentIndex: 0,
			parentElement: null,
		};
	},
	destroyed() {
		var self = this;
		self.parentElement.removeEventListener('scroll', self.updateScroll);
	},
	mounted() {
		var self = this;
		self.parentElement.addEventListener('scroll', self.updateScroll);
	},
	computed: {
		availablePages() {
			return _.chunk(this.items, this.perPage);
		},
		total() {
			return this.availablePages.length;
		},
		limit() {
			return this.currentIndex + this.buffer;
		},
		currentPage: {
			get() {
				return this.currentIndex;
			},
			set(integer) {
				integer = Math.max(integer, 0);
				integer = Math.min(integer, this.total - 1);
				this.currentIndex = integer;
			},
		},
	},
	methods: {
		hitBuffer(value1, value2, buffer) {
			var match = Math.abs(value1 - value2);
			return match < buffer;
		},
		updateScroll() {
			var self = this;

			var maxScrollHeight = self.parentElement.scrollHeight;
			var currentScroll = self.parentElement.scrollTop;
			var parentHeight = self.parentElement.clientHeight;
			var limit = maxScrollHeight - parentHeight;

			if (self.hitBuffer(currentScroll, limit, parentHeight / 2)) {
				return self.hitBottom();
			}

			if (self.hitBuffer(currentScroll, 0, parentHeight / 2)) {
				return self.hitTop();
			}
		},
		hitTop() {
			this.currentPage--;
		},
		hitBottom() {
			this.currentPage++;
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
