<template>
    <flex-column-body>
    <v-container fluid style="background: #eee;">
    	<constrain sm>
    		<v-layout>
    			<v-flex>
    					<img class="qrcode" :src="qrCodeURL"/>
    			</v-flex>
    			<!-- <v-flex v-else> -->
    					<!-- <img :src="ticketCodeURL"/> -->
    			<!-- </v-flex> -->
    			<!-- <v-spacer/>
    			<v-flex>
    					<img :src="ticketCodeURL"/>
    			</v-flex> -->
                <!-- <div class="form-group col-xs-12 col-sm-4">
                    <label>Ticket Code</label>
                    <div class="qrcode">
                        <img ng-src="{{ticketCodeURL}}" />
                    </div>
                </div>
                <div class="form-group col-xs-12 col-sm-4">
                    <label>Interaction Code</label>
                    <div class="qrcode">
                        <img ng-src="{{interactionCodeURL}}" />
                    </div>
                </div> -->
           </v-layout>
    	</constrain>
    </v-container>
    	<v-container fluid>
        <constrain sm>
            <h1>{{item.title}}</h1>

            <v-input class="no-flex" v-if="item.email">
            	<v-label>
            		Primary Email Address
            	</v-label>
            	<div>
            		{{item.email}}
            	</div>
            </v-input>

            <v-input class="no-flex" v-if="item.contact">
            	<v-label>
            		Contact
            	</v-label>
                <fluro-list-item @click.native="$fluro.global.view(item.contact)" :bordered="true" :item="item.contact"/>
            </v-input>

            <v-input class="no-flex" v-if="item.event">
            	<v-label>
            		Event
            	</v-label>
                <fluro-list-item @click.native="$fluro.global.view(item.event)" :bordered="true" :item="item.event"/>
            </v-input>

            <v-input class="no-flex" v-if="item.interaction">
            	<v-label>
            		Interaction
            	</v-label>
                <fluro-list-item @click.native="$fluro.global.view(item.interaction)" :bordered="true" :item="item.interaction"/>
            </v-input>
            
            <!-- <pre>{{item}}</pre> -->
            <fluro-content-render :fields="definedFields" v-model="item.data" />
            
        </constrain>
    </v-container>
</flex-column-body>
</template>
<script>
/////////////////////////////////

import Vue from 'vue';
import FluroContentViewMixin from '../FluroContentViewMixin.js';

/////////////////////////////////

export default {
    props: {
        config: {
            type: Object,
            required: true,
        },
        item: {
            type: Object,
            required: true,
        },
    },
    components: {
    },
    mixins: [FluroContentViewMixin],
    methods: {},
    computed: {
    	qrCodeURL() {

    		var self = this;
    		var interactionID = self.$fluro.utils.getStringID(self.item.interaction);
    		var ticketID = self.$fluro.utils.getStringID(self.item);
    		if(interactionID) {
    			return `${self.$fluro.api.defaults.baseURL}/system/qr?input=http://tickets.fluro.io/interaction/${interactionID}`;
    		} else {
    			return `${self.$fluro.api.defaults.baseURL}/system/qr?input=http://tickets.fluro.io/ticket/${ticketID}`;
    		}

	// $scope.ticketCodeURL = Fluro.apiURL + '/system/qr?input=http://tickets.fluro.io/ticket/' + ticketID;
	// $scope.interactionCodeURL = Fluro.apiURL + '/system/qr?input=http://tickets.fluro.io/interaction/' + interactionID;

    	},
        data() {
            return this.item.data || {}
        },
        definedFields() {
            return this.definition ? this.definition.fields : null;
        }
    },
    data() {
        return {}
    },
}
</script>
<style scoped lang="scss">

.qrcode {
	display: block;
	border:5px solid #000;
	background: #000;
	margin:auto;
}
</style>