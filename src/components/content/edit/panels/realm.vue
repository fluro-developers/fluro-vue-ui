<template>
				<flex-column>
								<template v-if="loading">
												<fluro-page-preloader contain />
								</template>
								<template v-else>
												<flex-column-body style="background: #fafafa;">
																<v-container fluid grid-list-xl>
																				<constrain sm>
																								<template v-if="requireParent">
																												<h5>Select a parent realm</h5>
																												<!-- <fluro-realm-select @input="updateParentRealm" v-model="parents" type="contactdetail" :definition="sheet.definitionName" /> -->
																												<fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.parent" v-model="model" />
																								</template>
																								<fluro-content-form-field autofocus :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.title" v-model="model" />
																								<v-layout wrap>
																												<v-flex xs12 sm12>
																																<h4>Realm Colors</h4>
																																<p class="muted mb-0">Select colors for the realm below</p>
																																<span class="inline-tag" :style="{color:model.color, backgroundColor:model.bgColor}">
																																				{{model.title}}
																																</span>
																																<!-- <v-chip label small disabled class="chip" :color="model.bgColor" :text-color="model.color">{{model.title || 'Realm Title'}}</v-chip> -->
																												</v-flex>
																												<v-flex xs6 sm3>
																																<fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.color" v-model="model" />
																												</v-flex>
																												<v-flex xs6 sm3>
																																<fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.bgColor" v-model="model" />
																												</v-flex>
																												<v-flex xs12 sm6>
																																<h4>Example Colors</h4>
																																<div class="inline-tags">
																																				<span class="inline-tag" @click="selectExample(tag)" :style="{color:tag.color, backgroundColor:tag.bgColor}" v-for="tag in exampleColors">
																																								{{tag.title}}
																																				</span>
																																</div>
																																<!-- <v-chip label small class="chip" v-for="eg in exampleColors" :color="eg.bgColor" :text-color="eg.color" @click="setColor(eg)">{{eg.title}}</v-chip> -->
																												</v-flex>
																								</v-layout>
																								<template v-if="definition && definition.fields && definition.fields.length">
																												<h3 margin>{{definition.title}} Information</h3>
																												<fluro-content-form :options="options" v-model="model.data" :fields="definition.fields" />
																								</template>
																								<!-- <fluro-content-form :options="options" v-model="model.data" :fields="definition.fields" /> -->
																								<!-- <fluro-content-form v-if="definition && definition.fields && definition.fields.length" :options="options" v-model="model.data" :fields="definition.fields" /> -->
																				</constrain>
																</v-container>
												</flex-column-body>
								</template>
				</flex-column>
</template>
<script>
/////////////////////////////////


import FluroContentEditMixin from '../FluroContentEditMixin.js';

/////////////////////////////////

import Vue from 'vue';


/////////////////////////////////

/////////////////////////////////

export default {
				components: {},
				created() {

								var self = this;
								// if (self.user && self.user.accountType == 'administrator') {
								// 				return;
								// }
								self.requireParent = (!self.model._id && (!self.model.trail || !self.model.trail.length));
				},
				mixins: [FluroContentEditMixin],
				asyncComputed: {
								realmOptions: {
												default: [],
												get() {

																var self = this;



																return new Promise(function(resolve, reject) {


																				// 					FluroCore.api.get('/realm/selectable', {
																				//     params,
																				// }).then(function(res) {
																				//     return resolve(res.data)
																				// }, reject);




																				return self.$fluro.api.get('/realm/selectable', {
																												params: { flat: true },
																								})
																								.then(function(res) {

																												var options = _.chain(res.data)
																																.map(function(realmType) {
																																				return realmType.realms;
																																})
																																.flatten()
																																.map(function(realm) {

																																	var title = realm.title;
																																	var indent = Array(parseInt(realm.trail ? realm.trail.length : 0)+1).join('--');

																																	title = `${indent} ${title}`;
																																				return {
																																								name: title,
																																								title: title,
																																								value: realm._id,
																																				}
																																})
																																.value();



																												return resolve(options);



																								})
																								.catch(function(err) {
																												reject(err);
																								});
																})
												}
								}
				},
				computed: {

								fieldsOutput() {


												var self = this;
												var array = [];

												///////////////////////////////////

												addField('title', {
																title: 'Title',
																minimum: 1,
																maximum: 1,
																type: 'string',
												});

												addField('color', {
																title: 'Text Color',
																minimum: 0,
																maximum: 1,
																type: 'string',
																directive: 'color',
																defaultValues: [''],
												});

												addField('bgColor', {
																title: 'Background Color',
																minimum: 0,
																maximum: 1,
																type: 'string',
																directive: 'color',
																defaultValues: [''],
												});



												addField('parent', {
																title: 'Parent Realm',
																minimum: 1,
																maximum: 1,
																type: 'string',
																directive: 'select',
																options: self.realmOptions,
												});

												///////////////////////////////////

												function addField(key, details) {
																details.key = key;
																array.push(details)
												}

												return array;


								},
								exampleColors() {
												var res = [];

												function addColor(title, color, bgcolor) {
																res.push({
																				title: title,
																				color: color,
																				bgColor: bgcolor,
																});
												}

												addColor('Black', '#eee', '#555');
												addColor('Red', '#8f0f0f', '#ffb5ba');
												addColor('Pink', '#b3125f', '#ffa3c4');
												addColor('Purple', '#7f12b3', '#e7b3ff');
												addColor('Deep Purple', '#7f12b3', '#e2a3ff');
												addColor('Deep Blue', '#433aab', '#a5a3ff');
												addColor('Baby Blue', '#174b99', '#a6caff');
												addColor('Light Blue', '#1366a3', '#9ee2ff');
												addColor('Cyan', '#008b94', '#97f0ed');
												addColor('Medical Green', '#007357', '#97f0cb');
												addColor('Light Green', '#00703a', '#97f0a5');
												addColor('Lime Green', '#00783e', '#a8ed87');
												addColor('Banana Green', '#306b13', '#dbe37f');
												addColor('Desert Camo', '#6b5813', '#e3cd7f');
												addColor('Amber', '#966639', '#ffe175');
												addColor('Fluro Yellow', '#695e00', '#faff00');

												return res;
								}
				},
				watch: {
								'model.parent': function(parent) {

												if (!this.model._id) {
																console.log('PARENT REALM', parent);
																this.$set(this.model, 'trail', [parent]);
												}
								}
				},
				methods: {

								selectExample(tag) {
												var self = this;

												self.$set(self.model, 'color', tag.color);
												self.$set(self.model, 'bgColor', tag.bgColor);
								},
								// setColor(obj) {
								//     var self = this;
								//     self.$set(self, 'model', {
								//      color:obj.color,
								//      bgColor:obj.bgColor,
								//     })

								// }
				},
				data() {





								return {
												requireParent: false,
								}
				},
}

</script>
<style lang="scss">
.chip {
				font-weight: 500;
}

</style>
