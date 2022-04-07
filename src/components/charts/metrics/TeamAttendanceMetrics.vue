<template>
	<flex-column>
		<fluro-page-preloader v-if="loading" contain />
		<!--  <template v-if="loading"> Loading Component <v-progress-circular indeterminate></v-progress-circular>
  </template> -->
		<template v-if="model">
			<v-layout align-center>
				<v-flex>
					<h3>Attendance Metrics</h3>
				</v-flex>
				<v-flex shrink>
					<v-menu
						:fixed="true"
						:right="true"
						:close-on-content-click="false"
						transition="slide-y-transition"
						offset-y
					>
						<template v-slot:activator="{ on }">
							<v-btn small v-on="on">
								<fluro-icon icon="calendar-alt" left /> {{ readableDate }}
								<fluro-icon library="far" icon="angle-down" right />
							</v-btn>
						</template>
						<v-card>
							<v-layout>
								<v-flex>
									<v-card-text>
										<label>&nbsp;</label>
										<v-list dense>
											<v-list-tile
												@click="selectDatePeriod(option)"
												v-for="option in datePeriodOptions"
												:key="option.value"
											>
												{{ option.title }}
											</v-list-tile>
										</v-list>
									</v-card-text>
								</v-flex>
								<v-flex>
									<v-card-text class="text-sm-center"><label>From Date</label></v-card-text>
									<v-date-picker v-model="startDateString" no-title scrollable></v-date-picker>
								</v-flex>
								<v-flex>
									<v-card-text class="text-sm-center"><label>To Date</label></v-card-text>
									<v-date-picker v-model="endDateString" no-title scrollable></v-date-picker>
								</v-flex>
							</v-layout>
						</v-card>
					</v-menu>
				</v-flex>
			</v-layout>
			<fluro-panel v-if="eventData.model.series.attendance.length">
				<tabset>
					<tab heading="Attendance Trends">
						<fluro-panel-body>
							<fluro-chart
								chartType="line"
								:options="eventData.options"
								v-model="eventData.model"
								:series="eventData.series"
								:axis="eventData.axis"
								v-on:chart-event="chartClicked"
							/>
						</fluro-panel-body>
					</tab>
					<tab heading="Ticks">
						<div class="dots-view">
							<fluro-table
								:disablePageScroll="true"
								:pageSize="30"
								defaultSort="lastName"
								:items="grouped"
								:columns="dotColumns"
							></fluro-table>
						</div>
					</tab>
					<tab heading="Reported Stats">
						<!-- <pre>{{postStats}}</pre>  
       <pre>{{postData}}</pre>   -->
						<fluro-chart
							chartType="bar"
							:options="postData.options"
							v-model="postData.model"
							:series="postData.series"
							:axis="postData.axis"
						/>
					</tab>
				</tabset>
			</fluro-panel>
			<!-- <v-layout> -->
			<!-- <v-flex v-if="$vuetify.breakpoint.mdAndUp" xs4>
     <div v-for="event in model">
      <a @click="selectedEvent = event">
       
       <strong>{{event.startDate | formatDate('ddd D MMM YYYY')}}</strong>
       <div class="font-xs muted">{{event.title}}</div>
      </a>
     </div>
    </v-flex> -->
			<!-- <v-flex> -->
			<v-menu :fixed="true" transition="slide-y-transition" offset-y>
				<template v-slot:activator="{ on }">
					<div v-on="on">
						<template v-if="selectedEvent">
							<h4>
								{{ selectedEvent.title }}
								<span class="muted">{{ (selectedEvent.definition || 'event') | definitionTitle }}</span>
								<span class="muted"> <fluro-icon icon="angle-down" /></span>
							</h4>
							<div class="muted">
								{{ selectedEvent | readableEventDate }} ({{ selectedEvent.startDate | timeago }})
							</div>
						</template>
						<template v-else>
							<h4>
								Select Date <span class="muted"> <fluro-icon icon="angle-down" /></span>
							</h4>
							<div class="muted">Select a date to view data</div>
						</template>
					</div>
				</template>
				<flex-column style="background: #fff">
					<flex-column-body style="max-height: 60vh">
						<v-list dense>
							<v-list-tile @click="selectedEvent = event" v-for="event in reversed">
								<v-list-tile-content>
									<strong>{{ event.startDate | formatDate('h:mma - ddd D MMM YYYY') }}</strong>
									<div class="font-xs muted">{{ event.title }}. {{ event.startDate | timeago }}</div>
									<!-- <pre>{{option.account}}</pre> -->
								</v-list-tile-content>
							</v-list-tile>
						</v-list>
					</flex-column-body>
					<!-- <flex-column-footer class="border-top" v-if="canCreateNewDefinitions">
      <v-list dense>
       <v-list-tile @click="createNewDefinition()">
        <v-list-tile-content>
         Define a new type of {{config.type.title}}
        </v-list-tile-content>
        <v-list-tile-action>
         <fluro-icon icon="plus" />
        </v-list-tile-action>
       </v-list-tile>
      </v-list>
     </flex-column-footer> -->
				</flex-column>
			</v-menu>
			<template v-if="selectedEvent">
				<template v-if="hasCheckins || hasPosts">
					<!-- <fluro-panel> -->
					<!-- <fluro-panel-title> -->
					<!-- </fluro-panel-title> -->
					<!--  -->
					<!-- -->
					<fluro-panel>
						<template v-for="post in selectedEvent.posts">
							<fluro-panel-title class="border-top">
								<v-layout align-center>
									<v-flex>
										<strong>{{ post.definition || 'post' | definitionTitle }}</strong>
									</v-flex>
									<v-flex shrink>
										<v-btn
											icon
											small
											class="ma-0"
											v-if="$fluro.access.canEditItem(post)"
											@click="editPost(post)"
										>
											<fluro-icon icon="pencil" />
										</v-btn>
										<v-btn icon small class="ma-0" @click="$actions.open([post])">
											<fluro-icon icon="ellipsis-h" />
										</v-btn>
									</v-flex>
								</v-layout>
							</fluro-panel-title>
							<fluro-content-view
								:hideTitle="true"
								:id="post._id"
								:embedded="true"
								:definition="post.definition"
								:type="post._type"
							/>
						</template>
						<div v-if="hasCheckins" class="border-top">
							<!--  <fluro-panel-title class="border-top">
        <strong>People</strong>
       </fluro-panel-title> -->
							<tabset :justified="true">
								<!-- <tab :heading="`${checkedIn.length} / ${absent.length}`"> -->
								<!-- <div style="background: #fff" class="border-top"> -->
								<!-- <fluro-table :disablePageScroll="true" :pageSize="10" :items="people" :columns="columns"></fluro-table> -->
								<!-- </tab> -->
								<tab :heading="`${checkedIn.length} Checked In`">
									<!-- <div style="background: #fff" class="border-top"> -->
									<fluro-table
										:disablePageScroll="true"
										:pageSize="10"
										:items="checkedIn"
										:columns="columns"
									></fluro-table>
								</tab>
								<tab :heading="`${absent.length} Absent`">
									<!-- <div style="background: #fff" class="border-top"> -->
									<fluro-table
										:disablePageScroll="true"
										:pageSize="10"
										:items="absent"
										:columns="columns"
									></fluro-table>
								</tab>
							</tabset>
							<!-- </div> -->
						</div>
					</fluro-panel>
					<!-- </tab>
       <tab index="posts" heading="Posts" v-if="hasPosts">
        <div style="background: #fff">
         <fluro-content-view :id="post._id" v-for="post in selectedEvent.posts" :embedded="true" :definition="post.definition" :type="post._type" />
        </div>
       </tab> -->
					<!-- </tabset> -->
					<!-- </fluro-panel> -->
					<event-age-gender-metrics :id="selectedEvent._id" />
				</template>
				<fluro-panel v-else>
					<fluro-panel-body>
						<div class="muted text-xs-center">
							No data for {{ selectedEvent.startDate | formatDate('h:mma - ddd D MMM YYYY') }}
						</div>
					</fluro-panel-body>
				</fluro-panel>
			</template>
			<!-- </v-flex> -->
			<!-- </v-layout> -->
			<!-- <fluro-panel >
    <fluro-panel-title>
     <strong>Member Attendance</strong>
    </fluro-panel-title>
    <fluro-panel-body>
     <pre>{{attendance}}</pre>
    </fluro-panel-body>
   </fluro-panel> -->
			<!-- <div v-if="ageSpread.model.data.agespread.length"> -->
		</template>
	</flex-column>
</template>
<script>
import { moment } from 'fluro';
import FluroChart from '../FluroChart.vue';
import EventAgeGenderMetrics from './EventAgeGenderMetrics.vue';
import ContactAvatar from '../../table/cells/AvatarCell.vue';
import FluroTable from '../../table/FluroTable.vue';
import FluroContentViewMixin from '../../content/view/FluroContentViewMixin.js';
import FluroContentView from '../../content/view/FluroContentView.vue';
import DateBrowseMixin from '../mixins/DateBrowseMixin';
import TickCell from '../../table/cells/TickCell.vue';

///////////////////////////////////////

///////////////////////////////////////

var datePeriodOptions = [];
var now = new Date();

datePeriodOptions.push({
	title: 'Past 6 Months',
	startDate: moment().subtract(6, 'months').startOf('week').toDate(),
	endDate: now,
});

datePeriodOptions.push({
	title: 'Past 12 Months',
	startDate: moment().subtract(12, 'months').startOf('week').toDate(),
	endDate: now,
});

datePeriodOptions.push({
	title: 'This Year',
	startDate: moment().startOf('year').toDate(),
	endDate: now,
});

datePeriodOptions.push({
	title: 'Last Year',
	startDate: moment().subtract(1, 'years').startOf('week').toDate(),
	endDate: moment().subtract(1, 'years').endOf('week').toDate(),
});

const WEEK_KEY = 'W YYYY';
const MONTH_KEY = 'MMM YYYY';

export default {
	components: {
		FluroChart,
		EventAgeGenderMetrics,
		ContactAvatar,
		FluroTable,
		FluroContentView,
	},
	mixins: [FluroContentViewMixin],
	props: {
		group: {
			type: Object,
		},
		type: {
			type: String,
		},
		config: {
			type: Object,
		},
	},
	data() {
		return {
			actualSelectedEvent: null,
			loading: true,
			age: false,
			gender: false,
			sortedEventData: [],
			rawStartDate: moment().subtract(1, 'year').toDate(),
			rawEndDate: new Date(),
			datePeriodOptions,
		};
	},
	computed: {
		days() {
			var self = this;
			var dates = [];
			var currDate = moment(self.startDate).startOf('day');
			var lastDate = moment(self.endDate).startOf('day');
			while (currDate.add(1, 'days').diff(lastDate) < 0) {
				dates.push(currDate.clone().toDate());
			}

			return dates;
		},
		weeks() {
			var self = this;
			return (
				_.chain(self.days)
					.reduce(function (set, day, index) {
						var key = moment(day).format(WEEK_KEY);
						if (!set[key]) {
							set[key] = {
								index,
								key,
								day,
							};
						}

						return set;
					}, {})
					// .orderBy('index')
					// .map()
					.value()
			);
		},
		months() {
			var self = this;
			return (
				_.chain(self.days)
					.reduce(function (set, day, index) {
						var key = moment(day).format(MONTH_KEY);

						if (!set[key]) {
							set[key] = {
								index,
								key,
								day,
							};
						}
						return set;
					}, {})
					// .map()
					.value()
			);
		},
		/**/
		grouped() {
			var self = this;

			return _.chain(self.model)
				.map(function (event) {
					var mapped = _.map(event.expectedContacts, function (contact) {
						return Object.assign({}, contact, {
							contact: contact._id,
							absent: true,
							date: event.startDate,
						});
					});

					return [event.checkins, mapped];
				})
				.flattenDeep()
				.compact()
				.reduce(function (set, checkin) {
					var date = moment(checkin.date);
					var contactID = self.$fluro.utils.getStringID(checkin.contact);
					var week = date.format(WEEK_KEY);
					var month = date.format(MONTH_KEY);

					var existing = set[contactID];
					if (!existing) {
						existing = set[contactID] = {
							_id: contactID,
							_type: 'contact',
							title: `${checkin.firstName} ${checkin.lastName}`,
							firstName: checkin.firstName,
							lastName: checkin.lastName,
							realms: checkin.realms,
							contact: checkin.contact,
							weeks: {},
							months: {},
							checkins: [],
							total: 0,
						};
					}

					//////////////////////////////////

					existing.checkins.push(checkin);
					existing.total++;

					//////////////////////////////////

					if (!existing.weeks[week]) {
						existing.weeks[week] = {
							checkins: [],
							total: 0,
							absent: 0,
							tooltip: date.format('h:mma - ddd D MMM'),
						};
					}

					if (checkin.absent) {
						existing.weeks[week].checkins.push(checkin);
						existing.weeks[week].absent++;
					} else {
						existing.weeks[week].checkins.push(checkin);
						existing.weeks[week].total++;
					}

					//////////////////////////////////

					if (!existing.months[month]) {
						existing.months[month] = {
							checkins: [],
							total: 0,
							absent: 0,
							tooltip: date.format('h:mma - ddd D MMM'),
						};
					}

					if (checkin.absent) {
						existing.months[month].checkins.push(checkin);
						existing.months[month].absent++;
					} else {
						existing.months[month].checkins.push(checkin);
						existing.months[month].total++;
					}

					//////////////////////////////////

					return set;
				}, {})

				.map(function (entry) {
					if (self.membersLookup[entry._id]) {
					} else {
						entry.status = 'archived';
					}

					entry.percentWeeks = Math.ceil((entry.total / _.keys(self.weeks).length) * 100);
					entry.percentMonths = Math.ceil((entry.total / _.keys(self.months).length) * 100);
					return entry;
				})
				.orderBy(function (entry) {
					return entry.lastName;
				})
				.value();
		},

		readableDate() {
			return this.$fluro.date.readableEventDate(
				{
					startDate: this.startDate,
					endDate: this.endDate,
				},
				'day'
			);
		},
		readableStartDate() {
			return this.$fluro.date.formatDate(this.startDate);
		},
		readableEndDate() {
			return this.$fluro.date.formatDate(this.endDate);
		},
		startDate: {
			get() {
				return this.rawStartDate;
			},
			set(value) {
				var date = new Date(value);

				if (this.rawEndDate < date) {
					this.rawEndDate = new Date(date);
				}

				return (this.rawStartDate = new Date(value));
			},
		},
		endDate: {
			get() {
				return this.rawEndDate;
			},
			set(value) {
				var date = new Date(value);

				if (this.rawStartDate > date) {
					this.rawStartDate = new Date(date);
				}

				return (this.rawEndDate = new Date(value));
			},
		},
		startDateString: {
			get() {
				return this.stringDate(this.startDate);
			},
			set(value) {
				return (this.startDate = new Date(value));
			},
		},
		endDateString: {
			get() {
				return this.stringDate(this.endDate);
			},
			set(value) {
				return (this.endDate = new Date(value));
			},
		},

		people() {
			var self = this;

			var combined = [].concat(this.checkedIn, this.expected);

			return _.chain(combined)
				.reduce(function (set, contact) {
					var contact = Object.assign({}, contact);

					contact.firstName = contact.firstName;
					contact.lastName = contact.lastName;

					var contactID = contact._id;
					var existing = set[contactID];

					if (!existing) {
						existing = set[contactID] = contact;
					}

					if (contact.checkin) {
						existing.checkin = true;
					}

					if (existing.checkin) {
						existing.status = 'success';
					} else {
						existing.status = 'absent';
					}

					return set;
				}, {})
				.values()
				.value();
		},

		checkedIn() {
			var self = this;
			return _.map(this.selectedEvent.checkins, function (checkin) {
				// checkin.firstName = (checkin.firstName);
				// checkin.lastName = (checkin.lastName);
				// checkin._type = 'checkin';
				return Object.assign(checkin, {
					_type: 'contact',
					_id: self.$fluro.utils.getStringID(checkin.contact),
					checkin: true,
				});
			});
		},
		allMembers() {
			return _.compact([].concat(this.leaders, this.provisionalMembers));
		},
		membersLookup() {
			var self = this;
			return _.reduce(
				self.allMembers,
				function (set, member) {
					var memberID = member._id || member;
					if (!memberID) {
						return set;
					}
					set[memberID] = member;
					return set;
				},
				{}
			);
		},
		provisionalMembers() {
			var self = this;
			return self.group.provisionalMembers;
		},
		leaders() {
			var self = this;
			return _.chain(self.group.assignments).map('contacts').flatten().value();
		},
		absent() {
			var self = this;
			return _.filter(this.people, function (person) {
				return !person.checkin;
			});
		},
		expected() {
			return _.map(this.selectedEvent.expectedContacts, function (checkin) {
				checkin._type = 'contact';
				return checkin;
			});
		},
		reversed() {
			return _.chain(this.model || [])

				.reverse()
				.map(function (event) {
					var hasPosts = event.posts && event.posts.length;
					var hasCheckins = event.checkins && event.checkins.length;

					if (!hasPosts && !hasCheckins) {
						return;
					}
					return event;
				})
				.compact()
				.value();
		},
		hasPosts() {
			return this.selectedEvent && this.selectedEvent.posts && this.selectedEvent.posts.length;
		},
		hasCheckins() {
			return this.selectedEvent && this.selectedEvent.checkins && this.selectedEvent.checkins.length;
		},
		selectedEvent: {
			get() {
				return this.actualSelectedEvent || this.reversed[0];
			},
			set(event) {
				this.actualSelectedEvent = event;
			},
		},
		eventData() {
			var self = this;
			var model = {
				axis: [],
				series: {
					attendance: [],
					expected: [],
				},
			};
			var events = _.sortBy(self.model, function (event) {
				return event.startDate;
			});
			var sortedEventData = [];
			//console.log("events length", events.length)
			_.each(events, function (event) {
				//console.log("HERE", event)
				var headcount = _.get(event, 'headcount.average') || 0;
				var checkins = _.get(event, 'checkins.length') || 0;
				var attendance = Math.max(headcount, checkins, 0);
				if (attendance > 0) {
					model.axis.push(event.startDate);
					model.series.attendance.push(attendance);
					model.series.expected.push(_.get(event, 'stats.guestExpected') || 0);
					sortedEventData.push(event);
				}
			});
			self.sortedEventData = sortedEventData;

			//console.log("axis length", model.axis.length)
			var max = Math.max(_.max(model.series.attendance), _.max(model.series.expected));

			var returnData = {
				axis: {
					title: 'Date',
					key: 'date',
				},
				series: [
					{
						title: 'Attendance',
						key: 'attendance',
					},
					{
						title: 'Expected',
						key: 'expected',
					},
				],
				model,
				options: {
					markers: {
						size: 4,
					},
					yaxis: [
						{
							min: 0,
							max,
							title: {
								text: 'Attendance',
							},
							tooltip: {
								enabled: true,
								shared: true,
							},
							show: true,
						},
						{
							min: 0,
							max,
							opposite: true,
							title: {
								text: 'Expected',
							},
							tooltip: {
								enabled: true,
								shared: true,
							},
							show: true,
						},
					],
				},
			};

			//console.log("Event Graph Data", returnData)
			return returnData;
		},
		postStats() {
			var self = this;

			var keys = [];
			//  console.log("What am i working with?", self.model)
			var posts = _.chain(self.model)
				.map(function (event) {
					return _.get(event, 'posts');
				})
				.flatten()
				.map(function (post) {
					return _.get(post, 'data');
				})
				.reduce(function (set, value, key) {
					//console.log("set", set, "value", value, "key", key)
					_.each(value, function (val, id) {
						//console.log(val, typeof val)
						if (typeof val == 'number') {
							set[id] = id;
						}
					});
					return set;
				}, {})

				.value();

			return posts;
		},
		postData() {
			var self = this;
			var model = {
				axis: [],
				series: {},
			};

			var returnDataSeries = [
				// {
				//         "title": "Attendance",
				//         "key": "attendance"
				//     },
				//     {
				//         "title": "Expected",
				//         "key": "expected",
				//     },
			];

			_.each(self.postStats, function (val) {
				model.series[val] = [];
				returnDataSeries.push({
					title: val,
					key: val,
				});
			});
			var events = _.sortBy(self.model, function (event) {
				return event.startDate;
			});
			_.each(events, function (event) {
				//console.log("HERE", event)

				_.each(self.postStats, function (val) {
					if (_.get(event, `posts[0].data.${val}`)) {
						model.axis.push(event.startDate);
						model.series[val].push(_.get(event, `posts[0].data.${val}`));
					}
				});
			});

			var returnData = {
				axis: {
					title: 'Date',
					key: 'date',
				},
				series: returnDataSeries,
				model,
				options: {
					yaxis: [
						{
							min: 0,

							// title: {
							//     text: 'Attendance',
							// },
							tooltip: {
								enabled: true,
								shared: true,
							},
							show: false,
						},
						{
							min: 0,
							// max,
							opposite: true,
							// title: {
							//     text: 'Expected'
							// },
							tooltip: {
								enabled: true,
								shared: true,
							},
							show: false,
						},
					],
				},
			};

			// console.log("Event Graph Data", returnData)
			return returnData;
		},

		dotColumns() {
			var self = this;
			var array = [];

			var sourceArray = self.weeks;

			array.push({
				title: '',
				key: '_id',
				shrink: true,
				renderer: ContactAvatar,
			});

			// array.push({
			//     title: "First Name",
			//     key: "firstName",
			//     shrink: true,
			//     fixed: true,
			//     classes: 'sticky-first',
			// });

			// array.push({
			//     title: "Last Name",
			//     key: "lastName",
			//     fixed: true,
			//     shrink: true,
			//     classes: 'sticky-first border-right',
			// });

			//   array.push({
			//     title: "First Name",
			//     key: "firstName",
			//     shrink: true,
			//     fixed: true,
			//     classes: 'sticky-first',
			// });

			array.push({
				title: 'Name',
				key: 'title',
				fixed: true,
				shrink: true,
				classes: 'sticky-first border-right',
				click(row) {
					console.log('Clicked', row);
					self.$fluro.global.view(row, true);
				},
			});

			array.push({
				title: '%',
				key: 'percentWeeks',
				fixed: true,
				shrink: true,
				type: 'number',
				sortType: 'number',
				classes: 'border-right',
				align: 'center',
				tooltip: 'Percentage of attendance',
				suffix: '%',
			});

			_.each(sourceArray, function (entry) {
				var renderer = TickCell;
				array.push({
					title: `Wk ${moment(entry.day).format('W')}`,
					key: `weeks[${entry.key}]`,
					renderer,
					//classes,
					align: 'center',
					sortType: 'boolean',
					shrink: true,
					tiny: true,
				});
			});

			/**
   array.push({
    title: "Gender",
    key: "gender",
    shrink: true,
   });

   array.push({
    title: "Age",
    key: "age",
    shrink: true,
   });

   array.push({
    title: "Checked In",
    key: "checkin",
    shrink: true,
    type: 'boolean',
   });
   /**/

			return array;
		},
		columns() {
			var array = [];

			array.push({
				title: '',
				key: '_id',
				shrink: true,
				renderer: ContactAvatar,
			});

			array.push({
				title: 'First Name',
				key: 'firstName',
				shrink: true,
			});

			array.push({
				title: 'Last Name',
				key: 'lastName',
			});

			array.push({
				title: 'Gender',
				key: 'gender',
				shrink: true,
			});

			array.push({
				title: 'Age',
				key: 'age',
				shrink: true,
			});

			array.push({
				title: 'Checked In',
				key: 'checkin',
				shrink: true,
				type: 'boolean',
			});

			return array;
		},
		attendance() {
			var self = this;
			var allContacts = {};

			_.each(self.model, function (event, key) {
				//Add an entry for each expected contact
				_.each(event.expectedContacts, function (contact) {
					allContacts[contact._id] = contact;
				});

				//Add an entry for each checkin
				_.each(event.checkin, function (contact) {
					allContacts[contact._id] = {
						_id: contact._id,
						title: contact.title,
						firstName: contact.firstName,
						lastName: contact.lastName,
					};
				});
			});

			return _.chain(allContacts)
				.map(function (contact) {
					if (!contact) {
						return;
					}

					var contactID = self.$fluro.utils.getStringID(contact);
					contact.expected = self.membersLookup[contactID] || contact.expected;
					return contact;
				})
				.sortBy(allContacts, ['expected', 'lastName', 'firstName'])
				.value();
		},
	},
	asyncComputed: {
		model: {
			get() {
				var self = this;

				var startDate = this.startDate;
				var endDate = this.endDate;

				var id = self.$fluro.utils.getStringID(self.group);

				self.loading = true;
				return new Promise(function (resolve, reject) {
					//Load the chart data
					switch (self.type) {
						case 'team':
							self.$fluro.api
								.get(`/chart/groups/${id}/simple`, {
									params: {
										startDate,
										endDate,
									},
								})
								.then(
									function (res) {
										resolve(res.data.events);

										// console.log("Dataset", res.data)
										self.loading = false;
									},
									function (err) {
										reject(err);
										self.loading = false;
									}
								);
							break;
						case 'realm':
							break;
						case 'contact':
							break;
					}
				});
			},
		},
	},
	methods: {
		stringDate(date) {
			return this.$fluro.date.formatDate(date, 'YYYY-MM-DD');
		},
		selectDatePeriod(datePeriod) {
			this.startDate = datePeriod.startDate;
			this.endDate = datePeriod.endDate;
		},
		editPost(post) {
			self.$fluro.global.edit(post, true).then(function (result) {
				_.assign(post, result);
			});
		},
		chartClicked(data) {
			var self = this;
			//console.log(data.key, data)
			if (data.key == 'click') {
				console.log(
					'Clicked',
					data.config.dataPointIndex,
					data,
					'xxx',
					self.sortedEventData,
					'sss',
					self.sortedEventData[data.config.dataPointIndex]
				);
				self.selectedEvent = self.sortedEventData[data.config.dataPointIndex];
			}
		},
	},
};
</script>
