<template>
	<div class="backdrop">
		<v-sparkline
			v-if="values && values.length"
			:color="color"
			:fill="true"
			:height="60"
			:padding="0"
			:value="values"
			:smooth="4"
			auto-draw
		/>
	</div>
	<!-- <span class="inline-tag" :content="data | timeago" v-tippy>{{data | formatDate('MMM D, YYYY')}}</span> -->
</template>
<script>
export default {
	props: {
		context: {
			type: String,
		},
		row: {
			type: Object,
		},
		column: {
			type: Object,
		},
		data: {
			// type: Object,
		},
	},
	computed: {
		values() {
			return this.data || [];
		},
		color() {
			return this.column.color;
		},
	},
};
</script>
<style scoped lang="scss">
.backdrop {
	background: #eee;
	vertical-align: bottom;

	min-width: 200px;
	// height: 50px;

	svg {
		display: table;
		// width: 100%;
		// height: 100%;
		// display: inline-block;
		// vertical-align: bottom;
	}
}
</style>
