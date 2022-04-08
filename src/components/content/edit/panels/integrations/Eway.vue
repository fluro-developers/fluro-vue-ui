<template>
	<div>
		<fluro-panel>
			<fluro-panel-title>
				<strong>eWay Integration Details</strong>
			</fluro-panel-title>
			<fluro-panel-body>
				<v-container pa-0 grid-list-xl>
					<fluro-content-form-field
						:form-fields="formFields"
						:outline="showOutline"
						@input="update"
						:options="options"
						:field="fieldHash.apiKey"
						v-model="model.privateDetails"
					/>
					<fluro-content-form-field
						:form-fields="formFields"
						:outline="showOutline"
						@input="update"
						:options="options"
						:field="fieldHash.apiPassword"
						v-model="model.privateDetails"
					/>
					<fluro-content-form-field
						:form-fields="formFields"
						:outline="showOutline"
						@input="update"
						:options="options"
						:field="fieldHash.publicKey"
						v-model="model.publicDetails"
					/>
				</v-container>
			</fluro-panel-body>
		</fluro-panel>
	</div>
</template>
<script>
import FluroContentForm from '../../../../form/FluroContentForm.vue';
import FluroContentFormField from '../../../../form/FluroContentFormField.vue';

export default {
	components: {
		FluroContentForm,
		FluroContentFormField,
	},
	extends: FluroContentForm,
	props: {
		value: {
			type: Object,
		},
	},
	data() {
		return {
			model: this.value,
		};
	},
	methods: {},
	computed: {
		fieldsOutput() {
			var self = this;
			var array = [];

			array.push({
				key: 'apiKey',
				title: 'Rapid API Key',
				minimum: 1,
				maximum: 1,
				type: 'string',
				params: {
					persistentDescription: true,
				},
			});

			array.push({
				key: 'publicKey',
				title: 'Client Side Encryption Key',
				minimum: 1,
				maximum: 1,
				type: 'string',
				description: 'To implement client side encryption (https://eway.io/api-v3/#implementation)',
				params: {
					persistentDescription: true,
				},
			});

			array.push({
				key: 'apiPassword',
				title: 'Rapid API Password',
				minimum: 1,
				maximum: 1,
				type: 'string',
				params: {
					persistentDescription: true,
				},
			});

			array.push({
				key: 'sandbox',
				title: 'Test / Sandbox Mode',
				minimum: 0,
				maximum: 1,
				type: 'boolean',
				description: `Force all payments made through this gateway to be processed in Test/Sandbox Mode. Don't forget to uncheck this before using this gateway in production!.`,
			});

			return array;
		},
	},
};
</script>
<style lang="scss"></style>
