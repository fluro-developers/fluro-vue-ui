<template>
    <flex-column style="width:80vw;">
        <flex-column-header>
            <v-container fluid pa-2 class="border-bottom">
                <v-layout align-center>
                    <v-flex>
                        <h5>{{model.title}} <span class="muted">// Payment Modifier</span></h5>
                    </v-flex>
                    <v-flex shrink v-if="options.cancelEnabled">
                        <v-btn class="ma-0 mr-2" @click="dismiss()">
                            Cancel
                        </v-btn>
                    </v-flex>
                    <v-flex shrink>
                        <v-btn color="primary" class="ma-0" @click="done()">
                            Done
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-container>
        </flex-column-header>
        <flex-row>
            <flex-column-body>
                <v-container>
                    <v-text-field :autofocus="true" label="Title" hint="The name of this modifier (displayed to the user when active)" v-model="model.title" />
                    <v-select label="Modifier" :items="operators" :hint="modifierDescription" v-model="model.operation" />
                    <v-input label="Value" hint="Either a value or an expression that returns a number in cents eg. '2000' or 'date.contacts.length'" :persistent-hint="true" class="no-flex">
                        <fluro-expression-editor v-model="model.expression" />
                    </v-input>
                    <br/>
                    <v-input label="Condition" hint="Specify a condition that must return 'truthy' for this payment modifier to be enabled." :persistent-hint="true" class="no-flex">
                        <fluro-expression-editor v-model="model.condition" />
                    </v-input>
                </v-container>
            </flex-column-body>
            <flex-column-body class="help">
            	<v-container>
            	</v-container>
            </flex-column-body>
        </flex-row>
    </flex-column>
</template>
<script>
import FluroModalMixin from 'src/mixins/ModalMixin.js';
import FluroExpressionEditor from 'src/components/form/FluroExpressionEditor.vue';

export default {
    components: {
        FluroExpressionEditor,
    },
    props: {
        options: {
            type: Object
        }
    },
    computed: {
    	modifierDescription() {
    		switch(this.model.operation) {
    			case 'add':
    				return 'The value returned will be added to the calculated total';
    			break;
    			case 'subtract':
    				return 'The value returned will be subtracted from the calculated total';
    			break;
    			case 'multiply':
    				return 'The calculated total will be multipled by the value returned';
    			break;
    			case 'divide':
    				return 'The calculated total will be divided by the value returned';
    			break;
    			case 'set':
    				return 'The calculated total will be set to match the value returned';
    			break;
    		}
    	},
    	operators() {

    		var array = [];

    		array.push({
    			value:'add',
    			text:'Add'
    		})

    		array.push({
    			value:'subtract',
    			text:'Subtract'
    		})

    		array.push({
    			value:'multiply',
    			text:'Multiply'
    		})

    		array.push({
    			value:'divide',
    			text:'Divide'
    		})

    		array.push({
    			value:'set',
    			text:'Set to'
    		})

    		return array;
    		
						
    	},
        model() {
            return this.options.item;
        }
    },
    methods: {
        done() {
            this.close(this.model);
        }
    },
    mixins: [FluroModalMixin],
}
</script>
<style lang="scss">

.help {
	background: #eee;
	border-left: 1px solid rgba(#000, 0.05);
}
</style>