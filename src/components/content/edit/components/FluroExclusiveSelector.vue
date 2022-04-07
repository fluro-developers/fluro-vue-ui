<template>
	<div class="py-3">
		<div class="all-selection pb-2">
			<fluro-checkbox :isChecked="workingModel[0]" :label="allLabel" @click="toggle(0)" />
			<span class="muted mb-0 show-text noselect" @click="toggleShown()"> ({{ showAll ? 'Less' : 'More' }})</span>
		</div>
		<div class="individual-selection" v-if="showAll" v-for="(option, index) in otherOptions">
			<fluro-checkbox
				:isChecked="workingModel[index + 1]"
				:label="otherOptions[index]"
				@click="toggle(index + 1)"
			/>
		</div>
	</div>
</template>
<script>
import FluroCheckbox from './FluroCheckbox.vue';

/////////////////////////////////

export default {
	props: {
		allLabel: {
			type: String,
			default: '',
		},
		otherOptions: {
			type: Array,
			default: function () {
				return [];
			},
		},
		value: {
			type: Object,
		},
		path: {
			type: String,
		},
	},
	components: {
		FluroCheckbox,
	},
	data() {
		return {
			model: {},
			workingModel: [true],
			showAll: false,
		};
	},
	created() {
		var self = this;
		//console.log('EXCLUSIVE SELECTOR CREATED: VALUE',self.value[self.path])
		self.model[self.path] = self.value[self.path] || {};
		//console.log('MODEL INIT:', self.model[self.path])
		if (!self.model[self.path]) {
			self.$set(self.model, self.path, ['']);
		} else if (!self.model[self.path].length) {
			self.$set(self.model, self.path, ['']);
		}
		//console.log('POST IF', self.model[self.path])
		self.maintainWorkingModel();
	},
	watch: {
		otherOptions: function () {
			// console.log('OTHER OPTIONS CHANGED')
			return this.maintainWorkingModel();
		},
		value: function () {
			var self = this;
			//console.log('VALUE CHANGED', self.value[self.path])
			self.$set(self.model, self.path, self.value[self.path]);
			return self.maintainWorkingModel();
		},
	},
	methods: {
		maintainWorkingModel() {
			var self = this;
			var optionsLength = self.otherOptions.length + 1;
			//console.log('WORKING MODEL LENGTH',self.workingModel.length)
			for (let i = 0; i < optionsLength; i++) {
				//console.log('MAINTAIN ITER', i, self.workingModel, self.model[self.path])
				if (i == 0) {
					if (self.model[self.path].length == 1 && self.model[self.path][0] === '') {
						self.$set(self.workingModel, 0, true);
					} else {
						self.$set(self.workingModel, 0, false);
					}
				} else if (self.model[self.path].includes(self.otherOptions[i - 1].toLowerCase())) {
					self.$set(self.workingModel, i, true);
				} else if (
					self.allLabel == 'Default Channels' &&
					self.otherOptions[i - 1] == 'Push Notification' &&
					self.model[self.path].includes('push')
				) {
					self.$set(self.workingModel, i, true);
				} else {
					self.$set(self.workingModel, i, false);
				}
			}
			self.updateActualModel();
		},
		toggle(ind) {
			var self = this;

			if (ind == 0) {
				self.$set(self.workingModel, 0, true);
				for (let i = 1; i < self.workingModel.length; i++) {
					self.$set(self.workingModel, i, false);
				}
			} else {
				self.$set(self.workingModel, ind, !self.workingModel[ind]);
				if (!self.workingModel.slice(1).includes(true)) {
					self.$set(self.workingModel, 0, true);
				} else {
					self.$set(self.workingModel, 0, false);
				}
			}
			self.updateActualModel();
		},
		updateActualModel() {
			var self = this;
			if (self.workingModel[0]) {
				self.$set(self.model, self.path, ['']);
			} else {
				//console.log('CURRENT WORKING MODEL', self.workingModel, self.model[self.path]);
				self.$set(self.model, self.path, []);
				(self.workingModel.slice(1) || []).forEach(function (bool, ind) {
					//console.log('UPDATE ACTUAL MODEL', ind, self.model[self.path])
					if (bool) {
						if (self.allLabel == 'Default Channels' && self.otherOptions[ind] == 'Push Notification') {
							self.$set(self.model[self.path], self.model[self.path].length, 'push');
						} else {
							self.$set(
								self.model[self.path],
								self.model[self.path].length,
								self.otherOptions[ind].toLowerCase()
							);
						}
					}
				});
			}
			//console.log(self.model[self.path]);
			self.$emit('change', self.model[self.path]);
		},
		toggleShown() {
			return (this.showAll = !this.showAll);
		},
	},
};
</script>
<style>
.individual-selection {
	padding: 2.5px 0;
}

.all-selection {
	display: inline-block;
}

.show-text {
	cursor: pointer;
}

.noselect {
	-webkit-touch-callout: none;
	/* iOS Safari */
	-webkit-user-select: none;
	/* Safari */
	-khtml-user-select: none;
	/* Konqueror HTML */
	-moz-user-select: none;
	/* Old versions of Firefox */
	-ms-user-select: none;
	/* Internet Explorer/Edge */
	user-select: none;
	/* Non-prefixed version, currently
                                  supported by Chrome, Opera and Firefox */
}
</style>
