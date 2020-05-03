<template>
    <div>
        <apexchart type=pie width="380" :options="chartOptions" :series="series" />
        <pre>{{data}}</pre>
    </div>
    <!-- <div class="statbox">
        <div class="value">{{end}}<sup v-if="average">({{average}} avg)</sup></div>
        <label>
            <fluro-icon icon="circle" :style="style" />&nbsp;{{label}}</label>
        <div class="subtitle">
            <strong :class="className">
                <fluro-icon :icon="icon" /> {{swing}}</strong>
            &nbsp;
            <span class="muted">({{start}} to {{end}})</span>
        </div>
        <div class="subtitle">
            <strong :class="className">
                <fluro-icon :icon="icon" /> {{swingAverage}}</strong>
            &nbsp;
            <span class="muted">({{average}} to {{end}})</span>
        </div>
    </div> -->
</template>
<script>

	import _ from 'lodash';

export default {
    props: {
        //     'label': {
        //         type: String,
        //     },
        //     'color': {
        //         type: String,
        //     },
        //     'start': {
        //         default: 0,
        //         type: Number,
        //     },
        //     'end': {
        //         default: 0,
        //         type: Number,
        //     },
        'data': {
            default () {
                return {
                    series: [],
                    values: [],
                }
            },
            type: Object,
        },
    },
    data() {
        return {


        }
    },
    computed: {
        chartOptions() {
            return {
                labels: this.labels,
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }]
            }
        },
        labels() {
            return _.map(this.data.series, 'title');
        },
        series() {
            return this.data.values;
        }
    }
}
</script>
<style scoped lang="scss">
</style>