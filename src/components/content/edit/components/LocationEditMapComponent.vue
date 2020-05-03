<template>
    <div class="google-map" ref="map"></div>
</template>
<script>


import _ from 'lodash';


export default {
    name: 'google-map',
    props: {
        value: {
            type: Object,
            required: true,
        },
    },
    data: function() {
        return {
            model: this.value,
            map: null,
            bounds: null,
            loading: true,
            marker: null,
        }
    },
    mounted() {
        var self = this;
        if (!_.get(self.model, 'longitude')) {
            self.model.longitude = "144.9616192";
            self.model.latitude = "-37.8150634";
        }
        this.initMaps();
    },
    computed: {
        lng() {
            return parseFloat(this.model.longitude);
        },
        lat() {
            return parseFloat(this.model.latitude);
        },
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
                    var options = {
                        zoom: 15,
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                        disableDefaultUI: !1,
                        maxZoom: 18,
                        scrollwheel: !1,
                        draggable: !0,
                        center: new google.maps.LatLng(self.lat, self.lng)
                    }
                    self.map = new google.maps.Map(element, options);
                    self.initMarkers();
                });
        },
        initMarkers() {
            var self = this;
            var position = new google.maps.LatLng(self.lat, self.lng);
            self.marker = new google.maps.Marker({
                position,
                map: self.map,
                draggable: true,
            });

            self.bounds.extend(position);

            self.marker.setMap(self.map);
            //self.map.fitBounds(self.bounds);
            self.map.panToBounds(self.bounds);
            self.loading = false;
            google.maps.event.addListener(self.marker, 'dragend', function(event) {
                console.log('DRAG END');
                self.model.latitude = event.latLng.lat();
                self.model.longitude = event.latLng.lng();
                google.maps.event.clearListeners(self.marker, 'dragend');
                self.markersUpdated();
            });
        },
        markersUpdated() {
            var self = this;
            if (!self.marker) {
                return;
            }
            console.log('Updating Markers');
            // clear old marker
            self.marker.setMap(null);
            self.marker = null;

            // create new marker
            var position = new google.maps.LatLng(self.lat, self.lng);
            self.marker = new google.maps.Marker({
                position,
                map: self.map,
                draggable: true,
            });

            self.marker.setMap(self.map);

            self.bounds = null;
            self.bounds = new google.maps.LatLngBounds();
            self.bounds.extend(position);

            self.map.fitBounds(self.bounds);
            self.map.panToBounds(self.bounds);

            //self.map.setCenter(self.bounds.getCenter());

            google.maps.event.addListener(self.marker, 'dragend', function(event) {
                console.log('DRAG END');
                self.model.latitude = event.latLng.lat();
                self.model.longitude = event.latLng.lng();
                google.maps.event.clearListeners(self.marker, 'dragend');
                self.markersUpdated();
            });
        },
        debouncedUpdate() {
            var self = this;
            return _.debounce(self.markersUpdated, 1000);
        },
    },
    watch: {
        lat: function(val) {
            if (val) {
                return this.markersUpdated();
            }
        },
        lng: function(val) {
            if (val) {
                return this.markersUpdated();
            }
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