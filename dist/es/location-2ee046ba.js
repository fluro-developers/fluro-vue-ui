
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { aN as FluroContentForm, bm as __vue_normalize__, bn as __vue_create_injector__, bo as _ } from './index-41ed15cb.js';
import 'vue-range-slider';
import 'vue-range-slider/dist/vue-range-slider.css';
import draggable from 'vuedraggable';
import 'vue-color';
import 'signature_pad';
import 'fluro';
import 'vuex-map-fields';
import 'async';
import 'tippy.js';
import 'tiptap';
import 'tiptap-commands';
import 'tiptap-extensions';
import 'moment';
import { F as FluroContentEditMixin } from './FluroContentEditMixin-830448d6.js';
import { A as AddressManager } from './AddressManager-1c5526fa.js';

//
var script = {
  props: {
    value: {
      type: Array
    }
  },
  components: {
    FluroContentForm,
    draggable
  },

  data() {
    return {
      model: this.value,
      proposed: {},
      dragOptions: {},
      drag: false
    };
  },

  methods: {
    add() {
      var clone = JSON.parse(JSON.stringify(this.proposed));

      if (!clone.title || !clone.title.length) {
        return;
      }

      delete clone.row;
      this.model.push(clone);
      this.proposed = {};
    },

    remove(index) {
      this.model.splice(index, 1);
    }

  },
  computed: {
    fields() {
      var array = []; ///////////////////////////////////

      addField('row', {
        type: 'group',
        sameLine: true,
        fields: [{
          title: 'Room Name',
          minimum: 1,
          maximum: 1,
          type: 'string',
          key: 'title'
        }, {
          title: 'Description/Directions',
          minimum: 0,
          maximum: 1,
          type: 'string',
          key: 'description'
        } // {
        //     title: 'Add',
        //     minimum: 0,
        //     maximum: 1,
        //     type: 'string',
        //     key:'description',
        //     // customComponent:MyVueComponent
        // }
        ]
      }); // addField('title', {
      //     title: 'Room Title',
      //     minimum: 1,
      //     maximum: 1,
      //     type: 'string',
      // });
      // addField('description', {
      //     title: 'Description',
      //     minimum: 0,
      //     maximum: 1,
      //     type: 'string',
      // });
      ///////////////////////////////////

      function addField(key, details) {
        details.key = key;
        array.push(details);
      }

      return array;
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
  return _c(
    "div",
    [
      _c(
        "list-group",
        [
          _c(
            "draggable",
            _vm._b(
              {
                attrs: {
                  list: _vm.model,
                  "ghost-class": "ghost-dragging-class"
                },
                on: {
                  start: function($event) {
                    _vm.drag = true;
                  },
                  end: function($event) {
                    _vm.drag = false;
                  }
                }
              },
              "draggable",
              _vm.dragOptions,
              false
            ),
            _vm._l(_vm.model, function(room, index) {
              return _c(
                "list-group-item",
                [
                  _c(
                    "v-layout",
                    { attrs: { "align-center": "" } },
                    [
                      _c("v-flex", [
                        _c("strong", [_vm._v(_vm._s(room.title))]),
                        _c("br"),
                        _vm._v(" "),
                        _c(
                          "span",
                          {
                            staticClass: "muted",
                            staticStyle: { "padding-bottom": "0px" }
                          },
                          [_vm._v(_vm._s(room.description))]
                        )
                      ]),
                      _vm._v(" "),
                      _c(
                        "v-flex",
                        { attrs: { shrink: "" } },
                        [
                          _c(
                            "v-btn",
                            {
                              on: {
                                click: function($event) {
                                  return _vm.remove(index)
                                }
                              }
                            },
                            [_c("fluro-icon", { attrs: { icon: "times" } })],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              )
            }),
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "fluro-panel",
        [
          _c("fluro-panel-title", [_vm._v("Add a room")]),
          _vm._v(" "),
          _c("fluro-panel-body", [
            _c(
              "form",
              {
                on: {
                  submit: function($event) {
                    $event.preventDefault();
                    $event.stopPropagation();
                    return _vm.add()
                  }
                }
              },
              [
                _c(
                  "v-layout",
                  [
                    _c(
                      "v-flex",
                      [
                        _c("fluro-content-form", {
                          ref: "form",
                          attrs: { fields: _vm.fields },
                          model: {
                            value: _vm.proposed,
                            callback: function($$v) {
                              _vm.proposed = $$v;
                            },
                            expression: "proposed"
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "v-flex",
                      { attrs: { shrink: "" } },
                      [
                        _c(
                          "v-btn",
                          {
                            attrs: { type: "submit" },
                            on: {
                              click: function($event) {
                                return _vm.add()
                              }
                            }
                          },
                          [_vm._v("Add")]
                        )
                      ],
                      1
                    )
                  ],
                  1
                )
              ],
              1
            )
          ])
        ],
        1
      )
    ],
    1
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-6e5d50b8_0", { source: "/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.ghost-dragging-class {\n  opacity: 0.5;\n  background: #c8ebfb;\n}\n\n/*# sourceMappingURL=RoomManager.vue.map */", map: {"version":3,"sources":["C:\\Users\\User\\Documents\\fluro\\fluro-vue-ui\\src\\components\\content\\edit\\components\\RoomManager.vue","RoomManager.vue"],"names":[],"mappings":"AA+JA,GAAA;AAYA;EACA,yCAAA;ACzKA;AD4KA;EACA,2CAAA;ACzKA;AD4KA;EACA,4CAAA;ACzKA;AD4KA;EACA,0CAAA;ACzKA;;ADiLA,GAAA;AACA;EACA,YAAA;EACA,mBAAA;AC9KA;;AAEA,0CAA0C","file":"RoomManager.vue","sourcesContent":["<template>\n    <div>\n        <list-group>\n            <draggable :list=\"model\" v-bind=\"dragOptions\" ghost-class=\"ghost-dragging-class\" @start=\"drag=true\" @end=\"drag=false\">\n                <list-group-item v-for=\"(room, index) in model\">\n                    <v-layout align-center>\n                        <v-flex>\n                            <strong>{{room.title}}</strong><br>\n                            <span class=\"muted\" style=\"padding-bottom:0px\">{{room.description}}</span>\n                        </v-flex>\n                        <v-flex shrink>\n                            <v-btn @click=\"remove(index)\">\n                                <fluro-icon icon=\"times\" />\n                            </v-btn>\n                        </v-flex>\n                    </v-layout>\n                </list-group-item>\n            </draggable>\n        </list-group>\n        <fluro-panel>\n            <fluro-panel-title>Add a room</fluro-panel-title>\n            <fluro-panel-body>\n                <form @submit.prevent.stop=\"add()\">\n                    <v-layout>\n                        <v-flex>\n                            <fluro-content-form ref=\"form\" v-model=\"proposed\" :fields=\"fields\" /> <!-- :options=\"options\" -->\n                        </v-flex>\n                        <v-flex shrink>\n                            <v-btn type=\"submit\" @click=\"add()\">Add</v-btn>\n                        </v-flex>\n                    </v-layout>\n                </form>\n            </fluro-panel-body>\n        </fluro-panel>\n        <!-- <pre>{{proposed}}</pre> -->\n        <!-- <v-layout>\n            <v-flex xs12 sm5>\n                <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.title\" v-model=\"model\"></fluro-content-form-field>\n            </v-flex>\n            <v-flex xs12 sm5>\n                <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.title\" v-model=\"model\"></fluro-content-form-field>\n            </v-flex>\n            <v-flex xs12 sm2>\n                <v-btn>Add</v-btn>\n            </v-flex>\n        </v-layout> -->\n    </div>\n</template>\n<script>\nimport FluroContentForm from 'src/components/form/FluroContentForm.vue';\nimport draggable from 'vuedraggable';\n\n\nexport default {\n    props: {\n        value: {\n            type: Array,\n        }\n    },\n    components: {\n        FluroContentForm,\n        draggable,\n\n    },\n    data() {\n        return {\n            model: this.value,\n            proposed: {},\n            dragOptions: {},\n            drag: false,\n        }\n    },\n    methods: {\n        add() {\n\n\n            var clone = JSON.parse(JSON.stringify(this.proposed));\n\n            if (!clone.title || !clone.title.length) {\n                return;\n            }\n\n            delete clone.row;\n\n\n\n            this.model.push(clone);\n\n            this.proposed = {};\n        },\n        remove(index) {\n            this.model.splice(index, 1);\n        }\n    },\n    computed: {\n        fields() {\n\n\n            var self = this;\n            var array = [];\n\n            ///////////////////////////////////\n\n            addField('row', {\n                type: 'group',\n                sameLine: true,\n                fields: [{\n                        title: 'Room Name',\n                        minimum: 1,\n                        maximum: 1,\n                        type: 'string',\n                        key: 'title',\n                    },\n                    {\n                        title: 'Description/Directions',\n                        minimum: 0,\n                        maximum: 1,\n                        type: 'string',\n                        key: 'description',\n                    },\n                    // {\n                    //     title: 'Add',\n                    //     minimum: 0,\n                    //     maximum: 1,\n                    //     type: 'string',\n                    //     key:'description',\n                    //     // customComponent:MyVueComponent\n                    // }\n                ]\n            });\n\n            // addField('title', {\n            //     title: 'Room Title',\n            //     minimum: 1,\n            //     maximum: 1,\n            //     type: 'string',\n            // });\n\n            // addField('description', {\n            //     title: 'Description',\n            //     minimum: 0,\n            //     maximum: 1,\n            //     type: 'string',\n            // });\n\n            ///////////////////////////////////\n\n            function addField(key, details) {\n                details.key = key;\n                array.push(details)\n            }\n\n            return array;\n        }\n    }\n}\n</script>\n<style lang=\"scss\">\n\n/**/\r\n\r\n$primary: #2ad4b9;//#0bd6be;\r\n$success: #4cc650; //#4cc673;//\r\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\r\n$danger: #d93e63;\r\n$secondary: #0bd6cd; //#0bd6a3;\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n\r\n.border-top {\r\n    border-top: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-right {\r\n    border-right: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-bottom {\r\n    border-bottom: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-left {\r\n    border-left: 1px solid rgba(#000, 0.05);\r\n}\r\n//////////////////////////////////////////\r\n\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n/**/\n.ghost-dragging-class {\n    opacity: 0.5;\n    background: #c8ebfb;\n}\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.ghost-dragging-class {\n  opacity: 0.5;\n  background: #c8ebfb;\n}\n\n/*# sourceMappingURL=RoomManager.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = undefined;
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
  name: 'google-map',
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data: function () {
    return {
      model: this.value,
      map: null,
      bounds: null,
      loading: true,
      marker: null
    };
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
        var options = {
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: !1,
          maxZoom: 18,
          scrollwheel: !1,
          draggable: !0,
          center: new google.maps.LatLng(self.lat, self.lng)
        };
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
        draggable: true
      });
      self.bounds.extend(position);
      self.marker.setMap(self.map); //self.map.fitBounds(self.bounds);

      self.map.panToBounds(self.bounds);
      self.loading = false;
      google.maps.event.addListener(self.marker, 'dragend', function (event) {
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

      console.log('Updating Markers'); // clear old marker

      self.marker.setMap(null);
      self.marker = null; // create new marker

      var position = new google.maps.LatLng(self.lat, self.lng);
      self.marker = new google.maps.Marker({
        position,
        map: self.map,
        draggable: true
      });
      self.marker.setMap(self.map);
      self.bounds = null;
      self.bounds = new google.maps.LatLngBounds();
      self.bounds.extend(position);
      self.map.fitBounds(self.bounds);
      self.map.panToBounds(self.bounds); //self.map.setCenter(self.bounds.getCenter());

      google.maps.event.addListener(self.marker, 'dragend', function (event) {
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
    }

  },
  watch: {
    lat: function (val) {
      if (val) {
        return this.markersUpdated();
      }
    },
    lng: function (val) {
      if (val) {
        return this.markersUpdated();
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
  return _c("div", { ref: "map", staticClass: "google-map" })
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = function (inject) {
    if (!inject) return
    inject("data-v-6616db8a_0", { source: "\n.google-map[data-v-6616db8a] {\n    width: 100%;\n    height: 100%;\n    background: gray;\n}\n", map: {"version":3,"sources":["C:\\Users\\User\\Documents\\fluro\\fluro-vue-ui\\src\\components\\content\\edit\\components\\LocationEditMapComponent.vue"],"names":[],"mappings":";AAwJA;IACA,WAAA;IACA,YAAA;IACA,gBAAA;AACA","file":"LocationEditMapComponent.vue","sourcesContent":["<template>\n    <div class=\"google-map\" ref=\"map\"></div>\n</template>\n<script>\n\n\nimport _ from 'lodash';\n\n\nexport default {\n    name: 'google-map',\n    props: {\n        value: {\n            type: Object,\n            required: true,\n        },\n    },\n    data: function() {\n        return {\n            model: this.value,\n            map: null,\n            bounds: null,\n            loading: true,\n            marker: null,\n        }\n    },\n    mounted() {\n        var self = this;\n        if (!_.get(self.model, 'longitude')) {\n            self.model.longitude = \"144.9616192\";\n            self.model.latitude = \"-37.8150634\";\n        }\n        this.initMaps();\n    },\n    computed: {\n        lng() {\n            return parseFloat(this.model.longitude);\n        },\n        lat() {\n            return parseFloat(this.model.latitude);\n        },\n    },\n    methods: {\n        initMaps() {\n\n            var self = this;\n\n            self.$fluro.utils.injectScript(`https://maps.googleapis.com/maps/api/js?key=${self.$fluro.global.googleMapsAPIKey}`)\n                .then(function(res) {\n\n                    var element = self.$refs.map;\n                    if (!element) {\n                        return;\n                    }\n\n                    ///////////////////////////////////////////\n\n\n                    self.bounds = new google.maps.LatLngBounds();\n                    var options = {\n                        zoom: 15,\n                        mapTypeId: google.maps.MapTypeId.ROADMAP,\n                        disableDefaultUI: !1,\n                        maxZoom: 18,\n                        scrollwheel: !1,\n                        draggable: !0,\n                        center: new google.maps.LatLng(self.lat, self.lng)\n                    }\n                    self.map = new google.maps.Map(element, options);\n                    self.initMarkers();\n                });\n        },\n        initMarkers() {\n            var self = this;\n            var position = new google.maps.LatLng(self.lat, self.lng);\n            self.marker = new google.maps.Marker({\n                position,\n                map: self.map,\n                draggable: true,\n            });\n\n            self.bounds.extend(position);\n\n            self.marker.setMap(self.map);\n            //self.map.fitBounds(self.bounds);\n            self.map.panToBounds(self.bounds);\n            self.loading = false;\n            google.maps.event.addListener(self.marker, 'dragend', function(event) {\n                console.log('DRAG END');\n                self.model.latitude = event.latLng.lat();\n                self.model.longitude = event.latLng.lng();\n                google.maps.event.clearListeners(self.marker, 'dragend');\n                self.markersUpdated();\n            });\n        },\n        markersUpdated() {\n            var self = this;\n            if (!self.marker) {\n                return;\n            }\n            console.log('Updating Markers');\n            // clear old marker\n            self.marker.setMap(null);\n            self.marker = null;\n\n            // create new marker\n            var position = new google.maps.LatLng(self.lat, self.lng);\n            self.marker = new google.maps.Marker({\n                position,\n                map: self.map,\n                draggable: true,\n            });\n\n            self.marker.setMap(self.map);\n\n            self.bounds = null;\n            self.bounds = new google.maps.LatLngBounds();\n            self.bounds.extend(position);\n\n            self.map.fitBounds(self.bounds);\n            self.map.panToBounds(self.bounds);\n\n            //self.map.setCenter(self.bounds.getCenter());\n\n            google.maps.event.addListener(self.marker, 'dragend', function(event) {\n                console.log('DRAG END');\n                self.model.latitude = event.latLng.lat();\n                self.model.longitude = event.latLng.lng();\n                google.maps.event.clearListeners(self.marker, 'dragend');\n                self.markersUpdated();\n            });\n        },\n        debouncedUpdate() {\n            var self = this;\n            return _.debounce(self.markersUpdated, 1000);\n        },\n    },\n    watch: {\n        lat: function(val) {\n            if (val) {\n                return this.markersUpdated();\n            }\n        },\n        lng: function(val) {\n            if (val) {\n                return this.markersUpdated();\n            }\n        },\n    }\n};\n</script>\n<style scoped>\n.google-map {\n    width: 100%;\n    height: 100%;\n    background: gray;\n}\n</style>"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$1 = "data-v-6616db8a";
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

//
var script$2 = {
  props: {
    value: {
      type: Array
    }
  },
  components: {
    draggable
  },

  data() {
    return {
      model: this.value,
      proposed: {},
      dragOptions: {},
      drag: false
    };
  },

  methods: {
    add() {
      var clone = JSON.parse(JSON.stringify(this.proposed));

      if (!clone.position || !clone.position.length) {
        return;
      }

      delete clone.row;
      this.model.push(clone);
      this.proposed = {};
    },

    remove(index) {
      this.model.splice(index, 1);
    }

  },
  computed: {
    fields() {
      var array = []; ///////////////////////////////////

      addField('row', {
        type: 'group',
        sameLine: true,
        fields: [{
          title: 'Position/Title',
          minimum: 1,
          maximum: 1,
          type: 'string',
          key: 'position'
        }, {
          title: 'Description/Directions',
          minimum: 0,
          maximum: 0,
          type: 'reference',
          key: 'contacts',
          params: {
            restrictType: 'contact'
          }
        } // {
        //  title: 'Add',
        //  minimum: 0,
        //  maximum: 1,
        //  type: 'string',
        //  key:'description',
        //  // customComponent:MyVueComponent
        // }
        ]
      }); // addField('title', {
      //  title: 'Room Title',
      //  minimum: 1,
      //  maximum: 1,
      //  type: 'string',
      // });
      // addField('description', {
      //  title: 'Description',
      //  minimum: 0,
      //  maximum: 1,
      //  type: 'string',
      // });
      ///////////////////////////////////

      function addField(key, details) {
        details.key = key;
        array.push(details);
      }

      return array;
    }

  }
};

/* script */
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    [
      _c(
        "list-group",
        [
          _c(
            "draggable",
            _vm._b(
              {
                attrs: {
                  list: _vm.model,
                  "ghost-class": "ghost-dragging-class"
                },
                on: {
                  start: function($event) {
                    _vm.drag = true;
                  },
                  end: function($event) {
                    _vm.drag = false;
                  }
                }
              },
              "draggable",
              _vm.dragOptions,
              false
            ),
            _vm._l(_vm.model, function(keycontact, index) {
              return _c(
                "list-group-item",
                [
                  _c(
                    "v-layout",
                    { attrs: { "align-center": "" } },
                    [
                      _c("v-flex", [
                        _c("strong", [_vm._v(_vm._s(keycontact.position))])
                      ]),
                      _vm._v(" "),
                      _c(
                        "v-flex",
                        [
                          _c(
                            "list-group",
                            { staticStyle: { "margin-bottom": "0px" } },
                            _vm._l(keycontact.contacts, function(contact) {
                              return _c(
                                "list-group-item",
                                [
                                  _c("fluro-realm-bar", {
                                    attrs: { item: contact.realm }
                                  }),
                                  _vm._v(" "),
                                  _c("fluro-avatar", {
                                    attrs: {
                                      id: contact._id,
                                      type: "contact",
                                      width: 100
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("strong", [
                                    _vm._v(
                                      "\n\t\t\t\t\t\t\t\t\t\t" +
                                        _vm._s(contact.title) +
                                        "\n\t\t\t\t\t\t\t\t\t"
                                    )
                                  ])
                                ],
                                1
                              )
                            }),
                            1
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-flex",
                        { attrs: { shrink: "" } },
                        [
                          _c(
                            "v-btn",
                            {
                              on: {
                                click: function($event) {
                                  return _vm.remove(index)
                                }
                              }
                            },
                            [_c("fluro-icon", { attrs: { icon: "times" } })],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              )
            }),
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "fluro-panel",
        [
          _c("fluro-panel-title", [_vm._v("Add a Key Contact")]),
          _vm._v(" "),
          _c("fluro-panel-body", [
            _c(
              "form",
              {
                on: {
                  submit: function($event) {
                    $event.preventDefault();
                    $event.stopPropagation();
                    return _vm.add()
                  }
                }
              },
              [
                _c(
                  "v-layout",
                  [
                    _c(
                      "v-flex",
                      [
                        _c("fluro-content-form", {
                          ref: "form",
                          attrs: { fields: _vm.fields },
                          model: {
                            value: _vm.proposed,
                            callback: function($$v) {
                              _vm.proposed = $$v;
                            },
                            expression: "proposed"
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "v-flex",
                      { attrs: { shrink: "" } },
                      [
                        _c(
                          "v-btn",
                          {
                            attrs: { type: "submit" },
                            on: {
                              click: function($event) {
                                return _vm.add()
                              }
                            }
                          },
                          [_vm._v("Add")]
                        )
                      ],
                      1
                    )
                  ],
                  1
                )
              ],
              1
            )
          ])
        ],
        1
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  const __vue_inject_styles__$2 = function (inject) {
    if (!inject) return
    inject("data-v-8d043bea_0", { source: "/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.ghost-dragging-class {\n  opacity: 0.5;\n  background: #c8ebfb;\n}\n\n/*# sourceMappingURL=KeyContactLocationManager.vue.map */", map: {"version":3,"sources":["C:\\Users\\User\\Documents\\fluro\\fluro-vue-ui\\src\\components\\content\\edit\\components\\KeyContactLocationManager.vue","KeyContactLocationManager.vue"],"names":[],"mappings":"AAyKA,GAAA;AAYA;EACA,yCAAA;ACnLA;ADsLA;EACA,2CAAA;ACnLA;ADsLA;EACA,4CAAA;ACnLA;ADsLA;EACA,0CAAA;ACnLA;;AD2LA,GAAA;AACA;EACA,YAAA;EACA,mBAAA;ACxLA;;AAEA,wDAAwD","file":"KeyContactLocationManager.vue","sourcesContent":["<template>\n\t<div>\n\t\t<list-group>\n\t\t\t<draggable :list=\"model\" v-bind=\"dragOptions\" ghost-class=\"ghost-dragging-class\" @start=\"drag=true\" @end=\"drag=false\">\n\t\t\t\t<list-group-item v-for=\"(keycontact, index) in model\">\n\t\t\t\t\t<v-layout align-center>\n\t\t\t\t\t\t<v-flex>\n\t\t\t\t\t\t\t<strong>{{keycontact.position}}</strong>\n\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t<v-flex>\n\t\t\t\t\t\t\t<list-group style=\"margin-bottom:0px;\">\n\t\t\t\t\t\t\t\t<list-group-item v-for=\"contact in keycontact.contacts\">\n\t\t\t\t\t\t\t\t\t<fluro-realm-bar :item=\"contact.realm\" />\n\t\t\t\t\t\t\t\t\t<fluro-avatar :id=\"contact._id\" type=\"contact\" :width=\"100\" />\n\t\t\t\t\t\t\t\t\t<strong>\n\t\t\t\t\t\t\t\t\t\t{{contact.title}}\n\t\t\t\t\t\t\t\t\t</strong>\n\t\t\t\t\t\t\t\t</list-group-item>\n\t\t\t\t\t\t\t</list-group>\n\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t<v-flex shrink>\n\t\t\t\t\t\t\t<v-btn @click=\"remove(index)\">\n\t\t\t\t\t\t\t\t<fluro-icon icon=\"times\" />\n\t\t\t\t\t\t\t</v-btn>\n\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t</v-layout>\n\t\t\t\t</list-group-item>\n\t\t\t</draggable>\n\t\t</list-group>\n\t\t<fluro-panel>\n\t\t\t<fluro-panel-title>Add a Key Contact</fluro-panel-title>\n\t\t\t<fluro-panel-body>\n\t\t\t\t<form @submit.prevent.stop=\"add()\">\n\t\t\t\t\t<v-layout>\n\t\t\t\t\t\t<v-flex>\n\t\t\t\t\t\t\t<fluro-content-form ref=\"form\" v-model=\"proposed\" :fields=\"fields\" /> <!-- :options=\"options\" -->\n\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t<v-flex shrink>\n\t\t\t\t\t\t\t<v-btn type=\"submit\" @click=\"add()\">Add</v-btn>\n\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t</v-layout>\n\t\t\t\t</form>\n\t\t\t</fluro-panel-body>\n\t\t</fluro-panel>\n\t\t<!-- <pre>{{proposed}}</pre> -->\n\t\t<!-- <v-layout>\n   <v-flex xs12 sm5>\n\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.title\" v-model=\"model\"></fluro-content-form-field>\n   </v-flex>\n   <v-flex xs12 sm5>\n\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.title\" v-model=\"model\"></fluro-content-form-field>\n   </v-flex>\n   <v-flex xs12 sm2>\n\t<v-btn>Add</v-btn>\n   </v-flex>\n  </v-layout> -->\n\t</div>\n</template>\n<script>\nimport draggable from 'vuedraggable';\n\nexport default {\n\tprops: {\n\t\tvalue: {\n\t\t\ttype: Array,\n\t\t}\n\t},\n\tcomponents: {\n\n\t\tdraggable,\n\n\t},\n\tdata() {\n\t\treturn {\n\t\t\tmodel: this.value,\n\t\t\tproposed: {},\n\t\t\tdragOptions: {},\n\t\t\tdrag: false,\n\t\t}\n\t},\n\tmethods: {\n\t\tadd() {\n\t\t\tvar clone = JSON.parse(JSON.stringify(this.proposed));\n\n\t\t\tif (!clone.position || !clone.position.length) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tdelete clone.row;\n\n\n\n\t\t\tthis.model.push(clone);\n\n\t\t\tthis.proposed = {};\n\t\t},\n\t\tremove(index) {\n\t\t\tthis.model.splice(index, 1);\n\t\t}\n\t},\n\tcomputed: {\n\t\tfields() {\n\n\n\t\t\tvar self = this;\n\t\t\tvar array = [];\n\n\t\t\t///////////////////////////////////\n\n\t\t\taddField('row', {\n\t\t\t\ttype: 'group',\n\t\t\t\tsameLine: true,\n\t\t\t\tfields: [{\n\t\t\t\t\t\ttitle: 'Position/Title',\n\t\t\t\t\t\tminimum: 1,\n\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\ttype: 'string',\n\t\t\t\t\t\tkey: 'position',\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\ttitle: 'Description/Directions',\n\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\tmaximum: 0,\n\t\t\t\t\t\ttype: 'reference',\n\t\t\t\t\t\tkey: 'contacts',\n\t\t\t\t\t\tparams: {\n\t\t\t\t\t\t\trestrictType: 'contact',\n\t\t\t\t\t\t},\n\t\t\t\t\t},\n\t\t\t\t\t// {\n\t\t\t\t\t//  title: 'Add',\n\t\t\t\t\t//  minimum: 0,\n\t\t\t\t\t//  maximum: 1,\n\t\t\t\t\t//  type: 'string',\n\t\t\t\t\t//  key:'description',\n\t\t\t\t\t//  // customComponent:MyVueComponent\n\t\t\t\t\t// }\n\t\t\t\t]\n\t\t\t});\n\n\t\t\t// addField('title', {\n\t\t\t//  title: 'Room Title',\n\t\t\t//  minimum: 1,\n\t\t\t//  maximum: 1,\n\t\t\t//  type: 'string',\n\t\t\t// });\n\n\t\t\t// addField('description', {\n\t\t\t//  title: 'Description',\n\t\t\t//  minimum: 0,\n\t\t\t//  maximum: 1,\n\t\t\t//  type: 'string',\n\t\t\t// });\n\n\t\t\t///////////////////////////////////\n\n\t\t\tfunction addField(key, details) {\n\t\t\t\tdetails.key = key;\n\t\t\t\tarray.push(details)\n\t\t\t}\n\n\t\t\treturn array;\n\t\t}\n\t}\n}\n\n</script>\n<style lang=\"scss\">\n\n/**/\r\n\r\n$primary: #2ad4b9;//#0bd6be;\r\n$success: #4cc650; //#4cc673;//\r\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\r\n$danger: #d93e63;\r\n$secondary: #0bd6cd; //#0bd6a3;\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n\r\n.border-top {\r\n    border-top: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-right {\r\n    border-right: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-bottom {\r\n    border-bottom: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-left {\r\n    border-left: 1px solid rgba(#000, 0.05);\r\n}\r\n//////////////////////////////////////////\r\n\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n/**/\n.ghost-dragging-class {\n\topacity: 0.5;\n\tbackground: #c8ebfb;\n}\n\n</style>\n","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.ghost-dragging-class {\n  opacity: 0.5;\n  background: #c8ebfb;\n}\n\n/*# sourceMappingURL=KeyContactLocationManager.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$2 = undefined;
  /* module identifier */
  const __vue_module_identifier__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$2 = __vue_normalize__(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    false,
    __vue_create_injector__,
    undefined,
    undefined
  );

//

var script$3 = {
  components: {
    AddressManager,
    RoomManager: __vue_component__,
    KeyContactLocationManager: __vue_component__$2,
    LocationEditMapComponent: __vue_component__$1
  },

  created() {},

  mixins: [FluroContentEditMixin],
  computed: {
    fieldsOutput() {
      var array = []; ///////////////////////////////////

      addField('title', {
        title: 'Title',
        placeholder: 'Location Name',
        minimum: 1,
        maximum: 1,
        type: 'string'
      }); ///////////////////////////////////

      addField('phoneNumbers', {
        title: 'Phone Numbers',
        minimum: 0,
        maximum: 0,
        type: 'string'
      });
      addField('emails', {
        title: 'Emails',
        minimum: 0,
        maximum: 0,
        type: 'string'
      }); ///////////////////////////////////

      addField('longitude', {
        title: 'Longitude',
        minimum: 0,
        maximum: 1,
        type: 'string'
      });
      addField('latitude', {
        title: 'Latitude',
        minimum: 0,
        maximum: 1,
        type: 'string'
      }); ///////////////////////////////////

      function addField(key, details) {
        details.key = key;
        array.push(details);
      }

      return array;
    },

    geocodeAddress() {
      var self = this;
      var model = self.model;
      return model.addressLine1 + ', ' + model.suburb + ', ' + model.state + ' ' + model.postalCode + ' ' + model.country;
    },

    title() {
      var self = this;
      return _.get(self.model, 'title') || '';
    }

  },
  methods: {
    getLatLong() {
      var self = this;

      if (!self.model.longitude && !self.model.latitude) {
        var axios = self.$fluro.api.axios;
        axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
          params: {
            key: self.$fluro.global.googleMapsAPIKey,
            address: self.geocodeAddress
          }
        }).then(function (res) {
          console.log('GOT REQUEST', res);

          if (res.data.status == 'OK' && res.data.results && res.data.results.length) {
            var location = _.get(res.data.results[0], 'geometry.location');

            console.log('VALID REQUEST', location);

            if (location) {
              self.model.latitude = location.lat;
              self.model.longitude = location.lng;
            }
          }
        });
      }
    }

  },

  data() {
    return {};
  }

};

/* script */
const __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "flex-column",
    [
      _vm.loading
        ? [_c("fluro-page-preloader", { attrs: { contain: "" } })]
        : [
            _c(
              "tabset",
              { attrs: { justified: true, vertical: true } },
              [
                _c(
                  "tab",
                  { attrs: { heading: "Details" } },
                  [
                    _c(
                      "flex-column-body",
                      { staticStyle: { background: "#fafafa" } },
                      [
                        _c(
                          "v-container",
                          { attrs: { fluid: "", "grid-list-lg": "" } },
                          [
                            _c(
                              "constrain",
                              { attrs: { sm: "" } },
                              [
                                _c(
                                  "v-layout",
                                  { attrs: { row: "", wrap: "" } },
                                  [
                                    _c(
                                      "v-flex",
                                      { attrs: { xs12: "", sm12: "" } },
                                      [
                                        _c("fluro-content-form-field", {
                                          attrs: {
                                            "form-fields": _vm.formFields,
                                            outline: _vm.showOutline,
                                            options: _vm.options,
                                            field: _vm.fieldHash.title
                                          },
                                          on: { input: _vm.update },
                                          model: {
                                            value: _vm.model,
                                            callback: function($$v) {
                                              _vm.model = $$v;
                                            },
                                            expression: "model"
                                          }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "v-flex",
                                      { attrs: { xs12: "", sm6: "" } },
                                      [
                                        _c("fluro-content-form-field", {
                                          attrs: {
                                            "form-fields": _vm.formFields,
                                            outline: _vm.showOutline,
                                            options: _vm.options,
                                            field: _vm.fieldHash.emails
                                          },
                                          on: { input: _vm.update },
                                          model: {
                                            value: _vm.model,
                                            callback: function($$v) {
                                              _vm.model = $$v;
                                            },
                                            expression: "model"
                                          }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "v-flex",
                                      { attrs: { xs12: "", sm6: "" } },
                                      [
                                        _c("fluro-content-form-field", {
                                          attrs: {
                                            "form-fields": _vm.formFields,
                                            outline: _vm.showOutline,
                                            options: _vm.options,
                                            field: _vm.fieldHash.phoneNumbers
                                          },
                                          on: { input: _vm.update },
                                          model: {
                                            value: _vm.model,
                                            callback: function($$v) {
                                              _vm.model = $$v;
                                            },
                                            expression: "model"
                                          }
                                        })
                                      ],
                                      1
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "v-flex",
                                      { attrs: { xs12: "", sm12: "" } },
                                      [
                                        _c(
                                          "fluro-panel",
                                          [
                                            _c("fluro-panel-title", [
                                              _vm._v(
                                                "\n                                            Home Address\n                                        "
                                              )
                                            ]),
                                            _vm._v(" "),
                                            _c(
                                              "fluro-panel-body",
                                              [
                                                _c("address-manager", {
                                                  model: {
                                                    value: _vm.model,
                                                    callback: function($$v) {
                                                      _vm.model = $$v;
                                                    },
                                                    expression: "model"
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
                                      "v-flex",
                                      { attrs: { xs12: "", sm12: "" } },
                                      [
                                        _c("fluro-privacy-select", {
                                          model: {
                                            value: _vm.model.privacy,
                                            callback: function($$v) {
                                              _vm.$set(
                                                _vm.model,
                                                "privacy",
                                                $$v
                                              );
                                            },
                                            expression: "model.privacy"
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
                            )
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
                  "tab",
                  { attrs: { heading: "Rooms" } },
                  [
                    _c(
                      "v-container",
                      { attrs: { fluid: "", "grid-list-lg": "" } },
                      [
                        _c(
                          "constrain",
                          { attrs: { sm: "" } },
                          [
                            _c("room-manager", {
                              model: {
                                value: _vm.model.rooms,
                                callback: function($$v) {
                                  _vm.$set(_vm.model, "rooms", $$v);
                                },
                                expression: "model.rooms"
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
                  "tab",
                  { attrs: { heading: "Key Contacts" } },
                  [
                    _c(
                      "v-container",
                      { attrs: { fluid: "", "grid-list-lg": "" } },
                      [
                        _c(
                          "constrain",
                          { attrs: { sm: "" } },
                          [
                            _c("key-contact-location-manager", {
                              model: {
                                value: _vm.model.keycontacts,
                                callback: function($$v) {
                                  _vm.$set(_vm.model, "keycontacts", $$v);
                                },
                                expression: "model.keycontacts"
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
                  "tab",
                  {
                    attrs: { heading: "Location/Map" },
                    on: { activeTab: _vm.getLatLong }
                  },
                  [
                    _c(
                      "v-layout",
                      { attrs: { column: "" } },
                      [
                        _c(
                          "v-flex",
                          [
                            _c("location-edit-map-component", {
                              attrs: { name: "locationMap" },
                              model: {
                                value: _vm.model,
                                callback: function($$v) {
                                  _vm.model = $$v;
                                },
                                expression: "model"
                              }
                            })
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "v-flex",
                          { attrs: { shrink: "" } },
                          [
                            _c(
                              "v-container",
                              { attrs: { fluid: "", "grid-list-lg": "" } },
                              [
                                _c(
                                  "constrain",
                                  { attrs: { sm: "" } },
                                  [
                                    _c(
                                      "v-layout",
                                      { attrs: { row: "", wrap: "" } },
                                      [
                                        _c(
                                          "v-flex",
                                          { attrs: { xs12: "", sm12: "" } },
                                          [
                                            _c("h3", [
                                              _vm._v(_vm._s(_vm.title))
                                            ]),
                                            _vm._v(" "),
                                            _c("h5", [
                                              _vm._v(
                                                "Enter the longitude and latitude below or drag the marker to refine the position"
                                              )
                                            ])
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "v-flex",
                                          {
                                            staticClass: "mobile-padding",
                                            attrs: { xs12: "", sm6: "" }
                                          },
                                          [
                                            _c("fluro-content-form-field", {
                                              attrs: {
                                                "form-fields": _vm.formFields,
                                                outline: _vm.showOutline,
                                                options: _vm.options,
                                                field: _vm.fieldHash.longitude
                                              },
                                              on: { input: _vm.update },
                                              model: {
                                                value: _vm.model,
                                                callback: function($$v) {
                                                  _vm.model = $$v;
                                                },
                                                expression: "model"
                                              }
                                            })
                                          ],
                                          1
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "v-flex",
                                          {
                                            staticClass: "mobile-padding",
                                            attrs: { xs12: "", sm6: "" }
                                          },
                                          [
                                            _c("fluro-content-form-field", {
                                              attrs: {
                                                "form-fields": _vm.formFields,
                                                outline: _vm.showOutline,
                                                options: _vm.options,
                                                field: _vm.fieldHash.latitude
                                              },
                                              on: { input: _vm.update },
                                              model: {
                                                value: _vm.model,
                                                callback: function($$v) {
                                                  _vm.model = $$v;
                                                },
                                                expression: "model"
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
                                )
                              ],
                              1
                            )
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
                _vm.definition &&
                _vm.definition.fields &&
                _vm.definition.fields.length
                  ? _c(
                      "tab",
                      {
                        attrs: {
                          heading: _vm.definition.title + " Information"
                        }
                      },
                      [
                        _c("fluro-content-form", {
                          attrs: {
                            options: _vm.options,
                            fields: _vm.definition.fields
                          },
                          model: {
                            value: _vm.model.data,
                            callback: function($$v) {
                              _vm.$set(_vm.model, "data", $$v);
                            },
                            expression: "model.data"
                          }
                        })
                      ],
                      1
                    )
                  : _vm._e()
              ],
              1
            )
          ]
    ],
    2
  )
};
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

  /* style */
  const __vue_inject_styles__$3 = function (inject) {
    if (!inject) return
    inject("data-v-bff47270_0", { source: "/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.no-border-no-background .toggle-item {\n  border: none !important;\n  background: none !important;\n  font-size: 14px;\n  padding: 0px;\n}\n@media only screen and (max-width: 600px) {\n.mobile-padding {\n    padding-top: 0px !important;\n    padding-bottom: 0px !important;\n}\n}\n\n/*# sourceMappingURL=location.vue.map */", map: {"version":3,"sources":["C:\\Users\\User\\Documents\\fluro\\fluro-vue-ui\\src\\components\\content\\edit\\panels\\location.vue","location.vue"],"names":[],"mappings":"AA2OA,GAAA;AAYA;EACA,yCAAA;ACrPA;ADwPA;EACA,2CAAA;ACrPA;ADwPA;EACA,4CAAA;ACrPA;ADwPA;EACA,0CAAA;ACrPA;;AD6PA,GAAA;AACA;EACA,uBAAA;EACA,2BAAA;EACA,eAAA;EACA,YAAA;AC1PA;AD+PA;AACA;IACA,2BAAA;IACA,8BAAA;AC5PE;AACF;;AAEA,uCAAuC","file":"location.vue","sourcesContent":["<template>\n    <flex-column>\n        <template v-if=\"loading\">\n            <fluro-page-preloader contain />\n        </template>\n        <template v-else>\n            <!-- :vertical=\"true\" -->\n            <tabset :justified=\"true\" :vertical=\"true\">\n                <!--  <template v-slot:menuprefix>\n                    <template v-if=\"context == 'edit' && $vuetify.breakpoint.mdAndUp\">\n                        <flex-column-header style=\"text-align:center\">\n                            <div style=\"padding: 10px; max-width:200px; margin: auto;\">\n                                <fluro-image  :height=\"200\" :image-height=\"450\" contain :item=\"model\" :cacheKey=\"imageCacheKey\" :spinner=\"true\"></fluro-image>\n                            </div>\n                            <div>\n                                {{model.width}}x{{model.height}}\n                            </div>\n                        </flex-column-header>\n                    </template>\n                </template> -->\n                <tab heading=\"Details\">\n                    <flex-column-body style=\"background: #fafafa;\">\n                        <v-container fluid grid-list-lg>\n                            <constrain sm>\n                                <v-layout row wrap>\n                                    <!--  -->\n                                    <v-flex xs12 sm12>\n                                        <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.title\" v-model=\"model\"></fluro-content-form-field>\n                                    </v-flex>\n                                    <!--  -->\n                                    <v-flex xs12 sm6>\n                                        <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.emails\" v-model=\"model\"></fluro-content-form-field>\n                                    </v-flex>\n                                    <!--  -->\n                                    <v-flex xs12 sm6>\n                                        <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.phoneNumbers\" v-model=\"model\"></fluro-content-form-field>\n                                    </v-flex>\n                                    <!-- -->\n                                    <!--  -->\n                                    <!-- Household Address -->\n                                    <v-flex xs12 sm12>\n                                        <fluro-panel>\n                                            <fluro-panel-title>\n                                                Home Address\n                                            </fluro-panel-title>\n                                            <fluro-panel-body>\n                                                <address-manager v-model=\"model\" />\n                                            </fluro-panel-body>\n                                        </fluro-panel>\n                                    </v-flex>\n                                    <v-flex xs12 sm12>\n                                        <fluro-privacy-select v-model=\"model.privacy\" />\n                                    </v-flex>\n                                </v-layout>\n                            </constrain>\n                        </v-container>\n                    </flex-column-body>\n                </tab>\n                <!--  -->\n                <tab heading=\"Rooms\">\n                    <v-container fluid grid-list-lg>\n                        <constrain sm>\n                            <room-manager v-model=\"model.rooms\" />\n                        </constrain>\n                    </v-container>\n                </tab>\n                <tab heading=\"Key Contacts\">\n                    <v-container fluid grid-list-lg>\n                        <constrain sm>\n                            <key-contact-location-manager v-model=\"model.keycontacts\" />\n                        </constrain>\n                    </v-container>\n                </tab>\n                <tab heading=\"Location/Map\" @activeTab=\"getLatLong\">\n                    <v-layout column>\n                        <v-flex>\n                            <location-edit-map-component name=\"locationMap\" v-model=\"model\" />\n                        </v-flex>\n                        <v-flex shrink>\n                            <v-container fluid grid-list-lg>\n                                <constrain sm>\n                                    <v-layout row wrap>\n                                        <!--  -->\n                                        <v-flex xs12 sm12>\n                                            <h3>{{title}}</h3>\n                                            <h5>Enter the longitude and latitude below or drag the marker to refine the position</h5>\n                                        </v-flex>\n                                        <v-flex xs12 sm6 class=\"mobile-padding\">\n                                            <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.longitude\" v-model=\"model\"></fluro-content-form-field>\n                                        </v-flex>\n                                        <!--  -->\n                                        <v-flex xs12 sm6 class=\"mobile-padding\">\n                                            <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.latitude\" v-model=\"model\"></fluro-content-form-field>\n                                        </v-flex>\n                                    </v-layout>\n                                </constrain>\n                            </v-container>\n                        </v-flex>\n                    </v-layout>\n                </tab>\n                <tab :heading=\"`${definition.title} Information`\" v-if=\"definition && definition.fields && definition.fields.length\">\n                    <fluro-content-form :options=\"options\" v-model=\"model.data\" :fields=\"definition.fields\" />\n                </tab>\n            </tabset>\n        </template>\n    </flex-column>\n</template>\n<script>\n/////////////////////////////////\nimport RoomManager from 'src/components/content/edit/components/RoomManager.vue';\nimport LocationEditMapComponent from 'src/components/content/edit/components/LocationEditMapComponent.vue';\nimport FluroContentEditMixin from 'src/components/content/edit/FluroContentEditMixin.js';\nimport AddressManager from 'src/components/content/edit/components/AddressManager.vue';\nimport KeyContactLocationManager from 'src/components/content/edit/components/KeyContactLocationManager.vue';\n\n/////////////////////////////////\n\nimport Vue from 'vue';\nimport _ from 'lodash';\n\n\n\n\n/////////////////////////////////\n\nexport default {\n    components: {\n        AddressManager,\n        RoomManager,\n        KeyContactLocationManager,\n        LocationEditMapComponent,\n    },\n    created() {},\n    mixins: [FluroContentEditMixin],\n    computed: {\n        fieldsOutput() {\n\n\n            var self = this;\n            var array = [];\n\n            ///////////////////////////////////\n\n            addField('title', {\n                title: 'Title',\n                placeholder: 'Location Name',\n                minimum: 1,\n                maximum: 1,\n                type: 'string',\n            });\n\n            ///////////////////////////////////\n\n            addField('phoneNumbers', {\n                title: 'Phone Numbers',\n                minimum: 0,\n                maximum: 0,\n                type: 'string',\n            });\n\n            addField('emails', {\n                title: 'Emails',\n                minimum: 0,\n                maximum: 0,\n                type: 'string',\n            });\n\n            ///////////////////////////////////\n\n            addField('longitude', {\n                title: 'Longitude',\n                minimum: 0,\n                maximum: 1,\n                type: 'string',\n            });\n\n            addField('latitude', {\n                title: 'Latitude',\n                minimum: 0,\n                maximum: 1,\n                type: 'string',\n            });\n\n            ///////////////////////////////////\n\n\n            function addField(key, details) {\n                details.key = key;\n                array.push(details)\n            }\n\n            return array;\n        },\n        geocodeAddress() {\n            var self = this;\n            var model = self.model;\n            return model.addressLine1 + ', ' + model.suburb + ', ' + model.state + ' ' + model.postalCode + ' ' + model.country;\n        },\n        title() {\n            var self = this;\n            return _.get(self.model, 'title') || '';\n        },\n    },\n    methods: {\n        getLatLong() {\n            var self = this;\n            if (!self.model.longitude && !self.model.latitude) {\n\n                var axios = self.$fluro.api.axios;\n                axios.get('https://maps.googleapis.com/maps/api/geocode/json', {\n                    params: {\n                        key: self.$fluro.global.googleMapsAPIKey,\n                        address: self.geocodeAddress,\n                    }\n                }).then(function(res) {\n                    console.log('GOT REQUEST', res);\n                    if ((res.data.status == 'OK') && res.data.results && res.data.results.length) {\n                        var location = _.get(res.data.results[0], 'geometry.location');\n                        console.log('VALID REQUEST', location);\n                        if (location) {\n                            self.model.latitude = location.lat;\n                            self.model.longitude = location.lng;\n                        }\n                    }\n                });\n            }\n        }\n    },\n    data() {\n        return {}\n    },\n}\n</script>\n<style lang=\"scss\">\n\n/**/\r\n\r\n$primary: #2ad4b9;//#0bd6be;\r\n$success: #4cc650; //#4cc673;//\r\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\r\n$danger: #d93e63;\r\n$secondary: #0bd6cd; //#0bd6a3;\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n\r\n.border-top {\r\n    border-top: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-right {\r\n    border-right: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-bottom {\r\n    border-bottom: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-left {\r\n    border-left: 1px solid rgba(#000, 0.05);\r\n}\r\n//////////////////////////////////////////\r\n\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n/**/\n.no-border-no-background .toggle-item {\n    border: none !important;\n    background: none !important;\n    font-size: 14px;\n    padding: 0px;\n}\n\n\n\n@media only screen and (max-width: 600px) {\n    .mobile-padding {\n        padding-top: 0px !important;\n        padding-bottom: 0px !important;\n    }\n}\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.no-border-no-background .toggle-item {\n  border: none !important;\n  background: none !important;\n  font-size: 14px;\n  padding: 0px;\n}\n\n@media only screen and (max-width: 600px) {\n  .mobile-padding {\n    padding-top: 0px !important;\n    padding-bottom: 0px !important;\n  }\n}\n\n/*# sourceMappingURL=location.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$3 = undefined;
  /* module identifier */
  const __vue_module_identifier__$3 = undefined;
  /* functional template */
  const __vue_is_functional_template__$3 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$3 = __vue_normalize__(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    false,
    __vue_create_injector__,
    undefined,
    undefined
  );

export default __vue_component__$3;
//# sourceMappingURL=location-2ee046ba.js.map
