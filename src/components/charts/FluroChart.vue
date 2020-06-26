<template>
    <div>
        <!-- Loading: {{loading}} -->
        <!--         series: {{series}}
        DataSource:
        <pre>{{dataSource}}</pre> -->
        <template v-if="loading">
            Loading Component
            <v-progress-circular indeterminate></v-progress-circular>
        </template>
        <template v-else>
            <slot name="title">
                <h3>{{title}}</h3>
            </slot>
            <slot name="graph">
                <div v-if="normalisedChartType=='pie'">
                    <!-- ChartData: -->
                    <!-- <pre>{{chartData}}</pre> -->
                    <fluro-pie-chart :model="chartData" :annotations="annotations" :options="options" :chartType="chartType" :height="height" :width="width" />
                </div>
                <div v-else-if="normalisedChartType=='line'">
                    <fluro-line-chart @zoom="zoomChange" :model="chartData" :annotations="annotations" :options="options" :chartType="chartType" :height="height" :width="width" />
                </div>
                <div v-else-if="normalisedChartType=='synced'" >
                    <fluro-synced-chart :model="chartData" :annotations="annotations" :options="options" :chartType="chartType" :height="height" :width="width" />
                </div>
            </slot>
            <slot name="footer"></slot>
        </template>
    </div>
</template>
<script>
import _ from 'lodash';
import moment from 'moment';
import FluroPieChart from './FluroPieChart.vue'
import FluroLineChart from './FluroLineChart.vue'
import FluroSyncedChart from './FluroSyncedChart.vue'
import ReportingColorsMixin from './mixins/ReportingColorsMixin.js';
import ReportingComputationalMixin from './mixins/ReportingComputationalMixin.js';

export default {
    mixins: [ReportingColorsMixin, ReportingComputationalMixin],
    computed: {
        normalisedChartType: function() {
            var self = this
            var type = self.chartType
            switch (type) {
                case 'bar':
                case 'line':
                case 'column':
                case 'area':
                    type = 'line';
                    break;
                case 'pie':
                case 'donut':
                case 'radialBar':
                    type = "pie"
                    break;
                default:

                    break;
            }
            return type

        },
        // renderChartData: function() {

        //     var series = _.map(self.series, function(ser) {
        //         return {
        //             name: _.get(ser, "title"),
        //             data: _.get(self.dataSource, `series.${ser.key}`),
        //         }
        //     })


        //     _.each(series, function(ser) {

        //     })

        // }
        chartData: function() {
            var self = this
            console.log("chartType", self.chartType, self.normalisedChartType)
            var chrtdata
            switch (self.normalisedChartType) {
                case "pie":
                    chrtdata = _.first(_.map(self.series, function(ser) {

                        return {
                            series: {
                                name: _.get(ser, "title"),
                                data: _.get(self.dataSource, `series["${ser.key}"].data`),
                            },
                            labels: _.get(self.dataSource, `series["${ser.key}"].labels`),

                        }
                    }))

                    break;
                case "line":
                case "synced":
                default:
                    //console.log("data Source", self.dataSource)

                    var series = _.map(self.series, function(ser) {
                        return {
                            name: _.get(ser, "title"),
                            data: _.get(self.dataSource, `series.${ser.key}`),
                            key: ser.key,
                        }
                    })
                    chrtdata = {
                        series,
                        axis: {
                            title: _.get(self.axis, "title"),
                            key: _.get(self.axis, "key"),
                            data: _.get(self.dataSource, 'axis'),
                        },

                    }

                    break;
            }

            //console.log("ChartData", chrtdata)
            return chrtdata
        }

    },
    props: {
        model: {
            type: Object,
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
                return {}
            },

        },
        definition: {
            type: String,

        },
        datePeriod: {
            type: Object,
            default: function() {
                return {
                    start: moment().subtract(1, 'year').toDate(),
                    end: moment().toDate(),
                }
            }
        },
        title: {
            type: String,
            default: '',
        },
        series: {
            type: Array,
            required: true
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
    },
    components: {
        FluroPieChart,
        FluroLineChart,
        FluroSyncedChart,
    },
    methods: {
        zoomChange(options) {
            var self = this

            self.$emit("zoom", options)
        }
    },
    data() {
        return {
            loading: true,

        }
    },
    asyncComputed: {
        dataSource: {
            default: {},
            get() {
                var self = this;

                /////////////////////////////

                if (self.model) {
                    self.loading = false;

                    console.log('We have a datasource!', self.model);
                    return Promise.resolve(self.model);
                } else {

                    var endpoint = self.endpoint;

                    var series = _.map(self.series, function(ser) {
                        return ser.key
                    })

                    if (!endpoint) {
                        endpoint = `chart/data/${self.definition}/${self.chartType}?series=${JSON.stringify(series)}`
                    }
                    if (self.axis) {
                        endpoint = endpoint + `&axis=${self.axis.key}`
                    }
                    /////////////////////////////
                    //console.log("endpoint", endpoint)
                    //Get the start and end date for the data we want/need
                    var startDate = self.datePeriod.start;
                    var endDate = self.datePeriod.end;

                    return new Promise(function(resolve, reject) {

                        //Load the data from the API
                        self.$fluro.api.get(endpoint, {
                                params: {
                                    startDate: startDate,
                                    endDate: endDate,
                                }
                            })
                            .then(function(res) {
                                resolve(res.data);
                                self.loading = false;
                            }, function(err) {
                                reject(err);
                                self.loading = false;
                            });
                    });
                }
            }
        },


    }
}
</script>
<style lang="scss">
</style>