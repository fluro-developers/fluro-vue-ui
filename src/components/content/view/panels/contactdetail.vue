<template>
	<flex-column-body>
		<v-container fluid>
			<constrain sm>
				<h1>{{item.title}}</h1>
				<fluro-content-render :fields="mainFields" v-model="item" />
				<fluro-content-render :fields="definedFields" v-model="item.data" />
			</constrain>
		</v-container>
	</flex-column-body>
</template>
<script>
/////////////////////////////////

import Vue from 'vue';
import FluroContentViewMixin from 'src/components/content/view/FluroContentViewMixin.js';
// import FluroContentRender from 'src/components/FluroContentRender.vue';

/////////////////////////////////

export default {
	props: {
		config: {
			type: Object,
			required: true,
		},
		item: {
			type: Object,
			required: true,
		},
	},
	// components: {
	//  FluroContentRender,
	// },
	mixins: [FluroContentViewMixin],
	methods: {},
	computed: {
		mainFields() {

			var array = [];

			array.push({
				title: 'Contact',
				key: 'contact',
				type: 'reference',
				minimum: 1,
				maximum: 1,
				params: {
					restrictType: 'contact',
				}
			})

			return array;
		},
		data() {
			return this.item.data || {}
		},
		definedFields() {
			return this.definition ? this.definition.fields : null;
		}
	},
	data() {
		return {}
	},
}

</script>
<style scoped lang="scss">
</style>
