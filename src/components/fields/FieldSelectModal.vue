<template>
	<div>
		<pre>{{sheets}}</pre>
	</div>
</template>
<script>

import { FluroModalMixin } from 'fluro-vue-ui';

export default {
	components:{
		FluroModalMixin,
	},
	data() {
		return {
			loading:true,
		}
	},
	asyncComputed:{
		
	}
}

</script>
<style lang="scss">
	
</style>