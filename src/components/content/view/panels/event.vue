<template>
	<flex-column>
		<template v-if="loading || loadingSongs">
			<fluro-page-preloader contain />
		</template>
		<tabset v-else :justified="true" :vertical="true">
			<tab :heading="`${readableTypeName} Info`">
				<flex-column-body>
					<v-container>
						<constrain sm>
							<template v-if="item.mainImage">
								<fluro-image
									:item="item.mainImage"
									:imageWidth="1200"
									:imageHeight="675"
									:from="item._id"
								/>
							</template>
							<v-container fluid pa-2 class="border-bottom">
								<h2>
									<strong>{{ item.title }}</strong>
								</h2>
								<h4 class="muted text-uppercase">{{ item.firstLine }}</h4>
								<h3>{{ item | readableEventDate }}</h3>
							</v-container>
							<v-container fluid pa-2>
								<template v-if="item.body && item.body.length">
									<div v-html="item.body"></div>
								</template>
							</v-container>
							<v-container grid-list-xl fluid pa-2 v-if="item.videos && item.videos.length">
								<v-layout row wrap>
									<v-flex
										:xs12="item.videos.length == 1"
										:xs6="item.videos.length > 1"
										:key="video._id"
										v-for="video in item.videos"
									>
										<fluro-panel>
											<fluro-panel-title>
												<v-layout align-center>
													<v-flex>
														<fluro-icon left type="video" />
														<strong>{{ video.title }}</strong>
													</v-flex>
													<v-flex shrink>
														<v-btn small icon class="ma-0" @click="$actions.open([video])">
															<fluro-icon icon="ellipsis-h" />
														</v-btn>
													</v-flex>
												</v-layout>
											</fluro-panel-title>
											<fluro-video :item="video" />
											<!-- <pre>{{item.videos}}</pre> -->
										</fluro-panel>
									</v-flex>
								</v-layout>
							</v-container>
							<v-container fluid pa-2>
								<template v-if="item.assets && item.assets.length">
									<h3 margin>Downloads & Resources</h3>
									<list-group>
										<list-group-item
											@click="$fluro.global.view(song, true)"
											:item="asset"
											v-for="(asset, index) in item.assets"
											:key="index"
										>
											<template v-slot:right>
												<v-btn class="ma-0" icon @click="$actions.open([asset])">
													<fluro-icon icon="ellipsis-h" />
												</v-btn>
											</template>
										</list-group-item>
									</list-group>
								</template>
								<template v-if="fields.length">
									<h3 margin>{{ definition.title }} Details</h3>
									<fluro-content-render :fields="croppedFields" v-model="item.data" />
								</template>
							</v-container>
							<v-container fluid pa-2 v-if="locations.length">
								<fluro-panel>
									<location-view-map-component
										style="width: 100%; min-height: 300px; height: 0; padding-bottom: 40%"
										:positions="locations"
									/>
									<fluro-panel-body class="border-top">
										<!-- <pre>{{item.locations}}</pre> -->
										<v-layout align-center>
											<v-flex shrink>
												<fluro-icon library="fas" left icon="map-marker-alt" />
											</v-flex>
											<v-flex v-for="location in locations" :key="location._id">
												<strong>{{ location.title }}</strong>
												<div class="sm muted" v-if="location.selectedRooms.length">
													<strong>Rooms:</strong>
													{{ location.selectedRooms | comma('title') }}
												</div>
												<!-- <pre>{{location}}</pre> -->
											</v-flex>
										</v-layout>
									</fluro-panel-body>
								</fluro-panel>
							</v-container>
						</constrain>
					</v-container>
				</flex-column-body>
			</tab>
			<tab :heading="`${songs.length} Song${songs.length == 1 ? '' : 's'}`" v-if="songs.length">
				<flex-column-body>
					<v-container>
						<constrain sm>
							<h3 margin>Songs</h3>
							<list-group>
								<list-group-item
									@click="$fluro.global.view(song, true)"
									:item="song"
									v-for="(song, index) in songs"
									:key="index"
								>
									<template v-slot:right>
										<v-btn class="ma-0" icon @click="$actions.open([song])">
											<fluro-icon icon="ellipsis-h" />
										</v-btn>
									</template>
								</list-group-item>
							</list-group>
							<!-- <fluro-list-item/> -->
						</constrain>
					</v-container>
				</flex-column-body>
			</tab>
			<tab :heading="`Team Members`" v-if="item.rostered">
				<flex-column-body style="background: #fff">
					<v-container>
						<constrain sm>
							<v-layout align-center>
								<v-flex>
									<h3 margin>Team Members</h3>
								</v-flex>
							</v-layout>
							<fluro-panel v-for="roster in item.rostered" :key="roster._id">
								<fluro-panel-title>
									<v-layout align-center>
										<v-flex>
											<strong>{{ roster.title }}</strong>
										</v-flex>
										<v-flex shrink v-if="$fluro.access.canEditItem(roster)">
											<v-btn class="ma-0" small @click="editRoster(roster)">
												Edit
												<fluro-icon icon="pencil" right />
											</v-btn>
											<v-btn
												icon
												class="ma-0"
												small
												@click="$actions.open([roster])"
												v-tippy
												:content="`Actions`"
											>
												<fluro-icon icon="ellipsis-h" />
											</v-btn>
										</v-flex>
									</v-layout>
								</fluro-panel-title>
								<fluro-panel-body>
									<v-layout row wrap>
										<v-flex xs6 sm4 md3 v-for="slot in roster.slots" :key="slot._id">
											<template v-if="slot.assignments && slot.assignments.length">
												<v-container class="mb-2 pa-2">
													<h5>{{ slot.title }}</h5>
													<div
														class="assignment-item"
														@click="$actions.open([assignment])"
														:class="assignment.confirmationStatus"
														v-for="assignment in slot.assignments"
														:key="assignment._id"
													>
														<v-layout>
															<v-flex>
																{{
																	assignment.contact && assignment.contact.title
																		? assignment.contact.title
																		: assignment.contactName
																}}
															</v-flex>
															<v-flex shrink>
																<fluro-icon
																	right
																	:icon="confirmationIcon(assignment)"
																/>
															</v-flex>
														</v-layout>
													</div>
												</v-container>
											</template>
										</v-flex>
									</v-layout>
									<!-- <pre>{{roster}}</pre> -->
								</fluro-panel-body>
							</fluro-panel>
							<!-- <v-btn block @click="createRoster(rosterType)" class="btn-ghost" v-for="rosterType in rosterTypes">
                                Add {{rosterType.title}}
                            </v-btn> -->
						</constrain>
					</v-container>
				</flex-column-body>
			</tab>
			<template v-if="plans.length">
				<tab :heading="plan.title" v-for="(plan, index) in plans" :key="index">
					<fluro-content-view :id="plans[index]" :embedded="true" type="plan" />
				</tab>
			</template>
			<tab heading="Guest List">
				<flex-column-body>
					<v-container>
						<constrain sm>
							<guest-list :event="item" />
						</constrain>
					</v-container>
				</flex-column-body>
			</tab>
			<tab heading="Tickets">
				<flex-column-body>
					<v-container>
						<constrain sm>
							<ticket-list :event="item" />
						</constrain>
					</v-container>
				</flex-column-body>
			</tab>
			<tab heading="Metrics">
				<flex-column-body>
					<v-container fluid>
						<event-age-gender-metrics :id="item"></event-age-gender-metrics>
					</v-container>
				</flex-column-body>
			</tab>
			<tab heading="Posts">
				<flex-column-body>
					<v-container fluid>
						<item-post-thread :item="item" />
					</v-container>
				</flex-column-body>
			</tab>
		</tabset>
	</flex-column>
</template>
<script>
/////////////////////////////////

import Vue from 'vue';
import _ from 'lodash';

import FluroContentView from '../FluroContentView.vue';
import LocationViewMapComponent from '../../event/LocationViewMapComponent.vue';
import FluroContentViewMixin from '../FluroContentViewMixin.js';
import EventAgeGenderMetrics from '../../../charts/metrics/EventAgeGenderMetrics.vue';
import GuestList from '../../event/GuestList.vue';
import TicketList from '../../event/TicketList.vue';
import ItemPostThread from '../../ItemPostThread';

/////////////////////////////////

export default {
	props: {
		config: {
			type: Object,
			required: true,
		},
		item: {
			type: Object,
			required: true,
		},
	},
	components: {
		FluroContentView,
		GuestList,
		TicketList,
		LocationViewMapComponent,
		EventAgeGenderMetrics,
		ItemPostThread,
	},
	mixins: [FluroContentViewMixin],
	methods: {
		editRoster(roster) {
			var self = this;

			self.$fluro.global.edit(roster, true).then(function (updated) {
				_.assign(roster, updated);
			});
		},
		confirmationIcon(assignment) {
			switch (assignment.confirmationStatus) {
				case 'confirmed':
					return 'check';
					break;
				case 'denied':
					return 'times';
					break;
				case 'unknown':
					return 'clock';
					break;
				case 'proposed':
					return 'question-circle';
					break;
			}
		},
	},
	asyncComputed: {
		songs: {
			default: [],
			get() {
				var self = this;
				self.loadingSongs = true;

				return new Promise(function (resolve, reject) {
					self.$fluro.api
						.get(`/event/${self.itemID}/songs`)
						.then(function (res) {
							resolve(res.data);
							self.loadingSongs = false;
						})
						.catch(function (err) {
							reject(err);
							self.loadingSongs = false;
						});
				});
			},
		},
	},
	computed: {
		showPhotos() {
			var self = this;

			var accessAllowed = self.$fluro.access.canKnowOf('photo');
			if (!accessAllowed) {
				return;
			}

			var now = new Date();
			var startDate = new Date(self.item.startDate);
			var isInPast = now >= startDate;

			return isInPast;
		},
		roomHash() {
			var self = this;
			return _.reduce(
				this.item.rooms,
				function (set, room) {
					var locationName = String(room.locationName).toLowerCase();

					if (!set[locationName]) {
						set[locationName] = [];
					}

					set[locationName].push(room);
					return set;
				},
				{}
			);
		},
		locations() {
			var self = this;

			return _.map(self.item.locations, function (location) {
				var locationName = String(location.title).toLowerCase();
				location.selectedRooms = self.roomHash[locationName] || [];

				return location;
			});
		},
		croppedFields() {
			return _.filter(this.fields, function (field) {
				return field.key != 'songs';
			});
		},
		// songs() {
		//     return this.item.songs || [];
		// },
		// songIDs() {

		//     var self = this;

		//     var eventSongs = _.chain(self.item)
		//     .get('data.songs')
		//     .compact()
		//     .value();

		//     var planSongs = _.chain(self.plans)
		//     .map('schedules')
		//     .flatten()
		//     .filter({type:'song'})
		//     .map('links')
		//     .flatten()
		//     .compact()
		//     .value();

		//     return self.$fluro.utils.arrayIDs([].concat(eventSongs, planSongs));
		// },
		plans() {
			return this.item.plans || [];
		},
		// readableTypeName() {
		//     return this.definition ? this.$fluro.types.readable(this.definition.definitionName) : 'Event';
		// },
	},
	data() {
		return {
			loadingSongs: true,
		};
	},
};
</script>
<style scoped lang="scss">
$proposedColor: #2ad4b9 !default;

.assignment-item {
	font-size: 12px;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	border-radius: 100px;
	margin-bottom: 2px;
	padding: 2px 10px;
	font-weight: 500;
	background-color: rgba(#000, 0.05);

	&.confirmed {
		color: $success;
		background-color: rgba($success, 0.05);
	}

	&.denied {
		color: $danger;
		background-color: rgba($danger, 0.05);
	}

	&.unknown {
		color: #555;
	}

	&.proposed {
		background-color: rgba($proposedColor, 0.1);
		color: darken($proposedColor, 20%);
	}
}
</style>
