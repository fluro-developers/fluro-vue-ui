<template>
	<div class="fluro-content-render">
		<template v-for="(field, index) in fields">
			<!-- <pre>{{model}}</pre> -->
			<!-- <v-layout> -->
			<fluro-content-render-field
				:raw="raw"
				@actions="viewActions"
				@view="view"
				:field="field"
				:webMode="webMode"
				v-model="model"
				:key="index"
			></fluro-content-render-field>
			<!-- </v-layout> -->
		</template>
	</div>
</template>
<script>
import FluroContentRenderField from './FluroContentRenderField.vue';
import _ from 'lodash';

//////////////////////////////////////////////////

export default {
	name: 'fluro-content-render',
	props: {
		fields: {
			type: Array,
		},
		value: {
			type: Object,
		},
		raw: {
			type: Boolean,
		},
		webMode: {
			type: Boolean,
		},
	},
	watch: {
		value(v) {
			this.model = v;
		},
	},
	methods: {
		viewActions(array) {
			if (this.webMode) {
				this.$emit('actions', array);
			}
			if (this.$actions) {
				this.$actions.open(array);
			}

			this.$emit('actions', array);
		},
		view(item, modal) {
			if (this.webMode) {
				this.$emit('view', item, modal);
			}
			if (this.$fluro.global.view) {
				this.$fluro.global.view(item, modal);
			}

			this.$emit('view', item, modal);
		},
	},
	data() {
		return {
			model: this.value,
		};
	},
	components: {
		FluroContentRenderField,
	},
};
</script>
<style scoped lang="scss">
.fluro-content-form {
}

.fluro-content-render {
	flex: 1;
}
</style>
