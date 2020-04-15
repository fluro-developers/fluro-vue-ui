<template>
    <flex-column class="contact-message-list">
        <template v-if="loading">
            <fluro-page-preloader contain />
        </template>
        <template v-else>
            <!-- <flex-column-header>
                <v-container class="border-bottom text-xs-center" style="background: #fff;">
                    <v-btn small @click="create(postType)" v-for="postType in postTypes">
                        Add {{postType.title}}
                        <fluro-icon right icon="plus" />
                    </v-btn>
                </v-container>
            </flex-column-header> -->
            <flex-column-body style="background: #eee;">
                <!-- <v-container> -->
                    <div class="timeline">
                        <div class="year" v-for="year in timeline">
                            <div class="year-label">{{year.date | formatDate('YYYY')}}</div>
                            <div class="month" v-for="month in year.months">
                                <div class="month-label">{{month.date | formatDate('MMM')}}</div>
                                <div class="day" v-for="day in month.days">
                                    <div class="day-label">{{day.date | formatDate('ddd D')}}</div>
                                    <div class="entries">
                                        <div v-for="entry in day.items" :key="entry._id">
                                            <mailout-card :item="entry" v-if="entry._type == 'mailout'" />
                                            <text-message-card :item="entry" v-if="entry._type == 'sms'" />
                                        </div>
                                        <!--  <div @click="$fluro.global.json(entry.data, {title:entry.message, depth:5})" class="entry" v-for="entry in day.items" :key="entry._id">
                                            <v-layout>
                                                <v-flex shrink class="pr-1">
                                                    <fluro-avatar v-if="entry.managedUser" :id="entry.managedUser" type="persona" />
                                                    <fluro-avatar v-if="entry.user" :id="entry.user" type="user" />
                                                </v-flex>
                                                <v-flex>
                                                    <strong>{{entry.message}}</strong>
                                                    <div class="sm muted">{{entry.key}} - {{entry.managedUser ? entry.managedUser.title : ''}}</div>
                                                </v-flex>
                                                <v-flex shrink class="sm muted">
                                                    {{entry.created | formatDate('h:mma')}}
                                                </v-flex>
                                            </v-layout>
                                        </div> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="card" v-for="message in timeline">
                        <mailout-card :item="message" v-if="message._type == 'mailout'" />
                        <text-message-card :item="message" v-if="message._type == 'sms'" />
                    </div> -->
                <!-- </v-container> -->
            </flex-column-body>
        </template>
    </flex-column>
</template>
<script>
export default {
    props: {
        contact: {
            type: Object,
        }
    },
    components: {
        MailoutCard: () => import('./cards/MailoutCard.vue'),
        TextMessageCard: () => import('./cards/TextMessageCard.vue'),
    },
    data() {
        return {
            loading: false,
        }
    },
    computed: {
        timeline() {


            var self = this;
            var array = [];




            array = _.chain(array.concat(self.sms, self.emails))
                .orderBy(function(entry) {
                    return new Date(entry.date);
                })
                .reverse()
                .value();




            return self.$fluro.date.timeline(array, 'date');
        }
    },
    asyncComputed: {
        sms: {
            default: [],
            get() {

                var self = this;
                self.loading = true;

                var contactID = self.$fluro.utils.getStringID(self.contact);
                if (!contactID) {
                    Promise.resolve([])
                    self.loading = false;
                }

                return new Promise(function(resolve, reject) {

                    self.$fluro.api.get(`/contact/${contactID}/sms`).then(function(res) {


                            var mapped = _.map(res.data, function(entry) {
                                entry._type = 'sms';
                                return entry;
                            })



                            resolve(mapped);
                            self.loading = false;
                        })
                        .catch(function(err) {
                            reject(err);
                            self.loading = false;

                        });
                    // https://api.staging.fluro.io/info/checkins?contact=592e50389d9129595a75cc4e
                })
            }
        },
        emails: {
            default: [],
            get() {

                var self = this;
                self.loading = true;

                var contactID = self.$fluro.utils.getStringID(self.contact);
                if (!contactID) {
                    Promise.resolve([])
                    self.loading = false;
                }

                return new Promise(function(resolve, reject) {

                    self.$fluro.api.get(`/info/correspondence?contact=${contactID}`).then(function(res) {
                            var mapped = _.map(res.data, function(entry) {
                                entry._type = 'mailout';
                                return entry;
                            })



                            resolve(mapped);
                            self.loading = false;
                        })
                        .catch(function(err) {
                            reject(err);
                            self.loading = false;

                        });
                    // https://api.staging.fluro.io/info/checkins?contact=592e50389d9129595a75cc4e
                })
            }
        }
    }
}
</script>
<style lang="scss">



// .timeline {
//         background: #f4f4f4;
//         padding-right: 10px;
//         margin:auto;
//         max-width: 960px;

//         .year {
//             border-left: 1px solid rgba(#000, 0.1);
//         }

//         .year-label {
//             font-weight: 500;
//             text-transform: uppercase;
//             display: block;
//             padding: 5px 10px;
//             font-size: 1.4em;
//             background: rgba(#000, 0.1);
//         }

//         .month {
//             border-top: 1px solid rgba(#000, 0.1);
//         }

//         .month-label {
//             font-weight: 500;
//             text-transform: uppercase;
//             display: block;
//             padding: 1px 10px;
//             font-size: 15px;
//             margin: 10px 0;
//             color: rgba(#000, 0.8);
//         }


//         .day {
//             display: flex;
//             margin-top: 10px;
//         }

//         .day-label {
//             font-weight: 600;
//             font-size: 10px;
//             text-transform: uppercase;
//             padding: 5px 10px;
//             border-top: 1px solid rgba(#000, 0.1);
//             width: 60px;
//             white-space: nowrap;
//             color: rgba(#000, 0.3);
//         }

//         .entries {
//             position: relative;
//             top: -10px;
//             background: #fff;
//             box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
//             flex: 1;
//             margin-bottom: 15px;
//             overflow: hidden;;
//         }

//         .entry {
//             padding: 8px;
//             background: #fff;
//             border-top: 1px solid rgba(#000, 0.1);
//             min-width: 320px;
//             cursor: pointer;
//             overflow: hidden;
//             text-overflow: ellipsis;;

//             &:hover {
//                 background: #fafafa;
//             }

//             &:first-child {
//                 border-top: none;
//             }
//         }
//     }



</style>