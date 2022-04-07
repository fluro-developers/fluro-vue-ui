<template>
	<div class="access-pass-select">
		<v-input class="no-flex" v-if="selected.length">
			<h5 margin>{{ selected.length }} selected</h5>
			<list-group>
				<transition-group type="transition" name="flip-list">
					<list-group-item :key="pass._id" v-for="pass in selected">
						<template v-slot:left>
							<fluro-realm-bar :realm="pass.realms" />
						</template>
						<template v-slot:default>
							<strong>{{ pass.title }}</strong>
							<div class="muted sm">{{ pass.description }}</div>
						</template>
						<template v-slot:right>
							<v-btn class="my-0" icon small @click="edit(pass)">
								<fluro-icon icon="pencil" />
							</v-btn>
							<v-btn class="my-0" small @click="deselect(pass)">
								Remove from {{ contextName }}
								<fluro-icon icon="times" right />
							</v-btn>
						</template>
					</list-group-item>
				</transition-group>
			</list-group>
		</v-input>
		<p></p>
		<v-input class="no-flex" v-if="notSelected.length">
			<h5>Available passes</h5>
			<p class="help-block">Add passes to {{ contextName }} by selecting from available passes below</p>
			<list-group>
				<transition-group type="transition" name="flip-list">
					<list-group-item :key="pass._id" class="inactive" v-for="pass in notSelected">
						<template v-slot:left>
							<fluro-realm-bar :realm="pass.realms" />
						</template>
						<template v-slot:default>
							<strong>{{ pass.title }}</strong>
							<div class="muted sm">{{ pass.description }}</div>
							<!-- <pre>{{pass}}</pre> -->
						</template>
						<template v-slot:right>
							<v-btn class="my-0" icon small @click="edit(pass)">
								<fluro-icon icon="pencil" />
							</v-btn>
							<v-btn class="my-0" color="primary" small @click="select(pass)">
								Add to {{ contextName }}
								<fluro-icon right icon="plus" />
							</v-btn>
						</template>
					</list-group-item>
				</transition-group>
			</list-group>
		</v-input>
	</div>
</template>
<script>
import Vue from 'vue';
import _ from 'lodash';

import FluroRealmDots from '../ui/FluroRealmDots.vue';
import FluroSelectionMixin from '../../mixins/FluroSelectionMixin.js';
import FluroContentSelectButton from './contentselect/FluroContentSelectButton.vue';

///////////////////////////////////////////////

export default {
	computed: {
		contextName() {
			if (!this.host) {
				return '';
			}

			if (this.host.firstName) {
				return this.host.firstName;
			}

			return this.host.title || '';
		},
		selected() {
			var self = this;

			return _.chain(self.selection)
				.orderBy(function (policy) {
					return policy.title;
				})
				.value();
		},
		notSelected() {
			var self = this;

			return _.chain(self.policies)
				.filter(function (policy) {
					return !self.isSelected(policy);
				})
				.orderBy(function (policy) {
					return policy.title;
				})
				.value();
		},
	},
	components: {
		FluroRealmDots,
		FluroContentSelectButton,
	},
	mixins: [FluroSelectionMixin],
	props: {
		host: {
			type: Object,
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
			loading: true,
		};
	},
	asyncComputed: {
		policies: {
			default: [],
			get() {
				var self = this;

				return new Promise(function (resolve, reject) {
					self.$fluro.api
						.get('/content/policy')
						.then(function (res) {
							resolve(res.data);
							self.loading = false;
						})
						.catch(function (err) {
							reject(err);
							self.loading = false;
						});
				});
			},
		},
	},
	created() {
		this.setSelection(this.value);
	},
	watch: {
		value: function () {
			//Set the value so update the selection
			// console.log('SET SELECTION NOW', this.value)
			this.setSelection(this.value);
		},
		selection: function () {
			var self = this;
			//Emit the change
			this.$emit('input', self.selection);
		},
	},
	methods: {
		edit(pass) {
			var self = this;

			self.$fluro.global.edit(pass, true).then(function (res) {
				Object.assign(pass, res);
			});
		},
	},
};
</script>
<style scoped lang="scss">
.access-pass-select {
	& >>> .list-group-item-content {
		padding-left: 10px;
	}

	.flip-list-move {
		transition: transform 0.5s;
	}
}
</style>
