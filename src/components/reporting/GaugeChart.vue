<template>
    <div class="gauge">
        <!-- <pre>{{value}}</pre> -->
        <apexchart type=radialBar height=350 :options="chartOptions" :series="series" />
        <div class="value"><span class="prefix">{{prefix}}</span>{{value}}<span class="suffix">{{suffix}}</span></div>
        <label>{{label}}</label>
    </div>
</template>
<script>
export default {
    props: {
    	'label':{
    		type:String,
    	},
    	'prefix':{
    		type:String,
    	},
    	'suffix':{
    		type:String,
    	},
        'min': {
            default: 0,
            type: Number,
        },
        'max': {
            default: 100,
            type: Number,
        },
        'value': {
            default: 50,
            type: Number,
        },
    },
    computed: {
        chartOptions() {
            return {
                plotOptions: {
                    radialBar: {
                        startAngle: -90,
                        endAngle: 90,
                        track: {
                            background: "#e7e7e7",
                            strokeWidth: '97%',
                            margin: 5, // margin is in pixels
                            shadow: {
                                enabled: true,
                                top: 2,
                                left: 0,
                                color: '#999',
                                opacity: 1,
                                blur: 2
                            }
                        },
                        dataLabels: {
                            name: {
                                show: false
                            },
                            value: {
                            	show:false,
                            //     offsetY: 15,
                            //     fontSize: '22px'
                            }
                        }
                    }
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shade: 'light',
                        shadeIntensity: 0.4,
                        inverseColors: false,
                        opacityFrom: 1,
                        opacityTo: 1,
                        stops: [0, 50, 53, 91]
                    },
                },
                labels: ['Average Results'],
            }
        },

        series() {
            return [this.value]
        }
    }
}
</script>
<style scoped lang="scss">

.gauge {
	position: relative;
	// border: 10px solid #000;
	padding-bottom:50%;
	height:0;
	overflow: hidden;

	.value {
		position: absolute;
		left:0;
		right:0;
		top:50%;
		transform: translateY(-50%);
		display: block;
		text-align: center;
		font-size: 1.3em;
		font-weight: 500;
	}

	label {
		display: block;
		position: absolute;
		left:0;
		right:0;
		bottom:0;
		text-align: center;
		font-size: 1.1em;
		font-weight: 500;
	}
}
</style>