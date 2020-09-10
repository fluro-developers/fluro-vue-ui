<template>
    <div>
          <!-- Model: -->
  <!-- <pre>{{chartOptions}}</pre> -->
        <apexchart :type="chartType" :height="height" :width="width" :options="chartOptions" :series="model.series.data"></apexchart>
    </div>
</template>
<script>
import _ from 'lodash';
//import moment from 'moment';
export default {
    computed: {
        chartOptions() {
            var self = this
            var chartOpt = self.options
            if (!_.get(chartOpt, "chart.width")) {
                _.set(chartOpt, "chart.width", 380)
            }
            if (!_.get(chartOpt, "chart.type")) {
                _.set(chartOpt, "chart.type", 'pie')
            }
            if (!_.get(chartOpt, "labels")) {
                _.set(chartOpt, "labels", self.model.labels)
            }
            if (!_.get(chartOpt, "colors")) {
                _.set(chartOpt, "colors", self.model.colors)
            }
            if (!_.get(chartOpt, 'chart.toolbar')) {

                _.set(chartOpt, "chart.toolbar", {
                    show: true,
                    offsetX: 0,
                    offsetY: 0,
                    tools: {
                        download: true,
                    },
                })
            }

            if (!_.get(chartOpt, "responsive")) {
                _.set(chartOpt, "responsive", [{
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }])
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
                    console.log("datapointSelection", event, config)
                    self.$emit("chartEvent", { key: 'dataPointSelection', event, config })
                },
                legendClick(chartContext, seriesIndex, config) {
                    console.log("datapointSelection", event, config)
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
            if (self.annotations) {
                _.set(chartOpt, 'annotations', self.annotations)
            }
            //console.log("Chart Options", chartOpt)
            return chartOpt;
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
            default: 'pie'
        },
        height: {
            type: Number,
        },
        width: {
            type: Number,
            default: 350,
        },
        annotations: {
            type: Array,
        },
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
    asyncComputed: {}
}

</script>
<style lang="scss">
</style>
