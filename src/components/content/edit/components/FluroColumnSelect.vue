<template>
	<fluro-panel >
		<fluro-panel-body class="border-bottom" :key="index" v-for="(column, index) in model">
			<fluro-column-select-item v-model="model[index]" />
		</fluro-panel-body>
		<fluro-panel-body>
			<v-btn @click="add()">Add item</v-btn>

		</fluro-panel-body>
	</fluro-panel>
</template>
<script>
import FluroColumnSelectItem from 'src/components/content/edit/components/FluroColumnSelectItem.vue';

export default {
	props: {
		value: {
			type: Array,
			default () {
				return [];
			}
		}
	},
	data() {
		return {
			model: this.value,
		}
	},
	components: {
		FluroColumnSelectItem,
	},
	methods: {
		add() {
			this.model.push({});
		},
	},
	computed: {},
	watch: {
		value(v) {
			if (v != this.model) {
				this.model = v;
			}
		},
		model(v) {
			this.$emit('input', v);
		}
	},

}

</script>
<style lang="scss">
</style>
