<template>
				<div class="filter-group-outer" :class="{mini:mini, large:!mini}">
								<v-container ref="element" :class="[{'pa-0': mini}, model.operator]">
												<v-layout row v-if="model.filters.length > 1">
																<v-flex d-flex align-center>
																				<template v-if="mini">
																								<div class="description">
																												Match
																												<select class="select-operator" v-model="model.operator">
																																<option value="and">all</option>
																																<option value="or">any</option>
																																<option value="nor">none</option>
																												</select>
																												of these rules
																								</div>
																				</template>
																				<template v-else>
																								<div class="description">
																												Show items that match
																												<select class="select-operator" v-model="model.operator">
																																<option value="and">all</option>
																																<option value="or">any</option>
																																<option value="nor">none</option>
																												</select> of these conditions
																								</div>
																				</template>
																</v-flex>
												</v-layout>
												<v-layout row :key="group.guid" v-for="(group, g) in model.filters">
																<div class="operator-column offset" :class="model.operator" v-if="model.filters.length > 1" d-flex align-center>
																				<span class="operator" :class="[{additional:g}, model.operator]">{{operatingWord(model, g)}}</span>
																</div>
																<v-flex style="overflow: hidden;">
																				<v-container :class="[{'pa-2': mini}, {'py-2 px-0':!mini}, group.operator]" class="additional filter-group">
																								<template v-if="group.filters">
																												<v-layout row>
																																<v-flex d-flex align-center>
																																				<template v-if="mini">
																																								<!-- v-if="group.filters.length > 1" -->
																																								<div class="description">
																																												Matches
																																												<select class="select-operator" v-model="group.operator">
																																																<option value="and">all</option>
																																																<option value="or">any</option>
																																																<option value="nor">none</option>
																																												</select>
																																												of these conditions
																																								</div>
																																								<!-- <div class="description" v-else>
                                            Matches these conditions
                    </div>-->
																																				</template>
																																				<template v-else>
																																								<div>
																																												<h4>Rule {{g+1}}</h4>
																																												<div v-if="group.filters.length > 1">
																																																Show items that match
																																																<select v-model="group.operator">
																																																				<option value="and">All</option>
																																																				<option value="or">Any</option>
																																																				<option value="nor">None</option>
																																																</select> of these conditions
																																												</div>
																																								</div>
																																				</template>
																																</v-flex>
																																<v-spacer />
																																<template v-if="mini">
																																				<div class="hover" style="white-space: nowrap;">
																																								<v-btn class="ma-0" small flat icon content="Duplicate rule" v-tippy color="grey" @click="duplicateEntry(model, g)">
																																												<fluro-icon icon="copy" />
																																								</v-btn>
																																								<v-btn class="ma-0" small flat icon content="Remove rule" v-tippy color="red" @click="removeEntry(model, g)">
																																												<fluro-icon icon="trash-alt" />
																																								</v-btn>
																																				</div>
																																</template>
																																<template v-else>
																																				<div class="hover">
																																								<v-btn small color="grey" outline @click="duplicateEntry(model, g)">
																																												<span class="btn-label">Duplicate</span>
																																												<fluro-icon right icon="copy" />
																																								</v-btn>
																																								<v-btn small color="red" outline @click="removeEntry(model, g)">
																																												<span class="btn-label">Remove</span>
																																												<fluro-icon right icon="trash-alt" />
																																								</v-btn>
																																				</div>
																																</template>
																												</v-layout>
																												<div v-for="(filter, index) in group.filters" :key="filter.guid">
																																<v-layout>
																																				<div class="operator-column" :class="[group.operator]" v-if="group.filters.length > 1" d-flex align-center>
																																								<span class="operator" :class="[{additional:index}, group.operator]">{{operatingWord(group, index)}}</span>
																																				</div>
																																				<v-flex style="overflow: hidden;">
																																								<template v-if="availableKeys.length">
																																												<filter-condition-row :forceLocalValues="forceLocalValues" :type="type" :useSample="useSample" :rows="rows" :loadingKeys="loadingKeys" :definition="definition" :fields="availableKeys" :mini="mini" @input="debounced" v-model="group.filters[index]" />
																																								</template>
																																				</v-flex>
																																				<div v-if="group.filters.length > 1">
																																								<template v-if="mini">
																																												<v-btn small flat color="error" class="ma-0" icon @click="removeEntry(group, index)">
																																																<fluro-icon icon="trash-alt" />
																																												</v-btn>
																																								</template>
																																								<template v-else>
																																												<v-btn icon small flat color="error" @click="removeEntry(group, index)">
																																																<fluro-icon icon="trash-alt" />
																																												</v-btn>
																																								</template>
																																				</div>
																																</v-layout>
																												</div>
																								</template>
																								<v-btn class="mx-0" small @click="addCondition(group)">
																												Add Condition
																												<fluro-icon right icon="plus" />
																								</v-btn>
																				</v-container>
																</v-flex>
												</v-layout>
												<v-btn class="mx-0" color="white" v-if="!limit" @click="addRule(model)">
																Add {{model.filters.length ? 'Another' : ''}} Rule
																<fluro-icon right icon="plus" />
												</v-btn>
												<!-- <pre>{{model}}</pre> -->
								</v-container>
				</div>
</template>
<script>
import Vue from "vue";
import _ from "lodash";

import { FilterService } from "fluro";
import FilterConditionRow from "./FilterConditionRow.vue";
// import FilterConditionGroup from './FilterConditionGroup.vue';

var indexIterator = 0;
var DEFAULT_COMPARATOR = "in"; //'in'; //'=='

function getFlattenedFields(array, trail, titles) {
				return _.chain(array)
								.map(function(field, key) {
												var returnValue = [];

												// console.log('FIELD WOOT', field);
												/////////////////////////////////////////

												//If there are sub fields
												if (field.fields && field.fields.length) {
																if (field.asObject || field.directive == "embedded") {
																				//Push the field itself
																				trail.push(field.key);
																				titles.push(field.title);

																				field.trail = trail.slice();
																				field.titles = titles.slice();

																				trail.pop();
																				titles.pop();
																				returnValue.push(field);

																				///////////////////////////////

																				//Prepend the key to all lowed fields

																				if (field.maximum != 1) {
																								// trail.push(field.key + '[' + indexIterator + ']');
																								trail.push(field.key + "[]");
																								titles.push(field.title);
																				} else {
																								trail.push(field.key);
																								titles.push(field.title);
																				}
																}

																// console.log('Go down', field.key);
																var fields = getFlattenedFields(field.fields, trail, titles);

																if (field.asObject || field.directive == "embedded") {
																				trail.pop();
																				titles.pop();
																}
																//console.log('Go back up')
																returnValue.push(fields);
												} else {
																/////////////////////////////////////////

																//Push the field key
																trail.push(field.key);
																titles.push(field.title);

																field.trail = trail.slice();
																field.titles = titles.slice();
																trail.pop();
																titles.pop();
																returnValue.push(field);
												}

												/////////////////////////////////////////

												return returnValue;
								})
								.flattenDeep()
								.value();
}

export default {
				props: {
								forceLocalValues: {
												type: Boolean,
								},
								filterFields: {
												type: Array,
												default () {
																return [];
												}
								},
								useSample: {
												type: Boolean
								},
								type: {
												type: String
								},

								fields: {
												type: Array,
												default () {
																return [];
												}
								},
								mini: {
												type: Boolean
								},
								rows: {
												type: Array
								},
								// columns: {
								//     type: Array,
								// },
								value: {
												type: Object,
												required: true,
												default () {
																return {
																				guid: this.$fluro.utils.guid(),
																				operator: "and",
																				filters: []
																};
												}
								},
								debounce: {
												type: Number,
												default: 500
								},
								limit: {
												type: Boolean
								}
				},
				data() {
								var self = this;

								// var clone = this.value;
								var clone = JSON.parse(JSON.stringify(this.value));

								if (!clone.filters) {
												clone.filters = [];
								}
								_.each(clone.filters, function(filter) {
												filter.guid = self.$fluro.utils.guid();
								});

								return {
												model: clone,
												debounced: null,
												operatorOptions: [
																{ text: "All", value: "and" },
																{ text: "Any", value: "or" },
																{ text: "All", value: "and" }
												],
												asyncKeys: [],
												loadingKeys: false
								};
				},
				// beforeCreate: function() {
				//     this.$options.components.FilterConditionRow = require('./FilterConditionRow.vue').default;
				//     this.$options.components.FilterConditionGroup = require('./FilterConditionGroup.vue').default;
				// },
				created() {
								var self = this;

								//Get the filters as an array
								// self.$set(self.model, 'filters', self.model.filters.slice())

								////////////////////////////////////////////////

								self.debounced = _.debounce(function() {
												// self.model = self.words;
												// console.log('FILTER GROUP CHANGED')
												self.$emit("input", self.model);
								}, self.debounce);

								// this.retrieveKeys();
				},

				components: {
								FilterConditionRow
								// FilterConditionGroup,
				},
				methods: {
								operatingWord(group, i) {
												if (i) {
																return group.operator;
												} else {
																switch (group.operator) {
																				case "nor":
																								return "Not";
																								break;
																				default:
																								return "Where";
																								break;
																}
												}
								},
								addRule(group) {

												var useComparator = this.rows && this.rows.length ? DEFAULT_COMPARATOR : '==';
												group.filters.push({
																operator: "and",
																guid: this.$fluro.utils.guid(),
																filters: [{
																				comparator: useComparator,
																}]
												});
								},
								addCondition(group) {

												var useComparator = this.rows && this.rows.length ? DEFAULT_COMPARATOR : '==';

												group.filters.push({
																guid: this.$fluro.utils.guid(),
																comparator: useComparator
												});
								},
								duplicateEntry(group, i) {
												var newEntry = JSON.parse(JSON.stringify(group.filters[i]));
												newEntry.guid = this.$fluro.utils.guid();
												group.filters.splice(i, 0, newEntry);
								},
								removeEntry(group, i) {
												this.$delete(group.filters, i);

												var length = group.filters.length;
												if (length < 2) {
																// console.log('Set to AND')
																this.$set(group, "operator", "and");
												}

												// group.filters.splice(i, 1)
												// Vue.set(group, 'filters', group.filters);

												// this.model.filters.splice(index, 1);
												// this.$set(this.model.filters, index, null);//this.model.filters);
												// this.$delete(this.model.filters, index)
												// this.$set(this.model, 'filters', this.model.filters.slice())
												// var index = this.model.filters.indexOf(filter);
												// this.model.filters.splice(index, 1);
								},

								retrieveKeys() {
												var self = this;

												////////////////////////////////////

												//There are no rows
												if (!self.rows || !self.rows.length) {
																//console.log('Values > No rows')
																self.asyncKeys = [];
																this.loadingKeys = false;
																return;
												}

												////////////////////////////////////

												//Show feedback to the user that we are loading
												//the values for them
												this.loadingKeys = true;

												//This is the key for our cached request
												var cacheKey = self.rowChangeString;

												////////////////////////////////////

												//Get the storage cache
												var valueStorageCache = this.$fluro.cache.get("filter-distinct-keys");

												////////////////////////////////////

												//Check to see if there is already a cached set of values
												//for this query
												var valueCache = valueStorageCache[cacheKey];

												////////////////////////////////////

												//If we haven't already got the values for this request
												if (!valueCache) {
																//Get all the ids
																var subSetIDs = self.$fluro.utils.arrayIDs(self.rows);

																//We need to make an asynchronous request to the server
																//to find out what values we can filter by
																var options = {};

																///////////////////////////////////////////////////////

																if (self.definition && self.definition.type) {
																				options.type = self.definition.type.definitionName;
																}

																///////////////////////////////////////////////////////

																//Make the request and cache it
																valueCache = valueStorageCache[cacheKey] = self.$fluro.content.keys(
																				subSetIDs,
																				options
																);
												}

												/////////////////////////////////////////////////////////////////

												//When the request is complete
												valueCache.then(
																function(res) {
																				// console.log('Keys!!', res);

																				self.asyncKeys = res;
																				self.loadingKeys = false;
																},
																function(err) {
																				// console.log('Error', err);

																				self.asyncKeys = [];
																				self.loadingKeys = false;

																				//Clear the cache request for next time
																				valueStorageCache[cacheKey] = null;
																}
												);
								}
				},

				asyncComputed: {
								eventRealms: {
												default: [],
												get() {
																var self = this;

																// if (!self.isContactType) {
																//  return Promise.resolve([]);
																// }

																return new Promise(function(resolve, reject) {
																				return self.$fluro.access
																								.retrieveSelectableRealms("view", "event", "event", { flat: true })
																								.then(function(realmTypes) {
																												var flattened = _.reduce(
																																realmTypes,
																																function(set, realmType) {
																																				set = set.concat(realmType.realms);
																																				return set;
																																},
																																[]
																												);

																												// console.log('FLATTENED', flattened)
																												resolve(flattened);
																								})
																								.catch(reject);
																});
												}
								},
								eventTracks: {
												get() {
																var self = this;

																////////////////////////////////////////////////////////

																return new Promise(function(resolve, reject) {
																				self.$fluro.api
																								.get("/content/eventtrack", {
																												params: {
																																fields: ["title", "definition", "status"],
																																allDefinitions: true
																												}
																								})
																								.then(function(res) {
																												var tracks = _.chain(res.data)
																																.map(function(track) {
																																				if (track.status != "active") {
																																								return;
																																				}

																																				track.definitionTitle = self.$fluro.types.readable(
																																								track.definition
																																				);

																																				return track;
																																})
																																.compact()
																																.value();

																												resolve(tracks);
																								})
																								.catch(reject);
																});
												}
								},
								groupNames: {
												get() {
																var self = this;
																return Promise.resolve([]);

																// if (!self.isContactType) {
																//     return Promise.resolve([]);
																// }
																// // return new Promise(function(resolve, reject) {

																// return self.$fluro.types.subTypes('interaction')
																// // .then(resolve)
																// // .catch(reject);
																// // })
												}
								},
								interactionTypes: {
												get() {
																var self = this;

																if (!self.isContactType) {
																				return Promise.resolve([]);
																}
																// return new Promise(function(resolve, reject) {

																return self.$fluro.types.subTypes("interaction");
																// .then(resolve)
																// .catch(reject);
																// })
												}
								},

								ticketTypes: {
												get() {
																var self = this;

																switch (self.basicType) {
																				case 'contact':
																				case 'interaction':
																				case 'checkin':

																								return new Promise(function(resolve, reject) {

																												return self.$fluro.api.get(`/tickets/filter/types`)
																																.then(function(res) {
																																				return resolve(res.data);
																																})
																																.catch(reject);
																								})
																								break;
																				default:
																								return Promise.resolve([]);
																								break;
																}


												}
								},

								assignmentPositions: {
												get() {
																var self = this;

																switch (self.basicType) {
																				case 'contact':
																								return new Promise(function(resolve, reject) {

																												return self.$fluro.api.get(`/assignments/filter/types`)
																																.then(function(res) {
																																				return resolve(res.data);
																																})
																																.catch(reject);
																								})
																								break;
																				default:
																								return Promise.resolve([]);
																								break;
																}


												}
								},

								rosterTypes: {
												get() {
																var self = this;

																if (!self.isContactType) {
																				return Promise.resolve([]);
																}
																// return new Promise(function(resolve, reject) {

																return self.$fluro.types.subTypes("roster");
																// .then(resolve)
																// .catch(reject);
																// })
												}
								},

								eventTypes: {
												get() {
																var self = this;

																// return new Promise(function(resolve, reject) {

																return self.$fluro.types.subTypes("event");
																// .then(resolve)
																// .catch(reject);
																// })
												}
								},
								contactTypes: {
												get() {
																var self = this;

																// return new Promise(function(resolve, reject) {

																return self.$fluro.types.subTypes("contact");
																// .then(resolve)
																// .catch(reject);
																// })
												}
								},
								teamTypes: {
												get() {
																var self = this;

																// if (!self.isContactType) {
																//  return Promise.resolve([]);
																// }
																// return new Promise(function(resolve, reject) {

																return self.$fluro.types.subTypes("team", true);
																// .then(resolve)
																// .catch(reject);
																// })
												}
								},
								processTypes: {
												get() {
																var self = this;

																// return new Promise(function(resolve, reject) {

																return self.$fluro.types.subTypes("process");
																// .then(resolve)
																// .catch(reject);
																// })
												}
								},
								postTypes: {
												get() {
																var self = this;

																// return new Promise(function(resolve, reject) {

																return self.$fluro.types.subTypes("post");
																// .then(resolve)
																// .catch(reject);
																// })
												}
								},
								tagTypes: {
												get() {
																var self = this;

																// return new Promise(function(resolve, reject) {

																return self.$fluro.types.subTypes("tag", true);
																// .then(resolve)
																// .catch(reject);
																// })
												}
								},

								definition: {
												get() {
																var self = this;

																if (!self.type || !self.type.length) {
																				return Promise.resolve(null);
																}

																return new Promise(function(resolve, reject) {
																				return self.$fluro.types
																								.get(self.type)
																								.then(function(definition) {
																												return resolve(definition);
																								})
																								.catch(reject);
																});
												}
								}
				},
				computed: {
								// rowChangeString() {
								//     return `${this.type}-${_.orderBy(this.$fluro.utils.arrayIDs(this.rows), function(r) {
								//         return r;
								//     }).toString()}`;
								// },
								//
								/**/

								definitionFields() {
												var self = this;

												return _.chain(self.definition)
																.get("definition.fields")
																.map(function(field) {
																				return Object.assign({}, field, {
																								key: "data." + field.key
																				});
																})
																.value();
								},
								typeFields() {
												var self = this;
												return _.get(self, "definition.type.fields") || [];
								},
								detailSheetFields() {
												var self = this;

												if (
																!self.definition ||
																!self.definition.details ||
																!self.definition.details.length
												) {
																return [];
												}

												return _.reduce(
																self.definition.details,
																function(set, detailSheet) {
																				// //Get all the flattened fields
																				var flattened = getFlattenedFields(detailSheet.fields, [], []);

																				//////////////////////////////////

																				var mapped = _.chain(flattened)
																								.map(function(field) {
																												if (field.type == "group") {
																																return;
																												}

																												return {
																																title: detailSheet.title + " - " + field.titles.join(" > "),
																																// key: `details.${detailSheet.definitionName}.items[0].data.${field.trail.join('.')}`,
																																key: `details.${
                  detailSheet.definitionName
                }.items[].data.${field.trail.join(".")}`,
																																minimum: field.minimum,
																																maximum: field.maximum,
																																detail: detailSheet.definitionName,
																																type: field.type
																												};
																								})
																								.compact()
																								.value();

																				//////////////////////////////////

																				return set.concat(mapped);
																},
																[]
												);
								},
								isContactType() {
												var self = this;

												if (self.basicType == "contact") {
																return true;
												}

												if (self.definition && self.definition.parentType == "contact") {
																return true;
												}
								},
								retrievedBasicType() {
												var self = this;

												if (!self.$fluro || !self.$fluro.types) {
																return self.type;
												}

												return self.$fluro.types.parentType(self.type);
								},
								basicType() {
												return this.retrievedBasicType;
								},

								availableKeys() {
												var self = this;

												var injectFields = self.filterFields.slice();

												/////////////////////////////////////////////

												var postDefinitionOptions = [];

												postDefinitionOptions = postDefinitionOptions.concat(
																_.map(self.postTypes, function(definition) {
																				return {
																								text: definition.title,
																								name: definition.title,
																								title: definition.title,
																								value: definition.definitionName
																				};
																})
												);

												if (self.type) {
																injectFields.push({
																				title: "Posts and Notes > Total linked posts",
																				key: "_posts.all.length",
																				maximum: 1,
																				minimum: 0,
																				type: "integer",
																				subfieldTitle: "Where post matches...",
																				subfields: [{
																												title: "Created Date",
																												key: "created",
																												maximum: 1,
																												minimum: 0,
																												type: "date"
																								},
																								// {
																								//     title: 'Updated Date',
																								//     key: 'updated',
																								//     maximum: 1,
																								//     minimum: 0,
																								//     type: 'date',
																								// },
																								{
																												title: "Realms",
																												key: "realms",
																												maximum: 0,
																												minimum: 0,
																												type: "reference",
																												directive: "select",
																												_discriminatorDefinition: "realm"
																								},
																								{
																												title: "Post Type",
																												key: "definition",
																												maximum: 1,
																												minimum: 0,
																												type: "string",
																												directive: "select",
																												options: postDefinitionOptions
																								},
																								{
																												title: "Title",
																												key: "title",
																												maximum: 1,
																												minimum: 0,
																												type: "string",
																								}
																				]
																});
												}



												function injectReferenceContactFields() {

																injectFields.push({
																				title: "Contact > Address > Address Line 1",
																				key: "_contactFamily.address.addressLine1",
																				maximum: 1,
																				minimum: 0,
																				type: "string",
																});

																injectFields.push({
																				title: "Contact > Address > Address Line 2",
																				key: "_contactFamily.address.addressLine2",
																				maximum: 1,
																				minimum: 0,
																				type: "string",
																});

																injectFields.push({
																				title: "Contact > Address > Suburb",
																				key: "_contactFamily.address.suburb",
																				maximum: 1,
																				minimum: 0,
																				type: "string",
																});

																injectFields.push({
																				title: "Contact > Address > State",
																				key: "_contactFamily.address.state",
																				maximum: 1,
																				minimum: 0,
																				type: "string",
																});

																injectFields.push({
																				title: "Contact > Address > Postal Code",
																				key: "_contactFamily.address.postalCode",
																				maximum: 1,
																				minimum: 0,
																				type: "string",
																});

																injectFields.push({
																				title: "Contact > Address > Country",
																				key: "_contactFamily.address.postalCode",
																				maximum: 1,
																				minimum: 0,
																				type: "string",
																});


																injectFields.push({
																				title: "Contact > First Name",
																				key: "_contact.firstName",
																				maximum: 1,
																				minimum: 0,
																				type: "string",
																});

																injectFields.push({
																				title: "Contact > Preferred Name",
																				key: "_contact.preferredName",
																				maximum: 1,
																				minimum: 0,
																				type: "string",
																});

																injectFields.push({
																				title: "Contact > Last Name",
																				key: "_contact.lastName",
																				maximum: 1,
																				minimum: 0,
																				type: "string",
																});

																injectFields.push({
																				title: "Contact > Primary Email Address",
																				key: "_contact.emails[0]",
																				maximum: 1,
																				minimum: 0,
																				type: "email",
																});

																injectFields.push({
																				title: "Contact > Primary Phone Number",
																				key: "_contact.phoneNumbers[0]",
																				maximum: 1,
																				minimum: 0,
																				type: "string",
																});
												}

												//////////////////////////////////////////////////

												var assignmentPositionOptions = []
												var ticketOptions = [];
												var eventDefinitionOptions = [];
												var contactDefinitionOptions = [];
												var eventTrackOptions = [];
												var rosterDefinitionOptions = [];
												var interactionDefinitionOptions = [];
												var teamDefinitionOptions = [];
												var groupNameOptions = [];

												groupNameOptions = groupNameOptions.concat(
																_.map(self.groupNames, function(group) {
																				return {
																								text: group.title,
																								title: group.title,
																								name: group.title,
																								value: group.title
																				};
																})
												);

												interactionDefinitionOptions = interactionDefinitionOptions.concat(
																_.map(self.interactionTypes, function(definition) {
																				return {
																								text: definition.title,
																								title: definition.title,
																								name: definition.title,
																								value: definition.definitionName
																				};
																})
												);

												rosterDefinitionOptions = rosterDefinitionOptions.concat(
																_.map(self.rosterTypes, function(definition) {
																				return {
																								text: definition.title,
																								title: definition.title,
																								name: definition.title,
																								value: definition.definitionName
																				};
																})
												);

												// console.log('TEAM TYPES', self.teamTypes)

												teamDefinitionOptions = teamDefinitionOptions.concat(
																_.map(self.teamTypes, function(definition) {
																				return {
																								title: definition.title,
																								name: definition.name,
																								text: definition.title,
																								value: definition.definitionName
																				};
																})
												);

												// console.log('TEAM TYPES', self.teamTypes, teamDefinitionOptions)

												//////////////////////////////////////////////////

												// switch (self.basicType) {
												//  case 'contact':
												//  case 'checkin':
												eventDefinitionOptions = eventDefinitionOptions.concat(
																_.map(self.eventTypes, function(definition) {
																				return {
																								name: definition.title,
																								title: definition.title,
																								text: definition.title,
																								value: definition.definitionName
																				};
																})
												);

												contactDefinitionOptions = contactDefinitionOptions.concat(
																_.map(self.contactTypes, function(definition) {
																				return {
																								title: definition.title,
																								name: definition.name,
																								text: definition.title,
																								value: definition.definitionName
																				};
																})
												);

												// console.log('WE GOT CONTACT TYPES', contactDefinitionOptions);

												//////////////////////////////////////////////////
												eventTrackOptions = eventTrackOptions.concat(
																_.map(self.eventTracks, function(track) {
																				return {
																								title: track.title,
																								name: track.title,
																								text: track.title,
																								value: track._id,
																								_id: track._id,
																				};
																})
												);

												//////////////////////////////////////////////////
												ticketOptions = _.chain(self.ticketTypes)
																.map(function(title) {
																				return {
																								title,
																								name: title,
																								text: title,
																								value: title,
																				};
																})
																.orderBy('title')
																.value()


												//////////////////////////////////////////////////
												assignmentPositionOptions = _.chain(self.assignmentPositions)
																.map(function(title) {
																				return {
																								title,
																								name: title,
																								text: title,
																								value: title,
																				};
																})
																.orderBy('title')
																.value()

												// break;
												// }



												var ticketingField = {
																title: "Total number of tickets",
																key: "_tickets.all.length",
																maximum: 1,
																minimum: 0,
																type: "integer",
																subfieldTitle: "Where...",
																subfields: [{
																								title: "Event",
																								key: "event",
																								maximum: 1,
																								minimum: 0,
																								type: "reference",
																								typeSelect: "event"
																				},
																				{
																								title: "Event Date",
																								key: "eventDate",
																								maximum: 1,
																								minimum: 0,
																								type: "date"
																				},
																				{
																								title: "Event Type (Definition)",
																								key: "eventDefinition",
																								maximum: 1,
																								minimum: 0,
																								type: "string",
																								directive: "select",
																								options: eventDefinitionOptions
																				},
																				{
																								title: "Event Track",
																								key: "eventTrack",
																								maximum: 1,
																								minimum: 0,
																								type: "reference",
																								// directive:'select',
																								typeSelect: "eventtrack"
																				},
																				{
																								title: "Ticket Title / Type",
																								key: "title",
																								maximum: 1,
																								minimum: 0,
																								type: "string",
																								directive: "select",
																								options: ticketOptions
																				},
																				{
																								title: "Collected",
																								key: "collected",
																								maximum: 1,
																								minimum: 0,
																								type: "boolean"
																				},
																				{
																								title: "Collected By",
																								key: "collectedBy",
																								maximum: 1,
																								minimum: 0,
																								type: "string"
																				},
																				{
																								title: "Collection Date",
																								key: "collectionDate",
																								maximum: 1,
																								minimum: 0,
																								type: "date"
																				},
																				{
																								title: "Realms",
																								key: "realms",
																								maximum: 0,
																								minimum: 0,
																								type: "reference",
																								directive: "select",
																								_discriminatorDefinition: "realm"
																				},
																				{
																								title: "Tags",
																								key: "tags",
																								maximum: 0,
																								minimum: 0,
																								type: "reference",
																								typeSelect: "tag"
																				},
																				// {
																				// 				title: "Definition",
																				// 				key: "definition",
																				// 				maximum: 0,
																				// 				minimum: 0,
																				// 				type: "string",
																				// 				directive: "select",
																				// 				options: teamDefinitionOptions
																				// },
																				// {
																				// 				title: "Title",
																				// 				key: "title",
																				// 				maximum: 1,
																				// 				minimum: 0,
																				// 				type: "string",
																				// }
																]
												}

												// console.log("EVENT TRACK OPTIONS", eventTrackOptions);

												//////////////////////////////////////////////////

												if (self.isContactType) {
																////////////////////////////////////////////////////////

																injectFields.push({
																				title: "Email Address (Primary)",
																				key: "emails[0]",
																				maximum: 1,
																				minimum: 0,
																				type: "email"
																});

																injectFields.push({
																				title: "Number of Email Addresses",
																				key: "emails.length",
																				maximum: 1,
																				minimum: 0,
																				type: "integer"
																});

																injectFields.push({
																				title: "Phone Number (Primary)",
																				key: "phoneNumbers[0]",
																				maximum: 1,
																				minimum: 0,
																				type: "string"
																});


																injectFields.push({
																				title: "Number of Phone Numbers",
																				key: "phoneNumbers.length",
																				maximum: 1,
																				minimum: 0,
																				type: "integer"
																});

																injectFields.push({
																				title: "Total number of groups contact is a member of",
																				key: "_teams.all.length",
																				maximum: 1,
																				minimum: 0,
																				type: "integer",
																				subfieldTitle: "Where group matches...",
																				subfields: [{
																												title: "Realms",
																												key: "realms",
																												maximum: 0,
																												minimum: 0,
																												type: "reference",
																												directive: "select",
																												_discriminatorDefinition: "realm"
																								},
																								{
																												title: "Tags",
																												key: "tags",
																												maximum: 0,
																												minimum: 0,
																												type: "reference",
																												typeSelect: "tag"
																												// directive: 'content-select-button',
																												// directive: 'select',

																												// directive: 'select',
																												//_discriminatorDefinition: 'tag',
																								},
																								{
																												title: "Definition",
																												key: "definition",
																												maximum: 0,
																												minimum: 0,
																												type: "string",
																												directive: "select",
																												options: teamDefinitionOptions
																								},
																								{
																												title: "Title",
																												key: "title",
																												maximum: 1,
																												minimum: 0,
																												type: "string",
																								}
																				]
																});

																injectFields.push(ticketingField);






																injectFields.push({
																				title: "Attendance > Total times checked in",
																				// key: '_checkins[]',
																				key: "_checkins.all.length",
																				maximum: 1,
																				minimum: 0,
																				type: "integer",
																				subfieldTitle: "Where event matches...",
																				subfields: [{
																												title: "Date",
																												key: "startDate",
																												maximum: 1,
																												minimum: 0,
																												type: "date"
																								},
																								{
																												title: "Event Realms",
																												key: "realms",
																												maximum: 0,
																												minimum: 0,
																												type: "reference",
																												directive: "select",
																												_discriminatorDefinition: "realm"
																								},
																								{
																												title: "Event Track",
																												key: "track",
																												maximum: 1,
																												minimum: 0,
																												type: "reference",
																												// directive:'select',
																												typeSelect: "eventtrack"
																								},
																								{
																												title: "Event",
																												key: "_id",
																												maximum: 0,
																												minimum: 0,
																												type: "reference",
																												// directive:'select',
																												typeSelect: "event"
																								},
																								{
																												title: "Event Type (Definition)",
																												key: "definition",
																												maximum: 1,
																												minimum: 0,
																												type: "string",
																												directive: "select",
																												options: eventDefinitionOptions
																								},
																								{
																												title: "Event Title",
																												key: "title",
																												maximum: 1,
																												minimum: 0,
																												type: "string",
																								},
																				],
																});

																var statusOptions = [{
																								name: 'Draft',
																								value: 'draft',
																				},
																				{
																								name: 'Active',
																								value: 'active',
																				},
																				{
																								name: 'Archived',
																								value: 'archived',
																				},
																];


																injectFields.push({
																				title: "Status > Total times status changed",
																				// key: '_checkins[]',
																				key: "_contactStatus.all.length",
																				maximum: 1,
																				minimum: 0,
																				type: "integer",
																				subfieldTitle: "Where change was...",
																				subfields: [{
																												title: "Date",
																												key: "created",
																												maximum: 1,
																												minimum: 0,
																												type: "date",
																								},

																								{
																												title: "From Status",
																												key: "from",
																												maximum: 1,
																												minimum: 0,
																												type: "string",
																												options: statusOptions,
																								},

																								{
																												title: "To Status",
																												key: "to",
																												maximum: 1,
																												minimum: 0,
																												type: "string",
																												options: statusOptions,
																								},

																								{
																												title: "User responsible",
																												key: "managedUser",
																												maximum: 1,
																												minimum: 0,
																												type: "reference",
																												typeSelect: "persona"
																								},

																				],
																});


																injectFields.push({
																				title: "Contact Definition > Total times definition was changed",
																				// key: '_checkins[]',
																				key: "_contactDefinition.all.length",
																				maximum: 1,
																				minimum: 0,
																				type: "integer",
																				subfieldTitle: "Where change was...",
																				subfields: [{
																												title: "Date",
																												key: "created",
																												maximum: 1,
																												minimum: 0,
																												type: "date",
																								},

																								{
																												title: "From Definition",
																												key: "from",
																												maximum: 1,
																												minimum: 0,
																												type: "string",
																												options: contactDefinitionOptions,
																								},

																								{
																												title: "To Definition",
																												key: "to",
																												maximum: 1,
																												minimum: 0,
																												type: "string",
																												options: contactDefinitionOptions,
																								},

																								{
																												title: "User responsible",
																												key: "managedUser",
																												maximum: 1,
																												minimum: 0,
																												type: "reference",
																												typeSelect: "persona"
																								},

																				],
																});





																// injectFields.push({
																// 				title: "Action Log > Total number of log entries",
																// 				// key: '_checkins[]',
																// 				key: "_contactLogs.all.length",
																// 				maximum: 1,
																// 				minimum: 0,
																// 				type: "integer",
																// 				subfieldTitle: "Where log matches...",
																// 				subfields: [{
																// 												title: "Date",
																// 												key: "created",
																// 												maximum: 1,
																// 												minimum: 0,
																// 												type: "date",
																// 								},
																// 								{
																// 												title: "Key / Type",
																// 												key: "key",
																// 												maximum: 1,
																// 												minimum: 0,
																// 												type: "string",
																// 												directive: 'select',
																// 												options: [
																// 												{
																// 																name: 'Checkin Assignment',
																// 																value:'confirmation.unavailable',
																// 												},
																// 												{
																// 																name: 'Declined Assignment',
																// 																value:'confirmation.unavailable',
																// 												},
																// 												{
																// 																name: 'Graduated to new grade',
																// 																value:'contact.graduation',
																// 												},
																// 												{
																// 																name: 'Graduated to new Academic Calendar',
																// 																value:'calendar.graduated',
																// 												},
																// 												{
																// 																name: 'Responded to assignment swap request',
																// 																value:'assignment.swap.response',
																// 												},
																// 												{
																// 																name: 'Joined a team',
																// 																value:'team.join',
																// 												},
																// 												{
																// 																name: 'Left a team',
																// 																value:'team.leave',
																// 												},
																// 												{
																// 																name: 'Recognised by Facial Recognition Camera',
																// 																value:'contact.recognize',
																// 												},

																// 												]
																// 								},



																// 								{
																// 												title: "User responsible",
																// 												key: "managedUser",
																// 												maximum: 1,
																// 												minimum: 0,
																// 												type: "reference",
																// 												typeSelect: "persona"
																// 								},

																// 				],
																// });


																var guestlistSubFields = [{
																								title: "Event",
																								key: "_id",
																								maximum: 1,
																								minimum: 0,
																								type: "reference",
																								typeSelect: "event"
																				},
																				{
																								title: "Event Date",
																								key: "startDate",
																								maximum: 1,
																								minimum: 0,
																								type: "date"
																				},
																				{
																								title: "Event Type (Definition)",
																								key: "definition",
																								maximum: 1,
																								minimum: 0,
																								type: "string",
																								directive: "select",
																								options: eventDefinitionOptions
																				},
																				{
																								title: "Event Track",
																								key: "track",
																								maximum: 1,
																								minimum: 0,
																								type: "reference",
																								// directive:'select',
																								typeSelect: "eventtrack"
																				},

																				{
																								title: "Realms",
																								key: "realms",
																								maximum: 0,
																								minimum: 0,
																								type: "reference",
																								directive: "select",
																								_discriminatorDefinition: "realm"
																				},
																				{
																								title: "Tags",
																								key: "tags",
																								maximum: 0,
																								minimum: 0,
																								type: "reference",
																								typeSelect: "tag"
																				},
																				{
																								title: "Title",
																								key: "title",
																								maximum: 1,
																								minimum: 0,
																								type: "string",

																				}
																];



																injectFields.push({
																				title: "Guest List > Total number of events expected at",
																				// key: '_checkins[]',
																				key: "_guestExpected.all.length",
																				maximum: 1,
																				minimum: 0,
																				type: "integer",
																				subfieldTitle: "Where event matches...",
																				subfields: guestlistSubFields,
																});

																injectFields.push({
																				title: "Guest List > Total number of RSVP Yes responses",
																				// key: '_checkins[]',
																				key: "_guestConfirmed.all.length",
																				maximum: 1,
																				minimum: 0,
																				type: "integer",
																				subfieldTitle: "Where event matches...",
																				subfields: guestlistSubFields,
																});

																injectFields.push({
																				title: "Guest List > Total number of RSVP No responses",
																				// key: '_checkins[]',
																				key: "_guestDeclined.all.length",
																				maximum: 1,
																				minimum: 0,
																				type: "integer",
																				subfieldTitle: "Where event matches...",
																				subfields: guestlistSubFields,
																});



																injectFields.push({
																				title: "Rostered Assignments > Total times rostered",
																				// key: '_checkins[]',
																				key: "_assignments.all.length",
																				maximum: 1,
																				minimum: 0,
																				type: "integer",
																				subfieldTitle: "Where assignment matches...",
																				subfields: [
																								// {
																								// 				title: "Position",
																								// 				key: "title",
																								// 				maximum: 1,
																								// 				minimum: 0,
																								// 				type: "string",
																								// 				directive: "select"
																								// },
																								{
																												title: "Position",
																												key: "title",
																												maximum: 1,
																												minimum: 0,
																												type: "string",
																												directive: "select",
																												options: assignmentPositionOptions,
																								},
																								{
																												title: "Confirmation Status",
																												key: "confirmationStatus",
																												maximum: 1,
																												minimum: 0,
																												type: "string",
																												directive: "select",
																												options: [{
																																				value: "",
																																				name: "None"
																																},
																																{
																																				value: "confirmed",
																																				name: "Confirmed"
																																},
																																{
																																				value: "denied",
																																				name: "Declined"
																																},
																																{
																																				value: "unknown",
																																				name: "Unknown"
																																}
																												]
																								},
																								{
																												title: "Roster Type",
																												key: "rosterDefinition",
																												maximum: 1,
																												minimum: 0,
																												type: "string",
																												directive: "select",
																												options: rosterDefinitionOptions
																								},
																								{
																												title: "Event Type",
																												key: "eventDefinition",
																												maximum: 1,
																												minimum: 0,
																												type: "string",
																												directive: "select",
																												options: eventDefinitionOptions
																								},
																								{
																												title: "Date",
																												key: "startDate",
																												maximum: 1,
																												minimum: 0,
																												type: "date"
																								},
																								{
																												title: "Realms",
																												key: "realms",
																												maximum: 0,
																												minimum: 0,
																												type: "reference",
																												directive: "select",
																												_discriminatorDefinition: "realm"
																								},
																								{
																												title: "Event Track",
																												key: "track",
																												maximum: 0,
																												minimum: 0,
																												type: "reference",
																												directive: "select",
																												// options: eventTrackOptions
																												typeSelect: "eventtrack",
																								},

																				]
																});



																injectFields.push({
																				title: "Unavailable Periods",
																				// key: '_checkins[]',
																				key: "_unavailability.all.length",
																				maximum: 1,
																				minimum: 0,
																				type: "integer",
																				subfieldTitle: "Matching",
																				subfields: [{
																												title: "Period Starts",
																												key: "startDate",
																												maximum: 1,
																												minimum: 0,
																												type: "date",
																								},
																								{
																												title: "Period Ends",
																												key: "endDate",
																												maximum: 1,
																												minimum: 0,
																												type: "date",
																								},
																								{
																												title: "Period was Created",
																												key: "created",
																												maximum: 1,
																												minimum: 0,
																												type: "date",
																								},
																								{
																												title: "Period was Updated",
																												key: "created",
																												maximum: 1,
																												minimum: 0,
																												type: "date",
																								},
																								// {
																								// 				title: "Event Type",
																								// 				key: "eventDefinition",
																								// 				maximum: 1,
																								// 				minimum: 0,
																								// 				type: "string",
																								// 				directive: "select",
																								// 				options: eventDefinitionOptions
																								// },
																								// {
																								// 				title: "Date",
																								// 				key: "startDate",
																								// 				maximum: 1,
																								// 				minimum: 0,
																								// 				type: "date"
																								// },
																								// {
																								// 				title: "Realms",
																								// 				key: "realms",
																								// 				maximum: 0,
																								// 				minimum: 0,
																								// 				type: "reference",
																								// 				directive: "select",
																								// 				_discriminatorDefinition: "realm"
																								// },
																								// {
																								// 				title: "Event Track",
																								// 				key: "track",
																								// 				maximum: 0,
																								// 				minimum: 0,
																								// 				type: "reference",
																								// 				directive: "select",
																								// 				// options: eventTrackOptions
																								// 				typeSelect: "eventtrack",
																								// },

																				]
																});

																injectFields.push({
																				title: "Forms > Total submissions",
																				key: "_interactions.all.length",
																				maximum: 1,
																				minimum: 0,
																				type: "integer",
																				subfieldTitle: "Where submission matches...",
																				subfields: [{
																												title: "Submission Date",
																												key: "created",
																												maximum: 1,
																												minimum: 0,
																												type: "date"
																								},
																								{
																												title: "Realms",
																												key: "realms",
																												maximum: 0,
																												minimum: 0,
																												type: "reference",
																												directive: "select",
																												_discriminatorDefinition: "realm"
																								},
																								{
																												title: "Form",
																												key: "definition",
																												maximum: 1,
																												minimum: 0,
																												type: "string",
																												directive: "select",
																												options: interactionDefinitionOptions
																								},
																								{
																												title: "Title",
																												key: "title",
																												maximum: 1,
																												minimum: 0,
																												type: "string",
																								}
																				]
																});

																injectFields.push({
																				title: "Mailouts > Total Emails",
																				key: "_mailouts.all.length",
																				maximum: 1,
																				minimum: 0,
																				type: "integer",
																				subfieldTitle: "That matches criteria...",
																				subfields: [{
																												title: "Send Date",
																												key: "date",
																												maximum: 1,
																												minimum: 0,
																												type: "date"
																								},
																								{
																												title: "State",
																												key: "state",
																												maximum: 1,
																												minimum: 0,
																												type: "string",
																												directive: "select",
																												options: [{
																																				text: "Unopened",
																																				value: "sent"
																																},
																																{
																																				text: "Opened",
																																				value: "open"
																																},
																																{
																																				text: "Clicked",
																																				value: "click"
																																},
																																{
																																				text: "Unsubscribed",
																																				value: "unsubscribe"
																																},
																																{
																																				text: "Bounced / Failed",
																																				value: "error"
																																}
																												]
																								},
																								{
																												title: "Mailout Type",
																												key: "mailoutType",
																												maximum: 0,
																												minimum: 0,
																												type: "string",
																												directive: "select",
																												options: [{
																																				text: "Promotional",
																																				value: "promotional"
																																},
																																{
																																				text: "Transactional",
																																				value: "transactional"
																																}
																												]
																								},
																								{
																												title: "Mailout",
																												key: "_id",
																												maximum: 0,
																												minimum: 0,
																												type: "reference",
																												typeSelect: "mailout"
																								},
																								{
																												title: "Title",
																												key: "title",
																												maximum: 1,
																												minimum: 0,
																												type: "string",
																								},
																								{
																												title: "Subject",
																												key: "subject",
																												maximum: 1,
																												minimum: 0,
																												type: "string",
																								}
																				]
																});

																injectFields.push({
																				title: "Fluro Login > Access Passes",
																				key: "_persona.policies",
																				maximum: 1,
																				minimum: 0,
																				type: "reference",
																				typeSelect: "policy"
																});

																injectFields.push({
																				title: "Fluro Login > Status",
																				key: "_persona.state",
																				maximum: 1,
																				minimum: 0,
																				type: "string",
																				directive: "select",
																				options: [{
																												text: "None / No Access",
																												value: "none"
																								},
																								{
																												text: "Awaiting Collection",
																												value: "waiting"
																								},
																								{
																												text: "Connected",
																												value: "connected"
																								}
																				]
																});

																injectFields.push({
																				title: "Fluro Login > Email Address",
																				key: "_persona.email",
																				maximum: 1,
																				minimum: 0,
																				type: "string",
																});


																injectFields.push({
																				title: "Fluro Login > Last Login",
																				key: "_persona.lastLogin",
																				maximum: 1,
																				minimum: 0,
																				type: "date",
																});

																injectFields.push({
																				title: "Fluro Login > First Name",
																				key: "_persona.firstName",
																				maximum: 1,
																				minimum: 0,
																				type: "string",
																});

																injectFields.push({
																				title: "Fluro Login > Last Name",
																				key: "_persona.lastName",
																				maximum: 1,
																				minimum: 0,
																				type: "string",
																});


																injectFields.push({
																				title: "Fluro Login > Creation Date",
																				key: "_persona.created",
																				maximum: 1,
																				minimum: 0,
																				type: "date",
																});



																/////////////////////////////////////////////////////

																injectFields.push({
																				title: "Unsubscribed from Promotional Emails",
																				key: "_unsubscribeEmail",
																				maximum: 1,
																				minimum: 0,
																				type: "boolean",
																});

																injectFields.push({
																				title: "Unsubscribed from Promotional SMS",
																				key: "_unsubscribeSMS",
																				maximum: 1,
																				minimum: 0,
																				type: "boolean",
																});

																/////////////////////////////////////////////////////

																injectFields.push({
																				title: "Posts and Notes > Total linked posts to family members",
																				key: "_familyPosts.all.length",
																				maximum: 1,
																				minimum: 0,
																				type: "integer",
																				subfieldTitle: "Where post matches...",
																				subfields: [{
																												title: "Created Date",
																												key: "created",
																												maximum: 1,
																												minimum: 0,
																												type: "date"
																								},
																								// {
																								//     title: 'Updated Date',
																								//     key: 'updated',
																								//     maximum: 1,
																								//     minimum: 0,
																								//     type: 'date',
																								// },
																								{
																												title: "Realms",
																												key: "realms",
																												maximum: 0,
																												minimum: 0,
																												type: "reference",
																												directive: "select",
																												_discriminatorDefinition: "realm"
																								},
																								{
																												title: "Post Type",
																												key: "definition",
																												maximum: 1,
																												minimum: 0,
																												type: "string",
																												directive: "select",
																												options: postDefinitionOptions
																								},
																								{
																												title: "Title",
																												key: "title",
																												maximum: 1,
																												minimum: 0,
																												type: "string",
																								}
																				]
																});

																/////////////////////////////////////////////////////

																var familyMemberFilters = [{
																								title: "Household Role",
																								key: "householdRole",
																								maximum: 1,
																								minimum: 0,
																								type: "string"
																				},
																				{
																								title: "Age",
																								key: "age",
																								maximum: 1,
																								minimum: 0,
																								type: "integer"
																				},
																				{
																								title: "Gender",
																								key: "gender",
																								maximum: 1,
																								minimum: 0,
																								type: "string"
																				},
																				{
																								title: "Realms",
																								key: "realms",
																								maximum: 0,
																								minimum: 0,
																								type: "reference",
																								directive: "select",
																								_discriminatorDefinition: "realm"
																				},

																				// {
																				//  title: 'Tags',
																				//  key: 'tags',
																				//  maximum: 0,
																				//  minimum: 0,
																				//  type: 'reference',
																				//  directive: 'select',
																				//  _discriminatorDefinition: 'tag',
																				// },

																				{
																								title: "Academic Calendar",
																								key: "academicCalendar",
																								maximum: 1,
																								minimum: 0,
																								type: "reference",
																								typeSelect: "academic"
																				},

																				{
																								title: "Academic Grade",
																								key: "academicGrade",
																								maximum: 1,
																								minimum: 0,
																								type: "string",
																								directive: "select"
																								// typeSelect: 'academicCalendar',
																				},
																				{
																								title: "Status",
																								key: "status",
																								maximum: 1,
																								minimum: 0,
																								type: "string",
																								directive: "select",
																								options: [{
																																name: "active",
																																value: "active"
																												},
																												{
																																name: "archived",
																																value: "archived"
																												},
																												{
																																name: "draft",
																																value: "draft"
																												}
																								]
																				},
																				{
																								title: "Definition",
																								key: "definition",
																								maximum: 1,
																								minimum: 0,
																								type: "string",
																								directive: "select",
																								options: contactDefinitionOptions
																				},
																				{
																								title: "Title",
																								key: "title",
																								maximum: 1,
																								minimum: 0,
																								type: "string",
																				}
																];

																////////////////////////////////////////////////////////

																_.each(self.tagTypes, function(tagType) {
																				familyMemberFilters.push({
																								title: `${tagType.plural} (Tag)`,
																								key: `tags|${tagType.definitionName}`,
																								maximum: 0,
																								minimum: 0,
																								type: "reference",
																								typeSelect: tagType.definitionName
																				});
																});

																injectFields.push({
																				title: "Family Household > Total Number of Family Members",
																				key: "_familyMembers.all.length",
																				maximum: 1,
																				minimum: 0,
																				type: "integer",
																				subfieldTitle: "Where family member matches...",
																				subfields: familyMemberFilters
																});

																// injectFields.push({
																//  title: 'Family Members > Number of Family Members',
																//  key: 'family.items.length',
																//  maximum: 1,
																//  minimum: 0,
																//  type: 'integer',
																// });

																injectFields.push({
																				title: "Family Parents > Number of Parents",
																				key: "family._parents.length",
																				maximum: 1,
																				minimum: 0,
																				type: "integer"
																});

																injectFields.push({
																				title: "Family Children > Number of Children",
																				key: "family._children.length",
																				maximum: 1,
																				minimum: 0,
																				type: "integer"
																});

																injectFields.push({
																				title: "Family Parents > Definition",
																				key: "family._parents[]definition",
																				maximum: 1,
																				minimum: 0,
																				type: "string"
																});

																injectFields.push({
																				title: "Family Children > Definition",
																				key: "family._children[]definition",
																				maximum: 1,
																				minimum: 0,
																				type: "string"
																});

																injectFields.push({
																				title: "Family Members > Definition",
																				key: "family.items[]definition",
																				maximum: 1,
																				minimum: 0,
																				type: "string"
																});

																injectFields.push({
																				title: "Family Parents > Of Gender",
																				key: "family._parents[]gender",
																				maximum: 1,
																				minimum: 0,
																				type: "string",
																				directive: "select",
																				options: [{
																												name: "Male",
																												value: "male"
																								},
																								{
																												name: "Female",
																												value: "female"
																								},
																								{
																												name: "Unknown",
																												value: "unknown"
																								}
																				]
																});

																injectFields.push({
																				title: "Family Members > Of Gender",
																				key: "family.items[]gender",
																				maximum: 1,
																				minimum: 0,
																				type: "string",
																				directive: "select",
																				options: [{
																												name: "Male",
																												value: "male"
																								},
																								{
																												name: "Female",
																												value: "female"
																								},
																								{
																												name: "Unknown",
																												value: "unknown"
																								}
																				]
																});

																injectFields.push({
																				title: "Family Members > Of Household Role",
																				key: "family.items[]householdRole",
																				maximum: 1,
																				minimum: 0,
																				type: "string"
																				// directive: 'select',
																				// options: [{
																				//         name: 'Male',
																				//         value: 'male',
																				//     },
																				//     {
																				//         name: 'Female',
																				//         value: 'female',
																				//     },
																				//     {
																				//         name: 'Unknown',
																				//         value: 'unknown',
																				//     },
																				// ]
																});

																injectFields.push({
																				title: "Family Children > Of Gender",
																				key: "family._children[]gender",
																				maximum: 1,
																				minimum: 0,
																				type: "string",
																				directive: "select",
																				options: [{
																												name: "Male",
																												value: "male"
																								},
																								{
																												name: "Female",
																												value: "female"
																								},
																								{
																												name: "Unknown",
																												value: "unknown"
																								}
																				]
																});

																injectFields.push({
																				title: "Family Children > Of Age",
																				key: "family._children[]age",
																				maximum: 1,
																				minimum: 0,
																				type: "integer"
																});

																injectFields.push({
																				title: "Family Parents > Of Age",
																				key: "family._parents[]age",
																				maximum: 1,
																				minimum: 0,
																				type: "integer"
																});

																injectFields.push({
																				title: "Family Members > Of Age",
																				key: "family.items[]age",
																				maximum: 1,
																				minimum: 0,
																				type: "integer"
																});

																injectFields.push({
																				title: `Family Children > Realms`,
																				key: `family._children[]realms`,
																				maximum: 0,
																				minimum: 0,
																				type: "reference",
																				directive: "select",
																				_discriminatorDefinition: "realm"
																});

																injectFields.push({
																				title: `Family Members > Realms`,
																				key: `family.items[]realms`,
																				maximum: 0,
																				minimum: 0,
																				type: "reference",
																				directive: "select",
																				_discriminatorDefinition: "realm"
																});

																injectFields.push({
																				title: `Family Parents > Realms`,
																				key: `family._parents[]realms`,
																				maximum: 0,
																				minimum: 0,
																				type: "reference",
																				directive: "select",
																				_discriminatorDefinition: "realm"
																});

																//////////////////////////////////////////////////////////////

																// injectFields.push({
																// 				title: `Family Members > in any active Group/Team`,
																// 				key: `family.items[]realms|team`,
																// 				maximum: 0,
																// 				minimum: 0,
																// 				type: "reference",
																// 				directive: "select",
																// 				_discriminator: 'team',
																// 				_discriminatorType: "team"
																// });

																// injectFields.push({
																// 				title: `Family Children > in any active Group/Team`,
																// 				key: `family._children[]realms`,
																// 				maximum: 0,
																// 				minimum: 0,
																// 				type: "reference",
																// 				directive: "select",

																// 				_discriminatorType: "team"
																// });

																// injectFields.push({
																// 				title: `Family Parents > in any active Group/Team`,
																// 				key: `family._parents[]realms`,
																// 				maximum: 0,
																// 				minimum: 0,
																// 				type: "reference",
																// 				directive: "select",

																// 				_discriminatorType: "team"
																// });


																injectFields.push({
																				title: `Assigned position in any active Group/Team`,
																				key: "_positions.active",
																				maximum: 0,
																				minimum: 0,
																				type: "string",
																				directive: "select"
																});

																///////////////////////////////////////////////


																_.each(self.teamTypes, function(teamType) {
																				injectFields.push({
																								title: `Family Members > ${teamType.plural}`,
																								key: `family.items[]realms|${teamType.definitionName}`,
																								maximum: 0,
																								minimum: 0,
																								type: "reference",
																								directive: "select",
																								_discriminator: teamType.definitionName,
																								_discriminatorType: "team"
																				});

																				injectFields.push({
																								title: `Family Children > ${teamType.plural}`,
																								key: `family._children[]realms|${teamType.definitionName}`,
																								maximum: 0,
																								minimum: 0,
																								type: "reference",
																								directive: "select",
																								_discriminator: teamType.definitionName,
																								_discriminatorType: "team"
																				});

																				injectFields.push({
																								title: `Family Parents > ${teamType.plural}`,
																								key: `family._parents[]realms|${teamType.definitionName}`,
																								maximum: 0,
																								minimum: 0,
																								type: "reference",
																								directive: "select",
																								_discriminator: teamType.definitionName,
																								_discriminatorType: "team"
																				});

																				injectFields.push({
																								title: `Assigned position in ${teamType.plural}`,
																								key: `_positions.${teamType.definitionName}`,
																								maximum: 0,
																								minimum: 0,
																								type: "string",
																								directive: "select"
																				});
																});

																///////////////////////////////////////////////

																injectFields.push({
																				title: `Family Children > Tags`,
																				key: `family._children[]tags`,
																				maximum: 0,
																				minimum: 0,
																				type: "reference",
																				typeSelect: "tag"
																				// directive: 'content-select-button',
																				//_discriminatorDefinition: 'tag',
																});

																injectFields.push({
																				title: `Family Members > Tags`,
																				key: `family.items[]tags`,
																				maximum: 0,
																				minimum: 0,
																				type: "reference",
																				typeSelect: "tag"
																				// directive: 'content-select-button',
																				// directive: 'select',
																				//_discriminatorDefinition: 'tag',
																});

																injectFields.push({
																				title: `Family Parents > Tags`,
																				key: `family._parents[]tags`,
																				maximum: 0,
																				minimum: 0,
																				type: "reference",
																				typeSelect: "tag"
																				// directive: 'select',
																				// directive: 'content-select-button',
																				//_discriminatorDefinition: 'tag',
																});

																_.each(self.tagTypes, function(tagType) {
																				injectFields.push({
																								title: `Family Children > ${tagType.plural} (Tag)`,
																								key: `family._children[]tags|${tagType.definitionName}`,
																								maximum: 0,
																								minimum: 0,
																								type: "reference",
																								typeSelect: tagType.definitionName
																								// directive: 'select',
																								// directive: 'content-select-button',
																								// _discriminatorDefinition: tagType.definitionName,
																				});

																				injectFields.push({
																								title: `Family Members > ${tagType.plural} (Tag)`,
																								key: `family.items[]tags|${tagType.definitionName}`,
																								maximum: 0,
																								minimum: 0,
																								type: "reference",
																								typeSelect: tagType.definitionName
																								// directive: 'content-select-button',
																								// directive: 'select',
																								// _discriminatorDefinition: tagType.definitionName,
																				});

																				injectFields.push({
																								title: `Family Parents > ${tagType.plural} (Tag)`,
																								key: `family._parents[]tags|${tagType.definitionName}`,
																								maximum: 0,
																								minimum: 0,
																								type: "reference",
																								typeSelect: tagType.definitionName
																								// directive: 'content-select-button',
																								// directive: 'select',
																								// _discriminatorDefinition: tagType.definitionName,
																				});
																});

																injectFields.push({
																				title: "Family Children > Academic Calendar",
																				key: "family._children[]academicCalendar",
																				maximum: 0,
																				minimum: 0,
																				type: "reference",
																				directive: "select"
																});

																injectFields.push({
																				title: "Family Children > Academic Grade",
																				key: "family._children[]academicGrade",
																				maximum: 0,
																				minimum: 0,
																				type: "string",
																				directive: "select"
																});

																//////////////////////////////////////////////////////////////

																_.each(self.processTypes, function(type) {
																				injectFields.push({
																								title: `Process > ${type.plural} > In Process`,
																								key: `_processes.${type.definitionName}.in`,
																								maximum: 0,
																								minimum: 0,
																								type: "boolean"
																				});

																				injectFields.push({
																								title: `Process > ${type.plural} > Due Date`,
																								key: `_processes.${type.definitionName}.dueDate`,
																								maximum: 0,
																								minimum: 0,
																								type: "date"
																				});

																				injectFields.push({
																								title: `Process > ${type.plural} > Entered Process`,
																								key: `_processes.${type.definitionName}.created`,
																								maximum: 0,
																								minimum: 0,
																								type: "date"
																				});

																				injectFields.push({
																								title: `Process > ${type.plural} > Last Update`,
																								key: `_processes.${type.definitionName}.updated`,
																								maximum: 0,
																								minimum: 0,
																								type: "date"
																				});

																				injectFields.push({
																								title: `Process > ${type.plural} > Current State`,
																								key: `_processes.${type.definitionName}.state`,
																								maximum: 0,
																								minimum: 0,
																								type: "string"
																				});

																				injectFields.push({
																								title: `Process > ${type.plural} > Status`,
																								key: `_processes.${type.definitionName}.processStatus`,
																								maximum: 0,
																								minimum: 0,
																								type: "string"
																				});
																});

																//Add the ability to simply check if a definition has values
												} else {


																var eventLinkType;

																// var definitionName = _.get(self.definition, 'definitionName');
																switch (self.basicType) {
																				case 'interaction':


																								injectFields.push(ticketingField)




																								// 												 case 'utm_campaign':
																								// case 'utm_source':
																								// case 'utm_content':
																								// case 'utm_medium':
																								// case 'utm_term':
																								// case 'fbclid':
																								injectFields.push({
																												title: "UTM Campaign",
																												key: "utm.utm_campaign",
																												maximum: 1,
																												minimum: 0,
																												type: "string",
																								});

																								injectFields.push({
																												title: "UTM Source",
																												key: "utm.utm_source",
																												maximum: 1,
																												minimum: 0,
																												type: "string",
																								});

																								injectFields.push({
																												title: "UTM Medium",
																												key: "utm.utm_medium",
																												maximum: 1,
																												minimum: 0,
																												type: "string",
																								});

																								injectFields.push({
																												title: "UTM Term",
																												key: "utm.utm_term",
																												maximum: 1,
																												minimum: 0,
																												type: "string",
																								});


																								break;
																				case 'persona':
																								// injectFields.push({
																								// 				title: "Contact",
																								// 				key: "_contact.definition",
																								// 				maximum: 1,
																								// 				minimum: 0,
																								// 				type: "string",
																								// 				directive: "select",
																								// 				options: contactDefinitionOptions
																								// });
																								break;
																				case "process":
																								//Extra filters for process cards


																								break;
																				case 'ticket':


																								injectReferenceContactFields();
																								break;
																				case "checkin":
																								//Extra filters for process cards


																								injectReferenceContactFields();

																								injectFields.push({
																												title: "Ticket Type",
																												key: "_ticket.title",
																												maximum: 1,
																												minimum: 0,
																												type: "string",
																												directive: "select",
																												options: ticketOptions
																								});

																								///////////////////////////////////

																								injectFields.push({
																												title: "Contact Definition (Now)",
																												key: "_contact.definition",
																												maximum: 1,
																												minimum: 0,
																												type: "string",
																												directive: "select",
																												options: contactDefinitionOptions
																								});

																								injectFields.push({
																												title: "Contact Definition (At time of checkin)",
																												key: "contactDefinition",
																												maximum: 1,
																												minimum: 0,
																												type: "string",
																												directive: "select",
																												options: contactDefinitionOptions
																								});

																								injectFields.push({
																												title: "Contact Tags (Now)",
																												key: "_contact.tags",
																												maximum: 1,
																												minimum: 0,
																												type: "reference",
																												typeSelect: "tag"
																								});

																								injectFields.push({
																												title: "Contact Email Addresses (Now)",
																												key: "_contact.emails",
																												maximum: 0,
																												minimum: 0,
																												type: "email",

																								});

																								injectFields.push({
																												title: "Contact Phone Numbers (Now)",
																												key: "_contact.phoneNumbers",
																												maximum: 0,
																												minimum: 0,
																												type: "string",

																								});

																								injectFields.push({
																												title: "Contact Status (Now)",
																												key: "_contact.status",
																												maximum: 0,
																												minimum: 0,
																												type: "string",

																								});

																								injectFields.push({
																												title: "Notes",
																												key: "notes",
																												maximum: 0,
																												minimum: 0,
																												type: "string",

																								});

																								injectFields.push({
																												title: "Nametag Notes",
																												key: "notes",
																												maximum: 0,
																												minimum: 0,
																												type: "string",

																								});



																								injectFields.push({
																												title: "Contact Realms (Now)",
																												key: "_contact.realms",
																												maximum: 1,
																												minimum: 0,
																												type: "reference",
																												typeSelect: "realm"
																								});

																								injectFields.push({
																												title: "Contact Tags (At time of checkin)",
																												key: "contactTags",
																												maximum: 1,
																												minimum: 0,
																												type: "reference",
																												typeSelect: "tag"
																								});

																								///////////////////////////////////


																								eventLinkType = true;
																								// {
																								//  title: 'Event Type (Definition)',
																								//  key: 'definition',
																								//  maximum: 1,
																								//  minimum: 0,
																								//  type: 'string',
																								//  directive: 'select',
																								//  // options:[{
																								//  //  name:'Hello',
																								//  //  value:'there',
																								//  // }],
																								//  options: eventDefinitionOptions,
																								// },

																								// injectFields.push({
																								//  title: 'Fluro Login > Status',
																								//  key: '_persona.state',
																								//  maximum: 1,
																								//  minimum: 0,
																								//  type: 'string',
																								//  directive: 'select',
																								//  options: [{
																								//      text: 'None / No Access',
																								//      value: 'none',
																								//    },
																								//    {
																								//      text: 'Awaiting Collection',
																								//      value: 'waiting',
																								//    },
																								//    {
																								//      text: 'Connected',
																								//      value: 'connected',
																								//    },
																								//  ]
																								// });

																								break;
																				case 'plan':
																				case 'attendance':
																				case "ticket":


																								eventLinkType = true;
																								break;
																				case "family":
																								injectFields.push({
																												title: "Total Number of Family Members",
																												key: "memberCount.total",
																												maximum: 1,
																												minimum: 0,
																												type: "integer"
																								});

																								injectFields.push({
																												title: "Total Number of Parents / Guardians",
																												key: "memberCount.parental",
																												maximum: 1,
																												minimum: 0,
																												type: "integer"
																								});

																								injectFields.push({
																												title: "Total Number of Children",
																												key: "memberCount.child",
																												maximum: 1,
																												minimum: 0,
																												type: "integer"
																								});

																								injectFields.push({
																												title: "Total Number of Active Parents / Guardians",
																												key: "memberCount.active_parental",
																												maximum: 1,
																												minimum: 0,
																												type: "integer"
																								});

																								injectFields.push({
																												title: "Total Number of Active Children",
																												key: "memberCount.active_child",
																												maximum: 1,
																												minimum: 0,
																												type: "integer"
																								});

																								injectFields.push({
																												title: "Total Number of Archived Parents / Guardians",
																												key: "memberCount.archived_parental",
																												maximum: 1,
																												minimum: 0,
																												type: "integer"
																								});

																								injectFields.push({
																												title: "Total Number of Archived Children",
																												key: "memberCount.archived_child",
																												maximum: 1,
																												minimum: 0,
																												type: "integer"
																								});

																								injectFields.push({
																												title: "Number of Active Family Members",
																												key: "memberCount.active",
																												maximum: 1,
																												minimum: 0,
																												type: "integer"
																								});

																								injectFields.push({
																												title: "Number of Archived Family Members",
																												key: "memberCount.archived",
																												maximum: 1,
																												minimum: 0,
																												type: "integer"
																								});

																								injectFields.push({
																												title: "Number of Male Family Members",
																												key: "memberCount.gender_male",
																												maximum: 1,
																												minimum: 0,
																												type: "integer"
																								});

																								injectFields.push({
																												title: "Number of Female Family Members",
																												key: "memberCount.gender_female",
																												maximum: 1,
																												minimum: 0,
																												type: "integer"
																								});

																								injectFields.push({
																												title: "Number of Unknown Gender Family Members",
																												key: "memberCount.gender_unknown",
																												maximum: 1,
																												minimum: 0,
																												type: "integer"
																								});

																								injectFields.push({
																												title: "Number of Female Parents / Guardians",
																												key: "memberCount.gender_female_parental",
																												maximum: 1,
																												minimum: 0,
																												type: "integer"
																								});

																								injectFields.push({
																												title: "Number of Male Parents / Guardians",
																												key: "memberCount.gender_male_parental",
																												maximum: 1,
																												minimum: 0,
																												type: "integer"
																								});

																								injectFields.push({
																												title: "Number of Unknown Gender Parents / Guardians",
																												key: "memberCount.gender_unknown_parental",
																												maximum: 1,
																												minimum: 0,
																												type: "integer"
																								});

																								injectFields.push({
																												title: "Number of Active Female Parents / Guardians",
																												key: "memberCount.gender_female_active_parental",
																												maximum: 1,
																												minimum: 0,
																												type: "integer"
																								});

																								injectFields.push({
																												title: "Number of Active Male Parents / Guardians",
																												key: "memberCount.gender_male_active_parental",
																												maximum: 1,
																												minimum: 0,
																												type: "integer"
																								});

																								injectFields.push({
																												title: "Number of Active Unknown Gender Parents / Guardians",
																												key: "memberCount.gender_unknown_active_parental",
																												maximum: 1,
																												minimum: 0,
																												type: "integer"
																								});

																								injectFields.push({
																												title: "Number of Archived Female Parents / Guardians",
																												key: "memberCount.gender_female_archived_parental",
																												maximum: 1,
																												minimum: 0,
																												type: "integer"
																								});

																								injectFields.push({
																												title: "Number of Archived Male Parents / Guardians",
																												key: "memberCount.gender_male_archived_parental",
																												maximum: 1,
																												minimum: 0,
																												type: "integer"
																								});

																								injectFields.push({
																												title: "Number of Archived Unknown Parents / Guardians",
																												key: "memberCount.gender_unknown_archived_parental",
																												maximum: 1,
																												minimum: 0,
																												type: "integer"
																								});

																								injectFields.push({
																												title: "Number of Female Children",
																												key: "memberCount.gender_female_child",
																												maximum: 1,
																												minimum: 0,
																												type: "integer"
																								});

																								injectFields.push({
																												title: "Number of Male Children",
																												key: "memberCount.gender_male_child",
																												maximum: 1,
																												minimum: 0,
																												type: "integer"
																								});

																								injectFields.push({
																												title: "Number of Unknown Gender Children",
																												key: "memberCount.gender_unknown_child",
																												maximum: 1,
																												minimum: 0,
																												type: "integer"
																								});

																								break;
																				case 'team':

																								injectFields.push({
																												title: "Event Tracks",
																												key: "_tracks.all.length",
																												maximum: 1,
																												minimum: 0,
																												type: "integer",
																												subfieldTitle: "Where event track matches...",
																												subfields: [{
																																				title: "Title",
																																				key: "title",
																																				maximum: 1,
																																				minimum: 0,
																																				type: "string",
																																},
																																{
																																				title: "Realms",
																																				key: "realms",
																																				maximum: 0,
																																				minimum: 0,
																																				type: "reference",
																																				directive: "select",
																																				_discriminatorDefinition: "realm"
																																},
																																{
																																				title: "Tags",
																																				key: "tags",
																																				maximum: 0,
																																				minimum: 0,
																																				type: "reference",
																																				typeSelect: "tag"
																																				// directive: 'content-select-button',
																																				// directive: 'select',

																																				// directive: 'select',
																																				//_discriminatorDefinition: 'tag',
																																},


																																// {
																																// 				title: "Definition",
																																// 				key: "definition",
																																// 				maximum: 0,
																																// 				minimum: 0,
																																// 				type: "string",
																																// 				directive: "select",
																																// 				options: teamDefinitionOptions
																																// }

																												]
																								});
																								break;
																				case 'user':

																								injectFields.push({
																												title: 'First Name',
																												key: 'firstName',
																												minimum: 0,
																												maximum: 1,
																								})

																								injectFields.push({
																												title: 'Last Name',
																												key: 'lastName',
																												minimum: 0,
																												maximum: 1,
																								})
																								injectFields.push({
																												title: 'Email',
																												key: 'email',
																												minimum: 0,
																												maximum: 1,
																												type: 'email',
																								})

																								injectFields.push({
																												title: 'Primary Account',
																												key: 'account',
																												minimum: 0,
																												maximum: 1,
																												type: 'reference',
																												params: {
																																restrictType: 'account',
																												}
																								})
																								break;
																				case 'account':

																								_.each([
																												'team',
																												'definition',
																												'contact',
																												'application',
																												'event',
																												'realm',
																												'checkin',
																												'mailout',
																												'video',
																												'image',
																												'asset',
																												'persona',
																												'sitemodel',
																												'site',
																								], function(metricType) {

																												var matchingDefinition = self.$fluro.types.glossary[metricType];

																												injectFields.push({
																																title: `Metrics > ${matchingDefinition.plural}`,
																																key: `data.metrics.storage.${metricType}`,
																																maximum: 0,
																																minimum: 1,
																																type: "integer"
																												});

																								})




																								break;
																				default:
																								switch (self.type) {
																												case "photo":
																																injectFields.push({
																																				title: `EXIF > Copyright`,
																																				key: `data.exif.tags.Copyright`,
																																				maximum: 0,
																																				minimum: 0,
																																				type: "string"
																																});

																																injectFields.push({
																																				title: `EXIF > Camera Make`,
																																				key: `data.exif.tags.Make`,
																																				maximum: 0,
																																				minimum: 0,
																																				type: "string"
																																});

																																injectFields.push({
																																				title: `EXIF > Camera Model`,
																																				key: `data.exif.tags.Model`,
																																				maximum: 0,
																																				minimum: 0,
																																				type: "string"
																																});
																																break;
																								}
																								break;
																}
												}
												//////////////////////////////////////////////////////////////

												if (eventLinkType) {
																injectFields.push({
																				title: "Event Track",
																				key: "_event.track",
																				maximum: 1,
																				minimum: 0,
																				type: "reference",
																				typeSelect: "eventtrack"
																});

																injectFields.push({
																				title: "Event Tags",
																				key: "_event.tags",
																				maximum: 1,
																				minimum: 0,
																				type: "reference",
																				typeSelect: "tag"
																});

																injectFields.push({
																				title: "Event Realms",
																				key: "_event.realms",
																				maximum: 1,
																				minimum: 0,
																				type: "reference",
																				typeSelect: "realm"
																});

																injectFields.push({
																				title: "Event Type / Definition",
																				key: "_event.definition",
																				maximum: 1,
																				minimum: 0,
																				type: "string",
																				directive: "select",
																				options: eventDefinitionOptions
																});

																injectFields.push({
																				title: "Event Start Date",
																				key: "_event.startDate",
																				maximum: 1,
																				minimum: 0,
																				type: "date"
																});

												}

												//////////////////////////////////////////////////////////////

												injectFields = injectFields.concat(self.asyncKeys);

												// return injectFields;

												return FilterService.allKeys(injectFields, self.definition);
								}
				},
				watch: {
								// rowChangeString() {
								//     this.retrieveKeys();
								// },
								value(v) {

												var newValue = JSON.stringify(v);
												var currentValue = JSON.stringify(this.model);

												if (newValue != currentValue) {
																//console.log('new value')
																this.model = JSON.parse(newValue);

												}

								},
								model() {
												// console.log('group changed');
												this.debounced();
								},

								// : {
								// 				handler: function(v) {

								// 					console.log('MODEL CHANGED', v);
								// 								this.debounced();
								// 				},
								// 				deep: true
								// }
				}
};

</script>
<style scoped lang="scss">
$color-nor: #333;
$color-or: $warning;
$color-and: $success;

.filter-group-outer {
				.description {
								font-size: 13px;
								padding: 10px 0;
				}

				.select-operator {
								font-size: 13px;
								border: 1px solid transparent;
								background: none;
								text-align: center;
								appearance: none;
								display: inline-block;

								&:hover {
												border: 1px solid rgba(#000, 0.1);
												background: #fff;
								}
				}

				&.mini {

								.layout {
												margin: -2px !important;
								}

								.flex {
												padding: 2px !important;
								}

								.operator {
												font-weight: 700;
												// letter-spacing: 0.1em;
												overflow: hidden;
												text-align: center;
												text-transform: uppercase;
												font-size: 10px;
												padding: 0 3px;
												position: absolute;
												left: 50%;
												transform: translateX(-50%);
												line-height: 20px;
												height: 20px;
												color: transparent;
												// border-radius: 50%;
												border: 1px solid #fff;
												background: $color-and;
												border-radius: 10px;
												opacity: 0;

												&.additional {
																opacity: 1;
																color: #fff;
												}

												&.nor {
																background: $color-nor;
												}

												&.or {
																background: $color-or;
												}
								}

								.operator-column {
												flex: none !important;

												padding-top: 8px;
												margin-right: 8px;
												width: 25px;
												position: relative;

												&:before {
																content: "";
																border-left: 2px solid rgba(#000, 0.1);
																display: block;
																position: absolute;
																right: 50%;
																height: 100%;
																top: 0;
																bottom: 0;
												}

												&.and:before {
																border-left-color: $color-and;
												}

												&.nor:before {
																border-left-color: $color-nor;
												}

												&.or:before {
																border-left-color: $color-or;
												}
								}

								.filter-group {
												overflow: hidden;

												&.additional {
																border: 1px solid #ccc;
																box-shadow: 0 2px 2px rgba(#000, 0.1);
																border-radius: 5px;
																background: #fff;
																margin-bottom: 15px;
												}

												// &.additional {
												//     border-top: 1px solid rgba(#000, 0.1);
												//     padding-top: 15px;
												//     margin-top: 15px;
												// }

												& .hover {
																@media (min-width: 769px) {
																				opacity: 0;
																}
												}

												&:hover {
																.hover {
																				opacity: 1;
																}
												}
								}
				}

				&.large {
								.operator {
												font-weight: 600;
												letter-spacing: 0.05em;
												text-transform: uppercase;
												font-size: 12px;
												padding: 0 10px;
												position: absolute;
												right: 30px;
												line-height: 32px;
												color: transparent;

												&.additional {
																background: $color-and;
																color: #fff;

																border-radius: 5px 0 0 5px;

																&:after {
																				content: "";
																				display: block;
																				border: 16px solid transparent;
																				border-left-color: $color-and;
																				position: absolute;
																				width: 32px;
																				height: 32px;
																				top: 0;
																				right: -32px;
																}

																&.nor {
																				background: $color-nor;

																				&:after {
																								border-left-color: $color-nor;
																				}
																}

																&.or {
																				background: $color-or;

																				&:after {
																								border-left-color: $color-or;
																				}
																}
												}

												&:before {
																content: "";
																display: block;
																background: $success;
																position: absolute;
																right: -30px;
																top: 50%;
																margin-top: -6px;
																width: 12px;
																height: 12px;
																border-radius: 100%;
																border: 1px solid #fff;
												}

												&.nor {
																&:before {
																				background: $color-nor;
																}
												}

												&.or {
																&:before {
																				background: $color-or;
																}
												}
								}

								.operator-column {
												flex: none !important;

												padding-top: 20px;

												width: 90px;
												margin-right: 25px;
												position: relative;

												&:before {
																content: "";
																border-left: 2px solid rgba(#000, 0.1);
																display: block;
																position: absolute;
																right: 5px;
																height: 100%;
																top: 0;
																bottom: 0;
												}

												&.and:before {
																border-left-color: $color-and;
												}

												&.nor:before {
																border-left-color: $color-nor;
												}

												&.or:before {
																border-left-color: $color-or;
												}
								}

								.filter-group-outer,
								.filter-group {}

								.filter-group {
												&.additional {
																border-top: 1px solid rgba(#000, 0.1);
																padding-top: 15px;
																margin-top: 15px;
												}

												& .hover {
																opacity: 0;
												}

												&:hover {
																.hover {
																				opacity: 1;
																}
												}
								}
				}

				.v-btn.ghost {
								border: 1px dashed rgba(#000, 0.5);
				}
}

</style>
