<template>
				<flex-column>
								<template v-if="loading">
												<fluro-page-preloader contain />
								</template>
								<tabset v-else :justified="true" :vertical="true">
												<tab>
																<flex-column-body style="background: #fafafa;">
																				<v-container>
																								<constrain sm>
																												<div class="grid-list-xl">
																																<fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.title" v-model="model" />
																																<fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.module" v-model="model" />
																																<fluro-panel v-if="definition && definition.fields && definition.fields.length">
																																				<fluro-panel-body>
																																								<fluro-content-form :options="options" v-model="model.data" :fields="definition.fields"></fluro-content-form>
																																				</fluro-panel-body>
																																</fluro-panel>
																																<template v-if="model.module == 'stripe'">
																																				<stripe v-model="model" />
																																</template>
																																<template v-if="model.module == 'eway'">
																																				<eway v-model="model" />
																																</template>
																																<template v-if="model.module == 'songselect'">
																																				<songselect :saveCallback="save" v-model="model" />
																																</template>
																																<template v-if="model.module == 's3'">
																																				<s3 v-model="model" />
																																</template>
																																<template v-if="model.module == 'paypal'">
																																				<paypal v-model="model" />
																																</template>
																																<template v-if="model.module == 'oauth.google'">
																																				<googleoauth v-model="model" />
																																</template>
																																<template v-if="model.module == 'oauth.facebook'">
																																				<facebook v-model="model" />
																																</template>
																																<template v-if="model.module == 'stripeconnect'">
																																				<stripe-connect v-model="model" />
																																</template>
																																<div v-show="false">
																																				<pre>{{model.privateDetails}}</pre>
																																				<pre>{{model.publicDetails}}</pre>
																																</div>
																																<!-- <template v-if="model.module == 'eway'">
																																				<fluro-panel>
																																								<fluro-panel-body>
																																												<div class="panel-heading">
																																																<h5>eWay Integration Details</h5>
																																												</div>
																																												<div class="panel-body">
																																																<div class="form-group">
																																																				<label>Rapid API Key</label>
																																																				<input class="form-control" ng-model="item.privateDetails.apiKey" placeholder="Rapid API Key">
																																																</div>
																																																<div class="form-group">
																																																				<label>Rapid API Password</label>
																																																				<input class="form-control" ng-model="item.privateDetails.apiPassword" placeholder="Rapid API Password">
																																																</div>
																																																<div class="form-group">
																																																				<label>Client Side Encryption Key</label>
																																																				<p class="help-block">
																																																								To implement client side encryption <a target="_blank" href="https://eway.io/api-v3/#implementation">More information can be found here</a>
																																																				</p>
																																																				<input class="form-control" ng-model="item.publicDetails.publicKey" placeholder="Publishable Key">
																																																</div>
																																												</div>
																																								</fluro-panel-body>
																																				</fluro-panel>
																																</template>
																																<template v-if="model._id && model.module == 'youtube'">
																																				<fluro-panel v-if=">
																																				<fluro-panel-body>
																																								<v-btn class=" ma-0" large @click="authenticate()" color="primary">
																																								Authenticate with Youtube
																																								<fluro-icon icon="youtube" library="fab" right />
																																								</v-btn>
																																								</fluro-panel-body>
																																				</fluro-panel>
																																</template> -->
																												</div>
																								</constrain>
																				</v-container>
																</flex-column-body>
												</tab>
								</tabset>
				</flex-column>
</template>
<script>
/////////////////////////////////

import FluroContentEditMixin from "src/components/content/edit/FluroContentEditMixin.js";



/////////////////////////////////

import Vue from "vue";

/////////////////////////////////

import Stripe from 'src/components/content/edit/panels/integrations/Stripe.vue';
import Eway from 'src/components/content/edit/panels/integrations/Eway.vue';
import SongSelect from 'src/components/content/edit/panels/integrations/SongSelect.vue';
import AWSS3 from 'src/components/content/edit/panels/integrations/AWSS3.vue';
import PayPal from 'src/components/content/edit/panels/integrations/PayPal.vue';
import GoogleOAuth from 'src/components/content/edit/panels/integrations/GoogleOAuth.vue';
import FacebookOAuth from 'src/components/content/edit/panels/integrations/FacebookOAuth.vue';
import StripeConnect from 'src/components/content/edit/panels/integrations/StripeConnect.vue';



/////////////////////////////////

export default {
				mixins: [FluroContentEditMixin],
				components: {
								Stripe,
								Eway,
								'paypal': PayPal,
								's3': AWSS3,
								'songselect': SongSelect,
								'googleoauth': GoogleOAuth,
								'facebook': FacebookOAuth,
								'stripe-connect': StripeConnect,

				},
				methods: {
								authenticate() {
												var self = this;
												var moduleName = self.model.module;
												if (!self.model._id) {
																return self.$fluro.error({
																				message: "Please save before authenticating"
																});
												}

												switch (moduleName) {
																case "youtube":
																				if (process.browser) {
																								window.location.href = `${self.$fluro.apiURL}/integrate/${moduleName}/${self.model._id}/oauth`;
																				}
																				break;
												}
								},
								modelUpdated() {
												this.update(this.model);
								}
				},
				created() {
								var self = this;

								if (!self.model.privateDetails) {
												self.$set(self.model, 'privateDetails', {});
								}

								if (!self.model.publicDetails) {
												self.$set(self.model, 'publicDetails', {});
								}


				},
				asyncComputed: {},
				computed: {
								showOutline() {
												return false; //true; //false;//true;//false;//true;
								},
								moduleOptions() {
												var array = [];

												array.push({
																				title: "Stripe",
																				value: "stripe"
																}, {
																				title: "PayPal",
																				value: "paypal"
																}, {
																				title: "SongSelect",
																				value: "songselect"
																}, {
																				title: "eWay",
																				value: "eway"
																}, {
																				title: "AWS S3",
																				value: "s3"
																}, {
																				title: "Google OAuth",
																				value: "oauth.google"
																}, {
																				title: "Facebook OAuth",
																				value: "oauth.facebook"
																}, {
																				title: "Stripe Connect",
																				value: "stripeconnect"
																},
																/**
																{
																																				title: "PushPay",
																																				value: "pushpay"
																																},
																																{
																																				title: "Xero",
																																				value: "xero"
																																}, {
																																				title: "Youtube API",
																																				value: "youtube"
																																}, {
																																				title: "Facebook API",
																																				value: "facebook"
																																}
																																/**/
																// {
																//     title:'Facebook API',
																//     value:'facebook',
																// },
												);
												return array;
								},
								fieldsOutput() {
												var self = this;
												var array = [];

												///////////////////////////////////

												addField("title", {
																title: "Title",
																minimum: 1,
																maximum: 1,
																type: "string"
												});

												// ///////////////////////////////////

												addField("module", {
																title: "Module",
																minimum: 1,
																maximum: 1,
																type: "string",
																directive: "select",
																options: self.moduleOptions,
																expressions: {
																				show() {
																								return !self.model._id || !self.model.module;
																				}
																}
												});

												function addField(key, details) {
																details.key = key;
																array.push(details);
												}

												return array;
								}
				},
				data() {
								return {};
				}
};

</script>
<style scoped lang="scss">
.hint {
				font-size: 10px;
				opacity: 0.5;
				color: inherit;
				display: block;
}

</style>
