<template>
	<flex-column class="contact-interaction-list">
		<template v-if="loading">
			<fluro-page-preloader contain />
		</template>
		<template v-else>
			<!-- <flex-column-header>
                <v-container class="border-bottom text-xs-center" style="background: #fff;">
                    <v-btn small @click="create(postType)" v-for="postType in postTypes">
                        Add {{postType.title}}
                        <fluro-icon right icon="plus" />
                    </v-btn>
                </v-container>
            </flex-column-header> -->
			<flex-column-body style="background: #fff">
				<!-- <pre>{{items}}</pre> -->
				<div class="timeline">
					<div class="year" v-for="year in timeline">
						<div class="year-label">{{ year.date | formatDate('YYYY') }}</div>
						<div class="month" v-for="month in year.months">
							<div class="month-label">{{ month.date | formatDate('MMM') }}</div>
							<div class="day" v-for="day in month.days">
								<div class="day-label">{{ day.date | formatDate('ddd D') }}</div>
								<div class="entries">
									<div
										@click="$fluro.global.view(entry, true)"
										class="entry"
										v-for="entry in day.items"
										:key="entry._id"
									>
										<fluro-realm-bar :realm="entry.realms" />
										<v-layout>
											<v-flex>
												<strong>{{ entry.title }}</strong>
												<!-- <div>{{entry.formattedAmount}}</div> -->
												<!-- <pre>{{entry}}</pre> -->

												<!-- <fluro-content-render :fields="sheet.fullDefinition.fields" v-model="entry" /> -->

												<div class="text-muted sm">
													{{ entry.created | formatDate('dddd D MMM YYYY') }} ({{
														entry.created | timeago
													}})
												</div>
											</v-flex>
											<v-flex shrink>
												<v-btn icon small @click.prevent.stop="$actions.open([entry])">
													<fluro-icon icon="ellipsis-h" />
												</v-btn>
											</v-flex>
										</v-layout>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</flex-column-body>
		</template>
	</flex-column>
</template>
<script>
import _ from 'lodash';

export default {
	props: {
		contact: {
			type: Object,
		},
	},
	components: {},
	data() {
		return {
			loading: false,
		};
	},
	computed: {
		timeline() {
			var self = this;

			return self.$fluro.date.timeline(self.items, 'created');
		},
	},
	asyncComputed: {
		items: {
			default: [],
			get() {
				var self = this;
				self.loading = true;

				var contactID = self.$fluro.utils.getStringID(self.contact);
				if (!contactID) {
					Promise.resolve([]);
					self.loading = false;
				}

				/////////////////////////////////////

				return new Promise(function (resolve, reject) {
					self.$fluro.api
						.get(`/info/interactions?contact=${contactID}`)
						.then(function (res) {
							var mapped = _.map(res.data, function (entry) {
								// entry.formattedAmount = self.$fluro.utils.formatCurrency(entry.amount, entry.currency);
								return entry;
							});

							resolve(mapped);
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
<style lang="scss"></style>
