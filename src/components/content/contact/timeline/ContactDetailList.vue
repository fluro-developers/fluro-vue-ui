<template>
				<flex-column class="contact-detail-list">
								<template v-if="loading">
												<fluro-page-preloader contain />
								</template>
								<template v-else>
												<!-- <flex-column-header>
                <v-container class="border-bottom text-xs-center" style="background: #fff;">
                   
                </v-container>
            </flex-column-header> -->
												<flex-column-body style="background: #eee;">
																<v-container fluid>
																				<fluro-panel class="sheet-panel" fluid :key="sheet._id" v-for="sheet in orderedSheets" :class="sheet.status">
																								<fluro-panel-title>
																												<v-layout align-center>
																																<v-flex shrink>
																																				<fluro-realm-dots :realms="sheet.realms" />
																																</v-flex>
																																<v-flex>
																																				<strong>{{sheet.fullDefinition.title}} <span v-if="sheet.status == 'archived'">(Archived)</span></strong>
																																</v-flex>
																																<v-flex shrink v-if="$fluro.access.canEditItem(sheet)">
																																				<v-btn small class="ma-0" icon v-tippy content="Edit" @click="edit(sheet)">
																																								<fluro-icon icon="pencil" />
																																				</v-btn>
																																</v-flex>
																																<v-flex shrink>
																																				<v-btn small class="ma-0" icon v-tippy content="Actions" @click="$actions.open([sheet])">
																																								<fluro-icon icon="ellipsis-h" />
																																				</v-btn>
																																</v-flex>
																												</v-layout>
																								</fluro-panel-title>
																								<fluro-panel-body v-if="sheet.status != 'archived'">
																												<!-- <pre>{{sheet.fullDefinition.fields}}</pre> -->
																												<fluro-content-render :fields="sheet.fullDefinition.fields" v-model="sheet.data" />
																												<!-- <pre>{{sheet.data}}</pre> -->
																												<!-- <post-card :item="post" /> -->
																								</fluro-panel-body>
																				</fluro-panel>
																</v-container>
												</flex-column-body>
								</template>
				</flex-column>
</template>
<script>
import _ from 'lodash';
import FluroContentRender from 'src/components/FluroContentRender.vue';

export default {
				props: {
								contact: {
												type: Object,
								}
				},
				components: {
								FluroContentRender,
				},
				data() {
								return {
												loading: false,
								}
				},
				methods: {
								edit(sheet) {

												var self = this;

												self.$fluro.global.edit(sheet, true)
																.then(function(response) {
																				console.log('RESPONSE!', response, sheet)
																				self.$set(sheet, 'data', response.data);
																})
								},
								create(definition) {

												var self = this;
												var options = {
																definition,
																item: self.contact,
												}

												///////////////////////////

												var promise = self.$fluro.modal({
																				component: AddPost,
																				options,
																})
																.then(function() {
																				self.$fluro.resetCache();
																});


								},
				},
				computed: {
								orderedSheets() {
												return _.chain(this.items)
																.orderBy(function(sheet) {

																				//TODO order by weight

																				switch (sheet.status) {
																								case 'archived':
																												return 1000;
																												break;
																								case 'active':
																												return -1000;
																												break;
																				}

																				return 0;
																})
																.value()
								}
				},
				asyncComputed: {
								items: {
												default: [],
												get() {

																var self = this;
																self.loading = true;

																var contactID = self.$fluro.utils.getStringID(self.contact);
																if (!contactID) {
																				Promise.resolve([])
																				self.loading = false;
																}

																return new Promise(function(resolve, reject) {

																				self.$fluro.api.get(`/contact/details/${contactID}`).then(function(res) {
																												resolve(res.data);
																												self.loading = false;
																								})
																								.catch(function(err) {
																												reject(err);
																												self.loading = false;

																								});
																				// https://api.staging.fluro.io/info/checkins?contact=592e50389d9129595a75cc4e
																})
												}
								}
				}
}

</script>
<style lang="scss">
.sheet-panel {
				&.archived {
								opacity: 0.5;
				}
}

</style>
