
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { bo as _, bm as __vue_normalize__, bn as __vue_create_injector__ } from './index-50459297.js';
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
import { F as FluroContentEditMixin } from './FluroContentEditMixin-50e581a6.js';
import { F as FluroPermissionSelect } from './FluroPermissionSelect-750429ff.js';

//

var script = {
  components: {
    // FluroEditor,
    FluroPermissionSelect
  },
  mixins: [FluroContentEditMixin],
  methods: {
    copyCodeToClipboard() {
      var self = this;
      let testingCodeToCopy = this.$refs.input;
      testingCodeToCopy.setAttribute('type', 'text'); // 不是 hidden 才能複製

      testingCodeToCopy.select();

      try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful'; // alert('Testing code was copied ' + msg);

        self.$fluro.notify('Invite Code Copied to clipboard');
      } catch (err) {} // alert('Oops, unable to copy');
      // self.$fluro.error({message:'Unable to copy to clipboard'});

      /* unselect the range */


      testingCodeToCopy.setAttribute('type', 'hidden');

      if (process.browser) {
        window.getSelection().removeAllRanges();
      }
    },

    toggleExpand(key) {
      var self = this;
      self.$set(self.expandedSettings, `_${key}`, !self.expandedSettings[`_${key}`]);
      console.log('TOGGLE', key, self.expandedSettings);
    }

  },
  computed: {
    policyCode() {
      return _.get(this.model, 'privateDetails.inviteCode');
    },

    inviteCode() {
      var self = this;
      return `${self.user.account.prefix}-${self.policyCode}`.toUpperCase();
    },

    expanded() {
      var self = this;
      return {
        contacts: self.expandedSettings._contacts || self.model.contacts && self.model.contacts.length,
        teams: self.expandedSettings._teams || self.model.teams && self.model.teams.length,
        tickets: self.expandedSettings._tickets || self.model.tickets && self.model.tickets.length,
        events: self.expandedSettings._events || self.model.events && self.model.events.length,
        interactions: self.expandedSettings._interactions || self.model.interactions && self.model.interactions.length,
        cards: self.expandedSettings._cards || self.model.cards && self.model.cards.length,
        checkins: self.expandedSettings._checkins || self.model.checkins && self.model.checkins.length,
        details: self.expandedSettings._details || self.model.details && self.model.details.length,
        families: self.expandedSettings._families || self.model.families && self.model.families.length,
        personas: self.expandedSettings._personas || self.model.personas && self.model.personas.length,
        collections: self.expandedSettings._collections || self.model.collections && self.model.collections.length,
        tags: self.expandedSettings._tags || self.model.tags && self.model.tags.length,
        realms: self.expandedSettings._realms || self.model.realms && self.model.realms.length,
        definitions: self.expandedSettings._definitions || self.model.definitions && self.model.definitions.length,
        query: self.expandedSettings._query || self.model.query
      };
    },

    mailoutType() {
      return this.model.mailoutType;
    },

    user() {
      return this.$fluro.auth.getCurrentUser();
    },

    fieldsOutput() {
      var array = []; ///////////////////////////////////

      addField('title', {
        title: 'Title',
        minimum: 1,
        maximum: 1,
        type: 'string',
        placeholder: `Eg. 'Standard Access'`
      });
      addField('description', {
        title: 'Description',
        description: 'Enter a one line description summarizing what permissions this access pass will grant',
        minimum: 0,
        maximum: 1,
        type: 'string',
        placeholder: `Eg. 'This pass allows a user to access all contacts and teams in the X Realm'`
      });
      addField('inviteCodeEnabled', {
        title: 'Enable Invite Code',
        description: 'Enable an invitation code that you can share with people so they can quickly acquire this access pass.',
        minimum: 0,
        maximum: 1,
        type: 'boolean'
      }); // // console.log('TYPE OPTIONS', self.typeOptions);
      // addField('filterType', {
      //     title: 'Type',
      //     minimum: 0,
      //     maximum: 1,
      //     type: 'string',
      //     directive: 'select',
      //     description: 'The type of item you want to return from this query',
      //     options: self.typeOptions,
      // })
      ///////////////////////////////////

      function addField(key, details) {
        details.key = key;
        array.push(details);
      }

      return array;
    }

  },

  data() {
    return {
      editorOptions: {}
    };
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
      _vm.loading
        ? [_c("fluro-page-preloader", { attrs: { contain: "" } })]
        : [
            _c(
              "tabset",
              { attrs: { justified: true, vertical: true } },
              [
                _c(
                  "tab",
                  { attrs: { heading: "Pass Settings" } },
                  [
                    _c(
                      "flex-column-body",
                      { staticStyle: { background: "#fafafa" } },
                      [
                        _c(
                          "v-container",
                          [
                            _c(
                              "constrain",
                              { attrs: { sm: "" } },
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
                                }),
                                _vm._v(" "),
                                _c("fluro-content-form-field", {
                                  attrs: {
                                    "form-fields": _vm.formFields,
                                    outline: _vm.showOutline,
                                    options: _vm.options,
                                    field: _vm.fieldHash.description
                                  },
                                  on: { input: _vm.update },
                                  model: {
                                    value: _vm.model,
                                    callback: function($$v) {
                                      _vm.model = $$v;
                                    },
                                    expression: "model"
                                  }
                                }),
                                _vm._v(" "),
                                _c(
                                  "fluro-panel",
                                  [
                                    _c(
                                      "fluro-panel-title",
                                      [
                                        _c("fluro-content-form-field", {
                                          attrs: {
                                            "form-fields": _vm.formFields,
                                            outline: _vm.showOutline,
                                            options: _vm.options,
                                            field:
                                              _vm.fieldHash.inviteCodeEnabled
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
                                    _vm.model.inviteCodeEnabled
                                      ? [
                                          _c(
                                            "div",
                                            {
                                              directives: [
                                                {
                                                  name: "tippy",
                                                  rawName: "v-tippy"
                                                }
                                              ],
                                              staticClass: "invite-code",
                                              attrs: {
                                                content:
                                                  "Click to copy to clipboard"
                                              },
                                              on: {
                                                click: _vm.copyCodeToClipboard
                                              }
                                            },
                                            [
                                              _c("span", [
                                                _vm._v(_vm._s(_vm.inviteCode))
                                              ])
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("input", {
                                            ref: "input",
                                            attrs: { type: "hidden" },
                                            domProps: { value: _vm.inviteCode }
                                          })
                                        ]
                                      : _vm._e()
                                  ],
                                  2
                                ),
                                _vm._v(" "),
                                _c("fluro-permission-select", {
                                  model: {
                                    value: _vm.model.sets,
                                    callback: function($$v) {
                                      _vm.$set(_vm.model, "sets", $$v);
                                    },
                                    expression: "model.sets"
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
                ),
                _vm._v(" "),
                _vm.definition
                  ? _c(
                      "tab",
                      { attrs: { heading: _vm.definition.title + " Fields" } },
                      [
                        _c(
                          "flex-column-body",
                          { staticStyle: { background: "#fafafa" } },
                          [
                            _c(
                              "v-container",
                              [
                                _c(
                                  "constrain",
                                  { attrs: { sm: "" } },
                                  [
                                    _c("h3", { attrs: { margin: "" } }, [
                                      _vm._v(
                                        _vm._s(_vm.definition.title) + " Fields"
                                      )
                                    ]),
                                    _vm._v(" "),
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
          ]
    ],
    2
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-40650de4_0", { source: "/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.invite-code {\n  line-height: 60px;\n  height: 60px;\n  padding: 0 5px;\n  border: 1px solid rgba(42, 212, 185, 0.5);\n  background: rgba(42, 212, 185, 0.1);\n  text-align: center;\n  font-weight: 100;\n  font-size: 40px;\n}\n\n/*# sourceMappingURL=policy.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/edit/panels/policy.vue","policy.vue"],"names":[],"mappings":"AA6OA,GAAA;AAYA;EACA,yCAAA;ACvPA;AD0PA;EACA,2CAAA;ACvPA;AD0PA;EACA,4CAAA;ACvPA;AD0PA;EACA,0CAAA;ACvPA;;AD+PA,GAAA;AAEA;EACA,iBAAA;EACA,YAAA;EACA,cAAA;EACA,yCAAA;EACA,mCAAA;EACA,kBAAA;EACA,gBAAA;EACA,eAAA;AC7PA;;AAEA,qCAAqC","file":"policy.vue","sourcesContent":["<template>\n    <flex-column>\n        <template v-if=\"loading\">\n            <fluro-page-preloader contain />\n        </template>\n        <template v-else>\n            <tabset :justified=\"true\" :vertical=\"true\">\n                <tab heading=\"Pass Settings\">\n                    <flex-column-body style=\"background: #fafafa;\">\n                        <v-container>\n                            <constrain sm>\n                                <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.title\" v-model=\"model\"></fluro-content-form-field>\n                                <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.description\" v-model=\"model\"></fluro-content-form-field>\n                                <fluro-panel>\n                                    <fluro-panel-title>\n                                        <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.inviteCodeEnabled\" v-model=\"model\"></fluro-content-form-field>\n                                    </fluro-panel-title>\n                                    <template v-if=\"model.inviteCodeEnabled\">\n                                        <div class=\"invite-code\" v-tippy content=\"Click to copy to clipboard\" @click=\"copyCodeToClipboard\">\n                                            <span>{{inviteCode}}</span>\n                                            <!-- <fluro-icon icon=\"copy\" right /> -->\n                                        </div>\n                                         <input type=\"hidden\" ref=\"input\" :value=\"inviteCode\">\n                                        <!-- <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.fromEmail\" v-model=\"model\"></fluro-content-form-field> -->\n                                        <!-- <v-layout> -->\n                                        <!-- <v-flex xs12 sm6> -->\n                                        <!-- <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.fromFirstName\" v-model=\"model\"></fluro-content-form-field> -->\n                                        <!-- </v-flex> -->\n                                        <!-- <v-flex xs12 sm6> -->\n                                        <!-- <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.fromLastName\" v-model=\"model\"></fluro-content-form-field> -->\n                                        <!-- </v-flex> -->\n                                        <!-- </v-layout> -->\n                                    </template>\n                                </fluro-panel>\n                                <fluro-permission-select v-model=\"model.sets\" />\n                                <!-- <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.mailoutType\" v-model=\"model\"></fluro-content-form-field>\n                                <fluro-card v-if=\"mailoutType == 'promotional'\">\n                                    <fluro-card-body>\n                                        <h6>\n                                            Promotional Mode\n                                        </h6>\n                                        Default mailout type. Useful for promoting / letting people know of an event, service or product. Promotional emails will not send to selected contacts if they have unsubscribed.\n                                    </fluro-card-body>\n                                </fluro-card>\n                                <fluro-card v-if=\"mailoutType == 'transactional'\">\n                                    <fluro-card-body>\n                                        <h6>\n                                            Transactional Mode\n                                        </h6>\n                                        It is entirely up to you to adhere to international email spam laws and to only send transactional mail as appropriate.\n                                        Transactional emails will send to selected contacts even if they have previously unsubscribed from your emails.\n                                    </fluro-card-body>\n                                </fluro-card> -->\n                            </constrain>\n                        </v-container>\n                    </flex-column-body>\n                </tab>\n                <tab :heading=\"`${definition.title} Fields`\" v-if=\"definition\">\n                    <flex-column-body style=\"background: #fafafa;\">\n                        <v-container>\n                            <constrain sm>\n                                <h3 margin>{{definition.title}} Fields</h3>\n                                <fluro-content-form :options=\"options\" v-model=\"model.data\" :fields=\"definition.fields\" />\n                            </constrain>\n                        </v-container>\n                    </flex-column-body>\n                </tab>\n            </tabset>\n        </template>\n    </flex-column>\n</template>\n<script>\n/////////////////////////////////\n\nimport FluroContentEditMixin from 'src/components/content/edit/FluroContentEditMixin.js';\nimport FluroPermissionSelect from 'src/components/form/FluroPermissionSelect.vue';\n\n/////////////////////////////////\n\nimport Vue from 'vue';\nimport _ from 'lodash';\n\n/////////////////////////////////\n\nexport default {\n\n\n    components: {\n        // FluroEditor,\n        FluroPermissionSelect,\n    },\n    mixins: [FluroContentEditMixin],\n    methods: {\n        copyCodeToClipboard() {\n\n\n\n            var self = this;\n\n            let testingCodeToCopy = this.$refs.input;\n            testingCodeToCopy.setAttribute('type', 'text') // 不是 hidden 才能複製\n            testingCodeToCopy.select()\n\n            try {\n                var successful = document.execCommand('copy');\n                var msg = successful ? 'successful' : 'unsuccessful';\n                // alert('Testing code was copied ' + msg);\n                self.$fluro.notify('Invite Code Copied to clipboard');\n            } catch (err) {\n                // alert('Oops, unable to copy');\n                // self.$fluro.error({message:'Unable to copy to clipboard'});\n            }\n\n            /* unselect the range */\n            testingCodeToCopy.setAttribute('type', 'hidden')\n            if(process.browser) {\n            window.getSelection().removeAllRanges()\n            }\n\n\n        },\n        toggleExpand(key) {\n            var self = this;\n            self.$set(self.expandedSettings, `_${key}`, !self.expandedSettings[`_${key}`]);\n\n\n            console.log('TOGGLE', key, self.expandedSettings);\n        },\n    },\n    computed: {\n        policyCode() {\n            var self = this;\n            return _.get(this.model, 'privateDetails.inviteCode');\n        },\n        inviteCode() {\n            var self = this;\n            return `${self.user.account.prefix}-${self.policyCode}`.toUpperCase();\n        },\n        expanded() {\n            var self = this;\n\n            return {\n                contacts: self.expandedSettings._contacts || (self.model.contacts && self.model.contacts.length),\n                teams: self.expandedSettings._teams || (self.model.teams && self.model.teams.length),\n                tickets: self.expandedSettings._tickets || (self.model.tickets && self.model.tickets.length),\n                events: self.expandedSettings._events || (self.model.events && self.model.events.length),\n                interactions: self.expandedSettings._interactions || (self.model.interactions && self.model.interactions.length),\n                cards: self.expandedSettings._cards || (self.model.cards && self.model.cards.length),\n                checkins: self.expandedSettings._checkins || (self.model.checkins && self.model.checkins.length),\n                details: self.expandedSettings._details || (self.model.details && self.model.details.length),\n                families: self.expandedSettings._families || (self.model.families && self.model.families.length),\n                personas: self.expandedSettings._personas || (self.model.personas && self.model.personas.length),\n                collections: self.expandedSettings._collections || (self.model.collections && self.model.collections.length),\n                tags: self.expandedSettings._tags || (self.model.tags && self.model.tags.length),\n                realms: self.expandedSettings._realms || (self.model.realms && self.model.realms.length),\n                definitions: self.expandedSettings._definitions || (self.model.definitions && self.model.definitions.length),\n                query: self.expandedSettings._query || (self.model.query),\n            }\n        },\n        mailoutType() {\n            return this.model.mailoutType;\n        },\n        user() {\n            return this.$fluro.auth.getCurrentUser();\n        },\n        fieldsOutput() {\n\n\n            var self = this;\n            var array = [];\n\n            ///////////////////////////////////\n\n            addField('title', {\n                title: 'Title',\n                minimum: 1,\n                maximum: 1,\n                type: 'string',\n                placeholder: `Eg. 'Standard Access'`,\n            })\n\n            addField('description', {\n                title: 'Description',\n                description: 'Enter a one line description summarizing what permissions this access pass will grant',\n                minimum: 0,\n                maximum: 1,\n                type: 'string',\n                placeholder: `Eg. 'This pass allows a user to access all contacts and teams in the X Realm'`,\n\n            })\n\n            addField('inviteCodeEnabled', {\n                title: 'Enable Invite Code',\n                description: 'Enable an invitation code that you can share with people so they can quickly acquire this access pass.',\n                minimum: 0,\n                maximum: 1,\n                type: 'boolean',\n            })\n\n\n\n\n\n            // // console.log('TYPE OPTIONS', self.typeOptions);\n\n\n\n            // addField('filterType', {\n            //     title: 'Type',\n            //     minimum: 0,\n            //     maximum: 1,\n            //     type: 'string',\n            //     directive: 'select',\n            //     description: 'The type of item you want to return from this query',\n            //     options: self.typeOptions,\n            // })\n\n            ///////////////////////////////////\n\n            function addField(key, details) {\n                details.key = key;\n                array.push(details)\n            }\n\n            return array;\n\n        },\n    },\n    data() {\n        return {\n            editorOptions: {},\n        }\n    },\n}\n</script>\n<style lang=\"scss\">\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n\n.invite-code {\n    line-height: 60px;\n    height: 60px;\n    padding: 0 5px;\n    border: 1px solid rgba($primary, 0.5);\n    background: rgba($primary, 0.1);\n    text-align: center;\n    font-weight: 100;\n    font-size: 40px;\n    // border-radius: 3px;\n}\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.invite-code {\n  line-height: 60px;\n  height: 60px;\n  padding: 0 5px;\n  border: 1px solid rgba(42, 212, 185, 0.5);\n  background: rgba(42, 212, 185, 0.1);\n  text-align: center;\n  font-weight: 100;\n  font-size: 40px;\n}\n\n/*# sourceMappingURL=policy.vue.map */"]}, media: undefined });

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

export default __vue_component__;
//# sourceMappingURL=policy-15178a5b.js.map
