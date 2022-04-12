<template>
	<div class="privacy-select">
		<!-- <div class="privacy-select btn-group btn-group-justified"> -->
		<a class="privacy-select-button" @click="select('secure')" :class="{ active: model == 'secure' }">
			<div>
				<fluro-icon class="icn" icon="lock-alt" /><br />
				<strong>Secure</strong><br />
				<em>Only users and applications with correct permissions can view</em>
			</div>
		</a>
		<a class="privacy-select-button" @click="select('public')" :class="{ active: model == 'public' }">
			<div>
				<fluro-icon class="icn" icon="globe" /><br />
				<strong>Public</strong><br />
				<em>Anyone in the world can view</em>
			</div>
		</a>
		<!-- </div> -->
	</div>
</template>

<script>
export default {
	props: {
		value: {
			type: String,
			default: 'secure',
		},
	},
	data() {
		return {
			model: this.value,
		};
	},
	watch: {
		value() {
			this.model = this.value;
		},
	},
	methods: {
		select(value) {
			this.model = value;
			this.$emit('input', value);
		},
	},
};
</script>
<style lang="scss">
.privacy-select {
	display: flex;
	border-radius: 5px;
	// border:1px solid rgba(#000, 0.1);

	.privacy-select-button {
		border: 1px solid rgba(#000, 0.1);
		// border-top:1px solid rgba(#fff, 0.2);
		text-align: center;
		color: inherit;
		// color:rgba(#000,0.5);
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 20px 10px;
		transition: all 0.2s;
		background: linear-gradient(#fff, #eee);

		&.active {
			background: darken(desaturate($primary, 90%), 20%);
			color: #fff !important;
			box-shadow: inset 5px 20px 50px rgba(#000, 0.3);
		}

		.icn {
			font-size: 1.3em;
			opacity: 0.5;
		}

		em {
			font-size: 0.8em;
			font-style: italic;
			opacity: 0.5;
			height: 30px;
			line-height: 13px;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		&:first-child {
			border-radius: 4px 0 0 4px;
		}

		&:last-child {
			border-radius: 0 4px 4px 0;
		}
	}
}
</style>
