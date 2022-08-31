<template>
	<div class="text-muted">
		Loading
		<v-progress-circular indeterminate></v-progress-circular>
	</div>
</template>
<script>
export default {};
</script>
<style scoped lang="scss">
.v-progress-circular {
	opacity: 0.3;
	height: 1.1em !important;
	width: 1.1em !important;
	margin: 0;
	margin-left: 1em;
}
</style>
