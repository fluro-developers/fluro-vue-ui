<template>
    <flex-column>
        <template v-if="loading">
            <fluro-page-preloader contain />
        </template>
        <template v-else>
            <tabset justified>
                <tab heading="Results">
                    <!-- <flex-column-header>
                        <v-container style="background: #fff;" pa-2 fluid class="border-bottom">
                            <v-layout>
                                <v-flex>
                                </v-flex>
                                <v-flex shrink>
                                    <v-btn small @click="toggleFilters()" class="ma-0">
                                        {{showFilters ? 'Hide' : 'Show'}} Filters
                                        <fluro-icon icon="filter" :library="showFilters ? 'fas' : 'far'" right />
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </flex-column-header> -->
                    <flex-row>
                        <flex-column>
                            <fluro-table ref="table" :defaultSort="defaultSort" :defaultSortType="defaultSortType" :defaultSortDirection="defaultSortDirection" :showFooter="true" trackingKey="_id" :pageSize="100" :items="filtered" :totals="totals" :avg="avg" :columns="columns">
                                <template v-slot:optionsabove>
                                    <v-container pa-2 class="border-bottom">
                                        <v-layout>
                                            <v-flex xs6>
                                                <v-btn block class="mr-1" :loading="printing" @click="printTable()">
                                                    Print
                                                    <fluro-icon right icon="print" />
                                                </v-btn>
                                            </v-flex>
                                            <v-flex xs6>
                                                <v-btn block class="ml-1" :loading="exporting" @click="printTable(true)">
                                                    Export CSV
                                                    <fluro-icon right icon="file-spreadsheet" />
                                                </v-btn>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                </template>
                            </fluro-table>
                        </flex-column>
                        <flex-column class="border-left" style="max-width:320px;" v-if="showFilters">
                            <tabset :justified="true">
                                <tab heading="Refine">
                                    <flex-column-body style="background: #f0f0f0;">
                                        <v-container fluid pa-2>
                                            <search-input style="background: #fff;" @click.native.stop.prevent placeholder="Search within results" v-model="keywords" />
                                        </v-container>
                                        <v-container fluid pa-2>
                                            <v-label>Advanced filters</v-label>
                                            <filter-condition-group :forceLocalValues="true" :filterFields="filterFields" :rows="results" :mini="true" v-model="filterConfig" :debounce="filterDebounce" />
                                        </v-container>
                                    </flex-column-body>
                                </tab>
                            </tabset>
                        </flex-column>
                    </flex-row>
                </tab>
                <tab heading="Feeds">
                    <flex-column-body style="background: #fafafa;">
                        <v-container fluid>
                            <constrain sm>
                                <h3 margin>Feed URLs</h3>
                                <p>This query can be retrieved and rendered in different ways. Select below to get a templated feed of it's results.</p>
                                <v-btn large block :href="jsonURL" target="_blank">
                                    JSON API Feed
                                    <fluro-icon right icon="brackets-curly" />
                                </v-btn>
                                <v-btn large block @click="exportCSV()" :loading="exporting">
                                    Export CSV
                                    <fluro-icon right icon="file-csv" />
                                </v-btn>
                                <v-btn large block :href="icalFeed" target="_blank">
                                    ICal Feed
                                    <fluro-icon right icon="rss" />
                                </v-btn>
                                <v-btn large block :href="podcastURL" target="_blank">
                                    Podcast RSS Feed
                                    <fluro-icon right icon="rss" />
                                </v-btn>
                            </constrain>
                        </v-container>
                    </flex-column-body>
                </tab>
                <tab :heading="`${definition.title} Details`" v-if="definedFields.length">
                    <flex-column-body style="background: #fafafa;">
                        <v-container fluid>
                            <constrain sm>
                                <h3 margin>{{definition.title}} Details</h3>
                                <fluro-content-render :fields="definedFields" v-model="item.data" />
                            </constrain>
                        </v-container>
                    </flex-column-body>
                </tab>
                <tab :heading="`History`" v-if="dataSets.length">
                    <flex-column-body style="background: #fafafa;">
                        <div v-for="dataset in dataSets" :key="dataset._id">
                            <v-container fluid class="history">
                                <constrain sm>
                                    <h3 margin>{{dataset.title}} - Records</h3>
                                    <fluro-timeline v-model="dataset.data">
                                        <template v-slot:card="{entry}">
                                            <div class="timeline-card">
                                                <v-layout align-center>
                                                    <v-flex>
                                                        <strong>{{entry.date | formatDate('ddd D MMM YYYY')}}</strong>
                                                        <div class="font-xxs muted">{{entry.date | timeago}}</div>
                                                    </v-flex>
                                                    <v-flex shrink>
                                                        <v-btn class="ma-0" small :href="entry.link" target="_blank">
                                                            Download CSV
                                                            <fluro-icon right icon="arrow-to-bottom" />
                                                        </v-btn>
                                                    </v-flex>
                                                </v-layout>
                                                <!-- <fluro-realm-bar :realm="entry.realms" /> -->
                                                <!-- <label>{{entry.title}}</label> -->
                                                <!-- <pre>{{entry}}</pre> -->
                                                <!-- } -->
                                            </div>
                                        </template>
                                    </fluro-timeline>
                                    <!-- <div class="timeline">
                                        <div class="timeline-year" v-for="(year, yearIndex) in dataset.timeline" :key="yearIndex">
                                            <h4 class="year-title">{{year.date | formatDate('YYYY')}}</h4>
                                            <div>
                                                <div class="timeline-month" v-for="(month, monthIndex) in year.months" :key="monthIndex">
                                                    <div class="timeline-line"></div>
                                                    <h5 class="month-title">{{month.date | formatDate('MMM')}}</h5>
                                                    <div class="timeline-day" v-for="(day, dayIndex) in month.days" :key="dayIndex">
                                                        <div class="row no-gutters">
                                                            <div class="xs-2">
                                                                <div class="date-label-outer">
                                                                    <div class="date-label">
                                                                        {{day.date | formatDate('ddd D')}}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="xs-10">
                                                                <div class="day-events">
                                                                    <a :href="entry.url" target="_blank" v-for="entry in day.items" class="timeline-event" :key="entry._id">
                                                                        <v-layout align-center>
                                                                            <v-flex>
                                                                                <strong>
                                                                                    {{entry.date | formatDate('h:mma dddd D MMM YYYY')}}
                                                                                </strong>
                                                                                <Div>
                                                                                    <em class="muted font-xxs">Export generated {{entry.date | timeago}}</em>
                                                                                </Div>
                                                                            </v-flex>
                                                                            <v-flex shrink>
                                                                                <v-btn class="ma-0" small icon>
                                                                                    <fluro-icon icon="download" />
                                                                                </v-btn>
                                                                            </v-flex>
                                                                        </v-layout>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> -->
                                    <!-- </div> -->
                                    <!-- <pre>{{resultSets}}</pre> -->
                                    <!-- <pre>{{resultSetsData}}</pre> -->
                                </constrain>
                            </v-container>
                        </div>
                    </flex-column-body>
                </tab>
            </tabset>
        </template>
    </flex-column>
</template>
<script>
/////////////////////////////////

import FluroContentViewMixin from "../FluroContentViewMixin.js";
import FluroTable from "../../../table/FluroTable.vue";
import RealmDotCell from "../../../table/cells/RealmDotCell.vue";
import TitleCell from "../../../table/cells/TitleCell.vue";
import DefinitionCell from "../../../table/cells/DefinitionCell.vue";
import SearchInput from "../../../ui/SearchInput.vue";
import FilterConditionGroup from '../../../form/filters/FilterConditionGroup.vue';
import FluroTimeline from '../../../ui/FluroTimeline.vue';
import { FilterService } from 'fluro';
/////////////////////////////////

export default {
    props: {
        config: {
            type: Object,
            required: true
        },
        item: {
            type: Object,
            required: true
        },
        cacheKey: {
            type: Number,
            default () {
                return 0;
            }
        },
    },
    components: {
        FluroTimeline,
        FluroTable,
        RealmDotCell,
        TitleCell,
        DefinitionCell,
        SearchInput,
        FilterConditionGroup,
    },
    mixins: [FluroContentViewMixin],
    methods: {
        toggleFilters() {
            this.showFilters = !this.showFilters;
        },
        printTable(exportCSV) {
            console.log('PRINT TABLE')
            var self = this;
            var table = self.$refs.table;

            /////////////////////////////////////////

            self.$fluro.global.softLoading = true;
            if (exportCSV) {
                self.exporting = true;
            } else {
                self.printing = true;
            }

            /////////////////////////////////////////

            self.$fluro.global.print(self.item.title, 'table', {
                    value: {
                        rows: JSON.parse(JSON.stringify(self.filtered)),
                        renderColumns: self.columns,
                        dataType: self.item.filterType || 'node',
                        //             groupingColumn: table.groupingColumn,
                        //             groupingFunction: table.groupingColumn ? function(rows) {

                        //                 return table.groupByColumn(rows, table.groupingColumn, true)
                        //             } : null,
                        export: exportCSV,
                    }
                })
                .then(function() {

                    if (exportCSV) {
                        self.exporting = false;
                    } else {
                        self.printing = false;
                    }
                    self.$fluro.global.softLoading = false;
                })
                .catch(function() {

                    if (exportCSV) {
                        self.exporting = false;
                    } else {
                        self.printing = false;
                    }
                    self.$fluro.global.softLoading = false;
                });

        },
        refilter: _.debounce(function() {
            var self = this;

            self.filterSet = FilterService.filter(self.results, {
                filter: self.filterConfig,
            });


        }, 200),
        refresh() {
            this.cacheBuster++;
        },
        exportCSV() {

            var self = this;
            if (!self.item._id) {
                return;
            }

            /////////////////////////

            self.exporting = true;

            /////////////////////////

            self.$fluro.api.post(`/export/query/${self.item._id}/csv`)
                .then(function(res) {

                    var downloadURL = self.$fluro.api.generateEndpointURL(res.data.download);
                    // var CurrentFluroToken = self.$fluro.auth.getCurrentToken();

                    // var downloadURL = `${res.data.download}`

                    // if (CurrentFluroToken) {
                    //     window.open(`${downloadURL}?access_token=${CurrentFluroToken}`);
                    // } else {
                    window.open(`${downloadURL}`);
                    // }

                    self.exporting = false;

                }, function(err) {
                    self.$fluro.error(err);
                    self.exporting = false;
                })

            // return url;
        },
    },
    asyncComputed: {
        results: {
            default: [],
            get() {
                var self = this;
                self.loading = true;

                var cb = self.cacheBuster;
                return new Promise(function(resolve, reject) {
                    self.$fluro.content.query(self.item, { cb }, { cache: false })
                        .then(function(result) {
                            resolve(result);
                            self.loading = false;
                        })
                        .catch(reject);
                });
            }
        },
        dataSets: {
            default: [],
            get() {
                var self = this;
                self.loadingResultSetData = true;


                return new Promise(function(resolve, reject) {


                    self.$fluro.api.get(`/query/${self.$fluro.utils.getStringID(self.item)}/resultsets/metadata`, { cache: false })
                        .then(function(res) {

                            var dataSets = res.data;

                            resolve(dataSets);
                            self.loadingResultSetData = false;

                            // _.each(dataSets, function(dataSet) {

                            // });

                            //   var dataItems = _.map(dataSet.data, function(item) {



                            //   });

                            //   dataSet.timeline = _.map(dataItems, function(item) {


                            //   })


                            // })
                            // var timeline = _.map(result.data, function(entry) {

                            //     var items = _.map(entry.data, function(item) {
                            //         return Fluro.apiURL + '/results/' + $scope.item._id + '/' + entry._id + '/' + filename + '.csv';
                            //     })


                            //     entry.historicaltimeline = self.$fluro.date.timeline(
                            //         entry.data,
                            //         "date"
                            //     );
                            //     return entry;
                            // });


                            // resolve(returnData);



                            // resolve(res.data);
                            // self.loadingResultSetData = false;
                        })
                        .catch(reject);
                });
            }
        }
    },
    watch: {
        results: 'refilter',
        filterChangeString: 'refilter',
        keywords(keywords) {

        },
        cacheKey(k) {
            this.cacheBuster = k;
        }
    },
    computed: {
        filterSort() {
            return this.item.filterType ? this.item.filterSort : null;
        },
        defaultSort() {
            if (!this.filterSort) {
                return;
            }
            return this.filterSort.key || this.filterSort.sortKey
        },
        defaultSortType() {
            if (!this.filterSort) {
                return;
            }
            return this.filterSort.type || this.filterSort.sortType
        },
        defaultSortDirection() {
            if (!this.filterSort) {
                return;
            }
            return this.filterSort.direction || this.filterSort.sortDirection
        },
        filterChangeString() {
            return FilterService.getFilterChangeString(this.filterConfig);
        },
        filterFields() {

            var self = this;
            var fields = [];


            _.each(self.item.filters, function(filter) {
                fields.push({
                    title: filter.title,
                    key: filter.key,
                    maximum: 1,
                    minimum: 0,
                    type: filter.type || 'string',
                })
            })


            _.each(self.item.columns, function(column) {
                fields.push({
                    title: column.title,
                    key: column.key,
                    maximum: 1,
                    minimum: 0,
                    type: column.type || 'string',
                })
            })
            // fields.push({
            //     title: "Testing",
            //     key: "title",
            //     maximum: 1,
            //     minimum: 0,
            //     type: "string",
            // })




            return fields;
        },

        filtered() {
            var self = this;

            var results = self.filterSet;


            if (self.keywords && self.keywords.length) {

                var keywords = self.keywords.toLowerCase();
                // function filterDeep(input, searchTerms, state) {

                //     if (_.isObject(input)) {
                //         for (const v of Object.values(input)) {

                //         }
                //     } else {
                //         if (String(input).includes(searchTerms)) {
                //             state.push(input);
                //         }
                //     }

                // }

                /////////////////////////////////////////////////

                function valueMatches(item) {

                    var match;
                    if (_.isObject(item)) {
                        match = _.chain(item)
                            .values()
                            .some(function(value) {
                                return valueMatches(value);
                            })
                            .value();
                    } else {
                        match = String(item).toLowerCase().includes(keywords);
                    }

                    return match;
                }

                /////////////////////////////////////////////////

                results = _.reduce(results, function(set, item) {

                    if (valueMatches(item)) {
                        set.push(item);
                    }

                    return set;
                }, []);
            }

            return results;
        },
        jsonURL() {
            if (!this.item._id) {
                return;
            }

            var url = this.$fluro.api.generateEndpointURL(`/content/_query/${this.item._id}`, {
                noCache: true,
            })

            return url;
        },


        icalFeed() {
            if (!this.item._id) {
                return;
            }

            var token = _.get(this.item, 'data.accessToken');

            var params = {
                noCache: true,
                template: 'ical',
                limit: 100,
            };


            if (token) {
                params.withoutToken = true;
                params.access_token = token;
                
            }

            var url = this.$fluro.api.generateEndpointURL(`/content/_query/${this.item._id}/file/ical.ics`, params)

            return url;
        },
        podcastURL() {
            if (!this.item._id) {
                return;
            }

            var params = {
                noCache: true,
                template: '57d8cbe4e17968d83736c6df',
                limit: 100,
            };


            var token = _.get(this.item, 'data.accessToken');

            if (token) {
                params.withoutToken = true;
                params.access_token = token;
            }

            var url = this.$fluro.api.generateEndpointURL(`/content/_query/${this.item._id}/file/feed.xml`, params)

            return url;
        },
        data() {
            return this.item.data || {};
        },
        fields() {
            // var array = [];

            // array.push({
            //     title: 'Linked Contacts',
            //     key: 'contacts',
            //     type: 'reference',
            //     minimum: 0,
            //     maximum: 0,
            // })

            return array;
        },
        definedFields() {
            return this.config.definition ? this.config.definition.fields || [] : [];
        },
        totals() {
            var self = this;

            return _.map(self.columns, function(column) {

                var key = column.key;
                if (String(key).toLowerCase().includes('phone') || String(key).toLowerCase().includes('mobile')) {
                    return 0;
                }


                return _.reduce(self.filtered, function(set, row) {


                    //TODO Make this more advanced for nested and multi field entries
                    var value = _.get(row, key);

                    if (isNaN(value)) {
                        return set;
                    }

                    set = parseFloat(set) + parseFloat(value);

                    return set;
                }, 0)
            })
        },
        avg() {
            var self = this;

            var rowCount = self.filtered.length;

            return _.map(self.totals, function(total) {

                return Math.round(total / rowCount);
            })

        },
        columns() {
            if (!this.item.columns.length) {
                return [{
                        title: "",
                        shrink: true,
                        align: "center",
                        key: "realms",
                        renderer: RealmDotCell
                    },
                    {
                        title: "Title",
                        key: "title",
                        renderer: TitleCell,
                        additionalFields: ["firstLine"]
                    },
                    {
                        title: "Type",

                        renderer: DefinitionCell,
                        shrink: true
                    },
                    {
                        title: "Created",
                        key: "created",
                        type: "date",
                        shrink: true
                    },
                    {
                        title: "Updated",
                        key: "updated",
                        type: "date",
                        shrink: true
                    }
                ];
            }
            return this.item.columns;
        }
    },
    data() {
        return {
            printing: false,
            exporting: false,
            filterSet: [],
            filterConfig: {},
            filterDebounce: 300,
            showFilters: false,

            //Other bits
            keywords: '',
            loading: true,
            exporting: false,
            loadingResultSetData: true,
            cacheBuster: this.cacheKey,
        };
    }
};

</script>
<style lang="scss">
.history .timeline-card {
    padding: 8px;
}

</style>
