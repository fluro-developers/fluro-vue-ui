<template>
    <flex-column>
        <fluro-page-preloader v-if="loading" contain />
        <!--  <template v-if="loading"> Loading Component <v-progress-circular indeterminate></v-progress-circular>
        </template> -->
        <template v-else>
            <v-layout row>
                <v-flex xs12 lg4>
                    <fluro-panel>
                        <fluro-panel-title>
                            <strong>Gender</strong>
                        </fluro-panel-title>
                        <fluro-panel-body>
                            <template v-if="gender">
                                <fluro-chart chartType="pie" :options="genderBreakdown.options" v-model="genderBreakdown.model" :series="genderBreakdown.series" />
                            </template>
                            <template v-else>
                                <div class="muted">
                                    Gender demographics are not available for this event.
                                </div>
                            </template>
                            
                        </fluro-panel-body>
                    </fluro-panel>
                </v-flex>
                <v-spacer/>
                <v-flex xs12 lg8>
                    <fluro-panel>
                        <fluro-panel-title>
                            <strong>Ages</strong>
                        </fluro-panel-title>
                        <fluro-panel-body>
                            <template v-if="age">
                                <fluro-chart chartType="line" :options="ageSpread.options" v-model="ageSpread.model" :series="ageSpread.series" :axis="ageSpread.axis" />
                            </template>
                            <template v-else>
                                <div class="muted">
                                    Age demographics are not available for this event.
                                </div>
                            </template>
                        </fluro-panel-body>
                    </fluro-panel>
                </v-flex>
            </v-layout>
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
        genderBreakdown() {
            var self = this;
            var stats = self.model.stats
            var labels = []
            var data = []

            var returnData = {
                model: {},
                series: [{
                    title: "Gender Composition",
                    key: "gender"
                }],
                options: {
                    colors: ['#FFC0CB', '#00BFFF', '#FFFF00', '#FFEBCD']
                }
            }
            var genders = {
                female: 0,
                male: 0,
            }
            _.each(stats.genders, function(value, stat){
                genders[stat] = value
            })
            _.each(genders, function(value, key) {
                labels.push(key.replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); }))
                data.push(value)
            })
            console.log("genders", genders)

            _.set(returnData, 'model.series[gender]', { data, labels })
            // console.log("Gender Graph Data", returnData)
            if(genders) {
                self.genders = true
            }
            return returnData
        },
        ageSpread() {
            var self = this
            var statbase = self.model.stats
            var ageSpread = _.get(statbase, "ages")
            var averageAge = _.get(statbase, "averageAge")

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
                    var endpoint = `chart/event/${id}`
                    self.$fluro.api.get(endpoint, {}).then(function(res) {
                        resolve(res.data);
                        console.log("Event Gender Dataset", id, res.data)
                        self.loading = false;
                    }, function(err) {
                        reject(err);
                        self.loading = false;
                    });

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
