<template>
	<div>
		<span class="status-label active" v-if="row.user"> <fluro-icon icon="check" />Connected</span>
		<span class="status-label draft" v-else-if="row.collectionEmail && row.collectionEmail.length">
			<fluro-icon icon="clock" />Awaiting Collection</span
		>
		<span class="status-label archived" v-else-if="row.username && row.username.length">
			<fluro-icon icon="user" />Whitelabel</span
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
	},
};
</script>
