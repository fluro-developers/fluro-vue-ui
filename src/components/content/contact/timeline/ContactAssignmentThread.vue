<template>
	<flex-column class="contact-assignment-thread">
		<template v-if="loading">
			<fluro-page-preloader contain />
		</template>
		<template v-else>
			<!--  <flex-column-header>
        <v-container fluid class="border-bottom text-xs-center" style="background: #fff;">
          <v-btn small @click="create(postType)" v-for="postType in postTypes">
            Add {{postType.title}}
            <fluro-icon right icon="plus" />
          </v-btn>
        </v-container>
      </flex-column-header> -->
			<flex-column-body style="background: #fafafa">
				<!-- <pre>{{items}}</pre> -->
				<div class="timeline">
					<div class="year" v-for="year in timeline">
						<div class="year-label">{{ year.date | formatDate('YYYY') }}</div>
						<div class="month" v-for="month in year.months">
							<div class="month-label">{{ month.date | formatDate('MMM') }}</div>
							<div class="day" v-for="day in month.days">
								<div class="day-label">{{ day.date | formatDate('ddd D') }}</div>
								<div class="entries">
									<div class="card" :key="item._id" v-for="item in day.items">
										<roster-card :item="item" />
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
import RosterCard from './cards/RosterCard.vue';
// import AddPost from "../../../ui/modal/AddPost.vue";

export default {
	props: {
		contact: {
			type: Object,
		},
	},
	components: {
		RosterCard,
		// AddPost
	},
	data() {
		return {
			loading: false,
		};
	},
	methods: {},
	computed: {
		timeline() {
			var self = this;

			return self.$fluro.date.timeline(self.items, 'event.startDate');
		},
	},
	asyncComputed: {
		// postTypes: {
		//   default: [],
		//   get() {
		//     var self = this;

		//     return new Promise(function(resolve, reject) {
		//       self.$fluro.types
		//         .subTypes("post")
		//         .then(function(res) {
		//           var filtered = _.filter(res, function(postType) {
		//             var isCorrectType = _.chain(postType)
		//               .get("data.postParentTypes")
		//               .includes("contact")
		//               .value();

		//             if (!isCorrectType) {
		//               return;
		//             }

		//             var canSubmit = self.$fluro.access.can(
		//               "submit",
		//               postType.definitionName,
		//               "post"
		//             );
		//             var canCreate = self.$fluro.access.can(
		//               "create",
		//               postType.definitionName,
		//               "post"
		//             );
		//             return canSubmit || canCreate;
		//           });

		//           resolve(filtered);
		//         })
		//         .catch(reject);
		//     });
		//   }
		// },
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

				return new Promise(function (resolve, reject) {
					self.$fluro.api
						.get(`/info/newassignments?contact=${contactID}`)
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
<style lang="scss" scoped>
.card {
	background: #fff;
	border-radius: 5px;
	margin-bottom: 10px;
	overflow: hidden;
}
</style>
