<template>
	<div class="content-select-button">
		<v-layout style="padding:0; margin:0;">
			<v-flex style="padding:0; margin:0;">
				<v-btn :small="small" :large="large" :color="color" :block="block" class="pill ma-0" @click.native="showModal">
					<span>{{selectionSummary}}</span>
				</v-btn>
			</v-flex>
			<v-flex style="padding:0; margin:0;" shrink v-if="canCreate">
				<v-btn v-tippy :content="createTooltip" icon :small="small" :large="large" color="primary" class="pill my-0 mr-0 ml-1" @click.native="create">
					<fluro-icon icon="plus" />
				</v-btn>
			</v-flex>
		</v-layout>
	</div>
</template>
<script>
import Vue from 'vue';
import _ from 'lodash';

///////////////////////////////////////////////

import FluroContentSelectModal from 'src/components/form/contentselect/FluroContentSelectModal.vue';
// import FluroSelector from 'src/components/form/contentselect/FluroSelector.vue';
import FluroSelector from 'src/components/form/contentselect/FluroSelector.vue';
// import FluroSelectorFactory from 'src/components/form/contentselect/FluroSelectorFactory';

///////////////////////////////////////////////

export default {
	props: {
		createDisabled: {
			type: Boolean,
		},
		label: {
			type: String,
		},

		filter: {
			type: Object,
			default () {
				return {
					operator: 'and',
					filters: [{
						operator: 'and',
						filters: [{
							key: 'status',
							comparator: 'in',
							values: ['active', 'draft'],
						}, ]
					}]
				}
			},
		},
		small: {
			type: Boolean,
		},
		block: {
			type: Boolean,
		},
		large: {
			type: Boolean,
		},
		color: {
			type: String,
		},
		searchInheritable: {
			type: Boolean,
			default: true,
		},
		allDefinitions: {
			type: Boolean,
		},
		singleValue: {
			type: Boolean,
		},
		'type': {
			//The type of thing we are selecting realms for
			type: String,
			default () {
				return 'node';
			}
		},

		'minimum': {
			type: Number,
			default: 0,
		},
		'maximum': {
			type: Number,
			default: 0,
		},
		'value': {
			// type: [Array, Object],
		},
	},
	computed: {
		createTooltip() {
			return `Create new ${this.$fluro.types.readable(this.type)}`;
		},
		canCreate() {
			var self = this;
			return !self.createDisabled && self.$fluro.access.can('create', this.type);
		},
		selection() {
			return this.selector ? this.selector.selection : [];
		},
		title() {
			return this.$fluro.types.readable(this.type, false);
		},
		plural() {
			return this.$fluro.types.readable(this.type, true);
		},
		selectionSummary() {


			var self = this;

			///////////////////////////////////////

			var matchingSelection = _.filter(self.selection, function(entry) {
				if (!entry) {
					return;
				}

				if (!self.type || self.type == 'node') {
					return true;
				}

				return entry.definition ? entry.definition == self.type : (entry._type == self.type)
			})

			///////////////////////////////////////


			///////////////////////////////////////

			if (!matchingSelection.length) {
				if (self.label && self.label.length) {
					return self.label;
				} else {
					return self.small ? `Select ${self.plural}` : `Click to select ${self.plural}`
				}
			}

			///////////////////////////////////////

			if (matchingSelection.length > 3) {
				return `${matchingSelection.length} ${self.plural} selected`;
			}

			///////////////////////////////////////

			return _.map(matchingSelection, 'title').join(', ');
		}
	},
	created() {
		var self = this;







		var SelectionManager = Vue.extend(FluroSelector);
		var defaultValue = self.singleValue ? [self.value] : self.value;

		self.selector = new SelectionManager({
			propsData: {
				minimum: self.minimum,
				maximum: self.maximum,
				allDefinitions: self.allDefinitions,
				searchInheritable: self.searchInheritable,
				value: defaultValue,
			}
		});




		// self.selector.$fluro = self.$fluro;
	},
	data() {


		return {
			selector: null,
		}
	},

	watch: {
		minimum(v) {
			this.selector.minimum = v;
		},
		maximum(v) {
			this.selector.maximum = v;
		},
		value(v) {
			//Set the value so update the selection
			this.selector.value = this.singleValue ? [v] : v;
		},
		selection(model) {
			if (this.singleValue) {
				model = _.first(model)
			}
			// console.log('EMIT CHANGE', this.singleValue || 'multiple', model);
			this.$emit('input', model);
		}
	},
	methods: {
		create() {
			var self = this;


			self.$fluro.global.create(self.type, { disableCacheClearOnSave: true }, true)
				.then(function(res) {

					self.selector.select(res);
				})

		},
		showModal() {

			var self = this;

			//////////////////////////////////////

			var promise = self.$fluro.modal({
				component: FluroContentSelectModal,
				options: {
					selector: self.selector,
					type: self.type,
					allDefinitions: self.allDefinitions,
					searchInheritable: self.searchInheritable,
					filter: self.filter,
				}
			});

			//////////////////////////////////////

		},
	}
}

</script>
<style lang="scss">
</style>
