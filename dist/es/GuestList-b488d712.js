
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { bo as _, bm as __vue_normalize__, bn as __vue_create_injector__, S as SearchInput, W as AvatarCell, t as FluroTable } from './index-35adf445.js';

/**
 * Copyright 2019 Google LLC. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @name MarkerClusterer for Google Maps v3
 * @author Luke Mahe
 * @fileoverview
 * The library creates and manages per-zoom-level clusters for large amounts of
 * markers.
 */

/**
 * A Marker Clusterer that clusters markers.
 *
 * @param {google.maps.Map} map The Google map to attach to.
 * @param {Array.<google.maps.Marker>=} opt_markers Optional markers to add to
 *   the cluster.
 * @param {Object=} opt_options support the following options:
 *     'gridSize': (number) The grid size of a cluster in pixels.
 *     'maxZoom': (number) The maximum zoom level that a marker can be part of a
 *                cluster.
 *     'zoomOnClick': (boolean) Whether the default behaviour of clicking on a
 *                    cluster is to zoom into it.
 *     'imagePath': (string) The base URL where the images representing
 *                  clusters will be found. The full URL will be:
 *                  {imagePath}[1-5].{imageExtension}
 *                  Default: '../images/m'.
 *     'imageExtension': (string) The suffix for images URL representing
 *                       clusters will be found. See _imagePath_ for details.
 *                       Default: 'png'.
 *     'averageCenter': (boolean) Whether the center of each cluster should be
 *                      the average of all markers in the cluster.
 *     'minimumClusterSize': (number) The minimum number of markers to be in a
 *                           cluster before the markers are hidden and a count
 *                           is shown.
 *     'zIndex': (number) the z-index of a cluster.
 *               Default: google.maps.Marker.MAX_ZINDEX + 1
 *     'styles': (Array.<Object>) An Array of single object that has style properties for all cluster:
 *       'url': (string) The image url.
 *       'height': (number) The image height.
 *       'width': (number) The image width.
 *       'anchor': (Array) The anchor position of the label text.
 *       'textColor': (string) The text color.
 *       'textSize': (number) The text size.
 *       'backgroundPosition': (string) The position of the backgound x, y.
 * @constructor
 * @extends google.maps.OverlayView
 */

class MarkerClusterer {
  constructor(map, opt_markers, opt_options) {
    this.extend(MarkerClusterer, google.maps.OverlayView);
    this.map_ = map;

    /**
     * The marker cluster image path.
     *
     * @type {string}
     * @private
     */
    this.MARKER_CLUSTER_IMAGE_PATH_ = "../images/m";

    /**
     * The marker cluster image path.
     *
     * @type {string}
     * @private
     */
    this.MARKER_CLUSTER_IMAGE_EXTENSION_ = "png";
    /**
     * @type {Array.<google.maps.Marker>}
     * @private
     */
    this.markers_ = [];

    /**
     *  @type {Array.<Cluster>}
     */
    this.clusters_ = [];

    this.sizes = [53, 56, 66, 78, 90];

    /**
     * @type {Array.<Object>}
     * @private
     */
    this.styles_ = [];

    /**
     * @type {boolean}
     * @private
     */
    this.ready_ = false;

    var options = opt_options || {};

    /**
     * @type {number}
     */
    this.zIndex_ = options["zIndex"] || google.maps.Marker.MAX_ZINDEX + 1;

    /**
     * @type {number}
     * @private
     */
    this.gridSize_ = options["gridSize"] || 60;

    /**
     * @private
     */
    this.minClusterSize_ = options["minimumClusterSize"] || 2;

    /**
     * @type {?number}
     * @private
     */
    this.maxZoom_ = options["maxZoom"] || null;

    this.styles_ = options["styles"] || [];

    /**
     * @type {string}
     * @private
     */
    this.imagePath_ = options["imagePath"] || this.MARKER_CLUSTER_IMAGE_PATH_;

    /**
     * @type {string}
     * @private
     */
    this.imageExtension_ =
      options["imageExtension"] || this.MARKER_CLUSTER_IMAGE_EXTENSION_;

    /**
     * @type {boolean}
     * @private
     */
    this.zoomOnClick_ = true;

    if (options["zoomOnClick"] != undefined) {
      this.zoomOnClick_ = options["zoomOnClick"];
    }

    /**
     * @type {boolean}
     * @private
     */
    this.averageCenter_ = false;

    if (options["averageCenter"] != undefined) {
      this.averageCenter_ = options["averageCenter"];
    }

    this.setupStyles_();

    this.setMap(map);

    /**
     * @type {number}
     * @private
     */
    this.prevZoom_ = this.map_.getZoom();

    // Add the map event listeners
    var that = this;
    google.maps.event.addListener(this.map_, "zoom_changed", function() {
      // Determines map type and prevent illegal zoom levels
      var zoom = that.map_.getZoom();
      var minZoom = that.map_.minZoom || 0;
      var maxZoom = Math.min(
        that.map_.maxZoom || 100,
        that.map_.mapTypes[that.map_.getMapTypeId()].maxZoom
      );
      zoom = Math.min(Math.max(zoom, minZoom), maxZoom);

      if (that.prevZoom_ != zoom) {
        that.prevZoom_ = zoom;
        that.resetViewport();
      }
    });

    google.maps.event.addListener(this.map_, "idle", function() {
      that.redraw();
    });

    // Finally, add the markers
    if (
      opt_markers &&
      (opt_markers.length || Object.keys(opt_markers).length)
    ) {
      this.addMarkers(opt_markers, false);
    }
  }

  /**
   * Extends a objects prototype by anothers.
   *
   * @param {Object} obj1 The object to be extended.
   * @param {Object} obj2 The object to extend with.
   * @return {Object} The new extended object.
   * @ignore
   */
  extend(obj1, obj2) {
    return function(object) {
      for (var property in object.prototype) {
        this.prototype[property] = object.prototype[property];
      }
      return this;
    }.apply(obj1, [obj2]);
  }

  /**
   * Implementaion of the interface method.
   * @ignore
   */
  onAdd() {
    this.setReady_(true);
  }

  /**
   * Implementaion of the interface method.
   * @ignore
   */
  draw() {}

  /**
   * Sets up the styles object.
   *
   * @private
   */
  setupStyles_() {
    if (this.styles_.length) {
      return;
    }

    for (var i = 0, size; (size = this.sizes[i]); i++) {
      this.styles_.push({
        url: this.imagePath_ + (i + 1) + "." + this.imageExtension_,
        height: size,
        width: size
      });
    }
  }

  /**
   *  Fit the map to the bounds of the markers in the clusterer.
   */
  fitMapToMarkers() {
    var markers = this.getMarkers();
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, marker; (marker = markers[i]); i++) {
      bounds.extend(marker.getPosition());
    }

    this.map_.fitBounds(bounds);
  }

  /**
   * @param {number} zIndex
   */
  setZIndex(zIndex) {
    this.zIndex_ = zIndex;
  }

  /**
   * @return {number}
   */
  getZIndex() {
    return this.zIndex_;
  }

  /**
   *  Sets the styles.
   *
   *  @param {Object} styles The style to set.
   */
  setStyles(styles) {
    this.styles_ = styles;
  }

  /**
   *  Gets the styles.
   *
   *  @return {Object} The styles object.
   */
  getStyles() {
    return this.styles_;
  }

  /**
   * Whether zoom on click is set.
   *
   * @return {boolean} True if zoomOnClick_ is set.
   */
  isZoomOnClick() {
    return this.zoomOnClick_;
  }

  /**
   * Whether average center is set.
   *
   * @return {boolean} True if averageCenter_ is set.
   */
  isAverageCenter() {
    return this.averageCenter_;
  }

  /**
   *  Returns the array of markers in the clusterer.
   *
   *  @return {Array.<google.maps.Marker>} The markers.
   */
  getMarkers() {
    return this.markers_;
  }

  /**
   *  Returns the number of markers in the clusterer
   *
   *  @return {Number} The number of markers.
   */
  getTotalMarkers() {
    return this.markers_.length;
  }

  /**
   *  Sets the max zoom for the clusterer.
   *
   *  @param {number} maxZoom The max zoom level.
   */
  setMaxZoom(maxZoom) {
    this.maxZoom_ = maxZoom;
  }

  /**
   *  Gets the max zoom for the clusterer.
   *
   *  @return {number} The max zoom level.
   */
  getMaxZoom() {
    return this.maxZoom_;
  }

  /**
   *  The function for calculating the cluster icon image.
   *
   *  @param {Array.<google.maps.Marker>} markers The markers in the clusterer.
   *  @param {number} numStyles The number of styles available.
   *  @return {Object} A object properties: 'text' (string) and 'index' (number).
   *  @private
   */
  calculator_(markers, numStyles) {
    var index = 0;
    var count = markers.length;
    var dv = count;
    while (dv !== 0) {
      dv = parseInt(dv / 10, 10);
      index++;
    }

    index = Math.min(index, numStyles);
    return {
      text: count,
      index: index
    };
  }

  /**
   * Set the calculator function.
   *
   * @param {function(Array, number)} calculator The function to set as the
   *     calculator. The function should return a object properties:
   *     'text' (string) and 'index' (number).
   *
   */
  setCalculator(calculator) {
    this.calculator_ = calculator;
  }

  /**
   * Get the calculator function.
   *
   * @return {function(Array, number)} the calculator function.
   */
  getCalculator() {
    return this.calculator_;
  }

  /**
   * Add an array of markers to the clusterer.
   *
   * @param {Array.<google.maps.Marker>} markers The markers to add.
   * @param {boolean=} opt_nodraw Whether to redraw the clusters.
   */
  addMarkers(markers, opt_nodraw) {
    if (markers.length) {
      for (let i = 0, marker; (marker = markers[i]); i++) {
        this.pushMarkerTo_(marker);
      }
    } else if (Object.keys(markers).length) {
      for (let marker in markers) {
        this.pushMarkerTo_(markers[marker]);
      }
    }
    if (!opt_nodraw) {
      this.redraw();
    }
  }

  /**
   * Pushes a marker to the clusterer.
   *
   * @param {google.maps.Marker} marker The marker to add.
   * @private
   */
  pushMarkerTo_(marker) {
    marker.isAdded = false;
    if (marker["draggable"]) {
      // If the marker is draggable add a listener so we update the clusters on
      // the drag end.
      var that = this;
      google.maps.event.addListener(marker, "dragend", function() {
        marker.isAdded = false;
        that.repaint();
      });
    }
    this.markers_.push(marker);
  }

  /**
   * Adds a marker to the clusterer and redraws if needed.
   *
   * @param {google.maps.Marker} marker The marker to add.
   * @param {boolean=} opt_nodraw Whether to redraw the clusters.
   */
  addMarker(marker, opt_nodraw) {
    this.pushMarkerTo_(marker);
    if (!opt_nodraw) {
      this.redraw();
    }
  }

  /**
   * Removes a marker and returns true if removed, false if not
   *
   * @param {google.maps.Marker} marker The marker to remove
   * @return {boolean} Whether the marker was removed or not
   * @private
   */
  removeMarker_(marker) {
    var index = -1;
    if (this.markers_.indexOf) {
      index = this.markers_.indexOf(marker);
    } else {
      for (var i = 0, m; (m = this.markers_[i]); i++) {
        if (m == marker) {
          index = i;
          break;
        }
      }
    }

    if (index == -1) {
      // Marker is not in our list of markers.
      return false;
    }

    marker.setMap(null);

    this.markers_.splice(index, 1);

    return true;
  }

  /**
   * Remove a marker from the cluster.
   *
   * @param {google.maps.Marker} marker The marker to remove.
   * @param {boolean=} opt_nodraw Optional boolean to force no redraw.
   * @return {boolean} True if the marker was removed.
   */
  removeMarker(marker, opt_nodraw) {
    var removed = this.removeMarker_(marker);

    if (!opt_nodraw && removed) {
      this.resetViewport();
      this.redraw();
      return true;
    } else {
      return false;
    }
  }

  /**
   * Removes an array of markers from the cluster.
   *
   * @param {Array.<google.maps.Marker>} markers The markers to remove.
   * @param {boolean=} opt_nodraw Optional boolean to force no redraw.
   */
  removeMarkers(markers, opt_nodraw) {
    // create a local copy of markers if required
    // (removeMarker_ modifies the getMarkers() array in place)
    var markersCopy = markers === this.getMarkers() ? markers.slice() : markers;
    var removed = false;

    for (var i = 0, marker; (marker = markersCopy[i]); i++) {
      var r = this.removeMarker_(marker);
      removed = removed || r;
    }

    if (!opt_nodraw && removed) {
      this.resetViewport();
      this.redraw();
      return true;
    }
  }

  /**
   * Sets the clusterer's ready state.
   *
   * @param {boolean} ready The state.
   * @private
   */
  setReady_(ready) {
    if (!this.ready_) {
      this.ready_ = ready;
      this.createClusters_();
    }
  }

  /**
   * Returns the number of clusters in the clusterer.
   *
   * @return {number} The number of clusters.
   */
  getTotalClusters() {
    return this.clusters_.length;
  }

  /**
   * Returns the google map that the clusterer is associated with.
   *
   * @return {google.maps.Map} The map.
   */
  getMap() {
    return this.map_;
  }

  /**
   * Sets the google map that the clusterer is associated with.
   *
   * @param {google.maps.Map} map The map.
   */
  setMap(map) {
    this.map_ = map;
  }

  /**
   * Returns the size of the grid.
   *
   * @return {number} The grid size.
   */
  getGridSize() {
    return this.gridSize_;
  }

  /**
   * Sets the size of the grid.
   *
   * @param {number} size The grid size.
   */
  setGridSize(size) {
    this.gridSize_ = size;
  }

  /**
   * Returns the min cluster size.
   *
   * @return {number} The grid size.
   */
  getMinClusterSize() {
    return this.minClusterSize_;
  }

  /**
   * Sets the min cluster size.
   *
   * @param {number} size The grid size.
   */
  setMinClusterSize(size) {
    this.minClusterSize_ = size;
  }

  /**
   * Extends a bounds object by the grid size.
   *
   * @param {google.maps.LatLngBounds} bounds The bounds to extend.
   * @return {google.maps.LatLngBounds} The extended bounds.
   */
  getExtendedBounds(bounds) {
    var projection = this.getProjection();

    // Turn the bounds into latlng.
    var tr = new google.maps.LatLng(
      bounds.getNorthEast().lat(),
      bounds.getNorthEast().lng()
    );
    var bl = new google.maps.LatLng(
      bounds.getSouthWest().lat(),
      bounds.getSouthWest().lng()
    );

    // Convert the points to pixels and the extend out by the grid size.
    var trPix = projection.fromLatLngToDivPixel(tr);
    trPix.x += this.gridSize_;
    trPix.y -= this.gridSize_;

    var blPix = projection.fromLatLngToDivPixel(bl);
    blPix.x -= this.gridSize_;
    blPix.y += this.gridSize_;

    // Convert the pixel points back to LatLng
    var ne = projection.fromDivPixelToLatLng(trPix);
    var sw = projection.fromDivPixelToLatLng(blPix);

    // Extend the bounds to contain the new bounds.
    bounds.extend(ne);
    bounds.extend(sw);

    return bounds;
  }

  /**
   * Determins if a marker is contained in a bounds.
   *
   * @param {google.maps.Marker} marker The marker to check.
   * @param {google.maps.LatLngBounds} bounds The bounds to check against.
   * @return {boolean} True if the marker is in the bounds.
   * @private
   */
  isMarkerInBounds_(marker, bounds) {
    return bounds.contains(marker.getPosition());
  }

  /**
   * Clears all clusters and markers from the clusterer.
   */
  clearMarkers() {
    this.resetViewport(true);

    // Set the markers a empty array.
    this.markers_ = [];
  }

  /**
   * Clears all existing clusters and recreates them.
   * @param {boolean} opt_hide To also hide the marker.
   */
  resetViewport(opt_hide) {
    // Remove all the clusters
    for (let i = 0, cluster; (cluster = this.clusters_[i]); i++) {
      cluster.remove();
    }

    // Reset the markers to not be added and to be invisible.
    for (let i = 0, marker; (marker = this.markers_[i]); i++) {
      marker.isAdded = false;
      if (opt_hide) {
        marker.setMap(null);
      }
    }

    this.clusters_ = [];
  }

  /**
   *
   */
  repaint() {
    var oldClusters = this.clusters_.slice();
    this.clusters_.length = 0;
    this.resetViewport();
    this.redraw();

    // Remove the old clusters.
    // Do it in a timeout so the other clusters have been drawn first.
    setTimeout(function() {
      for (var i = 0, cluster; (cluster = oldClusters[i]); i++) {
        cluster.remove();
      }
    }, 0);
  }

  /**
   * Redraws the clusters.
   */
  redraw() {
    this.createClusters_();
  }

  /**
   * Calculates the distance between two latlng locations in km.
   * @see http://www.movable-type.co.uk/scripts/latlong.html
   *
   * @param {google.maps.LatLng} p1 The first lat lng point.
   * @param {google.maps.LatLng} p2 The second lat lng point.
   * @return {number} The distance between the two points in km.
   * @private
   */
  distanceBetweenPoints_(p1, p2) {
    if (!p1 || !p2) {
      return 0;
    }

    var R = 6371; // Radius of the Earth in km
    var dLat = ((p2.lat() - p1.lat()) * Math.PI) / 180;
    var dLon = ((p2.lng() - p1.lng()) * Math.PI) / 180;
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((p1.lat() * Math.PI) / 180) *
        Math.cos((p2.lat() * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  }

  /**
   * Add a marker to a cluster, or creates a new cluster.
   *
   * @param {google.maps.Marker} marker The marker to add.
   * @private
   */
  addToClosestCluster_(marker) {
    var distance = 40000; // Some large number
    var clusterToAddTo = null;
    for (var i = 0, cluster; (cluster = this.clusters_[i]); i++) {
      var center = cluster.getCenter();
      if (center) {
        var d = this.distanceBetweenPoints_(center, marker.getPosition());
        if (d < distance) {
          distance = d;
          clusterToAddTo = cluster;
        }
      }
    }

    if (clusterToAddTo && clusterToAddTo.isMarkerInClusterBounds(marker)) {
      clusterToAddTo.addMarker(marker);
    } else {
      var newCluster = new Cluster(this);
      newCluster.addMarker(marker);
      this.clusters_.push(newCluster);
    }
  }

  /**
   * Creates the clusters.
   *
   * @private
   */
  createClusters_() {
    if (!this.ready_) {
      return;
    }

    // Get our current map view bounds.
    // Create a new bounds object so we don't affect the map.
    var mapBounds = new google.maps.LatLngBounds(
      this.map_.getBounds().getSouthWest(),
      this.map_.getBounds().getNorthEast()
    );
    var bounds = this.getExtendedBounds(mapBounds);

    for (var i = 0, marker; (marker = this.markers_[i]); i++) {
      if (!marker.isAdded && this.isMarkerInBounds_(marker, bounds)) {
        this.addToClosestCluster_(marker);
      }
    }
  }
}

/**
 * A cluster that contains markers.
 *
 * @param {MarkerClusterer} markerClusterer The markerclusterer that this
 *     cluster is associated with.
 * @constructor
 * @ignore
 */
class Cluster {
  constructor(markerClusterer) {
    this.markerClusterer_ = markerClusterer;
    this.map_ = markerClusterer.getMap();
    this.gridSize_ = markerClusterer.getGridSize();
    this.minClusterSize_ = markerClusterer.getMinClusterSize();
    this.averageCenter_ = markerClusterer.isAverageCenter();
    this.center_ = null;
    this.markers_ = [];
    this.bounds_ = null;
    this.clusterIcon_ = new ClusterIcon(
      this,
      markerClusterer.getStyles(),
      markerClusterer.getGridSize()
    );
  }

  /**
   * Determins if a marker is already added to the cluster.
   *
   * @param {google.maps.Marker} marker The marker to check.
   * @return {boolean} True if the marker is already added.
   */
  isMarkerAlreadyAdded(marker) {
    if (this.markers_.indexOf) {
      return this.markers_.indexOf(marker) != -1;
    } else {
      for (var i = 0, m; (m = this.markers_[i]); i++) {
        if (m == marker) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Add a marker the cluster.
   *
   * @param {google.maps.Marker} marker The marker to add.
   * @return {boolean} True if the marker was added.
   */
  addMarker(marker) {
    if (this.isMarkerAlreadyAdded(marker)) {
      return false;
    }

    if (!this.center_) {
      this.center_ = marker.getPosition();
      this.calculateBounds_();
    } else {
      if (this.averageCenter_) {
        var l = this.markers_.length + 1;
        var lat =
          (this.center_.lat() * (l - 1) + marker.getPosition().lat()) / l;
        var lng =
          (this.center_.lng() * (l - 1) + marker.getPosition().lng()) / l;
        this.center_ = new google.maps.LatLng(lat, lng);
        this.calculateBounds_();
      }
    }

    marker.isAdded = true;
    this.markers_.push(marker);

    var len = this.markers_.length;
    if (len < this.minClusterSize_ && marker.getMap() != this.map_) {
      // Min cluster size not reached so show the marker.
      marker.setMap(this.map_);
    }

    if (len == this.minClusterSize_) {
      // Hide the markers that were showing.
      for (var i = 0; i < len; i++) {
        this.markers_[i].setMap(null);
      }
    }

    if (len >= this.minClusterSize_) {
      marker.setMap(null);
    }

    this.updateIcon();
    return true;
  }

  /**
   * Returns the marker clusterer that the cluster is associated with.
   *
   * @return {MarkerClusterer} The associated marker clusterer.
   */
  getMarkerClusterer() {
    return this.markerClusterer_;
  }

  /**
   * Returns the bounds of the cluster.
   *
   * @return {google.maps.LatLngBounds} the cluster bounds.
   */
  getBounds() {
    var bounds = new google.maps.LatLngBounds(this.center_, this.center_);
    var markers = this.getMarkers();
    for (var i = 0, marker; (marker = markers[i]); i++) {
      bounds.extend(marker.getPosition());
    }
    return bounds;
  }

  /**
   * Removes the cluster
   */
  remove() {
    this.clusterIcon_.remove();
    this.markers_.length = 0;
    delete this.markers_;
  }

  /**
   * Returns the number of markers in the cluster.
   *
   * @return {number} The number of markers in the cluster.
   */
  getSize() {
    return this.markers_.length;
  }

  /**
   * Returns a list of the markers in the cluster.
   *
   * @return {Array.<google.maps.Marker>} The markers in the cluster.
   */
  getMarkers() {
    return this.markers_;
  }

  /**
   * Returns the center of the cluster.
   *
   * @return {google.maps.LatLng} The cluster center.
   */
  getCenter() {
    return this.center_;
  }

  /**
   * Calculated the extended bounds of the cluster with the grid.
   *
   * @private
   */
  calculateBounds_() {
    var bounds = new google.maps.LatLngBounds(this.center_, this.center_);
    this.bounds_ = this.markerClusterer_.getExtendedBounds(bounds);
  }

  /**
   * Determines if a marker lies in the clusters bounds.
   *
   * @param {google.maps.Marker} marker The marker to check.
   * @return {boolean} True if the marker lies in the bounds.
   */
  isMarkerInClusterBounds(marker) {
    return this.bounds_.contains(marker.getPosition());
  }

  /**
   * Returns the map that the cluster is associated with.
   *
   * @return {google.maps.Map} The map.
   */
  getMap() {
    return this.map_;
  }

  /**
   * Updates the cluster icon
   */
  updateIcon() {
    var zoom = this.map_.getZoom();
    var mz = this.markerClusterer_.getMaxZoom();

    if (mz && zoom > mz) {
      // The zoom is greater than our max zoom so show all the markers in cluster.
      for (var i = 0, marker; (marker = this.markers_[i]); i++) {
        marker.setMap(this.map_);
      }
      return;
    }

    if (this.markers_.length < this.minClusterSize_) {
      // Min cluster size not yet reached.
      this.clusterIcon_.hide();
      return;
    }

    var numStyles = this.markerClusterer_.getStyles().length;
    var sums = this.markerClusterer_.getCalculator()(this.markers_, numStyles);
    this.clusterIcon_.setCenter(this.center_);
    this.clusterIcon_.setSums(sums);
    this.clusterIcon_.show();
  }
}

/**
 * A cluster icon
 *
 * @param {Cluster} cluster The cluster to be associated with.
 * @param {Object} styles An object that has style properties:
 *     'url': (string) The image url.
 *     'height': (number) The image height.
 *     'width': (number) The image width.
 *     'anchor': (Array) The anchor position of the label text.
 *     'textColor': (string) The text color.
 *     'textSize': (number) The text size.
 *     'backgroundPosition: (string) The background postition x, y.
 * @param {number=} opt_padding Optional padding to apply to the cluster icon.
 * @constructor
 * @extends google.maps.OverlayView
 * @ignore
 */
class ClusterIcon {
  constructor(cluster, styles, opt_padding) {
    cluster.getMarkerClusterer().extend(ClusterIcon, google.maps.OverlayView);

    this.styles_ = styles;
    this.padding_ = opt_padding || 0;
    this.cluster_ = cluster;
    this.center_ = null;
    this.map_ = cluster.getMap();
    this.div_ = null;
    this.sums_ = null;
    this.visible_ = false;

    this.setMap(this.map_);
  }

  /**
   * Triggers the clusterclick event and zoom's if the option is set.
   */
  triggerClusterClick() {
    var clusterBounds = this.cluster_.getBounds();
    var markerClusterer = this.cluster_.getMarkerClusterer();

    // Trigger the clusterclick event.
    google.maps.event.trigger(
      markerClusterer.map_,
      "clusterclick",
      this.cluster_
    );

    if (markerClusterer.isZoomOnClick()) {
      // Zoom into the cluster.
      this.map_.fitBounds(clusterBounds);
      this.map_.setCenter(clusterBounds.getCenter());
    }
  }

  /**
   * Adding the cluster icon to the dom.
   * @ignore
   */
  onAdd() {
    this.div_ = document.createElement("DIV");
    if (this.visible_) {
      var pos = this.getPosFromLatLng_(this.center_);
      this.div_.style.cssText = this.createCss(pos);
      this.div_.innerHTML = this.sums_.text;
    }

    var panes = this.getPanes();
    panes.overlayMouseTarget.appendChild(this.div_);

    var that = this;
    google.maps.event.addDomListener(this.div_, "click", function() {
      that.triggerClusterClick();
    });
  }

  /**
   * Returns the position to place the div dending on the latlng.
   *
   * @param {google.maps.LatLng} latlng The position in latlng.
   * @return {google.maps.Point} The position in pixels.
   * @private
   */
  getPosFromLatLng_(latlng) {
    var pos = this.getProjection().fromLatLngToDivPixel(latlng);
    pos.x -= parseInt(this.width_ / 2, 10);
    pos.y -= parseInt(this.height_ / 2, 10);
    return pos;
  }

  /**
   * Draw the icon.
   * @ignore
   */
  draw() {
    if (this.visible_) {
      var pos = this.getPosFromLatLng_(this.center_);
      this.div_.style.top = pos.y + "px";
      this.div_.style.left = pos.x + "px";
    }
  }

  /**
   * Hide the icon.
   */
  hide() {
    if (this.div_) {
      this.div_.style.display = "none";
    }
    this.visible_ = false;
  }

  /**
   * Position and show the icon.
   */
  show() {
    if (this.div_) {
      var pos = this.getPosFromLatLng_(this.center_);
      this.div_.style.cssText = this.createCss(pos);
      this.div_.style.display = "";
    }
    this.visible_ = true;
  }

  /**
   * Remove the icon from the map
   */
  remove() {
    this.setMap(null);
  }

  /**
   * Implementation of the onRemove interface.
   * @ignore
   */
  onRemove() {
    if (this.div_ && this.div_.parentNode) {
      this.hide();
      this.div_.parentNode.removeChild(this.div_);
      this.div_ = null;
    }
  }

  /**
   * Set the sums of the icon.
   *
   * @param {Object} sums The sums containing:
   *   'text': (string) The text to display in the icon.
   *   'index': (number) The style index of the icon.
   */
  setSums(sums) {
    this.sums_ = sums;
    this.text_ = sums.text;
    this.index_ = sums.index;
    if (this.div_) {
      this.div_.innerHTML = sums.text;
    }

    this.useStyle();
  }

  /**
   * Sets the icon to the the styles.
   */
  useStyle() {
    var index = Math.max(0, this.sums_.index - 1);
    index = Math.min(this.styles_.length - 1, index);
    var style = this.styles_[index];
    this.url_ = style["url"];
    this.height_ = style["height"];
    this.width_ = style["width"];
    this.textColor_ = style["textColor"];
    this.anchor_ = style["anchor"];
    this.textSize_ = style["textSize"];
    this.backgroundPosition_ = style["backgroundPosition"];
  }

  /**
   * Sets the center of the icon.
   *
   * @param {google.maps.LatLng} center The latlng to set as the center.
   */
  setCenter(center) {
    this.center_ = center;
  }

  /**
   * Create the css text based on the position of the icon.
   *
   * @param {google.maps.Point} pos The position.
   * @return {string} The css style text.
   */
  createCss(pos) {
    var style = [];
    style.push("z-index:" + this.cluster_.markerClusterer_.getZIndex() + ";");
    style.push("background-image:url(" + this.url_ + ");");
    var backgroundPosition = this.backgroundPosition_
      ? this.backgroundPosition_
      : "0 0";
    style.push("background-position:" + backgroundPosition + ";");

    if (typeof this.anchor_ === "object") {
      if (
        typeof this.anchor_[0] === "number" &&
        this.anchor_[0] > 0 &&
        this.anchor_[0] < this.height_
      ) {
        style.push(
          "height:" +
            (this.height_ - this.anchor_[0]) +
            "px; padding-top:" +
            this.anchor_[0] +
            "px;"
        );
      } else {
        style.push(
          "height:" + this.height_ + "px; line-height:" + this.height_ + "px;"
        );
      }
      if (
        typeof this.anchor_[1] === "number" &&
        this.anchor_[1] > 0 &&
        this.anchor_[1] < this.width_
      ) {
        style.push(
          "width:" +
            (this.width_ - this.anchor_[1]) +
            "px; padding-left:" +
            this.anchor_[1] +
            "px;"
        );
      } else {
        style.push("width:" + this.width_ + "px; text-align:center;");
      }
    } else {
      style.push(
        "height:" +
          this.height_ +
          "px; line-height:" +
          this.height_ +
          "px; width:" +
          this.width_ +
          "px; text-align:center;"
      );
    }

    var txtColor = this.textColor_ ? this.textColor_ : "black";
    var txtSize = this.textSize_ ? this.textSize_ : 11;

    style.push(
      "cursor:pointer; top:" +
        pos.y +
        "px; left:" +
        pos.x +
        "px; color:" +
        txtColor +
        "; position:absolute; font-size:" +
        txtSize +
        "px; font-family:Arial,sans-serif; font-weight:bold"
    );
    return style.join("");
  }
}

//
var script = {
  name: 'google-map',
  props: {
    positions: {
      type: Array,
      default: []
    }
  },
  data: function () {
    return {
      map: null,
      bounds: null,
      loading: true,
      markers: null,
      markerCluster: null,
      geocoder: null,
      contentStringModel: [false, false]
    };
  },

  mounted() {
    window.openEditModal = this.openEditModal;
    window.openViewModal = this.openViewModal;
    this.initMaps();
  },

  computed: {
    floatPositions() {
      var self = this;
      return _.chain(self.positions).filter(function (pos) {
        if (parseFloat(pos.latitude) && parseFloat(pos.longitude)) {
          return true;
        } else if (pos.addressLine1) {
          console.log('FETCHING GEOCODE');
          var address = [pos.addressLine1, pos.addressLine2, pos.suburb, pos.state, pos.postalCode, pos.country];
          return geocodeAddress(address.join(' '));
        } else {
          return false;
        }
      }).map(function (pos) {
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
          longitude: parseFloat(pos.longitude)
        };
      }).value();
    }

  },
  methods: {
    initMaps() {
      var self = this;
      self.$fluro.utils.injectScript(`https://maps.googleapis.com/maps/api/js?key=${self.$fluro.global.googleMapsAPIKey}`).then(function (res) {
        var element = self.$refs.map;

        if (!element) {
          return;
        } ///////////////////////////////////////////


        self.bounds = new google.maps.LatLngBounds();
        self.geocoder = new google.maps.Geocoder();
        var myCenter;

        if (self.floatPositions.length) {
          myCenter = new google.maps.LatLng(self.floatPositions[0].latitude, self.floatPositions[0].longitude);
        } else {
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
        };
        self.map = new google.maps.Map(element, options);
        self.initMarkers();
      });
    },

    initMarkers() {
      var self = this; // create new markers

      self.markers = _.map(self.floatPositions, function (pos) {
        var myPos = new google.maps.LatLng(pos.latitude, pos.longitude);
        self.bounds.extend(myPos);
        var marker = new google.maps.Marker({
          position: myPos,
          map: self.map
        });
        var contentstring = self.createContentString(pos); //console.log(contentstring, pos);

        var infowindow = new google.maps.InfoWindow({
          content: contentstring
        });
        marker.addListener('click', function () {
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
      } //console.log('Updating Markers');
      // clear old markers


      google.maps.event.clearListeners(self.map, 'click');
      self.markers = null;
      self.markerCluster.clearMarkers();
      self.markers = _.map(self.floatPositions, function (pos) {
        var myPos = new google.maps.LatLng(pos.latitude, pos.longitude);
        self.bounds.extend(myPos);
        var marker = new google.maps.Marker({
          position: myPos,
          map: self.map
        });
        var contentstring = self.createContentString(pos); //console.log(contentstring, pos);

        var infowindow = new google.maps.InfoWindow({
          content: contentstring
        });
        marker.addListener('click', function () {
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
      return this.geocoder.geocode({
        'address': address
      }, function (results, status) {
        if (status == 'OK') {
          return results[0].geometry.location;
        } else {
          return false;
        }
      });
    },

    openViewModal(data) {
      this.$fluro.global.view(data, true);
    },

    openEditModal(data) {
      this.$fluro.global.edit(data, true);
    },

    createContentString(obj) {
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
    }

  },
  watch: {
    floatPositions: function (val) {
      return this.markersUpdated();
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { ref: "map", staticClass: "google-map" })
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-103b88b1_0", { source: "\n.google-map[data-v-103b88b1] {\n    width: 100%;\n    height: 100%;\n    background: gray;\n}\n", map: {"version":3,"sources":["C:\\Users\\User\\Documents\\fluro\\fluro-vue-ui\\src\\components\\content\\event\\LocationViewMapComponent.vue"],"names":[],"mappings":";AAiOA;IACA,WAAA;IACA,YAAA;IACA,gBAAA;AACA","file":"LocationViewMapComponent.vue","sourcesContent":["<template>\n    <div class=\"google-map\" ref=\"map\"></div>\n</template>\n<script>\nimport Vue from 'vue';\nimport _ from 'lodash';\nimport MarkerClusterer from '@google/markerclusterer';\n\nexport default {\n    name: 'google-map',\n    props: {\n        positions: {\n            type: Array,\n            default: [],\n        },\n    },\n    data: function() {\n        return {\n            map: null,\n            bounds: null,\n            loading: true,\n            markers: null,\n            markerCluster: null,\n            geocoder: null,\n            contentStringModel: [false, false],\n        }\n    },\n    mounted() {\n    \twindow.openEditModal = this.openEditModal;\n        window.openViewModal = this.openViewModal;\n        this.initMaps();\n    },\n    computed: {\n        floatPositions() {\n            var self = this;\n            return _.chain(self.positions)\n                .filter(function(pos) {\n                    if (parseFloat(pos.latitude) && parseFloat(pos.longitude)) {\n                        return true;\n                    } else if (pos.addressLine1) {\n                        console.log('FETCHING GEOCODE');\n                        var address = [pos.addressLine1, pos.addressLine2, pos.suburb, pos.state, pos.postalCode, pos.country];\n                        return geocodeAddress(address.join(' '));\n                    } else {\n                        return false;\n                    }\n                })\n                .map(function(pos) {\n                    return {\n                        _id: pos._id,\n                        title: pos.title,\n                        _type: pos._type,\n                        addressLine1: pos.addressLine1,\n                        addressLine2: pos.addressLine2,\n                        suburb: pos.suburb,\n                        state: pos.state,\n                        postalCode: pos.postalCode,\n                        country: pos.country,\n                        latitude: parseFloat(pos.latitude),\n                        longitude: parseFloat(pos.longitude),\n                    };\n                })\n                .value();\n        }\n    },\n    methods: {\n        initMaps() {\n\n            var self = this;\n\n            self.$fluro.utils.injectScript(`https://maps.googleapis.com/maps/api/js?key=${self.$fluro.global.googleMapsAPIKey}`)\n                .then(function(res) {\n\n                    var element = self.$refs.map;\n                    if (!element) {\n                        return;\n                    }\n\n                    ///////////////////////////////////////////\n\n\n                    self.bounds = new google.maps.LatLngBounds();\n                    self.geocoder = new google.maps.Geocoder();\n                    var myCenter\n                    if (self.floatPositions.length) {\n                        myCenter = new google.maps.LatLng(self.floatPositions[0].latitude, self.floatPositions[0].longitude);\n                    }\n                    else {\n                        myCenter = new google.maps.LatLng(-37.8150634, 144.9616192);\n                    }\n                    var options = {\n                        zoom: 15,\n                        mapTypeId: google.maps.MapTypeId.ROADMAP,\n                        disableDefaultUI: !1,\n                        maxZoom: 18,\n                        scrollwheel: !1,\n                        draggable: !0,\n                        center: myCenter\n                    }\n                    self.map = new google.maps.Map(element, options);\n                    self.initMarkers();\n                });\n        },\n        initMarkers() {\n            var self = this;\n            // create new markers\n            self.markers = _.map(self.floatPositions, function(pos) {\n                var myPos = new google.maps.LatLng(pos.latitude, pos.longitude);\n                self.bounds.extend(myPos);\n                var marker = new google.maps.Marker({\n                    position: myPos,\n                    map: self.map\n                });\n                var contentstring = self.createContentString(pos);\n                //console.log(contentstring, pos);\n                var infowindow = new google.maps.InfoWindow({\n                    content: contentstring\n                });\n                marker.addListener('click', function() {\n                    infowindow.open(self.map, marker);\n                });\n                return marker;\n            });\n\n            self.markerCluster = new MarkerClusterer(self.map, self.markers, {\n                maxZoom: 20,\n                imagePath: \"https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m\"\n            });\n            self.map.fitBounds(self.bounds);\n            self.map.panToBounds(self.bounds);\n        },\n        markersUpdated() {\n            var self = this;\n            if (!self.markers) {\n                return;\n            }\n            //console.log('Updating Markers');\n            // clear old markers\n            google.maps.event.clearListeners(self.map, 'click');\n            self.markers = null;\n            self.markerCluster.clearMarkers();\n            self.markers = _.map(self.floatPositions, function(pos) {\n                var myPos = new google.maps.LatLng(pos.latitude, pos.longitude);\n                self.bounds.extend(myPos);\n                var marker = new google.maps.Marker({\n                    position: myPos,\n                    map: self.map\n                });\n                var contentstring = self.createContentString(pos);\n                //console.log(contentstring, pos);\n                var infowindow = new google.maps.InfoWindow({\n                    content: contentstring\n                });\n                marker.addListener('click', function() {\n                    infowindow.open(self.map, marker);\n                });\n                return marker;\n            });\n\n            self.markerCluster = new MarkerClusterer(self.map, self.markers, {\n                maxZoom: 20,\n                imagePath: \"https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m\"\n            });\n            self.map.fitBounds(self.bounds);\n            self.map.panToBounds(self.bounds);\n        },\n        geocodeAddress(address) {\n            return this.geocoder.geocode({ 'address': address }, function(results, status) {\n                if (status == 'OK') {\n                    return results[0].geometry.location;\n                } else {\n                    return false;\n                }\n            });\n        },\n        openViewModal(data) {\n            this.$fluro.global.view(data, true)\n        },\n        openEditModal(data) {\n            this.$fluro.global.edit(data, true)\n        },\n        createContentString(obj) {\n            var self = this;\n            var text = \"<div>\";\n            var item;\n            if (obj._type == \"family\") {\n                text += \"<h5>\" + _.startCase(obj.title) + \" Household</h5>\";\n                item = obj.address;\n            } else {\n                text += \"<h5>\" + obj.title + \"</h5>\";\n                item = obj;\n            }\n\n            text += \"<p>\";\n            if (item.addressLine1) {\n                text += item.addressLine1 + \"<br/>\";\n            }\n            if (item.addressLine2) {\n                text += item.addressLine2 + \"<br/>\";\n            }\n            if (item.suburb) {\n                text += item.suburb + \"<br/>\";\n            }\n            if (item.state) {\n                text += item.state + \"<br/>\";\n            }\n            if (item.postalCode) {\n                text += item.postalCode + \"<br/>\";\n            }\n            if (item.country) {\n                text += item.country + \"<br/>\";\n            }\n\n            text += \"</p><button type='button' onClick='openViewModal(`\" + obj._id + \"`)' class='v-btn v-btn--flat theme--light'><div class='v-btn__content'>View</div></button><button type='button' onClick='openEditModal(`\" + obj._id + \"`)' class='v-btn v-btn--flat theme--light'><div class='v-btn__content'>Edit</div></button></div>\";\n            return text;\n        },\n    },\n    watch: {\n        floatPositions: function(val) {\n            return this.markersUpdated();\n        },\n    }\n};\n</script>\n<style scoped>\n.google-map {\n    width: 100%;\n    height: 100%;\n    background: gray;\n}\n</style>"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-103b88b1";
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    __vue_create_injector__,
    undefined,
    undefined
  );

//
var script$1 = {
  components: {
    SearchInput,
    AvatarCell,
    FluroTable
  },
  props: {
    event: {
      type: [Object, String]
    }
  },
  watch: {
    search: _.debounce(function (v) {
      this.debouncedSearch = v;
    }, 300)
  },

  data() {
    return {
      search: '',
      debouncedSearch: '',
      loading: true,
      columns: [{
        title: '',
        key: '_id',
        renderer: AvatarCell,
        align: 'center'
      }, {
        title: 'First Name',
        key: 'firstName'
      }, {
        title: 'Last Name',
        key: 'lastName'
      }, {
        title: 'Age',
        key: 'age'
      }, {
        title: 'Gender',
        key: 'gender'
      } // {
      //     title: 'State',
      //     key: 'state',
      //     renderer: StatusCell,
      // },
      // {
      //     title: 'Info',
      //     key: 'correspondenceID',
      //     renderer: InfoCell,
      // },
      ]
    };
  },

  computed: {
    filtered() {
      var self = this;
      var filtered = self.guests;

      if (self.debouncedSearch && self.debouncedSearch.length) {
        filtered = _.filter(filtered, function (item) {
          return _.includes(item.searchString, self.debouncedSearch);
        });
      }

      return filtered;
    },

    segments() {
      return _.chain(this.filtered).reduce(function (set, guest) {
        if (guest.attendance.guestExpected) {
          set['expected'].contacts.push(guest);
        }

        if (guest.attendance.guestConfirmed) {
          set['confirmed'].contacts.push(guest);
        }

        if (guest.attendance.guestDeclined) {
          set['declined'].contacts.push(guest);
        }

        if (guest.attendance.ticket) {
          set['ticket'].contacts.push(guest);
        }

        if (guest.attendance.checkin) {
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
        }
      }).values().filter(function (segment) {
        return segment.contacts.length;
      }).value();
    },

    eventID() {
      return this.$fluro.utils.getStringID(this.event);
    }

  },
  asyncComputed: {
    guests: {
      default: [],

      get() {
        var self = this;
        self.loading = true;
        return new Promise(function (resolve, reject) {
          return self.$fluro.api.get(`/event/${self.eventID}/guestlist`).then(function (res) {
            var results = _.map(res.data, function (item) {
              item.searchString = String(`${item.title} ${item.firstName} ${item.lastName} ${item.preferredName} ${item.lastName} ${item.age} ${item.gender}`).toLowerCase();
              return item;
            });

            resolve(results);
            self.loading = false;
          }).catch(function (err) {
            reject(err);
            self.loading = false;
          });
        });
      }

    }
  }
};

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    [
      _vm.loading
        ? _c("fluro-page-preloader", { attrs: { contain: "" } })
        : _vm._e(),
      _vm._v(" "),
      _c(
        "fluro-panel",
        [
          _c("fluro-panel-title", [_c("h5", [_vm._v("Guest List")])]),
          _vm._v(" "),
          _c(
            "fluro-panel-body",
            { staticClass: "border-bottom" },
            [
              _c(
                "v-layout",
                [
                  _c(
                    "v-flex",
                    [
                      _c("search-input", {
                        model: {
                          value: _vm.search,
                          callback: function($$v) {
                            _vm.search = $$v;
                          },
                          expression: "search"
                        }
                      })
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "tabset",
            { attrs: { justified: true } },
            _vm._l(_vm.segments, function(segment) {
              return _c(
                "tab",
                {
                  attrs: {
                    heading: segment.contacts.length + " " + segment.title
                  }
                },
                [
                  _vm.segments.length <= 1
                    ? _c(
                        "v-container",
                        { staticClass: "border-bottom", attrs: { pa2: "" } },
                        [
                          _c("h3", { attrs: { margin: "" } }, [
                            _vm._v(
                              _vm._s(segment.contacts.length) +
                                " " +
                                _vm._s(segment.title)
                            )
                          ])
                        ]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _c("fluro-table", {
                    staticStyle: { "max-height": "50vh" },
                    attrs: {
                      trackingKey: "_id",
                      defaultSort: "firstName",
                      pageSize: 35,
                      items: segment.contacts,
                      columns: _vm.columns
                    }
                  })
                ],
                1
              )
            }),
            1
          )
        ],
        1
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = function (inject) {
    if (!inject) return
    inject("data-v-704f2bb6_0", { source: "/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n\n/*# sourceMappingURL=GuestList.vue.map */", map: {"version":3,"sources":["C:\\Users\\User\\Documents\\fluro\\fluro-vue-ui\\src\\components\\content\\event\\GuestList.vue","GuestList.vue"],"names":[],"mappings":"AA2MA,GAAA;AAYA;EACA,yCAAA;ACrNA;ADwNA;EACA,2CAAA;ACrNA;ADwNA;EACA,4CAAA;ACrNA;ADwNA;EACA,0CAAA;ACrNA;;AD6NA,GAAA;;ACzNA,wCAAwC","file":"GuestList.vue","sourcesContent":["<template>\n    <div>\n        <fluro-page-preloader v-if=\"loading\" contain />\n        <fluro-panel>\n            <fluro-panel-title>\n                <h5>Guest List</h5>\n            </fluro-panel-title>\n            <fluro-panel-body class=\"border-bottom\">\n                <v-layout>\n                    <v-flex>\n                        <search-input v-model=\"search\" />\n                    </v-flex>\n                    <!-- <div> -->\n                        <!-- <v-btn @click=\"push()\" color=\"primary\" class=\"ma-0 ml-2\">Push -->\n                            <!-- <fluro-icon icon=\"plus\" right /> -->\n                        <!-- </v-btn> -->\n                    <!-- </div> -->\n                </v-layout>\n            </fluro-panel-body>\n            <tabset :justified=\"true\">\n                <tab :heading=\"`${segment.contacts.length} ${segment.title}`\" v-for=\"segment in segments\">\n                    <v-container pa2 class=\"border-bottom\" v-if=\"segments.length <= 1\">\n                        <h3 margin>{{segment.contacts.length}} {{segment.title}}</h3>\n                    </v-container>\n                    <fluro-table trackingKey=\"_id\" defaultSort=\"firstName\" :pageSize=\"35\" style=\"max-height:50vh;\" :items=\"segment.contacts\" :columns=\"columns\" />\n                </tab>\n            </tabset>\n        </fluro-panel>\n    </div>\n</template>\n<script>\nimport SearchInput from 'src/components/ui/SearchInput.vue';\nimport AvatarCell from 'src/components/table/cells/AvatarCell.vue';\nimport FluroTable from 'src/components/table/FluroTable.vue';\nimport _ from 'lodash';\n\n\nexport default {\n    components: {\n        SearchInput,\n        AvatarCell,\n        FluroTable,\n    },\n    props: {\n        event: {\n            type: [Object, String],\n        }\n    },\n    watch:{\n    \tsearch:_.debounce(function(v) {\n    \t\tthis.debouncedSearch = v;\n    \t}, 300),\n    },\n    data() {\n        return {\n        \tsearch:'',\n        \tdebouncedSearch:'',\n            loading: true,\n            columns: [{\n                    title: '',\n                    key: '_id',\n                    renderer: AvatarCell,\n                    align: 'center',\n                },\n                {\n                    title: 'First Name',\n                    key: 'firstName',\n                },\n                {\n                    title: 'Last Name',\n                    key: 'lastName',\n                },\n                {\n                    title: 'Age',\n                    key: 'age',\n                },\n                {\n                    title: 'Gender',\n                    key: 'gender',\n                },\n                // {\n                //     title: 'State',\n                //     key: 'state',\n                //     renderer: StatusCell,\n                // },\n                // {\n                //     title: 'Info',\n                //     key: 'correspondenceID',\n                //     renderer: InfoCell,\n                // },\n            ],\n        }\n    },\n    computed: {\n    \tfiltered() {\n    \t\tvar self = this;\n    \t\tvar filtered = self.guests;\n\n    \t\tif(self.debouncedSearch && self.debouncedSearch.length) {\n    \t\t\tfiltered = _.filter(filtered, function(item) {\n    \t\t\t\treturn _.includes(item.searchString, self.debouncedSearch);\n    \t\t\t})\n    \t\t}\n\n    \t\treturn filtered;\n    \t},\n        segments() {\n            return _.chain(this.filtered)\n                .reduce(function(set, guest) {\n\n                    if (guest.attendance.guestExpected) {\n                        set['expected'].contacts.push(guest);\n                    }\n\n                    if (guest.attendance.guestConfirmed) {\n                        set['confirmed'].contacts.push(guest);\n                    }\n\n                    if (guest.attendance.guestDeclined) {\n                        set['declined'].contacts.push(guest);\n                    }\n\n                    if (guest.attendance.ticket) {\n                        set['ticket'].contacts.push(guest);\n                    }\n\n                    if (guest.attendance.checkin) {\n                        set['checkin'].contacts.push(guest);\n                    } else {\n                        set['absent'].contacts.push(guest);\n                    }\n\n                    return set;\n                }, {\n\n                  \n                    expected: {\n                        title: 'Expected',\n                        contacts: []\n                    },\n                    confirmed: {\n                        title: 'RSVP Yes',\n                        contacts: []\n                    },\n                    declined: {\n                        title: 'RSVP No',\n                        contacts: []\n                    },\n                    ticket: {\n                        title: 'Ticket Holders',\n                        contacts: []\n                    },\n                    checkin: {\n                        title: 'Checked In',\n                        contacts: []\n                    },\n                    absent: {\n                        title: 'Not Checked In',\n                        contacts: []\n                    },\n                })\n                .values()\n                .filter(function(segment) {\n                \treturn segment.contacts.length;\n                })\n                .value();\n        },\n        eventID() {\n            return this.$fluro.utils.getStringID(this.event);\n        },\n    },\n    asyncComputed: {\n        guests: {\n            default: [],\n            get() {\n                var self = this;\n                self.loading = true;\n\n                return new Promise(function(resolve, reject) {\n\n                    return self.$fluro.api.get(`/event/${self.eventID}/guestlist`).then(function(res) {\n\n                            var results = _.map(res.data, function(item) {\n                            \titem.searchString = String(`${item.title} ${item.firstName} ${item.lastName} ${item.preferredName} ${item.lastName} ${item.age} ${item.gender}`).toLowerCase()\t\n                            \treturn item;\n                            });\n\n                            resolve(results);\n                            self.loading = false;\n\n                        })\n                        .catch(function(err) {\n                            reject(err);\n                            self.loading = false;\n                        });\n                })\n            },\n        },\n    },\n}\n</script>\n<style lang=\"scss\">\n\n/**/\r\n\r\n$primary: #2ad4b9;//#0bd6be;\r\n$success: #4cc650; //#4cc673;//\r\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\r\n$danger: #d93e63;\r\n$secondary: #0bd6cd; //#0bd6a3;\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n\r\n.border-top {\r\n    border-top: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-right {\r\n    border-right: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-bottom {\r\n    border-bottom: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-left {\r\n    border-left: 1px solid rgba(#000, 0.05);\r\n}\r\n//////////////////////////////////////////\r\n\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n/**/\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n\n/*# sourceMappingURL=GuestList.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$1 = __vue_normalize__(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    __vue_create_injector__,
    undefined,
    undefined
  );

export { __vue_component__$1 as G, __vue_component__ as L };
//# sourceMappingURL=GuestList-b488d712.js.map
