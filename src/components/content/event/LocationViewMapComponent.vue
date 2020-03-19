<template>
    <div class="google-map" ref="map"></div>
</template>
<script>
import Vue from 'vue';
import _ from 'lodash';
import MarkerClusterer from '@google/markerclusterer';

export default {
    name: 'google-map',
    props: {
        positions: {
            type: Array,
            default: [],
        },
    },
    data: function() {
        return {
            map: null,
            bounds: null,
            loading: true,
            markers: null,
            markerCluster: null,
            geocoder: null,
            contentStringModel: [false, false],
        }
    },
    created() {
        window.openEditModal = this.openEditModal;
        window.openViewModal = this.openViewModal;
    },
    mounted() {
        this.initMaps();
    },
    computed: {
        floatPositions() {
            var self = this;
            return _.chain(self.positions)
                .filter(function(pos) {
                    if (parseFloat(pos.latitude) && parseFloat(pos.longitude)) {
                        return true;
                    } else if (pos.addressLine1) {
                        console.log('FETCHING GEOCODE');
                        var address = [pos.addressLine1, pos.addressLine2, pos.suburb, pos.state, pos.postalCode, pos.country];
                        return geocodeAddress(address.join(' '));
                    } else {
                        return false;
                    }
                })
                .map(function(pos) {
                    return {
                        _id: pos._id,
                        title: pos.title,
                        _type: pos._type,
                        addressLine1: pos.addressLine1,
                        addressLine2: pos.addressLine2,
                        suburb: pos.suburb,
                        state: pos.state,
                        postalCode: pos.postalCode,
                        country: pos.country,
                        latitude: parseFloat(pos.latitude),
                        longitude: parseFloat(pos.longitude),
                    };
                })
                .value();
        }
    },
    methods: {
        initMaps() {

            var self = this;

            self.$fluro.utils.injectScript(`https://maps.googleapis.com/maps/api/js?key=${self.$fluro.global.googleMapsAPIKey}`)
                .then(function(res) {

                    var element = self.$refs.map;
                    if (!element) {
                        return;
                    }

                    ///////////////////////////////////////////


                    self.bounds = new google.maps.LatLngBounds();
                    self.geocoder = new google.maps.Geocoder();
                    var myCenter
                    if (self.floatPositions.length) {
                        myCenter = new google.maps.LatLng(self.floatPositions[0].latitude, self.floatPositions[0].longitude);
                    }
                    else {
                        myCenter = new google.maps.LatLng(-37.8150634, 144.9616192);
                    }
                    var options = {
                        zoom: 15,
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                        disableDefaultUI: !1,
                        maxZoom: 18,
                        scrollwheel: !1,
                        draggable: !0,
                        center: myCenter
                    }
                    self.map = new google.maps.Map(element, options);
                    self.initMarkers();
                });
        },
        initMarkers() {
            var self = this;
            // create new markers
            self.markers = _.map(self.floatPositions, function(pos) {
                var myPos = new google.maps.LatLng(pos.latitude, pos.longitude);
                self.bounds.extend(myPos);
                var marker = new google.maps.Marker({
                    position: myPos,
                    map: self.map
                });
                var contentstring = self.createContentString(pos);
                //console.log(contentstring, pos);
                var infowindow = new google.maps.InfoWindow({
                    content: contentstring
                });
                marker.addListener('click', function() {
                    infowindow.open(self.map, marker);
                });
                return marker;
            });

            self.markerCluster = new MarkerClusterer(self.map, self.markers, {
                maxZoom: 20,
                imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
            });
            self.map.fitBounds(self.bounds);
            self.map.panToBounds(self.bounds);
        },
        markersUpdated() {
            var self = this;
            if (!self.markers) {
                return;
            }
            //console.log('Updating Markers');
            // clear old markers
            google.maps.event.clearListeners(self.map, 'click');
            self.markers = null;
            self.markerCluster.clearMarkers();
            self.markers = _.map(self.floatPositions, function(pos) {
                var myPos = new google.maps.LatLng(pos.latitude, pos.longitude);
                self.bounds.extend(myPos);
                var marker = new google.maps.Marker({
                    position: myPos,
                    map: self.map
                });
                var contentstring = self.createContentString(pos);
                //console.log(contentstring, pos);
                var infowindow = new google.maps.InfoWindow({
                    content: contentstring
                });
                marker.addListener('click', function() {
                    infowindow.open(self.map, marker);
                });
                return marker;
            });

            self.markerCluster = new MarkerClusterer(self.map, self.markers, {
                maxZoom: 20,
                imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
            });
            self.map.fitBounds(self.bounds);
            self.map.panToBounds(self.bounds);
        },
        geocodeAddress(address) {
            return this.geocoder.geocode({ 'address': address }, function(results, status) {
                if (status == 'OK') {
                    return results[0].geometry.location;
                } else {
                    return false;
                }
            });
        },
        openViewModal(data) {
            this.$fluro.global.view(data, true)
        },
        openEditModal(data) {
            this.$fluro.global.edit(data, true)
        },
        createContentString(obj) {
            var self = this;
            var text = "<div>";
            var item;
            if (obj._type == "family") {
                text += "<h5>" + _.startCase(obj.title) + " Household</h5>";
                item = obj.address;
            } else {
                text += "<h5>" + obj.title + "</h5>";
                item = obj;
            }

            text += "<p>";
            if (item.addressLine1) {
                text += item.addressLine1 + "<br/>";
            }
            if (item.addressLine2) {
                text += item.addressLine2 + "<br/>";
            }
            if (item.suburb) {
                text += item.suburb + "<br/>";
            }
            if (item.state) {
                text += item.state + "<br/>";
            }
            if (item.postalCode) {
                text += item.postalCode + "<br/>";
            }
            if (item.country) {
                text += item.country + "<br/>";
            }

            text += "</p><button type='button' onClick='openViewModal(`" + obj._id + "`)' class='v-btn v-btn--flat theme--light'><div class='v-btn__content'>View</div></button><button type='button' onClick='openEditModal(`" + obj._id + "`)' class='v-btn v-btn--flat theme--light'><div class='v-btn__content'>Edit</div></button></div>";
            return text;
        },
    },
    watch: {
        floatPositions: function(val) {
            return this.markersUpdated();
        },
    }
};
</script>
<style scoped>
.google-map {
    width: 100%;
    height: 100%;
    background: gray;
}
</style>