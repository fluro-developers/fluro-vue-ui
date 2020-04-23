import { aa as FluroContentView, bb as __vue_normalize__, bc as __vue_create_injector__ } from './index-d8661d8f.js';
import 'vuedraggable';
import 'vue-color';
import 'tippy.js';
import 'vue2-ace-editor';
import 'js-beautify';
import 'tiptap';
import 'tiptap-commands';
import 'tiptap-extensions';
import 'signature_pad';
import 'fluro';
import 'vuex-map-fields';
import 'async';
import { G as GuestList, L as LocationViewMapComponent } from './GuestList-5514b13b.js';
import { F as FluroContentViewMixin } from './FluroContentViewMixin-1f934700.js';

//

var script = {
  props: {
    config: {
      type: Object,
      required: true
    },
    item: {
      type: Object,
      required: true
    }
  },
  components: {
    FluroContentView,
    GuestList,
    LocationViewMapComponent
  },
  mixins: [FluroContentViewMixin],
  methods: {
    confirmationIcon(assignment) {
      switch (assignment.confirmationStatus) {
        case 'confirmed':
          return 'check';

        case 'denied':
          return 'times';

        case 'unknown':
          return 'clock';

        case 'proposed':
          return 'question-circle';
      }
    }

  },
  asyncComputed: {
    songs: {
      default: [],

      get() {
        var self = this;
        self.loadingSongs = true;
        return new Promise(function (resolve, reject) {
          self.$fluro.api.get(`/event/${self.itemID}/songs`).then(function (res) {
            resolve(res.data);
            self.loadingSongs = false;
          }).catch(function (err) {
            reject(err);
            self.loadingSongs = false;
          });
        });
      }

    }
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
      return _.reduce(this.item.rooms, function (set, room) {
        var locationName = String(room.locationName).toLowerCase();

        if (!set[locationName]) {
          set[locationName] = [];
        }

        set[locationName].push(room);
        return set;
      }, {});
    },

    locations() {
      var self = this;
      return _.map(self.item.locations, function (location) {
        var locationName = String(location.title).toLowerCase();
        location.selectedRooms = self.roomHash[locationName] || [];
        return location;
      });
    },

    croppedFields() {
      return _.filter(this.fields, function (field) {
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
    }

  },

  data() {
    return {
      loadingSongs: true
    };
  }

};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flex-column',[(_vm.loading || _vm.loadingSongs)?[_c('fluro-page-preloader',{attrs:{"contain":""}})]:_c('tabset',{attrs:{"justified":true,"vertical":true}},[_c('tab',{attrs:{"heading":(_vm.readableTypeName + " Info")}},[_c('flex-column-body',[_c('v-container',[_c('constrain',{attrs:{"sm":""}},[(_vm.item.mainImage)?[_c('fluro-image',{attrs:{"item":_vm.item.mainImage,"imageWidth":1200,"imageHeight":675,"from":_vm.item._id}})]:_vm._e(),_vm._v(" "),_c('v-container',{staticClass:"border-bottom",attrs:{"fluid":"","pa-2":""}},[_c('h2',[_c('strong',[_vm._v(_vm._s(_vm.item.title))])]),_vm._v(" "),_c('h4',{staticClass:"muted text-uppercase"},[_vm._v(_vm._s(_vm.item.firstLine))]),_vm._v(" "),_c('h3',[_vm._v(_vm._s(_vm._f("readableEventDate")(_vm.item)))])]),_vm._v(" "),_c('v-container',{attrs:{"fluid":"","pa-2":""}},[(_vm.item.body && _vm.item.body.length)?[_c('div',{domProps:{"innerHTML":_vm._s(_vm.item.body)}})]:_vm._e()],2),_vm._v(" "),(_vm.item.videos && _vm.item.videos.length)?_c('v-container',{attrs:{"grid-list-xl":"","fluid":"","pa-2":""}},[_c('v-layout',{attrs:{"row":"","wrap":""}},_vm._l((_vm.item.videos),function(video){return _c('v-flex',{key:video._id,attrs:{"xs12":_vm.item.videos.length == 1,"xs6":_vm.item.videos.length > 1}},[_c('fluro-panel',[_c('fluro-panel-title',[_c('v-layout',{attrs:{"align-center":""}},[_c('v-flex',[_c('fluro-icon',{attrs:{"left":"","type":"video"}}),_vm._v(" "),_c('strong',[_vm._v(_vm._s(video.title))])],1),_vm._v(" "),_c('v-flex',{attrs:{"shrink":""}},[_c('v-btn',{staticClass:"ma-0",attrs:{"small":"","icon":""},on:{"click":function($event){return _vm.$actions.open([video])}}},[_c('fluro-icon',{attrs:{"icon":"ellipsis-h"}})],1)],1)],1)],1),_vm._v(" "),_c('fluro-video',{attrs:{"item":video}})],1)],1)}),1)],1):_vm._e(),_vm._v(" "),_c('v-container',{attrs:{"fluid":"","pa-2":""}},[(_vm.item.assets && _vm.item.assets.length)?[_c('h3',{attrs:{"margin":""}},[_vm._v("Downloads & Resources")]),_vm._v(" "),_c('list-group',_vm._l((_vm.item.assets),function(asset,index){return _c('list-group-item',{attrs:{"item":asset},on:{"click":function($event){return _vm.$fluro.global.view(_vm.song, true)}},scopedSlots:_vm._u([{key:"right",fn:function(){return [_c('v-btn',{staticClass:"ma-0",attrs:{"icon":""},on:{"click":function($event){return _vm.$actions.open([asset])}}},[_c('fluro-icon',{attrs:{"icon":"ellipsis-h"}})],1)]},proxy:true}],null,true)})}),1)]:_vm._e(),_vm._v(" "),(_vm.fields.length)?[_c('h3',{attrs:{"margin":""}},[_vm._v(_vm._s(_vm.definition.title)+" Details")]),_vm._v(" "),_c('fluro-content-render',{attrs:{"fields":_vm.croppedFields},model:{value:(_vm.item.data),callback:function ($$v) {_vm.$set(_vm.item, "data", $$v);},expression:"item.data"}})]:_vm._e()],2),_vm._v(" "),(_vm.locations.length)?_c('v-container',{attrs:{"fluid":"","pa-2":""}},[_c('fluro-panel',[_c('location-view-map-component',{staticStyle:{"width":"100%","min-height":"300px","height":"0","padding-bottom":"40%"},attrs:{"positions":_vm.locations}}),_vm._v(" "),_c('fluro-panel-body',{staticClass:"border-top"},[_c('v-layout',{attrs:{"align-center":""}},[_c('v-flex',{attrs:{"shrink":""}},[_c('fluro-icon',{attrs:{"library":"fas","left":"","icon":"map-marker-alt"}})],1),_vm._v(" "),_vm._l((_vm.locations),function(location){return _c('v-flex',[_c('strong',[_vm._v(_vm._s(location.title))]),_vm._v(" "),(location.selectedRooms.length)?_c('div',{staticClass:"sm muted"},[_c('strong',[_vm._v("Rooms:")]),_vm._v(" "+_vm._s(_vm._f("comma")(location.selectedRooms,'title')))]):_vm._e()])})],2)],1)],1)],1):_vm._e()],2)],1)],1)],1),_vm._v(" "),(_vm.songs.length)?_c('tab',{attrs:{"heading":((_vm.songs.length) + " Song" + (_vm.songs.length == 1 ? '' : 's'))}},[_c('flex-column-body',[_c('v-container',[_c('constrain',{attrs:{"sm":""}},[_c('h3',{attrs:{"margin":""}},[_vm._v("Songs")]),_vm._v(" "),_c('list-group',_vm._l((_vm.songs),function(song,index){return _c('list-group-item',{attrs:{"item":song},on:{"click":function($event){return _vm.$fluro.global.view(song, true)}},scopedSlots:_vm._u([{key:"right",fn:function(){return [_c('v-btn',{staticClass:"ma-0",attrs:{"icon":""},on:{"click":function($event){return _vm.$actions.open([song])}}},[_c('fluro-icon',{attrs:{"icon":"ellipsis-h"}})],1)]},proxy:true}],null,true)})}),1)],1)],1)],1)],1):_vm._e(),_vm._v(" "),(_vm.item.rostered)?_c('tab',{attrs:{"heading":"Team Members"}},[_c('flex-column-body',{staticStyle:{"background":"#fafafa"}},[_c('v-container',[_c('constrain',{attrs:{"sm":""}},[_c('v-layout',{attrs:{"align-center":""}},[_c('v-flex',[_c('h3',{attrs:{"margin":""}},[_vm._v("Team Members")])])],1),_vm._v(" "),_vm._l((_vm.item.rostered),function(roster){return _c('fluro-panel',[_c('fluro-panel-title',[_c('v-layout',{attrs:{"align-center":""}},[_c('v-flex',[_c('strong',[_vm._v(_vm._s(roster.title))])]),_vm._v(" "),(_vm.$fluro.access.canEditItem(roster))?_c('v-flex',{attrs:{"shrink":""}},[_c('v-btn',{directives:[{name:"tippy",rawName:"v-tippy"}],staticClass:"ma-0",attrs:{"icon":"","content":"Actions"},on:{"click":function($event){return _vm.$actions.open([roster])}}},[_c('fluro-icon',{attrs:{"icon":"ellipsis-h"}})],1)],1):_vm._e()],1)],1),_vm._v(" "),_c('fluro-panel-body',[_c('v-layout',{attrs:{"row":"","wrap":""}},_vm._l((roster.slots),function(slot){return (slot.assignments && slot.assignments.length)?_c('v-flex',{attrs:{"xs6":"","sm4":"","md3":""}},[_c('v-container',{staticClass:"mb-2 pa-2"},[_c('h5',[_vm._v(_vm._s(slot.title))]),_vm._v(" "),_vm._l((slot.assignments),function(assignment){return _c('div',{staticClass:"assignment-item",class:assignment.confirmationStatus,on:{"click":function($event){return _vm.$actions.open([assignment])}}},[_c('v-layout',[_c('v-flex',[_vm._v("\n                                                        "+_vm._s(assignment.contact && assignment.contact.title ? assignment.contact.title : assignment.contactName)+"\n                                                    ")]),_vm._v(" "),_c('v-flex',{attrs:{"shrink":""}},[_c('fluro-icon',{attrs:{"right":"","icon":_vm.confirmationIcon(assignment)}})],1)],1)],1)})],2)],1):_vm._e()}),1)],1)],1)})],2)],1)],1)],1):_vm._e(),_vm._v(" "),(_vm.plans.length)?_vm._l((_vm.plans),function(plan,index){return _c('tab',{attrs:{"heading":plan.title}},[_c('fluro-content-view',{attrs:{"id":_vm.plans[index],"embedded":true,"type":"plan"}})],1)}):_vm._e(),_vm._v(" "),_c('tab',{attrs:{"heading":"Guest List"}},[_c('flex-column-body',[_c('v-container',[_c('constrain',{attrs:{"sm":""}},[_c('guest-list',{attrs:{"event":_vm.item}})],1)],1)],1)],1)],2)],2)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-51a238e0_0", { source: ".border-top[data-v-51a238e0]{border-top:1px solid rgba(0,0,0,.05)}.border-right[data-v-51a238e0]{border-right:1px solid rgba(0,0,0,.05)}.border-bottom[data-v-51a238e0]{border-bottom:1px solid rgba(0,0,0,.05)}.border-left[data-v-51a238e0]{border-left:1px solid rgba(0,0,0,.05)}.assignment-item[data-v-51a238e0]{font-size:12px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;border-radius:100px;margin-bottom:2px;padding:2px 10px;font-weight:500;background-color:rgba(0,0,0,.05)}.assignment-item.confirmed[data-v-51a238e0]{color:#4cc650;background-color:rgba(76,198,80,.05)}.assignment-item.denied[data-v-51a238e0]{color:#d93e63;background-color:rgba(217,62,99,.05)}.assignment-item.unknown[data-v-51a238e0]{color:#555}.assignment-item.proposed[data-v-51a238e0]{background-color:rgba(42,212,185,.1);color:#197f6f}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-51a238e0";
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

export default __vue_component__;
//# sourceMappingURL=event-25ebea5f.js.map
