<template>
	<div>
		{{ dimensions }}
	</div>
</template>
<script>
export default {
	props: {
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
		dimensions() {
			return `${this.row.width}x${this.row.height}`;
		},
	},
};
</script>
<style lang="scss" scoped>
div {
	font-size: 0.9em;
	opacity: 0.5;
}
</style>
