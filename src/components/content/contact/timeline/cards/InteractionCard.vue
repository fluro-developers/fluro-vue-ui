<template>
				<div class="timeline-entry" @click.stop.prevent="$fluro.global.view(item, true)">
								<fluro-realm-bar :realm="item.realms" />
								<v-layout>
												<v-flex shrink>
																<v-container pa-2>
																				<!-- <fluro-avatar md v-if="item.author" :id="item.author" type="user" /> -->
																				<!-- <fluro-avatar md v-else-if="item.managedAuthor" :id="item.managedAuthor" type="persona" /> -->
																				<!-- <div class="timeline-icon" v-else> -->
																				<div class="timeline-icon">
																								<fluro-icon type="interaction" />
																				</div>
																</v-container>
												</v-flex>
												<v-flex>
																<v-container pa-2>
																				<v-layout>
																								<v-flex>
																												<strong>{{title}}</strong>
																												<div class="datestring">{{datestring}}</div>
																								</v-flex>
																								<v-flex shrink>
																												<v-btn class="ma-0" icon small @click.stop.prevent="$actions.open([item])">
																																<fluro-icon icon="ellipsis-h" />
																												</v-btn>
																												<v-btn class="ma-0" icon small @click.stop.prevent="$fluro.global.edit(item, true)">
																																<fluro-icon icon="pencil" />
																												</v-btn>
																								</v-flex>
																				</v-layout>
																</v-container>
																<!-- <v-container class="border-top" pa-2> -->
																<!-- <pre>{{definedFields}}</pre> -->
																<!-- <fluro-content-render :fields="definedFields" :raw="true"  v-model="item" /> -->
																<!-- <pre>{{item.rawData}}</pre> -->
																<!-- <div class="summary">{{summary}}</div> -->
																<!-- </v-container> -->
												</v-flex>
								</v-layout>
				</div>
</template>
<script>
import FluroContentRender from 'src/components/FluroContentRender.vue';
import FluroAvatar from 'src/components/FluroAvatar.vue';
import FluroRealmBar from 'src/components/ui/FluroRealmBar.vue';

export default {
				props: {
								item: {
												type: Object,
												required: true,
								}
				},
				components: {
								FluroContentRender,
								FluroAvatar,
								FluroRealmBar,

				},
				computed: {
								definedFields() {
												return this.item.fullDefinition.fields;
								},
								author() {
												if (this.item.author && this.item.author.name) {
																return this.item.author.name;
												}

												if (this.item.managedAuthor && this.item.managedAuthor.title) {
																return this.item.managedAuthor.title;
												}

												return 'Someone';
								},
								definitionTitle() {
												return this.$fluro.types.readable(this.item.definition, false, 'post');
								},
								title() {
												return `Submitted a ${this.definitionTitle} form`;
								},
								datestring() {
												return `${this.$filters.formatDate(this.item.created, 'h:mma')} - ${this.$filters.formatDate(this.item.created, 'dddd D MMM YYYY')} - ${this.$filters.timeago(this.item.created)} `
								},
								//     summary() {

								//         switch (this.item.state) {
								//             case 'sent':
								//                 return `Sent to ${this.item.email} - ${this.$filters.formatDate(this.item.date, 'hh:mma')}`;
								//                 break;
								//             case 'click':
								//                 return `Clicked`;
								//                 break;
								//             case 'open':
								//                 return `Read / Opened`;
								//                 break;
								//             case 'error':
								//                 return `Error sending to ${this.item.email}`;
								//                 break;
								//             default:
								//                 break;

								//         }
								//     }
				}
}

</script>
<style lang="scss">
.datestring {
				font-size: 0.8em;
				opacity: 0.5;
}

</style>
