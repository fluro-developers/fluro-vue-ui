<template>
	<div class="constrain">
		<slot></slot>
	</div>
</template>

<script>
export default {};
</script>
<style scoped lang="scss">
.constrain {
	margin: auto;
	max-width: 1200px;

	&[gutterless] {
		padding: 0;
	}

	&[xs] {
		max-width: 320px;
	}

	&[sm] {
		max-width: 740px;
	}

	&[md] {
		max-width: 1200px;
	}

	&[lg] {
		max-width: 1600px;
	}

	&[left] {
		margin: 0;
	}

	&[centered] {
		text-align: center;
	}
}

// .block + .block {
// 	padding-top:0;
// }

// @media(max-width: 768px) {
// 	.block {
// 		padding: 0;
// 	}
// }
</style>
