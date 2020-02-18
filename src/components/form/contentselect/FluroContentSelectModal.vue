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
                                    <fluro-icon left :type="type" /> {{modalTitle}}</h5>
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
                        <v-flex shrink v-if="$vuetify.breakpoint.smAndUp">
                            <v-btn icon small class="my-0" @click="showFilters = !showFilters">
                                <fluro-icon icon="filter" />
                            </v-btn>
                        </v-flex>
                        <v-flex shrink>
                            <v-btn color="primary" small class="my-0 mr-0" @click="close(selector.selection)">
                                Done
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-container>
            </flex-column-header>
            <flex-column>
                <!-- v-show="$vuetify.breakpoint.smAndUp || !showFilters" -->
                <v-layout fill-height>
                    <flex-column style="min-height:50vh;">
                        <!-- :init-page="$route.query.page"  :init-sort="{sortKey:$route.query.sortKey, sortDirection:$route.query.sortDirection, sortType:$route.query.sortType}" @raw="rowsChanged" @filtered="filteredChanged" @page="pageChanged" @sort="sortChanged"  -->
                        <fluro-dynamic-table :queryString="false" :enable-actions="false" :allDefinitions="retrieveAllDefinitions" :searchInheritable="options.searchInheritable" :filter-config="computedFilterConfig" :selection-controller="selector" :clicked="rowClicked" :search="search" :data-type="type" :columns="columns" @raw="rowsChanged" @filtered="filteredChanged" @page="pageChanged" @sort="sortChanged" />
                    </flex-column>
                    <div class="filter-sidebar scroll-y" v-show="showFilters">
                        <div>
                            <v-container pa-2>
                                <div class="search" :class="{active:searchFocussed || search.length}">
                                    <input v-model="search" @focus="searchFocussed = true" @blur="searchFocussed = false" placeholder="Keyword search" />
                                    <div class="search-icon" @click="search = ''">
                                        <fluro-icon icon="times" v-if="search.length" />
                                        <fluro-icon icon="search" v-else />
                                    </div>
                                </div>
                            </v-container>
                            <filter-condition-group :rows="rows" :mini="true" v-model="filterConfig" :type="type" :debounce="filterDebounce" />
                        </div>
                    </div>
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
                </fluro-tabset> -->
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
            </flex-column-footer> -->
        </template>
    </flex-column>
    <!-- </flex-column> -->
</template>
<script>
import ModalMixin from '../../../mixins/ModalMixin';
import Layout from '../../../mixins/Layout';
import FluroTabset from '../../ui/tabset/FluroTabset.vue';
import FluroTab from '../../ui/tabset/FluroTab.vue';


/////////////////////////////////////////

import FluroDynamicTable from '../../table/FluroDynamicTable.vue';

//Filter Stuff
import FilterConditionGroup from '../filters/FilterConditionGroup.vue';


/////////////////////////////////////////

import RealmDotCell from '../../table/cells/RealmDotCell.vue';
import DateCell from '../../table/cells/DateCell.vue';
import TitleCell from '../../table/cells/TitleCell.vue';
import StatusCell from '../../table/cells/StatusCell.vue';
import DefinitionCell from '../../table/cells/DefinitionCell.vue';
import ThumbnailCell from '../../table/cells/ThumbnailCell.vue';
import TypeImageCell from '../../table/cells/TypeImageCell.vue';

/////////////////////////////////////////

import { FilterService } from 'fluro';


/////////////////////////////////////////

import Vue from 'vue';
let EventTitleCell = Vue.extend({
    props: {
        'row': {
            type: Object,
        },
        'column': {
            type: Object,
        },
        'data': {
            // type: Object,
        },
    },
    template: `
    <div >
        <strong>{{row.title}}</strong>
        <div>
            <em class="text-muted small">{{row | readableEventDate}}</em>
            <div v-if="row.firstLine" ><em class="text-muted small">{{row.firstLine | limit(100)}}</em> </div>
            <div v-if="row.rooms && row.rooms.length"  class="text-muted small" ><strong>Rooms:</strong> <em>{{row.rooms | comma('title')}}</em></div>
        </div>

       
    </div>`,
});


/////////////////////////////////////////

export default {
    props: {
        options: {
            type: Object
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
    },
    mixins: [ModalMixin, Layout],
    data() {


        var statuses = ['active', 'draft'];

        var basicType = this.$fluro.types.parentType(this.options.type) || this.options.type;
        switch (basicType) {
            case 'plan':
                statuses.push('template')
                break;
        }

        console.log('PLAN STATUSES', basicType, statuses)

        var initialFilter = this.options.filter || {
            operator: 'and',
            filters: [{
                operator: 'and',
                filters: [{
                    key: 'status',
                    comparator: 'in',
                    values: statuses,
                }]
            }]
        }

        /////////////////////////////////////////////

        console.log('INITIAL FILTER', this.options.filter, initialFilter);

        var defaultFilter = JSON.parse(JSON.stringify(initialFilter));

        ///////////////////////////////////////

        return {
            sorted: [],
            rows: [],
            search: '',
            searchFocussed: false,
            showFilters: false,
            filterConfig: defaultFilter,
            selector: this.options.selector,
        }
    },
    methods: {
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
            this.filterConfig = {}
        },
        filteredChanged(rows) {
            this.sorted = rows;
        },
        rowsChanged(rows) {
            this.rows = rows;
        },
        pageChanged(pageNumber) {
            this.$router.push({ query: Object.assign({}, this.$route.query, { page: pageNumber }) });
        },
        sortChanged(sortingDetails) {
            this.$router.replace({ query: Object.assign({}, this.$route.query, sortingDetails) });
        },
    },
    computed: {
        retrieveAllDefinitions() {
            return this.options.allDefinitions || this.selector.allDefinitions
        },
        computedFilterConfig() {

            var basicFilterConfig = this.filterConfig;
            var lockedFilter = this.options.lockFilter;

            if (lockedFilter) {
                return {
                    operator: 'and',
                    filters: [basicFilterConfig, lockedFilter],
                }
            }

            return basicFilterConfig;


        },
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
                return 700
            }
        },
        modalTitle() {
            var count = this.selectionManager.selection.length;

            if (!count) {
                return this.options.title ? this.options.title : (this.selector.maximum == 1 ? `Select ${this.title}` : `Select ${this.plural}`);
            }

            if (count == 1) {
                return `1 ${this.title} selected`
            }


            return `${count} ${this.plural} selected`

        },
        type() {
            return this.options.type || 'node';
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
        columns() {

            var array = [
                { title: '', shrink: true, align: "center", key: 'realms', renderer: RealmDotCell },

            ];

            switch (this.parentType) {
                case 'node':
                    array = array.concat([
                        { title: '', key: '_id', renderer: TypeImageCell, shrink: true },
                        { title: 'Title', key: 'title', renderer: TitleCell },
                    ]);
                    break;
                case 'image':
                    array = array.concat([
                        { title: 'Thumbnail', key: '_id', renderer: ThumbnailCell },
                        { title: 'Title', key: 'title', renderer: TitleCell },
                        { title: 'Width', key: 'width', sortType: 'number' },
                        { title: 'Height', key: 'height', sortType: 'number' },
                    ]);
                    break;
                case 'event':
                    array = array.concat([
                        { title: '', key: '_id', renderer: TypeImageCell, shrink: true },
                        { title: 'Title', key: 'title', renderer: EventTitleCell, additionalFields: ['startDate', 'endDate', 'firstLine'] },

                    ]);
                    break;
                default:
                    array = array.concat([
                        { title: 'Title', key: 'title', renderer: TitleCell },
                    ]);
                    break;
            }


            array = array.concat([
                { title: 'Definition', key: 'definition', shrink: true, renderer: DefinitionCell },
                { title: 'Status', key: 'status', shrink: true, renderer: StatusCell },
                { type: 'date', title: 'Updated', shrink: true, key: 'updated', renderer: DateCell, sortType: 'date' },
                { type: 'date', title: 'Created', shrink: true, key: 'created', renderer: DateCell, sortType: 'date' },
            ])


            return array;
        }
    },

    watch: {
        type() {
            this.filterConfig = JSON.parse(JSON.stringify(defaultFilters))
            this.$router.replace({ query: Object.assign({}, this.$route.query, { filter: JSON.stringify(this.filterConfig) }) });
        },
        filterChangeString() {
            this.$router.replace({ query: Object.assign({}, this.$route.query, { filter: JSON.stringify(this.filterConfig) }) });
        }
    },
}
</script>
<style lang="scss">
.content-select-modal {
    width: 80vw;
    min-width: 300px;
    max-width: 1200px;
}
</style>