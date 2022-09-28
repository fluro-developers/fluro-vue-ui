<template>
	<flex-column class="modal-size" style="max-width: 400px">
		<flex-column-header class="border-bottom">
			<page-header type="ticket">
				<template v-slot:left>
					<div>
						<h3>{{ field.title }} <span class="small text-muted">Tickets</span></h3>
						<div class="sm muted">Create tickets for specific events for each {{ field.title }} entry</div>
					</div>
				</template>
				<template v-slot:right>
					<v-btn class="ma-0" @click="close()"> Close </v-btn>
				</template>
			</page-header>
		</flex-column-header>
		<flex-column-body>
			<!-- <pre>{{field}}</pre> -->
			<v-container fluid py-2 class="border-bottom" v-for="(entry, index) in model">
				<v-layout align-center>
					<v-flex xs3>
						<fluro-icon left library="fas" type="ticket" /> <strong>{{ entry.title }}</strong>
					</v-flex>
					<v-flex>
						<v-layout align-center>
							<v-flex shrink>
								<fluro-realm-dots :realms="entry.event.realms" />
							</v-flex>
							<v-flex v-if="entry.event">
								<strong>{{ entry.event.title }}</strong>
								<div class="sm muted">
									{{ entry.event.firstLine }} {{ entry.event | readableEventDate }}
								</div>
							</v-flex>
						</v-layout>
					</v-flex>
					<v-flex shrink>
						<v-btn small v-tippy content="More" class="ma-0 mr-1" icon @click="toggleExpanded(index)">
							<fluro-icon :icon="entry.expanded ? 'angle-down' : 'angle-up'" />
						</v-btn>
						<v-btn small v-tippy content="Remove" class="ma-0" icon @click="removeEntry(index)">
							<fluro-icon icon="trash-alt" />
						</v-btn>
					</v-flex>
				</v-layout>
			</v-container>
		</flex-column-body>
		<flex-column-footer class="border-top">
			<v-container fluid style="background: #fff" grid-list-sm>
				<fluro-content-form v-model="proposed" :fields="fields">
					<template v-slot:form="{ formFields, fieldHash, model, update, options }">
						<v-layout>
							<v-flex xs5>
								<fluro-content-form-field :field="fieldHash.title" v-model="model" />
							</v-flex>
							<v-flex xs5>
								<fluro-content-form-field :field="fieldHash.event" v-model="model" />
							</v-flex>
							<v-flex xs2>
								<v-btn block small color="primary" @click="add">
									Add
									<fluro-icon icon="plus" />
								</v-btn>
							</v-flex>
						</v-layout>
					</template>
				</fluro-content-form>
			</v-container>
		</flex-column-footer>
	</flex-column>
</template>
<script>
import FluroModalMixin from '../../mixins/ModalMixin.js';
import FluroContentForm from '../form/FluroContentForm.vue';
import FluroContentFormField from '../form/FluroContentFormField.vue';
import FluroRealmDots from '../ui/FluroRealmDots.vue';
export default {
	props: {
		options: {
			type: Object,
			default() {
				return {};
			},
		},
	},
	data() {
		return {
			proposed: {
				title: 'Standard',
				event: null,
			},
		};
	},
	methods: {
		toggleExpanded(index) {
			var self = this;
			self.$set(self.model[index], 'expanded', !self.model[index].expanded);
		},
		removeEntry(index) {
			var self = this;
			self.model.splice(index, 1);
		},
		add() {
			var self = this;

			var copy = JSON.parse(JSON.stringify(self.proposed));
			self.model.push(copy);

			self.$set(self, 'proposed', {
				title: 'Standard',
				event: null,
			});
		},
	},
	computed: {
		model() {
			var self = this;
			return self.options.model;
		},
		field() {
			var self = this;
			return self.options.field;
		},
		fields() {
			var self = this;
			var fields = [];

			/////////////////////////////////

			addField('title', {
				title: 'Ticket Title',
				description: `What kind of ticket? Eg. Adult, VIP, Kids`,
				minimum: 1,
				maximum: 1,
				type: 'string',
				expressions: {
					defaultValue() {
						return 'Standard';
					},
				},
			});

			addField('event', {
				title: 'Events',
				description: `What events should tickets be created for?`,
				minimum: 1,
				maximum: 1,
				type: 'reference',
				directive: '',
				params: {
					restrictType: 'event',
				},
			});

			/////////////////////////////////

			function addField(key, data) {
				if (!data.key) {
					data.key = key;
				}

				fields.push(data);
			}

			return fields;
		},
	},
	components: {
		FluroRealmDots,
		FluroContentFormField,
		FluroContentForm,
	},
	mixins: [FluroModalMixin],
};
</script>
<style lang="scss"></style>
