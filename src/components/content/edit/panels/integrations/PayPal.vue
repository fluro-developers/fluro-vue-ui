<template>
	<div>
		<fluro-panel>
			<fluro-panel-body>
				<h5>Getting Started</h5>
				<p>Before you begin, setup your REST API application in the PayPal Developer Portal</p>
				<a href="https://developer.paypal.com/developer/applications">
					<span>Visit PayPal Developer Portal</span>
					<fluro-icon icon="external-link" right />
				</a>
			</fluro-panel-body>
		</fluro-panel>
		<fluro-panel>
			<fluro-panel-title>
				<strong>Credentials</strong>
			</fluro-panel-title>
			<tabset>
				<tab heading="Sandbox">
					<fluro-panel-body>
						<v-container pa-0 grid-list-xl>
							<fluro-content-form-field
								:form-fields="formFields"
								:outline="showOutline"
								@input="update"
								:options="options"
								:field="fieldHash.sandboxAccount"
								v-model="model.privateDetails"
							/>
							<fluro-content-form-field
								:form-fields="formFields"
								:outline="showOutline"
								@input="update"
								:options="options"
								:field="fieldHash.sandboxClientID"
								v-model="model.privateDetails"
							/>
							<fluro-content-form-field
								:form-fields="formFields"
								:outline="showOutline"
								@input="update"
								:options="options"
								:field="fieldHash.sandboxClientSecret"
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
								:field="fieldHash.liveAccount"
								v-model="model.privateDetails"
							/>
							<fluro-content-form-field
								:form-fields="formFields"
								:outline="showOutline"
								@input="update"
								:options="options"
								:field="fieldHash.liveClientID"
								v-model="model.privateDetails"
							/>
							<fluro-content-form-field
								:form-fields="formFields"
								:outline="showOutline"
								@input="update"
								:options="options"
								:field="fieldHash.liveClientSecret"
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
			<fluro-panel-body class="border-top">
				<template v-if="!model._id">
					<span class="muted">Please save this integration to continue</span>
				</template>
				<template v-else>
					<v-input class="no-flex" label="PayPal Webhook URL">
						<div
							v-tippy
							content="Click to copy to clipboard"
							@click.stop.prevent="$fluro.global.copyToClipBoard(webhookURL)"
						>
							<v-layout align-center>
								<v-flex class="copystring">{{ webhookURL }}</v-flex>
							</v-layout>
						</div>
					</v-input>
					<!-- 	<v-input class="no-flex" label="PayPal Webhook URL">
																								<div v-tippy content="Click to copy to clipboard" @click.stop.prevent="$fluro.global.copyToClipBoard(webhookURL)">
																												<v-layout align-center>
																																<v-flex class="copystring">{{webhookURL}}</v-flex>
																												</v-layout>
																								</div>
																				</v-input>


																				 -->
					<!-- 		<v-input class="no-flex">
																								<v-label>PayPal Webhook URL</v-label>
																								<div>
																												<input readonly :value="webhookURL" />
																								</div>
																				</v-input> -->
					<v-btn :href="checkoutTestURL">
						<Span>Test Checkout</Span>
						<fluro-icon icon="angle-right" right />
					</v-btn>
				</template>
				<!-- <div class="form-group">
																				<label>Webhook URL</label>
																				<input readonly class="form-control" value="{{apiURL}}/integrate/{{item.module}}/{{item._id}}/webhook" />
																				<p class="help-block">URL for paypal webhook callbacks</p>
																</div> -->
				<!-- <div class="form-group"> -->
				<!-- <p class="help-block" ng-hide="item._id">Please save this integration to continue</p> -->
				<!-- <label>Test URL</label> -->
				<!-- <div ng-show="item._id">
																								<a ng-href="{{apiURL}}/integrate/{{item.module}}/{{item._id}}/payment/test" target="_blank" class="btn btn-default">
																												<span>Test Checkout</span>
																												<i class="far fa-angle-right"></i>
																								</a>
																				</div>
																</div> -->
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
				key: 'sandboxAccount',
				title: 'Sandbox Account',
				minimum: 0,
				maximum: 1,
				type: 'string',
				placeholder: `you-facilitator@email.com`,
				params: {
					persistentDescription: true,
				},
			});

			array.push({
				key: 'sandboxClientID',
				title: 'Sandbox Client ID',
				minimum: 0,
				maximum: 1,
				type: 'string',
				placeholder: ``,
				params: {
					persistentDescription: true,
				},
			});

			array.push({
				key: 'sandboxClientSecret',
				title: 'Sandbox Client Secret',
				minimum: 0,
				maximum: 1,
				type: 'string',
				placeholder: ``,
				params: {
					persistentDescription: true,
				},
			});

			array.push({
				key: 'liveAccount',
				title: 'Live Account',
				minimum: 0,
				maximum: 1,
				type: 'string',
				placeholder: `you-facilitator@email.com`,
				params: {
					persistentDescription: true,
				},
			});

			array.push({
				key: 'liveClientID',
				title: 'Live Client ID',
				minimum: 0,
				maximum: 1,
				type: 'string',
				placeholder: ``,
				params: {
					persistentDescription: true,
				},
			});

			array.push({
				key: 'liveClientSecret',
				title: 'Live Client Secret',
				minimum: 0,
				maximum: 1,
				type: 'string',
				placeholder: ``,
				params: {
					persistentDescription: true,
				},
			});

			array.push({
				key: 'sandbox',
				title: 'Sandbox Mode',
				minimum: 0,
				maximum: 1,
				type: 'boolean',
				placeholder: ``,
				description: `Set all transactions processed with this integration to use the sandbox environment. Remember to turn this off on production sites and apps`,
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
