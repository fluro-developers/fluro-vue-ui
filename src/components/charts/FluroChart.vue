<template>
    <div>
        <!-- Loading: {{loading}} -->
        <!--  -->
        <template v-if="loading"> Loading Component <v-progress-circular indeterminate></v-progress-circular>
        </template>
        <template v-else>
            <slot name="title">
                <h3>{{title}}</h3>
            </slot>
            <slot name="graph">
            	<div v-if="dataSource">
	                <div v-if="normalisedChartType=='pie'">
	                    <fluro-pie-chart @chartEvent="chartEvent" v-model="chartData" :annotations="annotations" :options="compiledOptions" :chartType="cleansedChartType" :height="height" :width="width" />
	                </div>
	                <div v-else-if="normalisedChartType=='line'">
	                    <fluro-line-chart @chartEvent="chartEvent" v-model="chartData" :annotations="annotations" :options="compiledOptions" :chartType="cleansedChartType" :height="height" :width="width" />
	                </div>
	                <div v-else-if="normalisedChartType=='synced'">
	                    <fluro-synced-chart @chartEvent="chartEvent" v-model="chartData" :annotations="annotations" :options="compiledOptions" :chartType="cleansedChartType" :height="height" :width="width" />
	                </div>
            	</div>
            </slot>
            <slot name="footer"></slot>
        </template>
    </div>
</template>
<script>

import _ from 'lodash';
import {moment} from 'fluro';
import FluroPieChart from './FluroPieChart.vue'
import FluroLineChart from './FluroLineChart.vue'
import FluroSyncedChart from './FluroSyncedChart.vue'
import ReportingColorsMixin from './mixins/ReportingColorsMixin.js';
import ReportingComputationalMixin from './mixins/ReportingComputationalMixin.js';



export default {
    mixins: [ReportingColorsMixin, ReportingComputationalMixin],
    computed: {
    	compiledOptions: function() {
    		var self = this
    		var options = self.options
    		options.colors = self.colors
    		_.each(self.series, function (ser) {
    			//console.log("FC Processing series", ser)
    			if (ser.AOT){
    				options._AOT = true
    			}
    		})
    		//console.log("FC compiledOptions", options)
    		return options
    	},
    	cleansedChartType: function() {
    		var self = this;
    		var type = self.chartType
    		if(type == 'column') {
    			type = 'bar'
    		}
    		return type

    	},
        normalisedChartType: function() {
            var self = this
            var type = self.chartType
            switch (type) {
                case 'bar':
                case 'line':
                case 'column':
                case 'area':
                    type = 'line';
                    break;
                case 'pie':
                case 'donut':
                case 'radialBar':
                    type = "pie"
                    break;
                default:
                    break;
            }
            return type
        },
        groupChartData: function() {
         
        	var self = this
        	var dataSource = self.dataSource
            // console.log("Datasource", dataSource)
            // console.log("Series", self.series)

            function groupData(groupFormat, datasource) {

                var returnDatasource = {}
                        
                _.each(dataSource.axis, function(entryDate, key) {
                    // console.log("in the each", entryDate, key)
                    var groupingKey = self.getGroupDate(entryDate, groupFormat)
                    var currentGroupedEntry = _.get(returnDatasource, groupingKey)
                    if (!currentGroupedEntry) {

                        currentGroupedEntry = {}
                        
                    }

                    _.each(self.series, function(ser){
                        var currentTotal = _.get(currentGroupedEntry, ser.key) || 0
                        _.set(currentGroupedEntry, ser.key, currentTotal + _.get(datasource, `series.${ser.key}` )[key])

                    })
                    _.set(returnDatasource, groupingKey, currentGroupedEntry)
                })

                return returnDatasource

            }

            var groupedData = groupData(self.groupBy, dataSource)
            //console.log("groupedData", groupedData)

            var returnData = {
                axis: [],
                series: {}
            }

            _.each(self.series, function(ser){
                _.set(returnData, `series.${ser.key}`, [])
            })

            _.each(groupedData, function (entry, key) {
                // console.log("groupedData Entry", entry, key)
                returnData.axis.push(moment.utc(key).format())
                _.each(self.series, function(ser){
                    var series = _.get(returnData, `series.${ser.key}`)
                    series.push(_.get(entry, ser.key))
                })
            })

            console.log("returnData", returnData)
        	return returnData

        },
        chartData: function() {
            var self = this
            //console.log("FLUROCHART chartType", self.chartType, self.normalisedChartType)
            var chrtdata
        	var colorCount = 0
        	_.each(self.series, function(ser) {
        		if (_.get(ser, "color")) {
        			self.colors[colorCount] = _.get(ser, "color")
        		}
        		colorCount = colorCount + 1
        	}) 
            switch (self.normalisedChartType) {
                case "pie":
                	
                    chrtdata = _.first(_.map(self.series, function(ser) {
                        return {
                            series: {
                                name: _.get(ser, "title"),
                                data: _.get(self.dataSource, `series["${ser.key}"].data`),
                                
                            },
                            labels: _.get(self.dataSource, `series["${ser.key}"].labels`),
                        }
                    }))
                    break;
                case "line":
                case "synced":
                default:

                    //console.log("FLUROCHART data Source", self.dataSource)
                    var series = _.map(self.series, function(ser) {

                        return {
                            name: _.get(ser, "title"),
                            data: _.get(self.groupChartData, `series.${ser.key}`),
                            key: ser.key,
                            color: ser.color,
                            AOT: ser.AOT
                        }
                    })
                    chrtdata = {
                        series,
                        axis: {
                            title: _.get(self.axis, "title"),
                            key: _.get(self.axis, "key"),
                            data: _.get(self.groupChartData, 'axis'),
                        },
                    }
                    break;
            }
            //console.log("FLUROCHART ChartData", chrtdata)
            return chrtdata
        }
    },
    props: {
        value: {
            type: Object,
        },
        groupBy: {
        	type: String,
        },
        endpoint: {
            type: String,
        },
        chartType: {
            type: String,
            default: "line",
            required: true,
        },
        options: {
            type: Object,
            default: function() {
                return {}
            },
        },
        definition: {
            type: String,
        },
        datePeriod: {
            type: Object,
            default: function() {
                return {
                    start: moment().subtract(1, 'year').toDate(),
                    end: moment().toDate(),
                }
            }
        },
        title: {
            type: String,
            default: '',
        },
        series: {
            type: Array,
            required: true
        },
        axis: {
            type: Object,
        },
        height: {
            type: Number,
        },
        width: {
            type: Number,
        },
        annotations: {
            type: Array,
        },
    },
    components: {
        FluroPieChart,
        FluroLineChart,
        FluroSyncedChart,
    },
    methods: {
        chartEvent(options) {
            var self = this
            // console.log("FC Options", options)
            self.$emit("chartEvent", options)
        },
        getGroupDate(date, format) {
            switch(format){
                case 'year':
                case 'week': 
                default:
                    return moment(date).startOf(format).toDate()
                    break;
            }
            
        }
    },
    data() {
        return {
            loading: true,
            model: this.value,
           	colors: [
				'#008FFB', 
				'#00E396', 
				'#FEB019', 
				'#FF4560', 
				'#775DD0', 
				'#7adc12',
				'#f34be2',
				'#b76b1a',
				'#ff7800',

			],
        }
    },
    watch: {
    	value(v) {
    		this.model = v
    	}
    },
    asyncComputed: {
        dataSource: {
            default: null,
            get() {
                var self = this;
                /////////////////////////////
                return new Promise(function(resolve, reject) {
               
                		 if (self.model) {
                        	//console.log('FLUROCHART - We have a supplied datasource!', self.model);
                        	resolve(self.model );
                        	self.loading = false
                        	return
               		     }
               			

                        var endpoint = self.endpoint;
                        var series = _.map(self.series, function(ser) {
                            return ser.key
                        })
                        if (!endpoint) {
                            endpoint = `chart/data/${self.definition}/${self.chartType}?series=${JSON.stringify(series)}`
                        }
                        if (self.axis) {
                            endpoint = endpoint + `&axis=${self.axis.key}`
                        }
                        /////////////////////////////
                        //console.log("endpoint", endpoint)
                        //Get the start and end date for the data we want/need
                        var startDate = self.datePeriod.start;
                        var endDate = self.datePeriod.end;
                        //Load the data from the API
                        self.$fluro.api.get(endpoint, {
                            params: {
                                startDate: startDate,
                                endDate: endDate,
                            }
                        }).then(function(res) {
                            resolve(res.data);
                            self.loading = false;
                        }, function(err) {
                            reject(err);
                            self.loading = false;
                        });
                     
                })
            }
        },
    }
}

</script>
<style lang="scss">
</style>
