import Vue from 'vue';
import FluroSelectionMixin from '../../../mixins/FluroSelectionMixin.js';

///////////////////////////////////////////////

export default {
	create() {
		return {
			props: {
				minimum: {
					type: Number,
					default: 0,
				},
				maximum: {
					type: Number,
					default: 0,
				},
				allDefinitions: {
					type: Boolean,
				},
				value: {
					type: Array,
					default: function () {
						return [];
					},
				},
			},
			data() {
				return {
					selectionMinimum: this.minimum,
					selectionMaximum: this.maximum,
				};
			},

			created() {
				this.setSelection(this.value);
			},
			mixins: [FluroSelectionMixin],
			watch: {
				minimum(v) {
					this.selectionMinimum = Math.max(parseInt(v), 0);
				},
				maximum(v) {
					var self = this;

					self.selectionMaximum = Math.max(parseInt(v), 0);

					if (self.selectionMaximum) {
						if (self.value.length > self.selectionMaximum) {
							var cropped = self.value.slice(0, self.selectionMaximum);
							self.setSelection(cropped);

							// console.log('Crop array', cropped)
						}
					}
				},
				value: function (v) {
					// console.log('SET SELECTION', v);
					//Set the value so update the selection
					this.setSelection(v);
				},
				selection: function (s) {
					var self = this;
					// console.log('Selection is now', s);
					this.$emit('input', s);
				},
			},
		};
	},
};
