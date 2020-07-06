<template>
    <div>
        <!--   Model:
-->
        <!-- <h3>{{model.title}}</h3> -->
        <!-- <pre>CHART DATA: {{chartOptions}}</pre> -->
        <div v-if="chartOptions">
            <div id="mainChart">
                <apexchart :type="actualChartType" :height="height" :width="width" :options="chartOptions" :series="chartData"></apexchart>
            </div>
            <div v-if="isBrushed" id="brushedChartKey">
                <apexchart :type="chartType" :width="width" :height="brushedChartOptions.chart.height" :options="brushedChartOptions" :series="brushedChartData"></apexchart>
            </div>
        </div>
        <!-- <pre>LINE CHART MODEL: {{chartData}}</pre> -->
        <!-- <pre>LINE CHART OPTIONS: {{chartOptions}}</pre> -->
    </div>
</template>
<script>
import _ from 'lodash';
import moment from 'moment';
import ReportingColorsMixin from './mixins/ReportingColorsMixin.js';
import ReportingComputationalMixin from './mixins/ReportingComputationalMixin.js';
export default {
    mixins: [ReportingColorsMixin, ReportingComputationalMixin],
    computed: {
        actualChartType() {
            var chartType = this.chartType
            if (this.options._AOT && this.chartType != 'area') {
                chartType = 'line';
            }
            //console.log("ChartType", chartType )
            return chartType;
        },
        mainChartId() {
            //console.log("TestGUID", this.$fluro.utils.guid())
            return this.$fluro.utils.guid()
        },
        brushedChartId() {
            return this.$fluro.utils.guid()
        },
        chartData() {
            var self = this
            //console.log("FLUROLINECHART model", self.model)
            var returnData = _.concat([], self.model.series)
            if (!_.get(_.first(self.model.series), 'data.length')) {
                return
            }
            //console.log("options in FLC", _.get(self, "options"))
            if (_.get(self, "options._AOT")) {
                if (!(self.chartType == 'line' || self.chartType == 'area')) {
                    _.each(returnData, function(series) {
                        series.type = 'column'; //self.chartType;//'column'; //self.chartType; //self.chartType || self.originalChartType;
                    })
                }
                var aotseries = self.calculateRunningAverages(returnData)
                if (self.chartType == 'area') {
                    aotseries = _.map(aotseries, function(ser) {
                        delete ser.type
                        return ser
                    })
                }
                returnData = _.concat(returnData, aotseries)
            }
            //console.log("FLUROLINECHART ChartData", returnData)
            return returnData
        },
        brushedChartOptions() {
            var self = this
            var brushedOptions = _.cloneDeep(self.chartOptions)
            _.set(brushedOptions, "chart.height", 130)
            delete brushedOptions.chart.toolbar
            _.set(brushedOptions, 'chart.id', self.brushedChartId)
            _.set(brushedOptions, "chart.brush", {
                target: self.mainChartId,
                enabled: true
            })
            var entriesLength = self.model.axis.data.length
            _.set(brushedOptions, "chart.selection", {
                enabled: true,
                xaxis: {
                    min: new Date(self.model.axis.data[Math.round(entriesLength * 0.6)]).getTime(),
                    max: new Date(_.last(self.model.axis.data)).getTime()
                }
            })
            // console.log("Chart Selection", _.get(brushedOptions, "chart.selection"))
            _.set(brushedOptions, 'colors', ['#008FFB'])
            delete brushedOptions.brushed
            delete brushedOptions.toolbar
            // console.log("Brushed Options", brushedOptions)
            var yaxis = _.first(brushedOptions.yaxis)
            _.set(brushedOptions, 'yaxis', [yaxis])
            brushedOptions.legend = {
                show: false
            }
            return brushedOptions
        },
        brushedChartData() {
            var self = this
            var returnData = [_.first(self.model.series)]
            // console.log("BrushedData", returnData)
            return returnData
        },
        isBrushed() {
            var self = this
            return _.get(self, "options.brushed")
        },
    },
    asyncComputed: {
        chartOptions() {
            var self = this
            return new Promise(function(resolve, reject) {
                var chartOpt = _.cloneDeep(self.options)
                // if (!_.get(chartOpt, "chart.width")) {
                //  _.set(chartOpt, "chart.width", 380)
                // }
                if (!_.get(chartOpt, "chart.height")) {
                    _.set(chartOpt, "chart.height", 380)
                }
                //console.log("chartType", self.chartType)
                // if (!_.get(chartOpt, "chart.type")) {
                _.set(chartOpt, "chart.type", self.actualChartType)
                // }
                if (self.chartType == 'area' && !_.get(chartOpt, "chart.dropShadow")) {
                    // _.set(chartOpt, "chart.dropShadow", {
                    //     enabled: true,
                    //     color: '#000',
                    //     top: 18,
                    //     left: 7,
                    //     blur: 10,
                    //     opacity: 0.2
                    // })
                }
                if ((chartOpt.chart.type == 'bar' || chartOpt.chart.type == 'column') && !chartOpt.plotOptions) {
                    var columnOptions = {
                        horizontal: false,
                        columnWidth: '55%',
                        endingShape: 'rounded',
                        dataLabels: {
                            position: 'bottom',
                            maxItems: 100,
                            hideOverflowingLabels: true,
                            orientation: 'horizontal',
                        }
                    }
                    chartOpt.plotOptions = {
                        bar: columnOptions,
                        //  column: columnOptions,
                    }
                }
                _.set(chartOpt, 'chart.id', self.mainChartId)
                //console.log("Main chart id", _.get(chartOpt, 'chart.id'))
                if (!_.get(chartOpt, 'colors')) {
                    _.set(chartOpt, "colors", self.theme.colors)
                }
                if (!_.get(chartOpt, "dataLabels")) {
                    _.set(chartOpt, "dataLabels", {
                        enabled: false,
                    })
                }
                if (!_.get(chartOpt, "markers")) {
                    _.set(chartOpt, "markers", {
                        size: 0
                    })
                }
                if (!_.get(chartOpt, "labels")) {
                    _.set(chartOpt, "labels", {
                        //borderColor: '#e7e7e7',
                        row: {
                            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                            opacity: 0.5
                        },
                    })
                }
                if (_.get(chartOpt, "brushed")) {
                    delete chartOpt.brushed
                }
                if (!_.get(chartOpt, "legend")) {
                    _.set(chartOpt, "legend", {
                        show: true
                    })
                }
                _.set(chartOpt, 'xaxis', {
                    categories: _.get(self.model, 'axis.data'),
                    title: {
                        text: _.get(self.model, 'axis.title'),
                    }
                })
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
                if (self.isBrushed) {
                    delete chartOpt.zoom
                    // delete chartOpt.chart.toolbar
                    _.set(chartOpt, "chart.toolbar", {
                        autoSelected: 'pan',
                        show: false
                    })
                }
                if (self.model.axis.key.toLowerCase().includes('date')) {
                    _.set(chartOpt, 'xaxis.type', 'datetime')
                }
                if (!_.get(chartOpt, "stroke")) {
                    _.set(chartOpt, "stroke", {
                        width:3,
                        curve: 'smooth',
                    })
                }
                // if (!_.get(chartOpt, 'title')) {
                //  _.set(chartOpt, 'title', {
                //   text: ' ',
                //   align: 'left'
                //  }, )
                // }
                if (self.chartType == 'area') {
                    // if (!_.get(chartOpt, "fill")) {
                    //     _.set(chartOpt, "fill", {
                    //         type: 'gradient',
                    //         gradient: {
                    //             shadeIntensity: 1,
                    //             inverseColors: false,
                    //             opacityFrom: 0.5,
                    //             opacityTo: 0,
                    //             stops: [0, 90, 100]
                    //         },
                    //     })
                    // }
                }
                _.set(chartOpt, "chart.events", {
                    zoomed(chartContext, event) {
                        //console.log("context", chartContext, "options", options)
                        self.$emit("chartEvent", { key: 'zoom', event })
                    },
                    click(event, chartContext, config) {
                        self.$emit("chartEvent", { key: 'click', event, config })
                    },
                    markerClick(event, chartContext, { seriesIndex, dataPointIndex, config }) {
                        self.$emit("chartEvent", { key: 'markerClick', event, seriesIndex, dataPointIndex, config })
                    },
                    dataPointSelection(event, chartContext, config) {
                        //console.log("datapointSelection", event, config)
                        self.$emit("chartEvent", { key: 'dataPointSelection', event, config })
                    },
                    legendClick(chartContext, seriesIndex, config) {
                        //console.log("datapointSelection", event, config)
                        self.$emit("chartEvent", { key: 'dataPointSelection', event, seriesIndex })
                    },
                    scrolled(chartContext, { xaxis }) {
                        self.$emit("chartEvent", { key: 'chartContext', xaxis })
                    },
                    beforeZoom(chartContext, { xaxis }) {
                        self.$emit("chartEvent", { key: 'beforeZoom', xaxis })
                    },
                    dataPointMouseLeave(event, chartContext, config) {
                        self.$emit("chartEvent", { key: 'dataPointMouseLeave', event, config })
                    },
                    dataPointMouseEnter(event, chartContext, config) {
                        self.$emit("chartEvent", { key: 'dataPointMouseEnter', event, config })
                    },
                    selection(chartContext, { xaxis, yaxis }) {
                        self.$emit("chartEvent", { key: 'selection', xaxis, yaxis })
                    },
                    mouseMove(event, chartContext, config) {
                        self.$emit("chartEvent", { key: 'mouseMove', event, config })
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

                function createYAxisOptions(ser, count) {
                    var returnYAxis = {
                        axisTicks: {
                            show: true,
                        },
                        axisBorder: {
                            show: true,
                            color: ser.color || self.getColor(count),
                        },
                        labels: {
                            style: {
                                color: ser.color || self.getColor(count),
                            }
                        },
                        title: {
                            text: ser.name,
                            style: {
                                color: ser.color || self.getColor(count),
                            }
                        },
                        tooltip: {
                            enabled: true,
                            shared: true,
                        },
                        show: true,
                    }

                    if (ser.key.includes("_AOT")) {
                        // returnYAxis.stroke = {
                        //     dashArray:5,
                        // }
                        _.set(chartOpt, `stroke.dashArray[${count}]`, 2)
                        // _.set(chartOpt, `chart.type`, 'line')
                    }
                    if (count > 0) {
                        _.set(returnYAxis, 'opposite', true)
                    }
                    // if (_.get(ser, 'color')) {
                    //  var color = _.set(returnYAxis, 'axisBorder.color', _.get(ser, 'color'))
                    //  _.set(returnYAxis, 'axisBorder.color', color)
                    //  _.set(returnYAxis, 'labels.style.color', color)
                    //  _.set(returnYAxis, 'title.style.color', color)
                    // }
                    var min = _.min(ser.data) || 0;
                    if (min > 0) {
                        min = Math.round(min * 0.97)
                    }
                    var max = _.max(ser.data) || 0;
                    max = Math.round(max * 1.03) || 0;
                    _.set(returnYAxis, 'min', min)
                    _.set(returnYAxis, 'max', max);
                    // console.log('YAXIS RETURN', returnYAxis, ser);
                    return (returnYAxis)
                }
                ////////////////////////////////////////
                var yaxis = _.get(chartOpt, "yaxis")
                //console.log('YAXIS', yaxis)
                ////////////////////////////////////////
                if (!yaxis) {
                    //console.log("FLUROLINECHART no yaxis", yaxis)
                    chartOpt.yaxis = yaxis = []
                    var count = 0
                    _.set(chartOpt, 'stroke.dashArray', new Array(self.chartData.length).fill(0))
                    _.each(self.chartData, function(ser) {
                        yaxis.push(createYAxisOptions(ser, count))
                        count = count + 1
                        //console.log("count", count)
                    })
                    // _.set(chartOpt, "yaxis", yaxis)
                }
                // need to check yAxis is an array and that the length matches the number of series.
                if (!Array.isArray(yaxis)) {
                    // console.log("some yaxis", yaxis)
                    chartOpt.yaxis = yaxis = [yaxis]
                    for (var i = 1; i < self.chartData.length; i++) {
                        yaxis.push(createYAxisOptions(self.chartData[i], i))
                    }
                }
                // _.set(chartOpt, "yaxis", yaxis)
                ////////////////////////////////////////
                if (self.annotations) {
                    _.set(chartOpt, 'annotations', self.annotations)
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
                        }).flatten().value()
                        _.set(chartOpt, 'annotations', { xaxis: defaultAnnotations })
                    }
                }
                // yaxis: {
                //   title: {
                //  text: 'Temperature'
                //   },
                //   min: 5,
                //   max: 40
                // },
                //console.log('YAXIS AFTER', yaxis)
                // console.log("FLUROLINECHART Chart Options", chartOpt)
                //console.log("FLUROLINECHART Model", self.model)
                resolve(chartOpt);
            })
        },
        created: function() {
            //nsole.log("Computed Series", this.chartData)
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
        annotations: {
            type: Array,
        },
        id: {
            type: String,
            default: function() {
                var self = this
                return _.get(self.options, 'id') || Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
            }
        }
    },
    components: {},
    methods: {},
    data() {
        return {
            model: this.value
        }
    },
    watch: {
        value(v) {
            this.model = v
        }
    },
}

</script>
<style lang="scss">
</style>
