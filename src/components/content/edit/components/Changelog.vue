<template>
    <flex-column class="log-viewer" style="background: #fff">
        <flex-column-header>
            <v-container pa-1 class="border-bottom">
                <strong>Historical Change Log</strong>
            </v-container>
        </flex-column-header>
        <flex-column-body>
            <v-container class="text-xs-center" v-if="loading">
                <v-progress-circular indeterminate />
            </v-container>
            <div class="timeline" v-else>
                <div class="year" v-for="year in dates">
                    <div class="year-label">{{year.date | formatDate('YYYY')}}</div>
                    <div class="month" v-for="month in year.months">
                        <div class="month-label">{{month.date | formatDate('MMM')}}</div>
                        <div class="day" v-for="day in month.days">
                            <div class="day-label">{{day.date | formatDate('ddd D')}}</div>
                            <div class="entries">
                                <div @click="$fluro.global.json(entry.data, {title:entry.message, depth:5})" class="entry" v-for="entry in day.items" :key="entry._id">
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
                                </div>
                                <!-- <slot name="card" v-for="entry in day.items" :entry="entry"></slot> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </flex-column-body>
    </flex-column>
</template>
<script>
export default {
    props: {
        item: {
            type: [Object, String],
            required: true,
        }
    },
    data() {
        return {
            loading: false,
        }
    },
    computed: {
        itemID() {
            return this.$fluro.utils.getStringID(this.item);
        },
        dates() {
            // console.log('Get dates')
            return this.$fluro.date.timeline(this.log, 'created');
        },
    },
    asyncComputed: {
        log: {
            default: [],
            get() {
                var self = this;

                self.loading = true;

                // console.log('load changelog')
                return new Promise(function(resolve, reject) {

                    self.$fluro.api.get(`/log?item=${self.itemID}`)
                        .then(function(res) {
                            // console.log('Got change log', res.data)
                            resolve(res.data);
                            self.loading = false;
                        })
                        .catch(reject);
                })
            },
        }
    }
}
</script>
<style lang="scss">
.log-viewer {
    max-width: 500px;
    max-height: 70vh;


    .timeline {
        background: #f4f4f4;
        padding-right: 10px;


        .year {
            border-left: 1px solid rgba(#000, 0.1);
        }

        .year-label {
            font-weight: 500;
            text-transform: uppercase;
            display: block;
            padding: 5px 10px;
            font-size: 1.4em;
            background: rgba(#000, 0.1);
        }

        .month {
            border-top: 1px solid rgba(#000, 0.1);
        }

        .month-label {
            font-weight: 500;
            text-transform: uppercase;
            display: block;
            padding: 1px 10px;
            font-size: 15px;
            margin: 10px 0;
            color: rgba(#000, 0.8);
        }


        .day {
            display: flex;
            margin-top: 10px;
        }

        .day-label {
            font-weight: 600;
            font-size: 10px;
            text-transform: uppercase;
            padding: 5px 10px;
            border-top: 1px solid rgba(#000, 0.1);
            width: 60px;
            white-space: nowrap;
            color: rgba(#000, 0.3);
        }

        .entries {
            position: relative;
            top: -10px;
            background: #fff;
            box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
            flex: 1;
            margin-bottom: 15px;
        }

        .entry {
            padding: 8px;
            font-size: 11px;
            background: #fff;
            border-top: 1px solid rgba(#000, 0.1);
            min-width: 320px;
            cursor: pointer;

            &:hover {
                background: #fafafa;
            }

            &:first-child {
                border-top: none;
            }
        }
    }
}
</style>