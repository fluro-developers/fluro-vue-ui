<template>
	<div class="last-name-cell">
		<span
			><strong>{{ row.lastName }}</strong>
			<span class="muted" v-if="row.maidenName">&nbsp;({{ row.maidenName }})</span></span
		>
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
		status: {
			type: Boolean,
			default() {
				return false;
			},
		},
	},
};
</script>
<style lang="scss"></style>
