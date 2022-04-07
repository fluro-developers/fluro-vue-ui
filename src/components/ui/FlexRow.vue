<template>
	<div class="flex-row">
		<slot></slot>
	</div>
</template>
<script>
export default {};
</script>
<style lang="scss">
.flex-row {
	display: flex;
	overflow: hidden;
	flex: 1;
	flex-direction: row;
}
</style>
