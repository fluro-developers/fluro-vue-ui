
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { S as SearchInput, W as AvatarCell, t as FluroTable, bo as _, bm as __vue_normalize__, bn as __vue_create_injector__ } from './index-ab079bc4.js';

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
var __vue_render__ = function() {
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
          _c(
            "fluro-panel-title",
            [
              _c(
                "v-layout",
                { attrs: { "align-center": "" } },
                [
                  _c("v-flex", [
                    _c("h5", [_vm._v(_vm._s(_vm.total) + " Tickets")])
                  ]),
                  _vm._v(" "),
                  _c(
                    "v-flex",
                    { attrs: { shrink: "" } },
                    [
                      _c(
                        "v-btn",
                        {
                          staticClass: "ma-0",
                          attrs: {
                            small: "",
                            color: "primary",
                            loading: _vm.exporting
                          },
                          on: {
                            click: function($event) {
                              return _vm.exportItems()
                            }
                          }
                        },
                        [
                          _vm._v(
                            "\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tExport\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t"
                          ),
                          _c("fluro-icon", {
                            attrs: { right: "", library: "fas", icon: "share" }
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
          ),
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
          _c("fluro-table", {
            staticStyle: { "max-height": "50vh" },
            attrs: {
              trackingKey: "_id",
              clicked: _vm.clicked,
              defaultSort: "firstName",
              pageSize: 50,
              items: _vm.filtered,
              columns: _vm.columns
            }
          })
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
    inject("data-v-4738107e_0", { source: "/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n\n/*# sourceMappingURL=TicketList.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/event/TicketList.vue","TicketList.vue"],"names":[],"mappings":"AA8OA,GAAA;AAYA;EACA,yCAAA;ACxPA;AD2PA;EACA,2CAAA;ACxPA;AD2PA;EACA,4CAAA;ACxPA;AD2PA;EACA,0CAAA;ACxPA;;ADgQA,GAAA;;AC5PA,yCAAyC","file":"TicketList.vue","sourcesContent":["<template>\n\t\t\t\t<div>\n\t\t\t\t\t\t\t\t<fluro-page-preloader v-if=\"loading\" contain />\n\t\t\t\t\t\t\t\t<fluro-panel>\n\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel-title>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-layout align-center>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h5>{{total}} Tickets</h5>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex shrink>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-btn class=\"ma-0\" small color=\"primary\" :loading=\"exporting\" @click=\"exportItems()\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tExport\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-icon right library=\"fas\" icon=\"share\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-btn>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel-title>\n\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel-body class=\"border-bottom\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<search-input v-model=\"search\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <div> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <v-btn @click=\"push()\" color=\"primary\" class=\"ma-0 ml-2\">Push -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <fluro-icon icon=\"plus\" right /> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- </v-btn> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- </div> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t<!-- <tabset :justified=\"true\"> -->\n\t\t\t\t\t\t\t\t\t\t\t\t<!-- <tab :heading=\"`${segment.contacts.length} ${segment.title}`\" v-for=\"segment in segments\"> -->\n\t\t\t\t\t\t\t\t\t\t\t\t<!-- <v-container pa2 class=\"border-bottom\" v-if=\"segments.length <= 1\"> -->\n\t\t\t\t\t\t\t\t\t\t\t\t<!-- <h3 margin>{{segment.contacts.length}} {{segment.title}}</h3> -->\n\t\t\t\t\t\t\t\t\t\t\t\t<!-- </v-container> -->\n\t\t\t\t\t\t\t\t\t\t\t\t<fluro-table trackingKey=\"_id\" :clicked=\"clicked\" defaultSort=\"firstName\" :pageSize=\"50\" style=\"max-height:50vh;\" :items=\"filtered\" :columns=\"columns\" />\n\t\t\t\t\t\t\t\t\t\t\t\t<!-- </tab> -->\n\t\t\t\t\t\t\t\t\t\t\t\t<!-- </tabset> -->\n\t\t\t\t\t\t\t\t</fluro-panel>\n\t\t\t\t</div>\n</template>\n<script>\nimport SearchInput from 'src/components/ui/SearchInput.vue';\nimport AvatarCell from 'src/components/table/cells/AvatarCell.vue';\nimport FluroTable from 'src/components/table/FluroTable.vue';\nimport _ from 'lodash';\n\n\nexport default {\n\t\t\t\tcomponents: {\n\t\t\t\t\t\t\t\tSearchInput,\n\t\t\t\t\t\t\t\tAvatarCell,\n\t\t\t\t\t\t\t\tFluroTable,\n\t\t\t\t},\n\t\t\t\tprops: {\n\t\t\t\t\t\t\t\tevent: {\n\t\t\t\t\t\t\t\t\t\t\t\ttype: [Object, String],\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tinteraction: {\n\t\t\t\t\t\t\t\t\t\t\t\ttype: [Object, String],\n\t\t\t\t\t\t\t\t}\n\t\t\t\t},\n\t\t\t\tmethods: {\n\t\t\t\t\t\t\t\tclicked(item) {\n\t\t\t\t\t\t\t\t\t\t\t\tconsole.log('Clicked item', item);\n\t\t\t\t\t\t\t\t\t\t\t\titem._type = 'ticket';\n\t\t\t\t\t\t\t\t\t\t\t\tthis.$fluro.global.view(item, true);\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\texportItems() {\n\n\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\t\t\t\t\t\t\t\t\t\t\t\tself.exporting = true;\n\n\n\t\t\t\t\t\t\t\t\t\t\t\tvar url;\n\n\t\t\t\t\t\t\t\t\t\t\t\tif (this.eventID) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\turl = `/tickets/event/${this.eventID}/csv`;\n\t\t\t\t\t\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\turl = `/tickets/interaction/${this.interactionID}/csv`;\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\n\t\t\t\t\t\t\t\t\t\t\t\tself.$fluro.api.get(url)\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t.then(function(res) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tself.$fluro.notify('Your popup blocker may stop this file from downloading');\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvar token = self.$fluro.auth.getCurrentToken();\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvar downloadURL = self.$fluro.api.defaults.baseURL + res.data.download;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tif (token) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\twindow.open(downloadURL + '?access_token=' + token);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\twindow.open(downloadURL);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tself.exporting = false;\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t.catch(function(err) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tself.$fluro.error(err);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tself.exporting = false;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t})\n\n\t\t\t\t\t\t\t\t},\n\t\t\t\t},\n\t\t\t\twatch: {\n\t\t\t\t\t\t\t\tsearch: _.debounce(function(v) {\n\t\t\t\t\t\t\t\t\t\t\t\tthis.debouncedSearch = v;\n\t\t\t\t\t\t\t\t}, 300),\n\t\t\t\t},\n\t\t\t\tdata() {\n\t\t\t\t\t\t\t\treturn {\n\t\t\t\t\t\t\t\t\t\t\t\texporting: false,\n\t\t\t\t\t\t\t\t\t\t\t\tsearch: '',\n\t\t\t\t\t\t\t\t\t\t\t\tdebouncedSearch: '',\n\t\t\t\t\t\t\t\t\t\t\t\tloading: true,\n\t\t\t\t\t\t\t\t\t\t\t\tcolumns: [\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// \t\t\t\ttitle: 'Contact',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// \t\t\t\tkey: 'contact',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// },\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'First Name',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkey: 'firstName',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Last Name',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkey: 'lastName',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Ticket Type',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkey: 'title',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Collected',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkey: 'collected',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'boolean',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// \t\t\t\ttitle: 'ID',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// \t\t\t\tkey: '_id',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// },\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Interaction',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkey: 'interaction',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Email',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkey: 'email',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Date',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkey: 'created',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'date',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'When',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkey: 'created',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'date',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\trenderer: 'timeago',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t],\n\t\t\t\t\t\t\t\t}\n\t\t\t\t},\n\t\t\t\tcomputed: {\n\t\t\t\t\t\t\t\ttotal() {\n\t\t\t\t\t\t\t\t\t\t\t\treturn this.tickets.length;\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tfiltered() {\n\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\t\t\t\t\t\t\t\t\t\t\t\tvar filtered = self.tickets;\n\n\t\t\t\t\t\t\t\t\t\t\t\tif (self.debouncedSearch && self.debouncedSearch.length) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tfiltered = _.filter(filtered, function(item) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn _.includes(item.searchString, self.debouncedSearch);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t\t\treturn filtered;\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\teventID() {\n\t\t\t\t\t\t\t\t\t\t\t\treturn this.$fluro.utils.getStringID(this.event);\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tinteractionID() {\n\t\t\t\t\t\t\t\t\t\t\t\treturn this.$fluro.utils.getStringID(this.interaction);\n\t\t\t\t\t\t\t\t},\n\t\t\t\t},\n\t\t\t\tasyncComputed: {\n\t\t\t\t\t\t\t\ttickets: {\n\t\t\t\t\t\t\t\t\t\t\t\tdefault: [],\n\t\t\t\t\t\t\t\t\t\t\t\tget() {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tself.loading = true;\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvar url;\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tif (self.interactionID) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\turl = `/tickets/interaction/${self.interactionID}`;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\turl = `/tickets/event/${self.eventID}`;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn new Promise(function(resolve, reject) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn self.$fluro.api.get(url)\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t.then(function(res) {\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvar results = _.map(res.data, function(ticket) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tticket._type = 'ticket';\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tticket.searchString = `${ticket.firstName} ${ticket.lastName} ${ticket.title} ${ticket.email}`.toLowerCase()\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn ticket;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tresolve(results);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tself.loading = false;\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t.catch(function(err) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treject(err);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tself.loading = false;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t},\n\t\t\t\t},\n}\n\n</script>\n<style lang=\"scss\">\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n</style>\n","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n\n/*# sourceMappingURL=TicketList.vue.map */"]}, media: undefined });

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
//# sourceMappingURL=TicketList-d1e33e15.js.map
