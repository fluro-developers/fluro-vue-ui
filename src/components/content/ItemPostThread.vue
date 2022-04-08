<template>
	<flex-column class="item-post-thread">
		<template v-if="loading">
			<fluro-page-preloader contain />
		</template>
		<template v-else>
			<template v-if="postTypes.length">
				<flex-column-header>
					<v-container fluid class="border-bottom text-xs-center" style="background: #fff">
						<v-btn small @click="create(postType)" v-for="postType in postTypes" :key="postType._id">
							Add {{ postType.title }}
							<fluro-icon right icon="plus" />
						</v-btn>
					</v-container>
				</flex-column-header>
			</template>
			<flex-column-body style="background: #fafafa">
				<v-container v-if="items && items.length">
					<div class="card" v-for="post in items" :key="post._id">
						<!-- <pre>{{post}}</pre> -->
						<post-card :item="post" />
					</div>
				</v-container>
				<v-container v-else>
					<fluro-panel>
						<fluro-panel-body> No posts or notes found </fluro-panel-body>
					</fluro-panel>
				</v-container>
			</flex-column-body>
		</template>
	</flex-column>
</template>
<script>
import _ from 'lodash';
import PostCard from './contact/timeline/cards/PostCard.vue';
import AddPost from '../ui/modal/AddPost.vue';

export default {
	props: {
		item: {
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
				item: self.item,
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
							//console.log("Got back post types", res)
							var filtered = _.filter(res, function (postType) {
								var isCorrectType = _.chain(postType)
									.get('data.postParentTypes')

									.includes(self.item.definition || self.item._type)
									.value();

								if (!isCorrectType) {
									// if the item has no post types it is an anything type
									if (_.get(postType, 'data.postParentTypes').length > 0) {
										//console.log("exiting",postType.definitionName,  _.get(postType, "data.postParentTypes").length)
										return;
									}
								}

								var canSubmit = self.$fluro.access.can('submit', postType.definitionName, 'post');
								var canCreate = self.$fluro.access.can('create', postType.definitionName, 'post');
								//console.log("exiting",postType.definitionName,  canSubmit, canCreate)
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

				var itemID = self.$fluro.utils.getStringID(self.item);
				if (!itemID) {
					Promise.resolve([]);
					self.loading = false;
				}

				return new Promise(function (resolve, reject) {
					self.$fluro.api
						//////////////////////////////////////////////
						.get(`/post/${itemID}/all`)
						.then(function (res) {
							resolve(res.data);
							self.loading = false;
						})
						.catch(function (err) {
							reject(err);
							self.loading = false;
						});
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
