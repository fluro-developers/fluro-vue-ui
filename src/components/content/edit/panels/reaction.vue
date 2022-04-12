<template>
	<flex-column>
		<template v-if="loading">
			<fluro-page-preloader contain />
		</template>
		<tabset v-else :justified="true" :vertical="true">
			<tab>
				<flex-row>
					<!--  <flex-column style="max-width: 300px; width: 25%; background: #eee;" class="border-right">
                        <fluro-accordion class="stacker">
                            <fluro-accordion-panel heading="Basics">
                                <v-container fluid>
                                    Basics
                                </v-container>
                            </fluro-accordion-panel>
                            <fluro-accordion-panel heading="Triggers">
                                <v-container fluid>
                                    Triggers
                                </v-container>
                            </fluro-accordion-panel>
                            <fluro-accordion-panel heading="Permissions">
                                <v-container fluid>
                                    Permissions
                                </v-container>
                            </fluro-accordion-panel>
                            <fluro-accordion-panel heading="Tests">
                                <v-container fluid>
                                    Tests
                                </v-container>
                            </fluro-accordion-panel>
                        </fluro-accordion>
                    </flex-column> -->
					<div class="reaction-columns">
						<div>
							<p>New interface coming soon. For now you can edit reactions using the classic interface</p>
							<v-btn color="primary" href="https://admin.fluro.io/reaction"
								>Take me to the classic panel</v-btn
							>
						</div>
					</div>
					<!-- <flex-column-body style="background: #fafafa;">
                        <v-container>
                        </v-container>
                    </flex-column-body> -->
				</flex-row>
			</tab>
		</tabset>
	</flex-column>
</template>
<script>
/////////////////////////////////

import FluroContentEditMixin from '../FluroContentEditMixin.js';
import FluroAccordion from '../../../ui/accordion/FluroAccordion.vue';
import FluroAccordionPanel from '../../../ui/accordion/FluroAccordionPanel.vue';

/////////////////////////////////

import Vue from 'vue';

/////////////////////////////////

export default {
	mixins: [FluroContentEditMixin],
	components: {
		FluroAccordion,
		FluroAccordionPanel,
	},
	methods: {
		toggleCollected() {
			console.log('INIT TOGGLE');
			var self = this;
			if (!self.model.collected) {
				var currentUserName = self.user ? `${self.user.firstName} ${self.user.lastName}` : '';

				console.log('COLLECTED IS FALSY', self.model.collected);
				self.$set(self.model, 'collected', true);
				self.$set(self.model, 'collectedBy', currentUserName);
				self.$set(self.model, 'collectionDate', new Date());
			} else {
				console.log('COLLECTED IS TRUTHY', self.model.collected);
				return self.$set(self.model, 'collected', false);
			}
		},
	},
	created() {
		var self = this;
		if (!self.model._id) {
			return self.$set(self.model, 'collected', false);
		}
	},
	asyncComputed: {},
	computed: {
		qrCodeURL() {
			var self = this;

			if (!self.model._id) {
				return;
			}
			var interactionID = self.$fluro.utils.getStringID(self.model.interaction);
			var ticketID = self.$fluro.utils.getStringID(self.model);
			if (interactionID) {
				return `${self.$fluro.api.defaults.baseURL}/system/qr?input=http://tickets.fluro.io/interaction/${interactionID}`;
			} else {
				return `${self.$fluro.api.defaults.baseURL}/system/qr?input=http://tickets.fluro.io/ticket/${ticketID}`;
			}

			// $scope.ticketCodeURL = Fluro.apiURL + '/system/qr?input=http://tickets.fluro.io/ticket/' + ticketID;
			// $scope.interactionCodeURL = Fluro.apiURL + '/system/qr?input=http://tickets.fluro.io/interaction/' + interactionID;
		},
		showOutline() {
			return false;
		},
		fieldsOutput() {
			var self = this;
			var array = [];

			///////////////////////////////////

			addField('title', {
				title: 'Ticket Title',
				minimum: 0,
				maximum: 1,
				type: 'string',
			});

			addField('email', {
				title: 'Primary Email Address',
				minimum: 0,
				maximum: 1,
				type: 'email',
			});

			addField('contact', {
				title: 'Contact',
				description: 'The contact this ticket is linked to',
				minimum: 1,
				maximum: 1,
				type: 'reference',
				params: {
					restrictType: 'contact',
				},
			});

			addField('value', {
				title: 'Value',
				minimum: 0,
				maximum: 1,
				type: 'number',
			});

			addField('event', {
				title: 'Event',
				description: 'The event this ticket is valid for',
				minimum: 0,
				maximum: 1,
				type: 'reference',
				params: {
					restrictType: 'event',
				},
			});

			addField('interaction', {
				title: 'Interaction',
				description: 'The original form submission that was used to create this ticket',
				minimum: 0,
				maximum: 1,
				type: 'reference',
				params: {
					restrictType: 'interaction',
				},
			});

			//////////////////////////////////////

			addField('collectedBy', {
				title: 'Collected By',
				description: 'The name of the person that collected the ticket',
				minimum: 0,
				maximum: 1,
				type: 'string',
			});

			addField('collectionDate', {
				title: 'Collection Date',
				description: 'The date this ticket was collected',
				minimum: 0,
				maximum: 1,
				type: 'date',
				directive: 'timedatepicker',
			});

			function addField(key, details) {
				details.key = key;
				array.push(details);
			}

			return array;
		},
	},
	data() {
		return {};
	},
};
</script>
<style scoped lang="scss">
.reaction-columns {
	// background: #ff0066;
	display: flex;
	justify-content: center;
	align-items: center;
	// border: 1px solid #000;
	text-align: center;
	flex: 1;
}
</style>
