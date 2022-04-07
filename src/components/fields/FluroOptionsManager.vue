<template>
	<fluro-panel>
		<table>
			<thead>
				<tr>
					<th></th>
					<th>Name</th>
					<th>Value</th>
					<th></th>
				</tr>
			</thead>
			<draggable class="options-manager-items" @sort="sorted" element="tbody" handle=".handle" v-model="model">
				<tr class="option" :key="option.name" v-for="(option, index) in model">
					<td class="handle">
						<fluro-icon icon="arrows" />
					</td>
					<td>
						<input
							@change="commit($event, model[index], 'name')"
							:value="model[index].name"
							placeholder="Name"
						/>
					</td>
					<td>
						<input
							@change="commit($event, model[index], 'value')"
							:value="model[index].value"
							placeholder="Value"
						/>
					</td>
					<td>
						<v-btn class="ma-0" @click="remove(model[index])" icon small>
							<fluro-icon icon="trash-alt" />
						</v-btn>
					</td>
				</tr>
			</draggable>
		</table>
		<fluro-panel-title>
			<form @submit.prevent.stop="addOption">
				<v-layout>
					<v-flex xs6>
						<input class="input" ref="name" v-model="proposed.name" placeholder="Name" />
					</v-flex>
					<v-spacer />
					<v-flex xs6>
						<input class="input" v-model="proposed.value" placeholder="Value" />
					</v-flex>
					<v-spacer />
					<v-flex shrink>
						<v-btn small color="primary" type="submit" class="ma-0">Add</v-btn>
					</v-flex>
				</v-layout>
			</form>
		</fluro-panel-title>
	</fluro-panel>
</template>
<script>
import draggable from 'vuedraggable';
import _ from 'lodash';

export default {
	components: {
		draggable,
	},
	props: {
		value: {
			type: Array,
		},
	},
	data() {
		return {
			proposed: {
				name: '',
				value: '',
			},
			model: this.value,
		};
	},
	created() {
		var self = this;

		if (!self.value) {
			self.$set(self, 'model', []);
		}

		self.$emit('input', self.model);
	},
	watch: {
		value(v) {
			if (this.model != v) {
				this.model = v;
			}
		},
		model(v) {
			this.$emit('input', v);
		},
		'proposed.name': function (name) {
			this.proposed.value = name;
		},
	},
	methods: {
		commit($event, option, key) {
			if (key == 'name' || key == 'title') {
				this.$set(option, 'name', $event.target.value);
				this.$set(option, 'title', $event.target.value);
				return;
			}

			this.$set(option, key, $event.target.value);
			// console.log('COMMIT', $event, option, key);
		},
		sorted() {
			var self = this;
			self.$emit('input', self.model);
		},
		remove(option) {
			this.model.splice(this.model.indexOf(option), 1);
		},
		addOption() {
			console.log('Add copy');
			var self = this;
			var copy = JSON.parse(JSON.stringify(self.proposed));

			if (
				_.some(self.model, function (option) {
					return option.value == self.proposed.value;
				})
			) {
				return;
			}

			self.model.push(copy);
			self.proposed = {
				name: '',
				value: '',
			};

			self.$refs.name.focus();
		},
	},
	computed: {},
};
</script>
<style lang="scss" scoped>
table {
	width: 100%;
	border-collapse: collapse;

	thead {
		th {
			background: #eee;
			font-size: 10px;
			padding: 4px;
		}
	}
}

.input {
	background: #fff;
	border-radius: 2px;
	border: 1px solid rgba(#000, 0.1);
	padding: 3px;
	height: 30px;
	line-height: 30px;
	display: block;
	width: 100%;
}

.option {
	td {
		padding: 4px;
		border-bottom: 1px solid rgba(#000, 0.05);

		input {
			width: 100%;
			display: block;
		}
	}

	.handle {
		width: 10px;

		svg {
			opacity: 0;
		}
	}

	&:hover {
		.handle svg {
			opacity: 0.5;
		}
	}
}
</style>
