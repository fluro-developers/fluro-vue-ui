<template>
	<flex-column>
		<template v-if="!model">
			<fluro-page-preloader contain />
		</template>
		<tabset v-else :justified="true" :vertical="true">
			<tab :heading="infoHeading">
				<flex-column-body style="background: #fff">
					<v-container class="grid-list-xl">
						<constrain sm>
							<h3 margin>{{ definition ? definition.title : 'Group' }} Info</h3>
							<fluro-content-form-field
								:form-fields="formFields"
								:outline="showOutline"
								@input="update"
								:options="options"
								:field="fieldHash.title"
								v-model="model"
							/>
							<fluro-content-form-field
								:form-fields="formFields"
								:outline="showOutline"
								@input="update"
								:options="options"
								:field="fieldHash.firstLine"
								v-model="model"
							/>
							<fluro-content-form-field
								:form-fields="formFields"
								:outline="showOutline"
								@input="update"
								:options="options"
								:field="fieldHash.mainImage"
								v-model="model"
							/>
							<template v-if="definition && definition.fields && definition.fields.length">
								<fluro-content-form
									:options="options"
									v-model="model.data"
									:fields="definition.fields"
								></fluro-content-form>
							</template>
						</constrain>
					</v-container>
				</flex-column-body>
			</tab>
			<tab :heading="`${model.assignments.length} Position${model.assignments.length == 1 ? '' : 's'}`">
				<flex-column-body style="background: #fff">
					<v-container class="grid-list-xl">
						<constrain md>
							<h3>Assigned Positions</h3>
							<p>Assign contacts to specified positions eg. (Leader, Co-leader, Guitarist) below:</p>
							<group-role-manager v-model="model.assignments" :config="config" />
							<!-- <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.shareContactDetails" v-model="model" /> -->
							<fluro-content-form-field
								:form-fields="formFields"
								:outline="showOutline"
								@input="update"
								:options="options"
								:field="fieldHash.visibleAssigned"
								v-model="model"
							/>
							<!-- <v-checkbox v-model="hiddenAssigned" label="Hide from assigned contacts" hint="Should assigned contacts know they are in the group?" persistent-hint></v-checkbox> -->
							<!-- <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.mainImage" v-model="model" /> -->
							<!-- <pre>{{model}}</pre> -->
						</constrain>
					</v-container>
				</flex-column-body>
			</tab>
			<tab
				:heading="`${model.provisionalMembers.length} Member${model.provisionalMembers.length == 1 ? '' : 's'}`"
			>
				<flex-column-body style="background: #fff">
					<v-container class="grid-list-xl">
						<constrain sm>
							<h3>Provisional Members</h3>
							<p>
								Add contacts as provisional members of this group, these are usually the people who
								attend, belong to, or have subscribed to this group. People can become members of this
								group from your website, checkin system or other apps.
							</p>
							<fluro-content-form-field
								class="py-2"
								:form-fields="formFields"
								:outline="showOutline"
								@input="update"
								:options="options"
								:field="fieldHash.provisionalRoles"
								v-model="model"
							/>
							<fluro-content-form-field
								class="py-2"
								:form-fields="formFields"
								:outline="showOutline"
								@input="update"
								:options="options"
								:field="fieldHash.allowProvisional"
								v-model="model"
							/>
							<!-- <fluro-content-form-field class="py-2" :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.shareContactDetailsProvisional" v-model="model" /> -->
							<fluro-content-form-field
								class="pt-2 pb-4"
								:form-fields="formFields"
								:outline="showOutline"
								@input="update"
								:options="options"
								:field="fieldHash.visibleMembers"
								v-model="model"
							/>
							<fluro-content-form-field
								class="py-3"
								:form-fields="formFields"
								:outline="showOutline"
								@input="update"
								:options="options"
								:field="fieldHash.provisionalMembers"
								v-model="model"
							/>
						</constrain>
					</v-container>
				</flex-column-body>
			</tab>
			<tab :heading="`${model.awaitingApproval.length} Interested`">
				<flex-column-body style="background: #fff">
					<v-container class="grid-list-xl">
						<constrain sm>
							<h3>Awaiting Approval</h3>
							<p>
								Contacts who have registered their interest but have not yet been accepted as a member
								of this group
							</p>
							<fluro-content-form-field
								class="py-3"
								:form-fields="formFields"
								:outline="showOutline"
								@input="update"
								:options="options"
								:field="fieldHash.awaitingApproval"
								v-model="model"
							/>
						</constrain>
					</v-container>
				</flex-column-body>
			</tab>
			<tab heading="Recurring Events" v-if="model._id">
				<flex-column v-if="loadingTracks">
					<fluro-page-preloader contain />
				</flex-column>
				<flex-column-body v-else style="background: #fff">
					<v-container fluid>
						<v-layout align-center>
							<v-flex>
								<h3>{{ tracks.length }} Event Track{{ tracks.length == 1 ? '' : 's' }}</h3>
							</v-flex>
							<v-flex shrink>
								<v-btn
									color="primary"
									@click="createTrack()"
									v-if="$fluro.access.can('create', 'eventtrack')"
								>
									<span>Add Track</span>
									<fluro-icon icon="plus" right />
								</v-btn>
							</v-flex>
						</v-layout>
						<template v-for="(eventtrack, index) in tracks">
							<team-track-teaser v-model="tracks[index]" :key="index" />
						</template>
					</v-container>
				</flex-column-body>
			</tab>
			<!--
                        <tab heading="Upcoming Events" v-if="model._id">
                                <flex-column-body style="background: #fff;">
                                        <v-container fluid>
                                                <v-layout align-center>
                                                        <v-flex>
                                                                <h3>{{tracks.length}} Event Track{{tracks.length == 1 ? '' : 's'}}</h3>
                                                        </v-flex>
                                                        <v-flex shrink>
                                                                <v-btn color="primary" @click="createTrack()" v-if="$fluro.access.can('create', 'eventtrack')">
                                                                        <span>New Track</span>
                                                                        <fluro-icon icon="plus" right />
                                                                </v-btn>
                                                        </v-flex>
                                                </v-layout>
                                                <fluro-panel>
                                                        <tabset :justified="true">
                                                                <tab :heading="eventtrack.title" v-for="(eventtrack, index) in tracks">
                                                                        <fluro-content-view :id="tracks[index]" :embedded="true" type="eventtrack" />
                                                                </tab>
                                                        </tabset>
                                                </fluro-panel>
                                        </v-container>
                                </flex-column-body>
                        </tab>
                        <tab heading="Past Events" v-if="model._id">
                                <flex-column-body style="background: #fff;">
                                        <v-container fluid>
                                                <v-layout align-center>
                                                        <v-flex>
                                                                <h3>{{tracks.length}} Event Track{{tracks.length == 1 ? '' : 's'}}</h3>
                                                        </v-flex>
                                                        <v-flex shrink>
                                                                <v-btn color="primary" @click="createTrack()" v-if="$fluro.access.can('create', 'eventtrack')">
                                                                        <span>Add Track</span>
                                                                        <fluro-icon icon="plus" right />
                                                                </v-btn>
                                                        </v-flex>
                                                </v-layout>
                                                <fluro-panel>
                                                        <tabset :justified="true">
                                                                <tab :heading="eventtrack.title" v-for="(eventtrack, index) in tracks">
                                                                        <fluro-content-view :id="tracks[index]" :embedded="true" type="eventtrack" />
                                                                </tab>
                                                        </tabset>
                                                </fluro-panel>
                                        </v-container>
                                </flex-column-body>
                        </tab>
      -->
			<!--  <tab heading="Posts and Notes">
                <flex-column-body style="background: #fff;">
                    <v-container class="grid-list-xl">
                        <constrain md>
                            <fluro-post-feed v-model="model" />
                        </constrain>
                    </v-container>
                </flex-column-body>
            </tab> -->
			<tab heading="Position Notifications" v-if="showNotifications">
				<flex-column-body style="background: #fff">
					<v-container class="grid-list-xl">
						<constrain md>
							<notification-team-manager
								v-model="model.notifications"
								:config="config"
								:allPositions="allPositions"
							/>
						</constrain>
					</v-container>
				</flex-column-body>
			</tab>
			<tab heading="Metrics">
				<flex-column style="background: #fff">
					<tabset :justified="true">
						<tab heading="Group Size">
							<flex-column-body>
								<v-container fluid class="grid-list-xl">
									<constrain md>
										<h3 margin>Group Metrics</h3>
										<team-metrics-dashboard :id="model" type="team" />
									</constrain>
								</v-container>
							</flex-column-body>
						</tab>
						<tab heading="Attendance">
							<flex-column-body>
								<v-container fluid class="grid-list-xl">
									<constrain md>
										<team-attendance-metrics :group="model" type="team" />
									</constrain>
								</v-container>
							</flex-column-body>
						</tab>
					</tabset>
				</flex-column>
			</tab>
			<tab heading="Posts & Notes" v-if="model._id">
				<flex-column-body>
					<v-container pa-0 fluid>
						<item-post-thread :item="model" />
					</v-container>
				</flex-column-body>
			</tab>
		</tabset>
	</flex-column>
</template>
<script>
/////////////////////////////////

import GroupRoleManager from '../components/GroupRoleManager.vue';
import NotificationTeamManager from '../components/NotificationTeamManager.vue';
import FluroContentEditMixin from '../FluroContentEditMixin.js';
//import FluroContentEdit from '../FluroContentEdit.vue';
import TeamTrackTeaser from '../components/TeamTrackTeaser.vue';
import TeamMetricsDashboard from '../../../charts/metrics/TeamMetricsDashboard.vue';
import TeamAttendanceMetrics from '../../../charts/metrics/TeamAttendanceMetrics.vue';
import FluroPostFeed from '../components/FluroPostFeed.vue';
import ItemPostThread from '../../ItemPostThread';

// import { JSONView } from "vue-json-component";

/////////////////////////////////

import Vue from 'vue';
import _ from 'lodash';

/////////////////////////////////

export default {
	components: {
		TeamMetricsDashboard,
		TeamAttendanceMetrics,
		TeamTrackTeaser,
		NotificationTeamManager,
		GroupRoleManager,
		FluroPostFeed,
		ItemPostThread,
	},
	mixins: [FluroContentEditMixin],
	created() {
		var self = this;

		if (!self.model.assignments) {
			self.$set(self.model, 'assignments', []);
		}

		if (!self.model.provisionalMembers) {
			self.$set(self.model, 'provisionalMembers', []);
		}

		if (!self.model.awaitingApproval) {
			self.$set(self.model, 'awaitingApproval', []);
		}

		if (!self.model.tracks) {
			self.$set(self.model, 'tracks', []);
		}

		if (!self.model.visibleAssigned) {
			self.$set(self.model, 'visibleAssigned', false);
		}

		if (!self.model.notifications) {
			self.$set(self.model, 'notifications', []);
		}

		if (!self.model._id) {
			var defaultPositions = _.get(self.definition, 'data.defaultPositions');
			if (defaultPositions && defaultPositions.length) {
				var positions = JSON.parse(JSON.stringify(defaultPositions));

				_.each(positions, function (position) {
					position.contacts = [];
				});
				self.$set(self.model, 'assignments', positions);
			}
		} else {
			//add the positions that are missing
			var defaultPositions = _.get(self.definition, 'data.defaultPositions');
			if (defaultPositions && defaultPositions.length) {
				var positions = JSON.parse(JSON.stringify(defaultPositions));

				//Add any positions that don't exist
				var currentPositionsLookup = _.reduce(
					self.model.assignments,
					function (set, assignmentRow) {
						var lowercaseTitle = _.camelCase(assignmentRow.title);
						set[lowercaseTitle] = true;
						return set;
					},
					{}
				);

				_.each(positions, function (position) {
					var title = _.camelCase(position.title);
					if (currentPositionsLookup[title]) {
						return;
					} else {
						self.model.assignments.push(position);
					}
				});
			}
		}

		// if (!self.model.provisionalMembers) {
		//     self.$set(self.model, 'provisionalMembers', []);
		// }

		// if (!self.model.defaultRooms) {
		//     self.$set(self.model, 'defaultRooms', []);
		// }

		// if (!self.model.defaultRosters) {
		//     self.$set(self.model, 'defaultRosters', []);
		// }
	},
	asyncComputed: {
		tracks: {
			default: [],
			get() {
				var self = this;

				if (!self.model._id) {
					self.loadingTracks = false;
					return Promise.resolve([]);
				}

				/////////////////////////////////

				self.loadingTracks = true;

				/////////////////////////////////

				return new Promise(function (resolve, reject) {
					self.$fluro.api
						.get(`/teams/${self.model._id}/tracks`)
						.then(function (res) {
							resolve(res.data);
							self.loadingTracks = false;
						})
						.catch(function (err) {
							reject(err);
							self.loadingTracks = false;
						});
				});
			},
		},
	},
	methods: {
		createTrack() {
			var self = this;
			var team = self.model;

			///////////////////////////////////////////////////////

			var template = {
				title: team.title,
				firstLine: team.firstLine,
				realms: team.realms,
				defaultDuration: 90,
				defaultTitle: team.title,
				defaultExpectTeams: [team],
				defaultOwnershipTeams: [team],
				defaultFirstLine: team.firstLine,
				mainImage: team.mainImage,
				autoRecur: true,
			};

			self.$fluro.global.create('eventtrack', { template, options: true }, true).then(
				function (res) {
					self.processing = false;

					self.tracks.push(res);
				},
				function (err) {
					self.processing = false;
				}
			);
		},
	},
	computed: {
		infoHeading() {
			return this.definition ? `${this.definition.title} information` : 'Group Info';
		},

		showNotifications() {
			return this.model.assignments && this.model.assignments.length;
		},
		fieldsOutput() {
			var self = this;
			var array = [];

			///////////////////////////////////

			addField('title', {
				title: 'Title',
				minimum: 1,
				maximum: 1,
				type: 'string',
				placeholder: 'Title',
				params: {
					autofocus: !self.model._id,
				},
			});

			addField('firstLine', {
				title: 'Subtitle',
				minimum: 0,
				maximum: 1,
				type: 'string',
				placeholder: 'Subtitle',
				description: `A short one line description for this ${
					self.definition ? self.definition.title : 'Group'
				}`,
			});

			///////////////////////////////////
			///////////////////////////////////
			///////////////////////////////////

			addField('mainImage', {
				title: 'Image',
				description: `Main image for this ${self.definition ? self.definition.title : 'Group'}`,
				minimum: 0,
				maximum: 1,
				type: 'reference',
				directive: 'reference-select',
				params: {
					restrictType: 'image',
				},
			});

			///////////////////////////////////
			///////////////////////////////////
			///////////////////////////////////

			// visibleAssigned
			// addField('shareContactDetails', {
			//        title: 'Share phone and email details with assigned contacts',
			//        description: "Grant any contact with an assigned position be able to view other group members phone and email address?",
			//        minimum: 0,
			//        maximum: 1,
			//        type: 'boolean',
			//        defaultValues: [true],
			// });

			addField('visibleAssigned', {
				title: 'Hide from assigned contacts',
				description: 'Should assigned contacts know that they are in this group?',
				minimum: 0,
				maximum: 1,
				type: 'boolean',
				expressions: {
					transform: {
						get(val) {
							return !val;
						},
						set(val) {
							return !val;
						},
					},
				},
			});

			///////////////////////////////////
			///////////////////////////////////
			///////////////////////////////////
			///////////////////////////////////
			///////////////////////////////////
			///////////////////////////////////

			addField('provisionalRoles', {
				title: 'Roles / Permissions',
				description: 'Roles and permissions that should be granted to provisional members for this group/team',
				minimum: 0,
				maximum: 0,
				type: 'reference',
				directive: 'reference-select',
				params: {
					restrictType: 'role',
				},
			});

			///////////////////////////////////

			addField('allowProvisional', {
				title: 'Allow Provisional Membership (Allow members to join and leave)',
				description:
					'Set whether or not people can publicly join and leave this group without approval from applications like checkin or through your website',
				minimum: 0,
				maximum: 1,
				type: 'boolean',
			});

			// addField('shareContactDetailsProvisional', {
			//        title: 'Allow Provisional Members to view other group members\' phone numbers and emails',
			//        description: 'Should provisional members be allowed to view other group members phone and email address?',
			//        minimum: 0,
			//        maximum: 1,
			//        type: 'boolean',
			// });

			addField('visibleMembers', {
				title: 'Visible to Members',
				description: 'Should members of this group know that they are in this group?',
				minimum: 0,
				maximum: 1,
				type: 'boolean',
			});

			///////////////////////////////////

			var contentSelectActions;
			var approvalActions;

			if (self.$fluro.options) {
				///////////////////////////////////

				contentSelectActions = [
					{
						title: '',
						key: '_id',
						renderer: 'button',
						shrink: true,
						tooltip: 'Promote to position',
						button: {
							icon: 'level-up',
							action(contact) {
								return new Promise(function (resolve, reject) {
									// console.log('POSITIONS', self.model.assignments)
									return self.$fluro
										.options(self.model.assignments, 'Promote to position', 'Select a position')
										.then(function (position) {
											// console.log('PROMOTE', position, contact)
											if (!position.contacts) {
												self.$set(position, 'contacts', []);
											}

											var index = self.model.provisionalMembers.indexOf(contact);
											if (index != -1) {
												self.model.provisionalMembers.splice(index, 1);
											}
											position.contacts.push(contact);

											self.$fluro.notify(
												`${contact.firstName} was promoted to ${position.title}`
											);

											resolve();
										}, reject);

									// self.deselect(row);
									// resolve();
								});
							},
						},
					},
				];

				///////////////////////////////////

				approvalActions = [
					{
						title: '',
						key: '_id',
						renderer: 'button',
						shrink: true,
						tooltip: 'Approve as member',
						button: {
							icon: 'check',
							action(contact) {
								return new Promise(function (resolve, reject) {
									var index = self.model.awaitingApproval.indexOf(contact);
									if (index != -1) {
										self.model.awaitingApproval.splice(index, 1);
									}

									self.model.provisionalMembers.push(contact);
									self.$fluro.notify(`${contact.firstName} was moved to 'Members'`);
									resolve();
								});
							},
						},
					},
				];
			}

			///////////////////////////////////

			addField('provisionalMembers', {
				title: 'Group Members',
				minimum: 0,
				maximum: 0,
				type: 'reference',
				directive: 'reference-select',
				params: {
					restrictType: 'contact',
					contentSelect: {
						forceTableView: true,
						actions: contentSelectActions,
					},
				},
			});

			addField('awaitingApproval', {
				title: 'Contacts awaiting approval',
				minimum: 0,
				maximum: 0,
				type: 'reference',
				directive: 'reference-select',
				params: {
					restrictType: 'contact',
					contentSelect: {
						forceTableView: true,
						actions: approvalActions,
					},
				},
			});

			///////////////////////////////////
			///////////////////////////////////
			///////////////////////////////////
			///////////////////////////////////
			///////////////////////////////////
			///////////////////////////////////

			function addField(key, details) {
				details.key = key;
				array.push(details);
				// // Vue.set(self.fields, key, details);

				// if (details.enabled === false) {

				// } else {
				//     details.enabled = true;
				// }

				// var defaultValue = self.getDefaultValue(key, details);
				// Vue.set(self.model, key, defaultValue);
			}

			return array;
		},
		// hiddenAssigned: {
		//        get() {
		//                return !this.model.visibleAssigned;
		//        },
		//        set(value) {
		//                this.$set(this.model, 'visibleAssigned', !value);
		//        }
		// },
		showOutline() {
			return false; //true; //false;//true;//false;//true;
		},
		allPositions() {
			return _.map(this.model.assignments, 'title');
		},
	},
};
</script>
<style>
.no-border-no-background .toggle-item {
	border: none !important;
	background: none !important;
	font-size: 14px;
	padding: 0px;
}
</style>
