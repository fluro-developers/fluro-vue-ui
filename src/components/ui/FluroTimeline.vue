<template>
	<!-- <flex-column> -->
	<flex-column-body scroll-parent>
		<div class="timeline-wrapper">
			<slot name="above" />
			<template v-if="massive">
				<!-- MASSIVE -->
				<fluro-infinite-scroll :perPage="1" :startPage="1" :buffer="2" :items="months">
					<template slot-scope="props">
						<div class="year year-massive">
							<!-- <div class="year-label">{{year.title}}</div> -->
							<div class="month" v-for="month in props.page">
								<div class="month-label">{{ month.title }} {{ month.year }}</div>
								<div class="day" v-for="day in month.days">
									<div class="day-label">{{ day.title }}</div>
									<div class="entries">
										<slot name="card" v-for="entry in day.entries" :entry="entry"></slot>
									</div>
								</div>
							</div>
						</div>
					</template>
				</fluro-infinite-scroll>
			</template>
			<template v-else>
				<fluro-infinite-scroll :perPage="1" :startPage="1" :buffer="2" :items="years">
					<template slot-scope="props">
						<div class="year" v-for="year in props.page">
							<div class="year-label">{{ year.title }}</div>
							<div class="month" v-for="month in year.months">
								<div class="month-label">{{ month.title }}</div>
								<div class="day" v-for="day in month.days">
									<div class="day-label">{{ day.title }}</div>
									<div class="entries">
										<slot name="card" v-for="entry in day.entries" :entry="entry"></slot>
									</div>
								</div>
							</div>
						</div>
					</template>
				</fluro-infinite-scroll>
			</template>
			<slot name="below" />
		</div>
	</flex-column-body>
	<!-- </flex-column> -->
</template>
<script>
import _ from 'lodash';

import FluroInfiniteScroll from './FluroInfiniteScroll.vue';

export default {
	components: { FluroInfiniteScroll },
	props: {
		value: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {
			array: this.value,
		};
	},
	// mounted() {
	// console.log('THIS', this)
	// },
	computed: {
		massive() {
			return this.array.length > 400;
		},
		entries() {
			var self = this;

			var sorted = _.chain(this.array)
				.map(function (entry) {
					entry.date = new Date(entry.date);
					return entry;
				})
				.orderBy(function (entry) {
					return entry.date * -1;
				})
				.value();

			//////////////////////////////////

			if (!self.massive) {
				return sorted;
			}

			//////////////////////////////////

			return _.chain(sorted)
				.reduce(function (set, entry) {
					var groupingKey = `${entry.type || entry._type}-${entry.date}`;

					var existing = set[groupingKey];
					if (!existing) {
						existing = set[groupingKey] = {
							type: entry._type,
							grouped: true,
							entries: [],
							date: entry.date,
						};
					}

					existing.entries.push(entry);

					return set;
				}, {})
				.values()
				.map(function (group) {
					if (group.entries.length < 3) {
						return group.entries;
					}

					return group;
				})
				.flatten()
				.value();
		},
		months() {
			var self = this;

			return _.chain(this.entries)
				.reduce(function (set, entry) {
					// if(entry.grouped && entry.entries.length == 1) {
					//     entry = entry.entries[0];
					// }

					var date = entry.date;
					var key = self.$fluro.date.formatDate(entry.date, 'D MMM YYYY');
					var title = self.$fluro.date.formatDate(entry.date, 'D MMM');

					var existing = set[key];

					if (!existing) {
						existing = set[key] = {
							title,
							key,
							date,
							entries: [],
						};
					}

					existing.entries.push(entry);

					return set;
				}, {})
				.values()
				.orderBy(function (entry) {
					return -entry.date;
				})
				.reduce(function (set, day) {
					var date = day.date;
					var key = self.$fluro.date.formatDate(day.date, 'MMM YYYY');
					var title = self.$fluro.date.formatDate(day.date, 'MMM');
					var year = self.$fluro.date.formatDate(day.date, 'YYYY');

					var existing = set[key];
					if (!existing) {
						existing = set[key] = {
							title,
							key,
							date,
							year,
							days: [],
						};
					}

					existing.days.push(day);

					return set;
				}, {})
				.values()
				.orderBy(function (entry) {
					return -entry.date;
				})
				.value();
		},
		years() {
			var self = this;
			return _.chain(self.months)
				.reduce(function (set, month) {
					var date = month.date;
					var key = self.$fluro.date.formatDate(month.date, 'YYYY');
					var title = self.$fluro.date.formatDate(month.date, 'YYYY');

					var existing = set[key];
					if (!existing) {
						existing = set[key] = {
							title,
							key,
							date,
							months: [],
						};
					}

					existing.months.push(month);

					return set;
				}, {})
				.values()
				.orderBy(function (entry) {
					return -entry.date;
				})
				.value();
		},
	},
};
</script>
<style scoped lang="scss">
.timeline-wrapper {
	padding: 25px;
}

.year {
	border-left: 1px solid rgba(#000, 0.1);
}

.year-massive {
}

.year-label {
	font-weight: 500;
	text-transform: uppercase;
	display: block;
	padding: 5px 10px;
	font-size: 1.4em;
	background: rgba(#000, 0.1);
}

.month-label {
	font-weight: 500;
	text-transform: uppercase;
	display: block;
	padding: 5px 10px;
	font-size: 1.2em;
	margin: 10px 0;
	color: rgba(#000, 0.8);
}

.day {
	display: flex;
	margin-top: 10px;
}

.day-label {
	font-weight: 600;
	font-size: 10px;
	text-transform: uppercase;
	padding: 5px 10px;
	border-top: 1px solid rgba(#000, 0.1);
	width: 80px;
	white-space: nowrap;
	color: rgba(#000, 0.3);
}

.entries {
	position: relative;
	top: -10px;
	background: #fff;
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
	flex: 1;
	margin-bottom: 15px;
	overflow: hidden;
}
</style>
