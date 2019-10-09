export default {
    methods: {
        dismiss() {
            this.$emit('dismiss');
        },
        close(result) {
            this.$emit('close',result);
        },
    }
}