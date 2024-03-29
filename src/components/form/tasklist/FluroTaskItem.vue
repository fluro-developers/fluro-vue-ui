<template>
	<div
		class="fluro-task-item"
		@mouseover="over = true"
		@mouseout="over = false"
		@click="clicked()"
		:class="[model.status, { hover: over }]"
	>
		<v-layout align-center row>
			<v-flex shrink>
				<!-- @click="prompt()" -->
				<div class="task-icon" @click.stop.prevent="prompt()">
					<v-btn class="ma-0 mr-2" icon>
						<span class="checkbox-outer" :class="model.status">
							<fluro-icon library="fas" v-if="model.status == 'pending'" icon="minus" />
							<fluro-icon library="fas" v-else-if="model.status == 'failed'" icon="exclamation" />
							<fluro-icon library="fas" v-else icon="check" />
						</span>
					</v-btn>
				</div>
			</v-flex>
			<v-flex>
				<fluro-inline-edit>
					<template v-slot:default>
						<strong>{{ model.name }}</strong>
					</template>
					<template v-slot:edit="{ props, blur, focus }">
						<input
							class="input"
							@focus="focus($event)"
							@input="update"
							v-model="model.name"
							@keyup.enter="blur"
							@blur="blur"
						/>
					</template>
				</fluro-inline-edit>
				<div class="wrap">
					<fluro-inline-edit>
						<template v-slot:default>
							<div class="sm muted" v-html="model.description"></div>
							<div class="detail-placeholder">
								<div class="sm muted" v-if="!model.description || !model.description.length">
									Click here to add more description
								</div>
							</div>
						</template>
						<template v-slot:edit="{ props, blur, focus }">
							<textarea
								class="input"
								@focus="focus($event)"
								placeholder="Add more details to this task"
								@input="update"
								v-model="model.description"
								@keyup.enter="blur"
								@blur="blur"
							></textarea>
						</template>
					</fluro-inline-edit>
				</div>
			</v-flex>
			<v-flex shrink class="edit-button" @click.stop.prevent>
				<v-menu v-model="actionsOpen" :fixed="true" transition="slide-y-transition" offset-y>
					<template v-slot:activator="{ on }">
						<v-btn v-tippy content="More Options" class="ma-0" small icon v-on="on">
							<fluro-icon icon="ellipsis-h" />
						</v-btn>
					</template>
					<v-list dense>
						<v-list-tile @click="edit">
							<v-list-tile-content>Edit Task</v-list-tile-content>
						</v-list-tile>
						<v-divider />
						<v-list-tile @click="removeTask()">
							<v-list-tile-content>Delete Task</v-list-tile-content>
						</v-list-tile>
					</v-list>
				</v-menu>
			</v-flex>
		</v-layout>
	</div>
</template>
<script>
import _ from 'lodash';

/////////////////////////////////////////////

import FluroTaskModal from './FluroTaskModal.vue';
import FluroTaskEditModal from './FluroTaskEditModal.vue';
import FluroInlineEdit from '../FluroInlineEdit.vue';
import FluroEditor from '../FluroEditor.vue';

/////////////////////////////////////////////

export default {
	components: {
		FluroInlineEdit,
		FluroEditor,
	},
	props: {
		value: {
			type: Object,
			required: true,
		},
		state: {
			type: String,
		},
		// card: {
		//     type: Object,
		// },
		definition: {
			type: Object,
		},
		card: {
			type: Object,
		},
		mode: {
			type: String,
			default() {
				return 'do';
			},
		},
	},
	mounted() {
		// if (this.value.immediateModal) {
		//     this.edit();
		// }
	},
	data() {
		var copy = JSON.parse(JSON.stringify(this.value));

		if (copy.autofocus) {
			delete copy.autofocus;
		}

		if (copy.immediateModal) {
			console.log('Immediate Modal!', this.value);
			delete copy.immediateModal;
		}

		return {
			actionsOpen: false,
			over: false,
			checked: false,
			model: copy,
		};
	},
	computed: {
		states() {
			var states = _.get(this, 'definition.data.states');
			return JSON.parse(JSON.stringify(states));
		},
	},
	watch: {
		value(val) {
			this.model = val; //JSON.parse(JSON.stringify(this.value));
		},
	},
	methods: {
		clicked() {
			var self = this;
			switch (self.mode) {
				case 'edit':
					self.edit();
					break;
				default:
				case 'do':
					self.prompt();
					break;

					break;
			}
		},
		removeTask() {
			console.log('REMOVE!!');
			this.$emit('remove', this.model);
		},

		edit() {
			var self = this;

			/////////////////////////////////////

			// FluroTaskEditModal.$on('input', function(model) {
			//     console.log('INPUT BABY')
			//     self.model = model;
			// })
			//
			function callback(data) {
				console.log('MODEL', data);
				self.model = data;
				self.update();
			}

			/////////////////////////////////////

			return self.$fluro
				.modal({
					component: FluroTaskEditModal,
					options: {
						task: self.model,
						card: self.card,
						definition: JSON.parse(JSON.stringify(self.definition)),
						callback,
					},
				})
				.then(function (result) {
					console.log('MODEL RESULT', result);
					self.model = result;
					self.update();
				})
				.catch(function (err) {
					//Nothing happened
				});
		},
		update() {
			this.$emit('input', this.model);
		},
		prompt() {
			var self = this;

			if (self.mode == 'edit') {
				return;
			}

			/////////////////////////////////////

			var cardTask = this.model;

			/////////////////////////////////////

			var currentState = _.chain(self.states)
				.find(function (state) {
					if (self.card) {
						return state.key == self.card.state;
					}
				})
				.value();

			/////////////////////////////////////

			var taskLists = currentState.taskLists || [];

			var matchingTask = _.chain(taskLists)
				.map('tasks')
				.flatten()
				.find(function (task) {
					return task.name == cardTask.name;
				})
				.value();

			/////////////////////////////////////

			// var getCurrentColumnTask =
			// console.log('Prompt Task ', self.model, matchingTask)
			return self.$fluro
				.modal({
					component: FluroTaskModal,
					options: {
						task: JSON.parse(JSON.stringify(matchingTask || self.model)),
						card: self.card,
					},
				})
				.then(function (result) {
					self.$set(self.model, 'status', result);
					self.update();
				})
				.catch(function (err) {
					//Nothing happened
				});
		},
	},
};
</script>
<style lang="scss">
.fluro-task-item {
	padding: 10px 3px 5px 3px;
	// border: 1px solid rgba(#000, 0.1);
	border-radius: 3px;
	font-size: 1.1em;
	cursor: pointer;

	.input {
		display: block;
		padding: 5px;
		background: #fff;
		border: 1px solid $primary;
		width: 100%;
	}

	.task-icon {
		// width: 40px;
		// height: 40px;
		// line-height: 40px;
		// text-align: center;
		// margin-right: 15px;
		// font-size: 20px;
		// opacity: 0.5;
	}

	.hover,
	.detail-placeholder,
	.edit-button {
		opacity: 0;
	}

	&:hover {
		opacity: 0.8;
		// border-color: rgba(#000, 0.4);
		// background: #fafafa;

		.hover,
		.detail-placeholder,
		.edit-button {
			opacity: 1;
		}
	}

	&.complete {
		// background-color: lighten($success, 15%);
		// background-color: lighten($success, 35%);
		// border-color: $success;
		// color: darken($success, 30%);
		color: rgba(darken($success, 30%), 0.4);
		text-decoration: line-through;
	}

	&.pending {
		// background-color: lighten($warning, 20%);
		background-color: lighten($warning, 35%);
		border-color: $warning;
		color: darken($warning, 10%);
	}

	&.failed {
		// background-color: lighten($danger, 15%);
		background-color: lighten($danger, 35%);
		border-color: $danger;
		color: darken($danger, 30%);
	}

	p:last-child {
		margin-bottom: 0;
	}

	.wrap {
		max-width: 500px;
	}

	.v-btn {
		.checkbox-outer {
			background: #fff;
			border-radius: 2px;
			border: 2px solid rgba(#000, 0.2);
			width: 25px;
			height: 25px;
			display: inline-block;
			padding: 0;
			margin: 0;
			line-height: 25px;
			text-align: center;
			font-size: 14px;

			svg {
				opacity: 0;
			}

			&.complete {
				background: $success; // #4cc650;
				color: #fff;
				border-color: $success !important;

				svg {
					opacity: 1;
				}
			}

			&.failed {
				background: $danger; // #4cc650;
				color: #fff;
				border-color: $danger !important;

				svg {
					opacity: 1;
				}
			}

			&.pending {
				background: $warning; // #4cc650;
				color: #fff;
				border-color: $warning !important;

				svg {
					opacity: 1;
				}
			}
		}

		&:hover {
			.checkbox-outer {
				border: 2px solid rgba(#000, 0.5);

				svg {
					opacity: 0.5;
				}
			}
		}
	}
}
</style>
