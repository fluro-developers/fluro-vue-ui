<template>
	<fluro-panel margin>
		<fluro-panel-body>
			<v-layout align-center>
				<v-flex>
					<!-- <v-input class="no-flex"> -->
					<v-label>Advanced Gateway Settings</v-label>
					<p class="help-block">
						Expressions and extra options for managing multiple gateways. Ensure that at least one gateway
						is enabled for form payments to be enabled
					</p>
					<!-- </v-input> -->
				</v-flex>
				<v-flex shrink>
					<v-btn class="ma-0" icon @click.native="expanded = !expanded">
						<fluro-icon :icon="expanded ? `angle-down` : `angle-right`" />
					</v-btn>
				</v-flex>
			</v-layout>
		</fluro-panel-body>
		<template v-if="expanded">
			<fluro-panel-body class="border-top" v-for="gateway in gateways">
				<v-text-field
					:label="`${gateway.title} - Title`"
					persistent-hint
					hint="Update the gateway title displayed to the user"
					:placeholder="gateway.title"
					v-model="model[gateway._id].title"
				/>
				<!-- <div class="expression-group" :class="{active:model[gateway._id].expression}"> -->
				<v-input
					label="Enable Expression"
					:hint="`Enable '${gateway.title}' if expression returns true. Leave blank to always enable`"
					:persistent-hint="true"
					class="no-flex"
				>
					<v-layout>
						<v-flex>
							<fluro-expression-editor v-model="model[gateway._id].expression" />
						</v-flex>
						<v-flex shrink>
							<v-menu
								:left="true"
								v-model="popup[gateway._id]"
								:top="true"
								:close-on-content-click="false"
								transition="slide-y-transition"
								offset-y
							>
								<template v-slot:activator="{ on }">
									<v-btn icon small class="ma-0 ml-1" v-on="on">
										<fluro-icon icon="bullseye" />
									</v-btn>
								</template>
								<div>
									<expression-field-select
										:conditional="true"
										:context="paymentGatewayContextField"
										@click="injectExpression($event, gateway._id)"
										v-model="form.fields"
									/>
								</div>
							</v-menu>
						</v-flex>
					</v-layout>
				</v-input>
				<!-- </div> -->
			</fluro-panel-body>
		</template>
	</fluro-panel>
</template>
<script>
import ExpressionFieldSelect from '../../../fields/ExpressionFieldSelect.vue';

import FluroExpressionEditor from '../../../form/FluroExpressionEditor.vue';

export default {
	components: {
		ExpressionFieldSelect,
		FluroExpressionEditor,
	},
	props: {
		value: {
			type: Object,
			required: true,
			default() {
				return {};
			},
		},
		form: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			popup: {},
			model: this.value,
			expanded: false,
		};
	},
	created() {
		var self = this;
	},
	computed: {
		paymentGatewayContextField() {
			return this.form.fields[0];
		},
		gateways() {
			var self = this;
			return _.get(self.form, 'data.publicData.paymentGateways') || [];
		},
	},
	watch: {
		gateways: {
			immediate: true,
			handler(gateways) {
				var self = this;

				//Loop through each gateway
				_.each(gateways, function (gateway) {
					//Check if there is an entry for this gateway
					var entry = self.model[gateway._id];
					if (!entry) {
						entry = {};
						self.$set(self.model, gateway._id, entry);
					}

					if (!entry.expression) {
						self.$set(self.model[gateway._id], 'expression', '');
					}

					if (!entry.title) {
						self.$set(self.model[gateway._id], 'title', gateway.title);
					}
				});
			},
		},
	},
	methods: {
		injectExpression($event, gatewayID) {
			var self = this;

			self.$set(self.popup, gatewayID, false);

			var currentValue = self.model[gatewayID].expressions;

			var newValue;

			if (!currentValue) {
				newValue = $event.path;
			} else {
				newValue = `${currentValue} ${$event.path}`;
			}

			self.$set(self.model[gatewayID], 'expression', newValue);
		},
	},
};
</script>
<style lang="scss"></style>
