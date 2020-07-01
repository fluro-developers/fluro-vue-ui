<template>
    <div>
        <div v-for="series in chartData" :id="series.key" v-bind:key="series.key">
            <!-- Series:<pre>{{series}}</pre> -->
            <!-- <h3>{{model.title}}</h3> -->
            <apexchart :height="height" :width="width" :type="series.type" :options="series.options" :series="series.data"></apexchart>
        </div>
    </div>
</template>
<script>
import _ from 'lodash';
import moment from 'moment';

import ReportingColorsMixin from './mixins/ReportingColorsMixin.js';
import ReportingComputationalMixin from './mixins/ReportingComputationalMixin.js';
var defaultChartType = 'area'

export default {
    mixins: [ReportingColorsMixin, ReportingComputationalMixin],

    computed: {
        chartData() {
            var self = this
            var chartOpt = self.options
            var randomGroup = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)

            // if (!_.get(chartOpt, "chart.width")) {
            //     _.set(chartOpt, "chart.width", 500)
            // }
            if (!_.get(chartOpt, "chart.height")) {
                _.set(chartOpt, "chart.height", 180)
            }
            console.log("chartType", self.chartType)
            if (!_.get(chartOpt, "chart.type")) {
                _.set(chartOpt, "chart.type", defaultChartType)
            }
            if (!_.get(chartOpt, "chart.dropShadow")) {
                _.set(chartOpt, "chart.dropShadow", {
                    enabled: true,
                    color: '#000',
                    top: 18,
                    left: 7,
                    blur: 10,
                    opacity: 0.2
                })
            }
            if (!_.get(chartOpt, 'colors')) {
                _.set(chartOpt, "colors", self.theme.colors)
            }
            if (!_.get(chartOpt, "zoom")) {
                _.set(chartOpt, "zoom", {
                    type: 'x',
                    enabled: true,
                    autoScaleYaxis: true
                })
                _.set(chartOpt, "chart.toolbar", {
                    show: true,
                    offsetX: 0,
                    offsetY: 0,
                    tools: {
                        download: true,
                        selection: true,
                        zoom: true,
                        zoomin: true,
                        zoomout: true,
                        pan: true,
                        reset: true | '<img src="/static/icons/reset.png" width="20">',
                        customIcons: []
                    },
                    autoSelected: 'zoom'
                })

            }
            if (!_.get(chartOpt, "dataLabels")) {
                _.set(chartOpt, "dataLabels", {
                    enabled: false,
                })
            }
            if (!_.get(chartOpt, "stroke")) {
                _.set(chartOpt, "stroke", {
                    curve: 'smooth'
                })
            }
            if (!_.get(chartOpt, "markers")) {
                _.set(chartOpt, "markers", {
                    size: 0
                })
            }
            if (!_.get(chartOpt, "grid")) {
                _.set(chartOpt, "labels", {
                    borderColor: '#e7e7e7',
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                })
            }

            if (!_.get(chartOpt, "legend")) {
                _.set(chartOpt, "legend", {
                    show: false
                })

            }
            _.set(chartOpt, 'xaxis', {
                categories: _.get(self.model, 'axis.data'),
                title: {
                    text: _.get(self.model, 'axis.title'),
                }
            })

            if (self.model.axis.key.toLowerCase().includes('date')) {
                _.set(chartOpt, 'xaxis.type', 'datetime')
            }
            if (!_.get(chartOpt, "stroke")) {
                _.set(chartOpt, "stroke", {
                    curve: 'smooth',
                })

            }
            if (!_.get(chartOpt, 'title')) {
                _.set(chartOpt, 'title', {
                    text: ' ',
                    align: 'left'
                }, )
            }
            if (self.chartType == 'area') {
                if (!_.get(chartOpt, "fill")) {
                    _.set(chartOpt, "fill", {
                        type: 'gradient',
                        gradient: {
                            shadeIntensity: 1,
                            inverseColors: false,
                            opacityFrom: 0.5,
                            opacityTo: 0,
                            stops: [0, 90, 100]
                        },
                    })
                }
            }

            if (!_.get(chartOpt, 'annotations')) {
                if (self.model.axis.key.toLowerCase().includes('date')) {
                    var years = _.reduce(self.model.axis.data, function(result, value, key) {
                        result[moment(value).year()] = moment(value).year()
                        return result
                    }, {})
                    var defaultAnnotations = _.chain(years).map(function(year) {
                        return [{
                            x: new Date(`25 Dec ${year}`).getTime(),
                            borderColor: '#775DD0',
                            label: {
                                style: {
                                    color: '#fff',
                                    background: '#775DD0',
                                },
                                text: 'Christmas Day',
                            }
                        }, {
                            x: new Date(self.easterComputus(year)).getTime(),
                            borderColor: '#775DD0',
                            label: {
                                style: {
                                    color: '#fff',
                                    background: '#775DD0',
                                },
                                text: 'Easter Sunday',
                            }
                        }]
                    })
                    .flatten()
                    .value()
                    _.set(chartOpt, 'annotations', {xaxis: defaultAnnotations})
                }
            }
            if (self.annotations) {
                _.set(chartOpt, 'annotations', self.annotations)
            }

            _.set(chartOpt, "chart.events", {
                zoomed(chartContext, event) {
                        //console.log("context", chartContext, "options", options)
                    self.$emit("chartEvent", { key: 'zoom', event })
                },
                click(event, chartContext, config) {
                    self.$emit("chartEvent", { key: 'click', event, config })  
                },
                markerClick(event, chartContext, { seriesIndex, dataPointIndex, config}) {
                    self.$emit("chartEvent", { key: 'markerClick', event, seriesIndex, dataPointIndex, config })  
                },
                dataPointSelection(event, chartContext, config) {
                    console.log("datapointSelection", event, config)
                    self.$emit("chartEvent", { key: 'dataPointSelection', event, config })    
                },
                legendClick(chartContext, seriesIndex, config) {
                    console.log("datapointSelection", event, config)
                    self.$emit("chartEvent", { key: 'dataPointSelection', event, seriesIndex })    
                },
                scrolled(chartContext, {xaxis}) {
                    self.$emit("chartEvent", { key: 'chartContext', xaxis })    
                },
                beforeZoom(chartContext, {xaxis}) {
                    self.$emit("chartEvent", { key: 'beforeZoom', xaxis })    
                },
                dataPointMouseLeave(event, chartContext, config) {
                    self.$emit("chartEvent", { key: 'dataPointMouseLeave', event, config })    
                },
                dataPointMouseEnter(event, chartContext, config) {
                    self.$emit("chartEvent", { key: 'dataPointMouseEnter', event, config })    
                },
                selection(chartContext, {xaxis, yaxis}) {
                    self.$emit("chartEvent", { key: 'selection', xaxis, yaxis })    
                },
                mouseMove(event, chartContext, config) {
                    self.$emit("chartEvent", { key: 'mouseMove',event, config })    
                }, 
                updated(chartContext, config) {
                    self.$emit("chartEvent", { key: 'updated', config })     
                },
                mounted(chartContext, config) {
                    self.$emit("chartEvent", { key: 'mounted', config })     
                },
                beforeMounted(chartContext, config) {
                    self.$emit("chartEvent", { key: 'beforeMounted', config })     
                }
            })
            var count = 0

            // _.set(chartOpt, "stacked", true)
            //console.log("Chart Options", chartOpt)
            //console.log("Model", self.model)


            var series = self.model.series

            var returnData = []


            _.each(self.model.series, function(ser) {

                var individualChartOpt = _.cloneDeep(chartOpt)
                var returnYAxis = {
                    axisTicks: {
                        show: true,
                    },
                    axisBorder: {
                        show: true,
                        color: self.getColor(count),
                    },
                    labels: {
                        style: {
                            color: self.getColor(count),
                        }
                    },
                    title: {
                        text: ser.name,
                        style: {
                            color: self.getColor(count),
                        }
                    },
                    tooltip: {
                        enabled: true
                    },
                    show: true,
                }

                count = count + 1

                var min = _.min(ser.data)
                if (min > 0) {
                    min = Math.round(min * 0.97)
                }
                var max = _.max(ser.data)
                _.set(returnYAxis, 'min', min)
                _.set(returnYAxis, 'max', Math.round(max * 1.03) || 0)
                _.set(individualChartOpt, 'yaxis', returnYAxis)
                _.set(individualChartOpt, 'id', ser.key)
                _.set(individualChartOpt, 'group', randomGroup)

                returnData.push({ data: series, options: individualChartOpt, type: _.get(chartOpt, "chart.type") })
            })

            if (_.get(self, "options._AOT")) {
                
                _.each(returnData, function(dataset) {
                    var runningAverageSeries = self.calculateRunningAverages(dataset.series)
                    dataset.series.push(runningAverageSeries)
                    var yAxis = _.get(dataset, "options.yaxis")
                    count = count + 1
                    var newYAxis = {
                        axisTicks: {
                            show: true,
                        },
                        axisBorder: {
                            show: true,
                            color: self.getColor(count),
                        },
                        labels: {
                            style: {
                                color: self.getColor(count),
                            }
                        },
                        title: {
                            text: runningAverageSeries.name,
                            style: {
                                color: self.getColor(count),
                            }
                        },
                        tooltip: {
                            enabled: true
                        },
                        show: true,
                        opposite: true
                    }
                    
                    if(!_.get(dataset, 'options.stroke.dashArray')) {
                        _.set(dataset, 'options.stroke.dashArray', [0])
                    } 
                    dataset.options.stroke.dashArray.push(5)
                    
                    _.set(dataset, "options.yaxis", [yAxis, newYAxis])
                    
                })
            }

            console.log("Processed Data", returnData)
            return returnData

        },

    },
    props: {
        value: {
            type: Object,
            required: true
        },
        options: {
            type: Object,
            default: function() {
                return {}
            }
        },
        chartType: {
            type: String,
            default: 'line'
        },
        height: {
            type: Number,
            default: 350,

        },
        width: {
            type: Number,
        },

    },
    watch: {
    	value(v) {
    		this.model = v
    	}
    },
    components: {

    },
    methods: {

    },
    data() {
        return {
        	model: this.value
        }
    },
    asyncComputed: {}
}
</script>
<style lang="scss">
</style>