export default {
	methods:{
		getColor(index) {
			var self = this;
			return self.options.colors[index % self.options.colors.length]
		},

	}
}