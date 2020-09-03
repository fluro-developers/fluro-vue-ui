<template>
    <flex-column>
        <fluro-page-preloader v-if="loading" contain />
        <!--  <template v-if="loading"> Loading Component <v-progress-circular indeterminate></v-progress-circular>
        </template> -->
        <template v-else>
            <fluro-panel v-if="eventData.model.series.attendance.length">
                <fluro-panel-title>
                    <strong>Attendance</strong>
                </fluro-panel-title>
                <fluro-panel-body>
                    <fluro-chart chartType="line" :options="eventData.options" v-model="eventData.model" :series="eventData.series" :axis="eventData.axis" />
                </fluro-panel-body>
            </fluro-panel>
            <template v-if="groupSize.model.series.groupsize.length">
                <fluro-panel>
                    <fluro-panel-title>
                        <strong>Group Size</strong>
                    </fluro-panel-title>
                    <fluro-panel-body>
                        <fluro-chart chartType="line" :options="groupSize.options" v-model="groupSize.model" :series="groupSize.series" :axis="groupSize.axis" />
                    </fluro-panel-body>
                </fluro-panel>
               
                    <v-layout row>
                        <v-flex xs12 lg4 v-if="gender">
                            <fluro-panel>
                                <fluro-panel-title>
                                    <strong>Gender</strong>
                                </fluro-panel-title>
                                <fluro-panel-body>
                                    <fluro-chart chartType="pie" :options="genderBreakdown.options" v-model="genderBreakdown.model" :series="genderBreakdown.series" />
                                </fluro-panel-body>
                                </div>
                            </fluro-panel>
                        </v-flex>
                        <v-spacer/>
                        <v-flex xs12 lg8 v-if="age">
                            <fluro-panel>
                                <fluro-panel-title>
                                    <strong>Ages</strong>
                                </fluro-panel-title>
                                <fluro-panel-body>
                                    <fluro-chart chartType="line" :options="ageSpread.options" v-model="ageSpread.model" :series="ageSpread.series" :axis="ageSpread.axis" />
                                </fluro-panel-body>
                            </fluro-panel>
                        </v-flex>
                    </v-layout>
                
            </template>
            <!-- <div v-if="ageSpread.model.data.agespread.length"> -->
        </template>
    </flex-column>
</template>
<script>
import { moment } from 'fluro';
import FluroChart from '../FluroChart.vue';
export default {
    components: {
        FluroChart,
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
            var events = _.sortBy(self.model.events, function(event) {
                return event.startDate
            })
            _.each(events, function(event) {
                //console.log("HERE", event)
                var headcount = _.get(event, "headcount.average") || 0
                var checkins = _.get(event, "checkins.length") || 0
                var attendance = Math.max(headcount, checkins, 0)
                if (attendance > 0) {
                    model.axis.push(event.startDate)
                    model.series.attendance.push(attendance)
                    model.series.expected.push(_.get(event, "stats.guestExpected") || 0)
                }
            })

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
        groupSize() {
            var self = this;
            var model = {
                axis: [],
                series: {
                    groupsize: [],
                }
            }
            var stats = _.sortBy(self.model.statsheets, function(stat) {
                return stat.date
            })
            _.each(stats, function(stat) {
                //console.log("HERE", event)
                model.axis.push(stat.date)
                model.series.groupsize.push(_.get(stat, "data.memberCount.total"))
            })
            var returnData = {
                axis: {
                    "title": "Date",
                    "key": "date"
                },
                series: [{
                    "title": "Members",
                    "key": "groupsize",
                    AOT: true
                }, ],
                model,
                options: {}
            }

            //console.log("GroupSize Graph Data", returnData)
            return returnData
        },
        genderBreakdown() {
            var self = this;
            var stats = _.last(self.model.statsheets)
            var labels = []
            var data = []

            var returnData = {
                model: {},
                series: [{
                    title: "Gender Composition",
                    key: "gender"
                }],
                options: {
                    colors: ['#00BFFF', '#FFC0CB', '#FFFF00', '#FFEBCD']
                }
            }
            var genders = _.get(stats, "data.genders")
            _.each(genders, function(value, key) {
                labels.push(key.replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }))
                data.push(value)
            })
            _.set(returnData, 'model.series[gender]', { data, labels })
            // console.log("Gender Graph Data", returnData)
            if(genders) {
                self.genders = true
            }
            return returnData
        },
        ageSpread() {
            var self = this
            var statbase = _.last(self.model.statsheets)
            var ageSpread = _.get(statbase, "data.ages.spread")
            var averageAge = _.get(statbase, "data.ages.average")

            if (ageSpread) {
                self.age = true
            }
            var groupedAges = new Array(8).fill(0)
            _.each(ageSpread, function(value, key) {
                // console.log("key", key, "value", value)
                switch (true) {
                    case (key < 16):
                        groupedAges[0] = groupedAges[0] + value
                        break
                    case (key < 26):
                        groupedAges[1] = groupedAges[1] + value
                        break
                    case (key < 36):
                        groupedAges[2] = groupedAges[2] + value
                        break;
                    case (key < 46):
                        groupedAges[3] = groupedAges[3] + value
                        break;
                    case (key < 56):
                        groupedAges[4] = groupedAges[4] + value
                        break;
                    case (key < 66):
                        groupedAges[5] = groupedAges[5] + value
                        break;
                    case (key < 76):
                        groupedAges[6] = groupedAges[6] + value
                        break;
                    case (key >= 76):
                        groupedAges[7] = groupedAges[7] + value
                        break;

                }
            })
            // console.log("groupedAges", groupedAges)

            var labels = ["Under 15", "16 - 25", "26 - 35", "36 - 45", "46 - 55", "56 - 65", "66 - 75", "Over 76"]

            var series = [{
                    title: "Age Spread",
                    type: 'column',
                    key: "agespread"
                },
                {
                    title: "Average Age",
                    type: 'line',
                    key: "averageage"
                }
            ]



            var model = {
                axis: labels,
                series: {
                    agespread: _.map(groupedAges, function(value) {
                        return value || 0
                    }),
                    averageage: new Array(8).fill(averageAge)
                }
            }

            var returnData = {
                axis: {
                    key: "ages",
                    title: "Ages"
                },
                model,
                series,
                options: {
                    chart: {
                        height: 350,
                        type: 'line',
                    },
                    stroke: {
                        width: [0, 4],
                        dashArray: [0, 2]
                    },
                    yaxis: [{
                            title: {
                                text: 'Age Spread',
                            },
                            tooltip: {
                                enabled: true,
                                shared: true,
                            },
                            show: true,
                        },
                        {
                            min: 0,
                            max: 100,
                            opposite: true,
                            title: {
                                text: 'Average Age'
                            },
                            tooltip: {
                                enabled: true,
                                shared: true,
                            },
                            show: true,
                        }
                    ],
                    labels,
                }
            }

            //console.log("Age Spread data", returnData)
            return returnData
        }

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
                        case 'team':
                            var endpoint = `chart/groups/${id}/simple`
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
    data() {
        return {
            loading: true,
            age: false,
            gender: false
        }
    }
}

</script>
<style lang="scss">
</style>
