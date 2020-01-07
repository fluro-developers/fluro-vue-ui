<template>
    <v-layout row wrap>
        <v-flex sm6 xs12 px-2 class="full-width">
            <h4 class="header-margin">Locations</h4>
            <list-group>
                <list-group-item v-for="location in locationOptions" :item="location" :selectable="true" :isSelected="isSelectedLocation(location)" @click="toggleLocation(location)">
                </list-group-item>
            </list-group>
            <v-btn class="button-margin" color="primary" @click="createLocation">Add a new location</v-btn>
        </v-flex>
        <v-flex sm6 xs12 px-2 class="full-width">
            <h4 class="header-margin">Rooms</h4>
            <list-group>
                <transition-group name="fade">
                    <list-group-item v-for="room in roomOptions" :item="room" :selectable="true" :isSelected="isSelectedRoom(room)" @click="toggleRoom(room)" v-bind:key="room._id">
                        <template v-slot:left>
                            <fluro-realm-bar :realm="parentRealm(room)" />
                            <div class="left-slot">
                                <div class="left-icon">
                                    <fluro-icon icon="door-closed" />
                                </div>
                            </div>
                        </template>
                        <template>
                            <strong>{{room.title}}</strong>
                            <p class="muted mb-0">{{room.locationName}}</p>
                        </template>
                    </list-group-item>
                </transition-group>
            </list-group>
        </v-flex>
    </v-layout>
</template>
<script>
import _ from 'lodash';


export default {
    props: {
        value: {
            type: Object,
        },
        roomsPath: {
            type: String,
        },
        locationsPath: {
            type: String,
        },
        allLocations: {
            type: Array,
        }
    },
    //components: { MessagingEventComponent, FluroConfirmButton },
    data() {
        return {
            model: this.value,
            locations: this.allLocations,
        }
    },
    methods: {
        selectRoom(item) {
            var self = this;
            if (!self.isSelectedRoom(item)) {
                return self.$set(self.model[self.roomsPath], self.model[self.roomsPath].length, item);
            }
        },
        deselectRoom(item) {
            var self = this;

            if (!item) {
                return;
            }

            //Get the item ID
            var itemID = self.$fluro.utils.getStringID(item);

            //Find the index of the matching item
            var index = _.findIndex(self.model[self.roomsPath], function(selectedItem) {
                var selectedItemID = self.$fluro.utils.getStringID(selectedItem);
                return itemID == selectedItemID;
            })

            self.model[self.roomsPath].splice(index, 1);
        },
        toggleRoom(item) {

            var self = this;
            if (self.isSelectedRoom(item)) {
                self.deselectRoom(item);
            } else {
                self.selectRoom(item);
            }

            // console.log('TOGGLE', self.model[self.roomsPath]);
        },
        isSelectedRoom(item) {
            var self = this;
            var itemID = self.$fluro.utils.getStringID(item);

            //Check if the ID is already selected
            var match = _.some(self.model[self.roomsPath], function(selectedItem) {
                var selectedItemID = self.$fluro.utils.getStringID(selectedItem);
                return itemID == selectedItemID;
            })

            if (match) {
                return true;
            } else {
                return false;
            }
        },
        selectLocation(item) {
            var self = this;
            if (!self.isSelectedLocation(item)) {
                return self.$set(self.model[self.locationsPath], self.model[self.locationsPath].length, item);
            }
        },
        deselectLocation(item) {
            var self = this;

            if (!item) {
                return;
            }

            //Get the item ID
            var itemID = self.$fluro.utils.getStringID(item);

            //Find the index of the matching item
            var index = _.findIndex(self.model[self.locationsPath], function(selectedItem) {
                var selectedItemID = self.$fluro.utils.getStringID(selectedItem);
                return itemID == selectedItemID;
            })

            self.model[self.locationsPath].splice(index, 1);
            _.forEach(item.rooms, function(room) {
                if (self.isSelectedRoom(room)) {
                    return self.deselectRoom(room)
                }
            })
        },
        toggleLocation(item) {

            var self = this;
            if (self.isSelectedLocation(item)) {
                self.deselectLocation(item);
            } else {
                self.selectLocation(item);
            }

            // console.log('TOGGLE', self.model[self.locationsPath]);
        },
        isSelectedLocation(item) {
            var self = this;
            var itemID = self.$fluro.utils.getStringID(item);

            //Check if the ID is already selected
            var match = _.some(self.model[self.locationsPath], function(selectedItem) {
                var selectedItemID = self.$fluro.utils.getStringID(selectedItem);
                return itemID == selectedItemID;
            })

            return match;
        },
        parentRealm(room) {
            var self = this;
            var parent = _.find(self.locations, function(loc) {
                return room.locationName == loc.title;
            });
            if (parent) {
                return parent.realms;
            } else {
                return undefined;
            }
        },
        findLocationName(room) {
            var self = this;
            var itemID = self.$fluro.utils.getStringID(room);

            var location = _.find(self.locations, function(loc) {
                var locRoomIDs = _.map(loc.rooms, '_id');
                return locRoomIDs.includes(itemID);
            });

            if (location) {
                room.locationName = location.title;
            }
            return room;
        },
        createLocation() {
            var self = this;
            self.$fluro.global.create('location', {}, true)
                .then(function(res) {
                    self.locations.push(res);
                });
        }
    },
    watch: {
        'allLocations': function() {
            var self = this;
            self.locations = self.allLocations;
        }
    },
    computed: {
        locationOptions() {
            var self = this;

            return _.chain(self.locations)
                .map(function(loc) {
                    var locationName = loc.title;
                    _.forEach(loc.rooms, function(room) {
                        return room.locationName = locationName;
                    })
                    return loc;
                })
                .flatten()
                .value();
        },
        roomOptions() {
            var self = this;
            var temp = _.chain(self.model[self.locationsPath])
                .map(function(loc) {
                    if (loc.rooms.length && !loc.rooms[0].locationName) {
                        _.forEach(loc.rooms, self.findLocationName);
                    }
                    return loc.rooms;
                })
                .flatten()
                .value();
            return temp;
        }
    },
}
</script>
<style lang="scss">
.left-slot {
    text-align: center;
    width: 50px;
    margin-right: 10px;

    .left-icon {
        width: 30px;
        height: 30px;
        background-color: rgba(#000, 0.1);
        text-align: center;
        line-height: 30px;
        display: inline-block;
    }
}

.header-margin {
    margin-bottom: 10px;
}

.button-margin {
    margin-bottom: 20px;
}

.full-width {
    width: 100%;
}


.fade-enter-active,
.fade-leave-active {
    transition: all .3s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>