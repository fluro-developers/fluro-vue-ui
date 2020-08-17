<template>
    <flex-column>
        <template v-if="loading">
            <fluro-page-preloader contain />
        </template>
        <template v-else>
            <!-- :vertical="true" -->
            <tabset :justified="true" :vertical="true">
                <tab heading="Results">
                    <fluro-table :showFooter="true" trackingKey="_id" :pageSize="100" :items="results" :columns="columns" />
                </tab>
                <tab heading="Feeds">
                    <flex-column-body style="background: #fafafa;">
                        <v-container fluid>
                            <constrain sm>
                             <h3 margin>Feed URLs</h3>
                                <v-btn large block :href="jsonURL" target="_blank">
                                    JSON API Feed
                                    <fluro-icon right icon="brackets-curly" />
                                </v-btn>
                                <v-btn large block @click="exportCSV()" :loading="exporting">
                                    Export CSV
                                    <fluro-icon right icon="file-csv" />
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
                <tab :heading="`History`" v-if="resultSetsData.length">
                    <flex-column-body style="background: #fafafa;">
                        <div v-for="dataset in resultSetsData" v-bind:key="dataset._id">
                            <v-container fluid>
                                <constrain sm>
                                    <h3 margin>{{dataset.title}} - Details</h3>
                                    <div class="timeline">
                                        <div class="timeline-year" v-for="year in dataset.historicaltimeline" v-bind:key="year.date">
                                            <h4 class="year-title">{{year.date | formatDate('YYYY')}}</h4>
                                            <div>
                                                <div class="timeline-month" v-for="month in year.months" v-bind:key="month.date">
                                                    <div class="timeline-line"></div>
                                                    <h5 class="month-title">{{month.date | formatDate('MMM')}}</h5>
                                                    <div class="timeline-day" v-for="day in month.days" v-bind:key="day.date">
                                                        <div class="row no-gutters">
                                                            <div class="xs-2">
                                                                <div class="date-label-outer">
                                                                    <div class="date-label">
                                                                        {{day.date | formatDate('ddd D')}}
                                                                        <div class="tiny text-muted" ng-if="$index == 0">{{day.date | timeago}}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="xs-10">
                                                                <div class="day-events">
                                                                    <a :href="entry.link" target="_blank" v-for="entry in day.items" class="timeline-event" v-bind:key="entry._id">
                                                                        <!-- <pre>{{entry | json}}</pre> -->
                                                                        <!-- <div class="color-block" style="background-color: {{realm.bgColor}}" ng-repeat="realm in card.realms"></div> -->
                                                                        <span class="float-right">
                                                                            <fluro-icon icon="download" />
                                                                        </span>
                                                                        <h5>
                                                                            <fluro-icon icon="file-alt" />
                                                                            {{entry.date | formatDate('h:mma dddd D MMM YYYY')}}
                                                                        </h5>
                                                                        <em class="text-muted small">Export generated {{entry.date | timeago}}</em>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
        }
    },
    components: {
        FluroTable,
        RealmDotCell,
        TitleCell,
        DefinitionCell
    },
    mixins: [FluroContentViewMixin],
    methods: {
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
                return new Promise(function(resolve, reject) {
                    self.$fluro.content
                        .query(self.item, {})
                        .then(function(result) {
                            resolve(result);
                            self.loading = false;
                        })
                        .catch(reject);
                });
            }
        },
        resultSetsData: {
            default: [],
            get() {
                var self = this;
                self.loadingResultSetData = true;
                console.log("Self.item", self.item);
                return new Promise(function(resolve, reject) {
                    self.$fluro.api
                        .get(
                            `/query/${self.$fluro.utils.getStringID(
                self.item
              )}/resultsets/metadata`, {}
                        )
                        .then(function(result) {
                            var returnData = _.map(result.data, function(entry) {
                                entry.historicaltimeline = self.$fluro.date.timeline(
                                    entry.data,
                                    "date"
                                );
                                return entry;
                            });
                            resolve(returnData);
                            self.loadingResultSetData = false;
                            console.log("returndata", returnData);
                        })
                        .catch(reject);
                });
            }
        }
    },
    computed: {

        jsonURL() {
            if (!this.item._id) {
                return;
            }

            var url = this.$fluro.api.generateEndpointURL(`/content/_query/${this.item._id}`, {
                noCache: true,
            })

            return url;
        },



        podcastURL() {
            if (!this.item._id) {
                return;
            }

            var params = {
                noCache: true,
                template: '57d8cbe4e17968d83736c6df',
                limit:100,
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
            loading: true,
            exporting: false,
            loadingResultSetData: true
        };
    }
};

</script>
<style scoped lang="scss">
.timeline .timeline-month:first-child,
.tooltip-block .tooltip-roster:first-child {
    border-top: none;
}

.dateselect,
.list-item,
.map-outer,
.timeline .timeline-month {
    position: relative;
}

.timeline .timeline-year .year-title {
    padding: 8px 10px;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 2px;
    margin: 0;
}

.timeline .timeline-month {
    padding: 20px 0;
}

.timeline .timeline-month .timeline-line {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 1px;
    background: rgba(0, 0, 0, 0.1);
    z-index: 0;
}

.timeline .timeline-month .month-title {
    text-transform: uppercase;
    opacity: 0.8;
    margin-top: 2px;
    padding: 10px;
}

.timeline .timeline-day .day-events {
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
}

.timeline .timeline-event {
    padding: 10px 15px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    position: relative;
    display: block;
}

.timeline .timeline-event .icon {
    position: absolute;
    left: -107px;
    top: 2px;
    border-radius: 50%;
    background: #fff;
    border: 1px solid #ddd;
    height: 20px;
    width: 20px;
    line-height: 20px;
    z-index: 10;
    text-align: center;
    font-size: 10px;
}

.timeline .timeline-event h5 {
    margin: 0;
}

.timeline a.timeline-event:hover {
    color: inherit;
    opacity: 0.9;
}

.timeline .date-label-outer {
    margin-top: 10px;
    position: relative;
    z-index: 2;
}

.timeline .date-label {
    font-size: 0.7em;
    padding: 0 10px;
    height: 18px;
    line-height: 18px;
    display: block;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
}

</style>
