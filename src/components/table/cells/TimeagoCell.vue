<template>
	<div class="sm muted">
		{{ data | timeago }}
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
};
</script>
<style lang="scss"></style>
