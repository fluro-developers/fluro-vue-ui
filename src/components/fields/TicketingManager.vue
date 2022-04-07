<template>
	<div class="ticketing-manager">
		<div>
			<div class="ticket-entry" v-for="row in model">
				<v-layout align-center>
					<v-flex shrink style="padding-right: 8px">
						<fluro-icon library="fas" icon="ticket-alt" />
					</v-flex>
					<v-flex>
						<strong>{{ row.title }}</strong>
						<div v-if="row.event">
							<strong>{{ row.event.title }}</strong>
							<div class="font-sm muted">{{ row.event | readableEventDate }}</div>
						</div>
					</v-flex>
					<v-flex shrink>
						<v-btn class="ma-0 mr-1" @click="select(row)" icon small>
							<fluro-icon icon="pencil" />
						</v-btn>
						<v-btn class="ma-0" @click="remove(row)" icon small>
							<fluro-icon icon="trash-alt" />
						</v-btn>
					</v-flex>
				</v-layout>
			</div>
		</div>
		<!-- <v-btn large block class="mx-0" @click="showModal">
            <span>{{selectionSummary}}</span>
        </v-btn> -->
		<v-btn class="ml-0" color="primary" @click="add">
			Add Configuration
			<fluro-icon icon="plus" right />
		</v-btn>
	</div>
</template>
<script>
import _ from 'lodash';

// import AdvancedTicketingOptionsModal from './AdvancedTicketingOptionsModal.vue';
import TicketOptionModal from './TicketOptionModal.vue';
export default {
	props: {
		field: {
			type: Object,
		},
		value: {
			type: Array,
			default() {
				return [];
			},
		},
	},
	data() {
		return {
			model: this.value,
		};
	},
	methods: {
		add() {
			var self = this;
			var fields = [];

			fields.push({
				title: 'Ticket Name',
				key: 'title',
				placeholder: `Eg. 'Adult', 'Standard', 'General Adminission'`,
				maximum: 1,
				minimum: 1,
				type: 'string',
			});

			fields.push({
				title: 'For Event',
				key: 'event',
				maximum: 1,
				minimum: 0,
				type: 'reference',
				params: {
					restrictType: 'event',
					allDefinitions: true,
					referenceFilter: {
						startDate: new Date(),
						endDate: self.$fluro.date.moment().add(1, 'year').toDate(),
					},
				},
			});

			self.$fluro.prompt(fields, 'Ticketing').then(function (res) {
				self.model.push(res);
			});
		},

		select(row) {
			var self = this;

			//////////////////////////////////////

			var promise = self.$fluro.modal({
				// component: AdvancedTicketingOptionsModal,
				component: TicketOptionModal,
				options: {
					// field: self.field,
					model: row,

					// self.model,
				},
			});
		},
		remove(row) {
			var self = this;

			self.$fluro
				.confirm('Are you sure you want to remove this ticketing configuration?', null, {
					confirmColor: 'error',
					confirmText: 'Confirm Delete',
				})
				.then(function (res) {
					var index = self.model.indexOf(row);
					if (index == -1) {
						return;
					}
					self.model.splice(index, 1);
				});
		},
	},
	computed: {
		// select(row) {
		//     var self = this;
		//     if (!self.model || !self.model.length) {
		//         return 'Advanced Ticket Options'
		//     }
		//     return _.map(self.model, function(entry) {
		//         return `${entry.title} - ${entry.event.title}`
		//     }).join(', ');
		// },
	},
	watch: {
		value(v) {
			this.model = v;
		},
	},
};
</script>
<style lang="scss">
.ticketing-manager {
	margin: 10px 0;
}
.ticket-entry {
	padding: 5px;
	border: 1px solid rgba(#000, 0.1);
	border-top: none;
	background: #fff;

	&:first-child {
		border-top: 1px solid rgba(#000, 0.1);
		border-radius: 3px 3px 0 0;
	}

	&:last-child {
		border-radius: 0 0 3px 3px;
	}
}
</style>
