<template>
	<v-card class="chart-widget" v-if="hasData">
		<!-- <pre>{{data.values}}</pre> -->
		<!-- <div style="padding: 5px;" :style="{backgroundColor:color}" v-for="color in theme.colors"/> -->
		<!-- <pre>{{dateGroupFormat}}</pre> -->
		<div class="chart-header">
			<v-layout row wrap>
				<v-flex class="chart-title">{{ title }}</v-flex>
				<v-spacer />
				<v-toolbar-items class="hidden-xs-only">
					<v-menu :fixed="true" transition="slide-y-transition" offset-y>
						<template v-slot:activator="{ on }">
							<v-btn v-on="on">
								<fluro-icon left :icon="`chart-${chartType.value}`" library="far" />
								{{ chartType.title }}
							</v-btn>
						</template>
						<v-list dense>
							<v-list-tile
								@click="selectChartType(option)"
								v-for="option in chartTypeOptions"
								:key="option.value"
							>
								<!-- <v-list-tile-avatar> -->
								<!-- </v-list-tile-avatar> -->
								<v-list-tile-content>
									{{ option.title }}
								</v-list-tile-content>
								<fluro-icon :icon="`chart-${option.value}`" library="far" right />
							</v-list-tile>
						</v-list>
					</v-menu>
					<v-menu :fixed="true" transition="slide-y-transition" offset-y>
						<template v-slot:activator="{ on }">
							<v-btn v-on="on">
								<fluro-icon library="far" icon="clock" />&nbsp;{{ dateGroupFormat.title }}
								<!-- <fluro-icon icon="clock"/> -->
							</v-btn>
						</template>
						<v-list dense>
							<v-list-tile
								@click="selectDateFormat(option)"
								v-for="option in dateGroupFormatOptions"
								:key="option.value"
							>
								<v-list-tile-content>{{ option.title }}</v-list-tile-content>
							</v-list-tile>
						</v-list>
					</v-menu>
					<v-menu
						:fixed="true"
						:right="true"
						ref="dateSelection"
						:close-on-content-click="false"
						transition="slide-y-transition"
						offset-y
					>
						<template v-slot:activator="{ on }">
							<v-btn v-on="on">
								<fluro-icon library="far" icon="calendar" left /> {{ readableStartDate }} -
								{{ readableEndDate }}
								<!-- <fluro-icon icon="clock"/> -->
							</v-btn>
						</template>
						<v-card>
							<v-layout>
								<v-flex>
									<v-card-text>
										<label>&nbsp;</label>
										<v-list dense>
											<v-list-tile
												@click="datePeriod = option"
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
									<v-date-picker v-model="startDateString" no-title scrollable>
										<!-- <v-spacer></v-spacer> -->
										<!-- <v-btn flat color="primary" @click="startMenu = false">Cancel</v-btn> -->
										<!-- <v-btn flat color="primary" @click="$refs.startMenu.save(startDate)">OK</v-btn> -->
									</v-date-picker>
								</v-flex>
								<v-flex>
									<v-card-text class="text-sm-center"><label>To Date</label></v-card-text>
									<v-date-picker v-model="endDateString" no-title scrollable>
										<!-- <v-spacer></v-spacer> -->
										<!-- <v-btn flat color="primary" @click="startMenu = false">Cancel</v-btn> -->
										<!-- <v-btn flat color="primary" @click="$refs.startMenu.save(endDate)">OK</v-btn> -->
									</v-date-picker>
								</v-flex>
							</v-layout>
						</v-card>
					</v-menu>
					<v-menu :fixed="true" :right="true" transition="slide-y-transition" offset-y>
						<template v-slot:activator="{ on }">
							<v-btn icon class="ma-0" v-on="on">
								<v-icon>more_vert</v-icon>
							</v-btn>
						</template>
						<v-list dense>
							<v-list-tile @click="hideAll">
								<v-list-tile-content> Hide all Series </v-list-tile-content>
								<fluro-icon icon="eye-slash" library="far" right />
							</v-list-tile>
							<v-list-tile @click="showAll">
								<v-list-tile-content> Show all Series </v-list-tile-content>
								<fluro-icon icon="eye" right />
							</v-list-tile>
							<v-list-tile @click="downloadPNG">
								<v-list-tile-content>Download PNG</v-list-tile-content>
								<fluro-icon icon="image" library="fas" right />
							</v-list-tile>
							<!-- <v-list-tile @click="downloadSVG">
                                <v-list-tile-content>Download SVG</v-list-tile-content>
                                <fluro-icon icon="image" library="far" right />
                            </v-list-tile> -->
						</v-list>
					</v-menu>
				</v-toolbar-items>
			</v-layout>
		</div>
		<!-- <div> -->
		<!-- <h5>{{readableEndDate}}</h5> -->
		<v-layout row wrap fill-height>
			<template v-if="trend.end" v-for="trend in enabledSeries.slice(0, 4)">
				<v-flex shrink>
					<statbox
						:color="trend.color"
						:label="trend.title"
						:start="trend.start"
						:mean="trend.mean"
						:end="trend.end"
					/>
					<!-- {{trend.mean}} -->
					<!-- {{trend.date | formatDate('ddd D MMM YYYY')}} -->
				</v-flex>
				<v-flex shrink>
					<v-divider vertical></v-divider>
				</v-flex>
			</template>
		</v-layout>
		<!-- <div> -->
		<!-- <apexchart type="pie" width="380" :options="pieChartOptions" :series="pieChartSeries" /> -->
		<!-- <pre>{{enabledSeries}}</pre> -->
		<!-- </div> -->
		<!-- </div> -->
		<div class="chart-wrapper-outer" :class="{ empty: !enabledSeries.length }">
			<div class="chart-wrapper-empty">No data</div>
			<div class="chart-wrapper-inner">
				<apexchart
					ref="chart"
					:height="350"
					@dataPointSelection="markerClick"
					:type="chartType.value"
					:options="chartOptions"
					:series="enabledSeries"
				/>
			</div>
		</div>
		<!-- <div class="chart-wrapper-outer" v-for="series in enabledSeries"> -->
		<!-- <div class="chart-wrapper-inner"> -->
		<!-- <pre>{{enabledSeries}}</pre> -->
		<!-- @click="click" @dataPointSelection="dataPointSelection" -->
		<!-- @markerClick="markerClick"  -->
		<!-- <apexchart ref="`chart-${series.name}`" :height="350" @dataPointSelection="markerClick" :type="chartType.value" :options="{id:series.id, group}" :series="[series]" /> -->
		<!-- </div> -->
		<!-- </div> -->
		<template v-if="series.length">
			<!-- <pre>{{enabledSeries}}</pre> -->
			<v-data-table
				:hide-actions="series.length <= 10"
				:headers="headers"
				:rows-per-page-items="perPageOptions"
				:items="series"
				class="elevation-0"
			>
				<template v-slot:items="props">
					<!--  -->
					<tr :class="{ inactive: !seriesIsActive(props.item) }">
						<td
							@mouseover="showHighlight(props.item)"
							@mouseleave="hideHighlight()"
							@click="toggleSeries(props.item, $event.metaKey)"
						>
							<!-- <v-btn icon @click.stop="soloSeries(props.item)"> -->
							<!-- <fluro-icon icon="star" :library="props.item.solo ? 'fas' : 'far'" /> -->
							<!-- </v-btn> -->
							<!-- <v-switch readonly :value="!props.item.hidden"></v-switch> -->
							<v-btn icon>
								<fluro-icon icon="eye" v-if="seriesIsActive(props.item)" />
								<fluro-icon icon="eye-slash" library="far" v-if="!seriesIsActive(props.item)" />
							</v-btn>
						</td>
						<td>
							<!-- {{ props.item.color }} -->
							<fluro-icon :color="props.item.color" icon="circle" library="fas" />
							<!-- <div class="sm muted" v-if="props.item.firstLine">{{props.item.firstLine}}</div> -->
						</td>
						<td>
							{{ props.item.title }}
							<!-- <div class="sm muted" v-if="props.item.firstLine">{{props.item.firstLine}}</div> -->
						</td>
						<td class="text-xs-center">{{ props.item.mean }}</td>
						<td class="text-xs-center">{{ props.item.start }}</td>
						<td class="text-xs-center">{{ props.item.end }}</td>
						<td>
							<change-indicator :value="props.item.changedPeriod" suffix="%" />
						</td>
						<td>
							<change-indicator :value="props.item.changedAverage" suffix="%" />
						</td>
						<!-- <td>{{ props.item.startDate | formatDate('h:mma dddd D MMM YYYY')}}</td> -->
						<!-- <td>{{ props.item.track ? props.item.track.title : ''}}</td> -->
						<!-- <td>{{ props.item.realms | comma('title')}}</td> -->
						<!-- <td>{{ props.item.stats.checkin}}</td> -->
						<!-- <td>{{ props.item.stats.headcount}}</td> -->
					</tr>
				</template>
			</v-data-table>
			<!-- <pre>
                {{series}}
            </pre> -->
		</template>
	</v-card>
</template>
<script>
import _ from 'lodash';
import ReportingColorsMixin from './mixins/ReportingColorsMixin.js';
import ChangeIndicator from './ChangeIndicator.vue';
import Statbox from './StatBox.vue';

import { moment } from 'fluro';

var formatDay = 'dddd D MMM YYYY';
var formatWeek = '[Week] w YYYY';
var formatMonth = 'MMM YYYY';
var formatQuarter = '[Quarter] Q YYYY';
var formatYear = 'YYYY';

var dateGroupFormatOptions = [
	{
		title: 'Day',
		value: formatDay,
	},
	{
		title: 'Week',
		value: formatWeek,
	},
	{
		title: '4 Week Period',
		value: '4week',
		handler(date) {
			// 52 / 4
			// 13
			//
			var weekNumber = moment(date).format('W');
			var yearNumber = moment(date).format('YYYY');
			// var chunk = 13 % weekNumber;
			// console.log('WEEK', weekNumber, chunk)
			var periodName = `Period ${Math.ceil(weekNumber / 4)} ${yearNumber}`;
			return periodName;
		},
	},

	{
		title: '6 Week Period',
		value: '6week',
		handler(date) {
			// 52 / 4
			// 13
			//
			var weekNumber = moment(date).format('W');
			var yearNumber = moment(date).format('YYYY');
			// var chunk = 13 % weekNumber;
			// console.log('WEEK', weekNumber, chunk)
			var periodName = `Period ${Math.ceil(weekNumber / 6)} ${yearNumber}`;
			return periodName;
		},
	},

	{
		title: 'Month',
		value: formatMonth,
	},
	{
		title: 'Quarter',
		value: formatQuarter,
	},
	{
		title: 'Year',
		value: formatYear,
	},
];

///////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///
var chartTypeOptions = [
	{
		title: 'Line',
		value: 'line',
	},
	{
		title: 'Bar',
		value: 'bar',
	},

	{
		title: 'Area',
		value: 'area',
	},
];

var weekday = [];
weekday[0] = 'Sunday';
weekday[1] = 'Monday';
weekday[2] = 'Tuesday';
weekday[3] = 'Wednesday';
weekday[4] = 'Thursday';
weekday[5] = 'Friday';
weekday[6] = 'Saturday';

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

// Not currently used
//var day = (1000 * 60 * 60 * 24);

var week = 1000 * 60 * 60 * 24 * 7;
var now = new Date();

var datePeriodOptions = [];

datePeriodOptions.push({
	title: 'Last 2 Years',
	start: new Date(new Date().setFullYear(new Date().getFullYear() - 2)),
	end: now,
});

datePeriodOptions.push({
	title: 'Last 12 Months',
	start: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
	end: now,
});

datePeriodOptions.push({
	title: 'Last 6 Months',
	start: new Date(new Date().setMonth(new Date().getMonth() - 6)),
	end: now,
});

datePeriodOptions.push({
	title: 'Last 3 Months',
	start: new Date(new Date().setMonth(new Date().getMonth() - 3)),
	end: now,
});

datePeriodOptions.push({
	title: 'Last 12 Weeks',
	start: new Date(new Date().setTime(new Date().getTime() - week * 12)),
	end: now,
});

datePeriodOptions.push({
	title: 'Last 4 Weeks',
	start: new Date(new Date().setTime(new Date().getTime() - week * 4)),
	end: now,
});

datePeriodOptions.push({
	title: 'Last 2 Weeks',
	start: new Date(new Date().setTime(new Date().getTime() - week * 2)),
	end: now,
});

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

export default {
	components: {
		ChangeIndicator,
		Statbox,
	},
	props: {
		singleScale: {
			type: Boolean,
		},
		id: {
			type: String,
			default: String(Math.random()),
		},
		title: {
			type: String,
		},
		group: {
			type: String,
		},
		weekStartDay: {
			type: Number,
			default: 4,
		},
		type: {
			type: String,
			default: 'line',
		},
		dateFormat: {
			type: String,
			default: formatWeek,
		},
		localeID: {
			type: String,
			default: 'fluro-chart',
		},
		data: {
			default() {
				return {
					series: [],
					values: [],
				};
			},
			type: Object,
		},
	},
	data() {
		var self = this;

		//Get the specified chart type from the props
		var defaultChartType = _.find(chartTypeOptions, { value: self.type });
		var defaultGroupFormat = _.find(dateGroupFormatOptions, { value: self.dateFormat });

		var DEFAULT_DATA = {
			chartLocale: self.localeID,
			datePeriodOptions,
			datePeriod: datePeriodOptions[1],
			dateGroupFormatOptions,
			dateGroupFormat: defaultGroupFormat,
			series: [],
			chartType: defaultChartType,
		};

		// console.log('DEFAULT', DEFAULT_DATA)

		return DEFAULT_DATA;
	},

	mixins: [ReportingColorsMixin],
	computed: {
		grouping() {
			return 'grouped together';
		},
		values() {
			return this.data.values;
		},
		pieChartSeries() {
			return _.chain(this.enabledSeries)
				.map(function (series) {
					return _.get(series, `data[${series.data.length - 1}][1]`);
				})
				.value();
		},
		pieChartOptions() {
			return {
				labels: _.map(this.enabledSeries, 'title'),
			};
		},
		perPageOptions() {
			var self = this;
			return [
				10,
				20,
				50,
				{
					text: 'All',
					value: -1,
				},
			];
		},
		hasData() {
			return this.data && this.data.values && this.data.values.length; // > 2;
		},
		enabledSeries() {
			var self = this;
			return _.filter(self.series, function (series) {
				if (series.hidden) {
					return;
				}

				if (!series.min && !series.max) {
					return;
				}

				return true;
			});
		},
		// lastValueDate() {

		//     var self = this;
		//     if(!self.enabledSeries.length) {
		//         return now
		//     }

		//     var mappedOptions = _.map(self.enabledSeries, "date");
		//     var maxDate = _.max(mappedOptions)
		//     console.log("maxDate", mappedOptions, maxDate, self.enabledSeries)
		//     return maxDate ? Date(maxDate) : now
		// },
		headers() {
			var self = this;
			return [
				{
					text: '',
					align: 'left',
					sortable: false,
					value: 'enabled',
				},
				{
					text: '',
					align: 'left',
					sortable: false,
					value: 'color',
				},
				{
					text: 'Title',
					align: 'left',
					sortable: true,
					value: 'title',
				},
				{ text: 'Mean / Average', value: 'mean', align: 'center' },
				{ text: `At ${self.readableStartDate}`, value: 'start', align: 'center' },
				{ text: `At ${self.readableEndDate}`, value: 'end', align: 'center' },
				{ text: 'Swing over time', value: 'changedPeriod' },
				{ text: 'Swing from Average', value: 'changedAverage' },
				// { text: 'Realms', value: 'realms' },
				// { text: 'Checked in', value: 'stats.checkin' },
				// { text: 'Headcount', value: 'stats.headcount' },
			];
		},
		readableStartDate() {
			var self = this;

			var formattedDate;
			if (self.dateGroupFormat.handler) {
				formattedDate = self.dateGroupFormat.handler(self.datePeriod.start);
			} else {
				formattedDate = self.$fluro.date.formatDate(self.datePeriod.start, self.dateGroupFormat.value);
			}
			return formattedDate;
		},
		readableEndDate() {
			var self = this;

			var formattedDate;
			if (self.dateGroupFormat.handler) {
				formattedDate = self.dateGroupFormat.handler(self.datePeriod.end);
			} else {
				formattedDate = self.$fluro.date.formatDate(self.datePeriod.end, self.dateGroupFormat.value);
			}
			return formattedDate;
		},
		startDateString: {
			get() {
				return this.datePeriod.start.toISOString().substr(0, 10);
			},
			set(value) {
				return (this.datePeriod.start = new Date(value));
			},
		},
		endDateString: {
			get() {
				return this.datePeriod.end.toISOString().substr(0, 10);
			},
			set(value) {
				return (this.datePeriod.end = new Date(value));
			},
		},
		datePeriodTitle() {
			if (self.datePeriod) {
				return self.datePeriod.title;
			} else {
				return 'Custom';
			}
		},

		chartTypeOptions() {
			return chartTypeOptions;
		},
		markers() {
			return {
				size: 3,
				// colors: undefined,
				strokeColor: '#fff',
				strokeWidth: 1,
				// strokeOpacity: 0.9,
				// fillOpacity: 1,
				// discrete: [],
				// shape: "circle",
				// radius: 2,
				// offsetX: 0,
				// offsetY: 0,
				hover: {
					size: 10,
					// sizeOffset: 10
				},
			};
		},
		legend() {
			var self = this;

			return {
				show: false,
				showForNullSeries: false,
				showForZeroSeries: false,
			};

			// var output = {
			//     labels: {
			//         colors: [],
			//     },
			// }

			// _.each(self.enabledSeries, function(series, index) {
			//     output.labels.colors[index] = _.get(series, 'options.legend.color') || _.get(series, 'options.stroke.color') || self.theme.colors[index % self.theme.colors.length];
			//     // output.curve[index] = _.get(series, 'options.legend.curve') || 'smooth'; // || 'straight'
			//     // output.dashArray[index] = _.get(series, 'options.legend.dashArray');
			//     // output.width[index] = _.get(series, 'options.legend.width') || 5;
			//     // output.lineCap[index] = _.get(series, 'options.legend.lineCap') || 'round'; // || 'butt';
			// });

			// return output;
		},
		dataLabels() {
			return {
				enabled: false, //true,
				// enabledOnSeries: undefined,
				// formatter: function(val, opts) {
				//     return val
				// },
				// textAnchor: 'middle',
				// offsetX: 0,
				// offsetY: 0,
				// style: {
				//     fontSize: '20px',
				//     fontFamily: 'Helvetica, Arial, sans-serif',
				//     colors: undefined
				// },
				// dropShadow: {
				//     enabled: false,
				//     top: 1,
				//     left: 1,
				//     blur: 1,
				//     opacity: 0.45
				// }
			};
		},
		colors() {
			var self = this;

			return _.map(self.enabledSeries, function (series, index) {
				return _.get(series, 'color') || self.theme.colors[index % self.theme.colors.length];
			});
		},
		stroke() {
			var self = this;

			var output = {
				colors: [],
				curve: [],
				dashArray: [],
				width: [],
				lineCap: [],
			};

			_.each(self.enabledSeries, function (series, index) {
				output.colors[index] =
					_.get(series, 'options.stroke.color') ||
					_.get(series, 'color') ||
					self.theme.colors[index % self.theme.colors.length];
				output.curve[index] = _.get(series, 'options.stroke.curve') || 'straight'; // || 'smooth'
				output.dashArray[index] = _.get(series, 'options.stroke.dashArray');
				output.width[index] = _.get(series, 'options.stroke.width') || 5;
				output.lineCap[index] = _.get(series, 'options.stroke.lineCap') || 'round'; // || 'butt';
			});

			return output;
		},
		fill() {
			var self = this;

			var output = {
				colors: [],
			};

			_.each(self.enabledSeries, function (series, index) {
				output.colors[index] =
					_.get(series, 'options.fill.color') ||
					_.get(series, 'color') ||
					self.theme.colors[index % self.theme.colors.length];
			});

			return output;
		},
		chartOptions() {
			var self = this;

			var output = {
				chart: {
					id: self.id,
					responsive: [
						{
							breakpoint: undefined,
							options: {},
						},
					],
					height: 350,
					// stacked: true,
					zoom: {
						type: 'x',
						enabled: false,
						// enabled: false,
					},
					toolbar: {
						show: false,
						enabled: false,
						autoSelected: 'zoom',
					},
					group: self.group, //Groups the two charts together
				},
				plotOptions: {
					line: {
						curve: 'smooth',
					},
				},
				colors: this.colors,
				dataLabels: this.dataLabels,
				legend: this.legend,
				stroke: this.stroke,
				markers: this.markers,

				fill: this.fill,

				// title: {
				//     text: this.title,
				//     align: 'left'
				// },
				// fill: {
				//     type: 'gradient',
				//     gradient: {
				//         shadeIntensity: 1,
				//         inverseColors: false,
				//         opacityFrom: 0.5,
				//         opacityTo: 0,
				//         stops: [0, 90, 100]
				//     },
				// },
				grid: {
					row: {
						colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
						opacity: 0.5,
					},
				},
				xaxis: this.xaxis,
				yaxis: this.yaxis,
				tooltip: {
					shared: false,
					custom: function (val) {
						var match = self.enabledSeries[val.seriesIndex].data[val.dataPointIndex] || [];
						// console.log('MATCH?', match)
						//

						// console.log('VALUE', match);
						return match[2];
						// return `<pre>${val.dataPointIndex}</pre>`;
					},
					y: {
						formatter: function (val) {
							var formattedDate;
							if (self.dateGroupFormat.handler) {
								formattedDate = self.dateGroupFormat.handler(val);
							} else {
								formattedDate = self.$fluro.date.formatDate(val, self.dateGroupFormat.value);
							}
							return formattedDate;

							// return self.$fluro.date.formatDate(val, self.dateGroupFormat.value);
							// return (val / 1000000).toFixed(0)
						},
					},
					x: {
						formatter: function (val) {
							var formattedDate;
							if (self.dateGroupFormat.handler) {
								formattedDate = self.dateGroupFormat.handler(val);
							} else {
								formattedDate = self.$fluro.date.formatDate(val, self.dateGroupFormat.value);
							}
							return formattedDate;

							// return self.$fluro.date.formatDate(val, self.dateGroupFormat.value);
							// return (val / 1000000).toFixed(0)
						},
					},
				},
			};

			output.dataLabels;

			return output;
		},
		xaxis() {
			return {
				labels: {
					datetimeFormatter: {
						year: 'yyyy',
						month: 'MMM yyyy',
						day: 'ddd d MMM',
						hour: 'HH:mm',
					},
				},
				type: 'datetime',
			};
			//     return {
			//         categories: ['Jan', 'Feb', 'Woot', 'Hallo!', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
			//     }
		},

		yaxis() {
			var self = this;
			// return {
			//     seriesName:self.series[0].title,
			// }

			if (!self.enabledSeries || !self.enabledSeries.length) {
				return;
			}

			/////////////////////////////////////////

			if (self.singleScale) {
				var maxSeries = _.last(_.orderBy(self.enabledSeries, 'max'));
				var minSeries = _.first(_.orderBy(self.enabledSeries, 'min'));

				return [
					{
						seriesName: maxSeries.name,
						max: Math.round(maxSeries.max * 1.05) || 0,
						min: minSeries.min,
						show: true,
					},
				];
			}

			/////////////////////////////////////////

			return _.map(self.enabledSeries, function (series, index) {
				return {
					seriesName: series.name,
					max: Math.round(series.max * 1.05) || 0,
					min: series.min,
					show: true,
				};
			});

			/**
            return _.map(self.enabledSeries, function(series, index) {

                

                
                // return {
                //     show:true,//!hidden,//: index == 0,
                //     seriesName: series.name,
                //     max: Math.round(series.max * 1.05) || 0,
                //     min: series.min || 0,
                // }

                return {
                    show: index == 0,
                    seriesName: maxSeries.name,
                    max: Math.round(maxSeries.max * 1.05),
                    min: minSeries.min,
                }
            })
            /**/

			// return {
			// show: true,
			// showAlways: true,
			// seriesName: undefined,
			// opposite: false,
			// reversed: false,
			// logarithmic: false,
			// tickAmount: 10,
			// min: 6,
			// max: 6,
			// forceNiceScale: true,
			// floating: false,
			// decimalsInFloat: undefined,
			// labels: {
			//     show: true,
			//     align: 'right',
			//     minWidth: 0,
			//     maxWidth: 160,
			//     style: {
			//         color: undefined,
			//         fontSize: '12px',
			//         fontFamily: 'Helvetica, Arial, sans-serif',
			//         cssClass: 'apexcharts-yaxis-label',
			//     },
			//     offsetX: 0,
			//     offsetY: 0,
			//     rotate: 0,
			//     formatter: (value) => { return val },
			// },
			// axisBorder: {
			//     show: true,
			//     color: '#78909C',
			//     offsetX: 0,
			//     offsetY: 0
			// },
			// axisTicks: {
			//     show: true,
			//     borderType: 'solid',
			//     color: '#78909C',
			//     width: 6,
			//     offsetX: 0,
			//     offsetY: 0
			// },
			// title: {
			//     text: undefined,
			//     rotate: -90,
			//     offsetX: 0,
			//     offsetY: 0,
			//     style: {
			//         color: undefined,
			//         fontSize: '12px',
			//         fontFamily: 'Helvetica, Arial, sans-serif',
			//         cssClass: 'apexcharts-yaxis-title',
			//     },
			// },
			// crosshairs: {
			//     show: true,
			//     position: 'back',
			//     stroke: {
			//         color: '#b6b6b6',
			//         width: 1,
			//         dashArray: 0,
			//     },
			// },
			// tooltip: {
			//     enabled: true,
			//     offsetX: 0,
			// },

			// }
		},
	},
	methods: {
		markerClick(event, context, details) {
			var self = this;
			var series = self.enabledSeries[details.seriesIndex];
			var dataPoint = series.data[details.dataPointIndex];

			console.log('CLICKED', dataPoint[3], series, dataPoint, self);
			self.$emit('clicked', dataPoint[3], series, dataPoint, self);

			// details, series,
			// console.log('MARKER', series.title, dataPoint[3]);
		},
		click(event, stuff, things) {
			console.log('CLICK', event, stuff, things);
		},
		dataPointSelection(event, chartContext, config) {
			// var selectedIndex =
			console.log('DATAPOINT', chartContext);
		},
		getFirstDayOfWeek(date) {
			var self = this;
			var returnDate = moment(date)
				// .locale('en', {week: {dow: weekStartDay}})
				.locale(self.chartLocale)
				.weekday(0)
				.toDate();

			return returnDate;
		},
		setFirstDayOfWeek(weekStartDay) {
			var self = this;
			moment.locale(self.chartLocale, { week: { dow: weekStartDay } });
		},
		selectDateFormat(option) {
			this.dateGroupFormat = option;
			this.recalculateAndMapSeries();
		},
		selectChartType(option) {
			this.chartType = option;
			// this.recalculateAndMapSeries();
		},
		downloadURI(uri, name) {
			var link = document.createElement('a');
			link.download = name;
			link.href = uri;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			// delete link;
		},
		downloadPNG() {
			var self = this;
			var chart = this.$refs.chart;
			var dataURL = chart.dataURI().then((uri) => {
				console.log('PNG');
				self.downloadURI(uri, 'Chart.png');
				// var pdf = new jsPDF();
				// pdf.addImage(uri, 'PNG', 0, 0);
				// pdf.save("download.pdf");
			});
		},
		downloadSVG() {
			var self = this;
			var chart = this.$refs.chart;
			console.log('SVG', chart);
			var paper = chart.paper();
			// .then((svg) => {

			self.downloadURI(paper.svg(), 'Chart.svg');
			// var pdf = new jsPDF();
			// pdf.addImage(uri, 'PNG', 0, 0);
			// pdf.save("download.pdf");
			// })
		},
		selectorName(seriesName) {
			return `series${_.camelCase(seriesName).toLowerCase()}`;
		},
		showHighlight(series) {
			var all = this.$el.querySelectorAll('.apexcharts-series');
			_.each(all, function (element) {
				element.style.opacity = 0.1;
			});

			// _.each(this.$el.querySelectorAll('.apexcharts-series'), function(element) {
			//     console.log(element.node);
			//     // element.style.opacity = 0;
			//     // console.log('ELEMENT', element);
			//     element.node.style.opacity = 0;
			// })

			var selector = `.${series.name}`;
			var element = this.$el.querySelector(selector);
			// console.log('ELEMENT', selector, element);
			if (element) {
				element.style.opacity = 1;
				// element.style.opacity = 1; //.css({'opacity':1})
			}
		},
		hideHighlight() {
			var all = this.$el.querySelectorAll('.apexcharts-series');
			_.each(all, function (element) {
				element.style.opacity = 1;
			});
		},
		hideAll() {
			_.each(this.series, function (series, i) {
				series.hidden = true;
			});
		},
		showAll() {
			_.each(this.series, function (series, i) {
				series.hidden = false;
			});
		},
		soloSeries(series) {
			this.hideAll();
			series.hidden = false;
		},
		toggleSeries(series, solo) {
			if (solo) {
				return this.soloSeries(series);
			}

			series.hidden = !series.hidden;
			// console.log('toggle Series', series.title, this.$refs.chart);
			// this.$refs.chart.toggleSeries(series.name);
		},
		recalculateAndMapSeries() {
			//Empty Function
		},

		// , 100),
		mapSeries(title, key, color, options) {
			if (!options) {
				options = {};
			}

			var self = this;

			///////////////////////////////////////////

			var values = _.chain(self.values)
				.filter(self.filterDateRange)
				.reduce(function (set, entry) {
					////////////////////////////////////////

					var groupingDate = new Date(entry.date);
					groupingDate.setHours(0, 0, 0, 0);

					////////////////////////////////////////

					// function getMonday(d) {
					//     d = new Date(d);
					//     var day = d.getDay(),
					//         diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
					//     return new Date(d.setDate(diff));
					// }

					////////////////////////////////////////

					switch (self.dateGroupFormat.value) {
						// case formatDay:
						// break;
						case formatWeek:
							groupingDate = self.getFirstDayOfWeek(groupingDate, self.weekStartDay);
							// getMonday(groupingDate);
							break;
						// case formatMonth:
						// break;
						// case formatYear:
						// break;
					}

					var formatValue = self.dateGroupFormat.value;
					var dateKey;
					if (self.dateGroupFormat.handler) {
						dateKey = self.dateGroupFormat.handler(groupingDate);
					} else {
						dateKey = moment(groupingDate).format(self.dateGroupFormat.value);
					}

					////////////////////////////////////////

					var existing = set[dateKey];
					if (!existing) {
						existing = set[dateKey] = {
							date: groupingDate,
							entries: [],
						};
					}

					//Add the entry into our group
					// console.log('PUSH ENTRY', entry)
					existing.entries.push(entry);

					return set;
				}, {})
				.values()
				.compact()
				.map(function (group) {
					var tooltip = '<div class="chart-tooltip">';

					//////////////////////////////////////

					var formattedDate;
					if (self.dateGroupFormat.handler) {
						formattedDate = self.dateGroupFormat.handler(group.date);
					} else {
						formattedDate = self.$fluro.date.formatDate(group.date, self.dateGroupFormat.value);
					}

					tooltip += `<strong>${formattedDate}</strong>`;
					tooltip += `<div>${self.$fluro.date.timeago(group.date)}</div>`;
					tooltip += `<strong style="color:${color};">${title}</strong><br/>`;

					//////////////////////////////////////

					var totalEntries = 0;

					//////////////////////////////////////

					var table = '<table class="table">';

					var totalledValue = _.chain(group.entries)
						.orderBy(function (entry) {
							return new Date(entry.date);
						})
						.reduce(function (set, entry) {
							//Get the value from the specified key on each entry
							var entryValue = _.get(entry.values, key);

							//This entry does not have a value
							if (entryValue == undefined) {
								return set;
							}

							//No value has been accumulated yet
							if (set == undefined) {
								set = 0;
							}

							table += `<tr><td>${entry.title || ''}</td><td>${self.$fluro.date.formatDate(
								entry.date,
								'h:mma D MMM YYYY'
							)}</td><td><strong>${entryValue}</strong></td></tr>`;

							//Add to total entries
							totalEntries++;

							//Total it up
							return set + entryValue;
						}, undefined)
						.value();
					table += `<tr><td colspan="2"><strong>Total</strong></td><td><strong>${totalledValue}</strong></td></tr>`;
					table += '</table>';

					//////////////////////////////////////

					tooltip += `<strong>${totalledValue} ${options.metricName || 'total'}</strong><br/>`;
					tooltip += `${totalEntries} events<br/>`;

					//////////////////////////////////////

					tooltip += table;
					tooltip += '</div>';

					//////////////////////////////////////

					if (totalledValue == undefined) {
						if (!options.includeNull) {
							return;
						}
						totalledValue = null;
					}

					return [group.date, totalledValue, tooltip, group];
				})
				.compact()
				.orderBy(function (value) {
					return value[0];
				})
				.value();

			// if (values.length < 2) {
			//     return;
			// }
			// console.log('VALUES', _.first(values));

			///////////////////////////////////////////

			var firstValue = (_.first(values) || [])[1];
			var lastValue = (_.last(values) || [])[1];
			var lastDate = (_.last(values) || [])[0];
			var firstDate = (_.first(values) || [])[0];

			///////////////////////////////////////////

			var mean = Math.round(
				_.chain(values)
					.compact()
					.meanBy(function (array) {
						return array[1];
					})
					.value()
			);

			///////////////////////////////////////////

			var max = _.max(
				_.map(values, function (array) {
					return array[1];
				})
			);

			var min = _.min(
				_.map(values, function (array) {
					return array[1];
				})
			);

			if (!values.length) {
				firstValue = 0;
				lastValue = 0;
				mean = 0;
				max = 0;
				min = 0;
			}

			///////////////////////////////////////////

			var changeOverPeriod = Math.round(((lastValue - firstValue) / firstValue) * 100);
			var changeOverAverage = Math.round(((lastValue - mean) / mean) * 100);

			///////////////////////////////////////////

			// console.log('GETTTT', title, values);

			var name = self.selectorName(title);
			var mapped = {
				title: title,
				id: name,
				key,
				name, //Need to ensure no series names start with a number
				color: color,
				options: options,
				data: values,
				type: options.type,
				start: firstValue,
				end: lastValue,
				mean: mean,
				max: max,
				min: min,
				hidden: false,
				solo: false,
				changedPeriod: changeOverPeriod,
				changedAverage: changeOverAverage,
				date: lastDate,
				firstDate: firstDate,
			};
			// console.log('MAP SERIES', title, mapped);

			return mapped;
		},

		filterDateRange(entry) {
			var self = this;

			var now = new Date(entry.date).getTime();
			var cropStart = new Date(self.datePeriod.start).getTime();
			var cropEnd = new Date(self.datePeriod.end).getTime();

			// console.log('FILTER DATE RANGE', cropStart, cropEnd);

			return now >= cropStart && now <= cropEnd;
		},
		seriesIsActive(series) {
			return !series.hidden;
		},
		// watchString() {
		//     var self = this;

		//     console.log('RECOMPUTE WATCH STRING')
		//     return `${self.datePeriod.start}-${self.datePeriod.end}-${self.dateGroupFormat.value}`
		// }
	},
	watch: {
		chartType() {
			return this.recalculateAndMapSeries();
		},
		data() {
			return this.recalculateAndMapSeries();
		},
		datePeriod: {
			handler: function (v) {
				return this.recalculateAndMapSeries();
			},
			deep: true,
		},
		// 'dateGroupFormat': function(v) {
		//     console.log('CHANGING NOW?',v)
		//     return this.recalculateAndMapSeries();
		// },
		// watchString(v) {
		//     console.log('String changed', v)
		//     return this.recalculateAndMapSeries();
		// },
	},
	created() {
		// this.recalculateAndMapSeries();

		var self = this;

		//Set as thursday
		self.setFirstDayOfWeek(4);

		self.recalculateAndMapSeries = _.debounce(function () {
			var mapped = _.chain(self.data.series)
				.map(function (entry, index) {
					var color = entry.color || self.getColor(index);

					var mergedOptions = Object.assign(
						{},
						{
							type: self.chartType.value,
						},
						entry.options
					);

					// console.log('ENTRY', entry.title, mergedOptions.type)

					return self.mapSeries(entry.title, entry.key, color, mergedOptions); //entry.options);
				})
				.compact()
				.orderBy(function (series) {
					return series.mean;
				})
				.reverse()
				.value();

			// console.log('REMAP SERIES', mapped[])
			self.series = mapped;
		}, 200);
	},
	mounted() {
		this.recalculateAndMapSeries();
	},
};
</script>
<style scoped lang="scss">
.chart-widget {
	.chart-header {
		padding: 10px 15px;
		background: #f5f5f5;
		border-bottom: 1px solid rgba(#000, 0.1);
		// color: #eee;

		.chart-title {
			font-weight: 500;
			line-height: 36px;
			font-size: 1.2em;
			display: flex;
			align-items: center;
		}

		.v-btn {
			margin: 10px;

			& >>> .v-btn__content {
				padding: 10px 0;
				height: 36px;
			}
		}
	}

	.chart-wrapper-outer {
		background: #eee;
		// display: flex;
		position: relative;
		border-bottom: 1px solid #ddd;

		.chart-wrapper-empty {
			display: none;
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			flex: 1;
			text-align: center;
			color: rgba(#000, 0.5);
			justify-content: center;
			align-items: center;
		}

		.chart-wrapper-inner {
			background: #fff;
		}

		&.empty {
			.chart-wrapper-empty {
				display: flex;
			}

			.chart-wrapper-inner {
				opacity: 0;
			}
		}
	}

	& >>> {
		tr.inactive td {
			background: #efefef;
			color: #999;
			font-style: italic;
			text-decoration: line-through;
			font-size: 0.8em;
			padding-top: 0px;
			padding-bottom: 0px;
		}
	}

	& >>> .v-toolbar {
		height: auto !important;

		.v-toolbar__content {
			height: auto !important;
			padding: 5px 15px;
		}
	}

	& >>> .chart-tooltip {
		// background: #ff0055;
		padding: 15px;
	}
}
</style>
