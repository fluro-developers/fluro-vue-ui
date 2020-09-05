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
                    <fluro-chart chartType="line" :options="eventData.options" v-model="eventData.model" :series="eventData.series" :axis="eventData.axis"  v-on:chart-event="chartClicked"/>
                </fluro-panel-body>
            </fluro-panel>
            <fluro-panel v-if="selectedEvent">
                <fluro-panel-title>
                    <strong>{{selectedEvent.title}} - {{selectedEvent.startDate | formatDate('dddd Do MMM YYYY h:mma')}}</strong>
                </fluro-panel-title>
                <fluro-panel-body>
                <div v-if="selectedEvent.headcount" >
                    <b>Overall Head Count:</b> {{selectedEvent.headcount.average}}
                </div>
                 <template v-if="selectedEvent.checkins">
                    <event-age-gender-metrics :id="selectedEvent._id"></event-age-gender-metrics>
                    <h2 style="margin-top: 15px;">Checkins</h2>
                    <fluro-table :pageSize="30" :scrollable="false" :items="selectedEvent.checkins" :columns="columns"></fluro-table>
                </template>
                <template v-else>
                    <div class="muted">
                        <br />
                        Detailed demographic information not available as no Checkins found for this event.
                    </div>
                </template>
                <template v-if="selectedEvent.posts"> 
                    <h2 style="margin-top: 15px;">Event Reports</h2>
                    <div v-for="post in selectedEvent.posts" :key="post._id">
                        <fluro-content-view :id="post._id" :embedded="true" :definition="post.definition" :type="post._type" />
                    </div>
                </template>    
                </fluro-panel-body>
            </fluro-panel>
            <!-- <fluro-panel >
                <fluro-panel-title>
                    <strong>Member Attendance</strong>
                </fluro-panel-title>
                <fluro-panel-body>
                    <pre>{{attendance}}</pre>
                </fluro-panel-body>
            </fluro-panel> -->
            <!-- <div v-if="ageSpread.model.data.agespread.length"> -->
        </template>
    </flex-column>
</template>
<script>
import { moment } from 'fluro';
import FluroChart from '../FluroChart.vue';
import EventAgeGenderMetrics from './EventAgeGenderMetrics.vue'
import ContactAvatar from "../../table/cells/AvatarCell.vue";
import FluroTable from "../../table/FluroTable.vue";
import FluroContentViewMixin from "../../content/view/FluroContentViewMixin.js";
import FluroContentView from "../../content/view/FluroContentView.vue";

export default {
    components: {
        FluroChart,
        EventAgeGenderMetrics,
        ContactAvatar,
        FluroTable,
        FluroContentView
    },
    mixins: [FluroContentViewMixin],
    props: {
        group: {
            type: [Object, String],
        },
        type: {
            type: String,
        },
        config: {
            type: Object,
        },
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
            var sortedEventData = []
            //console.log("events length", events.length)
            _.each(events, function(event) {
                //console.log("HERE", event)
                var headcount = _.get(event, "headcount.average") || 0
                var checkins = _.get(event, "checkins.length") || 0
                var attendance = Math.max(headcount, checkins, 0)
                if (attendance > 0) {
                    model.axis.push(event.startDate)
                    model.series.attendance.push(attendance)
                    model.series.expected.push(_.get(event, "stats.guestExpected") || 0)
                    sortedEventData.push(event)
                }
            })
            self.sortedEventData = sortedEventData

            //console.log("axis length", model.axis.length)
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

            //console.log("Event Graph Data", returnData)
            return returnData
        },
        columns() {
            var array = [];

            array.push({
                title: "",
                key: "_id",
                shrink: true,
                renderer: ContactAvatar,
            });

            array.push({
                title: "Name",
                key: "title",
            });

            return array;
        },
        attendance() {
            var self = this
            var allContacts = {}
            console.log(self.group)
            _.each(self.model, function(event, key) {
                
                _.each (event.expectedContacts, function (contact){
                    allContacts[contact._id] = contact
                })
                _.each (event.checkin, function (contact){
                    allContacts[contact._id] = {
                        _id: contact._id,
                        title: contact.title,
                        firstName: contact.firstName,
                        lastName: contact.lastName
                    }
                })
                
            })

            _.each(allContacts, function(contact){

                var found = _.find(self.group.provisionalMembers, function(member){
                    return member._id == contact._id
                })
                if(found) {
                    contact.expected = true
                }
                var assignedContacts = _.map(self.group.assignments, function(assignment){
                    return assignment.contacts
                })
                assignedContacts = _.flatten(assignedContacts)
                if(_.find(assignedContacts, function (assignment){
                    return assignment._id == contact._id
                })) {
                    contact.expected = true
                }

            })

            allContacts = _.sortBy(allContacts, ['expected', 'lastName', 'firstName'])

            
            return allContacts
        }
    },
    asyncComputed: {
        model: {
            // default: {},
            get() {
                var self = this;
                var id = self.$fluro.utils.getStringID(self.group);
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
                                resolve(res.data.events);
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
            //console.log(data.key, data)
            if(data.key == 'click'){
                console.log("Clicked",data.config.dataPointIndex , data, "xxx", self.sortedEventData, "sss", self.sortedEventData[data.config.dataPointIndex])
                self.selectedEvent = self.sortedEventData[data.config.dataPointIndex]
            }
        }
    },
    data() {
        return {
            loading: true,
            age: false,
            gender: false,
            selectedEvent: null,
            sortedEventData: [],

        }
    }
}

</script>
<style lang="scss">
</style>
