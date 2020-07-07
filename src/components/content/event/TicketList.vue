<template>
	<div>
		<fluro-page-preloader v-if="loading" contain />
		<fluro-panel>
			<fluro-panel-title>
				<v-layout align-center>
					<v-flex>
						<h5>{{total}} Tickets</h5>
					</v-flex>
					<v-flex shrink>
						<v-btn class="ma-0" small color="primary" :loading="exporting" @click="exportItems()">
							Export
							<fluro-icon right library="fas" icon="share" />
						</v-btn>
					</v-flex>
				</v-layout>
			</fluro-panel-title>
			<fluro-panel-body class="border-bottom">
				<v-layout>
					<v-flex>
						<search-input v-model="search" />
					</v-flex>
					<!-- <div> -->
					<!-- <v-btn @click="push()" color="primary" class="ma-0 ml-2">Push -->
					<!-- <fluro-icon icon="plus" right /> -->
					<!-- </v-btn> -->
					<!-- </div> -->
				</v-layout>
			</fluro-panel-body>
			<!-- <tabset :justified="true"> -->
			<!-- <tab :heading="`${segment.contacts.length} ${segment.title}`" v-for="segment in segments"> -->
			<!-- <v-container pa2 class="border-bottom" v-if="segments.length <= 1"> -->
			<!-- <h3 margin>{{segment.contacts.length}} {{segment.title}}</h3> -->
			<!-- </v-container> -->
			<fluro-table trackingKey="_id" :clicked="clicked" defaultSort="firstName" :pageSize="50" style="max-height:50vh;" :items="filtered" :columns="columns" />
			<!-- </tab> -->
			<!-- </tabset> -->
		</fluro-panel>
	</div>
</template>
<script>
import SearchInput from 'src/components/ui/SearchInput.vue';
import AvatarCell from 'src/components/table/cells/AvatarCell.vue';
import FluroTable from 'src/components/table/FluroTable.vue';
import _ from 'lodash';


export default {
	components: {
		SearchInput,
		AvatarCell,
		FluroTable,
	},
	props: {
		event: {
			type: [Object, String],
		},
		interaction: {
			type: [Object, String],
		}
	},
	methods: {
		clicked(item) {
			console.log('Clicked item', item);
			item._type = 'ticket';
			this.$fluro.global.view(item, true);
		},
		exportItems() {

			var self = this;
			self.exporting = true;


			var url;

			if (this.eventID) {
				url = `/tickets/event/${this.eventID}/csv`;
			} else {
				url = `/tickets/interaction/${this.interactionID}/csv`;
			}


			self.$fluro.api.get(url)
				.then(function(res) {
					self.$fluro.notify('Your popup blocker may stop this file from downloading');

					var token = self.$fluro.auth.getCurrentToken();

					var downloadURL = self.$fluro.api.defaults.baseURL + res.data.download;
					if (token) {
						window.open(downloadURL + '?access_token=' + token);
					} else {
						window.open(downloadURL);
					}

					self.exporting = false;

				})
				.catch(function(err) {
					self.$fluro.error(err);
					self.exporting = false;
				})

		},
	},
	watch: {
		search: _.debounce(function(v) {
			this.debouncedSearch = v;
		}, 300),
	},
	data() {
		return {
			exporting: false,
			search: '',
			debouncedSearch: '',
			loading: true,
			columns: [
				// {
				//     title: 'Contact',
				//     key: 'contact',
				// },
				{
					title: 'First Name',
					key: 'firstName',
				},
				{
					title: 'Last Name',
					key: 'lastName',
				},

				{
					title: 'Ticket Type',
					key: 'title',
				},
				{
					title: 'Collected',
					key: 'collected',
					type: 'boolean',
				},
				// {
				//     title: 'ID',
				//     key: '_id',
				// },
				{
					title: 'Interaction',
					key: 'interaction',
				},
				{
					title: 'Email',
					key: 'email',
				},
				{
					title: 'Date',
					key: 'created',
					type: 'date',
				},
				{
					title: 'When',
					key: 'created',
					type: 'date',
					renderer: 'timeago',
				},
			],
		}
	},
	computed: {
		total() {
			return this.tickets.length;
		},
		filtered() {
			var self = this;
			var filtered = self.tickets;

			if (self.debouncedSearch && self.debouncedSearch.length) {
				filtered = _.filter(filtered, function(item) {
					return _.includes(item.searchString, self.debouncedSearch);
				})
			}

			return filtered;
		},
		eventID() {
			return this.$fluro.utils.getStringID(this.event);
		},
		interactionID() {
			return this.$fluro.utils.getStringID(this.interaction);
		},
	},
	asyncComputed: {
		tickets: {
			default: [],
			get() {
				var self = this;

				self.loading = true;

				///////////////////////////////////

				var url;

				if (self.interactionID) {
					url = `/tickets/interaction/${self.interactionID}`;
				} else {
					url = `/tickets/event/${self.eventID}`;
				}

				///////////////////////////////////

				return new Promise(function(resolve, reject) {
					return self.$fluro.api.get(url)
						.then(function(res) {

							var results = _.map(res.data, function(ticket) {
								ticket._type = 'ticket';
								ticket.searchString = `${ticket.firstName} ${ticket.lastName} ${ticket.title} ${ticket.email}`.toLowerCase()
								return ticket;
							});


							resolve(results);
							self.loading = false;

						})
						.catch(function(err) {
							reject(err);
							self.loading = false;
						});

				});

			}
		},
	},
}

</script>
<style lang="scss">
</style>
