<template>
    <v-menu @click.native.stop offset-y>
        <template v-slot:activator="{ on }">
        	<div class="fluro-status-select"  v-on="on">
            <fluro-status-label :value="value" />
        </div>
        </template>
        <v-card tile>
            <v-list dense>
                <v-list-tile @click="setStatus(option)" v-for="option in options">
                    <v-list-tile-content>
                        <v-list-tile-title>
                            {{option}}
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-card>
    </v-menu>
</template>
<script>

import FluroStatusLabel from '../ui/FluroStatusLabel.vue';
export default {
	components:{
		FluroStatusLabel,
	},
    props: {
        'value': {
            type: String,
            default() {
            	return 'active';
            }
        },
        'type': {
            type: String,
        },
    },
    data() {
    	return {
    		status:this.value,
    	}
    },
    methods:{
    	setStatus(value) {
    		this.status = value;
    		this.$emit('input', value);
    	}
    },
    computed:{
    	options() {

    		var self = this;
    		var array = [];

    		

    		switch(self.type) {
    			case 'purchase':
    				array.push('active')
		    		array.push('cancelled')
		    		array.push('expired')
    			break;

    			case 'account':
    				array.push('active')
		    		array.push('cancelled')
		    		array.push('onhold')
		    		array.push('exempt')
		    		array.push('trial')
    			break;
    			case 'plan':
    				array.push('active')
		    		array.push('draft')
		    		array.push('archived')
		    		array.push('template')
    			break;

    			default:
    				array.push('active')
		    		array.push('draft')
		    		array.push('archived')
    			break;
    			
    		}
    		

    		return array;
    	}
    }
}
</script>
<style lang="scss">
	
	.fluro-status-select {
		display: inline-block;
		width: 100px;
		height:25px;
		line-height: 25px;
		margin: 0 10px;
		vertical-align: middle;

		.status-label {
			margin:0;
			border-radius: 3px;
			display: block;
			text-align: center;
			padding:0;
			
			// line-height: 22px;
			font-size: 11px;
			
		}
	}
</style>