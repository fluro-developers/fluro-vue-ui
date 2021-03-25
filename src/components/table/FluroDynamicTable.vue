<template>
				<div class="fluro-table-wrapper">
								<!-- <pre>{{selectionController.selectionMaximum}}</pre> -->
								<!-- <pre>{{fluro}}</pre> -->
								<!-- <pre>Unwind {{unwindColumn}}</pre> -->
								<!--         <pre>{{structureColumns}}</pre>
 -->
								<!-- <pre>{{actionsEnabled}}</pre> -->
								<!-- <pre>{{sort}}</pre> -->
								<!-- <pre>{{filterCheckString}}</pre> -->
								<!-- {{startDate}} -->
								<fluro-page-preloader v-if="showLoading" contain />
								<v-container class="flex-center" v-if="!showLoading && !page.length">
												<slot name="emptytext">
																No {{dataType | definitionTitle(true)}} were found matching your criteria
												</slot>
								</v-container>
								<template v-else>
												<div ref="scrollableArea" class="fluro-table-scroll" :class="{clickable:clickable, loading:showLoading}">
																<span ref="top"></span>
																<table class="fluro-table-main no-select">
																				<thead>
																								<tr>
																												<th class="first shrink checkbox-cell" v-if="selectionEnabled">
																																<fluro-help title="Select all" body="This checkbox allows you to select all items in this table" />
																																<v-menu attach @click.native.stop offset-y>
																																				<template v-slot:activator="{ on }">
																																								<div v-on="on">
																																												<div is="table-header-checkbox" :all="allSelected" :some="someSelected" />
																																								</div>
																																				</template>
																																				<v-card class="select-options" tile>
																																								<v-list dense>
																																												<v-list-tile v-if="!allSelected" @click="selectPage()">
																																																<v-list-tile-content>
																																																				<v-list-tile-title>
																																																								Select this page
																																																				</v-list-tile-title>
																																																</v-list-tile-content>
																																												</v-list-tile>
																																												<v-list-tile v-if="someSelected" @click="deselectPage()">
																																																<v-list-tile-content>
																																																				<v-list-tile-title>
																																																								Deselect this page
																																																				</v-list-tile-title>
																																																</v-list-tile-content>
																																												</v-list-tile>
																																												<v-list-tile v-if="filteredTotal" @click="selectAll()">
																																																<v-list-tile-content>
																																																				<v-list-tile-title>
																																																								Select all {{filteredTotal}} items
																																																				</v-list-tile-title>
																																																</v-list-tile-content>
																																												</v-list-tile>
																																												<v-list-tile @click="deselectAll()" v-if="selectionController.selection.length">
																																																<v-list-tile-content>
																																																				<v-list-tile-title>
																																																								Deselect all {{filteredTotal}} items
																																																				</v-list-tile-title>
																																																</v-list-tile-content>
																																												</v-list-tile>
																																								</v-list>
																																				</v-card>
																																</v-menu>
																												</th>
																												<th @contextmenu.prevent="showOptionsForColumn(column)" @click="toggleSort(column)" :class="{'shrink':column.shrink, sortable:isSortable(column), 'sorting':sort.sortKey == column.key, 'tiny':column.tiny, 'text-xs-center':column.align == 'center', 'text-xs-right':column.align =='right'}" v-for="column in renderColumns">
																																<template v-if="column.icon">
																																				<fluro-icon v-tippy :content="column.title" library="fas" :icon="column.icon" />
																																</template>
																																<template v-else>
																																				<div class="sort-icon" v-if="isActiveSort(column.key)">
																																								<fluro-icon library="fas" icon="caret-down" v-if="sort.sortDirection == 'desc'" />
																																								<fluro-icon library="fas" icon="caret-up" v-if="sort.sortDirection == 'asc'" />
																																				</div>
																																				{{column.title}}
																																</template>
																																<!-- <div class="options-icon" @click.stop.prevent> -->
																																<!-- <fluro-icon library="far" icon="ellipsis-v" /> -->
																																<!-- </div> -->
																												</th>
																												<th class="last shrink" v-if="enableActions">
																																<v-menu :close-on-content-click="false" @click.native.stop offset-y>
																																				<template v-slot:activator="{ on }">
																																								<div v-on="on">
																																												<fluro-help title="Table Settings" body="You can export, print and customise the rendered columns from here" />
																																												<v-btn v-tippy content="Table Settings" class="ma-0" small icon>
																																																<fluro-icon icon="cog" />
																																												</v-btn>
																																								</div>
																																				</template>
																																				<v-card tile>
																																								<slot name="optionsabove"></slot>
																																								<!-- <div v-for="(column, i) in columns"> -->
																																								<!-- <v-checkbox v-model="columnState[column.key]" :label="column.title"></v-checkbox> -->
																																								<!-- </div> -->
																																								<!-- <div v-for="(column, i) in availableKeys"> -->
																																								<!-- <v-checkbox v-model="customColumns[column.key]" :label="column.title"></v-checkbox> -->
																																								<!-- </div> -->
																																								<!-- <pre>{{availableKeys}}</pre> -->
																																								<div v-if="$pro && $pro.enabled">
																																												<v-container v-if="availableKeys.length">
																																																<v-autocomplete label="Group rows by" :items="availableGroupingKeys" @change="toggleColumnGrouping" :return-object="true" item-text="title"></v-autocomplete>
																																												</v-container>
																																												<v-container v-if="unwindableColumns.length">
																																																<v-autocomplete label="Unwind rows by" :items="unwindableColumns" multiple @change="toggleUnwindColumns" :return-object="true" item-text="title"></v-autocomplete>
																																												</v-container>
																																								</div>
																																								<!-- <v-list style="max-height: 50vh;" class="scroll-y" dense>
                                            <v-list-tile :class="{columnselected:columnIsGrouping(field)}" @click="toggleColumnGrouping(field)" v-for="field in availableKeys">
                                                <v-list-tile-action>
                                                    <fluro-icon icon="check" v-if="columnIsGrouping(field)" />
                                                </v-list-tile-action>
                                                <v-list-tile-content>
                                                    <v-list-tile-title>
                                                        {{field.title}}
                                                    </v-list-tile-title>
                                                </v-list-tile-content>
                                            </v-list-tile>
                                        </v-list> -->
																																								<v-container class="border-top border-bottom">
																																												<strong>Select Columns</strong>
																																								</v-container>
																																								<v-list style="max-height: 50vh;" class="scroll-y" dense>
																																												<v-list-tile :class="{columnselected:columnIsSelected(field)}" @click="toggleColumn(field)" v-for="field in availableKeys">
																																																<v-list-tile-action>
																																																				<fluro-icon icon="check" v-if="columnIsSelected(field)" />
																																																</v-list-tile-action>
																																																<v-list-tile-content>
																																																				<v-list-tile-title>
																																																								{{field.title}}
																																																				</v-list-tile-title>
																																																</v-list-tile-content>
																																												</v-list-tile>
																																								</v-list>
																																								<slot name="optionsbelow"></slot>
																																								<!-- <div v-for="field in availableKeys">{{field.title}}</div> -->
																																								<!-- <pre>{{availableKeys}}</pre> -->
																																								<!-- <v-list dense>
                                            <v-list-tile v-if="!allSelected" @click="selectPage()">
                                                <v-list-tile-content>
                                                    <v-list-tile-title>
                                                        Select this page
                                                    </v-list-tile-title>
                                                </v-list-tile-content>
                                            </v-list-tile>
                                            <v-list-tile v-if="someSelected" @click="deselectPage()">
                                                <v-list-tile-content>
                                                    <v-list-tile-title>
                                                        Deselect this page
                                                    </v-list-tile-title>
                                                </v-list-tile-content>
                                            </v-list-tile>
                                            <v-list-tile v-if="filteredTotal" @click="selectAll()">
                                                <v-list-tile-content>
                                                    <v-list-tile-title>
                                                        Select all {{filteredTotal}} items
                                                    </v-list-tile-title>
                                                </v-list-tile-content>
                                            </v-list-tile>
                                            <v-list-tile @click="deselectAll()" v-if="selectionController.selection.length">
                                                <v-list-tile-content>
                                                    <v-list-tile-title>
                                                        Deselect all {{filteredTotal}} items
                                                    </v-list-tile-title>
                                                </v-list-tile-content>
                                            </v-list-tile>
                                        </v-list> -->
																																				</v-card>
																																</v-menu>
																												</th>
																								</tr>
																				</thead>
																				<tbody>
																								<template v-if="grouped">
																												<template v-for="group in grouped">
																																<tr class="breaker">
																																				<th v-if="!selectionEnabled"></th>
																																				<template v-else>
																																								<th v-if="group.items.length != 1" class="first" is="table-row-checkbox" @click.native="toggleSet(group.items)" :checked="allInGroupSelected(group.items)" />
																																								<th />
																																				</template>
																																				<!-- <td></td> -->
																																				<!-- <th is="table-row-checkbox" :checked="selectionController.allSelected(group)"/> -->
																																				<td :colspan="1 + renderColumns.length">{{group.title || 'No value'}} <span class="sm muted">({{group.items.length}})</span></td>
																																</tr>
																																<tr :class="classes(item)" :key="item.guid" v-for="(item, key) in group.items">
																																				<template v-if="item._populating">
																																								<!-- <th>TEST {{selection.isSelected(item)}}</th> -->
																																								<th class="first" is="table-row-checkbox" v-if="selectionEnabled" />
																																								<td @click.native="clicked(item, column, key)" :colspan="renderColumns.length">-</td>
																																								<th class="last shrink" v-if="actionsEnabled">
																																								</th>
																																				</template>
																																				<template v-else>
																																								<th class="first" is="table-row-checkbox" v-if="selectionEnabled" :checked="selectionController.isSelected(item)" @click.native.stop.prevent="checkboxClick(item, $event, key)" :value="item" />
																																								<!-- <td  v-for="column in renderColumns"> -->
																																								<!-- <pre>{{column.key}} {{item.emails}}</pre> -->
																																								<!-- </td> -->
																																								<table-cell @click.native="clicked(item, column, key)" :row="item" v-for="column in renderColumns" :class="{'sorting':sort.sortKey == column.key}" :column="column"></table-cell>
																																								<th class="last shrink" v-if="actionsEnabled">
																																												<div class="action-buttons">
																																																<!-- <pre>{{item._relevance}}</pre> -->
																																																<!-- <v-btn class="ma-0" v-if="$vuetify.breakpoint.mdAndUp" small icon>
                                            <fluro-icon icon="pencil" />
                                        </v-btn> -->
																																																<v-btn class="ma-0" small icon @click.stop.prevent="$actions.open([item])">
																																																				<fluro-icon icon="ellipsis-h" />
																																																</v-btn>
																																																<!--  <v-btn class="ma-0" v-if="$vuetify.breakpoint.mdAndUp" small icon>
                                            <fluro-icon icon="trash-alt" />
                                        </v-btn> -->
																																												</div>
																																												<fluro-help uid="tablerow" title="More Actions" body="View more actions related to this item" />
																																								</th>
																																				</template>
																																</tr>
																												</template>
																								</template>
																								<template v-else>
																												<tr :class="classes(item)" :key="item.guid" v-for="(item, key) in page">
																																<template v-if="item._populating">
																																				<!-- <th>TEST {{selection.isSelected(item)}}</th> -->
																																				<th class="first" is="table-row-checkbox" v-if="selectionEnabled" />
																																				<td @click.native="clicked(item, column, key)" :colspan="renderColumns.length">-</td>
																																				<th class="last shrink" v-if="actionsEnabled">
																																				</th>
																																</template>
																																<template v-else>
																																				<th class="first" is="table-row-checkbox" v-if="selectionEnabled" :checked="selectionController.isSelected(item)" @click.native.stop.prevent="checkboxClick(item, $event, key)" :value="item" />
																																				<!-- <td><pre>{{item}}</pre></td> -->
																																				<table-cell @click.native="clicked(item, column, key)" :row="item" v-for="column in renderColumns" :class="{'sorting':sort.sortKey == column.key}" :column="column"></table-cell>
																																				<th class="last shrink" v-if="actionsEnabled">
																																								<div class="action-buttons">
																																												<!-- <pre>{{item._relevance}}</pre> -->
																																												<!-- <v-btn class="ma-0" v-if="$vuetify.breakpoint.mdAndUp" small icon>
                                            <fluro-icon icon="pencil" />
                                        </v-btn> -->
																																												<v-btn class="ma-0" small icon @click.stop.prevent="$actions.open([item])">
																																																<fluro-help uid="tablerow" title="More Actions" body="View more actions related to this item" />
																																																<fluro-icon icon="ellipsis-h" />
																																												</v-btn>
																																												<!--  <v-btn class="ma-0" v-if="$vuetify.breakpoint.mdAndUp" small icon>
                                            <fluro-icon icon="trash-alt" />
                                        </v-btn> -->
																																								</div>
																																				</th>
																																</template>
																												</tr>
																								</template>
																				</tbody>
																</table>
												</div>
												<div class="footer-stats">
																<v-layout row wrap>
																				<template v-if="!totalPages">
																								<v-flex class="text-muted">
																												No {{plural}}
																								</v-flex>
																				</template>
																				<template v-else>
																								<v-flex xs6 align-center d-flex>
																												<fluro-help title="Item count" body="Shows how many items are displayed in the table, clicking here will allow you to change the amount of rows displayed per page" />
																												<div class="text-muted">
																																<v-menu @click.native.stop offset-y>
																																				<template v-slot:activator="{ on }">
																																								<div v-on="on">
																																												<div v-if="groupingColumn">
																																																{{totalGroups}} groups - Showing {{startOffset + 1 | numberWithCommas}} to {{endOffset | numberWithCommas}} of {{filteredTotal | numberWithCommas}} rows
																																												</div>
																																												<div v-else>
																																																{{startOffset + 1 | numberWithCommas}} to {{endOffset | numberWithCommas}} of {{filteredTotal | numberWithCommas}} {{plural}}
																																												</div>
																																								</div>
																																				</template>
																																				<v-card tile>
																																								<v-list dense>
																																												<v-list-tile @click="perPage = 25">
																																																<v-list-tile-content>
																																																				<v-list-tile-title>
																																																								Show 25 per page
																																																				</v-list-tile-title>
																																																</v-list-tile-content>
																																												</v-list-tile>
																																												<v-list-tile @click="perPage = 50">
																																																<v-list-tile-content>
																																																				<v-list-tile-title>
																																																								Show 50 per page
																																																				</v-list-tile-title>
																																																</v-list-tile-content>
																																												</v-list-tile>
																																												<v-list-tile @click="perPage = 100">
																																																<v-list-tile-content>
																																																				<v-list-tile-title>
																																																								Show 100 per page
																																																				</v-list-tile-title>
																																																</v-list-tile-content>
																																												</v-list-tile>
																																												<v-list-tile @click="perPage = 200">
																																																<v-list-tile-content>
																																																				<v-list-tile-title>
																																																								Show 250 per page
																																																				</v-list-tile-title>
																																																</v-list-tile-content>
																																												</v-list-tile>
																																												<v-list-tile @click="perPage = 500">
																																																<v-list-tile-content>
																																																				<v-list-tile-title>
																																																								Show 500 per page
																																																				</v-list-tile-title>
																																																</v-list-tile-content>
																																												</v-list-tile>
																																								</v-list>
																																				</v-card>
																																</v-menu>
																												</div>
																								</v-flex>
																								<v-flex xs6 align-center d-flex class="text-xs-right" style="white-space: nowrap">
																												<div>
																																<div class="pagenumber-select">
																																				<fluro-help title="Current Page Selector" body="Displays the current page you are on, click here to quickly jump to a specific page" />
																																				<span v-if="$vuetify.breakpoint.smAndUp" class="text-muted">Page {{currentPage}} of {{totalPages}}</span>
																																				<select v-model="currentPage">
																																								<option :value="index+1" v-for="(page, index) in availablePages">{{index+1}}</option>
																																				</select>
																																</div>
																																<span class="ml-3">
																																				<template>
																																								<v-btn class="ma-0" :disabled="previousPageDisabled" icon @click="firstPage()">
																																												<fluro-icon icon="arrow-to-left" />
																																								</v-btn>
																																								<v-btn class="ma-0" :disabled="previousPageDisabled" icon @click="previousPage()">
																																												<fluro-icon icon="arrow-left" />
																																								</v-btn>
																																				</template>
																																				<template>
																																								<v-btn class="ma-0" :disabled="nextPageDisabled" icon @click="nextPage()">
																																												<fluro-icon icon="arrow-right" />
																																								</v-btn>
																																								<v-btn class="ma-0" :disabled="nextPageDisabled" icon @click="lastPage()">
																																												<fluro-icon icon="arrow-to-right" />
																																								</v-btn>
																																				</template>
																																</span>
																												</div>
																								</v-flex>
																				</template>
																</v-layout>
												</div>
								</template>
								<!-- <template v-else>
            <v-container class="flex-center" v-if="!showLoading">
                No results found matching your criteria
            </v-container>
        </template> -->
				</div>
</template>
<script>
import _ from 'lodash';


import TableHeaderCheckbox from './TableHeaderCheckbox.vue';
import TableRowCheckbox from './TableRowCheckbox.vue';
import TableCell from './TableCell.vue';
import DynamicListMixin from '../../mixins/DynamicListMixin.js'
import FluroHelp from '../FluroHelp.vue';

/////////////////////////////////



import { FilterService } from 'fluro';

/////////////////////////////////

export default {
				props: {
								// queryString:{
								//     type:Boolean,
								//     default:true,
								// },
								// changeKey: {
								//     type: [String, Number],
								// },
								fixedColumns: {
												type: Boolean,
												default: false,
								},
								// allDefinitions: {
								//     type: Boolean,
								//     default: false,
								// },
								// searchInheritable: {
								//     type: Boolean,
								//     default: false,
								// },
								grouping: {
												type: Function,
								},

								// includeArchivedByDefault: {
								//     type: Boolean,
								// },
								enableSelection: {
												type: Boolean,
												default: true,
								},
								enableActions: {
												type: Boolean,
												default: true,
								},
								defaultSort: {
												type: String,
												default () {
																return 'updated';
												},
								},
								defaultSortType: {
												type: String,
												default () {
																return 'date'
												},
								},
								defaultSortDirection: {
												type: String,
												default () {
																return 'desc';
												},
								},
								selectionController: {
												type: Object,
												default () {
																return this.$selection;
												}
								},
								clickable: {
												type: Boolean,
												default () {
																return true;
												}
								},
								clicked: {
												type: Function,
												default () {
																// //console.log('default')
																return function(item, column) {
																				// //console.log('clicked', item, column);
																}
												}
								},
								columns: {
												type: Array,
												default () {
																return [];
												}
								},
								availableKeys: {
												type: Array,
												default () {
																return [];
												}
								},
								additionalColumns: {
												type: Array,
												default () {
																return [];
												}
								},
								additionalKeys: {
												type: Array,
												default () {
																return [];
												}
								},
								// filterConfig: {
								//     type: Object,
								//     default () {
								//         return {
								//             operator: 'and',
								//             filters: [],
								//         }
								//     }
								// },
								initPage: {
												type: [Number, String],
												default: 1,
								},
								// initSort: {
								//     type: Object,
								//     default () {
								//         var defaultSort = {
								//             key: this.defaultSort,
								//             direction: this.defaultSortDirection,
								//             type: this.defaultSortType,
								//         }
								//         return defaultSort;
								//     },
								// },
								pageSize: {
												type: Number,
												default: 50,
								},
								// dataType: {
								//     type: String,
								// },
								// search: {
								//     type: String,
								// },
								// startDate: {
								//     type: Date,
								// },
								// endDate: {
								//     type: Date,
								// }
				},
				data() {
								return {
												// groupingColumn: null,
												cacheKey: null,
												columnState: {},
												structureColumns: _.compact(this.columns),
												extraColumns: [],
												// all: [],
												// rows: [],
												page: [],
												// debouncedSearch: this.search,
												perPage: this.pageSize,
												loading: false,
												// loadingItems: true,

												currentPage: parseInt(this.initPage),
												previousSelectionIndex: -1,
												// sort: JSON.parse(JSON.stringify(this.initSort)),
								}
				},

				computed: {
								joins() {
												return [].concat(this.additionalKeys, _.map(this.extraColumns, 'key'));
								},
								// 								unwindableKeys
								// unwindableColumns

								unwindableColumns() {

												var array = _.filter(this.availableKeys.slice(), function(column) {
																return column.maximum != 1;
												})


												array.unshift({
																title: 'None',
																key: null,
												})

												// var currentFilterColumns = _.chain(this.activeFilterRows)
												// 				.map(function(row) {
												// 								if (!row) {
												// 												return;
												// 								}

												// 								return {
												// 												title: `Current Filter > ${row.title || row.key}`,
												// 												key: row.key,
												// 								}
												// 				})
												// 				.compact()
												// 				.value();

												// var array = currentFilterColumns.concat(this.availableKeys.slice());

												// array.unshift({
												// 				title: 'None',
												// 				key: null,
												// })
												return array;
								},
								availableGroupingKeys() {

												var currentFilterColumns = _.chain(this.activeFilterRows)
																.map(function(row) {
																				if (!row) {
																								return;
																				}

																				return {
																								title: `Current Filter > ${row.title || row.key}`,
																								key: row.key,
																				}
																})
																.compact()
																.value();

												var array = currentFilterColumns.concat(this.availableKeys.slice());

												array.unshift({
																title: 'None',
																key: null,
												})
												return array;
								},
								totalGroups() {

												var self = this;

												if (!self.groupingColumn) {
																return;
												}


												var num = _.chain(self.rows)
																.groupBy(function(row) {
																				return row._groupingKey;
																})
																.values()
																.value()
																.length;

												return num;
								},
								plural() {
												return this.$fluro.types.readable(this.dataType, true);
								},
								pagePopulationString() {
												return [this.currentPage, this.reloadChangeKey, _.map(this.rawPage, '_id'), _.map(this.renderColumns, 'key')].join('-');
												//this.structureColumns, this.groupingColumn ? this.groupingColumn.key : '', this.extraColumns];
								},
								renderColumns() {

												var self = this;
												var array = self.structureColumns ? self.structureColumns.slice() : [];

												var iteratorCounts = {};

												//Columns selected by the user
												if (self.extraColumns) {
																array = array.concat(self.extraColumns);
												}

												// array = _.filter(array, function(column) {
												//     return !self.columnState[column.key];
												// })

												/////////////////////////////////////

												//Columns to show because we are filtering on them
												if (!self.fixedColumns) {





																///////////////////////////////////////////////
																var filterFields = _.chain(self.activeFilters || [])
																				.map(function(filter) {

																								var filterKey = filter.key;
																								var columnDataType = filter.dataType;
																								var allowDuplicates;

																								if (filter.criteria && filter.criteria.length) {

																												if (!iteratorCounts[filter.key]) {
																																iteratorCounts[filter.key] = 0;
																												}

																												filterKey = `_matchedFilters['${filterKey}'][${iteratorCounts[filterKey]}]`;
																												columnDataType = 'reference';
																												allowDuplicates = true;

																												iteratorCounts[filter.key]++;

																								}

																								// //console.log('FILTER', filter);
																								if (filter.comparator) {
																												var column = {
																																title: filter.title || _.startCase(filter.key),
																																key: filterKey,
																																allowDuplicates,
																												}

																												//Treat as a date value
																												if (_.startsWith(filter.comparator, 'date') || filter.dataType == 'date') {
																																column.sortType =
																																				column.type = 'date';
																												}

																												switch (filter.dataType) {
																																case 'number':
																																case 'integer':
																																case 'decimal':
																																case 'float':
																																				column.sortType =
																																								column.type = columnDataType
																																				break;
																												}
																												// //console.log('FILTER COMPARATOR', filter);
																												// switch(filter.comparator) {
																												//     case 'datesameday':
																												//     case 'datenotyear':
																												//     case 'datemonthnotyear':
																												//     case 'datesameweek':
																												//     case 'datesamemonth':
																												//     case 'datesameyear':
																												//     case 'datesameweekday':
																												//     case 'datebefore':
																												//     case 'dateafter':
																												//     case 'datebetween':
																												//     case 'datenotbetween':
																												//         column.sortType = 
																												//         column.type = 'date';
																												//     break;
																												// }

																												return column;
																								}
																				})
																				.compact()
																				.value();

																/////////////////////////////////////

																_.each(filterFields, function(column) {

																				if (column.allowDuplicates) {
																								array.push(column)
																				} else {
																								// //console.log('COLUMN', column)
																								if (!_.some(array, { key: column.key })) {
																												// //console.log('COLUMNS', column);
																												array.push(column);
																								}
																				}
																})
												}


												/////////////////////////////////////

												return array;


								},

								// dateWatchString() {

								//     if (!this.startDate) {
								//         return
								//     }

								//     if (!this.endDate) {
								//         return
								//     }

								//     return String(Date(this.startDate).setHours(0, 0, 0, 0).getTime()) + String(Date(this.endDate).setHours(0, 0, 0, 0).getTime());
								// },
								grouped() {

												var self = this;

												var results;

												if (self.grouping) {
																results = self.grouping(self.page);
												} else if (self.groupingColumn && self.groupingColumn.key) {
																results = self.groupByColumn(self.page.slice(), self.groupingColumn);
												}

												// //console.log('RESULTS', results);
												return results;
								},

								reloadRequired() {
												return `${this.cacheKey}-${this.dataType}-${this.filterCheckString} ${this.dateWatchString} ${this.joins} ${this.sort.sortKey} ${this.sort.sortDirection} ${this.sort.sortType} ${this.groupingColumn ? this.groupingColumn.key : ''}  ${this.debouncedSearch}`;
								},
								selectionEnabled() {
												return (!(this.enableSelection === false) && this.selectionController) ? true : false;
								},
								actionsEnabled() {
												return !(this.enableActions === false);
								},
								rowsTotal() {
												return this.rowsLoaded || this.rows.length || MAX_CHUNK_SIZE || MAX_ROWS;
								},
								showLoading() {
												return this.loading || this.loadingItems;
								},
								// activeFilters() {
								//     return FilterService.activeFilters(this.filterConfig);
								// },
								// activeFilterRows() {
								//     return _.filter(this.activeFilters, function(row) {
								//         return row.comparator && row.comparator.length;
								//     })
								// },
								// activeFilterKeys() {
								//     return FilterService.activeFilterKeys(this.filterConfig);
								// },
								// activeFilterValues() {
								//     return FilterService.activeFilterValues(this.filterConfig);
								// },
								// activeFilterComparators() {
								//     return FilterService.activeFilterComparators(this.filterConfig);
								// },
								// activeFilterOperators() {
								//     return FilterService.activeFilterComparators(this.filterConfig);
								// },
								rowCheckString() {
												// //console.log('RECOMPUTE ROWS')
												var rows = this.rows || [];
												var ids = _.map(rows, '_id').join('');
												var keys = _.keys(rows[0]);

												return `${ids}${keys}`;
												// return _.chain(this.rows).map('_id').orderBy(function(id) {
												//     return id;
												// }).join('');
								},
								// dateWatchString() {

								//     if (!this.startDate) {
								//         return
								//     }

								//     if (!this.endDate) {
								//         return
								//     }


								//     return String(this.startDate) + String(this.endDate);
								// },
								// filterCheckString() {

								//     var filterString = FilterService.getFilterChangeString(this.filterConfig);
								//     return filterString;
								// },
								isAsync() {
												return this.dataType && this.dataType.length;
								},
								previousPageDisabled() {
												return this.currentPage <= 1;

								},
								nextPageDisabled() {
												return this.currentPage == this.totalPages;
								},
								filteredTotal() {
												return this.rows.length;
								},
								availablePages() {
												var chunk = _.chunk(this.rows, this.perPage);
												return chunk;
								},
								startOffset() {
												return Math.floor((this.currentPage - 1) * this.perPage);
								},
								endOffset() {
												return Math.min(this.startOffset + this.perPage, this.filteredTotal);
								},
								rawPage() {

												if (this.currentPage > this.totalPages) {
																var set = _.first(this.availablePages);
												} else {
																var set = this.availablePages[this.currentPage - 1];
												}

												//console.log('RAW', set, this.availablePages)

												return set || [];
								},
								totalPages() {
												return this.availablePages ? this.availablePages.length : 0;
								},
								allSelected() {

												var self = this;

												if (!self.page || !self.page.length) {
																return;
												}

												//Check if any of the rows are not selected
												var anyNotSelected = _.some(self.page, function(item) {
																var notSelected = !self.selectionController.isSelected(item);
																return notSelected;
												})

												return !anyNotSelected;
								},
								someSelected() {

												var self = this;

												if (self.allSelected) {
																return true;
												}

												return _.some(self.page, function(item) {
																return self.selectionController.isSelected(item);
												})
								},
								selectAllIcon() {
												if (this.allSelected) {
																return 'check-square';
												}

												if (this.someSelected) {
																return 'minus-square';
												}

												return 'square';


								},


				},
				asyncComputed: {

								availableColumns: {
												default: [],
												get() {
																var self = this;


																////////////////////////////////////

																//There are no rows
																if (!self.rows || !self.rows.length) {
																				self.loadingKeys = false;
																				return Promise.resolve([]);
																}

																////////////////////////////////////

																//Show feedback to the user that we are loading
																//the values for them
																self.loadingKeys = true;

																return new Promise(function(resolve, reject) {


																				//This is the key for our cached request
																				var cacheKey = `${self.dataType}-columns`;

																				////////////////////////////////////

																				//Get the storage cache
																				var valueStorageCache = self.$fluro.cache.get('filter-distinct-keys');

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
																								var options = {
																												type: self.dataType
																								}

																								///////////////////////////////////////////////////////

																								//Make the request and cache it
																								valueCache = valueStorageCache[cacheKey] = self.$fluro.content.keys(subSetIDs, options);
																				}

																				/////////////////////////////////////////////////////////////////

																				//When the request is complete
																				valueCache.then(function(res) {
																								resolve(res);

																								self.loadingKeys = false;
																				}, function(err) {
																								//console.log('Error', err);
																								resolve([]);
																								self.loadingKeys = false;

																								//Clear the cache request for next time
																								valueStorageCache[cacheKey] = null;
																				});
																})


												}
								},
				},
				// created() {
				// 	//console.log('DynamicTable - Created', this.$fluro)
				// //     this.$fluro.addEventListener('cache.reset', this.updateCacheKey);
				// },
				// mounted() {
				// 	//console.log('DynamicTable - Mounted', this.$fluro)
				// },
				// beforeDestroy() {
				//     this.$fluro.removeEventListener('cache.reset', this.updateCacheKey);
				// },


				filters: {
								numberWithCommas(x) {
												return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
								},
				},
				watch: {
								columns(columns) {
												console.log('COLUMNS', columns);
												this.structureColumns = _.compact(columns)
								},
								extraColumns() {
												this.$emit('additionalColumns', this.extraColumns);
								},
								pagePopulationString(str) {
												// //console.log('POPULATION STRING CHANGED')
												this.loading = true;
												this.populatePage()
								},
								// changeKey() {
								//     this.reload();
								// },
								// reloadRequired: {
								//     immediate: true,
								//     handler: _.debounce(function(string) {
								//         this.reload();
								//     }, 500)
								// },
								//COMMENTED DUE TO MOVE TO MIXIN
								// search: _.debounce(function(newValue) {
								//     // //console.log('Search changed!')
								//     this.debouncedSearch = newValue;
								//     // this.refine();
								// }, 500),
				},
				methods: {
								allInGroupSelected(items) {

												var self = this;

												if (!items || !items.length) {
																return;
												}

												//Check if any of the rows are not selected
												var anyNotSelected = _.some(items, function(item) {
																var notSelected = !self.selectionController.isSelected(item);
																return notSelected;
												})

												return !anyNotSelected;
								},
								someInGroupSelected(items) {

												var self = this;

												if (self.allInGroupSelected(items)) {
																return true;
												}

												return _.some(items, function(item) {
																return self.selectionController.isSelected(item);
												})
								},
								groupByColumn(rows, column, local) {

												var self = this;

												if (!column || !column.key) {
																return rows;
												}

												////////////////////////////////////////////////////

												var grouped;

												if (!local) {

																//We need to contact the server get the rows and then 
																grouped = _.chain(rows)
																				.reduce(function(set, row) {
																								// addGroupingEntry(rawValue)

																								var groupingTitle = row._groupingTitle || row._groupingKey;
																								var existing = set[row._groupingKey];

																								if (!existing) {
																												existing = set[row._groupingKey] = {
																																title: groupingTitle,
																																items: [],
																																sortKey: groupingTitle,
																												}
																								}

																								//////////////////

																								existing.items.push(row);

																								//////////////////

																								return set;
																				}, {})
																				.values()
																				.orderBy('sortKey')
																				.value();

												} else {

																////////////////////////////////////////////////////

																var key = column.key;
																var split = key.split('|');
																var dataPath = split[0];
																var discriminator = split[1];

																//////////////////////////////////////////////

																grouped = _.chain(rows)
																				.reduce(function(set, row) {

																								var rawValue = _.get(row, dataPath);
																								if (!rawValue) {
																												// rawValue = '';
																												//don't include the row if it can't be grouped
																												return set;
																								}

																								///////////////////////////////////////

																								if (_.isArray(rawValue)) {
																												_.chain(rawValue)
																																.filter(function(rawEntry) {
																																				if (!discriminator) {
																																								return true;
																																				}


																																				var match = rawEntry._discriminator == discriminator;
																																				return match;
																																})
																																.each(addGroupingEntry)
																																.value();
																								} else {
																												addGroupingEntry(rawValue)
																								}

																								////////////////////////////////////////////////////

																								function addGroupingEntry(groupingObjectValue) {
																												var groupingKey = _.get(groupingObjectValue, '_id') || _.get(groupingObjectValue, 'title') || _.get(groupingObjectValue, 'name') || _.get(groupingObjectValue, 'value') || groupingObjectValue;
																												var groupingTitle = _.get(groupingObjectValue, 'title') || _.get(groupingObjectValue, 'name') || groupingKey || '';
																												var sortKey = String(groupingTitle || '').toLowerCase();

																												// //console.log('Group by column', column.key, row, groupingObjectValue, groupingTitle, groupingKey)
																												var existing = set[groupingKey];
																												if (!existing) {
																																existing = set[groupingKey] = {
																																				title: groupingTitle,
																																				items: [],
																																				sortKey,
																																}
																												}

																												existing.items.push(row);
																								}

																								return set;
																				}, {})
																				.values()
																				.orderBy('sortKey')
																				.value();
												}

												return grouped;


								},
								toggleUnwindColumns(columns) {
												var self = this;

												self.unwindColumns = columns;
												// console.log('toggle unwind columns', columns)
								},
								toggleColumnGrouping(column) {
												var self = this;

												self.groupingColumn = column;

								},
								// columnIsUnwinding(column) {
								// 				var self = this;

								// 				var lookup = _.reduce(self.unwindColumns, function(set, column) {
								// 								set[column.key] = true;
								// 								return set;
								// 				}, {})

								// 				return (lookup[column.key])
								// 				// return self.unwindColumn && (self.unwindColumn.key == column.key);

								// },
								columnIsGrouping(column) {
												var self = this;
												return self.groupingColumn && (self.groupingColumn.key == column.key);

								},



								// updateCacheKey() {
								//     this.cacheKey = this.$fluro.global.CACHE_KEY;
								// },
								showOptionsForColumn(column) {

								},
								columnIsSelected(column) {
												var self = this;
												return _.some(self.extraColumns, { key: column.key })
								},
								toggleColumn(column) {
												var self = this;

												var index = _.findIndex(self.extraColumns, { key: column.key });
												if (index == -1) {
																self.$set(self.extraColumns, self.extraColumns.length, column);
												} else {
																self.extraColumns.splice(index, 1);
												}
								},
								// toggleColumn(column) {

								//     var self = this;

								//     var currentValue = self.columnState[column.key];

								//     self.$set(self.columnState, column.key, !currentValue)
								//     // var isDisabled = column.disabled;
								//     // if (isDisabled) {
								//     //     this.$set(column, 'disabled', true);
								//     // } else {
								//     //     this.$set(column, 'disabled', false);
								//     // }



								// },
								populatePage() {

												var self = this;

												//////////////////////////////////////

												if (self.dataType == 'node') {
																//console.log('Node > Show raw page')
																self.page = self.rawPage.slice();
																self.loading = false;
																return;
												}

												//Add a bit of a delay so they can't spam the server
												//by clicking 'nextPage()' over and over
												self.populatePageDebounced();

								},
								populatePageItems(rawPage, dataType, renderColumns) {

												var self = this;

												// var rawPageLookup = _.reduce(rawPage, function(set, item) {
												//     set[item._id] = JSON.parse(JSON.stringify(item));
												//     return set;
												// }, {});


												// console.log('POPULATE PAGE ITEMS', rawPage)

												renderColumns = renderColumns.slice();
												if (self.groupingColumn) {
																renderColumns.push(self.groupingColumn);
												}


												//////////////////////////////////////

												return new Promise(function(resolve, reject) {

																// var ids = _.map(rawPage, '_id');//_.keys(rawPageLookup);

																if (!rawPage || !rawPage.length) {
																				self.loading = false;
																				// //console.log('no raw page')
																				return resolve([]);
																}

																var fields = ['title', '_type', 'definition', 'subject', 'date']

																if (self.searchInheritable) {
																				fields.push('account');
																}

																//////////////////////////////////////

																var appendContactDetails = [];
																var appendFullFamily;
																var appendAssignments = true;

																//////////////////////////////////////

																//Include the extra fields that make sense
																fields = fields.concat(_.chain(renderColumns)
																				.compact()
																				.map(function(column) {

																								if (column.actualField) {
																												return column.actualField;
																								}

																								switch (column.key) {
																												case 'width':
																												case 'height':
																																return ['width', 'height']
																																break;
																												case 'firstName':
																																return ['firstName', 'preferredName', 'ethnicName']
																																break;
																												case 'lastName':
																																return ['lastName', 'maidenName']
																																break;
																								}

																								//////////////////////////////////////

																								if (column.additionalFields && column.additionalFields.length) {
																												return [column.additionalFields, column.key]
																								}

																								//////////////////////////////////////

																								return column.key;
																				})
																				.flattenDeep()
																				.compact()
																				.map(function(key) {
																								// //console.log('KEY SPLIT', key);
																								return key.split('|')[0];
																				})
																				.map(function(key) {
																								if (_.startsWith(key, 'details.')) {
																												var definitionName = key.split('.')[1];
																												appendContactDetails.push(definitionName);
																								}

																								if (_.startsWith(key, 'family.')) {
																												appendFullFamily = true;
																												return 'family';
																												// appendContactDetails.push(definitionName);
																								}

																								return key.split('[')[0];

																								// return key;
																				})
																				.value()
																);

																/////////////////////////////////////////////////

																var ids = self.$fluro.utils.arrayIDs(rawPage);

																/////////////////////////////////////////////////

																var pageRequest = {
																				ids,
																				select: _.uniq(fields),
																				populateAll: true,
																				limit: ids.length,
																				appendContactDetails,
																				appendAssignments,
																				appendFullFamily,
																				// cancelToken: currentPageItemsRequest.token,
																}

																/////////////////////////////////////////////////

																var cacheString = `${self.cacheKey}${JSON.stringify(pageRequest)}`;

																//Get the table cache
																var tableCache = self.$fluro.cache.get('async-table-cache');
																var cachedValue = tableCache.get(cacheString);

																if (cachedValue) {
																				console.log('From Cache!')
																				return pageDataLoaded(cachedValue);
																}

																/////////////////////////////////////////////////

																function pageDataLoaded(results) {



																				//Create a hash of all our populated results
																				var lookup;

																				/////////////////////////////////////////

																				lookup = _.reduce(results, function(set, entry, i) {
																								set[entry._id] = entry;
																								return set;
																				}, {})

																				/////////////////////////////////////////

																				// //console.log('Look for ids', ids);
																				var pageItems = _.chain(rawPage)
																								.map(function(rawRow, i) {
																												var entry = JSON.parse(JSON.stringify(lookup[rawRow._id]));

																												if (!entry) {
																																return;
																												}
																												entry._pageIndex = i;

																												//Add all the keys of the original object

																												//Merge the information we already know about the family
																												if (rawRow.family && entry.family) {
																																if (rawRow.family.items) {
																																				delete entry.family.items;
																																}
																																entry.family = Object.assign({}, rawRow.family, entry.family);
																												}


																												//////////////////////////////////////////

																												var output = Object.assign({}, rawRow, entry);

																												return output





																								})
																								// .flatten()
																								.compact()
																								.value();

																				/////////////////////////////////////

																				resolve(pageItems.slice());
																}

																/////////////////////////////////////////////////

																// console.log('make multiple request');
																self.$fluro.api.post(`/content/${dataType}/multiple`, pageRequest)
																				.then(function(res) {
																								//Cache the data
																								tableCache.set(cacheString, res.data);
																								return pageDataLoaded(res.data);
																				})
																				.catch(function(err) {
																								if (self.$fluro.api.axios.isCancel(err)) {
																												// return reject(err)
																												// //Not sure if this is correct
																												resolve([]);
																								} else {
																												return reject(err);
																								}
																				});

												})

								},
								populatePageDebounced: _.debounce(function() {
												var self = this;

												self.loading = true;


												self.populatePageItems(self.rawPage, self.dataType, self.renderColumns)
																.then(function(res) {

																				var page = res;

																				//////////////////////////////////////////////////////////

																				var unwindKeys = _.map(self.unwindColumns, 'key');

																				// ['adult', 'child'];

																				if (unwindKeys && unwindKeys.length) {


																								page = _.chain(page)
																												.map(function(row) {


																																return _.map(unwindKeys, function(columnKey) {
																																				var array = _.get(row, columnKey);

																																				//If it's not an array return the original row
																																				if (!array || !_.isArray(array) || !array.length) {
																																								return row;
																																				}

																																				//Return an entry for each unwound value
																																				return _.chain(array)
																																								.map(function(indValue) {

																																												//Clone the row
																																												var clone = JSON.parse(JSON.stringify(row));
																																												_.set(clone, columnKey, indValue);
																																												return clone;
																																								})
																																								.value();


																																})

																												})
																												.flattenDeep()
																												.value();


																				}

																				//////////////////////////////////////////////////////////


																				self.page = page;
																				// console.log('>> Page is populated', res)
																				self.loading = false;
																})
																.catch(function(err) {
																				//console.log('Error', err);
																				self.page = [];
																				self.loading = false;
																});

								}, 500),
								checkboxClick(item, $event, itemIndex) {
												// //console.log('ITEM INDEX', itemIndex, item, $event);
												return this.toggleSelection(item, $event, itemIndex);
												// ////console.log('Checkbox click!');
												return this.selectionController.toggle(item);
								},
								toggleSelection(item, $event, itemIndex, isolateOnClick) {


												////////////////////

												//No event data
												if (!$event) {
																if (isolateOnClick) {
																				//Set the selection to just this item

																				this.selectionController.setSelection([item]);
																				////console.log('SET SELECTION', item)
																				return
																} else {
																				//Select/Deselect this item
																				this.selectionController.toggle(item);

																				return
																}
												}

												////////////////////

												//They held CTRL/CMD down when they clicked
												if ($event.metaKey) {
																this.previousSelectionIndex = -1;
																return this.selectionController.toggle(item);
												}

												////////////////////

												//No button was pressed
												if (!$event.shiftKey) {
																//Remember this thing as what we selected
																this.previousSelectionIndex = itemIndex;
																if (isolateOnClick) {
																				this.selectionController.previousIntent = 'select';
																				return this.selectionController.setSelection([item]);
																} else {
																				return this.selectionController.toggle(item);
																}
												}

												////////////////////////////////////////////

												if (!itemIndex) {
																//Forget about it
																this.previousSelectionIndex = -1;
												}

												////////////////////////////////////////////

												//If there is a previous index
												if (this.previousSelectionIndex != -1) {



																//Find our range
																var start = Math.min(this.previousSelectionIndex, itemIndex);
																var end = Math.max(this.previousSelectionIndex, itemIndex);

																if (itemIndex > this.previousSelectionIndex) {
																				end += 1;
																}

																this.previousSelectionIndex = itemIndex;

																var getRange = this.page.slice(start, end);

																switch (this.selectionController.previousIntent) {
																				case 'deselect':
																								return this.selectionController.deselectMultiple(getRange);
																								break;
																				default:
																								return this.selectionController.selectMultiple(getRange);
																								break;
																}
												}

												this.previousSelectionIndex = itemIndex;
												return this.selectionController.toggle(item);
								},
								isActiveSort(key) {
												return this.sort.sortKey == key;
								},
								isSortable(column) {
												if (!column) {
																return;
												}
												var v = !(column.sortable === false)
												return v;
								},
								setSort(sortObject) {
												this.sort = sortObject;
												this.$emit('sort', sortObject);
								},
								toggleSort(column) {

												var self = this;

												if (!self.isSortable(column)) {
																return;
												}

												// //console.log('COLUMN', column);
												if (!column.key || !column.key.length) {
																return;
												}

												/////////////////////////
												var sortKey = column.key;
												var sortType = column.sortType || 'string';
												var alreadyActive = (self.sort && self.sort.sortKey == sortKey);
												var currentDirection = self.sort.sortDirection;
												var sortDirection = alreadyActive ? (currentDirection == 'asc' ? 'desc' : 'asc') : 'asc';

												// //console.log('SORT SET', self.sort)

												self.setSort({
																sortKey,
																sortType,
																sortDirection,
												});


												//Change to first page
												self.setPage(1);
								},
								classes(item) {
												var classes = []

												if (!item) {
																return classes;
												}

												if (this.selectionController.isSelected(item)) {
																classes.push('selected');
												}



												//// //console.log('iTEM ISSUE', item)
												classes.push('status-' + item.status);

												if (item.paymentStatus) {
																classes.push('payment-status-' + item.paymentStatus);
												}

												if (item.processStatus) {
																classes.push('process-status-' + item.processStatus);
												}


												if (item.collected) {
																classes.push('ticket-status-collected');
												}

												//////////////////////////////////
												//If it's a mailout
												switch (item.state) {
																case 'sent':
																				classes.push('state-sent');
																				break;
																case 'scheduled':
																				classes.push('state-scheduled');
																				break;
																case 'ready':
																				classes.push('state-ready');
																				break;
												}

												//////////////////////////////////

												return classes;

								},
								setPage(pageNumber) {

												if (this.currentPage == pageNumber) {
																////console.log('Already at page', pageNumber)
																return;
												}

												this.currentPage = pageNumber;
												// this.pageChange();

												var topElement = this.$refs.top;
												if (topElement) {
																// //console.log('SCROLL INTO VIEW')
																topElement.scrollIntoView({
																				// block:'center',
																				// behavior:'smooth',
																});
												}

												// //console.log('Recreate page!')
												this.$emit('page', pageNumber);
								},
								firstPage() {
												this.currentPage = 1;

								},
								lastPage() {
												this.currentPage = this.totalPages;
								},
								nextPage() {
												////console.log(this.currentPage, this.totalPages);
												this.currentPage < this.totalPages ? this.setPage(this.currentPage + 1) : this.setPage(this.totalPages);
								},
								previousPage() {
												this.currentPage > 1 ? this.setPage(this.currentPage - 1) : this.setPage(1);
								},
								selectPage() {
												if (!this.page || !this.page.length) {
																return;
												}

												this.selectionController.selectMultiple(this.page)
								},
								deselectPage() {
												if (!this.page || !this.page.length) {
																return;
												}

												this.selectionController.deselectMultiple(this.page)
								},
								selectAll() {
												this.selectionController.selectMultiple(this.rows);
								},
								deselectAll() {
												this.selectionController.deselectAll();
								},
								toggleSet(items) {

												var self = this;

												if (self.allInGroupSelected(items)) {
																// //console.log('Toggle set select', items.length)
																self.selectionController.deselectMultiple(items)
												} else {
																// //console.log('Toggle set deselect', items.length)
																self.selectionController.selectMultiple(items)
												}
								},
								toggleSelectAll() {
												if (!this.page || !this.page.length) {
																return;
												}

												// ////console.log('Toggle All', this.page);
												if (this.allSelected) {
																this.selectionController.deselectMultiple(this.page)

												} else {
																this.selectionController.selectMultiple(this.page)
												}
								}
				},
				mixins: [DynamicListMixin],
				components: {
								FluroHelp,
								TableHeaderCheckbox,
								TableRowCheckbox,
								TableCell,
				},
}

</script>
<style lang="scss">
.columnselected {
				background: #eee;
				color: #aaa;
}


.fluro-table-wrapper {

				.select-options {
								font-size: normal;
								font-weight: normal;
								;
								letter-spacing: 0;
								text-transform: none;
				}

				position: relative;

				$padding-h: 7px;


				// border: 10px solid;
				flex: 1;
				display: flex;
				flex-direction: column;
				overflow: hidden;
				height: 100%;


				.v-progress-linear {
								position: absolute;
								top: 0;
								left: 0;
								right: 0;
								margin: 0;
								padding: 0;
				}



				.thumbnail {
								background-size: cover;
								background-position: center;
								width: 50px;
								height: 30px;
								border-radius: 3px;
								display: block;
								// border:1px solid rgba(#000, 0.1);
				}

				.fluro-table-scroll {
								position: relative;
								width: 100%;
								z-index: 1;
								margin: auto;
								overflow: auto;
								height: 100%;

								// overscroll-behavior-x: none !important;
								// overscroll-behavior-y: none !important;
								// overscroll-behavior: none !important;

								table {
												width: 100%;
												// min-width: 1280px;
												margin: auto;
												border-collapse: separate;
												border-spacing: 0;


								}

								&.loading {
												table {
																opacity: 0.5;
												}
								}

								th,
								td {
												padding: 8px $padding-h;
												border-bottom: 1px solid #e8edf1;
												vertical-align: middle;
												white-space: nowrap;
												position: relative;

												&.shrink {
																width: 1px;
												}


								}

								th {
												&.sorting {
																background: #f6f6f6 !important;
												}
								}

								.action-buttons {
												opacity: 0.3;
												white-space: nowrap;

								}

								tr {
												background: #fff;

												th.first,
												th.last {
																background: #fff;

												}

												&:nth-child(odd) {
																background: #fcfcfc;

																th.first,
																th.last {
																				background: #fcfcfc;
																}
												}

												&.status-cancelled,
												&.status-archived,
												&.ticket-status-collected,
												&.payment-status-refund,
												// &.payment-status-partial_refund,
												&.status-deceased {

																th.first,
																th.last,
																td,
																th {
																				color: #888; //rgba(#000, 0.5);
																				background: #f4f4f4;
																}
												}



												&.state-sent {

																th.first,
																th.last,
																td,
																th {
																				// color: #888; //rgba(#000, 0.5);
																				background: #f7f7f7 !important;
																}
												}

												&.state-scheduled,
												&.process-status-pending {

																th.first,
																th.last,
																td,
																th {
																				background: lighten(#fff3b9, 5%) !important;
																				color: desaturate(darken(#f0974e, 20%), 30%) !important;
																				// color: darken($warning, 20%);
																				// background: rgba($warning, 0.05);
																}
												}


												&.process-status-complete {

																th.first,
																th.last,
																td,
																th {
																				color: darken($success, 10%) !important;
																				background: lighten($success, 40%) !important;

																				//background: lighten($success, 25%) !important;
																				//color: desaturate(darken($success, 20%), 30%) !important;
																				// color: darken($warning, 20%);
																				// background: rgba($warning, 0.05);
																}
												}


												&.process-status-failed,
												&.payment-status-failed {

																th.first,
																th.last,
																td,
																th {
																				color: darken($danger, 10%) !important;
																				background: lighten($danger, 41%) !important;
																				// color: darken($warning, 20%);
																				// background: rgba($warning, 0.05);
																}
												}





												&.status-template {

																th.first,
																th.last,
																td,
																th {
																				color: #333 !important; //rgba(#000, 0.5);
																				background: #fafafa !important;
																}
												}

												&.payment-status-pending {

																th.first,
																th.last,
																td,
																th {
																				color: darken($primary, 20%);
																				background: rgba($primary, 0.1);
																				// color: #82664e; //rgba(#000, 0.5);
																				// background: #fffceb;
																}
												}


												&.selected {

																th.first,
																th.last,
																td,
																th {
																				// background: yellow;
																				background-color: #f7f6de !important;
																				color: #846b1f;
																				border-color: #f2eac9 !important;

																}
												}


								}

								&.clickable tbody tr {


												&:hover {

																td,
																th {

																				&,
																				&.first,
																				&.last {
																								background-color: #f4fafa;
																								color: #055d52;
																				}
																}


																.action-buttons {
																				opacity: 1;
																}
												}

												&.breaker {
																background: rgba(#000, 0.05);

																td,
																th {
																				background: none !important;
																				color: rgba(#000, 0.5) !important;
																				text-transform: uppercase;
																				font-size: 0.8em;
																				font-weight: 600;
																				letter-spacing: 0.03em;
																				padding: 4px $padding-h;

																				&.checkbox-cell {
																								padding: 0;
																				}
																}
												}
								}

								thead {

												// position: -webkit-sticky;
												//    position: sticky;
												//    top: 0;

												//    &,
												th,
												td {
																padding: 5px $padding-h;
																position: -webkit-sticky;
																position: sticky;
																top: 0;

																background: #fff !important;
																z-index: 4;

																//theme/styling
																text-align: left;
																font-size: 11px;
																text-transform: uppercase;
																letter-spacing: 0.05em;
																line-height: 20px;
																white-space: nowrap;
												}

												th {
																white-space: nowrap;
																border-left: 1px solid rgba(#000, 0.05);

																&.first {
																				border-left: none;
																}

																// padding-right: 20px;


																.options-icon {
																				opacity: 0;
																				position: absolute;
																				right: 20px;
																				top: 50%;
																				transform: translateY(-50%);
																}

																&:hover {
																				.options-icon {
																								opacity: 1;
																				}
																}

																&.sorting {
																				padding-right: 20px;
																}

																&.sortable {
																				.sort-icon {
																								position: absolute;
																								right: 2px;
																								top: 50%;
																								transform: translateY(-50%);
																				}
																}
												}
								}


								/* safari and ios need the tfoot itself to be position:sticky also */
								tfoot {
												position: -webkit-sticky;
												position: sticky;
												bottom: 0;

												&,
												& th,
												& td {
																position: -webkit-sticky;
																position: sticky;
																bottom: 0;
																background: #fff;
																// color: #fff;
																z-index: 4;
												}

												th {
																white-space: nowrap;
												}
								}



								th.first {
												position: -webkit-sticky;
												position: sticky;
												left: 0;
												z-index: 2;



												// background: #ccc;
								}

								th.last {
												position: -webkit-sticky;
												position: sticky;
												right: 0;
												z-index: 2;
												text-align: right;
												// background: #ccc;
								}

								thead th.first,
								tfoot th.first,
								thead th.last,
								tfoot th.last {
												z-index: 5;

								}



				}

				.footer-stats {
								@extend .border-top !optional;
								padding: 5px 10px;
								font-size: 0.9em;
				}

				.pagenumber-select {
								display: inline-block;
								position: relative;

								select {
												opacity: 0;
												width: 100%;
												height: 100%;
												position: absolute;
												appearance: none;
												display: block;
												left: 0;
												right: 0;
												bottom: 0;
												top: 0;
								}
				}


				.flex-center {
								flex: 1;
								display: flex;
								text-align: center;
								justify-content: center;
								align-items: center;
				}


				th,
				td {
								&.checkbox-cell {
												text-align: center;
												padding-left: 5px !important;
												padding-right: 5px !important;
								}
				}

				th,
				td {
								&.first {
												// padding-left: $padding-h * 2 !important;
								}

								&.last {
												// padding-right: $padding-h * 2 !important;
								}
				}

}

</style>
