<template>
	<flex-column>
		<template v-if="loading">
			<fluro-page-preloader contain />
		</template>
		<template v-else>
			<tabset :justified="true" :vertical="true">
				<tab heading="Pass Settings">
					<flex-column-body style="background: #fff">
						<v-container>
							<constrain sm>
								<fluro-content-form-field
									:form-fields="formFields"
									:outline="showOutline"
									@input="update"
									:options="options"
									:field="fieldHash.title"
									v-model="model"
								></fluro-content-form-field>
								<fluro-content-form-field
									:form-fields="formFields"
									:outline="showOutline"
									@input="update"
									:options="options"
									:field="fieldHash.description"
									v-model="model"
								></fluro-content-form-field>
								<fluro-panel>
									<fluro-panel-title>
										<fluro-content-form-field
											:form-fields="formFields"
											:outline="showOutline"
											@input="update"
											:options="options"
											:field="fieldHash.inviteCodeEnabled"
											v-model="model"
										></fluro-content-form-field>
									</fluro-panel-title>
									<template v-if="inviteCodeEnabled">
										<template v-if="inviteCode">
											<div
												class="invite-code"
												v-tippy
												content="Click to copy to clipboard"
												@click="copyCodeToClipboard"
											>
												<span>{{ inviteCode }}</span>
												<!-- <fluro-icon icon="copy" right /> -->
											</div>
											<input type="hidden" ref="input" :value="inviteCode" />
										</template>
										<fluro-panel-body style="text-align: center" v-else>
											<Span class="muted">Invite code will be generated after save</Span>
										</fluro-panel-body>
										<!-- <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.fromEmail" v-model="model"></fluro-content-form-field> -->
										<!-- <v-layout> -->
										<!-- <v-flex xs12 sm6> -->
										<!-- <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.fromFirstName" v-model="model"></fluro-content-form-field> -->
										<!-- </v-flex> -->
										<!-- <v-flex xs12 sm6> -->
										<!-- <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.fromLastName" v-model="model"></fluro-content-form-field> -->
										<!-- </v-flex> -->
										<!-- </v-layout> -->
									</template>
								</fluro-panel>
								<fluro-permission-select v-model="model.sets" />
								<!-- <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.mailoutType" v-model="model"></fluro-content-form-field>
                                <fluro-card v-if="mailoutType == 'promotional'">
                                    <fluro-card-body>
                                        <h6>
                                            Promotional Mode
                                        </h6>
                                        Default mailout type. Useful for promoting / letting people know of an event, service or product. Promotional emails will not send to selected contacts if they have unsubscribed.
                                    </fluro-card-body>
                                </fluro-card>
                                <fluro-card v-if="mailoutType == 'transactional'">
                                    <fluro-card-body>
                                        <h6>
                                            Transactional Mode
                                        </h6>
                                        It is entirely up to you to adhere to international email spam laws and to only send transactional mail as appropriate.
                                        Transactional emails will send to selected contacts even if they have previously unsubscribed from your emails.
                                    </fluro-card-body>
                                </fluro-card> -->
							</constrain>
						</v-container>
					</flex-column-body>
				</tab>
				<tab :heading="`${definition.title} Fields`" v-if="definition">
					<flex-column-body style="background: #fff">
						<v-container>
							<constrain sm>
								<h3 margin>{{ definition.title }} Fields</h3>
								<fluro-content-form
									:options="options"
									v-model="model.data"
									:fields="definition.fields"
								/>
							</constrain>
						</v-container>
					</flex-column-body>
				</tab>
			</tabset>
		</template>
	</flex-column>
</template>
<script>
/////////////////////////////////

import FluroContentEditMixin from '../FluroContentEditMixin.js';
import FluroPermissionSelect from '../../../form/FluroPermissionSelect.vue';

/////////////////////////////////

import Vue from 'vue';
import _ from 'lodash';

/////////////////////////////////

export default {
	components: {
		// FluroEditor,
		FluroPermissionSelect,
	},
	mixins: [FluroContentEditMixin],
	methods: {
		copyCodeToClipboard() {
			var self = this;

			let testingCodeToCopy = this.$refs.input;
			testingCodeToCopy.setAttribute('type', 'text'); // 不是 hidden 才能複製
			testingCodeToCopy.select();

			try {
				var successful = document.execCommand('copy');
				var msg = successful ? 'successful' : 'unsuccessful';
				// alert('Testing code was copied ' + msg);
				self.$fluro.notify('Invite Code Copied to clipboard');
			} catch (err) {
				// alert('Oops, unable to copy');
				// self.$fluro.error({message:'Unable to copy to clipboard'});
			}

			/* unselect the range */
			testingCodeToCopy.setAttribute('type', 'hidden');
			if (process.browser) {
				window.getSelection().removeAllRanges();
			}
		},
		toggleExpand(key) {
			var self = this;
			self.$set(self.expandedSettings, `_${key}`, !self.expandedSettings[`_${key}`]);

			console.log('TOGGLE', key, self.expandedSettings);
		},
	},
	computed: {
		inviteCodeEnabled() {
			return this.model._id && this.model.inviteCodeEnabled;
		},
		policyCode() {
			var self = this;
			return _.get(this.model, 'privateDetails.inviteCode');
		},
		inviteCode() {
			var self = this;

			if (!self.policyCode) {
				return;
			}
			return `${self.user.account.prefix}-${self.policyCode}`.toUpperCase();
		},
		expanded() {
			var self = this;

			return {
				contacts: self.expandedSettings._contacts || (self.model.contacts && self.model.contacts.length),
				teams: self.expandedSettings._teams || (self.model.teams && self.model.teams.length),
				tickets: self.expandedSettings._tickets || (self.model.tickets && self.model.tickets.length),
				events: self.expandedSettings._events || (self.model.events && self.model.events.length),
				interactions:
					self.expandedSettings._interactions || (self.model.interactions && self.model.interactions.length),
				cards: self.expandedSettings._cards || (self.model.cards && self.model.cards.length),
				checkins: self.expandedSettings._checkins || (self.model.checkins && self.model.checkins.length),
				details: self.expandedSettings._details || (self.model.details && self.model.details.length),
				families: self.expandedSettings._families || (self.model.families && self.model.families.length),
				personas: self.expandedSettings._personas || (self.model.personas && self.model.personas.length),
				collections:
					self.expandedSettings._collections || (self.model.collections && self.model.collections.length),
				tags: self.expandedSettings._tags || (self.model.tags && self.model.tags.length),
				realms: self.expandedSettings._realms || (self.model.realms && self.model.realms.length),
				definitions:
					self.expandedSettings._definitions || (self.model.definitions && self.model.definitions.length),
				query: self.expandedSettings._query || self.model.query,
			};
		},
		mailoutType() {
			return this.model.mailoutType;
		},
		user() {
			return this.$fluro.auth.getCurrentUser();
		},
		fieldsOutput() {
			var self = this;
			var array = [];

			///////////////////////////////////

			addField('title', {
				title: 'Title',
				minimum: 1,
				maximum: 1,
				type: 'string',
				placeholder: `Eg. 'Standard Access'`,
			});

			addField('description', {
				title: 'Description',
				description: 'Enter a one line description summarizing what permissions this access pass will grant',
				minimum: 0,
				maximum: 1,
				type: 'string',
				placeholder: `Eg. 'This pass allows a user to access all contacts and teams in the X Realm'`,
			});

			addField('inviteCodeEnabled', {
				title: 'Enable Invite Code',
				description:
					'Enable an invitation code that you can share with people so they can quickly acquire this access pass.',
				minimum: 0,
				maximum: 1,
				type: 'boolean',
			});

			// // console.log('TYPE OPTIONS', self.typeOptions);

			// addField('filterType', {
			//     title: 'Type',
			//     minimum: 0,
			//     maximum: 1,
			//     type: 'string',
			//     directive: 'select',
			//     description: 'The type of item you want to return from this query',
			//     options: self.typeOptions,
			// })

			///////////////////////////////////

			function addField(key, details) {
				details.key = key;
				array.push(details);
			}

			return array;
		},
	},
	data() {
		return {
			editorOptions: {},
		};
	},
};
</script>
<style lang="scss">
.invite-code {
	line-height: 60px;
	height: 60px;
	padding: 0 5px;
	border: 1px solid rgba($primary, 0.5);
	background: rgba($primary, 0.1);
	text-align: center;
	font-weight: 100;
	font-size: 40px;
	// border-radius: 3px;
}
</style>
