<template>
	<!-- <flex-column> -->
	<!-- style="max-width: 500px;" -->
	<flex-column class="modal-size">
		<v-container v-if="loading" class="text-xs-center">
			<v-progress-circular indeterminate />
		</v-container>
		<template v-else>
			<flex-column-header class="border-bottom">
				<page-header type="policy">
					<template v-slot:left>
						<h3>Push Mailout</h3>
					</template>
				</page-header>
			</flex-column-header>
			<tabset :justified="true">
				<tab heading="New Contact">
					<flex-column-body style="background: #fff">
						<v-container>
							<p>Input a new contact's details below to create them and send them this mailout</p>
							<fluro-content-form v-model="model.contact" :fields="newContactFields" />
						</v-container>
					</flex-column-body>
					<flex-column-footer class="border-top">
						<v-container px-0 py-2>
							<v-layout>
								<v-btn flat @click="dismiss()"> Cancel </v-btn>
								<v-spacer />
								<v-btn
									:loading="sending"
									color="primary"
									:disabled="invalid"
									@click="sendTo('contact')"
								>
									Push
									<fluro-icon icon="angle-right" />
								</v-btn>
							</v-layout>
						</v-container>
					</flex-column-footer>
				</tab>
				<tab heading="Existing contacts">
					<flex-column-body>
						<v-container>
							<p>Select contacts from your database to add them to this mailout</p>
							<fluro-content-select-button
								block
								type="contact"
								:allDefinitions="true"
								v-model="model.contacts"
							/>
						</v-container>
					</flex-column-body>
					<flex-column-footer class="border-top">
						<v-container px-0 py-2>
							<v-layout>
								<v-btn flat @click="dismiss()"> Cancel </v-btn>
								<v-spacer />
								<v-btn
									:loading="sending"
									color="primary"
									:disabled="!model.contacts.length"
									@click="sendTo('contacts')"
								>
									Push {{ model.contacts.length }}
									<fluro-icon icon="angle-right" />
								</v-btn>
							</v-layout>
						</v-container>
					</flex-column-footer>
				</tab>
				<tab heading="User Personas">
					<flex-column-body>
						<v-container>
							<p>Select users from your database to add them to this mailout</p>
							<fluro-content-select-button block type="persona" v-model="model.personas" />
						</v-container>
					</flex-column-body>
					<flex-column-footer class="border-top">
						<v-container px-0 py-2>
							<v-layout>
								<v-btn flat @click="dismiss()"> Cancel </v-btn>
								<v-spacer />
								<v-btn
									:loading="sending"
									color="primary"
									:disabled="!model.personas.length"
									@click="sendTo('personas')"
								>
									Push {{ model.personas.length }}
									<fluro-icon icon="angle-right" />
								</v-btn>
							</v-layout>
						</v-container>
					</flex-column-footer>
				</tab>
			</tabset>
		</template>
		<!-- </div> -->
	</flex-column>
</template>
<script>
import FluroContentForm from '../form/FluroContentForm.vue';
import FluroContentFormField from '../form/FluroContentFormField.vue';
import FluroModalMixin from '../../mixins/ModalMixin';
import FluroContentSelectButton from '../form/contentselect/FluroContentSelectButton.vue';

export default {
	props: {
		options: {
			type: Object,
		},
	},
	mixins: [FluroModalMixin],
	components: {
		FluroContentForm,
		FluroContentFormField,
		FluroContentSelectButton,
	},
	data() {
		return {
			model: {
				contact: {},
				personas: [],
				contacts: [],
			},
			loading: false,
			sending: false,
		};
	},
	computed: {
		invalid() {
			var contact = this.model.contact;

			if (!contact.gender || !contact.gender.length) {
				return true;
			}

			if (!contact.firstName || !contact.firstName.length) {
				return true;
			}

			if (!contact.lastName || !contact.lastName.length) {
				return true;
			}

			if (!contact.email || !contact.email.length) {
				return true;
			}
		},
		newContactFields() {
			var array = [];

			array.push({
				type: 'group',
				sameLine: true,
				fields: [
					{
						title: 'Title',
						minimum: 1,
						maximum: 1,
						type: 'string',
						key: 'gender',
						directive: 'select',
						options: [
							{
								name: 'Mr',
								value: 'male',
							},
							{
								name: 'Ms / Mrs',
								value: 'female',
							},
						],
					},
					{
						title: 'First Name',
						minimum: 1,
						maximum: 1,
						type: 'string',
						key: 'firstName',
					},
					{
						title: 'Last Name',
						minimum: 1,
						maximum: 1,
						type: 'string',
						key: 'lastName',
					},
				],
			});

			array.push({
				title: 'Email Address',
				minimum: 1,
				maximum: 1,
				type: 'email',
				key: 'email',
			});

			return array;
		},
		item() {
			return this.options.item;
		},
	},
	methods: {
		sendTo(type) {
			var self = this;

			// switch(type) {
			// 	case 'contact':
			// 	break;
			// 	case 'contacts':
			// 	break;
			// 	case 'persona':
			// 	break;
			// }

			/////////////////////////////////////////

			self.sending = true;
			self.$fluro.api
				.post(`/mailout/${self.item._id}/push`, self.model)
				.then(function (res) {
					self.sending = false;
					return self.close(res.data);
				})
				.catch(function (err) {
					self.sending = false;
					console.log('Error!', err);
					self.$fluro.error(err);
				});
		},
	},
};
</script>
<style lang="scss" scoped></style>
