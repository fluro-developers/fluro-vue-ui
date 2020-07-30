<template>
				<v-container class="filter-condition-row grid-list-sm" v-if="ready" :class="{mini:mini}" pa-0>
								<v-layout row wrap>
												<v-flex xs12 sm4>
																<template v-if="fields.length">
																				<template v-if="$vuetify.breakpoint.xsOnly">
																								<v-select single-line dense :loading="loadingKeys" :return-object="true" v-model="selectedKey" item-text="title" item-value="key" :items="fields" />
																				</template>
																				<template v-else>
																								<div v-tippy :content="keyCaption">
																												<v-autocomplete ref="inputKey" single-line dense :loading="loadingKeys" :return-object="true" v-model="selectedKey" item-text="title" item-value="key" :items="groupedFields">
																																<template v-slot:item="data">
																																				<template v-if="typeof data.item !== 'object'">
																																								<!-- <v-divider/> -->
																																								<!-- <v-subheader>{{data.item}}</v-subheader> -->
																																								<!-- <v-list-tile-content v-text="data.item"></v-list-tile-content> -->
																																								<!-- <pre>{{data.item.header}}</pre> -->
																																								<!-- <v-list-tile-content v-text="data.item"></v-list-tile-content> -->
																																				</template>
																																				<template v-else>{{data.item.title}}</template>
																																</template>
																												</v-autocomplete>
																								</div>
																				</template>
																</template>
																<template v-else>
																				<v-text-field single-line label v-model="model.key"></v-text-field>
																</template>
												</v-flex>
												<v-flex xs12 sm3>
																<v-select single-line dense ref="inputComparator" v-model="modelComparator" item-text="title" item-value="operator" :items="comparators" />
												</v-flex>
												<template v-if="comparator && inputType != 'none'">
																<v-flex xs12 sm5 v-if="inputType == 'daterange'">
																				<v-menu :fixed="true" :right="true" ref="dateSelection" :close-on-content-click="false" transition="slide-y-transition" offset-y>
																								<template v-slot:activator="{ on }">
																												<v-btn small flat block class="ma-0" v-on="on">
																																<fluro-icon library="far" icon="calendar" left />
																																{{readableStartDate}} - {{readableEndDate}}
																												</v-btn>
																								</template>
																								<v-card>
																												<v-layout>
																																<v-flex>
																																				<v-card-text>
																																								<label>&nbsp;</label>
																																								<v-list dense>
																																												<v-list-tile @click="selectDatePeriod(option)" v-for="option in datePeriodOptions" :key="option.value">{{option.title}}</v-list-tile>
																																								</v-list>
																																				</v-card-text>
																																</v-flex>
																																<v-flex>
																																				<v-card-text class="text-sm-center">
																																								<label>From Date</label>
																																				</v-card-text>
																																				<v-date-picker v-model="startDateString" no-title scrollable></v-date-picker>
																																</v-flex>
																																<v-flex>
																																				<v-card-text class="text-sm-center">
																																								<label>To Date</label>
																																				</v-card-text>
																																				<v-date-picker v-model="endDateString" no-title scrollable></v-date-picker>
																																</v-flex>
																												</v-layout>
																								</v-card>
																				</v-menu>
																</v-flex>
																<v-flex xs12 sm5 v-else-if="inputType == 'datemeasure'">
																				<v-layout>
																								<v-flex xs6>
																												<v-text-field v-model="model.value" class="small-input" single-line label="Total" />
																								</v-flex>
																								<v-flex xs6>
																												<v-autocomplete class="small-input" dense v-model="model.value2" label="Period" item-text="title" item-value="value" :items="dateMeasures"></v-autocomplete>
																								</v-flex>
																				</v-layout>
																</v-flex>
																<v-flex xs12 sm5 v-else-if="inputType == 'range'">
																				<v-layout>
																								<v-flex xs6>
																												<v-text-field class="small-input" single-line label="from" v-model="model.value"></v-text-field>
																								</v-flex>
																								<v-flex xs6>
																												<v-text-field class="small-input" single-line label="to" v-model="model.value2"></v-text-field>
																								</v-flex>
																				</v-layout>
																</v-flex>
																<v-flex xs12 sm5 v-else-if="inputType == 'array' && dataType != 'date'">
																				<template v-if="simpleKeyIsRealms">
																								<fluro-realm-select action="view any" :filterDiscriminator="discriminator || discriminatorType || discriminatorDefinition" block small v-model="model.values" />
																								<!-- <pre>{{discriminator}} - {{discriminatorType}} - {{discriminatorDefinition}}</pre> -->
																				</template>
																				<template v-else-if="useBasicReferenceSelect">
																								<fluro-content-select-button :createDisabled="true" small block :allDefinitions="true" :type="useBasicReferenceSelect" v-model="model.values" />
																				</template>
																				<template v-else>
																								<template v-if="referenceSelectField">
																												<template v-if="$vuetify.breakpoint.xsOnly">
																																<v-select class="small-input" multiple dense v-model="model.values" item-text="title" item-value="_id" :loading="loadingValues" :items="cleanedValueSelection">
																																				<template v-slot:item="data">
																																								<template v-if="data.item._type == 'event'">
																																												<v-list-tile-content class="border-bottom" style="height:50px;">
																																																<strong>{{data.item.title}}</strong>
																																																<div class="muted">{{data.item | readableEventDate}}</div>
																																												</v-list-tile-content>
																																								</template>
																																								<template v-else>{{data.item.title}}</template>
																																				</template>
																																</v-select>
																												</template>
																												<template v-else>
																																<!-- REFERENCE -->
																																<!-- rEFERENCE {{loadingValues}} - {{cleanedValueSelection.length}} -->
																																<v-autocomplete class="small-input" multiple dense v-model="model.values" item-text="title" item-value="_id" :loading="loadingValues" :items="cleanedValueSelection">
																																				<template v-slot:item="data">
																																								<template v-if="data.item._type == 'event'">
																																												<v-list-tile-content class="border-bottom" style="height:50px;">
																																																<strong>{{data.item.title}}</strong>
																																																<div class="muted">{{data.item | readableEventDate}}</div>
																																												</v-list-tile-content>
																																								</template>
																																								<template v-else>{{data.item.title}}</template>
																																				</template>
																																</v-autocomplete>
																												</template>
																								</template>
																								<template v-else>
																												<template v-if="$vuetify.breakpoint.xsOnly">
																																<v-select class="small-input" multiple dense v-model="model.values" :loading="loadingValues" :items="cleanedValueSelection"></v-select>
																												</template>
																												<template v-else>
																																<!-- STRING TEXT -->
																																<v-autocomplete class="small-input" multiple dense v-model="model.values" :loading="loadingValues" :items="cleanedValueSelection"></v-autocomplete>
																												</template>
																								</template>
																				</template>
																</v-flex>
																<v-flex xs12 sm5 v-else>
																				<template v-if="dataType == 'date'">
																								<template v-if="model.comparator == 'datesameweekday'">
																												<div>
																																<v-select single-line multiple dense v-model="model.values" item-text="title" item-value="value" :items="weekdays" />
																												</div>
																								</template>
																								<template v-else>
																												<div>
																																<v-menu ref="date1" v-model="date1" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
																																				<template v-slot:activator="{ on }">
																																								<template v-if="model.computedValue && model.computedValue.length">
																																												<v-text-field v-model="model.computedValue" class="small-input" single-line label="Relative Date" />
																																								</template>
																																								<template v-else>
																																												<v-text-field v-model="model.value" class="small-input" single-line label="Date" :placeholder="model.computedValue" v-on="on" />
																																								</template>
																																				</template>
																																				<v-date-picker v-model="model.value" no-title scrollable>
																																								<v-spacer></v-spacer>
																																								<v-text-field v-model="model.computedValue" class="small-input" single-line label="Relative Date" />
																																								<v-spacer></v-spacer>
																																								<v-btn flat color="primary" @click="date1 = false">Cancel</v-btn>
																																								<v-btn flat color="primary" @click="$refs.date1.save(model.value)">OK</v-btn>
																																				</v-date-picker>
																																</v-menu>
																												</div>
																								</template>
																				</template>
																				<v-text-field v-else-if="dataType == 'number' || dataType == 'float' || dataType == 'decimal'" class="small-input" single-line v-model="model.value"></v-text-field>
																				<v-text-field v-else-if="dataType == 'integer'" class="small-input" single-line mask="############" v-model="model.value"></v-text-field>
																				<template v-else-if="useBasicReferenceSelect">
																								<!-- <pre>{{referenceID}}</pre> -->
																								<fluro-content-select-button :createDisabled="true" small block :allDefinitions="true" :maximum="1" :single-value="true" :type="useBasicReferenceSelect" v-model="model.value" />
																				</template>
																				<template v-else-if="referenceSelectField">
																								<template v-if="$vuetify.breakpoint.xsOnly">
																												<v-select class="small-input" dense v-model="model.value" item-text="title" item-value="_id" :loading="loadingValues" :items="cleanedValueSelection">
																																<template v-slot:item="data">
																																				<template v-if="data.item._type == 'event'">
																																								<v-list-tile-content class="border-bottom" style="height:50px;">
																																												<strong>{{data.item.title}}</strong>
																																												<div class="muted">{{data.item | readableEventDate}}</div>
																																								</v-list-tile-content>
																																				</template>
																																				<template v-else>{{data.item.title}}</template>
																																</template>
																												</v-select>
																								</template>
																								<template v-else>
																												<v-autocomplete class="small-input" dense v-model="model.value" item-text="title" item-value="_id" :loading="loadingValues" :items="cleanedValueSelection">
																																<template v-slot:item="data">
																																				<template v-if="data.item._type == 'event'">
																																								<v-list-tile-content class="border-bottom" style="height:50px;">
																																												<strong>{{data.item.title}}</strong>
																																												<div class="muted">{{data.item | readableEventDate}}</div>
																																								</v-list-tile-content>
																																				</template>
																																				<template v-else>{{data.item.title}}</template>
																																</template>
																												</v-autocomplete>
																								</template>
																				</template>
																				<template v-else>
																								<template v-if="requiresManualInput">
																												<v-text-field class="small-input" single-line v-model="model.value"></v-text-field>
																								</template>
																								<template v-else>
																												<template v-if="$vuetify.breakpoint.xsOnly">
																																<v-select class="small-input" dense v-model="model.value" :loading="loadingValues" :items="cleanedValueSelection"></v-select>
																												</template>
																												<template v-else>
																																<v-autocomplete class="small-input" dense v-model="model.value" :loading="loadingValues" :items="cleanedValueSelection"></v-autocomplete>
																												</template>
																								</template>
																				</template>
																</v-flex>
												</template>
								</v-layout>
								<!-- <pre>CLEANED {{cleanedValueSelection}}</pre> -->
								<!-- <pre>{{model}}</pre> -->
								<template v-if="hasSubFields">
												<div class="subfields" v-if="model.criteria && model.criteria.length">
																<v-input class="no-flex">
																				<v-label>{{selector.subfieldTitle}}</v-label>
																				<!-- CLARIFICATION -->
																				<!-- :rows="rows" -->
																				<v-layout :key="criteriaRow.guid" v-for="(criteriaRow, index) in model.criteria">
																								<v-flex>
																												<filter-condition-row :type="type" :definition="definition" :rows="rows" :fields="selector.subfields" :mini="mini" v-model="model.criteria[index]" />
																								</v-flex>
																								<v-flex shrink>
																												<v-btn small flat color="error" class="ma-0" icon @click="removeCriteria(index)">
																																<fluro-icon icon="trash-alt" />
																												</v-btn>
																								</v-flex>
																				</v-layout>
																</v-input>
												</div>
												<v-btn small class="ml-0" @click="addCriteriaRow()">
																Add criteria
																<fluro-icon right icon="plus" />
												</v-btn>
								</template>
								<!-- <pre>SELECT AUTO {{cleanedValueSelection}}</pre> -->
								<!-- <pre>{{model.criteria}}</pre> -->
				</v-container>
</template>
<script>
import { FilterService } from "fluro";
import _ from "lodash";

import DynamicImportService from "../../../DynamicImportService";

import FluroRealmSelect from "../realmselect/FluroRealmSelect.vue";
// import FluroContentSelectButton from '../contentselect/FluroContentSelectButton.vue';
// import FilterConditionRow from './FilterConditionRow.vue';
// import FilterConditionGroup from './FilterConditionGroup.vue';

export default {
				name: "filter-condition-row",
				components: {
								FluroRealmSelect
								// FluroContentSelectButton,
								// FilterConditionRow,
								// FilterConditionGroup,
				},
				props: {
								type: {
												type: String
								},
								useSample: {
												type: Boolean
								},
								loadingKeys: {
												type: Boolean
								},
								value: {
												type: Object,
												required: true
												// default () {
												// return {}
												// },
								},
								fields: {
												type: Array,
												default () {
																return [];
												}
								},
								definition: {
												type: Object,
												default () {
																return {};
												}
								},
								rows: {
												type: Array
								},
								// columns: {
								//     type: Array,
								// },
								mini: {
												type: Boolean
								}
				},
				beforeCreate() {
								var self = this;

								Promise.all([
												DynamicImportService.load(
																"./FilterConditionGroup.vue",
																function() {
																				return import("./FilterConditionGroup.vue");
																}
												),
												DynamicImportService.load(
																"./FilterConditionRow.vue",
																function() {
																				return import("./FilterConditionRow.vue");
																}
												),
												DynamicImportService.load(
																"../contentselect/FluroContentSelectButton.vue",
																function() {
																				return import(
																								"../contentselect/FluroContentSelectButton.vue"
																				);
																}
												)
								]).then(function(results) {
												self.$options.components.FilterConditionGroup = results[0];
												self.$options.components.FilterConditionRow = results[1];
												self.$options.components.FluroContentSelectButton = results[2];

												self.ready = true;
								});
				},
				// beforeCreate: function() {
				//     this.$options.components.FilterConditionRow = require('./FilterConditionRow.vue').default;
				//     this.$options.components.FilterConditionGroup = require('./FilterConditionGroup.vue').default;
				// },


				created() {
								var self = this;

								// if(!self.model.values) {
								//     self.model.values = [];
								// }

								if (!self.model.guid) {
												self.model.guid = self.$fluro.utils.guid();
								}
								self.debounced = _.debounce(function() {
												// self.model = self.words;
												// console.log('FILTER ROW CHANGED', self.model)

												self.$emit("input", self.model);
								}, self.debounce);



								self.retrieveValues();
				},
				data() {
								var datePeriodOptions = [];
								var week = 1000 * 60 * 60 * 24 * 7;
								var now = new Date();

								datePeriodOptions.push({
												title: "Next 6 Weeks",
												date1: now,
												date2: new Date(new Date().setTime(new Date().getTime() + week * 6))
								});

								datePeriodOptions.push({
												title: "Next 2 Weeks",
												date1: now,
												date2: new Date(new Date().setTime(new Date().getTime() + week * 2))
								});

								datePeriodOptions.push({
												title: "Last 2 Weeks",
												date1: new Date(new Date().setTime(new Date().getTime() - week * 2)),
												date2: now
								});

								datePeriodOptions.push({
												title: "Last 6 Weeks",
												date1: new Date(new Date().setTime(new Date().getTime() - week * 4)),
												date2: now
								});

								// var parsedModel = this.value;
								var parsedModel = JSON.parse(JSON.stringify(this.value));

								// console.log('MODEL START IS', parsedModel)

								return {
												ready: false,
												sampleRefreshKey: this.$fluro.utils.guid(),
												//Date Select Stuff
												datePeriodOptions,
												// datePeriod: datePeriodOptions[1],
												debounced: null,
												debounce: 0, //500,
												possibleValues: [],
												date1: false,
												date2: false,
												loadingValues: false,
												selectedKey: parsedModel.key || "",
												model: parsedModel,
												referenceIDModel: parsedModel.value,
												realmValues: []
								};
				},
				computed: {
								modelComparator: {
												get() {
																return this.model.comparator;
												},
												set(val) {
																this.$set(this.model, "comparator", val);
												}
								},
								dateMeasures() {
												return [{
																				title: "Minutes",
																				value: "minute"
																},
																{
																				title: "Hours",
																				value: "hour"
																},
																{
																				title: "Days",
																				value: "day"
																},
																{
																				title: "Weeks",
																				value: "week"
																},
																{
																				title: "Months",
																				value: "month"
																},
																{
																				title: "Years",
																				value: "year"
																}
												];
								},
								referenceID: {
												get() {
																return this.referenceIDModel;
												},
												set(reference) {
																this.$set(
																				this.model,
																				"value",
																				this.$fluro.utils.getStringID(reference)
																);
																// this.model.value = ;
																this.referenceIDModel = reference;
												}
								},
								referenceSelectField() {
												return this.dataType == "reference" && !this.requiresManualInput;
								},
								useBasicReferenceSelect() {
												var self = this;

												if (!self.referenceSelectField) {
																return;
												}

												if (!self.selector) {
																return;
												}

												return self.selector.typeSelect || false;
								},
								keyCaption() {
												if (this.model.title) {
																return this.model.title;
												}

												if (this.selectedKey) {
																return this.selectedKey.title || this.selectedKey;
												}

												return "Select a field";
								},
								// realmValues:{
								//     get() {
								//         return this.model.values;
								//     },
								//     set(payload) {

								//         this.model.values = payload;
								//         // = _.map(payload, function(realm) {
								//         //     return {
								//         //         _id:realm._id,
								//         //         title:realm.title,
								//         //         color:realm.color,
								//         //         bgColor:realm.bgColor,
								//         //     }
								//         // });//= _.map(payload, '_id');
								//     },
								// },
								cleanedValueSelection() {


												var self = this;

												return _.map(self.possibleValues, function(option) {
																if (_.isString(option)) {
																				return {
																								text: option,
																								value: option
																				};
																}

																if (option.title) {
																				option.text = option.title = option.title;
																}

																if (option.name) {
																				option.text = option.title = option.name;
																}

																if (self.type == 'reference' && !option._id) {
																				option._id = option.value;
																}




																return option;
												});
								},
								hasSubFields() {
												return (
																this.selector &&
																this.selector.subfields &&
																this.selector.subfields.length
												);
								},
								groupedFields() {
												var self = this;
												return (
																_.chain(this.fields)
																.orderBy("title")
																// .reduce(function(set, field) {

																//     var subfieldLevels = field.title.split('>').slice(0, -1);
																//     var groupingKey = subfieldLevels.join(' > ');

																//     var existing = set[groupingKey];
																//     if(!existing) {
																//         existing = set[groupingKey] = {
																//             title:groupingKey,
																//             fields:[],
																//         };
																//     }

																//     existing.fields.push(field);
																//     return set;
																// }, {})
																// .reduce(function(set, group) {

																//     // console.log('GROUP', group)

																//     if(group.fields.length > 1) {
																//         //Add the grouping title

																//         set.push({divider:true});
																//         set.push({header:group.title, dark:true});
																//     }

																//     _.each(group.fields,function(field) {
																//         field.group = group.title;
																//         set.push(field);
																//     })

																//     return set;
																// },[])
																.value()
												);
								},
								simpleKey() {
												return String(this.model.key).split("|")[0];
								},
								simpleKeyIsRealms() {
												return _.endsWith(this.simpleKey, "realms");
								},
								// discriminator() {

								//     var discriminator = String(this.model.key).split('|')[1];

								//     console.log('DISCRIMINATOR', discriminator)
								//     return discriminator;
								// },
								weeks() {
												var array = [];
												_.times(52, function(i) {
																array.push({ title: "Week " + i, value: i });
												});

												return array;
								},
								months() {
												var currentYear = new Date().getFullYear();
												return [{
																				title: "January",
																				value: new Date(currentYear, 1, 1)
																},
																{
																				title: "February",
																				value: new Date(currentYear, 2, 1)
																},
																{
																				title: "March",
																				value: new Date(currentYear, 3, 1)
																},
																{
																				title: "April",
																				value: new Date(currentYear, 4, 1)
																},
																{
																				title: "May",
																				value: new Date(currentYear, 5, 1)
																},
																{
																				title: "June",
																				value: new Date(currentYear, 6, 1)
																},
																{
																				title: "July",
																				value: new Date(currentYear, 7, 1)
																},
																{
																				title: "August",
																				value: new Date(currentYear, 8, 1)
																},
																{
																				title: "September",
																				value: new Date(currentYear, 9, 1)
																},
																{
																				title: "October",
																				value: new Date(currentYear, 0, 1)
																},
																{
																				title: "November",
																				value: new Date(currentYear, 1, 11)
																},
																{
																				title: "December",
																				value: new Date(currentYear, 1, 12)
																}
												];
								},
								weekdays() {
												return [{
																				title: "Sunday",
																				value: 0
																},
																{
																				title: "Monday",
																				value: 1
																},
																{
																				title: "Tuesday",
																				value: 2
																},
																{
																				title: "Wednesday",
																				value: 3
																},
																{
																				title: "Thursday",
																				value: 4
																},
																{
																				title: "Friday",
																				value: 5
																},
																{
																				title: "Saturday",
																				value: 6
																}
												];
								},
								readableStartDate() {
												var self = this;
												return self.$fluro.date.formatDate(self.model.value, "D MMM YYYY");
								},
								readableEndDate() {
												var self = this;
												return self.$fluro.date.formatDate(self.model.value2, "D MMM YYYY");
								},
								startDateString: {
												get() {
																if (!this.model.value) {
																				return "";
																}
																return new Date(this.model.value).toISOString().substr(0, 10);
												},
												set(value) {
																console.log("Set the value");
																this.$set(this.model, "value", new Date(value));
												}
								},
								endDateString: {
												get() {
																if (!this.model.value2) {
																				return "";
																}
																return new Date(this.model.value2).toISOString().substr(0, 10);
												},
												set(value) {
																this.$set(this.model, "value2", new Date(value));
												}
								},
								requiresManualInput() {
												switch (this.model.comparator) {
																case "startswith":
																case "endswith":
																case "doesnotstartwith":
																case "doesnotendwith":
																case "like":
																case "contains":
																case "excludes":
																				return true;
																				break;
												}
								},
								rowChangeString() {
												var self = this;

												if (self.useSample) {
																return `${self.sampleRefreshKey}-${self.type}-${self.model.key}`;
												} else {
																var rowIDs = _.orderBy(self.$fluro.utils.arrayIDs(self.rows), function(r) {
																				return r;
																}).join(" ");

																// console.log('KEY', this.model.key)
																var string = `${this.discriminatorDefinition}-${this.discriminatorType}${this.discriminator}-${this.model.key}-${rowIDs}`;


																// console.log('CHANGE STRING', rowIDs.length, string);
																return string;
												}
								},
								selector() {
												var key = this.model.key;

												if (!this.fields) {
																return;
												}

												var match = _.find(this.fields, { key });

												// console.log('MATCHING SELECTOR', match)
												return match;
								},

								valid() {
												return FilterService.isValidFilter(this.model);
								},
								comparator() {
												var matchedComparator =
																FilterService.comparatorLookup[this.model.comparator];



												return matchedComparator; //FilterService.comparatorLookup[this.model.comparator];
								},
								inputType() {


												return this.comparator ? this.comparator.inputType : null;
								},
								dataType() {
												if (this.selector) {
																return this.selector.type || "string";
												} else if (this.model.dataType) {
																return this.model.dataType;
												} else {
																return "string";
												}
								},
								discriminatorType() {
												if (this.selector) {
																return this.selector._discriminatorType;
												} else {
																return;
												}
								},
								discriminatorDefinition() {
												if (this.selector) {
																return this.selector._discriminatorDefinition;
												} else {
																return;
												}
								},
								discriminator() {
												if (this.selector) {
																return this.selector._discriminator;
												} else {
																return;
												}
								},
								comparators() {
												var type = "string";
												if (this.selector) {
																type = this.selector.type || "string";
												}
												var comparators = FilterService.getComparatorsForType(type);

												// console.log('Updated comparators', type, comparators);
												return comparators;
								}
				},
				watch: {
								dataType(val) {
												if (val) {
																this.$set(this.model, "dataType", val);
												} else {
																this.$set(this.model, "dataType", null);
												}

												///////////////////////////////////////////

												// console.log('Clear everything because data type is', val);
												//Reset the values and the selector
												this.$set(this.model, "comparator", null);
												this.$set(this.model, "value", null);
												this.$set(this.model, "value2", null);
												this.$set(this.model, "values", []);

												///////////////////////////////////////////
								},
								selectedKey(val) {
												// console.log('Select', val)
												var self = this;

												if (val) {
																this.$set(this.model, "title", val.title);
																this.model.key = val.key;
												} else {
																this.$set(this.model, "title", null);
																this.$set(this.model, "dataType", null);
																this.model.key = null;
												}

												///////////////////////////////////////////

												//Reset the values and the selector
												this.$set(this.model, "value", null);
												this.$set(this.model, "value2", null);
												this.$set(this.model, "values", []);
								},
								selector() {
												if (this.selector) {
																this.model.key = this.selector.key;
												} else {
																this.model.key = "";
												}
								},
								model: {
												handler: function() {
																this.debounced();
												},
												deep: true
								},
								rowChangeString(d) {
												// console.log('Got the row!');
												// this.possibleValues = [];
												this.retrieveValues();
								}
				},
				methods: {
								addCriteriaRow() {
												var self = this;

												var newRow = {
																key: null,
																value: null,
																value2: null,
																values: [],
																guid: self.$fluro.utils.guid(),
												};

												if (self.model.criteria) {
																self.model.criteria.push(newRow);
												} else {
																self.$set(self.model, "criteria", [newRow]);
												}

								},
								removeCriteria(index) {
												this.model.criteria.splice(index, 1);
								},
								selectDatePeriod(option) {
												this.model.value = option.date1;
												this.model.value2 = option.date2;
								},
								retrieveValues() {
												var self = this;
												var key = self.model.key;
												// console.log('RETRIEVE VALUES', key);

												////////////////////////////////////

												if (self.useBasicReferenceSelect) {
																//Just show a normal reference selector
																self.possibleValues = [];
																self.loadingValues = false;
																console.log("Values > use basic reference select");
																// console.log('CADE > Use basic reference select')
																return;
												}

												////////////////////////////////////

												//If we have no key then there are no possible values
												if (!key || !key.length) {
																console.log("Values > No key so clear values", key, self.model);
																self.possibleValues = [];
																self.loadingValues = false;
																// console.log('CADE > No key so no values', self.model)
																return;
												}

												////////////////////////////////////

												//If we are searching in a sub field
												//eg. family._children[].age
												// if (_.includes(key, '[]')) {
												//     var splitPieces = key.split('[]');
												//     var splitKey = splitPieces.shift();
												//     var splitParameters = splitPieces.join('');
												//     key = splitParameters;
												// }

												// console.log('KEY', key, self.selector);
												////////////////////////////////////

												var selectableOptions = [];

												if (self.selector) {
																if (self.selector.allowedValues && self.selector.allowedValues.length) {
																				selectableOptions = self.selector.allowedValues;
																} else if (self.selector.options && self.selector.options.length) {
																				selectableOptions = self.selector.options;
																}

																if (selectableOptions.length) {
																				self.possibleValues = selectableOptions;
																				self.loadingValues = false;
																				// console.log('Return selectable options', selectableOptions, self.selector)
																				return;
																}
												}

												////////////////////////////////

												var dataType = self.dataType;

												////////////////////////////////

												//For certain data types we already know
												//the options available
												switch (dataType) {
																case "date":
																case "number":
																case "float":
																case "integer":
																case "decimal":
																				//console.log('Values > No values, numeric input')
																				return (self.possibleValues = []);
																				break;
																case "boolean":
																				//console.log('Values > Boolean Default')
																				return (self.possibleValues = [true, false]);
																				break;
																default:
																				switch (key) {
																								case "definition":
																												if (self.definition && self.definition.definitions) {
																																return (self.possibleValues = _.map(
																																				self.definition.definitions,
																																				function(def) {
																																								return { text: def.title, value: def.definitionName };
																																				}
																																));
																												}
																												break;
																								case "status":
																												switch (_.get(self, "definition.type.definitionName")) {
																																case "contact":
																																				return (self.possibleValues = [
																																								"active",
																																								"draft",
																																								"archived",
																																								"deceased"
																																				]);
																																				break;
																																case "purchase":
																																				return (self.possibleValues = [
																																								"active",
																																								"cancelled",
																																								"expired",
																																								"failed",
																																								"archived"
																																				]);
																																				break;
																																default:
																																				return (self.possibleValues = [
																																								"active",
																																								"draft",
																																								"archived",
																																								"template"
																																				]);
																																				break;
																												}

																												break;
																								case "gender":
																												return (self.possibleValues = ["male", "female", "unknown"]);
																												break;
																				}
																				break;
												}

												////////////////////////////////////

												if (!self.useSample) {
																//There are no rows
																if (!self.rows || !self.rows.length) {
																				//console.log('Values > No rows')
																				self.possibleValues = [];
																				self.loadingValues = false;
																				console.log("No sample and no rows");
																				return;
																}
												}

												////////////////////////////////////

												//Show feedback to the user that we are loading
												//the values for them
												self.loadingValues = true;

												////////////////////////////////////

												//Get the storage cache
												var valueStorageCache = this.$fluro.cache.get("filter-distinct-values");

												////////////////////////////////////

												//Check to see if there is already a cached set of values
												//for this query
												var valueCache = valueStorageCache[self.rowChangeString];

												////////////////////////////////////

												//If we haven't already got the values for this request
												if (!valueCache) {
																// console.log('No value cache! Load it now')
																//Check to see if the rows we know about already have the data
																//we are wanting to search on, because if so we can just use those
																//values instead of having to request from the server
																//

																var rawRowsAlreadyHaveKey = _.some(self.rows, function(row) {
																				return row.hasOwnProperty(key);
																});

																// console.log('ROWS HAVE THE KEY?', rawRowsAlreadyHaveKey);
																////////////////////////////////////

																//We need to do this so we actually load the definitions from the server not rely
																//on the content in the list
																// if(self.discriminatorDefinition || self.discriminatorType  || self.discriminator) {
																//     rawRowsAlreadyHaveKey = false;
																// }
																////////////////////////////////////
																////////////////////////////////////

																//If we already know the options then send them back and resolve
																if (rawRowsAlreadyHaveKey) {
																				//At this point we have a list of the nodes they are allowed to view
																				self.possibleValues = _.chain(self.rows)
																								.map(key)
																								.flatten()
																								.compact()
																								.uniqBy(function(val) {
																												return val.title || val.name || String(val);
																								})
																								.orderBy(function(val) {
																												return val.title || val.name || String(val);
																								})
																								.value();

																				///////////////////////////

																				//Save and cache the values
																				valueCache = valueStorageCache[
																								self.rowChangeString
																				] = Promise.resolve(self.possibleValues);

																				// console.log('We Already have the key of', key);
																} else {
																				// console.log('No rows have the key', key, self.rows);
																				//Get all the ids
																				var subSetIDs = self.$fluro.utils.arrayIDs(self.rows);

																				//We need to make an asynchronous request to the server
																				//to find out what values we can filter by
																				var options = {};

																				///////////////////////////////////////////////////////
																				//If it's a reference type, tell Fluro to populate it
																				//so we can display a human readable title for them
																				if (self.dataType == "reference") {
																								if (!options.params) {
																												options.params = {};
																								}
																								options.params.populate = true;
																				}

																				///////////////////////////////////////////////////////
																				//Check if there are any discriminators that have been specified
																				var discriminatorDefinition = self.discriminatorDefinition; //_.get(self, 'selector._discriminatorDefinition');
																				if (discriminatorDefinition && discriminatorDefinition.length) {
																								if (!options.params) {
																												options.params = {};
																								}
																								options.params.definition = discriminatorDefinition;
																				}

																				///////////////////////////////////////////////////////
																				//Check if there are any discriminators that have been specified
																				var discriminatorType = self.discriminatorType; //_.get(self, 'selector._discriminatorType');
																				if (discriminatorType && discriminatorType.length) {
																								if (!options.params) {
																												options.params = {};
																								}
																								options.params.discriminatorType = discriminatorType;
																				}

																				///////////////////////////////////////////////////////
																				//Check if there are any discriminators that have been specified
																				var discriminator = self.discriminator; //_.get(self, 'selector._discriminator');
																				if (discriminator && discriminator.length) {
																								if (!options.params) {
																												options.params = {};
																								}
																								options.params.discriminator = discriminator;
																				}

																				///////////////////////////////////////////////////////

																				if (self.definition && self.definition.type) {
																								options.type = self.definition.type.definitionName;
																				}

																				///////////////////////////////////////////////////////

																				// console.log('Go get the values')
																				//Make the request and cache it
																				valueCache = valueStorageCache[
																								self.rowChangeString
																				] = self.$fluro.content.values(subSetIDs, key, options);
																}
												} else {
																// console.log('Values Cache exists', valueCache)
												}

												// console.log('Load from server')
												/////////////////////////////////////////////////////////////////

												//When the request is complete
												valueCache.then(
																function(res) {
																				// console.log('GOT THE VALUES', res);
																				self.possibleValues =
																								res && res.length ? res : self.possibleValues || [];
																				self.loadingValues = false;
																},
																function(err) {
																				self.possibleValues = [];
																				self.loadingValues = false;

																				valueStorageCache[self.rowChangeString] = null;
																}
												);
								}
				}
				/**
				asyncComputed: {
				values: {
				default: [],
				get() {

				var self = this;
				var key = this.model.key;

				if (!key || !key.length) {
				return Promise.resolve([]);
				}

				////console.log('Lets go get options for', key);


				var dataType = self.dataType;
				switch (dataType) {
				case 'number':
				case 'float':
				case 'integer':
				case 'decimal':
				return Promise.resolve([]);
				break;
				case 'boolean':
				return Promise.resolve([true, false]);
				break;
				}



				this.loadingValues = true;
				////////////////////////////////////

				return new Promise(function(resolve, reject) {



				if (self.rows && self.rows.length) {

				//Check to see if the rows we know about already have the data
				//we are wanting to search on, because if so we can just use that
				// var rawRowsAlreadyHaveKey = _.every(self.rows, function(row) {
				//     return row.hasOwnProperty(key);
				// })

				// //If we already know the options then send them back and resolve
				// if (rawRowsAlreadyHaveKey) {
				//     var allOptions = _.chain(self.rows)
				//         .map(key)
				//         .uniq()
				//         .value();

				//     return resolve(allOptions)
				// }

				//Get all the ids
				var subSetIDs = _.map(self.rows, '_id');

				//We need to make an asynchronous request to the server
				//to find out what values we can filter by
				// ////console.log('DATA TYPE', self.dataType)
				var options = {

				}

				if (self.dataType == 'reference') {
				options.params = {
				populate: true
				};
				}

				return self.$fluro.content.values(subSetIDs, key, options).then(function(res) {
				resolve(res);
				self.loadingValues = false;
				}, function(err) {
				reject(err);
				self.loadingValues = false;
				});
				}

				// return resolve([]);


				});
				},
				}
				}

				/**/
};

</script>
<style scoped lang="scss">
.filter-condition-row {
				@media (max-width: 768px) {
								// border-bottom: 3px solid #ddd;
								// padding-bottom:5px;
								// margin-bottom:5px;
				}
}

.subfields {
				border-radius: 5px;
				background: #eee;
				padding: 5px;
}

</style>
<style lang="scss">
.filter-condition-row.mini {
				.v-input {
								font-size: 13px !important;
				}

				.v-messages {
								display: none !important;
				}

				.v-select__slot {
								overflow: hidden;
				}

				.v-select,
				.v-text-field {
								margin: 0;
								padding: 0;

								.v-label {
												font-size: 13px !important;
								}

								.v-input__slot {}

								//The slot
								.v-select__slot,
								.v-text-field__slot {
												// background: #ff0066;
												white-space: nowrap;
												font-size: 13px;
												padding: 0;
												// overflow: hidden;
								}
				}
}

</style>
