<template>
	<flex-column class="contact-post-thread">
		<template v-if="loading">
			<fluro-page-preloader contain />
		</template>
		<template v-else>
			<flex-column-header>
				<v-container fluid class="border-bottom text-xs-center" style="background: #fff">
					<v-btn small @click="create(postType)" v-for="postType in postTypes">
						Add {{ postType.title }}
						<fluro-icon right icon="plus" />
					</v-btn>
				</v-container>
			</flex-column-header>
			<flex-column-body style="background: #fff">
				<v-container>
					<div class="card" v-for="post in items">
						<post-card :item="post" />
					</div>
				</v-container>
			</flex-column-body>
		</template>
	</flex-column>
</template>
<script>
import _ from 'lodash';
import PostCard from './cards/PostCard.vue';
import AddPost from '../../../ui/modal/AddPost.vue';

export default {
	props: {
		contact: {
			type: Object,
		},
	},
	components: {
		PostCard,
		AddPost,
	},
	data() {
		return {
			loading: false,
		};
	},
	methods: {
		create(definition) {
			var self = this;
			var options = {
				definition,
				item: self.contact,
			};

			///////////////////////////

			var promise = self.$fluro
				.modal({
					component: AddPost,
					options,
				})
				.then(function () {
					self.$fluro.resetCache();
				});
		},

		// create(postType) {
		//     var self = this;

		//     self.$fluro.global.create = function() {

		//     }
		// }
	},
	asyncComputed: {
		postTypes: {
			default: [],
			get() {
				var self = this;

				return new Promise(function (resolve, reject) {
					self.$fluro.types
						.subTypes('post')
						.then(function (res) {
							var filtered = _.filter(res, function (postType) {
								var isCorrectType = _.chain(postType)
									.get('data.postParentTypes')
									.includes('contact')
									.value();

								if (!isCorrectType) {
									return;
								}

								var canSubmit = self.$fluro.access.can('submit', postType.definitionName, 'post');
								var canCreate = self.$fluro.access.can('create', postType.definitionName, 'post');
								return canSubmit || canCreate;
							});

							resolve(filtered);
						})
						.catch(reject);
				});
			},
		},
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
						.get(`/info/posts?contact=${contactID}`)
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
