<template>
	<form @submit.prevent.stop="submit" :disabled="state == 'processing'">
		<fluro-content-form ref="form" v-model="model" :fields="fields" />
		<div class="actions">
			<template v-if="state == 'processing'">
				<template v-if="webMode">
					<fluro-button :loading="true" :disabled="true">{{ submitButtonText }}</fluro-button>
				</template>
				<template v-else>
					<v-btn class="mx-0" :loading="true" :disabled="true">{{ submitButtonText }}</v-btn>
				</template>
			</template>
			<template v-else-if="state == 'error'">
				<v-alert :value="true" type="error" outline>{{ serverErrors }}</v-alert>
				<template v-if="webMode">
					<fluro-button @click.prevent.native="state = 'ready'">Try Again</fluro-button>
				</template>
				<template v-else>
					<v-btn class="mx-0" color="primary" @click.prevent.native="state = 'ready'">Try Again</v-btn>
				</template>
			</template>
			<template v-else>
				<v-alert :value="true" type="error" outline v-if="hasErrors">
					Please check the following issues before submitting
					<div v-for="error in errorMessages">
						<strong>{{ error.title }}</strong>
						: {{ error.messages[0] }}
					</div>
				</v-alert>
				<slot name="submit" :hasErrors="hasErrors">
					<template v-if="webMode">
						<!-- type="submit" -->
						<fluro-button tag="button" @click.native.prevent="submit" type="submit" :disabled="hasErrors">{{
							submitButtonText
						}}</fluro-button>
					</template>
					<template v-else>
						<!--  -->
						<v-btn class="mx-0" type="submit" :disabled="hasErrors" color="primary">{{
							submitButtonText
						}}</v-btn>
					</template>
				</slot>
			</template>
		</div>
	</form>
</template>
<script>
import _ from 'lodash';
import FluroButton from '../ui/FluroButton.vue';
import FluroContentForm from './FluroContentForm.vue';

export default {
	props: {
		method: {
			type: String,
			default: 'post',
		},
		url: {
			type: String,
			required: true,
		},
		fields: {
			type: Array,
			required: true,
		},
		submitText: {
			type: String,
			default: 'Submit',
		},
		value: {
			type: Object,
			default() {
				return {};
			},
		},
	},
	data() {
		return {
			mounted: false,
			model: this.value, //JSON.parse(JSON.stringify(this.value)),
			state: 'ready',
			serverErrors: '',
			errorMessages: [],
		};
	},
	components: {
		FluroButton,
		FluroContentForm,
	},
	watch: {
		value(v) {
			if (this.model != v) {
				this.model = v;
			}
		},
		model(v) {
			this.$emit('input', v);
		},
	},
	mounted() {
		var self = this;
		self.$watch(function () {
			return _.get(self.$refs, 'form.errorMessages');
		}, self.validate);
		self.validate();

		self.mounted = true;
	},
	computed: {
		webMode() {
			if (this.mounted) {
				this.mounted = this.mounted;
			}

			return this.$fluro.app;
		},
		submitButtonText() {
			return this.submitText;
		},
		hasErrors() {
			// console.log('Has Errors?', this.errorMessages)
			return this.errorMessages.length ? true : false;
		},
	},
	methods: {
		validate() {
			this.errorMessages = _.get(this.$refs, 'form.errorMessages');
		},
		clear() {
			this.reset();
		},
		reset() {
			var self = this;
			//Reset the model
			// Vue.set(self.model, 'data', {});
			self.model = {};
			self.state = 'ready';
			self.$emit('reset');
		},
		submit(event) {
			if (event) {
				event.preventDefault();
				event.stopPropagation();
			}

			var self = this;
			self.validate();
			self.state = 'processing';

			var request;

			switch (String(self.method).toLowerCase()) {
				case 'post':
					request = self.$fluro.api.post;
					break;
				case 'put':
					request = self.$fluro.api.put;
					break;
				default:
					return;
					break;
			}
			//Create the post
			request(this.url, this.model).then(
				function (res) {
					// console.log('Created the post!', post);
					self.$emit('success', res.data);
					self.reset();
				},
				function (err) {
					//Dispatch an error
					self.$fluro.error(err);
					self.state = 'error';
					self.$emit('error', err);
					self.serverErrors = self.$fluro.utils.errorMessage(err);
				}
			);
		},
	},
};
</script>
<style lang="scss"></style>
