
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { aN as FluroContentForm, bm as __vue_normalize__, bn as __vue_create_injector__, bo as _ } from './index-53d96baf.js';
import 'vue-range-slider';
import 'vue-range-slider/dist/vue-range-slider.css';
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
import { F as FluroContentEditMixin } from './FluroContentEditMixin-93bfd1b2.js';
import { T as TicketTypeManager, M as MessagingEventManager, L as LocationSelector } from './TicketTypeManager-cbe4831c.js';
import 'fluro-vue-ui';
import './FluroExclusiveSelector-ca530a80.js';
import { R as ReminderEventManager } from './ReminderEventManager-efbcb905.js';

//
var script = {
  mixins: [FluroContentEditMixin],
  props: {
    value: {
      type: Object,
      default: function () {
        return {};
      }
    },
    config: {
      type: Object,
      required: true
    },
    slotData: {
      type: Object
    }
  },
  components: {
    FluroContentForm
  },

  data() {
    return {
      model: this.value
    };
  },

  created() {
    var self = this;

    if (!self.model.title) {
      self.model.title = self.slotData.title;
    }
  },

  methods: {},
  computed: {
    customFields() {
      var self = this;
      var array = []; ///////////////////////////////////

      addField('confirmationStatus', {
        title: 'Create As',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'select',
        defaultValues: [''],
        options: [{
          name: 'Proposed',
          value: ''
        }, {
          name: 'Await Confirmation',
          value: 'unknown'
        }, {
          name: 'Confirmed',
          value: 'confirmed'
        }]
      });
      addField('contacts', {
        title: `People`,
        minimum: 0,
        maximum: self.slotData.maximum,
        type: 'reference',
        directive: 'reference-select',
        params: {
          restrictType: 'contact'
        }
      }); /////////////////////////////////

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
  return _c("fluro-content-form", {
    ref: "form",
    attrs: { options: _vm.options, fields: _vm.customFields },
    scopedSlots: _vm._u([
      {
        key: "form",
        fn: function(ref) {
          var formFields = ref.formFields;
          var fieldHash = ref.fieldHash;
          var model = ref.model;
          var update = ref.update;
          var options = ref.options;
          return [
            _c(
              "v-container",
              {
                staticClass: "full-width",
                attrs: { "grid-list-xl": "", fluid: "", "pa-1": "" }
              },
              [
                _c(
                  "v-layout",
                  { attrs: { "align-center": "", row: "", wrap: "" } },
                  [
                    _c(
                      "v-flex",
                      {
                        attrs: {
                          xs12: "",
                          sm12: "",
                          md2: "",
                          "grid-list-xl": ""
                        }
                      },
                      [
                        _c("h5", { attrs: { margin: "" } }, [
                          _vm._v(_vm._s(model.title))
                        ])
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "v-flex",
                      {
                        attrs: {
                          xs12: "",
                          sm8: "",
                          md6: "",
                          "grid-list-xl": ""
                        }
                      },
                      [
                        _c("fluro-content-form-field", {
                          attrs: {
                            "form-fields": formFields,
                            options: options,
                            field: fieldHash.contacts
                          },
                          on: { input: update },
                          model: {
                            value: model,
                            callback: function($$v) {
                              model = $$v;
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
                        attrs: {
                          xs12: "",
                          sm4: "",
                          md4: "",
                          "grid-list-xl": ""
                        }
                      },
                      [
                        _c("fluro-content-form-field", {
                          attrs: {
                            "form-fields": formFields,
                            options: options,
                            field: fieldHash.confirmationStatus
                          },
                          on: { input: update },
                          model: {
                            value: model,
                            callback: function($$v) {
                              model = $$v;
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
          ]
        }
      }
    ]),
    model: {
      value: _vm.model,
      callback: function($$v) {
        _vm.model = $$v;
      },
      expression: "model"
    }
  })
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-7af1d08a_0", { source: "\n.full-width {\n    width: 100%;\n}\n", map: {"version":3,"sources":["C:\\Users\\User\\Documents\\fluro\\fluro-vue-ui\\src\\components\\content\\edit\\components\\DefaultRosterSlot.vue"],"names":[],"mappings":";AA+GA;IACA,WAAA;AACA","file":"DefaultRosterSlot.vue","sourcesContent":["<template>\n    <fluro-content-form :options=\"options\" v-model=\"model\" :fields=\"customFields\" ref=\"form\">\n        <template v-slot:form=\"{formFields, fieldHash, model, update, options}\">\n            <v-container grid-list-xl fluid pa-1 class=\"full-width\">\n                <v-layout align-center row wrap>\n                    <v-flex xs12 sm12 md2 grid-list-xl>\n                        <h5 margin>{{model.title}}</h5>\n                    </v-flex>\n                    <v-flex xs12 sm8 md6 grid-list-xl>\n                        <fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.contacts\" v-model=\"model\" />\n                    </v-flex>\n                    <v-flex xs12 sm4 md4 grid-list-xl>\n                        <fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.confirmationStatus\" v-model=\"model\" />\n                    </v-flex>\n                </v-layout>\n            </v-container>\n        </template>\n    </fluro-content-form>\n</template>\n<script>\nimport FluroContentEditMixin from 'src/components/content/edit/FluroContentEditMixin.js';\nimport FluroContentForm from 'src/components/form/FluroContentForm.vue';\n\n\nexport default {\n    mixins: [FluroContentEditMixin],\n    props: {\n        value: {\n            type: Object,\n            default: function() {\n                return {};\n            }\n        },\n        config: {\n            type: Object,\n            required: true,\n        },\n        slotData: {\n            type: Object,\n        }\n    },\n    components: {\n        FluroContentForm\n    },\n    data() {\n        return {\n            model: this.value,\n        }\n    },\n    created() {\n        var self = this;\n        if (!self.model.title) {\n            self.model.title = self.slotData.title;\n        }\n    },\n    methods: {},\n    computed: {\n        customFields() {\n\n            var self = this;\n            var array = [];\n            ///////////////////////////////////\n\n\n            addField('confirmationStatus', {\n                title: 'Create As',\n                minimum: 0,\n                maximum: 1,\n                type: 'string',\n                directive: 'select',\n                defaultValues: [''],\n                options: [{\n                        name: 'Proposed',\n                        value: '',\n                    },\n                    {\n                        name: 'Await Confirmation',\n                        value: 'unknown',\n                    },\n                    {\n                        name: 'Confirmed',\n                        value: 'confirmed',\n                    },\n                ],\n            })\n\n\n            addField('contacts', {\n                title: `People`,\n                minimum: 0,\n                maximum: self.slotData.maximum,\n                type: 'reference',\n                directive: 'reference-select',\n                params: {\n                    restrictType: 'contact',\n                }\n            });\n\n            /////////////////////////////////\n\n            function addField(key, details) {\n                details.key = key;\n                array.push(details)\n            }\n\n            return array;\n        },\n    }\n}\n</script>\n<style>\n.full-width {\n    width: 100%;\n}\n</style>"]}, media: undefined });

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
  mixins: [FluroContentEditMixin],
  props: {
    value: {
      type: Object,
      default: function () {
        return {};
      }
    },
    config: {
      type: Object,
      required: true
    },
    data: {
      type: Object,
      required: true
    }
  },
  components: {
    FluroContentForm,
    DefaultRosterSlot: __vue_component__
  },

  data() {
    return {
      model: this.value
    };
  },

  created() {
    var self = this;

    if (!self.model.slots && _.get(self.data, 'data.slots')) {
      self.$set(self.model, 'slots', []);

      _.each(self.data.data.slots, function (slot, ind) {
        self.$set(self.model.slots, ind, {});
      });
    }
  },

  methods: {
    update() {
      return this.$emit('input', this.model);
    }

  },
  computed: {
    customFields() {
      var self = this;
      var array = []; ///////////////////////////////////

      addField('create', {
        title: `Create ${_.get(self.data, 'title')} ${_.get(self.data, 'title').toLowerCase().includes("roster") ? '' : 'Roster'}`,
        description: `Create a ${_.get(self.data, 'title')} ${_.get(self.data, 'title').toLowerCase().includes("roster") ? '' : 'Roster'} for events created in this track if one does not already exist`,
        minimum: 0,
        maximum: 1,
        type: 'boolean'
      });
      addField('managedOwner', {
        title: `${_.get(self.data, 'title')} Owner`,
        description: "Set the owner of rosters created by this track",
        minimum: 0,
        maximum: 0,
        type: 'reference',
        directive: 'reference-select',
        params: {
          restrictType: 'persona'
        }
      }); /////////////////////////////////

      function addField(key, details) {
        details.key = key;
        array.push(details);
      }

      return array;
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
      _c("fluro-content-form", {
        ref: "form",
        attrs: { options: _vm.options, fields: _vm.customFields },
        scopedSlots: _vm._u([
          {
            key: "form",
            fn: function(ref) {
              var formFields = ref.formFields;
              var fieldHash = ref.fieldHash;
              var model = ref.model;
              var options = ref.options;
              return [
                _c(
                  "v-layout",
                  { attrs: { row: "", wrap: "", "grid-list-xl": "" } },
                  [
                    _c(
                      "v-flex",
                      { attrs: { xs12: "", sm12: "", "pb-4": "" } },
                      [
                        _c("fluro-content-form-field", {
                          attrs: {
                            "form-fields": formFields,
                            options: options,
                            field: fieldHash.create
                          },
                          on: { input: _vm.update },
                          model: {
                            value: model,
                            callback: function($$v) {
                              model = $$v;
                            },
                            expression: "model"
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    model.create
                      ? _c(
                          "v-flex",
                          { attrs: { xs12: "", sm12: "", "pb-5": "" } },
                          [
                            _c("fluro-content-form-field", {
                              attrs: {
                                "form-fields": formFields,
                                options: options,
                                field: fieldHash.managedOwner
                              },
                              on: { input: _vm.update },
                              model: {
                                value: model,
                                callback: function($$v) {
                                  model = $$v;
                                },
                                expression: "model"
                              }
                            })
                          ],
                          1
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    model.create && _vm.data.data && _vm.data.data.slots
                      ? _c(
                          "v-flex",
                          { attrs: { xs12: "", sm12: "" } },
                          [
                            _c(
                              "list-group",
                              { staticClass: "full-width" },
                              _vm._l(_vm.data.data.slots, function(slot, ind) {
                                return _c(
                                  "list-group-item",
                                  { staticClass: "full-width" },
                                  [
                                    _c("default-roster-slot", {
                                      attrs: {
                                        config: _vm.config,
                                        slotData: _vm.data.data.slots[ind]
                                      },
                                      on: { input: _vm.update },
                                      model: {
                                        value: model.slots[ind],
                                        callback: function($$v) {
                                          _vm.$set(model.slots, ind, $$v);
                                        },
                                        expression: "model.slots[ind]"
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
                      : _vm._e()
                  ],
                  1
                )
              ]
            }
          }
        ]),
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
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = function (inject) {
    if (!inject) return
    inject("data-v-a17b990a_0", { source: "\n.capitalize-text {\n    text-transform: capitalize;\n}\n.full-width {\n    width: 100%;\n}\n", map: {"version":3,"sources":["C:\\Users\\User\\Documents\\fluro\\fluro-vue-ui\\src\\components\\content\\edit\\components\\DefaultRosterComponent.vue"],"names":[],"mappings":";AAkHA;IACA,0BAAA;AACA;AAEA;IACA,WAAA;AACA","file":"DefaultRosterComponent.vue","sourcesContent":["<template>\n    <div>\n        <fluro-content-form :options=\"options\" v-model=\"model\" :fields=\"customFields\" ref=\"form\">\n            <template v-slot:form=\"{formFields, fieldHash, model, options}\">\n                <v-layout row wrap grid-list-xl>\n                    <v-flex xs12 sm12 pb-4>\n                        <fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.create\" v-model=\"model\" />\n                    </v-flex>\n                    <v-flex xs12 sm12 pb-5 v-if=\"model.create\">\n                        <fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.managedOwner\" v-model=\"model\" />\n                    </v-flex>\n                    <v-flex xs12 sm12 v-if=\"model.create && data.data && data.data.slots\">\n                        <list-group class=\"full-width\">\n                            <list-group-item v-for=\"(slot, ind) in data.data.slots\" class=\"full-width\">\n                                <default-roster-slot @input=\"update\" :config=\"config\" :slotData=\"data.data.slots[ind]\" v-model=\"model.slots[ind]\"/>\n                            </list-group-item>\n                        </list-group>\n                    </v-flex>\n                </v-layout>\n            </template>\n        </fluro-content-form>\n    </div>\n</template>\n<script>\nimport FluroContentEditMixin from 'src/components/content/edit/FluroContentEditMixin.js';\nimport DefaultRosterSlot from 'src/components/content/edit/components/DefaultRosterSlot.vue';\nimport FluroContentForm from 'src/components/form/FluroContentForm.vue';\n\nimport _ from 'lodash';\n\n\nexport default {\n    mixins: [FluroContentEditMixin],\n    props: {\n        value: {\n            type: Object,\n            default: function() {\n                return {};\n            }\n        },\n        config: {\n            type: Object,\n            required: true,\n        },\n        data: {\n            type: Object,\n            required: true,\n        }\n    },\n    components: {\n        FluroContentForm,\n        DefaultRosterSlot,\n    },\n    data() {\n        return {\n            model: this.value,\n        }\n    },\n    created() {\n        var self = this;\n        if (!self.model.slots && _.get(self.data, 'data.slots')) {\n            self.$set(self.model, 'slots', []);\n            _.each(self.data.data.slots, function(slot, ind) {\n                self.$set(self.model.slots, ind, {})\n            });\n        }\n    },\n    methods: {\n        update() {\n            return this.$emit('input', this.model);\n        }\n    },\n    computed: {\n        customFields() {\n\n            var self = this;\n            var array = [];\n            ///////////////////////////////////\n\n\n            addField('create', {\n                title: `Create ${_.get(self.data, 'title')} ${_.get(self.data, 'title').toLowerCase().includes(\"roster\") ? '' : 'Roster'}`,\n                description: `Create a ${_.get(self.data, 'title')} ${_.get(self.data, 'title').toLowerCase().includes(\"roster\") ? '' : 'Roster'} for events created in this track if one does not already exist`,\n                minimum: 0,\n                maximum: 1,\n                type: 'boolean',\n            })\n\n\n            addField('managedOwner', {\n                title: `${_.get(self.data, 'title')} Owner`,\n                description: \"Set the owner of rosters created by this track\",\n                minimum: 0,\n                maximum: 0,\n                type: 'reference',\n                directive: 'reference-select',\n                params: {\n                    restrictType: 'persona',\n                }\n            });\n\n            /////////////////////////////////\n\n            function addField(key, details) {\n                details.key = key;\n                array.push(details)\n            }\n\n            return array;\n        },\n    }\n}\n</script>\n<style>\n.capitalize-text {\n    text-transform: capitalize;\n}\n\n.full-width {\n    width: 100%;\n}\n</style>"]}, media: undefined });

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

//
var script$2 = {
  props: {
    value: {
      type: Array
    },
    config: {
      type: Object,
      required: true
    },
    rosterOptions: {
      type: Array,
      required: true
    }
  },

  created() {// var self = this;
    // var mapped = _.map(self.model, function(m) {
    //     return m.definition;
    // });
    // if (!self.value) {
    //     self.model = [];
    // } else {
    //     self.model = self.value;
    // }
    // _.each(self.rosterOptions, function(val) {
    //     if (mapped.includes(val.definitionName)) {
    //         self.$set(self.workingModel, val.definitionName, _.filter(self.model, function(m) {
    //             return m.definition == val.definitionName;
    //         })[0]);
    //     } else {
    //         self.$set(self.workingModel, val.definitionName, {
    //             definition: val.definitionName,
    //         });
    //     }
    // });
  },

  components: {
    DefaultRosterComponent: __vue_component__$1
  },

  data() {
    return {
      model: this.value,
      workingModel: {}
    };
  },

  methods: {
    getTitle(def) {
      return _.get(def, 'title');
    },

    updateModel(val) {
      var self = this; //console.log('HELLO');

      var find = _.find(self.model, function (o) {
        return val.definition == o.definition;
      }); //console.log('FIND',find, self.model[find])


      if (!find && val.create) {
        self.model.push(val);
      } else if (val.create) {
        self.model[find] = val;
      } else {
        self.model.splice(find, 1);
      }
    },

    iconObject(model) {

      if (model.create) {
        return {
          icon: 'check-circle',
          library: 'fas',
          color: '#4cc650'
        };
      } else return;
    },

    muted(model) {
      return !model.create;
    }

  },
  watch: {}
};

/* script */
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.workingModel
    ? _c(
        "div",
        [
          _c(
            "fluro-panel",
            [
              _c(
                "tabset",
                { attrs: { justified: true, vertical: false } },
                _vm._l(_vm.rosterOptions, function(def, ind) {
                  return _c(
                    "tab",
                    {
                      attrs: {
                        heading: _vm.getTitle(def),
                        muted: _vm.muted(_vm.workingModel[def.definitionName]),
                        icon: _vm.iconObject(
                          _vm.workingModel[def.definitionName]
                        )
                      }
                    },
                    [
                      _c(
                        "fluro-panel-body",
                        [
                          _c("default-roster-component", {
                            attrs: { config: _vm.config, data: def },
                            on: { input: _vm.updateModel },
                            model: {
                              value: _vm.workingModel[def.definitionName],
                              callback: function($$v) {
                                _vm.$set(
                                  _vm.workingModel,
                                  def.definitionName,
                                  $$v
                                );
                              },
                              expression: "workingModel[def.definitionName]"
                            }
                          })
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
          )
        ],
        1
      )
    : _vm._e()
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  const __vue_inject_styles__$2 = function (inject) {
    if (!inject) return
    inject("data-v-178d7524_0", { source: "/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n\n/*# sourceMappingURL=DefaultRosterManager.vue.map */", map: {"version":3,"sources":["C:\\Users\\User\\Documents\\fluro\\fluro-vue-ui\\src\\components\\content\\edit\\components\\DefaultRosterManager.vue","DefaultRosterManager.vue"],"names":[],"mappings":"AAqGA,GAAA;AAYA;EACA,yCAAA;AC/GA;ADkHA;EACA,2CAAA;AC/GA;ADkHA;EACA,4CAAA;AC/GA;ADkHA;EACA,0CAAA;AC/GA;;ADuHA,GAAA;;ACnHA,mDAAmD","file":"DefaultRosterManager.vue","sourcesContent":["<template>\n    <div v-if=\"workingModel\">\n        <fluro-panel>\n            <tabset :justified=\"true\" :vertical=\"false\">\n                <tab :heading=\"getTitle(def)\" :muted=\"muted(workingModel[def.definitionName])\" :icon=\"iconObject(workingModel[def.definitionName])\" v-for=\"(def, ind) in rosterOptions\">\n                    <fluro-panel-body>\n                        <default-roster-component @input=\"updateModel\" :config=\"config\" :data=\"def\" v-model=\"workingModel[def.definitionName]\" />\n                    </fluro-panel-body>\n                </tab>\n            </tabset>\n        </fluro-panel>\n    </div>\n</template>\n<script>\nimport DefaultRosterComponent from 'src/components/content/edit/components/DefaultRosterComponent.vue';\nimport _ from 'lodash';\n\n\nexport default {\n    props: {\n        value: {\n            type: Array,\n        },\n        config: {\n            type: Object,\n            required: true,\n        },\n        rosterOptions: {\n            type: Array,\n            required: true,\n        },\n    },\n    created() {\n        // var self = this;\n        // var mapped = _.map(self.model, function(m) {\n        //     return m.definition;\n        // });\n        // if (!self.value) {\n        //     self.model = [];\n        // } else {\n        //     self.model = self.value;\n        // }\n        // _.each(self.rosterOptions, function(val) {\n        //     if (mapped.includes(val.definitionName)) {\n        //         self.$set(self.workingModel, val.definitionName, _.filter(self.model, function(m) {\n        //             return m.definition == val.definitionName;\n        //         })[0]);\n        //     } else {\n        //         self.$set(self.workingModel, val.definitionName, {\n        //             definition: val.definitionName,\n        //         });\n        //     }\n        // });\n    },\n    components: { DefaultRosterComponent },\n    data() {\n        return {\n            model: this.value,\n            workingModel: {},\n        }\n    },\n    methods: {\n        getTitle(def) {\n            return _.get(def, 'title');\n        },\n        updateModel(val) {\n            var self = this;\n            //console.log('HELLO');\n            var find = _.find(self.model, function(o) {\n                return val.definition == o.definition;\n            });\n            //console.log('FIND',find, self.model[find])\n            if (!find && val.create) {\n                self.model.push(val);\n            } else if (val.create) {\n                self.model[find] = val;\n            } else {\n                self.model.splice(find, 1);\n            }\n        },\n        iconObject(model) {\n            var self = this;\n            if (model.create) {\n                return {\n                    icon: 'check-circle',\n                    library: 'fas',\n                    color: '#4cc650',\n                }\n            } else return;\n        },\n        muted(model) {\n\n            return !model.create\n\n        },\n    },\n    watch: {},\n}\n</script>\n<style lang=\"scss\">\n\n/**/\r\n\r\n$primary: #2ad4b9;//#0bd6be;\r\n$success: #4cc650; //#4cc673;//\r\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\r\n$danger: #d93e63;\r\n$secondary: #0bd6cd; //#0bd6a3;\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n\r\n.border-top {\r\n    border-top: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-right {\r\n    border-right: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-bottom {\r\n    border-bottom: 1px solid rgba(#000, 0.05);\r\n}\r\n\r\n.border-left {\r\n    border-left: 1px solid rgba(#000, 0.05);\r\n}\r\n//////////////////////////////////////////\r\n\r\n\r\n\r\n\r\n//////////////////////////////////////////\r\n/**/\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n\n/*# sourceMappingURL=DefaultRosterManager.vue.map */"]}, media: undefined });

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
    TicketTypeManager,
    DefaultRosterManager: __vue_component__$2,
    ReminderEventManager,
    MessagingEventManager,
    LocationSelector
  },
  mixins: [FluroContentEditMixin],

  data() {
    return {
      eventList: null
    };
  },

  created() {
    var self = this;

    if (!self.model.messages) {
      self.$set(self.model, 'messages', []);
    }

    if (!self.model._id) {
      self.$set(self.model, 'autoRecur', false);
    }

    if (!self.model.defaultLocations) {
      self.$set(self.model, 'defaultLocations', []);
    }

    if (!self.model.defaultRooms) {
      self.$set(self.model, 'defaultRooms', []);
    }

    if (!self.model.defaultRosters) {
      self.$set(self.model, 'defaultRosters', []);
    }
  },

  /**
  mounted() {
      if(!this.eventList) {
          console.log('Create and mount')
          this.eventList = this.createEventList();
      }
  },
  /**/
  methods: {
    /**
    createEventList() {
    	    var self = this;
        if(!self.model || !self.model._id) {
            return;
        }
    	    //Load the list view component
        var ListView = import('@/router/routes/List.vue');
        var ListViewInstanceConstructor = Vue.extend(ListView);
    	    
        //Setup the list settings
        var includeArchivedByDefault = true;
        var dateFilterEnabled = true;
        var groupingFunction = self.$fluro.date.groupEventByDate
        var allDefinitions = true;
        var searchInheritable = false;
        var dateFilterPresets = [];
        var dateFilterDefault;
    	    var lockFilter = {
            operator: 'and',
            filters: [{
                key: 'track',
                comparator: '==',
                value: self.model._id,
                dataType: 'reference',
            }],
        }
    	    /////////////////////////////////////////////////
    	    var initialDefaultSort = {
    	        sortKey: 'startDate',
            sortDirection: 'asc',
            sortType: 'date',
        }
    	    /////////////////////////////////////////////////
    	    var initialDefaultFilters = {
            operator: 'and',
            filters: [{
                operator: 'and',
                filters: [{
                    key: 'status',
                    comparator: 'in',
                    values: ['active', 'draft', 'archived'],
                }, ]
            }]
        }
    	    ///////////////////////////////////////
    	    var now = new Date();
    	    dateFilterPresets.push({
            title: 'This Week',
            startDate: moment().startOf('week').toDate(),
            endDate: moment().endOf('week').toDate(),
        });
    	    dateFilterPresets.push({
            title: 'Last Week',
            startDate: moment().subtract(1, 'weeks').startOf('week').toDate(),
            endDate: moment().subtract(1, 'weeks').endOf('week').toDate(),
        });
    	    dateFilterPresets.push({
            title: 'This Month',
            startDate: moment().startOf('month').toDate(),
            endDate: moment().endOf('month').toDate(),
        });
    	    dateFilterPresets.push({
            title: 'Last Month',
            startDate: moment().subtract(1, 'months').startOf('week').toDate(),
            endDate: moment().subtract(1, 'months').endOf('week').toDate(),
        });
    	    dateFilterPresets.push({
            title: 'This Year',
            startDate: moment().startOf('year').toDate(),
            endDate: moment().endOf('year').toDate(),
        });
    	    dateFilterPresets.push({
            title: 'Last Year',
            startDate: moment().subtract(1, 'years').startOf('week').toDate(),
            endDate: moment().subtract(1, 'years').endOf('week').toDate(),
        });
    		    dateFilterDefault = {
            startDate: now, //moment().subtract(12, 'months').toDate(),
            endDate: moment().endOf('year').toDate(), //endDate: now,
        }
    	    //////////////////////////////////
    	    var propsData = {
            type: 'event',
            initialDefaultFilters,
            includeArchivedByDefault,
            initialDefaultSort,
            dateFilterEnabled,
            groupingFunction,
            allDefinitions,
            dateFilterPresets,
            dateFilterDefault,
            searchInheritable,
            lockFilter,
        }
    		    //////////////////////////////////////////////////
    	    return new ListViewInstanceConstructor({
            propsData
        })
    	},
    /**/
    toggleAutoRecur() {
      //console.log('INIT TOGGLE');
      var self = this;

      if (!self.model.autoRecur) {
        //console.log('COLLECTED IS FALSY', self.model.autoRecur);
        return self.$set(self.model, 'autoRecur', true);
      } else {
        //console.log('COLLECTED IS TRUTHY', self.model.autoRecur);
        return self.$set(self.model, 'autoRecur', false);
      }
    }

  },
  computed: {
    fieldsOutput() {
      var self = this;
      var array = [];
      var periodOptions; //console.log('SELF', self);

      if (self.model.recurCount != 1) {
        periodOptions = [{
          name: 'Days',
          value: 'days'
        }, {
          name: 'Weeks',
          value: 'weeks'
        }, {
          name: 'Months',
          value: 'months'
        }, {
          name: 'Years',
          value: 'years'
        }];
      } else {
        periodOptions = [{
          name: 'Day',
          value: 'days'
        }, {
          name: 'Week',
          value: 'weeks'
        }, {
          name: 'Month',
          value: 'months'
        }, {
          name: 'Year',
          value: 'years'
        }];
      } ///////////////////////////////////


      addField('publicTicketingEnabled', {
        title: 'Enable Public Ticketing',
        description: 'Enable ticketing for the public to register for this event',
        minimum: 0,
        maximum: 1,
        type: 'boolean'
      }); ///////////////////////////////////

      addField('title', {
        title: 'Track Title',
        minimum: 1,
        maximum: 1,
        type: 'string',
        placeholder: 'Title'
      });
      addField('firstLine', {
        title: 'Subtitle',
        minimum: 0,
        maximum: 1,
        type: 'string',
        placeholder: 'Subtitle',
        description: 'A short one line description for this event track'
      }); ///////////////////////////////////
      ///////////////////////////////////
      ///////////////////////////////////

      addField('mainImage', {
        title: 'Image',
        description: 'Default image for events in this track',
        minimum: 0,
        maximum: 1,
        type: 'reference',
        directive: 'reference-select',
        params: {
          restrictType: 'image'
        }
      }); ///////////////////////////////////
      ///////////////////////////////////
      ///////////////////////////////////

      addField('defaultPlans', {
        title: 'Default Plans',
        description: "This plan will be duplicated and attached as a 'draft' to new events in this event track",
        minimum: 0,
        maximum: 0,
        type: 'reference',
        directive: 'reference-select',
        params: {
          restrictType: 'plan'
        }
      }); // addField('defaultOwners', {
      //     title: 'Default Owners',
      //     description: "Set the owners of events created in this track",
      //     minimum: 0,
      //     maximum: 0,
      //     type: 'reference',
      //     directive: 'reference-select',
      //     params: {
      //         restrictType: 'persona',
      //     }
      // });
      ///////////////////////////////////
      ///////////////////////////////////
      ///////////////////////////////////

      addField('recurAmount', {
        title: 'Number of Future Events',
        minimum: 1,
        maximum: 1,
        type: 'integer',
        description: 'Fluro will ensure that at any point in time there will be at least this many events into the future',
        defaultValues: [5],
        params: {
          minValue: 1
        }
      });
      var now = new Date();
      addField('nextRecurDate', {
        title: 'Track Start Date',
        minimum: 1,
        maximum: 1,
        type: 'date',
        directive: 'datetimepicker',
        //description: moment(now).fromNow(),
        defaultValues: [now]
      });
      addField('archiveDate', {
        title: 'End Track At',
        minimum: 0,
        maximum: 1,
        type: 'date',
        directive: 'datetimepicker' //description: moment(now).fromNow(),

      }); ///////////////////////////////////

      addField('recurDefinition', {
        title: 'Definition',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'select',
        defaultValues: [''],
        description: 'What definition should be used for events within this track?',
        options: self.defOptions
      });
      addField('recurCount', {
        title: 'Every',
        minimum: 0,
        maximum: 1,
        type: 'integer',
        defaultValues: [1],
        params: {
          minValue: 1
        }
      });
      addField('recurMeasure', {
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'select',
        defaultValues: ['days'],
        options: periodOptions
      });
      addField('recurWeekday', {
        title: 'Weekday',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'select',
        defaultValues: ['Monday'],
        options: [{
          name: 'Monday'
        }, {
          name: 'Tuesday'
        }, {
          name: 'Wednesday'
        }, {
          name: 'Thursday'
        }, {
          name: 'Friday'
        }, {
          name: 'Saturday'
        }, {
          name: 'Sunday'
        }]
      });
      addField('recurNth', {
        title: 'On The',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'select',
        defaultValues: ['date'],
        options: [{
          name: 'Same Date',
          value: 'date'
        }, {
          name: 'First',
          value: '1'
        }, {
          name: 'Second',
          value: '2'
        }, {
          name: 'Third',
          value: '3'
        }, {
          name: 'Fourth',
          value: '4'
        }, {
          name: 'Fifth',
          value: '5'
        }]
      });
      addField('defaultCheckinStartOffset', {
        title: 'Checkin Opens (minutes)',
        minimum: 0,
        maximum: 1,
        type: 'integer',
        placeholder: '90 minutes earlier' //directive: 'timepicker',
        //description: moment(now).fromNow(),

      });
      addField('defaultCheckinEndOffset', {
        title: 'Checkin Closes (minutes)',
        minimum: 0,
        maximum: 1,
        type: 'integer',
        placeholder: '90 minutes later' //directive: 'timepicker',
        //description: moment(now).fromNow(),

      });
      addField('defaultStartTime', {
        title: 'Start Time',
        minimum: 0,
        maximum: 1,
        type: 'string',
        placeholder: '1300' //directive: 'timepicker',
        //description: moment(now).fromNow(),

      });
      addField('defaultDuration', {
        title: 'Duration (Mins)',
        placeholder: '120',
        minimum: 0,
        maximum: 1,
        type: 'integer',
        params: {
          minValue: 0
        }
      });
      addField('defaultTimezone', {
        title: 'Event Timezone',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'timezone-select',
        description: 'Set a local timezone for this event'
      }); ///////////////////////////////////
      ///////////////////////////////////
      ///////////////////////////////////

      addField('defaultTitle', {
        title: 'Default Event Title',
        minimum: 0,
        maximum: 1,
        type: 'string',
        placeholder: "If left blank will be '" + (self.model.title ? self.model.title : "") + "'"
      });
      addField('defaultFirstLine', {
        title: 'Default Event Subtitle',
        minimum: 0,
        maximum: 1,
        type: 'string',
        placeholder: "If left blank will be '" + (self.model.firstLine ? self.model.firstLine : "") + "'"
      });
      addField('defaultBody', {
        title: 'Default Event Body',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'wysiwyg'
      });
      addField('defaultExpectTeams', {
        title: 'Expected Groups/Teams',
        description: "Select groups whose members will be expected to attend events on this track",
        minimum: 0,
        maximum: 0,
        type: 'reference',
        directive: 'reference-select',
        params: {
          restrictType: 'team'
        }
      });
      addField('defaultForms', {
        title: 'Default Registration Forms',
        description: "These forms will be added to each created event on this track",
        minimum: 0,
        maximum: 0,
        type: 'reference',
        directive: 'reference-select',
        params: {
          restrictType: 'form'
        }
      }); ///////////////////////////////////

      function addField(key, details) {
        details.key = key;
        array.push(details); // // Vue.set(self.fields, key, details);
        // if (details.enabled === false) {
        // } else {
        //     details.enabled = true;
        // }
        // var defaultValue = self.getDefaultValue(key, details);
        // Vue.set(self.model, key, defaultValue);
      }

      return array;
    },

    showOutline() {
      return false; //true; //false;//true;//false;//true;
    },

    nextRecurDateFromNow() {
      var self = this;
      return self.$fluro.date.moment(self.model.nextRecurDate).fromNow();
    },

    allPositions() {
      var self = this;
      var options = []; //////////////////////////
      //Add add each definition

      _.each(self.rosterDefinitions.definitions, function (def) {
        if (_.get(def, 'data.slots')) {
          return _.each(def.data.slots, function (slot) {
            if (!options.includes(slot.title)) {
              return options.push(slot.title);
            }
          });
        }
      }); //console.log(options);


      return options;
    }

  },
  asyncComputed: {
    defOptions: {
      default: [],

      get() {
        var self = this;
        return new Promise(function (resolve, reject) {
          self.$fluro.types.get('event', true).then(function (res) {
            var options = [];
            options.push({
              name: 'Basic Event',
              value: ''
            }); //////////////////////////
            //Add add each definition

            _.each(res.definitions, function (def) {
              options.push({
                name: def.title,
                value: def.definitionName
              });
            }); //////////////////////////
            //console.log(options);


            resolve(options);
          }).catch(function (err) {
            reject(err);
          });
        });
      }

    },
    rosterDefinitions: {
      default: [],

      get() {
        var self = this;
        return new Promise(function (resolve, reject) {
          self.$fluro.types.retrieve(['roster']).then(function (res) {
            return resolve(res[0]);
          }).catch(function (err) {
            reject(err);
          });
        });
      }

    },
    locations: {
      default: [],

      get() {
        var self = this;
        return new Promise(function (resolve, reject) {
          self.$fluro.api.get('/content/location?allDefinitions=true').then(function (res) {
            resolve(res.data);
          }).catch(function (err) {
            reject(err);
          });
        });
      }

    }
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
      !_vm.$asyncComputed.defOptions.success &&
      !_vm.$asyncComputed.locations.success
        ? [_c("fluro-page-preloader", { attrs: { contain: "" } })]
        : _c(
            "tabset",
            { attrs: { justified: true, vertical: true } },
            [
              _c(
                "tab",
                { attrs: { heading: "Event Track Info" } },
                [
                  _c(
                    "flex-column-body",
                    { staticStyle: { background: "#fafafa" } },
                    [
                      _c(
                        "v-container",
                        { staticClass: "grid-list-xl" },
                        [
                          _c(
                            "constrain",
                            { attrs: { sm: "" } },
                            [
                              _c("h3", { attrs: { margin: "" } }, [
                                _vm._v("Event Track Details")
                              ]),
                              _vm._v(" "),
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
                                  field: _vm.fieldHash.firstLine
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
              ),
              _vm._v(" "),
              _vm.definition &&
              _vm.definition.fields &&
              _vm.definition.fields.length
                ? _c(
                    "tab",
                    { attrs: { heading: _vm.definition.title + " details" } },
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
                                    _vm._v(_vm._s(_vm.definition.title))
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
                : _vm._e(),
              _vm._v(" "),
              _c(
                "tab",
                { attrs: { heading: "Event Defaults" } },
                [
                  _c(
                    "flex-column-body",
                    { staticStyle: { background: "#fafafa" } },
                    [
                      _c(
                        "v-container",
                        { staticClass: "grid-list-xl" },
                        [
                          _c(
                            "constrain",
                            { attrs: { sm: "" } },
                            [
                              _c("h3", { attrs: { margin: "" } }, [
                                _vm._v("Default Information")
                              ]),
                              _vm._v(" "),
                              _c("p", { staticClass: "muted" }, [
                                _vm._v(
                                  "Add default information for events created on this track."
                                )
                              ]),
                              _vm._v(" "),
                              _c("fluro-content-form-field", {
                                attrs: {
                                  "form-fields": _vm.formFields,
                                  outline: _vm.showOutline,
                                  options: _vm.options,
                                  field: _vm.fieldHash.defaultTitle
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
                              _c("br"),
                              _vm._v(" "),
                              _c("fluro-content-form-field", {
                                attrs: {
                                  "form-fields": _vm.formFields,
                                  outline: _vm.showOutline,
                                  options: _vm.options,
                                  field: _vm.fieldHash.defaultFirstLine
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
                              _c("br"),
                              _vm._v(" "),
                              _c("fluro-content-form-field", {
                                attrs: {
                                  "form-fields": _vm.formFields,
                                  outline: _vm.showOutline,
                                  options: _vm.options,
                                  field: _vm.fieldHash.mainImage
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
                                  _c("fluro-panel-title", [
                                    _c("strong", [_vm._v("Default Times")])
                                  ]),
                                  _vm._v(" "),
                                  _c(
                                    "fluro-panel-body",
                                    [
                                      _c(
                                        "v-layout",
                                        [
                                          _c(
                                            "v-flex",
                                            { attrs: { xs12: "", sm3: "" } },
                                            [
                                              _c("fluro-content-form-field", {
                                                attrs: {
                                                  "form-fields": _vm.formFields,
                                                  outline: _vm.showOutline,
                                                  options: _vm.options,
                                                  field:
                                                    _vm.fieldHash
                                                      .defaultStartTime
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
                                            { attrs: { xs12: "", sm3: "" } },
                                            [
                                              _c("fluro-content-form-field", {
                                                attrs: {
                                                  "form-fields": _vm.formFields,
                                                  outline: _vm.showOutline,
                                                  options: _vm.options,
                                                  field:
                                                    _vm.fieldHash
                                                      .defaultDuration
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
                                                  field:
                                                    _vm.fieldHash
                                                      .defaultTimezone
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
                              ),
                              _vm._v(" "),
                              _c(
                                "fluro-panel",
                                [
                                  _c("fluro-panel-title", [
                                    _c("strong", [_vm._v("Checkin Defaults")])
                                  ]),
                                  _vm._v(" "),
                                  _c(
                                    "fluro-panel-body",
                                    [
                                      _c(
                                        "v-layout",
                                        [
                                          _c(
                                            "v-flex",
                                            { attrs: { xs6: "" } },
                                            [
                                              _c("fluro-content-form-field", {
                                                attrs: {
                                                  "form-fields": _vm.formFields,
                                                  outline: _vm.showOutline,
                                                  options: _vm.options,
                                                  field:
                                                    _vm.fieldHash
                                                      .defaultCheckinStartOffset
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
                                            { attrs: { xs6: "" } },
                                            [
                                              _c("fluro-content-form-field", {
                                                attrs: {
                                                  "form-fields": _vm.formFields,
                                                  outline: _vm.showOutline,
                                                  options: _vm.options,
                                                  field:
                                                    _vm.fieldHash
                                                      .defaultCheckinEndOffset
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
                              ),
                              _vm._v(" "),
                              _c("location-selector", {
                                attrs: {
                                  allLocations: _vm.locations,
                                  locationsPath: "defaultLocations",
                                  roomsPath: "defaultRooms"
                                },
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
                                  field: _vm.fieldHash.defaultPlans
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
                                  field: _vm.fieldHash.defaultBody
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
                                  field: _vm.fieldHash.defaultExpectTeams
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
                              _c("br"),
                              _vm._v(" "),
                              _c("fluro-content-form-field", {
                                attrs: {
                                  "form-fields": _vm.formFields,
                                  outline: _vm.showOutline,
                                  options: _vm.options,
                                  field: _vm.fieldHash.defaultForms
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
              ),
              _vm._v(" "),
              _c(
                "tab",
                { attrs: { heading: "Roster Defaults" } },
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
                            { attrs: { md: "" } },
                            [
                              _c("reminder-event-manager", {
                                attrs: {
                                  config: _vm.config,
                                  allAssignmentOptions: _vm.allPositions
                                },
                                model: {
                                  value: _vm.model.defaultReminders,
                                  callback: function($$v) {
                                    _vm.$set(_vm.model, "defaultReminders", $$v);
                                  },
                                  expression: "model.defaultReminders"
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
              _c(
                "tab",
                { attrs: { heading: "Ticket Defaults" } },
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
                            { attrs: { md: "" } },
                            [
                              _c("h3", { attrs: { margin: "" } }, [
                                _vm._v("Ticketing Defaults")
                              ]),
                              _vm._v(" "),
                              _c("ticket-type-manager", {
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
                                  field: _vm.fieldHash.publicTicketingEnabled
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
              ),
              _vm._v(" "),
              _c(
                "tab",
                { attrs: { heading: "Messaging" } },
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
                            { attrs: { lg: "" } },
                            [
                              _c("h3", { attrs: { margin: "" } }, [
                                _vm._v("Automated Messages")
                              ]),
                              _vm._v(" "),
                              _c("event-message-manager", {
                                model: {
                                  value: _vm.model.defaultMessages,
                                  callback: function($$v) {
                                    _vm.$set(_vm.model, "defaultMessages", $$v);
                                  },
                                  expression: "model.defaultMessages"
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
              _c(
                "tab",
                { attrs: { heading: "Auto create" } },
                [
                  _c(
                    "flex-column-body",
                    { staticStyle: { background: "#fafafa" } },
                    [
                      _c(
                        "v-container",
                        { staticClass: "grid-list-xl" },
                        [
                          _c(
                            "constrain",
                            { attrs: { sm: "" } },
                            [
                              _c(
                                "fluro-panel",
                                [
                                  _c("fluro-panel-title", [
                                    _c(
                                      "div",
                                      {
                                        staticClass: "no-border-no-background",
                                        on: {
                                          click: function($event) {
                                            return _vm.toggleAutoRecur()
                                          }
                                        }
                                      },
                                      [
                                        _c(
                                          "fluro-toggle-item",
                                          {
                                            attrs: {
                                              inactive: !_vm.model.autoRecur
                                            }
                                          },
                                          [_vm._v("Auto-Create Future Events")]
                                        )
                                      ],
                                      1
                                    )
                                  ]),
                                  _vm._v(" "),
                                  _vm.model.autoRecur
                                    ? _c(
                                        "fluro-panel-body",
                                        [
                                          _c(
                                            "v-layout",
                                            { attrs: { row: "", wrap: "" } },
                                            [
                                              _c(
                                                "v-flex",
                                                {
                                                  attrs: { xs12: "", sm12: "" }
                                                },
                                                [
                                                  _c(
                                                    "fluro-content-form-field",
                                                    {
                                                      attrs: {
                                                        "form-fields":
                                                          _vm.formFields,
                                                        outline:
                                                          _vm.showOutline,
                                                        options: _vm.options,
                                                        field:
                                                          _vm.fieldHash
                                                            .recurAmount
                                                      },
                                                      on: { input: _vm.update },
                                                      model: {
                                                        value: _vm.model,
                                                        callback: function(
                                                          $$v
                                                        ) {
                                                          _vm.model = $$v;
                                                        },
                                                        expression: "model"
                                                      }
                                                    }
                                                  )
                                                ],
                                                1
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "v-flex",
                                                {
                                                  attrs: { xs12: "", sm6: "" }
                                                },
                                                [
                                                  _c(
                                                    "fluro-content-form-field",
                                                    {
                                                      attrs: {
                                                        "form-fields":
                                                          _vm.formFields,
                                                        outline:
                                                          _vm.showOutline,
                                                        options: _vm.options,
                                                        field:
                                                          _vm.fieldHash
                                                            .nextRecurDate
                                                      },
                                                      on: { input: _vm.update },
                                                      model: {
                                                        value: _vm.model,
                                                        callback: function(
                                                          $$v
                                                        ) {
                                                          _vm.model = $$v;
                                                        },
                                                        expression: "model"
                                                      }
                                                    }
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "p",
                                                    { staticClass: "muted" },
                                                    [
                                                      _vm._v(
                                                        _vm._s(
                                                          _vm.nextRecurDateFromNow
                                                        )
                                                      )
                                                    ]
                                                  )
                                                ],
                                                1
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "v-flex",
                                                {
                                                  attrs: { xs12: "", sm6: "" }
                                                },
                                                [
                                                  _c(
                                                    "fluro-content-form-field",
                                                    {
                                                      attrs: {
                                                        "form-fields":
                                                          _vm.formFields,
                                                        outline:
                                                          _vm.showOutline,
                                                        options: _vm.options,
                                                        field:
                                                          _vm.fieldHash
                                                            .archiveDate
                                                      },
                                                      on: { input: _vm.update },
                                                      model: {
                                                        value: _vm.model,
                                                        callback: function(
                                                          $$v
                                                        ) {
                                                          _vm.model = $$v;
                                                        },
                                                        expression: "model"
                                                      }
                                                    }
                                                  )
                                                ],
                                                1
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "v-flex",
                                                {
                                                  attrs: { xs12: "", sm12: "" }
                                                },
                                                [
                                                  _c(
                                                    "fluro-content-form-field",
                                                    {
                                                      attrs: {
                                                        "form-fields":
                                                          _vm.formFields,
                                                        outline:
                                                          _vm.showOutline,
                                                        options: _vm.options,
                                                        field:
                                                          _vm.fieldHash
                                                            .recurDefinition
                                                      },
                                                      on: { input: _vm.update },
                                                      model: {
                                                        value: _vm.model,
                                                        callback: function(
                                                          $$v
                                                        ) {
                                                          _vm.model = $$v;
                                                        },
                                                        expression: "model"
                                                      }
                                                    }
                                                  )
                                                ],
                                                1
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "v-flex",
                                                {
                                                  attrs: { xs12: "", sm4: "" }
                                                },
                                                [
                                                  _c(
                                                    "fluro-content-form-field",
                                                    {
                                                      attrs: {
                                                        "form-fields":
                                                          _vm.formFields,
                                                        outline:
                                                          _vm.showOutline,
                                                        options: _vm.options,
                                                        field:
                                                          _vm.fieldHash
                                                            .recurCount
                                                      },
                                                      on: { input: _vm.update },
                                                      model: {
                                                        value: _vm.model,
                                                        callback: function(
                                                          $$v
                                                        ) {
                                                          _vm.model = $$v;
                                                        },
                                                        expression: "model"
                                                      }
                                                    }
                                                  )
                                                ],
                                                1
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "v-flex",
                                                {
                                                  attrs: { xs12: "", sm8: "" }
                                                },
                                                [
                                                  _c(
                                                    "fluro-content-form-field",
                                                    {
                                                      attrs: {
                                                        "form-fields":
                                                          _vm.formFields,
                                                        outline:
                                                          _vm.showOutline,
                                                        options: _vm.options,
                                                        field:
                                                          _vm.fieldHash
                                                            .recurMeasure
                                                      },
                                                      on: { input: _vm.update },
                                                      model: {
                                                        value: _vm.model,
                                                        callback: function(
                                                          $$v
                                                        ) {
                                                          _vm.model = $$v;
                                                        },
                                                        expression: "model"
                                                      }
                                                    }
                                                  )
                                                ],
                                                1
                                              ),
                                              _vm._v(" "),
                                              _vm.model.recurMeasure == "weeks"
                                                ? _c(
                                                    "v-flex",
                                                    {
                                                      attrs: {
                                                        xs12: "",
                                                        sm4: ""
                                                      }
                                                    },
                                                    [
                                                      _c(
                                                        "fluro-content-form-field",
                                                        {
                                                          attrs: {
                                                            "form-fields":
                                                              _vm.formFields,
                                                            outline:
                                                              _vm.showOutline,
                                                            options:
                                                              _vm.options,
                                                            field:
                                                              _vm.fieldHash
                                                                .recurWeekday
                                                          },
                                                          on: {
                                                            input: _vm.update
                                                          },
                                                          model: {
                                                            value: _vm.model,
                                                            callback: function(
                                                              $$v
                                                            ) {
                                                              _vm.model = $$v;
                                                            },
                                                            expression: "model"
                                                          }
                                                        }
                                                      )
                                                    ],
                                                    1
                                                  )
                                                : _vm._e(),
                                              _vm._v(" "),
                                              _vm.model.recurMeasure == "weeks"
                                                ? _c("v-flex", {
                                                    attrs: { xs12: "", sm8: "" }
                                                  })
                                                : _vm._e(),
                                              _vm._v(" "),
                                              _vm.model.recurMeasure == "months"
                                                ? _c(
                                                    "v-flex",
                                                    {
                                                      attrs: {
                                                        xs12: "",
                                                        sm4: ""
                                                      }
                                                    },
                                                    [
                                                      _c(
                                                        "fluro-content-form-field",
                                                        {
                                                          attrs: {
                                                            "form-fields":
                                                              _vm.formFields,
                                                            outline:
                                                              _vm.showOutline,
                                                            options:
                                                              _vm.options,
                                                            field:
                                                              _vm.fieldHash
                                                                .recurNth
                                                          },
                                                          on: {
                                                            input: _vm.update
                                                          },
                                                          model: {
                                                            value: _vm.model,
                                                            callback: function(
                                                              $$v
                                                            ) {
                                                              _vm.model = $$v;
                                                            },
                                                            expression: "model"
                                                          }
                                                        }
                                                      )
                                                    ],
                                                    1
                                                  )
                                                : _vm._e(),
                                              _vm._v(" "),
                                              _vm.model.recurMeasure ==
                                                "months" &&
                                              _vm.model.recurNth == "date"
                                                ? _c(
                                                    "v-flex",
                                                    {
                                                      attrs: {
                                                        xs12: "",
                                                        sm4: ""
                                                      }
                                                    },
                                                    [
                                                      _c(
                                                        "fluro-content-form-field",
                                                        {
                                                          attrs: {
                                                            "form-fields":
                                                              _vm.formFields,
                                                            outline:
                                                              _vm.showOutline,
                                                            options:
                                                              _vm.options,
                                                            field:
                                                              _vm.fieldHash
                                                                .recurWeekday
                                                          },
                                                          on: {
                                                            input: _vm.update
                                                          },
                                                          model: {
                                                            value: _vm.model,
                                                            callback: function(
                                                              $$v
                                                            ) {
                                                              _vm.model = $$v;
                                                            },
                                                            expression: "model"
                                                          }
                                                        }
                                                      )
                                                    ],
                                                    1
                                                  )
                                                : _vm._e(),
                                              _vm._v(" "),
                                              _vm.model.recurMeasure ==
                                                "months" &&
                                              _vm.model.recurNth == "date"
                                                ? _c("v-flex", {
                                                    attrs: { xs12: "", sm4: "" }
                                                  })
                                                : _vm.model.recurMeasure ==
                                                  "months"
                                                ? _c("v-flex", {
                                                    attrs: { xs12: "", sm8: "" }
                                                  })
                                                : _vm._e(),
                                              _vm._v(" "),
                                              _c(
                                                "v-flex",
                                                {
                                                  attrs: { xs12: "", sm3: "" }
                                                },
                                                [
                                                  _c(
                                                    "fluro-content-form-field",
                                                    {
                                                      attrs: {
                                                        "form-fields":
                                                          _vm.formFields,
                                                        outline:
                                                          _vm.showOutline,
                                                        options: _vm.options,
                                                        field:
                                                          _vm.fieldHash
                                                            .defaultStartTime
                                                      },
                                                      on: { input: _vm.update },
                                                      model: {
                                                        value: _vm.model,
                                                        callback: function(
                                                          $$v
                                                        ) {
                                                          _vm.model = $$v;
                                                        },
                                                        expression: "model"
                                                      }
                                                    }
                                                  )
                                                ],
                                                1
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "v-flex",
                                                {
                                                  attrs: { xs12: "", sm3: "" }
                                                },
                                                [
                                                  _c(
                                                    "fluro-content-form-field",
                                                    {
                                                      attrs: {
                                                        "form-fields":
                                                          _vm.formFields,
                                                        outline:
                                                          _vm.showOutline,
                                                        options: _vm.options,
                                                        field:
                                                          _vm.fieldHash
                                                            .defaultDuration
                                                      },
                                                      on: { input: _vm.update },
                                                      model: {
                                                        value: _vm.model,
                                                        callback: function(
                                                          $$v
                                                        ) {
                                                          _vm.model = $$v;
                                                        },
                                                        expression: "model"
                                                      }
                                                    }
                                                  )
                                                ],
                                                1
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "v-flex",
                                                {
                                                  attrs: { xs12: "", sm6: "" }
                                                },
                                                [
                                                  _c(
                                                    "fluro-content-form-field",
                                                    {
                                                      attrs: {
                                                        "form-fields":
                                                          _vm.formFields,
                                                        outline:
                                                          _vm.showOutline,
                                                        options: _vm.options,
                                                        field:
                                                          _vm.fieldHash
                                                            .defaultTimezone
                                                      },
                                                      on: { input: _vm.update },
                                                      model: {
                                                        value: _vm.model,
                                                        callback: function(
                                                          $$v
                                                        ) {
                                                          _vm.model = $$v;
                                                        },
                                                        expression: "model"
                                                      }
                                                    }
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
              _vm.eventList
                ? _c(
                    "tab",
                    { attrs: { heading: "Events" } },
                    [_c(_vm.eventList, { tag: "component" })],
                    1
                  )
                : _vm._e()
            ],
            1
          )
    ],
    2
  )
};
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

  /* style */
  const __vue_inject_styles__$3 = function (inject) {
    if (!inject) return
    inject("data-v-3e0d8e75_0", { source: "\n.no-border-no-background .toggle-item {\n\t\t\t\tborder: none !important;\n\t\t\t\tbackground: none !important;\n\t\t\t\tfont-size: 14px;\n\t\t\t\tpadding: 0px;\n}\n\n", map: {"version":3,"sources":["C:\\Users\\User\\Documents\\fluro\\fluro-vue-ui\\src\\components\\content\\edit\\panels\\eventtrack.vue"],"names":[],"mappings":";AAw3BA;IACA,uBAAA;IACA,2BAAA;IACA,eAAA;IACA,YAAA;AACA","file":"eventtrack.vue","sourcesContent":["<template>\n\t\t\t\t<flex-column>\n\t\t\t\t\t\t\t\t<template v-if=\"!$asyncComputed.defOptions.success && !$asyncComputed.locations.success\">\n\t\t\t\t\t\t\t\t\t\t\t\t<fluro-page-preloader contain />\n\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t<tabset v-else :justified=\"true\" :vertical=\"true\">\n\t\t\t\t\t\t\t\t\t\t\t\t<tab heading=\"Event Track Info\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<flex-column-body style=\"background: #fafafa;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-container class=\"grid-list-xl\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<constrain sm>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h3 margin>Event Track Details</h3>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.title\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.firstLine\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <location-selector v-model=\"model\" :allLocations=\"locations\" locationsPath=\"defaultLocations\" roomsPath=\"defaultRooms\" /> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.defaultPlans\" v-model=\"model\" /> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.defaultOwners\" v-model=\"model\" /> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</constrain>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</flex-column-body>\n\t\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t\t\t\t\t<tab :heading=\"`${definition.title} details`\" v-if=\"definition && definition.fields && definition.fields.length\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<flex-column-body style=\"background: #fafafa;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<constrain sm>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h3 margin>{{definition.title}}</h3>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <pre>{{model.data}}</pre> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form :options=\"options\" v-model=\"model.data\" :fields=\"definition.fields\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-content-form>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</constrain>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</flex-column-body>\n\t\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t\t\t\t\t<tab heading=\"Event Defaults\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<flex-column-body style=\"background: #fafafa;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-container class=\"grid-list-xl\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<constrain sm>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h3 margin>Default Information</h3>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p class=\"muted\">Add default information for events created on this track.</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.defaultTitle\" v-model=\"model\" /><br>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.defaultFirstLine\" v-model=\"model\" /><br>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.mainImage\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel-title>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<strong>Default Times</strong>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel-title>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm3>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.defaultStartTime\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm3>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.defaultDuration\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm6>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.defaultTimezone\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel-title>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<strong>Checkin Defaults</strong>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel-title>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs6>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.defaultCheckinStartOffset\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs6>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.defaultCheckinEndOffset\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<location-selector v-model=\"model\" :allLocations=\"locations\" locationsPath=\"defaultLocations\" roomsPath=\"defaultRooms\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.defaultPlans\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.defaultBody\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.defaultExpectTeams\" v-model=\"model\" /><br>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.defaultForms\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</constrain>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</flex-column-body>\n\t\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t\t\t\t\t<tab heading=\"Roster Defaults\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<flex-column-body style=\"background: #fafafa;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<constrain md>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <default-roster-manager :config=\"config\" v-model=\"model.defaultRosters\" :rosterOptions=\"rosterDefinitions.definitions\"/> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<reminder-event-manager :config=\"config\" v-model=\"model.defaultReminders\" :allAssignmentOptions=\"allPositions\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</constrain>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</flex-column-body>\n\t\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t\t\t\t\t<tab heading=\"Ticket Defaults\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<flex-column-body style=\"background: #fafafa;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<constrain md>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <constrain sm> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h3 margin>Ticketing Defaults</h3>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.forms\" v-model=\"model\"></fluro-content-form-field> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- </constrain> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<ticket-type-manager v-model=\"model\"></ticket-type-manager>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.publicTicketingEnabled\" v-model=\"model\"></fluro-content-form-field>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <pre>{{model.ticketTypes}}</pre> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <pre>{{model.ticketLimit}}</pre> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <ticket-list :event=\"model\" /> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.publicTicketingEnabled\" v-model=\"model\"></fluro-content-form-field> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <ticket-type-manager v-model=\"model\"></ticket-type-manager> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</constrain>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</flex-column-body>\n\t\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t\t\t\t\t<tab heading=\"Messaging\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<flex-column-body style=\"background: #fafafa;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<constrain lg>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h3 margin>Automated Messages</h3>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<event-message-manager v-model=\"model.defaultMessages\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <pre>{{model.messages}}</pre> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <messaging-event-manager :config=\"config\" v-model=\"model.messages\" :startDate=\"model.startDate\" :endDate=\"model.endDate\" /> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</constrain>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</flex-column-body>\n\t\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t\t\t\t\t<tab heading=\"Auto create\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<flex-column-body style=\"background: #fafafa;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-container class=\"grid-list-xl\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<constrain sm>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <h3 margin>Reccuring Automation</h3> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel-title>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"no-border-no-background\" @click=\"toggleAutoRecur()\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-toggle-item :inactive=\"!model.autoRecur\">Auto-Create Future Events</fluro-toggle-item>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel-title>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel-body v-if=\"model.autoRecur\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-layout row wrap>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm12>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.recurAmount\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm6>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.nextRecurDate\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p class=\"muted\">{{nextRecurDateFromNow}}</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm6>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.archiveDate\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm12>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.recurDefinition\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm4>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.recurCount\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm8>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.recurMeasure\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm4 v-if=\"model.recurMeasure == 'weeks'\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.recurWeekday\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm8 v-if=\"model.recurMeasure == 'weeks'\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm4 v-if=\"model.recurMeasure == 'months'\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.recurNth\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm4 v-if=\"(model.recurMeasure == 'months') && (model.recurNth == 'date')\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.recurWeekday\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm4 v-if=\"(model.recurMeasure == 'months') && (model.recurNth == 'date')\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm8 v-else-if=\"model.recurMeasure == 'months'\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm3>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.defaultStartTime\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm3>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.defaultDuration\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm6>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.defaultTimezone\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!--\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h5>Add default information for events that are generated for this track.</h5><br>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.defaultTitle\" v-model=\"model\" /><br>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.defaultFirstLine\" v-model=\"model\" /><br>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.defaultBody\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.defaultExpectTeams\" v-model=\"model\" /><br>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.defaultForms\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t-->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</constrain>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</flex-column-body>\n\t\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t\t\t\t\t<tab heading=\"Events\" v-if=\"eventList\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<component v-bind:is=\"eventList\" />\n\t\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t</tabset>\n\t\t\t\t</flex-column>\n</template>\n<script>\n/////////////////////////////////\n\nimport Vue from 'vue';\nimport _ from 'lodash';\n\n\n/////////////////////////////////\nimport LocationSelector from 'src/components/content/edit/components/LocationSelector.vue';\nimport MessagingEventManager from 'src/components/content/edit/components/MessagingEventManager.vue';\nimport ReminderEventManager from 'src/components/content/edit/components/ReminderEventManager.vue';\nimport DefaultRosterManager from 'src/components/content/edit/components/DefaultRosterManager.vue';\nimport FluroContentEditMixin from 'src/components/content/edit/FluroContentEditMixin.js';\n\n\nimport TicketTypeManager from 'src/components/content/event/TicketTypeManager.vue';\n\n\n/////////////////////////////////\n\nexport default {\n\t\t\t\tcomponents: {\n\t\t\t\t\t\t\t\tTicketTypeManager,\n\t\t\t\t\t\t\t\tDefaultRosterManager,\n\t\t\t\t\t\t\t\tReminderEventManager,\n\t\t\t\t\t\t\t\tMessagingEventManager,\n\t\t\t\t\t\t\t\tLocationSelector,\n\t\t\t\t},\n\t\t\t\tmixins: [FluroContentEditMixin],\n\t\t\t\tdata() {\n\t\t\t\t\t\t\t\treturn {\n\t\t\t\t\t\t\t\t\t\t\t\teventList: null,\n\t\t\t\t\t\t\t\t}\n\t\t\t\t},\n\t\t\t\tcreated() {\n\t\t\t\t\t\t\t\tvar self = this;\n\n\t\t\t\t\t\t\t\tif (!self.model.messages) {\n\t\t\t\t\t\t\t\t\t\t\t\tself.$set(self.model, 'messages', []);\n\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\tif (!self.model._id) {\n\t\t\t\t\t\t\t\t\t\t\t\tself.$set(self.model, 'autoRecur', false);\n\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\tif (!self.model.defaultLocations) {\n\t\t\t\t\t\t\t\t\t\t\t\tself.$set(self.model, 'defaultLocations', []);\n\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\tif (!self.model.defaultRooms) {\n\t\t\t\t\t\t\t\t\t\t\t\tself.$set(self.model, 'defaultRooms', []);\n\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\tif (!self.model.defaultRosters) {\n\t\t\t\t\t\t\t\t\t\t\t\tself.$set(self.model, 'defaultRosters', []);\n\t\t\t\t\t\t\t\t}\n\n\n\n\n\n\n\n\t\t\t\t},\n\t\t\t\t/**\n\t\t\t\tmounted() {\n\t\t\t\t    if(!this.eventList) {\n\t\t\t\t        console.log('Create and mount')\n\t\t\t\t        this.eventList = this.createEventList();\n\t\t\t\t    }\n\t\t\t\t},\n\t\t\t\t/**/\n\t\t\t\tmethods: {\n\t\t\t\t\t\t\t\t/**\n\t\t\t\t\t\t\t\tcreateEventList() {\n\n\t\t\t\t\t\t\t\t    var self = this;\n\t\t\t\t\t\t\t\t    if(!self.model || !self.model._id) {\n\t\t\t\t\t\t\t\t        return;\n\t\t\t\t\t\t\t\t    }\n\n\t\t\t\t\t\t\t\t    //Load the list view component\n\t\t\t\t\t\t\t\t    var ListView = import('@/router/routes/List.vue');\n\t\t\t\t\t\t\t\t    var ListViewInstanceConstructor = Vue.extend(ListView);\n\n\t\t\t\t\t\t\t\t    \n\t\t\t\t\t\t\t\t    //Setup the list settings\n\t\t\t\t\t\t\t\t    var includeArchivedByDefault = true;\n\t\t\t\t\t\t\t\t    var dateFilterEnabled = true;\n\t\t\t\t\t\t\t\t    var groupingFunction = self.$fluro.date.groupEventByDate\n\t\t\t\t\t\t\t\t    var allDefinitions = true;\n\t\t\t\t\t\t\t\t    var searchInheritable = false;\n\t\t\t\t\t\t\t\t    var dateFilterPresets = [];\n\t\t\t\t\t\t\t\t    var dateFilterDefault;\n\n\t\t\t\t\t\t\t\t    var lockFilter = {\n\t\t\t\t\t\t\t\t        operator: 'and',\n\t\t\t\t\t\t\t\t        filters: [{\n\t\t\t\t\t\t\t\t            key: 'track',\n\t\t\t\t\t\t\t\t            comparator: '==',\n\t\t\t\t\t\t\t\t            value: self.model._id,\n\t\t\t\t\t\t\t\t            dataType: 'reference',\n\t\t\t\t\t\t\t\t        }],\n\t\t\t\t\t\t\t\t    }\n\n\t\t\t\t\t\t\t\t    /////////////////////////////////////////////////\n\n\t\t\t\t\t\t\t\t    var initialDefaultSort = {\n\n\t\t\t\t\t\t\t\t        sortKey: 'startDate',\n\t\t\t\t\t\t\t\t        sortDirection: 'asc',\n\t\t\t\t\t\t\t\t        sortType: 'date',\n\t\t\t\t\t\t\t\t    }\n\n\t\t\t\t\t\t\t\t    /////////////////////////////////////////////////\n\n\t\t\t\t\t\t\t\t    var initialDefaultFilters = {\n\t\t\t\t\t\t\t\t        operator: 'and',\n\t\t\t\t\t\t\t\t        filters: [{\n\t\t\t\t\t\t\t\t            operator: 'and',\n\t\t\t\t\t\t\t\t            filters: [{\n\t\t\t\t\t\t\t\t                key: 'status',\n\t\t\t\t\t\t\t\t                comparator: 'in',\n\t\t\t\t\t\t\t\t                values: ['active', 'draft', 'archived'],\n\t\t\t\t\t\t\t\t            }, ]\n\t\t\t\t\t\t\t\t        }]\n\t\t\t\t\t\t\t\t    }\n\n\t\t\t\t\t\t\t\t    ///////////////////////////////////////\n\n\t\t\t\t\t\t\t\t    var now = new Date();\n\n\t\t\t\t\t\t\t\t    dateFilterPresets.push({\n\t\t\t\t\t\t\t\t        title: 'This Week',\n\t\t\t\t\t\t\t\t        startDate: moment().startOf('week').toDate(),\n\t\t\t\t\t\t\t\t        endDate: moment().endOf('week').toDate(),\n\t\t\t\t\t\t\t\t    });\n\n\t\t\t\t\t\t\t\t    dateFilterPresets.push({\n\t\t\t\t\t\t\t\t        title: 'Last Week',\n\t\t\t\t\t\t\t\t        startDate: moment().subtract(1, 'weeks').startOf('week').toDate(),\n\t\t\t\t\t\t\t\t        endDate: moment().subtract(1, 'weeks').endOf('week').toDate(),\n\t\t\t\t\t\t\t\t    });\n\n\t\t\t\t\t\t\t\t    dateFilterPresets.push({\n\t\t\t\t\t\t\t\t        title: 'This Month',\n\t\t\t\t\t\t\t\t        startDate: moment().startOf('month').toDate(),\n\t\t\t\t\t\t\t\t        endDate: moment().endOf('month').toDate(),\n\t\t\t\t\t\t\t\t    });\n\n\t\t\t\t\t\t\t\t    dateFilterPresets.push({\n\t\t\t\t\t\t\t\t        title: 'Last Month',\n\t\t\t\t\t\t\t\t        startDate: moment().subtract(1, 'months').startOf('week').toDate(),\n\t\t\t\t\t\t\t\t        endDate: moment().subtract(1, 'months').endOf('week').toDate(),\n\t\t\t\t\t\t\t\t    });\n\n\t\t\t\t\t\t\t\t    dateFilterPresets.push({\n\t\t\t\t\t\t\t\t        title: 'This Year',\n\t\t\t\t\t\t\t\t        startDate: moment().startOf('year').toDate(),\n\t\t\t\t\t\t\t\t        endDate: moment().endOf('year').toDate(),\n\t\t\t\t\t\t\t\t    });\n\n\t\t\t\t\t\t\t\t    dateFilterPresets.push({\n\t\t\t\t\t\t\t\t        title: 'Last Year',\n\t\t\t\t\t\t\t\t        startDate: moment().subtract(1, 'years').startOf('week').toDate(),\n\t\t\t\t\t\t\t\t        endDate: moment().subtract(1, 'years').endOf('week').toDate(),\n\t\t\t\t\t\t\t\t    });\n\n\n\t\t\t\t\t\t\t\t    dateFilterDefault = {\n\t\t\t\t\t\t\t\t        startDate: now, //moment().subtract(12, 'months').toDate(),\n\t\t\t\t\t\t\t\t        endDate: moment().endOf('year').toDate(), //endDate: now,\n\t\t\t\t\t\t\t\t    }\n\n\t\t\t\t\t\t\t\t    //////////////////////////////////\n\n\t\t\t\t\t\t\t\t    var propsData = {\n\t\t\t\t\t\t\t\t        type: 'event',\n\t\t\t\t\t\t\t\t        initialDefaultFilters,\n\t\t\t\t\t\t\t\t        includeArchivedByDefault,\n\t\t\t\t\t\t\t\t        initialDefaultSort,\n\t\t\t\t\t\t\t\t        dateFilterEnabled,\n\t\t\t\t\t\t\t\t        groupingFunction,\n\t\t\t\t\t\t\t\t        allDefinitions,\n\t\t\t\t\t\t\t\t        dateFilterPresets,\n\t\t\t\t\t\t\t\t        dateFilterDefault,\n\t\t\t\t\t\t\t\t        searchInheritable,\n\t\t\t\t\t\t\t\t        lockFilter,\n\t\t\t\t\t\t\t\t    }\n\n\n\t\t\t\t\t\t\t\t    //////////////////////////////////////////////////\n\n\t\t\t\t\t\t\t\t    return new ListViewInstanceConstructor({\n\t\t\t\t\t\t\t\t        propsData\n\t\t\t\t\t\t\t\t    })\n\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t/**/\n\t\t\t\t\t\t\t\ttoggleAutoRecur() {\n\t\t\t\t\t\t\t\t\t\t\t\t//console.log('INIT TOGGLE');\n\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\t\t\t\t\t\t\t\t\t\t\t\tif (!self.model.autoRecur) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t//console.log('COLLECTED IS FALSY', self.model.autoRecur);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn self.$set(self.model, 'autoRecur', true);\n\t\t\t\t\t\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t//console.log('COLLECTED IS TRUTHY', self.model.autoRecur);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn self.$set(self.model, 'autoRecur', false);\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t},\n\t\t\t\t},\n\t\t\t\tcomputed: {\n\t\t\t\t\t\t\t\tfieldsOutput() {\n\n\n\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\t\t\t\t\t\t\t\t\t\t\t\tvar array = [];\n\t\t\t\t\t\t\t\t\t\t\t\tvar periodOptions;\n\t\t\t\t\t\t\t\t\t\t\t\t//console.log('SELF', self);\n\t\t\t\t\t\t\t\t\t\t\t\tif (self.model.recurCount != 1) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tperiodOptions = [{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tname: 'Days',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue: 'days',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tname: 'Weeks',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue: 'weeks',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tname: 'Months',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue: 'months',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tname: 'Years',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue: 'years',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t];\n\t\t\t\t\t\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tperiodOptions = [{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tname: 'Day',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue: 'days',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tname: 'Week',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue: 'weeks',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tname: 'Month',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue: 'months',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tname: 'Year',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue: 'years',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t];\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('publicTicketingEnabled', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Enable Public Ticketing',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescription: 'Enable ticketing for the public to register for this event',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'boolean',\n\n\t\t\t\t\t\t\t\t\t\t\t\t})\n\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('title', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Track Title',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'string',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tplaceholder: 'Title',\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('firstLine', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Subtitle',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'string',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tplaceholder: 'Subtitle',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescription: 'A short one line description for this event track',\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('mainImage', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Image',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescription: 'Default image for events in this track',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'reference',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdirective: 'reference-select',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tparams: {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\trestrictType: 'image',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('defaultPlans', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Default Plans',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescription: \"This plan will be duplicated and attached as a 'draft' to new events in this event track\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'reference',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdirective: 'reference-select',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tparams: {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\trestrictType: 'plan',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t// addField('defaultOwners', {\n\t\t\t\t\t\t\t\t\t\t\t\t//     title: 'Default Owners',\n\t\t\t\t\t\t\t\t\t\t\t\t//     description: \"Set the owners of events created in this track\",\n\t\t\t\t\t\t\t\t\t\t\t\t//     minimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t//     maximum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t//     type: 'reference',\n\t\t\t\t\t\t\t\t\t\t\t\t//     directive: 'reference-select',\n\t\t\t\t\t\t\t\t\t\t\t\t//     params: {\n\t\t\t\t\t\t\t\t\t\t\t\t//         restrictType: 'persona',\n\t\t\t\t\t\t\t\t\t\t\t\t//     }\n\t\t\t\t\t\t\t\t\t\t\t\t// });\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('recurAmount', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Number of Future Events',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'integer',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescription: 'Fluro will ensure that at any point in time there will be at least this many events into the future',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdefaultValues: [5],\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tparams: {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminValue: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\t\t\t\t\t\tvar now = new Date()\n\t\t\t\t\t\t\t\t\t\t\t\taddField('nextRecurDate', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Track Start Date',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'date',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdirective: 'datetimepicker',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t//description: moment(now).fromNow(),\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdefaultValues: [now],\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('archiveDate', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'End Track At',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'date',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdirective: 'datetimepicker',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t//description: moment(now).fromNow(),\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('recurDefinition', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Definition',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'string',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdirective: 'select',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdefaultValues: [''],\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescription: 'What definition should be used for events within this track?',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\toptions: self.defOptions,\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('recurCount', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Every',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'integer',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdefaultValues: [1],\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tparams: {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminValue: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('recurMeasure', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'string',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdirective: 'select',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdefaultValues: ['days'],\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\toptions: periodOptions,\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('recurWeekday', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Weekday',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'string',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdirective: 'select',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdefaultValues: ['Monday'],\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\toptions: [{ name: 'Monday' }, { name: 'Tuesday' }, { name: 'Wednesday' }, { name: 'Thursday' }, { name: 'Friday' }, { name: 'Saturday' }, { name: 'Sunday' }],\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('recurNth', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'On The',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'string',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdirective: 'select',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdefaultValues: ['date'],\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\toptions: [{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tname: 'Same Date',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue: 'date',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tname: 'First',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue: '1',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tname: 'Second',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue: '2',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tname: 'Third',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue: '3',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tname: 'Fourth',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue: '4',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tname: 'Fifth',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue: '5',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t],\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\n\n\n\n\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('defaultCheckinStartOffset', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Checkin Opens (minutes)',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'integer',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tplaceholder: '90 minutes earlier',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t//directive: 'timepicker',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t//description: moment(now).fromNow(),\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('defaultCheckinEndOffset', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Checkin Closes (minutes)',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'integer',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tplaceholder: '90 minutes later',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t//directive: 'timepicker',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t//description: moment(now).fromNow(),\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('defaultStartTime', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Start Time',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'string',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tplaceholder: '1300',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t//directive: 'timepicker',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t//description: moment(now).fromNow(),\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('defaultDuration', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Duration (Mins)',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tplaceholder: '120',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'integer',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tparams: {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminValue: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('defaultTimezone', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Event Timezone',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'string',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdirective: 'timezone-select',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescription: 'Set a local timezone for this event',\n\t\t\t\t\t\t\t\t\t\t\t\t})\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('defaultTitle', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Default Event Title',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'string',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tplaceholder: \"If left blank will be '\" + (self.model.title ? self.model.title : \"\") + \"'\",\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('defaultFirstLine', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Default Event Subtitle',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'string',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tplaceholder: \"If left blank will be '\" + (self.model.firstLine ? self.model.firstLine : \"\") + \"'\",\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('defaultBody', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Default Event Body',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'string',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdirective: 'wysiwyg',\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('defaultExpectTeams', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Expected Groups/Teams',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescription: \"Select groups whose members will be expected to attend events on this track\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'reference',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdirective: 'reference-select',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tparams: {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\trestrictType: 'team',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('defaultForms', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Default Registration Forms',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescription: \"These forms will be added to each created event on this track\",\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'reference',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdirective: 'reference-select',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tparams: {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\trestrictType: 'form',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\n\t\t\t\t\t\t\t\t\t\t\t\tfunction addField(key, details) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdetails.key = key;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tarray.push(details)\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// // Vue.set(self.fields, key, details);\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// if (details.enabled === false) {\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// } else {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t//     details.enabled = true;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// }\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// var defaultValue = self.getDefaultValue(key, details);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// Vue.set(self.model, key, defaultValue);\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t\t\treturn array;\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tshowOutline() {\n\t\t\t\t\t\t\t\t\t\t\t\treturn false; //true; //false;//true;//false;//true;\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tnextRecurDateFromNow() {\n\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\t\t\t\t\t\t\t\t\t\t\t\treturn self.$fluro.date.moment(self.model.nextRecurDate).fromNow();\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tallPositions() {\n\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\t\t\t\t\t\t\t\t\t\t\t\tvar options = [];\n\t\t\t\t\t\t\t\t\t\t\t\t//////////////////////////\n\t\t\t\t\t\t\t\t\t\t\t\t//Add add each definition\n\n\t\t\t\t\t\t\t\t\t\t\t\t_.each(self.rosterDefinitions.definitions, function(def) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tif (_.get(def, 'data.slots')) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn _.each(def.data.slots, function(slot) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tif (!options.includes(slot.title)) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn options.push(slot.title);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\t\t\t\t\t\t//console.log(options);\n\t\t\t\t\t\t\t\t\t\t\t\treturn options;\n\t\t\t\t\t\t\t\t},\n\t\t\t\t},\n\t\t\t\tasyncComputed: {\n\t\t\t\t\t\t\t\tdefOptions: {\n\t\t\t\t\t\t\t\t\t\t\t\tdefault: [],\n\t\t\t\t\t\t\t\t\t\t\t\tget() {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn new Promise(function(resolve, reject) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tself.$fluro.types.get('event', true)\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t.then(function(res) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvar options = [];\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\toptions.push({\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tname: 'Basic Event',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue: '',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t//////////////////////////\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t//Add add each definition\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t_.each(res.definitions, function(def) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\toptions.push({\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tname: def.title,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue: def.definitionName,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t//////////////////////////\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t//console.log(options);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tresolve(options);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t.catch(function(err) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treject(err);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\trosterDefinitions: {\n\t\t\t\t\t\t\t\t\t\t\t\tdefault: [],\n\t\t\t\t\t\t\t\t\t\t\t\tget() {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn new Promise(function(resolve, reject) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tself.$fluro.types.retrieve(['roster'])\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t.then(function(res) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn resolve(res[0]);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t.catch(function(err) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treject(err);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tlocations: {\n\t\t\t\t\t\t\t\t\t\t\t\tdefault: [],\n\t\t\t\t\t\t\t\t\t\t\t\tget() {\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn new Promise(function(resolve, reject) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tself.$fluro.api.get('/content/location?allDefinitions=true')\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t.then(function(res) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tresolve(res.data);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t.catch(function(err) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treject(err);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t})\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t},\n\t\t\t\t}\n}\n\n</script>\n<style>\n.no-border-no-background .toggle-item {\n\t\t\t\tborder: none !important;\n\t\t\t\tbackground: none !important;\n\t\t\t\tfont-size: 14px;\n\t\t\t\tpadding: 0px;\n}\n\n</style>\n"]}, media: undefined });

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
//# sourceMappingURL=eventtrack-3605a2e2.js.map
