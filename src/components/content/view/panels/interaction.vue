<template>
				<flex-column>
								<flex-column-body>
												<v-container v-if="item">
																<!-- <pre>{{item}}</pre> -->
																<!-- TEST WOOT WOOT -->
																<fluro-content-render :fields="fields" :raw="true" v-model="item" />
																<fluro-panel v-if="item.event">
																				<fluro-panel-body>
																								<v-input class="no-flex">
																												<v-label>Event</v-label>
																												<list-group>
																																<list-group-item @click="$fluro.global.view(item.event, true)" :item="item.event">
																																				<template v-slot:right>
																																								<v-btn class="ma-0" small icon @click.stop.prevent="$actions.open([item.event])">
																																												<fluro-icon icon="ellipsis-h" />
																																								</v-btn>
																																				</template>
																																</list-group-item>
																												</list-group>
																								</v-input>
																				</fluro-panel-body>
																</fluro-panel>
																<fluro-panel v-if="paymentExists">
																				<fluro-panel-body>
																								<v-input class="no-flex" v-if="paymentMethod">
																												<v-label>Selected Payment Method</v-label>
																												<h3>{{paymentMethod.title || paymentMethod}}</h3>
																								</v-input>


																								<!-- <v-layout>
																									<v-flex>
																										<v-input class="no-flex" v-if="paymentMethod">
																												<v-label>Total Payable</v-label>
																												<h3>{{paymentMethod.title || paymentMethod}}</h3>
																								</v-input>
																									</v-flex>
																								</v-layout> -->


																								<!-- <div class="row">
																												<div class="form-group col-xs-12 col-sm-4">
																																<label>Total Payable</label>
																																<h3 ng-class="{'brand-danger':amountDue(), 'text-muted':!amountDue()}">{{item.amount / 100 | currency}} <em class="text-muted small text-uppercase">{{item.currency}}</em></h3>
																												</div>
																												<div class="form-group col-xs-12 col-sm-4">
																																<label>Amount Paid</label>
																																<h3 class="text-success">{{amountPaid() / 100 | currency}} <em class="text-muted small text-uppercase">{{item.currency}}</em></h3>
																												</div>
																												<div class="form-group col-xs-12 col-sm-4" ng-if="amountDue()">
																																<label><span ng-if="amountDue() < 0">Refund</span> Due</label>
																																<h3 ng-class="{'text-danger':amountDue() > 0, 'text-success':amountDue() <= 0}">{{amountDue() / 100 | currency}} <em class="text-muted small text-uppercase">{{item.currency}}</em></h3>
																												</div>
																								</div> -->



																				</fluro-panel-body>
																</fluro-panel>
																<!-- <div class="panel panel-default" ng-if="definition.paymentDetails.required || definition.paymentDetails.allow">
																				<div class="panel-body">
																								<div class="form-group" ng-if="item.paymentMethod">
																												<label>Selected Payment Method</label>
																												<h3>{{paymentMethod.title || item.paymentMethod}}</h3>
																								</div>
																								<div class="row">
																												<div class="form-group col-xs-12 col-sm-4">
																																<label>Total Payable</label>
																																<h3 ng-class="{'brand-danger':amountDue(), 'text-muted':!amountDue()}">{{item.amount / 100 | currency}} <em class="text-muted small text-uppercase">{{item.currency}}</em></h3>
																												</div>
																												<div class="form-group col-xs-12 col-sm-4">
																																<label>Amount Paid</label>
																																<h3 class="text-success">{{amountPaid() / 100 | currency}} <em class="text-muted small text-uppercase">{{item.currency}}</em></h3>
																												</div>
																												<div class="form-group col-xs-12 col-sm-4" ng-if="amountDue()">
																																<label><span ng-if="amountDue() < 0">Refund</span> Due</label>
																																<h3 ng-class="{'text-danger':amountDue() > 0, 'text-success':amountDue() <= 0}">{{amountDue() / 100 | currency}} <em class="text-muted small text-uppercase">{{item.currency}}</em></h3>
																												</div>
																								</div>
																								<div class="form-group" ng-if="item.transactions.length">
																												<label>Transaction<span ng-show="item.transactions.length != 1">s</span></label>
																												<div class="list-group">
																																<a class="list-group-item" ng-click="$root.modal.view(transaction)" ng-repeat="transaction in item.transactions track by transaction._id">
																																				<div class="row">
																																								<div class="col-xs-8">
																																												<s ng-if="transaction.paymentStatus == 'refund'">{{transaction.title}} <em class="small text-muted">{{transaction.amount/100 | currency}} <span>{{transaction.currency}}</span></em></s>
																																												<div ng-if="transaction.paymentStatus != 'refund'">{{transaction.title}} <em class="small text-muted">{{transaction.amount/100 | currency}} <span>{{transaction.currency}}</span></em></div>
																																								</div>
																																								<div class="col-xs-4 text-right">
																																												<span ng-if="transaction.paymentStatus == 'refund'" class="label label-warning">Refunded</span>
																																								</div>
																																				</div>
																																</a>
																												</div>
																								</div>
																				</div>
																</div> -->
																<fluro-content-render :fields="definedFields" :raw="true" v-model="item.rawData" />
																<!-- <fluro-content-render :fields="fields" v-model="item.data" /> -->
																<!-- <pre>{{fields}}</pre> -->
												</v-container>
								</flex-column-body>
				</flex-column>
</template>
<script>
/////////////////////////////////

import Vue from 'vue';

import FluroContentViewMixin from 'src/components/content/view/FluroContentViewMixin.js';

/////////////////////////////////

export default {
				props: {
								config: {
												type: Object,
												required: true,
								},
								item: {
												type: Object,
												required: true,
								},
				},
				components: {},
				mixins: [FluroContentViewMixin],
				methods: {},
				computed: {
								paymentMethod() {
												return this.item.paymentMethod
								},
								paymentExists() {
												return _.get(this.config.definition, ' paymentDetails.required') || _.get(this.config.definition, ' paymentDetails.allow')
								},
								data() {
												return this.item.data || {}
								},
								fields() {

												var array = [];

												array.push({
																title: 'Linked Contacts',
																key: 'contacts',
																type: 'reference',
																minimum: 0,
																maximum: 0,
												})

												return array;
								},
								definedFields() {
												return this.config.definition.fields;
								}
				},
				data() {
								return {}
				},
				created() {
								console.log('THIS RENDERER', this)
				}
}

</script>
<style scoped lang="scss">
</style>
