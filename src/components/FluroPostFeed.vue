<template>
	<fluro-panel>
		<fluro-tabset :justified="true">
			<fluro-tab :heading="postType.title" v-for="(postType, i) in postTypes" :key="i">
				<div :key="post._id" v-for="post in postType.posts">
					<fluro-panel-title>
						<v-layout align-center>
							<v-flex shrink>
								<fluro-avatar :id="post.managedAuthor" type="persona" />
							</v-flex>
							<v-flex>
								<strong>{{ post.definition | definitionTitle }}</strong>
								<div class="muted font-xs">
									Posted by
									{{
										post.managedAuthor
											? post.managedAuthor.title
											: post.author
											? post.author.name
											: 'Someone'
									}}
								</div>
							</v-flex>
							<v-flex shrink>
								<v-btn
									small
									class="my-0"
									icon
									@click="edit(post)"
									v-if="$fluro.access.canEditItem(post)"
								>
									<fluro-icon icon="pencil" />
								</v-btn>
								<v-btn small class="my-0" icon @click="$actions.open([post])">
									<fluro-icon icon="ellipsis-h" />
								</v-btn>
							</v-flex>
						</v-layout>
					</fluro-panel-title>
					<fluro-content-view
						:hideTitle="true"
						:id="post._id"
						:embedded="true"
						:definition="post.definition"
						:type="post._type"
					/>
				</div>
			</fluro-tab>
		</fluro-tabset>
	</fluro-panel>
</template>
<script>
import Vue from 'vue';
import FluroTabset from './ui/tabset/FluroTabset.vue';
import FluroTab from './ui/tabset/FluroTab.vue';
import FluroContentView from './content/view/FluroContentView.vue';
export default {
	props: {
		parent: {
			type: [String, Object],
		},
	},
	components: {
		FluroTabset,
		FluroTab,
		FluroContentView,
	},
	data() {
		return {
			loading: true,
		};
	},
	methods: {
		edit(post) {
			var self = this;

			self.$fluro.global.edit(post, true).then(function (res) {
				Object.assign(post, res);
			});
		},
	},
	computed: {
		postTypes() {
			var self = this;
			return self.feed.reduce(function (set, item) {
				var definition = item.definition || 'post';
				var match = set[definition];
				if (!match) {
					match = set[definition] = {
						title: self.$fluro.types.readable(definition, true),
						posts: [],
					};
				}

				match.posts.push(item);

				return set;
			}, {});
		},
	},
	asyncComputed: {
		feed: {
			default: [],
			get() {
				var self = this;

				self.loading = true;

				var id = self.$fluro.utils.getStringID(self.parent);
				return new Promise(function (resolve, reject) {
					return self.$fluro.api
						.get(`/post/${id}/all`)
						.then(function (res) {
							resolve(Vue.observable(res.data));
							self.loading = false;
						})
						.catch(function (err) {
							self.loading = false;
						});
				});
			},
		},
	},
};
</script>
<style></style>
