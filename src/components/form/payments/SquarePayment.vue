<template>
				<flex-column class="fluro-prompt-dialog">
								<flex-column-header class="border-bottom text-center">
												<!-- <v-container pa-2> -->
												<!-- <strong>Payment</strong> -->
												<!-- </v-container> -->
								</flex-column-header>
								<form style="flex:1; display:flex; " @submit.prevent.stop="done">
												<flex-column-body>
																<v-container pa-2 grid-list-xl>
																				<constrain xs>
																								<div class="payment-logo">
																												<svg version="1.1" id="layer" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 652 652" style="enable-background:new 0 0 652 652;" xml:space="preserve">
																																<g>
																																				<path class="st0" d="M148.7,252.5H51c-13.4,0-24.4,11-24.4,24.4v97.6c0,13.4,11,24.4,24.4,24.4h97.6c13.4,0,24.4-11,24.4-24.4
		v-97.6C173.1,263.4,162.1,252.5,148.7,252.5L148.7,252.5z M146.4,364.5c0,4.3-3.5,7.7-7.8,7.7H61c-4.3,0-7.8-3.5-7.8-7.7v-77.7
		c0-4.3,3.5-7.8,7.8-7.8h77.7c4.3,0,7.8,3.5,7.8,7.8L146.4,364.5L146.4,364.5z M119.8,341.2c0,2.4-2,4.4-4.4,4.4H84.3
		c-2.4,0-4.4-2-4.4-4.4v-31.1c0-2.4,2-4.4,4.4-4.4h31.1c2.4,0,4.4,2,4.4,4.4C119.8,310.1,119.8,341.2,119.8,341.2z M240.8,373.7
		c-8.7,0-17-3.3-22.9-9.2c-5.2-5.2-8.2-12-8.2-19.2h8.8c0,4.8,2,9.4,5.6,12.9c4.2,4.2,10.3,6.6,16.7,6.6h0.1
		c12.3,0,22.2-8.6,22.2-19.1c0-7.9-4.4-14.2-25.7-19.1c-8.7-2-14.5-4.7-18.4-8.4c-4.1-4-6.2-9.4-6.2-16.3c0-13.8,12.3-25,27.5-25
		c7.3,0,14.1,2.5,19.3,7c5.3,4.7,8.3,11,8.3,17.8h-8.8c0-8.9-8.4-16.1-18.8-16.1c-10.2,0-18.7,7.4-18.7,16.2c0,8,2.8,12.7,17.8,16.2
		c16,3.7,32.4,9.9,32.5,27.7c0,7.6-3.3,14.6-9.2,19.9C256.9,370.9,249.1,373.7,240.8,373.7L240.8,373.7z M344.4,398.7v-38.5h-0.2
		c-5.7,8.7-15.5,13.2-25.9,13.2c-19.9,0-35.7-14.9-35.7-35c0-19.9,16.2-34.7,35.7-34.7c10.3,0,20.2,4.5,25.9,13.4h0.2v-11.7h8.5
		v93.3H344.4L344.4,398.7z M318.3,311.4c-15.8,0-27.2,11.8-27.2,27.4c0,15.5,11.6,27,27.2,27c15.1,0,26.6-12.3,26.6-27.1
		C344.9,323.9,333.3,311.4,318.3,311.4z M501,371.9v-11.7h-0.2c-5.8,8.7-15.5,13.2-25.9,13.2c-19.9,0-35.7-14.9-35.7-35
		c0-19.9,16.1-34.7,35.7-34.7c10.4,0,20.2,4.4,25.9,13.4h0.2v-11.7h8.5v66.4H501L501,371.9z M474.8,311.4
		c-15.8,0-27.2,11.8-27.2,27.4c0,15.5,11.7,27,27.2,27c15.1,0,26.6-12.3,26.6-27.1C501.4,323.9,489.9,311.4,474.8,311.4z M534.9,333
		v38.9h-8.5v-66.4h8.5v9.6h0.2c3.7-8.5,10.1-10.7,18.7-11.3v9C542.2,313.7,534.9,321.1,534.9,333 M626.5,341.8H566
		c0.6,13.1,12.8,24,25.8,24c10.2,0,20.2-5.8,23.8-15.7h9c-4.8,13.8-18,23.3-32.7,23.3c-19.2,0-34.6-15.7-34.6-34.7
		c0-18.9,15.4-35,34.5-35c19.4,0,34.9,16.4,34.9,35.6C626.6,340.2,626.5,340.9,626.5,341.8 M591.9,311.4c-13.2,0-23.8,9.7-25.9,22.7
		h51.9C615.7,321.1,605.3,311.4,591.9,311.4 M418.8,372v-10.4h-0.2c-3.9,8.2-12.6,12-21.4,12c-8.7,0-17.4-3-22.9-10
		c-4.8-6-5.8-14-5.8-21.5v-36.9h8.5V342c0,13.8,5,23.9,20.3,23.9c5.6,0,10-1.5,14.2-5.4c5.9-5.6,7-12.2,7-20v-35.3h8.5V372
		L418.8,372L418.8,372z" />
																																</g>
																												</svg>
																								</div>
																								<div class="text-center" v-if="!rendered">
																												Initializing
																								</div>
																								<div v-show="rendered">
																												<div id="sq-card-number"></div>
																												<v-layout row>
																																<v-flex>
																																				<div id="sq-expiration-date"></div>
																																</v-flex>
																																<v-flex>
																																				<div id="sq-cvv"></div>
																																</v-flex>
																												</v-layout>
																								</div>
																				</constrain>
																</v-container>
												</flex-column-body>
												<flex-column-footer class="border-top" v-if="rendered">
																<v-container pa-2>
																				<constrain xs>
																								<v-layout>
																												<template v-if="webMode">
																																<fluro-button tag="a" block @click="dismiss()">
																																				{{cancelText}}
																																				<!-- Cancel -->
																																</fluro-button>
																												</template>
																												<template v-else>
																																<v-btn block @click="dismiss()">
																																				{{cancelText}}
																																</v-btn>
																												</template>
																												<v-spacer />
																												<template v-if="webMode">
																																<fluro-button tag="button" :loading="processing" block type="submit" color="primary">
																																				{{confirmText}}
																																				<!-- Continue -->
																																</fluro-button>
																												</template>
																												<template v-else>
																																<v-btn block type="submit" :loading="processing" color="primary">
																																				{{confirmText}}
																																				<!-- Continue -->
																																</v-btn>
																												</template>
																								</v-layout>
																				</constrain>
																</v-container>
												</flex-column-footer>
								</form>
				</flex-column>
</template>
<script>
import ModalMixin from '../../../mixins/ModalMixin';
export default {
				created() {

								var self = this;

								var scriptURL = "https://js.squareup.com/v2/paymentform";
								if (self.sandboxed) {
												scriptURL = "https://js.squareupsandbox.com/v2/paymentform";
								}

								self.$fluro.utils.injectScript(scriptURL).then(function() {
												console.log("Square has been included on page");

												self.scriptReady = true;
												self.init();
												// self.paymentReady = true;
												// self.createPaymentElements();
								});
				},
				mounted() {

								var self = this;
								// self.$nextTick(function() {
								self.uiReady = true;
								self.init();
								// })

				},
				mixins: [ModalMixin],
				computed: {
								sandboxed() {
												return this.debugMode || this.options.sandbox || _.get(this.actualPaymentIntegration, 'publicDetails.sandbox');
								},
								webMode() {
												return this.options.webMode;
								},
								confirmText() {
												var self = this;
												return `Pay ${self.$fluro.utils.formatCurrency(self.amount, self.currency)}`;

								},
								cancelText() {
												return `Back`;
								},
								formattedAmount() {
												return this.$fluro.utils.formatCurrency(this.amount, this.currency);
								},
								amount() {
												return parseInt(this.options.amount)
								},
								currency() {
												return _.get(this.actualPaymentIntegration, 'publicDetails.currency');
								},
								debugMode() {
												return this.options.debugMode;
								},
								actualPaymentIntegration() {
												return this.options.integration;
								},
				},
				methods: {
								done() {
												this.onGetCardNonce();
								},
								onGetCardNonce(event) {

												var self = this;
												console.log('Get card nonce', event);
												self.paymentForm.requestCardNonce();
												self.processing = true;

								},
								init() {

												var self = this;
												console.log('attempt init()')


												if (!self.scriptReady) {
																console.log('halt - script not ready')
																return;
												}

												if (!self.uiReady) {
																console.log('halt - ui not ready')
																return;
												}

												if (self.initialized) {
																console.log('halt - already initialized')
																return;
												}


												console.log('Initialize NOW!')
												//Ensure we only initialize once
												self.initialized = true;

												///////////////////////

												//Application IDs
												var liveApplicationID = _.get(self.actualPaymentIntegration, 'publicDetails.productionApplicationID');
												var sandboxApplicationID = _.get(self.actualPaymentIntegration, 'publicDetails.sandboxApplicationID');

												//Location IDs
												var liveLocationID = _.get(self.actualPaymentIntegration, 'publicDetails.productionLocationID');
												var sandboxLocationID = _.get(self.actualPaymentIntegration, 'publicDetails.sandboxLocationID');

												///////////////////////

												var applicationID;
												var locationID;

												//Check whether we want to force sandbox mode
												var forceSandbox = _.get(self.actualPaymentIntegration, 'publicDetails.sandbox');

												///////////////////////

												if (self.debugMode || forceSandbox) {
																applicationID = sandboxApplicationID;
																locationID = sandboxLocationID;
																console.log('debug mode use sandbox key')
												} else {
																applicationID = liveApplicationID;
																locationID = liveLocationID;
												}

												if (!applicationID && !locationID) {
																return done(null, {
																				error: {
																								message: self.debugMode ?
																												`Integration Setup Error: No test keys found.` : `Integration Setup Error: No live keys found.`
																				}
																});
												}

												///////////////////////

												self.paymentForm = new SqPaymentForm({
																// Initialize the payment form elements

																//TODO: Replace with your sandbox application ID
																applicationId: applicationID,
																locationId: locationID,
																inputClass: 'sq-input',
																autoBuild: false,
																postalCode: false,
																// Customize the CSS for SqPaymentForm iframe elements
																// inputStyles: [{
																//     fontSize: '16px',
																//     lineHeight: '24px',
																//     padding: '16px',
																//     placeholderColor: '#a0a0a0',
																//     backgroundColor: 'transparent',
																// }],
																// Initialize the credit card placeholders
																cardNumber: {
																				elementId: 'sq-card-number',
																				placeholder: 'Card Number'
																},
																cvv: {
																				elementId: 'sq-cvv',
																				placeholder: 'CVV'
																},
																expirationDate: {
																				elementId: 'sq-expiration-date',
																				placeholder: 'MM/YY'
																},
																// postalCode: {
																// 				elementId: 'sq-postal-code',
																// 				placeholder: 'Postal'
																// },
																// SqPaymentForm callback functions
																callbacks: {
																				methodsSupported: function(methods, unsupportedReason) {
																								// var applePayBtn = document.getElementById('sq-apple-pay');
																								// var applePayLabel = document.getElementById('sq-apple-pay-label');
																								// var srcBtn = document.getElementById('sq-src');
																								// var srcLabel = document.getElementById('sq-src-label');

																								console.log('Methods Supported!', methods)
																								// // Only show the button if Apple Pay on the Web is enabled
																								// // Otherwise, display the wallet not enabled message.
																								// if (methods.applePay === true) {
																								//     applePayBtn.style.display = 'inline-block';
																								//     applePayLabel.style.display = 'none';
																								// } else {
																								//     console.log(unsupportedReason);
																								// }

																								// // Only show the button if src is enabled
																								// // Otherwise, display the wallet not enabled message.
																								// if (methods.masterpass === true) {
																								//     srcBtn.style.display = 'inline-block';
																								//     srcLabel.style.display = 'none';
																								// }
																				},

																				paymentFormLoaded() {

																								self.rendered = true;

																								// 				console.log('PAYMENT FORM HAS LOADED')

																								// 				console.log('Create Square token', self.externalPaymentForm);

																								// 				// paymentForm.requestCardNonce();
																								// 				/* HANDLE AS DESIRED */
																								// 				// paymentForm.setPostalCode("POSTAL CODE FROM BILLING");
																				},
																				/*
																				 * callback function: cardNonceResponseReceived
																				 * Triggered when: SqPaymentForm completes a card nonce request
																				 */
																				cardNonceResponseReceived(errors, nonce, cardData) {

																								if (errors) {
																												console.log('Errors NOW DISMISS', errors);
																												return self.dismiss(errors);
																								}

																								var idempotencyKey = self.$fluro.utils.guid();
																								self.close({ nonce, cardData, idempotencyKey });
																								// self.externalPaymentDetails = {
																								// 				errors,
																								// 				nonce,
																								// 				cardData,
																								// }

																								//     // if (errors) {
																								//     //     // Log errors from nonce generation to the browser developer console.
																								//     //     console.error('Encountered errors:');
																								//     //     errors.forEach(function(error) {
																								//     //         console.error('  ' + error.message);
																								//     //     });
																								//     //     alert('Encountered errors, check browser developer console for more details');
																								//     //     return;
																								//     // }

																								//     console.log('CARD RESPONSE', errors, nonce, cardData);
																								//     //TODO: Replace alert with code in step 2.1
																								//     // alert(`The generated nonce is:\n${nonce}`);

																								//     // self.externalPaymentForm.destroy();
																				}
																}
												});


												if (SqPaymentForm.isSupportedBrowser()) {
																console.log('Square is supported in this browser!');
																self.paymentForm.build();
												} else {
																// alert('Square payments are not supported in this browser');
																// Promise.reject('Square payments are not supported in this browser');
																self.dismiss([{
																				message: 'Square payments are not supported in this browser',
																}])
												}
								}
				},
				data() {
								return {
												rendered: false,
												paymentForm: null,
												processing: false,
												initialized: false,
												scriptReady: false,
												uiReady: false,
								}
				}
}

</script>
<style lang="scss">
.sq-card-number {
				clear: both;
}

.sq-expiration-date {
				float: left;
}

.sq-cvv {
				float: left;
}

.sq-input {
				display: inline-block;
				border: 1px solid #E0E2E3;
				border-radius: 4px;
				height: 40px;
				padding: 10px;
}

.sq-input--focus {
				border: 1px solid #4A90E2;
				box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.10), 0 2px 2px 0 rgba(0, 0, 0, 0.10);
}

.sq-input--error {
				border: 1px solid red;
}

// .button-credit-card {
// 				display: block;
// 				width: 100%;
// 				height: 56px;
// 				padding: 15px;
// 				margin-top: 10px;
// 				background: #0EB00E;
// 				box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.10), 0 2px 2px 0 rgba(0, 0, 0, 0.10);
// 				border-radius: 4px;
// 				cursor: pointer;
// 				color: #FFFFFF;
// 				font-size: 16px;
// 				line-height: 24px;
// 				text-align: center;
// 				outline: none;
// }

</style>
<style scoped lang="scss">
.text-center {
				text-align: center;
}

.payment-logo {
				width: 100px;
				display: inline-block;
}

.fluro-prompt-dialog {
				min-width: 300px;
				// max-width: 500px;
				text-align: center;


				form {
								display: flex;
								flex: 1;
								overflow: hidden;
								flex-direction: column;
				}

				.v-list__tile__title {
								font-size: 0.9em;
								font-weight: 500;
				}

}

</style>
