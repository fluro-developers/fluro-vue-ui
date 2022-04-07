<template>
	<div>
		<fluro-page-preloader v-if="loading" contain />
		<fluro-panel>
			<fluro-panel-title>
				<h5>Guest List</h5>
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
			<tabset :justified="true">
				<tab
					:heading="`${segment.contacts.length} ${segment.title}`"
					:key="segment.key"
					v-for="segment in segments"
				>
					<!-- v-if="segments.length <= 1" -->
					<v-container pa-2 class="border-bottom">
						<v-layout align-center>
							<v-flex>
								<h4>{{ segment.contacts.length }} {{ segment.title }}</h4>
							</v-flex>
							<v-flex shrink>
								<v-btn
									class="ma-0"
									small
									color="primary"
									:loading="exporting"
									@click="exportItems(segment)"
								>
									Export {{ segment.title }}
									<fluro-icon right library="fas" icon="share" />
								</v-btn>
							</v-flex>
						</v-layout>
					</v-container>
					<fluro-table
						trackingKey="_id"
						defaultSort="firstName"
						:pageSize="35"
						style="max-height: 50vh"
						:items="segment.contacts"
						:columns="getColumns(segment.key)"
					/>
				</tab>
			</tabset>
		</fluro-panel>
	</div>
</template>
<script>
import SearchInput from '../../ui/SearchInput.vue';
import AvatarCell from '../../table/cells/AvatarCell.vue';
import FluroTable from '../../table/FluroTable.vue';
import _ from 'lodash';
import Vue from 'vue';

// const RSVPCell = Vue.extend({
//     props: {
//         'column': {
//             type: Object,
//         },
//         'row': {
//             type: [Object, Array],
//         },
//     },
//     methods: {
//         respond(type) {

//         }
//     },
//     computed: {
//         isDeclined() {
//          return this.row.attendance && this.row.attendance.guestDeclined;
//         },
//         isConfirmed() {
//          return this.row.attendance && this.row.attendance.guestConfirmed
//         },
//         isMaybe() {

//         },
//     },

//     template: `<div><v-btn small class="ma-1" @click="respond('confirm')" icon :color="isConfirmed ? 'green' : ''"><fluro-icon icon="check-circle"/></v-btn> <v-btn small class="ma-1" @click="respond('decline')" icon :color="isDeclined ? 'red' : ''"><fluro-icon icon="times-circle"/></v-btn> <v-btn small class="ma-1" @click="respond('maybe')" icon><fluro-icon icon="question-circle"/></v-btn></div>`,
// })

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
	},
	watch: {
		search: _.debounce(function (v) {
			this.debouncedSearch = v;
		}, 300),
	},
	data() {
		return {
			exporting: false,
			search: '',
			debouncedSearch: '',
			loading: true,
		};
	},
	computed: {
		eventID() {
			return this.$fluro.utils.getStringID(this.event);
		},
		filtered() {
			var self = this;
			var filtered = self.guests;

			if (self.debouncedSearch && self.debouncedSearch.length) {
				filtered = _.filter(filtered, function (item) {
					return _.includes(item.searchString, self.debouncedSearch);
				});
			}

			return filtered;
		},
		segments() {
			return _.chain(this.filtered)
				.reduce(
					function (set, guest) {
						//The guest is expected if they have confirmed, have a ticket, or are expected at the event
						if (
							guest.attendance.guestExpected ||
							guest.attendance.guestConfirmed ||
							guest.attendance.ticket
						) {
							if (guest.attendance.guestDeclined) {
								//But they have declined
							} else {
								set['expected'].contacts.push(guest);
							}
						}

						if (guest.attendance.guestConfirmed) {
							set['confirmed'].contacts.push(guest);
						}

						if (guest.attendance.ticket) {
							set['ticket'].contacts.push(guest);
						}

						if (guest.attendance.guestDeclined) {
							set['declined'].contacts.push(guest);
							return set;
						}

						if (guest.attendance.checkin) {
							set['checkin'].contacts.push(guest);
						} else {
							set['absent'].contacts.push(guest);
						}

						return set;
					},
					{
						expected: {
							title: 'Expected',
							contacts: [],
						},
						confirmed: {
							title: 'Confirmed',
							contacts: [],
						},
						declined: {
							title: 'Declined',
							contacts: [],
						},
						ticket: {
							title: 'Ticket Holders',
							contacts: [],
						},
						checkin: {
							title: 'Checked In',
							contacts: [],
						},
						absent: {
							title: 'Not Checked In',
							contacts: [],
						},
					}
				)
				.map(function (segment, key) {
					segment.key = key;
					return segment;
				})
				.filter(function (segment) {
					return segment.contacts.length;
				})
				.value();
		},
	},
	methods: {
		// exportItems(segment) {

		//     var self = this;
		//     self.exporting = true;
		//     console.log('SIGMENT', segment);
		// },
		getColumns(segment) {
			var self = this;

			var columns = [
				{
					title: '',
					key: '_id',
					renderer: AvatarCell,
					align: 'center',
				},
				{
					title: 'First Name',
					key: 'firstName',
				},
				{
					title: 'Last Name',
					key: 'lastName',
				},
				{
					title: 'Age',
					key: 'age',
				},
				{
					title: 'Gender',
					key: 'gender',
				},
				// {
				//     title: 'State',
				//     key: 'state',
				//     renderer: StatusCell,
				// },
				// {
				//     title: 'Info',
				//     key: 'correspondenceID',
				//     renderer: InfoCell,
				// },
			];

			console.log('GET COLUMNS FOR', segment);

			switch (segment) {
				case 'expected':
				case 'confirmed':
				case 'declined':
					// columns.push({
					//     title: 'RSVP',
					//     key: '_id',
					//     renderer: RSVPCell,
					//     shrink: true,

					// })

					columns.push({
						title: 'RSVP',
						key: '_id',
						renderer: 'button',
						button: {
							color(row) {
								if (row.attendance) {
									if (row.attendance.guestConfirmed) {
										return 'rgb(153, 224, 63)';
									}

									if (row.attendance.guestDeclined) {
										return 'red';
									}
								}

								return '#eee';
							},
							tooltip(row) {
								if (row.attendance) {
									if (row.attendance.guestConfirmed) {
										return `${row.preferredName || row.firstName || row.title} has confirmed`;
									}

									if (row.attendance.guestDeclined) {
										return `${row.preferredName || row.firstName || row.title} has declined`;
									}
								}

								return `No RSVP Yet`;
							},
							icon(row) {
								if (row.attendance) {
									if (row.attendance.guestConfirmed) {
										return 'check';
									}

									if (row.attendance.guestDeclined) {
										return 'times';
									}
								}

								return 'question';
							},
							iconLibrary(row) {
								if (row.attendance) {
									if (row.attendance.guestConfirmed) {
										return 'far';
									}

									if (row.attendance.guestDeclined) {
										return 'far';
									}
								}

								return 'fas';
							},
							action(row) {
								return new Promise(function (resolve, reject) {
									self.$fluro
										.options([
											{
												title: 'Confirm',
												icon: 'check',
												description: `RSVP ${
													row.preferredName || row.firstName || row.title
												} as confirmed`,
												value: 'confirmed',
											},
											{
												title: 'Decline',
												icon: 'times',
												description: `RSVP ${
													row.preferredName || row.firstName || row.title
												} as declined`,
												value: 'declined',
											},
										])
										.then(function (answer) {
											//Get the contactId
											var contact = self.$fluro.utils.getStringID(row);

											self.$fluro.api
												.post(`/event/${self.eventID}/rsvp/${answer.value}`, {
													contact,
												})
												.then(function (res) {
													if (!row.attendance) {
														self.$set(row, 'attendance', {});
													}

													switch (res.data.rsvp) {
														case 'confirmed':
															self.$set(row.attendance, 'guestConfirmed', true);
															break;
														case 'declined':
															self.$set(row.attendance, 'guestDeclined', true);
															break;
													}

													resolve();
												})
												.catch(function (err) {
													self.$fluro.error(err);
												});
										})
										.catch(reject);

									// console.log('Delete', row);
									// self.$fluro.confirm('Confirm Deletion', `Are you sure you want to delete ${row.title}?`, {
									//         confirmColor: 'error',
									//         confirmText: 'Confirm Delete',
									//     })
									//     .then(function() {

									//         self.$fluro.api.delete(`/printer/${row._id}`).then(function() {
									//             self.$fluro.resetCache();
									//             self.$fluro.notify('Printer was degistered')
									//             resolve();
									//         }, reject);
									//     }, reject);
								});
							},
						},
						shrink: true,
					});
					break;
			}

			////////////////////////////////////

			switch (segment) {
				case 'absent':
				case 'expected':
					columns.push({
						title: 'Check In',
						key: '_id',
						renderer: 'button',
						button: {
							color: 'primary',
							tooltip(row) {
								if (row.attendance) {
									if (row.attendance.checkin) {
										return 'Checked in';
									}
								}

								return `Add Checkin`;
							},
							// text(row) {
							//     return 'Check in';
							// },
							icon(row) {
								if (row.attendance) {
									if (row.attendance.checkin) {
										return 'check-square';
									}
								}

								return 'sign-in';
							},
							iconLibrary(row) {
								if (row.attendance) {
									if (row.attendance.checkin) {
										return 'fas';
									}
								}

								return 'far';
							},
							disabled(row) {
								if (row.attendance) {
									if (row.attendance.checkin) {
										return true;
									}
								}

								return;
							},
							action(row) {
								return new Promise(function (resolve, reject) {
									if (!self.$fluro.access.can('create', 'checkin', 'checkin')) {
										console.log('no permissions');
										return;
									}

									self.$fluro.api
										.post(`/checkin/${self.eventID}`, {
											contact: self.$fluro.utils.getStringID(row),
										})
										.then(
											function (res) {
												resolve(res.data);
												if (!row.attendance) {
													self.$set(row, 'attendance', {});
												}

												self.$set(row.attendance, 'checkin', true);
												self.$fluro.notify(`${row.firstName} was checked in`);
												// self.$delete(self.processing, contactID);
											},
											function (err) {
												self.$set(row.attendance, 'checkin', false);
												reject(err);
												// self.$delete(self.processing, contactID);
											}
										);
								});
							},
						},
						shrink: true,
					});
					break;
			}

			return columns;
		},
		exportItems(segment) {
			console.log('SIGMENT', segment);

			var self = this;
			self.exporting = true;

			var eventID = self.$fluro.utils.getStringID(self.event);
			var url = `/event/${this.eventID}/guestlist/${segment.key}/csv`;

			self.$fluro.api
				.get(url, { cache: false })
				.then(function (res) {
					self.$fluro.notify('Your popup blocker may stop this file from downloading');

					var token = self.$fluro.auth.getCurrentToken();
					var downloadURL = self.$fluro.api.defaults.baseURL + res.data.download;

					if (process.browser) {
						if (token) {
							window.open(downloadURL + '?access_token=' + token);
						} else {
							window.open(downloadURL);
						}
					}

					self.exporting = false;
				})
				.catch(function (err) {
					self.$fluro.error(err);
					self.exporting = false;
				});
		},
	},
	asyncComputed: {
		guests: {
			default: [],
			get() {
				var self = this;
				self.loading = true;

				return new Promise(function (resolve, reject) {
					return self.$fluro.api
						.get(`/event/${self.eventID}/guestlist`)
						.then(function (res) {
							var results = _.map(res.data, function (item) {
								item.searchString = String(
									`${item.title} ${item.firstName} ${item.lastName} ${item.preferredName} ${item.lastName} ${item.age} ${item.gender}`
								).toLowerCase();
								return item;
							});

							resolve(results);
							self.loading = false;
						})
						.catch(function (err) {
							reject(err);
							self.loading = false;
						});
				});
			},
		},
	},
};
</script>
<style lang="scss"></style>
