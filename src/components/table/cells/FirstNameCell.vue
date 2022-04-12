<template>
	<div class="first-name-cell">
		<span
			><strong>{{ row.preferredName || row.firstName }}</strong>
			<span class="muted" v-if="row.preferredName && row.preferredName != row.firstName"
				>&nbsp;({{ row.firstName }})</span
			>
			<span class="muted" v-if="row.ethnicName">&nbsp;{{ row.ethnicName }}</span></span
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
