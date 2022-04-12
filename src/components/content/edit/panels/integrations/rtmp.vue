<template>
	<div>
		<fluro-panel>
			<fluro-panel-body>
				<h5>Getting Started</h5>
				<p>Before you begin, you will need to know the RTMP host and your streaming key.</p>
			</fluro-panel-body>
		</fluro-panel>
		<fluro-panel>
			<fluro-panel-title>
				<strong>Connection Details</strong>
			</fluro-panel-title>
			<tabset>
				<tab heading="Testing">
					<fluro-panel-body>
						<v-container pa-0 grid-list-xl>
							<fluro-content-form-field
								:form-fields="formFields"
								:outline="showOutline"
								@input="update"
								:options="options"
								:field="fieldHash.testHost"
								v-model="model.privateDetails"
							/>
							<fluro-content-form-field
								:form-fields="formFields"
								:outline="showOutline"
								@input="update"
								:options="options"
								:field="fieldHash.testStreamKey"
								v-model="model.privateDetails"
							/>
						</v-container>
					</fluro-panel-body>
				</tab>
				<tab heading="Live">
					<fluro-panel-body>
						<v-container pa-0 grid-list-xl>
							<fluro-content-form-field
								:form-fields="formFields"
								:outline="showOutline"
								@input="update"
								:options="options"
								:field="fieldHash.liveHost"
								v-model="model.privateDetails"
							/>
							<fluro-content-form-field
								:form-fields="formFields"
								:outline="showOutline"
								@input="update"
								:options="options"
								:field="fieldHash.liveStreamKey"
								v-model="model.privateDetails"
							/>
						</v-container>
					</fluro-panel-body>
				</tab>
			</tabset>
		</fluro-panel>
		<fluro-panel>
			<fluro-panel-title>
				<strong>Advanced</strong>
			</fluro-panel-title>
			<fluro-panel-body>
				<v-container pa-0 grid-list-xl>
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
	created() {
		var self = this;

		// if (!self.model.privateDetails.credentials) {
		// 				self.$set(self.model.privateDetails, 'credentials', {});
		// }

		// if (!self.model.privateDetails.params) {
		// 				self.$set(self.model.privateDetails, 'params', {});
		// }

		// if (!self.model.publicDetails.credentials) {
		// 				self.$set(self.model, 'publicDetails', {});
		// }
	},
	methods: {},
	computed: {
		checkoutTestURL() {
			return `${this.$fluro.apiURL}/integrate/${this.model.module}/${this.model._id}/payment/test`;
		},
		webhookURL() {
			return `${this.$fluro.apiURL}/${this.model.module}/${this.model._id}/webhook`;
		},
		fieldsOutput() {
			var self = this;
			var array = [];

			array.push({
				key: 'testHost',
				title: 'Test Stream Host',
				minimum: 0,
				maximum: 1,
				type: 'string',
				placeholder: `rtmps://`,
				params: {
					persistentDescription: true,
				},
			});

			array.push({
				key: 'testStreamKey',
				title: 'Test Stream Key',
				minimum: 0,
				maximum: 1,
				type: 'string',
				placeholder: ``,
				params: {
					persistentDescription: true,
				},
			});

			array.push({
				key: 'liveHost',
				title: 'Live Streaming Host',
				minimum: 0,
				maximum: 1,
				type: 'string',
				placeholder: `rtmps://`,
				params: {
					persistentDescription: true,
				},
			});

			array.push({
				key: 'liveStreamKey',
				title: 'Live Stream Key',
				minimum: 0,
				maximum: 1,
				type: 'string',
				placeholder: ``,
				params: {
					persistentDescription: true,
				},
			});

			return array;
		},
	},
};
</script>
<style lang="scss"></style>
