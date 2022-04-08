<template>
	<flex-column-body>
		<v-container fluid>
			<constrain sm>
				<h1>{{ item.title }}</h1>

				<fluro-content-render :fields="definedFields" v-model="item.data" />
				<template v-if="item.body && item.body.length">
					<div v-html="item.body"></div>
				</template>
			</constrain>
		</v-container>
	</flex-column-body>
</template>
<script>
/////////////////////////////////

import Vue from 'vue';
import FluroContentViewMixin from '../FluroContentViewMixin.js';
// import FluroContentRender from '../../../FluroContentRender.vue';

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
	//     FluroContentRender,
	// },
	mixins: [FluroContentViewMixin],
	methods: {},
	computed: {
		data() {
			return this.item.data || {};
		},
		definedFields() {
			return this.definition ? this.definition.fields : null;
		},
	},
	data() {
		return {};
	},
};
</script>
<style scoped lang="scss"></style>
