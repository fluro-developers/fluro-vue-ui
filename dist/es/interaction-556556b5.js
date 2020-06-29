
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { bl as __vue_normalize__, bm as __vue_create_injector__ } from './index-5ac0687b.js';
import 'vue';
import 'vuedraggable';
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
import { T as TicketList } from './TicketList-73064620.js';
import { F as FluroContentViewMixin } from './FluroContentViewMixin-6bbdce99.js';

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
    TicketList
  },
  asyncComputed: {
    tickets: {
      default: [],

      get() {
        var self = this;
        self.loading = true; ///////////////////////////////////

        var url = `/tickets/interaction/${self.item._id}`; ///////////////////////////////////

        return new Promise(function (resolve, reject) {
          return self.$fluro.api.get(url).then(function (res) {
            resolve(res.data);
            self.loading = false;
          }).catch(function (err) {
            reject(err);
            self.loading = false;
          });
        });
      }

    }
  },
  mixins: [FluroContentViewMixin],
  methods: {},
  computed: {
    qrCodeURL() {
      var self = this;
      var interactionID = self.$fluro.utils.getStringID(self.item);
      return `${self.$fluro.api.defaults.baseURL}/system/qr?input=http://tickets.fluro.io/interaction/${interactionID}`;
    },

    paymentMethod() {
      return this.item.paymentMethod;
    },

    paymentExists() {
      return _.get(this.config.definition, ' paymentDetails.required') || _.get(this.config.definition, ' paymentDetails.allow');
    },

    data() {
      return this.item.data || {};
    },

    defaultFields() {
      var array = [];
      var fields = [{
        title: 'Names',
        type: 'group',
        key: 'names',
        sameLine: true,
        fields: [{
          title: 'First Name',
          key: '_firstName',
          minimum: 0,
          maximum: 1,
          type: 'string'
        }, {
          title: 'Last Name',
          key: '_lastName',
          minimum: 0,
          maximum: 1,
          type: 'string'
        }]
      }, {
        title: 'Extras',
        type: 'group',
        key: 'extras',
        sameLine: true,
        fields: [{
          title: 'Gender',
          key: '_gender',
          minimum: 0,
          maximum: 1,
          type: 'string',
          directive: 'select',
          options: [{
            name: 'Male',
            value: 'male'
          }, {
            name: 'Female',
            value: 'female'
          }, {
            name: 'Unknown',
            value: 'unknown'
          }]
        }, {
          title: 'Date of Birth',
          key: '_dob',
          minimum: 0,
          maximum: 1,
          type: 'date',
          directive: 'datepicker'
        }]
      }, {
        title: 'Communication',
        type: 'group',
        key: 'communication',
        sameLine: true,
        fields: [{
          title: 'Email Address',
          key: '_email',
          minimum: 0,
          maximum: 1,
          type: 'email'
        }, {
          title: 'Phone Number',
          key: '_phoneNumber',
          minimum: 0,
          maximum: 1,
          type: 'string'
        }]
      }];
      addField('contactDetails', {
        title: 'Contact Details',
        type: 'group',
        key: 'contactDetails',
        // expressions: {
        // 				show() {
        // 						return self.
        // 				},
        // },
        fields
      });

      function addField(key, details) {
        details.key = key;
        array.push(details);
      }

      return array;
    },

    interactionFields() {
      var array = []; ///////////////////////////////////

      addField('contact', {
        title: 'Primary Contact',
        description: 'The primary contact for this interaction',
        minimum: 0,
        maximum: 1,
        type: 'reference',
        params: {
          restrictType: 'contact',
          allDefinitions: true
        }
      });
      addField('contacts', {
        title: 'Linked Contacts',
        description: 'All contacts referenced for this interaction',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        params: {
          restrictType: 'contact',
          allDefinitions: true
        }
      });
      addField('event', {
        title: 'Linked Event',
        description: 'Attach this interaction to a specific event',
        minimum: 0,
        maximum: 1,
        type: 'reference',
        params: {
          restrictType: 'event',
          allDefinitions: true
        }
      }); ///////////////////////////////////

      addField('emails', {
        type: 'group',
        sameLine: true,
        fields: [{
          title: 'Primary Email Address',
          key: 'primaryEmail',
          description: 'The primary email address relevant to this interaction',
          minimum: 0,
          maximum: 1,
          type: 'email'
        }, {
          title: 'Transaction Email Address',
          key: 'transactionEmail',
          description: 'The primary email address relevant to this interaction',
          minimum: 0,
          maximum: 1,
          type: 'email',
          expressions: {
            defaultValue: `data.primaryEmail`
          }
        }]
      });

      function addField(key, details) {
        details.key = key;
        array.push(details);
      }

      return array;
    }

  },

  data() {
    return {
      loading: true
    };
  },

  created() {
    console.log('THIS RENDERER', this);
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
    "flex-column",
    [
      _c(
        "tabset",
        { attrs: { justified: true } },
        [
          _c(
            "tab",
            { attrs: { heading: "Submission" } },
            [
              _c(
                "flex-column-body",
                [
                  _vm.item
                    ? _c(
                        "v-container",
                        [
                          _c("fluro-content-render", {
                            attrs: { fields: _vm.defaultFields, raw: true },
                            model: {
                              value: _vm.item.rawData,
                              callback: function($$v) {
                                _vm.$set(_vm.item, "rawData", $$v);
                              },
                              expression: "item.rawData"
                            }
                          }),
                          _vm._v(" "),
                          _c("fluro-content-render", {
                            attrs: { fields: _vm.interactionFields, raw: true },
                            model: {
                              value: _vm.item,
                              callback: function($$v) {
                                _vm.item = $$v;
                              },
                              expression: "item"
                            }
                          }),
                          _vm._v(" "),
                          _vm.paymentExists
                            ? _c(
                                "fluro-panel",
                                [
                                  _c(
                                    "fluro-panel-body",
                                    [
                                      _vm.paymentMethod
                                        ? _c(
                                            "v-input",
                                            { staticClass: "no-flex" },
                                            [
                                              _c("v-label", [
                                                _vm._v(
                                                  "Selected Payment Method"
                                                )
                                              ]),
                                              _vm._v(" "),
                                              _c("h3", [
                                                _vm._v(
                                                  _vm._s(
                                                    _vm.paymentMethod.title ||
                                                      _vm.paymentMethod
                                                  )
                                                )
                                              ])
                                            ],
                                            1
                                          )
                                        : _vm._e()
                                    ],
                                    1
                                  )
                                ],
                                1
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          _c("fluro-content-render", {
                            attrs: { fields: _vm.fields, raw: true },
                            model: {
                              value: _vm.item.rawData,
                              callback: function($$v) {
                                _vm.$set(_vm.item, "rawData", $$v);
                              },
                              expression: "item.rawData"
                            }
                          })
                        ],
                        1
                      )
                    : _vm._e()
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _vm.tickets.length
            ? _c(
                "tab",
                { attrs: { heading: _vm.tickets.length + " Tickets" } },
                [
                  _c(
                    "flex-column-body",
                    { staticStyle: { background: "#fafafa" } },
                    [
                      _c(
                        "v-container",
                        {
                          staticClass: "border-bottom",
                          staticStyle: { background: "#fff" },
                          attrs: { fluid: "" }
                        },
                        [
                          _c("img", {
                            staticClass: "qrcode",
                            attrs: { src: _vm.qrCodeURL }
                          })
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "v-container",
                        [
                          _c("ticket-list", {
                            attrs: { interaction: _vm.item }
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
            : _vm._e()
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
    inject("data-v-2000cdb8_0", { source: "/**/\n.border-top[data-v-2000cdb8] {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right[data-v-2000cdb8] {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom[data-v-2000cdb8] {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left[data-v-2000cdb8] {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.qrcode[data-v-2000cdb8] {\n  display: block;\n  border: 5px solid #000;\n  background: #000;\n  margin: auto;\n}\n\n/*# sourceMappingURL=interaction.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/view/panels/interaction.vue","interaction.vue"],"names":[],"mappings":"AAyXA,GAAA;AAYA;EACA,yCAAA;ACnYA;ADsYA;EACA,2CAAA;ACnYA;ADsYA;EACA,4CAAA;ACnYA;ADsYA;EACA,0CAAA;ACnYA;;AD2YA,GAAA;AACA;EACA,cAAA;EACA,sBAAA;EACA,gBAAA;EACA,YAAA;ACxYA;;AAEA,0CAA0C","file":"interaction.vue","sourcesContent":["<template>\n\t\t\t\t<flex-column>\n\t\t\t\t\t\t\t\t<tabset :justified=\"true\">\n\t\t\t\t\t\t\t\t\t\t\t\t<tab heading=\"Submission\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<flex-column-body>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-container v-if=\"item\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-render :fields=\"defaultFields\" :raw=\"true\" v-model=\"item.rawData\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-content-render>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-render :fields=\"interactionFields\" :raw=\"true\" v-model=\"item\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel v-if=\"paymentExists\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-input class=\"no-flex\" v-if=\"paymentMethod\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-label>Selected Payment Method</v-label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h3>{{paymentMethod.title || paymentMethod}}</h3>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-input>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-input class=\"no-flex\" v-if=\"paymentMethod\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-label>Total Payable</v-label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h3>{{paymentMethod.title || paymentMethod}}</h3>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-input>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-layout> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group col-xs-12 col-sm-4\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>Total Payable</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h3 ng-class=\"{'brand-danger':amountDue(), 'text-muted':!amountDue()}\">{{item.amount / 100 | currency}} <em class=\"text-muted small text-uppercase\">{{item.currency}}</em></h3>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group col-xs-12 col-sm-4\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>Amount Paid</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h3 class=\"text-success\">{{amountPaid() / 100 | currency}} <em class=\"text-muted small text-uppercase\">{{item.currency}}</em></h3>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group col-xs-12 col-sm-4\" ng-if=\"amountDue()\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label><span ng-if=\"amountDue() < 0\">Refund</span> Due</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h3 ng-class=\"{'text-danger':amountDue() > 0, 'text-success':amountDue() <= 0}\">{{amountDue() / 100 | currency}} <em class=\"text-muted small text-uppercase\">{{item.currency}}</em></h3>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <div class=\"panel panel-default\" ng-if=\"definition.paymentDetails.required || definition.paymentDetails.allow\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"panel-body\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\" ng-if=\"item.paymentMethod\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>Selected Payment Method</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h3>{{paymentMethod.title || item.paymentMethod}}</h3>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group col-xs-12 col-sm-4\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>Total Payable</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h3 ng-class=\"{'brand-danger':amountDue(), 'text-muted':!amountDue()}\">{{item.amount / 100 | currency}} <em class=\"text-muted small text-uppercase\">{{item.currency}}</em></h3>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group col-xs-12 col-sm-4\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>Amount Paid</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h3 class=\"text-success\">{{amountPaid() / 100 | currency}} <em class=\"text-muted small text-uppercase\">{{item.currency}}</em></h3>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group col-xs-12 col-sm-4\" ng-if=\"amountDue()\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label><span ng-if=\"amountDue() < 0\">Refund</span> Due</label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h3 ng-class=\"{'text-danger':amountDue() > 0, 'text-success':amountDue() <= 0}\">{{amountDue() / 100 | currency}} <em class=\"text-muted small text-uppercase\">{{item.currency}}</em></h3>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\" ng-if=\"item.transactions.length\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label>Transaction<span ng-show=\"item.transactions.length != 1\">s</span></label>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"list-group\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a class=\"list-group-item\" ng-click=\"$root.modal.view(transaction)\" ng-repeat=\"transaction in item.transactions track by transaction._id\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-xs-8\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<s ng-if=\"transaction.paymentStatus == 'refund'\">{{transaction.title}} <em class=\"small text-muted\">{{transaction.amount/100 | currency}} <span>{{transaction.currency}}</span></em></s>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div ng-if=\"transaction.paymentStatus != 'refund'\">{{transaction.title}} <em class=\"small text-muted\">{{transaction.amount/100 | currency}} <span>{{transaction.currency}}</span></em></div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-xs-4 text-right\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span ng-if=\"transaction.paymentStatus == 'refund'\" class=\"label label-warning\">Refunded</span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div> -->\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-render :fields=\"fields\" :raw=\"true\" v-model=\"item.rawData\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</flex-column-body>\n\t\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t\t\t\t\t<tab :heading=\"`${tickets.length} Tickets`\" v-if=\"tickets.length\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<flex-column-body style=\"background: #fafafa;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-container fluid style=\"background: #fff;\" class=\"border-bottom\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<img class=\"qrcode\" :src=\"qrCodeURL\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<ticket-list :interaction=\"item\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</flex-column-body>\n\t\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t</tabset>\n\t\t\t\t</flex-column>\n</template>\n<script>\n/////////////////////////////////\n\nimport Vue from 'vue';\n\nimport FluroContentViewMixin from 'src/components/content/view/FluroContentViewMixin.js';\nimport TicketList from 'src/components/content/event/TicketList.vue';\n\n/////////////////////////////////\n\nexport default {\n\t\t\t\tprops: {\n\t\t\t\t\t\t\t\tconfig: {\n\t\t\t\t\t\t\t\t\t\t\t\ttype: Object,\n\t\t\t\t\t\t\t\t\t\t\t\trequired: true,\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\titem: {\n\t\t\t\t\t\t\t\t\t\t\t\ttype: Object,\n\t\t\t\t\t\t\t\t\t\t\t\trequired: true,\n\t\t\t\t\t\t\t\t},\n\t\t\t\t},\n\t\t\t\tcomponents: {\n\t\t\t\t\t\t\t\tTicketList,\n\n\t\t\t\t},\n\t\t\t\tasyncComputed: {\n\t\t\t\t\t\t\t\ttickets: {\n\t\t\t\t\t\t\t\t\t\t\t\tdefault: [],\n\t\t\t\t\t\t\t\t\t\t\t\tget() {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tself.loading = true;\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvar url = `/tickets/interaction/${self.item._id}`;\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn new Promise(function(resolve, reject) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn self.$fluro.api.get(url)\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t.then(function(res) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tresolve(res.data);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tself.loading = false;\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t.catch(function(err) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treject(err);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tself.loading = false;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t},\n\t\t\t\t},\n\t\t\t\tmixins: [FluroContentViewMixin],\n\t\t\t\tmethods: {},\n\t\t\t\tcomputed: {\n\t\t\t\t\t\t\t\tqrCodeURL() {\n\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\t\t\t\t\t\t\t\t\t\t\t\tvar interactionID = self.$fluro.utils.getStringID(self.item);\n\t\t\t\t\t\t\t\t\t\t\t\treturn `${self.$fluro.api.defaults.baseURL}/system/qr?input=http://tickets.fluro.io/interaction/${interactionID}`;\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tpaymentMethod() {\n\t\t\t\t\t\t\t\t\t\t\t\treturn this.item.paymentMethod\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tpaymentExists() {\n\t\t\t\t\t\t\t\t\t\t\t\treturn _.get(this.config.definition, ' paymentDetails.required') || _.get(this.config.definition, ' paymentDetails.allow')\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tdata() {\n\t\t\t\t\t\t\t\t\t\t\t\treturn this.item.data || {}\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tdefaultFields() {\n\t\t\t\t\t\t\t\t\t\t\t\tvar array = [];\n\n\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\n\n\n\t\t\t\t\t\t\t\t\t\t\t\tvar fields = [{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Names',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'group',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkey: 'names',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tsameLine: true,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tfields: [{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'First Name',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkey: '_firstName',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'string',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Last Name',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkey: '_lastName',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'string',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t],\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Extras',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'group',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkey: 'extras',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tsameLine: true,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tfields: [{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Gender',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkey: '_gender',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'string',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdirective: 'select',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\toptions: [{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tname: 'Male',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue: 'male',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tname: 'Female',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue: 'female',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tname: 'Unknown',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue: 'unknown',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t]\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Date of Birth',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkey: '_dob',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'date',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdirective: 'datepicker',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t]\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Communication',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'group',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkey: 'communication',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tsameLine: true,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tfields: [{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Email Address',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkey: '_email',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'email',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Phone Number',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkey: '_phoneNumber',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'string',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t],\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t]\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('contactDetails', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Contact Details',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'group',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkey: 'contactDetails',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// expressions: {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// \t\t\t\tshow() {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// \t\t\t\t\t\treturn self.\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// \t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// },\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tfields,\n\n\t\t\t\t\t\t\t\t\t\t\t\t})\n\n\n\t\t\t\t\t\t\t\t\t\t\t\tfunction addField(key, details) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdetails.key = key;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tarray.push(details)\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t\t\treturn array;\n\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tinteractionFields() {\n\n\t\t\t\t\t\t\t\t\t\t\t\tvar array = [];\n\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('contact', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Primary Contact',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescription: 'The primary contact for this interaction',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'reference',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tparams: {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\trestrictType: 'contact',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tallDefinitions: true,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\n\t\t\t\t\t\t\t\t\t\t\t\t})\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('contacts', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Linked Contacts',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescription: 'All contacts referenced for this interaction',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'reference',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tparams: {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\trestrictType: 'contact',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tallDefinitions: true,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\n\t\t\t\t\t\t\t\t\t\t\t\t})\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('event', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Linked Event',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescription: 'Attach this interaction to a specific event',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'reference',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tparams: {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\trestrictType: 'event',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tallDefinitions: true,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\n\t\t\t\t\t\t\t\t\t\t\t\t})\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('emails', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'group',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tsameLine: true,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tfields: [{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Primary Email Address',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkey: 'primaryEmail',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescription: 'The primary email address relevant to this interaction',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'email',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}, {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Transaction Email Address',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkey: 'transactionEmail',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescription: 'The primary email address relevant to this interaction',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'email',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\texpressions: {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdefaultValue: `data.primaryEmail`,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t]\n\t\t\t\t\t\t\t\t\t\t\t\t})\n\n\n\n\t\t\t\t\t\t\t\t\t\t\t\tfunction addField(key, details) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdetails.key = key;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tarray.push(details)\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t\t\treturn array;\n\t\t\t\t\t\t\t\t},\n\t\t\t\t},\n\t\t\t\tdata() {\n\t\t\t\t\t\t\t\treturn {\n\t\t\t\t\t\t\t\t\t\t\t\tloading: true,\n\t\t\t\t\t\t\t\t}\n\t\t\t\t},\n\t\t\t\tcreated() {\n\t\t\t\t\t\t\t\tconsole.log('THIS RENDERER', this)\n\t\t\t\t}\n}\n\n</script>\n<style scoped lang=\"scss\">\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n.qrcode {\n\t\t\t\tdisplay: block;\n\t\t\t\tborder: 5px solid #000;\n\t\t\t\tbackground: #000;\n\t\t\t\tmargin: auto;\n}\n\n</style>\n","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.qrcode {\n  display: block;\n  border: 5px solid #000;\n  background: #000;\n  margin: auto;\n}\n\n/*# sourceMappingURL=interaction.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-2000cdb8";
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
//# sourceMappingURL=interaction-556556b5.js.map
