
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { aJ as FluroCodeEditor, bo as _, bm as __vue_normalize__, bn as __vue_create_injector__ } from './index-c275b0c6.js';
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
import { F as FluroContentEditMixin } from './FluroContentEditMixin-da26d378.js';
import { F as FluroAssetEditMixin } from './FluroAssetEditMixin-d8088a21.js';

//

var script = {
  components: {
    FluroEditor: FluroCodeEditor
  },

  created() {},

  mixins: [FluroContentEditMixin, FluroAssetEditMixin],
  computed: {
    fieldsOutput() {
      var array = []; ///////////////////////////////////

      addField('title', {
        title: 'Title',
        minimum: 1,
        maximum: 1,
        type: 'string'
      });
      addField('firstLine', {
        title: 'Short Description',
        minimum: 0,
        maximum: 1,
        type: 'string',
        placeholder: 'Optional short description describing the collection'
      });
      addField('assetType', {
        title: 'Asset Type',
        minimum: 1,
        maximum: 1,
        type: 'string',
        directive: 'select',
        options: [{
          name: 'SoundCloud',
          value: 'soundcloud'
        }, {
          name: 'Upload / Hosted',
          value: 'upload'
        }] // params: {
        //     restrictType: 'ticket',
        // },

      });
      addField('external', {
        type: 'group',
        minimum: 0,
        maximum: 1,
        asObject: true,
        fields: [{
          key: 'soundcloud',
          title: 'SoundCloud URL',
          minimum: 0,
          maximum: 1,
          type: 'string'
        }]
      }); ///////////////////////////////////

      function addField(key, details) {
        details.key = key;
        array.push(details);
      }

      return array;
    },

    isSoundCloud() {
      var self = this;

      var assetType = _.get(self.model, 'assetType');

      return assetType == 'soundcloud';
    },

    isUpload() {
      var self = this;

      var assetType = _.get(self.model, 'assetType');

      return assetType == 'upload';
    },

    soundCloudURL() {
      var self = this;
      return _.get(self.model, 'external.soundcloud');
    }

  },
  methods: {
    assetReplaced(model) {
      this.cacheKey = Math.random();
      this.replace = false;
    }

  },

  data() {
    return {
      cacheKey: 0,
      replace: false
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
                  { attrs: { heading: "Details" } },
                  [
                    _c(
                      "flex-column-body",
                      { staticStyle: { background: "#fafafa" } },
                      [
                        _c(
                          "v-container",
                          { attrs: { fluid: "" } },
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
                                !_vm.model.assetType
                                  ? _c("fluro-content-form-field", {
                                      attrs: {
                                        "form-fields": _vm.formFields,
                                        outline: _vm.showOutline,
                                        options: _vm.options,
                                        field: _vm.fieldHash.assetType
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
                                  : _vm._e(),
                                _vm._v(" "),
                                _vm.isSoundCloud
                                  ? _c("fluro-content-form-field", {
                                      attrs: {
                                        "form-fields": _vm.formFields,
                                        outline: _vm.showOutline,
                                        options: _vm.options,
                                        field: _vm.fieldHash.external
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
                                  : _vm._e(),
                                _vm._v(" "),
                                _vm.isSoundCloud
                                  ? _c("iframe", {
                                      attrs: {
                                        width: "100%",
                                        height: "166",
                                        scrolling: "no",
                                        frameborder: "no",
                                        allow: "autoplay",
                                        src:
                                          "https://w.soundcloud.com/player/?url=" +
                                          _vm.soundCloudURL
                                      }
                                    })
                                  : _vm._e(),
                                _vm._v(" "),
                                _vm.isUpload
                                  ? _c(
                                      "div",
                                      [
                                        _vm.model._id
                                          ? [
                                              _vm.replace
                                                ? [
                                                    _c("asset-replace-upload", {
                                                      on: {
                                                        input: _vm.assetReplaced
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
                                                    })
                                                  ]
                                                : [
                                                    _c(
                                                      "v-layout",
                                                      [
                                                        _c(
                                                          "v-flex",
                                                          [
                                                            _c(
                                                              "v-input",
                                                              {
                                                                staticClass:
                                                                  "no-flex"
                                                              },
                                                              [
                                                                _c("v-label", [
                                                                  _vm._v(
                                                                    "Asset File"
                                                                  )
                                                                ]),
                                                                _vm._v(" "),
                                                                _c("div", [
                                                                  _vm._v(
                                                                    _vm._s(
                                                                      _vm.model
                                                                        .filename
                                                                    )
                                                                  )
                                                                ]),
                                                                _vm._v(" "),
                                                                _c(
                                                                  "div",
                                                                  [
                                                                    _c(
                                                                      "v-btn",
                                                                      {
                                                                        staticClass:
                                                                          "ma-0",
                                                                        on: {
                                                                          click: function(
                                                                            $event
                                                                          ) {
                                                                            _vm.replace = true;
                                                                          }
                                                                        }
                                                                      },
                                                                      [
                                                                        _vm._v(
                                                                          "\n                                                            Replace with a new file\n                                                            "
                                                                        ),
                                                                        _c(
                                                                          "fluro-icon",
                                                                          {
                                                                            attrs: {
                                                                              right:
                                                                                "",
                                                                              library:
                                                                                "fas",
                                                                              icon:
                                                                                "cloud-upload"
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
                                                          ],
                                                          1
                                                        )
                                                      ],
                                                      1
                                                    )
                                                  ]
                                            ]
                                          : [
                                              _c("asset-replace-upload", {
                                                on: { file: _vm.fileSelected },
                                                model: {
                                                  value: _vm.model,
                                                  callback: function($$v) {
                                                    _vm.model = $$v;
                                                  },
                                                  expression: "model"
                                                }
                                              })
                                            ]
                                      ],
                                      2
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                _c(
                                  "v-input",
                                  {
                                    staticClass: "no-flex pt-2",
                                    attrs: { label: "Body" }
                                  },
                                  [
                                    _c("fluro-editor", {
                                      attrs: {
                                        placeholder: "Type your text in here"
                                      },
                                      model: {
                                        value: _vm.model.body,
                                        callback: function($$v) {
                                          _vm.$set(_vm.model, "body", $$v);
                                        },
                                        expression: "model.body"
                                      }
                                    })
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c("fluro-privacy-select", {
                                  model: {
                                    value: _vm.model.privacy,
                                    callback: function($$v) {
                                      _vm.$set(_vm.model, "privacy", $$v);
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
                        _c(
                          "flex-column-body",
                          { staticStyle: { background: "#fafafa" } },
                          [
                            _c(
                              "v-container",
                              { attrs: { fluid: "" } },
                              [
                                _c(
                                  "constrain",
                                  { attrs: { sm: "" } },
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
    inject("data-v-0dd7601a_0", { source: "/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.media-preview {\n  background: #eee;\n  display: block;\n  min-height: 350px;\n  margin-bottom: 15px;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  border-radius: 5px;\n  overflow: hidden;\n}\n.media-preview .media-preview-wrap {\n  max-width: 750px;\n  margin: auto;\n}\n\n/*# sourceMappingURL=audio.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/edit/panels/audio.vue","audio.vue"],"names":[],"mappings":"AAmOA,GAAA;AAYA;EACA,yCAAA;AC7OA;ADgPA;EACA,2CAAA;AC7OA;ADgPA;EACA,4CAAA;AC7OA;ADgPA;EACA,0CAAA;AC7OA;;ADqPA,GAAA;AACA;EACA,gBAAA;EACA,cAAA;EACA,iBAAA;EACA,mBAAA;EACA,oCAAA;EACA,kBAAA;EACA,gBAAA;AClPA;ADoPA;EACA,gBAAA;EACA,YAAA;AClPA;;AAEA,oCAAoC","file":"audio.vue","sourcesContent":["<template>\n    <flex-column>\n        <template v-if=\"loading\">\n            <fluro-page-preloader contain />\n        </template>\n        <template v-else>\n            <!-- :vertical=\"true\" -->\n            <tabset :justified=\"true\" :vertical=\"true\">\n                <!--  <template v-slot:menuprefix>\n                    <template v-if=\"context == 'edit' && $vuetify.breakpoint.mdAndUp\">\n                        <flex-column-header style=\"text-align:center\">\n                            <div style=\"padding: 10px; max-width:200px; margin: auto;\">\n                                <fluro-image  :height=\"200\" :image-height=\"450\" contain :item=\"model\" :cacheKey=\"imageCacheKey\" :spinner=\"true\"></fluro-image>\n                            </div>\n                            <div>\n                                {{model.width}}x{{model.height}}\n                            </div>\n                        </flex-column-header>\n                    </template>\n                </template> -->\n                <tab heading=\"Details\">\n                    <!-- <slot> -->\n                    <flex-column-body style=\"background: #fafafa;\">\n                        <v-container fluid>\n                            <constrain sm>\n                                <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.title\" v-model=\"model\"></fluro-content-form-field>\n                                <fluro-content-form-field v-if=\"!model.assetType\" :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.assetType\" v-model=\"model\"></fluro-content-form-field>\n                                <fluro-content-form-field v-if=\"isSoundCloud\" :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.external\" v-model=\"model\"></fluro-content-form-field>\n                                <iframe v-if=\"isSoundCloud\" width=\"100%\" height=\"166\" scrolling=\"no\" frameborder=\"no\" allow=\"autoplay\" :src=\"`https://w.soundcloud.com/player/?url=${soundCloudURL}`\"></iframe>\n                                <div v-if=\"isUpload\">\n                                    <template v-if=\"model._id\">\n                                        <template v-if=\"replace\">\n                                            <asset-replace-upload v-model=\"model\" @input=\"assetReplaced\" />\n                                        </template>\n                                        <template v-else>\n                                            <v-layout>\n                                                <v-flex>\n                                                    <v-input class=\"no-flex\">\n                                                        <v-label>Asset File</v-label>\n                                                        <div>{{model.filename}}</div>\n                                                        <div>\n                                                            <v-btn class=\"ma-0\" @click=\"replace = true\">\n                                                                Replace with a new file\n                                                                <fluro-icon right library=\"fas\" icon=\"cloud-upload\" />\n                                                            </v-btn>\n                                                        </div>\n                                                    </v-input>\n                                                </v-flex>\n                                            </v-layout>\n                                        </template>\n                                    </template>\n                                    <template v-else>\n                                        <asset-replace-upload v-model=\"model\" @file=\"fileSelected\" />\n                                    </template>\n                                </div>\n                                <v-input label=\"Body\" class=\"no-flex pt-2\">\n                                    <fluro-editor v-model=\"model.body\" placeholder=\"Type your text in here\"></fluro-editor>\n                                </v-input>\n                                <fluro-privacy-select v-model=\"model.privacy\" />\n                            </constrain>\n                        </v-container>\n                    </flex-column-body>\n                </tab>\n                <tab :heading=\"`${definition.title} Information`\" v-if=\"definition && definition.fields && definition.fields.length\">\n                    <flex-column-body style=\"background: #fafafa;\">\n                        <v-container fluid>\n                            <constrain sm>\n                                <fluro-content-form :options=\"options\" v-model=\"model.data\" :fields=\"definition.fields\" />\n                            </constrain>\n                        </v-container>\n                    </flex-column-body>\n                </tab>\n                <!-- <tab heading=\"Advanced / Metadata\" v-if=\"hasMeta\">\n                    <flex-column-body style=\"background: #fafafa;\">\n                        <v-container fluid>\n                            <constrain sm>\n                               \n                                <fluro-panel v-if=\"model.data.iptc\">\n                                    <fluro-panel-title>\n                                        <h5>IPTC Data</h5>\n                                    </fluro-panel-title>\n                                    <fluro-panel-body>\n                                        <json-view :deep=\"3\" :data=\"model.data.iptc\" />\n                                    </fluro-panel-body>\n                                </fluro-panel>\n                                \n                               \n                                <fluro-panel v-if=\"model.data.exif\">\n                                    <fluro-panel-title>\n                                        <h5>EXIF Data</h5>\n                                    </fluro-panel-title>\n                                    <fluro-panel-body>\n                                        <json-view :deep=\"3\" :data=\"model.data.exif\" />\n                                    </fluro-panel-body>\n                                </fluro-panel>\n                                \n                            </constrain>\n                        </v-container>\n                    </flex-column-body>\n                </tab> -->\n            </tabset>\n        </template>\n    </flex-column>\n</template>\n<script>\n/////////////////////////////////\n\nimport FluroEditor from 'src/components/form/FluroEditor.vue';\nimport FluroContentEditMixin from 'src/components/content/edit/FluroContentEditMixin.js';\nimport FluroAssetEditMixin from 'src/components/content/edit/FluroAssetEditMixin';\n\n/////////////////////////////////\n\nimport _ from 'lodash';\n\nimport Vue from 'vue';\n\n/////////////////////////////////\n\nexport default {\n    components: {\n        FluroEditor,\n    },\n    created() {},\n    mixins: [FluroContentEditMixin, FluroAssetEditMixin],\n    computed: {\n        fieldsOutput() {\n\n\n            var self = this;\n            var array = [];\n\n            ///////////////////////////////////\n\n            addField('title', {\n                title: 'Title',\n                minimum: 1,\n                maximum: 1,\n                type: 'string',\n            });\n\n            addField('firstLine', {\n                title: 'Short Description',\n                minimum: 0,\n                maximum: 1,\n                type: 'string',\n                placeholder: 'Optional short description describing the collection',\n            });\n\n            addField('assetType', {\n                title: 'Asset Type',\n                minimum: 1,\n                maximum: 1,\n                type: 'string',\n                directive: 'select',\n                options: [{\n                        name: 'SoundCloud',\n                        value: 'soundcloud',\n                    },\n                    {\n                        name: 'Upload / Hosted',\n                        value: 'upload',\n                    },\n                ]\n                // params: {\n                //     restrictType: 'ticket',\n                // },\n            })\n\n\n            addField('external', {\n                type: 'group',\n                minimum: 0,\n                maximum: 1,\n                asObject: true,\n                fields: [\n                {\n                    key:'soundcloud',\n                    title: 'SoundCloud URL',\n                    minimum: 0,\n                    maximum: 1,\n                    type: 'string',\n                }]\n            })\n\n            ///////////////////////////////////\n\n            function addField(key, details) {\n                details.key = key;\n                array.push(details)\n            }\n\n            return array;\n\n\n        },\n        isSoundCloud() {\n            var self = this;\n            var assetType = _.get(self.model, 'assetType');\n            return (assetType == 'soundcloud');\n        },\n        isUpload() {\n            var self = this;\n            var assetType = _.get(self.model, 'assetType');\n            return (assetType == 'upload');\n        },\n        soundCloudURL() {\n            var self = this;\n            return _.get(self.model,'external.soundcloud');\n        }\n    },\n    methods: {\n        assetReplaced(model) {\n            this.cacheKey = Math.random();\n            this.replace = false;\n        }\n    },\n    data() {\n        return {\n            cacheKey: 0,\n            replace: false,\n        }\n    },\n}\n</script>\n<style lang=\"scss\">\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n.media-preview {\n    background: #eee;\n    display: block;\n    min-height: 350px;\n    margin-bottom: 15px;\n    border: 1px solid rgba(#000, 0.1);\n    border-radius: 5px;\n    overflow: hidden;\n\n    .media-preview-wrap {\n        max-width: 750px;\n        margin: auto;\n    }\n}\n</style>\n<style lang=\"scss\" scoped>\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n.color-swatch {\n    width: 36px;\n    height: 36px;\n    border-radius: 3px;\n    margin: 0 1px 1px 0;\n    display: inline-block;\n}\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.media-preview {\n  background: #eee;\n  display: block;\n  min-height: 350px;\n  margin-bottom: 15px;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  border-radius: 5px;\n  overflow: hidden;\n}\n.media-preview .media-preview-wrap {\n  max-width: 750px;\n  margin: auto;\n}\n\n/*# sourceMappingURL=audio.vue.map */"]}, media: undefined })
,inject("data-v-0dd7601a_1", { source: "/**/\n.border-top[data-v-0dd7601a] {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-right[data-v-0dd7601a] {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-bottom[data-v-0dd7601a] {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n.border-left[data-v-0dd7601a] {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.color-swatch[data-v-0dd7601a] {\n  width: 36px;\n  height: 36px;\n  border-radius: 3px;\n  margin: 0 1px 1px 0;\n  display: inline-block;\n}\n\n/*# sourceMappingURL=audio.vue.map */", map: {"version":3,"sources":["/Users/cadeembery/Code/fluro-vue-ui/src/components/content/edit/panels/audio.vue","audio.vue"],"names":[],"mappings":"AAsRA,GAAA;AAYA;EACA,yCAAA;AChSA;ADmSA;EACA,2CAAA;AChSA;ADmSA;EACA,4CAAA;AChSA;ADmSA;EACA,0CAAA;AChSA;;ADwSA,GAAA;AACA;EACA,WAAA;EACA,YAAA;EACA,kBAAA;EACA,mBAAA;EACA,qBAAA;ACrSA;;AAEA,oCAAoC","file":"audio.vue","sourcesContent":["<template>\n    <flex-column>\n        <template v-if=\"loading\">\n            <fluro-page-preloader contain />\n        </template>\n        <template v-else>\n            <!-- :vertical=\"true\" -->\n            <tabset :justified=\"true\" :vertical=\"true\">\n                <!--  <template v-slot:menuprefix>\n                    <template v-if=\"context == 'edit' && $vuetify.breakpoint.mdAndUp\">\n                        <flex-column-header style=\"text-align:center\">\n                            <div style=\"padding: 10px; max-width:200px; margin: auto;\">\n                                <fluro-image  :height=\"200\" :image-height=\"450\" contain :item=\"model\" :cacheKey=\"imageCacheKey\" :spinner=\"true\"></fluro-image>\n                            </div>\n                            <div>\n                                {{model.width}}x{{model.height}}\n                            </div>\n                        </flex-column-header>\n                    </template>\n                </template> -->\n                <tab heading=\"Details\">\n                    <!-- <slot> -->\n                    <flex-column-body style=\"background: #fafafa;\">\n                        <v-container fluid>\n                            <constrain sm>\n                                <fluro-content-form-field :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.title\" v-model=\"model\"></fluro-content-form-field>\n                                <fluro-content-form-field v-if=\"!model.assetType\" :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.assetType\" v-model=\"model\"></fluro-content-form-field>\n                                <fluro-content-form-field v-if=\"isSoundCloud\" :form-fields=\"formFields\" :outline=\"showOutline\" @input=\"update\" :options=\"options\" :field=\"fieldHash.external\" v-model=\"model\"></fluro-content-form-field>\n                                <iframe v-if=\"isSoundCloud\" width=\"100%\" height=\"166\" scrolling=\"no\" frameborder=\"no\" allow=\"autoplay\" :src=\"`https://w.soundcloud.com/player/?url=${soundCloudURL}`\"></iframe>\n                                <div v-if=\"isUpload\">\n                                    <template v-if=\"model._id\">\n                                        <template v-if=\"replace\">\n                                            <asset-replace-upload v-model=\"model\" @input=\"assetReplaced\" />\n                                        </template>\n                                        <template v-else>\n                                            <v-layout>\n                                                <v-flex>\n                                                    <v-input class=\"no-flex\">\n                                                        <v-label>Asset File</v-label>\n                                                        <div>{{model.filename}}</div>\n                                                        <div>\n                                                            <v-btn class=\"ma-0\" @click=\"replace = true\">\n                                                                Replace with a new file\n                                                                <fluro-icon right library=\"fas\" icon=\"cloud-upload\" />\n                                                            </v-btn>\n                                                        </div>\n                                                    </v-input>\n                                                </v-flex>\n                                            </v-layout>\n                                        </template>\n                                    </template>\n                                    <template v-else>\n                                        <asset-replace-upload v-model=\"model\" @file=\"fileSelected\" />\n                                    </template>\n                                </div>\n                                <v-input label=\"Body\" class=\"no-flex pt-2\">\n                                    <fluro-editor v-model=\"model.body\" placeholder=\"Type your text in here\"></fluro-editor>\n                                </v-input>\n                                <fluro-privacy-select v-model=\"model.privacy\" />\n                            </constrain>\n                        </v-container>\n                    </flex-column-body>\n                </tab>\n                <tab :heading=\"`${definition.title} Information`\" v-if=\"definition && definition.fields && definition.fields.length\">\n                    <flex-column-body style=\"background: #fafafa;\">\n                        <v-container fluid>\n                            <constrain sm>\n                                <fluro-content-form :options=\"options\" v-model=\"model.data\" :fields=\"definition.fields\" />\n                            </constrain>\n                        </v-container>\n                    </flex-column-body>\n                </tab>\n                <!-- <tab heading=\"Advanced / Metadata\" v-if=\"hasMeta\">\n                    <flex-column-body style=\"background: #fafafa;\">\n                        <v-container fluid>\n                            <constrain sm>\n                               \n                                <fluro-panel v-if=\"model.data.iptc\">\n                                    <fluro-panel-title>\n                                        <h5>IPTC Data</h5>\n                                    </fluro-panel-title>\n                                    <fluro-panel-body>\n                                        <json-view :deep=\"3\" :data=\"model.data.iptc\" />\n                                    </fluro-panel-body>\n                                </fluro-panel>\n                                \n                               \n                                <fluro-panel v-if=\"model.data.exif\">\n                                    <fluro-panel-title>\n                                        <h5>EXIF Data</h5>\n                                    </fluro-panel-title>\n                                    <fluro-panel-body>\n                                        <json-view :deep=\"3\" :data=\"model.data.exif\" />\n                                    </fluro-panel-body>\n                                </fluro-panel>\n                                \n                            </constrain>\n                        </v-container>\n                    </flex-column-body>\n                </tab> -->\n            </tabset>\n        </template>\n    </flex-column>\n</template>\n<script>\n/////////////////////////////////\n\nimport FluroEditor from 'src/components/form/FluroEditor.vue';\nimport FluroContentEditMixin from 'src/components/content/edit/FluroContentEditMixin.js';\nimport FluroAssetEditMixin from 'src/components/content/edit/FluroAssetEditMixin';\n\n/////////////////////////////////\n\nimport _ from 'lodash';\n\nimport Vue from 'vue';\n\n/////////////////////////////////\n\nexport default {\n    components: {\n        FluroEditor,\n    },\n    created() {},\n    mixins: [FluroContentEditMixin, FluroAssetEditMixin],\n    computed: {\n        fieldsOutput() {\n\n\n            var self = this;\n            var array = [];\n\n            ///////////////////////////////////\n\n            addField('title', {\n                title: 'Title',\n                minimum: 1,\n                maximum: 1,\n                type: 'string',\n            });\n\n            addField('firstLine', {\n                title: 'Short Description',\n                minimum: 0,\n                maximum: 1,\n                type: 'string',\n                placeholder: 'Optional short description describing the collection',\n            });\n\n            addField('assetType', {\n                title: 'Asset Type',\n                minimum: 1,\n                maximum: 1,\n                type: 'string',\n                directive: 'select',\n                options: [{\n                        name: 'SoundCloud',\n                        value: 'soundcloud',\n                    },\n                    {\n                        name: 'Upload / Hosted',\n                        value: 'upload',\n                    },\n                ]\n                // params: {\n                //     restrictType: 'ticket',\n                // },\n            })\n\n\n            addField('external', {\n                type: 'group',\n                minimum: 0,\n                maximum: 1,\n                asObject: true,\n                fields: [\n                {\n                    key:'soundcloud',\n                    title: 'SoundCloud URL',\n                    minimum: 0,\n                    maximum: 1,\n                    type: 'string',\n                }]\n            })\n\n            ///////////////////////////////////\n\n            function addField(key, details) {\n                details.key = key;\n                array.push(details)\n            }\n\n            return array;\n\n\n        },\n        isSoundCloud() {\n            var self = this;\n            var assetType = _.get(self.model, 'assetType');\n            return (assetType == 'soundcloud');\n        },\n        isUpload() {\n            var self = this;\n            var assetType = _.get(self.model, 'assetType');\n            return (assetType == 'upload');\n        },\n        soundCloudURL() {\n            var self = this;\n            return _.get(self.model,'external.soundcloud');\n        }\n    },\n    methods: {\n        assetReplaced(model) {\n            this.cacheKey = Math.random();\n            this.replace = false;\n        }\n    },\n    data() {\n        return {\n            cacheKey: 0,\n            replace: false,\n        }\n    },\n}\n</script>\n<style lang=\"scss\">\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n.media-preview {\n    background: #eee;\n    display: block;\n    min-height: 350px;\n    margin-bottom: 15px;\n    border: 1px solid rgba(#000, 0.1);\n    border-radius: 5px;\n    overflow: hidden;\n\n    .media-preview-wrap {\n        max-width: 750px;\n        margin: auto;\n    }\n}\n</style>\n<style lang=\"scss\" scoped>\n\n/**/\n\n$primary: #2ad4b9;//#0bd6be;\n$success: #4cc650; //#4cc673;//\n$warning: #f0974e; //darken(#fbf2d2, 50%);//#f0974e;\n$danger: #d93e63;\n$secondary: #0bd6cd; //#0bd6a3;\n\n\n\n//////////////////////////////////////////\n\n.border-top {\n    border-top: 1px solid rgba(#000, 0.05);\n}\n\n.border-right {\n    border-right: 1px solid rgba(#000, 0.05);\n}\n\n.border-bottom {\n    border-bottom: 1px solid rgba(#000, 0.05);\n}\n\n.border-left {\n    border-left: 1px solid rgba(#000, 0.05);\n}\n//////////////////////////////////////////\n\n\n\n\n//////////////////////////////////////////\n/**/\n.color-swatch {\n    width: 36px;\n    height: 36px;\n    border-radius: 3px;\n    margin: 0 1px 1px 0;\n    display: inline-block;\n}\n</style>","/**/\n.border-top {\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-right {\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-bottom {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.border-left {\n  border-left: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n/**/\n.color-swatch {\n  width: 36px;\n  height: 36px;\n  border-radius: 3px;\n  margin: 0 1px 1px 0;\n  display: inline-block;\n}\n\n/*# sourceMappingURL=audio.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-0dd7601a";
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
//# sourceMappingURL=audio-39cebc66.js.map
