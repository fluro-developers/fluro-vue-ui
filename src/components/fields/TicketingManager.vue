<template>
    <div class="ticketing-manager">
        <v-btn large block class="mx-0" @click="showModal">
            <span>{{selectionSummary}}</span>
        </v-btn>
    </div>
</template>
<script>


import AdvancedTicketingOptionsModal from './AdvancedTicketingOptionsModal.vue';

export default {
    props: {
    	'field':{
    		type:Object,
    	},
        'value': {
            type: Array,
            default () {
                return [];
            }
        }
    },
    data() {
        return {
            model: this.value,
        }
    },
    methods: {
        showModal() {

            var self = this;

            //////////////////////////////////////

            var promise = self.$fluro.modal({
                component: AdvancedTicketingOptionsModal,
                options: {
                	field:self.field,
                    model:self.model,
                }
            });

        },
    },
    computed: {
        selectionSummary() {

        	var self = this;

        	if(!self.model || !self.model.length) {
        		return 'Advanced Ticket Options'
        	}
            return _.map(self.model, function(entry) {
            	return `${entry.title} - ${entry.event.title}`
            }).join(', ');
        },
    },
    watch: {

    },
}
</script>