<template>
	<div class="list-group">
		<slot></slot>
	</div>
</template>
<script>
export default {};
</script>
<style lang="scss">
.list-group {
	border: 1px solid rgba(#000, 0.1);
	border-radius: 3px;
	margin-bottom: 15px;
}
</style>
