<template>
    <flex-column>
        <template v-if="loading || loadingSongs">
            <fluro-page-preloader contain />
        </template>
        <tabset v-else :justified="true" :vertical="true">
            <tab :heading="`${readableTypeName} Info`">
                <flex-column-body>
                    <!-- TESTING STUFF -->
                    <!-- <pre>{{item}}</pre> -->
                    
                    <!-- <img preload-image aspect="56.25" ng-src="{{$root.asset.imageUrl(item.mainImage._id, 768, null, {from:item._id})}}" /> -->
                    <!-- <fluro-image/> -->
                    <v-container>
                        <constrain sm>
                            <template v-if="item.mainImage">
                        <fluro-image :item="item.mainImage" :imageWidth="1200" :imageHeight="675" :from="item._id" />
                    </template>
                    
                            <v-container fluid pa-2 class="border-bottom">
                                <h2><strong>{{item.title}}</strong></h2>
                                <h4 class="muted text-uppercase">{{item.firstLine}}</h4>
                                <h3>{{item | readableEventDate}}</h3>
                            </v-container>
                            <v-container fluid pa-2>
                                <template v-if="item.body && item.body.length">
                                    <div v-html="item.body"></div>
                                </template>
                            </v-container>
                            <v-container grid-list-xl fluid pa-2 v-if="item.videos && item.videos.length">
                                <v-layout row wrap>
                                    <v-flex :xs12="item.videos.length == 1" :xs6="item.videos.length > 1" v-for="video in item.videos">
                                        <fluro-panel>
                                            <fluro-panel-title>
                                                <v-layout align-center>
                                                    <v-flex>
                                                        <fluro-icon left type="video"/>
                                                        <strong>{{video.title}}</strong>
                                                    </v-flex>
                                                    <v-flex shrink>
                                                        <v-btn small icon class="ma-0" @click="$actions.open([video])">
                                                            <fluro-icon icon="ellipsis-h" />
                                                        </v-btn>
                                                    </v-flex>
                                                </v-layout>
                                            </fluro-panel-title>
                                            <fluro-video :item="video" />
                                            <!-- <pre>{{item.videos}}</pre> -->
                                        </fluro-panel>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                            <v-container fluid pa-2>
                                <template v-if="item.assets && item.assets.length">
                                    <h3 margin>Downloads & Resources</h3>
                                    <list-group>
                                        <list-group-item @click="$fluro.global.view(song, true)" :item="asset" v-for="(asset, index) in item.assets">
                                            <template v-slot:right>
                                                <v-btn class="ma-0" icon @click="$actions.open([asset])">
                                                    <fluro-icon icon="ellipsis-h" />
                                                </v-btn>
                                            </template>
                                        </list-group-item>
                                    </list-group>
                                </template>
                                <template v-if="fields.length">
                                    <h3 margin>{{ definition.title }} Details</h3>
                                    <fluro-content-render :fields="croppedFields" v-model="item.data" />
                                </template>
                            </v-container>
                            <v-container fluid pa-2 v-if="locations.length">
                                <fluro-panel>
                                    <location-view-map-component style="width:100%;min-height:300px;height:0; padding-bottom: 40%;" :positions="locations" />
                                    <fluro-panel-body class="border-top">
                                        <!-- <pre>{{item.locations}}</pre> -->
                                        <v-layout align-center>
                                            <v-flex shrink>
                                                <fluro-icon library="fas" left icon="map-marker-alt" />
                                            </v-flex>
                                            <v-flex v-for="location in locations">
                                                <strong>{{location.title}}</strong>
                                                <div class="sm muted" v-if="location.selectedRooms.length"><strong>Rooms:</strong> {{location.selectedRooms | comma('title')}}</div>
                                                <!-- <pre>{{location}}</pre> -->
                                            </v-flex>
                                        </v-layout>
                                    </fluro-panel-body>
                                </fluro-panel>
                            </v-container>
                        </constrain>
                    </v-container>
                </flex-column-body>
            </tab>
            <tab :heading="`${songs.length} Song${songs.length == 1 ? '' : 's'}`" v-if="songs.length">
                <flex-column-body>
                    <v-container>
                        <constrain sm>
                            <h3 margin>Songs</h3>
                            <list-group>
                                <list-group-item @click="$fluro.global.view(song, true)" :item="song" v-for="(song, index) in songs">
                                    <template v-slot:right>
                                        <v-btn class="ma-0" icon @click="$actions.open([song])">
                                            <fluro-icon icon="ellipsis-h" />
                                        </v-btn>
                                    </template>
                                </list-group-item>
                            </list-group>
                            <!-- <fluro-list-item/> -->
                        </constrain>
                    </v-container>
                </flex-column-body>
            </tab>
            <tab :heading="`Team Members`" v-if="item.rostered">
                <flex-column-body style="background: #fafafa;">
                    <v-container>
                        <constrain sm>
                            <v-layout align-center>
                                <v-flex>
                                    <h3 margin>Team Members</h3>
                                </v-flex>
                                <!-- <v-flex shrink>
                                    <v-btn color="primary" :to="{name:'events.multi', query:{ids:[model._id]}}">
                                        Open in Multi Planner
                                        <fluro-icon right icon="game-board" />
                                    </v-btn>
                                </v-flex> -->
                            </v-layout>
                            <fluro-panel v-for="roster in item.rostered">
                                <fluro-panel-title>
                                    <v-layout align-center>
                                        <v-flex>
                                            <strong>{{roster.title}}</strong>
                                        </v-flex>
                                        <v-flex shrink v-if="$fluro.access.canEditItem(roster)">
                                            <v-btn icon class="ma-0" @click="$actions.open([roster])" v-tippy :content="`Actions`">
                                                <fluro-icon icon="ellipsis-h" />
                                            </v-btn>
                                        </v-flex>
                                    </v-layout>
                                </fluro-panel-title>
                                <fluro-panel-body>
                                    <v-layout row wrap>
                                        <v-flex xs6 sm4 md3 v-for="slot in roster.slots" v-if="slot.assignments && slot.assignments.length">
                                            <v-container class="mb-2 pa-2">
                                                <h5>{{slot.title}}</h5>
                                                <div class="assignment-item" @click="$actions.open([assignment])" :class="assignment.confirmationStatus" v-for="assignment in slot.assignments">
                                                    <v-layout>
                                                        <v-flex>
                                                            {{assignment.contact && assignment.contact.title ? assignment.contact.title : assignment.contactName}}
                                                        </v-flex>
                                                        <v-flex shrink>
                                                            <fluro-icon right :icon="confirmationIcon(assignment)" />
                                                        </v-flex>
                                                    </v-layout>
                                                </div>
                                            </v-container>
                                        </v-flex>
                                    </v-layout>
                                    <!-- <pre>{{roster}}</pre> -->
                                </fluro-panel-body>
                            </fluro-panel>
                            <!-- <v-btn block @click="createRoster(rosterType)" class="btn-ghost" v-for="rosterType in rosterTypes">
                                Add {{rosterType.title}}
                            </v-btn> -->
                        </constrain>
                    </v-container>
                </flex-column-body>
            </tab>
            <template v-if="plans.length">
                <tab :heading="plan.title" v-for="(plan, index) in plans">
                    <fluro-content-view :id="plans[index]" :embedded="true" type="plan" />
                    <!-- <flex-column-body>
                    <v-container>
                        <constrain sm>
                            <guest-list :event="item" />
                        </constrain>
                    </v-container>
                </flex-column-body> -->
                </tab>
            </template>
            <tab heading="Guest List">
                <flex-column-body>
                    <v-container>
                        <constrain sm>
                            <guest-list :event="item" />
                        </constrain>
                    </v-container>
                </flex-column-body>
            </tab>
            <!--  <tab heading="Photos" :v-if="showPhotos">
                <flex-column-body>
                    <v-container>
                        <constrain sm>
                            <guest-list :event="item" />
                        </constrain>
                    </v-container>
                </flex-column-body>
            </tab> -->
        </tabset>
    </flex-column>
</template>
<script>
/////////////////////////////////

import Vue from 'vue';
import FluroContentView from '../FluroContentView.vue';
import LocationViewMapComponent from '../../event/LocationViewMapComponent.vue';
import FluroContentViewMixin from '../FluroContentViewMixin';
import FluroContentRender from '../../../FluroContentRender.vue';
import GuestList from '../../event/GuestList.vue';
// location-view-map-component

/////////////////////////////////

export default {
    props: {
        config: {
            type: Object,
            required: true,
        },
        item: {
            type: Object,
            required: true,
        },
    },
    components: {
        FluroContentView,
        GuestList,
        FluroContentRender,
        LocationViewMapComponent,
    },
    mixins: [FluroContentViewMixin],
    methods: {
        confirmationIcon(assignment) {

            switch (assignment.confirmationStatus) {
                case 'confirmed':
                    return 'check';
                    break;
                case 'denied':
                    return 'times';
                    break;
                case 'unknown':
                    return 'clock';
                    break;
                case 'proposed':
                    return 'question-circle';
                    break;
            }

        },
    },
    asyncComputed: {
        songs: {
            default: [],
            get() {
                var self = this;
                self.loadingSongs = true;

                return new Promise(function(resolve, reject) {

                    self.$fluro.api.get(`/event/${self.itemID}/songs`)
                        .then(function(res) {

                            resolve(res.data);
                            self.loadingSongs = false;
                        })
                        .catch(function(err) {
                            reject(err);
                            self.loadingSongs = false;
                        });
                })
            },
        },
    },
    computed: {
        showPhotos() {
            var self = this;

            var accessAllowed = self.$fluro.access.canKnowOf('photo');
            if (!accessAllowed) {
                return;
            }

            var now = new Date();
            var startDate = new Date(self.item.startDate);
            var isInPast = now >= startDate;

            return isInPast;
        },
        roomHash() {
            var self = this;
            return _.reduce(this.item.rooms, function(set, room) {
                var locationName = String(room.locationName).toLowerCase();

                if (!set[locationName]) {
                    set[locationName] = [];
                }

                set[locationName].push(room);
                return set;
            }, {})
        },
        locations() {
            var self = this;

            return _.map(self.item.locations, function(location) {
                var locationName = String(location.title).toLowerCase();
                location.selectedRooms = self.roomHash[locationName] || [];

                return location;
            })
        },
        croppedFields() {
            return _.filter(this.fields, function(field) {
                return field.key != 'songs';
            });
        },
        // songs() {
        //     return this.item.songs || [];
        // },
        // songIDs() {

        //     var self = this;


        //     var eventSongs = _.chain(self.item)
        //     .get('data.songs')
        //     .compact()
        //     .value();

        //     var planSongs = _.chain(self.plans)
        //     .map('schedules')
        //     .flatten()
        //     .filter({type:'song'})
        //     .map('links')
        //     .flatten()
        //     .compact()
        //     .value();


        //     return self.$fluro.utils.arrayIDs([].concat(eventSongs, planSongs));
        // },
        plans() {
            return this.item.plans || [];
        },
        readableTypeName() {
            return this.definition ? this.$fluro.types.readable(this.definition.title) : 'Event';
        },
    },
    data() {
        return {
            loadingSongs: true,
        }
    },
}
</script>
<style scoped lang="scss">
.assignment-item {
    font-size: 12px;
    text-overflow: ellipsis;
    ;
    white-space: nowrap;
    ;
    overflow: hidden;
    ;
    border-radius: 100px;
    margin-bottom: 2px;
    padding: 2px 10px;
    font-weight: 500;
    background-color: rgba(#000, 0.05);

    &.confirmed {
        color: $success;
        background-color: rgba($success, 0.05);
    }

    &.denied {
        color: $danger;
        background-color: rgba($danger, 0.05);
    }

    &.unknown {
        color: #555;
    }

    &.proposed {
        background-color: rgba($primary, 0.1);
        color: darken($primary, 20%);
    }
}
</style>