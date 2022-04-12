<template>
	<flex-column>
		<flex-column-body style="background: #fafafa">
			<v-container>
				<constrain sm>
					<wrapper xs>
						<h2>Send Test Email</h2>
						<p>Select contacts below and then hit send to send a test email</p>
					</wrapper>
					<v-layout>
						<v-flex>
							<fluro-content-select-button
								large
								block
								type="contact"
								:allDefinitions="true"
								v-model="testContacts"
							/>
						</v-flex>
						<v-spacer />
						<v-flex>
							<v-btn
								block
								class="mx-0"
								:loading="testing"
								color="primary"
								:disabled="!testContacts.length"
								large
								@click="test()"
							>
								Send to {{ testContacts.length }}
								<fluro-icon icon="paper-plane" right />
							</v-btn>
						</v-flex>
					</v-layout>
				</constrain>
			</v-container>
		</flex-column-body>
	</flex-column>
</template>
<script>
import FluroContentSelectButton from '../form/contentselect/FluroContentSelectButton.vue';

export default {
	components: {
		FluroContentSelectButton,
	},
	props: {
		value: {
			type: Object,
			required: true,
		},
	},
	methods: {
		test() {
			var self = this;

			self.testing = true;
			var contacts = self.$fluro.utils.arrayIDs(self.testContacts);

			self.$fluro.api
				.post(`/mailout/${self.model._id}/test`, {
					contacts,
				})
				.then(function (res) {
					self.$fluro.notify(`Sent test email to ${contacts.length} contacts`);
					self.testing = false;
					// self.testContacts = [];
				})
				.catch(function (err) {
					self.$fluro.error(err);
					self.testing = false;
				});
		},
	},
	data() {
		return {
			testing: false,
			testContacts: [],
			model: this.value,
		};
	},
};
</script>
<style lang="scss" scoped></style>
