<template>
	<div class="flex-column-body">
		<slot></slot>
	</div>
</template>
<script>
export default {};
</script>

<style lang="scss">
.flex-column-body {
	overflow-y: auto;
	overflow-x: hidden;
	-webkit-overflow-scrolling: touch;
	flex: 1;

	overscroll-behavior-x: none !important;
	// overscroll-behavior-y: none !important;
	// overscroll-behavior: none !important;
}
</style>
