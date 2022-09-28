<template>
	<span :class="classes" class="status-label">{{ output }}</span>
</template>
<script>
export default {
	props: {
		value: {
			type: String,
		},
		text: {
			type: String,
		},
		large: {
			type: Boolean,
		},
	},
	computed: {
		output() {
			var value = this.text || this.value;

			switch (value) {
				case 'refund':
					value = 'Refunded';
					break;
				case 'denied':
					value = 'Unavailable';
					break;
				case 'partial_refund':
					value = 'Partial Refund';
					break;
			}

			return value;
		},
		classes() {
			var array = [this.value];

			if (this.large) {
				array.push('large');
			}

			return array;
		},
	},
};
</script>
<style lang="scss">
.status-label {
	display: inline-block;
	text-transform: uppercase;
	font-weight: 600;
	letter-spacing: 0.05em;
	font-size: 0.7em;
	padding: 3px 8px 2px 8px;
	border-radius: 24px;
	margin: 0 2px 2px 2px;

	background: rgba(#000, 0.01);
	color: rgba(#000, 0.1);

	&.large {
		font-size: 1em;
		letter-spacing: 0.03em;
		padding: 0.5em 0.8em;
		line-height: 1;
		margin: 0 0.2em 0.2em 0;
	}

	&.template {
		background: #e9dbff !important;
		color: #864ef0 !important;
	}

	&.draft,
	&.trial,
	&.sent,
	&.sandbox,
	&.scheduled,
	&.yellow,
	&.partial_refund,
	&.warning {
		background: #f7bf34 !important;
		color: #fff !important;
	}

	&.delivered,
	&.click,
	&.open,
	&.live,
	&.ready,
	&.active,
	&.green,
	&.confirmed,
	&.success {
		background: #54d68e !important;
		color: #fff !important;
	}

	&.denied,
	&.declined,
	&.error,
	&.failed,
	&.red,
	&.danger {
		color: #fff !important;
	}

	&.refund,
	&.archived,
	&.unsubscribe,
	&.sent {
		background: rgba(#edeef0, 0.9) !important;
		color: rgba(#222222, 0.5) !important;
	}

	&[right] {
		float: right;
	}
}
</style>
