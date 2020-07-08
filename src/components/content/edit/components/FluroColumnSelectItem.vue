<template>
	<div>
		<v-layout>
			<v-flex>
				<fluro-content-form-field :field="fields.title" v-model="model" />
			</v-flex>
			<v-flex>
				<fluro-content-form-field :field="fields.key" v-model="model" />
			</v-flex>
			<v-flex>
				<fluro-content-form-field :field="fields.type" v-model="model" />
			</v-flex>
			<v-flex shrink>
				<v-btn @click="$emit('remove')" icon>
					<fluro-icon icon="trash-alt" />
				</v-btn>
			</v-flex>
		</v-layout>
		Item
	</div>
</template>
<script>
import FluroContentFormField from 'src/components/form/FluroContentFormField.vue';

export default {
	props: {
		value: {
			type: Object,
		}
	},
	data() {
		return {
			model: this.value,
		}
	},
	methods: {},
	components: {
		FluroContentFormField,
	},
	computed: {
		fields() {

			var self = this;


			var fields = {};


			fields.title = {
				title: 'Title',
				key: 'title',
				minimum: 0,
				maximum: 1,
				type: 'string',
			}

			fields.key = {
				title: 'Key',
				key: 'key',
				minimum: 0,
				maximum: 1,
				type: 'string',
			}

			fields.renderer = {
				title: 'Renderer',
				key: 'renderer',
				minimum: 0,
				maximum: 1,
				type: 'string',
			}





			return fields;
		}
	},
	watch: {
		value(v) {
			if (this.model != v) {
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
