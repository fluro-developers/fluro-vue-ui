<template>
				<component :is="componentType" class="list-group-item" :href="href" :target="target" :to="to" @click="clicked" :class="isSelected ? 'active selected' : ''">
								<div>
												<fluro-realm-bar v-if="item" :realm="item.realms" />
												<slot name="left">
																<fluro-item-image v-if="item" :item="item" />
												</slot>
								</div>
								<div class="list-group-item-content">
												<slot>
																<strong>{{title}}</strong>
																<div class="muted sm" v-if="renderFirstLine">{{renderFirstLine}}</div>
												</slot>
								</div>
								<div>
												<slot name="right">
												</slot>
								</div>
								<div v-if="selectable">
												<fluro-icon class="tick-icon" icon="check" />
								</div>
								<!-- WOOOOTT -->
								<!-- <pre>{{item}}</pre> -->
				</component>
</template>
<script>
import FluroItemImage from './FluroItemImage.vue';
import FluroRealmBar from './FluroRealmBar.vue';




export default {

				components: {
								FluroItemImage,
				},
				props: {
								to: {
												type: [String, Object]
								},
								href: {
												type: String,
								},
								target: {
												type: String,
								},
								item: {
												type: Object
								},
								firstLine: {
												type: String,
								},
								selectable: {
												type: Boolean,
												required: false,
												default: false,
								},
								isSelected: {
												type: Boolean,
												default: false,
								}
				},
				methods: {
								clicked() {
												this.$emit('click', this.item);
								}
				},
				created() {
								if (this.to) {
												this.componentType = 'router-link';
								} else if (this.href) {
												this.componentType = 'a';
								} else {
												this.componentType = 'div';
								}

				},
				computed: {
								title() {
												var self = this;

												if (!self.item) {
																return;
												}

												if (!self.item.title) {
																return `${self.item.firstName} ${self.item.lastName}`
												}

												return self.item.title;

								},
								renderFirstLine() {

												var self = this;



												if (self.firstLine && self.firstLine.length) {
																return self.firstLine;
												}

												if (!self.item) {
																return;
												}

												////////////////////////

												var pieces = [];

												switch (self.item._type) {
																case 'contact':

																				pieces.push(self.item.householdRole);
																				pieces.push(self.item.gender);
																				if (self.item.definition) {
																								pieces.push(self.$fluro.types.readable(self.item.definition));
																				}


																				return _.compact(pieces).join(', ');
																				break;
																case 'family':

																				pieces.push(self.item.firstLine);
																				if (self.item.address) {
																								pieces.push('•');
																								pieces.push(self.item.address.addressLine1);
																								pieces.push(self.item.address.addressLine2);
																								pieces.push(self.item.address.suburb);
																								pieces.push(self.item.address.state);
																								pieces.push(self.item.address.postalCode);
																								pieces.push(self.item.address.country);
																				}


																				return _.compact(pieces).join(' ');
																				break;
																case 'event':
																				if (self.item.firstLine && self.item.firstLine.length) {
																								return `${self.$fluro.date.readableEventDate(self.item)} - ${self.item.firstLine}`;
																				} else {

																								return self.$fluro.date.readableEventDate(self.item);

																				}
																				break;
																case 'persona':
																				return self.item.collectionEmail || self.item.email;
																				break;
																default:
																				if (self.item.firstLine && self.item.firstLine.length) {
																								return self.item.firstLine;
																				}
																				break;
												}
								}
				}
}

</script>
<style lang="scss">
.list-group-item {
				color: inherit;
				position: relative;
				padding: 7px 10px;
				background: #fff;
				border-bottom: 1px solid rgba(#000, 0.1);
				display: flex;
				align-items: center;
				transition: background 0.3s;
				transition: color 0.3s;
				text-decoration: none;


				.tick-icon {
								opacity: 0;
								transition: opacity 0.3s;
				}

				&:hover {
								background: #fafafa;

								.tick-icon {
												opacity: 1;
								}
				}

				.fluro-item-image {
								margin-right: 10px !important;
				}

				.list-group-item-content {
								flex: 1;
				}

				&:last-child {
								border-bottom: none;
								border-radius-bottom-left: 3px;
								border-radius-bottom-right: 3px;
				}

				&:first-child {
								border-radius-top-left: 3px;
								border-radius-top-right: 3px;
				}

				&.inactive {
								background: #eee;
								color: rgba(#000, 0.5);
				}

				&.selected {
								background: $primary;
								color: #fff;

								.tick-icon {
												opacity: 1;
								}
				}
}

</style>
