<template>
	<flex-column>
		<template v-if="loading">
			<fluro-page-preloader contain />
		</template>
		<tabset v-else :justified="true" :vertical="true">
			<tab heading="Query Details">
				<flex-column-body style="background: #fff">
					<v-container>
						<constrain>
							<!-- <h3 margin>Query Details</h3> -->
							<!-- <pre>{{model}}</pre> -->
							<div class="grid-list-xl">
								<fluro-content-form-field
									:form-fields="formFields"
									:outline="showOutline"
									@input="update"
									:options="options"
									:field="fieldHash.title"
									v-model="model"
								></fluro-content-form-field>
								<fluro-content-form-field
									:form-fields="formFields"
									:outline="showOutline"
									@input="update"
									:options="options"
									:field="fieldHash.firstLine"
									v-model="model"
								></fluro-content-form-field>
							</div>
							<template v-if="isFilterQuery">
								<template v-if="model.disableDataTypeSelect || model._id">
									<h4>Content Type: {{ model.filterType | definitionTitle(true) }}</h4>
								</template>
								<template v-else>
									<fluro-content-form-field
										:form-fields="formFields"
										:outline="showOutline"
										@input="update"
										:options="options"
										:field="fieldHash.filterType"
										v-model="model"
									></fluro-content-form-field>
								</template>
								<v-container pa-0 grid-list-md>
									<v-layout align-center>
										<v-flex>
											<fluro-content-form-field
												:form-fields="formFields"
												:outline="showOutline"
												@input="update"
												:options="options"
												:field="fieldHash.sortKey"
												v-model="model.filterSort"
											/>
										</v-flex>
										<v-flex>
											<fluro-content-form-field
												:form-fields="formFields"
												:outline="showOutline"
												@input="update"
												:options="options"
												:field="fieldHash.sortType"
												v-model="model.filterSort"
											/>
										</v-flex>
										<v-flex>
											<fluro-content-form-field
												:form-fields="formFields"
												:outline="showOutline"
												@input="update"
												:options="options"
												:field="fieldHash.sortDirection"
												v-model="model.filterSort"
											/>
										</v-flex>
									</v-layout>
								</v-container>
							</template>
							<template v-else>
								<v-layout align-center>
									<v-flex>
										<fluro-content-form-field
											:form-fields="formFields"
											:outline="showOutline"
											@input="update"
											:options="options"
											:field="fieldHash.sort"
											v-model="model"
										/>
									</v-flex>
									<v-flex shrink>
										<v-btn
											icon
											class="ma-0"
											v-tippy
											content="Advanced"
											@click="manualSort = !manualSort"
										>
											<fluro-icon :library="manualSort ? 'fas' : 'far'" icon="cogs" />
										</v-btn>
									</v-flex>
								</v-layout>
							</template>
							<fluro-panel>
								<tabset>
									<tab
										heading="Filter Criteria"
										index="criteria"
										v-if="isFilterQuery && model.filterType"
									>
										<fluro-panel-body style="background: #eee">
											<fluro-content-form-field
												:form-fields="formFields"
												:outline="showOutline"
												@input="update"
												:options="options"
												:field="fieldHash.filterSearch"
												v-model="model"
											/>
											<!-- <fluro-panel-title>

                                            </fluro-panel-title> -->
											<!-- :useSample="true"  -->
											<!-- :useSample="model.query && model.query.length" -->
											<filter-condition-group
												:rows="rows"
												:mini="true"
												v-model="model.filterConfiguration"
												:type="model.filterType"
												:debounce="filterDebounce"
											/>
										</fluro-panel-body>
									</tab>
									<tab heading="Query" index="query" v-else>
										<flex-column style="min-height: 600px">
											<fluro-code-editor
												style="flex: 1 1 100%"
												v-model="model.query"
												lang="json"
											/>
										</flex-column>
									</tab>
									<tab
										:heading="`${definition.title} Info`"
										v-if="definition && definition.fields && definition.fields.length"
									>
										<fluro-panel-body>
											<fluro-content-form
												:options="options"
												v-model="model.data"
												:fields="definition.fields"
											/>
										</fluro-panel-body>
									</tab>
									<tab :heading="`${(model.columns || []).length} Columns`">
										<!-- <fluro-panel-body> -->
										<!-- <h3 margin>Columns</h3> -->
										<column-editor :query="model" v-model="model.columns" />
										<!-- ColumnEditor -->
										<!-- <column-customiser v-model="model.columns" :sampleData="sample" :config="config" :loadingSample="loadingSample" /> -->
										<!-- </fluro-panel-body> -->
									</tab>
								</tabset>
							</fluro-panel>
							<fluro-privacy-select v-model="model.privacy" />
						</constrain>
					</v-container>
					<!-- <v-container class="border-top"> -->
					<!-- <constrain> -->
					<!-- <h3 margin>Columns</h3> -->
					<!-- <column-customiser v-model="model.columns" :sampleData="sample" :config="config" :loadingSample="loadingSample" /> -->
					<!--<template v-if="!sample.length">

                                </template>
                                <template v-else>
                                    <h4 margin>Sample Output</h4>
                                    <fluro-panel>
                                        <tabset>
                                            <tab heading="Explorer">
                                                <fluro-panel-body>

                                                    <json-view :highlightMouseoverNode="true" :deep="3" :data="sample" />
                                                </fluro-panel-body>
                                            </tab>
                                            <tab heading="Raw JSON">
                                                <pre>{{sample}}</pre>
                                            </tab>
                                        </tabset>
                                    </fluro-panel>
                </template>-->
					<!-- </constrain> -->
					<!-- </v-container> -->
				</flex-column-body>
			</tab>
			<tab heading="Automation" v-if="resultSets.length">
				<!-- <result-set-edit v-model="resultSets" /> -->
				<flex-column-body style="background: #fff">
					<v-container>
						<constrain sm>
							<fluro-panel v-for="resultset in resultSets" :key="resultset._id">
								<fluro-panel-title>
									<v-layout align-center>
										<v-flex>
											<strong>{{ resultset.title }}</strong>
											<div>
												{{ resultset.firstLine }}
											</div>
										</v-flex>
										<v-flex shrink>
											<v-btn @click="editResultSet(resultset)">
												Edit
												<fluro-icon icon="pencil" right />
											</v-btn>
										</v-flex>
									</v-layout>
								</fluro-panel-title>
							</fluro-panel>
						</constrain>
					</v-container>
				</flex-column-body>
			</tab>
			<!-- <tab heading="Columns and Rendering">
                <slot>
                    <flex-column-body style="background: #fff;">
                        <v-container>
                            <constrain sm>
                                <h3 margin>Columns and Rendering</h3>
                            </constrain>
                        </v-container>
                    </flex-column-body>
                </slot>
            </tab>
      -->
			<!-- <tab :heading="`Access Passes`">
                <slot>
                    <flex-column-body style="background: #fff;">
                        <v-container grid-list-xl>
                            <constrain sm>
                                <h3 margin>{{contextName}} Access Passes</h3>
                                <fluro-access-pass-select @input="modelUpdated" :host="model" v-model="model.policies" />
                            </constrain>
                        </v-container>
                    </flex-column-body>
                </slot>
            </tab>
            <tab :heading="`Individual Permissions`">
                <slot>
                    <flex-column-body style="background: #fff;">
                        <v-container grid-list-xl>
                            <constrain sm>
                                <h3 margin>{{contextName}} Individual Permissions</h3>
                                <fluro-permission-select @input="modelUpdated" v-model="model.permissionSets" />
                            </constrain>
                        </v-container>
                    </flex-column-body>
                </slot>
      </tab>-->
		</tabset>
		<!-- <flex-column-body style="height:500px;"> -->
		<!-- <pre>{{model}}</pre> -->
		<!-- </flex-column-body> -->
	</flex-column>
</template>
<script>
/////////////////////////////////

import FluroCodeEditor from '../../../form/FluroCodeEditor.vue';
import FluroContentEditMixin from '../FluroContentEditMixin.js';
import FilterConditionGroup from '../../../form/filters/FilterConditionGroup.vue';
import ColumnCustomiser from '../components/ColumnCustomiser.vue';
import ColumnEditor from '../components/ColumnEditor.vue';
// import ResultSetEdit from './resultset.vue'
/////////////////////////////////

import Vue from 'vue';
import _ from 'lodash';

import { FilterService } from 'fluro';

/////////////////////////////////

export default {
	mixins: [FluroContentEditMixin],
	components: {
		FilterConditionGroup,
		ColumnCustomiser,
		FluroCodeEditor,
		ColumnEditor,
		// ResultSetEdit
	},
	methods: {
		modelUpdated() {
			this.update(this.model);
		},
		editResultSet(item) {
			// console.log('EDIT RESULT SET', item);
			item._type = 'resultset';
			this.$fluro.global
				.edit(item, true)
				.then(function (res) {
					_.assign(item, res);
				})
				.catch(function () {
					//Nothing happened
				});
		},
		reloadSample() {
			var self = this;

			//return;

			//////////////////////////////////////////////////////////////////////////////
			//////////////////////////////////////////////////////////////////////////////
			//////////////////////////////////////////////////////////////////////////////

			if (!self.model.filterType) {
				console.log('NO FILTER TYPE');
				return;
			}

			//////////////////////////////////////////////////////////////////////////////
			//////////////////////////////////////////////////////////////////////////////
			//////////////////////////////////////////////////////////////////////////////

			self.loadingSample = true;

			// return new Promise(function(resolve, reject) {

			// if (self.model._id) {

			//     return self.$fluro.api.get(`/content/_query/${self.model._id}`)
			//         .then(sampleLoaded)
			//         .catch(sampleFailed);

			// } else {

			//Run a dynamic query and get the sample data
			return self.$fluro.api
				.post(`/content/${self.model.filterType}/filter`, {
					// sort: self.sort,
					filter: self.model.filterConfiguration,
					startDate: self.model.filterStartDate,
					endDate: self.model.filterEndDate,
					search: self.model.filterSearch,
					// includeArchived: self.includeArchivedByDefault,
					allDefinitions: true, //self.allDefinitions,
					// includeUnmatched: true,
					sample: true,
					limit: 5,
				})
				.then(sampleLoaded)
				.catch(sampleFailed);
			// }

			//////////////////////////////////////////////////////////////////////////////

			function sampleLoaded(res) {
				self.sample = res.data;
				self.loadingSample = false;
			}

			//////////////////////////////////////////////////////////////////////////////

			function sampleFailed(res) {
				// console.log('SAMPLE FAILED', res)
				self.sample = [];
				self.loadingSample = false;
			}
			// })
		},
	},
	created() {
		var self = this;

		if (!self.model.filterConfiguration) {
			self.model.filterConfiguration = {};
		}

		if (!self.model.filterSort) {
			self.model.filterSort = {};
		}

		self.reloadSample();
	},
	watch: {
		changeString() {
			var self = this;
			self.reloadSample();
		},
	},
	asyncComputed: {
		rows: {
			default: null,
			get() {
				var self = this;

				var filterType = self.model.filterType;
				if (!filterType || !filterType.length) {
					return Promise.resolve(null);
				}

				return new Promise(function (resolve, reject) {
					self.$fluro.api
						.post(`/content/${filterType}/filter`)
						.then(function (res) {
							// console.log('ROWS', res.data);
							resolve(res.data);
						})
						.catch(function (err) {
							// console.log('Error', err);
							reject(err);
						});
				});

				// if(!self.options.site) {
				//  return Promise.resolve([])
				// }

				// var site = self.options.site;

				// // //Get all blocks
				// var mapped = [];
				// //blocks = [];

				// // var mapped = _.map(site.menus, function(menu) {
				// //   return {
				// //       text:menu.title,
				// //       value:menu.key,
				// //   }
				// // })

				// return Promise.resolve(mapped);

				// // return new Promise(function(resolve, reject) {

				// //   var
				// // });
			},
		},

		resultSets: {
			default: [],
			get() {
				var self = this;

				if (!self.model._id) {
					self.loadingResultSets = false;
					return Promise.resolve([]);
				}

				/////////////////////////////////

				self.loadingResultSets = true;

				/////////////////////////////////

				return new Promise(function (resolve, reject) {
					self.$fluro.api
						.get(`/query/${self.model._id}/resultsets`)
						.then(function (res) {
							resolve(res.data);
							// console.log("Found Data", res.data);
							self.loadingResultSets = false;
						})
						.catch(function (err) {
							reject(err);
							self.loadingResultSets = false;
						});
				});
			},
		},

		typeOptions: {
			default: [],
			get() {
				var self = this;
				if (self.model.query) {
					return new Promise(function (resolve, reject) {
						return reject();
					});
				}
				return new Promise(function (resolve, reject) {
					self.$fluro.types
						.terms()
						.then(function (res) {
							//Map the types
							var mappedTypeOptions = _.chain(res)
								.map(function (entry, key) {
									var label = entry.parentType
										? `${self.$fluro.types.readable(
												entry.parentType
										  )} - ${self.$fluro.types.readable(key)}`
										: `${self.$fluro.types.readable(key)}`;

									return {
										name: label,
										value: key,
										parentType: entry.parentType,
									};
								})
								.orderBy('name')
								.values()
								.value();

							mappedTypeOptions.unshift({
								name: 'Anything',
								key: 'node',
								value: 'node',
							});

							// console.log('MAPPED TYPES', mappedTypeOptions)
							//Resolve the array
							resolve(mappedTypeOptions);
						})
						.catch(function (err) {
							reject(err);
						});
				});
			},
		},
	},
	computed: {
		isFilterQuery() {
			return !this.model.query || !this.model.query.length;
		},
		showOutline() {
			return false; //true; //false;//true;//false;//true;
		},

		fieldsOutput() {
			var self = this;
			var array = [];

			///////////////////////////////////

			addField('title', {
				title: 'Title',
				minimum: 1,
				maximum: 1,
				type: 'string',
				placeholder: 'Eg. My Awesome List',
				params: {
					autofocus: !self.model._id,
				},
			});

			addField('firstLine', {
				title: 'Description',
				minimum: 0,
				maximum: 1,
				type: 'string',
				placeholder: 'Eg. A list of my favorite people',
			});

			// console.log('TYPE OPTIONS', self.typeOptions);

			addField('filterSearch', {
				title: 'Matches Keywords',
				minimum: 0,
				maximum: 1,
				type: 'string',
				description: 'Search keywords that items must match to be included in results',
			});

			addField('filterType', {
				title: 'Content type to retrieve',
				minimum: 0,
				maximum: 1,
				type: 'string',
				directive: 'select',
				description: 'The type of item you want to return from this query',
				options: self.typeOptions,
			});

			////////////////////////////////////////////////////

			addField('sortType', {
				key: 'type',
				title: 'Sort Type',
				minimum: 0,
				maximum: 1,
				type: 'string',
				directive: 'select',
				description: 'The type of item you want to return from this query',
				options: [
					{
						name: 'String / Text',
						value: 'string',
					},
					{
						name: 'Number',
						value: 'number',
					},
					{
						name: 'Integer (Whole Number)',
						value: 'integer',
					},
					{
						name: 'Decimal / Float',
						value: 'float',
					},
					{
						name: 'Date',
						value: 'date',
					},
					{
						name: 'Boolean (True/False)',
						value: 'boolean',
					},
				],
			});

			addField('sortKey', {
				key: 'key',
				title: 'Sorting Field Key',
				minimum: 0,
				maximum: 1,
				type: 'string',
				// directive: "select",
				description: 'The field to sort on',
				// options: [{
				//         name: 'String / Text',
				//         value: 'string',
				//     },
				//     {
				//         name: 'Number',
				//         value: 'number',
				//     },
				//     {
				//         name: 'Integer (Whole Number)',
				//         value: 'integer',
				//     },
				//     {
				//         name: 'Decimal / Float',
				//         value: 'float',
				//     },
				//     {
				//         name: 'Date',
				//         value: 'date',
				//     },
				//     {
				//         name: 'Boolean (True/False)',
				//         value: 'boolean',
				//     },
				// ],
			});

			addField('sortDirection', {
				key: 'direction',
				title: 'Sorting Order',
				minimum: 0,
				maximum: 1,
				type: 'string',
				directive: 'select',
				description: 'Select which order to sort by',
				options: [
					{
						name: 'Ascending',
						value: 'asc',
					},
					{
						name: 'Descending',
						value: 'dsc',
					},
				],
			});

			////////////////////////////////////////////////////

			var sortField;

			if (!self.manualSort) {
				sortField = {
					title: 'Sort by field',
					minimum: 0,
					maximum: 1,
					type: 'string',
					defaultValues: ['-created'],
					directive: 'select',
					description: "What key should results be sorted by. (prefix with '-' to reverse order)",
					options: [
						{
							name: 'Most recently created',
							value: '-created',
						},
						{
							name: 'Most recently updated',
							value: '-updated',
						},
						{
							name: 'Alphabetically by title',
							value: 'title',
						},
					],
				};
			} else {
				sortField = {
					title: 'Sort by field',
					minimum: 0,
					maximum: 1,
					type: 'string',
					defaultValues: ['-created'],
					// directive: "select",
					description: "What key should results be sorted by. (prefix with '-' to reverse order)",
					// options: self.typeOptions
				};
			}
			addField('sort', sortField);

			///////////////////////////////////

			function addField(key, details) {
				details.key = key;
				array.push(details);
			}

			return array;
		},
		changeString() {
			var self = this;
			if (self.model.query) {
				return;
			}
			var filterString = FilterService.getFilterChangeString(self.model.filterConfiguration);

			// console.log('Filter configuration changed', filterString)
			return filterString;
		},
	},
	data() {
		return {
			manualSort: false,
			loadingResultSets: true,
			sample: [],
			loadingSample: false,
			filterDebounce: 500,
		};
	},
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
