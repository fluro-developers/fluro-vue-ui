<template>
    <!-- <flex-column> -->
    <flex-column class="content-select-modal">
        <!-- <pre>{{selector.selectionMinimum}} {{selector.selectionMaximum}}</pre> -->
        <flex-column v-if="loading">
            <v-container fluid class="text-xs-center">
                <v-progress-circular indeterminate />
            </v-container>
        </flex-column>
        <template v-else>
            <!-- <fluro-content-browser :minimum="minimum" :maximum="maximum" :type="type" @close="closeModal()" v-model="model"></fluro-content-browser> -->
            <flex-column-header class="border-bottom">
                <v-container fluid pa-2>
                    <v-layout row align-center>
                        <template v-if="$vuetify.breakpoint.smAndUp">
                            <v-flex shrink>
                                <h5>
                                    <fluro-icon left :type="type" />
                                    {{modalTitle}}
                                </h5>
                            </v-flex>
                            <v-spacer />
                        </template>
                        <v-flex>
                            <!--   -->
                            <template v-if="!showFilters">
                                <div class="search" :class="{active:searchFocussed || search.length}">
                                    <input v-model="search" :autofocus="$vuetify.breakpoint.smAndUp" @focus="searchFocussed = true" @blur="searchFocussed = false" placeholder="Search by keyword" />
                                    <div class="search-icon" @click="search = ''">
                                        <fluro-icon icon="times" v-if="search.length" />
                                        <fluro-icon icon="search" v-else />
                                    </div>
                                </div>
                            </template>
                        </v-flex>
                        <v-spacer />
                        <v-flex shrink v-if="dateFilterVisible && !showFilters">
                            <v-menu :fixed="true" :right="true" :close-on-content-click="false" transition="slide-y-transition" offset-y>
                                <template v-slot:activator="{ on }">
                                    <v-btn small v-on="on">
                                        {{readableDate}}
                                        <fluro-icon library="far" icon="angle-down" right />
                                    </v-btn>
                                </template>
                                <v-card>
                                    <v-layout>
                                        <v-flex>
                                            <v-card-text>
                                                <label>&nbsp;</label>
                                                <v-list dense>
                                                    <v-list-tile @click="selectDatePeriod(option)" v-for="option in datePeriodOptions" :key="option.value">
                                                        {{option.title}}
                                                    </v-list-tile>
                                                </v-list>
                                            </v-card-text>
                                        </v-flex>
                                        <v-flex>
                                            <v-card-text class="text-sm-center"><label>From Date</label></v-card-text>
                                            <v-date-picker v-model="startDateString" no-title scrollable></v-date-picker>
                                        </v-flex>
                                        <v-flex>
                                            <v-card-text class="text-sm-center"><label>To Date</label></v-card-text>
                                            <v-date-picker v-model="endDateString" no-title scrollable></v-date-picker>
                                        </v-flex>
                                    </v-layout>
                                </v-card>
                            </v-menu>
                        </v-flex>
                        <v-flex shrink>
                            <v-btn icon small class="my-0" @click="showFilters = !showFilters">
                                <fluro-icon icon="filter" :library="showFilters ? 'fas' : 'far'" />
                            </v-btn>
                        </v-flex>
                        <v-flex shrink>
                            <v-btn small class="my-0 mr-0" @click="dismiss()">Back</v-btn>
                        </v-flex>
                        <v-flex shrink>
                            <v-btn color="primary" small class="my-0 mr-0" @click="close(selector.selection)">Done</v-btn>
                        </v-flex>
                    </v-layout>
                </v-container>
            </flex-column-header>
            <flex-column>
                <!-- v-show="$vuetify.breakpoint.smAndUp || !showFilters" -->
                <v-layout fill-height>
                    <flex-column style="min-height:50vh;">
                        <!-- <pre>{{joins}}</pre> -->
                        <!-- :init-page="$route.query.page"  :init-sort="{sortKey:$route.query.sortKey, sortDirection:$route.query.sortDirection, sortType:$route.query.sortType}" @raw="rowsChanged" @filtered="filteredChanged" @page="pageChanged" @sort="sortChanged"  -->
                        <fluro-dynamic-table :startDate="startDate" :endDate="endDate" :includeArchivedByDefault="includeArchivedByDefault" :additionalKeys="joins" :queryString="false" :enable-actions="false" :allDefinitions="retrieveAllDefinitions" :searchInheritable="options.searchInheritable" :filter-config="filterConfig" :lock-filter="options.lockFilter" :selection-controller="selector" :clicked="rowClicked" :search="search" :data-type="type" :columns="columns" @raw="rowsChanged" @filtered="filteredChanged" @page="pageChanged" @sort="sortChanged" />
                    </flex-column>
                    <flex-column class="filter-sidebar" v-show="showFilters">
                        <flex-column-body>
                            <v-container pa-2>
                                <div class="search" :class="{active:searchFocussed || search.length}">
                                    <input v-model="search" @focus="searchFocussed = true" @blur="searchFocussed = false" placeholder="Keyword search" />
                                    <div class="search-icon" @click="search = ''">
                                        <fluro-icon icon="times" v-if="search.length" />
                                        <fluro-icon icon="search" v-else />
                                    </div>
                                </div>
                            </v-container>
                            <!--  <v-container pa-2 v-if="inheritEnabled">
                                <help title="Inherited content" body="Show content that is shared with you from other Fluro accounts" keywords="What is inheritable content?" />
                                <v-checkbox :persistent-hint="true" label="Show Inherited" v-model="manualSearchInheritable" hint="Include content inherited from other accounts" />
                            </v-container> -->
                            <v-container pa-2 v-if="dateFilterVisible">
                                <help title="Date filters" body="Filter records by providing a relevant date range" keywords="Date Range Filter" />
                                <v-menu :fixed="true" :right="true" :close-on-content-click="false" transition="slide-y-transition" offset-y>
                                    <template v-slot:activator="{ on }">
                                        <v-input class="no-flex">
                                            <v-label>Between Dates</v-label>
                                            <v-btn block v-on="on">
                                                {{readableDate}}
                                                <fluro-icon library="far" icon="angle-down" right />
                                            </v-btn>
                                        </v-input>
                                    </template>
                                    <v-card>
                                        <v-layout>
                                            <v-flex>
                                                <v-card-text>
                                                    <label>&nbsp;</label>
                                                    <v-list dense>
                                                        <v-list-tile @click="selectDatePeriod(option)" v-for="option in datePeriodOptions" :key="option.value">
                                                            {{option.title}}
                                                        </v-list-tile>
                                                    </v-list>
                                                </v-card-text>
                                            </v-flex>
                                            <v-flex>
                                                <v-card-text class="text-sm-center"><label>From Date</label></v-card-text>
                                                <v-date-picker v-model="startDateString" no-title scrollable></v-date-picker>
                                            </v-flex>
                                            <v-flex>
                                                <v-card-text class="text-sm-center"><label>To Date</label></v-card-text>
                                                <v-date-picker v-model="endDateString" no-title scrollable></v-date-picker>
                                            </v-flex>
                                        </v-layout>
                                    </v-card>
                                </v-menu>
                            </v-container>
                            <v-container pa-2>
                                <filter-condition-group :rows="rows" :mini="true" v-model="filterConfig" :type="type" :debounce="filterDebounce" />
                            </v-container>
                        </flex-column-body>
                    </flex-column>
                </v-layout>
                <!-- <fluro-tabset>
                    <fluro-tab :heading="type.plural" :key="type.definitionName" v-for="type in tree">
                        <flex-column-body class="realm-select-item-outer" :class="{'has-selection':selection.length}">
                            <div class="children">
                                <template v-for="realm in type.realms">
                                    <fluro-realm-select-item :item="realm" :check="isSelected" :callback="toggleRealm" />
                                </template>
                            </div>
                        </flex-column-body>
                    </fluro-tab>
        </fluro-tabset>-->
            </flex-column>
            <!-- <flex-column-footer class="border-top" v-if="selector.selection.length">
                <v-container class="py-1 px-2">
                    <v-layout row align-center>
                        <v-flex shrink class="sm muted">
                            {{selector.selection.length}} selected
                        </v-flex>
                        <v-spacer />
                        <v-flex shrink class="text-xs-right">
                            <v-btn class="ma-0" small flat @click="selector.deselectAll()">
                                Deselect all {{selector.selection.length}}
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-container>
      </flex-column-footer>-->
        </template>
    </flex-column>
    <!-- </flex-column> -->
</template>
<script>
import ModalMixin from "../../../mixins/ModalMixin";
import Layout from "../../../mixins/Layout";
import FluroTabset from "../../ui/tabset/FluroTabset.vue";
import FluroTab from "../../ui/tabset/FluroTab.vue";

/////////////////////////////////////////

import FluroDynamicTable from "../../table/FluroDynamicTable.vue";

//Filter columns
import FilterConditionGroup from "../filters/FilterConditionGroup.vue";

/////////////////////////////////////////

import RealmDotCell from "../../table/cells/RealmDotCell.vue";
import DateCell from "../../table/cells/DateCell.vue";
import TitleCell from "../../table/cells/TitleCell.vue";
import StatusCell from "../../table/cells/StatusCell.vue";
import DefinitionCell from "../../table/cells/DefinitionCell.vue";
import ThumbnailCell from "../../table/cells/ThumbnailCell.vue";
import TypeImageCell from "../../table/cells/TypeImageCell.vue";
import EventTitleCell from "../../table/cells/EventTitleCell.vue";

/////////////////////////////////////////

import { FilterService } from "fluro";

/////////////////////////////////////////

import moment from 'moment';

/////////////////////////////////////////

export default {
    created() {
        console.log("MODAL", this);
    },
    props: {
        options: {
            type: Object
        },
        dateFilterPresets: {
            type: Array,
            default () {
                var datePeriodOptions = []

                var day = (1000 * 60 * 60 * 24);
                var week = day * 7;
                var now = new Date();


                //////////////////////////////////////////////////

                datePeriodOptions.push({
                    title: 'Today',
                    startDate: now,
                    endDate: now,
                });

                datePeriodOptions.push({
                    title: 'Past 7 Days',
                    startDate: moment().subtract(7, 'days').toDate(),
                    endDate: now,
                });

                datePeriodOptions.push({
                    title: 'Next 7 Days',
                    startDate: now,
                    endDate: moment().add(7, 'days').toDate(),

                });

                //////////////////////////////////////////////////

                datePeriodOptions.push({
                    title: 'Past 4 Weeks',
                    startDate: moment().subtract(4, 'weeks').toDate(),
                    endDate: now,
                });

                datePeriodOptions.push({
                    title: 'Next 4 Weeks',
                    startDate: now,
                    endDate: moment().add(4, 'weeks').toDate(),

                });

                return datePeriodOptions;
            }
        },
        dateFilterDefault: {
            type: Object,
            default () {
                var now = new Date();
                return {
                    startDate: moment().subtract(4, 'weeks').toDate(),
                    endDate: moment().add(4, 'weeks').toDate(),
                }
            }

        }
    },
    components: {
        FilterConditionGroup,
        FluroTabset,
        FluroTab,
        FluroDynamicTable,
        RealmDotCell,
        DateCell,
        TitleCell,
        StatusCell,
        DefinitionCell,
        ThumbnailCell,
        TypeImageCell,
        EventTitleCell
    },
    mixins: [ModalMixin, Layout],
    // data() {
    //     var self = this;


    //     var datePeriodOptions = self.dateFilterPresets;
    //     var defaultDatePeriod = self.dateFilterDefault;



    //     return {
    //         datePeriodOptions,
    //         rawStartDate: defaultDatePeriod.startDate, //defaultStartDate,
    //         rawEndDate: defaultDatePeriod.endDate, //defaultEndDate,
    //     }
    // },
    data() {


        var self = this;
        var statuses = ["active", "draft"];

        var basicType =
            this.$fluro.types.parentType(this.options.type) || this.options.type;

        /////////////////////////////////////////////

        var dateFilterEnabled;
        var includeArchivedByDefault;

        /////////////////////////////////////////////

        switch (basicType) {
            case "plan":
                dateFilterEnabled = true;
                statuses.push("template");
                break;
            case 'event':
            case 'checkin':
            case 'attendance':
            case 'ticket':
            case 'post':
                includeArchivedByDefault = true;
                dateFilterEnabled = true;
                break;
        }
        /////////////////////////////////////////////

        if (includeArchivedByDefault) {
            statuses.push("archived");
            console.log('Include archived', statuses)
        }

        /////////////////////////////////////////////

        var initialFilter = this.options.filter;

        if (!initialFilter || initialFilter.default) {
            console.log('CREATE INITIAL FILTER')
            initialFilter = {
                operator: "and",
                filters: [{
                    operator: "and",
                    filters: [{
                        key: "status",
                        comparator: "in",
                        values: statuses
                    }]
                }]
            }
        }



        /////////////////////////////////////////////

        // console.log('INITIAL FILTER', this.options.filter, initialFilter);

        var defaultFilter = JSON.parse(JSON.stringify(initialFilter));

        ///////////////////////////////////////

        var datePeriodOptions = self.dateFilterPresets;
        var defaultDatePeriod = self.dateFilterDefault;

        ///////////////////////////////////////

        return {
            sorted: [],
            rows: [],
            search: "",
            searchFocussed: false,
            showFilters: this.$vuetify.breakpoint.smAndUp && this.options.filter ? true : false,
            filterConfig: defaultFilter,
            selector: this.options.selector,
            dateFilterEnabled,
            datePeriodOptions,
            includeArchivedByDefault,
            rawStartDate: defaultDatePeriod.startDate,
            rawEndDate: defaultDatePeriod.endDate,
        };
    },
    methods: {
        stringDate(date) {
            return this.$fluro.date.formatDate(date, 'YYYY-MM-DD');
        },
        selectDatePeriod(period) {
            this.startDate = new Date(period.startDate);
            this.endDate = new Date(period.endDate);

        },
        rowClicked(item) {
            this.selectionManager.toggle(item);
        },
        isSelected(item) {
            return this.selectionManager.isSelected(item);
        },

        //I dont think this is ever used. should probably get rid of it
        toggleRealm(item) {
            return this.selectionManager.toggleRealm(item);
        },
        resetFilter() {
            this.filterConfig = {};
        },
        filteredChanged(rows) {
            this.sorted = rows;
        },
        rowsChanged(rows) {
            this.rows = rows;
        },
        pageChanged(pageNumber) {
            this.$router.push({
                query: Object.assign({}, this.$route.query, { page: pageNumber })
            });
        },
        sortChanged(sortingDetails) {
            this.$router.replace({
                query: Object.assign({}, this.$route.query, sortingDetails)
            });
        }
    },
    computed: {

        dateFilterVisible() {
            return this.dateFilterEnabled; // && (this.viewMode.value != 'calendar');
        },
        readableDate() {

            return this.$fluro.date.readableEventDate({
                startDate: this.startDate,
                endDate: this.endDate,
            }, 'day');
        },
        readableStartDate() {
            return this.$fluro.date.formatDate(this.startDate);
        },
        readableEndDate() {
            return this.$fluro.date.formatDate(this.endDate);
        },
        startDate: {
            get() {
                if (!this.dateFilterEnabled) {
                    return;
                }
                return this.rawStartDate;
            },
            set(value) {

                var date = new Date(value);

                if (this.rawEndDate < date) {
                    this.rawEndDate = new Date(date);
                }

                return this.rawStartDate = new Date(value);
            }
        },
        endDate: {
            get() {
                if (!this.dateFilterEnabled) {
                    return;
                }
                return this.rawEndDate;
            },
            set(value) {

                var date = new Date(value);

                if (this.rawStartDate > date) {
                    this.rawStartDate = new Date(date);
                }

                return this.rawEndDate = new Date(value);
            }
        },
        startDateString: {
            get() {
                return this.stringDate(this.startDate);
            },
            set(value) {
                return this.startDate = new Date(value);
            }
        },
        endDateString: {
            get() {
                return this.stringDate(this.endDate);
            },
            set(value) {
                return this.endDate = new Date(value);
            }
        },
        joins() {
            return this.options.joins;
        },
        retrieveAllDefinitions() {
            return this.options.allDefinitions || this.selector.allDefinitions;
        },
        // filterConfig() {

        //     var basicFilterConfig = this.filterConfig;
        //     var lockedFilter = this.options.lockFilter;

        //     if (lockedFilter) {
        //         return {
        //             operator: 'and',
        //             filters: [basicFilterConfig, lockedFilter],
        //         }
        //     }

        //     return basicFilterConfig;

        // },
        selectionManager() {
            return this.selector;
        },
        filterChangeString() {
            return FilterService.getFilterChangeString(this.filterConfig);
        },
        filterDebounce() {
            if (this.$vuetify.breakpoint.smAndDown) {
                return 1500;
            } else {
                return 700;
            }
        },
        modalTitle() {
            // console.log('SELECTION MANAGER', this.selectionManager)
            var count = this.selectionManager.selection.length;

            if (!count) {
                return this.options.title ?
                    this.options.title :
                    this.selector.maximum == 1 ?
                    `Select ${this.title}` :
                    `Select ${this.plural}`;
            }

            if (count == 1) {
                return `1 ${this.title} selected`;
            }

            return `${count} ${this.plural} selected`;
        },
        type() {
            return this.options.type || "node";
        },
        parentType() {
            var parentType = this.$fluro.types.parentType(this.type);
            return parentType;
        },
        title() {
            return this.$fluro.types.readable(this.type, false);
        },
        plural() {
            return this.$fluro.types.readable(this.type, true);
        },
        selection() {
            return this.selectionManager.selection;
        },
        tree() {
            return this.selectionManager.tree;
        },
        loading() {
            return this.selectionManager.loading;
        },
        ids() {
            return this.$fluro.utils.arrayIDs(this.options.items);
        },
        multiType() {
            var hasSubDefinitions =
                this.parentType == this.type && this.retrieveAllDefinitions;

            /////////////////////////////////////////////

            return hasSubDefinitions;
        },
        columns() {
            var array = [{
                title: "",
                shrink: true,
                align: "center",
                key: "realms",
                renderer: RealmDotCell
            }];

            switch (this.parentType) {
                case "node":
                    array = array.concat([
                        { title: "", key: "_id", renderer: TypeImageCell, shrink: true },
                        { title: "Title", key: "title", renderer: TitleCell, additionalFields: ['firstLine'] }
                    ]);
                    break;
                case "image":
                    array = array.concat([
                        { title: "Thumbnail", key: "_id", renderer: ThumbnailCell },
                        { title: "Title", key: "title", renderer: TitleCell },
                        { title: "Width", key: "width", sortType: "number" },
                        { title: "Height", key: "height", sortType: "number" }
                    ]);
                    break;
                case "video":
                    array = array.concat([
                        { title: "Thumbnail", key: "_id", renderer: ThumbnailCell },
                        { title: "Title", key: "title", renderer: TitleCell },
                        { title: "Source", key: "assetType"},
                    ]);
                    break;
                case "academic":
                    array = array.concat([
                        { title: "Title", key: "title", renderer: TitleCell, additionalFields: ['grades'] }
                    ]);
                    break;
                case "interaction":
                    array = array.concat([{
                            title: "Title",
                            key: "title",
                            renderer: TitleCell,
                            additionalFields: ["contacts", "primaryEmail"]
                        }
                        // { title: 'Contacts', key: 'contacts', renderer: ContactAvatarCell, shrink: true },
                    ]);
                    break;
                    // case 'realm':

                    //        array = array.concat([
                    //                { title: 'Title', key: 'title', renderer: TitleCell, additionalFields: ['contacts', 'primaryEmail'] },
                    //                // { title: 'Contacts', key: 'contacts', renderer: ContactAvatarCell, shrink: true },
                    //        ]);
                    //        break;

                case "event":
                    array = array.concat([
                        { title: "", key: "_id", renderer: TypeImageCell, shrink: true },
                        {
                            title: "Title",
                            key: "title",
                            renderer: EventTitleCell,
                            additionalFields: ["startDate", "endDate", "firstLine"]
                        }
                    ]);
                    break;
                case "plan":
                    array = array.concat([
                        { title: "Title", key: "title", renderer: TitleCell, additionalFields: ['event', 'startDate', 'endDate'] },
                    ]);
                    break;
                case "family":
                    array = array.concat([
                        { title: "Title", key: "title", renderer: TitleCell, additionalFields: ['firstLine'] },
                        { title: "Address", key: "address.addressLine1" }
                    ]);
                    break;
                case "contact":
                    array = array.concat([
                        { title: "", key: "_id", renderer: TypeImageCell, shrink: true },
                        { title: "Title", key: "title", renderer: TitleCell, additionalFields: ['firstName', 'preferredName', 'lastName'] },
                        { title: "Gender", key: "gender" },
                        { title: "Age", key: 'age' },
                    ]);
                    break;
                default:
                    array = array.concat([
                        { title: "Title", key: "title", renderer: TitleCell, additionalFields: ['firstLine'] }
                    ]);
                    break;
            }

            //////////////////////////////////////////////////

            if (this.multiType) {
                array = array.concat([{
                    title: "Definition",
                    key: "definition",
                    shrink: true,
                    renderer: DefinitionCell
                }]);
            }

            //////////////////////////////////////////////////

            array = array.concat([
                { title: "Status", key: "status", shrink: true, renderer: StatusCell },
                {
                    type: "date",
                    title: "Updated",
                    shrink: true,
                    key: "updated",
                    renderer: DateCell,
                    sortType: "date"
                },
                {
                    type: "date",
                    title: "Created",
                    shrink: true,
                    key: "created",
                    renderer: DateCell,
                    sortType: "date"
                }
            ]);

            return array;
        }
    },

    watch: {
        type() {
            this.filterConfig = JSON.parse(JSON.stringify(defaultFilters));
            this.$router.replace({
                query: Object.assign({}, this.$route.query, {
                    filter: JSON.stringify(this.filterConfig)
                })
            });
        },
        filterChangeString() {
            this.$router.replace({
                query: Object.assign({}, this.$route.query, {
                    filter: JSON.stringify(this.filterConfig)
                })
            });
        }
    }
};

</script>
<style lang="scss">
.content-select-modal {
    width: 80vw;
    min-width: 300px;
    max-width: 1200px;
}

</style>
