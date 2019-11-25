export default {
	computed: {
		theme() {
			return {
				colors:[
				'#008FFB', 
				'#00E396', 
				'#FEB019', 
				'#FF4560', 
				'#775DD0', 
				'#7adc12',
				'#f34be2',
				'#b76b1a',
				'#ff7800',

			]
			}
		}
	},
	methods:{
		getColor(index) {
			var self = this;
			return self.theme.colors[index % self.theme.colors.length]
		}
	}
}