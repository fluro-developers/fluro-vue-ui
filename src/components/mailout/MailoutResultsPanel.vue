<template>
    <flex-column>
        <flex-column-body style="background: #fafafa;">
            <v-container>
                <constrain sm>
                    <wrapper xs>
                        <h2>{{item.subject}}</h2>
                        <div class="muted"><strong><span class="text-capitalize">{{item.mailoutType}}</span> mailout sent from {{item.fromEmail}}</strong></div>
                        <div><strong>{{emails.length}} Recipients in total</strong></div>
                    </wrapper>
                    <wrapper xs>
                        <v-layout row wrap>
                            <v-flex xs12 sm6>
                                <div class="stat-box">
                                    <label>Clicked</label>
                                    <h3>
                                        {{emailsClicked.length}}
                                    </h3>
                                </div>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <div class="stat-box ">
                                    <label>Opened</label>
                                    <h3>
                                        {{emailsOpened.length}}
                                    </h3>
                                </div>
                            </v-flex>
                            <v-flex xs12 sm4 v-if="emailsErrored.length">
                                <div class="stat-box ">
                                    <label>Failed</label>
                                    <h3>
                                        {{emailsErrored.length}}
                                    </h3>
                                </div>
                            </v-flex>
                        </v-layout>
                    </wrapper>
                    <wrapper xs class="text-xs-center" v-if="!emailsLoaded">
                        <v-progress-circular indeterminate/>
                    </wrapper>
                    <template v-else>
                        <wrapper xs class="border-top">
                            <v-container grid-list-xl pa-0>
                                <v-layout row wrap>
                                    <v-flex xs12 sm6>
                                        <h4>{{clickPercentage}}% Click Rate</h4>
                                        <v-progress-linear :value="clickPercentage" />
                                    </v-flex>
                                    <v-flex xs12 sm6>
                                        <h4>{{openPercentage}}% Open Rate</h4>
                                        <v-progress-linear :value="openPercentage" />
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </wrapper>
                        <fluro-panel v-if="urls.length">
                            <fluro-panel-title>
                                Top Links
                            </fluro-panel-title>
                            <div>
                                <a class="row-item" :href="url.url" target="_blank" v-for="url in urls">
                                    <v-layout align-center>
                                        <v-flex class="small">{{url.url}}</v-flex>
                                        <div><strong>{{url.count}}</strong> clicks <span class="muted">({{url.percent}}%)</span></div>
                                    </v-layout>
                                </a>
                            </div>
                        </fluro-panel>
                        <fluro-panel>
                            <fluro-panel-body class="border-bottom">
                                <v-layout>
                                    <v-flex>
                                        <search-input v-model="search" />
                                    </v-flex>
                                    <div>
                                        <v-btn @click="push()" color="primary" class="ma-0 ml-2">Push
                                            <fluro-icon icon="plus" right />
                                        </v-btn>
                                    </div>
                                </v-layout>
                            </fluro-panel-body>
                            <div style="background: #fafafa">
                                <tabset>
                                    <tab :heading="`${segment.emails.length} ${segment.title}`" v-for="segment in segments">
                                        <fluro-table trackingKey="correspondenceID" defaultSort="firstName" :pageSize="25" style="max-height:50vh;" :items="segment.emails" :columns="columns" />
                                    </tab>
                                </tabset>
                            </div>
                        </fluro-panel>
                    </template>
                </constrain>
            </v-container>
        </flex-column-body>
    </flex-column>
</template>
<script>

import Vue from 'vue';

import CorrespondenceInfoModal from 'src/components/mailout/CorrespondenceInfoModal.vue';
import MailoutPushModal from 'src/components/mailout/MailoutPushModal.vue';
import MailoutRenderPreview from 'src/components/mailout/MailoutRenderPreview.vue';
import MailoutTestPanel from 'src/components/mailout/MailoutTestPanel.vue';
import SearchInput from 'src/components/ui/SearchInput.vue';
import StatusCell from 'src/components/table/cells/StatusCell.vue';
import AvatarCell from 'src/components/table/cells/AvatarCell.vue';
import FluroTable from 'src/components/table/FluroTable.vue';




let InfoCell = Vue.extend({
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
    methods: {
        info() {
            this.$fluro.modal({
                component:CorrespondenceInfoModal,
                options: {
                    item: this.row,
                }
            })
        }
    },
    template: `<v-btn class="ma-0" small @click="info">
   Info
    </v-btn>`,
});

export default {
    components: {
        SearchInput,
        FluroTable,
    },
    props: {
        value: {
            type: Object,
            required: true,
        },
    },
    methods: {
        push() {
            var self = this;

            self.$fluro.modal({
                    component: MailoutPushModal,
                    options: {
                        item: self.item,
                    }
                })
                .then(function(res) {
                    self.loadCorrespondenceResults();
                })
        },
        checkIfResultsAreNeeded() {
            if (this.resultsEnabled) {
                this.startResultsPoll();
            } else {
                this.stopResultsPoll();
            }
        },
        startResultsPoll() {
            console.log('START POLLING')
            this.stopResultsPoll();
            this.loadCorrespondenceResults();
            this.pollTimer = setInterval(this.loadCorrespondenceResults, this.resultsInterval);
        },
        stopResultsPoll() {
            if (this.pollTimer) {
                clearInterval(this.pollTimer);
            }
        },
        loadCorrespondenceResults() {
            console.log('load results');

            var self = this;

            if (self.polling) {
                return;
            }

            //////////////////////////////////

            self.polling = true;
            self.$fluro.api.get(`/mailout/${this.item._id}/correspondence`, {
                    params: {
                        timestamp: new Date(),
                    }
                })
                .then(function(res) {
                    self.emailsLoaded = true;
                    self.emails = _.map(res.data, function(email) {
                        // console.log('EMAIL', email);


                        email.correspondenceID = email._id;
                        email._id = email.contact;
                        email._type = 'contact';

                        return email;

                    });
                    self.polling = false;
                })
                .catch(function(err) {
                    self.polling = false;
                })
        },
    },
    watch: {
        'resultsEnabled': function() {
            this.checkIfResultsAreNeeded();
        },
    },
    mounted() {
        this.checkIfResultsAreNeeded();
    },
    activated() {
        this.checkIfResultsAreNeeded();
    },
    deactivated() {
        this.stopResultsPoll();
    },
    beforeDestroy() {
        this.stopResultsPoll();
    },
    computed: {
        resultsInterval() {
            // return 1000

            var now = new Date();
            var when = new Date(this.item.publishDate);

            // if ((now - when) < (86400 * 1000)) {
                return 5000;
            // } else {
            //     return 60000
            // }


            return value;
        },
        urls() {

            var self = this;


            /////////////////////////////////////////////////////

            function removeURLParameter(url, parameter) {
                //prefer to use l.search if you have a location/link object
                var urlparts = url.split('?');
                if (urlparts.length >= 2) {

                    var prefix = encodeURIComponent(parameter) + '=';
                    var pars = urlparts[1].split(/[&;]/g);

                    //reverse iteration as may be destructive
                    for (var i = pars.length; i-- > 0;) {
                        //idiom for string.startsWith
                        if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                            pars.splice(i, 1);
                        }
                    }

                    url = urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : "");
                    return url;
                } else {
                    return url;
                }
            }


            /////////////////////////////////////////////////////

            return _.chain(self.emailsClicked)
                .map(function(item) {
                    return item.trackedEvents
                })
                .flatten()
                .filter(function(event) {
                    return (event.type == 'click' || event.type == 'clicked');
                })
                .reduce(function(resultSet, event) {
                    var eventURL = removeURLParameter(event.url, 'correspondence');

                    var existing = _.find(resultSet, {
                        url: eventURL
                    });

                    if (!existing) {
                        existing = {
                            url: eventURL,
                            count: 1
                        }
                        resultSet.push(existing);
                    } else {
                        existing.count++;
                    }

                    return resultSet;

                }, [])
                .sortBy(function(link) {
                    return -link.count;
                })
                .map(function(link) {

                    link.percent = Math.ceil(link.count / self.emails.length * 100)
                    return link;
                })
                .value();
        },
        clickPercentage() {
            var total = this.emails.length;
            var count = this.emailsClicked.length
            return Math.ceil(count / total * 100);
        },
        openPercentage() {
            var total = this.emails.length;
            var count = this.emailsOpened.length
            return Math.ceil(count / total * 100);
        },
        segments() {
            var self = this;

            var filtered = self.emails;

            /////////////////////////////////////////

            if (self.search && self.search.length) {

                var searchKeywords = self.search.toLowerCase();
                filtered = _.filter(filtered, function(email) {
                    var title = `${email.firstName} ${email.lastName}`.toLowerCase();
                    return title.includes(searchKeywords);
                })
            }

            /////////////////////////////////////////

            return _.chain(filtered)
                .reduce(function(set, email) {

                    var stateName = email.state;
                    switch (stateName) {
                        case 'open':
                            stateName = 'Opened';
                            break;
                        case 'click':
                            stateName = 'Clicked';
                            break;
                        case 'sent':
                            stateName = 'Unopened';
                            break;
                        default:
                            stateName = _.startCase(stateName);
                            break;
                    }

                    var existing = set[stateName];
                    if (!existing) {
                        existing = set[stateName] = {
                            title: stateName,
                            emails: [],
                        }
                    }

                    existing.emails.push(email);

                    return set;
                }, {})
                .orderBy(function(set) {
                    return set.title;
                })
                .values();
        },
        emailsClicked() {
            var self = this;
            return _.filter(self.emails, function(email) {
                return email.state == 'click';
            })
        },
        emailsOpened() {
            var self = this;
            return _.filter(self.emails, function(email) {
                return (email.state == 'click' || email.state == 'open');
            })
        },
        emailsErrored() {
            var self = this;
            return _.filter(self.emails, function(email) {
                return email.state == 'error';
            })
        },
        resultsEnabled() {

            var self = this;

            if (self.item.state == 'sent') {
                return true;
            }

            if (self.item.stats && self.item.stats.mailoutSent) {
                return true;
            }
        },
    },
    data() {
        return {
            emailsLoaded:false,
            search: '',
            columns: [{
                    title: '',
                    key: '_id',
                    renderer: AvatarCell,
                },
                {
                    title: 'First Name',
                    key: 'firstName',
                },
                {
                    title: 'Last Name',
                    key: 'lastName',
                },
                {
                    title: 'Email Address',
                    key: 'email',
                },
                {
                    title: 'State',
                    key: 'state',
                    renderer: StatusCell,
                },
                {
                    title: 'Info',
                    key: 'correspondenceID',
                    renderer: InfoCell,
                },
            ],
            emails: [],
            polling: false,
            item: this.value,
        }
    },
}
</script>
<style lang="scss" scoped>
.row-item {
    display: block;
    padding: 10px;
    @extend .border-bottom !optional;
    color: inherit;
    text-decoration: none;

    &:hover {
        background: #fafafa;
    }
}

.search {}

.stat-box {
    padding: 10px;
    border: 1px solid rgba(#000, 0.1);
    border-radius: 3px;
    text-align: center;
    margin: 2px;
    background: linear-gradient(#fff, #fafafa);


    label {
        text-transform: uppercase;
        ;
        font-weight: 500;
        font-size: 10px;
        opacity: 0.5;
        letter-spacing: 0.05em;
    }

    h3 {
        font-size: 40px;
        display: block;
        line-height: 50px;
    }
}
</style>