<template>
    <div>
<!--         Model:
        <pre>{{model}}</pre> -->
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
    components: {

    },
    methods: {

    },
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