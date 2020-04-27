import { aG as FluroContentForm, bb as __vue_normalize__, bc as __vue_create_injector__ } from './index-a3621495.js';
import 'vue';
import draggable from 'vuedraggable';
import 'vue-color';
import 'signature_pad';
import 'fluro';
import 'vue2-ace-editor';
import 'js-beautify';
import 'vuex-map-fields';
import 'async';
import 'tippy.js';
import 'tiptap';
import 'tiptap-commands';
import 'tiptap-extensions';
import { F as FluroContentEditMixin } from './FluroContentEditMixin-50bc9f5c.js';
import { A as AddressManager } from './AddressManager-12a50129.js';

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
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('list-group',[_c('draggable',_vm._b({attrs:{"list":_vm.model,"ghost-class":"ghost-dragging-class"},on:{"start":function($event){_vm.drag=true;},"end":function($event){_vm.drag=false;}}},'draggable',_vm.dragOptions,false),_vm._l((_vm.model),function(room,index){return _c('list-group-item',[_c('v-layout',{attrs:{"align-center":""}},[_c('v-flex',[_c('strong',[_vm._v(_vm._s(room.title))]),_c('br'),_vm._v(" "),_c('span',{staticClass:"muted",staticStyle:{"padding-bottom":"0px"}},[_vm._v(_vm._s(room.description))])]),_vm._v(" "),_c('v-flex',{attrs:{"shrink":""}},[_c('v-btn',{on:{"click":function($event){return _vm.remove(index)}}},[_c('fluro-icon',{attrs:{"icon":"times"}})],1)],1)],1)],1)}),1)],1),_vm._v(" "),_c('fluro-panel',[_c('fluro-panel-title',[_vm._v("Add a room")]),_vm._v(" "),_c('fluro-panel-body',[_c('form',{on:{"submit":function($event){$event.preventDefault();$event.stopPropagation();return _vm.add()}}},[_c('v-layout',[_c('v-flex',[_c('fluro-content-form',{ref:"form",attrs:{"fields":_vm.fields},model:{value:(_vm.proposed),callback:function ($$v) {_vm.proposed=$$v;},expression:"proposed"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"shrink":""}},[_c('v-btn',{attrs:{"type":"submit"},on:{"click":function($event){return _vm.add()}}},[_vm._v("Add")])],1)],1)],1)])],1)],1)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-27cd6000_0", { source: ".border-top{border-top:1px solid rgba(0,0,0,.05)}.border-right{border-right:1px solid rgba(0,0,0,.05)}.border-bottom{border-bottom:1px solid rgba(0,0,0,.05)}.border-left{border-left:1px solid rgba(0,0,0,.05)}.ghost-dragging-class{opacity:.5;background:#c8ebfb}", map: undefined, media: undefined });

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
//
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
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"map",staticClass:"google-map"})};
var __vue_staticRenderFns__$1 = [];

  /* style */
  const __vue_inject_styles__$1 = function (inject) {
    if (!inject) return
    inject("data-v-2ce59147_0", { source: ".google-map[data-v-2ce59147]{width:100%;height:100%;background:gray}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$1 = "data-v-2ce59147";
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
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('list-group',[_c('draggable',_vm._b({attrs:{"list":_vm.model,"ghost-class":"ghost-dragging-class"},on:{"start":function($event){_vm.drag=true;},"end":function($event){_vm.drag=false;}}},'draggable',_vm.dragOptions,false),_vm._l((_vm.model),function(keycontact,index){return _c('list-group-item',[_c('v-layout',{attrs:{"align-center":""}},[_c('v-flex',[_c('strong',[_vm._v(_vm._s(keycontact.position))])]),_vm._v(" "),_c('v-flex',[_c('list-group',{staticStyle:{"margin-bottom":"0px"}},_vm._l((keycontact.contacts),function(contact){return _c('list-group-item',[_c('fluro-realm-bar',{attrs:{"item":contact.realm}}),_vm._v(" "),_c('fluro-avatar',{attrs:{"id":contact._id,"type":"contact","width":100}}),_vm._v(" "),_c('strong',[_vm._v("\n                                                                                                                                                        "+_vm._s(contact.title)+"\n                                                                                                                                        ")])],1)}),1)],1),_vm._v(" "),_c('v-flex',{attrs:{"shrink":""}},[_c('v-btn',{on:{"click":function($event){return _vm.remove(index)}}},[_c('fluro-icon',{attrs:{"icon":"times"}})],1)],1)],1)],1)}),1)],1),_vm._v(" "),_c('fluro-panel',[_c('fluro-panel-title',[_vm._v("Add a Key Contact")]),_vm._v(" "),_c('fluro-panel-body',[_c('form',{on:{"submit":function($event){$event.preventDefault();$event.stopPropagation();return _vm.add()}}},[_c('v-layout',[_c('v-flex',[_c('fluro-content-form',{ref:"form",attrs:{"fields":_vm.fields},model:{value:(_vm.proposed),callback:function ($$v) {_vm.proposed=$$v;},expression:"proposed"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"shrink":""}},[_c('v-btn',{attrs:{"type":"submit"},on:{"click":function($event){return _vm.add()}}},[_vm._v("Add")])],1)],1)],1)])],1)],1)};
var __vue_staticRenderFns__$2 = [];

  /* style */
  const __vue_inject_styles__$2 = function (inject) {
    if (!inject) return
    inject("data-v-79c3cbfe_0", { source: ".border-top{border-top:1px solid rgba(0,0,0,.05)}.border-right{border-right:1px solid rgba(0,0,0,.05)}.border-bottom{border-bottom:1px solid rgba(0,0,0,.05)}.border-left{border-left:1px solid rgba(0,0,0,.05)}.ghost-dragging-class{opacity:.5;background:#c8ebfb}", map: undefined, media: undefined });

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
var __vue_render__$3 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flex-column',[(_vm.loading)?[_c('fluro-page-preloader',{attrs:{"contain":""}})]:[_c('tabset',{attrs:{"justified":true,"vertical":true}},[_c('tab',{attrs:{"heading":"Details"}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',{attrs:{"fluid":"","grid-list-lg":""}},[_c('constrain',{attrs:{"sm":""}},[_c('v-layout',{attrs:{"row":"","wrap":""}},[_c('v-flex',{attrs:{"xs12":"","sm12":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.title},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm6":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.emails},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm6":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.phoneNumbers},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm12":""}},[_c('fluro-panel',[_c('fluro-panel-title',[_vm._v("\n                                            Home Address\n                                        ")]),_vm._v(" "),_c('fluro-panel-body',[_c('address-manager',{model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1)],1)],1),_vm._v(" "),_c('v-flex',{attrs:{"xs12":"","sm12":""}},[_c('fluro-privacy-select',{model:{value:(_vm.model.privacy),callback:function ($$v) {_vm.$set(_vm.model, "privacy", $$v);},expression:"model.privacy"}})],1)],1)],1)],1)],1)],1),_vm._v(" "),_c('tab',{attrs:{"heading":"Rooms"}},[_c('v-container',{attrs:{"fluid":"","grid-list-lg":""}},[_c('constrain',{attrs:{"sm":""}},[_c('room-manager',{model:{value:(_vm.model.rooms),callback:function ($$v) {_vm.$set(_vm.model, "rooms", $$v);},expression:"model.rooms"}})],1)],1)],1),_vm._v(" "),_c('tab',{attrs:{"heading":"Key Contacts"}},[_c('v-container',{attrs:{"fluid":"","grid-list-lg":""}},[_c('constrain',{attrs:{"sm":""}},[_c('key-contact-location-manager',{model:{value:(_vm.model.keycontacts),callback:function ($$v) {_vm.$set(_vm.model, "keycontacts", $$v);},expression:"model.keycontacts"}})],1)],1)],1),_vm._v(" "),_c('tab',{attrs:{"heading":"Location/Map"},on:{"activeTab":_vm.getLatLong}},[_c('v-layout',{attrs:{"column":""}},[_c('v-flex',[_c('location-edit-map-component',{attrs:{"name":"locationMap"},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"shrink":""}},[_c('v-container',{attrs:{"fluid":"","grid-list-lg":""}},[_c('constrain',{attrs:{"sm":""}},[_c('v-layout',{attrs:{"row":"","wrap":""}},[_c('v-flex',{attrs:{"xs12":"","sm12":""}},[_c('h3',[_vm._v(_vm._s(_vm.title))]),_vm._v(" "),_c('h5',[_vm._v("Enter the longitude and latitude below or drag the marker to refine the position")])]),_vm._v(" "),_c('v-flex',{staticClass:"mobile-padding",attrs:{"xs12":"","sm6":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.longitude},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1),_vm._v(" "),_c('v-flex',{staticClass:"mobile-padding",attrs:{"xs12":"","sm6":""}},[_c('fluro-content-form-field',{attrs:{"form-fields":_vm.formFields,"outline":_vm.showOutline,"options":_vm.options,"field":_vm.fieldHash.latitude},on:{"input":_vm.update},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})],1)],1)],1)],1)],1)],1)],1),_vm._v(" "),(_vm.definition && _vm.definition.fields && _vm.definition.fields.length)?_c('tab',{attrs:{"heading":((_vm.definition.title) + " Information")}},[_c('fluro-content-form',{attrs:{"options":_vm.options,"fields":_vm.definition.fields},model:{value:(_vm.model.data),callback:function ($$v) {_vm.$set(_vm.model, "data", $$v);},expression:"model.data"}})],1):_vm._e()],1)]],2)};
var __vue_staticRenderFns__$3 = [];

  /* style */
  const __vue_inject_styles__$3 = function (inject) {
    if (!inject) return
    inject("data-v-31c9b025_0", { source: ".border-top{border-top:1px solid rgba(0,0,0,.05)}.border-right{border-right:1px solid rgba(0,0,0,.05)}.border-bottom{border-bottom:1px solid rgba(0,0,0,.05)}.border-left{border-left:1px solid rgba(0,0,0,.05)}.no-border-no-background .toggle-item{border:none!important;background:0 0!important;font-size:14px;padding:0}@media only screen and (max-width:600px){.mobile-padding{padding-top:0!important;padding-bottom:0!important}}", map: undefined, media: undefined });

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
//# sourceMappingURL=location-ca130471.js.map
