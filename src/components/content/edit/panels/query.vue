<template>
        <flex-column>
                <template v-if="loading">
                        <fluro-page-preloader contain />
                </template>
                <tabset v-else :justified="true" :vertical="true">
                        <tab heading="Query Details">
                                <slot>
                                        <flex-column-body style="background: #fafafa;">
                                                <v-container>
                                                        <constrain sm>
                                                                <h3 margin>Query Details</h3>
                                                                <!-- <pre>{{model}}</pre> -->
                                                                <div class="grid-list-xl">
                                                                        <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.title" v-model="model"></fluro-content-form-field>
                                                                        <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.firstLine" v-model="model"></fluro-content-form-field>
                                                                </div>
                                                                <fluro-panel v-if="!model.query || model.filterType">
                                                                        <fluro-panel-title>
                                                                                <template v-if="model.disableDataTypeSelect || model._id">
                                                                                        <h4>{{model.filterType | definitionTitle(true)}}</h4>
                                                                                </template>
                                                                                <template v-else>
                                                                                        <fluro-content-form-field :form-fields="formFields" :outline="showOutline" @input="update" :options="options" :field="fieldHash.filterType" v-model="model"></fluro-content-form-field>
                                                                                </template>
                                                                        </fluro-panel-title>
                                                                        <fluro-panel-body>
                                                                                <!-- <pre>{{model.filterConfiguration}}</pre> -->
                                                                                <filter-condition-group :rows="rows" :useSample="true" :mini="true" v-model="model.filterConfiguration" :type="model.filterType" :debounce="filterDebounce" />
                                                                        </fluro-panel-body>
                                                                </fluro-panel>
                                                        </constrain>
                                                </v-container>
                                                <v-container class="border-top">
                                                        <constrain>
                                                                <h3 margin>Columns</h3>
                                                                <column-customiser v-model="model.columns" :sampleData="sample" :config="config" :loadingSample="loadingSample" />
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
                                                        </constrain>
                                                </v-container>
                                        </flex-column-body>
                                </slot>
                        </tab>
                        <tab heading="Automation" v-if="resultSets.length">
                                <!-- <result-set-edit v-model="resultSets" /> -->
                                <slot>
                                        <flex-column-body style="background: #fafafa;">
                                                <v-container>
                                                        <constrain sm>
                                                                <div v-for="resultset in resultSets" :key="resultset._id">
                                                                        <b>{{resultset.title}}</b> {{resultset.firstLine}}
                                                                        <v-btn @click="editResultSet(resultset)">
                                                                                <fluro-icon icon="pencil" />Edit</v-btn>
                                                                </div>
                                                        </constrain>
                                                </v-container>
                                        </flex-column-body>
                                </slot>
                        </tab>
                        <!-- <tab heading="Columns and Rendering">
                <slot>
                    <flex-column-body style="background: #fafafa;">
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
                    <flex-column-body style="background: #fafafa;">
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
                    <flex-column-body style="background: #fafafa;">
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

import FluroContentEditMixin from "../FluroContentEditMixin.js";
import FilterConditionGroup from "../../../form/filters/FilterConditionGroup.vue";
import ColumnCustomiser from "../components/ColumnCustomiser.vue";
// import ResultSetEdit from './resultset.vue'
/////////////////////////////////

import Vue from "vue";
import _ from "lodash";

import { FilterService } from "fluro";

/////////////////////////////////

export default {
        mixins: [FluroContentEditMixin],
        components: {
                FilterConditionGroup,
                ColumnCustomiser
                // ResultSetEdit
        },
        methods: {
                modelUpdated() {
                        this.update(this.model);
                },
                editResultSet(item) {


                    item._type = 'resultset';
                        this.$fluro.global
                                .edit(item, true)
                                .then(function(res) {
                                        _.assign(item, res);
                                })
                                .catch(function() {
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
                                console.log("NO FILTER TYPE");
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
                                        limit: 5
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
                }
        },
        created() {
                var self = this;

                if (!this.model.filterConfiguration) {
                        this.model.filterConfiguration = {};
                }

                self.reloadSample();
        },
        watch: {
                changeString() {
                        var self = this;
                        self.reloadSample();
                }
        },
        asyncComputed: {
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

                                return new Promise(function(resolve, reject) {
                                        self.$fluro.api
                                                .get(`/query/${self.model._id}/resultsets`)
                                                .then(function(res) {
                                                        resolve(res.data);
                                                        // console.log("Found Data", res.data);
                                                        self.loadingResultSets = false;
                                                })
                                                .catch(function(err) {
                                                        reject(err);
                                                        self.loadingResultSets = false;
                                                });
                                });
                        }
                },

                typeOptions: {
                        default: [],
                        get() {
                                var self = this;
                                if (self.model.query) {
                                        return new Promise(function(resolve, reject) {
                                                return reject();
                                        });
                                }
                                return new Promise(function(resolve, reject) {
                                        self.$fluro.types
                                                .terms()
                                                .then(function(res) {
                                                        //Map the types
                                                        var mappedTypeOptions = _.chain(res)
                                                                .map(function(entry, key) {
                                                                        var label = entry.parentType ?
                                                                                `${self.$fluro.types.readable(
                        entry.parentType
                      )} - ${self.$fluro.types.readable(key)}` :
                                                                                `${self.$fluro.types.readable(key)}`;

                                                                        return {
                                                                                name: label,
                                                                                value: key,
                                                                                parentType: entry.parentType
                                                                        };
                                                                })
                                                                .orderBy("name")
                                                                .values()
                                                                .value();

                                                        mappedTypeOptions.unshift({
                                                                name: "Anything",
                                                                key: "node",
                                                                value: "node"
                                                        });

                                                        // console.log('MAPPED TYPES', mappedTypeOptions)
                                                        //Resolve the array
                                                        resolve(mappedTypeOptions);
                                                })
                                                .catch(function(err) {
                                                        reject(err);
                                                });
                                });
                        }
                }
        },
        computed: {
                rows() {
                        return [];
                },
                showOutline() {
                        return false; //true; //false;//true;//false;//true;
                },

                fieldsOutput() {
                        var self = this;
                        var array = [];

                        ///////////////////////////////////

                        addField("title", {
                                title: "Title",
                                minimum: 1,
                                maximum: 1,
                                type: "string",
                                placeholder: "Eg. My Awesome List",
                                params:{
                                    autofocus:!self.model._id,
                                }
                        });

                        addField("firstLine", {
                                title: "Description",
                                minimum: 0,
                                maximum: 1,
                                type: "string",
                                placeholder: "Eg. A list of my favorite people"
                        });

                        // console.log('TYPE OPTIONS', self.typeOptions);

                        addField("filterType", {
                                title: "Type",
                                minimum: 0,
                                maximum: 1,
                                type: "string",
                                directive: "select",
                                description: "The type of item you want to return from this query",
                                options: self.typeOptions
                        });

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
                        var filterString = FilterService.getFilterChangeString(
                                self.model.filterConfiguration
                        );

                        // console.log('Filter configuration changed', filterString)
                        return filterString;
                }
        },
        data() {
                return {
                        loadingResultSets: true,
                        sample: [],
                        loadingSample: false,
                        filterDebounce: 500
                };
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
