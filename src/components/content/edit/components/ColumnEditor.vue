<template>
				<div>
								<v-container style="text-align:center" v-if="loadingKeys">
												<v-progress-circular indeterminate />
								</v-container>
								<template v-else>
												<pre>{{queryID}}</pre>
												<draggable handle=".handle" v-model="model" v-bind="dragOptions">
																<v-container grid-list-md fluid pa-1 class="column-entry-row" :key="index" v-for="(column, index) in model">
																				<v-layout align-center>
																								<v-flex class="handle" shrink>
																												<v-btn class="ma-0" small icon>
																																<fluro-icon icon="arrows" />
																												</v-btn>
																								</v-flex>
																								<v-flex xs3>
																												<fluro-content-form-field :field="titleField" v-model="model[index]" />
																								</v-flex>
																								<v-flex>
																												<v-layout v-if="column.manual || !queryID" align-center>
																																<v-flex>
																																				<fluro-content-form-field :field="keyManualField" v-model="model[index]" />
																																</v-flex>
																																<v-flex shrink>
																																				<v-btn @click="setManual(index, false)" v-tippy content="Select from available fields" class="ma-0" small icon>
																																								<fluro-icon icon="bullseye-pointer" />
																																				</v-btn>
																																</v-flex>
																												</v-layout>
																												<v-layout v-else align-center>
																																<v-flex>
																																				<fluro-content-form-field :field="keyField" v-model="model[index]" />
																																</v-flex>
																																<v-flex shrink>
																																				<v-btn @click="setManual(index, true)" v-tippy content="Manually enter a key" class="ma-0" small icon>
																																								<fluro-icon icon="pencil" />
																																				</v-btn>
																																</v-flex>
																												</v-layout>
																								</v-flex>
																								<v-flex xs2>
																												<fluro-content-form-field :field="rendererField" v-model="model[index]" />
																												<!-- <fluro-content-form-field :field="rendererManualField" v-model="model[index]" /> -->
																								</v-flex>
																								<v-flex shrink>
																												<v-btn class="ma-0" @click="remove(index)" small icon>
																																<fluro-icon icon="trash-alt" />
																												</v-btn>
																								</v-flex>
																				</v-layout>
																</v-container>
												</draggable>
												<v-btn color="primary" @click="add()">
																Add Column
																<fluro-icon icon="plus" right />
												</v-btn>
								</template>
				</div>
</template>
<script>
import draggable from "vuedraggable";
import FluroContentFormField from '../../../form/FluroContentFormField.vue';

export default {
				props: {
								value: {
												type: Array,
												default () {
																return [];
												}
								},
								query: {
												type: Object,
								},
				},
				data() {
								return {
												model: this.value,
												dragOptions: null,
												manualKeyEntryEnabled: false,
												loadingKeys: false,
								}
				},
				methods: {
								add() {
												var self = this;


												var fields = [];

												var copy;





												copy = JSON.parse(JSON.stringify(self.keyField))
												copy.description = 'The field to get the data from on each row'
												copy.params = {
																autofocus: true,
												}
												fields.push(copy);


												copy = JSON.parse(JSON.stringify(self.titleField));
												copy.description = 'Type in a label for this column'

												fields.push(copy);


												copy = JSON.parse(JSON.stringify(self.rendererField))
												copy.description = 'The type of data that will be rendered in this column, this affects how the data will be displayed and sorted.'
												fields.push(copy);


												self.$fluro.prompt(fields)
																.then(function(entry) {

																				var column = entry;

																				self.model.push(column);
																})
								},
								remove(index) {
												this.model.splice(index, 1);
								},
								setManual(index, value) {
												this.$set(this.model[index], 'manual', value);
								},
								// extract(rows) {

								// 				var self = this;

								// 				return
								// 				// var item = this.flatten(input);

								// 				///////////////////////////////////////////////

								// 				// return _.chain(rows)
								// 				// 				.map(function(row) {


								// 				// 								var flattened = self.flatten(row);

								// 				// 								console.log('ROW', row, flattened)

								// 				// 								return flattened;
								// 				// 				})
								// 				// 				.reduce(function(set, value, key) {

								// 				// 								var existingEntry = set[key];




								// 				// 								//////////////////////////////////////////

								// 				// 								if (!existingEntry) {

								// 				// 												//////////////////////////////////////////

								// 				// 												var depth = key.split('.').length;
								// 				// 												var indent = '';

								// 				// 												_.times(depth - 1, function() {
								// 				// 																indent += '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0';
								// 				// 												});


								// 				// 												var matchObject = _.get(input, key);
								// 				// 												var type = (typeof matchObject);

								// 				// 												if (_.isArray(matchObject)) {
								// 				// 																type = 'array'; //'(multiple values)';
								// 				// 												}

								// 				// 												//////////////////////////////////////////

								// 				// 												if (_.isString(matchObject)) {
								// 				// 																var momentDate = self.$fluro.date.moment(matchObject, self.$fluro.date.moment.ISO_8601, true);
								// 				// 																var isValid = momentDate.isValid();
								// 				// 																if (isValid) {
								// 				// 																				matchObject = momentDate.toDate();
								// 				// 																}
								// 				// 												}

								// 				// 												//////////////////////////////////////////

								// 				// 												if (_.isDate(matchObject)) {
								// 				// 																type = 'date';
								// 				// 												}

								// 				// 												//////////////////////////////////////////

								// 				// 												existingEntry = set[key] = {
								// 				// 																key,
								// 				// 																examples: [],
								// 				// 																depth,
								// 				// 																indent,
								// 				// 																type,
								// 				// 												}
								// 				// 								}

								// 				// 								if (existingEntry.examples.length >= 3) {
								// 				// 												return set;
								// 				// 								}

								// 				// 								if (existingEntry.type != 'array') {
								// 				// 												existingEntry.examples.push(value);
								// 				// 								}


								// 				// 								///////////////////////////

								// 				// 								return set;


								// 				// 				}, {})
								// 				// 				.map(function(value, key) {

								// 				// 								return {
								// 				// 												title: `${value.indent} ${value.key} ${value.examples.slice(0,3).join(', ')}`,
								// 				// 												value: key,
								// 				// 								}
								// 				// 				})
								// 				// 				.sortBy(function(entry) {
								// 				// 								return entry.title;
								// 				// 				})
								// 				// 				.value();
								// },
								flatten(obj) {
												var flattened = {}

												var circlular = []
												var circLoc = []

												function _route(prefix, value) {
																var i, len, type, keys, circularCheck, loc

																if (value == null) {
																				if (prefix === "") {
																								return
																				}
																				flattened[prefix] = null
																				return
																}
																type = typeof value
																if (typeof value == "object") {
																				circularCheck = circlular.indexOf(value)
																				if (circularCheck >= 0) {
																								loc = circLoc[circularCheck] || "this"
																								flattened[prefix] = "[Circular (" + loc + ")]"
																								return
																				}
																				circlular.push(value)
																				circLoc.push(prefix)

																				if (Array.isArray(value)) {
																								len = value.length





																								_route(prefix);


																								//Dont loop if the array is massive
																								if (len > 10) {
																												len = 10;
																								}

																								for (i = 0; i < len; i++) {
																												_route(prefix + "[" + i + "]", value[i])
																								}

																								return
																				}

																				keys = Object.keys(value)
																				len = keys.length
																				if (prefix) prefix = prefix + "."
																				if (len == 0) _route(prefix, null)

																				for (i = 0; i < len; i++) {
																								_route(prefix + keys[i], value[keys[i]])
																				}
																				return
																}
																flattened[prefix] = value
												}

												_route("", obj)

												return flattened
								}
				},
				asyncComputed: {
								keySample: {
												default: [],
												get() {


																var self = this;
																self.loadingKeys = true;




																return new Promise(function(resolve, reject) {

																				if (!self.queryID) {
																								resolve([]);
																								self.loadingKeys = false;
																								return;
																				}


																				self.$fluro.api.get(`/content/_query/${self.queryID}`)
																								.then(function(res) {
																												resolve(res.data);
																												self.loadingKeys = false;
																								}, function(err) {
																												reject(err);
																												self.loadingKeys = false;
																								})
																				// https://api.staging.fluro.io/content/_query/59e2ab9322c83e2936a5f0d9?limit=10&sample=true
																})

																// return Promise.resolve([{
																// 	title:'Testing',
																// 	value:'something'
																// }])
												}
								},
				},
				computed: {
								queryID() {

												if (!this.query) {
																return;
												}

												if (!this.query._id) {
																return;
												}
												return this.query._id;
								},
								keyOptions() {
												var self = this;

												var rows = self.keySample;

												return _.chain(rows)
																.reduce(function(set, entry) {

																				var flattened = self.flatten(entry);

																				_.each(flattened, function(value, key) {

																								var existingEntry = set[key];

																								if (_.endsWith(key, ']')) {
																												return;
																								}

																								if (!existingEntry) {
																												var depth = key.split('.').length;
																												var indent = '';

																												_.times(depth - 1, function() {
																																indent += '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0';
																												});

																												var matchObject = _.get(entry, key);
																												var type = (typeof matchObject);

																												if (_.isArray(matchObject)) {
																																type = 'array'; //'(multiple values)';
																												}

																												if (_.isString(matchObject)) {
																																var momentDate = self.$fluro.date.moment(matchObject, self.$fluro.date.moment.ISO_8601, true);
																																var isValid = momentDate.isValid();
																																if (isValid) {
																																				matchObject = momentDate.toDate();
																																}
																												}

																												if (_.isDate(matchObject)) {
																																type = 'date';
																												}

																												existingEntry = set[key] = {
																																key,
																																examples: [],
																																exampleHash: {},
																																depth,
																																indent,
																																type,
																												}
																								}

																								///////////////////////////////////////

																								//IF it's not already in the example list
																								if (!existingEntry.exampleHash[value]) {

																												//And the example list isn't already too long
																												if (existingEntry.examples.length >= 3) {
																																return
																												}

																												existingEntry.exampleHash[value] = true;
																												//And if the existing entry is not an array
																												if (existingEntry.type != 'array') {
																																existingEntry.examples.push(value);
																												}
																								}


																				});

																				return set;

																}, {})
																.map(function(value, key) {
																				return {
																								// title: `${value.indent} ${value.key}`,
																								title: `${value.key}`,
																								value: key,
																								description: value.type == 'array' ? '(Multiple Values)' : `Values include: ${value.examples.slice(0,3).join(', ')}`
																				}
																})

																.sortBy(function(entry) {
																				return entry.title;
																})
																.value();

								},
								titleField() {
												return {
																title: 'Column Title',
																key: 'title',
																type: 'string',
																description: 'The title/label/header for this column',
																minimum: 0,
																maximum: 1,
												}
								},
								keyField() {
												return {
																title: 'Key / Data Source',
																key: 'key',
																type: 'string',
																// description: 'The field on each row that contains the data that you want to render',
																minimum: 1,
																maximum: 1,
																directive: 'select',
																options: this.keyOptions,
												}
								},
								rendererField() {
												return {
																title: 'Column Type',
																// description: 'The type of data that will be rendered for this column, this affects how the data is displayed and sorted',

																key: 'renderer',
																type: 'string',
																minimum: 0,
																maximum: 1,
																directive: 'select',
																defaultValues: [''],
																options: [{
																								name: 'Basic Text',
																								value: '',
																				},

																				{
																								name: 'Number',
																								value: 'number',
																				},

																				{
																								name: 'Date',
																								value: 'date',
																				},

																				{
																								name: 'Boolean (True/False)',
																								value: 'boolean',
																				},

																				{
																								name: 'Date and Time',
																								value: 'datetime',
																				},

																				{
																								name: 'Date (Year)',
																								value: 'year',
																				},

																				{
																								name: 'Date (Day)',
																								value: 'date_day',
																				},

																				{
																								name: 'Date (Weekday)',
																								value: 'date_weekday',
																				},

																				{
																								name: 'Date (Month Name)',
																								value: 'date_monthname',
																				},

																				{
																								name: 'Currency',
																								value: 'currency',
																				},



																				{
																								name: 'Definition Name',
																								value: 'definitionName',
																				},

																				{
																								name: 'Contact Names',
																								value: 'contacts',
																				},

																				{
																								name: 'Longform Text',
																								value: 'longtext',
																				},

																				{
																								name: 'Timeago',
																								value: 'timeago',
																				},

																				{
																								name: 'Thumbnail',
																								value: 'thumbnail',
																				},

																				{
																								name: 'Phone Number',
																								value: 'phoneNumber',
																				},

																				{
																								name: 'Email Address',
																								value: 'email',
																				},

																				{
																								name: 'Avatar (Persona)',
																								value: 'personaAvatar',
																				},


																				{
																								name: 'Avatar (Contact)',
																								value: 'contactAvatar',
																				},

																				{
																								name: 'Realm Dots',
																								value: 'realmDots',
																				},

																				{
																								name: 'Filesize',
																								value: 'filesize',
																				},

																				{
																								name: 'Image/Video Dimensions',
																								value: 'dimensions',
																				},

																				{
																								name: 'Privacy',
																								value: 'privacy',
																				},

																				{
																								name: 'Expiry / Renewal Date',
																								value: 'expiry',
																				},


																				{
																								name: 'JSON Output',
																								value: 'json',
																				},







																]
												}
								},

								keyManualField() {
												return {
																title: 'Manual Column Key',
																key: 'key',
																type: 'string',
																minimum: 1,
																maximum: 1,
												}
								},
								rendererManualField() {
												return {
																title: 'Column Type',
																key: 'renderer',
																type: 'string',
																minimum: 0,
																maximum: 1,
												}
								},
				},
				components: {
								draggable,
								FluroContentFormField,
				},
				watch: {
								model(v) {
												this.$emit('input', v);
								}
				},
}

</script>
<style scoped lang="scss">
.column-entry-row {
				background: #fff;

				&:nth-child(odd) {
								background: #fafafa;
				}

				.handle {
								opacity: 0.5;
				}

				&:hover {
								.handle {
												opacity: 1;
								}
				}

				// padding: 10px;
				border-bottom: 1px solid rgba(#000, 0.1);

				&:first-child {
								border-top: none;
				}

}

</style>
