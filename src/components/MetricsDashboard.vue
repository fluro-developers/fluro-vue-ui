<template>
    <div>
        <template v-if="loading"> Loading Component <v-progress-circular indeterminate></v-progress-circular>
        </template>
        <template v-else>
            <h3>Attendance</h3>
            <fluro-chart chartType="line" :options="eventData.options" v-model="eventData.model" :series="eventData.series" :axis="eventData.axis" />
            <h3>Group Size</h3>
            <fluro-chart chartType="line" :options="groupSize.options" v-model="groupSize.model" :series="groupSize.series" :axis="groupSize.axis" />
            <h3>Gender Breakdown</h3>
            <fluro-chart chartType="pie" :options="genderBreakdown.options" v-model="genderBreakdown.model" :series="genderBreakdown.series" />
            <!-- Type: {{type}}  -->
            <!-- Model:<pre>{{eventData}}</pre> -->
            <!-- ID: -->
            <!-- <pre>{{genderBreakdown}}</pre> -->
        </template>
    </div>
</template>
<script>
import { moment } from 'fluro';
import { FluroChart } from 'fluro-vue-ui';
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
                },
                options: {}
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
            return {
                axis: {
                    "title": "Date",
                    "key": "date"
                },
                series: [
                    // {
                    //   "title": "Headcount",
                    //   "key": "headcount"
                    // },
                    // {
                    //   "title": "Checkins",
                    //   "key": "checkins",
                    // },
                    {
                        "title": "Attendance",
                        "key": "attendance"
                    }, {
                        "title": "Expected",
                        "key": "expected",
                    },
                ],
                model
            }
        },
        groupSize() {
            var self = this;
            var model = {
                axis: [],
                series: {
                    groupsize: [],
                },
                options: {}
            }
            var stats = _.sortBy(self.model.statsheets, function(stat) {
                return stat.date
            })
            _.each(stats, function(stat) {
                //console.log("HERE", event)
                model.axis.push(stat.date)
                model.series.groupsize.push(_.get(stat, "data.memberCount.total"))
            })
            return {
                axis: {
                    "title": "Date",
                    "key": "date"
                },
                series: [{
                    "title": "Members",
                    "key": "groupsize",
                    AOT: true
                }, ],
                model
            }
        },
        genderBreakdown() {
            var self = this;
            var stats = _.last(self.model.statsheets)
            var labels = []
            var data = []

            var returnData = {
                model: {
                },
                series: [{
                    title: "Gender Composition",
                    key: "gender"
                }],
                options: {
                    colors: ['#00BFFF','#FFC0CB', '#FFFF00', '#FFEBCD']
                }
            }
            _.each(_.get(stats, "data.genders"), function(value, key) {
                labels.push(key.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}))
                data.push(value)
            })
            _.set(returnData, 'model.series[gender]', {data, labels})
            // console.log("Gender Graph Data", returnData)
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
        }
    }
}

</script>
<style lang="scss">
</style>
