<template>
	<div class="chart">
		<template v-if="loading">
			Loading Component
			<v-progress-circular indeterminate></v-progress-circular>
		</template>
		<template v-else>
			<trend-chart title="Genders" :data="genders" />
		</template>
	</div>
</template>
<script>
//////////////////////////////////

import _ from 'lodash';

import DateComponentMixin from '@/mixins/DateComponentMixin';

//////////////////////////////////

export default {
	mixins: [DateComponentMixin],
	props: {
		label: {
			type: String,
		},
		endpoint: {
			type: String,
		},
		source: {
			type: Object,
		},
	},
	data() {
		return {
			loading: true,
		};
	},
	computed: {
		genders() {
			// console.log(self.dataSource);

			var self = this;

			var values = _.chain(self.dataSource)
				.get('summary')
				.map(function (entry) {
					return {
						title: entry.date,
						date: new Date(entry.date),
						values: entry.data,
					};
				})
				.value();

			var series = [
				{
					title: 'Male',
					key: 'genders.male',
					options: {
						color: 'blue',
						// type: 'column', stroke: { dashArray: 1, width: 1, curve: 'stepline' } },
					},
				},
				{
					title: 'Female',
					key: 'genders.female',
					options: {
						color: 'pink',
						// type: 'column', stroke: { dashArray: 1, width: 1, curve: 'stepline' } },
					},
				},
			];

			var output = {
				series: series,
				values: values,
			};

			return output;
		},
	},
	asyncComputed: {
		dataSource: {
			default: {},
			get() {
				var self = this;

				/////////////////////////////

				if (self.source) {
					self.loading = false;

					console.log('We have a datasource!', self.source);
					return Promise.resolve(self.source);
				} else if (self.endpoint) {
					/////////////////////////////

					//Get the start and end date for the data we want/need
					var startDate = this.datePeriod.start;
					var endDate = this.datePeriod.end;

					return new Promise(function (resolve, reject) {
						//Load the data from the API
						self.$fluro.api
							.get(self.endpoint, {
								params: {
									startDate: startDate,
									endDate: endDate,
								},
							})
							.then(
								function (res) {
									resolve(res.data);
									self.loading = false;
								},
								function (err) {
									reject(err);
									self.loading = false;
								}
							);
					});
				}
			},
		},
	},
};
</script>
<style scoped lang="scss">
.chart {
}
</style>
