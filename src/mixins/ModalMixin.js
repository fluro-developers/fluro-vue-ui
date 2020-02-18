export default {
	props:{
		options:{
			type:Object,
            default() {
                return {}
            }
		}
	},
    methods: {
        dismiss() {
            this.$emit('dismiss');
        },
        close(result) {
            this.$emit('close',result);
        },
    }
}