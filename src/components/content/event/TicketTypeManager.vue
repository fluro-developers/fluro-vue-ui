<template>
				<fluro-panel>
								<fluro-panel-title>
												<v-layout align-center>
																<v-flex>
																				<h5>Ticket Types</h5>
																</v-flex>
																<v-flex shrink>
																				<v-btn class="ma-0" small color="primary" @click="addTicketType()">
																								Add Ticket Type
																								<fluro-icon right icon="plus" />
																				</v-btn>
																</v-flex>
												</v-layout>
								</fluro-panel-title>
								<div class="fluro-table-wrapper">
												<div class="fluro-table-scroll">
																<table class="fluro-table-main">
																				<thead>
																								<tr>
																												<th>Type</th>
																												<th>Limit</th>
																												<th>Purchased</th>
																												<th>Available</th>
																												<th>Filled</th>
																								</tr>
																				</thead>
																				<tbody>
																								<tr>
																												<th>Any</th>
																												<td><input v-model="model.ticketLimit" type="number" min="0" /></td>
																												<td>{{model.tickets.value}}</td>
																												<td>{{model.tickets.value ? getAvailable(model.tickets.value, model.ticketLimit) : ''}}</td>
																												<td>{{model.tickets.value ? getPercent(model.tickets.value, model.ticketLimit) : ''}}%</td>
																								</tr>
																								<tr v-for="entry in model.ticketTypes">
																												<th> <input v-model="entry.title" /></th>
																												<td><input v-model="entry.limit" type="number" min="0" /></td>
																												<td>{{getPurchased(entry)}}</td>
																												<td>{{getAvailable(getPurchased(entry), entry.limit)}}</td>
																												<td>{{getPercent(getPurchased(entry), entry.limit)}}%</td>
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
								</fluro-panel-body> -->
				</fluro-panel>
</template>
<script>
import _ from 'lodash';


export default {
				components: {

				},
				props: {
								value: {
												type: Object,
								}
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
								getAvailable(value, limit) {


												value = parseInt(value || 0);
												limit = parseInt(limit || 0);
												if (!value && !limit) {
																return 0;
												}

												console.log('Available', value, limit)
												return Math.max(limit - value, 0);
								},
								getPercent(value, limit) {

												value = parseInt(value || 0);
												limit = parseInt(limit || 0);

												if (!value && !limit) {
																return 0;
												}

												console.log('Percent', value, limit)
												return Math.ceil(value / limit * 100);
								},
								getPurchased(ticketType) {
												var self = this;

												var key = _.camelCase(ticketType.title)

												var value = _.get(self.model, `tickets.types[${key}]`) || 0;

												console.log('PURCHASED', ticketType, value)
												if (isNaN(value)) {
																value = 0;
												}

												return value;
								},

								addTicketType() {

												var self = this;


												self.$fluro.prompt([{
																								title: 'Ticket Type',
																								description: `eg. 'Standard', 'Adult', 'Child'`,
																								key: 'title',
																								minimum: 1,
																								maximum: 1,
																								params: { autofocus: true }
																				},

																				{
																								title: 'Limit',
																								description: `How many of these kinds of tickets are available? (Leave blank or 0 for no limit)`,
																								key: 'limit',
																								type: 'integer',
																								minimum: 0,
																								maximum: 1,
																				},

																], 'Add Ticket Type')
																.then(function(res) {

																				var title = res.title.toLowerCase();

																				var existingMatch = _.some(self.model.ticketTypes, function(ticket) {
																								return ticket.title.toLowerCase() == title;
																				})

																				if (existingMatch) {
																								return;
																				}

																				res.limit = res.limit ? parseInt(res.limit) : 0;
																				self.model.ticketTypes.push(res)
																				// this.$set(this.model, 'Adult', 100);
																})
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
								}
				},
				data() {
								return {
												model: this.value,
								}
				},
}

</script>
<style lang="scss">
</style>
