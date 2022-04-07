<template>
	<flex-column class="contact-timeline">
		<template v-if="loading">
			<fluro-page-preloader contain />
		</template>
		<template v-else>
			<!-- -->
			<fluro-timeline v-model="array">
				<template v-slot:above>
					<v-label>Activity Heartbeat</v-label>
					<p></p>
					<!-- <v-sheet color="rgba(0, 0, 0, .12)">
                        <v-sparkline :value="test" color="rgba(255, 255, 255, .7)" height="100" padding="24" stroke-linecap="round" smooth>
                            <template v-slot:label="item">
                                ${{ item.value }}
                            </template>
                        </v-sparkline>
                    </v-sheet> -->
					<div class="pulse">
						<div class="labels">
							<v-layout>
								<v-flex>
									<v-label>{{ months[0] }}</v-label>
								</v-flex>
								<v-spacer />
								<v-flex class="text-xs-right">
									<v-label>{{ months[months.length - 1] }}</v-label>
								</v-flex>
							</v-layout>
						</div>
						<!-- :labels="months" -->
						<v-sparkline
							v-if="points && points.length"
							:lineWidth="0"
							:gradient="['#6378f6', '#eee']"
							:fill="true"
							:height="40"
							:padding="0"
							:value="points"
							:smooth="3"
							auto-draw
						>
							<!-- <template v-slot:label="item, label">
                                {{label.value}}
                            </template> -->
						</v-sparkline>
						<!-- <pre>{{months}}</pre> -->
					</div>

					<v-container grid-list-md fluid pa-0>
						<v-layout row wrap>
							<v-flex>
								<div class="pill-box">
									<v-label>Created</v-label>
									<div>{{ firstInteraction | timeago }}</div>
								</div>
							</v-flex>

							<v-flex>
								<div class="pill-box">
									<v-label>Last Activity</v-label>
									<div>{{ lastActivity | timeago }}</div>
								</div>
							</v-flex>
							<!--  <v-flex>
                            <div class="pill-box">
                                <v-label>Avg over past 12 months</v-label>
                                <div>{{frequency}} actions/month</div>
                            </div>
                        </v-flex> -->
						</v-layout>
					</v-container>
				</template>
				<template v-slot:card="{ entry }">
					<template v-if="entry.grouped">
						<!-- <grouped-card :item="entry"/> -->
						<log-card :item="log" :key="log._id" v-for="log in entry.entries" />
					</template>
					<template v-else-if="!entry._type">
						<!-- <div class="timeline-card log-message"> -->
						<log-card :item="entry" />
						<!-- <fluro-icon type="log"/> {{entry.message}} <em class="muted">- {{entry.date | formatDate('hh:mma')}} ({{entry.date | timeago}})</em> -->
						<!-- </div> -->
						<!-- <pre>{{entry}}</pre> -->
					</template>
					<template v-else>
						<!-- <div class="timeline-card"> -->
						<template v-if="entry._type == 'mailout'">
							<mailout-card :item="entry" />
						</template>
						<template v-else-if="entry._type == 'post'">
							<post-card :item="entry" />
						</template>
						<template v-else-if="entry._type == 'interaction'">
							<interaction-card :item="entry" />
						</template>
						<template v-else-if="entry._type == 'checkin'">
							<checkin-card :item="entry" />
						</template>
						<template v-else-if="entry._type == 'assignment'">
							<roster-card :item="entry" />
						</template>
						<template v-else-if="entry._type == 'sms'">
							<text-message-card :item="entry" />
						</template>
						<template v-else-if="entry._type == 'simpleemail'">
							<email-message-card :item="entry" />
						</template>
						<template v-else>
							<div class="timeline-card">
								<pre>{{ entry }}</pre>
							</div>
						</template>
						<!-- <fluro-realm-bar :realm="entry.realms"/> -->
						<!-- <label>{{entry.title}}</label> -->
						<!-- } -->
						<!-- </div> -->
					</template>
				</template>
			</fluro-timeline>
		</template>
	</flex-column>
	<!-- <div class="process-state-card" :class="card.processStatus">
                <fluro-card>
                        <div class="color-block" />
                        <fluro-card-body>
                                <div class="due-date" v-if="card.dueDate">
                                        <fluro-icon icon="clock" /> {{dueText}}</div>
                                <h5>{{card.title}}</h5>
                                <div><strong>{{currentState.title}}</strong> <template v-if="mode == 'linear'"> - {{percent}}</template></div>
                                <div>{{taskSummary}}</div>
                                <div class="process-dots">
                                        <span class="process-dot" v-tippy :content="state.title" :class="state.result" v-for="state in renderStates">
                                                <fluro-icon :library="state.iconLibrary" :icon="state.icon" />
                                              
                                        </span>
                                </div>
                                
                        </fluro-card-body>
                </fluro-card>
  </div>-->
</template>
<script>
import FluroTimeline from '../../../ui/FluroTimeline.vue';
import MailoutCard from './cards/MailoutCard.vue';
import PostCard from './cards/PostCard.vue';
import InteractionCard from './cards/InteractionCard.vue';
import CheckinCard from './cards/CheckinCard.vue';
import LogCard from './cards/LogCard.vue';
import RosterCard from './cards/RosterCard.vue';
import TextMessageCard from './cards/TextMessageCard.vue';
import EmailMessageCard from './cards/EmailMessageCard.vue';
import GroupedCard from './cards/GroupedCard.vue';
import moment from 'moment';

const MONTH_KEY = 'MMM YYYY';

export default {
	props: {
		items: {
			type: Array,
		},
		value: {
			type: Object,
		},
	},
	components: {
		FluroTimeline,
		MailoutCard,
		PostCard,
		InteractionCard,
		CheckinCard,
		LogCard,
		RosterCard,
		TextMessageCard,
		EmailMessageCard,
		GroupedCard,
	},
	data() {
		return {
			loading: false,
			model: this.value,
			months: [],
			// test: [
			//     423,
			//     446,
			//     675,
			//     510,
			//     590,
			//     610,
			//     760
			// ]
		};
	},
	mounted() {
		const getMonths = (start, end) =>
			Array.from({ length: end.diff(start, 'month') + 1 }).map((_, index) =>
				moment(start).add(index, 'month').format(MONTH_KEY)
			);

		this.months = getMonths(moment().subtract(24, 'months'), moment());
	},
	computed: {
		firstInteraction() {
			return this.model.created || (_.last(this.array) || {}).date;
		},
		lastActivity() {
			return (_.first(this.array) || {}).date;
		},
		frequency() {
			return Math.round(_.sum(this.points) / this.points.length);
		},
		points() {
			var self = this;

			////////////////////////////////////////

			var points = _.chain(self.array)
				.reduce(function (set, entry, index) {
					var date = moment(entry.date).format(MONTH_KEY);

					var existing = set[date];
					if (!existing) {
						existing = set[date] = {
							index,
							date,
							count: 0,
						};
					}

					existing.count++;

					return set;
				}, {})
				.value();

			////////////////////////////////////////

			// return points;
			var counts = _.map(self.months, function (dateKey) {
				var entry = points[dateKey];

				return entry ? entry.count : 0;
			});
			// console.log('POINTS', counts);

			return counts;
		},
	},
	asyncComputed: {
		array: {
			default: [],
			get() {
				var self = this;
				self.loading = true;

				var contactID = self.$fluro.utils.getStringID(self.model);
				if (!contactID) {
					Promise.resolve([]);
					self.loading = false;
				}

				return new Promise(function (resolve, reject) {
					self.$fluro.api
						.get(`/contact/${contactID}/timeline`)
						.then(function (res) {
							resolve(res.data);
							self.loading = false;
						})
						.catch(function (err) {
							reject(err);
							self.loading = false;
						});
					// https://api.staging.fluro.io/info/checkins?contact=592e50389d9129595a75cc4e
				});
			},
		},
	},
};
</script>
<style lang="scss">
.contact-timeline {
	.timeline-wrapper {
		max-width: 960px;
		margin: auto;
	}
}

.pulse {
	padding: 0;
	background: #fff; //rgba(#000,0.3);
	border-radius: 10px;
	margin-bottom: 25px;
	overflow: hidden;
	// border: 1px solid #ccc;

	// box-shadow: 0 3px 15px rgba(#000, 0.2);
	// border:1px solid rgba(#000,0.1);

	.labels {
		padding: 15px 15px 0;
	}

	svg {
		display: block;
	}
}

.pill-box {
	padding: 15px;
	background: #fff; //rgba(#000,0.3);
	border-radius: 10px;
	margin-bottom: 25px;
	box-shadow: 0 1px 2px rgba(#000, 0.1);

	div {
		font-size: 1.3em;
	}
}

.log-message {
	font-size: 0.8em;
	opacity: 0.5;
	padding: 5px;
	font-style: italic;
}

.timeline-entry {
	@extend .border-top !optional;
	padding: 5px;
	position: relative;
	overflow: hidden;
	text-overflow: ellipsis;

	.summary {
		font-size: 0.8em;
		opacity: 0.5;
	}
}

.timeline-icon {
	text-align: center;
	width: 34px;
	line-height: 34px;
	height: 34px;
	background: rgba(#000, 0.1);
	border-radius: 100%;
	display: block;
}
</style>
