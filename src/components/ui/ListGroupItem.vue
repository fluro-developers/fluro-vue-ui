<template>
				<component :is="componentType" class="list-group-item" :href="href" :target="target" :to="to" @click="clicked" :class="[isSelected ? 'active selected' : '', extraClasses]">
								
								<template v-if="loading">
												loading
								</template>
								<template v-else>
												<div>
																<fluro-realm-bar v-if="actualItem" :realm="actualItem._type == 'realm' ? [actualItem] : actualItem.realms" />
																<slot name="left">
																				<fluro-item-image v-if="actualItem" :item="actualItem" />
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
								</template>
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
								'item': [String, Object],
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
				data() {
								return {
												loading: false,
												actualItem: this.item,
								}
				},
				methods: {
								clicked() {
												this.$emit('click', this.actualItem);
								}
				},
				created() {

								var self = this;

								if (!self.item) {
												self.actualItem = self.item;
								} else {

												//If you have an item id
												if (self.item._id) {
																//We're all good
																self.actualItem = self.item;
												} else {

																//We need to load some extra bits
																self.loading = true;

																//Load the full item
																self.$fluro.content.get(self.item)
																				.then(function(res) {
																								//Replace the full item and stop loading
																								self.actualItem = res;
																								self.loading = false;
																				})
																				.catch(function(err) {
																								//We couldn't load so just leave it
																								self.actualItem = self.item;
																								self.loading = false;
																				})
												}

								}
								if (self.to) {
												self.componentType = 'router-link';
								} else if (self.href) {
												self.componentType = 'a';
								} else {
												self.componentType = 'div';
								}

				},
				computed: {

								title() {
												var self = this;

												if (!self.actualItem) {
																return;
												}

												if (!self.actualItem.title) {
																return `${self.actualItem.firstName} ${self.actualItem.lastName}`
												}

												return self.actualItem.title;

								},
								extraClasses() {
												var self = this;
												var array = [];

												if (!self.actualItem) {
																return;
												}

												switch (self.actualItem._type) {
																case 'transaction':
																				switch (self.actualItem.paymentStatus) {
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

												if (self.actualItem.status) {
																array.push(`status-${self.actualItem.status}`)
												}



												return array;
								},
								readablePaymentStatus() {
												var self = this;
												switch (self.actualItem.paymentStatus) {
																case 'refund':
																				return 'Refunded';
																				break;
																case 'failed':
																				return 'Failed';
																				break;
																case 'success':
																				return 'Paid';
																				break;
																case 'partial_refund':
																				return 'Partially Refunded';
																				break;
												}
								},
								renderFirstLine() {

												var self = this;



												if (self.firstLine && self.firstLine.length) {
																return self.firstLine;
												}

												if (!self.actualItem) {
																return;
												}

												////////////////////////

												var pieces = [];

												switch (self.actualItem._type) {
																case 'contact':

																				pieces.push(self.actualItem.householdRole);
																				pieces.push(self.actualItem.gender);
																				if (self.actualItem.definition) {
																								pieces.push(self.$fluro.types.readable(self.actualItem.definition));
																				}


																				return _.compact(pieces).join(', ');
																				break;
																case 'transaction':


																				pieces.push(`${self.$fluro.utils.formatCurrency(self.actualItem.amount, self.actualItem.currency)} ${String(self.actualItem.currency).toUpperCase()}`);

																				pieces.push(self.readablePaymentStatus);
																				if (self.actualItem.mode == 'sandbox') {
																								pieces.push('Sandbox / TEST Payment');
																				}



																				pieces.push(self.actualItem.module);



																				return _.compact(pieces).join(' • ');
																				break;
																case 'family':

																				pieces.push(self.actualItem.firstLine);
																				if (self.actualItem.address) {
																								pieces.push('•');
																								pieces.push(self.actualItem.address.addressLine1);
																								pieces.push(self.actualItem.address.addressLine2);
																								pieces.push(self.actualItem.address.suburb);
																								pieces.push(self.actualItem.address.state);
																								pieces.push(self.actualItem.address.postalCode);
																								pieces.push(self.actualItem.address.country);
																				}


																				return _.compact(pieces).join(' ');
																				break;
																case 'event':
																				if (self.actualItem.firstLine && self.actualItem.firstLine.length) {
																								return `${self.$fluro.date.readableEventDate(self.actualItem)} - ${self.actualItem.firstLine}`;
																				} else {

																								return self.$fluro.date.readableEventDate(self.actualItem);

																				}
																				break;
																case 'persona':
																				return self.actualItem.collectionEmail || self.actualItem.email;
																				break;
																default:
																				if (self.actualItem.firstLine && self.actualItem.firstLine.length) {
																								return self.actualItem.firstLine;
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
