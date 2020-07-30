<template>
    <flex-column-body class="contact-engagement-chard">
        <!-- <v-container> -->
        	<fluro-page-preloader contain v-if="loading"/>
        	<template v-else>
            <trend-chart title="Engagement" @clicked="clicked" :data="chartData" />
        </template>

            <!-- <pre>{{chartData.values}}</pre> -->
        <!-- </v-container> -->
    </flex-column-body>
</template>
<script>
import TrendChart from '../../../reporting/FluroTrendChart.vue';
import _ from 'lodash';



////////////////////////////////////////////

export default {
    props: {
        value: {
            type: Object,
        }
    },
    components: {
        TrendChart,
    },
    methods: {
        clicked() {

        },
    },
    computed: {
        chartData() {

            var self = this;



            var seriesKeys = {};
            // var series = [];

            var values = _.chain(self.array)
                .reduce(function(set, entry) {

                    //Get what kind of thing it is
                    var key = entry._type || 'log';

                    switch(key) {
                    	case 'sms':
                    	case 'mailout':

                    		if(key == 'mailout') {
                    			
                    			switch(entry.state) {
                    				case 'open':
                    				case 'click':
                    				break;
                    				default:
                    					return set;
                    				break;
                    			}
                    		}

                    		key = 'messaging';
                    		seriesKeys[key] = ({
                    			title:'Messaging',
                    			key,
                    		})
                    	break;
                    	case 'checkin':
                    		key = 'attendance';
                    		seriesKeys[key] = ({
                    			title:'Attendance',
                    			key,
                    		})
                    	break;
                    	case 'assignment':
                    		key = 'service';
                    		seriesKeys[key] = ({
                    			title:'Service',
                    			key,
                    		})
                    	break;
                    	case 'interaction':
                    	case 'post':
                    		key = 'interaction';
                    		seriesKeys[key] = ({
                    			title:'Interactions',
                    			key,
                    		})
                    	break;
                    	default:
                    		return set;
                    	break;
                    }

                    // seriesKeys[key] = true;
                    // seriesKeys[key] = true;

                    //////////////////////////////////////////

                    var date = new Date(entry.date);
                    date.setHours(0, 0, 0, 0);
                    var dateKey = date.getTime();

                    //////////////////////////////////////////

                    var existing = set[dateKey];

                    if (!existing) {
                        existing = set[dateKey] = {
                            date,
                            values: {},
                            items:[],
                        }
                    }

                    existing.items.push(entry);

                    if (existing.values[key]) {
                        existing.values[key]++;
                    } else {
                        existing.values[key] = 1;
                    }


                    // return {
                    //           _id:entry._id,
                    //           definition:entry.definition,
                    //           eventID:entry.eventID,
                    //           title: entry.title,
                    //           date: new Date(entry.date),
                    //           values:{},
                              // {
                              // totals: entry.totals,
                              // mean: entry.mean,
                              // },
                          // }
                    // entry:entry,



                    return set;
                }, {})
                .values()
                .value();


            // var series = _.chain(seriesKeys)
            //     .reduce(function(set, v, key) {


            //         switch (key) {
            //             case 'mailout':
            //                 set['mailout'] = {
            //                     title: 'Mailouts',
            //                     key: 'mailout',
            //                 }
            //                 break;
            //             case 'post':
            //                 set['post'] = {
            //                     title: 'Posts',
            //                     key: 'post',
            //                 }
            //                 break;
            //             case 'interaction':
            //                 set['interaction'] = {
            //                     title: 'Interactions',
            //                     key: 'interaction',
            //                 }
            //                 break;
            //             case 'checkin':
            //                 set['checkin'] = {
            //                     title: 'Checkins',
            //                     key: 'checkin',
            //                 }
            //                 break;
            //             case 'assignment':
            //                 set['assignment'] = {
            //                     title: 'Assignment',
            //                     key: 'assignment',
            //                 }
            //                 break;
            //             case 'sms':
            //                 set['sms'] = {
            //                     title: 'SMS',
            //                     key: 'sms',
            //                 }
            //                 break;
            //             default:
            //                 set['log'] = {
            //                     title: 'Log',
            //                     key: 'log',
            //                 }
            //                 break;

            //         }

            //         return set;

            //     }, {})
            //     .values()
            //     .value();




            // var mapped = _.map(self.array, function(entry) {


            //     var key = entry._type || 'log';

            //     return {
            //         _id: entry._id,
            //         date: entry.date,
            //         key,
            //         raw: entry,
            //         values: {

            //         }
            //         // return {
            //         //           _id:entry._id,
            //         //           definition:entry.definition,
            //         //           eventID:entry.eventID,
            //         //           title: entry.title,
            //         //           date: new Date(entry.date),
            //         //           values: entry.data,
            //         //           // {
            //         //           // totals: entry.totals,
            //         //           // mean: entry.mean,
            //         //           // },
            //         //       }
            //         // entry:entry,
            //     }
            // })

            //////////////////////////////////////////////

            // var series = _.chain(mapped)
            // .reduce(function(set, entry) {






            //         return set;

            //     }, {})
            //     .values()
            //     .value()

            return {
                series:_.values(seriesKeys), //: series,
                values, //: mapped,
            }

        }
    },
    data() {
        return {
            loading: true,
            model: this.value,
        }
    },
    asyncComputed: {
        array: {
            default: [],
            get() {

                var self = this;
                self.loading = true;

                var contactID = self.$fluro.utils.getStringID(self.model);
                if (!contactID) {
                    Promise.resolve([])
                    self.loading = false;
                }

                return new Promise(function(resolve, reject) {

                    self.$fluro.api.get(`/contact/${contactID}/timeline`).then(function(res) {

                            resolve(res.data);
                            self.loading = false;
                        })
                        .catch(function(err) {
                            reject(err);
                            self.loading = false;

                        });
                    // https://api.staging.fluro.io/info/checkins?contact=592e50389d9129595a75cc4e
                })
            }
        }
    }
}
</script>
<style lang="scss">
.contact-engagement-chart {}
</style>