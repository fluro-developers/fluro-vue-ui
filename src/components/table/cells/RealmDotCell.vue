<template>
	<!-- <div> -->
	<!-- <pre>{{data}}</pre> -->
	<div v-if="context != 'print'">
		<fluro-realm-dots v-if="$vuetify.breakpoint.smAndUp" :realms="realms" />
		<fluro-realm-bar v-if="$vuetify.breakpoint.xsOnly" :realm="realms" />
	</div>
	<!-- </div> -->
</template>
<script>
export default {
	props: {
		context: {
			type: String,
		},
		row: {
			type: Object,
		},
		column: {
			type: Object,
		},
		data: {
			// type: Object,
		},
	},
	computed: {
		realms() {
			if (this.row._type == 'realm') {
				return [this.row];
			}

			return this.data;
		},
	},
};
</script>
