<template>
    <div>
        <fluro-page-preloader v-if="loading" contain />
        <fluro-panel>
            <fluro-panel-title>
                <h5>Guest List</h5>
            </fluro-panel-title>
            <fluro-panel-body class="border-bottom">
                <v-layout>
                    <v-flex>
                        <search-input v-model="search" />
                    </v-flex>
                    <!-- <div> -->
                    <!-- <v-btn @click="push()" color="primary" class="ma-0 ml-2">Push -->
                    <!-- <fluro-icon icon="plus" right /> -->
                    <!-- </v-btn> -->
                    <!-- </div> -->
                </v-layout>
            </fluro-panel-body>
            <tabset :justified="true">
                <tab :heading="`${segment.contacts.length} ${segment.title}`" :key="segment.key" v-for="segment in segments">
                    <!-- v-if="segments.length <= 1" -->
                    <v-container pa-2 class="border-bottom">
                        <v-layout align-center>
                            <v-flex>
                                <h4>{{segment.contacts.length}} {{segment.title}}</h4>
                            </v-flex>
                            <v-flex shrink>
                                <v-btn class="ma-0" small color="primary" :loading="exporting" @click="exportItems(segment)">
                                    Export {{segment.title}}
                                    <fluro-icon right library="fas" icon="share" />
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <fluro-table trackingKey="_id" defaultSort="firstName" :pageSize="35" style="max-height:50vh;" :items="segment.contacts" :columns="columns" />
                </tab>
            </tabset>
        </fluro-panel>
    </div>
</template>
<script>
import SearchInput from '../../ui/SearchInput.vue';
import AvatarCell from '../../table/cells/AvatarCell.vue';
import FluroTable from '../../table/FluroTable.vue';
import _ from 'lodash';


export default {
    components: {
        SearchInput,
        AvatarCell,
        FluroTable,
    },
    props: {
        event: {
            type: [Object, String],
        }
    },
    watch: {
        search: _.debounce(function(v) {
            this.debouncedSearch = v;
        }, 300),
    },
    data() {
        return {
            exporting: false,
            search: '',
            debouncedSearch: '',
            loading: true,
            columns: [{
                    title: '',
                    key: '_id',
                    renderer: AvatarCell,
                    align: 'center',
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
                    title: 'Age',
                    key: 'age',
                },
                {
                    title: 'Gender',
                    key: 'gender',
                },
                // {
                //     title: 'State',
                //     key: 'state',
                //     renderer: StatusCell,
                // },
                // {
                //     title: 'Info',
                //     key: 'correspondenceID',
                //     renderer: InfoCell,
                // },
            ],
        }
    },
    computed: {
        filtered() {
            var self = this;
            var filtered = self.guests;

            if (self.debouncedSearch && self.debouncedSearch.length) {
                filtered = _.filter(filtered, function(item) {
                    return _.includes(item.searchString, self.debouncedSearch);
                })
            }

            return filtered;
        },
        segments() {
            return _.chain(this.filtered)
                .reduce(function(set, guest) {

                    if (guest.attendance.guestExpected) {
                        set['expected'].contacts.push(guest);
                    }

                    if (guest.attendance.guestConfirmed) {
                        set['confirmed'].contacts.push(guest);
                    }

                    

                    if (guest.attendance.ticket) {
                        set['ticket'].contacts.push(guest);
                    }

                    if (guest.attendance.guestDeclined) {
                        set['declined'].contacts.push(guest);
                        return set;
                    }

                    if (guest.attendance.checkin ) {
                        set['checkin'].contacts.push(guest);
                    } else {
                        set['absent'].contacts.push(guest);
                    }

                    return set;
                }, {


                    expected: {
                        title: 'Expected',
                        contacts: []
                    },
                    confirmed: {
                        title: 'RSVP Yes',
                        contacts: []
                    },
                    declined: {
                        title: 'RSVP No',
                        contacts: []
                    },
                    ticket: {
                        title: 'Ticket Holders',
                        contacts: []
                    },
                    checkin: {
                        title: 'Checked In',
                        contacts: []
                    },
                    absent: {
                        title: 'Not Checked In',
                        contacts: []
                    },
                })
                .map(function(segment, key) {
                    segment.key = key;
                    return segment;
                })
                .filter(function(segment) {
                    return segment.contacts.length;
                })
                .value();
        },
        eventID() {
            return this.$fluro.utils.getStringID(this.event);
        },
    },
    methods: {
        // exportItems(segment) {

        //     var self = this;
        //     self.exporting = true;
        //     console.log('SIGMENT', segment);
        // },
        exportItems(segment) {

            console.log('SIGMENT', segment);

            var self = this;
            self.exporting = true;


            var eventID = self.$fluro.utils.getStringID(self.event);
            var url = `/event/${this.eventID}/guestlist/${segment.key}/csv`;

            self.$fluro.api
                .get(url, { cache: false })
                .then(function(res) {
                    self.$fluro.notify(
                        "Your popup blocker may stop this file from downloading"
                    );

                    var token = self.$fluro.auth.getCurrentToken();
                    var downloadURL = self.$fluro.api.defaults.baseURL + res.data.download;

                    if (process.browser) {
                        if (token) {
                            window.open(downloadURL + "?access_token=" + token);
                        } else {
                            window.open(downloadURL);
                        }
                    }

                    self.exporting = false;
                })
                .catch(function(err) {
                    self.$fluro.error(err);
                    self.exporting = false;
                });
        }
    },
    asyncComputed: {
        guests: {
            default: [],
            get() {
                var self = this;
                self.loading = true;

                return new Promise(function(resolve, reject) {

                    return self.$fluro.api.get(`/event/${self.eventID}/guestlist`).then(function(res) {

                            var results = _.map(res.data, function(item) {
                                item.searchString = String(`${item.title} ${item.firstName} ${item.lastName} ${item.preferredName} ${item.lastName} ${item.age} ${item.gender}`).toLowerCase()
                                return item;
                            });

                            resolve(results);
                            self.loading = false;

                        })
                        .catch(function(err) {
                            reject(err);
                            self.loading = false;
                        });
                })
            },
        },
    },
}

</script>
<style lang="scss">
</style>
