<template>
	<flex-column>
		<template v-if="loading">
			<fluro-page-preloader contain />
		</template>
		<template v-else>
			<!-- :vertical="true" -->
			<tabset :justified="true" :vertical="true">
				<tab heading="Details">
					<flex-column-body style="background: #fafafa">
						<v-container fluid grid-list-lg>
							<constrain sm>
								<v-layout row wrap>
									<!--  -->
									<v-flex xs12 sm12>
										<fluro-content-form-field
											:form-fields="formFields"
											:outline="showOutline"
											@input="update"
											:options="options"
											:field="fieldHash.title"
											v-model="model"
										/>
									</v-flex>
									<v-flex xs12 sm12 v-if="!model._id">
										<fluro-content-form-field
											:form-fields="formFields"
											:outline="showOutline"
											@input="update"
											:options="options"
											:field="fieldHash.items"
											v-model="model"
										/>
									</v-flex>
									<!--  -->
									<v-flex xs12 sm6>
										<fluro-content-form-field
											:form-fields="formFields"
											:outline="showOutline"
											@input="update"
											:options="options"
											:field="fieldHash.emails"
											v-model="model"
										/>
									</v-flex>
									<!--  -->
									<v-flex xs12 sm6>
										<fluro-content-form-field
											:form-fields="formFields"
											:outline="showOutline"
											@input="update"
											:options="options"
											:field="fieldHash.phoneNumbers"
											v-model="model"
										/>
									</v-flex>
									<!-- -->
									<!--  -->
									<!-- Household Address -->
									<v-flex xs12 sm12>
										<fluro-panel>
											<fluro-panel-title>Home Address</fluro-panel-title>
											<fluro-panel-body>
												<address-manager v-model="model.address" />
											</fluro-panel-body>
										</fluro-panel>
									</v-flex>
									<!--  -->
									<!--  -->
									<!--  -->
									<!-- Postal Address -->
									<v-flex>
										<fluro-panel>
											<fluro-panel-title>
												<div class="no-border-no-background">
													<fluro-toggle-item
														@click.native="toggleSamePostal()"
														:inactive="model.samePostal"
														>Different Postal Address</fluro-toggle-item
													>
												</div>
											</fluro-panel-title>
											<fluro-panel-body v-if="!model.samePostal">
												<address-manager v-model="model.postalAddress" />
											</fluro-panel-body>
										</fluro-panel>
									</v-flex>
								</v-layout>
								<!--  <pre>{{model.samePostal}}</pre>
                                                                <pre>{{model.address}}</pre>
                <pre>{{model.postalAddress}}</pre>-->
							</constrain>
						</v-container>
					</flex-column-body>
				</tab>
				<!-- -->
				<!--  -->
				<tab :heading="`${membersLength} Members`" v-if="model._id">
					<flex-column-body style="background: #fafafa">
						<v-container fluid grid-list-lg>
							<!-- <constrain sm> -->
							<v-layout row wrap fill-height style="overflow-x: scroll">
								<div v-for="(contact, index) in members" :key="contact._id" class="cards border">
									<family-member-card
										@delete="deleteContact"
										:contactDefinitions="contactDefinitionOptions"
										v-model="members[index]"
									/>
								</div>
								<div class="ghost-card" @click="create">
									<div class="add-contact ghost">
										<!--                                             <div class="avatar-flex"> -->
										<div class="add-circle">
											<fluro-icon class="add-icon" icon="plus" />
										</div>
										<h5 class="add-contact-text">Add Contact</h5>
										<!-- </div> -->
									</div>
								</div>
							</v-layout>
							<!-- </constrain> -->
						</v-container>
					</flex-column-body>
					<!--                     <fluro-content-form :options="options" v-model="model.data" :fields="definition.fields" />
          -->
				</tab>
				<!--  -->
				<!--  -->
				<tab
					:heading="`${definition.title} Information`"
					v-if="definition && definition.fields && definition.fields.length"
				>
					<fluro-content-form :options="options" v-model="model.data" :fields="definition.fields" />
				</tab>
				<tab heading="Posts" v-if="model._id">
					<item-post-thread :item="model" />
				</tab>
			</tabset>
		</template>
	</flex-column>
</template>
<script>
/////////////////////////////////

import FamilyMemberCard from '../components/FamilyMemberCard.vue';
import FluroContentEditMixin from '../FluroContentEditMixin.js';
import AddressManager from '../components/AddressManager.vue';
import FluroAcademicSelect from '../../../form/FluroAcademicSelect.vue';
import ItemPostThread from '../../ItemPostThread';
/////////////////////////////////

import Vue from 'vue';
import _ from 'lodash';

/////////////////////////////////

export default {
	components: {
		AddressManager,
		FamilyMemberCard,
		ItemPostThread,
	},
	created() {
		//If we are creating a new family
		if (!this.model._id) {
			//Set the postal address to be the same by default
			this.$set(this.model, 'samePostal', true);
		}
	},
	mixins: [FluroContentEditMixin],
	computed: {
		members() {
			return _.orderBy(this.model.items, function (contact) {
				if (contact.householdRole == 'parent') {
					return -1;
				}

				if (contact.age) {
					return 120 - parseInt(contact.age, 10);
				}

				return 0;
			});
		},
		fieldsOutput() {
			var self = this;
			var array = [];

			///////////////////////////////////

			addField('title', {
				title: 'Title/Family Name',
				placeholder: 'Family Name',
				minimum: 1,
				maximum: 1,
				type: 'string',
				params: {
					autofocus: !self.model._id,
				},
			});

			///////////////////////////////////

			addField('phoneNumbers', {
				title: 'Household Phone Number',
				minimum: 0,
				maximum: 0,
				type: 'string',
			});

			addField('emails', {
				title: 'Household Email Address',
				minimum: 0,
				maximum: 0,
				type: 'email',
			});

			/////////////////////////////////////

			var contactFields = [];

			/////////////////////////////////////

			var row0 = {
				title: 'Definition',
				key: 'definitions',
				type: 'group',
				sameLine: true,
			};

			row0.fields = [
				{
					title: 'Household Role',
					key: 'householdRole',
					minimum: 0,
					maximum: 1,
					type: 'string',
					directive: 'select',
					options: [
						{
							title: 'None',
							value: '',
						},
						{
							title: 'Parent',
							value: 'parent',
						},
						{
							title: 'Child',
							value: 'child',
						},
					],
				},
				{
					title: 'Definition',
					key: 'definition',
					minimum: 0,
					maximum: 1,
					type: 'string',
					directive: 'select',
					options: self.contactDefinitionOptions,
					expressions: {
						hide() {
							var number = !self.contactDefinitions || !self.contactDefinitions.length;
							// console.log('NUMBER?', number, self.contactDefinitions)
							return number;
						},
					},
				},
			];
			contactFields.push(row0);

			/////////////////////////////////////

			var row1 = {
				title: 'Names',
				key: 'names',
				type: 'group',
				sameLine: true,
			};

			row1.fields = [
				{
					title: 'First Name',
					key: 'firstName',
					minimum: 1,
					maximum: 1,
					type: 'string',
				},
				{
					title: 'Last Name',
					key: 'lastName',
					placeholder: self.model.title,
					minimum: 0,
					maximum: 1,
					type: 'string',
					expressions: {
						defaultValue() {
							return self.model.title;
						},
					},
				},
			];
			contactFields.push(row1);

			/////////////////////////////////////

			var row2 = {
				title: 'Bits',
				key: 'bits',
				type: 'group',
				sameLine: true,
			};

			row2.fields = [
				{
					title: 'Gender',
					key: 'gender',
					minimum: 0,
					maximum: 1,
					type: 'string',
					directive: 'select',
					options: [
						{
							title: 'Male',
							value: 'male',
						},
						{
							title: 'Female',
							value: 'female',
						},
						{
							title: 'Unknown',
							value: '',
						},
					],
				},
				{
					title: 'Date of Birth',
					key: 'dob',
					minimum: 0,
					maximum: 1,
					type: 'date',
				},
			];
			contactFields.push(row2);

			/////////////////////////////////////

			/////////////////////////////////////

			var row3 = {
				title: 'Comms',
				key: 'comms',
				type: 'group',
				sameLine: true,
			};

			row3.fields = [
				{
					title: 'Email Address',
					key: 'emails',
					minimum: 0,
					maximum: 0,
					type: 'email',
				},
				{
					title: 'Phone Number',
					key: 'phoneNumbers',
					minimum: 0,
					maximum: 0,
					type: 'string',
				},
			];
			contactFields.push(row3);

			var row4 = {
				title: 'Comms',
				key: 'realmsandstuff',
				type: 'group',
				sameLine: true,
				fields: [],
			};

			row4.fields = [];

			if (self.uiMode != 'subsplash') {
				row4.fields.push({
					title: 'Realms',
					description: 'If different from the family',
					key: 'realms',
					minimum: 0,
					maximum: 0,
					type: 'reference',
					directive: 'realmselect',
					params: {
						restrictType: 'realm',
					},
					expressions: {
						defaultValue() {
							return self.model.realms.slice();
						},
					},
				});
			}

			row4.fields.push({
				title: 'Tags',
				key: 'tags',
				minimum: 0,
				maximum: 0,
				type: 'reference',
				directive: 'content-select-button',
				params: {
					restrictType: 'tag',
					allDefinitions: true,
				},
			});

			contactFields.push({
				title: 'School / Academic Calendar',
				key: '_academic',
				minimum: 0,
				maximum: 1,
				type: 'string',
				customComponent: FluroAcademicSelect,
				expressions: {
					hide: `model.householdRole == 'parent'`,
				},
			});

			contactFields.push(row4);

			// <fluro-academic-select :form-fields="formFields" :outline="showOutline" :options="formOptions" @calendar="updateAcademicCalendar" @grade="updateAcademicGrade" v-model="model" />
			//                             </fluro-academic-select>

			var minimumFamilyMembers = self.model._context == 'contact' ? 0 : 1;

			addField('items', {
				title: self.model._context == 'contact' ? 'Additional Family Member' : 'Family Member',
				minimum: minimumFamilyMembers,
				maximum: 0,
				type: 'group',
				asObject: true,
				askCount: minimumFamilyMembers,
				fields: contactFields,
				expressions: {
					hide() {
						return self.model._context == 'contact';
					},
				},
			});

			function addField(key, details) {
				details.key = key;
				array.push(details);
			}

			return array;
		},
		membersLength() {
			var self = this;
			if (_.get(self.model, 'items')) {
				return self.model.items.length;
			}
			return 0;
		},
		contactDefinitionOptions() {
			var self = this;

			var options = self.contactDefinitions.slice();

			if (options.length) {
				options.unshift({
					name: 'None',
					value: '',
				});
			}

			return options;
		},
	},
	methods: {
		deleteContact(contact) {
			var self = this;
			console.log('CONTACT DELETE', contact);
			var contactID = self.$fluro.utils.getStringID(contact);

			self.$fluro.api
				.put(`/family/${self.model._id}/remove`, {
					contacts: [contactID],
				})
				.then(function (res) {
					console.log('Contact removed');

					var currentIndex = self.model.items.indexOf(contact);
					self.model.items.splice(currentIndex, 1);

					console.log('Removed the person', currentIndex);

					// self.model.items = _.filter(self.model.items, function(item) {

					// })
				});
		},
		toggleSamePostal() {
			var self = this;

			self.$set(self.model, 'samePostal', !self.model.samePostal);

			self.$set(self.model, 'postalAddress', {});
		},
		create() {
			var self = this;
			//self.$fluro.global.create

			var options = [
				{
					title: 'Create New Contact',
					description: 'Create a new contact',
					key: 'new',
				},
				{
					title: 'Add Existing Contact',
					description: 'Add an existing contact to this household',
					key: 'existing',
				},
			];

			self.$fluro.options(options, 'New or existing?', `Please select an option below`).then(function (answer) {
				// console.log('ANSWER', answer);

				switch (answer.key) {
					case 'existing':
						self.$fluro.global
							.select(
								'contact',
								{
									allDefinitions: true,
									minimum: 0,
									maximum: 0,
								},
								true
							)
							.then(function (contacts) {
								console.log('Contacts to add', contacts);
								var contactIDs = self.$fluro.utils.arrayIDs(contacts);

								self.$fluro.api
									.put(`/family/${self.model._id}/add`, {
										contacts: contactIDs,
									})
									.then(function (res) {
										var newData = res.data;

										var existingContactIDs = self.$fluro.utils.arrayIDs(self.model.items);

										/////////////////////////////////

										var reduced = _.reduce(
											existingContactIDs,
											function (set, id) {
												set[id] = true;
												return set;
											},
											{}
										);

										/////////////////////////////////

										_.each(newData.items, function (contact) {
											if (!reduced[contact._id]) {
												self.model.items.push(contact);
											}
										});

										self.$fluro.notify(
											`${newData.items.length} contacts added to '${self.model.title}'`
										);
									});
							});

						break;
					case 'new':
						var template = {
							family: self.model,
							lastName: self.model.title,
						};

						self.$fluro.global
							.create(
								'contact',
								{
									template,
								},
								true
							)
							.then(function (res) {
								self.model.items.push(res);
							});
						break;
					default:
						break;
				}

				// return self.runBatch({
				//     useModel: self.useModel,
				//     operation: 'update',
				//     ids: self.$fluro.utils.arrayIDs(items),
				//     fields: {
				//         state: answer.value,
				//     },
				// }, context);
			});

			////////////////////////////////////////
		},
	},
	data() {
		return {};
	},
	asyncComputed: {
		contactDefinitions: {
			default: [],
			get() {
				var self = this;

				return new Promise(function (resolve, reject) {
					self.$fluro.types
						.subTypes('contact')
						.then(function (definitions) {
							definitions = _.chain(definitions)
								.filter(function (definition) {
									// console.log('Contact Definition!', definition)
									return definition.status == 'active';
								})
								.map(function (definition, key) {
									return {
										_id: definition._id,
										name: definition.title,
										value: definition.definitionName,
									};
								})
								.value();

							// if(definitions.length) {
							//     definitions.unshift({
							//         name:'Basic Contact',
							//         value:null,
							//     })
							// }

							resolve(definitions);
						})
						.catch(reject);
				});
			},
		},
	},
};
</script>
<style lang="scss">
.no-border-no-background .toggle-item {
	border: none !important;
	background: none !important;
	font-size: 14px;
	padding: 0px;
}

.cards {
	width: 200px !important;
	background-color: white;
	margin: 10px;
}

.border {
	border-color: rgba(0, 0, 0, 0.05);
	border-style: solid;
	border-width: 1px;
}

.ghost-card {
	padding: 16px;
	width: 200px !important;
	margin: 10px;
	border: 1px dashed #ccc;
	color: inherit;
	background-color: transparent;
	transition: background-color 0.3s;

	&:hover {
		background-color: white;
		border-color: $primary;

		.add-circle {
			border-color: $primary;
		}
	}
}

.add-circle {
	border: 1px dashed #ccc;
	border-radius: 50%;
	height: 132.8px;
	width: 132.8px;
	padding: 8px;
	margin: auto;
	display: flex;
	justify-content: center;
	align-items: center;
}

.filler-ghost {
	height: 100%;
	display: block;
}

.add-icon {
	width: 100%;
	height: 100%;
}

.add-contact-text {
	text-align: center;
	padding-top: 16px;
}
</style>
