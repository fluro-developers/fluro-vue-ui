<template>
	<flex-column class="fluro-options-dialog">
		<flex-column-header class="border-bottom" v-if="title || description">
			<v-container>
				<h3 v-if="title">{{ title }}</h3>
				<div class="muted" v-if="description">{{ description }}</div>
			</v-container>
		</flex-column-header>
		<flex-column-body>
			<!-- <pre>{{actions}}</pre> -->
			<v-container style="background: #fff">
				<template v-for="(action, i) in actions">
					<div class="detail-button" @click="select(action)" v-if="action.description" :key="i">
						<v-layout align-center>
							<v-flex v-if="action.icon" shrink style="padding-right: 10px">
								<fluro-icon :icon="action.icon" />
							</v-flex>
							<v-flex>
								<h5>
									<v-layout>
										<v-flex>
											{{ action.title }}
										</v-flex>
										<v-spacer />
										<v-flex class="text-xs-right" shrink>
											<fluro-icon icon="angle-right" />
										</v-flex>
									</v-layout>
								</h5>
								<div class="sm muted">{{ action.description }}</div>
							</v-flex>
						</v-layout>
					</div>
					<template v-else>
						<template v-if="webMode">
							<fluro-button block @click="select(action)" :key="i">
								{{ action.title }}
							</fluro-button>
						</template>
						<template v-else>
							<v-btn block color="primary" @click="select(action)" :key="i">
								{{ action.title }}
							</v-btn>
						</template>
					</template>
				</template>
			</v-container>
			<!-- <v-list>
                <v-list-tile v-for="action in actions" @click="select(action)">

                    <v-list-tile-content>
                        <v-list-tile-title>{{action.title}}</v-list-tile-title>
                        <v-list-tile-sub-title v-if="action.description">{{action.description}}</v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                        <fluro-icon library="far" :icon="action.icon" :type="action.iconType" />
                    </v-list-tile-action>


                </v-list-tile>
            </v-list> -->
			<!-- <v-container class="py-1 px-2">

                <v-btn block v-for="action in actions" @click="select(action)">
                    {{action.title}}
                </v-btn>

            </v-container> -->
		</flex-column-body>
		<flex-column-footer class="border-top">
			<v-container class="py-1 px-2">
				<template v-if="webMode">
					<fluro-button block @click="dismiss()"> Cancel </fluro-button>
				</template>
				<template v-else>
					<v-btn block @click="dismiss()"> Cancel </v-btn>
				</template>
			</v-container>
		</flex-column-footer>
	</flex-column>
</template>
<script>
import ModalMixin from '../../../mixins/ModalMixin';

export default {
	props: {
		options: {
			type: Object,
		},
	},
	mixins: [ModalMixin],
	data() {
		return {};
	},
	computed: {
		webMode() {
			return this.options.webMode;
		},
		title() {
			return this.options.title;
		},
		description() {
			return this.options.description;
		},
		actions() {
			return this.options.options;
		},
	},
	asyncComputed: {},
	methods: {
		select(option) {
			// console.log('SELECTED OPTION FROM DIALOG', option);
			var self = this;
			self.close(option);

			//If there is a callback registered
			//then fire the callback
			if (option.action) {
				option.action();
			}
		},
		// act() {
		//     var self = this;

		//     //Run a batch
		//     var promise = self.$batch.run({
		//         operation: 'remove tag',
		//         ids: self.ids,
		//         tags: self.$fluro.utils.arrayIDs(self.selectedTags),
		//     });

		//     //Close the modal with the promise
		//     return self.close(promise)

		// },
	},
};
</script>
<style lang="scss">
.fluro-options-dialog {
	min-width: 300px;
	// max-width: 500px;
	text-align: center;

	.detail-button {
		border: 1px solid #ddd;
		background: #fff;
		padding: 10px;
		border-radius: 3px;
		text-align: left;
		margin-bottom: 2px;
		cursor: pointer;

		&:hover {
			background: #fafafa;
			border-color: $primary;
		}
	}

	.v-list__tile__title {
		font-size: 0.9em;
		font-weight: 500;
	}
}
</style>
