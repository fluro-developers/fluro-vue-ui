<template>
	<div>
		<fluro-panel>
			<fluro-panel-title>
				<strong>Test Sandbox Details</strong>
			</fluro-panel-title>
			<fluro-panel-body>
				<v-container pa-0 grid-list-xl>
					<fluro-content-form-field
						:form-fields="formFields"
						:outline="showOutline"
						@input="update"
						:options="options"
						:field="fieldHash.sandboxApplicationID"
						v-model="model.publicDetails"
					/>
					<fluro-content-form-field
						:form-fields="formFields"
						:outline="showOutline"
						@input="update"
						:options="options"
						:field="fieldHash.sandboxAccessToken"
						v-model="model.privateDetails"
					/>
					<fluro-content-form-field
						:form-fields="formFields"
						:outline="showOutline"
						@input="update"
						:options="options"
						:field="fieldHash.sandboxLocationID"
						v-model="model.publicDetails"
					/>
				</v-container>
			</fluro-panel-body>
		</fluro-panel>
		<fluro-panel>
			<fluro-panel-title>
				<strong>Live Production Details</strong>
			</fluro-panel-title>
			<fluro-panel-body>
				<v-container pa-0 grid-list-xl>
					<fluro-content-form-field
						:form-fields="formFields"
						:outline="showOutline"
						@input="update"
						:options="options"
						:field="fieldHash.productionApplicationID"
						v-model="model.publicDetails"
					/>
					<fluro-content-form-field
						:form-fields="formFields"
						:outline="showOutline"
						@input="update"
						:options="options"
						:field="fieldHash.productionAccessToken"
						v-model="model.privateDetails"
					/>
					<fluro-content-form-field
						:form-fields="formFields"
						:outline="showOutline"
						@input="update"
						:options="options"
						:field="fieldHash.productionLocationID"
						v-model="model.publicDetails"
					/>
				</v-container>
			</fluro-panel-body>
		</fluro-panel>
		<fluro-panel>
			<fluro-panel-title>
				<strong>Advanced Settings</strong>
			</fluro-panel-title>
			<fluro-panel-body>
				<v-container pa-0 grid-list-xl>
					<fluro-content-form-field
						:form-fields="formFields"
						:outline="showOutline"
						@input="update"
						:options="options"
						:field="fieldHash.currency"
						v-model="model.publicDetails"
					/>
					<fluro-content-form-field
						:form-fields="formFields"
						:outline="showOutline"
						@input="update"
						:options="options"
						:field="fieldHash.sandbox"
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
		currencyOptions() {
			var self = this;

			var userCountryCode = _.get(self.user, 'account.countryCode');
			console.log('Get Currency Options', userCountryCode);
			return self.$fluro.utils.getAvailableCurrencies(userCountryCode);
		},
		fieldsOutput() {
			var self = this;
			var array = [];

			array.push({
				key: 'sandboxApplicationID',
				title: 'Sandbox Application ID',
				minimum: 1,
				maximum: 1,
				type: 'string',
				params: {
					persistentDescription: true,
				},
			});

			array.push({
				key: 'sandboxAccessToken',
				title: 'Sandbox Access Token',
				minimum: 1,
				maximum: 1,
				type: 'string',
				params: {
					persistentDescription: true,
				},
			});

			array.push({
				key: 'sandboxLocationID',
				title: 'Sandbox Location ID',
				minimum: 1,
				maximum: 1,
				type: 'string',
				params: {
					persistentDescription: true,
				},
			});

			array.push({
				key: 'productionApplicationID',
				title: 'Production Application ID',
				minimum: 1,
				maximum: 1,
				type: 'string',
				params: {
					persistentDescription: true,
				},
			});

			array.push({
				key: 'productionAccessToken',
				title: 'Production Access Token',
				minimum: 1,
				maximum: 1,
				type: 'string',
				params: {
					persistentDescription: true,
				},
			});

			array.push({
				key: 'productionLocationID',
				title: 'Production Location ID',
				minimum: 1,
				maximum: 1,
				type: 'string',
				params: {
					persistentDescription: true,
				},
			});

			array.push({
				key: 'currency',
				title: 'Currency',
				description: 'Select what currency',
				minimum: 1,
				maximum: 1,
				type: 'string',
				directive: 'select',
				options: self.currencyOptions,
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
