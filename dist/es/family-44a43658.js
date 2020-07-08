
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { aN as FluroContentForm, aO as FluroContentFormField, at as FluroStatusSelect, f as FluroAvatar, bo as _, bm as __vue_normalize__, bn as __vue_create_injector__, aR as FluroAcademicSelect } from './index-23f8542b.js';
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
import { F as FluroContentEditMixin } from './FluroContentEditMixin-5e3fb788.js';
import { A as AddressManager } from './AddressManager-98e2d98c.js';

//

var script = {
  props: {
    value: {
      type: Object,
      default: {}
    },
    contactDefinitions: {
      type: Array
    }
  },
  components: {
    FluroContentForm,
    FluroContentFormField,
    FluroStatusSelect,
    FluroAvatar
  },

  data() {
    return {
      model: this.value
    };
  },

  created() {
    var self = this;

    if (!self.model.definition) {
      self.model.definition = '';
    }

    if (!self.model.householdRole) {
      self.model.householdRole = '';
    }
  },

  watch: {
    contactStatus: function () {
      this.save();
    }
  },
  methods: {
    editContact() {
      var self = this;
      self.$fluro.global.edit(self.model, true).then(function (res) {
        _.assign(self.model, res);

        console.log('Update');
      });
    },

    viewContact() {
      var self = this;
      self.$fluro.global.view(self.model, true);
    },

    save: _.debounce(function () {
      console.log('TRIGGER UPDATE');
      var self = this;
      var data = {
        'householdRole': self.model.householdRole,
        'definition': self.model.definition,
        'status': self.model.status
      };
      self.$fluro.api.put(`content/contact/${self.model._id}`, data).then(function (res) {
        self.$fluro.notify(`${self.model.title} was successfully updated!`);
      }).catch(function (err) {
        self.$fluro.error(err);
      });
    }, 100)
  },
  computed: {
    contactName() {
      return this.model.title;
    },

    contactAge() {
      return this.model.age;
    },

    contactGender() {
      if (this.model.gender) {
        return this.model.gender;
      }
    },

    contactStatus() {
      return this.model.status;
    },

    fields() {
      var self = this;
      var array = []; ///////////////////////////////////

      addField('householdRole', {
        title: 'Family Role',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'select',
        defaultValues: [''],
        options: [{
          name: 'None / Other',
          value: ''
        }, {
          name: 'Parent',
          value: 'parent'
        }, {
          name: 'Guardian',
          value: 'guardian'
        }, {
          name: 'Child',
          value: 'child'
        }]
      }); ///////////////////////////////////

      addField('definition', {
        title: 'Definition',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'select',
        defaultValues: [''],
        options: self.contactDefinitions
      });

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
  return _vm.model
    ? _c(
        "v-container",
        {
          staticClass: "card",
          class: _vm.model.status,
          attrs: { fluid: "", "grid-lines-sm": "" }
        },
        [
          _c("fluro-content-form", {
            attrs: { fields: _vm.fields },
            on: { input: _vm.save },
            scopedSlots: _vm._u(
              [
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
                        "v-layout",
                        { attrs: { column: "" } },
                        [
                          _c(
                            "v-flex",
                            { staticClass: "avatar-flex" },
                            [
                              _c("fluro-avatar", {
                                staticClass: "avatar-icon",
                                attrs: { id: model._id, type: "contact" }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-flex",
                            { staticClass: "text-centered less-padding" },
                            [_c("h4", [_vm._v(_vm._s(_vm.contactName))])]
                          ),
                          _vm._v(" "),
                          _c(
                            "v-flex",
                            { staticClass: "less-padding status-flex" },
                            [
                              _c("fluro-status-select", {
                                model: {
                                  value: model.status,
                                  callback: function($$v) {
                                    _vm.$set(model, "status", $$v);
                                  },
                                  expression: "model.status"
                                }
                              })
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-flex",
                            { staticClass: "text-centered less-padding" },
                            [
                              _c(
                                "p",
                                {
                                  staticClass: "muted",
                                  staticStyle: { "margin-bottom": "0px" }
                                },
                                [
                                  _vm._v(
                                    _vm._s(_vm.contactGender) +
                                      " " +
                                      _vm._s(_vm.contactAge)
                                  )
                                ]
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "v-flex",
                            { staticClass: "less-padding" },
                            [
                              _c("fluro-content-form-field", {
                                attrs: {
                                  "form-fields": formFields,
                                  options: options,
                                  field: fieldHash.householdRole
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
                          _vm.contactDefinitions &&
                          _vm.contactDefinitions.length
                            ? _c(
                                "v-flex",
                                { staticClass: "less-padding" },
                                [
                                  _c("fluro-content-form-field", {
                                    attrs: {
                                      "form-fields": formFields,
                                      options: options,
                                      field: fieldHash.definition
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
                            : _vm._e()
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-layout",
                        { attrs: { "align-center": "" } },
                        [
                          _c(
                            "v-flex",
                            [
                              _c(
                                "v-btn",
                                {
                                  attrs: { block: "" },
                                  on: {
                                    click: function($event) {
                                      return _vm.editContact()
                                    }
                                  }
                                },
                                [
                                  _vm._v(
                                    "\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tEdit\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t"
                                  )
                                ]
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c("v-spacer"),
                          _vm._v(" "),
                          _c(
                            "v-flex",
                            [
                              _c(
                                "v-btn",
                                {
                                  attrs: { block: "" },
                                  on: {
                                    click: function($event) {
                                      return _vm.viewContact()
                                    }
                                  }
                                },
                                [
                                  _vm._v(
                                    "\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tView\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t"
                                  )
                                ]
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
              ],
              null,
              false,
              3762073082
            ),
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
    : _vm._e()
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-724690c4_0", { source: "\n.card {\n\t\t\t\twidth: 100%;\n\t\t\t\theight: 100%;\n}\n.avatar-icon {\n\t\t\t\twidth: 80% !important;\n\t\t\t\tdisplay: block;\n}\n.avatar-flex {\n\t\t\t\tdisplay: flex;\n\t\t\t\twidth: 100%;\n\t\t\t\tjustify-content: center;\n}\n.status-flex {\n\t\t\t\tdisplay: flex;\n\t\t\t\twidth: 100%;\n\t\t\t\tjustify-content: center;\n}\n.text-centered {\n\t\t\t\ttext-align: center;\n}\n.less-padding {\n\t\t\t\tpadding: 4px 8px !important;\n}\n.archived {\n\t\t\t\topacity: 0.5;\n}\n.draft {\n\t\t\t\tborder: dashed orange 1px;\n}\n\n", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/edit/components/FamilyMemberCard.vue"],"names":[],"mappings":";AAkMA;IACA,WAAA;IACA,YAAA;AACA;AAEA;IACA,qBAAA;IACA,cAAA;AACA;AAEA;IACA,aAAA;IACA,WAAA;IACA,uBAAA;AACA;AAEA;IACA,aAAA;IACA,WAAA;IACA,uBAAA;AACA;AAEA;IACA,kBAAA;AACA;AAEA;IACA,2BAAA;AACA;AAEA;IACA,YAAA;AACA;AAEA;IACA,yBAAA;AACA","file":"FamilyMemberCard.vue","sourcesContent":["<template>\n\t\t\t\t<v-container fluid grid-lines-sm class=\"card\" :class=\"model.status\" v-if=\"model\">\n\t\t\t\t\t\t\t\t<fluro-content-form @input=\"save\" v-model=\"model\" :fields=\"fields\">\n\t\t\t\t\t\t\t\t\t\t\t\t<template v-slot:form=\"{formFields, fieldHash, model, update, options}\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-layout column>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex class=\"avatar-flex\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-avatar class=\"avatar-icon\" :id=\"model._id\" type=\"contact\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex class=\"text-centered less-padding\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h4>{{contactName}}</h4>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex class=\"less-padding status-flex\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-status-select v-model=\"model.status\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex class=\"text-centered less-padding\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p class=\"muted\" style=\"margin-bottom: 0px\">{{contactGender}} {{contactAge}}</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex class=\"less-padding\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.householdRole\" v-model=\"model\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-content-form-field>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex class=\"less-padding\" v-if=\"contactDefinitions && contactDefinitions.length\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" @input=\"update\" :options=\"options\" :field=\"fieldHash.definition\" v-model=\"model\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-content-form-field>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-layout align-center>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-btn block @click=\"editContact()\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tEdit\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-btn>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-spacer />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-btn block @click=\"viewContact()\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tView\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-btn>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t</fluro-content-form>\n\t\t\t\t</v-container>\n</template>\n<script>\n/////////////////////////////////\n\nimport FluroContentForm from 'src/components/form/FluroContentForm.vue';\nimport FluroContentFormField from 'src/components/form/FluroContentFormField.vue';\nimport FluroStatusSelect from 'src/components/form/FluroStatusSelect.vue';\nimport FluroAvatar from 'src/components/FluroAvatar.vue';\nimport _ from 'lodash';\n\n\n/////////////////////////////////\n\nexport default {\n\t\t\t\tprops: {\n\t\t\t\t\t\t\t\tvalue: {\n\t\t\t\t\t\t\t\t\t\t\t\ttype: Object,\n\t\t\t\t\t\t\t\t\t\t\t\tdefault: {},\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tcontactDefinitions: {\n\t\t\t\t\t\t\t\t\t\t\t\ttype: Array,\n\t\t\t\t\t\t\t\t}\n\t\t\t\t},\n\t\t\t\tcomponents: {\n\t\t\t\t\t\t\t\tFluroContentForm,\n\t\t\t\t\t\t\t\tFluroContentFormField,\n\t\t\t\t\t\t\t\tFluroStatusSelect,\n\t\t\t\t\t\t\t\tFluroAvatar,\n\t\t\t\t},\n\t\t\t\tdata() {\n\t\t\t\t\t\t\t\treturn {\n\t\t\t\t\t\t\t\t\t\t\t\tmodel: this.value,\n\t\t\t\t\t\t\t\t}\n\t\t\t\t},\n\t\t\t\tcreated() {\n\t\t\t\t\t\t\t\tvar self = this;\n\t\t\t\t\t\t\t\tif (!self.model.definition) {\n\t\t\t\t\t\t\t\t\t\t\t\tself.model.definition = '';\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\tif (!self.model.householdRole) {\n\t\t\t\t\t\t\t\t\t\t\t\tself.model.householdRole = '';\n\t\t\t\t\t\t\t\t}\n\t\t\t\t},\n\t\t\t\twatch: {\n\t\t\t\t\t\t\t\tcontactStatus: function() {\n\t\t\t\t\t\t\t\t\t\t\t\tthis.save();\n\t\t\t\t\t\t\t\t}\n\t\t\t\t},\n\t\t\t\tmethods: {\n\t\t\t\t\t\t\t\teditContact() {\n\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\t\t\t\t\t\t\t\t\t\t\t\tself.$fluro.global.edit(self.model, true)\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t.then(function(res) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t_.assign(self.model, res);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tconsole.log('Update')\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tviewContact() {\n\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\t\t\t\t\t\t\t\t\t\t\t\tself.$fluro.global.view(self.model, true);\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tsave: _.debounce(function() {\n\t\t\t\t\t\t\t\t\t\t\t\tconsole.log('TRIGGER UPDATE');\n\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\t\t\t\t\t\t\t\t\t\t\t\tvar data = {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t'householdRole': self.model.householdRole,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t'definition': self.model.definition,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t'status': self.model.status,\n\t\t\t\t\t\t\t\t\t\t\t\t};\n\n\t\t\t\t\t\t\t\t\t\t\t\tself.$fluro.api.put(`content/contact/${self.model._id}`, data).then(function(res) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tself.$fluro.notify(`${self.model.title} was successfully updated!`);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t.catch(function(err) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tself.$fluro.error(err);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\t\t}, 100),\n\t\t\t\t},\n\t\t\t\tcomputed: {\n\t\t\t\t\t\t\t\tcontactName() {\n\t\t\t\t\t\t\t\t\t\t\t\treturn this.model.title;\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tcontactAge() {\n\t\t\t\t\t\t\t\t\t\t\t\treturn this.model.age;\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tcontactGender() {\n\t\t\t\t\t\t\t\t\t\t\t\tif (this.model.gender) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn this.model.gender;\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tcontactStatus() {\n\t\t\t\t\t\t\t\t\t\t\t\treturn this.model.status;\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tfields() {\n\n\n\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\t\t\t\t\t\t\t\t\t\t\t\tvar array = [];\n\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('householdRole', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Family Role',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'string',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdirective: 'select',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdefaultValues: [''],\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\toptions: [{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tname: 'None / Other',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue: '',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tname: 'Parent',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue: 'parent',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tname: 'Guardian',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue: 'guardian',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tname: 'Child',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue: 'child',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t]\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('definition', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Definition',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'string',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdirective: 'select',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdefaultValues: [''],\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\toptions: self.contactDefinitions,\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\n\t\t\t\t\t\t\t\t\t\t\t\tfunction addField(key, details) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdetails.key = key;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tarray.push(details)\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t\t\treturn array;\n\t\t\t\t\t\t\t\t},\n\t\t\t\t},\n}\n\n</script>\n<style>\n.card {\n\t\t\t\twidth: 100%;\n\t\t\t\theight: 100%;\n}\n\n.avatar-icon {\n\t\t\t\twidth: 80% !important;\n\t\t\t\tdisplay: block;\n}\n\n.avatar-flex {\n\t\t\t\tdisplay: flex;\n\t\t\t\twidth: 100%;\n\t\t\t\tjustify-content: center;\n}\n\n.status-flex {\n\t\t\t\tdisplay: flex;\n\t\t\t\twidth: 100%;\n\t\t\t\tjustify-content: center;\n}\n\n.text-centered {\n\t\t\t\ttext-align: center;\n}\n\n.less-padding {\n\t\t\t\tpadding: 4px 8px !important;\n}\n\n.archived {\n\t\t\t\topacity: 0.5;\n}\n\n.draft {\n\t\t\t\tborder: dashed orange 1px;\n}\n\n</style>\n"]}, media: undefined });

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
  components: {
    AddressManager,
    FamilyMemberCard: __vue_component__
  },

  created() {
    //If we are creating a new family
    if (!this.model._id) {
      //Set the postal address to be the same by default
      this.$set(this.model, 'samePostal', true);
    }
  },

  mixins: [FluroContentEditMixin],
  computed: {
    members() {
      return _.orderBy(this.model.items, function (contact) {
        if (contact.householdRole == 'parent') {
          return -1;
        }

        if (contact.age) {
          return 120 - parseInt(contact.age);
        }

        return 0;
      });
    },

    fieldsOutput() {
      var self = this;
      var array = []; ///////////////////////////////////

      addField('title', {
        title: 'Title/Family Name',
        placeholder: 'Family Name',
        minimum: 1,
        maximum: 1,
        type: 'string',
        params: {
          autofocus: !self.model._id
        }
      }); ///////////////////////////////////

      addField('phoneNumbers', {
        title: 'Household Phone Number',
        minimum: 0,
        maximum: 0,
        type: 'string'
      });
      addField('emails', {
        title: 'Household Email Address',
        minimum: 0,
        maximum: 0,
        type: 'email'
      }); /////////////////////////////////////

      var contactFields = []; /////////////////////////////////////

      var row0 = {
        title: 'Definition',
        key: 'definitions',
        type: 'group',
        sameLine: true
      };
      row0.fields = [{
        title: 'Household Role',
        key: 'householdRole',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'select',
        options: [{
          title: 'None',
          value: ''
        }, {
          title: 'Parent',
          value: 'parent'
        }, {
          title: 'Child',
          value: 'child'
        }]
      }, {
        title: 'Definition',
        key: 'definition',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'select',
        options: self.contactDefinitionOptions,
        expressions: {
          hide() {
            var number = !self.contactDefinitions || !self.contactDefinitions.length; // console.log('NUMBER?', number, self.contactDefinitions)

            return number;
          }

        }
      }];
      contactFields.push(row0); /////////////////////////////////////

      var row1 = {
        title: 'Names',
        key: 'names',
        type: 'group',
        sameLine: true
      };
      row1.fields = [{
        title: 'First Name',
        key: 'firstName',
        minimum: 1,
        maximum: 1,
        type: 'string'
      }, {
        title: 'Last Name',
        key: 'lastName',
        placeholder: self.model.title,
        minimum: 0,
        maximum: 1,
        type: 'string',
        expressions: {
          defaultValue() {
            return self.model.title;
          }

        }
      }];
      contactFields.push(row1); /////////////////////////////////////

      var row2 = {
        title: 'Bits',
        key: 'bits',
        type: 'group',
        sameLine: true
      };
      row2.fields = [{
        title: 'Gender',
        key: 'gender',
        minimum: 0,
        maximum: 1,
        type: 'string',
        directive: 'select',
        options: [{
          title: 'Male',
          value: 'male'
        }, {
          title: 'Female',
          value: 'female'
        }, {
          title: 'Unknown',
          value: ''
        }]
      }, {
        title: 'Date of Birth',
        key: 'dob',
        minimum: 0,
        maximum: 1,
        type: 'date'
      }];
      contactFields.push(row2); /////////////////////////////////////
      /////////////////////////////////////

      var row3 = {
        title: 'Comms',
        key: 'comms',
        type: 'group',
        sameLine: true
      };
      row3.fields = [{
        title: 'Email Address',
        key: 'emails',
        minimum: 0,
        maximum: 0,
        type: 'email'
      }, {
        title: 'Phone Number',
        key: 'phoneNumbers',
        minimum: 0,
        maximum: 0,
        type: 'string'
      }];
      contactFields.push(row3);
      var row4 = {
        title: 'Comms',
        key: 'realmsandstuff',
        type: 'group',
        sameLine: true,
        fields: []
      };
      row4.fields = [{
        title: 'Realms',
        description: 'If different from the family',
        key: 'realms',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        directive: 'realmselect',
        params: {
          restrictType: 'realm'
        },
        expressions: {
          defaultValue() {
            return self.model.realms.slice();
          }

        }
      }, {
        title: 'Tags',
        key: 'tags',
        minimum: 0,
        maximum: 0,
        type: 'reference',
        directive: 'content-select-button',
        params: {
          restrictType: 'tag',
          allDefinitions: true
        }
      }];
      contactFields.push({
        title: 'School / Academic Calendar',
        key: '_academic',
        minimum: 0,
        maximum: 1,
        type: 'string',
        customComponent: FluroAcademicSelect,
        expressions: {
          hide: `model.householdRole == 'parent'`
        }
      });
      contactFields.push(row4); // <fluro-academic-select :form-fields="formFields" :outline="showOutline" :options="formOptions" @calendar="updateAcademicCalendar" @grade="updateAcademicGrade" v-model="model" />
      //                             </fluro-academic-select>

      var minimumFamilyMembers = self.model._context == 'contact' ? 0 : 1;
      addField('items', {
        title: self.model._context == 'contact' ? 'Additional Family Member' : 'Family Member',
        minimum: minimumFamilyMembers,
        maximum: 0,
        type: 'group',
        asObject: true,
        askCount: minimumFamilyMembers,
        fields: contactFields,
        expressions: {
          hide() {
            return self.model._context == 'contact';
          }

        }
      });

      function addField(key, details) {
        details.key = key;
        array.push(details);
      }

      return array;
    },

    membersLength() {
      var self = this;

      if (_.get(self.model, 'items')) {
        return self.model.items.length;
      } else {
        return 0;
      }
    },

    contactDefinitionOptions() {
      var self = this;
      var options = self.contactDefinitions.slice();

      if (options.length) {
        options.unshift({
          name: 'None',
          value: ''
        });
      }

      return options;
    }

  },
  methods: {
    toggleSamePostal() {
      var self = this;
      console.log('Toggle Same Postal!', self.model.samePostal);
      self.$set(self.model, 'samePostal', !self.model.samePostal); // if (!self.model.samePostal) {
      // return self.$set(self.model, 'samePostal', true);
      // } else {
      // return self.$set(self.model, 'samePostal', false);
      // }
    },

    create() {
      var self = this; //self.$fluro.global.create

      var template = {
        family: self.model,
        lastName: self.model.title
      };
      console.log('Create new contact', template);
      self.$fluro.global.create('contact', {
        template
      }, true).then(function (res) {
        self.model.items.push(res);
      });
    }

  },

  data() {
    return {};
  },

  asyncComputed: {
    contactDefinitions: {
      default: [],

      get() {
        var self = this;
        return new Promise(function (resolve, reject) {
          return self.$fluro.types.subTypes('contact').catch(reject).then(function (res) {
            return resolve(res);
          });
        }).catch(function (err) {
          console.log(err);
          self.$fluro.notify(err);
          return reject(err);
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
                                    !_vm.model._id
                                      ? _c(
                                          "v-flex",
                                          { attrs: { xs12: "", sm12: "" } },
                                          [
                                            _c("fluro-content-form-field", {
                                              attrs: {
                                                "form-fields": _vm.formFields,
                                                outline: _vm.showOutline,
                                                options: _vm.options,
                                                field: _vm.fieldHash.items
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
                                      : _vm._e(),
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
                                                "\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tHome Address\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t"
                                              )
                                            ]),
                                            _vm._v(" "),
                                            _c(
                                              "fluro-panel-body",
                                              [
                                                _c("address-manager", {
                                                  model: {
                                                    value: _vm.model.address,
                                                    callback: function($$v) {
                                                      _vm.$set(
                                                        _vm.model,
                                                        "address",
                                                        $$v
                                                      );
                                                    },
                                                    expression: "model.address"
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
                                      [
                                        _c(
                                          "fluro-panel",
                                          [
                                            _c("fluro-panel-title", [
                                              _c(
                                                "div",
                                                {
                                                  staticClass:
                                                    "no-border-no-background"
                                                },
                                                [
                                                  _c(
                                                    "fluro-toggle-item",
                                                    {
                                                      attrs: {
                                                        inactive:
                                                          _vm.model.samePostal
                                                      },
                                                      nativeOn: {
                                                        click: function(
                                                          $event
                                                        ) {
                                                          return _vm.toggleSamePostal()
                                                        }
                                                      }
                                                    },
                                                    [
                                                      _vm._v(
                                                        "Different Postal Address"
                                                      )
                                                    ]
                                                  )
                                                ],
                                                1
                                              )
                                            ]),
                                            _vm._v(" "),
                                            !_vm.model.samePostal
                                              ? _c(
                                                  "fluro-panel-body",
                                                  [
                                                    _c("address-manager", {
                                                      model: {
                                                        value:
                                                          _vm.model
                                                            .postalAddress,
                                                        callback: function(
                                                          $$v
                                                        ) {
                                                          _vm.$set(
                                                            _vm.model,
                                                            "postalAddress",
                                                            $$v
                                                          );
                                                        },
                                                        expression:
                                                          "model.postalAddress"
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
                _vm.model._id
                  ? _c(
                      "tab",
                      { attrs: { heading: _vm.membersLength + " Members" } },
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
                                  "v-layout",
                                  {
                                    staticStyle: { "overflow-x": "scroll" },
                                    attrs: {
                                      row: "",
                                      wrap: "",
                                      "justify-space-around": "",
                                      "fill-height": ""
                                    }
                                  },
                                  [
                                    _vm._l(_vm.members, function(
                                      contact,
                                      index
                                    ) {
                                      return _c(
                                        "div",
                                        { staticClass: "cards border" },
                                        [
                                          _c("family-member-card", {
                                            attrs: {
                                              contactDefinitions:
                                                _vm.contactDefinitionOptions
                                            },
                                            model: {
                                              value: _vm.members[index],
                                              callback: function($$v) {
                                                _vm.$set(
                                                  _vm.members,
                                                  index,
                                                  $$v
                                                );
                                              },
                                              expression: "members[index]"
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    }),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      {
                                        staticClass: "ghost-card",
                                        on: { click: _vm.create }
                                      },
                                      [
                                        _c(
                                          "div",
                                          { staticClass: "add-contact ghost" },
                                          [
                                            _c(
                                              "div",
                                              { staticClass: "add-circle" },
                                              [
                                                _c("fluro-icon", {
                                                  staticClass: "add-icon",
                                                  attrs: { icon: "plus" }
                                                })
                                              ],
                                              1
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "h5",
                                              {
                                                staticClass: "add-contact-text"
                                              },
                                              [_vm._v("Add Contact")]
                                            )
                                          ]
                                        )
                                      ]
                                    )
                                  ],
                                  2
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
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = function (inject) {
    if (!inject) return
    inject("data-v-7329bcfa_0", { source: "/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.no-border-no-background .toggle-item {\n  border: none !important;\n  background: none !important;\n  font-size: 14px;\n  padding: 0px;\n}\n.cards {\n  width: 200px !important;\n  background-color: white;\n  margin: 10px;\n}\n.border {\n  border-color: rgba(0, 0, 0, 0.05);\n  border-style: solid;\n  border-width: 1px;\n}\n.ghost-card {\n  padding: 16px;\n  width: 200px !important;\n  margin: 10px;\n  border: 1px dashed #ccc;\n  color: inherit;\n  background-color: transparent;\n  transition: background-color 0.3s;\n}\n.ghost-card:hover {\n  background-color: white;\n}\n.add-circle {\n  border: 1px dashed #ccc;\n  border-radius: 50%;\n  height: 132.8px;\n  width: 132.8px;\n  padding: 8px;\n  margin: auto;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.filler-ghost {\n  height: 100%;\n  display: block;\n}\n.add-icon {\n  width: 100%;\n  height: 100%;\n}\n.add-contact-text {\n  text-align: center;\n  padding-top: 16px;\n}\n\n/*# sourceMappingURL=family.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/edit/panels/family.vue","family.vue"],"names":[],"mappings":"AA4gBA,GAAA;AAYA;EACA,yCAAA;ACthBA;ADyhBA;EACA,2CAAA;ACthBA;ADyhBA;EACA,4CAAA;ACthBA;ADyhBA;EACA,0CAAA;ACthBA;;AD8hBA,GAAA;AACA;EACA,uBAAA;EACA,2BAAA;EACA,eAAA;EACA,YAAA;AC3hBA;AD8hBA;EACA,uBAAA;EACA,uBAAA;EACA,YAAA;AC3hBA;AD+hBA;EACA,iCAAA;EACA,mBAAA;EACA,iBAAA;AC5hBA;AD+hBA;EACA,aAAA;EACA,uBAAA;EACA,YAAA;EACA,uBAAA;EACA,cAAA;EACA,6BAAA;EACA,iCAAA;AC5hBA;AD8hBA;EACA,uBAAA;AC5hBA;ADgiBA;EACA,uBAAA;EACA,kBAAA;EACA,eAAA;EACA,cAAA;EACA,YAAA;EACA,YAAA;EACA,aAAA;EACA,uBAAA;EACA,mBAAA;AC7hBA;ADgiBA;EACA,YAAA;EACA,cAAA;AC7hBA;ADgiBA;EACA,WAAA;EACA,YAAA;AC7hBA;ADgiBA;EACA,kBAAA;EACA,iBAAA;AC7hBA;;AAEA,qCAAqC","file":"family.vue","sourcesContent":["<template>\n\t\t\t\t<flex-column>\n\t\t\t\t\t\t\t\t<template v-if=\"loading\">\n\t\t\t\t\t\t\t\t\t\t\t\t<fluro-page-preloader contain />\n\t\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t<template v-else>\n\t\t\t\t\t\t\t\t\t\t\t\t<!-- :vertical=\"true\" -->\n\t\t\t\t\t\t\t\t\t\t\t\t<tabset :justified=\"true\" :vertical=\"true\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tab heading=\"Details\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<flex-column-body style=\"background: #fafafa;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-container fluid grid-list-lg>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<constrain sm>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-layout row wrap>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!--  -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm12>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.title\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm12 v-if=\"!model._id\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.items\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!--  -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm6>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.emails\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!--  -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm6>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.phoneNumbers\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!--  -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- Household Address -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex xs12 sm12>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel-title>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tHome Address\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel-title>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<address-manager v-model=\"model.address\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!--  -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!--  -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!--  -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- Postal Address -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel-title>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"no-border-no-background\" >\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-toggle-item @click.native=\"toggleSamePostal()\" :inactive=\"model.samePostal\">Different Postal Address</fluro-toggle-item>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel-title>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-panel-body v-if=\"!model.samePostal\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<address-manager v-model=\"model.postalAddress\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel-body>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</fluro-panel>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-flex>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- \t<pre>{{model.samePostal}}</pre>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<pre>{{model.address}}</pre>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<pre>{{model.postalAddress}}</pre> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</constrain>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</flex-column-body>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!--  -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tab :heading=\"`${membersLength} Members`\" v-if=\"model._id\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<flex-column-body style=\"background: #fafafa;\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-container fluid grid-list-lg>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <constrain sm> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<v-layout row wrap justify-space-around fill-height style=\"overflow-x:scroll\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div v-for=\"(contact, index) in members\" class=\"cards border\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<family-member-card :contactDefinitions=\"contactDefinitionOptions\" v-model=\"members[index]\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"ghost-card\" @click=\"create\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"add-contact ghost\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!--                                             <div class=\"avatar-flex\"> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"add-circle\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-icon class=\"add-icon\" icon=\"plus\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h5 class=\"add-contact-text\">Add Contact</h5>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- </div> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-layout>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- </constrain> -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</v-container>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</flex-column-body>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!--                     <fluro-content-form :options=\"options\" v-model=\"model.data\" :fields=\"definition.fields\" />\n -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!--  -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!--  -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tab :heading=\"`${definition.title} Information`\" v-if=\"definition && definition.fields && definition.fields.length\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<fluro-content-form :options=\"options\" v-model=\"model.data\" :fields=\"definition.fields\" />\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tab>\n\t\t\t\t\t\t\t\t\t\t\t\t</tabset>\n\t\t\t\t\t\t\t\t</template>\n\t\t\t\t</flex-column>\n</template>\n<script>\n/////////////////////////////////\n\nimport FamilyMemberCard from 'src/components/content/edit/components/FamilyMemberCard.vue';\nimport FluroContentEditMixin from 'src/components/content/edit/FluroContentEditMixin.js';\nimport AddressManager from 'src/components/content/edit/components/AddressManager.vue';\nimport FluroAcademicSelect from 'src/components/form/FluroAcademicSelect.vue';\n\n/////////////////////////////////\n\nimport Vue from 'vue';\nimport _ from 'lodash';\n\n/////////////////////////////////\n\nexport default {\n\t\t\t\tcomponents: {\n\t\t\t\t\t\t\t\tAddressManager,\n\t\t\t\t\t\t\t\tFamilyMemberCard\n\t\t\t\t},\n\t\t\t\tcreated() {\n\t\t\t\t\t\t\t\t//If we are creating a new family\n\t\t\t\t\t\t\t\tif (!this.model._id) {\n\t\t\t\t\t\t\t\t\t\t\t\t//Set the postal address to be the same by default\n\t\t\t\t\t\t\t\t\t\t\t\tthis.$set(this.model, 'samePostal', true);\n\t\t\t\t\t\t\t\t}\n\t\t\t\t},\n\t\t\t\tmixins: [FluroContentEditMixin],\n\t\t\t\tcomputed: {\n\t\t\t\t\t\t\t\tmembers() {\n\t\t\t\t\t\t\t\t\t\t\t\treturn _.orderBy(this.model.items, function(contact) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tif (contact.householdRole == 'parent') {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn -1;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tif (contact.age) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn 120 - parseInt(contact.age)\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn 0;\n\t\t\t\t\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tfieldsOutput() {\n\n\n\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\t\t\t\t\t\t\t\t\t\t\t\tvar array = [];\n\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('title', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Title/Family Name',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tplaceholder: 'Family Name',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'string',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tparams: {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tautofocus: !self.model._id,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\t\t\t\t\t\t///////////////////////////////////\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('phoneNumbers', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Household Phone Number',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'string',\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('emails', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Household Email Address',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'email',\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t/////////////////////////////////////\n\n\t\t\t\t\t\t\t\t\t\t\t\tvar contactFields = [];\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t/////////////////////////////////////\n\n\t\t\t\t\t\t\t\t\t\t\t\tvar row0 = {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Definition',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkey: 'definitions',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'group',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tsameLine: true,\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t\t\trow0.fields = [{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Household Role',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkey: 'householdRole',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'string',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdirective: 'select',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\toptions: [{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'None',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue: '',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Parent',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue: 'parent',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Child',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue: 'child',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t]\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Definition',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkey: 'definition',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'string',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdirective: 'select',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\toptions: self.contactDefinitionOptions,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\texpressions: {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\thide() {\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvar number = (!self.contactDefinitions || !self.contactDefinitions.length);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// console.log('NUMBER?', number, self.contactDefinitions)\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn number;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t]\n\t\t\t\t\t\t\t\t\t\t\t\tcontactFields.push(row0)\n\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t/////////////////////////////////////\n\n\t\t\t\t\t\t\t\t\t\t\t\tvar row1 = {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Names',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkey: 'names',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'group',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tsameLine: true,\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t\t\trow1.fields = [{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'First Name',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkey: 'firstName',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'string',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Last Name',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkey: 'lastName',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tplaceholder: self.model.title,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'string',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\texpressions: {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdefaultValue() {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn self.model.title;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t]\n\t\t\t\t\t\t\t\t\t\t\t\tcontactFields.push(row1)\n\n\t\t\t\t\t\t\t\t\t\t\t\t/////////////////////////////////////\n\n\t\t\t\t\t\t\t\t\t\t\t\tvar row2 = {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Bits',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkey: 'bits',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'group',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tsameLine: true,\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t\t\trow2.fields = [{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Gender',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkey: 'gender',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'string',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdirective: 'select',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\toptions: [{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Male',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue: 'male',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Female',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue: 'female',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Unknown',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue: '',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t]\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Date of Birth',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkey: 'dob',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'date',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t]\n\t\t\t\t\t\t\t\t\t\t\t\tcontactFields.push(row2)\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t/////////////////////////////////////\n\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t/////////////////////////////////////\n\n\n\t\t\t\t\t\t\t\t\t\t\t\tvar row3 = {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Comms',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkey: 'comms',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'group',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tsameLine: true,\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t\t\trow3.fields = [{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Email Address',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkey: 'emails',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'email',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Phone Number',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkey: 'phoneNumbers',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'string',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t]\n\t\t\t\t\t\t\t\t\t\t\t\tcontactFields.push(row3)\n\n\n\t\t\t\t\t\t\t\t\t\t\t\tvar row4 = {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Comms',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkey: 'realmsandstuff',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'group',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tsameLine: true,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tfields: [],\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t\t\trow4.fields = [{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Realms',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdescription: 'If different from the family',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkey: 'realms',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'reference',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdirective: 'realmselect',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tparams: {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\trestrictType: 'realm'\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\texpressions: {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdefaultValue() {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn self.model.realms.slice();\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'Tags',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkey: 'tags',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'reference',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdirective: 'content-select-button',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tparams: {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\trestrictType: 'tag',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tallDefinitions: true,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\t\t\t\t\t]\n\n\n\t\t\t\t\t\t\t\t\t\t\t\tcontactFields.push({\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: 'School / Academic Calendar',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tkey: '_academic',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 1,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'string',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tcustomComponent: FluroAcademicSelect,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\texpressions: {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\thide: `model.householdRole == 'parent'`,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t})\n\n\t\t\t\t\t\t\t\t\t\t\t\tcontactFields.push(row4)\n\n\t\t\t\t\t\t\t\t\t\t\t\t// <fluro-academic-select :form-fields=\"formFields\" :outline=\"showOutline\" :options=\"formOptions\" @calendar=\"updateAcademicCalendar\" @grade=\"updateAcademicGrade\" v-model=\"model\" />\n\t\t\t\t\t\t\t\t\t\t\t\t//                             </fluro-academic-select>\n\n\n\n\n\t\t\t\t\t\t\t\t\t\t\t\tvar minimumFamilyMembers = self.model._context == 'contact' ? 0 : 1;\n\n\t\t\t\t\t\t\t\t\t\t\t\taddField('items', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttitle: self.model._context == 'contact' ? 'Additional Family Member' : 'Family Member',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tminimum: minimumFamilyMembers,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmaximum: 0,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttype: 'group',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tasObject: true,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\taskCount: minimumFamilyMembers,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tfields: contactFields,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\texpressions: {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\thide() {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn self.model._context == 'contact';\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\n\n\t\t\t\t\t\t\t\t\t\t\t\tfunction addField(key, details) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tdetails.key = key;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tarray.push(details)\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t\t\treturn array;\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tmembersLength() {\n\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\t\t\t\t\t\t\t\t\t\t\t\tif (_.get(self.model, 'items')) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn self.model.items.length;\n\t\t\t\t\t\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn 0;\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tcontactDefinitionOptions() {\n\n\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\n\t\t\t\t\t\t\t\t\t\t\t\tvar options = self.contactDefinitions.slice();\n\n\t\t\t\t\t\t\t\t\t\t\t\tif (options.length) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\toptions.unshift({\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tname: 'None',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvalue: '',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\n\t\t\t\t\t\t\t\t\t\t\t\treturn options;\n\t\t\t\t\t\t\t\t}\n\t\t\t\t},\n\t\t\t\tmethods: {\n\t\t\t\t\t\t\t\ttoggleSamePostal() {\n\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\n\t\t\t\t\t\t\t\t\t\t\t\tconsole.log('Toggle Same Postal!', self.model.samePostal);\n\n\t\t\t\t\t\t\t\t\t\t\t\tself.$set(self.model, 'samePostal', !self.model.samePostal);\n\n\t\t\t\t\t\t\t\t\t\t\t\t// if (!self.model.samePostal) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// return self.$set(self.model, 'samePostal', true);\n\t\t\t\t\t\t\t\t\t\t\t\t// } else {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t// return self.$set(self.model, 'samePostal', false);\n\t\t\t\t\t\t\t\t\t\t\t\t// }\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\tcreate() {\n\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\t\t\t\t\t\t\t\t\t\t\t\t//self.$fluro.global.create\n\n\t\t\t\t\t\t\t\t\t\t\t\tvar template = {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tfamily: self.model,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tlastName: self.model.title,\n\t\t\t\t\t\t\t\t\t\t\t\t};\n\n\n\t\t\t\t\t\t\t\t\t\t\t\tconsole.log('Create new contact', template)\n\t\t\t\t\t\t\t\t\t\t\t\tself.$fluro.global.create('contact', {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttemplate,\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}, true)\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t.then(function(res) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tself.model.items.push(res);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\t\t}\n\t\t\t\t},\n\t\t\t\tdata() {\n\t\t\t\t\t\t\t\treturn {}\n\t\t\t\t},\n\t\t\t\tasyncComputed: {\n\t\t\t\t\t\t\t\tcontactDefinitions: {\n\t\t\t\t\t\t\t\t\t\t\t\tdefault: [],\n\t\t\t\t\t\t\t\t\t\t\t\tget() {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tvar self = this;\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn new Promise(function(resolve, reject) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn self.$fluro.types.subTypes('contact')\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t.catch(reject)\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t.then(function(res) {\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn resolve(res);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t.catch(function(err) {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tconsole.log(err);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tself.$fluro.notify(err);\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\treturn reject(err);\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t});\n\n\n\n\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t}\n\t\t\t\t}\n}\n\n</script>\n<style lang=\"scss\">\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n.no-border-no-background .toggle-item {\n\t\t\t\tborder: none !important;\n\t\t\t\tbackground: none !important;\n\t\t\t\tfont-size: 14px;\n\t\t\t\tpadding: 0px;\n}\n\n.cards {\n\t\t\t\twidth: 200px !important;\n\t\t\t\tbackground-color: white;\n\t\t\t\tmargin: 10px;\n\n}\n\n.border {\n\t\t\t\tborder-color: rgba(0, 0, 0, 0.05);\n\t\t\t\tborder-style: solid;\n\t\t\t\tborder-width: 1px;\n}\n\n.ghost-card {\n\t\t\t\tpadding: 16px;\n\t\t\t\twidth: 200px !important;\n\t\t\t\tmargin: 10px;\n\t\t\t\tborder: 1px dashed #ccc;\n\t\t\t\tcolor: inherit;\n\t\t\t\tbackground-color: transparent;\n\t\t\t\ttransition: background-color 0.3s;\n\n\t\t\t\t&:hover {\n\t\t\t\t\t\t\t\tbackground-color: white;\n\t\t\t\t}\n}\n\n.add-circle {\n\t\t\t\tborder: 1px dashed #ccc;\n\t\t\t\tborder-radius: 50%;\n\t\t\t\theight: 132.8px;\n\t\t\t\twidth: 132.8px;\n\t\t\t\tpadding: 8px;\n\t\t\t\tmargin: auto;\n\t\t\t\tdisplay: flex;\n\t\t\t\tjustify-content: center;\n\t\t\t\talign-items: center;\n}\n\n.filler-ghost {\n\t\t\t\theight: 100%;\n\t\t\t\tdisplay: block;\n}\n\n.add-icon {\n\t\t\t\twidth: 100%;\n\t\t\t\theight: 100%;\n}\n\n.add-contact-text {\n\t\t\t\ttext-align: center;\n\t\t\t\tpadding-top: 16px;\n}\n\n</style>\n","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.no-border-no-background .toggle-item {\n  border: none !important;\n  background: none !important;\n  font-size: 14px;\n  padding: 0px;\n}\n\n.cards {\n  width: 200px !important;\n  background-color: white;\n  margin: 10px;\n}\n\n.border {\n  border-color: rgba(0, 0, 0, 0.05);\n  border-style: solid;\n  border-width: 1px;\n}\n\n.ghost-card {\n  padding: 16px;\n  width: 200px !important;\n  margin: 10px;\n  border: 1px dashed #ccc;\n  color: inherit;\n  background-color: transparent;\n  transition: background-color 0.3s;\n}\n.ghost-card:hover {\n  background-color: white;\n}\n\n.add-circle {\n  border: 1px dashed #ccc;\n  border-radius: 50%;\n  height: 132.8px;\n  width: 132.8px;\n  padding: 8px;\n  margin: auto;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.filler-ghost {\n  height: 100%;\n  display: block;\n}\n\n.add-icon {\n  width: 100%;\n  height: 100%;\n}\n\n.add-contact-text {\n  text-align: center;\n  padding-top: 16px;\n}\n\n/*# sourceMappingURL=family.vue.map */"]}, media: undefined });

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

export default __vue_component__$1;
//# sourceMappingURL=family-44a43658.js.map
