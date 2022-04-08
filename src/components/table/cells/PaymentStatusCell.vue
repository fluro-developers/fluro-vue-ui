<template>
	<div class="text-xs-center">
		<span class="payment-failed" v-tippy content="Failed" v-if="data == 'failed'">
			<fluro-icon icon="times" />
		</span>
		<span class="payment-success" v-tippy content="Success" v-else-if="data == 'success'">
			<fluro-icon icon="check" />
		</span>
		<span class="payment-pending" v-tippy content="Pending" v-else-if="data == 'pending'">
			<fluro-icon icon="clock" />
		</span>
		<div class="payment-archived" v-else-if="data == 'refund'">Refund</div>
		<div class="payment-archived" v-else-if="data == 'partial_refund'">Partial Refund</div>
		<div class="payment-manual" v-else>
			{{ data }}
		</div>
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
<style scoped lang="scss">
// span {
//     opacity: 0.5;
//     font-size: 0.8em;
// }
//
span {
	border-radius: 100%;
	display: inline-block;
	width: 26px;
	height: 26px;
	line-height: 26px;
	// font-size: 13px;
	text-align: center;
}

.payment-pending {
	// background: #fff3b9;
	// color: #f0974e;
}

.payment-success {
	// background: rgba(#51d432, 0.2);
	color: #51d432;
}

.payment-failed {
	// background: rgba(#d33131, 0.2);
	color: #d33131;
}

.payment-archived,
.payment-manual {
	// background: rgba(#000, 0.05);
	color: rgba(#000, 0.3);
}

// .payment-failed {
//     color: $danger;
// }

// .payment-success {
//     color: $success;
// }

// .payment-pending {
//     color: $warning;
// }
</style>
