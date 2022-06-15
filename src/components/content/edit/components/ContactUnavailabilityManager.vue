<template>
	<div>
		<fluro-page-preloader v-if="loading" contain />
		<template v-else>
			<list-group>
				<transition-group>
					<list-group-item
						class="ma-0 pa-0"
						v-for="(unavailability, index) in unavailabilities"
						v-bind:key="JSON.stringify(unavailability)"
					>
						<v-layout wrap align-center ma-0>
							<v-flex sm10 xs12 px-4>
								<strong>{{ unavailability.description }}</strong>
								<div class="muted">{{ unavailability | readableEventDate }}</div>
								<div class="font-xxs muted">
									<fluro-icon icon="clock" /> Submitted {{ unavailability.created | timeago }}
								</div>
							</v-flex>
							<v-flex sm2 xs12>
								<fluro-confirm-button @click="remove(index)" content="Remove">
									<template v-slot:default="{ confirming }">
										<v-btn
											flat
											block
											:color="confirming ? 'red' : ''"
											style="transition: all 0.1s; width: 100%"
											>{{ confirming ? 'Confirm?' : 'Remove' }}</v-btn
										>
									</template>
								</fluro-confirm-button>
							</v-flex>
						</v-layout>
					</list-group-item>
				</transition-group>
			</list-group>
			<fluro-panel>
				<fluro-panel-title>
					<h4>Add an Unavailability Period</h4>
				</fluro-panel-title>
				<fluro-panel-body>
					<form>
						<v-layout wrap px-4>
							<v-flex xs12 sm12>
								<fluro-content-form-field :field="description" v-model="proposed" />
							</v-flex>
							<v-flex xs12 sm5>
								<v-dialog
									ref="dialogStart"
									v-model="modalStart"
									:return-value.sync="proposed.startDate"
									lazy
									full-width
									width="290px"
								>
									<template v-slot:activator="{ on }">
										<v-text-field
											v-model="proposed.startDate"
											label="Start Date"
											prepend-icon="event"
											readonly
											v-on="on"
										></v-text-field>
									</template>
									<v-date-picker v-model="proposed.startDate" :min="startDateMin" scrollable>
										<v-spacer></v-spacer>
										<v-btn flat color="primary" @click="modalStart = false">Cancel</v-btn>
										<v-btn flat color="primary" @click="$refs.dialogStart.save(proposed.startDate)"
											>OK</v-btn
										>
									</v-date-picker>
								</v-dialog>
							</v-flex>
							<v-flex xs12 sm5>
								<v-dialog
									ref="dialogEnd"
									v-model="modalEnd"
									:return-value.sync="proposed.endDate"
									lazy
									full-width
									width="290px"
								>
									<template v-slot:activator="{ on }">
										<v-text-field
											v-model="proposed.endDate"
											label="End Date"
											prepend-icon="event"
											readonly
											v-on="on"
										></v-text-field>
									</template>
									<v-date-picker v-model="proposed.endDate" :min="endDateMin" scrollable>
										<v-spacer></v-spacer>
										<v-btn flat color="primary" @click="modalEnd = false">Cancel</v-btn>
										<v-btn flat color="primary" @click="$refs.dialogEnd.save(proposed.endDate)"
											>OK</v-btn
										>
									</v-date-picker>
								</v-dialog>
							</v-flex>
							<v-flex xs12 sm2>
								<v-btn block color="primary" :disabled="false" @click="add()">
									Add
									<fluro-icon right icon="plus" />
								</v-btn>
							</v-flex>
						</v-layout>
					</form>
				</fluro-panel-body>
			</fluro-panel>
		</template>
	</div>
</template>
<script>
import _ from 'lodash';
import FluroConfirmButton from '../../../ui/FluroConfirmButton.vue';
import FluroContentFormField from '../../../form/FluroContentFormField.vue';
import ListGroup from '../../../ui/ListGroup.vue';
import ListGroupItem from '../../../ui/ListGroupItem.vue';

export default {
	props: {
		value: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			description: {
				key: 'description',
				type: 'string',
				minimum: 1,
				maximum: 1,
				placeholder: 'Away on holidays',
				title: 'Description',
			},
			actionIndexes: {},
			loading: true,
			modalStart: false,
			modalEnd: false,
			model: this.value,
			unavailabilities: [],
			proposed: {
				description: undefined,
				startDate: this.startDateMin,
				endDate: this.startDateMin,
			},
		};
	},
	created() {
		console.log('RELOAD TEAMS');
		this.reloadRelationships();
		this.resetProposed();
	},
	methods: {
		add() {
			var self = this;

			var proposed = JSON.parse(JSON.stringify(self.proposed));

			proposed.startDate = self.$fluro.date.moment(proposed.startDate).startOf('day').utc().toDate();
			proposed.endDate = self.$fluro.date.moment(proposed.endDate).endOf('day').utc().toDate();

			return self.$fluro.api
				.post(`/contact/${self.contactID}/unavailability`, proposed)
				.then(function (res) {
					self.$fluro.notify(`Successfully updated ${self.contextName} unavailability`, { type: 'success' });
					self.unavailabilities.push(res.data);
					self.resetProposed();
				})
				.catch(function (err) {
					self.$fluro.error(err);
				});
		},
		resetProposed() {
			this.proposed = {
				description: undefined,
				startDate: this.startDateMin,
				endDate: this.startDateMin,
			};
		},
		reloadRelationships() {
			var self = this;
			self.loading = true;

			if (!self.contactID) {
				self.loading = false;
				return;
			}

			self.$fluro.api
				.get(`/contact/${self.contactID}/unavailability`, {})
				.then(function (res) {
					self.unavailabilities = res.data;
					self.loading = false;
				})
				.catch(function (err) {
					self.loading = false;
				});
		},
		remove(index) {
			var self = this;
			return self.$fluro.api
				.delete(`/contact/${self.contactID}/unavailability/${self.unavailabilities[index]._id}`)
				.then(function (res) {
					self.$fluro.notify(
						`Successfully deleted ${self.contextName} unavailability '${self.unavailabilities[index].description}'`,
						{ type: 'success' }
					);
					self.unavailabilities.splice(index, 1);
				})
				.catch(function (err) {
					self.$fluro.error(err);
				});
		},
	},
	components: {
		FluroContentFormField,
		ListGroup,
		ListGroupItem,
		FluroConfirmButton,
	},
	watch: {
		'proposed.startDate': function () {
			var self = this;
			if (self.proposed.endDate < self.proposed.startDate) {
				self.proposed.endDate = self.proposed.startDate;
			}
		},
	},
	computed: {
		contextName() {
			var name = this.model.preferredName || this.model.firstName || '';
			if (!name || !name.length) {
				return '';
			}

			if (_.endsWith(name, 's')) {
				return `${name}'`;
			}
			return `${name}'s`;
		},
		contactID() {
			if (!this.model._id) {
				return;
			}

			return this.$fluro.utils.getStringID(this.model);
		},
		contactTitle() {
			return _.get(this.model, 'title') || '';
		},
		startDateMin() {
			var today = new Date();

			function pad(val) {
				var res = val.toString();
				if (res.length == 1) {
					return '0' + res;
				} else {
					return res;
				}
			}

			return today.getFullYear() + '-' + pad(today.getMonth() + 1) + '-' + pad(today.getDate());
		},
		endDateMin() {
			var self = this;
			var date = new Date(_.get(self.proposed, 'startDate'));

			function pad(val) {
				var res = val.toString();
				if (res.length == 1) {
					return '0' + res;
				} else {
					return res;
				}
			}

			return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate());
		},
	},
	filters: {
		capitalize(str) {
			return _.startCase(str);
		},
	},
};
</script>
<style lang="scss"></style>
