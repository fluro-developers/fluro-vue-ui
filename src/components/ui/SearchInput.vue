<template>
	<div class="search-input" :class="{ active: searchFocussed || model.length }">
		<input
			ref="input"
			@focus="searchFocussed = true"
			:autofocus="autofocus"
			@blur="searchFocussed = false"
			:placeholder="placeholder"
			v-model="model"
		/>
		<div class="search-icon" @click="reset()">
			<fluro-icon :icon="icon" :spin="processing" />
			<!-- <fluro-icon icon="search" v-else /> -->
		</div>
	</div>
</template>
<script>
var debouncer;

export default {
	props: {
		placeholder: {
			type: String,
			default: 'Search by keyword',
		},
		value: {
			type: String,
			default: '',
		},
		debounce: {
			type: Number,
			default: 300,
		},
		processing: {
			type: Boolean,
		},
		autofocus: {
			type: Boolean,
		},
	},
	computed: {
		icon() {
			if (this.processing) {
				return 'spinner-thirds';
			}

			if (this.model.length) {
				return 'times';
			}

			return 'search';
		},
	},
	data() {
		return {
			model: this.value,
			searchFocussed: false,
		};
	},
	watch: {
		model() {
			var self = this;

			if (debouncer) {
				clearTimeout(debouncer);
			}

			debouncer = setTimeout(() => self.change(), self.debounce);
		},
		value(value) {
			this.model = value;
		},
	},
	methods: {
		change() {
			this.$emit('input', this.model);
		},
		reset() {
			this.model = '';
			this.$emit('input', '');
		},
	},
};
</script>
<style lang="scss">
.search-input {
	position: relative;
	border-radius: 3px;
	border: 1px solid #ccc;
	overflow: hidden;

	&.active {
		border-color: $primary;
	}

	input {
		line-height: 35px;
		height: 35px;
		display: block;
		width: 100%;
		padding: 0 45px 0 10px;
		border: none;
		background: none;

		&:focus {
			outline: none;
			box-shadow: none;
		}
	}

	.search-icon {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		width: 35px;
		height: 35px;
		text-align: center;
		line-height: 35px;
	}
}
</style>
