<template>
	<flex-column class="fluro-prompt-dialog">
		<form style="flex: 1; display: flex" @submit.prevent.stop="done">
			<flex-column-header class="border-bottom" v-if="title">
				<v-container pa-2>
					<h3 v-if="title">{{ title }}</h3>
					<div v-if="description" class="font-sm muted">{{ description }}</div>
				</v-container>
			</flex-column-header>
			<flex-column-body>
				<v-container pa-2>
					<fluro-content-form ref="form" @errorMessages="validate" v-model="model" :fields="options.fields" />
				</v-container>
			</flex-column-body>
			<flex-column-footer class="border-top">
				<v-container pa-2>
					<constrain xs>
						<v-layout>
							<template v-if="webMode">
								<fluro-button tag="a" block @click="dismiss()">
									{{ cancelText }}
									<!-- Cancel -->
								</fluro-button>
							</template>
							<template v-else>
								<v-btn block @click="dismiss()">
									{{ cancelText }}
								</v-btn>
							</template>
							<v-spacer />
							<template v-if="webMode">
								<fluro-button tag="button" block type="submit" :disabled="disabled" color="primary">
									{{ confirmText }}
									<!-- Continue -->
								</fluro-button>
							</template>
							<template v-else>
								<v-btn block type="submit" :disabled="disabled" color="primary">
									{{ confirmText }}
									<!-- Continue -->
								</v-btn>
							</template>
						</v-layout>
					</constrain>
				</v-container>
			</flex-column-footer>
		</form>
	</flex-column>
</template>
<script>
import ModalMixin from '../../../mixins/ModalMixin';
import FluroContentForm from '../../form/FluroContentForm.vue';

export default {
	components: {
		FluroContentForm,
	},
	props: {
		options: {
			type: Object,
		},
	},
	mixins: [ModalMixin],
	data() {
		return {
			model: this.options.model || {},
			errorMessages: [],
		};
	},
	computed: {
		webMode() {
			return this.options.webMode;
		},
		cancelText() {
			return this.options.cancelText || 'Cancel';
		},
		confirmText() {
			return this.options.confirmText || 'Continue';
		},
		description() {
			return this.options.description;
		},
		title() {
			return this.options.title;
		},
		isInvalid() {
			return this.errorMessages && this.errorMessages.length ? true : false;
		},
		disabled() {
			//TODO Enable this later

			if (!this.options.strict) {
				return;
			}
			return this.isInvalid;
		},
	},
	methods: {
		validate() {
			var form = this.$refs.form;
			if (!form) {
				return;
			}

			var errors = [];
			errors = errors.concat(form.errorMessages);
			this.errorMessages = errors;
		},
		done() {
			if (this.options.strict) {
				this.validate();

				if (this.isInvalid) {
					return;
				}
			}

			return this.close(this.model);
		},
	},
};
</script>
<style lang="scss">
.fluro-prompt-dialog {
	min-width: 300px;
	// max-width: 500px;
	text-align: center;

	form {
		display: flex;
		flex: 1;
		overflow: hidden;
		flex-direction: column;
	}

	.v-list__tile__title {
		font-size: 0.9em;
		font-weight: 500;
	}
}
</style>
