<template>
	<section class="fluro-card">
		<!-- <div class="card-body"> -->
		<slot></slot>
		<!-- </div> -->
	</section>
</template>

<style lang="scss">
.fluro-card {
	display: block;
	background: #fff;
	margin-bottom: 10px;
	text-align: left;
	border-radius: 4px;
	overflow: hidden;
	box-shadow: 0 3px 15px rgba(#000, 0.1);

	&[margin] {
		margin-bottom: 15px;
	}
}
</style>
