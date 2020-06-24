import { S as SearchInput, U as AvatarCell, s as FluroTable, bi as _, bg as __vue_normalize__, bh as __vue_create_injector__ } from './index-8d7f8f94.js';

//
var script = {
  components: {
    SearchInput,
    AvatarCell,
    FluroTable
  },
  props: {
    event: {
      type: [Object, String]
    },
    interaction: {
      type: [Object, String]
    }
  },
  methods: {
    clicked(item) {
      console.log('Clicked item', item);
      item._type = 'ticket';
      this.$fluro.global.view(item, true);
    },

    exportItems() {
      var self = this;
      self.exporting = true;
      var url;

      if (this.eventID) {
        url = `/tickets/event/${this.eventID}/csv`;
      } else {
        url = `/tickets/interaction/${this.interactionID}/csv`;
      }

      self.$fluro.api.get(url).then(function (res) {
        self.$fluro.notify('Your popup blocker may stop this file from downloading');
        var token = self.$fluro.auth.getCurrentToken();
        var downloadURL = self.$fluro.api.defaults.baseURL + res.data.download;

        if (token) {
          window.open(downloadURL + '?access_token=' + token);
        } else {
          window.open(downloadURL);
        }

        self.exporting = false;
      }).catch(function (err) {
        self.$fluro.error(err);
        self.exporting = false;
      });
    }

  },
  watch: {
    search: _.debounce(function (v) {
      this.debouncedSearch = v;
    }, 300)
  },

  data() {
    return {
      exporting: false,
      search: '',
      debouncedSearch: '',
      loading: true,
      columns: [// {
      // 				title: 'Contact',
      // 				key: 'contact',
      // },
      {
        title: 'First Name',
        key: 'firstName'
      }, {
        title: 'Last Name',
        key: 'lastName'
      }, {
        title: 'Ticket Type',
        key: 'title'
      }, {
        title: 'Collected',
        key: 'collected',
        type: 'boolean'
      }, // {
      // 				title: 'ID',
      // 				key: '_id',
      // },
      {
        title: 'Interaction',
        key: 'interaction'
      }, {
        title: 'Email',
        key: 'email'
      }, {
        title: 'Date',
        key: 'created',
        type: 'date'
      }, {
        title: 'When',
        key: 'created',
        type: 'date',
        renderer: 'timeago'
      }]
    };
  },

  computed: {
    total() {
      return this.tickets.length;
    },

    filtered() {
      var self = this;
      var filtered = self.tickets;

      if (self.debouncedSearch && self.debouncedSearch.length) {
        filtered = _.filter(filtered, function (item) {
          return _.includes(item.searchString, self.debouncedSearch);
        });
      }

      return filtered;
    },

    eventID() {
      return this.$fluro.utils.getStringID(this.event);
    },

    interactionID() {
      return this.$fluro.utils.getStringID(this.interaction);
    }

  },
  asyncComputed: {
    tickets: {
      default: [],

      get() {
        var self = this;
        self.loading = true; ///////////////////////////////////

        var url;

        if (self.interactionID) {
          url = `/tickets/interaction/${self.interactionID}`;
        } else {
          url = `/tickets/event/${self.eventID}`;
        } ///////////////////////////////////


        return new Promise(function (resolve, reject) {
          return self.$fluro.api.get(url).then(function (res) {
            var results = _.map(res.data, function (ticket) {
              ticket._type = 'ticket';
              ticket.searchString = `${ticket.firstName} ${ticket.lastName} ${ticket.title} ${ticket.email}`.toLowerCase();
              return ticket;
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
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.loading)?_c('fluro-page-preloader',{attrs:{"contain":""}}):_vm._e(),_vm._v(" "),_c('fluro-panel',[_c('fluro-panel-title',[_c('v-layout',{attrs:{"align-center":""}},[_c('v-flex',[_c('h5',[_vm._v(_vm._s(_vm.total)+" Tickets")])]),_vm._v(" "),_c('v-flex',{attrs:{"shrink":""}},[_c('v-btn',{staticClass:"ma-0",attrs:{"small":"","color":"primary","loading":_vm.exporting},on:{"click":function($event){return _vm.exportItems()}}},[_vm._v("\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tExport\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t"),_c('fluro-icon',{attrs:{"right":"","library":"fas","icon":"share"}})],1)],1)],1)],1),_vm._v(" "),_c('fluro-panel-body',{staticClass:"border-bottom"},[_c('v-layout',[_c('v-flex',[_c('search-input',{model:{value:(_vm.search),callback:function ($$v) {_vm.search=$$v;},expression:"search"}})],1)],1)],1),_vm._v(" "),_c('fluro-table',{staticStyle:{"max-height":"50vh"},attrs:{"trackingKey":"_id","clicked":_vm.clicked,"defaultSort":"firstName","pageSize":50,"items":_vm.filtered,"columns":_vm.columns}})],1)],1)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-12fc87a6_0", { source: ".border-top{border-top:1px solid rgba(0,0,0,.05)}.border-right{border-right:1px solid rgba(0,0,0,.05)}.border-bottom{border-bottom:1px solid rgba(0,0,0,.05)}.border-left{border-left:1px solid rgba(0,0,0,.05)}", map: undefined, media: undefined });

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

export { __vue_component__ as T };
//# sourceMappingURL=TicketList-12e13263.js.map
