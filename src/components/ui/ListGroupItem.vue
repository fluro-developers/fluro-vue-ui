<template>
				<component :is="componentType" class="list-group-item" :href="href" :target="target" :to="to" @click="clicked" :class="[isSelected ? 'active selected' : '', extraClasses]">
								<div>
												<fluro-realm-bar v-if="item" :realm="item._type == 'realm' ? [item] : item.realms" />
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
								<!-- <pre>{{item}}</pre> -->
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
								extraClasses() {
												var self = this;
												var array = [];

												if (!self.item) {
																return;
												}

												switch (self.item._type) {
																case 'transaction':
																				switch (self.item.paymentStatus) {
																								case 'refund':
																								case 'partial_refund':
																												array.push('archived');
																												break;
																								case 'failed':
																												array.push('error');
																												break;
																				}
																				break;
												}

												if (self.item.status) {
																array.push(`status-${self.item.status}`)
												}



												return array;
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
																case 'transaction':

																				pieces.push(self.$fluro.utils.formatCurrency(self.item.amount, self.item.currency));
																				pieces.push(self.item.mode == 'sandbox' ? 'Sandbox / Test Payment' : 'Live Payment');
																				pieces.push(self.item.module);



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


				&.status-archived {
								background: #eee;
								opacity: 0.8;
				}

				&.status-deleted {
								background: rgba($danger, 0.1);
								opacity: $danger;
								text-decoration: line-through;
				}

				&.status-error,
				&.status-failed {
								//background: rgba($danger, 0.1);
								//color: $danger;
				}


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
