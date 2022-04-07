export default {
	props: {
		options: {
			type: Object,
			default() {
				return {};
			},
		},
	},
	methods: {
		dismiss(error) {
			this.$emit('dismiss', error);
		},
		close(result) {
			this.$emit('close', result);
		},
	},
};
