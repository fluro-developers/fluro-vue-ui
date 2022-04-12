<template>
	<div>
		<fluro-page-preloader v-if="loading" contain />
		<template v-else>
			<!-- <pre>{{teamGroups}}</pre> -->
			<v-input class="no-flex" v-for="group in teamGroups" :key="group._id">
				<v-label>{{ group.title }}</v-label>
				<list-group>
					<template v-for="team in group.teams">
						<list-group-item
							@click="$fluro.global.view(team)"
							:item="team"
							:firstLine="team.positions | comma"
							:key="team._id"
						>
							<template v-slot:right>
								<v-menu
									:left="true"
									v-model="actionIndexes[team._id]"
									:fixed="true"
									transition="slide-y-transition"
									offset-y
								>
									<template v-slot:activator="{ on }">
										<v-btn @click.stop.prevent class="ma-0" icon small flat v-on="on">
											<fluro-icon v-if="actionIndexes[team._id]" icon="times" />
											<fluro-icon v-else icon="ellipsis-h" />
										</v-btn>
									</template>
									<v-list dense>
										<v-list-tile @click="$actions.open([team])">
											<v-list-tile-content>Actions</v-list-tile-content>
										</v-list-tile>
										<v-list-tile @click="leave(team)" v-if="canLeave(team)">
											<v-list-tile-content
												>Remove {{ model.firstName }} from group</v-list-tile-content
											>
										</v-list-tile>
									</v-list>
								</v-menu>
								<!-- <v-btn class="ma-0" small icon @click.stop.prevent="$actions.open([item])">
                                <fluro-icon icon="ellipsis-h" />
                            </v-btn> -->
							</template>
						</list-group-item>
					</template>
				</list-group>
				<template v-if="canAdd(group.key)">
					<v-btn small color="primary" @click="select(group.key)" class="ml-0">
						Add {{ group.title }}
						<fluro-icon right icon="plus" />
					</v-btn>
				</template>
				<!-- <pre>{{group.key}}</pre> -->
				<!-- <fluro-content-select-button color="primary" :type="group.key" v-model="newGroups" /> -->
			</v-input>
		</template>
	</div>
</template>
<script>
import ListGroup from '../../../ui/ListGroup.vue';
import ListGroupItem from '../../../ui/ListGroupItem.vue';

import FluroContentSelectModal from '../../../form/contentselect/FluroContentSelectModal.vue';
import FluroSelector from '../../../form/contentselect/FluroSelector.vue';
import Vue from 'vue';
import _ from 'lodash';

export default {
	props: {
		value: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			actionIndexes: {},
			model: this.value,
			loading: true,
			newGroups: [],
			teams: [],
		};
	},
	created() {
		console.log('RELOAD TEAMS');
		this.reloadTeams();
	},
	methods: {
		canLeave(group) {
			var self = this;
			var definition = group.definition;
			var canLeaveGroupsOfThisType = this.$fluro.access.can('leave', definition, 'team');
			return canLeaveGroupsOfThisType || self.$fluro.access.canEditItem(group);
		},
		canAdd(definition) {
			var self = this;
			var canAddGroupsOfThisType = this.$fluro.access.can('join', definition, 'team');
			var canEditGroupsOfThisType = this.$fluro.access.can('edit', definition, 'team');
			return canAddGroupsOfThisType || canEditGroupsOfThisType;
		},
		leave(team) {
			var self = this;

			//Get the ids from the teams
			var teamID = self.$fluro.utils.getStringID(team);
			self.loading = true;

			//////////////////////////////////

			var promise = self.$batch
				.run({
					operation: 'remove from team',
					ids: [self.contactID],
					teams: [teamID],
				})
				.then(function (res) {
					var index = _.findIndex(self.teams, { _id: teamID });
					self.teams.splice(index, 1);
					self.loading = false;
				})
				.catch(function (err) {
					console.log('TEAMS ERR', err);
					self.reloadTeams();
				});
		},
		select(type) {
			var self = this;

			//Ugly hack, but it's gotta be done unfortunately
			var SelectionManager = Vue.extend(FluroSelector);
			var instance = new SelectionManager({
				propsData: {
					minimum: 0,
					maximum: 0,
				},
			});

			// var isBasicType = self.$fluro.types.isBasicType(type);

			var promise = self.$fluro
				.modal({
					component: FluroContentSelectModal,
					options: {
						allDefinitions: false, //isBasicType,
						selector: instance, //Vue(FluroSelector),
						type,
						minimum: 0,
						maximum: 0,
					},
				})
				.then(function (items) {
					if (!items || !items.length) {
						return;
					}

					self.loading = true;

					//Get the ids from the teams
					var teamIDs = self.$fluro.utils.arrayIDs(items);

					//////////////////////////////////

					var promise = self.$batch
						.run({
							operation: 'add to team',
							ids: [self.contactID],
							teams: teamIDs,
						})
						.then(function (res) {
							console.log('TEAMS ADDED', res);
							// self.teams = self.teams.concat(items);
							// self.loading = false;
							self.reloadTeams();
						})
						.catch(function (err) {
							console.log('TEAMS ERR', err);
							self.reloadTeams();
						});
				});
		},
		reloadTeams() {
			var self = this;
			self.loading = true;

			self.$fluro.api
				.get(`/contact/${self.contactID}/teams`)
				.then(function (res) {
					self.teams = res.data;
					self.loading = false;
				})
				.catch(function (err) {
					self.loading = false;
				});
		},
	},
	components: {
		ListGroup,
		ListGroupItem,
		// FluroContentSelectButton,
		FluroContentSelectModal,
	},
	computed: {
		contactID() {
			return this.$fluro.utils.getStringID(this.model);
		},
		teamGroups() {
			var self = this;

			////////////////////////////////////////////////////

			var allSets = _.reduce(
				self.teamDefinitions,
				function (set, definition) {
					set[definition.definitionName] = {
						title: definition.plural,
						teams: [],
						key: definition.definitionName,
					};

					return set;
				},
				{
					team: {
						title: 'Groups and Teams',
						teams: [],
						key: 'team',
					},
				}
			);

			////////////////////////////////////////////////////

			return _.chain(self.teams)
				.reduce(function (set, team) {
					var teamType = team.definition || 'team';
					var existingGroup = set[teamType];
					if (!existingGroup) {
						existingGroup = set[teamType] = {
							title: self.$fluro.types.readable(teamType, true),
							teams: [],
						};
					}

					existingGroup.teams.push(team);

					return set;
				}, allSets)
				.values()
				.orderBy(function (set) {
					return set.teams.length;
				})
				.reverse()
				.value();
		},
	},
	asyncComputed: {
		teamDefinitions: {
			default: [],
			get() {
				var self = this;
				return self.$fluro.types.subTypes('team');
			},
		},
	},
};
</script>
<style lang="scss"></style>
