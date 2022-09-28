<template>
	<flex-column>
		<tabset :justified="true">
			<tab heading="Submission">
				<flex-column-body>
					<v-container v-if="item">
						<fluro-content-render
							:fields="defaultFields"
							:raw="true"
							v-model="item.rawData"
						></fluro-content-render>
						<fluro-content-render :fields="interactionFields" :raw="true" v-model="item" />

						<!-- <pre>{{defaultFields}}</pre> -->
						<fluro-panel v-if="paymentExists">
							<fluro-panel-body>
								<v-input class="no-flex" v-if="paymentMethod">
									<v-label>Selected Payment Method</v-label>
									<h3>{{ paymentMethod.title || paymentMethod }}</h3>
								</v-input>
								<!-- <v-layout>
                                                  <v-flex>
                                                    <v-input class="no-flex" v-if="paymentMethod">
                                                        <v-label>Total Payable</v-label>
                                                        <h3>{{paymentMethod.title || paymentMethod}}</h3>
                                                </v-input>
                                                  </v-flex>
                </v-layout>-->
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
                </div>-->
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
            </div>-->

						<!-- <pre>{{fields}}</pre> -->
						<fluro-content-render :fields="fields" :raw="true" v-model="item.rawData" />
					</v-container>
				</flex-column-body>
			</tab>
			<tab :heading="`${tickets.length} Tickets`" v-if="tickets.length">
				<flex-column-body style="background: #fff">
					<v-container fluid style="background: #fff" class="border-bottom">
						<img class="qrcode" :src="qrCodeURL" />
					</v-container>
					<v-container>
						<ticket-list type="interaction" :interaction="item" />
					</v-container>
				</flex-column-body>
			</tab>
		</tabset>
	</flex-column>
</template>
<script>
/////////////////////////////////

import Vue from 'vue';

import FluroContentViewMixin from '../FluroContentViewMixin.js';
import TicketList from '../../event/TicketList.vue';

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
	components: {
		TicketList,
	},
	asyncComputed: {
		tickets: {
			default: [],
			get() {
				var self = this;

				self.loading = true;

				///////////////////////////////////

				var url = `/tickets/interaction/${self.item._id}`;

				///////////////////////////////////

				return new Promise(function (resolve, reject) {
					return self.$fluro.api
						.get(url)
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
	mixins: [FluroContentViewMixin],
	methods: {},
	computed: {
		qrCodeURL() {
			var self = this;
			var interactionID = self.$fluro.utils.getStringID(self.item);
			return `${self.$fluro.api.defaults.baseURL}/system/qr?input=http://tickets.fluro.io/interaction/${interactionID}`;
		},
		paymentMethod() {
			return this.item.paymentMethod;
		},
		paymentExists() {
			return (
				_.get(this.config.definition, ' paymentDetails.required') ||
				_.get(this.config.definition, ' paymentDetails.allow')
			);
		},
		data() {
			return this.item.data || {};
		},
		defaultFields() {
			var array = [];

			var self = this;

			var fields = [
				{
					title: 'Names',
					type: 'group',
					key: 'names',
					sameLine: true,
					fields: [
						{
							title: 'First Name',
							key: '_firstName',
							minimum: 0,
							maximum: 1,
							type: 'string',
						},
						{
							title: 'Last Name',
							key: '_lastName',
							minimum: 0,
							maximum: 1,
							type: 'string',
						},
					],
				},
				{
					title: 'Extras',
					type: 'group',
					key: 'extras',
					sameLine: true,
					fields: [
						{
							title: 'Gender',
							key: '_gender',
							minimum: 0,
							maximum: 1,
							type: 'string',
							directive: 'select',
							options: [
								{
									name: 'Male',
									value: 'male',
								},
								{
									name: 'Female',
									value: 'female',
								},
								{
									name: 'Unknown',
									value: 'unknown',
								},
							],
						},
						{
							title: 'Date of Birth',
							key: '_dob',
							minimum: 0,
							maximum: 1,
							type: 'date',
							directive: 'datepicker',
						},
					],
				},
				{
					title: 'Communication',
					type: 'group',
					key: 'communication',
					sameLine: true,
					fields: [
						{
							title: 'Email Address',
							key: '_email',
							minimum: 0,
							maximum: 1,
							type: 'email',
						},
						{
							title: 'Phone Number',
							key: '_phoneNumber',
							minimum: 0,
							maximum: 1,
							type: 'string',
						},
					],
				},
			];

			addField('contactDetails', {
				title: 'Contact Details',
				type: 'group',
				key: 'contactDetails',
				// expressions: {
				//        show() {
				//            return self.
				//        },
				// },
				fields,
			});

			function addField(key, details) {
				details.key = key;
				array.push(details);
			}

			return array;
		},
		interactionFields() {
			var array = [];

			///////////////////////////////////

			addField('contact', {
				title: 'Primary Contact',
				description: 'The primary contact for this interaction',
				minimum: 0,
				maximum: 1,
				type: 'reference',
				params: {
					restrictType: 'contact',
					allDefinitions: true,
				},
			});

			addField('contacts', {
				title: 'Linked Contacts',
				description: 'All contacts referenced for this interaction',
				minimum: 0,
				maximum: 0,
				type: 'reference',
				params: {
					restrictType: 'contact',
					allDefinitions: true,
				},
			});

			addField('event', {
				title: 'Linked Event',
				description: 'Attach this interaction to a specific event',
				minimum: 0,
				maximum: 1,
				type: 'reference',
				params: {
					restrictType: 'event',
					allDefinitions: true,
				},
			});

			///////////////////////////////////

			addField('emails', {
				type: 'group',
				sameLine: true,
				fields: [
					{
						title: 'Primary Email Address',
						key: 'primaryEmail',
						description: 'The primary email address relevant to this interaction',
						minimum: 0,
						maximum: 1,
						type: 'email',
					},
					{
						title: 'Transaction Email Address',
						key: 'transactionEmail',
						description: 'The primary email address relevant to this interaction',
						minimum: 0,
						maximum: 1,
						type: 'email',
						expressions: {
							defaultValue: `data.primaryEmail`,
						},
					},
				],
			});

			addField('transactions', {
				title: 'Transactions',
				type: 'reference',
				key: 'transactions',
				minimum: 0,
				maximum: 0,
				params: {
					restrictType: 'transaction',
				},
			});

			function addField(key, details) {
				details.key = key;
				array.push(details);
			}

			return array;
		},
	},
	data() {
		return {
			loading: true,
		};
	},
};
</script>
<style scoped lang="scss">
.qrcode {
	display: block;
	border: 5px solid #000;
	background: #000;
	margin: auto;
}
</style>
