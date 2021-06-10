<template>
    <div>
        <template v-if="loading">
            Loading Component
            <v-progress-circular indeterminate></v-progress-circular>
        </template>
        <template v-else>
            <slot name="title">
                <h3>{{ title }}</h3>
            </slot>
			<!-- <pre>{{chartData}}</pre> -->
            <slot name="graph">
                <div v-if="dataSource">
                    <div v-if="normalisedChartType == 'pie'">
                        <fluro-pie-chart @chartEvent="chartEvent" v-model="chartData" :annotations="annotations" :options="compiledOptions" :chartType="cleansedChartType" :height="height" :width="width" />
                    </div>
                    <div v-else-if="normalisedChartType == 'line'">
                        <fluro-line-chart @chartEvent="chartEvent" v-model="chartData" :annotations="annotations" :options="compiledOptions" :chartType="cleansedChartType" :height="height" :width="width" />
                    </div>
                    <div v-else-if="normalisedChartType == 'synced'">
                        <fluro-synced-chart @chartEvent="chartEvent" v-model="chartData" :annotations="annotations" :options="compiledOptions" :chartType="cleansedChartType" :height="height" :width="width" />
                    </div>
                </div>
            </slot>
            <slot name="footer"></slot>
        </template>
    </div>
</template>
<script>
import _ from "lodash";
import { moment } from "fluro";
import FluroPieChart from "./FluroPieChart.vue";
import FluroLineChart from "./FluroLineChart.vue";
import FluroSyncedChart from "./FluroSyncedChart.vue";
import ReportingColorsMixin from "./mixins/ReportingColorsMixin.js";
import ReportingComputationalMixin from "./mixins/ReportingComputationalMixin.js";

export default {
    mixins: [ReportingColorsMixin, ReportingComputationalMixin],
    computed: {
        compiledOptions: function() {
            var self = this;
            var options = self.options || {};
            if (!_.get(options, "colors")) {
                options.colors = self.colors;
            }

            _.each(self.series, function(ser) {
                //console.log("FC Processing series", ser)
                if (ser.AOT) {
                    options._AOT = true;
                }
            });
            //console.log("FC compiledOptions", options)
            return options;
        },
        cleansedChartType: function() {
            var self = this;
            var type = self.chartType;
            if (type == "column") {
                type = "bar";
            }
            return type;
        },
        normalisedChartType: function() {
            var self = this;
            var type = self.chartType;
            switch (type) {
                case "bar":
                case "line":
                case "column":
                case "area":
                    type = "line";
                    break;
                case "pie":
                case "donut":
                case "radialBar":
                    type = "pie";
                    break;
                default:
                    break;
            }
            return type;
        },
        model: function() {
            var self = this;
            if (self.value) {
                return self.value;
            }

            if (self.items && self.items.length) {
				console.log("Going for Items", self.prepareItems)
                return self.prepareItems;
            }

            return ;
        },
        groupChartData: function() {
            var self = this;
            var dataSource = self.dataSource;
            // console.log("Datasource", dataSource)
            // console.log("Series", self.series)

            if (!self.groupBy) {
                return dataSource;
            }

            function groupData(groupFormat, datasource) {
                var returnDatasource = {};

                _.each(dataSource.axis, function(entryDate, key) {
                    // console.log("in the each", groupFormat, entryDate, key)
                    var groupingKey = self.getGroupDate(entryDate, groupFormat);
                    var currentGroupedEntry = _.get(returnDatasource, groupingKey);
                    if (!currentGroupedEntry) {
                        currentGroupedEntry = {};
                    }

                    _.each(self.series, function(ser) {
                        var currentTotal = _.get(currentGroupedEntry, ser.key) || 0;
                        _.set(
                            currentGroupedEntry,
                            ser.key,
                            currentTotal + _.get(datasource, `series.${ser.key}`)[key]
                        );
                    });
                    _.set(returnDatasource, groupingKey, currentGroupedEntry);
                });

                return returnDatasource;
            }

            var groupedData = groupData(self.groupBy, dataSource);
            //console.log("groupedData", groupedData)

            var returnData = {
                axis: [],
                series: {},
            };

            _.each(self.series, function(ser) {
                _.set(returnData, `series.${ser.key}`, []);
            });

            _.each(groupedData, function(entry, key) {
                // console.log("groupedData Entry", entry, key)
                returnData.axis.push(moment.utc(key).format());
                _.each(self.series, function(ser) {
                    var series = _.get(returnData, `series.${ser.key}`);
                    series.push(_.get(entry, ser.key));
                });
            });

            // console.log("returnData", returnData)
            return returnData;
        },
        chartData: function() {
            var self = this;
            //console.log("FLUROCHART chartType", self.chartType, self.normalisedChartType)
            var chrtdata;
            var colorCount = 0;
            _.each(self.series, function(ser) {
                if (_.get(ser, "color")) {
                    self.colors[colorCount] = _.get(ser, "color");
                }
                colorCount = colorCount + 1;
            });
            switch (self.normalisedChartType) {
                case "pie":
                    chrtdata = _.first(
                        _.map(self.series, function(ser) {
                            //console.log("Ser incoming", ser, self.dataSource)
                            return {
                                series: {
                                    name: _.get(ser, "title"),
                                    data: _.get(self.dataSource, `series["${ser.key}"].data`),
                                },
                                labels: _.get(self.dataSource, `series["${ser.key}"].labels`),
                            };
                        })
                    );
                    break;
                case "line":
                case "synced":
                default:
                    //console.log("FLUROCHART data Source", self.dataSource)
                    var series = _.map(self.series, function(ser) {
                        return {
                            name: _.get(ser, "title"),
                            data: _.get(self.groupChartData, `series.${ser.key}`),
                            key: ser.key,
                            color: ser.color,
                            AOT: ser.AOT,
                            type: _.get(ser, "type"),
                        };
                    });
                    chrtdata = {
                        series,
                        axis: {
                            title: _.get(self.axis, "title"),
                            key: _.get(self.axis, "key"),
                            data: _.get(self.groupChartData, "axis"),
                        },
                    };
                    break;
            }
            // console.log("FLUROCHART ChartData", chrtdata)
            return chrtdata;
        },
        prepareItems: function() {
            var self = this;

			var dataset = self.items;
			console.log("Got dataset", dataset)
			switch (self.chartType) {
				case "bar":
				case "line":
				case "synced":
				case "column":
				case "area":
					console.log("In Area")
					if (!_.get(_.first(dataset), self.axis)) {
						console.log(dataset);
						return ;
					}

					//console.log("SERIES", series, "AXIS", axis)
					var mappedData = _.map(dataset, function(entry) {
						//console.log(entry)
						var returnEntry = {};
						var axisvalue = _.get(entry, self.axis);
						//console.log("Axis", axis, "Value", axisvalue)
						_.set(returnEntry, "axis", axisvalue);
						_.each(series, function(ser) {
							// force a 0 rather than a null.
							_.set(returnEntry, ser, _.get(entry, ser) || 0);
						});
						return returnEntry;
					});


					var returnData = {
						axis: [],
						series: {},
					};

					_.each(self.series, function(ser) {
						_.set(returnData, `series.${ser}`, []);
					});

					_.each(dataset, function(entry) {
						//console.log("HERE", entry)
						returnData.axis.push(entry.axis);
						_.each(series, function(ser) {
							var item = _.get(entry, ser);
							//console.log("Adding Item", ser, item)
							_.get(mappedData, `series.${ser}`).push(item);
						});
					});
					console.log("RETURNING Line", returnData)
					return returnData;

					break;
				case "donut":
				case "radialBar":
				case "pie":
					console.log("In Pie")
					var mappedData = {};

					// if we have an array - want to get the key pairs from all the objects in the array.
					if (dataset instanceof Array) {
						//console.log("Stage 1", dataset.length)
						_.each(self.series, function(ser) {
							//console.log("Counting Data:", _.get(dataset, ser))
							mappedData[ser] = _.countBy(dataset, ser);
						});
						return mappedData;
					}
					//console.log("last iteration", dataset)
					// Just return the Stat from the object
					_.each(series, function(ser) {
						mappedData[ser] = _.get(dataset, ser);
					});

					// change the nulls to 0

					var newData = { series: mappedData }

					//console.log("Pie formatData")
					var returnData = {
						series: {},
					};

					_.each(self.series, function(ser) {
						var labels = [];
						var data = [];
						_.each(_.get(newData, ser), function(value, key) {
							if (Number.isNaN(value) || value == null) {
								value = 0;
							}
							labels.push(key);
							data.push(value);
						});

						returnData.series[ser] = { labels, data };
					});
					console.log("RETURNING Pie", returnData)
					return returnData;
				
					
  			}
                
        },
    },
    props: {
        value: {
            type: Object,
        },
        groupBy: {
            type: String,
        },
        endpoint: {
            type: String,
        },
        chartType: {
            type: String,
            default: "line",
            required: true,
        },
        options: {
            type: Object,
            default: function() {
                return {};
            },
        },
        definition: {
            type: String,
        },
        datePeriod: {
            type: Object,
            default: function() {
                return {
                    start: moment().subtract(1, "year").toDate(),
                    end: moment().toDate(),
                };
            },
        },
        title: {
            type: String,
            default: "",
        },
        series: {
            type: Array,
            required: true,
        },
        axis: {
            type: Object,
        },
        height: {
            type: Number,
        },
        width: {
            type: Number,
        },
        annotations: {
            type: Array,
        },
        items: {
            type: Array,
        },
    },
    components: {
        FluroPieChart,
        FluroLineChart,
        FluroSyncedChart,
    },
    methods: {
        chartEvent(options) {
            var self = this;
            // console.log("FC Options", options)
            self.$emit("chart-event", options);
        },
        getGroupDate(date, format) {
            switch (format) {
                case "4week":
                    var weekStartDate = moment(date).toDate();
                    var weekMoment = moment(weekStartDate);
                    var weekNumber = weekMoment.format("W");
                    var year = weekMoment.format("YYYY");
                    var periodNumber = Math.ceil(weekNumber / 4) * 4;
                    var periodNumberCapped = Math.min(periodNumber, 52);

                    var period = moment(
                        `${periodNumberCapped} ${weekNumber > 52 ? year - 1 : year}`,
                        "W YYYY"
                    ).toDate();
                    return period;
                    break;
                case "6week":
                    var weekStartDate = moment(date).toDate();
                    var weekMoment = moment(weekStartDate);
                    var weekNumber = weekMoment.format("W");

                    var year = weekMoment.format("YYYY");
                    var periodNumber = Math.ceil(weekNumber / 6) * 6;
                    var periodNumberCapped = Math.min(periodNumber, 52);

                    var period = moment(
                        `${periodNumberCapped} ${weekNumber > 52 ? year - 1 : year}`,
                        "W YYYY"
                    ).toDate();

                    // console.log('MATCH', weekMoment.format('W YYYY'), weekNumber, year, periodNumberCapped, period)
                    return period;

                    break;
                case "year":
                case "week":
                default:
                    return moment(date).startOf(format).toDate();
                    break;
            }
        },
    },
    data() {
        return {
            loading: true,
            colors: [
                "#008FFB",
                "#00E396",
                "#FEB019",
                "#FF4560",
                "#775DD0",
                "#7adc12",
                "#f34be2",
                "#b76b1a",
                "#ff7800",
            ],
        };
    },
    watch: {
        // value(v) {
        //   this.model = v;
        // },
    },
    asyncComputed: {
        dataSource: {
            default: null,
            get() {
                var self = this;
                /////////////////////////////
                return new Promise(function(resolve, reject) {
                    if (self.model) {
                        console.log('FLUROCHART - We have a supplied datasource!', self.model);
                        resolve(self.model);
                        self.loading = false;
                        return;
                    }
                    var endpoint = self.endpoint;
                    var series = _.map(self.series, function(ser) {
                        return ser.key;
                    });
                    if (!endpoint) {
                        endpoint = `chart/data/${self.definition}/${self.chartType}`;
                    }
                    /////////////////////////////
                    //console.log("endpoint", endpoint)
                    //Get the start and end date for the data we want/need
                    var startDate = self.datePeriod.start;
                    var endDate = self.datePeriod.end;
                    //Load the data from the API

                    var postOptions = {
                        options: {
                            startDate: startDate,
                            endDate: endDate,
                        },
                        series,
                    };

                    if (self.axis.key) {
                        postOptions.axis = self.axis.key;
                    }

                    self.$fluro.api.post(endpoint, postOptions).then(
                        function(res) {
                            console.log("FLURO CHART DATA", res.data);
                            resolve(res.data);
                            self.loading = false;
                        },
                        function(err) {
                            reject(err);
                            self.loading = false;
                        }
                    );
                });
            },
        },
    },
};
</script>
<style lang="scss">
</style>