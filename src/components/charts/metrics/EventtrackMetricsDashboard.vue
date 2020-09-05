<template>
     <flex-column>
        <fluro-page-preloader v-if="loading" contain />
        
        <template v-else>
            <fluro-panel v-if="eventData.model.series.attendance.length">
                <fluro-panel-title>
                    <strong>Attendance</strong>
                </fluro-panel-title>
                <fluro-panel-body>
                    <fluro-chart chartType="line" :options="eventData.options" v-model="eventData.model" :series="eventData.series" :axis="eventData.axis" v-on:chart-event="chartClicked"/>
                </fluro-panel-body>
            </fluro-panel>
            <event-age-gender-metrics :id="selectedEvent" v-if="selectedEvent"></event-age-gender-metrics>
        </template>
    </flex-column>
</template>
<script>
import { moment } from 'fluro';
import FluroChart from '../FluroChart.vue';
import EventAgeGenderMetrics from './EventAgeGenderMetrics.vue'
export default {
    components: {
        FluroChart,
        EventAgeGenderMetrics
    },
    props: {
        id: {
            type: [Object, String],
        },
        type: {
            type: String,
        }
    },
    computed: {
        eventData() {
            var self = this
            var model = {
                axis: [],
                series: {
                    attendance: [],
                    expected: [],
                }
            }
            var events = _.sortBy(self.model, function(event) {
                return event.startDate
            })
            _.each(events, function(event) {
                //console.log("HERE", event)
                var headcount = _.get(event, "stats.headcount") || 0
                var checkins = _.get(event, "stats.checkin") || 0
                var combined = _.get(event, "stats.combinedHeadcountCheckins") || 0
                var attendance = Math.max(combined, headcount, checkins, 0)
                if (attendance > 0) {
                    model.axis.push(event.startDate)
                    model.series.attendance.push(attendance)
                    model.series.expected.push(_.get(event, "tickets.distinct") || 0)
                }
            })

            
            var latestEvent = _.chain(events)
                .filter(function(o) {
                    return moment(o.startDate) < moment()
                })
                .last(events)
                .value()
            self.selectedEvent = latestEvent._id

            var max = Math.max(_.max(model.series.attendance), _.max(model.series.expected))

            var returnData = {
                axis: {
                    "title": "Date",
                    "key": "date"
                },
                series: [{
                        "title": "Attendance",
                        "key": "attendance"
                    },
                    {
                        "title": "Expected",
                        "key": "expected",
                    },
                ],
                model,
                options: {
                    yaxis: [{
                            min: 0,
                            max,
                            title: {
                                text: 'Attendance',
                            },
                            tooltip: {
                                enabled: true,
                                shared: true,
                            },
                            show: true,
                        },
                        {
                            min: 0,
                            max,
                            opposite: true,
                            title: {
                                text: 'Expected'
                            },
                            tooltip: {
                                enabled: true,
                                shared: true,
                            },
                            show: true,
                        }
                    ],
                }
            }

            // console.log("Event Graph Data", returnData)
            return returnData
        },

    },
    asyncComputed: {
        model: {
            // default: {},
            get() {
                var self = this;
                var id = self.$fluro.utils.getStringID(self.id);
                return new Promise(function(resolve, reject) {
                    //Load the chart data
                    switch (self.type) {
                        case 'eventtrack':
                            var endpoint = `chart/track/${id}`
                            self.$fluro.api.get(endpoint, {
                                params: {
                                    startDate: moment().subtract(1, 'year').toDate(),
                                    endDate: moment().toDate(),
                                }
                            }).then(function(res) {
                                resolve(res.data);
                                // console.log("Dataset", res.data)
                                self.loading = false;
                            }, function(err) {
                                reject(err);
                                self.loading = false;
                            });
                            break;
                        case 'realm':
                            break;
                        case 'contact':
                            break;
                    }
                })
            }
        }
    },
    methods: {
        chartClicked(data) {
            var self = this
            if(data.key == 'click'){
                console.log("Clicked", data, self.model[data.config.dataPointIndex])
                self.selectedEvent = self.model[data.config.dataPointIndex]._id
            }
        }
    },
    data() {
        return {
            loading: true,
            selectedEvent: null
        }
    }
}

</script>
<style lang="scss">
</style>
