<template>
	<div>
		METRICS DASHBOARD
	</div>
</template>
<script>
	
export default {
	props:{
		id:{
			type:[Object, String],
		},
		type:{
			type:String,
		}
	},
	computed:{

	},
	asyncComputed:{
		model:{
			default:{},
			get() {

				var self = this;

				var id = self.$fluro.utils.getStringID(self.id);



				return new Promise(function(resolve, reject) {
					//Load the chart data

					switch(self.type) {
						case 'team':
						break;
						case 'realm':
						break;
						case 'contact':
						break;
					}
				})
			}
		}
	}
}

</script>

<style lang="scss">
	
</style>