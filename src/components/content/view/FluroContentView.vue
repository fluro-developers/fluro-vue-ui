<template>
				<flex-column class="content-view">
								<!-- {{loadingModel}} -- {{loadingConfig}} -->
								<fluro-page-preloader v-if="loading" contain />
								<template v-else-if="model">
												<flex-column-header class="border-bottom">
																<page-header :type="type">
																				<template v-slot:left>
																								<div>
																												<h3>{{title}} <span class="small text-muted">{{definitionTitle}}</span></h3>
																												<v-label v-if="summary">{{summary}}</v-label>
																								</div>
																				</template>
																				<template v-slot:right>
																								<v-btn v-if="model._id" icon class="mr-0" small @click="$actions.open([model])">
																												<fluro-icon icon="ellipsis-h" />
																								</v-btn>
																								<template v-if="embedded">
																												<v-btn icon v-if="canEdit" @click="edit">
																																<fluro-icon icon="pencil" />
																												</v-btn>
																								</template>
																								<template v-else>
																												<v-btn @click="cancel">
																																Close
																												</v-btn>
																												<v-btn class="mx-0" v-if="canEdit" @click="edit" color="primary">
																																Edit
																												</v-btn>
																								</template>
																				</template>
																</page-header>
												</flex-column-header>
												<!-- BOOM TEST {{model}}  -->
												<!-- <pre>TESTING NOW? {{id}} {{model}}</pre> -->
												<!-- <flex-column-body> -->
												<component :item="model" v-bind:is="component" :config="config" v-if="component" />
												<!-- <pre>{{component}}</pre> -->
												<!-- </flex-column-body> -->
								</template>
				</flex-column>
</template>
<script>
import Vue from 'vue';
import DynamicImportService from 'src/DynamicImportService.js';



export default {
				props: {
								embedded: {
												type: Boolean,
								},
								'id': {
												type: [String, Object],
												required: true,
								},
								'type': {
												type: String,
												required: true,
								},
								'definition': {
												type: String,
								},
								'options': {
												default: function() {
																return {}
												},
												type: Object,
								},
				},
				data() {
								return {
												loadingConfig: true,
												loadingModel: true,
								}
				},
				methods: {
								cancel() {
												this.$emit('cancel');
								},
								edit() {
												this.$fluro.global.edit(this.model);
								},
				},

				created() {
								// this.reset(true);
								if (this.model && !this.model.data) {
												this.$set(this.model, 'data', {});
								}
				},
				computed: {
								summary() {
												var self = this;
												switch (self.type) {
																case 'event':
																				return self.$fluro.date.readableEventDate(self.model);
																				break;
																case 'plan':

																				var hasEvent = _.get(self.model, 'event.title');
																				var planStartDate = _.get(self.model, 'startDate');

																				///////////////////////////////////////

																				var readableStartDate;

																				if (hasEvent) {
																								readableStartDate = self.$fluro.date.readableEventDate(self.model.event);
																								return readableStartDate ? `${readableStartDate} - ${self.model.event.title}` : undefined;
																				} else if (planStartDate) {
																								readableStartDate = self.$fluro.date.formatDate(planStartDate, 'h:mm ddd D MMM')
																								return readableStartDate ? readableStartDate : undefined;
																				}


																				break;
												}
								},
								typeName() {
												var self = this;
												return self.definition || self.type;
								},
								title() {
												return this.model.title;
								},
								definitionTitle() {
												return this.config.definition ? this.config.definition.title : this.config.type.title;
								},
								// definition() {
								//     return this.config.definition;
								// },
								canEdit() {

												switch (this.type) {
																case 'mailout':
																				if (this.model.state == 'sent') {
																								return;
																				}
																				break;
												}

												///////////////////////////////////////

												return this.$fluro.access.canEditItem(this.model);
								},
								itemID() {
												return this.$fluro.utils.getStringID(this.id);
								},
								loading() {
												return this.loadingModel || this.loadingConfig;
								},

				},
				asyncComputed: {
								component: {
												default: null,
												get() {

																var self = this;
																if (!self.type) {
																				// console.log('No type name yet!')
																				return Promise.resolve(null);
																}

																//////////////////////////////////////////


																switch (self.type) {
																				case 'academic':

																								break;
																				case 'application':

																								break;
																				case 'article':
																								return DynamicImportService.load('src/components/content/view/panels/article.vue', function() {
																												return import('src/components/content/view/panels/article.vue')
																								})
																								break;
																				case 'asset':
																								return DynamicImportService.load('src/components/content/view/panels/asset.vue', function() {
																												return import('src/components/content/view/panels/asset.vue')
																								})
																								break;
																				case 'attendance':

																								break;
																				case 'audio':

																								break;
																				case 'capability':

																								break;
																				case 'checkin':

																								break;
																				case 'code':

																								break;
																				case 'collection':
																								return DynamicImportService.load('src/components/content/view/panels/collection.vue', function() {
																												return import('src/components/content/view/panels/collection.vue')
																								})
																								break;
																				case 'component':

																								break;
																				case 'contact':
																								return DynamicImportService.load('src/components/content/view/panels/contact.vue', function() {
																												return import('src/components/content/view/panels/contact.vue')
																								})
																								break;
																				case 'contactdetail':

																								break;
																				case 'definition':

																								break;
																				case 'event':
																								return DynamicImportService.load('src/components/content/view/panels/event.vue', function() {
																												return import('src/components/content/view/panels/event.vue')
																								})
																								break;
																				case 'eventtrack':

																								break;
																				case 'family':

																								break;
																				case 'image':

																								break;
																				case 'integration':

																								break;
																				case 'location':

																								break;
																				case 'interaction':
																								return DynamicImportService.load('src/components/content/view/panels/interaction.vue', function() {
																												return import('src/components/content/view/panels/interaction.vue')
																								})
																								break;
																				case 'mailout':
																								return DynamicImportService.load('src/components/content/view/panels/mailout.vue', function() {
																												return import('src/components/content/view/panels/mailout.vue')
																								})
																								break;
																				case 'persona':

																								break;
																				case 'plan':
																								return DynamicImportService.load('src/components/content/view/panels/plan.vue', function() {
																												return import('src/components/content/view/panels/plan.vue')
																								})
																								break;
																				case 'policy':

																								break;
																				case 'post':
																								return DynamicImportService.load('src/components/content/view/panels/post.vue', function() {
																												return import('src/components/content/view/panels/post.vue')
																								})
																								break;
																				case 'process':

																								break;
																				case 'query':

																								break;
																				case 'realm':

																								break;
																				case 'role':

																								break;
																				case 'roster':

																								break;
																				case 'tag':
																								return DynamicImportService.load('src/components/content/view/panels/tag.vue', function() {
																												return import('src/components/content/view/panels/tag.vue')
																								})
																								break;
																				case 'team':

																								break;
																				case 'ticket':

																								break;
																				case 'timetrigger':

																								break;
																				case 'video':
																								return DynamicImportService.load('src/components/content/view/panels/video.vue', function() {
																												return import('src/components/content/view/panels/video.vue')
																								})
																								break;

																}

																return Promise.resolve(null);

												}
								},
								config: {
												default: null,
												get() {

																var self = this;


																//////////////////////////////////////////////

																self.loadingConfig = true;

																//////////////////////////////////////////////

																return new Promise(function(resolve, reject) {
																				return self.$fluro.api.get(`/defined/type/${self.typeName}`).then(function(res) {
																								resolve(res.data);
																								self.loadingConfig = false;
																				}, reject);
																})
												},
								},
								model: {
												default: null,
												get() {
																var self = this;
																self.loadingModel = true;

																return new Promise(function(resolve, reject) {
																				self.$fluro.content.get(self.itemID, {
																												appendContactDetail: 'all',
																												appendAssignments: 'all',
																								})
																								.then(function(res) {

																												if (!res.data) {
																																res.data = {};
																												}

																												resolve(res);
																												self.loadingModel = false;
																								})
																								.catch(function(err) {


																												console.log('Error', err);

																												resolve(null);
																												self.loadingModel = false;
																								});
																});
												},
								}
				},
}

</script>
<style lang="scss">
</style>
<style scoped lang="scss">
</style>
