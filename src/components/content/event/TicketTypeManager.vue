<template>
	<fluro-panel>
		<fluro-panel-title>
			<v-layout align-center>
				<v-flex>
					<h5>Ticket Capacity</h5>
				</v-flex>
				<v-flex shrink>
					<v-btn class="ma-0" small color="primary" @click="addTicketType()">
						Add Ticket Type
						<fluro-icon right icon="plus" />
					</v-btn>
				</v-flex>
			</v-layout>
		</fluro-panel-title>
		<div v-show="false">
			<fluro-table />
		</div>
		<div class="fluro-table-wrapper">
			<div class="fluro-table-scroll">
				<table class="fluro-table-main">
					<thead>
						<tr>
							<th>Type</th>
							<th>Capacity Limit</th>
							<th>Purchased</th>
							<th>Available</th>
							<th>Filled</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th>Any/All Tickets</th>
							<td>
								<input v-model="model.ticketLimit" type="number" min="0" />
							</td>
							<td>{{ model.tickets.value }}</td>
							<td>
								{{ model.tickets.value ? getAvailable(model.tickets.value, model.ticketLimit) : '' }}
							</td>
							<td>
								{{ model.tickets.value ? `${getPercent(model.tickets.value, model.ticketLimit)}` : '' }}
							</td>
							<td></td>
						</tr>
						<tr :key="entry.title" v-for="(entry, index) in model.ticketTypes">
							<th>
								<input v-model="entry.title" />
							</th>
							<td>
								<input v-model="entry.limit" type="number" min="0" />
							</td>
							<td>{{ getPurchased(entry) }}</td>
							<td>{{ getAvailable(getPurchased(entry), entry.limit) }}</td>
							<td>{{ getPercent(getPurchased(entry), entry.limit) }}</td>
							<td>
								<v-btn small class="ma-0" icon @click="removeEntry(index)">
									<fluro-icon icon="trash-alt" />
								</v-btn>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<!-- <fluro-panel-body>
												<v-layout align-center>
																<v-flex xs8>Any Ticket</v-flex>
																<v-flex xs2>
																				<input v-model="model.ticketLimit" type="number" min="0" />
																</v-flex>
																<v-flex xs2>
																				{{model.tickets.value}}
																</v-flex>
												</v-layout>
								</fluro-panel-body>
								<fluro-panel-body class="border-top" v-for="entry in model.ticketTypes">
												<v-layout align-center>
																<v-flex xs8>
																				<input v-model="entry.title" />
																</v-flex>
																<v-flex xs2>
																				<input v-model="entry.limit" type="number" min="0" />
																</v-flex>
																<v-flex xs2>
																				{{getPurchased(entry)}}
																</v-flex>
												</v-layout>
    </fluro-panel-body>-->
	</fluro-panel>
</template>
<script>
import _ from 'lodash';
// import { FluroTable } from "fluro-vue-ui";
import FluroTable from '../../table/FluroTable.vue';

export default {
	components: {
		FluroTable,
	},
	props: {
		value: {
			type: Object,
		},
	},
	created() {
		this.setDefaults();
	},
	// computed: {
	// 				entries: {
	// 								get() {
	// 												return _.map(this.model, function(value, key) {
	// 																return {
	// 																				key,
	// 																				value,
	// 																}
	// 												})
	// 								},
	// 								set(array) {

	// 												this.model = _.reduce(array, function(set, entry) {

	// 																set[entry.key] = entry.value;

	// 																return set;
	// 												}, {})
	// 								}
	// 				}
	// },
	methods: {
		removeEntry(index) {
			this.model.ticketTypes.splice(index, 1);
		},
		getAvailable(value, limit) {
			value = parseInt(value || 0);
			limit = parseInt(limit || 0);
			if (!value && !limit) {
				return 0;
			}

			return Math.max(limit - value, 0);
		},
		getPercent(value, limit) {
			value = parseInt(value || 0);
			limit = parseInt(limit || 0);

			if (!limit) {
				return '';
			}

			if (!value && !limit) {
				return 0;
			}

			var fraction = value / limit;
			var percentage = Math.ceil(fraction * 100);

			if (!fraction || !percentage) {
				return '';
			}

			return `${percentage}%`;
		},
		getPurchased(ticketType) {
			var self = this;

			var key = _.camelCase(ticketType.title);

			var value = _.get(self.model, `tickets.types[${key}]`) || 0;

			if (isNaN(value)) {
				value = 0;
			}

			return value;
		},

		addTicketType() {
			var self = this;

			self.$fluro
				.prompt(
					[
						{
							title: 'Ticket Type',
							description: `eg. 'Standard', 'Adult', 'Child'`,
							key: 'title',
							minimum: 1,
							maximum: 1,
							params: { autofocus: true },
						},

						{
							title: 'Limit',
							description: `How many of these kinds of tickets are available? (Leave blank or 0 for no limit)`,
							key: 'limit',
							type: 'integer',
							minimum: 0,
							maximum: 1,
						},
					],
					'Add Ticket Type'
				)
				.then(function (res) {
					var title = res.title.toLowerCase();

					var existingMatch = _.some(self.model.ticketTypes, function (ticket) {
						return ticket.title.toLowerCase() == title;
					});

					if (existingMatch) {
						return;
					}

					res.limit = res.limit ? parseInt(res.limit) : 0;
					self.model.ticketTypes.push(res);
					// this.$set(this.model, 'Adult', 100);
				});
		},
		setDefaults() {
			var self = this;

			if (!self.model) {
				return;
			}

			if (!self.model.tickets) {
				self.model.tickets = {};
			}

			if (!self.model.ticketTypes) {
				self.$set(self.model, 'ticketTypes', []);
			}

			if (!self.model.ticketLimit) {
				self.$set(self.model, 'ticketLimit', 0);
			}
		},
	},
	watch: {
		model(v) {
			if (this.value != v) {
				this.setDefaults();
				this.$emit('input', v);
			}
		},
	},
	data() {
		return {
			model: this.value,
		};
	},
};
</script>
<style lang="scss"></style>
